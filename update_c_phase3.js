const fs = require('fs');
const path = 'scratch/build_c_phase3.js';

let content = fs.readFileSync(path, 'utf8');

// LESSON 4 Replaces
content = content.replace(/const title = "C User Input: scanf\(\), Address Operator \(&\), Buffer Pitfalls & fgets\(\)";/, 'const title = "C User Input: scanf(), Address Operator (&), Buffer Pitfalls & fgets() (తెలుగులో)";');
content = content.replace(/const desc = "Master C User Input \(Phase 3 Part 1\): scanf\(\) mechanics, why the address-of operator \(&\) is required, reading ints, floats, chars, and strings, the infamous input buffer newline pitfall and how to clear it, safe text reading with fgets\(\), and robust input validation\.";/, 'const desc = "C User Input (Phase 3 Part 1): C లో యూజర్ నుండి ఇన్‌పుట్ తీసుకోవడం ఎలా? scanf() వాడకం, మెమరీ అడ్రస్ ఆపరేటర్ (&), input buffer సమస్యలు మరియు వాటి పరిష్కారాలు, fgets() తో సేఫ్ గా స్ట్రింగ్స్ చదవడం గురించి తెలుగులో నేర్చుకుందాం.";');

let intro4_en = '<p>Welcome to <strong>Phase 3 (Part 1): C User Input, scanf(), Buffer Mechanics & fgets() Masterclass</strong>! Writing interactive software requires receiving runtime input from users via the keyboard (Standard Input: <code>stdin</code>). In C, the standard input function is <strong><code>scanf()</code> (Scan Formatted)</strong>. However, because C operates directly with memory addresses, using <code>scanf()</code> requires understanding pointers, the address-of operator (<code>&</code>), and the notorious <strong>stdin input buffer trap</strong> where leftover newline characters corrupt subsequent reads. In this comprehensive guide, you will master reading all data types, solving the buffer newline glitch, reading multi-word strings safely with <code>fgets()</code>, and validating user inputs.</p>';
let intro4_te = '<p><strong>Phase 3 (Part 1): C User Input, scanf(), Buffer Mechanics & fgets() Masterclass</strong> కు స్వాగతం! యూజర్ కీబోర్డ్ ద్వారా ఇచ్చే డేటాని (Standard Input: <code>stdin</code>) మన ప్రోగ్రామ్ లోకి తీసుకోవాలంటే C లో <strong><code>scanf()</code> (Scan Formatted)</strong> అనే ఫంక్షన్ వాడతాం. అయితే, C లాంగ్వేజ్ డైరెక్ట్ గా RAM మెమరీ తో పనిచేస్తుంది కాబట్టి, <code>scanf()</code> వాడేటప్పుడు అడ్రస్ ఆపరేటర్ (<code>&</code>) ఎందుకు పెట్టాలి అనేది తెలుసుకోవడం చాలా ముఖ్యం. అంతేకాకుండా, C లో ఇన్పుట్ తీసుకునేటప్పుడు వచ్చే అతి పెద్ద సమస్య "Input Buffer Trap (మిగిలిపోయిన Newline)". ఈ గైడ్ లో, అన్ని డేటా టైప్స్ కి ఇన్పుట్ ఎలా తీసుకోవాలి, ఆ బఫర్ ప్రాబ్లం ని ఎలా సాల్వ్ చేయాలి, స్పేస్ లతో సహా పేర్లని చదవడానికి <code>fgets()</code> ఎలా వాడాలి అనేది పూర్తిగా తెలుగులో నేర్చుకుందాం.</p>';
content = content.replace(intro4_en, intro4_te);

