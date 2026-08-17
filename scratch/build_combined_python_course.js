const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const pythonDir = path.join(baseDir, 'blog-python');

if (!fs.existsSync(pythonDir)) {
  fs.mkdirSync(pythonDir, { recursive: true });
}

// Load all 12 Phases
const phase1 = require('./phase1_data');
const phase2 = require('./phase2_data');
const phase3 = require('./phase3_data');
const phase4 = require('./phase4_data');
const phase5 = require('./phase5_data');
const phase6 = require('./phase6_data');
const phase7 = require('./phase7_data');
const phase8 = require('./phase8_data');
const phase9 = require('./phase9_data');
const phase10 = require('./phase10_data');
const phase11 = require('./phase11_data');
const phase12 = require('./phase12_data');

const CHAPTERS = [
  ...phase1,
  ...phase2,
  ...phase3,
  ...phase4,
  ...phase5,
  ...phase6,
  ...phase7,
  ...phase8,
  ...phase9,
  ...phase10,
  ...phase11,
  ...phase12
];

console.log(`Loaded ${CHAPTERS.length} chapters across 12 phases.`);

// Helper to generate Accordion Sidebar for all 65 Chapters across 12 Phases
function generateUnifiedAccordionSidebar(currentSlug = null) {
  let html = `    <div class="sidebar-accordion">\n`;

  const phasesMap = [
    { id: 'phase1', num: '01', title: 'Python Basics', icon: '📂', count: 5 },
    { id: 'phase2', num: '02', title: 'Operators & Flow', icon: '⚡', count: 4 },
    { id: 'phase3', num: '03', title: 'Strings & Collections', icon: '📦', count: 5 },
    { id: 'phase4', num: '04', title: 'Functions & Scope', icon: '🧩', count: 5 },
    { id: 'phase5', num: '05', title: 'Modules & Packages', icon: '📦', count: 5 },
    { id: 'phase6', num: '06', title: 'Exceptions & Files', icon: '🛡️', count: 5 },
    { id: 'phase7', num: '07', title: 'Object-Oriented OOP', icon: '🏗️', count: 6 },
    { id: 'phase8', num: '08', title: 'Advanced Python', icon: '🚀', count: 6 },
    { id: 'phase9', num: '09', title: 'Databases & APIs', icon: '💾', count: 6 },
    { id: 'phase10', num: '10', title: 'Web Development', icon: '🌐', count: 6 },
    { id: 'phase11', num: '11', title: 'Data Science & AI', icon: '🤖', count: 6 },
    { id: 'phase12', num: '12', title: 'Automation & DevOps', icon: '⚙️', count: 6 }
  ];

  phasesMap.forEach(ph => {
    const chaptersInPhase = CHAPTERS.filter(c => c.phaseId === ph.id);
    const hasActive = chaptersInPhase.some(c => c.slug === currentSlug);
    const isOpen = hasActive || (currentSlug === null && ph.id === 'phase1');
    const activeHeaderClass = isOpen ? ' active' : '';
    const openContentClass = isOpen ? ' open' : '';

    html += `      <!-- Phase ${ph.num}: ${ph.title} -->\n`;
    html += `      <button class="accordion-header${activeHeaderClass}" onclick="toggleAccordion(this)">\n`;
    html += `        <div class="accordion-header-main">\n`;
    html += `          <span class="phase-icon-box">${ph.icon}</span>\n`;
    html += `          <div class="phase-info">\n`;
    html += `            <span class="phase-tag">Phase ${ph.num}</span>\n`;
    html += `            <span class="phase-title">${ph.title}</span>\n`;
    html += `          </div>\n`;
    html += `        </div>\n`;
    html += `        <div class="accordion-header-meta">\n`;
    html += `          <span class="phase-count-badge">${ph.count} Ch</span>\n`;
    html += `          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">\n`;
    html += `            <polyline points="9 18 15 12 9 6"></polyline>\n`;
    html += `          </svg>\n`;
    html += `        </div>\n`;
    html += `      </button>\n`;
    html += `      <div class="accordion-content${openContentClass}">\n`;

    chaptersInPhase.forEach(ch => {
      const isActive = ch.slug === currentSlug ? ' class="active"' : '';
      html += `        <a href="/blog-python/${ch.slug}.html"${isActive}>${ch.badge}</a>\n`;
    });

    html += `      </div>\n\n`;
  });

  html += `    </div>\n`;
  return html;
}

