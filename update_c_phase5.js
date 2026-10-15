const fs = require('fs');
const path = 'scratch/build_c_phase5.js';

let content = fs.readFileSync(path, 'utf8');

// LESSON 8 Replaces
content = content.replace(/const title = "C Loops: for, while, do-while, break, continue & Control Flow";/, 'const title = "C Loops: for, while, do-while, break, continue & Control Flow (తెలుగులో)";');
content = content.replace(/const desc = "Master C Loop Control Structures \(Phase 5 Part 1\): Why loops are needed, The 3 Pillars \(Initialization, Condition, Update\), for loop mechanics, entry-controlled while vs exit-controlled do-while, break and continue jump statements, infinite loop causes and fixes, and array\/string traversal\.";/, 'const desc = "C Loops (Phase 5 Part 1): C లో లూప్స్ ఎందుకు వాడాలి, for loop, while మరియు do-while లూప్స్ ఎలా పనిచేస్తాయి, వాటి మధ్య తేడాలు, break మరియు continue ఎప్పుడు వాడాలి, infinite loop ప్రాబ్లమ్స్ గురించి తెలుగులో నేర్చుకుందాం.";');

let intro8_en = '<p>Welcome to <strong>Phase 5 (Part 1): C Loops, Iteration Mechanics & Control Flow Masterclass</strong>! In programming, repetitive manual execution violates the core DRY (Don\'t Repeat Yourself) principle. <strong>Loops</strong> allow your CPU to execute a block of instructions millions of times with microscopic precision and high performance. In this comprehensive guide, you will master the 3 structural pillars of every loop, the internal mechanics of the <code>for</code> loop, entry-controlled <code>while</code> loops vs exit-controlled <code>do-while</code> loops, control jump statements (<code>break</code> and <code>continue</code>), diagnosing infinite loop bugs, and traversing memory arrays and string buffers.</p>';
let intro8_te = '<p><strong>Phase 5 (Part 1): C Loops & Control Flow Masterclass</strong> కు స్వాగతం! ప్రోగ్రామింగ్ లో ఒకే పనిని మళ్ళీ మళ్ళీ రాయడాన్ని తప్పుగా భావిస్తారు (DRY - Don\'t Repeat Yourself). <strong>లూప్స్ (Loops)</strong> ని వాడితే, కంప్యూటర్ ఒకే పనిని ఏమాత్రం తప్పు లేకుండా లక్షల సార్లు చాలా ఫాస్ట్ గా చేయగలదు. ఈ గైడ్ లో, ప్రతి లూప్ కు ఉండే 3 ముఖ్యమైన పిల్లర్స్, <code>for</code> లూప్ ఎలా పనిచేస్తుంది, <code>while</code> కి <code>do-while</code> కి ఉన్న తేడా ఏంటి, లూప్ మధ్యలో ఆపడానికి వాడే <code>break</code> మరియు <code>continue</code>, అలాగే మన ప్రోగ్రామ్ ని హ్యాంగ్ చేసే infinite loop ప్రాబ్లం రాకుండా ఎలా చూసుకోవాలో తెలుగులో నేర్చుకుందాం.</p>';
content = content.replace(intro8_en, intro8_te);

content = content.replace('<div class="section-title"><span class="num">1</span>Why Loops are Needed &amp; The 3 Structural Pillars of Every Loop</div>', '<div class="section-title"><span class="num">1</span>లూప్స్ ఎందుకు కావాలి? &amp; ప్రతి లూప్ కి ఉండే 3 పిల్లర్స్</div>');
content = content.replace('<p>Oka task ni 1,000 times manually repeat cheyyakunda, automated loop construct dwara single line tho execute cheyyavachu. \n      World lo prati loop (regardless of programming language) <strong>3 Mandatory Components</strong> meedha run avthundhi:</p>', '<p>ఒక పనిని వెయ్యి సార్లు మ్యాన్యువల్ గా కోడ్ రాయకుండా, ఆటోమేటిక్ గా ఒకే లైన్ తో రన్ చేయడానికే లూప్స్ వాడతాము. \n      ప్రపంచంలో ఏ ప్రోగ్రామింగ్ లాంగ్వేజ్ లో అయినా లూప్ రన్ అవ్వాలి అంటే ఈ <strong>3 రూల్స్ (పిల్లర్స్)</strong> కచ్చితంగా ఉండాలి:</p>');

