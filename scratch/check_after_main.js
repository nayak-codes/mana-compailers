const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./csharp_curriculum_data');

for (let i = 2; i < 12; i++) {
  const file = LESSONS[i].file;
  const filePath = path.join(__dirname, '..', 'public', 'blog-csharp', file);
  const content = fs.readFileSync(filePath, 'utf8');
  const mainEnd = content.lastIndexOf('</main>');
  const afterMain = content.substring(mainEnd);
  console.log(`=== Ch ${i+1} (${file}) afterMain (first 300 chars) ===`);
  console.log(afterMain.substring(0, 300));
}
