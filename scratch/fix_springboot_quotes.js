const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'build_springboot_lessons.js');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/INTERVAL[\s\\'\"]*7\s+days[\s\\'\"]*/gi, "INTERVAL &#39;7 days&#39;");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Patched build_springboot_lessons.js successfully.');
