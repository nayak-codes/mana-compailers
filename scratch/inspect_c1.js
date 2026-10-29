const fs = require('fs');
const html = fs.readFileSync('public/blog-cpp/01-cpp-introduction-and-hello-world.html', 'utf8');
const mainIdx = html.indexOf('<main class="content">');
const endMainIdx = html.indexOf('</main>');
console.log('--- START OF MAIN ---');
console.log(html.slice(mainIdx, mainIdx + 400));
console.log('--- END OF MAIN ---');
console.log(html.slice(endMainIdx - 400, endMainIdx + 10));
