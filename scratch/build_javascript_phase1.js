const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const jsDir = path.join(baseDir, 'blog-javascript');

if (!fs.existsSync(jsDir)) {
  fs.mkdirSync(jsDir, { recursive: true });
}

// 1. Specialized JavaScript & Accordion CSS
const jsAccordionCss = `/* Specialized styling enhancements for JavaScript tutorial lessons & Accordion */
.content {
  max-width: 1080px !important;
  width: 100%;
}

.sidebar-home-link {
  display: flex !important;
  align-items: center;
  gap: 10px;
  padding: 10px 14px !important;
  margin: 0 4px 8px 4px !important;
  background: rgba(247, 223, 30, 0.08) !important;
  border: 1px solid rgba(247, 223, 30, 0.25) !important;
  border-radius: 9px !important;
  color: #f7df1e !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-home-link:hover {
  background: rgba(247, 223, 30, 0.16) !important;
  border-color: #f7df1e !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(247, 223, 30, 0.2);
}

.sidebar-home-link.active {
  background: linear-gradient(135deg, rgba(247, 223, 30, 0.18), rgba(20, 24, 32, 0.8)) !important;
  border-color: #f7df1e !important;
  color: #f7df1e !important;
  box-shadow: 0 0 12px rgba(247, 223, 30, 0.25);
}

.sidebar-accordion {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 0 4px;
  margin-top: 6px;
}

.accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  background: #141922;
  border: 1px solid #27303f;
  border-radius: 10px;
  color: var(--text, #f0f6fc);
  cursor: pointer;
  text-align: left;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  user-select: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.accordion-header:hover {
  background: #1a2230;
  border-color: #38455a;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.accordion-header.active {
  background: linear-gradient(135deg, rgba(247, 223, 30, 0.12) 0%, rgba(20, 25, 34, 0.9) 100%);
  border-color: #f7df1e;
  box-shadow: 0 0 14px rgba(247, 223, 30, 0.18);
}

.accordion-header-main {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
}

.phase-icon-box {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.accordion-header.active .phase-icon-box {
  background: rgba(247, 223, 30, 0.2);
  border-color: rgba(247, 223, 30, 0.4);
  transform: scale(1.05);
}

.phase-info {
  display: flex;
  flex-direction: column;
  gap: 1.5px;
  min-width: 0;
}

.phase-tag {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--text3, #8b949e);
  line-height: 1;
}

.accordion-header.active .phase-tag {
  color: #f7df1e;
}

.phase-title {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text, #ffffff);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.accordion-header-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.phase-count-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text2, #8b949e);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: -0.2px;
}

.accordion-header.active .phase-count-badge {
  background: rgba(247, 223, 30, 0.2);
  color: #f7df1e;
  border-color: rgba(247, 223, 30, 0.35);
  font-weight: 700;
}

.accordion-chevron {
  color: var(--text3, #8b949e);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;
  flex-shrink: 0;
}

.accordion-header.active .accordion-chevron {
  transform: rotate(90deg);
  color: #f7df1e;
}

.accordion-content {
  display: none;
  flex-direction: column;
  padding: 4px 0 6px 10px;
  border-left: 2px solid rgba(247, 223, 30, 0.35);
  margin-left: 17px;
  margin-top: 3px;
  margin-bottom: 5px;
  gap: 2px;
}

.accordion-content.open {
  display: flex;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.accordion-content a {
  display: block;
  padding: 6px 10px;
  font-size: 12px;
  color: var(--text2, #8b949e);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.15s ease;
  line-height: 1.35;
}

.accordion-content a:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.06);
  transform: translateX(2px);
}

.accordion-content a.active {
  color: #121212 !important;
  background: #f7df1e !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(247, 223, 30, 0.35);
}

/* ROADMAP CARDS & LESSON ROWS */
.curriculum-roadmap-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;
}

.phase-roadmap-card {
  background: #141922;
  border: 1px solid #27303f;
  border-radius: 12px;
  padding: 20px 22px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.phase-roadmap-card:hover {
  border-color: rgba(247, 223, 30, 0.4);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.phase-roadmap-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding-bottom: 12px;
  border-bottom: 1px solid #232c3b;
}

.phase-roadmap-title-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.phase-roadmap-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(247, 223, 30, 0.12);
  border: 1px solid rgba(247, 223, 30, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.phase-roadmap-tag {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #f7df1e;
  margin-bottom: 2px;
}

.phase-roadmap-title {
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.phase-roadmap-badge {
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #8b949e;
  font-family: 'JetBrains Mono', monospace;
}

.phase-roadmap-desc {
  font-size: 13.5px;
  color: #8b949e;
  margin: 12px 0 16px 0;
  line-height: 1.6;
}

.phase-lessons-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.curriculum-lesson-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 11px 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}

.curriculum-lesson-row:hover {
  background: rgba(247, 223, 30, 0.08);
  border-color: rgba(247, 223, 30, 0.35);
  transform: translateX(3px);
}

.lesson-row-left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.lesson-idx {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(247, 223, 30, 0.15);
  color: #f7df1e;
  font-size: 12px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.curriculum-lesson-row:hover .lesson-idx {
  background: #f7df1e;
  color: #121212;
}

.lesson-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.lesson-title {
  font-size: 14px;
  font-weight: 700;
  color: #e6edf3;
  transition: color 0.15s;
}

.curriculum-lesson-row:hover .lesson-title {
  color: #f7df1e;
}

.lesson-subtopics {
  font-size: 12px;
  color: #8b949e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lesson-row-right {
  flex-shrink: 0;
}

.lesson-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #f7df1e;
  padding: 5px 12px;
  border-radius: 6px;
  background: rgba(247, 223, 30, 0.1);
  border: 1px solid rgba(247, 223, 30, 0.2);
  transition: all 0.18s ease;
}

.curriculum-lesson-row:hover .lesson-btn {
  background: #f7df1e;
  color: #121212;
}

.curriculum-lesson-row:hover .lesson-btn .arrow {
  transform: translateX(3px);
}

.lesson-btn .arrow {
  transition: transform 0.18s ease;
}

.try-box {
  background: linear-gradient(135deg, rgba(247, 223, 30, 0.08) 0%, rgba(20, 24, 32, 0.6) 100%);
  border: 1px solid rgba(247, 223, 30, 0.25);
  border-radius: var(--radius, 12px);
  padding: 24px;
  margin: 32px 0;
}

.try-box .try-title {
  font-weight: 700;
  color: #f7df1e;
  margin-bottom: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.try-box .run-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  background: linear-gradient(135deg, #f7df1e, #eab308);
  color: #121212 !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 14px rgba(247, 223, 30, 0.3);
}

.try-box .run-btn:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

.callout {
  background: #161b22;
  border: 1px solid #30363d;
  border-left: 4px solid #f7df1e;
  padding: 18px 22px;
  border-radius: var(--radius, 12px);
  margin: 28px 0;
}

.callout .callout-title {
  font-weight: 700;
  color: #f7df1e;
  margin-bottom: 8px;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.diagram-box {
  background: #0d1117;
  border: 1px solid #21262d;
  border-radius: 10px;
  padding: 18px 20px;
  margin: 20px 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #f7df1e;
  line-height: 1.55;
  white-space: pre !important;
  overflow-x: auto;
}

.faq-card {
  background: #141820;
  border: 1px solid #30363d;
  border-left: 4px solid #f7df1e;
  border-radius: 10px;
  padding: 18px 22px;
  margin-bottom: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, border-color 0.2s;
}

.faq-card:hover {
  transform: translateX(3px);
  border-color: #f7df1e;
}

.faq-card h4 {
  color: #f7df1e !important;
  font-size: 15.5px;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.faq-card p {
  color: #c9d1d9;
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
}

.author {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--border, #30363d);
  color: var(--text2, #8b949e);
  font-size: 13.5px;
}

.author .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f7df1e, #eab308);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #121212;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(247, 223, 30, 0.3);
}

body.light-theme .accordion-header {
  background: #ffffff;
  border-color: #e2e8f0;
  color: #0f172a;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
body.light-theme .accordion-header:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
body.light-theme .accordion-header.active {
  background: linear-gradient(135deg, #fefce8 0%, #ffffff 100%);
  border-color: #f7df1e;
  box-shadow: 0 2px 10px rgba(247, 223, 30, 0.15);
}
body.light-theme .phase-icon-box {
  background: #f1f5f9;
  border-color: #e2e8f0;
}
body.light-theme .accordion-header.active .phase-icon-box {
  background: #fef08a;
  border-color: #fde047;
}
body.light-theme .phase-tag {
  color: #64748b;
}
body.light-theme .accordion-header.active .phase-tag {
  color: #ca8a04;
}
body.light-theme .phase-title {
  color: #0f172a;
}
body.light-theme .phase-count-badge {
  background: #f1f5f9;
  color: #475569;
  border-color: #e2e8f0;
}
body.light-theme .accordion-header.active .phase-count-badge {
  background: #fef08a;
  color: #ca8a04;
  border-color: #fde047;
}
body.light-theme .accordion-chevron {
  color: #94a3b8;
}
body.light-theme .accordion-header.active .accordion-chevron {
  color: #ca8a04;
}
body.light-theme .accordion-content a {
  color: #475569;
}
body.light-theme .accordion-content a:hover {
  color: #0f172a;
  background: #f1f5f9;
}
body.light-theme .accordion-content a.active {
  background: #f7df1e !important;
  color: #121212 !important;
}
body.light-theme .try-box {
  background: #fefce8;
  border-color: #fef08a;
}
body.light-theme .callout {
  background: #f8fafc;
  border-color: #cbd5e1;
  border-left-color: #ca8a04;
}
body.light-theme .callout .callout-title {
  color: #a16207;
}
body.light-theme .diagram-box {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}
body.light-theme .faq-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #ca8a04;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
body.light-theme .faq-card h4 {
  color: #a16207 !important;
}
body.light-theme .faq-card p {
  color: #334155;
}
`;

