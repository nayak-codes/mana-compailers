const fs = require('fs');
const path = require('path');

const cppDir = path.join(__dirname, '../public/blog-cpp');
if (!fs.existsSync(cppDir)) fs.mkdirSync(cppDir, { recursive: true });

const LESSONS = [
  // PHASE 1: బేసిక్స్ & ఫండమెంటల్స్
  {
    num: 1,
    id: "01",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "బేసిక్స్ & ఫండమెంటల్స్",
    file: "01-cpp-introduction-and-hello-world.html",
    title: "C++ పరిచయం & Hello World",
    subtopics: "Bjarne Stroustrup హిస్టరీ · Zero-overhead Principle · 4-దశల కంపైలేషన్ పైప్‌లైన్ · std::cout, endl vs \\n · using namespace std వివాదం",
    prev: null,
    next: { file: "02-cpp-variables-data-types.html", title: "2. వేరియబుల్స్, డేటా టైప్స్ & auto" }
  },
  {
    num: 2,
    id: "02",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "బేసిక్స్ & ఫండమెంటల్స్",
    file: "02-cpp-variables-data-types.html",
    title: "వేరియబుల్స్, డేటా టైప్స్ & auto",
    subtopics: "ప్రిమిటివ్ డేటా టైప్స్ · sizeof ఆపరేటర్ · auto టైప్ ఇన్ఫరెన్స్ · const & constexpr · వేరియబుల్ స్కోప్",
    prev: { file: "01-cpp-introduction-and-hello-world.html", title: "1. C++ పరిచయం & Hello World" },
    next: { file: "03-cpp-input-output-cin-cout.html", title: "3. ఇన్‌పుట్ & అవుట్‌పుట్ (cin, cout)" }
  },
  {
    num: 3,
    id: "03",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "బేసిక్స్ & ఫండమెంటల్స్",
    file: "03-cpp-input-output-cin-cout.html",
    title: "ఇన్‌పుట్ & అవుట్‌పుట్ (cin, cout)",
    subtopics: "std::cin స్ట్రీమ్ ఎక్స్‌ట్రాక్షన్ · std::getline() ఫుల్ లైన్ రీడింగ్ · బఫర్ క్లియరింగ్ (cin.ignore) · ఫార్మాటింగ్ (iomanip, setw, setprecision)",
    prev: { file: "02-cpp-variables-data-types.html", title: "2. వేరియబుల్స్ & డేటా టైప్స్" },
    next: { file: "04-cpp-operators-and-expressions.html", title: "4. ఆపరేటర్లు & ఎక్స్‌ప్రెషన్స్" }
  },
  {
    num: 4,
    id: "04",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "బేసిక్స్ & ఫండమెంటల్స్",
    file: "04-cpp-operators-and-expressions.html",
    title: "ఆపరేటర్లు & ఎక్స్‌ప్రెషన్స్",
    subtopics: "అరిథ్‌మెటిక్, రిలేషనల్, లాజికల్ · బిట్‌వైజ్ ఆపరేటర్లు · Ternary (?:) · Operator Precedence & Associativity · Type Casting (static_cast)",
    prev: { file: "03-cpp-input-output-cin-cout.html", title: "3. ఇన్‌పుట్ & అవుట్‌పుట్" },
    next: { file: "05-cpp-if-else-conditionals.html", title: "5. డెసిషన్ మేకింగ్ (if-else)" }
  },

  // PHASE 2: కంట్రోల్ ఫ్లో & లూప్స్
  {
    num: 5,
    id: "05",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో & లూప్స్",
    file: "05-cpp-if-else-conditionals.html",
    title: "డెసిషన్ మేకింగ్ (if, else if, else)",
    subtopics: "if-else కండిషన్స్ · if with initializer (C++17) · Nested if · షార్ట్-సర్క్యూట్ ఎవాల్యుయేషన్ · బెస్ట్ ప్రాక్టీసెస్",
    prev: { file: "04-cpp-operators-and-expressions.html", title: "4. ఆపరేటర్లు & ఎక్స్‌ప్రెషన్స్" },
    next: { file: "06-cpp-switch-case.html", title: "6. switch స్టేట్‌మెంట్" }
  },
  {
    num: 6,
    id: "06",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో & లూప్స్",
    file: "06-cpp-switch-case.html",
    title: "switch స్టేట్‌మెంట్ & Fall-through",
    subtopics: "switch-case సింటాక్స్ · break కీవర్డ్ · [[fallthrough]] అట్రిబ్యూట్ · switch with initializer (C++17) · Enum తో switch",
    prev: { file: "05-cpp-if-else-conditionals.html", title: "5. డెసిషన్ మేకింగ్" },
    next: { file: "07-cpp-loops-for-while-do-while.html", title: "7. లూప్స్" }
  },
  {
    num: 7,
    id: "07",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో & లూప్స్",
    file: "07-cpp-loops-for-while-do-while.html",
    title: "లూప్స్ (for, while, do-while)",
    subtopics: "for లూప్ · while లూప్ · do-while లూప్ · Modern Range-based for లూప్ (for (auto x : collection)) · ఇన్ఫైనైట్ లూప్ నివారణ",
    prev: { file: "06-cpp-switch-case.html", title: "6. switch స్టేట్‌మెంట్" },
    next: { file: "08-cpp-break-continue.html", title: "8. break & continue" }
  },
  {
    num: 8,
    id: "08",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో & లూప్స్",
    file: "08-cpp-break-continue.html",
    title: "break, continue & లూప్ కంట్రోల్",
    subtopics: "break తో ఎర్లీ ఎగ్జిట్ · continue తో ఇటరేషన్ స్కిప్ · నెస్టెడ్ లూప్స్ లో ఫ్లో కంట్రోల్ · goto ని ఎందుకు నివారించాలి",
    prev: { file: "07-cpp-loops-for-while-do-while.html", title: "7. లూప్స్" },
    next: { file: "09-cpp-functions-and-overloading.html", title: "9. ఫంక్షన్స్" }
  },

  // PHASE 3: ఫంక్షన్స్, మెమరీ & పాయింటర్లు
  {
    num: 9,
    id: "09",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "ఫంక్షన్స్, మెమరీ & పాయింటర్లు",
    file: "09-cpp-functions-and-overloading.html",
    title: "ఫంక్షన్స్ & Function Overloading",
    subtopics: "డిక్లరేషన్ & డెఫినిషన్ · Pass by Value vs Pass by Reference (&) · Default Arguments · Function Overloading · Inline Functions",
    prev: { file: "08-cpp-break-continue.html", title: "8. break & continue" },
    next: { file: "10-cpp-arrays-and-strings.html", title: "10. అర్రేలు & std::string" }
  },
  {
    num: 10,
    id: "10",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "ఫంక్షన్స్, మెమరీ & పాయింటర్లు",
    file: "10-cpp-arrays-and-strings.html",
    title: "అర్రేలు (Arrays) & std::string",
    subtopics: "C-style Arrays vs std::array · 2D Arrays · std::string మెథడ్స్ · std::string_view (C++17 జీరో-కాపీ స్ట్రింగ్స్)",
    prev: { file: "09-cpp-functions-and-overloading.html", title: "9. ఫంక్షన్స్" },
    next: { file: "11-cpp-pointers-and-references.html", title: "11. పాయింటర్లు & రిఫరెన్సెస్" }
  },
  {
    num: 11,
    id: "11",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "ఫంక్షన్స్, మెమరీ & పాయింటర్లు",
    file: "11-cpp-pointers-and-references.html",
    title: "పాయింటర్లు & రిఫరెన్సెస్",
    subtopics: "మెమరీ అడ్రస్ (&) & డీరిఫరెన్సింగ్ (*) · Pointer Arithmetic · nullptr vs NULL · References vs Pointers · const Pointers",
    prev: { file: "10-cpp-arrays-and-strings.html", title: "10. అర్రేలు & std::string" },
    next: { file: "12-cpp-dynamic-memory-smart-pointers.html", title: "12. డైనమిక్ మెమరీ & Smart Pointers" }
  },
  {
    num: 12,
    id: "12",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "ఫంక్షన్స్, మెమరీ & పాయింటర్లు",
    file: "12-cpp-dynamic-memory-smart-pointers.html",
    title: "డైనమిక్ మెమరీ & Smart Pointers",
    subtopics: "new & delete ఆపరేటర్లు · మెమరీ లీక్స్ & డాంగ్లింగ్ పాయింటర్లు · RAII సూత్రం · std::unique_ptr · std::shared_ptr & std::weak_ptr",
    prev: { file: "11-cpp-pointers-and-references.html", title: "11. పాయింటర్లు & రిఫరెన్సెస్" },
    next: { file: "13-cpp-classes-and-objects.html", title: "13. క్లాసెస్ & ఆబ్జెక్ట్స్" }
  },

  // PHASE 4: ఆబ్జెక్ట్ ఓరియెంటెడ్ OOP
  {
    num: 13,
    id: "13",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఆబ్జెక్ట్ ఓరియెంటెడ్ OOP",
    file: "13-cpp-classes-and-objects.html",
    title: "క్లాసెస్, ఆబ్జెక్ట్స్ & Encapsulation",
    subtopics: "Class vs Struct · Access Specifiers (public, private, protected) · Getters & Setters · this పాయింటర్ · const Member Functions",
    prev: { file: "12-cpp-dynamic-memory-smart-pointers.html", title: "12. డైనమిక్ మెమరీ" },
    next: { file: "14-cpp-constructors-and-destructors.html", title: "14. Constructors & Destructors" }
  },
  {
    num: 14,
    id: "14",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఆబ్జెక్ట్ ఓరియెంటెడ్ OOP",
    file: "14-cpp-constructors-and-destructors.html",
    title: "Constructors, Destructors & RAII",
    subtopics: "Default, Parameterized & Copy Constructor · Member Initializer Lists · Destructors · Rule of Three / Five / Zero",
    prev: { file: "13-cpp-classes-and-objects.html", title: "13. క్లాసెస్ & ఆబ్జెక్ట్స్" },
    next: { file: "15-cpp-inheritance.html", title: "15. ఇన్హెరిటెన్స్" }
  },
  {
    num: 15,
    id: "15",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఆబ్జెక్ట్ ఓరియెంటెడ్ OOP",
    file: "15-cpp-inheritance.html",
    title: "ఇన్హెరిటెన్స్ (Inheritance)",
    subtopics: "సింగిల్, మల్టీలెవల్, మల్టిపుల్ ఇన్హెరిటెన్స్ · protected యాక్సెస్ · Constructor Chaining · Diamond Problem & Virtual Base Classes",
    prev: { file: "14-cpp-constructors-and-destructors.html", title: "14. Constructors & Destructors" },
    next: { file: "16-cpp-polymorphism-virtual-functions.html", title: "16. పాలిమార్ఫిజమ్" }
  },
  {
    num: 16,
    id: "16",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఆబ్జెక్ట్ ఓరియెంటెడ్ OOP",
    file: "16-cpp-polymorphism-virtual-functions.html",
    title: "పాలిమార్ఫిజమ్ & Virtual Functions",
    subtopics: "Compile-time vs Run-time Polymorphism · virtual కీవర్డ్ · override & final · Pure Virtual Functions & Abstract Classes · vtable మెకానిక్స్",
    prev: { file: "15-cpp-inheritance.html", title: "15. ఇన్హెరిటెన్స్" },
    next: { file: "17-cpp-operator-overloading.html", title: "17. ఆపరేటర్ ఓవర్‌లోడింగ్" }
  },
  {
    num: 17,
    id: "17",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఆబ్జెక్ట్ ఓరియెంటెడ్ OOP",
    file: "17-cpp-operator-overloading.html",
    title: "ఆపరేటర్ ఓవర్‌లోడింగ్ & Friends",
    subtopics: "ఓవర్‌లోడింగ్ (+, -, ==, <<, >>) · Member vs Non-member Operators · friend ఫంక్షన్లు & friend క్లాసెస్ · Subscript Operator ([])",
    prev: { file: "16-cpp-polymorphism-virtual-functions.html", title: "16. పాలిమార్ఫిజమ్" },
    next: { file: "18-cpp-templates-generic-programming.html", title: "18. టెంప్లేట్లు" }
  },

  // PHASE 5: అడ్వాన్స్‌డ్ C++, STL & ప్రాజెక్ట్
  {
    num: 18,
    id: "18",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "అడ్వాన్స్‌డ్ C++, STL & ప్రాజెక్ట్",
    file: "18-cpp-templates-generic-programming.html",
    title: "టెంప్లేట్లు & Generic Programming",
    subtopics: "Function Templates · Class Templates · Non-type Template Parameters · Template Specialization · Concepts & Constraints (C++20)",
    prev: { file: "17-cpp-operator-overloading.html", title: "17. ఆపరేటర్ ఓవర్‌లోడింగ్" },
    next: { file: "19-cpp-stl-containers-and-algorithms.html", title: "19. STL కంటైనర్లు" }
  },
  {
    num: 19,
    id: "19",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "అడ్వాన్స్‌డ్ C++, STL & ప్రాజెక్ట్",
    file: "19-cpp-stl-containers-and-algorithms.html",
    title: "STL కంటైనర్లు & అల్గారిథమ్స్",
    subtopics: "std::vector, std::list, std::deque · Associative Containers (std::map, std::set) · Unordered Containers (Hash Maps) · Algorithms (sort, find, transform)",
    prev: { file: "18-cpp-templates-generic-programming.html", title: "18. టెంప్లేట్లు" },
    next: { file: "20-cpp-exception-file-handling-project.html", title: "20. ప్రాజెక్ట్ & ఎక్సెప్షన్స్" }
  },
  {
    num: 20,
    id: "20",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "అడ్వాన్స్‌డ్ C++, STL & ప్రాజెక్ట్",
    file: "20-cpp-exception-file-handling-project.html",
    title: "Exceptions, Files & Mini Project",
    subtopics: "try, catch, throw · Standard Exceptions · File I/O (std::ifstream, std::ofstream) · గ్రాండ్ ఫినాలే: పూర్తి C++ రియల్-వరల్డ్ ప్రాజెక్ట్!",
    prev: { file: "19-cpp-stl-containers-and-algorithms.html", title: "19. STL కంటైనర్లు" },
    next: null
  }
];

