const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./cpp_curriculum_data.js');

for (let i = 0; i < 9; i++) {
  const l = LESSONS[i];
  const file = path.join(__dirname, '..', 'public', 'blog-cpp', l.file);
  const content = fs.readFileSync(file, 'utf8');
  const hasPageTitle = content.includes('class="page-title"');
  const hasPageMeta = content.includes('class="page-meta"');
  const hasSubtopicsBar = content.includes('📌 Covered in this chapter:');
  const hasSection1 = content.includes('<!-- SECTION 1 -->');
  console.log(`Ch ${l.num}: ${l.file}`, { hasPageTitle, hasPageMeta, hasSubtopicsBar, hasSection1 });
}