// Generate each comprehensive chapter HTML
CHAPTERS.forEach((ch, idx) => {
  const prevChapter = CHAPTERS[idx - 1];
  const nextChapter = CHAPTERS[idx + 1];
  const sidebarHtml = generateUnifiedAccordionSidebar(ch.slug);

  const sectionsHtml = ch.sections.map(s => `
    <div class="section-title"><span class="num">${s.title.split('.')[0]}</span>${s.title.substring(s.title.indexOf('.') + 1).trim()}</div>
    <div class="section-body">
      ${s.body}
      ${s.code ? `
      <div style="margin-top: 16px; margin-bottom: 12px;">
        ${s.codeTitle ? `<div style="font-size:13.5px; font-weight:700; color:#10b981; margin-bottom:6px;">💻 ${s.codeTitle}</div>` : ''}
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">Python 3</span>
            <a class="try-btn" href="/online-python-compiler.html">▶ Run in Compiler</a>
          </div>
          <pre><code>${s.code}</code></pre>
        </div>
      </div>` : ''}
      ${s.explanation || ''}
    </div>
  `).join('\n');

  const faqsHtml = ch.faqs.map(f => `
    <div class="faq-card">
      <h4><span style="background:rgba(16,185,129,0.15); color:#10b981; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q</span> ${f.q}</h4>
      <p>${f.a}</p>
    </div>
  `).join('\n');

  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${ch.title} — Python 3 Master Tutorial`,
    "description": ch.desc,
    "articleSection": ch.phaseTitle,
    "author": {
      "@type": "Organization",
      "name": "Our Compiler Technical Editorial Team",
      "url": "https://www.ourcompiler.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Our Compiler",
      "url": "https://www.ourcompiler.com"
    },
    "datePublished": "2026-01-15",
    "dateModified": "2026-08-14"
  }, null, 2);

  const faqSchemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": ch.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  }, null, 2);

  const pageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${ch.title} — Python 3 Tutorial | Our Compiler</title>
  <meta name="description" content="${ch.desc}" />
  <meta name="keywords" content="python tutorial, learn python, ${ch.title.toLowerCase()}, python online compiler, python automation, web scraping, python testing" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-python/${ch.slug}.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org Structured Data -->
  <script type="application/ld+json">
${schemaJson}
  </script>
  <script type="application/ld+json">
${faqSchemaJson}
  </script>

  <!-- Accordion Toggle, Syntax Highlighter & Code Preload Script -->
  <script>
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) {
        content.classList.remove('open');
        btn.classList.remove('active');
      } else {
        content.classList.add('open');
        btn.classList.add('active');
      }
    }

    // Client-side Python Syntax Highlighter (Monaco / VS Code Dark+ styling)
    function highlightPythonCode(rawCode) {
      const tokens = [];
      const pushToken = (cls, text) => {
        const id = tokens.length;
        tokens.push(\`<span class="\${cls}">\${text}</span>\`);
        return \`___PYTHON_TOK_\${id}___\`;
      };

      // 1. Comments
      let code = rawCode.replace(/(#.*$)/gm, m => pushToken('cm', m));

      // 2. Strings: f"...", "...", '...', """...""", '''...'''
      code = code.replace(/("""[\\s\\S]*?"""|'''[\\s\\S]*?'''|f?"[^"\\\\]*(?:\\\\.[^"\\\\]*)*"|f?'[^'\\\\]*(?:\\\\.[^'\\\\]*)*'|r"[^"\\\\]*(?:\\\\.[^"\\\\]*)*"|r'[^'\\\\]*(?:\\\\.[^'\\\\]*)*')/g, m => pushToken('st', m));

      // 3. Keywords & Decorators
      const kwList = ['import','from','as','def','return','class','if','elif','else','while','for','in','break','continue','pass','try','except','finally','with','lambda','global','nonlocal','and','or','not','is','yield','async','await','raise','assert','True','False','None','self','super','property','abstractmethod','dataclass','field','Enum','auto','Mapped','mapped_column','models','views','serializers','viewsets','routers','admin','fixture','mark','parametrize'];
      const kwRegex = new RegExp(\`\\\\b(\${kwList.join('|')})\\\\b\`, 'g');
      code = code.replace(kwRegex, m => pushToken('kw', m));

      // 4. Built-in Functions & Standard Exceptions & Dunders
      const fnList = ['print','len','range','type','isinstance','issubclass','id','input','int','float','str','list','dict','set','tuple','sum','min','max','round','map','zip','enumerate','sorted','reversed','abs','pow','open','help','dir','filter','next','iter','reduce','connect','cursor','execute','executemany','fetchone','fetchall','fetchmany','commit','rollback','create_engine','select','Session','relationship','get','post','put','patch','delete','raise_for_status','json','jsonify','render_template','redirect','url_for','generate_password_hash','check_password_hash','get_object_or_404','login','logout','authenticate','fit','predict','transform','fit_transform','read_csv','read_excel','to_csv','to_excel','groupby','merge','concat','dropna','fillna','describe','info','head','tail','corr','plot','show','savefig','subplots','tight_layout','dump','load','raises','patch','breakpoint','ABC','Exception','StopIteration','ValueError','TypeError','ZeroDivisionError','KeyError','IndexError','FileNotFoundError','PermissionError','OSError','FileExistsError','AttributeError','__init__','__str__','__repr__','__len__','__eq__','__add__','__enter__','__exit__','__iter__','__next__'];
      const fnRegex = new RegExp(\`\\\\b(\${fnList.join('|')})\\\\b\`, 'g');
      code = code.replace(fnRegex, m => pushToken('fn', m));

      // 5. Numbers
      code = code.replace(/\\b(\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?)\\b/g, m => pushToken('nu', m));

      // 6. Restore Tokens
      code = code.replace(/___PYTHON_TOK_(\\d+)___/g, (_, id) => tokens[id]);
      return code;
    }

    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: "Inter", sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;';
          const updateText = () => {
            const isLight = document.body.classList.contains('light-theme');
            toggleBtn.innerHTML = isLight ? '🌙 Dark' : '☀️ Light';
          };
          updateText();
          toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.documentElement.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateText();
          });
          topnav.appendChild(toggleBtn);
        }

        // Apply syntax highlighting & Copy/Run actions to all code blocks
        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;

          const rawCode = codeEl.textContent;
          codeEl.innerHTML = highlightPythonCode(rawCode);

          let actionsContainer = header.querySelector('.code-actions');
          if (!actionsContainer) {
            actionsContainer = document.createElement('div');
            actionsContainer.className = 'code-actions';
            actionsContainer.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-left: auto;';
            const tryBtn = header.querySelector('.try-btn');
            if (tryBtn) actionsContainer.appendChild(tryBtn);
            header.appendChild(actionsContainer);
          }

          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn';
          copyBtn.innerHTML = '📋 Copy';
          copyBtn.style.cssText = 'background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: "Inter", sans-serif; white-space: nowrap;';
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(rawCode).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
            });
          });
          actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);

          const tryBtn = actionsContainer.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_python3', rawCode);
              window.location.href = '/online-python-compiler.html';
            });
          }
        });

        document.querySelectorAll('.try-box').forEach(tryBox => {
          const codeEl = tryBox.querySelector('pre code');
          const runBtn = tryBox.querySelector('.run-btn');
          if (codeEl) {
            const rawCode = codeEl.textContent;
            codeEl.innerHTML = highlightPythonCode(rawCode);
            if (runBtn) {
              runBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.setItem('code_python3', rawCode);
                window.location.href = '/online-python-compiler.html';
              });
            }
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-python">

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html" class="active">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <!-- LEFT ACCORDION SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar-heading">Python 3 Master Course</div>
    <a href="/blog-python.html" class="sidebar-home-link">🐍 Python Course HOME</a>

${sidebarHtml}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-python-compiler.html" style="color:#10b981; font-weight:700;">▶ Try Python 3 Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-java.html">Java Course (27 Lessons)</a>
    <a href="/blog-c.html">C Language (20 Lessons)</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-python.html">Python 3</a><span class="sep">›</span>
      <span class="current">Chapter ${ch.num}: ${ch.badge}</span>
    </div>

    <h1 class="page-title">${ch.title}</h1>

    <div class="page-meta">
      <span class="badge">🐍 Python 3.12+</span>
      <span class="badge">🟢 Chapter ${ch.num} of ${CHAPTERS.length}</span>
      <span class="badge">📂 ${ch.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Subtopics Pill Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>${ch.subtopics}</span>
    </div>

    <div class="intro-box">
      ${ch.desc}
    </div>

${sectionsHtml}

    <div class="callout">
      <div class="callout-title">⚠️ Common Developer Pitfall: ${ch.mistake.title}</div>
      <p>${ch.mistake.text}</p>
    </div>

    <div class="try-box">
      <div class="try-title">💻 Hands-on Interactive Practice Challenge</div>
      <p>${ch.tryIt.desc}</p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Python 3 Practice Challenge</span>
          <a class="try-btn" href="/online-python-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>${ch.tryIt.code}</code></pre>
      </div>
      <a class="run-btn" href="/online-python-compiler.html">Run This Challenge in Online Python IDE →</a>
    </div>

    <div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
${faqsHtml}

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy & tested on Python 3.12+ runtime · Last updated August 2026</span>
      </div>
    </div>

    <div class="nav-footer">
      ${prevChapter ? `
      <a href="${prevChapter.slug}.html" class="nav-btn">
        <span class="label">← Previous Chapter</span>
        <span class="title">${prevChapter.badge}</span>
      </a>` : `
      <a href="/blog-python.html" class="nav-btn">
        <span class="label">← Python Overview</span>
        <span class="title">Course Index</span>
      </a>`}

      ${nextChapter ? `
      <a href="${nextChapter.slug}.html" class="nav-btn" style="text-align:right;">
        <span class="label">Next Chapter →</span>
        <span class="title">${nextChapter.badge}</span>
      </a>` : `
      <a href="/online-python-compiler.html" class="nav-btn" style="text-align:right;">
        <span class="label">Course Completed 🎉</span>
        <span class="title">▶ Practice in Python IDE</span>
      </a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(path.join(pythonDir, `${ch.slug}.html`), pageHtml, 'utf8');
  console.log(`✅ Generated Chapter ${ch.num}: public/blog-python/${ch.slug}.html`);
});

