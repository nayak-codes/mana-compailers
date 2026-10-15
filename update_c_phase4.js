const fs = require('fs');
const path = 'scratch/build_c_phase4.js';

let content = fs.readFileSync(path, 'utf8');

// LESSON 6 Replaces
content = content.replace(/const title = "C Conditional Branching: if, else-if Ladders, Nested if & Common Traps";/, 'const title = "C Conditional Branching: if, else-if Ladders, Nested if & Common Traps (తెలుగులో)";');
content = content.replace(/const desc = "Master C Conditional Statements \(Phase 4 Part 1\): Boolean truth in C \(0 vs non-zero\), if, if-else, else-if ladders, nested if, guard clauses, multiple conditions with logical AND\/OR\/NOT, short-circuit evaluation, ternary operator, character comparisons, and critical compiler traps \(if \(x = 5\), dangling else\)\.";/, 'const desc = "C Conditional Statements (Phase 4 Part 1): C లో Boolean లాజిక్, if, if-else, else-if లాడర్, nested if, లాజికల్ ఆపరేటర్స్ వాడి మల్టిపుల్ కండిషన్స్ చెక్ చేయడం, కామన్ గా చేసే తప్పులు గురించి తెలుగులో నేర్చుకుందాం.";');

let intro6_en = '<p>Welcome to <strong>Phase 4 (Part 1): C Conditional Branching, if-else Ladders, Nested if & Logical Evaluation Masterclass</strong>! In real-world software, programs must make dynamic decisions based on runtime user input and system conditions. In C, decision-making is rooted in <strong>integer-based Boolean logic</strong>, where <code>0</code> represents <code>FALSE</code> and <strong>any non-zero value</strong> represents <code>TRUE</code>. In this comprehensive guide, you will master the mechanics of <code>if</code>, <code>if-else</code>, multi-branch <code>else-if</code> ladders, nested conditions, short-circuit logical operators, character comparisons, and critical traps like accidental assignment in condition statements.</p>';
let intro6_te = '<p><strong>Phase 4 (Part 1): C Conditional Branching, if-else Ladders, Nested if Masterclass</strong> కు స్వాగతం! రియల్ వరల్డ్ సాఫ్ట్‌వేర్లలో, యూజర్ ఇచ్చే డేటాని బట్టి ప్రోగ్రామ్ దానంతట అదే నిర్ణయాలు (decisions) తీసుకోవాలి. C లాంగ్వేజ్ లో డెసిషన్స్ అన్నీ <strong>నెంబర్-బేస్డ్ బూలియన్ లాజిక్</strong> మీద ఆధారపడి ఉంటాయి. అంటే, <code>0</code> వస్తే <code>FALSE</code> అని, <strong>జీరో కాని ఏ నెంబర్ అయినా</strong> <code>TRUE</code> అని అర్థం. ఈ గైడ్ లో, <code>if</code>, <code>if-else</code>, మల్టిపుల్ కండిషన్స్ చెక్ చేసే <code>else-if</code> లాడర్, కండిషన్ లోపల కండిషన్ రాసే nested-if, క్యారెక్టర్లను పోల్చడం, మరియు కండిషన్స్ రాసేటప్పుడు చేసే కామన్ తప్పుల గురించి తెలుగులో నేర్చుకుందాం.</p>';
content = content.replace(intro6_en, intro6_te);

content = content.replace('<div class="section-title"><span class="num">1</span>Boolean Truth in C &amp; The if / if-else Mechanics</div>', '<div class="section-title"><span class="num">1</span>C లో Boolean Truth (నిజం/అబద్ధం) &amp; if / if-else ఎలా పనిచేస్తాయి?</div>');
content = content.replace('<h4>💡 The Golden Rule of Boolean Truth in C:</h4>', '<h4>💡 C లో Boolean లాజిక్ గోల్డెన్ రూల్:</h4>');
content = content.replace('<p>• <strong><code>0</code> (Zero):</strong> Evaluates strictly to <strong><code>FALSE</code></strong>.<br>', '<p>• <strong><code>0</code> (సున్నా):</strong> కచ్చితంగా <strong><code>FALSE</code> (అబద్ధం)</strong> అని అర్థం.<br>');
content = content.replace('• <strong>Any Non-Zero Value (<code>1</code>, <code>-5</code>, <code>100</code>, <code>0.5</code>):</strong> Evaluates strictly to <strong><code>TRUE</code></strong>!</p>', '• <strong>సున్నా కాని ఏ నెంబర్ అయినా (<code>1</code>, <code>-5</code>, <code>100</code>, <code>0.5</code> వగైరా):</strong> కచ్చితంగా <strong><code>TRUE</code> (నిజం)</strong> కిందకే వస్తుంది!</p>');

