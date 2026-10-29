const fs = require('fs');
const path = require('path');

const files = [
  'public/blog-cpp.html',
  ...fs.readdirSync('public/blog-cpp')
    .filter(f => f.endsWith('.html'))
    .map(f => path.join('public/blog-cpp', f))
];

let updatedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace theme check in head
  content = content.replace(
    /const currentTheme = localStorage\.getItem\('theme'\);/g,
    "const currentTheme = localStorage.getItem('tutorial_theme');"
  );
  content = content.replace(
    /var savedTheme = localStorage\.getItem\('theme'\);/g,
    "var savedTheme = localStorage.getItem('tutorial_theme');"
  );
  content = content.replace(
    /localStorage\.getItem\('theme'\) \|\| 'dark'/g,
    "localStorage.getItem('tutorial_theme') || 'light'"
  );

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
  }
}

console.log(`Updated theme detection in ${updatedCount} files.`);