fs.writeFileSync(path.join(jsDir, 'style.css'), jsAccordionCss, 'utf8');

// JAVASCRIPT MASTERCLASS CURRICULUM PHASES
const JS_CURRICULUM = [
  {
    id: 'phase1',
    tag: 'Phase 01',
    title: 'JavaScript Fundamentals',
    icon: '🟨',
    desc: 'What is JavaScript?, History & Brendan Eich, Web uses, JS vs Java, Browser role & V8 engine, First program, 3 Methods to add JS to HTML (Inline, Internal, External), console.log(), Comments, Statements, Semicolons & ASI, Case sensitivity, Strict mode ("use strict"), and 3 Error types (Syntax, Runtime, Logical).',
    lessons: [
      { num: 1, file: '01-javascript-fundamentals.html', title: '1. Welcome & JS Fundamentals', subtopics: 'JS ante enti? · History & Uses · JS vs Java · Browser Role · First Program · Adding to HTML (Inline/Internal/External) · console.log() · Strict Mode' },
      { num: 2, file: '02-javascript-syntax-and-errors.html', title: '2. Syntax, Statements & Errors', subtopics: 'Comments · Statements · Semicolons & ASI · Case Sensitivity · 3 Error Types (Syntax, Runtime, Logical)' }
    ]
  },
  {
    id: 'phase2',
    tag: 'Phase 02',
    title: 'Variables & Data Types',
    icon: '📦',
    desc: 'Variables, var vs let vs const, TDZ (Temporal Dead Zone), Primitive types (Number, String, Boolean, BigInt, Symbol, null, undefined), Reference types (Object, Array, Function), and typeof operator.',
    lessons: [
      { num: 3, file: 'variables.html', title: '3. Variables (var, let & const)', subtopics: 'var vs let vs const · Scope · Hoisting · Temporal Dead Zone (TDZ)' },
      { num: 4, file: 'operators.html', title: '4. Data Types & Type Conversion', subtopics: '7 Primitives · Reference Objects · Coercion vs Explicit Conversion · typeof Operator' }
    ]
  },
  {
    id: 'phase3',
    tag: 'Phase 03',
    title: 'Operators & Control Flow',
    icon: '⚡',
    desc: 'Arithmetic, comparison (== vs ===), logical, ternary operator, short-circuiting, if-else, and switch statements.',
    lessons: [
      { num: 5, file: 'conditionals.html', title: '5. Conditionals (if-else & switch)', subtopics: 'Strict Equality (===) · Ternary · Short-circuiting (&& / ||) · Switch Statements' },
      { num: 6, file: 'loops.html', title: '6. Loops & Control Flow', subtopics: 'for, while, do-while · for...of & for...in · break & continue' }
    ]
  },
  {
    id: 'phase4',
    tag: 'Phase 04',
    title: 'Strings & Functions',
    icon: '🧩',
    desc: 'String manipulation, template literals, function declarations, function expressions, arrow functions, and default parameters.',
    lessons: [
      { num: 7, file: 'strings.html', title: '7. Strings & Template Literals', subtopics: 'String Methods · Template Literals (\`...\`) · Slicing & Regex Search' },
      { num: 8, file: 'functions.html', title: '8. Functions & Arrow Syntax', subtopics: 'Function Declaration vs Expression · Arrow Functions · Default Parameters · Rest Operator' }
    ]
  },
  {
    id: 'phase5',
    tag: 'Phase 05',
    title: 'Arrays & Objects',
    icon: '📊',
    desc: 'Array manipulation, iteration methods (map, filter, reduce), object literals, JSON, and ES6 destructuring.',
    lessons: [
      { num: 9, file: 'arrays.html', title: '9. Arrays & Iteration Methods', subtopics: 'Mutating Methods · map, filter, reduce, find · Array Spread' },
      { num: 10, file: 'objects.html', title: '10. Objects & JSON', subtopics: 'Object Literals · Properties & Methods · Object.keys/values/entries · JSON Parsing' },
      { num: 11, file: 'es6-features.html', title: '11. ES6+ Destructuring & Spread', subtopics: 'Array & Object Destructuring · Spread/Rest (...) · Nullish Coalescing (??)' }
    ]
  },
  {
    id: 'phase6',
    tag: 'Phase 06',
    title: 'Advanced Functions & OOP',
    icon: '🏗️',
    desc: 'Lexical scope, closures, higher-order functions, Object-Oriented JS, prototypes, ES6 classes, and this keyword binding.',
    lessons: [
      { num: 12, file: 'closures.html', title: '12. Closures & Higher-Order Functions', subtopics: 'Lexical Scope · Closures · Currying · Callback Functions' },
      { num: 13, file: 'oop.html', title: '13. OOP: Classes & Prototypes', subtopics: 'Prototypes & Inheritance · ES6 Classes · Constructors · this Keyword Binding (call/apply/bind)' }
    ]
  },
  {
    id: 'phase7',
    tag: 'Phase 07',
    title: 'Asynchronous JavaScript',
    icon: '⏳',
    desc: 'Event Loop, Call Stack, Task Queue, Microtask Queue, Callbacks, Promises, async/await, and Fetch API.',
    lessons: [
      { num: 14, file: 'promises.html', title: '14. Promises & Async/Await', subtopics: 'Event Loop · Call Stack · Promise (.then/.catch) · async/await · Fetch API' },
      { num: 15, file: 'exceptions.html', title: '15. Error Handling & Debugging', subtopics: 'try...catch...finally · Custom Error Classes · Console Debugging' }
    ]
  },
  {
    id: 'phase8',
    tag: 'Phase 08',
    title: 'DOM & Web Browser APIs',
    icon: '🌐',
    desc: 'DOM Selection, manipulation, event handling, Event Delegation, LocalStorage, SessionStorage, and Web APIs.',
    lessons: [
      { num: 16, file: 'dom.html', title: '16. DOM Basics & Event Listeners', subtopics: 'querySelector · DOM Modification · addEventListener · Event Bubbling & Delegation · LocalStorage' }
    ]
  }
];

