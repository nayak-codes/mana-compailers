const fs = require('fs');
const files = fs.readdirSync('public/blog-c').filter(f => f.endsWith('.html'));
files.sort();
console.log('Total html files in public/blog-c:', files.length);
files.forEach(f => {
  const stat = fs.statSync('public/blog-c/' + f);
  console.log(`${f.padEnd(65, ' ')} | ${stat.size} bytes`);
});

