const fs = require('fs');
const c20 = fs.readFileSync('public/blog-java/20-java-exception-handling-and-custom-exceptions.html', 'utf8');

const cbIdx = c20.indexOf('class="code-block"');
console.log('--- Ch 20 code block ---');
console.log(c20.slice(cbIdx, cbIdx + 500));

const outIdx = c20.indexOf('code-output');
console.log('--- Ch 20 code output ---');
console.log(c20.slice(outIdx - 20, outIdx + 300));

