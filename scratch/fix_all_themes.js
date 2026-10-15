const fs = require('fs');
const glob = require('glob');
const path = require('path');

const files = glob.sync('scratch/**/*.js');
let c = 0;
for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes("localStorage.getItem('theme') || 'light'")) {
    content = content.replace(/localStorage\.getItem\('theme'\)\s*\|\|\s*'dark'/g, "localStorage.getItem('theme') || 'light'");
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
    c++;
  }
}
console.log('Total fixed: ' + c);
