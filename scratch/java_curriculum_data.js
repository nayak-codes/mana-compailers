const fs = require('fs');
const path = require('path');

const javaDir = path.join(__dirname, '../public/blog-java');
if (!fs.existsSync(javaDir)) fs.mkdirSync(javaDir, { recursive: true });

const LESSONS = [
  // ==========================================
  // PART 01: Basics & JVM (Ch 01 - 05)
  // ==========================================
  {
    num: 1,
    id: "01",
    phase: 1,
    phaseTag: "Part 01",
    phaseTitle: "Basics & JVM",
    file: "01-java-introduction-features-and-jvm-architecture.html",
    title: "Intro & JVM Architecture",
    fullTitle: "Java Introduction, Features & JVM Architecture (జావా పరిచయం & JVM ఆర్కిటెక్చర్)",
    subtopics: "James Gosling & Sun Microsystems హిస్టరీ · WORA కాన్సెప్ట్ · JVM vs JRE vs JDK · క్లాస్‌లోడర్, బైట్‌కోడ్, JIT కంపైలర్ & గార్బేజ్ కలెక్షన్ పరిచయం",
    prev: null,
    next: { file: "02-java-installation-ide-and-first-program.html", title: "2. Setup & First Program" }
  },
  {
    num: 2,
    id: "02",
    phase: 1,
    phaseTag: "Part 01",
    phaseTitle: "Basics & JVM",
    file: "02-java-installation-ide-and-first-program.html",
    title: "Setup & First Program",
    fullTitle: "Environment Setup, JDK 21+ & First Program (ఎన్విరాన్‌మెంట్ సెటప్ & మొదటి ప్రోగ్రామ్)",
    subtopics: "OpenJDK 21 LTS ఇన్‌స్టాలేషన్ · JAVA_HOME & PATH కాన్ఫిగరేషన్ · VS Code & IntelliJ IDEA సెటప్ · మొదటి Hello World రాయడం, javac కంపైలేషన్ & java రన్",
    prev: { file: "01-java-introduction-features-and-jvm-architecture.html", title: "1. Intro & JVM Architecture" },
    next: { file: "03-java-syntax-class-structure-and-main-method.html", title: "3. Syntax & Main Method" }
  },
  {
    num: 3,
    id: "03",
    phase: 1,
    phaseTag: "Part 01",
    phaseTitle: "Basics & JVM",
    file: "03-java-syntax-class-structure-and-main-method.html",
    title: "Syntax & Main Method",
    fullTitle: "Java Syntax, Class Structure & main() Anatomy (జావా సింటాక్స్ & మెయిన్ మెథడ్ అనాటమీ)",
    subtopics: "జావా సోర్స్ ఫైల్ నియమాలు · public class vs ఫైల్ పేరు · public static void main(String[] args) లోతైన విశ్లేషణ · సింగిల్ & మల్టీ-లైన్ కామెంట్స్",
    prev: { file: "02-java-installation-ide-and-first-program.html", title: "2. Setup & First Program" },
    next: { file: "04-java-variables-primitive-data-types-and-memory.html", title: "4. Variables & Data Types" }
  },
  {
    num: 4,
    id: "04",
    phase: 1,
    phaseTag: "Part 01",
    phaseTitle: "Basics & JVM",
    file: "04-java-variables-primitive-data-types-and-memory.html",
    title: "Variables & Data Types",
    fullTitle: "Variables, Primitive Data Types & Memory Model (వేరియబుల్స్ & డేటా టైప్స్)",
    subtopics: "8 ప్రిమిటివ్ టైప్స్ (byte to double) · సైజులు & మెమరీ పరిధులు · Stack vs Heap ఆర్కిటెక్చర్ · Modern Java 'var' లోకల్ వేరియబుల్ టైప్ ఇన్ఫరెన్స్",
    prev: { file: "03-java-syntax-class-structure-and-main-method.html", title: "3. Syntax & Main Method" },
    next: { file: "05-java-operators-expressions-and-type-casting.html", title: "5. Operators & Type Casting" }
  },
  {
    num: 5,
    id: "05",
    phase: 1,
    phaseTag: "Part 01",
    phaseTitle: "Basics & JVM",
    file: "05-java-operators-expressions-and-type-casting.html",
    title: "Operators & Type Casting",
    fullTitle: "Operators, Expressions & Type Casting (ఆపరేటర్లు & టైప్ కాస్టింగ్)",
    subtopics: "Arithmetic, Relational, Logical, Bitwise ఆపరేటర్లు · ఇంప్లిసిట్ వైడనింగ్ vs ఎక్స్‌ప్లిసిట్ నారోయింగ్ కాస్టింగ్ · Math క్లాస్ యుటిలిటీస్ & Fast I/O",
    prev: { file: "04-java-variables-primitive-data-types-and-memory.html", title: "4. Variables & Data Types" },
    next: { file: "06-java-conditional-statements-if-else.html", title: "6. if, else-if & Ternary" }
  },

  // ==========================================
  // PART 02: Control Flow & Strings (Ch 06 - 10)
  // ==========================================
  {
    num: 6,
    id: "06",
    phase: 2,
    phaseTag: "Part 02",
    phaseTitle: "Control Flow & Strings",
    file: "06-java-conditional-statements-if-else.html",
    title: "if, else-if & Ternary",
    fullTitle: "Decision Making — if, else-if, else & Ternary Operator (డెసిషన్ మేకింగ్)",
    subtopics: "if-else మరియు else-if ల్యాడర్ · నెస్టెడ్ కండిషన్స్ · షార్ట్-సర్క్యూట్ లాజిక్ (&&, ||) · Ternary Conditional Operator (? :)",
    prev: { file: "05-java-operators-expressions-and-type-casting.html", title: "5. Operators & Type Casting" },
    next: { file: "07-java-switch-statements-and-switch-expressions.html", title: "7. switch Statements & Expressions" }
  },
  {
    num: 7,
    id: "07",
    phase: 2,
    phaseTag: "Part 02",
    phaseTitle: "Control Flow & Strings",
    file: "07-java-switch-statements-and-switch-expressions.html",
    title: "switch Statements & Expressions",
    fullTitle: "Switch Statements & Modern Switch Expressions (స్విచ్ స్టేట్‌మెంట్స్ & ఎక్స్‌ప్రెషన్స్)",
    subtopics: "క్లాసిక్ switch-case-break · Fall-through బిహేవియర్ · Modern Java 14+ Switch Expressions (-> యారో సింటాక్స్) · yield కీవర్డ్ & మల్టిపుల్ లేబుల్స్",
    prev: { file: "06-java-conditional-statements-if-else.html", title: "6. if, else-if & Ternary" },
    next: { file: "08-java-loops-while-for-and-enhanced-foreach.html", title: "8. Loops: while, for, foreach" }
  },
  {
    num: 8,
    id: "08",
    phase: 2,
    phaseTag: "Part 02",
    phaseTitle: "Control Flow & Strings",
    file: "08-java-loops-while-for-and-enhanced-foreach.html",
    title: "Loops: while, for, foreach",
    fullTitle: "Loops — while, do-while, for & Enhanced for-each (లూప్స్ మాస్టరీ)",
    subtopics: "Entry-controlled (while, for) vs Exit-controlled (do-while) · break & continue స్టేట్‌మెంట్స్ · లేబుల్డ్ లూప్స్ · Enhanced for-each లూప్ · ప్యాటర్న్ ప్రోగ్రామింగ్",
    prev: { file: "07-java-switch-statements-and-switch-expressions.html", title: "7. switch Statements & Expressions" },
    next: { file: "09-java-strings-memory-pool-and-immutability.html", title: "9. Strings & Memory Pool" }
  },
  {
    num: 9,
    id: "09",
    phase: 2,
    phaseTag: "Part 02",
    phaseTitle: "Control Flow & Strings",
    file: "09-java-strings-memory-pool-and-immutability.html",
    title: "Strings & Memory Pool",
    fullTitle: "Strings Deep Dive — String Constant Pool (SCP) & Immutability (స్ట్రింగ్స్ & SCP)",
    subtopics: "String Constant Pool (SCP) ఇంటర్నల్స్ · Heap vs Pool మెమరీ · String ఇమ్మ్యుటబిలిటీ ప్రాముఖ్యత · == (రిఫరెన్స్) vs .equals() (కంటెంట్) మధ్య వ్యత్యాసం",
    prev: { file: "08-java-loops-while-for-and-enhanced-foreach.html", title: "8. Loops: while, for, foreach" },
    next: { file: "10-java-stringbuilder-stringbuffer-and-methods.html", title: "10. StringBuilder & StringBuffer" }
  },
  {
    num: 10,
    id: "10",
    phase: 2,
    phaseTag: "Part 02",
    phaseTitle: "Control Flow & Strings",
    file: "10-java-stringbuilder-stringbuffer-and-methods.html",
    title: "StringBuilder & StringBuffer",
    fullTitle: "StringBuilder, StringBuffer & String Manipulation (మ్యూటబుల్ స్ట్రింగ్స్)",
    subtopics: "మ్యూటబుల్ స్ట్రింగ్స్ · StringBuilder (Fast, Non-sync) vs StringBuffer (Thread-safe) · ముఖ్యమైన మెథడ్స్ (append, insert, reverse) · Java 15+ Text Blocks (\"\"\")",
    prev: { file: "09-java-strings-memory-pool-and-immutability.html", title: "9. Strings & Memory Pool" },
    next: { file: "11-java-arrays-multidimensional-and-algorithms.html", title: "11. Arrays & Algorithms" }
  },

  // ==========================================
  // PART 03: Arrays, Methods & OOP (Ch 11 - 15)
  // ==========================================
  {
    num: 11,
    id: "11",
    phase: 3,
    phaseTag: "Part 03",
    phaseTitle: "Arrays, Methods & OOP",
    file: "11-java-arrays-multidimensional-and-algorithms.html",
    title: "Arrays & Algorithms",
    fullTitle: "Arrays — 1D, 2D, Jagged Arrays & Algorithms (అర్రేలు & అల్గారిథమ్స్)",
    subtopics: "అర్రే డిక్లరేషన్, మెమరీ లేఅవుట్ · ArrayIndexOutOfBoundsException నివారణ · 2D మ్యాట్రిక్స్ & Jagged Arrays · java.util.Arrays యుటిలిటీస్ (sort, binarySearch, copyOf)",
    prev: { file: "10-java-stringbuilder-stringbuffer-and-methods.html", title: "10. StringBuilder & StringBuffer" },
    next: { file: "12-java-methods-call-stack-and-pass-by-value.html", title: "12. Methods & Call Stack" }
  },
  {
    num: 12,
    id: "12",
    phase: 3,
    phaseTag: "Part 03",
    phaseTitle: "Arrays, Methods & OOP",
    file: "12-java-methods-call-stack-and-pass-by-value.html",
    title: "Methods & Call Stack",
    fullTitle: "Methods, Parameters & Call Stack Architecture (మెథడ్స్ & కాల్ స్టాక్)",
    subtopics: "మెథడ్ డిక్లరేషన్, సిగ్నేచర్ & రిటర్న్ టైప్స్ · జావాలో Pass-by-Value నియమం (ప్రిమిటివ్స్ vs ఆబ్జెక్ట్ రిఫరెన్సెస్) · JVM Stack Frames & Call Stack · రికర్షన్",
    prev: { file: "11-java-arrays-multidimensional-and-algorithms.html", title: "11. Arrays & Algorithms" },
    next: { file: "13-java-method-overloading-and-varargs.html", title: "13. Method Overloading & Varargs" }
  },
  {
    num: 13,
    id: "13",
    phase: 3,
    phaseTag: "Part 03",
    phaseTitle: "Arrays, Methods & OOP",
    file: "13-java-method-overloading-and-varargs.html",
    title: "Method Overloading & Varargs",
    fullTitle: "Method Overloading & Variable Arguments (మెథడ్ ఓవర్‌లోడింగ్ & Varargs)",
    subtopics: "Compile-time Polymorphism · నంబర్, టైప్ మరియు ఆర్డర్ ఆఫ్ పారామీటర్లతో ఓవర్‌లోడింగ్ · Variable-length Arguments (Type... args) వాడకం & రూల్స్",
    prev: { file: "12-java-methods-call-stack-and-pass-by-value.html", title: "12. Methods & Call Stack" },
    next: { file: "14-java-oop-classes-objects-and-constructors.html", title: "14. Classes, Objects & Heap" }
  },
  {
    num: 14,
    id: "14",
    phase: 3,
    phaseTag: "Part 03",
    phaseTitle: "Arrays, Methods & OOP",
    file: "14-java-oop-classes-objects-and-constructors.html",
    title: "Classes, Objects & Heap",
    fullTitle: "OOP Fundamentals — Classes, Objects & Memory Allocation (OOP ఫండమెంటల్స్)",
    subtopics: "ఆబ్జెక్ట్ ఓరియెంటెడ్ పారాడైమ్ · State & Behavior · new కీవర్డ్ ద్వారా Heap మెమరీ అలోకేషన్ · Instance vs Static వేరియబుల్స్ · Garbage Collection బేసిక్స్",
    prev: { file: "13-java-method-overloading-and-varargs.html", title: "13. Method Overloading & Varargs" },
    next: { file: "15-java-constructors-this-keyword-and-chaining.html", title: "15. Constructors & this Keyword" }
  },
  {
    num: 15,
    id: "15",
    phase: 3,
    phaseTag: "Part 03",
    phaseTitle: "Arrays, Methods & OOP",
    file: "15-java-constructors-this-keyword-and-chaining.html",
    title: "Constructors & this Keyword",
    fullTitle: "Constructors, 'this' Keyword & Constructor Chaining (కన్‌స్ట్రక్టర్లు & this)",
    subtopics: "Default vs Parameterized Constructors · Constructor Overloading · Shadowing సమస్య & this కీవర్డ్ పరిష్కారం · Constructor Chaining using this()",
    prev: { file: "14-java-oop-classes-objects-and-constructors.html", title: "14. Classes, Objects & Heap" },
    next: { file: "16-java-encapsulation-access-modifiers-and-records.html", title: "16. Encapsulation & Records" }
  },

  // ==========================================
  // PART 04: Core OOP & Exceptions (Ch 16 - 20)
  // ==========================================
  {
    num: 16,
    id: "16",
    phase: 4,
    phaseTag: "Part 04",
    phaseTitle: "Core OOP & Exceptions",
    file: "16-java-encapsulation-access-modifiers-and-records.html",
    title: "Encapsulation & Records",
    fullTitle: "Encapsulation, Access Modifiers & Java Records (ఎన్‌క్యాప్సులేషన్ & రికార్డ్స్)",
    subtopics: "డేటా హైడింగ్ సూత్రం · Access Modifiers (private, default, protected, public) · Getters & Setters Validation · Modern Java records (ఇమ్మ్యుటబుల్ డేటా క్యారియర్స్)",
    prev: { file: "15-java-constructors-this-keyword-and-chaining.html", title: "15. Constructors & this Keyword" },
    next: { file: "17-java-inheritance-super-keyword-and-object-class.html", title: "17. Inheritance & super Keyword" }
  },
  {
    num: 17,
    id: "17",
    phase: 4,
    phaseTag: "Part 04",
    phaseTitle: "Core OOP & Exceptions",
    file: "17-java-inheritance-super-keyword-and-object-class.html",
    title: "Inheritance & super Keyword",
    fullTitle: "Inheritance, 'super' Keyword & java.lang.Object Class (ఇన్హెరిటెన్స్ & super)",
    subtopics: "IS-A రిలేషన్షిప్ & extends కీవర్డ్ · Single & Multilevel Inheritance · super() కన్‌స్ట్రక్టర్ కాల్స్ · java.lang.Object (Cosmic Superclass: toString, equals, hashCode)",
    prev: { file: "16-java-encapsulation-access-modifiers-and-records.html", title: "16. Encapsulation & Records" },
    next: { file: "18-java-polymorphism-method-overriding-dynamic-binding.html", title: "18. Polymorphism & Overriding" }
  },
  {
    num: 18,
    id: "18",
    phase: 4,
    phaseTag: "Part 04",
    phaseTitle: "Core OOP & Exceptions",
    file: "18-java-polymorphism-method-overriding-dynamic-binding.html",
    title: "Polymorphism & Overriding",
    fullTitle: "Polymorphism, Method Overriding & Dynamic Binding (పాలిమార్ఫిజమ్)",
    subtopics: "Runtime Polymorphism · @Override అనోటేషన్ & రూల్స్ · Dynamic Method Dispatch · Upcasting & Downcasting · Modern instanceof Pattern Matching",
    prev: { file: "17-java-inheritance-super-keyword-and-object-class.html", title: "17. Inheritance & super Keyword" },
    next: { file: "19-java-abstract-classes-and-interfaces.html", title: "19. Abstract Classes & Interfaces" }
  },
  {
    num: 19,
    id: "19",
    phase: 4,
    phaseTag: "Part 04",
    phaseTitle: "Core OOP & Exceptions",
    file: "19-java-abstract-classes-and-interfaces.html",
    title: "Abstract Classes & Interfaces",
    fullTitle: "Abstract Classes, Interfaces & Multiple Inheritance (అబ్‌స్ట్రాక్ట్ క్లాసెస్ & ఇంటర్‌ఫేసెస్)",
    subtopics: "abstract క్లాసెస్ vs interface · Contract-driven ఆర్కిటెక్చర్ · ఇంటర్‌ఫేసెస్ ద్వారా Multiple Inheritance · Java 8+ default & static Interface Methods",
    prev: { file: "18-java-polymorphism-method-overriding-dynamic-binding.html", title: "18. Polymorphism & Overriding" },
    next: { file: "20-java-exception-handling-and-custom-exceptions.html", title: "20. Exceptions & Custom Errors" }
  },
  {
    num: 20,
    id: "20",
    phase: 4,
    phaseTag: "Part 04",
    phaseTitle: "Core OOP & Exceptions",
    file: "20-java-exception-handling-and-custom-exceptions.html",
    title: "Exceptions & Custom Errors",
    fullTitle: "Exception Handling, Checked vs Unchecked & Custom Exceptions (ఎక్సెప్షన్ హ్యాండ్లింగ్)",
    subtopics: "Throwable, Error, Exception హైరార్కీ · Checked vs Unchecked Exceptions · try-catch-finally & Multi-catch · try-with-resources · కస్టమ్ బిజినెస్ ఎక్సెప్షన్ల సృష్టి",
    prev: { file: "19-java-abstract-classes-and-interfaces.html", title: "19. Abstract Classes & Interfaces" },
    next: { file: "21-java-collections-list-arraylist-linkedlist.html", title: "21. List: ArrayList & LinkedList" }
  },

  // ==========================================
  // PART 05: Collections & Capstone (Ch 21 - 25)
  // ==========================================
  {
    num: 21,
    id: "21",
    phase: 5,
    phaseTag: "Part 05",
    phaseTitle: "Collections & Capstone",
    file: "21-java-collections-list-arraylist-linkedlist.html",
    title: "List: ArrayList & LinkedList",
    fullTitle: "Java Collections Framework — List, ArrayList & LinkedList (కలెక్షన్స్ ఫ్రేమ్‌వర్క్)",
    subtopics: "Collections Framework ఆర్కిటెక్చర్ · List ఇంటర్‌ఫేస్ · ArrayList (డైనమిక్ గ్రోత్, O(1) లుకప్) vs LinkedList (డబుల్ లింక్డ్ లిస్ట్, O(1) ఇన్సర్షన్) · ఇటరేటర్లు (Iterator, ListIterator)",
    prev: { file: "20-java-exception-handling-and-custom-exceptions.html", title: "20. Exceptions & Custom Errors" },
    next: { file: "22-java-collections-set-and-map-deep-dive.html", title: "22. Set & Map Deep Dive" }
  },
  {
    num: 22,
    id: "22",
    phase: 5,
    phaseTag: "Part 05",
    phaseTitle: "Collections & Capstone",
    file: "22-java-collections-set-and-map-deep-dive.html",
    title: "Set & Map Deep Dive",
    fullTitle: "Collections Deep Dive — Set (HashSet/TreeSet) & Map (HashMap/TreeMap) (సెట్ & మ్యాప్)",
    subtopics: "Set ఇంటర్‌ఫేస్ & డూప్లికేట్స్ రిమూవల్ · HashSet vs TreeSet · Map Key-Value ఆర్కిటెక్చర్ · HashMap ఇంటర్నల్స్ (Hash Buckets, Collisions, Red-Black Trees) vs TreeMap",
    prev: { file: "21-java-collections-list-arraylist-linkedlist.html", title: "21. List: ArrayList & LinkedList" },
    next: { file: "23-java-generics-and-type-safety.html", title: "23. Generics & Type Safety" }
  },
  {
    num: 23,
    id: "23",
    phase: 5,
    phaseTag: "Part 05",
    phaseTitle: "Collections & Capstone",
    file: "23-java-generics-and-type-safety.html",
    title: "Generics & Type Safety",
    fullTitle: "Generics & Type Safety — Generic Classes, Methods & Wildcards (జెనరిక్స్)",
    subtopics: "కంపైల్-టైమ్ టైప్ సేఫ్టీ · Generic Classes, Interfaces & Methods (<T>, <K, V>) · Bounded Types (<T extends Number>) · Wildcards (?, ? extends, ? super) · Type Erasure",
    prev: { file: "22-java-collections-set-and-map-deep-dive.html", title: "22. Set & Map Deep Dive" },
    next: { file: "24-java-lambdas-and-stream-api.html", title: "24. Lambdas & Stream API" }
  },
  {
    num: 24,
    id: "24",
    phase: 5,
    phaseTag: "Part 05",
    phaseTitle: "Collections & Capstone",
    file: "24-java-lambdas-and-stream-api.html",
    title: "Lambdas & Stream API",
    fullTitle: "Modern Java — Lambda Expressions & Stream API Pipelines (ల్యాంబ్డా & స్ట్రీమ్స్)",
    subtopics: "Functional Interfaces (Predicate, Function, Consumer, Supplier) · Lambda Syntax (->) · Method References (::) · Streams Pipeline: filter, map, sorted, collect, reduce",
    prev: { file: "23-java-generics-and-type-safety.html", title: "23. Generics & Type Safety" },
    next: { file: "25-java-capstone-project.html", title: "25. Capstone: Banking Engine" }
  },
  {
    num: 25,
    id: "25",
    phase: 5,
    phaseTag: "Part 05",
    phaseTitle: "Collections & Capstone",
    file: "25-java-capstone-project.html",
    title: "Capstone: Banking Engine",
    fullTitle: "Grand Finale: Real-World Java Capstone Project (ఎంటర్‌ప్రైజ్ బ్యాంకింగ్ ఇంజిన్)",
    subtopics: "పూర్తి స్థాయి ఎంటర్‌ప్రైజ్ ప్రాజెక్ట్: 'NextGen Core Banking & Transaction Engine' · OOP Architecture, Custom Exceptions, Collections Storage, Stream Analytics, Live Execution",
    prev: { file: "24-java-lambdas-and-stream-api.html", title: "24. Lambdas & Stream API" },
    next: null
  }
];