// Update Master Hub public/blog-python.html
const hubSidebar = generateUnifiedAccordionSidebar(null);

// Build Modern 12-Phase Visual Roadmap for blog-python.html
const phasesMeta = [
  { id: 'phase1', num: '01', title: 'Phase 1: Python Basics', desc: 'Foundations of Python syntax, memory references, dynamic data types, and console I/O.', icon: '📂' },
  { id: 'phase2', num: '02', title: 'Phase 2: Operators & Control Flow', desc: 'Arithmetic, logical, comparison operators, conditional branching, and while/for loops.', icon: '⚡' },
  { id: 'phase3', num: '03', title: 'Phase 3: Strings & Collections', desc: 'Strings, Lists, Tuples, Dictionaries, Sets, and high-performance comprehensions.', icon: '📦' },
  { id: 'phase4', num: '04', title: 'Phase 4: Functions & Reusable Code', desc: 'Function definitions, arguments (*args, **kwargs), variable scope, and lambdas.', icon: '🧩' },
  { id: 'phase5', num: '05', title: 'Phase 5: Modules and Packages', desc: 'Standard libraries, importing, custom packages, pip, and virtual environments.', icon: '📦' },
  { id: 'phase6', num: '06', title: 'Phase 6: Exception & File Handling', desc: 'try-except-finally error handling, text, CSV, and JSON file processing.', icon: '🛡️' },
  { id: 'phase7', num: '07', title: 'Phase 7: Object-Oriented Programming', desc: 'Classes, encapsulation, inheritance, polymorphism, dataclasses, and magic methods.', icon: '🏗️' },
  { id: 'phase8', num: '08', title: 'Phase 8: Advanced Python', desc: 'Iterators, generators, decorators, context managers, regex, and memory profiling.', icon: '🚀' },
  { id: 'phase9', num: '09', title: 'Phase 9: Databases and APIs', desc: 'SQLite, SQL injection protection, SQLAlchemy ORM, and REST APIs.', icon: '💾' },
  { id: 'phase10', num: '10', title: 'Phase 10: Web Development', desc: 'Flask, Jinja2, Django MTV architecture, Django ORM, Admin, Forms, and DRF.', icon: '🌐' },
  { id: 'phase11', num: '11', title: 'Phase 11: Data Science and AI', desc: 'NumPy vectorization, Pandas DataFrames, Matplotlib & Seaborn, and Scikit-Learn ML.', icon: '🤖' },
  { id: 'phase12', num: '12', title: 'Phase 12: Automation and Professional Skills', desc: 'Web scraping, Excel/PDF/Email automation, logging, pytest, Git, and Docker CI/CD.', icon: '⚙️' }
];

