const fs = require('fs');
const path = 'scratch/build_c_phase7.js';

let content = fs.readFileSync(path, 'utf8');

// LESSON 14 Replaces
content = content.replace(/const title = "C 1D Arrays: Contiguous RAM Memory Architecture & Indexing";/, 'const title = "C 1D Arrays: Contiguous RAM Memory Architecture & Indexing (తెలుగులో)";');
content = content.replace(/const desc = "Deep architectural masterclass on C 1D Arrays \(Phase 7 Part 1\): What is an array\?, contiguous physical RAM layout, why arrays are needed, declaration vs initialization, the mathematical zero-based offset formula, sizeof length calculation, updating elements, and buffer overflow dangers\.";/, 'const desc = "C 1D Arrays (Phase 7 Part 1): C లో Array అంటే ఏంటి, RAM లో మెమరీ ఎలా క్రియేట్ అవుతుంది, ఇండెక్స్ 0 తోనే ఎందుకు స్టార్ట్ అవుతుంది, Length కనుక్కోవడం ఎలా, మరియు Buffer Overflow ప్రాబ్లం గురించి తెలుగులో నేర్చుకుందాం.";');

let intro14_en = '<p>Welcome to <strong>Phase 7 (Chapter 14): C 1D Arrays, Contiguous RAM Memory Architecture & Indexing Masterclass</strong>! When managing collections of related data (such as 1,000 student test scores or audio waveform samples), declaring individual variables like <code>score1, score2...</code> is impossible. <strong>Arrays</strong> provide the fundamental data structure in C for storing a fixed-size sequence of elements of the <em>same data type</em> in <strong>strictly contiguous (side-by-side) physical RAM memory bytes</strong>. In this in-depth guide, you will master array memory allocation, the mathematical address offset formula explaining why C starts counting at index 0, calculating array lengths safely at compile time, and avoiding catastrophic out-of-bounds buffer overflow crashes.</p>';
let intro14_te = '<p><strong>Phase 7 (Chapter 14): C 1D Arrays & Memory Architecture Masterclass</strong> కు స్వాగతం! ఒకే రకమైన డేటా చాలా ఉన్నప్పుడు (ఉదాహరణకి 1,000 మంది స్టూడెంట్స్ మార్క్స్), ప్రతి దానికి <code>score1, score2...</code> అని వెయ్యి వేరియబుల్స్ క్రియేట్ చేయడం అసాధ్యం. దీనికి సొల్యూషనే <strong>Arrays</strong>. ఒకే రకమైన డేటాని <strong>RAM లో పక్కపక్కనే (Contiguous గా)</strong> సేవ్ చేయడానికి Array వాడతాం. ఈ గైడ్ లో, Array క్రియేట్ చేసినప్పుడు RAM లో ఏం జరుగుతుంది, C లో కౌంటింగ్ 1 నుండి కాకుండా 0 తో ఎందుకు స్టార్ట్ అవుతుంది, ఒక Array సైజు ఎలా కనుక్కోవాలి, మరియు హ్యాకర్స్ వాడే Buffer Overflow ఎటాక్ ఎలా జరుగుతుందో తెలుగులో నేర్చుకుందాం.</p>';
content = content.replace(intro14_en, intro14_te);

content = content.replace('<div class="section-title"><span class="num">1</span>Array Ante Enti? Physical Contiguous RAM Memory Layout</div>', '<div class="section-title"><span class="num">1</span>Array అంటే ఏంటి? &amp; RAM లో మెమరీ ఎలా క్రియేట్ అవుతుంది?</div>');
content = content.replace('<p><strong>Array</strong> ante <strong>Same Data Type (Homogeneous)</strong> unna multiple values ni RAM memory lo <strong>Contiguous (Pakkana pakkana)</strong> ga store chese linear data structure.</p>', '<p><strong>Array</strong> అంటే <strong>ఒకే రకమైన డేటాని (Same Data Type)</strong> RAM మెమరీలో <strong>పక్కపక్కనే (Contiguous)</strong> ఒక ఆర్డర్ లో స్టోర్ చేసే ఒక విధానం.</p>');

