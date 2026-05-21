// V5 — TERMINAL
// Keyboard-first, mono everything. The whole tool reads as a Unix command-
// driven session. The "form" is an editable command at the top; below it a
// live config printout shows the parsed args; the preview is the rendered
// output. Tab-complete affordances, shortcut hints. Maximum speed for the
// power-operator who knows what they want — minimum mouse.

function V5Terminal() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#050505', color: '#d6d4c8',
      fontFamily: T.fontMono, fontSize: 13, lineHeight: 1.5,
      padding: 24, position: 'relative', overflow: 'hidden',
    }}>
      {/* CRT scanlines */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'repeating-linear-gradient(180deg, rgba(212,168,0,.018) 0px, rgba(212,168,0,.018) 2px, transparent 2px, transparent 4px)' }} />

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* topline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <span style={{ color: T.amber, fontWeight: 700, letterSpacing: 2 }}>LITE</span>
          <span style={{ color: '#3a3a3a' }}>::</span>
          <span style={{ color: T.textDim }}>thumb</span>
          <span style={{ color: '#3a3a3a' }}>/</span>
          <span>{SAMPLE.caseName.toLowerCase().replace(/\s/g, '-')}</span>
          <div style={{ flex: 1 }} />
          <span style={{ color: T.dim }}>{SAMPLE.caseNo}</span>
          <span style={{ color: '#3a3a3a' }}>·</span>
          <span style={{ color: T.green }}>● ready</span>
          <span style={{ color: '#3a3a3a' }}>·</span>
          <span style={{ color: T.dim }}>14d-to-launch</span>
        </div>

        <Divider5 />

        {/* command line — the "form" */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 16 }}>
          <span style={{ color: T.amber, fontWeight: 700, flexShrink: 0 }}>$</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              <T5 c="#fff">render-thumb </T5>
              <T5 c={T.dim}>--headline </T5>
              <T5 c={T.amber}>"{SAMPLE.headline}"</T5>
              <T5> </T5>
              <T5 c={T.dim}>--hook </T5>
              <T5 c={T.amber}>"{SAMPLE.hook}"</T5>
              <T5> </T5>
              <T5 c={T.dim}>--size </T5>
              <T5 c="#fff">{SAMPLE.size}</T5>
              <T5> </T5>
              <T5 c={T.dim}>--layout </T5>
              <T5 c="#fff">{SAMPLE.layout}</T5>
              <T5> </T5>
              <T5 c={T.dim}>\</T5>
              {'\n  '}
              <T5 c={T.dim}>--overlay </T5>
              <T5 c="#fff">circle@tr </T5>
              <T5 c={T.dim}>--bg </T5>
              <T5 c="#fff">desat+darken+vignette </T5>
              <T5 c={T.dim}>--brand </T5>
              <T5 c="#fff">tr </T5>
              <T5 c={T.dim}>\</T5>
              {'\n  '}
              <T5 c={T.dim}>--from </T5>
              <T5 c="#7eaaff">{SAMPLE.bgName}</T5>
              <T5 c={T.dim}>,</T5>
              <T5 c="#7eaaff">{SAMPLE.faceName}</T5>
              {' '}
              <span style={{ display: 'inline-block', width: 8, height: 16,
                background: T.amber, marginLeft: 4, verticalAlign: 'middle',
                animation: 'none' }} />
            </div>
            <div style={{ color: T.dim, marginTop: 8, fontSize: 11, letterSpacing: 1.2 }}>
              <span style={{ color: T.amber }}>tab</span> complete
              <span style={{ margin: '0 12px', color: '#3a3a3a' }}>·</span>
              <span style={{ color: T.amber }}>↑</span> history
              <span style={{ margin: '0 12px', color: '#3a3a3a' }}>·</span>
              <span style={{ color: T.amber }}>⌃k</span> clear
              <span style={{ margin: '0 12px', color: '#3a3a3a' }}>·</span>
              <span style={{ color: T.amber }}>⌃↵</span> run + export
              <span style={{ margin: '0 12px', color: '#3a3a3a' }}>·</span>
              <span style={{ color: T.amber }}>?</span> all flags
            </div>
          </div>
        </div>

        <Divider5 mt={20} />

        {/* split: live config + preview */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '380px 1fr',
          gap: 24, marginTop: 18, minHeight: 0 }}>

          {/* parsed config */}
          <div style={{ overflow: 'auto' }}>
            <div style={{ color: T.dim, marginBottom: 8 }}>
              <span style={{ color: T.amber }}>▸ </span>parsed config
            </div>
            <ConfigBlock title="text">
              <KV k="headline" v={`"${SAMPLE.headline}"`} />
              <KV k="hook"     v={`"${SAMPLE.hook}"`} amber />
              <KV k="size"     v={SAMPLE.size + 'pt'} />
              <KV k="order"    v="headline → hook" />
            </ConfigBlock>
            <ConfigBlock title="composition">
              <KV k="layout"   v={SAMPLE.layout} />
              <KV k="overlay"  v={`${SAMPLE.overlay}@${SAMPLE.overlayPos}`} />
              <KV k="brand"    v="tr" />
            </ConfigBlock>
            <ConfigBlock title="treatment">
              <KV k="bg.desat"    v="true"  green />
              <KV k="bg.darken"   v="true"  green />
              <KV k="bg.vignette" v="true"  green />
              <KV k="face.desat"  v="false" dim />
            </ConfigBlock>
            <ConfigBlock title="sources">
              <KV k="bg"   v={SAMPLE.bgName} link />
              <KV k="face" v={SAMPLE.faceName} link />
            </ConfigBlock>
            <ConfigBlock title="output">
              <KV k="path"   v={`./thumbs/${SAMPLE.caseNo}.png`} link />
              <KV k="size"   v="1280 × 720" />
              <KV k="format" v="png · sRGB" />
            </ConfigBlock>

            <div style={{ marginTop: 14, color: T.dim }}>
              <span style={{ color: T.green }}>✓</span> validated · 13 args
            </div>
          </div>

          {/* preview as "monitor" */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ color: T.dim, marginBottom: 8 }}>
              <span style={{ color: T.amber }}>▸ </span>preview
              <span style={{ color: '#3a3a3a', margin: '0 10px' }}>·</span>
              <span>live</span>
            </div>
            <div style={{ flex: 1, padding: 18,
              background: '#020202', border: `1px solid ${T.border}`, borderRadius: 2,
              display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0,
            }}>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center',
                alignItems: 'center', minHeight: 0 }}>
                <ThumbPreview width={720} />
              </div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center',
                fontSize: 11, color: T.dim, letterSpacing: 1.5 }}>
                <span style={{ color: T.green }}>● render ok</span>
                <span style={{ color: '#3a3a3a' }}>·</span>
                <span>240ms</span>
                <span style={{ color: '#3a3a3a' }}>·</span>
                <span>1280×720</span>
                <span style={{ color: '#3a3a3a' }}>·</span>
                <span>74KB</span>
                <div style={{ flex: 1 }} />
                <span style={{ color: T.amber, fontWeight: 700 }}>⌃↵ export</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function T5({ children, c }) {
  return <span style={{ color: c || '#d6d4c8' }}>{children}</span>;
}

function Divider5({ mt = 0 }) {
  return <div style={{ height: 1, marginTop: mt,
    background: 'linear-gradient(90deg,#1a1a1a,#3a2d00,#1a1a1a)' }} />;
}

function ConfigBlock({ title, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ color: T.amber, fontSize: 11, letterSpacing: 2,
        textTransform: 'uppercase', marginBottom: 5 }}>[{title}]</div>
      <div style={{ paddingLeft: 14, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {children}
      </div>
    </div>
  );
}

function KV({ k, v, amber, green, dim, link }) {
  const valColor = amber ? T.amber
                : green ? T.green
                : dim   ? T.dim
                : link  ? '#7eaaff'
                : '#fff';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr',
      fontSize: 12 }}>
      <span style={{ color: T.dim }}>{k}</span>
      <span style={{ color: valColor, textDecoration: link ? 'underline' : 'none',
        textDecorationColor: '#3a3a3a' }}>{v}</span>
    </div>
  );
}

Object.assign(window, { V5Terminal });
