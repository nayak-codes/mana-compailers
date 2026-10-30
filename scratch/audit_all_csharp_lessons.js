const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./csharp_curriculum_data.js');

const dir = path.join(__dirname, '..', 'public', 'blog-csharp');
let totalChars = 0;
let allPassed = true;

console.log("=== COMPREHENSIVE AUDIT OF ALL 20 C# TUTORIAL LESSONS ===");

LESSONS.forEach(l => {
  const filePath = path.join(dir, l.file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ MISSING FILE: ${l.file}`);
    allPassed = false;
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  totalChars += content.length;

  const hasBox = /[┌┐└┘├┤┬┴┼─│═║╔╗╚╝╠╣╦╩╬]/.test(content);
  const hasLightHtml = content.includes('<html class="light-theme" lang="te">');
  const hasLightBody = content.includes('<body class="lang-csharp light-theme">');
  const hasSiteNav = content.includes('<script src="/site-nav.js" defer></script>');
  const hasCompiler = content.includes('/online-csharp-compiler.html');
  const isSufficientLength = content.length >= 22000;

  const status = !hasBox && hasLightHtml && hasLightBody && hasSiteNav && hasCompiler && isSufficientLength;
  if (!status) {
    allPassed = false;
    console.log(`❌ Lesson ${l.num.toString().padStart(2, '0')}: ${l.file} (${content.length} chars) - Box: ${hasBox}, LightHtml: ${hasLightHtml}, LightBody: ${hasLightBody}, Nav: ${hasSiteNav}, Compiler: ${hasCompiler}`);
  } else {
    console.log(`✅ Lesson ${l.num.toString().padStart(2, '0')}: ${l.file} (${content.length.toLocaleString()} chars)`);
  }
});

console.log("---------------------------------------------------------");
console.log(`Total C# Tutorial Characters across 20 chapters: ${totalChars.toLocaleString()} chars`);
console.log(`Overall Health Status: ${allPassed ? "ALL 20 CHAPTERS PASS PERFECTLY! 🚀" : "AUDIT FAILED!"}`);
process.exit(allPassed ? 0 : 1);

