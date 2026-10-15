const fs = require('fs');
let content = fs.readFileSync('scratch/rewrite_c_lessons.js', 'utf8');
content = content.replace(/\\\$\{/g, '${');
fs.writeFileSync('scratch/rewrite_c_lessons.js', content);
