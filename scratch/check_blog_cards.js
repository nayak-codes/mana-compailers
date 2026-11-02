const fs = require('fs');
const s = fs.readFileSync('public/blog.html', 'utf8');
const cardMatches = [...s.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Courses featured on blog.html:');
console.log(cardMatches);

