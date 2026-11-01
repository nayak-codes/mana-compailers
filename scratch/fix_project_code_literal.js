const fs = require('fs');
let s = fs.readFileSync('scratch/build_cpp_chapter11_deep.js', 'utf8');

s = s.replace("const projectCode = \\'#include", "const projectCode = \\`#include");
s = s.replace("}\\';", "}\\`;");

fs.writeFileSync('scratch/build_cpp_chapter11_deep.js', s, 'utf8');
console.log('Fixed projectCode template literal');

