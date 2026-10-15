// Phase 4: Conditions & Decision Making (Chapters 15 to 18)
// Exhaustive conceptual theory, ASCII flowcharts, modern switch expressions (Java 14+), String equals() mechanics, and runnable code examples.

module.exports = [
  // ==========================================
  // CHAPTER 15: If, If-Else, Else-If & Nested Conditions
  // ==========================================
  {
    num: 15,
    phaseId: 'phase4',
    phaseTitle: 'Phase 4: Conditions & Branching',
    slug: '15-java-if-else-and-nested-conditions',
    title: 'Java Conditional Statements: if, if-else, else-if & Nested if (తెలుగులో)',
    badge: '15. if-else & Nested Branching',
    subtopics: 'Why Conditions are Needed · if Statement · if-else · else-if Ladder · Nested if · Combining Logical Conditions (&&, ||, !)',
    readTime: '16 min read',
    intro: 'జావా ప్రోగ్రామ్ లో డెసిషన్స్ (నిర్ణయాలు) ఎలా తీసుకోవాలి? ఒక కండిషన్ పాస్ అయితే ఒకలా, ఫెయిల్ అయితే ఇంకోలా ప్రోగ్రామ్ ని ఎలా రన్ చేయాలి? if, else, else-if మరియు ఒక if లోపల ఇంకో if (nested) ఎలా రాయాలో ఈ చాప్టర్ లో డీటెయిల్డ్ గా నేర్చుకుందాం.',
    theorySections: [
      {
        heading: '1. అసలు Conditions ఎందుకు కావాలి?',
        content: `కంప్యూటర్ ఎప్పుడూ ఒక ఆర్డర్ లో (లైన్ 1, 2, 3...) కోడ్ ని రన్ చేసుకుంటూ వెళ్తుంది.
        
కానీ రియల్ వరల్డ్ యాప్స్ లో అలా కుదరదు. మనం కొన్ని కండిషన్స్ ని బట్టి నిర్ణయాలు తీసుకోవాల్సి ఉంటుంది:
- యూజర్ పాస్వర్డ్ కరెక్ట్ గా ఇస్తేనే డాష్ బోర్డ్ కి పంపించాలి, *లేదంటే* లాక్ చేయాలి.
- అకౌంట్ లో బ్యాలెన్స్ ఉంటేనే డబ్బులు డ్రా చేయనివ్వాలి, *లేదంటే* "బ్యాలెన్స్ లేదు" అని చెప్పాలి.
- ఆర్డర్ 1000 రూపాయలు దాటితే ఫ్రీ షిప్పింగ్ ఇవ్వాలి.

**Conditional Statements** వాడి ఇలాంటి డెసిషన్స్ అన్నీ ప్రోగ్రామ్ తో చేయించొచ్చు.

\`\`\`
                     [ కండిషన్ స్టార్ట్ ]
                                |
                                v
                      < పాస్వర్డ్ కరెక్టా? >
                          /          \\
                   (అవును)/            \\(కాదు)
                        v              v
                 [ లాగిన్ సక్సెస్ ]    [ ఎర్రర్ చూపించు ]
                        \\              /
                         \\            /
                          v          v
                       [ ప్రోగ్రామ్ కంటిన్యూ ]
\`\`\``
      },
      {
        heading: '2. జావాలో ఉన్న 4 రకాల if కండిషన్స్',
        content: `### 1. సింపుల్ \`if\` Statement
లోపల ఉన్న కండిషన్ **\`true\`** (నిజం) అయితేనే ఆ బ్లాక్ లో ఉన్న కోడ్ రన్ అవుతుంది:
\`\`\`java
if (age >= 18) {
    System.out.println("మీకు ఓటు హక్కు ఉంది.");
}
\`\`\`

### 2. \`if-else\` Statement
ఒకవేళ నిజమైతే \`if\` లోపల ఉన్నది రన్ అవుతుంది, కాకపోతే (లేదంటే) \`else\` లోపల ఉన్నది రన్ అవుతుంది:
\`\`\`java
if (balance >= withdrawAmount) {
    balance -= withdrawAmount;
    System.out.println("డబ్బులు డ్రా అయ్యాయి.");
} else {
    System.out.println("ఎర్రర్: మీ అకౌంట్ లో బ్యాలెన్స్ లేదు!");
}
\`\`\`

### 3. \`else-if\` Ladder (చాలా ఆప్షన్స్ ఉన్నప్పుడు)
పై నుంచి కిందకు ఒక్కో కండిషన్ చెక్ చేసుకుంటూ వస్తుంది. ఏ కండిషన్ అయితే ఫస్ట్ \`true\` అవుతుందో, దాన్ని రన్ చేసి.. ఇక మిగతావన్నీ వదిలేస్తుంది (స్కిప్ చేస్తుంది):
\`\`\`java
if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else if (score >= 70) {
    grade = 'C';
} else {
    grade = 'F'; // పైవేమీ కాకపోతే ఇది రన్ అవుతుంది
}
\`\`\`

### 4. Nested \`if\` (if లోపల ఇంకో if)
ఒక కండిషన్ పాస్ అయ్యాక, దానిలోపల ఇంకో కండిషన్ చెక్ చేయాల్సి వస్తే దీన్ని వాడతాం:
\`\`\`java
if (hasAccount) { // అకౌంట్ ఉందా?
    if (isAccountActive) { // ఉంటే.. అది యాక్టివ్ గా ఉందా?
        System.out.println("బ్యాంకింగ్ యాప్ లోకి స్వాగతం.");
    } else {
        System.out.println("మీ అకౌంట్ ఆగిపోయింది, బ్రాంచ్ కి వెళ్ళండి.");
    }
} else {
    System.out.println("దయచేసి కొత్త అకౌంట్ క్రియేట్ చేసుకోండి.");
}
\`\`\``
      },
      {
        heading: '3. లాజికల్ ఆపరేటర్స్ వాడి మల్టిపుల్ కండిషన్స్ కలపడం',
        content: `మనం లాజికల్ ఆపరేటర్స్ (AND, OR) వాడి ఒకే \`if\` లోపల చాలా కండిషన్స్ రాసుకోవచ్చు:

- **Logical AND (\`&&\`):** రాసిన కండిషన్స్ అన్నీ పాస్ అవ్వాలి.
- **Logical OR (\`||\`):** రాసిన వాటిలో ఏ ఒక్కటి పాస్ అయినా చాలు.

\`\`\`java
// బ్యాంక్ లోన్ రావాలంటే కండిషన్స్:
// (వయసు 21 నుంచి 60 మధ్యలో ఉండాలి) మరియు (జీతం 5 లక్షల కన్నా ఎక్కువైనా ఉండాలి లేదా సిబిల్ స్కోర్ 750 కన్నా ఎక్కువైనా ఉండాలి)
if ((age >= 21 && age <= 60) && (annualIncome >= 500000 || cibilScore >= 750)) {
    System.out.println("మీ లోన్ అప్రూవ్ అయ్యింది!");
}
\`\`\``
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        int studentMarks = 84;
        boolean hasDisciplinaryAction = false;

        System.out.println("=== స్టూడెంట్ గ్రేడింగ్ & స్కాలర్ షిప్ ఇంజిన్ ===");

        // 1. గ్రేడ్ క్యాలిక్యులేట్ చేయడానికి else-if 
        char finalGrade;
        if (studentMarks >= 90) {
            finalGrade = 'A';
        } else if (studentMarks >= 80) {
            finalGrade = 'B';
        } else if (studentMarks >= 70) {
            finalGrade = 'C';
        } else if (studentMarks >= 50) {
            finalGrade = 'D';
        } else {
            finalGrade = 'F';
        }

        System.out.println("స్టూడెంట్ మార్క్స్ : " + studentMarks);
        System.out.println("వచ్చిన గ్రేడ్      : " + finalGrade);

        // 2. స్కాలర్ షిప్ ఇవ్వాలా వద్దా (Nested if & Logical Operators)
        if (finalGrade == 'A' || finalGrade == 'B') {
            if (!hasDisciplinaryAction) {
                System.out.println("స్కాలర్ షిప్       : ELIGIBLE (₹25,000 మంజూరయ్యాయి)");
            } else {
                System.out.println("స్కాలర్ షిప్       : DISQUALIFIED (కాలేజ్ రూల్స్ బ్రేక్ చేసినందుకు)");
            }
        } else {
            System.out.println("స్కాలర్ షిప్       : NOT ELIGIBLE (కనీసం B గ్రేడ్ రావాలి)");
        }
    }
}`,
    output: `=== స్టూడెంట్ గ్రేడింగ్ & స్కాలర్ షిప్ ఇంజిన్ ===
స్టూడెంట్ మార్క్స్ : 84
వచ్చిన గ్రేడ్      : B
స్కాలర్ షిప్       : ELIGIBLE (₹25,000 మంజూరయ్యాయి)`,
    lineByLine: [
      { line: 'else if (studentMarks >= 80)', explanation: 'ఫస్ట్ 90 చెక్ చేసింది, అది ఫెయిల్ అయ్యింది కాబట్టి నెక్స్ట్ దీనికి వచ్చింది (84 >= 80) కాబట్టి ఇది పాస్ అయ్యి B గ్రేడ్ అసైన్ అయ్యింది.' },
      { line: 'if (finalGrade == \'A\' || finalGrade == \'B\')', explanation: 'A లేదా B గ్రేడ్.. ఈ రెండిట్లో ఏది వచ్చినా ఈ కండిషన్ పాస్ అవుతుంది.' },
      { line: 'if (!hasDisciplinaryAction)', explanation: '! వాడి రివర్స్ చేసాం. స్టూడెంట్ మీద ఎలాంటి రిమార్క్ లేకపోతేనే ఇది పాస్ అవుతుంది.' }
    ],
    practicalExample: `public class ATMWithdrawalSecurity {
    public static void main(String[] args) {
        int enteredPin     = 4321;
        int registeredPin  = 4321;
        double balance     = 10000.00;
        double withdrawAmt = 3500.00;
        boolean isCardActive = true;

        System.out.println("--- సెక్యూర్ ATM ట్రాన్సాక్షన్ ---");

        // Step 1: PIN కరెక్టా కాదా?
        if (enteredPin == registeredPin) {
            // Step 2: కార్డ్ యాక్టివ్ గా ఉందా?
            if (isCardActive) {
                // Step 3: అకౌంట్ లో తగినంత బ్యాలెన్స్ ఉందా?
                if (withdrawAmt <= balance) {
                    balance -= withdrawAmt;
                    System.out.println("✓ తీసుకోండి: ₹" + withdrawAmt);
                    System.out.println("✓ మిగిలిన బ్యాలెన్స్: ₹" + balance);
                } else {
                    System.out.println("✗ ఫెయిల్: మీ అకౌంట్ లో తగినంత బ్యాలెన్స్ లేదు!");
                }
            } else {
                System.out.println("✗ ఫెయిల్: మీ కార్డ్ బ్లాక్ అయ్యింది!");
            }
        } else {
            System.out.println("✗ సెక్యూరిటీ ఎర్రర్: రాంగ్ PIN ఎంటర్ చేసారు!");
        }
    }
}`,
    practicalOutput: `--- సెక్యూర్ ATM ట్రాన్సాక్షన్ ---
✓ తీసుకోండి: ₹3500.0
✓ మిగిలిన బ్యాలెన్స్: ₹6500.0`,
    commonMistakes: [
      'if తర్వాత సెమికోలన్ (;) పెట్టడం: "if (x > 10);" ఇలా రాస్తే, ఆ కండిషన్ తో సంబంధం లేకుండా కింద ఉన్న కోడ్ ఎప్పుడూ రన్ అవుతూనే ఉంటుంది (పెద్ద బగ్).',
      'కంపేర్ చేయడానికి (==) బదులు (=) వాడటం: "if (isStudent = true)" అని రాస్తే జావా దాన్ని ఎర్రర్ కింద తీసుకోదు, అదొక అసైన్మెంట్ లాగా తీసుకుని ఎప్పుడూ ట్రూ చేసేస్తుంది.',
      'else-if ఆర్డర్ తప్పుగా రాయడం: "if (score >= 60) ... else if (score >= 90)" అని రాస్తే, 95 వచ్చినోడికి కూడా 60 లాజిక్ కే పనిచేస్తుంది. ఎప్పుడూ కండిషన్స్ పై నుంచి కిందకి (పెద్ద నుంచి చిన్నకి) రాయాలి.'
    ],
    challenge: `// Coding Challenge:
// ఒక కరెంట్ బిల్ క్యాలిక్యులేటర్ రాయండి. రూల్స్ ఇవి:
// - 100 యూనిట్స్ వరకు: యూనిట్ కి ₹3.00
// - 101 నుంచి 200 యూనిట్స్ వరకు: యూనిట్ కి ₹4.50
// - 200 పైన దాటితే: యూనిట్ కి ₹6.00
// మీరు వాడిన యూనిట్స్ 150 (units = 150) అయితే, బిల్ ఎంత వచ్చిందో ప్రింట్ చేయండి.

public class Main {
    public static void main(String[] args) {
        int units = 150;
        // TODO: else-if లాడర్ వాడి లాజిక్ రాయండి
        
    }
}`,
    faq: [
      {
        q: 'if కింద ఒకే లైన్ రాస్తే కర్లీ బ్రాకెట్స్ {} పెట్టాల్సిన అవసరం లేదా?',
        a: 'టెక్నికల్ గా అవసరం లేదు కానీ, ప్రొఫెషనల్ గా కోడ్ రాసేటప్పుడు ఎప్పుడూ {} పెట్టాలి. ఒకవేళ పెట్టకపోతే రేపు పొద్దున్న ఎవరైనా వచ్చి రెండో లైన్ రాస్తే అది ఫెయిల్ అయ్యే ప్రమాదం ఉంది (ఆపిల్ కంపెనీకి ఇలాంటి బగ్ వల్లే ఒక పెద్ద సెక్యూరిటీ ఇష్యూ వచ్చింది).'
      },
      {
        q: 'చాలా if లు రాయడానికి, ఒకే else-if రాయడానికి డిఫరెన్స్ ఏంటి?',
        a: 'చాలా if లు రాస్తే ప్రోగ్రామ్ ప్రతి కండిషన్ ని చెక్ చేసుకుంటూ టైమ్ వేస్ట్ చేస్తుంది. else-if వాడితే ఎక్కడ కండిషన్ పాస్ అవుతుందో అక్కడే ఆగిపోయి, కిందకి వెళ్లకుండా మెమరీని సేవ్ చేస్తుంది.'
      }
    ],
    recap: [
      'ప్రోగ్రామ్ ఫ్లో ని కంట్రోల్ చేయడానికి if, if-else, else-if వాడతాం.',
      'చాలా కండిషన్స్ చెక్ చేయాలి అనుకుంటే Nested if వాడతాం.',
      'else-if రాసేటప్పుడు ఎప్పుడూ హైయెస్ట్ నుంచి లోయెస్ట్ కి (order) రాయాలి.',
      'if రాసాక కచ్చితంగా కర్లీ బ్రాకెట్స్ {} వాడటం మంచి అలవాటు.'
    ]
  },

  // ==========================================
  // CHAPTER 16: Ternary Conditions & String Comparisons
  // ==========================================
  {
    num: 16,
    phaseId: 'phase4',
    phaseTitle: 'Phase 4: Conditions & Branching',
    slug: '16-java-ternary-operator-and-string-comparison',
    title: 'Ternary Expressions & String Comparisons (.equals vs ==) (తెలుగులో)',
    badge: '16. Ternary & String Equality',
    subtopics: 'Ternary Operator (? :) · Nested Ternary Expressions · String Equality (.equals vs ==) · equalsIgnoreCase() · String Constant Pool Mechanics · Null-Safe Comparisons',
    readTime: '15 min read',
    intro: 'if-else ని ఒకే లైన్ లో షార్ట్ కట్ లో (Ternary) ఎలా రాయాలి? మరియు జావాలో స్ట్రింగ్స్ ని కంపేర్ చేయడానికి `==` ఎందుకు వాడకూడదు? దానికి బదులుగా `.equals()` ఎలా వాడాలి? Null వచ్చినప్పుడు యాప్ క్రాష్ అవ్వకుండా ఎలా చూసుకోవాలో నేర్చుకుందాం.',
    theorySections: [
      {
        heading: '1. Ternary Operator (`? :`) అంటే ఏంటి?',
        content: `**Ternary Operator** అనేది \`if-else\` కి ఒక షార్ట్ కట్. 4 లైన్లలో రాసే కోడ్ ని ఒకే లైన్ లో రాసి, ఆ వచ్చిన వాల్యూ ని డైరెక్ట్ గా ఒక వేరియబుల్ కి ఇచ్చేయొచ్చు:

\`\`\`
వాల్యూ = (కండిషన్) ? కండిషన్ ట్రూ అయితే ఇక్కడున్నది : ఫాల్స్ అయితే ఇక్కడున్నది;
\`\`\`

\`\`\`java
int score = 75;
String status = (score >= 50) ? "PASS" : "FAIL";

int a = 20, b = 45;
int maximum = (a > b) ? a : b; // ఇక్కడ a పెద్దది కాదు కాబట్టి b ని తీసుకుంటుంది (45)
\`\`\`

### ఏది ఎప్పుడు వాడాలి?:
- **Ternary వాడాలి:** సింపుల్ గా వాల్యూస్ అసైన్ చేసేటప్పుడు ఒకే లైన్ లో ఉంటే.
- **If-Else వాడాలి:** లోపల డేటాబేస్ కాల్స్, పెద్ద పెద్ద లాజిక్స్ ఉన్నప్పుడు (ఎందుకంటే చదవడానికి ఈజీగా ఉంటుంది).`
      },
      {
        heading: '2. పెద్ద బగ్: స్ట్రింగ్స్ కి `==` వాడకూడదు.. ఎందుకు?',
        content: `జావాలో చాలామంది డెవలపర్స్ చేసే పెద్ద తప్పు.. రెండు స్ట్రింగ్స్ వాల్యూస్ ఒకటే ఉన్నాయా లేదా అని చెక్ చేయడానికి \`==\` వాడటం.

\`\`\`
+-----------------------------------------------------------------------------------+
|                        == vs .equals() తేడా ఏంటి?                                    |
+-----------------------------------------------------------------------------------+
|  1. == ఆపరేటర్ (అడ్రెస్ చెక్):                                                          |
|     ఇది రెండు స్ట్రింగ్స్ RAM లో ఒకే మెమరీ అడ్రెస్ లో ఉన్నాయా లేదా అని మాత్రమే చెక్ చేస్తుంది.         |
|     (లోపల ఏ అక్షరాలు ఉన్నాయో ఇది అసలు చూడదు!)                                            |
+-----------------------------------------------------------------------------------+
|  2. .equals() ఫంక్షన్ (కంటెంట్ చెక్):                                                    |
|     ఇది మెమరీతో సంబంధం లేకుండా, లోపల ఉన్న అక్షరాలని ఒక్కొక్కటిగా చెక్ చేసి కరెక్ట్ గా చెప్తుంది.     |
+-----------------------------------------------------------------------------------+
\`\`\`

### అప్పుడప్పుడు \`==\` కూడా ఎందుకు పనిచేస్తుంది? (String Pool ట్రాప్):
\`\`\`java
String s1 = "Admin";
String s2 = "Admin";
String s3 = new String("Admin");

System.out.println(s1 == s2);      // true! (ఎందుకంటే రెండూ String Pool లో ఒకే అడ్రెస్ ని షేర్ చేసుకుంటాయి)
System.out.println(s1 == s3);      // FALSE! (s3 అనేది new వాడటం వల్ల సపరేట్ గా Heap లో క్రియేట్ అయ్యింది)
System.out.println(s1.equals(s3)); // TRUE! (లోపల ఉన్న కంటెంట్ సేమ్ కదా.. అందుకే .equals() కరెక్ట్ గా పనిచేసింది)
\`\`\`

**గోల్డెన్ రూల్:** జావాలో స్ట్రింగ్స్ ని కంపేర్ చేయడానికి **ఎప్పుడూ** \`==\` వాడకండి! **కచ్చితంగా** \`.equals()\` మాత్రమే వాడాలి!`
      },
      {
        heading: '3. `.equals()` కి `.equalsIgnoreCase()` కి తేడా ఏంటి?',
        content: `| ఫంక్షన్ | అక్షరాలు (Case) పర్ఫెక్ట్ గా ఉండాలా? | ఎగ్జాంపుల్ | రిజల్ట్ |
| :--- | :--- | :--- | :--- |
| **\`str1.equals(str2)\`** | **అవును** (Strict) | \`"Java".equals("java")\` | \`false\` |
| **\`str1.equalsIgnoreCase(str2)\`** | **అవసరం లేదు** (స్మాల్/క్యాపిటల్స్ ఉన్నా ఓకే) | \`"Java".equalsIgnoreCase("java")\` | \`true\` |`
      },
      {
        heading: '4. Null వస్తే యాప్ క్రాష్ అవ్వకుండా ఎలా ఆపాలి? (Yoda Conditions)',
        content: `మీరు ఎప్పుడైనా \`userRole.equals("ADMIN")\` అని రాశారనుకోండి. ఒకవేళ ఏ కారణం చేతనైనా ఆ userRole వేరియబుల్ లోకి \`null\` వస్తే.. యాప్ వెంటనే క్రాష్ అయిపోతుంది (దీన్నే **\`NullPointerException\`** అంటారు).

### దీన్ని సాల్వ్ చేయడానికి ప్రొఫెషనల్స్ వాడే 2 ట్రిక్స్:
1. **Yoda Condition (కొటేషన్స్ లో ఉన్నది ముందు రాయడం):**
   \`\`\`java
   // ఒకవేళ userRole లో null ఉన్నా సరే యాప్ క్రాష్ అవ్వదు, సింపుల్ గా false వస్తుంది!
   if ("ADMIN".equalsIgnoreCase(userRole)) { ... }
   \`\`\`
2. **Objects.equals() వాడటం (Java 7 నుంచి):**
   \`\`\`java
   import java.util.Objects;
   if (Objects.equals(userRole, "ADMIN")) { ... }
   \`\`\``
      }
    ],
    codeExample: `import java.util.Objects;

public class Main {
    public static void main(String[] args) {
        // 1. Ternary ఆపరేటర్ 
        int userAge = 20;
        String eligibility = (userAge >= 18) ? "లైసెన్స్ కి ఎలిజిబుల్" : "ఇంకా వయసు రాలేదు";
        System.out.println("ఏజ్ చెక్: " + eligibility);

        // 2. String Equality (.equals vs ==)
        String authRole = "SUPER_ADMIN";
        String dbRole  = new String("SUPER_ADMIN");

        System.out.println("\n--- స్ట్రింగ్ కంపారిజన్ (String Comparison) ---");
        System.out.println("== వాడితే (అడ్రెస్ చెక్)     : " + (authRole == dbRole)); // false వస్తుంది
        System.out.println(".equals() వాడితే (కంటెంట్ చెక్) : " + authRole.equals(dbRole)); // true వస్తుంది

        // 3. Case-Insensitive (స్మాల్/క్యాపిటల్స్ ఇష్యూ లేకుండా)
        String inputCoupon = "save20";
        String validCoupon = "SAVE20";
        boolean isCouponValid = inputCoupon.equalsIgnoreCase(validCoupon);
        System.out.println("కూపన్ చెకింగ్ (IgnoreCase)    : " + isCouponValid);

        // 4. Null-Safe (క్రాష్ అవ్వకుండా)
        String nullableRole = null;
        // System.out.println(nullableRole.equals("ADMIN")); // ఇది రన్ చేస్తే యాప్ క్రాష్ అవుతుంది (NullPointerException)!
        boolean isSafeAdmin = "ADMIN".equalsIgnoreCase(nullableRole); // కానీ ఇది సేఫ్ గా క్రాష్ అవ్వకుండా false అని ఇస్తుంది.
        System.out.println("క్రాష్ అవ్వకుండా అడ్మిన్ చెక్ (Yoda) : " + isSafeAdmin);
    }
}`,
    output: `ఏజ్ చెక్: లైసెన్స్ కి ఎలిజిబుల్

--- స్ట్రింగ్ కంపారిజన్ (String Comparison) ---
== వాడితే (అడ్రెస్ చెక్)     : false
.equals() వాడితే (కంటెంట్ చెక్) : true
కూపన్ చెకింగ్ (IgnoreCase)    : true
క్రాష్ అవ్వకుండా అడ్మిన్ చెక్ (Yoda) : false`,
    lineByLine: [
      { line: '(userAge >= 18) ? ... : ...', explanation: 'Ternary ఆపరేటర్: 18 దాటింది కాబట్టి ఫస్ట్ వాల్యూ ని అసైన్ చేసింది.' },
      { line: 'authRole == dbRole', explanation: 'new String() వాడటం వల్ల అది సపరేట్ గా వేరే మెమరీలో స్టోర్ అయ్యింది. అందుకే అడ్రెస్ లు మ్యాచ్ అవ్వక false వచ్చింది.' },
      { line: 'authRole.equals(dbRole)', explanation: 'మెమరీలతో సంబంధం లేకుండా లోపల ఉన్న అక్షరాలు సేమ్ కాబట్టి true వచ్చింది.' },
      { line: '"ADMIN".equalsIgnoreCase(nullableRole)', explanation: 'దీన్నే యోడా (Yoda) కండిషన్ అంటారు. హార్డ్ కోడెడ్ స్ట్రింగ్ ని ముందు పెడితే యాప్ ఎప్పటికీ క్రాష్ అవ్వదు.' }
    ],
    practicalExample: `public class LoginAuthenticationService {
    public static void main(String[] args) {
        String registeredUser = "BalajiNayak";
        String enteredUsername = "balajinayak"; // యూజర్ స్మాల్ లెటర్స్ లో టైప్ చేసాడు
        String enteredPassword = "Password@2026";
        String correctPassword = "Password@2026";

        // యూజర్ నేమ్ లో క్యాపిటల్స్ ఉన్నా, స్మాల్స్ ఉన్నా ఓకే (equalsIgnoreCase) 
        // కానీ పాస్వర్డ్ మాత్రం ఎగ్జాక్ట్ గా మ్యాచ్ అవ్వాలి (equals)
        boolean isUsernameMatch = registeredUser.equalsIgnoreCase(enteredUsername);
        boolean isPasswordMatch = correctPassword.equals(enteredPassword);

        if (isUsernameMatch && isPasswordMatch) {
            System.out.println("✓ లాగిన్ సక్సెస్! వెల్కమ్, " + registeredUser);
        } else if (!isUsernameMatch) {
            System.out.println("✗ ఫెయిల్: అసలు యూజర్ నేమ్ డేటాబేస్ లో లేదు!");
        } else {
            System.out.println("✗ ఫెయిల్: మీరు తప్పు పాస్వర్డ్ ఎంటర్ చేసారు!");
        }
    }
}`,
    practicalOutput: `✓ లాగిన్ సక్సెస్! వెల్కమ్, BalajiNayak`,
    commonMistakes: [
      'స్ట్రింగ్స్ కి == వాడటం: "if (name == \"Ravi\")" అని రాస్తే, యూజర్ Scanner ద్వారా గాని, డేటాబేస్ నుంచి గాని ఆ పేరు వస్తే ఇది కచ్చితంగా ఫెయిల్ అవుతుంది. ఎప్పుడూ .equals() మాత్రమే వాడాలి.',
      '.equals() కి ముందు వేరియబుల్ పెట్టడం: "str.equals(\"text\")" వాడితే str లో null ఉన్నప్పుడు క్రాష్ అవుతుంది. రివర్స్ లో "\"text\".equals(str)" అని వాడటం మంచి అలవాటు.',
      'Ternary లోపల పెద్ద లాజిక్స్ రాయడం: Ternary అనేది వాల్యూస్ అసైన్ చేయడానికి మాత్రమే వాడాలి. లోపల ప్రింట్ స్టేట్మెంట్స్, లూప్స్ రాస్తే కోడ్ అర్థం కాదు.'
    ],
    challenge: `// Coding Challenge:
// కింది రెండు స్ట్రింగ్స్ ని తీసుకోండి: str1 = "Java21", str2 = new String("java21"):
// 1. "==" వాడి చెక్ చేయండి (result1)
// 2. ".equals()" వాడి చెక్ చేయండి (result2)
// 3. ".equalsIgnoreCase()" వాడి చెక్ చేయండి (result3)
// మూడింటి రిజల్ట్స్ ప్రింట్ చేయండి.

public class Main {
    public static void main(String[] args) {
        String str1 = "Java21";
        String str2 = new String("java21");
        // TODO: ఆ 3 చెక్స్ చేసి ప్రింట్ చేయండి
        
    }
}`,
    faq: [
      {
        q: 'స్ట్రింగ్స్ కి "==" వాడినప్పుడు అప్పుడప్పుడు ఎందుకు true వస్తుంది?',
        a: 'ఎందుకంటే జావాలో మెమరీని సేవ్ చేయడానికి ఒకే పేరుతో ఉన్న స్ట్రింగ్స్ ని String Pool లోకి పంపుతుంది. అప్పుడు రెండింటికీ ఒకటే అడ్రెస్ ఉంటుంది కాబట్టి true వస్తుంది. కానీ మనం Scanner నుంచి తీసుకున్నప్పుడు వేరే అడ్రెస్ వస్తుంది కాబట్టి అక్కడ తప్పు ఆన్సర్ వస్తుంది.'
      },
      {
        q: 'Ternary వాడినప్పుడు ఒక దాంట్లో int, ఇంకో దాంట్లో double వాల్యూ ఇవ్వొచ్చా?',
        a: 'ఇవ్వొచ్చు, కానీ జావా ఆటోమాటిక్ గా int ని కూడా double కింద మార్చేస్తుంది. ఇది కొన్నిసార్లు మనం ఊహించని బగ్స్ కి దారితీస్తుంది.'
      }
    ],
    recap: [
      'Ternary operator: if-else ని ఒకే లైన్ లో రాసి, వచ్చిన రిజల్ట్ ని వేరియబుల్ లో స్టోర్ చేయడం.',
      'స్ట్రింగ్స్ కి ఎప్పుడూ == వాడకండి. అది కేవలం మెమరీ అడ్రెస్ ని మాత్రమే చెక్ చేస్తుంది.',
      'ఎగ్జాక్ట్ గా మ్యాచ్ అవ్వాలంటే .equals(), క్యాపిటల్స్/స్మాల్స్ పట్టించుకోకూడదు అంటే .equalsIgnoreCase() వాడాలి.',
      'null వచ్చినప్పుడు క్రాష్ అవ్వకుండా ఉండాలంటే ("ADMIN".equals(role)) ఇలా యోడా కండిషన్ వాడాలి.'
    ]
  },

  // ==========================================
  // CHAPTER 17: Traditional Switch Statements
  // ==========================================
  {
    num: 17,
    phaseId: 'phase4',
    phaseTitle: 'Phase 4: Conditions & Branching',
    slug: '17-java-switch-statement-and-string-switching',
    title: 'Java Traditional switch Statement & String Switching (తెలుగులో)',
    badge: '17. switch, case, break & default',
    subtopics: 'switch Syntax · case Labels · The break Keyword · Fall-Through Mechanism · default Fallback · Switching on byte, short, char, int, enum, and String',
    readTime: '15 min read',
    intro: 'చాలా కండిషన్స్ ఉన్నప్పుడు else-if లాడర్ వాడితే కోడ్ అంతా గజిబిజిగా మారుతుంది. దానికి బదులుగా జావాలో ఉన్న `switch` స్టేట్మెంట్ ఎలా వాడాలి? `break` ఎందుకు ముఖ్యం? మరియు `default` ఎప్పుడు వాడాలో ఈ చాప్టర్ లో చూద్దాం.',
    theorySections: [
      {
        heading: '1. switch Statement అంటే ఏంటి?',
        content: `ఒక వేరియబుల్ వాల్యూ ని బట్టి చాలా ఆప్షన్స్ లో ఒకదాన్ని సెలెక్ట్ చేసుకోవాల్సి వచ్చినప్పుడు (ఉదాహరణకి: ఏ రోజు, ఏ ఆప్షన్ సెలెక్ట్ చేసారు లాంటివి) \`else-if\` కంటే **\`switch\`** వాడటం చాలా నీట్ గా ఉంటుంది.

ఇది చాలా ఫాస్ట్ గా పనిచేస్తుంది:

\`\`\`java
switch (expression) {
    case value1:
        // లాజిక్
        break;
    case value2:
        // లాజిక్
        break;
    default:
        // ఏదీ మ్యాచ్ కాకపోతే ఇది రన్ అవుతుంది
}
\`\`\``
      },
      {
        heading: '2. switch లో ఏయే డేటా టైప్స్ వాడొచ్చు?',
        content: `మీ ఇష్టం వచ్చిన డేటా టైప్ ని \`switch\` లో పెట్టడానికి కుదరదు. జావా కొన్నింటికి మాత్రమే పర్మిషన్ ఇచ్చింది:

1. **సింపుల్ నంబర్స్/క్యారెక్టర్స్:** \`byte\`, \`short\`, \`char\`, \`int\` (మరియు వాటి Wrapper classes).
2. **స్ట్రింగ్స్ (Strings - Java 7 నుంచి):** \`String\` కూడా వాడొచ్చు (ఇంటర్నల్ గా ఇది \`.equals()\` లాగే పనిచేస్తుంది).
3. **Enums (Java 5 నుంచి):** కాన్స్టంట్స్ గ్రూప్ (Enum).

*(గమనిక: \`long\`, \`float\`, \`double\` మరియు \`boolean\` ని switch లో వాడలేము).*`
      },
      {
        heading: '3. `break` కీవర్డ్ లేకపోతే ఏమవుతుంది? (Fall-Through)',
        content: `పాత \`switch\` స్టేట్మెంట్ లో ఒక \`case\` మ్యాచ్ అయితే, అందులో ఉన్న కోడ్ రన్ అవుతుంది. ఆ తర్వాత **\`break\`** అని కనిపిస్తేనే ఆ బ్లాక్ లోంచి బయటకొస్తుంది.

ఒకవేళ మీరు పొరపాటున \`break\` రాయడం మర్చిపోతే.. మ్యాచ్ అయిన కండిషన్ తో పాటు దాని కింద ఉన్న కండిషన్స్ కూడా రన్ అయిపోతాయి (దాన్నే **Fall-Through** అంటారు).

\`\`\`
+-----------------------------------------------------------------------------------+
|                     SWITCH FALL-THROUGH (బగ్)                                      |
+-----------------------------------------------------------------------------------+
|  int day = 2;                                                                     |
|  switch (day) {                                                                   |
|      case 1: System.out.println("Mon"); // ఇది రన్ అవ్వదు                            |
|      case 2: System.out.println("Tue"); // మ్యాచ్ అయ్యింది! కాబట్టి ప్రింట్ అవుతుంది          |
|              // ఇక్కడ BREAK రాయడం మర్చిపోయారు! కాబట్టి కిందకి పడిపోతుంది (Fall through)   |
|      case 3: System.out.println("Wed"); // ఇది కూడా రన్ అయిపోతుంది!                     |
|              break; // ఇక్కడ ఆగుతుంది                                              |
|  }                                                                                |
|  (అవుట్పుట్: "Tue" మరియు "Wed" రెండు ప్రింట్ అవుతాయి)                                  |
+-----------------------------------------------------------------------------------+
\`\`\`

### కావాలని Fall-Through వాడటం (Grouping Cases):
కొన్నిసార్లు చాలా కండిషన్స్ కి ఒకటే లాజిక్ రాయాల్సి వచ్చినప్పుడు కావాలని \`break\` రాయకుండా వదిలేస్తారు:
\`\`\`java
switch (dayOfWeek) {
    case "MONDAY":
    case "TUESDAY":
    case "WEDNESDAY":
    case "THURSDAY":
    case "FRIDAY":
        System.out.println("ఇది వర్కింగ్ డే!"); // 5 రోజుల్లో ఏది వచ్చినా ఇదే రన్ అవుతుంది
        break;
    case "SATURDAY":
    case "SUNDAY":
        System.out.println("ఇది వీకెండ్! ఎంజాయ్!");
        break;
}
\`\`\``
      },
      {
        heading: '4. `default` బ్లాక్ ఎందుకు?',
        content: `ఇది ఆప్షనల్ (రాసినా రాయకపోయినా పర్లేదు), కానీ కచ్చితంగా రాయడం మంచి అలవాటు. పైన రాసిన \`case\` లలో ఏదీ మ్యాచ్ అవ్వకపోతే ఫైనల్ గా ఈ \`default\` బ్లాక్ రన్ అవుతుంది. (\`if-else\` లో \`else\` లాంటిది).`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        int dayNumber = 3;
        String dayName;

        System.out.println("=== ఏ రోజు ఏంటి? ===");

        // నార్మల్ switch స్టేట్మెంట్ (break వాడి)
        switch (dayNumber) {
            case 1:
                dayName = "మండే";
                break;
            case 2:
                dayName = "ట్యూస్ డే";
                break;
            case 3:
                dayName = "వెడ్నెస్ డే"; // ఇది మ్యాచ్ అయ్యింది
                break;
            case 4:
                dayName = "థర్స్ డే";
                break;
            case 5:
                dayName = "ఫ్రైడే";
                break;
            case 6:
                dayName = "సాటర్ డే";
                break;
            case 7:
                dayName = "సండే";
                break;
            default:
                dayName = "ఇన్వాలిడ్ నంబర్ (1-7 మధ్యలోనే ఇవ్వాలి)";
                break;
        }

        System.out.println("Day " + dayNumber + " అంటే: " + dayName);

        // స్ట్రింగ్ switch (కలిపి రాయడం - Grouping)
        String userRole = "MANAGER";
        System.out.print("పవర్ (Role: " + userRole + "): ");

        switch (userRole) {
            case "SUPER_ADMIN":
            case "ADMIN":
                System.out.println("ఫుల్ కంట్రోల్ (చదవడం, రాయడం, డిలీట్ చేయడం)");
                break;
            case "MANAGER":
            case "TEAM_LEAD":
                System.out.println("సగం కంట్రోల్ (చదవడం, రాయడం, అప్రూవ్ చేయడం)");
                break;
            case "VIEWER":
                System.out.println("చదవడానికి మాత్రమే పర్మిషన్ ఉంది");
                break;
            default:
                System.out.println("అసలు పర్మిషనే లేదు");
                break;
        }
    }
}`,
    output: `=== ఏ రోజు ఏంటి? ===
Day 3 అంటే: వెడ్నెస్ డే
పవర్ (Role: MANAGER): సగం కంట్రోల్ (చదవడం, రాయడం, అప్రూవ్ చేయడం)`,
    lineByLine: [
      { line: 'switch (dayNumber)', explanation: 'dayNumber వాల్యూ ని తీసుకుని డైరెక్ట్ గా ఎక్కడ 3 ఉందో అక్కడికి జంప్ అవుతుంది.' },
      { line: 'dayName = "వెడ్నెస్ డే"; break;', explanation: 'అసైన్ చేసాక, కింద లైన్స్ కి వెళ్లకుండా break వాడి బయటకొచ్చేస్తుంది.' },
      { line: 'case "MANAGER": case "TEAM_LEAD":', explanation: 'రెండిటికీ ఒకటే లాజిక్ కావాలి కాబట్టి, మధ్యలో break రాయకుండా కలిపేసాం (Fall-through గ్రూపింగ్).' },
      { line: 'default: ...', explanation: 'ఏదీ మ్యాచ్ కాకపోతే సేఫ్ సైడ్ గా ఇది రన్ అవుతుంది.' }
    ],
    practicalExample: `public class HttpStatusCodeHandler {
    public static void main(String[] args) {
        int httpStatusCode = 404;

        System.out.println("--- వెబ్ API రెస్పాన్స్ కోడ్స్ ---");
        System.out.print("HTTP " + httpStatusCode + " స్టాటస్: ");

        switch (httpStatusCode) {
            case 200:
                System.out.println("200 OK — సక్సెస్ అయ్యింది.");
                break;
            case 201:
                System.out.println("201 Created — డేటా క్రియేట్ అయ్యింది.");
                break;
            case 400:
                System.out.println("400 Bad Request — మీరు పంపిన డేటా రాంగ్.");
                break;
            case 401:
                System.out.println("401 Unauthorized — లాగిన్ అవ్వండి.");
                break;
            case 404:
                System.out.println("404 Not Found — మీరు అడిగిన పేజ్/డేటా లేదు.");
                break;
            case 500:
                System.out.println("500 Internal Server Error — సర్వర్ లో ప్రాబ్లమ్ వచ్చింది.");
                break;
            default:
                System.out.println("కొత్త ఎర్రర్ కోడ్ వచ్చింది.");
                break;
        }
    }
}`,
    practicalOutput: `--- వెబ్ API రెస్పాన్స్ కోడ్స్ ---
HTTP 404 స్టాటస్: 404 Not Found — మీరు అడిగిన పేజ్/డేటా లేదు.`,
    commonMistakes: [
      'break రాయడం మర్చిపోవడం: ఇది చాలా కామన్ మిస్టేక్. ఇది మర్చిపోతే దాని కింద ఉన్నవి అన్నీ రన్ అయిపోయి అవుట్పుట్ గజిబిజిగా వస్తుంది.',
      'double, float వాడటం: "switch (3.14)" అని రాస్తే జావా ఒప్పుకోదు. డెసిమల్స్ కరెక్ట్ గా ఉండవు కాబట్టి జావా వాటిని switch లో సపోర్ట్ చేయదు.',
      'స్ట్రింగ్ కి null రావడం: switch లో స్ట్రింగ్ పాస్ చేసినప్పుడు అందులో గనక null ఉంటే వెంటనే NullPointerException వచ్చి యాప్ క్రాష్ అవుతుంది.'
    ],
    challenge: `// Coding Challenge:
// సింపుల్ క్యాలిక్యులేటర్ రాయండి:
// Variables: char operator = '+'; int a = 20, b = 5;
// switch (operator) వాడి '+', '-', '*', '/' వచ్చినప్పుడు వాటికి తగ్గ లాజిక్ చేసి ప్రింట్ చేయండి.
// ఒకవేళ వేరే ఏదైనా ఆపరేటర్ వస్తే default లో "Invalid Operator" అని రాయండి.

public class Main {
    public static void main(String[] args) {
        char operator = '*';
        int a = 20, b = 5;
        // TODO: switch వాడి క్యాలిక్యులేషన్ చేయండి
        
    }
}`,
    faq: [
      {
        q: 'else-if కంటే switch ఎలా ఫాస్ట్ గా పనిచేస్తుంది?',
        a: 'else-if ప్రతి కండిషన్ ని లైన్ బై లైన్ చెక్ చేసుకుంటూ వెళ్తుంది (టైమ్ వేస్ట్). కానీ switch అనేది ఇంటర్నల్ గా ఒక టేబుల్ ని క్రియేట్ చేసుకుని, ఏ వాల్యూకి వెళ్లాలో డైరెక్ట్ గా ఆ లైన్ కి జంప్ అయిపోతుంది.'
      },
      {
        q: 'case తర్వాత వేరియబుల్స్ (ఉదా: case x:) వాడొచ్చా?',
        a: 'వాడకూడదు. case తర్వాత ఎప్పుడూ కాన్స్టంట్స్ (నంబర్స్, టెక్స్ట్) మాత్రమే వాడాలి. వాల్యూస్ మారుతూ ఉండే వేరియబుల్స్ ని జావా ఒప్పుకోదు.'
      }
    ],
    recap: [
      'ఒకటే వాల్యూ తో చాలా కండిషన్స్ చెక్ చేయాలంటే switch వాడటం బెస్ట్.',
      'దీంట్లో int, char, byte, short, enum, మరియు String వాడొచ్చు.',
      'break మర్చిపోతే Fall-through అయ్యి బగ్స్ వస్తాయి.',
      'చాలా కండిషన్స్ కి ఒకటే లాజిక్ అయితే, కలుపుకుని (Grouping) రాసుకోవచ్చు.'
    ]
  },

  // ==========================================
  // CHAPTER 18: Modern Switch Expressions & Pitfalls
  // ==========================================
  {
    num: 18,
    phaseId: 'phase4',
    phaseTitle: 'Phase 4: Conditions & Branching',
    slug: '18-java-modern-switch-expressions-and-pitfalls',
    title: 'Modern Java Switch Expressions (Java 14+) & Condition Pitfalls (తెలుగులో)',
    badge: '18. Modern Switch & Pitfalls',
    subtopics: 'Traditional vs Modern Switch · Arrow Syntax (->) · yield Keyword · Returning Values from Switch · Exhaustive Pattern Matching · Common Condition Anti-Patterns',
    readTime: '16 min read',
    intro: 'జావా 14 లో switch స్టేట్మెంట్ ని పూర్తిగా మార్చేశారు! పాత switch లో ఉన్న ప్రాబ్లమ్స్ (break మర్చిపోవడం లాంటివి) లేకుండా, చాలా షార్ట్ గా Arrow (->) సింటాక్స్ తో ఎలా రాయాలో చూద్దాం. అలాగే డెవలపర్స్ కామన్ గా చేసే if-else తప్పులు (Anti-patterns) ఎలా అవాయిడ్ చేయాలో నేర్చుకుందాం.',
    theorySections: [
      {
        heading: '1. ఏంటి మార్పు? పాత switch కీ, కొత్త switch కీ తేడా.',
        content: `**Java 14** నుంచి, జావా \`switch\` ని ఒక **Expression** గా మార్చేసింది (అంటే అందులోంచి డైరెక్ట్ గా వాల్యూస్ ని బయటకి పంపించి ఒక వేరియబుల్ లో స్టోర్ చేయొచ్చు).

### కొత్త Switch అడ్వాంటేజెస్:
1. **Arrow సింటాక్స్ (\`->\`):** ఇక్కడ \`break\` రాయాల్సిన అవసరమే లేదు! కాబట్టి కింది లైన్స్ లోకి పొరపాటున వెళ్లిపోవడం (Fall-through బగ్స్) అస్సలు ఉండవు.
2. **డైరెక్ట్ గా వాల్యూ అసైన్ చేయడం:** వచ్చిన రిజల్ట్ ని ఒకేసారి వేరియబుల్ లో స్టోర్ చేసుకోవచ్చు.
3. **కామా (,) తో మల్టిపుల్ లేబుల్స్:** ఒకే లాజిక్ ఉన్న వాటిని కామా పెట్టి ఒకే లైన్ లో రాసేయొచ్చు (\`case 1, 2, 3 -> ...\`).
4. **ఆటోమెటిక్ చెకింగ్:** మనం ఏ కండిషన్ అన్నా మిస్ అయితే జావానే వార్నింగ్ ఇచ్చి ఆపేస్తుంది.`
      },
      {
        heading: '2. మోడ్రన్ Switch సింటాక్స్ & ఎగ్జాంపుల్స్',
        content: `### 1. బేసిక్ Arrow (\`->\`) సింటాక్స్
\`\`\`java
String dayType = switch (day) {
    case 1, 2, 3, 4, 5 -> "వర్కింగ్ డే"; // బ్రేక్ అవసరం లేదు, డైరెక్ట్ వాల్యూ ఇస్తున్నాం
    case 6, 7           -> "వీకెండ్";
    default             -> "ఇన్వాలిడ్ రోజు";
}; // వేరియబుల్ కి అసైన్ చేస్తున్నాం కాబట్టి ఇక్కడ సెమికోలన్ (;) కచ్చితంగా ఉండాలి.
\`\`\`

### 2. రెండు మూడు లైన్స్ రాయాలంటే \`yield\` వాడాలి
ఒకవేళ మీరు డైరెక్ట్ గా వాల్యూ ఇవ్వకుండా, లోపల ఇంకేదన్నా లాజిక్ చేసి అప్పుడు వాల్యూ పంపించాలంటే బ్రాకెట్స్ \`{}\` పెట్టి, రిటర్న్ చేయడానికి **\`yield\`** అనే కీవర్డ్ వాడాలి:
\`\`\`java
double discount = switch (customerTier) {
    case "PLATINUM" -> 0.25;
    case "GOLD"     -> 0.15;
    case "REGULAR"  -> {
        System.out.println("నార్మల్ కస్టమర్స్ కి కూడా ఆఫర్ ఇస్తున్నాం...");
        yield 0.02; // ఇక్కడినుంచి 0.02 వాల్యూని పైకి పంపిస్తున్నాం
    }
    default -> 0.0;
};
\`\`\``
      },
      {
        heading: '3. పాత దానికి, కొత్త దానికి కంపారిజన్',
        content: `| ఫీచర్ | పాత switch (Java 1 - 13) | కొత్త మోడ్రన్ switch (Java 14+) |
| :--- | :--- | :--- |
| **ఏం చేస్తుంది?** | జస్ట్ కోడ్ రన్ చేస్తుంది, వాల్యూస్ తిరిగి ఇవ్వదు. | వాల్యూస్ ని డైరెక్ట్ గా రిటర్న్ చేస్తుంది. |
| **Fall-Through బగ్స్** | చాలా ఎక్కువ (break మర్చిపోతే అంతే). | **జీరో** (Arrow \`->\` వాడితే కిందకి అసలు వెళ్ళదు). |
| **ఎలా రాస్తాం?** | \`case VAL: లాజిక్; break;\` | \`case VAL -> రిజల్ట్;\` |
| **ఎక్కువ కండిషన్స్ కి** | కింద కింద రాయాలి \`case 1: case 2:\` | కామాతో రాయొచ్చు \`case 1, 2, 3 ->\` |
| **మల్టిపుల్ లైన్స్ కి** | వేరియబుల్ ని మార్చి \`break\` రాయాలి. | **\`yield\`** వాడాలి. |`
      },
      {
        heading: '4. కోడింగ్ లో కామన్ గా చేసే 5 తప్పులు (Anti-Patterns) & వాటి సొల్యూషన్స్',
        content: `1. **డబుల్ బూలియన్ చెకింగ్ (Boolean Redundancy Trap):**
   - ❌ *తప్పు:* \`if (isLoggedIn == true)\` (బూలియన్ కి మళ్ళీ true అని రాయక్కర్లేదు)
   - ✅ *కరెక్ట్:* \`if (isLoggedIn)\`
2. **Null తో క్రాష్ అయ్యే బగ్ (The Inverted Null Bug):**
   - ❌ *తప్పు:* \`if (user.getRole().equals("ADMIN"))\` (ఒకవేళ role null ఉంటే క్రాష్ అవుతుంది!)
   - ✅ *కరెక్ట్:* \`if ("ADMIN".equals(user.getRole()))\`
3. **ఇంటిజర్ డివిజన్ మిస్టేక్ (Integer Division in Conditions):**
   - ❌ *తప్పు:* \`if (score / 100 > 0.5)\` (score ఇంటిజర్ కాబట్టి డెసిమల్స్ కట్ అయిపోయి 0 అయిపోతుంది, సో కండిషన్ ఎప్పటికీ పాస్ అవ్వదు!)
   - ✅ *కరెక్ట్:* \`if (score / 100.0 > 0.5)\`
4. **అతిగా లోపలికి వెళ్లడం (Deeply Nested "Arrow Code"):**
   - ❌ if లోపల ఇంకో if, దాని లోపల ఇంకో if.. ఇలా 5, 6 రాసుకుంటూ వెళ్తే చదవడానికి కష్టంగా ఉంటుంది.
   - ✅ దానికి బదులు **Guard Clauses (Early Return)** వాడాలి:
     \`\`\`java
     if (!isAuthenticated) return "యాక్సెస్ లేదు";
     if (!hasFunds) return "బ్యాలెన్స్ లేదు";
     // ఇప్పుడు మెయిన్ లాజిక్ ప్రశాంతంగా రాసుకోవచ్చు...
     \`\`\``
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        String quarterMonth = "APRIL";

        System.out.println("=== Modern Java 14+ Switch Expressions ===");

        // 1. డైరెక్ట్ గా వాల్యూస్ అసైన్ చేయడం (Arrow సింటాక్స్)
        int fiscalQuarter = switch (quarterMonth) {
            case "JANUARY", "FEBRUARY", "MARCH"     -> 1;
            case "APRIL", "MAY", "JUNE"             -> 2; // ఇది మ్యాచ్ అయ్యింది కాబట్టి డైరెక్ట్ గా 2 వెళ్ళిపోతుంది
            case "JULY", "AUGUST", "SEPTEMBER"      -> 3;
            case "OCTOBER", "NOVEMBER", "DECEMBER"  -> 4;
            default -> 0;
        };

        System.out.println("నెల: " + quarterMonth + " అనేది క్వార్టర్ Q" + fiscalQuarter + " కి వస్తుంది");

        // 2. రెండు మూడు లైన్స్ కోసం 'yield' వాడటం
        String priorityLevel = "HIGH";
        int responseTimeHours = switch (priorityLevel) {
            case "CRITICAL" -> 1;
            case "HIGH"     -> {
                System.out.println("[లాగ్] హై-ప్రయారిటీ.. వెంటనే టీమ్ కి మెసేజ్ పంపాం.");
                yield 4; // 4 గంటల్లో సాల్వ్ చేయాలి అని వాల్యూ పంపిస్తున్నాం
            }
            case "MEDIUM"   -> 12;
            case "LOW"      -> 24;
            default         -> {
                System.out.println("[లాగ్] ప్రయారిటీ తెలీదు.. డీఫాల్ట్ టైమ్ సెట్ చేసాం.");
                yield 48;
            }
        };

        System.out.println("మీ ఇష్యూకి టైమ్ లిమిట్ (SLA): " + responseTimeHours + " గంటలు");
    }
}`,
    output: `=== Modern Java 14+ Switch Expressions ===
