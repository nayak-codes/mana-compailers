const fs = require('fs');

const files = [
  { name: 'blog-python.html', teluguKeywords: ['తెలుగు', 'స్వాగతం', 'పైథాన్'] },
  { name: 'blog-java.html', teluguKeywords: ['తెలుగు', 'స్వాగతం', 'జావా'] },
  { name: 'blog-javascript.html', teluguKeywords: ['తెలుగు', 'స్వాగతం', 'జావాస్క్రిప్ట్'] },
  { name: 'blog-html.html', teluguKeywords: ['తెలుగు'] }
];

let allPassed = true;

files.forEach(f => {
  const content = fs.readFileSync('public/' + f.name, 'utf8');
  const foundKeywords = f.teluguKeywords.filter(k => content.includes(k));
  const hasOrange = /#f97316|#ea580c/i.test(content);
  const hasYellow = /#f7df1e|#eab308/i.test(content);
  const hasGreen = content.includes('#10b981');

  console.log(`[${f.name}]`);
  console.log(`  - Telugu Keywords: ${foundKeywords.length}/${f.teluguKeywords.length} (${foundKeywords.join(', ')})`);
  console.log(`  - Has Emerald Green (#10b981): ${hasGreen}`);
  console.log(`  - Has Orange: ${hasOrange}`);
  console.log(`  - Has Yellow: ${hasYellow}`);

  if (foundKeywords.length === 0 || !hasGreen) {
    allPassed = false;
  }
});

console.log('Verification Status:', allPassed ? 'ALL PASSED! 🎉' : 'CHECK FAILED!');
process.exit(allPassed ? 0 : 1);

