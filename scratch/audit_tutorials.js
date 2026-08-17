const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

function scanDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      results = results.concat(scanDir(full));
    } else if (file.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      const text = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const words = text.split(' ').filter(Boolean).length;
      const relPath = path.relative(publicDir, full);
      results.push({
        path: relPath,
        size: stat.size,
        words: words,
        hasSchema: content.includes('application/ld+json'),
        hasTryIt: content.includes('try-btn') || content.includes('run-btn') || content.includes('Try It'),
        hasSidebar: content.includes('sidebar'),
      });
    }
  }
  return results;
}

const audit = scanDir(publicDir);
console.log('Total HTML pages:', audit.length);
const shortPages = audit.filter(p => p.words < 400);
console.log('Short pages (< 400 words):', shortPages.length);
console.log('Pages without Schema.org:', audit.filter(p => !p.hasSchema).length);
console.log('Sample of short pages:', shortPages.slice(0, 15));
