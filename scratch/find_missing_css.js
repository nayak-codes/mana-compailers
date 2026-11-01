const fs = require('fs');

const cCss = fs.readFileSync('public/blog-c/style.css', 'utf8');
const csCss = fs.readFileSync('public/blog-csharp/style.css', 'utf8');

// Find all CSS rules in C that are not in C#
const cRules = cCss.split('}').map(r => r.trim()).filter(Boolean);
let missingInCs = [];

cRules.forEach(rule => {
  const selector = rule.split('{')[0].trim();
  if (selector && !csCss.includes(selector)) {
    missingInCs.push(selector);
  }
});

console.log('Selectors in C style.css missing in C# style.css:', missingInCs);

