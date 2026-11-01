const fs = require('fs');

const targetFile = process.argv[2] || 'scratch/build_cpp_chapter13_deep.js';
console.log('Processing:', targetFile);

let lines = fs.readFileSync(targetFile, 'utf8').split('\n');

let startIdx = lines.findIndex(l => l.includes('Content = `'));
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

fs.writeFileSync(targetFile, code, 'utf8');
console.log('Done cleaning backticks in', targetFile);
