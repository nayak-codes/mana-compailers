// Phase 2: Variables & Data Types (Chapters 6 to 9)
// Exhaustive conceptual theory, memory model diagrams, stack vs heap, type casting, and runnable code examples.

module.exports = [
  // ==========================================
  // CHAPTER 6: Java Variables, Declaration & Memory Model
  // ==========================================
  {
    num: 6,
    phaseId: 'phase2',
    phaseTitle: 'Phase 2: Variables & Data Types',
    slug: '06-java-variables-declaration-and-memory-model',
    title: 'Java Variables, Declaration & Memory Allocation (తెలుగులో)',
    badge: '6. Variables & Memory',
    subtopics: 'What is a Variable? · Declaration vs Initialization vs Assignment · Strong Static Typing · JVM Stack vs Heap Memory Model',
    readTime: '15 min read',
    intro: 'జావాలో వేరియబుల్స్ (Variables) అంటే ఏంటి? వాటికి మెమరీ ఎలా క్రియేట్ అవుతుంది? జావా స్ట్రిక్ట్ గా డేటా టైప్స్ ని ఎందుకు ఫాలో అవుతుంది? మరియు ఇంటర్నల్ గా JVM Stack మెమరీకీ, Heap మెమరీకీ ఉన్న తేడా ఏంటో ఈ చాప్టర్ లో డీటెయిల్డ్ గా నేర్చుకుందాం.',
    theorySections: [
      {
        heading: '1. వేరియబుల్ (Variable) అంటే ఏంటి? (మెమరీ కాన్సెప్ట్)',
        content: `**వేరియబుల్ (Variable)** అంటే సింపుల్ గా చెప్పాలంటే కంప్యూటర్ RAM (మెమరీ) లో కొంత స్పేస్ ని రిజర్వ్ చేసుకుని, దానికి ఒక పేరు పెట్టుకోవడం. అందులో మనం డేటాని స్టోర్ చేసుకోవచ్చు.

జావాలో మీరు ఒక వేరియబుల్ క్రియేట్ చేయగానే.. JVM ఆ డేటా టైప్ ని బట్టి మెమరీలో ఒక బాక్స్ ని (కొన్ని బైట్స్ ని) క్రియేట్ చేసి, దానికి మీరు పెట్టిన పేరు పెడుతుంది.

### వేరియబుల్ క్రియేట్ చేయడంలో 3 స్టెప్స్:
1. **Declaration (డిక్లరేషన్):** నేను ఫలానా పేరుతో, ఫలానా డేటా టైప్ తో వేరియబుల్ క్రియేట్ చేస్తున్నా అని కంపైలర్ కి చెప్పడం. (ఇక్కడ వాల్యూ ఇవ్వము).
   \`\`\`java
   int accountBalance; // డిక్లరేషన్: మెమరీలో 4 బైట్స్ రిజర్వ్ అవుతాయి
   \`\`\`
2. **Initialization (ఇనిషియలైజేషన్):** ఆ క్రియేట్ చేసిన వేరియబుల్ కి ఫస్ట్ టైమ్ వాల్యూ ఇవ్వడం.
   \`\`\`java
   accountBalance = 50000; // ఇనిషియలైజేషన్
   \`\`\`
3. **Combined (కలిపి రాయడం):** జావాలో అందరూ ఎక్కువగా ఒకే లైన్ లో రాస్తుంటారు.
   \`\`\`java
   int accountBalance = 50000; // డిక్లరేషన్ + ఇనిషియలైజేషన్
   \`\`\`
4. **Re-assignment (మార్చడం):** ఆల్రెడీ ఉన్న వాల్యూ తీసేసి కొత్త వాల్యూ పెట్టడం.
   \`\`\`java
   accountBalance = 75000; // పాత 50000 పోయి కొత్తది స్టోర్ అవుతుంది
   \`\`\``
      },
      {
        heading: '2. స్ట్రాంగ్ స్టాటిక్ టైపింగ్ (Strong Static Typing) అంటే ఏంటి?',
        content: `జావా అనేది ఒక **Statically-Typed** మరియు **Strongly-Typed** లాంగ్వేజ్:
- **Statically-Typed:** అంటే కోడ్ రాసేటప్పుడే అది నంబరా? టెక్స్టా? డెసిమలా? అనేది (Data Type) ముందే చెప్పాలి. ఒకసారి \`int\` అని చెప్తే, అందులో టెక్స్ట్ పెట్టడానికి ట్రై చేస్తే ఒప్పుకోదు.
- **Strongly-Typed:** వేరే డేటా టైప్ ఇస్తే కంపైలర్ ఎర్రర్ ఇచ్చేస్తుంది. జావా చాలా స్ట్రిక్ట్.

\`\`\`java
int userAge = 25;       // కరెక్ట్
// userAge = "Twenty-Five"; // COMPILE ERROR: జావాలో టెక్స్ట్ ని int లో స్టోర్ చేయలేరు!
\`\`\`

### జావా అంత స్ట్రిక్ట్ గా ఎందుకు ఉంటుంది?:
1. **Zero Runtime Type Crashes:** Python, JS లాంటి లాంగ్వేజెస్ లో లాగా మధ్యలో డేటా టైప్ మారిపోయి యాప్ క్రాష్ అయ్యే ఛాన్స్ ఉండదు. కంపైల్ చేసేటప్పుడే ఎర్రర్స్ పట్టుకుంటుంది.
2. **స్మార్ట్ సజెషన్స్:** మీ కోడ్ ఎడిటర్ (IDE) కి ఏ వేరియబుల్ లో ఏముందో పక్కాగా తెలుస్తుంది కాబట్టి, మీకు సూపర్ ఫాస్ట్ గా సజెషన్స్ ఇస్తుంది.
3. **మెమరీ ప్లానింగ్:** ముందే డేటా టైప్ చెప్పడం వల్ల, దానికి ఎంత మెమరీ కావాలో JVM ముందే క్యాలిక్యులేట్ చేసుకోగలుగుతుంది.`
      },
      {
        heading: '3. JVM మెమరీ మోడల్: Stack vs Heap Memory',
        content: `జావాలో వేరియబుల్స్ స్టోర్ అవ్వడానికి RAM లో 2 రకాల మెమరీ ఏరియాలు ఉంటాయి. ఇది తెలియడం చాలా ఇంపార్టెంట్:

\`\`\`
+-----------------------------------------------------------------------------------+
|                        JVM STACK MEMORY vs HEAP MEMORY                            |
+-----------------------------------------------------------------------------------+
|  STACK MEMORY (ఫాస్ట్ గా ఉంటుంది, ఫంక్షన్ అయిపోగానే క్లీన్ అవుతుంది)                     |
|  +-----------------------------------------------------------------------------+  |
|  |  main() ఫంక్షన్ కోసం:                                                        |  |
|  |    int age = 21;                 (డైరెక్ట్ గా స్టాక్ లోనే సేవ్ అవుతుంది)               |  |
|  |    double salary = 85000.50;     (ఇది కూడా స్టాక్ లోనే ఉంటుంది)                   |  |
|  |    boolean isStudent = true;     (ఇది కూడా స్టాక్ లోనే)                         |  |
|  |    String name = 0x4F2A; --------+ (ఇది స్ట్రింగ్ కాబట్టి, అసలు వాల్యూ ఎక్కడుందో దారి చూపిస్తుంది)|  |
|  |    int[] scores = 0x8B1C; -------|---+ (అర్రే కూడా అంతే, దారి (Address) మాత్రమే స్టాక్ లో ఉంటుంది) |  |
|  +----------------------------------|---|--------------------------------------+  |
+-------------------------------------|---|-----------------------------------------+
|  HEAP MEMORY (ఆబ్జెక్ట్స్ అన్నీ ఇక్కడే ఉంటాయి, గ్యార్బేజ్ కలెక్టర్ క్లీన్ చేస్తుంది)             |
|  +----------------------------------|---|--------------------------------------+  |
|  |  Address: 0x4F2A                 v   |                                      |  |
|  |  [ String Object: "Balaji" ] <-------+ (అసలు స్ట్రింగ్ డేటా ఇక్కడ ఉంటుంది)           |  |
|  |                                                                             |  |
|  |  Address: 0x8B1C                     v                                      |  |
|  |  [ Array Object: { 85, 90, 78 } ]<-----------------------------------------+  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
\`\`\`

- **Stack Memory:** సింపుల్ డేటా టైప్స్ (\`int\`, \`double\`, \`char\`, \`boolean\`) అన్నీ డైరెక్ట్ గా స్టాక్ లోనే సేవ్ అవుతాయి. ఫంక్షన్ పని అవ్వగానే స్టాక్ ఆటోమాటిక్ గా క్లీన్ అయిపోతుంది.
- **Heap Memory:** కొంచెం పెద్దవి అయిన ఆబ్జెక్ట్స్, స్ట్రింగ్స్, అర్రేస్ (Arrays) లాంటివి Heap లో సేవ్ అవుతాయి. వాడని ఆబ్జెక్ట్స్ ని Garbage Collector ఆటోమాటిక్ గా క్లీన్ చేస్తుంది.`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // వేరియబుల్స్ ని క్రియేట్ చేయడం
        String name = "Ravi";     // ఇది Heap లో సేవ్ అవుతుంది
        int age = 21;             // ఇది Stack లో ఉంటుంది
        double height = 5.8;      // Stack
        char grade = 'A';         // Stack
        boolean isStudent = true; // Stack

        // వాటిని ప్రింట్ చేయడం
        System.out.println("పేరు        : " + name);
        System.out.println("వయసు        : " + age);
        System.out.println("ఎత్తు       : " + height);
        System.out.println("గ్రేడ్       : " + grade);
        System.out.println("స్టూడెంటా?    : " + isStudent);
    }
}`,
    output: `పేరు        : Ravi
వయసు        : 21
ఎత్తు       : 5.8
గ్రేడ్       : A
స్టూడెంటా?    : true`,
    lineByLine: [
      { line: 'String name = "Ravi";', explanation: 'ఇది Reference డేటా టైప్. అంటే ఆ "Ravi" అనే పేరు Heap మెమరీలో సేవ్ అయ్యి.. దాని అడ్రెస్ (లింక్) మాత్రం name అనే వేరియబుల్ ద్వారా Stack లో ఉంటుంది.' },
      { line: 'int age = 21;', explanation: 'ఇది Primitive (సింపుల్) డేటా టైప్. దీనికి 4 బైట్స్ మెమరీ డైరెక్ట్ గా Stack లోనే అలోకేట్ అయ్యి సేవ్ అవుతుంది.' },
      { line: 'double height = 5.8;', explanation: 'డెసిమల్స్ (పాయింట్ తర్వాత వచ్చేవి) కోసం 8 బైట్స్ మెమరీ Stack లో సేవ్ అవుతుంది.' },
      { line: 'char grade = \'A\';', explanation: 'సింగిల్ కొటేషన్స్ లో ఒక అక్షరం ఇవ్వడానికి ఇది వాడతాం (2 బైట్స్ తీసుకుంటుంది).' },
      { line: 'boolean isStudent = true;', explanation: 'అవునా కాదా (true/false) చెప్పడానికి.' }
    ],
    practicalExample: `public class BankBalanceTracker {
    public static void main(String[] args) {
        String accountHolder = "Priya Sharma";
        long accountNumber   = 987654321012L;
        double balance       = 15000.00;

        System.out.println(accountHolder + " అకౌంట్ లో ఉన్న బ్యాలెన్స్: ₹" + balance);

        // డబ్బులు డిపాజిట్ చేయడం
        double depositAmount = 5000.00;
        balance = balance + depositAmount; // పాత బ్యాలెన్స్ కి కొత్తది కలిపి మళ్ళీ సేవ్ చేస్తున్నాం
        System.out.println("డిపాజిట్ చేసినది: ₹" + depositAmount + " | కొత్త బ్యాలెన్స్: ₹" + balance);

        // డబ్బులు విత్ డ్రా చేయడం
        double withdrawalAmount = 3500.00;
        balance = balance - withdrawalAmount;
        System.out.println("విత్ డ్రా చేసినది: ₹" + withdrawalAmount + " | ఫైనల్ బ్యాలెన్స్: ₹" + balance);
    }
}`,
    practicalOutput: `Priya Sharma అకౌంట్ లో ఉన్న బ్యాలెన్స్: ₹15000.0
డిపాజిట్ చేసినది: ₹5000.0 | కొత్త బ్యాలెన్స్: ₹20000.0
విత్ డ్రా చేసినది: ₹3500.0 | ఫైనల్ బ్యాలెన్స్: ₹16500.0`,
    commonMistakes: [
      'వాల్యూ ఇవ్వకుండా వాడటం: జావాలో మెయిన్ ఫంక్షన్ లోపల "int x;" అని వదిలేసి, కింద "System.out.println(x);" అంటే ఎర్రర్ వస్తుంది. కచ్చితంగా వాల్యూ ఇచ్చాకే వాడాలి.',
      'టైప్స్ ని మ్యాచ్ చేయకపోవడం: "int x = 5.8;" అని ఇస్తే ఎర్రర్ వస్తుంది. డెసిమల్స్ ఉంటే double అని మాత్రమే ఇవ్వాలి.',
      'చార్ట్స్, స్ట్రింగ్స్ కి కొటేషన్స్ తప్పు వాడటం: సింగిల్ లెటర్ (char) కి ఎప్పుడూ సింగిల్ కొటేషన్స్ (\'A\') వాడాలి. పదాలకి (String) డబుల్ కొటేషన్స్ ("A") వాడాలి.'
    ],
    challenge: `// Coding Challenge:
// ఒక స్మార్ట్ ఫోన్ కి సంబంధించిన ఈ కింది వేరియబుల్స్ ని క్రియేట్ చేయండి:
// 1. brand (String) = "Samsung"
// 2. ramGB (int) = 12
// 3. price (double) = 74999.99
// 4. inStock (boolean) = true
// 5. rating (char) = '5'
// వాటన్నింటినీ నీట్ గా ప్రింట్ చేయండి.

public class Main {
    public static void main(String[] args) {
        // TODO: ఆ 5 వేరియబుల్స్ క్రియేట్ చేసి ప్రింట్ చేయండి
        
    }
}`,
    faq: [
      {
        q: 'లోకల్ వేరియబుల్స్ అన్నీ Stack లోనే ఎందుకు స్టోర్ అవుతాయి?',
        a: 'ఎందుకంటే Stack చాలా ఫాస్ట్. ఒక ఫంక్షన్ పని అవ్వగానే అందులో ఉన్న వేరియబుల్స్ అన్నీ ఆటోమాటిక్ గా ఒక్క సెకన్లో క్లీన్ అయిపోతాయి (Garbage Collector తో పనిలేదు).'
      },
      {
        q: 'జావాలో వేరియబుల్ కి డీఫాల్ట్ వాల్యూస్ (జీరో లాంటివి) ఉంటాయా?',
        a: 'ఫంక్షన్స్ లోపల ఉండే లోకల్ వేరియబుల్స్ కి డీఫాల్ట్ వాల్యూస్ ఉండవు. కానీ క్లాస్ లెవెల్ లో ఉండే వేరియబుల్స్ కి మాత్రం నంబర్స్ అయితే 0 అని, boolean అయితే false అని డీఫాల్ట్ వాల్యూ తీసుకుంటుంది.'
      }
    ],
    recap: [
      'వేరియబుల్స్ అంటే మెమరీలో ఒక బాక్స్ క్రియేట్ చేసి డేటాని స్టోర్ చేసుకోవడం.',
      'జావా అనేది Statically-typed, అంటే డేటా టైప్ ముందే చెప్పాలి.',
      'సింపుల్ డేటా అన్నీ Stack మెమరీలో ఉంటే, పెద్ద పెద్ద ఆబ్జెక్ట్స్ అన్నీ Heap మెమరీలో ఉంటాయి.',
      'వేరియబుల్స్ ని వాల్యూ ఇచ్చాకే ప్రింట్ చేయాలి, లేదంటే ఎర్రర్ వస్తుంది.'
    ]
  },

  // ==========================================
  // CHAPTER 7: 8 Primitive Data Types & Literals
  // ==========================================
  {
    num: 7,
    phaseId: 'phase2',
    phaseTitle: 'Phase 2: Variables & Data Types',
    slug: '07-java-primitive-data-types-and-literals',
    title: 'Java 8 Primitive Data Types & Literals (తెలుగులో)',
    badge: '7. Primitive Data Types',
    subtopics: 'byte, short, int, long · float, double · char (Unicode UTF-16) · boolean · Memory Sizes & Bit Ranges · Numeric Underscores & Literals',
    readTime: '16 min read',
    intro: 'జావాలో బేసిక్ గా ఉండే 8 రకాల డేటా టైప్స్ ఏంటి? వాటికి మెమరీ లో ఎన్ని బైట్స్ తీసుకుంటాయి? పెద్ద నంబర్స్ వస్తే ఏది వాడాలి? పాయింట్ తర్వాత వచ్చే నంబర్స్ కి ఏది వాడాలి? అనే విషయాలు డీటెయిల్డ్ గా నేర్చుకుందాం.',
    theorySections: [
      {
        heading: '1. జావాలో ఉండే 8 Primitive Data Types లిస్ట్',
        content: `జావాలో ముందే డిజైన్ చేసిపెట్టిన 8 బేసిక్ (Primitive) డేటా టైప్స్ ఇవే:

| డేటా టైప్ | ఏ రకం? | సైజు (Bytes) | ఎక్కడ నుంచి ఎక్కడ వరకు? | డీఫాల్ట్ వాల్యూ | ఎగ్జాంపుల్ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **\`byte\`** | నంబర్ | 1 byte | \`-128\` నుంచి \`127\` వరకు | \`0\` | \`byte b = 100;\` |
| **\`short\`** | నంబర్ | 2 bytes | \`-32,768\` నుంచి \`32,767\` వరకు | \`0\` | \`short s = 25000;\` |
| **\`int\`** | నంబర్ | 4 bytes | దాదాపు మైనస్ 214 కోట్లు నుంచి ప్లస్ 214 కోట్ల వరకు | \`0\` | \`int i = 500000;\` |
| **\`long\`** | నంబర్ | 8 bytes | ఇంకా చాలా పెద్ద నంబర్స్ కోసం | \`0L\` | \`long l = 9876543210L;\` |
| **\`float\`** | డెసిమల్స్ | 4 bytes | పాయింట్ తర్వాత 6-7 నంబర్స్ వరకు కరెక్ట్ గా వస్తుంది | \`0.0f\` | \`float f = 3.14159f;\` |
| **\`double\`** | డెసిమల్స్ | 8 bytes | పాయింట్ తర్వాత 15 నంబర్స్ వరకు కరెక్ట్ గా వస్తుంది | \`0.0d\` | \`double d = 3.1415926535;\` |
| **\`char\`** | అక్షరం | 2 bytes | ఒకే ఒక అక్షరం (ఏ భాషదైనా సరే) | \`'\\u0000'\` | \`char c = 'A';\` |
| **\`boolean\`** | అవునా కాదా | 1 bit | కేవలం \`true\` లేదా \`false\` | \`false\` | \`boolean flag = true;\` |`
      },
      {
        heading: '2. నంబర్స్ (Integers): `int` ఎందుకు డీఫాల్ట్? `long` కి L ఎందుకు వాడాలి?',
        content: `మనం జావాలో ఏ నంబర్ రాసినా సరే, జావా దాన్ని బై డీఫాల్ట్ \`int\` (4 బైట్స్) లాగే చూస్తుంది.

ఒకవేళ మీరు \`int\` సైజు కంటే పెద్ద నంబర్ (214 కోట్లు దాటినవి) రాస్తుంటే, దాని చివర కచ్చితంగా **L** (అంటే Long) అని పెట్టాలి. లేదంటే ఎర్రర్ వస్తుంది.

\`\`\`java
int standardNumber = 2000000;
long worldPopulation = 8000000000L; // పెద్ద నంబర్ కాబట్టి L పెట్టాలి
\`\`\``
      },
      {
        heading: '3. డెసిమల్ నంబర్స్: `float` (f) vs `double` (డీఫాల్ట్)',
        content: `జావాలో పాయింట్ ఉన్న ఏ నంబర్ రాసినా, అది బై డీఫాల్ట్ \`double\` (8 బైట్స్) అనుకుంటుంది.

ఒకవేళ మీరు దాన్ని \`float\` లోనే స్టోర్ చేసి మెమరీ సేవ్ చేద్దామనుకుంటే, కచ్చితంగా దాని పక్కన **f** అని పెట్టాలి. లేదంటే జావా ఒప్పుకోదు.

\`\`\`java
double exactGpa = 3.95;    // పక్కన ఏమీ ఇవ్వకపోతే అది double అనుకుంటుంది
float screenCoord = 120.5f; // float కి మాత్రం చివర 'f' ఇవ్వాల్సిందే
\`\`\``
      },
      {
        heading: '4. `char` మరియు ప్రపంచ భాషలు (Unicode)',
        content: `పాత లాంగ్వేజెస్ (C, C++) లో ఒక అక్షరాన్ని స్టోర్ చేయడానికి (ASCII) 1 బైట్ వాడేవాళ్లు. కానీ అందులో ఇంగ్లీష్ అక్షరాలు మాత్రమే స్టోర్ అవుతాయి.
        
కానీ జావా ప్రపంచం మొత్తానికి పనికిరావాలని, **char కి 2 బైట్స్ (Unicode)** ఇచ్చింది. దీనివల్ల ఇంగ్లీషే కాకుండా తెలుగు, హిందీ, చైనీస్ లాంటి ఏ భాష అక్షరాలనైనా స్టోర్ చేసుకోవచ్చు!

\`\`\`java
char englishChar = 'A';
char teluguChar = '\\u0C05'; // తెలుగు అక్షరం 'అ'
char asciiCode   = 65;       // నంబర్ 65 ఇస్తే అది 'A' ని ప్రింట్ చేస్తుంది
\`\`\``
      },
      {
        heading: '5. నంబర్స్ ని ఈజీగా చదవడానికి Underscores (_)',
        content: `లక్షలు, కోట్లు రాసేటప్పుడు ఎన్ని సున్నాలు ఉన్నాయో చదవడం కష్టం కదా. అందుకే జావా 7 నుంచి నంబర్స్ మధ్యలో అండర్ స్కోర్స్ పెట్టుకునే ఫెసిలిటీ ఇచ్చారు:

\`\`\`java
long creditCardNumber = 4123_5678_9012_3456L;
int oneMillion = 1_000_000;
double price = 4_500.75;
\`\`\`
ఈ అండర్ స్కోర్స్ ని కంపైలర్ వదిలేస్తుంది, జస్ట్ మనం చదువుకోవడానికే.`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // 1. Integer Types
        byte  smallNum = 80;
        short mediumNum  = 1250;
        int   cityPopulation  = 2_500_000; // అండర్ స్కోర్ వాడాం
        long  globalData = 9_876_543_210_000L; // చివర 'L' వాడాం

        // 2. Floating-Point Types
        float  percentage = 87.5f; // చివర 'f' వాడాం
        double exactValue = 3.141592653589793;

        // 3. Character
        char letter = 'J';
        char teluguLetter = '\\u0C05'; // తెలుగు 'అ'
        char symbol = '₹';

        // 4. Boolean
        boolean isOnline = true;

        // అవుట్పుట్ ప్రింట్ చేయడం
        System.out.println("--- జావా బేసిక్ డేటా టైప్స్ ---");
        System.out.println("byte    (8-bit)  : " + smallNum);
        System.out.println("short   (16-bit) : " + mediumNum);
        System.out.println("int     (32-bit) : " + cityPopulation);
        System.out.println("long    (64-bit) : " + globalData);
        System.out.println("float   (32-bit) : " + percentage + "%");
        System.out.println("double  (64-bit) : " + exactValue);
        System.out.println("char    (Unicode): " + letter + " | " + teluguLetter + " | " + symbol);
        System.out.println("boolean (Truth)  : " + isOnline);
    }
}`,
    output: `--- జావా బేసిక్ డేటా టైప్స్ ---
