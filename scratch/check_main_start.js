const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./csharp_curriculum_data');

for (let i = 2; i < 12; i++) {
  const file = LESSONS[i].file;
  const filePath = path.join(__dirname, '..', 'public', 'blog-csharp', file);
  const content = fs.readFileSync(filePath, 'utf8');
  const mainStart = content.indexOf('<main class="content">');
  const snippet = content.substring(mainStart, mainStart + 350);
  console.log(`=== Ch ${i+1} (${file}) main start ===`);
  console.log(snippet);
}

