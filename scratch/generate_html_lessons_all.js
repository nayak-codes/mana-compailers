const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./html_curriculum_data.js');
const { generatePageHtml } = require('./html_page_template.js');

const htmlDir = path.join(__dirname, '../public/blog-html');

let createdCount = 0;
let preservedCount = 0;

LESSONS.forEach(lesson => {
  const filePath = path.join(htmlDir, lesson.file);
  
  // If file doesn't exist, create initial scaffolding
  if (!fs.existsSync(filePath)) {
    const pageHtml = generatePageHtml(lesson);
    fs.writeFileSync(filePath, pageHtml, 'utf8');
    createdCount++;
    console.log(`Created new lesson ${lesson.num}: ${lesson.file}`);
  } else {
    // If it exists, update header, sidebar, breadcrumb and metadata while preserving any custom body content if available
    preservedCount++;
    console.log(`Preserved existing lesson ${lesson.num}: ${lesson.file}`);
  }
});

console.log(`Summary: ${createdCount} created, ${preservedCount} preserved.`);

