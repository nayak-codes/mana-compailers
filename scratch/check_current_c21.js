const fs = require('fs');
const c21 = fs.readFileSync('public/blog-java/21-java-collections-list-arraylist-linkedlist.html', 'utf8');
console.log('Does c21 have margin:0 auto?', c21.includes('margin:0 auto') || c21.includes('margin: 0 auto'));
console.log('Does c21 have main class content?', c21.includes('<main class="content">'));
console.log('Does c21 have pre code?', c21.includes('<pre><code') || c21.includes('<pre><code>'));
console.log('Does c21 have darkPreText?', c21.includes('color:#0f172a') || c21.includes('color: #0f172a'));

