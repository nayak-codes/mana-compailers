module.exports = [
  {
    "num": 28,
    "phaseId": "phase7",
    "phaseTitle": "Phase 7: Arrays & Matrices",
    "slug": "28-java-array-fundamentals-and-memory-model",
    "title": "Java Array Fundamentals, Memory Architecture & Traversal (తెలుగులో)",
    "badge": "28. Array Fundamentals & Memory",
    "subtopics": "Array ante enti? · Why Arrays are Needed · Stack vs Heap Memory Layout · Declaration & 3 Initialization Styles · Default JVM Values · 0-Based Indexing · .length Property · for vs Enhanced for-each Loop · ArrayIndexOutOfBoundsException",
    "readTime": "22 min read",
    "intro": "ఒకటి రెండు కాకుండా, 100 మంది స్టూడెంట్స్ మార్కులు స్టోర్ చేయాలంటే 100 వేరియబుల్స్ క్రియేట్ చేస్తామా? చేయం! దానికి బదులు వాడేదే **Arrays**. జావాలో Arrays అంటే ఏంటి? అవి మెమరీలో (Stack & Heap) ఎలా సేవ్ అవుతాయి? వాటిని క్రియేట్ చేయడానికి ఉన్న 3 పద్ధతులు, 0-based indexing మరియు లూప్స్ వాడి డేటాని ఎలా ప్రాసెస్ చేయాలో డీటెయిల్డ్ గా నేర్చుకుందాం.",
    "theorySections": [
      {
        "heading": "1. Array అంటే ఏంటి? అసలు ఇవి ఎందుకు కావాలి?",
        "content": "ప్రోగ్రామింగ్ లో **Array** అంటే ఒకే రకమైన డేటాని (ఉదాహరణకి అన్నీ `int` లేదా అన్నీ `String`) ఒకే చోట వరుసగా (Contiguous memory) స్టోర్ చేసుకునే ఒక బాక్స్ లాంటిది.\n\n**100-వేరియబుల్స్ ప్రాబ్లమ్ (ఎందుకు కావాలి?):**\nఒక ప్రొఫెసర్ 100 మంది స్టూడెంట్స్ మార్కులు సేవ్ చేయాలి అనుకోండి:\n- అరేస్ లేకపోతే: `int mark1, mark2, mark3, ... mark100;` అని 100 వేరియబుల్స్ రాయాలి. వాటి యావరేజ్ కనుక్కోవాలంటే 100 పేర్లూ టైప్ చేయాలి!\n- అరేస్ ఉంటే: `int[] marks = new int[100];` అని ఒక్క లైన్ లో రాసేయొచ్చు. 3 లైన్ల లూప్ తో 100 మంది డేటా ప్రాసెస్ చేయొచ్చు!\n\n```\n  విడివిడి వేరియబుల్స్ (మెమరీలో ఎక్కడెక్కడో ఉంటాయి):\n  [mark1: 85]      [mark2: 90]      [mark3: 78]      [mark4: 92]\n  (Address 0x10)   (Address 0x44)   (Address 0x8A)   (Address 0x9F)\n\n  Array ఆబ్జెక్ట్ (అన్నీ ఒకే చోట వరుసగా ఉంటాయి):\n  ఇండెక్స్:    [ 0 ]   [ 1 ]   [ 2 ]   [ 3 ]\n  డేటా:      |  85  |  90  |  78  |  92  |  (అడ్రెస్ 0x5000 దగ్గర వరుసగా)\n```"
      },
      {
        "heading": "2. JVM మెమరీ ఆర్కిటెక్చర్: Arrays ఎక్కడ ఉంటాయి?",
        "content": "C, C++ లో అరేస్ అంటే కేవలం మెమరీ బ్లాక్స్. కానీ జావాలో అరేస్ అన్నీ **ఆబ్జెక్ట్స్**! కాబట్టి ఇవి మెమరీలో ఎలా ఉంటాయంటే:\n\n1. **Stack Memory:** ఇక్కడ కేవలం మనం ఇచ్చిన పేరు (`marks`) మరియు ఆ అరే ఎక్కడుందో చెప్పే మెమరీ అడ్రెస్ (Reference) మాత్రమే ఉంటాయి.\n2. **Heap Memory:** అసలైన అరే డేటా మొత్తం ఇక్కడే ఉంటుంది. దీంట్లో 3 భాగాలు ఉంటాయి:\n   - **Object Header (12-16 bytes):** ఇది ఆబ్జెక్ట్ అని గుర్తుపట్టడానికి జావా వాడుకునే సెక్యూరిటీ డేటా.\n   - **Length Field (4 bytes):** అరే సైజు ఎంత అని చెప్పే ఒక ఫీల్డ్ (`.length`). ఇది ఎప్పటికీ మారదు.\n   - **Payload Data:** మనం ఇచ్చిన డేటా అంతా ఇక్కడే వరుసగా స్టోర్ అవుతుంది.\n\n```\n       STACK MEMORY                              HEAP MEMORY\n  +--------------------+             +-----------------------------------+\n  | marks = 0x5A2000   | ----------> | Object Header (12B) | Length = 4  |\n  +--------------------+             +-----------------------------------+\n                                     | [0]=85 | [1]=90 | [2]=78 | [3]=92 |\n                                     +-----------------------------------+\n```"
      },
      {
        "heading": "3. Arrays ని క్రియేట్ చేసే 3 పద్ధతులు",
        "content": "జావాలో అరేస్ ని క్రియేట్ చేయడానికి 3 స్టైల్స్ ఉన్నాయి:\n\n1. **Declaration (ముందు వేరియబుల్ రాయడం):**\n```java\nint[] numbers; // ఇదే బెస్ట్ పద్ధతి (చూడగానే ఇది int array అని అర్థం అవుతుంది)\nint numbers[]; // ఇది C, C++ వాళ్ళు రాసే పాత పద్ధతి (దీన్ని జావాలో వాడకండి)\n```\n\n2. **స్టైల్ 1: ముందే సైజు చెప్పడం (Dynamic Allocation):**\n```java\nint[] scores = new int[5]; // 5 గదులతో ఒక అరే రెడీ అవుతుంది (అన్నింట్లో 0 ఉంటుంది)\n```\n\n3. **స్టైల్ 2: డైరెక్ట్ గా వాల్యూస్ ఇవ్వడం (Shortcut):**\n```java\nint[] marks = {85, 90, 78, 92}; // బ్రాకెట్స్ లో వాల్యూస్ ఇస్తే, సైజు ఆటోమాటిక్ గా 4 అని తీసుకుంటుంది\n```\n\n4. **స్టైల్ 3: మెథడ్స్ కి పంపించేటప్పుడు (Anonymous Array):**\n```java\nint[] prices = new int[]{199, 299, 499}; // వేరియబుల్ లేకుండా డైరెక్ట్ గా వేరే మెథడ్ కి పంపడానికి ఇది వాడతారు\n```"
      },
      {
        "heading": "4. డీఫాల్ట్ వాల్యూస్ (అరేస్ లో ఏమీ ఇవ్వకపోతే ఏముంటుంది?)",
        "content": "మీరు `new Type[size]` వాడి అరే క్రియేట్ చేసి వదిలేస్తే, జావా అందులో ఆటోమాటిక్ గా కొన్ని డీఫాల్ట్ వాల్యూస్ నింపేస్తుంది:\n\n<div class=\"ref-table-wrap\">\n  <table class=\"ref-table\">\n    <thead>\n      <tr>\n        <th>డేటా టైప్</th>\n        <th>డీఫాల్ట్ వాల్యూ</th>\n        <th>ఉదాహరణకు <code>new Type[3]</code> ఇస్తే..</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><code>byte</code>, <code>short</code>, <code>int</code>, <code>long</code></td>\n        <td><code>0</code> / <code>0L</code></td>\n        <td><code>[0, 0, 0]</code></td>\n      </tr>\n      <tr>\n        <td><code>float</code>, <code>double</code></td>\n        <td><code>0.0f</code> / <code>0.0d</code></td>\n        <td><code>[0.0, 0.0, 0.0]</code></td>\n      </tr>\n      <tr>\n        <td><code>boolean</code></td>\n        <td><code>false</code></td>\n        <td><code>[false, false, false]</code></td>\n      </tr>\n      <tr>\n        <td><code>char</code></td>\n        <td><code>'\\u0000'</code> (కనిపించని Null క్యారెక్టర్)</td>\n        <td><code>['\\0', '\\0', '\\0']</code></td>\n      </tr>\n      <tr>\n        <td><strong>Reference Types</strong> (<code>String</code>, <code>Object</code>)</td>\n        <td><code>null</code></td>\n        <td><code>[null, null, null]</code></td>\n      </tr>\n    </tbody>\n  </table>\n</div>"
      },
      {
        "heading": "5. Indexing: అరేస్ లో డేటా లాగడం & మార్చడం (.length)",
        "content": "స్ట్రింగ్స్ లాగానే అరేస్ లో కూడా కౌంటింగ్ **0 నుంచే స్టార్ట్ అవుతుంది (0-based indexing)**:\n- **మొదటి వాల్యూ కావాలంటే:** `arr[0]`\n- **చివరి వాల్యూ కావాలంటే:** `arr[arr.length - 1]`\n- **వాల్యూ మార్చాలంటే:** `arr[2] = 95;` (ఇలా రాస్తే 3వ ప్లేస్ లో ఉన్న పాత వాల్యూ పోయి 95 సేవ్ అవుతుంది).\n\n**The `.length` ప్రాపర్టీ:**\n- అరే సైజు తెలుసుకోవాలంటే `.length` వాడాలి (ఉదా: `marks.length`).\n- **రూల్:** ఇక్కడ `()` బ్రాకెట్స్ వాడకూడదు! (స్ట్రింగ్స్ కి `String.length()` వస్తుంది, అరేస్ కి `arr.length` వస్తుంది).\n\n**ArrayIndexOutOfBoundsException ఎర్రర్:**\nఒకవేళ మీ అరే సైజు 5 ఉండి, మీరు `arr[10]` అని అడిగితే.. జావా వెంటనే మీ ప్రోగ్రామ్ ని ఆపేసి **`ArrayIndexOutOfBoundsException`** అనే ఎర్రర్ ఇచ్చి క్రాష్ చేస్తుంది. ఇది సెక్యూరిటీ కోసం అన్నమాట."
      },
      {
        "heading": "6. అరేస్ మీద లూప్స్ వాడటం (for vs for-each)",
        "content": "అరే లో ఉన్న వాల్యూస్ అన్నింటినీ ఒక్కొక్కటిగా ప్రాసెస్ చేయడానికి మనం లూప్స్ వాడతాం:\n\n1. **నార్మల్ `for` లూప్ (ఫుల్ కంట్రోల్ ఉంటుంది):**\nవాల్యూస్ ని మార్చాలన్నా, రివర్స్ లో ప్రింట్ చేయాలన్నా, ఒకదాని తర్వాత ఒకటి వదిలేసి ప్రింట్ చేయాలన్నా ఇది వాడాలి.\n```java\nfor (int i = 0; i < marks.length; i++) {\n    System.out.println(\"స్టూడెంట్ \" + i + \": \" + marks[i]);\n}\n```\n\n2. **ఎన్హాన్స్డ్ `for-each` లూప్ (చాలా క్లీన్ గా ఉంటుంది):**\nఇండెక్స్ లు (i), బౌండరీలు పట్టించుకోకుండా, మొదటి నుంచి చివరి దాకా ఉన్నవి ఉన్నట్టు ప్రింట్ చేయడానికి బెస్ట్.\n```java\nfor (int mark : marks) {\n    System.out.println(\"మార్కు: \" + mark);\n    // కానీ దీనితో మీరు అరే లోపల ఉన్న ఒరిజినల్ వాల్యూస్ ని మార్చలేరు!\n}\n```"
      }
    ],
    "codeExample": "import java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. Array ని క్రియేట్ చేయడం ===\");\n        int[] marks = {85, 90, 78, 92};\n\n        System.out.println(\"అరే సైజు (Length)     : \" + marks.length);\n        System.out.println(\"మొదటి ఎలిమెంట్ [0]      : \" + marks[0]);\n        System.out.println(\"చివరి ఎలిమెంట్ [3]       : \" + marks[marks.length - 1]);\n\n        System.out.println(\"\n=== 2. వాల్యూస్ ని అప్డేట్ చేయడం ===\");\n        System.out.println(\"ముందు marks[2] లో ఉన్నది : \" + marks[2]);\n        marks[2] = 88; // 3వ ప్లేస్ లో 88 ని సేవ్ చేస్తున్నాం\n        System.out.println(\"అప్డేట్ తర్వాత marks[2]   : \" + marks[2]);\n\n        System.out.println(\"\n=== 3. అరేస్ ని సార్టింగ్ చేయడం ===\");\n        Arrays.sort(marks); // చిన్న నంబర్ నుంచి పెద్ద నంబర్ కి ఆర్డర్ లో పెడుతుంది\n\n        System.out.println(\"\n=== 4. Enhanced for-each లూప్ తో ప్రింట్ ===\");\n        for (int mark : marks) {\n            System.out.println(\"మార్కు: \" + mark);\n        }\n\n        System.out.println(\"\n=== 5. డీఫాల్ట్ వాల్యూస్ డెమో ===\");\n        int[] defaultInts = new int[3];\n        boolean[] defaultBools = new boolean[3];\n        String[] defaultStrings = new String[3];\n\n        System.out.println(\"int[] లో డీఫాల్ట్         : \" + Arrays.toString(defaultInts));\n        System.out.println(\"boolean[] లో డీఫాల్ట్     : \" + Arrays.toString(defaultBools));\n        System.out.println(\"String[] లో డీఫాల్ట్      : \" + Arrays.toString(defaultStrings));\n\n        System.out.println(\"\n=== 6. రివర్స్ లో ప్రింట్ చేయడం (నార్మల్ ఫర్ లూప్) ===\");\n        System.out.print(\"రివర్స్ ఆర్డర్ లో మార్కులు  : \");\n        // రివర్స్ కావాలి కాబట్టి లాస్ట్ ఇండెక్స్ (length - 1) నుంచి 0 దాకా వచ్చాం\n        for (int i = marks.length - 1; i >= 0; i--) {\n            System.out.print(marks[i] + \" \");\n        }\n        System.out.println();\n    }\n}",
    "output": "=== 1. Array ని క్రియేట్ చేయడం ===\nఅరే సైజు (Length)     : 4\nమొదటి ఎలిమెంట్ [0]      : 85\nచివరి ఎలిమెంట్ [3]       : 92\n\n=== 2. వాల్యూస్ ని అప్డేట్ చేయడం ===\nముందు marks[2] లో ఉన్నది : 78\nఅప్డేట్ తర్వాత marks[2]   : 88\n\n=== 3. అరేస్ ని సార్టింగ్ చేయడం ===\n\n=== 4. Enhanced for-each లూప్ తో ప్రింట్ ===\nమార్కు: 85\nమార్కు: 88\nమార్కు: 90\nమార్కు: 92\n\n=== 5. డీఫాల్ట్ వాల్యూస్ డెమో ===\nint[] లో డీఫాల్ట్         : [0, 0, 0]\nboolean[] లో డీఫాల్ట్     : [false, false, false]\nString[] లో డీఫాల్ట్      : [null, null, null]\n\n=== 6. రివర్స్ లో ప్రింట్ చేయడం (నార్మల్ ఫర్ లూప్) ===\nరివర్స్ ఆర్డర్ లో మార్కులు  : 92 90 88 85",
    "lineByLine": [
      {
        "line": "int[] marks = {85, 90, 78, 92};",
        "explanation": "marks అనే వేరియబుల్ ని Stack లో పెట్టి, 4 నంబర్స్ కి సరిపడా మెమరీని Heap లో వరుసగా క్రియేట్ చేసింది."
      },
      {
        "line": "marks[2] = 88;",
        "explanation": "ఇండెక్స్ ఎప్పుడూ 0 తో స్టార్ట్ అవుతుంది కాబట్టి.. marks[2] అంటే మూడవ ప్లేస్ లోకి వెళ్లి డైరెక్ట్ గా 88 రాసేసింది."
      },
      {
        "line": "Arrays.sort(marks);",
        "explanation": "ఇది జావా వాళ్ళు రాసిపెట్టిన ఒక పవర్ఫుల్ మెథడ్ (Dual-Pivot Quicksort). ఇది అరే లో ఉన్న నంబర్స్ ని చిన్న నుంచి పెద్దకి ఆర్డర్ లో పెడుతుంది."
      },
      {
        "line": "for (int mark : marks)",
        "explanation": "marks అరే లో ఒక్కో నంబర్ ని బయటికి తీసి mark అనే వేరియబుల్ లో పెడుతుంది. ఇండెక్స్ లు పదే పదే రాయాల్సిన పని ఉండదు."
      },
      {
        "line": "int[] defaultInts = new int[3];",
        "explanation": "3 గదులతో అరే క్రియేట్ చేసి వదిలేస్తే.. జావా వెంటనే అందులో మూడింట్లో 0, 0, 0 వేసేసి రెడీగా పెడుతుంది."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    public static void main(String[] args) {\n        // రియల్ టైమ్ సినారియో: ఆఫీస్ లో ఎంప్లాయీస్ పని చేసిన గంటలు చెక్ చేయడం\n        String[] employees = {\"Priya Sharma\", \"Ravi Teja\", \"Ananya Reddy\", \"Kiran Kumar\"};\n        double[] weeklyHours = {42.5, 38.0, 45.0, 40.0};\n\n        System.out.println(\"=== వీక్లీ పెరోల్ ఓవర్ టైమ్ రిపోర్ట్ ===\");\n        for (int i = 0; i < employees.length; i++) {\n            // 40 గంటల కన్నా ఎక్కువ పనిచేస్తే ఓవర్ టైమ్ చేసినట్టు\n            boolean isOvertime = weeklyHours[i] > 40.0;\n            System.out.printf(\"ఎంప్లాయీ: %-15s | టైమ్: %4.1f hrs | ఓవర్ టైమా?: %b%n\",\n                    employees[i], weeklyHours[i], isOvertime);\n        }\n    }\n}",
    "practicalOutput": "=== వీక్లీ పెరోల్ ఓవర్ టైమ్ రిపోర్ట్ ===\nఎంప్లాయీ: Priya Sharma    | టైమ్: 42.5 hrs | ఓవర్ టైమా?: true\nఎంప్లాయీ: Ravi Teja       | టైమ్: 38.0 hrs | ఓవర్ టైమా?: false\nఎంప్లాయీ: Ananya Reddy    | టైమ్: 45.0 hrs | ఓవర్ టైమా?: true\nఎంప్లాయీ: Kiran Kumar     | టైమ్: 40.0 hrs | ఓవర్ టైమా?: false",
    "commonMistakes": [
      "లాస్ట్ ఎలిమెంట్ కావాలని `arr[arr.length]` అనడం. ఇండెక్స్ లు 0 తో స్టార్ట్ అవుతాయి కాబట్టి లాస్ట్ ఎలిమెంట్ ఎప్పుడూ `arr.length - 1` దగ్గరే ఉంటుంది. లేకపోతే `ArrayIndexOutOfBoundsException` వస్తుంది.",
      "`arr.length()` అని బ్రాకెట్స్ వాడటం. స్ట్రింగ్స్ కి `length()` వస్తుంది కానీ, అరేస్ కి కేవలం `.length` అనే ఫీల్డ్ మాత్రమే ఉంటుంది.",
      "`for-each` లూప్ వాడి ఒరిజినల్ అరే ని మారుద్దాం అనుకోవడం. `for(int x : arr) x = 0;` అని రాస్తే కేవలం టెంపరరీ కాపీ మాత్రమే మారుతుంది తప్ప, అరే లోపల ఉన్న అసలు వాల్యూస్ మారవు. మార్చాలంటే `arr[i] = 0` అని కచ్చితంగా నార్మల్ లూప్ వాడాలి."
    ],
    "challenge": "// Coding Challenge:\n// ఐదు నెలల టెంపరేచర్స్ ఉన్నాయి అనుకోండి: double[] temps = {32.5, 34.0, 36.5, 31.0, 29.5};\n// 1. నార్మల్ ఫర్ లూప్ వేసి, ఎక్కడైతే 30.0 కన్నా తక్కువ ఉందో ఆ వాల్యూని డబుల్ (x2) చేయండి.\n// 2. ఆ తర్వాత for-each లూప్ వేసి అన్నింటినీ పాయింట్ తర్వాత ఒక డిజిట్ వచ్చేలా ప్రింట్ చేయండి.\n\npublic class Challenge {\n    public static void main(String[] args) {\n        double[] temps = {32.5, 34.0, 36.5, 31.0, 29.5};\n        \n        for (int i = 0; i < temps.length; i++) {\n            if (temps[i] < 30.0) {\n                temps[i] *= 2; // వాల్యూ ని డబుల్ చేసాం\n            }\n        }\n        \n        System.out.print(\"అప్డేట్ అయిన టెంపరేచర్స్: \");\n        for (double t : temps) {\n            System.out.printf(\"%.1f°C \", t);\n        }\n        System.out.println();\n    }\n}",
    "faq": [
      {
        "q": "అరేస్ లో కౌంటింగ్ 1 తో కాకుండా 0 తో ఎందుకు స్టార్ట్ అవుతుంది?",
        "a": "ఇండెక్స్ అనేది వాల్యూ కాదు.. ఆ అరే స్టార్టింగ్ అడ్రెస్ నుంచి ఎంత దూరం (Offset) జరగాలి అని చెప్పే నంబర్. ఫస్ట్ ఎలిమెంట్ కి ఎటూ జరగాల్సిన పనిలేదు కదా, అందుకే దాని దూరం 0 అన్నమాట."
      },
      {
        "q": "అరే ని క్రియేట్ చేశాక సైజు పెంచడం కుదురుతుందా?",
        "a": "కుదరదు. అరేస్ ఒకసారి క్రియేట్ అయ్యాక వాటి సైజు ఫ్రీజ్ అయిపోతుంది (Fixed size). ఒకవేళ సైజు పెంచాలంటే, పెద్ద సైజు తో ఇంకో కొత్త అరే క్రియేట్ చేసి పాత డేటా అంతా కాపీ చేయాలి (ArrayList ఇంటర్నల్ గా చేసేది ఇదే)."
      },
      {
        "q": "int[] arr కీ, int arr[] కీ డిఫరెన్స్ ఏంటి?",
        "a": "రెండూ ఒకటే పనిచేస్తాయి. కానీ `int[]` అనేది జావా స్టాండర్డ్ పద్ధతి (టైప్ ని వేరియబుల్ ని క్లియర్ గా డివైడ్ చేస్తుంది). C, C++ నుంచి వచ్చే ప్రోగ్రామర్స్ కన్ఫ్యూజ్ కాకుండా ఉండటానికి జావా `int arr[]` ని కూడా యాక్సెప్ట్ చేస్తుంది."
      }
    ],
    "recap": [
      "Array అంటే ఒకే డేటా టైప్ కి సంబంధించిన మల్టిపుల్ వాల్యూస్ ని వరుసగా ఒకే చోట స్టోర్ చేసుకునే కంటైనర్.",
      "ఇవి Heap మెమరీలో క్రియేట్ అవుతాయి. ఇండెక్సింగ్ 0 నుంచి స్టార్ట్ అవుతుంది.",
      "అరే సైజు ఎంతుందో తెలుసుకోవడానికి `.length` అనే ప్రాపర్టీ వాడతాం.",
      "ఏమీ వాల్యూస్ ఇవ్వకుండా అరే క్రియేట్ చేస్తే, జావా అందులో 0, 0.0, false, null లాంటి డీఫాల్ట్ వాల్యూస్ నింపుతుంది.",
      "ప్రాసెస్ చేయాలంటే నార్మల్ `for` లూప్ గానీ, చాలా క్లీన్ గా ఉండే `for-each` లూప్ గానీ వాడాలి."
    ]
  },
  {
    "num": 29,
    "phaseId": "phase7",
    "phaseTitle": "Phase 7: Arrays & Matrices",
    "slug": "29-java-array-algorithms-sum-min-max-and-searching",
    "title": "Java Array Algorithms: Sum, Average, Min/Max & Searching (తెలుగులో)",
    "badge": "29. Array Math & Search Algorithms",
    "subtopics": "Sum & Average Calculations · Finding Maximum and Minimum · Second Largest Element ($O(N)$) · Linear Search Algorithm · Binary Search Algorithm ($O(\\log N)$) · Arrays.binarySearch() Mechanics",
    "readTime": "24 min read",
    "intro": "అరేస్ మీద చేసే కామన్ ఆపరేషన్స్ (Algorithms) ఏంటి? మొత్తం నంబర్స్ ని కలపడం, యావరేజ్ కనుక్కోవడం, అందులో అన్నిటికన్నా పెద్దది (Max) లేదా చిన్నది (Min) ఏది అని కనిపెట్టడం, అలాగే అరే లో మనకు కావాల్సిన ఒక నంబర్ ని వెతకడం (Linear & Binary Search) లాంటి ఇంపార్టెంట్ కాన్సెప్ట్స్ ని ఈ చాప్టర్ లో డీకోడ్ చేద్దాం.",
    "theorySections": [
      {
        "heading": "1. అరేలో ఉన్న నంబర్స్ ని కలపడం (Sum) & ఆవరేజ్ (Average)",
        "content": "అరే లో ఉన్న నంబర్స్ అన్నింటినీ కలపాలి అంటే ఒక వేరియబుల్ (counter) పెట్టుకుని లూప్ లో కలుపుకుంటూ వెళ్ళాలి:\n\n```java\nint[] numbers = {10, 20, 30, 40, 50};\nint sum = 0;\n\nfor (int num : numbers) {\n    sum += num;\n}\n// వెరీ వెరీ ఇంపార్టెంట్: ఆవరేజ్ తీసేటప్పుడు sum ని double కి మార్చాలి!\ndouble average = (double) sum / numbers.length;\n```\n\n**ఎక్కువ మంది చేసే తప్పు:**\nఒకవేళ `sum = 15` ఉండి `length = 4` ఉంటే.. మీరు మామూలుగా `15 / 4` అని రాస్తే జావా `3.75` బదులు `3` అని ఇంటిజర్ మాత్రమే ఇస్తుంది (పాయింట్ తర్వాత ఎగిరిపోతుంది). అందుకే దాన్ని ముందే `(double) sum / length` అని క్యాస్టింగ్ చేస్తే పర్ఫెక్ట్ రిజల్ట్ వస్తుంది."
      },
      {
        "heading": "2. మినిమమ్ & మాక్సిమమ్ కనుక్కోవడం (గోల్డెన్ రూల్)",
        "content": "అరే లో అతి పెద్ద నంబర్ లేదా చిన్న నంబర్ కనుక్కోవాలంటే ఒక రూల్ గుర్తుపెట్టుకోవాలి:\n\n**చేయకూడని తప్పు:**\nచాలామంది స్టార్టింగ్ లో `int max = 0;` అని తీసుకుని కంపేర్ చేస్తారు. ఒకవేళ మీ అరేలో అన్నీ నెగటివ్ నంబర్స్ (`{-15, -8, -42}`) ఉంటే ఏమవుతుంది? అరే లో లేకపోయినా `0` అనేది పెద్దది కాబట్టి అదే అవుట్పుట్ లో వస్తుంది. ఇది తప్పు!\n\n**కరెక్ట్ పద్ధతి:**\nఎప్పుడైనా `max` లేదా `min` ని స్టార్ట్ చేసేటప్పుడు అరే లో ఉన్న **మొదటి వాల్యూ తోనే** (`arr[0]`) స్టార్ట్ చేయాలి:\n\n```java\nint[] data = {-15, -8, -42, -99};\nint max = data[0];\nint min = data[0];\n\nfor (int i = 1; i < data.length; i++) {\n    if (data[i] > max) max = data[i]; // పాత దానికంటే పెద్దదైతే అప్డేట్ చేస్తాం\n    if (data[i] < min) min = data[i]; // పాత దానికంటే చిన్నదైతే అప్డేట్ చేస్తాం\n}\n```"
      },
      {
        "heading": "3. సెకండ్ లార్జెస్ట్ నంబర్ కనుక్కోవడం (సింగిల్ పాస్)",
        "content": "అరేని సార్టింగ్ చేయకుండా (సార్ట్ చేస్తే టైమ్ పడుతుంది కదా).. ఒకేసారి లూప్ వేసి ఫస్ట్ పెద్దది, సెకండ్ పెద్దది ఎలా కనుక్కోవాలి?\n\n```java\nint largest = Integer.MIN_VALUE; // జావాలో అతి చిన్న నంబర్ తో స్టార్ట్ చేస్తున్నాం\nint secondLargest = Integer.MIN_VALUE;\n\nfor (int num : arr) {\n    if (num > largest) {\n        // కొత్తది largest కంటే పెద్దదైతే, పాత largest ని second కి ఇచ్చేసి కొత్తదాన్ని largest లో పెట్టుకుంటాం\n        secondLargest = largest;\n        largest = num;\n    } else if (num > secondLargest && num != largest) {\n        // largest కంటే చిన్నదే, కానీ second కంటే పెద్దదైతే..\n        secondLargest = num;\n    }\n}\n```"
      },
      {
        "heading": "4. లీనియర్ సెర్చ్ vs బైనరీ సెర్చ్ (Linear vs Binary)",
        "content": "<div class=\"ref-table-wrap\">\n  <table class=\"ref-table\">\n    <thead>\n      <tr>\n        <th>అల్గారిథమ్</th>\n        <th>రూల్స్ (Prerequisite)</th>\n        <th>స్పీడ్ (Time)</th>\n        <th>ఎలా పనిచేస్తుంది?</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><strong>లీనియర్ సెర్చ్ (Linear Search)</strong></td>\n        <td>రూల్స్ ఏమీ లేవు (డేటా ఎలా పడితే అలా ఉన్నా పనిచేస్తుంది)</td>\n        <td><strong>O(N)</strong> (స్లో)</td>\n        <td>మొదటినుంచి లాస్ట్ దాకా ఒక్కొక్కటి వరుసగా వెతుక్కుంటూ వెళ్తుంది.</td>\n      </tr>\n      <tr>\n        <td><strong>బైనరీ సెర్చ్ (Binary Search)</strong></td>\n        <td><strong>డేటా కచ్చితంగా సార్టింగ్ చేసి (ఆర్డర్ లో) ఉండాలి</strong></td>\n        <td><strong>O(log N)</strong> (సూపర్ ఫాస్ట్)</td>\n        <td>ఎగ్జాక్ట్ గా మధ్యలో చూస్తుంది. టార్గెట్ దానికన్నా చిన్నదైతే లెఫ్ట్ కి, పెద్దదైతే రైట్ సగం మాత్రమే వెతుకుతుంది.</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n**బైనరీ సెర్చ్ పవర్ (ఎంత ఫాస్ట్?):**\nఒకవేళ మీ దగ్గర 10 లక్షల (1,000,000) రికార్డ్స్ ఉన్నాయనుకోండి:\n- లీనియర్ సెర్చ్ అయితే లక్ష సార్లు వెతుకుతుంది.\n- బైనరీ సెర్చ్ అయితే కేవలం **20 సార్లు** చెక్ చేసి చెప్పేస్తుంది!"
      },
      {
        "heading": "5. బైనరీ సెర్చ్ లో Mid ని క్యాలిక్యులేట్ చేసే సేఫ్ ఫార్ములా",
        "content": "బైనరీ సెర్చ్ రాసేటప్పుడు మధ్యలో ఉన్న నంబర్ తెలుసుకోవడానికి `mid = (left + right) / 2` అని రాస్తుంటారు. కానీ ఇది తప్పు!\nఒకవేళ అరే సైజు కోట్లలో ఉండి, left + right కలిపినప్పుడు 214 కోట్ల కన్నా ఎక్కువైతే జావాలో ఇంటిజర్ ఫుల్ అయిపోయి మైనస్ లోకి వెళ్లిపోతుంది (దీన్నే Overflow bug అంటారు).\n\n**ప్రొఫెషనల్ గా రాయాల్సిన ఫార్ములా:**\n$$\\text{mid} = \\text{left} + \\frac{\\text{right} - \\text{left}}{2}$$"
      }
    ],
    "codeExample": "import java.util.Arrays;\n\npublic class Main {\n    // 1. లీనియర్ సెర్చ్ (వరుసగా వెతకడం)\n    public static int linearSearch(int[] arr, int target) {\n        for (int i = 0; i < arr.length; i++) {\n            if (arr[i] == target) {\n                return i; // దొరికితే ఇండెక్స్ ఇస్తుంది\n            }\n        }\n        return -1; // దొరక్కపోతే -1 ఇస్తుంది\n    }\n\n    // 2. బైనరీ సెర్చ్ (సగం సగం చేసుకుంటూ వెతకడం)\n    public static int binarySearch(int[] arr, int target) {\n        int left = 0;\n        int right = arr.length - 1;\n\n        while (left <= right) {\n            int mid = left + (right - left) / 2; // ఇది సేఫ్ ఫార్ములా\n\n            if (arr[mid] == target) {\n                return mid; // మధ్యలోనే దొరికేసింది\n            } else if (arr[mid] < target) {\n                left = mid + 1; // నంబర్ పెద్దది కాబట్టి రైట్ కి వెళ్తాం\n            } else {\n                right = mid - 1; // నంబర్ చిన్నది కాబట్టి లెఫ్ట్ కి వెళ్తాం\n            }\n        }\n        return -1; // ఇక్కడ కూడా దొరకలేదంటే లేనట్టే\n    }\n\n    public static void main(String[] args) {\n        int[] scores = {45, 92, 18, 77, 85, 99, 63};\n\n        System.out.println(\"=== 1. Sum, Average, Min & Max ===\");\n        int sum = 0;\n        int min = scores[0];\n        int max = scores[0];\n\n        for (int s : scores) {\n            sum += s;\n            if (s < min) min = s;\n            if (s > max) max = s;\n        }\n        double avg = (double) sum / scores.length; // (double) మర్చిపోవద్దు\n\n        System.out.println(\"ఒరిజినల్ డేటా          : \" + Arrays.toString(scores));\n        System.out.println(\"మొత్తం (Sum)           : \" + sum);\n        System.out.printf(\"ఆవరేజ్ (Avg)           : %.2f%n\", avg);\n        System.out.println(\"అతి చిన్నది (Min)      : \" + min);\n        System.out.println(\"అతి పెద్దది (Max)      : \" + max);\n\n        System.out.println(\"\n=== 2. సెకండ్ లార్జెస్ట్ నంబర్ (Single-Pass) ===\");\n        int largest = Integer.MIN_VALUE;\n        int secondLargest = Integer.MIN_VALUE;\n        for (int s : scores) {\n            if (s > largest) {\n                secondLargest = largest;\n                largest = s;\n            } else if (s > secondLargest && s != largest) {\n                secondLargest = s;\n            }\n        }\n        System.out.println(\"ఫస్ట్ లార్జెస్ట్         : \" + largest);\n        System.out.println(\"సెకండ్ లార్జెస్ట్        : \" + secondLargest);\n\n        System.out.println(\"\n=== 3. లీనియర్ సెర్చ్ (Linear Search) ===\");\n        int searchTarget = 85;\n        int linearIdx = linearSearch(scores, searchTarget);\n        System.out.println(\"లీనియర్ సెర్చ్ లో 85 దొరికిన ఇండెక్స్: \" + linearIdx);\n\n        System.out.println(\"\n=== 4. బైనరీ సెర్చ్ (Binary Search) ===\");\n        Arrays.sort(scores); // బైనరీ సెర్చ్ కి ముందే సార్టింగ్ కచ్చితంగా ఉండాలి!\n        System.out.println(\"సార్ట్ చేసిన డేటా        : \" + Arrays.toString(scores));\n        \n        int binaryIdx = binarySearch(scores, searchTarget);\n        System.out.println(\"మన బైనరీ సెర్చ్ రిజల్ట్    : \" + binaryIdx);\n\n        // జావాలో ముందే రాసిపెట్టిన బైనరీ సెర్చ్ కూడా ఉంది\n        int builtinIdx = Arrays.binarySearch(scores, searchTarget);\n        System.out.println(\"Arrays.binarySearch() : \" + builtinIdx);\n    }\n}",
    "output": "=== 1. Sum, Average, Min & Max ===\nఒరిజినల్ డేటా          : [45, 92, 18, 77, 85, 99, 63]\nమొత్తం (Sum)           : 479\nఆవరేజ్ (Avg)           : 68.43\nఅతి చిన్నది (Min)      : 18\nఅతి పెద్దది (Max)      : 99\n\n=== 2. సెకండ్ లార్జెస్ట్ నంబర్ (Single-Pass) ===\nఫస్ట్ లార్జెస్ట్         : 99\nసెకండ్ లార్జెస్ట్        : 92\n\n=== 3. లీనియర్ సెర్చ్ (Linear Search) ===\nలీనియర్ సెర్చ్ లో 85 దొరికిన ఇండెక్స్: 4\n\n=== 4. బైనరీ సెర్చ్ (Binary Search) ===\nసార్ట్ చేసిన డేటా        : [18, 45, 63, 77, 85, 92, 99]\nమన బైనరీ సెర్చ్ రిజల్ట్    : 4\nArrays.binarySearch() : 4",
    "lineByLine": [
      {
        "line": "double avg = (double) sum / scores.length;",
        "explanation": "డివైడ్ చేసే ముందు sum ని డబుల్ (పాయింట్స్) గా మార్చాము. లేకపోతే డెసిమల్స్ ఎగిరిపోయి తప్పు ఆన్సర్ వస్తుంది."
      },
      {
        "line": "if (s > largest) { secondLargest = largest; largest = s; }",
        "explanation": "ఒకేసారి ఫస్ట్ ది, సెకండ్ ది రికార్డ్ చేస్కుంటున్నాం. దీనివల్ల సార్టింగ్ చేయాల్సిన పని తప్పుతుంది."
      },
      {
        "line": "linearSearch(scores, searchTarget);",
        "explanation": "ఇది అరే లో ఉన్న నంబర్స్ ని 0 నుంచి వరుసగా ఒక్కొక్కటి వెతుక్కుంటూ వెళ్తుంది. డేటా సార్ట్ అవ్వకపోయినా పనిచేస్తుంది."
      },
      {
        "line": "int mid = left + (right - left) / 2;",
        "explanation": "అరే సైజు కోట్లలో ఉన్నప్పుడు కూడా ఇంటిజర్ ఫుల్ అయిపోయి క్రాష్ అవ్వకుండా ఉండటానికి ఈ సేఫ్ ఫార్ములా వాడాము."
      },
      {
        "line": "Arrays.binarySearch(scores, searchTarget);",
        "explanation": "ఇది జావా వాళ్ళు రాసిపెట్టిన ఫాస్ట్ బైనరీ సెర్చ్. సగం సగం కట్ చేసుకుంటూ వెతుకుతుంది కాబట్టి డేటా సార్ట్ అయ్యుండాలి."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    public static void main(String[] args) {\n        // రియల్ టైమ్ సినారియో: సర్వర్ రెస్పాన్స్ టైమ్ (మెట్రిక్స్)\n        int[] latencyMs = {120, 85, 430, 210, 95, 850, 110, 340};\n\n        int total = 0;\n        int slaViolations = 0; // 300ms కన్నా ఎక్కువ టైమ్ తీసుకున్నవి\n        int maxLatency = latencyMs[0];\n\n        for (int lat : latencyMs) {\n            total += lat;\n            if (lat > 300) slaViolations++; // స్లో గా రెస్పాండ్ అయినవి కౌంట్ చేస్తున్నాం\n            if (lat > maxLatency) maxLatency = lat; // అన్నిటికన్నా స్లో ఏదో రికార్డ్ చేస్తున్నాం\n        }\n\n        double avgLatency = (double) total / latencyMs.length;\n        System.out.println(\"=== API రెస్పాన్స్ రిపోర్ట్ ===\");\n        System.out.printf(\"ఆవరేజ్ రెస్పాన్స్ టైమ్ : %.2f ms%n\", avgLatency);\n        System.out.println(\"అతి స్లో రెస్పాన్స్ (Max) : \" + maxLatency + \" ms\");\n        System.out.println(\"కండిషన్ ఫెయిల్ అయినవి (>300ms) : \" + slaViolations + \" రిక్వెస్ట్స్\");\n    }\n}",
    "practicalOutput": "=== API రెస్పాన్స్ రిపోర్ట్ ===\nఆవరేజ్ రెస్పాన్స్ టైమ్ : 280.00 ms\nఅతి స్లో రెస్పాన్స్ (Max) : 850 ms\nకండిషన్ ఫెయిల్ అయినవి (>300ms) : 3 రిక్వెస్ట్స్",
    "commonMistakes": [
      "అరే సార్ట్ చేయకుండా బైనరీ సెర్చ్ వాడటం. అలా వాడితే అది ఎక్కడెక్కడో వెతికి మైనస్ వాల్యూస్ ఇస్తుంది తప్ప కరెక్ట్ ఆన్సర్ ఇవ్వదు.",
      "`min` లేదా `max` ని 0 తో స్టార్ట్ చేయడం. నెగటివ్ నంబర్స్ ఉన్నప్పుడు మొత్తం రిజల్ట్ తప్పు వస్తుంది. ఎప్పుడూ `arr[0]` తోనే స్టార్ట్ చేయాలి.",
      "ఆవరేజ్ కనుక్కునేటప్పుడు `(double)` రాయడం మర్చిపోవడం. అప్పుడు 3.75 రావాల్సింది 3 అని వస్తుంది.",
      "బైనరీ సెర్చ్ లో `mid = (left + right) / 2` అని వాడటం. చిన్న అరేస్ కి పర్లేదు కానీ, లక్షల్లో డేటా ఉన్నప్పుడు క్రాష్ అయ్యే ఛాన్స్ ఉంది."
    ],
    "challenge": "// Coding Challenge:\n// థర్డ్ లార్జెస్ట్ (మూడవ అతిపెద్ద) నంబర్ కనుక్కోండి.\n// టైమ్ కండిషన్: O(N) (అంటే ఒకేసారి లూప్ వేయాలి, సార్టింగ్ వాడకూడదు).\n// అరే లో 3 కంటే తక్కువ నంబర్స్ ఉంటే, ఉన్నవాటిలో పెద్దది ప్రింట్ చేయాలి.\n\npublic class Challenge {\n    public static int findThirdLargest(int[] arr) {\n        long first = Long.MIN_VALUE;\n        long second = Long.MIN_VALUE;\n        long third = Long.MIN_VALUE;\n\n        for (int num : arr) {\n            if (num > first) {\n                third = second;\n                second = first;\n                first = num;\n            } else if (num > second && num != first) {\n                third = second;\n                second = num;\n            } else if (num > third && num != second && num != first) {\n                third = num;\n            }\n        }\n\n        return third == Long.MIN_VALUE ? (int) first : (int) third;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"థర్డ్ లార్జెస్ట్: \" + findThirdLargest(new int[]{10, 45, 99, 85, 23})); // 45\n        System.out.println(\"థర్డ్ లార్జెస్ట్: \" + findThirdLargest(new int[]{10, 20})); // 20 (3 నంబర్స్ లేవు కాబట్టి పెద్దదే ప్రింట్ అవుతుంది)\n    }\n}",
    "faq": [
      {
        "q": "Arrays.binarySearch() కి నంబర్ దొరకకపోతే -1 ఇస్తుందా?",
        "a": "ఎప్పుడూ -1 ఇవ్వదు. దొరకకపోతే అది ఎక్కడ ఉండాలో ఆ ఇండెక్స్ ని మైనస్ లో ఇస్తుంది `-(insertion_point + 1)`. ఉదాహరణకి -1 వచ్చిందంటే, ఆ నంబర్ ని మీరు 0వ ఇండెక్స్ లో పెట్టాలి అని అర్థం."
      },
      {
        "q": "బైనరీ సెర్చ్ అంత ఫాస్ట్ అయినప్పుడు ఇంకా లీనియర్ సెర్చ్ ఎందుకు వాడుతున్నారు?",
        "a": "బైనరీ సెర్చ్ వాడాలంటే డేటా ఆర్డర్ లో (సార్ట్ అయ్యి) ఉండాలి. సార్ట్ చేయడానికి చాలా టైమ్ పడుతుంది. మీరు ఒక్కసారే వెతకాలనుకుంటే అడ్డదిడ్డంగా ఉన్న డేటాలో డైరెక్ట్ లీనియర్ సెర్చ్ చేయడమే ఫాస్ట్. అదే పదే పదే వెతకాలనుకుంటే ఒకసారి సార్ట్ చేసి పెట్టుకుని బైనరీ సెర్చ్ వాడుకోవాలి."
      },
      {
        "q": "(double) sum / arr.length అంటే ఏం జరుగుతుంది?",
        "a": "జావాలో రెండు పూర్ణ సంఖ్యలని (int) భాగిస్తే ఆన్సర్ కూడా ఇంటిజర్ గానే వస్తుంది. అలా కాకుండా పాయింట్స్ లో రావాలంటే, డివైడ్ చేయకముందే అందులో ఒకదాన్ని డెసిమల్ గా మార్చాలి. అప్పుడే కరెక్ట్ ఆన్సర్ వస్తుంది."
      }
    ],
    "recap": [
      "ఆవరేజ్ తీసేముందు కచ్చితంగా `(double)` అని క్యాస్టింగ్ చేయాలి.",
      "Min, Max వెతికేటప్పుడు నెగటివ్ నంబర్స్ ఇష్యూ రాకుండా `arr[0]` తో స్టార్ట్ చేయాలి.",
      "ఒకే లూప్ లో సార్ట్ చేయకుండానే సెకండ్ లార్జెస్ట్, థర్డ్ లార్జెస్ట్ లాంటివి కనుక్కోవచ్చు.",
      "లీనియర్ సెర్చ్ స్లో కానీ సార్టింగ్ అవసరం లేదు. బైనరీ సెర్చ్ సూపర్ ఫాస్ట్ కానీ కచ్చితంగా సార్టింగ్ ఉండాలి.",
      "బైనరీ సెర్చ్ లో `mid` కనుక్కోవడానికి ఎప్పుడూ `left + (right - left) / 2` ఫార్ములానే వాడాలి."
    ]
  },
  {
    "num": 30,
    "phaseId": "phase7",
    "phaseTitle": "Phase 7: Arrays & Matrices",
    "slug": "30-java-array-sorting-copying-and-arrays-utility-class",
    "title": "Java Array Sorting, Copying & java.util.Arrays (తెలుగులో)",
    "badge": "30. Sorting, Copying & Utilities",
    "subtopics": "In-Place Array Reversal · Bubble Sort Algorithm · Arrays.sort() Internals (Dual-Pivot Quicksort) · 4 Array Copying Techniques · System.arraycopy() vs Arrays.copyOf() · Shallow vs Deep Copy · Arrays.fill(), Arrays.equals(), Arrays.mismatch()",
    "readTime": "26 min read",
    "intro": "అరే ని రివర్స్ చేయడం ఎలా? Bubble Sort లాంటి బేసిక్ సార్టింగ్ ఎలా పనిచేస్తుంది? జావాలో ముందే ఉన్న `Arrays.sort()` వెనక ఉన్న సీక్రెట్ ఏంటి? ఒక అరే ని ఇంకో అరే లోకి కాపీ చేయాలంటే `=` వాడితే ఎందుకు తప్పు వస్తుంది? ఇలాంటి బేసిక్ కానీ చాలా పవర్ఫుల్ కాన్సెప్ట్స్ మరియు `java.util.Arrays` క్లాస్ గురించి క్లియర్ గా తెలుసుకుందాం.",
    "theorySections": [
      {
        "heading": "1. అరే ని రివర్స్ చేయడం (కొత్త మెమరీ వాడకుండా)",
        "content": "ఒక అరే ని రివర్స్ చేయాలంటే కొత్త అరే క్రియేట్ చేసి వెనకనుంచి కాపీ చేయొచ్చు. కానీ అది మెమరీ వేస్ట్. దానికి బదులు Two-Pointer టెక్నిక్ వాడితే అసలు మెమరీ వాడకుండానే (In-Place) రివర్స్ అయిపోతుంది:\n\n```java\nint left = 0, right = arr.length - 1;\nwhile (left < right) {\n    // లెఫ్ట్ లో ఉన్నదాన్ని రైట్ కి, రైట్ లో ఉన్నదాన్ని లెఫ్ట్ కి స్వాప్ (Swap) చేస్తున్నాం\n    int temp = arr[left];\n    arr[left] = arr[right];\n    arr[right] = temp;\n    \n    left++;  // లెఫ్ట్ ది ఒక అడుగు ముందుకి\n    right--; // రైట్ ది ఒక అడుగు వెనక్కి (సగం వరకు రాగానే ఆగిపోతాయి)\n}\n```\n- ఇది చాలా ఫాస్ట్ గా ఉంటుంది ($O(N)$ టైమ్).\n- ఏ కొత్త అరే క్రియేట్ చేయలేదు కాబట్టి మెమరీ అసలు వాడలేదు ($O(1)$ స్పేస్)."
      },
      {
        "heading": "2. బబుల్ సార్ట్ (Bubble Sort) ఎలా పనిచేస్తుంది?",
        "content": "**Bubble Sort** అంటే పక్కపక్కన ఉన్న రెండు నంబర్స్ ని చూసి.. అందులో ఏది పెద్దదైతే దాన్ని రైట్ సైడ్ కి తోసుకుంటూ వెళ్లడం. ఇలా ఒక్కో రౌండ్ కి అరే లో ఉన్న అన్నిటికన్నా పెద్ద నంబర్ బుడగ లాగా లాస్ట్ కి చేరిపోతుంది:\n\n```\n  రౌండ్ 1: [5, 1, 4, 2, 8] -> [1, 5, 4, 2, 8] -> [1, 4, 5, 2, 8] -> [1, 4, 2, 5, 8] (8 కరెక్ట్ ప్లేస్ కి వెళ్ళిపోయింది)\n  రౌండ్ 2: [1, 4, 2, 5, 8] -> [1, 2, 4, 5, 8] (5 కరెక్ట్ ప్లేస్ కి వెళ్ళిపోయింది)\n  రౌండ్ 3: అరే మొత్తం సార్ట్ అయిపొయింది!\n```\n\n- ఇది చాలా బేసిక్ సార్టింగ్. అర్థం చేసుకోవడానికి బాగుంటుంది కానీ పెద్ద డేటా ఇస్తే చాలా స్లో ($O(N^2)$ టైమ్)."
      },
      {
        "heading": "3. అరే ని కాపీ చేయడానికి ఉన్న 4 పద్ధతులు",
        "content": "జావాలో మీరు `int[] copy = original;` అని రాస్తే అరే కాపీ అయిపోయింది అనుకుంటారు. కానీ అది కాపీ కాదు! జస్ట్ ఒకే అరే కి ఇంకో పేరు పెట్టినట్టు అవుతుంది. మీరు `copy` లో ఏదైనా మారిస్తే `original` లో కూడా మారిపోతుంది. అసలైన డూప్లికేట్ కావాలంటే ఈ 4 పద్ధతులు వాడాలి:\n\n<div class=\"ref-table-wrap\">\n  <table class=\"ref-table\">\n    <thead>\n      <tr>\n        <th>పద్ధతి (Method)</th>\n        <th>సింటాక్స్ (Syntax)</th>\n        <th>డీటెయిల్స్</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><strong>1. మ్యాన్యువల్ లూప్</strong></td>\n        <td><code>for (int i=0; i&lt;len; i++) copy[i] = orig[i];</code></td>\n        <td>లూప్ వేసి మనమే ఒక్కొక్కటి కాపీ చేయడం (సింపుల్).</td>\n      </tr>\n      <tr>\n        <td><strong>2. System.arraycopy()</strong></td>\n        <td><code>System.arraycopy(src, 0, dest, 0, len);</code></td>\n        <td><strong>సూపర్ ఫాస్ట్</strong> (ఇది డైరెక్ట్ గా ర్యామ్ లో కాపీ కొట్టేస్తుంది, టైమ్ అస్సలు పట్టదు).</td>\n      </tr>\n      <tr>\n        <td><strong>3. Arrays.copyOf()</strong></td>\n        <td><code>int[] copy = Arrays.copyOf(orig, newLength);</code></td>\n        <td>కాపీతో పాటు ఒకేసారి అరే సైజు ని కూడా పెంచుకోవచ్చు.</td>\n      </tr>\n      <tr>\n        <td><strong>4. clone()</strong></td>\n        <td><code>int[] copy = orig.clone();</code></td>\n        <td>ఇది పాత పద్ధతి. ఉన్న అరే కి ఎగ్జాక్ట్ క్లోన్ క్రియేట్ చేస్తుంది.</td>\n      </tr>\n    </tbody>\n  </table>\n</div>"
      },
      {
        "heading": "4. java.util.Arrays క్లాస్ పవర్ ఏంటి?",
        "content": "అరేస్ ని ఈజీగా మేనేజ్ చేయడానికి జావా వల్లే `java.util.Arrays` అనే క్లాస్ లో కొన్ని రెడీమేడ్ మెథడ్స్ ఇచ్చారు:\n\n- **`Arrays.toString(arr)`:** అరే ని నీట్ గా బ్రాకెట్స్ లో `\"[1, 2, 3]\"` అని ప్రింట్ చేస్తుంది.\n- **`Arrays.sort(arr)`:** చాలా ఫాస్ట్ గా సార్ట్ చేస్తుంది.\n- **`Arrays.fill(arr, val)`:** అరే మొత్తం ఒకే నంబర్ తో నింపేయాలంటే ఇది వాడాలి.\n- **`Arrays.equals(arr1, arr2)`:** రెండు అరేస్ లో డేటా సేమ్ ఉందా లేదా అని చెక్ చేస్తుంది.\n- **`Arrays.mismatch(arr1, arr2)`:** (Java 9+) రెండు అరేస్ ఎక్కడ (ఏ ఇండెక్స్ దగ్గర) డిఫరెంట్ గా ఉన్నాయో ఆ నంబర్ ఇస్తుంది.\n- **`Arrays.compare(arr1, arr2)`:** (Java 9+) ఏ అరే పెద్దదో చెక్ చేస్తుంది."
      }
    ],
    "codeExample": "import java.util.Arrays;\n\npublic class Main {\n    // బబుల్ సార్ట్ (సార్ట్ అయిపోగానే ఆగిపోయేలా ఆప్టిమైజ్ చేసాం)\n    public static void bubbleSort(int[] arr) {\n        int n = arr.length;\n        for (int i = 0; i < n - 1; i++) {\n            boolean swapped = false;\n            for (int j = 0; j < n - 1 - i; j++) {\n                if (arr[j] > arr[j + 1]) {\n                    // స్వాప్ చేయడం\n                    int temp = arr[j];\n                    arr[j] = arr[j + 1];\n                    arr[j + 1] = temp;\n                    swapped = true;\n                }\n            }\n            if (!swapped) break; // ముందే సార్ట్ అయిపోతే అనవసరంగా లూప్ తిరగకుండా ఆపేస్తాం\n        }\n    }\n\n    // టూ-పాయింటర్ వాడి ఇన్-ప్లేస్ లో రివర్స్ చేయడం\n    public static void reverseArray(int[] arr) {\n        int left = 0, right = arr.length - 1;\n        while (left < right) {\n            int temp = arr[left];\n            arr[left] = arr[right];\n            arr[right] = temp;\n            left++;\n            right--;\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. ఇన్-ప్లేస్ రివర్స్ (మెమరీ సేవ్) ===\");\n        int[] numbers = {10, 20, 30, 40, 50};\n        System.out.println(\"ఒరిజినల్ అరే           : \" + Arrays.toString(numbers));\n        reverseArray(numbers);\n        System.out.println(\"రివర్స్ చేసిన తర్వాత     : \" + Arrays.toString(numbers));\n\n        System.out.println(\"\n=== 2. బబుల్ సార్ట్ (Bubble Sort) ===\");\n        int[] unsorted = {64, 34, 25, 12, 22, 11, 90};\n        System.out.println(\"సార్టింగ్ కి ముందు      : \" + Arrays.toString(unsorted));\n        bubbleSort(unsorted);\n        System.out.println(\"సార్ట్ చేసిన తర్వాత      : \" + Arrays.toString(unsorted));\n\n        System.out.println(\"\n=== 3. అరే కాపీ చేయడానికి పద్ధతులు ===\");\n        int[] original = {100, 200, 300, 400};\n\n        // టెక్నిక్ 1: Arrays.copyOf()\n        int[] copyA = Arrays.copyOf(original, original.length);\n\n        // టెక్నిక్ 2: System.arraycopy() (ఇది ఫాస్టెస్ట్)\n        int[] copyB = new int[original.length];\n        System.arraycopy(original, 0, copyB, 0, original.length);\n\n        // టెక్నిక్ 3: clone()\n        int[] copyC = original.clone();\n\n        System.out.println(\"Arrays.copyOf తో కాపీ : \" + Arrays.toString(copyA));\n        System.out.println(\"arraycopy() తో కాపీ   : \" + Arrays.toString(copyB));\n        System.out.println(\"clone() తో కాపీ       : \" + Arrays.toString(copyC));\n\n        System.out.println(\"\n=== 4. Arrays రెడీమేడ్ మెథడ్స్ ===\");\n        System.out.println(\"రెండు అరేస్ ఒకటేనా? (equals) : \" + Arrays.equals(copyA, copyB)); // true\n\n        int[] fillArray = new int[5];\n        Arrays.fill(fillArray, 7); // మొత్తం 7 తో నింపేస్తుంది\n        System.out.println(\"Arrays.fill(..., 7) వాడితే  : \" + Arrays.toString(fillArray));\n\n        // 1 నుంచి 3 వరకు మాత్రమే కట్ చేసి కొత్త అరే ఇస్తుంది (3 రాదు, దాని ముందు వరకే)\n        int[] rangeCopy = Arrays.copyOfRange(original, 1, 3);\n        System.out.println(\"Arrays.copyOfRange(1,3)     : \" + Arrays.toString(rangeCopy));\n    }\n}",
    "output": "=== 1. ఇన్-ప్లేస్ రివర్స్ (మెమరీ సేవ్) ===\nఒరిజినల్ అరే           : [10, 20, 30, 40, 50]\nరివర్స్ చేసిన తర్వాత     : [50, 40, 30, 20, 10]\n\n=== 2. బబుల్ సార్ట్ (Bubble Sort) ===\nసార్టింగ్ కి ముందు      : [64, 34, 25, 12, 22, 11, 90]\nసార్ట్ చేసిన తర్వాత      : [11, 12, 22, 25, 34, 64, 90]\n\n=== 3. అరే కాపీ చేయడానికి పద్ధతులు ===\nArrays.copyOf తో కాపీ : [100, 200, 300, 400]\narraycopy() తో కాపీ   : [100, 200, 300, 400]\nclone() తో కాపీ       : [100, 200, 300, 400]\n\n=== 4. Arrays రెడీమేడ్ మెథడ్స్ ===\nరెండు అరేస్ ఒకటేనా? (equals) : true\nArrays.fill(..., 7) వాడితే  : [7, 7, 7, 7, 7]\nArrays.copyOfRange(1,3)     : [200, 300]",
    "lineByLine": [
      {
        "line": "reverseArray(numbers);",
        "explanation": "టూ-పాయింటర్ టెక్నిక్ వాడి లెఫ్ట్, రైట్ ఎలిమెంట్స్ ని స్వాప్ చేయడం వల్ల, కొత్త అరే క్రియేట్ చేయకుండానే అరే ఉల్టా అయిపోయింది."
      },
      {
        "line": "System.arraycopy(original, 0, copyB, 0, original.length);",
        "explanation": "ఇది జావాలో అన్నిటికన్నా ఫాస్ట్ గా కాపీ చేసే పద్ధతి. ఎందుకంటే ఇది డైరెక్ట్ గా ఆపరేటింగ్ సిస్టమ్ ర్యామ్ లో కాపీ కొడుతుంది."
      },
      {
        "line": "Arrays.copyOf(original, original.length);",
        "explanation": "ఇది చాలా సింపుల్ గా ఉంటుంది. కొత్త అరే క్రియేట్ చేసి కాపీ అంతా ఇదే చేసేస్తుంది."
      },
      {
        "line": "Arrays.fill(fillArray, 7);",
        "explanation": "లక్ష సైజు ఉన్న అరే లో అన్నీ ఒకే వాల్యూ తో నింపాలంటే లూప్ వేయకుండా సింపుల్ గా దీన్ని వాడొచ్చు."
      },
      {
        "line": "Arrays.equals(copyA, copyB);",
        "explanation": "రెండు అరేస్ లో డేటా సేమ్ ఉందా లేదా అని పర్ఫెక్ట్ గా చెక్ చేసి true లేదా false చెప్తుంది."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    public static void main(String[] args) {\n        // రియల్ టైమ్ సినారియో: సర్వర్ బఫర్ సైజు ని పెంచడం (Dynamic Expansion)\n        int[] buffer = {10, 20, 30};\n        System.out.println(\"స్టార్టింగ్ బఫర్ (సైజు 3): \" + Arrays.toString(buffer));\n\n        // కొత్త డేటా వచ్చింది కానీ అరే ఫుల్ అయిపొయింది, ఇప్పుడు సైజు డబుల్ చేయాలి\n        int[] expandedBuffer = Arrays.copyOf(buffer, buffer.length * 2);\n        // పాతవి అన్నీ వచ్చేసాయి, ఇప్పుడు కొత్తవి యాడ్ చేద్దాం\n        expandedBuffer[3] = 40;\n        expandedBuffer[4] = 50;\n\n        System.out.println(\"పెంచిన బఫర్ (సైజు 6)   : \" + Arrays.toString(expandedBuffer));\n    }\n}",
    "practicalOutput": "స్టార్టింగ్ బఫర్ (సైజు 3): [10, 20, 30]\nపెంచిన బఫర్ (సైజు 6)   : [10, 20, 30, 40, 50, 0]",
    "commonMistakes": [
      "`int[] b = a;` అని రాసి అరే కాపీ అయిపోయింది అనుకోవడం. ఇది కాపీ కాదు, జస్ట్ రిమోట్ కంట్రోల్ (Reference) పాస్ చేసినట్టు అంతే. ఒకదాంట్లో మారిస్తే ఇంకోదాంట్లో మారుతుంది.",
      "రెండు అరేస్ ని `a.equals(b)` అని చెక్ చేయడం. స్ట్రింగ్స్ కి ఇది కరెక్టే కానీ, అరేస్ కి ఎప్పుడూ `Arrays.equals(a, b)` వాడాలి. లేకపోతే అడ్రెస్ లు చెక్ చేసి ఎప్పుడూ false ఇస్తుంది.",
      "అరే ని డైరెక్ట్ గా `System.out.println(arr)` అని ప్రింట్ చేయడం. అలా చేస్తే `[I@1b6d3586` లాంటి పిచ్చి అడ్రెస్ ప్రింట్ అవుతుంది. ఎప్పుడూ `Arrays.toString(arr)` వాడాలి.",
      "`Arrays.copyOfRange(arr, 1, 4)` వాడినప్పుడు 4 కూడా వస్తుందని కన్ఫ్యూజ్ అవ్వడం. ఎప్పుడైనా ఎండింగ్ ఇండెక్స్ ఇంక్లూడ్ అవ్వదు (దాని ముందు వరకే కట్ అవుతుంది)."
    ],
    "challenge": "// Coding Challenge:\n// మీ దగ్గర సార్ట్ చేసి ఉన్న ఒక అరే ఉంది. అందులో ఒకే నంబర్ చాలాసార్లు రిపీట్ అయ్యింది: {1, 1, 2, 2, 3, 4, 4, 5}.\n// 1. దాన్ని అదే అరే లోపల క్లీన్ చేసి డూప్లికేట్స్ తీసేయాలి (O(N) టైమ్ లో).\n// 2. కొత్తగా ఎన్ని యూనిక్ నంబర్స్ ఉన్నాయో ఆ కౌంట్ ని రిటర్న్ చేయాలి.\n\npublic class Challenge {\n    public static int removeDuplicates(int[] arr) {\n        if (arr.length == 0) return 0;\n        int uniqueIdx = 0;\n        for (int i = 1; i < arr.length; i++) {\n            if (arr[i] != arr[uniqueIdx]) {\n                uniqueIdx++;\n                arr[uniqueIdx] = arr[i]; // పాత దాని ప్లేస్ లో యూనిక్ నంబర్ తో రీప్లేస్ చేస్తున్నాం\n            }\n        }\n        return uniqueIdx + 1; // యూనిక్ నంబర్స్ కౌంట్\n    }\n\n    public static void main(String[] args) {\n        int[] sorted = {1, 1, 2, 2, 3, 4, 4, 5};\n        int newLength = removeDuplicates(sorted);\n        System.out.println(\"యూనిక్ కౌంట్ : \" + newLength);\n        System.out.print(\"యూనిక్ అరే   : \");\n        for (int i = 0; i < newLength; i++) {\n            System.out.print(sorted[i] + \" \");\n        }\n        System.out.println();\n    }\n}",
    "faq": [
      {
        "q": "System.out.println(new int[]{1,2,3}) అని రాస్తే [I@6d06d69c లాంటి చెత్త ఎందుకు వస్తుంది?",
        "a": "ఎందుకంటే అరేస్ కి జావాలో డీఫాల్ట్ గా `toString()` అనే మెథడ్ ఆబ్జెక్ట్ అడ్రెస్ (హ్యాష్ కోడ్) ని ప్రింట్ చేసేలా సెట్ చేసి ఉంటుంది. అందులో `[I` అంటే ఇంటిజర్ అరే అని, `@` తర్వాత ఉండేది దాని అడ్రెస్ అని అర్థం. వాల్యూస్ కావాలంటే `Arrays.toString(arr)` ఏ వాడాలి."
      },
      {
        "q": "Arrays.sort() అనేది లోపల ఏ అల్గారిథమ్ ని వాడుతుంది?",
        "a": "నార్మల్ నంబర్స్ (int, double లాంటివి) ఇస్తే **Dual-Pivot Quicksort** ని వాడుతుంది (ఇది చాలా ఫాస్ట్). అదే Objects (String లాంటివి) ఇస్తే **Timsort** ని వాడుతుంది."
      },
      {
        "q": "అన్నిటికన్నా ఫాస్ట్ గా కాపీ చేసే పద్ధతి ఏది?",
        "a": "`System.arraycopy()` అనేది దేనికైనా కింగ్. ఎందుకంటే ఇది జావా కోడ్ కాదు, డైరెక్ట్ గా C/C++ లో రాసిన నేటివ్ సిస్టమ్ కాల్. ఇది ర్యామ్ లో అమాంతం డేటాని తీసుకెళ్లి కాపీ కొడుతుంది."
      }
    ],
    "recap": [
      "రివర్స్ చేయడానికి టూ-పాయింటర్ టెక్నిక్ వాడితే మెమరీ ఫుల్ గా సేవ్ అవుతుంది.",
      "`int[] b = a;` రాస్తే డేటా కాపీ అవ్వదు, కేవలం లింక్ క్రియేట్ అవుతుంది. నిజంగా కాపీ కావాలంటే `Arrays.copyOf()` వాడాలి.",
      "అరేస్ ని ప్రింట్ చేయడానికి, కంపేర్ చేయడానికి ఎప్పుడూ `Arrays` క్లాస్ లోని మెథడ్స్ ఏ వాడాలి.",
      "`Arrays.sort()` అనేది ప్రపంచంలోనే అత్యంత ఫాస్ట్ అయిన సార్టింగ్ అల్గారిథమ్స్ ని ఇంటర్నల్ గా వాడుకుంటుంది.",
      "`System.arraycopy()` వాడితే సూపర్ ఫాస్ట్ గా మెమరీ కాపీ జరుగుతుంది."
    ]
  },
  {
    "num": 31,
    "phaseId": "phase7",
    "phaseTitle": "Phase 7: Arrays & Matrices",
    "slug": "31-java-multidimensional-and-jagged-arrays",
    "title": "Java Multidimensional & Jagged Arrays (తెలుగులో)",
    "badge": "31. 2D & Jagged Arrays",
    "subtopics": "2D Arrays (Matrices) · \"Array of Arrays\" Memory Model · Matrix Declaration & Nested Loops · Matrix Addition & Transpose · Jagged (Ragged) Arrays Architecture · Dynamic Row Allocation · Arrays.deepToString() & Arrays.deepEquals()",
    "readTime": "26 min read",
    "intro": "ఒక టేబుల్ లాంటి డేటాని (Rows & Columns) స్టోర్ చేయాలంటే 2D Arrays వాడతాం. కానీ జావాలో 2D Arrays వేరే లాంగ్వేజెస్ లాగా ఉండవు, ఇదొక \"Array of Arrays\". ఈ మ్యాట్రిక్స్ ని ఎలా క్రియేట్ చేయాలి? రెండు మ్యాట్రిక్స్ ని కలపడం (Addition), రివర్స్ చేయడం (Transpose) మరియు ఒక్కో అడ్డువరుస ఒక్కో సైజులో ఉండే స్పెషల్ `Jagged Arrays` గురించి ఇక్కడ డీటెయిల్ గా నేర్చుకుందాం.",
    "theorySections": [
      {
        "heading": "1. 2D Array అంటే ఏంటి? (Array of Arrays)",
        "content": "C, C++ లో 2D అరే క్రియేట్ చేస్తే, మెమరీలో ఒక పెద్ద బ్లాక్ లాగా స్క్వేర్ షేప్ లో అరేంజ్ అవుతుంది.\n\nకానీ జావాలో అలా ఉండదు. జావాలో 2D Array అనేది నిజానికి **\"అరేల లోపల అరేలు\" (Array of Arrays)**:\n- ఫస్ట్ ఒక మెయిన్ అరే ఉంటుంది, అది అడ్డువరుసల (Rows) అడ్రెస్ లని సేవ్ చేసుకుంటుంది.\n- ఆ మెయిన్ అరే లోని ప్రతి డబ్బా.. ఇంకొక సపరేట్ 1D అరే కి పాయింట్ చేస్తూ ఉంటుంది!\n\n```\n  int[][] matrix = new int[3][4];\n\n  STACK                    HEAP MEMORY\n  +--------+              +-----------------------+\n  | matrix | -----------> | [0] | [1] | [2] (ఈ మూడు Rows అడ్రెస్ లు)\n  +--------+              +---|---|---|-----------+\n                              |   |   |\n             +----------------+   |   +----------------+\n             v                    v                    v\n      +---------------+    +---------------+    +---------------+\n      | 0 | 0 | 0 | 0 |    | 0 | 0 | 0 | 0 |    | 0 | 0 | 0 | 0 | (ఇవి అసలు డేటా - Row 0, 1, 2)\n      +---------------+    +---------------+    +---------------+\n```"
      },
      {
        "heading": "2. 2D Arrays ని క్రియేట్ చేయడం",
        "content": "1. **సైజు చెప్పి క్రియేట్ చేయడం:**\n```java\nint[][] grid = new int[3][3]; // 3 అడ్డువరుసలు, 3 నిలువు వరుసలు (అన్నీ 0 లతో నిండిపోతాయి)\n```\n\n2. **డైరెక్ట్ గా వాల్యూస్ ఇవ్వడం (Inline):**\n```java\nint[][] matrix = {\n    {1, 2, 3},\n    {4, 5, 6},\n    {7, 8, 9}\n};\n```\n\n3. **ఎలా యాక్సెస్ చేయాలి?**\n- **ఎన్ని Rows ఉన్నాయి?:** `matrix.length` (ఇక్కడ 3 వస్తుంది)\n- **ఒక్కో Row లో ఎన్ని కాల్స్ ఉన్నాయి?:** `matrix[0].length` (ఇది కూడా 3 వస్తుంది)\n- **లోపల ఉన్న నంబర్ కావాలంటే:** `matrix[row][col]` (ఉదాహరణకి `matrix[1][2]` అంటే 6 వస్తుంది)"
      },
      {
        "heading": "3. మ్యాట్రిక్స్ మ్యాథ్స్: ఎడిషన్ (Addition) & ట్రాన్స్పోస్ (Transpose)",
        "content": "1. **మ్యాట్రిక్స్ ఎడిషన్ ($C[i][j] = A[i][j] + B[i][j]$):**\nరెండు మ్యాట్రిక్స్ ని కలపాలంటే, కచ్చితంగా రెండిటి సైజులు ఒకేలా ఉండాలి. అప్పుడు ఒకదానిలో ఉన్న సేమ్ పొజిషన్ వాల్యూ ని, ఇంకోదానిలో సేమ్ పొజిషన్ తో కలిపేస్తాం.\n\n2. **మ్యాట్రిక్స్ ట్రాన్స్పోస్ (Transpose):**\nట్రాన్స్పోస్ అంటే అడ్డువరుసలను నిలువువరుసలుగా మార్చడం. అంటే Row ని Column కింద, Column ని Row కింద రాయడం అన్నమాట:\n$$\\text{Transpose}[col][row] = \\text{Original}[row][col]$$"
      },
      {
        "heading": "4. జాగెడ్ అరేస్ (Jagged / Ragged Arrays) అంటే ఏంటి?",
        "content": "జావాలో 2D అరే అనేది \"అరేల లోపల అరేలు\" కాబట్టి, **ప్రతి Row ఒకే సైజులో ఉండాల్సిన అవసరం లేదు**! ఇలా ఒక్కో అడ్డువరుస ఒక్కో సైజులో ఉంటే దాన్నే **Jagged Array** అంటారు.\n\n**ఎందుకు వాడతారు?**\nమెమరీ సేవ్ చేయడానికి! ఉదాహరణకి ఒక థియేటర్ లో మండే రోజు 2 టికెట్స్, ఫ్రైడే రోజు 10 టికెట్స్ అమ్ముడుపోయాయి అనుకోండి. అన్ని రోజులకీ 10 గదులు క్రియేట్ చేస్తే మెమరీ వేస్ట్ కదా. దానికి ఇది వాడతారు:\n\n```java\n// 1. ముందు Rows మాత్రమే ఇస్తాం, Columns సైజు ఖాళీగా వదిలేస్తాం:\nint[][] jagged = new int[3][];\n\n// 2. ఇప్పుడు ఒక్కో Row కి మనకిష్టమొచ్చిన సైజు ఇచ్చుకుంటాం:\njagged[0] = new int[2]; // ఫస్ట్ Row లో 2 గదులే ఉంటాయి\njagged[1] = new int[4]; // సెకండ్ Row లో 4 గదులు\njagged[2] = new int[1]; // థర్డ్ Row లో 1 గది మాత్రమే\n```\n\n```\n  మెమరీలో ఇలా ఉంటాయి:\n  jagged[0] -> [ 10, 20 ]\n  jagged[1] -> [ 30, 40, 50, 60 ]\n  jagged[2] -> [ 70 ]\n```"
      },
      {
        "heading": "5. 2D అరేస్ ని ప్రింట్ చేయడం (deepToString)",
        "content": "నార్మల్ 1D అరేస్ ని `Arrays.toString()` తో ప్రింట్ చేసాం. కానీ 2D అరేస్ కి ఇది వాడితే మళ్ళీ పిచ్చి అడ్రెస్ లు వస్తాయి.\n- **`Arrays.deepToString(matrix)`:** ఇది లోపల ఎన్ని అరేలున్నా సరే, అన్నింటి లోపలికి వెళ్లి పర్ఫెక్ట్ గా లిస్ట్ లాగా (ఉదా: `\"[[1, 2], [3, 4]]\"`) ప్రింట్ చేసి ఇస్తుంది.\n- **`Arrays.deepEquals(m1, m2)`:** రెండు 2D మ్యాట్రిక్స్ లు సేమ్ ఉన్నాయా లేదా అని లోపలికెళ్లి మరీ చెక్ చేస్తుంది."
      }
    ],
    "codeExample": "import java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. 2D మ్యాట్రిక్స్ క్రియేషన్ & ప్రింటింగ్ ===\");\n        int[][] matrixA = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n\n        int[][] matrixB = {\n            {9, 8, 7},\n            {6, 5, 4},\n            {3, 2, 1}\n        };\n\n        // డబుల్ ఫర్ లూప్ వాడి మ్యాట్రిక్స్ లాగా ప్రింట్ చేస్తున్నాం\n        System.out.println(\"Matrix A:\");\n        for (int r = 0; r < matrixA.length; r++) {\n            for (int c = 0; c < matrixA[r].length; c++) {\n                System.out.printf(\"%3d \", matrixA[r][c]); // %3d అంటే నీట్ గా గ్యాప్ ఇచ్చి రాస్తుంది\n            }\n            System.out.println(); // ఒక్కో అడ్డువరుస అయ్యాక కింద లైన్ కి వెళ్లాలి\n        }\n\n        System.out.println(\"\n=== 2. రెండు మ్యాట్రిక్స్ ని కలపడం (A + B) ===\");\n        int rows = matrixA.length;\n        int cols = matrixA[0].length;\n        int[][] sumMatrix = new int[rows][cols]; // రిజల్ట్ కోసం కొత్త అరే\n\n        for (int r = 0; r < rows; r++) {\n            for (int c = 0; c < cols; c++) {\n                sumMatrix[r][c] = matrixA[r][c] + matrixB[r][c]; // కరస్పాండింగ్ సెల్స్ ని కలిపాం\n            }\n        }\n\n        for (int[] row : sumMatrix) {\n            for (int val : row) {\n                System.out.printf(\"%3d \", val);\n            }\n            System.out.println();\n        }\n\n        System.out.println(\"\n=== 3. మ్యాట్రిక్స్ ట్రాన్స్పోస్ (Transpose) ===\");\n        int[][] transpose = new int[cols][rows]; // Rows, Cols రివర్స్ అయ్యాయి\n        for (int r = 0; r < rows; r++) {\n            for (int c = 0; c < cols; c++) {\n                transpose[c][r] = matrixA[r][c]; // r, c ని c, r కింద మార్చాం\n            }\n        }\n        System.out.println(\"Matrix A ని ట్రాన్స్పోస్ చేస్తే:\");\n        for (int[] row : transpose) {\n            System.out.println(Arrays.toString(row));\n        }\n\n        System.out.println(\"\n=== 4. జాగెడ్ అరే (Jagged Array) డెమో ===\");\n        int[][] jagged = new int[3][]; // 3 Rows, కాకపోతే Columns ఎన్నో చెప్పలేదు\n        jagged[0] = new int[]{10, 20};\n        jagged[1] = new int[]{30, 40, 50, 60};\n        jagged[2] = new int[]{70, 80, 90};\n\n        System.out.println(\"Jagged Array ఒకే లైన్లో (deepToString): \" + Arrays.deepToString(jagged));\n        \n        for (int r = 0; r < jagged.length; r++) {\n            System.out.print(\"Row \" + r + \" (సైజు \" + jagged[r].length + \"): \");\n            for (int c = 0; c < jagged[r].length; c++) {\n                System.out.print(jagged[r][c] + \" \");\n            }\n            System.out.println();\n        }\n    }\n}",
    "output": "=== 1. 2D మ్యాట్రిక్స్ క్రియేషన్ & ప్రింటింగ్ ===\nMatrix A:\n  1   2   3 \n  4   5   6 \n  7   8   9 \n\n=== 2. రెండు మ్యాట్రిక్స్ ని కలపడం (A + B) ===\n 10  10  10 \n 10  10  10 \n 10  10  10 \n\n=== 3. మ్యాట్రిక్స్ ట్రాన్స్పోస్ (Transpose) ===\nMatrix A ని ట్రాన్స్పోస్ చేస్తే:\n[1, 4, 7]\n[2, 5, 8]\n[3, 6, 9]\n\n=== 4. జాగెడ్ అరే (Jagged Array) డెమో ===\nJagged Array ఒకే లైన్లో (deepToString): [[10, 20], [30, 40, 50, 60], [70, 80, 90]]\nRow 0 (సైజు 2): 10 20 \nRow 1 (సైజు 4): 30 40 50 60 \nRow 2 (సైజు 3): 70 80 90",
    "lineByLine": [
      {
        "line": "int[][] matrixA = { {1,2,3}, {4,5,6}, {7,8,9} };",
        "explanation": "3x3 మ్యాట్రిక్స్ ని డైరెక్ట్ గా క్రియేట్ చేసాం. ఇవి ఇంటర్నల్ గా 3 వేరు వేరు 1D అరేలు."
      },
      {
        "line": "sumMatrix[r][c] = matrixA[r][c] + matrixB[r][c];",
        "explanation": "రెండు అరేల్లో ఉన్న సేమ్ అడ్రెస్ వాల్యూస్ ని కలిపి కొత్త మ్యాట్రిక్స్ లో సేమ్ ప్లేస్ లో పెట్టాం."
      },
      {
        "line": "transpose[c][r] = matrixA[r][c];",
        "explanation": "అడ్డువరుస (Row), నిలువు వరుసని (Column) మార్చేసి మ్యాట్రిక్స్ ని ఉల్టా తిప్పాం."
      },
      {
        "line": "int[][] jagged = new int[3][];",
        "explanation": "కేవలం అడ్డువరుసలు (Rows) మాత్రమే చెప్పి కాలమ్స్ ని ఖాళీ వదిలేసాం, దీనివల్ల ఒక్కో రో కి ఒక్కో సైజు ఇచ్చుకోవచ్చు."
      },
      {
        "line": "Arrays.deepToString(jagged);",
        "explanation": "2D లేదా 3D అరేస్ ని ఒకే లైన్ లో బ్రాకెట్స్ తో నీట్ గా ప్రింట్ చేయడానికి ఇది బెస్ట్ ఆప్షన్."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    public static void main(String[] args) {\n        // రియల్ టైమ్ సినారియో: సినిమా థియేటర్ సీటింగ్ సిస్టమ్\n        // 0 = సీట్ ఖాళీగా ఉంది, 1 = సీట్ బుక్ అయ్యింది\n        int[][] theaterSeats = {\n            {0, 1, 0, 0, 1},\n            {1, 1, 1, 0, 0},\n            {0, 0, 0, 0, 0},\n            {1, 1, 1, 1, 1} // ఈ రౌ లో అన్నీ బుక్ అయ్యాయి\n        };\n\n        int totalSeats = 0;\n        int bookedSeats = 0;\n\n        for (int r = 0; r < theaterSeats.length; r++) {\n            for (int c = 0; c < theaterSeats[r].length; c++) {\n                totalSeats++;\n                if (theaterSeats[r][c] == 1) bookedSeats++;\n            }\n        }\n\n        // ఆక్యూపెన్సీ పర్సంటేజ్ క్యాలిక్యులేట్ చేస్తున్నాం\n        double occupancyRate = ((double) bookedSeats / totalSeats) * 100;\n        System.out.println(\"=== సినిమా థియేటర్ ఆక్యూపెన్సీ రిపోర్ట్ ===\");\n        System.out.println(\"మొత్తం సీట్లు     : \" + totalSeats);\n        System.out.println(\"బుక్ అయినవి      : \" + bookedSeats);\n        System.out.println(\"ఖాళీగా ఉన్నవి     : \" + (totalSeats - bookedSeats));\n        System.out.printf(\"ఆక్యూపెన్సీ రేట్  : %.1f%%%n\", occupancyRate);\n    }\n}",
    "practicalOutput": "=== సినిమా థియేటర్ ఆక్యూపెన్సీ రిపోర్ట్ ===\nమొత్తం సీట్లు     : 20\nబుక్ అయినవి      : 10\nఖాళీగా ఉన్నవి     : 10\nఆక్యూపెన్సీ రేట్  : 50.0%",
    "commonMistakes": [
      "మాటిమాటికి `matrix[col][row]` అని రివర్స్ లో వాడటం. జావాలో ఎప్పుడైనా ముందు `row` ఆ తర్వాతే `col` రావాలి (`matrix[row][col]`). లేకపోతే ఎర్రర్స్ వస్తాయి.",
      "జాగెడ్ అరేస్ వాడేటప్పుడు అన్ని అడ్డువరుసలు ఒకే సైజు ఉంటాయని అనుకోవడం. అప్పుడు లూప్స్ లో `matrix[0].length` వాడితే క్రాష్ అవుతుంది.",
      "2D అరేస్ ని ప్రింట్ చేయడానికి `Arrays.toString(matrix)` వాడటం. ఇది కేవలం 1D అరేస్ కే పనిచేస్తుంది. 2D కి `Arrays.deepToString()` వాడాలి.",
      "`new int[3][]` అని క్రియేట్ చేసిన వెంటనే ఆ 3 గదులకి డైరెక్ట్ గా వాల్యూస్ యాడ్ చేద్దాం అనుకోవడం. ముందు ఆ గదుల్లో కొత్త అరేలు న్యూక్రియేట్ చేసిన తర్వాతే యాడ్ చేయాలి."
    ],
    "challenge": "// Coding Challenge:\n// ఒక 3x3 స్క్వేర్ మ్యాట్రిక్స్ లో ఇవి కనుక్కోవాలి:\n// 1. ప్రైమరీ డయాగనల్ (Primary diagonal) మొత్తం (టాప్-లెఫ్ట్ నుంచి బాటమ్-రైట్ కి ఉన్న నంబర్స్ కలపాలి).\n// 2. సెకండరీ డయాగనల్ (Secondary diagonal) మొత్తం (టాప్-రైట్ నుంచి బాటమ్-లెఫ్ట్ కి).\n\npublic class Challenge {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n        \n        int n = matrix.length;\n        int primarySum = 0;\n        int secondarySum = 0;\n        \n        for (int i = 0; i < n; i++) {\n            primarySum += matrix[i][i]; // [0][0], [1][1], [2][2]\n            secondarySum += matrix[i][n - 1 - i]; // [0][2], [1][1], [2][0]\n        }\n        \n        System.out.println(\"ప్రైమరీ డయాగనల్ మొత్తం   : \" + primarySum);   // 1 + 5 + 9 = 15\n        System.out.println(\"సెకండరీ డయాగనల్ మొత్తం : \" + secondarySum); // 3 + 5 + 7 = 15\n    }\n}",
    "faq": [
      {
        "q": "జావాలో 2D అరేస్ అన్నీ మెమరీలో ఒకే బ్లాక్ లాగా వరుసగా ఎందుకు ఉండవు?",
        "a": "ఎందుకంటే జావా 2D అరేస్ ని \"అరేల లోపల అరేలు\" గా డిజైన్ చేసింది. ఇలా చేయడం వల్ల ఒక్కో Row కి ఒక్కో సైజు ఇచ్చుకునే ఫెసిలిటీ (Jagged Arrays) వచ్చింది. ఇది మెమరీని చాలా సేవ్ చేస్తుంది."
      },
      {
        "q": "Arrays.toString() కి Arrays.deepToString() కి తేడా ఏంటి?",
        "a": "`Arrays.toString()` అనేది కేవలం సింగిల్ (1D) అరేస్ ని మాత్రమే ప్రింట్ చేస్తుంది. ఒకవేళ 2D ఇస్తే, అందులో ఉన్న సబ్-అరేల అడ్రెస్ లని ప్రింట్ చేస్తుంది తప్ప వాల్యూస్ ని కాదు. `deepToString()` అయితే ఎన్ని లోపల అరేలున్నా వాటి లోపలికెళ్లి మరీ వాల్యూస్ ని తీసుకొస్తుంది."
      },
      {
        "q": "3D అరేస్ లో కూడా జాగ్రడ్ డైమెన్షన్స్ పెట్టుకోవచ్చా?",
        "a": "కచ్చితంగా! జావాలో ఏ డైమెన్షన్ అరే అయినా సరే \"అరేల లోపల అరేలే\". కాబట్టి 3D, 4D దేంట్లో అయినా ఒక్కో డైమెన్షన్ కి వేరే వేరే సైజులు ఇచ్చుకోవచ్చు."
      }
    ],
    "recap": [
      "జావాలో 2D అరే అంటే మెమరీలో ఒకే బ్లాక్ కాదు, అదొక \"Array of Arrays\".",
      "వేరే వాల్యూస్ తీయాలంటే `matrix[row][col]` వాడతాం. Row సైజు కావాలంటే `matrix.length`.",
      "ఒక్కో అడ్డువరుస ఒక్కో సైజులో ఉండేలా క్రియేట్ చేయడాన్నే Jagged Arrays అంటారు. ఇది మెమరీ సేవ్ చేస్తుంది.",
      "2D మ్యాట్రిక్స్ ని బ్రాకెట్స్ లో నీట్ గా ప్రింట్ చేయడానికి `Arrays.deepToString()` వాడాలి.",
      "ట్రాన్స్పోస్ అంటే అడ్డువరుసలని నిలువు వరుసలుగా మార్చడం (`transpose[c][r] = orig[r][c]`)."
    ]
  },
  {
    "num": 32,
    "phaseId": "phase7",
    "phaseTitle": "Phase 7: Arrays & Matrices",
    "slug": "32-java-arrays-capstone-projects-and-limitations",
    "title": "Java Arrays Capstone Projects: 7 Production-Grade Systems & Limitations (తెలుగులో)",
    "badge": "32. Capstone Projects (7) & Limitations",
    "subtopics": "Array Limitations Analysis · Fixed Size Bottleneck · Homogeneity & Memory Fragmentation · Project 1: Largest & Smallest Element · Project 2: In-Place Reverse · Project 3: Duplicate Remover · Project 4: Sorted Array Merger · Project 5: Matrix Addition · Project 6: Search Engine · Project 7: Frequency Counter",
    "readTime": "30 min read",
    "intro": "అరేస్ మీద ఇప్పటిదాకా నేర్చుకున్నవన్నీ కలిపి 7 రియల్-వరల్డ్ సాఫ్ట్వేర్ అల్గారిథమ్స్ ని క్రియేట్ చేద్దాం. వీటితో పాటు జావాలో Arrays కు ఉన్న 4 పెద్ద మైనస్ పాయింట్స్ ఏంటి? వాటిని కవర్ చేయడానికి ఫ్యూచర్ లో మనం వాడబోయే `ArrayList` ఎలా ఉండబోతోందో తెలుసుకుందాం.",
    "theorySections": [
      {
        "heading": "1. జావాలో Arrays కు ఉన్న 4 పెద్ద లిమిటేషన్స్",
        "content": "అరేస్ చాలా ఫాస్ట్ గా ఉంటాయన్నది నిజమే అయినా, పెద్ద పెద్ద సాఫ్ట్వేర్ కంపెనీలు వీటిని ఎక్కువగా వాడవు. దానికి 4 ప్రధాన కారణాలు ఉన్నాయి:\n\n<div class=\"ref-table-wrap\">\n  <table class=\"ref-table\">\n    <thead>\n      <tr>\n        <th>ప్రాబ్లమ్</th>\n        <th>ఎక్స్ప్లనేషన్</th>\n        <th>సాఫ్ట్వేర్ లో దీని ఎఫెక్ట్ ఏంటి?</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><strong>1. ఫిక్స్డ్ సైజు (Fixed Capacity)</strong></td>\n        <td>ఒకసారి క్రియేట్ చేసాక సైజు పెంచడం, తగ్గించడం కుదరదు.</td>\n        <td>ఎప్పుడైనా డేటా ఎక్కువొస్తే ఆటోమాటిక్ గా పెరగవు. మనమే కొత్తది క్రియేట్ చేసి కాపీ చేయాలి (ఇది చాలా తలనొప్పి).</td>\n      </tr>\n      <tr>\n        <td><strong>2. ఒకటే డేటా టైప్ (Homogeneous)</strong></td>\n        <td>ఒక అరే లో అయితే అన్నీ నంబర్స్, లేదా అన్నీ స్ట్రింగ్స్ మాత్రమే ఉండాలి.</td>\n        <td>ఒకే దానిలో పేర్లు, వయసు, ఊరు అన్నీ కలిపి స్టోర్ చేయడానికి కుదరదు (దీనికి <code>Object[]</code> వాడాలి, కానీ అది రిస్క్).</td>\n      </tr>\n      <tr>\n        <td><strong>3. మెమరీ ఫ్రాగ్మెంటేషన్ (Memory Fragmentation)</strong></td>\n        <td>మెమరీ అంతా ఒకేచోట <strong>వరుసగా</strong> ఉంటేనే అరే క్రియేట్ అవుతుంది.</td>\n        <td>మీ ర్యామ్ లో 2GB ఖాళీ ఉన్నా సరే.. అది ముక్కలు ముక్కలుగా ఉంటే 1GB అరే కూడా క్రియేట్ అవ్వదు.</td>\n      </tr>\n      <tr>\n        <td><strong>4. రెడీమేడ్ మెథడ్స్ లేకపోవడం</strong></td>\n        <td>డేటా యాడ్ చేయడానికి <code>add()</code>, తీసేయడానికి <code>remove()</code> లాంటి మెథడ్స్ అస్సలు లేవు.</td>\n        <td>ప్రతి చిన్నదానికి మనమే లూప్స్ రాసుకుని మ్యాన్యువల్ గా జరుపుకుంటూ కూర్చోవాలి.</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n*నోట్: ఈ ప్రాబ్లమ్స్ అన్నీ సాల్వ్ చేయడానికి జావా వాళ్ళు **Collections Framework (`ArrayList`, `HashSet`, `HashMap`)** అనే మ్యాజిక్ ని తీసుకొచ్చారు. అది మనం Phase 15 లో డీటెయిల్డ్ గా నేర్చుకుంటాం!*"
      },
      {
        "heading": "2. 7 క్యాప్-స్టోన్ ప్రాజెక్ట్స్ ఓవర్వ్యూ",
        "content": "ఇంటర్వ్యూస్ లో ఎక్కువగా అడిగే ఈ 7 బెస్ట్ ప్రాజెక్ట్స్ ని ఈ చాప్టర్ లో కవర్ చేస్తున్నాం:\n\n1. **ప్రాజెక్ట్ 1: అతిపెద్ద, అతిచిన్న నంబర్స్ ఎక్కడున్నాయి?** (Largest & Smallest Finder)\n2. **ప్రాజెక్ట్ 2: అరే ని ఉల్టా తిప్పడం** (In-Place Reverse - కొత్త అరే వాడకుండా)\n3. **ప్రాజెక్ట్ 3: డూప్లికేట్స్ తీసేయడం** (Duplicate Remover - O(N) స్పీడ్ లో)\n4. **ప్రాజెక్ట్ 4: రెండు సార్ట్ చేసిన అరేస్ ని కలపడం** (Sorted Array Merger - ఇది Merge Sort కి పునాది)\n5. **ప్రాజెక్ట్ 5: 2D మ్యాట్రిక్స్ ఎడిషన్** (Matrix Addition Engine)\n6. **ప్రాజెక్ట్ 6: యూనివర్సల్ సెర్చ్ ఇంజిన్** (Linear & Binary Search ని కంపేర్ చేయడం)\n7. **ప్రాజెక్ట్ 7: ఏ నంబర్ ఎన్ని సార్లు వచ్చింది?** (Element Frequency Counter)"
      }
    ],
    "codeExample": "import java.util.Arrays;\n\npublic class Main {\n    // -------------------------------------------------------------\n    // ప్రాజెక్ట్ 1: పెద్ద, చిన్న నంబర్స్ ని వాటి ఇండెక్స్ తో సహా కనుక్కోవడం\n    // -------------------------------------------------------------\n    public static void findExtremes(int[] arr) {\n        int minVal = arr[0], maxVal = arr[0];\n        int minIdx = 0, maxIdx = 0;\n\n        for (int i = 1; i < arr.length; i++) {\n            if (arr[i] < minVal) {\n                minVal = arr[i];\n                minIdx = i;\n            }\n            if (arr[i] > maxVal) {\n                maxVal = arr[i];\n                maxIdx = i;\n            }\n        }\n        System.out.printf(\"  పెద్ద నంబర్ : %d (ఇండెక్స్ %d దగ్గర)%n\", maxVal, maxIdx);\n        System.out.printf(\"  చిన్న నంబర్ : %d (ఇండెక్స్ %d దగ్గర)%n\", minVal, minIdx);\n    }\n\n    // -------------------------------------------------------------\n    // ప్రాజెక్ట్ 2: ఇన్-ప్లేస్ అరే రివర్స్ (కొత్త మెమరీ వాడకుండా)\n    // -------------------------------------------------------------\n    public static void reverseInPlace(int[] arr) {\n        int left = 0, right = arr.length - 1;\n        while (left < right) {\n            int temp = arr[left];\n            arr[left] = arr[right];\n            arr[right] = temp;\n            left++;\n            right--;\n        }\n    }\n\n    // -------------------------------------------------------------\n    // ప్రాజెక్ట్ 3: డూప్లికేట్స్ తీసేయడం (సార్ట్ చేసిన అరే లోంచి)\n    // -------------------------------------------------------------\n    public static int removeDuplicates(int[] arr) {\n        if (arr.length == 0) return 0;\n        int writeIdx = 0;\n        for (int readIdx = 1; readIdx < arr.length; readIdx++) {\n            if (arr[readIdx] != arr[writeIdx]) {\n                writeIdx++;\n                arr[writeIdx] = arr[readIdx];\n            }\n        }\n        return writeIdx + 1; // యూనిక్ నంబర్స్ కౌంట్\n    }\n\n    // -------------------------------------------------------------\n    // ప్రాజెక్ట్ 4: రెండు సార్ట్ చేసిన అరేస్ ని ఒకే ఆర్డర్ లో కలపడం\n    // -------------------------------------------------------------\n    public static int[] mergeSortedArrays(int[] arr1, int[] arr2) {\n        int[] merged = new int[arr1.length + arr2.length];\n        int i = 0, j = 0, k = 0;\n\n        while (i < arr1.length && j < arr2.length) {\n            if (arr1[i] <= arr2[j]) {\n                merged[k++] = arr1[i++];\n            } else {\n                merged[k++] = arr2[j++];\n            }\n        }\n        // మిగిలిపోయినవి డైరెక్ట్ గా యాడ్ చేస్తున్నాం\n        while (i < arr1.length) merged[k++] = arr1[i++];\n        while (j < arr2.length) merged[k++] = arr2[j++];\n\n        return merged;\n    }\n\n    // -------------------------------------------------------------\n    // ప్రాజెక్ట్ 5: 2D మ్యాట్రిక్స్ ని కలపడం\n    // -------------------------------------------------------------\n    public static int[][] addMatrices(int[][] a, int[][] b) {\n        int rows = a.length, cols = a[0].length;\n        int[][] res = new int[rows][cols];\n        for (int r = 0; r < rows; r++) {\n            for (int c = 0; c < cols; c++) {\n                res[r][c] = a[r][c] + b[r][c];\n            }\n        }\n        return res;\n    }\n\n    // -------------------------------------------------------------\n    // ప్రాజెక్ట్ 6: యూనివర్సల్ సెర్చ్ ఇంజిన్ (టైమ్ టెస్ట్)\n    // -------------------------------------------------------------\n    public static void searchElement(int[] arr, int target) {\n        int linearSteps = 0;\n        int foundLinear = -1;\n        // లీనియర్ సెర్చ్\n        for (int i = 0; i < arr.length; i++) {\n            linearSteps++;\n            if (arr[i] == target) {\n                foundLinear = i;\n                break;\n            }\n        }\n\n        // బైనరీ సెర్చ్\n        int[] sorted = arr.clone();\n        Arrays.sort(sorted);\n        int binSteps = 0;\n        int left = 0, right = sorted.length - 1;\n        int foundBin = -1;\n\n        while (left <= right) {\n            binSteps++;\n            int mid = left + (right - left) / 2;\n            if (sorted[mid] == target) {\n                foundBin = mid;\n                break;\n            } else if (sorted[mid] < target) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n\n        System.out.printf(\"  లీనియర్ సెర్చ్: ఇండెక్స్ %d లో దొరికింది (%d సార్లు వెతికింది)%n\", foundLinear, linearSteps);\n        System.out.printf(\"  బైనరీ సెర్చ్ : ఇండెక్స్ %d లో దొరికింది (%d సార్లు వెతికింది)%n\", foundBin, binSteps);\n    }\n\n    // -------------------------------------------------------------\n    // ప్రాజెక్ట్ 7: ఏ నంబర్ ఎన్ని సార్లు రిపీట్ అయ్యింది?\n    // -------------------------------------------------------------\n    public static void printFrequencies(int[] arr) {\n        int[] sorted = arr.clone();\n        Arrays.sort(sorted); // ముందు సార్ట్ చేస్తే ఒకే నంబర్స్ పక్కపక్కన వస్తాయి\n\n        int i = 0;\n        while (i < sorted.length) {\n            int count = 1;\n            // పక్కన ఉన్నది కూడా సేమ్ నంబర్ అయితే కౌంట్ పెంచుతాం\n            while (i + 1 < sorted.length && sorted[i] == sorted[i + 1]) {\n                count++;\n                i++;\n            }\n            System.out.printf(\"  నంబర్ %-3d : %d సార్లు%n\", sorted[i], count);\n            i++;\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== ప్రాజెక్ట్ 1: పెద్ద, చిన్న నంబర్స్ ===\");\n        int[] data = {45, 12, 89, 99, 23, 7, 65};\n        findExtremes(data);\n\n        System.out.println(\"\n=== ప్రాజెక్ట్ 2: ఇన్-ప్లేస్ రివర్స్ ===\");\n        int[] revArr = {1, 2, 3, 4, 5};\n        System.out.println(\"ముందు: \" + Arrays.toString(revArr));\n        reverseInPlace(revArr);\n        System.out.println(\"తర్వాత: \" + Arrays.toString(revArr));\n\n        System.out.println(\"\n=== ప్రాజెక్ట్ 3: డూప్లికేట్స్ తీసేయడం ===\");\n        int[] dupes = {10, 10, 20, 30, 30, 30, 40, 50, 50};\n        int uniqueCount = removeDuplicates(dupes);\n        System.out.print(\"యూనిక్ నంబర్స్: \");\n        for (int i = 0; i < uniqueCount; i++) System.out.print(dupes[i] + \" \");\n        System.out.println();\n\n        System.out.println(\"\n=== ప్రాజెక్ట్ 4: రెండు సార్టెడ్ అరేస్ ని కలపడం ===\");\n        int[] arr1 = {1, 3, 5, 7};\n        int[] arr2 = {2, 4, 6, 8, 10};\n        int[] merged = mergeSortedArrays(arr1, arr2);\n        System.out.println(\"కలిపిన అరే: \" + Arrays.toString(merged));\n\n        System.out.println(\"\n=== ప్రాజెక్ట్ 5: మ్యాట్రిక్స్ ఎడిషన్ ===\");\n        int[][] mat1 = {{1, 2}, {3, 4}};\n        int[][] mat2 = {{5, 6}, {7, 8}};\n        int[][] sumMat = addMatrices(mat1, mat2);\n        System.out.println(\"మ్యాట్రిక్స్ మొత్తం: \" + Arrays.deepToString(sumMat));\n\n        System.out.println(\"\n=== ప్రాజెక్ట్ 6: సెర్చ్ ఇంజిన్ టైమ్ టెస్ట్ ===\");\n        int[] searchDataset = {18, 92, 45, 77, 85, 99, 63, 10, 55};\n        searchElement(searchDataset, 85);\n\n        System.out.println(\"\n=== ప్రాజెక్ట్ 7: ఫ్రీక్వెన్సీ కౌంటర్ ===\");\n        int[] freqData = {4, 5, 4, 2, 5, 4, 8, 2, 9};\n        printFrequencies(freqData);\n    }\n}",
    "output": "=== ప్రాజెక్ట్ 1: పెద్ద, చిన్న నంబర్స్ ===\n  పెద్ద నంబర్ : 99 (ఇండెక్స్ 3 దగ్గర)\n  చిన్న నంబర్ : 7 (ఇండెక్స్ 5 దగ్గర)\n\n=== ప్రాజెక్ట్ 2: ఇన్-ప్లేస్ రివర్స్ ===\nముందు: [1, 2, 3, 4, 5]\nతర్వాత: [5, 4, 3, 2, 1]\n\n=== ప్రాజెక్ట్ 3: డూప్లికేట్స్ తీసేయడం ===\nయూనిక్ నంబర్స్: 10 20 30 40 50 \n\n=== ప్రాజెక్ట్ 4: రెండు సార్టెడ్ అరేస్ ని కలపడం ===\nకలిపిన అరే: [1, 2, 3, 4, 5, 6, 7, 8, 10]\n\n=== ప్రాజెక్ట్ 5: మ్యాట్రిక్స్ ఎడిషన్ ===\nమ్యాట్రిక్స్ మొత్తం: [[6, 8], [10, 12]]\n\n=== ప్రాజెక్ట్ 6: సెర్చ్ ఇంజిన్ టైమ్ టెస్ట్ ===\n  లీనియర్ సెర్చ్: ఇండెక్స్ 4 లో దొరికింది (5 సార్లు వెతికింది)\n  బైనరీ సెర్చ్ : ఇండెక్స్ 6 లో దొరికింది (3 సార్లు వెతికింది)\n\n=== ప్రాజెక్ట్ 7: ఫ్రీక్వెన్సీ కౌంటర్ ===\n  నంబర్ 2   : 2 సార్లు\n  నంబర్ 4   : 3 సార్లు\n  నంబర్ 5   : 2 సార్లు\n  నంబర్ 8   : 1 సార్లు\n  నంబర్ 9   : 1 సార్లు",
    "lineByLine": [
      {
        "line": "findExtremes(data);",
        "explanation": "ఒకేసారి అరేని స్కాన్ చేసి అతిపెద్ద, చిన్న నంబర్స్ తో పాటు అవి ఏ ఇండెక్స్ లో ఉన్నాయో కూడా పర్ఫెక్ట్ గా కనుక్కుంటుంది."
      },
      {
        "line": "removeDuplicates(dupes);",
        "explanation": "రీడ్, రైట్ అనే రెండు పాయింటర్స్ ని వాడి, డూప్లికేట్స్ ఉన్న ప్లేస్ లో యూనిక్ నంబర్స్ ని ఎక్కించి సైజు తగ్గిస్తుంది."
      },
      {
        "line": "mergeSortedArrays(arr1, arr2);",
        "explanation": "ఇదే Merge Sort అల్గారిథమ్ కి పునాది. రెండు సార్ట్ అయిన అరేస్ ని మళ్ళీ సార్ట్ చేయకుండానే (O(N+M) స్పీడ్ లో) ఆర్డర్ లో కలుపుతుంది."
      },
      {
        "line": "addMatrices(mat1, mat2);",
        "explanation": "రెండు 2D మ్యాట్రిక్స్ లో కరస్పాండింగ్ సెల్స్ ని కలిపి కొత్త మ్యాట్రిక్స్ ని రిటర్న్ చేస్తుంది."
      },
      {
        "line": "printFrequencies(freqData);",
        "explanation": "ముందు డేటాని సార్ట్ చేసి, పక్కపక్కన ఉన్న ఒకే నంబర్స్ ని కౌంట్ చేస్తూ ఫ్రీక్వెన్సీ ఇస్తుంది."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    public static void main(String[] args) {\n        // రియల్ టైమ్ సినారియో: గ్లోబల్ స్టాక్ మార్కెట్ ప్రైస్ లిస్ట్ కన్సాలిడేషన్\n        // రెండు వేరు వేరు స్టాక్ ఎక్స్ఛేంజ్ ల నుంచి ఆర్డర్ లో వస్తున్న ప్రైస్ లిస్ట్\n        int[] nysePrices = {150, 152, 155, 160};\n        int[] nasdaqPrices = {149, 152, 158, 162};\n\n        // రెండిటినీ ఒకటే లిస్ట్ లోకి (O(N) స్పీడ్ తో) కలపడం\n        int[] consolidatedBook = Main.mergeSortedArrays(nysePrices, nasdaqPrices);\n        System.out.println(\"=== గ్లోబల్ ఆర్డర్ బుక్ ===\");\n        System.out.println(\"కలిపిన ఫైనల్ ప్రైస్ లిస్ట్: \" + Arrays.toString(consolidatedBook));\n    }\n}",
    "practicalOutput": "=== గ్లోబల్ ఆర్డర్ బుక్ ===\nకలిపిన ఫైనల్ ప్రైస్ లిస్ట్: [149, 150, 152, 152, 155, 158, 160, 162]",
    "commonMistakes": [
      "చిన్న రివర్స్ లాజిక్ కోసం కూడా కొత్త అరే ని క్రియేట్ చేసి మెమరీ ఫుల్ చేయడం. In-Place పద్ధతులు వాడాలి.",
      "రెండు సార్ట్ అయిన అరేస్ ని కలపడానికి.. రెండిటినీ ఒకదాంట్లో పడేసి మళ్ళీ `Arrays.sort()` వాడటం. దానివల్ల టైమ్ వేస్ట్, డైరెక్ట్ గా టూ-పాయింటర్ మెర్జ్ వాడాలి.",
      "రెండు మ్యాట్రిక్స్ ని కలిపేటప్పుడు వాటి సైజులు ఒకటే ఉన్నాయో లేదో చెక్ చేయకపోవడం. ఒకదానికి సైజు తక్కువ ఉంటే వెంటనే క్రాష్ అవుతుంది.",
      "ఫ్రీక్వెన్సీ కనుక్కునేటప్పుడు డేటాని సార్ట్ చేయకుండా ప్రతి నంబర్ కోసం మళ్ళీ మళ్ళీ లూప్స్ వేయడం (ఇది చాలా స్లో పద్ధతి)."
    ],
    "challenge": "// Coding Challenge:\n// ఒక అరే ని తీసుకుని అందులో ఉన్న నంబర్స్ ని లెఫ్ట్ సైడ్ కి k అడుగులు జరపాలి (Rotate Array Left).\n// ఉదాహరణ: arr = [1, 2, 3, 4, 5], k = 2 ===> రిజల్ట్ = [3, 4, 5, 1, 2]\n\npublic class Challenge {\n    public static void rotateArrayLeft(int[] arr, int k) {\n        int n = arr.length;\n        k = k % n; // k ఒకవేళ సైజు కన్నా పెద్దది ఉంటే సెట్ చేయడానికి\n        \n        // ట్రిక్: 3 సార్లు రివర్స్ చేస్తే మొత్తం రొటేట్ అయిపోతుంది!\n        // 1. ముందు k ఎలిమెంట్స్ ని రివర్స్ చేయడం\n        reverse(arr, 0, k - 1);\n        // 2. మిగిలిన వాటిని రివర్స్ చేయడం\n        reverse(arr, k, n - 1);\n        // 3. ఇప్పుడు మొత్తాన్ని రివర్స్ చేయడం\n        reverse(arr, 0, n - 1);\n    }\n    \n    private static void reverse(int[] arr, int start, int end) {\n        while (start < end) {\n            int temp = arr[start];\n            arr[start] = arr[end];\n            arr[end] = temp;\n            start++;\n            end--;\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4, 5};\n        rotateArrayLeft(nums, 2);\n        System.out.println(\"2 స్టెప్స్ లెఫ్ట్ కి రొటేట్ అయితే: \" + Arrays.toString(nums));\n    }\n}",
    "faq": [
      {
        "q": "సాఫ్ట్వేర్ కంపెనీల్లో నార్మల్ Arrays వాడకుండా ArrayList ఎందుకు వాడతారు?",
        "a": "`ArrayList` లో సైజు ఫిక్స్డ్ గా ఉండదు, మనం డేటా యాడ్ చేసే కొద్దీ ఆటోమాటిక్ గా పెరుగుతుంది. దాంట్లో రెడీమేడ్ గా `add`, `remove`, `contains` లాంటి మెథడ్స్ ఉంటాయి కాబట్టి మనకు పని ఈజీ అవుతుంది."
      },
      {
        "q": "అలాంటప్పుడు అసలు నార్మల్ Arrays ని జావాలో ఇంకా ఎందుకు ఉంచారు?",
        "a": "స్పీడ్ కోసం! `ArrayList` చాలా ఫీచర్స్ ఇస్తుంది కానీ, ఇంటర్నల్ గా కాస్త స్లో అవుతుంది. గ్రాఫిక్స్, గేమింగ్, ఫైనాన్షియల్ సిస్టమ్స్ లాంటి సూపర్ ఫాస్ట్ పనులకి, ఇంటిజర్స్ (`int[]`) వాడటానికి నార్మల్ అరేస్ మాత్రమే కరెక్ట్ చాయిస్."
      },
      {
        "q": "రెండు అరేస్ ని కలిపే టూ-పాయింటర్ మెర్జ్ ఎంత ఫాస్ట్ గా ఉంటుంది?",
        "a": "రెండూ ముందే ఆర్డర్ లో ఉన్నాయి కాబట్టి, ఇది జస్ట్ ఫస్ట్ నంబర్స్ ని చూసి చిన్నదాన్ని తీసుకుంటూ వెళ్తుంది. కాబట్టి ఎక్కడా లూప్ లోపల లూప్ పడదు. ఇది $O(N+M)$ టైమ్ లోనే క్షణాల్లో పని పూర్తి చేస్తుంది."
      }
    ],
    "recap": [
      "అరేస్ చాలా ఫాస్ట్ కానీ.. వాటి సైజు పెంచలేం, మెమరీ ఒకేచోట ఉండాలి, రెడీమేడ్ మెథడ్స్ ఉండవు.",
      "టూ-పాయింటర్ అల్గారిథమ్స్ వాడి అరేస్ ని ఇన్-ప్లేస్ లో రివర్స్ చేయొచ్చు, మెమరీ సేవ్ చేయొచ్చు.",
      "డూప్లికేట్స్ తీసేయడానికి కూడా మనం టూ-పాయింటర్ టెక్నిక్ వాడొచ్చు.",
      "రెండు సార్ట్ అయిన అరేస్ ని కలపడానికి Merge అల్గారిథమ్ ద బెస్ట్ ఆప్షన్.",
      "ఈ అరేస్ కున్న లిమిటేషన్స్ పోగొట్టడానికే జావాలో Collections (ArrayList) అనే ఫీచర్ వచ్చింది."
    ]
  }
];
