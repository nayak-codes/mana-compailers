const fs = require('fs');

const files = [
  '13-c-arrays-1d-and-2d-matrices.html',
  '14-c-strings-character-arrays-string-h.html',
  '15-c-pointers-basics-and-address-arithmetic.html',
  '16-c-pointers-with-arrays-and-double-pointers.html'
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

