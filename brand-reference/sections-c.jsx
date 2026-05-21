// LITE v2 — Sections 9-11: Thumbnail Anatomy (incl. vertical), Variants, Lower Thirds (w/ role icons)

function ThumbStandard({ headline, subtitle, withTimestamp = true }) {
  return (
    <div className="thumb-frame">
      {withTimestamp && <TimestampGlyph time="23:51:08" label="POV · OFFICER 1" />}
      <div className="amber-bar"></div>
      <div className="title">{headline || "Case Title Here"}</div>
      {subtitle && <div className="sub">{subtitle}</div>}
      <div className="wm"><span className="li">LEFT IN </span><span className="te">THE EDIT</span></div>
    </div>
  );
}
function ThumbInverted({ headline, subtitle }) {
  return (
    <div className="thumb-frame amber-inv">
      <TimestampGlyph time="04:12:33" label="POV · DASHCAM" />
      <div className="amber-bar"></div>
      <div className="title">{headline || "Case Title Here"}</div>
      {subtitle && <div className="sub">{subtitle}</div>}
      <div className="wm"><span className="li">LEFT IN </span><span className="te">THE EDIT</span></div>
    </div>
  );
}
function ThumbPhoto({ headline, subtitle, eyebrow }) {
  return (
    <div className="thumb-frame photo">
      <div className="photo-bg"></div>
      <div className="photo-label">BODYCAM STILL</div>
      <TimestampGlyph time="01:24:09" label="POV · OFFICER HAYES" />
      <div className="eyebrow">{eyebrow || "BODYCAM FOOTAGE"}</div>
      <div className="amber-bar"></div>
      <div className="title">{headline || "She Called 911."}</div>
      {subtitle && <div className="sub">{subtitle}</div>}
      <div className="wm"><span className="li">LEFT IN </span><span className="te">THE EDIT</span></div>
    </div>
  );
}
function ThumbStat({ headline, subtitle }) {
  return (
    <div className="thumb-frame stat">
      <TimestampGlyph time="00:00:30" label="POV · BODYCAM" />
      <div className="eyebrow">{headline ? headline.toUpperCase() : "BODYCAM SHOWS"}</div>
      <div className="stat-num">30</div>
      <div className="stat-unit">SECONDS</div>
      <div className="stat-tail">{subtitle || "he didn't know about"}</div>
      <div className="wm"><span className="li">LEFT IN </span><span className="te">THE EDIT</span></div>
    </div>
  );
}
function ThumbQuestion({ headline, subtitle }) {
  return (
    <div className="thumb-frame question">
      <TimestampGlyph time="14:23:00" label="DAY 400" />
      <div style={{ fontFamily: "serif", fontSize: 80, lineHeight: 0.5, color: "var(--amber)", marginBottom: 8, fontWeight: 400 }}>?</div>
      <div className="amber-bar"></div>
      <div className="title">{headline || "Why Did It Take 400 Days?"}</div>
      <div className="sub">{subtitle || "The answer is worse than the footage."}</div>
      <div className="wm"><span className="li">LEFT IN </span><span className="te">THE EDIT</span></div>
    </div>
  );
}
function ThumbLeftBar({ headline, subtitle, eyebrow }) {
  return (
    <div className="thumb-frame">
      <TimestampGlyph time="11:42:17" label="POV · INTERVIEW" />
      <div style={{ position: "absolute", left: 0, top: 28, bottom: 28, width: 3, background: "var(--amber)" }}></div>
      <div style={{ paddingLeft: 14 }}>
        <div className="eyebrow">{eyebrow || "WHAT THEY CUT"}</div>
        <div className="title">{headline || "She Named Her Victim Two Years Earlier"}</div>
        {subtitle && <div className="sub">{subtitle}</div>}
      </div>
      <div className="wm"><span className="li">LEFT IN </span><span className="te">THE EDIT</span></div>
    </div>
  );
}

function ThumbVertical({ headline = "She Called\n911", sub = "90 minutes later." }) {
  return (
    <div className="vert-frame">
      <div className="v-bar"></div>
      <TimestampGlyph time="23:51:08" />
      <div className="v-lite"><span className="li">LI</span><span className="te">TE</span></div>
      <div className="v-title">{headline}</div>
      <div className="v-sub">{sub}</div>
    </div>
  );
}

