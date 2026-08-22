const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const csharpDir = path.join(baseDir, 'blog-csharp');

if (!fs.existsSync(csharpDir)) {
  fs.mkdirSync(csharpDir, { recursive: true });
}

// Complete 35-Chapter C# Curriculum definition for Accordion Sidebar across 12 Phases
const CSHARP_CURRICULUM = [
  {
    id: 'phase1', tag: 'Phase 01', title: 'C# Introduction & Setup', icon: '📂',
    lessons: [
      { num: 1, file: '01-csharp-introduction-features-and-dotnet.html', title: '1. Introduction, Features & .NET Architecture' },
      { num: 2, file: '02-csharp-setup-vs-code-dotnet-sdk-cli.html', title: '2. .NET SDK Setup, VS Code, CLI & Structure' },
      { num: 3, file: '03-csharp-first-program-program-cs-main-console.html', title: '3. First C# Program, Main() & Console I/O' }
    ]
  },
  {
    id: 'phase2', tag: 'Phase 02', title: 'Variables & Data Types', icon: '📦',
    lessons: [
      { num: 4, file: '04-csharp-variables-constants-scope-and-var.html', title: '4. Variables, Constants (const/readonly), var & Scope' },
      { num: 5, file: '05-csharp-data-types-value-vs-reference.html', title: '5. Value vs Reference Types, Nullables & Structs' },
      { num: 6, file: '06-csharp-type-conversion-casting-parse-tryparse.html', title: '6. Type Conversion, Parse(), TryParse() & Boxing' }
    ]
  },
  {
    id: 'phase3', tag: 'Phase 03', title: 'Operators & User Input', icon: '⚡',
    lessons: [
      { num: 7, file: '07-csharp-operators-complete-guide.html', title: '7. All Operators (Bitwise, Nullable, is/as, Precedence)' },
      { num: 8, file: '08-csharp-user-input-readline-parsing-validation.html', title: '8. User Input, Console.ReadLine() & Validation' }
    ]
  },
  {
    id: 'phase4', tag: 'Phase 04', title: 'Conditions & Loops', icon: '🔀',
    lessons: [
      { num: 9, file: '09-csharp-conditional-statements-switch-patterns.html', title: '9. Conditionals, Pattern Matching & Switch Expressions' },
      { num: 10, file: '10-csharp-loops-for-while-foreach-practice.html', title: '10. Loops, foreach, Controls & 9 Practice Programs' }
    ]
  },
  {
    id: 'phase5', tag: 'Phase 05', title: 'Strings, Arrays & Collections', icon: '📊',
    lessons: [
      { num: 11, file: '11-csharp-strings-verbatim-raw-literals-stringbuilder.html', title: '11. Strings, Interpolation, Raw Literals & StringBuilder' },
      { num: 12, file: '12-csharp-arrays-multidimensional-jagged-methods.html', title: '12. Arrays (1D, 2D Multidimensional & Jagged)' },
      { num: 13, file: '13-csharp-collections-generics-list-dictionary-hashset.html', title: '13. Generic Collections (List, Dictionary, HashSet, Stack/Queue)' }
    ]
  },
  {
    id: 'phase6', tag: 'Phase 06', title: 'Methods & Object-Oriented OOP', icon: '🏗️',
    lessons: [
      { num: 14, file: '14-csharp-methods-parameters-ref-out-in-local-functions.html', title: '14. Methods, Parameters (ref/out/in) & Overloading' },
      { num: 15, file: '15-csharp-classes-objects-constructors-properties.html', title: '15. Classes, Objects, Properties & Constructors' },
      { num: 16, file: '16-csharp-encapsulation-access-modifiers-records.html', title: '16. Encapsulation, Access Modifiers & Records' },
      { num: 17, file: '17-csharp-inheritance-polymorphism-virtual-override.html', title: '17. Inheritance, Polymorphism, virtual & override' },
      { num: 18, file: '18-csharp-interfaces-multiple-implementation-decoupling.html', title: '18. Interfaces, Default Members & Dependency Inversion' }
    ]
  },
  {
    id: 'phase7', tag: 'Phase 07', title: 'Advanced C# Language', icon: '🚀',
    lessons: [
      { num: 19, file: '19-csharp-structs-enums-and-records-masterclass.html', title: '19. Structs, Enums & Record Structs' },
      { num: 20, file: '20-csharp-generics-type-parameters-constraints-variance.html', title: '20. Generics, Constraints, Covariance & Contravariance' },
      { num: 21, file: '21-csharp-delegates-events-func-action-predicate.html', title: '21. Delegates, Action, Func, Predicate & Events' },
      { num: 22, file: '22-csharp-lambda-expressions-closures-anonymous-functions.html', title: '22. Lambda Syntax, Closures & Anonymous Functions' }
    ]
  },
  {
    id: 'phase8', tag: 'Phase 08', title: 'LINQ & Query Pipelines', icon: '🔍',
    lessons: [
      { num: 23, file: '23-csharp-linq-basics-query-vs-method-syntax-operators.html', title: '23. LINQ Basics (Where, Select, OrderBy, FirstOrDefault)' },
      { num: 24, file: '24-csharp-advanced-linq-groupby-join-deferred-execution.html', title: '24. Advanced LINQ (GroupBy, Join, Deferred Execution)' }
    ]
  },
  {
    id: 'phase9', tag: 'Phase 09', title: 'Exceptions, Files & JSON', icon: '📁',
    lessons: [
      { num: 25, file: '25-csharp-exception-handling-try-catch-custom-filters.html', title: '25. Exception Handling, Custom Errors & Filters' },
      { num: 26, file: '26-csharp-file-handling-streamreader-streamwriter-async-io.html', title: '26. File I/O, File, Directory, Path & Streams' },
      { num: 27, file: '27-csharp-json-serialization-deserialization-system-text-json.html', title: '27. JSON Serialization & System.Text.Json' }
    ]
  },
  {
    id: 'phase10', tag: 'Phase 10', title: 'Asynchronous Programming', icon: '⚡',
    lessons: [
      { num: 28, file: '28-csharp-async-await-task-cancellation-tokens.html', title: '28. async, await, Task<T> & CancellationToken' },
      { num: 29, file: '29-csharp-parallel-programming-parallel-for-thread-safety-locks.html', title: '29. Parallel.For, Thread Safety, Locks & Concurrent Collections' }
    ]
  },
  {
    id: 'phase11', tag: 'Phase 11', title: '.NET Platform & Architecture', icon: '⚙️',
    lessons: [
      { num: 30, file: '30-csharp-dotnet-platform-clr-assemblies-nuget-configuration.html', title: '30. .NET Platform, CLR, Assemblies & NuGet' },
      { num: 31, file: '31-csharp-dependency-injection-lifetimes-singleton-scoped-transient.html', title: '31. Dependency Injection (Singleton, Scoped, Transient)' }
    ]
  },
  {
    id: 'phase12', tag: 'Phase 12', title: 'ASP.NET Core Web APIs', icon: '🌐',
    lessons: [
      { num: 32, file: '32-csharp-aspnet-core-introduction-architecture-middleware.html', title: '32. ASP.NET Core Intro, Middleware & Pipeline' },
      { num: 33, file: '33-csharp-minimal-apis-endpoints-routing-swagger.html', title: '33. Minimal APIs, Endpoints & Swagger' },
      { num: 34, file: '34-csharp-controller-based-apis-routing-dtos-validation.html', title: '34. Controller APIs, DTOs & Validation' },
      { num: 35, file: '35-csharp-rest-api-capstone-project-product-service-crud.html', title: '35. Complete REST API Capstone CRUD Project' }
    ]
  }
];

