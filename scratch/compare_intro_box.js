const fs = require('fs');

const cCss = fs.readFileSync('public/blog-c/style.css', 'utf8');
const csCss = fs.readFileSync('public/blog-csharp/style.css', 'utf8');

function extractClass(css, className) {
  const idx = css.indexOf(className);
  if (idx === -1) return 'NOT FOUND';
  return css.slice(idx, idx + 400);
}

console.log('--- C style.css (.intro-box) ---');
console.log(extractClass(cCss, '.intro-box'));

console.log('--- C# style.css (.intro-box) ---');
console.log(extractClass(csCss, '.intro-box'));