content = content.replace('<div class="section-title"><span class="num">1</span>scanf() Mechanics & Why the Address Operator (&amp;) is Required</div>', '<div class="section-title"><span class="num">1</span>scanf() ఎలా పనిచేస్తుంది? &amp; ఆపరేటర్ ఎందుకు వాడాలి?</div>');
content = content.replace('<p>In C, functions receive arguments by value (copy). Kani <code>scanf()</code> function user enter chesina value ni manam declare chesina variable lo <strong>Direct ga RAM Memory Address lo write cheyyali</strong>. Andhuke variable peru mundhu <strong>Address-of Operator (<code>&amp;</code>)</strong> pass chesthamu:</p>', '<p>సాధారణంగా ఫంక్షన్స్ లోపలికి వాల్యూస్ కాపీ అవుతాయి. కానీ <code>scanf()</code> అనేది కీబోర్డ్ నుండి తీసుకున్న వాల్యూ ని మనం క్రియేట్ చేసిన వేరియబుల్ యొక్క <strong>RAM మెమరీ అడ్రస్ లో డైరెక్ట్ గా సేవ్ చేయాలి</strong>. అందుకే వేరియబుల్ పేరు ముందు కచ్చితంగా <strong>Address-of Operator (<code>&amp;</code>)</strong> పెడతాము:</p>');

let mDiag_en = `      <div class="memory-diagram">
        <strong>How scanf() writes directly into RAM:</strong><br>
        int age;                   // Allocated at RAM address 0x2000 (currently Garbage value)<br>
        scanf("%d", &amp;age);         // User enters "21"<br>
        <br>
        1. scanf() parses text "21" -&gt; binary 21<br>
        2. scanf() takes address 0x2000 and writes 21 directly into that RAM slot!<br>
        <br>
        RAM Address 0x2000: [  21  ]  &lt;--- age is now safely updated!
      </div>`;
let mDiag_te = `      <div class="memory-diagram">
        <strong>RAM లోకి scanf() డేటాని ఎలా రాస్తుందో చూద్దాం:</strong><br>
        int age;                   // RAM లో 0x2000 అనే అడ్రస్ లో ప్లేస్ వచ్చింది (ఇప్పుడు Garbage value ఉంది)<br>
        scanf("%d", &amp;age);         // యూజర్ "21" అని ఎంటర్ చేసాడు<br>
        <br>
        1. scanf() యూజర్ ఇచ్చిన "21" ని బైనరీ లోకి మారుస్తుంది<br>
        2. తర్వాత scanf() ఆ 0x2000 అడ్రస్ కి వెళ్లి డైరెక్ట్ గా 21 ని అక్కడ సేవ్ చేస్తుంది!<br>
        <br>
        RAM Address 0x2000: [  21  ]  &lt;--- age అప్డేట్ అయిపొయింది!
      </div>`;
content = content.replace(mDiag_en, mDiag_te);

content = content.replace('<h4>⚠️ When is &amp; NOT needed in scanf()?</h4>', '<h4>⚠️ scanf() లో &amp; ఎప్పుడు పెట్టకూడదు?</h4>');
content = content.replace('<p>Strings (character arrays, e.g. <code>char name[50];</code>) lo <code>&amp;</code> pettakkarledu: <code>scanf("%s", name);</code>.<br>', '<p>Strings (పదాలు లేదా పేర్లు, ఉదాహరణకి <code>char name[50];</code>) ని రీడ్ చేసేటప్పుడు <code>&amp;</code> అవసరం లేదు: <code>scanf("%s", name);</code> అని ఇస్తే చాలు.<br>');
content = content.replace('<strong>Why?</strong> C lo array name automatically memory lo unna first element address (<code>&amp;name[0]</code>) ni represent chesthundi!</p>', '<strong>ఎందుకు?</strong> ఎందుకంటే C లో ఒక అర్రే (Array) పేరు రాస్తే, ఆటోమాటిక్ గా అది దాని ఫస్ట్ మెమరీ అడ్రస్ (<code>&amp;name[0]</code>) ని ఇచ్చేస్తుంది!</p>');

content = content.replace('<div class="section-title"><span class="num">2</span>Reading Different Data Types with scanf()</div>', '<div class="section-title"><span class="num">2</span>వేర్వేరు Data Types ని scanf() తో చదవడం</div>');
content = content.replace('<p><code>scanf()</code> requires the matching format specifier for each data type:</p>', '<p>ఏ డేటా కి ఏ ఫార్మాట్ వాడాలో <code>scanf()</code> కి కచ్చితంగా చెప్పాలి:</p>');

