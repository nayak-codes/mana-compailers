const fs = require('fs');

const targetFile = process.argv[2];
if (!targetFile) {
  console.error('Please specify target file');
  process.exit(1);
}

const content = fs.readFileSync(targetFile, 'utf8');
const lines = content.split('\n');

let inProjectCode = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  if (line.includes('const projectCode = `') || line.includes('const projectCode = \\`')) {
    inProjectCode = true;
    continue;
  }
  if (inProjectCode) {
    if (line.includes('`;') || line.includes('\\`;')) {
      inProjectCode = false;
    }
    continue;
  }

  // If outside projectCode, and not the first/last template literal boundary
  if (line.includes('chapter') && line.includes('Content = `')) continue;
  if (line.trim() === '`;') continue;

  if (line.includes('`')) {
    // replace `code` with <code>code</code>
    lines[i] = line.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/`/g, "'");
  }
}

fs.writeFileSync(targetFile, lines.join('\n'), 'utf8');
console.log('Cleaned backticks in', targetFile);
