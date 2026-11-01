const fs = require('fs');
const c17Builder = fs.readFileSync('scratch/build_c_chapter17_deep.js', 'utf8');

const marker = 'const fullHtml = `';
const idx = c17Builder.indexOf(marker);
console.log(c17Builder.slice(idx));
