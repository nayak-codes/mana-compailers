// Phase 3: Operators & User Input (Chapters 10 to 14)
// Exhaustive conceptual theory, Scanner newline trap explanations, operator precedence tables, printf formatting, and 5 Capstone Projects.

module.exports = [
  // ==========================================
  // CHAPTER 10: Arithmetic, Assignment & Relational Operators
  // ==========================================
  {
    num: 10,
    phaseId: 'phase3',
    phaseTitle: 'Phase 3: Operators and Input',
    slug: '10-java-operators-arithmetic-assignment-relational',
    title: 'Java Arithmetic, Assignment & Relational Operators (తెలుగులో)',
    badge: '10. Basic Operators',
    subtopics: 'Arithmetic Operators (+, -, *, /, %) · Integer Division vs Floating-Point · String Concatenation Nuances · Compound Assignment · Relational Operators',
    readTime: '15 min read',
    intro: 'జావాలో మ్యాథ్స్ (Arithmetic) ఆపరేషన్స్ ఎలా చేయాలి? పాయింట్ (డెసిమల్) నంబర్స్ తో వచ్చే కన్ఫ్యూజన్ ఏంటి? రెండు వేరియబుల్స్ ని (Relational) ఎలా కంపేర్ చేయాలి? స్ట్రింగ్స్ ని నంబర్స్ ని కలిపితే ఏమవుతుంది? అనే విషయాలు డీటెయిల్డ్ గా నేర్చుకుందాం.',
    theorySections: [
      {
        heading: '1. Arithmetic Operators (+, -, *, /, %)',
        content: `మ్యాథ్స్ లో వాడే బేసిక్ సింబల్స్ ని జావాలో కూడా అలాగే వాడుతాం:

| ఆపరేటర్ | పేరు | ఎలా వాడాలి? | ఎగ్జాంపుల్ | రిజల్ట్ |
| :--- | :--- | :--- | :--- | :--- |
| **\`+\`** | ఎడిషన్ (Addition) | \`a + b\` | \`10 + 5\` | \`15\` |
| **\`-\`** | సబ్ట్రాక్షన్ (Subtraction) | \`a - b\` | \`10 - 5\` | \`5\` |
| **\`*\`** | మల్టిప్లికేషన్ (Multiplication) | \`a * b\` | \`10 * 5\` | \`50\` |
| **\`/\`** | డివిజన్ (Division) | \`a / b\` | \`10 / 4\` vs \`10.0 / 4\` | \`2\` vs \`2.5\` |
| **\`%\`** | మాడ్యులస్ (Remainder) | \`a % b\` | \`10 % 3\` | \`1\` (శేషం వస్తుంది) |

### డివిజన్ (/) చేసేటప్పుడు వచ్చే పెద్ద కన్ఫ్యూజన్ (Integer Division Trap):
జావాలో డివైడ్ చేసే రెండు నంబర్స్ ఇంటిజర్స్ (\`int\`) అయితే, జావా వాటిని డివైడ్ చేశాక పాయింట్ తర్వాత ఉన్న వాల్యూ ని **కట్ చేసి పారేస్తుంది**.

\`\`\`java
int result1 = 7 / 2;     // ఆన్సర్ 3 వస్తుంది (3.5 లో .5 కట్ అయిపోయింది)
double result2 = 7 / 2;   // ఆన్సర్ 3.0 వస్తుంది (డివైడ్ అయ్యాకే డబుల్ కి మారింది కాబట్టి)
double result3 = 7.0 / 2; // ఆన్సర్ 3.5 వస్తుంది (ఒక నంబర్ డెసిమల్ కాబట్టి కరెక్ట్ ఆన్సర్ వచ్చింది)
\`\`\``
      },
      {
        heading: '2. స్ట్రింగ్స్ ని కలపడం (String Concatenation)',
        content: `జావాలో **\`+\`** సింబల్ కి రెండు పనులున్నాయి:
1. రెండు నంబర్స్ మధ్యలో పెడితే.. వాటిని కలుపుతుంది (మ్యాథ్స్ ఎడిషన్).
2. ఒక టెక్స్ట్ (String) కీ, నంబర్ కీ మధ్యలో పెడితే.. ఆ నంబర్ ని కూడా టెక్స్ట్ లా మార్చేసి పక్కపక్కన జాయింట్ చేస్తుంది.

### జావా లెఫ్ట్ నుంచి రైట్ కి చదువుతుంది:
\`\`\`java
System.out.println("Result: " + 10 + 20);   // అవుట్పుట్: "Result: 1020" (స్ట్రింగ్ పక్కన 10, 20 వచ్చి జాయిన్ అయ్యాయి)
System.out.println("Result: " + (10 + 20)); // అవుట్పుట్: "Result: 30" (బ్రాకెట్స్ లో ఉంది కాబట్టి ఫస్ట్ క్యాలిక్యులేట్ అయ్యింది)
System.out.println(10 + 20 + " is Total");  // అవుట్పుట్: "30 is Total" (ఫస్ట్ రెండు నంబర్స్ కాబట్టి యాడ్ అయిపోయాయి)
\`\`\``
      },
      {
        heading: '3. షార్ట్ కట్ ఆపరేటర్స్ (Compound Assignment)',
        content: `నార్మల్ గా ఒక వేరియబుల్ వాల్యూ ని మార్చాలంటే \`x = x + 5\` అని రాస్తాం. దాన్నే షార్ట్ కట్ లో ఇలా రాయొచ్చు:

| షార్ట్ కట్ | అసలు అర్థం | ఏం చేస్తుంది? |
| :--- | :--- | :--- |
| **\`x += 5\`** | \`x = x + 5\` | x కి 5 కలిపి, మళ్ళీ x లోనే సేవ్ చేస్తుంది. |
| **\`x -= 5\`** | \`x = x - 5\` | 5 తగ్గిస్తుంది. |
| **\`x *= 5\`** | \`x = x * 5\` | 5 తో మల్టిప్లై చేస్తుంది. |
| **\`x /= 5\`** | \`x = x / 5\` | 5 తో డివైడ్ చేస్తుంది. |
| **\`x %= 5\`** | \`x = x % 5\` | 5 తో డివైడ్ చేసి రిమైండర్ సేవ్ చేస్తుంది. |

### దీనికొక స్పెషాలిటీ ఉంది (Auto-Cast):
\`\`\`java
byte b = 10;
// b = b + 5; // ఇది ఎర్రర్ ఇస్తుంది (int ని byte లో పెడుతున్నారు అని)
b += 5;       // ఇది పనిచేస్తుంది! ఎందుకంటే షార్ట్ కట్ వాడినప్పుడు జావా ఆటోమాటిక్ గా టైప్ కాస్ట్ చేసేసుకుంటుంది.
\`\`\``
      },
      {
        heading: '4. Relational (Comparison) Operators',
        content: `రెండు వాల్యూస్ ని కంపేర్ చేసి.. అవునా కాదా (true / false) అని చెప్పడానికి ఇవి వాడతాం:

| ఆపరేటర్ | మీనింగ్ | ఎగ్జాంపుల్ (\`a = 10, b = 20\`) | రిజల్ట్ |
| :--- | :--- | :--- | :--- |
| **\`==\`** | ఈక్వల్ (సమానమా) | \`a == b\` | \`false\` |
| **\`!=\`** | నాట్ ఈక్వల్ | \`a != b\` | \`true\` |
| **\`>\`** | గ్రేటర్ దెన్ | \`a > b\` | \`false\` |
| **\`<\`** | లెస్ దెన్ | \`a < b\` | \`true\` |
| **\`>=\`** | గ్రేటర్ దెన్ ఆర్ ఈక్వల్ | \`a >= 10\` | \`true\` |
| **\`<=\`** | లెస్ దెన్ ఆర్ ఈక్వల్ | \`b <= 20\` | \`true\` |`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // 1. మ్యాథ్స్ ఆపరేషన్స్
        int a = 25;
        int b = 4;

        System.out.println("--- మ్యాథ్స్ ఆపరేటర్స్ ---");
        System.out.println("a + b = " + (a + b)); // 29
        System.out.println("a - b = " + (a - b)); // 21
        System.out.println("a * b = " + (a * b)); // 100
        System.out.println("a / b (Integer Division) = " + (a / b));       // 6
        System.out.println("a / b (Decimal Division) = " + ((double)a / b)); // 6.25 (ఫోర్స్ చేసి double లా మార్చాం)
        System.out.println("a % b (శేషం)              = " + (a % b));       // 1

        // 2. షార్ట్ కట్ ఆపరేటర్స్
        int score = 100;
        score += 50;  // 150 అవుతుంది
        score *= 2;   // 300 అవుతుంది
        score -= 75;  // 225 అవుతుంది
        System.out.println("\nఫైనల్ స్కోర్: " + score);

        // 3. కంపేర్ చేయడం (Relational)
        int passMarks = 40;
        int studentScore = 78;
        boolean hasPassed = studentScore >= passMarks;
        boolean isPerfect = studentScore == 100;

        System.out.println("\n--- రిజల్ట్స్ ---");
        System.out.println("స్టూడెంట్ పాస్ అయ్యాడా? : " + hasPassed);
        System.out.println("100 కి 100 వచ్చాయా? : " + isPerfect);
    }
}`,
    output: `--- మ్యాథ్స్ ఆపరేటర్స్ ---
a + b = 29
a - b = 21
a * b = 100
a / b (Integer Division) = 6
a / b (Decimal Division) = 6.25
a % b (శేషం)              = 1

ఫైనల్ స్కోర్: 225

--- రిజల్ట్స్ ---
స్టూడెంట్ పాస్ అయ్యాడా? : true
100 కి 100 వచ్చాయా? : false`,
    lineByLine: [
      { line: '(double)a / b', explanation: 'డెసిమల్స్ (పాయింట్ వాల్యూస్) మిస్ అవ్వకుండా ఉండటానికి, డివైడ్ చేసే ముందే ఒక నంబర్ ని డబుల్ కి మార్చాం.' },
      { line: 'a % b', explanation: 'దీన్ని మోడ్యులస్ అంటారు. 25 ని 4 తో భాగిస్తే మిగిలే శేషం (Remainder) 1 వస్తుంది.' },
      { line: 'score += 50;', explanation: 'ఇది score = score + 50 కి షార్ట్ కట్.' },
      { line: 'boolean hasPassed = studentScore >= passMarks;', explanation: 'స్టూడెంట్ మార్క్స్ 40 కి సమానంగా లేదా అంతకంటే ఎక్కువ ఉంటే true వస్తుంది.' }
    ],
    practicalExample: `public class EvenOddDemo {
    public static void main(String[] args) {
        int[] numbers = { 14, 27, 40, 99, 102 };

        System.out.println("=== సరి సంఖ్య (Even) / బేసి సంఖ్య (Odd) చెకింగ్ ===");
        
        for (int num : numbers) {
            // ఒక నంబర్ ని 2 తో భాగిస్తే శేషం 0 వస్తే అది Even, లేదంటే Odd
            boolean isEven = (num % 2 == 0);
            System.out.println("నంబర్ " + num + " : " + (isEven ? "EVEN" : "ODD"));
        }
    }
}`,
    practicalOutput: `=== సరి సంఖ్య (Even) / బేసి సంఖ్య (Odd) చెకింగ్ ===
నంబర్ 14 : EVEN
నంబర్ 27 : ODD
నంబర్ 40 : EVEN
నంబర్ 99 : ODD
నంబర్ 102 : EVEN`,
    commonMistakes: [
      'బ్రాకెట్స్ మర్చిపోవడం: టెక్స్ట్ పక్కన "Sum: " + 10 + 20 అని ఇస్తే "Sum: 1020" అని వస్తుంది. అదే "Sum: " + (10 + 20) అని ఇస్తే "Sum: 30" వస్తుంది.',
      '== కి బదులు = వాడటం: "if (x = 5)" అంటే ఎర్రర్ వస్తుంది. అసైన్ చేయడానికి ఒక్క =, కంపేర్ చేయడానికి == వాడాలి.',
      'int / int క్యాలిక్యులేషన్: "double ratio = 1 / 2;" అంటే 0.5 రాదు, 0.0 వస్తుంది. కచ్చితంగా డెసిమల్స్ కావాలంటే "1.0 / 2.0" అని వాడాలి.'
    ],
    challenge: `// Coding Challenge:
// మీ దగ్గర 3850 సెకన్లు (totalSeconds = 3850) ఉన్నాయి అనుకుందాం.
// 1. గంటలు క్యాలిక్యులేట్ చేయండి (hours = totalSeconds / 3600)
// 2. మిగిలిన సెకన్లు క్యాలిక్యులేట్ చేయండి (rem = totalSeconds % 3600)
// 3. నిమిషాలు (rem / 60), మళ్ళీ మిగిలిన సెకన్లు (rem % 60) కనుక్కోండి.
// ఫైనల్ గా "3850 seconds = 1 hr, 4 min, 10 sec" అని ప్రింట్ చేయండి.

public class Main {
    public static void main(String[] args) {
        int totalSeconds = 3850;
        // TODO: / మరియు % వాడి కోడ్ రాయండి
        
    }
}`,
    faq: [
      {
        q: 'ఫ్లోటింగ్ పాయింట్ (డెసిమల్స్) నంబర్స్ ని సున్నాతో డివైడ్ చేస్తే ఏమవుతుంది (ఉదా: 10.0 / 0.0)?',
        a: 'ఇంటిజర్స్ ని 0 తో డివైడ్ చేస్తే క్రాష్ అవుతుంది (ArithmeticException). కానీ డెసిమల్స్ ని డివైడ్ చేస్తే క్రాష్ అవ్వదు, దానికి బదులు ఆన్సర్ "Infinity" అని వస్తుంది. 0.0 ని 0.0 తో డివైడ్ చేస్తే "NaN" (Not a Number) వస్తుంది.'
      },
      {
        q: 'మైనస్ నంబర్స్ కి % (మోడ్యులస్) పనిచేస్తుందా?',
        a: 'చేస్తుంది! జావాలో ఫస్ట్ ఏ నంబర్ ఉందో, దాని సైన్ (+ లేదా -) ఫైనల్ ఆన్సర్ కి వస్తుంది. ఉదాహరణకి -7 % 3 అంటే -1 వస్తుంది. అదే 7 % -3 అంటే 1 వస్తుంది.'
      }
    ],
    recap: [
      'రెండు ఇంటిజర్స్ ని డివైడ్ చేస్తే పాయింట్ తర్వాత వచ్చే ఆన్సర్ ని జావా కట్ చేస్తుంది.',
      '+ సింబల్ నంబర్స్ ని కలుపుతుంది, స్ట్రింగ్స్ ని అయితే పక్కపక్కన అతుక్కునేలా (concatenate) చేస్తుంది.',
      '+=, -= లాంటివి షార్ట్ కట్ ఆపరేటర్స్. ఇవి టైప్ ని ఆటోమాటిక్ గా అడ్జస్ట్ చేస్తాయి.',
      '==, !=, >, < లాంటివన్నీ అవునా కాదా (true/false) అనే ఆన్సర్ నే ఇస్తాయి.'
    ]
  },

  // ==========================================
  // CHAPTER 11: Logical, Bitwise, Unary & Ternary Operators
  // ==========================================
  {
    num: 11,
    phaseId: 'phase3',
    phaseTitle: 'Phase 3: Operators and Input',
    slug: '11-java-logical-bitwise-and-ternary-operators',
    title: 'Logical, Bitwise, Unary & Ternary Operators (తెలుగులో)',
    badge: '11. Logical & Bitwise',
    subtopics: 'Logical Operators (&&, ||, !) · Short-Circuit Evaluation · Prefix vs Postfix (++x / x++) · Ternary Operator (? :) · Bitwise Operators · Operator Precedence Table',
    readTime: '16 min read',
    intro: 'రెండు మూడు కండిషన్స్ ని ఒకేసారి ఎలా చెక్ చేయాలి (&&, ||)? ++x కీ x++ కీ తేడా ఏంటి? ఇఫ్-ఎల్స్ (if-else) ని ఒకే లైన్ లో షార్ట్ కట్ (Ternary) లో ఎలా రాయాలి? మరియు ఇవన్నీ ఒకే లైన్ లో వస్తే జావా దేన్ని ఫస్ట్ క్యాలిక్యులేట్ చేస్తుంది? డీటెయిల్డ్ గా చూద్దాం.',
    theorySections: [
      {
        heading: '1. లాజికల్ ఆపరేటర్స్ & Short-Circuit పవర్',
        content: `రెండు మూడు కండిషన్స్ ని కలుపుతూ చెక్ చేయడానికి లాజికల్ ఆపరేటర్స్ వాడతాం:

| ఆపరేటర్ | పేరు | మీనింగ్ |
| :--- | :--- | :--- |
| **\`&&\`** | AND | రెండు కండిషన్స్ \`true\` అయితేనే ఫైనల్ రిజల్ట్ \`true\` వస్తుంది. |
| **\`\|\|\`** | OR | రెండిట్లో ఏ ఒక్కటి \`true\` అయినా సరే ఫైనల్ రిజల్ట్ \`true\` వస్తుంది. |
| **\`!\`** | NOT | ఉన్నదాన్ని రివర్స్ చేస్తుంది (\`!true\` అంటే \`false\`). |

### Short-Circuit Evaluation అంటే ఏంటి?:
ఇది జావాలో ఉన్న ఒక సూపర్ ఫీచర్. మన కండిషన్స్ ని ఇది సగం వరకే చెక్ చేసి ఆన్సర్ డిసైడ్ చేసేస్తుంది.
- **\`&&\` (AND):** ఫస్ట్ కండిషనే \`false\` అయితే.. ఇక రెండో కండిషన్ ని జావా **అసలు చెక్ చేయదు**! ఎందుకంటే AND లో ఒక్కటి false అయినా మొత్తం false అయిపోతుంది కాబట్టి.
- **\`||\` (OR):** ఫస్ట్ కండిషనే \`true\` అయితే.. అప్పుడు కూడా రెండో కండిషన్ ని **అసలు చెక్ చేయదు**! ఎందుకంటే OR లో ఒక్కటి true అయినా మొత్తం true నే కాబట్టి.

దీనివల్ల మన యాప్ స్పీడ్ పెరగడమే కాకుండా క్రాష్ అవ్వకుండా కాపాడుకోవచ్చు:
\`\`\`java
String user = null;
// ఇక్కడ user != null అనేది false. కాబట్టి జావా ఇక పక్కనున్న user.length() ని అసలు చెక్ చేయదు.
// ఒకవేళ దాన్ని చెక్ చేస్తే యాప్ క్రాష్ అయ్యేది! సేవ్ అయ్యాం!
if (user != null && user.length() > 0) { ... }
\`\`\``
      },
      {
        heading: '2. Increment/Decrement: Prefix (++x) vs Postfix (x++)',
        content: `ఒక వేరియబుల్ వాల్యూ ని 1 పెంచడానికి (++) లేదా తగ్గించడానికి (--) ఇవి వాడతాం. కానీ దీన్ని ముందు రాస్తే ఒకలా, వెనక రాస్తే ఒకలా పనిచేస్తుంది:

\`\`\`
+-----------------------------------------------------------------------------------+
|                        PREFIX vs POSTFIX INCREMENT                                |
+-----------------------------------------------------------------------------------+
|  1. PREFIX (++x): "ముందు పెంచు.. ఆ తర్వాత వాడుకో"                                        |
|     int x = 5;                                                                    |
|     int y = ++x; // ఫస్ట్ x వాల్యూ 6 అవుతుంది. ఆ తర్వాత y లో 6 స్టోర్ అవుతుంది.               |
|     (ఫైనల్ గా: x = 6, y = 6)                                                         |
+-----------------------------------------------------------------------------------+
|  2. POSTFIX (x++): "ముందు వాడుకో.. ఆ తర్వాత పెంచు"                                       |
|     int a = 5;                                                                    |
|     int b = a++; // ఫస్ట్ b లో పాత వాల్యూ 5 స్టోర్ అవుతుంది. ఆ తర్వాత a వాల్యూ 6 అవుతుంది.     |
|     (ఫైనల్ గా: a = 6, b = 5)                                                         |
+-----------------------------------------------------------------------------------+
\`\`\``
      },
      {
        heading: '3. Ternary Operator (? :)',
        content: `ఇది \`if-else\` రాయడానికి ఒక సింపుల్ షార్ట్ కట్. 4, 5 లైన్లు రాసే బదులు ఒకే లైన్ లో రాసేయొచ్చు:

\`\`\`
వాల్యూ = (కండిషన్) ? ట్రూ అయితే ఇది : ఫాల్స్ అయితే ఇది;
\`\`\`

\`\`\`java
int score = 85;
String status = (score >= 50) ? "PASS" : "FAIL";

int a = 10, b = 25;
int max = (a > b) ? a : b; // ఇక్కడ a కన్నా b పెద్దది కాబట్టి ఫాల్స్ కండిషన్ (b) సెలెక్ట్ అయ్యి 25 సేవ్ అవుతుంది.
\`\`\``
      },
      {
        heading: '4. Bitwise ఆపరేటర్స్',
        content: `కంప్యూటర్ ఇంటర్నల్ గా అర్థం చేసుకునే బైనరీ బిట్స్ (0, 1) ని డైరెక్ట్ గా ఆపరేట్ చేయడానికి ఇవి వాడతారు. (ఇవి నార్మల్ యాప్స్ లో వాడం, లో-లెవెల్ ప్రోగ్రామింగ్ లో వాడతారు).

| ఆపరేటర్ | పేరు | ఏం చేస్తుంది? |
| :--- | :--- | :--- |
| **\`&\`** | Bitwise AND | రెండు బిట్స్ 1 ఉంటేనే రిజల్ట్ 1 అవుతుంది. |
| **\`\|\`** | Bitwise OR | ఏ ఒక్క బిట్ 1 ఉన్నా రిజల్ట్ 1 అవుతుంది. |
| **\`^\`** | Bitwise XOR | రెండు బిట్స్ వేరువేరుగా (0,1 లేదా 1,0) ఉంటేనే రిజల్ట్ 1 అవుతుంది. |
| **\`~\`** | Bitwise NOT | 0 ని 1 గా, 1 ని 0 గా మారుస్తుంది. |
| **\`<<\`** | Left Shift | బిట్స్ ని లెఫ్ట్ కి జరుపుతుంది (నంబర్ డబుల్ అవుతుంది $x \\times 2$). |
| **\`>>\`** | Right Shift | బిట్స్ ని రైట్ కి జరుపుతుంది (నంబర్ సగం అవుతుంది $x / 2$). |`
      },
      {
        heading: '5. ఆపరేటర్స్ లో ఎవరికి ఫస్ట్ ర్యాంక్? (Precedence)',
        content: `ఒకే లైన్ లో ప్లస్, మైనస్, మల్టిప్లికేషన్ అన్నీ వస్తే, జావా దేన్ని ఫస్ట్ క్యాలిక్యులేట్ చేయాలో ఒక ఆర్డర్ (బోడ్ మాస్ రూల్ లాగా) ఉంటుంది:

| ర్యాంక్ | ఆపరేటర్స్ | ఏ డైరెక్షన్ లో చదువుతుంది? |
| :--- | :--- | :--- |
| **1 (హైయెస్ట్)** | బ్రాకెట్స్ \`()\`, \`x++\`, \`x--\` | లెఫ్ట్ నుంచి రైట్ కి |
| **2** | ముందు వచ్చేవి \`++x\`, \`--x\`, \`!\`, \`(type)\` | **రైట్ నుంచి లెఫ్ట్ కి** |
| **3** | మల్టిప్లికేషన్ \`*\`, \`/\`, \`%\` | లెఫ్ట్ నుంచి రైట్ కి |
| **4** | ఎడిషన్ \`+\`, \`-\` | లెఫ్ట్ నుంచి రైట్ కి |
| **5** | రిలేషనల్ \`<\`, \`<=\`, \`>\`, \`>=\` | లెఫ్ట్ నుంచి రైట్ కి |
| **6** | ఈక్వాలిటీ \`==\`, \`!=\` | లెఫ్ట్ నుంచి రైట్ కి |
| **7** | లాజికల్ AND \`&&\` | లెఫ్ట్ నుంచి రైట్ కి |
| **8** | లాజికల్ OR \`\|\|\` | లెఫ్ట్ నుంచి రైట్ కి |
| **9** | టెర్నరీ \`? :\` | **రైట్ నుంచి లెఫ్ట్ కి** |
| **10 (లోయెస్ట్)** | అసైన్ చేయడం \`=\`, \`+=\`, \`-=\` వగైరా | **రైట్ నుంచి లెఫ్ట్ కి** |`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // 1. లాజికల్ ఆపరేటర్స్ (&&, ||)
        int age = 22;
        boolean hasVoterCard = true;
        // వయసు 18 దాటాలి, మరియు ఓటర్ కార్డ్ ఉండాలి.. అప్పుడే ఓట్ వేయొచ్చు
        boolean canVote = (age >= 18) && hasVoterCard;
        System.out.println("ఓట్ వేయొచ్చా?: " + canVote);

        // 2. Prefix vs Postfix
        int p = 10;
        int q = ++p; // ఫస్ట్ p 11 అవుతుంది, ఆ తర్వాత 11 వాల్యూ q కి వెళ్తుంది.
        System.out.println("Prefix (p, q)  : p=" + p + ", q=" + q);

        int m = 10;
        int n = m++; // ఫస్ట్ n కి పాత వాల్యూ 10 వెళ్తుంది. ఆ తర్వాత m వాల్యూ 11 అవుతుంది.
        System.out.println("Postfix (m, n) : m=" + m + ", n=" + n);

        // 3. Ternary Operator షార్ట్ కట్
        double cartTotal = 1500.00;
        // బిల్ 1000 దాటితే డెలివరీ ఫ్రీ (0.0), లేదంటే 50 రూపాయలు.
        double shippingFee = (cartTotal >= 1000.00) ? 0.00 : 50.00;
        System.out.println("బిల్: ₹" + cartTotal + " | డెలివరీ ఛార్జ్: ₹" + shippingFee);

        // 4. Bitwise ఆపరేషన్స్ (బైనరీ లెవెల్ లో)
        int bitA = 0b0101; // బైనరీలో 5
        int bitB = 0b0011; // బైనరీలో 3
        System.out.println("\n--- Bitwise Operations (5 & 3) ---");
        System.out.println("5 & 3 (AND) : " + (bitA & bitB)); // 0001 = 1
        System.out.println("5 | 3 (OR)  : " + (bitA | bitB)); // 0111 = 7
        System.out.println("5 << 1 (లెఫ్ట్ కి జరిపితే డబుల్ అవుతుంది): " + (bitA << 1)); // 10
    }
}`,
    output: `ఓట్ వేయొచ్చా?: true
