const fs = require('fs');
const content = fs.readFileSync('public/blog-csharp.html', 'utf8');

// Find all links to blog-csharp/
const linkRegex = /href="\/blog-csharp\/([^"]+)"/g;
let match;
let links = [];
while ((match = linkRegex.exec(content)) !== null) {
  links.push(match[1]);
}
const uniqueLinks = [...new Set(links)];
console.log('Total unique chapter links in blog-csharp.html:', uniqueLinks.length);
uniqueLinks.forEach((l, idx) => console.log(`${idx + 1}. ${l}`));

