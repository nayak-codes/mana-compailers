const fs = require('fs');
const path = 'scratch/build_c_phase8_massive.js';

let content = fs.readFileSync(path, 'utf8');

// LESSON 18 Replaces
content = content.replace(/const title = "C Strings: Memory Layout, Null Terminator \('\\\\0'\) Sentinel & Safe I\/O";/, 'const title = "C Strings: Memory Layout, Null Terminator (\'\\\\0\') Sentinel & Safe I/O (తెలుగులో)";');
content = content.replace(/const desc = "Comprehensive textbook-grade masterclass on C Strings \(Phase 8 Part 1\): Why C has no native string data type, the Null Terminator sentinel character \('\\\\0'\), Stack Character Arrays vs Read-Only String Literals in \.rodata, dangerous scanf\(\) traps vs safe fgets\(\) input, strcspn newline removal, and 2D string arrays\.";/, 'const desc = "C Strings (Phase 8 Part 1): C లో String అనే డేటా టైప్ ఎందుకు ఉండదు, Null Terminator (\'\\\\0\') అంటే ఏంటి, scanf() ఎందుకు వాడకూడదు, fgets() తో సేఫ్ గా డేటా ఎలా తీసుకోవాలి, మరియు 2D String Arrays గురించి తెలుగులో నేర్చుకుందాం.";');

let intro18_en = '<p>Welcome to <strong>Phase 8 (Chapter 18): C Strings, Null Terminator Sentinel & Safe I/O Architecture Masterclass</strong>! Unlike higher-level languages (such as Python, Java, or JavaScript) that provide a built-in, dynamic <code>String</code> object type, <strong>C language has NO native string data type</strong>. In C, a string is architecturally represented as a <strong>one-dimensional array of characters terminated by a special zero-byte Sentinel character known as the Null Terminator (<code>\'\\\\0\'</code>)</strong>. In this extensive guide, you will master physical ASCII RAM layouts, understand the critical difference between mutable stack character arrays and immutable read-only string literals, learn why legacy input functions like <code>gets()</code> caused catastrophic global cyber breaches, and master safe modern I/O using <code>fgets()</code> and <code>strcspn()</code>.</p>';
let intro18_te = '<p><strong>Phase 8 (Chapter 18): C Strings & Safe I/O Architecture Masterclass</strong> కు స్వాగతం! Python, Java, లాంటి లాంగ్వేజెస్ లో <code>String</code> అనే డేటా టైప్ డైరెక్ట్ గా ఉంటుంది, కానీ <strong>C భాషలో క్యారెక్టర్స్ (అక్షరాలు) తప్ప అసలు String డేటా టైప్ అనేదే ఉండదు!</strong> అందుకని C లో క్యారెక్టర్స్ ని పక్కపక్కన ఒక Array లో పెట్టి, చివర్లో <strong>దీనితో పదం అయిపోయింది అని చెప్పడానికి <code>\'\\\\0\'</code> (Null Terminator) ని పెడతాం</strong>. ఈ గైడ్ లో, అసలు RAM లో ఇవి ఎలా సేవ్ అవుతాయి, <code>scanf()</code> లేదా <code>gets()</code> వాడటం వల్ల హ్యాకర్స్ కి ఎలా ఛాన్స్ దొరుకుతుంది, మరియు <code>fgets()</code> వాడి సేఫ్ గా యూజర్ నుండి డేటా ఎలా తీసుకోవాలో తెలుగులో నేర్చుకుందాం.</p>';
content = content.replace(intro18_en, intro18_te);

