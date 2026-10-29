const fs = require('fs');
const path = require('path');

const cDir = path.join(__dirname, '../public/blog-c');
if (!fs.existsSync(cDir)) fs.mkdirSync(cDir, { recursive: true });

const LESSONS = [
  // PHASE 1: BASICS & MEMORY ARCHITECTURE
  {
    num: 1,
    id: "01",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "బేసిక్స్ & మెమరీ ఆర్కిటెక్చర్",
    file: "01-c-introduction-and-hello-world.html",
    title: "C పరిచయం, చరిత్ర & మొదటి ప్రోగ్రామ్ (Hello World)",
    subtopics: "Dennis Ritchie హిస్టరీ · GCC కంపైలర్ పైప్‌లైన్ (4 Stages) · main() ఎగ్జిక్యూషన్ · printf() మెకానిక్స్ · return 0 ప్రాముఖ్యత",
    prev: null,
    next: { file: "02-c-variables-data-types-constants.html", title: "2. వేరియబుల్స్ & డేటా టైప్స్" }
  },
  {
    num: 2,
    id: "02",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "బేసిక్స్ & మెమరీ ఆర్కిటెక్చర్",
    file: "02-c-variables-data-types-constants.html",
    title: "వేరియబుల్స్, డేటా టైప్స్, కాన్‌స్టాంట్స్ & మెమరీ మోడల్",
    subtopics: "RAM మెమరీ స్లాట్లు (Bytes) · char, int, float, double · sizeof ఆపరేటర్ · const కీవర్డ్ · Signed vs Unsigned ఓవర్‌ఫ్లో",
    prev: { file: "01-c-introduction-and-hello-world.html", title: "1. C పరిచయం & Hello World" },
    next: { file: "03-c-user-input-scanf-format-specifiers.html", title: "3. యూజర్ ఇన్‌పుట్ (scanf)" }
  },
  {
    num: 3,
    id: "03",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "బేసిక్స్ & మెమరీ ఆర్కిటెక్చర్",
    file: "03-c-user-input-scanf-format-specifiers.html",
    title: "యూజర్ ఇన్‌పుట్ (scanf), ఫార్మాట్ స్పెసిఫైయర్లు & బఫర్ హ్యాండ్లింగ్",
    subtopics: "%d, %f, %c, %s స్పెసిఫైయర్లు · & (Address-of) రహస్యం · ది డేంజరస్ scanf న్యూలైన్ బఫర్ ట్రాప్ & getchar() పరిష్కారం",
    prev: { file: "02-c-variables-data-types-constants.html", title: "2. వేరియబుల్స్ & డేటా టైప్స్" },
    next: { file: "04-c-operators-and-expressions.html", title: "4. ఆపరేటర్లు & ఎక్స్‌ప్రెషన్స్" }
  },
  {
    num: 4,
    id: "04",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "బేసిక్స్ & మెమరీ ఆర్కిటెక్చర్",
    file: "04-c-operators-and-expressions.html",
    title: "ఆపరేటర్లు, ఎక్స్‌ప్రెషన్స్ & ప్రిసిడెన్స్ నియమాలు",
    subtopics: "అరిథ్‌మెటిక్, రిలేషనల్, లాజికల్ · Prefix (++i) vs Postfix (i++) మెమరీ తేడా · షార్ట్-సర్క్యూట్ · టైప్ కాస్టింగ్ ((float)a/b)",
    prev: { file: "03-c-user-input-scanf-format-specifiers.html", title: "3. యూజర్ ఇన్‌పుట్ (scanf)" },
    next: { file: "05-c-if-else-conditionals.html", title: "5. డెసిషన్ మేకింగ్ (if-else)" }
  },

  // PHASE 2: CONTROL FLOW & LOOPS
  {
    num: 5,
    id: "05",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో & లూప్స్",
    file: "05-c-if-else-conditionals.html",
    title: "కండిషనల్ స్టేట్‌మెంట్స్ (if, else if, else & Nested Branches)",
    subtopics: "డెసిషన్ మేకింగ్ లాజిక్ · ATM క్యాష్ విత్‌డ్రా చెక్ · గ్రేడింగ్ సిస్టమ్ · డాంగ్లింగ్ else సమస్య · అసైన్‌మెంట్ ట్రాప్ if (x = 5)",
    prev: { file: "04-c-operators-and-expressions.html", title: "4. ఆపరేటర్లు & ఎక్స్‌ప్రెషన్స్" },
    next: { file: "06-c-switch-case-decision-making.html", title: "6. switch స్టేట్‌మెంట్" }
  },
  {
    num: 6,
    id: "06",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో & లూప్స్",
    file: "06-c-switch-case-decision-making.html",
    title: "switch-case స్టేట్‌మెంట్ & మెనూ డ్రివెన్ ప్రోగ్రామింగ్",
    subtopics: "O(1) Jump Table ఆర్కిటెక్చర్ vs else-if · break ప్రాముఖ్యత · Fall-through మెకానిక్స్ · క్యాలిక్యులేటర్ ప్రాజెక్ట్",
    prev: { file: "05-c-if-else-conditionals.html", title: "5. డెసిషన్ మేకింగ్ (if-else)" },
    next: { file: "07-c-loops-while-do-while-for.html", title: "7. లూప్స్ (for, while)" }
  },
  {
    num: 7,
    id: "07",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో & లూప్స్",
    file: "07-c-loops-while-do-while-for.html",
    title: "లూప్స్ (for, while, do-while)",
    subtopics: "4 దశల ఎగ్జిక్యూషన్ చక్రం · ఎంట్రీ vs ఎగ్జిట్ కంట్రోల్ తేడాలు · ఇన్ఫినిట్ లూప్స్ · ఆఫ్-బై-వన్ బగ్స్ నివారణ",
    prev: { file: "06-c-switch-case-decision-making.html", title: "6. switch స్టేట్‌మెంట్" },
    next: { file: "08-c-break-continue-nested-loops.html", title: "8. break, continue & ప్యాటర్న్స్" }
  },
  {
    num: 8,
    id: "08",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో & లూప్స్",
    file: "08-c-break-continue-nested-loops.html",
    title: "break, continue, నెస్టెడ్ లూప్స్ & ప్యాటర్న్స్",
    subtopics: "లీనియర్ సెర్చ్ ఎర్లీ ఎగ్జిట్ · continue స్కిప్పింగ్ · పిరమిడ్/స్టార్ ప్యాటర్న్స్ · goto వివాదం & స్ట్రక్చర్డ్ కోడ్",
    prev: { file: "07-c-loops-while-do-while-for.html", title: "7. లూప్స్ (for, while)" },
    next: { file: "09-c-functions-and-prototypes.html", title: "9. ఫంక్షన్స్ & కాల్ స్టాక్" }
  },

  // PHASE 3: FUNCTIONS, SCOPE & RECURSION
  {
    num: 9,
    id: "09",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "ఫంక్షన్స్, స్కోప్ & రికర్షన్",
    file: "09-c-functions-and-prototypes.html",
    title: "ఫంక్షన్స్, ఫార్వర్డ్ డిక్లరేషన్ & కాల్ స్టాక్ (Call Stack)",
    subtopics: "DRY సూత్రం · Function Prototypes ఎందుకు అవసరం? · RAM Call Stack & Activation Records · LIFO ఆర్డర్",
    prev: { file: "08-c-break-continue-nested-loops.html", title: "8. break, continue & ప్యాటర్న్స్" },
    next: { file: "10-c-parameter-passing-call-by-value-reference.html", title: "10. Call by Value vs Reference" }
  },
  {
    num: 10,
    id: "10",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "ఫంక్షన్స్, స్కోప్ & రికర్షన్",
    file: "10-c-parameter-passing-call-by-value-reference.html",
    title: "Call by Value vs Call by Reference (పాయింటర్స్ ద్వారా)",
    subtopics: "మెమరీ కాపీ vs ఒరిజినల్ అడ్రస్ పాసింగ్ · swap(&a, &b) స్వాపింగ్ పోస్ట్‌మార్టం · మల్టిపుల్ రిటర్న్ వాల్యూస్",
    prev: { file: "09-c-functions-and-prototypes.html", title: "9. ఫంక్షన్స్ & కాల్ స్టాక్" },
    next: { file: "11-c-storage-classes-and-scope.html", title: "11. వేరియబుల్ స్కోప్ & స్టోరేజ్ క్లాసెస్" }
  },
  {
    num: 11,
    id: "11",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "ఫంక్షన్స్, స్కోప్ & రికర్షన్",
    file: "11-c-storage-classes-and-scope.html",
    title: "వేరియబుల్ స్కోప్ & స్టోరేజ్ క్లాసెస్ (auto, static, extern, register)",
    subtopics: "లోకల్ vs గ్లోబల్ స్కోప్ · static వేరియబుల్ లైఫ్‌టైమ్ · CPU Register వేరియబుల్స్ · మల్టీ-ఫైల్ extern లింకేజ్",
    prev: { file: "10-c-parameter-passing-call-by-value-reference.html", title: "10. Call by Value vs Reference" },
    next: { file: "12-c-recursion-call-stack.html", title: "12. రికార్షన్ (Recursion)" }
  },
  {
    num: 12,
    id: "12",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "ఫంక్షన్స్, స్కోప్ & రికర్షన్",
    file: "12-c-recursion-call-stack.html",
    title: "రికార్షన్ (Recursion) & కాల్ స్టాక్ మెకానిక్స్",
    subtopics: "బేస్ కండిషన్ ప్రాముఖ్యత · ఫ్యాక్టోరియల్ & ఫిబోనాకి కాల్ ట్రీ · స్టాక్ ఓవర్‌ఫ్లో (Stack Overflow) ఎర్రర్ నివారణ",
    prev: { file: "11-c-storage-classes-and-scope.html", title: "11. వేరియబుల్ స్కోప్ & స్టోరేజ్ క్లాసెస్" },
    next: { file: "13-c-arrays-1d-and-2d-matrices.html", title: "13. అర్రేలు & 2D Matrices" }
  },

  // PHASE 4: ARRAYS, STRINGS & POINTERS
  {
    num: 13,
    id: "13",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "అర్రేస్, స్ట్రింగ్స్ & పాయింటర్లు",
    file: "13-c-arrays-1d-and-2d-matrices.html",
    title: "అర్రేలు (1D Arrays & 2D Matrices)",
    subtopics: "కంటిగ్యుయస్ మెమరీ బ్లాక్స్ · ఇండెక్సింగ్ మెకానిక్స్ · మ్యాట్రిక్స్ కూడిక/గుణకారం · Row-Major Order మెమరీ ఫార్ములా",
    prev: { file: "12-c-recursion-call-stack.html", title: "12. రికార్షన్ (Recursion)" },
    next: { file: "14-c-strings-character-arrays-string-h.html", title: "14. స్ట్రింగ్స్ & <string.h>" }
  },
  {
    num: 14,
    id: "14",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "అర్రేస్, స్ట్రింగ్స్ & పాయింటర్లు",
    file: "14-c-strings-character-arrays-string-h.html",
    title: "స్ట్రింగ్స్ (Character Arrays, '\\0' Null Terminator & <string.h>)",
    subtopics: "క్యారెక్టర్ అర్రేస్ · strlen, strcpy, strcat, strcmp ఫంక్షన్స్ · బఫర్ ఓవర్‌ఫ్లో సెక్యూరిటీ వల్నరబిలిటీస్",
    prev: { file: "13-c-arrays-1d-and-2d-matrices.html", title: "13. అర్రేలు & 2D Matrices" },
    next: { file: "15-c-pointers-basics-and-address-arithmetic.html", title: "15. పాయింటర్లు: బేసిక్స్" }
  },
  {
    num: 15,
    id: "15",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "అర్రేస్, స్ట్రింగ్స్ & పాయింటర్లు",
    file: "15-c-pointers-basics-and-address-arithmetic.html",
    title: "పాయింటర్లు: బేసిక్స్, మెమరీ అడ్రస్లు & Dereferencing (*, &)",
    subtopics: "పాయింటర్ అంటే ఏమిటి? · & (Address) vs * (Value-at) · పాయింటర్ అరిథ్‌మెటిక్ (ptr + 1) · NULL vs డాంగ్లింగ్ పాయింటర్లు",
    prev: { file: "14-c-strings-character-arrays-string-h.html", title: "14. స్ట్రింగ్స్ & <string.h>" },
    next: { file: "16-c-pointers-with-arrays-and-double-pointers.html", title: "16. పాయింటర్లు & అర్రేస్" }
  },
  {
    num: 16,
    id: "16",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "అర్రేస్, స్ట్రింగ్స్ & పాయింటర్లు",
    file: "16-c-pointers-with-arrays-and-double-pointers.html",
    title: "పాయింటర్లు, అర్రేస్ & Double Pointers (**ptr)",
    subtopics: "అర్రే డికే (Array Decay) రహస్యం · *(arr + i) నోటేషన్ · డబుల్ పాయింటర్లు (**ptr) · ఫంక్షన్ పాయింటర్లు (Callbacks)",
    prev: { file: "15-c-pointers-basics-and-address-arithmetic.html", title: "15. పాయింటర్లు: బేసిక్స్" },
    next: { file: "17-c-structures-unions-and-typedef.html", title: "17. స్ట్రక్చర్స్ & యూనియన్స్" }
  },

  // PHASE 5: STRUCTURES, DYNAMIC MEMORY & PROJECT
  {
    num: 17,
    id: "17",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "స్ట్రక్చర్స్, డైనమిక్ మెమరీ & ప్రాజెక్ట్",
    file: "17-c-structures-unions-and-typedef.html",
    title: "స్ట్రక్చర్స్ (struct), యూనియన్స్ (union) & typedef",
    subtopics: "హెటిరోజీనియస్ డేటా గ్రూపింగ్ · . డాట్ vs -> యారో ఆపరేటర్ · Memory Padding & Alignment · union షేర్డ్ మెమరీ",
    prev: { file: "16-c-pointers-with-arrays-and-double-pointers.html", title: "16. పాయింటర్లు & అర్రేస్" },
    next: { file: "18-c-dynamic-memory-allocation-malloc-calloc-realloc-free.html", title: "18. డైనమిక్ మెమరీ (malloc/free)" }
  },
  {
    num: 18,
    id: "18",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "స్ట్రక్చర్స్, డైనమిక్ మెమరీ & ప్రాజెక్ట్",
    file: "18-c-dynamic-memory-allocation-malloc-calloc-realloc-free.html",
    title: "డైనమిక్ మెమరీ కేటాయింపు (malloc, calloc, realloc, free)",
    subtopics: "Stack vs Heap మెమరీ · రన్‌టైమ్ అర్రే సైజింగ్ · మెమరీ లీక్స్ (Memory Leaks) · free() ప్రాముఖ్యత",
    prev: { file: "17-c-structures-unions-and-typedef.html", title: "17. స్ట్రక్చర్స్ & యూనియన్స్" },
    next: { file: "19-c-file-handling-fopen-fclose-text-binary.html", title: "19. ఫైల్ హ్యాండ్లింగ్ (Files)" }
  },
  {
    num: 19,
    id: "19",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "స్ట్రక్చర్స్, డైనమిక్ మెమరీ & ప్రాజెక్ట్",
    file: "19-c-file-handling-fopen-fclose-text-binary.html",
    title: "ఫైల్ హ్యాండ్లింగ్ (<stdio.h>, fopen, fclose, fprintf, fscanf, fread, fwrite)",
    subtopics: "టెక్స్ట్ vs బైనరీ ఫైల్స్ · r, w, a, rb, wb మోడ్స్ · FILE* పాయింటర్ · ఎర్రర్ హ్యాండ్లింగ్",
    prev: { file: "18-c-dynamic-memory-allocation-malloc-calloc-realloc-free.html", title: "18. డైనమిక్ మెమరీ (malloc/free)" },
    next: { file: "20-c-mini-project-student-record-management.html", title: "20. కంప్లీట్ మినీ ప్రాజెక్ట్" }
  },
  {
    num: 20,
    id: "20",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "స్ట్రక్చర్స్, డైనమిక్ మెమరీ & ప్రాజెక్ట్",
    file: "20-c-mini-project-student-record-management.html",
    title: "కంప్లీట్ మినీ ప్రాజెక్ట్: స్టూడెంట్ రికార్డ్ మేనేజ్‌మెంట్ సిస్టమ్",
    subtopics: "Structs · Pointers · Dynamic Allocation · File Persistence తో పూర్తి స్థాయి రియల్-వరల్డ్ C ప్రాజెక్ట్!",
    prev: { file: "19-c-file-handling-fopen-fclose-text-binary.html", title: "19. ఫైల్ హ్యాండ్లింగ్ (Files)" },
    next: null
  }
];

