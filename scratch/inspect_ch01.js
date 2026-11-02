const fs = require('fs');
const s = fs.readFileSync('public/blog-java/01-java-introduction-features-and-jvm-architecture.html', 'utf8');
const cb = (s.match(/class="code-block"/g) || []).length;
const db = (s.match(/background:#0f172a/g) || []).length;
const pre = (s.match(/<pre>/g) || []).length;
console.log('Chars:', s.length);
console.log('code-blocks:', cb);
console.log('dark-boxes:', db);
console.log('pre tags:', pre);
