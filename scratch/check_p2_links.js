const fs = require('fs');
const index = fs.readFileSync('public/blog-c.html', 'utf8');
const p2Matches = index.match(/href="\/blog-c\/0[5-8][^"]*"/g);
console.log('Phase 2 links in blog-c.html:');
console.log(p2Matches);