content = content.replace('<li><strong>1. Loop Initialization:</strong> Loop counter variable starting value ni set cheyyadam (e.g. <code>int i = 1;</code>).</li>', '<li><strong>1. Initialization (స్టార్టింగ్ పాయింట్):</strong> లూప్ ఎక్కడ మొదలవ్వాలో చెప్పడం (ఉదాహరణకి <code>int i = 1;</code>).</li>');
content = content.replace('<li><strong>2. Loop Condition:</strong> Prati iteration mundhu check chese boundary criteria (e.g. <code>i &lt;= 10;</code>). Condition <code>TRUE</code> unnantha varaku loop run avthundhi.</li>', '<li><strong>2. Condition (ఎక్కడ ఆగాలో చెప్పడం):</strong> ప్రతిసారీ చెక్ చేసే కండిషన్ (ఉదాహరణకి <code>i &lt;= 10;</code>). ఇది నిజం అయినంత కాలం లూప్ రన్ అవుతూనే ఉంటుంది.</li>');
content = content.replace('<li><strong>3. Loop Update (Increment / Decrement):</strong> Counter variable ni target value vaipu move cheyyadam (e.g. <code>i++</code>). Missing update causes an <strong>Infinite Loop Bug</strong>!</li>', '<li><strong>3. Update (ముందుకు వెళ్లడం):</strong> స్టార్టింగ్ పాయింట్ ని కండిషన్ వైపుకి జరపడం (ఉదాహరణకి <code>i++</code>). ఇది రాయకపోతే లూప్ ఎప్పటికీ ఆగిపోదు (Infinite Loop వస్తుంది)!</li>');

let lDiag8_en = `      <div class="loop-diagram">
        <strong>The 4-Step Execution Cycle of a for Loop:</strong><br>
        for ( [1. Init] ; [2. Condition Check] ; [4. Update Counter] ) {<br>
             [3. Execute Loop Body Statements];<br>
        }<br>
        <br>
        Flow Order: [1. Init] ──► [2. Check] (TRUE) ──► [3. Run Body] ──► [4. Update] ──► [2. Check again...]
      </div>`;
let lDiag8_te = `      <div class="loop-diagram">
        <strong>for Loop రన్ అయ్యే 4 స్టెప్స్:</strong><br>
        for ( [1. స్టార్టింగ్] ; [2. కండిషన్ చెక్] ; [4. అప్డేట్] ) {<br>
             [3. లోపల ఉన్న కోడ్ రన్ అవుతుంది];<br>
        }<br>
        <br>
        ఎలా రన్ అవుతుంది: [1. స్టార్ట్] ──► [2. చెక్] (TRUE) ──► [3. లోపల కోడ్ రన్] ──► [4. అప్డేట్] ──► [మళ్ళీ 2. చెక్...]
      </div>`;
content = content.replace(lDiag8_en, lDiag8_te);

content = content.replace('<div class="section-title"><span class="num">2</span>The for Loop (Deterministic Iteration)</div>', '<div class="section-title"><span class="num">2</span>The for Loop (ఎన్ని సార్లు రన్ అవ్వాలో తెలిసినప్పుడు)</div>');
content = content.replace('<p>Number of iterations mundhe thelisinappudu <code>for</code> loop best choice. C99 standard nunchi loop counter variable ni directly for header loni declare cheyyavachu (Block Scope):</p>', '<p>ఒక పని కచ్చితంగా ఇన్ని సార్లు జరగాలి అని మనకు ముందే తెలిసినప్పుడు <code>for</code> లూప్ వాడటం బెస్ట్ చాయిస్. కౌంటర్ వేరియబుల్ (i) ని డైరెక్ట్ గా ఆ లూప్ లోనే క్రియేట్ చేయొచ్చు:</p>');

content = content.replace('<div class="section-title"><span class="num">3</span>while (Entry-Controlled) vs do-while (Exit-Controlled) Loops</div>', '<div class="section-title"><span class="num">3</span>while మరియు do-while Loops మధ్య తేడా</div>');