content = content.replace('<div class="section-title"><span class="num">1</span>C Lo Strings Ante Enti? The Character Array Architecture</div>', '<div class="section-title"><span class="num">1</span>C లో Strings అంటే ఏంటి? (క్యారెక్టర్ Array)</div>');
content = content.replace('<p class="text-prose">\n        C language lo <code>string</code> ane separate primitive keyword ledhu. Text data ni store cheyyadaniki <code>char</code> data type loni elements ni <strong>Contiguous 1D Array</strong> ga organize chesi, text ekkada mugisindho theliyajeyyadaniki చివరన <strong>Null Terminator (<code>\'\\\\0\'</code>)</strong> ni append chesthamu.\n      </p>', '<p class="text-prose">\n        C లాంగ్వేజ్ లో <code>string</code> అనే కీవర్డ్ అసలే లేదు. పేర్లు లేదా వాక్యాలు సేవ్ చేయాలంటే, <code>char</code> ని ఒక <strong>1D Array</strong> లాగా వాడి, ఆ పదం ఎక్కడ ఆగిపోయిందో కంప్యూటర్ కి చెప్పడానికి చివర్లో <strong>Null Terminator (<code>\'\\\\0\'</code>)</strong> ని యాడ్ చేస్తాము.\n      </p>');

content = content.replace('<h4>🌟 The 3 Golden Rules of C String Architecture:</h4>', '<h4>🌟 C Strings కి ఉండే 3 గోల్డెన్ రూల్స్:</h4>');
content = content.replace('<p>1. <strong>Array of 1-Byte Chars:</strong> Prati character ASCII value format lo exact ga 1 Byte (8 bits) of memory occupy chesthundhi.<br>', '<p>1. <strong>ఒక అక్షరానికి 1 బైట్:</strong> ప్రతి క్యారెక్టర్ RAM లో కచ్చితంగా ఒక బైట్ (8 bits) స్పేస్ ని తీసుకుంటుంది.<br>');
content = content.replace('2. <strong>The Sentinel Null Terminator (<code>\'\\\\0\'</code>):</strong> String length entho thelusukovadaniki C lo metadata field undadhu. Functions (like <code>printf</code> or <code>strlen</code>) memory byte-by-byte scan chesthu <code>\'\\\\0\'</code> (ASCII value <code>0</code>) kanipinchagane aagipothayi!<br>', '2. <strong>Null Terminator (<code>\'\\\\0\'</code>):</strong> C కి ఈ పదం ఎంత పొడవు ఉందో ముందే తెలియదు. కాబట్టి <code>printf</code> లాంటివి లైన్ గా చదువుకుంటూ వెళ్ళి, ఆ <code>\'\\\\0\'</code> కనబడగానే అక్కడితో ప్రింటింగ్ ఆపేస్తాయి!<br>');
content = content.replace('3. <strong>The $+1$ Memory Rule:</strong> $N$ characters unna word ni store cheyyalante, RAM memory lo <strong>$N + 1$ Bytes</strong> array size compulsory ga allocate cheyyali (e.g. <code>"India"</code> needs 6 bytes)!</p>', '3. <strong>మెమరీకి $+1$ రూల్:</strong> 5 అక్షరాలున్న పదం స్టోర్ చేయాలంటే, ఆ లాస్ట్ లో ఉండే <code>\'\\\\0\'</code> కి కూడా ఒక ప్లేస్ కావాలి కదా, కాబట్టి <strong>మొత్తం 6 బైట్స్</strong> మెమరీ కావాలి!</p>');

let mDiag18_en = `      <div class="memory-diagram">
        <strong>RAM Contiguous Memory Architecture for: char city[] = "HYD";</strong><br>
        (Total Characters = 3, Required Buffer Size = 4 Bytes)<br>
        <br>
        RAM Address:       0x4000          0x4001          0x4002          0x4003<br>
                           ┌───────────────┬───────────────┬───────────────┬───────────────┐<br>
        Stored Character:  │      'H'      │      'Y'      │      'D'      │     '\\0'      │<br>
        ASCII Dec Value:   │      72       │      89       │      68       │       0       │<br>
                           └───────────────┴───────────────┴───────────────┴───────────────┘<br>
        Element Index:          city[0]         city[1]         city[2]         city[3]<br>
        Description:          First Char      Second Char      Third Char     SENTINEL END!
      </div>`;
