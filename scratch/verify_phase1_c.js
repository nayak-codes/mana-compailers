const fs = require('fs');

const files = [
  'public/blog-c/01-c-introduction-and-hello-world.html',
  'public/blog-c/02-c-variables-data-types-constants.html',
  'public/blog-c/03-c-user-input-scanf-format-specifiers.html',
  'public/blog-c/04-c-operators-and-expressions.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f + ' ===');
  console.log('Length:', content.length, 'chars');
  console.log('Has site-nav.js:', content.includes('site-nav.js'));
  console.log('html class:', content.match(/<html[^>]*>/i)?.[0]);
  console.log('body class:', content.match(/<body[^>]*>/i)?.[0]);
  console.log('ASCII box chars (┌, │, └):', /[┌│└─┐┘├┤┬┴┼]/.test(content));
  const codeBlocks = (content.match(/<pre[^>]*>/g) || []).length;
  console.log('Pre/code blocks count:', codeBlocks);
  const headings = content.match(/<h[23][^>]*>.*?<\/h[23]>/g) || [];
  console.log('Headings count:', headings.length);
  headings.forEach(h => console.log('  ', h.replace(/<[^>]+>/g, '')));
  console.log('');
});