content = content.replace('<tr><th>Loop Construct</th><th>Condition Check Timing</th><th>Minimum Executions Guaranteed</th><th>Typical Real-World Use Case</th></tr>', '<tr><th>లూప్ పేరు</th><th>కండిషన్ ఎప్పుడు చెక్ చేస్తుంది?</th><th>కనీసం ఎన్ని సార్లు రన్ అవుతుంది?</th><th>రియల్ టైం లో ఎప్పుడు వాడతారు?</th></tr>');
content = content.replace('<td><strong>Entry-Controlled:</strong> Loop body execute avvaka <em>mundhe</em> condition check avthundhi.</td>', '<td><strong>ఫస్ట్ చెకింగ్:</strong> లోపల ఉన్న కోడ్ రన్ అవ్వక <em>ముందే</em> కండిషన్ చెక్ చేస్తుంది.</td>');
content = content.replace('<td><strong>0 times</strong> (Condition first time fail ayithe body zero times run avthundhi).</td>', '<td><strong>0 సార్లు</strong> (ఫస్ట్ టైమే కండిషన్ ఫెయిల్ అయితే అస్సలు రన్ అవ్వదు).</td>');
content = content.replace('<td>File reading, network packet streaming, unknown iteration counts.</td>', '<td>ఫైల్స్ రీడ్ చేయడానికి, ఎన్ని సార్లు రన్ అవ్వాలో తెలియనప్పుడు వాడతారు.</td>');
content = content.replace('<td><strong>Exit-Controlled:</strong> Loop body execute ayina <em>tharvatha</em> condition check avthundhi.</td>', '<td><strong>లాస్ట్ లో చెకింగ్:</strong> లోపల ఉన్న కోడ్ రన్ అయ్యాక <em>చివర్లో</em> కండిషన్ చెక్ చేస్తుంది.</td>');
content = content.replace('<td><strong>1 time guaranteed</strong> (Even if condition is completely false!).</td>', '<td><strong>కనీసం 1 సారి</strong> (కండిషన్ ముందే అబద్ధమైనా సరే ఒకసారైతే పక్కాగా రన్ అవుతుంది!).</td>');
content = content.replace('<td>Interactive Console Menus (Prompt user at least once before checking choice).</td>', '<td>యూజర్ కి ఒకసారైనా మెనూ చూపించాల్సిన అవసరం ఉన్నప్పుడు (ATM మెనూ లాంటివి).</td>');

content = content.replace('<div class="section-title"><span class="num">4</span>break vs continue &amp; Traversing Arrays and Strings</div>', '<div class="section-title"><span class="num">4</span>break vs continue (లూప్ ని కంట్రోల్ చేయడం)</div>');
content = content.replace('<h4>⚡ break vs continue Control Jump Commands</h4>', '<h4>⚡ break మరియు continue అంటే ఏంటి?</h4>');
content = content.replace('<p>• <strong><code>break;</code>:</strong> Loop execution ni ventane terminate chesi loop outer scope ki jump chesthundhi (Search element dorikinappudu loop nunchi exit avvadaniki).<br>', '<p>• <strong><code>break;</code> (బ్రేక్ వేయడం):</strong> లూప్ ని అక్కడికక్కడే ఆపేసి, మొత్తానికి లూప్ లోపలి నుండి బయటికి వచ్చేస్తుంది (కావాల్సిన ఆన్సర్ దొరికాక టైం వేస్ట్ కాకుండా బయటికి రావడానికి).<br>');
content = content.replace('• <strong><code>continue;</code>:</strong> Current iteration lo kindha unna code ni skip chesi, ventane next iteration (update step) ki jump chesthundhi (Even numbers filter cheyyadaniki).</p>', '• <strong><code>continue;</code> (స్కిప్ చేయడం):</strong> దీని కింద ఉన్న కోడ్ ని రన్ చేయకుండా ఆపేసి, దాన్ని స్కిప్ చేసి డైరెక్ట్ గా నెక్స్ట్ రౌండ్ కి వెళ్ళిపోతుంది.</p>');

