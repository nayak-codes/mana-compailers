(function () {
  'use strict';

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
          '<p class="brand-desc">Free online code compiler and programming tutorials. Write, compile, and run code in 10 languages — no download, no account, always free.</p>' +
          '<p class="footer-contact-line">📧 <a href="mailto:balanjusolutions@gmail.com">balanjusolutions@gmail.com</a></p>' +
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
            '<li><a href="/blog-react.html">React Guide</a></li>' +
            '<li><a href="/blog-git.html">Git &amp; GitHub</a></li>' +
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
    var footer = document.getElementById('site-footer') || document.querySelector('footer.footer');
    if (!footer || footer.dataset.footerLoaded === 'true') return;
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

