const fs = require('fs');
const content = fs.readFileSync('scratch/build_java_chapter21_deep.js', 'utf8');
console.log('Does build_java_chapter21_deep.js have main class content?', content.includes('<main class="content">'));
console.log('Does build_java_chapter21_deep.js have margin 0 auto?', content.includes('margin:0 auto') || content.includes('margin: 0 auto'));
console.log('Does build_java_chapter21_deep.js have pre code?', content.includes('<pre><code') || content.includes('<pre><code>'));
console.log('Does build_java_chapter21_deep.js have color:#0f172a?', content.includes('color:#0f172a'));

