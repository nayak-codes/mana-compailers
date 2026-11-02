const fs = require('fs');
const { LESSONS } = require('./java_curriculum_data.js');

let allHaveAside = true;
LESSONS.forEach(l => {
  const p = 'public/blog-java/' + l.file;
  const c = fs.readFileSync(p, 'utf8');
  const m = c.match(/<aside class="sidebar">[\s\S]*?<\/aside>/);
  if (!m) {
    console.log(`Ch ${l.num} does NOT have <aside class="sidebar">`);
    allHaveAside = false;
  }
});

console.log('All 25 chapters have <aside class="sidebar">: ', allHaveAside);

