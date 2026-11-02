const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

function scan(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) res = res.concat(scan(p));
    else if (f.endsWith('.html')) res.push(p);
  });
  return res;
}

const allFiles = scan(publicDir);
const teluguFiles = [];
const nonTeluguFiles = [];

allFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Check if it contains Telugu characters in the body/content
  const bodyMatch = content.match(/<body[\s\S]*?<\/body>/i);
  const text = bodyMatch ? bodyMatch[0] : content;
  const teluguChars = (text.match(/[\u0C00-\u0C7F]/g) || []).length;

  const rel = path.relative(publicDir, f);
  if (teluguChars > 100) {
    teluguFiles.push({ file: rel, teluguChars });
  } else {
    nonTeluguFiles.push({ file: rel, teluguChars });
  }
});

console.log('Total HTML files:', allFiles.length);
console.log('Files with substantial Telugu script (>100 chars):', teluguFiles.length);
console.log('Files without Telugu script (English/Telenglish):', nonTeluguFiles.length);

// Group nonTeluguFiles by top-level folder
const nonTeluguByFolder = {};
nonTeluguFiles.forEach(item => {
  const folder = item.file.includes(path.sep) ? item.file.split(path.sep)[0] : 'root';
  nonTeluguByFolder[folder] = (nonTeluguByFolder[folder] || 0) + 1;
});

console.log('\nNon-Telugu files by folder:');
console.log(nonTeluguByFolder);

// Group teluguFiles by top-level folder
const teluguByFolder = {};
teluguFiles.forEach(item => {
  const folder = item.file.includes(path.sep) ? item.file.split(path.sep)[0] : 'root';
  teluguByFolder[folder] = (teluguByFolder[folder] || 0) + 1;
});

console.log('\nTelugu files by folder:');
console.log(teluguByFolder);

