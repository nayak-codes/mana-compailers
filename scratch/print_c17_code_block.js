const fs = require('fs');
const c17 = fs.readFileSync('public/blog-c/17-c-structures-unions-and-typedef.html', 'utf8');

const start = c17.indexOf('<div class="code-block"');
console.log(c17.slice(start, start + 600));

