const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

const universalThemeScript = `
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
        const nav = document.querySelector('.topnav') || document.querySelector('.header-container') || document.querySelector('header');
        if (!nav || nav.querySelector('.blog-theme-toggle')) return;
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'blog-theme-toggle';
        toggleBtn.style.cssText = 'margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: "Inter", sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;';
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
        nav.appendChild(toggleBtn);
      });
    })();
  </script>`;

function processDir(dir) {
  const items = fs.readdirSync(dir);
  let count = 0;
  items.forEach(item => {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      count += processDir(full);
    } else if (item.endsWith('.html')) {
      let content = fs.readFileSync(full, 'utf8');
      
      // Inject universalThemeScript if not present in head
      if (!content.includes('blog-theme-toggle')) {
        content = content.replace('</head>', `${universalThemeScript}\n</head>`);
        fs.writeFileSync(full, content, 'utf8');
        count++;
      }
    }
  });
  return count;
}

const total = processDir(publicDir);
console.log(`Successfully injected universal theme toggle into ${total} HTML files!`);
