const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./c_curriculum_data.js');

const lesson = LESSONS.find(l => l.num === 20);
const sidebarHtml = buildSidebar(20);

const chapterContentHtml = `
    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-c.html">C Masterclass</a><span class="sep">›</span>
      <span class="current">Chapter 20: కంప్లీట్ మినీ ప్రాజెక్ట్: స్టూడెంట్ రికార్డ్ మేనేజ్‌మెంట్ సిస్టమ్</span>
    </div>

    <!-- PAGE TITLE -->
    <h1 class="page-title">C గ్రాండ్ మినీ ప్రాజెక్ట్: స్టూడెంట్ రికార్డ్ మేనేజ్‌మెంట్ సిస్టమ్ (CRUD &amp; Binary Persistence)</h1>

    <!-- PAGE META BADGES -->
    <div class="page-meta">
      <span class="badge">⚡ Modern C (C99 / C11 / C17 Standards)</span>
      <span class="badge">🏆 Chapter 20 of 20 (Capstone Project)</span>
      <span class="badge">📂 Phase 05: స్ట్రక్చర్స్, డైనమిక్ మెమరీ &amp; ప్రాజెక్ట్</span>
      <span class="badge">📅 2026 Academic Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this capstone:</span>
      <span>సాఫ్ట్‌వేర్ ఆర్కిటెక్చర్ · CRUD ఆపరేషన్స్ · Structs &amp; Binary Persistence · ఇన్-ప్లేస్ fseek() అప్‌డేట్ · ఫిజికల్ డిలీషన్ &amp; కాంపాక్షన్ · qsort() మెరిట్ ర్యాంకింగ్ · CSV ఎక్స్‌పోర్ట్ · ఇన్‌పుట్ బఫర్ శానిటైజేషన్ · ప్రొడక్షన్ గ్రేడ్ ఫుల్ కోడ్</span>
    </div>

    <!-- WARM IVORY INTRO ACCENT BOX -->
    <div class="intro-box">
      <h3>అభినందనలు C డెవలపర్! 🎓 మన 20 అధ్యాయాల ప్రయాణంలో శిఖరాగ్రానికి చేరుకున్నాం!</h3>
      <p>
        మొదటి అధ్యాయంలో <code>printf("Hello, World!");</code> రాయడం నుండి ప్రారంభించి... వేరియబుల్స్, కండిషనల్స్, లూప్స్, ఫంక్షన్స్, 
        రికార్షన్, అర్రేలు, స్ట్రింగ్స్, పాయింటర్లు, డబుల్ పాయింటర్లు, స్ట్రక్చర్లు, డైనమిక్ మెమరీ (DMA), మరియు బైనరీ ఫైల్ హ్యాండ్లింగ్ వరకు 
        ప్రతి కాన్సెప్ట్‌ను లోతుగా అన్వేషించాం.
      </p>
      <p style="margin-top:10px;">
        ఇప్పుడు వీటన్నింటినీ ఒకచోట చేర్చి ఒక వాస్తవ ప్రపంచ, ఇండస్ట్రీ-స్టాండర్డ్ 
        <strong>స్టూడెంట్ రికార్డ్ మేనేజ్‌మెంట్ సిస్టమ్ (Student Record Management CLI System)</strong> ను మొదటి నుండి చివరి వరకు నిర్మిద్దాం. 
        ఇది కేవలం ఒక చిన్న డెమో కాదు—పూర్తి స్థాయి CRUD ఆపరేషన్లు, బైనరీ ఫైల్ పర్సిస్టెన్స్, రాండమ్-యాక్సెస్ అప్‌డేట్స్, ఆటోమేటిక్ మెరిట్ ర్యాంకింగ్ మరియు 
        ఎక్సెల్ CSV ఎక్స్‌పోర్ట్‌తో కూడిన ఒక పూర్తి ఉత్పత్తి!
      </p>
    </div>

    <!-- SECTION 1 -->
    <section class="section">
      <h2><span class="num">1</span> ప్రాజెక్ట్ అవలోకనం &amp; సాఫ్ట్‌వేర్ ఆర్కిటెక్చర్ (System Architecture)</h2>
      <p>
        ఒక సాఫ్ట్‌వేర్ ప్రాజెక్ట్ కోడింగ్ ప్రారంభించే ముందు, దాని ఆర్కిటెక్చర్ మరియు డేటా ప్రవాహాన్ని డిజైన్ చేసుకోవడం అత్యంత ఉత్తమ ఇంజనీరింగ్ పద్ధతి. 
        మన స్టూడెంట్ రికార్డ్ మేనేజర్ <strong>CRUD (Create, Read, Update, Delete)</strong> మోడల్‌పై ఆధారపడి పనిచేస్తుంది:
      </p>

      <div class="table-wrap" style="margin:20px 0;">
        <table class="tbl">
          <thead>
            <tr>
              <th>CRUD ఆపరేషన్</th>
              <th>సిస్టమ్ ఫంక్షన్</th>
              <th>ఫైల్ మోడ్</th>
              <th>సాంకేతిక వివరణ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>C - Create</strong></td>
              <td><code>add_student()</code></td>
              <td><code>"ab"</code> (Append Binary)</td>
              <td>యూజర్ వివరాలను చదివి, CGPA లెక్కించి, బైనరీ రికార్డును ఫైల్ చివరన శాశ్వతంగా రాస్తుంది.</td>
            </tr>
            <tr>
              <td><strong>R - Read</strong></td>
              <td><code>view_all()</code> / <code>search()</code></td>
              <td><code>"rb"</code> (Read Binary)</td>
              <td>ఫైల్ నుండి డేటాను చదివి చక్కటి టేబులర్ ఫార్మాట్‌లో కన్సోల్ పై ప్రదర్శిస్తుంది.</td>
            </tr>
            <tr>
              <td><strong>U - Update</strong></td>
              <td><code>update_student()</code></td>
              <td><code>"rb+"</code> (Read/Write Binary)</td>
              <td><code>fseek()</code> ద్వారా నిర్దిష్ట రికార్డును గుర్తించి ఇన్-ప్లేస్ (అక్కడికక్కడే) సవరిస్తుంది.</td>
            </tr>
            <tr>
              <td><strong>D - Delete</strong></td>
              <td><code>delete_student()</code></td>
              <td><code>"rb"</code> &amp; <code>"wb"</code></td>
              <td>టెంపరరీ ఫైల్ టెక్నిక్ ద్వారా తొలగించాల్సిన రికార్డును మినహాయించి డేటాబేస్‌ను రీరైట్ చేస్తుంది.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>సిస్టమ్ డేటా ఫ్లో ఆర్కిటెక్చర్:</h3>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0; font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.6; color:var(--text1);">
[ User Terminal / Console UI ]<br/>
          │<br/>
          ▼  (Menu Selection: 1 to 8)<br/>
[ Input Sanitation &amp; Validation Layer ]  &lt;--- బఫర్ క్లియరింగ్, రేంజ్ చెక్స్<br/>
          │<br/>
          ▼  (Business Logic &amp; Struct Processing)<br/>
[ Memory Engine: Student Struct / Heap Buffer ]<br/>
          │<br/>
          ▼  (fread / fwrite / fseek)<br/>
[ Binary Persistence Engine: "students.dat" on Disk ]<br/>
          │<br/>
          ▼  (Optional Export)<br/>
[ Spreadsheet Ready CSV: "students_export.csv" ]
      </div>
    </section>

    <!-- SECTION 2 -->
    <section class="section">
      <h2><span class="num">2</span> డేటా స్ట్రక్చర్ డిజైన్: typedef struct మరియు డొమైన్ మోడలింగ్</h2>
      <p>
        మన డేటాబేస్ యొక్క గుండెకాయ <strong><code>Student</code></strong> స్ట్రక్చర్. 
        విద్యార్థి వ్యక్తిగత సమాచారం, అకడమిక్ మార్కులు మరియు సిస్టమ్ స్టేటస్ అన్నీ ఇందులో సమగ్రంగా భద్రపరచబడతాయి:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Student Struct Definition &amp; Domain Modeling</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#define MAX_NAME 50
#define MAX_COURSE 30
#define NUM_SUBJECTS 5
#define DB_FILE "students.dat"
#define CSV_FILE "students_export.csv"

typedef struct {
    int roll_no;                    // ప్రత్యేక రోల్ నంబర్ (Primary Key)
    char name[MAX_NAME];            // విద్యార్థి పూర్తి పేరు
    char course[MAX_COURSE];        // బ్రాంచ్ / కోర్సు (ఉదా: CSE, ECE)
    float marks[NUM_SUBJECTS];      // 5 సబ్జెక్టుల మార్కులు
    float total_marks;              // మొత్తం మార్కులు
    float cgpa;                     // CGPA (స్కేల్: 10.0)
    char grade[4];                  // లెటర్ గ్రేడ్ (A+, A, B, etc.)
} Student;</code></pre>
      </div>

      <div class="tip-box" style="background:rgba(16,185,129,0.08); border-left:4px solid #10b981; padding:14px; margin:16px 0; border-radius:4px;">
        <strong style="color:#059669;">💡 ఫిక్స్డ్ సైజ్ అర్రేల ప్రాముఖ్యత:</strong><br/>
        బైనరీ ఫైల్ హ్యాండ్లింగ్‌లో స్ట్రక్చర్ లోపల డైనమిక్ పాయింటర్లు (ఉదా: <code>char *name</code>) వాడకూడదు! ఎందుకంటే పాయింటర్ కేవలం RAM అడ్రస్‌ను మాత్రమే డిస్క్‌పై రాస్తుంది (డేటాను కాదు). 
        ఫిక్స్డ్ సైజ్ అర్రేలు (<code>char name[50]</code>) వాడినప్పుడు మాత్రమే ప్రతి రికార్డు ఖచ్చితమైన <code>sizeof(Student)</code> బైట్లతో డిస్క్‌పై నిల్వ అవుతుంది.
      </div>
    </section>

    <!-- SECTION 3 -->
    <section class="section">
      <h2><span class="num">3</span> మోడ్యులర్ కోడ్ ఆర్కిటెక్చర్ &amp; ఫంక్షన్ ప్రోటోటైప్స్</h2>
      <p>
        ఒక పెద్ద ప్రాజెక్ట్‌ను రాసేటప్పుడు మొత్తం కోడ్‌ను <code>main()</code> లో గుమ్మరించకూడదు! 
        సింగిల్ రెస్పాన్సిబిలిటీ ప్రిన్సిపల్ (Single Responsibility Principle) ప్రకారం ప్రతి బాధ్యతకు ఒక ప్రత్యేక ఫంక్షన్ ఉండాలి:
      </p>

      <ul>
        <li><code>void display_menu(void);</code> — ప్రధాన మెనూ ఇంటర్‌ఫేస్.</li>
        <li><code>void add_student(void);</code> — కొత్త రికార్డు నమోదు &amp; డూప్లికేట్ వెరిఫికేషన్.</li>
        <li><code>void view_all_students(void);</code> — మొత్తం విద్యార్థుల టేబులర్ లిస్టింగ్.</li>
        <li><code>void search_student(void);</code> — రోల్ నంబర్ లేదా పేరుతో శోధన.</li>
        <li><code>void update_student(void);</code> — మార్కులు లేదా కోర్సు సవరణ.</li>
        <li><code>void delete_student(void);</code> — రికార్డును శాశ్వతంగా తొలగించడం.</li>
        <li><code>void show_merit_list(void);</code> — CGPA ఆధారంగా టాప్ ర్యాంకర్ల సార్టింగ్.</li>
        <li><code>void export_to_csv(void);</code> — ఎక్సెల్ షీట్‌లోకి ఎగుమతి.</li>
        <li><code>void clear_input_buffer(void);</code> — ఇన్‌పుట్ బఫర్ శానిటైజేషన్.</li>
      </ul>
    </section>

    <!-- SECTION 4 -->
    <section class="section">
      <h2><span class="num">4</span> ఇన్‌పుట్ శానిటైజేషన్, బఫర్ క్లియరింగ్ &amp; వాలిడేషన్</h2>
      <p>
        C ప్రోగ్రామింగ్‌లో అత్యంత సాధారణమైన క్రాష్: యూజర్ నుండి సంఖ్యను రీడ్ చేయడానికి <code>scanf("%d", ...)</code> వాడి, 
        ఆ తర్వాత స్ట్రింగ్ చదవడానికి <code>fgets()</code> వాడినప్పుడు జరుగుతుంది. 
        <code>scanf</code> సంఖ్యను తీసుకుంటుంది కానీ యూజర్ నొక్కిన <strong>Enter key (<code>'\\n'</code>)</strong> ను ఇన్‌పుట్ బఫర్‌లోనే వదిలేస్తుంది! 
        దానివల్ల తర్వాతి <code>fgets()</code> ఏమీ చదవకుండానే ఖాళీగా స్కిప్ అయిపోతుంది!
      </p>

      <h3>పర్ఫెక్ట్ బఫర్ క్లీనర్ యుటిలిటీ:</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Buffer Sanitation &amp; Trailing Newline Trimming</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>// కీబోర్డ్ ఇన్‌పుట్ బఫర్‌లో మిగిలిపోయిన న్యూలైన్ మరియు అదనపు క్యారెక్టర్లను తుడిచిపెట్టే ఫంక్షన్
void clear_input_buffer() {
    int c;
    while ((c = getchar()) != '\\n' &amp;&amp; c != EOF);
}

// fgets నుండి వచ్చే చివరి '\\n' ను సురక్షితంగా తొలగించడం
void trim_newline(char *str) {
    size_t len = strlen(str);
    if (len &gt; 0 &amp;&amp; str[len - 1] == '\\n') {
        str[len - 1] = '\\0';
    }
}</code></pre>
      </div>
    </section>

    <!-- SECTION 5 -->
    <section class="section">
      <h2><span class="num">5</span> Create (C) ఇంప్లిమెంటేషన్: డూప్లికేట్ రోల్ నంబర్ చెకింగ్ &amp; బైనరీ అపెండ్</h2>
      <p>
        ఒక విద్యార్థిని జోడించే ముందు మనం రెండు ముఖ్యమైన చెక్స్ చేయాలి:
      </p>
      <ol>
        <li>ఆ రోల్ నంబర్ ఇప్పటికే డేటాబేస్‌లో ఉందా లేదా పరిశీలించాలి (Primary Key Uniqueness).</li>
        <li>మార్కులు 0 నుండి 100 మధ్య మాత్రమే ఉండేలా ధృవీకరించాలి.</li>
      </ol>
      <p>
        ఆ తర్వాత 5 సబ్జెక్టుల మార్కుల సగటు ఆధారంగా <strong>CGPA = Total / 50.0</strong> మరియు లెటర్ గ్రేడ్ (O, A+, A, B+, B, C, F) 
        ఆటోమేటిక్‌గా లెక్కించబడి <code>fwrite()</code> ద్వారా <code>"ab"</code> మోడ్‌లో భద్రపరచబడుతుంది.
      </p>
    </section>

    <!-- SECTION 6 -->
    <section class="section">
      <h2><span class="num">6</span> Read (R) ఇంప్లిమెంటేషన్: ఫార్మాటెడ్ టేబుల్ రిపోర్ట్ &amp; సెర్చ్ అల్గారిథమ్స్</h2>
      <p>
        డేటాబేస్‌లోని రికార్డులను సాధారణ టెక్స్ట్‌లా కాకుండా, ఒక ప్రొఫెషనల్ అడ్మిన్ డ్యాష్‌బోర్డ్‌లా 
        కాలమ్ హెడర్లు, బోర్డర్లు మరియు చక్కటి అమరికతో ప్రదర్శించాలి.
      </p>
      <p>
        శోధన ఫీచర్ (Search) లో రెండు ఆప్షన్లు ఉంటాయి:
      </p>
      <ul>
        <li><strong>రోల్ నంబర్ ద్వారా శోధన:</strong> ఖచ్చితమైన విద్యార్థిని సెకన్లలో గుర్తిస్తుంది.</li>
        <li><strong>పేరు ద్వారా శోధన (Substring Search):</strong> <code>strstr()</code> ద్వారా పేరులోని ఏ భాగాన్నైనా (ఉదా: "వర్మ" లేదా "శర్మ") గుర్తించి చూపిస్తుంది.</li>
      </ul>
    </section>

    <!-- SECTION 7 -->
    <section class="section">
      <h2><span class="num">7</span> Update (U) ఇంప్లిమెంటేషన్: fseek() ద్వారా ఇన్-ప్లేస్ బైనరీ రికార్డ్ సవరణ</h2>
      <p>
        రికార్డును సవరించడానికి చాలామంది బిగినర్లు ఫైల్ మొత్తాన్ని మెమరీలోకి తెచ్చి, మార్చి, మళ్లీ మొత్తం ఫైల్‌ను మొదటినుండి రీరైట్ చేస్తారు. 
        కానీ రికార్డులు లక్షల్లో ఉంటే ఇది చాలా నెమ్మదిగా మారుతుంది.
      </p>
      <p>
        C భాషలో <strong><code>"rb+"</code> (Read and Write Binary)</strong> మోడ్ మరియు <strong><code>fseek()</code></strong> కాంబినేషన్‌తో 
        మనం సరిగ్గా ఆ ఒక్క రికార్డు స్థానానికి వెళ్లి, అక్కడికక్కడే (In-Place) ఓవర్‌రైట్ చేయవచ్చు!
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0; font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.6; color:var(--text1);">
// ఇన్-ప్లేస్ అప్‌డేట్ మ్యాజిక్ లాజిక్:<br/>
while (fread(&amp;s, sizeof(Student), 1, fp) == 1) {<br/>
    if (s.roll_no == target_roll) {<br/>
        // 1. fread కర్సర్‌ను ఒక రికార్డు ముందుకు తీసుకెళ్లింది!<br/>
        // 2. కాబట్టి కరెక్ట్ గా ఒక రికార్డు వెనక్కి జంప్ చేయాలి:<br/>
        fseek(fp, -((long)sizeof(Student)), SEEK_CUR);<br/>
        // 3. ఇప్పుడే కొత్త రికార్డును ఓవర్‌రైట్ చేయాలి:<br/>
        fwrite(&amp;updated_s, sizeof(Student), 1, fp);<br/>
        break;<br/>
    }<br/>
}
      </div>
    </section>

    <!-- SECTION 8 -->
    <section class="section">
      <h2><span class="num">8</span> Delete (D) ఇంప్లిమెంటేషన్: ఫిజికల్ డిలీషన్ &amp; ఫైల్ కాంపాక్షన్ టెక్నిక్</h2>
      <p>
        ఒక బైనరీ ఫైల్ మధ్యలో ఉన్న డేటాను నేరుగా తొలగించి ఖాళీని పూడ్చడం హార్డ్ డిస్క్‌లలో సాధ్యపడదు. 
        దీనికి ఇండస్ట్రీలో ప్రామాణికంగా వాడే విధానం <strong>తాత్కాలిక ఫైల్ (Temporary File Compaction)</strong> టెక్నిక్:
      </p>
      <ol style="line-height:1.8;">
        <li>ప్రధాన ఫైల్ <code>"students.dat"</code> ను రీడ్ మోడ్‌లో తెరవడం.</li>
        <li>కొత్తగా <code>"temp.dat"</code> అనే తాత్కాలిక ఫైల్‌ను రైట్ మోడ్‌లో సృష్టించడం.</li>
        <li>మనం డిలీట్ చేయాలనుకున్న రోల్ నంబర్ <em>మినహా</em> మిగిలిన అన్ని రికార్డులను <code>temp.dat</code> లోకి కాపీ చేయడం.</li>
        <li>రెండు ఫైల్స్‌నూ క్లోజ్ చేయడం.</li>
        <li><code>remove("students.dat");</code> ద్వారా పాత ఫైల్‌ను డిలీట్ చేయడం.</li>
        <li><code>rename("temp.dat", "students.dat");</code> ద్వారా తాత్కాలిక ఫైల్‌ను ప్రధాన ఫైల్‌గా మార్చడం!</li>
      </ol>
    </section>

    <!-- SECTION 9 -->
    <section class="section">
      <h2><span class="num">9</span> అడ్వాన్స్‌డ్ ఫీచర్: మెరిట్ ర్యాంకింగ్ &amp; qsort() అల్గారిథమ్</h2>
      <p>
        విద్యార్థుల డేటాబేస్ అంటే కేవలం స్టోర్ చేయడం మాత్రమే కాదు—తరగతిలో అత్యధిక మార్కులు సాధించిన టాప్ ర్యాంకర్లను గుర్తించడం అత్యంత ఆకర్షణీయమైన ఫీచర్.
      </p>
      <p>
        దీనికోసం మనం ఫైల్‌లోని మొత్తం రికార్డుల సంఖ్యను లెక్కించి, <code>malloc()</code> ద్వారా డైనమిక్ మెమరీని రిజర్వ్ చేసి, 
        C స్టాండర్డ్ లైబ్రరీలోని హై-స్పీడ్ <strong><code>qsort()</code></strong> (Quicksort) అల్గారిథమ్‌తో CGPA ఆధారంగా డిసెండింగ్ ఆర్డర్‌లో క్రమబద్ధీకరిస్తాం!
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Merit Ranking Comparator for qsort()</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>// qsort కోసం CGPA డిసెండింగ్ కంపేరేటర్ ఫంక్షన్
int compare_students_by_cgpa(const void *a, const void *b) {
    const Student *s1 = (const Student *)a;
    const Student *s2 = (const Student *)b;
    if (s2-&gt;cgpa &gt; s1-&gt;cgpa) return 1;
    if (s2-&gt;cgpa &lt; s1-&gt;cgpa) return -1;
    return 0;
}</code></pre>
      </div>
    </section>

    <!-- SECTION 10 -->
    <section class="section">
      <h2><span class="num">10</span> డేటాబేస్ ఎక్స్‌పోర్ట్ టు CSV (Excel Spreadsheet Integration)</h2>
      <p>
        మన ప్రోగ్రామ్ బైనరీ ఫైల్ వాడుతుంది కాబట్టి సాధారణ వినియోగదారులు ఆ ఫైల్‌ను నేరుగా చూడలేరు. 
        కానీ కళాశాల యాజమాన్యం ఆ డేటాను Microsoft Excel లేదా Google Sheets లో చూడాలనుకోవచ్చు!
      </p>
      <p>
        ఈ ఫీచర్ ద్వారా మన C ప్రోగ్రామ్ బైనరీ ఫైల్‌లోని ప్రతి రికార్డును చదివి, కామాలతో వేరుచేయబడిన 
        <strong><code>students_export.csv</code></strong> (Comma-Separated Values) ఫైల్‌గా ఎగుమతి చేస్తుంది. 
        ఎక్సెల్‌లో దీనిపై డబుల్ క్లిక్ చేయగానే అందమైన స్ప్రెడ్‌షీట్‌గా ఓపెన్ అవుతుంది!
      </p>
    </section>

    <!-- SECTION 11 -->
    <section class="section">
      <h2><span class="num">11</span> కంప్లీట్ ప్రొడక్షన్-గ్రేడ్ సోర్స్ కోడ్ (Single File Executable Masterpiece)</h2>
      <p>
        ఇదిగోండి మన 20 అధ్యాయాల సమగ్ర C మాస్టర్‌క్లాస్ యొక్క పూర్తి ముగింపు ప్రాజెక్ట్ సోర్స్ కోడ్! 
        దీనిని కాపీ చేసి రన్ చేయండి:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Complete Student Record Management Capstone CLI System</span>
          <div class="code-actions">
            <a class="try-btn" href="/online-c-compiler.html" target="_blank">▶ Run in Online C Compiler</a>
          </div>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;

#define MAX_NAME 50
#define MAX_COURSE 30
#define NUM_SUBJECTS 5
#define DB_FILE "students.dat"
#define CSV_FILE "students_export.csv"

// విద్యార్థి సమాచార స్ట్రక్చర్
typedef struct {
    int roll_no;
    char name[MAX_NAME];
    char course[MAX_COURSE];
    float marks[NUM_SUBJECTS];
    float total_marks;
    float cgpa;
    char grade[4];
} Student;

// యుటిలిటీ ఫంక్షన్లు
void clear_input_buffer() {
    int c;
    while ((c = getchar()) != '\\n' &amp;&amp; c != EOF);
}

void trim_newline(char *str) {
    size_t len = strlen(str);
    if (len &gt; 0 &amp;&amp; str[len - 1] == '\\n') {
        str[len - 1] = '\\0';
    }
}

// గ్రేడ్ మరియు CGPA లెక్కింపు
void calculate_academics(Student *s) {
    s-&gt;total_marks = 0;
    for (int i = 0; i &lt; NUM_SUBJECTS; i++) {
        s-&gt;total_marks += s-&gt;marks[i];
    }
    // గరిష్ట మార్కులు 500 అనుకుంటే, 10 పాయింట్ స్కేల్:
    s-&gt;cgpa = s-&gt;total_marks / 50.0f;

    if (s-&gt;cgpa &gt;= 9.0f) strcpy(s-&gt;grade, "O");
    else if (s-&gt;cgpa &gt;= 8.0f) strcpy(s-&gt;grade, "A+");
    else if (s-&gt;cgpa &gt;= 7.0f) strcpy(s-&gt;grade, "A");
    else if (s-&gt;cgpa &gt;= 6.0f) strcpy(s-&gt;grade, "B+");
    else if (s-&gt;cgpa &gt;= 5.0f) strcpy(s-&gt;grade, "B");
    else if (s-&gt;cgpa &gt;= 4.0f) strcpy(s-&gt;grade, "C");
    else strcpy(s-&gt;grade, "F");
}

// రోల్ నంబర్ డూప్లికేట్ ఉందో లేదో తనిఖీ
int check_roll_exists(int roll) {
    FILE *fp = fopen(DB_FILE, "rb");
    if (!fp) return 0;

    Student s;
    while (fread(&amp;s, sizeof(Student), 1, fp) == 1) {
        if (s.roll_no == roll) {
            fclose(fp);
            return 1;
        }
    }
    fclose(fp);
    return 0;
}

// 1. కొత్త విద్యార్థిని చేర్చడం (Create)
void add_student() {
    Student s;
    printf("\\n--- కొత్త విద్యార్థి నమోదు ---\\n");
    printf("రోల్ నంబర్ ఎంటర్ చేయండి: ");
    if (scanf("%d", &amp;s.roll_no) != 1 || s.roll_no &lt;= 0) {
        printf("❌ చెల్లని రోల్ నంబర్!\\n");
        clear_input_buffer();
        return;
    }
    clear_input_buffer();

    if (check_roll_exists(s.roll_no)) {
        printf("⚠️ ఎర్రర్: రోల్ నంబర్ %d తో ఇప్పటికే ఒక రికార్డు ఉంది!\\n", s.roll_no);
        return;
    }

    printf("పూర్తి పేరు: ");
    if (fgets(s.name, sizeof(s.name), stdin)) trim_newline(s.name);

    printf("కోర్సు / బ్రాంచ్ (ఉదా: CSE, ECE): ");
    if (fgets(s.course, sizeof(s.course), stdin)) trim_newline(s.course);

    printf("%d సబ్జెక్టుల మార్కులు ఎంటర్ చేయండి (0 - 100):\\n", NUM_SUBJECTS);
    for (int i = 0; i &lt; NUM_SUBJECTS; i++) {
        while (1) {
            printf("  సబ్జెక్ట్ %d మార్కులు: ", i + 1);
            if (scanf("%f", &amp;s.marks[i]) == 1 &amp;&amp; s.marks[i] &gt;= 0.0f &amp;&amp; s.marks[i] &lt;= 100.0f) {
                break;
            }
            printf("  ❌ దయచేసి 0 నుండి 100 మధ్య మాత్రమే ఇవ్వండి!\\n");
            clear_input_buffer();
        }
    }
    clear_input_buffer();

    calculate_academics(&amp;s);

    FILE *fp = fopen(DB_FILE, "ab");
    if (!fp) {
        perror("డేటాబేస్ ఫైల్ ఓపెన్ విఫలమైంది");
        return;
    }
    fwrite(&amp;s, sizeof(Student), 1, fp);
    fclose(fp);

    printf("✅ విద్యార్థి %s విజయవంతంగా సేవ్ అయ్యారు! (CGPA: %.2f | గ్రేడ్: %s)\\n", s.name, s.cgpa, s.grade);
}

// 2. అందరు విద్యార్థులను చూపించడం (Read)
void view_all_students() {
    FILE *fp = fopen(DB_FILE, "rb");
    if (!fp) {
        printf("\\n⚠️ డేటాబేస్ ఖాళీగా ఉంది లేదా ఫైల్ లేదు!\\n");
        return;
    }

    Student s;
    printf("\\n========================================================================================\\n");
    printf("%-8s %-22s %-12s %-8s %-8s %-6s\\n", "రోల్ నం", "పేరు", "కోర్సు", "మొత్తం", "CGPA", "గ్రేడ్");
    printf("========================================================================================\\n");

    int count = 0;
    while (fread(&amp;s, sizeof(Student), 1, fp) == 1) {
        printf("%-8d %-22s %-12s %-8.1f %-8.2f %-6s\\n", 
               s.roll_no, s.name, s.course, s.total_marks, s.cgpa, s.grade);
        count++;
    }
    printf("----------------------------------------------------------------------------------------\\n");
    printf("మొత్తం విద్యార్థుల సంఖ్య: %d\\n\\n", count);
    fclose(fp);
}

// 3. శోధన (Search)
void search_student() {
    FILE *fp = fopen(DB_FILE, "rb");
    if (!fp) {
        printf("డేటాబేస్ అందుబాటులో లేదు.\\n");
        return;
    }

    printf("\\nశోధన పద్ధతి ఎంచుకోండి:\\n1. రోల్ నంబర్ ద్వారా\\n2. పేరు ద్వారా\\nఎంపిక: ");
    int choice;
    if (scanf("%d", &amp;choice) != 1) { clear_input_buffer(); fclose(fp); return; }
    clear_input_buffer();

    Student s;
    int found = 0;

    if (choice == 1) {
        int roll;
        printf("వెతకాల్సిన రోల్ నంబర్: ");
        scanf("%d", &amp;roll);
        clear_input_buffer();

        while (fread(&amp;s, sizeof(Student), 1, fp) == 1) {
            if (s.roll_no == roll) {
                printf("\\n🔍 విద్యార్థి వివరాలు లభించాయి:\\n");
                printf("రోల్ నంబర్ : %d\\nపేరు       : %s\\nకోర్సు      : %s\\nCGPA       : %.2f\\nగ్రేడ్     : %s\\n", 
                       s.roll_no, s.name, s.course, s.cgpa, s.grade);
                found = 1;
                break;
            }
        }
    } else if (choice == 2) {
        char name[MAX_NAME];
        printf("వెతకాల్సిన పేరు / భాగం: ");
        fgets(name, sizeof(name), stdin);
        trim_newline(name);

        while (fread(&amp;s, sizeof(Student), 1, fp) == 1) {
            if (strstr(s.name, name) != NULL) {
                printf("👉 [రోల్: %d] %-20s | కోర్సు: %-8s | CGPA: %.2f | గ్రేడ్: %s\\n", 
                       s.roll_no, s.name, s.course, s.cgpa, s.grade);
                found = 1;
            }
        }
    }

    if (!found) printf("❌ ఎలాంటి సరిపోలే రికార్డు కనుగొనబడలేదు.\\n");
    fclose(fp);
}

// 4. రికార్డు సవరణ (Update - In-Place)
void update_student() {
    FILE *fp = fopen(DB_FILE, "rb+");
    if (!fp) {
        printf("డేటాబేస్ అందుబాటులో లేదు.\\n");
        return;
    }

    int roll;
    printf("\\nసవరించాల్సిన విద్యార్థి రోల్ నంబర్: ");
    if (scanf("%d", &amp;roll) != 1) { clear_input_buffer(); fclose(fp); return; }
    clear_input_buffer();

    Student s;
    int found = 0;

    while (fread(&amp;s, sizeof(Student), 1, fp) == 1) {
        if (s.roll_no == roll) {
            found = 1;
            printf("ప్రస్తుత పేరు: %s | కోర్సు: %s | CGPA: %.2f\\n", s.name, s.course, s.cgpa);
            
            printf("కొత్త పేరు (మార్పు లేకపోతే Enter నొక్కండి): ");
            char new_name[MAX_NAME];
            fgets(new_name, sizeof(new_name), stdin);
            trim_newline(new_name);
            if (strlen(new_name) &gt; 0) strcpy(s.name, new_name);

            printf("కొత్త కోర్సు (మార్పు లేకపోతే Enter నొక్కండి): ");
            char new_course[MAX_COURSE];
            fgets(new_course, sizeof(new_course), stdin);
            trim_newline(new_course);
            if (strlen(new_course) &gt; 0) strcpy(s.name, new_course);

            // మార్కులు మళ్లీ ఎంటర్ చేయాలా?
            printf("సబ్జెక్ట్ మార్కులు అప్‌డేట్ చేయాలా? (1 = అవును, 0 = కాదు): ");
            int ch_marks;
            if (scanf("%d", &amp;ch_marks) == 1 &amp;&amp; ch_marks == 1) {
                for (int i = 0; i &lt; NUM_SUBJECTS; i++) {
                    printf("  సబ్జెక్ట్ %d కొత్త మార్కులు: ", i + 1);
                    scanf("%f", &amp;s.marks[i]);
                }
                calculate_academics(&amp;s);
            }
            clear_input_buffer();

            // ఇన్-ప్లేస్ బ్యాక్‌ట్రాక్ మరియు ఓవర్‌రైట్
            fseek(fp, -((long)sizeof(Student)), SEEK_CUR);
            fwrite(&amp;s, sizeof(Student), 1, fp);
            printf("✅ రికార్డు విజయవంతంగా అప్‌డేట్ చేయబడింది!\\n");
            break;
        }
    }

    if (!found) printf("❌ రోల్ నంబర్ %d తో రికార్డు లభించలేదు.\\n", roll);
    fclose(fp);
}

// 5. రికార్డు తొలగింపు (Delete - File Compaction)
void delete_student() {
    int roll;
    printf("\\nతొలగించాల్సిన విద్యార్థి రోల్ నంబర్: ");
    if (scanf("%d", &amp;roll) != 1) { clear_input_buffer(); return; }
    clear_input_buffer();

    FILE *fp = fopen(DB_FILE, "rb");
    if (!fp) { printf("డేటాబేస్ లేదు.\\n"); return; }

    FILE *temp = fopen("temp.dat", "wb");
    if (!temp) { perror("టెంప్ ఫైల్ క్రియేషన్ విఫలం"); fclose(fp); return; }

    Student s;
    int deleted = 0;

    while (fread(&amp;s, sizeof(Student), 1, fp) == 1) {
        if (s.roll_no == roll) {
            deleted = 1;
            printf("🗑️ రికార్డు తొలగించబడుతోంది: %s (రోల్: %d)\\n", s.name, s.roll_no);
        } else {
            fwrite(&amp;s, sizeof(Student), 1, temp);
        }
    }

    fclose(fp);
    fclose(temp);

    if (deleted) {
        remove(DB_FILE);
        rename("temp.dat", DB_FILE);
        printf("✅ రికార్డు శాశ్వతంగా తొలగించబడింది!\\n");
    } else {
        remove("temp.dat");
        printf("❌ రోల్ నంబర్ %d కనుగొనబడలేదు.\\n", roll);
    }
}

// 6. మెరిట్ లిస్ట్ & qsort ర్యాంకింగ్
int compare_cgpa(const void *a, const void *b) {
    const Student *s1 = (const Student *)a;
    const Student *s2 = (const Student *)b;
    if (s2-&gt;cgpa &gt; s1-&gt;cgpa) return 1;
    if (s2-&gt;cgpa &lt; s1-&gt;cgpa) return -1;
    return 0;
}

void show_merit_list() {
    FILE *fp = fopen(DB_FILE, "rb");
    if (!fp) { printf("డేటాబేస్ ఖాళీగా ఉంది.\\n"); return; }

    // మొత్తం విద్యార్థుల సంఖ్యను లెక్కించడం
    fseek(fp, 0, SEEK_END);
    long file_size = ftell(fp);
    rewind(fp);

    int count = file_size / sizeof(Student);
    if (count == 0) { printf("రికార్డులు లేవు.\\n"); fclose(fp); return; }

    // హీప్ మెమరీలో డైనమిక్ కేటాయింపు
    Student *list = (Student *)malloc(count * sizeof(Student));
    if (!list) { printf("మెమరీ కేటాయింపు విఫలమైంది.\\n"); fclose(fp); return; }

    fread(list, sizeof(Student), count, fp);
    fclose(fp);

    // qsort తో సార్టింగ్
    qsort(list, count, sizeof(Student), compare_cgpa);

    printf("\\n🏆 ======================== కాలేజ్ మెరిట్ లిస్ట్ (TOP RANKERS) ========================\\n");
    printf("%-6s %-8s %-22s %-12s %-8s %-6s\\n", "ర్యాంక్", "రోల్ నం", "పేరు", "కోర్సు", "CGPA", "గ్రేడ్");
    printf("------------------------------------------------------------------------------------\\n");
    for (int i = 0; i &lt; count; i++) {
        printf("#%-5d %-8d %-22s %-12s %-8.2f %-6s\\n", 
               i + 1, list[i].roll_no, list[i].name, list[i].course, list[i].cgpa, list[i].grade);
    }
    printf("====================================================================================\\n\\n");

    free(list);
    list = NULL;
}

// 7. CSV ఎక్స్‌పోర్ట్
void export_to_csv() {
    FILE *src = fopen(DB_FILE, "rb");
    if (!src) { printf("డేటాబేస్ లేదు.\\n"); return; }

    FILE *dest = fopen(CSV_FILE, "w");
    if (!dest) { perror("CSV సృష్టి విఫలం"); fclose(src); return; }

    fprintf(dest, "Roll_No,Name,Course,Total_Marks,CGPA,Grade\\n");

    Student s;
    int count = 0;
    while (fread(&amp;s, sizeof(Student), 1, src) == 1) {
        fprintf(dest, "%d,\\\"%s\\\",\\\"%s\\\",%.2f,%.2f,%s\\n", 
                s.roll_no, s.name, s.course, s.total_marks, s.cgpa, s.grade);
        count++;
    }

    fclose(src);
    fclose(dest);

    printf("📊 అద్భుతం! మొత్తం %d రికార్డులు '%s' లోకి ఎక్స్‌పోర్ట్ అయ్యాయి!\\n", count, CSV_FILE);
    printf("సూచన: మీరు ఈ ఫైల్‌ను నేరుగా Microsoft Excel లేదా Google Sheets లో ఓపెన్ చేయవచ్చు.\\n");
}

int main() {
    int choice;
    while (1) {
        printf("\\n=======================================================\\n");
        printf("       🎓 స్టూడెంట్ రికార్డ్ మేనేజ్‌మెంట్ సిస్టమ్        \\n");
        printf("=======================================================\\n");
        printf(" 1. ➕ కొత్త విద్యార్థిని జోడించండి (Add Student)\\n");
        printf(" 2. 📋 అందరు విద్యార్థుల జాబితా చూడండి (View All)\\n");
        printf(" 3. 🔍 విద్యార్థిని శోధించండి (Search Student)\\n");
        printf(" 4. ✏️  రికార్డును సవరించండి (Update Record)\\n");
        printf(" 5. 🗑️  రికార్డును తొలగించండి (Delete Record)\\n");
        printf(" 6. 🏆 టాప్ ర్యాంకర్ల మెరిట్ లిస్ట్ (Merit Ranking)\\n");
        printf(" 7. 📊 Excel CSV లోకి ఎక్స్‌పోర్ట్ చేయండి (Export CSV)\\n");
        printf(" 8. 🚪 నిష్క్రమించండి (Exit)\\n");
        printf("=======================================================\\n");
        printf("మీ ఎంపిక (1 - 8): ");

        if (scanf("%d", &amp;choice) != 1) {
            printf("❌ దయచేసి సరైన సంఖ్యను ఎంటర్ చేయండి!\\n");
            clear_input_buffer();
            continue;
        }

        switch (choice) {
            case 1: add_student(); break;
            case 2: view_all_students(); break;
            case 3: search_student(); break;
            case 4: update_student(); break;
            case 5: delete_student(); break;
            case 6: show_merit_list(); break;
            case 7: export_to_csv(); break;
            case 8:
                printf("\\nధన్యవాదాలు! ప్రోగ్రామ్ ముగిసింది. మీ C ప్రయాణం విజయవంతం కావాలి! 🚀\\n");
                exit(0);
            default:
                printf("❌ చెల్లని ఎంపిక! దయచేసి 1 నుండి 8 మధ్య ఎంచుకోండి.\\n");
        }
    }
    return 0;
}</code></pre>
      </div>

      <!-- PLAYGROUND TRY BOX -->
      <div class="try-box" style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:18px; margin:24px 0; text-align:center;">
        <h3 style="margin-top:0; color:#10b981;">🚀 లైవ్ C కంపైలర్‌లో ఈ గ్రాండ్ ప్రాజెక్ట్ రన్ చేయండి!</h3>
        <p style="margin-bottom:14px; font-size:14px; color:var(--text2);">
          పూర్తి CRUD, మెరిట్ లిస్ట్ మరియు CSV ఎక్స్‌పోర్ట్ ఫీచర్లను మన ఆన్‌లైన్ కంపైలర్‌లో రన్ చేసి స్వయంగా పరీక్షించండి!
        </p>
        <a href="/online-c-compiler.html" class="action-btn try-btn" style="display:inline-block; padding:10px 24px; font-size:14px; text-decoration:none;">
          Online C Compiler ఓపెన్ చేయండి ➔
        </a>
      </div>
    </section>

    <!-- SECTION 12 -->
    <section class="section">
      <h2><span class="num">12</span> కంపైలేషన్, మేక్ ఫైల్ &amp; ప్రొడక్షన్ డిప్లాయ్మెంట్ గైడ్</h2>
      <p>
        ఈ ప్రాజెక్ట్‌ను ప్రొఫెషనల్ సాఫ్ట్‌వేర్ ఇంజనీర్‌లా కంపైల్ చేయడానికి మరియు బిల్డ్ చేయడానికి క్రింది టూల్స్ వాడతాం:
      </p>

      <h3>1. GCC కంపైలేషన్ స్ట్రిక్ట్ ఫ్లాగ్స్:</h3>
      <pre><code>gcc -Wall -Wextra -pedantic -std=c17 -O2 student_manager.c -o student_manager</code></pre>
      <ul>
        <li><code>-Wall -Wextra</code>: సంభావ్య బగ్స్ మరియు హెచ్చరికలన్నింటినీ చూపిస్తుంది.</li>
        <li><code>-std=c17</code>: సరికొత్త ఆధునిక C17 ప్రమాణాలను అమలు చేస్తుంది.</li>
        <li><code>-O2</code>: CPU కోడ్ ఎగ్జిక్యూషన్‌ను ఆప్టిమైజ్ చేస్తుంది.</li>
      </ul>

      <h3>2. ప్రాజెక్ట్ Makefile నిర్మాణం:</h3>
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0; font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.6; color:var(--text1);">
CC = gcc<br/>
CFLAGS = -Wall -Wextra -std=c17 -O2<br/>
TARGET = student_manager<br/><br/>

all: $(TARGET)<br/><br/>

$(TARGET): student_manager.c<br/>
	$(CC) $(CFLAGS) student_manager.c -o $(TARGET)<br/><br/>

run: $(TARGET)<br/>
	./$(TARGET)<br/><br/>

clean:<br/>
	rm -f $(TARGET) *.dat *.csv
      </div>
    </section>

    <!-- SECTION 13 -->
    <section class="section">
      <h2><span class="num">13</span> కోర్సు గ్రాండ్ సారాంశం, కెరీర్ రోడ్‌మ్యాప్ &amp; ఫైనల్ క్విజ్</h2>
      
      <h3>మనం పూర్తి చేసిన 20 అధ్యాయాల సారాంశం:</h3>
      <ul>
        <li><strong>Phase 01 (Ch 01-04):</strong> C ఫౌండేషన్స్, మెమరీ మోడల్, ఆపరేటర్లు &amp; ఫార్మాట్ స్పెసిఫైయర్లు.</li>
        <li><strong>Phase 02 (Ch 05-08):</strong> బ్రాంచింగ్, జంప్ టేబుల్స్, నెస్టెడ్ లూప్స్ &amp; ప్యాటర్న్స్.</li>
        <li><strong>Phase 03 (Ch 09-12):</strong> ఫంక్షన్స్, కాల్ బై రిఫరెన్స్, స్టోరేజ్ క్లాసెస్ &amp; రికార్షన్ కాల్ స్టాక్.</li>
        <li><strong>Phase 04 (Ch 13-16):</strong> మల్టీ-డైమెన్షనల్ అర్రేలు, స్ట్రింగ్ సెక్యూరిటీ, పాయింటర్ అరిథ్‌మెటిక్ &amp; డబుల్ పాయింటర్లు.</li>
        <li><strong>Phase 05 (Ch 17-20):</strong> స్ట్రక్చర్ పాడింగ్, యూనియన్స్, హీప్ DMA (malloc/free), బైనరీ ఫైల్ పర్సిస్టెన్స్ &amp; గ్రాండ్ ప్రాజెక్ట్!</li>
      </ul>

      <h3>తర్వాత ఏమి నేర్చుకోవాలి? (Next Steps in Your Career Roadmap):</h3>
      <ol style="line-height:1.8;">
        <li><strong>Data Structures &amp; Algorithms (DSA) in C:</strong> లింక్డ్ లిస్ట్‌లు, స్టాక్‌లు, క్యూలు, బైనరీ ట్రీలు మరియు గ్రాఫ్స్.</li>
        <li><strong>Operating Systems &amp; POSIX:</strong> Linux System Calls, ఫైల్ డిస్క్రిప్టర్లు, Fork, Threads (pthreads), Inter-Process Communication (IPC).</li>
        <li><strong>Embedded Systems:</strong> మైక్రోకంట్రోలర్లు (Arduino, STM32, ESP32) లో బేర్-మెటల్ C ప్రోగ్రామింగ్.</li>
        <li><strong>Modern C++:</strong> C బేస్ తర్వాత ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్, టెంప్లేట్లు మరియు STL.</li>
      </ol>

      <h3>ఫైనల్ మాస్టర్‌క్లాస్ సర్టిఫికేషన్ క్విజ్ (Capstone Quiz):</h3>

      <!-- QUIZ ITEM 1 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 1: బైనరీ ఫైల్‌లో స్ట్రక్చర్ రికార్డులను సేవ్ చేసేటప్పుడు <code>char *name;</code> అని ఎందుకు వాడకూడదు?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> పాయింటర్ కేవలం RAM చిరునామాను మాత్రమే సూచిస్తుంది. <code>fwrite()</code> ఆ 8-బైట్ అడ్రస్‌ను మాత్రమే డిస్క్‌పై రాస్తుంది తప్ప అసలు స్ట్రింగ్ డేటాను రాయదు! ప్రోగ్రామ్ రీస్టార్ట్ అవ్వగానే ఆ పాత అడ్రస్ చెల్లదు. అందుకే ఫిక్స్డ్ సైజ్ అర్రే <code>char name[50];</code> మాత్రమే వాడాలి.
        </div>
      </details>

      <!-- QUIZ ITEM 2 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 2: <code>fseek(fp, -((long)sizeof(Student)), SEEK_CUR);</code> స్టేట్‌మెంట్ ఏం చేస్తుంది?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <code>fread()</code> చేసిన వెంటనే ఫైల్ కర్సర్ ఒక రికార్డు ముందుకు వెళ్లి ఉంటుంది. ఈ <code>fseek</code> స్టేట్‌మెంట్ కర్సర్‌ను సరిగ్గా ఇప్పుడే చదివిన రికార్డు ప్రారంభానికి వెనక్కి తెస్తుంది, తద్వారా <code>fwrite()</code> తో ఆ రికార్డును అక్కడికక్కడే ఇన్-ప్లేస్ అప్‌డేట్ చేయవచ్చు.
        </div>
      </details>

      <!-- QUIZ ITEM 3 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 3: <code>scanf("%d", ...)</code> తర్వాత <code>fgets()</code> వాడినప్పుడు ఎందుకు స్కిప్ అవుతుంది? దానికి పరిష్కారం ఏమిటి?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <code>scanf</code> సంఖ్యను తీసుకుని <code>'\\n'</code> (Enter) ను బఫర్‌లో వదిలేస్తుంది. ఆ మిగిలిన న్యూలైన్‌ను <code>fgets</code> వెంటనే చదివి ఖాళీగా ముగిస్తుంది. పరిష్కారం: <code>scanf</code> తర్వాత <code>clear_input_buffer()</code> తో బఫర్‌ను క్లియర్ చేయాలి.
        </div>
      </details>

      <!-- QUIZ ITEM 4 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 4: బైనరీ ఫైల్ నుండి రికార్డును తొలగించడానికి తాత్కాలిక ఫైల్ (Temporary File) పద్ధతిని ఎందుకు వాడతారు?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> ఫైల్ మధ్యలోని డేటాను నేరుగా తొలగించి ఖాళీ స్థలాన్ని కుదించడం ఫైల్ సిస్టమ్‌లో సాధ్యం కాదు. కాబట్టి డిలీట్ చేయాల్సిన రికార్డు మినహా మిగిలిన అన్నింటినీ కొత్త ఫైల్‌లోకి కాపీ చేసి, పాత ఫైల్‌ను తీసివేసి రీనేమ్ చేయడమే సురక్షితమైన మార్గం.
        </div>
      </details>

      <!-- QUIZ ITEM 5 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 5: C స్టాండర్డ్ లైబ్రరీలోని <code>qsort()</code> ఫంక్షన్‌కు మనం ఎందుకు ఫంక్షన్ పాయింటర్‌ను కంపేరేటర్‌గా పంపుతాం?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <code>qsort()</code> జెనెరిక్ అల్గారిథమ్ కాబట్టి దానికి మనం స్టోర్ చేసిన డేటా టైప్ (Student struct) గురించి తెలియదు. రెండు ఎలిమెంట్లలో ఏది పెద్దదో, ఏది చిన్నదో నిర్ణయించే బాధ్యతను మన కస్టమ్ కంపేరేటర్ ఫంక్షన్ నిర్వహిస్తుంది.
        </div>
      </details>
    </section>

    <!-- CHAPTER NAVIGATION (PAGINATION) -->
    <div style="display:flex; justify-content:space-between; gap:16px; margin:40px 0 20px; flex-wrap:wrap;">
      <a href="/blog-c/19-c-file-handling-fopen-fclose-text-binary.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Prev: 19. ఫైల్ హ్యాండ్లింగ్
      </a>
      <a href="/blog-c.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        🎉 C Masterclass ఇండెక్స్ కి తిరిగి వెళ్ళండి →
      </a>
    </div>

    <!-- AUTHOR FOOTER -->
    <div class="author" style="margin-top:36px;">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on GCC 13+ / Clang 17 runtime · 2026 Academic Edition</span>
      </div>
    </div>

  </main>
</div>

<!-- SITE NAVIGATION LOADER -->
<script src="/site-nav.js" defer></script>
</body>
</html>
`;