let mDiag6_en = `      <div class="flow-diagram">
        <strong>Control Flow Architecture — if-else:</strong><br>
        <br>
                 [ Start Condition: (marks &gt;= 40) ]<br>
                               │<br>
                  ┌───────────┴───────────┐<br>
                  ▼ (TRUE)                ▼ (FALSE)<br>
            [ Grade: PASS ]         [ Grade: FAIL ]<br>
                  │                       │<br>
                  └───────────┬───────────┘<br>
                              ▼<br>
                   [ Continue Execution ]
      </div>`;
let mDiag6_te = `      <div class="flow-diagram">
        <strong>if-else ఎలా రన్ అవుతుంది? (Control Flow):</strong><br>
        <br>
                 [ కండిషన్ స్టార్ట్: (marks &gt;= 40) ]<br>
                               │<br>
                  ┌───────────┴───────────┐<br>
                  ▼ (TRUE / నిజమైతే)         ▼ (FALSE / అబద్ధమైతే)<br>
            [ Grade: PASS ]         [ Grade: FAIL ]<br>
                  │                       │<br>
                  └───────────┬───────────┘<br>
                              ▼<br>
                   [ తర్వాత ఉన్న కోడ్ రన్ అవుతుంది ]
      </div>`;
content = content.replace(mDiag6_en, mDiag6_te);

content = content.replace('<div class="section-title"><span class="num">2</span>The else-if Ladder (Multi-Way Decision Making)</div>', '<div class="section-title"><span class="num">2</span>The else-if Ladder (ఒకటి కంటే ఎక్కువ కండిషన్స్)</div>');
content = content.replace('<p>Multiple mutually exclusive conditions unnapudu <strong><code>else-if</code> ladder</strong> sequential order lo top-to-bottom evaluate avthundhi. First match ayina block execute avvagane migilina conditions skip aypothayi:</p>', '<p>మనకు ఒకదానికొకటి సంబంధం లేని మల్టిపుల్ కండిషన్స్ ఉన్నప్పుడు <strong><code>else-if</code> ladder</strong> ని వాడతాము. ఇది పైనుండి కిందకు చెక్ చేసుకుంటూ వస్తుంది. ఏ కండిషన్ ఫస్ట్ నిజమైతే ఆ బ్లాక్ లో ఉన్న కోడ్ రన్ అయ్యి, కింద ఉన్న కండిషన్స్ అన్నింటినీ స్కిప్ చేసేస్తుంది:</p>');

content = content.replace('<div class="section-title"><span class="num">3</span>Nested if &amp; Logical Operators with Short-Circuit Evaluation ⭐</div>', '<div class="section-title"><span class="num">3</span>Nested if &amp; Logical Operators (Short-Circuit) ⭐</div>');
content = content.replace('<h4>⚡ Short-Circuit Evaluation in C</h4>', '<h4>⚡ C లో Short-Circuit Evaluation (సమయం ఆదా)</h4>');
content = content.replace('<p>• <strong>Logical AND (<code>&amp;&amp;</code>):</strong> First expression <code>FALSE</code> ayithe, second expression ni compiler evaluate kuda cheyyadhu (because entire result will definitely be false).<br>', '<p>• <strong>Logical AND (<code>&amp;&amp;</code>):</strong> ఫస్ట్ రాసిన కండిషన్ <code>FALSE</code> అయితే, కంపైలర్ అసలు సెకండ్ కండిషన్ ని చెక్ కూడా చేయదు (ఎందుకంటే AND లో ఒకటి ఫెయిల్ అయినా మొత్తం ఫెయిల్ కాబట్టి).<br>');
content = content.replace('• <strong>Logical OR (<code>||</code>):</strong> First expression <code>TRUE</code> ayithe, second expression ni evaluate cheyyadhu (because entire result is already true).<br>', '• <strong>Logical OR (<code>||</code>):</strong> ఫస్ట్ రాసిన కండిషన్ <code>TRUE</code> అయితే, సెకండ్ కండిషన్ ని చెక్ చేయదు (ఎందుకంటే OR లో కనీసం ఒకటి నిజమైనా మొత్తం నిజమే కాబట్టి).<br>');
content = content.replace('⚡ <em>Performance Tip:</em> Inexpensive fast checks ni left side pettali!</p>', '⚡ <em>టిప్:</em> త్వరగా రన్ అయ్యే చిన్న కండిషన్స్ ని ఎప్పుడూ ఎడమ వైపు (ఫస్ట్) రాయాలి!</p>');

