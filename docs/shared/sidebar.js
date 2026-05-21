// LITE — shell helper: mobile menu, group collapse, backdrop.
(function () {
  function init() {
    document.body.classList.add("lite-ready");

    const sidebar = document.getElementById("lite-sidebar");

    // ── Collapsible groups ────────────────────────────────────────
    if (sidebar) {
      sidebar.querySelectorAll(".sb-group").forEach(function (group) {
        const label = group.querySelector(".sb-group-label");
        if (!label) return;

        // Wrap all .sb-item children in a collapsible container
        const items = Array.from(group.querySelectorAll(":scope > .sb-item"));
        if (items.length === 0) return;
        const wrap = document.createElement("div");
        wrap.className = "sb-items-wrap";
        items.forEach(function (item) { wrap.appendChild(item); });
        group.appendChild(wrap);

        label.addEventListener("click", function () {
          group.classList.toggle("collapsed");
        });
      });
    }

    // ── Mobile overlay backdrop ───────────────────────────────────
    const overlay = document.createElement("div");
    overlay.className = "lite-sidebar-overlay";
    document.body.appendChild(overlay);

    function openSidebar() {
      if (sidebar) sidebar.classList.add("open");
      overlay.classList.add("show");
    }
    function closeSidebar() {
      if (sidebar) sidebar.classList.remove("open");
      overlay.classList.remove("show");
    }

    overlay.addEventListener("click", closeSidebar);

    // ── Mobile menu button injection ──────────────────────────────
    if (!document.querySelector(".lite-menu-btn")) {
      const btn = document.createElement("button");
      btn.className = "lite-menu-btn";
      btn.textContent = "Menu";
      btn.onclick = openSidebar;
      document.body.appendChild(btn);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  window.LITE_NAV = [];
})();
