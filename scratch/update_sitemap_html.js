const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
let s = fs.readFileSync(sitemapPath, 'utf8');

if (!s.includes('online-html-editor.html')) {
  const entry = `  <url>
    <loc>https://www.ourcompiler.com/online-html-editor.html</loc>
    <lastmod>2026-08-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
  s = s.replace('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + entry);
  fs.writeFileSync(sitemapPath, s, 'utf8');
  console.log('✅ Added online-html-editor.html to sitemap.xml');
} else {
  console.log('Already in sitemap.xml');
}
