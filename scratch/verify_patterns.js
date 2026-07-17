/**
 * verify_patterns.js
 * Tests whether the patterns in fix_all_broken_text.js actually match the HTML files.
 */
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Read one file and examine it byte by byte
const testFile = path.join(publicDir, 'blog-python.html');
const content = fs.readFileSync(testFile, 'utf8');

// Find the badge lines
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('badge') || lines[i].includes('breadcrumb') || lines[i].includes('â') || lines[i].includes('section-title')) {
    const line = lines[i];
    // Print codepoints for each character
    const chars = [...line].slice(0, 60);
    const codepoints = chars.map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4,'0') + '(' + c + ')').join(' ');
    console.log(`Line ${i+1}: ${JSON.stringify(line.substring(0,80))}`);
    // Only show codepoints for non-ASCII chars
    const nonAscii = [...line].filter(c => c.codePointAt(0) > 127);
    if (nonAscii.length > 0) {
      console.log('  Non-ASCII:', nonAscii.map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase() + '(' + JSON.stringify(c) + ')').join(' '));
    }
    console.log();
  }
}
