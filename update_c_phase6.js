const fs = require('fs');
const path = 'scratch/build_c_phase6.js';

let content = fs.readFileSync(path, 'utf8');

// LESSON 10 Replaces
content = content.replace(/const title = "C Functions, Prototypes, Scope & static Local Variables";/, 'const title = "C Functions, Prototypes, Scope & static Local Variables (తెలుగులో)";');
content = content.replace(/const desc = "Master C Functions \(Phase 6 Part 1\): Function declaration \(prototypes\), definitions, function calls, parameters vs arguments, return types, void, local vs global scope, static local variables in data segment, and header files \(\.h\) for modular code reuse\.";/, 'const desc = "C Functions (Phase 6 Part 1): C లో Functions అంటే ఏంటి, Prototypes, Parameters vs Arguments, void అంటే ఏంటి, Local మరియు Global variables, static గురించి తెలుగులో నేర్చుకుందాం.";');

let intro10_en = '<p>Welcome to <strong>Phase 6 (Part 1): C Functions, Prototypes, Storage Classes & Modular Architecture Masterclass</strong>! Writing all code inside a monolithic <code>main()</code> function leads to spaghetti code, difficult debugging, and zero reusability. <strong>Functions</strong> enable <em>Modular Programming</em> by breaking complex systems into isolated, testable, and reusable building blocks. In this comprehensive guide, you will master the 3 structural phases of C functions, compiler function prototypes, parameter passing semantics, <code>void</code> return types, the powerful persistence of <code>static</code> local variables, and structuring professional multi-file header libraries.</p>';
let intro10_te = '<p><strong>Phase 6 (Part 1): C Functions & Modular Architecture Masterclass</strong> కు స్వాగతం! మన కోడ్ మొత్తాన్ని ఒకే <code>main()</code> ఫంక్షన్ లో రాస్తే, అది చూడటానికి కన్ఫ్యూజింగ్ గా ఉంటుంది మరియు ఎక్కడ తప్పు జరిగిందో కనిపెట్టడం కష్టం అవుతుంది. దీన్ని సాల్వ్ చేయడానికి <strong>Functions</strong> వాడతాం. పెద్ద ప్రోగ్రామ్ ని చిన్న చిన్న ముక్కలుగా విడదీసి ఎక్కడ కావాలంటే అక్కడ వాడుకునేలా చేయడమే ఫంక్షన్స్ స్పెషాలిటీ. ఈ గైడ్ లో, ఫంక్షన్ రాయడానికి కావాల్సిన 3 ముఖ్యమైన స్టెప్స్, ఫంక్షన్ ప్రోటోటైప్స్, పారామీటర్స్, <code>void</code> అంటే ఏంటి, <code>static</code> వేరియబుల్స్ ఎలా పనిచేస్తాయి, మరియు <code>.h</code> ఫైల్స్ తో ప్రొఫెషనల్ ప్రాజెక్ట్స్ ఎలా క్రియేట్ చేయాలో తెలుగులో నేర్చుకుందాం.</p>';
content = content.replace(intro10_en, intro10_te);

content = content.replace('<div class="section-title"><span class="num">1</span>Function Architecture &amp; The 3 Pillars of C Functions</div>', '<div class="section-title"><span class="num">1</span>Functions అంటే ఏంటి? &amp; వాటిలో ఉండే 3 స్టెప్స్</div>');
content = content.replace('<p><strong>Function</strong> ante specific task perform chese self-contained block of instructions. \n      C lo function use cheyyadaniki <strong>3 Mandatory Stages</strong> untayi:</p>', '<p><strong>Function</strong> అంటే ఒక పర్టికులర్ పని చేయడానికి మనం రాసుకున్న ఒక చిన్న కోడ్ బ్లాక్. \n      C లో ఫంక్షన్ ని వాడాలంటే ఈ <strong>3 స్టెప్స్ (Stages)</strong> కచ్చితంగా ఉండాలి:</p>');

