const fs = require('fs');
const content = fs.readFileSync('public/blog-csharp.html', 'utf8');

const mainStart = content.indexOf('<main');
const mainEnd = content.indexOf('</main>');
console.log(content.slice(mainStart, mainStart + 2500));