content = content.replace('<tr><th>Data Type</th><th>scanf Format Specifier</th><th>Syntax Example</th><th>Crucial Notes</th></tr>', '<tr><th>Data Type</th><th>scanf ఫార్మాట్</th><th>సింటాక్స్</th><th>ముఖ్యమైన విషయం</th></tr>');
content = content.replace('<td>Skips leading whitespaces/newlines automatically.</td>', '<td>ముందున్న స్పేసెస్ ని ఆటోమాటిక్ గా ఇగ్నోర్ చేస్తుంది.</td>');
content = content.replace('<td>Reads 32-bit single precision float.</td>', '<td>32-bit float నంబర్ ని రీడ్ చేస్తుంది.</td>');
content = content.replace('<td>⚠️ Must use <code>%lf</code> in <code>scanf</code> (using <code>%f</code> will corrupt memory!).</td>', '<td>⚠️ scanf లో కచ్చితంగా <code>%lf</code> వాడాలి (తప్పుగా %f వాడితే మెమరీ కరప్ట్ అవుతుంది!).</td>');
content = content.replace('<td>⚠️ Does NOT skip whitespace; leading space in <code>" %c"</code> is mandatory!</td>', '<td>⚠️ స్పేసెస్ ని ఇగ్నోర్ చేయదు! అందుకే <code>" %c"</code> లాగా ముందు ఒక ఖాళీ స్పేస్ ఇవ్వాలి.</td>');
content = content.replace('<td>Reads single word; <strong>stops at first space</strong> or newline.</td>', '<td>ఒక్క పదాన్ని మాత్రమే చదువుతుంది; <strong>స్పేస్ వస్తే ఆగిపోతుంది</strong>.</td>');

content = content.replace('<div class="section-title"><span class="num">3</span>The Dangerous Input Buffer Trap (\\n) &amp; How to Fix It ⚠️</div>', '<div class="section-title"><span class="num">3</span>అందరినీ కన్ఫ్యూజ్ చేసే Input Buffer (\\n) ట్రాప్ ⚠️</div>');
content = content.replace('<h4 style="color:#ff7b72;">⚠️ Why Does scanf("%c") Skip Input After scanf("%d")?</h4>', '<h4 style="color:#ff7b72;">⚠️ scanf("%d") తర్వాత scanf("%c") ఎందుకు స్కిప్ అయిపోతుంది?</h4>');
content = content.replace('<p>User keyboard meedha <code>25</code> type chesi <code>ENTER</code> press chesinappudu, <code>stdin</code> input buffer lo <code>\'2\', \'5\', \'\\\\n\'</code> store avthayi.<br>', '<p>యూజర్ కీబోర్డ్ మీద <code>25</code> టైప్ చేసి <code>ENTER</code> కొట్టినప్పుడు, C కంపైలర్ బఫర్ లో <code>\'2\', \'5\', \'\\\\n\'</code> సేవ్ అవుతాయి.<br>');
content = content.replace('1. <code>scanf("%d", &amp;age)</code> కేవలం <code>25</code> ని read chesi <code>\'\\\\n\'</code> ని buffer lo వదిలేస్తుంది.<br>', '1. ఫస్ట్ ఉన్న <code>scanf("%d", &amp;age)</code> కేవలం <code>25</code> ని మాత్రమే రీడ్ చేసి <code>\'\\\\n\'</code> (ఎంటర్ కీ) ని అక్కడే బఫర్ లో వదిలేస్తుంది.<br>');
content = content.replace('2. Next line lo <code>scanf("%c", &amp;grade)</code> call ayinappudu, adhi user input kosam wait cheyyakunda, buffer lo unna leftover <code>\'\\\\n\'</code> ని read chesi skip aypothundhi!<br>', '2. నెక్స్ట్ లైన్ లో <code>scanf("%c", &amp;grade)</code> కాల్ అయినప్పుడు, అది యూజర్ ఎంటర్ చేసేదాకా ఆగకుండా ఆ మిగిలిపోయిన <code>\'\\\\n\'</code> ని తీసేసుకొని స్కిప్ అయిపోతుంది!<br>');
content = content.replace('✅ <strong>Solution 1:</strong> <code>scanf(" %c", &amp;grade);</code> (Leading space pedithe whitespace/newline ignore avthundhi).<br>', '✅ <strong>సొల్యూషన్ 1:</strong> <code>scanf(" %c", &amp;grade);</code> (ఇలా పర్సంటేజ్ కి ముందు ఖాళీ స్పేస్ ఇస్తే, మిగిలిపోయిన ఆ ఎంటర్ కీ ని ఇగ్నోర్ చేస్తుంది).<br>');
content = content.replace('✅ <strong>Solution 2:</strong> Clear remaining buffer characters with: <code>while((c = getchar()) != \'\\\\n\' &amp;&amp; c != EOF);</code></p>', '✅ <strong>సొల్యూషన్ 2:</strong> బఫర్ ని పూర్తిగా క్లీన్ చేయడానికి ఈ లూప్ వాడొచ్చు: <code>while((c = getchar()) != \'\\\\n\' &amp;&amp; c != EOF);</code></p>');

