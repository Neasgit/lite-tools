// Shared atoms for the thumbnail-layout exploration.
// Every variant uses the same sample data and the same mock <ThumbPreview/>
// so direct comparison is about layout/IA — not content.

const T = {
  // Brand tokens (mirrors site/shared/system.css)
  bg:     '#0a0a0a',
  bgDeep: '#060606',
  surf:   '#141414',
  surf2:  '#1a1a1a',
  border: '#2a2a2a',
  borderS:'#3a3a3a',
  text:   '#f4f3eb',
  textDim:'#b5b4ab',
  dim:    '#7c7b73',
  amber:  '#D4A800',
  amberD: '#3a2d00',
  crimson:'#C8102E',
  green:  '#48c97a',
  fontSans:"'Inter','Helvetica Neue',Helvetica,Arial,sans-serif",
  fontMono:"'JetBrains Mono', ui-monospace,'SF Mono',Menlo,monospace",
};

// Sample data used everywhere.
const SAMPLE = {
  headline: 'She Stole a Police Car',
  hook: 'While Handcuffed',
  size: 70,
  layout: 'bottom-left',
  textOrder: 'hlabove',
  overlay: 'circle',
  overlayPos: 'tr',
  bgFx: { desat: true, darken: true, vignette: true },
  faceFx: { desat: false },
  brand: { on: true, pos: 'top-right' },
  caseNo: '014',
  caseName: 'Frost · Patrol Car',
  bgName: 'bodycam-still-03.jpg',
  faceName: 'mugshot-frost.png',
};

// Stylised mock of the 1280×720 output. Same every time so layouts compare.
// Width prop = the rendered width; height auto-derives at 16:9.
function ThumbPreview({ width = 640, frame = true, label }) {
  const h = Math.round(width * 9 / 16);
  return (
    <div style={{
      width, height: h, position: 'relative', overflow: 'hidden',
      borderRadius: 2,
      background:
        // Dim bodycam-ish gradient with a corner vignette
        'radial-gradient(120% 80% at 30% 40%, #2a2218 0%, #0a0805 70%, #000 100%)',
      border: frame ? `1px solid ${T.border}` : 'none',
      fontFamily: T.fontSans,
      color: '#fff',
      flexShrink: 0,
    }}>
      {/* faux scene: police-car silhouette suggested with shapes */}
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg,transparent 0%,rgba(0,0,0,.55) 100%)' }} />
      <div style={{ position: 'absolute', left: '8%', bottom: '14%', width: '38%', height: '34%',
        background: '#0e1014', borderRadius: 6, opacity: .85, boxShadow: '0 2px 12px #000' }} />
      <div style={{ position: 'absolute', left: '12%', bottom: '38%', width: '12%', height: '8%',
        background: 'linear-gradient(90deg,#c8102e 50%,#1a4dff 50%)', opacity: .85, filter: 'blur(.6px)' }} />

      {/* circle photo overlay top-right (matches sample.overlay/pos) */}
      <div style={{
        position: 'absolute', top: '6%', right: '6%',
        width: '26%', aspectRatio: '1/1', borderRadius: '50%',
        background:
          'radial-gradient(120% 100% at 50% 20%, #5a5040 0%, #1c1812 70%, #0a0805 100%)',
        boxShadow: '0 0 0 3px #f4f3eb, 0 4px 18px rgba(0,0,0,.7)',
      }}>
        {/* silhouette portrait */}
        <div style={{ position: 'absolute', left: '50%', top: '58%', transform: 'translate(-50%,-50%)',
          width: '64%', height: '70%' }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)',
            width: '52%', aspectRatio: '1/1', borderRadius: '50%', background: '#2a2218' }} />
          <div style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)',
            width: '92%', height: '52%', borderRadius: '40% 40% 0 0', background: '#1f1a14' }} />
        </div>
      </div>

      {/* corner tag */}
      <div style={{ position: 'absolute', top: 14, left: 14,
        padding: '3px 8px', background: T.amber, color: '#111',
        fontFamily: T.fontMono, fontSize: width / 70, fontWeight: 700, letterSpacing: 1.5,
        borderRadius: 2,
      }}>LITE</div>

      {/* headline (bottom-left, hook above headline) */}
      <div style={{ position: 'absolute', left: '5%', right: '36%', bottom: '8%' }}>
        <div style={{
          color: T.amber, fontWeight: 700,
          fontSize: width / 22, lineHeight: 1, letterSpacing: -0.5,
          textShadow: '0 2px 8px rgba(0,0,0,.7)',
        }}>{SAMPLE.hook}</div>
        <div style={{
          color: '#fff', fontWeight: 800,
          fontSize: width / 11, lineHeight: 0.95, letterSpacing: -1,
          marginTop: 6, textShadow: '0 2px 10px rgba(0,0,0,.85)',
        }}>{SAMPLE.headline}</div>
      </div>

      {label && (
        <div style={{ position: 'absolute', top: 10, right: 10,
          padding: '2px 6px', borderRadius: 2,
          background: 'rgba(0,0,0,.55)', border: '1px solid rgba(255,255,255,.18)',
          fontFamily: T.fontMono, fontSize: 9, letterSpacing: 1.5, color: '#fff',
        }}>{label}</div>
      )}
    </div>
  );
}

// Small mono "[● REC] 12:04:38" style timestamp.
function Tstamp({ children = '00:00:00', live = true }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 7px', borderRadius: 2,
      background: 'rgba(0,0,0,.6)', border: '1px solid rgba(255,255,255,.12)',
      fontFamily: T.fontMono, fontSize: 10, letterSpacing: 1.4, color: '#fff',
    }}>
      {live && <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.amber,
        boxShadow: '0 0 6px ' + T.amber }} />}
      {children}
    </span>
  );
}

// Mono lozenge label (matches site/shared/system.css .lite-label feel)
function Lbl({ children, dim, color, style }) {
  return (
    <div style={{
      fontFamily: T.fontMono, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
      fontWeight: 600, color: color || (dim ? T.dim : T.amber),
      ...style,
    }}>{children}</div>
  );
}

// Common "input" visual — used by several variants
function FakeInput({ value, w = 220, mono, accent }) {
  return (
    <div style={{
      width: w, padding: '8px 11px',
      background: T.bg, border: `1px solid ${T.border}`, borderRadius: 3,
      fontFamily: mono ? T.fontMono : T.fontSans,
      fontSize: 13, fontWeight: 500, color: accent ? T.amber : '#fff',
      letterSpacing: mono ? 1 : 0,
    }}>{value}</div>
  );
}

// A row of pill toggles, first one "on"
function Toggles({ options, onIdx = 0, w }) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {options.map((o, i) => (
        <div key={i} style={{
          padding: '6px 11px', borderRadius: 3,
          background: i === onIdx ? '#1a1400' : T.bg,
          border: '1px solid ' + (i === onIdx ? '#4a3800' : T.border),
          color: i === onIdx ? T.amber : T.dim,
          fontFamily: T.fontSans, fontSize: 10, fontWeight: 600,
          letterSpacing: 2, textTransform: 'uppercase',
          width: w,
        }}>{o}</div>
      ))}
    </div>
  );
}

Object.assign(window, { T, SAMPLE, ThumbPreview, Tstamp, Lbl, FakeInput, Toggles });
