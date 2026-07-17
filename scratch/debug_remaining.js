const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

for (const f of files) {
  const content = fs.readFileSync(path.join(publicDir, f), 'utf8');
  const badges = content.match(/<span class="badge">[^<]*<\/span>/g) || [];
  for (const b of badges) {
    const hasElephant = [...b].some(c => c.codePointAt(0) === 0x1F418);
    if (hasElephant) {
      const chars = [...b];
      const pts = chars.map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase()).join(' ');
      console.log(f + ': ' + JSON.stringify(b.substring(0,40)));
      console.log('  Codepoints: ' + pts);
    }
  }
}