content = content.replace('<div class="section-title"><span class="num">4</span>Safe Multi-Word Text Input with fgets() (Preventing Buffer Overflow)</div>', '<div class="section-title"><span class="num">4</span>fgets() తో స్పేస్ లతో సహా స్ట్రింగ్స్ ని సేఫ్ గా చదవడం</div>');
content = content.replace('<p><code>scanf("%s", str)</code> is dangerous because it stops at spaces and causes <strong>Buffer Overflow crashes</strong> if input exceeds array size. Professional C developers use <strong><code>fgets()</code></strong>:</p>', '<p><code>scanf("%s")</code> వాడితే మధ్యలో స్పేస్ రాగానే ఆగిపోతుంది. ఒకవేళ యూజర్ సైజు కి మించి పెద్ద పేరు ఇస్తే <strong>Buffer Overflow</strong> వచ్చి ప్రోగ్రామ్ క్రాష్ అవుతుంది. అందుకే ప్రొఫెషనల్ C డెవలపర్స్ ఎప్పుడూ టెక్స్ట్ కోసం <strong><code>fgets()</code></strong> వాడతారు:</p>');

content = content.replace('<p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this interactive user greeting program in our online C compiler:</p>', '<p style="color:var(--text2); font-size:14px; margin-bottom:12px;">ఈ ప్రోగ్రామ్ ని ఆన్‌లైన్ కంపైలర్ లో రన్ చేసి యూజర్ ఇన్పుట్ ని టెస్ట్ చేయండి:</p>');


// LESSON 5 Replaces
content = content.replace(/const title = "C Operators, Precedence & 6 Real-World Practice Programs";/, 'const title = "C Operators, Precedence & 6 Practice Programs (తెలుగులో)";');
content = content.replace(/const desc = "Master C Operators \(Phase 3 Part 2\): Arithmetic, Relational, Logical \(short-circuit evaluation\), Prefix vs Postfix increment\/decrement, Bitwise operators \(&, \|, \^, ~, <<, >>\), Ternary operator, Precedence & Associativity Table, Integer Division, and 6 step-by-step practical programs\.";/, 'const desc = "C Operators (Phase 3 Part 2): అరిథ్మెటిక్, రిలేషనల్, లాజికల్, బిట్-వైస్ ఆపరేటర్లు, ప్రిఫిక్స్/పోస్ట్-ఫిక్స్, టెర్నరీ ఆపరేటర్, precedence మరియు 6 ప్రాక్టికల్ ప్రోగ్రామ్స్ గురించి తెలుగులో నేర్చుకుందాం.";');

