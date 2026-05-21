// LITE — Generic localStorage persistence for any [data-persist] form field
// Drop into any generator page. Inputs, textareas, and selects with a
// `data-persist="key.name"` attribute auto-save on change and reload on mount.

(function () {
  const NS = (window.LITE_PAGE && window.LITE_PAGE.slug) || "page";
  const PREFIX = "lite.persist." + NS + ".";

  function ribbon() {
    let r = document.querySelector(".lite-persist-ribbon");
    if (!r) {
      r = document.createElement("div");
      r.className = "lite-persist-ribbon";
      r.innerHTML = '<span class="dot"></span> SAVED';
      document.body.appendChild(r);
    }
    r.classList.add("show");
    clearTimeout(r._t);
    r._t = setTimeout(() => r.classList.remove("show"), 900);
  }

  function load(el) {
    const key = PREFIX + el.dataset.persist;
    try {
      const v = localStorage.getItem(key);
      if (v === null) return;
      if (el.type === "checkbox") el.checked = v === "1";
      else if (el.type === "radio") el.checked = el.value === v;
      else el.value = v;
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    } catch (e) {}
  }

  function save(el) {
    const key = PREFIX + el.dataset.persist;
    try {
      if (el.type === "checkbox") localStorage.setItem(key, el.checked ? "1" : "0");
      else if (el.type === "radio") { if (el.checked) localStorage.setItem(key, el.value); }
      else localStorage.setItem(key, el.value);
      ribbon();
    } catch (e) {}
  }

  function init() {
    const fields = document.querySelectorAll("[data-persist]");
    fields.forEach((el) => {
      load(el);
      el.addEventListener("input", () => save(el));
      el.addEventListener("change", () => save(el));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // expose a helper for tools that want to persist non-form state too
  window.LITE_PERSIST = {
    get: (k) => { try { return localStorage.getItem(PREFIX + k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(PREFIX + k, v); ribbon(); } catch (e) {} },
    del: (k) => { try { localStorage.removeItem(PREFIX + k); } catch (e) {} },
  };

  // Cross-page shared case object — generators can read each other's last case
  window.LITE_CASE = {
    get: () => {
      try { return JSON.parse(localStorage.getItem("lite.case") || "{}"); } catch (e) { return {}; }
    },
    set: (obj) => {
      try {
        const cur = JSON.parse(localStorage.getItem("lite.case") || "{}");
        localStorage.setItem("lite.case", JSON.stringify({ ...cur, ...obj }));
      } catch (e) {}
    },
  };
})();