content = content.replace('<li><strong>1. Function Declaration (Prototype):</strong> <code>int add(int first, int second);</code><br>\n        Compiler ki function return type, function name, mariyu parameter types ni <code>main()</code> mundhe theliyajeyyadam.</li>', '<li><strong>1. Declaration (Prototype):</strong> <code>int add(int first, int second);</code><br>\n        మనం ఒక ఫంక్షన్ రాస్తున్నామని, దానికి ఏ పేరు పెడుతున్నామో, అది ఏ వాల్యూ ఇస్తుందో <code>main()</code> కంటే ముందే కంపైలర్ కి చెప్పడం.</li>');
content = content.replace('<li><strong>2. Function Call (Invocation):</strong> <code>int result = add(10, 20);</code><br>\n        Function ni execute cheyyadaniki arguments pass chesi call cheyyadam.</li>', '<li><strong>2. Function Call (పిలవడం):</strong> <code>int result = add(10, 20);</code><br>\n        ఆ ఫంక్షన్ మనకు ఎప్పుడు కావాలంటే అప్పుడు వాల్యూస్ (Arguments) పాస్ చేసి దాన్ని రన్ అయ్యేలా పిలవడం.</li>');
content = content.replace('<li><strong>3. Function Definition (Implementation):</strong> <code>int add(int first, int second) { return first + second; }</code><br>\n        Function actual execution logic ni braces <code>{ ... }</code> lo implement cheyyadam.</li>', '<li><strong>3. Definition (కోడ్ రాయడం):</strong> <code>int add(int first, int second) { return first + second; }</code><br>\n        ఆ ఫంక్షన్ అసలు ఏం పని చేయాలో ఆ బ్రాకెట్స్ <code>{ ... }</code> మధ్యలో పూర్తి కోడ్ రాయడం.</li>');

content = content.replace('<h4>💡 Parameters vs Arguments Explained</h4>', '<h4>💡 Parameters కి Arguments కి తేడా ఏంటి?</h4>');
content = content.replace('<p>• <strong>Parameters (Formal Parameters):</strong> Function definition/prototype lo declare chesina variables (e.g. <code>int first, int second</code>).<br>', '<p>• <strong>Parameters (పారామీటర్లు):</strong> మనం ఫంక్షన్ రాసేటప్పుడు ఆ బ్రాకెట్స్ లో తీసుకునే ఖాళీ వేరియబుల్స్ (ఉదాహరణకి <code>int first, int second</code>). ఇవి బాక్స్ ల లాంటివి.<br>');
content = content.replace('• <strong>Arguments (Actual Parameters):</strong> Function call chesthunnapudu pass chese real values or variables (e.g. <code>10, 20</code>).</p>', '• <strong>Arguments (ఆర్గ్యుమెంట్స్):</strong> మనం ఫంక్షన్ ని కాల్ చేసినప్పుడు ఆ బాక్స్ లలో వేసే నిజమైన వాల్యూస్ (ఉదాహరణకి <code>10, 20</code>).</p>');

content = content.replace('<div class="section-title"><span class="num">2</span>Return Types, Multiple Parameters &amp; void Functions</div>', '<div class="section-title"><span class="num">2</span>Return Types &amp; "void" అంటే ఏంటి?</div>');
content = content.replace('<p>C functions can return any primitive type (<code>int</code>, <code>float</code>, <code>double</code>, <code>char</code>) or pointers. \n      Oka function emi value return cheyyakapothe daani return type <strong><code>void</code></strong> ga declare chesthamu:</p>', '<p>C లో ఫంక్షన్స్ రన్ అయ్యాక ఒక వాల్యూ ని తిరిగి ఇవ్వగలవు (<code>int</code>, <code>float</code>, <code>char</code> వగైరా). \n      ఒకవేళ మన ఫంక్షన్ లోపల పని చేసుకొని బయటికి ఏమీ వాల్యూ ఇవ్వకపోతే, దాన్ని <strong><code>void</code> (ఏమీ ఇవ్వదు)</strong> అని చెప్తాము:</p>');

