const fs = require('fs');
const path = require('path');

const javaDir = path.join(__dirname, '..', 'public', 'blog-java');
const files = fs.readdirSync(javaDir).filter(f => f.endsWith('.html'));

const brokenLinks = new Set();
const allFoundHrefs = new Set();

files.forEach(f => {
  const content = fs.readFileSync(path.join(javaDir, f), 'utf8');
  const matches = [...content.matchAll(/href="\/blog-java\/([^"#]+)"/g)].map(m => m[1]);
  matches.forEach(m => {
    allFoundHrefs.add(m);
    // check if target exists
    const targetFile = m.endsWith('.html') ? m : m + '.html';
    if (!fs.existsSync(path.join(javaDir, targetFile))) {
      brokenLinks.add(m);
    }
  });
});

console.log('Total unique /blog-java/ hrefs found:', allFoundHrefs.size);
console.log('Broken / missing hrefs on disk count:', brokenLinks.size);
console.log('List of broken links:');
console.log([...brokenLinks]);

