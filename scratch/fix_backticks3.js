const fs = require('fs');
let c = fs.readFileSync('scratch/rewrite_c_part3.js', 'utf8');
c = c.replace(/\\\`/g, '`');
fs.writeFileSync('scratch/rewrite_c_part3.js', c);
