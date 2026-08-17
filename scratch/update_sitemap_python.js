const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
let s = fs.readFileSync(sitemapPath, 'utf8');

const pythonDir = path.join(__dirname, '..', 'public', 'blog-python');
const files = fs.readdirSync(pythonDir).filter(f => f.endsWith('.html'));

let added = 0;
files.forEach(f => {
  const url = `https://www.ourcompiler.com/blog-python/${f}`;
  if (!s.includes(url)) {
    const entry = `  <url>\n    <loc>${url}</loc>\n    <lastmod>2026-08-14</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    s = s.replace('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + entry);
    added++;
  }
});

fs.writeFileSync(sitemapPath, s, 'utf8');
console.log(`✅ Added ${added} new Python tutorial lesson URLs to sitemap.xml`);
