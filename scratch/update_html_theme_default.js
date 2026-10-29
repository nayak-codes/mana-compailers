const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/blog-cpp');
const allHtml = fs.readdirSync(dir).filter(f => f.endsWith('.html')).map(f => path.join(dir, f));
allHtml.push(path.join(__dirname, '../public/blog-cpp.html'));

console.log('Total HTML files to process:', allHtml.length);

allHtml.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Ensure <html ... class="light-theme">
  if (!content.includes('class="light-theme"') && content.includes('<html')) {
    content = content.replace(/<html(\s+[^>]*)?>/, (m, attrs) => {
      if (!attrs) return '<html lang="te" class="light-theme">';
      if (attrs.includes('class="')) {
        return `<html${attrs.replace(/class="([^"]*)"/, 'class="$1 light-theme"')}>`;
      }
      return `<html class="light-theme"${attrs}>`;
    });
  }

  // Ensure <body class="lang-cpp light-theme">
  content = content.replace(/<body class="lang-cpp">/g, '<body class="lang-cpp light-theme">');
  if (!content.includes('class="lang-cpp light-theme"') && content.includes('<body')) {
    content = content.replace(/<body(\s+[^>]*)?>/, '<body class="lang-cpp light-theme">');
  }

  // Replace tutorial_theme with tutorial_theme_v2 in scripts
  content = content.replace(/localStorage\.getItem\(['"]tutorial_theme['"]\)/g, "localStorage.getItem('tutorial_theme_v2')");
  content = content.replace(/localStorage\.setItem\(['"]tutorial_theme['"]/g, "localStorage.setItem('tutorial_theme_v2'");

  fs.writeFileSync(file, content, 'utf8');
});

console.log('✅ All ' + allHtml.length + ' HTML files updated with <body class="lang-cpp light-theme"> and tutorial_theme_v2.');
