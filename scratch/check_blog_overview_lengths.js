const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.startsWith('blog-') && f.endsWith('.html') && !f.includes('lesson-style'));

console.log(`Checking word counts of ${files.length} tutorial index pages:\n`);

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Measure total text inside main or body
  const textOnly = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                        .replace(/<[^>]+>/g, ' ')
                        .replace(/\s+/g, ' ')
                        .trim();
  
  const words = textOnly.split(' ').filter(Boolean).length;
  console.log(`${file.padEnd(30)} — Total Words: ${words} | File Size: ${(content.length / 1024).toFixed(1)}KB`);
});
