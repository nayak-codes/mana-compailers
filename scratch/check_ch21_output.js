const fs = require('fs');
const c21 = fs.readFileSync('public/blog-java/21-java-collections-list-arraylist-linkedlist.html', 'utf8');

const idx = c21.indexOf('code-output');
console.log(c21.slice(idx - 20, idx + 400));
