const fs = require('fs');
const s = fs.readFileSync('public/blog-angular/01-what-is-angular.html', 'utf8');
const pMatches = [...s.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(p => p.length > 50);
console.log('Sample paragraphs from blog-angular/01-what-is-angular.html:');
pMatches.slice(0, 5).forEach((p, i) => console.log(`[${i+1}] ${p}\n`));

