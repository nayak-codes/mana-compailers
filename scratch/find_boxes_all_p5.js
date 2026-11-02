const fs = require('fs');
const path = require('path');

const chs = [21, 22, 23, 24, 25];
chs.forEach(c => {
  const f = path.join(__dirname, `build_python_chapter${c}_deep.js`);
  if (!fs.existsSync(f)) return;
  const s = fs.readFileSync(f, 'utf8');
  const lines = s.split('\n');
  console.log(`\n=== CHAPTER ${c} ===`);
  lines.forEach((line, i) => {
    if (line.includes('background:#0f172a') || line.includes('class="code-block"')) {
      console.log(`  Line ${i + 1}: ${line.trim().slice(0, 75)}`);
    }
  });
});

