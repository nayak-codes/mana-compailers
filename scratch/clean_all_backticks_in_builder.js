const fs = require('fs');

let lines = fs.readFileSync('scratch/build_cpp_chapter11_deep.js', 'utf8').split('\n');

// Line 7 is const chapter11Content = `...
// Let's find where the closing ` is:
let startIdx = lines.findIndex(l => l.startsWith('const chapter11Content = `'));
let endIdx = lines.findIndex((l, i) => i > startIdx && l.startsWith('const outputPath = '));

console.log('startIdx:', startIdx, 'endIdx:', endIdx);

// In between startIdx and endIdx, there is the closing backtick of chapter11Content.
// The closing backtick is at lines[endIdx - 2] roughly (`;\n`).
// Inside the template literal, there is also:
// const projectCode = \`...
// which ends with \`;
// Any other backticks in HTML text must be converted to <code>...</code> or escaped!

for (let i = startIdx + 1; i < endIdx - 2; i++) {
  let line = lines[i];
  if (line.includes('const projectCode = `')) {
    // inside openInteractiveCompiler, keep \`
    continue;
  }
  if (line.includes('}\`;')) {
    // projectCode closing, keep \`
    continue;
  }
  if (line.includes('`')) {
    // replace `something` with <code>something</code>
    lines[i] = line.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/`/g, "'");
    console.log(`Fixed line ${i + 1}: ${lines[i].trim().slice(0, 70)}`);
  }
}

fs.writeFileSync('scratch/build_cpp_chapter11_deep.js', lines.join('\n'), 'utf8');
console.log('Finished cleaning backticks in Chapter 11 builder!');
