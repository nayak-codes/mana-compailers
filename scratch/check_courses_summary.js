const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

function getFolderStats() {
  const folders = fs.readdirSync(publicDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const results = [];

  folders.forEach(folder => {
    const dirPath = path.join(publicDir, folder);
    const htmlFiles = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
    if (htmlFiles.length > 0) {
      results.push({
        folder,
        count: htmlFiles.length
      });
    }
  });

  results.sort((a, b) => b.count - a.count);
  return results;
}

const stats = getFolderStats();
console.log('=== TOTAL FOLDERS & HTML FILE COUNTS IN public/ ===');
let total = 0;
stats.forEach(s => {
  console.log(`${s.folder.padEnd(20)}: ${s.count} pages`);
  total += s.count;
});

const rootHtml = fs.readdirSync(publicDir).filter(f => f.endsWith('.html')).length;
console.log(`${'root (public/*.html)'.padEnd(20)}: ${rootHtml} pages`);
total += rootHtml;
console.log(`\nGrand Total HTML files in public/: ${total}`);

