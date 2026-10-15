// Phase 1: Java Basics (Chapters 1 to 5)
// Exhaustive conceptual theory, ASCII architecture diagrams, line-by-line breakdowns, runnable code boxes, and quizzes.

module.exports = [
  // ==========================================
  // CHAPTER 1: Java Introduction & JVM Architecture
  // ==========================================
  {
    num: 1,
    phaseId: 'phase1',
    phaseTitle: 'Phase 1: Java Basics',
    slug: '01-java-introduction-features-and-jvm-architecture',
    title: 'Java Introduction, Features & JVM Architecture (తెలుగులో)',
    badge: '1. Intro & JVM Architecture',
    subtopics: 'What is Java? · WORA Philosophy · Core Features · Industry Use Cases · JDK vs JRE vs JVM · JVM Internal Architecture',
    readTime: '15 min read',
    intro: 'జావా (Java) అంటే ఏంటి? దీని హిస్టరీ ఏంటి? "Write Once, Run Anywhere (WORA)" అనే కాన్సెప్ట్ ఎలా పనిచేస్తుంది? రియల్ వరల్డ్ లో జావాని ఎక్కడెక్కడ వాడుతున్నారు? మరియు జావా ఇంటర్నల్ గా (JVM Architecture) ఎలా పనిచేస్తుందో ఈ చాప్టర్ లో డీటెయిల్డ్ గా నేర్చుకుందాం.',
    theorySections: [
      {
        heading: '1. Java అంటే ఏంటి? హిస్టరీ & "WORA" పవర్',
        content: `**Java** అనేది హై-లెవల్, ఆబ్జెక్ట్-ఓరియెంటెడ్, మరియు సెక్యూర్ ప్రోగ్రామింగ్ లాంగ్వేజ్. దీనిని 1995 లో **James Gosling** మరియు ఆయన టీమ్ కలిసి **Sun Microsystems** (ఇప్పుడు **Oracle Corporation** చేతిలో ఉంది) లో క్రియేట్ చేశారు.

జావా రాకముందు C, C++ లాంటి లాంగ్వేజెస్ **platform-dependent** గా ఉండేవి. అంటే, ఒక Windows కంప్యూటర్ లో C ప్రోగ్రామ్ రాసి కంపైల్ చేస్తే, అది కేవలం Windows లో మాత్రమే రన్ అయ్యే \`.exe\` ఫైల్ గా మారేది. అదే ప్రోగ్రామ్ ని Mac లో లేదా Linux లో రన్ చేయాలంటే, మళ్లీ ఆ కోడ్ ని మార్చి ఆ OS కి తగ్గట్టు కంపైల్ చేయాల్సి వచ్చేది.

ఈ ప్రాబ్లమ్ ని సాల్వ్ చేస్తూ జావా **"Write Once, Run Anywhere" (WORA)** (ఒకసారి కోడ్ రాస్తే ఏ డివైజ్ లో అయినా రన్ అవుతుంది) అనే కాన్సెప్ట్ ని తీసుకొచ్చింది.

### WORA సీక్రెట్ ఏంటి?: Bytecode & JVM
జావా లో రాసిన కోడ్ ని కంపైలర్ (\`javac\`) డైరెక్ట్ గా మెషిన్ కోడ్ (జీరోలు, వన్స్) లోకి మార్చదు. దానికి బదులు, దాన్ని ఒక సగం-కంపైల్డ్ ఫార్మాట్ లోకి మారుస్తుంది. దాన్నే **Bytecode** (\`.class\` ఫైల్స్) అంటారు.

ఈ Bytecode ని ఏ కంప్యూటర్ డైరెక్ట్ గా చదవలేదు. దాన్ని చదవాలంటే **Java Virtual Machine (JVM)** అనే సాఫ్ట్ వేర్ కావాలి. మన కోడ్ ని Windows లో కంపైల్ చేసినా, ఆ వచ్చిన Bytecode ని తీసుకువెళ్లి Mac లోనో, Linux లోనో ఉన్న JVM కి ఇస్తే.. ఆ JVM ఆటోమాటిక్ గా ఆ కోడ్ ని ఆ సిస్టమ్ కి తగ్గట్టు మార్చి రన్ చేస్తుంది!`
      },
      {
        heading: '2. Java లో ఉన్న మెయిన్ ఫీచర్స్ ఏంటి?',
        content: `ఇన్ని సంవత్సరాలైనా సరే జావాకి ఇండస్ట్రీ లో అంత క్రేజ్ ఉండటానికి కారణం దాని ఫీచర్స్:

| Java Feature | అంటే ఏంటి? | ఎందుకు ఇంపార్టెంట్? |
| :--- | :--- | :--- |
| **Simple (సింపుల్)** | C++ లో ఉండే పాయింటర్స్ (pointers), మెమరీ క్లీన్ చేయడం లాంటి కష్టమైన పనుల్ని జావా తీసేసింది. | దీనివల్ల కోడ్ లో బగ్స్ రావడం తగ్గుతుంది, కొత్తవాళ్లు ఈజీగా నేర్చుకోవచ్చు. |
| **Object-Oriented (OOP)** | జావా లో ప్రతిదీ క్లాసులు, ఆబ్జెక్ట్స్ (Classes and Objects) చుట్టూనే తిరుగుతుంది. | పెద్ద పెద్ద ప్రాజెక్ట్స్ ని చిన్న భాగాలుగా విడగొట్టి నీట్ గా కోడ్ రాయడానికి ఇది బాగా ఉపయోగపడుతుంది. |
| **Platform Independent** | మనం రాసిన కోడ్ ఏ OS లో అయినా, ఏ ఆర్కిటెక్చర్ లో అయినా ఎలాంటి మార్పుల్లేకుండా రన్ అవుతుంది. | డెవలపర్ తన లాప్ టాప్ లో కోడ్ రాసి, డైరెక్ట్ గా క్లౌడ్ సర్వర్స్ (AWS, Azure) లో ఈజీగా డిప్లాయ్ చేయొచ్చు. |
| **Robust & Reliable** | దీంట్లో స్ట్రాంగ్ మెమరీ మేనేజ్మెంట్ మరియు ఆటోమేటిక్ గా చెత్తని క్లీన్ చేసే Garbage Collection ఉంది. | సడెన్ గా ప్రోగ్రామ్ క్రాష్ అవ్వకుండా, మెమరీ లీక్స్ రాకుండా సేఫ్ గా రన్ అవుతుంది. |
| **Secure (సెక్యూర్)** | జావా ప్రోగ్రామ్స్ అన్నీ JVM అనే ఒక బాక్స్ (sandbox) లోపలే రన్ అవుతాయి. వైరస్ లు రాయడం కష్టం. | బ్యాంకింగ్, ఫైనాన్షియల్ యాప్స్ చేయడానికి ఇది చాలా సేఫ్. |
| **Multi-Threaded** | ఒకేసారి రెండు మూడు పనులు (threads) పారలల్ గా చేసుకునే ఫెసిలిటీ జావాలో ఇన్-బిల్ట్ గా ఉంటుంది. | దీనివల్ల మన ప్రోగ్రామ్ చాలా ఫాస్ట్ గా పనిచేస్తుంది. |
| **High Performance** | JVM లోపల JIT (Just-In-Time) కంపైలర్ ఉంటుంది. ఇది మన కోడ్ ని చాలా స్పీడ్ గా రన్ అయ్యేలా చేస్తుంది. | C, C++ లాంటి స్పీడ్ తో సమానంగా జావా కోడ్ రన్ అవుతుంది. |`
      },
      {
        heading: '3. రియల్ వరల్డ్ లో Java ని ఎక్కడ వాడుతున్నారు?',
        content: `ప్రపంచవ్యాప్తంగా ఉన్న పెద్ద పెద్ద కంపెనీలు జావా మీద ఆధారపడి ఉన్నాయి:

1. **Enterprise Backend Microservices:** 90% పైగా టాప్ కంపెనీలు వాళ్ల సర్వర్ బ్యాకెండ్ కోడ్ ని **Spring Boot** అనే జావా ఫ్రేమ్ వర్క్ లోనే రాస్తారు. (ఉదా: ఈ-కామర్స్ సైట్స్, పేమెంట్ గేట్వేలు).
2. **Android Mobile Apps:** ఆండ్రాయిడ్ ఫోన్స్ లో వాడే చాలా యాప్స్ అన్నీ జావా తోనే తయారయ్యాయి.
3. **Banking & FinTech:** బ్యాంకింగ్ సెక్టార్ (HDFC, SBI, J.P.Morgan) మొత్తం జావా మీదే నడుస్తుంది, ఎందుకంటే ఇది చాలా సెక్యూర్ గా ఉంటుంది కాబట్టి.
4. **Big Data & AI:** పెద్ద పెద్ద డేటాని హ్యాండిల్ చేసే Apache Hadoop, Spark లాంటి టూల్స్ అన్నీ జావా తోనే రాశారు.
5. **Cloud Computing:** క్లౌడ్ సర్వర్స్ లో కూడా జావా అప్లికేషన్స్ నే ఎక్కువగా డిప్లాయ్ చేస్తారు.`
      },
      {
        heading: '4. JDK vs JRE vs JVM అంటే ఏంటి?',
        content: `జావా నేర్చుకోవాలంటే ఈ మూడింటి మధ్య తేడా కచ్చితంగా తెలియాలి:

\`\`\`
+-------------------------------------------------------------------------------+
|                       JDK (Java Development Kit)                              |
|  +-------------------------------------------------------------------------+  |
|  |  Development Tools: javac (కంపైలర్), jdb (డీబగ్గర్), javadoc లాంటివి     |  |
|  +-------------------------------------------------------------------------+  |
|                                                                               |
|  +-------------------------------------------------------------------------+  |
|  |                    JRE (Java Runtime Environment)                       |  |
|  |  +-------------------------------------+  +--------------------------+  |  |
|  |  | Java Standard Class Libraries       |  | Core Runtime Packages    |  |  |
|  |  | (String, Scanner లాంటి క్లాసులు)      |  | (సెక్యూరిటీ ఫైల్స్)          |  |  |
|  |  +-------------------------------------+  +--------------------------+  |  |
|  |                                                                         |  |
|  |  +-------------------------------------------------------------------+  |  |
|  |  |                 JVM (Java Virtual Machine)                        |  |  |
|  |  |  [ ClassLoader ] -> [ JVM Memory ] -> [ Execution Engine (JIT) ]   |  |  |
|  |  +-------------------------------------------------------------------+  |  |
|  +-------------------------------------------------------------------------+  |
+-------------------------------------------------------------------------------+
\`\`\`

- **JVM (Java Virtual Machine):** ఇది మన Bytecode ని చదివి రన్ చేసే మెయిన్ ఇంజిన్.
- **JRE (Java Runtime Environment):** JVM తో పాటు, రన్ అవ్వడానికి కావాల్సిన కొన్ని బేసిక్ క్లాసులు, లైబ్రరీలు కలిపితే దాన్ని JRE అంటారు. కేవలం ఎవరైనా రాసిన జావా యాప్ ని వాడాలి అంటే మీ సిస్టమ్ లో JRE ఉంటే చాలు.
- **JDK (Java Development Kit):** JRE తో పాటు, కోడ్ రాయడానికి కావాల్సిన కంపైలర్ (\`javac\`) లాంటి టూల్స్ అన్నీ కలిపితే JDK. ఒక డెవలపర్ గా మనం **JDK ని ఇన్స్టాల్ చేసుకోవాలి.**`
      },
      {
        heading: '5. JVM ఇంటర్నల్ ఆర్కిటెక్చర్ (లోపల ఏం జరుగుతుంది?)',
        content: `మనం \`java Main\` అని కమాండ్ ఇచ్చి కోడ్ రన్ చేయగానే, లోపల ఈ 3 స్టెప్స్ జరుగుతాయి:

\`\`\`
+-----------------------------------------------------------------------------------+
|                           JVM INTERNAL ARCHITECTURE                               |
+-----------------------------------------------------------------------------------+
|  1. CLASSLOADER SUBSYSTEM (లోడ్ చేయడం)                                               |
|     - మన .class ఫైల్స్ ని హార్డ్ డిస్క్ నుంచి మెమరీ (RAM) లోకి తీసుకువస్తుంది.           |
+-----------------------------------------------------------------------------------+
|  2. JVM RUNTIME DATA AREAS (మెమరీ డివిజన్స్)                                          |
|     +---------------------------+  +-------------------------------------------+  |
|     | Method Area / Metaspace   |  | Heap Memory (హీప్ మెమరీ)                    |  |
|     | (క్లాస్ డీటెయిల్స్)           |  | (ఆబ్జెక్ట్స్ అన్నీ ఇక్కడే స్టోర్ అవుతాయి)         |  |
|     +---------------------------+  +-------------------------------------------+  |
|     +---------------------------+  +-------------------+  +--------------------+  |
|     | Java Thread Stack         |  | PC Registers      |  | Native Method Stack|  |
|     | (లోకల్ వేరియబుల్స్)           |  | (నెక్స్ట్ లైన్ ఏంటి)|  | (C/C++ కోడ్ కోసం)    |  |
|     +---------------------------+  +-------------------+  +--------------------+  |
+-----------------------------------------------------------------------------------+
|  3. EXECUTION ENGINE (రన్ చేయడం)                                                   |
|     +-------------------+  +-------------------------+  +----------------------+  |
|     | Interpreter       |  | JIT Compiler (C1 / C2)  |  | Garbage Collector    |  |
|     | (లైన్ బై లైన్ రన్  |  | (కోడ్ ని ఫాస్ట్ గా మార్చి|  | (వేస్ట్ మెమరీ ని క్లీన్|  |
|     |  చేస్తుంది)          |  |  సేవ్ చేసుకుంటుంది)     |  |  చేస్తుంది)           |  |
|     +-------------------+  +-------------------------+  +----------------------+  |
+-----------------------------------------------------------------------------------+
\`\`\`

1. **ClassLoader Subsystem:** కోడ్ ని మెమరీ లోకి లోడ్ చేస్తుంది.
2. **Runtime Memory Areas (మెమరీ):**
   - **Heap Memory:** మనం క్రియేట్ చేసే ప్రతి ఆబ్జెక్ట్ ఇక్కడే సేవ్ అవుతుంది. దీన్ని Garbage Collector ఆటోమాటిక్ గా క్లీన్ చేస్తుంటుంది.
   - **Java Thread Stack:** మన ఫంక్షన్స్ లోపల ఉండే చిన్న చిన్న వేరియబుల్స్ ఇక్కడ ఉంటాయి.
3. **Execution Engine (మెయిన్ ఇంజిన్):**
   - **Interpreter:** కోడ్ ని లైన్ బై లైన్ చదివి రన్ చేస్తుంది.
   - **JIT (Just-In-Time) Compiler:** పదే పదే రన్ అయ్యే లూప్స్ లాంటి కోడ్ ని ముందే ఫాస్ట్ గా రన్ అయ్యే మెషిన్ కోడ్ లాగా మార్చి పెట్టుకుంటుంది (స్పీడ్ కోసం).
   - **Garbage Collector (GC):** వాడని ఆబ్జెక్ట్స్ ని మెమరీ నుంచి తీసేసి ఖాళీ చేస్తుంది.`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // జావా రన్ టైమ్ డీటెయిల్స్ ని ప్రింట్ చేయడం
        System.out.println("==========================================");
        System.out.println("   WELCOME TO OUR COMPILER JAVA MASTERCLASS ");
        System.out.println("==========================================");

        // మన సిస్టమ్ లో ఏ జావా వెర్షన్ ఉందో తెలుసుకోవడానికి:
        String javaVersion = System.getProperty("java.version");
        String javaVendor  = System.getProperty("java.vendor");
        String osName      = System.getProperty("os.name");
        String osArch      = System.getProperty("os.arch");

        System.out.println("Java Version     : " + javaVersion);
        System.out.println("Java Vendor      : " + javaVendor);
        System.out.println("Operating System : " + osName + " (" + osArch + ")");
        System.out.println("Platform Status  : Write Once, Run Anywhere (WORA) active!");
        System.out.println("==========================================");
    }
}`,
    output: `==========================================
   WELCOME TO OUR COMPILER JAVA MASTERCLASS 
==========================================
Java Version     : 21.0.2
Java Vendor      : Oracle Corporation
Operating System : Windows 11 (amd64)
Platform Status  : Write Once, Run Anywhere (WORA) active!
==========================================`,
    lineByLine: [
      { line: 'public class Main', explanation: 'Main అనే పబ్లిక్ క్లాస్ ని క్రియేట్ చేస్తున్నాం. జావాలో రాసే ప్రతీ కోడ్ ఒక క్లాస్ లోపలే ఉండాలి. మరియు ఫైల్ పేరు కచ్చితంగా Main.java అనే ఉండాలి.' },
      { line: 'public static void main(String[] args)', explanation: 'ఇది మన ప్రోగ్రామ్ స్టార్ట్ అయ్యే మెయిన్ గేట్ లాంటిది. JVM ఎప్పుడూ ఈ మెయిన్ ఫంక్షన్ (method) నుంచే కోడ్ ని రన్ చేయడం స్టార్ట్ చేస్తుంది.' },
      { line: 'System.out.println(...)', explanation: 'మనం బ్రాకెట్స్ లో ఇచ్చిన టెక్స్ట్ ని అవుట్పుట్ స్క్రీన్ (కన్సోల్) మీద ప్రింట్ చేసి, నెక్స్ట్ లైన్ కి వెళ్ళమని చెప్తున్నాం.' },
      { line: 'System.getProperty("java.version")', explanation: 'మన సిస్టమ్ లో ఇన్స్టాల్ అయి ఉన్న జావా వెర్షన్ ఏంటి లాంటి సిస్టమ్ డీటెయిల్స్ ని తెచ్చుకోవడానికి ఇది వాడతాం.' }
    ],
    practicalExample: `public class JVMMemoryInspector {
    public static void main(String[] args) {
        // మన ప్రోగ్రామ్ కి అసలు ఎంత RAM మెమరీ తీసుకుంటుందో చెక్ చేద్దాం
        Runtime runtime = Runtime.getRuntime();

        long maxMemoryMB   = runtime.maxMemory() / (1024 * 1024);
        long totalMemoryMB = runtime.totalMemory() / (1024 * 1024);
        long freeMemoryMB  = runtime.freeMemory() / (1024 * 1024);
        long usedMemoryMB  = totalMemoryMB - freeMemoryMB;
        int  cpuCores      = runtime.availableProcessors();

        System.out.println("--- JVM Runtime Health Report ---");
        System.out.println("Available CPU Cores : " + cpuCores);
        System.out.println("Max Heap Memory     : " + maxMemoryMB + " MB");
        System.out.println("Total Allocated Heap: " + totalMemoryMB + " MB");
        System.out.println("Used Heap Memory    : " + usedMemoryMB + " MB");
        System.out.println("Free Heap Memory    : " + freeMemoryMB + " MB");
    }
}`,
    practicalOutput: `--- JVM Runtime Health Report ---
Available CPU Cores : 8
Max Heap Memory     : 4096 MB
Total Allocated Heap: 256 MB
Used Heap Memory    : 14 MB
Free Heap Memory    : 242 MB`,
    commonMistakes: [
      'JDK బదులు JRE ఇన్స్టాల్ చేయడం: JRE లో కోడ్ రన్ అవుతుంది కానీ కొత్త కోడ్ రాయడానికి కావాల్సిన కంపైలర్ ఉండదు. కాబట్టి ఎప్పుడూ JDK నే ఇన్స్టాల్ చేసుకోవాలి.',
      'Java డైరెక్ట్ గా .exe అవుతుంది అనుకోవడం: జావా కోడ్ కంపైల్ చేస్తే .class ఫైల్ (Bytecode) వస్తుంది, దాన్ని రన్ చేయాలంటే మన సిస్టమ్ లో JVM ఉండాల్సిందే.',
      'JVM కూడా ప్లాట్ఫామ్ ఇండిపెండెంట్ అనుకోవడం: జావా Bytecode ఎక్కడైనా రన్ అవుతుంది కానీ.. JVM మాత్రం ఒక్కో OS కి ఒక్కోలా ఉంటుంది (Windows కి వేరే, Mac కి వేరే).'
    ],
    challenge: `// Coding Challenge:
// ఒక చిన్న జావా ప్రోగ్రామ్ రాయండి. అది ఈ కింద ఉన్న సిస్టమ్ డీటెయిల్స్ ని ప్రింట్ చేయాలి:
// 1. User Working Directory (property: "user.dir") - మీరు ఏ ఫోల్డర్ లో ఉన్నారో చెప్తుంది.
// 2. Java Virtual Machine Name (property: "java.vm.name")
// 3. User Name (property: "user.name")

public class JVMChallenge {
    public static void main(String[] args) {
        // TODO: System.getProperty() వాడి ఈ 3 డీటెయిల్స్ ని ప్రింట్ చేయండి
        
    }
}`,
    faq: [
      {
        q: 'Java లో మల్టిపుల్ క్లాస్ ఇన్హెరిటెన్స్ (Multiple Inheritance) ఎందుకు సపోర్ట్ చేయదు?',
        a: 'సింపుల్ గా చెప్పాలంటే "Diamond Problem" (అంటే రెండు పేరెంట్ క్లాసుల్లో ఒకే పేరుతో ఫంక్షన్స్ ఉంటే, దేన్ని వాడాలో కన్ఫ్యూజ్ అవ్వడం) రాకుండా ఉండటానికి జావా దీన్ని తీసేసింది. దానికి బదులు Interfaces ని వాడుకుంటాం.'
      },
      {
        q: 'JIT (Just-In-Time) కంపైలర్ వల్ల నిజంగా స్పీడ్ పెరుగుతుందా?',
        a: 'అవును. కోడ్ లో పదే పదే రన్ అయ్యే లూప్స్ (hot spots) ని ఇది ముందే కంపైల్ చేసి మెషిన్ కోడ్ లా మార్చేస్తుంది. దీనివల్ల C++ తో సమానమైన స్పీడ్ జావా కి వస్తుంది.'
      },
      {
        q: 'జావా 100% ఆబ్జెక్ట్ ఓరియెంటెడ్ (Pure OOP) లాంగ్వేజా?',
        a: 'కాదు. స్పీడ్ కోసం జావాలో 8 ప్రిమిటివ్ డేటా టైప్స్ (int, float, char లాంటివి) ఇచ్చారు. ఇవి ఆబ్జెక్ట్స్ కావు. ఇవి తప్ప మిగతావన్నీ ఆబ్జెక్ట్సే.'
      }
    ],
    recap: [
      'జావాని 1995 లో జేమ్స్ గాస్లింగ్ కనిపెట్టాడు. ఇది "Write Once, Run Anywhere" అనే కాన్సెప్ట్ తో వచ్చింది.',
      'మనం రాసే .java కోడ్ ని javac కంపైలర్ .class ఫైల్ (Bytecode) లాగా మారుస్తుంది.',
      'JVM ఆ Bytecode ని తీసుకుని మనం వాడుతున్న సిస్టమ్ కి అర్థమయ్యేలా మార్చి రన్ చేస్తుంది.',
      'కోడ్ రాయాలంటే మనకు JDK కావాలి. JRE అంటే కేవలం రన్ చేయడానికి వాడేది.'
    ]
  },

  // ==========================================
  // CHAPTER 2: Setup, IDEs & First Hello World Program
  // ==========================================
  {
    num: 2,
    phaseId: 'phase1',
    phaseTitle: 'Phase 1: Java Basics',
    slug: '02-java-installation-ide-and-first-program',
    title: 'Java Installation, IDEs & First Hello World Program (తెలుగులో)',
    badge: '2. Setup & First Program',
    subtopics: 'JDK 21 LTS Installation · Setting JAVA_HOME & PATH · IDEs vs Online Compiler · First Program Breakdown · main() Signature Anatomy · System.out.println',
    readTime: '16 min read',
    intro: 'మీ కంప్యూటర్ లో Java 21 LTS ని ఎలా ఇన్స్టాల్ చేయాలి? ప్రొఫెషనల్స్ వాడే IDEs (IntelliJ IDEA, VS Code) ఏంటి? మీ మొదటి Hello World ప్రోగ్రామ్ ఎలా రాయాలి? అందులో ఉన్న పబ్లిక్, స్టాటిక్ లాంటి ప్రతి పదం వెనక ఉన్న అర్థం ఏంటో డీటెయిల్డ్ గా చూద్దాం.',
    theorySections: [
      {
        heading: '1. Java 21 LTS ఇన్స్టాలేషన్ & ఎన్విరాన్మెంట్ వేరియబుల్స్ సెటప్',
        content: `మనం ఎప్పుడైనా జావా డౌన్లోడ్ చేసేటప్పుడు **Long-Term Support (LTS)** వెర్షన్ నే (ఉదా: Java 21 LTS లేదా 17 LTS) డౌన్లోడ్ చేసుకోవాలి.
- **Oracle JDK:** [oracle.com/java](https://www.oracle.com/java/)
- **Eclipse Temurin:** [adoptium.net](https://adoptium.net/) (ఇది చాలా కంపెనీల్లో వాడే ఫ్రీ అండ్ ఓపెన్ సోర్స్ వెర్షన్)

### Windows లో Environment Variables సెట్ చేయడం:
జావా ఇన్స్టాల్ చేసిన తర్వాత, మన సిస్టమ్ కి జావా ఎక్కడుందో చెప్పాలి:
1. **JAVA_HOME:** ఒక కొత్త వేరియబుల్ క్రియేట్ చేసి, అందులో జావా ఇన్స్టాల్ అయిన ఫోల్డర్ పాత్ (ఉదా: \`C:\\Program Files\\Eclipse Adoptium\\jdk-21.0.2\`) ఇవ్వాలి.
2. **PATH:** సిస్టమ్ లో ఉన్న Path వేరియబుల్ కి \`%JAVA_HOME%\\bin\` ని యాడ్ చేయాలి. అప్పుడే మనం టెర్మినల్ లో \`javac\`, \`java\` కమాండ్స్ వాడగలం.

### టెర్మినల్ (CMD) లో చెక్ చేయడం:
\`\`\`bash
javac -version
# అవుట్పుట్ ఇలా రావాలి: javac 21.0.2

java -version
# అవుట్పుట్ ఇలా రావాలి: openjdk version "21.0.2" ...
\`\`\``
      },
      {
        heading: '2. కోడ్ రాయడానికి బెస్ట్ ఎడిటర్స్ (IDEs) ఏవి?',
        content: `కంపెనీల్లో కోడ్ రాయడానికి నార్మల్ నోట్ ప్యాడ్ వాడరు. తప్పులు ముందే చూపించే స్మార్ట్ ఎడిటర్స్ (IDEs) వాడతారు:

- **IntelliJ IDEA (JetBrains):** జావా అనగానే గుర్తొచ్చే నెంబర్ వన్ సాఫ్ట్ వేర్ ఇదే. చాలా ఫాస్ట్ గా ఉంటుంది, తప్పులు ముందే చెప్తుంది.
- **Visual Studio Code (VS Code):** మైక్రోసాఫ్ట్ వాళ్ళది. ఇది కూడా ఫాస్ట్ అండ్ సింపుల్. "Extension Pack for Java" ఇన్స్టాల్ చేసుకుంటే సరిపోతుంది.
- **Eclipse IDE:** ఇది చాలా పాతది కానీ ఇంకా కొన్ని పెద్ద కంపెనీల్లో పాత ప్రాజెక్ట్స్ కోసం వాడుతున్నారు.
- **Our Compiler (Online):** సాఫ్ట్ వేర్స్ ఏమీ లేకుండా డైరెక్ట్ గా బ్రౌజర్ లోనే ప్రాక్టీస్ చేయాలంటే మన ఆన్లైన్ కంపైలర్ వాడుకోవచ్చు.`
      },
      {
        heading: '3. First Java Program: అందులో ఉన్న ప్రతి పదం అర్థం ఏంటి?',
        content: `ఇది జావాలో రాసే ఫస్ట్ బేసిక్ ప్రోగ్రామ్:

\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

చూడటానికి చాలా పదాలు ఉన్నట్టు అనిపిస్తాయి, కానీ ఒక్కొక్క పదం వెనక ఒక రీజన్ ఉంది:

### 1. \`public class Main\`
- **\`public\` (Access Modifier):** దీన్ని పబ్లిక్ అని ఇస్తేనే బయట ఎక్కడినుంచైనా ఈ కోడ్ ని యాక్సెస్ చేయగలం.
- **\`class\` (Keyword):** జావాలో మనం రాసే కోడ్ అంతా ఒక క్లాస్ లోపలే ఉండాలి.
- **\`Main\` (పేరు):** మన ఫైల్ కి పెట్టుకున్న పేరు. **ఇంపార్టెంట్ రూల్:** క్లాస్ కి పబ్లిక్ అని ఇస్తే.. ఆ ఫైల్ పేరు, క్లాస్ పేరు ఎగ్జాక్ట్ గా ఒకేలా ఉండాలి (\`Main.java\`).

### 2. \`public static void main(String[] args)\`
ప్రోగ్రామ్ ఎక్కడినుంచి స్టార్ట్ అవ్వాలో JVM కి చెప్పే మెయిన్ ఎంట్రీ పాయింట్ ఇదే.
- **\`public\`:** JVM ఎక్కడో బయట రన్ అవుతుంటుంది, అది మన ప్రోగ్రామ్ లోకి రావాలంటే దీన్ని పబ్లిక్ గా ఓపెన్ ఉంచాలి.
- **\`static\`:** నార్మల్ గా జావాలో ఏ ఫంక్షన్ ని కాల్ చేయాలన్నా దానికి ఆబ్జెక్ట్ క్రియేట్ చేయాలి. కానీ JVM డైరెక్ట్ గా ఈ ఫంక్షన్ ని కాల్ చేయాలి కాబట్టి ఆబ్జెక్ట్ అవసరం లేకుండా static వాడతాం.
- **\`void\`:** ఈ ఫంక్షన్ పని అయిపోయాక ఎలాంటి రిజల్ట్ ని వెనక్కి (return) ఇవ్వట్లేదు అని చెప్పడానికి.
- **\`main\`:** JVM వెతికే కీవర్డ్ ఇదే, ఈ పేరు చూసే అది ఎంట్రీ పాయింట్ అని గుర్తుపడుతుంది.
- **\`String[] args\`:** టెర్మినల్ నుంచి ఎవరైనా మనం రాసిన ప్రోగ్రామ్ కి అదనంగా ఇన్పుట్స్ పంపితే, వాటిని స్టోర్ చేసుకోవడానికి.

### 3. \`System.out.println("Hello, World!");\`
- **\`System\`:** ఇది జావాలో ముందే రాసిపెట్టిన ఒక క్లాస్ పేరు.
- **\`out\`:** ఆ క్లాస్ లోపల ఉండే ఒక పబ్లిక్ ప్రాపర్టీ (దీని పని అవుట్పుట్ ని స్క్రీన్ మీద చూపించడం).
- **\`println()\`:** టెక్స్ట్ ని ప్రింట్ చేసి, నెక్స్ట్ లైన్ కి వెళ్ళమని చెప్తున్నాం.
- **\`;\` (Semicolon):** జావాలో ప్రతి లైన్ కచ్చితంగా సెమికోలన్ తో ఎండ్ అవ్వాలి (అంటే అక్కడ స్టేట్మెంట్ కంప్లీట్ అయిందని అర్థం).`
      },
      {
        heading: '4. \`print()\` vs \`println()\` vs \`printf()\` మధ్య తేడా?',
        content: `జావాలో స్క్రీన్ మీద ప్రింట్ చేయడానికి 3 రకాల ఫంక్షన్స్ ఉంటాయి:

| Method | ఏం చేస్తుంది? | ఎగ్జాంపుల్ |
| :--- | :--- | :--- |
| **\`print()\`** | టెక్స్ట్ ప్రింట్ అవుతుంది కానీ కర్సర్ అక్కడే ఆగిపోతుంది. నెక్స్ట్ ఏం ప్రింట్ చేసినా పక్కనే వచ్చేస్తుంది. | \`System.out.print("Hi "); System.out.print("There");\` -> \`Hi There\` |
| **\`println()\`** | టెక్స్ట్ ప్రింట్ అయ్యాక, ఆటోమాటిక్ గా నెక్స్ట్ లైన్ కి వెళ్ళిపోతుంది. | \`System.out.println("Line 1"); System.out.println("Line 2");\` |
| **\`printf()\`** | వేరియబుల్స్ లో ఉన్న వాల్యూస్ ని టెక్స్ట్ మధ్యలో నీట్ గా పెట్టి ప్రింట్ చేయడానికి. | \`System.out.printf("పేరు: %s, వయసు: %d", "Ravi", 25);\` |`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // 1. println() వాడితే టెక్స్ట్ ప్రింట్ అయ్యాక కింద లైన్ కి వెళ్తుంది
        System.out.println("1. జావా స్టార్ట్ అయ్యింది.");
        System.out.println("2. ఇది ఇంకో లైన్ లో వస్తుంది:");

        // 2. print() వాడితే పక్కపక్కనే వస్తుంది
        System.out.print("   [డౌన్లోడ్: ");
        System.out.print("25% -> ");
        System.out.print("50% -> ");
        System.out.print("100% పూర్తయింది");
        System.out.println("]"); // ఇక్కడ న్యూ లైన్ కి వెళ్తుంది

        // 3. డైరెక్ట్ గా మ్యాథ్స్ చేయొచ్చు
        System.out.println("3. 10 + 20 ఎంత? = " + (10 + 20));
        System.out.println("4. Welcome to Java!");
    }
}`,
    output: `1. జావా స్టార్ట్ అయ్యింది.
2. ఇది ఇంకో లైన్ లో వస్తుంది:
   [డౌన్లోడ్: 25% -> 50% -> 100% పూర్తయింది]
3. 10 + 20 ఎంత? = 30
4. Welcome to Java!`,
    lineByLine: [
      { line: 'public class Main', explanation: 'Main.java అనే ఫైల్ పేరుతో ఒక పబ్లిక్ క్లాస్ ని స్టార్ట్ చేస్తున్నాం.' },
      { line: 'public static void main(String[] args)', explanation: 'ప్రోగ్రామ్ స్టార్ట్ అయ్యే చోటు ఇది. JVM డైరెక్ట్ గా ఈ మెయిన్ ఫంక్షన్ లోకి వస్తుంది.' },
      { line: 'System.out.print(...)', explanation: 'టెక్స్ట్ ప్రింట్ చేశాక నెక్స్ట్ లైన్ కి వెళ్ళకుండా అక్కడే ఆగిపోవడానికి వాడుతున్నాం.' },
      { line: '"..." + (10 + 20)', explanation: 'టెక్స్ట్ ని క్యాలిక్యులేట్ చేసిన నెంబర్ తో కలపడానికి ప్లస్ (+) వాడాం.' }
    ],
    practicalExample: `public class CommandLineArgs {
    public static void main(String[] args) {
        // టెర్మినల్ నుంచి ఎవరైనా ఎక్స్ట్రా డేటా పంపితే args లో స్టోర్ అవుతుంది.
        if (args.length > 0) {
            System.out.println("టెర్మినల్ నుంచి పంపిన ఇన్పుట్స్ ఇవిగో:");
            for (int i = 0; i < args.length; i++) {
                System.out.println("  ఇన్పుట్ [" + i + "]: " + args[i]);
            }
        } else {
            System.out.println("మీరు బయట నుంచి ఎలాంటి ఎక్స్ట్రా ఇన్పుట్ పంపలేదు.");
            System.out.println("ఇలా రన్ చేసి చూడండి: java CommandLineArgs Server 8080");
        }
    }
}`,
    practicalOutput: `మీరు బయట నుంచి ఎలాంటి ఎక్స్ట్రా ఇన్పుట్ పంపలేదు.
ఇలా రన్ చేసి చూడండి: java CommandLineArgs Server 8080`,
    commonMistakes: [
      'ఫైల్ పేరు, క్లాస్ పేరు వేరువేరుగా ఉండటం: మీరు కోడ్ లో "public class Main" అని రాసి, ఫైల్ ని మాత్రం test.java అని సేవ్ చేస్తే.. ఎర్రర్ వస్తుంది.',
      'స్పెల్లింగ్ లేదా క్యాపిటల్ లెటర్స్ తప్పు రాయడం: జావా case-sensitive. అంటే "System" అని రాయాలి కానీ "system" అని రాస్తే ఒప్పుకోదు.',
      'సెమికోలన్ మర్చిపోవడం: ప్రతి లైన్ చివర కచ్చితంగా సెమికోలన్ (;) ఉండాలి.',
      'మెయిన్ ఫంక్షన్ మార్చడం: "public void main()" అని static తీసేస్తే.. కోడ్ కంపైల్ అవుతుంది కానీ, రన్ చేసేటప్పుడు ఎర్రర్ వస్తుంది.'
    ],
    challenge: `// Coding Challenge:
// UserProfile అనే పేరుతో ఒక జావా ఫైల్ క్రియేట్ చేయండి. అందులో కింది విధంగా అవుట్పుట్ రావాలి:
// ----------------------------------------
//   డెవలపర్ పేరు: [మీ పేరు]
//   రోల్: Backend Java Developer
// ----------------------------------------
// (దీన్ని System.out.println వాడి ప్రింట్ చేయండి)

public class UserProfile {
    public static void main(String[] args) {
        // TODO: మీ కోడ్ ని ఇక్కడ రాయండి
        
    }
}`,
    faq: [
      {
        q: '"String[] args" అని కాకుండా వేరేలా రాయొచ్చా?',
        a: 'రాయొచ్చు! "String args[]" అని కానీ, "String... args" అని కానీ రాసినా జావా యాక్సెప్ట్ చేస్తుంది.'
      },
      {
        q: 'ఒకే ఫైల్ లో రెండు, మూడు క్లాసులు రాయొచ్చా?',
        a: 'రాయొచ్చు. కానీ ఆ ఫైల్ మొత్తంలో ఒక్క క్లాస్ కి మాత్రమే "public" అని ఉండాలి. ఆ పబ్లిక్ క్లాస్ పేరే ఫైల్ కి ఉండాలి.'
      },
      {
        q: 'main() ఫంక్షన్ లో నుంచి static అనే పదం తీసేస్తే ఏమవుతుంది?',
        a: 'కోడ్ ఎర్రర్ లేకుండా కంపైల్ అవుతుంది. కానీ రన్ చేద్దామని చూసినప్పుడు.. JVM కి పబ్లిక్ గా యాక్సెస్ అయ్యే స్టాటిక్ ఫంక్షన్ దొరకక "NoSuchMethodError" అని ఆగిపోతుంది.'
      }
    ],
    recap: [
      'జావా 21 LTS అనేది లేటెస్ట్ వెర్షన్, దాన్నే అందరూ ప్రాజెక్ట్స్ కి వాడుతున్నారు.',
      'జావా ప్రోగ్రామ్ రన్ అవ్వాలంటే కచ్చితంగా "public static void main(String[] args)" ఉండాలి.',
      'పబ్లిక్ క్లాస్ పేరు, ఫైల్ పేరు కచ్చితంగా ఒకేలా ఉండాలి.',
      'System.out.println() అంటే ప్రింట్ చేసి నెక్స్ట్ లైన్ కి వెళ్లడం. System.out.print() అంటే అక్కడే ఉండిపోవడం.'
    ]
  },

  // ==========================================
  // CHAPTER 3: Compilation, Execution & Source File Structure
  // ==========================================
  {
    num: 3,
    phaseId: 'phase1',
    phaseTitle: 'Phase 1: Java Basics',
    slug: '03-java-compilation-execution-and-source-structure',
    title: 'How Java Compiles & Runs & Source File Structure (తెలుగులో)',
    badge: '3. Compilation & File Structure',
    subtopics: 'Compilation Pipeline (javac to Bytecode to JVM) · Why Java is Compiled & Interpreted · Source File Structure Rules · Packages & Imports',
    readTime: '15 min read',
    intro: 'మనం రాసిన కోడ్ కంప్యూటర్ కి ఎలా అర్థం అవుతుంది? అసలు కంపైలేషన్ అంటే ఏంటి? జావా కోడ్ కంపైల్ అయ్యి, రన్ అయ్యే లోపల ఏం ప్రాసెస్ జరుగుతుంది? ఒక ఫైల్ లో కోడ్ రాసేటప్పుడు పైన ఏముండాలి, కింద ఏముండాలి అనే స్ట్రక్చర్ రూల్స్ ఏంటో చూద్దాం.',
    theorySections: [
      {
        heading: '1. కోడ్ రన్ అయ్యే 2-స్టెప్ ప్రాసెస్ (Compilation & Execution)',
        content: `జావా లో రాసిన కోడ్ డైరెక్ట్ గా కంప్యూటర్ కి అర్థం కాదు. మధ్యలో రెండు స్టెప్స్ ఉంటాయి:

\`\`\`
+-----------------------------------------------------------------------------------+
|                        JAVA CODE EXECUTION PIPELINE                               |
+-----------------------------------------------------------------------------------+
|  [ Step 1: Human Source Code ]                                                    |
|    ఫైల్: Main.java (మనం ఇంగ్లీష్ లాగా రాసే కోడ్)                                            |
|           |                                                                       |
|           v                                                                       |
|  [ Step 2: Java Compiler (javac) ]                                                |
|    కమాండ్: javac Main.java                                                         |
|    ఏం చేస్తుంది : మనం రాసిన కోడ్ లో తప్పులు ఏమైనా ఉన్నాయా అని చెక్ చేస్తుంది                 |
|           |                                                                       |
|           v                                                                       |
|  [ Step 3: Architecture-Neutral Bytecode ]                                        |
|    ఫైల్: Main.class (తప్పులు లేకపోతే ఈ ఫైల్ క్రియేట్ అవుతుంది)                             |
|           |                                                                       |
|           v                                                                       |
|  [ Step 4: Java Virtual Machine (JVM) ]                                           |
|    కమాండ్: java Main                                                               |
|    ఏం చేస్తుంది: ఆ .class ఫైల్ ని తీసుకుని విండోస్ అయితే విండోస్ కి, Mac అయితే Mac కి      |
|               అర్థమయ్యేలా మార్చి రన్ చేస్తుంది.                                        |
|           |                                                                       |
|           v                                                                       |
|  [ Step 5: Native Machine Execution ]                                             |
|    మన కంప్యూటర్ ప్రాసెసర్ కి (జీరోలు, వన్స్ లాగా) అర్థమై స్క్రీన్ మీద అవుట్పుట్ వస్తుంది!       |
+-----------------------------------------------------------------------------------+
\`\`\``
      },
      {
        heading: '2. జావా Compiled లాంగ్వేజా? Interpreted లాంగ్వేజా?',
        content: `C, C++ లాంటి లాంగ్వేజెస్ **Purely Compiled**. అంటే మనం రాసిన కోడ్ డైరెక్ట్ గా సిస్టమ్ కి అర్థమయ్యే \`.exe\` ఫైల్ గా మారిపోతుంది. ఇవి చాలా స్పీడ్ గా ఉంటాయి.
        
Python, JavaScript లాంటివి **Purely Interpreted**. అంటే లైన్ బై లైన్ కోడ్ ని చదువుకుంటూ రన్ అవుతాయి. ఇవి కొంచెం స్లో.

**కానీ జావా ఈ రెండింటి కాంబినేషన్:**
1. **Compilation (\`javac\`):** ముందు మనం రాసిన కోడ్ లో తప్పులు లేకుండా కంపైల్ చేసి ఒక ప్యాకెట్ (.class) లాగా మారుస్తుంది.
2. **Interpretation (JVM):** ఆ ప్యాకెట్ ని లైన్ బై లైన్ చదువుతూ రన్ చేస్తుంది. మధ్యలో ఏదైనా కోడ్ రిపీట్ అవుతుంటే **JIT (Just-In-Time) కంపైలర్** వాడి దాన్ని సూపర్ ఫాస్ట్ గా రన్ అయ్యేలా చేస్తుంది!`
      },
      {
        heading: '3. జావా ఫైల్ స్ట్రక్చర్ రూల్స్ (ఏది ఎక్కడ రాయాలి?)',
        content: `ఒక \`.java\` ఫైల్ తీసుకుంటే, అందులో ఏ లైన్ తర్వాత ఏది రావాలో ఒక ఆర్డర్ ఉంటుంది. ఇష్టం వచ్చినట్టు రాయడానికి లేదు:

\`\`\`
+-----------------------------------------------------------------------+
| 1. Package Declaration (ఫైల్ ఏ ఫోల్డర్ లో ఉందో చెప్పాలి. ఉంటే ఇదే ఫస్ట్ లైన్ లో ఉండాలి) |
|    package com.ourcompiler.tutorial;                                  |
+-----------------------------------------------------------------------+
| 2. Import Statements (బయట నుంచి వేరే టూల్స్ తెచ్చుకోవడానికి)                 |
|    import java.util.Scanner;                                          |
+-----------------------------------------------------------------------+
| 3. Main Public Class (ఫైల్ పేరు, ఈ పేరు ఒకటే ఉండాలి)                        |
|    public class Application {                                         |
|                                                                       |
|      // 4. Variables (ప్రాపర్టీస్)                                      |
|      String appName = "OurCompiler";                                  |
|                                                                       |
|      // 5. Constructors (స్టార్ట్ అవ్వగానే రన్ అయ్యేవి)                    |
|      public Application() { ... }                                     |
|                                                                       |
|      // 6. Methods (ఫంక్షన్స్ / పనులు)                                    |
|      public void start() { ... }                                      |
|                                                                       |
|      // 7. Main Entry Point (స్టార్టింగ్ పాయింట్)                          |
|      public static void main(String[] args) { ... }                   |
|    }                                                                  |
+-----------------------------------------------------------------------+
| 8. Non-Public Classes (అవసరమైతే ఎక్స్ట్రా క్లాసులు కింద రాసుకోవచ్చు)            |
|    class Helper { ... }                                               |
+-----------------------------------------------------------------------+
\`\`\`

### మెయిన్ రూల్స్:
1. **Package ఫస్ట్:** ప్యాకేజ్ పేరు ఇస్తుంటే కచ్చితంగా అదే ఫస్ట్ లైన్ లో ఉండాలి.
2. **ఒకే పబ్లిక్ క్లాస్:** ఒక ఫైల్ లో ఎన్నైనా క్లాసులు రాయొచ్చు కానీ, పబ్లిక్ క్లాస్ మాత్రం ఒకటే ఉండాలి.
3. **ఫైల్ నేమ్:** ఆ పబ్లిక్ క్లాస్ పేరే ఫైల్ కి పెట్టాలి.`
      }
    ],
    codeExample: `// 1. Package (ఇది ఒక ఫోల్డర్ లో ఉంటే కచ్చితంగా రాయాలి)
// package com.ourcompiler.demo;

// 2. Import (టైమ్ ని తెచ్చుకోవడానికి ఈ లైబ్రరీస్ వాడుతున్నాం)
import java.util.Date;
import java.time.LocalDate;

// 3. పబ్లిక్ క్లాస్ (దీని పేరు ఫైల్ పేరు ఒకటే ఉండాలి)
public class Main {
    
    // 4. క్లాస్ లోపల వేరియబుల్స్ 
    public static final String COURSE = "Java Course 2026";

    // 5. మెయిన్ ఫంక్షన్
    public static void main(String[] args) {
        System.out.println("కోర్సు పేరు: " + COURSE);
        System.out.println("ఈరోజు డేట్: " + new Date());
        System.out.println("సంవత్సరం : " + LocalDate.now().getYear());
        
        // మనమే రాసిన ఇంకో ఫంక్షన్ ని కాల్ చేయడం
        showDetails();
    }

    // 6. కస్టమ్ ఫంక్షన్
    public static void showDetails() {
        System.out.println("--- జావా ప్రోగ్రామ్ రన్ అవుతోంది ---");
    }
}`,
    output: `కోర్సు పేరు: Java Course 2026
ఈరోజు డేట్: Sun Aug 16 13:45:00 IST 2026
సంవత్సరం : 2026
--- జావా ప్రోగ్రామ్ రన్ అవుతోంది ---`,
    lineByLine: [
      { line: 'import java.util.Date;', explanation: 'జావా వాళ్ళు ముందే రాసిపెట్టిన Date క్లాస్ ని మన ఫైల్ లోకి తెచ్చుకుంటున్నాం.' },
      { line: 'public static final String COURSE', explanation: 'ఎవరూ మార్చడానికి వీల్లేని (constant) వేరియబుల్ ని క్రియేట్ చేస్తున్నాం.' },
      { line: 'showDetails();', explanation: 'కింద రాసిన కస్టమ్ ఫంక్షన్ ని ఇక్కడ కాల్ చేసి రన్ చేస్తున్నాం.' },
      { line: 'public static void showDetails()', explanation: 'మనం ఓన్ గా రాసుకున్న కస్టమ్ ఫంక్షన్. దీంట్లో ఉన్న కోడ్ కాల్ చేసినప్పుడే రన్ అవుతుంది.' }
    ],
    practicalExample: `// ఒకే ఫైల్ లో రెండు మూడు క్లాసులు రాస్తే ఎలా ఉంటుందో చూద్దాం
class Database {
    void connect() {
        System.out.println("[Database] డేటాబేస్ కి కనెక్ట్ అయ్యాం.");
    }
}

class Security {
    boolean authenticate(String pwd) {
        return pwd.equals("Secret123");
    }
}

// ఇది మెయిన్ పబ్లిక్ క్లాస్ (దీని పేరే ఫైల్ కి ఉండాలి)
public class Main {
    public static void main(String[] args) {
        System.out.println("--- యాప్ స్టార్ట్ అవుతోంది ---");
        
        Security sec = new Security();
        boolean isOk = sec.authenticate("Secret123");
        
        if (isOk) {
            System.out.println("పాస్ వర్డ్ కరెక్ట్!");
            Database db = new Database();
            db.connect();
        } else {
            System.out.println("పాస్ వర్డ్ రాంగ్!");
        }
    }
}`,
    practicalOutput: `--- యాప్ స్టార్ట్ అవుతోంది ---
పాస్ వర్డ్ కరెక్ట్!
[Database] డేటాబేస్ కి కనెక్ట్ అయ్యాం.`,
    commonMistakes: [
      'imports ని package కంటే పైన రాయడం: ప్యాకేజ్ ఉంటే అది కచ్చితంగా మొదటి లైన్ లోనే ఉండాలి, ఆ తర్వాతే ఇంపోర్ట్స్ ఉండాలి.',
      'ఒకే ఫైల్ లో రెండు పబ్లిక్ క్లాసులు రాయడం: అలా కుదరదు. ఒక ఫైల్ కి ఒక పబ్లిక్ క్లాస్ మాత్రమే ఉండాలి.',
      'java Main.class అని టైప్ చేయడం: రన్ చేసేటప్పుడు "java Main" అని క్లాస్ పేరు మాత్రమే ఇవ్వాలి, చివర .class ఇవ్వకూడదు.'
    ],
    challenge: `// Coding Challenge:
// ఒకే ఫైల్ లో కిందివి ట్రై చేయండి:
// 1. APP_NAME = "My First App" అనే ఒక కాన్స్టంట్ వేరియబుల్ క్రియేట్ చేయండి.
// 2. printStatus() అనే ఫంక్షన్ రాసి, అందులో "All good!" అని ప్రింట్ చేయండి.
// 3. main() ఫంక్షన్ నుంచి దాన్ని కాల్ చేయండి.

public class Main {
    // TODO: APP_NAME ని ఇక్కడ రాయండి
    
    // TODO: printStatus() ఫంక్షన్ రాయండి

    public static void main(String[] args) {
        // TODO: కాల్ చేయండి
        
    }
}`,
    faq: [
      {
        q: '.class ఫైల్ లో ఏముంటుంది?',
        a: 'అందులో కంప్యూటర్ కి మాత్రమే అర్థమయ్యే బైనరీ బైట్ కోడ్ (Bytecode), వేరియబుల్స్ డీటెయిల్స్ లాంటివి ఉంటాయి.'
      },
      {
        q: 'మరి String, System లాంటి క్లాసులు మనం ఇంపోర్ట్ చేసుకోలేదు కదా?',
        a: 'java.lang అనే ప్యాకేజ్ లో ఉండే ఈ బేసిక్ క్లాసుల్ని జావా కంపైలర్ ఆటోమాటిక్ గా ఇంపోర్ట్ చేసేస్తుంది. మనం రాయనక్కర్లేదు.'
      }
    ],
    recap: [
      'మనం రాసే జావా కోడ్ కంపైలర్ ద్వారా బైట్ కోడ్ గా మారి, ఆ తర్వాత JVM దాన్ని రన్ చేస్తుంది.',
      'జావా ఫైల్ లో ఎప్పుడూ Package ఫస్ట్ ఉండాలి, తర్వాత Imports, తర్వాత Class ఉండాలి.',
      'ఒక ఫైల్ లో ఎన్ని క్లాసులు ఉన్నా సరే.. ఒకటే పబ్లిక్ క్లాస్ ఉండాలి. దాని పేరే ఫైల్ కి ఉండాలి.'
    ]
  },

  // ==========================================
  // CHAPTER 4: Comments & Naming Conventions
  // ==========================================
  {
    num: 4,
    phaseId: 'phase1',
    phaseTitle: 'Phase 1: Java Basics',
    slug: '04-java-comments-and-naming-conventions',
    title: 'Java Comments & Industry Naming Conventions (తెలుగులో)',
    badge: '4. Comments & Naming Rules',
    subtopics: 'Single-line // · Multi-line /* */ · Javadoc /** */ with Tags · Naming Conventions (PascalCase, camelCase, UPPER_SNAKE_CASE) · Self-Documenting Code',
    readTime: '14 min read',
    intro: 'కోడ్ పక్కన మనకు అర్థమయ్యేలా చిన్న నోట్స్ (Comments) ఎలా రాసుకోవాలి? అందులో Javadoc కామెంట్స్ స్పెషాలిటీ ఏంటి? మరియు ఇండస్ట్రీ లో కోడ్ రాసేటప్పుడు ఏ వేరియబుల్ కి ఎట్లాంటి పేర్లు (Naming Conventions) పెట్టాలో నేర్చుకుందాం.',
    theorySections: [
      {
        heading: '1. కామెంట్స్ (Comments) లో 3 రకాలు',
        content: `మనం రాసిన కోడ్ ఏంటో తర్వాత చూస్తే మనకే అర్థం కాదు. అందుకే దాని పక్కనే చిన్న వివరణ రాసుకుంటాం. వీటిని కంపైలర్ పట్టించుకోదు, అసలు కోడ్ లోకే తీసుకోదు కాబట్టి ఎంత పెద్దవి రాసినా ఫైల్ సైజ్ పెరగదు.

### 1. Single-Line Comments (\`//\`)
ఒకే లైన్ లో సింపుల్ గా వివరించడానికి:
\`\`\`java
// బిల్ కి 18% GST యాడ్ చేస్తున్నాం
double total = amt + (amt * 0.18);
\`\`\`

### 2. Multi-Line Comments (\`/* ... */\`)
పెద్ద పెద్ద పేరాలు రాయాలన్నా, లేదా కొంత కోడ్ ని రన్ అవ్వకుండా టెంపరరీ గా ఆఫ్ చేయాలన్నా:
\`\`\`java
/*
 * ఈ కింది కోడ్ కస్టమర్ డేటాబేస్ ని చెక్ చేస్తుంది.
 * ప్రస్తుతానికి ఆఫ్ చేసాం.
 */
\`\`\`

### 3. Javadoc Comments (\`/** ... */\`)
కంపెనీల్లో ఒక క్లాస్ ఎందుకు రాశారు? ఒక ఫంక్షన్ కి ఏ ఇన్పుట్ ఇవ్వాలి? అని నీట్ గా డాక్యుమెంటేషన్ రెడీ చేయడానికి ఇది వాడతారు. దీన్ని వాడి ఆటోమాటిక్ గా HTML వెబ్ పేజీలని జనరేట్ చేయొచ్చు:
\`\`\`java
/**
 * టోటల్ అమౌంట్ ని క్యాలిక్యులేట్ చేసే ఫంక్షన్.
 *
 * @param price ట్యాక్స్ కలపక ముందు ఉన్న ఒరిజినల్ రేటు
 * @param tax ట్యాక్స్ పర్సంటేజ్ (ఉదా: 0.18)
 * @return ఫైనల్ గా కట్టాల్సిన అమౌంట్
 */
public double getFinalPrice(double price, double tax) {
    return price + (price * tax);
}
\`\`\``
      },
      {
        heading: '2. స్టాండర్డ్ Javadoc టాగ్స్',
        content: `మనం వాడే మెయిన్ టాగ్స్ ఇవే:

| టాగ్ | ఎలా రాయాలి? | ఎందుకు వాడుతారు? |
| :--- | :--- | :--- |
| **\`@author\`** | \`@author Balaji\` | ఈ కోడ్ రాసింది ఎవరు అని చెప్పడానికి. |
| **\`@version\`** | \`@version 1.0\` | ఇది ఎన్నో వెర్షన్ అని రాయడానికి. |
| **\`@param\`** | \`@param name యూజర్ పేరు\` | ఫంక్షన్ కి ఇచ్చే ఇన్పుట్ వేరియబుల్స్ గురించి వివరించడానికి. |
| **\`@return\`** | \`@return టోటల్ అమౌంట్\` | ఫంక్షన్ రన్ అయ్యాక తిరిగి వచ్చే రిజల్ట్ గురించి చెప్పడానికి. |
| **\`@throws\`** | \`@throws Exception ఎర్రర్ వస్తే\` | ఏ టైమ్ లో ఎర్రర్స్ రావచ్చో చెప్పడానికి. |`
      },
      {
        heading: '3. జావా Naming Conventions (పేర్లు ఎలా పెట్టాలి?)',
        content: `కంపెనీల్లో కోడ్ రాసేటప్పుడు ఇష్టం వచ్చినట్టు పేర్లు పెట్టకూడదు. జావా కి కొన్ని గ్లోబల్ రూల్స్ ఉన్నాయి. వాటిని ఫాలో అవ్వాల్సిందే:

| దేనికి? | రూల్ ఏంటి? | ఎగ్జాంపుల్ | గుర్తుపెట్టుకోవాల్సింది |
| :--- | :--- | :--- | :--- |
| **Classes (క్లాసులు)** | **PascalCase** | \`BankAccount\`, \`UserLogin\` | ప్రతి పదం మొదటి అక్షరం క్యాపిటల్ ఉండాలి. ఇవి ఎప్పుడూ నామవాచకాలు (Nouns) అయి ఉండాలి. |
| **Methods (ఫంక్షన్స్)** | **camelCase** | \`calculateTotal()\`, \`sendEmail()\` | మొదటి పదం స్మాల్ లెటర్, తర్వాత వచ్చే పదాల మొదటి అక్షరం క్యాపిటల్. ఇవి ఎప్పుడూ పనులు (Verbs) లాగా ఉండాలి. |
| **Variables (వేరియబుల్స్)** | **camelCase** | \`userAge\`, \`totalPrice\` | ఇది కూడా camelCase ఏ ఫాలో అవుతుంది. |
| **Constants (కాన్స్టంట్స్)** | **UPPER_SNAKE_CASE** | \`MAX_SPEED\`, \`DEFAULT_TAX\` | అన్నీ క్యాపిటల్ లెటర్స్ ఏ, పదాల మధ్యలో అండర్ స్కోర్ (_) ఉండాలి. |
| **Packages (ప్యాకేజెస్)** | **అన్నీ స్మాల్ లెటర్స్** | \`com.ourcompiler.user\` | అన్నీ స్మాల్ లెటర్స్ లో ఉండాలి, గ్యాప్స్ ఉండకూడదు. |`
      }
    ],
    codeExample: `/**
 * Naming Conventions ని కరెక్ట్ గా ఫాలో అవుతూ రాసిన కోడ్.
 *
 * @author మన కంపైలర్ టీమ్
 */
public class Main { // క్లాస్ పేరు PascalCase లో ఉంది

    // కాన్స్టంట్స్ UPPER_SNAKE_CASE లో ఉన్నాయి
    public static final double DEFAULT_TAX = 0.18;
    public static final String CURRENCY = "₹";

    /**
     * ట్యాక్స్ కలిపి ఫైనల్ అమౌంట్ ఎంత అవుతుందో లెక్కించే ఫంక్షన్.
     */
    public static double computeBill(double itemPrice) { // ఫంక్షన్ పేరు, వేరియబుల్స్ camelCase లో ఉన్నాయి
        // ట్యాక్స్ ని లెక్కించడం
        double taxAmount = itemPrice * DEFAULT_TAX;
        return itemPrice + taxAmount;
    }

    public static void main(String[] args) {
        double productPrice = 2500.0; 
        double totalPayable = computeBill(productPrice);

        System.out.println("ప్రోడక్ట్ ధర : " + CURRENCY + productPrice);
        System.out.println("ట్యాక్స్ రేటు : 18%");
        System.out.println("ఫైనల్ బిల్  : " + CURRENCY + totalPayable);
    }
}`,
    output: `ప్రోడక్ట్ ధర : ₹2500.0
ట్యాక్స్ రేటు : 18%
ఫైనల్ బిల్  : ₹2950.0`,
    lineByLine: [
      { line: '/** ... */', explanation: 'క్లాస్ కి పైన రాసిన Javadoc కామెంట్. రేపు పొద్దున్న డాక్యుమెంటేషన్ జనరేట్ చేసినప్పుడు ఇది వెబ్ సైట్ లో కనిపిస్తుంది.' },
      { line: 'public static final double DEFAULT_TAX', explanation: 'ఇది ఒక కాన్స్టంట్ కాబట్టి అన్నీ క్యాపిటల్ లెటర్స్, మధ్యలో అండర్ స్కోర్ ఇచ్చాం (UPPER_SNAKE_CASE).' },
      { line: 'double taxAmount = ...', explanation: 'లోకల్ వేరియబుల్స్ కాబట్టి ఫస్ట్ లెటర్ స్మాల్ ఉండి, తర్వాత పదం క్యాపిటల్ తో స్టార్ట్ అయ్యేలా (camelCase) ఇచ్చాం.' }
    ],
    practicalExample: `/**
 * ఎంప్లాయ్ డీటెయిల్స్ స్టోర్ చేసే క్లాస్.
 */
class Employee {
    // వేరియబుల్స్ camelCase లో
    private String empName;
    private double monthlySal;

    public Employee(String empName, double monthlySal) {
        this.empName = empName;
        this.monthlySal = monthlySal;
    }

    // ఫంక్షన్స్ camelCase లో
    public double getAnnualCTC() {
        final double BONUS_PCT = 0.10; // కాన్స్టంట్
        double annualBase = this.monthlySal * 12;
        return annualBase + (annualBase * BONUS_PCT);
    }

    public void printInfo() {
        System.out.println("పేరు     : " + empName);
        System.out.println("వార్షిక జీతం: ₹" + getAnnualCTC());
    }
}

public class Main {
    public static void main(String[] args) {
        Employee dev = new Employee("Balaji", 85000);
        dev.printInfo();
    }
}`,
    practicalOutput: `పేరు     : Balaji
వార్షిక జీతం: ₹1122000.0`,
    commonMistakes: [
      'క్లాస్ కి స్మాల్ లెటర్ తో స్టార్ట్ చేయడం: "class bankAccount" అని ఇవ్వకూడదు, "class BankAccount" అని మాత్రమే ఇవ్వాలి.',
      'వేరియబుల్స్ కి అండర్ స్కోర్స్ వాడటం: C, Python లో "user_age" అని వాడతారు కానీ, జావా లో కచ్చితంగా "userAge" అని camelCase వాడాలి.',
      'అవసరం లేని చోటల్లా కామెంట్స్ పెట్టడం: "System.out.println()" పక్కన "ఇది ప్రింట్ చేస్తుంది" అని కామెంట్ పెట్టడం వేస్ట్. అర్థం కాని కాంప్లెక్స్ లాజిక్ కి మాత్రమే కామెంట్స్ రాయాలి.'
    ],
    challenge: `// Coding Challenge:
// ఈ కింది కోడ్ లో Naming Conventions అన్నీ తప్పుగా ఉన్నాయి. వాటిని కరెక్ట్ చేయండి:
// - Class name: employee_manager -> ???
// - Constant: max_limit = 500 -> ???
// - Variable: User_first_Name -> ???
// - Method: Calculate_Salary() -> ???

public class Main {
    public static void main(String[] args) {
        // TODO: పైన ఉన్న వాటిని కరెక్ట్ గా మార్చి రాయండి
        
    }
}`,
    faq: [
      {
        q: 'Javadoc కామెంట్స్ ని HTML లాగా ఎలా మార్చాలి?',
        a: 'టెర్మినల్ లో "javadoc Main.java" అని కమాండ్ ఇస్తే, ఆటోమాటిక్ గా ఒక వెబ్ పేజీ లాగా డాక్యుమెంటేషన్ ఫైల్స్ అన్నీ క్రియేట్ అవుతాయి.'
      },
      {
        q: 'వేరియబుల్ పేర్లలో నంబర్స్ వాడొచ్చా?',
        a: 'వాడొచ్చు, కానీ ఫస్ట్ లెటర్ నంబర్ అవ్వకూడదు (ఉదా: 1stName అని ఇవ్వకూడదు. firstName1 అని ఇవ్వొచ్చు).'
      }
    ],
    recap: [
      'కామెంట్స్ ని కంపైలర్ వదిలేస్తుంది, కాబట్టి ఎన్ని రాసినా ఫైల్ సైజ్ పెరగదు.',
      'Classes కి PascalCase, వేరియబుల్స్ కి, ఫంక్షన్స్ కి camelCase వాడాలి.',
      'లైఫ్ లో వాల్యూ మారదు అనుకున్న కాన్స్టంట్స్ కి UPPER_SNAKE_CASE వాడాలి.'
    ]
  },

  // ==========================================
  // CHAPTER 5: Java Error Types & Debugging
  // ==========================================
  {
    num: 5,
    phaseId: 'phase1',
    phaseTitle: 'Phase 1: Java Basics',
    slug: '05-java-errors-debugging-and-troubleshooting',
    title: 'Java Error Types, Stack Traces & Debugging (తెలుగులో)',
    badge: '5. Errors & Debugging',
    subtopics: 'Compile-Time / Syntax Errors · Runtime Errors & Exceptions · Logical Errors · Stack Trace Anatomy · Defensive Debugging',
    readTime: '15 min read',
    intro: 'కోడ్ రాసేటప్పుడు ఎర్రర్స్ రావడం కామన్. జావాలో మెయిన్ గా 3 రకాల ఎర్రర్స్ ఉంటాయి (Compile-time, Runtime, Logical). అసలు స్టాక్ ట్రేస్ (Stack Trace) ని ఎలా చదవాలో, బగ్స్ ని ఈజీగా ఎలా పట్టుకోవాలో ఈ చాప్టర్ లో నేర్చుకుందాం.',
    theorySections: [
      {
        heading: '1. జావాలో 3 రకాల ఎర్రర్స్',
        content: `మనం చేసే తప్పులు మెయిన్ గా 3 కేటగిరీల కిందకి వస్తాయి:

\`\`\`
+-----------------------------------------------------------------------------------+
|                        JAVA ERROR HIERARCHY (ఎర్రర్స్ రకాలు)                          |
+-----------------------------------------------------------------------------------+
| 1. COMPILE-TIME ERRORS (గ్రామర్ తప్పులు)                                            |
|    - ఎవరు పట్టుకుంటారు?: మనం రన్ చేయకముందే javac కంపైలర్ పట్టుకుంటుంది.                 |
|    - ఎగ్జాంపుల్ : సెమికోలన్ (;) మర్చిపోవడం, బ్రాకెట్స్ సరిగ్గా క్లోజ్ చేయకపోవడం లాంటివి.            |
|    - ఎలా ఉంటుంది?: ఏ లైన్ లో తప్పుందో క్లియర్ గా చూపిస్తుంది కాబట్టి సాల్వ్ చేయడం ఈజీ.        |
+-----------------------------------------------------------------------------------+
| 2. RUNTIME ERRORS & EXCEPTIONS (క్రాష్ అవ్వడం)                                        |
|    - ఎవరు పట్టుకుంటారు?: కోడ్ రన్ అవుతున్నప్పుడు మధ్యలో JVM ఆపేస్తుంది.                     |
|    - ఎగ్జాంపుల్ : ఒక నెంబర్ ని సున్నా (0) తో డివైడ్ చేయడం, లేని ఫైల్ ని ఓపెన్ చేయాలని చూడటం.   |
|    - ఎలా ఉంటుంది?: ఇది చాలా డేంజర్, యాప్ మొత్తం క్లోజ్ అయిపోయి ఎర్రర్ మెసేజ్ (Stack Trace) వస్తుంది. |
+-----------------------------------------------------------------------------------+
| 3. LOGICAL ERRORS (లాజిక్ తప్పులు)                                                   |
|    - ఎవరు పట్టుకుంటారు?: కంపైలర్ పట్టుకోలేదు, రన్ టైమ్ లో యాప్ క్రాష్ అవ్వదు.. మనమే చూసుకోవాలి.  |
|    - ఎగ్జాంపుల్ : ఫార్ములాలో ప్లస్ (+) బదులు మైనస్ (-) పెట్టడం.                             |
|    - ఎలా ఉంటుంది?: అంతా పర్ఫెక్ట్ గా రన్ అవుతుంది కానీ వచ్చే ఆన్సర్/రిజల్ట్ తప్పు వస్తుంది!      |
+-----------------------------------------------------------------------------------+
\`\`\``
      },
      {
        heading: '2. Stack Trace ని ఎలా చదవాలి?',
        content: `మన ప్రోగ్రామ్ మధ్యలో క్రాష్ అయినప్పుడు టెర్మినల్ లో ఒక పెద్ద ఎర్రర్ మెసేజ్ వస్తుంది. దీన్నే **Stack Trace** అంటారు. దీన్ని పైనుంచి కిందకు కరెక్ట్ గా చదవడం వస్తే 90% బగ్స్ ని ఈజీగా సాల్వ్ చేయొచ్చు:

\`\`\`
Exception in thread "main" java.lang.ArithmeticException: / by zero
    at Calculator.divide(Calculator.java:14)
    at OrderProcessor.calculateCost(OrderProcessor.java:28)
    at Main.main(Main.java:8)
\`\`\`

### దీన్ని ఎలా అర్థం చేసుకోవాలి?:
1. **ఏ థ్రెడ్ లో జరిగింది?:** \`Exception in thread "main"\` అంటే మెయిన్ ప్రోగ్రామ్ రన్ అవుతున్నప్పుడే క్రాష్ అయ్యింది.
2. **ఏం ఎర్రర్?:** \`java.lang.ArithmeticException\` (మ్యాథ్స్ లో ఏదో తప్పు జరిగింది).
3. **ఎందుకు వచ్చింది?:** \`/: by zero\` (ఏదో నెంబర్ ని సున్నాతో డివైడ్ చేసాం).
4. **కిందనుంచి పైకి చదవాలి:**
   - \`Main.java:8\`: ఫస్ట్ 8వ లైన్ లో ప్రోగ్రామ్ స్టార్ట్ అయ్యింది.
   - అక్కడినుంచి \`OrderProcessor.java:28\` లైన్ కి వెళ్ళింది.
   - అక్కడినుంచి \`Calculator.java:14\` వ లైన్ లో ఉన్న \`divide()\` ఫంక్షన్ లోపలికి వెళ్లి.. అక్కడ క్రాష్ అయ్యింది! (సో, ప్రాబ్లమ్ ఆ 14 వ లైన్ లోనే ఉంది).`
      },
      {
        heading: '3. కామన్ గా వచ్చే ఎర్రర్స్ లిస్ట్',
        content: `| ఎర్రర్ పేరు | ఏ రకం? | ఎందుకొస్తుంది? | ఎలా సాల్వ్ చేయాలి? |
| :--- | :--- | :--- | :--- |
| **\`cannot find symbol\`** | Compile-Time | ఆ పేరుతో అసలు వేరియబుల్ లేకపోవడం లేదా స్పెల్లింగ్ తప్పుండటం. | స్పెల్లింగ్ చెక్ చేయండి లేదా ఆ వేరియబుల్ ని క్రియేట్ చేయండి. |
| **\`incompatible types\`** | Compile-Time | నెంబర్ పెట్టాల్సిన చోట టెక్స్ట్ (String) ఇస్తే. | టైప్ ని కరెక్ట్ గా మార్చండి (Type casting). |
| **\`NullPointerException\`** | Runtime | వేరియబుల్ లో ఏ డేటా (null) లేకముందే దాన్ని వాడాలని చూస్తే. | ఆ వేరియబుల్ లో నిజంగా డేటా ఉందా లేదా అని \`!= null\` తో చెక్ చేయండి. |
| **\`ArrayIndexOutOfBounds\`**| Runtime | అర్రే లో 5 ఐటమ్స్ ఉంటే, 6వ ఐటమ్ ని అడిగితే. | లూప్ కరెక్ట్ గా అర్రే సైజ్ వరకే ఉందో లేదో చెక్ చేసుకోండి. |
| **\`ArithmeticException\`** | Runtime | ఏ నెంబర్ ని అయినా సున్నా (0) తో భాగిస్తే (\`10 / 0\`). | డివైడ్ చేసేముందు ఆ నెంబర్ 0 కాదని చెక్ చేసుకోండి. |`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        System.out.println("--- ఎర్రర్స్ రాకుండా కోడ్ రాయడం (Defensive Programming) ---");

        int dividend = 100;
        int divisor  = 0;

        // 1. సున్నాతో డివైడ్ చేస్తే క్రాష్ అవుతుంది కాబట్టి, ముందే చెక్ చేస్తున్నాం:
        if (divisor != 0) {
            int result = dividend / divisor;
            System.out.println("రిజల్ట్: " + result);
        } else {
            System.out.println("[హ్యాండిల్ చేశాం]: సున్నాతో డివైడ్ చేయలేం. క్రాష్ అవ్వకుండా ఆపాం.");
        }

        // 2. ఖాళీగా ఉన్నదాని (null) మీద ఫంక్షన్స్ కాల్ చేస్తే NullPointerException వస్తుంది:
        String username = null;
        if (username != null) {
            System.out.println("పేరు పొడవు: " + username.length());
        } else {
            System.out.println("[హ్యాండిల్ చేశాం]: పేరు లేదు (null). డిఫాల్ట్ గా 'Guest' అని పెడుతున్నాం.");
        }

        System.out.println("క్రాష్ అవ్వకుండా ప్రోగ్రామ్ సేఫ్ గా కంప్లీట్ అయ్యింది!");
    }
}`,
    output: `--- ఎర్రర్స్ రాకుండా కోడ్ రాయడం (Defensive Programming) ---
[హ్యాండిల్ చేశాం]: సున్నాతో డివైడ్ చేయలేం. క్రాష్ అవ్వకుండా ఆపాం.
[హ్యాండిల్ చేశాం]: పేరు లేదు (null). డిఫాల్ట్ గా 'Guest' అని పెడుతున్నాం.
క్రాష్ అవ్వకుండా ప్రోగ్రామ్ సేఫ్ గా కంప్లీట్ అయ్యింది!`,
    lineByLine: [
      { line: 'if (divisor != 0)', explanation: 'క్రాష్ (ArithmeticException) అవ్వకుండా ముందే సేఫ్ గా చెక్ చేస్తున్నాం.' },
      { line: 'if (username != null)', explanation: 'జావాలో ఎక్కువగా వచ్చే NullPointerException రాకుండా ముందే ఆపుతున్నాం.' }
    ],
    practicalExample: `// లాజికల్ ఎర్రర్ (Logical Error) కి బెస్ట్ ఎగ్జాంపుల్
public class Main {
    public static void main(String[] args) {
        double subtotal = 1000.0;
        double discount = 10; // 10% డిస్కౌంట్ ఇద్దాం అనుకున్నాం

        // 1. ఇక్కడ లాజిక్ తప్పు (BUG):
        // జావాలో రెండు నెంబర్స్ (10, 100) ఇంటిజర్స్ అయితే.. రిజల్ట్ కూడా ఇంటిజరే వస్తుంది.
        // అంటే (10 / 100) క్యాలిక్యులేట్ చేస్తే 0.1 కాకుండా 0 వస్తుంది!
        double buggyDiscount = subtotal * (10 / 100); // 1000 * 0 = 0
        double buggyFinalPrice = subtotal - buggyDiscount;

        // 2. కరెక్ట్ లాజిక్:
        // కనీసం ఒక నెంబర్ పక్కన .0 (100.0) అని పెడితే అది డెసిమల్ లాగా క్యాలిక్యులేట్ అవుతుంది (0.1 వస్తుంది).
        double correctDiscount = subtotal * (discount / 100.0);
        double correctFinalPrice = subtotal - correctDiscount;

        System.out.println("బిల్ అమౌంట్    : ₹" + subtotal);
        System.out.println("బగ్ ఉన్న రిజల్ట్ : ₹" + buggyFinalPrice + " (డిస్కౌంట్ అప్లై అవ్వలేదు!)");
        System.out.println("కరెక్ట్ రిజల్ట్ : ₹" + correctFinalPrice + " (10% డిస్కౌంట్ అప్లై అయ్యింది)");
    }
}`,
    practicalOutput: `బిల్ అమౌంట్    : ₹1000.0
బగ్ ఉన్న రిజల్ట్ : ₹1000.0 (డిస్కౌంట్ అప్లై అవ్వలేదు!)
కరెక్ట్ రిజల్ట్ : ₹900.0 (10% డిస్కౌంట్ అప్లై అయ్యింది)`,
    commonMistakes: [
      'ఇంటిజర్ మ్యాథ్స్ తప్పులు: పైన చూసినట్టు (10 / 100) ఇస్తే 0 వస్తుంది. కచ్చితంగా డెసిమల్స్ కావాలంటే 10.0 / 100.0 అని వాడాలి.',
      'లూప్స్ లో తప్పులు (Off-by-one): లూప్ రాసేటప్పుడు <= length అని ఇస్తే అర్రే సైజు దాటిపోయి ఎర్రర్ వస్తుంది. ఎప్పుడూ < length మాత్రమే వాడాలి.',
      'కంపైలర్ వార్నింగ్స్ ని ఇగ్నోర్ చేయడం: మీ ఎడిటర్ లో ఏదైనా ఎల్లో కలర్ గీత వస్తే దాన్ని లైట్ తీసుకోకండి. అది ఫ్యూచర్ లో క్రాష్ అయ్యే బగ్ కి వార్నింగ్ అయి ఉండొచ్చు.'
    ],
    challenge: `// Coding Challenge:
// ఈ కింది కోడ్ లో 3 తప్పులు ఉన్నాయి (సింటాక్స్ తప్పు, రన్ టైమ్ తప్పు, లాజిక్ తప్పు).
// ఆ మూడింటినీ కనిపెట్టి కరెక్ట్ ఆన్సర్ 85.0 వచ్చేలా చేయండి.

public class Main {
    public static void main(String[] args) {
        int score1 = 80;
        int score2 = 90;
        
        // తప్పులు ఇక్కడే ఉన్నాయి, కరెక్ట్ చేయండి:
        // double avg = (score1 + score2) / 2
        // System.out.println("Average: " + avg);
    }
}`,
    faq: [
      {
        q: 'Java లో "Error" కీ, "Exception" కీ తేడా ఏంటి?',
        a: 'సిస్టమ్ లో RAM అయిపోవడం లాంటివి జరిగితే వాటిని Error అంటారు, మన ప్రోగ్రామ్ వాటిని ఏం చేయలేదు. కానీ మన కోడ్ లో ఏమైనా తప్పు జరిగితే (ఉదా: సున్నాతో డివైడ్ చేయడం) వాటిని Exception అంటారు, మనం కోడ్ తో వాటిని హ్యాండిల్ చేసి క్రాష్ అవ్వకుండా కాపాడొచ్చు.'
      },
      {
        q: 'స్టాక్ ట్రేస్ 50 లైన్లు ఉంటే ఎలా చదవాలి?',
        a: 'మొత్తం చదవాల్సిన పనిలేదు. కింద "Caused by:" అని ఎక్కడ ఉందో చూసి, అందులో మన ఫైల్ పేరు (ఉదా: Main.java) ఎక్కడుందో వెతికితే చాలు. మిగతావన్నీ జావా లోపల ఉండే లైబ్రరీల లైన్స్, వాటితో మనకు పనిలేదు.'
      }
    ],
    recap: [
      'Compile-time ఎర్రర్స్ ని కంపైలర్ పట్టుకుంటుంది, ఇవి ఉంటే అసలు యాప్ రన్ అవ్వదు.',
      'Runtime ఎర్రర్స్ వస్తే యాప్ మధ్యలో క్రాష్ అయిపోయి Stack Trace ని ప్రింట్ చేస్తుంది.',
      'Logical ఎర్రర్స్ ఉంటే యాప్ క్రాష్ అవ్వదు కానీ, వచ్చే రిజల్ట్ తప్పు వస్తుంది.',
      'స్టాక్ ట్రేస్ ని ఎప్పుడూ కిందనుంచి పైకి చదవాలి.'
    ]
  }
];