// LESSON 9 Replaces
content = content.replace(/const title = "C Nested Loops, Star Patterns & 9 Core Practice Algorithms";/, 'const title = "C Nested Loops, Star Patterns & 9 Core Programs (తెలుగులో)";');
content = content.replace(/const desc = "Master C Nested Loops & Classical Algorithms \(Phase 5 Part 2\): 2D Grid coordinate iteration, Star Patterns \(Right Triangle, Pyramids\), Number Patterns, and 9 complete practical algorithms \(Multiplication table, Sum of N, Factorial, Reverse number, Count digits, Prime number, Armstrong number, Fibonacci series\)\.";/, 'const desc = "C Nested Loops (Phase 5 Part 2): Nested Loops అంటే ఏంటి, Star Patterns ని ఎలా ప్రింట్ చేయాలి, Number Patterns లాజిక్, మరియు 9 ముఖ్యమైన ప్రాక్టికల్ అల్గారిథమ్స్ గురించి తెలుగులో నేర్చుకుందాం.";');

let intro9_en = '<p>Welcome to <strong>Phase 5 (Part 2): C Nested Loops, Pattern Printing & 9 Classical Algorithmic Programs Masterclass</strong>! Nested loops are loops placed inside other loops, forming the fundamental building blocks for working with 2D matrices, image pixel grids, game boards, and geometric patterns. In this comprehensive guide, you will master the 2D coordinate model $(i, j)$, step-by-step algorithms for printing star and number patterns, and construct <strong>9 core interview and real-world mathematical algorithms</strong> from scratch.</p>';
let intro9_te = '<p><strong>Phase 5 (Part 2): C Nested Loops & Pattern Printing Masterclass</strong> కు స్వాగతం! ఒక లూప్ లోపల ఇంకో లూప్ ని రాయడాన్ని Nested Loops అంటారు. 2D మ్యాట్రిక్స్, ఇమేజ్ పిక్సెల్స్, గేమ్ బోర్డ్స్, లేదా డిజైన్స్ ని క్రియేట్ చేయడానికి ఇవి చాలా ముఖ్యం. ఈ గైడ్ లో, ఒక లూప్ లోపల ఇంకో లూప్ ఎలా తిరుగుతుంది $(i, j)$, స్టార్ డిజైన్స్ (Star Patterns) ని ఎలా ప్రింట్ చేయాలి, మరియు ఇంటర్వ్యూస్ లో ఎక్కువగా అడిగే <strong>9 ముఖ్యమైన రియల్-వరల్డ్ ప్రోగ్రామ్స్</strong> ని సొంతంగా ఎలా రాయాలో తెలుగులో నేర్చుకుందాం.</p>';
content = content.replace(intro9_en, intro9_te);

content = content.replace('<div class="section-title"><span class="num">1</span>Nested Loops Mechanics &amp; The 2D Grid Coordinate Model</div>', '<div class="section-title"><span class="num">1</span>Nested Loops ఎలా రన్ అవుతాయి? (2D మోడల్)</div>');
content = content.replace('<p>In a nested loop, <strong>outer loop</strong> controls the rows ($i$), and <strong>inner loop</strong> controls the columns ($j$). For each single iteration of the outer loop, the inner loop executes its entire complete cycle:</p>', '<p>Nested loop లో, <strong>బయట ఉన్న లూప్ (Outer Loop)</strong> అడ్డు వరుసలని (Rows) కంట్రోల్ చేస్తుంది, మరియు <strong>లోపల ఉన్న లూప్ (Inner Loop)</strong> నిలువు వరుసలని (Columns) కంట్రోల్ చేస్తుంది. బయటి లూప్ ఒకసారి రన్ అయితే, లోపలి లూప్ పూర్తిగా దాని సైకిల్ అంతా రన్ అవుతుంది:</p>');

content = content.replace('<div class="section-title"><span class="num">2</span>Star Patterns &amp; Number Patterns Step-by-Step</div>', '<div class="section-title"><span class="num">2</span>Star మరియు Number Patterns ని ప్రింట్ చేయడం</div>');
content = content.replace('<h4>⭐ The Universal Pattern Logic:</h4>', '<h4>⭐ పాటర్న్స్ ని ప్రింట్ చేయడానికి లాజిక్:</h4>');
content = content.replace('<p>1. <strong>Outer loop <code>i</code> (1 to N):</strong> Rows count ni track chesthundhi.<br>', '<p>1. <strong>బయటి లూప్ <code>i</code>:</strong> మొత్తం ఎన్ని అడ్డు వరుసలు (Rows) ఉన్నాయో ట్రాక్ చేస్తుంది.<br>');
content = content.replace('2. <strong>Inner loop <code>j</code> (1 to i):</strong> Current row lo enni stars/numbers print cheyyalo decide chesthundhi.<br>', '2. <strong>లోపలి లూప్ <code>j</code>:</strong> ఆ లైన్ లో ఎన్ని స్టార్స్ లేదా నంబర్స్ ప్రింట్ అవ్వాలో డిసైడ్ చేస్తుంది.<br>');
content = content.replace('3. <strong><code>printf("\\\\n")</code>:</strong> Inner loop complete ayyaka next row ki move avthundhi.</p>', '3. <strong><code>printf("\\\\n")</code>:</strong> లోపలి లూప్ ఆగిపోగానే (ఆ లైన్ అయిపోగానే) నెక్స్ట్ లైన్ కి రావడానికి ఇది వాడతాం.</p>');

