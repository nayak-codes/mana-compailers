const fs = require('fs');
const path = require('path');

console.log('=== GENERATING COMPREHENSIVE SITEMAP FOR OUR COMPILER ===\n');

const DOMAIN = 'https://www.ourcompiler.com';
const TODAY = '2026-11-02';

const publicDir = path.join(__dirname, '..', 'public');

// Collect all HTML files from public/
function scanHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(scanHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const allFiles = scanHtmlFiles(publicDir);

// URLs to exclude (redirects, duplicates, internal stubs)
const EXCLUDE_FILES = new Set([
  'privacy.html', // redirects to privacy-policy.html
  'portfolio.html'
]);

const entries = [];
const seenUrls = new Set();

function addUrl(urlPath, priority = '0.70', changefreq = 'weekly') {
  let cleanPath = urlPath.replace(/\\/g, '/');
  if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
  
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

// 2. ONLINE COMPILERS (Priority 0.95)
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

// 3. MAIN TUTORIAL HUBS & ROADMAPS (Priority 0.90)
const hubs = [
  'blog.html',
  'blog-java.html',
  'blog-python.html',
  'blog-javascript.html',
  'blog-c.html',
  'blog-cpp.html',
  'blog-csharp.html',
  'blog-html.html',
  'blog-css.html',
  'blog-react.html',
  'blog-nodejs.html',
  'blog-express.html',
  'blog-django.html',
  'blog-flask.html',
  'blog-springboot.html',
  'blog-mysql.html',
  'blog-mongodb.html',
  'blog-git.html',
  'blog-go.html',
  'blog-rust.html',
  'blog-php.html',
  'blog-ruby.html',
  'blog-angular.html',
  'blog-vue.html',
  'blog-nextjs.html',
  'blog-graphql.html',
  'blog-rest-api.html'
];
hubs.forEach(h => {
  if (fs.existsSync(path.join(publicDir, h))) {
    addUrl('/' + h, '0.90', 'weekly');
  }
});

// 4. ESSENTIAL LEGAL & TRUST PAGES (Priority 0.80)
const trustPages = [
  'about.html',
  'contact.html',
  'privacy-policy.html',
  'terms-of-service.html',
  'features.html',
  'how-our-compiler-works.html',
  'code-privacy-and-storage.html',
  'supported-languages.html',
  'our-compiler-vs-local-ide.html'
];
trustPages.forEach(p => {
  if (fs.existsSync(path.join(publicDir, p))) {
    addUrl('/' + p, '0.80', 'monthly');
  }
});

// 5. CORE 25-CHAPTER MASTERCLASS COURSES (Priority 0.85)
const coreDirs = [
  'blog-java',
  'blog-python',
  'blog-javascript',
  'blog-c',
  'blog-cpp',
  'blog-csharp',
  'blog-html'
];

coreDirs.forEach(dir => {
  const dirPath = path.join(publicDir, dir);
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html') && f !== 'index.html');
  files.sort().forEach(f => {
    addUrl(`/${dir}/${f}`, '0.85', 'weekly');
  });
});

// 6. ALL OTHER FRAMEWORK & LANGUAGE TUTORIALS (Priority 0.70)
allFiles.forEach(file => {
  const rel = path.relative(publicDir, file);
  const baseName = path.basename(file);
  if (EXCLUDE_FILES.has(baseName)) return;
  if (baseName === 'index.html') return; // root handled
  
  // Skip already added root or core files
  const webPath = '/' + rel.replace(/\\/g, '/');
  const fullWebUrl = DOMAIN + webPath;
  if (!seenUrls.has(fullWebUrl)) {
    addUrl(webPath, '0.70', 'monthly');
  }
});

// Sort entries by priority descending
entries.sort((a, b) => parseFloat(b.priority) - parseFloat(a.priority));

// Build XML
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

const outSitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(outSitemapPath, xml, 'utf8');

console.log(`✅ Successfully generated sitemap.xml!`);
console.log(`   - Output: ${outSitemapPath}`);
console.log(`   - Total URLs indexed: ${entries.length}`);
console.log(`   - File size: ${xml.length.toLocaleString()} bytes\n`);

// Breakdown by category
const breakdown = {};
entries.forEach(e => {
  breakdown[e.priority] = (breakdown[e.priority] || 0) + 1;
});
console.log('Priority Breakdown:');
Object.keys(breakdown).sort((a, b) => b - a).forEach(p => {
  console.log(`  Priority ${p}: ${breakdown[p]} URLs`);
});
