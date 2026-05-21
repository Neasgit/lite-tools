// V2 — SPLIT INSPECTOR
// DaVinci/Photoshop pattern: huge canvas left, scrollable inspector right.
// Inspector is grouped into expandable sections (TEXT / LAYOUT / OVERLAY /
// EFFECTS / BRAND) so density stays manageable. Sources sit at the top of
// the inspector. Sticky Export button at the bottom right.

function V2SplitInspector() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: T.bg, color: T.text, fontFamily: T.fontSans,
      display: 'grid', gridTemplateColumns: '1fr 380px',
    }}>
      {/* viewer */}
      <div style={{ display: 'flex', flexDirection: 'column',
        padding: 28, background: T.bgDeep, borderRight: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <Lbl>Thumbnail · Inspector</Lbl>
          <div style={{ flex: 1 }} />
          <Tstamp>CASE {SAMPLE.caseNo}</Tstamp>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center',
          alignItems: 'center', position: 'relative' }}>
          <div style={{ position: 'relative', boxShadow: '0 24px 80px rgba(0,0,0,.7)' }}>
            <ThumbPreview width={880} />
            <div style={{ position: 'absolute', top: -22, left: 0,
              fontFamily: T.fontMono, fontSize: 10, letterSpacing: 2, color: T.dim,
              textTransform: 'uppercase',
            }}>1280 × 720 PNG · 100%</div>
          </div>
        </div>

        {/* viewer bottombar */}
        <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: T.fontMono, fontSize: 10, color: T.dim, letterSpacing: 2 }}>
          <span>FIT</span><span style={{ color: T.text }}>·</span>
          <span>100%</span><span>·</span>
          <span>150%</span><span>·</span>
          <span>200%</span>
          <div style={{ flex: 1 }} />
          <span>GUIDES</span>
          <span>SAFE-AREA</span>
          <span style={{ color: T.amber }}>● TYPOGRAPHY</span>
        </div>
      </div>

      {/* inspector */}
      <div style={{ display: 'flex', flexDirection: 'column',
        background: T.bg, overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px', borderBottom: `1px solid ${T.border}`,
          display: 'flex', alignItems: 'center', gap: 10 }}>
          <Lbl style={{ color: T.text }}>Inspector</Lbl>
          <div style={{ flex: 1 }} />
          <span style={{ fontFamily: T.fontMono, fontSize: 9, letterSpacing: 2,
            color: T.dim, textTransform: 'uppercase' }}>auto-saves</span>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '0 22px' }}>
          {/* SOURCES */}
          <Group title="Sources" defaultOpen>
            <UploadCard label="Background" name={SAMPLE.bgName} sub="2.4 MB · 1920 × 1080" loaded />
            <UploadCard label="Mugshot" name={SAMPLE.faceName} sub="640 × 640" loaded />
          </Group>

          {/* TEXT */}
          <Group title="Text" defaultOpen>
            <InspField label="Headline">
              <FakeInput value={SAMPLE.headline} w={'100%'} />
            </InspField>
            <InspField label="Hook">
              <FakeInput value={SAMPLE.hook} w={'100%'} accent />
            </InspField>
            <InspField label="Size">
              <Slider value={SAMPLE.size} min={30} max={140} />
            </InspField>
            <InspField label="Order">
              <Toggles options={['HL → Hook','Hook → HL']} />
            </InspField>
          </Group>

          <Group title="Layout">
            <InspField label="Anchor">
              <Toggles options={['Bottom L','Bottom C','Top L']} />
            </InspField>
          </Group>

          <Group title="Overlay" defaultOpen>
            <InspField label="Type">
              <Toggles options={['Off','Circle','Card']} onIdx={1} />
            </InspField>
            <InspField label="Position">
              <PosGrid2 active="tr" />
            </InspField>
          </Group>

          <Group title="Effects">
            <InspField label="Background">
              <Toggles options={['Desat','Darken','Vignette']} onIdx={0} />
            </InspField>
            <InspField label="Face">
              <Toggles options={['Desat']} onIdx={-1} />
            </InspField>
          </Group>

          <Group title="Brand" collapsed>
            <InspField label="Tag">
              <Toggles options={['On','BR','TR']} onIdx={2} />
            </InspField>
          </Group>

          <div style={{ height: 80 }} />
        </div>

        {/* sticky export */}
        <div style={{ padding: 18, borderTop: `1px solid ${T.border}`,
          background: T.surf, display: 'flex', gap: 10 }}>
          <button style={{
            flex: 1, padding: '11px 16px', borderRadius: 3, border: 'none',
            background: T.amber, color: '#111',
            fontFamily: T.fontMono, fontSize: 11, fontWeight: 700, letterSpacing: 2,
            textTransform: 'uppercase',
          }}>↓ Download PNG</button>
          <button style={{
            padding: '11px 16px', borderRadius: 3,
            background: 'transparent', border: `1px solid ${T.border}`, color: T.textDim,
            fontFamily: T.fontMono, fontSize: 11, fontWeight: 600, letterSpacing: 2,
            textTransform: 'uppercase',
          }}>Copy</button>
        </div>
      </div>
    </div>
  );
}