const fullHtml = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>C గ్రాండ్ మినీ ప్రాజెక్ట్: స్టూడెంట్ రికార్డ్ మేనేజ్‌మెంట్ సిస్టమ్ — Modern C Tutorial | Our Compiler</title>
  <meta name="description" content="C గ్రాండ్ మినీ ప్రాజెక్ట్ సమగ్ర తెలుగు గైడ్: స్టూడెంట్ రికార్డ్ మేనేజ్‌మెంట్ సిస్టమ్, CRUD ఆపరేషన్స్, బైనరీ ఫైల్ పర్సిస్టెన్స్, ఇన్-ప్లేస్ fseek అప్‌డేట్, qsort మెరిట్ లిస్ట్, Excel CSV ఎక్స్‌పోర్ట్." />
  <meta name="keywords" content="c mini project in telugu, student record management in c, crud operations in c, binary file project in c, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-c/20-c-mini-project-student-record-management.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-c/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org TechArticle Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "C గ్రాండ్ మినీ ప్రాజెక్ట్: స్టూడెంట్ రికార్డ్ మేనేజ్‌మెంట్ సిస్టమ్ (C Programming in Telugu)",
    "description": "స్టూడెంట్ రికార్డ్ మేనేజ్‌మెంట్ సిస్టమ్, CRUD ఆపరేషన్స్, బైనరీ ఫైల్ పర్సిస్టెన్స్, ఇన్-ప్లేస్ fseek అప్‌డేట్, qsort మెరిట్ లిస్ట్, Excel CSV ఎక్స్‌పోర్ట్",
    "articleSection": "Phase 05: స్ట్రక్చర్స్, డైనమిక్ మెమరీ & ప్రాజెక్ట్",
    "inLanguage": "te",
    "author": {
      "@type": "Organization",
      "name": "Our Compiler Technical Editorial Team",
      "url": "https://www.ourcompiler.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Our Compiler",
      "url": "https://www.ourcompiler.com"
    },
    "datePublished": "2026-02-01",
    "dateModified": "2026-11-01"
  }
  </script>

  <!-- Interactive Scripts: Accordion & Default Light Theme -->
  <script>
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) {
        content.classList.remove('open');
        btn.classList.remove('active');
      } else {
        content.classList.add('open');
        btn.classList.add('active');
      }
    }

    (function() {
      const currentTheme = localStorage.getItem('tutorial_theme_v2');
      if (currentTheme === 'dark') {
        document.documentElement.classList.remove('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          const body = document.body;
          if (body) body.classList.remove('light-theme');
        });
      } else {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          const body = document.body;
          if (body) body.classList.add('light-theme');
        });
      }
    })();

    // Code runner & copy button integration
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.code-block').forEach((block) => {
        const pre = block.querySelector('pre');
        const code = block.querySelector('code');
        if (!pre || !code) return;
        const rawCode = code.innerText;

        const actions = block.querySelector('.code-actions');
        if (actions && !actions.querySelector('.copy-btn')) {
          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn';
          copyBtn.innerHTML = '📋 Copy';
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(rawCode).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
            });
          });
          actions.insertBefore(copyBtn, actions.firstChild);

          const tryBtn = actions.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_c', rawCode);
              window.open('/online-c-compiler.html', '_blank');
            });
          }
        }
      });
    });
  </script>
</head>
<body class="lang-c light-theme">
<!-- NAV PLACEHOLDER -->
<div id="site-nav-placeholder"></div>

<div class="layout">
${sidebarHtml}

  <!-- MAIN ARTICLE -->
  <main class="content">
${chapterContentHtml}
`;

const outputPath = path.join(__dirname, '..', 'public', 'blog-c', '20-c-mini-project-student-record-management.html');
fs.writeFileSync(outputPath, fullHtml, 'utf8');

console.log('✅ Successfully regenerated deep high-value C Chapter 20!');
console.log('Target file size:', fullHtml.length, 'characters');
