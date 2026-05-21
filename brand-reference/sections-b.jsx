// LITE v2 — Sections 5-8: Type, Mark (LITE canonical), Tagline, Voice (w/ POV)

const TYPE_ROWS_V2 = [
  { tier: "Channel Title / Hero", spec: "Inter Bold · 80–112px · -2px tracking", desc: "Page hero, large callouts", sample: "Left in the Edit", cls: "hero-sample" },
  { tier: "Thumbnail Text", spec: "Inter Bold · 28–40px · -0.5px tracking · 3–5 words", desc: "Thumbnail headlines only.", sample: "Case Name Here", cls: "thumb-sample" },
  { tier: "Section Heading", spec: "Inter Bold · 20–28px · -0.3px tracking", desc: "Document and web headings", sample: "The Evidence", cls: "section-sample" },
  { tier: "Eyebrow / Label", spec: "Inter Medium · 10–11px · 4–5px tracking · ALL CAPS · Amber", desc: "Section labels, categories", sample: "TRUE CRIME · BODYCAM FOOTAGE", cls: "eyebrow-sample" },
  { tier: "Evidence / Mono · NEW", spec: "JetBrains Mono · 11–14px · 1.5px tracking · Amber", desc: "Timestamps, cut logs, evidence metadata.", sample: "[23:51:08] · POV · OFFICER MARTINEZ", cls: "mono-sample" },
  { tier: "Body Copy", spec: "Inter Regular · 14–16px · 1.7 line-height", desc: "Descriptions, captions, body text", sample: "The footage tells the story. Documentary breakdowns — not a reaction, not a recap.", cls: "body-sample" },
];

function SectionType() {
  return (
    <section className="section" id="type">
      <SectionHead num="05" title="Typography" desc="Inter Bold (editorial) + JetBrains Mono (evidence). The mono register is new in v2." />
      <div>
        {TYPE_ROWS_V2.map((r) => (
          <div className="type-row" key={r.tier}>
            <div className="meta">
              <span className="label dim">{r.tier}</span>
              <div className="spec">{r.spec}</div>
              <div className="desc">{r.desc}</div>
            </div>
            <div className={"sample " + r.cls}>{r.sample}</div>
          </div>
        ))}
      </div>

      <div className="font-grid">
        <div className="font-card">
          <div className="tag" style={{ color: "var(--amber)" }}>USE — PRIMARY</div>
          <div className="big">Inter Bold</div>
          <div className="desc">Editorial, authoritative. The default for everything.</div>
        </div>
        <div className="font-card">
          <div className="tag" style={{ color: "var(--amber)" }}>USE — EVIDENCE</div>
          <div className="big mono">JetBrains Mono</div>
          <div className="desc">Timestamps, cut logs, redaction reveals. The “bodycam-overlay” register.</div>
        </div>
        <div className="font-card">
          <div className="tag">USE — ALTERNATE</div>
          <div className="big" style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: 0 }}>Oswald SemiBold</div>
          <div className="desc">Strong, journalistic. Available as fallback for poster-style assets.</div>
        </div>
        <div className="font-card dont">
          <div className="tag" style={{ color: "var(--crimson)" }}>NEVER</div>
          <div className="big" style={{ fontFamily: "Impact, sans-serif" }}>IMPACT</div>
          <div className="desc">Reads as 2016. Every mid-tier channel.</div>
        </div>
        <div className="font-card dont">
          <div className="tag" style={{ color: "var(--crimson)" }}>NEVER</div>
          <div className="big" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Bebas Neue</div>
          <div className="desc">True-crime channel default — invisible.</div>
        </div>
        <div className="font-card dont">
          <div className="tag" style={{ color: "var(--crimson)" }}>NEVER</div>
          <div className="big" style={{ fontFamily: "'Creepster', serif" }}>DISTRESSED</div>
          <div className="desc">Signals low production value immediately.</div>
        </div>
      </div>
    </section>
  );
}

function SectionMark() {
  return (
    <section className="section" id="mark">
      <SectionHead num="06" title="The Mark — LITE Canonical" desc="LITE everywhere. Two marks were one too many — pick one and commit." isNew />
      <p style={{ color: "var(--text-dim)", maxWidth: 720, margin: "0 0 28px", fontSize: 14, lineHeight: 1.6 }}>
        In v1, the channel carried two marks: the full wordmark and the LITE abbreviation. Viewers had to learn both.
        v2 promotes LITE to canonical — used on the channel page, in-video watermarks, social profiles, merch, and the
        favicon. The full wordmark is now reserved for the YouTube About section and the channel banner only.
      </p>
      <div className="lite-grid">
        <div className="lite-mark dark">
          <span className="li">LI</span><span className="te">TE</span>
          <span className="ctx">On dark · primary use</span>
        </div>
        <div className="lite-mark amber">
          <span>LITE</span>
          <span className="ctx" style={{ color: "rgba(0,0,0,.7)" }}>On amber · merch · stings</span>
        </div>
        <div className="lite-mark outline">
          <span className="li">LI</span><span className="te">TE</span>
          <span className="ctx">Outline · light backgrounds</span>
        </div>
      </div>

      <div className="wordmark-demoted">
        <div className="mark"><span>LEFT IN </span><span className="te">THE EDIT</span></div>
        <div className="note">
          <b>Wordmark — demoted use only</b>
          Channel page · YouTube About · channel banner · email signatures. Anywhere the viewer has paused
          and is reading detail. Never use the wordmark inside a video, on a thumbnail, or as a profile picture.
        </div>
      </div>
    </section>
  );
}

