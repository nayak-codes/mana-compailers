const fs = require('fs');
const path = require('path');
const { LESSONS, buildJavaSidebar } = require('./java_curriculum_data.js');

console.log('=== UPDATING TELUGU SIDEBAR IN ALL 25 JAVA CHAPTERS ===\n');

let updatedCount = 0;
let errors = [];

LESSONS.forEach(l => {
  const filePath = path.join(__dirname, '..', 'public', 'blog-java', l.file);
  if (!fs.existsSync(filePath)) {
    errors.push(`File missing: ${l.file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const sidebarRegex = /<aside class="sidebar">[\s\S]*?<\/aside>/;
  
  if (!sidebarRegex.test(content)) {
    errors.push(`Sidebar tag not found in ${l.file}`);
    return;
  }

  const newSidebar = buildJavaSidebar(l.num);
  const updatedContent = content.replace(sidebarRegex, newSidebar);

  if (updatedContent.length < 45000) {
    errors.push(`Length check failed for ${l.file}: ${updatedContent.length} < 45000`);
    return;
  }

  fs.writeFileSync(filePath, updatedContent, 'utf8');
  updatedCount++;
  console.log(`✅ Ch ${String(l.num).padStart(2, '0')}: Updated Telugu Sidebar (${updatedContent.length.toLocaleString()} chars)`);
});

console.log(`\n🏁 Done! Updated ${updatedCount} / ${LESSONS.length} chapters.`);
if (errors.length > 0) {
  console.error('❌ Errors encountered:');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
}
