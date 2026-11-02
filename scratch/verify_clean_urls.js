const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

function getLinksFromHtml(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const s = fs.readFileSync(filePath, 'utf8');
  const matches = [...s.matchAll(/href="([^"#?]+)"/g)].map(m => m[1]);
  return [...new Set(matches)];
}

const courses = [
  { name: 'Java', hub: 'blog-java.html', index: 'blog-java/index.html', prefix: '/blog-java/' },
  { name: 'Python', hub: 'blog-python.html', index: 'blog-python/index.html', prefix: '/blog-python/' },
  { name: 'C++', hub: 'blog-cpp.html', index: 'blog-cpp/index.html', prefix: '/blog-cpp/' },
  { name: 'C', hub: 'blog-c.html', index: 'blog-c/index.html', prefix: '/blog-c/' },
  { name: 'C#', hub: 'blog-csharp.html', index: 'blog-csharp/index.html', prefix: '/blog-csharp/' },
  { name: 'JavaScript', hub: 'blog-javascript.html', index: 'blog-javascript/index.html', prefix: '/blog-javascript/' },
  { name: 'HTML', hub: 'blog-html.html', index: 'blog-html/index.html', prefix: '/blog-html/' }
];

let allChapterUrls = [];

courses.forEach(c => {
  const hubLinks = getLinksFromHtml(path.join(publicDir, c.hub)).filter(l => l.includes(c.prefix.replace('/', '')));
  const indexLinks = getLinksFromHtml(path.join(publicDir, c.index)).filter(l => l.includes(c.prefix.replace('/', '')));
  const all = [...new Set([...hubLinks, ...indexLinks])].filter(l => l.endsWith('.html') && !l.endsWith('index.html'));
  
  all.forEach(link => {
    let clean = link.startsWith('/') ? link.slice(1) : link;
    const fullPath = path.join(publicDir, clean);
    if (!fs.existsSync(fullPath)) {
      console.error(`MISSING: ${clean}`);
    } else {
      allChapterUrls.push('/' + clean);
    }
  });
});

console.log(`Verified ${allChapterUrls.length} chapter URLs on disk.`);