function SectionTagline() {
  return (
    <section className="section" id="tagline">
      <SectionHead num="07" title="Tagline" desc="“Every cut, on the record.” — replaces “Nothing left out.”" isNew />

      <div className="tagline-hero">
        <p className="big">Every cut, on the record<span className="dot">.</span></p>
        <div className="sub">LOWERCASE · COMMA · PERIOD · NO EXCEPTIONS</div>
      </div>

      <p style={{ color: "var(--text-dim)", maxWidth: 760, margin: "0 0 16px", fontSize: 14, lineHeight: 1.65 }}>
        The v1 tagline — <i>Nothing left out.</i> — made an editorial promise the channel can't honour.
        Not every minute of dashcam belongs in a video; a parked car under sirens is not evidence, it's filler.
        v2 reframes the promise from <b style={{ color: "var(--text)" }}>completeness</b> to <b style={{ color: "var(--amber)" }}>transparency</b>.
        Every cut you make is named — timestamp and reason — on screen and in the description. The audit
        trail is the moat. Mid-tier channels won't bother to maintain it.
      </p>

      <div className="tagline-old">
        <span className="label-killed">v1 · RETIRED</span>
        <span className="old-line">Nothing left out.</span>
        <span className="why">Promised quantity. Couldn't keep the promise the first time we trimmed parked-car footage.</span>
      </div>

      <div className="do-dont" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24 }}>
        <div className="card">
          <div className="head" style={{ color: "var(--amber)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>✓ DO</div>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Every cut, on the record.</div>
            <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase" }}>EVERY CUT, ON THE RECORD</div>
          </div>
        </div>
        <div className="card">
          <div className="head" style={{ color: "var(--crimson)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>✗ DON'T</div>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 16, textDecoration: "line-through", textDecorationColor: "var(--crimson)", color: "var(--text-dim)" }}>Every Cut, On The Record.</div>
            <div style={{ fontWeight: 700, fontSize: 16, textDecoration: "line-through", textDecorationColor: "var(--crimson)", color: "var(--text-dim)" }}>every cut, on the record</div>
            <div style={{ fontWeight: 700, fontSize: 16, textDecoration: "line-through", textDecorationColor: "var(--crimson)", color: "var(--text-dim)" }}>Every cut on the record.</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, padding: "20px 24px", background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 4, fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6 }}>
        <span className="label" style={{ marginBottom: 8, display: "block" }}>Implementation</span>
        The tagline is a system, not a sentence. It commits the channel to: (a) an on-screen <b style={{ color: "var(--text)" }}>cut log</b> for every editorial omission (see §04), (b) a mirror of that log in the video description, (c) a pinned comment on multi-part series cross-referencing what was cut across episodes.
      </div>
    </section>
  );
}

function SectionVoice() {
  return (
    <section className="section" id="voice">
      <SectionHead num="08" title="Brand Voice & POV" desc="Documentary register, with a stated stance — skeptical of every party. Loyal only to footage." isNew />

      <div className="pov-stance">
        <span className="label">POV STANCE · v2 — NEW</span>
        <h3>Skeptical of every party. <span className="accent">Loyal only to footage.</span></h3>
        <p>
          The channel takes no side. Not the officer's. Not the suspect's. Not the prosecutor's, the defence attorney's,
          the family's, or the department's PR office. Every party in the case is given the same scrutiny against the
          same evidence — the footage, the transcripts, the public record. When sources contradict each other, the
          footage wins. When the footage is incomplete, the channel says so on screen.
        </p>
      </div>

      <div className="voice-grid">
        <div className="card voice-card">
          <div className="label">Tone</div>
          <h4>Measured. Authoritative. Cold.</h4>
          <p>The footage speaks — you provide context, not hype. Treat every case like a documentary, not a reaction video.</p>
          <div className="quote">“The bodycam shows what happened. Here's what it means.”</div>
        </div>
        <div className="card voice-card">
          <div className="label">What it is</div>
          <h4>Evidence-first. Specific.</h4>
          <p>Investigative. You respect the viewer enough to let them form opinions. You give them the material, not just the conclusion.</p>
          <div className="quote">“At 4:12, the officer's account contradicts the footage.”</div>
        </div>
        <div className="card voice-card">
          <div className="label">What it isn't</div>
          <h4>Shock-first. Vague.</h4>
          <p>No “YOU WON'T BELIEVE THIS.” No gore as content. No commentary that treats real events as entertainment.</p>
          <div className="quote" style={{ borderColor: "var(--crimson)" }}>
            <span style={{ textDecoration: "line-through", textDecorationColor: "var(--crimson)" }}>“The CRAZIEST bodycam you'll EVER see!!”</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="voice-ref">
        <div className="card do">
          <div className="head" style={{ color: "var(--amber)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>✓ POV — IN PRACTICE</div>
          <p style={{ fontSize: 17, fontWeight: 700, margin: "10px 0 0" }}>Name what each party omitted.</p>
          <p style={{ fontSize: 13, color: "var(--text-dim)", margin: "8px 0 0", lineHeight: 1.6 }}>
            Walk through what the official report said, what the bodycam shows, what the suspect's lawyer claimed, what
            the public record adds. Lay it out. Don't editorialise. The contradictions are the story.
          </p>
        </div>
        <div className="card dont">
          <div className="head" style={{ color: "var(--crimson)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>✗ POV — TO AVOID</div>
          <p style={{ fontSize: 17, fontWeight: 700, margin: "10px 0 0" }}>Pick a side and narrate from it.</p>
          <p style={{ fontSize: 13, color: "var(--text-dim)", margin: "8px 0 0", lineHeight: 1.6 }}>
            “Cops did nothing wrong” and “the system is rigged” are equally lazy positions. The channel's edge is that it
            refuses both — readers come for the analysis, not the verdict.
          </p>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SectionType, SectionMark, SectionTagline, SectionVoice });
