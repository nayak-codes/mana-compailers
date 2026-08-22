const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cppDir = path.join(baseDir, 'blog-cpp');

if (!fs.existsSync(cppDir)) {
  fs.mkdirSync(cppDir, { recursive: true });
}

// 10 Phases C++ Curriculum definition for Accordion Sidebar
const CPP_CURRICULUM = [
  {
    id: 'phase1', tag: 'Phase 01', title: 'C++ Basics & Architecture', icon: '⚡',
    lessons: [{ num: 1, file: '01-cpp-basics-history-compiler-and-hello-world.html', title: '1. C++ Fundamentals, Compiler Pipeline & Hello World' }]
  },
  {
    id: 'phase2', tag: 'Phase 02', title: 'Variables, Data Types & Scope', icon: '📦',
    lessons: [{ num: 2, file: '02-cpp-variables-data-types-constexpr-auto-and-scope.html', title: '2. Variables, Data Types, constexpr, auto & Scope' }]
  },
  {
    id: 'phase3', tag: 'Phase 03', title: 'Input, Operators & Practice', icon: '⚡',
    lessons: [{ num: 3, file: '03-cpp-input-cin-getline-and-operators-masterclass.html', title: '3. cin, getline(), Operators & 6 Practice Programs' }]
  },
  {
    id: 'phase4', tag: 'Phase 04', title: 'Conditional Statements', icon: '🔀',
    lessons: [{ num: 4, file: '04-cpp-conditional-branching-if-else-and-switch-case.html', title: '4. if-else Ladders, Logical Logic & switch-case' }]
  },
  {
    id: 'phase5', tag: 'Phase 05', title: 'Loops & Control Flow', icon: '🔁',
    lessons: [{ num: 5, file: '05-cpp-loops-for-while-do-while-and-range-based-for.html', title: '5. for, while, Range-for & 9 Practice Programs' }]
  },
  {
    id: 'phase6', tag: 'Phase 06', title: 'Functions & Modular Code', icon: '🧩',
    lessons: [{ num: 6, file: '06-cpp-functions-prototypes-overloading-and-lambdas.html', title: '6. Functions, Overloading, References & Lambdas' }]
  },
  {
    id: 'phase7', tag: 'Phase 07', title: 'Arrays, Strings & Vectors', icon: '📊',
    lessons: [{ num: 7, file: '07-cpp-arrays-std-string-string-view-and-std-vector.html', title: '7. Arrays, std::string, string_view & std::vector' }]
  },
  {
    id: 'phase8', tag: 'Phase 08', title: 'Pointers & Memory Safety', icon: '🎯',
    lessons: [{ num: 8, file: '08-cpp-pointers-references-nullptr-and-memory-safety.html', title: '8. Pointers, References, nullptr & Memory Safety' }]
  },
  {
    id: 'phase9', tag: 'Phase 09', title: 'Object-Oriented Programming', icon: '🏗️',
    lessons: [{ num: 9, file: '09-cpp-object-oriented-programming-classes-objects-and-encapsulation.html', title: '9. OOP, Classes, Objects, Access Specifiers & Pillars' }]
  },
  {
    id: 'phase10', tag: 'Phase 10', title: 'Constructors, Destructors & RAII', icon: '⚙️',
    lessons: [{ num: 10, file: '10-cpp-constructors-destructors-rule-of-five-and-raii.html', title: '10. Constructors, Destructors, Rule of 5 & RAII' }]
  },
  {
    id: 'phase11', tag: 'Phase 11', title: 'Inheritance & Polymorphism', icon: '🧬',
    lessons: [{ num: 11, file: '11-cpp-inheritance-virtual-functions-and-runtime-polymorphism.html', title: '11. Inheritance, Virtual Functions & Runtime Polymorphism' }]
  },
  {
    id: 'phase12', tag: 'Phase 12', title: 'Operator Overloading', icon: '➕',
    lessons: [{ num: 12, file: '12-cpp-operator-overloading-friend-functions-and-stream-operators.html', title: '12. Operator Overloading, Friend Functions & Streams' }]
  },
  {
    id: 'phase13', tag: 'Phase 13', title: 'Templates & Generic Programming', icon: '📐',
    lessons: [{ num: 13, file: '13-cpp-templates-function-class-specialization-and-concepts.html', title: '13. Templates, Specialization, Variadic & Concepts' }]
  },
  {
    id: 'phase14', tag: 'Phase 14', title: 'STL Containers', icon: '📦',
    lessons: [{ num: 14, file: '14-cpp-stl-containers-vector-map-set-unordered-and-adaptors.html', title: '14. STL: vector, map, set, unordered & Container Adaptors' }]
  },
  {
    id: 'phase15', tag: 'Phase 15', title: 'Iterators & Algorithms', icon: '🔄',
    lessons: [{ num: 15, file: '15-cpp-iterators-algorithms-sort-find-transform-and-stl.html', title: '15. Iterators, sort, find, transform & STL Algorithms' }]
  },
  {
    id: 'phase16', tag: 'Phase 16', title: 'Lambda Expressions', icon: '⚡',
    lessons: [{ num: 16, file: '16-cpp-lambda-expressions-captures-std-function-and-closures.html', title: '16. Lambdas, Captures, std::function & Closures' }]
  },
  {
    id: 'phase17', tag: 'Phase 17', title: 'Smart Pointers & Memory', icon: '🧠',
    lessons: [{ num: 17, file: '17-cpp-smart-pointers-unique-ptr-shared-ptr-weak-ptr-and-raii.html', title: '17. unique_ptr, shared_ptr, weak_ptr & RAII Memory' }]
  },
  {
    id: 'phase18', tag: 'Phase 18', title: 'Exception Handling', icon: '🚨',
    lessons: [{ num: 18, file: '18-cpp-exception-handling-try-catch-throw-and-custom-exceptions.html', title: '18. try, catch, throw, Custom Exceptions & Safety' }]
  },
  {
    id: 'phase19', tag: 'Phase 19', title: 'File Handling & Filesystem', icon: '📁',
    lessons: [{ num: 19, file: '19-cpp-file-handling-fstream-filesystem-and-serialization.html', title: '19. fstream, std::filesystem, Paths & Serialization' }]
  },
  {
    id: 'phase20', tag: 'Phase 20', title: 'Modern C++ Features', icon: '🚀',
    lessons: [{ num: 20, file: '20-cpp-modern-features-constexpr-structured-bindings-optional-variant-format.html', title: '20. constexpr, Structured Bindings, optional, variant & format' }]
  },
  {
    id: 'phase21', tag: 'Phase 21', title: 'Ranges & Views (C++20)', icon: '🌊',
    lessons: [{ num: 21, file: '21-cpp-ranges-views-filter-transform-pipelines-and-lazy-evaluation.html', title: '21. Ranges, Views, Pipelines & Lazy Evaluation (C++20)' }]
  }
];