Prefix (p, q)  : p=11, q=11
Postfix (m, n) : m=11, n=10
బిల్: ₹1500.0 | డెలివరీ ఛార్జ్: ₹0.0

--- Bitwise Operations (5 & 3) ---
5 & 3 (AND) : 1
5 | 3 (OR)  : 7
5 << 1 (లెఫ్ట్ కి జరిపితే డబుల్ అవుతుంది): 10`,
    lineByLine: [
      { line: '(age >= 18) && hasVoterCard', explanation: 'AND ఆపరేటర్: రెండు కండిషన్స్ ట్రూ అయితేనే ఫైనల్ ఆన్సర్ ట్రూ వస్తుంది.' },
      { line: 'int q = ++p;', explanation: 'Prefix: ముందు వాల్యూ పెరిగి, ఆ తర్వాత అసైన్ అవుతుంది.' },
      { line: 'int n = m++;', explanation: 'Postfix: ముందు అసైన్ అయ్యిపోయి, ఆ తర్వాత వాల్యూ పెరుగుతుంది.' },
      { line: '(cartTotal >= 1000.00) ? 0.00 : 50.00', explanation: 'Ternary: 1000 కంటే ఎక్కువ ఉందా? అవును (true) అయితే 0.00 వస్తుంది, లేదంటే 50.00 వస్తుంది.' }
    ],
    practicalExample: `public class AccessControlDemo {
    public static void main(String[] args) {
        boolean isAuthenticated = true;
        boolean isAdmin = false;
        boolean hasSpecialPermission = true;

        // రూల్: యూజర్ లాగిన్ అయ్యుండాలి.. దాంతో పాటు అతను అడ్మిన్ అన్నా అయ్యుండాలి లేదా స్పెషల్ పర్మిషన్ అన్నా ఉండాలి
        boolean hasAccess = isAuthenticated && (isAdmin || hasSpecialPermission);

        String accessBadge = hasAccess ? "[ACCESS GRANTED] వెళ్ళండి" : "[ACCESS DENIED] ఆగిపోండి";
        System.out.println("సెక్యూరిటీ చెక్: " + accessBadge);
    }
}`,
    practicalOutput: `సెక్యూరిటీ చెక్: [ACCESS GRANTED] వెళ్ళండి`,
    commonMistakes: [
      'రెండు సార్లు (&&) బదులు ఒక్కసారి (&) వాడటం: సింగిల్ & వాడితే, ఫస్ట్ ది ఫాల్స్ అయినా కూడా.. అనవసరంగా రెండోది కూడా చెక్ చేస్తుంది. దీనివల్ల క్రాష్ అయ్యే ఛాన్స్ ఉంది.',
      'కాంప్లెక్స్ గా కోడ్ రాయడం: "int z = x++ + ++x;" లాంటివి రాస్తే కోడ్ చదవడానికి చాలా కన్ఫ్యూజింగ్ గా ఉంటుంది. ఇలాంటి ట్రిక్స్ రాయకూడదు.',
      'ఒకదానిలో ఒకటి టెర్నరీ వాడటం: టెర్నరీలోపల ఇంకో టెర్నరీ (a ? (b ? c : d) : e) రాస్తే అర్థం కాదు. అలాంటప్పుడు నార్మల్ if-else రాయడమే బెటర్.'
    ],
    challenge: `// Coding Challenge:
