const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const javaDir = path.join(baseDir, 'blog-java');

if (!fs.existsSync(javaDir)) {
  fs.mkdirSync(javaDir, { recursive: true });
}

// 1. Specialized Java & Accordion CSS
const javaAccordionCss = `/* Specialized styling enhancements for Java tutorial lessons & Accordion */
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
  background: rgba(240, 165, 0, 0.08) !important;
  border: 1px solid rgba(240, 165, 0, 0.25) !important;
  border-radius: 9px !important;
  color: #f0a500 !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-home-link:hover {
  background: rgba(240, 165, 0, 0.16) !important;
  border-color: #f0a500 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(240, 165, 0, 0.2);
}

.sidebar-home-link.active {
  background: linear-gradient(135deg, rgba(240, 165, 0, 0.18), rgba(20, 24, 32, 0.8)) !important;
  border-color: #f0a500 !important;
  color: #f0a500 !important;
  box-shadow: 0 0 12px rgba(240, 165, 0, 0.25);
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
  background: linear-gradient(135deg, rgba(240, 165, 0, 0.12) 0%, rgba(20, 25, 34, 0.9) 100%);
  border-color: #f0a500;
  box-shadow: 0 0 14px rgba(240, 165, 0, 0.18);
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
  background: rgba(240, 165, 0, 0.2);
  border-color: rgba(240, 165, 0, 0.4);
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
  color: #f0a500;
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
  background: rgba(240, 165, 0, 0.2);
  color: #f0a500;
  border-color: rgba(240, 165, 0, 0.35);
  font-weight: 700;
}

.accordion-chevron {
  color: var(--text3, #8b949e);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;
  flex-shrink: 0;
}

.accordion-header.active .accordion-chevron {
  transform: rotate(90deg);
  color: #f0a500;
}

.accordion-content {
  display: none;
  flex-direction: column;
  padding: 4px 0 6px 10px;
  border-left: 2px solid rgba(240, 165, 0, 0.35);
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
  color: #ffffff !important;
  background: #f0a500 !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(240, 165, 0, 0.35);
}

/* =========================================================================
   CURRICULUM ROADMAP CARDS & LESSON ROWS
   ========================================================================= */
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
  border-color: rgba(240, 165, 0, 0.4);
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
  background: rgba(240, 165, 0, 0.12);
  border: 1px solid rgba(240, 165, 0, 0.3);
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
  color: #f0a500;
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
  background: rgba(240, 165, 0, 0.08);
  border-color: rgba(240, 165, 0, 0.35);
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
  background: rgba(240, 165, 0, 0.15);
  color: #f0a500;
  font-size: 12px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.curriculum-lesson-row:hover .lesson-idx {
  background: #f0a500;
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
  color: #f0a500;
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
  color: #f0a500;
  padding: 5px 12px;
  border-radius: 6px;
  background: rgba(240, 165, 0, 0.1);
  border: 1px solid rgba(240, 165, 0, 0.2);
  transition: all 0.18s ease;
}

.curriculum-lesson-row:hover .lesson-btn {
  background: #f0a500;
  color: #121212;
}

.curriculum-lesson-row:hover .lesson-btn .arrow {
  transform: translateX(3px);
}

.lesson-btn .arrow {
  transition: transform 0.18s ease;
}

/* Light Theme overrides */
body.light-theme .phase-roadmap-card {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

body.light-theme .phase-roadmap-card:hover {
  border-color: #f0a500;
  box-shadow: 0 6px 18px rgba(240, 165, 0, 0.12);
}

body.light-theme .phase-roadmap-header {
  border-bottom-color: #f1f5f9;
}

body.light-theme .phase-roadmap-icon {
  background: #fef3c7;
  border-color: #fde68a;
}

body.light-theme .phase-roadmap-tag {
  color: #d97706;
}

body.light-theme .phase-roadmap-title {
  color: #0f172a;
}

body.light-theme .phase-roadmap-badge {
  background: #f1f5f9;
  border-color: #e2e8f0;
  color: #475569;
}

body.light-theme .phase-roadmap-desc {
  color: #64748b;
}

body.light-theme .curriculum-lesson-row {
  background: #f8fafc;
  border-color: #e2e8f0;
}

body.light-theme .curriculum-lesson-row:hover {
  background: #fffbeb;
  border-color: #fcd34d;
}

body.light-theme .lesson-idx {
  background: #fef3c7;
  color: #d97706;
}

body.light-theme .lesson-title {
  color: #0f172a;
}

body.light-theme .lesson-subtopics {
  color: #64748b;
}

body.light-theme .lesson-btn {
  background: #fef3c7;
  border-color: #fde68a;
  color: #d97706;
}

body.light-theme .curriculum-lesson-row:hover .lesson-btn {
  background: #d97706;
  color: #ffffff;
}

body.light-theme .sidebar-home-link {
  background: #fffbeb !important;
  border-color: #fde68a !important;
  color: #d97706 !important;
}

body.light-theme .sidebar-home-link.active {
  background: #fef3c7 !important;
  border-color: #f0a500 !important;
  color: #b45309 !important;
}

.try-box {
  background: linear-gradient(135deg, rgba(240, 165, 0, 0.08) 0%, rgba(20, 24, 32, 0.6) 100%);
  border: 1px solid rgba(240, 165, 0, 0.25);
  border-radius: var(--radius, 12px);
  padding: 24px;
  margin: 32px 0;
}

.try-box .try-title {
  font-weight: 700;
  color: #f0a500;
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
  background: linear-gradient(135deg, #f0a500, #d97706);
  color: #121212 !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 14px rgba(240, 165, 0, 0.3);
}

.try-box .run-btn:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

.callout {
  background: #161b22;
  border: 1px solid #30363d;
  border-left: 4px solid #f0a500;
  padding: 18px 22px;
  border-radius: var(--radius, 12px);
  margin: 28px 0;
}

.callout .callout-title {
  font-weight: 700;
  color: #f0a500;
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
  color: #f0a500;
  line-height: 1.55;
  white-space: pre !important;
  overflow-x: auto;
}

.faq-card {
  background: #141820;
  border: 1px solid #30363d;
  border-left: 4px solid #f0a500;
  border-radius: 10px;
  padding: 18px 22px;
  margin-bottom: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, border-color 0.2s;
}

.faq-card:hover {
  transform: translateX(3px);
  border-color: #f0a500;
}

.faq-card h4 {
  color: #f0a500 !important;
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
  background: linear-gradient(135deg, #f0a500, #d97706);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #121212;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(240, 165, 0, 0.3);
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
  background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%);
  border-color: #f0a500;
  box-shadow: 0 2px 10px rgba(240, 165, 0, 0.15);
}
body.light-theme .phase-icon-box {
  background: #f1f5f9;
  border-color: #e2e8f0;
}
body.light-theme .accordion-header.active .phase-icon-box {
  background: #fef3c7;
  border-color: #fde68a;
}
body.light-theme .phase-tag {
  color: #64748b;
}
body.light-theme .accordion-header.active .phase-tag {
  color: #d97706;
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
  background: #fef3c7;
  color: #d97706;
  border-color: #fcd34d;
}
body.light-theme .accordion-chevron {
  color: #94a3b8;
}
body.light-theme .accordion-header.active .accordion-chevron {
  color: #d97706;
}
body.light-theme .accordion-content a {
  color: #475569;
}
body.light-theme .accordion-content a:hover {
  color: #0f172a;
  background: #f1f5f9;
}
body.light-theme .accordion-content a.active {
  background: #f0a500 !important;
  color: #121212 !important;
}
body.light-theme .try-box {
  background: #fffbeb;
  border-color: #fde68a;
}
body.light-theme .callout {
  background: #f8fafc;
  border-color: #cbd5e1;
  border-left-color: #d97706;
}
body.light-theme .callout .callout-title {
  color: #b45309;
}
body.light-theme .diagram-box {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}
body.light-theme .faq-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #d97706;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
body.light-theme .faq-card h4 {
  color: #b45309 !important;
}
body.light-theme .faq-card p {
  color: #334155;
}
`;

