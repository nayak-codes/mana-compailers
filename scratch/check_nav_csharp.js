const fs = require('fs');
const nav = fs.readFileSync('public/site-nav.js', 'utf8');
console.log('Includes /blog-csharp.html:', nav.includes('/blog-csharp.html'));
const matches = nav.match(/csharp/g) || [];
console.log('csharp matches count in site-nav.js:', matches.length);

