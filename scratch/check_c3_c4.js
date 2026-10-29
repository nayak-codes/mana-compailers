const fs = require('fs');
const code = fs.readFileSync('scratch/upgrade_c_phase1.js', 'utf8');

const idx3 = code.indexOf('3: `');
const idx4 = code.indexOf('4: `');
console.log('Chapter 3 starts at:', idx3);
console.log('Chapter 4 starts at:', idx4);
console.log('Chapter 3 content (first 1000 chars):');
console.log(code.substring(idx3, idx3 + 1000));
console.log('---');
console.log('Chapter 4 content (first 1000 chars):');
console.log(code.substring(idx4, idx4 + 1000));