let mDiag18_te = `      <div class="memory-diagram">
        <strong>RAM లో పదం ఎలా స్టోర్ అవుతుంది: char city[] = "HYD";</strong><br>
        (మొత్తం అక్షరాలు = 3, కానీ కావాల్సిన సైజు = 4 బైట్స్)<br>
        <br>
        RAM అడ్రస్:          0x4000          0x4001          0x4002          0x4003<br>
                           ┌───────────────┬───────────────┬───────────────┬───────────────┐<br>
        సేవ్ అయిన అక్షరం:   │      'H'      │      'Y'      │      'D'      │     '\\0'      │<br>
        కంప్యూటర్ వాల్యూ:     │      72       │      89       │      68       │       0       │<br>
                           └───────────────┴───────────────┴───────────────┴───────────────┘<br>
        ఇండెక్స్ పొజిషన్:        city[0]         city[1]         city[2]         city[3]<br>
        దీని అర్థం:             మొదటి అక్షరం     రెండవ అక్షరం       మూడవ అక్షరం       పదం అయిపోయింది!
      </div>`;
content = content.replace(mDiag18_en, mDiag18_te);


content = content.replace('<div class="section-title"><span class="num">2</span>Stack Array (Mutable) vs String Literal (Read-Only .rodata) ⭐</div>', '<div class="section-title"><span class="num">2</span>మామూలు Array కి, String Literal కి తేడా ఏంటి? ⭐</div>');
content = content.replace('<p class="text-prose">\n        C lo strings initialize cheyyadaniki 2 completely different memory mechanisms untayi. Ee difference theliyakapothe program mysterious <strong>Segmentation Fault crashes</strong> ki guri avthundhi:\n      </p>', '<p class="text-prose">\n        C లో ఒక పదాన్ని సేవ్ చేయడానికి 2 వేర్వేరు పద్ధతులు ఉంటాయి. ఈ రెంటి మధ్య తేడా తెలియకపోతే, మీ ప్రోగ్రామ్ అకారణంగా <strong>Segmentation Fault</strong> అని వచ్చి క్రాష్ అయిపోతుంది:\n      </p>');

content = content.replace('<tr><th>Declaration Syntax</th><th>RAM Segment</th><th>Can We Modify Characters?</th><th>Safety Status</th></tr>', '<tr><th>ఎలా క్రియేట్ చేస్తాం?</th><th>RAM లో ఎక్కడ పడుతుంది?</th><th>మనం అక్షరాలని మార్చొచ్చా?</th><th>సేఫ్ ఆర్ నాట్?</th></tr>');
content = content.replace('<td><code>char str[] = "Hello";</code></td>', '<td><code>char str[] = "Hello";</code></td>');
content = content.replace('<td><strong>Stack Frame</strong></td>', '<td><strong>Stack లో</strong> (మన కంట్రోల్ లో)</td>');
content = content.replace('<td>✅ <strong>YES (Mutable)!</strong> <code>str[0] = \'M\';</code> works perfectly!</td>', '<td>✅ <strong>ఎస్ మార్చొచ్చు!</strong> <code>str[0] = \'M\';</code> అంటే Mello అని మారుతుంది.</td>');
content = content.replace('<td>Safe for user input and editing.</td>', '<td>ఎడిటింగ్ కి 100% సేఫ్.</td>');
content = content.replace('<td><code>char* ptr = "Hello";</code></td>', '<td><code>char* ptr = "Hello";</code></td>');
content = content.replace('<td><strong>Text Segment (<code>.rodata</code>)</strong></td>', '<td><strong>.rodata లో</strong> (OS కంట్రోల్ లో)</td>');
content = content.replace('<td>❌ <strong>FATAL CRASH!</strong> <code>ptr[0] = \'M\';</code> triggers Segfault!</td>', '<td>❌ <strong>క్రాష్ అయిపోతుంది!</strong> ఇక్కడ మార్చడానికి ట్రై చేస్తే సిస్టం ఒప్పుకోదు!</td>');
content = content.replace('<td>Read-only compiled constant string.</td>', '<td>ఇది కేవలం చదువుకోవడానికే (Read-Only).</td>');

