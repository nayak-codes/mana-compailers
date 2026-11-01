const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'blog-csharp', '01-csharp-introduction-and-setup.html');
const content = fs.readFileSync(filePath, 'utf8');

console.log('Verifying C# Chapter 01:');
console.log('File size:', content.length, 'characters');

let errors = [];

// 1. Check light theme
if (!content.includes('<html class="light-theme" lang="te">')) {
  errors.push('Missing light-theme on <html>');
}
if (!content.includes('<body class="lang-csharp light-theme">')) {
  errors.push('Missing light-theme on <body>');
}

// 2. Check intro box
if (!content.includes('<div class="intro-box">')) {
  errors.push('Missing intro-box');
}

// 3. Check 13 section titles with span.num
for (let i = 1; i <= 13; i++) {
  const pattern = `<span class="num">${i}</span>`;
  if (!content.includes(pattern)) {
    errors.push(`Missing section title number ${i}`);
  }
}

// 4. Check table
if (!content.includes('class="tbl"')) {
  errors.push('Missing comparison table with class="tbl"');
}

// 5. Check try-box
if (!content.includes('class="try-box"')) {
  errors.push('Missing try-box');
}

// 6. Check interactive quiz details/summary
const detailsCount = (content.match(/<details/g) || []).length;
if (detailsCount < 5 || !content.includes('<summary')) {
  errors.push(`Expected at least 5 details tags, found ${detailsCount}`);
}

// 7. Check code blocks and runner
if (!content.includes("localStorage.setItem('code_csharp', rawCode)")) {
  errors.push('Missing local storage runner code in script');
}
if (!content.includes('/online-csharp-compiler.html')) {
  errors.push('Missing /online-csharp-compiler.html links');
}

// 8. Check styling and scripts
if (!content.includes('/blog-csharp/style.css')) {
  errors.push('Missing /blog-csharp/style.css');
}
if (!content.includes('/site-nav.css')) {
  errors.push('Missing /site-nav.css');
}
if (!content.includes('<script src="/site-nav.js" defer></script>')) {
  errors.push('Missing /site-nav.js');
}
if (!content.includes('function toggleAccordion(btn)')) {
  errors.push('Missing toggleAccordion function');
}

// 9. Check footer and proper closing
if (!content.includes('<div class="author"')) {
  errors.push('Missing author footer');
}
if (!content.trim().endsWith('</html>')) {
  errors.push('File does not end with </html>');
}

// 10. Check length > 40000
if (content.length < 40000) {
  errors.push(`Content length (${content.length}) is below 40,000 threshold`);
}

if (errors.length === 0) {
  console.log('✅ All checks passed successfully for C# Chapter 01!');
} else {
  console.error('❌ Verification errors found:', errors);
  process.exit(1);
}

