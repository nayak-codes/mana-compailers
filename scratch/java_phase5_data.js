// Phase 5: Loops & Iterations (Chapters 19 to 22)
// Exhaustive conceptual theory, ASCII loop execution flowcharts, for/while/do-while, enhanced for-each, break/continue, and 10+ algorithms/patterns.

module.exports = [
  // ==========================================
  // CHAPTER 19: For Loop & Core Loop Mechanics
  // ==========================================
  {
    num: 19,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Loops & Control Flow',
    slug: '19-java-for-loop-and-loop-mechanics',
    title: 'Java for Loop & Core Loop Mechanics (తెలుగులో)',
    badge: '19. for Loop & Mechanics',
    subtopics: 'Why Loops are Used (DRY Principle) · 3 Pillars (Initialization, Condition, Update) · for Loop Lifecycle · Infinite Loops · Sum of Numbers · Multiplication Table',
    readTime: '16 min read',
    intro: 'జావాలో ఒకే పనిని మళ్ళీ మళ్ళీ (రిపీట్) ఎలా చేయాలి? లూప్స్ ఎందుకు వాడాలి? అసలు లూప్స్ ఎలా పనిచేస్తాయి? `for` లూప్ ఎలా రాయాలి? పొరపాటున ఆడని లూప్ (Infinite loop) రాస్తే యాప్ ఎందుకు క్రాష్ అవుతుందో ఈ చాప్టర్ లో చూద్దాం.',
    theorySections: [
      {
        heading: '1. అసలు లూప్స్ ఎందుకు వాడాలి? (The DRY Principle)',
        content: `కంప్యూటర్ ప్రోగ్రామింగ్ లో చాలాసార్లు ఒకే పనిని మళ్ళీ మళ్ళీ చేయాల్సి వస్తుంది:
- 1 నుంచి 100 వరకు నంబర్స్ ప్రింట్ చేయడం.
- డేటాబేస్ లో ఉన్న 10,000 మంది కస్టమర్స్ డేటాని ప్రాసెస్ చేయడం.
- ప్రతి నెలా పడే వడ్డీని క్యాలిక్యులేట్ చేయడం.

ఒకవేళ లూప్స్ లేకపోతే, 100 నంబర్స్ ప్రింట్ చేయడానికి 100 లైన్ల కోడ్ రాయాలి! అది చాలా కష్టం.

అందుకే **Loops** వాడతాం. ఒక లాజిక్ ని ఒక్కసారి రాసి, దాన్ని ఎన్నిసార్లయినా రిపీట్ చేయమని చెప్పొచ్చు. దీన్నే **DRY (Don't Repeat Yourself)** అని అంటారు (అంటే రాసిన కోడ్ నే మళ్ళీ మళ్ళీ రాయకూడదు అని అర్థం).

\`\`\`
                     +-----------------------+
                     | 1. స్టార్ట్ ఎక్కడనుంచి? | (int i = 1)
                     +-----------------------+
                                 |
                                 v
               +------------> < 2. కండిషన్ ట్రూ నా? > (i <= 5)
               |                     |
               |              (అవును) |  (కాదు)
               |                     v    +------------> [ లూప్ లోంచి బయటకి ]
               |           +-------------------+
               |           | 3. కోడ్ రన్ అవుతుంది | (లోపల ఉన్న లాజిక్)
               |           +-------------------+
               |                     |
               |                     v
               |           +-------------------+
               +-----------| 4. నంబర్ పెరుగుతుంది | (i++)
                           +-------------------+
\`\`\``
      },
      {
        heading: '2. ప్రతి లూప్ కీ ఉండే 3 పిల్లర్స్ (Pillars)',
        content: `జావాలో ఏ లూప్ రాసినా, ఈ 3 కచ్చితంగా ఉండాలి:

1. **Initialization (స్టార్ట్ ఎక్కడనుంచి?):** ఎక్కడి నుంచి లూప్ మొదలవ్వాలి? (ఉదా: \`int number = 1\`). ఇది ఫస్ట్ టైమ్ ఒక్కసారే రన్ అవుతుంది.
2. **Condition (ఎంతవరకు రన్ అవ్వాలి?):** ప్రతిసారీ కోడ్ రన్ అయ్యే ముందు ఇది చెక్ చేసుకుంటుంది. ఇది \`true\` అయితేనే లోపలికి వెళ్తుంది, \`false\` అయితే లూప్ ఆగిపోతుంది.
3. **Update (నంబర్ పెరగాలా/తగ్గాలా?):** కోడ్ రన్ అయ్యాక.. మళ్ళీ పైకి వెళ్ళేముందు కౌంటర్ ని పెంచుతుంది (ఉదా: \`number++\`). ఇది లేకపోతే లూప్ ఎప్పటికీ ఆగిపోదు.`
      },
      {
        heading: '3. `for` Loop సింటాక్స్ (Syntax)',
        content: `పైన చెప్పిన ఆ 3 పిల్లర్స్ ని ఒకే లైన్ లో రాసేయొచ్చు:

\`\`\`java
for (initialization; condition; update) {
    // మళ్ళీ మళ్ళీ రన్ అవ్వాల్సిన కోడ్ ఇక్కడ రాస్తాం
}
\`\`\`

### ఎలా రన్ అవుతుంది?
1. **స్టెప్ 1:** \`initialization\` ఒక్కసారి రన్ అవుతుంది.
2. **స్టెప్ 2:** \`condition\` ని చెక్ చేస్తుంది. ఒకవేళ false అయితే డైరెక్ట్ గా బయటకొచ్చేస్తుంది.
3. **స్టెప్ 3:** బ్రాకెట్స్ \`{}\` లోపల ఉన్న కోడ్ రన్ అవుతుంది.
4. **స్టెప్ 4:** \`update\` రన్ అవుతుంది (ఉదాహరణకి i వాల్యూ 1 పెరుగుతుంది).
5. **స్టెప్ 5:** మళ్ళీ **స్టెప్ 2** కి వెళ్లి కండిషన్ చెక్ చేసుకుని రిపీట్ అవుతుంది!`
      },
      {
        heading: '4. ఇన్ఫినిట్ లూప్ (Infinite Loop) - జాగ్రత్త!',
        content: `ఒకవేళ మీరు కండిషన్ లోపల వాల్యూ ఎప్పటికీ false అవ్వకుండా రాస్తే.. ఆ లూప్ జీవితాంతం తిరుగుతూనే ఉంటుంది. ఆ యాప్ క్రాష్ అయ్యేదాక లేదా ఫోన్ హ్యాంగ్ అయ్యేదాక ఆ లూప్ రన్ అవుతూనే ఉంటుంది:

\`\`\`java
// యాక్సిడెంటల్ ఇన్ఫినిట్ లూప్ (క్రాష్ అవుతుంది):
// ఇక్కడ i ని పెంచడం మర్చిపోయారు, కాబట్టి i ఎప్పుడూ 1 ఏ ఉంటుంది, ఎప్పుడూ లూప్ తిరుగుతూనే ఉంటుంది!
for (int i = 1; i <= 5; /* ఇక్కడ i++ మర్చిపోయారు */) {
    System.out.println(i);
}

// కావాలని రాసే ఇన్ఫినిట్ లూప్ (గేమ్స్ లో, సర్వర్స్ లో వాడుతారు):
for (;;) {
    // ఇది ఎప్పటికీ రన్ అవుతూనే ఉంటుంది
}
\`\`\``
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. బేసిక్ కౌంటింగ్ లూప్ (1 నుంచి 5 వరకు) ===");
        // నార్మల్ For లూప్
        for (int number = 1; number <= 5; number++) {
            System.out.println("కరెంట్ నంబర్: " + number);
        }

        System.out.println("\n=== 2. ఎక్కాలు (Multiplication Table - 7th Table) ===");
        int multiplier = 7;
        for (int i = 1; i <= 10; i++) {
            System.out.printf("%d x %2d = %2d%n", multiplier, i, (multiplier * i));
        }

        System.out.println("\n=== 3. మొదటి 100 నంబర్స్ ని కలపడం (Sum of numbers) ===");
        int totalSum = 0;
        for (int n = 1; n <= 100; n++) {
            totalSum += n; // ఒక్కో నంబర్ ని totalSum కి కలుపుతున్నాం
        }
        System.out.println("1 నుంచి 100 వరకు ఉన్న నంబర్స్ ని కలిపితే వచ్చేది = " + totalSum);
    }
}`,
    output: `=== 1. బేసిక్ కౌంటింగ్ లూప్ (1 నుంచి 5 వరకు) ===
కరెంట్ నంబర్: 1
కరెంట్ నంబర్: 2
కరెంట్ నంబర్: 3
కరెంట్ నంబర్: 4
కరెంట్ నంబర్: 5

=== 2. ఎక్కాలు (Multiplication Table - 7th Table) ===
7 x  1 =  7
7 x  2 = 14
7 x  3 = 21
7 x  4 = 28
7 x  5 = 35
7 x  6 = 42
7 x  7 = 49
7 x  8 = 56
7 x  9 = 63
7 x 10 = 70

=== 3. మొదటి 100 నంబర్స్ ని కలపడం (Sum of numbers) ===
1 నుంచి 100 వరకు ఉన్న నంబర్స్ ని కలిపితే వచ్చేది = 5050`,
    lineByLine: [
      { line: 'for (int number = 1; number <= 5; number++)', explanation: '1 నుంచి స్టార్ట్ అవుతుంది, 5 వరకు వెళ్తుంది, ప్రతిసారీ 1 పెరుగుతుంది.' },
      { line: 'printf("%d x %2d = %2d%n", multiplier, i, ...)', explanation: '%2d వాడి నంబర్స్ అన్నీ కరెక్ట్ గా ఒకటే లైన్ లో వచ్చేలా టేబుల్ ని నీట్ గా ప్రింట్ చేసాం.' },
      { line: 'totalSum += n;', explanation: 'ఇలా రాయడం వల్ల లూప్ తిరిగిన ప్రతిసారీ నంబర్ కి పాత totalSum కలిసిపోతుంది.' }
    ],
    practicalExample: `public class MonthlySavingsInvestmentPlan {
    public static void main(String[] args) {
        double monthlyDeposit = 5000.00;
        double annualReturnRate = 0.12; // 12% ఇంట్రెస్ట్
        double monthlyRate = annualReturnRate / 12; // నెలకి ఇంట్రెస్ట్
        int totalMonths = 12;

        double accumulatedCorpus = 0;

        System.out.println("=== 1-Year రికరింగ్ డిపాజిట్ (RD) చార్ట్ ===");
        System.out.printf("%-8s %-15s %-18s%n", "నెల", "డిపాజిట్ (₹)", "టోటల్ బ్యాలెన్స్ (₹)");
        System.out.println("----------------------------------------------");

        for (int month = 1; month <= totalMonths; month++) {
            // నెల నెల కట్టే డబ్బులకి వడ్డీ కలుపుతున్నాం
            accumulatedCorpus = (accumulatedCorpus + monthlyDeposit) * (1 + monthlyRate);
            System.out.printf("నెల %-2d  ₹%,-13.2f ₹%,-15.2f%n", month, monthlyDeposit, accumulatedCorpus);
        }

        System.out.println("----------------------------------------------");
        System.out.printf("మనం కట్టిన టోటల్ అమౌంట్ : ₹%,.2f%n", (monthlyDeposit * totalMonths));
        System.out.printf("వడ్డీతో కలిపి వచ్చింది    : ₹%,.2f%n", accumulatedCorpus);
    }
}`,
    practicalOutput: `=== 1-Year రికరింగ్ డిపాజిట్ (RD) చార్ట్ ===
నెల      డిపాజిట్ (₹)      టోటల్ బ్యాలెన్స్ (₹) 
----------------------------------------------
నెల 1   ₹5,000.00      ₹5,050.00       
నెల 2   ₹5,000.00      ₹10,150.50      
నెల 3   ₹5,000.00      ₹15,302.01      
నెల 4   ₹5,000.00      ₹20,505.03      
నెల 5   ₹5,000.00      ₹25,760.08      
నెల 6   ₹5,000.00      ₹31,067.68      
నెల 7   ₹5,000.00      ₹36,428.35      
నెల 8   ₹5,000.00      ₹41,842.64      
నెల 9   ₹5,000.00      ₹47,311.06      
నెల 10  ₹5,000.00      ₹52,834.17      
నెల 11  ₹5,000.00      ₹58,412.52      
నెల 12  ₹5,000.00      ₹64,046.64      
----------------------------------------------
మనం కట్టిన టోటల్ అమౌంట్ : ₹60,000.00
వడ్డీతో కలిపి వచ్చింది    : ₹64,046.64`,
    commonMistakes: [
      'for చివర సెమికోలన్ (;) పెట్టడం: "for (int i=0; i<5; i++);" ఇలా పెడితే, ఆ లూప్ పైన మాత్రమే తిరిగేసి ఆగిపోతుంది. బ్రాకెట్స్ లో ఉన్న కోడ్ కి, లూప్ కి సంబంధం ఉండదు.',
      '<= కి బదులు < వాడటం: "for (int i=1; i<10; i++)" అని రాస్తే అది 9 వరకే వెళ్తుంది, 10 కి వెళ్ళదు. 10 వరకు కావాలంటే "<= 10" వాడాలి.',
      'లూప్ లోపల వాల్యూ ని మార్చడం: i++ పైన రాసి, మళ్ళీ బ్రాకెట్స్ లోపల "i = 5" అని రాస్తే అది ఇన్ఫినిట్ లూప్ గా మారుతుంది లేదా సరిగ్గా రన్ అవ్వదు.'
    ],
    challenge: `// Coding Challenge:
// ఒక నంబర్ కి Factorial కనుక్కోండి (N = 6).
// Factorial 6 (6!) = 6 * 5 * 4 * 3 * 2 * 1 = 720.
// ప్రింట్ చేయాల్సింది: "Factorial of 6 = 720"

public class Main {
    public static void main(String[] args) {
        int n = 6;
        long factorial = 1;
        // TODO: for లూప్ వాడి ఫ్యాక్టోరియల్ కనుక్కోండి
        
    }
}`,
    faq: [
      {
        q: 'for లూప్ లో ఒకేసారి రెండు మూడు వేరియబుల్స్ స్టార్ట్ చేయొచ్చా?',
        a: 'చేయొచ్చు! కామా పెట్టి రాసుకోవచ్చు: "for (int i = 0, j = 10; i < j; i++, j--) { ... }".'
      },
      {
        q: 'లూప్ అయిపోయాక ఆ "i" వాల్యూ ని బయట వాడుకోవచ్చా?',
        a: 'వాడలేరు! ఎందుకంటే "for(int i=0...)" అని రాసినప్పుడు ఆ "i" కి కేవలం ఆ లూప్ లోపల మాత్రమే లైఫ్ ఉంటుంది. బయటకి వస్తే అది చనిపోతుంది (దాన్నే Scope అంటారు).'
      },
      {
        q: 'లూప్ ని వెనక నుంచి ముందుకు రన్ చేయొచ్చా (రివర్స్ లో)?',
        a: 'కచ్చితంగా! i-- వాడి పెద్ద నంబర్ నుంచి చిన్న నంబర్ కి లూప్ రాయొచ్చు: "for (int count = 10; count >= 1; count--) { ... }".'
      }
    ],
    recap: [
      'ఒకే కోడ్ ని మళ్ళీ మళ్ళీ రన్ చేయడానికి Loops వాడతాం (DRY Principle).',
      'for లూప్ లో Initialization, Condition, Update మూడూ ఒకే లైన్ లో రాస్తాం.',
      'లూప్ ఎప్పటికైనా ఎండ్ అయ్యేలా కండిషన్ రాయాలి, లేదంటే ఇన్ఫినిట్ లూప్ అయిపోతుంది.',
      'మొత్తం వాల్యూస్ కలపడానికి Accumulator (totalSum += n) ప్యాట్రన్ వాడతాం.'
    ]
  },

  // ==========================================
  // CHAPTER 20: While and Do-While Loops
  // ==========================================
  {
    num: 20,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Loops & Control Flow',
    slug: '20-java-while-and-do-while-loops',
    title: 'Java while & do-while Loops: Number & Digit Algorithms (తెలుగులో)',
    badge: '20. while & do-while',
    subtopics: 'while Loop (Entry-Controlled) · do-while Loop (Exit-Controlled) · When to use for vs while vs do-while · Digit Reversal · Palindrome · Armstrong Numbers',
    readTime: '17 min read',
    intro: 'ఎన్నిసార్లు తిరగాలో తెలియనప్పుడు వాడే `while`, కనీసం ఒక్కసారైనా రన్ అవ్వాల్సినప్పుడు వాడే `do-while` లూప్స్ ని ఈ చాప్టర్ లో చూద్దాం. అలాగే నంబర్స్ ని రివర్స్ చేయడం, పాలిండ్రోమ్ (Palindrome), ఆర్మ్ స్ట్రాంగ్ నంబర్ (Armstrong) లాంటి పాపులర్ ఇంటర్వ్యూ ప్రోగ్రామ్స్ ఎలా చేయాలో నేర్చుకుందాం.',
    theorySections: [
      {
        heading: '1. `while` Loop (ముందే చెక్ చేస్తుంది - Entry-Controlled)',
        content: `**\`while\`** లూప్ ని ఎంట్రీ-కంట్రోల్డ్ లూప్ అంటారు. అంటే లోపలికి వెళ్లే ముందే కండిషన్ చెక్ చేస్తుంది. ఫస్ట్ టైమే కండిషన్ తప్పు అయితే.. అసలు లోపలికి కూడా వెళ్ళదు:

\`\`\`java
while (కండిషన్) {
    // కండిషన్ true ఉన్నంతసేపు ఇది రన్ అవుతుంది
    // కచ్చితంగా లూప్ బ్రేక్ అయ్యేలా ఒక వాల్యూ అప్డేట్ చేయాలి!
}
\`\`\`

### ఏ లూప్ ఎప్పుడు వాడాలి? (\`for\` vs \`while\`):
- **\`for\` లూప్:** ఎన్నిసార్లు రన్ చేయాలో మీకు ముందే తెలిస్తే ఇది వాడాలి (ఉదాహరణకి: 10 సార్లు రన్ చేయాలి, అరే లో 50 నంబర్స్ ఉన్నాయి).
- **\`while\` లూప్:** ఎన్నిసార్లు రన్ చేయాలో మీకు ముందే తెలియనప్పుడు ఇది వాడాలి (ఉదాహరణకి: యూజర్ 'స్టాప్' అని టైప్ చేసేదాక రన్ చేయాలి, ఫైల్ లో డేటా అయిపోయేదాక రన్ చేయాలి).`
      },
      {
        heading: '2. `do-while` Loop (చివర్లో చెక్ చేస్తుంది - Exit-Controlled)',
        content: `**\`do-while\`** లూప్ ఎగ్జిట్-కంట్రోల్డ్ లూప్. అంటే ఫస్ట్ కండిషన్ తో సంబంధం లేకుండా ఒక్కసారైనా కోడ్ రన్ చేసేసి.. ఆ తర్వాత కండిషన్ చెక్ చేసుకుంటుంది:

\`\`\`java
do {
    // కండిషన్ ఫాల్స్ అయినా కనీసం ఒక్కసారైనా ఇది రన్ అవుతుంది!
} while (కండిషన్); // ఇక్కడ సెమికోలన్ కచ్చితంగా ఉండాలి!
\`\`\`

### మెయిన్ డిఫరెన్స్:
కండిషన్ ముందే తప్పు ఉన్నప్పుడు ఏమవుతుందో చూడండి:
\`\`\`java
int x = 10;

// while loop: 10 < 5 తప్పు కాబట్టి ఇది అసలు రన్ అవ్వదు (0 సార్లు రన్ అవుతుంది)
while (x < 5) {
    System.out.println("While loop రన్ అయ్యింది");
}

// do-while loop: ఇది కనీసం ఒక్కసారి రన్ అయిపోయి, ఆ తర్వాత కండిషన్ చెక్ చేసుకుని ఆగుతుంది!
do {
    System.out.println("Do-while ఒక్కసారి రన్ అయ్యింది!");
} while (x < 5);
\`\`\``
      },
      {
        heading: '3. నంబర్స్ తో ఆడుకోవడానికి `while` లూప్స్',
        content: `కంపెనీ ఇంటర్వ్యూస్ లో ఎక్కువగా అడిగేది నంబర్స్ లాజిక్స్. వీటిని మోడ్యులస్ (\`%\`), డివిజన్ (\`/\`) ఆపరేటర్స్ వాడి సాల్వ్ చేస్తాం:

1. **చివరి నంబర్ తీయడానికి:** \`int lastDigit = number % 10;\` (ఉదాహరణకి: 1234 ని 10 తో భాగిస్తే శేషం 4 వస్తుంది)
2. **చివరి నంబర్ ని కట్ చేయడానికి:** \`number = number / 10;\` (ఉదాహరణకి: 1234 / 10 అంటే 123 వస్తుంది)
3. **నంబర్ ని రివర్స్ చేయడానికి:** \`reversed = (reversed * 10) + lastDigit;\`

### Armstrong Number (ఆర్మ్ స్ట్రాంగ్ నంబర్) అంటే ఏంటి?
ఏదైనా నంబర్ ని విడదీసి.. ఒక్కో డిజిట్ ని క్యూబ్ ($x^3$) చేసి కలిపితే.. మళ్ళీ అదే నంబర్ వస్తే దాన్ని Armstrong అంటారు (ఉదాహరణకి: 153, 370).
$$153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153$$`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. నంబర్ ని రివర్స్ చేయడం & పాలిండ్రోమ్ చెక్ ===");
        int originalNumber = 12321;
        int temp = originalNumber;
        int reversedNumber = 0;
        int digitCount = 0;

        // temp జీరో అయ్యేదాక ఒక్కో నంబర్ ని బయటికి తీస్తున్నాం
        while (temp > 0) {
            int lastDigit = temp % 10;                 // లాస్ట్ నంబర్ ని తీసుకున్నాం
            reversedNumber = (reversedNumber * 10) + lastDigit; // పాత దాన్ని లెఫ్ట్ కి జరిపి ఇది అటాచ్ చేసాం
            temp = temp / 10;                          // లాస్ట్ నంబర్ ని కట్ చేసాం
            digitCount++;
        }

        System.out.println("ఒరిజినల్ నంబర్ : " + originalNumber);
        System.out.println("మొత్తం డిజిట్స్ : " + digitCount);
        System.out.println("రివర్స్ నంబర్   : " + reversedNumber);
        System.out.println("పాలిండ్రోమా?   : " + (originalNumber == reversedNumber));

        System.out.println("\n=== 2. ఆర్మ్ స్ట్రాంగ్ నంబర్ చెక్ (153) ===");
        int testArm = 153;
        int armTemp = testArm;
        int armSum = 0;

        while (armTemp > 0) {
            int digit = armTemp % 10;
            armSum += (digit * digit * digit); // క్యూబ్ చేసి కలుపుతున్నాం
            armTemp /= 10;
        }

        System.out.println("మొత్తం కలిపితే వచ్చింది : " + armSum);
        System.out.println("153 ఆర్మ్ స్ట్రాంగ్ ఏనా? : " + (testArm == armSum));
    }
}`,
    output: `=== 1. నంబర్ ని రివర్స్ చేయడం & పాలిండ్రోమ్ చెక్ ===