content = content.replace('<h4>⚡ Why Does C Indexing Start at 0? (The Mathematical Offset Formula)</h4>', '<h4>⚡ C లో ఇండెక్స్ 0 తోనే ఎందుకు స్టార్ట్ అవుతుంది?</h4>');
content = content.replace('<p>In high-level languages, index represents position (1st, 2nd). Kaani C language lo, <code>index</code> anedhi **Memory Offset from the Base Address**!<br>', '<p>సాధారణంగా మనం లెక్కపెట్టేటప్పుడు 1, 2 అని పొజిషన్స్ వాడతాం. కానీ C లాంగ్వేజ్ లో, <code>index</code> అనేది పొజిషన్ కాదు, అది <strong>స్టార్టింగ్ అడ్రస్ నుండి ఎంత దూరం జరగాలి (Offset)</strong> అని చెప్తుంది!<br>');
content = content.replace('• First element base address deggare untundhi, so offset is <code>0</code> (<code>Base + 0 * 4 = Base</code>)!<br>', '• మొదటి ఎలిమెంట్ అక్కడే (స్టార్టింగ్ లోనే) ఉంటుంది కాబట్టి అస్సలు జరగాల్సిన పనిలేదు. అందుకే దానికి అడ్రస్ <code>0</code> (<code>Base + 0 * 4 = Base</code>)!<br>');
content = content.replace('• Second element is <code>1</code> element away (<code>Base + 1 * 4</code>). This is why C indexing strictly starts at 0 for maximum CPU calculation speed!</p>', '• రెండవ ఎలిమెంట్ కి వెళ్లాలంటే <code>1</code> అడుగు ముందుకు వేయాలి (<code>Base + 1 * 4</code>). దీనివల్ల CPU చాలా ఫాస్ట్ గా లెక్కపెట్టుకోగలదు కాబట్టే C లో ఎప్పుడూ 0 తో స్టార్ట్ అవుతుంది!</p>');

content = content.replace('<div class="section-title"><span class="num">2</span>Declaration, Initialization &amp; Compile-Time sizeof Length Idiom</div>', '<div class="section-title"><span class="num">2</span>Array ని క్రియేట్ చేయడం &amp; Length కనుక్కోవడం (sizeof)</div>');
content = content.replace('<p>C provides multiple flexible initialization syntaxes for 1D arrays:</p>', '<p>C లో మనం ఒక Array ని చాలా రకాలుగా క్రియేట్ చేయొచ్చు:</p>');

content = content.replace('<h4>📝 Initialization Methods in C:</h4>', '<h4>📝 C లో Array ని క్రియేట్ చేసే పద్ధతులు:</h4>');
content = content.replace('<p>1. <strong>Explicit Size &amp; List:</strong> <code>int marks[4] = {85, 90, 78, 92};</code><br>', '<p>1. <strong>సైజ్ చెప్పి వాల్యూస్ ఇవ్వడం:</strong> <code>int marks[4] = {85, 90, 78, 92};</code><br>');
content = content.replace('2. <strong>Auto-Size Deducing (Compiler counts elements):</strong> <code>int marks[] = {85, 90, 78, 92};</code><br>', '2. <strong>ఆటోమేటిక్ సైజ్ (కంపైలరే కౌంట్ చేస్తుంది):</strong> <code>int marks[] = {85, 90, 78, 92};</code> (ఇందులో బ్రాకెట్స్ ఖాళీగా వదిలేయొచ్చు).<br>');
content = content.replace('3. <strong>Zero-Initialization:</strong> <code>int zeros[10] = {0};</code> (All 10 slots filled with 0).<br>', '3. <strong>అన్నింటిలో సున్నా పెట్టడం:</strong> <code>int zeros[10] = {0};</code> (10 ఖాళీలు క్రియేట్ అయి అన్నింటిలో 0 సేవ్ అవుతుంది).<br>');
content = content.replace('4. <strong>Uninitialized (Garbage Warning!):</strong> <code>int temp[5];</code> (Contains random unallocated junk bytes from RAM!).</p>', '4. <strong>ఖాళీగా వదిలేయడం (డేంజర్!):</strong> <code>int temp[5];</code> (ఇలా వదిలేస్తే RAM లో పాత చెత్త వాల్యూస్ (Garbage) అన్నీ వచ్చి ఇందులో పడతాయి!).</p>');

content = content.replace('<h4>📐 Calculating Array Length with sizeof</h4>', '<h4>📐 C లో Array Length కనుక్కోవడం ఎలా?</h4>');
content = content.replace('<p>Because C does not store array length properties (like Java or Python\'s <code>.length</code>), we use the universal compile-time idiom:<br>', '<p>Java లేదా Python లాగా C లో డైరెక్ట్ గా <code>.length</code> అనే ఆప్షన్ ఉండదు. కాబట్టి మనం ఈ చిన్న లాజిక్ వాడి లెంత్ ని కనుక్కోవాలి:<br>');

