const fs = require('fs');
const content = fs.readFileSync('public/blog-c/20-c-mini-project-student-record-management.html', 'utf8');

const titles = content.match(/<div class="section-title">[\s\S]*?<\/div>/g) || [];
console.log('Section titles:');
titles.forEach(t => console.log('  ', t.replace(/<[^>]+>/g, '').trim()));

const preMatches = content.match(/<pre>[\s\S]*?<\/pre>/g) || [];
console.log('\nTotal code in <pre> tags:', preMatches.reduce((acc, p) => acc + p.length, 0));
console.log('Total file length:', content.length);
console.log('\nText breakdown:');
const cleanText = content.replace(/<pre>[\s\S]*?<\/pre>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
console.log('Text without code length:', cleanText.length);
console.log('Sample text without code:\n', cleanText.substring(0, 800));