ఒరిజినల్ నంబర్ : 12321
మొత్తం డిజిట్స్ : 5
రివర్స్ నంబర్   : 12321
పాలిండ్రోమా?   : true

=== 2. ఆర్మ్ స్ట్రాంగ్ నంబర్ చెక్ (153) ===
మొత్తం కలిపితే వచ్చింది : 153
153 ఆర్మ్ స్ట్రాంగ్ ఏనా? : true`,
    lineByLine: [
      { line: 'int lastDigit = temp % 10;', explanation: 'ఏ నంబర్ ని అయినా 10 తో మోడ్యులస్ చేస్తే, దాని చివరి అంకె వస్తుంది.' },
      { line: 'reversedNumber = (reversedNumber * 10) + lastDigit;', explanation: 'ఉన్న రివర్స్ నంబర్ ని 10 తో మల్టిప్లై చేసి, కొత్త డిజిట్ ని కలుపుతున్నాం.' },
      { line: 'temp = temp / 10;', explanation: 'నంబర్ ని 10 తో డివైడ్ చేస్తే.. లాస్ట్ డిజిట్ కట్ అయిపోతుంది. చివరకి జీరో అయిపోయి లూప్ ఆగుతుంది.' },
      { line: 'originalNumber == reversedNumber', explanation: 'రివర్స్ చేసినా మళ్ళీ అదే వస్తే దాన్ని పాలిండ్రోమ్ (Palindrome) అంటారు.' }
    ],
    practicalExample: `public class BankATMMenuSimulation {
    public static void main(String[] args) {
        // do-while తో ATM మెనూ లాజిక్
        int userChoice = 3; // యూజర్ 3 (బ్యాలెన్స్ చెక్) సెలెక్ట్ చేసాడు అనుకుందాం
        double currentBalance = 25000.00;

        System.out.println("=== ATM టెర్మినల్ (do-while) ===");
        int simulatedAttempts = 0;

        do {
            System.out.println("\n[మెనూ ఆప్షన్స్]");
            System.out.println("1. డిపాజిట్ చేయండి");
            System.out.println("2. విత్ డ్రా చేయండి");
            System.out.println("3. బ్యాలెన్స్ చెక్");
            System.out.println("4. క్యాన్సిల్ / బయటకి వెళ్ళండి");

            System.out.println("యూజర్ సెలెక్ట్ చేసింది: " + userChoice);

            switch (userChoice) {
                case 1 -> System.out.println("డిపాజిట్ ఆప్షన్ స్టార్ట్ అయ్యింది.");
                case 2 -> System.out.println("విత్ డ్రా ఆప్షన్ స్టార్ట్ అయ్యింది.");
                case 3 -> System.out.printf("మీ అకౌంట్ బ్యాలెన్స్: ₹%,.2f%n", currentBalance);
                case 4 -> System.out.println("సెషన్ క్లోజ్ అయ్యింది. మీ కార్డ్ తీసుకోండి.");
                default -> System.out.println("తప్పుగా ఎంటర్ చేసారు. మళ్ళీ ట్రై చేయండి.");
            }

            simulatedAttempts++;
            // టెస్టింగ్ కోసం లూప్ ఆపేస్తున్నాం
            if (simulatedAttempts >= 1) break;

        } while (userChoice != 4); // 4 వస్తేనే ఆగుతుంది, అంతవరకు లూప్ తిరుగుతూనే ఉంటుంది

        System.out.println("సెషన్ క్లోజ్ అయ్యింది.");
    }
}`,
    practicalOutput: `=== ATM టెర్మినల్ (do-while) ===

