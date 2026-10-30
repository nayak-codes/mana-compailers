const fs = require('fs');
const path = require('path');

const files = [
  "05-csharp-conditional-statements-and-pattern-matching.html",
  "06-csharp-switch-case-and-switch-expressions.html",
  "07-csharp-loops-for-while-do-while-foreach.html",
  "08-csharp-break-continue-and-nested-loops.html"
];

const dir = path.join(__dirname, '..', 'public', 'blog-csharp');
let allPassed = true;

files.forEach(f => {
  const filePath = path.join(dir, f);
  const content = fs.readFileSync(filePath, 'utf8');
  const hasBox = /[┌┐└┘├┤┬┴┼─│═║╔╗╚╝╠╣╦╩╬]/.test(content);
  const hasLightHtml = content.includes('<html class="light-theme" lang="te">');
  const hasLightBody = content.includes('<body class="lang-csharp light-theme">');
  const hasSiteNav = content.includes('<script src="/site-nav.js" defer></script>');
  const hasCompilerLink = content.includes('/online-csharp-compiler.html');
  const len = content.length;

  console.log(`${f} => Len: ${len}, Box: ${hasBox}, LightHtml: ${hasLightHtml}, LightBody: ${hasLightBody}, SiteNav: ${hasSiteNav}, Compiler: ${hasCompilerLink}`);
  if (hasBox || !hasLightHtml || !hasLightBody || !hasSiteNav || !hasCompilerLink || len < 20000) {
    allPassed = false;
  }
});

console.log("Phase 2 All Passed:", allPassed);
process.exit(allPassed ? 0 : 1);
