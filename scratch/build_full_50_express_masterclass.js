const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const expressDir = path.join(publicDir, 'blog-express');

if (!fs.existsSync(expressDir)) {
  fs.mkdirSync(expressDir, { recursive: true });
}

// 1. Create public/blog-express/style.css matching Express Gold/Green Theme (#f7df1e / #83cd29)
const expressCssStyleContent = `/* Specialized styling enhancements for Express.js tutorial lessons & Accordion — Express Gold/Green Theme */
:root {
  --express-theme: #f7df1e;
  --express-accent: #83cd29;
  --express-accent-hover: #e5c100;
  --express-theme-bg: rgba(247, 223, 30, 0.12);
  --express-theme-border: rgba(247, 223, 30, 0.3);
}

body.lang-express {
  --accent: #f7df1e;
  --accent-glow: rgba(247, 223, 30, 0.2);
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
  background: rgba(247, 223, 30, 0.08) !important;
  border: 1px solid rgba(247, 223, 30, 0.25) !important;
  border-radius: 99px !important;
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
  color: #83cd29 !important;
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
  background: linear-gradient(135deg, rgba(247, 223, 30, 0.15) 0%, rgba(20, 24, 32, 0.6) 100%);
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
  color: #83cd29;
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
  color: #83cd29;
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
  color: #000000 !important;
  background: #f7df1e !important;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(247, 223, 30, 0.35);
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
  color: #83cd29;
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
  color: #000000;
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
  color: #83cd29;
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
  color: #000000;
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
  border-color: #e5c100;
  box-shadow: 0 6px 18px rgba(247, 223, 30, 0.12);
}

body.light-theme .phase-roadmap-header {
  border-bottom-color: #f1f5f9;
}

body.light-theme .phase-roadmap-icon {
  background: #fefce8;
  border-color: #fef08a;
}

body.light-theme .phase-roadmap-tag {
  color: #ca8a04;
}

body.light-theme .phase-roadmap-title {
  color: #0f172a;
}

body.light-theme .phase-roadmap-badge {
  background: #f1f5f9;
  border-color: #e2e8f0;
  color: #475569;
}

body.light-theme .curriculum-lesson-row {
  background: #f8fafc;
  border-color: #e2e8f0;
}

body.light-theme .curriculum-lesson-row:hover {
  background: #fefce8;
  border-color: #fde047;
}

body.light-theme .lesson-idx {
  background: #fef08a;
  color: #854d0e;
}

body.light-theme .lesson-title {
  color: #0f172a;
}

body.light-theme .lesson-subtopics {
  color: #64748b;
}

body.light-theme .lesson-btn {
  background: #fef08a;
  border-color: #fde047;
  color: #854d0e;
}

body.light-theme .curriculum-lesson-row:hover .lesson-btn {
  background: #e5c100;
  color: #000000;
}

body.light-theme .sidebar-home-link {
  background: #fefce8 !important;
  border-color: #fef08a !important;
  color: #a16207 !important;
}

body.light-theme .sidebar-home-link.active {
  background: #fef08a !important;
  border-color: #e5c100 !important;
  color: #854d0e !important;
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
  border: 1.5px solid #e5c100 !important;
  color: #0f172a !important;
  box-shadow: 0 2px 10px rgba(247, 223, 30, 0.15) !important;
}
body.light-theme .phase-icon-box {
  background: #f1f5f9;
  border-color: #e2e8f0;
}
body.light-theme .accordion-header.active .phase-icon-box {
  background: #fef08a !important;
  border-color: #fde047 !important;
}
body.light-theme .phase-tag {
  color: #64748b;
}
body.light-theme .accordion-header.active .phase-tag {
  color: #a16207 !important;
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
  background: #fef08a !important;
  color: #854d0e !important;
  border-color: #fde047 !important;
}
body.light-theme .accordion-chevron {
  color: #94a3b8;
}
body.light-theme .accordion-header.active .accordion-chevron {
  color: #a16207 !important;
}
body.light-theme .accordion-content a {
  color: #475569;
}
body.light-theme .accordion-content a:hover {
  color: #0f172a;
  background: #f1f5f9;
}
body.light-theme .accordion-content a.active {
  background: #e5c100 !important;
  color: #000000 !important;
  border-radius: 8px !important;
  font-weight: 800 !important;
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
  background: linear-gradient(135deg, #f7df1e, #e5c100);
  color: #000000 !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 800;
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
  color: #83cd29;
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
  background: linear-gradient(135deg, #f7df1e, #e5c100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(247, 223, 30, 0.3);
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
  color: #854d0e;
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
  color: #854d0e !important;
}
body.light-theme .faq-card p {
  color: #334155;
}
`;

fs.writeFileSync(path.join(expressDir, 'style.css'), expressCssStyleContent, 'utf8');

// Load helper generator for 50 detailed chapters
const { generateExpressChapterHtml, expressPhases, allExpressChapters } = require('./enrich_express_50_master.js');

console.log(`🚀 Generating ${allExpressChapters.length} Express.js Masterclass Chapters with deep content...`);