byte    (8-bit)  : 80
short   (16-bit) : 1250
int     (32-bit) : 2500000
long    (64-bit) : 9876543210000
float   (32-bit) : 87.5%
double  (64-bit) : 3.141592653589793
char    (Unicode): J | అ | ₹
boolean (Truth)  : true`,
    lineByLine: [
      { line: 'int cityPopulation = 2_500_000;', explanation: 'నంబర్స్ ని ఈజీగా చదవడానికి మధ్యలో అండర్ స్కోర్ పెట్టొచ్చు, దానివల్ల అవుట్పుట్ మారదు.' },
      { line: 'long globalData = 9_876_543_210_000L;', explanation: 'నంబర్ పెద్దది కాబట్టి జావా కన్ఫ్యూజ్ అవ్వకుండా ఉండటానికి లాస్ట్ లో L పెట్టాం.' },
      { line: 'float percentage = 87.5f;', explanation: 'డెసిమల్స్ ని double అనుకోకుండా float అనుకోవడానికి చివర f పెట్టాం.' },
      { line: 'char teluguLetter = \'\\u0C05\';', explanation: 'యూనికోడ్ వాడి తెలుగు అక్షరం కూడా ఇచ్చాం (ప్రతి అక్షరానికి ఒక కోడ్ ఉంటుంది).' }
    ],
    practicalExample: `public class DataLimits {
    public static void main(String[] args) {
        // జావా లో ముందే రాసిపెట్టిన కాన్స్టంట్స్ వాడి ఏ డేటా టైప్ లిమిట్ ఏంటో చూద్దాం:
        System.out.println("=== డేటా టైప్స్ మినిమం, మాక్సిమం లిమిట్స్ ===");
        System.out.println("Byte రేంజ్ : " + Byte.MIN_VALUE + " నుంచి " + Byte.MAX_VALUE);
        System.out.println("Short రేంజ్: " + Short.MIN_VALUE + " నుంచి " + Short.MAX_VALUE);
        System.out.println("Int రేంజ్  : " + Integer.MIN_VALUE + " నుంచి " + Integer.MAX_VALUE);
        System.out.println("Long రేంజ్ : " + Long.MIN_VALUE + " నుంచి " + Long.MAX_VALUE);
    }
}`,
    practicalOutput: `=== డేటా టైప్స్ మినిమం, మాక్సిమం లిమిట్స్ ===
