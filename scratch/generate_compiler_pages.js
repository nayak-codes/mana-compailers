const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const templatePath = path.join(rootDir, 'index.html');

const template = fs.readFileSync(templatePath, 'utf8');

const languages = [
  { id: 'python', name: 'Python', key: 'python3', desc: 'Python 3' },
  { id: 'java', name: 'Java', key: 'java', desc: 'Java' },
  { id: 'c', name: 'C', key: 'c', desc: 'C' },
  { id: 'cpp', name: 'C++', key: 'cpp17', desc: 'C++' },
  { id: 'javascript', name: 'JavaScript', key: 'nodejs', desc: 'JavaScript (Node.js)' },
  { id: 'csharp', name: 'C#', key: 'csharp', desc: 'C# (Mono)' },
  { id: 'go', name: 'Go', key: 'go', desc: 'Go' },
  { id: 'rust', name: 'Rust', key: 'rust', desc: 'Rust' },
  { id: 'php', name: 'PHP', key: 'php', desc: 'PHP' },
  { id: 'ruby', name: 'Ruby', key: 'ruby', desc: 'Ruby' }
];

languages.forEach(lang => {
  const title = `Free Online ${lang.name} Compiler - Run ${lang.desc} Code | Our Compiler`;
  const desc = `Write, compile, and run ${lang.desc} code online instantly. Our Compiler provides a free, fast online ${lang.name} compiler with Monaco editor, syntax highlighting, and stdin support.`;
  const canonical = `https://www.ourcompiler.com/online-${lang.id}-compiler.html`;
  
  let html = template;
  
  // Replace title
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  
  // Replace description
  html = html.replace(/<meta name="description" content="[\s\S]*?" \/>/, `<meta name="description" content="${desc}" />`);
  
  // Replace canonical
  html = html.replace(/<link rel="canonical" href="[\s\S]*?" \/>/, `<link rel="canonical" href="${canonical}" />`);
  
  // Replace Open Graph url and title
  html = html.replace(/<meta property="og:url" content="[\s\S]*?" \/>/, `<meta property="og:url" content="${canonical}" />`);
  html = html.replace(/<meta property="og:title" content="[\s\S]*?" \/>/, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta property="og:description" content="[\s\S]*?" \/>/, `<meta property="og:description" content="${desc}" />`);
  
  // Replace Twitter card url and title
  html = html.replace(/<meta name="twitter:title" content="[\s\S]*?" \/>/, `<meta name="twitter:title" content="${title}" />`);
  html = html.replace(/<meta name="twitter:description" content="[\s\S]*?" \/>/, `<meta name="twitter:description" content="${desc}" />`);
  
  const filename = `online-${lang.id}-compiler.html`;
  const outputPath = path.join(rootDir, filename);
  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`Generated compiler page: ${filename}`);
});
