(function () {
  'use strict';

  var FOOTER_CSS = 
    '.footer { background: linear-gradient(180deg, #0d121c 0%, #07090e 100%); border-top: 1px solid rgba(255,255,255,0.12); position: relative; margin-top: 60px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif; box-sizing: border-box; color: #cbd5e1; }' +
    '.footer * { box-sizing: border-box; }' +
    '.footer-accent { height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(108,61,232,0.8) 30%, rgba(88,166,255,1.0) 50%, rgba(63,185,80,0.8) 70%, transparent 100%); }' +
    '.footer-banner { background: linear-gradient(135deg, rgba(108,61,232,0.2) 0%, rgba(88,166,255,0.12) 100%); border-bottom: 1px solid rgba(108,61,232,0.25); padding: 14px 40px; display: flex; align-items: center; justify-content: center; gap: 14px; }' +
    '.banner-title { font-size: 12px; color: #cbd5e1; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; }' +
    '.banner-badge { display: inline-flex; align-items: center; gap: 8px; text-decoration: none; background: rgba(108,61,232,0.25); border: 1px solid rgba(108,61,232,0.5); border-radius: 999px; padding: 6px 18px; transition: all 0.25s; }' +
    '.banner-badge:hover { background: rgba(108,61,232,0.4); border-color: #9f75ff; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(108,61,232,0.4); }' +
    '.badge-text { font-size: 13px; font-weight: 800; color: #c4b5fd; letter-spacing: 0.2px; }' +
    '.badge-arrow { font-size: 11px; color: rgba(196,181,253,0.9); font-weight: 700; }' +
    '.footer-grid-container { max-width: 1440px; margin: 0 auto; padding: 48px 32px 32px; }' +
    '.footer-grid { display: grid; grid-template-columns: minmax(240px, 1.3fr) minmax(130px, 1fr) minmax(130px, 1fr) minmax(140px, 1.1fr) minmax(230px, 1.3fr); gap: 24px; margin-bottom: 40px; align-items: start; }' +
    '@media (max-width: 992px) { .footer-grid { grid-template-columns: 1fr; gap: 28px; } }' +
    '.footer-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }' +
    '.footer-logo { height: 36px; width: 36px; object-fit: contain; border-radius: 9px; box-shadow: 0 0 16px rgba(88,166,255,0.4); }' +
    '.footer-brand-name { font-size: 19px; font-weight: 800; color: #ffffff; letter-spacing: -0.3px; }' +
    '.brand-desc { font-size: 13.5px; color: #cbd5e1; line-height: 1.85; max-width: 260px; margin: 0 0 14px 0; }' +
    '.col-title { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 18px; padding-bottom: 10px; }' +
    '.lang-title { color: #58a6ff; border-bottom: 1px solid rgba(88,166,255,0.35); }' +
    '.prod-title { color: #eab308; border-bottom: 1px solid rgba(234,179,8,0.35); }' +
    '.legal-title { color: #3fb950; border-bottom: 1px solid rgba(63,185,80,0.35); }' +
    '.footer-contact-line { font-size: 13px; color: #94a3b8; margin: 0; line-height: 1.6; }' +
    '.footer-contact-line a { color: #58a6ff; text-decoration: none; }' +
    '.col-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }' +
    '.col-list a { font-size: 13px; color: #cbd5e1; text-decoration: none; transition: color 0.18s; display: inline-flex; align-items: center; gap: 6px; }' +
    '.col-list a:hover { color: #58a6ff; }' +
    '.balanju-card { background: linear-gradient(135deg, rgba(108,61,232,0.18) 0%, rgba(108,61,232,0.06) 100%); border: 1px solid rgba(108,61,232,0.35); border-radius: 16px; padding: 22px; }' +
    '.card-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }' +
    '.card-title { font-size: 14px; font-weight: 800; color: #c4b5fd; letter-spacing: -0.2px; }' +
    '.card-desc { font-size: 12.5px; color: #e9d5ff; line-height: 1.75; margin: 0 0 16px; }' +
    '.card-btn { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 800; color: #ffffff; text-decoration: none; background: rgba(108,61,232,0.35); border: 1px solid rgba(108,61,232,0.6); border-radius: 999px; padding: 7px 18px; transition: all 0.2s; }' +
    '.card-btn:hover { background: rgba(108,61,232,0.5); box-shadow: 0 4px 16px rgba(108,61,232,0.45); }' +
    '.footer-bottom { border-top: 1px solid rgba(255,255,255,0.15); padding-top: 24px; padding-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 12.5px; }' +
    '.bottom-left { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; color: #cbd5e1; }' +
    '.bottom-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }' +
    '.bottom-right a { color: #94a3b8; text-decoration: none; transition: color 0.18s; }' +
    '.bottom-right a:hover { color: #58a6ff; }' +
    '.divider { color: rgba(255,255,255,0.3); }';

  var FOOTER_HTML =
    '<div class="footer-accent"></div>' +
    '<div class="footer-banner">' +
      '<span class="banner-title">Built by</span>' +
      '<a href="https://balanju-solutions.vercel.app/" target="_blank" rel="noopener noreferrer" class="banner-badge">' +
        '<img src="/balanju-logo.jpg" alt="Balanju Solutions" style="height: 20px; width: 20px; object-fit: contain; border-radius: 4px;" />' +
        '<span class="badge-text">Balanju Solutions</span>' +
        '<span class="badge-arrow">↗</span>' +
      '</a>' +
    '</div>' +
    '<div class="footer-grid-container">' +
      '<div class="footer-grid">' +
        '<div class="footer-col brand-col">' +
          '<div class="footer-brand">' +
            '<img src="/logo-nav.png" alt="Our Compiler" class="footer-logo" />' +
            '<span class="footer-brand-name">Our Compiler</span>' +
          '</div>' +
          '<p class="brand-desc">Free online code compiler and programming tutorials. Write, compile, and run code in 10+ languages — instantly in your browser. No setup. No login. Always free.</p>' +
          '<p class="footer-contact-line">📧 <a href="mailto:balanjusolutions@gmail.com">balanjusolutions@gmail.com</a></p>' +
          '<div style="display: flex; gap: 8px; margin-top: 14px;">' +
            '<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" style="width: 32px; height: 32px; border-radius: 7px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); display: inline-flex; align-items: center; justify-content: center; color: #e2e8f0; font-size: 13px; font-weight: 700; text-decoration: none;">𝕏</a>' +
            '<a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style="width: 32px; height: 32px; border-radius: 7px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); display: inline-flex; align-items: center; justify-content: center; color: #e2e8f0; font-size: 13px; font-weight: 700; text-decoration: none;">⌨</a>' +
            '<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style="width: 32px; height: 32px; border-radius: 7px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); display: inline-flex; align-items: center; justify-content: center; color: #e2e8f0; font-size: 13px; font-weight: 700; text-decoration: none;">in</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-col">' +
          '<p class="col-title lang-title">Online Compiler</p>' +
          '<ul class="col-list">' +
            '<li><a href="/?lang=python3">🐍 Python 3</a></li>' +
            '<li><a href="/?lang=java">☕ Java</a></li>' +
            '<li><a href="/?lang=nodejs">🟨 JavaScript</a></li>' +
            '<li><a href="/?lang=c">🔵 C</a></li>' +
            '<li><a href="/?lang=cpp17">⚡ C++</a></li>' +
            '<li><a href="/?lang=csharp">🔷 C#</a></li>' +
            '<li><a href="/?lang=go">🐹 Go</a></li>' +
            '<li><a href="/?lang=rust">🦀 Rust</a></li>' +
            '<li><a href="/?lang=php">🐘 PHP</a></li>' +
            '<li><a href="/?lang=ruby">💎 Ruby</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<p class="col-title prod-title">Learn</p>' +
          '<ul class="col-list">' +
            '<li><a href="/blog.html">📚 All Tutorials</a></li>' +
            '<li><a href="/blog-python.html">Python Guide</a></li>' +
            '<li><a href="/blog-java.html">Java Guide</a></li>' +
            '<li><a href="/blog-javascript.html">JavaScript Guide</a></li>' +
            '<li><a href="/blog-cpp.html">C++ Guide</a></li>' +
            '<li><a href="/blog-c.html">C Guide</a></li>' +
            '<li><a href="/blog-html.html">HTML5 Guide</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<p class="col-title legal-title">Company &amp; Legal</p>' +
          '<ul class="col-list">' +
            '<li><a href="/about.html">ℹ️ About Us</a></li>' +
            '<li><a href="/features.html">⚡ Features</a></li>' +
            '<li><a href="/contact.html">📬 Contact</a></li>' +
            '<li><a href="/privacy-policy.html">🔒 Privacy Policy</a></li>' +
            '<li><a href="/terms-of-service.html">📜 Terms of Service</a></li>' +
            '<li><a href="/disclaimer.html">⚖️ Disclaimer</a></li>' +
            '<li><a href="https://balanju-solutions.vercel.app/" target="_blank" rel="noopener noreferrer">🏢 Balanju Solutions</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col card-col">' +
          '<div class="balanju-card">' +
            '<div class="card-header"><img src="/balanju-logo.jpg" alt="Balanju Solutions" style="height: 22px; width: 22px; object-fit: contain; border-radius: 5px; margin-right: 6px;" /><span class="card-title">Balanju Solutions</span></div>' +
            '<p class="card-desc">Our Compiler is a flagship product of Balanju Solutions — building free developer tools and software for learners worldwide.</p>' +
            '<ul class="col-list" style="margin-bottom: 14px;">' +
              '<li><a href="https://balanju-solutions.vercel.app/" target="_blank" rel="noopener noreferrer">🌐 Company Website</a></li>' +
              '<li><a href="https://balanju-solutions.vercel.app/products.html" target="_blank" rel="noopener noreferrer">🚀 All Products</a></li>' +
              '<li><a href="https://balanju-solutions.vercel.app/services.html" target="_blank" rel="noopener noreferrer">🛠️ Our Services</a></li>' +
              '<li><a href="https://balanju-solutions.vercel.app/contact.html" target="_blank" rel="noopener noreferrer">🤝 Hire Us</a></li>' +
            '</ul>' +
            '<a href="https://balanju-solutions.vercel.app/" target="_blank" rel="noopener noreferrer" class="card-btn">Visit Company →</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<div class="bottom-left">' +
          '<span>© 2026 Our Compiler · Balanju Solutions. All rights reserved.</span>' +
          '<span class="divider">|</span>' +
          '<span>Made with ❤️ in India</span>' +
        '</div>' +
        '<div class="bottom-right">' +
          '<a href="/privacy-policy.html">Privacy</a>' +
          '<span class="divider">·</span>' +
          '<a href="/terms-of-service.html">Terms</a>' +
          '<span class="divider">·</span>' +
          '<a href="/disclaimer.html">Disclaimer</a>' +
          '<span class="divider">·</span>' +
          '<a href="/contact.html">Contact</a>' +
          '<span class="divider">·</span>' +
          '<a href="https://www.ourcompiler.com">ourcompiler.com</a>' +
        '</div>' +
      '</div>' +
    '</div>';

  function injectFooterStyles() {
    if (document.getElementById('site-footer-css')) return;
    var style = document.createElement('style');
    style.id = 'site-footer-css';
    style.textContent = FOOTER_CSS;
    document.head.appendChild(style);
  }

  function initConsentBanner() {
    try {
      if (typeof localStorage === 'undefined' || localStorage.getItem('ourcompiler_cookie_consent')) return;
      if (document.getElementById('cookie-consent-banner')) return;
      var banner = document.createElement('div');
      banner.id = 'cookie-consent-banner';
      banner.innerHTML =
        '<div style="position: fixed; bottom: 20px; right: 20px; left: 20px; max-width: 520px; margin: 0 auto; background: rgba(13, 17, 23, 0.96); color: #e6edf3; border: 1px solid rgba(88, 166, 255, 0.4); border-radius: 12px; padding: 18px 22px; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7); z-index: 999999; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; font-size: 13px; line-height: 1.5; backdrop-filter: blur(12px); display: flex; flex-direction: column; gap: 12px;">' +
          '<div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">' +
            '<div style="display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px; color: #58a6ff;">' +
              '<span>🍪 Privacy &amp; Cookie Consent</span>' +
            '</div>' +
          '</div>' +
          '<div style="color: #8b949e; font-size: 13px;">' +
            'We use essential cookies and trusted analytics to ensure you get the best code editing and compilation experience. By continuing to use Our Compiler, you agree to our <a href="/privacy-policy.html" style="color: #58a6ff; text-decoration: underline;">Privacy Policy</a> and <a href="/terms-of-service.html" style="color: #58a6ff; text-decoration: underline;">Terms of Service</a>.' +
          '</div>' +
          '<div style="display: flex; gap: 10px; justify-content: flex-end; align-items: center; margin-top: 4px;">' +
            '<button id="cookie-essential-btn" style="background: transparent; border: 1px solid #30363d; color: #c9d1d9; border-radius: 6px; padding: 6px 14px; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.2s;">Essential Only</button>' +
            '<button id="cookie-accept-btn" style="background: #238636; border: 1px solid rgba(240, 246, 252, 0.1); color: #fff; border-radius: 6px; padding: 6px 18px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s;">Accept All</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(banner);

      var acceptBtn = document.getElementById('cookie-accept-btn');
      var essentialBtn = document.getElementById('cookie-essential-btn');
      if (acceptBtn) {
        acceptBtn.addEventListener('click', function () {
          localStorage.setItem('ourcompiler_cookie_consent', 'accepted');
          banner.remove();
        });
      }
      if (essentialBtn) {
        essentialBtn.addEventListener('click', function () {
          localStorage.setItem('ourcompiler_cookie_consent', 'essential');
          banner.remove();
        });
      }
    } catch (e) {
      console.warn('Cookie consent error:', e);
    }
  }

  function initFooter() {
    injectFooterStyles();
    var footer = document.getElementById('site-footer') || document.querySelector('footer.footer');
    if (!footer) {
      footer = document.createElement('footer');
      footer.className = 'footer';
      footer.id = 'site-footer';
      document.body.appendChild(footer);
    }
    if (footer.dataset.footerLoaded === 'true') return;
    footer.className = 'footer';
    footer.id = 'site-footer';
    footer.innerHTML = FOOTER_HTML;
    footer.dataset.footerLoaded = 'true';
    initConsentBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
  } else {
    initFooter();
  }
})();
