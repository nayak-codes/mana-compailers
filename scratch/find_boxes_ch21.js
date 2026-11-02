const fs = require('fs');
const path = require('path');
const s = fs.readFileSync(path.join(__dirname, 'build_python_chapter21_deep.js'), 'utf8');
const lines = s.split('\n');
lines.forEach((line, i) => {
  if (line.includes('background:#0f172a') || line.includes('class="code-block"')) {
    console.log(`Line ${i + 1}: ${line.trim().slice(0, 80)}`);
  }
});