let intro5_en = '<p>Welcome to <strong>Phase 3 (Part 2): C Operators, Expression Evaluation & 6 Practice Programs Masterclass</strong>! Operators are the fundamental building blocks that allow you to perform computations, make logical decisions, and manipulate raw binary bits in memory. In this comprehensive guide, you will master all C operator categories (Arithmetic, Relational, Logical, Bitwise, Ternary), prefix vs postfix increment/decrement mechanics, operator precedence & associativity rules, and construct <strong>6 real-world practical computation programs</strong>.</p>';
let intro5_te = '<p><strong>Phase 3 (Part 2): C Operators & 6 Practice Programs Masterclass</strong> కు స్వాగతం! మన ప్రోగ్రామ్ లో మ్యాథ్స్ కాలిక్యులేషన్స్ చేయాలన్నా, కండిషన్స్ చెక్ చేయాలన్నా, లేదా డైరెక్ట్ గా బైనరీ బిట్స్ ని మార్చాలన్నా మనకు <strong>Operators (ఆపరేటర్లు)</strong> కావాలి. ఈ గైడ్ లో, మనం C లో ఉన్న అన్నీ రకాల ఆపరేటర్లను (Arithmetic, Relational, Logical, Bitwise, Ternary), Prefix vs Postfix ల మధ్య ఉన్న తేడాలని, Operator Precedence (ఏ ఆపరేటర్ ఫస్ట్ రన్ అవ్వాలి) టేబుల్ ని, మరియు రియల్ టైం లో వాడే <strong>6 ప్రాక్టికల్ ప్రోగ్రామ్స్</strong> ని తెలుగులో నేర్చుకుందాం.</p>';
content = content.replace(intro5_en, intro5_te);

content = content.replace('<div class="section-title"><span class="num">1</span>Complete C Operators Classification</div>', '<div class="section-title"><span class="num">1</span>C లో ఉండే ఆపరేటర్ల రకాలు</div>');
content = content.replace('<p>C language provides 6 major families of operators:</p>', '<p>C లాంగ్వేజ్ లో ఆపరేటర్లను ముఖ్యంగా 6 రకాలుగా విభజించవచ్చు:</p>');

content = content.replace('<strong style="color:#10b981;">1. Arithmetic Operators</strong>', '<strong style="color:#10b981;">1. Arithmetic (లెక్కల కోసం)</strong>');
content = content.replace('<li><code>%</code> (Modulus / Remainder) ⚠️ <em>Integers only!</em></li>', '<li><code>%</code> (Modulus - శేషం కనుక్కోవడానికి) ⚠️ <em>ఇది పాయింట్ నంబర్స్ కి పనిచేయదు!</em></li>');
content = content.replace('<strong style="color:#38bdf8;">2. Relational (Comparison)</strong>', '<strong style="color:#38bdf8;">2. Relational (పోల్చి చూడటానికి)</strong>');
content = content.replace('<li>Returns <code>1</code> for True, <code>0</code> for False</li>', '<li>కండిషన్ నిజమైతే <code>1</code> (True), అబద్ధం అయితే <code>0</code> (False) ఇస్తుంది.</li>');
content = content.replace('<strong style="color:#a855f7;">3. Logical Operators</strong>', '<strong style="color:#a855f7;">3. Logical (లాజిక్ చెక్ చేయడానికి)</strong>');
content = content.replace('<li><code>!</code> (Logical NOT / Inversion)</li>', '<li><code>!</code> (Logical NOT - ఉన్న వాల్యూ ని రివర్స్ చేస్తుంది)</li>');
content = content.replace('<strong style="color:#eab308;">4. Bitwise Operators</strong>', '<strong style="color:#eab308;">4. Bitwise (బైనరీ బిట్స్ మార్చడానికి)</strong>');
content = content.replace('<li><code>~</code> (NOT / Invert bits)</li>', '<li><code>~</code> (NOT / బిట్స్ ని రివర్స్ చేయడానికి)</li>');

