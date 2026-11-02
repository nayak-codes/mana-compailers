const fs = require('fs');
const path = require('path');

const filesToCheck = [
  'blog-go/02-setting-up-go.html',
  'blog-rest-api/02-rest-architecture-constraints.html',
  'blog-springboot/01-what-is-spring-boot.html',
  'blog-mysql/02-relational-vs-nosql.html',
  'blog-angular/01-what-is-angular.html'
];

filesToCheck.forEach(rel => {
  const p = path.join(__dirname, '..', 'public', rel);
  if (!fs.existsSync(p)) return;
  const s = fs.readFileSync(p, 'utf8');
  // Check text content
  const text = s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  console.log(`\n=== ${rel} ===`);
  console.log(text.slice(0, 350));
});

