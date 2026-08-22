const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

function processDir(dir) {
  const items = fs.readdirSync(dir);
  let updated = 0;
  items.forEach(item => {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      updated += processDir(full);
    } else if (item.endsWith('.html')) {
      let content = fs.readFileSync(full, 'utf8');
      let modified = false;

      if (!content.includes('site-footer.js')) {
        content = content.replace('</head>', '  <script src="/site-footer.js" defer></script>\n</head>');
        modified = true;
      }

      if (!content.includes('pages.css')) {
        content = content.replace('</head>', '  <link rel="stylesheet" href="/pages.css" />\n</head>');
        modified = true;
      }

      if (!content.includes('id="site-footer"') && !content.includes("id='site-footer'")) {
        content = content.replace('</body>', '  <footer class="footer" id="site-footer"></footer>\n</body>');
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(full, content, 'utf8');
        updated++;
      }
    }
  });
  return updated;
}

const count = processDir(publicDir);
console.log(`Successfully injected site-footer component into ${count} HTML pages across the website!`);