content = content.replace('<div class="section-title"><span class="num">3</span>No Runtime Bounds Checking &amp; Buffer Overflow Dangers ⚠️</div>', '<div class="section-title"><span class="num">3</span>Array లిమిట్ దాటితే ఏమవుతుంది? (Buffer Overflow) ⚠️</div>');
content = content.replace('<h4 style="color:#ff7b72;">🛑 The Critical "Out-of-Bounds" Vulnerability in C:</h4>', '<h4 style="color:#ff7b72;">🛑 C లో ఉండే అతిపెద్ద డేంజర్: Out-of-Bounds!</h4>');
content = content.replace('<p>C language does **ZERO Runtime Bounds Checking** for ultra-fast raw hardware execution speed.<br>', '<p>కోడ్ చాలా ఫాస్ట్ గా రన్ అవ్వాలని C భాష **సైజు లిమిట్స్ ని అస్సలు చెక్ చేయదు**.<br>');
content = content.replace('If you declare <code>int arr[4];</code> and attempt to write <code>arr[10] = 500;</code>:<br>', 'ఒకవేళ మీరు <code>int arr[4];</code> అని క్రియేట్ చేసి, పొరపాటున <code>arr[10] = 500;</code> అని రాస్తే:<br>');
content = content.replace('• C compiler will NOT throw any error during compilation!<br>', '• C కంపైలర్ మీకు ఎలాంటి ఎర్రర్ చూపించదు!<br>');
content = content.replace('• Execution time lo CPU RAM lo unna adjacent data or return address ni overwrite chesthundhi (<strong>Buffer Overflow</strong>).<br>', '• రన్ అవుతున్నప్పుడు, 4వ బాక్స్ తర్వాత వేరే ప్రోగ్రామ్ వాడుకుంటున్న మెమరీలోకి వెళ్లి మరీ ఈ 500 ని సేవ్ చేస్తుంది! (దీన్నే <strong>Buffer Overflow</strong> అంటారు).<br>');
content = content.replace('• This causes corrupted program states, security vulnerabilities, or immediate <strong>Segmentation Fault crashes</strong>!</p>', '• దీనివల్ల సిస్టం హ్యాక్ అవ్వడానికి ఛాన్స్ ఉంటుంది లేదా ప్రోగ్రామ్ వెంటనే <strong>Segmentation Fault</strong> అని వచ్చి క్రాష్ అయిపోతుంది!</p>');

// LESSON 15 Replaces
content = content.replace(/const title = "C 2D\/3D Arrays, Row-Major Order & Matrix Mathematics";/, 'const title = "C 2D/3D Arrays, Row-Major Order & Matrix Mathematics (తెలుగులో)";');
content = content.replace(/const desc = "Deep mathematical masterclass on C Multi-Dimensional Arrays \(Phase 7 Part 2\): 2D grid architecture, physical 1D Row-Major Order mapping in RAM, address calculation formula, Matrix Addition, Matrix Transposition, and Array of Characters vs Strings\.";/, 'const desc = "C Multi-Dimensional Arrays (Phase 7 Part 2): 2D Arrays ఎలా పనిచేస్తాయి, RAM లో Row-Major ఆర్డర్ అంటే ఏంటి, మ్యాట్రిక్స్ అడిషన్, మ్యాట్రిక్స్ ట్రాన్స్‌పోజ్, మరియు Characters కి Strings కి తేడా ఏంటో తెలుగులో నేర్చుకుందాం.";');

let intro15_en = '<p>Welcome to <strong>Phase 7 (Chapter 15): C 2D & Multi-Dimensional Arrays, Row-Major Order & Matrix Mathematics Masterclass</strong>! When software models tabular spreadsheets, game grids (like Chess or Tic-Tac-Toe), image pixel color channels, or physics simulation tensors, single-dimensional arrays are insufficient. <strong>Multi-Dimensional Arrays</strong> represent data organized across rows and columns. In this comprehensive guide, you will master the 2D grid abstraction, understand how physical computer hardware flattens 2D matrices into <strong>1D Row-Major Memory bytes</strong>, implement core linear algebra algorithms (Matrix Addition and Matrix Transposition), and compare character arrays with null-terminated strings.</p>';
let intro15_te = '<p><strong>Phase 7 (Chapter 15): C 2D Arrays & Matrix Mathematics Masterclass</strong> కు స్వాగతం! ఎక్సెల్ షీట్స్, చెస్ బోర్డ్, ఇమేజ్ పిక్సెల్స్ లాంటివి ప్రోగ్రామింగ్ లో సేవ్ చేయాలంటే 1D Array సరిపోదు. అడ్డు వరుసలు, నిలువు వరుసలు (Rows & Columns) ఉన్న <strong>Multi-Dimensional Arrays (2D/3D)</strong> వాడాలి. ఈ గైడ్ లో, 2D Arrays ఎలా పనిచేస్తాయి, కంప్యూటర్ RAM దాన్ని ఒకే లైన్ లో (1D లాగా) ఎలా సేవ్ చేసుకుంటుంది, రెండు మ్యాట్రిక్స్ ని ఎలా కలపాలి (Addition & Transpose), మరియు C లో పేర్లు (Strings) ఎలా సేవ్ అవుతాయో తెలుగులో నేర్చుకుందాం.</p>';
content = content.replace(intro15_en, intro15_te);

