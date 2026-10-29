const fs = require('fs');

const files = [
  '01-c-introduction-and-hello-world.html',
  '02-c-variables-data-types-constants.html',
  '03-c-user-input-scanf-format-specifiers.html',
  '04-c-operators-and-expressions.html'
];

files.forEach(f => {
  const content = fs.readFileSync('public/blog-c/' + f, 'utf8');
  const titles = content.match(/<div class="section-title">[\s\S]*?<\/div>/g) || [];
  console.log(f, 'has', titles.length, 'section titles:');
  titles.forEach(t => console.log('  ', t.replace(/<[^>]+>/g, '').trim()));
  console.log('---');
});

