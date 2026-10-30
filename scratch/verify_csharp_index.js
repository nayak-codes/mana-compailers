const fs = require('fs');
const { LESSONS, PHASES } = require('./csharp_curriculum_data.js');

const html = fs.readFileSync('public/blog-csharp.html', 'utf8');

console.log('--- Verifying public/blog-csharp.html ---');
console.log('Length:', html.length, 'chars');
console.log('html class:', html.match(/<html[^>]*>/i)?.[0]);
console.log('body class:', html.match(/<body[^>]*>/i)?.[0]);
console.log('Has site-nav.js:', html.includes('site-nav.js'));
console.log('ASCII box chars:', /[┌│└─┐┘├┤┬┴┼]/.test(html));

let missingInRoadmap = 0;
LESSONS.forEach(l => {
  if (!html.includes(l.file)) {
    console.error(`Missing link: ${l.file}`);
    missingInRoadmap++;
  }
});
console.log('Missing lesson links count:', missingInRoadmap);

const purpleMatches = html.match(/#8b5cf6|purple/gi) || [];
console.log('Purple occurrences:', purpleMatches.length);

const greenMatches = html.match(/#10b981/gi) || [];
console.log('Emerald green #10b981 occurrences:', greenMatches.length);

console.log('Phases count in HTML:', PHASES.filter(p => html.includes(p.tag)).length);
