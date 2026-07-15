const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'build_springboot_lessons.js');
let content = fs.readFileSync(filePath, 'utf8');

// Replace any single quote that is between letters (apostrophes like doesn't, Spring's)
// with the HTML entity &#39; so it doesn't break JavaScript single-quoted strings.
content = content.replace(/(\w)'(\w)/g, "$1&#39;$2");

// Also replace any code-level double-escaped single quotes if they cause issues
// (e.g. if we had any other single quotes inside code blocks)
// Let's make sure we didn't miss any.

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched apostrophes in build_springboot_lessons.js');
