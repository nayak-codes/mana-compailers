const fs = require('fs');
const path = require('path');

const cppCss = fs.readFileSync(path.join(__dirname, '../public/blog-cpp/style.css'), 'utf8');
const cCss = cppCss.replace(/C\+\+/g, 'C').replace(/cpp/g, 'c');

fs.writeFileSync(path.join(__dirname, '../public/blog-c/style.css'), cCss, 'utf8');
console.log('✅ Synchronized public/blog-c/style.css with emerald green theme');

