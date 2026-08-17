const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const pythonStylePath = path.join(publicDir, 'blog-python', 'style.css');
const pythonStyleContent = fs.readFileSync(pythonStylePath, 'utf8');

// 1. Overwrite blog-java/style.css and blog-javascript/style.css with the exact green style
const javaStylePath = path.join(publicDir, 'blog-java', 'style.css');
const jsStylePath = path.join(publicDir, 'blog-javascript', 'style.css');

fs.writeFileSync(javaStylePath, pythonStyleContent, 'utf8');
console.log('✅ Updated public/blog-java/style.css with Green Theme');

fs.writeFileSync(jsStylePath, pythonStyleContent, 'utf8');
console.log('✅ Updated public/blog-javascript/style.css with Green Theme');

// 2. Update blog-style.css default accent to green #10b981
const blogStylePath = path.join(publicDir, 'blog-style.css');
let blogStyle = fs.readFileSync(blogStylePath, 'utf8');
blogStyle = blogStyle.replace(/--accent:\s*#[0-9a-fA-F]+;/g, '--accent: #10b981;');
blogStyle = blogStyle.replace(/--accent-glow:\s*rgba\([^)]+\);/g, '--accent-glow: rgba(16, 185, 129, 0.2);');
blogStyle = blogStyle.replace(/border-bottom-color:\s*#ff9900;/g, 'border-bottom-color: #10b981;');
fs.writeFileSync(blogStylePath, blogStyle, 'utf8');
console.log('✅ Updated public/blog-style.css');

// 3. Helper to replace yellow/gold/orange inline styles in HTML files with Green
function replaceColorsInHtml(content) {
  let updated = content;
  // Replace yellow/orange hex codes
  updated = updated.replace(/#f7df1e/gi, '#10b981');
  updated = updated.replace(/#f0a500/gi, '#10b981');
  updated = updated.replace(/#eab308/gi, '#059669');
  updated = updated.replace(/#d97706/gi, '#059669');
  updated = updated.replace(/#ca8a04/gi, '#047857');
  updated = updated.replace(/#b45309/gi, '#047857');
  updated = updated.replace(/#a16207/gi, '#065f46');
  
  // Replace rgba yellow/orange with green rgba
  updated = updated.replace(/rgba\(247,\s*223,\s*30,\s*([0-9.]+)\)/gi, 'rgba(16, 185, 129, $1)');
  updated = updated.replace(/rgba\(240,\s*165,\s*0,\s*([0-9.]+)\)/gi, 'rgba(16, 185, 129, $1)');
  updated = updated.replace(/rgba\(234,\s*179,\s*8,\s*([0-9.]+)\)/gi, 'rgba(16, 185, 129, $1)');
  
  return updated;
}

// 4. Update all HTML files in blog-java and blog-javascript and root public
const dirsToScan = [
  publicDir,
  path.join(publicDir, 'blog-java'),
  path.join(publicDir, 'blog-javascript'),
  path.join(publicDir, 'blog-c'),
  path.join(publicDir, 'blog-git')
];

dirsToScan.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  files.forEach(f => {
    const p = path.join(dir, f);
    const original = fs.readFileSync(p, 'utf8');
    const modified = replaceColorsInHtml(original);
    if (original !== modified) {
      fs.writeFileSync(p, modified, 'utf8');
    }
  });
});

console.log('✅ Successfully updated all courses and HTML files to unified Green (#10b981) Theme!');
