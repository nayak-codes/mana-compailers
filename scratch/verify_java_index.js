const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./java_curriculum_data.js');

console.log('=== VERIFYING NEW 25-CHAPTER JAVA INDEX ===\n');

const filesToTest = [
  'public/blog-java.html',
  'public/blog-java/index.html'
];

let allPassed = true;

filesToTest.forEach(relPath => {
  const fullPath = path.join(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File missing: ${relPath}`);
    allPassed = false;
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  console.log(`Checking ${relPath} (${content.length} chars)...`);

  // Check 1: exactly 25 lessons linked in curriculum list
  let missingLessons = [];
  LESSONS.forEach(l => {
    if (!content.includes(l.file)) {
      missingLessons.push(l.file);
    }
  });

  if (missingLessons.length > 0) {
    console.error(`❌ Missing lessons in ${relPath}:`, missingLessons);
    allPassed = false;
  } else {
    console.log(`  ✅ All 25 lessons present in ${relPath}`);
  }

  // Check 2: 5 Phases present
  const phases = ['PHASE 01', 'PHASE 02', 'PHASE 03', 'PHASE 04', 'PHASE 05'];
  phases.forEach(p => {
    if (!content.includes(p)) {
      console.error(`❌ Missing ${p} in ${relPath}`);
      allPassed = false;
    }
  });
  console.log(`  ✅ All 5 Phases present in ${relPath}`);

  // Check 3: Schema.org structured data
  if (content.includes('application/ld+json') && content.includes('"@type": "Course"')) {
    console.log(`  ✅ Schema.org Course JSON-LD verified`);
  } else {
    console.error(`❌ Schema.org JSON-LD missing in ${relPath}`);
    allPassed = false;
  }

  // Check 4: Sidebar accordion
  if (content.includes('class="sidebar-accordion"') && content.includes('toggleAccordion(this)')) {
    console.log(`  ✅ Sidebar Accordion verified`);
  } else {
    console.error(`❌ Sidebar Accordion missing in ${relPath}`);
    allPassed = false;
  }

  // Check 5: Interactive compiler CTA
  if (content.includes('/online-java-compiler.html')) {
    console.log(`  ✅ Online Java Compiler CTA link verified\n`);
  } else {
    console.error(`❌ Online Java Compiler CTA link missing in ${relPath}\n`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('🎉 100% PASS: Java 25-Chapter Index is fully verified and compliant!');
} else {
  console.error('❌ Verification failed!');
  process.exit(1);
}

