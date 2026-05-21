// LITE v2 — data + sidebar + hero + section head

const NAV_V2 = [
  { group: "01 — Brand", items: [
    { id: "brand-reference", label: "Brand Reference", active: true, version: "v2" },
    { id: "channel-banner", label: "Channel Banner", href: "site/channel-banner.html" },
  ]},
  { group: "02 — Editorial", items: [
    { id: "editorial", label: "Editorial Standards", href: "site/editorial-standards.html" },
    { id: "redaction-reveal", label: "Redaction / Reveal", href: "site/redaction-reveal.html" },
    { id: "title-thumb", label: "Title & Thumbnail", href: "site/title-thumbnail-system.html" },
  ]},
  { group: "03 — Production", items: [
    { id: "pipeline", label: "Production Pipeline", href: "site/production-pipeline.html" },
    { id: "skill", label: "Skill Workflow", href: "site/skill-workflow.html" },
    { id: "social", label: "Social Media Workflow", href: "site/social-media-workflow.html" },
  ]},
  { group: "04 — Archive", items: [
    { id: "thumb-gen", label: "Thumbnail Generator", href: "site/thumbnail-generator.html" },
    { id: "thumb-research", label: "Thumbnail Research", href: "site/thumbnail-research.html" },
    { id: "logo-concepts", label: "Logo Concepts", href: "site/logo-sketches.html" },
    { id: "icon-concepts", label: "Icon Concepts", href: "site/icon-concepts.html" },
    { id: "comp-analysis", label: "Competitor Analysis", href: "site/competitor-analysis.html" },
    { id: "cheatsheet", label: "Claude Cheatsheet", href: "site/claude-skills-cheatsheet.html" },
    { id: "colour-comp", label: "Colour Comparison", href: "site/colour-comparison.html" },
    { id: "expenses", label: "Expenses", href: "site/expenses.html" },
    { id: "landing", label: "Landing Page", href: "site/landing-page.html" },
  ]},
];

const SECTIONS_V2 = [
  { num: "01", id: "palette",       title: "Colour Palette",                desc: "Documentary Amber held from v1. The other additions carry the recognition load." },
  { num: "02", id: "recog-primary", title: "Primary Recognition — Amber Bar", desc: "One amber bar · Same position · Every asset · Every time." },
  { num: "03", id: "recog-secondary", title: "Secondary Recognition — Timestamp Glyph", desc: "A second locked element. Bodycam-native [HH:MM:SS] with pulsing amber dot, top-right." },
  { num: "04", id: "redaction",     title: "Redaction & The Cut Log",       desc: "Two transparency primitives. The first hides. The second discloses what was trimmed." },
  { num: "05", id: "type",          title: "Typography",                    desc: "Inter Bold (editorial) + JetBrains Mono (evidence). The mono register codifies the timestamp style." },
  { num: "06", id: "mark",          title: "The Mark — LITE Canonical",     desc: "LITE everywhere. The full wordmark is demoted to channel-page and About-section use only." },
  { num: "07", id: "tagline",       title: "Tagline",                       desc: "“Every cut, on the record.” — replaces “Nothing left out.”" },
  { num: "08", id: "voice",         title: "Brand Voice & POV",             desc: "Documentary register, with a stated stance. Skeptical of every party. Loyal only to footage." },
  { num: "09", id: "anatomy",       title: "Thumbnail Anatomy · 16:9 + 9:16", desc: "The constants for both landscape and vertical. Shorts/TikTok formula spec'd, not improvised." },
  { num: "10", id: "variants",      title: "Thumbnail Variants",            desc: "Six variants on the anatomy — Dark Standard is default; the timestamp glyph is on every one." },
  { num: "11", id: "lower-thirds",  title: "Lower Thirds + Role Glyphs",    desc: "Amber/white rule retained. Role glyphs replace the brittle Officer 1/2 numbering when possible." },
  { num: "12", id: "captions",      title: "Caption & Subtitle Styling",    desc: "Speaker label amber · narration white · semi-transparent pill on every line." },
  { num: "13", id: "hierarchy",     title: "Graphics Overlay Hierarchy",    desc: "Five layers, top to bottom. Corner tag above timestamp glyph. Chapter cards and source labels spec." },
  { num: "14", id: "motion-audio",  title: "Motion & Audio",                desc: "Title-card pacing, narration cadence, score (silence by default), reveal stings." },
  { num: "15", id: "footage",       title: "Footage Treatment",             desc: "Clinical grade, same node stack across every clip. Unchanged from v1." },
];

function Hero() {
  return (
    <header className="hero">
      <div className="eyebrow">01 — Brand · Left in the Edit</div>
      <h1>Brand <span className="te">Reference.</span></h1>
      <p className="lede">
        Second pass on the brand system. The system around it changed. A second recognition element was added.
        Redaction and editorial transparency are now first-class primitives. Vertical, motion and
        audio are spec'd. The tagline was retired.
      </p>
      <div className="hero-foot">
        <span className="v2-pill">v2</span>
        <a className="changelog-link" href="Brand Reference Changelog.html">
          View changelog →
        </a>
      </div>
    </header>
  );
}

function SectionHead({ num, title, desc, isNew }) {
  return (
    <div className="section-head">
      <div className="section-num">{num}</div>
      <div className="section-title">
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
    </div>
  );
}

Object.assign(window, { NAV_V2, SECTIONS_V2, Hero, SectionHead });
