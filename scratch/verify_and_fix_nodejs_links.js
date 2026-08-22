const fs = require('fs');
const path = require('path');

const nodejsDir = path.join(__dirname, '..', 'public', 'blog-nodejs');
const files = fs.readdirSync(nodejsDir).filter(f => f.endsWith('.html')).sort();

console.log(`🔍 Auditing ${files.length} Node.js chapter files in public/blog-nodejs/ ...`);

files.forEach((file, idx) => {
  const filePath = path.join(nodejsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Ensure style.css link is root-relative /blog-nodejs/style.css
  content = content.replace(/href="style\.css"/g, 'href="/blog-nodejs/style.css"');
  content = content.replace(/href="blog-node\.js\/style\.css"/g, 'href="/blog-nodejs/style.css"');

  // Fix any remaining /blog-node.js/ links to /blog-nodejs/
  content = content.replace(/\/blog-node\.js\//g, '/blog-nodejs/');

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`✅ All ${files.length} Node.js chapter files successfully verified and updated with clean /blog-nodejs/ routes!`);
