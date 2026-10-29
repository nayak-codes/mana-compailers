const fs = require('fs');
const code = fs.readFileSync('scratch/upgrade_c_phase1.js', 'utf8');

const idx1 = code.indexOf('1: `');
const idx2 = code.indexOf('2: `');
console.log('Chapter 1 length:', idx2 - idx1);
console.log('Chapter 2 length:', code.indexOf('3: `') - idx2);

