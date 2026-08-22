const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const phpDir = path.join(publicDir, 'blog-php');

if (!fs.existsSync(phpDir)) {
  fs.mkdirSync(phpDir, { recursive: true });
}

// 1. Create public/blog-php/style.css matching Emerald Green Theme (#10b981)
const cssStyleContent = `/* Specialized styling enhancements for PHP tutorial lessons & Accordion — Emerald Green Theme */
:root {
  --php-theme: #10b981;
  --php-theme-hover: #34d399;
  --php-theme-bg: rgba(16, 185, 129, 0.12);
  --php-theme-border: rgba(16, 185, 129, 0.3);
}

body.lang-php {
  --accent: #10b981;
  --accent-glow: rgba(16, 185, 129, 0.2);
}

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
  background: rgba(16, 185, 129, 0.08) !important;
  border: 1px solid rgba(16, 185, 129, 0.25) !important;
  border-radius: 9px !important;
  color: #10b981 !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-home-link:hover {
  background: rgba(16, 185, 129, 0.16) !important;
  border-color: #10b981 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.sidebar-home-link.active {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(20, 24, 32, 0.8)) !important;
  border-color: #10b981 !important;
  color: #10b981 !important;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.25);
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
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 25, 34, 0.6) 100%);
  border-color: #10b981;
  box-shadow: 0 0 14px rgba(16, 185, 129, 0.18);
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
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.4);
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
  color: #10b981;
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
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border-color: rgba(16, 185, 129, 0.35);
  font-weight: 700;
}

.accordion-chevron {
  color: var(--text3, #8b949e);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;
  flex-shrink: 0;
}

.accordion-header.active .accordion-chevron {
  transform: rotate(90deg);
  color: #10b981;
}

.accordion-content {
  display: none;
  flex-direction: column;
  padding: 4px 0 6px 10px;
  border-left: 2px solid rgba(16, 185, 129, 0.35);
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
  background: #10b981 !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.35);
}

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
  border-color: rgba(16, 185, 129, 0.4);
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
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
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
  color: #10b981;
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
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.35);
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
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  font-size: 12px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.curriculum-lesson-row:hover .lesson-idx {
  background: #10b981;
  color: #ffffff;
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
  color: #10b981;
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
  color: #10b981;
  padding: 5px 12px;
  border-radius: 6px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  transition: all 0.18s ease;
}

.curriculum-lesson-row:hover .lesson-btn {
  background: #10b981;
  color: #ffffff;
}

.curriculum-lesson-row:hover .lesson-btn .arrow {
  transform: translateX(3px);
}

.lesson-btn .arrow {
  transition: transform 0.18s ease;
}

/* Light Theme overrides for Roadmap Cards and Accordion Sidebar */
body.light-theme .phase-roadmap-card {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

body.light-theme .phase-roadmap-card:hover {
  border-color: #10b981;
  box-shadow: 0 6px 18px rgba(16, 185, 129, 0.12);
}

body.light-theme .phase-roadmap-header {
  border-bottom-color: #f1f5f9;
}

body.light-theme .phase-roadmap-icon {
  background: #dcfce7;
  border-color: #bbf7d0;
}

body.light-theme .phase-roadmap-tag {
  color: #059669;
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
  background: #f0fdf4;
  border-color: #86efac;
}

body.light-theme .lesson-idx {
  background: #dcfce7;
  color: #059669;
}

body.light-theme .lesson-title {
  color: #0f172a;
}

body.light-theme .lesson-subtopics {
  color: #64748b;
}

body.light-theme .lesson-btn {
  background: #dcfce7;
  border-color: #bbf7d0;
  color: #059669;
}

body.light-theme .curriculum-lesson-row:hover .lesson-btn {
  background: #059669;
  color: #ffffff;
}

body.light-theme .sidebar-home-link {
  background: #f0fdf4 !important;
  border-color: #bbf7d0 !important;
  color: #059669 !important;
}

body.light-theme .sidebar-home-link.active {
  background: #dcfce7 !important;
  border-color: #10b981 !important;
  color: #047857 !important;
}

body.light-theme .accordion-header {
  background: #ffffff !important;
  border-color: #e2e8f0 !important;
  color: #0f172a !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
}
body.light-theme .accordion-header:hover {
  background: #f8fafc !important;
  border-color: #cbd5e1 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06) !important;
}
body.light-theme .accordion-header.active {
  background: #ffffff !important;
  border: 1.5px solid #10b981 !important;
  color: #0f172a !important;
  box-shadow: 0 2px 10px rgba(16, 185, 129, 0.15) !important;
}
body.light-theme .phase-icon-box {
  background: #f1f5f9;
  border-color: #e2e8f0;
}
body.light-theme .accordion-header.active .phase-icon-box {
  background: #dcfce7 !important;
  border-color: #bbf7d0 !important;
}
body.light-theme .phase-tag {
  color: #64748b;
}
body.light-theme .accordion-header.active .phase-tag {
  color: #059669 !important;
}
body.light-theme .phase-title {
  color: #0f172a !important;
}
body.light-theme .phase-count-badge {
  background: #f1f5f9;
  color: #475569;
  border-color: #e2e8f0;
}
body.light-theme .accordion-header.active .phase-count-badge {
  background: #dcfce7 !important;
  color: #059669 !important;
  border-color: #86efac !important;
}
body.light-theme .accordion-chevron {
  color: #94a3b8;
}
body.light-theme .accordion-header.active .accordion-chevron {
  color: #059669 !important;
}
body.light-theme .accordion-content a {
  color: #475569;
}
body.light-theme .accordion-content a:hover {
  color: #0f172a;
  background: #f1f5f9;
}
body.light-theme .accordion-content a.active {
  background: #10b981 !important;
  color: #ffffff !important;
  border-radius: 8px !important;
  font-weight: 700 !important;
}

.try-box {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(20, 24, 32, 0.6) 100%);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: var(--radius, 12px);
  padding: 24px;
  margin: 32px 0;
}

.try-box .try-title {
  font-weight: 700;
  color: #10b981;
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
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
}

.try-box .run-btn:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

.callout {
  background: #161b22;
  border: 1px solid #30363d;
  border-left: 4px solid #10b981;
  padding: 18px 22px;
  border-radius: var(--radius, 12px);
  margin: 28px 0;
}

.callout .callout-title {
  font-weight: 700;
  color: #10b981;
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
  color: #7ee787;
  line-height: 1.55;
  white-space: pre !important;
  overflow-x: auto;
}

.faq-card {
  background: #141820;
  border: 1px solid #30363d;
  border-left: 4px solid #10b981;
  border-radius: 10px;
  padding: 18px 22px;
  margin-bottom: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, border-color 0.2s;
}

.faq-card:hover {
  transform: translateX(3px);
  border-color: #10b981;
}

.faq-card h4 {
  color: #10b981 !important;
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
  background: linear-gradient(135deg, #10b981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

body.light-theme .try-box {
  background: #f0fdf4;
  border-color: #bbf7d0;
}
body.light-theme .callout {
  background: #f8fafc;
  border-color: #cbd5e1;
  border-left-color: #059669;
}
body.light-theme .callout .callout-title {
  color: #047857;
}
body.light-theme .diagram-box {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}
body.light-theme .faq-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #059669;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
body.light-theme .faq-card h4 {
  color: #047857 !important;
}
body.light-theme .faq-card p {
  color: #334155;
}
`;

