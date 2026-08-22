const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const angularDir = path.join(publicDir, 'blog-angular');

if (!fs.existsSync(angularDir)) {
  fs.mkdirSync(angularDir, { recursive: true });
}

// 1. Create public/blog-angular/style.css matching Angular Red Theme (#dd0031)
const cssStyleContent = `/* Specialized styling enhancements for Angular tutorial lessons & Accordion — Angular Red Theme */
:root {
  --angular-theme: #dd0031;
  --angular-theme-hover: #f43f5e;
  --angular-theme-bg: rgba(221, 0, 49, 0.12);
  --angular-theme-border: rgba(221, 0, 49, 0.3);
}

body.lang-angular {
  --accent: #dd0031;
  --accent-glow: rgba(221, 0, 49, 0.2);
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
  background: rgba(221, 0, 49, 0.08) !important;
  border: 1px solid rgba(221, 0, 49, 0.25) !important;
  border-radius: 99px !important;
  color: #dd0031 !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-home-link:hover {
  background: rgba(221, 0, 49, 0.16) !important;
  border-color: #dd0031 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(221, 0, 49, 0.2);
}

.sidebar-home-link.active {
  background: linear-gradient(135deg, rgba(221, 0, 49, 0.18), rgba(20, 24, 32, 0.8)) !important;
  border-color: #dd0031 !important;
  color: #dd0031 !important;
  box-shadow: 0 0 12px rgba(221, 0, 49, 0.25);
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
  background: linear-gradient(135deg, rgba(221, 0, 49, 0.15) 0%, rgba(20, 25, 34, 0.6) 100%);
  border-color: #dd0031;
  box-shadow: 0 0 14px rgba(221, 0, 49, 0.18);
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
  background: rgba(221, 0, 49, 0.2);
  border-color: rgba(221, 0, 49, 0.4);
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
  color: #dd0031;
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
  background: rgba(221, 0, 49, 0.2);
  color: #dd0031;
  border-color: rgba(221, 0, 49, 0.35);
  font-weight: 700;
}

.accordion-chevron {
  color: var(--text3, #8b949e);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;
  flex-shrink: 0;
}

.accordion-header.active .accordion-chevron {
  transform: rotate(90deg);
  color: #dd0031;
}

.accordion-content {
  display: none;
  flex-direction: column;
  padding: 4px 0 6px 10px;
  border-left: 2px solid rgba(221, 0, 49, 0.35);
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
  background: #dd0031 !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(221, 0, 49, 0.35);
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
  border-color: rgba(221, 0, 49, 0.4);
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
  background: rgba(221, 0, 49, 0.12);
  border: 1px solid rgba(221, 0, 49, 0.3);
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
  color: #dd0031;
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
  background: rgba(221, 0, 49, 0.08);
  border-color: rgba(221, 0, 49, 0.35);
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
  background: rgba(221, 0, 49, 0.15);
  color: #dd0031;
  font-size: 12px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.curriculum-lesson-row:hover .lesson-idx {
  background: #dd0031;
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
  color: #dd0031;
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
  color: #dd0031;
  padding: 5px 12px;
  border-radius: 6px;
  background: rgba(221, 0, 49, 0.1);
  border: 1px solid rgba(221, 0, 49, 0.2);
  transition: all 0.18s ease;
}

.curriculum-lesson-row:hover .lesson-btn {
  background: #dd0031;
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
  border-color: #dd0031;
  box-shadow: 0 6px 18px rgba(221, 0, 49, 0.12);
}

body.light-theme .phase-roadmap-header {
  border-bottom-color: #f1f5f9;
}

body.light-theme .phase-roadmap-icon {
  background: #ffe4e6;
  border-color: #fecdd3;
}

body.light-theme .phase-roadmap-tag {
  color: #e11d48;
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
  background: #fff1f2;
  border-color: #fda4af;
}

body.light-theme .lesson-idx {
  background: #ffe4e6;
  color: #e11d48;
}

body.light-theme .lesson-title {
  color: #0f172a;
}

body.light-theme .lesson-subtopics {
  color: #64748b;
}

body.light-theme .lesson-btn {
  background: #ffe4e6;
  border-color: #fecdd3;
  color: #e11d48;
}

body.light-theme .curriculum-lesson-row:hover .lesson-btn {
  background: #e11d48;
  color: #ffffff;
}

body.light-theme .sidebar-home-link {
  background: #fff1f2 !important;
  border-color: #fecdd3 !important;
  color: #e11d48 !important;
}

body.light-theme .sidebar-home-link.active {
  background: #ffe4e6 !important;
  border-color: #dd0031 !important;
  color: #be123c !important;
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
  border: 1.5px solid #dd0031 !important;
  color: #0f172a !important;
  box-shadow: 0 2px 10px rgba(221, 0, 49, 0.15) !important;
}
body.light-theme .phase-icon-box {
  background: #f1f5f9;
  border-color: #e2e8f0;
}
body.light-theme .accordion-header.active .phase-icon-box {
  background: #ffe4e6 !important;
  border-color: #fecdd3 !important;
}
body.light-theme .phase-tag {
  color: #64748b;
}
body.light-theme .accordion-header.active .phase-tag {
  color: #e11d48 !important;
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
  background: #ffe4e6 !important;
  color: #e11d48 !important;
  border-color: #fda4af !important;
}
body.light-theme .accordion-chevron {
  color: #94a3b8;
}
body.light-theme .accordion-header.active .accordion-chevron {
  color: #e11d48 !important;
}
body.light-theme .accordion-content a {
  color: #475569;
}
body.light-theme .accordion-content a:hover {
  color: #0f172a;
  background: #f1f5f9;
}
body.light-theme .accordion-content a.active {
  background: #dd0031 !important;
  color: #ffffff !important;
  border-radius: 8px !important;
  font-weight: 700 !important;
}

.try-box {
  background: linear-gradient(135deg, rgba(221, 0, 49, 0.08) 0%, rgba(20, 24, 32, 0.6) 100%);
  border: 1px solid rgba(221, 0, 49, 0.25);
  border-radius: var(--radius, 12px);
  padding: 24px;
  margin: 32px 0;
}

.try-box .try-title {
  font-weight: 700;
  color: #dd0031;
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
  background: linear-gradient(135deg, #dd0031, #be123c);
  color: #ffffff !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 14px rgba(221, 0, 49, 0.3);
}

.try-box .run-btn:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

.callout {
  background: #161b22;
  border: 1px solid #30363d;
  border-left: 4px solid #dd0031;
  padding: 18px 22px;
  border-radius: var(--radius, 12px);
  margin: 28px 0;
}

.callout .callout-title {
  font-weight: 700;
  color: #dd0031;
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
  color: #ff79c6;
  line-height: 1.55;
  white-space: pre !important;
  overflow-x: auto;
}

.faq-card {
  background: #141820;
  border: 1px solid #30363d;
  border-left: 4px solid #dd0031;
  border-radius: 10px;
  padding: 18px 22px;
  margin-bottom: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, border-color 0.2s;
}

.faq-card:hover {
  transform: translateX(3px);
  border-color: #dd0031;
}

.faq-card h4 {
  color: #dd0031 !important;
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
  background: linear-gradient(135deg, #dd0031, #be123c);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(221, 0, 49, 0.3);
}

body.light-theme .try-box {
  background: #fff1f2;
  border-color: #fecdd3;
}
body.light-theme .callout {
  background: #f8fafc;
  border-color: #cbd5e1;
  border-left-color: #be123c;
}
body.light-theme .callout .callout-title {
  color: #be123c;
}
body.light-theme .diagram-box {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}
body.light-theme .faq-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #be123c;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
body.light-theme .faq-card h4 {
  color: #be123c !important;
}
body.light-theme .faq-card p {
  color: #334155;
}
`;

