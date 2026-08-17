const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
let s = fs.readFileSync(sitemapPath, 'utf8');

const chapters = [
  '01-python-introduction-features-and-setup.html',
  '02-python-syntax-indentation-and-comments.html',
  '03-python-variables-data-types-and-naming.html',
  '04-python-numbers-strings-and-type-conversion.html',
  '05-python-booleans-none-and-input-output.html',
  '06-python-operators-complete-guide.html',
  '07-python-conditional-statements-and-branching.html',
  '08-python-loops-while-and-for.html',
  '09-python-loop-control-statements-and-else.html'
];

let added = 0;
chapters.forEach(f => {
  const url = `https://www.ourcompiler.com/blog-python/${f}`;
  if (!s.includes(url)) {
    const entry = `  <url>\n    <loc>${url}</loc>\n    <lastmod>2026-08-14</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    s = s.replace('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + entry);
    added++;
  }
});

fs.writeFileSync(sitemapPath, s, 'utf8');
console.log(`✅ Added ${added} new Python master chapter URLs to sitemap.xml`);
