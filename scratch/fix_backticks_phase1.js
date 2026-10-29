const fs = require('fs');

let code = fs.readFileSync('scratch/upgrade_phase1_cpp.js', 'utf8');

// Replace problematic unescaped backticks in template literals
// Specifically `auto`
code = code.replace(/`auto`/g, '\\`auto\\`');
code = code.replace(/`nullptr`/g, '\\`nullptr\\`');
code = code.replace(/`cin`/g, '\\`cin\\`');
code = code.replace(/`cout`/g, '\\`cout\\`');

fs.writeFileSync('scratch/upgrade_phase1_cpp.js', code, 'utf8');
console.log('Fixed backticks.');

