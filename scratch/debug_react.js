const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

for (const f of files) {
  const content = fs.readFileSync(path.join(publicDir, f), 'utf8');
  // Check for the broken React badge variant
  if (content.includes('\u26DB\uFE0F') || [...content].some((c, i) => {
    // Look for ⚛ (U+26DB) followed by ï (U+00EF)
    return c.codePointAt(0) === 0x26DB && content[content.indexOf(c)+1] && content[content.indexOf(c)+1].codePointAt(0) === 0xEF;
  })) {
    // Find the badge
    const badges = content.match(/<span class="badge">[^<]*<\/span>/g) || [];
    for (const b of badges) {
      if (/\u26DB/.test(b) || /ï¸/.test(b)) {
        const pts = [...b].map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase());
        console.log(f + ': ' + JSON.stringify(b));
        console.log('  Codepoints: ' + pts.join(' '));
      }
    }
  }
}
