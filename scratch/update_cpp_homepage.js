const fs = require('fs');
const path = require('path');
const { CPP_CURRICULUM } = require('./build_cpp_10_phases_master.js');

const baseDir = path.join(__dirname, '..', 'public');
const cppHomePage = path.join(baseDir, 'blog-cpp.html');

console.log('🚀 Updating C++ Master Index Page (blog-cpp.html)...');

let sidebarAccordionHtml = '    <div class="sidebar-accordion">\n';
CPP_CURRICULUM.forEach((phase, idx) => {
  const isOpen = idx === 0;
  const activeHeaderClass = isOpen ? ' active' : '';
  const openContentClass = isOpen ? ' open' : '';

  sidebarAccordionHtml += '      <button class="accordion-header' + activeHeaderClass + '" onclick="toggleAccordion(this)">\n';
  sidebarAccordionHtml += '        <div class="accordion-header-main">\n';
  sidebarAccordionHtml += '          <span class="phase-icon-box">' + phase.icon + '</span>\n';
  sidebarAccordionHtml += '          <div class="phase-info">\n';
  sidebarAccordionHtml += '            <span class="phase-tag">' + phase.tag + '</span>\n';
  sidebarAccordionHtml += '            <span class="phase-title">' + phase.title + '</span>\n';
  sidebarAccordionHtml += '          </div>\n';
  sidebarAccordionHtml += '        </div>\n';
  sidebarAccordionHtml += '        <div class="accordion-header-meta">\n';
  sidebarAccordionHtml += '          <span class="phase-count-badge">' + phase.lessons.length + ' Ch</span>\n';
  sidebarAccordionHtml += '          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>\n';
  sidebarAccordionHtml += '        </div>\n';
  sidebarAccordionHtml += '      </button>\n';
  sidebarAccordionHtml += '      <div class="accordion-content' + openContentClass + '">\n';
  phase.lessons.forEach(l => {
    sidebarAccordionHtml += '        <a href="/blog-cpp/' + l.file + '">' + l.title + '</a>\n';
  });
  sidebarAccordionHtml += '      </div>\n\n';
});
sidebarAccordionHtml += '    </div>\n';

let mainGridCardsHtml = '';
CPP_CURRICULUM.forEach(phase => {
  mainGridCardsHtml += '<div class="deep-dive-card" style="margin-bottom:28px;">\n';
  mainGridCardsHtml += '  <h3 style="color:#3b82f6; font-size:18px; margin-bottom:12px; display:flex; align-items:center; gap:10px;">\n';
  mainGridCardsHtml += '    <span>' + phase.icon + '</span> ' + phase.tag + ': ' + phase.title + '\n';
  mainGridCardsHtml += '  </h3>\n';
  mainGridCardsHtml += '  <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;">\n';
  phase.lessons.forEach(l => {
    mainGridCardsHtml += '    <li style="background:var(--bg2); border:1px solid var(--border); border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">\n';
    mainGridCardsHtml += '      <a href="/blog-cpp/' + l.file + '" style="color:var(--text); font-weight:600; text-decoration:none; font-size:14.5px;">' + l.title + '</a>\n';
    mainGridCardsHtml += '      <a href="/blog-cpp/' + l.file + '" style="background:#3b82f6; color:#ffffff; padding:4px 12px; border-radius:4px; font-size:12px; font-weight:700; text-decoration:none;">Read Chapter →</a>\n';
    mainGridCardsHtml += '    </li>\n';
  });
  mainGridCardsHtml += '  </ul>\n';
  mainGridCardsHtml += '</div>\n';
});

