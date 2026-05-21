// LITE v2 — Sections 12-15: Captions, Hierarchy, Motion & Audio, Footage

function SectionCaptions() {
  return (
    <section className="section" id="captions">
      <SectionHead num="12" title="Caption & Subtitle Styling" desc="Speaker label amber · narration white · semi-transparent pill on every line." />
      <div className="caption-demo">
        <div className="caption-block">
          <div className="caption-line">The footage shows what happened.</div>
        </div>
      </div>
      <div className="caption-demo" style={{ marginTop: 16 }}>
        <div className="caption-block">
          <div className="caption-line speaker">OFFICER MARTINEZ</div>
          <div className="caption-line">This is your last warning.</div>
        </div>
      </div>

      <div className="redact-spec" style={{ marginTop: 18 }}>
        <div className="cell"><div className="k">Font</div><div className="v">Inter Bold</div></div>
        <div className="cell"><div className="k">Size · 1080p</div><div className="v">52–60px</div></div>
        <div className="cell"><div className="k">Narration</div><div className="v">#FFFFFF</div></div>
        <div className="cell"><div className="k">Speaker label</div><div className="v">#D4A800 · MONO · CAPS</div></div>
        <div className="cell"><div className="k">Background</div><div className="v">rgba(0,0,0,0.65)</div></div>
        <div className="cell"><div className="k">Position</div><div className="v">10% from bottom</div></div>
        <div className="cell"><div className="k">Max line</div><div className="v">42 chars · 2 lines</div></div>
        <div className="cell"><div className="k">Cadence switch</div><div className="v">Amber on speaker change</div></div>
      </div>

      <div style={{ marginTop: 18, padding: "16px 18px", background: "var(--bg-elev)", border: "1px solid var(--border)", borderLeft: "3px solid var(--amber)", borderRadius: 4, fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6 }}>
        <span className="label" style={{ marginBottom: 8, display: "block" }}>Workflow</span>
        Captions are generated in <b style={{ color: "var(--text)" }}>CapCut Desktop</b> — rough edit in Premiere Pro, export to CapCut for caption burn-in, then back to Premiere for the finish. Yellow accent words at <code style={{ fontFamily: "var(--mono)", fontSize: 11 }}>[CAP: ...]</code> markers in the script. Speaker labels are added manually; CapCut auto-captions are a starting point only — always review before exporting.
      </div>

      <div className="section-foot-do-dont">
        <div className="card do">
          <div className="head" style={{ color: "var(--amber)" }}>✓ DO</div>
          <ul>
            <li style={{ color: "var(--text-dim)" }}>Amber + MONO + CAPS for speaker labels — scannable at speed</li>
            <li style={{ color: "var(--text-dim)" }}>Semi-transparent pill on every caption line</li>
            <li style={{ color: "var(--text-dim)" }}>Position above lower-third if both on screen</li>
          </ul>
        </div>
        <div className="card dont">
          <div className="head" style={{ color: "var(--crimson)" }}>✗ DON'T</div>
          <ul>
            <li style={{ color: "var(--text-dim)" }}>YouTube auto-caption style for burn-ins</li>
            <li style={{ color: "var(--text-dim)" }}>More than 2 lines on screen at once</li>
            <li style={{ color: "var(--text-dim)" }}>Same colour for narration and dialogue</li>
          </ul>
        </div>
      </div>

      {/* Audio-only segment visualizer — locked 2026-05-20 */}
      <div style={{ marginTop: 28 }}>
        <div className="label" style={{ marginBottom: 10 }}>Audio-only segments · thin-line waveform</div>
        <div className="redact-spec">
          <div className="cell"><div className="k">Use for</div><div className="v">911 calls · dispatch radio · off-camera court audio</div></div>
          <div className="cell"><div className="k">Style</div><div className="v">Thin-line waveform · amber accent on speaker turn</div></div>
          <div className="cell"><div className="k">Reject</div><div className="v">Thick-bar visualizer · circular waveform</div></div>
          <div className="cell"><div className="k">Why</div><div className="v">Documentary register · thick bar reads too kinetic</div></div>
        </div>
      </div>
    </section>
  );
}

