(function () {
  'use strict';
  if (document.getElementById('sb-css')) return;

  var W = 220;
  var rawPage = location.pathname.split('/').pop() || 'hub.html';
  var aliases = { 'brand-reference-light.html': 'brand-reference.html' };
  var page = aliases[rawPage] || rawPage;
  var isHub = (page === 'hub.html' || page === '');

  // If we're in a bucket subfolder (e.g. 01_Brand/foo.html), prefix links with '../'
  var pathParts = location.pathname.split('/').filter(Boolean);
  var parentFolder = pathParts.length >= 2 ? pathParts[pathParts.length - 2] : '';
  var inSubfolder = /^0\d_/.test(parentFolder);
  var prefix = inSubfolder ? '../' : '';

  // Compare just the filename portion of an item's href to the current page
  function basename(p) { return p.split('/').pop(); }

  var groups = [
    {
      id: 'brand',
      label: '01 — Brand',
      cls: 'sg-gold',
      items: [
        { href: '01_Brand/brand-reference.html',       label: 'Brand Reference' },
        { href: '01_Brand/logo-sketches.html',         label: 'Logo Concepts'   },
        { href: '01_Brand/icon-concepts.html',         label: 'Icon Concepts'   },
        { href: '01_Brand/channel-banner-export.html', label: 'Channel Banner'  }
      ]
    },
    {
      id: 'references',
      label: '02 — References',
      cls: 'sg-blue',
      items: [
        { href: '02_Production/editorial-standards.html',     label: 'Editorial Standards' },
        { href: '02_Production/redaction-reveal-system.html', label: 'Redaction / Reveal'  },
        { href: '03_Packaging/title-thumbnail-system.html',   label: 'Title & Thumbnail'   }
      ]
    },
    {
      id: 'production',
      label: '03 — Production',
      cls: 'sg-green',
      items: [
        { href: '02_Production/production-pipeline.html',   label: 'Production Pipeline'   },
        { href: '02_Production/skill-workflow.html',        label: 'Skill Workflow'        },
        { href: '04_Distribution/social-media-workflow.html', label: 'Social Media Workflow' }
      ]
    },
    {
      id: 'tools',
      label: '04 — Tools',
      cls: 'sg-crimson',
      items: [
        { href: '03_Packaging/thumbnail-generator.html',  label: 'Thumbnail Generator' },
        { href: '01_Brand/mugshot-border-generator.html', label: 'Border Generator'    },
        { href: '01_Brand/corner-tag-generator.html',     label: 'Corner Tag'          }
      ]
    },
    {
      id: 'archive',
      label: '05 — Archive',
      cls: 'sg-grey',
      items: [
        { href: '01_Brand/mugshot-nameplate-generator.html', label: 'Nameplate Generator' },
        { href: '03_Packaging/thumbnail-research.html',      label: 'Thumbnail Research'  },
        { href: '04_Distribution/competitor-analysis.html',  label: 'Competitor Analysis' },
        { href: '02_Production/claude-skills-cheatsheet.html', label: 'Claude Cheatsheet'   },
        { href: '01_Brand/colour-comparison.html',           label: 'Colour Comparison'   },
        { href: '04_Distribution/landing-page.html',         label: 'Landing Page'        }
      ]
    }
  ];

  // ── Inject CSS ───────────────────────────────────────────────────────────────
  var style = document.createElement('style');
  style.id = 'sb-css';
  style.textContent =
    'body{margin-left:' + W + 'px!important}' +
    '.page-header{margin-top:0!important;margin-bottom:0!important;padding:48px 80px 40px!important;height:168px!important;box-sizing:border-box!important;display:flex!important;justify-content:space-between!important;align-items:flex-end!important;border-bottom:1px solid #1e1e1e!important;overflow:hidden!important}' +
    '.page-header-left{display:flex!important;flex-direction:column!important;gap:8px!important;flex:1 1 auto!important;min-width:0!important}' +
    '.page-header .page-eyebrow{font-size:10px!important;letter-spacing:4px!important;text-transform:uppercase!important;color:#888!important;font-weight:500!important;line-height:1.2!important}' +
    '.page-header .page-title{font-size:28px!important;font-weight:700!important;letter-spacing:-0.4px!important;color:#fff!important;line-height:1.2!important}' +
    '.page-header .page-title span{color:#D4A800!important}' +
    '.page-header .page-sub{font-size:13px!important;color:#888!important;line-height:1.5!important;margin-top:2px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;max-width:640px!important}' +
    '.page-header .page-meta{font-size:11px!important;color:#333!important;text-align:right!important;line-height:1.8!important;letter-spacing:1px!important;flex-shrink:0!important}' +
    '@media (max-width:900px){.page-header{padding:40px 24px 32px!important;flex-direction:column!important;gap:12px!important;align-items:flex-start!important;height:auto!important;min-height:140px!important}.page-header .page-sub{white-space:normal!important;max-width:none!important}}' +
    '#sb{position:fixed;left:0;top:0;bottom:0;width:' + W + 'px;background:#0d0d0d;border-right:1px solid #1e1e1e;display:flex;flex-direction:column;z-index:9000;overflow:hidden;font-family:\'Inter\',\'Helvetica Neue\',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.2!important}' +
    '#sb *{box-sizing:border-box}' +
    'a.sb-brand{display:block;padding:24px 22px 20px;border-bottom:1px solid #1e1e1e;flex-shrink:0;text-decoration:none;line-height:1!important}' +
    '.sb-brand-mark{font-size:16px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:#fff;line-height:1!important}' +
    '.sb-brand-mark em{color:#D4A800;font-style:normal}' +
    '.sb-brand-sub{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#484848;margin-top:5px;line-height:1!important}' +
    '/* Unify sidebar text shades */' +
    '.sb-nav{padding:16px 0 20px;flex:1;overflow-y:auto;min-height:0}' +
    '.sb-group{margin-bottom:4px}' +
    '.sb-group-hdr{display:flex;align-items:center;gap:10px;padding:7px 22px;text-decoration:none;cursor:pointer;line-height:1!important}' +
    '.sb-group-hdr:hover .sb-lbl{color:#e8e8e0}' +
    '.sb-dot{display:block;width:18px;height:3px;border-radius:1px;flex-shrink:0}' +
    '.sb-lbl{font-size:9px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#484848;transition:color .2s;line-height:1!important}' +
    '.sb-items{padding:2px 0 8px 50px;display:flex;flex-direction:column;gap:0}' +
    '.sb-item{font-size:11px;color:#484848;text-decoration:none;padding:4px 0;line-height:1.4!important;transition:color .15s}' +
    '.sb-item:hover{color:#999}' +
    '.sb-item.is-cur{color:#777}' +
    '.sg-gold .sb-dot{background:rgba(212,168,0,0.5)}' +
    '.sg-green .sb-dot{background:rgba(46,125,79,0.55)}' +
    '.sg-blue .sb-dot{background:rgba(74,158,255,0.4)}' +
    '.sg-crimson .sb-dot{background:rgba(200,16,46,0.45)}' +
    '.sg-grey .sb-dot{background:rgba(120,120,120,0.45)}' +
    '.sb-group.is-active .sb-lbl{color:#e8e8e0}' +
    '.sb-group.is-active .sb-item{color:#555}' +
    '.sg-gold.is-active .sb-lbl{color:#b89430}' +
    '.sg-green.is-active .sb-lbl{color:#6abf6a}' +
    '.sg-blue.is-active .sb-lbl{color:#6a9ecc}' +
    '.sg-crimson.is-active .sb-lbl{color:#b04455}' +
    '.sg-grey.is-active .sb-lbl{color:#888}' +
    '.sb-footer{padding:14px 22px;border-top:1px solid #1e1e1e;font-size:9px;color:#2a2a2a;letter-spacing:1px;line-height:1.7!important;flex-shrink:0}' +
    '.sb-extras{padding:12px 22px;border-top:1px solid #1e1e1e;flex-shrink:0}' +
    '.sb-extras a,.sb-extras button{display:block;width:100%;font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#484848;background:none;border:1px solid #1e1e1e;border-radius:2px;padding:7px 10px;text-align:center;text-decoration:none;cursor:pointer;font-family:inherit;line-height:1!important;transition:color .15s,border-color .15s}' +
    '.sb-extras a:hover,.sb-extras button:hover{color:#e8e8e0;border-color:#444}';
  document.head.appendChild(style);

  // ── Build HTML ───────────────────────────────────────────────────────────────
  var html = '<a href="' + prefix + 'hub.html" class="sb-brand">' +
    '<div class="sb-brand-mark">LI<em>TE</em></div>' +
    '<div class="sb-brand-sub">Left in the Edit</div>' +
    '</a><div class="sb-nav">';

  groups.forEach(function (g) {
    var groupActive = g.items.some(function (i) { return basename(i.href) === page; });
    var href = isHub ? '#' + g.id : (prefix + 'hub.html');
    html += '<div class="sb-group ' + g.cls + (groupActive ? ' is-active' : '') + '" id="sbg-' + g.id + '">';
    html += '<a class="sb-group-hdr" href="' + href + '"><span class="sb-dot"></span><span class="sb-lbl">' + g.label + '</span></a>';
    html += '<div class="sb-items">';
    g.items.forEach(function (item) {
      var isCur = basename(item.href) === page;
      html += '<a class="sb-item' + (isCur ? ' is-cur' : '') + '" href="' + prefix + item.href + '">' + item.label + '</a>';
    });
    html += '</div></div>';
  });

  html += '</div><div class="sb-extras" id="sb-extras"></div><div class="sb-footer">03 — Assets / Tools</div>';

  var nav = document.createElement('div');
  nav.id = 'sb';
  nav.innerHTML = html;

  // ── Insert + cleanup ─────────────────────────────────────────────────────────
  function insert() {
    document.body.insertBefore(nav, document.body.firstChild);

    // Hide old fixed top nav bars (the ← Hub bars)
    document.querySelectorAll('body > div').forEach(function (el) {
      var s = el.getAttribute('style') || '';
      if ((s.indexOf('position:fixed') !== -1 || s.indexOf('position: fixed') !== -1) && el !== nav) {
        el.style.display = 'none';
      }
    });
    // Also handle .hub-nav class variant (brand-reference)
    var hubNav = document.querySelector('.hub-nav');
    if (hubNav) {
      var extras = document.getElementById('sb-extras');
      hubNav.querySelectorAll('a:not([href="hub.html"]), button').forEach(function (ctrl) {
        if (extras) extras.appendChild(ctrl);
      });
      if (extras && !extras.firstChild) extras.style.display = 'none';
      hubNav.style.display = 'none';
    }

    // Hub: scroll spy + smooth scroll
    if (isHub) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var el = document.getElementById('sbg-' + e.target.id);
          if (el) el.classList.toggle('is-active', e.isIntersecting);
        });
      }, { threshold: 0.1 });

      ['brand', 'references', 'production', 'tools', 'archive'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) io.observe(el);
      });

      document.querySelectorAll('.sb-group-hdr').forEach(function (a) {
        a.addEventListener('click', function (e) {
          var h = a.getAttribute('href');
          if (h && h.charAt(0) === '#') {
            e.preventDefault();
            var t = document.querySelector(h);
            if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }
  }

  if (document.body) { insert(); }
  else { document.addEventListener('DOMContentLoaded', insert); }
})();