content = content.replace('<div class="section-title"><span class="num">3</span>Reading Strings: Dangerous scanf() Traps vs Safe fgets()</div>', '<div class="section-title"><span class="num">3</span>యూజర్ నుండి డేటా తీసుకోవడం: scanf() ఎందుకు డేంజర్?</div>');
content = content.replace('<p class="text-prose">\n        Text input read cheyyadaniki C standard library multiple functions provide chesthundhi, kaani vatilo chala functions dangerous security vulnerabilities create chesthayi:\n      </p>', '<p class="text-prose">\n        యూజర్ కీబోర్డ్ ద్వారా టైప్ చేసిన పదాన్ని చదవడానికి C లో చాలా ఆప్షన్స్ ఉన్నాయి. కానీ వాటిలో కొన్ని వాడితే సిస్టం సులభంగా హ్యాక్ అవుతుంది:\n      </p>');

content = content.replace('<h4>⚠️ 1. The Limitations of <code>scanf("%s", buf)</code>:</h4>', '<h4>⚠️ 1. <code>scanf("%s", buf)</code> వాడితే వచ్చే ప్రాబ్లమ్స్:</h4>');
content = content.replace('<p>• <strong>Whitespace Truncation:</strong> <code>scanf("%s")</code> space, tab, or newline kanipinchagane reading apesthundhi (e.g. <code>"Dennis Ritchie"</code> enters, only <code>"Dennis"</code> is captured!).<br>', '<p>• <strong>ఖాళీ (Space) కనబడితే ఆగిపోతుంది:</strong> మీరు "Ratan Tata" అని టైప్ చేస్తే, <code>scanf</code> మధ్యలో ఉన్న స్పేస్ చూడగానే అక్కడితో కట్ చేసి, కేవలం "Ratan" మాత్రమే సేవ్ చేసుకుంటుంది!<br>');
content = content.replace('• <strong>Buffer Overflow Danger:</strong> User buffer size (e.g. 10 chars) kante ekkuva type chesthe, <code>scanf</code> adjacent memory ni overwrite chesi stack smash chesthundi!</p>', '• <strong>మెమరీ ఓవర్ ఫ్లో (చాలా డేంజర్):</strong> మీ బాక్స్ లో 10 అక్షరాలకే ప్లేస్ ఉండి, యూజర్ 100 అక్షరాలు టైప్ చేస్తే, <code>scanf</code> ఆ 100 ని బలవంతంగా ఎక్కించి సిస్టం ని హ్యాక్ చేసేలా చేస్తుంది (Buffer Overflow)!</p>');

