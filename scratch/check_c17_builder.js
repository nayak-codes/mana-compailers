const fs = require('fs');
const c17Builder = fs.readFileSync('scratch/build_c_chapter17_deep.js', 'utf8');

console.log('Builder size:', c17Builder.length);
console.log('--- FIRST 500 CHARS ---');
console.log(c17Builder.slice(0, 500));
console.log('--- LAST 1000 CHARS ---');
console.log(c17Builder.slice(-1000));

