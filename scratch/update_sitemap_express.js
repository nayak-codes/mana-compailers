const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const expressDir = path.join(publicDir, 'blog-express');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

const files = fs.readdirSync(expressDir).filter(f => f.endsWith('.html'));

let addedCount = 0;

// Add main index page if missing
const mainUrl = 'https://www.ourcompiler.com/blog-express.html';
if (!sitemapContent.includes(mainUrl)) {
  const mainEntry = `  <url>\n    <loc>${mainUrl}</loc>\n    <lastmod>2026-08-21</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  sitemapContent = sitemapContent.replace('</urlset>', `${mainEntry}</urlset>`);
  addedCount++;
}

// Add individual chapter pages
files.forEach(file => {
  const pageUrl = `https://www.ourcompiler.com/blog-express/${file}`;
  if (!sitemapContent.includes(pageUrl)) {
    const entry = `  <url>\n    <loc>${pageUrl}</loc>\n    <lastmod>2026-08-21</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    sitemapContent = sitemapContent.replace('</urlset>', `${entry}</urlset>`);
    addedCount++;
  }
});

fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
console.log(`✅ Updated sitemap.xml! Added ${addedCount} new Express.js URLs.`);