content = content.replace('<div class="section-title"><span class="num">2</span>Prefix vs Postfix (++x / x++) &amp; Ternary Operator</div>', '<div class="section-title"><span class="num">2</span>Prefix (++x) vs Postfix (x++) &amp; Ternary ఆపరేటర్</div>');
content = content.replace('<h4>⚡ Prefix (++x) vs Postfix (x++) Mechanics</h4>', '<h4>⚡ Prefix (++x) కి Postfix (x++) కి తేడా ఏంటి?</h4>');
content = content.replace('<p>• <strong>Prefix (<code>++x</code>):</strong> Value ni <strong>First increment chesi</strong>, tharvatha current expression lo use chesthundhi ("Increment first, use later").<br>', '<p>• <strong>Prefix (<code>++x</code>):</strong> వాల్యూ ని <strong>ముందే ప్లస్ వన్ (+1) చేసి</strong>, ఆ తర్వాత ఆ లైన్ లో ఉన్న మిగతా ఫార్ములాలో వాడుతుంది ("ముందు పెంచు, తర్వాత వాడు").<br>');
content = content.replace('• <strong>Postfix (<code>x++</code>):</strong> Current expression lo <strong>Original value ni use chesi</strong>, tharvatha increment chesthundhi ("Use first, increment later").</p>', '• <strong>Postfix (<code>x++</code>):</strong> ఫార్ములాలో <strong>పాత వాల్యూ నే వాడేసి</strong>, ఆ లైన్ అయిపోయాక అప్పుడు వాల్యూ ని పెంచుతుంది ("ముందు వాడు, తర్వాత పెంచు").</p>');

content = content.replace('<h4>Conditional (Ternary) Operator: <code>condition ? expr1 : expr2</code></h4>', '<h4>Ternary Operator (సింగిల్ లైన్ If-Else): <code>condition ? (నిజమైతే) : (అబద్ధమైతే)</code></h4>');
content = content.replace('<p>Simple <code>if-else</code> conditions ni single-line expression ga rayadaniki vadathamu:<br>', '<p>పెద్ద <code>if-else</code> కండిషన్స్ రాయకుండా ఒకే లైన్ లో ఆన్సర్ తెప్పించుకోవడానికి ఇది బెస్ట్:<br>');

content = content.replace('<div class="section-title"><span class="num">3</span>Operator Precedence &amp; Associativity Master Table ⭐</div>', '<div class="section-title"><span class="num">3</span>Operator Precedence టేబుల్ (ఏది ఫస్ట్ రన్ అవ్వాలి?) ⭐</div>');
content = content.replace('<p>Complex expressions lo eeh operator mundhu evaluate avvali anedhi <strong>Precedence</strong> decide chesthundhi:</p>', '<p>ఒక పెద్ద ఫార్ములాలో ప్లస్, మైనస్, ఇంటూ అన్నీ కలిసి ఉంటే ఏ ఆపరేటర్ ఫస్ట్ రన్ అవ్వాలి అనేది <strong>Precedence (ప్రాధాన్యత)</strong> డిసైడ్ చేస్తుంది:</p>');

content = content.replace('<tr><th>Priority</th><th>Operators</th><th>Description</th><th>Associativity</th></tr>', '<tr><th>ర్యాంక్ (ప్రాధాన్యత)</th><th>ఆపరేటర్లు</th><th>వివరణ</th><th>ఎటు వైపు నుండి రన్ అవుతుంది?</th></tr>');
content = content.replace('<tr><td><strong>1 (Highest)</strong></td><td><code>()</code>, <code>[]</code>, <code>-&gt;</code>, <code>.</code></td><td>Parentheses, Array Subscript, Member Access</td><td>Left to Right</td></tr>', '<tr><td><strong>1 (Highest - ఫస్ట్ రన్ అవుతాయి)</strong></td><td><code>()</code>, <code>[]</code>, <code>-&gt;</code>, <code>.</code></td><td>బ్రాకెట్స్ మరియు అర్రే</td><td>Left to Right (ఎడమ నుండి కుడికి)</td></tr>');
content = content.replace('<td>Unary operators, Type cast, Address, Dereference</td>', '<td>ఒకే వేరియబుల్ మీద పనిచేసేవి</td>');
content = content.replace('<td>Multiplication, Division, Modulus</td>', '<td>ఇంటూ, బై, మోడ్యులస్ (శేషం)</td>');
content = content.replace('<td>Addition, Subtraction</td>', '<td>ప్లస్, మైనస్</td>');
content = content.replace('<td>Relational Comparisons</td>', '<td>పోల్చి చూసేవి (లెస్ దాన్, గ్రేటర్ దాన్)</td>');
content = content.replace('<td>Equality / Inequality</td>', '<td>సమానమా కాదా?</td>');
content = content.replace('<td>Logical AND</td>', '<td>లాజికల్ AND</td>');
content = content.replace('<td>Logical OR</td>', '<td>లాజికల్ OR</td>');
content = content.replace('<td>Ternary Conditional</td>', '<td>టెర్నరీ కండిషన్</td>');
content = content.replace('<td>Assignment &amp; Compound Assignments</td>', '<td>అసైన్ చేయడం (లాస్ట్ లో రన్ అవుతాయి)</td>');

