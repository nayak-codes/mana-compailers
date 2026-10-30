const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'blog-html', '09-html-semantic-elements-header-nav-main-footer.html');
const content = fs.readFileSync(filePath, 'utf8');

console.log('Verifying Chapter 9:');
console.log('File size:', content.length, 'bytes');

let errors = [];

// 1. Check light theme
if (!content.includes('<html class="light-theme" lang="te">')) {
  errors.push('Missing light-theme on <html>');
}
if (!content.includes('<body class="lang-html light-theme">')) {
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

// 4. Check .tbl
if (!content.includes('class="tbl"')) {
  errors.push('Missing comparison table with class="tbl"');
}

// 5. Check try-box
if (!content.includes('class="try-box"')) {
  errors.push('Missing try-box');
}

// 6. Check interactive quiz details/summary
if (!content.includes('<details') || !content.includes('<summary')) {
  errors.push('Missing details/summary interactive quiz');
}

// 7. Check code blocks and runner
if (!content.includes('localStorage.setItem(\'code_html\', rawCode)')) {
  errors.push('Missing local storage runner code in script');
}

// 8. Check nested <a> tags
const nestedA = content.match(/<a[^>]*>[^<]*<a/g);
if (nestedA) {
  errors.push(`Found nested <a> tags: ${nestedA.join(', ')}`);
}

if (errors.length === 0) {
  console.log('✅ All checks passed successfully for Chapter 9!');
} else {
  console.error('❌ Verification errors found:', errors);
  process.exit(1);
}
