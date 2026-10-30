const fs = require('fs');
const path = require('path');

const htmlHomePath = path.join(__dirname, '..', 'public', 'blog-html.html');
let html = fs.readFileSync(htmlHomePath, 'utf8');

// Title & Meta
html = html.replace(
  /<title>.*?<\/title>/,
  '<title>HTML5 Programming Master Course తెలుగులో (37 Chapters Complete Roadmap) | Our Compiler</title>'
);
html = html.replace(
  /<meta name="description" content=".*?" \/>/,
  '<meta name="description" content="HTML5 Programming Master Course తెలుగులో. 37 సమగ్ర అధ్యాయాలు, బేసిక్స్, సిమాంటిక్ ట్యాగ్స్, ఫారమ్స్, మల్టీమీడియా మరియు SEO వరకు పూర్తి తెలుగు గైడ్." />'
);

// Sidebar heading & home link
html = html.replace(
  '<div class="sidebar-heading">HTML5 COMPLETE COURSE</div>',
  '<div class="sidebar-heading">HTML5 Complete Course (తెలుగు)</div>'
);
html = html.replace(
  /<a href="\/blog-html\.html" class="sidebar-home-link active">.*?<\/a>/,
  '<a href="/blog-html.html" class="sidebar-home-link active">⚡ HTML Course HOME (ఇండెక్స్)</a>'
);

// Breadcrumb & Page title
html = html.replace(
  '<span class="current">Master Index: HTML5 Masterclass</span>',
  '<span class="current">HTML5 ప్రోగ్రామింగ్ (తెలుగులో)</span>'
);
html = html.replace(
  '<h1 class="page-title">HTML5 Masterclass (2026 Edition)</h1>',
  '<h1 class="page-title">HTML5 Programming Master Course తెలుగులో (37 Chapters Complete Roadmap)</h1>'
);

// Badges
html = html.replace(
  '<span class="badge">🟢 37 Chapters Complete</span>',
  '<span class="badge">🟢 37 సమగ్ర అధ్యాయాలు</span>'
);
html = html.replace(
  '<span class="badge">📂 Master Index: 13 Phases Complete</span>',
  '<span class="badge">📂 ఇంటరాక్టివ్ రోడ్‌మ్యాప్ (13 ఫేజ్‌లు)</span>'
);
html = html.replace(
  '<span class="badge">📅 2026 Edition</span>',
  '<span class="badge">📅 2026 ఎడిషన్</span>'
);

// Quick Start Card
html = html.replace(
  '<h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Complete 37-Chapter HTML5 Masterclass</h3>',
  '<h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 HTML5 నేర్చుకోవడం ఎక్కడ ప్రారంభించాలి?</h3>'
);
html = html.replace(
  '<p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore core HTML basics, master forms, configure Head Metadata &amp; SEO, test ARIA accessibility, build Web Components, or run live code in our interactive editor:</p>',
  '<p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">మీకు నచ్చిన ఫేజ్‌ను ఎంచుకుని నేరుగా కోడింగ్ ప్రాక్టీస్ చేయండి:</p>'
);

// Roadmap title
html = html.replace(
  '<div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>',
  '<div class="section-title"><span class="num">📚</span> HTML5 Master Course Curriculum (37 సమగ్ర అధ్యాయాలు)</div>'
);

fs.writeFileSync(htmlHomePath, html, 'utf8');
console.log('✅ public/blog-html.html translated and enhanced with emerald green!');