function Group({ title, children, defaultOpen, collapsed }) {
  return (
    <div style={{ borderBottom: `1px solid ${T.border}`, padding: '14px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{
          fontFamily: T.fontMono, fontSize: 10, letterSpacing: 3,
          textTransform: 'uppercase', color: collapsed ? T.dim : T.text,
          fontWeight: 600,
        }}>{title}</span>
        <div style={{ flex: 1, height: 1, background: T.border }} />
        <span style={{ color: T.dim, fontSize: 10, transform: collapsed ? '' : 'rotate(180deg)' }}>▾</span>
      </div>
      {!collapsed && <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>}
    </div>
  );
}

function InspField({ label, children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 12, alignItems: 'center' }}>
      <Lbl color={T.dim} style={{ fontSize: 9, letterSpacing: 2 }}>{label}</Lbl>
      <div>{children}</div>
    </div>
  );
}

function Slider({ value, min, max }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1, height: 3, background: T.border, borderRadius: 2, position: 'relative' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: T.amber, borderRadius: 2 }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%',
          transform: 'translate(-50%,-50%)', width: 12, height: 12, borderRadius: '50%',
          background: T.amber, border: '2px solid ' + T.bg }} />
      </div>
      <div style={{ minWidth: 36, textAlign: 'right', fontFamily: T.fontMono,
        fontSize: 12, fontWeight: 700, color: T.amber }}>{value}</div>
    </div>
  );
}

function PosGrid2({ active }) {
  const positions = ['tl','tc','tr','ml','mc','mr','bl','bc','br'];
  return (
    <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(3, 22px)',
      gap: 4, padding: 5, background: T.bg, border: `1px solid ${T.border}`, borderRadius: 3 }}>
      {positions.map(p => (
        <div key={p} style={{
          width: 22, height: 16, borderRadius: 2,
          background: p === active ? T.amber : T.borderS,
        }} />
      ))}
    </div>
  );
}

function UploadCard({ label, name, sub, loaded }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8,
      padding: 12, borderRadius: 3,
      background: T.surf2, border: `1px solid ${T.border}`,
    }}>
      <div style={{
        width: 56, height: 36, borderRadius: 2,
        background: 'linear-gradient(135deg,#3a2218,#1a1410)',
        border: `1px solid ${T.border}`, flexShrink: 0,
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 9, letterSpacing: 2, color: T.dim,
          fontFamily: T.fontMono, textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontSize: 12, color: T.text, fontFamily: T.fontMono,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {name}
        </div>
        <div style={{ fontSize: 10, color: T.dim, marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{ color: T.green, fontSize: 10 }}>●</div>
    </div>
  );
}

Object.assign(window, { V2SplitInspector });
