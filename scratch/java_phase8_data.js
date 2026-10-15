module.exports = [
  {
    "num": 33,
    "phaseId": "phase8",
    "phaseTitle": "Phase 8: Methods & Recursion",
    "slug": "33-java-method-fundamentals-and-call-stack",
    "title": "Java Method Fundamentals, Anatomy & Call Stack Execution (తెలుగులో)",
    "badge": "33. Method Fundamentals & Call Stack",
    "subtopics": "Method ante enti? · DRY Principle · 6 Components of Method Anatomy · Calling Methods · JVM Call Stack Frames · Parameters vs Arguments · Varargs (int... args) · Return Statement & Unreachable Code",
    "readTime": "22 min read",
    "intro": "ఒక పెద్ద ప్రాజెక్ట్ లో ఒకే కోడ్ ని మళ్ళీ మళ్ళీ రాయకుండా ఉండటానికి మనం వాడేదే **Methods (మెథడ్స్)**. అసలు మెథడ్స్ అంటే ఏంటి? వాటిని ఎలా రాయాలి? మనం ఒక మెథడ్ ని పిలవగానే బ్యాక్-గ్రౌండ్ లో జావా Call Stack లో ఏం జరుగుతుంది? ఇన్‌పుట్స్ (Parameters) ఎలా పంపాలి? అవుట్పుట్ (Return) ఎలా తీసుకోవాలి? ఇవన్నీ ఈ చాప్టర్ లో డీటెయిల్డ్ గా నేర్చుకుందాం.",
    "theorySections": [
      {
        "heading": "1. Method అంటే ఏంటి? అసలు ఎందుకు కావాలి?",
        "content": "కంప్యూటర్ ప్రోగ్రామింగ్ లో **Method (మెథడ్)** (దీన్నే ఫంక్షన్ అని కూడా అంటారు) అంటే **కొంత కోడ్ ని ఒక బ్లాక్ లో పెట్టి దానికి ఒక పేరు ఇవ్వడం**. మనం దాన్ని ఎప్పుడు పిలిస్తే (Call చేస్తే) అప్పుడు మాత్రమే ఆ కోడ్ రన్ అవుతుంది.\n\n**మెథడ్స్ ఎందుకు కావాలి? (DRY Principle):**\n- **Don't Repeat Yourself (DRY):** ఉదాహరణకి ఒక బిల్ కి టాక్స్ కట్టే కోడ్ 20 లైన్లు ఉందనుకోండి. దాన్ని ప్రాజెక్ట్ లో 50 చోట్ల రాయాల్సి వస్తే.. ప్రతి చోటా కాపీ-పేస్ట్ చేయం! ఆ 20 లైన్ల కోడ్ ని `calculateTax()` అనే మెథడ్ లో పెట్టి, కావాల్సినప్పుడు ఆ పేరుతో పిలుస్తాం.\n- **క్లీన్ కోడ్:** 5000 లైన్ల కోడ్ మొత్తం ఒకే చోట (మెయిన్ మెథడ్ లో) రాస్తే చదవడానికి పిచ్చెక్కిపోతుంది. దాన్ని చిన్న చిన్న మెథడ్స్ (ఒక్కోటి 10-20 లైన్లు) కింద విడగొడితే కోడ్ అర్థం చేసుకోవడం, బగ్స్ ఫిక్స్ చేయడం చాలా ఈజీ అవుతుంది.\n- **మెయింటెనెన్స్ ఈజీ:** రేపు టాక్స్ 18% నుంచి 12% కి మారితే.. 50 చోట్ల మార్చాల్సిన అవసరం లేదు. మెథడ్ లో ఉన్న ఒక్క లైన్ మారిస్తే ప్రాజెక్ట్ మొత్తం మారిపోతుంది!"
      },
      {
        "heading": "2. ఒక Method లో ఉండే 6 ప్రధాన భాగాలు",
        "content": "జావాలో ప్రతి మెథడ్ కి ఒక పర్ఫెక్ట్ స్ట్రక్చర్ (Anatomy) ఉంటుంది. ఆ 6 భాగాలు ఏంటంటే:\n\n```java\n// Method హెడర్ స్ట్రక్చర్:\npublic static int calculateSum(int firstNumber, int secondNumber) {\n  // Method బాడీ\n  int total = firstNumber + secondNumber;\n  return total;\n}\n```\n\n1. **Access Modifier (`public`, `private`):** ఈ మెథడ్ ని వేరే క్లాస్ నుంచి పిలవొచ్చా లేదా అని చెప్తుంది.\n2. **Non-Access Modifier (`static`):** ఇది ఆబ్జెక్ట్ కి సంబంధించిందా లేక డైరెక్ట్ గా క్లాస్ తోనే పిలవొచ్చా అనేది చెప్తుంది.\n3. **Return Type (`int`, `double`, `String`, `void`):** ఈ మెథడ్ పని పూర్తయ్యాక మనకి రిటర్న్ గా ఏ టైప్ డేటా ఇస్తుంది అని చెప్తుంది. ఏమి ఇవ్వకపోతే `void` అని రాయాలి.\n4. **Method Name (`calculateSum`):** ఇది ఆ మెథడ్ పేరు. **camelCase** లో ఉండాలి (ఉదాహరణకి `getUserName()`, `sendEmail()` లాగా వర్బ్ తో స్టార్ట్ అయితే మంచిది).\n5. **Parameters `(int a, int b)`:** మెథడ్ కి మనం బయట నుంచి పంపించే ఇన్పుట్స్. బ్రాకెట్స్ లోపల రాయాలి. ఏమీ అవసరం లేకపోతే ఖాళీగా `()` వదిలేయాలి.\n6. **Method Body (`{ ... }`):** ఈ మెథడ్ ఏం చేయాలో ఆ కోడ్ అంతా ఈ బ్రాకెట్స్ లోపల రాయాలి."
      },
      {
        "heading": "3. JVM Call Stack అంటే ఏంటి? మెథడ్స్ ఎలా రన్ అవుతాయి?",
        "content": "మన ప్రోగ్రామ్ రన్ అవ్వగానే, JVM మెమరీలో **Call Stack** అనే ఒక రాక్ లాంటి దాన్ని రెడీ చేస్తుంది:\n- **Stack Frame:** మనం ఒక మెథడ్ ని పిలవగానే, JVM ఒక కొత్త **Stack Frame (స్టాక్ ఫ్రేమ్)** ని క్రియేట్ చేసి ఆ స్టాక్ లో పెడుతుంది. అందులో ఆ మెథడ్ కి సంబంధించిన వేరియబుల్స్, ఇన్పుట్స్ అన్నీ ఉంటాయి.\n- **Frame Popping:** ఆ మెథడ్ పని అవ్వగానే (లేదా `return` కి చేరుకోగానే) ఆ ఫ్రేమ్ ని స్టాక్ లోంచి తీసి పడేస్తుంది (Pop). దాంతో ఆ వేరియబుల్స్ అన్నీ మెమరీలోంచి డిలీట్ అయిపోతాయి!\n\n```\n  CALL STACK ఎగ్జిక్యూషన్:\n  \n  [ add() Frame ]       <--- 3. add(10, 20) రన్ అవుతుంది; 30 ఇచ్చేసి డిలీట్ (pop) అయిపోతుంది!\n  [ main() Frame ]      <--- 2. main() మెథడ్ add(10, 20) ని పిలిచింది.\n  +------------------+\n  | JVM Call Stack   |  <--- 1. ప్రోగ్రామ్ స్టార్ట్ అవ్వగానే JVM మెయిన్ మెథడ్ ని పుష్ చేస్తుంది.\n  +------------------+\n```"
      },
      {
        "heading": "4. Parameters vs Arguments (ఈ రెండిటికి తేడా ఏంటి?)",
        "content": "చాలామందికి ఈ రెండూ ఒకటే అనుకుంటారు, కానీ టెక్నికల్ గా చిన్న తేడా ఉంది:\n\n- **Parameters (పారామీటర్స్):** మెథడ్ ని రాసేటప్పుడు హెడర్ లో వాడే వేరియబుల్స్ ని Parameters అంటారు. ఇవి జస్ట్ ప్లేస్ హోల్డర్స్ లాంటివి.\n  ```java\n  static int add(int first, int second) // ఇక్కడ \"first\", \"second\" లు PARAMETERS\n  ```\n- **Arguments (ఆర్గ్యుమెంట్స్):** ఆ మెథడ్ ని పిలిచేటప్పుడు (Call చేసేటప్పుడు) మనం నిజంగా పంపించే నంబర్స్ లేదా వాల్యూస్ ని Arguments అంటారు.\n  ```java\n  int result = add(10, 20); // ఇక్కడ 10, 20 అనేవి ARGUMENTS\n  ```"
      },
      {
        "heading": "5. Varargs (Variable Arguments) `int... numbers`",
        "content": "మెథడ్ కి ఎన్ని నంబర్స్ పంపిస్తామో ముందే తెలియనప్పుడు (ఉదాహరణకి అప్పుడప్పుడు 2 నంబర్స్, అప్పుడప్పుడు 5 నంబర్స్ పంపిస్తుంటే) మనం Array వాడతాం. కానీ జావా 5 నుంచి **Varargs** అనే కొత్త ఫీచర్ వచ్చింది. ఇది వాడితే మనం ఎన్ని నంబర్స్ అయినా కామాలతో పంపించొచ్చు, అది ఆటోమాటిక్ గా Array లాగా తీసుకుంటుంది:\n\n```java\npublic static int sumAll(int... numbers) { // ఈ 3 డాట్స్ ని Varargs అంటారు\n    int total = 0;\n    for (int n : numbers) total += n;\n    return total;\n}\n\n// ఇప్పుడు దీన్ని ఎలాగైనా పిలవొచ్చు:\nsumAll();               // ఏమీ పంపకపోయినా ఆక్సెప్ట్ చేస్తుంది -> 0 వస్తుంది\nsumAll(10, 20);         // 2 పంపొచ్చు -> 30 వస్తుంది\nsumAll(5, 10, 15, 20);  // 4 పంపొచ్చు -> 50 వస్తుంది\n```\n\n**Varargs రూల్స్:**\n1. ఒక మెథడ్ లో కేవలం **ఒకటి మాత్రమే** Varargs ఉండాలి.\n2. ఒకవేళ వేరే పారామీటర్స్ కూడా ఉంటే, Varargs కచ్చితంగా **అన్నిటికన్నా చివరన (Last) మాత్రమే** ఉండాలి (ఉదా: `(String title, int... scores)`)."
      },
      {
        "heading": "6. Return స్టేట్మెంట్ & Unreachable Code ఎర్రర్",
        "content": "`return` కీవర్డ్ కి రెండు పనులున్నాయి:\n1. **వాల్యూ ని తిరిగి ఇవ్వడం:** `void` కాని మెథడ్స్ లో, రిజల్ట్ ని తిరిగి పంపించడానికి వాడతాం (ఉదా: `return first + second;`).\n2. **మధ్యలోనే ఆపేయడం:** ఒకవేళ `void` మెథడ్ అయితే కనుక, జస్ట్ `return;` అని రాస్తే చాలు.. ఆ మెథడ్ అక్కడితో ఆగిపోయి వెనక్కి వెళ్లిపోతుంది (Early Exit).\n\n**Unreachable Code Error (చేరుకోలేని కోడ్):**\nమెథడ్ లో ఒకసారి `return` అన్నాక ఆ తర్వాత ఏ కోడ్ రాసినా అది ఎప్పటికీ రన్ అవ్వదు కదా! జావా అలా రన్ అవ్వని కోడ్ రాస్తే ఒప్పుకోదు, కంపైల్ ఎర్రర్ ఇస్తుంది:\n```java\nstatic int getScore() {\n    return 100; // ఇక్కడినుంచి వెనక్కి వెళ్లిపోతుంది\n    System.out.println(\"Done\"); // COMPILE ERROR: ఎందుకంటే ఇక్కడిదాకా రాదు కాబట్టి (Unreachable)!\n}\n```"
      }
    ],
    "codeExample": "public class Main {\n    // 1. రెండు నంబర్స్ ని కలిపి ఆన్సర్ ని రిటర్న్ చేసే బేసిక్ మెథడ్\n    static int add(int first, int second) {\n        return first + second;\n    }\n\n    // 2. వేరు వేరు టైప్స్ ఉన్న పారామీటర్స్ తీసుకునే మెథడ్ (void కాబట్టి ఏమీ రిటర్న్ చేయదు)\n    static void printStudentProfile(String name, int age, double gpa, boolean isEnrolled) {\n        System.out.println(\"  పేరు      : \" + name);\n        System.out.println(\"  వయసు      : \" + age + \" ఇయర్స్\");\n        System.out.printf(\"  GPA       : %.2f%n\", gpa);\n        System.out.println(\"  స్టేటస్     : \" + (isEnrolled ? \"ఆక్టివ్\" : \"పాస్ ఔట్\"));\n    }\n\n    // 3. కండిషన్ ఫెయిల్ అయితే మధ్యలోనే ఆపేయడం (Early Return)\n    static void processWithdrawal(double balance, double amount) {\n        if (amount <= 0) {\n            System.out.println(\"  [ఎర్రర్] తప్పు అమౌంట్ ఎంటర్ చేసారు: $\" + amount);\n            return; // కండిషన్ ఫెయిల్ కాబట్టి కిందకి వెళ్లకుండా ఇక్కడే ఆపేసి వెనక్కి వెళ్ళిపోతుంది\n        }\n        if (amount > balance) {\n            System.out.println(\"  [ఎర్రర్] అకౌంట్ లో బ్యాలెన్స్ లేదు! బ్యాలెన్స్: $\" + balance);\n            return; // Early exit\n        }\n        double remaining = balance - amount;\n        System.out.printf(\"  [సక్సెస్] $%.2f డ్రా చేసారు. కొత్త బ్యాలెన్స్: $%.2f%n\", amount, remaining);\n    }\n\n    // 4. Varargs మెథడ్ (ఎన్ని నంబర్స్ అయినా పంపించొచ్చు)\n    static int calculateTotal(int... scores) {\n        int sum = 0;\n        for (int s : scores) {\n            sum += s;\n        }\n        return sum;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. బేసిక్ మెథడ్ కాల్ ===\");\n        int result = add(10, 20);\n        System.out.println(\"add(10, 20) రిజల్ట్        : \" + result);\n\n        System.out.println(\"\n=== 2. మల్టిపుల్ పారామీటర్స్ పంపడం ===\");\n        printStudentProfile(\"Ravi Kumar\", 21, 3.85, true);\n\n        System.out.println(\"\n=== 3. Early Return (మధ్యలోనే ఆపేయడం) ===\");\n        processWithdrawal(500.0, -50.0);  // మైనస్ వాల్యూ ఇచ్చాం కాబట్టి ఆగిపోతుంది\n        processWithdrawal(500.0, 700.0);  // బ్యాలెన్స్ కన్నా ఎక్కువ అడిగాం కాబట్టి ఆగిపోతుంది\n        processWithdrawal(500.0, 150.0);  // అన్నీ కరెక్ట్ గా ఉన్నాయి కాబట్టి సక్సెస్ అవుతుంది\n\n        System.out.println(\"\n=== 4. Varargs మెథడ్ డెమో ===\");\n        System.out.println(\"2 నంబర్స్ పంపితే (10, 20)       : \" + calculateTotal(10, 20));\n        System.out.println(\"4 నంబర్స్ పంపితే (5, 15, 25, 35): \" + calculateTotal(5, 15, 25, 35));\n        System.out.println(\"ఏమీ పంపకపోతే ()                 : \" + calculateTotal());\n    }\n}",
    "output": "=== 1. బేసిక్ మెథడ్ కాల్ ===\nadd(10, 20) రిజల్ట్        : 30\n\n=== 2. మల్టిపుల్ పారామీటర్స్ పంపడం ===\n  పేరు      : Ravi Kumar\n  వయసు      : 21 ఇయర్స్\n  GPA       : 3.85\n  స్టేటస్     : ఆక్టివ్\n\n=== 3. Early Return (మధ్యలోనే ఆపేయడం) ===\n  [ఎర్రర్] తప్పు అమౌంట్ ఎంటర్ చేసారు: $-50.0\n  [ఎర్రర్] అకౌంట్ లో బ్యాలెన్స్ లేదు! బ్యాలెన్స్: $500.0\n  [సక్సెస్] $150.00 డ్రా చేసారు. కొత్త బ్యాలెన్స్: $350.00\n\n=== 4. Varargs మెథడ్ డెమో ===\n2 నంబర్స్ పంపితే (10, 20)       : 30\n4 నంబర్స్ పంపితే (5, 15, 25, 35): 80\nఏమీ పంపకపోతే ()                 : 0",
    "lineByLine": [
      {
        "line": "static int add(int first, int second)",
        "explanation": "రెండు ఇంటిజర్స్ ని తీసుకుని, వాటని కలిపి ఇంటిజర్ ని తిరిగి (return) ఇచ్చే మెథడ్ ని రాసాము."
      },
      {
        "line": "int result = add(10, 20);",
        "explanation": "add అనే మెథడ్ కి 10, 20 పంపించాం. అది వాటిని కలిపి 30 ని మనకి ఇచ్చింది, దాన్ని result లో సేవ్ చేసుకున్నాం."
      },
      {
        "line": "if (amount > balance) return;",
        "explanation": "డ్రా చేసే అమౌంట్ బ్యాలెన్స్ కన్నా ఎక్కువ ఉంటే, కింద ఉన్న కోడ్ రన్ అవ్వకుండా ముందే ఆపేసి వెనక్కి వెళ్లిపోతుంది (Guard clause)."
      },
      {
        "line": "static int calculateTotal(int... scores)",
        "explanation": "int... అని వాడటం వల్ల మనం ఎన్ని నంబర్స్ అయినా కామాలు పెట్టి పంపొచ్చు. జావా వాటన్నిటినీ పట్టుకుని లోపల ఒక Array లాగా మార్చేసుకుంటుంది."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    // రియల్ టైమ్ సినారియో: ఈ-కామర్స్ (ఆన్లైన్ షాపింగ్) కూపన్ డిస్కౌంట్ కాలిక్యులేటర్\n    public static double applyCoupon(double orderTotal, String couponCode) {\n        // కూపన్ ఏమీ ఇవ్వకపోయినా, కార్ట్ లో అమౌంట్ లేకపోయినా ఉన్నది ఉన్నట్టు ఇచ్చేయాలి\n        if (orderTotal <= 0) return 0.0;\n        if (couponCode == null || couponCode.isBlank()) return orderTotal;\n\n        // కూపన్ పేరు బట్టి డిస్కౌంట్ వేయడం\n        return switch (couponCode.toUpperCase().trim()) {\n            case \"WELCOME20\" -> orderTotal * 0.80; // 20% డిస్కౌంట్\n            case \"FREESHIP\"  -> Math.max(0.0, orderTotal - 15.0); // షిప్పింగ్ ఛార్జ్ $15 తగ్గింపు\n            case \"VIP50\"     -> orderTotal >= 200.0 ? orderTotal * 0.50 : orderTotal; // $200 దాటితేనే 50% ఆఫ్\n            default          -> orderTotal; // తప్పు కూపన్ ఇస్తే డిస్కౌంట్ ఉండదు\n        };\n    }\n\n    public static void main(String[] args) {\n        double cart = 250.0;\n        System.out.println(\"=== చెక్-అవుట్ డిస్కౌంట్ సర్వీస్ ===\");\n        System.out.printf(\"ఒరిజినల్ బిల్ : $%.2f%n\", cart);\n        System.out.printf(\"WELCOME20 తో  : $%.2f%n\", applyCoupon(cart, \"WELCOME20\"));\n        System.out.printf(\"VIP50 తో      : $%.2f%n\", applyCoupon(cart, \"VIP50\"));\n        System.out.printf(\"తప్పు కూపన్ తో : $%.2f%n\", applyCoupon(cart, \"EXPIRED99\"));\n    }\n}",
    "practicalOutput": "=== చెక్-అవుట్ డిస్కౌంట్ సర్వీస్ ===\nఒరిజినల్ బిల్ : $250.00\nWELCOME20 తో  : $200.00\nVIP50 తో      : $125.00\nతప్పు కూపన్ తో : $250.00",
    "commonMistakes": [
      "`void` కాని మెథడ్స్ కి ఏ కండిషన్ లో అయినా సరే `return` కచ్చితంగా ఉండాలి. ఒకవేళ మీరు కేవలం `if` లో మాత్రమే రాసి వదిలేస్తే (కిందకి వెళ్తే రిటర్న్ ఉండదు కాబట్టి) కంపైల్ ఎర్రర్ వస్తుంది.",
      "`return` లేదా `break` రాసిన తర్వాత దాని కింద ఏమైనా ప్రింట్ చేద్దాం అని రాస్తే, జావా \"Unreachable code\" అని ఎర్రర్ ఇస్తుంది.",
      "Varargs ని వాడేటప్పుడు మొదటి పారామీటర్ గా వాడటం (ఉదా: `(int... nums, String name)`). ఇది కచ్చితంగా చివరలోనే ఉండాలి.",
      "మెథడ్ ని పిలిచేటప్పుడు అడిగిన ఆర్డర్ లో కాకుండా మన ఇష్టం వచ్చిన ఆర్డర్ లో పారామీటర్స్ పంపడం."
    ],
    "challenge": "// Coding Challenge:\n// ఒక నంబర్ ని పంపిస్తే అది ప్రైమ్ నంబర్ (Prime number) అవునా కాదా అని చెప్పే isPrime(int n) మెథడ్ ని రాయండి.\n// 1. 1 కన్నా తక్కువుంటే false రావాలి.\n// 2. ఒకవేళ ప్రైమ్ అయితే true రావాలి, లేకపోతే false.\n// 3. main() లో 1 నుంచి 50 మధ్యలో ఎన్ని ప్రైమ్ నంబర్స్ ఉన్నాయో కౌంట్ చేసి ప్రింట్ చేయాలి.\n\npublic class Challenge {\n    public static boolean isPrime(int n) {\n        if (n <= 1) return false;\n        if (n == 2) return true;\n        if (n % 2 == 0) return false;\n        for (int i = 3; i <= Math.sqrt(n); i += 2) {\n            if (n % i == 0) return false;\n        }\n        return true;\n    }\n\n    public static void main(String[] args) {\n        int primeCount = 0;\n        for (int i = 1; i <= 50; i++) {\n            if (isPrime(i)) {\n                primeCount++;\n            }\n        }\n        System.out.println(\"1 నుంచి 50 మధ్యలో ఉన్న ప్రైమ్ నంబర్స్ కౌంట్: \" + primeCount);\n    }\n}",
    "faq": [
      {
        "q": "Function (ఫంక్షన్) కీ, Method (మెథడ్) కీ తేడా ఏంటి?",
        "a": "రెండూ చేసే పని ఒకటే! కాకపోతే సి లాంటి లాంగ్వేజెస్ లో అవి క్లాస్ కి బయట ఉంటాయి కాబట్టి ఫంక్షన్స్ అంటారు. జావాలో ప్రతిదీ కచ్చితంగా క్లాస్ లోపలే ఉంటుంది కాబట్టి వాటినే మెథడ్స్ అంటారు."
      },
      {
        "q": "static మెథడ్స్ కీ, non-static మెథడ్స్ కీ తేడా ఏంటి?",
        "a": "`static` అని ఉంటే ఆ మెథడ్ ని మనం ఆబ్జెక్ట్ క్రియేట్ చేయకుండానే డైరెక్ట్ గా పిలిచేయొచ్చు (`Math.sqrt()` లాగా). అదే నాన్-స్టాటిక్ (ఇన్స్టాన్స్) అయితే కచ్చితంగా ముందు ఆబ్జెక్ట్ క్రియేట్ చేసి దానితోనే పిలవాలి (`new Student().getName()`)."
      },
      {
        "q": "ఒక మెథడ్ రన్ అవ్వడం అయిపోయాక అందులో ఉన్న వేరియబుల్స్ ఏమవుతాయి?",
        "a": "మెథడ్ లోపల రాసిన వేరియబుల్స్ ని లోకల్ వేరియబుల్స్ అంటారు. ఆ మెథడ్ రన్ అవ్వడం అయిపోగానే దాని Stack Frame డిలీట్ అయిపోతుంది కాబట్టి, ఆ వేరియబుల్స్ కూడా మెమరీలోంచి ఎగిరిపోతాయి."
      }
    ],
    "recap": [
      "ఒకే కోడ్ ని మళ్ళీ మళ్ళీ రాయకుండా DRY (Don't Repeat Yourself) ప్రిన్సిపల్ పాటించడానికి మెథడ్స్ వాడతాం.",
      "ప్రతి మెథడ్ కాల్ అయినప్పుడు JVM Call Stack లో ఒక కొత్త Stack Frame క్రియేట్ అయ్యి, అందులో ఆ వేరియబుల్స్ సేవ్ అవుతాయి.",
      "మెథడ్ ని రాసేటప్పుడు తీసుకునేవి Parameters, పిలిచేటప్పుడు పాస్ చేసేవి Arguments.",
      "ఎన్ని వాల్యూస్ పంపిస్తామో ముందే తెలియనప్పుడు Varargs (`Type... name`) వాడతాం.",
      "`return` అంటే వాల్యూ ఇవ్వడమే కాదు, కండిషన్స్ ఫెయిల్ అయినప్పుడు కోడ్ ని అక్కడితో ఆపేసి బయటికి రావడానికి (Early Exit) కూడా వాడతారు."
    ]
  },
  {
    "num": 34,
    "phaseId": "phase8",
    "phaseTitle": "Phase 8: Methods & Recursion",
    "slug": "34-java-pass-by-value-and-variable-scope",
    "title": "Java Pass-by-Value Mechanics & Variable Scope Deep Dive (తెలుగులో)",
    "badge": "34. Pass-by-Value & Scope",
    "subtopics": "The Ultimate Truth: Java is Strictly Pass-by-Value · Primitive Pass-by-Value · Object Reference Pass-by-Value · Mutating vs Reassigning Objects · Block vs Method Scope · Variable Shadowing · Memory Stack & Heap Diagrams",
    "readTime": "24 min read",
    "intro": "మెథడ్ కి ఒక వేరియబుల్ పంపించి లోపల దాన్ని మార్చితే, బయట ఉన్న అసలు వేరియబుల్ మారుతుందా లేదా? చాలామంది కన్ఫ్యూజ్ అయ్యే `Pass-by-Value` vs `Pass-by-Reference` కాన్సెప్ట్ ని ఈ చాప్టర్ లో మెమరీ బొమ్మలతో సహా క్లియర్ గా అర్థం చేసుకుందాం. దాంతో పాటే ఏ వేరియబుల్ ఎక్కడివరకే పనిచేస్తుంది (Variable Scope) అనేది కూడా తెలుసుకుందాం.",
    "theorySections": [
      {
        "heading": "1. గోల్డెన్ రూల్: జావా ఎప్పటికీ Pass-by-Value మాత్రమే!",
        "content": "జావా నేర్చుకునే వాళ్ళకి ఒక పెద్ద డౌట్ ఉంటుంది. జావాలో Pass-by-Reference ఉంటుందా అని!\n\n**ద అబ్సొల్యూట్ రూల్:**\n**జావా 100% ఎప్పుడూ పాస్-బై-వాల్యూ (Pass-by-Value) మాత్రమే!** జావాలో పాస్-బై-రిఫరెన్స్ అనే కాన్సెప్ట్ అసలు లేదు.\n\nమీరు ఒక మెథడ్ కి వాల్యూ ని పంపినప్పుడు ఏమవుతుందంటే:\n- **Primitives పంపితే (`int`, `double` లాంటివి):** మీరు పంపించిన నంబర్ కి జావా ఒక **జిరాక్స్ కాపీ** తీసి ఆ మెథడ్ కి పంపుతుంది. ఆ మెథడ్ లోపల దాన్ని ఎంత మార్చినా బయట ఉన్న ఒరిజినల్ వేరియబుల్ మారదు!\n- **Objects పంపితే (`int[]`, `String`, `Student` లాంటివి):** అరే పంపితే మొత్తం అరే కాపీ అవ్వదు! ఆ అరే ఎక్కడుందో చెప్పే అడ్రెస్ (Reference) కి **జిరాక్స్ కాపీ** తీసి ఇస్తుంది. దాన్ని పట్టుకుని వాళ్ళు మెమరీ (Heap) లోపల దాకా వెళ్లి మార్చితే.. అది అందరికీ మారుతుంది. కానీ ఆ కాపీ అడ్రెస్ ని చింపేసి కొత్త అడ్రెస్ పెట్టుకుంటే.. బయట వాళ్ళకి ఏం ప్రాబ్లం ఉండదు!"
      },
      {
        "heading": "2. Primitives కి Pass-by-Value ఎలా పనిచేస్తుంది?",
        "content": "```java\nstatic void modify(int x) {\n    x = 99; // ఇక్కడ కేవలం మనం పంపిన 'కాపీ' మాత్రమే మారుతుంది!\n}\n\npublic static void main(String[] args) {\n    int number = 10;\n    modify(number); // 10 అనే నంబర్ ని కాపీ చేసి పంపిస్తున్నాం\n    System.out.println(number); // ఇప్పుడు ఏమొస్తుంది? 10 ఏ వస్తుంది (99 రాదు!)\n}\n```\n\n```\n  STACK MEMORY (ఎలా జరుగుతుంది?):\n  +-------------------------+\n  | modify() Frame: [x=99]  | <--- కాపీ మాత్రమే 99 అయ్యింది. మెథడ్ అవ్వగానే ఇది డిలీట్ అయిపోతుంది!\n  +-------------------------+\n  | main() Frame: [num=10]  | <--- మన ఒరిజినల్ 10 అలానే సేఫ్ గా ఉంది\n  +-------------------------+\n```"
      },
      {
        "heading": "3. Objects కి పాస్-బై-వాల్యూ (లోపలికి వెళ్లి మార్చడం vs అడ్రెస్ మార్చడం)",
        "content": "ఇది చాలా ఇంపార్టెంట్ ఇంటర్వ్యూ క్వశ్చన్!\n\n```java\n// కేస్ A: అడ్రెస్ లోపలికి వెళ్లి మార్చడం (ఇది బయట వాళ్లకి కూడా ఎఫెక్ట్ అవుతుంది)\nstatic void changeFirstElement(int[] arr) {\n    arr[0] = 999; // కాపీ ఇచ్చిన అడ్రెస్ పట్టుకుని లోపలికెళ్లి మార్చేసింది!\n}\n\n// కేస్ B: అడ్రెస్ ని మార్చేయడం (ఇది బయట వాళ్లకి ఎఫెక్ట్ అవ్వదు)\nstatic void reassignArray(int[] arr) {\n    arr = new int[]{100, 200, 300}; // వీడి కాపీలో ఉన్న అడ్రెస్ తీసేసి కొత్త అరే అడ్రెస్ పెట్టుకున్నాడు\n}\n```\n\n```\n  STACK (main)            STACK (reassignArray)              HEAP MEMORY (అసలు డేటా)\n  +---------------+       +---------------+            +---------------------+\n  | data = 0x5000 |       | arr = 0x8800  | ---------> | [100, 200, 300]     |\n  +-------|-------+       +---------------+            +---------------------+\n          |\n          +------------------------------------------> +---------------------+\n                                                       | [1, 2, 3] (సేఫ్!)    |\n                                                       +---------------------+\n```"
      },
      {
        "heading": "4. వేరియబుల్ స్కోప్ (Variable Scope) ఎక్కడ వరకే పనిచేస్తుంది?",
        "content": "ఒక వేరియబుల్ కి ఎక్కడిదాకా లైఫ్ ఉంటుంది, దాన్ని ఎక్కడ వాడొచ్చు అని చెప్పేదే **Scope**:\n\n1. **Method Scope:** ఒక మెథడ్ లోపల రాస్తే.. ఆ మెథడ్ స్టార్ట్ అయినప్పటినుంచి, పూర్తయ్యే దాకా అది పనిచేస్తుంది.\n2. **Block Scope (`{ ... }`):** `if` లోపల గానీ, `for` లూప్ లోపల గానీ వేరియబుల్స్ రాస్తే (బ్రాకెట్స్ లోపల).. అవి ఆ బ్రాకెట్ ఓపెన్ అయినప్పటినుంచి క్లోజ్ అయ్యేదాకా మాత్రమే బ్రతికి ఉంటాయి.\n\n```java\nvoid example() {\n    int x = 10; // ఇది ఈ మెథడ్ మొత్తం పనిచేస్తుంది\n    if (x > 5) {\n        int y = 20; // ఇది కేవలం ఈ 'if' బ్లాక్ లోపల వరకే పనిచేస్తుంది\n        System.out.println(x + y); // రెండు కలిపి యాక్సెస్ చేయొచ్చు\n    }\n    // System.out.println(y); // ఎర్రర్! ఎందుకంటే y కి లైఫ్ అయిపొయింది కాబట్టి ఇక్కడికి రాదు\n}\n```"
      },
      {
        "heading": "5. Variable Shadowing (వేరియబుల్ షాడోయింగ్)",
        "content": "ఒక క్లాస్ లోపల ఒక వేరియబుల్ ఉండి, మళ్ళీ మెథడ్ లోపల అదే పేరుతో ఇంకో వేరియబుల్ క్రియేట్ చేస్తే ఏమవుతుంది? లోకల్ వేరియబుల్ వచ్చి క్లాస్ వేరియబుల్ ని కప్పేస్తుంది (Shadow చేస్తుంది).\n\n```java\npublic class ShadowDemo {\n    static int count = 100; // క్లాస్ లోపల రాసిన వేరియబుల్\n\n    static void print() {\n        int count = 5; // మళ్ళీ అదే పేరుతో లోకల్ గా రాసాము\n        System.out.println(count); // ఇక్కడ ఏమొస్తుంది? 5 ఏ వస్తుంది! (లోకల్ కే పవర్ ఎక్కువ)\n        System.out.println(ShadowDemo.count); // 100 కావాలంటే ఇలా క్లాస్ పేరుతో పిలవాలి\n    }\n}\n```"
      }
    ],
    "codeExample": "import java.util.Arrays;\n\npublic class Main {\n    // 1. Primitive Pass-by-Value టెస్ట్ (జిరాక్స్ కాపీ)\n    static void tryToModifyPrimitive(int value) {\n        value = 999; // మనం కేవలం కాపీ ని మారుస్తున్నాం, ఒరిజినల్ ని కాదు\n        System.out.println(\"  మెథడ్ లోపల (primitive) : \" + value);\n    }\n\n    // 2. Object Mutation టెస్ట్ (అడ్రెస్ పట్టుకుని వెళ్లి మార్చడం)\n    static void modifyArrayContent(int[] arr) {\n        arr[0] = 777; // Heap లోపల ఉన్న డేటానే మార్చేస్తున్నాం\n        System.out.println(\"  మెథడ్ లోపల (mutated)   : \" + Arrays.toString(arr));\n    }\n\n    // 3. Object Reassignment టెస్ట్ (కాపీ చేసిన అడ్రెస్ నే మార్చేయడం)\n    static void tryToReassignReference(int[] arr) {\n        arr = new int[]{99, 99, 99}; // వీడు ఆ అడ్రెస్ వదిలేసి కొత్త అరే క్రియేట్ చేసుకున్నాడు\n        System.out.println(\"  మెథడ్ లోపల (reassigned): \" + Arrays.toString(arr));\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. Primitive పాస్-బై-వాల్యూ ===\");\n        int score = 50;\n        System.out.println(\"మెథడ్ పిలవకముందు          : \" + score);\n        tryToModifyPrimitive(score);\n        System.out.println(\"మెథడ్ పిలిచిన తర్వాత        : \" + score + \" (మారలేదు!)\");\n\n        System.out.println(\"\n=== 2. అరే లోపలికి వెళ్లి మార్చడం (Mutation) ===\");\n        int[] scores = {10, 20, 30};\n        System.out.println(\"మెథడ్ పిలవకముందు          : \" + Arrays.toString(scores));\n        modifyArrayContent(scores);\n        System.out.println(\"మెథడ్ పిలిచిన తర్వాత        : \" + Arrays.toString(scores) + \" (మొదటి నంబర్ మారిపోయింది!)\");\n\n        System.out.println(\"\n=== 3. అడ్రెస్ మార్చేయడం (Reassignment) ===\");\n        int[] originalArray = {1, 2, 3};\n        System.out.println(\"మెథడ్ పిలవకముందు          : \" + Arrays.toString(originalArray));\n        tryToReassignReference(originalArray);\n        System.out.println(\"మెథడ్ పిలిచిన తర్వాత        : \" + Arrays.toString(originalArray) + \" (ఇది సేఫ్, మారలేదు!)\");\n\n        System.out.println(\"\n=== 4. Block Scope డెమో ===\");\n        int outerX = 100;\n        {\n            int innerY = 500; // బ్రాకెట్స్ ఓపెన్ చేసి దీన్ని లోపల పెట్టాం\n            System.out.println(\"బ్లాక్ లోపల: outerX + innerY = \" + (outerX + innerY));\n        }\n        // ఇక్కడకి వచ్చేసరికి బ్రాకెట్ క్లోజ్ అయిపోయింది కాబట్టి innerY డిలీట్ అయిపొయింది\n        System.out.println(\"బ్లాక్ బయట: outerX = \" + outerX);\n    }\n}",
    "output": "=== 1. Primitive పాస్-బై-వాల్యూ ===\nమెథడ్ పిలవకముందు          : 50\n  మెథడ్ లోపల (primitive) : 999\nమెథడ్ పిలిచిన తర్వాత        : 50 (మారలేదు!)\n\n=== 2. అరే లోపలికి వెళ్లి మార్చడం (Mutation) ===\nమెథడ్ పిలవకముందు          : [10, 20, 30]\n  మెథడ్ లోపల (mutated)   : [777, 20, 30]\nమెథడ్ పిలిచిన తర్వాత        : [777, 20, 30] (మొదటి నంబర్ మారిపోయింది!)\n\n=== 3. అడ్రెస్ మార్చేయడం (Reassignment) ===\nమెథడ్ పిలవకముందు          : [1, 2, 3]\n  మెథడ్ లోపల (reassigned): [99, 99, 99]\nమెథడ్ పిలిచిన తర్వాత        : [1, 2, 3] (ఇది సేఫ్, మారలేదు!)\n\n=== 4. Block Scope డెమో ===\nబ్లాక్ లోపల: outerX + innerY = 600\nబ్లాక్ బయట: outerX = 100",
    "lineByLine": [
      {
        "line": "tryToModifyPrimitive(score);",
        "explanation": "ఇక్కడ 50 అనే వాల్యూ కాపీ అవుతుంది. మెథడ్ లోపల ఆ వాల్యూని 999 గా మార్చినా.. మన ఒరిజినల్ వేరియబుల్ score మాత్రం 50 గానే ఉంటుంది."
      },
      {
        "line": "arr[0] = 777;",
        "explanation": "ఇక్కడ అరే యొక్క అడ్రెస్ కాపీ అవుతుంది. కాబట్టి ఆ అడ్రెస్ పట్టుకుని లోపలికెళ్లి మార్చితే, బయట ఉన్న వాళ్లకి కూడా ఆ మార్పు కనిపిస్తుంది."
      },
      {
        "line": "arr = new int[]{99, 99, 99};",
        "explanation": "ఇక్కడ మెథడ్ వాడు తనకి వచ్చిన కాపీ అడ్రెస్ ని తీసేసి.. కొత్త అరే అడ్రెస్ పెట్టుకున్నాడు. దానివల్ల మన ఒరిజినల్ అరే కి ఎలాంటి నష్టం జరగదు."
      },
      {
        "line": "int innerY = 500;",
        "explanation": "దీన్ని బ్రాకెట్స్ (Block) లోపల రాసాం కాబట్టి.. ఆ బ్రాకెట్స్ వరకే దీని జీవితం. బయట దీన్ని ఎవరూ వాడుకోలేరు."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    // రియల్ టైమ్ సినారియో: యూజర్ ప్రొఫైల్ ని క్లీన్ చేసే సర్వీస్\n    static class UserProfile {\n        String username;\n        String email;\n        UserProfile(String u, String e) { this.username = u; this.email = e; }\n    }\n\n    public static void sanitizeProfile(UserProfile profile) {\n        if (profile == null) return;\n        // ఇక్కడ ఆబ్జెక్ట్ లోపల ఫీల్డ్స్ (Fields) ని మారుస్తున్నాం కాబట్టి అది బయట కూడా మారుతుంది\n        profile.username = profile.username.trim().toLowerCase();\n        profile.email = profile.email.trim().toLowerCase();\n    }\n\n    public static void main(String[] args) {\n        // ఎవరో యూజర్ స్పేస్ లు, క్యాపిటల్ లెటర్స్ ఇచ్చి రిజిస్టర్ అయ్యాడు అనుకుందాం\n        UserProfile user = new UserProfile(\"  Admin_User2026 \", \"  Support@Company.ORG \");\n        System.out.println(\"=== క్లీన్ చేయకముందు ===\");\n        System.out.println(\"యూజర్ నేమ్: [\" + user.username + \"], ఈమెయిల్: [\" + user.email + \"]\");\n\n        sanitizeProfile(user);\n\n        System.out.println(\"\n=== క్లీన్ చేసిన తర్వాత ===\");\n        System.out.println(\"యూజర్ నేమ్: [\" + user.username + \"], ఈమెయిల్: [\" + user.email + \"]\");\n    }\n}",
    "practicalOutput": "=== క్లీన్ చేయకముందు ===\nయూజర్ నేమ్: [  Admin_User2026 ], ఈమెయిల్: [  Support@Company.ORG ]\n\n=== క్లీన్ చేసిన తర్వాత ===\nయూజర్ నేమ్: [admin_user2026], ఈమెయిల్: [support@company.org]",
    "commonMistakes": [
      "జావాలో ఒక అరే ని పాస్ చేసి మార్చగానే మారిపోయింది కదా, అంటే ఇది పాస్-బై-రిఫరెన్స్ అని భ్రమ పడటం. అది రిఫరెన్స్ కాదు, రిఫరెన్స్ కి తీసిన కాపీ వాల్యూ (Pass-by-Value of Reference) అంతే!",
      "`swap(a, b)` అనే మెథడ్ రాసి రెండు నంబర్స్ ని ఎక్స్చేంజ్ చేయొచ్చు అని ట్రై చేయడం. సి, సి++ లో కుదురుతుంది కానీ జావాలో ప్రైమిటివ్స్ ని అలా మార్చలేము.",
      "`for (int i=0;...)` లూప్ వాడాక, ఆ `i` ని లూప్ బయట కూడా ప్రింట్ చేద్దాం అని ట్రై చేసి ఎర్రర్స్ తెచ్చుకోవడం. `i` లైఫ్ లూప్ బ్రాకెట్ తోనే అయిపోతుంది.",
      "మెథడ్ లోపల పారామీటర్ కే కొత్త ఆబ్జెక్ట్ ఇస్తే (`arr = new int[]`), బయట ఉన్న వాళ్లకి కూడా ఆ కొత్త ఆబ్జెక్ట్ వస్తుందేమో అని ఆశపడటం."
    ],
    "challenge": "// Coding Challenge:\n// ఒక అరే ని తీసుకుని అందులో మొదటి నంబర్ ని, చివరి నంబర్ ని స్వాప్ (Exchange) చేసే swapFirstAndLast(int[] arr) మెథడ్ రాయండి.\n// ఇది రాసాక, మెయిన్ మెథడ్ లో నిజంగానే అరే మారిందో లేదో ప్రింట్ చేసి చెక్ చేయండి.\n\npublic class Challenge {\n    public static void swapFirstAndLast(int[] arr) {\n        // అరే లో కనీసం 2 నంబర్స్ ఉంటేనే స్వాప్ చేస్తాం\n        if (arr == null || arr.length < 2) return;\n        int temp = arr[0];\n        arr[0] = arr[arr.length - 1]; // లాస్ట్ దాన్ని ఫస్ట్ లోకి\n        arr[arr.length - 1] = temp;   // ఫస్ట్ దాన్ని లాస్ట్ లోకి\n    }\n\n    public static void main(String[] args) {\n        int[] data = {100, 20, 30, 500};\n        System.out.println(\"స్వాప్ కి ముందు: \" + java.util.Arrays.toString(data));\n        swapFirstAndLast(data);\n        System.out.println(\"స్వాప్ కి తర్వాత: \" + java.util.Arrays.toString(data)); // రిజల్ట్ లో 500 ముందుకి, 100 వెనక్కి వెళ్తుంది\n    }\n}",
    "faq": [
      {
        "q": "జావాలో రెండు నంబర్స్ ని మార్చే swap(int a, int b) మెథడ్ ఎందుకు రాయలేం?",
        "a": "ఎందుకంటే జావా వాల్యూస్ ని జిరాక్స్ కాపీ తీసి ఇస్తుంది. మీరు మెథడ్ లోపల ఎంతసేపు ఆ కాపీలనే అటూ ఇటూ మార్చుకుంటారు తప్ప, అసలైన నంబర్స్ ఉన్న అడ్రెస్ (main లో ఉన్నవి) కి వెళ్ళలేరు."
      },
      {
        "q": "C++ లో Pass-by-Reference కి, జావాకి తేడా ఏంటి?",
        "a": "C++ లో `void func(int &x)` అని రాస్తే, మీరు డైరెక్ట్ గా ఒరిజినల్ వేరియబుల్ కి లింక్ అవుతారు (కాపీ ఉండదు). కాబట్టి అక్కడ మారుతుంది. జావాలో అడ్రెస్ ని కూడా కాపీ తీసి వాల్యూ గానే ఇస్తారు."
      },
      {
        "q": "String ని మెథడ్ కి పంపిస్తే ఏమవుతుంది?",
        "a": "స్ట్రింగ్స్ ని పంపిస్తే కూడా అడ్రెస్ కాపీ అయ్యే వెళ్తుంది. కానీ స్ట్రింగ్స్ Immutability (మారవు) రూల్ వల్ల.. మీరు `str.toUpperCase()` అని రాస్తే ఆ పాత స్ట్రింగ్ ఏం అవ్వదు, కొత్త స్ట్రింగ్ క్రియేట్ అవుతుంది కాబట్టి ఒరిజినల్ స్ట్రింగ్ ఎప్పుడూ సేఫ్ గానే ఉంటుంది."
      }
    ],
    "recap": [
      "జావా ఎప్పుడూ, ఎక్కడైనా, ఏ సిట్యువేషన్ లో అయినా సరే.. 100% Pass-by-Value మాత్రమే వాడుతుంది.",
      "మామూలు నంబర్స్ పంపితే వాటి వాల్యూ కాపీ అయ్యి వెళ్తుంది.",
      "ఆబ్జెక్ట్స్ పంపితే వాటి అడ్రెస్ (Reference) కాపీ అయ్యి వెళ్తుంది.",
      "కాపీ ఇచ్చిన అడ్రెస్ తో ఆబ్జెక్ట్ లోపలికెళ్లి ఏమైనా మారిస్తే.. బయట వాళ్లకి కూడా ఆ మార్పు కనిపిస్తుంది.",
      "ఒకవేళ పారామీటర్ కే కొత్త ఆబ్జెక్ట్ అడ్రెస్ ఇస్తే మాత్రం బయట వాళ్లకి ఏం కాదు, సేఫ్ గా ఉంటారు.",
      "బ్రాకెట్స్ `{}` మధ్యలో క్రియేట్ చేసిన వేరియబుల్స్ కి ఆ బ్రాకెట్స్ బయట లైఫ్ ఉండదు (Block Scope)."
    ]
  },
  {
    "num": 35,
    "phaseId": "phase8",
    "phaseTitle": "Phase 8: Methods & Recursion",
    "slug": "35-java-method-overloading-and-static-vs-instance",
    "title": "Java Method Overloading, Type Promotion & Static vs Instance (తెలుగులో)",
    "badge": "35. Overloading & Static Methods",
    "subtopics": "Method Overloading (Compile-Time Polymorphism) · 3 Valid Overloading Rules · Why Return Type Alone Cannot Overload · Automatic Type Promotion in Overloading · static Methods vs Instance Methods · Memory Allocation of static",
    "readTime": "24 min read",
    "intro": "ఒకే పేరుతో మల్టిపుల్ మెథడ్స్ రాయొచ్చా? జావాలో దీన్ని 'Method Overloading' అంటారు (దీన్నే Polymorphism అని కూడా అంటారు). అసలు ఒకే పేరు ఎందుకు పెట్టాలి? దీనికి ఉన్న 3 స్ట్రిక్ట్ రూల్స్ ఏంటి? అలాగే, `static` కి `instance` (నాన్-స్టాటిక్) మెథడ్స్ కి ఉన్న అసలైన డిఫరెన్స్ ఏంటో ఈ చాప్టర్ లో కంప్లీట్ గా తెలుసుకుందాం.",
    "theorySections": [
      {
        "heading": "1. Method Overloading అంటే ఏంటి? (కలగూరగంప పేర్లు వద్దు!)",
        "content": "**Method Overloading** అంటే ఒక క్లాస్ లో **ఒకే పేరుతో మల్టిపుల్ మెథడ్స్** ని క్రియేట్ చేయడం (కానీ తీసుకునే పారామీటర్స్ వేరుగా ఉండాలి).\n\n**ఎందుకు?**\nఉదాహరణకి మీరు నంబర్స్ ని యాడ్ చేయడానికి మెథడ్స్ రాస్తున్నారు. రెండిటిని కలపడానికి `addTwo()`, మూడింటిని కలపడానికి `addThree()`, పాయింట్ నంబర్స్ కి `addDoubles()` అని వేరు వేరు పేర్లు పెడితే.. వాడేవాడికి తలనొప్పి కదా! అందుకే అన్నింటికీ `add()` అని ఒకటే పేరు పెడితే, మనం పంపించే నంబర్స్ ని బట్టి జావా కంపైలర్ అదే ఆటోమాటిక్ గా ఏది రన్ చేయాలో డిసైడ్ చేసుకుంటుంది. దీన్నే **Compile-Time (Static) Polymorphism** అంటారు.\n\n```java\n// ఒకే పేరు, కానీ వేరు వేరు ఇన్పుట్స్:\nadd(int a, int b)           // రెండు నంబర్స్ ని కలుపుతుంది\nadd(double a, double b)     // పాయింట్ నంబర్స్ ని కలుపుతుంది\nadd(int a, int b, int c)    // మూడు నంబర్స్ ని కలుపుతుంది\n```"
      },
      {
        "heading": "2. Overloading చేయడానికి 3 రూల్స్",
        "content": "ఒకే పేరుతో మెథడ్స్ ఉండాలంటే, ఈ మూడింట్లో ఏదో ఒక తేడా కచ్చితంగా ఉండాలి:\n\n<div class=\"ref-table-wrap\">\n  <table class=\"ref-table\">\n    <thead>\n      <tr>\n        <th>రూల్</th>\n        <th>ఉదాహరణ 1</th>\n        <th>ఉదాహరణ 2</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><strong>1. పారామీటర్స్ సంఖ్య మారాలి</strong></td>\n        <td><code>add(int a, int b)</code></td>\n        <td><code>add(int a, int b, int c)</code></td>\n      </tr>\n      <tr>\n        <td><strong>2. పారామీటర్ డేటా టైప్ మారాలి</strong></td>\n        <td><code>print(int x)</code></td>\n        <td><code>print(String s)</code></td>\n      </tr>\n      <tr>\n        <td><strong>3. టైప్స్ ఆర్డర్ (సీక్వెన్స్) మారాలి</strong></td>\n        <td><code>log(String msg, int code)</code></td>\n        <td><code>log(int code, String msg)</code></td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n**చాలా ఇంపార్టెంట్ రూల్:** కేవలం Return Type మాత్రమే మార్చి, ఒకే పేరు, ఒకే పారామీటర్స్ ఇస్తే జావా ఒప్పుకోదు! (ఎర్రర్ వస్తుంది)\n```java\n// ఎర్రర్: రెండు మెథడ్స్ సేమ్ ఉన్నాయి అని అరుస్తుంది కంపైలర్\nint calculate(int a) { return a * 2; }\ndouble calculate(int a) { return a * 2.0; } // calculate(5) అని పిలిస్తే, జావాకి ఏది రన్ చేయాలో అర్థం కాదు!\n```"
      },
      {
        "heading": "3. Automatic Type Promotion (ఆటోమాటిక్ గా పెంచడం)",
        "content": "ఒకవేళ మీరు పంపించిన టైప్ కి ఎగ్జాక్ట్ మ్యాచ్ అయ్యే మెథడ్ లేకపోతే.. జావా దాన్ని ఆటోమాటిక్ గా కొంచెం పెద్ద డేటా టైప్ కి ప్రమోట్ చేసి (మార్చి) సరిపోయే మెథడ్ ఉందేమో వెతుకుతుంది:\n\n$$\\text{byte} \\rightarrow \\text{short} \\rightarrow \\text{int} \\rightarrow \\text{long} \\rightarrow \\text{float} \\rightarrow \\text{double}$$\n\n```java\nstatic void display(double d) { System.out.println(\"Double: \" + d); }\n\n// ఒకవేళ మనం int ని పంపిస్తే:\ndisplay(42); // 42 అనే int ఆటోమాటిక్ గా 42.0 double కి ప్రమోట్ అయ్యి పై మెథడ్ రన్ అవుతుంది!\n```"
      },
      {
        "heading": "4. static vs Instance Methods (అసలు తేడా ఏంటి?)",
        "content": "<div class=\"ref-table-wrap\">\n  <table class=\"ref-table\">\n    <thead>\n      <tr>\n        <th>ఫీచర్</th>\n        <th><code>static</code> Methods (క్లాస్-లెవెల్)</th>\n        <th>Instance Methods (ఆబ్జెక్ట్-లెవెల్)</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><strong>ఎవరికీ సంబంధించింది?</strong></td>\n        <td>డైరెక్ట్ గా <strong>క్లాస్</strong> కి సంబంధించింది. అందరికీ కామన్.</td>\n        <td>మనం క్రియేట్ చేసిన <strong>ఆబ్జెక్ట్స్</strong> కి సంబంధించింది.</td>\n      </tr>\n      <tr>\n        <td><strong>ఎలా పిలవాలి?</strong></td>\n        <td><code>ClassName.methodName()</code> (ఆబ్జెక్ట్ అక్కర్లేదు).</td>\n        <td><code>object.methodName()</code> (కచ్చితంగా ఆబ్జెక్ట్ ఉండాలి).</td>\n      </tr>\n      <tr>\n        <td><strong><code>this</code> వాడొచ్చా?</strong></td>\n        <td><strong>వాడకూడదు!</strong> (దీనికి ఆబ్జెక్ట్ తో సంబంధం లేదు).</td>\n        <td>వాడుకోవచ్చు. ఆబ్జెక్ట్ డేటాని యాక్సెస్ చేయడానికి ఇది వాడతాం.</td>\n      </tr>\n      <tr>\n        <td><strong>ఏ వేరియబుల్స్ యాక్సెస్ చేయొచ్చు?</strong></td>\n        <td>కేవలం <code>static</code> వేరియబుల్స్ ని మాత్రమే యాక్సెస్ చేయగలదు.</td>\n        <td>లోపల <code>static</code>, <code>instance</code> రెండింటినీ యాక్సెస్ చేయొచ్చు.</td>\n      </tr>\n      <tr>\n        <td><strong>ఎప్పుడు వాడాలి?</strong></td>\n        <td>యూటిలిటీ మెథడ్స్, మ్యాథ్స్ కాలిక్యులేషన్స్ కి (ఉదా: <code>Math.sqrt()</code>, <code>Arrays.sort()</code>).</td>\n        <td>ఆబ్జెక్ట్ కి సంబంధించిన పనులు చేయడానికి (ఉదా: <code>account.withdraw()</code>).</td>\n      </tr>\n    </tbody>\n  </table>\n</div>"
      }
    ],
    "codeExample": "public class Main {\n    // -------------------------------------------------------------\n    // OVERLOADED METHODS (ఒకే పేరుతో వేరు వేరు పారామీటర్స్)\n    // -------------------------------------------------------------\n    // వెర్షన్ 1: 2 ints ఇస్తే ఇది రన్ అవుతుంది\n    static int multiply(int a, int b) {\n        System.out.print(\"  [multiply(int, int) రన్ అయ్యింది]       : \");\n        return a * b;\n    }\n\n    // వెర్షన్ 2: 3 ints ఇస్తే ఇది రన్ అవుతుంది (కౌంట్ మారింది)\n    static int multiply(int a, int b, int c) {\n        System.out.print(\"  [multiply(int, int, int) రన్ అయ్యింది]  : \");\n        return a * b * c;\n    }\n\n    // వెర్షన్ 3: 2 పాయింట్ నంబర్స్ ఇస్తే ఇది (డేటా టైప్ మారింది)\n    static double multiply(double a, double b) {\n        System.out.print(\"  [multiply(double, double) రన్ అయ్యింది] : \");\n        return a * b;\n    }\n\n    // -------------------------------------------------------------\n    // STATIC vs INSTANCE డెమో\n    // -------------------------------------------------------------\n    static class BankAccount {\n        static String bankName = \"HDFC Bank\"; // ఇది క్లాస్ లెవెల్ (అందరికీ కామన్)\n        double balance;                       // ఇది ఇన్స్టాన్స్ (ఒక్కో కస్టమర్ కి వేరుగా ఉంటుంది)\n\n        BankAccount(double b) { this.balance = b; }\n\n        // స్టాటిక్ మెథడ్ (దీనికి కస్టమర్ తో పని లేదు, డైరెక్ట్ గా బ్యాంక్ గురించి చెప్తుంది)\n        static void printBankInfo() {\n            System.out.println(\"  బ్యాంక్ పేరు: \" + bankName);\n            // System.out.println(balance); // ఎర్రర్ వస్తుంది! కస్టమర్ ఎవరో తెలియకుండా బ్యాలెన్స్ ఎలా చెప్తుంది?\n        }\n\n        // ఇన్స్టాన్స్ మెథడ్ (కచ్చితంగా ఆబ్జెక్ట్ ఉంటేనే పనిచేస్తుంది)\n        void deposit(double amount) {\n            this.balance += amount;\n            System.out.printf(\"  $%.2f యాడ్ చేసారు. కొత్త బ్యాలెన్స్: $%.2f%n\", amount, this.balance);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. Method Overloading డెమో ===\");\n        System.out.println(multiply(4, 5));\n        System.out.println(multiply(2, 3, 4));\n        System.out.println(multiply(2.5, 4.0));\n\n        System.out.println(\"\n=== 2. Type Promotion (ఆటోమాటిక్ ప్రమోషన్) ===\");\n        // ఒకటి float (3.5f), ఇంకోటి int (2) పంపిస్తున్నాం. \n        // రెండూ డబుల్ కి ప్రమోట్ అయ్యి థర్డ్ మెథడ్ రన్ అవుతుంది.\n        System.out.println(multiply(3.5f, 2));\n\n        System.out.println(\"\n=== 3. Static Method Call (ఆబ్జెక్ట్ అక్కర్లేదు) ===\");\n        BankAccount.printBankInfo(); // డైరెక్ట్ గా క్లాస్ పేరుతో పిలిచేశాం\n\n        System.out.println(\"\n=== 4. Instance Method Call (ఆబ్జెక్ట్ కావాలి) ===\");\n        BankAccount account = new BankAccount(1000.0); // ఆబ్జెక్ట్ క్రియేట్ చేసాం\n        account.deposit(250.0); // ఆబ్జెక్ట్ తో మెథడ్ ని పిలిచాం\n    }\n}",
    "output": "=== 1. Method Overloading డెమో ===\n  [multiply(int, int) రన్ అయ్యింది]       : 20\n  [multiply(int, int, int) రన్ అయ్యింది]  : 24\n  [multiply(double, double) రన్ అయ్యింది] : 10.0\n\n=== 2. Type Promotion (ఆటోమాటిక్ ప్రమోషన్) ===\n  [multiply(double, double) రన్ అయ్యింది] : 7.0\n\n=== 3. Static Method Call (ఆబ్జెక్ట్ అక్కర్లేదు) ===\n  బ్యాంక్ పేరు: HDFC Bank\n\n=== 4. Instance Method Call (ఆబ్జెక్ట్ కావాలి) ===\n  $250.00 యాడ్ చేసారు. కొత్త బ్యాలెన్స్: $1250.00",
    "lineByLine": [
      {
        "line": "static int multiply(int a, int b, int c)",
        "explanation": "ఒకే పేరుతో ఇంకో మెథడ్ రాసాము. కానీ ఇక్కడ మూడు నంబర్స్ తీసుకుంటుంది కాబట్టి జావా ఒప్పుకుంది (Overloading)."
      },
      {
        "line": "multiply(3.5f, 2);",
        "explanation": "ఫస్ట్ ది float, సెకండ్ ది int. ఈ రెండు టైప్స్ తో మెథడ్ లేదు కాబట్టి జావా వాటన్నిటినీ పెద్దదైన double కి మార్చి అప్పుడు వెతికింది."
      },
      {
        "line": "BankAccount.printBankInfo();",
        "explanation": "ఇది స్టాటిక్ మెథడ్. కాబట్టి మనం ఏ కస్టమర్ ఆబ్జెక్ట్ ని క్రియేట్ చేయకుండానే డైరెక్ట్ గా క్లాస్ పేరుతో పిలిచేసాం."
      },
      {
        "line": "account.deposit(250.0);",
        "explanation": "ఇది ఇన్స్టాన్స్ మెథడ్. దీనికి ఒక ఆబ్జెక్ట్ కచ్చితంగా కావాలి. అందుకే 'account' అనే ఆబ్జెక్ట్ పట్టుకుని పిలిచాం."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    // రియల్ టైమ్ సినారియో: పేమెంట్ గేట్వే (కార్డ్, UPI, వాలెట్ - ఒకే పేరుతో 3 ఫీచర్స్)\n    public static class PaymentGateway {\n        // 1. కార్డ్ తో పేమెంట్\n        public static String processPayment(String cardNumber, String cvv, double amount) {\n            return String.format(\"[కార్డ్] కార్డ్ నంబర్ లాస్ట్ 4 డిజిట్స్ %s కి $%.2f ఛార్జ్ చేసాం\",\n                    cardNumber.substring(cardNumber.length() - 4), amount);\n        }\n\n        // 2. UPI తో పేమెంట్ (Overloaded)\n        public static String processPayment(String upiId, double amount) {\n            return String.format(\"[UPI] %s కు $%.2f రిక్వెస్ట్ పంపాం\", upiId, amount);\n        }\n\n        // 3. వాలెట్ & కూపన్ తో పేమెంట్ (Overloaded)\n        public static String processPayment(String walletId, double amount, String promoCode) {\n            double finalAmount = promoCode.equals(\"SAVE10\") ? amount * 0.90 : amount;\n            return String.format(\"[వాలెట్] %s అకౌంట్ కి (కూపన్: %s) $%.2f కట్ అయ్యింది\",\n                    walletId, promoCode, finalAmount);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== పేమెంట్ గేట్వే ఓవర్ లోడింగ్ ===\");\n        System.out.println(PaymentGateway.processPayment(\"4111222233334567\", \"123\", 149.99));\n        System.out.println(PaymentGateway.processPayment(\"developer@upi\", 49.00));\n        System.out.println(PaymentGateway.processPayment(\"PAYTM_WALLET_88\", 100.0, \"SAVE10\"));\n    }\n}",
    "practicalOutput": "=== పేమెంట్ గేట్వే ఓవర్ లోడింగ్ ===\n[కార్డ్] కార్డ్ నంబర్ లాస్ట్ 4 డిజిట్స్ 4567 కి $149.99 ఛార్జ్ చేసాం\n[UPI] developer@upi కు $49.00 రిక్వెస్ట్ పంపాం\n[వాలెట్] PAYTM_WALLET_88 అకౌంట్ కి (కూపన్: SAVE10) $90.00 కట్ అయ్యింది",
    "commonMistakes": [
      "కేవలం రిటర్న్ టైప్ ని మార్చి (ఉదా: ఒక దానికి `int`, ఇంకో దానికి `double` ఇచ్చి) ఓవర్ లోడ్ చేద్దాం అనుకోవడం. కంపైలర్ కి ఎర్రర్ వస్తుంది.",
      "స్టాటిక్ మెథడ్ లోపల ఆబ్జెక్ట్ వేరియబుల్స్ (non-static fields) ని డైరెక్ట్ గా వాడుకోవడానికి ట్రై చేయడం.",
      "ఏ మెథడ్ ని పిలుస్తున్నామో తెలియకుండా కన్ఫ్యూజ్ అయ్యేలా ఓవర్ లోడ్ చేయడం (ఉదా: `test(int, long)` మరియు `test(long, int)` రాసి `test(5, 5)` అని పిలవడం)."
    ],
    "challenge": "// Coding Challenge:\n// ఒకే పేరుతో (area) 3 రకాల మెథడ్స్ ని రాయండి (Overloading):\n// 1. area(double radius) -> సర్కిల్ ఏరియా ఇవ్వాలి: Math.PI * r * r\n// 2. area(double length, double width) -> రెక్టాంగిల్ ఏరియా: l * w\n// 3. area(double base, double height, boolean isTriangle) -> ట్రయాంగిల్ ఏరియా: 0.5 * b * h\n\npublic class Challenge {\n    public static double area(double radius) {\n        return Math.PI * radius * radius;\n    }\n\n    public static double area(double length, double width) {\n        return length * width;\n    }\n\n    // జస్ట్ టైప్స్ మార్చడానికి boolean పెట్టాం, లేకపోతే పైదానికి దీనికి కన్ఫ్యూజ్ అవుతుంది\n    public static double area(double base, double height, boolean isTriangle) {\n        return 0.5 * base * height;\n    }\n\n    public static void main(String[] args) {\n        System.out.printf(\"సర్కిల్ ఏరియా (r=5)     : %.2f%n\", area(5.0));\n        System.out.printf(\"రెక్టాంగిల్ ఏరియా (4x6)  : %.2f%n\", area(4.0, 6.0));\n        System.out.printf(\"ట్రయాంగిల్ ఏరియా (b=4,h=5): %.2f%n\", area(4.0, 5.0, true));\n    }\n}",
    "faq": [
      {
        "q": "రిటర్న్ టైప్ ఒక్కటే మార్చి మెథడ్ ని ఎందుకు ఓవర్ లోడ్ చేయలేం?",
        "a": "ఎందుకంటే మీరు మెథడ్ ని పిలిచేటప్పుడు రిటర్న్ వాల్యూ ని వాడకపోవచ్చు కదా! (ఉదా: `calculate(5);`). అప్పుడు కంపైలర్ కి అర్థం కాదు, ఏ రిటర్న్ టైప్ ఉన్న మెథడ్ ని రన్ చేయాలి అని. అందుకే అలా ఒప్పుకోదు."
      },
      {
        "q": "main() మెథడ్ ని కూడా ఓవర్ లోడ్ చేయొచ్చా?",
        "a": "హ్యాపీగా చేయొచ్చు! మీరు `main(int[] args)` అని కూడా రాసుకోవచ్చు. కాకపోతే మీ ప్రోగ్రామ్ రన్ చేసేటప్పుడు జావా మాత్రం కేవలం స్టాండర్డ్ `main(String[] args)` ని మాత్రమే వెతికి ఎగ్జిక్యూట్ చేస్తుంది."
      },
      {
        "q": "స్టాటిక్ మెథడ్స్, ఇన్స్టాన్స్ మెథడ్స్ ని పిలవగలవా?",
        "a": "డైరెక్ట్ గా పిలవలేవు. ఎందుకంటే స్టాటిక్ మెథడ్స్ గాలిలో (క్లాస్ కి) ఉంటాయి, వాటికి `this` ఆబ్జెక్ట్ అంటే తెలీదు. ఒకవేళ పిలవాలి అనుకుంటే, ముందు ఆ మెథడ్ లోపల ఒక ఆబ్జెక్ట్ ని క్రియేట్ చేసి (`new MyClass().method()`) ఆ తర్వాత పిలవాలి."
      }
    ],
    "recap": [
      "Method Overloading అంటే ఒకే పేరు, వేరు వేరు పారామీటర్స్ తో మల్టిపుల్ మెథడ్స్ రాయడం.",
      "ఇది ఏ మెథడ్ రన్ అవ్వాలో కంపైలర్ ముందే డిసైడ్ చేస్తుంది కాబట్టి దీన్ని Static Polymorphism అంటారు.",
      "పారామీటర్స్ కౌంట్ గానీ, డేటా టైప్ గానీ, వాటి ఆర్డర్ గానీ మారితేనే Overloading అవుతుంది.",
      "`static` మెథడ్స్ క్లాస్ కి సంబంధించినవి (డైరెక్ట్ గా పిలవొచ్చు). ఇన్స్టాన్స్ మెథడ్స్ ఆబ్జెక్ట్ కి సంబంధించినవి.",
      "`static` మెథడ్స్ లోపల `this` అనే కీవర్డ్ వాడకూడదు."
    ]
  },
  {
    "num": 36,
    "phaseId": "phase8",
    "phaseTitle": "Phase 8: Methods & Recursion",
    "slug": "36-java-recursion-and-stack-overflow",
    "title": "Java Recursion & Call Stack Lifecycle Masterclass (తెలుగులో)",
    "badge": "36. Recursion & StackOverflow",
    "subtopics": "What is Recursion? · 2 Pillars: Base Case & Recursive Step · Call Stack Winding & Unwinding · StackOverflowError Prevention · Factorial (N!) · Fibonacci Series · Sum of Digits · Recursion vs Iteration Trade-offs",
    "readTime": "26 min read",
    "intro": "ఒక మెథడ్ తనని తాను మళ్ళీ మళ్ళీ పిలుచుకుంటే ఏమవుతుంది? అదే **Recursion (రికర్శన్)**. ఇది చాలా పవర్ఫుల్ కాన్సెప్ట్, కానీ కరెక్ట్ గా వాడుకోకపోతే సిస్టమ్ క్రాష్ అవుతుంది (StackOverflowError వస్తుంది). రికర్శన్ అసలు ఎలా పనిచేస్తుంది? మెమరీలో స్టాక్ ఫ్రేమ్స్ ఎలా పుష్, పాప్ అవుతాయి? లూప్స్ కి, రికర్శన్ కి ఉన్న అసలైన డిఫరెన్స్ ఏంటో ఈ చాప్టర్ లో డీకోడ్ చేద్దాం.",
    "theorySections": [
      {
        "heading": "1. రికర్శన్ (Recursion) అంటే ఏంటి?",
        "content": "**Recursion** అంటే ఒక మెథడ్ **తనని తాను మళ్ళీ పిలుచుకోవడం (Calls itself)**. ఒక పెద్ద ప్రాబ్లమ్ ని చిన్న చిన్న భాగాలుగా విడగొట్టి సాల్వ్ చేయడానికి ఇది వాడతాం.\n\nరికర్శన్ పనిచేయాలంటే కచ్చితంగా **రెండు పిల్లర్స్** ఉండాలి:\n1. **Base Case (ఆపే కండిషన్):** మెథడ్ తనని తాను పిలుచుకోవడం ఎక్కడ ఆపేయాలో చెప్పే కండిషన్. ఇది లేకపోతే ఇన్ఫినిటీ లూప్ లో పడిపోతుంది.\n2. **Recursive Step (ముందుకు వెళ్లడం):** ప్రతిసారి తనని తాను పిలుచుకునేటప్పుడు.. బేస్ కేస్ కి దగ్గరగా వెళ్లేలా పారామీటర్స్ మార్చుకుంటూ వెళ్ళాలి."
      },
      {
        "heading": "2. Call Stack ఎలా అల్లుకుంటుంది, ఎలా విడిపోతుంది (Winding & Unwinding)",
        "content": "ఉదాహరణకి $4!$ (ఫ్యాక్టోరియల్) అంటే $4 \\times 3 \\times 2 \\times 1 = 24$. ఇది రికర్శన్ లో ఎలా జరుగుతుందో చూద్దాం:\n\n```java\nstatic int factorial(int n) {\n    if (n <= 1) return 1;          // Base Case (1 రాగానే ఆగిపోయి 1 ఇస్తుంది)\n    return n * factorial(n - 1);    // Recursive Step (తనని తానే చిన్న నంబర్ తో పిలుచుకుంటుంది)\n}\n```\n\n```\n  ఫేజ్ 1: WINDING (ఫ్రేమ్స్ పైకి వెళ్తూ ఉంటాయి)       ఫేజ్ 2: UNWINDING (ఆన్సర్ తీసుకుని కిందకి వస్తాయి)\n  \n  [ factorial(1) ] -> 1 ఇస్తుంది కదా         [ factorial(1) ] -> రిటర్న్ 1 (బేస్ కేస్ హిట్)\n  [ factorial(2) ] -> 2 * factorial(1)    [ factorial(2) ] -> 2 * 1 = 2 అవుతుంది\n  [ factorial(3) ] -> 3 * factorial(2)    [ factorial(3) ] -> 3 * 2 = 6 అవుతుంది\n  [ factorial(4) ] -> 4 * factorial(3)    [ factorial(4) ] -> 4 * 6 = 24 (ఫైనల్ ఆన్సర్!)\n  [ main()       ]                        [ main()       ]\n```"
      },
      {
        "heading": "3. StackOverflowError ఎందుకు వస్తుంది? దాన్ని ఎలా ఆపాలి?",
        "content": "రికర్శన్ వాడేటప్పుడు ఒక మెథడ్ ఇంకో మెథడ్ ని పిలిచిన ప్రతిసారీ JVM Call Stack లో ఒక కొత్త **Stack Frame** క్రియేట్ అవుతుంది (మెమరీ ఆక్యుపై చేస్తుంది).\n\n**మరి `StackOverflowError` ఎప్పుడు వస్తుంది?**\n1. **Base Case లేకపోతే:** అది తనని తాను ఇన్ఫినిటీ సార్లు పిలుచుకుంటూనే ఉంటుంది. దాంతో స్టాక్ మెమరీ ఫుల్ అయిపోయి జావా క్రాష్ అవుతుంది.\n2. **బేస్ కేస్ కి వెళ్లకపోతే:** `factorial(n - 1)` అని పిలవకుండా పొరపాటున మళ్ళీ `factorial(n)` నే పిలిస్తే.. అక్కడే ఇరుక్కుపోతుంది.\n3. **చాలా డీప్ గా వెళ్తే:** బేస్ కేస్ ఉన్నా సరే, లక్ష సార్లు పిలవాల్సి వస్తే.. స్టాక్ లో అంత మెమరీ ఉండదు కాబట్టి ఫుల్ అయిపోతుంది.\n\n```java\n// BUG: ఇన్ఫినిటీ రికర్శన్.. క్రాష్ అవుతుంది!\nstatic void infinite() {\n    infinite(); // java.lang.StackOverflowError వస్తుంది\n}\n```"
      },
      {
        "heading": "4. పాపులర్ రికర్సివ్ అల్గారిథమ్స్ (Classic Algorithms)",
        "content": "1. **Fibonacci (ఫిబోనాచీ సిరీస్ - $0, 1, 1, 2, 3, 5, 8, 13, \\dots$):**\n$$F(n) = F(n-1) + F(n-2) \\quad \\text{(బేస్: } F(0)=0, F(1)=1)$$\n\n2. **నంబర్ ని కలపడం (Sum of Digits):**\n$1234$ ని కలపాలంటే: $\\text{sum}(1234) = (1234 \\% 10) + \\text{sum}(1234 / 10) = 4 + 3 + 2 + 1 = 10$.\n\n3. **పవర్ క్యాలిక్యులేట్ చేయడం ($a^b$):**\n$$a^b = a \\times a^{b-1} \\quad \\text{(బేస్: } a^0 = 1)$$"
      },
      {
        "heading": "5. Recursion vs Iteration (లూప్స్ కి రికర్శన్ కి తేడా ఏంటి?)",
        "content": "<div class=\"ref-table-wrap\">\n  <table class=\"ref-table\">\n    <thead>\n      <tr>\n        <th>ఫీచర్</th>\n        <th>Recursion (రికర్శన్)</th>\n        <th>Iteration (లూప్స్)</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><strong>కోడ్ చూడటానికి</strong></td>\n        <td>చాలా క్లీన్ గా, మ్యాథ్స్ ఫార్ములా లాగా అర్థమవుతుంది.</td>\n        <td>కొన్నిసార్లు లూప్స్ లోపల లూప్స్ పడి కొంచెం కష్టంగా మారుతుంది.</td>\n      </tr>\n      <tr>\n        <td><strong>మెమరీ వాడకం</strong></td>\n        <td>ఎక్కువ (ప్రతి కాల్ కి ఒక కొత్త స్టాక్ ఫ్రేమ్ పడుతుంది).</td>\n        <td><strong>చాలా తక్కువ (ఒకే స్టాక్ ఫ్రేమ్ లో అయిపోతుంది).</strong></td>\n      </tr>\n      <tr>\n        <td><strong>స్పీడ్</strong></td>\n        <td>కొంచెం స్లో (స్టాక్ లో పుష్, పాప్ చేయాలి కాబట్టి).</td>\n        <td><strong>చాలా ఫాస్ట్</strong> (డైరెక్ట్ సీపీయూ ఎగ్జిక్యూషన్).</td>\n      </tr>\n      <tr>\n        <td><strong>రిస్క్</strong></td>\n        <td><code>StackOverflowError</code> వచ్చి ప్రోగ్రామ్ క్రాష్ అయ్యే ఛాన్స్ ఉంది.</td>\n        <td>ఇన్ఫినిటీ లూప్ పడితే సిస్టమ్ స్లో అవుతుంది కానీ మెమరీ ఎర్రర్ రాదు.</td>\n      </tr>\n    </tbody>\n  </table>\n</div>"
      }
    ],
    "codeExample": "public class Main {\n    // 1. రికర్శన్ తో ఫ్యాక్టోరియల్ (N!)\n    static long factorial(int n) {\n        if (n <= 1) return 1; // Base case: 1 కి చేరగానే 1 ఇస్తుంది\n        return n * factorial(n - 1); // Recursive step: తనని తానే మళ్ళీ పిలుచుకుంటుంది\n    }\n\n    // 2. రికర్శన్ తో ఫిబోనాచీ నంబర్\n    static int fibonacci(int n) {\n        if (n <= 0) return 0; // Base case 1\n        if (n == 1) return 1; // Base case 2\n        return fibonacci(n - 1) + fibonacci(n - 2); // రెండు సార్లు తనని తాను పిలుచుకుంటుంది\n    }\n\n    // 3. రికర్శన్ తో డిజిట్స్ ని కలపడం (Sum of Digits)\n    static int sumOfDigits(int n) {\n        if (n == 0) return 0; // Base case\n        return (n % 10) + sumOfDigits(n / 10); // లాస్ట్ నంబర్ తీసుకుని, మిగిలిన దాన్ని మళ్ళీ పంపుతుంది\n    }\n\n    // 4. రికర్శన్ తో పవర్ కనుక్కోవడం (base^exp)\n    static long power(int base, int exp) {\n        if (exp == 0) return 1; // Base case: దేని పవర్ 0 అయినా 1 ఏ కదా\n        return base * power(base, exp - 1); // Recursive step\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. ఫ్యాక్టోరియల్ (Factorial) ===\");\n        System.out.println(\"5! (5 ఫ్యాక్టోరియల్)              : \" + factorial(5));\n        System.out.println(\"10! (10 ఫ్యాక్టోరియల్)            : \" + factorial(10));\n\n        System.out.println(\"\n=== 2. ఫిబోనాచీ సిరీస్ (Fibonacci) ===\");\n        System.out.print(\"మొదటి 8 ఫిబోనాచీ నంబర్స్     : \");\n        for (int i = 0; i < 8; i++) {\n            System.out.print(fibonacci(i) + \" \");\n        }\n        System.out.println();\n\n        System.out.println(\"\n=== 3. నంబర్స్ ని కలపడం (Sum of Digits) ===\");\n        int sampleNumber = 9874;\n        System.out.println(\"9874 లో ఉన్న నంబర్స్ కలిపితే : \" + sumOfDigits(sampleNumber));\n\n        System.out.println(\"\n=== 4. పవర్ కనుక్కోవడం (Power) ===\");\n        System.out.println(\"2^8 (2 పవర్ 8)               : \" + power(2, 8));\n        System.out.println(\"5^3 (5 క్యూబ్)                : \" + power(5, 3));\n    }\n}",
    "output": "=== 1. ఫ్యాక్టోరియల్ (Factorial) ===\n5! (5 ఫ్యాక్టోరియల్)              : 120\n10! (10 ఫ్యాక్టోరియల్)            : 3628800\n\n=== 2. ఫిబోనాచీ సిరీస్ (Fibonacci) ===\nమొదటి 8 ఫిబోనాచీ నంబర్స్     : 0 1 1 2 3 5 8 13 \n\n=== 3. నంబర్స్ ని కలపడం (Sum of Digits) ===\n9874 లో ఉన్న నంబర్స్ కలిపితే : 28\n\n=== 4. పవర్ కనుక్కోవడం (Power) ===\n2^8 (2 పవర్ 8)               : 256\n5^3 (5 క్యూబ్)                : 125",
    "lineByLine": [
      {
        "line": "if (n <= 1) return 1;",
        "explanation": "ఇది బేస్ కేస్. రికర్శన్ ఇన్ఫినిటీ కి వెళ్లిపోకుండా ఇది అడ్డుకుంటుంది."
      },
      {
        "line": "return n * factorial(n - 1);",
        "explanation": "తనని తానే చిన్న నంబర్ (n-1) తో పిలుచుకుంటూ.. వచ్చిన ఆన్సర్ ని n తో మల్టిప్లై చేస్తుంది."
      },
      {
        "line": "fibonacci(n - 1) + fibonacci(n - 2);",
        "explanation": "ఇక్కడ ఒకేసారి రెండు బ్రాంచెస్ లాగా విడిపోయి, ఒకదానికొకటి పిలుచుకుంటూ పాత రెండు నంబర్స్ ని యాడ్ చేస్తుంది."
      },
      {
        "line": "(n % 10) + sumOfDigits(n / 10);",
        "explanation": "% 10 వాడి లాస్ట్ నంబర్ ని పీకేస్తుంది. మిగిలిన దాన్ని మళ్ళీ అదే ఫంక్షన్ కి పంపిస్తుంది."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    // రియల్ టైమ్ సినారియో: ఫోల్డర్ సైజు కనుక్కోవడం (కంప్యూటర్ లో)\n    static class Folder {\n        String name;\n        int directFileSizeKb;\n        Folder[] subFolders; // ఫోల్డర్ లోపల ఫోల్డర్స్ ఉంటాయి కదా\n\n        Folder(String name, int sizeKb, Folder... subs) {\n            this.name = name;\n            this.directFileSizeKb = sizeKb;\n            this.subFolders = subs != null ? subs : new Folder[0];\n        }\n    }\n\n    public static int calculateTotalFolderSize(Folder folder) {\n        if (folder == null) return 0; // బేస్ కేస్\n        int total = folder.directFileSizeKb;\n        for (Folder sub : folder.subFolders) {\n            total += calculateTotalFolderSize(sub); // ఫోల్డర్ లోపల ఉన్న ప్రతి ఫోల్డర్ కీ మళ్ళీ ఇదే మెథడ్ ని పిలుస్తున్నాం (Recursion)\n        }\n        return total;\n    }\n\n    public static void main(String[] args) {\n        // ఫోల్డర్స్ క్రియేట్ చేస్తున్నాం\n        Folder images = new Folder(\"images\", 450);\n        Folder docs = new Folder(\"docs\", 250);\n        Folder src = new Folder(\"src\", 800, images, docs); // src లోపల images, docs ఉన్నాయి\n        Folder projectRoot = new Folder(\"my-app\", 150, src);\n\n        System.out.println(\"=== డిస్క్ స్పేస్ అనలైజర్ ===\");\n        int totalSize = calculateTotalFolderSize(projectRoot);\n        System.out.println(\"ప్రాజెక్ట్ మొత్తం సైజు: \" + totalSize + \" KB (~\" + (totalSize / 1024.0) + \" MB)\");\n    }\n}",
    "practicalOutput": "=== డిస్క్ స్పేస్ అనలైజర్ ===\nప్రాజెక్ట్ మొత్తం సైజు: 1650 KB (~1.611328125 MB)",
    "commonMistakes": [
      "బేస్ కేస్ ని మర్చిపోయి డైరెక్ట్ గా కోడ్ రాయడం. దీనివల్ల కచ్చితంగా `java.lang.StackOverflowError` వస్తుంది.",
      "ఫిబోనాచీ లాంటి వాటికి రికర్శన్ వాడి పెద్ద నంబర్ (ఉదా: 50) ఇవ్వడం. అది కోట్లు సార్లు రన్ అవుతుంది, సిస్టమ్ హ్యాంగ్ అయిపోతుంది (దీనికి లూప్స్ బెటర్).",
      "రికర్శన్ లోపల స్టాటిక్ వేరియబుల్స్ ని ఇష్టం వచ్చినట్టు వాడటం. దానివల్ల పాత వాల్యూస్ ఉండిపోయి తప్పు ఆన్సర్స్ వస్తాయి.",
      "రికర్శన్ కి పంపించేటప్పుడు `n+1` లేదా `n-1` బదులు `n++` అని పంపడం. అది ఏమవుతుందంటే సేమ్ వాల్యూ నే ఇన్ఫినిటీ సార్లు పంపుతుంది."
    ],
    "challenge": "// Coding Challenge:\n// రికర్శన్ ని వాడి ఒక స్ట్రింగ్ ని రివర్స్ చేసే reverseString(String str) మెథడ్ ని రాయండి.\n// బేస్ కేస్: స్ట్రింగ్ ఎంపటీ అయినా లేదా 1 క్యారెక్టర్ ఉన్నా అదే తిరిగి ఇచ్చేయాలి.\n// రికర్సివ్ స్టెప్: return reverseString(str.substring(1)) + str.charAt(0);\n\npublic class Challenge {\n    public static String reverseString(String str) {\n        // బేస్ కేస్\n        if (str == null || str.length() <= 1) {\n            return str;\n        }\n        // ఫస్ట్ లెటర్ ని లాస్ట్ లో యాడ్ చేసి, మిగిలిన దాన్ని మళ్ళీ రికర్శన్ కి పంపుతున్నాం\n        return reverseString(str.substring(1)) + str.charAt(0);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"'JAVA' ని రివర్స్ చేస్తే: \" + reverseString(\"JAVA\")); // \"AVAJ\"\n        System.out.println(\"'RECURSION' ని రివర్స్ చేస్తే: \" + reverseString(\"RECURSION\"));\n    }\n}",
    "faq": [
      {
        "q": "జావాలో StackOverflowError ఎందుకు వస్తుంది?",
        "a": "ప్రతిసారి మెథడ్ కాల్ చేసినప్పుడు స్టాక్ లో ఒక ఫ్రేమ్ యాడ్ అవుతుంది కదా. ఆ స్టాక్ సైజు మహా అయితే 1MB ఉంటుంది. బేస్ కేస్ లేకపోతే అది లక్షల సార్లు మెథడ్ ని పిలిచేస్తుంది. అప్పుడు ఆ స్టాక్ మెమరీ సరిపోక క్రాష్ అవుతుంది."
      },
      {
        "q": "రికర్శన్ తో రాసే కోడ్ అంతా లూప్స్ తో కూడా రాయొచ్చా?",
        "a": "కచ్చితంగా రాయొచ్చు! ఎలక్ట్రానిక్స్, కంప్యూటర్ సైన్స్ రూల్స్ ప్రకారం.. రికర్శన్ తో చేయగలిగే ఏ పనినైనా సరే ఒక లూప్, ఒక స్టాక్ వాడి ఈజీగా రాయొచ్చు."
      },
      {
        "q": "Tail Call Optimization (TCO) అంటే ఏంటి? అది జావాలో ఉందా?",
        "a": "రికర్శన్ లో ఆఖరి స్టెప్ మళ్ళీ రికర్శన్ కాలింగ్ అయితే, కంపైలర్ కొత్త ఫ్రేమ్ క్రియేట్ చేయకుండా పాత ఫ్రేమ్ నే వాడుకుంటుంది, దాన్నే TCO అంటారు. కానీ దురదృష్టవశాత్తూ మన జావా (HotSpot JVM) దీన్ని ఆటోమాటిక్ గా సపోర్ట్ చేయదు! అందుకే డీప్ గా వెళ్లాలంటే జావాలో లూప్స్ ఏ బెటర్."
      }
    ],
    "recap": [
      "ఒక ప్రాబ్లమ్ ని చిన్న ముక్కలుగా చేయడానికి మెథడ్ తనని తానే మళ్ళీ మళ్ళీ పిలుచుకుంటే దాన్ని రికర్శన్ అంటారు.",
      "ప్రతి రికర్శన్ కి కచ్చితంగా ఆపేయడానికి ఒక కండిషన్ (Base Case) ఉండాలి.",
      "ఫ్రేమ్స్ అన్నీ స్టాక్ లో పేరుకుపోవడాన్ని Winding అని, వాల్యూస్ తీసుకుని కిందకి రావడాన్ని Unwinding అని అంటారు.",
      "బేస్ కేస్ లేకపోతే మెమరీ ఫుల్ అయ్యి `StackOverflowError` వస్తుంది.",
      "పెద్ద డేటా ఉన్నప్పుడు రికర్శన్ కన్నా లూప్స్ వాడటమే స్పీడ్, మెమరీకి మంచిది."
    ]
  },
  {
    "num": 37,
    "phaseId": "phase8",
    "phaseTitle": "Phase 8: Methods & Recursion",
    "slug": "37-java-methods-capstone-projects-and-best-practices",
    "title": "Java Methods Capstone Projects: 4 Production-Grade Modular Systems (తెలుగులో)",
    "badge": "37. Capstone Projects (4) & Best Practices",
    "subtopics": "Javadoc Documentation (@param, @return, @throws) · Clean Code & Single Responsibility · Project 1: Scientific Calculator · Project 2: Student Academic & GPA Suite · Project 3: Core Banking Operations · Project 4: Enterprise CommonUtils Library",
    "readTime": "30 min read",
    "intro": "సాఫ్ట్వేర్ కంపెనీల్లో మెథడ్స్ ని ఎలా రాస్తారు? Javadoc వాడి డాక్యుమెంటేషన్ ఎలా ఇస్తారు? క్లీన్ కోడ్ రూల్స్ ఏంటి? ఇవన్నీ పాటిస్తూ 4 ఇండస్ట్రీ-లెవెల్ ప్రాజెక్ట్స్ (సైంటిఫిక్ క్యాలిక్యులేటర్, స్టూడెంట్ గ్రేడింగ్ సిస్టమ్, బ్యాంకింగ్ ఆపరేషన్స్, అండ్ ఎంటర్ప్రైజ్ యూటిలిటీ లైబ్రరీ) ని ఈ చాప్టర్ లో క్రియేట్ చేద్దాం.",
    "theorySections": [
      {
        "heading": "1. Javadoc డాక్యుమెంటేషన్ అంటే ఏంటి?",
        "content": "కంపెనీల్లో మీరు రాసిన మెథడ్ వేరే డెవలపర్స్ కూడా వాడుకుంటారు. వాళ్ళకి అది ఏం చేస్తుందో చెప్పడానికి కోడ్ పైన **Javadoc comments** (<code>/** ... */</code>) రాస్తారు. ఇది రాస్తే జావా ఆటోమాటిక్ గా ఒక వెబ్సైట్ (HTML) లాంటి డాక్యుమెంటేషన్ ని జనరేట్ చేస్తుంది.\n\n```java\n/**\n * ఇచ్చిన డబ్బులకి కాంపౌండ్ ఇంట్రెస్ట్ క్యాలిక్యులేట్ చేస్తుంది.\n *\n * @param principal అసలు అమౌంట్ (0 కన్నా ఎక్కువ ఉండాలి).\n * @param annualRate సంవత్సరానికి ఎంత వడ్డీ శాతం.\n * @param years ఎన్ని సంవత్సరాలకి కట్టాలి.\n * @return వడ్డీతో కలిపి మొత్తం ఎంతైందో రిటర్న్ చేస్తుంది.\n * @throws IllegalArgumentException అమౌంట్ తప్పుగా ఇస్తే ఈ ఎర్రర్ ఇస్తుంది.\n */\npublic static double calculateCompoundInterest(double principal, double annualRate, int years) {\n    if (principal <= 0 || years < 1) {\n        throw new IllegalArgumentException(\"తప్పు అమౌంట్ లేదా ఇయర్స్ ఇచ్చారు\");\n    }\n    return principal * Math.pow(1 + (annualRate / 100.0), years);\n}\n```"
      },
      {
        "heading": "2. జావాలో క్లీన్ కోడ్ ప్రిన్సిపుల్స్ (Clean Code)",
        "content": "1. **Single Responsibility Principle (SRP):** ఒక మెథడ్ కి ఒక్క పనే ఉండాలి. అదే టాక్స్ క్యాలిక్యులేట్ చేసి, అదే డేటాబేస్ లో సేవ్ చేసి, అదే ఈమెయిల్ పంపించకూడదు. ఈ మూడింటికీ 3 వేరు వేరు మెథడ్స్ రాయాలి!\n2. **చిన్న సైజు:** ఒక ప్రొఫెషనల్ మెథడ్ మహా అయితే **5 నుంచి 20 లైన్లు** మాత్రమే ఉండాలి.\n3. **క్లియర్ పేర్లు (Verb-Noun):** మెథడ్ పేర్లు పనిని బట్టి ఉండాలి. ఉదా: `sendNotification()`, `validatePassword()`, `calculateNetPay()`.\n4. **తక్కువ పారామీటర్స్:** ఒక మెథడ్ కి 0 నుంచి 3 పారామీటర్స్ ఉంటే బెస్ట్. 7, 8 ఇవ్వాల్సి వస్తే.. అవన్నీ కలిపి ఒక ఆబ్జెక్ట్ లో పంపించడం బెటర్."
      }
    ],
    "codeExample": "import java.util.Arrays;\n\npublic class Main {\n    // -------------------------------------------------------------\n    // ప్రాజెక్ట్ 1: సైంటిఫిక్ క్యాలిక్యులేటర్\n    // -------------------------------------------------------------\n    public static class Calculator {\n        public static double add(double a, double b) { return a + b; }\n        public static double subtract(double a, double b) { return a - b; }\n        public static double multiply(double a, double b) { return a * b; }\n        public static double divide(double a, double b) {\n            if (b == 0) {\n                System.out.println(\"  [ఎర్రర్] జీరో తో డివైడ్ చేయలేం!\");\n                return Double.NaN; // Not a Number\n            }\n            return a / b;\n        }\n        public static double power(double base, double exp) { return Math.pow(base, exp); }\n        public static double modulus(double a, double b) { return a % b; }\n    }\n\n    // -------------------------------------------------------------\n    // ప్రాజెక్ట్ 2: స్టూడెంట్ గ్రేడింగ్ & GPA సిస్టమ్\n    // -------------------------------------------------------------\n    public static class StudentGrader {\n        // అన్నీ సింగిల్ రెస్పాన్సిబిలిటీ తో విడగొట్టాం\n        public static int calculateTotal(int[] marks) {\n            int total = 0;\n            for (int m : marks) total += m;\n            return total;\n        }\n\n        public static double calculatePercentage(int[] marks, int maxPerSubject) {\n            int total = calculateTotal(marks);\n            int maxTotal = marks.length * maxPerSubject;\n            return ((double) total / maxTotal) * 100.0;\n        }\n\n        public static char determineLetterGrade(double percentage) {\n            if (percentage >= 90) return 'A';\n            if (percentage >= 80) return 'B';\n            if (percentage >= 70) return 'C';\n            if (percentage >= 60) return 'D';\n            return 'F';\n        }\n\n        public static double calculateGPA(double percentage) {\n            return Math.min(4.0, (percentage / 100.0) * 4.0);\n        }\n    }\n\n    // -------------------------------------------------------------\n    // ప్రాజెక్ట్ 3: బ్యాంకింగ్ ఆపరేషన్స్ (ట్రాన్సాక్షన్స్)\n    // -------------------------------------------------------------\n    public static class BankService {\n        public static double deposit(double currentBalance, double amount) {\n            if (amount <= 0) {\n                System.out.println(\"  [BANK ఎర్రర్] అమౌంట్ తప్పుగా ఉంది: $\" + amount);\n                return currentBalance;\n            }\n            return currentBalance + amount;\n        }\n\n        public static double withdraw(double currentBalance, double amount) {\n            if (amount <= 0 || amount > currentBalance) {\n                System.out.println(\"  [BANK ఎర్రర్] విత్-డ్రా ఆగిపోయింది! అమౌంట్ తప్పు లేదా బ్యాలెన్స్ లేదు.\");\n                return currentBalance;\n            }\n            return currentBalance - amount;\n        }\n\n        public static boolean transferFunds(double[] senderBalance, double[] receiverBalance, double amount) {\n            if (amount <= 0 || senderBalance[0] < amount) {\n                return false; // బ్యాలెన్స్ లేకపోతే ఆగిపోతుంది\n            }\n            senderBalance[0] -= amount; // పంపేవాడికి కట్ అవుతుంది\n            receiverBalance[0] += amount; // తీసుకునేవాడికి యాడ్ అవుతుంది\n            return true;\n        }\n    }\n\n    // -------------------------------------------------------------\n    // ప్రాజెక్ట్ 4: ఎంటర్ప్రైజ్ కామన్ యూటిలిటీస్ (CommonUtils)\n    // -------------------------------------------------------------\n    public static class CommonUtils {\n        public static boolean isValidEmail(String email) {\n            if (email == null || email.isBlank()) return false;\n            // ఈమెయిల్ లో @, . లాంటివి ఉన్నాయా లేదా అని రెగ్యులర్ ఎక్స్ప్రెషన్ తో చెక్ చేస్తుంది\n            return email.matches(\"^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$\");\n        }\n\n        public static String maskCreditCard(String cardNum) {\n            if (cardNum == null || cardNum.length() < 4) return \"****\";\n            String clean = cardNum.replaceAll(\"[^0-9]\", \"\");\n            // సెక్యూరిటీ కోసం ముందు నంబర్స్ హైడ్ చేసి లాస్ట్ 4 మాత్రమే ఇస్తుంది\n            return \"****-****-****-\" + clean.substring(clean.length() - 4);\n        }\n\n        public static String formatCurrency(double amount) {\n            return String.format(\"$%,.2f\", amount); // కామాలతో పాటు నీట్ గా కరెన్సీ వస్తుంది\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== ప్రాజెక్ట్ 1: క్యాలిక్యులేటర్ ===\");\n        System.out.println(\"  10.5 + 4.5  = \" + Calculator.add(10.5, 4.5));\n        System.out.println(\"  15.0 / 3.0  = \" + Calculator.divide(15.0, 3.0));\n        System.out.println(\"  2.0 ^ 10.0  = \" + Calculator.power(2.0, 10.0));\n        Calculator.divide(10.0, 0); // ఎర్రర్ కండిషన్ చెక్ చేస్తున్నాం\n\n        System.out.println(\"\n=== ప్రాజెక్ట్ 2: స్టూడెంట్ గ్రేడింగ్ సిస్టమ్ ===\");\n        int[] studentMarks = {88, 92, 79, 95, 84};\n        int totalMarks = StudentGrader.calculateTotal(studentMarks);\n        double percentage = StudentGrader.calculatePercentage(studentMarks, 100);\n        char grade = StudentGrader.determineLetterGrade(percentage);\n        double gpa = StudentGrader.calculateGPA(percentage);\n\n        System.out.println(\"  మొత్తం మార్కులు : \" + totalMarks + \"/500\");\n        System.out.printf(\"  పర్సంటేజ్     : %.2f%%%n\", percentage);\n        System.out.println(\"  గ్రేడ్         : \" + grade);\n        System.out.printf(\"  GPA (4.0)    : %.2f%n\", gpa);\n\n        System.out.println(\"\n=== ప్రాజెక్ట్ 3: బ్యాంకింగ్ ఆపరేషన్స్ ===\");\n        double myAccount = 1000.0;\n        myAccount = BankService.deposit(myAccount, 500.0);\n        myAccount = BankService.withdraw(myAccount, 200.0);\n        System.out.println(\"  నా ఫైనల్ బ్యాలెన్స్: \" + CommonUtils.formatCurrency(myAccount));\n\n        double[] alice = {1200.0};\n        double[] bob = {300.0};\n        boolean txStatus = BankService.transferFunds(alice, bob, 400.0);\n        System.out.println(\"  ఆలిస్ నుంచి బాబ్ కి $400 ట్రాన్స్ఫర్ : సక్సెస్ = \" + txStatus);\n        System.out.println(\"  ఆలిస్ కొత్త బ్యాలెన్స్              : \" + CommonUtils.formatCurrency(alice[0]));\n        System.out.println(\"  బాబ్ కొత్త బ్యాలెన్స్               : \" + CommonUtils.formatCurrency(bob[0]));\n\n        System.out.println(\"\n=== ప్రాజెక్ట్ 4: ఎంటర్ప్రైజ్ యూటిలిటీస్ ===\");\n        System.out.println(\"  ఈమెయిల్ 'dev@google.com' కరెక్టేనా? : \" + CommonUtils.isValidEmail(\"dev@google.com\"));\n        System.out.println(\"  ఈమెయిల్ 'invalid-email' కరెక్టేనా?  : \" + CommonUtils.isValidEmail(\"invalid-email\"));\n        System.out.println(\"  మాస్క్ చేసిన క్రెడిట్ కార్డ్              : \" + CommonUtils.maskCreditCard(\"4111-2222-3333-8945\"));\n        System.out.println(\"  కరెన్సీ ఫార్మాట్ చేసిన పెద్ద అమౌంట్      : \" + CommonUtils.formatCurrency(1250450.75));\n    }\n}",
    "output": "=== ప్రాజెక్ట్ 1: క్యాలిక్యులేటర్ ===\n  10.5 + 4.5  = 15.0\n  15.0 / 3.0  = 5.0\n  2.0 ^ 10.0  = 1024.0\n  [ఎర్రర్] జీరో తో డివైడ్ చేయలేం!\n\n=== ప్రాజెక్ట్ 2: స్టూడెంట్ గ్రేడింగ్ సిస్టమ్ ===\n  మొత్తం మార్కులు : 438/500\n  పర్సంటేజ్     : 87.60%\n  గ్రేడ్         : B\n  GPA (4.0)    : 3.50\n\n=== ప్రాజెక్ట్ 3: బ్యాంకింగ్ ఆపరేషన్స్ ===\n  నా ఫైనల్ బ్యాలెన్స్: $1,300.00\n  ఆలిస్ నుంచి బాబ్ కి $400 ట్రాన్స్ఫర్ : సక్సెస్ = true\n  ఆలిస్ కొత్త బ్యాలెన్స్              : $800.00\n  బాబ్ కొత్త బ్యాలెన్స్               : $700.00\n\n=== ప్రాజెక్ట్ 4: ఎంటర్ప్రైజ్ యూటిలిటీస్ ===\n  ఈమెయిల్ 'dev@google.com' కరెక్టేనా? : true\n  ఈమెయిల్ 'invalid-email' కరెక్టేనా?  : false\n  మాస్క్ చేసిన క్రెడిట్ కార్డ్              : ****-****-****-8945\n  కరెన్సీ ఫార్మాట్ చేసిన పెద్ద అమౌంట్      : $1,250,450.75",
    "lineByLine": [
      {
        "line": "Calculator.divide(15.0, 3.0);",
        "explanation": "స్టాటిక్ మెథడ్ ని కాల్ చేసాం. ఇక్కడ జీరో తో డివైడ్ చేయకుండా సేఫ్టీ కోసం ఇఫ్ కండిషన్ ఉంది."
      },
      {
        "line": "StudentGrader.calculatePercentage(...)",
        "explanation": "ఇది ఇంకో మెథడ్ (calculateTotal) ని వాడుకుని పర్సంటేజ్ క్యాలిక్యులేట్ చేస్తుంది (సింగిల్ రెస్పాన్సిబిలిటీ రూల్)."
      },
      {
        "line": "BankService.transferFunds(alice, bob, 400.0);",
        "explanation": "రెండు అరేస్ ని పంపిస్తే, ఒకే మెథడ్ లో ఇద్దరి బ్యాలెన్స్ ని సేఫ్ గా అప్డేట్ చేసి ట్రాన్సాక్షన్ పూర్తి చేస్తుంది."
      },
      {
        "line": "CommonUtils.maskCreditCard(\"4111-2222-3333-8945\");",
        "explanation": "క్రెడిట్ కార్డ్ లో అంకెలు కాని వాటిని తీసేసి, కేవలం లాస్ట్ 4 డిజిట్స్ మాత్రమే కనిపించేలా సెక్యూరిటీ మాస్క్ వేస్తుంది."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    public static void main(String[] args) {\n        // రియల్ టైమ్ సినారియో: ఆఫీస్ లో ఎంప్లాయీస్ కి జీతాలు (Payroll) వేసే సిస్టమ్\n        String[] employees = {\"Ravi Teja\", \"Priya Sharma\", \"Kiran Kumar\"};\n        double[] baseSalaries = {4500.0, 6200.0, 3800.0};\n        double bonusRate = 0.15; // 15% బోనస్\n\n        System.out.println(\"=== ఆఫీస్ పెరోల్ (జీతాల) ప్రాసెసింగ్ ===\");\n        for (int i = 0; i < employees.length; i++) {\n            double bonus = baseSalaries[i] * bonusRate;\n            double gross = baseSalaries[i] + bonus;\n            double tax = gross * 0.10; // 10% టాక్స్ కట్\n            double net = gross - tax;\n\n            // CommonUtils లో ఉన్న మెథడ్ ని ఇక్కడ మళ్ళీ వాడుకుంటున్నాం (దీన్నే Reusability అంటారు!)\n            System.out.printf(\"ఎంప్లాయీ: %-14s | గ్రాస్: %s | టేక్-హోమ్: %s%n\",\n                    employees[i],\n                    Main.CommonUtils.formatCurrency(gross),\n                    Main.CommonUtils.formatCurrency(net));\n        }\n    }\n}",
    "practicalOutput": "=== ఆఫీస్ పెరోల్ (జీతాల) ప్రాసెసింగ్ ===\nఎంప్లాయీ: Ravi Teja      | గ్రాస్: $5,175.00 | టేక్-హోమ్: $4,657.50\nఎంప్లాయీ: Priya Sharma   | గ్రాస్: $7,130.00 | టేక్-హోమ్: $6,417.00\nఎంప్లాయీ: Kiran Kumar    | గ్రాస్: $4,370.00 | టేక్-హోమ్: $3,933.00",
    "commonMistakes": [
      "ఒకే మెథడ్ లో 200 లైన్లు రాసేసి మొత్తం పనంతా అక్కడే చేయడం. దీన్ని 'స్పెగెట్టి కోడ్' అంటారు. అలా కాకుండా చిన్న చిన్న మెథడ్స్ గా విడగొట్టాలి.",
      "మ్యాథ్స్ మెథడ్స్ రాసినప్పుడు సున్నా (0) తో డివైడ్ చేస్తే క్రాష్ అయ్యే ఎడ్జ్ కేస్ ని మర్చిపోవడం.",
      "మెథడ్ కి వచ్చే ఇన్పుట్ null ఉందా లేదా అని చెక్ చేయకపోవడం (దీనివల్ల `NullPointerException` వస్తుంది).",
      "మెథడ్ కి `doWork()`, `process()` లాంటి పిచ్చి పేర్లు పెట్టడం. `calculateNetPay()` లాగా అర్థమయ్యేలా ఉండాలి."
    ],
    "challenge": "// Coding Challenge:\n// CommonUtils లోకి calculateMedian(double[] values) అనే మెథడ్ ని యాడ్ చేయండి:\n// 1. అరే కి జిరాక్స్ తీసి సార్ట్ చేయాలి.\n// 2. సైజు బేసి సంఖ్య (odd) అయితే ఎగ్జాక్ట్ గా మధ్యలో ఉన్న వాల్యూ ఇవ్వాలి.\n// 3. సరి సంఖ్య (even) అయితే మధ్యలో ఉన్న రెండింటి ఆవరేజ్ ఇవ్వాలి.\n\npublic class Challenge {\n    public static double calculateMedian(double[] values) {\n        if (values == null || values.length == 0) return 0.0;\n        double[] sorted = values.clone(); // ఒరిజినల్ అరే పాడవకుండా కాపీ చేసాం\n        java.util.Arrays.sort(sorted);\n        \n        int n = sorted.length;\n        if (n % 2 != 0) {\n            return sorted[n / 2]; // Odd సైజు అయితే\n        }\n        return (sorted[(n / 2) - 1] + sorted[n / 2]) / 2.0; // Even సైజు అయితే రెండింటి ఆవరేజ్\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"మీడియన్ (Odd) : \" + calculateMedian(new double[]{5, 1, 9, 3, 7})); // 5.0\n        System.out.println(\"మీడియన్ (Even): \" + calculateMedian(new double[]{1, 2, 3, 4}));    // 2.5\n    }\n}",
    "faq": [
      {
        "q": "Pure Function అంటే ఏంటి?",
        "a": "ఏ ఫంక్షన్ కి అయితే మీరు సేమ్ ఇన్పుట్ ఇస్తే ఎప్పుడూ సేమ్ అవుట్పుట్ ఇస్తుందో, పైగా అది వేరే డేటాబేస్ లను గానీ బయట వేరియబుల్స్ ని గానీ మార్చకుండా సైలెంట్ గా తన పని చేసుకుంటుందో దాన్ని Pure Function అంటారు (ఉదా: `Math.max()`)."
      },
      {
        "q": "Javadoc ఎలా HTML వెబ్సైట్ లాగా మారుతుంది?",
        "a": "జావాలోనే `javadoc` అనే ఒక టూల్ ఉంటుంది. కమాండ్ ప్రాంప్ట్ లో `javadoc src/*.java` అని కొడితే అది ఈ `/** ... */` కామెంట్స్ అన్నింటినీ చదివి ఒక అందమైన వెబ్సైట్ లాగా మార్చేస్తుంది."
      },
      {
        "q": "యూటిలిటీ క్లాస్ లకి (CommonUtils) ప్రైవేట్ కన్స్ట్రక్టర్ ఎందుకు పెడతారు?",
        "a": "ఎందుకంటే యూటిలిటీ క్లాస్ లో అన్నీ స్టాటిక్ మెథడ్స్ ఏ ఉంటాయి. వాటిని పిలవడానికి ఆబ్జెక్ట్ అక్కర్లేదు కదా! పొరపాటున ఎవరైనా `new CommonUtils()` అని ఆబ్జెక్ట్ క్రియేట్ చేయకుండా ఉండటానికి ప్రైవేట్ కన్స్ట్రక్టర్ రాసి బ్లాక్ చేస్తారు."
      }
    ],
    "recap": [
      "సాఫ్ట్వేర్ కంపెనీల్లో ఫార్మల్ గా డాక్యుమెంటేషన్ ఇవ్వడానికి Javadoc కచ్చితంగా వాడతారు.",
      "Single Responsibility Principle (SRP) ప్రకారం ప్రతి మెథడ్ ఒకే ఒక్క పని చేయాలి.",
      "కోడ్ క్లీన్ గా ఉండాలంటే మెథడ్స్ చిన్నవిగా ఉండాలి, పేర్లు అర్థమయ్యేలా ఉండాలి.",
      "సిస్టమ్ క్రాష్ అవ్వకుండా ఉండాలంటే మెథడ్ కి వచ్చే పారామీటర్స్ ని ముందుగానే (Null check, జీరో చెక్) వాలిడేట్ చేసుకోవాలి.",
      "మెథడ్స్ ని మోడ్యులర్ గా రాస్తేనే ఒకదాంట్లో రాసిన కోడ్ ని ప్రాజెక్ట్ అంతటా వాడుకోవచ్చు (Reusability)."
    ]
  }
];