// Generate Accordion Sidebar HTML
function generateJSAccordionSidebar(currentFile = null) {
  let html = `    <div class="sidebar-accordion">\n`;

  JS_CURRICULUM.forEach(phase => {
    const hasActive = phase.lessons.some(l => l.file === currentFile);
    const isOpen = hasActive || (currentFile === null && phase.id === 'phase1');
    const activeHeaderClass = isOpen ? ' active' : '';
    const openContentClass = isOpen ? ' open' : '';

    html += `      <!-- ${phase.tag}: ${phase.title} -->\n`;
    html += `      <button class="accordion-header${activeHeaderClass}" onclick="toggleAccordion(this)">\n`;
    html += `        <div class="accordion-header-main">\n`;
    html += `          <span class="phase-icon-box">${phase.icon}</span>\n`;
    html += `          <div class="phase-info">\n`;
    html += `            <span class="phase-tag">${phase.tag}</span>\n`;
    html += `            <span class="phase-title">${phase.title}</span>\n`;
    html += `          </div>\n`;
    html += `        </div>\n`;
    html += `        <div class="accordion-header-meta">\n`;
    html += `          <span class="phase-count-badge">${phase.lessons.length} Ch</span>\n`;
    html += `          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">\n`;
    html += `            <polyline points="9 18 15 12 9 6"></polyline>\n`;
    html += `          </svg>\n`;
    html += `        </div>\n`;
    html += `      </button>\n`;
    html += `      <div class="accordion-content${openContentClass}">\n`;

    phase.lessons.forEach(l => {
      const isActive = l.file === currentFile ? ' class="active"' : '';
      html += `        <a href="/blog-javascript/${l.file}"${isActive}>${l.title}</a>\n`;
    });

    html += `      </div>\n\n`;
  });

  html += `    </div>\n`;
  return html;
}