// మీ దగ్గర 3 నంబర్స్ ఉన్నాయి అనుకుందాం: a = 45, b = 78, c = 32.
// 1. Ternary operator (? :) వాడి ఈ మూడింటిలో పెద్ద నంబర్ ఏంటో కనుక్కోండి.
// 2. "అన్నింటికంటే పెద్దది: 78" అని ప్రింట్ చేయండి.

public class Main {
    public static void main(String[] args) {
        int a = 45, b = 78, c = 32;
        // TODO: లాజిక్ రాయండి
        
    }
}`,
    faq: [
      {
        q: 'Bitwise shift (x << 1) వాడితే స్పీడ్ గా ఉంటుందా లేదా మల్టిప్లై (x * 2) చేస్తే స్పీడ్ గా ఉంటుందా?',
        a: 'ఇంటర్నల్ గా జావా (x * 2) ని కూడా ఆటోమాటిక్ గా బిట్ షిఫ్ట్ లాగే మార్చుకుని క్యాలిక్యులేట్ చేస్తుంది. కాబట్టి మనం నార్మల్ మ్యాథ్స్ లాగే రాసుకోవచ్చు, స్పీడ్ లో తేడా ఉండదు.'
      },
      {
        q: '++x రైట్ నుంచి లెఫ్ట్ కి ఎందుకు క్యాలిక్యులేట్ అవుతుంది?',
        a: 'అది ముందు వేరియబుల్ (x) ని తీసుకుని, ఆ తర్వాత వాల్యూ పెంచుతుంది కాబట్టి రైట్ నుంచి లెఫ్ట్ కి పనిచేస్తుంది.'
      }
    ],
    recap: [
      '&& మరియు || లు సగం వరకే చెక్ చేసి (short-circuit) ఆన్సర్ డిసైడ్ చేసేస్తాయి.',
      'Prefix (++x) ముందే వాల్యూ పెంచుతుంది, Postfix (x++) తర్వాత పెంచుతుంది.',
      'Ternary operator అంటే if-else ని ఒకే లైన్ లో రాయడం.',
      'బ్రాకెట్స్ కి హైయెస్ట్ ర్యాంక్ ఉంటుంది, కాబట్టి ఏది ముందు క్యాలిక్యులేట్ అవ్వాలో దాన్ని బ్రాకెట్స్ లో పెట్టడం బెస్ట్.'
    ]
  },

  // ==========================================
  // CHAPTER 12: Java User Input with Scanner
  // ==========================================
  {
    num: 12,
    phaseId: 'phase3',
    phaseTitle: 'Phase 3: Operators and Input',
    slug: '12-java-user-input-scanner-complete-guide',
    title: 'Java User Input with Scanner & Newline Trap (తెలుగులో)',
    badge: '12. Scanner & User Input',
    subtopics: 'java.util.Scanner · Reading Data (nextInt, nextDouble, nextLine) · The Infamous Newline Buffer Trap · InputMismatchException · Resource Management & closing Scanner',
    readTime: '16 min read',
    intro: 'జావాలో కీబోర్డ్ నుంచి వాల్యూస్ (User Input) ఎలా తీసుకోవాలి? Scanner క్లాస్ ఎలా వాడాలి? నంబర్స్ తర్వాత టెక్స్ట్ తీసుకునేటప్పుడు వచ్చే "Newline Trap" అనే పెద్ద బగ్ ని ఎలా సాల్వ్ చేయాలో ఈ చాప్టర్ లో చూద్దాం.',
    theorySections: [
      {
        heading: '1. Scanner క్లాస్ అంటే ఏంటి?',
        content: `మనం కీబోర్డ్ లో ఏది టైప్ చేసినా అది డైరెక్ట్ గా జావా ప్రోగ్రామ్ లోకి వెళ్ళిపోదు. మధ్యలో దాన్ని చదవడానికి **\`Scanner\`** అనే ఒక క్లాస్ కావాలి (ఇది \`java.util\` అనే ప్యాకేజ్ లో ఉంటుంది).

### Scanner ని సెటప్ చేసే విధానం:
\`\`\`java
import java.util.Scanner; // 1. పైన దీన్ని ఇంపోర్ట్ చేసుకోవాలి

Scanner input = new Scanner(System.in); // 2. సిస్టమ్ కీబోర్డ్ (System.in) ని చదవమని చెప్తున్నాం
System.out.print("మీ పేరు ఎంటర్ చేయండి: ");
String name = input.nextLine(); // 3. యూజర్ టైప్ చేసేదాన్ని చదువుతున్నాం
input.close(); // 4. పని అయ్యాక దాన్ని క్లోజ్ చేయాలి
\`\`\``
      },
      {
        heading: '2. Scanner లో ఉండే మెయిన్ ఫంక్షన్స్',
        content: `యూజర్ ఇచ్చే డేటా ఏ టైపో దాన్నిబట్టి ఫంక్షన్ వాడాలి:

| ఫంక్షన్ | ఏ టైప్ వస్తుంది? | ఏం చదువుతుంది? |
| :--- | :--- | :--- |
| **\`nextLine()\`** | \`String\` | యూజర్ టైప్ చేసిన లైన్ మొత్తాన్ని (స్పేస్ లతో సహా) చదువుతుంది. Enter నొక్కే వరకు ఆగుతుంది. |
| **\`next()\`** | \`String\` | స్పేస్ వచ్చే వరకు మాత్రమే చదువుతుంది. (ఒకే పదాన్ని తీసుకుంటుంది). |
| **\`nextInt()\`** | \`int\` | నంబర్ ని తీసుకుంటుంది. |
| **\`nextDouble()\`**| \`double\` | డెసిమల్ నంబర్ (పాయింట్ వాల్యూ) ని తీసుకుంటుంది. |
| **\`nextLong()\`** | \`long\` | పెద్ద నంబర్ ని తీసుకుంటుంది. |
| **\`nextBoolean()\`**| \`boolean\` | కేవలం \`true\` లేదా \`false\` తీసుకుంటుంది. |`
      },
      {
        heading: '3. అందరూ చేసే పెద్ద తప్పు: "Newline Buffer Trap"',
        content: `జావా నేర్చుకునే ప్రతి ఒక్కరూ ఫేస్ చేసే అతిపెద్ద ప్రాబ్లమ్ ఇది. నంబర్స్ ని తీసుకుని, వెంటనే స్ట్రింగ్ ని తీసుకున్నప్పుడు ఈ ప్రాబ్లమ్ వస్తుంది.

### ఏం జరుగుతుంది?:
మీరు \`nextInt()\` వాడినప్పుడు, యూజర్ నంబర్ టైప్ చేసి **Enter** కీ నొక్కుతాడు కదా. ఆ Enter కీ కి సంబంధించిన న్యూలైన్ (\`\\n\`) క్యారెక్టర్ ని Scanner రీడ్ చేయకుండా అలా బఫర్ (మెమరీ) లోనే వదిలేస్తుంది:

\`\`\`java
System.out.print("వయసు ఎంటర్ చేయండి: ");
int age = scanner.nextInt(); // యూజర్ '21' టైప్ చేసి ENTER నొక్కుతాడు. ఇది 21 తీసుకుంటుంది కానీ ఆ ఎంటర్ (\n) అక్కడే ఉండిపోతుంది!

System.out.print("పేరు ఎంటర్ చేయండి: ");
String name = scanner.nextLine(); // నెక్స్ట్ లైన్ లోకి రాగానే.. అక్కడున్న ఆ ఎంటర్ (\n) ని చూసి యూజర్ పేరు కూడా ఎంటర్ చేసాడేమో అనుకుని ఖాళీగా సేవ్ చేసేస్తుంది!
// అసలు యూజర్ కి పేరు ఎంటర్ చేసే ఛాన్సే ఇవ్వదు.
\`\`\`

### దీన్ని ఎలా సాల్వ్ చేయాలి? (The Professional Fix):
ఎప్పుడైనా సరే \`nextInt()\`, \`nextDouble()\` వాడిన తర్వాత మీరు \`nextLine()\` వాడాల్సి వస్తే.. మధ్యలో ఒక డమ్మీ \`scanner.nextLine()\` రాయాలి. ఆ డమ్మీ లైన్ ఆ ఎంటర్ (\`\\n\`) ని క్లీన్ చేసేస్తుంది:

\`\`\`java
System.out.print("వయసు ఎంటర్ చేయండి: ");
int age = scanner.nextInt();
scanner.nextLine(); // FIX: ఇది ఆ ఎంటర్ కీ (\n) ని క్లీన్ చేసి పారేస్తుంది

System.out.print("పేరు ఎంటర్ చేయండి: ");
String name = scanner.nextLine(); // ఇప్పుడు పర్ఫెక్ట్ గా యూజర్ పేరు అడుగుతుంది!
\`\`\``
      },
      {
        heading: '4. తప్పు డేటా ఇస్తే క్రాష్ అవ్వకుండా ఆపడం (InputMismatchException)',
        content: `మీరు \`scanner.nextInt()\` వాడి నంబర్ అడిగినప్పుడు, యూజర్ కావాలని నంబర్ ఇవ్వకుండా టెక్స్ట్ (\`"hello"\`) టైప్ చేస్తే ఏమవుతుంది? వెంటనే జావా **\`InputMismatchException\`** అని ఎర్రర్ ఇచ్చి ప్రోగ్రామ్ ని క్రాష్ చేస్తుంది.

### దీన్ని సేఫ్ గా ఎలా డీల్ చేయాలి?:
\`hasNextInt()\` వాడి, యూజర్ ఇచ్చింది నంబరా కాదా అని ముందే చెక్ చేసుకోవచ్చు:
\`\`\`java
if (scanner.hasNextInt()) {
    int age = scanner.nextInt();
    System.out.println("కరెక్ట్ గా ఇచ్చారు: " + age);
} else {
    System.out.println("తప్పు! మీరు నంబర్ మాత్రమే ఎంటర్ చేయాలి.");
}
\`\`\``
      }
    ],
    codeExample: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("==========================================");
        System.out.println("   స్టూడెంట్ రిజిస్ట్రేషన్ సిస్టమ్      ");
        System.out.println("==========================================");

        // 1. ఇంటిజర్ చదవడం
        System.out.print("స్టూడెంట్ ID ఎంటర్ చేయండి (ఉదా: 101): ");
        int studentId = scanner.nextInt();

        // 2. డెసిమల్ చదవడం
        System.out.print("GPA ఎంటర్ చేయండి (ఉదా: 3.85): ");
        double gpa = scanner.nextDouble();

        // 3. ఇంపార్టెంట్: బఫర్ లో ఉన్న 'ఎంటర్' కీ ని క్లీన్ చేయడం
        scanner.nextLine();

        // 4. టెక్స్ట్ (లైన్) మొత్తం చదవడం
        System.out.print("పూర్తి పేరు ఎంటర్ చేయండి: ");
        String fullName = scanner.nextLine();

        // 5. బూలియన్ చదవడం
        System.out.print("ఫుల్ టైమ్ స్టూడెంటా? (true/false): ");
        boolean isFullTime = scanner.nextBoolean();

        // రిజల్ట్స్ ప్రింట్ చేయడం
        System.out.println("\n--- స్టూడెంట్ డీటెయిల్స్ ---");
        System.out.println("ID        : #" + studentId);
        System.out.println("పేరు      : " + fullName);
        System.out.println("GPA       : " + gpa);
        System.out.println("ఫుల్ టైమ్ : " + (isFullTime ? "YES" : "NO"));

        scanner.close(); // స్మానర్ క్లోజ్ చేయడం మర్చిపోవద్దు
    }
}`,
    output: `==========================================
   స్టూడెంట్ రిజిస్ట్రేషన్ సిస్టమ్      