function generateCppAccordionSidebar(currentFile) {
  let html = '    <div class="sidebar-accordion">\n';
  CPP_CURRICULUM.forEach(phase => {
    const hasActive = phase.lessons.some(l => l.file === currentFile);
    const isOpen = hasActive || (currentFile === null && phase.id === 'phase1');
    const activeHeaderClass = isOpen ? ' active' : '';
    const openContentClass = isOpen ? ' open' : '';

    html += '      <button class="accordion-header' + activeHeaderClass + '" onclick="toggleAccordion(this)">\n';
    html += '        <div class="accordion-header-main">\n';
    html += '          <span class="phase-icon-box">' + phase.icon + '</span>\n';
    html += '          <div class="phase-info">\n';
    html += '            <span class="phase-tag">' + phase.tag + '</span>\n';
    html += '            <span class="phase-title">' + phase.title + '</span>\n';
    html += '          </div>\n';
    html += '        </div>\n';
    html += '        <div class="accordion-header-meta">\n';
    html += '          <span class="phase-count-badge">' + phase.lessons.length + ' Ch</span>\n';
    html += '          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>\n';
    html += '        </div>\n';
    html += '      </button>\n';
    html += '      <div class="accordion-content' + openContentClass + '">\n';
    phase.lessons.forEach(l => {
      const isActive = l.file === currentFile ? ' class="active"' : '';
      html += '        <a href="/blog-cpp/' + l.file + '"' + isActive + '>' + l.title + '</a>\n';
    });
    html += '      </div>\n\n';
  });
  html += '    </div>\n';
  return html;
}

