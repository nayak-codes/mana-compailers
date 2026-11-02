const fs = require('fs');
const files = [
  '21-python-exception-handling.html',
  '22-python-oop-classes-and-objects.html',
  '23-python-oop-inheritance-polymorphism.html',
  '24-python-decorators-generators-dunder.html',
  '25-python-capstone-project.html'
];
files.forEach(f => {
  const s = fs.readFileSync('public/blog-python/' + f, 'utf8');
  const cb = (s.match(/class="code-block"/g) || []).length;
  const db = (s.match(/background:#0f172a/g) || []).length;
  console.log(f.padEnd(45), '=> code-blocks:', cb, 'dark-boxes:', db, 'chars:', s.length);
});