content = content.replace('<div class="section-title"><span class="num">1</span>2D Array Abstraction vs Physical Row-Major Order in RAM</div>', '<div class="section-title"><span class="num">1</span>2D Array గ్రిడ్ vs RAM లో Row-Major ఆర్డర్</div>');
content = content.replace('<p>While programmer mind models a 2D array as a Grid table with Rows and Columns, <strong>Computer RAM is strictly a single flat 1D sequence of linear addresses</strong>. \n      C compiles 2D arrays using <strong>Row-Major Order</strong> (Row 0 is placed first, immediately followed by Row 1, then Row 2):</p>', '<p>మనం 2D Array ని అడ్డు వరుసలు, నిలువు వరుసలు ఉన్న ఒక టేబుల్ లాగా ఊహించుకుంటాం. కానీ <strong>కంప్యూటర్ RAM లో అలా టేబుల్స్ ఉండవు, కేవలం ఒకే ఒక పొడవాటి సింగిల్ లైన్ ఉంటుంది</strong>. \n      అందుకని C కంపైలర్ 2D Array ని <strong>Row-Major Order</strong> లో సేవ్ చేస్తుంది (అంటే ఫస్ట్ 0వ అడ్డు వరుస, దాని పక్కనే 1వ అడ్డు వరుస, అలా వరసగా లైన్ లో సేవ్ చేస్తుంది):</p>');

content = content.replace('<div class="section-title"><span class="num">2</span>Matrix Mathematics: Matrix Addition &amp; Matrix Transpose</div>', '<div class="section-title"><span class="num">2</span>Matrix మ్యాథ్స్: మ్యాట్రిక్స్ కలపడం (Addition) &amp; రివర్స్ చేయడం (Transpose)</div>');
content = content.replace('<h4>📐 1. Matrix Addition ($C[i][j] = A[i][j] + B[i][j]$)</h4>', '<h4>📐 1. Matrix Addition (రెండు మ్యాట్రిక్స్ ని కలపడం)</h4>');
content = content.replace('<p>Two matrices must have the exact same dimensions $(M \\times N)$. Element-by-element addition is performed across nested loops.</p>', '<p>దీనికి రెండు మ్యాట్రిక్స్ కచ్చితంగా ఒకే సైజ్ $(M \\times N)$ లో ఉండాలి. లోపల ఉన్న వాల్యూస్ ని ఒకదానితో ఒకటి డైరెక్ట్ గా కలుపుతాము (Nested loops వాడి).</p>');
content = content.replace('<h4>🔄 2. Matrix Transpose ($T[j][i] = M[i][j]$)</h4>', '<h4>🔄 2. Matrix Transpose (అడ్డు వరుసలని నిలువుగా మార్చడం)</h4>');
content = content.replace('<p>Transposing a matrix flips it over its main diagonal, converting its Rows into Columns: an $(M \\times N)$ matrix becomes an $(N \\times M)$ transposed matrix.</p>', '<p>ఒక మ్యాట్రిక్స్ ని అడ్డం నుండి నిలువుకి (Rows ని Columns గా) తిప్పడాన్నే Transpose అంటారు. అప్పుడు $(M \\times N)$ సైజ్ ఉన్న మ్యాట్రిక్స్ కాస్తా $(N \\times M)$ అవుతుంది.</p>');

content = content.replace('<div class="section-title"><span class="num">3</span>Array of Characters vs Null-Terminated Strings</div>', '<div class="section-title"><span class="num">3</span>క్యారెక్టర్స్ Array కి మరియు String కి తేడా ఏంటి?</div>');
content = content.replace('<tr><th>Feature</th><th>Raw Character Array (<code>char arr[]</code>)</th><th>C String (<code>char str[]</code>)</th></tr>', '<tr><th>ఫీచర్</th><th>మామూలు క్యారెక్టర్ Array (<code>char arr[]</code>)</th><th>C లో స్ట్రింగ్ (<code>char str[]</code>)</th></tr>');
content = content.replace('<td><strong>NOT present</strong> unless explicitly added.</td>', '<td>మనం కావాలని రాస్తే తప్ప <strong>ఆటోమేటిక్ గా రాదు</strong>.</td>');
content = content.replace('<td><strong>Automatically added at the end</strong> by compiler.</td>', '<td>కంపైలర్ <strong>చివర్లో ఆటోమేటిక్ గా యాడ్ చేస్తుంది</strong>.</td>');
content = content.replace('<td>❌ <strong>Dangerous!</strong> Will read past array causing buffer overflow.</td>', '<td>❌ <strong>డేంజర్!</strong> ఎక్కడ ఆగాలో తెలియక మొత్తం RAM ని ప్రింట్ చేస్తుంది.</td>');
content = content.replace('<td>✅ <strong>Safe!</strong> <code>printf("%s", str)</code> stops exactly at <code>\'\\0\'</code>.</td>', '<td>✅ <strong>సేఫ్!</strong> ఆ <code>\'\\0\'</code> కనబడగానే అక్కడితో ఆగిపోతుంది.</td>');


