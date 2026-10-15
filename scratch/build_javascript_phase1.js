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
    title: 'JavaScript Fundamentals & Basics',
    icon: '🟨',
    desc: 'JavaScript Introduction, Browser Console, <script> tag, External JS, Comments, Statements & Errors, Variables (let, const, var), and Data Types (string, number, boolean, null, undefined, typeof).',
    lessons: [
      { num: 1, file: '01-javascript-fundamentals.html', title: '1. Welcome & JS Fundamentals', subtopics: 'JS ante enti? · History & Uses · Browser Role · First Program' },
      { num: 2, file: '02-javascript-syntax-and-errors.html', title: '2. Setup, Console & Script Tag', subtopics: 'Browser Console · script tag · External .js · Comments · VS Code' },
      { num: 3, file: 'variables.html', title: '3. Variables (let, const, var)', subtopics: 'Variables ante enti? · let vs const vs var · Swapping · Naming Rules' },
      { num: 4, file: 'data-types.html', title: '4. Data Types (string, number, boolean...)', subtopics: 'Primitive Types · typeof · null vs undefined · NaN · \"5\" vs 5' }
    ]
  },
  {
    id: 'phase2',
    tag: 'Phase 02',
    title: 'Operators & Input',
    icon: '⚡',
    desc: 'Arithmetic, Comparison (== vs ===), Logical (&&, ||, !), Ternary, Precedence, Type Conversion, Template Literals, alert(), prompt(), confirm(), and DOM output.',
    lessons: [
      { num: 5, file: '05-operators-expressions-and-precedence.html', title: '5. Operators, Expressions & Precedence', subtopics: 'Arithmetic · Comparison (== vs ===) · Logical · Ternary · Precedence' },
      { num: 6, file: '06-browser-input-and-number-parsing.html', title: '6. Type Conversion & Template Literals', subtopics: 'Number() · parseInt() · String() · Boolean() · Truthy & Falsy · Backticks' },
      { num: 7, file: 'input-output.html', title: '7. Input & Output (alert, prompt...)', subtopics: 'console.log · alert() · prompt() · confirm() · Node readline · DOM output' }
    ]
  },
  {
    id: 'phase3',
    tag: 'Phase 03',
    title: 'Conditionals & Loops',
    icon: '🔀',
    desc: 'if-else branching, ternary expressions, switch statements, for loops, while loops, do-while, and break/continue.',
    lessons: [
      { num: 8, file: 'conditionals.html', title: '8. Conditionals (if-else & switch)', subtopics: 'if-else Chains · Ternary Expressions · Short-circuiting · Switch Statements' },
      { num: 9, file: 'loops.html', title: '9. Loops & Control Flow', subtopics: 'for, while, do-while · for...of · break & continue' }
    ]
  },
  {
    id: 'phase4',
    tag: 'Phase 04',
    title: 'Strings & Functions',
    icon: '🧩',
    desc: 'String methods, template literals, function declarations, function expressions, arrow functions, and default parameters.',
    lessons: [
      { num: 10, file: 'strings.html', title: '10. Strings & Template Literals', subtopics: 'String Methods · Template Literals · Slicing & Splitting' },
      { num: 11, file: 'functions.html', title: '11. Functions & Arrow Syntax', subtopics: 'Function Declaration vs Expression · Arrow Functions · Default Parameters' }
    ]
  },
  {
    id: 'phase5',
    tag: 'Phase 05',
    title: 'Arrays & Objects',
    icon: '📊',
    desc: 'Array manipulation, iteration methods (map, filter, reduce), object literals, JSON, and ES6 destructuring.',
    lessons: [
      { num: 12, file: 'arrays.html', title: '12. Arrays Basics & Methods', subtopics: 'Array Basics · push/pop/shift/unshift · Spread & Destructuring' },
      { num: 13, file: 'array-methods.html', title: '13. Higher-Order Array Methods', subtopics: 'map · filter · reduce · find · forEach' },
      { num: 14, file: 'objects.html', title: '14. Objects & JSON', subtopics: 'Object Literals · Properties & Methods · this Keyword · Destructuring' }
    ]
  },
  {
    id: 'phase6',
    tag: 'Phase 06',
    title: 'DOM & Browser APIs',
    icon: '🌐',
    desc: 'DOM Selection, manipulation, event handling, Forms, LocalStorage, and Timers.',
    lessons: [
      { num: 15, file: 'dom.html', title: '15. DOM Basics & Tree Selection', subtopics: 'querySelector · textContent · style · classList · createElement' },
      { num: 16, file: 'events-and-forms.html', title: '16. Events, Listeners & Form Handling', subtopics: 'addEventListener · click · submit · preventDefault · e.target' },
      { num: 17, file: 'browser-apis-and-storage.html', title: '17. LocalStorage & Timers', subtopics: 'localStorage · sessionStorage · JSON Storage · setTimeout · setInterval' }
    ]
  },
  {
    id: 'phase7',
    tag: 'Phase 07',
    title: 'Asynchronous JavaScript & APIs',
    icon: '⏳',
    desc: 'JSON, Fetch API, Promises, async/await, and error handling.',
    lessons: [
      { num: 18, file: 'json-and-fetch-api.html', title: '18. JSON & Fetch API (HTTP)', subtopics: 'JSON.stringify · JSON.parse · fetch() · async/await · HTTP Status' },
      { num: 19, file: 'promises.html', title: '19. Promises & Async/Await', subtopics: 'Callbacks · Promise States · resolve/reject · async/await · try...catch' }
    ]
  },
  {
    id: 'phase8',
    tag: 'Phase 08',
    title: 'Object-Oriented Programming (OOP)',
    icon: '🏗️',
    desc: 'Classes, constructors, methods, inheritance, super, and private fields.',
    lessons: [
      { num: 20, file: 'oop.html', title: '20. OOP: Classes & Prototypes', subtopics: 'ES6 Classes · Constructor · extends · super() · #private fields' }
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
      const currentTheme = localStorage.getItem('theme') || 'light';
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
  const title = "JavaScript అంటే ఏమిటి? | JavaScript Introduction in Telugu";
  const desc = "JavaScript అంటే ఏమిటి, ఎక్కడ వాడతారు, HTML CSS తో దానికి ఉన్న సంబంధం ఏమిటి అనేది తెలుగులో సులభంగా నేర్చుకోండి. మొదటి program తో సహా.";
  const filename = "01-javascript-fundamentals.html";
  const subtopics = "JS ante enti? · History & Uses · JS vs Java · Browser Role & V8 Engine · First Program · 3 Methods to Add JS to HTML (Inline/Internal/External) · console.log() · Strict Mode (\"use strict\")";

  const contentBody = `

    <div class="intro-box">
      <p>మీరు ఎప్పుడైనా ఒక వెబ్సైట్లో ఒక బటన్ నొక్కగానే ఏదో మారడం గమనించారా? Instagram లో ఒక photo ని double tap చేయగానే heart వచ్చేస్తుంది. Amazon లో cart లో ఒక item add చేయగానే పైన number పెరుగుతుంది. Google Maps లో మీరు drag చేస్తే map కదులుతుంది. ఇవన్నీ page ని refresh చేయకుండానే జరుగుతాయి కదా?</p>
      <p>ఈ మాయ వెనుక ఉన్నది <strong>JavaScript</strong>. ఈ chapter లో JavaScript అంటే ఏమిటో, అది ఎందుకు ఇంత ముఖ్యమో, మరియు మీ మొదటి JavaScript program ఎలా రాయాలో చాలా సులభంగా నేర్చుకుందాం. ఇంతకు ముందు ఎప్పుడూ programming చేయకపోయినా పర్వాలేదు, మనం మొదటి నుంచే మొదలుపెడదాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>JavaScript అంటే ఏమిటి, అది ఎందుకు వాడతారు</li>
        <li>JavaScript ఎలా పుట్టింది</li>
        <li>HTML, CSS, JavaScript మధ్య తేడా ఏమిటి</li>
        <li>JavaScript ని ఎక్కడెక్కడ ఉపయోగిస్తారు</li>
        <li>Java మరియు JavaScript ఒకటి కాదు అని ఎందుకు చెబుతారు</li>
        <li>మీ మొదటి JavaScript program రాసి run చేయడం</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>JavaScript అంటే ఏమిటి?</div>
    <div class="section-body">
      <p><strong>JavaScript</strong> ఒక <strong>programming language</strong>. Programming language అంటే కంప్యూటర్తో మాట్లాడటానికి మనం వాడే భాష. మనం తెలుగులో ఒక వ్యక్తికి "నీళ్లు తీసుకురా" అని చెబుతాం కదా, అలాగే కంప్యూటర్కి "ఈ పని చెయ్యి" అని చెప్పడానికి programming language వాడతాం.</p>
      <p>JavaScript ని ముఖ్యంగా <strong>వెబ్సైట్లను సజీవంగా (interactive) మార్చడానికి</strong> వాడతారు. ఒక వెబ్సైట్ లో కేవలం text, images ఉంటే అది ఒక పుస్తకంలో పేజీ లాగా ఉంటుంది, మనం చూడగలం కానీ దానితో ఏమీ చేయలేం. అదే వెబ్సైట్లో JavaScript ఉంటే:</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>బటన్ నొక్కితే ఏదైనా జరుగుతుంది</li>
        <li>Form లో తప్పు email రాస్తే వెంటనే "సరైన email ఇవ్వండి" అని చెబుతుంది</li>
        <li>Menu open అవుతుంది, close అవుతుంది</li>
        <li>Dark mode, light mode మార్చుకోవచ్చు</li>
        <li>Server నుంచి కొత్త data వచ్చి page లో కనిపిస్తుంది</li>
      </ul>
      <p>అంటే JavaScript అనేది వెబ్సైట్కి <strong>ప్రాణం పోస్తుంది</strong> అని చెప్పొచ్చు.</p>
    </div>

    <div class="section-title"><span class="num">3</span>JavaScript ఎలా పుట్టింది?</div>
    <div class="section-body">
      <p>ఇది చాలా ఆసక్తికరమైన కథ. 1995 లో <strong>Netscape</strong> అనే company, తమ browser లో వెబ్సైట్లు కొంచెం interactive గా ఉండేలా చేయడానికి ఒక చిన్న language కావాలనుకుంది. ఆ పని <strong>Brendan Eich</strong> అనే engineer కి అప్పగించారు. ఆయన ఈ language ని కేవలం <strong>10 రోజుల్లో</strong> మొదటి version గా తయారు చేశారని చెబుతారు.</p>
      <p>మొదట దీనికి వేరే పేర్లు ఉండేవి. తర్వాత "JavaScript" అనే పేరు పెట్టారు. ఈరోజు ఇది ప్రపంచంలో అత్యధికంగా వాడే programming languages లో ఒకటి. ఒక చిన్న ప్రయోగంగా మొదలైన language, ఇప్పుడు దాదాపు ప్రతి వెబ్సైట్లో ఉంది.</p>
    </div>

    <div class="section-title"><span class="num">4</span>HTML, CSS, JavaScript: ఒక ఇల్లు ఉదాహరణ</div>
    <div class="section-body">
      <p>వెబ్సైట్ తయారీలో మూడు ముఖ్యమైన భాగాలు ఉంటాయి. వీటిని ఒక <strong>ఇల్లు</strong> తో పోల్చి చూద్దాం.</p>
      <table class="tbl">
        <tr><th>భాగం</th><th>ఇంట్లో దేనికి సమానం</th><th>వెబ్సైట్లో ఏం చేస్తుంది</th></tr>
        <tr><td><strong>HTML</strong></td><td>గోడలు, తలుపులు, కిటికీలు (ఇంటి నిర్మాణం)</td><td>Page లో ఏమేం ఉండాలో చెబుతుంది: heading, paragraph, image, button</td></tr>
        <tr><td><strong>CSS</strong></td><td>రంగులు, పెయింటింగ్, ఫర్నిచర్ అమరిక (అందం)</td><td>Page ఎలా కనిపించాలో చెబుతుంది: colors, fonts, spacing</td></tr>
        <tr><td><strong>JavaScript</strong></td><td>కరెంట్, స్విచ్లు, ఫ్యాన్, లైట్ (పని చేసే విధానం)</td><td>Page ఎలా ప్రవర్తించాలో చెబుతుంది: click చేస్తే ఏం జరగాలి</td></tr>
      </table>
      <p>గోడలు కట్టి, రంగు వేసినా, కరెంట్ లేకపోతే ఇల్లు ఉపయోగపడదు కదా? స్విచ్ నొక్కితే లైట్ వెలగడం లాంటిదే JavaScript పని. అందుకే ఈ మూడూ కలిస్తేనే ఒక పూర్తి వెబ్సైట్ తయారవుతుంది.</p>
    </div>

    <div class="section-title"><span class="num">5</span>JavaScript ని ఎక్కడ వాడతారు?</div>
    <div class="section-body">
      <p>ఒకప్పుడు JavaScript కేవలం browser లోనే పని చేసేది. ఇప్పుడు పరిస్థితి మారింది. JavaScript తో మీరు చాలా రకాల పనులు చేయొచ్చు:</p>
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><strong>Websites మరియు Web Apps:</strong> Gmail, YouTube, Facebook లాంటి వెబ్సైట్ల interactive భాగాలు JavaScript తో నడుస్తాయి.</li>
        <li><strong>Server-side programming:</strong> <strong>Node.js</strong> అనే technology వల్ల, browser బయట కూడా, అంటే server మీద కూడా JavaScript run చేయొచ్చు. అంటే ఒకే language తో front-end మరియు back-end రెండూ రాయొచ్చు.</li>
        <li><strong>Mobile Apps:</strong> React Native లాంటి tools తో Android మరియు iPhone apps తయారు చేయొచ్చు.</li>
        <li><strong>Games:</strong> Browser లో ఆడుకునే చిన్న games JavaScript తో తయారవుతాయి.</li>
        <li><strong>Desktop Apps:</strong> VS Code editor కూడా JavaScript technologies తో తయారైనదే.</li>
      </ol>
      <p>అందుకే JavaScript నేర్చుకుంటే ఉద్యోగ అవకాశాలు చాలా ఎక్కువ. Web developer, Full-stack developer, App developer ఇలా చాలా రోల్స్కి ఇది అవసరం.</p>
    </div>

    <div class="section-title"><span class="num">6</span>Java మరియు JavaScript ఒకటి కాదు!</div>
    <div class="section-body">
      <p>ఇది చాలా మంది beginners చేసే పెద్ద పొరపాటు. పేరులో "Java" ఉంది కాబట్టి రెండూ ఒకటే అనుకుంటారు. కానీ రెండూ <strong>పూర్తిగా వేరు వేరు languages</strong>.</p>
      <p>దీన్ని ఇలా గుర్తుపెట్టుకోండి: <strong>Java కి JavaScript కి ఉన్న సంబంధం, కారు (Car) కి కార్పెట్ (Carpet) కి ఉన్న సంబంధం లాంటిది.</strong> రెండు పేర్లలో "Car" ఉంది, కానీ రెండూ ఒకటి కావు కదా!</p>
      <table class="tbl">
        <tr><th>Java</th><th>JavaScript</th></tr>
        <tr><td>ముఖ్యంగా Android apps, enterprise software కోసం</td><td>ముఖ్యంగా వెబ్సైట్లు, web apps కోసం</td></tr>
        <tr><td>Code ని ముందు compile చేయాలి</td><td>Browser నేరుగా code ని run చేస్తుంది</td></tr>
        <tr><td>రాయడానికి ఎక్కువ code అవసరం</td><td>తక్కువ code తో పని పూర్తవుతుంది</td></tr>
      </table>
      <p>ఆ కాలంలో Java చాలా ప్రాచుర్యంలో ఉండటంతో, marketing కోసం ఈ పేరు పెట్టారని చెబుతారు. అంతే, వేరే సంబంధం ఏమీ లేదు.</p>
    </div>

    <div class="section-title"><span class="num">7</span>మన మొదటి JavaScript Program</div>
    <div class="section-body">
      <p>ఇప్పుడు అసలు విషయానికి వద్దాం. ప్రతి programmer తన మొదటి program లో "Hello, World!" అని print చేస్తారు. ఇది ఒక సంప్రదాయం. మనం కూడా అదే చేద్దాం.</p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>console.log("Hello, World!");</code></pre>
      </div>
      <p style="margin-top:10px;"><strong>Output:</strong></p>
      <pre style="background: #1e1e1e; color: #fff; padding: 10px; border-radius: 8px; font-family: 'JetBrains Mono', monospace;">Hello, World!</pre>

      <h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 18px;">Code ని లైన్ బై లైన్ అర్థం చేసుకుందాం</h3>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>console.log()</code> అనేది ఒక <strong>command</strong>. ఇది మనం ఇచ్చిన దాన్ని screen మీద (console లో) చూపిస్తుంది.</li>
        <li>కుండలీకరణాల (<code>()</code>) లోపల మనం చూపించాలనుకున్న విషయాన్ని ఇస్తాం.</li>
        <li><code>"Hello, World!"</code> అనేది ఒక <strong>text (string)</strong>. Text ని ఎప్పుడూ quotation marks (<code>" "</code>) మధ్యలో రాయాలి.</li>
        <li>చివరిలో ఉన్న <code>;</code> (semicolon) ఒక statement ముగిసిందని సూచిస్తుంది.</li>
      </ul>
      <p>ఇదే మీ మొదటి JavaScript program. అభినందనలు, మీరు ఇప్పుడు ఒక JavaScript programmer అయ్యారు!</p>

      <h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 18px;">మీ పేరు print చేద్దాం</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>console.log("నా పేరు రవి");
console.log("నేను JavaScript నేర్చుకుంటున్నాను");</code></pre>
      </div>
      <p style="margin-top:10px;"><strong>Output:</strong></p>
      <pre style="background: #1e1e1e; color: #fff; padding: 10px; border-radius: 8px; font-family: 'JetBrains Mono', monospace;">నా పేరు రవి
నేను JavaScript నేర్చుకుంటున్నాను</pre>
      <p>ప్రతి <code>console.log()</code> ఒక కొత్త లైన్ లో output ఇస్తుంది. మీ పేరు రాసి మీరూ try చేయండి.</p>
    </div>

    <div class="section-title"><span class="num">8</span>మరో ఉదాహరణ: alert box</div>
    <div class="section-body">
      <p>Browser లో ఒక popup message చూపించడానికి <code>alert()</code> వాడతాం.</p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
        </div>
        <pre><code>alert("స్వాగతం! JavaScript నేర్చుకుందాం");</code></pre>
      </div>
      <p>ఇది browser లో run చేస్తే ఒక చిన్న popup box వచ్చి ఆ message చూపిస్తుంది.</p>
      
      <div class="callout" style="margin-top: 15px;">
        <div class="callout-title">గమనిక:</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14px;"><code>alert()</code> browser లో మాత్రమే పని చేస్తుంది. కొన్ని online compilers లో ఇది పని చేయదు. అందుకే మనం ఎక్కువగా <code>console.log()</code> నే వాడతాం.</p>
      </div>
    </div>

    <div class="section-title"><span class="num">9</span>HTML లో JavaScript: ఒక చిన్న ఉదాహరణ</div>
    <div class="section-body">
      <p>JavaScript అసలు శక్తి వెబ్సైట్లో కనిపిస్తుంది. ఈ చిన్న ఉదాహరణ చూడండి:</p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTML</span>
        </div>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;body&gt;

  &lt;h2 id="msg"&gt;నమస్కారం!&lt;/h2&gt;
  &lt;button onclick="changeText()"&gt;ఇక్కడ నొక్కండి&lt;/button&gt;

  &lt;script&gt;
    function changeText() {
      document.getElementById("msg").innerText = "JavaScript పని చేస్తోంది!";
    }
  &lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>
      <p style="margin-top:10px;"><strong>ఇది ఏం చేస్తుంది:</strong> పేజీలో "నమస్కారం!" అనే heading మరియు ఒక బటన్ కనిపిస్తాయి. బటన్ నొక్కగానే heading "JavaScript పని చేస్తోంది!" గా మారుతుంది, page refresh అవ్వకుండానే.</p>
      <p>ఇప్పుడు ఈ code పూర్తిగా అర్థం కాకపోయినా భయపడకండి. <code>function</code>, <code>document</code> లాంటివి ముందు chapters లో వివరంగా నేర్చుకుంటాం. ఇప్పుడు మీరు గుర్తుపెట్టుకోవాల్సింది ఒక్కటే: <strong>బటన్ నొక్కినప్పుడు page లో ఏదో మార్చగలగడమే JavaScript శక్తి.</strong></p>
    </div>

    <div class="section-title"><span class="num">10</span>Beginners చేసే సాధారణ తప్పులు</div>
    <div class="section-body">
      <p><strong>1. Java మరియు JavaScript ని ఒకటే అనుకోవడం.</strong><br>రెండూ వేరు వేరు. Java నేర్చుకున్నంత మాత్రాన JavaScript రాదు, JavaScript నేర్చుకున్నంత మాత్రాన Java రాదు.</p>
      
      <p style="margin-top: 10px;"><strong>2. Quotation marks మర్చిపోవడం.</strong></p>
      <p style="color:var(--text2); font-size:14px;">తప్పు:</p>
      <div class="code-block"><pre><code>console.log(Hello);</code></pre></div>
      <p style="color:var(--text2); font-size:14px;">ఇది error ఇస్తుంది (<code>Hello is not defined</code>), ఎందుకంటే text ని quotes లో రాయలేదు.</p>
      
      <p style="color:var(--text2); font-size:14px; margin-top:8px;">సరైనది:</p>
      <div class="code-block"><pre><code>console.log("Hello");</code></pre></div>
      
      <p style="margin-top: 15px;"><strong>3. అక్షరాల పొరపాట్లు (Case sensitivity).</strong><br>JavaScript లో పెద్ద అక్షరం, చిన్న అక్షరం తేడా ఉంటుంది. <code>console.log</code> సరైనది, కానీ <code>Console.Log</code> లేదా <code>console.Log</code> రాస్తే error వస్తుంది.</p>
      
      <p style="margin-top: 10px;"><strong>4. కుండలీకరణాలు (brackets) మూసివేయకపోవడం.</strong><br><code>console.log("Hi"</code> అని రాసి <code>)</code> మర్చిపోతే error వస్తుంది. ప్రతి <code>(</code> కి ఒక <code>)</code> ఉండాలి.</p>
    </div>

    <div class="section-title"><span class="num">11</span>ప్రాక్టీస్ ప్రశ్నలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>మీ పేరు print చేసే ఒక program రాయండి.</li>
        <li>మూడు వేర్వేరు లైన్లలో మీ పేరు, మీ ఊరు, మీకు ఇష్టమైన ఆట print చేయండి.</li>
        <li>HTML, CSS, JavaScript లలో ప్రతిదాని పని ఒక్క వాక్యంలో రాయండి.</li>
        <li>ఈ code లో తప్పు ఏమిటో కనుక్కోండి: <code>console.log("Welcome)</code></li>
        <li><code>Console.log("Hi");</code> run చేస్తే ఏం జరుగుతుంది? ఎందుకు?</li>
      </ol>
      
      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 10px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2);">
          <p><strong>1.</strong><br><code>console.log("రవి కుమార్");</code></p>
          <p style="margin-top: 8px;"><strong>2.</strong><br><code>console.log("నా పేరు సీత");</code><br><code>console.log("నా ఊరు హైదరాబాద్");</code><br><code>console.log("నాకు ఇష్టమైన ఆట క్రికెట్");</code></p>
          <p style="margin-top: 8px;"><strong>3.</strong> HTML page నిర్మాణాన్ని (structure) ఇస్తుంది, CSS దానికి అందాన్ని (design) ఇస్తుంది, JavaScript దానికి పని చేసే గుణాన్ని (behaviour) ఇస్తుంది.</p>
          <p style="margin-top: 8px;"><strong>4.</strong> Closing quotation mark (<code>"</code>) లేదు. సరైనది: <code>console.log("Welcome");</code></p>
          <p style="margin-top: 8px;"><strong>5.</strong> Error వస్తుంది (<code>Console is not defined</code>). JavaScript case-sensitive, కాబట్టి <code>console</code> చిన్న అక్షరాలతో రాయాలి.</p>
        </div>
      </details>
    </div>

    <div class="try-box">
      <div class="try-title">🚀 మీరే try చేయండి</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">పైన నేర్చుకున్న <code>console.log("Hello, World!");</code> ని మన compiler లో ఇప్పుడే run చేసి చూడండి. మీ పేరు మార్చి రాసి, output ఎలా మారుతుందో గమనించండి.</p>
      <a class="run-btn" href="/?lang=nodejs">👉 Our Compiler లో JavaScript try చేయండి</a>
    </div>

    <div class="section-title"><span class="num">12</span>సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><strong>JavaScript</strong> ఒక programming language, వెబ్సైట్లను interactive గా చేయడానికి వాడతారు.</li>
        <li><strong>HTML</strong> నిర్మాణం, <strong>CSS</strong> అందం, <strong>JavaScript</strong> పని చేసే విధానం.</li>
        <li>JavaScript ని websites, servers (Node.js), mobile apps, games లో వాడతారు.</li>
        <li><strong>Java మరియు JavaScript వేరు వేరు languages.</strong></li>
        <li><code>console.log()</code> తో మనం screen మీద output చూపిస్తాం.</li>
        <li>JavaScript <strong>case-sensitive</strong>, text ఎప్పుడూ quotes లో రాయాలి.</li>
      </ul>
    </div>

  `;

  const html = wrapJSLessonPage(title, desc, filename, 1, subtopics, contentBody, null, null, '02-javascript-syntax-and-errors.html', '2. Syntax & Error Handling');
  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 2: Syntax, Statements & Error Handling (Phase 1 Part 2) ───
function buildLesson2() {
  const title = "JavaScript Syntax & Errors | కోడ్ ఎలా రాయాలి (Telugu)";
  const desc = "JavaScript లో కామెంట్స్, స్టేట్మెంట్స్, సెమికోలన్ వాడకం, ASI, Case Sensitivity, మరియు Errors (Syntax, Runtime, Logical) గురించి తెలుగులో తెలుసుకోండి.";
  const filename = "02-javascript-syntax-and-errors.html";
  const subtopics = "Comments (Single & Multi-line) · Statements · Semicolons & ASI · Case Sensitivity · Syntax Errors · Runtime Errors · Logical Errors";

  const contentBody = `

    <div class="intro-box">
      <p>పోయిన chapter లో మనం మన మొదటి program రాసాం కదా? ఈ chapter లో JavaScript రాసేటప్పుడు పాటించాల్సిన కొన్ని ముఖ్యమైన నియమాలు (Grammar rules) నేర్చుకుందాం. ఇంగ్లీష్ కి grammar ఎలానో, programming కి <strong>Syntax</strong> అలా అన్నమాట.</p>
      <p>అలాగే మనం తప్పులు చేసినప్పుడు కంప్యూటర్ ఎలా అరుస్తుందో (Errors) కూడా చూద్దాం. భయపడకండి, తప్పులు చేయడం వల్లే బాగా నేర్చుకుంటారు!</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>Comments అంటే ఏమిటి, ఎందుకు వాడతారు</li>
        <li>Statements మరియు Semicolon <code>;</code> ప్రాముఖ్యత</li>
        <li>Automatic Semicolon Insertion (ASI) అంటే ఏంటి</li>
        <li>Case Sensitivity అంటే ఏమిటి</li>
        <li>Errors లోని మూడు రకాలు (Syntax, Runtime, Logical)</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>Comments (కామెంట్స్) అంటే ఏమిటి?</div>
    <div class="section-body">
      <p>మనం రాసిన code ఏమి చేస్తుందో రేపు మనకు కానీ, వేరేవాళ్లకు కానీ అర్థం కావడానికి రాసుకునే నోట్స్ నే <strong>Comments</strong> అంటారు.</p>
      <p>కంప్యూటర్ ఈ కామెంట్స్ ని పూర్తిగా వదిలేస్తుంది, వాటిని run చేయదు. కేవలం మనుషులు చదువుకోవడానికే ఇవి ఉంటాయి.</p>
      
      <p style="margin-top:10px;">JavaScript లో 2 రకాల కామెంట్స్ ఉన్నాయి:</p>
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><strong>Single-line comment:</strong> ఇది <code>//</code> తో మొదలవుతుంది.</li>
        <li><strong>Multi-line comment:</strong> ఇది <code>/*</code> తో మొదలై <code>*/</code> తో ముగుస్తుంది.</li>
      </ol>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>// ఇది Single-line comment. కింది లైన్ లో పేరు print చేస్తున్నాను
console.log("రాము"); 

/* 
ఇది Multi-line comment.
ఇందులో మీరు ఎన్ని లైన్స్ అయినా రాయొచ్చు.
కంప్యూటర్ దీన్ని అస్సలు పట్టించుకోదు.
*/
console.log("హైదరాబాద్");</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span>Statements మరియు Semicolons (<code>;</code>)</div>
    <div class="section-body">
      <p>కంప్యూటర్ కి మనం ఇచ్చే ఒక పూర్తి ఆదేశాన్ని (Instruction) <strong>Statement</strong> అంటారు. ఇంగ్లీష్ లో ఒక వాక్యం పూర్తవ్వగానే <strong>Full stop (.)</strong> ఎలా పెడతామో, JavaScript లో ఒక statement పూర్తవ్వగానే <strong>Semicolon (<code>;</code>)</strong> పెడతాం.</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
        </div>
        <pre><code>console.log("Hello"); // ఇది ఒక statement
console.log("World"); // ఇది ఇంకొక statement</code></pre>
      </div>
      
      <p style="margin-top:10px;">అదే ఒకవేళ మీరు రెండు statements ని ఒకే లైన్ లో రాయాలంటే, కచ్చితంగా మధ్యలో <code>;</code> పెట్టాలి. లేకపోతే error వస్తుంది.</p>
      <div class="code-block">
        <pre><code>console.log("Hello"); console.log("World"); // సరైనది</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span>Automatic Semicolon Insertion (ASI)</div>
    <div class="section-body">
      <p>కొన్నిసార్లు మనం కంగారులో చివరన సెమికోలన్ <code>;</code> పెట్టడం మర్చిపోతాం. అయినా మన program పని చేస్తుంది! ఎందుకంటే జావాస్క్రిప్ట్ ఇంజిన్ చాలా మంచిది. మీరు సెమికోలన్ పెట్టకపోతే, అది అర్థం చేసుకుని తనంతట తానే ఒక సెమికోలన్ ని ఊహించుకుంటుంది. దీనినే <strong>Automatic Semicolon Insertion (ASI)</strong> అంటారు.</p>
      <p>కానీ, <strong>ఎప్పుడూ ASI మీద ఆధారపడకండి</strong>. అది కొన్నిసార్లు తప్పుగా ఊహించుకుని ఊహించని errors కి దారి తీస్తుంది. కాబట్టి ప్రతీ statement చివర <code>;</code> పెట్టడం ఒక మంచి అలవాటుగా చేసుకోండి.</p>
    </div>

    <div class="section-title"><span class="num">5</span>Case Sensitivity (చిన్న అక్షరాలు - పెద్ద అక్షరాలు)</div>
    <div class="section-body">
      <p>JavaScript కి <strong>Case Sensitivity</strong> ఉంటుంది. అంటే దానికి <code>A</code> వేరు, <code>a</code> వేరు. రెండు ఒకటే కాదు.</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
        </div>
        <pre><code>let Name = "Ravi";
let name = "Teja";
let NAME = "Kiran";</code></pre>
      </div>
      <p style="margin-top:10px;">పైన రాసిన మూడు వేర్వేరు variables! కాబట్టి మీరు <code>console.log</code> ని <code>Console.log</code> అని రాస్తే పని చేయదు.</p>
    </div>

    <div class="section-title"><span class="num">6</span>Errors (తప్పులు) లో 3 రకాలు</div>
    <div class="section-body">
      <p>Program రాసేటప్పుడు errors రావడం చాలా సహజం. పెద్ద పెద్ద programmers కి కూడా రోజుకి వందల errors వస్తాయి. Errors లో ముఖ్యంగా 3 రకాలు ఉంటాయి.</p>
      
      <table class="tbl">
        <tr><th>Error రకం</th><th>వివరణ</th><th>రియల్ లైఫ్ ఉదాహరణ</th></tr>
        <tr>
          <td><strong>1. Syntax Error</strong></td>
          <td>JavaScript grammar రూల్స్ పాటించకపోతే వస్తుంది. Program అసలు run అవ్వదు.</td>
          <td>తెలుగులో "నేను అన్నం తిన్నాను" కి బదులు "అన్నం నేను తిన్నాను" అని రాయడం.</td>
        </tr>
        <tr>
          <td><strong>2. Runtime Error</strong></td>
          <td>Syntax కరెక్టే కానీ, run అవుతున్నప్పుడు లేని దాన్ని అడిగితే వస్తుంది.</td>
          <td>హోటల్ కి వెళ్లి మెనూలో లేని వంటకం తీసుకురమ్మని అడగటం.</td>
        </tr>
        <tr>
          <td><strong>3. Logical Error</strong></td>
          <td>ఎలాంటి error మెసేజ్ రాదు. కానీ మీకు కావాల్సిన output రాదు. ఇది పట్టుకోవడం చాలా కష్టం.</td>
          <td>టీ పెట్టబోయి అందులో పంచదారకి బదులు ఉప్పు వేయడం! అంతా బాగానే జరిగింది కానీ తాగితే తెలుస్తుంది తప్పు జరిగిందని.</td>
        </tr>
      </table>

      <h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 18px;">ఉదాహరణలు చూద్దాం:</h3>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Errors</span>
        </div>
        <pre><code>// 1. Syntax Error: బ్రాకెట్ మూసివేయలేదు
console.log("Hello" ; 

// 2. Runtime Error: console.log స్పెల్లింగ్ తప్పు రాసాం
consol.log("Hello"); 

// 3. Logical Error: కూడిక చేయబోయి తీసివేత చేశాం
console.log("5 + 5 = " + (5 - 5)); // Output: 5 + 5 = 0 అని వస్తుంది!</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">7</span>Beginners చేసే సాధారణ తప్పులు</div>
    <div class="section-body">
      <p><strong>1. కామెంట్స్ లోనే కోడ్ రాయడం.</strong><br>పొరపాటున <code>//</code> తర్వాత రాస్తే అది పని చేయదు.</p>
      <div class="code-block"><pre><code>// console.log("ఇది ప్రింట్ అవ్వదు");</code></pre></div>
      
      <p style="margin-top: 10px;"><strong>2. Error మెసేజ్ చదివి భయపడటం.</strong><br>Error మెసేజ్ ని ఎప్పుడూ చదవాలి. అది ఏ లైన్ లో ఉందో, ఎందుకు వచ్చిందో క్లియర్ గా చెబుతుంది. దాన్ని చూసి పారిపోకూడదు!</p>
    </div>

    <div class="section-title"><span class="num">8</span>ప్రాక్టీస్ ప్రశ్నలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>ఈ కోడ్ లో తప్పు ఏమిటో కనుక్కోండి: <code>Console.log("Hello");</code></li>
        <li>Automatic Semicolon Insertion (ASI) అంటే ఏమిటి?</li>
        <li>మీకు బాగా ఇష్టమైన సినిమా పేరును print చేయండి, ఆ లైన్ పైన అదెందుకు ఇష్టమో ఒక కామెంట్ రాయండి.</li>
        <li>Syntax error కి Logical error కి ఉన్న ముఖ్యమైన తేడా ఏమిటి?</li>
      </ol>
      
      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 10px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2);">
          <p><strong>1.</strong> <code>console</code> కి బదులు పెద్ద అక్షరం <code>C</code> తో మొదలైంది. ఇది Case Sensitivity వల్ల error ఇస్తుంది.</p>
          <p style="margin-top: 8px;"><strong>2.</strong> మనం సెమికోలన్ <code>;</code> మర్చిపోతే, బ్రౌజర్ దానంతట అదే దాన్ని పెట్టుకునే ఫీచర్ ని ASI అంటారు.</p>
          <p style="margin-top: 8px;"><strong>3.</strong><br><code>// ఈ సినిమాలో కామెడీ బాగుంటుంది</code><br><code>console.log("జల్సా");</code></p>
          <p style="margin-top: 8px;"><strong>4.</strong> Syntax error వస్తే program అసలు run అవ్వదు. Logical error వస్తే program run అవుతుంది కానీ మనకు కావాల్సిన కరెక్ట్ ఆన్సర్ రాదు.</p>
        </div>
      </details>
    </div>

    <div class="section-title"><span class="num">9</span>సారాంశం (Quick Summary)</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>కోడ్ ని అర్థం చేసుకోవడానికి <strong>Comments</strong> వాడతాం (<code>//</code> లేదా <code>/* */</code>).</li>
        <li>ఒక ఇన్స్ట్రక్షన్ ని <strong>Statement</strong> అంటారు, ఇది సెమికోలన్ <code>;</code> తో ముగుస్తుంది.</li>
        <li>మనం మర్చిపోతే జావాస్క్రిప్ట్ ఇంజిన్ దానంతట అదే పెట్టుకునేదే <strong>ASI</strong>.</li>
        <li>JavaScript కి పెద్ద అక్షరాలు చిన్న అక్షరాలు (Case Sensitivity) అంటే పట్టింపు ఎక్కువ.</li>
        <li><strong>Errors లో 3 రకాలు:</strong> Syntax, Runtime, Logical.</li>
      </ul>
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
      const currentTheme = localStorage.getItem('theme') || 'light';
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