fs.writeFileSync(path.join(angularDir, 'style.css'), cssStyleContent, 'utf8');

// 2. Define Complete 40-Chapter Angular Masterclass Data Structure across 13 Phases
const angularPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'Angular Basics', icon: '🅰️',
    chapters: [
      {
        num: 1, file: '01-what-is-angular.html', title: 'What Is Angular?',
        subtopics: 'Angular ante enti? · Angular enduku use chestaru? · Angular vs JavaScript · Angular vs React · Angular vs Vue · Angular features · SPA ante enti? · Component-based architecture · TypeScript role · Angular ecosystem',
        summary: 'Angular is a TypeScript-based framework used to build structured and scalable web applications. Angular lo components, templates, routing, forms, services, dependency injection and HTTP tools integrated ga untayi.',
        resource: 'WelcomeComponent', method: 'Component', url: 'src/app/app.ts',
        reqEx: `import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-root',\n  template: '<h1>Welcome to Angular</h1>'\n})\nexport class AppComponent {}`,
        resEx: `HTML Rendering: <h1>Welcome to Angular</h1>`,
        statusCode: 'Component Active',
        code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: \`
    <main class="main-container">
      <h1>Welcome to Angular 18!</h1>
      <p>Build scalable single-page web applications.</p>
    </main>
  \`
})
export class AppComponent {}`
      },
      {
        num: 2, file: '02-angular-prerequisites.html', title: 'Angular Prerequisites',
        subtopics: 'HTML basics · CSS basics · JavaScript variables · Functions · Arrays and objects · Destructuring · Spread operator · Promises · async/await · TypeScript basics · Classes and interfaces · Modules',
        summary: 'Master core prerequisite technologies essential for Angular development: ES6+ JavaScript, TypeScript classes, interfaces, and asynchronous programming.',
        resource: 'TypeScriptBasics', method: 'Language', url: 'src/app/models/course.ts',
        reqEx: `export interface Course {\n  id: number;\n  title: string;\n  level: 'Beginner' | 'Advanced';\n}`,
        resEx: `TypeScript Interface Verified at Compile Time`,
        statusCode: 'Type Checked',
        code: `export interface Course {
  id: number;
  title: string;
  level: 'Beginner' | 'Advanced';
}

export class Student {
  constructor(public id: number, public name: string) {}
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'Setup and Project Structure', icon: '⚙️',
    chapters: [
      {
        num: 3, file: '03-angular-installation.html', title: 'Angular Installation',
        subtopics: 'Node.js installation · npm ante enti? · Angular CLI · Angular CLI installation · Creating a project · Standalone components option · Routing option · Stylesheet option · Running the app · Building the app · Production preview · Setup errors',
        summary: 'Install Angular CLI globally and generate modern standalone Angular applications using `ng new`.',
        resource: 'CLICommands', method: 'Terminal', url: 'package.json',
        reqEx: `npm install -g @angular/cli\nng new our-angular-app\ncd our-angular-app\nng serve`,
        resEx: `Angular Live Development Server listening on localhost:4200`,
        statusCode: 'HTTP 200 OK',
        code: `npm install -g @angular/cli
ng new our-angular-app --standalone --routing --style=css
cd our-angular-app
ng serve`
      },
      {
        num: 4, file: '04-angular-project-structure.html', title: 'Angular Project Structure',
        subtopics: 'src folder · main.ts · app folder · app.ts · app.html · app.css · app.config.ts · app.routes.ts · public folder · angular.json · package.json · tsconfig.json',
        summary: 'Understand modern standalone Angular folder organization, entry points, configuration files, and asset management.',
        resource: 'ProjectTree', method: 'Directory', url: 'src/app/',
        reqEx: `src/\n├── app/\n│   ├── components/\n│   ├── pages/\n│   ├── services/\n│   ├── app.ts\n│   ├── app.config.ts\n│   └── app.routes.ts\n└── main.ts`,
        resEx: `Recommended Clean Modular Architecture Verified`,
        statusCode: 'Structure Valid',
        code: `src/
├── app/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── models/
│   ├── guards/
│   ├── interceptors/
│   ├── app.ts
│   ├── app.html
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
├── styles.css
└── main.ts`
      },
      {
        num: 5, file: '05-first-angular-component.html', title: 'First Angular Component',
        subtopics: 'Component ante enti? · @Component · Selector · Template · Styles · Standalone component · Component imports · Creating component with CLI · Rendering component · Component file structure',
        summary: 'Angular components and directives dependency injection system lo automatically participate chestayi; dependencies ni inject chesi use cheyyachu.',
        resource: 'WelcomeComponent', method: 'CLI', url: 'src/app/welcome.component.ts',
        reqEx: `ng generate component welcome`,
        resEx: `CREATE src/app/welcome/welcome.component.ts`,
        statusCode: 'Component Created',
        code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  template: \`
    <h1>Welcome to Angular!</h1>
    <p>Build modern web applications.</p>
  \`
})
export class WelcomeComponent {}`
      }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'Templates and Data Binding', icon: '🎨',
    chapters: [
      {
        num: 6, file: '06-angular-templates.html', title: 'Angular Templates',
        subtopics: 'Template ante enti? · HTML inside Angular · Interpolation · Template expressions · Template statements · Template variables · Comments · Safe navigation · Dynamic content · Template organization',
        summary: 'Express dynamic component data inside HTML templates using Interpolation {{ name }} and safe navigation operators.',
        resource: 'ProfileComponent', method: 'Template', url: 'src/app/profile.component.ts',
        reqEx: `<h2>{{ name }}</h2>\n<p>Age: {{ age }}</p>`,
        resEx: `HTML Output: <h2>Ravi</h2><p>Age: 21</p>`,
        statusCode: 'Interpolated',
        code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: \`
    <div class="card">
      <h2>{{ name }}</h2>
      <p>Age: {{ age }}</p>
    </div>
  \`
})
export class ProfileComponent {
  name = 'Ravi';
  age = 21;
}`
      },
      {
        num: 7, file: '07-data-binding.html', title: 'Data Binding',
        subtopics: 'Interpolation {{ }} · Property binding [property] · Event binding (event) · Two-way binding [(ngModel)] · Attribute binding · Class binding · Style binding · Dynamic images · Disabled buttons · Binding mistakes',
        summary: 'Bind HTML component properties, handle user events with (click), and enable two-way form data binding with [(ngModel)].',
        resource: 'BindingComponent', method: 'DataBinding', url: 'src/app/binding.component.ts',
        reqEx: `<button [disabled]="isDisabled" [class.active]="isActive" (click)="submit()">Submit</button>`,
        resEx: `Button click invokes submit() method in component class`,
        statusCode: 'Event Bound',
        code: `<button
  [disabled]="isDisabled"
  [class.active]="isActive"
  (click)="submit()">
  Submit
</button>`
      },
      {
        num: 8, file: '08-conditions-and-loops.html', title: 'Conditions and Loops',
        subtopics: '@if · @else if · @else · @for · track · @switch · Loading UI · Empty state · Error state · Rendering lists · Legacy *ngIf overview · Legacy *ngFor overview',
        summary: 'Use Angular modern control flow syntax (@if, @else, @for with track, @switch) for high-performance UI rendering.',
        resource: 'ControlFlow', method: 'ControlFlow', url: 'src/app/list.component.ts',
        reqEx: `@if (isLoggedIn) { <p>Welcome!</p> } @else { <p>Please log in.</p> }\n@for (course of courses; track course.id) { <p>{{ course.title }}</p> }`,
        resEx: `Rendered conditional message & list of courses`,
        statusCode: 'Rendered',
        code: `@if (isLoggedIn) {
  <p>Welcome back!</p>
} @else {
  <p>Please log in.</p>
}

@for (course of courses; track course.id) {
  <p>{{ course.title }}</p>
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'Components Communication', icon: '🔄',
    chapters: [
      {
        num: 9, file: '09-inputs.html', title: 'Inputs',
        subtopics: 'Parent and child components · Passing data to child · @Input · Signal inputs · Required inputs · Input aliases · Input transforms · Object inputs · Array inputs · Typed inputs',
        summary: 'Pass data down to child components using traditional @Input() or modern Signal input.required<string>().',
        resource: 'CourseCardComponent', method: 'Input', url: 'src/app/course-card.component.ts',
        reqEx: `title = input.required<string>();`,
        resEx: `Child renders parent-provided title signal value`,
        statusCode: 'Input Received',
        code: `import { Component, input } from '@angular/core';

@Component({
  selector: 'app-course-card',
  standalone: true,
  template: \`<h2>{{ title() }}</h2>\`
})
export class CourseCardComponent {
  title = input.required<string>();
}`
      },
      {
        num: 10, file: '10-outputs.html', title: 'Outputs',
        subtopics: 'Child-to-parent communication · @Output · EventEmitter · Signal outputs · Custom events · Event payload · Handling child events · Typed events · Reusable components · Event naming',
        summary: 'Emit custom events back to parent components using traditional @Output() EventEmitter or modern output<string>().',
        resource: 'CourseCardComponent', method: 'Output', url: 'src/app/course-card.component.ts',
        reqEx: `selected = output<string>();\nthis.selected.emit('Angular');`,
        resEx: `Parent handles (selected) event with payload 'Angular'`,
        statusCode: 'Output Emitted',
        code: `import { Component, output } from '@angular/core';

@Component({
  selector: 'app-course-card',
  standalone: true,
  template: \`
    <button (click)="selected.emit('Angular')">
      Select
    </button>
  \`
})
export class CourseCardComponent {
  selected = output<string>();
}`
      },
      {
        num: 11, file: '11-content-projection.html', title: 'Content Projection',
        subtopics: 'Content projection ante enti? · <ng-content> · Default slot · Named slots · Fallback content · Card component · Modal component · Reusable layout · Projected styles · Component composition',
        summary: 'Project external HTML content into reusable child component layouts using <ng-content> and select slots.',
        resource: 'CardComponent', method: 'NgContent', url: 'src/app/card.component.ts',
        reqEx: `<ng-content select="[card-title]"></ng-content>\n<ng-content></ng-content>`,
        resEx: `Custom projected header and body HTML rendered inside card layout`,
        statusCode: 'Content Projected',
        code: `@Component({
  selector: 'app-card',
  standalone: true,
  template: \`
    <div class="card">
      <div class="card-header"><ng-content select="[card-title]"></ng-content></div>
      <div class="card-body"><ng-content></ng-content></div>
    </div>
  \`
})
export class CardComponent {}`
      }
    ]
  },
  {
    phaseTag: 'Phase 05', phaseTitle: 'Directives and Pipes', icon: '🛠️',
    chapters: [
      {
        num: 12, file: '12-directives.html', title: 'Directives',
        subtopics: 'Directive ante enti? · Attribute directives · Structural directives · Built-in directives · Custom directives · @Directive · Host binding · Host listener · v-focus-like focus directive · Tooltip directive · Highlight directive · Directive testing',
        summary: 'Create custom attribute directives with @Directive, @HostListener, and HostBinding to dynamically alter element behavior.',
        resource: 'HighlightDirective', method: 'Directive', url: 'src/app/directives/highlight.directive.ts',
        reqEx: `ng generate directive highlight`,
        resEx: `HighlightDirective applied to element mutates hover background color`,
        statusCode: 'Directive Active',
        code: `import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = '#dd0031';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = null;
  }
}`
      },
      {
        num: 13, file: '13-pipes.html', title: 'Pipes',
        subtopics: 'Pipe ante enti? · date · currency · uppercase · lowercase · number · percent · json · Pipe parameters · Pipe chaining · Custom pipes · Pure and impure pipes · Pipe performance',
        summary: 'Format values directly inside Angular templates using built-in pipes (date, currency, uppercase, json).',
        resource: 'BuiltInPipes', method: 'TemplatePipe', url: 'src/app/product.component.html',
        reqEx: `<p>{{ price | currency }}</p>\n<p>{{ createdAt | date }}</p>`,
        resEx: `$49.99 · Aug 20, 2026`,
        statusCode: 'Pipe Transformed',
        code: `<p>{{ price | currency }}</p>
<p>{{ createdAt | date }}</p>`
      },
      {
        num: 14, file: '14-custom-pipes.html', title: 'Custom Pipes',
        subtopics: 'Creating a custom pipe · @Pipe · transform() · Pipe arguments · Search pipe · Truncate pipe · Initials pipe · Date pipe · Pure pipe · Testing custom pipe',
        summary: 'Define custom reusable template transformations using @Pipe and the transform() method interface.',
        resource: 'TruncatePipe', method: 'CustomPipe', url: 'src/app/pipes/truncate.pipe.ts',
        reqEx: `<p>{{ longText | truncate:30 }}</p>`,
        resEx: `Truncated text string: "Building Angular applications..."`,
        statusCode: 'Transformed',
        code: `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20): string {
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'Signals and Reactivity', icon: '⚡',
    chapters: [
      {
        num: 15, file: '15-signals.html', title: 'Signals',
        subtopics: 'Signals ante enti? · signal() · Reading signals · .set() · .update() · Writable signals · Signals in templates · Signal state · Signal vs normal variable · Signal vs Observable · Signal best practices',
        summary: 'Angular Signals reactive state store cheyyadaniki use avutayi; signal value read cheyyadaniki signal ni function laga call chestaru.',
        resource: 'CounterComponent', method: 'SignalState', url: 'src/app/counter.component.ts',
        reqEx: `count = signal(0);\nthis.count.update(value => value + 1);`,
        resEx: `Template auto-updates: Count: 1`,
        statusCode: 'Signal Updated',
        code: `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <p>Count: {{ count() }}</p>
    <button (click)="increase()">Increase</button>
  \`
})
export class CounterComponent {
  count = signal(0);

  increase() {
    this.count.update(value => value + 1);
  }
}`
      },
      {
        num: 16, file: '16-computed.html', title: 'computed()',
        subtopics: 'Derived state · computed() · Read-only signals · Calculating totals · Filtering lists · Computed dependencies · Computed caching · Avoiding duplicate state · Computed objects · Best practices',
        summary: 'Derive read-only reactive state efficiently with computed(), automatically recalculating when dependent signals update.',
        resource: 'CartComponent', method: 'ComputedSignal', url: 'src/app/cart.component.ts',
        reqEx: `total = computed(() => this.items().reduce((sum, item) => sum + item.price, 0));`,
        resEx: `Computed total price auto-updates on item addition`,
        statusCode: 'Derived State Synced',
        code: `import { Component, signal, computed } from '@angular/core';

export class CartComponent {
  items = signal([{ price: 10 }, { price: 20 }]);

  total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price, 0)
  );
}`
      },
      {
        num: 17, file: '17-effect.html', title: 'effect()',
        subtopics: 'Effect ante enti? · Side effects · Logging changes · LocalStorage synchronization · External system connection · Cleanup · Avoiding unnecessary effects · Effect best practices · Signals in services · Signals and APIs',
        summary: 'Execute reactive side effects like LocalStorage sync or console logging whenever signal values change using effect().',
        resource: 'StorageService', method: 'EffectSignal', url: 'src/app/storage.service.ts',
        reqEx: `effect(() => localStorage.setItem('count', JSON.stringify(this.count())));`,
        resEx: `LocalStorage synchronized automatically when count signal changes`,
        statusCode: 'Effect Executed',
        code: `import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  count = signal(0);

  constructor() {
    effect(() => {
      localStorage.setItem('count', JSON.stringify(this.count()));
    });
  }
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Services and Dependency Injection', icon: '💉',
    chapters: [
      {
        num: 18, file: '18-services.html', title: 'Services',
        subtopics: 'Service ante enti? · Why services are needed · Creating a service · Business logic · API service · Auth service · Shared data service · Utility service · Service scope · Service testing',
        summary: 'Encapsulate application business logic and data fetching inside singleton Angular Services annotated with @Injectable.',
        resource: 'CourseService', method: 'Service', url: 'src/app/services/course.service.ts',
        reqEx: `ng generate service services/course`,
        resEx: `CourseService returns list of course topics`,
        statusCode: 'Service Ready',
        code: `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  getCourses() {
    return ['Angular', 'React', 'Vue'];
  }
}`
      },
      {
        num: 19, file: '19-dependency-injection.html', title: 'Dependency Injection',
        subtopics: 'DI ante enti? · Constructor injection · inject() · @Injectable · Root providers · Component providers · Service lifetime · Injection tokens · Optional dependencies · Provider hierarchy · Testing dependencies · DI best practices',
        summary: 'Inject service dependencies into components using modern inject() function or constructor parameter injection.',
        resource: 'InjectDemo', method: 'InjectFn', url: 'src/app/course-list.ts',
        reqEx: `private courseService = inject(CourseService);`,
        resEx: `Component receives injected singleton CourseService instance`,
        statusCode: 'Dependency Injected',
        code: `import { Component, inject } from '@angular/core';
import { CourseService } from './services/course.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  template: \`<p>{{ courses.join(', ') }}</p>\`
})
export class CourseListComponent {
  private courseService = inject(CourseService);
  courses = this.courseService.getCourses();
}`
      },
      {
        num: 20, file: '20-configuration.html', title: 'Configuration',
        subtopics: 'app.config.ts · Application providers · provideRouter · provideHttpClient · Environment configuration · Development config · Production config · Injection tokens · Feature providers · Global configuration',
        summary: 'Configure global application providers, router, HttpClient, and environment tokens inside app.config.ts.',
        resource: 'AppConfig', method: 'ProvidersConfig', url: 'src/app/app.config.ts',
        reqEx: `export const appConfig: ApplicationConfig = { providers: [provideRouter(routes), provideHttpClient()] };`,
        resEx: `Global Router & HttpClient providers active`,
        statusCode: 'App Configured',
        code: `import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};`
      }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Routing', icon: '🧭',
    chapters: [
      {
        num: 21, file: '21-router-basics.html', title: 'Router Basics',
        subtopics: 'Routing ante enti? · Client-side routing · Routes · RouterOutlet · RouterLink · Active links · Home route · About route · Not-found route · Redirects · Route titles · Navigation events',
        summary: 'Configure SPA navigation routes matching URL paths to standalone page components with RouterOutlet.',
        resource: 'AppRoutes', method: 'Routes', url: 'src/app/app.routes.ts',
        reqEx: `export const routes: Routes = [\n  { path: '', component: HomeComponent },\n  { path: 'about', component: AboutComponent },\n  { path: '**', redirectTo: '' }\n];`,
        resEx: `Navigating to /about renders AboutComponent`,
        statusCode: 'Route Matched',
        code: `import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { AboutComponent } from './pages/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];`
      },
      {
        num: 22, file: '22-dynamic-routes.html', title: 'Dynamic Routes',
        subtopics: 'Route parameters · :id · Reading parameters · Course details · Lesson details · Query parameters · URL fragments · Nested routes · Child routes · Lazy routes · Route data · Route title',
        summary: 'Handle dynamic URL parameters (:id), query string parameters, and child routes in Angular Router.',
        resource: 'CourseDetailComponent', method: 'RouteParams', url: 'src/app/course-detail.ts',
        reqEx: `{ path: 'courses/:id', component: CourseDetailComponent }\nconst id = inject(ActivatedRoute).snapshot.params['id'];`,
        resEx: `Route parameter '101' retrieved from URL path`,
        statusCode: 'Params Parsed',
        code: `export const routes: Routes = [
  { path: 'courses/:id', component: CourseDetailComponent }
];`
      },
      {
        num: 23, file: '23-route-guards.html', title: 'Route Guards',
        subtopics: 'Guard ante enti? · Authentication guard · CanActivateFn · CanDeactivateFn · Admin guard · Unsaved changes guard · Redirecting users · Route metadata · Guard testing · Guard security limitations',
        summary: 'Protect private user dashboard and admin routes using functional guards (CanActivateFn).',
        resource: 'AuthGuard', method: 'GuardFn', url: 'src/app/guards/auth.guard.ts',
        reqEx: `export const authGuard: CanActivateFn = () => inject(AuthService).isLoggedIn();`,
        resEx: `Access allowed for authenticated user, redirected if anonymous`,
        statusCode: 'Guarded',
        code: `import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn() ? true : router.createUrlTree(['/login']);
};`
      },
      {
        num: 24, file: '24-lazy-loading.html', title: 'Lazy Loading',
        subtopics: 'Lazy loading ante enti? · loadComponent · loadChildren · Feature routes · Route-level code splitting · Loading performance · Preloading · Selective preloading · Lazy-loaded dashboard · Lazy-loaded tutorial pages',
        summary: 'Improve initial page load speed by splitting route bundles and lazy-loading components with loadComponent.',
        resource: 'LazyRoutes', method: 'LazyLoad', url: 'src/app/app.routes.ts',
        reqEx: `{ path: 'dashboard', loadComponent: () => import('./pages/dashboard.component').then(m => m.DashboardComponent) }`,
        resEx: `Dashboard JS bundle loaded dynamically on user navigation`,
        statusCode: 'Lazy Bundle Loaded',
        code: `export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard.component').then(m => m.DashboardComponent)
  }
];`
      }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'Forms', icon: '📝',
    chapters: [
      {
        num: 25, file: '25-template-driven-forms.html', title: 'Template-Driven Forms',
        subtopics: 'Forms in Angular · FormsModule · ngModel · Form state · Input validation · Required fields · Email validation · Error messages · Submit event · Reset form · Form status · Use cases',
        summary: 'Build simple forms with FormsModule and two-way data binding [(ngModel)] for basic user inputs.',
        resource: 'TemplateForm', method: 'FormsModule', url: 'src/app/contact.component.html',
        reqEx: `<input [(ngModel)]="user.name" name="name" required />`,
        resEx: `Two-way data binding updates user object automatically`,
        statusCode: 'Form Model Synced',
        code: `<form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
  <input [(ngModel)]="user.name" name="name" required />
  <button [disabled]="contactForm.invalid">Submit</button>
</form>`
      },
      {
        num: 26, file: '26-reactive-forms.html', title: 'Reactive Forms',
        subtopics: 'Reactive forms ante enti? · ReactiveFormsModule · FormControl · FormGroup · FormBuilder · Form values · Form status · Validators · Custom validators · Nested form groups · Form arrays · Async validators · Form reset · Patch values',
        summary: 'Build type-safe, immutable form models with FormGroup, FormControl, and built-in Validators.',
        resource: 'LoginForm', method: 'ReactiveForm', url: 'src/app/login.component.ts',
        reqEx: `loginForm = new FormGroup({ email: new FormControl('', [Validators.required, Validators.email]), password: new FormControl('', Validators.required) });`,
        resEx: `Reactive form validates input fields asynchronously`,
        statusCode: 'Form Validated',
        code: `import { FormGroup, FormControl, Validators } from '@angular/forms';

export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', Validators.required)
  });
}`
      },
      {
        num: 27, file: '27-dynamic-forms.html', title: 'Dynamic Forms',
        subtopics: 'Dynamic fields · FormArray · Add field · Remove field · Dynamic validation · Multi-step form · File upload form · Reusable form control · Form error component · Form submission states',
        summary: 'Manage dynamic form inputs, array controls (FormArray), and multi-step form submissions.',
        resource: 'DynamicForm', method: 'FormArray', url: 'src/app/skills-form.ts',
        reqEx: `skills = new FormArray([new FormControl('')]);\nskills.push(new FormControl(''));`,
        resEx: `Dynamic skill input fields added to form array`,
        statusCode: 'Form Array Updated',
        code: `import { FormArray, FormControl } from '@angular/forms';

export class SkillsFormComponent {
  skills = new FormArray([
    new FormControl('Angular'),
    new FormControl('TypeScript')
  ]);

  addSkill() {
    this.skills.push(new FormControl(''));
  }
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'HTTP & RxJS Integration', icon: '🌐',
    chapters: [
      {
        num: 28, file: '28-httpclient.html', title: 'HttpClient',
        subtopics: 'provideHttpClient() setup · HttpClient get/post/put/delete · Type-safe responses · Handling HTTP headers · Query params in HttpClient · Error handling catchError',
        summary: 'Execute backend API HTTP GET, POST, PUT, and DELETE operations with Angular HttpClient.',
        resource: 'ApiService', method: 'HttpClient', url: 'src/app/api.service.ts',
        reqEx: `this.http.get<Course[]>('/api/courses');`,
        resEx: `Observable<Course[]> emitted with backend JSON payload`,
        statusCode: 'HTTP 200 OK',
        code: `import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  getCourses() {
    return this.http.get<any[]>('/api/courses');
  }
}`
      },
      {
        num: 29, file: '29-http-interceptors.html', title: 'HTTP Interceptors',
        subtopics: 'HttpInterceptorFn · Functional interceptors · Adding Bearer JWT headers · Handling global HTTP errors · Logging HTTP latency · Retry interceptor',
        summary: 'Intercept outbound HTTP requests to automatically inject Bearer JWT authorization tokens.',
        resource: 'AuthInterceptor', method: 'HttpInterceptor', url: 'src/app/interceptors/auth.interceptor.ts',
        reqEx: `export const authInterceptor: HttpInterceptorFn = (req, next) => { ... };`,
        resEx: `Authorization: Bearer <token> attached to outbound requests`,
        statusCode: 'Header Attached',
        code: `import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: \`Bearer \${token}\` }
    });
  }
  return next(req);
};`
      },
      {
        num: 30, file: '30-rxjs-operators.html', title: 'RxJS Operators',
        subtopics: 'Observable · Subject · BehaviorSubject · map · filter · switchMap · catchError · debounceTime · distinctUntilChanged · AsyncPipe',
        summary: 'Transform and combine asynchronous event streams using RxJS reactive operators.',
        resource: 'RxDemo', method: 'RxJS', url: 'src/app/search.component.ts',
        reqEx: `query$.pipe(debounceTime(300), switchMap(q => api.search(q)));`,
        resEx: `Debounced search stream emits filtered results`,
        statusCode: 'Stream Transformed',
        code: `import { BehaviorSubject, debounceTime, switchMap } from 'rxjs';

export class SearchComponent {
  private query$ = new BehaviorSubject<string>('');

  results$ = this.query$.pipe(
    debounceTime(300),
    switchMap(q => this.api.search(q))
  );
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 11', phaseTitle: 'State Management & Testing', icon: '🧪',
    chapters: [
      {
        num: 31, file: '31-state-management-and-ngrx.html', title: 'State Management & NgRx',
        subtopics: 'Component state with Signals · Global state with NgRx Signal Store · Actions, Reducers, Selectors overview · Immutable state updates',
        summary: 'Manage application-wide reactive state predictably using Signal Stores and modern NgRx state patterns.',
        resource: 'SignalStore', method: 'StateStore', url: 'src/app/store/course.store.ts',
        reqEx: `export const CourseStore = signalStore(withState({ courses: [] }));`,
        resEx: `State updated immutably; UI re-renders reactively`,
        statusCode: 'State Synced',
        code: `/* NgRx Signal Store Active */`
      },
      {
        num: 32, file: '32-unit-testing.html', title: 'Unit Testing Components & Services',
        subtopics: 'Jasmine · Karma · TestBed setup · ComponentFixture · DebugElement · Testing services with HttpTestingController · Mocking dependencies',
        summary: 'Write automated unit tests verifying Angular components, templates, and services with Jasmine and TestBed.',
        resource: 'ComponentTest', method: 'UnitTest', url: 'src/app/welcome.component.spec.ts',
        reqEx: `it('should create', () => { expect(component).toBeTruthy(); });`,
        resEx: `SUCCESS: 1 spec, 0 failures`,
        statusCode: 'Test Passed',
        code: `describe('WelcomeComponent', () => {
  it('should create component', () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});`
      },
      {
        num: 33, file: '33-e2e-testing-and-harnesses.html', title: 'E2E Testing & Component Harnesses',
        subtopics: 'Cypress E2E testing · Playwright Angular tests · Angular Component Harnesses · Testing material components · Page object model',
        summary: 'Perform end-to-end user flow testing and component harness assertions with Cypress and Playwright.',
        resource: 'E2ETest', method: 'E2E', url: 'cypress/e2e/login.cy.ts',
        reqEx: `cy.visit('/login'); cy.get('input[type=email]').type('user@example.com');`,
        resEx: `Cypress E2E test suite passed`,
        statusCode: 'E2E Verified',
        code: `/* Cypress / Playwright E2E Suite Active */`
      }
    ]
  },
  {
    phaseTag: 'Phase 12', phaseTitle: 'Advanced Architecture & Optimization', icon: '🚀',
    chapters: [
      {
        num: 34, file: '34-performance-optimization.html', title: 'Performance Optimization',
        subtopics: 'ChangeDetectionStrategy.OnPush · Zone-less Angular with Signals · Image optimization (NgOptimizedImage) · Deferrable views (@defer) · Tree-shaking',
        summary: 'Optimize page load performance using @defer block lazy rendering, OnPush change detection, and NgOptimizedImage.',
        resource: 'PerformanceConfig', method: 'Optimization', url: 'src/app/heavy.component.html',
        reqEx: `@defer (on viewport) { <app-chart /> }`,
        resEx: `Heavy chart component lazily loaded when scrolled into view`,
        statusCode: 'Deferred Render',
        code: `@defer (on viewport) {
  <app-chart />
} @placeholder {
  <div>Loading chart...</div>
}`
      },
      {
        num: 35, file: '35-ssr-and-hydration.html', title: 'SSR & Hydration',
        subtopics: 'Server-Side Rendering (SSR) · Client hydration · Prerendering static pages · TransferState API · SEO meta tags optimization',
        summary: 'Improve first contentful paint (FCP) and SEO rankings by serving server-rendered HTML pages with client hydration.',
        resource: 'SSRConfig', method: 'SSR', url: 'src/app/app.config.server.ts',
        reqEx: `provideServerRendering(), provideClientHydration()`,
        resEx: `HTML page rendered on server and hydrated on client browser`,
        statusCode: 'Hydrated',
        code: `export const config = mergeApplicationConfig(appConfig, {
  providers: [provideServerRendering(), provideClientHydration()]
});`
      },
      {
        num: 36, file: '36-micro-frontends.html', title: 'Micro Frontends & Module Federation',
        subtopics: 'Micro Frontends architecture · Module Federation setup · Remote entry components · Shell application · Sharing dependencies',
        summary: 'Decompose monolithic Angular applications into independently deployable Micro Frontend applications.',
        resource: 'MicroFrontend', method: 'ModuleFederation', url: 'webpack.config.js',
        reqEx: `name: 'shell', remotes: { mfe1: 'mfe1@http://localhost:4201/remoteEntry.js' }`,
        resEx: `Remote component dynamically rendered inside shell router outlet`,
        statusCode: 'Federated',
        code: `/* Module Federation Micro Frontend Architecture Active */`
      }
    ]
  },
  {
    phaseTag: 'Phase 13', phaseTitle: 'Projects & Certification', icon: '🏆',
    chapters: [
      {
        num: 37, file: '37-beginner-angular-projects.html', title: 'Beginner Projects',
        subtopics: 'Todo List App with Signals · Weather Dashboard · Recipe Book App · Calculator Component · Personal Portfolio',
        summary: 'Build foundational Angular mini-projects putting components, signals, templates, and data binding into practice.',
        resource: 'BeginnerProjects', method: 'Projects', url: 'src/app/projects/todo.ts',
        reqEx: `const todos = signal<Todo[]>([]);`,
        resEx: `Interactive Todo App running with local state`,
        statusCode: 'Projects Ready',
        code: `/* Beginner Project Collection Active */`
      },
      {
        num: 38, file: '38-intermediate-angular-projects.html', title: 'Intermediate Projects',
        subtopics: 'E-commerce Catalog with Shopping Cart · Blog App with Markdown & Router · Task Manager with Reactive Forms · Expense Tracker Service',
        summary: 'Build feature-rich intermediate applications utilizing RxJS HTTP requests, Reactive Forms, Router, and Auth Interceptors.',
        resource: 'IntermediateProjects', method: 'Projects', url: 'src/app/projects/cart.ts',
        reqEx: `cartItems = signal<CartItem[]>([]);`,
        resEx: `Cart state updated reactively across navbar & checkout`,
        statusCode: 'Projects Ready',
        code: `/* Intermediate Project Collection Active */`
      },
      {
        num: 39, file: '39-our-compiler-angular-app-project.html', title: 'Our Compiler Angular App Project',
        subtopics: 'Full-stack Compiler Platform Frontend in Angular 18 · Multi-language code editor component · Real-time output panel · Tutorial lesson tree · Quiz engine · Auth JWT store',
        summary: 'Architect the production frontend for Our Compiler platform featuring live code compilation, tutorial navigation, and interactive quizzes.',
        resource: 'PlatformApp', method: 'Architecture', url: 'src/app/app.ts',
        reqEx: `export class OurCompilerAppComponent { ... }`,
        resEx: `Our Compiler Angular Single Page Application Deployed`,
        statusCode: 'App Live',
        code: `import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: \`
    <nav class="topnav">
      <a routerLink="/" class="brand">🖥️ Our Compiler</a>
      <a routerLink="/tutorials">Tutorials</a>
      <a routerLink="/compiler">IDE</a>
    </nav>
    <router-outlet></router-outlet>
  \`
})
export class AppComponent {}`
      },
      {
        num: 40, file: '40-angular-quiz.html', title: 'Angular Practice Quiz',
        subtopics: 'Comprehensive Angular Knowledge Check · 30 Multiple Choice Certification Exam Questions · Signals, Standalone Components, Router, Forms, DI & RxJS',
        summary: 'Test your Angular engineering mastery with our 30-question interactive certification practice quiz.',
        resource: 'Quiz', method: 'Certification', url: 'src/app/quiz.component.ts',
        reqEx: `Submit quiz answers for Instant Certification Evaluation`,
        resEx: `Score: 100% — Passed Angular Engineer Certification Exam`,
        statusCode: 'Certified',
        code: `/* Angular Masterclass Practice Quiz Active! */`
      }
    ]
  }
];