[మెనూ ఆప్షన్స్]
1. డిపాజిట్ చేయండి
2. విత్ డ్రా చేయండి
3. బ్యాలెన్స్ చెక్
4. క్యాన్సిల్ / బయటకి వెళ్ళండి
యూజర్ సెలెక్ట్ చేసింది: 3
మీ అకౌంట్ బ్యాలెన్స్: ₹25,000.00
సెషన్ క్లోజ్ అయ్యింది.`,
    commonMistakes: [
      'while లూప్ లో వాల్యూ ని అప్డేట్ చేయకపోవడం: "while (x > 0)" అని రాసి, లోపల "x--" రాయకపోతే అది జీవితాంతం తిరుగుతూనే ఉంటుంది (CPU హ్యాంగ్ అవుతుంది).',
      'do-while చివర్లో సెమికోలన్ మర్చిపోవడం: "while (cond)" తర్వాత కచ్చితంగా సెమికోలన్ ";" ఉండాలి, లేదంటే ఎర్రర్ వస్తుంది.',
      'ఒరిజినల్ వేరియబుల్ ని కట్ చేయడం: నంబర్ ని రివర్స్ చేసేటప్పుడు ఎప్పుడూ ఒక "temp = num;" వేరియబుల్ తీసుకుని దాన్ని కట్ చేయాలి. ఒరిజినల్ వేరియబుల్ ని మార్చేస్తే లాస్ట్ లో పాలిండ్రోమ్ చెక్ చేయడానికి పాత నంబర్ దొరకదు.'
    ],
    challenge: `// Coding Challenge:
