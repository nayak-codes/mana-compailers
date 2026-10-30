const fs = require('fs');
const path = require('path');

const jsHomePath = path.join(__dirname, '..', 'public', 'blog-javascript.html');
let html = fs.readFileSync(jsHomePath, 'utf8');

// Update document title & meta
html = html.replace(
  /<title>.*?<\/title>/,
  '<title>JavaScript Programming Master Course తెలుగులో (25 Chapters Complete Roadmap) | Our Compiler</title>'
);
html = html.replace(
  /<meta name="description" content=".*?" \/>/,
  '<meta name="description" content="JavaScript Programming Master Course తెలుగులో. 25 అధ్యాయాల సమగ్ర రోడ్‌మ్యాప్, బేసిక్స్ నుండి DOM, Promises, async/await వరకు పూర్తి తెలుగు గైడ్." />'
);

// Update sidebar heading & home link
html = html.replace(
  '<div class="sidebar-heading">JavaScript Master Course</div>',
  '<div class="sidebar-heading">JavaScript Master Course (తెలుగు)</div>'
);
html = html.replace(
  /<a href="\/blog-javascript\.html" class="sidebar-home-link active">.*?<\/a>/,
  '<a href="/blog-javascript.html" class="sidebar-home-link active">⚡ JavaScript Course HOME (ఇండెక్స్)</a>'
);

// Update sidebar part titles
html = html.replace(
  /<span class="phase-title">Basics<\/span>/g,
  '<span class="phase-title">జావాస్క్రిప్ట్ బేసిక్స్</span>'
);
html = html.replace(
  /<span class="phase-title">Control Flow<\/span>/g,
  '<span class="phase-title">కంట్రోల్ ఫ్లో & లూప్స్</span>'
);
html = html.replace(
  /<span class="phase-title">Functions & Data<\/span>/g,
  '<span class="phase-title">ఫంక్షన్స్ & డేటా స్ట్రక్చర్స్</span>'
);
html = html.replace(
  /<span class="phase-title">DOM & Events<\/span>/g,
  '<span class="phase-title">DOM మానిప్యులేషన్ & ఈవెంట్స్</span>'
);
html = html.replace(
  /<span class="phase-title">Modern & Advanced<\/span>/g,
  '<span class="phase-title">మోడరన్ ES6+ & అసింక్ JS</span>'
);

// Update breadcrumb & page title
html = html.replace(
  '<span class="current">JavaScript Masterclass</span>',
  '<span class="current">JavaScript ప్రోగ్రామింగ్ (తెలుగులో)</span>'
);
html = html.replace(
  '<h1 class="page-title">JavaScript Programming Master Tutorial</h1>',
  '<h1 class="page-title">JavaScript Programming Master Course తెలుగులో (25 Chapters Complete Roadmap)</h1>'
);

// Update page meta badges
html = html.replace(
  '<span class="badge">🟨 JavaScript (ES2026+)</span>',
  '<span class="badge">⚡ Modern JavaScript (ES2026+)</span>'
);
html = html.replace(
  '<span class="badge">🟢 25 Complete Chapters</span>',
  '<span class="badge">🟢 25 సమగ్ర అధ్యాయాలు</span>'
);
html = html.replace(
  '<span class="badge">📂 5 Core Curriculum Parts</span>',
  '<span class="badge">📂 5 ప్రధాన విభాగాలు</span>'
);
html = html.replace(
  '<span class="badge">📅 2026 Edition</span>',
  '<span class="badge">📅 2026 ఎడిషన్</span>'
);

// Update Intro box
const oldIntroBoxRegex = /<div class="intro-box">[\s\S]*?<\/div>/;
const newIntroBox = `<div class="intro-box">
      <p>Our Compiler <strong>జావాస్క్రిప్ట్ మాస్టర్ కోర్సుకు</strong> స్వాగతం. వెబ్ డెవలప్‌మెంట్‌కు ప్రాణమైన జావాస్క్రిప్ట్ (JS) ద్వారా డైనమిక్ ఇంటరాక్టివ్ వెబ్‌సైట్లు, Node.js బ్యాకెండ్‌లు మరియు ఆధునిక ఫ్రంటెండ్ అప్లికేషన్లను సులభమైన తెలుగు వివరణలతో నేర్చుకోండి. ఈ 25 అధ్యాయాల సమగ్ర రోడ్‌మ్యాప్‌లో బేసిక్స్ నుండి DOM మానిప్యులేషన్, ఈవెంట్స్ మరియు ఆధునిక ES6+ ఫీచర్ల వరకు రన్నబుల్ కోడ్ స్నిప్పెట్లతో ప్రాక్టీస్ చేయవచ్చు.</p>
    </div>`;
html = html.replace(oldIntroBoxRegex, newIntroBox);

