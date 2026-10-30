const fs = require('fs');

const files = [
  '01-csharp-introduction-and-setup.html',
  '02-csharp-variables-data-types-and-var.html',
  '03-csharp-user-input-type-casting-parsing.html',
  '04-csharp-operators-and-expressions.html'
];

files.forEach(f => {
  const content = fs.readFileSync('public/blog-csharp/' + f, 'utf8');
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

