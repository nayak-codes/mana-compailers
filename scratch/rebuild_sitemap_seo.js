import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

if (!fs.existsSync(sitemapPath)) {
  console.error('sitemap.xml not found!');
  process.exit(1);
}

const rawContent = fs.readFileSync(sitemapPath, 'utf8');

// Extract all <url> blocks
const urlRegex = /<url>[\s\S]*?<\/url>/g;
const matches = rawContent.match(urlRegex) || [];

console.log(`Found ${matches.length} total URLs in existing sitemap.xml`);

const urlMap = new Map();

matches.forEach(block => {
  const locMatch = block.match(/<loc>(.*?)<\/loc>/);
  if (locMatch) {
    const loc = locMatch[1].trim();
    urlMap.set(loc, block);
  }
});

const today = new Date().toISOString().split('T')[0];

const buildEntry = (url, priority = '0.7', changefreq = 'weekly') => {
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

// 1. Primary Homepage
const homepageUrl = 'https://www.ourcompiler.com/';

// 2. High Priority Online Compiler Pages (Priority 0.95)
const compilerUrls = [
  'https://www.ourcompiler.com/online-python-compiler.html',
  'https://www.ourcompiler.com/online-java-compiler.html',
  'https://www.ourcompiler.com/online-c-compiler.html',
  'https://www.ourcompiler.com/online-cpp-compiler.html',
  'https://www.ourcompiler.com/online-javascript-compiler.html',
  'https://www.ourcompiler.com/online-html-editor.html',
  'https://www.ourcompiler.com/online-csharp-compiler.html',
  'https://www.ourcompiler.com/online-go-compiler.html',
  'https://www.ourcompiler.com/online-rust-compiler.html',
  'https://www.ourcompiler.com/online-php-compiler.html',
  'https://www.ourcompiler.com/online-ruby-compiler.html'
];

// 3. Main Tutorial Hub Landing Pages (Priority 0.85)
const mainTutorialUrls = [
  'https://www.ourcompiler.com/blog.html',
  'https://www.ourcompiler.com/blog-python.html',
  'https://www.ourcompiler.com/blog-java.html',
  'https://www.ourcompiler.com/blog-javascript.html',
  'https://www.ourcompiler.com/blog-c.html',
  'https://www.ourcompiler.com/blog-cpp.html',
  'https://www.ourcompiler.com/blog-html.html',
  'https://www.ourcompiler.com/blog-csharp.html',
  'https://www.ourcompiler.com/blog-go.html',
  'https://www.ourcompiler.com/blog-rust.html',
  'https://www.ourcompiler.com/blog-php.html',
  'https://www.ourcompiler.com/blog-ruby.html',
  'https://www.ourcompiler.com/blog-css.html',
  'https://www.ourcompiler.com/blog-react.html',
  'https://www.ourcompiler.com/blog-angular.html',
  'https://www.ourcompiler.com/blog-vue.html',
  'https://www.ourcompiler.com/blog-nextjs.html',
  'https://www.ourcompiler.com/blog-nodejs.html',
  'https://www.ourcompiler.com/blog-express.html',
  'https://www.ourcompiler.com/blog-django.html',
  'https://www.ourcompiler.com/blog-flask.html',
  'https://www.ourcompiler.com/blog-spring-boot.html',
  'https://www.ourcompiler.com/blog-mysql.html',
  'https://www.ourcompiler.com/blog-mongodb.html',
  'https://www.ourcompiler.com/blog-postgresql.html',
  'https://www.ourcompiler.com/blog-graphql.html',
  'https://www.ourcompiler.com/blog-rest-api.html',
  'https://www.ourcompiler.com/blog-git.html'
];

// 4. Low Priority Utility/Company Pages (Priority 0.3)
const lowPriorityUrls = [
  'https://www.ourcompiler.com/about.html',
  'https://www.ourcompiler.com/contact.html',
  'https://www.ourcompiler.com/privacy-policy.html',
  'https://www.ourcompiler.com/features.html'
];

const prioritySet = new Set([
  homepageUrl,
  ...compilerUrls,
  ...mainTutorialUrls,
  ...lowPriorityUrls
]);

// Collect all remaining chapter/lesson URLs
const lessonEntries = [];
for (const [url, block] of urlMap.entries()) {
  const cleanUrl = url.trim();
  if (!prioritySet.has(cleanUrl)) {
    lessonEntries.push(buildEntry(cleanUrl, '0.65', 'weekly'));
  }
}

// Assemble XML in optimal SEO order
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// 1. Homepage
xml += buildEntry(homepageUrl, '1.0', 'daily') + '\n';

// 2. High Priority Online Compilers
compilerUrls.forEach(url => {
  xml += buildEntry(url, '0.95', 'daily') + '\n';
});

// 3. Main Tutorial Hubs
mainTutorialUrls.forEach(url => {
  xml += buildEntry(url, '0.85', 'weekly') + '\n';
});

// 4. Chapter & Lesson Pages
lessonEntries.forEach(entry => {
  xml += entry + '\n';
});

// 5. Low Priority Utility Pages (About, Contact, Privacy, Features)
lowPriorityUrls.forEach(url => {
  xml += buildEntry(url, '0.30', 'monthly') + '\n';
});

xml += `</urlset>\n`;

fs.writeFileSync(sitemapPath, xml, 'utf8');

console.log(`✅ Successfully rebuilt public/sitemap.xml!`);
console.log(`- Homepage: 1.0`);
console.log(`- 11 Online Compilers: 0.95 (Top Priority Sitelinks)`);
console.log(`- Main Tutorial Hubs: 0.85`);
console.log(`- Chapter Lessons: ${lessonEntries.length} URLs at 0.65`);
console.log(`- Utility Pages (about.html, etc.): 0.30 (Low Priority)`);