Byte రేంజ్ : -128 నుంచి 127
Short రేంజ్: -32768 నుంచి 32767
Int రేంజ్  : -2147483648 నుంచి 2147483647
Long రేంజ్ : -9223372036854775808 నుంచి 9223372036854775807`,
    commonMistakes: [
      'పెద్ద నంబర్స్ కి L మర్చిపోవడం: "long x = 5000000000;" అని ఇస్తే ఎర్రర్ వస్తుంది. "5000000000L" అని ఇవ్వాలి.',
      'ఫ్లోట్ కి f మర్చిపోవడం: "float pi = 3.14;" అంటే ఎర్రర్ వస్తుంది, ఎందుకంటే 3.14 అనగానే దాన్ని double అనుకుంటుంది. "3.14f" అని ఇవ్వాలి.',
      'boolean ని 0, 1 లాగా రాయడం: వేరే లాంగ్వేజెస్ లో 1 అంటే true. కానీ జావాలో boolean కచ్చితంగా true లేదా false అని అక్షరాల్లోనే రాయాలి.'
    ],
    challenge: `// Coding Challenge:
// కింది 4 వేరియబుల్స్ కి మాక్సిమం లిమిట్స్ ప్రింట్ చేయండి:
// 1. byte b = Byte.MAX_VALUE;
// 2. short s = Short.MAX_VALUE;
// 3. int i = Integer.MAX_VALUE;
// 4. long l = Long.MAX_VALUE;

