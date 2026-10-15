module.exports = [
  {
    "num": 23,
    "phaseId": "phase6",
    "phaseTitle": "Phase 6: Strings & Text Processing",
    "slug": "23-java-string-fundamentals-and-memory-architecture",
    "title": "Java String Fundamentals & String Constant Pool (SCP) (తెలుగులో)",
    "badge": "23. String Fundamentals & SCP",
    "subtopics": "What is a String? · java.lang.String · String Literals vs new String() · String Constant Pool (SCP) · String Interning (intern()) · String Immutability Deep Dive · Compact Strings (byte[] in Java 9+) · Indexing & charAt()",
    "readTime": "22 min read",
    "intro": "జావాలో Strings అంటే ఏంటి? `String` క్లాస్ వెనుక ఉన్న అసలు సీక్రెట్ ఏంటి? స్ట్రింగ్స్ ని నార్మల్ గా క్రియేట్ చేయడానికి, `new` వాడి క్రియేట్ చేయడానికి తేడా ఏంటి? **String Constant Pool (SCP)** ఎలా పనిచేస్తుంది? స్ట్రింగ్స్ ని ఎందుకు మార్చలేం (Immutable)? లాంటి అడ్వాన్స్డ్ కాన్సెప్ట్స్ ని ఈ చాప్టర్ లో డీటెయిల్డ్ గా నేర్చుకుందాం.",
    "theorySections": [
      {
        "heading": "1. జావాలో String అంటే ఏంటి?",
        "content": "సాధారణంగా నంబర్స్ ని స్టోర్ చేయడానికి `int`, `double` వాడతాం, అవి డైరెక్ట్ గా స్టాక్ మెమరీలో సేవ్ అవుతాయి (వాటినే Primitive Data Types అంటారు).\nకానీ టెక్స్ట్ ని స్టోర్ చేయడానికి వాడే **`String`** అనేది మామూలు డేటా టైప్ కాదు. జావాలో అదొక **Reference Type (Object)**. ఇంటర్నల్ గా ఇది `java.lang.String` అనే క్లాస్!\n\n`String` అనేది అక్షరాల కలయిక (sequence of characters). దీన్ని క్రియేట్ చేశాక మార్చలేం (Immutable).\n\n```\n  Primitive Type:\n  [ int age = 21 ]  ===> స్టాక్ మెమరీలో డైరెక్ట్ గా వాల్యూ ఉంటుంది: 21\n\n  Reference Type:\n  [ String name = \"Ravi\" ] ===> స్టాక్ లో కేవలం అడ్రెస్ (Reference) మాత్రమే ఉంటుంది: 0x4F12\n                                     |\n                                     v\n                                Heap / SCP మెమరీలో డేటా ఉంటుంది: ['R', 'a', 'v', 'i']\n```\n\nప్రతి సాఫ్ట్వేర్ లో పాస్వర్డ్స్, డేటాబేస్ క్వెరీలు, యూజర్ నేమ్స్.. అన్నీ స్ట్రింగ్స్ లోనే ఉంటాయి. కాబట్టి జావా దీన్ని చాలా స్పెషల్ గా ట్రీట్ చేసి, `new` కీవర్డ్ వాడకుండానే డబుల్ కొటేషన్స్ `\" \"` తో డైరెక్ట్ గా క్రియేట్ చేసే ఫెసిలిటీ ఇచ్చింది."
      },
      {
        "heading": "2. Strings ని క్రియేట్ చేయడం: Literal vs new String()",
        "content": "జావాలో స్ట్రింగ్స్ ని రెండు రకాలుగా క్రియేట్ చేయొచ్చు:\n\n1. **String Literal (డైరెక్ట్ గా ఇవ్వడం):**\n```java\nString s1 = \"Java\";\nString s2 = \"Java\";\n```\nఇలా డైరెక్ట్ గా రాసినప్పుడు.. జావా వెంటనే మెమరీలో ఉన్న **String Constant Pool (SCP)** అనే స్పెషల్ ఏరియాలో చెక్ చేస్తుంది:\n- ఒకవేళ అక్కడ ముందే `\"Java\"` ఉంటే, మళ్ళీ కొత్తగా క్రియేట్ చేయకుండా పాత దాని అడ్రెస్ నే `s2` కి కూడా ఇస్తుంది.\n- కాబట్టి ఇక్కడ `s1` మరియు `s2` రెండూ ఒకే మెమరీ అడ్రెస్ ని పాయింట్ చేస్తుంటాయి (`s1 == s2` చెక్ చేస్తే `true` వస్తుంది).\n\n2. **`new` కీవర్డ్ వాడితే:**\n```java\nString s3 = new String(\"Java\");\n```\nమీరు `new` వాడినప్పుడు జావా మీ మాట విని.. SCP లో ముందే ఉన్నా సరే, దాన్ని పట్టించుకోకుండా జనరల్ **Heap మెమరీలో కొత్తగా ఇంకో ఆబ్జెక్ట్ ని క్రియేట్ చేస్తుంది**.\n- అందుకే `s1 == s3` చెక్ చేస్తే `false` వస్తుంది! ఎందుకంటే రెండిటి అడ్రెస్ లు వేరు.\n\n```\n                    HEAP MEMORY\n +-------------------------------------------------------+\n |                                                       |\n |   General Heap Objects:                               |\n |   +------------------------+                          |\n |   | String Object (s3)     | (Address: 0x7B20)        |\n |   | Value: \"Java\"          |                          |\n |   +------------------------+                          |\n |                                                       |\n |   +-----------------------------------------------+   |\n |   | STRING CONSTANT POOL (SCP)                    |   |\n |   |                                               |   |\n |   |   +-----------------------+                   |   |\n |   |   | \"Java\" (s1, s2)       | (Address: 0x1A05) |   |\n |   |   +-----------------------+                   |   |\n |   |                                               |   |\n |   +-----------------------------------------------+   |\n +-------------------------------------------------------+\n```"
      },
      {
        "heading": "3. String Interning: `intern()` మెథడ్ ఎందుకు వాడాలి?",
        "content": "మీరు `new String()` వాడి మెమరీ వేస్ట్ చేసి ఒక ఆబ్జెక్ట్ క్రియేట్ చేశారనుకోండి. దాన్ని మళ్ళీ SCP లో ఉన్న సేమ్ వాల్యూ కి పాయింట్ చేయాలి అంటే **`intern()`** వాడొచ్చు:\n\n```java\nString heapStr = new String(\"Java\");\nString poolStr = heapStr.intern(); // ఇది SCP లో ఉన్న \"Java\" అడ్రెస్ ని తెచ్చి ఇస్తుంది\n\nSystem.out.println(heapStr == \"Java\"); // false (ఒకటి Heap, ఇంకోటి SCP)\nSystem.out.println(poolStr == \"Java\"); // true  (రెండు SCP లోవే)\n```\n\n**రియల్ టైమ్ లో ఎందుకు వాడతారు?**\nఒక కోటి మంది డేటాలో 30 లక్షల మందికి స్టేట్ \"TELANGANA\" అని ఉందనుకోండి. ప్రతివాడికి వేరే వేరే స్ట్రింగ్ క్రియేట్ చేస్తే మెమరీ ఫుల్ అయిపోతుంది. అదే `intern()` వాడితే ఆ 30 లక్షల మంది ఒకే SCP ఆబ్జెక్ట్ ని పాయింట్ చేస్తారు. దీనివల్ల ర్యామ్ (RAM) చాలా సేవ్ అవుతుంది!"
      },
      {
        "heading": "4. Strings ని ఎందుకు మార్చలేము? (Immutability - 4 కారణాలు)",
        "content": "జావాలో ఒకసారి స్ట్రింగ్ ఆబ్జెక్ట్ క్రియేట్ అయ్యాక, దాన్ని **ఎవరూ, ఎప్పటికీ మార్చలేరు**. మీరు `toUpperCase()` గానీ, `concat()` గానీ వాడినా.. అది పాత దాన్ని మార్చదు, కొత్త స్ట్రింగ్ ని క్రియేట్ చేసి ఇస్తుంది!\n\n```java\nString str = \"Hello\";\nstr.concat(\" World\"); // పాత str కి ఏమీ అవ్వదు!\nSystem.out.println(str); // ఇంకా \"Hello\" అనే ఉంటుంది\n\nstr = str.concat(\" World\"); // ఇక్కడ కొత్తగా వచ్చిన దాన్ని మళ్ళీ str కి సేవ్ చేశాం\nSystem.out.println(str); // అప్పుడు \"Hello World\" వస్తుంది\n```\n\n**జావా దీన్ని ఎందుకు ఇలా డిజైన్ చేసింది?**\n1. **SCP షేరింగ్:** వందల వేరియబుల్స్ ఒకే SCP ఆబ్జెక్ట్ ని వాడుతుంటాయి. ఒకవేళ స్ట్రింగ్ ని మార్చే ఆప్షన్ ఇస్తే, ఒకడు మారిస్తే ఆ ఎఫెక్ట్ అందరి మీద పడుతుంది!\n2. **సెక్యూరిటీ:** పాస్వర్డ్స్, ఫైల్ పాత్స్ అన్నీ స్ట్రింగ్స్ లోనే ఉంటాయి. యాప్ రన్ అవుతున్నప్పుడు వాటిని హ్యాకర్స్ ఈజీగా మార్చేయకుండా ఉండటానికి ఇదొక సేఫ్టీ ఫీచర్.\n3. **Thread Safety:** స్ట్రింగ్ ని ఎలాగూ ఎవరూ మార్చలేరు కాబట్టి, మల్టీ-త్రెడింగ్ యాప్స్ లో లాక్స్ వేయాల్సిన పనేలేదు, ఎవరైనా ఎప్పుడైనా వాడుకోవచ్చు.\n4. **HashCode క్యాషింగ్:** స్ట్రింగ్ ఎప్పటికీ మారదు కాబట్టి, జావా దాని <code>hashCode</code> ని ఒక్కసారి క్యాలిక్యులేట్ చేసి సేవ్ చేసుకుంటుంది. అందుకే `HashMap` లో కీస్ గా Strings వాడితే యాప్ సూపర్ ఫాస్ట్ గా పనిచేస్తుంది."
      },
      {
        "heading": "5. కాంపాక్ట్ స్ట్రింగ్స్ (Java 9 తర్వాత వచ్చిన మ్యాజిక్)",
        "content": "పాత జావాలో (Java 8 వరకు) స్ట్రింగ్స్ ని `char[]` వాడి స్టోర్ చేసేవాళ్లు. ఒక్కో క్యారెక్టర్ కి 2 బైట్స్ (16 bits) మెమరీ తీసుకునేది. కానీ మనం రాసే కోడ్ లో 99% ఇంగ్లీష్ అక్షరాలే ఉంటాయి. వాటికి 1 బైట్ చాలు, మిగతా 1 బైట్ ఎప్పుడూ వేస్ట్ అవుతూనే ఉండేది.\n\nఅందుకే **Java 9** లో **Compact Strings (JEP 254)** అనే ఫీచర్ తెచ్చారు:\n```java\n// Java 9+ లో స్ట్రింగ్ ఇంటర్నల్ కోడ్ ఇలా ఉంటుంది:\nprivate final byte[] value;\nprivate final byte coder; // 0 అంటే ఇంగ్లీష్ (1 byte/char), 1 అంటే వేరే భాష (2 bytes/char)\n```\n- మొత్తం ఇంగ్లీష్/నార్మల్ సింబల్స్ ఉంటే.. జావా ఒక్కో అక్షరానికి **1 బైట్** మాత్రమే తీసుకుంటుంది.\n- అందులో ఒక్క తెలుగు అక్షరం గానీ, ఎమోజీ గానీ ఉన్నా.. అప్పుడు ఆటోమాటిక్ గా **2 బైట్స్ (UTF-16)** కి మారుతుంది.\nదీనివల్ల మనం కోడ్ లో ఎలాంటి మార్పు చేయకపోయినా.. పెద్ద పెద్ద కంపెనీల యాప్స్ లో 15% నుంచి 30% వరకు మెమరీ సేవ్ అయ్యింది!"
      },
      {
        "heading": "6. Indexing: అక్షరాలని ఎలా లాగాలి? (length & charAt)",
        "content": "జావాలో స్ట్రింగ్స్ అన్నీ **0-based indexing** తో పనిచేస్తాయి. అంటే మొదటి అక్షరం 0 దగ్గర ఉంటుంది, లాస్ట్ అక్షరం `length() - 1` దగ్గర ఉంటుంది.\n\n```\n స్ట్రింగ్:   \"J   a   v   a\"\n ఇండెక్స్:     0   1   2   3   (మొత్తం కౌంట్: 4)\n```\n\n- **`length()`:** ఆ స్ట్రింగ్ లో ఎన్ని అక్షరాలున్నాయో చెప్తుంది. (అరేస్ లో అయితే `length` అని బ్రాకెట్స్ లేకుండా రాస్తాం, కానీ ఇక్కడ `length()` అని కచ్చితంగా బ్రాకెట్స్ ఉండాలి).\n- **`charAt(int index)`:** మీకు కావాల్సిన ఇండెక్స్ దగ్గర ఏ అక్షరం ఉందో ఇస్తుంది.\n- **చెక్ చేసుకోండి:** మీరు స్ట్రింగ్ సైజు కంటే పెద్ద నంబర్ ఇస్తే, జావా వెంటనే క్రాష్ అయ్యి **`StringIndexOutOfBoundsException`** ఇస్తుంది."
      }
    ],
    "codeExample": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. String Literals vs new String() ===\");\n        String s1 = \"Java\";\n        String s2 = \"Java\";\n        String s3 = new String(\"Java\");\n        String s4 = s3.intern(); // SCP లో ఉన్నది తెచ్చుకోవడం\n\n        // అడ్రెస్స్ లు సమానమా కాదా చెక్ చేస్తున్నాం (==)\n        System.out.println(\"s1 == s2 (రెండు SCP లోవే)       : \" + (s1 == s2)); // true\n        System.out.println(\"s1 == s3 (SCP vs Heap)       : \" + (s1 == s3)); // false\n        System.out.println(\"s1 == s4 (SCP vs intern())   : \" + (s1 == s4)); // true\n\n        // అడ్రెస్ తో పనిలేదు, లోపల ఉన్నది ఒకటేనా? (equals)\n        System.out.println(\"s1.equals(s3) (కంటెంట్ చెక్)    : \" + s1.equals(s3)); // true\n\n        System.out.println(\"\n=== 2. స్ట్రింగ్స్ ని మార్చలేం అనడానికి ప్రూఫ్ ===\");\n        String original = \"Hello\";\n        original.concat(\" World\"); // దీని రిజల్ట్ ని మనం ఏ వేరియబుల్ కీ ఇవ్వలేదు!\n        System.out.println(\"concat() వాడిన తర్వాత          : \" + original); // \"Hello\"\n\n        original = original.concat(\" World\"); // మళ్ళీ original కే అసైన్ చేసాం\n        System.out.println(\"మళ్ళీ అసైన్ చేసిన తర్వాత         : \" + original); // \"Hello World\"\n\n        System.out.println(\"\n=== 3. String Indexing (అక్షరాలని బయటికి తీయడం) ===\");\n        String greeting = \"Java 21\";\n        System.out.println(\"ఒరిజినల్ స్ట్రింగ్               : \"\" + greeting + \"\"\");\n        System.out.println(\"మొత్తం అక్షరాలు (Length)        : \" + greeting.length());\n        System.out.println(\"మొదటి అక్షరం (index 0)         : \" + greeting.charAt(0));\n        System.out.println(\"index 5 దగ్గర ఉన్నది           : \" + greeting.charAt(5));\n        System.out.println(\"చివరి అక్షరం                   : \" + greeting.charAt(greeting.length() - 1));\n\n        System.out.print(\"లూప్ వేసి ప్రింట్ చేస్తే: \");\n        for (int i = 0; i < greeting.length(); i++) {\n            System.out.print(\"[\" + i + \"]=\" + greeting.charAt(i) + \" \");\n        }\n        System.out.println();\n    }\n}",
    "output": "=== 1. String Literals vs new String() ===\ns1 == s2 (రెండు SCP లోవే)       : true\ns1 == s3 (SCP vs Heap)       : false\ns1 == s4 (SCP vs intern())   : true\ns1.equals(s3) (కంటెంట్ చెక్)    : true\n\n=== 2. స్ట్రింగ్స్ ని మార్చలేం అనడానికి ప్రూఫ్ ===\nconcat() వాడిన తర్వాత          : Hello\nమళ్ళీ అసైన్ చేసిన తర్వాత         : Hello World\n\n=== 3. String Indexing (అక్షరాలని బయటికి తీయడం) ===\nఒరిజినల్ స్ట్రింగ్               : \"Java 21\"\nమొత్తం అక్షరాలు (Length)        : 7\nమొదటి అక్షరం (index 0)         : J\nindex 5 దగ్గర ఉన్నది           : 2\nచివరి అక్షరం                   : 1\nలూప్ వేసి ప్రింట్ చేస్తే: [0]=J [1]=a [2]=v [3]=a [4]=  [5]=2 [6]=1",
    "lineByLine": [
      {
        "line": "String s1 = \"Java\"; String s2 = \"Java\";",
        "explanation": "డైరెక్ట్ గా రాసాం కాబట్టి రెండు ఒకే SCP ఆబ్జెక్ట్ ని పాయింట్ చేస్తాయి."
      },
      {
        "line": "String s3 = new String(\"Java\");",
        "explanation": "new వాడాం కాబట్టి, సపరేట్ గా వేరే మెమరీలో స్టోర్ అవుతుంది."
      },
      {
        "line": "String s4 = s3.intern();",
        "explanation": "intern() వాడటం వల్ల, SCP లో ఉన్న \"Java\" అడ్రెస్ ని వెతుక్కుని మరి తెచ్చి s4 లో పెట్టింది."
      },
      {
        "line": "original.concat(\" World\");",
        "explanation": "కొత్త స్ట్రింగ్ ని క్రియేట్ చేసింది గాని, దాన్ని మనం ఏ వేరియబుల్ లో స్టోర్ చేసుకోలేదు, కాబట్టి original అలాగే ఉంది."
      },
      {
        "line": "greeting.charAt(i);",
        "explanation": "i పొజిషన్ లో ఏ అక్షరం ఉందో అది ఇస్తుంది. స్ట్రింగ్స్ ఎప్పుడూ జీరో నుంచే స్టార్ట్ అవుతాయి."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    public static void main(String[] args) {\n        // రియల్ టైమ్ ఇష్యూ: ఒకే కేటగిరీ లక్షల సార్లు రిపీట్ అయినప్పుడు ర్యామ్ సేవ్ చేయడం\n        String rawCategory1 = new String(\"ELECTRONICS\");\n        String rawCategory2 = new String(\"ELECTRONICS\");\n        String rawCategory3 = new String(\"ELECTRONICS\");\n\n        // intern() వాడకపోతే 3 వేరు వేరుగా ఉండి మెమరీ వేస్ట్ అవుతుంది\n        System.out.println(\"Intern వాడకముందు:\");\n        System.out.println(\"Obj 1 == Obj 2 : \" + (rawCategory1 == rawCategory2)); // false\n\n        // intern() వాడితే అన్నీ ఒకటే SCP ఆబ్జెక్ట్ ని పాయింట్ చేస్తాయి\n        String pooled1 = rawCategory1.intern();\n        String pooled2 = rawCategory2.intern();\n        String pooled3 = rawCategory3.intern();\n\n        System.out.println(\"\nIntern వాడిన తర్వాత (Memory Deduplication):\");\n        System.out.println(\"Pooled 1 == Pooled 2 : \" + (pooled1 == pooled2)); // true\n        System.out.println(\"Pooled 2 == Pooled 3 : \" + (pooled2 == pooled3)); // true\n        System.out.println(\"ఫైనల్ కేటగిరీ          : \" + pooled1);\n    }\n}",
    "practicalOutput": "Intern వాడకముందు:\nObj 1 == Obj 2 : false\n\nIntern వాడిన తర్వాత (Memory Deduplication):\nPooled 1 == Pooled 2 : true\nPooled 2 == Pooled 3 : true\nఫైనల్ కేటగిరీ          : ELECTRONICS",
    "commonMistakes": [
      "పాస్వర్డ్స్, యూజర్ నేమ్స్ సేమ్ ఉన్నాయా లేదా అని చెక్ చేయడానికి `==` వాడటం. `==` అనేది కేవలం అడ్రెస్ ని మాత్రమే చెక్ చేస్తుంది. ఎప్పుడైనా `.equals()` మాత్రమే వాడాలి.",
      "`str.toUpperCase()` అని రాసి వదిలేయడం. స్ట్రింగ్స్ ని మార్చలేం కాబట్టి, వచ్చిన రిజల్ట్ ని మళ్ళీ వేరియబుల్ కి సేవ్ చేసుకోవాలి (`str = str.toUpperCase();`).",
      "చివరి అక్షరం కావాలని `str.charAt(str.length())` వాడటం. అక్షరాలు జీరో నుంచి స్టార్ట్ అవుతాయి కాబట్టి ఎప్పుడూ `str.length() - 1` వాడాలి."
    ],
    "challenge": "// Coding Challenge:\n// మీ దగ్గర \"DEVELOPER\" అనే పదం ఉంది:\n// 1. మొదటి అక్షరం, చివరి అక్షరం ప్రింట్ చేయండి.\n// 2. ఎగ్జాక్ట్ గా మధ్యలో ఉన్న అక్షరం ప్రింట్ చేయండి.\n// 3. లూప్ వేసి ఆ పదాన్ని రివర్స్ లో ప్రింట్ చేయండి (REPOLEVED అని రావాలి).\n\npublic class Challenge {\n    public static void main(String[] args) {\n        String word = \"DEVELOPER\";\n        \n        System.out.println(\"మొదటిది: \" + word.charAt(0));\n        System.out.println(\"చివరిది: \" + word.charAt(word.length() - 1));\n        System.out.println(\"మధ్యలో ఉన్నది: \" + word.charAt(word.length() / 2));\n        \n        System.out.print(\"రివర్స్: \");\n        for (int i = word.length() - 1; i >= 0; i--) {\n            System.out.print(word.charAt(i));\n        }\n        System.out.println();\n    }\n}",
    "faq": [
      {
        "q": "SCP (String Constant Pool) అనేది మెమరీలో ఎక్కడ ఉంటుంది?",
        "a": "జావా 7 కు ముందు ఇది PermGen అనే సపరేట్ మెమరీలో ఉండేది. కానీ జావా 7 తర్వాత దాన్ని మెయిన్ Heap మెమరీ లోకే మార్చేశారు. దీనివల్ల వాడని స్ట్రింగ్స్ ని గార్బేజ్ కలెక్టర్ (GC) ఈజీగా క్లీన్ చేస్తుంది."
      },
      {
        "q": "Java 9 తర్వాత char[] తీసేసి byte[] ఎందుకు పెట్టారు?",
        "a": "ముందే చెప్పినట్టు Compact Strings ఫీచర్ కోసం. ఇంగ్లీష్ అక్షరాలకు 2 బైట్స్ వాడటం వేస్ట్ అని, 1 బైట్ వాడి మెమరీని దాదాపు సగం సేవ్ చేయడానికి ఇలా మార్చారు."
      },
      {
        "q": "String s = new String(\"Java\"); రాస్తే మెమరీలో ఎన్ని ఆబ్జెక్ట్స్ క్రియేట్ అవుతాయి?",
        "a": "రెండు! ఒకటి \"Java\" అనే లిటరల్ కోసం SCP లో క్రియేట్ అవుతుంది (ఒకవేళ ముందే లేకపోతే). ఇంకోటి new వాడినందుకు Heap లో క్రియేట్ అవుతుంది."
      }
    ],
    "recap": [
      "జావాలో String అనేది ప్రిమిటివ్ కాదు, అదొక క్లాస్. దాన్ని క్రియేట్ చేశాక మార్చలేము (Immutable).",
      "డైరెక్ట్ గా క్రియేట్ చేసిన స్ట్రింగ్స్ అన్నీ SCP (String Constant Pool) లో స్టోర్ అవుతాయి.",
      "new వాడి క్రియేట్ చేసినవి Heap లో స్టోర్ అవుతాయి. intern() వాడితే SCP లో ఉన్న అడ్రెస్ వస్తుంది.",
      "Immutability వల్ల సెక్యూరిటీ, త్రెడ్-సేఫ్టీ, మెమరీ సేవింగ్స్ చాలా బాగుంటాయి.",
      "Java 9+ లో ఉన్న కాంపాక్ట్ స్ట్రింగ్స్ ఇంగ్లీష్ అక్షరాలకి సగం మెమరీనే వాడుకుంటాయి."
    ]
  },
  {
    "num": 24,
    "phaseId": "phase6",
    "phaseTitle": "Phase 6: Strings & Text Processing",
    "slug": "24-java-string-methods-search-extraction-and-manipulation",
    "title": "Java String Methods: Search, Extraction & Transformation (తెలుగులో)",
    "badge": "24. String Methods Masterclass",
    "subtopics": "length() · toUpperCase() · toLowerCase() · trim() & strip() · contains() · startsWith() & endsWith() · indexOf() & lastIndexOf() · substring() · replace() & replaceAll() · split() & join() · repeat()",
    "readTime": "24 min read",
    "intro": "స్ట్రింగ్స్ లో ఉన్న ఒక పదాన్ని వెతకడం ఎలా? ఒక పెద్ద పారాగ్రాఫ్ నుంచి కావాల్సిన ముక్కని కట్ చేయడం ఎలా? ఎక్స్ట్రా స్పేస్ లని తీసేయడం, క్యాపిటల్ లెటర్స్ కి మార్చడం, కామాలతో ఉన్న టెక్స్ట్ ని ముక్కలుగా (split) చేయడం లాంటి ఎన్నో అద్భుతమైన స్ట్రింగ్ మెథడ్స్ ని ఈ చాప్టర్ లో ప్రాక్టికల్ గా చూద్దాం.",
    "theorySections": [
      {
        "heading": "1. బేసిక్ ఇన్వెస్టిగేషన్ మెథడ్స్ (Inspection Methods)",
        "content": "ఒక టెక్స్ట్ ని మ్యాన్యువల్ గా లూప్స్ వేసి వెతకకుండా, జావాలో ముందే రాసిపెట్టిన ఎన్నో మెథడ్స్ ఉన్నాయి:\n\n<div class=\"ref-table-wrap\">\n  <table class=\"ref-table\">\n    <thead>\n      <tr>\n        <th>మెథడ్ పేరు</th>\n        <th>రిటర్న్ టైప్</th>\n        <th>ఏం చేస్తుంది?</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><code>length()</code></td>\n        <td><code>int</code></td>\n        <td>స్ట్రింగ్ లో ఎన్ని అక్షరాలున్నాయో కౌంట్ ఇస్తుంది.</td>\n      </tr>\n      <tr>\n        <td><code>isEmpty()</code></td>\n        <td><code>boolean</code></td>\n        <td>లోపల అసలు ఏమీ లేకపోతే (సైజు 0 ఉంటే) <code>true</code> ఇస్తుంది.</td>\n      </tr>\n      <tr>\n        <td><code>isBlank()</code> (Java 11+)</td>\n        <td><code>boolean</code></td>\n        <td>ఏమీ లేకపోయినా, లేదా కేవలం స్పేస్ లు మాత్రమే ఉన్నా <code>true</code> ఇస్తుంది.</td>\n      </tr>\n      <tr>\n        <td><code>contains(String s)</code></td>\n        <td><code>boolean</code></td>\n        <td>మనం ఇచ్చిన పదం ఆ స్ట్రింగ్ లో ఎక్కడైనా ఉందేమో వెతికి చెప్తుంది.</td>\n      </tr>\n      <tr>\n        <td><code>startsWith(String s)</code></td>\n        <td><code>boolean</code></td>\n        <td>ఆ స్ట్రింగ్ మనం ఇచ్చిన పదంతోనే స్టార్ట్ అయ్యిందా లేదా చెక్ చేస్తుంది.</td>\n      </tr>\n      <tr>\n        <td><code>endsWith(String s)</code></td>\n        <td><code>boolean</code></td>\n        <td>చివర్లో ఆ పదం ఉందా లేదా చెక్ చేస్తుంది (ఉదాహరణకి ఫైల్ <code>.pdf</code> ఆ కాదా అని).</td>\n      </tr>\n      <tr>\n        <td><code>indexOf(String s)</code></td>\n        <td><code>int</code></td>\n        <td>మనం అడిగిన పదం ఫస్ట్ టైమ్ ఏ ఇండెక్స్ దగ్గర ఉందో దాని నంబర్ ఇస్తుంది (లేకపోతే <code>-1</code>).</td>\n      </tr>\n      <tr>\n        <td><code>lastIndexOf(String s)</code></td>\n        <td><code>int</code></td>\n        <td>మనం అడిగిన పదం లాస్ట్ టైమ్ ఎక్కడ రిపీట్ అయ్యిందో ఆ నంబర్ ఇస్తుంది.</td>\n      </tr>\n    </tbody>\n  </table>\n</div>"
      },
      {
        "heading": "2. టెక్స్ట్ ని క్లీన్ చేయడం (trim vs strip)",
        "content": "యూజర్స్ ఫామ్స్ ఫిల్ చేసేటప్పుడు ముందు, వెనక తెలియకుండా స్పేస్ లు ఇస్తుంటారు. వాటిని క్లీన్ చేయడం చాలా ఇంపార్టెంట్:\n\n- **`toUpperCase()` / `toLowerCase()`:** మొత్తం టెక్స్ట్ ని క్యాపిటల్స్ లేదా స్మాల్ లెటర్స్ కి మారుస్తుంది.\n- **`trim()` (పాతది):** టెక్స్ట్ ముందు, వెనక ఉన్న నార్మల్ స్పేస్ లని తీసేస్తుంది.\n- **`strip()` (Java 11+ బెస్ట్):** ఇది కొత్తది. నార్మల్ స్పేస్ లనే కాకుండా, ప్రపంచంలో ఉన్న అన్ని భాషల స్పెషల్ స్పేస్ లని (Unicode whitespace) కూడా పర్ఫెక్ట్ గా క్లీన్ చేస్తుంది.\n- **`stripLeading()` / `stripTrailing()`:** కేవలం ముందు ఉన్న స్పేస్ లు లేదా వెనక ఉన్నవి మాత్రమే తీయాలంటే ఇవి వాడాలి."
      },
      {
        "heading": "3. కటింగ్ చేయడం: `substring()` వాడకం",
        "content": "ఒక పెద్ద టెక్స్ట్ నుంచి కావాల్సిన ముక్కని కట్ చేసి బయటికి తీయాలంటే `substring()` వాడతాం:\n\n1. **`substring(int beginIndex)`:** ఇచ్చిన నంబర్ నుంచి చివరి దాకా కట్ చేస్తుంది.\n```java\nString lang = \"Java Programming\";\nString sub = lang.substring(5); // \"Programming\" అని వస్తుంది (5 నుంచి లాస్ట్ దాకా)\n```\n\n2. **`substring(int beginIndex, int endIndex)`:** ఇక్కడినుంచి ఇక్కడివరకే కావాలని చెప్తాం.\n- ఇచ్చిన `beginIndex` అక్షరం **కలుస్తుంది**.\n- కానీ `endIndex` దగ్గర ఉన్న అక్షరం **కలవదు** (దాని ముందు వరకే కట్ చేస్తుంది).\n- కట్ చేసిన టెక్స్ట్ సైజు కావాలంటే: `endIndex - beginIndex`.\n\n```\n టెక్స్ట్:   \"J  a  v  a     P  r  o  g  r  a  m\"\n ఇండెక్స్:   0  1  2  3  4  5  6  7  8  9  10 11\n           [----------)\n           begin=0, end=4 ===> \"Java\" (0, 1, 2, 3 అక్షరాలు వస్తాయి)\n```"
      },
      {
        "heading": "4. టెక్స్ట్ ని మార్చడం (replace vs replaceAll)",
        "content": "ఉన్న టెక్స్ట్ లో ఒక పదాన్ని తీసేసి ఇంకో పదం పెట్టాలంటే:\n\n1. **`replace(\"పాతది\", \"కొత్తది\")`:**\nఇచ్చిన పదం ఎక్కడెక్కడ ఉందో వాటన్నింటినీ కొత్త పదంతో మారుస్తుంది. ఇది డైరెక్ట్ పదాలకి వాడాలి.\n```java\nString text = \"cat and dog and cat\";\nString result = text.replace(\"cat\", \"bird\"); // \"bird and dog and bird\"\n```\n\n2. **`replaceAll(\"regex\", \"కొత్తది\")`:**\nదీనికి మనం ఇచ్చేది నార్మల్ పదం కాదు, ఒక ఫార్మాట్ (Regular Expression). ఉదాహరణకి టెక్స్ట్ లో ఉన్న నంబర్స్ అన్నీ తీసేయాలి అంటే ఇది వాడాలి.\n```java\nString messy = \"User123 logged in at 09:45 AM\";\n// నంబర్స్ ని (\\\\d+) గుర్తుపట్టి వాటన్నింటినీ # తో మార్చేస్తుంది\nString clean = messy.replaceAll(\"\\\\d+\", \"#\"); // \"User# logged in at #:# AM\"\n```"
      },
      {
        "heading": "5. ముక్కలు చేయడం & కలపడం (split & join)",
        "content": "డేటాబేస్ లో కామాలతో ఉన్న టెక్స్ట్ ని అరే (Array) గా మార్చడం చాలా కామన్:\n\n- **`split(\"గుర్తు\")`:** మనం ఇచ్చిన గుర్తుని బేస్ చేసుకుని టెక్స్ట్ ని ముక్కలు చేసి String Array గా ఇస్తుంది.\n```java\nString csv = \"apple,banana,cherry,dates\";\nString[] fruits = csv.split(\",\"); // [\"apple\", \"banana\", \"cherry\", \"dates\"]\n```\n\n- **`String.join(\"గుర్తు\", అరే_లేదా_లిస్ట్)`:** విడివిడిగా ఉన్న వాటిని ఒకే స్ట్రింగ్ లాగా కలుపుతుంది.\n```java\nString joined = String.join(\" | \", \"HTML\", \"CSS\", \"Java\", \"SQL\");\n// \"HTML | CSS | Java | SQL\" అని వస్తుంది\n```"
      }
    ],
    "codeExample": "public class Main {\n    public static void main(String[] args) {\n        String language = \"Java Programming\";\n\n        System.out.println(\"=== బేసిక్ ఇన్వెస్టిగేషన్ డెమో ===\");\n        System.out.println(\"మొత్తం అక్షరాలు (Length) : \" + language.length());\n        System.out.println(\"క్యాపిటల్ లెటర్స్        : \" + language.toUpperCase());\n        System.out.println(\"'Java' ఉందా?           : \" + language.contains(\"Java\"));\n        System.out.println(\"substring(0, 4) కటింగ్  : \" + language.substring(0, 4));\n\n        System.out.println(\"\n=== పొజిషన్స్ కనుక్కోవడం ===\");\n        System.out.println(\"'Java' తో స్టార్ట్ అయ్యిందా?  : \" + language.startsWith(\"Java\"));\n        System.out.println(\"'ing' తో ఎండ్ అయ్యిందా?   : \" + language.endsWith(\"ing\"));\n        System.out.println(\"'Prog' ఎక్కడుంది?       : \" + language.indexOf(\"Prog\"));\n        System.out.println(\"'a' ఫస్ట్ ఎక్కడుంది?     : \" + language.indexOf('a'));\n        System.out.println(\"'a' లాస్ట్ ఎక్కడుంది?    : \" + language.lastIndexOf('a'));\n        System.out.println(\"'Python' ఎక్కడుంది?     : \" + language.indexOf(\"Python\")); // లేకపోతే -1 ఇస్తుంది\n\n        System.out.println(\"\n=== స్పేస్ లు క్లీన్ చేయడం ===\");\n        String messyInput = \"   \\t  Admin User  \\n  \";\n        System.out.println(\"క్లీన్ చేయకముందు       : [\" + messyInput + \"]\");\n        System.out.println(\"trim() వాడితే        : [\" + messyInput.trim() + \"]\");\n        System.out.println(\"strip() వాడితే (బెస్ట్) : [\" + messyInput.strip() + \"]\");\n\n        System.out.println(\"\n=== టెక్స్ట్ మార్చడం (Replace) ===\");\n        String sentence = \"Java is slow. Java is old.\";\n        String updated = sentence.replace(\"slow\", \"fast\").replace(\"old\", \"modern\");\n        System.out.println(\"మార్చిన తర్వాత          : \" + updated);\n\n        System.out.println(\"\n=== ముక్కలు చేయడం & కలపడం (Split & Join) ===\");\n        String technologies = \"Java,Spring Boot,PostgreSQL,Docker,Kubernetes\";\n        String[] techArray = technologies.split(\",\"); // కామా ఉన్నచోట కట్ చేస్తుంది\n        for (int i = 0; i < techArray.length; i++) {\n            System.out.println(\"  టెక్నాలజీ [\" + (i + 1) + \"]: \" + techArray[i]);\n        }\n\n        String formattedBadge = String.join(\" -> \", techArray); // మళ్ళీ -> తో కలుపుతున్నాం\n        System.out.println(\"ప్రాసెస్              : \" + formattedBadge);\n    }\n}",
    "output": "=== బేసిక్ ఇన్వెస్టిగేషన్ డెమో ===\nమొత్తం అక్షరాలు (Length) : 16\nక్యాపిటల్ లెటర్స్        : JAVA PROGRAMMING\n'Java' ఉందా?           : true\nsubstring(0, 4) కటింగ్  : Java\n\n=== పొజిషన్స్ కనుక్కోవడం ===\n'Java' తో స్టార్ట్ అయ్యిందా?  : true\n'ing' తో ఎండ్ అయ్యిందా?   : true\n'Prog' ఎక్కడుంది?       : 5\n'a' ఫస్ట్ ఎక్కడుంది?     : 1\n'a' లాస్ట్ ఎక్కడుంది?    : 10\n'Python' ఎక్కడుంది?     : -1\n\n=== స్పేస్ లు క్లీన్ చేయడం ===\nక్లీన్ చేయకముందు       : [   \t  Admin User  \n  ]\ntrim() వాడితే        : [Admin User]\nstrip() వాడితే (బెస్ట్) : [Admin User]\n\n=== టెక్స్ట్ మార్చడం (Replace) ===\nమార్చిన తర్వాత          : Java is fast. Java is modern.\n\n=== ముక్కలు చేయడం & కలపడం (Split & Join) ===\n  టెక్నాలజీ [1]: Java\n  టెక్నాలజీ [2]: Spring Boot\n  టెక్నాలజీ [3]: PostgreSQL\n  టెక్నాలజీ [4]: Docker\n  టెక్నాలజీ [5]: Kubernetes\nప్రాసెస్              : Java -> Spring Boot -> PostgreSQL -> Docker -> Kubernetes",
    "lineByLine": [
      {
        "line": "language.substring(0, 4);",
        "explanation": "0 నుంచి స్టార్ట్ చేసి 3 వరకు (4 ముందు వరకు) ఉన్న అక్షరాలని కట్ చేసి 'Java' అని ఇచ్చింది."
      },
      {
        "line": "language.indexOf(\"Prog\");",
        "explanation": "'Prog' అనే పదం 5వ ఇండెక్స్ దగ్గర మొదలైంది అని నంబర్ ఇస్తుంది."
      },
      {
        "line": "messyInput.strip();",
        "explanation": "టెక్స్ట్ ముందు, వెనక ఉన్న అడ్డమైన స్పేస్ లు అన్నీ పర్ఫెక్ట్ గా క్లీన్ చేసి కేవలం టెక్స్ట్ ని మాత్రమే ఇస్తుంది."
      },
      {
        "line": "technologies.split(\",\");",
        "explanation": "కామాని బేస్ చేసుకుని ఆ స్ట్రింగ్ ని ముక్కలు చేసి ఒక స్ట్రింగ్ అరే (Array) లో స్టోర్ చేసింది."
      },
      {
        "line": "String.join(\" -> \", techArray);",
        "explanation": "ముక్కలుగా ఉన్న అరే ఎలిమెంట్స్ అన్నింటినీ మళ్ళీ ' -> ' గుర్తుతో కలిపేసి ఒకే స్ట్రింగ్ గా మార్చింది."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    public static void main(String[] args) {\n        // రియల్ టైమ్ సినారియో: సెక్యూరిటీ లాగ్ ని పార్స్ చేయడం\n        String logEntry = \"   2026-08-16 | AUTH_SUCCESS | user_id=90412 | ip=192.168.1.45   \";\n\n        String cleanLog = logEntry.strip();\n        String[] fields = cleanLog.split(\"\\\\s*\\\\|\\\\s*\"); // | గుర్తు ముందు వెనక స్పేస్ లు ఉన్నా చూసుకుంటుంది\n        String timestamp = fields[0];\n        String eventType = fields[1];\n        String userIdData = fields[2];\n        String ipAddress = fields[3];\n\n        // 'user_id=' తర్వాత ఉన్న నంబర్ ని మాత్రమే కట్ చేస్తున్నాం\n        String userId = userIdData.substring(userIdData.indexOf('=') + 1);\n\n        System.out.println(\"=== సెక్యూరిటీ డేటా రిపోర్ట్ ===\");\n        System.out.println(\"టైమ్         : \" + timestamp);\n        System.out.println(\"ఏం జరిగింది? : \" + eventType);\n        System.out.println(\"యూజర్ ఐడీ    : \" + userId);\n        System.out.println(\"ఐపీ అడ్రెస్   : \" + ipAddress);\n        System.out.println(\"ఆథరైజేషనా?  : \" + eventType.startsWith(\"AUTH\"));\n    }\n}",
    "practicalOutput": "=== సెక్యూరిటీ డేటా రిపోర్ట్ ===\nటైమ్         : 2026-08-16\nఏం జరిగింది? : AUTH_SUCCESS\nయూజర్ ఐడీ    : 90412\nఐపీ అడ్రెస్   : ip=192.168.1.45\nఆథరైజేషనా?  : true",
    "commonMistakes": [
      "`indexOf()` వాడినప్పుడు పదం దొరక్కపోతే 0 వస్తుంది అనుకోవడం తప్పు. అది -1 వస్తుంది. కాబట్టి ఎప్పుడూ `if (idx != -1)` అని చెక్ చేసుకోవాలి.",
      "`substring(0, 4)` అంటే 0, 1, 2, 3, 4 అక్షరాలు వస్తాయి అనుకుంటారు. కానీ 4వ అక్షరం రాదు, దాని ముందు వరకే వస్తుంది.",
      "`split(\".\")` అని వాడటం. డాట్ (.) అంటే జావాలో స్పెషల్ మీనింగ్ ఉంటుంది, కాబట్టి దాన్ని నార్మల్ గా వాడాలంటే `split(\"\\\\.\")` అని వాడాలి."
    ],
    "challenge": "// Coding Challenge:\n// ఒక ఈమెయిల్ \"alex.developer@company.org\" ఉందనుకోండి:\n// 1. '@' కి ముందు ఉన్న యూజర్ పేరు కట్ చేయండి.\n// 2. '@' కి తర్వాత ఉన్న డొమైన్ పేరు కట్ చేయండి.\n// 3. ఆ ఈమెయిల్ \".org\" లేదా \".com\" తో ఎండ్ అవుతుందో లేదో చెక్ చేయండి.\n// 4. యూజర్ పేరులో ఉన్న '.' ని స్పేస్ కింద మార్చి మొత్తం క్యాపిటల్స్ చేయండి.\n\npublic class Challenge {\n    public static void main(String[] args) {\n        String email = \"alex.developer@company.org\";\n        \n        int atIndex = email.indexOf('@');\n        String username = email.substring(0, atIndex);\n        String domain = email.substring(atIndex + 1);\n        \n        System.out.println(\"యూజర్ నేమ్  : \" + username);\n        System.out.println(\"డొమైన్      : \" + domain);\n        System.out.println(\"వాలిడ్ ఈమెయిల్ : \" + (domain.endsWith(\".org\") || domain.endsWith(\".com\")));\n        System.out.println(\"డిస్ప్లే నేమ్: \" + username.replace('.', ' ').toUpperCase());\n    }\n}",
    "faq": [
      {
        "q": "isEmpty() కి, isBlank() కి తేడా ఏంటి?",
        "a": "isEmpty() అనేది లెంత్ 0 ఉంటేనే (ఏమీ లేకపోతేనే) true ఇస్తుంది. కానీ isBlank() అనేది లెంత్ ఉన్నా సరే.. ఒకవేళ అందులో ఉన్నవన్నీ ఉత్త స్పేస్ లే అయితే అప్పుడు కూడా true ఇస్తుంది."
      },
      {
        "q": "కొత్తగా వచ్చింది కదా అని నేను ఎప్పుడూ strip() వాడొచ్చా?",
        "a": "కచ్చితంగా వాడొచ్చు. trim() కంటే strip() చాలా పవర్ఫుల్. ఇది ప్రపంచంలో ఉన్న అన్ని రకాల స్పెషల్ స్పేస్ లని (ఉదాహరణకి కీబోర్డ్ లో కొట్టలేని స్పేస్ లు) కూడా క్లీన్ చేస్తుంది."
      },
      {
        "q": "replace() కి replaceAll() కి తేడా ఏంటి?",
        "a": "replace() అనేది కేవలం పదాలను ఎగ్జాక్ట్ గా వెతికి మారుస్తుంది (చాలా ఫాస్ట్). replaceAll() అనేది ప్యాట్రన్స్ (రెగ్యులర్ ఎక్స్ప్రెషన్స్) ఇచ్చి, నంబర్స్ అన్ని, లెటర్స్ అన్ని.. ఇలా కండిషన్స్ తో మార్చడానికి వాడతాం."
      }
    ],
    "recap": [
      "length() వాడితే అక్షరాల కౌంట్, charAt(i) వాడితే ఆ ఇండెక్స్ దగ్గర అక్షరం వస్తుంది.",
      "contains(), startsWith(), endsWith() అనేవి పదాలు ఉన్నాయా లేదా అని చెక్ చేయడానికి బెస్ట్ ఆప్షన్స్.",
      "indexOf() వాడి అక్షరం ఎక్కడ ఉందో కనుక్కోవచ్చు (లేకపోతే -1 ఇస్తుంది).",
      "substring(begin, end) వాడి పెద్ద టెక్స్ట్ ని మనకు కావాల్సిన దగ్గర కట్ చేసుకోవచ్చు.",
      "స్పేస్ లు తీసేయడానికి strip(), ముక్కలు చేయడానికి split(), కలపడానికి join() వాడాలి."
    ]
  },
  {
    "num": 25,
    "phaseId": "phase6",
    "phaseTitle": "Phase 6: Strings & Text Processing",
    "slug": "25-java-string-comparison-and-equality",
    "title": "Java String Comparison: == vs equals(), compareTo() & Hashing (తెలుగులో)",
    "badge": "25. String Equality & Comparison",
    "subtopics": "== vs equals() · Reference Equality vs Content Equality · equalsIgnoreCase() · compareTo() & Lexicographical Ordering · Null-Safe Comparison Patterns · String HashCode Caching",
    "readTime": "20 min read",
    "intro": "స్ట్రింగ్స్ ని ఒకదానితో ఒకటి ఎలా కంపేర్ చేయాలి? ఇక్కడ అందరూ చేసే అతి పెద్ద తప్పు `==` వాడటం. దాని బదులు `.equals()` ఎందుకు వాడాలో ఇక్కడ తెలుసుకుందాం. అలాగే క్యాపిటల్స్/స్మాల్స్ ఉన్నా మ్యాచ్ చేయడం (IgnoreCase), ఆల్ఫాబెట్ ఆర్డర్ లో సార్టింగ్ చేయడం, యాప్ క్రాష్ అవ్వకుండా యోడా (Yoda) ప్యాట్రన్ వాడటం నేర్చుకుందాం.",
    "theorySections": [
      {
        "heading": "1. గోల్డెన్ రూల్: == కి, .equals() కి తేడా ఏంటి?",
        "content": "జావా ప్రోగ్రామర్స్ కి ఎప్పుడూ వచ్చే బగ్స్ లో ఇదొకటి. రెండు స్ట్రింగ్స్ సమానమో కాదో చెక్ చేయడానికి `==` వాడకూడదు:\n\n1. **`==` ఆపరేటర్ (అడ్రెస్ చెక్ చేస్తుంది):**\nఇది రెండు వేరియబుల్స్ ర్యామ్ లో ఒకే అడ్రెస్ లో ఉన్నాయా లేదా అని మాత్రమే చూస్తుంది. లోపల ఏ అక్షరాలు ఉన్నాయో ఇది అసలు చూడదు!\n\n2. **`.equals()` మెథడ్ (లోపల ఉన్న కంటెంట్ చూస్తుంది):**\nఇది అడ్రెస్ తో సంబంధం లేకుండా, లోపల ఉన్న అక్షరాలని ఒక్కొక్కటిగా చెక్ చేసి పర్ఫెక్ట్ గా చెప్తుంది.\n\n```\n  String a = \"hello\";                  String b = \"hello\";\n      |                                    |\n      +-------------> [ 0x1000: \"hello\" ] <+  ===> (a == b) అంటే TRUE వస్తుంది (రెండు ఒకే SCP అడ్రెస్)\n\n  String c = new String(\"hello\");\n      |\n      +-------------> [ 0x9500: \"hello\" ]     ===> (a == c) అంటే FALSE వస్తుంది (అడ్రెస్ లు వేరు కదా!)\n                                              ===> a.equals(c) అంటే TRUE వస్తుంది (లోపల అక్షరాలు సేమ్ కాబట్టి)\n```"
      },
      {
        "heading": "2. స్మాల్స్/క్యాపిటల్స్ పట్టించుకోకూడదు అంటే: equalsIgnoreCase()",
        "content": "యూజర్ లాగిన్ అయ్యేటప్పుడు ఒక్కోసారి క్యాపిటల్స్ లో టైప్ చేయొచ్చు. అప్పుడు నార్మల్ గా చెక్ చేస్తే ఫెయిల్ అవుతుంది:\n\n- **`equals(\"admin\")`:** `\"ADMIN\".equals(\"admin\")` అని చెక్ చేస్తే `false` వస్తుంది.\n- **`equalsIgnoreCase(\"admin\")`:** `\"ADMIN\".equalsIgnoreCase(\"admin\")` అని చెక్ చేస్తే పర్ఫెక్ట్ గా `true` వస్తుంది.\n\nఇది ఇంటర్నల్ గా రెండిటినీ ముందు ఒకే ఫార్మాట్ కి (లోయర్ కేస్ కి) మార్చుకుని అప్పుడు చెక్ చేస్తుంది."
      },
      {
        "heading": "3. డిక్షనరీ ఆర్డర్ లో చెక్ చేయడం: compareTo()",
        "content": "స్ట్రింగ్స్ ని ఆల్ఫాబెట్ ఆర్డర్ లో (A-Z) సార్ట్ చేయాలంటే ఏ పదం ముందు వస్తుందో తెలియాలి. దానికి **`compareTo(String other)`** వాడతాం:\n\n<div class=\"ref-table-wrap\">\n  <table class=\"ref-table\">\n    <thead>\n      <tr>\n        <th>రిటర్న్ వాల్యూ</th>\n        <th>మీనింగ్</th>\n        <th>ఎగ్జాంపుల్</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><code>&lt; 0</code> (మైనస్ వాల్యూ)</td>\n        <td>కరెంట్ పదం ఆల్ఫాబెటికల్ గా <strong>ముందు</strong> వస్తుంది.</td>\n        <td><code>\"Apple\".compareTo(\"Banana\")</code> అంటే <code>-1</code> వస్తుంది</td>\n      </tr>\n      <tr>\n        <td><code>0</code> (జీరో)</td>\n        <td>రెండు పదాలు <strong>ఒకటే</strong> (<code>equals() == true</code>).</td>\n        <td><code>\"Java\".compareTo(\"Java\")</code> అంటే <code>0</code> వస్తుంది</td>\n      </tr>\n      <tr>\n        <td><code>&gt; 0</code> (ప్లస్ వాల్యూ)</td>\n        <td>కరెంట్ పదం ఆల్ఫాబెటికల్ గా <strong>తర్వాత</strong> వస్తుంది.</td>\n        <td><code>\"Zebra\".compareTo(\"Apple\")</code> అంటే <code>25</code> వస్తుంది</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\nవచ్చే ఆ నంబర్ ఏంటంటే.. రెండిటి అక్షరాల మధ్య ఉన్న ASCII వాల్యూస్ డిఫరెన్స్ (Result = char1 - char2).\nఒకవేళ క్యాపిటల్స్ పట్టించుకోకుండా సార్ట్ చేయాలంటే **`compareToIgnoreCase()`** వాడాలి."
      },
      {
        "heading": "4. యాప్ క్రాష్ అవ్వకుండా చెక్ చేయడం (Yoda ప్యాట్రన్)",
        "content": "జావాలో ఏ వేరియబుల్ లో అయినా `null` ఉన్నప్పుడు దాని మీద ఏదైనా మెథడ్ కాల్ చేస్తే వెంటనే **`NullPointerException` (NPE)** వచ్చి యాప్ మొత్తం క్రాష్ అవుతుంది.\n\n```java\nString userRole = null; // డేటాబేస్ నుంచి null వచ్చింది అనుకుందాం\n\n// ఇది డేంజర్ (క్రాష్ అవుతుంది): ఎందుకంటే userRole లో ఏమీ లేదు కదా, దానికి equals ఎలా అడుగుతాం?\nif (userRole.equals(\"ADMIN\")) { ... }\n\n// సేఫ్ ప్యాట్రన్ 1 (దీన్నే యోడా ప్యాట్రన్ అంటారు): ఫిక్స్డ్ గా ఉన్న వాల్యూ ని ముందు పెట్టాలి\nif (\"ADMIN\".equals(userRole)) { // ఇది క్రాష్ అవ్వకుండా ప్రశాంతంగా false ఇచ్చేస్తుంది!\n    ...\n}\n\n// సేఫ్ ప్యాట్రన్ 2 (Java 7+): Objects క్లాస్ వాడటం\nif (java.util.Objects.equals(userRole, \"ADMIN\")) {\n    ...\n}\n```"
      },
      {
        "heading": "5. స్ట్రింగ్ HashCode అనేది ఫాస్ట్ ఎందుకు?",
        "content": "స్ట్రింగ్స్ ఎప్పుడూ మారవు కాబట్టి.. జావా ఒక్కొక్క స్ట్రింగ్ కి ఒక యూనిక్ ఐడీ లాంటిదాన్ని (32-bit hash code) ఇస్తుంది.\n\n- జావా దీన్ని క్యాలిక్యులేట్ చేయడానికి 31 అనే ప్రైమ్ నంబర్ వాడి ఒక పెద్ద మ్యాథ్స్ ఫార్ములా వేస్తుంది.\n- ఒకవేళ రెండు స్ట్రింగ్స్ `equals()` వాడినప్పుడు `true` అయితే, వాటి `hashCode()` కూడా **కచ్చితంగా ఒకటే** ఉంటుంది.\n- స్ట్రింగ్ మారదు కాబట్టి జావా ఈ కోడ్ ని ముందే క్యాలిక్యులేట్ చేసి దాచుకుంటుంది. మనం ఎప్పుడు అడిగినా ఏ టైమ్ వేస్ట్ కాకుండా వెంటనే ఇచ్చేస్తుంది (O(1))."
      }
    ],
    "codeExample": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. == కి, equals() కి ఉన్న అసలు తేడా ===\");\n        String literal1 = \"Hello\";\n        String literal2 = \"Hello\";\n        String heapObj1 = new String(\"Hello\");\n        String heapObj2 = new String(\"Hello\");\n\n        System.out.println(\"literal1 == literal2 (రెండు SCP లే)     : \" + (literal1 == literal2)); // true\n        System.out.println(\"literal1 == heapObj1 (ఒకటి SCP, ఒకటి Heap): \" + (literal1 == heapObj1)); // false\n        System.out.println(\"heapObj1 == heapObj2 (రెండు వేరే వేరే Heaps) : \" + (heapObj1 == heapObj2)); // false\n        System.out.println(\"heapObj1.equals(heapObj2) (కంటెంట్ ఒకటేనా?): \" + heapObj1.equals(heapObj2)); // true\n\n        System.out.println(\"\n=== 2. స్మాల్/క్యాపిటల్స్ ఇష్యూ లేకుండా ===\");\n        String roleInput = \"admin\";\n        System.out.println(\"equals('ADMIN')                   : \" + roleInput.equals(\"ADMIN\")); // false\n        System.out.println(\"equalsIgnoreCase('ADMIN')          : \" + roleInput.equalsIgnoreCase(\"ADMIN\")); // true\n\n        System.out.println(\"\n=== 3. డిక్షనరీ ఆర్డర్ compareTo() ===\");\n        String fruitA = \"Apple\";\n        String fruitB = \"Banana\";\n        String fruitC = \"Apple\";\n\n        System.out.println(\"'Apple' compareTo 'Banana'        : \" + fruitA.compareTo(fruitB)); // -1 వస్తుంది\n        System.out.println(\"'Banana' compareTo 'Apple'        : \" + fruitB.compareTo(fruitA)); // 1 వస్తుంది\n        System.out.println(\"'Apple' compareTo 'Apple'         : \" + fruitA.compareTo(fruitC)); // 0 వస్తుంది\n\n        System.out.println(\"\n=== 4. క్రాష్ అవ్వకుండా చెక్ చేయడం (Null-Safe) ===\");\n        String nullableRole = null;\n        System.out.println(\"'ADMIN'.equals(nullRole) (ఇది సేఫ్)   : \" + \"ADMIN\".equals(nullableRole)); // false\n        System.out.println(\"Objects.equals(nullRole, 'ADMIN')   : \" + java.util.Objects.equals(nullableRole, \"ADMIN\")); // false\n\n        System.out.println(\"\n=== 5. String HashCode ఫీచర్ ===\");\n        System.out.println(\"literal1 యొక్క HashCode              : \" + literal1.hashCode());\n        System.out.println(\"heapObj1 యొక్క HashCode              : \" + heapObj1.hashCode()); // రెండు అడ్రెస్ లు వేరైనా హ్యాష్ కోడ్ ఒకటే ఉంటుంది!\n    }\n}",
    "output": "=== 1. == కి, equals() కి ఉన్న అసలు తేడా ===\nliteral1 == literal2 (రెండు SCP లే)     : true\nliteral1 == heapObj1 (ఒకటి SCP, ఒకటి Heap): false\nheapObj1 == heapObj2 (రెండు వేరే వేరే Heaps) : false\nheapObj1.equals(heapObj2) (కంటెంట్ ఒకటేనా?): true\n\n=== 2. స్మాల్/క్యాపిటల్స్ ఇష్యూ లేకుండా ===\nequals('ADMIN')                   : false\nequalsIgnoreCase('ADMIN')          : true\n\n=== 3. డిక్షనరీ ఆర్డర్ compareTo() ===\n'Apple' compareTo 'Banana'        : -1\n'Banana' compareTo 'Apple'        : 1\n'Apple' compareTo 'Apple'         : 0\n\n=== 4. క్రాష్ అవ్వకుండా చెక్ చేయడం (Null-Safe) ===\n'ADMIN'.equals(nullRole) (ఇది సేఫ్)   : false\nObjects.equals(nullRole, 'ADMIN')   : false\n\n=== 5. String HashCode ఫీచర్ ===\nliteral1 యొక్క HashCode              : 69609650\nheapObj1 యొక్క HashCode              : 69609650",
    "lineByLine": [
      {
        "line": "literal1 == literal2",
        "explanation": "ఇవి రెండు ఒకే SCP ఆబ్జెక్ట్ ని పాయింట్ చేస్తున్నాయి కాబట్టి వాటి అడ్రెస్ ఒకటే ఉండి true వస్తుంది."
      },
      {
        "line": "heapObj1.equals(heapObj2)",
        "explanation": "ఈ రెండిటి మెమరీ అడ్రెస్ లు వేరే అయినా సరే, మనం అడుగుతుంది లోపల టెక్స్ట్ సేమ్ ఉందా అని.. కాబట్టి equals() true ఇస్తుంది."
      },
      {
        "line": "fruitA.compareTo(fruitB)",
        "explanation": "\"A\" కి \"B\" కి ఒక లెటర్ గ్యాప్ (వెనకపడి) ఉంది కాబట్టి -1 ఇస్తుంది."
      },
      {
        "line": "\"ADMIN\".equals(nullableRole)",
        "explanation": "ముందు పదం ఉండటం వల్ల nullableRole లో null ఉన్నా సరే యాప్ క్రాష్ అవ్వకుండా false ఇచ్చేసి సైలెంట్ అవుతుంది (యూజ్ ఫుల్ ట్రిక్)."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    // యూజర్ కి యాక్సెస్ ఉందా లేదా చెక్ చేసే సెక్యూరిటీ మెథడ్\n    public static boolean hasAccess(String userRole, String requiredRole) {\n        // ముందు ఏమైనా null ఉంటే ఆపేయాలి\n        if (userRole == null || requiredRole == null) {\n            return false;\n        }\n        // అడ్డమైన స్పేస్ లు తీసేసి (trim), క్యాపిటల్స్/స్మాల్స్ పట్టించుకోకుండా (equalsIgnoreCase) చెక్ చేయాలి\n        return userRole.trim().equalsIgnoreCase(requiredRole.trim());\n    }\n\n    public static void main(String[] args) {\n        String inputRole1 = \"  SUPER_ADMIN  \";\n        String inputRole2 = \"super_admin\";\n        String inputRole3 = null;\n\n        System.out.println(\"యూజర్ 1 కి యాక్సెస్ ఉందా?: \" + hasAccess(inputRole1, \"SUPER_ADMIN\")); // true\n        System.out.println(\"యూజర్ 2 కి యాక్సెస్ ఉందా?: \" + hasAccess(inputRole2, \"SUPER_ADMIN\")); // true\n        System.out.println(\"యూజర్ 3 కి యాక్సెస్ ఉందా?: \" + hasAccess(inputRole3, \"SUPER_ADMIN\")); // false (క్రాష్ అవ్వలేదు)\n    }\n}",
    "practicalOutput": "యూజర్ 1 కి యాక్సెస్ ఉందా?: true\nయూజర్ 2 కి యాక్సెస్ ఉందా?: true\nయూజర్ 3 కి యాక్సెస్ ఉందా?: false",
    "commonMistakes": [
      "యూజర్ నేమ్, పాస్వర్డ్స్ చెక్ చేయడానికి `if (password == \"secret\")` అని రాయడం. ఇలా రాస్తే ఎప్పటికీ లాగిన్ ఫెయిల్ అవుతూనే ఉంటుంది.",
      "ఒక వేరియబుల్ లోకి డేటాబేస్ నుంచి ఏమొస్తుందో తెలియకుండా దానిమీద `str.equals(\"ADMIN\")` వాడటం. దానివల్ల null వస్తే యాప్ క్రాష్ అవుతుంది.",
      "`compareTo()` ఎప్పుడూ -1, 0, 1 మాత్రమే ఇస్తుంది అనుకోవడం. అది క్యారెక్టర్స్ మధ్య ఉన్న గ్యాప్ బట్టి -25, 32 లాంటి నంబర్స్ కూడా ఇస్తుంది."
    ],
    "challenge": "// Coding Challenge:\n// isAlphabeticallySorted(String[] words) అనే మెథడ్ రాయండి:\n// 1. అరే లో ఉన్న పదాలు అన్నీ కరెక్ట్ ఆల్ఫాబెట్ ఆర్డర్ లో ఉన్నాయో లేదో compareTo() వాడి చెక్ చేయండి.\n// 2. ఉంటే true, లేకపోతే false రిటర్న్ చేయండి.\n\npublic class Challenge {\n    public static boolean isAlphabeticallySorted(String[] words) {\n        for (int i = 0; i < words.length - 1; i++) {\n            if (words[i].compareTo(words[i + 1]) > 0) {\n                return false;\n            }\n        }\n        return true;\n    }\n\n    public static void main(String[] args) {\n        String[] list1 = {\"Apple\", \"Banana\", \"Cherry\", \"Mango\"};\n        String[] list2 = {\"Banana\", \"Apple\", \"Cherry\"};\n\n        System.out.println(\"లిస్ట్ 1 కరెక్ట్ ఆర్డర్ లో ఉందా?: \" + isAlphabeticallySorted(list1)); // true\n        System.out.println(\"లిస్ట్ 2 కరెక్ట్ ఆర్డర్ లో ఉందా?: \" + isAlphabeticallySorted(list2)); // false\n    }\n}",
    "faq": [
      {
        "q": "రెండు స్ట్రింగ్స్ సమానమా కాదా చెక్ చేయడానికి ఎప్పుడూ .equals() మాత్రమే వాడాలా?",
        "a": "అవును! జావాలో స్ట్రింగ్స్ కంటెంట్ చెక్ చేయడానికి 100% ఎప్పుడూ .equals() మాత్రమే వాడాలి. అడ్రెస్ గురించి పట్టించుకోవాల్సిన పని మనకు లేదు."
      },
      {
        "q": "రెండు స్ట్రింగ్స్ కి .equals() true వస్తే.. వాటి hashCode() కూడా ఒకటే ఉంటుందా?",
        "a": "కచ్చితంగా ఒకటే ఉంటుంది. ఇది జావా రాసిన వాళ్ళు పెట్టిన రూల్. ఒకవేళ hashCode ఒకటే ఉంటే మాత్రం .equals() ఎప్పుడూ true అవ్వాలని లేదు (దాన్ని హ్యాష్ కొలిజన్ అంటారు)."
      }
    ],
    "recap": [
      "== అనేది కేవలం మెమరీ అడ్రెస్ (Reference) ని మాత్రమే చూస్తుంది.",
      ".equals() అనేది లోపల ఉన్న టెక్స్ట్ కరెక్టో కాదో చెక్ చేస్తుంది. ఇదే వాడాలి.",
      "Yoda ప్యాట్రన్ (\"ADMIN\".equals(role)) వాడితే null వచ్చినా క్రాష్ అవ్వకుండా కాపాడుకోవచ్చు.",
      "compareTo() వాడి ఆల్ఫాబెట్స్ ని బట్టి వర్డ్స్ ని డిక్షనరీ ఆర్డర్ లో సార్ట్ చేయొచ్చు.",
      "స్ట్రింగ్స్ కి hashCode ముందే సేవ్ అయ్యి ఉంటుంది కాబట్టి చాలా ఫాస్ట్ గా వస్తుంది."
    ]
  },
  {
    "num": 26,
    "phaseId": "phase6",
    "phaseTitle": "Phase 6: Strings & Text Processing",
    "slug": "26-java-stringbuilder-stringbuffer-and-formatting",
    "title": "Java StringBuilder, StringBuffer & String Formatting (తెలుగులో)",
    "badge": "26. StringBuilder & Formatting",
    "subtopics": "The Concatenation Problem (O(N^2)) · StringBuilder Architecture & Capacity Growth · append() · insert() · delete() · reverse() · StringBuffer vs StringBuilder · String.format() & printf() · Text Blocks (\"\"\")",
    "readTime": "24 min read",
    "intro": "స్ట్రింగ్స్ ని లూప్ లో పెట్టి కలపడం వల్ల (Concatenation) యాప్ ఎందుకు స్లో అవుతుంది? దానికి సొల్యూషన్ గా వచ్చిన `StringBuilder` మరియు `StringBuffer` అంటే ఏంటి? వాటితో స్ట్రింగ్స్ ని మార్చడం ఎంత ఈజీ? అలాగే అవుట్పుట్ ని నీట్ గా టేబుల్స్ లాగా ఫార్మాట్ చేయడానికి `String.format()` మరియు కొత్తగా వచ్చిన Text Blocks (`\"\"\"`) గురించి నేర్చుకుందాం.",
    "theorySections": [
      {
        "heading": "1. స్ట్రింగ్స్ ని లూప్ లో కలిపితే వచ్చే ప్రాబ్లమ్ (O(N^2))",
        "content": "స్ట్రింగ్ ని ఎవరూ మార్చలేరు (Immutable) అని ముందే తెలుసుకున్నాం. కాబట్టి మీరు `+` వాడి రెండు స్ట్రింగ్స్ ని కలిపిన ప్రతిసారీ.. జావా ఒక **కొత్త స్ట్రింగ్ ని క్రియేట్ చేసి పాత అక్షరాలను కాపీ చేస్తుంది**:\n\n```java\n// ఇది చాలా తప్పు పద్ధతి (మెమరీ వేస్ట్):\nString result = \"\";\nfor (int i = 0; i < 10000; i++) {\n    result += i; // ఇది రన్ అయిన ప్రతిసారీ 10,000 టెంపరరీ ఆబ్జెక్ట్స్ క్రియేట్ అవుతాయి!\n}\n```\nదీన్ని లక్ష సార్లు రన్ చేస్తే, జావా మెమరీ ఫుల్ అయ్యి **15 సెకన్లకి పైగా టైమ్** తీసుకుంటుంది!\n\n**సొల్యూషన్:** దీనికోసమే **`StringBuilder`** ని తీసుకొచ్చారు. ఇది ఒక ప్లాస్టిక్ డబ్బా లాంటిది. కొత్త ఆబ్జెక్ట్స్ ని క్రియేట్ చేయకుండా ఉన్నదానిలోనే కలుపుకుంటూ వెళ్తుంది. లక్ష సార్లు రన్ చేయడానికి దీనికి **5 మిల్లీ సెకన్లు** మాత్రమే పడుతుంది!"
      },
      {
        "heading": "2. StringBuilder సైజు ఎలా పెరుగుతుంది? (Capacity)",
        "content": "`StringBuilder` ఇంటర్నల్ గా ఒక అక్షరాల అరే (Array) ని మైంటైన్ చేస్తుంది:\n- **స్టార్టింగ్ కెపాసిటీ (Capacity):** బై డీఫాల్ట్ గా 16 అక్షరాలకు సరిపడా ఖాళీ ప్లేస్ ఇస్తుంది.\n- **కస్టమ్ కెపాసిటీ:** `new StringBuilder(100)` అంటే ముందే 100 క్యారెక్టర్స్ కి ప్లేస్ రిజర్వ్ చేసుకోవచ్చు.\n- **ఆటోమాటిక్ గా పెరగడం:** ఒకవేళ ఆ 16 ప్లేసులు ఫుల్ అయిపోతే.. వెంటనే పాత సైజు కి డబుల్ చేసి దానికి ఇంకో 2 కలుపుతుంది:\nకొత్త సైజు = (పాత సైజు * 2) + 2\n\n```\n  స్టార్టింగ్ బఫర్ (సైజు = 16):\n  ['J']['a']['v']['a'][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]  (వాడింది 4)\n\n  ఇంకో 20 అక్షరాలు కలిపితే ఏమవుతుంది?:\n  కొత్త సైజు = (16 * 2) + 2 = 34 వస్తుంది (ఆటోమాటిక్ గా)\n  ['J']['a']['v']['a'][' ']['2']['1']['.']['.']['.'][ ... ] \n```"
      },
      {
        "heading": "3. StringBuilder లో ముఖ్యమైన మెథడ్స్",
        "content": "<div class=\"ref-table-wrap\">\n  <table class=\"ref-table\">\n    <thead>\n      <tr>\n        <th>మెథడ్</th>\n        <th>ఏం చేస్తుంది?</th>\n        <th>ఎగ్జాంపుల్</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><code>append(డేటా)</code></td>\n        <td>స్ట్రింగ్ చివర్లో మనం ఇచ్చిన డేటాని కలుపుతుంది.</td>\n        <td><code>sb.append(\" Java \").append(21);</code></td>\n      </tr>\n      <tr>\n        <td><code>insert(ఇండెక్స్, డేటా)</code></td>\n        <td>మనం చెప్పిన పొజిషన్ లోకి టెక్స్ట్ ని దూరేలా చేస్తుంది.</td>\n        <td><code>sb.insert(0, \"START: \");</code></td>\n      </tr>\n      <tr>\n        <td><code>delete(start, end)</code></td>\n        <td>మధ్యలో ఉన్న టెక్స్ట్ ని కట్ చేసి తీసేస్తుంది.</td>\n        <td><code>sb.delete(0, 7);</code></td>\n      </tr>\n      <tr>\n        <td><code>reverse()</code></td>\n        <td>మొత్తం స్ట్రింగ్ ని రివర్స్ చేస్తుంది.</td>\n        <td><code>sb.reverse();</code></td>\n      </tr>\n      <tr>\n        <td><code>setCharAt(idx, char)</code></td>\n        <td>ఒక్క అక్షరాన్ని మాత్రమే మారుస్తుంది.</td>\n        <td><code>sb.setCharAt(0, 'X');</code></td>\n      </tr>\n      <tr>\n        <td><code>toString()</code></td>\n        <td>ఫైనల్ గా ఆ డబ్బాలో ఉన్నదాన్ని నార్మల్ String లాగా మార్చేస్తుంది.</td>\n        <td><code>String text = sb.toString();</code></td>\n      </tr>\n    </tbody>\n  </table>\n</div>"
      },
      {
        "heading": "4. String vs StringBuilder vs StringBuffer తేడాలు",
        "content": "<div class=\"ref-table-wrap\">\n  <table class=\"ref-table\">\n    <thead>\n      <tr>\n        <th>ఫీచర్</th>\n        <th><code>String</code></th>\n        <th><code>StringBuilder</code></th>\n        <th><code>StringBuffer</code></th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><strong>మార్చొచ్చా? (Mutable)</strong></td>\n        <td>మార్చలేము (Immutable)</td>\n        <td>మార్చొచ్చు (Mutable)</td>\n        <td>మార్చొచ్చు (Mutable)</td>\n      </tr>\n      <tr>\n        <td><strong>Thread Safety (సేఫేనా?)</strong></td>\n        <td>Thread-Safe</td>\n        <td><strong>Thread-Safe కాదు</strong> (లాక్స్ లేవు)</td>\n        <td><strong>Thread-Safe</strong> (లాక్స్ ఉంటాయి)</td>\n      </tr>\n      <tr>\n        <td><strong>స్పీడ్</strong></td>\n        <td>చాలా స్లో (లూప్స్ లో)</td>\n        <td><strong>సూపర్ ఫాస్ట్</strong></td>\n        <td>కాస్త స్లో (లాక్స్ ఉండటం వల్ల)</td>\n      </tr>\n      <tr>\n        <td><strong>మెమరీ</strong></td>\n        <td>SCP లేదా Heap</td>\n        <td>Heap</td>\n        <td>Heap</td>\n      </tr>\n      <tr>\n        <td><strong>ఎప్పుడు వాడాలి?</strong></td>\n        <td>నార్మల్ టెక్స్ట్ కి, మ్యాప్ కీస్ కి</td>\n        <td><strong>లూప్స్ లో టెక్స్ట్ ని కలిపేటప్పుడు</strong></td>\n        <td>మల్టీ-త్రెడింగ్ ఉన్నప్పుడు మాత్రమే</td>\n      </tr>\n    </tbody>\n  </table>\n</div>"
      },
      {
        "heading": "5. టెక్స్ట్ ని ప్రొఫెషనల్ గా డిజైన్ చేయడం (String Formatting)",
        "content": "అవుట్పుట్ ని నీట్ గా టేబుల్స్ లాగా చూపించాలంటే String formatting వాడతాం:\n\n```java\nString message = String.format(\"ప్రొడక్ట్: %-12s | ధర: $%7.2f | క్వాంటిటీ: %03d\", \"Laptop\", 899.954, 5);\n// రిజల్ట్: \"ప్రొడక్ట్: Laptop       | ధర: $ 899.95 | క్వాంటిటీ: 005\"\n```\n\n**వాడే కోడ్స్ ఇవే:**\n- **`%s`**: స్ట్రింగ్ కోసం\n- **`%d`**: నార్మల్ నంబర్స్ కి (int)\n- **`%f`**: పాయింట్స్ ఉన్న నంబర్స్ కి (`%.2f` అంటే పాయింట్ తర్వాత 2 నంబర్స్ ఏ వస్తాయి)\n- **`%-15s`**: లెఫ్ట్ సైడ్ కరెక్ట్ గా 15 స్పేస్ లతో సెట్ అవ్వడానికి\n- **`%05d`**: నంబర్ ముందు జీరోలు యాడ్ చేయడానికి (ఉదా: `00042`)\n\n**కొత్త Java 15+ Text Blocks (`\"\"\"`):**\nHTML లాంటి పెద్ద పెద్ద కోడ్స్ రాసేటప్పుడు జావాలో మల్టిపుల్ లైన్స్ కోసం 3 కొటేషన్స్ వాడొచ్చు:\n```java\nString html = \"\"\"\n    <div class=\"card\">\n        <h2>%s</h2>\n        <p>వయసు: %d</p>\n    </div>\n    \"\"\".formatted(\"రవి\", 25);\n```"
      }
    ],
    "codeExample": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. StringBuilder ఆపరేషన్స్ ===\");\n        StringBuilder sb = new StringBuilder(\"Java\");\n\n        sb.append(\" Programming\").append(\" 2026\");\n        System.out.println(\"append() వాడాక        : \" + sb);\n\n        sb.insert(0, \"Modern \");\n        System.out.println(\"insert() వాడాక        : \" + sb);\n\n        sb.setCharAt(0, 'm');\n        System.out.println(\"setCharAt() వాడాక     : \" + sb);\n\n        sb.delete(0, 7); // \"modern \" ని కట్ చేసాం\n        System.out.println(\"delete() వాడాక        : \" + sb);\n\n        StringBuilder pal = new StringBuilder(\"RADAR\");\n        // పాలిండ్రోమ్ చెక్ చేయడం ఎంత ఈజీనో చూడండి\n        System.out.println(\"RADAR పాలిండ్రోమా?      : \" + pal.toString().equals(pal.reverse().toString()));\n\n        System.out.println(\"\n=== 2. StringBuilder vs నార్మల్ String స్పీడ్ టెస్ట్ ===\");\n        long start = System.currentTimeMillis();\n        StringBuilder fastBuilder = new StringBuilder();\n        for (int i = 1; i <= 10000; i++) {\n            fastBuilder.append(i);\n        }\n        long duration = System.currentTimeMillis() - start;\n        System.out.println(\"10,000 సార్లు కలపడానికి పట్టిన టైమ్ : \" + duration + \" ms (మిల్లీ సెకన్లు)\");\n        System.out.println(\"ఫైనల్ గా బఫర్ సైజు (Capacity)     : \" + fastBuilder.capacity());\n\n        System.out.println(\"\n=== 3. ప్రొఫెషనల్ String Formatting ===\");\n        String item = \"మెకానికల్ కీబోర్డ్\";\n        double price = 129.998;\n        int stock = 7;\n\n        String formattedRow = String.format(\"| %-20s | ధర: $%7.2f | స్టాక్: %03d |\", item, price, stock);\n        System.out.println(formattedRow);\n\n        System.out.println(\"\n=== 4. Modern Java Text Block (Java 15+) ===\");\n        String htmlTemplate = \"\"\"\n            <div class=\"user-card\">\n              <h3>%s</h3>\n              <p>స్టేటస్: <strong>%s</strong></p>\n            </div>\n            \"\"\".formatted(\"బాలాజీ రావు\", \"యాక్టివ్ డెవలపర్\");\n        System.out.println(htmlTemplate);\n    }\n}",
    "output": "=== 1. StringBuilder ఆపరేషన్స్ ===\nappend() వాడాక        : Java Programming 2026\ninsert() వాడాక        : Modern Java Programming 2026\nsetCharAt() వాడాక     : modern Java Programming 2026\ndelete() వాడాక        : Java Programming 2026\nRADAR పాలిండ్రోమా?      : true\n\n=== 2. StringBuilder vs నార్మల్ String స్పీడ్ టెస్ట్ ===\n10,000 సార్లు కలపడానికి పట్టిన టైమ్ : 2 ms (మిల్లీ సెకన్లు)\nఫైనల్ గా బఫర్ సైజు (Capacity)     : 39712\n\n=== 3. ప్రొఫెషనల్ String Formatting ===\n| మెకానికల్ కీబోర్డ్              | ధర: $ 130.00 | స్టాక్: 007 |\n\n=== 4. Modern Java Text Block (Java 15+) ===\n<div class=\"user-card\">\n  <h3>బాలాజీ రావు</h3>\n  <p>స్టేటస్: <strong>యాక్టివ్ డెవలపర్</strong></p>\n</div>",
    "lineByLine": [
      {
        "line": "sb.append(\" Programming\").append(\" 2026\");",
        "explanation": "ఇలా డాట్ పెట్టుకుంటూ కలుపుకుంటూ వెళ్లొచ్చు (దీన్నే Method Chaining అంటారు). ఇది చాలా ఫాస్ట్."
      },
      {
        "line": "pal.reverse();",
        "explanation": "మనం ఎలాంటి కష్టం పడకుండా జస్ట్ reverse() అని పిలవగానే మొత్తం టెక్స్ట్ ఉల్టా అయిపోతుంది."
      },
      {
        "line": "String.format(\"| %-20s | ధర: $%7.2f ...\")",
        "explanation": "%-20s అంటే 20 క్యారెక్టర్స్ కి సరిపడా స్పేస్ వదిలి లెఫ్ట్ సైడ్ పెడుతుంది, %.2f అంటే పాయింట్ తర్వాత 2 నంబర్స్ ఉంచుతుంది."
      },
      {
        "line": "htmlTemplate.formatted(...)",
        "explanation": "Java 15 లో వచ్చిన ఫీచర్. మల్టీ-లైన్ టెక్స్ట్ లో ఎక్కడెక్కడ %s ఉందో అక్కడికి మనం ఇచ్చిన డేటాని పంపుతుంది."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    public static void main(String[] args) {\n        // రియల్ టైమ్ సినారియో: బిల్లింగ్ ఇన్వాయిస్ జనరేట్ చేయడం\n        String[] products = {\"క్లౌడ్ సర్వర్\", \"SSL సర్టిఫికెట్\", \"డొమైన్ రిజిస్ట్రేషన్\"};\n        double[] prices = {149.50, 49.00, 14.99};\n        int[] quantities = {2, 1, 3};\n\n        StringBuilder invoice = new StringBuilder();\n        invoice.append(\"========================================================\\n\");\n        invoice.append(String.format(\" %-20s | %-6s | %-9s | %-10s\\n\", \"ఐటెమ్ పేరు\", \"క్వాంటిటీ\", \"ఒకటి ధర\", \"మొత్తం\"));\n        invoice.append(\"========================================================\\n\");\n\n        double grandTotal = 0;\n        for (int i = 0; i < products.length; i++) {\n            double total = prices[i] * quantities[i];\n            grandTotal += total;\n            // టేబుల్ ఫార్మాట్ లో యాడ్ చేస్తున్నాం\n            invoice.append(String.format(\" %-22s | %-9d | $%7.2f | $%8.2f\\n\",\n                    products[i], quantities[i], prices[i], total));\n        }\n\n        invoice.append(\"--------------------------------------------------------\\n\");\n        invoice.append(String.format(\" %-43s $%8.2f\\n\", \"గ్రాండ్ టోటల్:\", grandTotal));\n        invoice.append(\"========================================================\\n\");\n\n        System.out.println(invoice.toString());\n    }\n}",
    "practicalOutput": "========================================================\n ఐటెమ్ పేరు             | క్వాంటిటీ   | ఒకటి ధర      | మొత్తం     \n========================================================\n క్లౌడ్ సర్వర్                | 2         | $ 149.50 | $  299.00\n SSL సర్టిఫికెట్            | 1         | $  49.00 | $   49.00\n డొమైన్ రిజిస్ట్రేషన్           | 3         | $  14.99 | $   44.97\n--------------------------------------------------------\n గ్రాండ్ టోటల్:                                     $  392.97\n========================================================",
    "commonMistakes": [
      "లూప్ లోపల నార్మల్ గా `+` వాడి స్ట్రింగ్స్ ని కలపడం. అది యాప్ ని క్రాష్ చేసేంత మెమరీని లాగేసుకుంటుంది.",
      "రెండు StringBuilder లని `sb1.equals(sb2)` అని వాడటం. StringBuilder క్లాస్ లో equals మెథడ్ లేదు, కాబట్టి అది డైరెక్ట్ అడ్రెస్స్ లని చెక్ చేసి ఎప్పుడూ false ఇస్తుంది. కరెక్ట్ గా చేయాలంటే `sb1.toString().equals(sb2.toString())` అని వాడాలి.",
      "`%d` ని డెసిమల్ నంబర్స్ (double) కి వాడటం. ఇంటిజర్స్ కి `%d`, డబుల్/ఫ్లోట్ కి `%f` వాడాలి, రివర్స్ వాడితే ఎర్రర్ వస్తుంది."
    ],
    "challenge": "// Coding Challenge:\n// ఒక వాక్యాన్ని తీసుకోండి: \"Java is an amazing language\"\n// StringBuilder వాడి ప్రతి పదాన్ని అదే ప్లేస్ లో రివర్స్ చేయండి.\n// అవుట్పుట్: \"avaJ si na gnizama egaugnal\"\n\npublic class Challenge {\n    public static void main(String[] args) {\n        String sentence = \"Java is an amazing language\";\n        String[] words = sentence.split(\" \");\n        StringBuilder result = new StringBuilder();\n\n        for (int i = 0; i < words.length; i++) {\n            StringBuilder wordBuilder = new StringBuilder(words[i]);\n            result.append(wordBuilder.reverse());\n            if (i < words.length - 1) {\n                result.append(\" \");\n            }\n        }\n\n        System.out.println(\"ఒరిజినల్ : \" + sentence);\n        System.out.println(\"రివర్స్   : \" + result.toString());\n    }\n}",
    "faq": [
      {
        "q": "StringBuilder కి StringBuffer కి తేడా ఏంటి?",
        "a": "రెండూ ఒకేలాగా పనిచేస్తాయి. కానీ StringBuffer లో లాక్స్ ఉంటాయి (Synchronized), ఇది పాతది, స్లో గా ఉంటుంది. సింగిల్ త్రెడ్ లో వాడేటప్పుడు ఎప్పుడూ ఫాస్ట్ గా ఉండే StringBuilder మాత్రమే వాడాలి."
      },
      {
        "q": "నార్మల్ గా a + b + c రాస్తే కంపైలర్ ఏమైనా ఆప్టిమైజ్ చేస్తుందా?",
        "a": "అవును, ఒకే లైన్ లో రాస్తే కంపైలర్ దాన్ని ఆటోమాటిక్ గా StringBuilder కింద మారుస్తుంది. కానీ లూప్ లోపల వాడినప్పుడు మాత్రం ఆప్టిమైజ్ చేయలేదు, అందుకే లూప్స్ కి మనమే మ్యాన్యువల్ గా రాయాలి."
      }
    ],
    "recap": [
      "లూప్స్ లో స్ట్రింగ్స్ ని కలపడానికి ఎప్పుడూ StringBuilder ఏ వాడాలి (చాలా ఫాస్ట్).",
      "StringBuilder లో append(), insert(), delete(), reverse() లాంటి మంచి ఫీచర్స్ ఉన్నాయి.",
      "టేబుల్స్ లాగా నీట్ గా చూపించడానికి String.format() వాడుతారు.",
      "మల్టీ-లైన్ టెక్స్ట్ కి, HTML కి Java 15 లో వచ్చిన 3 కొటేషన్స్ (\"\"\") బెస్ట్ ఆప్షన్."
    ]
  },
  {
    "num": 27,
    "phaseId": "phase6",
    "phaseTitle": "Phase 6: Strings & Text Processing",
    "slug": "27-java-strings-capstone-projects",
    "title": "Java Strings Capstone Projects: 5 Production-Grade Systems (తెలుగులో)",
    "badge": "27. Capstone Projects (5)",
    "subtopics": "Project 1: Palindrome Checker · Project 2: Word Counter & Text Stats · Project 3: Character & Frequency Analyzer · Project 4: Enterprise Username Validator · Project 5: Password Security & Entropy Evaluator",
    "readTime": "30 min read",
    "intro": "ఇప్పటిదాకా స్ట్రింగ్స్ మీద నేర్చుకున్న కాన్సెప్ట్స్ అన్నీ కలిపి 5 రియల్-వరల్డ్ ప్రాజెక్ట్స్ చేద్దాం: పాలిండ్రోమ్ చెక్కర్, టెక్స్ట్ ఎనలైజర్, క్యారెక్టర్ ఫ్రీక్వెన్సీ, ఎంటర్ప్రైజ్ యూజర్ నేమ్ వాలిడేటర్, మరియు పాస్వర్డ్ స్ట్రెంత్ క్యాలిక్యులేటర్. ఇవి టెక్నికల్ ఇంటర్వ్యూస్ లో ఎక్కువగా అడిగే మోస్ట్ ఇంపార్టెంట్ ప్రాజెక్ట్స్.",
    "theorySections": [
      {
        "heading": "1. ఈ 5 క్యాప్-స్టోన్ ప్రాజెక్ట్స్ ఏంటి?",
        "content": "ఈ చాప్టర్ లో మనం Phase 6 మొత్తాన్ని (Immutability, Methods, Regex, StringBuilder అన్నీ) రియల్-వరల్డ్ కు అప్లై చేస్తున్నాం:\n\n1. **ప్రాజెక్ట్ 1: టూ-పాయింటర్ పాలిండ్రోమ్ (Two-Pointer Palindrome):**\nపదాన్ని రివర్స్ చేసినా సేమ్ వస్తుందో లేదో చెక్ చేస్తుంది. కానీ స్పేస్ లు, స్పెషల్ క్యారెక్టర్స్ వదిలేసి కేవలం లెటర్స్ ని మాత్రమే ఫాస్ట్ గా (O(N) స్పీడ్ లో) మెమరీ వేస్ట్ చేయకుండా చెక్ చేస్తుంది.\n\n2. **ప్రాజెక్ట్ 2: వర్డ్ కౌంటర్ & టెక్స్ట్ స్టాటిస్టిక్స్:**\nఒక పెద్ద డాక్యుమెంట్ ఇస్తే.. అందులో ఎన్ని పదాలున్నాయి, క్యారెక్టర్స్ ఎన్ని, ఆవరేజ్ పదం సైజు ఎంత లాంటివి కౌంట్ చేస్తుంది.\n\n3. **ప్రాజెక్ట్ 3: క్యారెక్టర్ ఫ్రీక్వెన్సీ ఎనలైజర్:**\nఅచ్చుల (Vowels) సంఖ్య, హల్లుల (Consonants) సంఖ్య, నంబర్స్, స్పెషల్ క్యారెక్టర్స్ ఎన్ని ఉన్నాయో కేటగిరీల వారీగా డివైడ్ చేస్తుంది.\n\n4. **ప్రాజెక్ట్ 4: ఎంటర్ప్రైజ్ యూజర్ నేమ్ వాలిడేటర్:**\nకంపెనీ యాప్స్ లో యూజర్ నేమ్ ఎలా పడితే అలా ఇవ్వడానికి కుదరదు. లెంత్ 5-20 ఉండాలి, నంబర్ తో స్టార్ట్ అవ్వకూడదు, `admin`, `root` లాంటి పేర్లు పెట్టుకోకూడదు. వీటన్నింటినీ చెక్ చేసే సిస్టమ్ ఇది.\n\n5. **ప్రాజెక్ట్ 5: అడ్వాన్స్డ్ పాస్వర్డ్ సెక్యూరిటీ చెక్కర్:**\nయూజర్ పెట్టిన పాస్వర్డ్ స్ట్రాంగ్ గా ఉందో లేదో (0-100) స్కోర్ ఇస్తుంది. క్యాపిటల్స్, స్మాల్స్, స్పెషల్ క్యారెక్టర్స్ ఉన్నాయా? డిక్షనరీ లోని కామన్ పాస్వర్డ్స్ పెట్టారా అని మొత్తం చెక్ చేస్తుంది."
      },
      {
        "heading": "2. స్ట్రింగ్ అల్గారిథమ్స్ - మైండ్ సెట్",
        "content": "```\n  ప్రాజెక్ట్ 1 లాజిక్ (టూ-పాయింటర్ పాలిండ్రోమ్):\n  లెఫ్ట్ (i=0) -> [A] m a n a p l a n a c a n a l p a n a m [a] <- రైట్ (j=len-1)\n                         |                                       |\n                         +----------------(మ్యాచ్ అయ్యింది!)---------------+\n  అక్షరాలు కాకపోతే స్కిప్ చేసి, రెండు పాయింటర్స్ ని దగ్గరకి తీసుకువస్తూ చెక్ చేయాలి.\n\n  ప్రాజెక్ట్ 5 లాజిక్ (పాస్వర్డ్ స్కోర్):\n  + లెంత్ >= 8 (+15 పాయింట్స్), లెంత్ >= 12 (+25 పాయింట్స్)\n  + క్యాపిటల్స్ (+15), స్మాల్స్ (+15)\n  + నంబర్స్ (+15), స్పెషల్ క్యారెక్టర్స్ (+15)\n  - బ్లాక్ లిస్ట్ లో ఉన్న పాస్వర్డ్ పెడితే (-40 పాయింట్స్ కట్)\n  ======================================================\n  స్కోర్: 0-40 (వీక్) | 41-70 (మీడియం) | 71-100 (స్ట్రాంగ్)\n```"
      }
    ],
    "codeExample": "public class Main {\n    // -------------------------------------------------------------\n    // ప్రాజెక్ట్ 1: పాలిండ్రోమ్ చెక్కర్ (కొత్త మెమరీ వాడకుండా సూపర్ ఫాస్ట్ గా)\n    // -------------------------------------------------------------\n    public static boolean isPalindrome(String input) {\n        if (input == null) return false;\n        int left = 0;\n        int right = input.length() - 1;\n\n        while (left < right) {\n            char lChar = input.charAt(left);\n            char rChar = input.charAt(right);\n\n            // అక్షరం లేదా నంబర్ కాకపోతే స్కిప్ చేస్తాం\n            if (!Character.isLetterOrDigit(lChar)) {\n                left++;\n            } else if (!Character.isLetterOrDigit(rChar)) {\n                right--;\n            } else {\n                // స్మాల్ లెటర్స్ కి మార్చి చెక్ చేస్తున్నాం\n                if (Character.toLowerCase(lChar) != Character.toLowerCase(rChar)) {\n                    return false;\n                }\n                left++;\n                right--;\n            }\n        }\n        return true;\n    }\n\n    // -------------------------------------------------------------\n    // ప్రాజెక్ట్ 2: వర్డ్ కౌంటర్ & టెక్స్ట్ స్టాటిస్టిక్స్\n    // -------------------------------------------------------------\n    public static void printTextStatistics(String text) {\n        if (text == null || text.isBlank()) return;\n\n        String[] words = text.trim().split(\"\\\\s+\"); // స్పేస్ లతో ముక్కలు చేస్తున్నాం\n        int totalCharsWithSpaces = text.length();\n        int totalCharsNoSpaces = text.replace(\" \", \"\").replace(\"\\n\", \"\").replace(\"\\t\", \"\").length();\n        String[] sentences = text.split(\"[.!?]+\");\n\n        int totalWordLength = 0;\n        String longestWord = \"\";\n        for (String w : words) {\n            String cleanWord = w.replaceAll(\"[^a-zA-Z0-9]\", \"\");\n            totalWordLength += cleanWord.length();\n            if (cleanWord.length() > longestWord.length()) {\n                longestWord = cleanWord;\n            }\n        }\n        double avgWordLength = words.length > 0 ? (double) totalWordLength / words.length : 0;\n\n        System.out.println(\"  మొత్తం పదాలు           : \" + words.length);\n        System.out.println(\"  క్యారెక్టర్స్ (స్పేస్ తో)  : \" + totalCharsWithSpaces);\n        System.out.println(\"  క్యారెక్టర్స్ (స్పేస్ లేకుండా) : \" + totalCharsNoSpaces);\n        System.out.println(\"  వాక్యాలు (Sentences)   : \" + sentences.length);\n        System.out.println(\"  అతిపెద్ద పదం           : \" + longestWord + \" (\" + longestWord.length() + \" అక్షరాలు)\");\n        System.out.printf(\"  ఆవరేజ్ పదం సైజు        : %.2f అక్షరాలు%n\", avgWordLength);\n    }\n\n    // -------------------------------------------------------------\n    // ప్రాజెక్ట్ 3: క్యారెక్టర్ కేటగిరీ ఎనలైజర్\n    // -------------------------------------------------------------\n    public static void analyzeCharacterFrequencies(String text) {\n        int vowels = 0, consonants = 0, digits = 0, special = 0, spaces = 0;\n\n        for (int i = 0; i < text.length(); i++) {\n            char ch = text.charAt(i);\n\n            if (Character.isDigit(ch)) {\n                digits++;\n            } else if (Character.isWhitespace(ch)) {\n                spaces++;\n            } else if (Character.isLetter(ch)) {\n                char lower = Character.toLowerCase(ch);\n                if (lower == 'a' || lower == 'e' || lower == 'i' || lower == 'o' || lower == 'u') {\n                    vowels++;\n                } else {\n                    consonants++;\n                }\n            } else {\n                special++;\n            }\n        }\n\n        System.out.println(\"  అచ్చులు (Vowels)       : \" + vowels);\n        System.out.println(\"  హల్లులు (Consonants)   : \" + consonants);\n        System.out.println(\"  నంబర్స్ (Digits)       : \" + digits);\n        System.out.println(\"  స్పేస్ లు (Spaces)      : \" + spaces);\n        System.out.println(\"  స్పెషల్ క్యారెక్టర్స్       : \" + special);\n    }\n\n    // -------------------------------------------------------------\n    // ప్రాజెక్ట్ 4: ఎంటర్ప్రైజ్ యూజర్ నేమ్ వాలిడేటర్\n    // -------------------------------------------------------------\n    public static boolean validateUsername(String username) {\n        if (username == null) return false;\n        String clean = username.trim();\n\n        // రూల్ 1: సైజు 5 నుంచి 20 మధ్యలో ఉండాలి\n        if (clean.length() < 5 || clean.length() > 20) return false;\n\n        // రూల్ 2: నంబర్ తో స్టార్ట్ అవ్వకూడదు\n        if (!Character.isLetter(clean.charAt(0))) return false;\n\n        // రూల్ 3: కేవలం ఇంగ్లీష్ అక్షరాలు, నంబర్స్, అండర్ స్కోర్ మాత్రమే ఉండాలి\n        if (!clean.matches(\"^[a-zA-Z0-9_]+$\")) return false;\n\n        // రూల్ 4: ఇవి పెట్టుకోకూడదు (Blacklist)\n        String lower = clean.toLowerCase();\n        String[] reserved = {\"admin\", \"root\", \"system\", \"administrator\", \"null\", \"superuser\"};\n        for (String r : reserved) {\n            if (lower.equals(r)) return false;\n        }\n\n        return true;\n    }\n\n    // -------------------------------------------------------------\n    // ప్రాజెక్ట్ 5: పాస్వర్డ్ స్ట్రెంత్ ఎనలైజర్ (0-100 స్కోర్)\n    // -------------------------------------------------------------\n    public static String evaluatePasswordStrength(String password) {\n        if (password == null || password.length() < 6) return \"CRITICAL: చాలా చిన్నగా ఉంది (Score: 0/100)\";\n\n        int score = 0;\n        if (password.length() >= 8) score += 15;\n        if (password.length() >= 12) score += 15;\n        if (password.length() >= 16) score += 10;\n\n        boolean hasUpper = false, hasLower = false, hasDigit = false, hasSpecial = false;\n        for (char ch : password.toCharArray()) {\n            if (Character.isUpperCase(ch)) hasUpper = true;\n            else if (Character.isLowerCase(ch)) hasLower = true;\n            else if (Character.isDigit(ch)) hasDigit = true;\n            else hasSpecial = true;\n        }\n\n        if (hasUpper) score += 15;\n        if (hasLower) score += 15;\n        if (hasDigit) score += 15;\n        if (hasSpecial) score += 15;\n\n        // కామన్ పాస్వర్డ్స్ ఇస్తే స్కోర్ తగ్గిస్తాం\n        String[] commonWeak = {\"password\", \"12345678\", \"qwerty\", \"admin123\", \"password123\"};\n        for (String weak : commonWeak) {\n            if (password.toLowerCase().contains(weak)) {\n                score = Math.max(0, score - 40); // 40 పాయింట్స్ కట్\n            }\n        }\n\n        String rating = score >= 80 ? \"స్ట్రాంగ్ 🟢\" : (score >= 50 ? \"మీడియం 🟡\" : \"వీక్ 🔴\");\n        return String.format(\"%s (స్కోర్: %d/100)\", rating, score);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== ప్రాజెక్ట్ 1: పాలిండ్రోమ్ చెక్కర్ ===\");\n        String p1 = \"A man, a plan, a canal: Panama\";\n        String p2 = \"Java Programming\";\n        System.out.println(\"\"\" + p1 + \"\" పాలిండ్రోమా? -> \" + isPalindrome(p1)); // true\n        System.out.println(\"\"\" + p2 + \"\" పాలిండ్రోమా? -> \" + isPalindrome(p2)); // false\n\n        System.out.println(\"\n=== ప్రాజెక్ట్ 2: వర్డ్ కౌంటర్ & టెక్స్ట్ స్టాటిస్టిక్స్ ===\");\n        String article = \"Java is a powerful, multi-threaded programming language! It enables robust enterprise systems. Java 21 LTS is blazing fast.\";\n        printTextStatistics(article);\n\n        System.out.println(\"\n=== ప్రాజెక్ట్ 3: క్యారెక్టర్ ఎనలైజర్ ===\");\n        analyzeCharacterFrequencies(\"Java 21 LTS Released on Sep 2023! #1 Backend\");\n\n        System.out.println(\"\n=== ప్రాజెక్ట్ 4: యూజర్ నేమ్ వాలిడేటర్ ===\");\n        String[] testUsers = {\"ravi_kumar\", \"admin\", \"99developer\", \"alex_dev_2026\", \"a\"};\n        for (String u : testUsers) {\n            System.out.printf(\"యూజర్: %-16s | కరెక్టేనా?: %b%n\", u, validateUsername(u));\n        }\n\n        System.out.println(\"\n=== ప్రాజెక్ట్ 5: పాస్వర్డ్ స్ట్రెంత్ ఎనలైజర్ ===\");\n        String[] testPasswords = {\"pass\", \"password123\", \"Java2026\", \"J@v4_Str0ng_P@ssw0rd!#2026\"};\n        for (String pwd : testPasswords) {\n            System.out.printf(\"పాస్వర్డ్: %-26s | %s%n\", pwd, evaluatePasswordStrength(pwd));\n        }\n    }\n}",
    "output": "=== ప్రాజెక్ట్ 1: పాలిండ్రోమ్ చెక్కర్ ===\n\"A man, a plan, a canal: Panama\" పాలిండ్రోమా? -> true\n\"Java Programming\" పాలిండ్రోమా? -> false\n\n=== ప్రాజెక్ట్ 2: వర్డ్ కౌంటర్ & టెక్స్ట్ స్టాటిస్టిక్స్ ===\n  మొత్తం పదాలు           : 17\n  క్యారెక్టర్స్ (స్పేస్ తో)  : 120\n  క్యారెక్టర్స్ (స్పేస్ లేకుండా) : 104\n  వాక్యాలు (Sentences)   : 3\n  అతిపెద్ద పదం           : multi-threaded (14 అక్షరాలు)\n  ఆవరేజ్ పదం సైజు        : 5.76 అక్షరాలు\n\n=== ప్రాజెక్ట్ 3: క్యారెక్టర్ ఎనలైజర్ ===\n  అచ్చులు (Vowels)       : 10\n  హల్లులు (Consonants)   : 17\n  నంబర్స్ (Digits)       : 7\n  స్పేస్ లు (Spaces)      : 7\n  స్పెషల్ క్యారెక్టర్స్       : 3\n\n=== ప్రాజెక్ట్ 4: యూజర్ నేమ్ వాలిడేటర్ ===\nయూజర్: ravi_kumar       | కరెక్టేనా?: true\nయూజర్: admin            | కరెక్టేనా?: false\nయూజర్: 99developer      | కరెక్టేనా?: false\nయూజర్: alex_dev_2026    | కరెక్టేనా?: true\nయూజర్: a                | కరెక్టేనా?: false\n\n=== ప్రాజెక్ట్ 5: పాస్వర్డ్ స్ట్రెంత్ ఎనలైజర్ ===\nపాస్వర్డ్: pass                       | CRITICAL: చాలా చిన్నగా ఉంది (Score: 0/100)\nపాస్వర్డ్: password123                | వీక్ 🔴 (స్కోర్: 20/100)\nపాస్వర్డ్: Java2026                   | మీడియం 🟡 (స్కోర్: 60/100)\nపాస్వర్డ్: J@v4_Str0ng_P@ssw0rd!#2026 | స్ట్రాంగ్ 🟢 (స్కోర్: 100/100)",
    "lineByLine": [
      {
        "line": "while (left < right)",
        "explanation": "టూ-పాయింటర్ టెక్నిక్. ఒకటి స్టార్టింగ్ నుంచి ఇంకోటి ఎండింగ్ నుంచి వస్తూ, సగం వరకు (రెండూ క్రాస్ అయ్యేదాక) మాత్రమే చెక్ చేస్తాయి."
      },
      {
        "line": "text.trim().split(\"\\\\s+\");",
        "explanation": "రెండు మూడు స్పేస్ లు పక్కపక్కనే ఉన్నా సరే వాటిని ఇగ్నోర్ చేసి వర్డ్స్ ని మాత్రమే పర్ఫెక్ట్ గా కట్ చేస్తుంది (Regex)."
      },
      {
        "line": "clean.matches(\"^[a-zA-Z0-9_]+$\");",
        "explanation": "యూజర్ నేమ్ లో వీటికన్నా వేరే ఏ పిచ్చి క్యారెక్టర్స్ ఉన్నా రిజెక్ట్ చేయడానికి రాసిన Regex రూల్ ఇది."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    public static void main(String[] args) {\n        // రియల్ టైమ్ యాప్: యూజర్ రిజిస్ట్రేషన్ గేట్ వే\n        String candidateUser = \"kavya_developer\";\n        String candidatePass = \"K@vy4_Secur3_2026!\";\n\n        System.out.println(\"=== అకౌంట్ క్రియేషన్ సెక్యూరిటీ గేట్ ===\");\n        boolean isUserOk = Main.validateUsername(candidateUser);\n        String passResult = Main.evaluatePasswordStrength(candidatePass);\n\n        System.out.println(\"యూజర్ నేమ్ చెక్ : \" + (isUserOk ? \"పాస్ అయ్యింది ✅\" : \"రిజెక్ట్ అయ్యింది ❌\"));\n        System.out.println(\"పాస్వర్డ్ చెక్ : \" + passResult);\n\n        if (isUserOk && passResult.contains(\"స్ట్రాంగ్\")) {\n            System.out.println(\"ఫైనల్ స్టేటస్   : అకౌంట్ సక్సెస్ ఫుల్ గా క్రియేట్ అయ్యింది 🎉\");\n        } else {\n            System.out.println(\"ఫైనల్ స్టేటస్   : ఫెయిల్ అయ్యింది. మళ్ళీ ట్రై చేయండి ❌\");\n        }\n    }\n}",
    "practicalOutput": "=== అకౌంట్ క్రియేషన్ సెక్యూరిటీ గేట్ ===\nయూజర్ నేమ్ చెక్ : పాస్ అయ్యింది ✅\nపాస్వర్డ్ చెక్ : స్ట్రాంగ్ 🟢 (స్కోర్: 100/100)\nఫైనల్ స్టేటస్   : అకౌంట్ సక్సెస్ ఫుల్ గా క్రియేట్ అయ్యింది 🎉",
    "commonMistakes": [
      "`split(\" \")` వాడటం. ఇలా రాస్తే ఒకవేళ యూజర్ రెండు మూడు స్పేస్ లు ఇస్తే, వాటిని కూడా పదాలుగా కౌంట్ చేస్తుంది. ఎప్పుడూ `split(\"\\\\s+\")` వాడాలి.",
      "పాస్వర్డ్ కరెక్టేనా అని చూడటానికి జస్ట్ లెంత్ ఒక్కటే చెక్ చేయడం. హ్యాకర్స్ కామన్ పాస్వర్డ్స్ (dictionary attack) తో ఈజీగా హ్యాక్ చేస్తారు, అందుకే బ్లాక్ లిస్ట్ చెక్ కచ్చితంగా ఉండాలి.",
      "పాలిండ్రోమ్ కోసం ముందు `reverse()` చేసి ఆ తర్వాత `equals()` వాడటం. ఇది చిన్న పదాలకు ఓకే, కానీ పెద్ద పారాగ్రాఫ్ ఇస్తే మెమరీ మొత్తం లాగేసుకుంటుంది. టూ-పాయింటర్ పద్ధతే బెస్ట్."
    ],
    "challenge": "// Coding Challenge:\n// ఇంకో సెక్యూరిటీ మెథడ్ రాయండి: sanitizePhoneNumber(String phone)\n// 1. ఫోన్ నంబర్ ఎలా ఇచ్చినా సరే: \"+1 (555) 234-5678\", \"555.234.5678\", \"555 234 5678\"\n// 2. అందులో ఉన్న నంబర్స్ మాత్రమే బయటికి తీయాలి.\n// 3. దాన్ని పర్ఫెక్ట్ ఫార్మాట్ లో: \"+1-555-234-5678\" అని మార్చి రిటర్న్ చేయాలి.\n\npublic class Challenge {\n    public static String sanitizePhoneNumber(String phone) {\n        // అంకెల (0-9) కి మినహా మిగతా ఏమున్నా తీసేస్తున్నాం\n        String digits = phone.replaceAll(\"[^0-9]\", \"\");\n        if (digits.length() == 10) {\n            digits = \"1\" + digits; // కంట్రీ కోడ్ లేకపోతే కలుపుతున్నాం\n        }\n        if (digits.length() == 11) {\n            return String.format(\"+%s-%s-%s-%s\",\n                digits.substring(0, 1),\n                digits.substring(1, 4),\n                digits.substring(4, 7),\n                digits.substring(7, 11));\n        }\n        return \"ఇన్వాలిడ్ ఫోన్ నంబర్\";\n    }\n\n    public static void main(String[] args) {\n        System.out.println(sanitizePhoneNumber(\"+1 (555) 234-5678\"));\n        System.out.println(sanitizePhoneNumber(\"555.234.5678\"));\n    }\n}",
    "faq": [
      {
        "q": "StringBuilder.reverse() వదిలేసి టూ-పాయింటర్ పద్ధతి ఎందుకు వాడాలి?",
        "a": "టూ-పాయింటర్ పద్ధతి ఏ కొత్త మెమరీ తీసుకోకుండా (O(1) స్పేస్), ఉన్నదానిలోనే ఫాస్ట్ గా చెక్ చేస్తుంది. రివర్స్ చేయడం అంటే కొత్త స్ట్రింగ్ క్రియేట్ చేయాల్సి వస్తుంది, దానివల్ల యాప్ స్లో అవుతుంది."
      },
      {
        "q": "పాస్వర్డ్ లో బ్లాక్ లిస్ట్ ఎందుకు చెక్ చేయాలి?",
        "a": "ఉదాహరణకి ఒకడు \"passwordpassword\" అని 16 అక్షరాలు ఇచ్చాడనుకో. లెంత్ కరెక్టే ఉంది కదా అని మనం పాస్ చేస్తే, దాన్ని హ్యాకర్స్ మిల్లీ సెకన్లలో హ్యాక్ చేస్తారు. అందుకే కామన్ గా వాడే పదాలను బ్లాక్ చేయాలి."
      }
    ],
    "recap": [
      "టూ-పాయింటర్ అల్గారిథమ్స్ వాడి స్ట్రింగ్స్ ని మెమరీ వేస్ట్ లేకుండా చాలా ఫాస్ట్ గా చెక్ చేయొచ్చు.",
      "Regex (\\\\s+ మరియు [^a-zA-Z0-9]) వాడితే యూజర్ ఇచ్చే చెత్త డేటాని ఈజీగా క్లీన్ చేయొచ్చు.",
      "యూజర్ నేమ్ వాలిడేషన్ కి లెంత్ తో పాటు బ్లాక్ లిస్ట్ రూల్స్ కూడా పెట్టాలి.",
      "పాస్వర్డ్ స్ట్రెంత్ అనేది కేవలం లెంత్ మీద ఆధారపడి ఉండదు, అందులో ఉన్న క్యాపిటల్స్, స్పెషల్ సింబల్స్ ని బట్టి స్కోర్ ఇవ్వాలి."
    ]
  }
];
