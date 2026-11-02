const fs = require('fs');
const path = require('path');

const javaDir = path.join(__dirname, '../public/blog-java');
if (!fs.existsSync(javaDir)) fs.mkdirSync(javaDir, { recursive: true });

const LESSONS = [
  // ==========================================
  // PART 01: జావా ఫండమెంటల్స్ & JVM (Ch 01 - 05)
  // ==========================================
  {
    num: 1,
    id: "01",
    phase: 1,
    phaseTag: "PART 01",
    phaseTitle: "జావా ఫండమెంటల్స్ & JVM",
    file: "01-java-introduction-features-and-jvm-architecture.html",
    title: "జావా పరిచయం & JVM ఆర్కిటెక్చర్",
    fullTitle: "Java Introduction, Features & JVM Architecture (జావా పరిచయం & JVM ఆర్కిటెక్చర్)",
    subtopics: "James Gosling & Sun Microsystems హిస్టరీ · WORA కాన్సెప్ట్ · JVM vs JRE vs JDK · క్లాస్‌లోడర్, బైట్‌కోడ్, JIT కంపైలర్ & గార్బేజ్ కలెక్షన్ పరిచయం",
    prev: null,
    next: { file: "02-java-installation-ide-and-first-program.html", title: "2. ఎన్విరాన్‌మెంట్ సెటప్ & మొదటి ప్రోగ్రామ్" }
  },
  {
    num: 2,
    id: "02",
    phase: 1,
    phaseTag: "PART 01",
    phaseTitle: "జావా ఫండమెంటల్స్ & JVM",
    file: "02-java-installation-ide-and-first-program.html",
    title: "ఎన్విరాన్‌మెంట్ సెటప్ & మొదటి ప్రోగ్రామ్",
    fullTitle: "Environment Setup, JDK 21+ & First Program (ఎన్విరాన్‌మెంట్ సెటప్ & మొదటి ప్రోగ్రామ్)",
    subtopics: "OpenJDK 21 LTS ఇన్‌స్టాలేషన్ · JAVA_HOME & PATH కాన్ఫిగరేషన్ · VS Code & IntelliJ IDEA సెటప్ · మొదటి Hello World రాయడం, javac కంపైలేషన్ & java రన్",
    prev: { file: "01-java-introduction-features-and-jvm-architecture.html", title: "1. జావా పరిచయం & JVM ఆర్కిటెక్చర్" },
    next: { file: "03-java-syntax-class-structure-and-main-method.html", title: "3. సింటాక్స్, క్లాస్ & main() మెథడ్" }
  },
  {
    num: 3,
    id: "03",
    phase: 1,
    phaseTag: "PART 01",
    phaseTitle: "జావా ఫండమెంటల్స్ & JVM",
    file: "03-java-syntax-class-structure-and-main-method.html",
    title: "సింటాక్స్, క్లాస్ & main() మెథడ్",
    fullTitle: "Java Syntax, Class Structure & main() Anatomy (జావా సింటాక్స్ & మెయిన్ మెథడ్ అనాటమీ)",
    subtopics: "జావా సోర్స్ ఫైల్ నియమాలు · public class vs ఫైల్ పేరు · public static void main(String[] args) లోతైన విశ్లేషణ · సింగిల్ & మల్టీ-లైన్ కామెంట్స్",
    prev: { file: "02-java-installation-ide-and-first-program.html", title: "2. ఎన్విరాన్‌మెంట్ సెటప్ & మొదటి ప్రోగ్రామ్" },
    next: { file: "04-java-variables-primitive-data-types-and-memory.html", title: "4. వేరియబుల్స్ & డేటా టైప్స్" }
  },
  {
    num: 4,
    id: "04",
    phase: 1,
    phaseTag: "PART 01",
    phaseTitle: "జావా ఫండమెంటల్స్ & JVM",
    file: "04-java-variables-primitive-data-types-and-memory.html",
    title: "వేరియబుల్స్ & డేటా టైప్స్",
    fullTitle: "Variables, Primitive Data Types & Memory Model (వేరియబుల్స్ & డేటా టైప్స్)",
    subtopics: "8 ప్రిమిటివ్ టైప్స్ (byte to double) · సైజులు & మెమరీ పరిధులు · Stack vs Heap ఆర్కిటెక్చర్ · Modern Java 'var' లోకల్ వేరియబుల్ టైప్ ఇన్ఫరెన్స్",
    prev: { file: "03-java-syntax-class-structure-and-main-method.html", title: "3. సింటాక్స్, క్లాస్ & main() మెథడ్" },
    next: { file: "05-java-operators-expressions-and-type-casting.html", title: "5. ఆపరేటర్లు & టైప్ కాస్టింగ్" }
  },
  {
    num: 5,
    id: "05",
    phase: 1,
    phaseTag: "PART 01",
    phaseTitle: "జావా ఫండమెంటల్స్ & JVM",
    file: "05-java-operators-expressions-and-type-casting.html",
    title: "ఆపరేటర్లు & టైప్ కాస్టింగ్",
    fullTitle: "Operators, Expressions & Type Casting (ఆపరేటర్లు & టైప్ కాస్టింగ్)",
    subtopics: "Arithmetic, Relational, Logical, Bitwise ఆపరేటర్లు · ఇంప్లిసిట్ వైడనింగ్ vs ఎక్స్‌ప్లిసిట్ నారోయింగ్ కాస్టింగ్ · Math క్లాస్ యుటిలిటీస్ & Fast I/O",
    prev: { file: "04-java-variables-primitive-data-types-and-memory.html", title: "4. వేరియబుల్స్ & డేటా టైప్స్" },
    next: { file: "06-java-conditional-statements-if-else.html", title: "6. డెసిషన్ మేకింగ్: if, else & టెర్నరీ" }
  },

  // ==========================================
  // PART 02: కంట్రోల్ ఫ్లో & స్ట్రింగ్స్ (Ch 06 - 10)
  // ==========================================
  {
    num: 6,
    id: "06",
    phase: 2,
    phaseTag: "PART 02",
    phaseTitle: "కంట్రోల్ ఫ్లో & స్ట్రింగ్స్",
    file: "06-java-conditional-statements-if-else.html",
    title: "డెసిషన్ మేకింగ్: if, else & టెర్నరీ",
    fullTitle: "Decision Making — if, else-if, else & Ternary Operator (డెసిషన్ మేకింగ్)",
    subtopics: "if-else మరియు else-if ల్యాడర్ · నెస్టెడ్ కండిషన్స్ · షార్ట్-సర్క్యూట్ లాజిక్ (&&, ||) · Ternary Conditional Operator (? :)",
    prev: { file: "05-java-operators-expressions-and-type-casting.html", title: "5. ఆపరేటర్లు & టైప్ కాస్టింగ్" },
    next: { file: "07-java-switch-statements-and-switch-expressions.html", title: "7. switch స్టేట్‌మెంట్లు & ఎక్స్‌ప్రెషన్లు" }
  },
  {
    num: 7,
    id: "07",
    phase: 2,
    phaseTag: "PART 02",
    phaseTitle: "కంట్రోల్ ఫ్లో & స్ట్రింగ్స్",
    file: "07-java-switch-statements-and-switch-expressions.html",
    title: "switch స్టేట్‌మెంట్లు & ఎక్స్‌ప్రెషన్లు",
    fullTitle: "Switch Statements & Modern Switch Expressions (స్విచ్ స్టేట్‌మెంట్స్ & ఎక్స్‌ప్రెషన్స్)",
    subtopics: "క్లాసిక్ switch-case-break · Fall-through బిహేవియర్ · Modern Java 14+ Switch Expressions (-> యారో సింటాక్స్) · yield కీవర్డ్ & మల్టిపుల్ లేబుల్స్",
    prev: { file: "06-java-conditional-statements-if-else.html", title: "6. డెసిషన్ మేకింగ్: if, else & టెర్నరీ" },
    next: { file: "08-java-loops-while-for-and-enhanced-foreach.html", title: "8. లూప్స్: while, for & for-each" }
  },
  {
    num: 8,
    id: "08",
    phase: 2,
    phaseTag: "PART 02",
    phaseTitle: "కంట్రోల్ ఫ్లో & స్ట్రింగ్స్",
    file: "08-java-loops-while-for-and-enhanced-foreach.html",
    title: "లూప్స్: while, for & for-each",
    fullTitle: "Loops — while, do-while, for & Enhanced for-each (లూప్స్ మాస్టరీ)",
    subtopics: "Entry-controlled (while, for) vs Exit-controlled (do-while) · break & continue స్టేట్‌మెంట్స్ · లేబుల్డ్ లూప్స్ · Enhanced for-each లూప్ · ప్యాటర్న్ ప్రోగ్రామింగ్",
    prev: { file: "07-java-switch-statements-and-switch-expressions.html", title: "7. switch స్టేట్‌మెంట్లు & ఎక్స్‌ప్రెషన్లు" },
    next: { file: "09-java-strings-memory-pool-and-immutability.html", title: "9. స్ట్రింగ్స్ & స్ట్రింగ్ పూల్ (SCP)" }
  },
  {
    num: 9,
    id: "09",
    phase: 2,
    phaseTag: "PART 02",
    phaseTitle: "కంట్రోల్ ఫ్లో & స్ట్రింగ్స్",
    file: "09-java-strings-memory-pool-and-immutability.html",
    title: "స్ట్రింగ్స్ & స్ట్రింగ్ పూల్ (SCP)",
    fullTitle: "Strings Deep Dive — String Constant Pool (SCP) & Immutability (స్ట్రింగ్స్ & SCP)",
    subtopics: "String Constant Pool (SCP) ఇంటర్నల్స్ · Heap vs Pool మెమరీ · String ఇమ్మ్యుటబిలిటీ ప్రాముఖ్యత · == (రిఫరెన్స్) vs .equals() (కంటెంట్) మధ్య వ్యత్యాసం",
    prev: { file: "08-java-loops-while-for-and-enhanced-foreach.html", title: "8. లూప్స్: while, for & for-each" },
    next: { file: "10-java-stringbuilder-stringbuffer-and-methods.html", title: "10. StringBuilder & StringBuffer" }
  },
  {
    num: 10,
    id: "10",
    phase: 2,
    phaseTag: "PART 02",
    phaseTitle: "కంట్రోల్ ఫ్లో & స్ట్రింగ్స్",
    file: "10-java-stringbuilder-stringbuffer-and-methods.html",
    title: "StringBuilder & StringBuffer",
    fullTitle: "StringBuilder, StringBuffer & String Manipulation (మ్యూటబుల్ స్ట్రింగ్స్)",
    subtopics: "మ్యూటబుల్ స్ట్రింగ్స్ · StringBuilder (Fast, Non-sync) vs StringBuffer (Thread-safe) · ముఖ్యమైన మెథడ్స్ (append, insert, reverse) · Java 15+ Text Blocks (\"\"\")",
    prev: { file: "09-java-strings-memory-pool-and-immutability.html", title: "9. స్ట్రింగ్స్ & స్ట్రింగ్ పూల్ (SCP)" },
    next: { file: "11-java-arrays-multidimensional-and-algorithms.html", title: "11. అర్రేలు & అల్గారిథమ్స్ (1D, 2D)" }
  },

  // ==========================================
  // PART 03: అర్రేలు, మెథడ్స్ & OOP (Ch 11 - 15)
  // ==========================================
  {
    num: 11,
    id: "11",
    phase: 3,
    phaseTag: "PART 03",
    phaseTitle: "అర్రేలు, మెథడ్స్ & OOP",
    file: "11-java-arrays-multidimensional-and-algorithms.html",
    title: "అర్రేలు & అల్గారిథమ్స్ (1D, 2D)",
    fullTitle: "Arrays — 1D, 2D, Jagged Arrays & Algorithms (అర్రేలు & అల్గారిథమ్స్)",
    subtopics: "అర్రే డిక్లరేషన్, మెమరీ లేఅవుట్ · ArrayIndexOutOfBoundsException నివారణ · 2D మ్యాట్రిక్స్ & Jagged Arrays · java.util.Arrays యుటిలిటీస్ (sort, binarySearch, copyOf)",
    prev: { file: "10-java-stringbuilder-stringbuffer-and-methods.html", title: "10. StringBuilder & StringBuffer" },
    next: { file: "12-java-methods-call-stack-and-pass-by-value.html", title: "12. మెథడ్స్ & కాల్ స్టాక్ ఆర్కిటెక్చర్" }
  },
  {
    num: 12,
    id: "12",
    phase: 3,
    phaseTag: "PART 03",
    phaseTitle: "అర్రేలు, మెథడ్స్ & OOP",
    file: "12-java-methods-call-stack-and-pass-by-value.html",
    title: "మెథడ్స్ & కాల్ స్టాక్ ఆర్కిటెక్చర్",
    fullTitle: "Methods, Parameters & Call Stack Architecture (మెథడ్స్ & కాల్ స్టాక్)",
    subtopics: "మెథడ్ డిక్లరేషన్, సిగ్నేచర్ & రిటర్న్ టైప్స్ · జావాలో Pass-by-Value నియమం (ప్రిమిటివ్స్ vs ఆబ్జెక్ట్ రిఫరెన్సెస్) · JVM Stack Frames & Call Stack · రికర్షన్",
    prev: { file: "11-java-arrays-multidimensional-and-algorithms.html", title: "11. అర్రేలు & అల్గారిథమ్స్ (1D, 2D)" },
    next: { file: "13-java-method-overloading-and-varargs.html", title: "13. మెథడ్ ఓవర్‌లోడింగ్ & Varargs" }
  },
  {
    num: 13,
    id: "13",
    phase: 3,
    phaseTag: "PART 03",
    phaseTitle: "అర్రేలు, మెథడ్స్ & OOP",
    file: "13-java-method-overloading-and-varargs.html",
    title: "మెథడ్ ఓవర్‌లోడింగ్ & Varargs",
    fullTitle: "Method Overloading & Variable Arguments (మెథడ్ ఓవర్‌లోడింగ్ & Varargs)",
    subtopics: "Compile-time Polymorphism · నంబర్, టైప్ మరియు ఆర్డర్ ఆఫ్ పారామీటర్లతో ఓవర్‌లోడింగ్ · Variable-length Arguments (Type... args) వాడకం & రూల్స్",
    prev: { file: "12-java-methods-call-stack-and-pass-by-value.html", title: "12. మెథడ్స్ & కాల్ స్టాక్ ఆర్కిటెక్చర్" },
    next: { file: "14-java-oop-classes-objects-and-constructors.html", title: "14. క్లాసులు, ఆబ్జెక్టులు & హీప్ మెమరీ" }
  },
  {
    num: 14,
    id: "14",
    phase: 3,
    phaseTag: "PART 03",
    phaseTitle: "అర్రేలు, మెథడ్స్ & OOP",
    file: "14-java-oop-classes-objects-and-constructors.html",
    title: "క్లాసులు, ఆబ్జెక్టులు & హీప్ మెమరీ",
    fullTitle: "OOP Fundamentals — Classes, Objects & Memory Allocation (OOP ఫండమెంటల్స్)",
    subtopics: "ఆబ్జెక్ట్ ఓరియెంటెడ్ పారాడైమ్ · State & Behavior · new కీవర్డ్ ద్వారా Heap మెమరీ అలోకేషన్ · Instance vs Static వేరియబుల్స్ · Garbage Collection బేసిక్స్",
    prev: { file: "13-java-method-overloading-and-varargs.html", title: "13. మెథడ్ ఓవర్‌లోడింగ్ & Varargs" },
    next: { file: "15-java-constructors-this-keyword-and-chaining.html", title: "15. కన్‌స్ట్రక్టర్లు & 'this' కీవర్డ్" }
  },
  {
    num: 15,
    id: "15",
    phase: 3,
    phaseTag: "PART 03",
    phaseTitle: "అర్రేలు, మెథడ్స్ & OOP",
    file: "15-java-constructors-this-keyword-and-chaining.html",
    title: "కన్‌స్ట్రక్టర్లు & 'this' కీవర్డ్",
    fullTitle: "Constructors, 'this' Keyword & Constructor Chaining (కన్‌స్ట్రక్టర్లు & this)",
    subtopics: "Default vs Parameterized Constructors · Constructor Overloading · Shadowing సమస్య & this కీవర్డ్ పరిష్కారం · Constructor Chaining using this()",
    prev: { file: "14-java-oop-classes-objects-and-constructors.html", title: "14. క్లాసులు, ఆబ్జెక్టులు & హీప్ మెమరీ" },
    next: { file: "16-java-encapsulation-access-modifiers-and-records.html", title: "16. ఎన్‌క్యాప్సులేషన్ & జావా రికార్డులు" }
  },

  // ==========================================
  // PART 04: కోర్ OOP & ఎక్సెప్షన్లు (Ch 16 - 20)
  // ==========================================
  {
    num: 16,
    id: "16",
    phase: 4,
    phaseTag: "PART 04",
    phaseTitle: "కోర్ OOP & ఎక్సెప్షన్లు",
    file: "16-java-encapsulation-access-modifiers-and-records.html",
    title: "ఎన్‌క్యాప్సులేషన్ & జావా రికార్డులు",
    fullTitle: "Encapsulation, Access Modifiers & Java Records (ఎన్‌క్యాప్సులేషన్ & రికార్డ్స్)",
    subtopics: "డేటా హైడింగ్ సూత్రం · Access Modifiers (private, default, protected, public) · Getters & Setters Validation · Modern Java records (ఇమ్మ్యుటబుల్ డేటా క్యారియర్స్)",
    prev: { file: "15-java-constructors-this-keyword-and-chaining.html", title: "15. కన్‌స్ట్రక్టర్లు & 'this' కీవర్డ్" },
    next: { file: "17-java-inheritance-super-keyword-and-object-class.html", title: "17. ఇన్హెరిటెన్స్ & 'super' కీవర్డ్" }
  },
  {
    num: 17,
    id: "17",
    phase: 4,
    phaseTag: "PART 04",
    phaseTitle: "కోర్ OOP & ఎక్సెప్షన్లు",
    file: "17-java-inheritance-super-keyword-and-object-class.html",
    title: "ఇన్హెరిటెన్స్ & 'super' కీవర్డ్",
    fullTitle: "Inheritance, 'super' Keyword & java.lang.Object Class (ఇన్హెరిటెన్స్ & super)",
    subtopics: "IS-A రిలేషన్షిప్ & extends కీవర్డ్ · Single & Multilevel Inheritance · super() కన్‌స్ట్రక్టర్ కాల్స్ · java.lang.Object (Cosmic Superclass: toString, equals, hashCode)",
    prev: { file: "16-java-encapsulation-access-modifiers-and-records.html", title: "16. ఎన్‌క్యాప్సులేషన్ & జావా రికార్డులు" },
    next: { file: "18-java-polymorphism-method-overriding-dynamic-binding.html", title: "18. పాలిమార్ఫిజమ్ & మెథడ్ ఓవర్‌రైడింగ్" }
  },
  {
    num: 18,
    id: "18",
    phase: 4,
    phaseTag: "PART 04",
    phaseTitle: "కోర్ OOP & ఎక్సెప్షన్లు",
    file: "18-java-polymorphism-method-overriding-dynamic-binding.html",
    title: "పాలిమార్ఫిజమ్ & మెథడ్ ఓవర్‌రైడింగ్",
    fullTitle: "Polymorphism, Method Overriding & Dynamic Binding (పాలిమార్ఫిజమ్)",
    subtopics: "Runtime Polymorphism · @Override అనోటేషన్ & రూల్స్ · Dynamic Method Dispatch · Upcasting & Downcasting · Modern instanceof Pattern Matching",
    prev: { file: "17-java-inheritance-super-keyword-and-object-class.html", title: "17. ఇన్హెరిటెన్స్ & 'super' కీవర్డ్" },
    next: { file: "19-java-abstract-classes-and-interfaces.html", title: "19. అబ్‌స్ట్రాక్ట్ క్లాసులు & ఇంటర్‌ఫేస్‌లు" }
  },
  {
    num: 19,
    id: "19",
    phase: 4,
    phaseTag: "PART 04",
    phaseTitle: "కోర్ OOP & ఎక్సెప్షన్లు",
    file: "19-java-abstract-classes-and-interfaces.html",
    title: "అబ్‌స్ట్రాక్ట్ క్లాసులు & ఇంటర్‌ఫేస్‌లు",
    fullTitle: "Abstract Classes, Interfaces & Multiple Inheritance (అబ్‌స్ట్రాక్ట్ క్లాసెస్ & ఇంటర్‌ఫేసెస్)",
    subtopics: "abstract క్లాసెస్ vs interface · Contract-driven ఆర్కిటెక్చర్ · ఇంటర్‌ఫేసెస్ ద్వారా Multiple Inheritance · Java 8+ default & static Interface Methods",
    prev: { file: "18-java-polymorphism-method-overriding-dynamic-binding.html", title: "18. పాలిమార్ఫిజమ్ & మెథడ్ ఓవర్‌రైడింగ్" },
    next: { file: "20-java-exception-handling-and-custom-exceptions.html", title: "20. ఎక్సెప్షన్ హ్యాండ్లింగ్ & కస్టమ్ ఎర్రర్స్" }
  },
  {
    num: 20,
    id: "20",
    phase: 4,
    phaseTag: "PART 04",
    phaseTitle: "కోర్ OOP & ఎక్సెప్షన్లు",
    file: "20-java-exception-handling-and-custom-exceptions.html",
    title: "ఎక్సెప్షన్ హ్యాండ్లింగ్ & కస్టమ్ ఎర్రర్స్",
    fullTitle: "Exception Handling, Checked vs Unchecked & Custom Exceptions (ఎక్సెప్షన్ హ్యాండ్లింగ్)",
    subtopics: "Throwable, Error, Exception హైరార్కీ · Checked vs Unchecked Exceptions · try-catch-finally & Multi-catch · try-with-resources · కస్టమ్ బిజినెస్ ఎక్సెప్షన్ల సృష్టి",
    prev: { file: "19-java-abstract-classes-and-interfaces.html", title: "19. అబ్‌స్ట్రాక్ట్ క్లాసులు & ఇంటర్‌ఫేస్‌లు" },
    next: { file: "21-java-collections-list-arraylist-linkedlist.html", title: "21. కలెక్షన్స్: ArrayList & LinkedList" }
  },

  // ==========================================
  // PART 05: కలెక్షన్స్ & క్యాప్‌స్టోన్ (Ch 21 - 25)
  // ==========================================
  {
    num: 21,
    id: "21",
    phase: 5,
    phaseTag: "PART 05",
    phaseTitle: "కలెక్షన్స్ & క్యాప్‌స్టోన్",
    file: "21-java-collections-list-arraylist-linkedlist.html",
    title: "కలెక్షన్స్: ArrayList & LinkedList",
    fullTitle: "Java Collections Framework — List, ArrayList & LinkedList (కలెక్షన్స్ ఫ్రేమ్‌వర్క్)",
    subtopics: "Collections Framework ఆర్కిటెక్చర్ · List ఇంటర్‌ఫేస్ · ArrayList (డైనమిక్ గ్రోత్, O(1) లుకప్) vs LinkedList (డబుల్ లింక్డ్ లిస్ట్, O(1) ఇన్సర్షన్) · ఇటరేటర్లు (Iterator, ListIterator)",
    prev: { file: "20-java-exception-handling-and-custom-exceptions.html", title: "20. ఎక్సెప్షన్ హ్యాండ్లింగ్ & కస్టమ్ ఎర్రర్స్" },
    next: { file: "22-java-collections-set-and-map-deep-dive.html", title: "22. సెట్ & మ్యాప్ డీప్ డైవ్ (Set & Map)" }
  },
  {
    num: 22,
    id: "22",
    phase: 5,
    phaseTag: "PART 05",
    phaseTitle: "కలెక్షన్స్ & క్యాప్‌స్టోన్",
    file: "22-java-collections-set-and-map-deep-dive.html",
    title: "సెట్ & మ్యాప్ డీప్ డైవ్ (Set & Map)",
    fullTitle: "Collections Deep Dive — Set (HashSet/TreeSet) & Map (HashMap/TreeMap) (సెట్ & మ్యాప్)",
    subtopics: "Set ఇంటర్‌ఫేస్ & డూప్లికేట్స్ రిమూవల్ · HashSet vs TreeSet · Map Key-Value ఆర్కిటెక్చర్ · HashMap ఇంటర్నల్స్ (Hash Buckets, Collisions, Red-Black Trees) vs TreeMap",
    prev: { file: "21-java-collections-list-arraylist-linkedlist.html", title: "21. కలెక్షన్స్: ArrayList & LinkedList" },
    next: { file: "23-java-generics-and-type-safety.html", title: "23. జెనరిక్స్ & టైప్ సేఫ్టీ (Generics)" }
  },
  {
    num: 23,
    id: "23",
    phase: 5,
    phaseTag: "PART 05",
    phaseTitle: "కలెక్షన్స్ & క్యాప్‌స్టోన్",
    file: "23-java-generics-and-type-safety.html",
    title: "జెనరిక్స్ & టైప్ సేఫ్టీ (Generics)",
    fullTitle: "Generics & Type Safety — Generic Classes, Methods & Wildcards (జెనరిక్స్)",
    subtopics: "కంపైల్-టైమ్ టైప్ సేఫ్టీ · Generic Classes, Interfaces & Methods (<T>, <K, V>) · Bounded Types (<T extends Number>) · Wildcards (?, ? extends, ? super) · Type Erasure",
    prev: { file: "22-java-collections-set-and-map-deep-dive.html", title: "22. సెట్ & మ్యాప్ డీప్ డైవ్ (Set & Map)" },
    next: { file: "24-java-lambdas-and-stream-api.html", title: "24. ల్యాంబ్దాలు & స్ట్రీమ్ API (Streams)" }
  },
  {
    num: 24,
    id: "24",
    phase: 5,
    phaseTag: "PART 05",
    phaseTitle: "కలెక్షన్స్ & క్యాప్‌స్టోన్",
    file: "24-java-lambdas-and-stream-api.html",
    title: "ల్యాంబ్దాలు & స్ట్రీమ్ API (Streams)",
    fullTitle: "Modern Java — Lambda Expressions & Stream API Pipelines (ల్యాంబ్డా & స్ట్రీమ్స్)",
    subtopics: "Functional Interfaces (Predicate, Function, Consumer, Supplier) · Lambda Syntax (->) · Method References (::) · Streams Pipeline: filter, map, sorted, collect, reduce",
    prev: { file: "23-java-generics-and-type-safety.html", title: "23. జెనరిక్స్ & టైప్ సేఫ్టీ (Generics)" },
    next: { file: "25-java-capstone-project.html", title: "25. క్యాప్‌స్టోన్: బ్యాంకింగ్ లెడ్జర్ ఇంజిన్" }
  },
  {
    num: 25,
    id: "25",
    phase: 5,
    phaseTag: "PART 05",
    phaseTitle: "కలెక్షన్స్ & క్యాప్‌స్టోన్",
    file: "25-java-capstone-project.html",
    title: "క్యాప్‌స్టోన్: బ్యాంకింగ్ లెడ్జర్ ఇంజిన్",
    fullTitle: "Grand Finale: Real-World Java Capstone Project (ఎంటర్‌ప్రైజ్ బ్యాంకింగ్ ఇంజిన్)",
    subtopics: "పూర్తి స్థాయి ఎంటర్‌ప్రైజ్ ప్రాజెక్ట్: 'NextGen Core Banking & Transaction Engine' · OOP Architecture, Custom Exceptions, Collections Storage, Stream Analytics, Live Execution",
    prev: { file: "24-java-lambdas-and-stream-api.html", title: "24. ల్యాంబ్దాలు & స్ట్రీమ్ API (Streams)" },
    next: null
  }
];