function wrapCppPage(title, desc, filename, currentNum, phaseTag, phaseTitle, subtopics, contentBody, prevFile, prevTitle, nextFile, nextTitle) {
  const accordionSidebar = generateCppAccordionSidebar(filename);

  let navFooterHtml = '<div class="nav-footer">\n';
  if (prevFile) {
    navFooterHtml += '  <a href="' + prevFile + '" class="nav-btn">\n    <span class="label">← Previous Lesson</span>\n    <span class="title">' + prevTitle + '</span>\n  </a>\n';
  } else {
    navFooterHtml += '  <a href="/blog-cpp.html" class="nav-btn">\n    <span class="label">← C++ Course Overview</span>\n    <span class="title">Course Home & Index</span>\n  </a>\n';
  }
  if (nextFile) {
    navFooterHtml += '  <a href="' + nextFile + '" class="nav-btn" style="text-align:right;">\n    <span class="label">Next Lesson →</span>\n    <span class="title">' + nextTitle + '</span>\n  </a>\n';
  } else {
    navFooterHtml += '  <a href="/blog-cpp.html" class="nav-btn" style="text-align:right;">\n    <span class="label">Course Index →</span>\n    <span class="title">C++ Master Index</span>\n  </a>\n';
  }
  navFooterHtml += '</div>';

  return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8" />\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>' + title + ' — Modern C++ Master Tutorial | Our Compiler</title>\n' +
'  <meta name="description" content="' + desc + '" />\n' +
'  <meta name="keywords" content="c++ tutorial, ' + title.toLowerCase() + ', modern c++, cpp20, RAII, stl, cpp pointers, cpp oop" />\n' +
'  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />\n' +
'  <link rel="icon" type="image/png" href="/logo.png" />\n' +
'  <link rel="canonical" href="https://www.ourcompiler.com/blog-cpp/' + filename + '" />\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com" />\n' +
'  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />\n' +
'  <link rel="stylesheet" href="/blog-style.css" />\n' +
'  <link rel="stylesheet" href="/blog-cpp/style.css" />\n' +
'  <link rel="stylesheet" href="/site-nav.css" />\n' +
'  <style>\n' +
'    .concept-box { background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.25); border-left: 4px solid #3b82f6; border-radius: 8px; padding: 22px 26px; margin: 24px 0; }\n' +
'    .concept-box h4 { color: #3b82f6; margin-bottom: 10px; font-size: 16.5px; font-weight: 700; }\n' +
'    .concept-box p { color: var(--text2); font-size: 15px; line-height: 1.8; margin: 0 0 10px 0; }\n' +
'    .memory-diagram { background: #0f141c; border: 1px solid #27303f; border-radius: 10px; padding: 22px; font-family: "JetBrains Mono", monospace; font-size: 13.5px; color: #60a5fa; line-height: 1.85; margin: 24px 0; overflow-x: auto; white-space: pre; }\n' +
'    .spec-table th { background: rgba(59, 130, 246, 0.12); color: #3b82f6; font-size: 14.5px; }\n' +
'    .deep-dive-card { background: #141922; border: 1px solid #27303f; border-radius: 10px; padding: 24px; margin: 26px 0; }\n' +
'    .deep-dive-card h3 { color: #3b82f6; font-size: 17.5px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }\n' +
'    .faq-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin: 24px 0; }\n' +
'    .faq-item { background: var(--bg2); border: 1px solid var(--border); border-left: 4px solid #3b82f6; border-radius: 8px; padding: 20px 22px; }\n' +
'    .faq-item h4 { color: #e6edf3; font-size: 15.5px; margin-bottom: 8px; }\n' +
'    .faq-item p { color: var(--text2); font-size: 14.5px; line-height: 1.75; margin: 0; }\n' +
'    .text-prose { font-size: 15.5px; line-height: 1.85; color: var(--text); margin-bottom: 18px; }\n' +
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
'    window.addEventListener("DOMContentLoaded", () => {\n' +
'      document.querySelectorAll(".code-block").forEach(block => {\n' +
'        const header = block.querySelector(".code-block-header");\n' +
'        const codeEl = block.querySelector("pre code");\n' +
'        if (!header || !codeEl) return;\n' +
'        let actionsContainer = header.querySelector(".code-actions");\n' +
'        if (!actionsContainer) {\n' +
'          actionsContainer = document.createElement("div");\n' +
'          actionsContainer.className = "code-actions";\n' +
'          actionsContainer.style.cssText = "display: flex; gap: 8px; align-items: center; margin-left: auto;";\n' +
'          const tryBtn = header.querySelector(".try-btn");\n' +
'          if (tryBtn) actionsContainer.appendChild(tryBtn);\n' +
'          header.appendChild(actionsContainer);\n' +
'        }\n' +
'        const copyBtn = document.createElement("button");\n' +
'        copyBtn.className = "copy-btn";\n' +
'        copyBtn.innerHTML = "📋 Copy";\n' +
'        copyBtn.style.cssText = "background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; font-family: Inter, sans-serif; white-space: nowrap;";\n' +
'        copyBtn.addEventListener("click", () => {\n' +
'          navigator.clipboard.writeText(codeEl.textContent).then(() => {\n' +
'            copyBtn.innerHTML = "✅ Copied!";\n' +
'            setTimeout(() => { copyBtn.innerHTML = "📋 Copy"; }, 2000);\n' +
'          });\n' +
'        });\n' +
'        actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);\n' +
'      });\n' +
'    });\n' +
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
'    <a href="/blog-cpp.html" class="sidebar-home-link">⚡ C++ Course HOME</a>\n' +
accordionSidebar +
'    <div class="sidebar-heading">Interactive IDE</div>\n' +
'    <a href="/?lang=cpp17" style="color:#3b82f6; font-weight:700;">▶ Try C++ Online Compiler</a>\n' +
'    <a href="/blog.html">📚 All Tutorials</a>\n' +
'  </aside>\n' +
'  <main class="content">\n' +
'    <div class="breadcrumb">\n' +
'      <a href="/">Home</a><span class="sep">›</span>\n' +
'      <a href="/blog.html">Tutorials</a><span class="sep">›</span>\n' +
'      <a href="/blog-cpp.html">C++ Programming</a><span class="sep">›</span>\n' +
'      <span class="current">Lesson ' + currentNum + ': ' + title + '</span>\n' +
'    </div>\n' +
'    <h1 class="page-title">' + title + '</h1>\n' +
'    <div class="page-meta">\n' +
'      <span class="badge">⚡ Modern C++ (C++17 / C++20 / C++23)</span>\n' +
'      <span class="badge">🟢 Lesson ' + currentNum + '</span>\n' +
'      <span class="badge">📂 ' + phaseTag + ': ' + phaseTitle + '</span>\n' +
'      <span class="badge">📅 2026 Master Edition</span>\n' +
'    </div>\n' +
'    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">\n' +
'      <span style="color:#3b82f6; font-weight:700;">📌 Covered in this in-depth guide:</span>\n' +
'      <span>' + subtopics + '</span>\n' +
'    </div>\n' +
contentBody + '\n' +
navFooterHtml + '\n' +
'  </main>\n' +
'</div>\n' +
'  <script src="/site-nav.js" defer></script>\n' +
'</body>\n' +
'</html>';
}

module.exports = { wrapCppPage, CPP_CURRICULUM };
