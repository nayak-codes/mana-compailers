const fs = require('fs');
const path = require('path');

const pythonDir = path.join(__dirname, '../public/blog-python');
if (!fs.existsSync(pythonDir)) fs.mkdirSync(pythonDir, { recursive: true });

const LESSONS = [
  // ==========================================
  // PHASE 1: పైథాన్ ఫండమెంటల్స్ & బేసిక్స్ (Ch 01 - 05)
  // ==========================================
  {
    num: 1,
    id: "01",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "పైథాన్ ఫండమెంటల్స్ & బేసిక్స్",
    file: "01-python-introduction-features-and-setup.html",
    title: "పైథాన్ పరిచయం, ఫీచర్లు & ఎన్విరాన్‌మెంట్ సెటప్",
    subtopics: "Guido van Rossum హిస్టరీ · Python 2 vs Python 3 · ఇంటర్‌ప్రీటర్ ఆర్కిటెక్చర్ · VS Code & Python సెటప్ · మొదటి Hello World ప్రోగ్రామ్",
    prev: null,
    next: { file: "02-python-syntax-indentation-and-comments.html", title: "2. సింటాక్స్, ఇండెంటేషన్ & కామెంట్స్" }
  },
  {
    num: 2,
    id: "02",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "పైథాన్ ఫండమెంటల్స్ & బేసిక్స్",
    file: "02-python-syntax-indentation-and-comments.html",
    title: "సింటాక్స్, ఇండెంటేషన్ & కామెంట్స్",
    subtopics: "Python Indentation ఆర్కిటెక్చర్ (No Braces!) · IndentationError నివారణ · సింగిల్ & మల్టీ-లైన్ కామెంట్స్ · డాక్‌స్ట్రింగ్స్ (Docstrings)",
    prev: { file: "01-python-introduction-features-and-setup.html", title: "1. పైథాన్ పరిచయం & సెటప్" },
    next: { file: "03-python-variables-data-types-and-naming.html", title: "3. వేరియబుల్స్ & డేటా టైప్స్" }
  },
  {
    num: 3,
    id: "03",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "పైథాన్ ఫండమెంటల్స్ & బేసిక్స్",
    file: "03-python-variables-data-types-and-naming.html",
    title: "వేరియబుల్స్, డేటా టైప్స్ & టైప్ కాస్టింగ్",
    subtopics: "డైనమిక్ టైపింగ్ · మెమరీ రిఫరెన్స్ & id() · ప్రిమిటివ్ టైప్స్ (int, float, complex, bool, str, NoneType) · టైప్ కాస్టింగ్ · Naming Conventions",
    prev: { file: "02-python-syntax-indentation-and-comments.html", title: "2. సింటాక్స్ & ఇండెంటేషన్" },
    next: { file: "04-python-input-output-formatting.html", title: "4. ఇన్‌పుట్ & అవుట్‌పుట్ ఫార్మాటింగ్" }
  },
  {
    num: 4,
    id: "04",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "పైథాన్ ఫండమెంటల్స్ & బేసిక్స్",
    file: "04-python-input-output-formatting.html",
    title: "ఇన్‌పుట్ & అవుట్‌పుట్ ఫార్మాటింగ్ (print, input & f-strings)",
    subtopics: "input() ఫంక్షన్ · print() సెపరేటర్ (sep) & ఎండ్ (end) · f-strings స్ట్రింగ్ ఇంటర్‌పోలేషన్ · str.format() & Fast I/O ట్రిక్స్",
    prev: { file: "03-python-variables-data-types-and-naming.html", title: "3. వేరియబుల్స్ & డేటా టైప్స్" },
    next: { file: "05-python-operators-and-expressions.html", title: "5. ఆపరేటర్లు & ఎక్స్‌ప్రెషన్స్" }
  },
  {
    num: 5,
    id: "05",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "పైథాన్ ఫండమెంటల్స్ & బేసిక్స్",
    file: "05-python-operators-and-expressions.html",
    title: "ఆపరేటర్లు & ఎక్స్‌ప్రెషన్స్",
    subtopics: "Arithmetic, Relational, Logical · Assignment & Augmented Operators · Identity (is, is not) · Membership (in, not in) · Bitwise & Precedence",
    prev: { file: "04-python-input-output-formatting.html", title: "4. ఇన్‌పుట్ & అవుట్‌పుట్" },
    next: { file: "06-python-conditional-statements-branching.html", title: "6. డెసిషన్ మేకింగ్ (if-else)" }
  },

  // ==========================================
  // PHASE 2: కంట్రోల్ ఫ్లో, లూప్స్ & స్ట్రింగ్స్ (Ch 06 - 10)
  // ==========================================
  {
    num: 6,
    id: "06",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో, లూప్స్ & స్ట్రింగ్స్",
    file: "06-python-conditional-statements-branching.html",
    title: "డెసిషన్ మేకింగ్ (if, elif, else & match-case)",
    subtopics: "if-elif-else లాజిక్ · నెస్టెడ్ కండిషన్స్ · షార్ట్‌హ్యాండ్ if/else (Ternary Operator) · Modern Python 3.10+ Pattern Matching (match-case)",
    prev: { file: "05-python-operators-and-expressions.html", title: "5. ఆపరేటర్లు & ఎక్స్‌ప్రెషన్స్" },
    next: { file: "07-python-loops-while-and-for.html", title: "7. లూప్స్ (while & for)" }
  },
  {
    num: 7,
    id: "07",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో, లూప్స్ & స్ట్రింగ్స్",
    file: "07-python-loops-while-and-for.html",
    title: "లూప్స్ — while & for లూప్స్",
    subtopics: "while లూప్ & కండిషన్ చెకింగ్ · ఇన్ఫినైట్ లూప్స్ నివారణ · for లూప్ · range(start, stop, step) ఇటరేషన్ · సీక్వెన్సులపై లూపింగ్",
    prev: { file: "06-python-conditional-statements-branching.html", title: "6. డెసిషన్ మేకింగ్" },
    next: { file: "08-python-loop-control-break-continue-else.html", title: "8. లూప్ కంట్రోల్ (break, continue, else)" }
  },
  {
    num: 8,
    id: "08",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో, లూప్స్ & స్ట్రింగ్స్",
    file: "08-python-loop-control-break-continue-else.html",
    title: "లూప్ కంట్రోల్ — break, continue, pass & else",
    subtopics: "break స్టేట్‌మెంట్ · continue స్టేట్‌మెంట్ · pass ప్లేస్‌హోల్డర్ · పైథాన్ స్పెషల్: for-else & while-else లూప్స్ · నెస్టెడ్ లూప్స్ కంట్రోల్",
    prev: { file: "07-python-loops-while-and-for.html", title: "7. లూప్స్ (while & for)" },
    next: { file: "09-python-strings-deep-dive-slicing.html", title: "9. స్ట్రింగ్స్ డీప్ డైవ్ & స్లైసింగ్" }
  },
  {
    num: 9,
    id: "09",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో, లూప్స్ & స్ట్రింగ్స్",
    file: "09-python-strings-deep-dive-slicing.html",
    title: "స్ట్రింగ్స్ డీప్ డైవ్ & స్లైసింగ్ (String Mastery)",
    subtopics: "ఇండెక్సింగ్ & నెగటివ్ ఇండెక్సింగ్ · String Slicing [start:stop:step] · ఇమ్మ్యుటబిలిటీ కాన్సెప్ట్ · కోర్ మెథడ్స్ (strip, split, join, replace, find)",
    prev: { file: "08-python-loop-control-break-continue-else.html", title: "8. లూప్ కంట్రోల్" },
    next: { file: "10-python-regular-expressions-regex.html", title: "10. రెగ్యులర్ ఎక్స్‌ప్రెషన్స్ (Regex)" }
  },
  {
    num: 10,
    id: "10",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "కంట్రోల్ ఫ్లో, లూప్స్ & స్ట్రింగ్స్",
    file: "10-python-regular-expressions-regex.html",
    title: "రెగ్యులర్ ఎక్స్‌ప్రెషన్స్ (Regex & Pattern Matching)",
    subtopics: "re మాడ్యూల్ · మెటా-క్యారెక్టర్స్ (^, $, *, +, ?, [], {}) · match(), search(), findall(), sub() · ఈమెయిల్ & ఫోన్ నంబర్ వాలిడేషన్ ప్యాటర్న్స్",
    prev: { file: "09-python-strings-deep-dive-slicing.html", title: "9. స్ట్రింగ్స్ డీప్ డైవ్" },
    next: { file: "11-python-lists-and-comprehensions.html", title: "11. లిస్ట్స్ & కాంప్రహెన్షన్స్" }
  },

  // ==========================================
  // PHASE 3: డేటా స్ట్రక్చర్స్ & కలెక్షన్స్ (Ch 11 - 15)
  // ==========================================
  {
    num: 11,
    id: "11",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "డేటా స్ట్రక్చర్స్ & కలెక్షన్స్",
    file: "11-python-lists-and-comprehensions.html",
    title: "లిస్ట్స్ (Lists) & లిస్ట్ కాంప్రహెన్షన్స్",
    subtopics: "మ్యూటబుల్ డేటా స్ట్రక్చర్స్ · లిస్ట్ మెథడ్స్ (append, extend, insert, pop, remove, sort) · 2D Nested Lists · List Comprehensions [x for x in ...]",
    prev: { file: "10-python-regular-expressions-regex.html", title: "10. రెగ్యులర్ ఎక్స్‌ప్రెషన్స్" },
    next: { file: "12-python-tuples-and-immutability.html", title: "12. టుపుల్స్ & ఇమ్మ్యుటబిలిటీ" }
  },
  {
    num: 12,
    id: "12",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "డేటా స్ట్రక్చర్స్ & కలెక్షన్స్",
    file: "12-python-tuples-and-immutability.html",
    title: "టుపుల్స్ (Tuples) & ఇమ్మ్యుటబిలిటీ",
    subtopics: "ఇమ్మ్యుటబుల్ కలెక్షన్స్ · టుపుల్ క్రియేషన్ & సింగిల్ ఎలిమెంట్ టుపుల్ · Tuple Unpacking a, *b, c = t · లిస్ట్ వర్సెస్ టుపుల్ మెమరీ & NamedTuples",
    prev: { file: "11-python-lists-and-comprehensions.html", title: "11. లిస్ట్స్ & కాంప్రహెన్షన్స్" },
    next: { file: "13-python-dictionaries-deep-dive.html", title: "13. డిక్షనరీలు డీప్ డైవ్" }
  },
  {
    num: 13,
    id: "13",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "డేటా స్ట్రక్చర్స్ & కలెక్షన్స్",
    file: "13-python-dictionaries-deep-dive.html",
    title: "డిక్షనరీలు (Dictionaries) & డిక్ట్ కాంప్రహెన్షన్స్",
    subtopics: "Key-Value Pairs ఆర్కిటెక్చర్ · హ్యాష్ మ్యాప్ O(1) లుకప్స్ · get(), items(), keys(), values(), update() · Dictionary Comprehensions",
    prev: { file: "12-python-tuples-and-immutability.html", title: "12. టుపుల్స్ & ఇమ్మ్యుటబిలిటీ" },
    next: { file: "14-python-sets-and-operations.html", title: "14. సెట్స్ & ఆపరేషన్స్" }
  },
  {
    num: 14,
    id: "14",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "డేటా స్ట్రక్చర్స్ & కలెక్షన్స్",
    file: "14-python-sets-and-operations.html",
    title: "సెట్స్ (Sets) & సెట్ మ్యాథమెటికల్ ఆపరేషన్స్",
    subtopics: "యూనిక్ ఎలిమెంట్స్ · డూప్లికేట్స్ రిమూవల్ · Set Operations: Union (|), Intersection (&), Difference (-), Symmetric Difference (^) · frozenset",
    prev: { file: "13-python-dictionaries-deep-dive.html", title: "13. డిక్షనరీలు డీప్ డైవ్" },
    next: { file: "15-python-collections-advanced-structures.html", title: "15. అడ్వాన్స్‌డ్ కలెక్షన్స్" }
  },
  {
    num: 15,
    id: "15",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "డేటా స్ట్రక్చర్స్ & కలెక్షన్స్",
    file: "15-python-collections-advanced-structures.html",
    title: "కలెక్షన్స్ మాడ్యూల్ & అడ్వాన్స్‌డ్ డేటా స్ట్రక్చర్స్",
    subtopics: "collections.Counter ఫ్రీక్వెన్సీ ఎనాలసిస్ · defaultdict · deque (Double-ended Queue O(1)) · OrderedDict · heapq మాడ్యూల్ (Priority Queues)",
    prev: { file: "14-python-sets-and-operations.html", title: "14. సెట్స్ & ఆపరేషన్స్" },
    next: { file: "16-python-functions-fundamentals.html", title: "16. ఫంక్షన్స్ ఫండమెంటల్స్" }
  },

  // ==========================================
  // PHASE 4: ఫంక్షన్స్, మాడ్యూల్స్ & ఫైల్ I/O (Ch 16 - 20)
  // ==========================================
  {
    num: 16,
    id: "16",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఫంక్షన్స్, మాడ్యూల్స్ & ఫైల్ I/O",
    file: "16-python-functions-fundamentals.html",
    title: "ఫంక్షన్స్ ఫండమెంటల్స్ & ఆర్గ్యుమెంట్స్",
    subtopics: "def కీవర్డ్ · పారామీటర్లు vs ఆర్గ్యుమెంట్స్ · return స్టేట్‌మెంట్ & మల్టిపుల్ రిటర్న్స్ · Positional vs Keyword Arguments · Default Parameters · Type Hints",
    prev: { file: "15-python-collections-advanced-structures.html", title: "15. అడ్వాన్స్‌డ్ కలెక్షన్స్" },
    next: { file: "17-python-args-kwargs-variable-scope.html", title: "17. *args, **kwargs & Scope" }
  },
  {
    num: 17,
    id: "17",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఫంక్షన్స్, మాడ్యూల్స్ & ఫైల్ I/O",
    file: "17-python-args-kwargs-variable-scope.html",
    title: "వేరియబుల్ ఆర్గ్యుమెంట్స్ & స్కోప్ (*args, **kwargs & LEGB)",
    subtopics: "ఆర్బిట్రరీ పొజిషనల్ ఆర్గ్యుమెంట్స్ (*args) · ఆర్బిట్రరీ కీవర్డ్ ఆర్గ్యుమెంట్స్ (**kwargs) · LEGB స్కోప్ రూల్ · global & nonlocal కీవర్డ్స్",
    prev: { file: "16-python-functions-fundamentals.html", title: "16. ఫంక్షన్స్ ఫండమెంటల్స్" },
    next: { file: "18-python-lambda-recursion-functional.html", title: "18. ల్యాంబ్డా, రికర్షన్ & ఫంక్షనల్ ప్రోగ్రామింగ్" }
  },
  {
    num: 18,
    id: "18",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఫంక్షన్స్, మాడ్యూల్స్ & ఫైల్ I/O",
    file: "18-python-lambda-recursion-functional.html",
    title: "ల్యాంబ్డా, రికర్షన్ & ఫంక్షనల్ ప్రోగ్రామింగ్",
    subtopics: "Anonymous Lambda Functions · రికర్షన్ & కాల్ స్టాక్ · Higher-order Functions: map(), filter(), reduce() · Closures పరిచయం",
    prev: { file: "17-python-args-kwargs-variable-scope.html", title: "17. *args, **kwargs & Scope" },
    next: { file: "19-python-modules-packages-and-pip.html", title: "19. మాడ్యూల్స్, ప్యాకేజీలు & pip" }
  },
  {
    num: 19,
    id: "19",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఫంక్షన్స్, మాడ్యూల్స్ & ఫైల్ I/O",
    file: "19-python-modules-packages-and-pip.html",
    title: "మాడ్యూల్స్, ప్యాకేజీలు & వర్చువల్ ఎన్విరాన్‌మెంట్స్",
    subtopics: "import సిస్టమ్ · కస్టమ్ మాడ్యూల్స్ సృష్టి · __name__ == '__main__' గార్డ్రైల్ · pip ప్యాకేజీ మేనేజర్ · venv వర్చువల్ ఎన్విరాన్‌మెంట్స్ సెటప్",
    prev: { file: "18-python-lambda-recursion-functional.html", title: "18. ల్యాంబ్డా & రికర్షన్" },
    next: { file: "20-python-file-handling-and-json.html", title: "20. ఫైల్ హ్యాండ్లింగ్ & JSON" }
  },
  {
    num: 20,
    id: "20",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఫంక్షన్స్, మాడ్యూల్స్ & ఫైల్ I/O",
    file: "20-python-file-handling-and-json.html",
    title: "ఫైల్ హ్యాండ్లింగ్, CSV & JSON ప్రాసెసింగ్",
    subtopics: "open() మోడ్స్ (r, w, a, x, b) · with కంటెక్స్ట్ మేనేజర్ (ఆటో-క్లోజ్) · టెక్స్ట్ ఫైల్స్ రీడ్ & రైట్ · csv మాడ్యూల్ · json Serialization (dump, load)",
    prev: { file: "19-python-modules-packages-and-pip.html", title: "19. మాడ్యూల్స్ & pip" },
    next: { file: "21-python-exception-handling.html", title: "21. ఎక్సెప్షన్ హ్యాండ్లింగ్" }
  },

  // ==========================================
  // PHASE 5: OOP, ఎక్సెప్షన్స్ & క్యాప్‌స్టోన్ ప్రాజెక్ట్ (Ch 21 - 25)
  // ==========================================
  {
    num: 21,
    id: "21",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "OOP, ఎక్సెప్షన్స్ & క్యాప్‌స్టోన్ ప్రాజెక్ట్",
    file: "21-python-exception-handling.html",
    title: "ఎక్సెప్షన్ హ్యాండ్లింగ్ & కస్టమ్ ఎర్రర్స్",
    subtopics: "try-except-else-finally ఆర్కిటెక్చర్ · స్టాండర్డ్ ఎక్సెప్షన్స్ · raise కీవర్డ్ · కస్టమ్ ఎక్సెప్షన్ క్లాసెస్ నిర్మాణం (Domain Exceptions)",
    prev: { file: "20-python-file-handling-and-json.html", title: "20. ఫైల్ హ్యాండ్లింగ్ & JSON" },
    next: { file: "22-python-oop-classes-and-objects.html", title: "22. OOP బేసిక్స్ (Classes & Objects)" }
  },
  {
    num: 22,
    id: "22",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "OOP, ఎక్సెప్షన్స్ & క్యాప్‌స్టోన్ ప్రాజెక్ట్",
    file: "22-python-oop-classes-and-objects.html",
    title: "OOP బేసిక్స్ — క్లాసెస్, ఆబ్జెక్ట్స్ & __init__",
    subtopics: "క్లాసెస్ & ఆబ్జెక్ట్స్ · __init__ కన్‌స్ట్రక్టర్ · self కీవర్డ్ రహస్యం · Instance vs Class Variables · Instance Methods, @classmethod, @staticmethod",
    prev: { file: "21-python-exception-handling.html", title: "21. ఎక్సెప్షన్ హ్యాండ్లింగ్" },
    next: { file: "23-python-oop-inheritance-polymorphism.html", title: "23. OOP పిల్లర్స్ (Inheritance & Polymorphism)" }
  },
  {
    num: 23,
    id: "23",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "OOP, ఎక్సెప్షన్స్ & క్యాప్‌స్టోన్ ప్రాజెక్ట్",
    file: "23-python-oop-inheritance-polymorphism.html",
    title: "OOP పిల్లర్స్ — ఇన్హెరిటెన్స్, ఎన్‌క్యాప్సులేషన్ & పాలిమార్ఫిజమ్",
    subtopics: "Single & Multiple Inheritance · super() & MRO ఆర్కిటెక్చర్ · ప్రైవేట్ వేరియబుల్స్ (_ & __) · @property డెకరేటర్ · పాలిమార్ఫిజమ్",
    prev: { file: "22-python-oop-classes-and-objects.html", title: "22. OOP బేసిక్స్" },
    next: { file: "24-python-decorators-generators-dunder.html", title: "24. డెకరేటర్లు, జెనరేటర్లు & డండర్ మెథడ్స్" }
  },
  {
    num: 24,
    id: "24",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "OOP, ఎక్సెప్షన్స్ & క్యాప్‌స్టోన్ ప్రాజెక్ట్",
    file: "24-python-decorators-generators-dunder.html",
    title: "అడ్వాన్స్‌డ్ పైథాన్ — డెకరేటర్లు, జెనరేటర్లు & డండర్ మెథడ్స్",
    subtopics: "ఫంక్షన్ డెకరేటర్లు (@timer, @auth) · Generators & yield (మెమరీ ఎఫిషియంట్ స్ట్రీమింగ్) · Magic / Dunder Methods (__str__, __repr__, __len__, __enter__)",
    prev: { file: "23-python-oop-inheritance-polymorphism.html", title: "23. OOP పిల్లర్స్" },
    next: { file: "25-python-capstone-project.html", title: "25. గ్రాండ్ ఫినాలే ప్రాజెక్ట్" }
  },
  {
    num: 25,
    id: "25",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "OOP, ఎక్సెప్షన్స్ & క్యాప్‌స్టోన్ ప్రాజెక్ట్",
    file: "25-python-capstone-project.html",
    title: "గ్రాండ్ ఫినాలే: రియల్-వరల్డ్ పైథాన్ క్యాప్‌స్టోన్ ప్రాజెక్ట్",
    subtopics: "పూర్తి స్థాయి ఎంటర్‌ప్రైజ్ ప్రాజెక్ట్: 'Enterprise Student & Academy Management System' · OOP Architecture, Custom Exceptions, JSON Data Persistence, Analytics",
    prev: { file: "24-python-decorators-generators-dunder.html", title: "24. డెకరేటర్లు & జెనరేటర్లు" },
    next: null
  }
];

