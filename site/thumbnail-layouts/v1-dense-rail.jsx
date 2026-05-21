// V1 — DENSE RAIL
// The safest refinement: same components, tighter hierarchy. Canvas dominates
// the centre; all controls live in a 3-row rail along the bottom. The point
// is to keep every control visible at once with zero scroll — but with the
// canvas big enough to actually judge legibility.

function V1DenseRail() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: T.bg, color: T.text, fontFamily: T.fontSans,
      display: 'flex', flexDirection: 'column',
      padding: 28,
    }}>
      {/* topline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <Lbl>04 · Tools / Thumbnail</Lbl>
        <div style={{ flex: 1 }} />
        <Tstamp>CASE {SAMPLE.caseNo} · {SAMPLE.caseName.toUpperCase()}</Tstamp>
        <button style={{
          padding: '8px 18px', borderRadius: 3, border: 'none',
          background: T.amber, color: '#111',
          fontFamily: T.fontMono, fontSize: 11, fontWeight: 700, letterSpacing: 2,
          textTransform: 'uppercase',
        }}>↓ Download PNG</button>
      </div>

      {/* canvas */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',
        background: T.bgDeep, border: `1px solid ${T.border}`, borderRadius: 4,
        position: 'relative', marginBottom: 18,
      }}>
        <ThumbPreview width={820} />
        <div style={{ position: 'absolute', top: 14, left: 14 }}>
          <Lbl color={T.dim}>Preview · 1280 × 720</Lbl>
        </div>
        <div style={{ position: 'absolute', bottom: 14, right: 14, display: 'flex', gap: 8 }}>
          <Tstamp live={false}>FIT 64%</Tstamp>
          <Tstamp live={false}>GUIDES OFF</Tstamp>
        </div>
      </div>

      {/* control rail: 3 rows, all visible */}
      <div style={{
        background: T.surf, border: `1px solid ${T.border}`, borderRadius: 4,
        padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        {/* Row 1: text content */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          <Field label="Headline · white">
            <FakeInput value={SAMPLE.headline} w={290} />
          </Field>
          <Field label="Hook · amber">
            <FakeInput value={SAMPLE.hook} w={220} accent />
          </Field>
          <Field label="Size">
            <div style={{ display: 'flex', alignItems: 'center',
              background: T.bg, border: `1px solid ${T.border}`, borderRadius: 3, height: 36 }}>
              <div style={{ padding: '0 12px', color: T.dim, fontSize: 18, lineHeight: 1 }}>−</div>
              <div style={{ minWidth: 40, textAlign: 'center', color: T.amber,
                fontWeight: 700, fontSize: 15,
                borderLeft: `1px solid ${T.border}`, borderRight: `1px solid ${T.border}`,
                padding: '0 6px' }}>{SAMPLE.size}</div>
              <div style={{ padding: '0 12px', color: T.dim, fontSize: 18, lineHeight: 1 }}>+</div>
            </div>
          </Field>
          <Field label="Order">
            <Toggles options={['Headline → Hook','Hook → Headline']} />
          </Field>
          <div style={{ flex: 1 }} />
          <Field label="Layout">
            <Toggles options={['Bottom L','Bottom C','Top L']} />
          </Field>
        </div>

        <div style={{ height: 1, background: T.border }} />

        {/* Row 2: overlay + position grid */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          <Field label="Photo overlay">
            <Toggles options={['Off','Circle','Card']} onIdx={1} />
          </Field>
          <Field label="Position">
            <PosGrid active="tr" />
          </Field>
          <Field label="Background">
            <Toggles options={['Desat','Darken','Vignette']} onIdx={0} />
          </Field>
          <Field label="Face">
            <Toggles options={['Desat']} onIdx={-1} />
          </Field>
          <div style={{ flex: 1 }} />
          <Field label="Brand tag">
            <Toggles options={['On','BR','TR']} onIdx={2} />
          </Field>
        </div>

        <div style={{ height: 1, background: T.border }} />

        {/* Row 3: sources */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <UploadChip label="Background" name={SAMPLE.bgName} loaded />
          <UploadChip label="Mugshot / Face" name={SAMPLE.faceName} loaded />
          <div style={{ flex: 1 }} />
          <div style={{ fontFamily: T.fontMono, fontSize: 10, color: T.dim, letterSpacing: 2 }}>
            ⌘S SAVE · ⌘↵ EXPORT · F FULLSCREEN
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Lbl color={T.dim} style={{ fontSize: 9, letterSpacing: 2 }}>{label}</Lbl>
      {children}
    </div>
  );
}

function PosGrid({ active = 'tr' }) {
  const positions = ['tl','tc','tr','ml','mc','mr','bl','bc','br'];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 14px)',
      gap: 4, padding: 4, background: T.bg, border: `1px solid ${T.border}`, borderRadius: 3 }}>
      {positions.map(p => (
        <div key={p} style={{
          width: 14, height: 14, borderRadius: 2,
          background: p === active ? T.amber : T.borderS,
        }} />
      ))}
    </div>
  );
}

function UploadChip({ label, name, loaded }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 12px', borderRadius: 3,
      background: T.surf2, border: `1px solid ${loaded ? T.border : T.borderS}`,
      borderStyle: loaded ? 'solid' : 'dashed',
      minWidth: 240,
    }}>
      <div style={{
        width: 36, height: 24, borderRadius: 2,
        background: loaded ? 'linear-gradient(135deg,#3a2218,#1a1410)' : T.bg,
        border: `1px solid ${T.border}`,
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 9, letterSpacing: 2, color: T.dim,
          fontFamily: T.fontMono, textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontSize: 12, color: loaded ? T.text : T.dim,
          fontFamily: T.fontMono, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {name}
        </div>
      </div>
      {loaded && <div style={{ color: T.green, fontSize: 11 }}>●</div>}
    </div>
  );
}

Object.assign(window, { V1DenseRail });