fs.writeFileSync(path.join(javaDir, 'style.css'), javaAccordionCss, 'utf8');

// 2. DEFINE JAVA CURRICULUM PHASES (27 Lessons)
const JAVA_PHASES = [
  {
    id: 'phase1',
    tag: 'Phase 01',
    title: 'Java Basics & Setup',
    icon: '☕',
    desc: 'Foundations of Java, JVM/JRE/JDK architecture, installation, first program breakdown, source structure, and error types.',
    lessons: [
      { num: 1, file: '01-welcome-hello-world.html', title: '1. Welcome & Java Basics', subtopics: 'Java ante enti? · Features · Applications · JDK/JRE/JVM Architecture · Compilation Model · Setup · Hello World · Line Breakdown' },
      { num: 2, file: '02-java-setup-and-program-structure.html', title: '2. Program Structure & Errors', subtopics: 'Source File Anatomy · Class Rules · Comments (Single, Multi, Javadoc) · Naming Conventions · Syntax vs Runtime vs Logical Errors' }
    ]
  },
  {
    id: 'phase2',
    tag: 'Phase 02',
    title: 'Data Types, Operators & Input',
    icon: '⚡',
    desc: 'Java primitive types, memory allocation, widening/narrowing casting, operators, and interactive Scanner input.',
    lessons: [
      { num: 3, file: '03-variables-and-data-types.html', title: '3. Variables & Data Types', subtopics: '8 Primitive Types · Stack vs Heap · Type Casting (Widening/Narrowing) · Overflow & Precision Gotchas' },
      { num: 4, file: '04-operators-and-input.html', title: '4. Operators & User Input', subtopics: 'Arithmetic · Relational · Logical & Short-Circuit · Scanner Console Input · Scanner Buffer Gotchas' }
    ]
  },
  {
    id: 'phase3',
    tag: 'Phase 03',
    title: 'Control Flow & Loops',
    icon: '🔀',
    desc: 'Decision making branching, classic switch vs modern Java 14+ switch expressions, loops, and loop control.',
    lessons: [
      { num: 5, file: '05-conditions.html', title: '5. Conditional Statements', subtopics: 'if, else if, else · Ternary Operator · Classic Switch · Modern Java 14+ Arrow Switch Expressions' },
      { num: 6, file: '06-loops.html', title: '6. Loops & Control Flow', subtopics: 'for Loops · while & do-while Loops · Nested Loops · break, continue & Labeled Jumps' }
    ]
  },
  {
    id: 'phase4',
    tag: 'Phase 04',
    title: 'Strings & Array Structures',
    icon: '📦',
    desc: 'Strings immutability, String Constant Pool, comparison, StringBuilder, 1D arrays, and 2D matrices.',
    lessons: [
      { num: 7, file: '07-strings.html', title: '7. Strings & String Pool', subtopics: 'String Immutability · JVM String Pool · .equals() vs == · Common Methods · StringBuilder & StringBuffer' },
      { num: 8, file: '08-arrays.html', title: '8. Arrays (1D & Matrices)', subtopics: 'Array Declaration · Heap Memory · Index Bounds · Arrays Utility Class · Safe Copies · 2D Matrices' }
    ]
  },
  {
    id: 'phase5',
    tag: 'Phase 05',
    title: 'Methods & Core OOP',
    icon: '🏗️',
    desc: 'Master methods, class blueprints, constructors, encapsulation, inheritance, polymorphism, and abstraction.',
    lessons: [
      { num: 9, file: '09-methods.html', title: '9. Methods & Parameters', subtopics: 'Method Signature · Pass-by-Value Semantics · Method Overloading · Static vs Instance Methods · Recursion' },
      { num: 10, file: '10-classes-and-objects.html', title: '10. Classes & Objects (OOP Core)', subtopics: 'Object-Oriented Philosophy · Class Blueprint · Heap Instantiation with new · fields & methods · this Keyword' },
      { num: 11, file: '11-constructors-and-encapsulation.html', title: '11. Constructors & Encapsulation', subtopics: 'Default vs Parameterized Constructors · Constructor Chaining with this() · Access Modifiers · Getters/Setters' },
      { num: 12, file: '12-inheritance-and-polymorphism.html', title: '12. Inheritance & Polymorphism', subtopics: 'extends Keyword · Method Overriding (@Override) · super Keyword · Dynamic Method Dispatch · Upcasting' },
      { num: 13, file: '13-abstraction-and-interfaces.html', title: '13. Abstraction & Interfaces', subtopics: 'abstract Classes vs interfaces · implements Keyword · Multiple Inheritance · default & static Interface Methods' }
    ]
  },
  {
    id: 'phase6',
    tag: 'Phase 06',
    title: 'Exceptions, Files & Core APIs',
    icon: '🛡️',
    desc: 'Robust exception handling, try-catch-finally, file reading/writing, and modern java.time API.',
    lessons: [
      { num: 14, file: '14-exception-handling.html', title: '14. Exception Handling', subtopics: 'Checked vs Unchecked Exceptions · try-catch-finally · throw vs throws · Custom User-Defined Exceptions' },
      { num: 15, file: '15-file-handling.html', title: '15. File Handling & I/O', subtopics: 'FileReader & BufferedReader · FileWriter · try-with-resources · Modern java.nio.file.Files & Paths' },
      { num: 20, file: '20-date-and-time.html', title: '16. Date & Time (java.time)', subtopics: 'LocalDate, LocalTime, LocalDateTime · Period & Duration · ZonedDateTime · DateTimeFormatter' }
    ]
  },
  {
    id: 'phase7',
    tag: 'Phase 07',
    title: 'Collections, Generics & Streams',
    icon: '🧩',
    desc: 'Dynamic collections (List, Set, Map), generics type safety, lambda expressions, and declarative Stream data pipelines.',
    lessons: [
      { num: 16, file: '16-collections.html', title: '17. Collections Framework', subtopics: 'Collection Hierarchy · List (ArrayList, LinkedList) · Set (HashSet, TreeSet) · Map (HashMap, TreeMap) · Iterators' },
      { num: 17, file: '17-generics.html', title: '18. Generics & Type Safety', subtopics: 'Generic Classes & Methods · Bounded Type Parameters (<T extends Number>) · Wildcards (?) · Type Erasure' },
      { num: 18, file: '18-lambda-expressions.html', title: '19. Lambda & Functional Interfaces', subtopics: '@FunctionalInterface · Lambda Syntax · Predicate, Function, Consumer, Supplier · Method References (::)' },
      { num: 19, file: '19-stream-api.html', title: '20. Stream API & Pipelines', subtopics: 'filter, map, flatMap, reduce, collect · IntStream · groupingBy · Lazy Evaluation · Parallel Streams' }
    ]
  },
  {
    id: 'phase8',
    tag: 'Phase 08',
    title: 'Enterprise Java, Projects & Interview',
    icon: '🚀',
    desc: 'Multithreading, networking, JDBC databases, Maven, Spring Boot, full-stack projects, and top technical interview Q&A.',
    lessons: [
      { num: 21, file: '21-multithreading.html', title: '21. Multithreading & Concurrency', subtopics: 'Thread Class & Runnable · Thread Lifecycle · synchronized Keyword · volatile · ExecutorService Thread Pools' },
      { num: 22, file: '22-networking-and-apis.html', title: '22. Networking & REST APIs', subtopics: 'Modern HttpClient · HttpRequest & HttpResponse · JSON Data Parsing · Client-Server Sockets' },
      { num: 23, file: '23-jdbc-and-databases.html', title: '23. JDBC Database Connectivity', subtopics: 'DriverManager · Connection · Statement & PreparedStatement · SQL Injection Prevention · ResultSet' },
      { num: 24, file: '24-maven-and-testing.html', title: '24. Maven & JUnit 5 Testing', subtopics: 'pom.xml Structure · Dependency Management · Unit Testing with JUnit 5 · Assertions & Test Fixtures' },
      { num: 25, file: '25-spring-boot-basics.html', title: '25. Spring Boot Basics', subtopics: 'Spring Boot Architecture · @SpringBootApplication · REST Controllers (@RestController, @GetMapping) · Dependency Injection' },
      { num: 26, file: '26-java-projects.html', title: '26. Real-World Java Projects', subtopics: 'Student Management CLI System · Banking OOP Simulation · RESTful CRUD API Capstone' },
      { num: 27, file: '27-interview-preparation.html', title: '27. Java Interview Preparation', subtopics: 'Top 50 Core Java Questions · Memory Model (Heap vs Stack) · Garbage Collection Mechanics · Coding Problems' }
    ]
  }
];

