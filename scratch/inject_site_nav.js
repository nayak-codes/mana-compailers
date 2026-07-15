// Injects site-nav.js into all static HTML pages
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SCRIPT_TAG = '<script src="/site-nav.js" defer></script>';
const MARKER = 'site-nav.js';

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

let updated = 0;
let skipped = 0;

for (const file of walk(PUBLIC_DIR)) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes(MARKER)) {
    skipped++;
    continue;
  }
  if (!html.includes('class="topnav"') && !html.includes('class="header"')) {
    skipped++;
    continue;
  }
  if (html.includes('</head>')) {
    html = html.replace('</head>', `  ${SCRIPT_TAG}\n</head>`);
  } else {
    html = SCRIPT_TAG + '\n' + html;
  }
  fs.writeFileSync(file, html, 'utf8');
  updated++;
}

console.log(`site-nav.js injected into ${updated} files (${skipped} skipped)`);