const hubRoadmapCards = phasesMeta.map(ph => {
  const chaptersInPhase = CHAPTERS.filter(c => c.phaseId === ph.id);
  return `
    <div class="phase-roadmap-card">
      <div class="phase-roadmap-header">
        <div class="phase-roadmap-title-wrap">
          <span class="phase-roadmap-icon">${ph.icon}</span>
          <div>
            <div class="phase-roadmap-tag">PHASE ${ph.num}</div>
            <h3 class="phase-roadmap-title">${ph.title}</h3>
          </div>
        </div>
        <span class="phase-roadmap-badge">${chaptersInPhase.length} In-Depth Lessons</span>
      </div>
      <p class="phase-roadmap-desc">${ph.desc}</p>
      <div class="phase-lessons-list">
        ${chaptersInPhase.map(c => `
          <a href="/blog-python/${c.slug}.html" class="curriculum-lesson-row">
            <div class="lesson-row-left">
              <span class="lesson-idx">${c.num < 10 ? '0' + c.num : c.num}</span>
              <div class="lesson-info">
                <span class="lesson-title">${c.title}</span>
                <span class="lesson-subtopics">${c.subtopics}</span>
              </div>
            </div>
            <div class="lesson-row-right">
              <span class="lesson-btn">Read Chapter <span class="arrow">→</span></span>
            </div>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}).join('\n');

const hubHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Python 3 Master Tutorial & Complete Course (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master Python 3 from complete beginner to advanced with our in-depth combined curriculum, collapsible roadmap across 12 phases, live code executions, and interview prep." />
  <meta name="keywords" content="python tutorial, python 3 course, learn python online, python basics, python data science, python machine learning, python web development, python automation, web scraping, python testing, pytest, git" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-python.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-python/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org Course Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Python 3 Complete Masterclass (2026 Edition)",
    "description": "Comprehensive Python 3 course covering syntax, operators, control flow, strings, collections, functions, modules, packages, exception handling, file processing, OOP, generators, decorators, regex, memory profiling, databases, REST APIs, Flask, Django, NumPy, Pandas, Data Visualization, Machine Learning, Web Scraping, Automation, and Testing with Pytest.",
    "provider": {
      "@type": "Organization",
      "name": "Our Compiler",
      "url": "https://www.ourcompiler.com"
    },
    "educationalLevel": "Beginner to Advanced",
    "isAccessibleForFree": true
  }
  </script>

  <!-- Accordion Toggle & Theme Script -->
  <script>
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) {
        content.classList.remove('open');
        btn.classList.remove('active');
      } else {
        content.classList.add('open');
        btn.classList.add('active');
      }
    }

    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: "Inter", sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;';
          const updateText = () => {
            const isLight = document.body.classList.contains('light-theme');
            toggleBtn.innerHTML = isLight ? '🌙 Dark' : '☀️ Light';
          };
          updateText();
          toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.documentElement.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateText();
          });
          topnav.appendChild(toggleBtn);
        }
      });
    })();
  </script>
