const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./csharp_curriculum_data');

for (let i = 2; i < 12; i++) {
  const file = LESSONS[i].file;
  const filePath = path.join(__dirname, '..', 'public', 'blog-csharp', file);
  if (!fs.existsSync(filePath)) {
    console.log(`Ch ${i+1}: NOT FOUND`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  
  const hasPageLayout = content.includes('<div class="page-layout">');
  const hasOldSiteNav = content.includes('<div id="site-nav"><header class="site-header">');
  const hasAsideIdSidebar = content.includes('<aside class="sidebar" id="sidebar">');
  const mainStart = content.indexOf('<main class="content">');
  const mainEnd = content.indexOf('</main>');

  console.log(`Ch ${i+1 < 10 ? '0' + (i+1) : (i+1)} (${file}):`);
  console.log(`   page-layout: ${hasPageLayout}`);
  console.log(`   old-site-nav: ${hasOldSiteNav}`);
  console.log(`   aside-id-sidebar: ${hasAsideIdSidebar}`);
  console.log(`   mainStart: ${mainStart !== -1}, mainEnd: ${mainEnd !== -1}`);
}

