const fs = require('fs');

const cCss = fs.readFileSync('public/blog-c/style.css', 'utf8');
const csCss = fs.readFileSync('public/blog-csharp/style.css', 'utf8');

console.log('C style.css length:', cCss.length);
console.log('C# style.css length:', csCss.length);

