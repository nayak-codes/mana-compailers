const fs = require('fs');
const path = require('path');

const sampleFiles = [
  'blog-go/01-what-is-go.html',
  'blog-php/01-php-introduction-and-setup.html',
  'blog-mysql/01-database-fundamentals.html',
  'blog-rest-api/01-what-is-an-api.html',
  'blog-rust/01-rust-introduction-and-setup.html',
  'blog-django/01-what-is-django.html',
  'blog-git/01-what-is-version-control.html'
];

sampleFiles.forEach(rel => {
  const full = path.join(__dirname, '..', 'public', rel);
  if (!fs.existsSync(full)) {
    console.log('Not found:', rel);
    return;
  }
  const content = fs.readFileSync(full, 'utf8');
  // Check for Telugu characters (\u0C00-\u0C7F)
  const hasTelugu = /[\u0C00-\u0C7F]/.test(content);
  // Extract text from inside <article> or <main>
  const match = content.match(/<article[\s\S]*?<\/article>/i) || content.match(/<main[\s\S]*?<\/main>/i);
  const snippet = match ? match[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 300) : 'No main/article';
  console.log(`\n--- [${rel}] ---`);
  console.log(`Has Telugu chars: ${hasTelugu}`);
  console.log(`Sample text: ${snippet}`);
});

