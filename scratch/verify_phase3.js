const fs = require('fs');
const path = require('path');

const files = [
  "09-csharp-methods-parameters-ref-out-in.html",
  "10-csharp-strings-stringbuilder-and-text-processing.html",
  "11-csharp-arrays-1d-multidimensional-jagged.html",
  "12-csharp-collections-and-generics-list-dict.html"
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

console.log("Phase 3 All Passed:", allPassed);
process.exit(allPassed ? 0 : 1);