function buildPythonSidebar(currentNum) {
  const phases = [
    { num: 1, tag: "Phase 01", title: "పైథాన్ ఫండమెంటల్స్ & బేసిక్స్", icon: "⚡", count: "5 Ch" },
    { num: 2, tag: "Phase 02", title: "కంట్రోల్ ఫ్లో, లూప్స్ & స్ట్రింగ్స్", icon: "🔀", count: "5 Ch" },
    { num: 3, tag: "Phase 03", title: "డేటా స్ట్రక్చర్స్ & కలెక్షన్స్", icon: "📦", count: "5 Ch" },
    { num: 4, phaseNum: 4, tag: "Phase 04", title: "ఫంక్షన్స్, మాడ్యూల్స్ & ఫైల్ I/O", icon: "🧩", count: "5 Ch" },
    { num: 5, tag: "Phase 05", title: "OOP, ఎక్సెప్షన్స్ & ప్రాజెక్ట్", icon: "🚀", count: "5 Ch" }
  ];

  let html = `  <!-- LEFT SIDEBAR ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">Python 3 Master Course (తెలుగు)</div>
    <a href="/blog-python.html" class="sidebar-home-link${currentNum === 0 ? ' active' : ''}">🐍 Python Course HOME (ఇండెక్స్)</a>

    <div class="sidebar-accordion">\n`;

  phases.forEach(p => {
    const phaseLessons = LESSONS.filter(l => l.phase === p.num);
    const hasActive = phaseLessons.some(l => l.num === currentNum);
    const activeHeaderClass = (hasActive || (currentNum === 0 && p.num === 1)) ? " active" : "";
    const openContentClass = (hasActive || (currentNum === 0 && p.num === 1)) ? " open" : "";

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
      html += `        <a href="/blog-python/${l.file}"${activeClass}>${l.num}. ${l.title}</a>\n`;
    });

    html += `      </div>\n\n`;
  });

  html += `    </div>

    <div style="margin-top:24px; padding:16px; background:var(--bg2); border:1px solid var(--border); border-radius:10px; font-size:12px; text-align:center;">
      <div style="font-weight:700; color:#10b981; margin-bottom:4px;">ఇంటరాక్టివ్ ఎడిటర్</div>
      <a href="/online-python-compiler.html" style="color:var(--text); text-decoration:none; font-weight:600; display:inline-block; margin-top:6px; background:rgba(16,185,129,0.12); padding:6px 12px; border-radius:6px; border:1px solid rgba(16,185,129,0.3);">
        ▶ Try Online Python Compiler
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
  buildPythonSidebar
};

