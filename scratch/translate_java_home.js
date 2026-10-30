const fs = require('fs');
const path = require('path');

const javaHomePath = path.join(__dirname, '..', 'public', 'blog-java.html');
let html = fs.readFileSync(javaHomePath, 'utf8');

// Title & Meta
html = html.replace(
  /<title>.*?<\/title>/,
  '<title>Java Programming Master Course తెలుగులో (47 Chapters Complete Roadmap) | Our Compiler</title>'
);
html = html.replace(
  /<meta name="description" content=".*?" \/>/,
  '<meta name="description" content="Java Programming Master Course తెలుగులో. 47 సమగ్ర అధ్యాయాలు, JVM ఆర్కిటెక్చర్, OOP, కలెక్షన్స్, మల్టీథ్రెడింగ్, మరియు Spring Boot వరకు పూర్తి తెలుగు గైడ్." />'
);

// Sidebar heading & home link
html = html.replace(
  '<div class="sidebar-heading">Java Master Course</div>',
  '<div class="sidebar-heading">Java Master Course (తెలుగు)</div>'
);
html = html.replace(
  /<a href="\/blog-java\.html" class="sidebar-home-link active">.*?<\/a>/,
  '<a href="/blog-java.html" class="sidebar-home-link active">☕ Java Course HOME (ఇండెక్స్)</a>'
);

// Breadcrumb & Page title
html = html.replace(
  '<span class="current">Java Masterclass</span>',
  '<span class="current">Java ప్రోగ్రామింగ్ (తెలుగులో)</span>'
);
html = html.replace(
  '<h1 class="page-title">Java Programming Master Tutorial</h1>',
  '<h1 class="page-title">Java Programming Master Course తెలుగులో (47 Chapters Complete Roadmap)</h1>'
);

// Badges
html = html.replace(
  '<span class="badge">🟢 47 In-Depth Combined Chapters</span>',
  '<span class="badge">🟢 47 సమగ్ర అధ్యాయాలు</span>'
);
html = html.replace(
  '<span class="badge">📂 Collapsible Interactive Roadmap (30 Phases)</span>',
  '<span class="badge">📂 ఇంటరాక్టివ్ రోడ్‌మ్యాప్ (30 ఫేజ్‌లు)</span>'
);
html = html.replace(
  '<span class="badge">📅 2026 Edition</span>',
  '<span class="badge">📅 2026 ఎడిషన్</span>'
);

// Intro box
const oldIntroRegex = /<div class="intro-box">[\s\S]*?<\/div>/;
const newIntro = `<div class="intro-box">
      <p>Our Compiler <strong>జావా మాస్టర్ కోర్సుకు</strong> స్వాగతం. 'Write Once, Run Anywhere' (WORA) ఫిలాసఫీతో ప్రపంచవ్యాప్తంగా మిలియన్ల కొద్దీ ఎంటర్‌ప్రైజ్ బ్యాకెండ్‌లు, బ్యాంకింగ్ సిస్టమ్స్, ఆండ్రాయిడ్ అప్లికేషన్లు మరియు క్లౌడ్ మైక్రోసర్వీసెస్‌ను నడిపిస్తున్న జావాను సులభమైన తెలుగు వివరణలతో, లైవ్ రన్నబుల్ కోడ్ స్నిప్పెట్లతో నేర్చుకోండి. బేసిక్స్ నుండి OOP, మల్టీథ్రెడింగ్, కలెక్షన్స్ మరియు మోడరన్ జావా 21 ఫీచర్ల వరకు అన్నీ ఈ రోడ్‌మ్యాప్‌లో ఉన్నాయి.</p>
    </div>`;
html = html.replace(oldIntroRegex, newIntro);

// Quick start card
html = html.replace(
  /<h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">.*?Ready to Start Learning.*?<\/h3>/i,
  '<h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 జావా నేర్చుకోవడం ఎక్కడ ప్రారంభించాలి?</h3>'
);
html = html.replace(
  /<p style="color:var\(--text2\); margin-bottom: 16px; font-size:14.5px;">Choose where to start:.*?<\/p>/,
  '<p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">మీకు నచ్చిన విభాగాన్ని ఎంచుకుని నేరుగా కోడింగ్ ప్రాక్టీస్ చేయండి:</p>'
);

// Roadmap title
html = html.replace(
  /<div class="section-title"><span class="num">📚<\/span>.*?30-Phase Complete Java Curriculum Roadmap<\/div>/,
  '<div class="section-title"><span class="num">📚</span> Java Master Course Curriculum (30 ఫేజ్‌ల సమగ్ర రోడ్‌మ్యాప్)</div>'
);

// Phase title replacements
const javaPhases = [
  { en: 'Java Basics & JVM', te: 'జావా బేసిక్స్ & JVM ఆర్కిటెక్చర్' },
  { en: 'Variables & Data Types', te: 'వేరియబుల్స్ & డేటా టైప్స్' },
  { en: 'Operators & User Input', te: 'ఆపరేటర్లు & యూజర్ ఇన్‌పుట్' },
  { en: 'Conditions & Branching', te: 'డెసిషన్ మేకింగ్ & బ్రాంచింగ్' },
  { en: 'Loops & Control Flow', te: 'లూప్స్ & కంట్రోల్ ఫ్లో' },
  { en: 'Strings & StringBuilder', te: 'స్ట్రింగ్స్ & StringBuilder' },
  { en: 'Arrays & Matrices', te: 'అరేలు & మ్యాట్రిసెస్' },
  { en: 'Methods & Recursion', te: 'మెథడ్స్ & రికర్షన్' },
  { en: 'OOP Foundations', te: 'OOP పునాదులు (Classes & Objects)' },
  { en: 'OOP Intermediate', te: 'ఎన్‌క్యాప్సులేషన్ & ఇన్‌హెరిటెన్స్' },
  { en: 'OOP Advanced', te: 'పాలిమార్ఫిజం & అబ్‌స్ట్రాక్షన్' },
  { en: 'Exception Handling', te: 'ఎక్సెప్షన్ హ్యాండ్లింగ్' },
  { en: 'Collections Framework', te: 'కలెక్షన్స్ ఫ్రేమ్‌వర్క్' },
  { en: 'Generics & Collections', te: 'జెనెరిక్స్ & కలెక్షన్స్' },
  { en: 'Java 8+ Streams & Lambdas', te: 'స్ట్రీమ్స్ (Streams) & లాంబ్డా' },
  { en: 'Multithreading & Concurrency', te: 'మల్టీథ్రెడింగ్ & కాన్‌కరెన్సీ' },
  { en: 'File I/O & Serialization', te: 'ఫైల్ I/O & సిరియలైజేషన్' }
];

javaPhases.forEach(p => {
  const sidebarRegex = new RegExp(`<span class="phase-title">${p.en}<\\/span>`, 'g');
  html = html.replace(sidebarRegex, `<span class="phase-title">${p.te}</span>`);

  const cardTitleRegex = new RegExp(`<h3 class="phase-roadmap-title">${p.en}<\\/h3>`, 'g');
  html = html.replace(cardTitleRegex, `<h3 class="phase-roadmap-title">${p.te}</h3>`);
});

fs.writeFileSync(javaHomePath, html, 'utf8');
console.log('✅ public/blog-java.html translated to Telugu!');