content = content.replace('<h3>🛡️ The Modern Secure Standard: fgets() + strcspn()</h3>', '<h3>🛡️ దీనికి సరైన సొల్యూషన్: fgets() + strcspn()</h3>');
content = content.replace('<p style="color:var(--text2); font-size:14.5px; line-height:1.8;">\n          Modern C standard lo user text input kosam <strong><code>fgets()</code></strong> mathrame use cheyyali:<br>\n          1. <strong>Bounded Input:</strong> <code>fgets(buffer, sizeof(buffer), stdin)</code> strictly specifies maximum bytes allowed, completely preventing buffer overflows!<br>\n          2. <strong>Captures Spaces:</strong> Full sentences with multiple spaces are read cleanly.<br>\n          3. <strong>The Trailing Newline Issue:</strong> When user presses Enter, <code>fgets</code> stores the <code>\'\\\\n\'</code> character inside the buffer before <code>\'\\\\0\'</code>.<br>\n          4. <strong>The Clean Solution:</strong> We use <code>buffer[strcspn(buffer, "\\\\n")] = \'\\\\0\';</code> to find the newline index and replace it with the null terminator instantly!\n        </p>', '<p style="color:var(--text2); font-size:14.5px; line-height:1.8;">\n          దీనికి పర్ఫెక్ట్ సొల్యూషన్ <strong><code>fgets()</code></strong> వాడటమే. ఇది మాత్రమే ఎందుకు వాడాలంటే:<br>\n          1. <strong>మెమరీకి లిమిట్ ఇస్తుంది:</strong> ఇది మనం ఇచ్చిన సైజు ఎంతైతే అంతవరకే చదువుతుంది, కాబట్టి మెమరీ ఓవర్ ఫ్లో అవ్వదు!<br>\n          2. <strong>స్పేసెస్ ని కూడా చదువుతుంది:</strong> మధ్యలో ఎన్ని ఖాళీలు ఉన్నా పూర్తి వాక్యాన్ని చదువుతుంది.<br>\n          3. <strong>ఒక చిన్న చిక్కు:</strong> మనం ఎంటర్ కొట్టగానే, ఆ ఎంటర్ (<code>\'\\\\n\'</code>) కూడా వచ్చి మన పదం చివర్లో సేవ్ అయిపోతుంది.<br>\n          4. <strong>సొల్యూషన్:</strong> దాన్ని తీసేయడానికి మనం <code>buffer[strcspn(buffer, "\\\\n")] = \'\\\\0\';</code> అని రాస్తే సరిపోతుంది!\n        </p>');


// LESSON 19 Replaces
content = content.replace(/const title = "C <string\.h> Library Masterclass: strlen, strcpy, strcat, strcmp & Security";/, 'const title = "C <string.h> Library Masterclass: strlen, strcpy, strcmp (తెలుగులో)";');
content = content.replace(/const desc = "Comprehensive textbook-grade masterclass on C String Manipulation Functions \(Phase 8 Part 2\): In-depth mechanics of strlen\(\), strcpy\(\) vs bounded strncpy\(\), strcat\(\) vs strncat\(\), strcmp\(\) vs strncmp\(\), strchr\(\) & strstr\(\), buffer overflow CVEs, and manual pointer-based reimplementations\.";/, 'const desc = "C <string.h> Functions (Phase 8 Part 2): C లో స్ట్రింగ్స్ ని ఆపరేట్ చేసే strlen, strcpy, strcat, strcmp ఫంక్షన్స్ ఎలా పనిచేస్తాయి, వాటి వల్ల వచ్చే ప్రాబ్లమ్స్, సేఫ్ ఫంక్షన్స్ ఏంటి, వాటిని సొంతంగా ఎలా రాయాలో తెలుగులో నేర్చుకుందాం.";');

let intro19_en = '<p>Welcome to <strong>Phase 8 (Chapter 19): C &lt;string.h&gt; Standard Library & Buffer Overflow Security Masterclass</strong>! Because C does not treat strings as high-level objects with built-in methods, all string operations—from finding lengths to copying, concatenating, comparing, and searching substrings—are executed via the standard <strong><code>&lt;string.h&gt;</code></strong> library header. In this exhaustive guide, you will master the internal algorithms, time complexities, and hardware memory movements of core string functions, analyze why unbounded functions like <code>strcpy()</code> caused historical cyber exploits, learn how to use bounded safe variants (<code>strncpy</code>, <code>strncat</code>, <code>strncmp</code>), and construct clean manual pointer-based reimplementations from scratch.</p>';
let intro19_te = '<p><strong>Phase 8 (Chapter 19): C &lt;string.h&gt; Library Masterclass</strong> కు స్వాగతం! వేరే భాషల్లో స్ట్రింగ్స్ కోసం ఇన్-బిల్ట్ ఆప్షన్స్ ఉంటాయి. కానీ C లో స్ట్రింగ్స్ అంటే కేవలం క్యారెక్టర్ Arrays కాబట్టి, వాటిని కాపీ చేయడం, కలపడం లాంటి పనులు చేయడానికి మనం కచ్చితంగా <strong><code>&lt;string.h&gt;</code></strong> అనే లైబ్రరీని వాడాలి. ఈ గైడ్ లో, ఈ లైబ్రరీలోని ప్రతి ఫంక్షన్ లోపల అసలు ఏం జరుగుతుందో, <code>strcpy()</code> వల్ల ఏ ఏ సిస్టమ్స్ క్రాష్ అయ్యాయో, వాటి బదులు వాడాల్సిన సేఫ్ వెర్షన్స్ ఏంటో, మరియు ఈ ఫంక్షన్స్ ని ఎవరి సహాయం లేకుండా మన చేతులతో (Pointers వాడి) ఎలా రాయాలో తెలుగులో నేర్చుకుందాం.</p>';
content = content.replace(intro19_en, intro19_te);

