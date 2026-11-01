const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'blog-csharp', '02-csharp-variables-data-types-and-var.html');
const content = fs.readFileSync(filePath, 'utf8');

console.log('Verifying C# Chapter 02:');
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
  errors.push("Missing localStorage.setItem('code_csharp', rawCode)");
}
if (!content.includes('/online-csharp-compiler.html')) {
  errors.push('Missing link to /online-csharp-compiler.html');
}

// 8. Check author footer
if (!content.includes('<div class="author"') || !content.includes('Our Compiler Technical Editorial Team')) {
  errors.push('Missing author card information');
}

// 9. Check length > 40,000
if (content.length < 40000) {
  errors.push(`File too short: ${content.length} characters (expected >= 40,000)`);
}

// 10. Check sidebar double numbering issue (e.g. "1. 1." or "2. 2.")
if (content.includes('>1. 1.') || content.includes('>2. 2.') || content.includes('>3. 3.')) {
  errors.push('Detected duplicate numbering in sidebar (e.g. "1. 1.")');
}

if (errors.length > 0) {
  console.error('❌ Verification failed:');
  errors.forEach(e => console.error(' - ' + e));
  process.exit(1);
} else {
  console.log('✅ All checks passed successfully for C# Chapter 02!');
}
