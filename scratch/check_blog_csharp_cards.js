const fs = require('fs');
const content = fs.readFileSync('public/blog-csharp.html', 'utf8');

const mainStart = content.indexOf('<main');
const mainContent = content.slice(mainStart);

const phaseSections = mainContent.match(/<div class="phase-section"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g) || [];
console.log('Phase sections found:', phaseSections.length);
if (phaseSections.length === 0) {
  // Let's find h2 or cards inside main
  const h2s = mainContent.match(/<h2[^>]*>[\s\S]*?<\/h2>/g) || [];
  console.log('H2s:', h2s);
  const cards = mainContent.match(/<a class="lesson-card"[\s\S]*?<\/a>/g) || mainContent.match(/<div class="lesson-card"[\s\S]*?<\/div>/g) || [];
  console.log('Cards found:', cards.length);
  if (cards.length > 0) {
    console.log('Sample card 1:', cards[0]);
  }
}