content = content.replace('<div class="section-title"><span class="num">1</span>The Standard &lt;string.h&gt; Library Function Matrix</div>', '<div class="section-title"><span class="num">1</span>&lt;string.h&gt; లైబ్రరీలో ఉండే ముఖ్యమైన ఫంక్షన్స్ జాబితా</div>');
content = content.replace('<p class="text-prose">\n        The C standard library categorizes string functions into 5 core families: Measurement, Copying, Concatenation, Comparison, and Searching:\n      </p>', '<p class="text-prose">\n        C లో ముఖ్యంగా మనం చేసే పనులు 5 రకాలు: లెంత్ కనుక్కోవడం, కాపీ చేయడం, రెండు పదాలని కలపడం, రెంటినీ చెక్ చేయడం, మరియు ఒక పదంలో ఇంకో పదాన్ని వెతకడం:\n      </p>');

content = content.replace('<tr><th>Function Signature</th><th>Role &amp; Mechanism</th><th>Time Complexity</th><th>Security Status</th></tr>', '<tr><th>ఫంక్షన్ పేరు</th><th>ఏం చేస్తుంది?</th><th>ఎంత టైం పడుతుంది?</th><th>సేఫ్టీ పరిస్థితి</th></tr>');
content = content.replace('<td>Scans memory sequentially counting characters until <code>\'\\\\0\'</code>.</td>', '<td>వరుసగా అక్షరాలని లెక్కపెడుతూ వెళ్లి <code>\'\\\\0\'</code> రాగానే ఆగుతుంది.</td>');
content = content.replace('<td>Copies all characters from <code>src</code> to <code>dest</code> including <code>\'\\\\0\'</code>.</td>', '<td>ఒక పదాన్ని ఇంకో పదంలోకి డైరెక్ట్ గా కాపీ చేస్తుంది (<code>\'\\\\0\'</code> తో సహా).</td>');
content = content.replace('<td>⚠️ <strong>UNSAFE!</strong> No buffer limit.</td>', '<td>⚠️ <strong>డేంజర్!</strong> లిమిట్ లేకుండా కాపీ చేస్తుంది.</td>');
content = content.replace('<td>Copies at most $n$ characters. ⚠️ Does not null-terminate if $n \\le \\text{len}$!</td>', '<td>కేవలం మనం చెప్పిన <code>n</code> అక్షరాలు మాత్రమే సేఫ్ గా కాపీ చేస్తుంది.</td>');
content = content.replace('<td>Finds end of <code>dest</code> and appends <code>src</code>.</td>', '<td>మొదటి పదం లాస్ట్ కి వెళ్ళి, దానికి రెండో పదాన్ని అతికిస్తుంది.</td>');
content = content.replace('<td>Appends at most $n$ chars and <strong>always appends <code>\'\\\\0\'</code></strong>.</td>', '<td>రెండో పదంలో కేవలం <code>n</code> అక్షరాలని మాత్రమే పర్ఫెక్ట్ గా అతికిస్తుంది.</td>');
content = content.replace('<td>Lexicographical ASCII subtraction ($s_1[i] - s_2[i]$). Returns <code>0</code> if equal.</td>', '<td>రెండు పదాల అక్షరాలని ఒకదానితో ఒకటి పోలుస్తుంది. సేమ్ ఉంటే <code>0</code> వస్తుంది.</td>');

