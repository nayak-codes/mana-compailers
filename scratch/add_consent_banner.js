const fs = require('fs');

let c = fs.readFileSync('public/site-footer.js', 'utf8');

const consentCode = `
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
`;

if (!c.includes('initConsentBanner')) {
  c = c.replace('function initFooter() {', consentCode + '\n  function initFooter() {');
  c = c.replace(/footer\.dataset\.footerLoaded = 'true';/g, "footer.dataset.footerLoaded = 'true';\n    initConsentBanner();");
  fs.writeFileSync('public/site-footer.js', c, 'utf8');
  console.log('Successfully injected Consent Banner into public/site-footer.js');
} else {
  console.log('Consent Banner already present in public/site-footer.js');
}