function generateCSharpAccordionSidebar(currentFile) {
  let html = '    <div class="sidebar-accordion">\n';
  CSHARP_CURRICULUM.forEach(phase => {
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
      html += '        <a href="/blog-csharp/' + l.file + '"' + isActive + '>' + l.title + '</a>\n';
    });
    html += '      </div>\n\n';
  });
  html += '    </div>\n';
  return html;
}

function wrapCSharpPage(title, desc, filename, currentNum, phaseTag, phaseTitle, subtopics, contentBody, prevFile, prevTitle, nextFile, nextTitle) {
  const accordionSidebar = generateCSharpAccordionSidebar(filename);

  let navFooterHtml = '<div class="nav-footer">\n';
  if (prevFile) {
    navFooterHtml += '  <a href="/blog-csharp/' + prevFile + '" class="nav-btn">\n    <span class="label">← Previous Lesson</span>\n    <span class="title">' + prevTitle + '</span>\n  </a>\n';
  } else {
    navFooterHtml += '  <a href="/blog-csharp.html" class="nav-btn">\n    <span class="label">← C# Course Overview</span>\n    <span class="title">Course Home & Index</span>\n  </a>\n';
  }
  if (nextFile) {
    navFooterHtml += '  <a href="/blog-csharp/' + nextFile + '" class="nav-btn" style="text-align:right;">\n    <span class="label">Next Lesson →</span>\n    <span class="title">' + nextTitle + '</span>\n  </a>\n';
  } else {
    navFooterHtml += '  <a href="/blog-csharp.html" class="nav-btn" style="text-align:right;">\n    <span class="label">Course Index →</span>\n    <span class="title">C# Master Index</span>\n  </a>\n';
  }
  navFooterHtml += '</div>';

  return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8" />\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>' + title + ' — C# Master Tutorial | Our Compiler</title>\n' +
'  <meta name="description" content="' + desc + '" />\n' +
'  <link rel="icon" type="image/png" href="/logo.png" />\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com" />\n' +
'  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />\n' +
'  <link rel="stylesheet" href="/blog-style.css" />\n' +
'  <link rel="stylesheet" href="/blog-csharp/style.css" />\n' +
'  <link rel="stylesheet" href="/site-nav.css" />\n\n' +
'  <!-- Accordion Toggle, Syntax Highlighter & Theme Script -->\n' +
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
'    }\n\n' +
'    // Client-side C# Syntax Highlighter (Monaco / VS Code styling)\n' +
'    function highlightCSharpCode(rawCode) {\n' +
'      const tokens = [];\n' +
'      const pushToken = (cls, text) => {\n' +
'        const id = tokens.length;\n' +
'        tokens.push(`<span class="${cls}">${text}</span>`);\n' +
'        return `___CSHARP_TOK_${id}___`;\n' +
'      };\n\n' +
'      // 1. Comments\n' +
'      let code = rawCode.replace(/(\\/\\/.*$|\\/\\*[\\s\\S]*?\\*\\/)/gm, m => pushToken("cm", m));\n\n' +
'      // 2. Strings & Interpolations: @"...", $"...", "..."\n' +
'      code = code.replace(/(@"[^"]*"|\\$?"[^"\\\\]*(?:\\\\.[^"\\\\]*)*"|' + "'[^'\\\\]*(?:\\\\.[^'\\\\]*)*')" + '/g, m => pushToken("st", m));\n\n' +
'      // 3. Keywords\n' +
'      const kwList = ["using","namespace","class","struct","interface","enum","public","private","protected","internal","static","readonly","const","void","int","long","float","double","decimal","bool","char","string","object","var","dynamic","new","return","if","else","switch","case","break","default","for","foreach","while","do","try","catch","finally","throw","null","true","false","abstract","virtual","override","sealed","async","await","get","set","init","record","out","ref","in","sizeof","typeof","default","is","as","where","select","from","group","by","order","by","ascending","descending","join","on","equals","into","yield"];\n' +
'      const kwRegex = new RegExp(`\\\\b(${kwList.join("|")})\\\\b`, "g");\n' +
'      code = code.replace(kwRegex, m => pushToken("kw", m));\n\n' +
'      // 4. Built-in Classes & Functions\n' +
'      const fnList = ["Console","WriteLine","Write","ReadLine","Parse","TryParse","Convert","Math","DateTime","Guid","System","String","Int32","Int64","Boolean","Double","Decimal","List","Dictionary","HashSet","Queue","Stack","SortedList","SortedSet","LinkedList","Enumerable","Task","Thread","File","Path","Directory","Array","JsonSerializer","Action","Func","Predicate","Parallel","WebApplication","ControllerBase","IActionResult","ActionResult"];\n' +
'      const fnRegex = new RegExp(`\\\\b(${fnList.join("|")})\\\\b`, "g");\n' +
'      code = code.replace(fnRegex, m => pushToken("fn", m));\n\n' +
'      // 5. Numbers\n' +
'      code = code.replace(/\\b(\\d+(?:\\.\\d+)?(?:[fFdDmMlLuU])?)\\b/g, m => pushToken("nu", m));\n\n' +
'      // 6. Restore Tokens\n' +
'      code = code.replace(/___CSHARP_TOK_(\\d+)___/g, (_, id) => tokens[id]);\n' +
'      return code;\n' +
'    }\n\n' +
'    (function() {\n' +
'      const currentTheme = localStorage.getItem("theme") || "dark";\n' +
'      if (currentTheme === "light") {\n' +
'        document.documentElement.classList.add("light-theme");\n' +
'        document.addEventListener("DOMContentLoaded", () => {\n' +
'          document.body.classList.add("light-theme");\n' +
'        });\n' +
'      }\n' +
'      window.addEventListener("DOMContentLoaded", () => {\n' +
'        const topnav = document.querySelector(".topnav");\n' +
'        if (topnav) {\n' +
'          const toggleBtn = document.createElement("button");\n' +
'          toggleBtn.className = "blog-theme-toggle";\n' +
'          toggleBtn.style.cssText = "margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: \'Inter\', sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;";\n' +
'          const updateText = () => {\n' +
'            const isLight = document.body.classList.contains("light-theme");\n' +
'            toggleBtn.innerHTML = isLight ? "🌙 Dark" : "☀️ Light";\n' +
'          };\n' +
'          updateText();\n' +
'          toggleBtn.addEventListener("click", () => {\n' +
'            document.body.classList.toggle("light-theme");\n' +
'            document.documentElement.classList.toggle("light-theme");\n' +
'            const isLight = document.body.classList.contains("light-theme");\n' +
'            localStorage.setItem("theme", isLight ? "light" : "dark");\n' +
'            updateText();\n' +
'          });\n' +
'          topnav.appendChild(toggleBtn);\n' +
'        }\n\n' +
'        // Code blocks syntax highlighting & actions\n' +
'        document.querySelectorAll(".code-block").forEach(block => {\n' +
'          const header = block.querySelector(".code-block-header");\n' +
'          const codeEl = block.querySelector("pre code");\n' +
'          if (!header || !codeEl) return;\n' +
'          const rawCode = codeEl.textContent;\n' +
'          codeEl.innerHTML = highlightCSharpCode(rawCode);\n\n' +
'          let actionsContainer = header.querySelector(".code-actions");\n' +
'          if (!actionsContainer) {\n' +
'            actionsContainer = document.createElement("div");\n' +
'            actionsContainer.className = "code-actions";\n' +
'            actionsContainer.style.cssText = "display: flex; gap: 8px; align-items: center; margin-left: auto;";\n' +
'            const tryBtn = header.querySelector(".try-btn");\n' +
'            if (tryBtn) actionsContainer.appendChild(tryBtn);\n' +
'            header.appendChild(actionsContainer);\n' +
'          }\n\n' +
'          const copyBtn = document.createElement("button");\n' +
'          copyBtn.className = "copy-btn";\n' +
'          copyBtn.innerHTML = "📋 Copy";\n' +
'          copyBtn.style.cssText = "background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: \'Inter\', sans-serif; white-space: nowrap;";\n' +
'          copyBtn.addEventListener("click", () => {\n' +
'            navigator.clipboard.writeText(rawCode).then(() => {\n' +
'              copyBtn.innerHTML = "✅ Copied!";\n' +
'              setTimeout(() => { copyBtn.innerHTML = "📋 Copy"; }, 2000);\n' +
'            });\n' +
'          });\n' +
'          actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);\n\n' +
'          const tryBtn = actionsContainer.querySelector(".try-btn");\n' +
'          if (tryBtn) {\n' +
'            tryBtn.addEventListener("click", (e) => {\n' +
'              e.preventDefault();\n' +
'              localStorage.setItem("code_csharp", rawCode);\n' +
'              window.location.href = "/online-csharp-compiler.html";\n' +
'            });\n' +
'          }\n' +
'        });\n' +
'      });\n' +
'    })();\n' +
'  </script>\n' +
'</head>\n' +
'<body class="lang-csharp">\n' +
'  <script src="/site-nav.js"></script>\n\n' +
'  <div class="layout">\n' +
'    <!-- LEFT SIDEBAR -->\n' +
'    <aside class="sidebar">\n' +
'      <div class="sidebar-heading">C# Master Course</div>\n' +
'      <a href="/blog-csharp.html" class="sidebar-home-link">\n' +
'        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>\n' +
'        <span>C# Course HOME</span>\n' +
'      </a>\n' +
'      <div style="padding: 6px 12px 2px 12px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text3);">Curriculum</div>\n' +
accordionSidebar +
'    </aside>\n\n' +
'    <!-- MAIN CONTENT -->\n' +
'    <main class="content">\n' +
'      <div class="breadcrumb">\n' +
'        <a href="/">Home</a><span class="sep">›</span>\n' +
'        <a href="/blog.html">Tutorials</a><span class="sep">›</span>\n' +
'        <a href="/blog-csharp.html">C# Masterclass</a><span class="sep">›</span>\n' +
'        <span class="current">Chapter ' + currentNum + ': ' + title + '</span>\n' +
'      </div>\n\n' +
'      <h1 class="page-title">' + title + '</h1>\n\n' +
'      <div class="page-meta">\n' +
'        <span class="badge">⚡ C# 12 &amp; .NET 8</span>\n' +
'        <span class="badge">🟢 Chapter ' + currentNum + ' of 35</span>\n' +
'        <span class="badge">📂 ' + phaseTag + ': ' + phaseTitle + '</span>\n' +
'        <span class="badge">📅 2026 Edition</span>\n' +
'      </div>\n\n' +
'      <!-- Subtopics Pill Bar -->\n' +
'      <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px;">\n' +
'        <span style="color:#a78bfa; font-weight:700;">📌 Covered in this chapter:</span>\n' +
'        <span>' + subtopics + '</span>\n' +
'      </div>\n\n' +
'      ' + contentBody + '\n\n' +
'      ' + navFooterHtml + '\n' +
'    </main>\n' +
'  </div>\n\n' +
'  <script src="/site-footer.js"></script>\n' +
'</body>\n' +
'</html>';
}

module.exports = {
  wrapCSharpPage,
  CSHARP_CURRICULUM
};