// Generate Master Index (public/blog-express.html)
function getExpressSidebarHTML(activeNum) {
  let sidebarAccHTML = '';
  expressPhases.forEach(phase => {
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
        ${phase.chapters.map(c => `<a href="/blog-express/${c.file}" class="${c.num === activeNum ? 'active' : ''}">${c.num}. ${c.title}</a>`).join('')}
      </div>`;
  });
  return sidebarAccHTML;
}

const masterIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Express.js Complete Masterclass — 50 Chapters, 10 Phases (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master Express.js web framework from beginner to advanced: Routing, Middleware pipeline, Request parsing, Validation, Error handling, MongoDB Mongoose, PostgreSQL Prisma, JWT authentication, WebSockets, Docker, and PM2 deployment." />
  <meta name="keywords" content="express js tutorial, learn express js, node js express, express rest api, express middleware, express router, express mongoose, express jwt" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-express.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-express/style.css" />
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
<body class="lang-express">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-express.html" class="active">Express.js</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-springboot.html">Spring Boot</a>
  <a href="/blog-mysql.html">MySQL</a>
  <a href="/blog-postgresql.html">PostgreSQL</a>
  <a href="/blog-mongodb.html">MongoDB</a>
  <a href="/blog-redis.html">Redis</a>
  <a href="/blog-rest-api.html">REST API</a>
  <a href="/blog-graphql.html">GraphQL</a>
  <a href="/blog-django.html">Django</a>
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">Express.js Roadmap</div>
    <a href="/blog-express.html" class="sidebar-home-link active">🚀 Express.js HOME</a>
    <div class="sidebar-accordion">
      ${getExpressSidebarHTML(0)}
    </div>
    <div class="sidebar-heading">Navigation</div>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">Express.js Roadmap</span>
    </div>

    <h1 class="page-title">Express.js Programming Masterclass (50 Chapters, 10 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🚀 Express 5.0+</span>
      <span class="badge">🟢 50 Complete Chapters</span>
      <span class="badge">📂 10 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">Node.js vs Express.js · express.Router · req.params &amp; req.query · req.body Parsing · Multer File Uploads · Middleware Pipeline · CORS, Helmet &amp; Morgan · express-rate-limit · Express Validator &amp; Zod · Error Handling Middleware (4 arguments) · Custom Error Classes · MongoDB Mongoose ODM · PostgreSQL Prisma ORM · JWT Authentication &amp; Cookies · Role-Based Authorization Guards · Socket.IO Real-Time · Redis Caching &amp; BullMQ · Swagger UI OpenAPI 3 · Jest &amp; Supertest · Docker &amp; PM2 Clustering · Top 50 Interview Q&amp;A</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's Express.js Complete Master Course</strong>. Express.js is the fast, unopinionated, minimalist web framework for Node.js powering millions of modern web applications, microservices, and high-throughput REST APIs. From initial server setup, modular express.Router, and custom middleware pipelines to database integration, JWT security, WebSockets, Docker containerization, and senior interview prep, this 50-chapter course covers every essential topic in depth with topic-specific examples, diagrams, and coding challenges.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(247,223,30,0.12),rgba(20,24,32,0.6));border:1px solid rgba(247,223,30,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#f7df1e;margin-bottom:10px;font-size:18px;">🎯 Ready to Master Express.js Backend Engineering?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Choose where to start: explore core routing, middleware architecture, database integration, JWT authentication, or interview prep:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-express/01-express-introduction.html" style="background:linear-gradient(135deg,#f7df1e,#e5c100);color:#000000;font-weight:800;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: Express Intro →</a>
        <a href="/blog-express/06-basic-routes.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 2: Core Routing →</a>
        <a href="/blog-express/16-middleware-fundamentals.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 4: Middleware →</a>
        <a href="/blog-express/26-connecting-mongodb-mongoose.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 6: Databases →</a>
        <a href="/blog-express/33-jwt-authentication-refresh-tokens.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 7: Security &amp; JWT →</a>
        <a href="/blog-express/50-express-interview-preparation.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 10: Interview Prep →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">
      ${expressPhases.map(phase => `
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
              <a href="/blog-express/${ch.file}" class="curriculum-lesson-row">
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
        <span>Express.js Complete Masterclass · 50 Chapters · 10 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-express/01-express-introduction.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. Express.js Architecture &amp; Fundamentals</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-express.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-express.html master index page successfully!');

// Generate all 50 Chapter HTML Files inside public/blog-express/
allExpressChapters.forEach((ch, idx) => {
  const prevChapter = idx > 0 ? allExpressChapters[idx - 1] : null;
  const nextChapter = idx < allExpressChapters.length - 1 ? allExpressChapters[idx + 1] : null;

  const chapterHtml = generateExpressChapterHtml(ch, prevChapter, nextChapter, getExpressSidebarHTML(ch.num));

  const filePath = path.join(expressDir, ch.file);
  fs.writeFileSync(filePath, chapterHtml, 'utf8');
  console.log(`🔥 Generated Express.js Chapter ${ch.num}/50: ${ch.file} (${(chapterHtml.length / 1024).toFixed(1)}KB)`);
});

console.log('✅ Generated ALL 50 Express.js Masterclass chapters with rich, unique, topic-specific content!');
