const fs = require('fs');
const path = require('path');

// 1. Update site-nav.js
const siteNavPath = path.join(__dirname, '../public/site-nav.js');
let siteNav = fs.readFileSync(siteNavPath, 'utf8');

if (!siteNav.includes('// Default to Light Theme on all tutorial/blog pages')) {
  siteNav = siteNav.replace(
    /var ctx = detectContext\(\);\s*var isTutorial = isTutorialPage\(\);/,
    `var ctx = detectContext();
    var isTutorial = isTutorialPage();

    // Default to Light Theme on all tutorial/blog pages unless user explicitly chose dark
    if (isTutorial) {
      var savedTheme = localStorage.getItem('theme');
      if (savedTheme !== 'dark') {
        document.documentElement.classList.add('light-theme');
        if (document.body) {
          document.body.classList.add('light-theme');
        }
      }
    }`
  );
  fs.writeFileSync(siteNavPath, siteNav, 'utf8');
  console.log('Updated site-nav.js with default light theme');
}

// 2. Update blog-cpp/style.css with compact code box rules
const cppStylePath = path.join(__dirname, '../public/blog-cpp/style.css');
let cppStyle = fs.readFileSync(cppStylePath, 'utf8');
const compactRule = `
/* Compact Code Boxes & Enhanced Content Focus */
.code-box pre, .try-box pre {
  max-height: 380px !important;
  overflow-y: auto !important;
  padding: 12px 16px !important;
  font-size: 13px !important;
  line-height: 1.5 !important;
}
.code-box, .try-box {
  margin: 20px 0 !important;
}
.try-box {
  padding: 16px 20px !important;
}
`;
if (!cppStyle.includes('.code-box pre, .try-box pre')) {
  cppStyle += compactRule;
  fs.writeFileSync(cppStylePath, cppStyle, 'utf8');
  console.log('Updated blog-cpp/style.css with compact code box rules');
}

// 3. Update public/blog-cpp.html
const blogCppIndex = path.join(__dirname, '../public/blog-cpp.html');
let blogIndexContent = fs.readFileSync(blogCppIndex, 'utf8');
blogIndexContent = blogIndexContent.replace(
  /const currentTheme = localStorage\.getItem\('theme'\) \|\| 'dark';\s*if \(currentTheme === 'light'\) \{/,
  `const currentTheme = localStorage.getItem('theme');
      if (currentTheme !== 'dark') {`
);
fs.writeFileSync(blogCppIndex, blogIndexContent, 'utf8');
console.log('Updated public/blog-cpp.html');

// 4. Update all public/blog-cpp/*.html files
const cppDir = path.join(__dirname, '../public/blog-cpp');
const files = fs.readdirSync(cppDir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = path.join(cppDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace data-theme and default dark with default light
  content = content.replace(
    /const savedTheme = localStorage\.getItem\('theme'\) \|\| 'dark';\s*document\.documentElement\.setAttribute\('data-theme', savedTheme\);/,
    `const currentTheme = localStorage.getItem('theme');
      if (currentTheme !== 'dark') {
        document.documentElement.classList.add('light-theme');
        window.addEventListener('DOMContentLoaded', () => {
          if (document.body) document.body.classList.add('light-theme');
        });
      }`
  );

  content = content.replace(
    /const currentTheme = localStorage\.getItem\('theme'\) \|\| 'dark';\s*if \(currentTheme === 'light'\) \{/,
    `const currentTheme = localStorage.getItem('theme');
      if (currentTheme !== 'dark') {`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated theme logic in ${file}`);
}

