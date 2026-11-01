const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./cpp_curriculum_data.js');

console.log('=== STARTING MODERN C++ COMPREHENSIVE UI ENHANCEMENTS ===\n');

// 1. UPDATE public/blog-cpp/style.css
const cssPath = path.join(__dirname, '..', 'public', 'blog-cpp', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace all body.light-theme with .light-theme
css = css.replace(/body\.light-theme/g, '.light-theme');

// Add font-family and lesson-nav styles if not already present
if (!css.includes('.lesson-nav')) {
  css += `

/* Robust Lesson Navigation Styling matching HTML5 Masterclass */
.lesson-nav {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  margin-top: 40px !important;
  padding-top: 20px !important;
  border-top: 1px solid var(--border) !important;
  flex-wrap: wrap !important;
  gap: 16px !important;
}

.lesson-nav a, .lesson-nav .prev-link {
  text-decoration: none !important;
  color: var(--text) !important;
  font-weight: 600 !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: var(--bg2) !important;
  padding: 10px 18px !important;
  border-radius: 8px !important;
  border: 1px solid var(--border) !important;
  transition: all 0.2s ease !important;
}

.lesson-nav .next-link {
  text-decoration: none !important;
  color: #ffffff !important;
  font-weight: 700 !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: #10b981 !important;
  padding: 10px 22px !important;
  border-radius: 8px !important;
  border: 1px solid #10b981 !important;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3) !important;
  transition: all 0.2s ease !important;
}

.lesson-nav a:hover, .lesson-nav .prev-link:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08) !important;
}

.lesson-nav .next-link:hover {
  background: #059669 !important;
  color: #ffffff !important;
}

/* Details & Summary Quality Improvements */
details {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px 18px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

details summary {
  font-weight: 700 !important;
  color: #10b981 !important;
  font-size: 14.5px !important;
  cursor: pointer !important;
  outline: none !important;
}

.light-theme details summary {
  color: #059669 !important;
}

details[open] summary {
  margin-bottom: 12px !important;
  color: #10b981 !important;
}
`;
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('✅ Updated public/blog-cpp/style.css with light-theme, lesson-nav, and details rules.');

// 2. PROCESS ALL 20 CHAPTERS
const fontGoogle = `<link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />`;

LESSONS.forEach((lesson, idx) => {
  const filePath = path.join(__dirname, '..', 'public', 'blog-cpp', lesson.file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // A. Ensure Noto Sans Telugu in font link
  if (!content.includes('Noto+Sans+Telugu')) {
    content = content.replace(
      /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=JetBrains\+Mono[^"]*" rel="stylesheet" \/>/,
      fontGoogle
    );
    modified = true;
  }

  // B. Ensure <body class="light-theme">
  if (content.includes('<body>')) {
    content = content.replace('<body>', '<body class="light-theme">');
    modified = true;
  }

  // C. Replace raw LaTeX math like $O(1)$, $O(log N)$, $O(N log N)$, $O(N \log N)$
  const mathRegexes = [
    { from: /\$O\(1\)\$/g, to: '<code>O(1)</code>' },
    { from: /\$O\(log\s*N\)\$/gi, to: '<code>O(log N)</code>' },
    { from: /\$O\(N\s*\\?log\s*N\)\$/gi, to: '<code>O(N log N)</code>' },
    { from: /\$O\(N\)\$/g, to: '<code>O(N)</code>' },
    { from: /\$O\(N\^2\)\$/g, to: '<code>O(N²)</code>' }
  ];
  mathRegexes.forEach(m => {
    if (m.from.test(content)) {
      content = content.replace(m.from, m.to);
      modified = true;
    }
  });

  // D. Upgrade plain summary styling to match green font-weight:700
  if (content.includes('<summary style="font-weight:600; cursor:pointer; color:var(--text);">')) {
    content = content.replace(
      /<summary style="font-weight:600; cursor:pointer; color:var(--text);">/g,
      '<summary style="font-weight:700; color:#10b981; font-size:14.5px; cursor:pointer;">'
    );
    modified = true;
  }

  // E. Upgrade unstyled lesson-nav or ensure proper prev/next nav
  const prevLesson = lesson.prev;
  const nextLesson = lesson.next;

  let navHtml = `    <!-- PREV / NEXT NAVIGATION -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:40px; padding-top:20px; border-top:1px solid var(--border); flex-wrap:wrap; gap:16px;">
`;

  if (prevLesson) {
    navHtml += `      <a href="/blog-cpp/${prevLesson.file}" style="text-decoration:none; color:var(--text); font-weight:600; display:inline-flex; align-items:center; gap:8px; background:var(--bg2); padding:10px 18px; border-radius:8px; border:1px solid var(--border);">
        ← మునుపటి అధ్యాయం: ${prevLesson.title}
      </a>\n`;
  } else {
    navHtml += `      <a href="/blog-cpp.html" style="text-decoration:none; color:var(--text); font-weight:600; display:inline-flex; align-items:center; gap:8px; background:var(--bg2); padding:10px 18px; border-radius:8px; border:1px solid var(--border);">
        ⚡ C++ Course HOME (ఇండెక్స్)
      </a>\n`;
  }

  if (nextLesson) {
    navHtml += `      <a href="/blog-cpp/${nextLesson.file}" style="text-decoration:none; color:#ffffff; font-weight:700; display:inline-flex; align-items:center; gap:8px; background:#10b981; padding:10px 22px; border-radius:8px; box-shadow:0 4px 12px rgba(16,185,129,0.3);">
        తర్వాతి అధ్యాయం: ${nextLesson.title} →
      </a>\n`;
  } else {
    navHtml += `      <a href="/blog-cpp.html" style="text-decoration:none; color:#ffffff; font-weight:700; display:inline-flex; align-items:center; gap:8px; background:#10b981; padding:10px 22px; border-radius:8px; box-shadow:0 4px 12px rgba(16,185,129,0.3);">
        🏆 C++ Course HOME (ఇండెక్స్) →
      </a>\n`;
  }
  navHtml += `    </div>`;

  // Compiler CTA Box
  const ctaHtml = `
    <!-- INTERACTIVE COMPILER CTA CARD -->
    <div style="margin-top:40px; background:linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(56,189,248,0.1) 100%); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:24px; text-align:center;">
      <h3 style="margin-top:0; color:var(--text); font-size:20px;">ఈ ప్రాజెక్ట్‌ను లైవ్‌గా మన కంపైలర్‌లో రన్ చేయండి!</h3>
      <p style="color:var(--text2); max-width:650px; margin:8px auto 20px; font-size:14px; line-height:1.6;">
        ఎటువంటి లోకల్ సెటప్ లేకుండా, బ్రౌజర్‌లోనే నేరుగా Modern C++ (GCC 13 / C++20) కంపైలర్‌లో ఈ కోడ్‌ను ఎగ్జిక్యూట్ చేసి రన్‌టైమ్ అవుట్‌పుట్‌ను తనిఖీ చేయండి.
      </p>
      <button onclick="openInteractiveCompiler()" style="background:#10b981; color:#ffffff; border:none; padding:12px 28px; font-size:15px; font-weight:700; border-radius:8px; cursor:pointer; transition:transform 0.15s ease;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        ▶ Launch C++ Interactive Compiler
      </button>
    </div>
`;

  // If chapter has old <div class="lesson-nav">, replace with navHtml + ctaHtml
  if (content.includes('<div class="lesson-nav">')) {
    content = content.replace(/<!-- LESSON NAVIGATION -->\s*<div class="lesson-nav">[\s\S]*?<\/div>/, navHtml + '\n' + ctaHtml);
    modified = true;
  } else if (!content.includes('<!-- INTERACTIVE COMPILER CTA CARD -->') && lesson.num !== 20) {
    // If it doesn't have CTA card, inject before </main>
    const mainClose = '</main>';
    if (content.includes(mainClose)) {
      content = content.replace(mainClose, ctaHtml + '\n  ' + mainClose);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Enhanced UI for Chapter ${lesson.num} (${lesson.file})`);
  }
});

console.log('\n=== ALL UI ENHANCEMENTS APPLIED SUCCESSFULLY! ===');

