const fs = require('fs');
const content = fs.readFileSync('public/blog-csharp.html', 'utf8');

// Find all chapters in blog-csharp.html
const cardRegex = /<a[^>]+href="\/blog-csharp\/([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
let match;
let lessons = [];
while ((match = cardRegex.exec(content)) !== null) {
  const file = match[1];
  const inner = match[2];
  if (file === 'style.css') continue;

  const titleMatch = inner.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i) || inner.match(/<div class="card-title">([\s\S]*?)<\/div>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : file;
  lessons.push({ file, title });
}

// Deduplicate
const seen = new Set();
const unique = [];
for (const l of lessons) {
  if (!seen.has(l.file)) {
    seen.add(l.file);
    unique.push(l);
  }
}

console.log('Found', unique.length, 'lessons:');
unique.forEach((u, i) => console.log(`${i+1}. ${u.file} -> ${u.title}`));