</head>
<body class="lang-python">

<!-- TOP NAVIGATION -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html" class="active">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar-heading">Python 3 Master Course</div>
    <a href="/blog-python.html" class="sidebar-home-link active">🐍 Python Course HOME</a>

${hubSidebar}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-python-compiler.html" style="color:#10b981; font-weight:700;">▶ Try Python 3 Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-java.html">Java Course (27 Lessons)</a>
    <a href="/blog-c.html">C Language (20 Lessons)</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">Python 3 Masterclass</span>
    </div>

    <h1 class="page-title">Python 3 Programming Master Tutorial</h1>

    <div class="page-meta">
      <span class="badge">🐍 Python 3.12+</span>
      <span class="badge">🟢 ${CHAPTERS.length} In-Depth Combined Chapters</span>
      <span class="badge">📂 Collapsible Interactive Roadmap (12 Phases)</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's Python 3 Master Course</strong>. Python is the world's #1 programming language powering Artificial Intelligence, Machine Learning, Data Science, Web Development (Django/FastAPI/Flask), Cybersecurity, and Cloud Automation. Each chapter in this masterclass combines multiple interconnected topics into a thorough, hands-on learning experience with runnable code examples.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(16,185,129,0.12), rgba(20,24,32,0.6)); border: 1px solid rgba(16,185,129,0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore foundations, collections, functions, files, OOP, advanced metaprogramming, databases, web development, data science, or automation & professional skills:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-python/01-python-introduction-features-and-setup.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#fff; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-python/06-python-operators-complete-guide.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Operators →</a>
        <a href="/blog-python/10-python-strings-mastery.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Collections →</a>
        <a href="/blog-python/15-python-functions-fundamentals.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 4: Functions →</a>
        <a href="/blog-python/20-python-modules-and-import-system.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: Modules →</a>
        <a href="/blog-python/25-python-exceptions-and-error-handling.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 6: Files →</a>
        <a href="/blog-python/30-python-oop-classes-objects-and-init.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 7: OOP →</a>
        <a href="/blog-python/36-python-iterators-generators-and-expressions.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 8: Advanced →</a>
        <a href="/blog-python/42-python-sqlite-and-sql-fundamentals.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 9: Databases →</a>
        <a href="/blog-python/48-python-flask-fundamentals-and-routing.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 10: Web Dev →</a>
        <a href="/blog-python/54-python-numpy-arrays-and-vectorization.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 11: Data Science →</a>
        <a href="/blog-python/60-python-web-scraping-and-browser-automation.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#fff; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 12: Automation →</a>
      </div>
    </div>

    <!-- Full Curriculum Roadmap Cards -->
    <div class="section-title"><span class="num">📚</span> Master Course Curriculum (${CHAPTERS.length} Comprehensive Chapters)</div>
    <div class="curriculum-roadmap-container">
${hubRoadmapCards}
    </div>

    <div class="author" style="margin-top:40px;">
      <div class="avatar">OC</div>
      <div>
        <strong>Curated by Our Compiler Technical Editorial Team</strong><br>
        <span>Published for 2026 Academic & Industry Reference · 100% Free & Open Access</span>
      </div>
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(baseDir, 'blog-python.html'), hubHtml, 'utf8');
console.log(`✅ Updated public/blog-python.html and generated all ${CHAPTERS.length} chapters including PHASE 12!`);
