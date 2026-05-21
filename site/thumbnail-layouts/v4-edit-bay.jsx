// V4 — EDIT BAY
// Modeled on a real NLE (DaVinci Resolve / Premiere): tri-pane Media Bin
// + Viewer + Inspector, with a "build timeline" strip at the bottom that
// surfaces the production steps as a horizontal scrubber. Status bar at the
// very bottom. This is the layout that scales when you start working on
// multiple thumbnails at once — Media Bin holds the case's assets.

function V4EditBay() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: T.bg, color: T.text, fontFamily: T.fontSans,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* top toolbar */}
      <div style={{
        height: 44, background: T.surf, borderBottom: `1px solid ${T.border}`,
        padding: '0 18px', display: 'flex', alignItems: 'center', gap: 14,
        fontFamily: T.fontMono, fontSize: 11, letterSpacing: 2,
      }}>
        <span style={{ color: T.amber, fontWeight: 700 }}>LITE</span>
        <span style={{ color: T.dim }}>/</span>
        <span style={{ color: T.text }}>THUMBNAIL · {SAMPLE.caseName.toUpperCase()}</span>
        <div style={{ flex: 1 }} />
        <BarPill icon="●" color={T.amber}>UNSAVED</BarPill>
        <BarPill>⌘S</BarPill>
        <BarPill>⌘↵ EXPORT</BarPill>
        <BarPill>?</BarPill>
      </div>

      {/* main 3-pane */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '240px 1fr 340px',
        minHeight: 0 }}>

        {/* media bin */}
        <div style={{ background: T.bgDeep, borderRight: `1px solid ${T.border}`,
          display: 'flex', flexDirection: 'column' }}>
          <BinHeader title="Media Bin" sub={`${SAMPLE.caseName.toUpperCase()} / ASSETS`} />
          <div style={{ flex: 1, overflow: 'auto', padding: 10,
            display: 'flex', flexDirection: 'column', gap: 6 }}>
            <BinItem name={SAMPLE.bgName} type="bg" active sub="1920×1080 · 2.4MB" />
            <BinItem name={SAMPLE.faceName} type="face" sub="640×640 · 240KB" />
            <BinItem name="bodycam-still-04.jpg" type="bg" sub="1920×1080 · 2.1MB" />
            <BinItem name="court-still.jpg" type="bg" sub="1920×1080 · 1.9MB" />
            <BinItem name="news-photo.jpg" type="face" sub="800×800 · 320KB" />
            <BinItem name="reference.png" type="ref" sub="1280×720 · 180KB" />
            <div style={{ marginTop: 6,
              border: `1px dashed ${T.border}`, borderRadius: 3,
              padding: '14px 10px', textAlign: 'center',
              color: T.dim, fontSize: 11,
              fontFamily: T.fontMono, letterSpacing: 1.5,
            }}>+ DROP TO IMPORT</div>
          </div>
        </div>

        {/* viewer */}
        <div style={{ display: 'flex', flexDirection: 'column',
          background: '#000' }}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center',
            alignItems: 'center', position: 'relative', padding: 36 }}>
            <ThumbPreview width={780} />
            <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 8 }}>
              <Tstamp>● PREVIEW</Tstamp>
              <Tstamp live={false}>1280 × 720</Tstamp>
            </div>
            <div style={{ position: 'absolute', bottom: 14, right: 14, display: 'flex', gap: 8 }}>
              <Tstamp live={false}>FIT 76%</Tstamp>
            </div>
          </div>

          {/* "playback" / build progression strip */}
          <div style={{ height: 52, background: T.bg, borderTop: `1px solid ${T.border}`,
            padding: '0 18px', display: 'flex', alignItems: 'center', gap: 0,
            fontFamily: T.fontMono, fontSize: 10, letterSpacing: 2 }}>
            <BuildStep label="Sources" done />
            <BuildStep label="Compose" done />
            <BuildStep label="Type" active />
            <BuildStep label="Treatment" />
            <BuildStep label="Brand" />
            <BuildStep label="Export" last />
          </div>
        </div>

        {/* inspector */}
        <div style={{ background: T.bgDeep, borderLeft: `1px solid ${T.border}`,
          display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <BinHeader title="Inspector" sub="TYPE PROPERTIES" />
          <div style={{ flex: 1, overflow: 'auto', padding: 18,
            display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Prop k="Headline">
              <FakeInput value={SAMPLE.headline} w="100%" mono />
            </Prop>
            <Prop k="Hook">
              <FakeInput value={SAMPLE.hook} w="100%" mono accent />
            </Prop>
            <Prop k="Size">
              <ScrubVal value={SAMPLE.size} unit="pt" />
            </Prop>
            <Prop k="Order">
              <Toggles options={['HL→Hook','Hook→HL']} />
            </Prop>
            <Prop k="Anchor">
              <Toggles options={['B/L','B/C','T/L']} />
            </Prop>
            <Prop k="Overlay">
              <Toggles options={['Off','Circle','Card']} onIdx={1} />
            </Prop>
            <Prop k="Position">
              <PosGridMini active="tr" />
            </Prop>
            <Prop k="BG effects">
              <Toggles options={['Desat','Darken','Vignette']} onIdx={0} />
            </Prop>
            <Prop k="Brand">
              <Toggles options={['On','BR','TR']} onIdx={2} />
            </Prop>
          </div>
          <button style={{
            margin: 14, padding: '11px 16px', borderRadius: 3, border: 'none',
            background: T.amber, color: '#111',
            fontFamily: T.fontMono, fontSize: 11, fontWeight: 700, letterSpacing: 2,
            textTransform: 'uppercase',
          }}>↓ Export PNG · ⌘↵</button>
        </div>
      </div>

      {/* status bar */}
      <div style={{ height: 24, background: T.surf, borderTop: `1px solid ${T.border}`,
        padding: '0 18px', display: 'flex', alignItems: 'center', gap: 18,
        fontFamily: T.fontMono, fontSize: 10, color: T.dim, letterSpacing: 2,
        textTransform: 'uppercase' }}>
        <span>● <span style={{ color: T.green }}>READY</span></span>
        <span>FPS · ─</span>
        <span>NODES · 6</span>
        <span>WARN · 0</span>
        <div style={{ flex: 1 }} />
        <span>v1.4.0</span>
        <span>{SAMPLE.caseNo}</span>
        <span>14 DAYS TO LAUNCH</span>
      </div>
    </div>
  );
}

function BarPill({ children, icon, color }) {
  return (
    <span style={{
      padding: '4px 9px', borderRadius: 2,
      background: T.bg, border: `1px solid ${T.border}`,
      color: T.textDim, display: 'inline-flex', alignItems: 'center', gap: 5,
    }}>
      {icon && <span style={{ color }}>{icon}</span>}
      {children}
    </span>
  );
}

function BinHeader({ title, sub }) {
  return (
    <div style={{ padding: '12px 14px', borderBottom: `1px solid ${T.border}` }}>
      <div style={{ fontFamily: T.fontMono, fontSize: 10, letterSpacing: 3,
        color: T.amber, fontWeight: 700, textTransform: 'uppercase' }}>{title}</div>
      <div style={{ fontFamily: T.fontMono, fontSize: 9, letterSpacing: 2,
        color: T.dim, marginTop: 2, textTransform: 'uppercase' }}>{sub}</div>
    </div>
  );
}

function BinItem({ name, type, sub, active }) {
  const swatch = type === 'bg' ? '#3a2218'
              : type === 'face' ? '#2a3340'
              : '#332a3a';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 9,
      padding: 6, borderRadius: 3,
      background: active ? '#1a1400' : 'transparent',
      border: '1px solid ' + (active ? '#4a3800' : 'transparent'),
    }}>
      <div style={{ width: 32, height: 32, borderRadius: 2,
        background: `linear-gradient(135deg,${swatch},#0a0805)`,
        border: `1px solid ${T.border}`, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: active ? T.amber : T.text,
          fontFamily: T.fontMono, fontWeight: 500,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {name}
        </div>
        <div style={{ fontSize: 9, color: T.dim, marginTop: 1,
          fontFamily: T.fontMono, letterSpacing: 1.5 }}>{sub}</div>
      </div>
    </div>
  );
}

function BuildStep({ label, done, active, last }) {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%',
          background: done ? T.green : active ? T.amber : T.border,
          boxShadow: active ? `0 0 8px ${T.amber}` : 'none' }} />
        <div style={{ color: active ? T.amber : done ? T.text : T.dim,
          fontWeight: active ? 700 : 500, textTransform: 'uppercase' }}>{label}</div>
      </div>
      {!last && <div style={{ flex: 1, height: 1, margin: '0 14px',
        background: done ? T.green : T.border, marginTop: -14 }} />}
    </>
  );
}

