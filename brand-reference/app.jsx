// LITE v2 — App shell

function useScrollSpy(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const handler = () => {
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - 140 <= 0) cur = id;
      }
      setActive(cur);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids.join(",")]);
  return active;
}

const SECTION_COMPS_V2 = [
  SectionPalette, SectionPrimaryRecog, SectionSecondaryRecog, SectionRedaction,
  SectionType, SectionMark, SectionTagline, SectionVoice,
  SectionAnatomy, SectionVariants, SectionLowerThirds,
  SectionCaptions, SectionHierarchy, SectionMotion, SectionFootage,
];

const TWEAK_DEFAULTS_V2 = /*EDITMODE-BEGIN*/{
  "density": "regular"
}/*EDITMODE-END*/;

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS_V2);

  React.useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-density",
      t.density === "compact" ? "0.85" : t.density === "comfy" ? "1.15" : "1"
    );
  }, [t.density]);

  const active = useScrollSpy(SECTIONS_V2.map((s) => s.id));

  const onJump = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: "smooth" });
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <button className="menu-btn" onClick={() => setSidebarOpen(true)}>Menu</button>

      <div className="app">
        <SidebarV2 active={active} onJump={onJump} open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="main">
          <Hero />
          {SECTION_COMPS_V2.map((C, i) => <C key={i} />)}
          <footer style={{ paddingTop: 64, color: "var(--text-dimmer)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <span>Left in the Edit · Brand Reference · v2</span>
              <span>Every cut, on the record<span style={{ color: "var(--amber)" }}>.</span></span>
            </div>
          </footer>
        </main>
      </div>

      <window.TweaksPanel>
        <window.TweakSection label="Sidebar">
          <window.TweakRadio
            label="Density"
            value={t.density}
            options={["compact", "regular", "comfy"]}
            onChange={(v) => setTweak("density", v)}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

function SidebarV2({ active, onJump, open, setOpen }) {
  const [collapsed, setCollapsed] = React.useState({});
  const toggle = (key) => setCollapsed((c) => ({ ...c, [key]: !c[key] }));

  return (
    <>
      {open && <div className="sb-overlay show" onClick={() => setOpen(false)} />}
      <aside className={"sidebar " + (open ? "open" : "")}>
        <a className="sb-brand" href="site/index.html" style={{ textDecoration: "none" }}>
          <span className="li">LI</span><span className="te">TE</span>
          <span className="ver">brand·v2</span>
        </a>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
          {NAV_V2.map((grp) => (
            <div key={grp.group} className={"sb-group" + (collapsed[grp.group] ? " collapsed" : "")}>
              <div className="sb-group-label" onClick={() => toggle(grp.group)}>{grp.group}</div>
              <div className="sb-items-wrap">
                {grp.items.map((it, idx) => {
                  const isActive = it.active;
                  const inner = (
                    <>
                      <span className="num">{String(idx + 1).padStart(2, "0")}</span>
                      <span>{it.label}</span>
                      {it.version && <span className="new-flag">{it.version}</span>}
                    </>
                  );
                  if (isActive) {
                    return (
                      <div
                        key={it.id}
                        className="sb-item active"
                        onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setOpen(false); }}
                        title="Brand Reference (current)"
                      >
                        {inner}
                      </div>
                    );
                  }
                  return (
                    <a key={it.id} className="sb-item" href={it.href || "#"} title={it.label}>
                      {inner}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="sb-group" style={{ marginTop: 4, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
            <div className="sb-group-label" style={{ color: "var(--amber)", cursor: "default" }}>On this page</div>
            <div className="sb-items-wrap">
              {SECTIONS_V2.map((s) => (
                <div
                  key={s.id}
                  className={"sb-item " + (active === s.id ? "active" : "")}
                  onClick={() => onJump(s.id)}
                >
                  <span className="num">{s.num}</span>
                  <span style={{ fontSize: 12 }}>{s.title.split(" — ")[0].split(" · ")[0]}</span>
                  {s.isNew && <span className="new-flag">NEW</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sb-foot">
          <a className="hub" href="site/index.html">← HUB</a>
        </div>
      </aside>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