నెల: APRIL అనేది క్వార్టర్ Q2 కి వస్తుంది
[లాగ్] హై-ప్రయారిటీ.. వెంటనే టీమ్ కి మెసేజ్ పంపాం.
మీ ఇష్యూకి టైమ్ లిమిట్ (SLA): 4 గంటలు`,
    lineByLine: [
      { line: 'int fiscalQuarter = switch (quarterMonth) { ... };', explanation: 'కొత్త switch లో రిజల్ట్ వస్తుంది కాబట్టి డైరెక్ట్ గా వేరియబుల్ కి అసైన్ చేసాం (చివర్లో సెమికోలన్ ; పెట్టాలి).' },
      { line: 'case "APRIL", "MAY", "JUNE" -> 2;', explanation: 'కామా వాడి ఒకే లైన్ లో రాసేసాం. break రాయాల్సిన పనే లేదు.' },
      { line: 'yield 4;', explanation: 'బ్రాకెట్స్ వాడినప్పుడు రిటర్న్ చేయడానికి yield వాడాలి.' }
    ],
    practicalExample: `public class OrderDiscountCalculator {
    public static void main(String[] args) {
        String customerTier = "GOLD";
        double orderAmount   = 5000.00;

        // కొత్త Switch Expression వాడి డిస్కౌంట్ కనుక్కోవడం
        double discountRate = switch (customerTier) {
            case "VIP", "PLATINUM" -> 0.20; // 20% డిస్కౌంట్
            case "GOLD"            -> 0.15; // 15% డిస్కౌంట్
            case "SILVER"          -> 0.10; // 10% డిస్కౌంట్
            case "BRONZE"          -> 0.05; // 5% డిస్కౌంట్
            default                -> 0.00; // డిస్కౌంట్ లేదు
        };

        double discountAmount = orderAmount * discountRate;
        double finalPayable   = orderAmount - discountAmount;

        System.out.println("--- ఫైనల్ బిల్ ---");
        System.out.printf("అసలు అమౌంట్ : ₹%,.2f%n", orderAmount);
        System.out.printf("డిస్కౌంట్ (-%d%%): ₹%,.2f%n", (int)(discountRate * 100), discountAmount);
        System.out.println("-----------------");
        System.out.printf("కట్టాల్సింది : ₹%,.2f%n", finalPayable);
    }
}`,
    practicalOutput: `--- ఫైనల్ బిల్ ---