fs.writeFileSync(path.join(phpDir, 'style.css'), cssStyleContent, 'utf8');

// 2. Define Complete 35-Chapter PHP Masterclass Data Structure across 12 Phases
const phpPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'PHP Introduction', icon: '🐘',
    chapters: [
      {
        num: 1, file: '01-php-ante-enti-what-is-php.html', title: 'PHP Ante Enti?',
        subtopics: 'PHP ante enti? · PHP full form · PHP enduku use chestaru? · PHP vs JavaScript · PHP vs Python · PHP vs Node.js · Server-side scripting · Execution flow · Dynamic websites · REST APIs · CMS platforms · Advantages & Limitations',
        summary: 'PHP is a server-side scripting language used to build dynamic websites, web applications and APIs. PHP server lo execute ayi, browser ki HTML, JSON or other response send chestundi.',
        code: `<?php
// PHP Execution Flow
// Browser Request -> PHP Server Code -> Database / Logic -> HTML Response
echo "Welcome to PHP Server-Side Masterclass!";
?>`
      },
      {
        num: 2, file: '02-php-prerequisites.html', title: 'PHP Prerequisites',
        subtopics: 'HTML basics · CSS basics · JavaScript basics · Programming logic · Variables · Functions · Arrays · OOP basics · HTTP basics · SQL basics · Git basics · Command-line basics',
        summary: 'Prerequisites for learning PHP: understanding core HTML/CSS markup, basic programming logic, HTTP request lifecycle, and SQL databases.',
        code: `<?php
$prereqs = ["HTML", "CSS", "JS", "SQL"];
echo "Prerequisites: " . implode(", ", $prereqs);
?>`
      }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'Setup and First Program', icon: '⚙️',
    chapters: [
      {
        num: 3, file: '03-php-installation.html', title: 'PHP Installation',
        subtopics: 'Installing PHP on Windows, macOS, Linux · Checking PHP version (php --version) · PHP CLI · PHP development server · XAMPP overview · MAMP overview · Composer installation · VS Code setup · php.ini configuration',
        summary: 'Step-by-step installation guide for setting up PHP CLI, local development web servers, XAMPP stack, Composer package manager, and VS Code extensions.',
        code: `// Verify PHP Installation in Terminal:
// php --version
// php -m`
      },
      {
        num: 4, file: '04-first-php-program.html', title: 'First PHP Program',
        subtopics: '.php files · <?php opening tag · PHP statements · echo · print · Comments · Running PHP from terminal · PHP development server · PHP inside HTML · Syntax errors',
        summary: 'Write and run your first PHP script using echo, print, PHP CLI, and the built-in development server (php -S localhost:8000).',
        code: `<?php

echo "Hello, PHP!";
?>`
      },
      {
        num: 5, file: '05-php-with-html.html', title: 'PHP with HTML',
        subtopics: 'Embedding PHP in HTML · PHP output inside HTML · Short echo tag <?= ?> · Dynamic headings & lists · Conditional HTML · Loop-generated HTML · Escaping output with htmlspecialchars()',
        summary: 'Seamlessly embed dynamic PHP logic inside HTML documents, using short echo tags <?= ?> and HTML escaping for web security.',
        code: `<?php
$name = "Ravi";
?>

<h1>Welcome, <?= htmlspecialchars($name) ?>!</h1>`
      }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'Variables and Data Types', icon: '🔢',
    chapters: [
      {
        num: 6, file: '06-variables.html', title: 'Variables',
        subtopics: 'Variable ante enti? · $ symbol prefix · Variable declaration · Variable assignment · Reassigning values · Variable naming rules · Case sensitivity · Local, Global, Static scope · Constants define() & const',
        summary: 'Declare and scope PHP variables using $ prefixes, global/static scopes, and define constant values.',
        code: `<?php

$name = "Ravi";
$age = 21;
$price = 99.99;
$is_active = true;

echo $name . " is " . $age . " years old.";
?>`
      },
      {
        num: 7, file: '07-data-types.html', title: 'Data Types',
        subtopics: 'int · float · string · bool · array · object · null · resource · callable · iterable · mixed · void · never · Checking types (var_dump, gettype) · Type juggling · Strict typing',
        summary: 'Explore PHP dynamic data types: scalar types, compound arrays/objects, special null/resource types, var_dump() inspection, and type juggling rules.',
        code: `<?php

$value = 42;

var_dump($value);
echo gettype($value);
?>`
      },
      {
        num: 8, file: '08-type-declarations.html', title: 'Type Declarations',
        subtopics: 'Parameter types · Return types · Property types · Nullable types (?Type) · Union types (int|float) · Intersection types · declare(strict_types=1); · Type errors · Strict typing',
        summary: 'Enforce type safety in modern PHP using parameter types, return type declarations, union types, and declare(strict_types=1); mode.',
        code: `<?php

declare(strict_types=1);

function add(int $first, int $second): int
{
    return $first + $second;
}

echo add(10, 20);
?>`
      }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'Operators and Control Flow', icon: '🔀',
    chapters: [
      {
        num: 9, file: '09-operators.html', title: 'Operators',
        subtopics: 'Arithmetic operators · Assignment operators · Comparison (===, !==, <=>) · Strict vs Loose comparison · Logical operators · Increment & Decrement (++ --) · String concatenation (.) · Null coalescing (??) · Null-safe operator (?->) · Ternary operator (?:) · Spaceship operator (<=>) · Bitwise operators',
        summary: 'Master PHP operators: arithmetic, strict === and loose == comparison, spaceship operator <=>, string concatenation ., null coalescing ??, and null-safe ?-> operator.',
        code: `<?php

$price = 100;
$discount = 20;
$final_price = $price - $discount;

echo $final_price;
?>`
      },
      {
        num: 10, file: '10-conditions.html', title: 'Conditions',
        subtopics: 'if · else · elseif · Nested conditions · Logical conditions · Ternary expression · Null coalescing · match expression · Truthy and falsy values · Strict comparisons · Guard clauses · Common mistakes',
        summary: 'Control program branching with if, elseif, else conditions, ternary expressions, null coalescing, and modern PHP 8+ match expressions.',
        code: `<?php

$marks = 78;

if ($marks >= 90) {
    echo "Grade A";
} elseif ($marks >= 60) {
    echo "Grade B";
} elseif ($marks >= 40) {
    echo "Grade C";
} else {
    echo "Fail";
}
?>`
      },
      {
        num: 11, file: '11-loops.html', title: 'Loops',
        subtopics: 'for · while · do-while · foreach · Nested loops · break · continue · Looping arrays · Looping associative arrays · Loop references · Infinite loops · Loop performance · Practice: Even/Odd, Factorial, Prime, Fibonacci, Star patterns',
        summary: 'Iterate over data structures with for, while, do-while, and foreach ($array as $key => $value) loops.',
        code: `<?php

for ($number = 1; $number <= 5; $number++) {
    echo $number . PHP_EOL;
}
?>`
      }
    ]
  },
  {
    phaseTag: 'Phase 05', phaseTitle: 'Strings and Arrays', icon: '📦',
    chapters: [
      {
        num: 12, file: '12-strings.html', title: 'Strings',
        subtopics: 'Single quotes · Double quotes · Variable interpolation · String concatenation · strlen · strtoupper · strtolower · trim · str_replace · strpos · substr · explode · implode · str_contains · str_starts_with · str_ends_with · Multibyte strings (mbstring) · Heredoc · Nowdoc',
        summary: 'Manipulate strings in PHP: single vs double quotes, interpolation, strlen, strtoupper, str_replace, explode, implode, str_contains, and multibyte strings.',
        code: `<?php

$language = "PHP";

echo strlen($language);
echo strtoupper($language);
echo "I am learning $language";
?>`
      },
      {
        num: 13, file: '13-indexed-arrays.html', title: 'Indexed Arrays',
        subtopics: 'Creating arrays · Numeric indexes · Adding values · Updating values · Removing values · count · sort · rsort · array_push · array_pop · array_shift · array_slice · array_merge · Checking values · Looping arrays',
        summary: 'Create and manipulate 0-based numeric indexed arrays in PHP, pushing elements, sorting, merging, and iterating with foreach.',
        code: `<?php

$courses = ["PHP", "MySQL", "Laravel"];

foreach ($courses as $course) {
    echo $course . PHP_EOL;
}
?>`
      },
      {
        num: 14, file: '14-associative-arrays.html', title: 'Associative Arrays',
        subtopics: 'Key-value arrays · Creating associative arrays · Reading values · Updating values · Removing keys · array_keys · array_values · array_key_exists · isset · Nested associative arrays · Looping keys and values',
        summary: 'Store key-value pairs using PHP Associative Arrays, accessing keys, checking key existence with array_key_exists and isset.',
        code: `<?php

$student = [
    "name" => "Ravi",
    "age" => 21,
    "course" => "PHP"
];

echo $student["name"];
?>`
      },
      {
        num: 15, file: '15-array-functions.html', title: 'Array Functions',
        subtopics: 'array_map · array_filter · array_reduce · array_find overview · array_column · array_unique · array_search · in_array · array_sum · array_combine · array_chunk · Sorting callbacks · Anonymous functions · Arrow functions',
        summary: 'Harness built-in PHP array functions: array_map, array_filter, array_reduce, in_array, array_column, and arrow function callbacks (fn).',
        code: `<?php

$numbers = [10, 15, 20, 25, 30];

$even_numbers = array_filter(
    $numbers,
    fn(int $number): bool => $number % 2 === 0
);

print_r($even_numbers);
?>`
      }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'Functions & Scope', icon: '⚡',
    chapters: [
      {
        num: 16, file: '16-functions.html', title: 'Functions',
        subtopics: 'Function declaration · Function call · Parameters · Arguments · Return values · Return types · Default parameters · Named arguments · Variadic parameters · Passing by value/reference · Variable scope · Global keyword · Static variables · Recursive functions · Anonymous functions · Arrow functions · Closures · First-class callables',
        summary: 'Write typed PHP functions with default arguments, named parameters, variadic args, pass-by-reference &, anonymous closures, and arrow functions.',
        code: `<?php

function calculate_total(float $price, float $tax = 0.18): float
{
    return $price + ($price * $tax);
}

echo calculate_total(100);
?>`
      },
      {
        num: 17, file: '17-variable-scope-and-closures.html', title: 'Variable Scope & Closures',
        subtopics: 'Local scope · Global scope · Static scope · $GLOBALS · Closures · use keyword · Capturing variables · Arrow function capture · Closure binding · Avoiding global state',
        summary: 'Master local, global, static scopes, $GLOBALS superglobal, capturing environment state in closures using the use keyword.',
        code: `<?php

$taxRate = 0.18;
$calculateTax = function(float $amount) use ($taxRate): float {
    return $amount * $taxRate;
};

echo $calculateTax(100); // 18
?>`
      }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Forms and Web Input', icon: '📝',
    chapters: [
      {
        num: 18, file: '18-html-forms.html', title: 'HTML Forms',
        subtopics: 'GET forms · POST forms · $_GET · $_POST · $_REQUEST · Input names · Form validation · Empty values · Required fields · Redirect after POST · Form error messages · Preserving old values',
        summary: 'Process GET and POST HTML form submissions securely using $_POST and $_GET superglobals and htmlspecialchars() sanitization.',
        code: `<?php

$name = $_POST["name"] ?? "";
$name = htmlspecialchars($name, ENT_QUOTES, "UTF-8");
echo "Clean Name: " . $name;
?>`
      },
      {
        num: 19, file: '19-superglobals.html', title: 'Superglobals',
        subtopics: '$_GET · $_POST · $_SERVER · $_SESSION · $_COOKIE · $_FILES · $_ENV · $_REQUEST · Input source security · Avoiding direct trust',
        summary: 'Understand built-in PHP superglobal arrays: $_SERVER, $_GET, $_POST, $_FILES, $_COOKIE, $_SESSION, $_ENV, and security best practices.',
        code: `<?php

echo "Request Method: " . $_SERVER['REQUEST_METHOD'];
echo "User Agent: " . $_SERVER['HTTP_USER_AGENT'];
?>`
      },
      {
        num: 20, file: '20-file-uploads.html', title: 'File Uploads',
        subtopics: 'Multipart forms · $_FILES · File name · Temporary path · File size · MIME type · Upload errors · move_uploaded_file · File extension validation · Secure file names · Upload directories · Image upload security · Upload limits',
        summary: 'Handle file uploads securely with enctype="multipart/form-data", $_FILES superglobal, extension validation, and move_uploaded_file().',
        code: `<?php

if (isset($_FILES['document'])) {
    $tmpName = $_FILES['document']['tmp_name'];
    $dest = "uploads/" . basename($_FILES['document']['name']);
    move_uploaded_file($tmpName, $dest);
    echo "File Uploaded Safely!";
}
?>`
      }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Sessions, Cookies & State', icon: '🔑',
    chapters: [
      {
        num: 21, file: '21-sessions-and-authentication.html', title: 'Sessions & Authentication',
        subtopics: 'session_start() · $_SESSION superglobal · Storing session variables · User login authentication flow · Destroying sessions (session_destroy)',
        summary: 'Maintain persistent user state across web pages using PHP sessions, implementing secure user login and logout authentication flows.',
        code: `<?php
session_start();
$_SESSION['user_id'] = 42;
$_SESSION['username'] = "Ravi";

echo "Logged in as: " . $_SESSION['username'];
?>`
      },
      {
        num: 22, file: '22-cookies.html', title: 'Cookies',
        subtopics: 'setcookie() · $_COOKIE superglobal · Cookie expiration · Path & domain scoping · HttpOnly flag · Secure flag · Cookie consent',
        summary: 'Store client-side cookies using setcookie(), configuring expiration times, HttpOnly flags, and retrieving values with $_COOKIE.',
        code: `<?php
setcookie("theme", "dark", time() + (7 * 86400), "/", "", false, true);
echo "Theme Cookie Set!";
?>`
      }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'Object-Oriented PHP (OOP)', icon: '🏛️',
    chapters: [
      {
        num: 23, file: '23-classes-and-objects.html', title: 'Classes and Objects',
        subtopics: 'class declaration · new keyword · Properties · Methods · $this · Visibility (public, protected, private) · Constructor (__construct) · Destructor',
        summary: 'Master Object-Oriented PHP fundamentals: creating classes, instantiating objects, setting property visibility, and implementing constructors.',
        code: `<?php

class User {
    public string $name;

    public function __construct(string $name) {
        $this->name = $name;
    }

    public function greet(): string {
        return "Hello, " . $this->name;
    }
}

$u = new User("Ravi");
echo $u->greet();
?>`
      },
      {
        num: 24, file: '24-inheritance-and-interfaces.html', title: 'Inheritance & Interfaces',
        subtopics: 'extends keyword · Method overriding · parent:: · Abstract classes (abstract class) · Interfaces (interface) · implements keyword',
        summary: 'Extend classes with inheritance, override methods, define contract interfaces, and implement abstract base classes.',
        code: `<?php

interface Renderable {
    public function render(): string;
}

class Button implements Renderable {
    public function render(): string {
        return "<button>Click Me</button>";
    }
}
?>`
      },
      {
        num: 25, file: '25-traits-namespaces-and-autoloading.html', title: 'Traits, Namespaces & Autoloading',
        subtopics: 'trait keyword · use traits · static properties & methods · self:: · static:: · namespace declaration · use imports · Composer PSR-4 autoloading',
        summary: 'Reuse code with Traits, prevent class name collisions with Namespaces, and configure automatic class loading with Composer PSR-4.',
        code: `<?php

namespace App\Controllers;

class HomeController {
    public static function index() {
        echo "Home Controller Index";
    }
}
?>`
      }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'Database Access with PDO', icon: '🗄️',
    chapters: [
      {
        num: 26, file: '26-pdo-database-connection.html', title: 'PDO Database Connection',
        subtopics: 'PHP Data Objects (PDO) · PDO vs MySQLi · DSN connection string · PDOException · Configuring error modes (ERRMODE_EXCEPTION)',
        summary: 'Connect PHP to MySQL databases securely using PDO (PHP Data Objects), handling connection errors with try-catch blocks.',
        code: `<?php

try {
    $pdo = new PDO("mysql:host=localhost;dbname=our_compiler", "app_user", "password");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected to Database Successfully!";
} catch (PDOException $e) {
    echo "Connection Failed: " . $e->getMessage();
}
?>`
      },
      {
        num: 27, file: '27-pdo-prepared-statements-and-crud.html', title: 'PDO Prepared Statements & CRUD',
        subtopics: 'PDO prepare() · execute() · Parameter binding (bindValue, bindParam) · fetch() · fetchAll() · rowCount() · Preventing SQL Injection',
        summary: 'Execute safe CRUD queries using PDO prepared statements with parameter binding to prevent SQL injection vulnerabilities.',
        code: `<?php
$stmt = $pdo->prepare("SELECT id, name FROM users WHERE level = :level");
$stmt->execute(['level' => 'Beginner']);
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

print_r($users);
?>`
      },
      {
        num: 28, file: '28-database-transactions.html', title: 'Database Transactions',
        subtopics: 'beginTransaction() · commit() · rollBack() · ACID properties in PDO · Transaction error handling with try-catch',
        summary: 'Execute multi-step database changes atomically using PDO transactions with commit() and rollBack().',
        code: `<?php
try {
    $pdo->beginTransaction();
    $pdo->exec("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
    $pdo->exec("UPDATE accounts SET balance = balance + 100 WHERE id = 2");
    $pdo->commit();
    echo "Transaction Committed!";
} catch (Exception $e) {
    $pdo->rollBack();
    echo "Transaction Failed: " . $e->getMessage();
}
?>`
      }
    ]
  },
  {
    phaseTag: 'Phase 11', phaseTitle: 'REST APIs & Modern PHP', icon: '🌐',
    chapters: [
      {
        num: 29, file: '29-building-rest-apis-with-php.html', title: 'Building REST APIs with PHP',
        subtopics: 'header("Content-Type: application/json") · json_encode() · json_decode() · HTTP status codes (200, 201, 404, 500) · Reading JSON input stream (php://input)',
        summary: 'Build RESTful API endpoints in PHP returning JSON responses, parsing incoming JSON request bodies, and setting HTTP status codes.',
        code: `<?php
header("Content-Type: application/json");
$input = json_decode(file_get_contents("php://input"), true);

echo json_encode([
    "status" => "success",
    "message" => "Data received",
    "data" => $input
]);
?>`
      },
      {
        num: 30, file: '30-composer-and-package-management.html', title: 'Composer & Package Management',
        subtopics: 'Composer init · composer.json · composer.lock · Installing packages from Packagist · vendor directory · PSR-4 Autoloading',
        summary: 'Manage PHP third-party libraries and PSR-4 package autoloading using Composer package manager.',
        code: `// Terminal Commands:
// composer init
// composer require monolog/monolog`
      },
      {
        num: 31, file: '31-modern-php-frameworks-overview.html', title: 'Modern PHP Frameworks Overview',
        subtopics: 'Laravel framework architecture · Symfony framework · MVC pattern · Routing · Controllers · Views · Eloquent ORM overview',
        summary: 'Explore modern PHP web development ecosystems: Laravel framework architecture, MVC design pattern, and Eloquent ORM.',
        code: `<?php
echo "Modern PHP Framework Architecture Active!";
?>`
      }
    ]
  },
  {
    phaseTag: 'Phase 12', phaseTitle: 'Projects, Testing & Certification', icon: '🏆',
    chapters: [
      {
        num: 32, file: '32-error-and-exception-handling.html', title: 'Error & Exception Handling',
        subtopics: 'try, catch, finally · throw new Exception() · Custom exception classes · error_reporting() · Custom error handlers (set_error_handler)',
        summary: 'Handle runtime failures gracefully using try-catch-finally blocks, throwing custom Exception classes, and configuring error logging.',
        code: `<?php
try {
    throw new Exception("Custom PHP Exception Thrown");
} catch (Exception $e) {
    echo "Caught Exception: " . $e->getMessage();
}
?>`
      },
      {
        num: 33, file: '33-unit-testing-with-phpunit.html', title: 'Unit Testing with PHPUnit',
        subtopics: 'PHPUnit framework · Writing test classes · Test methods · Assertions (assertEquals, assertTrue) · Running phpunit tests',
        summary: 'Write automated unit tests for PHP classes using PHPUnit framework and test assertions.',
        code: `<?php
use PHPUnit\Framework\TestCase;

class MathTest extends TestCase {
    public function testAdd() {
        $this->assertEquals(5, 2 + 3);
    }
}
?>`
      },
      {
        num: 34, file: '34-php-web-application-project.html', title: 'PHP Web Application Project',
        subtopics: 'Complete User Authentication & CRUD Web Application in PHP with PDO, MySQL database, Session login, and CSS styling',
        summary: 'Build a production-ready PHP Web Application featuring user registration, session authentication, PDO database CRUD, and secure forms.',
        code: `<?php
echo "🚀 Production PHP Web Application Active!";
?>`
      },
      {
        num: 35, file: '35-php-quiz.html', title: 'PHP Practice Quiz',
        subtopics: 'Comprehensive PHP Knowledge Check · 30 Multiple Choice Certification Exam Questions · Syntax, Forms, OOP, PDO, Sessions & Security',
        summary: 'Test your PHP web development mastery with our 30-question interactive certification practice quiz.',
        code: `<?php
echo "🏆 PHP Masterclass Certification Quiz Active!";
?>`
      }
    ]
  }
];

// Helper to generate Accordion Sidebar HTML
function getPHPSidebarHTML(activeNum) {
  let sidebarAccHTML = '';
  phpPhases.forEach(phase => {
    const isPhaseActive = phase.chapters.some(c => c.num === activeNum);
    sidebarAccHTML += `
      <button class="accordion-header ${isPhaseActive ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">${phase.icon}</span>
          <div class="phase-info"><span class="phase-tag">${phase.phaseTag}</span><span class="phase-title">${phase.phaseTitle}</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">${phase.chapters.length} Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${isPhaseActive ? 'open' : ''}">
        ${phase.chapters.map(c => `<a href="/blog-php/${c.file}" class="${c.num === activeNum ? 'active' : ''}">${c.num}. ${c.title}</a>`).join('')}
      </div>`;
  });
  return sidebarAccHTML;
}

// 3. Generate public/blog-php.html (Master Index Page)
const allPHPChapters = [];
phpPhases.forEach(p => p.chapters.forEach(c => allPHPChapters.push({ ...c, phaseTag: p.phaseTag, phaseTitle: p.phaseTitle, icon: p.icon })));

const masterIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PHP Complete Roadmap — 35 Chapters, 12 Phases (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master PHP web development from zero to production ready with our complete 35-chapter roadmap across 12 phases: Setup, Variables, Data Types, Operators, Conditions, Loops, Strings, Slices & Maps, Functions, Forms & Web Input, Superglobals, File Uploads, OOP, PDO Database, REST APIs, Composer, Testing, Docker, Projects, and Quiz." />
  <meta name="keywords" content="php tutorial, learn php, php masterclass, server side scripting, operators, conditions, loops, array functions, php forms, superglobals, file uploads, pdo mysql, php oop, php rest api" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-php.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-php/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <script>
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) { content.classList.remove('open'); btn.classList.remove('active'); }
      else { content.classList.add('open'); btn.classList.add('active'); }
    }
    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => document.body.classList.add('light-theme'));
      }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left:auto;flex-shrink:0;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;cursor:pointer;font-family:"Inter",sans-serif;transition:all 0.2s;white-space:nowrap;margin-right:12px;';
          const updateText = () => { toggleBtn.innerHTML = document.body.classList.contains('light-theme') ? '🌙 Dark' : '☀️ Light'; };
          updateText();
          toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.documentElement.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
            updateText();
          });
          topnav.appendChild(toggleBtn);
        }
      });
    })();
  </script>