// Generate Lesson Page Shell
function wrapJSLessonPage(title, desc, filename, currentNum, subtopics, contentBody, prevFile, prevTitle, nextFile, nextTitle) {
  const accordionSidebar = generateJSAccordionSidebar(filename);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — JavaScript Tutorial | Our Compiler</title>
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="javascript tutorial, ${title.toLowerCase()}, learn javascript, javascript online compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-javascript/${filename}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="/site-nav.css" />
  
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

    function highlightJSCode(rawCode) {
      const tokens = [];
      const pushToken = (cls, text) => {
        const id = tokens.length;
        tokens.push(\`<span class="\${cls}">\${text}</span>\`);
        return \`___JS_TOK_\${id}___\`;
      };

      // 1. Comments
      let code = rawCode.replace(/(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*$)/gm, m => pushToken('cm', m));

      // 2. Strings & Template Literals
      code = code.replace(/("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)/g, m => pushToken('st', m));

      // 3. Keywords
      const kwList = ['const','let','var','function','return','if','else','switch','case','default','break','continue','for','while','do','try','catch','finally','throw','new','this','class','extends','super','import','export','async','await','yield','of','in','typeof','instanceof','delete','void'];
      const kwRegex = new RegExp(\`\\\\b(\${kwList.join('|')})\\\\b\`, 'g');
      code = code.replace(kwRegex, m => pushToken('kw', m));

      // 4. Built-in Classes & Objects
      const typeList = ['console','document','window','Math','Array','Object','String','Number','Boolean','Promise','JSON','Set','Map','Date','Error','RegExp','Symbol','BigInt','undefined','null','true','false'];
      const typeRegex = new RegExp(\`\\\\b(\${typeList.join('|')})\\\\b\`, 'g');
      code = code.replace(typeRegex, m => pushToken('vr', m));

      // 5. Functions & Methods
      code = code.replace(/\\b([a-zA-Z_][a-zA-Z0-9_]*)\\s*(?=\\()/g, (m, fnName) => {
        if (['if','for','while','switch','catch'].includes(fnName)) return m;
        return pushToken('fn', fnName);
      });

      // 6. Numbers
      code = code.replace(/\\b(\\d+(?:\\.\\d+)?)\\b/g, m => pushToken('nu', m));

      // 7. Restore Tokens
      code = code.replace(/___JS_TOK_(\\d+)___/g, (_, id) => tokens[id]);
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

        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;

          const rawCode = codeEl.textContent;
          codeEl.innerHTML = highlightJSCode(rawCode);

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
              localStorage.setItem('code_nodejs', rawCode);
              localStorage.setItem('code_javascript', rawCode);
              window.location.href = '/?lang=nodejs';
            });
          }
        });

        document.querySelectorAll('.try-box').forEach(tryBox => {
          const codeEl = tryBox.querySelector('pre code');
          const runBtn = tryBox.querySelector('.run-btn');
          if (codeEl) {
            const rawCode = codeEl.textContent;
            codeEl.innerHTML = highlightJSCode(rawCode);
            if (runBtn) {
              runBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.setItem('code_nodejs', rawCode);
                localStorage.setItem('code_javascript', rawCode);
                window.location.href = '/?lang=nodejs';
              });
            }
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-javascript">

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html" class="active">JavaScript</a>
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
  <!-- LEFT SIDEBAR WITH COLLAPSIBLE ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">JavaScript Course</div>
    <a href="/blog-javascript.html" class="sidebar-home-link">🟨 JavaScript HOME</a>

${accordionSidebar}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/?lang=nodejs" style="color:#f7df1e; font-weight:700;">▶ Try JavaScript Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-python.html">Python Course (65 Lessons)</a>
    <a href="/blog-java.html">Java Course (32 Lessons)</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-javascript.html">JavaScript</a><span class="sep">›</span>
      <span class="current">Lesson ${currentNum}: ${title}</span>
    </div>

    <h1 class="page-title">${title}</h1>

    <div class="page-meta">
      <span class="badge">🟨 JavaScript (ES2026+)</span>
      <span class="badge">🟢 Lesson ${currentNum}</span>
      <span class="badge">📂 Phase 01: JavaScript Fundamentals</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Subtopics Pill Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#f7df1e; font-weight:700;">📌 Covered in this lesson:</span>
      <span>${subtopics}</span>
    </div>

${contentBody}

    <div class="nav-footer">
      ${prevFile ? `
      <a href="${prevFile}" class="nav-btn">
        <span class="label">← Previous Lesson</span>
        <span class="title">${prevTitle}</span>
      </a>` : `
      <a href="/blog-javascript.html" class="nav-btn">
        <span class="label">← JS Overview</span>
        <span class="title">Course Index</span>
      </a>`}

      ${nextFile ? `
      <a href="${nextFile}" class="nav-btn" style="text-align:right;">
        <span class="label">Next Lesson →</span>
        <span class="title">${nextTitle}</span>
      </a>` : `
      <a href="/blog-javascript.html" class="nav-btn" style="text-align:right;">
        <span class="label">Next Phase →</span>
        <span class="title">Phase 2: Variables</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD LESSON 1: JavaScript Fundamentals (Phase 1 Part 1) ────────────────
function buildLesson1() {
  const title = "Welcome & JavaScript Fundamentals";
  const desc = "Complete guide to JavaScript Basics: JavaScript ante enti?, history by Brendan Eich, web uses, JS vs Java, browser role & V8 engine, first program, adding JS to HTML (Inline, Internal, External), console.log(), and strict mode ('use strict').";
  const filename = "01-javascript-fundamentals.html";
  const subtopics = "JS ante enti? · History & Uses · JS vs Java · Browser Role & V8 Engine · First Program · 3 Methods to Add JS to HTML (Inline/Internal/External) · console.log() · Strict Mode (\"use strict\")";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to the <strong>Complete JavaScript Masterclass (Phase 1: JavaScript Fundamentals)</strong>! JavaScript (JS) is the world's most popular programming language and the undeniable backbone of the Web. Over <strong>98% of all websites</strong> on the internet run JavaScript to deliver responsive user interfaces, dynamic interactivity, and server-side APIs via Node.js. In this comprehensive lesson, we will cover what JavaScript is, its history, browser execution engines, methods to include JS in HTML, <code>console.log()</code>, and modern strict mode (<code>"use strict"</code>).</p>
    </div>

    <!-- SECTION 1: JavaScript Ante Enti? -->
    <div class="section-title"><span class="num">1</span>JavaScript Ante Enti? (What is JavaScript?)</div>
    <div class="section-body">
      <p><strong>JavaScript</strong> anedhi oka high-level, dynamically typed, prototype-based, interpreted/JIT-compiled programming language. Idi HTML (structure) mariyu CSS (styling) tho kalisi web pages ni <strong>dynamic & interactive</strong> ga marusthundi.</p>
      
      <p>Traditional static web page lo HTML/CSS undhi anukundam — adhi purely static content chupisthundhi. Kani JavaScript tho meeru animations, form validations, button clicks, live search suggestions, dark mode toggles, and server data fetching (API calls without reloading page) acheive cheyyavachu.</p>
    </div>

    <!-- SECTION 2: History & Uses -->
    <div class="section-title"><span class="num">2</span>JavaScript History & Modern Industry Uses</div>
    <div class="section-body">
      <p>1995 lo Netscape Communications lo unna <strong>Brendan Eich</strong> direct ga <strong>just 10 days lo</strong> JavaScript language ni create chesaru! Modatlo dheeni peru <em>Mocha</em>, tharvatha <em>LiveScript</em>, mariyu aurojullo popular ga unna Java language marketing trend ni thagattu final ga <strong>JavaScript</strong> ani perupettaru.</p>
      
      <p>Ippudu JavaScript <strong>ECMAScript (ES6 / ES2026+)</strong> standard dwara manage cheyyabaduthundhi.</p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f7df1e; border-radius:8px; padding:16px;">
          <strong style="color:#f7df1e; font-size:15px;">🌐 1. Front-End Web Development</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:6px; line-height:1.6;">React, Vue.js, Angular, Next.js frameworks dwara dynamic single-page applications (SPAs) build cheyyavachu.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #38bdf8; border-radius:8px; padding:16px;">
          <strong style="color:#38bdf8; font-size:15px;">🖥️ 2. Back-End Server Development</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:6px; line-height:1.6;"><strong>Node.js & Express.js</strong> dwara server-side backend REST APIs and microservices run cheyyavachu.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:16px;">
          <strong style="color:#3fb950; font-size:15px;">📱 3. Mobile & Desktop Apps</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:6px; line-height:1.6;"><strong>React Native</strong> for iOS/Android apps & <strong>Electron.js</strong> for desktop apps (VS Code, Discord, Slack are built on JS!).</p>
        </div>
      </div>
    </div>

    <!-- SECTION 3: JS vs Java -->
    <div class="section-title"><span class="num">3</span>JavaScript vs Java (Crucial Differences)</div>
    <div class="section-body">
      <p>Chaala mandhi beginners Java & JavaScript renduu okate anukuntaru. Kani avi renduu completely different languages! A famous developer quote says: <em>"Java is to JavaScript as Car is to Carpet!"</em> 🚗 vs 🧹</p>

      <table class="tbl">
        <tr><th>Feature</th><th>Java</th><th>JavaScript</th></tr>
        <tr>
          <td><strong>Language Type</strong></td>
          <td>Statically Typed (Type specified at compile time)</td>
          <td>Dynamically Typed (Type determined at runtime)</td>
        </tr>
        <tr>
          <td><strong>Execution Model</strong></td>
          <td>Compiled to Bytecode (<code>.class</code>) &rarr; Runs on JVM</td>
          <td>Interpreted / JIT-compiled directly in JS Engine</td>
        </tr>
        <tr>
          <td><strong>OOP Model</strong></td>
          <td>Strict Class-based Object Oriented</td>
          <td>Prototype-based Object Oriented</td>
        </tr>
        <tr>
          <td><strong>Variable Syntax</strong></td>
          <td><code>int score = 95;</code></td>
          <td><code>let score = 95;</code></td>
        </tr>
        <tr>
          <td><strong>Primary Ecosystem</strong></td>
          <td>Enterprise Backends, Android, Banking</td>
          <td>Web Browsers, Full-Stack Web, Node.js</td>
        </tr>
      </table>
    </div>

    <!-- SECTION 4: Browser Role & JS Engines -->
    <div class="section-title"><span class="num">4</span>Browser lo JavaScript Role & JS Engines</div>
    <div class="section-body">
      <p>Web Browser (Chrome, Firefox, Safari, Edge) lo JavaScript key role play chesthundi. Computer CPU ki direct ga JavaScript execution theliyadhu, andhuke prati browser lo oka <strong>JavaScript Engine</strong> built-in ga untundhi:</p>

      <table class="tbl">
        <tr><th>Web Browser</th><th>JavaScript Engine Name</th><th>Developer / Maintainer</th></tr>
        <tr><td><strong>Google Chrome & Node.js</strong></td><td><strong>V8 Engine</strong></td><td>Google (Written in C++)</td></tr>
        <tr><td><strong>Mozilla Firefox</strong></td><td><strong>SpiderMonkey</strong></td><td>Mozilla Foundation</td></tr>
        <tr><td><strong>Apple Safari</strong></td><td><strong>JavaScriptCore (Nitro)</strong></td><td>Apple Inc.</td></tr>
        <tr><td><strong>Microsoft Edge</strong></td><td><strong>V8 Engine</strong> (Chromium-based)</td><td>Microsoft / Google</td></tr>
      </table>
    </div>

    <!-- SECTION 5: 3 Methods to Add JS to HTML -->
    <div class="section-title"><span class="num">5</span>Adding JavaScript to HTML (3 Methods)</div>
    <div class="section-body">
      <p>HTML page lo JavaScript add cheyyadaniki 3 main approaches unnaayi:</p>

      <!-- Method 1: Inline JS -->
      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ff7b72; border-radius:8px; padding:16px; margin:14px 0;">
        <h4 style="color:#ff7b72; margin-bottom:6px;">Method 1: Inline JavaScript (Not Recommended for Large Apps)</h4>
        <p style="font-size:13px; color:var(--text2);">Direct ga HTML element tag inner event attributes lo code rayadam:</p>
        <code style="display:block; margin-top:6px; background:#0d1117; padding:8px 12px; border-radius:6px; color:#e6edf3;">&lt;button onclick="alert('Button clicked!')"&gt;Click Me&lt;/button&gt;</code>
      </div>

      <!-- Method 2: Internal JS -->
      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #58a6ff; border-radius:8px; padding:16px; margin:14px 0;">
        <h4 style="color:#58a6ff; margin-bottom:6px;">Method 2: Internal JavaScript</h4>
        <p style="font-size:13px; color:var(--text2);">HTML file lo <code>&lt;script&gt;</code> tags lopala JavaScript logic rayadam:</p>
        <div class="code-block" style="margin-top:8px;">
          <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Internal JS Demo&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Welcome to Our Compiler&lt;/h1&gt;
    &lt;script&gt;
        console.log("Internal JavaScript Executed!");
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
        </div>
      </div>

      <!-- Method 3: External JS -->
      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:16px; margin:14px 0;">
        <h4 style="color:#3fb950; margin-bottom:6px;">Method 3: External JavaScript (Industry Best Practice ⭐)</h4>
        <p style="font-size:13px; color:var(--text2);">Separate <code>script.js</code> file maintain chesi, HTML file lo <code>&lt;script src="script.js" defer&gt;&lt;/script&gt;</code> dwara link cheyyadam. Code organization, caching, and maintainability ki idhe standard!</p>
      </div>
    </div>

    <!-- SECTION 6: console.log() and Strict Mode -->
    <div class="section-title"><span class="num">6</span>console.log() & Strict Mode ("use strict")</div>
    <div class="section-body">
      <p>JavaScript lo debugging and console output print cheyyadaniki <code>console.log()</code> vadathamu. Browser DevTools Console (F12) or terminal lo idhi print avthundhi.</p>

      <h4 style="color:#f7df1e; margin:14px 0 6px;">Strict Mode ("use strict";)</h4>
      <p>ECMAScript 5 lo introduce chesina <strong>Strict Mode</strong> JavaScript engine ki strict execution rules enforcement isthundi. Undeclared global variables, accidental silent bugs, and unsafe operations ni errors ga throw chesthundi.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Strict Mode & console.log</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// 1. Standard Console Output
console.log("Hello, JavaScript!");
console.log("Welcome to Our Compiler Masterclass 🚀");

// 2. Logging Variables
let userRole = "Full Stack Engineer";
let experienceYears = 2026;
console.log("Role:", userRole, "| Year:", experienceYears);

// 3. Strict Mode Error Prevention:
// Without "use strict", x = 10 creates an accidental global variable.
// With "use strict", the line below throws: ReferenceError: x is not defined
// x = 10;</code></pre>
      </div>
    </div>

    <!-- SECTION 7: Try It Yourself Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — First JS Challenge</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this interactive JavaScript program that calculates portfolio stats and logs formatted messages:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

console.log("=================================");
console.log("⚡ DEVELOPER PROFILE CARD");
console.log("=================================");

let developerName = "Balaji Nayak";
let targetStack = "JavaScript (React & Node.js)";
let isCompletedPhase1 = true;

console.log("Name:", developerName);
console.log("Stack:", targetStack);
console.log("Phase 1 Status:", isCompletedPhase1 ? "Completed ✅" : "In Progress ⏳");
console.log("=================================");</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">Run This Code in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for JavaScript ES2026+</div>
    </div>
  `;

  const html = wrapJSLessonPage(title, desc, filename, 1, subtopics, contentBody, null, null, '02-javascript-syntax-and-errors.html', '2. Syntax & Error Handling');
  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 2: Syntax, Statements & Error Handling (Phase 1 Part 2) ───
function buildLesson2() {
  const title = "Syntax, Statements & Error Handling";
  const desc = "Master JavaScript syntax rules: single and multi-line comments, statements, semicolons & Automatic Semicolon Insertion (ASI), case sensitivity, and the 3 types of Errors (Syntax, Runtime, Logical).";
  const filename = "02-javascript-syntax-and-errors.html";
  const subtopics = "Comments (Single & Multi-line) · Statements · Semicolons & ASI · Case Sensitivity · Syntax Errors · Runtime Errors · Logical Errors";

  const contentBody = `
    <div class="intro-box">
      <p>In this second lesson of Phase 1, we delve into the core grammar rules of JavaScript: <strong>Statements, Semicolons & Automatic Semicolon Insertion (ASI)</strong>, <strong>Case Sensitivity</strong>, <strong>Comments</strong>, and a comprehensive breakdown of the <strong>3 categories of Programming Errors</strong> (Syntax vs Runtime vs Logical errors) with practical debugging strategies.</p>
    </div>

    <!-- SECTION 1: Comments in JavaScript -->
    <div class="section-title"><span class="num">1</span>Comments in JavaScript (Code Documentation)</div>
    <div class="section-body">
      <p>Comments developer rase logic ni explain cheyyadaniki mariyu code readability penchadaniki vadathamu. JS Engine execution time lo comments ni completely ignore chesthundi:</p>

      <table class="tbl">
        <tr><th>Comment Type</th><th>Syntax</th><th>Usage</th></tr>
        <tr>
          <td><strong>1. Single-Line Comment</strong></td>
          <td><code>// Your comment here</code></td>
          <td>Short explanations on a single line.</td>
        </tr>
        <tr>
          <td><strong>2. Multi-Line Comment</strong></td>
          <td><code>/* Line 1<br>Line 2 */</code></td>
          <td>Longer explanations spanning across multiple lines.</td>
        </tr>
        <tr>
          <td><strong>3. JSDoc Comment</strong></td>
          <td><code>/** JSDoc description<br>* @param {string} name */</code></td>
          <td>Used by VS Code and documentation generators for type hints and autocomplete.</td>
        </tr>
      </table>
    </div>

    <!-- SECTION 2: Statements, Semicolons & ASI -->
    <div class="section-title"><span class="num">2</span>Statements, Semicolons & Automatic Semicolon Insertion (ASI)</div>
    <div class="section-body">
      <p>JavaScript lo prati execution instruction ni <strong>Statement</strong> antaru. Statements sequential ga execute avthayi.</p>

      <h4 style="color:#f7df1e; margin:14px 0 6px;">Semicolons (;) & ASI Gotchas</h4>
      <p>Statements చివర <strong>Semicolon <code>;</code></strong> unchadam best practice. JavaScript lo <strong>ASI (Automatic Semicolon Insertion)</strong> అనే feature undhi — meeru semicolon rayaka poina browser automatically insert cheskuntundhi. Kani ASI ni completely trust cheste konni hidden bugs edhuravthayi:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — ASI Return Bug Trap</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

function getUser() {
    // Dangerous ASI Trap:
    // JS inserts semicolon right after return!
    return
    {
        name: "Balaji"
    };
}

console.log("User Object:", getUser()); // Prints undefined instead of Object!</code></pre>
      </div>
    </div>

    <!-- SECTION 3: Case Sensitivity -->
    <div class="section-title"><span class="num">3</span>Case Sensitivity in JavaScript</div>
    <div class="section-body">
      <p>JavaScript is <strong>strictly case-sensitive</strong>. Capital and small letters completely different identifiers ga count avthayi:</p>

      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><code>let score = 100;</code> and <code>let Score = 200;</code> are two separate variables in memory.</li>
        <li>JavaScript keywords MUST be in lowercase: <code>function</code>, <code>if</code>, <code>const</code>, <code>return</code>. (e.g. <code>Function</code> or <code>IF</code> will throw a SyntaxError).</li>
      </ul>
    </div>

    <!-- SECTION 4: The 3 Types of Errors -->
    <div class="section-title"><span class="num">4</span>The 3 Types of Errors (Syntax, Runtime & Logical Errors)</div>
    <div class="section-body">
      <!-- 1. Syntax Errors -->
      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ff7b72; border-radius:8px; padding:18px; margin:16px 0;">
        <h3 style="color:#ff7b72; font-size:16px; margin-bottom:8px;">1. Syntax Errors (Parse-Time Errors)</h3>
        <p style="color:var(--text2); font-size:14px; line-height:1.6;">JavaScript grammar rules ni violate chesinappudu JS engine code parse/tokenize chesetappude (before execution) SyntaxError throw chesi execution completely stop chesthundi.</p>
        
        <div style="font-size:13px; color:var(--text); margin:8px 0;"><strong>Examples:</strong></div>
        <ul style="margin-left:18px; color:var(--text2); font-size:13px; line-height:1.7;">
          <li>Missing closing parenthesis <code>)</code> or bracket.</li>
          <li>Unclosed String literal (missing quote).</li>
          <li>Keyword typo (e.g. <code>fuction myFunc()</code>).</li>
        </ul>
      </div>

      <!-- 2. Runtime Errors -->
      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f7df1e; border-radius:8px; padding:18px; margin:16px 0;">
        <h3 style="color:#f7df1e; font-size:16px; margin-bottom:8px;">2. Runtime Errors (Exceptions)</h3>
        <p style="color:var(--text2); font-size:14px; line-height:1.6;">Code syntax correct gaane parsing complete avthundhi. Kani script run ayye time lo illegal operation (e.g. calling an undefined variable or property on null) jariginappudu script crash ayyi Exception throw chesthundi.</p>
        
        <div style="font-size:13px; color:var(--text); margin:8px 0;"><strong>Examples:</strong></div>
        <ul style="margin-left:18px; color:var(--text2); font-size:13px; line-height:1.7;">
          <li><code>ReferenceError: x is not defined</code> (Accessing un-declared variable).</li>
          <li><code>TypeError: Cannot read properties of null</code> (Calling method on null/undefined).</li>
        </ul>
      </div>

      <!-- 3. Logical Errors -->
      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:18px; margin:16px 0;">
        <h3 style="color:#3fb950; font-size:16px; margin-bottom:8px;">3. Logical Errors (Silent Bugs)</h3>
        <p style="color:var(--text2); font-size:14px; line-height:1.6;">Program 0 error messages tho run avthundhi. Kani developer logic/formula wrong unna karanam ga <strong>wrong output</strong> vasthundhi (hardest to detect).</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Error Types Demo</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

let num1 = 20;
let num2 = 10;

// Correct Sum
let sum = num1 + num2;
console.log("Sum:", sum);

// Logical Error Example:
// Expected average of 20 and 10 is 15.
let wrongAvg = num1 + num2 / 2;    // Evaluates to: 20 + 5 = 25 (BUG!)
let correctAvg = (num1 + num2) / 2; // Evaluates to: (30)/2 = 15 (CORRECT!)

console.log("Wrong Average (Logical Bug):", wrongAvg);
console.log("Correct Average:", correctAvg);</code></pre>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Debugging Exercise</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Fix the logical bug in calculating the total discount below:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript Debugging</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

let price = 500;
let quantity = 2;
let discountPercent = 10; // 10%

let total = price * quantity; // 1000
let discount = (total * discountPercent) / 100; // 100
let finalBill = total - discount;

console.log("Total Amount: Rs." + total);
console.log("Discount: Rs." + discount);
console.log("Final Bill: Rs." + finalBill);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">Run Code in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for JavaScript ES2026+</div>
    </div>
  `;

  const html = wrapJSLessonPage(title, desc, filename, 2, subtopics, contentBody, '01-javascript-fundamentals.html', '1. Welcome & JS Fundamentals', 'variables.html', 'Phase 2: Variables');
  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD blog-javascript.html HOME PAGE ──────────────────────────────────
function buildBlogJSHome() {
  const accordionSidebar = generateJSAccordionSidebar(null);

  let roadmapCardsHtml = '';
  JS_CURRICULUM.forEach(phase => {
    roadmapCardsHtml += `
    <div class="phase-roadmap-card">
      <div class="phase-roadmap-header">
        <div class="phase-roadmap-title-wrap">
          <span class="phase-roadmap-icon">${phase.icon}</span>
          <div>
            <div class="phase-roadmap-tag">${phase.tag}</div>
            <h3 class="phase-roadmap-title">${phase.title}</h3>
          </div>
        </div>
        <span class="phase-roadmap-badge">${phase.lessons.length} In-Depth Lesson${phase.lessons.length > 1 ? 's' : ''}</span>
      </div>
      <p class="phase-roadmap-desc">${phase.desc}</p>
      <div class="phase-lessons-list">
`;

    phase.lessons.forEach(l => {
      const padIdx = String(l.num).padStart(2, '0');
      roadmapCardsHtml += `        <a href="/blog-javascript/${l.file}" class="curriculum-lesson-row">
          <div class="lesson-row-left">
            <span class="lesson-idx">${padIdx}</span>
            <div class="lesson-info">
              <span class="lesson-title">${l.title}</span>
              <span class="lesson-subtopics">${l.subtopics}</span>
            </div>
          </div>
          <div class="lesson-row-right">
            <span class="lesson-btn">Read Chapter <span class="arrow">→</span></span>
          </div>
        </a>\n`;
    });

    roadmapCardsHtml += `      </div>
    </div>\n`;
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>JavaScript Programming Master Tutorial & Complete Roadmap (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master JavaScript from complete beginner to advanced full-stack level with our in-depth combined curriculum, collapsible roadmap across 8 phases, live code execution, Node.js, and interview prep." />
  <meta name="keywords" content="javascript tutorial, js course, learn javascript online, js basics, ES6, promises, async await, nodejs, dom, javascript interview questions" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-javascript.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-javascript/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org Course Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "JavaScript Complete Programming Masterclass (2026 Edition)",
    "description": "Comprehensive JavaScript course covering syntax, V8 engine, ES6+, Async/Await, Promises, Closures, DOM manipulation, Node.js, and technical interview preparation with live runnable code examples.",
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
<body class="lang-javascript">

<!-- TOP NAVIGATION -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html" class="active">JavaScript</a>
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
  <!-- LEFT SIDEBAR WITH COLLAPSIBLE ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">JavaScript Master Course</div>
    <a href="/blog-javascript.html" class="sidebar-home-link active">🟨 JavaScript HOME</a>

${accordionSidebar}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/?lang=nodejs" style="color:#f7df1e; font-weight:700;">▶ Try JavaScript Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-python.html">Python Course (65 Lessons)</a>
    <a href="/blog-java.html">Java Course (32 Lessons)</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">JavaScript Masterclass</span>
    </div>

    <h1 class="page-title">JavaScript Programming Master Tutorial</h1>

    <div class="page-meta">
      <span class="badge">🟨 JavaScript (ES2026+)</span>
      <span class="badge">🟢 16 In-Depth Combined Chapters</span>
      <span class="badge">📂 Collapsible Interactive Roadmap (8 Phases)</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's JavaScript Master Course</strong>. JavaScript is the programming language of the Web powering front-end client applications, full-stack backends with Node.js, mobile apps, and desktop platforms. Each phase in this masterclass combines interconnected topics into a thorough, hands-on learning experience with live runnable code examples.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(247, 223, 30, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(247, 223, 30, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#f7df1e; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning JavaScript?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore fundamentals, variables & types, control flow, functions, arrays & objects, closures, async Promises, or DOM manipulation:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-javascript/01-javascript-fundamentals.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-javascript/variables.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Variables →</a>
        <a href="/blog-javascript/conditionals.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Control Flow →</a>
        <a href="/blog-javascript/functions.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 4: Functions →</a>
        <a href="/blog-javascript/arrays.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: Arrays & Objects →</a>
        <a href="/blog-javascript/closures.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 6: OOP & Closures →</a>
        <a href="/blog-javascript/promises.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 7: Async JS →</a>
        <a href="/blog-javascript/dom.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 8: DOM & Web APIs →</a>
      </div>
    </div>

    <!-- Full Curriculum Roadmap Cards -->
    <div class="section-title"><span class="num">📚</span> Master Course Curriculum Roadmap</div>
    <div class="curriculum-roadmap-container">
${roadmapCardsHtml}
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy & tested on V8 / Node.js runtime · Last updated August 2026</span>
      </div>
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(path.join(baseDir, 'blog-javascript.html'), html, 'utf8');
  console.log('✅ Updated public/blog-javascript.html with Roadmap Cards and Accordion');
}

function run() {
  console.log('🚀 Building JavaScript Masterclass Phase 1...');
  buildLesson1();
  buildLesson2();
  buildBlogJSHome();
  console.log('🎉 JavaScript Phase 1: Fundamentals successfully built!');
}

run();
