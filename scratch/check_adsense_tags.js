const fs = require('fs');
const path = require('path');

function scan(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) res = res.concat(scan(p));
    else if (f.endsWith('.html')) res.push(p);
  });
  return res;
}

let files = scan(path.join(__dirname, '..', 'public'));
files.push(path.join(__dirname, '..', 'index.html'));

let metaCount = 0;
let scriptCount = 0;
let bothCount = 0;
let neitherCount = 0;
let neitherList = [];

files.forEach(f => {
  let s = fs.readFileSync(f, 'utf8');
  let hasMeta = s.includes('ca-pub-7028247458903242') && s.includes('google-adsense-account');
  let hasScript = s.includes('pagead2.googlesyndication.com');
  
  if (hasMeta) metaCount++;
  if (hasScript) scriptCount++;
  if (hasMeta && hasScript) bothCount++;
  if (!hasMeta && !hasScript) {
    neitherCount++;
    neitherList.push(f);
  }
});

console.log('Total HTML files:', files.length);
console.log('Files with Meta Tag:', metaCount);
console.log('Files with Script Tag:', scriptCount);
console.log('Files with Both:', bothCount);
console.log('Files with Neither:', neitherCount);
if (neitherList.length > 0) {
  console.log('Sample neither files:', neitherList.slice(0, 10));
}

