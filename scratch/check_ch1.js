const fs = require('fs');
const c1 = fs.readFileSync('public/blog-java/01-java-introduction-features-and-jvm-architecture.html', 'utf8');
const idx = c1.indexOf('class="code-block"');
console.log(c1.slice(idx, idx + 1000));

