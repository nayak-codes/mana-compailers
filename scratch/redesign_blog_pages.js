/**
 * redesign_blog_pages.js
 * Centralizes styling for all blog & tutorial HTML files in public/
 * by stripping inline <style> blocks and linking them to blog-style.css.
 * Also appends a language class to <body> tags for correct accent color mapping.
 */

const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, '..', 'public');

const files = fs.readdirSync(publicDir).filter(f => f.startsWith('blog') && f.endsWith('.html'));

let count = 0;
for (const file of files) {
  const fpath = path.join(publicDir, file);
  let html = fs.readFileSync(fpath, 'utf8');

  // Determine language key from filename
  // Examples: blog-java.html -> java, blog-python-syntax.html -> python
  let langKey = 'java';
  if (file.includes('python')) langKey = 'python';
  else if (file.includes('javascript')) langKey = 'javascript';
  else if (file.includes('cpp')) langKey = 'cpp';
  else if (file.includes('blog-c-')) langKey = 'c';
  else if (file.includes('rust')) langKey = 'rust';
  else if (file.includes('go')) langKey = 'go';
  else if (file.includes('php')) langKey = 'php';
  else if (file.includes('ruby')) langKey = 'ruby';

  // 1. Remove inline style tag
  const styleRegex = /<style>[\s\S]*?<\/style>/g;
  if (styleRegex.test(html)) {
    html = html.replace(styleRegex, `<link rel="stylesheet" href="/blog-style.css" />`);
  }

  // 2. Adjust <body> tag to include class="lang-${langKey}"
  const bodyRegex = /<body(\s*[^>]*)>/i;
  const match = html.match(bodyRegex);
  if (match) {
    const existingAttr = match[1];
    // Avoid double-adding
    if (!existingAttr.includes(`lang-${langKey}`)) {
      if (existingAttr.includes('class=')) {
        // Append to existing class attribute
        html = html.replace(bodyRegex, `<body${existingAttr.replace(/class="([^"]*)"/i, `class="$1 lang-${langKey}"`)}>`);
      } else {
        // Create new class attribute
        html = html.replace(bodyRegex, `<body class="lang-${langKey}"${existingAttr}>`);
      }
    }
  }

  fs.writeFileSync(fpath, html, 'utf8');
  count++;
}

console.log(`🎉 Successfully redesigned and linked ${count} tutorial & blog HTML files!`);
