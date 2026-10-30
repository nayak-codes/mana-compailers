const fs = require('fs');
const path = require('path');
const { LESSONS, PHASES } = require('./html_curriculum_data.js');

const indexPath = path.join(__dirname, '..', 'public', 'blog-html.html');
const content = fs.readFileSync(indexPath, 'utf8');

console.log('--- Verifying public/blog-html.html ---');
console.log('Length:', content.length, 'chars');

const hasLightHtml = content.includes('<html class="light-theme" lang="te">');
const hasLightBody = content.includes('<body class="lang-html light-theme">');
const hasSiteNav = content.includes('<script src="/site-nav.js" defer></script>');
const hasBox = /[┌┐└┘├┤┬┴┼─│═║╔╗╚╝╠╣╦╩╬]/.test(content);
const hasOrange = /#f97316|#ea580c/i.test(content);
const greenOccurrences = (content.match(/#10b981/g) || []).length;

console.log('Light HTML:', hasLightHtml);
console.log('Light Body:', hasLightBody);
console.log('Site Nav:', hasSiteNav);
console.log('Has ASCII Box:', hasBox);
console.log('Has Orange:', hasOrange);
console.log('Green (#10b981) Occurrences:', greenOccurrences);

let missingLinks = 0;
LESSONS.forEach(l => {
  if (!content.includes(l.file)) {
    console.error(`Missing lesson link: ${l.file}`);
    missingLinks++;
  }
});
console.log('Missing lesson links count:', missingLinks);

let allLessonsExist = true;
LESSONS.forEach(l => {
  const fp = path.join(__dirname, '..', 'public', 'blog-html', l.file);
  if (!fs.existsSync(fp)) {
    console.error(`Lesson file missing on disk: ${l.file}`);
    allLessonsExist = false;
  }
});
console.log('All 20 lesson files on disk:', allLessonsExist);

const passed = hasLightHtml && hasLightBody && hasSiteNav && !hasBox && !hasOrange && missingLinks === 0 && allLessonsExist;
console.log('INDEX VERIFICATION PASSED:', passed);
process.exit(passed ? 0 : 1);

