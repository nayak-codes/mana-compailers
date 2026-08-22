const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const vueDir = path.join(publicDir, 'blog-vue');
const vueIndex = path.join(publicDir, 'blog-vue.html');

const files = fs.readdirSync(vueDir).filter(f => f.endsWith('.html'));

console.log(`🔗 Linking /blog-vue/style.css to ${files.length} Vue chapter files and blog-vue.html...`);

files.forEach(file => {
  const filePath = path.join(vueDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('/blog-vue/style.css')) {
    content = content.replace(
      '<link rel="stylesheet" href="/blog-style.css" />',
      '<link rel="stylesheet" href="/blog-style.css" />\n  <link rel="stylesheet" href="/blog-vue/style.css" />'
    );
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

let indexContent = fs.readFileSync(vueIndex, 'utf8');
if (!indexContent.includes('/blog-vue/style.css')) {
  indexContent = indexContent.replace(
    '<link rel="stylesheet" href="/blog-style.css" />',
    '<link rel="stylesheet" href="/blog-style.css" />\n  <link rel="stylesheet" href="/blog-vue/style.css" />'
  );
  fs.writeFileSync(vueIndex, indexContent, 'utf8');
}

console.log('✅ Successfully linked /blog-vue/style.css across all Vue pages!');
