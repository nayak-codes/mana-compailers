const fs = require('fs');
const content = fs.readFileSync('public/blog-csharp.html', 'utf8');

const p1Idx = content.indexOf('⚡ C# ఫండమెంటల్స్ & బేసిక్స్');
console.log(content.slice(p1Idx - 200, p1Idx + 1500));

