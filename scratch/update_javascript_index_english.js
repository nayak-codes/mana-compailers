const fs = require('fs');
const path = require('path');

const jsIndexPath = path.join(__dirname, '..', 'public', 'blog-javascript.html');
let html = fs.readFileSync(jsIndexPath, 'utf8');

console.log('=== UPDATING JAVASCRIPT INDEX TO ENGLISH ===');

// 1. Title & Meta
html = html.replace(
  /<title>.*?<\/title>/,
  '<title>JavaScript Programming Master Course (25 Chapters Complete Roadmap) | Our Compiler</title>'
);

html = html.replace(
  /<meta name="description" content=".*?" \/>/,
  '<meta name="description" content="JavaScript Programming Master Course: 25 comprehensive chapters covering JavaScript fundamentals, control flow, functions, DOM manipulation, events, ES6+, Promises, and async/await with an interactive online compiler." />'
);

// 2. Sidebar Headings & Links
html = html.replace(
  '<div class="sidebar-heading">JavaScript Master Course (తెలుగు)</div>',
  '<div class="sidebar-heading">JavaScript Master Course</div>'
);

html = html.replace(
  '<a href="/blog-javascript.html" class="sidebar-home-link active">⚡ JavaScript Course HOME (ఇండెక్స్)</a>',
  '<a href="/blog-javascript.html" class="sidebar-home-link active">⚡ JavaScript Course HOME (Index)</a>'
);

html = html.replace(
  /<span class="phase-title">జావాస్క్రిప్ట్ బేసిక్స్<\/span>/g,
  '<span class="phase-title">JavaScript Basics</span>'
);

html = html.replace(
  /<span class="phase-title">కంట్రోల్ ఫ్లో & లూప్స్<\/span>/g,
  '<span class="phase-title">Control Flow & Loops</span>'
);

html = html.replace(
  /<span class="phase-title">ఫంక్షన్స్ & డేటా స్ట్రక్చర్స్<\/span>/g,
  '<span class="phase-title">Functions & Data Structures</span>'
);

html = html.replace(
  /<span class="phase-title">DOM మానిప్యులేషన్ & ఈవెంట్స్<\/span>/g,
  '<span class="phase-title">DOM & Events</span>'
);

html = html.replace(
  /<span class="phase-title">మోడరన్ ES6\+ & అసింక్ JS<\/span>/g,
  '<span class="phase-title">Modern & Advanced JS</span>'
);

// Sidebar Lesson 1 name
html = html.replace(
  />1\. JavaScript ante enti\?<\/a>/g,
  '>1. What is JavaScript? (Intro & Overview)</a>'
);

// 3. Breadcrumb & Page Title
html = html.replace(
  /<span class="current">JavaScript ప్రోగ్రామింగ్ \(తెలుగులో\)<\/span>/,
  '<span class="current">JavaScript Programming Master Course</span>'
);

html = html.replace(
  /<h1 class="page-title">.*?<\/h1>/,
  '<h1 class="page-title">JavaScript Programming Master Course (25 Chapters Complete Roadmap)</h1>'
);

// 4. Meta Badges
html = html.replace(
  /<span class="badge">🟢 25 సమగ్ర అధ్యాయాలు<\/span>/,
  '<span class="badge">🟢 25 Comprehensive Chapters</span>'
);

html = html.replace(
  /<span class="badge">📂 5 ప్రధాన విభాగాలు<\/span>/,
  '<span class="badge">📂 5 Core Modules</span>'
);

html = html.replace(
  /<span class="badge">📅 2026 ఎడిషన్<\/span>/,
  '<span class="badge">📅 2026 Academic Edition</span>'
);

// 5. Intro Box
const englishIntroBox = `<div class="intro-box">
      <p>Welcome to the <strong>Our Compiler JavaScript Master Course</strong>. JavaScript is the heartbeat of modern web development — powering dynamic interactive interfaces, high-performance Node.js backend services, and scalable full-stack web applications. This comprehensive 25-chapter curriculum is designed for both beginners and experienced developers, taking you step-by-step from core language fundamentals, variables, and data structures to DOM manipulation, event-driven programming, and modern ES6+ asynchronous workflows (<code>Promises</code>, <code>async/await</code>) with runnable interactive code snippets.</p>
    </div>`;

html = html.replace(/<div class="intro-box">[\s\S]*?<\/div>/, englishIntroBox);

// 6. Quick Start Card
html = html.replace(
  '<h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 ఎక్కడి నుండి ప్రారంభించాలి?</h3>',
  '<h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Where to Start? (Quick Navigation)</h3>'
);

html = html.replace(
  '<p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">మీకు నచ్చిన విభాగాన్ని నేరుగా ఎంచుకుని నేర్చుకోవడం ప్రారంభించండి:</p>',
  '<p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Jump directly to any module or follow the 25-chapter linear learning path:</p>'
);

// 7. Curriculum Section Title
html = html.replace(
  '<div class="section-title"><span class="num">📚</span> JavaScript Master Course Curriculum (25 సమగ్ర అధ్యాయాలు)</div>',
  '<div class="section-title"><span class="num">📚</span> JavaScript Master Course Curriculum (25 Comprehensive Chapters)</div>'
);

// 8. Phase Roadmap Cards
// Part 01
html = html.replace(
  /<h3 class="phase-roadmap-title">జావాస్క్రిప్ట్ బేసిక్స్<\/h3>/g,
  '<h3 class="phase-roadmap-title">JavaScript Fundamentals & Basics</h3>'
);

html = html.replace(
  /<p class="phase-roadmap-desc">జావాస్క్రిప్ట్ పరిచయం, బ్రౌజర్ ఎన్విరాన్‌మెంట్, వేరియబుల్స్.*?<\/p>/,
  '<p class="phase-roadmap-desc">Introduction to JavaScript, browser execution engines (V8), variable declarations (var, let, const), primitive & reference data types, operators, type casting, template literals, and input/output handling.</p>'
);

