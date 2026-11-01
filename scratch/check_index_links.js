const fs = require('fs');
const content = fs.readFileSync('public/blog-c.html', 'utf8');

console.log('Links in blog-c.html:');
const matches = content.match(/href="[^"]*(?:18|19|20)-c-[^"]*"/g);
console.log(matches);