content = content.replace('<div class="section-title"><span class="num">3</span>Local vs Global vs static Local Variables in C ⭐</div>', '<div class="section-title"><span class="num">3</span>Local vs Global vs static Variables అంటే ఏంటి? ⭐</div>');
content = content.replace('<p>In C, variable storage classes determine memory segment placement and lifetime:</p>', '<p>C లో ఒక వేరియబుల్ ని ఎక్కడ క్రియేట్ చేసామనే దాన్ని బట్టి అది మెమరీలో ఎక్కడ సేవ్ అవుతుంది, ఎంత సేపు ఉంటుంది అనేది మారుతుంది:</p>');

content = content.replace('<tr><th>Variable Type</th><th>Memory Location in RAM</th><th>Lifetime in Memory</th><th>Value Persistence</th></tr>', '<tr><th>వేరియబుల్ రకం</th><th>RAM లో ఎక్కడ ఉంటుంది?</th><th>ఎంత సేపు బ్రతికుటుంది? (Lifetime)</th><th>దాని వాల్యూ ఏమవుతుంది?</th></tr>');
content = content.replace('<td><strong>Standard Local Variable</strong></td><td>Stack Frame</td><td>Created on call; <strong>Destroyed when function exits</strong></td><td>Re-initialized every function call.</td>', '<td><strong>లోకల్ వేరియబుల్ (Local)</strong></td><td>Stack మెమరీలో</td><td>ఫంక్షన్ కాల్ అవ్వగానే పుడుతుంది; <strong>ఫంక్షన్ అవ్వగానే చనిపోతుంది</strong></td><td>ప్రతిసారీ కొత్తగా స్టార్ట్ అవుతుంది (పాత వాల్యూ మర్చిపోతుంది).</td>');
content = content.replace('<td><strong><code>static</code> Local Variable</strong></td><td><strong>Data Segment</strong></td><td><strong>Persists across entire program runtime!</strong></td><td><strong>Retains its previous value</strong> across function calls!</td>', '<td><strong><code>static</code> లోకల్ వేరియబుల్</strong></td><td><strong>Data Segment లో</strong></td><td><strong>ప్రోగ్రామ్ మొత్తం రన్ అయ్యేదాకా బ్రతికే ఉంటుంది!</strong></td><td><strong>పాత వాల్యూ ని గుర్తుపెట్టుకుంటుంది!</strong> (ఫంక్షన్ అయిపోయినా వాల్యూ డిలీట్ అవ్వదు).</td>');
content = content.replace('<td><strong>Global Variable</strong></td><td>Data Segment</td><td>Entire program runtime</td><td>Accessible everywhere across file.</td>', '<td><strong>గ్లోబల్ వేరియబుల్ (Global)</strong></td><td>Data Segment లో</td><td>ప్రోగ్రామ్ మొత్తం రన్ అయ్యేదాకా</td><td>ఏ ఫంక్షన్ లోనుండైనా డైరెక్ట్ గా వాడుకోవచ్చు.</td>');

