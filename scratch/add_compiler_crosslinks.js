/**
 * Add cross-compiler links section to all online compiler pages.
 * This improves internal linking so search engines understand compiler pages
 * are the PRIMARY pages (like Programiz shows C Compiler, Python Compiler in sitelinks).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const COMPILERS = [
  { file: 'online-python-compiler.html',     name: 'Python Compiler',     emoji: '🐍', slug: 'python',     tutorial: '/blog-python.html' },
  { file: 'online-java-compiler.html',       name: 'Java Compiler',       emoji: '☕', slug: 'java',       tutorial: '/blog-java.html' },
  { file: 'online-c-compiler.html',          name: 'C Compiler',          emoji: '🔵', slug: 'c',          tutorial: '/blog-c.html' },
  { file: 'online-cpp-compiler.html',        name: 'C++ Compiler',        emoji: '⚡', slug: 'cpp',        tutorial: '/blog-cpp.html' },
  { file: 'online-javascript-compiler.html', name: 'JavaScript Compiler', emoji: '🟨', slug: 'javascript', tutorial: '/blog-javascript.html' },
  { file: 'online-csharp-compiler.html',     name: 'C# Compiler',         emoji: '🟣', slug: 'csharp',     tutorial: '/blog-csharp.html' },
  { file: 'online-go-compiler.html',         name: 'Go Compiler',         emoji: '🐹', slug: 'go',         tutorial: '/blog-go.html' },
  { file: 'online-rust-compiler.html',       name: 'Rust Compiler',       emoji: '🦀', slug: 'rust',       tutorial: '/blog-rust.html' },
  { file: 'online-php-compiler.html',        name: 'PHP Compiler',        emoji: '🐘', slug: 'php',        tutorial: '/blog-php.html' },
  { file: 'online-ruby-compiler.html',       name: 'Ruby Compiler',       emoji: '💎', slug: 'ruby',       tutorial: '/blog-ruby.html' },
  { file: 'online-html-editor.html',         name: 'HTML/CSS/JS Editor',  emoji: '🌐', slug: 'html',       tutorial: '/blog-html.html' },
];

function buildCrossLinksSection(currentSlug) {
  const others = COMPILERS.filter(c => c.slug !== currentSlug);
  
  const compilerLinks = others.map(c => 
    `          <a href="/${c.file}" style="background:#0d1117; border:1px solid #30363d; padding:8px 14px; border-radius:8px; color:#58a6ff; text-decoration:none; font-size:13px; white-space:nowrap;">${c.emoji} ${c.name}</a>`
  ).join('\n');

  const current = COMPILERS.find(c => c.slug === currentSlug);
  const tutorialLink = current ? `
      <!-- Tutorial Link -->
      <section style="background:#161b22; border:1px solid #30363d; border-radius:12px; padding:20px; margin-bottom:24px;">
        <h2 style="font-size:16px; color:#fff; margin-bottom:12px; font-family:'Sora',sans-serif;">📚 Learn ${current.name.replace(' Compiler','').replace(' Editor','')} with Free Tutorials</h2>
        <p style="font-size:14px; color:#8b949e; margin-bottom:12px;">New to ${current.name.replace(' Compiler','').replace(' Editor','')}? Start with our step-by-step tutorial guide:</p>
        <a href="${current.tutorial}" style="display:inline-block; background:rgba(88,166,255,0.1); border:1px solid rgba(88,166,255,0.3); color:#58a6ff; padding:10px 20px; border-radius:8px; text-decoration:none; font-size:14px; font-weight:600;">📖 ${current.name.replace(' Compiler','').replace(' Editor','')} Tutorial Guide →</a>
      </section>` : '';

  return `${tutorialLink}
      <!-- Other Online Compilers -->
      <section style="background:#161b22; border:1px solid #30363d; border-radius:12px; padding:20px; margin-bottom:24px;">
        <h2 style="font-size:16px; color:#fff; margin-bottom:12px; font-family:'Sora',sans-serif;">💻 Other Free Online Compilers</h2>
        <div style="display:flex; flex-wrap:wrap; gap:10px;">
${compilerLinks}
        </div>
      </section>`;
}

let updated = 0;
let skipped = 0;

COMPILERS.forEach(compiler => {
  const filePath = path.join(ROOT, compiler.file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  SKIP (not found): ${compiler.file}`);
    skipped++;
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  
  // Check if already has cross-links
  if (html.includes('Other Free Online Compilers')) {
    console.log(`✅ ALREADY HAS: ${compiler.file}`);
    skipped++;
    return;
  }

  const crossLinks = buildCrossLinksSection(compiler.slug);
  
  // Insert before <!-- Footer Links -->
  const footerMarker = '      <!-- Footer Links -->';
  if (html.includes(footerMarker)) {
    html = html.replace(footerMarker, crossLinks + '\n\n      <!-- Footer Links -->');
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ UPDATED: ${compiler.file}`);
    updated++;
  } else {
    console.log(`⚠️  SKIP (no footer marker): ${compiler.file}`);
    skipped++;
  }
});

console.log(`\n🎉 Done! Updated: ${updated} | Skipped: ${skipped}`);
