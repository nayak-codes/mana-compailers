const fs = require('fs');
const path = require('path');

const ch18Path = path.join(__dirname, '..', 'public', 'blog-cpp', '18-cpp-templates-generic-programming.html');
const ch19Path = path.join(__dirname, '..', 'public', 'blog-cpp', '19-cpp-stl-containers-and-algorithms.html');
const ch20Path = path.join(__dirname, '..', 'public', 'blog-cpp', '20-cpp-exception-file-handling-project.html');

const files = [
  { ch: 18, name: '18-cpp-templates-generic-programming.html', path: ch18Path },
  { ch: 19, name: '19-cpp-stl-containers-and-algorithms.html', path: ch19Path },
  { ch: 20, name: '20-cpp-exception-file-handling-project.html', path: ch20Path }
];

console.log('====================================================');
console.log('   AUDITING MODERN C++ MASTERCLASS: PHASE 05        ');
console.log('====================================================\n');

let totalChars = 0;
let totalCodeBlocks = 0;
let totalQuizzes = 0;
let allPassed = true;

files.forEach(f => {
  if (!fs.existsSync(f.path)) {
    console.error(`❌ Chapter ${f.ch} file not found: ${f.name}`);
    allPassed = false;
    return;
  }

  const content = fs.readFileSync(f.path, 'utf8');
  totalChars += content.length;

  const sectionsCount = (content.match(/<h2 class="section-title"><span class="num">(\d+)<\/span>/g) || []).length;
  const sidebarCount = (content.match(/<aside class="sidebar"/g) || []).length;
  const introBox = content.includes('class="intro-box"');
  const detailsCount = (content.match(/<details/g) || []).length;
  const codeBlocksCount = (content.match(/class="code-block"/g) || []).length;
  const compiler = content.includes('openInteractiveCompiler()') && content.includes('/online-cpp-compiler.html');
  const breadcrumb = content.includes('class="breadcrumb"') && content.includes('<span class="sep">›</span>');
  const pageTitle = content.includes('class="page-title"');
  const pageMeta = content.includes('class="page-meta"');
  const coveredPill = content.includes('📌 Covered in this chapter:');

  totalCodeBlocks += codeBlocksCount;
  totalQuizzes += detailsCount;

  const passed = content.length >= 45000 &&
                 sectionsCount >= 13 &&
                 sidebarCount === 1 &&
                 introBox &&
                 detailsCount >= 5 &&
                 codeBlocksCount >= 5 &&
                 compiler &&
                 breadcrumb &&
                 pageTitle &&
                 pageMeta &&
                 coveredPill;

  if (!passed) {
    allPassed = false;
    console.log(`❌ Chapter ${f.ch} (${f.name}) FAILED:`);
    console.log(`   Length: ${content.length} (min 45000)`);
    console.log(`   Sections: ${sectionsCount} (min 13)`);
    console.log(`   Sidebar count: ${sidebarCount} (must be 1)`);
    console.log(`   Intro box: ${introBox}`);
    console.log(`   Quizzes: ${detailsCount} (min 5)`);
    console.log(`   Code blocks: ${codeBlocksCount} (min 5)`);
  } else {
    console.log(`✅ Chapter ${f.ch} (${f.name}):`);
    console.log(`   • Size: ${content.length.toLocaleString()} characters`);
    console.log(`   • Sections: ${sectionsCount} sections`);
    console.log(`   • Code Blocks: ${codeBlocksCount} interactive blocks`);
    console.log(`   • Quizzes: ${detailsCount} knowledge check questions`);
    console.log(`   • Layout & Sidebar: Exact HTML5 single-sidebar standard`);
    console.log('');
  }
});

console.log('----------------------------------------------------');
console.log(`Phase 05 Total Characters: ${totalChars.toLocaleString()} characters`);
console.log(`Phase 05 Total Code Blocks: ${totalCodeBlocks}`);
console.log(`Phase 05 Total Quizzes: ${totalQuizzes}`);

if (allPassed) {
  console.log('\n🏆 PHASE 05 100% PERFECT PASS! All 3 Advanced chapters meet highest standards.');
  process.exit(0);
} else {
  console.log('\n❌ Phase 05 has failed checks.');
  process.exit(1);
}
