const fs = require('fs');
const path = require('path');

const phase4Files = [
  '13-c-arrays-1d-and-2d-matrices.html',
  '14-c-strings-character-arrays-string-h.html',
  '15-c-pointers-basics-and-address-arithmetic.html',
  '16-c-pointers-with-arrays-and-double-pointers.html'
];

console.log('========================================');
console.log('🔍 AUDITING C MASTERCLASS - PHASE 04 (CHAPTERS 13-16)');
console.log('========================================\n');

let totalSize = 0;
let allPassed = true;

phase4Files.forEach((filename, idx) => {
  const chNum = idx + 13;
  const filePath = path.join(__dirname, '..', 'public', 'blog-c', filename);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File missing: ${filename}`);
    allPassed = false;
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  totalSize += content.length;
  let chErrors = [];

  // 1. Theme checks
  if (!content.includes('<html class="light-theme" lang="te">')) {
    chErrors.push('Missing light-theme on <html>');
  }
  if (!content.includes('<body class="lang-c light-theme">')) {
    chErrors.push('Missing light-theme on <body>');
  }

  // 2. Intro-box
  if (!content.includes('<div class="intro-box">')) {
    chErrors.push('Missing .intro-box');
  }

  // 3. 13 section titles with span.num
  for (let s = 1; s <= 13; s++) {
    if (!content.includes(`<span class="num">${s}</span>`)) {
      chErrors.push(`Missing section <span class="num">${s}</span>`);
    }
  }

  // 4. Comparison table
  if (!content.includes('class="tbl"')) {
    chErrors.push('Missing table .tbl');
  }

  // 5. Try box
  if (!content.includes('class="try-box"')) {
    chErrors.push('Missing .try-box');
  }

  // 6. Interactive quiz details & summary
  if (!content.includes('<details') || !content.includes('<summary')) {
    chErrors.push('Missing interactive quiz <details>/<summary>');
  }

  // 7. LocalStorage C runner
  if (!content.includes("localStorage.setItem('code_c', rawCode)")) {
    chErrors.push("Missing localStorage.setItem('code_c', rawCode)");
  }

  // 8. Size threshold
  if (content.length < 40000) {
    chErrors.push(`Size ${content.length} < 40000`);
  }

  if (chErrors.length === 0) {
    console.log(`✅ Chapter ${chNum.toString().padStart(2, '0')} (${filename}): ${content.length.toLocaleString()} chars — ALL PASSED`);
  } else {
    console.error(`❌ Chapter ${chNum.toString().padStart(2, '0')} (${filename}) FAILED:`, chErrors);
    allPassed = false;
  }
});

console.log('\n----------------------------------------');
console.log(`📊 Total Phase 04 Characters: ${totalSize.toLocaleString()} chars`);
console.log(`📈 Average per Chapter: ${Math.round(totalSize / phase4Files.length).toLocaleString()} chars`);
console.log('----------------------------------------');

if (allPassed) {
  console.log('🎉 PHASE 04 AUDIT 100% PASSED! All 4 chapters meet the highest textbook standards.');
} else {
  console.error('❌ PHASE 04 AUDIT FAILED.');
  process.exit(1);
}

