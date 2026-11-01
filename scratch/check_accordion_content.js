const fs = require('fs');
const content = fs.readFileSync('public/blog-c/style.css', 'utf8');

const idx = content.indexOf('.accordion-content');
console.log(content.slice(idx, idx + 800));

