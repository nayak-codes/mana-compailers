const fs = require('fs');
const path = require('path');

const csharpDir = path.join(__dirname, '../public/blog-csharp');
if (!fs.existsSync(csharpDir)) fs.mkdirSync(csharpDir, { recursive: true });

const LESSONS = [
  // PHASE 1: C# ఫండమెంటల్స్ & బేసిక్స్
  {
    num: 1,
    id: "01",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "C# ఫండమెంటల్స్ & బేసిక్స్",
    file: "01-csharp-introduction-and-setup.html",
    title: "C# & .NET 8 పరిచయం, ఆర్కిటెక్చర్ & డెవలప్‌మెంట్ ఎన్విరాన్‌మెంట్",
    shortTitle: "1. C# & .NET 8 పరిచయం, ఆర్కిటెక్చర్",
    subtopics: "Anders Hejlsberg చరిత్ర · .NET SDK vs CLR vs IL · VS Code & .NET CLI (dotnet new, run) · Hello World అనాటమీ & Top-Level Statements",
    prev: null,
    next: { file: "02-csharp-variables-data-types-and-var.html", title: "2. వేరియబుల్స్ & CTS డేటా టైప్స్" }
  },
  {
    num: 2,
    id: "02",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "C# ఫండమెంటల్స్ & బేసిక్స్",
    file: "02-csharp-variables-data-types-and-var.html",
    title: "వేరియబుల్స్, CTS డేటా టైప్స్ (Value vs Reference) & var",
    shortTitle: "2. వేరియబుల్స్ & CTS డేటా టైప్స్",
    subtopics: "Common Type System (CTS) · Stack (Value Types) vs Heap (Reference Types) · var టైప్ ఇన్ఫరెన్స్ · const & readonly తేడాలు",
    prev: { file: "01-csharp-introduction-and-setup.html", title: "1. C# & .NET 8 పరిచయం" },
    next: { file: "03-csharp-user-input-type-casting-parsing.html", title: "3. యూజర్ ఇన్‌పుట్ & టైప్ కాస్టింగ్" }
  },
  {
    num: 3,
    id: "03",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "C# ఫండమెంటల్స్ & బేసిక్స్",
    file: "03-csharp-user-input-type-casting-parsing.html",
    title: "యూజర్ ఇన్‌పుట్ (Console.ReadLine), టైప్ కాస్టింగ్ & Parse / TryParse",
    shortTitle: "3. యూజర్ ఇన్‌పుట్ & టైప్ కాస్టింగ్",
    subtopics: "Console.ReadLine() · Implicit vs Explicit Casting · int.Parse() vs int.TryParse() ఎర్రర్-ఫ్రీ పార్సింగ్ · Convert క్లాస్",
    prev: { file: "02-csharp-variables-data-types-and-var.html", title: "2. వేరియబుల్స్ & డేటా టైప్స్" },
    next: { file: "04-csharp-operators-and-expressions.html", title: "4. ఆపరేటర్లు & Null-Coalescing" }
  },
  {
    num: 4,
    id: "04",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "C# ఫండమెంటల్స్ & బేసిక్స్",
    file: "04-csharp-operators-and-expressions.html",
    title: "ఆపరేటర్లు, ఎక్స్‌ప్రెషన్స్ & Null-Coalescing (??, ?.)",
    shortTitle: "4. ఆపరేటర్లు & Null-Coalescing",
    subtopics: "అర్థమెటిక్ & లాజికల్ ఆపరేటర్లు · Ternary (?:) · Null-Conditional (?.) & Null-Coalescing (??, ??=) · ఆపరేటర్ ప్రెసిడెన్స్",
    prev: { file: "03-csharp-user-input-type-casting-parsing.html", title: "3. యూజర్ ఇన్‌పుట్ & కాస్టింగ్" },
    next: { file: "05-csharp-conditional-statements-and-pattern-matching.html", title: "5. కండిషనల్ స్టేట్‌మెంట్స్" }
  },

  // PHASE 2: కంట్రోల్ ఫ్లో, లూప్స్ & ప్యాటర్న్ మ్యాచింగ్
  {
    num: 5,
    id: "05",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో, లూప్స్ & ప్యాటర్న్ మ్యాచింగ్",
    file: "05-csharp-conditional-statements-and-pattern-matching.html",
    title: "కండిషనల్ స్టేట్‌మెంట్స్ (if-else) & C# Pattern Matching",
    shortTitle: "5. కండిషనల్ స్టేట్‌మెంట్స్",
    subtopics: "if, else if, else · డాంగ్లింగ్ else నివారణ · Type Pattern & Relational Pattern Matching · switch Expressions (=>)",
    prev: { file: "04-csharp-operators-and-expressions.html", title: "4. ఆపరేటర్లు & ఎక్స్‌ప్రెషన్స్" },
    next: { file: "06-csharp-switch-case-and-switch-expressions.html", title: "6. switch & switch expressions" }
  },
  {
    num: 6,
    id: "06",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో, లూప్స్ & ప్యాటర్న్ మ్యాచింగ్",
    file: "06-csharp-switch-case-and-switch-expressions.html",
    title: "switch స్టేట్‌మెంట్ & మోడ్రన్ switch ఎక్స్‌ప్రెషన్స్",
    shortTitle: "6. switch స్టేట్‌మెంట్ & expressions",
    subtopics: "క్లాసిక్ switch-case vs C# 8+ switch expressions · when గార్డ్ కండిషన్స్ · Multiple Case Grouping · O(1) జంప్ టేబుల్",
    prev: { file: "05-csharp-conditional-statements-and-pattern-matching.html", title: "5. కండిషనల్ స్టేట్‌మెంట్స్" },
    next: { file: "07-csharp-loops-for-while-do-while-foreach.html", title: "7. లూప్స్ (for, while, foreach)" }
  },
  {
    num: 7,
    id: "07",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో, లూప్స్ & ప్యాటర్న్ మ్యాచింగ్",
    file: "07-csharp-loops-for-while-do-while-foreach.html",
    title: "లూప్స్ (for, while, do-while & foreach)",
    shortTitle: "7. లూప్స్ (for, while, foreach)",
    subtopics: "for, while, do-while లైఫ్‌సైకిల్ · foreach & IEnumerable అంతర్గత పనితీరు · ఇన్ఫినిట్ లూప్స్ · Off-by-one బగ్స్",
    prev: { file: "06-csharp-switch-case-and-switch-expressions.html", title: "6. switch స్టేట్‌మెంట్" },
    next: { file: "08-csharp-break-continue-and-nested-loops.html", title: "8. break, continue & నెస్టెడ్ లూప్స్" }
  },
  {
    num: 8,
    id: "08",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో, లూప్స్ & ప్యాటర్న్ మ్యాచింగ్",
    file: "08-csharp-break-continue-and-nested-loops.html",
    title: "break, continue & నెస్టెడ్ లూప్స్ (2D గ్రిడ్స్)",
    shortTitle: "8. break, continue & నెస్టెడ్ లూప్స్",
    subtopics: "break ఎర్లీ ఎగ్జిట్ · continue స్కిప్పింగ్ · నెస్టెడ్ లూప్స్ & 2D మ్యాట్రిక్స్ ప్రాసెసింగ్ · goto వివాదం",
    prev: { file: "07-csharp-loops-for-while-do-while-foreach.html", title: "7. లూప్స్" },
    next: { file: "09-csharp-methods-parameters-ref-out-in.html", title: "9. మెథడ్స్ & పారామీటర్స్" }
  },

  // PHASE 3: మెథడ్స్, స్ట్రింగ్స్ & కలెక్షన్స్
  {
    num: 9,
    id: "09",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "మెథడ్స్, స్ట్రింగ్స్ & కలెక్షన్స్",
    file: "09-csharp-methods-parameters-ref-out-in.html",
    title: "మెథడ్స్, పారామీటర్ మోడిఫైయర్స్ (ref, out, in, params)",
    shortTitle: "9. మెథడ్స్, పారామీటర్ మోడిఫైయర్స్",
    subtopics: "మెథడ్ సిగ్నేచర్ · Pass by Value vs ref · out మల్టిపుల్ రిటర్న్స్ · in రీడ్-ఓన్లీ రిఫరెన్స్ · params వేరియబుల్ ఆర్గ్యుమెంట్స్",
    prev: { file: "08-csharp-break-continue-and-nested-loops.html", title: "8. break & continue" },
    next: { file: "10-csharp-strings-stringbuilder-and-text-processing.html", title: "10. స్ట్రింగ్స్ & StringBuilder" }
  },
  {
    num: 10,
    id: "10",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "మెథడ్స్, స్ట్రింగ్స్ & కలెక్షన్స్",
    file: "10-csharp-strings-stringbuilder-and-text-processing.html",
    title: "స్ట్రింగ్స్, ఇమ్యుటబిలిటీ & StringBuilder ఆప్టిమైజేషన్",
    shortTitle: "10. స్ట్రింగ్స్ & StringBuilder",
    subtopics: "String Immutability & String Pool · String Interpolation ($) · StringBuilder హై-పెర్ఫార్మెన్స్ లూప్స్ · Raw String Literals (\"\"\")",
    prev: { file: "09-csharp-methods-parameters-ref-out-in.html", title: "9. మెథడ్స్ & పారామీటర్స్" },
    next: { file: "11-csharp-arrays-1d-multidimensional-jagged.html", title: "11. అర్రేలు (1D & Jagged)" }
  },
  {
    num: 11,
    id: "11",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "మెథడ్స్, స్ట్రింగ్స్ & కలెక్షన్స్",
    file: "11-csharp-arrays-1d-multidimensional-jagged.html",
    title: "అర్రేలు (1D, 2D Rectangular & Jagged Arrays)",
    shortTitle: "11. అర్రేలు (1D, 2D & Jagged)",
    subtopics: "1D అర్రేస్ · 2D రెక్టాంగ్యులర్ [,] vs జాగ్‌డ్ అర్రేస్ [][] (Array of Arrays) · Array క్లాస్ మెథడ్స్ (Sort, Reverse, IndexOf)",
    prev: { file: "10-csharp-strings-stringbuilder-and-text-processing.html", title: "10. స్ట్రింగ్స్ & StringBuilder" },
    next: { file: "12-csharp-collections-and-generics-list-dict.html", title: "12. జెనెరిక్ కలెక్షన్స్ (List, Dict)" }
  },
  {
    num: 12,
    id: "12",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "మెథడ్స్, స్ట్రింగ్స్ & కలెక్షన్స్",
    file: "12-csharp-collections-and-generics-list-dict.html",
    title: "జెనెరిక్ కలెక్షన్స్ (List<T>, Dictionary<TKey, TValue>, HashSet<T>)",
    shortTitle: "12. జెనెరిక్ కలెక్షన్స్",
    subtopics: "Non-generic (ArrayList Boxing/Unboxing) సమస్య · List<T> డైనమిక్ అరే · Dictionary<TKey, TValue> O(1) లూకప్ · HashSet<T> యూనిక్ సెట్",
    prev: { file: "11-csharp-arrays-1d-multidimensional-jagged.html", title: "11. అర్రేలు" },
    next: { file: "13-csharp-classes-objects-and-constructors.html", title: "13. క్లాసెస్, ఆబ్జెక్ట్స్ & కన్‌స్ట్రక్టర్స్" }
  },

  // PHASE 4: ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP)
  {
    num: 13,
    id: "13",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP)",
    file: "13-csharp-classes-objects-and-constructors.html",
    title: "క్లాసెస్, ఆబ్జెక్ట్స్ & కన్‌స్ట్రక్టర్స్ (Primary Constructors)",
    shortTitle: "13. క్లాసెస్ & కన్‌స్ట్రక్టర్స్",
    subtopics: "క్లాస్ బ్లూప్రింట్ · new ఆపరేటర్ & Heap అలోకేషన్ · డీఫాల్ట్ & పారామీటరైజ్డ్ కన్‌స్ట్రక్టర్స్ · C# 12 Primary Constructors",
    prev: { file: "12-csharp-collections-and-generics-list-dict.html", title: "12. జెనెరిక్ కలెక్షన్స్" },
    next: { file: "14-csharp-properties-and-encapsulation.html", title: "14. ఎన్‌క్యాప్సులేషన్ & Auto-Properties" }
  },
  {
    num: 14,
    id: "14",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP)",
    file: "14-csharp-properties-and-encapsulation.html",
    title: "ఎన్‌క్యాప్సులేషన్, యాక్సెస్ మోడిఫైయర్స్ & Auto-Properties",
    shortTitle: "14. ఎన్‌క్యాప్సులేషన్ & Properties",
    subtopics: "public, private, protected, internal · Getters & Setters · Auto-Implemented Properties { get; set; } · init-only యాక్సెసర్స్",
    prev: { file: "13-csharp-classes-objects-and-constructors.html", title: "13. క్లాసెస్ & ఆబ్జెక్ట్స్" },
    next: { file: "15-csharp-inheritance-and-polymorphism.html", title: "15. ఇన్‌హెరిటెన్స్ & పాలిమార్ఫిజం" }
  },
  {
    num: 15,
    id: "15",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP)",
    file: "15-csharp-inheritance-and-polymorphism.html",
    title: "ఇన్‌హెరిటెన్స్, పాలిమార్ఫిజం (virtual, override, sealed)",
    shortTitle: "15. ఇన్‌హెరిటెన్స్ & పాలిమార్ఫిజం",
    subtopics: "base కీవర్డ్ · Method Overriding vs Hiding (new) · virtual & override మెకానిక్స్ · sealed క్లాసులు & మెథడ్స్",
    prev: { file: "14-csharp-properties-and-encapsulation.html", title: "14. ఎన్‌క్యాప్సులేషన్" },
    next: { file: "16-csharp-interfaces-abstract-classes-records.html", title: "16. ఇంటర్‌ఫేసెస్ & Records" }
  },
  {
    num: 16,
    id: "16",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP)",
    file: "16-csharp-interfaces-abstract-classes-records.html",
    title: "ఇంటర్‌ఫేసెస్, అబ్‌స్ట్రాక్ట్ క్లాసెస్ & C# Records",
    shortTitle: "16. ఇంటర్‌ఫేసెస్ & Records",
    subtopics: "abstract classes vs interfaces · Multiple Interface Implementation · Decoupling & DI పునాది · record ఇమ్యుటబుల్ డేటా ఆబ్జెక్ట్స్",
    prev: { file: "15-csharp-inheritance-and-polymorphism.html", title: "15. ఇన్‌హెరిటెన్స్" },
    next: { file: "17-csharp-exception-handling-try-catch-finally.html", title: "17. ఎక్సెప్షన్ హ్యాండ్లింగ్" }
  },

  // PHASE 5: అడ్వాన్స్‌డ్ C#, LINQ & ప్రాజెక్ట్
  {
    num: 17,
    id: "17",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "అడ్వాన్స్‌డ్ C#, LINQ & ప్రాజెక్ట్",
    file: "17-csharp-exception-handling-try-catch-finally.html",
    title: "ఎక్సెప్షన్ హ్యాండ్లింగ్ (try, catch, finally, custom exceptions)",
    shortTitle: "17. ఎక్సెప్షన్ హ్యాండ్లింగ్",
    subtopics: "రన్‌టైమ్ ఎర్రర్ హ్యాండ్లింగ్ · Exception hierarchy · when ఫిల్టర్లు · using స్టేట్‌మెంట్ & IDisposable రీసోర్స్ క్లీనప్",
    prev: { file: "16-csharp-interfaces-abstract-classes-records.html", title: "16. ఇంటర్‌ఫేసెస్ & Records" },
    next: { file: "18-csharp-delegates-events-and-lambdas.html", title: "18. డెలిగేట్స్, ఈవెంట్స్ & లాంబ్డా" }
  },
  {
    num: 18,
    id: "18",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "అడ్వాన్స్‌డ్ C#, LINQ & ప్రాజెక్ట్",
    file: "18-csharp-delegates-events-and-lambdas.html",
    title: "డెలిగేట్స్ (Delegates), ఈవెంట్స్ & లాంబ్డా ఎక్స్‌ప్రెషన్స్ (=>)",
    shortTitle: "18. డెలిగేట్స్, ఈవెంట్స్ & లాంబ్డా",
    subtopics: "Function Pointers C# సమానం · Func<T>, Action<T>, Predicate<T> · Publisher-Subscriber Events · Lambda Expressions (x => x * 2)",
    prev: { file: "17-csharp-exception-handling-try-catch-finally.html", title: "17. ఎక్సెప్షన్ హ్యాండ్లింగ్" },
    next: { file: "19-csharp-linq-language-integrated-query.html", title: "19. LINQ (Language Integrated Query)" }
  },
  {
    num: 19,
    id: "19",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "అడ్వాన్స్‌డ్ C#, LINQ & ప్రాజెక్ట్",
    file: "19-csharp-linq-language-integrated-query.html",
    title: "LINQ (Language Integrated Query) — డేటా ప్రాసెసింగ్ పవర్‌హౌస్",
    shortTitle: "19. LINQ — క్వెరీ పవర్‌హౌస్",
    subtopics: "Query Syntax vs Method Syntax · Where, Select, OrderBy, GroupBy · Deferred Execution vs Immediate Execution (ToList)",
    prev: { file: "18-csharp-delegates-events-and-lambdas.html", title: "18. డెలిగేట్స్ & ఈవెంట్స్" },
    next: { file: "20-csharp-mini-project-employee-management.html", title: "20. గ్రాండ్ మినీ ప్రాజెక్ట్" }
  },
  {
    num: 20,
    id: "20",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "అడ్వాన్స్‌డ్ C#, LINQ & ప్రాజెక్ట్",
    file: "20-csharp-mini-project-employee-management.html",
    title: "కంప్లీట్ మినీ ప్రాజెక్ట్: ఎంప్లాయ్ మేనేజ్‌మెంట్ సిస్టమ్ (LINQ & JSON)",
    shortTitle: "20. ఎంప్లాయ్ మేనేజ్‌మెంట్ సిస్టమ్",
    subtopics: "OOPs · Generics · LINQ క్వెరీలు · System.Text.Json ఫైల్ సేవింగ్ తో పూర్తి స్థాయి రియల్-వరల్డ్ C# ప్రాజెక్ట్!",
    prev: { file: "19-csharp-linq-language-integrated-query.html", title: "19. LINQ క్వెరీలు" },
    next: null
  }
];