// Flatten all lessons
const ALL_JAVA_LESSONS = [];
JAVA_PHASES.forEach(p => {
  p.lessons.forEach(l => {
    l.phaseId = p.id;
    l.phaseTag = p.tag;
    l.phaseTitle = p.title;
    ALL_JAVA_LESSONS.push(l);
  });
});

console.log(`Total Java Lessons configured: ${ALL_JAVA_LESSONS.length}`);

// Function to generate the accordion sidebar HTML
function generateJavaAccordionSidebar(currentFile = null) {
  let html = `    <div class="sidebar-accordion">\n`;

  JAVA_PHASES.forEach(phase => {
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
      html += `        <a href="/blog-java/${l.file}"${isActive}>${l.title}</a>\n`;
    });

    html += `      </div>\n\n`;
  });

  html += `    </div>\n`;
  return html;
}

// 3. GENERATE public/blog-java.html (Master Java Course Index)
function buildBlogJavaHome() {
  const accordionSidebar = generateJavaAccordionSidebar(null);

  let roadmapCardsHtml = '';
  JAVA_PHASES.forEach(phase => {
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
        <span class="phase-roadmap-badge">${phase.lessons.length} In-Depth Lessons</span>
      </div>
      <p class="phase-roadmap-desc">${phase.desc}</p>
      <div class="phase-lessons-list">
`;

    phase.lessons.forEach(l => {
      const padIdx = String(l.num).padStart(2, '0');
      roadmapCardsHtml += `        <a href="/blog-java/${l.file}" class="curriculum-lesson-row">
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
  <title>Java Programming Master Tutorial & Complete Roadmap (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master Java from complete beginner to advanced enterprise level with our 27 in-depth combined lessons, collapsible roadmap across 8 phases, live code execution, Spring Boot, and interview prep." />
  <meta name="keywords" content="java tutorial, java course, learn java online, java basics, java oop, java collections, java streams, multithreading, spring boot, jdbc, maven, java interview questions" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-java.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-java/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org Course Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Java Complete Programming Masterclass (2026 Edition)",
    "description": "Comprehensive 27-lesson Java course covering JVM architecture, OOP, Collections, Generics, Lambdas, Stream API, Multithreading, Networking, JDBC, Spring Boot, and technical interview preparation with live runnable code examples.",
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
<body class="lang-java">

<!-- TOP NAVIGATION -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html" class="active">Java</a>
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
  <!-- LEFT SIDEBAR WITH COLLAPSIBLE ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">Java Master Course</div>
    <a href="/blog-java.html" class="sidebar-home-link active">☕ Java Course HOME</a>

${accordionSidebar}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-java-compiler.html" style="color:#f0a500; font-weight:700;">▶ Try Java Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-python.html">Python Course (65 Lessons)</a>
    <a href="/blog-c.html">C Language (20 Lessons)</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">Java Masterclass</span>
    </div>

    <h1 class="page-title">Java Programming Master Tutorial</h1>

    <div class="page-meta">
      <span class="badge">☕ Java 21+ LTS</span>
      <span class="badge">🟢 27 In-Depth Combined Chapters</span>
      <span class="badge">📂 Collapsible Interactive Roadmap (8 Phases)</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's Java Master Course</strong>. Java is an exceptionally robust, class-based, object-oriented programming language designed around the philosophy of <em>"Write Once, Run Anywhere" (WORA)</em>. Built by Sun Microsystems in 1995 and maintained by Oracle, Java powers millions of enterprise backends, cloud microservices, Android mobile applications, and big data systems. Each chapter in this masterclass combines multiple interconnected topics into a thorough, hands-on learning experience with live runnable code examples.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(240, 165, 0, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(240, 165, 0, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#f0a500; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning Java?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore foundations, control flow, object-oriented programming (OOP), collections, streams, concurrency, or enterprise Spring Boot & interview skills:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-java/01-welcome-hello-world.html" style="background:linear-gradient(135deg, #f0a500, #d97706); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-java/03-variables-and-data-types.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Types & Operators →</a>
        <a href="/blog-java/05-conditions.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Control Flow →</a>
        <a href="/blog-java/07-strings.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 4: Strings & Arrays →</a>
        <a href="/blog-java/10-classes-and-objects.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: Object-Oriented OOP →</a>
        <a href="/blog-java/14-exception-handling.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 6: Exceptions & Files →</a>
        <a href="/blog-java/16-collections.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 7: Collections & Streams →</a>
        <a href="/blog-java/21-multithreading.html" style="background:linear-gradient(135deg, #f0a500, #d97706); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 8: Enterprise & Projects →</a>
      </div>
    </div>

    <!-- Full Curriculum Roadmap Cards -->
    <div class="section-title"><span class="num">📚</span> Master Course Curriculum (27 Comprehensive Chapters)</div>
    <div class="curriculum-roadmap-container">
${roadmapCardsHtml}
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy & tested on OpenJDK / Oracle JDK 21+ LTS runtime · Last updated August 2026</span>
      </div>
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(path.join(baseDir, 'blog-java.html'), html, 'utf8');
  console.log('✅ Updated public/blog-java.html with Collapsible Accordion & Roadmap Cards');
}

// 4. Update all 27 individual lesson files in public/blog-java/
function updateAllJavaLessons() {
  ALL_JAVA_LESSONS.forEach((lesson, index) => {
    const filePath = path.join(javaDir, lesson.file);
    if (!fs.existsSync(filePath)) {
      console.warn('File not found:', filePath);
      return;
    }

    const raw = fs.readFileSync(filePath, 'utf8');

    // Extract main content body
    let mainContent = '';
    const mainMatch = raw.match(/<main class="content">([\s\S]*?)<\/main>/i);
    if (mainMatch) {
      mainContent = mainMatch[1];
    } else {
      mainContent = raw;
    }

    // Clean old breadcrumbs, page title, page meta, nav-footer, etc.
    mainContent = mainContent.replace(/<div class="breadcrumb">[\s\S]*?<\/div>/i, '');
    mainContent = mainContent.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '');
    mainContent = mainContent.replace(/<div class="page-meta">[\s\S]*?<\/div>/gi, '');
    mainContent = mainContent.replace(/<div class="nav-footer">[\s\S]*?<\/div>/i, '');

    // Clean old subtopics pill bars
    mainContent = mainContent.replace(/<!-- Subtopics Pill Bar -->[\s\S]*?<\/div>/gi, '');
    mainContent = mainContent.replace(/<div style="background:var\(--bg3\); border:1px solid var\(--border\); border-radius:8px; padding:10px 16px; margin-bottom:24px;[\s\S]*?<\/div>/gi, '');

    const accordionSidebar = generateJavaAccordionSidebar(lesson.file);

    const prevLesson = index > 0 ? ALL_JAVA_LESSONS[index - 1] : null;
    const nextLesson = index < ALL_JAVA_LESSONS.length - 1 ? ALL_JAVA_LESSONS[index + 1] : null;

    let navFooterHtml = `<div class="nav-footer">\n`;
    if (prevLesson) {
      navFooterHtml += `      <a href="${prevLesson.file}" class="nav-btn">
        <span class="label">← Previous Lesson</span>
        <span class="title">${prevLesson.title}</span>
      </a>\n`;
    } else {
      navFooterHtml += `      <a href="/blog-java.html" class="nav-btn">
        <span class="label">← Java Overview</span>
        <span class="title">Course Index</span>
      </a>\n`;
    }

    if (nextLesson) {
      navFooterHtml += `      <a href="${nextLesson.file}" class="nav-btn" style="text-align:right;">
        <span class="label">Next Lesson →</span>
        <span class="title">${nextLesson.title}</span>
      </a>\n`;
    } else {
      navFooterHtml += `      <a href="/blog-java.html" class="nav-btn" style="text-align:right;">
        <span class="label">Course Completed 🎉</span>
        <span class="title">Return to Course Index</span>
      </a>\n`;
    }
    navFooterHtml += `    </div>`;

    const subtopicsPill = l => l.subtopics ? `
    <!-- Subtopics Pill Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#f0a500; font-weight:700;">📌 Covered in this lesson:</span>
      <span>${l.subtopics}</span>
    </div>
` : '';

    const cleanMainBody = mainContent.trim();

    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${lesson.title} — Java Tutorial | Our Compiler</title>
  <meta name="description" content="Learn ${lesson.title} in Java with clear explanations, real code examples, common pitfalls, and hands-on exercises in our online Java compiler." />
  <meta name="keywords" content="java tutorial, ${lesson.title.toLowerCase()}, learn java, java online compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-java/${lesson.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="/site-nav.css" />
  
  <!-- Accordion Toggle, Syntax Highlighter & Code Preloader Script -->
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

    function highlightJavaCode(rawCode) {
      const tokens = [];
      const pushToken = (cls, text) => {
        const id = tokens.length;
        tokens.push(\`<span class="\${cls}">\${text}</span>\`);
        return \`___JAVA_TOK_\${id}___\`;
      };

      // 1. Comments
      let code = rawCode.replace(/(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*$)/gm, m => pushToken('cm', m));

      // 2. Strings & Characters
      code = code.replace(/("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*')/g, m => pushToken('st', m));

      // 3. Annotations (@Override, @SpringBootApplication, etc.)
      code = code.replace(/(@[A-Za-z_][A-Za-z0-9_]*)/g, m => pushToken('fn', m));

      // 4. Keywords
      const kwList = ['public','private','protected','class','interface','enum','extends','implements','static','final','abstract','void','return','new','this','super','package','import','if','else','switch','case','default','break','continue','for','while','do','try','catch','finally','throw','throws','instanceof','synchronized','volatile','transient','native','strictfp','var','record','sealed','permits','yield'];
      const kwRegex = new RegExp(\`\\\\b(\${kwList.join('|')})\\\\b\`, 'g');
      code = code.replace(kwRegex, m => pushToken('kw', m));

      // 5. Types & Built-in Classes
      const typeList = ['int','double','float','long','short','byte','char','boolean','String','System','Integer','Double','Float','Long','Short','Byte','Character','Boolean','Object','Class','Math','Scanner','Arrays','ArrayList','List','Map','HashMap','Set','HashSet','StringBuilder','StringBuffer','Thread','Runnable','Exception','RuntimeException','Throwable','PrintStream','File','FileReader','BufferedReader','FileWriter','LocalDate','LocalTime','LocalDateTime'];
      const typeRegex = new RegExp(\`\\\\b(\${typeList.join('|')})\\\\b\`, 'g');
      code = code.replace(typeRegex, m => pushToken('vr', m));

      // 6. Methods
      code = code.replace(/\\b([a-zA-Z_][a-zA-Z0-9_]*)\\s*(?=\\()/g, (m, fnName) => {
        if (['if','for','while','switch','catch'].includes(fnName)) return m;
        return pushToken('fn', fnName);
      });

      // 7. Numbers
      code = code.replace(/\\b(\\d+(?:\\.\\d+)?[fFdDlL]?)\\b/g, m => pushToken('nu', m));

      // 8. Restore Tokens
      code = code.replace(/___JAVA_TOK_(\\d+)___/g, (_, id) => tokens[id]);
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
        // Theme Toggle Button
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

        // Decorate Code Blocks (Copy Code & Preload Run Code)
        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;

          const rawCode = codeEl.textContent;
          codeEl.innerHTML = highlightJavaCode(rawCode);

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
              localStorage.setItem('code_java', rawCode);
              window.location.href = '/online-java-compiler.html';
            });
          }
        });

        document.querySelectorAll('.try-box').forEach(tryBox => {
          const codeEl = tryBox.querySelector('pre code');
          const runBtn = tryBox.querySelector('.run-btn');
          if (codeEl) {
            const rawCode = codeEl.textContent;
            codeEl.innerHTML = highlightJavaCode(rawCode);
            if (runBtn) {
              runBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.setItem('code_java', rawCode);
                window.location.href = '/online-java-compiler.html';
              });
            }
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-java">

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html" class="active">Java</a>
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
  <!-- LEFT SIDEBAR WITH COLLAPSIBLE ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">Java Master Course</div>
    <a href="/blog-java.html" class="sidebar-home-link">☕ Java Course HOME</a>

${accordionSidebar}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-java-compiler.html" style="color:#f0a500; font-weight:700;">▶ Try Java Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-python.html">Python Course (65 Lessons)</a>
    <a href="/blog-c.html">C Language (20 Lessons)</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-java.html">Java</a><span class="sep">›</span>
      <span class="current">Lesson ${lesson.num}: ${lesson.title.split('—')[0]}</span>
    </div>

    <h1 class="page-title">${lesson.title}</h1>

    <div class="page-meta">
      <span class="badge">☕ Java 21+ LTS</span>
      <span class="badge">🟢 Lesson ${lesson.num} of ${ALL_JAVA_LESSONS.length}</span>
      <span class="badge">📂 ${lesson.phaseTag}: ${lesson.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

${subtopicsPill(lesson)}

${cleanMainBody}

${navFooterHtml}
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;

    fs.writeFileSync(filePath, fullHtml, 'utf8');
    console.log(`✅ [${index + 1}/${ALL_JAVA_LESSONS.length}] Updated ${lesson.file}`);
  });
}

function run() {
  console.log('🚀 Building Java Full Accordion Masterclass & Lessons...');
  buildBlogJavaHome();
  updateAllJavaLessons();
  console.log('🎉 Java Masterclass successfully built matching the Python architecture!');
}

run();