// LESSON 16 Replaces
content = content.replace(/const title = "C Passing Arrays to Functions, Pointer Decay & Limitations";/, 'const title = "C Passing Arrays to Functions, Pointer Decay & Limitations (తెలుగులో)";');
content = content.replace(/const desc = "Deep memory masterclass on Passing Arrays in C \(Phase 7 Part 3\): The Pointer Decay mechanism, why sizeof\(arr\) fails inside functions, passing array size explicitly, const array protection, and core architectural limitations of C arrays\.";/, 'const desc = "C Passing Arrays (Phase 7 Part 3): ఫంక్షన్స్ కి Array ని పంపినప్పుడు ఏమవుతుంది, Pointer Decay అంటే ఏంటి, లోపల sizeof ఎందుకు ఫెయిల్ అవుతుంది, మరియు C arrays కి ఉన్న లిమిటేషన్స్ గురించి తెలుగులో నేర్చుకుందాం.";');

let intro16_en = '<p>Welcome to <strong>Phase 7 (Chapter 16): Passing Arrays to Functions, Pointer Decay & Architectural Limitations Masterclass</strong>! One of the most infamous stumbling blocks for C developers is understanding what happens when an array is passed across a function boundary. In C, arrays are <em>never copied by value</em>. Instead, the array instantly <strong>decays into a raw pointer to its first memory element</strong>. In this comprehensive guide, you will master the mechanics of Pointer Decay, understand why <code>sizeof</code> fails inside functions, learn how to enforce read-only safety with <code>const</code>, and analyze the fundamental architectural limitations of static C arrays.</p>';
let intro16_te = '<p><strong>Phase 7 (Chapter 16): Passing Arrays & Pointer Decay Masterclass</strong> కు స్వాగతం! C నేర్చుకునేవాళ్ళు ఎక్కువగా కన్ఫ్యూజ్ అయ్యే టాపిక్ ఫంక్షన్స్ కి Arrays ని పాస్ చేయడం. C లో మనం ఒక Array ని ఫంక్షన్ కి ఇస్తే, అది మొత్తం కాపీ అవ్వదు. దానికి బదులుగా, ఆ Array తన <strong>మొదటి ఎలిమెంట్ అడ్రస్ ఉన్న ఒక Pointer లాగా మారిపోతుంది (దీన్నే Pointer Decay అంటారు)</strong>. ఈ గైడ్ లో, Pointer Decay అంటే ఏంటి, ఫంక్షన్ లోపల <code>sizeof</code> వాడితే సైజు ఎందుకు కరెక్ట్ గా రాదు, మన Array ని వేరేవాళ్ళు మార్చకుండా <code>const</code> తో ఎలా ఆపాలి, మరియు C Arrays కి ఉన్న లిమిట్స్ ఏంటో తెలుగులో నేర్చుకుందాం.</p>';
content = content.replace(intro16_en, intro16_te);

content = content.replace('<div class="section-title"><span class="num">1</span>The Pointer Decay Mechanism Explained ⭐</div>', '<div class="section-title"><span class="num">1</span>Pointer Decay అంటే ఏంటి? అది ఎలా జరుగుతుంది? ⭐</div>');
content = content.replace('<p>When you pass an array into a function in C, the entire array is NOT copied. \n      Instead, compiler automatically converts (decays) the array name into a <strong>Pointer to its first element (<code>&amp;arr[0]</code>)</strong>:</p>', '<p>C లో మీరు ఒక Array ని ఫంక్షన్ కి పాస్ చేసినప్పుడు, ఆ Array మొత్తం లోపలికి కాపీ అవ్వదు. \n      దానికి బదులుగా, కంపైలర్ ఆటోమేటిక్ గా ఆ Array ని తన <strong>మొదటి ఎలిమెంట్ అడ్రస్ కి పాయింటర్ (<code>&amp;arr[0]</code>) లాగా మార్చేస్తుంది (Decay చేస్తుంది)</strong>:</p>');

let mDiag16_en = `      <div class="memory-diagram">
        <strong>Pointer Decay Across Function Boundary:</strong><br>
        <br>
        In main():       int numbers[1000];  (Occupies 4,000 Bytes in RAM)<br>
        Function Call:   processArray(numbers);<br>
        <br>
        Inside Function: void processArray(int* ptr)  &lt;--- Receives only an 8-byte pointer address!<br>
        <br>
        Advantage:  Zero memory copying overhead! Blazing fast O(1) performance.<br>
        Side-effect: Function loses all metadata about how many elements are in the array!
      </div>`;
