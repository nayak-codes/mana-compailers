const fs = require('fs');
const content = fs.readFileSync('public/blog-csharp.html', 'utf8');

const regex = /<a href="\/blog-csharp\/([^"]+)" class="lesson-link[^"]*">\s*<span class="lesson-num">(\d+)\.<\/span>\s*<span class="lesson-name">([^<]+)<\/span>/g;
let match;
let list = [];
while ((match = regex.exec(content)) !== null) {
  list.push({ num: parseInt(match[2]), file: match[1], name: match[3].trim() });
}
console.log('Total extracted lessons:', list.length);
list.forEach(l => console.log(`${l.num}. [${l.file}] -> ${l.name}`));

