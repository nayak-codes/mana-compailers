const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./csharp_curriculum_data.js');
const { generatePageHtml } = require('./csharp_page_template.js');

const csharpDir = path.join(__dirname, '../public/blog-csharp');

if (!fs.existsSync(csharpDir)) {
  fs.mkdirSync(csharpDir, { recursive: true });
}

console.log('Generating 20 canonical lesson files in public/blog-csharp/...');

LESSONS.forEach(l => {
  const filePath = path.join(csharpDir, l.file);
  const html = generatePageHtml(l);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ Created Chapter ${l.num < 10 ? '0' + l.num : l.num}: ${l.file}`);
});

console.log('\nAll 20 canonical C# lesson files generated successfully!');

