const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./csharp_curriculum_data');

for (let i = 0; i < 12; i++) {
  const file = LESSONS[i].file;
  const filePath = path.join(__dirname, '..', 'public', 'blog-csharp', file);
  if (!fs.existsSync(filePath)) {
    console.log(`Ch ${i+1}: FILE NOT FOUND: ${file}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`Ch ${i+1 < 10 ? '0' + (i+1) : (i+1)} (${file}):`);
  console.log(`   blog-style.css: ${content.includes('blog-style.css')}`);
  console.log(`   site-header: ${content.includes('site-header')}`);
  console.log(`   div.layout: ${content.includes('class="layout"')}`);
  console.log(`   div.page-layout: ${content.includes('class="page-layout"')}`);
  console.log(`   site-nav-placeholder: ${content.includes('site-nav-placeholder')}`);
}