const LAYERS_V2 = [
  { n: 1, name: "Corner Tag",          d: "Top layer. Persistent ID with role glyph.",                                v: "V5" },
  { n: 2, name: "Timestamp Glyph",     d: "Secondary recognition. Always top-right. NEW in v2.",                       v: "V4" },
  { n: 3, name: "Caption / Cut Log",   d: "Captions or cut-log entries. Both use the pill background.",                v: "V3" },
  { n: 4, name: "Lower Third",         d: "Speaker ID with role glyph. On for 2–3s, then fades.",                      v: "V2" },
  { n: 5, name: "Footage",             d: "Base layer. All graphics sit on top.",                                       v: "V1" },
];
const TIMING_V2 = [
  ["Lower third — fade in", "4–6 frames"],
  ["Lower third — on screen", "2–3 seconds"],
  ["Lower third — fade out", "4–6 frames"],
  ["Cut log — on screen", "2.0–2.5 seconds"],
  ["Redaction reveal — lift", "4 frames"],
  ["Full card — on screen", "1.5–2.5 seconds"],
  ["Corner tag — on screen", "Full clip"],
  ["Timestamp glyph — on screen", "Full clip"],
];

function SectionHierarchy() {
  return (
    <section className="section" id="hierarchy">
      <SectionHead num="13" title="Graphics Overlay Hierarchy" desc="Five layers, top to bottom. Corner tag now sits above the timestamp glyph." />
      <div className="layer-stack">
        {LAYERS_V2.map((l) => (
          <div className="layer-row" key={l.n}>
            <div className="n">{l.n}</div>
            <div className="nm">{l.name}</div>
            <div className="d">{l.d}</div>
            <div className="v">{l.v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 32 }} className="hierarchy-rules">
        <div className="card">
          <div className="label" style={{ marginBottom: 12 }}>Rules</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: 13, color: "var(--text-dim)", lineHeight: 1.55 }}>
            <li>· Corner tag + timestamp glyph are always-on. They define the channel.</li>
            <li>· Cut log and lower third never overlap — one or the other in the bottom band.</li>
            <li>· Redaction reveals get the audio sting (§04). Cut logs do not.</li>
            <li>· Full cards replace the footage — never overlaid on top.</li>
            <li>· Max 3 overlay types on screen at once.</li>
          </ul>
        </div>
        <div>
          <div className="timing-grid">
            {TIMING_V2.map(([k, v]) => (
              <div className="timing-row" key={k}>
                <div className="k">{k}</div>
                <div className="v">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Chapter Cards */}
      <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
        <div className="label" style={{ marginBottom: 10 }}>Chapter Cards</div>
        <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-.4px", margin: "0 0 14px", lineHeight: 1.2 }}>
          Full-frame title cards. Footage pauses — <span style={{ color: "var(--amber)" }}>the card plays</span>.
        </h3>
        <p style={{ color: "var(--text-dim)", maxWidth: 720, fontSize: 14, lineHeight: 1.65, margin: "0 0 18px" }}>
          Chapter cards mark structural breaks (Part 1 → Part 2, scene change, time jump). They replace the footage entirely — never overlaid. Yellow marker in the Premiere timeline. Hold for 1.5–2.5 seconds.
        </p>
        <div className="redact-spec">
          <div className="cell"><div className="k">Background</div><div className="v">#111111</div></div>
          <div className="cell"><div className="k">Amber bar</div><div className="v">48 × 3px · above text</div></div>
          <div className="cell"><div className="k">Chapter label</div><div className="v">Inter Bold · 36–48px · white</div></div>
          <div className="cell"><div className="k">Sub-label</div><div className="v">Mono · 11px · amber · CAPS · 3px tracking</div></div>
          <div className="cell"><div className="k">LITE mark</div><div className="v">Bottom-left · 11px · 4px tracking</div></div>
          <div className="cell"><div className="k">Duration</div><div className="v">1.5–2.5 seconds</div></div>
          <div className="cell"><div className="k">Timeline marker</div><div className="v">Yellow in Premiere Pro</div></div>
          <div className="cell"><div className="k">Audio</div><div className="v">Music sting or silence — never footage audio</div></div>
        </div>
      </div>

      {/* Source Citation Labels */}
      <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
        <div className="label" style={{ marginBottom: 10 }}>Source Citation Labels</div>
        <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-.4px", margin: "0 0 14px", lineHeight: 1.2 }}>
          Every quote cited. <span style={{ color: "var(--amber)" }}>On screen, not just in the description.</span>
        </h3>
        <p style={{ color: "var(--text-dim)", maxWidth: 720, fontSize: 14, lineHeight: 1.65, margin: "0 0 18px" }}>
          When a document, statement, or report is referenced on screen, a source label appears. Sits in the bottom-left corner above the lower-third (if present). Appears for 2–3 seconds. Never obscures the footage's key action.
        </p>
        <div className="redact-spec">
          <div className="cell"><div className="k">Format</div><div className="v">SOURCE: [document name]</div></div>
          <div className="cell"><div className="k">Font</div><div className="v">JetBrains Mono · 11px · amber</div></div>
          <div className="cell"><div className="k">Background</div><div className="v">rgba(0,0,0,0.7) · 4px radius</div></div>
          <div className="cell"><div className="k">Position</div><div className="v">Bottom-left · above lower-third</div></div>
          <div className="cell"><div className="k">Duration</div><div className="v">2–3 seconds</div></div>
          <div className="cell"><div className="k">Border</div><div className="v">2px left · var(--amber)</div></div>
          <div className="cell"><div className="k">Mirror</div><div className="v">Also listed in video description</div></div>
          <div className="cell"><div className="k">When to use</div><div className="v">Every direct quote or document reference</div></div>
        </div>
      </div>
    </section>
  );
}

function MotionTimeline() {
  // single 60-second timeline showing pacing
  return (
    <div className="timeline">
      <div className="timeline-row">
        <div className="nm">Cut Rhythm · 60s sample</div>
        <div className="timeline-track">
          {[[0, 14], [14, 22], [22, 26], [26, 38], [38, 42], [42, 58], [58, 100]].map(([a, b], i) => (
            <div key={i} className="clip" style={{
              left: a + "%", width: (b - a) + "%",
              background: i % 2 ? "var(--amber-soft)" : "var(--amber)",
              opacity: 0.4 + 0.6 * (i % 2),
            }}>
              {b - a > 6 ? (b - a).toFixed(0) + "s" : ""}
            </div>
          ))}
        </div>
        <div className="timeline-labels"><span>0s</span><span>15s</span><span>30s</span><span>45s</span><span>60s</span></div>
      </div>

      <div className="timeline-row">
        <div className="nm">Reveal Beat · redaction lift</div>
        <div className="timeline-track" style={{ height: 40 }}>
          <div style={{ position: "absolute", left: "20%", width: "2%", top: 8, bottom: 8, background: "#fff", opacity: 0.3 }}></div>
          <div style={{ position: "absolute", left: "22%", width: "8%", top: 8, bottom: 8, background: "var(--amber)" }}></div>
          <div style={{ position: "absolute", left: "30%", width: "70%", top: 8, bottom: 8, background: "var(--bg)" }}></div>
          <div style={{ position: "absolute", left: "20%", top: 0, bottom: 0, width: 1, background: "var(--text-dimmer)" }}></div>
          <div style={{ position: "absolute", left: "22%", top: 0, bottom: 0, width: 1, background: "var(--amber)" }}></div>
          <div style={{ position: "absolute", left: "30%", top: 0, bottom: 0, width: 1, background: "var(--amber)" }}></div>
        </div>
        <div className="timeline-labels" style={{ paddingLeft: 0 }}>
          <span style={{ paddingLeft: "20%" }}>cue</span>
          <span style={{ paddingLeft: "2%" }}>lift 4f</span>
          <span style={{ paddingLeft: "8%" }}>hold 8f</span>
          <span style={{ marginLeft: "auto" }}>resume</span>
        </div>
      </div>

      <div className="timeline-row">
        <div className="nm">Narration · words/min</div>
        <div className="timeline-track" style={{ height: 32 }}>
          {[120, 130, 110, 95, 140, 105, 88, 125].map((w, i) => (
            <div key={i} style={{
              position: "absolute",
              left: (i * 12.5) + "%",
              bottom: 4,
              width: "10%",
              height: (w / 200 * 100) + "%",
              background: "var(--amber)",
              opacity: 0.6 + (w / 400),
            }}></div>
          ))}
        </div>
        <div className="timeline-labels"><span>opening</span><span>setup</span><span>turn</span><span>reveal</span></div>
      </div>
    </div>
  );
}

function SectionMotion() {
  return (
    <section className="section" id="motion-audio">
      <SectionHead num="14" title="Motion & Audio" desc="Title-card pacing, narration cadence, score (silence by default), reveal stings." isNew />
      <p style={{ color: "var(--text-dim)", maxWidth: 760, margin: "0 0 28px", fontSize: 14, lineHeight: 1.65 }}>
        The v1 brand was entirely visual. But bodycam channels live in playback — half the brand is what
        the viewer <i>hears</i>. v2 spec's the channel's motion language and audio register. The defining
        choice: <b style={{ color: "var(--text)" }}>silence is the default score</b>. Music appears only
        at structural beats (reveals, end card). Talking-head reaction-style narration is forbidden.
      </p>

      <div className="motion-grid">
        <MotionTimeline />

        <div className="audio-list card">
          <div className="audio-row">
            <div className="k">Score</div>
            <div className="v">
              Silence by default
              <div className="note">Music only at reveals (sub-bass sting, 1.5s, −18 LUFS) and the end card (single sustained tone, 4–6s). No bed music.</div>
            </div>
          </div>
          <div className="audio-row">
            <div className="k">Narration</div>
            <div className="v">
              Third-person · present tense
              <div className="note">88–140 wpm. Short sentences. No hedging. Pauses are intentional — silence carries the case.</div>
            </div>
          </div>
          <div className="audio-row">
            <div className="k">Voice</div>
            <div className="v">
              ElevenLabs cloned voice
              <div className="note">Professional voice clone trained on Sean's voice. Stability 50%, Creator plan. Preserves brand voice without recording bottleneck. Blue Yeti used for training audio only. Generate from locked VO text; enhance via Adobe Podcast before edit.</div>
            </div>
          </div>
          <div className="audio-row">
            <div className="k">Reveal sting</div>
            <div className="v">
              Sub-bass drop · 1.5s
              <div className="note">Fundamental at 35–45Hz. No melodic content. Pairs with the redaction lift in §04.</div>
            </div>
          </div>
          <div className="audio-row">
            <div className="k">Cut rhythm</div>
            <div className="v">
              ~1.2 cuts/min in body
              <div className="note">Slow on raw bodycam (let it breathe), faster around contradiction beats. Never under 6 frames per shot.</div>
            </div>
          </div>
          <div className="audio-row">
            <div className="k">Title cards</div>
            <div className="v">
              1.5–2.5s on screen
              <div className="note">Pair with a beat of silence or a music sting. Never overlap with footage audio.</div>
            </div>
          </div>
          <div className="audio-row">
            <div className="k">Footage audio</div>
            <div className="v">
              Raw, not enhanced
              <div className="note">Don't auto-de-noise bodycam audio — the static is the texture. Ducked −6dB under narration only.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-foot-do-dont" style={{ marginTop: 28 }}>
        <div className="card do">
          <div className="head" style={{ color: "var(--amber)" }}>✓ DO</div>
          <ul>
            <li style={{ color: "var(--text-dim)" }}>Trust silence. The empty seconds are the channel.</li>
            <li style={{ color: "var(--text-dim)" }}>Pair every redaction reveal with the sting + amber lift</li>
            <li style={{ color: "var(--text-dim)" }}>Keep narration sentences under 18 words</li>
          </ul>
        </div>
        <div className="card dont">
          <div className="head" style={{ color: "var(--crimson)" }}>✗ DON'T</div>
          <ul>
            <li style={{ color: "var(--text-dim)" }}>Bed music under the whole video — that's reaction-channel grammar</li>
            <li style={{ color: "var(--text-dim)" }}>Auto-de-noise bodycam audio — keep the texture</li>
            <li style={{ color: "var(--text-dim)" }}>Cut faster than 1 cut every 6 frames</li>
            <li style={{ color: "var(--text-dim)" }}>Use stock cinematic “true crime” drone pads</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function FootageGradeLab() {
  const [sat, setSat] = React.useState(-32);
  const [temp, setTemp] = React.useState(-175);
  const [lift, setLift] = React.useState(3);
  const [gain, setGain] = React.useState(-7);

  const filter = `saturate(${1 + sat / 100}) hue-rotate(${temp / 100 * 4}deg) brightness(${1 + lift / 100}) contrast(${1 - gain / 100})`;

  return (
    <div className="grade-lab">
      <div className="grade-stage">
        <div className="raw" style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}></div>
        <div className="graded" style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)", filter }}></div>
        <div className="grade-divider"></div>
        <div className="badge raw-b">RAW</div>
        <div className="badge graded-b">GRADED</div>
        <div className="label-mid">BODYCAM STILL · INTERIOR · 04:12</div>
      </div>
      <div>
        <div className="slider-row">
          <div className="head"><span className="name">Saturation</span><span className="val">{sat > 0 ? "+" : ""}{sat}%</span></div>
          <input type="range" min="-60" max="20" value={sat} onChange={(e) => setSat(+e.target.value)} />
          <div className="hint">Target: −25 to −40%. Partial desaturation, not B&W.</div>
        </div>
        <div className="slider-row">
          <div className="head"><span className="name">Colour Temp</span><span className="val">{temp}K</span></div>
          <input type="range" min="-400" max="200" value={temp} onChange={(e) => setTemp(+e.target.value)} />
          <div className="hint">Target: −150 to −200K. Counteracts warm bodycam white-balance.</div>
        </div>
        <div className="slider-row">
          <div className="head"><span className="name">Lift</span><span className="val">+{(lift / 100).toFixed(2)}</span></div>
          <input type="range" min="0" max="10" value={lift} onChange={(e) => setLift(+e.target.value)} />
          <div className="hint">Target: +0.02 to +0.04. Lifts shadows so body armour doesn't crush.</div>
        </div>
        <div className="slider-row">
          <div className="head"><span className="name">Gain</span><span className="val">{(gain / 100).toFixed(2)}</span></div>
          <input type="range" min="-20" max="0" value={gain} onChange={(e) => setGain(+e.target.value)} />
          <div className="hint">Target: −0.05 to −0.10. Rolls off blown highlights.</div>
        </div>
      </div>
    </div>
  );
}

function SectionFootage() {
  return (
    <section className="section" id="footage">
      <SectionHead num="15" title="Footage Treatment" desc="Clinical grade, same node stack across every clip. Unchanged from v1." />
      <p style={{ color: "var(--text-dim)", fontSize: 14, maxWidth: 760, margin: "0 0 28px", lineHeight: 1.6 }}>
        The grade is the floor that makes raw bodycam variations look like one channel. Slightly desaturated,
        slightly cool, shadows lifted, highlights rolled off. The edit lives in Premiere Pro — but grade in
        DaVinci Resolve and save as a power grade. Do not hand-grade clips one by one.
      </p>
      <FootageGradeLab />

      <div className="section-foot-do-dont" style={{ marginTop: 32 }}>
        <div className="card do">
          <div className="head" style={{ color: "var(--amber)" }}>✓ DO</div>
          <ul>
            <li style={{ color: "var(--text-dim)" }}>Save the node stack as a Resolve power grade</li>
            <li style={{ color: "var(--text-dim)" }}>Grade thumbnails to match — feed = video</li>
            <li style={{ color: "var(--text-dim)" }}>Lift shadows on night footage to keep body armour visible</li>
          </ul>
        </div>
        <div className="card dont">
          <div className="head" style={{ color: "var(--crimson)" }}>✗ DON'T</div>
          <ul>
            <li style={{ color: "var(--text-dim)" }}>Orange-teal — the most overused look on the internet</li>
            <li style={{ color: "var(--text-dim)" }}>Heavy vignette — turns documentary into music video</li>
            <li style={{ color: "var(--text-dim)" }}>Full B&W — removes the realism that makes bodycam impactful</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SectionCaptions, SectionHierarchy, SectionMotion, SectionFootage });