content = content.replace('<div class="section-title"><span class="num">4</span>6 Real-World Practice Programs (Formulas &amp; Walkthroughs)</div>', '<div class="section-title"><span class="num">4</span>6 ప్రాక్టికల్ ప్రోగ్రామ్స్ (ఫార్ములాస్ తో పాటు)</div>');
content = content.replace('<p>Practical implementation of arithmetic and operator logic across 6 essential algorithms:</p>', '<p>ఇప్పటివరకు నేర్చుకున్న ఆపరేటర్లని వాడి రియల్ టైం లో పనిచేసే 6 ప్రోగ్రామ్స్ చూద్దాం:</p>');

content = content.replace('<h4>📌 Formulas Used in the 6 Programs:</h4>', '<h4>📌 ఈ ప్రోగ్రామ్స్ లో వాడిన ఫార్ములాస్:</h4>');
content = content.replace('<p>1. <strong>Add Two Numbers:</strong> $Sum = a + b$<br>', '<p>1. <strong>రెండు నంబర్స్ కలపడం:</strong> $Sum = a + b$<br>');
content = content.replace('2. <strong>Simple Interest:</strong> $SI = \\frac{P \\times T \\times R}{100}$<br>', '2. <strong>వడ్డీ (Simple Interest):</strong> $SI = \\frac{P \\times T \\times R}{100}$<br>');
content = content.replace('3. <strong>Rectangle Area & Perimeter:</strong> $Area = L \\times W$, $Perimeter = 2(L + W)$<br>', '3. <strong>దీర్ఘచతురస్రం ఏరియా:</strong> $Area = L \\times W$, చుట్టుకొలత = 2(L + W)<br>');
content = content.replace('4. <strong>Celsius to Fahrenheit:</strong> $F = (C \\times \\frac{9.0}{5.0}) + 32.0$<br>', '4. <strong>టెంపరేచర్ మార్చడం:</strong> $F = (C \\times \\frac{9.0}{5.0}) + 32.0$<br>');
content = content.replace('5. <strong>Student Average:</strong> $Avg = \\frac{M_1 + M_2 + M_3}{3.0}$<br>', '5. <strong>స్టూడెంట్ ఆవరేజ్ మార్క్స్:</strong> $Avg = \\frac{M_1 + M_2 + M_3}{3.0}$<br>');
content = content.replace('6. <strong>Bill Calculator:</strong> $Final = Subtotal + (Subtotal \\times \\frac{GST\\%}{100})$</p>', '6. <strong>GST తో సూపర్ మార్కెట్ బిల్లు:</strong> $Final = Subtotal + (Subtotal \\times \\frac{GST\\%}{100})$</p>');

content = content.replace('<p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Test arithmetic operations, Celsius conversion, and student average in our live GCC compiler:</p>', '<p style="color:var(--text2); font-size:14px; margin-bottom:12px;">పైన చెప్పిన ఈ 6 ప్రోగ్రామ్స్ ని మన ఆన్‌లైన్ కంపైలర్ లో రన్ చేసి వాల్యూస్ మార్చి చెక్ చేయండి:</p>');

fs.writeFileSync(path, content, 'utf8');
console.log('updated c phase 3 successfully');