content = content.replace('<div class="section-title"><span class="num">2</span>strlen() vs sizeof() Deep Architectural Comparison</div>', '<div class="section-title"><span class="num">2</span>strlen() vs sizeof() అసలు తేడా ఏంటి?</div>');
content = content.replace('<h4>⚡ strlen() vs sizeof() in Depth:</h4>', '<h4>⚡ ఈ రెండిటికీ ఉండే అసలు తేడా:</h4>');
content = content.replace('<p>• <strong><code>sizeof(str)</code>:</strong> Evaluates the <strong>Total Physical RAM Buffer Size in Bytes</strong> allocated at compile time (an $O(1)$ constant value).<br>', '<p>• <strong><code>sizeof(str)</code>:</strong> ఇది మనం <strong>మొత్తం ఎన్ని బాక్స్ లు (మెమరీ) క్రియేట్ చేశాం</strong> అని చెప్తుంది (ఖాళీగా ఉన్నా సరే కౌంట్ చేస్తుంది).<br>');
content = content.replace('• <strong><code>strlen(str)</code>:</strong> Traverses RAM at runtime counting characters until it hits <code>\'\\\\0\'</code> (an $O(N)$ dynamic operation that excludes the null terminator!).<br>', '• <strong><code>strlen(str)</code>:</strong> ఇది <strong>అందులో అసలు ఎన్ని అక్షరాలు ఉన్నాయి</strong> అని లెక్కపెట్టి మరీ చెప్తుంది (ఇది లాస్ట్ లో ఉండే <code>\'\\\\0\'</code> ని కౌంట్ చేయదు!).<br>');

content = content.replace('<div class="section-title"><span class="num">4</span>Manual Pointer-Based Reimplementation of &lt;string.h&gt;</div>', '<div class="section-title"><span class="num">4</span>ఈ ఫంక్షన్స్ ని మన చేతులతో (Pointers వాడి) ఎలా రాయాలి?</div>');
content = content.replace('<p class="text-prose">\n        Understanding how standard library functions operate under the hood using raw pointer arithmetic is an essential skill for system software engineers:\n      </p>', '<p class="text-prose">\n        అసలు ఆ లైబ్రరీలో ఉన్న ఫంక్షన్స్ ఇంటర్నల్ గా ఎలా రన్ అవుతున్నాయో మనకు తెలిస్తే, మనం సిస్టమ్స్ మీద అద్భుతంగా పట్టు సాధించగలం:\n      </p>');

// LESSON 20 Replaces
content = content.replace(/const title = "C String Algorithms & 6 Text Processing Projects";/, 'const title = "C String Algorithms & 6 Text Processing Projects (తెలుగులో)";');
content = content.replace(/const desc = "Deep algorithmic masterclass on C String Algorithms \(Phase 8 Part 3\): Two-pointer string reversal, Palindrome checker, State machine word counter, ASCII frequency array character counting, Username validator, and Text Analyzer projects\.";/, 'const desc = "C String Algorithms (Phase 8 Part 3): పదాన్ని రివర్స్ చేయడం, Palindrome చెకింగ్, పదాలని కౌంట్ చేయడం, యూజర్ నేమ్ వాలిడేషన్ లాంటి 6 ప్రాక్టికల్ ప్రాజెక్ట్స్ ని తెలుగులో నేర్చుకుందాం.";');