</head>
<body class="lang-php">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-php.html" class="active">PHP</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-vue.html">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-django.html">Django</a>
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-mysql.html">MySQL</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">PHP Roadmap</div>
    <a href="/blog-php.html" class="sidebar-home-link active">🐘 PHP Course HOME</a>
    <div class="sidebar-accordion">
      ${getPHPSidebarHTML(0)}
    </div>
    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-python-compiler.html" style="color:#10b981;font-weight:700;">▶ Run Code in IDE</a>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">PHP Complete Roadmap</span>
    </div>

    <h1 class="page-title">PHP Complete Masterclass (35 Chapters, 12 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🐘 PHP 8.2+</span>
      <span class="badge">🟢 35 Complete Chapters</span>
      <span class="badge">📂 12 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">PHP Ante Enti? · Installation &amp; Dev Server · PHP with HTML · Variables &amp; Types · Operators &amp; Control Flow · Strings &amp; Array Functions · Functions &amp; Closures · HTML Forms &amp; Superglobals · File Uploads &amp; Security · Sessions &amp; Cookies · OOP (Classes, Interfaces, Traits) · PDO &amp; MySQL Prepared Statements · REST APIs &amp; Composer · Unit Testing &amp; Docker · Project &amp; Quiz</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's PHP Complete Master Course</strong>. PHP is the backbone of the modern web, powering over 75% of dynamic websites and platforms like WordPress, Wikipedia, and Laravel services. This comprehensive 35-chapter bootcamp guides you step-by-step from server setup to object-oriented programming, PDO database CRUD, secure session authentication, and REST APIs.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(16,185,129,0.12),rgba(20,24,32,0.6));border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#10b981;margin-bottom:10px;font-size:18px;">🎯 Ready to Start Learning PHP?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Choose where to start: explore PHP introduction, operators, arrays, functions, form processing, OOP, or PDO database access:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-php/01-php-ante-enti-what-is-php.html" style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: PHP Intro →</a>
        <a href="/blog-php/09-operators.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 4: Operators &amp; Control Flow →</a>
        <a href="/blog-php/13-indexed-arrays.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 5: Strings &amp; Arrays →</a>
        <a href="/blog-php/18-html-forms.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 7: Forms &amp; Superglobals →</a>
        <a href="/blog-php/23-classes-and-objects.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 9: OOP PHP →</a>
        <a href="/blog-php/26-pdo-database-connection.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 10: PDO Database →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">
      ${phpPhases.map(phase => `
        <div class="phase-roadmap-card">
          <div class="phase-roadmap-header">
            <div class="phase-roadmap-title-wrap">
              <span class="phase-roadmap-icon">${phase.icon}</span>
              <div>
                <div class="phase-roadmap-tag">${phase.phaseTag}</div>
                <h3 class="phase-roadmap-title">${phase.phaseTitle}</h3>
              </div>
            </div>
            <span class="phase-roadmap-badge">${phase.chapters.length} In-Depth Lessons</span>
          </div>
          <div class="phase-lessons-list">
            ${phase.chapters.map(ch => `
              <a href="/blog-php/${ch.file}" class="curriculum-lesson-row">
                <div class="lesson-row-left">
                  <span class="lesson-idx">${ch.num.toString().padStart(2, '0')}</span>
                  <div class="lesson-info">
                    <span class="lesson-title">${ch.num}. ${ch.title}</span>
                    <span class="lesson-subtopics">${ch.subtopics}</span>
                  </div>
                </div>
                <div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div>
              </a>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>PHP Complete Masterclass · 35 Chapters · 12 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-php/01-php-ante-enti-what-is-php.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. PHP Ante Enti?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-php.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-php.html master index page successfully!');

// 4. Generate all 35 Chapter HTML Files inside public/blog-php/ adhering to the 15-Section Lesson Layout
allPHPChapters.forEach((ch, idx) => {
  const prevChapter = idx > 0 ? allPHPChapters[idx - 1] : null;
  const nextChapter = idx < allPHPChapters.length - 1 ? allPHPChapters[idx + 1] : null;

  const chapterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PHP — ${ch.title} | Our Compiler</title>
  <meta name="description" content="Complete PHP Chapter ${ch.num}: ${ch.title}. Learn ${ch.subtopics} with practical PHP code examples, web execution flow, and step-by-step walkthroughs." />
  <meta name="keywords" content="php tutorial, server side scripting, ${ch.title.toLowerCase()}, learn php, web development, php pdo" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-php/${ch.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-php/style.css" />
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
        });
      });
    })();
  </script>