content = content.replace('<div class="section-title"><span class="num">4</span>Header Files (.h) &amp; Reusable Code Architecture</div>', '<div class="section-title"><span class="num">4</span>Header Files (.h) తో ప్రొఫెషనల్ కోడ్ స్ట్రక్చర్</div>');
content = content.replace('<h4>📁 Professional C Project Organization (.h vs .c)</h4>', '<h4>📁 రియల్-టైం లో C ప్రాజెక్ట్స్ ఎలా క్రియేట్ చేస్తారు? (.h vs .c)</h4>');
content = content.replace('<p>• <strong><code>my_math.h</code> (Header File):</strong> Contains function prototypes, constant macros (<code>#define</code>), and struct declarations.<br>', '<p>• <strong><code>my_math.h</code> (హెడర్ ఫైల్):</strong> ఇందులో కేవలం ఫంక్షన్ ప్రోటోటైప్స్ (పేర్లు) మాత్రమే రాస్తారు (అసలు కోడ్ రాయరు).<br>');
content = content.replace('• <strong><code>my_math.c</code> (Source File):</strong> Contains actual function definitions/code implementation.<br>', '• <strong><code>my_math.c</code> (సోర్స్ ఫైల్):</strong> ఆ ఫంక్షన్స్ లోపల అసలు ఏం జరగాలో మొత్తం రియల్ కోడ్ ఇక్కడ రాస్తారు.<br>');
content = content.replace('• <strong><code>main.c</code>:</strong> Includes the header <code>#include "my_math.h"</code> and uses the library functions cleanly!</p>', '• <strong><code>main.c</code> (మెయిన్ ఫైల్):</strong> ఫస్ట్ లైన్ లో <code>#include "my_math.h"</code> అని చెప్పి, ఆ ఫంక్షన్స్ అన్నింటినీ క్లీన్ గా వాడుకుంటారు!</p>');


// LESSON 11 Replaces
content = content.replace(/const title = "C Pass-by-Value vs Address, Recursion & 5 Modular Projects";/, 'const title = "C Pass-by-Value vs Address, Recursion & 5 Modular Projects (తెలుగులో)";');
content = content.replace(/const desc = "Master Advanced C Functions \(Phase 6 Part 2\): Pass-by-value vs pass-by-reference \(address pointers\), stack frame execution lifecycle, recursion base cases, call stack mechanics, avoiding stack overflow, and 5 complete modular projects \(Calculator, Student Grading, Number Utility Library, Unit Converter, Menu-driven app\)\.";/, 'const desc = "Advanced C Functions (Phase 6 Part 2): Pass-by-value కి Pass-by-reference కి తేడా, మెమరీ అడ్రస్ ద్వారా వాల్యూస్ మార్చడం, Recursion అంటే ఏంటి, Stack Overflow ఎందుకు వస్తుంది, మరియు 5 రియల్-వరల్డ్ ప్రాజెక్ట్స్ గురించి తెలుగులో నేర్చుకుందాం.";');

let intro11_en = '<p>Welcome to <strong>Phase 6 (Part 2): C Parameter Passing, Stack Frames, Recursion & 5 Modular Projects Masterclass</strong>! Understanding how arguments travel across RAM memory into function boundaries is the defining bridge between intermediate and advanced C programming. In this comprehensive guide, you will master the difference between <strong>Call by Value</strong> (safe isolated copies) and <strong>Call by Address / Reference</strong> (in-place memory mutation via pointers), analyze the internal CPU <strong>Call Stack lifecycle</strong> during recursive self-invocations, and engineer <strong>5 complete real-world modular applications</strong>.</p>';
let intro11_te = '<p><strong>Phase 6 (Part 2): C Parameter Passing & Recursion Masterclass</strong> కు స్వాగతం! ఒక ఫంక్షన్ కి వాల్యూస్ పాస్ చేసినప్పుడు RAM మెమరీలో ఏం జరుగుతుంది అనేది తెలుసుకోవడం ద్వారా మీరు అడ్వాన్స్డ్ C ప్రోగ్రామర్ అవ్వగలరు. ఈ గైడ్ లో, <strong>Call by Value</strong> (కాపీని పంపడం) కి మరియు <strong>Call by Reference</strong> (మెమరీ అడ్రస్ నే పంపడం) కి మధ్య ఉన్న డిఫరెన్స్ ఏంటో నేర్చుకుందాం. అలాగే ఒక ఫంక్షన్ తనని తానే మళ్ళీ కాల్ చేసుకునే <strong>Recursion (రికర్శన్)</strong> ఎలా రన్ అవుతుంది, Stack Overflow ఎలా ఆపాలి, మరియు ఈ కాన్సెప్ట్స్ వాడుకొని <strong>5 రియల్ టైం మాడ్యులర్ ప్రాజెక్ట్స్</strong> ని ఎలా రాయాలో తెలుగులో నేర్చుకుందాం.</p>';
content = content.replace(intro11_en, intro11_te);

