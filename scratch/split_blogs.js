const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

const languages = [
  { id: 'python', name: 'Python', accent: '#3fb950', editorLang: 'python3' },
  { id: 'java', name: 'Java', accent: '#f0a500', editorLang: 'java' },
  { id: 'c', name: 'C', accent: '#58a6ff', editorLang: 'c' },
  { id: 'cpp', name: 'C++', accent: '#e3b341', editorLang: 'cpp17' },
  { id: 'javascript', name: 'JavaScript', accent: '#f1e05a', editorLang: 'nodejs' },
  { id: 'go', name: 'Go', accent: '#00add8', editorLang: 'go' },
  { id: 'rust', name: 'Rust', accent: '#f74c00', editorLang: 'rust' },
  { id: 'php', name: 'PHP', accent: '#8892bf', editorLang: 'php' },
  { id: 'ruby', name: 'Ruby', accent: '#cc342d', editorLang: 'ruby' }
];

const topics = [
  { key: 'syntax', id: 's1', label: 'Syntax & Output' },
  { key: 'variables', id: 's2', label: 'Variables & Types' },
  { key: 'conditionals', id: 's3', label: 'Conditionals' },
  { key: 'loops', id: 's4', label: 'Loops & Iterators' },
  { key: 'functions', id: 's5', label: 'Functions & Methods' },
  { key: 'collections', id: 's6', label: 'Arrays & Collections' },
  { key: 'oop', id: 's7', label: 'OOP & Advanced' }
];

// Helper to escape regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