function Prop({ k, children }) {
  return (
    <div>
      <div style={{ fontFamily: T.fontMono, fontSize: 9, letterSpacing: 2,
        color: T.dim, textTransform: 'uppercase', marginBottom: 6 }}>{k}</div>
      {children}
    </div>
  );
}

function ScrubVal({ value, unit }) {
  return (
    <div style={{
      width: '100%', padding: '6px 11px',
      background: T.bg, border: `1px solid ${T.border}`, borderRadius: 3,
      display: 'flex', alignItems: 'center', gap: 8,
      fontFamily: T.fontMono, fontSize: 13, color: T.amber, fontWeight: 700,
      cursor: 'ew-resize',
    }}>
      <span style={{ color: T.dim, fontSize: 11 }}>‹›</span>
      <span style={{ flex: 1 }}>{value}</span>
      <span style={{ color: T.dim, fontSize: 11 }}>{unit}</span>
    </div>
  );
}

function PosGridMini({ active }) {
  const positions = ['tl','tc','tr','ml','mc','mr','bl','bc','br'];
  return (
    <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(3, 26px)',
      gap: 3, padding: 4, background: T.bg, border: `1px solid ${T.border}`, borderRadius: 3 }}>
      {positions.map(p => (
        <div key={p} style={{ width: 26, height: 18, borderRadius: 2,
          background: p === active ? T.amber : T.borderS }} />
      ))}
    </div>
  );
}

Object.assign(window, { V4EditBay });
