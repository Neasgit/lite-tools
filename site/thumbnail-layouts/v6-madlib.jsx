// V6 — INLINE MADLIB
// The wildcard. The whole "form" is a single editable paragraph: every
// settable value is an inline pill that opens an inline picker. The canvas
// preview sits above, dominant. Reads like a sentence; works like a tool.
// Best for fast typists; surprisingly liquid once you internalise it.

function V6Madlib() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: T.bg, color: T.text, fontFamily: T.fontSans,
      display: 'flex', flexDirection: 'column', padding: 36,
    }}>
      {/* topline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <Lbl>Thumbnail · {SAMPLE.caseName.toUpperCase()}</Lbl>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: T.fontMono, fontSize: 10, color: T.dim,
          letterSpacing: 2, textTransform: 'uppercase' }}>
          ↵ live · auto-saves
        </span>
      </div>

      {/* canvas dominant */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
        <div style={{ position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,.6), 0 0 0 1px ' + T.border }}>
          <ThumbPreview width={920} />
        </div>
      </div>

      {/* the prose */}
      <div style={{
        maxWidth: 1100, margin: '0 auto', width: '100%',
        fontSize: 22, lineHeight: 1.7, color: T.textDim, letterSpacing: -.1,
        textWrap: 'pretty',
      }}>
        Render a thumbnail with the headline <Pill kind="text">{SAMPLE.headline}</Pill> in
        size <Pill kind="num">{SAMPLE.size}</Pill> placed at <Pill kind="enum">bottom-left</Pill>,
        paired with the hook <Pill kind="text" accent>{SAMPLE.hook}</Pill>. Show
        a <Pill kind="enum">circle</Pill> overlay in the <Pill kind="grid" value="tr">top-right</Pill> with
        the face <Pill kind="file">{SAMPLE.faceName}</Pill> over <Pill kind="file">{SAMPLE.bgName}</Pill>.
        Treat the background with <Pill kind="multi">desaturate, darken, vignette</Pill> and
        leave the face <Pill kind="enum">untouched</Pill>. Stamp the <Pill kind="enum">LITE</Pill> tag
        in the <Pill kind="enum">top-right</Pill>, then <Pill kind="cta">↓ download PNG</Pill>.
      </div>

      <div style={{ flex: 1 }} />

      {/* keyboard hint footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 36,
        fontFamily: T.fontMono, fontSize: 10, color: T.dim,
        letterSpacing: 2, textTransform: 'uppercase' }}>
        <KbdHint k="tab" label="next field" />
        <KbdHint k="↑↓" label="cycle value" />
        <KbdHint k="⌘↵" label="export" />
        <KbdHint k="⌘/" label="raw view" />
        <div style={{ flex: 1 }} />
        <span>preview · 1280 × 720 · 240 ms</span>
      </div>
    </div>
  );
}

function Pill({ children, kind = 'text', accent, value }) {
  const palette = {
    text:  { bg: 'rgba(212,168,0,.08)', border: 'rgba(212,168,0,.35)', color: T.amber },
    num:   { bg: 'rgba(72,201,122,.07)', border: 'rgba(72,201,122,.35)', color: T.green },
    enum:  { bg: T.surf2, border: T.borderS, color: T.text },
    multi: { bg: T.surf2, border: T.borderS, color: T.text },
    file:  { bg: 'transparent', border: '#2a3340', color: '#7eaaff' },
    grid:  { bg: T.surf2, border: T.borderS, color: T.text },
    cta:   { bg: T.amber, border: T.amber, color: '#111' },
  };
  const p = palette[kind] || palette.text;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: kind === 'cta' ? '5px 14px' : '2px 11px',
      borderRadius: 4,
      background: p.bg,
      border: `1px solid ${p.border}`,
      color: accent ? T.amber : p.color,
      fontFamily: kind === 'file' || kind === 'num' ? T.fontMono : T.fontSans,
      fontSize: kind === 'cta' ? 14 : 19,
      fontWeight: kind === 'cta' ? 800 : 600,
      letterSpacing: kind === 'cta' ? 2 : 0,
      textTransform: kind === 'cta' ? 'uppercase' : 'none',
      cursor: 'pointer',
      verticalAlign: 'middle',
      lineHeight: 1.3,
    }}>
      {kind === 'grid' && value && <MiniGridIcon active={value} />}
      {kind === 'file' && <span style={{ color: T.dim, fontSize: 12 }}>◾</span>}
      {children}
      {kind !== 'cta' && (
        <span style={{ color: T.dim, fontSize: 11, marginLeft: 2,
          opacity: kind === 'file' ? 1 : .6 }}>▾</span>
      )}
    </span>
  );
}

function MiniGridIcon({ active }) {
  const positions = ['tl','tc','tr','ml','mc','mr','bl','bc','br'];
  return (
    <span style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(3, 3px)', gap: 1.5 }}>
      {positions.map(p => (
        <span key={p} style={{ width: 3, height: 3, borderRadius: 0.5,
          background: p === active ? T.amber : T.dim, opacity: p === active ? 1 : .5 }} />
      ))}
    </span>
  );
}

function KbdHint({ k, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span style={{
        padding: '2px 7px', borderRadius: 3,
        background: T.surf2, border: `1px solid ${T.border}`,
        color: T.text, fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
      }}>{k}</span>
      <span>{label}</span>
    </span>
  );
}

Object.assign(window, { V6Madlib });
