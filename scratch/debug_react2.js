const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

// Search for any badge with non-standard chars
for (const f of files) {
  const content = fs.readFileSync(path.join(publicDir, f), 'utf8');
  const badges = content.match(/<span class="badge">[^<]*<\/span>/g) || [];
  for (const b of badges) {
    // Check if badge has any non-ASCII chars that might be broken
    const nonAscii = [...b].filter(c => c.codePointAt(0) > 127);
    const hasAtomsymbol = [...b].some(c => c === '\u269B');
    if (hasAtomsymbol) {
      const pts = [...b].map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase() + '(' + JSON.stringify(c) + ')');
      console.log(f + ': ' + JSON.stringify(b));
      console.log('  All chars: ' + pts.join(' '));
    }
  }
}
