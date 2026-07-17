/**
 * scan_broken.js
 * Scans all public HTML files and reports every unique broken character pattern found.
 */
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const brokenSet = new Set();

for (const f of files) {
  const content = fs.readFileSync(path.join(publicDir, f), 'utf8');
  
  // Find all badge spans
  const badgeMatches = content.match(/<span class="badge">[^<]*<\/span>/g) || [];
  for (const m of badgeMatches) {
    brokenSet.add('BADGE: ' + JSON.stringify(m));
  }
  
  // Find breadcrumb spans with broken chars
  const spans = content.match(/<span>[^<]*<\/span>/g) || [];
  for (const m of spans) {
    if (/[â€ðŸÂ]/.test(m)) {
      brokenSet.add('SPAN: ' + JSON.stringify(m));
    }
  }
  
  // Find nav-footer labels with broken chars
  const labels = content.match(/<span class="label">[^<]*<\/span>/g) || [];
  for (const m of labels) {
    if (/[â€ðŸÂ]/.test(m)) {
      brokenSet.add('LABEL: ' + JSON.stringify(m));
    }
  }

  // Meta description broken chars
  const metaDesc = content.match(/content="[^"]*â[^"]*"/g) || [];
  for (const m of metaDesc) {
    brokenSet.add('META: ' + JSON.stringify(m.substring(0, 80)));
  }

  // sidebar broken
  const sidebarLinks = content.match(/<a href="[^"]*">[^<]*â[^<]*<\/a>/g) || [];
  for (const m of sidebarLinks) {
    brokenSet.add('SIDEBAR: ' + JSON.stringify(m.substring(0, 80)));
  }

  // section-title broken
  const titles = content.match(/<div class="section-title">[^<]*<span class="num">[^<]*<\/span>[^<]*<\/div>/g) || [];
  for (const m of titles) {
    if (/[â€ðŸÂ]/.test(m)) {
      brokenSet.add('TITLE: ' + JSON.stringify(m));
    }
  }
}

console.log('=== ALL UNIQUE BROKEN PATTERNS FOUND ===\n');
const sorted = [...brokenSet].sort();
for (const s of sorted) {
  console.log(s);
}
console.log('\nTotal unique patterns:', sorted.length);