content = content.replace('<div class="section-title"><span class="num">1</span>Pass-by-Value vs Pass-by-Address (Call by Reference) ⭐</div>', '<div class="section-title"><span class="num">1</span>Pass-by-Value కి Pass-by-Address కి తేడా ఏంటి? ⭐</div>');
content = content.replace('<h4>1. Pass by Value (Default in C)</h4>', '<h4>1. Pass by Value (కాపీ పంపడం)</h4>');
content = content.replace('<p>Function ki variable copy mathrame velthundhi. Function lopala variable ni change chesina, <code>main()</code> lo unna original variable value change avvadhu!</p>', '<p>మనం ఫంక్షన్ కి ఒక వేరియబుల్ ఇస్తే, అది ఒక <strong>నకిలీ కాపీని (Xerox copy)</strong> మాత్రమే తీసుకుంటుంది. కాబట్టి ఫంక్షన్ లోపల దాన్ని ఎంత మార్చినా, మన <code>main()</code> లో ఉన్న అసలైన వాల్యూ మారదు!</p>');
content = content.replace('<h4>2. Pass by Address / Pointer (Call by Reference)</h4>', '<h4>2. Pass by Address (మెమరీ అడ్రస్ పంపడం)</h4>');
content = content.replace('<p>Function ki variable యొక్క **RAM Memory Address (<code>&amp;var</code>)** pass chesthamu. Function pointer <code>*ptr</code> tho direct ga caller memory slot ni modify chesthundhi (e.g. Swapping two numbers)!</p>', '<p>మనం ఫంక్షన్ కి డైరెక్ట్ గా మన వేరియబుల్ ఉన్న **RAM మెమరీ అడ్రస్ (<code>&amp;var</code>)** ఇచ్చేస్తాము. అప్పుడు ఫంక్షన్ ఒక పాయింటర్ (<code>*ptr</code>) వాడి డైరెక్ట్ గా ఒరిజినల్ మెమరీ లోనే వాల్యూస్ మారుస్తుంది! (దీనికే పాయింటర్స్ వాడతారు).</p>');

content = content.replace('<div class="section-title"><span class="num">2</span>Recursion Mechanics &amp; The CPU Call Stack Architecture</div>', '<div class="section-title"><span class="num">2</span>Recursion (రికర్శన్) &amp; CPU కాలింగ్ స్టాక్ ఎలా పనిచేస్తుంది?</div>');
content = content.replace('<p><strong>Recursion</strong> ante oka function thanani thane direct ga or indirect ga call chesukovadam. \n      Every recursive function must have 2 mandatory parts:</p>', '<p><strong>Recursion</strong> అంటే ఒక ఫంక్షన్ తన లోపల నుండి మళ్ళీ తననే (తన పేరుతోనే) కాల్ చేసుకోవడం. \n      ఇలా రాసినప్పుడు కచ్చితంగా ఈ 2 రూల్స్ ఫాలో అవ్వాలి (లేకపోతే క్రాష్ అవుతుంది):</p>');
content = content.replace('<li><strong>1. Base Case (Stopping Condition):</strong> Recursion infinite loop lo vellakunda terminate chese condition (e.g. <code>if (n &lt;= 1) return 1;</code>). Missing base case causes a <strong>Stack Overflow Crash</strong>!</li>', '<li><strong>1. Base Case (ఎక్కడ ఆగాలో చెప్పడం):</strong> తనని తాను ఎప్పటిదాకా కాల్ చేసుకోవాలో ఒక లిమిట్ (కండిషన్) పెట్టాలి (ఉదాహరణకి <code>if (n &lt;= 1) return 1;</code>). ఇది రాయకపోతే ప్రోగ్రామ్ ఆగకుండా రన్ అయ్యి <strong>Stack Overflow</strong> ఎర్రర్ తో క్రాష్ అయిపోతుంది!</li>');
content = content.replace('<li><strong>2. Recursive Step:</strong> Problem size ni reduce chesthu smaller input tho self-call cheyyadam (e.g. <code>return n * factorial(n - 1);</code>).</li>', '<li><strong>2. Recursive Step (ప్రాబ్లమ్ ని చిన్నది చేయడం):</strong> ప్రతిసారీ తనని తాను కాల్ చేసుకునేటప్పుడు, ముందు కంటే చిన్న నంబర్ ఇచ్చి కాల్ చేయాలి (ఉదాహరణకి <code>return n * factorial(n - 1);</code>).</li>');

