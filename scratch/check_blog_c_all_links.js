const fs = require('fs');
const content = fs.readFileSync('public/blog-c.html', 'utf8');

// Find all cards or links in blog-c.html
const cardRegex = /<a[^>]+href="([^"]+)"[^>]*>[\s\S]*?<\/a>/gi;
let match;
let list = [];
while ((match = cardRegex.exec(content)) !== null) {
  if (match[1].includes('blog-c/')) {
    list.push(match[1]);
  }
}
console.log('Unique blog-c links in blog-c.html:', [...new Set(list)]);
