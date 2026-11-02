const fs = require('fs');
const css = fs.readFileSync('public/blog-java/style.css', 'utf8');
const idx = css.indexOf('.code-output-card');
console.log(css.slice(idx + 500, idx + 1000));