// ఒక నంబర్ లోని డిజిట్స్ ని కలపండి (ఉదా: number = 54321):
// 5 + 4 + 3 + 2 + 1 = 15.
// అవుట్పుట్: "Sum of digits of 54321 = 15" అని రావాలి.

public class Main {
    public static void main(String[] args) {
        int number = 54321;
        int sum = 0;
        // TODO: while లూప్ వాడి డిజిట్స్ ని కలపండి
        
    }
}`,
    faq: [
      {
        q: 'while కీ do-while కీ మెయిన్ డిఫరెన్స్ ఏంటి?',
        a: '"while" కండిషన్ ముందే చెక్ చేస్తుంది, కాబట్టి తప్పు అయితే ఒక్కసారి కూడా రన్ అవ్వదు. "do-while" కండిషన్ ని చివర్లో చెక్ చేస్తుంది, కాబట్టి కనీసం ఒక్కసారైనా కోడ్ రన్ అవుతుంది.'
      },
      {
        q: 'మైనస్ (-) నంబర్స్ ని రివర్స్ చేయాలంటే ఎలా?',
        a: '"Math.abs(num)" వాడి ముందే ఆ మైనస్ ని తీసేయండి. రివర్స్ చేశాక మళ్ళీ కావాలంటే మైనస్ కలుపుకోవచ్చు.'
      }
    ],
    recap: [
      'while లూప్ ఎంట్రీ-కంట్రోల్డ్ లూప్ (ముందే కండిషన్ చెక్ చేస్తుంది).',
      'do-while లూప్ ఎగ్జిట్-కంట్రోల్డ్ లూప్ (చివర్లో కండిషన్ చెక్ చేస్తుంది, కనీసం ఒక్కసారైనా రన్ అవుతుంది).',
      '% 10 తో లాస్ట్ డిజిట్ వస్తుంది; / 10 తో లాస్ట్ డిజిట్ పోతుంది.',
      'పాలిండ్రోమ్, ఆర్మ్ స్ట్రాంగ్ నంబర్ లాంటివి while లూప్ వాడి ఈజీగా కనుక్కోవచ్చు.'
    ]
  },

  // ==========================================
  // CHAPTER 21: Jump Statements & Enhanced For Loop
  // ==========================================
  {
    num: 21,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Loops & Control Flow',
    slug: '21-java-jump-statements-break-continue-and-enhanced-for',
    title: 'Jump Statements (break & continue) & Enhanced for Loop (తెలుగులో)',
    badge: '21. Jump & Enhanced for',
    subtopics: 'break Statement · continue Statement · Labeled break/continue · Enhanced for-each Loop · Looping Strings · Prime Numbers · Fibonacci Series',
    readTime: '17 min read',
    intro: 'లూప్ ని మధ్యలోనే ఎలా ఆపేయాలి? లేదా ఆ ఒక్కదాన్ని వదిలేసి (స్కిప్ చేసి) ముందుకు ఎలా వెళ్ళాలి? జావాలో వచ్చిన కొత్త for-each లూప్ ఎలా వాడాలి? అలాగే ఇంటర్వ్యూస్ లో అడిగే ప్రైమ్ నంబర్స్ (Prime Number), ఫైబొనాచీ సిరీస్ (Fibonacci) ప్రోగ్రామ్స్ ఎలా చేయాలో నేర్చుకుందాం.',
    theorySections: [
      {
        heading: '1. Jump Statements: `break` vs `continue`',
        content: `జావాలో లూప్ తిరుగుతున్నప్పుడు మధ్యలో ఏదైనా స్పెషల్ కండిషన్ వస్తే, ఆ లూప్ ని కంట్రోల్ చేయడానికి రెండు జంప్ కీవర్డ్స్ ఉన్నాయి:

