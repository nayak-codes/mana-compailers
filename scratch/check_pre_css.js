const fs = require('fs');
const css = fs.readFileSync('public/blog-style.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, i) => {
  if (l.includes('pre code') || l.includes('.code-block pre') || l.includes('pre {')) {
    console.log(i + 1, l);
    for (let j = Math.max(0, i - 2); j < Math.min(lines.length, i + 8); j++) {
      console.log('  ', j + 1, lines[j]);
    }
  }
});

