const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/blog-ruby.html');
const html = fs.readFileSync(filePath, 'utf8');

// Split by <h2>[digit]. [Title]</h2>
const parts = html.split(/<h2>(\d+)\.\s*([\s\S]*?)<\/h2>/i);

console.log("Number of parts:", parts.length);
console.log("Intro part (first 300 chars):");
console.log(parts[0].substring(0, 300));

for (let i = 1; i < parts.length; i += 3) {
  const num = parts[i];
  const title = parts[i+1];
  const content = parts[i+2];
  console.log(`\n--- SECTION ${num}: ${title} ---`);
  console.log(content ? content.substring(0, 200) : "EMPTY");
}
