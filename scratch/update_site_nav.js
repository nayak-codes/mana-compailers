const fs = require('fs');

// 1. Update site-nav.js
let nav = fs.readFileSync('public/site-nav.js', 'utf8');

// Replace theme toggle logic to handle tutorial_theme
nav = nav.replace(
  /var savedTheme = localStorage\.getItem\('theme'\);/g,
  "var savedTheme = localStorage.getItem('tutorial_theme');"
);

nav = nav.replace(
  /localStorage\.setItem\(isCompiler \? 'compiler_theme' : 'theme', isLight \? 'light' : 'dark'\);\s*localStorage\.setItem\('theme', isLight \? 'light' : 'dark'\);/g,
  `var isTutorial = isTutorialPage();
        if (isTutorial) {
          localStorage.setItem('tutorial_theme', isLight ? 'light' : 'dark');
        } else {
          localStorage.setItem(isCompiler ? 'compiler_theme' : 'theme', isLight ? 'light' : 'dark');
          localStorage.setItem('theme', isLight ? 'light' : 'dark');
        }`
);

fs.writeFileSync('public/site-nav.js', nav, 'utf8');
console.log('site-nav.js successfully updated');