function SectionAnatomy() {
  return (
    <section className="section" id="anatomy">
      <SectionHead num="09" title="Thumbnail Anatomy · 16:9 + 9:16" desc="The constants for both landscape and vertical. Shorts/TikTok formula spec'd, not improvised." isNew />

      <div className="anatomy-row">
        <ThumbStandard headline={"3–5 Word\nCase Title"} subtitle={null} />
        <div>
          <div className="label dim" style={{ marginBottom: 10 }}>16:9 · YouTube</div>
          <div className="anatomy-list">
            <div className="item"><span className="n">1</span><div><h5>Background #141414</h5><p>Deep charcoal — not pure black. Stops the thumb looking like a flat square.</p></div></div>
            <div className="item"><span className="n">2</span><div><h5>Amber bar · 48 × 3 px</h5><p>Above the headline. Same position, every video. Primary recognition.</p></div></div>
            <div className="item"><span className="n">3</span><div><h5>Timestamp glyph · top-right</h5><p>Real timestamp from the moment of the hook. Secondary recognition. <i>New in v2.</i></p></div></div>
            <div className="item"><span className="n">4</span><div><h5>Headline · Inter Bold</h5><p>3–5 words max. White. 4.5:1 minimum contrast.</p></div></div>
            <div className="item"><span className="n">5</span><div><h5>LITE mark · bottom-left</h5><p>Mono, 11px, 4px tracking. Replaces the full wordmark in v2.</p></div></div>
            <div className="item"><span className="n">6</span><div><h5>Image treatment</h5><p>Desaturated, slightly graded. Never raw screenshots.</p></div></div>
          </div>
        </div>
      </div>

      {/* Vertical / Shorts */}
      <div style={{ marginTop: 56, paddingTop: 36, borderTop: "1px solid var(--border)" }}>
        <div className="label" style={{ marginBottom: 10 }}>Vertical · Shorts · TikTok · 9:16 — NEW</div>
        <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-.5px", margin: "0 0 14px" }}>
          The amber bar pivots from <span style={{ color: "var(--amber)" }}>horizontal top</span> to <span style={{ color: "var(--amber)" }}>vertical left</span>.
        </h3>
        <p style={{ color: "var(--text-dim)", maxWidth: 720, fontSize: 14, lineHeight: 1.65, margin: "0 0 24px" }}>
          A 48×3 horizontal bar in 9:16 becomes a smudge. The vertical formula rotates the recognition
          element: 3-wide amber strip down the left edge (spans 64% of frame height), LITE mark anchored
          top-left, timestamp glyph stays top-right, headline lives in the bottom third.
        </p>

        <div className="vert-pair">
          <div>
            <div className="label dim" style={{ marginBottom: 10 }}>16:9 source</div>
            <ThumbStandard headline="She Called 911. 90 Minutes Later." />
          </div>
          <div className="arrow-col">→</div>
          <div>
            <div className="label dim" style={{ marginBottom: 10, textAlign: "center" }}>9:16 derived</div>
            <ThumbVertical headline={"She Called\n911"} sub="90 minutes later." />
          </div>
        </div>

        <div className="vert-spec" style={{ marginTop: 28 }}>
          <div className="label" style={{ marginBottom: 10 }}>Spec — 9:16 (1080 × 1920)</div>
          <ul>
            <li><b>Amber bar</b>3px wide × 64% height · left edge · vertically centred</li>
            <li><b>LITE mark</b>top-left · 24px from edges · mono 14px · 4px tracking</li>
            <li><b>Timestamp</b>top-right · 24px from edges · pulsing dot retained</li>
            <li><b>Headline</b>bottom third · max 2 lines · max 4 words per line · Inter Bold 56–72px</li>
            <li><b>Sub-line</b>directly under headline · mono · amber · 14px · single line</li>
            <li><b>Safe zone</b>top 15% and bottom 15% reserved for platform UI (Shorts caption, TikTok)</li>
          </ul>
        </div>
      </div>

      <div className="section-foot-do-dont" style={{ marginTop: 32 }}>
        <div className="card do">
          <div className="head" style={{ color: "var(--amber)" }}>✓ DO</div>
          <ul>
            <li style={{ color: "var(--text-dim)" }}>Amber + timestamp + LITE mark — same positions, every thumbnail</li>
            <li style={{ color: "var(--text-dim)" }}>Derive 9:16 by rotating the amber bar, not just cropping</li>
            <li style={{ color: "var(--text-dim)" }}>Real timestamps lifted from the source clip</li>
            <li style={{ color: "var(--text-dim)" }}>4.5:1 minimum contrast on all text</li>
          </ul>
        </div>
        <div className="card dont">
          <div className="head" style={{ color: "var(--crimson)" }}>✗ DON'T</div>
          <ul>
            <li style={{ color: "var(--text-dim)" }}>Crop the 16:9 thumb into 9:16 — it always loses the amber</li>
            <li style={{ color: "var(--text-dim)" }}>Invent timestamps to look “evidence-y”</li>
            <li style={{ color: "var(--text-dim)" }}>Use Impact, Bebas, or condensed-heavy faces</li>
            <li style={{ color: "var(--text-dim)" }}>Pure #FF0000 — use #C8102E crimson only</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

const VARIANTS_V2 = [
  { id: "standard", label: "Dark Standard", Comp: ThumbStandard, file: "thumbnail-template-dark.svg", desc: "Default format. Case title + subtitle on deep charcoal." },
  { id: "inverted", label: "Amber Inverted", Comp: ThumbInverted, file: "thumbnail-template-yellow.svg", desc: "High-contrast variation. Max 1 in 5 videos." },
  { id: "photo", label: "Photo Overlay", Comp: ThumbPhoto, file: "thumbnail-template-with-photo.svg", desc: "When a specific frame from the footage is striking. Grade the still first." },
  { id: "stat", label: "Stat / Number", Comp: ThumbStat, file: "concept-stat-30-seconds.svg", desc: "When a number tells the story. Hardest format to copy." },
  { id: "question", label: "Question", Comp: ThumbQuestion, file: "concept-question-format.svg", desc: "When the hook is a question. Under 10 words; sub must pay it off." },
  { id: "leftbar", label: "Left Bar", Comp: ThumbLeftBar, file: "concept-left-bar-dark.svg", desc: "Secondary headline variant. Works for multi-part series." },
];

function ThumbnailLab() {
  const [variant, setVariant] = React.useState("standard");
  const [headline, setHeadline] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const V = VARIANTS_V2.find((v) => v.id === variant);
  const Comp = V.Comp;
  const props = { headline, subtitle };

  return (
    <div className="thumb-lab">
      <div>
        <div className="label dim" style={{ marginBottom: 10 }}>Live preview · 16:9 · with timestamp glyph</div>
        <Comp {...props} />
        <p className="mono" style={{ fontSize: 10, color: "var(--text-dimmer)", marginTop: 10, letterSpacing: 1 }}>{V.file}</p>
      </div>
      <div className="lab-controls">
        <div className="group">
          <label>VARIANT</label>
          <div className="variant-pills">
            {VARIANTS_V2.map((v) => (
              <button key={v.id} className={"variant-pill " + (variant === v.id ? "on" : "")} onClick={() => setVariant(v.id)}>{v.label}</button>
            ))}
          </div>
        </div>
        <div className="group">
          <label>HEADLINE</label>
          <input type="text" placeholder="Case Title" value={headline} onChange={(e) => setHeadline(e.target.value)} />
        </div>
        <div className="group">
          <label>SUBTITLE</label>
          <input type="text" placeholder="Optional subline" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
        </div>
        <div style={{ fontSize: 11, color: "var(--text-dim)", lineHeight: 1.6, paddingTop: 8, borderTop: "1px solid var(--border)" }}>
          <b style={{ color: "var(--text)", fontWeight: 600 }}>{V.label}.</b> {V.desc}
        </div>
      </div>
    </div>
  );
}

function SectionVariants() {
  return (
    <section className="section" id="variants">
      <SectionHead num="10" title="Thumbnail Variants" desc="Six variants on the anatomy. Dark Standard is default; the timestamp glyph is on every one." />
      <div className="variant-grid">
        {VARIANTS_V2.map((v) => {
          const Comp = v.Comp;
          return (
            <div key={v.id} className="variant-cell">
              <Comp />
              <p className="name">{v.label}</p>
              <p className="desc">{v.desc}</p>
              <p className="filename">{v.file}</p>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 36 }}>
        <div className="label" style={{ marginBottom: 8 }}>Try it · live preview</div>
        <ThumbnailLab />
      </div>
    </section>
  );
}

const ROLE_GLYPHS = [
  { glyph: "U", nm: "Uniformed Officer", desc: "Patrol / responding" },
  { glyph: "D", nm: "Detective", desc: "Plainclothes / investigator" },
  { glyph: "911", nm: "Dispatcher", desc: "911 call / radio audio" },
  { glyph: "C", nm: "CCTV", desc: "Fixed surveillance" },
  { glyph: "DC", nm: "Dashcam", desc: "Vehicle-mounted" },
  { glyph: "IV", nm: "Interview", desc: "Sit-down or deposition" },
  { glyph: "W", nm: "Witness", desc: "Civilian account" },
  { glyph: "?", nm: "Unknown / Anonymised", desc: "Identity withheld" },
];

function LowerThirdPlayground() {
  const [name, setName] = React.useState("OFFICER MARTINEZ");
  const [appearance, setAppearance] = React.useState("first");
  const [role, setRole] = React.useState("U");
  const [showCorner, setShowCorner] = React.useState(true);
  const [showStamp, setShowStamp] = React.useState(true);

  return (
    <div className="lt-playground">
      <div className="lt-stage">
        <div className="footage-label">BODYCAM 4K · 23:51:08</div>
        {showCorner && (
          <div className="corner-tag">
            <span className="role-icon">{role}</span>
            <span>POV · {name.split(" ")[0]} {name.split(" ").slice(1).join(" ")}</span>
          </div>
        )}
        {showStamp && <TimestampGlyph time="23:51:08" label={null} />}
        <div className={"lower-third " + (appearance === "first" ? "amber" : "white")}>
          <span>{name}</span>
        </div>
      </div>
      <div className="lt-controls">
        <div className="group">
          <span className="label dim">SPEAKER NAME</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value.toUpperCase())} />
        </div>
        <div className="group">
          <span className="label dim">APPEARANCE</span>
          <div className="seg">
            <button className={appearance === "first" ? "on" : ""} onClick={() => setAppearance("first")}>First — Amber</button>
            <button className={appearance === "repeat" ? "on" : ""} onClick={() => setAppearance("repeat")}>Repeat — White</button>
          </div>
        </div>
        <div className="group">
          <span className="label dim">ROLE GLYPH</span>
          <div className="variant-pills">
            {ROLE_GLYPHS.map((r) => (
              <button key={r.glyph} className={"variant-pill " + (role === r.glyph ? "on" : "")} onClick={() => setRole(r.glyph)}>{r.glyph} · {r.nm.split(" ")[0]}</button>
            ))}
          </div>
        </div>
        <label className="check"><input type="checkbox" checked={showCorner} onChange={(e) => setShowCorner(e.target.checked)} /> Corner tag</label>
        <label className="check"><input type="checkbox" checked={showStamp} onChange={(e) => setShowStamp(e.target.checked)} /> Timestamp glyph</label>
      </div>
    </div>
  );
}

function SectionLowerThirds() {
  return (
    <section className="section" id="lower-thirds">
      <SectionHead num="11" title="Lower Thirds + Role Glyphs" desc="Amber/white rule retained. Role glyphs replace the brittle Officer 1/2 numbering when possible." isNew />

      <LowerThirdPlayground />

      <p style={{ color: "var(--text-dim)", fontSize: 14, lineHeight: 1.65, marginTop: 28, maxWidth: 760 }}>
        v1 fell back to “Officer 1, Officer 2” when names weren't available — by Part 3 of a series, nobody
        remembered who Officer 2 was. v2 introduces eight <b style={{ color: "var(--text)" }}>role glyphs</b> that
        carry texture without breaking anonymisation. They sit inside the lower-third and the corner tag,
        always 1.5px stroke, always circle, always Mono.
      </p>

      <div className="role-grid">
        {ROLE_GLYPHS.map((r) => (
          <div key={r.glyph} className="role-tile">
            <div className="glyph">{r.glyph}</div>
            <div className="nm">{r.nm}</div>
            <div className="desc">{r.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { SectionAnatomy, SectionVariants, SectionLowerThirds, ThumbStandard, TimestampGlyph });
