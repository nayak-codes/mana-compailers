const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');
const gitDir = path.join(publicDir, 'blog-git');

if (!fs.existsSync(sitemapPath)) {
  console.error('sitemap.xml not found!');
  process.exit(1);
}

let sitemap = fs.readFileSync(sitemapPath, 'utf8');

const urlsToAdd = [
  'https://www.ourcompiler.com/blog-git.html'
];

const files = fs.readdirSync(gitDir).filter(f => f.endsWith('.html')).sort();
files.forEach(f => {
  urlsToAdd.push(`https://www.ourcompiler.com/blog-git/${f}`);
});

let addedCount = 0;
urlsToAdd.forEach(url => {
  const entry = `  <url>\n    <loc>${url}</loc>\n    <lastmod>2026-08-21</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) {
    sitemap = sitemap.replace('</urlset>', `${entry}\n</urlset>`);
    addedCount++;
  }
});

fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log(`✅ Updated sitemap.xml! Added ${addedCount} new Git URLs.`);