content = content.replace('<div class="section-title"><span class="num">4</span>Critical Condition Mistakes in C Programming ⚠️</div>', '<div class="section-title"><span class="num">4</span>C ప్రోగ్రామింగ్ లో కండిషన్స్ రాసేటప్పుడు చేసే పెద్ద తప్పులు ⚠️</div>');
content = content.replace('<h4 style="color:#ff7b72;">🛑 The 3 Most Dangerous C Conditional Bugs:</h4>', '<h4 style="color:#ff7b72;">🛑 C లో ఎక్కువగా చేసే 3 డేంజరస్ తప్పులు:</h4>');
content = content.replace('<p>1. <strong>Accidental Assignment (<code>=</code> instead of <code>==</code>):</strong><br>', '<p>1. <strong>డబల్ ఈక్వల్స్ కి బదులు సింగిల్ ఈక్వల్ టు రాయడం (<code>=</code> బదులు <code>==</code> వాడకపోవడం):</strong><br>');
content = content.replace('<code>if (x = 5)</code> — Idhi equality check kaadhu! <code>x</code> lo 5 assign ayyi non-zero number return avvadam tho condition <strong>Always TRUE</strong> aypothundhi!<br>', '<code>if (x = 5)</code> — ఇది రెండు సమానమా అని చెక్ చేయదు! <code>x</code> లోకి 5 ని అసైన్ చేసి, అది సున్నా కాదు కాబట్టి కండిషన్ <strong>ఎప్పటికీ TRUE</strong> అయ్యేలా చేస్తుంది!<br>');
content = content.replace('💡 <em>Yoda Notation Defense:</em> <code>if (5 == x)</code> ani raste, accidental <code>if (5 = x)</code> compile error tho catch aypothundhi!<br>', '💡 <em>దీనికి సొల్యూషన్:</em> ఎప్పుడూ <code>if (5 == x)</code> అని రాయడం అలవాటు చేసుకోండి. పొరపాటున <code>if (5 = x)</code> అని రాస్తే వెంటనే కంపైల్ ఎర్రర్ వస్తుంది!<br>');
content = content.replace('2. <strong>Accidental Semicolon after if:</strong><br>', '2. <strong>if చివర్లో పొరపాటున Semicolon (;) పెట్టడం:</strong><br>');
content = content.replace('<code>if (x &gt; 10); { printf("Positive"); }</code> — Semicolon <code>;</code> empty statement ga act chesi if condition ni terminate chesthundhi. Braces lopala unna code condition fail ayina compulsorily execute avthundhi!<br>', '<code>if (x &gt; 10); { printf("Positive"); }</code> — చివర్లో <code>;</code> పెడితే అక్కడితో ఆ కండిషన్ ముగిసిపోతుంది. దాంతో ఆ కింది బ్రాకెట్స్ లో ఉన్న కోడ్ ఆ కండిషన్ తో సంబంధం లేకుండా ఎప్పుడూ రన్ అవుతూనే ఉంటుంది!<br>');
content = content.replace('3. <strong>Floating-Point Equality Check:</strong><br>', '3. <strong>పాయింట్ నంబర్స్ ని డైరెక్ట్ గా ఈక్వల్ (==) తో చెక్ చేయడం:</strong><br>');
content = content.replace('<code>float f = 0.1f + 0.2f; if (f == 0.3f)</code> is FALSE due to IEEE-754 precision rounding. Use <code>fabs(f - 0.3f) &lt; 0.0001</code> instead!</p>', '<code>float f = 0.1f + 0.2f; if (f == 0.3f)</code> అని రాస్తే కంప్యూటర్ రౌండింగ్ ప్రాబ్లమ్స్ వల్ల అది FALSE అని చెప్తుంది. అందుకని ఎప్పుడూ డిఫరెన్స్ (<code>fabs(f - 0.3f) &lt; 0.0001</code>) ని బట్టి చెక్ చేయాలి!</p>');

