const fs = require('fs');
const path = require('path');

const javaDir = path.join(__dirname, '..', 'public', 'blog-java');
const phase1 = require('./java_phase1_data.js');
const phase2 = require('./java_phase2_data.js');
const phase3 = require('./java_phase3_data.js');
const phase4 = require('./java_phase4_data.js');
const phase5 = require('./java_phase5_data.js');
const phase6 = require('./java_phase6_data.js');
const phase7 = require('./java_phase7_data.js');
const phase8 = require('./java_phase8_data.js');
const phase9 = require('./java_phase9_data.js');
const phase10 = require('./java_phase10_data.js');

const allActiveChapters = [...phase1, ...phase2, ...phase3, ...phase4, ...phase5, ...phase6, ...phase7, ...phase8, ...phase9, ...phase10];
const activeSlugs = new Set(allActiveChapters.map(c => `${c.slug}.html`));
activeSlugs.add('style.css');

const files = fs.readdirSync(javaDir);
let removedCount = 0;

files.forEach(f => {
  if (!activeSlugs.has(f)) {
    fs.unlinkSync(path.join(javaDir, f));
    console.log(`🗑️ Removed legacy file: public/blog-java/${f}`);
    removedCount++;
  }
});

console.log(`Cleaned up ${removedCount} legacy Java files.`);

// Update public/sitemap.xml
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');

  // Remove old blog-java entries
  sitemap = sitemap.replace(/<url>\s*<loc>https:\/\/www\.ourcompiler\.com\/blog-java\/.*?<\/loc>[\s\S]*?<\/url>/g, '');

  // Add new blog-java URLs
  const activeEntries = allActiveChapters.map(c => `  <url>
    <loc>https://www.ourcompiler.com/blog-java/${c.slug}.html</loc>
    <lastmod>2026-08-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n');

  // Insert before </urlset>
  sitemap = sitemap.replace('</urlset>', `${activeEntries}\n</urlset>`);
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log(`✅ Updated sitemap.xml with ${activeSlugs.size - 1} Java lesson URLs.`);
}
