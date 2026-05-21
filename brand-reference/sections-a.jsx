// LITE v2 — Sections 1-4: Palette, Primary recognition, Secondary recognition, Redaction + Cut Log

const PALETTE_V2 = [
  { name: "Documentary Amber", hex: "#D4A800", desc: "Recognition colour. Held from v1 — the rest of the system did the heavy lifting in v2.", contrast: "8.2:1 on #111", tag: "Primary" },
  { name: "Deep Charcoal", hex: "#111111", desc: "Primary background. Warmer than pure black — more cinematic.", contrast: "Baseline", tag: "Background" },
  { name: "Thumbnail Charcoal", hex: "#141414", desc: "For thumbnails. Slightly lighter than body bg — stops it looking like a flat square in feed.", contrast: "~16:1 with text", tag: "Thumbnail BG" },
  { name: "Deep Crimson", hex: "#C8102E", desc: "One element per thumbnail maximum. Never dominant. Case-specific — only when it earns it.", contrast: "4.9:1 on #111", tag: "Accent only" },
  { name: "Off-White", hex: "#F0EFE7", desc: "Body text and headings. Slightly warm — less harsh than pure white. Bumped from #E8E8E0 for AA at small sizes.", contrast: "17:1 on #111", tag: "Text" },
];

function Swatch({ s }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(s.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 900);
  };
  return (
    <div className={"swatch " + (copied ? "copied-on" : "")} onClick={copy} title="Click to copy hex">
      <div className="swatch-chip" style={{ background: s.hex }}>
        <span className="corner">{s.tag}</span>
      </div>
      <div className="swatch-meta">
        <div className="name">{s.name}</div>
        <div className="hex">{s.hex}</div>
        <div className="desc">{s.desc}</div>
        <div className="contrast">{s.contrast}</div>
        {s.delta && <div className="delta">{s.delta}</div>}
      </div>
      <div className="copied">COPIED</div>
    </div>
  );
}