// LESSON 7 Replaces
content = content.replace(/const title = "C switch-case, Fall-Through Behavior & 7 Decision Practice Programs";/, 'const title = "C switch-case, Fall-Through Behavior & 7 Decision Programs (తెలుగులో)";');
content = content.replace(/const desc = "Master C switch-case Statements \(Phase 4 Part 2\): switch mechanics, jump table branch optimization under the hood, break and default rules, intentional vs accidental fall-through, if-else vs switch performance comparison, and 7 step-by-step practical programs \(Leap year, Multi-operation calculator, Even\/odd, Largest of 3, Voting eligibility\)\.";/, 'const desc = "C switch-case Statements (Phase 4 Part 2): switch-case ఎలా పనిచేస్తుంది, Jump tables అంటే ఏంటి, break మరియు default ఎందుకు వాడాలి, fall-through ప్రాబ్లం, if-else కి switch కి తేడా ఏంటి, మరియు 7 ప్రాక్టికల్ ప్రోగ్రామ్స్ గురించి తెలుగులో నేర్చుకుందాం.";');

let intro7_en = '<p>Welcome to <strong>Phase 4 (Part 2): C switch-case, Fall-Through Mechanics & 7 Decision Programs Masterclass</strong>! When a program must branch across numerous fixed constant options (such as menu choices, state machines, or arithmetic operations), writing long <code>else-if</code> chains becomes verbose and slow. The C <strong><code>switch-case</code></strong> construct solves this by allowing compilers to generate ultra-fast <strong>$O(1)$ Jump Tables</strong>. In this comprehensive guide, you will master the internal architecture of <code>switch</code>, the critical role of <code>break</code>, intentional fall-through grouping, and construct <strong>7 complete production-grade practical decision algorithms</strong>.</p>';
let intro7_te = '<p><strong>Phase 4 (Part 2): C switch-case, Fall-Through Mechanics & 7 Decision Programs Masterclass</strong> కు స్వాగతం! ఒకే వేరియబుల్ కి చాలా ఆప్షన్స్ ఉన్నప్పుడు (ఉదాహరణకి మెనూ ఆప్షన్స్ లో 1, 2, 3 అని ఉన్నప్పుడు), పెద్ద పెద్ద <code>else-if</code> కండిషన్స్ రాస్తే కోడ్ అర్థం చేసుకోవడం కష్టంగా ఉంటుంది మరియు రన్ అవ్వడానికి కూడా టైం పడుతుంది. దీనికి సొల్యూషనే C లో ఉన్న <strong><code>switch-case</code></strong>. ఇది <strong>$O(1)$ Jump Tables</strong> ని క్రియేట్ చేసి కోడ్ ని చాలా ఫాస్ట్ గా రన్ అయ్యేలా చేస్తుంది. ఈ గైడ్ లో, <code>switch</code> ఇంటర్నల్ గా ఎలా పనిచేస్తుంది, <code>break</code> రాయకపోతే ఏమవుతుంది (Fall-Through), మరియు దాన్ని వాడుకొని <strong>7 రియల్ వరల్డ్ ప్రాక్టికల్ ప్రోగ్రామ్స్</strong> ఎలా రాయాలో తెలుగులో నేర్చుకుందాం.</p>';
content = content.replace(intro7_en, intro7_te);

content = content.replace('<div class="section-title"><span class="num">1</span>switch-case Mechanics &amp; Jump Table Optimization Under the Hood</div>', '<div class="section-title"><span class="num">1</span>switch-case ఎలా పనిచేస్తుంది? (Jump Table Optimization)</div>');
content = content.replace('<p>In C, <code>switch</code> operates exclusively on <strong>Integral Values (<code>int</code>, <code>char</code>, <code>enum</code>)</strong>. Floating-point numbers (<code>float</code>, <code>double</code>) and strings (<code>char[]</code>) are NOT allowed in C switch statements!</p>', '<p>C లాంగ్వేజ్ లో <code>switch</code> కండిషన్ లోపల కేవలం <strong>ఇంటీజర్స్, క్యారెక్టర్స్ (<code>int</code>, <code>char</code>, <code>enum</code>)</strong> మాత్రమే పాస్ చేయాలి. పాయింట్ నంబర్స్ (<code>float</code>, <code>double</code>) లేదా పేర్లని (strings) <code>switch</code> లో వాడకూడదు!</p>');