==========================================
స్టూడెంట్ ID ఎంటర్ చేయండి (ఉదా: 101): 101
GPA ఎంటర్ చేయండి (ఉదా: 3.85): 3.85
పూర్తి పేరు ఎంటర్ చేయండి: Balaji Nayak
ఫుల్ టైమ్ స్టూడెంటా? (true/false): true

--- స్టూడెంట్ డీటెయిల్స్ ---
ID        : #101
పేరు      : Balaji Nayak
GPA       : 3.85
ఫుల్ టైమ్ : YES`,
    lineByLine: [
      { line: 'Scanner scanner = new Scanner(System.in);', explanation: 'కీబోర్డ్ నుంచి వచ్చే డేటాని (System.in) చదవడానికి ఒక స్మానర్ ని రెడీ చేసుకున్నాం.' },
      { line: 'int studentId = scanner.nextInt();', explanation: 'యూజర్ టైప్ చేసే ఇంటిజర్ ని తీసుకొని studentId లో స్టోర్ చేస్తున్నాం.' },
      { line: 'scanner.nextLine(); // Clean buffer', explanation: 'పైన నంబర్స్ తీసుకున్నాం కదా, అక్కడ మిగిలిపోయిన Enter కీ ని ఇది క్లీన్ చేసేస్తుంది. (చాలా ఇంపార్టెంట్!).' },
      { line: 'String fullName = scanner.nextLine();', explanation: 'యూజర్ పేరు మొత్తాన్ని స్పేస్ లతో సహా చదువుతుంది.' },
      { line: 'scanner.close();', explanation: 'పని అయ్యాక ఆ కనెక్షన్ ని క్లోజ్ చేయాలి, లేదంటే మెమరీ లీక్ అవుతుంది.' }
    ],
    practicalExample: `import java.util.Scanner;

