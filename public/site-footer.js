(function () {
  'use strict';

  var FOOTER_HTML =
    '<div class="footer-accent"></div>' +
    '<div class="footer-banner">' +
      '<span class="banner-title">Proudly built by</span>' +
      '<a href="https://balanju-solutions.vercel.app/" target="_blank" rel="noopener noreferrer" class="banner-badge">' +
        '<span class="badge-icon">🔷</span>' +
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
            '<li><a href="https://balanju-solutions.vercel.app/" target="_blank" rel="noopener noreferrer">🏢 Balanju Solutions</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col card-col">' +
          '<div class="balanju-card">' +
            '<div class="card-header"><span>🔷</span><span class="card-title">Balanju Solutions</span></div>' +
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
          '<a href="/contact.html">Contact</a>' +
          '<span class="divider">·</span>' +
          '<a href="https://www.ourcompiler.com">ourcompiler.com</a>' +
        '</div>' +
      '</div>' +
    '</div>';

  function initFooter() {
    var footer = document.getElementById('site-footer') || document.querySelector('footer.footer');
    if (!footer || footer.dataset.footerLoaded === 'true') return;
    footer.className = 'footer';
    footer.id = 'site-footer';
    footer.innerHTML = FOOTER_HTML;
    footer.dataset.footerLoaded = 'true';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
  } else {
    initFooter();
  }
})();
