const fs = require('fs');
const path = require('path');

const phase5Files = [
  '17-c-structures-unions-and-typedef.html',
  '18-c-dynamic-memory-allocation-malloc-calloc-realloc-free.html',
  '19-c-file-handling-fopen-fclose-text-binary.html',
  '20-c-mini-project-student-record-management.html'
];

console.log('=== PHASE 05 COMPREHENSIVE AUDIT (Chapters 17 to 20) ===\n');

let totalSize = 0;
let allPassed = true;

phase5Files.forEach((filename, idx) => {
  const chNum = 17 + idx;
  const filePath = path.join(__dirname, '..', 'public', 'blog-c', filename);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Chapter ${chNum} (${filename}) NOT FOUND!`);
    allPassed = false;
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  totalSize += content.length;

  let errors = [];

  if (content.length < 40000) errors.push(`Size ${content.length} < 40,000`);
  if (!content.includes('<html class="light-theme" lang="te">')) errors.push('Missing light-theme html');
  if (!content.includes('<body class="lang-c light-theme">')) errors.push('Missing light-theme body');
  if (!content.includes('<div class="intro-box">')) errors.push('Missing intro-box');
  if (!content.includes('class="tbl"')) errors.push('Missing table .tbl');
  if (!content.includes('class="try-box"')) errors.push('Missing try-box');
  if (!content.includes("localStorage.setItem('code_c', rawCode)")) errors.push('Missing code runner localStorage');

  for (let s = 1; s <= 13; s++) {
    if (!content.includes(`<span class="num">${s}</span>`)) {
      errors.push(`Missing section badge ${s}`);
    }
  }

  const detailsCount = (content.match(/<details/g) || []).length;
  if (detailsCount < 5) errors.push(`Only ${detailsCount} details tags (expected >= 5)`);

  if (errors.length === 0) {
    console.log(`✅ Chapter ${chNum}: ${filename} (${content.length.toLocaleString()} chars) - PERFECT!`);
  } else {
    console.error(`❌ Chapter ${chNum}: ${filename} (${content.length.toLocaleString()} chars) - ERRORS:`, errors);
    allPassed = false;
  }
});

console.log(`\nPhase 05 Total Characters: ${totalSize.toLocaleString()}`);

if (allPassed) {
  console.log('🎉 PHASE 05 AUDIT PASSED 100%!');
} else {
  console.error('❌ PHASE 05 AUDIT FAILED!');
  process.exit(1);
}

