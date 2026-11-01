const fs = require('fs');

let lines = fs.readFileSync('scratch/build_cpp_chapter12_deep.js', 'utf8').split('\n');

let startIdx = lines.findIndex(l => l.startsWith('const chapter12Content = `'));
let endIdx = lines.findIndex((l, i) => i > startIdx && l.startsWith('const outputPath = '));

console.log('startIdx:', startIdx, 'endIdx:', endIdx);

for (let i = startIdx + 1; i < endIdx - 2; i++) {
  let line = lines[i];
  if (line.includes('const projectCode = `') || line.includes('const projectCode = \\`')) {
    continue;
  }
  if (line.includes('}\`;') || line.includes("}';")) {
    continue;
  }
  if (line.includes('`')) {
    lines[i] = line.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/`/g, "'");
    console.log(`Fixed line ${i + 1}: ${lines[i].trim().slice(0, 70)}`);
  }
}

let code = lines.join('\n');
code = code.replace("const projectCode = \\'#include", "const projectCode = \\`#include");
code = code.replace("const projectCode = '#include", "const projectCode = \\`#include");
code = code.replace("}\\';", "}\\`;");
code = code.replace("}';", "}\\`;");

fs.writeFileSync('scratch/build_cpp_chapter12_deep.js', code, 'utf8');
console.log('Done cleaning backticks in Chapter 12!');

