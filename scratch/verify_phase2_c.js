const fs = require('fs');

const files = [
  '05-c-if-else-conditionals.html',
  '06-c-switch-case-decision-making.html',
  '07-c-loops-while-do-while-for.html',
  '08-c-break-continue-nested-loops.html'
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