let intro20_en = '<p>Welcome to <strong>Phase 8 (Chapter 20): C String Algorithms & 6 Complete Text Processing Projects Masterclass</strong>! Manipulating raw character arrays safely is the ultimate test of a C programmer\'s memory management skills. In this comprehensive guide, you will transition from theory to heavy architectural application. We will implement <strong>6 foundational text algorithms</strong> without relying heavily on standard libraries: Two-pointer in-place string reversal, case-insensitive Palindrome checking, a State-Machine Word Counter (lexical analysis), an ASCII Frequency Array for duplicate character detection, a production-style Username Validator, and a comprehensive Text Analyzer.</p>';
let intro20_te = '<p><strong>Phase 8 (Chapter 20): C String Algorithms & Projects Masterclass</strong> కు స్వాగతం! C లో పదాలతో (Strings) ఆడుకోవడం అనేది ఒక ప్రోగ్రామర్ లాజిక్ స్కిల్స్ కి పెద్ద టెస్ట్ లాంటిది. ఈ గైడ్ లో, మనం థియరీ పక్కనపెట్టి <strong>6 అద్భుతమైన ప్రాక్టికల్ రియల్-వరల్డ్ ప్రాజెక్ట్స్</strong> రాయబోతున్నాం. ఒక పదాన్ని లైబ్రరీ హెల్ప్ లేకుండా రివర్స్ చేయడం, పదం రివర్స్ చేసినా సేమ్ వస్తుందా అని చెక్ చేయడం (Palindrome), వాక్యంలో ఎన్ని పదాలున్నాయో లెక్కపెట్టడం, ఏ అక్షరం ఎన్ని సార్లు వచ్చిందో (Frequency) కనిపెట్టడం లాంటివి తెలుగులో స్టెప్ బై స్టెప్ నేర్చుకుందాం.</p>';
content = content.replace(intro20_en, intro20_te);

content = content.replace('<div class="section-title"><span class="num">1</span>Project 1 &amp; 2: Two-Pointer Reversal &amp; Palindrome Checker</div>', '<div class="section-title"><span class="num">1</span>ప్రాజెక్ట్స్ 1 &amp; 2: String రివర్స్ చేయడం &amp; పాలిండ్రోమ్ (Palindrome)</div>');
content = content.replace('<div class="concept-box">\n        <h4>🔄 1. In-Place String Reversal (Two-Pointer Method)</h4>\n        <p>Instead of creating a new buffer, we use a <code>left</code> pointer at index 0 and a <code>right</code> pointer at the end of the string (<code>len - 1</code>). We swap the characters and move the pointers towards the center until they meet ($O(N/2)$ optimal efficiency).</p>\n      </div>', '<div class="concept-box">\n        <h4>🔄 1. String రివర్స్ చేయడం (Two-Pointer లాజిక్)</h4>\n        <p>దీనికోసం కొత్తగా మెమరీ క్రియేట్ చేయకుండా, ఫస్ట్ లో ఒక పాయింటర్ (left), లాస్ట్ లో ఒక పాయింటర్ (right) పెడతాము. ఆ రెండు అక్షరాలని మార్చుకుంటూ మధ్యలోకి వస్తాము. (దీనివల్ల సగం టైం లో పనైపోతుంది!).</p>\n      </div>');

content = content.replace('<div class="section-title"><span class="num">2</span>Project 3 &amp; 4: State Machine Word Counter &amp; Character Frequency</div>', '<div class="section-title"><span class="num">2</span>ప్రాజెక్ట్స్ 3 &amp; 4: పదాలని లెక్కపెట్టడం &amp; అక్షరాల కౌంట్ (Frequency)</div>');
content = content.replace('<h4>📝 3. Lexical Word Counter (State Machine)</h4>', '<h4>📝 3. వాక్యంలో ఎన్ని పదాలున్నాయో లెక్కపెట్టడం</h4>');
content = content.replace('<h4>📊 4. ASCII Frequency Counting (Direct Indexing Array)</h4>', '<h4>📊 4. ఏ అక్షరం ఎన్ని సార్లు వచ్చింది? (Frequency)</h4>');


fs.writeFileSync(path, content, 'utf8');
console.log('updated c phase 8 successfully');
