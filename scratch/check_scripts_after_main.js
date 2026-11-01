const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./csharp_curriculum_data');

for (let i = 2; i < 12; i++) {
  const file = LESSONS[i].file;
  const filePath = path.join(__dirname, '..', 'public', 'blog-csharp', file);
  const content = fs.readFileSync(filePath, 'utf8');
  const mainEnd = content.lastIndexOf('</main>');
  const afterMain = content.substring(mainEnd + 7);
  console.log(`=== Ch ${i+1} (${file}) afterMain length: ${afterMain.length} ===`);
  // Check if it has openInteractiveCompiler
  console.log(`   has openInteractiveCompiler: ${afterMain.includes('openInteractiveCompiler')}`);
  console.log(`   has copyCode: ${afterMain.includes('copyCode')}`);
  console.log(`   has runCode: ${afterMain.includes('runCode')}`);
}
