const fs = require('fs');
let c = fs.readFileSync('scratch/rewrite_c_8_to_13.js', 'utf8');
c = c.replace(/\\\`/g, '`');
fs.writeFileSync('scratch/rewrite_c_8_to_13.js', c);