public class SimpleBillCalculator {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("--- సూపర్ మార్కెట్ బిల్లింగ్ సిస్టమ్ ---");
        System.out.print("ఐటమ్ పేరు: ");
        String itemName = input.nextLine();

        System.out.print("ఒక దాని ధర (₹): ");
        double unitPrice = input.nextDouble();

        System.out.print("ఎన్ని తీసుకున్నారు?: ");
        int quantity = input.nextInt();

        // సబ్ టోటల్ & 18% GST క్యాలిక్యులేషన్
        double subtotal = unitPrice * quantity;
        double gstAmount = subtotal * 0.18;
        double grandTotal = subtotal + gstAmount;

        System.out.println("\n========= ఫైనల్ బిల్ =========");
        System.out.println("ఐటమ్      : " + itemName);
        System.out.println("క్వాంటిటీ  : " + quantity + " x ₹" + unitPrice);
        System.out.println("సబ్ టోటల్  : ₹" + subtotal);
        System.out.println("GST (18%) : ₹" + gstAmount);
        System.out.println("మొత్తం కట్టాల్సింది: ₹" + grandTotal);
        System.out.println("===============================");

        input.close();
    }
}`,
    practicalOutput: `--- సూపర్ మార్కెట్ బిల్లింగ్ సిస్టమ్ ---
ఐటమ్ పేరు: Wireless Mouse
ఒక దాని ధర (₹): 1250.00
ఎన్ని తీసుకున్నారు?: 2

========= ఫైనల్ బిల్ =========
ఐటమ్      : Wireless Mouse
క్వాంటిటీ  : 2 x ₹1250.0
సబ్ టోటల్  : ₹2500.0
GST (18%) : ₹450.0
మొత్తం కట్టాల్సింది: ₹2950.0
===============================`,
    commonMistakes: [
      'బఫర్ ని క్లీన్ చేయకపోవడం: nextInt() తర్వాత డైరెక్ట్ గా nextLine() వాడితే టెక్స్ట్ అసలు చదవదు. మధ్యలో ఒక డమ్మీ nextLine() కచ్చితంగా ఉండాలి.',
      'పేరు అడగడానికి next() వాడటం: scanner.next() వాడితే కేవలం మొదటి పదం మాత్రమే తీసుకుంటుంది (ఉదా: Balaji Nayak అని ఇస్తే Balaji మాత్రమే తీసుకుంటుంది). కాబట్టి పూర్తి పేర్ల కోసం scanner.nextLine() వాడాలి.',
      'లూప్ లోపల scanner.close() చేయడం: scanner.close() చేస్తే అది System.in ని కూడా క్లోజ్ చేస్తుంది. మళ్ళీ ఆ ప్రోగ్రామ్ రన్ అవుతున్నంత సేపు కీబోర్డ్ నుంచి ఎలాంటి డేటా తీసుకోలేరు. కాబట్టి ప్రోగ్రామ్ చివర్లోనే క్లోజ్ చేయాలి.'
    ],
    challenge: `// Coding Challenge:
// ఒక సింపుల్ ఇంట్రెస్ట్ (వడ్డీ) క్యాలిక్యులేటర్ రాయండి. యూజర్ నుంచి ఈ కిందవి అడగండి:
// 1. అసలు ఎంత (Principal) - double
// 2. వడ్డీ రేటు ఎంత (Rate) - double
// 3. ఎన్ని సంవత్సరాలు (Time) - int
// ఫార్ములా: SI = (P * R * T) / 100
// వడ్డీ ఎంత అయ్యిందో, టోటల్ ఎంత కట్టాలో ప్రింట్ చేయండి.

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        // TODO: లాజిక్ రాయండి
        
        input.close();
    }
}`,
    faq: [
      {
        q: 'scanner.close() కచ్చితంగా రాయాలా? రాయకపోతే ఏమవుతుంది?',
        a: 'రాయకపోతే జావా ఎర్రర్ ఏమీ ఇవ్వదు, కానీ మెమరీ లీక్ (Resource leak) అయ్యే ఛాన్స్ ఉందని వార్నింగ్ ఇస్తుంది. సేఫ్ సైడ్ క్లోజ్ చేయడం మంచి అలవాటు.'
      },
      {
        q: 'next() కి nextLine() కి మెయిన్ డిఫరెన్స్ ఏంటి?',
        a: '"next()" స్పేస్ రాగానే చదవడం ఆపేస్తుంది. "nextLine()" మనం Enter కీ నొక్కేవరకు లైన్ మొత్తాన్ని చదువుతుంది.'
      }
    ],
    recap: [
      'యూజర్ నుంచి కీబోర్డ్ ద్వారా డేటా తీసుకోవడానికి java.util.Scanner వాడతాం.',
      'లైన్ మొత్తం చదవాలంటే nextLine(), నంబర్స్ కి nextInt(), డెసిమల్స్ కి nextDouble().',
      'నంబర్స్ చదివాక టెక్స్ట్ చదవాలంటే, మధ్యలో బఫర్ ని క్లీన్ చేయడానికి ఒక డమ్మీ nextLine() వాడాలి.',
      'పని అయిపోయాక scanner.close() చేయాలి.'
    ]
  },

  // ==========================================
  // CHAPTER 13: Formatted Output with printf() & Math Library
  // ==========================================
  {
    num: 13,
    phaseId: 'phase3',
    phaseTitle: 'Phase 3: Operators and Input',
    slug: '13-java-formatted-output-printf-and-math',
    title: 'Formatted Output with printf() & Math Utilities (తెలుగులో)',
    badge: '13. printf() & Math Library',
    subtopics: 'System.out.printf() · String.format() · Format Specifiers (%d, %f, %.2f, %s, %-15s) · java.lang.Math Library (sqrt, pow, abs, max, min, round, random)',
    readTime: '15 min read',
    intro: 'ప్రింట్ చేసేటప్పుడు టేబుల్స్ లాగా నీట్ గా ఎలా ప్రింట్ చేయాలి? బిల్ అమౌంట్స్ కి కరెక్ట్ గా 2 డెసిమల్స్ వచ్చేలా (printf) ఎలా చేయాలి? మరియు మ్యాథ్స్ కి సంబంధించిన స్క్వేర్ రూట్స్, పవర్స్ (Math Library) జావాలో ఎలా వాడుకోవాలో చూద్దాం.',
    theorySections: [
      {
        heading: '1. నీట్ గా ప్రింట్ చేయడానికి `System.out.printf()`',
        content: `నార్మల్ గా \`System.out.println()\` వాడితే అన్నీ వరుసగా పక్కపక్కనే వచ్చేస్తాయి. కానీ రియల్ ప్రాజెక్ట్స్ లో బిల్లింగ్ రిపోర్ట్స్, టేబుల్స్ లాంటివి నీట్ గా, ఒక లైన్ లో ప్రింట్ అవ్వాలి.

అందుకే C లాంగ్వేజ్ లో ఉన్నట్టే జావాలో కూడా \`printf()\` (print formatted) ఇచ్చారు:

\`\`\`java
System.out.printf("ఫార్మాట్ స్ట్రింగ్ %specifiers", వాల్యూ1, వాల్యూ2);
\`\`\`

### ఏ సింబల్ దేనికి?:
| సింబల్ | డేటా టైప్ | ఎగ్జాంపుల్ |
| :--- | :--- | :--- |
| **\`%d\`** | నంబర్స్ (int, long) | \`printf("%d", 100)\` -> \`100\` |
| **\`%f\`** | డెసిమల్స్ (float, double) | \`printf("%f", 3.14)\` -> \`3.140000\` |
| **\`%.2f\`** | కరెక్ట్ గా 2 డెసిమల్స్ కోసం | \`printf("%.2f", 3.14159)\` -> \`3.14\` |
| **\`%s\`** | టెక్స్ట్ (String) | \`printf("Hello %s", "Ravi")\` -> \`Hello Ravi\` |
| **\`%c\`** | ఒక అక్షరం (char) | \`printf("గ్రేడ్: %c", 'A')\` -> \`గ్రేడ్: A\` |
| **\`%n\`** | న్యూ లైన్ కి వెళ్లడానికి | \`printf("లైన్1 %n లైన్2")\` |`
      },
      {
        heading: '2. టేబుల్స్ అలైన్మెంట్ కోసం స్పేసింగ్ (Padding)',
        content: `టెక్స్ట్ ని కరెక్ట్ గా ఒక వరుసలో సెట్ చేయడానికి:

- **\`%15s\` (రైట్ అలైన్):** ఆ టెక్స్ట్ కనీసం 15 అక్షరాల ప్లేస్ తీసుకునేలా ముందు ఖాళీ స్పేస్ ఇస్తుంది.
- **\`%-15s\` (లెఫ్ట్ అలైన్):** టెక్స్ట్ ప్రింట్ చేసి, దాని తర్వాత మిగతా స్పేస్ ని కవర్ చేస్తుంది (టేబుల్స్ కి ఇది బెస్ట్).
- **\`%05d\` (జీరోలతో):** ఒకవేళ నంబర్ చిన్నదైతే, ముందు జీరోలు పెడుతుంది (ఉదా: 10 ని \`00010\` చేస్తుంది).
- **\`%,d\` (కామాలతో):** పెద్ద నంబర్స్ ని ఈజీగా చదవడానికి కామాలు పెడుతుంది (ఉదా: \`1,000,000\`).`
      },
      {
        heading: '3. జావా మ్యాథ్స్ లైబ్రరీ (`java.lang.Math`)',
        content: `మ్యాథ్స్ లో వాడే కాంప్లెక్స్ ఫార్ములాస్ అన్నీ జావాలో ముందే ఫంక్షన్స్ లాగా రాసిపెట్టారు:

| ఫంక్షన్ | ఏం చేస్తుంది? | ఎగ్జాంపుల్ |
| :--- | :--- | :--- |
| **\`Math.sqrt(x)\`** | స్క్వేర్ రూట్ కనుక్కుంటుంది. | \`Math.sqrt(16.0)\` -> \`4.0\` |
| **\`Math.pow(base, exp)\`** | పవర్ ($base^{exp}$) క్యాలిక్యులేట్ చేస్తుంది. | \`Math.pow(2, 3)\` -> \`8.0\` |
| **\`Math.abs(x)\`** | మైనస్ ఉన్నా పాజిటివ్ గానే ఇస్తుంది. | \`Math.abs(-25)\` -> \`25\` |
| **\`Math.max(a, b)\`** | రెండింటిలో పెద్దది ఇస్తుంది. | \`Math.max(10, 20)\` -> \`20\` |
| **\`Math.min(a, b)\`** | రెండింటిలో చిన్నది ఇస్తుంది. | \`Math.min(10, 20)\` -> \`10\` |
| **\`Math.round(x)\`** | దగ్గరలో ఉన్న నంబర్ కి రౌండ్ చేస్తుంది. | \`Math.round(4.6)\` -> \`5\` |
| **\`Math.random()\`** | 0.0 నుంచి 1.0 లోపు రాండమ్ గా ఒక డెసిమల్ ఇస్తుంది. | డైస్ రోల్స్, లాటరీ యాప్స్ కి వాడతారు. |`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // 1. printf తో నీట్ గా టేబుల్ ఫార్మాట్ చేయడం
        String productName = "MacBook Pro M3";
        int stockQuantity  = 42;
        double unitPrice   = 199999.956;

        System.out.println("--- టేబుల్ ఫార్మాటింగ్ ---");
        System.out.printf("%-20s %-10s %-15s%n", "ఐటమ్ పేరు", "క్వాంటిటీ", "ధర (INR)");
        System.out.println("--------------------------------------------------");
        System.out.printf("%-20s %-10d ₹%,.2f%n", productName, stockQuantity, unitPrice);
        System.out.printf("%-20s %-10d ₹%,.2f%n", "Magic Mouse", 120, 8500.00);
        System.out.printf("%-20s %-10d ₹%,.2f%n", "USB-C Adapter", 300, 1900.50);

        // 2. మ్యాథ్స్ లైబ్రరీ ఫంక్షన్స్
        System.out.println("\n--- Math Utilities ---");
        System.out.println("144 కి స్క్వేర్ రూట్  : " + Math.sqrt(144));
        System.out.println("2 పవర్ 8 (2^8)    : " + Math.pow(2, 8));
        System.out.println("-50.5 ని పాజిటివ్ చేస్తే : " + Math.abs(-50.5));
        System.out.println("120, 85 లో పెద్దది  : " + Math.max(120, 85));
        System.out.println("99.6 ని రౌండ్ చేస్తే : " + Math.round(99.6));

        // 3. 1 నుంచి 6 వరకు రాండమ్ నంబర్ (డైస్) జనరేట్ చేయడం
        int diceRoll = (int)(Math.random() * 6) + 1;
        System.out.println("రాండమ్ గా డైస్ వేశారు: " + diceRoll);
    }
}`,
    output: `--- టేబుల్ ఫార్మాటింగ్ ---
ఐటమ్ పేరు               క్వాంటిటీ      ధర (INR)       
--------------------------------------------------
MacBook Pro M3       42         ₹199,999.96
Magic Mouse          120        ₹8,500.00
USB-C Adapter        300        ₹1,900.50

