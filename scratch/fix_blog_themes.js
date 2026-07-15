/**
 * fix_blog_themes.js
 * Injects CSS variables and JS toggles for dark/light themes, Copy buttons,
 * and Auto-Run compiler preloading into ALL HTML files in public/ directory recursively.
 */

const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, '..', 'public');

const lightThemeCss = `
    body.light-theme {
      --bg:       #f6f8fa;
      --bg2:      #ffffff;
      --bg3:      #eaeef2;
      --border:   #d0d7de;
      --accent:   #fd8c73;
      --green:    #1a7f37;
      --blue:     #0969da;
      --red:      #cf222e;
      --text:     #24292f;
      --text2:    #57606a;
      --text3:    #8c959f;
    }
`;

const themeToggleScript = `
  <!-- Blog Theme Switcher -->
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
        // Theme Toggle Button
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: "Inter", sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;';
          toggleBtn.addEventListener('mouseenter', () => {
            toggleBtn.style.background = 'rgba(255, 255, 255, 0.25)';
            toggleBtn.style.borderColor = '#ffffff';
          });
          toggleBtn.addEventListener('mouseleave', () => {
            toggleBtn.style.background = 'rgba(255, 255, 255, 0.15)';
            toggleBtn.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          });
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
          topnav.appendChild(toggleBtn);
        }

        // Decorate Code Blocks (Copy Code & Preload Run Code)
        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;

          // Find or create actions container inside header
          let actionsContainer = header.querySelector('.code-actions');
          if (!actionsContainer) {
            actionsContainer = document.createElement('div');
            actionsContainer.className = 'code-actions';
            actionsContainer.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-left: auto;';
            const tryBtn = header.querySelector('.try-btn');
            if (tryBtn) {
              actionsContainer.appendChild(tryBtn);
            }
            header.appendChild(actionsContainer);
          }

          // Inject Copy Button
          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn';
          copyBtn.innerHTML = '📋 Copy';
          copyBtn.style.cssText = 'background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: "Inter", sans-serif; white-space: nowrap;';
          copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.background = 'rgba(255, 255, 255, 0.25)';
            copyBtn.style.borderColor = '#ffffff';
          });
          copyBtn.addEventListener('mouseleave', () => {
            copyBtn.style.background = 'rgba(255, 255, 255, 0.15)';
            copyBtn.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          });
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(codeEl.textContent).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => {
                copyBtn.innerHTML = '📋 Copy';
              }, 2000);
            }).catch(err => {
              console.error('Failed to copy: ', err);
            });
          });
          actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);

          // Preload Code into Editor on Run Click
          const tryBtn = actionsContainer.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              const url = tryBtn.getAttribute('href');
              const urlParams = new URLSearchParams(url.split('?')[1]);
              const langId = urlParams.get('lang') || 'python3';
              localStorage.setItem('code_' + langId, codeEl.textContent);
              window.location.href = url;
            });
          }
        });
      });
    })();
  </script>
`;

function getFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allFiles = getFilesRecursively(publicDir);
const blogFiles = allFiles.filter(f => f.endsWith('.html'));

let count = 0;
for (const fpath of blogFiles) {
  let html = fs.readFileSync(fpath, 'utf8');

  // Skip the main app index.html
  if (fpath.endsWith('index.html')) continue;

  // Remove old script if exists
  if (html.includes('blog-theme-toggle') || html.includes('Blog Theme Switcher')) {
    html = html.replace(/<!-- Blog Theme Switcher -->[\s\S]*?<\/script>/g, '');
  }
  // Remove duplicate light-theme body definitions in head if exist
  if (html.includes('body.light-theme {')) {
    html = html.replace(/\s*body\.light-theme\s*\{[\s\S]*?\}/g, '');
  }

  // 1. Inject CSS variables inside <style> if present
  const styleIndex = html.indexOf('</style>');
  if (styleIndex !== -1) {
    if (!html.includes('body.light-theme {')) {
      html = html.substring(0, styleIndex) + lightThemeCss + html.substring(styleIndex);
    }
  }

  // 2. Inject script before </head>
  const headIndex = html.indexOf('</head>');
  if (headIndex !== -1) {
    html = html.substring(0, headIndex) + themeToggleScript.trim() + '\n' + html.substring(headIndex);
  }

  fs.writeFileSync(fpath, html, 'utf8');
  count++;
}

console.log(`🎉 Done! Injected theme, copy, and run-preloading features into ${count} blog & tutorial files.`);