function buildSidebar(currentNum) {
  const phases = [
    { num: 1, tag: "Phase 01", title: "బేసిక్స్ & ఫండమెంటల్స్", icon: "⚡", count: "4 Ch" },
    { num: 2, tag: "Phase 02", title: "కంట్రోల్ ఫ్లో & లూప్స్", icon: "🔀", count: "4 Ch" },
    { num: 3, tag: "Phase 03", title: "ఫంక్షన్స్, మెమరీ & పాయింటర్లు", icon: "🧠", count: "4 Ch" },
    { num: 4, tag: "Phase 04", title: "ఆబ్జెక్ట్ ఓరియెంటెడ్ OOP", icon: "🏗️", count: "5 Ch" },
    { num: 5, tag: "Phase 05", title: "అడ్వాన్స్‌డ్ C++, STL & ప్రాజెక్ట్", icon: "🚀", count: "3 Ch" }
  ];

  let html = `  <!-- LEFT SIDEBAR ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">C++ Master Course (తెలుగు)</div>
    <a href="/blog-cpp.html" class="sidebar-home-link">⚡ C++ Course HOME (ఇండెక్స్)</a>

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
          <span class="phase-count-badge">${p.count}</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </button>
      <div class="accordion-content${openContentClass}">\n`;

    phaseLessons.forEach(l => {
      const activeClass = l.num === currentNum ? ' class="active"' : '';
      html += `        <a href="/blog-cpp/${l.file}"${activeClass}>${l.num}. ${l.title}</a>\n`;
    });

    html += `      </div>\n\n`;
  });

  html += `    </div>

    <div style="margin-top:24px; padding:16px; background:var(--bg2); border:1px solid var(--border); border-radius:10px; font-size:12px; text-align:center;">
      <div style="font-weight:700; color:#10b981; margin-bottom:4px;">ఇంటరాక్టివ్ ఎడిటర్</div>
      <a href="/online-cpp-compiler.html" style="color:var(--text); text-decoration:none; font-weight:600; display:inline-block; margin-top:6px; background:rgba(16,185,129,0.12); padding:6px 12px; border-radius:6px; border:1px solid rgba(16,185,129,0.3);">
        ▶ Try Online C++ Compiler
      </a>
      <a href="/blog.html" style="color:var(--text2); text-decoration:none; display:block; margin-top:8px;">
        📁 All Tutorials Index
      </a>
    </div>
  </aside>`;

  return html;
}

module.exports = {
  LESSONS,
  buildSidebar
};