html = html.replace(
  /<span class="lesson-title">1\. JavaScript ante enti\?<\/span>/g,
  '<span class="lesson-title">1. What is JavaScript? (Origins & Architecture)</span>'
);

html = html.replace(
  /<span class="lesson-subtopics">Intro · Ekkada use avtundi · Browser role · First program<\/span>/g,
  '<span class="lesson-subtopics">Origins · Brendan Eich · V8 Engine Pipeline · Browser vs Node.js · First Hello World</span>'
);

// Part 02
html = html.replace(
  /<h3 class="phase-roadmap-title">కంట్రోల్ ఫ్లో & లూప్స్<\/h3>/g,
  '<h3 class="phase-roadmap-title">Control Flow & Iteration</h3>'
);

html = html.replace(
  /<p class="phase-roadmap-desc">డెసిషన్ మేకింగ్.*?<\/p>/,
  '<p class="phase-roadmap-desc">Master branching logic and iteration constructs: if/else decision trees, ternary operators, switch expressions, for/while/do-while loops, and loop control flow.</p>'
);

// Part 03
html = html.replace(
  /<h3 class="phase-roadmap-title">ఫంక్షన్స్ & డేటా స్ట్రక్చర్స్<\/h3>/g,
  '<h3 class="phase-roadmap-title">Functions & Data Structures</h3>'
);

html = html.replace(
  /<p class="phase-roadmap-desc">ఫంక్షన్స్ డిక్లరేషన్.*?<\/p>/,
  '<p class="phase-roadmap-desc">Write clean, modular code with functional abstractions and rich data structures: arrow functions, higher-order array methods, object modeling, string manipulation, and Date/Math APIs.</p>'
);

// Part 04
html = html.replace(
  /<h3 class="phase-roadmap-title">DOM మానిప్యులేషన్ & ఈవెంట్స్<\/h3>/g,
  '<h3 class="phase-roadmap-title">DOM Manipulation & Event-Driven Programming</h3>'
);

html = html.replace(
  /<p class="phase-roadmap-desc">DOM పరిచయం.*?<\/p>/,
  '<p class="phase-roadmap-desc">Bridge JavaScript with HTML/CSS to build interactive web experiences: DOM tree traversals, style & class updates, user event listeners, form validation, and an interactive To-Do project.</p>'
);

// Part 05
html = html.replace(
  /<h3 class="phase-roadmap-title">మోడరన్ ES6\+ & అసింక్ JS<\/h3>/g,
  '<h3 class="phase-roadmap-title">Modern & Advanced JavaScript (ES6+)</h3>'
);

html = html.replace(
  /<p class="phase-roadmap-desc">స్కోప్, హోయిస్టింగ్.*?<\/p>/,
  '<p class="phase-roadmap-desc">Master professional JavaScript runtime concepts: lexical scope, closures, modern ES6+ destructuring & spread syntax, asynchronous Promises, async/await, REST API fetching, and persistent storage.</p>'
);

// Card Badges: X అధ్యాయాలు -> X In-Depth Chapters
html = html.replace(
  /<span class="phase-roadmap-badge">(\d+) అధ్యాయాలు<\/span>/g,
  '<span class="phase-roadmap-badge">$1 In-Depth Chapters</span>'
);

fs.writeFileSync(jsIndexPath, html, 'utf8');
console.log('✅ public/blog-javascript.html successfully updated to English!');

// Also update sidebar across all public/blog-javascript/*.html
const jsDir = path.join(__dirname, '..', 'public', 'blog-javascript');
const lessonFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.html'));

let updatedLessons = 0;
lessonFiles.forEach(file => {
  const filePath = path.join(jsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (content.includes('1. JavaScript ante enti?')) {
    content = content.replace(/1\. JavaScript ante enti\?/g, '1. What is JavaScript?');
    changed = true;
  }
  if (content.includes('జావాస్క్రిప్ట్ బేసిక్స్')) {
    content = content.replace(/జావాస్క్రిప్ట్ బేసిక్స్/g, 'JavaScript Basics');
    changed = true;
  }
  if (content.includes('కంట్రోల్ ఫ్లో & లూప్స్')) {
    content = content.replace(/కంట్రోల్ ఫ్లో & లూప్స్/g, 'Control Flow & Loops');
    changed = true;
  }
  if (content.includes('ఫంక్షన్స్ & డేటా స్ట్రక్చర్స్')) {
    content = content.replace(/ఫంక్షన్స్ & డేటా స్ట్రక్చర్స్/g, 'Functions & Data Structures');
    changed = true;
  }
  if (content.includes('DOM మానిప్యులేషన్ & ఈవెంట్స్')) {
    content = content.replace(/DOM మానిప్యులేషన్ & ఈవెంట్స్/g, 'DOM & Events');
    changed = true;
  }
  if (content.includes('మోడరన్ ES6+ & అసింక్ JS')) {
    content = content.replace(/మోడరన్ ES6\+ & అసింక్ JS/g, 'Modern & Advanced JS');
    changed = true;
  }
  if (content.includes('JavaScript Master Course (తెలుగు)')) {
    content = content.replace(/JavaScript Master Course \(తెలుగు\)/g, 'JavaScript Master Course');
    changed = true;
  }
  if (content.includes('⚡ JavaScript Course HOME (ఇండెక్స్)')) {
    content = content.replace(/⚡ JavaScript Course HOME \(ఇండెక్స్\)/g, '⚡ JavaScript Course HOME (Index)');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedLessons++;
  }
});

console.log(`✅ Updated sidebars in ${updatedLessons} lesson files in public/blog-javascript/!`);
