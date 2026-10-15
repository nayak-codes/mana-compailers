const fs = require('fs');
let c = fs.readFileSync('scratch/rewrite_c_part2.js', 'utf8');
c = c.replace(/\\\`/g, '`');
fs.writeFileSync('scratch/rewrite_c_part2.js', c);
