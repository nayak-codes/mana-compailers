const fs = require('fs');
const content = fs.readFileSync('public/blog-csharp.html', 'utf8');

const mainIdx = content.indexOf('<main');
const mainContent = content.slice(mainIdx);

const m12 = mainContent.indexOf('12-csharp');
console.log('Main Ch 12 title area:');
console.log(mainContent.slice(m12 - 500, m12));

const m18 = mainContent.indexOf('18-csharp');
console.log('Main Ch 18 title area:');
console.log(mainContent.slice(m18 - 500, m18));

