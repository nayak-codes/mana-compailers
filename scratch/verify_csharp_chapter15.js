const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'blog-csharp', '15-csharp-inheritance-and-polymorphism.html');
const content = fs.readFileSync(filePath, 'utf8');

console.log('Verifying C# Chapter 15:');
console.log('File size:', content.length, 'characters');

let errors = [];

if (content.length < 40000) errors.push('Content size is less than 40k characters');
if (!content.includes('/blog-style.css')) errors.push('Missing /blog-style.css');
if (!content.includes('/blog-csharp/style.css')) errors.push('Missing /blog-csharp/style.css');
if (!content.includes('/site-nav.css')) errors.push('Missing /site-nav.css');
if (!content.includes('site-nav-placeholder')) errors.push('Missing site-nav-placeholder');
if (!content.includes('class="layout"')) errors.push('Missing class="layout"');
if (content.includes('class="page-layout"')) errors.push('Found forbidden class="page-layout"');
if (content.includes('site-header')) errors.push('Found forbidden hardcoded site-header');

const asides = (content.match(/<aside class="sidebar"/g) || []).length;
if (asides !== 1) errors.push(`Expected exactly 1 <aside class="sidebar", found ${asides}`);

const sectionMatches = content.match(/<h2 class="section-title"><span class="num">(\d+)<\/span>/g);
if (!sectionMatches || sectionMatches.length < 13) {
  errors.push(`Expected at least 13 sections with numbered spans, found ${sectionMatches ? sectionMatches.length : 0}`);
}

const quizzes = (content.match(/<details/g) || []).length;
if (quizzes < 5) errors.push(`Expected at least 5 quiz items, found ${quizzes}`);

const codeBlocks = (content.match(/class="code-block"/g) || []).length;
if (codeBlocks < 5) errors.push(`Expected at least 5 code blocks, found ${codeBlocks}`);

if (errors.length > 0) {
  console.error('❌ Verification failed:');
  errors.forEach(e => console.error('  -', e));
  process.exit(1);
} else {
  console.log('✅ All checks passed successfully for C# Chapter 15!');
}