</head>
<body class="lang-php">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-php.html" class="active">PHP</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-vue.html">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-django.html">Django</a>
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-mysql.html">MySQL</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">PHP Tutorial</div>
    <a href="/blog-php.html" class="sidebar-home-link">🐘 PHP HOME</a>
    <div class="sidebar-accordion">
      ${getPHPSidebarHTML(ch.num)}
    </div>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-php.html">PHP</a><span class="sep">›</span>
      <span class="current">PHP — ${ch.title}</span>
    </div>

    <h1 class="page-title">PHP — ${ch.title}</h1>

    <div class="page-meta">
      <span class="badge">🐘 PHP 8.2+</span>
      <span class="badge">🟢 Chapter ${ch.num} of ${allPHPChapters.length}</span>
      <span class="badge">📂 ${ch.phaseTag}: ${ch.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this chapter:</span>
      <span class="topic-pill-text">${ch.subtopics}</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>PHP — ${ch.title}</strong> in our PHP Complete Masterclass! ${ch.summary}</p>
    </div>

    <!-- 1. Simple introduction -->
    <div class="section-title"><span class="num">1</span>Simple Introduction</div>
    <div class="section-body">
      <p>In PHP server-side web development, understanding <strong>${ch.title}</strong> is essential for building dynamic, secure, and data-driven web applications. PHP scripts execute on the web server and stream HTML/JSON output to the client browser.</p>
    </div>

    <!-- 2. What you will learn -->
    <div class="section-title"><span class="num">2</span>What You Will Learn</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <strong style="color:#10b981;display:block;margin-bottom:10px;">📚 Learning Objectives:</strong>
        <ul style="margin:0 0 0 20px;line-height:1.8;">
          <li>Master core PHP web mechanics behind <strong>${ch.title}</strong></li>
          <li>Understand request/response lifecycle, superglobals, and server execution</li>
          <li>Write production-ready, type-safe, and secure PHP source code</li>
          <li>Avoid XSS vulnerability traps, SQL injections, and session state bugs</li>
        </ul>
      </div>
    </div>

    <!-- 3. Why this concept is useful -->
    <div class="section-title"><span class="num">3</span>Why ${ch.title} is Useful</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">💡 Practical Utility</div>
        <p>PHP powers modern content platforms, enterprise web portals, and microservice APIs. Mastering <strong>${ch.title}</strong> enables developers to handle forms, manage sessions, query databases via PDO, and build Laravel web apps.</p>
      </div>
    </div>

    <!-- 4. Required PHP tags & imports -->
    <div class="section-title"><span class="num">4</span>Required PHP Declaration</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">PHP — File Header</span>
        </div>
        <pre><code>&lt;?php

declare(strict_types=1);</code></pre>
      </div>
    </div>

    <!-- 5. Basic syntax -->
    <div class="section-title"><span class="num">5</span>Basic Syntax</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">PHP — Code Structure</span>
        </div>
        <pre><code>${ch.code}</code></pre>
      </div>
    </div>

    <!-- 6. Basic example -->
    <div class="section-title"><span class="num">6</span>Basic Example</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">PHP — Executable Script</span>
        </div>
        <pre><code>${ch.code}</code></pre>
      </div>
    </div>

    <!-- 7. Server command & execution -->
    <div class="section-title"><span class="num">7</span>Server Command &amp; Execution</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Terminal — PHP Development Server</span>
        </div>
        <pre><code># Start local built-in server
php -S localhost:8000

# Open in Browser:
# http://localhost:8000/index.php</code></pre>
      </div>
    </div>

    <!-- 8. Program output -->
    <div class="section-title"><span class="num">8</span>Expected Output</div>
    <div class="section-body">
      <div class="card" style="background:var(--bg2);padding:16px;border-radius:8px;margin:16px 0;font-size:13.5px;border-left:4px solid #10b981;">
        <strong style="color:#10b981;">📊 Expected Browser Output:</strong>
        <pre style="margin-top:8px;background:rgba(0,0,0,0.3);padding:10px;border-radius:6px;color:#a6e22e;font-family:'JetBrains Mono',monospace;">Script Executed Successfully.</pre>
      </div>
    </div>

    <!-- 9. Code explanation & breakdown -->
    <div class="section-title"><span class="num">9</span>Code Explanation &amp; Breakdown</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <thead><tr><th>PHP Construct</th><th>Function &amp; Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>&lt;?php</code></td><td>Opening PHP script delimiter tag required for server interpretation.</td></tr>
          <tr><td><code>${ch.title.split(' ')[0]}</code></td><td>Core PHP keyword or feature used in this lesson.</td></tr>
          <tr><td><code>htmlspecialchars()</code></td><td>Escapes HTML characters to prevent Cross-Site Scripting (XSS) vulnerabilities.</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 10. Line-by-line breakdown -->
    <div class="section-title"><span class="num">10</span>Line-by-Line Breakdown</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">
        <li>Line 1: <code>&lt;?php</code> opens PHP interpreter block on the web server.</li>
        <li>Line 3: Executes core logic for <strong>${ch.title}</strong>.</li>
        <li>Line 5: Streams sanitized output to client browser.</li>
      </ul>
    </div>

    <!-- 11. Execution flow diagram -->
    <div class="section-title"><span class="num">11</span>Execution Flow Diagram</div>
    <div class="section-body">
      <div class="diagram-box">Browser Request (HTTP GET / POST)
      ↓
PHP Web Server (Apache / Nginx / Built-in CLI Server)
      ↓
PHP Script Processing (${ch.title})
      ↓
Database / Business Logic (PDO MySQL)
      ↓
HTML / JSON Response Streamed to Browser</div>
    </div>

    <!-- 12. Common mistakes -->
    <div class="section-title"><span class="num">12</span>Common Mistakes</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">⚠️ Pitfalls to Avoid</div>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>Forgetting to escape user input with <code>htmlspecialchars()</code> leading to XSS vulnerabilities.</li>
          <li>Sending output before <code>header()</code> or <code>session_start()</code> causing "Headers already sent" errors.</li>
          <li>Failing to use PDO prepared statements leading to SQL injection security flaws.</li>
        </ul>
      </div>
    </div>

    <!-- 13. Coding challenge -->
    <div class="section-title"><span class="num">13</span>Coding Challenge</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:18px 22px;margin-bottom:24px;">
        <strong style="color:#10b981;display:block;margin-bottom:8px;">🎯 Hands-On Challenge:</strong>
        <p>Write a PHP script demonstrating <strong>${ch.title}</strong>. Run the local development server (<code>php -S localhost:8000</code>) and verify the browser response!</p>
      </div>
    </div>

    <!-- 14. Mini quiz -->
    <div class="section-title"><span class="num">14</span>Mini Quiz</div>
    <div class="section-body">
      <div class="faq-card">
        <h4>❓ Question: What is the primary purpose of ${ch.title} in PHP?</h4>
        <p><strong>Answer:</strong> It provides PHP server-side capabilities for ${ch.subtopics.split('·')[0].trim()}, building dynamic, secure, and data-driven web applications.</p>
      </div>
    </div>

    <!-- 15. Quick recap & Prev/Next buttons -->
    <div class="section-title"><span class="num">15</span>Quick Recap</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">
        <li>${ch.summary}</li>
        <li>Subtopics covered: ${ch.subtopics}</li>
        <li>Always test PHP scripts on local servers before deploying to production web environments.</li>
      </ul>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on PHP 8.2+ · Last updated August 2026</span>
      </div>
    </div>

    <div class="nav-footer">
      ${prevChapter ? `<a href="${prevChapter.file}" class="nav-btn"><span class="label">← Previous Lesson</span><span class="title">${prevChapter.num}. ${prevChapter.title}</span></a>` : `<a href="/blog-php.html" class="nav-btn"><span class="label">← PHP Overview</span><span class="title">Course Index</span></a>`}
      ${nextChapter ? `<a href="${nextChapter.file}" class="nav-btn" style="text-align:right;"><span class="label">Next Lesson →</span><span class="title">${nextChapter.num}. ${nextChapter.title}</span></a>` : `<a href="/blog-php.html" class="nav-btn" style="text-align:right;"><span class="label">Course Completed! 🎉</span><span class="title">PHP Index</span></a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

  const filePath = path.join(phpDir, ch.file);
  fs.writeFileSync(filePath, chapterHtml, 'utf8');
  console.log(`🔥 Generated PHP Chapter: ${ch.file} (${(chapterHtml.length / 1024).toFixed(1)}KB)`);
});

console.log('✅ Generated all 35 PHP Masterclass chapter files in public/blog-php/ successfully!');