అసలు అమౌంట్ : ₹5,000.00
డిస్కౌంట్ (-15%): ₹750.00
-----------------
కట్టాల్సింది : ₹4,250.00`,
    commonMistakes: [
      'సెమికోలన్ (;) మర్చిపోవడం: పాత switch కి చివర సెమికోలన్ అవసరం లేదు, కానీ కొత్త switch ఒక Expression కాబట్టి చివర్లో బ్రాకెట్ క్లోజ్ చేసాక కచ్చితంగా ";" పెట్టాలి.',
      'Arrow వాడి మళ్ళీ break రాయడం: Arrow (->) వాడితే ఆటోమాటిక్ గా బ్రేక్ అయిపోతుంది, మళ్ళీ లోపల break రాస్తే ఎర్రర్ వస్తుంది.',
      'return కి బదులు yield మర్చిపోవడం: బ్రాకెట్స్ వాడినప్పుడు ఫంక్షన్స్ లో లాగా "return 4;" అని రాస్తే ఒప్పుకోదు, switch లోపల "yield 4;" అని మాత్రమే రాయాలి.'
    ],
    challenge: `// Coding Challenge:
// ఒక ట్రాఫిక్ సిగ్నల్ లాజిక్ రాయండి: 
// String color = "RED"; 
// కొత్త switch (->) వాడి:
// "RED" కి -> "ఆగండి"
// "YELLOW" కి -> "రెడీ అవ్వండి"
// "GREEN" కి -> "వెళ్లండి"
// అని రిటర్న్ చేసి ఒక String వేరియబుల్ (action) లో స్టోర్ చేయండి.

