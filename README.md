# LITE Tools

Interactive HTML references and generators for **Left in the Edit** — a documentary YouTube channel covering true crime and police cases using raw public-record footage (bodycam, dashcam, dispatch audio, court records). Tagline: *Nothing left out.*

This repo is the channel's brand and production reference site. Each page is a self-contained HTML tool — open in a browser, no build step.

## Structure

```
.
├── hub.html                      Landing page — start here
├── sidebar.js                    Shared navigation script (referenced by every page)
├── favicon.svg                   Shared favicon
│
├── 01_Brand/                     Brand reference, logo, colour, typography, icons
├── 02_Production/                Production pipeline, editorial standards, generators
├── 03_Packaging/                 Title + thumbnail system, generator, research
└── 04_Distribution/              Social media workflow, competitor analysis, landing page
```

## Usage

Open `hub.html` in any modern browser. Every page is a static HTML file — no server, no build, no install. Just double-click and it opens.

## Editing

Each page is a single self-contained file with inline CSS and JS. Changes:

1. Edit the file directly
2. Hard-refresh in the browser (Ctrl+F5) to bypass cache
3. Commit + push when the change is locked in

The `sidebar.js` file is shared across every page. If you change it, every page picks up the change.

## Not in this repo

- The full vault (case research, scripts, footage, audio) lives outside this folder and isn't published
- Voice training material and the cloned-voice files are kept private
- Working / draft files (`_versions/`, `_template.html`) are excluded via `.gitignore`

## Source of truth

If anything outside this repo references brand standards (colours, typography, tone), this repo wins. The HTML pages are the live spec.
