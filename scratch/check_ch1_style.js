const fs = require('fs');
const c1 = fs.readFileSync('public/blog-java/01-java-introduction-features-and-jvm-architecture.html', 'utf8');

const styleMatch = c1.match(/<style>[\s\S]*?<\/style>/g);
console.log('Number of <style> tags in Ch 1:', styleMatch ? styleMatch.length : 0);
if (styleMatch) {
  styleMatch.forEach((s, idx) => {
    console.log(`Style tag ${idx + 1} includes code-header:`, s.includes('code-header'));
    console.log(`Style tag ${idx + 1} includes file-name:`, s.includes('file-name'));
    console.log(`Style tag ${idx + 1} length:`, s.length);
  });
}