let mDiag16_te = `      <div class="memory-diagram">
        <strong>ఫంక్షన్ లోకి వెళ్ళేటప్పుడు Array పాయింటర్ లాగా మారడం:</strong><br>
        <br>
        main() లో:        int numbers[1000];  (RAM లో 4,000 బైట్స్ తీసుకుంటుంది)<br>
        ఫంక్షన్ కాల్:      processArray(numbers);<br>
        <br>
        ఫంక్షన్ లోపల:    void processArray(int* ptr)  &lt;--- ఇక్కడికి కేవలం ఒక చిన్న 8-బైట్ల అడ్రస్ మాత్రమే వస్తుంది!<br>
        <br>
        ప్లస్ పాయింట్:   డేటా మొత్తం కాపీ అవ్వదు కాబట్టి చాలా ఫాస్ట్ గా ఉంటుంది.<br>
        మైనస్ పాయింట్: ఫంక్షన్ కి ఆ Array లో అసలు ఎన్ని ఎలిమెంట్స్ ఉన్నాయో సైజు తెలిసిపోదు (సైజు పోతుంది)!
      </div>`;
content = content.replace(mDiag16_en, mDiag16_te);

content = content.replace('<h4 style="color:#ff7b72;">⚠️ The Infamous sizeof(arr) Inside Functions Trap:</h4>', '<h4 style="color:#ff7b72;">⚠️ ఫంక్షన్స్ లోపల sizeof(arr) వాడితే వచ్చే పెద్ద ప్రాబ్లం:</h4>');
content = content.replace('<p>If you call <code>sizeof(arr)</code> inside a function, it does <strong>NOT</strong> return the array size! It returns the size of the pointer (<strong>8 bytes on 64-bit CPU</strong>).<br>', '<p>మీరు పొరపాటున ఫంక్షన్ లోపల <code>sizeof(arr)</code> అని పిలిస్తే, అది <strong>Array సైజ్ ని ఇవ్వదు</strong>! అది లోపలికి పాయింటర్ లాగా వచ్చింది కాబట్టి ఆ పాయింటర్ సైజు ని ఇస్తుంది (<strong>సాధారణంగా 8 బైట్స్ అని వస్తుంది</strong>).<br>');
content = content.replace('✅ <strong>The Golden Rule:</strong> Always pass array size as an explicit second argument: <code>void process(int arr[], int size);</code></p>', '✅ <strong>దీనికి సొల్యూషన్:</strong> ఎప్పుడైనా Array ని ఫంక్షన్ కి ఇస్తున్నారంటే, కచ్చితంగా దానికి తోడుగా సైజు ని కూడా రెండో ఆర్గ్యుమెంట్ గా పంపాలి: <code>void process(int arr[], int size);</code></p>');

content = content.replace('<div class="section-title"><span class="num">2</span>In-Place Array Mutation &amp; const Read-Only Protection</div>', '<div class="section-title"><span class="num">2</span>In-Place మార్పులు &amp; "const" తో సేఫ్ గా ఉంచడం</div>');
content = content.replace('<p>Because the function receives the actual memory address, any element modified inside the function will <strong>directly alter the caller\'s original array in RAM</strong>. \n      If you want to prevent accidental modification, use the <strong><code>const</code></strong> modifier:</p>', '<p>ఫంక్షన్ కి లోపలికి డైరెక్ట్ గా మన ఒరిజినల్ అడ్రస్ వెళ్తుంది కాబట్టి, ఫంక్షన్ లోపల దాన్ని మార్చితే <strong>బయట మన ఒరిజినల్ Array కూడా మారిపోతుంది!</strong> \n      అలా ఫంక్షన్ మన డేటాని మార్చకుండా, కేవలం చూసుకొనేలా చేయాలంటే <strong><code>const</code></strong> అని వాడాలి:</p>');

content = content.replace('<div class="section-title"><span class="num">3</span>Architectural Limitations of C Arrays</div>', '<div class="section-title"><span class="num">3</span>C Arrays తో వచ్చే సమస్యలు (లిమిటేషన్స్)</div>');
content = content.replace('<tr><th>Limitation</th><th>Technical Consequence in C</th><th>Modern Alternative Solution</th></tr>', '<tr><th>సమస్య (Limitation)</th><th>C లో దాని ప్రభావం</th><th>దీనికి సొల్యూషన్ ఏంటి?</th></tr>');
content = content.replace('<td><strong>Fixed Compile-Time Size</strong></td><td>Static arrays cannot grow or shrink dynamically during program runtime.</td><td>Dynamic Heap Memory via <code>malloc()</code> and <code>realloc()</code>.</td>', '<td><strong>సైజు ఫిక్స్డ్ గా ఉండటం</strong></td><td>ఒకసారి సైజు ఇచ్చాక ప్రోగ్రామ్ రన్ అయ్యేటప్పుడు దాన్ని పెంచలేము, తగ్గించలేము.</td><td><code>malloc()</code> వాడి Dynamic గా మెమరీ క్రియేట్ చేయాలి.</td>');
content = content.replace('<td><strong>Homogeneous Types Only</strong></td><td>Cannot mix different types (e.g. integer and string in same array).</td><td>Structures (<code>struct</code>).</td>', '<td><strong>ఒకే రకమైన డేటా ఉండటం</strong></td><td>నెంబర్లని, పేర్లని కలిపి ఒకే Array లో పెట్టలేము.</td><td>దీనికి బదులు <code>struct</code> వాడాలి.</td>');
content = content.replace('<td><strong>No Self-Aware Length</strong></td><td>Array does not carry length metadata; developer must manually track size.</td><td>Custom Struct with array pointer + size field.</td>', '<td><strong>సైజు దానికి తెలియకపోవడం</strong></td><td>తన సైజు ఎంతో దానికి తెలియదు, మనమే దాన్ని గుర్తుపెట్టుకొని క్యాలిక్యులేట్ చేయాలి.</td><td>పాయింటర్ తో పాటు సైజు కూడా ఇచ్చేలా కస్టమ్ స్ట్రక్చర్ వాడాలి.</td>');
content = content.replace('<td><strong>No Memory Bounds Checks</strong></td><td>Index out of bounds causes buffer overflow crashes or security breaches.</td><td>Explicit loop boundary conditions.</td>', '<td><strong>సైజు లిమిట్ చెక్ చేయకపోవడం</strong></td><td>లిమిట్ దాటితే ఆపదు, వేరే మెమరీ లోకి వెళ్లి హ్యాక్ కి ఛాన్స్ ఇస్తుంది.</td><td>లూప్ రాసేటప్పుడే కరెక్ట్ గా లిమిట్స్ ఇవ్వాలి.</td>');


