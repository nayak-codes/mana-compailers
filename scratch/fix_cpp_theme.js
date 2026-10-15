const fs = require('fs');
const glob = require('glob');
const path = require('path');

// 1. Fix C++ scripts
const files = glob.sync('scratch/rewrite_cpp_*.js');
for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/color:#e2e8f0/g, 'color:var(--text2)');
  content = content.replace(/color: #e2e8f0/g, 'color:var(--text2)');
  content = content.replace(/color:#cbd5e1/g, 'color:var(--text2)');
  content = content.replace(/color: #cbd5e1/g, 'color:var(--text2)');
  content = content.replace(/background: #141922/g, 'background: var(--bg2)');
  content = content.replace(/border: 1px solid #27303f/g, 'border: 1px solid var(--border)');
  fs.writeFileSync(file, content);
  console.log('Fixed colors in ' + file);
}

// 2. Fix the master wrapper to have proper variables and the theme script
const masterFile = 'scratch/build_cpp_10_phases_master.js';
if (fs.existsSync(masterFile)) {
  let content = fs.readFileSync(masterFile, 'utf8');
  content = content.replace(/background: #0f141c/g, 'background: var(--bg2)');
  content = content.replace(/border: 1px solid #27303f/g, 'border: 1px solid var(--border)');
  content = content.replace(/color: #60a5fa/g, 'color: var(--blue)');
  content = content.replace(/background: #141922/g, 'background: var(--bg2)');
  content = content.replace(/color: #3b82f6/g, 'color: var(--blue)');

  const themeScript = `  <script>
    (function() {
      const currentTheme = localStorage.getItem('theme') || 'light';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        window.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
    })();
  </script>
`;

  if (!content.includes("localStorage.getItem('theme')")) {
    content = content.replace('</head>', themeScript + '</head>');
  }

  fs.writeFileSync(masterFile, content);
  console.log('Fixed master file ' + masterFile);
}