// Update Quick Start card
html = html.replace(
  '<h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Choose Where to Start</h3>',
  '<h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 ఎక్కడి నుండి ప్రారంభించాలి?</h3>'
);
html = html.replace(
  '<p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Jump directly to any section of the JavaScript curriculum:</p>',
  '<p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">మీకు నచ్చిన విభాగాన్ని నేరుగా ఎంచుకుని నేర్చుకోవడం ప్రారంభించండి:</p>'
);

// Update roadmap section title
html = html.replace(
  '<div class="section-title"><span class="num">📚</span> Master Course Curriculum Roadmap (25 Chapters)</div>',
  '<div class="section-title"><span class="num">📚</span> JavaScript Master Course Curriculum (25 సమగ్ర అధ్యాయాలు)</div>'
);

// Update phase roadmap titles & descriptions
html = html.replace(
  /<h3 class="phase-roadmap-title">Basics<\/h3>/g,
  '<h3 class="phase-roadmap-title">జావాస్క్రిప్ట్ బేసిక్స్</h3>'
);
html = html.replace(
  /<p class="phase-roadmap-desc">JavaScript introduction, browser environment, setup, variables.*?<\/p>/,
  '<p class="phase-roadmap-desc">జావాస్క్రిప్ట్ పరిచయం, బ్రౌజర్ ఎన్విరాన్‌మెంట్, వేరియబుల్స్ (let, const, var), డేటా టైప్స్, ఆపరేటర్లు, టైప్ కన్వర్షన్ మరియు ఇన్పుట్/అవుట్‌పుట్.</p>'
);

html = html.replace(
  /<h3 class="phase-roadmap-title">Control Flow<\/h3>/g,
  '<h3 class="phase-roadmap-title">కంట్రోల్ ఫ్లో & లూప్స్</h3>'
);
html = html.replace(
  /<p class="phase-roadmap-desc">Decision making \(if, else, switch\), loops.*?<\/p>/,
  '<p class="phase-roadmap-desc">డెసిషన్ మేకింగ్ (if, else if, else, switch), లూప్స్ (for, while, do-while), మరియు break/continue కంట్రోల్ స్టేట్‌మెంట్స్.</p>'
);

html = html.replace(
  /<h3 class="phase-roadmap-title">Functions & Data<\/h3>/g,
  '<h3 class="phase-roadmap-title">ఫంక్షన్స్ & డేటా స్ట్రక్చర్స్</h3>'
);
html = html.replace(
  /<p class="phase-roadmap-desc">Function declarations, arrow functions, arrays.*?<\/p>/,
  '<p class="phase-roadmap-desc">ఫంక్షన్స్ డిక్లరేషన్, ఆరో ఫంక్షన్స్ (=>), అరేలు & అరే మెథడ్స్, ఆబ్జెక్ట్స్, JSON, స్ట్రింగ్స్ మరియు Math & Date యుటిలిటీస్.</p>'
);

html = html.replace(
  /<h3 class="phase-roadmap-title">DOM & Events<\/h3>/g,
  '<h3 class="phase-roadmap-title">DOM మానిప్యులేషన్ & ఈవెంట్స్</h3>'
);
html = html.replace(
  /<p class="phase-roadmap-desc">DOM introduction, selecting elements, modifying.*?<\/p>/,
  '<p class="phase-roadmap-desc">DOM పరిచయం, ఎలిమెంట్ సెలెక్షన్, కంటెంట్ మార్పులు, ఈవెంట్ లిజనర్స్, ఈవెంట్ బబ్లింగ్, మరియు ఇంటరాక్టివ్ బ్రౌజర్ ప్రాజెక్ట్స్.</p>'
);

html = html.replace(
  /<h3 class="phase-roadmap-title">Modern & Advanced<\/h3>/g,
  '<h3 class="phase-roadmap-title">మోడరన్ ES6+ & అసింక్ JS</h3>'
);
html = html.replace(
  /<p class="phase-roadmap-desc">Scope, closures, destructuring, spread, async\/await.*?<\/p>/,
  '<p class="phase-roadmap-desc">స్కోప్, హోయిస్టింగ్, క్లోజర్స్, డీస్ట్రక్చరింగ్, స్ప్రెడ్ ఆపరేటర్, అసింక్రోనస్ JS (Promises, async/await, Fetch API) మరియు ఎర్రర్ హ్యాండ్లింగ్.</p>'
);

// Update badge labels in cards
html = html.replace(
  /<span class="phase-roadmap-badge">(\d+) In-Depth Lessons<\/span>/g,
  '<span class="phase-roadmap-badge">$1 అధ్యాయాలు</span>'
);

fs.writeFileSync(jsHomePath, html, 'utf8');
console.log('✅ public/blog-javascript.html translated to Telugu and styled in green!');