\`\`\`
+-----------------------------------------------------------------------------------+
|                        break vs continue తేడా ఏంటి?                                  |
+-----------------------------------------------------------------------------------+
|  1. break (ఎమర్జెన్సీ ఎగ్జిట్ లాంటిది):                                                  |
|     ఇది కనిపిస్తే చాలు.. వెంటనే మొత్తం లూప్ ని పీకేసి బయటకొచ్చేస్తుంది.                        |
+-----------------------------------------------------------------------------------+
|  2. continue (స్కిప్ బటన్ లాంటిది):                                                    |
|     ఇది కనిపిస్తే.. కేవలం ఆ ఒక్క రౌండ్ ని వదిలేసి (కింద లైన్స్ రన్ చేయకుండా) పైకి వెళ్ళిపోతుంది.   |
+-----------------------------------------------------------------------------------+
\`\`\`

### ఎగ్జాంపుల్ చూస్తే మీకు అర్థమవుతుంది:
\`\`\`java
for (int i = 1; i <= 5; i++) {
    if (i == 3) break; // 3 రాగానే మొత్తం ఆపేస్తుంది!
    System.out.print(i + " "); // ప్రింట్ అయ్యేది: 1 2
}

for (int i = 1; i <= 5; i++) {
    if (i == 3) continue; // కేవలం 3 ని మాత్రమే స్కిప్ చేసి వదిలేస్తుంది!
    System.out.print(i + " "); // ప్రింట్ అయ్యేది: 1 2 4 5
}
\`\`\``
      },
      {
        heading: '2. Labeled `break` (పెద్ద లూప్స్ లోంచి బయటపడటానికి)',
        content: `ఒక లూప్ లోపల ఇంకో లూప్ (Nested loop) ఉన్నప్పుడు, నార్మల్ \`break\` వాడితే లోపల ఉన్న లూప్ మాత్రమే ఆగుతుంది. 

అలా కాకుండా, ఫుల్ గా బయట ఉన్న లూప్ లోంచి కూడా ఒకేసారి బయటపడాలంటే.. ఆ లూప్ కి ఒక పేరు (Label) పెట్టుకోవాలి:

\`\`\`java
outerLoop: for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (i == 2 && j == 2) {
            System.out.println("మొత్తం లూప్ ని ఆపేస్తున్నా!");
            break outerLoop; // రెండు లూప్స్ లోంచి డైరెక్ట్ గా బయటకొచ్చేస్తుంది!
        }
        System.out.println("i=" + i + ", j=" + j);
    }
}
\`\`\``
      },
      {
        heading: '3. కొత్త ఫీచర్: Enhanced `for-each` Loop (Java 5 నుంచి)',
        content: `గతంలో అరే (Array) లో ఉన్న ప్రతి ఎలిమెంట్ ని ప్రింట్ చేయాలంటే \`i=0, i<length, i++\` అని పెద్దగా రాయాల్సి వచ్చేది.

కానీ **Enhanced for Loop** (for-each) వాడితే సింపుల్ గా వాల్యూస్ అన్నీ ఒకటొకటిగా తెచ్చుకోవచ్చు:

\`\`\`java
for (డేటా_టైప్ వేరియబుల్ : అరే_పేరు) {
    // డైరెక్ట్ గా వాడుకోవచ్చు
}
\`\`\`

\`\`\`java
String[] languages = { "Java", "Python", "Go", "Rust" };

// పాత పద్ధతి:
for (int i = 0; i < languages.length; i++) {
    System.out.println(languages[i]);
}

// కొత్త for-each పద్ధతి (క్లీన్ గా ఉంటుంది):
for (String lang : languages) {
    System.out.println(lang);
}
\`\`\``
      },
      {
        heading: '4. Prime Numbers & Fibonacci Series (ఇంటర్వ్యూ క్వశ్చన్స్)',
        content: `### 1. Prime Number Algorithm (ప్రైమ్ నంబర్ అంటే ఏంటి?):
1 మరియు అదే నంబర్ తో మాత్రమే డివైడ్ అయితే దాన్ని **Prime Number** అంటారు (ఉదా: 2, 3, 5, 7, 11).
- **సూపర్ ట్రిక్:** నంబర్ అయ్యేదాకా కాకుండా, దాని స్క్వేర్ రూట్ ($\\sqrt{N}$) వరకు మాత్రమే చెక్ చేస్తే చాలు! కోడ్ చాలా ఫాస్ట్ గా రన్ అవుతుంది:
\`\`\`java
boolean isPrime = (num > 1);
for (int i = 2; i <= Math.sqrt(num); i++) {
    if (num % i == 0) { // దేనితోనైనా డివైడ్ అయితే
        isPrime = false; // ప్రైమ్ కాదు
        break; // వెంటనే ఆపేయాలి!
    }
}
\`\`\`

### 2. Fibonacci Sequence (ఫైబొనాచీ సిరీస్ $0, 1, 1, 2, 3, 5...$):
దీనిలో పక్కపక్కన ఉన్న రెండు నంబర్స్ ని కలిపితే, మూడో నంబర్ వస్తుంది ($F_n = F_{n-1} + F_{n-2}$):
\`\`\`java
int first = 0, second = 1;
for (int i = 1; i <= count; i++) {
    System.out.print(first + " ");
    int next = first + second; // మూడో నంబర్
    first = second; // ముందుకు జరగాలి
    second = next;
}
\`\`\``
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // 1. Break vs Continue 
        System.out.println("=== 1. Continue డెమో (ఈవెన్ నంబర్స్ స్కిప్ చేద్దాం) ===");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                continue; // 2 తో డివైడ్ అయ్యే వాటిని స్కిప్ చేస్తుంది
            }
            System.out.print(i + " ");
        }
        System.out.println();

        // 2. Enhanced For-Each Loop
        System.out.println("\n=== 2. Enhanced For-Each Loop (క్లౌడ్ సర్వీసెస్) ===");
        String[] cloudServices = { "AWS EC2", "Azure AppService", "GCP CloudRun", "Docker" };
        for (String service : cloudServices) { // ఒక్కో సర్వీస్ ని బయటికి తీస్తుంది
            System.out.println("✓ డెప్లాయ్ అవుతోంది: " + service);
        }

        // 3. Fibonacci Series
        System.out.println("\n=== 3. Fibonacci Sequence (మొదటి 8 నంబర్స్) ===");
        int terms = 8;
        int t1 = 0, t2 = 1;
        System.out.print("సిరీస్: ");
        for (int step = 1; step <= terms; step++) {
            System.out.print(t1 + " ");
            int nextTerm = t1 + t2;
            t1 = t2;
            t2 = nextTerm;
        }
        System.out.println();

        // 4. Prime Number చెక్
        int testNumber = 29;
        boolean isPrime = testNumber > 1;
        for (int i = 2; i <= Math.sqrt(testNumber); i++) {
            if (testNumber % i == 0) {
                isPrime = false;
                break; // ప్రైమ్ కాదని తెలిసాక మళ్ళీ చెక్ చేసి టైమ్ వేస్ట్ ఎందుకు?
            }
        }
        System.out.println("\n=== 4. Prime Number టెస్టర్ ===");
        System.out.println(testNumber + " ప్రైమ్ నంబరా? : " + isPrime);
    }
}`,
    output: `=== 1. Continue డెమో (ఈవెన్ నంబర్స్ స్కిప్ చేద్దాం) ===
