const fs = require('fs');
const path = require('path');

console.log('=== GENERATING PRISTINE HIGH-QUALITY SITEMAP FOR OUR COMPILER ===\n');

const DOMAIN = 'https://www.ourcompiler.com';
const TODAY = '2026-11-02';
const publicDir = path.join(__dirname, '..', 'public');

function getLinksFromHtml(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const s = fs.readFileSync(filePath, 'utf8');
  const matches = [...s.matchAll(/href="([^"#?]+)"/g)].map(m => m[1]);
  return [...new Set(matches)];
}

const entries = [];
const seenUrls = new Set();

function addUrl(urlPath, priority = '0.80', changefreq = 'weekly') {
  let cleanPath = urlPath.replace(/\\/g, '/');
  if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
  
  // Verify file existence on disk
  const relPath = cleanPath === '/' ? 'index.html' : cleanPath.slice(1);
  const diskPath = path.join(publicDir, relPath);
  const rootDiskPath = path.join(__dirname, '..', relPath);

  if (!fs.existsSync(diskPath) && !fs.existsSync(rootDiskPath)) {
    console.error(`⚠️ Skipping missing URL: ${cleanPath}`);
    return;
  }

  const fullUrl = cleanPath === '/' ? DOMAIN + '/' : DOMAIN + cleanPath;
  if (seenUrls.has(fullUrl)) return;
  seenUrls.add(fullUrl);

  entries.push({
    loc: fullUrl,
    lastmod: TODAY,
    changefreq,
    priority
  });
}

// 1. PRIMARY HOMEPAGE (Priority 1.0)
addUrl('/', '1.0', 'daily');

// 2. 11 ONLINE COMPILERS (Priority 0.95)
const compilers = [
  'online-python-compiler.html',
  'online-java-compiler.html',
  'online-c-compiler.html',
  'online-cpp-compiler.html',
  'online-javascript-compiler.html',
  'online-html-editor.html',
  'online-csharp-compiler.html',
  'online-go-compiler.html',
  'online-rust-compiler.html',
  'online-php-compiler.html',
  'online-ruby-compiler.html'
];
compilers.forEach(c => addUrl('/' + c, '0.95', 'daily'));

// 3. ESSENTIAL LEGAL & TRUST PAGES (Priority 0.85)
const trustPages = [
  'about.html',
  'contact.html',
  'privacy-policy.html',
  'terms-of-service.html',
  'disclaimer.html',
  'features.html',
  'how-our-compiler-works.html',
  'code-privacy-and-storage.html',
  'supported-languages.html',
  'our-compiler-vs-local-ide.html'
];
trustPages.forEach(p => addUrl('/' + p, '0.85', 'monthly'));

// 4. MAIN HUB PAGES (Priority 0.90)
const hubs = [
  'blog.html',
  'blog-java.html',
  'blog-python.html',
  'blog-c.html',
  'blog-cpp.html',
  'blog-csharp.html',
  'blog-javascript.html',
  'blog-html.html'
];
hubs.forEach(h => addUrl('/' + h, '0.90', 'weekly'));

// 5. MASTERCLASS INDEX PAGES (Priority 0.85)
const masterclassIndexes = [
  'blog-java/index.html',
  'blog-python/index.html',
  'blog-c/index.html',
  'blog-cpp/index.html',
  'blog-csharp/index.html',
  'blog-javascript/index.html',
  'blog-html/index.html'
];
masterclassIndexes.forEach(idx => addUrl('/' + idx, '0.85', 'weekly'));

// 6. VERIFIED AUTHENTIC 7 MASTERCLASSES (Priority 0.80)
const courses = [
  { name: 'Java', hub: 'blog-java.html', index: 'blog-java/index.html', prefix: '/blog-java/' },
  { name: 'Python', hub: 'blog-python.html', index: 'blog-python/index.html', prefix: '/blog-python/' },
  { name: 'C++', hub: 'blog-cpp.html', index: 'blog-cpp/index.html', prefix: '/blog-cpp/' },
  { name: 'C', hub: 'blog-c.html', index: 'blog-c/index.html', prefix: '/blog-c/' },
  { name: 'C#', hub: 'blog-csharp.html', index: 'blog-csharp/index.html', prefix: '/blog-csharp/' },
  { name: 'JavaScript', hub: 'blog-javascript.html', index: 'blog-javascript/index.html', prefix: '/blog-javascript/' },
  { name: 'HTML', hub: 'blog-html.html', index: 'blog-html/index.html', prefix: '/blog-html/' }
];

let chapterCount = 0;

courses.forEach(c => {
  const hubLinks = getLinksFromHtml(path.join(publicDir, c.hub)).filter(l => l.includes(c.prefix.replace('/', '')));
  const indexLinks = getLinksFromHtml(path.join(publicDir, c.index)).filter(l => l.includes(c.prefix.replace('/', '')));
  const all = [...new Set([...hubLinks, ...indexLinks])].filter(l => l.endsWith('.html') && !l.endsWith('index.html'));
  
  all.forEach(link => {
    let clean = link.startsWith('/') ? link : '/' + link;
    addUrl(clean, '0.80', 'monthly');
    chapterCount++;
  });
});

console.log(`Added ${chapterCount} masterclass chapters across 7 courses.`);
console.log(`Total URLs in Pristine Sitemap: ${entries.length}\n`);

// XML Generation
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

entries.forEach(e => {
  xml += '  <url>\n';
  xml += `    <loc>${e.loc}</loc>\n`;
  xml += `    <lastmod>${e.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${e.changefreq}</changefreq>\n`;
  xml += `    <priority>${e.priority}</priority>\n`;
  xml += '  </url>\n';
});

xml += '</urlset>\n';

const outPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');

console.log(`✅ Successfully generated pristine sitemap.xml!`);
console.log(`   - Output: ${outPath}`);
console.log(`   - Total URLs indexed: ${entries.length}`);
console.log(`   - File size: ${xml.length.toLocaleString()} bytes\n`);

// Priority breakdown
const pCounts = {};
entries.forEach(e => {
  pCounts[e.priority] = (pCounts[e.priority] || 0) + 1;
});
console.log('Priority Breakdown:');
Object.keys(pCounts).sort((a,b) => b - a).forEach(p => {
  console.log(`  Priority ${p}: ${pCounts[p]} URLs`);
});

