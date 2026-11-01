const fs = require('fs');
const content = fs.readFileSync('public/blog-csharp.html', 'utf8');

const mainIdx = content.indexOf('<main');
const mainContent = content.slice(mainIdx);

const m12 = mainContent.indexOf('12-csharp');
console.log('Main Ch 12:');
console.log(mainContent.slice(m12 - 300, m12 + 200));

const m18 = mainContent.indexOf('18-csharp');
console.log('Main Ch 18:');
console.log(mainContent.slice(m18 - 300, m18 + 200));