1 3 5 7 9 

=== 2. Enhanced For-Each Loop (క్లౌడ్ సర్వీసెస్) ===
✓ డెప్లాయ్ అవుతోంది: AWS EC2
✓ డెప్లాయ్ అవుతోంది: Azure AppService
✓ డెప్లాయ్ అవుతోంది: GCP CloudRun
✓ డెప్లాయ్ అవుతోంది: Docker

=== 3. Fibonacci Sequence (మొదటి 8 నంబర్స్) ===
సిరీస్: 0 1 1 2 3 5 8 13 

=== 4. Prime Number టెస్టర్ ===
29 ప్రైమ్ నంబరా? : true`,
    lineByLine: [
      { line: 'if (i % 2 == 0) continue;', explanation: 'ఇది ఈవెన్ నంబర్స్ వస్తే ప్రింట్ చేయకుండా మళ్ళీ పైకి వెళ్ళిపోయేలా చేస్తుంది.' },
      { line: 'for (String service : cloudServices)', explanation: 'index (i) లాంటివేమీ లేకుండా డైరెక్ట్ గా అరే లో నుంచి ఒక్కొక్క దాన్ని తీసుకుంటుంది.' },
      { line: 'int nextTerm = t1 + t2; t1 = t2; t2 = nextTerm;', explanation: 'కొత్త నంబర్ ని క్యాలిక్యులేట్ చేసి, ఆ తర్వాత పాత నంబర్స్ ని ఒక స్టెప్ ముందుకు జరుపుతుంది.' },
      { line: 'for (int i = 2; i <= Math.sqrt(testNumber); i++)', explanation: 'స్క్వేర్ రూట్ వరకే లూప్ రన్ చేస్తే కోడ్ వందల రెట్లు ఫాస్ట్ గా అయిపోతుంది.' }
    ],
    practicalExample: `public class SearchAlgorithmEarlyExit {
    public static void main(String[] args) {
        String[] transactionIds = { "TXN_101", "TXN_102", "TXN_999_FRAUD", "TXN_104", "TXN_105" };
        String targetFraud = "TXN_999_FRAUD";
        boolean foundFraud = false;

        System.out.println("--- బ్యాంక్ ఫ్రాడ్ ట్రాన్సాక్షన్ స్కానింగ్ ---");
        for (int i = 0; i < transactionIds.length; i++) {
            System.out.println("ట్రాన్సాక్షన్ #" + (i + 1) + " చెక్ చేస్తున్నాం: " + transactionIds[i]);

            if (transactionIds[i].equals(targetFraud)) {
                foundFraud = true;
                System.out.println("🚨 అలర్ట్: ఫ్రాడ్ ట్రాన్సాక్షన్ దొరికింది! (Index: " + i + ")");
                break; // దొరికేసాక ఇంకా మిగతావి ఎందుకు చెక్ చేయడం? టైమ్ వేస్ట్.. అందుకే ఆపేయాలి!
            }
        }

        System.out.println("స్కానింగ్ అయిపోయింది. స్టేటస్: " + (foundFraud ? "అకౌంట్ బ్లాక్ చేసాం" : "సేఫ్"));
    }
}`,
    practicalOutput: `--- బ్యాంక్ ఫ్రాడ్ ట్రాన్సాక్షన్ స్కానింగ్ ---
ట్రాన్సాక్షన్ #1 చెక్ చేస్తున్నాం: TXN_101
ట్రాన్సాక్షన్ #2 చెక్ చేస్తున్నాం: TXN_102
ట్రాన్సాక్షన్ #3 చెక్ చేస్తున్నాం: TXN_999_FRAUD
🚨 అలర్ట్: ఫ్రాడ్ ట్రాన్సాక్షన్ దొరికింది! (Index: 2)
స్కానింగ్ అయిపోయింది. స్టేటస్: అకౌంట్ బ్లాక్ చేసాం`,
    commonMistakes: [
      'for-each లూప్ లోపల వాల్యూస్ ని మార్చాలనుకోవడం: "for (int x : array) { x = 0; }" ఇలా రాస్తే ఒరిజినల్ అరే మారదు, కేవలం కాపీ మారినట్టే. ఎప్పుడైనా వాల్యూస్ మార్చాలంటే నార్మల్ పాత for లూప్ ఏ వాడాలి.',
      'ప్రైమ్ నంబర్స్ లో i < N వరకు చెక్ చేయడం: అలా రాస్తే వందల సార్లు చెక్ చేస్తుంది. కరెక్ట్ పద్ధతి "i <= Math.sqrt(N)" వరకే చెక్ చేయడం.',
      'break, continue కన్ఫ్యూజ్ అవ్వడం: "break" అంటే సినిమా అయిపోయినట్టు (బయటకి వస్తుంది), "continue" అంటే యాడ్ స్కిప్ చేసినట్టు (కొద్దిసేపు ఆగి మళ్ళీ రన్ అవుతుంది).'
    ],
    challenge: `// Coding Challenge:
// 1 నుంచి 50 వరకు ఉన్న ప్రైమ్ నంబర్స్ అన్నీ ప్రింట్ చేయండి.
// ఇలా ఒకే లైన్ లో రావాలి: "2 3 5 7 11 13 17 19 23 29 31 37 41 43 47"