public class Main {
    public static void main(String[] args) {
        // TODO: ప్రింట్ చేయండి
        
    }
}`,
    faq: [
      {
        q: 'C లాంగ్వేజ్ లాగా కాకుండా జావాలో char కి 2 బైట్స్ ఎందుకిచ్చారు?',
        a: 'ఇంగ్లీష్ కి 1 బైట్ చాలు. కానీ ప్రపంచంలో ఉన్న తెలుగు, హిందీ లాంటి అన్ని భాషల అక్షరాలని సపోర్ట్ చేయాలంటే 2 బైట్స్ (Unicode) ఉండాల్సిందే.'
      },
      {
        q: 'బ్యాంక్ బ్యాలెన్స్ లాంటి డబ్బులకి float వాడాలా double వాడాలా?',
        a: 'రెండూ వాడకూడదు! ఇవి రెండూ కొన్నిసార్లు డెసిమల్స్ ని రౌండ్ ఆఫ్ చేస్తాయి. డబ్బుల లెక్కల కోసం జావాలో కచ్చితంగా "BigDecimal" అనే క్లాస్ ని వాడాలి.'
      },
      {
        q: 'నంబర్ ముందు అండర్ స్కోర్ (_100) పెట్టొచ్చా?',
        a: 'పెట్టకూడదు. ఎప్పుడూ నంబర్స్ మధ్యలోనే పెట్టాలి. ఫస్ట్ కానీ లాస్ట్ కానీ అండర్ స్కోర్ పెడితే ఎర్రర్ వస్తుంది.'
      }
    ],
    recap: [
      'జావాలో బేసిక్ డేటా టైప్స్ 8 ఉంటాయి. (byte, short, int, long, float, double, char, boolean).',
      'నార్మల్ నంబర్ ఇస్తే int అనుకుంటుంది, డెసిమల్ ఇస్తే double అనుకుంటుంది.',
      'long వాడాలంటే చివర L, float వాడాలంటే చివర f కచ్చితంగా పెట్టాలి.',
      'char కి 2 బైట్స్ ఉంటాయి, కాబట్టి ఏ భాష అక్షరాన్నైనా స్టోర్ చేసుకోవచ్చు.'
    ]
  },

  // ==========================================
  // CHAPTER 8: Reference Types, Strings & Scopes
  // ==========================================
  {
    num: 8,
    phaseId: 'phase2',
    phaseTitle: 'Phase 2: Variables & Data Types',
    slug: '08-java-reference-types-strings-and-scopes',
    title: 'Reference Types, Strings, Constants & Variable Scopes (తెలుగులో)',
    badge: '8. Reference Types & Scopes',
    subtopics: 'Primitive vs Reference Types · String Immutability & Pool · final Constants · Variable Scopes: Local, Instance & Static',
    readTime: '16 min read',
    intro: 'బేసిక్ డేటా టైప్స్ (Primitive) కీ, రెఫరెన్స్ డేటా టైప్స్ (Reference) కీ తేడా ఏంటి? అసలు జావాలో String ని అంత స్పెషల్ గా ఎందుకు డిజైన్ చేశారు? ఎవరూ మార్చలేని వేరియబుల్స్ (Constants) ఎలా క్రియేట్ చేయాలి? లోకల్, ఇన్స్టాన్స్ వేరియబుల్స్ అంటే ఏంటో చూద్దాం.',
    theorySections: [
      {
        heading: '1. Primitive కి Reference డేటా టైప్స్ కి తేడా ఏంటి?',
        content: `జావాలో మెయిన్ గా రెండు రకాల డేటా టైప్స్ ఉంటాయి:

| తేడా | Primitive Types (\`int\`, \`double\` వగైరా) | Reference Types (\`String\`, \`Arrays\`, \`Classes\`) |
| :--- | :--- | :--- |
| **ఎక్కడ స్టోర్ అవుతాయి?** | డైరెక్ట్ గా వాల్యూ మొత్తం **Stack Memory** లోనే ఉంటుంది. | అసలు డేటా **Heap Memory** లో ఉంటే, దానికి సంబంధించిన అడ్రెస్ (లింక్) మాత్రం Stack లో ఉంటుంది. |
| **సైజు ఎంత?** | ఇది ముందే ఫిక్స్ (1, 2, 4, 8 bytes). | అది తీసుకునే డేటాని బట్టి సైజు మారుతుంది. |
| **డీఫాల్ట్ వాల్యూ?** | \`0\`, \`false\` లాంటివి ఉంటాయి. | \`null\` ఉంటుంది (అంటే ఏం లేదని). |
| **ఫంక్షన్స్ వాడొచ్చా?** | వాడలేం (దాని పక్కన డాట్ (\`.\`) పెడితే ఏమీ రావు). | దానికి సంబంధించిన ఫంక్షన్స్ వాడుకోవచ్చు (ఉదా: \`name.toUpperCase()\`). |`
      },
      {
        heading: '2. `String` మరియు String Pool స్టోరీ',
        content: `జావాలో **\`String\`** అనేది ఒక టెక్స్ట్ ని సేవ్ చేసుకునే ఒక ఆబ్జెక్ట్.
        
జావాలో స్ట్రింగ్స్ కి ఒక స్పెషాలిటీ ఉంది.. అవేంటంటే **Immutable (మార్చలేనివి)**. ఒకసారి క్రియేట్ చేశాక అందులో అక్షరాల్ని మనం మార్చలేం. ఒకవేళ మీరు ఆ టెక్స్ట్ కి ఇంకొంచెం టెక్స్ట్ ని యాడ్ చేసినా (లేదా మార్చినా), జావా ఏం చేస్తుందంటే.. పాతదాన్ని అలాగే వదిలేసి కొత్త పేరుతో ఇంకో ఆబ్జెక్ట్ ని క్రియేట్ చేస్తుంది.

### String Pool అంటే ఏంటి?:
మెమరీ వేస్ట్ అవ్వకుండా ఉండటానికి Heap Memory లోపల ఒక చిన్న ఏరియాని కేటాయించారు. దాన్నే **String Pool** అంటారు.
- మీరు \`String s1 = "Java";\` అన్నారనుకోండి. పూల్ లో "Java" సేవ్ అవుతుంది.
- మళ్లీ ఇంకోసారి \`String s2 = "Java";\` అన్నారనుకోండి. ఇప్పుడు కొత్తగా సేవ్ చేయకుండా, ఆల్రెడీ పూల్ లో ఉన్న దాన్నే \`s2\` కి కూడా ఇస్తుంది! అంటే \`s1\`, \`s2\` రెండూ ఒకే వాల్యూ ని పాయింట్ చేస్తుంటాయి.
- అదే ఒకవేళ మీరు కావాలని \`new String("Java")\` అంటే మాత్రం.. పూల్ కి సంబంధం లేకుండా విడిగా ఇంకో ఆబ్జెక్ట్ క్రియేట్ అవుతుంది.`
      },
      {
        heading: '3. `final` కీవర్డ్ తో Constants క్రియేట్ చేయడం',
        content: `ప్రోగ్రామ్ రన్ అవుతున్నంత సేపు ఒక వేరియబుల్ వాల్యూ ఎవరూ మార్చకూడదు అనుకుంటే, దాని ముందు **\`final\`** అనే కీవర్డ్ పెట్టాలి. వాటినే Constants అంటారు.

ఒకసారి \`final\` వేరియబుల్ కి వాల్యూ ఇచ్చాక దాన్ని మళ్ళీ అసైన్ చేయలేం:

\`\`\`java
public static final double PI = 3.14159;
public static final int MAX_USERS = 5;
\`\`\`

### బెస్ట్ ప్రాక్టీసెస్:
1. కాన్స్టంట్స్ కి ఎప్పుడూ \`static final\` రెండు కలిపి రాయడం మంచిది. ఎందుకంటే ఆ వాల్యూ అందరికీ ఒకటే కాబట్టి మెమరీ సేవ్ అవుతుంది.
2. కాన్స్టంట్స్ పేర్లు ఎప్పుడూ క్యాపిటల్స్ లోనే **\`UPPER_SNAKE_CASE\`** ఉండాలి.`
      },
      {
        heading: '4. మూడు రకాల Variable Scopes',
        content: `ఒక వేరియబుల్ ని ఎక్కడ డిక్లేర్ చేసాం అనేదాన్ని బట్టి, అది ఎంతసేపు బ్రతికుటుందో ఆధారపడి ఉంటుంది. దీన్నే Scope అంటారు.

\`\`\`
+-----------------------------------------------------------------------------------+
|                           JAVA VARIABLE SCOPES                                    |
+-----------------------------------------------------------------------------------+
|  class Bank {                                                                     |
|                                                                                   |
|    // 1. STATIC VARIABLE (క్లాస్ లోపల, সবারకి ఒకటే)                                   |
|    public static String bankName = "SBI";                                         |
|                                                                                   |
|    // 2. INSTANCE VARIABLE (క్లాస్ లోపల, కానీ ఒక్కో ఆబ్జెక్ట్ కి ఒక్కో కాపీ)                    |
|    private double balance = 1000.00;                                             |
|                                                                                   |
|    public void deposit(double amount) {                                           |
|      // 3. LOCAL VARIABLE (ఫంక్షన్ లోపల మాత్రమే బ్రతికుటుంది)                          |
|      double fee = 10.0;                                                           |
|      balance = balance + (amount - fee);                                          |
|    }                                                                              |
|  }                                                                                |
+-----------------------------------------------------------------------------------+
\`\`\`

1. **Local Variables:** ఒక బ్లాక్ \`{}\` లేదా ఫంక్షన్ లోపల రాసేవి. ఆ ఫంక్షన్ అవ్వగానే ఇవి మెమరీ నుంచి పోతాయి. వీటికి ముందే వాల్యూ ఇవ్వాలి.
2. **Instance Variables:** ఫంక్షన్స్ కి పైన క్లాస్ లో రాసేవి. మనం ఎన్ని ఆబ్జెక్ట్స్ క్రియేట్ చేస్తే అన్ని కాపీలు తయారవుతాయి.
3. **Static Variables:** క్లాస్ లో రాసి ముందు \`static\` అని పెట్టేవి. ఇవి ఎన్ని ఆబ్జెక్ట్స్ క్రియేట్ చేసినా సరే, క్లాస్ కి ఒకటే కాపీ ఉంటుంది. అందరూ దాన్నే వాడుకోవాలి.`
      }
    ],
    codeExample: `public class Main {
    
    // 1. Static Variable (క్లాస్ లెవెల్, అందరికీ ఒకటే)
    public static final String COLLEGE = "XYZ College";
    public static int totalStudents    = 0;

    // 2. Instance Variables (ఆబ్జెక్ట్ లెవెల్, ఎవరికీ వారికి విడిగా ఉంటుంది)
    private String name;
    private double gpa;

    // ఇది కన్స్ట్రక్టర్ (వాల్యూస్ సెట్ చేయడానికి)
    public Main(String n, double g) {
        this.name = n;
        this.gpa = g;
        totalStudents++; // ఆబ్జెక్ట్ క్రియేట్ అయిన ప్రతిసారీ స్టూడెంట్స్ కౌంట్ పెంచుతున్నాం
    }

    public void showData() {
        // 3. Local Variable (ఈ ఫంక్షన్ లోపల మాత్రమే పనిచేస్తుంది)
        String grade = (this.gpa >= 3.5) ? "A Grade" : "B Grade";

        System.out.println("కాలేజ్  : " + COLLEGE);
        System.out.println("పేరు   : " + this.name);
        System.out.println("గ్రేడ్  : " + grade);
        System.out.println("-------------------------");
    }

    public static void main(String[] args) {
        // ఇద్దరు స్టూడెంట్స్ కి ఆబ్జెక్ట్స్ క్రియేట్ చేసాం
        Main s1 = new Main("Balaji", 3.9);
        Main s2 = new Main("Ravi", 3.2);

        s1.showData();
        s2.showData();

        // స్టాటిక్ వేరియబుల్ కావడంతో టోటల్ కౌంట్ 2 అయింది
        System.out.println("మొత్తం స్టూడెంట్స్: " + Main.totalStudents);
    }
}`,
    output: `కాలేజ్  : XYZ College
పేరు   : Balaji
గ్రేడ్  : A Grade
-------------------------
కాలేజ్  : XYZ College
పేరు   : Ravi
గ్రేడ్  : B Grade
-------------------------
మొత్తం స్టూడెంట్స్: 2`,
    lineByLine: [
      { line: 'public static final String COLLEGE', explanation: 'ఎవరూ మార్చలేని స్టాటిక్ వేరియబుల్, ఇది అందరికీ ఒకటే ఉంటుంది.' },
      { line: 'public static int totalStudents = 0;', explanation: 'స్టాటిక్ కాబట్టి ప్రతి ఆబ్జెక్ట్ లోనూ కౌంట్ అప్డేట్ అవుతూ వస్తుంది.' },
      { line: 'private String name; private double gpa;', explanation: 'ఇన్స్టాన్స్ వేరియబుల్స్. Balaji కి ఒక కాపీ, Ravi కి ఒక కాపీ ఉంటాయి.' },
      { line: 'String grade = ...', explanation: 'లోకల్ వేరియబుల్, కేవలం showData ఫంక్షన్ లో మాత్రమే ఉంటుంది.' }
    ],
    practicalExample: `public class StringPoolTest {
    public static void main(String[] args) {
        // నార్మల్ గా స్ట్రింగ్స్ క్రియేట్ చేస్తే పూల్ లోకి వెళ్తాయి
        String s1 = "Java";
        String s2 = "Java";

        // న్యూ కీవర్డ్ తో క్రియేట్ చేస్తే సపరేట్ గా వెళ్తాయి
        String s3 = new String("Java");

        System.out.println("=== String Pool టెస్ట్ ===");
        
        // "==" అనేది కేవలం అడ్రెస్ (లింక్) ని మాత్రమే చెక్ చేస్తుంది
        System.out.println("s1 == s2 : " + (s1 == s2)); // పూల్ లో ఒకటే లింక్ కాబట్టి true
        System.out.println("s1 == s3 : " + (s1 == s3)); // s3 సపరేట్ కాబట్టి false

        // ".equals()" వాల్యూ ని చెక్ చేస్తుంది కాబట్టి రెండూ true వస్తాయి
        System.out.println("s1.equals(s3) : " + s1.equals(s3)); 
    }
}`,
    practicalOutput: `=== String Pool టెస్ట్ ===
s1 == s2 : true
s1 == s3 : false
s1.equals(s3) : true`,
    commonMistakes: [
      'స్ట్రింగ్స్ వాల్యూ సమానంగా ఉందో లేదో "==" తో చెక్ చేయడం: ఇది అస్సలు చేయకూడదు. జావాలో ఎప్పుడూ "str1.equals(str2)" అని మాత్రమే వాడాలి.',
      'final వేరియబుల్ ని మార్చాలని చూడటం: "final int x = 10; x = 20;" అంటే జావా ఒప్పుకోదు.',
      'స్టాటిక్ ఫంక్షన్ లోపల ఇన్స్టాన్స్ వేరియబుల్ వాడటం: main అనేది స్టాటిక్ ఫంక్షన్. అందులో డైరెక్ట్ గా స్టాటిక్ కాని వేరియబుల్స్ వాడితే ఎర్రర్ వస్తుంది.'
    ],
    challenge: `// Coding Challenge:
// ఒక ఫైల్ లోపల ఈ కింద చెప్పిన విధంగా వేరియబుల్స్ వాడండి:
// 1. public static final String ENV = "PRODUCTION";
// 2. దాన్ని main ఫంక్షన్ లో ప్రింట్ చేయండి. 
// 3. దాని వాల్యూ ని మార్చడానికి ట్రై చేసి చూడండి (ఎర్రర్ వస్తుందో లేదో చూడండి).

public class Main {
    public static void main(String[] args) {
        // TODO: ఇక్కడ రాయండి
        
    }
}`,
    faq: [
      {
        q: 'స్ట్రింగ్స్ ని ఎందుకు Immutable (మార్చలేనివిగా) చేసారు?',
        a: 'సెక్యూరిటీ కోసం! పాస్వర్డ్స్, డేటాబేస్ లింక్స్ అన్నీ స్ట్రింగ్స్ లోనే ఇస్తాం. ఎవరైనా హ్యాకర్ వాటిని మార్చాలని చూసినా మార్చలేరు. అలాగే పూల్ లో స్టోర్ చేసి మెమరీ సేవ్ చేయడానికి కూడా ఇది ఉపయోగపడుతుంది.'
      },
      {
        q: 'static కీ, final కీ తేడా ఏంటి?',
        a: '"static" అంటే అందరికీ కలిపి ఒకటే కాపీ ఉందని అర్థం. "final" అంటే ఆ కాపీ వాల్యూ ఇంక మారదు అని అర్థం.'
      }
    ],
    recap: [
      'Primitive టైప్స్ Stack లో ఉంటాయి, Reference టైప్స్ Heap లో ఉంటాయి.',
      'జావాలో స్ట్రింగ్స్ ని ఒకసారి క్రియేట్ చేసాక వాటి వాల్యూ మార్చలేం. సేమ్ వాల్యూ ఉంటే పూల్ లోంచి తీసుకుంటాయి.',
      'final కీవర్డ్ పెడితే అది ఇంక కాన్స్టంట్ అయిపోతుంది.',
      'లోకల్, ఇన్స్టాన్స్, స్టాటిక్ అని 3 రకాల స్కోప్స్ ఉంటాయి.'
    ]
  },

  // ==========================================
  // CHAPTER 9: Type Casting & var Keyword
  // ==========================================
  {
    num: 9,
    phaseId: 'phase2',
    phaseTitle: 'Phase 2: Variables & Data Types',
    slug: '09-java-type-casting-and-var-inference',
    title: 'Java Type Casting (Widening/Narrowing) & var Keyword (తెలుగులో)',
    badge: '9. Type Casting & var',
    subtopics: 'Widening Casting (Implicit) · Narrowing Casting (Explicit) · Data Loss & Overflow · ASCII char/int Conversions · var Keyword (Local Variable Type Inference)',
    readTime: '15 min read',
    intro: 'ఒక డేటా టైప్ లో ఉన్న వాల్యూ ని వేరే డేటా టైప్ లోకి ఎలా మార్చాలి (Type Casting)? చిన్నదాన్ని పెద్ద దానిలోకి వేస్తే ఏమవుతుంది? పెద్ద దాన్ని చిన్నదాంట్లోకి వేస్తే డేటా ఎలా మిస్ అవుతుంది? మరియు జావా 10 లో కొత్తగా వచ్చిన `var` కీవర్డ్ తో ఈజీగా కోడ్ ఎలా రాయాలో చూద్దాం.',
    theorySections: [
      {
        heading: '1. Type Casting అంటే ఏంటి?',
        content: `**Type Casting** అంటే ఒక డేటా టైప్ లో ఉన్న వాల్యూ ని వేరే డేటా టైప్ కి మార్చడం.

దీంట్లో మెయిన్ గా రెండు రకాలు ఉంటాయి:

\`\`\`
+-----------------------------------------------------------------------------------+
|                        JAVA TYPE CASTING HIERARCHY                                |
+-----------------------------------------------------------------------------------+
|  1. WIDENING CASTING (చిన్నదాని నుంచి పెద్దదానికి - ఆటోమేటిక్ గా జరుగుతుంది)              |
|     byte -> short -> char -> int -> long -> float -> double                       |
|     (చిన్న సైజు ఉన్న డేటాని పెద్ద బాక్స్ లో పెడుతున్నాం కాబట్టి ఏ ప్రాబ్లమ్ రాదు)                 |
+-----------------------------------------------------------------------------------+
|  2. NARROWING CASTING (పెద్దదాని నుంచి చిన్నదానికి - మనమే మాన్యువల్ గా చేయాలి)            |
|     double -> float -> long -> int -> char -> short -> byte                       |
|     (పెద్ద సైజు డేటాని చిన్న బాక్స్ లోకి కుక్కుతున్నాం కాబట్టి డేటా మిస్ అవ్వొచ్చు!)             |
+-----------------------------------------------------------------------------------+
\`\`\``
      },
      {
        heading: '2. Widening Casting (ఆటోమేటిక్ గా జరిగేది)',
        content: `ఒక చిన్న డేటా టైప్ (ఉదా: \`int\`) లో ఉన్న వాల్యూని పెద్ద డేటా టైప్ (ఉదా: \`double\`) కి ఇస్తే జావా ఎవరికీ చెప్పకుండా సైలెంట్ గా మార్చేసుకుంటుంది. దీనివల్ల డేటా ఏమీ పోదు.

\`\`\`java
int smallNumber = 100;
double largeNumber = smallNumber; // int(4 bytes) కాస్త double(8 bytes) అయిపోయింది

System.out.println(smallNumber); // 100
System.out.println(largeNumber); // 100.0 (చివర ఆటోమాటిక్ గా పాయింట్ జీరో వచ్చింది)
\`\`\``
      },
      {
        heading: '3. Narrowing Casting (మనం ఫోర్స్ చేసి చేయాలి)',
        content: `ఒక పెద్ద డేటా టైప్ (ఉదా: \`double\`) వాల్యూ ని చిన్న డేటా టైప్ (ఉదా: \`int\`) లోకి మార్చాలి అంటే ఆటోమేటిక్ గా జరగదు. మనం ఫోర్స్ చేయాలి. ఎలా అంటే, మనం మార్చాలనుకున్న టైప్ ని బ్రాకెట్స్ లో \`(int)\` అని ముందు పెట్టాలి.

ఇలా పెద్దదాన్ని చిన్నదాంట్లోకి కుక్కడం వల్ల **డేటా మిస్ అయ్యే ఛాన్స్** ఉంది (ఉదాహరణకి డెసిమల్స్ పోతాయి):

\`\`\`java
// డెసిమల్స్ పోవడం:
double itemPrice = 99.95;
int truncatedPrice = (int) itemPrice; // పాయింట్ తర్వాత ఉన్న .95 ని జావా కట్ చేసి పారేస్తుంది! కేవలం 99 మాత్రమే మిగులుతుంది.

// బైట్ లిమిట్ దాటిపోవడం:
int largeInt = 130;
byte overflowByte = (byte) largeInt; // బైట్ కి మాక్సిమం 127 వరకే పడుతుంది. ఇక్కడ 130 ఇస్తే అది కన్ఫ్యూజ్ అయిపోయి మైనస్ 126 (-126) కి మారిపోతుంది!
\`\`\``
      },
      {
        heading: '4. అక్షరాలని నంబర్స్ లాగా మార్చొచ్చా (Char to Int)?',
        content: `జావాలో \`char\` కి 2 బైట్స్ ఉంటాయి, అంతేకాకుండా వెనకాల ప్రతి అక్షరానికి ఒక నంబర్ (Unicode) లింక్ అయి ఉంటుంది. కాబట్టి మనం ఈజీగా నంబర్స్ ని అక్షరాల్లా, అక్షరాల్ని నంబర్స్ లా మార్చుకోవచ్చు.

\`\`\`java
char letter = 'A';
int code = (int) letter; // 65 వస్తుంది

int myCode = 66;
char myLetter = (char) myCode; // 'B' వస్తుంది
\`\`\``
      },
      {
        heading: '5. కొత్తగా వచ్చిన `var` కీవర్డ్ (జావా 10 నుంచి)',
        content: `జావా 10 నుంచి మనం ప్రతిసారి \`int\`, \`String\` అని చెప్పాల్సిన పనిలేకుండా, సింపుల్ గా **\`var\`** వాడుకోవచ్చు. మనం ఇచ్చిన వాల్యూ ని బట్టి అది ఏ టైపో కంపైలర్ ఆటోమాటిక్ గా గుర్తుపడుతుంది.

\`\`\`java
var age = 25;                       // వాల్యూ 25 కాబట్టి ఇది int అని అదే అర్థం చేసుకుంటుంది
var price = 99.99;                  // ఇది double
var greeting = "Hello!";            // ఇది String
var isOk = true;                    // ఇది boolean
\`\`\`

### var వాడుతున్నప్పుడు గుర్తుపెట్టుకోవాల్సిన రూల్స్:
1. **మధ్యలో మార్చలేం:** మీరు ఒకసారి నంబర్ ఇస్తే, అది \`int\` అయిపోతుంది. తర్వాత వెళ్లి అందులో టెక్స్ట్ పెడతా అంటే ఒప్పుకోదు. (ఇది పైథాన్ లాగా డైనమిక్ కాదు).
   \`\`\`java
   var count = 10;
   // count = "ten"; // ఎర్రర్ వస్తుంది!
   \`\`\`
2. **లోకల్ గా మాత్రమే:** ఫంక్షన్స్ లోపల మాత్రమే \`var\` వాడాలి. క్లాస్ లో పైన రాయడానికి లేదు.
3. **కచ్చితంగా వాల్యూ ఇవ్వాలి:** \`var x;\` అని వదిలేయడానికి కుదరదు. వాల్యూ ఇవ్వకపోతే అది ఏ టైపో కంపైలర్ కి ఎలా తెలుస్తుంది?`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // 1. Widening Casting (చిన్న నుంచి పెద్దకి)
        int salary = 50000;
        double salaryDouble = salary;
        System.out.println("Widening Casting (int -> double): " + salaryDouble);

        // 2. Narrowing Casting (పెద్ద నుంచి చిన్నకి)
        double rate = 1845.75;
        int rateInt = (int) rate; // పాయింట్ తర్వాత ఉన్నది పోతుంది
        System.out.println("Narrowing Casting (double -> int): " + rateInt + " (డెసిమల్స్ కట్ అయ్యాయి)");

        // 3. Char to Int
        char symbol = 'Z';
        int ascii = (int) symbol;
        System.out.println("అక్షరం '" + symbol + "' కి ఉన్న నంబర్: " + ascii);

        // 4. var కీవర్డ్
        var id = 987654321L;     // long అని అదే తెలుసుకుంటుంది
        var name = "Anitha";     // String
        var ok = true;           // boolean

        System.out.println("\n--- var వాడి క్రియేట్ చేసినవి ---");
        System.out.println("ID  : " + id + " (టైప్: Long)");
        System.out.println("పేరు: " + name + " (టైప్: String)");
        System.out.println("Okనా: " + ok);
    }
}`,
    output: `Widening Casting (int -> double): 50000.0
Narrowing Casting (double -> int): 1845 (డెసిమల్స్ కట్ అయ్యాయి)
అక్షరం 'Z' కి ఉన్న నంబర్: 90

--- var వాడి క్రియేట్ చేసినవి ---
ID  : 987654321 (టైప్: Long)
పేరు: Anitha (టైప్: String)
Okనా: true`,
    lineByLine: [
      { line: 'double salaryDouble = salary;', explanation: 'int లో ఉన్నది double లోకి ఆటోమాటిక్ గా మారిపోయింది.' },
      { line: 'int rateInt = (int) rate;', explanation: 'double ని ఫోర్స్ చేసి మరీ int లోకి మార్చాం, కాబట్టి .75 కట్ అయిపోయింది.' },
      { line: 'int ascii = (int) symbol;', explanation: 'అక్షరాన్ని (Z) నంబర్ లాగా మారిస్తే 90 వచ్చింది.' },
      { line: 'var id = 987654321L;', explanation: 'మనం టైప్ చెప్పకుండా var వాడితే, జావానే దాన్ని లాంగ్ (Long) అని డిసైడ్ చేసింది.' }
    ],
    practicalExample: `public class OverflowTest {
    public static void main(String[] args) {
        System.out.println("=== లిమిట్ దాటితే డేటా ఎలా తారుమారు అవుతుందో చూద్దాం ===");
        
        int orig = 130;
        // బైట్ కి మాక్సిమం 127 వరకే పడుతుంది
        byte casted = (byte) orig;

        System.out.println("ఒరిజినల్ int వాల్యూ : " + orig);
        System.out.println("బైట్ లోకి మార్చాక    : " + casted + " (మైనస్ లోకి వెళ్లిపోయింది!)");

        // వివరణ:
        // బైట్ 127 వరకు వెళ్ళి, ఆ తర్వాత 128 అవ్వకుండా.. వెనక్కి తిరిగి మైనస్ 128, మైనస్ 127.. అలా మైనస్ 126 కి వచ్చి ఆగుతుంది.
    }
}`,
    practicalOutput: `=== లిమిట్ దాటితే డేటా ఎలా తారుమారు అవుతుందో చూద్దాం ===
ఒరిజినల్ int వాల్యూ : 130
బైట్ లోకి మార్చాక    : -126 (మైనస్ లోకి వెళ్లిపోయింది!)`,
    commonMistakes: [
      'var కి వాల్యూ ఇవ్వకుండా వాడటం: "var x;" అని రాస్తే ఎర్రర్ వస్తుంది. కచ్చితంగా వాల్యూ ఇస్తేనే అది పనిచేస్తుంది.',
      'క్లాస్ లోపల var వాడటం: ఫంక్షన్స్ లోపల మాత్రమే var పనిచేస్తుంది, పైన గ్లోబల్ గా వేరియబుల్స్ కి వాడలేం.',
      'Casting చేస్తే రౌండ్ ఆఫ్ అవుతుంది అనుకోవడం: "int x = (int) 9.99;" అంటే 10 రాదు, 9 మాత్రమే వస్తుంది. రౌండ్ ఆఫ్ చేయాలంటే Math.round() వాడాలి.'
    ],
    challenge: `// Coding Challenge:
// ఒక బిల్ అమౌంట్ 1450.85 ఉంది అనుకోండి:
// 1. దాన్ని int లోకి మార్చి కేవలం రూపాయలు (1450) సపరేట్ చేయండి.
// 2. దాన్ని ప్రింట్ చేయండి.

public class Main {
    public static void main(String[] args) {
        double bill = 1450.85;
        // TODO: int లోకి మార్చి ప్రింట్ చేయండి
        
    }
}`,
    faq: [
      {
        q: 'var వాడితే ప్రోగ్రామ్ స్లో అవుతుందా?',
        a: 'అస్సలు అవ్వదు. మనం కోడ్ కంపైల్ చేసేటప్పుడే కంపైలర్ దాన్ని ఒరిజినల్ టైప్ (int, String) లాగా మార్చేసుకుంటుంది. కాబట్టి స్పీడ్ ఎక్కడా తగ్గదు.'
      },
      {
        q: 'ఒక ఆబ్జెక్ట్ ని ఇంకో ఆబ్జెక్ట్ లోకి టైప్ కాస్ట్ చేయొచ్చా?',
        a: 'చేయొచ్చు, దాన్ని Downcasting / Upcasting అంటారు. కానీ ఎర్రర్ రాకుండా ఉండటానికి "instanceof" వాడి చెక్ చేసుకొని చేయాలి.'
      }
    ],
    recap: [
      'చిన్న డేటాని పెద్ద దానిలోకి మారిస్తే (Widening) ఎలాంటి ప్రాబ్లమ్ రాదు, ఆటోమేటిక్ గా జరిగిపోతుంది.',
      'పెద్ద డేటాని చిన్నదానిలోకి కుక్కితే (Narrowing) డెసిమల్స్ పోవడం, మైనస్ లోకి వెళ్ళిపోవడం లాంటివి జరుగుతాయి.',
      'అక్షరాలని ఈజీగా నంబర్స్ లాగా మార్చుకోవచ్చు.',
      'జావా 10 నుంచి ప్రతిదానికీ డేటా టైప్ చెప్పకుండా var వాడుకుని సింపుల్ గా కోడ్ రాయొచ్చు.'
    ]
  }
];
