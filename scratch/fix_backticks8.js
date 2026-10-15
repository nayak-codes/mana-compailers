const fs = require('fs');
let c = fs.readFileSync('scratch/rewrite_c_part8.js', 'utf8');
c = c.replace(/\\\`/g, '`');
fs.writeFileSync('scratch/rewrite_c_part8.js', c);
