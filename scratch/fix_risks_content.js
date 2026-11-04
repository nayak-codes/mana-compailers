const fs = require('fs');
const path = require('path');

// Target directories that are curated / in sitemap
const targetDirs = [
  'public/blog-javascript',
  'public/blog-python',
  'public/blog-java',
  'public/blog-c',
  'public/blog-cpp',
  'public/blog-csharp',
  'public/blog-html'
];

let filesModified = 0;

// 1. Process blog hubs: blog-javascript.html, blog-java.html, blog-python.html, blog.html, etc.
const hubFiles = [
  'public/blog-javascript.html',
  'public/blog-java.html',
  'public/blog-python.html',
  'public/blog-c.html',
  'public/blog-cpp.html',
  'public/blog-csharp.html',
  'public/blog-html.html',
  'public/blog.html'
];

hubFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Fix Risk 5: Roman Telugu to Telugu Script in JS hub
  content = content.replace(/1\.\s*JavaScript\s*ante\s*enti\?/gi, '1. JavaScript అంటే ఏమిటి?');
  content = content.replace(/JS\s*ante\s*enti\?/gi, 'JS అంటే ఏమిటి?');
  content = content.replace(/1\.\s*Python\s*ante\s*enti\?/gi, '1. Python అంటే ఏమిటి?');
  content = content.replace(/Python\s*ante\s*enti\?/gi, 'Python అంటే ఏమిటి?');

  // Fix Risk 2: Standardize sidebar course links without conflicting counts
  content = content.replace(/Python Course \(\d+ Lessons\)/gi, 'Python Masterclass');
  content = content.replace(/Java Course \(\d+ Lessons\)/gi, 'Java Masterclass');
  content = content.replace(/JavaScript Course \(\d+ Lessons\)/gi, 'JavaScript Masterclass');
  content = content.replace(/పైథాన్ కోర్సు \(\d+ Lessons\)/gi, 'పైథాన్ మాస్టర్‌కోర్స్');
  content = content.replace(/జావాస్క్రిప్ట్ కోర్సు \(\d+ Lessons\)/gi, 'జావాస్క్రిప్ట్ మాస్టర్‌కోర్స్');
  content = content.replace(/జావా కోర్సు \(\d+ Lessons\)/gi, 'జావా మాస్టర్‌కోర్స్');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    filesModified++;
    console.log(`Updated hub: ${file}`);
  }
});

// 2. Process all chapters in targetDirs
targetDirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  files.forEach(f => {
    const fullPath = path.join(dir, f);
    let content = fs.readFileSync(fullPath, 'utf8');
    let original = content;

    // Fix Risk 5: Roman Telugu -> Telugu script
    content = content.replace(/1\.\s*JavaScript\s*ante\s*enti\?/gi, '1. JavaScript అంటే ఏమిటి?');
    content = content.replace(/1\.\s*JavaScript\s*ante\s*enti/gi, '1. JavaScript అంటే ఏమిటి?');
    content = content.replace(/JS\s*ante\s*enti\?/gi, 'JS అంటే ఏమిటి?');
    content = content.replace(/19\.\s*DOM\s*ante\s*enti\?\s*Elements\s*select\s*cheyyadam/gi, '19. DOM అంటే ఏమిటి? (DOM Elements & Selection)');
    content = content.replace(/Variables\s*ante\s*enti\?/gi, 'Variables అంటే ఏమిటి?');
    content = content.replace(/1\.\s*Python\s*ante\s*enti\?\s*\(What is Python\?\)/gi, '1. Python అంటే ఏమిటి? (What is Python?)');
    content = content.replace(/1\.\s*Python\s*ante\s*enti/gi, '1. Python అంటే ఏమిటి?');
    content = content.replace(/Python\s*ante\s*enti\?\s*Features and Real-World Uses/gi, 'Python అంటే ఏమిటి? Features and Real-World Uses');
    content = content.replace(/Python\s*ante\s*enti\?\s*\(What is Python\?\)/gi, 'Python అంటే ఏమిటి? (What is Python?)');

    // Fix Risk 2: Standardize sidebar course links without conflicting counts
    content = content.replace(/Python Course \(\d+ Lessons\)/gi, 'Python Masterclass');
    content = content.replace(/Java Course \(\d+ Lessons\)/gi, 'Java Masterclass');
    content = content.replace(/JavaScript Course \(\d+ Lessons\)/gi, 'JavaScript Masterclass');
    content = content.replace(/పైథాన్ కోర్సు \(\d+ Lessons\)/gi, 'పైథాన్ మాస్టర్‌కోర్స్');
    content = content.replace(/జావాస్క్రిప్ట్ కోర్సు \(\d+ Lessons\)/gi, 'జావాస్క్రిప్ట్ మాస్టర్‌కోర్స్');
    content = content.replace(/జావా కోర్సు \(\d+ Lessons\)/gi, 'జావా మాస్టర్‌కోర్స్');
    content = content.replace(/C Course \(\d+ Lessons\)/gi, 'C Masterclass');
    content = content.replace(/సి ప్రోగ్రామింగ్ కోర్సు \(\d+ Lessons\)/gi, 'సి ప్రోగ్రామింగ్ మాస్టర్‌కోర్స్');

    if (content !== original) {
      fs.writeFileSync(fullPath, content, 'utf8');
      filesModified++;
    }
  });
});

console.log(`Total files updated: ${filesModified}`);

