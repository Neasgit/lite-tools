<#
.SYNOPSIS
    Generate a Production/Footage Log.md from a Premiere marker CSV export.

.DESCRIPTION
    Reads a marker CSV exported from Adobe Premiere Pro (Window -> Markers -> Export Markers)
    and generates a populated Footage Log.md in the case's Production/ subfolder.

    The script reads the description prefix on each marker to categorise it:
      - "USE:" or no prefix  -> ✅ YES (will use)
      - "MAYBE:"             -> ⚠️ MAYBE
      - "VERIFY:"            -> ⚠️ MAYBE + verify flag
      - "CUT:"               -> ❌ NO (cut, with reason)

    Run after each major review/edit pass. The script is idempotent — it overwrites
    Footage Log.md every time. The Premiere project is the source of truth; the
    Footage Log is a generated view.

.PARAMETER CaseName
    Name of the case folder under 01 - Cases/Active/ (without the "Case 00N - " prefix).
    Example: "Eddie Irizarry" for "Case 002 - Eddie Irizarry".
    OR pass the full folder name e.g. "Case 002 - Eddie Irizarry".

.PARAMETER CsvPath
    Optional explicit path to the marker CSV. If omitted, the script looks for
    the most recently modified "Cut Markers - *.csv" in the case's Production/ folder.

.PARAMETER CaseStatus
    Case status folder (Active, Pipeline, Parked, Complete). Defaults to Active.

.EXAMPLE
    .\csv-to-footage-log.ps1 "Eddie Irizarry"
    .\csv-to-footage-log.ps1 "Case 002 - Eddie Irizarry"
    .\csv-to-footage-log.ps1 "Eddie Irizarry" -CaseStatus Active
    .\csv-to-footage-log.ps1 "Eddie Irizarry" -CsvPath "C:\path\to\specific.csv"
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$CaseName,

    [string]$CsvPath,

    [ValidateSet('Active', 'Pipeline', 'Parked', 'Complete')]
    [string]$CaseStatus = 'Active'
)

$ErrorActionPreference = 'Stop'

# ---- locate the case folder ----
$casesRoot = "C:\Users\Sean\YouTube\01 - Cases\$CaseStatus"

if ($CaseName -match '^Case \d+ - ') {
    $caseFolder = Join-Path $casesRoot $CaseName
} else {
    # Find by matching the suffix
    $match = Get-ChildItem -Path $casesRoot -Directory | Where-Object { $_.Name -like "*- $CaseName" } | Select-Object -First 1
    if (-not $match) {
        Write-Host ""
        Write-Host "Error: no case folder matching '$CaseName' under $casesRoot" -ForegroundColor Red
        Write-Host ""
        Write-Host "Available cases:" -ForegroundColor Cyan
        Get-ChildItem -Path $casesRoot -Directory | ForEach-Object { Write-Host "  - $($_.Name)" }
        exit 1
    }
    $caseFolder = $match.FullName
}

if (-not (Test-Path $caseFolder)) {
    Write-Host "Error: case folder not found: $caseFolder" -ForegroundColor Red
    exit 1
}

$productionFolder = Join-Path $caseFolder "Production"
if (-not (Test-Path $productionFolder)) {
    New-Item -ItemType Directory -Force -Path $productionFolder | Out-Null
}

# ---- locate the CSV ----
if (-not $CsvPath) {
    $candidates = Get-ChildItem -Path $productionFolder -Filter "Cut Markers - *.csv" -ErrorAction SilentlyContinue |
        Sort-Object LastWriteTime -Descending
    if (-not $candidates) {
        Write-Host ""
        Write-Host "Error: no 'Cut Markers - *.csv' files found in $productionFolder" -ForegroundColor Red
        Write-Host "Export markers from Premiere first: Window -> Markers -> Export Markers" -ForegroundColor Yellow
        Write-Host "Save as: Production\Cut Markers - YYYY-MM-DD.csv" -ForegroundColor Yellow
        exit 1
    }
    $CsvPath = $candidates[0].FullName
}

