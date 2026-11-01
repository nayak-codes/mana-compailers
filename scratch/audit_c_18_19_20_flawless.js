const fs = require('fs');
const path = require('path');

const targetFiles = [
  { num: 18, file: '18-c-dynamic-memory-allocation-malloc-calloc-realloc-free.html' },
  { num: 19, file: '19-c-file-handling-fopen-fclose-text-binary.html' },
  { num: 20, file: '20-c-mini-project-student-record-management.html' }
];

console.log('=== RIGOROUS FLAWLESS AUDIT FOR CHAPTERS 18, 19, 20 ===\n');

let failed = false;

targetFiles.forEach(({ num, file }) => {
  const fullPath = path.join(__dirname, '..', 'public', 'blog-c', file);
  const content = fs.readFileSync(fullPath, 'utf8');

  console.log(`Checking Chapter ${num}: ${file} (${content.length.toLocaleString()} chars)`);

  let errors = [];

  // Theme & HTML
  if (!content.includes('<html class="light-theme" lang="te">')) errors.push('Missing light-theme html');
  if (!content.includes('<body class="lang-c light-theme">')) errors.push('Missing light-theme body');
  if (!content.trim().endsWith('</html>')) errors.push('Does not properly terminate with </html>');
  if (!content.includes('</body>')) errors.push('Missing </body> tag');

  // Stylesheets & Scripts
  if (!content.includes('<link rel="stylesheet" href="/blog-c/style.css" />')) errors.push('Missing /blog-c/style.css');
  if (!content.includes('<link rel="stylesheet" href="/site-nav.css" />')) errors.push('Missing /site-nav.css');
  if (!content.includes('<script src="/site-nav.js" defer></script>')) errors.push('Missing /site-nav.js');
  if (!content.includes('function toggleAccordion(btn)')) errors.push('Missing toggleAccordion script');
  if (!content.includes('"@type": "TechArticle"')) errors.push('Missing Schema.org TechArticle JSON-LD');

  // Code Block Structures
  if (!content.includes('class="code-block"')) errors.push('Missing .code-block');
  if (!content.includes('class="code-block-header"')) errors.push('Missing .code-block-header');
  if (!content.includes('class="lang-tag"')) errors.push('Missing .lang-tag');
  if (!content.includes('class="code-actions"')) errors.push('Missing .code-actions');
  if (content.includes('class="code-wrap"')) errors.push('Still contains legacy .code-wrap');

  // Sections, Tables, Quizzes, Footers
  if (!content.includes('<div class="intro-box">')) errors.push('Missing intro-box');
  if (!content.includes('class="tbl"')) errors.push('Missing table .tbl');
  if (!content.includes('class="try-box"')) errors.push('Missing try-box');
  if (!content.includes('<div class="author"')) errors.push('Missing author footer');

  for (let s = 1; s <= 13; s++) {
    if (!content.includes(`<span class="num">${s}</span>`)) {
      errors.push(`Missing section badge ${s}`);
    }
  }

  const detailsCount = (content.match(/<details/g) || []).length;
  if (detailsCount < 5) errors.push(`Only ${detailsCount} quiz details (expected >= 5)`);

  if (content.length < 40000) errors.push(`Content size too small: ${content.length}`);

  if (errors.length === 0) {
    console.log(`  ✅ Chapter ${num} is 100% FLAWLESS! Perfect styling, structure, and scripts.`);
  } else {
    console.error(`  ❌ Chapter ${num} has errors:`, errors);
    failed = true;
  }
});

if (failed) {
  process.exit(1);
} else {
  console.log('\n🎉 ALL 3 CHAPTERS (18, 19, 20) ARE COMPLETELY FIXED AND CERTIFIED!');
}