// LESSON 17 Replaces (first part)
content = content.replace(/const title = "C Array Algorithms: Linear Search, Bubble Sort, Min\/Max & Manipulation";/, 'const title = "C Array Algorithms: Linear Search, Bubble Sort, Min/Max (తెలుగులో)";');
content = content.replace(/const desc = "Deep algorithmic masterclass on C Array Processing \(Phase 7 Part 4\): Computing Sum and Average, Single-pass Min\/Max search, Linear Search algorithm, Bubble Sort with early exit optimization, In-place array reversal \(two-pointer technique\), and Merging arrays\.";/, 'const desc = "C Array Algorithms (Phase 7 Part 4): Array లో Sum & Average కనుక్కోవడం, Min & Max వాల్యూస్ వెతకడం, Linear Search, Bubble Sort లాజిక్, Array రివర్స్ చేయడం, మరియు రెండు Arrays ని ఎలా కలుపుతారో తెలుగులో నేర్చుకుందాం.";');

let intro17_en = '<p>Welcome to <strong>Phase 7 (Chapter 17): Classical Array Algorithms, Searching, Sorting & Memory Manipulation Masterclass</strong>! Arrays are the bedrock upon which computer science algorithms operate. In this comprehensive guide, you will master the mathematical and programmatic implementations of <strong>6 foundational algorithmic operations</strong>: calculating Sum & Average without precision loss, finding Minimum and Maximum values in a single $O(N)$ pass, Linear Searching, optimized Bubble Sorting, two-pointer in-place array reversal, and merging arrays into unified memory buffers.</p>';
let intro17_te = '<p><strong>Phase 7 (Chapter 17): Classical Array Algorithms & Sorting Masterclass</strong> కు స్వాగతం! కంప్యూటర్ సైన్స్ అల్గారిథమ్స్ అన్నీ బేసిక్ గా Arrays తోనే మొదలవుతాయి. ఈ గైడ్ లో, ఒక ప్రోగ్రామర్ కచ్చితంగా నేర్చుకోవాల్సిన <strong>6 ముఖ్యమైన అల్గారిథమ్స్</strong> చూద్దాం. అవి: Array లో ఉన్న నంబర్స్ అన్నింటినీ కలపడం (Sum & Average), అందులో పెద్ద, చిన్న నంబర్స్ ని వెతకడం (Min & Max), ఒక నంబర్ ఎక్కడుందో వెతకడం (Linear Search), నంబర్స్ ని ఆర్డర్ లో పెట్టడం (Bubble Sort), Array ని వెనకనుండి ముందుకు మార్చడం (Reversal), మరియు రెండు Arrays ని ఒకటిగా కలపడం (Merging) ఎలాగో తెలుగులో నేర్చుకుందాం.</p>';
content = content.replace(intro17_en, intro17_te);

