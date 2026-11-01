const fs = require('fs');
const c16Builder = fs.readFileSync('scratch/build_c_chapter16_deep.js', 'utf8');

const marker = 'const fullHtml = `';
const idx = c16Builder.indexOf(marker);
console.log(c16Builder.slice(idx, idx + 800));

