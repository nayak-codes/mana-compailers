const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const folders = fs.readdirSync(publicDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name.startsWith('blog-'))
  .map(d => d.name);

const stats = [];

folders.forEach(f => {
  const dirPath = path.join(publicDir, f);
  const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.html'));
  if (files.length === 0) return;

  let totalChars = 0;
  let minChars = Infinity;
  let maxChars = 0;
  let shortPages = 0; // < 15,000 chars

  files.forEach(file => {
    const content = fs.readFileSync(path.join(dirPath, file), 'utf8');
    const len = content.length;
    totalChars += len;
    if (len < minChars) minChars = len;
    if (len > maxChars) maxChars = len;
    if (len < 15000) shortPages++;
  });

  const avgChars = Math.round(totalChars / files.length);
  stats.push({
    folder: f,
    fileCount: files.length,
    avgChars,
    minChars,
    maxChars,
    shortPages
  });
});

stats.sort((a, b) => a.avgChars - b.avgChars);

console.log('=== BLOG FOLDERS CONTENT LENGTH AUDIT ===');
stats.forEach(s => {
  console.log(`${s.folder.padEnd(20)} | Files: ${String(s.fileCount).padStart(3)} | Avg: ${String(s.avgChars.toLocaleString()).padStart(7)} chars | Min: ${String(s.minChars.toLocaleString()).padStart(7)} | Short (<15k): ${s.shortPages}`);
});

