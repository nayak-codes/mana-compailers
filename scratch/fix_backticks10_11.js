const fs = require('fs');

let c10 = fs.readFileSync('scratch/rewrite_c_part10.js', 'utf8');
c10 = c10.replace(/\\\`/g, '`');
fs.writeFileSync('scratch/rewrite_c_part10.js', c10);

let c11 = fs.readFileSync('scratch/rewrite_c_part11.js', 'utf8');
c11 = c11.replace(/\\\`/g, '`');
fs.writeFileSync('scratch/rewrite_c_part11.js', c11);
