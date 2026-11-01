const fs = require('fs');
const content = fs.readFileSync('public/blog-csharp.html', 'utf8');

const regex = /<a[^>]+href="\/blog-csharp\/01-csharp[^"]*"[^>]*>([\s\S]*?)<\/a>/i;
const match = content.match(regex);
if (match) {
  console.log(match[0]);
} else {
  console.log('not found');
}

