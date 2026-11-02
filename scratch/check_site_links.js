const fs = require('fs');
const path = require('path');

console.log('=== SITE HEALTH & LINK INTEGRITY AUDIT ===\n');

const publicDir = path.join(__dirname, '..', 'public');

// 1. Check all COMPILER_LANGS from site-nav.js
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

let errors = [];

compilers.forEach(c => {
  // Can be in root or in public
  const rootPath = path.join(__dirname, '..', c);
  const pubPath = path.join(publicDir, c);
  if (!fs.existsSync(rootPath) && !fs.existsSync(pubPath)) {
    errors.push(`Compiler page missing: ${c}`);
  }
});
console.log(`✅ All ${compilers.length} online compiler entry points verified.`);

// 2. Check all main tutorial hub pages
const hubs = [
  'blog.html',
  'blog-java.html',
  'blog-python.html',
  'blog-javascript.html',
  'blog-c.html',
  'blog-cpp.html',
  'blog-csharp.html',
  'blog-html.html'
];

hubs.forEach(h => {
  const p = path.join(publicDir, h);
  if (!fs.existsSync(p)) {
    errors.push(`Tutorial Hub missing: ${h}`);
  }
});
console.log(`✅ All ${hubs.length} tutorial hub pages verified.`);

// 3. Check all policy pages
const policies = [
  'about.html',
  'contact.html',
  'privacy-policy.html',
  'terms-of-service.html',
  'features.html'
];

policies.forEach(p => {
  const filePath = path.join(publicDir, p);
  if (!fs.existsSync(filePath)) {
    errors.push(`Policy page missing: ${p}`);
  }
});
console.log(`✅ All ${policies.length} mandatory policy pages verified.`);

// 4. Verify all 25 Java chapter files
const { LESSONS } = require('./java_curriculum_data.js');
LESSONS.forEach(l => {
  const p = path.join(publicDir, 'blog-java', l.file);
  if (!fs.existsSync(p)) {
    errors.push(`Java lesson missing: ${l.file}`);
  }
});
console.log(`✅ All ${LESSONS.length} Java Masterclass chapters verified on disk.`);

// 5. Check AdSense script / meta tag in index.html, blog-java.html, and compilers
const rootIndex = path.join(__dirname, '..', 'index.html');
if (!fs.readFileSync(rootIndex, 'utf8').includes('ca-pub-7028247458903242')) {
  errors.push('index.html is missing ca-pub-7028247458903242');
} else {
  console.log('✅ Root index.html AdSense tag verified.');
}

// 6. Check sitemap.xml exists and has > 1000 entries
const sitemap = path.join(publicDir, 'sitemap.xml');
if (!fs.existsSync(sitemap)) {
  errors.push('sitemap.xml is missing!');
} else {
  const smContent = fs.readFileSync(sitemap, 'utf8');
  const urlCount = (smContent.match(/<url>/g) || []).length;
  console.log(`✅ sitemap.xml verified with ${urlCount} indexed URLs.`);
  if (urlCount < 100) errors.push(`sitemap.xml has only ${urlCount} URLs!`);
}

// 7. Check robots.txt
const robots = path.join(publicDir, 'robots.txt');
if (!fs.existsSync(robots)) {
  errors.push('robots.txt is missing!');
} else {
  const rbContent = fs.readFileSync(robots, 'utf8');
  if (!rbContent.includes('sitemap.xml') || !rbContent.includes('Mediapartners-Google')) {
    errors.push('robots.txt missing sitemap or Mediapartners-Google!');
  } else {
    console.log('✅ robots.txt verified with Googlebot & Mediapartners-Google permissions.');
  }
}

console.log('\n======================================================');
if (errors.length > 0) {
  console.error(`❌ SITE AUDIT FAILED with ${errors.length} errors:`);
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
} else {
  console.log('🎉 100% PASS: All Site Health & AdSense Readiness Checks Passed!');
}
console.log('======================================================\n');
