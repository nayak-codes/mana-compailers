const fs = require('fs');
const path = require('path');

const hubFile = path.join(__dirname, '..', 'public', 'blog-java.html');
const content = fs.readFileSync(hubFile, 'utf8');

const regex = /<button class="accordion-header[\s\S]*?<\/button>[\s\S]*?<div class="accordion-content[\s\S]*?<\/div>/g;
let match;
let phaseIndex = 0;

while ((match = regex.exec(content)) !== null) {
  phaseIndex++;
  const block = match[0];
  const tag = (block.match(/class="phase-tag">([^<]+)/) || [])[1] || '';
  const title = (block.match(/class="phase-title">([^<]+)/) || [])[1] || '';
  const badge = (block.match(/class="phase-count-badge">([^<]+)/) || [])[1] || '';
  
  const links = [];
  const linkRegex = /<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(block)) !== null) {
    links.push({ href: linkMatch[1], text: linkMatch[2] });
  }

  console.log(`Phase ${phaseIndex}: [${tag}] ${title} (${badge}) -> ${links.length} links`);
  links.forEach(l => console.log(`   - ${l.text} -> ${l.href}`));
}
