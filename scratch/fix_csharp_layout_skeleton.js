const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./csharp_curriculum_data');

function fixChapter(num) {
  const lesson = LESSONS.find(l => l.num === num);
  if (!lesson) {
    console.error(`Lesson ${num} not found in curriculum data!`);
    return;
  }

  const filePath = path.join(__dirname, '..', 'public', 'blog-csharp', lesson.file);
  if (!fs.existsSync(filePath)) {
    console.error(`File ${filePath} not found!`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  // Extract <title>
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  const pageTitle = titleMatch ? titleMatch[1].trim() : `${lesson.title} — Modern C# Tutorial | Our Compiler`;

  // Extract <meta name="description">
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const metaDesc = descMatch ? descMatch[1].trim() : `${lesson.title} సమగ్ర తెలుగు గైడ్: ${lesson.subtopics}`;

  // Extract <meta name="keywords">
  const keywMatch = content.match(/<meta\s+name=["']keywords["']\s+content=["']([\s\S]*?)["']/i);
  const metaKeyw = keywMatch ? keywMatch[1].trim() : `csharp tutorial in telugu, learn c# language, ${lesson.title.toLowerCase()}, dotnet 8, c# 12, our compiler`;

  // Extract <main class="content">...</main>
  const mainStart = content.indexOf('<main class="content">');
  const mainEnd = content.lastIndexOf('</main>');
  if (mainStart === -1 || mainEnd === -1) {
    console.error(`Could not locate <main class="content"> in chapter ${num}!`);
    return;
  }

  // Slice inner main content
  const mainInner = content.substring(mainStart + '<main class="content">'.length, mainEnd);

  // Extract the interactive script after main
  const afterMain = content.substring(mainEnd);
  // Match the second script block (the inline logic with copyCode, runCode, openInteractiveCompiler)
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let logicScript = '';
  while ((match = scriptRegex.exec(afterMain)) !== null) {
    if (match[1].includes('openInteractiveCompiler') || match[1].includes('copyCode') || match[1].includes('runCode')) {
      logicScript = match[1];
      break;
    }
  }

  // Sidebar
  const sidebarHtml = buildSidebar(lesson.num);

  // Reconstruct clean HTML
  const cleanHtml = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDesc}" />
  <meta name="keywords" content="${metaKeyw}" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-csharp/${lesson.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-csharp/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org TechArticle Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "${lesson.title} (C# Programming in Telugu)",
    "description": "${metaDesc.replace(/"/g, '\\"')}",
    "articleSection": "${lesson.phaseTag}: ${lesson.phaseTitle}",
    "inLanguage": "te",
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
    "datePublished": "2026-02-01",
    "dateModified": "2026-11-01"
  }
  </script>

  <style>
    /* Inline enhancement overrides to guarantee ivory intro box and green numbers */
    body.light-theme .intro-box {
      background: #fefce8 !important;
      border: 1px solid #fde047 !important;
      border-left: 5px solid #10b981 !important;
      border-radius: 12px !important;
      padding: 22px 24px !important;
      margin-bottom: 32px !important;
      box-shadow: 0 4px 14px rgba(202, 138, 4, 0.08) !important;
    }
    body.light-theme .intro-box h3,
    body.light-theme .intro-box h4 {
      color: #713f12 !important;
      font-weight: 800 !important;
      margin-bottom: 8px !important;
    }
    body.light-theme .intro-box p {
      color: #1e293b !important;
      font-size: 15.5px !important;
      line-height: 1.8 !important;
      margin-bottom: 12px !important;
    }
    body.light-theme .intro-box p:last-child {
      margin-bottom: 0 !important;
    }
    .section-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 22px;
      font-weight: 800;
      color: var(--text);
      margin-top: 42px;
      margin-bottom: 16px;
      border-bottom: 2px solid var(--border);
      padding-bottom: 8px;
    }
    .section-title .num {
      background: #10b981 !important;
      color: #ffffff !important;
      font-size: 13px !important;
      font-weight: 800 !important;
      border-radius: 50% !important;
      width: 28px !important;
      height: 28px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-shrink: 0 !important;
      box-shadow: 0 2px 6px rgba(16, 185, 129, 0.35) !important;
    }
  </style>

  <!-- Interactive Scripts: Accordion & Default Light Theme -->
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
      const currentTheme = localStorage.getItem('tutorial_theme_v2');
      if (currentTheme === 'dark') {
        document.documentElement.classList.remove('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          const body = document.body;
          if (body) body.classList.remove('light-theme');
        });
      } else {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          const body = document.body;
          if (body) body.classList.add('light-theme');
        });
      }
    })();
  </script>
</head>
<body class="lang-csharp light-theme">
<!-- NAV PLACEHOLDER -->
<div id="site-nav-placeholder"></div>

<div class="layout">
${sidebarHtml}

  <!-- MAIN ARTICLE -->
  <main class="content">
${mainInner}
  </main>
</div>

<!-- SITE NAVIGATION LOADER -->
<script src="/site-nav.js" defer></script>

<!-- RUNNER & INTERACTIVE LOGIC -->
<script>
${logicScript}
</script>

</body>
</html>
`;

  fs.writeFileSync(filePath, cleanHtml, 'utf8');
  console.log(`✅ Ch ${num < 10 ? '0' + num : num} (${lesson.file}): Successfully standardized layout skeleton! (Size: ${cleanHtml.length} chars)`);
}

// Fix chapters 3 to 12
for (let n = 3; n <= 12; n++) {
  fixChapter(n);
}

