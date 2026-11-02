const fs = require('fs');
const content = fs.readFileSync('scratch/build_java_chapter21_deep.js', 'utf8');

const mainIdx = content.indexOf('<main');
console.log('--- Main in build_java_chapter21_deep.js ---');
console.log(content.slice(mainIdx - 50, mainIdx + 150));

const codeIdx = content.indexOf('class="code-block"');
console.log('--- Code block in build_java_chapter21_deep.js ---');
console.log(content.slice(codeIdx - 50, codeIdx + 450));

