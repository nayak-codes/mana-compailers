const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

// Read all files in public
const files = fs.readdirSync(publicDir);
const blogFiles = files.filter(f => f.startsWith('blog') && f.endsWith('.html'));

// Sort them so the index files come first, then subpages alphabetically
blogFiles.sort((a, b) => {
  const aSub = a.split('-').length > 2;
  const bSub = b.split('-').length > 2;
  if (aSub && !bSub) return 1;
  if (!aSub && bSub) return -1;
  return a.localeCompare(b);
});

// Construct URL XML nodes
let urlNodes = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ourcompiler.vercel.app/</loc>
    <lastmod>2026-07-02</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ourcompiler.vercel.app/about.html</loc>
    <lastmod>2026-07-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ourcompiler.vercel.app/features.html</loc>
    <lastmod>2026-07-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ourcompiler.vercel.app/contact.html</loc>
    <lastmod>2026-07-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ourcompiler.vercel.app/privacy-policy.html</loc>
    <lastmod>2026-07-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

blogFiles.forEach(file => {
  const isSub = file.split('-').length > 2;
  const priority = isSub ? '0.6' : '0.8';
  urlNodes += `  <url>
    <loc>https://ourcompiler.vercel.app/${file}</loc>
    <lastmod>2026-07-02</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
});

urlNodes += `</urlset>\n`;

fs.writeFileSync(sitemapPath, urlNodes, 'utf8');
console.log(`Successfully generated sitemap.xml with ${blogFiles.length} tutorial pages!`);