if (-not (Test-Path $CsvPath)) {
    Write-Host "Error: CSV not found at $CsvPath" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Case folder: $caseFolder" -ForegroundColor Cyan
Write-Host "CSV input:   $CsvPath" -ForegroundColor Cyan

# ---- parse the CSV ----
# Premiere marker CSV columns vary by version, but typically include:
#   "Marker Name", "Description", "In", "Out", "Duration", "Marker Type"
# For source clip markers, there may also be a clip identifier column.
# We use flexible header matching so the script tolerates header naming differences.

$rows = Import-Csv -Path $CsvPath
if (-not $rows -or $rows.Count -eq 0) {
    Write-Host "Warning: CSV is empty or contains no rows" -ForegroundColor Yellow
    exit 0
}

# Identify columns
$sample = $rows[0]
$columns = $sample.PSObject.Properties.Name

function Find-Column {
    param([string[]]$Columns, [string[]]$Candidates)
    foreach ($c in $Candidates) {
        $match = $Columns | Where-Object { $_ -ieq $c } | Select-Object -First 1
        if ($match) { return $match }
    }
    foreach ($c in $Candidates) {
        $match = $Columns | Where-Object { $_ -ilike "*$c*" } | Select-Object -First 1
        if ($match) { return $match }
    }
    return $null
}

$colSource = Find-Column $columns @("Source", "Clip Name", "Source Name", "Name")
$colDesc   = Find-Column $columns @("Description", "Comment", "Marker Description", "Notes")
$colIn     = Find-Column $columns @("In", "Start", "In Point", "Marker In")
$colOut    = Find-Column $columns @("Out", "End", "Out Point", "Marker Out")
$colColour = Find-Column $columns @("Colour", "Color", "Marker Color")

if (-not $colDesc -or -not $colIn) {
    Write-Host "Error: CSV missing required columns (Description and In timestamps)" -ForegroundColor Red
    Write-Host "Columns found: $($columns -join ', ')" -ForegroundColor Yellow
    exit 1
}

Write-Host "Detected columns:" -ForegroundColor Gray
Write-Host "  Source:      $colSource"
Write-Host "  Description: $colDesc"
Write-Host "  In:          $colIn"
Write-Host "  Out:         $colOut"
Write-Host "  Colour:      $colColour"

# ---- categorise each marker ----
function Get-MarkerCategory {
    param([string]$Description, [string]$Colour)
    $desc = $Description.Trim()

    if ($desc -match '^CUT:\s*') {
        return @{ Status = '❌ NO'; Reason = ($desc -replace '^CUT:\s*', ''); Type = 'CUT' }
    }
    if ($desc -match '^VERIFY:\s*') {
        return @{ Status = '⚠️ MAYBE'; Reason = "VERIFY: " + ($desc -replace '^VERIFY:\s*', ''); Type = 'VERIFY' }
    }
    if ($desc -match '^MAYBE:\s*') {
        return @{ Status = '⚠️ MAYBE'; Reason = ($desc -replace '^MAYBE:\s*', ''); Type = 'MAYBE' }
    }
    if ($desc -match '^USE:\s*') {
        return @{ Status = '✅ YES'; Reason = ($desc -replace '^USE:\s*', ''); Type = 'USE' }
    }

    # No prefix — fall back to colour if available
    if ($Colour) {
        $c = $Colour.ToLower()
        if ($c -match 'white|grey|gray')  { return @{ Status = '❌ NO';    Reason = $desc; Type = 'CUT' } }
        if ($c -match 'red')              { return @{ Status = '⚠️ MAYBE'; Reason = "VERIFY: $desc"; Type = 'VERIFY' } }
        if ($c -match 'yellow|orange')    { return @{ Status = '⚠️ MAYBE'; Reason = $desc; Type = 'MAYBE' } }
        if ($c -match 'green|cyan|blue')  { return @{ Status = '✅ YES';   Reason = $desc; Type = 'USE' } }
    }

    # Default: assume USE (matches the convention "green = no prefix needed")
    return @{ Status = '✅ YES'; Reason = $desc; Type = 'USE' }
}

# ---- group by source file ----
$bySource = @{}
foreach ($row in $rows) {
    $source = if ($colSource) { $row.$colSource } else { '(unknown source)' }
    if ([string]::IsNullOrWhiteSpace($source)) { $source = '(unknown source)' }
    if (-not $bySource.ContainsKey($source)) { $bySource[$source] = @() }
    $bySource[$source] += $row
}

# ---- build the markdown ----
$caseFolderName = Split-Path $caseFolder -Leaf
$caseNum = ''
if ($caseFolderName -match '^Case (\d+) -') { $caseNum = $matches[1] }

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('---')
[void]$sb.AppendLine('tags:')
[void]$sb.AppendLine('  - footage-log')
[void]$sb.AppendLine("  - case/$caseNum")
[void]$sb.AppendLine("date-generated: $(Get-Date -Format 'yyyy-MM-dd')")
[void]$sb.AppendLine('source: Premiere marker CSV (auto-generated — do not edit by hand; re-export markers and re-run csv-to-footage-log.ps1)')
[void]$sb.AppendLine('---')
[void]$sb.AppendLine('')
[void]$sb.AppendLine("# Case $caseNum — Footage Log")
[void]$sb.AppendLine('')
[void]$sb.AppendLine("← [[$caseFolderName]] | [[Cut Sheet]] | [[Script]]")
[void]$sb.AppendLine('')
[void]$sb.AppendLine("*Auto-generated from `Cut Markers - *.csv` exported from Premiere. To update: re-export markers in Premiere (Window → Markers → Export Markers) and re-run `csv-to-footage-log.ps1`.*")
[void]$sb.AppendLine('')

$fileNum = 0
foreach ($source in $bySource.Keys | Sort-Object) {
    $fileNum++
    $markers = $bySource[$source]
    [void]$sb.AppendLine('---')
    [void]$sb.AppendLine('')
    [void]$sb.AppendLine("## File $fileNum — $source")
    [void]$sb.AppendLine('')
    [void]$sb.AppendLine("**Marker count:** $($markers.Count)")
    [void]$sb.AppendLine('')
    [void]$sb.AppendLine('### Timestamps')
    [void]$sb.AppendLine('')
    [void]$sb.AppendLine('| Start | End | Description | Use it? | Notes |')
    [void]$sb.AppendLine('|-------|-----|-------------|---------|-------|')

    foreach ($m in $markers | Sort-Object { $_.$colIn }) {
        $in   = if ($m.$colIn)  { $m.$colIn }  else { '' }
        $out  = if ($colOut -and $m.$colOut) { $m.$colOut } else { $in }
        $desc = if ($m.$colDesc) { $m.$colDesc } else { '' }
        $col  = if ($colColour -and $m.$colColour) { $m.$colColour } else { '' }

        $cat = Get-MarkerCategory -Description $desc -Colour $col
        $cleanDesc = $cat.Reason -replace '\|', '\|'
        [void]$sb.AppendLine("| $in | $out | $cleanDesc | $($cat.Status) |  |")
    }

    [void]$sb.AppendLine('')
    [void]$sb.AppendLine('### Status')
    [void]$sb.AppendLine('')
    [void]$sb.AppendLine('- [ ] Downloaded')
    [void]$sb.AppendLine('- [ ] Watched in full at least once')
    [void]$sb.AppendLine('- [ ] All script-referenced moments marked')
    [void]$sb.AppendLine('- [ ] Blur / redaction needs flagged')
    [void]$sb.AppendLine('')
}

[void]$sb.AppendLine('---')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('## Verified facts')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('*(Things confirmed by watching the footage itself — populate manually.)*')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('- ')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('## Pending verification')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('*(Things flagged for follow-up — populate manually.)*')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('- ')

$footageLogPath = Join-Path $productionFolder "Footage Log.md"

# Backup if exists
if (Test-Path $footageLogPath) {
    $historyFolder = Join-Path $caseFolder "_history"
    if (-not (Test-Path $historyFolder)) {
        New-Item -ItemType Directory -Force -Path $historyFolder | Out-Null
    }
    $backupName = "Footage Log - $(Get-Date -Format 'yyyy-MM-dd-HHmmss').md"
    Copy-Item $footageLogPath (Join-Path $historyFolder $backupName)
    Write-Host "Backed up existing Footage Log to _history/$backupName" -ForegroundColor Gray
}

Set-Content -Path $footageLogPath -Value $sb.ToString() -Encoding utf8

# ---- summary ----
$totalMarkers = ($rows | Measure-Object).Count
$uses    = ($rows | Where-Object { (Get-MarkerCategory -Description $_.$colDesc -Colour $(if ($colColour) { $_.$colColour } else { '' })).Type -eq 'USE' }).Count
$cuts    = ($rows | Where-Object { (Get-MarkerCategory -Description $_.$colDesc -Colour $(if ($colColour) { $_.$colColour } else { '' })).Type -eq 'CUT' }).Count
$maybes  = ($rows | Where-Object { (Get-MarkerCategory -Description $_.$colDesc -Colour $(if ($colColour) { $_.$colColour } else { '' })).Type -eq 'MAYBE' }).Count
$verifies = ($rows | Where-Object { (Get-MarkerCategory -Description $_.$colDesc -Colour $(if ($colColour) { $_.$colColour } else { '' })).Type -eq 'VERIFY' }).Count

Write-Host ""
Write-Host "Wrote: $footageLogPath" -ForegroundColor Green
Write-Host ""
Write-Host "Marker summary:" -ForegroundColor Cyan
Write-Host "  Total:    $totalMarkers"
Write-Host "  USE:      $uses    (will use)"
Write-Host "  MAYBE:    $maybes  (revisit)"
Write-Host "  VERIFY:   $verifies (needs check)"
Write-Host "  CUT:      $cuts    (Cut Notes candidates)"
Write-Host ""
Write-Host "Re-run after each major Premiere export to refresh the Footage Log." -ForegroundColor Gray