function buildSidebar(currentNum) {
  const phases = [
    { num: 1, tag: "Phase 01", title: "C# ఫండమెంటల్స్ & బేసిక్స్", icon: "⚡" },
    { num: 2, tag: "Phase 02", title: "కంట్రోల్ ఫ్లో, లూప్స్ & ప్యాటర్న్ మ్యాచింగ్", icon: "🔀" },
    { num: 3, tag: "Phase 03", title: "మెథడ్స్, స్ట్రింగ్స్ & కలెక్షన్స్", icon: "📦" },
    { num: 4, tag: "Phase 04", title: "ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP)", icon: "🏛️" },
    { num: 5, tag: "Phase 05", title: "అడ్వాన్స్‌డ్ C#, LINQ & ప్రాజెక్ట్", icon: "🚀" }
  ];

  let html = `  <!-- LEFT SIDEBAR ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">C# Master Course (తెలుగు)</div>
    <a href="/blog-csharp.html" class="sidebar-home-link">⚡ C# Course HOME (ఇండెక్స్)</a>

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
      <div class="accordion-content${openContentClass}">
        <ul class="lesson-list">\n`;

    phaseLessons.forEach(l => {
      const isCurrent = l.num === currentNum;
      const activeItemClass = isCurrent ? " active" : "";
      const activeLinkClass = isCurrent ? " active" : "";

      html += `          <li class="lesson-item${activeItemClass}">
            <a href="/blog-csharp/${l.file}" class="lesson-link${activeLinkClass}">
              <span class="lesson-num">${l.num}.</span>
              <span class="lesson-name">${l.shortTitle || l.title}</span>
            </a>
          </li>\n`;
    });

    html += `        </ul>
      </div>\n`;
  });

  html += `    </div>
    <div style="margin-top:24px; padding:16px; background:var(--bg2); border:1px solid var(--border); border-radius:10px; font-size:12px; text-align:center;">
      <div style="font-weight:700; color:#10b981; margin-bottom:4px;">ఇంటరాక్టివ్ ఎడిటర్</div>
      <a href="/online-csharp-compiler.html" style="color:var(--text); text-decoration:none; font-weight:600; display:inline-block; margin-top:6px; background:rgba(16,185,129,0.12); padding:6px 12px; border-radius:6px; border:1px solid rgba(16,185,129,0.3);">
        ▶ Try C# Online Compiler
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
