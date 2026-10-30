const fs = require('fs');
const path = require('path');

// 1. UPDATE public/site-nav.js
const siteNavPath = path.join(__dirname, '..', 'public', 'site-nav.js');
let siteNavContent = fs.readFileSync(siteNavPath, 'utf8');

// Replace COMPILER_LANGS
const oldCompilerLangsRegex = /var COMPILER_LANGS = \[[\s\S]*?\];/;
const newCompilerLangs = `var COMPILER_LANGS = [
    { name: 'Python', url: '/online-python-compiler.html', blog: '/blog-python.html', slug: 'python' },
    { name: 'Java', url: '/online-java-compiler.html', blog: '/blog-java.html', slug: 'java' },
    { name: 'HTML / CSS / JS', url: '/online-html-editor.html', blog: '/blog-html.html', slug: 'html' },
    { name: 'C', url: '/online-c-compiler.html', blog: '/blog-c.html', slug: 'c' },
    { name: 'C++', url: '/online-cpp-compiler.html', blog: '/blog-cpp.html', slug: 'cpp' },
    { name: 'JavaScript', url: '/online-javascript-compiler.html', blog: '/blog-javascript.html', slug: 'javascript' },
    { name: 'C#', url: '/online-csharp-compiler.html', blog: '/blog-csharp.html', slug: 'csharp' }
  ];`;

// Replace TUTORIAL_GROUPS
const oldTutorialGroupsRegex = /var TUTORIAL_GROUPS = \[[\s\S]*?\];\s*var STATIC_LINKS/;
const newTutorialGroups = `var TUTORIAL_GROUPS = [
    {
      title: 'Free Tutorials',
      items: [
        { name: 'Python', url: '/blog-python.html' },
        { name: 'Java', url: '/blog-java.html' },
        { name: 'HTML / CSS / JS', url: '/blog-html.html' },
        { name: 'C', url: '/blog-c.html' },
        { name: 'C++', url: '/blog-cpp.html' },
        { name: 'JavaScript', url: '/blog-javascript.html' },
        { name: 'C#', url: '/blog-csharp.html' }
      ]
    }
  ];

  var STATIC_LINKS`;

if (oldCompilerLangsRegex.test(siteNavContent)) {
  siteNavContent = siteNavContent.replace(oldCompilerLangsRegex, newCompilerLangs);
  console.log('✅ Updated COMPILER_LANGS in public/site-nav.js');
} else {
  console.warn('⚠️ Could not match COMPILER_LANGS regex in public/site-nav.js');
}

if (oldTutorialGroupsRegex.test(siteNavContent)) {
  siteNavContent = siteNavContent.replace(oldTutorialGroupsRegex, newTutorialGroups);
  console.log('✅ Updated TUTORIAL_GROUPS in public/site-nav.js');
} else {
  console.warn('⚠️ Could not match TUTORIAL_GROUPS regex in public/site-nav.js');
}

fs.writeFileSync(siteNavPath, siteNavContent, 'utf8');

// 2. UPDATE src/components/AppTopnav.jsx
const appTopnavPath = path.join(__dirname, '..', 'src', 'components', 'AppTopnav.jsx');
if (fs.existsSync(appTopnavPath)) {
  let appTopnavContent = fs.readFileSync(appTopnavPath, 'utf8');
  
  const oldAppCompilerRegex = /const COMPILER_LANGS = \[[\s\S]*?\]\s*const TUTORIAL_LANGS = \[[\s\S]*?\]/;
  const newAppNavLangs = `const COMPILER_LANGS = [
  { name: 'Python', url: '/online-python-compiler.html', blog: '/blog-python.html' },
  { name: 'Java', url: '/online-java-compiler.html', blog: '/blog-java.html' },
  { name: 'HTML / CSS / JS', url: '/online-html-editor.html', blog: '/blog-html.html' },
  { name: 'C', url: '/online-c-compiler.html', blog: '/blog-c.html' },
  { name: 'C++', url: '/online-cpp-compiler.html', blog: '/blog-cpp.html' },
  { name: 'JavaScript', url: '/online-javascript-compiler.html', blog: '/blog-javascript.html' },
  { name: 'C#', url: '/online-csharp-compiler.html', blog: '/blog-csharp.html' },
]

const TUTORIAL_LANGS = [
  { name: 'Python', url: '/blog-python.html' },
  { name: 'Java', url: '/blog-java.html' },
  { name: 'HTML / CSS / JS', url: '/blog-html.html' },
  { name: 'C', url: '/blog-c.html' },
  { name: 'C++', url: '/blog-cpp.html' },
  { name: 'JavaScript', url: '/blog-javascript.html' },
  { name: 'C#', url: '/blog-csharp.html' },
]`;

  if (oldAppCompilerRegex.test(appTopnavContent)) {
    appTopnavContent = appTopnavContent.replace(oldAppCompilerRegex, newAppNavLangs);
    fs.writeFileSync(appTopnavPath, appTopnavContent, 'utf8');
    console.log('✅ Updated COMPILER_LANGS & TUTORIAL_LANGS in src/components/AppTopnav.jsx');
  } else {
    console.warn('⚠️ Could not match regex in src/components/AppTopnav.jsx');
  }
}

// 3. UPDATE scratch/csharp_page_template.js
const templatePath = path.join(__dirname, 'csharp_page_template.js');
if (fs.existsSync(templatePath)) {
  let tpl = fs.readFileSync(templatePath, 'utf8');
  const oldTopnavFallback = `<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-csharp.html" class="active">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>`;

  const newTopnavFallback = `<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-csharp.html" class="active">C#</a>
</nav>`;

  if (tpl.includes(oldTopnavFallback)) {
    tpl = tpl.replace(oldTopnavFallback, newTopnavFallback);
    fs.writeFileSync(templatePath, tpl, 'utf8');
    console.log('✅ Updated scratch/csharp_page_template.js');
  }
}

// 4. UPDATE public/blog-csharp.html fallback nav
const blogCsharpPath = path.join(__dirname, '..', 'public', 'blog-csharp.html');
if (fs.existsSync(blogCsharpPath)) {
  let blogCs = fs.readFileSync(blogCsharpPath, 'utf8');
  const oldCsNav = `<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-csharp.html" class="active">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>`;

  const newCsNav = `<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-csharp.html" class="active">C#</a>
</nav>`;

  if (blogCs.includes(oldCsNav)) {
    blogCs = blogCs.replace(oldCsNav, newCsNav);
    fs.writeFileSync(blogCsharpPath, blogCs, 'utf8');
    console.log('✅ Updated fallback nav in public/blog-csharp.html');
  }
}

// 5. UPDATE all 20 lessons in public/blog-csharp/*.html
const blogCsharpDir = path.join(__dirname, '..', 'public', 'blog-csharp');
const lessonFiles = fs.readdirSync(blogCsharpDir).filter(f => f.endsWith('.html'));
let updatedCount = 0;

lessonFiles.forEach(f => {
  const fp = path.join(blogCsharpDir, f);
  let html = fs.readFileSync(fp, 'utf8');
  const targetOld = `<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-csharp.html" class="active">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>`;

  const targetNew = `<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-csharp.html" class="active">C#</a>
</nav>`;

  if (html.includes(targetOld)) {
    html = html.replace(targetOld, targetNew);
    fs.writeFileSync(fp, html, 'utf8');
    updatedCount++;
  }
});
console.log(`✅ Updated fallback nav in ${updatedCount} lesson files in public/blog-csharp/`);

console.log('DONE!');

