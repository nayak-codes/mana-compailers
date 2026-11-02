const fs = require('fs');
const path = require('path');

const pyFiles = [
  'blog-python/01-python-introduction-and-setup.html',
  'blog-python/02-python-syntax-indentation-and-comments.html',
  'blog-python/03-python-variables-data-types-and-naming.html',
  'blog-python/05-python-operators-and-expressions.html',
  'blog-python/10-python-regular-expressions-regex.html',
  'blog-python/20-python-file-handling-and-context-managers.html',
  'blog-python/25-python-capstone-project.html'
];

pyFiles.forEach(rel => {
  const p = path.join(__dirname, '..', 'public', rel);
  if (!fs.existsSync(p)) {
    console.log('Not found:', rel);
    return;
  }
  const s = fs.readFileSync(p, 'utf8');
  const teluguCount = (s.match(/[\u0C00-\u0C7F]/g) || []).length;
  console.log(`${rel} -> Telugu Unicode chars: ${teluguCount}, Total chars: ${s.length}`);
});

