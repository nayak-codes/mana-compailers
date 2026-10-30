const fs = require('fs');

const files = [
  '17-c-structures-unions-and-typedef.html',
  '18-c-dynamic-memory-allocation-malloc-calloc-realloc-free.html',
  '19-c-file-handling-fopen-fclose-text-binary.html',
  '20-c-mini-project-student-record-management.html'
];

files.forEach(f => {
  const content = fs.readFileSync('public/blog-c/' + f, 'utf8');
  console.log('=== ' + f + ' ===');
  console.log('Length:', content.length, 'chars');
  console.log('Has site-nav.js:', content.includes('site-nav.js'));
  console.log('html class:', content.match(/<html[^>]*>/i)?.[0]);
  console.log('body class:', content.match(/<body[^>]*>/i)?.[0]);
  console.log('ASCII box chars (┌, │, └):', /[┌│└─┐┘├┤┬┴┼]/.test(content));
  const titles = content.match(/<div class="section-title">[\s\S]*?<\/div>/g) || [];
  console.log('Section titles count:', titles.length);
  titles.forEach(t => console.log('  ', t.replace(/<[^>]+>/g, '').trim()));
  console.log('---');
});