function buildJavaSidebar(currentNum) {
  const phases = [
    { num: 1, tag: "PART 01", title: "జావా ఫండమెంటల్స్ & JVM", icon: "☕", count: "5 Ch" },
    { num: 2, tag: "PART 02", title: "కంట్రోల్ ఫ్లో & స్ట్రింగ్స్", icon: "🔀", count: "5 Ch" },
    { num: 3, tag: "PART 03", title: "అర్రేలు, మెథడ్స్ & OOP", icon: "📦", count: "5 Ch" },
    { num: 4, tag: "PART 04", title: "కోర్ OOP & ఎక్సెప్షన్లు", icon: "🧩", count: "5 Ch" },
    { num: 5, tag: "PART 05", title: "కలెక్షన్స్ & క్యాప్‌స్టోన్", icon: "🚀", count: "5 Ch" }
  ];

  let html = `  <!-- SIDEBAR NAVIGATION -->
  <aside class="sidebar">
    <div class="sidebar-title">జావా మాస్టర్‌క్లాస్ (తెలుగు)</div>
    <a href="/blog-java.html" class="sidebar-home-link${currentNum === 0 ? ' active' : ''}">🌿 Java Course HOME (ఇండెక్స్)</a>

    <div class="sidebar-accordion">\n`;

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

    <div class="sidebar-heading">ఇంటరాక్టివ్ ఎడిటర్</div>
    <a href="/online-java-compiler.html" style="color:#10b981; font-weight:700;">▶ ఆన్‌లైన్ జావా కంపైలర్</a>
    <a href="/blog.html">📚 అన్ని ట్యుటోరియల్స్</a>

    <div class="sidebar-heading">ఇతర కోర్సులు</div>
    <a href="/blog-python.html">పైథాన్ కోర్సు (25 Lessons)</a>
    <a href="/blog-javascript.html">జావాస్క్రిప్ట్ కోర్సు (25 Lessons)</a>
    <a href="/online-html-editor.html">HTML/CSS/JS ఎడిటర్</a>
  </aside>`;

  return html;
}

module.exports = {
  LESSONS,
  buildJavaSidebar
};
