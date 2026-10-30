const fs = require('fs');
const path = require('path');

const cCss = fs.readFileSync('public/blog-c/style.css', 'utf8');
const csharpCss = cCss.replace(/lang-c/g, 'lang-csharp').replace(/C Master Tutorial/g, 'C# Master Tutorial');

fs.writeFileSync('public/blog-csharp/style.css', csharpCss, 'utf8');
console.log('✅ Synchronized public/blog-csharp/style.css with Emerald Green theme!');

