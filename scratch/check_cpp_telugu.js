const fs = require('fs');
const path = require('path');

const cppFiles = fs.readdirSync('public/blog-cpp').filter(f => f.endsWith('.html')).slice(0, 10);
cppFiles.forEach(f => {
  const s = fs.readFileSync(path.join('public/blog-cpp', f), 'utf8');
  const teluguCount = (s.match(/[\u0C00-\u0C7F]/g) || []).length;
  console.log(`blog-cpp/${f} -> Telugu chars: ${teluguCount}, Total: ${s.length}`);
});

