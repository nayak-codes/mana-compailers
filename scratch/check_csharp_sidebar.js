const fs = require('fs');
const content = fs.readFileSync('public/blog-csharp/01-csharp-introduction-and-setup.html', 'utf8');

const asideStart = content.indexOf('<aside');
const asideEnd = content.indexOf('</aside>') + 8;
console.log(content.slice(asideStart, asideEnd));