content = content.replace('<div class="section-title"><span class="num">3</span>The 9 Classical Practice Programs (Formulas &amp; Implementation)</div>', '<div class="section-title"><span class="num">3</span>9 ముఖ్యమైన ప్రాక్టికల్ ప్రోగ్రామ్స్ (ఫార్ములాస్ తో పాటు)</div>');
content = content.replace('<p>Here is the complete implementation of the 9 foundational algorithmic problems requested in the curriculum:</p>', '<p>ప్రతి ప్రోగ్రామర్ కచ్చితంగా నేర్చుకోవాల్సిన 9 ముఖ్యమైన ప్రోగ్రామ్స్ అల్గారిథమ్స్ ఇక్కడ ఇచ్చాం:</p>');

content = content.replace('<h4>📌 Core Mathematical Formulas &amp; Logic:</h4>', '<h4>📌 ఈ ప్రోగ్రామ్స్ లో వాడే లాజిక్ ఫార్ములాస్:</h4>');
content = content.replace('<p>• <strong>Sum of N:</strong> $Sum = \\sum i$<br>', '<p>• <strong>N నంబర్స్ మొత్తం:</strong> $Sum = \\sum i$<br>');
content = content.replace('• <strong>Factorial:</strong> $N! = 1 \\times 2 \\times \\dots \\times N$ (with $0! = 1$)<br>', '• <strong>ఫ్యాక్టోరియల్ (Factorial):</strong> $N! = 1 \\times 2 \\times \\dots \\times N$ (సున్నా ఫ్యాక్టోరియల్ అంటే 1)<br>');
content = content.replace('• <strong>Reverse Number:</strong> $rev = rev \\times 10 + (n \\pmod{10})$; $n /= 10$<br>', '• <strong>నంబర్ రివర్స్ (Reverse Number):</strong> $rev = rev \\times 10 + (n \\pmod{10})$; $n /= 10$<br>');
content = content.replace('• <strong>Prime Number:</strong> Divisible only by 1 and itself ($\\sqrt{N}$ loop boundary)<br>', '• <strong>ప్రైమ్ నంబర్ (Prime Number):</strong> కేవలం 1 తో మరియు అదే నంబర్ తో భాగించబడేది.<br>');
content = content.replace('• <strong>Armstrong Number (3-digit):</strong> $153 = 1^3 + 5^3 + 3^3 = 153$<br>', '• <strong>ఆర్మ్‌స్ట్రాంగ్ నంబర్ (Armstrong):</strong> $153 = 1^3 + 5^3 + 3^3 = 153$<br>');
content = content.replace('• <strong>Fibonacci Series:</strong> $F_n = F_{n-1} + F_{n-2}$ (Starting with 0, 1, 1, 2, 3, 5, 8...)</p>', '• <strong>ఫిబోనాచీ సిరీస్ (Fibonacci):</strong> పక్కపక్కన ఉన్న రెండు నంబర్స్ ని కలిపితే వచ్చేది (0, 1, 1, 2, 3, 5, 8...)</p>');

content = content.replace('<p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this Fibonacci generator and Armstrong number checker in our online GCC compiler:</p>', '<p style="color:var(--text2); font-size:14px; margin-bottom:12px;">ఈ ప్రోగ్రామ్స్ ని మన ఆన్‌లైన్ కంపైలర్ లో రన్ చేసి ఎలా పనిచేస్తున్నాయో చూడండి:</p>');


fs.writeFileSync(path, content, 'utf8');
console.log('updated c phase 5 successfully');
