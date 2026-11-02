const fs = require('fs');
const css = fs.readFileSync('public/blog-style.css', 'utf8');
const tokens = ['.kw', '.st', '.cm', '.fn', '.vr'];
tokens.forEach(t => {
  const idx = css.indexOf(t);
  console.log(t, idx !== -1 ? css.slice(idx, idx + 80) : 'not found');
});
