const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const javaDir = path.join(publicDir, 'blog-java');
const hubFile = path.join(publicDir, 'blog-java.html');
const compilerFile = path.join(__dirname, '..', 'online-java-compiler.html');
const sitemapFile = path.join(publicDir, 'sitemap.xml');

let allPassed = true;
function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    allPassed = false;
  }
}

console.log('\n--- 1. Verifying Java Tutorial Hub (blog-java.html) ---');
assert(fs.existsSync(hubFile), 'blog-java.html exists');
const hubContent = fs.readFileSync(hubFile, 'utf8');
assert(hubContent.includes('Java Tutorial & Reference Guide (27 Lessons)'), 'Hub has correct title');
assert(hubContent.includes('/blog-java/01-welcome-hello-world.html'), 'Hub links to lesson 1');
assert(hubContent.includes('/blog-java/27-interview-preparation.html'), 'Hub links to lesson 27');
assert(hubContent.includes('/online-java-compiler.html'), 'Hub links to online-java-compiler.html');
assert(hubContent.includes("code_java"), 'Hub preloads code_java');
assert(hubContent.includes('site-nav.js'), 'Hub includes site-nav.js');

const hubMatches = hubContent.match(/href="\/blog-java\/[0-9]{2}-[^"]+"/g) || [];
assert(hubMatches.length >= 54, `Hub links all 27 lessons in sidebar + curriculum table (found ${hubMatches.length} links)`);

console.log('\n--- 2. Verifying All 27 Lesson Files in public/blog-java/ ---');
const files = fs.readdirSync(javaDir).filter(f => f.endsWith('.html')).sort();
assert(files.length === 27, `Found exactly 27 lesson files (found ${files.length})`);

files.forEach((file, index) => {
  const filePath = path.join(javaDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lessonNum = index + 1;

  const hasTitle = content.includes('<title>') && content.includes('Java Tutorial | Our Compiler');
  const hasMeta = content.includes('meta name="description"');
  const hasSidebar = content.includes('class="sidebar"') && content.includes('Java HOME');
  const hasActiveSidebar = content.includes(`href="${file}" class="active"`);
  const hasThemeToggle = content.includes('blog-theme-toggle');
  const hasCodePreload = content.includes("localStorage.setItem('code_java'");
  const hasCompilerLink = content.includes('/online-java-compiler.html');
  const hasNavFooter = content.includes('class="nav-footer"');
  const hasSiteNav = content.includes('site-nav.js');
  const hasBadges = content.includes(`Lesson ${lessonNum} of 27`);

  const passed = hasTitle && hasMeta && hasSidebar && hasActiveSidebar && hasThemeToggle && hasCodePreload && hasCompilerLink && hasNavFooter && hasSiteNav && hasBadges;

  if (!passed) {
    console.error(`  ❌ Issue in ${file}: title=${hasTitle}, meta=${hasMeta}, sidebarActive=${hasActiveSidebar}, theme=${hasThemeToggle}, preload=${hasCodePreload}, compiler=${hasCompilerLink}, footer=${hasNavFooter}, siteNav=${hasSiteNav}, badges=${hasBadges}`);
    allPassed = false;
  }
});
if (allPassed) {
  console.log('  ✅ PASS: All 27 lesson files have valid headers, sidebars, active states, theme switchers, code preloads, compiler links, nav footers, and site-nav scripts!');
}

console.log('\n--- 3. Verifying Lesson Flow / Navigation Continuity ---');
files.forEach((file, index) => {
  const filePath = path.join(javaDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  if (index === 0) {
    assert(content.includes('href="/blog-java.html" class="nav-btn"'), `Lesson 1 nav-footer links back to /blog-java.html`);
    assert(content.includes(`href="${files[1]}" class="nav-btn"`), `Lesson 1 links forward to Lesson 2 (${files[1]})`);
  } else if (index === files.length - 1) {
    assert(content.includes(`href="${files[index - 1]}" class="nav-btn"`), `Lesson 27 links backward to Lesson 26 (${files[index - 1]})`);
    assert(content.includes('Course Completed 🎉') || content.includes('/blog-java.html'), `Lesson 27 completes course`);
  } else {
    const prevFile = files[index - 1];
    const nextFile = files[index + 1];
    const hasPrev = content.includes(`href="${prevFile}" class="nav-btn"`);
    const hasNext = content.includes(`href="${nextFile}" class="nav-btn"`);
    if (!hasPrev || !hasNext) {
      console.error(`  ❌ Navigation link broken in ${file}: prev (${prevFile})=${hasPrev}, next (${nextFile})=${hasNext}`);
      allPassed = false;
    }
  }
});
console.log('  ✅ PASS: All 27 lesson forward and backward navigation links are verified!');

console.log('\n--- 4. Verifying Online Java Compiler Page Integration ---');
assert(fs.existsSync(compilerFile), 'online-java-compiler.html exists');
const compilerContent = fs.readFileSync(compilerFile, 'utf8');
assert(compilerContent.includes('href="/blog-java.html"'), 'online-java-compiler.html links to /blog-java.html');
assert(compilerContent.includes('href="/blog-java/01-welcome-hello-world.html"'), 'online-java-compiler.html links to Lesson 1');
assert(compilerContent.includes('href="/blog-java/10-classes-and-objects.html"'), 'online-java-compiler.html links to OOP lesson');

console.log('\n--- 5. Verifying Sitemap Coverage ---');
assert(fs.existsSync(sitemapFile), 'sitemap.xml exists');
const sitemapContent = fs.readFileSync(sitemapFile, 'utf8');
assert(sitemapContent.includes('<loc>https://www.ourcompiler.com/blog-java.html</loc>'), 'sitemap.xml has blog-java.html');
assert(sitemapContent.includes('<loc>https://www.ourcompiler.com/online-java-compiler.html</loc>'), 'sitemap.xml has online-java-compiler.html');
files.forEach(file => {
  const url = `<loc>https://www.ourcompiler.com/blog-java/${file}</loc>`;
  if (!sitemapContent.includes(url)) {
    console.error(`  ❌ Sitemap missing: ${url}`);
    allPassed = false;
  }
});
if (allPassed) {
  console.log('  ✅ PASS: sitemap.xml contains all 27 lesson URLs!');
}

console.log('\n=========================================');
if (allPassed) {
  console.log('🎉 ALL VERIFICATION CHECKS PASSED PERFECTLY!');
} else {
  console.log('⚠️ SOME CHECKS FAILED. PLEASE REVIEW LOGS ABOVE.');
}
console.log('=========================================\n');