function SectionPalette() {
  return (
    <section className="section" id="palette">
      <SectionHead num="01" title="Colour Palette" desc="Documentary Amber held from v1 — the additions in v2 carry the recognition load instead." />
      <div className="palette">
        {PALETTE_V2.map((s) => <Swatch key={s.hex} s={s} />)}
      </div>

      <p style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 18, lineHeight: 1.6, maxWidth: 720 }}>
        v2 holds the v1 amber. The risk of confusion with police-tape yellow is real, but it's mitigated
        by the second recognition element (§03 timestamp glyph), the locked LITE mark position, and
        the editorial transparency primitives — not by changing the colour.
      </p>

      <div style={{ marginTop: 36 }}>
        <div className="label" style={{ color: "var(--crimson)", marginBottom: 14 }}>Never use as primary</div>
        <div className="never-use">
          {[
            ["#1B5FA8", "#1B5FA8 Police Blue", "Blends into YouTube's grey interface"],
            ["#FF0000", "#FF0000 YouTube Red", "Clashes with YouTube UI — creates visual noise"],
            ["#FFDD00", "#FFDD00 Police-Tape Yellow", "Generic — signals the subgenre, not your channel"],
            ["#000000", "#000000 Pure Black", "Too flat for thumbnails — use #141414 instead"],
          ].map(([hex, n, why]) => (
            <div key={hex} className="card">
              <div className="chip" style={{ background: hex }}></div>
              <div className="text"><b>{n}</b>{why}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionPrimaryRecog() {
  return (
    <section className="section" id="recog-primary">
      <SectionHead num="02" title="Primary Recognition — Amber Bar" desc="One amber bar · Same position · Every asset · Every time." />
      <p style={{ color: "var(--text-dim)", maxWidth: 720, margin: "0 0 28px", fontSize: 14, lineHeight: 1.6 }}>
        Unchanged from v1. The amber bar is the first locked element — viewers pattern-match it within
        a few videos and click on recognition alone. This element alone is not enough, which is why
        §03 introduces a second.
      </p>
      <div className="accent-grid">
        <div className="accent-demo">
          <div className="label">Horizontal bar · thumbnails · hero</div>
          <div>
            <div className="bar-h"></div>
            <h4>Case Title Here</h4>
            <p>48px wide · 3px tall · above the headline</p>
          </div>
        </div>
        <div className="accent-demo">
          <div className="label">Vertical rule · web · doc dividers</div>
          <div>
            <h4><span className="bar-v"></span>Section Heading</h4>
            <p>Used to mark key sections</p>
          </div>
        </div>
        <div className="accent-demo">
          <div className="label">Text highlight · labels · pull quotes</div>
          <div>
            <h4>LEFT IN <span className="hl-text">THE EDIT</span></h4>
            <p>Amber on key phrase only — not the entire text</p>
          </div>
        </div>
        <div className="accent-demo">
          <div className="label">Bottom border · cards · thumbnails</div>
          <div>
            <h4>Card or thumbnail element</h4>
            <p>3px amber bottom border</p>
          </div>
          <div className="bar-b"></div>
        </div>
      </div>
    </section>
  );
}

function TimestampGlyph({ time = "23:51:08", label = "POV · OFFICER MARTINEZ" }) {
  return (
    <div className="timestamp-glyph">
      <span className="dot"></span>
      <span>{time}</span>
      {label && <span className="label">· {label}</span>}
    </div>
  );
}

function SectionSecondaryRecog() {
  const [time, setTime] = React.useState("23:51:08");

  // tick the demo clock so the dot pulse + time feel live
  React.useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        const [h, m, s] = t.split(":").map(Number);
        let ns = s + 1, nm = m, nh = h;
        if (ns >= 60) { ns = 0; nm++; }
        if (nm >= 60) { nm = 0; nh++; }
        if (nh >= 24) { nh = 0; }
        return [nh, nm, ns].map((n) => String(n).padStart(2, "0")).join(":");
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section" id="recog-secondary">
      <SectionHead num="03" title="Secondary Recognition — Timestamp Glyph" desc="A second locked element. Bodycam-native [HH:MM:SS] with pulsing amber dot." isNew />
      <p style={{ color: "var(--text-dim)", maxWidth: 720, margin: "0 0 28px", fontSize: 14, lineHeight: 1.6 }}>
        The amber bar alone is a single point of failure — the first competitor with a design budget copies it. The
        timestamp glyph adds a second ownable element. It looks like evidence (bodycam-native overlay), it can't be
        confused with a generic UI badge, and the pulsing dot reads as <i>live</i> — even on a still thumbnail. Together,
        they form the brand's recognition pair: one geometric, one informational.
      </p>

      <div className="tstamp-frame">
        <div className="footage-grain"></div>
        <TimestampGlyph time={time} label="POV · OFFICER MARTINEZ" />
        <div className="amber-bar"></div>
        <div className="title">She Called 911.<br/>90 Minutes Later.</div>
        <div className="wm"><span className="li">LEFT IN </span><span className="te">THE EDIT</span></div>
      </div>

      <div className="recog-pair" style={{ marginTop: 28 }}>
        <div className="card recog-card">
          <span className="role">Spec — anatomy</span>
          <h4 className="name">[HH:MM:SS] · pulsing dot · case identifier</h4>
          <p className="desc">
            Mono font (JetBrains). 12px on thumbnails, 14px on lower-thirds in-video. Background <span className="mono">rgba(0,0,0,.6)</span>,
            1px border <span className="mono">rgba(255,255,255,.12)</span>, 6px pad, 2px radius. Always top-right corner.
            6px amber dot, 2s pulse cycle. Optional second segment <span className="mono">· POV · NAME</span> in 9px amber.
          </p>
        </div>
        <div className="card recog-card">
          <span className="role">Spec — behaviour</span>
          <h4 className="name">Pull the timestamp from the source clip — never invent</h4>
          <p className="desc">
            On thumbnails: lift the timestamp from the moment of the hook ("the 90 minutes" frame, "the contradiction" frame).
            In-video: re-sync to actual bodycam playback time on every cut. The promise is <i>this is the moment</i> —
            making one up breaks it.
          </p>
        </div>
      </div>
    </section>
  );
}

function RedactionDemo() {
  const [revealed, setRevealed] = React.useState(false);
  return (
    <div className={"redact-stage " + (revealed ? "revealed" : "")} onClick={() => setRevealed(!revealed)}>
      <div className="doc-line">
        OFFICER STATEMENT — Subject became <span className="redact">non-compliant</span> at approximately <span className="redact">04:12</span>
        <br/>following verbal commands. Body-worn camera was <span className="redact">deactivated</span>
        <br/>for <span className="redact">3 minutes 14 seconds</span> during the encounter.
      </div>
      <div className="hint">{revealed ? "↺ HIDE — REDACTED VERSION" : "▶ CLICK TO REVEAL"}</div>
    </div>
  );
}

function SectionRedaction() {
  return (
    <section className="section" id="redaction">
      <SectionHead num="04" title="Redaction & The Cut Log" desc="Two transparency primitives. The first hides. The second discloses what was trimmed." isNew />

      <p style={{ color: "var(--text-dim)", maxWidth: 760, margin: "0 0 28px", fontSize: 14, lineHeight: 1.6 }}>
        Redaction was teased in the v1 nav but never spec'd. It belongs here, before thumbnails, because
        it's the channel's literal premise. The Cut Log is its companion: when the editor trims footage
        for time or relevance (not for cover), the omission is named on screen. This makes <i>your</i> edits
        transparent in contrast to the cuts you're restoring.
      </p>

      <div className="label" style={{ marginBottom: 10 }}>Redaction — interactive demo · click to reveal</div>
      <RedactionDemo />

      <div className="redact-spec">
        <div className="cell"><div className="k">Bar fill</div><div className="v">#060606</div></div>
        <div className="cell"><div className="k">Texture</div><div className="v">2px horiz stripes 4% white</div></div>
        <div className="cell"><div className="k">Reveal duration</div><div className="v">4 frames lift · 8 frames hold</div></div>
        <div className="cell"><div className="k">Audio sting</div><div className="v">Sub-bass drop · 1.5s · −18 LUFS</div></div>
        <div className="cell"><div className="k">Revealed colour</div><div className="v">Sodium Amber + glow</div></div>
        <div className="cell"><div className="k">Cadence</div><div className="v">Max 1 reveal / 90s footage</div></div>
        <div className="cell"><div className="k">Type</div><div className="v">JetBrains Mono · letter-spacing 0.5px</div></div>
        <div className="cell"><div className="k">When to use</div><div className="v">Only on terms in the public record</div></div>
      </div>

      {/* The Cut Log */}
      <div style={{ marginTop: 56, paddingTop: 36, borderTop: "1px solid var(--border)" }}>
        <div className="label" style={{ marginBottom: 10 }}>The Cut Log — companion primitive</div>
        <h3 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-.6px", margin: "0 0 14px", lineHeight: 1.15 }}>
          Every editorial cut is <span style={{ color: "var(--amber)" }}>named on screen</span>.
        </h3>
        <p style={{ color: "var(--text-dim)", maxWidth: 720, fontSize: 14, lineHeight: 1.65, margin: "0 0 24px" }}>
          When raw footage is trimmed for time (parked-car standoffs, dead air, radio chatter unrelated to the case),
          a small log entry appears for ~2 seconds noting what was omitted and why. The promise isn't <i>every frame</i>
          — it's <i>every cut, on the record</i>. The audit trail is the moat.
        </p>

        <div className="tstamp-frame" style={{ aspectRatio: "16/7" }}>
          <div className="footage-grain"></div>
          <TimestampGlyph time="14:23:47" label="POV · DASHCAM" />
          <CutLogChip />
          <div className="wm"><span className="li">LEFT IN </span><span className="te">THE EDIT</span></div>
        </div>

        <div className="redact-spec" style={{ marginTop: 18 }}>
          <div className="cell"><div className="k">Format</div><div className="v">[start–end] · reason</div></div>
          <div className="cell"><div className="k">On screen</div><div className="v">2.0–2.5 seconds</div></div>
          <div className="cell"><div className="k">Position</div><div className="v">Bottom-left · above lower-third</div></div>
          <div className="cell"><div className="k">Background</div><div className="v">rgba(0,0,0,.7) · 4px radius</div></div>
        </div>

        <div className="section-foot-do-dont" style={{ marginTop: 24 }}>
          <div className="card do">
            <div className="head" style={{ color: "var(--amber)" }}>✓ DO</div>
            <ul>
              <li style={{ color: "var(--text-dim)" }}>Name the timestamps of the cut — viewers will check</li>
              <li style={{ color: "var(--text-dim)" }}>Use plain language for the reason (no jargon, no euphemisms)</li>
              <li style={{ color: "var(--text-dim)" }}>Log every cut over 2 minutes — shorter trims are editorial routine</li>
              <li style={{ color: "var(--text-dim)" }}>Mirror the log in the video description (Tier 1 minimum)</li>
            </ul>
          </div>
          <div className="card dont">
            <div className="head" style={{ color: "var(--crimson)" }}>✗ DON'T</div>
            <ul>
              <li style={{ color: "var(--text-dim)" }}>Use the log to justify selective inclusion — that's what they do</li>
              <li style={{ color: "var(--text-dim)" }}>Hide cuts inside montage — every long cut gets its own entry</li>
              <li style={{ color: "var(--text-dim)" }}>Fake the reasons. The audit trail dies on the first lie</li>
              <li style={{ color: "var(--text-dim)" }}>Use the log on redaction — that's a different primitive</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

// Keep the old DO/DONT block out (it was moved above into the tier flow).

function CutLogChip() {
  return (
    <div style={{
      position: "absolute",
      bottom: "12%",
      left: "5%",
      padding: "10px 14px",
      background: "rgba(0,0,0,.75)",
      border: "1px solid rgba(255,255,255,.08)",
      borderLeft: "2px solid var(--amber)",
      borderRadius: 4,
      fontFamily: "var(--mono)",
      fontSize: 12,
      color: "#fff",
      letterSpacing: 0.5,
      display: "flex",
      flexDirection: "column",
      gap: 4,
      zIndex: 3,
    }}>
      <div style={{ fontSize: 9, letterSpacing: 2, color: "var(--amber)", fontWeight: 600 }}>CUT LOG</div>
      <div>[00:42 – 14:00]</div>
      <div style={{ color: "rgba(255,255,255,.7)", fontSize: 11 }}>parked-car standoff · no activity</div>
    </div>
  );
}

Object.assign(window, { SectionPalette, SectionPrimaryRecog, SectionSecondaryRecog, SectionRedaction, TimestampGlyph, TierStack });