content = content.replace('<div class="section-title"><span class="num">1</span>Sum, Average &amp; Min/Max Analysis</div>', '<div class="section-title"><span class="num">1</span>Sum, Average &amp; Min/Max ని ఒకే లూప్ లో కనుక్కోవడం</div>');
content = content.replace('<div class="concept-box">\n        <h4>📊 Precision &amp; $O(N)$ Single-Pass Efficiency</h4>\n        <p>Instead of writing multiple loops to find the Sum, Min, and Max, professional engineers combine these aggregations into a <strong>Single $O(N)$ Iteration Pass</strong> for maximum cache efficiency. To calculate Average, cast the Sum to <code>(double)</code> to prevent integer truncation!</p>\n      </div>', '<div class="concept-box">\n        <h4>📊 ఒకే లూప్ లో అన్నీ కనిపెట్టడం (O(N) Efficiency)</h4>\n        <p>పెద్ద ప్రోగ్రామర్స్ Sum, Min, Max కనుక్కోవడానికి వేర్వేరు లూప్స్ రాయకుండా, అన్నింటినీ <strong>ఒకే లూప్ లో (Single Pass)</strong> కంప్లీట్ చేస్తారు. అలాగే ఆవరేజ్ కనుక్కునేటప్పుడు పాయింట్స్ లో వాల్యూ పోకుండా ఉండటానికి <code>(double)</code> వాడతారు!</p>\n      </div>');

content = content.replace('<div class="section-title"><span class="num">2</span>Linear Search &amp; Optimized Bubble Sort</div>', '<div class="section-title"><span class="num">2</span>Linear Search &amp; ఆప్టిమైజ్ చేసిన Bubble Sort</div>');
content = content.replace('<h4>🔍 1. Linear Search Algorithm ($O(N)$)</h4>', '<h4>🔍 1. Linear Search అంటే ఏంటి? ($O(N)$)</h4>');
content = content.replace('<p>Iterates from index 0 to N-1. If target is found, it returns the index immediately. If loop finishes without finding it, returns -1.</p>', '<p>Array లో ఫస్ట్ నుండి లాస్ట్ వరకు లైన్ గా ఒక్కో దాన్ని చెక్ చేసుకుంటూ వెళ్తుంది. కావాల్సిన నంబర్ దొరికితే వెంటనే దాని ఇండెక్స్ ఇస్తుంది. మొత్తం వెతికినా దొరకకపోతే -1 ఇస్తుంది.</p>');
content = content.replace('<h4>🫧 2. Optimized Bubble Sort ($O(N^2)$)</h4>', '<h4>🫧 2. ఆప్టిమైజ్ చేసిన Bubble Sort ($O(N^2)$)</h4>');
content = content.replace('<p>Repeatedly swaps adjacent elements if they are in the wrong order. <em>Optimization:</em> If a full pass occurs with ZERO swaps, the array is already sorted and we can safely <code>break</code> early!</p>', '<p>పక్కపక్కన ఉన్న రెండు నంబర్స్ ని చెక్ చేస్తూ, ఆర్డర్ తప్పుంటే వాటిని అటుఇటు మారుస్తుంది (Swap). <em>టిప్:</em> ఒకవేళ ఒక రౌండ్ మొత్తం తిరిగినా ఒక్కసారి కూడా స్వాప్ చేయలేదంటే దాని అర్థం అన్నీ కరెక్ట్ ఆర్డర్ లోకి వచ్చేసినట్టే, కాబట్టి లూప్ ని <code>break</code> తో ఆపేయొచ్చు!</p>');

content = content.replace('<div class="section-title"><span class="num">3</span>In-Place Array Reversal &amp; Array Merging</div>', '<div class="section-title"><span class="num">3</span>Array రివర్స్ చేయడం (In-Place) &amp; మెర్జింగ్ (Merging)</div>');
content = content.replace('<h4>🔄 1. In-Place Reversal (Two-Pointer Technique)</h4>', '<h4>🔄 1. Array రివర్స్ చేయడం (Two-Pointer లాజిక్)</h4>');
content = content.replace('<p>Instead of creating a new secondary array (which wastes RAM), we use a <code>left</code> index and a <code>right</code> index. We swap them and move them towards the center until they cross ($O(N/2)$ operations).</p>', '<p>కొత్త Array క్రియేట్ చేసి మెమరీ వేస్ట్ చేసే బదులు, ఫస్ట్ లో ఒక పాయింటర్ (left), లాస్ట్ లో ఒక పాయింటర్ (right) పెడతాము. ఆ రెంటినీ మారుస్తూ, మధ్యలోకి వచ్చేదాకా వెళ్తాము (దీనివల్ల సగం టైం లోనే ప్రోగ్రామ్ అయిపోతుంది).</p>');
content = content.replace('<h4>🧬 2. Merging Two Arrays</h4>', '<h4>🧬 2. రెండు Arrays ని ఒకటిగా కలపడం (Merging)</h4>');
content = content.replace('<p>Given Array A (size M) and Array B (size N), we allocate a target Array C (size M+N). We first copy all of A, then sequentially append all of B using an offset.</p>', '<p>A అనే Array, B అనే Array ఉన్నప్పుడు, ఆ రెంటి సైజు కలిపి ఉండే C అనే కొత్త Array క్రియేట్ చేస్తాము. ముందు A మొత్తాన్ని అందులోకి కాపీ చేసి, ఆ తర్వాత B ని కాపీ చేస్తాము.</p>');

fs.writeFileSync(path, content, 'utf8');
console.log('updated c phase 7 successfully');
