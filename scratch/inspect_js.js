const fs = require('fs');
const js = fs.readFileSync('public/blog-javascript/destructuring-spread.html', 'utf8');
const idx = js.indexOf('class="code-block"');
console.log('--- JS Code Block HTML ---');
console.log(js.slice(idx, idx + 1000));