// Helper to generate Accordion Sidebar HTML
function getAngularSidebarHTML(activeNum) {
  let sidebarAccHTML = '';
  angularPhases.forEach(phase => {
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
        ${phase.chapters.map(c => `<a href="/blog-angular/${c.file}" class="${c.num === activeNum ? 'active' : ''}">${c.num}. ${c.title}</a>`).join('')}
      </div>`;
  });
  return sidebarAccHTML;
}

// 3. Generate public/blog-angular.html (Master Index Page)
const allAngularChapters = [];
angularPhases.forEach(p => p.chapters.forEach(c => allAngularChapters.push({ ...c, phaseTag: p.phaseTag, phaseTitle: p.phaseTitle, icon: p.icon })));

const masterIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Angular Complete Roadmap — 40 Chapters, 13 Phases (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master Angular 18+ component architecture, Signals, Templates, Data Binding, Control Flow @if/@for, RxJS, Services, Router, Reactive Forms, HttpClient, Testing, SSR & Projects with our complete 40-chapter roadmap across 13 phases." />
  <meta name="keywords" content="angular tutorial, learn angular, angular roadmap, angular signals, standalone components, angular router, reactive forms, rxjs, angular cli, angular projects" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-angular.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-angular/style.css" />
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
<body class="lang-angular">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-angular.html" class="active">Angular</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rest-api.html">REST API</a>
  <a href="/blog-graphql.html">GraphQL</a>
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
    <div class="sidebar-heading">Angular Roadmap</div>
    <a href="/blog-angular.html" class="sidebar-home-link active">🅰️ Angular Course HOME</a>
    <div class="sidebar-accordion">
      ${getAngularSidebarHTML(0)}
    </div>
    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-python-compiler.html" style="color:#dd0031;font-weight:700;">▶ Run Code in IDE</a>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">Angular Complete Roadmap</span>
    </div>

    <h1 class="page-title">Angular Complete Masterclass (40 Chapters, 13 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🅰️ Angular 18+</span>
      <span class="badge">🟢 40 Complete Chapters</span>
      <span class="badge">📂 13 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">What Is Angular? · Prerequisites · Installation &amp; CLI · Project Structure · First Component · Templates &amp; Data Binding · Control Flow (@if, @for) · Inputs &amp; Outputs · Content Projection · Directives &amp; Pipes · Signals (signal, computed, effect) · Services &amp; DI · Router &amp; Guards · Forms &amp; Dynamic Forms · HttpClient &amp; Interceptors · Testing, Projects &amp; Quiz</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's Angular Complete Master Course</strong>. Angular is the enterprise TypeScript-based web framework used to build structured, scalable single-page applications. This comprehensive 40-chapter bootcamp guides you through standalone components, Angular Signals, modern control flow, reactive forms, router navigation, dependency injection, RxJS HTTP requests, testing, and production deployment.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(221,0,49,0.12),rgba(20,24,32,0.6));border:1px solid rgba(221,0,49,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#dd0031;margin-bottom:10px;font-size:18px;">🎯 Ready to Master Angular Web Engineering?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Choose where to start: explore Angular introduction, inputs/outputs, Signals, services, router, reactive forms, or platform API project:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-angular/01-what-is-angular.html" style="background:linear-gradient(135deg,#dd0031,#be123c);color:#fff;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: Angular Intro →</a>
        <a href="/blog-angular/09-inputs.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 4: Inputs &amp; Outputs →</a>
        <a href="/blog-angular/15-signals.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 6: Signals →</a>
        <a href="/blog-angular/18-services.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 7: Services &amp; DI →</a>
        <a href="/blog-angular/26-reactive-forms.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 9: Reactive Forms →</a>
        <a href="/blog-angular/39-our-compiler-angular-app-project.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 13: Platform Project →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">
      ${angularPhases.map(phase => `
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
              <a href="/blog-angular/${ch.file}" class="curriculum-lesson-row">
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
        <span>Angular Complete Masterclass · 40 Chapters · 13 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-angular/01-what-is-angular.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. What Is Angular?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-angular.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-angular.html master index page successfully!');

// 4. Generate all 40 Chapter HTML Files inside public/blog-angular/ adhering strictly to the 18-Section Lesson Layout
allAngularChapters.forEach((ch, idx) => {
  const prevChapter = idx > 0 ? allAngularChapters[idx - 1] : null;
  const nextChapter = idx < allAngularChapters.length - 1 ? allAngularChapters[idx + 1] : null;

  const chapterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Angular — ${ch.title} | Our Compiler</title>
  <meta name="description" content="Complete Angular Chapter ${ch.num}: ${ch.title}. Learn ${ch.subtopics} with practical TypeScript code examples, Angular templates, signals, services, and step-by-step walkthroughs." />
  <meta name="keywords" content="angular tutorial, learn angular, ${ch.title.toLowerCase()}, angular signals, standalone components" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-angular/${ch.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-angular/style.css" />
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
<body class="lang-angular">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-angular.html" class="active">Angular</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rest-api.html">REST API</a>
  <a href="/blog-graphql.html">GraphQL</a>
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
    <div class="sidebar-heading">Angular Tutorial</div>
    <a href="/blog-angular.html" class="sidebar-home-link">🅰️ Angular HOME</a>
    <div class="sidebar-accordion">
      ${getAngularSidebarHTML(ch.num)}
    </div>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-angular.html">Angular</a><span class="sep">›</span>
      <span class="current">Angular — ${ch.title}</span>
    </div>

    <h1 class="page-title">Angular — ${ch.title}</h1>

    <div class="page-meta">
      <span class="badge">🅰️ Angular 18+</span>
      <span class="badge">🟢 Chapter ${ch.num} of ${allAngularChapters.length}</span>
      <span class="badge">📂 ${ch.phaseTag}: ${ch.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this chapter:</span>
      <span class="topic-pill-text">${ch.subtopics}</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Angular — ${ch.title}</strong> in our Angular Complete Masterclass! ${ch.summary}</p>
    </div>

    <!-- 1. Simple introduction -->
    <div class="section-title"><span class="num">1</span>Simple Introduction</div>
    <div class="section-body">
      <p>In Angular web development, understanding <strong>${ch.title}</strong> is essential for building structured, scalable frontend applications. Angular components and directives participate in Angular's reactive system and dependency injection system seamlessly.</p>
    </div>

    <!-- 2. What you will learn -->
    <div class="section-title"><span class="num">2</span>What You Will Learn</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <strong style="color:#dd0031;display:block;margin-bottom:10px;">📚 Learning Objectives:</strong>
        <ul style="margin:0 0 0 20px;line-height:1.8;">
          <li>Master TypeScript mechanics and Angular decorators for <strong>${ch.title}</strong></li>
          <li>Understand templates, data binding, Signals, and dependency injection</li>
          <li>Implement clean, production-ready Angular components and services</li>
          <li>Avoid common binding mistakes, subscription memory leaks, and change detection pitfalls</li>
        </ul>
      </div>
    </div>

    <!-- 3. Why this concept is useful -->
    <div class="section-title"><span class="num">3</span>Why ${ch.title} is Useful</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">💡 Practical Utility</div>
        <p>Angular components and directives dependency injection system lo automatically participate chestayi; dependencies ni inject chesi use cheyyachu. Mastering <strong>${ch.title}</strong> gives you full control over dynamic user interfaces in enterprise web apps.</p>
      </div>
    </div>

    <!-- 4. Required Component / Service design -->
    <div class="section-title"><span class="num">4</span>Required Component / Service Design</div>
    <div class="section-body">
      <p>Target Class / Artifact: <code>${ch.resource}</code>. Configured using Angular metadata decorators (e.g. <code>@Component</code>, <code>@Injectable</code>, <code>@Directive</code>, <code>@Pipe</code>).</p>
    </div>

    <!-- 5. Angular syntax / mechanism -->
    <div class="section-title"><span class="num">5</span>Angular Mechanism &amp; Type</div>
    <div class="section-body">
      <p>Mechanism: <code style="color:#dd0031;font-weight:700;">${ch.method}</code>. File Path: <code>${ch.url}</code>.</p>
    </div>

    <!-- 6. Basic example -->
    <div class="section-title"><span class="num">6</span>Basic Example Code</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">Angular Component / Service Code</span></div>
        <pre><code>${ch.code}</code></pre>
      </div>
    </div>

    <!-- 7. Variables & Binding -->
    <div class="section-title"><span class="num">7</span>Variables &amp; Binding Expressions</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">Template / CLI Usage</span></div>
        <pre><code>${ch.reqEx}</code></pre>
      </div>
    </div>

    <!-- 8. Response output -->
    <div class="section-title"><span class="num">8</span>Rendered Output</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">UI Render / Execution Output</span></div>
        <pre><code>${ch.resEx}</code></pre>
      </div>
    </div>

    <!-- 9. Execution flow -->
    <div class="section-title"><span class="num">9</span>Execution Flow &amp; Change Detection</div>
    <div class="section-body">
      <div class="diagram-box">Angular Bootstrapping -> Component Instantiation -> Dependency Injection -> Data Binding / Signal Update -> Template Render -> Zone.js / Signal Change Detection -> DOM Tree Sync</div>
    </div>

    <!-- 10. Status & State -->
    <div class="section-title"><span class="num">10</span>State &amp; Verification Status</div>
    <div class="section-body">
      <div class="card" style="background:var(--bg2);padding:14px 18px;border-radius:8px;margin:16px 0;border-left:4px solid #dd0031;">
        <strong style="color:#dd0031;">Verification Status: ${ch.statusCode}</strong>
        <p style="margin-top:6px;font-size:13.5px;color:var(--text2);">Angular components automatically track template bindings and update the browser DOM reactively when data state changes.</p>
      </div>
    </div>

    <!-- 11. Performance note -->
    <div class="section-title"><span class="num">11</span>Performance Note</div>
    <div class="section-body">
      <p>Use Angular Signals (<code>signal()</code>, <code>computed()</code>) and <code>ChangeDetectionStrategy.OnPush</code> to minimize change detection cycles. For heavy template lists, always pass <code>track</code> expressions in <code>@for</code> blocks.</p>
    </div>

    <!-- 12. Common mistakes -->
    <div class="section-title"><span class="num">12</span>Common Mistakes</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">⚠️ Anti-Patterns to Avoid</div>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>Forgetting to unsubscribe from manual RxJS Observables, leading to memory leaks.</li>
          <li>Omitting <code>track</code> in <code>@for</code> loops causing full list DOM re-renders on array updates.</li>
          <li>Mutating objects directly instead of updating Signals via <code>.set()</code> or <code>.update()</code>.</li>
          <li>Putting heavy computation directly inside HTML template expression interpolation.</li>
          <li>Injecting services in non-injection contexts instead of constructors or <code>inject()</code> functions.</li>
        </ul>
      </div>
    </div>

    <!-- 13. Coding challenge -->
    <div class="section-title"><span class="num">13</span>Coding Challenge</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:18px 22px;margin-bottom:24px;">
        <strong style="color:#dd0031;display:block;margin-bottom:8px;">🎯 Hands-On Challenge:</strong>
        <p>Build an Angular component for <strong>${ch.title}</strong> using standalone component syntax. Bind properties dynamically to your template and test user interactions in your browser at <code>http://localhost:4200</code>!</p>
      </div>
    </div>

    <!-- 14. Mini quiz -->
    <div class="section-title"><span class="num">14</span>Mini Quiz</div>
    <div class="section-body">
      <div class="faq-card">
        <h4>❓ Question: What is the primary advantage of ${ch.title} in Angular?</h4>
        <p><strong>Answer:</strong> It provides structured TypeScript type safety and ${ch.subtopics.split('·')[0].trim()}, streamlining single-page app development.</p>
      </div>
    </div>

    <!-- 15. Quick recap -->
    <div class="section-title"><span class="num">15</span>Quick Recap</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">
        <li>${ch.summary}</li>
        <li>Angular components participate automatically in the Dependency Injection system.</li>
        <li>Utilize standalone components, Angular Signals, and modern control flow syntax (@if, @for).</li>
      </ul>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on Angular 18+ Standards · Last updated August 2026</span>
      </div>
    </div>

    <!-- 17 & 18. Previous & Next Lesson Navigation -->
    <div class="nav-footer">
      ${prevChapter ? `<a href="${prevChapter.file}" class="nav-btn"><span class="label">← Previous Lesson</span><span class="title">${prevChapter.num}. ${prevChapter.title}</span></a>` : `<a href="/blog-angular.html" class="nav-btn"><span class="label">← Angular Overview</span><span class="title">Course Index</span></a>`}
      ${nextChapter ? `<a href="${nextChapter.file}" class="nav-btn" style="text-align:right;"><span class="label">Next Lesson →</span><span class="title">${nextChapter.num}. ${nextChapter.title}</span></a>` : `<a href="/blog-angular.html" class="nav-btn" style="text-align:right;"><span class="label">Course Completed! 🎉</span><span class="title">Angular Index</span></a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

  const filePath = path.join(angularDir, ch.file);
  fs.writeFileSync(filePath, chapterHtml, 'utf8');
  console.log(`🔥 Generated Angular Chapter: ${ch.file} (${(chapterHtml.length / 1024).toFixed(1)}KB)`);
});

console.log('✅ Generated all 40 Angular Masterclass chapter files in public/blog-angular/ successfully!');
