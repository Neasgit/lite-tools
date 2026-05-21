// V3 — EVIDENCE DOSSIER
// The whole tool dresses as an internal case file. Rubber-stamps, redacted
// blocks, typewriter typography, paper-on-desk texture. The canvas is
// "EXHIBIT A." Controls are typewritten form fields. Brand expression turned
// up to 11 — same controls, different costume. Operator UX still: every
// control on one page.

function V3EvidenceDossier() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#0a0805', color: T.text, fontFamily: T.fontSans,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* paper background */}
      <div style={{ position: 'absolute', inset: 24,
        background: 'linear-gradient(180deg,#161311 0%,#0f0c0a 100%)',
        border: '1px solid #2a221a',
        boxShadow: 'inset 0 0 60px rgba(0,0,0,.5), 0 24px 60px rgba(0,0,0,.6)',
      }} />
      {/* paper grain */}
      <div style={{ position: 'absolute', inset: 24,
        background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        pointerEvents: 'none', mixBlendMode: 'screen',
      }} />

      <div style={{ position: 'absolute', inset: 24, padding: 36,
        display: 'flex', flexDirection: 'column', gap: 22, overflow: 'hidden',
      }}>

        {/* header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.fontMono, fontSize: 10, letterSpacing: 3,
              color: T.dim, textTransform: 'uppercase' }}>
              LITE Productions · Internal Use Only
            </div>
            <div style={{ fontFamily: T.fontMono, fontSize: 28, fontWeight: 700,
              color: T.text, marginTop: 8, letterSpacing: -.5 }}>
              FILE NO. {SAMPLE.caseNo} <span style={{ color: T.amber }}>·</span> THUMBNAIL
            </div>
            <div style={{ display: 'flex', gap: 24, marginTop: 12, fontFamily: T.fontMono,
              fontSize: 11, color: T.textDim, letterSpacing: 1 }}>
              <Meta k="Subject" v={SAMPLE.caseName.toUpperCase()} />
              <Meta k="Opened" v="19 MAY 2026" />
              <Meta k="Status" v="DRAFTING" amber />
              <Meta k="Output" v="1280 × 720 · PNG" />
            </div>
          </div>
          <Stamp text="EXHIBIT A" tilt={-8} color={T.crimson} />
          <Stamp text="CLEARED" tilt={6} color={T.amber} />
        </div>

        <Divider />

        {/* main: canvas left, form right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px',
          gap: 30, flex: 1, minHeight: 0 }}>

          {/* EXHIBIT A frame */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: T.fontMono, fontSize: 11, letterSpacing: 3,
                color: T.amber, fontWeight: 700, textTransform: 'uppercase' }}>
                Exhibit A
              </span>
              <div style={{ flex: 1, height: 1, background: '#2a221a' }} />
              <span style={{ fontFamily: T.fontMono, fontSize: 10, color: T.dim,
                letterSpacing: 2, textTransform: 'uppercase' }}>
                ↵ Render preview · auto-updates
              </span>
            </div>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'center',
              alignItems: 'center', padding: 24,
              background: 'rgba(0,0,0,.4)',
              border: '1px dashed #3a2d1a', borderRadius: 2,
              position: 'relative' }}>
              <div style={{ transform: 'rotate(-.4deg)',
                boxShadow: '0 4px 22px rgba(0,0,0,.6), 0 0 0 6px #f4f3eb' }}>
                <ThumbPreview width={740} frame={false} />
              </div>
              <div style={{ position: 'absolute', bottom: 18, left: 24,
                fontFamily: T.fontMono, fontSize: 10, color: T.dim,
                letterSpacing: 1.5 }}>
                EVIDENCE TAG E-{SAMPLE.caseNo}-T01
              </div>
            </div>
          </div>

          {/* form sheet */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16,
            overflow: 'auto' }}>
            <Section title="01 · Copy">
              <FormField k="Headline" v={SAMPLE.headline} />
              <FormField k="Hook"     v={SAMPLE.hook} amber />
              <FormField k="Type size" v={`${SAMPLE.size} pt`} />
              <FormField k="Order"     v="Headline ↦ Hook" />
            </Section>

            <Section title="02 · Composition">
              <FormField k="Anchor"   v="Bottom · Left" />
              <FormField k="Overlay"  v="Circle ↦ Top right" />
              <FormField k="Brand"    v="Top right" />
            </Section>

            <Section title="03 · Treatment">
              <Checks items={[
                ['Background · desaturate', true],
                ['Background · darken', true],
                ['Background · vignette', true],
                ['Face · desaturate', false],
              ]} />
            </Section>

            <Section title="04 · Sources">
              <FileRow label="BG.001" name={SAMPLE.bgName} ok />
              <FileRow label="FACE.001" name={SAMPLE.faceName} ok />
            </Section>

            <button style={{
              marginTop: 8,
              padding: '14px 18px', borderRadius: 2,
              background: T.amber, color: '#111',
              border: 'none',
              fontFamily: T.fontMono, fontSize: 12, fontWeight: 700, letterSpacing: 3,
              textTransform: 'uppercase',
              boxShadow: '0 4px 16px rgba(212,168,0,.25)',
            }}>↓ File &amp; Export</button>
          </div>
        </div>

        {/* footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16,
          paddingTop: 14, borderTop: '1px solid #2a221a',
          fontFamily: T.fontMono, fontSize: 10, color: T.dim, letterSpacing: 2,
          textTransform: 'uppercase',
        }}>
          <span>Filed by · M. Operator</span>
          <span style={{ color: T.borderS }}>/</span>
          <span>Sig.</span>
          <span style={{ fontFamily: '"Brush Script MT", cursive', fontSize: 18,
            color: T.amber, transform: 'rotate(-3deg)', display: 'inline-block',
            letterSpacing: 0, textTransform: 'none' }}>m.o.</span>
          <div style={{ flex: 1 }} />
          <span>This document is the property of LITE Productions.</span>
        </div>
      </div>
    </div>
  );
}

function Meta({ k, v, amber }) {
  return (
    <div>
      <span style={{ color: T.dim, textTransform: 'uppercase', letterSpacing: 2,
        fontSize: 9 }}>{k}: </span>
      <span style={{ color: amber ? T.amber : T.text, fontWeight: 600 }}>{v}</span>
    </div>
  );
}

function Stamp({ text, tilt, color }) {
  return (
    <div style={{
      transform: `rotate(${tilt}deg)`,
      border: `2.5px solid ${color}`, color,
      padding: '6px 14px',
      fontFamily: T.fontMono, fontWeight: 800, fontSize: 14,
      letterSpacing: 3, textTransform: 'uppercase',
      opacity: .85, mixBlendMode: 'screen',
      flexShrink: 0, alignSelf: 'flex-start',
    }}>{text}</div>
  );
}

function Divider() {
  return <div style={{ height: 1,
    background: 'linear-gradient(90deg,transparent,#2a221a 20%,#2a221a 80%,transparent)' }} />;
}

function Section({ title, children }) {
  return (
    <div>
      <div style={{ fontFamily: T.fontMono, fontSize: 10, letterSpacing: 3,
        color: T.amber, fontWeight: 700, textTransform: 'uppercase',
        marginBottom: 10, paddingBottom: 6, borderBottom: '1px solid #2a221a' }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
    </div>
  );
}

function FormField({ k, v, amber }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr',
      gap: 12, alignItems: 'baseline' }}>
      <span style={{ fontFamily: T.fontMono, fontSize: 11, color: T.dim,
        textTransform: 'uppercase', letterSpacing: 2 }}>{k}</span>
      <div style={{ borderBottom: '1px dotted #3a2d1a', paddingBottom: 3,
        fontFamily: T.fontMono, fontSize: 13, color: amber ? T.amber : T.text,
        fontWeight: 500 }}>
        {v}
      </div>
    </div>
  );
}

function Checks({ items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {items.map(([label, on], i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 14, height: 14, borderRadius: 2,
            border: `1.5px solid ${on ? T.amber : '#3a2d1a'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: on ? 'rgba(212,168,0,.1)' : 'transparent' }}>
            {on && <span style={{ color: T.amber, fontSize: 11, fontWeight: 800, lineHeight: 1 }}>✓</span>}
          </div>
          <span style={{ fontFamily: T.fontMono, fontSize: 12,
            color: on ? T.text : T.dim,
            textDecoration: on ? 'none' : 'line-through',
            textDecorationColor: '#3a2d1a' }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

function FileRow({ label, name, ok }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12,
      padding: '6px 10px', background: 'rgba(0,0,0,.3)',
      border: '1px solid #2a221a', borderRadius: 2 }}>
      <span style={{ fontFamily: T.fontMono, fontSize: 10, color: T.amber,
        fontWeight: 700, letterSpacing: 2, minWidth: 56 }}>{label}</span>
      <span style={{ flex: 1, fontFamily: T.fontMono, fontSize: 11, color: T.text,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
      <span style={{ color: ok ? T.green : T.dim, fontFamily: T.fontMono,
        fontSize: 10, letterSpacing: 1.5 }}>{ok ? 'OK' : '—'}</span>
    </div>
  );
}

Object.assign(window, { V3EvidenceDossier });