public class Main {
    public static void main(String[] args) {
        String color = "RED";
        // TODO: లాజిక్ రాయండి
        
    }
}`,
    faq: [
      {
        q: 'పాత switch కి, కొత్త దానికి స్పీడ్ లో తేడా ఉంటుందా?',
        a: 'స్పీడ్ లో పెద్ద తేడా ఉండదు, ఇంటర్నల్ గా కంపైలర్ రెండింటినీ ఒకేలాగా రన్ చేస్తుంది. కానీ డెవలపర్స్ బగ్స్ లేకుండా ఈజీగా, ఫాస్ట్ గా కోడ్ రాయడానికి ఇది చాలా హెల్ప్ అవుతుంది.'
      },
      {
        q: 'నేను ఇంకా పాత switch వాడుకోవచ్చా?',
        a: 'వాడుకోవచ్చు. జావా పాత ఫీచర్స్ ని ఎప్పుడూ తీసేయదు. కానీ ఇండస్ట్రీ లోకి వెళ్ళినప్పుడు అందరూ ఈ కొత్త దన్నే వాడుతుంటారు కాబట్టి ఇది నేర్చుకోవడం బెటర్.'
      }
    ],
    recap: [
      'Java 14 లో వచ్చిన కొత్త switch తో వాల్యూస్ ని డైరెక్ట్ గా అసైన్ చేయొచ్చు.',
      'Arrow (->) సింటాక్స్ వల్ల break రాయాల్సిన పనేలేదు, బగ్స్ తగ్గిపోతాయి.',
      'మల్టిపుల్ లైన్స్ రాసినప్పుడు రిటర్న్ చేయడానికి yield వాడాలి.',
      'కోడ్ రాసేటప్పుడు Yoda కండిషన్స్ లాంటివి వాడి బగ్స్ ని ముందే ఆపేయాలి.'
    ]
  }
];
