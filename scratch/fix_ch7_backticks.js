const fs = require('fs');

const file = 'scratch/build_html_chapter7_deep.js';
let lines = fs.readFileSync(file, 'utf8').split('\n');

let changes = 0;
for (let i = 8; i < 411; i++) {
  if (lines[i].includes('`')) {
    console.log(`Fixing line ${i + 1}: ${lines[i]}`);
    // Replace unescaped backticks with <code> or sanitized text
    // If it's `something` let's replace ` with <code>...</code> or '\`'
    lines[i] = lines[i].replace(/`([^`]+)`/g, '<code>$1</code>');
    // If any single stray backtick remains, replace with \`
    lines[i] = lines[i].replace(/`/g, '\\`');
    changes++;
  }
}

console.log(`Made fixes in ${changes} lines.`);
fs.writeFileSync(file, lines.join('\n'), 'utf8');