public class Main {
    public static void main(String[] args) {
        // TODO: 1 నుంచి 50 వరకు లూప్ వేసి అందులో ప్రైమ్ అయితేనే ప్రింట్ చేయండి
        
    }
}`,
    faq: [
      {
        q: 'for-each లూప్ ని రివర్స్ లో రన్ చేయొచ్చా?',
        a: 'కుదరదు. for-each లూప్ ఎప్పుడూ మొదటి నుంచి చివరి దాకా (forward) మాత్రమే రన్ అవుతుంది. రివర్స్ కావాలంటే నార్మల్ లూప్ "for (int i = array.length - 1; i >= 0; i--)" వాడాల్సిందే.'
      },
      {
        q: 'ఒక స్ట్రింగ్ (String) లో ఉన్న అక్షరాలని (letters) for-each లూప్ లో ఎలా వాడాలి?',
        a: 'దాన్ని ఫస్ట్ అరే లాగా మార్చుకోవాలి. ".toCharArray()" వాడితే కుదురుతుంది: "for (char c : str.toCharArray()) { ... }".'
      }
    ],
    recap: [
      'break వాడితే లూప్ పూర్తిగా ఆగిపోయి బయటకి వచ్చేస్తుంది.',
      'continue వాడితే ఆ ఒక్క రౌండ్ ఆగిపోయి, నెక్స్ట్ రౌండ్ కి వెళ్తుంది.',
      'Labeled break వాడితే ఎన్ని లూప్స్ లోపల ఉన్నా సరే.. ఒకేసారి బయటపడొచ్చు.',
      'for-each అనేది వాల్యూస్ ని చదవడానికి (Read-only) చాలా ఈజీ పద్ధతి.'
    ]
  },

  // ==========================================
  // CHAPTER 22: Nested Loops & Pattern Programming
  // ==========================================
  {
    num: 22,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Loops & Control Flow',
    slug: '22-java-nested-loops-and-pattern-programming',
    title: 'Java Nested Loops & Star/Number Pattern Masterclass (తెలుగులో)',
    badge: '22. Patterns & Nested Loops',
    subtopics: 'Nested Loop Mechanics · Rows vs Columns Coordinate Logic · Right Triangle · Inverted Triangle · Pyramid · Diamond · Floyd\'s Triangle · Number Pyramids',
    readTime: '18 min read',
    intro: 'లూప్ లోపల ఇంకో లూప్ (Nested loops) ఎలా పనిచేస్తాయి? ఇంటర్వ్యూస్ లో ఎక్కువగా అడిగే స్టార్ ప్యాట్రన్స్ (Star Patterns), పిరమిడ్స్, డైమండ్స్, ఫ్లాయిడ్ ట్రయాంగిల్ లాంటివి బట్టీ పట్టకుండా లాజికల్ గా ఎలా రాయాలో ఈ చాప్టర్ లో నేర్చుకుందాం.',
    theorySections: [
      {
        heading: '1. Nested Loops అసలు ఎలా పనిచేస్తాయి? (Rows & Columns)',
        content: `ఒక లూప్ లోపల ఇంకో లూప్ రాస్తే దాన్నే **Nested Loop** అంటారు.

బయట ఉన్న లూప్ **ఒక్కసారి** తిరిగితే.. లోపల ఉన్న లూప్ దాని రౌండ్స్ అన్నీ (మొత్తం) తిరిగేస్తుంది:
$$Total Iterations = బయట లూప్ \\times లోపలి లూప్$$

\`\`\`
+-----------------------------------------------------------------------------------+
|                        NESTED LOOP (గ్రిడ్ లాజిక్)                                    |
+-----------------------------------------------------------------------------------+
|  Outer Loop (బయటి లూప్): ఇది రోస్ ని (Rows - అడ్డంగా ఉండే లైన్స్ ని) కంట్రోల్ చేస్తుంది     |
|  Inner Loop (లోపలి లూప్): ఇది కాలమ్స్ ని (Columns - ఆ లైన్ లో ఎన్ని స్టార్లు పడాలో) కంట్రోల్ చేస్తుంది|
|                                                                                   |
|  Row 1 (i=1):  *          (లోపలి లూప్ 1 సారి రన్ అయ్యింది)                              |
|  Row 2 (i=2):  * *        (లోపలి లూప్ 2 సార్లు రన్ అయ్యింది)                             |
|  Row 3 (i=3):  * * *      (లోపలి లూప్ 3 సార్లు రన్ అయ్యింది)                             |
|  Row 4 (i=4):  * * * *    (లోపలి లూప్ 4 సార్లు రన్ అయ్యింది)                             |
|  Row 5 (i=5):  * * * * *  (లోపలి లూప్ 5 సార్లు రన్ అయ్యింది)                             |
+-----------------------------------------------------------------------------------+
\`\`\``
      },
      {
        heading: '2. ఏ ప్యాట్రన్ కైనా పనిచేసే 3-Step లాజిక్',
        content: `టెక్నికల్ ఇంటర్వ్యూస్ లో ఏ ప్యాట్రన్ అడిగినా ఈ 3 స్టెప్స్ వాడితే చాలు:

1. **Step 1 (బయటి లూప్):** మొత్తం ఎన్ని లైన్స్ (Rows) ఉన్నాయో చూడండి ($N$). బయటి లూప్ ని అన్నిసార్లు తిప్పండి: \`for (int row = 1; row <= N; row++)\`.
2. **Step 2 (లోపలి లూప్):** ప్రతి లైన్ లో ఏం కావాలి?:
   - ముందేమైనా ఖాళీ ప్లేస్ (Spaces) కావాలా? (\`for (int s = 1; s <= N - row; s++)\`)
   - ఎన్ని స్టార్లు/నంబర్స్ ప్రింట్ చేయాలి? (\`for (int col = 1; col <= row; col++)\`)
3. **Step 3 (కింది లైన్ కి వెళ్లడం):** లోపలి లూప్ లో స్టార్స్ ని \`System.out.print()\` తో ప్రింట్ చేశాక, కింది లైన్ కి రావడానికి చివర్లో ఒక \`System.out.println()\` పెట్టాలి.`
      },
      {
        heading: '3. పాపులర్ ప్యాట్రన్స్ వాటి లాజిక్స్',
        content: `<div class="ref-table-wrap">
  <table class="ref-table">
    <thead>
      <tr>
        <th>ప్యాట్రన్ పేరు</th>
        <th>డిజైన్ ఎలా ఉంటుంది?</th>
        <th>మెయిన్ లాజిక్ (Inner Loop)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>రైట్-యాంగిల్ ట్రయాంగిల్</strong></td>
        <td><code>*<br>* *<br>* * *</code></td>
        <td><code>for (int col = 1; col &lt;= row; col++) print("* ")</code></td>
      </tr>
      <tr>
        <td><strong>రివర్స్ ట్రయాంగిల్ (కిందకి)</strong></td>
        <td><code>* * * *<br>* * *<br>* *<br>*</code></td>
        <td><code>for (int col = 1; col &lt;= (N - row + 1); col++) print("* ")</code></td>
      </tr>
      <tr>
        <td><strong>పిరమిడ్ (Pyramid)</strong></td>
        <td><code>&nbsp;&nbsp;*&nbsp;&nbsp;<br>&nbsp;***&nbsp;<br>*****</code></td>
        <td>స్పేస్: <code>N - row</code>, స్టార్లు: <code>2 * row - 1</code></td>
      </tr>
      <tr>
        <td><strong>Floyd's ట్రయాంగిల్</strong></td>
        <td><code>1<br>2 3<br>4 5 6</code></td>
        <td>లోపలి లూప్ లో ఒక <code>count++</code> ని పెట్టుకుని ప్రింట్ చేయాలి</td>
      </tr>
      <tr>
        <td><strong>0-1 ట్రయాంగిల్</strong></td>
        <td><code>1<br>0 1<br>1 0 1</code></td>
        <td><code>(row + col) % 2 == 0 ? "1 " : "0 "</code> వాడాలి</td>
      </tr>
    </tbody>
  </table>
</div>`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        int rows = 5;

        // 1. Right-Angled Triangle 
        System.out.println("=== 1. స్టార్ ట్రయాంగిల్ ===");
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println(); // నెక్స్ట్ లైన్ కి వెళ్లడానికి
        }

        // 2. Inverted Triangle (రివర్స్)
        System.out.println("\n=== 2. రివర్స్ ట్రయాంగిల్ ===");
        for (int i = rows; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        // 3. Star Pyramid (పిరమిడ్)
        System.out.println("\n=== 3. పిరమిడ్ ప్యాట్రన్ ===");
        for (int i = 1; i <= rows; i++) {
            // ఫస్ట్ స్పేస్ లు ఇవ్వాలి
            for (int space = 1; space <= rows - i; space++) {
                System.out.print("  ");
            }
            // ఆ తర్వాత స్టార్లు ఇవ్వాలి (ఆడ్ నంబర్స్ లాగా 1, 3, 5..)
            for (int k = 1; k <= (2 * i - 1); k++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        // 4. Floyd's Number Triangle
        System.out.println("\n=== 4. ఫ్లాయిడ్ ట్రయాంగిల్ ===");
        int counter = 1;
        for (int i = 1; i <= 4; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.printf("%2d ", counter++);
            }
            System.out.println();
        }
    }
}`,
    output: `=== 1. స్టార్ ట్రయాంగిల్ ===