function buildJavaSidebar(currentNum) {
  const phases = [
    { num: 1, tag: "Part 01", title: "Basics & JVM", icon: "☕", count: "5 Ch" },
    { num: 2, tag: "Part 02", title: "Control Flow & Strings", icon: "🔀", count: "5 Ch" },
    { num: 3, tag: "Part 03", title: "Arrays, Methods & OOP", icon: "📦", count: "5 Ch" },
    { num: 4, tag: "Part 04", title: "Core OOP & Exceptions", icon: "🧩", count: "5 Ch" },
    { num: 5, tag: "Part 05", title: "Collections & Capstone", icon: "🚀", count: "5 Ch" }
  ];

  let html = `  <!-- SIDEBAR NAVIGATION -->
  <aside class="sidebar">
    <div class="sidebar-title">Java Masterclass</div>

    <div class="accordion">\n`;

  phases.forEach(p => {
    const phaseLessons = LESSONS.filter(l => l.phase === p.num);
    const hasActive = phaseLessons.some(l => l.num === currentNum);
    const activeHeaderClass = (hasActive || (currentNum === 0 && p.num === 1)) ? " active" : "";
    const openContentClass = (hasActive || (currentNum === 0 && p.num === 1)) ? " open" : "";

    html += `      <!-- ${p.tag}: ${p.title} -->
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
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </button>
      <div class="accordion-content${openContentClass}">\n`;

    phaseLessons.forEach(l => {
      const activeClass = l.num === currentNum ? ' class="active"' : '';
      html += `        <a href="/blog-java/${l.file}"${activeClass}>${l.num}. ${l.title}</a>\n`;
    });

    html += `      </div>\n\n`;
  });

  html += `    </div>

    <div class="sidebar-heading">INTERACTIVE IDE</div>
    <a href="/online-java-compiler.html" style="color:#10b981; font-weight:700;">▶ Try Java Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">OTHER COURSES</div>
    <a href="/blog-python.html">Python Course (25 Lessons)</a>
    <a href="/blog-javascript.html">JavaScript Course (25 Lessons)</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>`;

  return html;
}

module.exports = {
  LESSONS,
  buildJavaSidebar
};