languages.forEach(lang => {
  const filePath = path.join(publicDir, `blog-${lang.id}.html`);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Extract the sidebar links and text
  // We need to find the sidebar links inside the <aside class="sidebar">...</aside> block
  const sidebarRegex = /<aside class="sidebar">([\s\S]*?)<\/aside>/;
  const sidebarMatch = html.match(sidebarRegex);
  if (!sidebarMatch) {
    console.error(`Sidebar not found in ${lang.id}`);
    return;
  }

  const sidebarContent = sidebarMatch[1];
  
  // Parse the labels of the sidebar sections
  // e.g. <a href="#s1">Syntax &amp; Output</a>
  const labelMatches = [...sidebarContent.matchAll(/<a href="#(s\d|intro)"[^>]*>([\s\S]*?)<\/a>/gi)];
  const labelMap = {};
  labelMatches.forEach(m => {
    labelMap[m[1].toLowerCase()] = m[2].trim();
  });

  const getLabel = (id, fallback) => {
    return labelMap[id.toLowerCase()] || fallback;
  };

  // Get labels for next/prev links
  const homeLabel = getLabel('intro', `${lang.name} HOME`);
  const tLabels = topics.map(t => ({
    ...t,
    label: getLabel(t.id, t.label)
  }));

  // Helper to generate the sidebar for a specific active page
  const generateSidebar = (activeKey) => {
    let sb = `\n    <div class="sidebar-heading">${lang.name} Tutorial</div>\n`;
    sb += `    <a href="/blog-${lang.id}.html"${activeKey === 'home' ? ' class="active"' : ''}>${homeLabel}</a>\n`;
    tLabels.forEach(t => {
      sb += `    <a href="/blog-${lang.id}-${t.key}.html"${activeKey === t.key ? ' class="active"' : ''}>${t.label}</a>\n`;
    });

    sb += `\n    <div class="sidebar-heading">Reference</div>\n`;
    sb += `    <a href="/blog.html">All Tutorials</a>\n`;
    sb += `    <a href="/?lang=${lang.editorLang}">▶ Try ${lang.name} Online</a>\n\n`;

    sb += `    <div class="sidebar-heading">Other Languages</div>\n`;
    languages.forEach(other => {
      if (other.id !== lang.id) {
        sb += `    <a href="/blog-${other.id}.html">${other.name}</a>\n`;
      }
    });
    return sb;
  };

  // Extract stylesheet/head boilerplate
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/);
  const headContent = headMatch[1];

  // We want to extract each section from the <main class="content"> block
  // Let's identify the content of <main class="content">
  const contentRegex = /<main class="content">([\s\S]*?)<\/main>/;
  const contentMatch = html.match(contentRegex);
  if (!contentMatch) {
    console.error(`Content not found in ${lang.id}`);
    return;
  }

  const contentBody = contentMatch[1];

  // The content contains:
  // - Breadcrumbs
  // - Title & meta & intro-box (belonging to home page)
  // - Several <div class="section" id="s1">...</div> blocks
  // - Footer/next-prev navigation

  // Let's extract the introductory section (everything from the beginning of main up to the first <div class="section")
  const introEndIdx = contentBody.indexOf('<div class="section"');
  let introHtml = contentBody.substring(0, introEndIdx).trim();

  // Find all section divs
  const sections = [];
  const sectionRegex = /<div class="section" id="s\d">[\s\S]*?<\/div>\s*<\/div>/g;
  
  // Wait, let's parse using a stateful index of section boundaries
  let tempContent = contentBody;
  tLabels.forEach((t, idx) => {
    const startStr = `<div class="section" id="${t.id}">`;
    const startIdx = tempContent.indexOf(startStr);
    if (startIdx === -1) {
      console.warn(`Section ${t.id} not found in ${lang.id}`);
      return;
    }
    
    // Find matching closing div
    // Since each section contains a code-block div and other divs, let's find the closing tag
    // The structure is:
    // <div class="section" id="s1">
    //   <div class="section-title">...</div>
    //   ...
    //   <div class="code-block">
    //     ...
    //   </div>
    // </div>
    // So the section ends with a </div> that closes `<div class="section"`.
    // Let's scan forward counting divs to find the matching closing tag.
    let divCount = 0;
    let scanIdx = startIdx;
    let endIdx = -1;
    while (scanIdx < tempContent.length) {
      if (tempContent.substring(scanIdx, scanIdx + 4) === '<div') {
        divCount++;
        scanIdx += 4;
      } else if (tempContent.substring(scanIdx, scanIdx + 6) === '</div') {
        divCount--;
        if (divCount === 0) {
          endIdx = scanIdx + 6;
          break;
        }
        scanIdx += 6;
      } else {
        scanIdx++;
      }
    }

    if (endIdx !== -1) {
      const sectionHtml = tempContent.substring(startIdx, endIdx);
      sections.push({ key: t.key, id: t.id, label: t.label, html: sectionHtml });
    }
  });

  // Generate HOME page (blog-[lang].html)
  const makeFullPage = (activeKey, pageTitle, mainBodyHtml, prevLink, prevTitle, nextLink, nextTitle) => {
    // Generate next/prev navigation footer
    let navFooter = `<div class="nav-footer">\n`;
    if (prevLink) {
      navFooter += `      <a href="${prevLink}" class="nav-btn">\n`;
      navFooter += `        <span class="label">← Previous</span>\n`;
      navFooter += `        <span class="title">${prevTitle}</span>\n`;
      navFooter += `      </a>\n`;
    } else {
      navFooter += `      <a href="/blog.html" class="nav-btn">\n`;
      navFooter += `        <span class="label">← All Tutorials</span>\n`;
      navFooter += `        <span class="title">Learning Hub</span>\n`;
      navFooter += `      </a>\n`;
    }

    if (nextLink) {
      navFooter += `      <a href="${nextLink}" class="nav-btn" style="text-align:right;">\n`;
      navFooter += `        <span class="label">Next →</span>\n`;
      navFooter += `        <span class="title">${nextTitle}</span>\n`;
      navFooter += `      </a>\n`;
    } else {
      navFooter += `      <a href="/blog.html" class="nav-btn" style="text-align:right;">\n`;
      navFooter += `        <span class="label">All Tutorials →</span>\n`;
      navFooter += `        <span class="title">Learning Hub</span>\n`;
      navFooter += `      </a>\n`;
    }
    navFooter += `    </div>`;

    // Construct the HTML page
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageTitle} | Our Compiler</title>
  <meta name="description" content="Learn ${lang.name} — ${pageTitle.toLowerCase()} with clear explanations and interactive execution." />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0d1117; --bg2: #161b22; --bg3: #21262d;
      --border: #30363d; --accent: ${lang.accent}; --blue: #58a6ff;
      --text: #e6edf3; --text2: #8b949e; --text3: #484f58;
      --sidebar-w: 260px;
    }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); line-height: 1.7; min-height: 100vh; }

    /* TOP NAV */
    .topnav {
      position: sticky; top: 0; z-index: 100;
      background: var(--bg2); border-bottom: 1px solid var(--border);
      display: flex; align-items: center; gap: 0; height: 48px;
      overflow-x: auto; padding: 0 12px;
    }
    .topnav a {
      color: var(--text2); text-decoration: none; font-size: 13px; font-weight: 500;
      padding: 0 14px; height: 48px; display: flex; align-items: center;
      border-bottom: 3px solid transparent; white-space: nowrap; transition: color .2s;
    }
    .topnav a:hover { color: var(--text); }
    .topnav a.active { color: var(--accent); border-bottom-color: var(--accent); }
    .topnav .brand { font-weight: 700; color: var(--text); font-size: 14px; margin-right: 8px; padding-right: 12px; border-right: 1px solid var(--border); }

    /* LAYOUT */
    .layout { display: flex; min-height: calc(100vh - 48px); }

    /* SIDEBAR */
    .sidebar {
      width: var(--sidebar-w); flex-shrink: 0;
      background: var(--bg2); border-right: 1px solid var(--border);
      position: sticky; top: 48px; height: calc(100vh - 48px);
      overflow-y: auto; padding: 20px 0;
    }
    .sidebar::-webkit-scrollbar { width: 4px; }
    .sidebar::-webkit-scrollbar-thumb { background: var(--bg3); border-radius: 2px; }
    .sidebar-heading {
      font-size: 11px; font-weight: 700; letter-spacing: 1px;
      text-transform: uppercase; color: var(--text3);
      padding: 8px 20px 4px; margin-top: 12px;
    }
    .sidebar-heading:first-child { margin-top: 0; }
    .sidebar a {
      display: block; padding: 7px 20px; font-size: 13.5px; color: var(--text2);
      text-decoration: none; border-left: 3px solid transparent; transition: all .15s;
    }
    .sidebar a:hover { color: var(--text); background: var(--bg3); }
    .sidebar a.active { color: var(--accent); border-left-color: var(--accent); background: rgba(88,166,255,.06); font-weight: 600; }

    /* CONTENT */
    .content { flex: 1; min-width: 0; padding: 40px 48px 80px; max-width: 860px; }

    /* BREADCRUMB */
    .breadcrumb { font-size: 13px; color: var(--text2); margin-bottom: 24px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
    .breadcrumb a { color: var(--blue); text-decoration: none; }
    .breadcrumb a:hover { text-decoration: underline; }
    .breadcrumb span { color: var(--text3); }

    /* TITLE BLOCK */
    .page-title { font-size: 36px; font-weight: 700; color: var(--text); margin-bottom: 8px; line-height: 1.2; }
    .page-meta { font-size: 13px; color: var(--text2); margin-bottom: 28px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    .badge { display: inline-flex; align-items: center; gap: 5px; background: var(--bg3); border: 1px solid var(--border); border-radius: 20px; padding: 3px 12px; font-size: 12px; }

    /* INTRO BOX */
    .intro-box { background: linear-gradient(135deg, rgba(88,166,255,.1), rgba(88,166,255,.04)); border: 1px solid rgba(88,166,255,.3); border-radius: 12px; padding: 20px 24px; margin-bottom: 36px; }
    .intro-box p { margin: 0; color: #c9d1d9; font-size: 15px; line-height: 1.75; }

    /* SECTIONS */
    .section { margin-bottom: 48px; scroll-margin-top: 64px; }
    .section-title { font-size: 24px; font-weight: 700; color: var(--text); margin-bottom: 12px; padding-bottom: 10px; border-bottom: 2px solid var(--border); display: flex; align-items: center; gap: 10px; }
    .section-title .num { background: var(--accent); color: #000; font-size: 13px; font-weight: 700; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .section p { color: #c9d1d9; font-size: 15px; margin-bottom: 16px; }

    /* CODE BLOCK */
    .code-block { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; margin: 20px 0; overflow: hidden; }
    .code-block-header { background: var(--bg3); padding: 8px 16px; font-size: 12px; color: var(--text2); display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); }
    .code-block-header .lang-tag { font-weight: 600; color: var(--accent); }
    .try-btn {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--accent); color: #000; border: none; border-radius: 6px;
      padding: 4px 12px; font-size: 12px; font-weight: 600; cursor: pointer;
      text-decoration: none; transition: opacity .2s;
    }
    .try-btn:hover { opacity: 0.85; }
    .code-block pre { margin: 0; padding: 18px; overflow-x: auto; }
    .code-block code { font-family: 'JetBrains Mono', monospace; font-size: 13.5px; color: var(--text); line-height: 1.6; }
    .kw { color: #ff7b72; } .st { color: #a5d6ff; } .cm { color: #8b949e; font-style: italic; } .nu { color: #79c0ff; } .fn { color: #d2a8ff; }

    /* INLINE CODE */
    .content code { background: rgba(110,118,129,.15); color: #ff7b72; padding: 2px 6px; border-radius: 5px; font-family: 'JetBrains Mono', monospace; font-size: 13px; }
    .code-block code { background: none; color: var(--text); padding: 0; }

    /* INFO BOX */
    .info-box { background: rgba(88,166,255,.07); border: 1px solid rgba(88,166,255,.25); border-radius: 8px; padding: 14px 18px; margin: 16px 0; font-size: 14px; color: #c9d1d9; }
    .info-box strong { color: var(--blue); }

    /* TABLE */
    .tbl { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }
    .tbl th { background: var(--bg3); padding: 10px 14px; text-align: left; color: var(--text); font-weight: 600; border-bottom: 2px solid var(--border); }
    .tbl td { padding: 10px 14px; border-bottom: 1px solid var(--border); color: #c9d1d9; }
    .tbl tr:last-child td { border-bottom: none; }
    .tbl tr:hover td { background: var(--bg3); }

    /* NEXT / PREV */
    .nav-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 60px; padding-top: 24px; border-top: 1px solid var(--border); gap: 12px; flex-wrap: wrap; }
    .nav-btn { display: inline-flex; flex-direction: column; gap: 4px; padding: 12px 20px; border: 1px solid var(--border); border-radius: 10px; text-decoration: none; transition: all .2s; max-width: 220px; }
    .nav-btn:hover { border-color: var(--accent); background: var(--bg2); }
    .nav-btn .label { font-size: 11px; color: var(--text3); text-transform: uppercase; letter-spacing: .5px; }
    .nav-btn .title { font-size: 14px; font-weight: 600; color: var(--text); }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      .sidebar { display: none; }
      .content { padding: 24px 20px 60px; }
      .page-title { font-size: 26px; }
    }
  </style>
</head>
<body>

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  ${languages.map(l => `<a href="/blog-${l.id}.html"${l.id === lang.id ? ' class="active"' : ''}>${l.name}</a>`).join('\n  ')}
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR -->
  <aside class="sidebar">
    ${generateSidebar(activeKey)}
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    ${mainBodyHtml}
    ${navFooter}
  </main>
</div>
</body>
</html>`;
  };

  // 1. Write the HOME Page
  const homeBreadcrumb = `<div class="breadcrumb">
      <a href="/">Home</a><span>›</span>
      <a href="/blog.html">Tutorials</a><span>›</span>
      <span>${lang.name}</span>
    </div>`;

  let homeMainBody = `${homeBreadcrumb}\n${introHtml}`;
  // Let's add a list of lessons on the home page so it acts as an index of topics!
  homeMainBody += `\n\n<div class="section">
    <div class="section-title"><span class="num">▶</span> Course Curriculum</div>
    <p>Select a lesson from the left sidebar or the curriculum below to start learning ${lang.name}:</p>
    <table class="tbl" style="margin-top: 15px;">
      <tr><th>Topic</th><th>Description</th></tr>
      ${tLabels.map((t, idx) => `
        <tr>
          <td><strong><a href="/blog-${lang.id}-${t.key}.html">${idx + 1}. ${t.label}</a></strong></td>
          <td>Learn fundamental and practical concepts on ${t.label.toLowerCase()} in ${lang.name}.</td>
        </tr>
      `).join('')}
    </table>
  </div>`;

  const homePrevLink = null;
  const homePrevTitle = "";
  const homeNextLink = `/blog-${lang.id}-${tLabels[0].key}.html`;
  const homeNextTitle = tLabels[0].label;

  const homeFullHtml = makeFullPage(
    'home',
    `${lang.name} Tutorial`,
    homeMainBody,
    homePrevLink,
    homePrevTitle,
    homeNextLink,
    homeNextTitle
  );

  fs.writeFileSync(filePath, homeFullHtml, 'utf8');
  console.log(`Generated Home: ${filePath}`);

  // 2. Write each of the section pages
  sections.forEach((sec, idx) => {
    const pageBreadcrumb = `<div class="breadcrumb">
      <a href="/">Home</a><span>›</span>
      <a href="/blog.html">Tutorials</a><span>›</span>
      <a href="/blog-${lang.id}.html">${lang.name}</a><span>›</span>
      <span>${sec.label}</span>
    </div>`;

    // Make the title of the section prominent
    let sectionTitleHtml = `<h1 class="page-title">${lang.name} — ${sec.label}</h1>\n`;
    sectionTitleHtml += `<div class="page-meta">
      <span class="badge">🕐 8 min read</span>
      <span class="badge">🟢 Tutorial Lesson</span>
      <span class="badge">📅 July 2026</span>
    </div>\n`;

    // Clean up the section HTML a bit if it has duplicates
    // E.g., make sure it has classes correctly structured
    let secHtmlClean = sec.html;

    // Build the main body content
    const pageMainBody = `${pageBreadcrumb}\n${sectionTitleHtml}\n${secHtmlClean}`;

    const prevLink = idx === 0 ? `/blog-${lang.id}.html` : `/blog-${lang.id}-${sections[idx - 1].key}.html`;
    const prevTitle = idx === 0 ? `${lang.name} Introduction` : sections[idx - 1].label;
    const nextLink = idx === sections.length - 1 ? null : `/blog-${lang.id}-${sections[idx + 1].key}.html`;
    const nextTitle = idx === sections.length - 1 ? "" : sections[idx + 1].label;

    const pageFullHtml = makeFullPage(
      sec.key,
      `${lang.name} ${sec.label} Tutorial`,
      pageMainBody,
      prevLink,
      prevTitle,
      nextLink,
      nextTitle
    );

    const sectionFilePath = path.join(publicDir, `blog-${lang.id}-${sec.key}.html`);
    fs.writeFileSync(sectionFilePath, pageFullHtml, 'utf8');
    console.log(`  Generated Section: ${sectionFilePath}`);
  });
});
