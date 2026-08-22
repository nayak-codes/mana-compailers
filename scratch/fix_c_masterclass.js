const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const blogCDir = path.join(publicDir, 'blog-c');

// 1. Extract full 22-Phase Accordion Sidebar HTML from public/blog-c.html
const blogCHtml = fs.readFileSync(path.join(publicDir, 'blog-c.html'), 'utf8');
const accordionMatch = blogCHtml.match(/<div class="sidebar-accordion">([\s\S]*?)<\/div>\s*<div class="sidebar-heading">Interactive IDE<\/div>/i);

if (!accordionMatch) {
  console.error('Failed to extract sidebar accordion from public/blog-c.html!');
  process.exit(1);
}

const rawAccordionContent = accordionMatch[1];

// 2. Remove legacy 20 short-named files in public/blog-c/
const legacyFiles = [
  '01-introduction-to-c-how-compilation-works.html',
  '02-variables-data-types.html',
  '03-operators-expressions.html',
  '04-input-output-printf-and-scanf.html',
  '05-conditional-statements-if-else-switch.html',
  '06-loops-for-while-do-while.html',
  '07-functions-recursion.html',
  '08-arrays.html',
  '09-multi-dimensional-arrays.html',
  '10-strings-string-h.html',
  '11-pointers-basics.html',
  '12-pointers-arrays.html',
  '13-pointers-functions.html',
  '14-structures.html',
  '15-unions-enums.html',
  '16-dynamic-memory-allocation.html',
  '17-file-handling-in-c.html',
  '18-preprocessor-directives-macros.html',
  '19-storage-classes.html',
  '20-bitwise-operators-command-line-arguments.html'
];

let removedCount = 0;
legacyFiles.forEach(f => {
  const fp = path.join(blogCDir, f);
  if (fs.existsSync(fp)) {
    fs.unlinkSync(fp);
    removedCount++;
  }
});
console.log(`Removed ${removedCount} legacy C lesson files.`);

// 3. Process all remaining C chapter files (01-c-*.html through 65-c-*.html)
const allFiles = fs.readdirSync(blogCDir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

allFiles.forEach(file => {
  const filePath = path.join(blogCDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Customize accordion for this specific chapter:
  // - Clear active/open classes from template
  // - Mark active link for this file
  // - Open the parent accordion section containing this active link
  let customAccordion = rawAccordionContent;

  // Clear all previous active/open classes
  customAccordion = customAccordion.replace(/ class="accordion-header active"/g, ' class="accordion-header"');
  customAccordion = customAccordion.replace(/ class="accordion-content open"/g, ' class="accordion-content"');
  customAccordion = customAccordion.replace(/ class="active"/g, '');

  // Add active class to current file link
  const linkRegex = new RegExp(`href="/blog-c/${file}"`, 'g');
  const relativeLinkRegex = new RegExp(`href="${file}"`, 'g');
  
  if (customAccordion.match(linkRegex)) {
    customAccordion = customAccordion.replace(linkRegex, `href="/blog-c/${file}" class="active"`);
  } else if (customAccordion.match(relativeLinkRegex)) {
    customAccordion = customAccordion.replace(relativeLinkRegex, `href="/blog-c/${file}" class="active"`);
  }

  // If active link is found, open its parent accordion-header and accordion-content
  if (customAccordion.includes('class="active"')) {
    // Find the accordion block containing the active link and open it
    const blocks = customAccordion.split('<!-- Phase ');
    const updatedBlocks = blocks.map(block => {
      if (block.includes('class="active"')) {
        block = block.replace('class="accordion-header"', 'class="accordion-header active"');
        block = block.replace('class="accordion-content"', 'class="accordion-content open"');
      }
      return block;
    });
    customAccordion = updatedBlocks.join('<!-- Phase ');
  }

  const fullSidebarAccordion = `<div class="sidebar-accordion">\n${customAccordion}\n    </div>`;

  // Replace existing sidebar-accordion in HTML
  if (html.includes('<div class="sidebar-accordion">')) {
    html = html.replace(/<div class="sidebar-accordion">[\s\S]*?<\/div>\s*<div class="sidebar-heading">Interactive IDE<\/div>/i, `${fullSidebarAccordion}\n    <div class="sidebar-heading">Interactive IDE</div>`);
  } else {
    // Inject if missing
    html = html.replace('<div class="sidebar-heading">C Master Course</div>', `<div class="sidebar-heading">C Master Course</div>\n    <a href="/blog-c.html" class="sidebar-home-link">⚡ C Course HOME</a>\n${fullSidebarAccordion}`);
  }

  // Ensure Theme toggle defaults to Dark theme in script if not set
  if (html.includes("const currentTheme = localStorage.getItem('theme') || 'dark';")) {
    // Clean
  } else if (html.includes("const currentTheme = localStorage.getItem('theme')")) {
    html = html.replace("const currentTheme = localStorage.getItem('theme')", "const currentTheme = localStorage.getItem('theme') || 'dark'");
  }

  fs.writeFileSync(filePath, html, 'utf8');
  updatedCount++;
});

console.log(`Successfully updated sidebar with all 22 Phases across ${updatedCount} C chapter files!`);
