/**
 * inject_theme_scripts.js
 * Injects a self-contained theme restoration and toggle button script
 * into the <head> of all static HTML files in the public/ folder.
 */

const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, '..', 'public');

const themeScript = `
  <!-- Theme Restore and Toggle script -->
  <script>
    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
      window.addEventListener('DOMContentLoaded', () => {
        const container = document.querySelector('.header-container') || document.querySelector('header');
        if (!container) return;
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle-btn';
        toggleBtn.style.cssText = 'background: var(--bg3); color: var(--text); border: 1px solid var(--border); border-radius: 8px; padding: 8px 12px; display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; cursor: pointer; margin-left: 12px; font-family: "Sora", sans-serif; transition: all 0.2s;';
        const updateText = () => {
          const isLight = document.body.classList.contains('light-theme');
          toggleBtn.innerHTML = isLight ? '🌙 Dark' : '☀️ Light';
        };
        updateText();
        toggleBtn.addEventListener('click', () => {
          document.body.classList.toggle('light-theme');
          document.documentElement.classList.toggle('light-theme');
          const isLight = document.body.classList.contains('light-theme');
          localStorage.setItem('theme', isLight ? 'light' : 'dark');
          updateText();
        });
        const cta = container.querySelector('.cta-btn') || container.querySelector('.nav-cta');
        if (cta) {
          cta.parentNode.insertBefore(toggleBtn, cta);
        } else {
          container.appendChild(toggleBtn);
        }
      });
    })();
  </script>
`;

const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

let count = 0;
for (const file of files) {
  const fpath = path.join(publicDir, file);
  let html = fs.readFileSync(fpath, 'utf8');

  // Skip home.html if it doesn't have a standard nav header, or handle it
  if (file === 'home.html') continue;

  // Check if script already injected
  if (html.includes('theme-toggle-btn')) {
    // Remove old one to replace with updated one
    html = html.replace(/<!-- Theme Restore and Toggle script -->[\s\S]*?<\/script>/, '');
  }

  // Inject before </head>
  if (html.includes('</head>')) {
    html = html.replace('</head>', `${themeScript.trim()}\n</head>`);
    fs.writeFileSync(fpath, html, 'utf8');
    count++;
  }
}

console.log(`✅ Successfully injected theme switcher script into ${count} HTML files!`);
