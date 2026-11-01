const fs = require('fs');
const content = fs.readFileSync('public/blog-csharp/03-csharp-user-input-type-casting-parsing.html', 'utf8');
const mainEnd = content.lastIndexOf('</main>');
console.log(content.substring(mainEnd, mainEnd + 250));
console.log('--- SCRIPT PART ---');
const scriptIndex = content.indexOf('<script>', mainEnd);
console.log(content.substring(scriptIndex, scriptIndex + 400));