--- Math Utilities ---
144 కి స్క్వేర్ రూట్  : 12.0
2 పవర్ 8 (2^8)    : 256.0
-50.5 ని పాజిటివ్ చేస్తే : 50.5
120, 85 లో పెద్దది  : 120
99.6 ని రౌండ్ చేస్తే : 100
రాండమ్ గా డైస్ వేశారు: 4`,
    lineByLine: [
      { line: '%-20s %-10d ₹%,.2f%n', explanation: '20 క్యారెక్టర్స్ తో టెక్స్ట్ (లెఫ్ట్ అలైన్), 10 క్యారెక్టర్స్ తో నంబర్, ఆ తర్వాత కామాలతో పాటు కరెక్ట్ గా రెండు డెసిమల్స్ తో డబుల్ వాల్యూ.. అండ్ లాస్ట్ లో న్యూ లైన్ (%n).' },
      { line: 'Math.sqrt(144)', explanation: '144 కి స్క్వేర్ రూట్ (12.0) ఇస్తుంది.' },
      { line: 'Math.pow(2, 8)', explanation: '2 పవర్ 8 క్యాలిక్యులేట్ చేసి 256.0 ఇస్తుంది.' },
      { line: '(int)(Math.random() * 6) + 1', explanation: 'రాండమ్ నంబర్ 0 నుంచి స్టార్ట్ అవుతుంది కాబట్టి, 1 నుంచి 6 వరకు రావడానికి * 6 చేసి దానికి + 1 కలిపాం.' }
    ],
    practicalExample: `public class CircleGeometryEngine {
    public static void main(String[] args) {
        double radius = 7.5; // సర్కిల్ రేడియస్

        // Area = PI * r^2
        double area = Math.PI * Math.pow(radius, 2);
        
        // Circumference = 2 * PI * r
        double circumference = 2 * Math.PI * radius;

        System.out.println("=== సర్కిల్ క్యాలిక్యులేషన్స్ ===");
        System.out.printf("రేడియస్      : %.2f cm%n", radius);
        System.out.printf("ఏరియా       : %.4f sq.cm%n", area);
        System.out.printf("చుట్టుకొలత  : %.4f cm%n", circumference);
    }
}`,
    practicalOutput: `=== సర్కిల్ క్యాలిక్యులేషన్స్ ===
రేడియస్      : 7.50 cm
ఏరియా       : 176.7146 sq.cm
చుట్టుకొలత  : 47.1239 cm`,
    commonMistakes: [
      'ఫ్లోట్/డబుల్ కి %d వాడటం: డెసిమల్స్ కి పర్సంటేజ్ డి (%d) వాడితే క్రాష్ అవుతుంది. కచ్చితంగా %f లేదా %.2f వాడాలి.',
      'Math.random() 1 ఇస్తుంది అనుకోవడం: ఇది ఎప్పుడూ 0.0 నుంచి 0.99 వరకే ఇస్తుంది, 1 ని అసలు టచ్ చేయదు.',
      'printf చివరలో %n మర్చిపోవడం: println() లాగా ఇది ఆటోమాటిక్ గా కింద లైన్ కి వెళ్లదు. మీరే లాస్ట్ లో %n అని పెట్టాలి.'
    ],
    challenge: `// Coding Challenge:
// ఒక ట్రయాంగిల్ కి సంబంధించిన రెండు సైడ్స్ (a = 6.0, b = 8.0) ఉన్నాయి.
// 1. మూడో సైడ్ కనుక్కోండి c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
// 2. ఈ మూడింటినీ printf వాడి 2 డెసిమల్స్ తో ప్రింట్ చేయండి.

public class Main {
    public static void main(String[] args) {
        double a = 6.0, b = 8.0;
        // TODO: ఫార్ములా అప్లై చేసి ప్రింట్ చేయండి
        
    }
}`,
    faq: [
      {
        q: 'printf లో %n కీ, \\n కీ తేడా ఏంటి?',
        a: '"%n" అంటే ఆపరేటింగ్ సిస్టమ్ ని బట్టి ఆటోమాటిక్ గా న్యూ లైన్ తీసుకుంటుంది (Windows కి ఒకలా, Mac కి ఒకలా ఉంటుంది). కాబట్టి printf లో ఎప్పుడూ "%n" వాడటమే బెస్ట్.'
      },
      {
        q: 'Math.sqrt() కి new Math() అని ఆబ్జెక్ట్ ఎందుకు క్రియేట్ చేయలేదు?',
        a: 'ఎందుకంటే Math క్లాస్ లో ఉన్న ఫంక్షన్స్ అన్నీ "static". స్టాటిక్ ఫంక్షన్స్ కి ఆబ్జెక్ట్ అవసరం లేదు, డైరెక్ట్ గా క్లాస్ పేరుతో (Math.sqrt) కాల్ చేసేయొచ్చు.'
      }
    ],
    recap: [
      'టేబుల్స్ ని, బిల్ అమౌంట్స్ ని నీట్ గా ఫార్మాట్ చేయడానికి printf() వాడతాం.',
      '%d ఇంటిజర్స్ కి, %f డెసిమల్స్ కి (%.2f అంటే 2 డెసిమల్స్), %s టెక్స్ట్ కి, %n న్యూ లైన్ కి.',
      'java.lang.Math లైబ్రరీలో స్క్వేర్ రూట్స్, పవర్స్, రాండమ్ నంబర్స్ లాంటి ఫంక్షన్స్ అన్నీ రెడీగా ఉంటాయి.'
    ]
  },

  // ==========================================
  // CHAPTER 14: Java Basics & Input Capstone Projects
  // ==========================================
  {
    num: 14,
    phaseId: 'phase3',
    phaseTitle: 'Phase 3: Operators and Input',
    slug: '14-java-basics-and-input-capstone-projects',
    title: 'Java Basics & User Input Capstone Projects (తెలుగులో)',
    badge: '14. Capstone Projects (5)',
    subtopics: '5 Comprehensive Projects: 1. Arithmetic Calculator · 2. Simple & Compound Interest · 3. Geometry Engine · 4. Unit Converter · 5. Supermarket POS Billing',
    readTime: '20 min read',
    intro: 'ఇప్పటివరకు Phase 1, 2, మరియు 3 లో నేర్చుకున్న కాన్సెప్ట్స్ (Variables, Operators, Scanner, Math, printf) అన్నీ కవర్ అయ్యేలా ఒక 5 రియల్ టైమ్ కన్సోల్ యాప్స్ (Projects) ని ఈ చాప్టర్ లో బిల్డ్ చేద్దాం.',
    theorySections: [
      {
        heading: '1. క్యాప్ స్టోన్ ప్రాజెక్ట్స్ (Capstone Projects) ఓవర్ వ్యూ',
        content: `ఈ చాప్టర్ లో మనం కింద చెప్పిన 5 ఇండస్ట్రీ-స్టాండర్డ్ ప్రాజెక్ట్స్ ని డెవలప్ చేయబోతున్నాం:
1. **Phase 1 (Basics):** మెయిన్ ఫంక్షన్, కోడ్ స్ట్రక్చర్.
2. **Phase 2 (Variables):** డేటా టైప్స్ (int, double), ఫైనల్ కాన్స్టంట్స్.
3. **Phase 3 (Operators & Input):** యూజర్ నుంచి డేటా తీసుకోవడం, మ్యాథ్స్ చేయడం, రిజల్ట్ ని నీట్ గా ప్రింట్ చేయడం.

### ఈ 5 ప్రాజెక్ట్స్ ఇవే:
- **Project 1:** మ్యాథ్స్ అండ్ స్టాటిస్టిక్స్ క్యాలిక్యులేటర్
- **Project 2:** బ్యాంక్ సింపుల్ & కాంపౌండ్ ఇంట్రెస్ట్ క్యాలిక్యులేటర్
- **Project 3:** జామెట్రీ (సర్కిల్, స్పియర్) క్యాలిక్యులేటర్
- **Project 4:** టెంపరేచర్, స్పీడ్ యూనిట్ కన్వర్టర్
- **Project 5:** సూపర్ మార్కెట్ బిల్లింగ్ రిపోర్ట్ జనరేటర్`
      }
    ],
    codeExample: `// ప్రాజెక్ట్ 1: మ్యాథ్స్ అండ్ స్టాటిస్టిక్స్ క్యాలిక్యులేటర్
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("==========================================");
        System.out.println("   ప్రాజెక్ట్ 1: మ్యాథ్స్ ఇంజిన్    ");
        System.out.println("==========================================");

        System.out.print("మొదటి నంబర్ ఇవ్వండి (A): ");
        double numA = input.nextDouble();

        System.out.print("రెండవ నంబర్ ఇవ్వండి (B): ");
        double numB = input.nextDouble();

        // క్యాలిక్యులేషన్స్
        double sum        = numA + numB;
        double difference = numA - numB;
        double product    = numA * numB;
        // డివైడ్ చేసేటప్పుడు జీరో ఎర్రర్ రాకుండా టెర్నరీ వాడాం
        double quotient   = (numB != 0) ? (numA / numB) : 0.0;
        double remainder  = (numB != 0) ? (numA % numB) : 0.0;
        double average    = sum / 2.0;
        double maxNum     = Math.max(numA, numB);
        double minNum     = Math.min(numA, numB);
        double powerAtoB  = Math.pow(numA, numB);

        System.out.println("\n--- రిజల్ట్స్ ---");
        System.out.printf("ఎడిషన్ (A + B)          : %.2f%n", sum);
        System.out.printf("సబ్ట్రాక్షన్ (A - B)   : %.2f%n", difference);
        System.out.printf("మల్టిప్లికేషన్ (A * B)   : %.2f%n", product);
        if (numB != 0) {
            System.out.printf("డివిజన్ (A / B)         : %.4f%n", quotient);
            System.out.printf("రిమైండర్ (A %% B)        : %.2f%n", remainder);
        } else {
            System.out.println("డివిజన్ / మోడ్యులస్       : చేయలేము (సున్నాతో డివైడ్ చేయకూడదు)");
        }
        System.out.printf("యావరేజ్                 : %.2f%n", average);
        System.out.printf("పెద్ద నంబర్               : %.2f%n", maxNum);
        System.out.printf("చిన్న నంబర్               : %.2f%n", minNum);
        System.out.printf("పవర్ (A ^ B)             : %.2f%n", powerAtoB);

        input.close();
    }
}`,
    output: `==========================================
   ప్రాజెక్ట్ 1: మ్యాథ్స్ ఇంజిన్    
