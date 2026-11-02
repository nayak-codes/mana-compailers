const fs = require('fs');
const s = fs.readFileSync('public/blog.html', 'utf8');
const links = [...s.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
console.log('All links in blog.html:');
console.log([...new Set(links)]);

