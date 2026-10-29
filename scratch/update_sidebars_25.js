const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'blog-javascript');

const chapters = [
  // Part 1: Basics (7 Ch)
  { part: 1, file: '01-javascript-fundamentals.html', num: 1, title: '1. JavaScript ante enti?' },
  { part: 1, file: '02-javascript-syntax-and-errors.html', num: 2, title: '2. Setup & Environment' },
  { part: 1, file: 'variables.html', num: 3, title: '3. Variables: var, let, const' },
  { part: 1, file: 'data-types.html', num: 4, title: '4. Data Types' },
  { part: 1, file: 'operators.html', num: 5, title: '5. Operators' },
  { part: 1, file: 'type-conversion.html', num: 6, title: '6. Type Conversion & Template Literals' },
  { part: 1, file: 'input-output.html', num: 7, title: '7. Input/Output (I/O)' },

  // Part 2: Control Flow (4 Ch)
  { part: 2, file: 'conditionals.html', num: 8, title: '8. if, else if, else' },
  { part: 2, file: 'switch.html', num: 9, title: '9. switch statement' },
  { part: 2, file: 'loops.html', num: 10, title: '10. Loops: for, while, do-while' },
  { part: 2, file: 'break-continue.html', num: 11, title: '11. break & continue' },

  // Part 3: Functions & Data (6 Ch)
  { part: 3, file: 'functions.html', num: 12, title: '12. Functions: declaration, parameters, return' },
  { part: 3, file: 'arrow-functions.html', num: 13, title: '13. Arrow Functions' },
  { part: 3, file: 'arrays.html', num: 14, title: '14. Arrays & Array Methods' },
  { part: 3, file: 'objects.html', num: 15, title: '15. Objects: properties, methods & JSON' },
  { part: 3, file: 'strings.html', num: 16, title: '16. Strings: common methods' },
  { part: 3, file: 'math-date.html', num: 17, title: '17. Math & Date objects' },

  // Part 4: DOM & Events (4 Ch)
  { part: 4, file: 'dom.html', num: 18, title: '18. DOM: Selecting & Manipulation' },
  { part: 4, file: 'events.html', num: 19, title: '19. Events: click, input, submit' },
  { part: 4, file: 'form-validation.html', num: 20, title: '20. Form Validation' },
  { part: 4, file: 'todo-list-project.html', num: 21, title: '21. Mini project: To-Do List' },

  // Part 5: Modern & Advanced JS (4 Ch)
  { part: 5, file: 'scope-hoisting.html', num: 22, title: '22. Scope, Hoisting & Closures' },
  { part: 5, file: 'destructuring-spread.html', num: 23, title: '23. Destructuring, Spread, Rest & ES6 Modules' },
  { part: 5, file: 'async-await-fetch.html', num: 24, title: '24. Asynchronous JS: Promises, async/await & Fetch' },
  { part: 5, file: 'error-handling.html', num: 25, title: '25. Error Handling & localStorage' }
];

const partsConfig = [
  { part: 1, tag: 'Part 01', title: 'Basics', count: '7 Ch', icon: '🟨' },
  { part: 2, tag: 'Part 02', title: 'Control Flow', count: '4 Ch', icon: '🔀' },
  { part: 3, tag: 'Part 03', title: 'Functions & Data', count: '6 Ch', icon: '🧩' },
  { part: 4, tag: 'Part 04', title: 'DOM & Events', count: '4 Ch', icon: '🌐' },
  { part: 5, tag: 'Part 05', title: 'Modern & Advanced JS', count: '4 Ch', icon: '🚀' }
];

function generateSidebar(currentFilename) {
  let activePart = 1;
  const currentItem = chapters.find(c => c.file === currentFilename);
  if (currentItem) {
    activePart = currentItem.part;
  }

  let html = '    <div class="sidebar-accordion">\n';

  partsConfig.forEach(p => {
    const isPartActive = p.part === activePart;
    const headerClass = isPartActive ? 'accordion-header active' : 'accordion-header';
    const contentClass = isPartActive ? 'accordion-content open' : 'accordion-content';

    html += `      <!-- ${p.tag}: ${p.title} -->\n`;
    html += `      <button class="${headerClass}" onclick="toggleAccordion(this)">\n`;
    html += `        <div class="accordion-header-main">\n`;
    html += `          <span class="phase-icon-box">${p.icon}</span>\n`;
    html += `          <div class="phase-info">\n`;
    html += `            <span class="phase-tag">${p.tag}</span>\n`;
    html += `            <span class="phase-title">${p.title}</span>\n`;
    html += `          </div>\n`;
    html += `        </div>\n`;
    html += `        <div class="accordion-header-meta">\n`;
    html += `          <span class="phase-count-badge">${p.count}</span>\n`;
    html += `          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">\n`;
    html += `            <polyline points="9 18 15 12 9 6"></polyline>\n`;
    html += `          </svg>\n`;
    html += `        </div>\n`;
    html += `      </button>\n`;
    html += `      <div class="${contentClass}">\n`;

    const partChapters = chapters.filter(c => c.part === p.part);
    partChapters.forEach(c => {
      const isItemActive = c.file === currentFilename;
      const activeAttr = isItemActive ? ' class="active"' : '';
      html += `        <a href="/blog-javascript/${c.file}"${activeAttr}>${c.title}</a>\n`;
    });

    html += `      </div>\n\n`;
  });

  html += '    </div>';
  return html;
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const accordionRegex = /<div class="sidebar-accordion">[\s\S]*?<\/div>\s*(?=\r?\n\s*<div class="sidebar-heading">Interactive IDE|<aside|<main|\r?\n\s*<!-- MAIN)/;
  if (accordionRegex.test(content)) {
    const newSidebar = generateSidebar(file);
    content = content.replace(accordionRegex, newSidebar);
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
    console.log(`Updated: ${file}`);
  }
});

console.log(`Successfully updated ${count} chapter sidebars to 25-lesson curriculum.`);