* 
* * 
* * * 
* * * * 
* * * * * 

=== 2. రివర్స్ ట్రయాంగిల్ ===
* * * * * 
* * * * 
* * * 
* * 
* 

=== 3. పిరమిడ్ ప్యాట్రన్ ===
        * 
      * * * 
    * * * * * 
  * * * * * * * 
* * * * * * * * * 

=== 4. ఫ్లాయిడ్ ట్రయాంగిల్ ===
 1 
 2  3 
 4  5  6 
 7  8  9 10`,
    lineByLine: [
      { line: 'for (int i = 1; i <= rows; i++)', explanation: 'బయటి లూప్: ఇది ఎన్ని లైన్స్ ప్రింట్ అవ్వాలో కంట్రోల్ చేస్తుంది.' },
      { line: 'for (int j = 1; j <= i; j++) System.out.print("* ");', explanation: 'లోపలి లూప్: ఇది ఏ లైన్ లో ఎన్ని స్టార్లు పడాలో చూసుకుంటుంది (లైన్ కింద లైన్ రాకుండా print వాడాం).' },
      { line: 'System.out.println();', explanation: 'ఒక లైన్ లో స్టార్లు పడిపోయాక.. నెక్స్ట్ లైన్ కి వెళ్లడానికి ఇది వాడతాం.' },
      { line: 'System.out.printf("%2d ", counter++);', explanation: 'Floyd\'s ట్రయాంగిల్: ఉన్న నంబర్ ని ప్రింట్ చేసి, తర్వాత దాన్ని 1 పెంచుతున్నాం.' }
    ],
    practicalExample: `public class DiamondPatternGenerator {
    public static void main(String[] args) {
        int n = 4; // సగం డైమండ్ హైట్
        System.out.println("=== డైమండ్ ప్యాట్రన్ (2 * N) ===");

        // పార్ట్ 1: పైన ఉన్న పిరమిడ్
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= (2 * i - 1); j++) System.out.print("*");
            System.out.println();
        }

        // పార్ట్ 2: కింద ఉన్న రివర్స్ పిరమిడ్
        for (int i = n - 1; i >= 1; i--) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= (2 * i - 1); j++) System.out.print("*");
            System.out.println();
        }
    }
}`,
    practicalOutput: `=== డైమండ్ ప్యాట్రన్ (2 * N) ===
   *
  ***
 *****
*******
 *****
  ***
   *`,
    commonMistakes: [
      'లోపలి లూప్ లో println() వాడటం: println() వాడితే ప్రతి స్టార్ పక్కపక్కన కాకుండా ఒకదాని కింద ఒకటి వస్తుంది. కేవలం print() మాత్రమే వాడాలి.',
      'లోపలి లూప్ తర్వాత ఖాళీ println() మర్చిపోవడం: ఇది మర్చిపోతే స్టార్లు అన్నీ ఒకే లైన్ లో వరుసగా వచ్చేస్తాయి. లైన్ బ్రేక్ ఇవ్వడం చాలా ముఖ్యం.',
      'వేరియబుల్ పేరు రిపీట్ చేయడం: బయట లూప్ కి i, లోపలి లూప్ కి కూడా i ఇస్తే కంపైల్ ఎర్రర్ వస్తుంది. కాబట్టి లోపల j లేదా k వాడాలి.'
    ],
    challenge: `// Coding Challenge:
// 5 రోస్ తో 0-1 (బైనరీ) ట్రయాంగిల్ ప్రింట్ చేయండి:
// 1
// 0 1
// 1 0 1
// 0 1 0 1
// 1 0 1 0 1
// హింట్: (row + col) ఈవెన్ నంబర్ ఆ ఆడ్ నంబరా అని చెక్ చేయండి!

public class Main {
    public static void main(String[] args) {
        int rows = 5;
        // TODO: 1/0 ప్యాట్రన్ ప్రింట్ చేయండి
        
    }
}`,
    faq: [
      {
        q: 'ఖాళీగా ఉన్న బాక్స్ ప్యాట్రన్ (Hollow square) ఎలా ప్రింట్ చేయాలి?',
        a: 'లోపలి లూప్ లో if కండిషన్ పెట్టుకుని.. అది ఫస్ట్ లైన్/లాస్ట్ లైన్ లేదా ఫస్ట్ కాలమ్/లాస్ట్ కాలమ్ అయినప్పుడు మాత్రమే స్టార్ ప్రింట్ చేయాలి, మిగతా వాటికి స్పేస్ ప్రింట్ చేయాలి.'
      },
      {
        q: 'కంపెనీ ఇంటర్వ్యూస్ లో ప్యాట్రన్స్ ఎందుకు అడుగుతారు?',
        a: 'మీ లాజికల్ థింకింగ్ ఎలా ఉంది, ఒకదాని లోపల ఒకటి ఉన్నప్పుడు కోడ్ ని మీరు ఎలా కంట్రోల్ చేస్తున్నారు అని టెస్ట్ చేయడానికి ప్యాట్రన్స్ బాగా యూస్ అవుతాయి.'
      }
    ],
    recap: [
      'Nested loops లో బయటిది రోస్ (Rows) కి, లోపలిది కాలమ్స్ (Columns) కి.',
      'లోపలి లూప్ లో print() వాడాలి, దాని తర్వాత println() వాడాలి.',
      'పిరమిడ్స్ లాంటి వాటికి స్టార్స్ తో పాటు స్పేస్ లని కూడా క్యాలిక్యులేట్ చేయాలి.',
      'బట్టీ పట్టకుండా, ఆ ప్యాట్రన్ కి ఉన్న లాజిక్ (1, 3, 5..) ఏంటో తెలుసుకోవాలి.'
    ]
  }
];
