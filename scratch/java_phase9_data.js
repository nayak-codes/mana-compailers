module.exports = [
  {
    "num": 38,
    "phaseId": "phase9",
    "phaseTitle": "Phase 9: Classes & Objects",
    "slug": "38-java-class-and-object-fundamentals",
    "title": "Java Class & Object Fundamentals: Blueprint vs Instance (తెలుగులో)",
    "badge": "38. Class & Object Fundamentals",
    "subtopics": "Class ante enti? · Object ante enti? · Blueprint vs Instance Analogy · Fields (Instance Variables) · Methods Inside Classes · Creating Objects with new · Dot Operator · Memory Model: Stack Reference + Heap Object · Multiple Objects from One Class",
    "readTime": "22 min read",
    "intro": "జావా అంటేనే ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP). ఈ OOP కి రెండు పునాదులు ఉన్నాయి: అవే క్లాస్ మరియు ఆబ్జెక్ట్. అసలు క్లాస్ (బ్లూప్రింట్) కి, ఆబ్జెక్ట్ (రియల్ వస్తువు) కి తేడా ఏంటి? అందులో డేటాని ఎలా దాచాలి? new కీవర్డ్ తో ఆబ్జెక్ట్స్ ని మెమరీలో ఎలా క్రియేట్ చేయాలో ఈ చాప్టర్ లో చాలా డీటెయిల్డ్ గా నేర్చుకుందాం.",
    "theorySections": [
      {
        "heading": "1. Class అంటే ఏంటి?",
        "content": "ఒక **Class** అనేది కేవలం ఒక **బ్లూప్రింట్, డిజైన్, లేదా ప్లాన్** లాంటిది. ఇది ఆబ్జెక్ట్ ఎలా ఉండాలో ముందే చెప్తుంది. ఇందులో ప్రధానంగా రెండు ఉంటాయి:\n1. **Fields (వేరియబుల్స్/డేటా):** ఆబ్జెక్ట్ కి ఏమేమి లక్షణాలు (లెంత్, కలర్, పేరు) ఉండాలి.\n2. **Methods (పనులు):** ఆ ఆబ్జెక్ట్ ఏమేమి పనులు (నడవడం, పాడటం, క్యాలిక్యులేట్ చేయడం) చేయగలదు.\n\n**రియల్ వరల్డ్ ఎగ్జాంపుల్ — కారు బ్లూప్రింట్:**\n- ఒక కారు తయారు చేసేటప్పుడు ఇంజనీర్ ఒక బ్లూప్రింట్ (పేపర్ మీద డిజైన్) గీస్తాడు. ఆ డిజైన్ లో \"కారుకి కలర్ ఉంటుంది, టైర్స్ ఉంటాయి, ఇంజిన్ ఉంటుంది\" అని రాసి ఉంటుంది.\n- కానీ ఆ పేపర్ మీద గీసిన బ్లూప్రింట్ లో కూర్చుని మనం డ్రైవ్ చేయగలమా? చేయలేము కదా! అది కేవలం డిజైన్ మాత్రమే.\n- ఆ డిజైన్ ని చూసి కంపెనీ వాడు నిజమైన కార్లని తయారు చేస్తాడు. అప్పుడే మనం వాటిని వాడుకోగలం.\n\n```java\n// 1. CLASS = డిజైన్ (ఇది రియల్ కాదు, జస్ట్ ప్లానింగ్ మాత్రమే)\nclass Car {\n    String color;    // Field (కారుకి కలర్ ఉంటుంది అని చెప్తున్నాం)\n    int speed;       // Field\n\n    void accelerate() { // Method (కారు చేసే పని)\n        speed += 10;\n    }\n}\n\n// 2. OBJECT = బ్లూప్రింట్ చూసి తయారు చేసిన రియల్ కారు\nCar myCar = new Car(); // 'new' వాడితేనే రియల్ కారు రెడీ అయినట్టు\n```"
      },
      {
        "heading": "2. Object అంటే ఏంటి?",
        "content": "**Object** అంటే క్లాస్ అనే బ్లూప్రింట్ ని చూసి తయారు చేసిన **ఒక నిజమైన వస్తువు (Instance)**. జావాలో ఇది రన్ టైమ్ లో JVM Heap Memory లో క్రియేట్ అవుతుంది.\n\nప్రతి ఆబ్జెక్ట్ కీ కిందవి ఉంటాయి:\n1. **అడ్రెస్:** Heap మెమరీలో ఒక సొంత అడ్రెస్.\n2. **సొంత డేటా (State):** క్లాస్ లో ఉన్న ప్రతి వేరియబుల్ కీ ఒక కాపీ ఈ ఆబ్జెక్ట్ కి వస్తుంది.\n3. **షేర్డ్ పనులు (Behavior):** క్లాస్ లో రాసిన మెథడ్స్ అన్నీ ఇది వాడుకోగలదు.\n\n```\n  CLASS (దీనికి మెమరీలో కాపీ ఉండదు, ఇది జస్ట్ డిజైన్)   HEAP MEMORY (రియల్ ఆబ్జెక్ట్స్)\n  +----------------------------+    +----------------+  +----------------+\n  | class Student {            |    | Object #1      |  | Object #2      |\n  |   String name;             |    | name = \"Ravi\"  |  | name = \"Priya\" |\n  |   int age;                 |    | age  = 20      |  | age  = 22      |\n  |   void display() { ... }   |    | అడ్రెస్: 0x5A  |  | అడ్రెస్: 0x6B  |\n  | }                          |    +----------------+  +----------------+\n  +----------------------------+\n```"
      },
      {
        "heading": "3. Fields (ఇన్స్టాన్స్ వేరియబుల్స్)",
        "content": "క్లాస్ లోపల (కానీ మెథడ్ కి బయట) రాసే వేరియబుల్స్ ని **Fields** లేదా **Instance Variables** అంటారు:\n\n```java\nclass Student {\n    String name;    // ప్రతి స్టూడెంట్ కీ వాళ్ళకంటూ ఒక పేరు ఉంటుంది (own copy)\n    int age;        // వయసు\n    double gpa;     // మార్కులు\n}\n```\n\n**కొన్ని రూల్స్:**\n- ఇవి ఆబ్జెక్ట్ తో పాటే **Heap** మెమరీలో స్టోర్ అవుతాయి.\n- ఎన్ని ఆబ్జెక్ట్స్ క్రియేట్ చేస్తే, అన్ని సార్లు ఈ వేరియబుల్స్ కి వేరు వేరు కాపీలు వస్తాయి. (Ravi కి వేరే వయసు, Priya కి వేరే వయసు లాగా).\n- మనం ఏ వాల్యూ ఇవ్వకపోతే జావా వీటిని ఆటోమాటిక్ గా `0`, `false`, `null` లతో ఫిల్ చేస్తుంది."
      },
      {
        "heading": "4. Objects ఎలా క్రియేట్ చేయాలి? (new & డాట్ ఆపరేటర్)",
        "content": "`new` అనే కీవర్డ్ జావాకి ఈ మూడు పనులు చెప్తుంది:\n1. Heap మెమరీలో కొత్త ఆబ్జెక్ట్ కి **స్పేస్ బుక్ చెయ్**.\n2. అందులో ఉన్న వేరియబుల్స్ అన్నింటికీ డిఫాల్ట్ (0 లేదా null) **వాల్యూస్ పెట్టు**.\n3. కన్స్ట్రక్టర్ ని పిలిచి **సెటప్ చెయ్**.\n\nఆబ్జెక్ట్ క్రియేట్ అయ్యాక, అందులో ఉన్న డేటాని గానీ పనులని గానీ వాడాలంటే **dot (డాట్) ఆపరేటర్ `.`** వాడాలి:\n```java\nStudent s = new Student(); // ఆబ్జెక్ట్ క్రియేట్ చేసాం\ns.name = \"Ravi\";           // డాట్ వాడి పేరు పెట్టాం\ns.age = 20;                // వయసు పెట్టాం\ns.displayDetails();        // డాట్ వాడి మెథడ్ ని పిలిచాం\n```"
      },
      {
        "heading": "5. JVM మెమరీ మోడల్: Stack రిఫరెన్స్ + Heap ఆబ్జెక్ట్",
        "content": "```\n  STACK MEMORY (జిప్ కోడ్స్)         HEAP MEMORY (నిజమైన ఇల్లు)\n  +-------------------+          +----------------------------+\n  | s1 = 0x4A00       | ------>  | name: \"Ravi\"               |\n  +-------------------+          | age : 20                   |\n  | s2 = 0x7C00       | ------>  +----------------------------+\n  +-------------------+          | name: \"Priya\"              |\n                                  | age : 22                   |\n                                  +----------------------------+\n```\n\n**Null Pointer భయం:**\nఒకవేళ మీరు పాయింటర్ (రిఫరెన్స్) క్రియేట్ చేసి `new` తో ఆబ్జెక్ట్ ఇవ్వకపోతే.. అది ఖాళీగా `null` ని పట్టుకుని ఉంటుంది. దానికి డాట్ `.` పెట్టి పిలిస్తే.. లేని ఇంట్లోకి వెళ్ళడానికి ట్రై చేసినట్టు జావా కి కోపం వచ్చి క్రాష్ అవుతుంది:\n```java\nStudent ghost = null;\nghost.displayDetails(); // ఎర్రర్: java.lang.NullPointerException వస్తుంది!\n```"
      }
    ],
    "codeExample": "class Student {\n    // Fields (Instance Variables)\n    String name;\n    int age;\n\n    // క్లాస్ లోపల రాసిన మెథడ్\n    void displayDetails() {\n        System.out.println(name + \" - \" + age);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. బేసిక్ ఆబ్జెక్ట్ క్రియేషన్ ===\");\n        // Student student = new Student(\"Ravi\", 20); // ఇది నెక్స్ట్ చాప్టర్ లో చూద్దాం\n\n        System.out.println(\"\n=== 2. Dot Operator (డాట్) తో ఫీల్డ్స్ కి వాల్యూస్ ఇవ్వడం ===\");\n        Student s1 = new Student(); // ఆబ్జెక్ట్ క్రియేట్ చేసాం (ఇప్పుడు s1 దగ్గర అడ్రెస్ ఉంటుంది)\n        s1.name = \"Priya Sharma\";   // అడ్రెస్ పట్టుకుని లోపలికెళ్లి పేరు పెట్టాం\n        s1.age  = 22;\n        s1.displayDetails();\n\n        System.out.println(\"\n=== 3. ఒకే క్లాస్ నుంచి మల్టిపుల్ ఆబ్జెక్ట్స్ ===\");\n        Student s2 = new Student();\n        s2.name = \"Kiran Kumar\";\n        s2.age  = 21;\n\n        Student s3 = new Student();\n        s3.name = \"Ananya Reddy\";\n        s3.age  = 23;\n\n        // ఎవరి డేటా వాళ్లదే! ఒకరిది ఒకరికి మిక్స్ అవ్వదు\n        System.out.println(\"ఆబ్జెక్ట్ s1: \"); s1.displayDetails();\n        System.out.println(\"ఆబ్జెక్ట్ s2: \"); s2.displayDetails();\n        System.out.println(\"ఆబ్జెక్ట్ s3: \"); s3.displayDetails();\n\n        System.out.println(\"\n=== 4. ఆబ్జెక్ట్ ఐడెంటిటీ చెకింగ్ (రిఫరెన్స్ కాపీ) ===\");\n        // s1, s2 వేరు వేరు ఇళ్లు కాబట్టి ఫాల్స్ వస్తుంది\n        System.out.println(\"s1 == s2 (ఒకే ఆబ్జెక్ట్ ఆ?) : \" + (s1 == s2));\n\n        Student s4 = s1; // s1 అడ్రెస్ ని s4 కి ఇచ్చాం. ఇప్పుడు ఇద్దరూ ఒకే ఇంటికి పాయింట్ చేస్తారు!\n        System.out.println(\"s4 == s1 (ఒకే ఆబ్జెక్ట్ ఆ?) : \" + (s4 == s1));\n        \n        s4.name = \"MODIFIED via s4\"; // s4 ద్వారా మార్చినా...\n        System.out.println(\"s1 లో మార్పు వచ్చిందా? : \" + s1.name); // s1 కి కూడా మారుతుంది, ఎందుకంటే ఇద్దరికీ ఉన్నది ఒకటే ఇల్లు!\n    }\n}",
    "output": "=== 1. బేసిక్ ఆబ్జెక్ట్ క్రియేషన్ ===\n\n=== 2. Dot Operator (డాట్) తో ఫీల్డ్స్ కి వాల్యూస్ ఇవ్వడం ===\nPriya Sharma - 22\n\n=== 3. ఒకే క్లాస్ నుంచి మల్టిపుల్ ఆబ్జెక్ట్స్ ===\nఆబ్జెక్ట్ s1: \nPriya Sharma - 22\nఆబ్జెక్ట్ s2: \nKiran Kumar - 21\nఆబ్జెక్ట్ s3: \nAnanya Reddy - 23\n\n=== 4. ఆబ్జెక్ట్ ఐడెంటిటీ చెకింగ్ (రిఫరెన్స్ కాపీ) ===\ns1 == s2 (ఒకే ఆబ్జెక్ట్ ఆ?) : false\ns4 == s1 (ఒకే ఆబ్జెక్ట్ ఆ?) : true\ns1 లో మార్పు వచ్చిందా? : MODIFIED via s4",
    "lineByLine": [
      {
        "line": "class Student { String name; int age; }",
        "explanation": "ఇది కేవలం ఒక ప్లాన్ (బ్లూప్రింట్). దీనికి మెమరీలో స్పేస్ ఉండదు."
      },
      {
        "line": "Student s1 = new Student();",
        "explanation": "new అన్నప్పుడే Heap లో ఆబ్జెక్ట్ పుడుతుంది. ఆ ఆబ్జెక్ట్ అడ్రెస్ ని s1 అనే వేరియబుల్ పట్టుకుని ఉంటుంది."
      },
      {
        "line": "s1.name = \"Priya Sharma\";",
        "explanation": "s1 లో ఉన్న అడ్రెస్ ని పట్టుకుని Heap లో ఉన్న అసలు ఆబ్జెక్ట్ దగ్గరికి వెళ్లి అందులో name ఫీల్డ్ లోకి పేరు పెడుతున్నాం."
      },
      {
        "line": "Student s4 = s1;",
        "explanation": "ఇక్కడ కొత్త ఆబ్జెక్ట్ క్రియేట్ అవ్వదు. కేవలం s1 దగ్గర ఉన్న అడ్రెస్ ని కాపీ చేసి s4 కి ఇచ్చాం అంతే. ఇద్దరూ ఒకే ఆబ్జెక్ట్ ని చూస్తున్నారు."
      }
    ],
    "practicalExample": "class BankAccount {\n    String accountNumber;\n    String holderName;\n    double balance;\n\n    void showBalance() {\n        System.out.printf(\"  అకౌంట్: %s | పేరు: %-12s | బ్యాలెన్స్: $%,.2f%n\",\n                accountNumber, holderName, balance);\n    }\n}\n\npublic class PracticalApplication {\n    public static void main(String[] args) {\n        BankAccount acc1 = new BankAccount();\n        acc1.accountNumber = \"SB-001-2026\";\n        acc1.holderName = \"Ravi Kumar\";\n        acc1.balance = 15000.00;\n\n        BankAccount acc2 = new BankAccount();\n        acc2.accountNumber = \"SB-002-2026\";\n        acc2.holderName = \"Priya Devi\";\n        acc2.balance = 32500.75;\n\n        System.out.println(\"=== బ్యాంక్ అకౌంట్స్ డేటా ===\");\n        acc1.showBalance();\n        acc2.showBalance();\n    }\n}",
    "practicalOutput": "=== బ్యాంక్ అకౌంట్స్ డేటా ===\n  అకౌంట్: SB-001-2026 | పేరు: Ravi Kumar    | బ్యాలెన్స్: $15,000.00\n  అకౌంట్: SB-002-2026 | పేరు: Priya Devi    | బ్యాలెన్స్: $32,500.75",
    "commonMistakes": [
      "`new` లేకుండా ఆబ్జెక్ట్ క్రియేట్ చేద్దాం అనుకోవడం. (ఉదా: `Student s1 = Student();`). ఇది జావాలో తప్పు, కచ్చితంగా `new` ఉండాలి.",
      "ఆబ్జెక్ట్ క్రియేట్ చేయకుండానే (కేవలం null పెట్టుకుని) `s1.name` అని వాడటం. అప్పుడు `NullPointerException` వస్తుంది.",
      "`s4 = s1` అని రాసినప్పుడు మొత్తం ఆబ్జెక్ట్ కాపీ అయిపోతుంది అనుకోవడం. ఆబ్జెక్ట్ కాపీ అవ్వదు, కేవలం దాని అడ్రెస్ మాత్రమే కాపీ అవుతుంది.",
      "వేరియబుల్స్ ని క్లాస్ లోపల కాకుండా, ఎక్కడో మెథడ్ లోపల క్రియేట్ చేసి వాటిని వేరే వాళ్ళు కూడా వాడుకోవచ్చు అనుకోవడం. మెథడ్ లోపల ఉంటే అవి లోకల్ వేరియబుల్స్ అయిపోతాయి."
    ],
    "challenge": "// Coding Challenge:\n// 1. Rectangle అనే ఒక క్లాస్ ని క్రియేట్ చేయండి. అందులో length, width అనే రెండు డబుల్ (double) ఫీల్డ్స్ ఉండాలి.\n// 2. calculateArea() అనే మెథడ్ రాయండి (అది length * width ని రిటర్న్ చేయాలి).\n// 3. calculatePerimeter() అనే మెథడ్ రాయండి (అది 2 * (length + width) ని రిటర్న్ చేయాలి).\n// 4. మెయిన్ లో 3 రెక్టాంగిల్స్ ని క్రియేట్ చేసి వాటి వాల్యూస్ ప్రింట్ చేయండి.\n\nclass Rectangle {\n    double length;\n    double width;\n\n    double calculateArea() {\n        return length * width;\n    }\n\n    double calculatePerimeter() {\n        return 2 * (length + width);\n    }\n}\n\npublic class Challenge {\n    public static void main(String[] args) {\n        Rectangle r1 = new Rectangle();\n        r1.length = 10.0; r1.width = 5.0;\n\n        Rectangle r2 = new Rectangle();\n        r2.length = 8.5; r2.width = 3.0;\n\n        System.out.printf(\"R1: ఏరియా=%.2f, చుట్టుకొలత=%.2f%n\", r1.calculateArea(), r1.calculatePerimeter());\n        System.out.printf(\"R2: ఏరియా=%.2f, చుట్టుకొలత=%.2f%n\", r2.calculateArea(), r2.calculatePerimeter());\n    }\n}",
    "faq": [
      {
        "q": "క్లాస్ లోపల ఏ వేరియబుల్స్, మెథడ్స్ లేకుండా ఖాళీగా రాయొచ్చా?",
        "a": "రాసుకోవచ్చు (`class Empty {}`). కానీ అలా రాస్తే ప్రయోజనం ఏమీ ఉండదు. అయితే పెద్ద ప్రాజెక్ట్స్ లో కొన్నిసార్లు కేవలం గుర్తు పట్టడానికి (Marker Interfaces లాగా) ఇలా ఖాళీ క్లాసులు వాడుతుంటారు."
      },
      {
        "q": "ఒక క్లాస్ ని చూసి ఎన్ని ఆబ్జెక్ట్స్ తయారు చేయొచ్చు?",
        "a": "ఇన్ని అన్ని అని లిమిట్ లేదు, మీకు Heap మెమరీ ఫుల్ అయ్యేదాకా ఎన్ని కోట్ల ఆబ్జెక్ట్స్ అయినా క్రియేట్ చేసుకోవచ్చు. ఉదాహరణకి అమెజాన్ సర్వర్స్ లో సెకనుకి లక్షల ఆబ్జెక్ట్స్ ఒకే క్లాస్ నుంచి పుడుతూ ఉంటాయి."
      },
      {
        "q": "క్లాస్ కి, ఆబ్జెక్ట్ కి తేడా ఒక్క ముక్కలో చెప్పండి?",
        "a": "క్లాస్ అనేది పేపర్ మీద గీసిన కారు బొమ్మ (డిజైన్). ఆబ్జెక్ట్ అనేది ఫ్యాక్టరీలో రెడీ అయ్యి రోడ్డు మీద వెళ్తున్న రియల్ కారు."
      }
    ],
    "recap": [
      "Class అనేది ఒక బ్లూప్రింట్. ఇది ఆబ్జెక్ట్ ఎలా ఉండాలి, ఏం పనులు చేయాలి అనేది డిసైడ్ చేస్తుంది.",
      "Object అంటే క్లాస్ ని చూసి క్రియేట్ చేసిన రియల్ ఇన్స్టాన్స్. ఇది Heap మెమరీలో స్టోర్ అవుతుంది.",
      "`new` కీవర్డ్ వాడినప్పుడే ఆబ్జెక్ట్ పుడుతుంది, డిఫాల్ట్ వాల్యూస్ వస్తాయి.",
      "డాట్ (`.`) ఆపరేటర్ వాడి మనం ఆబ్జెక్ట్ లోపల ఉన్న డేటాని గానీ, మెథడ్స్ ని గానీ వాడుకుంటాం.",
      "ప్రతి ఆబ్జెక్ట్ కి సపరేట్ మెమరీ ఉంటుంది. ఒక దాంట్లో వాల్యూ మారిస్తే ఇంకో ఆబ్జెక్ట్ కి ఏమీ కాదు."
    ]
  },
  {
    "num": 39,
    "phaseId": "phase9",
    "phaseTitle": "Phase 9: Classes & Objects",
    "slug": "39-java-constructors-this-keyword-and-overloading",
    "title": "Java Constructors, this Keyword & Constructor Overloading (తెలుగులో)",
    "badge": "39. Constructors & this Keyword",
    "subtopics": "What is a Constructor? · Default Constructor · Parameterized Constructor · Constructor vs Method Differences · this Keyword: 3 Roles · this() Constructor Chaining · Constructor Overloading · Copy Constructor Pattern",
    "readTime": "24 min read",
    "intro": "ఆబ్జెక్ట్ పుట్టగానే దానికి ఒక పేరు, వయసు లాంటివి డిఫాల్ట్ గా సెట్ అవ్వాలంటే ఎలా? అందుకోసమే జావాలో **Constructors (కన్స్ట్రక్టర్స్)** ఉంటాయి. అసలు ఇవి మామూలు మెథడ్స్ కి ఎలా వేరు? దీంట్లో `this` కీవర్డ్ ఎందుకు అంత ఇంపార్టెంట్? కన్స్ట్రక్టర్స్ ని ఓవర్ లోడ్ చేసి రకరకాలుగా ఆబ్జెక్ట్స్ ని ఎలా క్రియేట్ చేయాలో ఈ చాప్టర్ లో డీప్ గా చూద్దాం.",
    "theorySections": [
      {
        "heading": "1. Constructor అంటే ఏంటి? (ఆబ్జెక్ట్ కి ప్రాణం పోసేది)",
        "content": "**Constructor** అంటే ఒక స్పెషల్ మెథడ్. మనం `new` అని ఆబ్జెక్ట్ క్రియేట్ చేయగానే.. **జావా ఆటోమాటిక్ గా దీన్ని రన్ చేస్తుంది**. ఆబ్జెక్ట్ లోపల ఉన్న వేరియబుల్స్ కి ఫస్ట్ టైమ్ వాల్యూస్ ఇవ్వడానికి (Initial setup) దీన్ని వాడతాం.\n\n**కన్స్ట్రక్టర్ కి, మామూలు మెథడ్ కి ఉన్న 5 తేడాలు:**\n\n| రూల్ | Constructor | మామూలు Method |\n|---|---|---|\n| **పేరు** | క్లాస్ పేరు ఏదైతే ఉందో, అచ్చం అదే పేరు ఉండాలి | మన ఇష్టం వచ్చిన పేరు పెట్టుకోవచ్చు |\n| **రిటర్న్ టైప్** | **ఏమీ ఉండకూడదు** (కనీసం `void` అని కూడా రాయకూడదు!) | కచ్చితంగా `void` లేదా ఏదో ఒక టైప్ రాయాలి |\n| **ఎప్పుడు రన్ అవుతుంది?** | `new` తో ఆబ్జెక్ట్ క్రియేట్ అవ్వగానే ఆటోమాటిక్ గా | మనం ఎప్పుడు పిలిస్తే అప్పుడు |\n| **వారసత్వంగా వస్తుందా?** | రాదు (Inherit అవ్వదు) | వస్తుంది (Inherit అవుతుంది) |\n| **ఎందుకు వాడతారు?** | ఆబ్జెక్ట్ పుట్టగానే డేటా సెటప్ చేయడానికి | మనకి కావాల్సిన లాజిక్స్ రన్ చేసుకోవడానికి |"
      },
      {
        "heading": "2. Default Constructor (మనం రాయకపోయినా ఉండేది)",
        "content": "ఒకవేళ మీరు క్లాస్ లోపల **కన్స్ట్రక్టర్ ఏమీ రాయకపోతే**, కంపైల్ చేసేటప్పుడు జావా ఆటోమాటిక్ గా ఒక డమ్మీ కన్స్ట్రక్టర్ ని సృష్టించి పెడుతుంది. దాన్నే **Default Constructor** అంటారు.\n\n```java\nclass Product {\n    String name;\n}\n// జావా లోపల ఇలా రాసుకుంటుంది:\n// Product() { } \n\nProduct p = new Product(); // ఇది వర్క్ అవుతుంది ఎందుకంటే జావా డమ్మీది పెట్టింది కాబట్టి\n```\n\n**డేంజర్ అలర్ట్:** ఒకవేళ మీరు సొంతంగా కనీసం ఒక్క కన్స్ట్రక్టర్ రాసినా సరే.. జావా ఇక ఆ డమ్మీ దాన్ని ఇవ్వదు! అప్పుడు మీరు `new Product()` అని ఖాళీగా ఇస్తే ఎర్రర్ వస్తుంది."
      },
      {
        "heading": "3. Parameterized Constructor (మనం డేటా పంపించడం)",
        "content": "ఆబ్జెక్ట్ క్రియేట్ చేసేటప్పుడే మనం దానికి కావాల్సిన వాల్యూస్ ని (పేరు, వయసు లాంటివి) పంపించడాన్నే **Parameterized Constructor** అంటారు:\n\n```java\nclass Student {\n    String name;\n    int age;\n\n    // Parameterized Constructor\n    Student(String name, int age) {\n        this.name = name; // \"this.name\" అంటే క్లాస్ లో ఉన్న వేరియబుల్. \"name\" అంటే మనం పంపించిన పారామీటర్\n        this.age  = age;\n    }\n}\n\n// ఒకే లైన్ లో ఆబ్జెక్ట్ కి డేటా ఇచ్చేస్తున్నాం\nStudent s = new Student(\"Ravi\", 20);\n```"
      },
      {
        "heading": "4. The this Keyword — దీనికి ఉన్న 3 రోల్స్",
        "content": "`this` అనే కీవర్డ్ **కరెంట్ ఆబ్జెక్ట్** ని పాయింట్ చేస్తుంటుంది. అంటే \"నాది\" అని అర్థం.\n\n**రోల్ 1: పేర్ల కన్ఫ్యూజన్ తీర్చడం (Field Disambiguation)**\nక్లాస్ లో ఉన్న వేరియబుల్ పేరు, మనం మెథడ్ కి పంపిన పారామీటర్ పేరు ఒక్కటే ఉంటే.. కంపైలర్ కి అర్థం కాదు. అప్పుడు `this` వాడి \"ఇది నా క్లాస్ వేరియబుల్ రా బాబు\" అని చెప్తాం:\n```java\nStudent(String name, int age) {\n    this.name = name; // ఈ 'name' నా క్లాస్ ది, ఇవతల ఉన్న 'name' నువ్వు పంపించింది\n    this.age  = age;\n}\n```\n\n**రోల్ 2: కరెంట్ ఆబ్జెక్ట్ ని వేరే వాళ్ళకి పంపడం**\n```java\nvoid register() {\n    Database.save(this); // నన్ను నేను (నా ఆబ్జెక్ట్ ని) డేటాబేస్ కి పంపించుకుంటున్నా\n}\n```\n\n**రోల్ 3: ఇంకో కన్స్ట్రక్టర్ ని పిలవడానికి (`this()`)**\n```java\nStudent(String name) {\n    this(name, 18); // ఇదే క్లాస్ లో ఉన్న రెండు పారామీటర్స్ తీసుకునే కన్స్ట్రక్టర్ కి పంపుతుంది\n}\n```"
      },
      {
        "heading": "5. Constructor Overloading (ఒకటి కంటే ఎక్కువ కన్స్ట్రక్టర్స్)",
        "content": "మెథడ్స్ లాగానే, కన్స్ట్రక్టర్స్ కి కూడా ఒకే పేరుతో (అంటే క్లాస్ పేరుతో) మల్టిపుల్ వెర్షన్స్ రాయొచ్చు. దీన్ని బట్టి ఆబ్జెక్ట్ ని మన ఇష్టం వచ్చినట్టు వేరు వేరు స్టైల్స్ లో క్రియేట్ చేసుకోవచ్చు:\n\n```java\nclass Student {\n    String name;\n    int age;\n\n    // ఏమీ ఇవ్వకపోతే డిఫాల్ట్ గా ఇది తీసుకుంటుంది\n    Student() {\n        this(\"Unknown\", 18);\n    }\n\n    // పేరు మాత్రమే ఇస్తే ఇది రన్ అవుతుంది\n    Student(String name) {\n        this(name, 18);\n    }\n\n    // మొత్తం పంపిస్తే ఇది రన్ అవుతుంది (అసలు పని జరిగేది ఇక్కడే)\n    Student(String name, int age) {\n        this.name = name;\n        this.age  = age;\n    }\n}\n```"
      }
    ],
    "codeExample": "class Student {\n    String name;\n    int age;\n    double gpa;\n    String department;\n\n    // కన్స్ట్రక్టర్ 1: ఏమీ ఇవ్వకపోతే డమ్మీ డేటాతో కిందకి పంపుతుంది\n    Student() {\n        this(\"Unknown Student\", 18, 0.0, \"Undeclared\");\n    }\n\n    // కన్స్ట్రక్టర్ 2: పేరు, వయసు ఇస్తే మిగిలినవి డమ్మీ పెట్టి పంపుతుంది\n    Student(String name, int age) {\n        this(name, age, 0.0, \"General\");\n    }\n\n    // కన్స్ట్రక్టర్ 3: అసలైన ఫుల్ కన్స్ట్రక్టర్ (అన్నీ తీసుకుంటుంది)\n    Student(String name, int age, double gpa, String department) {\n        this.name       = name;\n        this.age        = age;\n        this.gpa        = gpa;\n        this.department = department;\n    }\n\n    // Copy Constructor: ఒక ఆబ్జెక్ట్ లో ఉన్న డేటా మొత్తం కాపీ కొట్టి కొత్తది క్రియేట్ చేయడం\n    Student(Student other) {\n        this(other.name, other.age, other.gpa, other.department);\n    }\n\n    // ఇది మామూలు మెథడ్\n    void displayDetails() {\n        System.out.println(this.name + \" - \" + this.age);\n    }\n\n    void displayFullProfile() {\n        System.out.printf(\"  పేరు: %-18s | వయసు: %2d | GPA: %.2f | బ్రాంచ్: %s%n\",\n                name, age, gpa, department);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. పారామీటర్స్ తో క్రియేట్ చేయడం ===\");\n        Student student = new Student(\"Ravi\", 20);\n        student.displayDetails();\n\n        System.out.println(\"\n=== 2. Constructor Overloading డెమో ===\");\n        Student noArg   = new Student(); // ఏమీ ఇవ్వలేదు\n        Student nameAge = new Student(\"Priya\", 22); // రెండు ఇచ్చాం\n        Student full    = new Student(\"Kiran\", 21, 3.85, \"Computer Science\"); // అన్నీ ఇచ్చాం\n\n        noArg.displayFullProfile();\n        nameAge.displayFullProfile();\n        full.displayFullProfile();\n\n        System.out.println(\"\n=== 3. Copy Constructor (కాపీ కొట్టడం) ===\");\n        Student original = new Student(\"Ananya Reddy\", 23, 3.95, \"Data Science\");\n        Student copy = new Student(original);  // ఒరిజినల్ ఆబ్జెక్ట్ ని పంపించి కొత్తది క్రియేట్ చేసాం\n        copy.name = \"Ananya Reddy (కాపీ)\";    // కాపీ ని మార్చినా ఒరిజినల్ మారదు!\n\n        System.out.println(\"ఒరిజినల్: \" + original.name + \" | GPA: \" + original.gpa);\n        System.out.println(\"కాపీ     : \" + copy.name     + \" | GPA: \" + copy.gpa);\n\n        System.out.println(\"\n=== 4. this Keyword వాడుక ===\");\n        Student s = new Student(\"Venkat\", 25, 3.7, \"Electronics\");\n        s.displayFullProfile();\n    }\n}",
    "output": "=== 1. పారామీటర్స్ తో క్రియేట్ చేయడం ===\nRavi - 20\n\n=== 2. Constructor Overloading డెమో ===\n  పేరు: Unknown Student    | వయసు: 18 | GPA: 0.00 | బ్రాంచ్: Undeclared\n  పేరు: Priya              | వయసు: 22 | GPA: 0.00 | బ్రాంచ్: General\n  పేరు: Kiran              | వయసు: 21 | GPA: 3.85 | బ్రాంచ్: Computer Science\n\n=== 3. Copy Constructor (కాపీ కొట్టడం) ===\nఒరిజినల్: Ananya Reddy | GPA: 3.95\nకాపీ     : Ananya Reddy (కాపీ) | GPA: 3.95\n\n=== 4. this Keyword వాడుక ===\n  పేరు: Venkat             | వయసు: 25 | GPA: 3.70 | బ్రాంచ్: Electronics",
    "lineByLine": [
      {
        "line": "Student student = new Student(\"Ravi\", 20);",
        "explanation": "రెండు పారామీటర్స్ ఉన్న కన్స్ట్రక్టర్ రన్ అవుతుంది, అది `this()` వాడి ఫుల్ కన్స్ట్రక్టర్ కి పంపుతుంది."
      },
      {
        "line": "this(\"Unknown Student\", 18, 0.0, \"Undeclared\");",
        "explanation": "ఇలా `this()` వాడి ఒక కన్స్ట్రక్టర్ ఇంకో కన్స్ట్రక్టర్ కి పనిని అప్పజెప్పొచ్చు. ఇది కచ్చితంగా ఆ బ్లాక్ లో మొదటి లైన్ గానే ఉండాలి."
      },
      {
        "line": "this.name = name;",
        "explanation": "ఎడమవైపు ఉన్న `this.name` క్లాస్ కి చెందింది. కుడివైపు ఉన్న `name` మనం బయటనుంచి పంపింది."
      },
      {
        "line": "Student copy = new Student(original);",
        "explanation": "ఇలా ఆబ్జెక్ట్ కి ఆబ్జెక్ట్ ని మొత్తం పంపించి దానికి జిరాక్స్ తీసినట్టు ఇంకో ఆబ్జెక్ట్ క్రియేట్ చేయడాన్ని Copy Constructor అంటారు."
      }
    ],
    "practicalExample": "class Product {\n    String productId;\n    String name;\n    double price;\n    int stockQuantity;\n\n    Product(String productId, String name, double price, int stockQuantity) {\n        this.productId     = productId;\n        this.name          = name;\n        this.price         = price;\n        this.stockQuantity = stockQuantity;\n    }\n\n    void displayProduct() {\n        System.out.printf(\"  [%s] %-20s | ప్రైస్: $%6.2f | స్టాక్: %3d యూనిట్లు%n\",\n                productId, name, price, stockQuantity);\n    }\n}\n\npublic class PracticalApplication {\n    public static void main(String[] args) {\n        // అన్నీ ఒకే లైన్ లో ఆబ్జెక్ట్ తో పాటు సెటప్ అయిపోతున్నాయి\n        Product p1 = new Product(\"SKU-001\", \"Mechanical Keyboard\", 79.99, 150);\n        Product p2 = new Product(\"SKU-002\", \"Wireless Mouse\",      29.99, 320);\n        Product p3 = new Product(\"SKU-003\", \"4K Monitor\",         349.00,  48);\n\n        System.out.println(\"=== అమెజాన్ ఇన్వెంటరీ క్యాటలాగ్ ===\");\n        p1.displayProduct();\n        p2.displayProduct();\n        p3.displayProduct();\n    }\n}",
    "practicalOutput": "=== అమెజాన్ ఇన్వెంటరీ క్యాటలాగ్ ===\n  [SKU-001] Mechanical Keyboard    | ప్రైస్: $ 79.99 | స్టాక్: 150 యూనిట్లు\n  [SKU-002] Wireless Mouse         | ప్రైస్: $ 29.99 | స్టాక్: 320 యూనిట్లు\n  [SKU-003] 4K Monitor             | ప్రైస్: $349.00 | స్టాక్:  48 యూనిట్లు",
    "commonMistakes": [
      "కన్స్ట్రక్టర్ ముందు `void` లేదా ఏదో ఒక రిటర్న్ టైప్ పెట్టడం. అలా పెడితే అది కన్స్ట్రక్టర్ కాదు, జస్ట్ ఒక మామూలు మెథడ్ అయిపోతుంది.",
      "`this()` ని కన్స్ట్రక్టర్ లోపల ఎక్కడపడితే అక్కడ రాయడం. అది కచ్చితంగా ఆ బ్లాక్ లో మొట్టమొదటి లైన్ లోనే ఉండాలి.",
      "ఒక పారామీటర్ కన్స్ట్రక్టర్ రాసేసి, మళ్ళీ ఆ తర్వాత `new Student()` అని ఖాళీగా ఆబ్జెక్ట్ క్రియేట్ చేద్దాం అనుకోవడం. (ఎర్రర్ వస్తుంది, డిఫాల్ట్ ది పోయింది కదా!)",
      "`this.name = this.name;` అని రాయడం. ఇలా రాస్తే దానికి అదే అసైన్ అయ్యి వాల్యూ సెట్ అవ్వదు. `this.name = name;` అనే ఉండాలి."
    ],
    "challenge": "// Coding Challenge:\n// Circle అనే క్లాస్ ని క్రియేట్ చేయండి:\n// 1. ఫీల్డ్: double radius ఉండాలి.\n// 2. ఒక కన్స్ట్రక్టర్ Circle(double radius) కి this కీవర్డ్ వాడి సెట్ చేయాలి.\n// 3. ఏమీ పంపకపోతే radius 1.0 ఉండేలా No-arg కన్స్ట్రక్టర్ రాయాలి (this(1.0) వాడాలి).\n// 4. ఏరియా, చుట్టుకొలత కనుక్కునే మెథడ్స్ తో పాటు displayInfo() అని ప్రింట్ చేయాలి.\n\nclass Circle {\n    double radius;\n\n    Circle() {\n        this(1.0); // డిఫాల్ట్ గా 1 వెళ్తుంది\n    }\n\n    Circle(double radius) {\n        this.radius = radius;\n    }\n\n    double getArea() {\n        return Math.PI * radius * radius;\n    }\n\n    double getCircumference() {\n        return 2 * Math.PI * radius;\n    }\n\n    void displayInfo() {\n        System.out.printf(\"  సర్కిల్ | రేడియస్: %.2f | ఏరియా: %.4f | చుట్టుకొలత: %.4f%n\",\n                radius, getArea(), getCircumference());\n    }\n}\n\npublic class Challenge {\n    public static void main(String[] args) {\n        new Circle().displayInfo();       // డిఫాల్ట్ రేడియస్ 1.0\n        new Circle(5.0).displayInfo();    // రేడియస్ 5.0\n        new Circle(12.5).displayInfo();   // రేడియస్ 12.5\n    }\n}",
    "faq": [
      {
        "q": "క్లాస్ లో కన్స్ట్రక్టర్ ఏమీ రాయకపోతే ఏమవుతుంది?",
        "a": "జావా ఒక డిఫాల్ట్ కన్స్ట్రక్టర్ ని అదే రాసుకుంటుంది (ఏ పారామీటర్స్ లేనిది). కానీ మీరు ఏదైనా ఒకటి రాస్తే మాత్రం, జావా ఆ డిఫాల్ట్ దాన్ని ఇవ్వదు."
      },
      {
        "q": "ఒక కన్స్ట్రక్టర్ లోపల నుంచి ఇంకో కన్స్ట్రక్టర్ ని పిలవొచ్చా?",
        "a": "పిలవొచ్చు! దాన్నే Constructor Chaining అంటారు. `this(పారామీటర్స్)` అని రాసి పిలుస్తారు, కానీ ఇది కచ్చితంగా మొదటి లైన్ లోనే ఉండాలి."
      },
      {
        "q": "కన్స్ట్రక్టర్స్ కి private అని పెట్టొచ్చా?",
        "a": "పెట్టొచ్చు! అలా పెడితే బయట ఎవరూ మీ క్లాస్ కి ఆబ్జెక్ట్ క్రియేట్ చేయలేరు. దీన్ని Singleton డిజైన్ ప్యాటర్న్ లో ఎక్కువగా వాడతారు."
      }
    ],
    "recap": [
      "ఆబ్జెక్ట్ క్రియేట్ అయిన వెంటనే డేటాని సెటప్ చేయడానికి Constructor వాడతారు.",
      "దీనికి రిటర్న్ టైప్ ఉండదు, క్లాస్ పేరే ఉంటుంది.",
      "పేర్లు కన్ఫ్యూజ్ అవ్వకుండా ఉండటానికి క్లాస్ వేరియబుల్ ముందు `this` వాడుతాం.",
      "`this()` వాడి ఒక కన్స్ట్రక్టర్ ఇంకో కన్స్ట్రక్టర్ ని పిలవొచ్చు (Constructor Chaining).",
      "ఒకే పేరుతో రకరకాల కన్స్ట్రక్టర్స్ రాయడాన్నే Constructor Overloading అంటారు."
    ]
  },
  {
    "num": 40,
    "phaseId": "phase9",
    "phaseTitle": "Phase 9: Classes & Objects",
    "slug": "40-java-static-members-nested-classes-and-enums",
    "title": "Java Static Members, Nested Classes & Enums Masterclass (తెలుగులో)",
    "badge": "40. Static, Nested Classes & Enums",
    "subtopics": "Static Fields (Class Variables) · Static Methods · Static Initializer Blocks · Static vs Instance Memory Layout · Inner Classes (Non-static) · Static Nested Classes · Anonymous Inner Classes · Enums: Type-Safe Constants · Enum Methods & Constructors",
    "readTime": "26 min read",
    "intro": "క్లాస్ మొత్తానికీ కలిపి ఒకే ఒక్క కామన్ డేటా ఉండాలంటే ఏం చేయాలి? ఒక క్లాస్ లోపల ఇంకో క్లాస్ ని ఎందుకు రాస్తారు? జావాలో మ్యాజిక్ లా పనిచేసే Enums (ఎనమ్స్) అంటే ఏంటి? ఈ చాప్టర్ లో `static` మాయాజాలం తో పాటు ఇవన్నీ క్లియర్ గా తెలుసుకుందాం.",
    "theorySections": [
      {
        "heading": "1. Static Fields (క్లాస్ వేరియబుల్స్)",
        "content": "**static field** (దీన్నే క్లాస్ వేరియబుల్ అంటారు) అంటే ఒక క్లాస్ కి సంబంధించిన డేటా. ఇది ఆబ్జెక్ట్స్ అన్నింటికీ కలిపి **ఒకే ఒక్క కాపీ** JVM మెథడ్ ఏరియాలో ఉంటుంది. దాన్ని అందరూ షేర్ చేసుకుంటారు:\n\n```java\nclass Student {\n    static int totalStudents = 0; // ఇది అందరికీ కామన్. ఒక్కటే కాపీ ఉంటుంది.\n    String name;                  // ఇది ఎవరి పేరు వాళ్ళకే ఉంటుంది (సపరేట్ కాపీ)\n\n    Student(String name) {\n        this.name = name;\n        Student.totalStudents++;  // కొత్త ఆబ్జెక్ట్ రాగానే కామన్ కౌంటర్ ని పెంచుతున్నాం\n    }\n}\n\nStudent s1 = new Student(\"Ravi\");\nStudent s2 = new Student(\"Priya\");\nSystem.out.println(Student.totalStudents); // 2 వస్తుంది (అందరూ షేర్ చేసుకున్నారు కాబట్టి!)\n```\n\n**మెమరీలో ఎక్కడ ఉంటాయి?**\n- మామూలు వేరియబుల్స్ (Instance) → Heap లో ఒక్కో ఆబ్జెక్ట్ కి ఒక్కో కాపీ.\n- `static` వేరియబుల్స్ → Class Area లో ఒకే ఒక్క కాపీ."
      },
      {
        "heading": "2. Static Initializer Blocks",
        "content": "క్లాస్ లోపల `static { ... }` అని ఒక బ్లాక్ రాయొచ్చు. దీన్ని **Static Block** అంటారు. JVM మొదటిసారి ఈ క్లాస్ ని లోడ్ చేసినప్పుడు, ఇది **ఒకే ఒక్కసారి** రన్ అవుతుంది. కాంప్లెక్స్ గా ఉండే సెటప్ పనులకి దీన్ని వాడతారు:\n\n```java\nclass DatabaseConfig {\n    static String host;\n    static int port;\n\n    static {\n        // క్లాస్ లోడ్ అయినప్పుడు ఒకేసారి రన్ అవుతుంది\n        host = System.getenv(\"DB_HOST\") != null ? System.getenv(\"DB_HOST\") : \"localhost\";\n        port = 5432;\n        System.out.println(\"[INIT] డేటాబేస్ సెటప్ రెడీ!\");\n    }\n}\n```"
      },
      {
        "heading": "3. Inner Classes (క్లాస్ లోపల క్లాస్)",
        "content": "ఒక క్లాస్ లోపల ఇంకో క్లాస్ ని రాయడాన్నే **Inner Class** అంటారు. లోపల ఉన్న క్లాస్ కి బయట క్లాస్ లో ఉన్న ప్రతిదీ (ప్రైవేట్ ఉన్నవి కూడా) యాక్సెస్ ఉంటుంది:\n\n```java\nclass Engine {\n    private int horsepower = 400;\n\n    class TurboCharger {              // ఇది ఇన్నర్ క్లాస్\n        void boost() {\n            System.out.println(\"బూస్టింగ్ \" + horsepower + \" HP ఇంజిన్!\"); // ప్రైవేట్ ది కూడా వాడుకుంది!\n        }\n    }\n}\n\nEngine engine = new Engine();\n// ఇన్నర్ క్లాస్ ఆబ్జెక్ట్ కావాలంటే బయటి ఆబ్జెక్ట్ ఉండి తీరాలి\nEngine.TurboCharger turbo = engine.new TurboCharger(); \nturbo.boost();\n```"
      },
      {
        "heading": "4. Java Enums: తప్పులు చేయకుండా ఆపే సూపర్ పవర్",
        "content": "**Enum** అంటే కొన్ని ఫిక్స్డ్ వాల్యూస్ ని సేవ్ చేసుకోవడానికి వాడే ఒక స్పెషల్ క్లాస్. ఇది వాడితే మనం స్పెల్లింగ్ తప్పులు రాసి బగ్స్ తెచ్చుకునే బాధ తప్పుతుంది:\n\n```java\n// Enum వాడకపోతే: ఎవరైనా ఇలా తప్పు స్పెల్లింగ్ రాసినా జావా పట్టుకోలేదు!\nString day = \"MONDAI\"; \n\n// Enum వాడితే: ఇవి తప్ప వేరేది రాయలేరు!\nenum Day { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY }\nDay today = Day.MONDAY; // జావా కంపైలర్ పర్ఫెక్ట్ గా చెక్ చేస్తుంది!\n```\n\n**Enums లో కూడా వేరియబుల్స్, కన్స్ట్రక్టర్స్ రాయొచ్చు తెలుసా!**\n```java\nenum Planet {\n    MERCURY(3.303e+23, 2.4397e6),\n    EARTH  (5.976e+24, 6.37814e6);\n\n    private final double mass;\n    private final double radius;\n\n    Planet(double mass, double radius) {\n        this.mass = mass;\n        this.radius = radius;\n    }\n}\n```"
      }
    ],
    "codeExample": "// Enum క్రియేట్ చేస్తున్నాం\nenum OrderStatus {\n    PENDING(\"ఆర్డర్ రిసీవ్ అయ్యింది, వెయిటింగ్\"),\n    PROCESSING(\"ఆర్డర్ ప్యాక్ చేస్తున్నారు\"),\n    SHIPPED(\"ఆర్డర్ బయలుదేరింది\"),\n    DELIVERED(\"కస్టమర్ కి డెలివరీ అయిపొయింది\"),\n    CANCELLED(\"ఆర్డర్ క్యాన్సిల్ చేసారు\");\n\n    private final String description;\n\n    OrderStatus(String description) {\n        this.description = description;\n    }\n\n    public String getDescription() {\n        return description;\n    }\n}\n\nclass ShoppingCart {\n    // Static ఫీల్డ్: అందరికీ కామన్ కౌంటర్\n    static int totalCartsCreated = 0;\n    static final double TAX_RATE  = 0.18; // 18% GST అందరికీ ఒకటే\n\n    // Static ఇనిషియలైజర్ బ్లాక్\n    static {\n        System.out.println(\"  [క్లాస్ లోడ్ అయ్యింది] షాపింగ్ కార్ట్ రెడీ. టాక్స్ రేటు: \" + (TAX_RATE * 100) + \"%\");\n    }\n\n    String customerId;\n    double subtotal;\n    OrderStatus status;\n\n    ShoppingCart(String customerId, double subtotal) {\n        this.customerId = customerId;\n        this.subtotal   = subtotal;\n        this.status     = OrderStatus.PENDING; // డిఫాల్ట్ గా వెయిటింగ్ లో పెడతాం\n        ShoppingCart.totalCartsCreated++; // కౌంటర్ పెంచుతున్నాం\n    }\n\n    double calculateTotalWithTax() {\n        return subtotal * (1 + TAX_RATE);\n    }\n\n    void updateStatus(OrderStatus newStatus) {\n        this.status = newStatus;\n    }\n\n    void displayOrderSummary() {\n        System.out.printf(\"  కస్టమర్: %-10s | సబ్-టోటల్: $%7.2f | టోటల్+టాక్స్: $%7.2f | స్టేటస్: %s%n\",\n                customerId, subtotal, calculateTotalWithTax(), status.name());\n        System.out.println(\"    -> \" + status.getDescription());\n    }\n\n    // Static Nested Class (దీనికి బయటి ఆబ్జెక్ట్ తో పనిలేదు)\n    static class TaxCalculator {\n        static double computeGST(double amount) {\n            return amount * TAX_RATE;\n        }\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. Static బ్లాక్ & ఆబ్జెక్ట్స్ ===\");\n        ShoppingCart cart1 = new ShoppingCart(\"CUST-001\", 499.99);\n        ShoppingCart cart2 = new ShoppingCart(\"CUST-002\", 1200.00);\n\n        System.out.println(\"మొత్తం ఎన్ని కార్ట్స్ క్రియేట్ అయ్యాయి: \" + ShoppingCart.totalCartsCreated);\n\n        System.out.println(\"\n=== 2. Order Status Enum ఎలా మారుతుందో చూద్దాం ===\");\n        cart1.displayOrderSummary();\n        cart1.updateStatus(OrderStatus.PROCESSING);\n        cart1.displayOrderSummary();\n        cart1.updateStatus(OrderStatus.SHIPPED);\n        cart1.displayOrderSummary();\n\n        System.out.println(\"\n=== 3. Enum లో ఏమేమి ఉన్నాయో లిస్ట్ చేయడం (values() వాడి) ===\");\n        System.out.println(\"అందుబాటులో ఉన్న స్టేటస్ లు:\");\n        for (OrderStatus s : OrderStatus.values()) {\n            System.out.printf(\"  %-12s [#%d] -> %s%n\", s.name(), s.ordinal(), s.getDescription());\n        }\n\n        System.out.println(\"\n=== 4. Static Nested Class వాడుక ===\");\n        double gst = ShoppingCart.TaxCalculator.computeGST(cart2.subtotal);\n        System.out.printf(\"  $%.2f మీద GST ఎంతంటే = $%.2f%n\", cart2.subtotal, gst);\n\n        System.out.println(\"\n=== 5. Enum ని switch లో వాడటం ===\");\n        OrderStatus current = OrderStatus.DELIVERED;\n        String message = switch (current) {\n            case PENDING    -> \"మీ ఆర్డర్ క్యూలో ఉంది.\";\n            case PROCESSING -> \"మీ వస్తువులు ప్యాక్ అవుతున్నాయి!\";\n            case SHIPPED    -> \"మీ ఆర్డర్ బయలుదేరింది!\";\n            case DELIVERED  -> \"ఎంజాయ్ యార్!\";\n            case CANCELLED  -> \"క్యాన్సిల్ అయిపొయింది కదరా.\";\n        };\n        System.out.println(\"  స్టేటస్ మెసేజ్: \" + message);\n    }\n}",
    "output": "=== 1. Static బ్లాక్ & ఆబ్జెక్ట్స్ ===\n  [క్లాస్ లోడ్ అయ్యింది] షాపింగ్ కార్ట్ రెడీ. టాక్స్ రేటు: 18.0%\nమొత్తం ఎన్ని కార్ట్స్ క్రియేట్ అయ్యాయి: 2\n\n=== 2. Order Status Enum ఎలా మారుతుందో చూద్దాం ===\n  కస్టమర్: CUST-001   | సబ్-టోటల్: $ 499.99 | టోటల్+టాక్స్: $ 589.99 | స్టేటస్: PENDING\n    -> ఆర్డర్ రిసీవ్ అయ్యింది, వెయిటింగ్\n  కస్టమర్: CUST-001   | సబ్-టోటల్: $ 499.99 | టోటల్+టాక్స్: $ 589.99 | స్టేటస్: PROCESSING\n    -> ఆర్డర్ ప్యాక్ చేస్తున్నారు\n  కస్టమర్: CUST-001   | సబ్-టోటల్: $ 499.99 | టోటల్+టాక్స్: $ 589.99 | స్టేటస్: SHIPPED\n    -> ఆర్డర్ బయలుదేరింది\n\n=== 3. Enum లో ఏమేమి ఉన్నాయో లిస్ట్ చేయడం (values() వాడి) ===\nఅందుబాటులో ఉన్న స్టేటస్ లు:\n  PENDING      [#0] -> ఆర్డర్ రిసీవ్ అయ్యింది, వెయిటింగ్\n  PROCESSING   [#1] -> ఆర్డర్ ప్యాక్ చేస్తున్నారు\n  SHIPPED      [#2] -> ఆర్డర్ బయలుదేరింది\n  DELIVERED    [#3] -> కస్టమర్ కి డెలివరీ అయిపొయింది\n  CANCELLED    [#4] -> ఆర్డర్ క్యాన్సిల్ చేసారు\n\n=== 4. Static Nested Class వాడుక ===\n  $1200.00 మీద GST ఎంతంటే = $216.00\n\n=== 5. Enum ని switch లో వాడటం ===\n  స్టేటస్ మెసేజ్: ఎంజాయ్ యార్!",
    "lineByLine": [
      {
        "line": "static int totalCartsCreated = 0;",
        "explanation": "ఇది ఒక్కటే ఉంటుంది. ఏ ఆబ్జెక్ట్ క్రియేట్ అయినా ఈ కౌంటర్ నే పెంచుతాయి."
      },
      {
        "line": "static { System.out.println(...) }",
        "explanation": "క్లాస్ రన్ అయిన ఫస్ట్ సెకన్ లోనే ఇది రన్ అయ్యి ప్రింట్ అవుతుంది."
      },
      {
        "line": "enum OrderStatus { PENDING(...), ... }",
        "explanation": "ఇవి ఫైనల్ గా ఉన్న ఫిక్స్డ్ వాల్యూస్. ఇవి తప్ప వేరేవేవీ ఈ వేరియబుల్ కి ఎసైన్ చేయలేము."
      },
      {
        "line": "OrderStatus.values()",
        "explanation": "జావా ఎనమ్స్ లోపల ఉన్న వాల్యూస్ అన్నీ ఒక అరే లాగా రిటర్న్ చేసే ఇన్-బిల్ట్ మెథడ్ ఇది."
      },
      {
        "line": "static class TaxCalculator",
        "explanation": "ఇది Nested క్లాస్, పైగా స్టాటిక్. కాబట్టి దీన్ని బయట నుంచి పిలవడానికి ShoppingCart ఆబ్జెక్ట్ అవసరం లేదు."
      }
    ],
    "practicalExample": "enum UserRole { ADMIN, MANAGER, EMPLOYEE, GUEST }\n\nclass Employee {\n    static int headcount = 0;\n    String name;\n    double salary;\n    UserRole role;\n\n    Employee(String name, double salary, UserRole role) {\n        this.name   = name;\n        this.salary = salary;\n        this.role   = role;\n        headcount++;\n    }\n\n    void displayInfo() {\n        System.out.printf(\"  %-14s | రోల్: %-8s | శాలరీ: $%,.2f%n\", name, role, salary);\n    }\n}\n\npublic class PracticalApplication {\n    public static void main(String[] args) {\n        Employee e1 = new Employee(\"Ravi Kumar\",   85000, UserRole.MANAGER);\n        Employee e2 = new Employee(\"Priya Devi\",   62000, UserRole.EMPLOYEE);\n        Employee e3 = new Employee(\"Admin Singh\", 110000, UserRole.ADMIN);\n\n        System.out.println(\"=== HR పోర్టల్ — ఎంప్లాయీ లిస్ట్ ===\");\n        e1.displayInfo(); e2.displayInfo(); e3.displayInfo();\n        System.out.println(\"మొత్తం ఎంప్లాయీస్ (Headcount) : \" + Employee.headcount);\n    }\n}",
    "practicalOutput": "=== HR పోర్టల్ — ఎంప్లాయీ లిస్ట్ ===\n  Ravi Kumar     | రోల్: MANAGER  | శాలరీ: $85,000.00\n  Priya Devi     | రోల్: EMPLOYEE | శాలరీ: $62,000.00\n  Admin Singh    | రోల్: ADMIN    | శాలరీ: $110,000.00\nమొత్తం ఎంప్లాయీస్ (Headcount) : 3",
    "commonMistakes": [
      "స్టాటిక్ వేరియబుల్ ని ఆబ్జెక్ట్ పేరుతో పిలవడం (`s1.totalCount`). ఇది రన్ అవుతుంది కానీ చూడటానికి తప్పుగా ఉంటుంది, క్లాస్ పేరుతోనే (`Student.totalCount`) పిలవాలి.",
      "స్టాటిక్ మెథడ్ లోపల `this` వాడదామని ట్రై చేయడం. (స్టాటిక్ కి ఆబ్జెక్ట్ తో సంబంధం లేదు కాబట్టి ఎర్రర్ వస్తుంది).",
      "Enums వాడకుండా డేంజర్ గా ఉండే స్ట్రింగ్స్ ని వాడి స్టేటస్ మెయింటైన్ చేయడం (`status = \"Pendin\"` అని స్పెల్లింగ్ తప్పు రాస్తే గోవిందా!)."
    ],
    "challenge": "// Coding Challenge:\n// Season అనే ఒక ఎనమ్ (Enum) క్రియేట్ చేయండి. అందులో SPRING, SUMMER, MONSOON, WINTER ఉండాలి.\n// ప్రతి ఎనమ్ కి ఒక String activity (ఉదా: SUMMER కి \"స్విమ్మింగ్\"), getRecommendation() మెథడ్ ఉండాలి.\n// వాటన్నింటినీ ఒక లూప్ లో ప్రింట్ చేయండి.\n\nenum Season {\n    SPRING(\"సైక్లింగ్ అండ్ పిక్నిక్\"),\n    SUMMER(\"స్విమ్మింగ్ అండ్ వాటర్ స్పోర్ట్స్\"),\n    MONSOON(\"ట్రెక్కింగ్ అండ్ వేడి బజ్జీలు\"),\n    WINTER(\"స్కీయింగ్ అండ్ కాఫీ\");\n\n    private final String activity;\n    Season(String activity) { this.activity = activity; }\n\n    public String getRecommendation() {\n        return name() + \": \" + activity;\n    }\n}\n\npublic class Challenge {\n    public static void main(String[] args) {\n        for (Season s : Season.values()) {\n            System.out.println(s.getRecommendation());\n        }\n    }\n}",
    "faq": [
      {
        "q": "స్టాటిక్ ఎప్పుడు వాడాలి, మామూలు (ఇన్స్టాన్స్) ఎప్పుడు వాడాలి?",
        "a": "అందరికీ కామన్ గా ఉండే డేటాకి (ఉదా: స్కూల్ పేరు, టోటల్ కౌంట్, టాక్స్ రేట్) `static` వాడాలి. ఎవరికీ వాళ్లకే సపరేట్ గా ఉండే వాటికి (పేరు, వయసు, బ్యాలెన్స్) మామూలువి వాడాలి."
      },
      {
        "q": "Static Nested Class కి, మామూలు Inner Class కి తేడా ఏంటి?",
        "a": "స్టాటిక్ క్లాస్ బయటి క్లాస్ ఆబ్జెక్ట్ మీద ఆధారపడదు, అది స్వతంత్రంగా బ్రతుకుతుంది. కానీ ఇన్నర్ క్లాస్ రన్ అవ్వాలంటే కచ్చితంగా బయట ఒక ఆబ్జెక్ట్ ఉండి తీరాలి. అది బయటి ప్రైవేట్ డేటాని కూడా యాక్సెస్ చేయగలదు."
      },
      {
        "q": "Enum లో వేరు వేరు కన్స్ట్రక్టర్స్ వాడొచ్చా?",
        "a": "లేదు, ఎనమ్ లో అన్నీ ఒకే టైప్ కన్స్ట్రక్టర్ ని ఫాలో అవ్వాలి (ఓవర్ లోడ్ చేయొచ్చు, కానీ అంత రిస్క్ అవసరం లేదు)."
      }
    ],
    "recap": [
      "`static` అంటే అందరికీ షేర్ చేయబడే ఒకే కాపీ (క్లాస్ ఏరియాలో ఉంటుంది).",
      "Static Block అనేది క్లాస్ లోడ్ అవ్వగానే ఒక్కసారే రన్ అయ్యి ఆగిపోతుంది.",
      "ఒక క్లాస్ లోపల ఇంకో క్లాస్ రాయొచ్చు (Inner / Nested Classes).",
      "తప్పులు చేయకుండా ఫిక్స్డ్ ఆప్షన్స్ ని మాత్రమే వాడుకోవడానికి Enums అద్భుతంగా పనిచేస్తాయి.",
      "`Enum.values()` తో ఎనమ్స్ అన్నింటినీ అరే లాగా వాడుకోవచ్చు."
    ]
  },
  {
    "num": 41,
    "phaseId": "phase9",
    "phaseTitle": "Phase 9: Classes & Objects",
    "slug": "41-java-tostring-encapsulation-and-object-best-practices",
    "title": "Java toString(), Encapsulation, Getters/Setters & Object Best Practices (తెలుగులో)",
    "badge": "41. toString() & Encapsulation",
    "subtopics": "toString() Override · Why Default toString() is Useless · Object.equals() vs == · Encapsulation Principle · private Fields + public Getters & Setters · Data Validation in Setters · Fluent Builder Pattern · Immutable Classes",
    "readTime": "24 min read",
    "intro": "ఒక ఆబ్జెక్ట్ ని ప్రింట్ చేస్తే పిచ్చి పిచ్చి కోడ్ వస్తుందా? దాన్ని అర్థమయ్యేలా ఎలా మార్చాలి (toString)? మన క్లాస్ లో ఉన్న డేటాని ఎవడు పడితే వాడు మార్చేయకుండా సెక్యూరిటీ (Encapsulation) ఎలా ఇవ్వాలి? జావాలో Getters, Setters ఎందుకు అంత ఫేమస్? అసలు డేటా మార్చకుండా ఫ్రీజ్ (Immutable) ఎలా చేయాలో ఈ చాప్టర్ లో చూద్దాం.",
    "theorySections": [
      {
        "heading": "1. toString() మెథడ్ — ఆబ్జెక్ట్ ని అందంగా ప్రింట్ చేయడం",
        "content": "జావాలో ప్రతి క్లాస్ కి డీఫాల్ట్ గా `toString()` అనే ఒక మెథడ్ ఫ్రీగా వస్తుంది (Object క్లాస్ నుంచి). కానీ దాన్ని ప్రింట్ చేస్తే `Student@4aa298b7` అని ఒక చెత్త మెమరీ అడ్రెస్ (హ్యాష్) వస్తుంది.\n\nదాన్ని తీసేసి మనకి అర్థమయ్యేలా మార్చడాన్నే **Overriding toString()** అంటారు:\n\n```java\nclass Student {\n    String name;\n    int age;\n\n    @Override\n    public String toString() {\n        return \"స్టూడెంట్ పేరు: \" + name + \", వయసు: \" + age;\n    }\n}\n\nStudent s = new Student(\"Ravi\", 20);\nSystem.out.println(s); // ఆటోమాటిక్ గా మన toString() కాల్ అవుతుంది!\n// అవుట్పుట్: స్టూడెంట్ పేరు: Ravi, వయసు: 20\n```\n\n**`toString()` ఎప్పుడెప్పుడు ఆటోమాటిక్ గా రన్ అవుతుంది?**\n- `System.out.println(object)` అన్నప్పుడు.\n- స్ట్రింగ్ పక్కన ప్లస్ పెట్టినప్పుడు: `\"వివరాలు: \" + object`"
      },
      {
        "heading": "2. Encapsulation: ఆబ్జెక్ట్ డేటాకి సెక్యూరిటీ గార్డ్",
        "content": "**Encapsulation (ఎన్క్యాప్సులేషన్)** అనేది OOP లో ఒక మెయిన్ పిల్లర్ (పునాది). దీని అర్థం ఏంటంటే:\n1. వేరియబుల్స్ అన్నీ కచ్చితంగా `private` పెట్టాలి (బయట వాళ్ళు డైరెక్ట్ గా ముట్టుకోకుండా).\n2. ఆ డేటా చదవడానికి `public` Getter మెథడ్స్ ఇవ్వాలి.\n3. ఆ డేటా మార్చడానికి `public` Setter మెథడ్స్ (కండిషన్స్ తో సహా) ఇవ్వాలి.\n\n**ఇది ఎందుకు ముఖ్యం?**\n```java\n// సెక్యూరిటీ లేకపోతే (Dangerous!)\nclass BankAccount { public double balance; }\naccount.balance = -50000.0; // ఎవడైనా సరే మైనస్ లోకి లాగేయొచ్చు!\n\n// సెక్యూరిటీ ఉంటే (Safe!)\nclass BankAccount {\n    private double balance; // ప్రైవేట్, ఎవరూ ముట్టుకోలేరు!\n\n    public void setBalance(double amount) {\n        if (amount < 0) throw new IllegalArgumentException(\"బ్యాలెన్స్ మైనస్ లో ఉండకూడదు!\");\n        this.balance = amount;\n    }\n}\n```"
      },
      {
        "heading": "3. Getters and Setters ఎలా రాయాలి?",
        "content": "వీటికి ఒక ఫార్మాట్ (Naming convention) ఉంటుంది:\n- **Getter:** `public ReturnType getFieldName()` అని రాయాలి. (boolean అయితే `isActive()` అని రాస్తారు).\n- **Setter:** `public void setFieldName(Type value)` అని రాయాలి.\n\n```java\nclass Student {\n    private String name;\n    private int age;\n\n    // Getter (చదవడానికి)\n    public String getName() { return name; }\n\n    // Setter (మార్చడానికి + వాలిడేషన్)\n    public void setName(String name) {\n        if (name == null || name.isBlank()) {\n            throw new IllegalArgumentException(\"పేరు ఖాళీగా ఉండకూడదు!\");\n        }\n        this.name = name.trim();\n    }\n\n    public int getAge() { return age; }\n\n    public void setAge(int age) {\n        if (age < 5 || age > 120) {\n            throw new IllegalArgumentException(\"వయసు తప్పుగా ఉంది: \" + age);\n        }\n        this.age = age;\n    }\n}\n```"
      },
      {
        "heading": "4. Fluent Builder ప్యాటర్న్ (లైన్ గా రాసుకుంటూ వెళ్ళడం)",
        "content": "Setters రాసేటప్పుడు `void` బదులు ఆ ఆబ్జెక్ట్ నే రిటర్న్ (`return this`) చేస్తే.. మనం కోడ్ ని చాలా అందంగా చైన్ లాగా రాసుకోవచ్చు:\n\n```java\nclass EmailMessage {\n    private String from, to, subject, body;\n\n    public EmailMessage setFrom(String from)    { this.from = from; return this; }\n    public EmailMessage setTo(String to)        { this.to = to; return this; }\n    public EmailMessage setSubject(String sub)  { this.subject = sub; return this; }\n    public EmailMessage setBody(String body)    { this.body = body; return this; }\n}\n\n// ఇంగ్లీష్ చదివినట్టు ఎంత బాగుందో చూడండి!\nEmailMessage email = new EmailMessage()\n        .setFrom(\"admin@company.com\")\n        .setTo(\"user@gmail.com\")\n        .setSubject(\"Welcome!\")\n        .setBody(\"నీ అకౌంట్ రెడీ అయిపొయింది.\");\n```"
      }
    ],
    "codeExample": "class Student {\n    // సెక్యూరిటీ కోసం అన్నీ private\n    private String name;\n    private int age;\n    private double gpa;\n    private boolean isEnrolled;\n\n    // కన్స్ట్రక్టర్\n    public Student(String name, int age, double gpa) {\n        setName(name);  // సెట్టర్ లో ఉన్న వాలిడేషన్ ఇక్కడ కూడా పనిచేస్తుంది!\n        setAge(age);\n        setGpa(gpa);\n        this.isEnrolled = true;\n    }\n\n    // Getters\n    public String getName()     { return name; }\n    public int getAge()         { return age; }\n    public double getGpa()      { return gpa; }\n    public boolean isEnrolled() { return isEnrolled; }\n\n    // సెక్యూరిటీ రూల్స్ (Setters)\n    public void setName(String name) {\n        if (name == null || name.isBlank())\n            throw new IllegalArgumentException(\"పేరు ఖాళీగా ఉంచకూడదు.\");\n        this.name = name.trim();\n    }\n\n    public void setAge(int age) {\n        if (age < 16 || age > 80)\n            throw new IllegalArgumentException(\"వయసు 16 కి 80 కి మధ్యలో ఉండాలి: \" + age);\n        this.age = age;\n    }\n\n    public void setGpa(double gpa) {\n        if (gpa < 0.0 || gpa > 4.0)\n            throw new IllegalArgumentException(\"GPA 0.0 నుంచి 4.0 మధ్యలో ఉండాలి.\");\n        this.gpa = gpa;\n    }\n\n    public void setEnrolled(boolean enrolled) { this.isEnrolled = enrolled; }\n\n    // మనకి నచ్చినట్టు toString ని మార్చుకోవడం\n    @Override\n    public String toString() {\n        return String.format(\"Student{పేరు='%s', వయసు=%d, gpa=%.2f, జాయిన్_అయ్యాడా=%b}\",\n                name, age, gpa, isEnrolled);\n    }\n\n    public void displayDetails() {\n        System.out.println(name + \" - \" + age);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. toString() వాడకం ===\");\n        Student student = new Student(\"Ravi\", 20, 3.8);\n        student.displayDetails();\n        // ఆబ్జెక్ట్ ని డైరెక్ట్ గా ప్రింట్ చేస్తే toString కాల్ అవుతుంది\n        System.out.println(\"toString() రిజల్ట్: \" + student);\n\n        System.out.println(\"\n=== 2. Getters & Setters వాడకం ===\");\n        student.setGpa(3.95); // సెట్టర్ తో అప్డేట్ చేసాం\n        System.out.printf(\"కొత్త GPA (గెట్టర్ తో): %.2f%n\", student.getGpa());\n\n        System.out.println(\"\n=== 3. వాలిడేషన్ ఆపుతుందో లేదో చెక్ చేద్దాం (Setters) ===\");\n        try {\n            student.setAge(200); // 200 ఏళ్ళ వయసు ఇస్తున్నాం\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"వాలిడేషన్ పట్టుకుంది: \" + e.getMessage());\n        }\n\n        try {\n            student.setGpa(5.5); // GPA 4.0 దాటకూడదు\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"వాలిడేషన్ పట్టుకుంది: \" + e.getMessage());\n        }\n\n        System.out.println(\"\n=== 4. స్ట్రింగ్ తో కలుపుతున్నప్పుడు ఆటోమాటిక్ toString ===\");\n        System.out.println(\"స్టూడెంట్ వివరాలు: \" + student);\n\n        System.out.println(\"\n=== 5. బిల్డర్ / చైన్ ఎగ్జాంపుల్ లాగా డేటా తెచ్చుకోవడం ===\");\n        System.out.println(\"ప్రొఫైల్ కార్డ్: [\" + student.getName() + \" | వయసు: \" + student.getAge() + \" | GPA: \" + student.getGpa() + \"]\");\n    }\n}",
    "output": "=== 1. toString() వాడకం ===\nRavi - 20\ntoString() రిజల్ట్: Student{పేరు='Ravi', వయసు=20, gpa=3.80, జాయిన్_అయ్యాడా=true}\n\n=== 2. Getters & Setters వాడకం ===\nకొత్త GPA (గెట్టర్ తో): 3.95\n\n=== 3. వాలిడేషన్ ఆపుతుందో లేదో చెక్ చేద్దాం (Setters) ===\nవాలిడేషన్ పట్టుకుంది: వయసు 16 కి 80 కి మధ్యలో ఉండాలి: 200\nవాలిడేషన్ పట్టుకుంది: GPA 0.0 నుంచి 4.0 మధ్యలో ఉండాలి.\n\n=== 4. స్ట్రింగ్ తో కలుపుతున్నప్పుడు ఆటోమాటిక్ toString ===\nస్టూడెంట్ వివరాలు: Student{పేరు='Ravi', వయసు=20, gpa=3.95, జాయిన్_అయ్యాడా=true}\n\n=== 5. బిల్డర్ / చైన్ ఎగ్జాంపుల్ లాగా డేటా తెచ్చుకోవడం ===\nప్రొఫైల్ కార్డ్: [Ravi | వయసు: 20 | GPA: 3.95]",
    "lineByLine": [
      {
        "line": "@Override public String toString()",
        "explanation": "Object క్లాస్ ఇచ్చిన చెత్త toString ని పక్కనపెట్టి, మనకి అర్థమయ్యే లాంగ్వేజ్ లో రాసుకుంటున్నాం."
      },
      {
        "line": "if (gpa < 0.0 || gpa > 4.0) throw new IllegalArgumentException(...)",
        "explanation": "ఎవడైనా మైనస్ మార్కులు ఇస్తే మన ఆబ్జెక్ట్ పాడైపోతుంది. అందుకే సెక్యూరిటీ గార్డ్ (Setter) తో ఆపేస్తున్నాం."
      },
      {
        "line": "setName(name); // in constructor",
        "explanation": "కన్స్ట్రక్టర్ లో మళ్ళీ వాలిడేషన్ కోడ్ అంతా కాపీ-పేస్ట్ చేయకుండా.. డైరెక్ట్ గా Setter నే వాడుకుంటున్నాం."
      },
      {
        "line": "System.out.println(\"Student: \" + student)",
        "explanation": "ప్లస్ (+) పెట్టి ఆబ్జెక్ట్ ని యాడ్ చేయగానే జావా వాడి toString() ని ఆటోమాటిక్ గా లాక్కుంటుంది."
      }
    ],
    "practicalExample": "class BankAccount {\n    private final String accountId; // ఇది ఇంకెప్పటికీ మారదు (final)\n    private String holderName;\n    private double balance;\n\n    public BankAccount(String accountId, String holderName, double initialDeposit) {\n        this.accountId  = accountId;\n        this.holderName = holderName;\n        this.balance    = Math.max(0, initialDeposit);\n    }\n\n    // డిపాజిట్ చేయడానికి\n    public void deposit(double amount) {\n        if (amount <= 0) throw new IllegalArgumentException(\"డిపాజిట్ మైనస్ లో ఉండకూడదు!\");\n        balance += amount;\n    }\n\n    // డ్రా చేయడానికి\n    public void withdraw(double amount) {\n        if (amount <= 0 || amount > balance)\n            throw new IllegalArgumentException(\"తప్పు అమౌంట్ లేదా బ్యాలెన్స్ లేదు: $\" + amount);\n        balance -= amount;\n    }\n\n    // చదవడానికి (కానీ డైరెక్ట్ గా మార్చడానికి Setters ఇవ్వలేదు)\n    public double getBalance()    { return balance; }\n    public String getHolderName() { return holderName; }\n\n    @Override\n    public String toString() {\n        return String.format(\"BankAccount{id='%s', పేరు='%s', బ్యాలెన్స్=$%.2f}\",\n                accountId, holderName, balance);\n    }\n}\n\npublic class PracticalApplication {\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount(\"ACC-2026-001\", \"Ravi Kumar\", 5000.0);\n        System.out.println(\"=== బ్యాంక్ అకౌంట్ ఆపరేషన్స్ ===\");\n        System.out.println(\"స్టార్టింగ్: \" + acc);\n        acc.deposit(2000.0);\n        acc.withdraw(800.0);\n        System.out.println(\"ఫైనల్ గా  : \" + acc);\n    }\n}",
    "practicalOutput": "=== బ్యాంక్ అకౌంట్ ఆపరేషన్స్ ===\nస్టార్టింగ్: BankAccount{id='ACC-2026-001', పేరు='Ravi Kumar', బ్యాలెన్స్=$5000.00}\nఫైనల్ గా  : BankAccount{id='ACC-2026-001', పేరు='Ravi Kumar', బ్యాలెన్స్=$6200.00}",
    "commonMistakes": [
      "Getter మెథడ్స్ లో `null` రిటర్న్ చేయడం. దీనివల్ల వాడుకునేవాడికి `NullPointerException` వస్తుంది.",
      "ఒక్కసారి సెట్ అయ్యాక ఎప్పటికీ మారకూడని వాటికి కూడా (ID, పుట్టినతేదీ లాంటివి) Setters రాసేయడం.",
      "`toString()` రాసేటప్పుడు పైన `@Override` అని పెట్టడం మర్చిపోవడం. అది లేకపోతే కొన్నిసార్లు తప్పులు జరిగినా కంపైలర్ కి తెలియదు.",
      "పనిగట్టుకుని ప్రైవేట్ పెట్టి, Setters లో కనీసం ఒక్క `if` కండిషన్ వాలిడేషన్ కూడా రాయకుండా వదిలేయడం."
    ],
    "challenge": "// Coding Challenge:\n// ఒక ఇమ్మ్యూటబుల్ (మార్చడానికి వీల్లేని) Point క్లాస్ ని క్రియేట్ చేయండి:\n// 1. ఫీల్డ్స్: private final double x, private final double y.\n// 2. కన్స్ట్రక్టర్ రాయాలి (Setters అసలే రాయకూడదు).\n// 3. \"(x, y)\" అని వచ్చేలా toString() రాయాలి.\n// 4. పాయింట్ నుంచి పాయింట్ కి దూరం (distance) కనుక్కునే మెథడ్ రాయాలి.\n\nclass Point {\n    private final double x;\n    private final double y;\n\n    public Point(double x, double y) {\n        this.x = x;\n        this.y = y;\n    }\n\n    public double getX() { return x; }\n    public double getY() { return y; }\n\n    public double distanceTo(Point other) {\n        double dx = this.x - other.x;\n        double dy = this.y - other.y;\n        return Math.sqrt(dx * dx + dy * dy);\n    }\n\n    @Override\n    public String toString() {\n        return String.format(\"(%.2f, %.2f)\", x, y);\n    }\n}\n\npublic class Challenge {\n    public static void main(String[] args) {\n        Point a = new Point(0, 0);\n        Point b = new Point(3, 4);\n        System.out.println(\"పాయింట్ A: \" + a);\n        System.out.println(\"పాయింట్ B: \" + b);\n        System.out.printf(\"A నుంచి B కి దూరం: %.2f%n\", a.distanceTo(b));\n    }\n}",
    "faq": [
      {
        "q": "అన్ని వేరియబుల్స్ కచ్చితంగా private పెట్టాల్సిందేనా?",
        "a": "అవును, అదొక మంచి బెస్ట్ ప్రాక్టీస్. వాళ్ళకి డేటా కావాలంటే Getters తో ఇస్తాం. కేవలం `public static final` అని ఉండే (Math.PI లాంటి) కాన్స్టెంట్స్ కి మాత్రమే ప్రైవేట్ పెట్టం ఎందుకంటే అవి ఎవరూ మార్చలేరు కాబట్టి."
      },
      {
        "q": "Immutable Class (ఇమ్మ్యూటబుల్ క్లాస్) అంటే ఏంటి?",
        "a": "ఏ ఆబ్జెక్ట్ ని అయితే ఒక్కసారి క్రియేట్ చేసాక అందులో డేటాని జీవితంలో మళ్ళీ మార్చలేమో.. దాన్నే Immutable అంటారు. ఇందులో వేరియబుల్స్ కి `final` పెడతారు, అసలు Setters అనేవే ఉండవు. జావాలో `String` అనేది దీనికి బెస్ట్ ఎగ్జాంపుల్."
      },
      {
        "q": "మిగతా లాంగ్వేజెస్ లాగా జావాలో ఆటోమాటిక్ గా గెట్టర్స్, సెట్టర్స్ ఎందుకు రావు?",
        "a": "కొత్తగా వచ్చిన జావా 16 నుంచి `record` అనే కీవర్డ్ తో వస్తున్నాయి. అది కాకుండా నార్మల్ గా కూడా Lombok అనే థర్డ్-పార్టీ లైబ్రరీ వాడి `@Getter`, `@Setter` అని రాస్తే మనమేం కోడ్ రాయక్కర్లేదు."
      }
    ],
    "recap": [
      "ఆబ్జెక్ట్ ని నీట్ గా ప్రింట్ చేయడానికి `toString()` మెథడ్ ని మార్చుకుంటాం.",
      "వేరియబుల్స్ కి `private` పెట్టి, మెథడ్స్ కి `public` పెట్టడమే ఎన్క్యాప్సులేషన్.",
      "ఎవడైనా పిచ్చి వాల్యూస్ ఇస్తే బ్లాక్ చేయడానికి సెట్టర్స్ లో `if` కండిషన్స్ రాస్తాం.",
      "కన్స్ట్రక్టర్ లో కూడా డైరెక్ట్ గా వాల్యూ అసైన్ చేయకుండా సెట్టర్స్ ని పిలిస్తే సెక్యూరిటీ ఇంకా బాగుంటుంది.",
      "ఎప్పటికీ మారకూడని ఆబ్జెక్ట్స్ ని (IDలు, పాస్వర్డ్స్) ఇమ్మ్యూటబుల్ క్లాసులుగా (`final`) రాసుకోవాలి."
    ]
  },
  {
    "num": 42,
    "phaseId": "phase9",
    "phaseTitle": "Phase 9: Classes & Objects",
    "slug": "42-java-oop-classes-capstone-projects",
    "title": "Java OOP Capstone Projects: 4 Production-Grade Class Systems (తెలుగులో)",
    "badge": "42. Capstone Projects (4 OOP Systems)",
    "subtopics": "Project 1: Student Management System · Project 2: Book Library System · Project 3: Product Inventory Manager · Project 4: Bank Account Application · OOP Design Principles Review",
    "readTime": "30 min read",
    "intro": "ఇప్పటివరకు నేర్చుకున్న జావా ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP) మొత్తాన్ని వాడి 4 ఇండస్ట్రీ-లెవెల్ ప్రాజెక్ట్స్ క్రియేట్ చేద్దాం. స్టూడెంట్స్ సిస్టమ్, లైబ్రరీలో బుక్స్ మేనేజ్మెంట్, ప్రొడక్ట్ ఇన్వెంటరీ, ఇంకా ట్రాన్సాక్షన్స్ తో కూడిన బ్యాంక్ అకౌంట్ యాప్. ఇందులో ఎన్క్యాప్సులేషన్, కన్స్ట్రక్టర్స్, ఎనమ్స్ అన్నీ పర్ఫెక్ట్ గా వాడబోతున్నాం.",
    "theorySections": [
      {
        "heading": "1. ఈ ప్రాజెక్ట్స్ లో మనం వాడుతున్న OOP రూల్స్",
        "content": "కోడ్ రాసేముందు, ప్రొఫెషనల్ గా ఈ 4 ప్రాజెక్ట్స్ ఎలా డిజైన్ చేసామో చూద్దాం:\n\n1. **Encapsulation (ఎన్క్యాప్సులేషన్):** ఫీల్డ్స్ అన్నీ కచ్చితంగా `private` లో పెట్టి గెట్టర్స్, సెట్టర్స్ వాడాం.\n2. **Constructor Overloading:** ఆబ్జెక్ట్ క్రియేట్ చేయడానికి రకరకాల ఆప్షన్స్ (కన్స్ట్రక్టర్స్) ఇచ్చాం.\n3. **Static Members (స్టాటిక్):** ఐడీలు (STU-001) ఆటోమాటిక్ గా జనరేట్ అవ్వడానికి స్టాటిక్ కౌంటర్స్ వాడాం.\n4. **toString() Override:** ఆబ్జెక్ట్ ని డైరెక్ట్ గా ప్రింట్ చేస్తే అందంగా వచ్చేలా డిజైన్ చేసాం.\n5. **Enums:** స్టేటస్ లు (యాక్టివ్, క్యాన్సిల్) లాంటి వాటికి స్పెల్లింగ్ మిస్టేక్స్ రాకుండా Enums వాడాం.\n6. **Single Responsibility:** ఒక క్లాస్ ఒక పనే చేస్తుంది (బ్యాంక్ బ్యాంక్ పనే చేస్తుంది, బుక్ బుక్ పనే చూసుకుంటుంది)."
      }
    ],
    "codeExample": "import java.util.Arrays;\n\n// =====================================================================\n// ప్రాజెక్ట్ 1: స్టూడెంట్ మేనేజ్మెంట్ సిస్టమ్\n// =====================================================================\nclass Student {\n    private static int totalStudents = 0; // అందరికీ కామన్ కౌంటర్\n\n    enum AcademicStatus { ACTIVE, ON_LEAVE, GRADUATED, EXPELLED }\n\n    private final String studentId; // ఐడీ ఎప్పటికీ మారకూడదు\n    private String name;\n    private int age;\n    private double gpa;\n    private AcademicStatus status;\n\n    Student(String name, int age, double gpa) {\n        totalStudents++;\n        // ఆటోమాటిక్ గా STU-0001, STU-0002 అని ఐడీలు వస్తాయి\n        this.studentId = String.format(\"STU-%04d\", totalStudents);\n        setName(name);\n        setAge(age);\n        setGpa(gpa);\n        this.status = AcademicStatus.ACTIVE;\n    }\n\n    public static int getTotalStudents() { return totalStudents; }\n    public String getName()    { return name; }\n    public double getGpa()     { return gpa; }\n    public AcademicStatus getStatus() { return status; }\n\n    // సెట్టర్స్ విత్ వాలిడేషన్\n    public void setName(String name) {\n        if (name == null || name.isBlank()) throw new IllegalArgumentException(\"పేరు కచ్చితంగా కావాలి!\");\n        this.name = name.trim();\n    }\n    public void setAge(int age) {\n        if (age < 15 || age > 80) throw new IllegalArgumentException(\"వయసు తప్పు: \" + age);\n        this.age = age;\n    }\n    public void setGpa(double gpa) {\n        if (gpa < 0.0 || gpa > 4.0) throw new IllegalArgumentException(\"GPA 0 నుంచి 4 వరకే\");\n        this.gpa = gpa;\n    }\n    public void setStatus(AcademicStatus status) { this.status = status; }\n\n    @Override\n    public String toString() {\n        return String.format(\"[%s] %-18s | వయసు: %2d | GPA: %.2f | స్టేటస్: %s\",\n                studentId, name, age, gpa, status);\n    }\n}\n\n// =====================================================================\n// ప్రాజెక్ట్ 2: లైబ్రరీ బుక్స్ సిస్టమ్\n// =====================================================================\nclass Book {\n    enum Genre { FICTION, NON_FICTION, SCIENCE, TECHNOLOGY, HISTORY, BIOGRAPHY }\n\n    private final String isbn;\n    private String title;\n    private String author;\n    private double price;\n    private int availableCopies;\n    private Genre genre;\n\n    Book(String isbn, String title, String author, double price, int copies, Genre genre) {\n        this.isbn            = isbn;\n        this.title           = title;\n        this.author          = author;\n        this.price           = price;\n        this.availableCopies = copies;\n        this.genre           = genre;\n    }\n\n    public boolean isAvailable()       { return availableCopies > 0; }\n    public String getTitle()           { return title; }\n    public String getAuthor()          { return author; }\n    public int getAvailableCopies()    { return availableCopies; }\n\n    // బుక్ అద్దెకి ఇవ్వడం\n    public boolean checkOut() {\n        if (!isAvailable()) return false; // బుక్స్ లేకపోతే ఫాల్స్\n        availableCopies--;\n        return true;\n    }\n\n    // బుక్ తిరిగి ఇవ్వడం\n    public void returnBook() { availableCopies++; }\n\n    @Override\n    public String toString() {\n        return String.format(\"[%s] %-30s రాసింది: %-18s | రకం: %-11s | బుక్స్: %d | దొరుకుతుందా: %b\",\n                isbn, title, author, genre, availableCopies, isAvailable());\n    }\n}\n\n// =====================================================================\n// ప్రాజెక్ట్ 3: ప్రొడక్ట్ ఇన్వెంటరీ మేనేజర్ (స్టాక్)\n// =====================================================================\nclass Product {\n    enum Category { ELECTRONICS, CLOTHING, FOOD, SPORTS, FURNITURE }\n\n    private static int productCount = 0;\n    private final String productId;\n    private String name;\n    private double price;\n    private int stock;\n    private Category category;\n\n    Product(String name, double price, int stock, Category category) {\n        productCount++;\n        this.productId = String.format(\"PRD-%03d\", productCount);\n        this.name      = name;\n        this.price     = price;\n        this.stock     = stock;\n        this.category  = category;\n    }\n\n    public static int getProductCount() { return productCount; }\n    public String getName()   { return name; }\n    public double getPrice()  { return price; }\n    public int getStock()     { return stock; }\n\n    // స్టాక్ అమ్ముడుపోవడం\n    public boolean sellUnits(int qty) {\n        if (qty <= 0 || qty > stock) return false;\n        stock -= qty;\n        return true;\n    }\n\n    // కొత్త స్టాక్ రావడం\n    public void restock(int qty) {\n        if (qty > 0) stock += qty;\n    }\n\n    @Override\n    public String toString() {\n        return String.format(\"[%s] %-25s | $%7.2f | స్టాక్: %3d | రకం: %s\",\n                productId, name, price, stock, category);\n    }\n}\n\n// =====================================================================\n// ప్రాజెక్ట్ 4: బ్యాంక్ అకౌంట్ యాప్ (ట్రాన్సాక్షన్స్ తో సహా)\n// =====================================================================\nclass BankAccount {\n    enum AccountType { SAVINGS, CURRENT, FIXED_DEPOSIT }\n\n    private static int accountSerial = 1000;\n    private final String accountNumber;\n    private String holderName;\n    private double balance;\n    private AccountType type;\n    private int transactionCount;\n\n    BankAccount(String holderName, double initialDeposit, AccountType type) {\n        this.accountNumber   = \"ACC-\" + (++accountSerial);\n        this.holderName      = holderName;\n        this.balance         = Math.max(0, initialDeposit);\n        this.type            = type;\n        this.transactionCount = 1;\n    }\n\n    public String getAccountNumber() { return accountNumber; }\n    public double getBalance()       { return balance; }\n\n    public void deposit(double amount) {\n        if (amount <= 0) throw new IllegalArgumentException(\"డిపాజిట్ మైనస్ లో ఉండకూడదు!\");\n        balance += amount;\n        transactionCount++;\n        System.out.printf(\"    + డిపాజిట్  $%8.2f | కొత్త బ్యాలెన్స్: $%10.2f%n\", amount, balance);\n    }\n\n    public void withdraw(double amount) {\n        if (amount <= 0 || amount > balance)\n            throw new IllegalArgumentException(\"తప్పు అమౌంట్ లేదా బ్యాలెన్స్ లేదు: $\" + amount);\n        balance -= amount;\n        transactionCount++;\n        System.out.printf(\"    - విత్-డ్రా $%8.2f | కొత్త బ్యాలెన్స్: $%10.2f%n\", amount, balance);\n    }\n\n    // ఇద్దరి మధ్య ట్రాన్స్ఫర్ (స్టాటిక్ మెథడ్)\n    public static boolean transfer(BankAccount from, BankAccount to, double amount) {\n        if (from.balance < amount) return false;\n        from.balance -= amount;\n        to.balance   += amount;\n        from.transactionCount++;\n        to.transactionCount++;\n        return true;\n    }\n\n    @Override\n    public String toString() {\n        return String.format(\"[%s] %-15s | రకం: %-14s | బ్యాలెన్స్: $%10.2f | మొత్తం ట్రాన్సాక్షన్స్: %d\",\n                accountNumber, holderName, type, balance, transactionCount);\n    }\n}\n\n// =====================================================================\n// మెయిన్: 4 ప్రాజెక్ట్స్ ని రన్ చేయడం\n// =====================================================================\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"========================================\");\n        System.out.println(\" ప్రాజెక్ట్ 1: స్టూడెంట్ సిస్టమ్\");\n        System.out.println(\"========================================\");\n        Student stu1 = new Student(\"Ravi Kumar\",    20, 3.85);\n        Student stu2 = new Student(\"Priya Sharma\",  22, 3.72);\n        Student stu3 = new Student(\"Kiran Reddy\",   21, 3.90);\n        stu2.setStatus(Student.AcademicStatus.ON_LEAVE);\n\n        System.out.println(stu1);\n        System.out.println(stu2);\n        System.out.println(stu3);\n        System.out.println(\"మొత్తం స్టూడెంట్స్: \" + Student.getTotalStudents());\n\n        System.out.println(\"\n========================================\");\n        System.out.println(\" ప్రాజెక్ట్ 2: లైబ్రరీ బుక్స్ సిస్టమ్\");\n        System.out.println(\"========================================\");\n        Book b1 = new Book(\"978-001\", \"Clean Code\",          \"Robert C. Martin\",  35.99, 3, Book.Genre.TECHNOLOGY);\n        Book b2 = new Book(\"978-002\", \"The Pragmatic Programmer\",\"Andy Hunt\",     42.50, 2, Book.Genre.TECHNOLOGY);\n        Book b3 = new Book(\"978-003\", \"Effective Java\",       \"Joshua Bloch\",     40.00, 1, Book.Genre.TECHNOLOGY);\n\n        System.out.println(b1);\n        System.out.println(b2);\n        System.out.println(b3);\n\n        System.out.println(\"\n'Effective Java' బుక్ తీసుకుంటున్నాం: \" + b3.checkOut());\n        System.out.println(\"మళ్ళీ అదే బుక్ అడిగితే (బుక్స్ లేవుగా): \" + b3.checkOut());\n        System.out.println(\"తిరిగి ఇచ్చేసాక:\");\n        b3.returnBook();\n        System.out.println(b3);\n\n        System.out.println(\"\n========================================\");\n        System.out.println(\" ప్రాజెక్ట్ 3: ప్రొడక్ట్ ఇన్వెంటరీ\");\n        System.out.println(\"========================================\");\n        Product p1 = new Product(\"Mechanical Keyboard\", 79.99,  150, Product.Category.ELECTRONICS);\n        Product p2 = new Product(\"Wireless Mouse\",       29.99,  320, Product.Category.ELECTRONICS);\n        Product p3 = new Product(\"Yoga Mat\",             19.99,   80, Product.Category.SPORTS);\n\n        System.out.println(p1);\n        System.out.println(p2);\n        System.out.println(p3);\n\n        System.out.println(\"\n5 కీబోర్డ్స్ అమ్మేసాం: \" + p1.sellUnits(5));\n        p3.restock(50); // యోగా మ్యాట్స్ కొత్త స్టాక్ వచ్చింది\n        System.out.println(\"స్టాక్ మారిన తర్వాత:\");\n        System.out.println(p1);\n        System.out.println(p3);\n        System.out.println(\"క్యాటలాగ్ లో ఉన్న మొత్తం ప్రొడక్ట్స్: \" + Product.getProductCount());\n\n        System.out.println(\"\n========================================\");\n        System.out.println(\" ప్రాజెక్ట్ 4: బ్యాంక్ అకౌంట్ యాప్\");\n        System.out.println(\"========================================\");\n        BankAccount alice = new BankAccount(\"Alice Sharma\",  10000.0, BankAccount.AccountType.SAVINGS);\n        BankAccount bob   = new BankAccount(\"Bob Reddy\",      5000.0, BankAccount.AccountType.CURRENT);\n\n        System.out.println(\"స్టార్టింగ్ స్టేటస్:\");\n        System.out.println(\"  \" + alice);\n        System.out.println(\"  \" + bob);\n\n        System.out.println(\"\nఆలిస్ ట్రాన్సాక్షన్స్:\");\n        alice.deposit(2500.0);\n        alice.withdraw(800.0);\n\n        System.out.println(\"\nఆలిస్ నుంచి బాబ్ కి $3000 ట్రాన్స్ఫర్ చేస్తున్నాం: \"\n                + BankAccount.transfer(alice, bob, 3000.0));\n\n        System.out.println(\"\nఫైనల్ స్టేటస్:\");\n        System.out.println(\"  \" + alice);\n        System.out.println(\"  \" + bob);\n    }\n}",
    "output": "========================================\n ప్రాజెక్ట్ 1: స్టూడెంట్ సిస్టమ్\n========================================\n[STU-0001] Ravi Kumar          | వయసు: 20 | GPA: 3.85 | స్టేటస్: ACTIVE\n[STU-0002] Priya Sharma        | వయసు: 22 | GPA: 3.72 | స్టేటస్: ON_LEAVE\n[STU-0003] Kiran Reddy         | వయసు: 21 | GPA: 3.90 | స్టేటస్: ACTIVE\nమొత్తం స్టూడెంట్స్: 3\n\n========================================\n ప్రాజెక్ట్ 2: లైబ్రరీ బుక్స్ సిస్టమ్\n========================================\n[978-001] Clean Code                    రాసింది: Robert C. Martin   | రకం: TECHNOLOGY  | బుక్స్: 3 | దొరుకుతుందా: true\n[978-002] The Pragmatic Programmer      రాసింది: Andy Hunt          | రకం: TECHNOLOGY  | బుక్స్: 2 | దొరుకుతుందా: true\n[978-003] Effective Java                రాసింది: Joshua Bloch       | రకం: TECHNOLOGY  | బుక్స్: 1 | దొరుకుతుందా: true\n\n'Effective Java' బుక్ తీసుకుంటున్నాం: true\nమళ్ళీ అదే బుక్ అడిగితే (బుక్స్ లేవుగా): false\nతిరిగి ఇచ్చేసాక:\n[978-003] Effective Java                రాసింది: Joshua Bloch       | రకం: TECHNOLOGY  | బుక్స్: 1 | దొరుకుతుందా: true\n\n========================================\n ప్రాజెక్ట్ 3: ప్రొడక్ట్ ఇన్వెంటరీ\n========================================\n[PRD-001] Mechanical Keyboard     | $  79.99 | స్టాక్: 150 | రకం: ELECTRONICS\n[PRD-002] Wireless Mouse          | $  29.99 | స్టాక్: 320 | రకం: ELECTRONICS\n[PRD-003] Yoga Mat                | $  19.99 | స్టాక్:  80 | రకం: SPORTS\n\n5 కీబోర్డ్స్ అమ్మేసాం: true\nస్టాక్ మారిన తర్వాత:\n[PRD-001] Mechanical Keyboard     | $  79.99 | స్టాక్: 145 | రకం: ELECTRONICS\n[PRD-003] Yoga Mat                | $  19.99 | స్టాక్: 130 | రకం: SPORTS\nక్యాటలాగ్ లో ఉన్న మొత్తం ప్రొడక్ట్స్: 3\n\n========================================\n ప్రాజెక్ట్ 4: బ్యాంక్ అకౌంట్ యాప్\n========================================\nస్టార్టింగ్ స్టేటస్:\n  [ACC-1001] Alice Sharma      | రకం: SAVINGS        | బ్యాలెన్స్: $  10000.00 | మొత్తం ట్రాన్సాక్షన్స్: 1\n  [ACC-1002] Bob Reddy         | రకం: CURRENT        | బ్యాలెన్స్: $   5000.00 | మొత్తం ట్రాన్సాక్షన్స్: 1\n\nఆలిస్ ట్రాన్సాక్షన్స్:\n    + డిపాజిట్  $ 2500.00 | కొత్త బ్యాలెన్స్: $  12500.00\n    - విత్-డ్రా $  800.00 | కొత్త బ్యాలెన్స్: $  11700.00\n\nఆలిస్ నుంచి బాబ్ కి $3000 ట్రాన్స్ఫర్ చేస్తున్నాం: true\n\nఫైనల్ స్టేటస్:\n  [ACC-1001] Alice Sharma      | రకం: SAVINGS        | బ్యాలెన్స్: $   8700.00 | మొత్తం ట్రాన్సాక్షన్స్: 4\n  [ACC-1002] Bob Reddy         | రకం: CURRENT        | బ్యాలెన్స్: $   8000.00 | మొత్తం ట్రాన్సాక్షన్స్: 2",
    "lineByLine": [
      {
        "line": "Student.getTotalStudents()",
        "explanation": "స్టాటిక్ మెథడ్ వాడి, ఎన్ని ఆబ్జెక్ట్స్ క్రియేట్ అయ్యాయో ట్రాక్ చేస్తున్నాం."
      },
      {
        "line": "b3.checkOut()",
        "explanation": "బుక్స్ ఉన్నాయో లేదో ముందే చెక్ చేసి (Guard condition), అప్పుడే బుక్ ని ఇష్యూ చేస్తాం."
      },
      {
        "line": "BankAccount.transfer(alice, bob, 3000.0)",
        "explanation": "ఇద్దరి అకౌంట్ ఆబ్జెక్ట్స్ ని తీసుకుని.. ఒకరి దాంట్లో డబ్బులు కట్ చేసి ఇంకొకరి దాంట్లో వేస్తున్నాం."
      },
      {
        "line": "System.out.println(stu1)",
        "explanation": "ఇలా పిలవగానే మనం ఓవర్-రైడ్ చేసిన (Override) toString() కాల్ అయ్యి ఫార్మాట్ అయిన స్ట్రింగ్ వస్తుంది."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    public static void main(String[] args) {\n        // 3 సెకన్లలో OOP పవర్ చూద్దాం\n        System.out.println(\"=== 3-Second OOP క్రాష్ కోర్స్ ===\");\n\n        // ఒకేసారి 3 ఆబ్జెక్ట్స్ ని ఒక అరే లో క్రియేట్ చేస్తున్నాం\n        Student[] batch = {\n            new Student(\"Ravi\",  19, 3.5),\n            new Student(\"Priya\", 20, 3.8),\n            new Student(\"Kiran\", 21, 3.9)\n        };\n\n        double totalGpa = 0;\n        for (Student s : batch) {\n            totalGpa += s.getGpa();\n            System.out.println(\"  \" + s);\n        }\n        System.out.printf(\"ఈ బ్యాచ్ ఆవరేజ్ GPA: %.2f%n\", totalGpa / batch.length);\n    }\n}",
    "practicalOutput": "=== 3-Second OOP క్రాష్ కోర్స్ ===\n  [STU-0004] Ravi               | వయసు: 19 | GPA: 3.50 | స్టేటస్: ACTIVE\n  [STU-0005] Priya              | వయసు: 20 | GPA: 3.80 | స్టేటస్: ACTIVE\n  [STU-0006] Kiran              | వయసు: 21 | GPA: 3.90 | స్టేటస్: ACTIVE\nఈ బ్యాచ్ ఆవరేజ్ GPA: 3.73",
    "commonMistakes": [
      "ఆబ్జెక్ట్ తో సంబంధం ఉన్న `withdraw()` లాంటి పనులకి పొరపాటున `static` అని పెట్టడం. (ఎవరి అకౌంట్ లో డబ్బులు తీయాలో జావాకి ఎలా తెలుస్తుంది?)",
      "ఐడీలకి `final` పెట్టకపోవడం. రేపు ఎవడైనా హ్యాకర్ వచ్చి ఐడీ మార్చేస్తే ఇరుక్కుపోతాం.",
      "కొత్త ఆబ్జెక్ట్ క్రియేట్ చేసినప్పుడు కన్స్ట్రక్టర్ లో కౌంటర్ (`count++`) పెంచడం మర్చిపోవడం.",
      "ప్రైవేట్ పెట్టకుండా పబ్లిక్ వేరియబుల్స్ వదిలేయడం. అప్పుడు డేటా సెక్యూరిటీ ఉండదు."
    ],
    "challenge": "// Coding Challenge:\n// BankAccount కి తోడుగా ఒక ఫిక్స్డ్ డిపాజిట్ మెథడ్ యాడ్ చేయండి:\n// 1. calculateMaturity(int years, double annualRate) అనే మెథడ్ రాయాలి.\n//    ఇది: balance * Math.pow(1 + annualRate/100, years) ని రిటర్న్ చేయాలి.\n// 2. దాన్ని FIXED_DEPOSIT అకౌంట్ తో టెస్ట్ చేయండి.\n\nclass ExtendedBankAccount extends BankAccount {\n    ExtendedBankAccount(String holder, double deposit, AccountType type) {\n        super(holder, deposit, type);\n    }\n\n    public double calculateMaturity(int years, double annualRate) {\n        return getBalance() * Math.pow(1 + annualRate / 100.0, years);\n    }\n}\n\npublic class Challenge {\n    public static void main(String[] args) {\n        ExtendedBankAccount fd = new ExtendedBankAccount(\"Savings Plan\", 50000, BankAccount.AccountType.FIXED_DEPOSIT);\n        System.out.printf(\"5 ఏళ్ల తర్వాత 7.5%% వడ్డీతో: $%.2f%n\", fd.calculateMaturity(5, 7.5));\n    }\n}",
    "faq": [
      {
        "q": "ఒకదాని కంటే ఎక్కువ ఆబ్జెక్ట్స్ ని స్టోర్ చేయడానికి Array వాడాలా, లేక ArrayList వాడాలా?",
        "a": "మీకు సైజు ముందే తెలిస్తే (ఉదా: థియేటర్ లో 100 సీట్లు) మామూలు Array వాడొచ్చు. కానీ స్టూడెంట్స్ వస్తూ పోతూ ఉంటే (సైజు మారుతూ ఉంటే) ArrayList వాడటమే కరెక్ట్. దాని గురించి మనం 15వ ఫేజ్ లో క్లియర్ గా నేర్చుకుందాం."
      },
      {
        "q": "ఇద్దరు స్టూడెంట్స్ లో ఎవరి GPA ఎక్కువ ఉందో ఆటోమాటిక్ గా ఎలా సార్ట్ (Sort) చేయాలి?",
        "a": "దీనికోసం `Comparable<Student>` అనే ఒక ఇంటర్ఫేస్ ని వాడాలి. అందులో `compareTo` మెథడ్ రాసి మనం ఎవరి మార్కులు ఎక్కువో జావాకి చెప్తే.. అది ఆటోమాటిక్ గా ర్యాంక్స్ ఇచ్చేస్తుంది."
      },
      {
        "q": "`null` కి, మామూలు ఆబ్జెక్ట్ కి (డిఫాల్ట్ వాల్యూస్ తో ఉన్నదానికి) తేడా ఏంటి?",
        "a": "`null` అంటే అక్కడ అసలు ఇల్లే (ఆబ్జెక్ట్) లేదు అని అర్థం. డిఫాల్ట్ వాల్యూస్ తో ఉన్న ఆబ్జెక్ట్ (`new Student()`) అంటే.. ఇల్లు ఉంది, కానీ అందులో ఫర్నిచర్ (డేటా) ఇంకా వేయలేదు అని అర్థం."
      }
    ],
    "recap": [
      "క్లాస్ లోపల ప్రైవేట్ డేటాని (Fields), పబ్లిక్ పనులని (Methods) ఒక ప్యాకేజీ లాగా కట్టడాన్నే క్లాస్ అంటారు.",
      "స్టాటిక్ వేరియబుల్స్ తో ఆటోమాటిక్ ఐడీలు క్రియేట్ చేయొచ్చు (ఉదా: `\"STU-\" + ++counter`).",
      "Enums వాడితే మనం కోడ్ రాసేటప్పుడే తప్పుల్ని ఆపేయొచ్చు.",
      "`toString()` వాడితే కన్సోల్ లో ఆబ్జెక్ట్స్ కి సంబంధించిన నిజమైన డేటా వస్తుంది, అడ్రెస్ లు రావు.",
      "OOP లో ఉన్న 4 పిల్లర్స్ (Encapsulation, Abstraction, Inheritance, Polymorphism) కి బేస్ ఈ క్లాసులు, ఆబ్జెక్టులే!"
    ]
  }
];
