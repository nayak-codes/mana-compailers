const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'build_nextjs_lessons.js');
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// We need to find lines that:
// 1. Are NOT template literal openers (lessonContents[...] = ` or const indexContent = ` or return `)
// 2. Are NOT template literal closers (the standalone `; lines)
// 3. Contain a backtick character
// For those lines, replace the backtick with \x60 which is safe in any string context

let inLessonTemplate = false;
const result = lines.map((line, i) => {
  const trimmed = line.trim();
  
  // Detect template literal opener
  if (/^lessonContents\[/.test(trimmed) && trimmed.endsWith('`')) {
    inLessonTemplate = true;
    return line; // don't touch the opener
  }
  
  // Detect template literal closer (line that is just `; )
  if (inLessonTemplate && (trimmed === '`;' || trimmed === '`')) {
    inLessonTemplate = false;
    return line; // don't touch the closer
  }
  
  // Inside a lesson template: replace any backtick with &#96; (HTML entity)
  if (inLessonTemplate && line.includes('`')) {
    const fixed = line.replace(/`/g, '&#96;');
    console.log('Fixed line ' + (i + 1) + ': ' + line.trim().substring(0, 80));
    return fixed;
  }
  
  return line;
});

const newContent = result.join('\n');
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('\nDone! Fixed build_nextjs_lessons.js backtick issues.');
