const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./java_curriculum_data.js');

console.log('--- AUDIT: LAYOUT & CODE PRE TEXT COLOR ---');
LESSONS.forEach(l => {
  const p = path.join(__dirname, '..', 'public', 'blog-java', l.file);
  if (!fs.existsSync(p)) return;
  const content = fs.readFileSync(p, 'utf8');
  const mainHasMarginAuto = /<main[^>]*margin:\s*0\s*auto/i.test(content);
  const hasDarkPre = /<pre[^>]*color:\s*#0f172a/i.test(content);
  const hasCodeTag = content.includes('<pre><code') || content.includes('<pre><code>');
  const hasContentClass = content.includes('<main class="content">');
  console.log(`Ch ${String(l.num).padStart(2, '0')}: mainMarginAuto=${mainHasMarginAuto} | darkPre=${hasDarkPre} | codeTag=${hasCodeTag} | mainContent=${hasContentClass}`);
});
