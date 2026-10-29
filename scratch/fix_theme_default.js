const fs = require('fs');
const path = require('path');

// 1. Update site-nav.js
const siteNavPath = path.join(__dirname, '../public/site-nav.js');
let siteNav = fs.readFileSync(siteNavPath, 'utf8');

// Update themeBtn icon and storage
siteNav = siteNav.replace(
  /themeBtn\.textContent = isLight \? '[^']+' : '[^']+';/g,
  "themeBtn.textContent = isLight ? '🌙' : '☀️';"
);

siteNav = siteNav.replace(
  /localStorage\.setItem\('tutorial_theme',/g,
  "localStorage.setItem('tutorial_theme_v2',"
);

siteNav = siteNav.replace(
  /var savedTheme = localStorage\.getItem\('tutorial_theme'\);/g,
  "var savedTheme = localStorage.getItem('tutorial_theme_v2');"
);

// In initNav, ensure it removes light-theme ONLY IF savedTheme === 'dark'
const oldInitNavTheme = `    if (isTutorial) {
      var savedTheme = localStorage.getItem('tutorial_theme_v2');
      if (savedTheme !== 'dark') {
        document.documentElement.classList.add('light-theme');
        if (document.body) {
          document.body.classList.add('light-theme');
        }
      }
    }`;

const newInitNavTheme = `    if (isTutorial) {
      var savedTheme = localStorage.getItem('tutorial_theme_v2');
      if (savedTheme === 'dark') {
        document.documentElement.classList.remove('light-theme');
        if (document.body) document.body.classList.remove('light-theme');
      } else {
        document.documentElement.classList.add('light-theme');
        if (document.body) document.body.classList.add('light-theme');
      }
    }`;

if (siteNav.includes(oldInitNavTheme)) {
  siteNav = siteNav.replace(oldInitNavTheme, newInitNavTheme);
}

// In buildTutorialNavHTML and buildNavHTML, default initial toggle icon to 🌙
siteNav = siteNav.replace(
  /<button type="button" class="app-topnav-toggle" aria-label="Toggle theme">[^<]+<\/button>/g,
  '<button type="button" class="app-topnav-toggle" aria-label="Toggle theme">🌙</button>'
);

// Dynamic CTA button link in tutorial nav
siteNav = siteNav.replace(
  /'<a href="\/\\?lang=python3" class="app-topnav-cta">▶ Start Coding<\/a>'/g,
  "'<a href=\"' + getCompilerUrl(ctx.tutorialSlug) + '\" class=\"app-topnav-cta\">▶ Start Coding</a>'"
);

fs.writeFileSync(siteNavPath, siteNav, 'utf8');
console.log('✅ Updated public/site-nav.js');

// 2. Update site-nav.css with light-theme toggle button styling
const siteNavCssPath = path.join(__dirname, '../public/site-nav.css');
let siteNavCss = fs.readFileSync(siteNavCssPath, 'utf8');

const toggleLightCss = `
body.light-theme .app-topnav-toggle {
  background: #f6f8fa;
  border-color: #d0d7de;
  color: #24292f;
}
body.light-theme .app-topnav-toggle:hover {
  background: #eaeef2;
  border-color: #afb8c1;
}
`;

if (!siteNavCss.includes('body.light-theme .app-topnav-toggle')) {
  siteNavCss += toggleLightCss;
  fs.writeFileSync(siteNavCssPath, siteNavCss, 'utf8');
  console.log('✅ Updated public/site-nav.css');
}

