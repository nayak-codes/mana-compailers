// Updates features, contact, blog.html with clean head, nav, shared footer
const fs = require('fs');
const path = require('path');

const PAGES = [
  {
    file: 'features.html',
    title: 'Features | Our Compiler — Free Online Code Compiler',
    desc: 'Explore Our Compiler features: Monaco editor, Docker sandbox execution, stdin support, 10 languages, and free programming tutorials.',
    canonical: 'https://www.ourcompiler.com/features.html',
    ogTitle: 'Features — Our Compiler'
  },
  {
    file: 'contact.html',
    title: 'Contact Us | Our Compiler — Free Online Code Compiler',
    desc: 'Contact Balanju Solutions for support, feedback, privacy requests, or business inquiries about Our Compiler.',
    canonical: 'https://www.ourcompiler.com/contact.html',
    ogTitle: 'Contact — Our Compiler'
  },
  {
    file: 'blog.html',
    title: 'Tutorials & Guides | Our Compiler — Free Programming Lessons',
    desc: 'Free step-by-step programming tutorials for Python, Java, C++, JavaScript, React, Django, and 40+ technology topics.',
    canonical: 'https://www.ourcompiler.com/blog.html',
    ogTitle: 'Tutorials — Our Compiler'
  }
];

function headBlock(p) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.title}</title>
  <meta name="description" content="${p.desc}" />
  <meta name="author" content="Balanju Solutions" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="canonical" href="${p.canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${p.canonical}" />
  <meta property="og:title" content="${p.ogTitle}" />
  <meta property="og:description" content="${p.desc}" />
  <meta property="og:image" content="https://www.ourcompiler.com/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="apple-touch-icon" href="/logo.png" />
  <link rel="stylesheet" href="/pages.css" />
  <script src="/pages-common.js"></script>
  <script src="/site-nav.js" defer></script>
  <script src="/site-footer.js" defer></script>
</head>
<body>
  <nav class="topnav"></nav>
`;
}

const footerPattern = /<!-- FOOTER -->[\s\S]*<\/footer>\s*<\/body>\s*<\/html>/;
const headerPattern = /<!DOCTYPE html>[\s\S]*?<!-- MAIN CONTENT -->/;

for (const p of PAGES) {
  const filePath = path.join(__dirname, '..', 'public', p.file);
  let html = fs.readFileSync(filePath, 'utf8');
  const mainMatch = html.match(/<!-- MAIN CONTENT -->[\s\S]*?(?=<!-- FOOTER -->)/);
  if (!mainMatch) {
    console.log('Skip (no main):', p.file);
    continue;
  }
  html = headBlock(p) + '\n  ' + mainMatch[0].trim() + '\n\n  <footer class="footer" id="site-footer"></footer>\n</body>\n</html>\n';
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Updated:', p.file);
}
