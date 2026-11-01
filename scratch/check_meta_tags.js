const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./csharp_curriculum_data');

for (let i = 2; i < 12; i++) {
  const file = LESSONS[i].file;
  const filePath = path.join(__dirname, '..', 'public', 'blog-csharp', file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const keywMatch = content.match(/<meta\s+name=["']keywords["']\s+content=["']([\s\S]*?)["']/i);
  
  console.log(`Ch ${i+1}:`);
  console.log(`   title: ${titleMatch ? titleMatch[1] : 'NONE'}`);
  console.log(`   desc : ${descMatch ? descMatch[1].substring(0, 80) : 'NONE'}...`);
}
