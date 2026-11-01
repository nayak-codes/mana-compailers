const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'blog-python.html');
const content = fs.readFileSync(filePath, 'utf8');

console.log('=== VERIFYING NEW PYTHON MASTERCLASS INDEX (blog-python.html) ===\n');

const buttonCount = (content.match(/<button class="accordion-header/g) || []).length;
console.log('<button class="accordion-header count:', buttonCount);

const checks = {
  has25InTitle: content.includes('25 Chapters'),
  phaseCardsCount: (content.match(/class="phase-roadmap-card"/g) || []).length === 5,
  lessonRowsCount: (content.match(/class="curriculum-lesson-row"/g) || []).length === 25,
  sidebarPhasesCount: buttonCount === 5,
  sidebarLinksCount: (content.match(/class="accordion-content[^"]*"[\s\S]*?<\/div>/g) || []).reduce((acc, div) => {
    return acc + (div.match(/<a href="\/blog-python\//g) || []).length;
  }, 0) === 25,
  hasHeroStats: content.includes('hero-stat-card'),
  hasConceptBox: content.includes('concept-box'),
  hasFaqSection: content.includes('తరచుగా అడిగే ప్రశ్నలు'),
  hasCompilerCta: content.includes('/online-python-compiler.html'),
  hasSingleSidebar: (content.match(/<aside class="sidebar"/g) || []).length === 1,
  hasNotoSansTelugu: content.includes('Noto+Sans+Telugu'),
  hasLightClass: content.includes('class="lang-python light-theme"')
};

console.log('Verification checks:');
let allPassed = true;
Object.entries(checks).forEach(([key, val]) => {
  console.log(`  ${val ? '✅' : '❌'} ${key}: ${val}`);
  if (!val) allPassed = false;
});

if (allPassed) {
  console.log('\n🏆 ALL 25-CHAPTER PYTHON INDEX CHECKS PASSED WITH 100% PERFECTION!');
  process.exit(0);
} else {
  console.error('\n❌ Verification failed.');
  process.exit(1);
}
