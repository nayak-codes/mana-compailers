/**
 * scan_badges.js
 * Get all badge content from all HTML files to understand what should be correct.
 */
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const badgeSet = new Set();
const labelSet = new Set();
const spanSet = new Set();
const navBtnSet = new Set();

for (const f of files) {
  const content = fs.readFileSync(path.join(publicDir, f), 'utf8');
  
  // All badge spans
  const badges = content.match(/<span class="badge">[^<]*<\/span>/g) || [];
  for (const b of badges) badgeSet.add(b);

  // Nav footer labels  
  const labels = content.match(/<span class="label">[^<]+<\/span>/g) || [];
  for (const l of labels) labelSet.add(l);
  
  // Breadcrumb spans
  const spans = content.match(/<span>[^<]+<\/span>/g) || [];
  for (const s of spans) spanSet.add(s);
  
  // section-title divs  
  const navbtns = content.match(/<div class="section-title">[\s\S]*?<\/div>/g) || [];
  for (const n of navbtns) navBtnSet.add(n.trim());
}

console.log('=== BADGES ===');
[...badgeSet].sort().forEach(b => console.log(JSON.stringify(b)));

console.log('\n=== NAV LABELS ===');
[...labelSet].sort().forEach(b => {
  if (/[â€ðŸÂ►←→]/.test(b)) console.log(JSON.stringify(b));
});

console.log('\n=== BREADCRUMB SPANS ===');
[...spanSet].sort().forEach(b => {
  if (/[â€ðŸÂ►←→]/.test(b)) console.log(JSON.stringify(b));
});

console.log('\n=== SECTION TITLES ===');
[...navBtnSet].sort().forEach(b => {
  if (/[â€ðŸÂ►←→]/.test(b)) console.log(JSON.stringify(b.substring(0,100)));
});