let rDiag11_en = `      <div class="stack-diagram">
        <strong>CPU Call Stack Frame Lifecycle for factorial(3):</strong><br>
        <br>
        [ PUSHING STACK FRAMES ]                  [ UNWINDING &amp; RETURNING ]<br>
        │ factorial(1) -&gt; returns 1 (Base Case)  │  returns 1<br>
        │ factorial(2) -&gt; 2 * factorial(1)       │  returns 2 * 1 = 2<br>
        │ factorial(3) -&gt; 3 * factorial(2)       │  returns 3 * 2 = 6<br>
        │ main()                                 │  main() receives 6!
      </div>`;
let rDiag11_te = `      <div class="stack-diagram">
        <strong>factorial(3) కోసం CPU Call Stack ఎలా రన్ అవుతుంది?:</strong><br>
        <br>
        [ లోపలికి వెళ్తూ కాల్ చేస్తుంది ]             [ రివర్స్ లో ఆన్సర్ ఇస్తూ వస్తుంది ]<br>
        │ factorial(1) -&gt; returns 1 (Base Case)  │  returns 1<br>
        │ factorial(2) -&gt; 2 * factorial(1)       │  returns 2 * 1 = 2<br>
        │ factorial(3) -&gt; 3 * factorial(2)       │  returns 3 * 2 = 6<br>
        │ main()                                 │  main() కి ఫైనల్ గా 6 వస్తుంది!
      </div>`;
content = content.replace(rDiag11_en, rDiag11_te);

content = content.replace('<div class="section-title"><span class="num">3</span>5 Complete Modular Software Projects</div>', '<div class="section-title"><span class="num">3</span>5 రియల్-వరల్డ్ మాడ్యులర్ సాఫ్ట్‌వేర్ ప్రాజెక్ట్స్</div>');
content = content.replace('<p>Practical implementation of production-style modular functions across 5 distinct domains:</p>', '<p>ఇప్పటివరకు నేర్చుకున్న ఫంక్షన్స్ వాడుకొని ఒక ప్రొఫెషనల్ లాగా ఈ 5 ప్రాజెక్ట్స్ ఎలా రాయాలో చూద్దాం:</p>');

content = content.replace('<h4 style="color:#10b981;">Projects 1 &amp; 2: Modular Calculator &amp; Student Grading System</h4>', '<h4 style="color:#10b981;">ప్రాజెక్ట్స్ 1 &amp; 2: మల్టిపుల్ ఫంక్షన్స్ తో క్యాలిక్యులేటర్ &amp; స్టూడెంట్ గ్రేడింగ్</h4>');
content = content.replace('<h4 style="color:#10b981;">Projects 3, 4 &amp; 5: Number Utility Library, Unit Converter &amp; Recursion</h4>', '<h4 style="color:#10b981;">ప్రాజెక్ట్స్ 3, 4 &amp; 5: ప్రైమ్ నంబర్ చెక్, యూనిట్స్ మార్చడం &amp; రికర్శన్ ఫ్యాక్టోరియల్</h4>');


fs.writeFileSync(path, content, 'utf8');
console.log('updated c phase 6 successfully');