==========================================
మొదటి నంబర్ ఇవ్వండి (A): 25.0
రెండవ నంబర్ ఇవ్వండి (B): 4.0

--- రిజల్ట్స్ ---
ఎడిషన్ (A + B)          : 29.00
సబ్ట్రాక్షన్ (A - B)   : 21.00
మల్టిప్లికేషన్ (A * B)   : 100.00
డివిజన్ (A / B)         : 6.2500
రిమైండర్ (A % B)        : 1.00
యావరేజ్                 : 14.50
పెద్ద నంబర్               : 25.00
చిన్న నంబర్               : 4.00
పవర్ (A ^ B)             : 390625.00`,
    lineByLine: [
      { line: 'double quotient = (numB != 0) ? (numA / numB) : 0.0;', explanation: 'యూజర్ జీరో ఇస్తే యాప్ క్రాష్ అవ్వకుండా టెర్నరీ ఆపరేటర్ వాడి సేఫ్ గా చెక్ చేసాం.' },
      { line: 'Math.pow(numA, numB)', explanation: 'A పవర్ B క్యాలిక్యులేట్ చేస్తుంది.' },
      { line: 'printf("డివిజన్ (A / B) : %.4f%n", quotient)', explanation: 'రిజల్ట్ లో కరెక్ట్ గా 4 డెసిమల్స్ వచ్చేలా printf వాడాం.' }
    ],
    practicalExample: `// ప్రాజెక్ట్ 2: బ్యాంక్ ఇంట్రెస్ట్ క్యాలిక్యులేటర్ (వడ్డీ లెక్కలు)
import java.util.Scanner;

public class FinancialInterestCalculator {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("==========================================");
        System.out.println("   ప్రాజెక్ట్ 2: బ్యాంక్ ఇంట్రెస్ట్ క్యాలిక్యులేటర్    ");
        System.out.println("==========================================");

        System.out.print("అసలు ఎంత వేశారు (₹): ");
        double principal = input.nextDouble();

        System.out.print("వడ్డీ రేటు ఎంత (%): ");
        double annualRate = input.nextDouble();

        System.out.print("ఎన్ని సంవత్సరాలు?: ");
        double timeYears = input.nextDouble();

        // 1. సాధారణ వడ్డీ (Simple Interest): SI = (P * R * T) / 100
        double simpleInterest = (principal * annualRate * timeYears) / 100.0;
        double simpleTotal = principal + simpleInterest;

        // 2. చక్ర వడ్డీ (Compound Interest): A = P * (1 + r/100)^t
        double compoundTotal = principal * Math.pow(1 + (annualRate / 100.0), timeYears);
        double compoundInterest = compoundTotal - principal;

        System.out.println("\n========== ఫైనల్ రిపోర్ట్ ==========");
        System.out.printf("వేసిన అసలు          : ₹%,.2f%n", principal);
        System.out.printf("వడ్డీ రేటు            : %.2f%%%n", annualRate);
        System.out.printf("టైమ్                : %.1f Years%n", timeYears);
        System.out.println("------------------------------------------------");
        System.out.printf("సాధారణ వడ్డీ          : ₹%,.2f%n", simpleInterest);
        System.out.printf("టోటల్ (సాధారణ వడ్డీ)   : ₹%,.2f%n", simpleTotal);
        System.out.println("------------------------------------------------");
        System.out.printf("చక్ర వడ్డీ             : ₹%,.2f%n", compoundInterest);
        System.out.printf("టోటల్ (చక్ర వడ్డీ)      : ₹%,.2f%n", compoundTotal);
        System.out.printf("రెండింటి మధ్య తేడా లాభం : ₹%,.2f%n", (compoundTotal - simpleTotal));
        System.out.println("================================================");

        input.close();
    }
}`,
    practicalOutput: `==========================================
   ప్రాజెక్ట్ 2: బ్యాంక్ ఇంట్రెస్ట్ క్యాలిక్యులేటర్    
==========================================
అసలు ఎంత వేశారు (₹): 100000.00
వడ్డీ రేటు ఎంత (%): 8.5
ఎన్ని సంవత్సరాలు?: 5

========== ఫైనల్ రిపోర్ట్ ==========
వేసిన అసలు          : ₹100,000.00
వడ్డీ రేటు            : 8.50%
టైమ్                : 5.0 Years
------------------------------------------------
సాధారణ వడ్డీ          : ₹42,500.00
టోటల్ (సాధారణ వడ్డీ)   : ₹142,500.00
------------------------------------------------
చక్ర వడ్డీ             : ₹50,365.67
టోటల్ (చక్ర వడ్డీ)      : ₹150,365.67
రెండింటి మధ్య తేడా లాభం : ₹7,865.67
================================================`,
    commonMistakes: [
      'పర్సంటేజ్ ఫార్ములాలో 100.0 కి బదులు 100 వాడటం: ఇంటిజర్ తో డివైడ్ చేస్తే కొన్నిసార్లు డెసిమల్స్ కట్ అయిపోయి రిజల్ట్ తప్పు వస్తుంది. ఎప్పుడూ 100.0 వాడాలి.',
      'కాంపౌండ్ ఇంట్రెస్ట్ కి రాంగ్ ఫార్ములా: ఫార్ములా టోటల్ అమౌంట్ (A) ని ఇస్తుంది, వడ్డీని మాత్రమే కాదు. వడ్డీ కావాలంటే టోటల్ లోంచి అసలు (Principal) ని తీసేయాలి.',
      'మనీ కి నార్మల్ ప్రింట్ వాడటం: డబ్బుల లెక్కల్లో "150365.67184" అని ప్రింట్ అయితే చూడ్డానికి బాగోదు, కన్ఫ్యూజ్ అవుతారు. అందుకే "₹%,.2f" వాడితే కామాలతో కరెక్ట్ గా వస్తుంది.'
    ],
    challenge: `// Coding Challenge (ప్రాజెక్ట్ 5: సూపర్ మార్కెట్ POS బిల్లింగ్):
// యూజర్ నుంచి కింది డీటెయిల్స్ అడిగి బిల్ జనరేట్ చేయండి:
// 1. కస్టమర్ పేరు (String)
// 2. ఐటమ్ 1: పేరు, రేటు, క్వాంటిటీ
// 3. ఐటమ్ 2: పేరు, రేటు, క్వాంటిటీ
// క్యాలిక్యులేట్ చేయాల్సింది:
// - సబ్ టోటల్ = (ఐటమ్ 1 టోటల్ + ఐటమ్ 2 టోటల్)
// - డిస్కౌంట్ (సబ్ టోటల్ 2000 దాటితే 10% డిస్కౌంట్, లేకపోతే 0%)
// - టాక్స్ (డిస్కౌంట్ పోగా మిగిలిన దాని మీద 18% GST)
// - ఫైనల్ గా కట్టాల్సిన అమౌంట్
// System.out.printf() వాడి రిసిప్ట్ ప్రింట్ చేయండి.

public class Main {
    public static void main(String[] args) {
        // TODO: POS బిల్లింగ్ ప్రోగ్రామ్ రాయండి
        
    }
}`,
    faq: [
      {
        q: 'ఈ ప్రాజెక్ట్స్ ని నేను డైరెక్ట్ గా ఎలా రన్ చేయొచ్చు?',
        a: 'కోడ్ కింద ఉన్న "▶ Run in Compiler" బటన్ నొక్కితే చాలు! మన ఆన్లైన్ జావా కంపైలర్ లోకి కోడ్ మొత్తం వెళ్ళిపోయి డైరెక్ట్ గా రన్ అవుతుంది.'
      },
      {
        q: 'వడ్డీ క్యాలిక్యులేట్ చేయడానికి లూప్స్ వాడొచ్చు కదా, Math.pow() ఎందుకు?',
        a: 'Math.pow() వాడితే కోడ్ చూడటానికి సింపుల్ గా ఉంటుంది, పైగా ఇది లూప్స్ కంటే చాలా ఫాస్ట్ గా పనిచేస్తుంది (కంప్యూటర్ హార్డ్ వేర్ ని వాడుకుంటుంది కాబట్టి).'
      }
    ],
    recap: [
      'ప్రాజెక్ట్ 1: స్కూల్ మ్యాథ్స్ మొత్తం కవర్ అయ్యేలా ఒక క్యాలిక్యులేటర్ చేసాం.',
      'ప్రాజెక్ట్ 2: Math.pow() వాడుకుని బ్యాంక్ లో వాడే వడ్డీ లెక్కల యాప్ ని తయారుచేసాం.',
      'ఈ 5 ప్రాజెక్ట్స్ తో మీరు జావా లోని Phase 1, Phase 2, Phase 3 ని పూర్తిగా మాస్టర్ చేసారు!'
    ]
  }
];