// Helper to build the accordion sidebar HTML
function buildSidebar(currentNum) {
  const phases = [
    { num: 1, tag: "Phase 01", title: "బేసిక్స్ & మెమరీ ఆర్కిటెక్చర్", icon: "⚡" },
    { num: 2, tag: "Phase 02", title: "కంట్రోల్ ఫ్లో & లూప్స్", icon: "🔀" },
    { num: 3, tag: "Phase 03", title: "ఫంక్షన్స్, స్కోప్ & రికర్షన్", icon: "🧠" },
    { num: 4, tag: "Phase 04", title: "అర్రేస్, స్ట్రింగ్స్ & పాయింటర్లు", icon: "📊" },
    { num: 5, tag: "Phase 05", title: "స్ట్రక్చర్స్, డైనమిక్ మెమరీ & ప్రాజెక్ట్", icon: "🚀" }
  ];

  let html = `  <!-- LEFT SIDEBAR ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">C Master Course (తెలుగు)</div>
    <a href="/blog-c.html" class="sidebar-home-link">⚡ C Course HOME (ఇండెక్స్)</a>

    <div class="sidebar-accordion">\n`;

  phases.forEach(p => {
    const phaseLessons = LESSONS.filter(l => l.phase === p.num);
    const hasActive = phaseLessons.some(l => l.num === currentNum);
    const activeHeaderClass = hasActive ? " active" : "";
    const openContentClass = hasActive ? " open" : "";

    html += `      <!-- ${p.tag} -->
      <button class="accordion-header${activeHeaderClass}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">${p.icon}</span>
          <div class="phase-info">
            <span class="phase-tag">${p.tag}</span>
            <span class="phase-title">${p.title}</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">4 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </button>
      <div class="accordion-content${openContentClass}">\n`;

    phaseLessons.forEach(l => {
      const activeClass = l.num === currentNum ? ' class="active"' : '';
      html += `        <a href="/blog-c/${l.file}"${activeClass}>${l.num}. ${l.title}</a>\n`;
    });

    html += `      </div>\n\n`;
  });

  html += `    </div>

    <div class="sidebar-heading" style="margin-top:20px;">ఇంటరాక్టివ్ ఎడిటర్</div>
    <a href="/online-c-compiler.html" style="color:#10b981; font-weight:700; text-decoration:none; padding:8px 12px; display:block;">▶ Try C Online Compiler</a>
    <a href="/blog.html" style="color:var(--text2); text-decoration:none; padding:8px 12px; display:block;">📚 All Tutorials Index</a>
  </aside>\n`;

  return html;
}

console.log('Sidebar builder ready.');
module.exports = { LESSONS, buildSidebar };

