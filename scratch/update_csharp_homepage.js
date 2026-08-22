const fs = require('fs');
const path = require('path');
const { wrapCSharpPage, CSHARP_CURRICULUM } = require('./build_csharp_master.js');

const csharpHtmlPath = path.join(__dirname, '..', 'public', 'blog-csharp.html');

console.log('🚀 Updating C# Master Index Page (blog-csharp.html) to match Python 3 Masterclass layout...');

let bodyContent = `
<!-- Quick Start Card -->
<div style="background: linear-gradient(135deg, rgba(139,92,246,0.12), rgba(20,24,32,0.6)); border: 1px solid rgba(139,92,246,0.3); border-radius: 12px; padding: 24px; margin-bottom: 32px;">
  <h3 style="color:#a78bfa; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning C# &amp; .NET 8?</h3>
  <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore C# basics &amp; architecture, CLI tooling &amp; setup, variables &amp; constants, or data types &amp; type conversions:</p>
  <div style="display:flex; gap:12px; flex-wrap:wrap;">
    <a href="/blog-csharp/01-csharp-introduction-features-and-dotnet.html" style="background:linear-gradient(135deg, #8b5cf6, #7c3aed); color:#fff; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Basics &amp; Setup →</a>
    <a href="/blog-csharp/04-csharp-variables-constants-scope-and-var.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Variables &amp; Types →</a>
    <a href="/online-csharp-compiler.html" style="background:var(--bg3); border:1px solid var(--border); color:#a78bfa; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">▶ Try C# Online Compiler →</a>
  </div>
</div>

<!-- Full Curriculum Roadmap Cards -->
<div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
<div class="curriculum-roadmap-container">
`;

CSHARP_CURRICULUM.forEach((phase) => {
  bodyContent += `
  <div class="phase-roadmap-card">
    <div class="phase-roadmap-header">
      <div class="phase-roadmap-title-wrap">
        <span class="phase-roadmap-icon">${phase.icon}</span>
        <div>
          <div class="phase-roadmap-tag">${phase.tag}</div>
          <h3 class="phase-roadmap-title">${phase.title}</h3>
        </div>
      </div>
      <span class="phase-roadmap-badge">${phase.lessons.length} In-Depth Lessons</span>
    </div>
    <p class="phase-roadmap-desc">Foundations of C# syntax, .NET CLR architecture, type safety, memory mechanics, and hands-on code examples.</p>
    <div class="phase-lessons-list">
  `;

  phase.lessons.forEach(l => {
    const numPadded = l.num < 10 ? '0' + l.num : l.num;
    bodyContent += `
        <a href="/blog-csharp/${l.file}" class="curriculum-lesson-row">
          <div class="lesson-row-left">
            <span class="lesson-idx">${numPadded}</span>
            <div class="lesson-info">
              <span class="lesson-title">${l.title}</span>
              <span class="lesson-subtopics">In-depth explanations · Code examples · Memory models · Technical FAQs</span>
            </div>
          </div>
          <div class="lesson-row-right">
            <span class="lesson-btn">Read Chapter <span class="arrow">→</span></span>
          </div>
        </a>
    `;
  });

  bodyContent += `
    </div>
  </div>
  `;
});

bodyContent += `
</div>
`;

const finalHtml = wrapCSharpPage(
  'C# Programming Master Tutorial (2026 Edition)',
  'Comprehensive C# 12 & .NET 8 course covering syntax, variables, data types, type conversion, OOP, LINQ, async/await, and modern software design.',
  null, // currentFile is null for index
  'Index',
  'Master Index',
  'C# 12 & .NET 8 Masterclass',
  'C# Overview · .NET SDK & CLI · First Program · Variables & Constants · Value vs Reference Types · Type Conversion & TryParse()',
  bodyContent,
  null,
  null,
  '01-csharp-introduction-features-and-dotnet.html',
  '1. Introduction, Features & .NET Architecture'
);

fs.writeFileSync(csharpHtmlPath, finalHtml, 'utf8');
console.log('✅ Successfully updated C# Master Index Page (blog-csharp.html) to match Python 3 Masterclass!');
