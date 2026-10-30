const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./html_curriculum_data.js');
const { generatePageHtml } = require('./html_page_template.js');

const htmlDir = path.join(__dirname, '..', 'public', 'blog-html');

LESSONS.forEach(lesson => {
  const filePath = path.join(htmlDir, lesson.file);
  const htmlContent = generatePageHtml(lesson);
  fs.writeFileSync(filePath, htmlContent, 'utf8');
  console.log(`Generated: ${lesson.file}`);
});

console.log('✅ All 20 HTML lesson files regenerated with clean sanitized sidebar and light theme!');

