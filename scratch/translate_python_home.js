const fs = require('fs');
const path = require('path');

const pyHomePath = path.join(__dirname, '..', 'public', 'blog-python.html');
let html = fs.readFileSync(pyHomePath, 'utf8');

// Title & Meta
html = html.replace(
  /<title>.*?<\/title>/,
  '<title>Python 3 Programming Master Course తెలుగులో (65 Chapters Complete Roadmap) | Our Compiler</title>'
);
html = html.replace(
  /<meta name="description" content=".*?" \/>/,
  '<meta name="description" content="Python 3 Programming Master Course తెలుగులో. 65 సమగ్ర అధ్యాయాలు, బేసిక్స్ నుండి OOP, డేటా సైన్స్, AI, మరియు వెబ్ డెవలప్‌మెంట్ వరకు పూర్తి తెలుగు గైడ్." />'
);

// Sidebar heading & home link
html = html.replace(
  '<div class="sidebar-heading">Python 3 Master Course</div>',
  '<div class="sidebar-heading">Python 3 Master Course (తెలుగు)</div>'
);
html = html.replace(
  /<a href="\/blog-python\.html" class="sidebar-home-link active">.*?<\/a>/,
  '<a href="/blog-python.html" class="sidebar-home-link active">🐍 Python Course HOME (ఇండెక్స్)</a>'
);

// Breadcrumb & Page title
html = html.replace(
  '<span class="current">Python 3 Masterclass</span>',
  '<span class="current">Python 3 ప్రోగ్రామింగ్ (తెలుగులో)</span>'
);
html = html.replace(
  '<h1 class="page-title">Python 3 Programming Master Tutorial</h1>',
  '<h1 class="page-title">Python 3 Programming Master Course తెలుగులో (65 Chapters Complete Roadmap)</h1>'
);

// Badges
html = html.replace(
  '<span class="badge">🟢 65 In-Depth Combined Chapters</span>',
  '<span class="badge">🟢 65 సమగ్ర అధ్యాయాలు</span>'
);
html = html.replace(
  '<span class="badge">📂 Collapsible Interactive Roadmap (12 Phases)</span>',
  '<span class="badge">📂 ఇంటరాక్టివ్ రోడ్‌మ్యాప్ (12 ఫేజ్‌లు)</span>'
);
html = html.replace(
  '<span class="badge">📅 2026 Edition</span>',
  '<span class="badge">📅 2026 ఎడిషన్</span>'
);

// Intro box
const oldIntroRegex = /<div class="intro-box">[\s\S]*?<\/div>/;
const newIntro = `<div class="intro-box">
      <p>Our Compiler <strong>పైథాన్ 3 మాస్టర్ కోర్సుకు</strong> స్వాగతం. ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ (AI), మెషిన్ లెర్నింగ్, డేటా సైన్స్, వెబ్ డెవలప్‌మెంట్ (FastAPI/Django), సైబర్‌సెక్యూరిటీ మరియు ఆటోమేషన్‌లో ప్రపంచంలోనే నంబర్ 1 లాంగ్వేజ్ అయిన పైథాన్‌ను సరళమైన తెలుగు వివరణలతో, లైవ్ రన్నబుల్ కోడ్ స్నిప్పెట్లతో నేర్చుకోండి. ఈ 65 అధ్యాయాల సమగ్ర రోడ్‌మ్యాప్ ద్వారా మీరు బిగినర్ స్థాయి నుండి ప్రొఫెషనల్ పైథాన్ ఇంజనీర్‌గా ఎదగవచ్చు.</p>
    </div>`;
html = html.replace(oldIntroRegex, newIntro);

// Quick start card
html = html.replace(
  '<h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning?</h3>',
  '<h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 ఎక్కడి నుండి ప్రారంభించాలి?</h3>'
);
html = html.replace(
  '<p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore foundations, collections, functions, files, OOP, advanced metaprogramming, databases, web development, data science, or automation & professional skills:</p>',
  '<p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">మీకు నచ్చిన ఫేజ్‌ను ఎంచుకుని నేరుగా కోడింగ్ ప్రాక్టీస్ చేయండి:</p>'
);

// 12 Phases mapping
const phaseMap = [
  { en: 'Python Basics', te: 'పైథాన్ బేసిక్స్' },
  { en: 'Operators & Flow', te: 'ఆపరేటర్లు & కంట్రోల్ ఫ్లో' },
  { en: 'Strings & Collections', te: 'స్ట్రింగ్స్ & కలెక్షన్స్' },
  { en: 'Functions & Scope', te: 'ఫంక్షన్స్ & స్కోప్' },
  { en: 'Modules & Packages', te: 'మాడ్యూల్స్ & ప్యాకేజీలు' },
  { en: 'Exceptions & Files', te: 'ఎక్సెప్షన్స్ & ఫైల్ I/O' },
  { en: 'Object-Oriented OOP', te: 'ఆబ్జెక్ట్ ఓరియెంటెడ్ (OOP)' },
  { en: 'Advanced Python', te: 'అడ్వాన్స్‌డ్ పైథాన్ & డెకరేటర్స్' },
  { en: 'Databases & SQL', te: 'డేటాబేసెస్ & SQLite/Postgres' },
  { en: 'Web Development', te: 'వెబ్ డెవలప్‌మెంట్ (FastAPI/Django)' },
  { en: 'Data Science & AI', te: 'డేటా సైన్స్, NumPy & Pandas' },
  { en: 'Automation & DevOps', te: 'ఆటోమేషన్ & డెవాప్స్' }
];

phaseMap.forEach(p => {
  const sidebarRegex = new RegExp(`<span class="phase-title">${p.en}<\\/span>`, 'g');
  html = html.replace(sidebarRegex, `<span class="phase-title">${p.te}</span>`);

  const cardTitleRegex = new RegExp(`<h3 class="phase-roadmap-title">${p.en}<\\/h3>`, 'g');
  html = html.replace(cardTitleRegex, `<h3 class="phase-roadmap-title">${p.te}</h3>`);
});

// Update roadmap section title
html = html.replace(
  /<div class="section-title"><span class="num">📚<\/span>.*?<\/div>/,
  '<div class="section-title"><span class="num">📚</span> Python 3 Master Course Curriculum (65 సమగ్ర అధ్యాయాలు)</div>'
);

fs.writeFileSync(pyHomePath, html, 'utf8');
console.log('✅ public/blog-python.html translated to Telugu!');

