const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./csharp_curriculum_data');

for (let i = 2; i < 12; i++) {
  const file = LESSONS[i].file;
  const filePath = path.join(__dirname, '..', 'public', 'blog-csharp', file);
  const content = fs.readFileSync(filePath, 'utf8');
  const mainEnd = content.lastIndexOf('</main>');
  const afterMain = content.substring(mainEnd);
  
  // Find scripts
  const scripts = [];
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(afterMain)) !== null) {
    scripts.push(match[1]);
  }
  
  console.log(`Ch ${i+1}: Found ${scripts.length} script block(s) after main.`);
  scripts.forEach((s, idx) => {
    console.log(`   Script ${idx+1} length: ${s.length}, has openInteractiveCompiler: ${s.includes('openInteractiveCompiler')}`);
  });
}