content = content.replace('<h4>⚙️ Why switch is Faster than else-if (Jump Tables)</h4>', '<h4>⚙️ else-if కంటే switch ఎందుకు చాలా ఫాస్ట్ గా ఉంటుంది?</h4>');
content = content.replace('<p>• <strong><code>else-if</code> Chain:</strong> Checks conditions linearly one-by-one ($O(N)$ time complexity). If matching branch is at the 10th position, 10 comparisons are executed.<br>', '<p>• <strong><code>else-if</code> అయితే:</strong> పైనుండి కిందకు లైన్ గా ఒక్కొక్క కండిషన్ ని చెక్ చేసుకుంటూ వస్తుంది ($O(N)$ టైం). ఒకవేళ కరెక్ట్ ఆన్సర్ 10వ స్థానంలో ఉంటే, అది 10 సార్లు చెక్ చేసాకే రన్ అవుతుంది.<br>');
content = content.replace('• <strong><code>switch-case</code>:</strong> GCC compiler case values ni array of jump memory addresses (<strong>Jump Table / Branch Table</strong>) ga compile chesthundi. CPU directly computes target branch address in <strong>$O(1)$ Instant Time</strong>!</p>', '• <strong><code>switch-case</code> అయితే:</strong> C కంపైలర్ వీటన్నింటికీ <strong>Jump Table (జంప్ టేబుల్)</strong> అనే దాన్ని ముందే క్రియేట్ చేసి పెట్టుకుంటుంది. సో, అది ఫస్ట్ నుండి చెక్ చేయకుండా, డైరెక్ట్ గా కరెక్ట్ ఆన్సర్ ఎక్కడుందో అక్కడికి <strong>$O(1)$ Instant టైం</strong> లో జంప్ చేసి రన్ చేస్తుంది!</p>');

content = content.replace('<div class="section-title"><span class="num">2</span>The break Statement &amp; Fall-Through Behavior</div>', '<div class="section-title"><span class="num">2</span>break వాడకం &amp; Fall-Through (బ్రేక్ వేయకపోతే ఏమవుతుంది?)</div>');
content = content.replace('<p>In C, when a matching <code>case</code> is found, execution continues sequentially into subsequent cases until a <strong><code>break;</code></strong> is reached or switch block ends. This is called <strong>Fall-Through</strong>:</p>', '<p>C లో, <code>switch</code> లోపల కరెక్ట్ <code>case</code> దొరికినప్పుడు, దానికి చివర్లో <strong><code>break;</code></strong> లేకపోతే ఆ కింది cases అన్నీ కూడా వరసగా రన్ అయిపోతాయి! దీన్నే <strong>Fall-Through</strong> అంటారు:</p>');

content = content.replace('<h4>💡 Deliberate Fall-Through for Grouping Cases</h4>', '<h4>💡 ఒకే ఆన్సర్ ఉన్నప్పుడు Fall-Through ని వాడుకోవడం</h4>');
content = content.replace('<p>Multiple cases ki same execution logic unte, <code>break</code> omit chesi group cheyyavachu:</p>', '<p>ఒకవేళ చాలా cases కి ఒకే లాజిక్ రన్ అవ్వాలి అనుకుంటే, మధ్యలో <code>break</code> ని కావాలనే తీసేసి గ్రూప్ గా రాయొచ్చు:</p>');

content = content.replace('<div class="section-title"><span class="num">3</span>7 Real-World Practical Decision Programs (Step-by-Step)</div>', '<div class="section-title"><span class="num">3</span>7 రియల్-వరల్డ్ ప్రాక్టికల్ ప్రోగ్రామ్స్ (Step-by-Step)</div>');
content = content.replace('<p>Mastering conditions through 7 foundational programming algorithms:</p>', '<p>ఇప్పటివరకు నేర్చుకున్న కండిషన్స్ తో 7 ముఖ్యమైన ప్రాక్టికల్ ప్రోగ్రామ్స్ రాద్దాం:</p>');

content = content.replace('<h4 style="color:#10b981;">Programs 1 &amp; 2: Even/Odd &amp; Positive/Negative/Zero Checker</h4>', '<h4 style="color:#10b981;">ప్రోగ్రామ్స్ 1 &amp; 2: నంబర్ సరిసంఖ్య (Even) / బేసిసంఖ్య (Odd) &amp; Positive / Negative</h4>');
content = content.replace('<h4 style="color:#10b981;">Programs 3 &amp; 4: Largest of Three Numbers &amp; Leap Year Checker</h4>', '<h4 style="color:#10b981;">ప్రోగ్రామ్స్ 3 &amp; 4: మూడిట్లో పెద్ద సంఖ్య &amp; లీప్ ఇయర్ (Leap Year) కనుక్కోవడం</h4>');
content = content.replace('<h4 style="color:#10b981;">Programs 5, 6 &amp; 7: Menu Calculator using switch &amp; Voting Eligibility</h4>', '<h4 style="color:#10b981;">ప్రోగ్రామ్స్ 5, 6 &amp; 7: Switch క్యాలిక్యులేటర్ &amp; ఓటు వేయడానికి అర్హత ఉందా?</h4>');

fs.writeFileSync(path, content, 'utf8');
console.log('updated c phase 4 successfully');