const pageContent = '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8" />\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>Modern C++ Programming Master Tutorial & Complete Roadmap (2026 Edition) | Our Compiler</title>\n' +
'  <meta name="description" content="Master Modern C++ Programming from compiler architecture, variables, cin/cout I/O, operators, loops, functions, arrays, std::string, std::vector, pointers, references, OOP classes, constructors, Rule of 5, and RAII resource management." />\n' +
'  <meta name="keywords" content="c++ tutorial, learn c++, modern c++, cpp20, c++ raii, c++ stl, c++ vector, c++ pointers, c++ classes, c++ course" />\n' +
'  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />\n' +
'  <link rel="icon" type="image/png" href="/logo.png" />\n' +
'  <link rel="canonical" href="https://www.ourcompiler.com/blog-cpp.html" />\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com" />\n' +
'  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />\n' +
'  <link rel="stylesheet" href="/blog-style.css" />\n' +
'  <link rel="stylesheet" href="/blog-cpp/style.css" />\n' +
'  <link rel="stylesheet" href="/site-nav.css" />\n' +
'  <style>\n' +
'    .concept-box { background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.25); border-left: 4px solid #3b82f6; border-radius: 8px; padding: 22px 26px; margin: 24px 0; }\n' +
'    .concept-box h4 { color: #3b82f6; margin-bottom: 10px; font-size: 16.5px; font-weight: 700; }\n' +
'    .deep-dive-card { background: #141922; border: 1px solid #27303f; border-radius: 10px; padding: 24px; margin: 26px 0; }\n' +
'  </style>\n' +
'  <script>\n' +
'    function toggleAccordion(btn) {\n' +
'      const content = btn.nextElementSibling;\n' +
'      const isOpen = content.classList.contains("open");\n' +
'      if (isOpen) {\n' +
'        content.classList.remove("open");\n' +
'        btn.classList.remove("active");\n' +
'      } else {\n' +
'        content.classList.add("open");\n' +
'        btn.classList.add("active");\n' +
'      }\n' +
'    }\n' +
'  </script>\n' +
'</head>\n' +
'<body class="lang-cpp">\n' +
'<nav class="topnav">\n' +
'  <a href="/" class="brand">🖥️ Our Compiler</a>\n' +
'  <a href="/blog-python.html">Python</a>\n' +
'  <a href="/blog-java.html">Java</a>\n' +
'  <a href="/blog-javascript.html">JavaScript</a>\n' +
'  <a href="/blog-c.html">C</a>\n' +
'  <a href="/blog-cpp.html" class="active">C++</a>\n' +
'  <a href="/?lang=csharp">C#</a>\n' +
'  <a href="/blog-go.html">Go</a>\n' +
'  <a href="/blog-ruby.html">Ruby</a>\n' +
'  <a href="/blog-rust.html">Rust</a>\n' +
'  <a href="/blog-php.html">PHP</a>\n' +
'  <a href="/online-html-editor.html">HTML/CSS/JS</a>\n' +
'</nav>\n' +
'<div class="layout">\n' +
'  <aside class="sidebar">\n' +
'    <div class="sidebar-heading">C++ Master Course</div>\n' +
'    <a href="/blog-cpp.html" class="sidebar-home-link active">⚡ C++ Course HOME</a>\n' +
sidebarAccordionHtml +
'    <div class="sidebar-heading">Interactive IDE</div>\n' +
'    <a href="/?lang=cpp17" style="color:#3b82f6; font-weight:700;">▶ Try C++ Online Compiler</a>\n' +
'    <a href="/blog.html">📚 All Tutorials</a>\n' +
'  </aside>\n' +
'  <main class="content">\n' +
'    <div class="breadcrumb">\n' +
'      <a href="/">Home</a><span class="sep">›</span>\n' +
'      <a href="/blog.html">Tutorials</a><span class="sep">›</span>\n' +
'      <span class="current">C++ Programming Master Course</span>\n' +
'    </div>\n' +
'    <h1 class="page-title">Modern C++ Programming Master Tutorial & Complete 10-Phase Roadmap</h1>\n' +
'    <div class="page-meta">\n' +
'      <span class="badge">⚡ Modern C++ (C++17 / C++20 / C++23)</span>\n' +
'      <span class="badge">🟢 10 Master Phases</span>\n' +
'      <span class="badge">📅 2026 Complete Master Edition</span>\n' +
'    </div>\n' +
'    <div class="intro-box">\n' +
'      <p>C++ is a high-performance, general-purpose compiled language created by <strong>Bjarne Stroustrup</strong>. Modern C++ eliminates manual memory pitfalls through <strong>RAII (Resource Acquisition Is Initialization)</strong> and smart pointers, providing high-level zero-overhead abstractions along with the Standard Template Library (STL). Explore the complete 10-Phase Masterclass roadmap below:</p>\n' +
'    </div>\n' +
mainGridCardsHtml +
'  </main>\n' +
'</div>\n' +
'  <script src="/site-nav.js" defer></script>\n' +
'</body>\n' +
'</html>';

fs.writeFileSync(cppHomePage, pageContent, 'utf8');
console.log('✅ Successfully updated C++ Master Index Page (blog-cpp.html) with style.css!');
