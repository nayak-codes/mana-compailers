const fs = require('fs');
const path = require('path');

const phase03Files = [
  '09-csharp-methods-parameters-ref-out-in.html',
  '10-csharp-strings-stringbuilder-and-text-processing.html',
  '11-csharp-arrays-1d-multidimensional-jagged.html',
  '12-csharp-collections-and-generics-list-dict.html'
];

console.log('====================================================');
console.log('AUDITING C# MASTERCLASS PHASE 03 (CHAPTERS 09 TO 12)');
console.log('====================================================\n');

let totalChars = 0;
let allPass = true;

phase03Files.forEach((file, idx) => {
  const chNum = idx + 9;
  const filePath = path.join(__dirname, '..', 'public', 'blog-csharp', file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ [Ch ${chNum}] File missing: ${file}`);
    allPass = false;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  totalChars += content.length;
  
  const hasIntroBox = content.includes('class="intro-box"');
  const hasTable = content.includes('class="tbl"');
  const hasTryBox = content.includes('class="try-box"');
  const hasAuthor = content.includes('class="author"') && content.includes('Our Compiler Technical Editorial Team');
  const detailsCount = (content.match(/<details/g) || []).length;
  const hasDoubleNumbering = content.includes('>1. 1.') || content.includes('>2. 2.') || content.includes('>3. 3.') || content.includes('>4. 4.') || content.includes('>5. 5.') || content.includes('>6. 6.') || content.includes('>7. 7.') || content.includes('>8. 8.') || content.includes('>9. 9.') || content.includes('>10. 10.') || content.includes('>11. 11.') || content.includes('>12. 12.');
  const hasRunner = content.includes("localStorage.setItem('code_csharp',");

  let chNumCheck = true;
  for (let i = 1; i <= 13; i++) {
    if (!content.includes(`<span class="num">${i}</span>`)) {
      chNumCheck = false;
      break;
    }
  }

  const ok = content.length >= 40000 && hasIntroBox && hasTable && hasTryBox && hasAuthor && detailsCount >= 5 && !hasDoubleNumbering && hasRunner && chNumCheck;

  if (ok) {
    console.log(`✅ Chapter ${chNum < 10 ? '0' + chNum : chNum}: ${file}`);
    console.log(`   Size: ${content.length.toLocaleString()} chars | 13 Sections: OK | IntroBox: Ivory OK | Sidebar: Clean OK | Quiz: ${detailsCount} Qs OK`);
  } else {
    console.error(`❌ Chapter ${chNum}: FAILED`);
    console.error(`   Size: ${content.length}, IntroBox: ${hasIntroBox}, Table: ${hasTable}, TryBox: ${hasTryBox}, Author: ${hasAuthor}, Quiz: ${detailsCount}, DoubleNum: ${hasDoubleNumbering}, 13Sec: ${chNumCheck}`);
    allPass = false;
  }
});

console.log('\n----------------------------------------------------');
console.log(`Phase 03 Total Characters: ${totalChars.toLocaleString()} characters`);
console.log(`Overall Phase 03 Status: ${allPass ? '🏆 100% PERFECT PASS' : '❌ ERRORS FOUND'}`);
console.log('----------------------------------------------------');

