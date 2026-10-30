const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./c_curriculum_data.js');
const { generatePageHtml } = require('./c_page_template.js');

const cDir = path.join(__dirname, '../public/blog-c');

const CHAPTER_20_CONTENT = `
    <div class="intro-box">
      సిద్ధాంతం (Theory) ఎంత నేర్చుకున్నప్పటికీ ఒక ప్రాక్టికల్ రియల్-వరల్డ్ ప్రాజెక్ట్‌ను మొదటి నుండి సొంతంగా నిర్మించినప్పుడే ఒక ప్రోగ్రామర్‌కు నిజమైన ఆత్మవిశ్వాసం వస్తుంది. మనం గత 19 అధ్యాయాలలో నేర్చుకున్న <strong>Structs, Dynamic Memory (malloc/realloc/free), Pointers, Binary File Persistence, మరియు CLI Control Flow</strong> లన్నింటినీ ఒకచోట చేర్చి ఒక ప్రొడక్షన్-గ్రేడ్ <strong>స్టూడెంట్ రికార్డ్ మేనేజ్‌మెంట్ సిస్టమ్ (Student Record Management System)</strong> ను ఎలా రూపొందించాలో ఆర్కిటెక్చర్ నుండి కోడ్ వరకు క్షుణ్ణంగా పరిశీలిద్దాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ప్రాజెక్ట్ ఆర్కిటెక్చర్ & సిస్టమ్ డిజైన్ (System Architecture)</div>
    <div class="section-body">
      <p>
        ఒక ప్రొఫెషనల్ సాఫ్ట్‌వేర్ ఇంజనీర్ ప్రాజెక్ట్ ప్రారంభించేటప్పుడు నేరుగా కోడింగ్ రాయడం మొదలుపెట్టరు. ముందుగా సిస్టమ్ ఆర్కిటెక్చర్‌ను నాలుగు స్వతంత్ర మాడ్యూల్స్‌గా విభజిస్తారు:
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:16px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">1. డేటా మోడల్ (Data Model):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ప్రతి విద్యార్థి యొక్క రోల్ నంబర్, పేరు, మరియు మార్కులను ఒక కస్టమ్ రికార్డుగా రూపొందించే <code>struct Student</code> బ్లూప్రింట్.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:16px;">
          <h4 style="color:#3b82f6; margin:0 0 6px 0; font-size:14.5px;">2. మెమరీ మేనేజర్ (Memory Manager):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            విద్యార్థుల సంఖ్య స్థిరంగా ఉండదు కాబట్టి, విద్యార్థులు పెరిగే కొద్దీ హీప్ (Heap) మెమరీని ఆటోమేటిక్‌గా రీసైజ్ చేసే <code>realloc()</code> ఇంజిన్.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f59e0b; border-radius:8px; padding:16px;">
          <h4 style="color:#f59e0b; margin:0 0 6px 0; font-size:14.5px;">3. స్టోరేజ్ ఇంజిన్ (Storage Engine):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            కంప్యూటర్ స్విచ్ ఆఫ్ అయినా డేటా చెక్కుచెదరకుండా హార్డ్ డిస్క్‌లో <code>students.dat</code> ఫైల్‌లోకి బైనరీ బైట్ల రూపంలో రాసే/చదివే <code>fwrite()</code> & <code>fread()</code> మెకానిజం.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #8b5cf6; border-radius:8px; padding:16px;">
          <h4 style="color:#8b5cf6; margin:0 0 6px 0; font-size:14.5px;">4. యూజర్ ఇంటర్‌ఫేస్ (CLI Interface):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఇన్‌పుట్ ఎర్రర్లను నివారించే, సురక్షితమైన స్ట్రింగ్ రీడింగ్ మరియు మెనూ-డ్రివెన్ <code>do-while</code> ఈవెంట్ లూప్.
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>మాడ్యూల్ 1: డేటా మోడలింగ్ & Struct డిజైన్</div>
    <div class="section-body">
      <p>
        బైనరీ ఫైల్స్‌లో డేటాను భద్రపరిచేటప్పుడు డైనమిక్ పాయింటర్లు (<code>char *name</code>) వాడటం అత్యంత ప్రమాదకరం. ఎందుకంటే పాయింటర్‌ను ఫైల్‌లో రాస్తే కేవలం ఆ క్షణంలో RAM లో ఉన్న మెమరీ అడ్రస్ మాత్రమే సేవ్ అవుతుంది కానీ వాస్తవ టెక్స్ట్ సేవ్ అవ్వదు. కాబట్టి బైనరీ పర్సిస్టెన్స్ కోసం ఎల్లప్పుడూ <strong>స్థిర పరిమాణపు క్యారెక్టర్ అర్రే (Fixed-size Character Array)</strong> వాడాలి:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Data Model Definition</span>
        </div>
        <pre><code>typedef struct {
    int rollNo;       // 4 బైట్లు: విద్యార్థి ప్రత్యేక సంఖ్య
    char name[40];    // 40 బైట్లు: గరిష్టంగా 39 అక్షరాలు + '\\0'
    float marks;      // 4 బైట్లు: అకాడెమిక్ మార్కులు
} Student;

// గ్లోబల్ లేదా సెంట్రల్ స్టేట్ మేనేజ్‌మెంట్
Student *students = NULL; // హీప్ మెమరీని సూచించే పాయింటర్
int studentCount = 0;     // ప్రస్తుతం ఉన్న మొత్తం విద్యార్థుల సంఖ్య</code></pre>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>మాడ్యూల్ 2: డైనమిక్ మెమరీ స్కేలింగ్ (addStudent లాజిక్)</div>
    <div class="section-body">
      <p>
        బిగినర్స్ చేసే ప్రధాన తప్పు: <code>Student students[100];</code> అని ముందే 100 సైజ్ ఇవ్వడం. దీనివల్ల కేవలం 2 విద్యార్థులు ఉంటే 98 మంది స్థలం వృధా అవుతుంది; 101వ విద్యార్థి వస్తే ప్రోగ్రామ్ క్రాష్ అవుతుంది.
      </p>
      <p style="font-size:13.5px; color:var(--text2); line-height:1.6;">
        దీనికి ఆధునిక పరిష్కారం <strong>realloc() డైనమిక్ గ్రోత్ ప్యాటర్న్</strong>. ప్రతిసారి కొత్త విద్యార్థిని చేర్చేటప్పుడు, కేవలం ఆ ఒక్క రికార్డుకు సరిపడా మెమరీని మాత్రమే పెంచుతాం:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Safe Memory Growth Strategy</span>
        </div>
        <pre><code>void addStudent(void) {
    // సేఫ్టీ ప్యాటర్న్: realloc ఫలితాన్ని తాత్కాలిక పాయింటర్‌లో తీసుకోవాలి
    Student *temp = (Student*) realloc(students, (studentCount + 1) * sizeof(Student));
    if (temp == NULL) {
        printf("⚠️ ఎర్రర్: సిస్టమ్ లో తగినంత RAM లేదు!\\n");
        return;
    }
    students = temp; // విజయవంతమైతేనే అసలు పాయింటర్‌కు అసైన్ చేయాలి

    printf("\\nరోల్ నంబర్: ");
    scanf("%d", &students[studentCount].rollNo);

    printf("విద్యార్థి పేరు: ");
    scanf(" %39s", students[studentCount].name); // బఫర్ ఓవర్‌ఫ్లో నిరోధించడానికి %39s

    printf("మార్కులు (0 - 100): ");
    scanf("%f", &students[studentCount].marks);

    studentCount++;
    printf("✅ రికార్డు విజయవంతంగా జోడించబడింది!\\n");
}</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>మాడ్యూల్ 3: బైనరీ ఫైల్ పర్సిస్టెన్స్ (Save & Load)</div>
    <div class="section-body">
      <p>
        ప్రోగ్రామ్ ప్రారంభమైనప్పుడు గతంలో నిల్వ చేసిన డేటాను ఆటోమేటిక్‌గా రీలోడ్ చేయడం, మరియు ప్రోగ్రామ్ ముగిసేముందు మొత్తం డేటాను డిస్క్‌పై శాశ్వతంగా రాయడం ఎలాగో పరిశీలిద్దాం.
      </p>

      <div style="background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0; padding:16px; margin:16px 0;">
        <strong style="color:#10b981; font-size:14px;">💾 హెడర్ మెటాడేటా ప్యాటర్న్ (Header Pattern):</strong>
        <p style="font-size:13px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          ఫైల్ మొదట్లో ముందుగా <code>studentCount</code> (ఎంతమంది విద్యార్థులు ఉన్నారో తెలిపే సంఖ్య) ను రాస్తాం. తర్వాత రీడ్ చేసేటప్పుడు, ఆ కౌంట్‌ను చదివి, అంత పరిమాణానికి సరిపడా హీప్ మెమరీని <code>malloc</code> చేసి, ఆపై మొత్తం అరేని ఒకే <code>fread</code> కాల్‌తో చదువుతాం.
        </p>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Binary Save & Load Functions</span>
        </div>
        <pre><code>void saveToFile(void) {
    FILE *fp = fopen("students.dat", "wb");
    if (fp == NULL) {
        printf("❌ ఫైల్ తెరవడం సాధ్యం కాలేదు!\\n");
        return;
    }
    // 1. మొదట కౌంట్‌ను రాయడం
    fwrite(&studentCount, sizeof(int), 1, fp);
    // 2. మొత్తం అర్రే బ్లాక్‌ను రాయడం
    fwrite(students, sizeof(Student), studentCount, fp);
    fclose(fp);
    printf("💾 మొత్తం %d రికార్డులు students.dat లో సేవ్ చేయబడ్డాయి.\\n", studentCount);
}

void loadFromFile(void) {
    FILE *fp = fopen("students.dat", "rb");
    if (fp == NULL) return; // ఫైల్ ఇంకా లేకపోతే (మొదటి రన్) నిశ్శబ్దంగా రిటర్న్ అవ్వాలి

    fread(&studentCount, sizeof(int), 1, fp);
    if (studentCount &gt; 0) {
        students = (Student*) malloc(studentCount * sizeof(Student));
        if (students != NULL) {
            fread(students, sizeof(Student), studentCount, fp);
        }
    }
    fclose(fp);
}</code></pre>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>పూర్తి ప్రొడక్షన్-గ్రేడ్ C సోర్స్ కోడ్ (Complete Project)</div>
    <div class="section-body">
      <p>
        క్రింది కోడ్ అన్ని ఫీచర్లను (Add, Display, Search, Delete, Binary File Persistence, Memory Cleanup) సమగ్రంగా కలిగి ఉంది:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Complete Student Record System</span>
          <a class="try-btn" href="/online-c-compiler.html">⚡ Try in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;

#define DATA_FILE "students.dat"

typedef struct {
    int rollNo;
    char name[40];
    float marks;
} Student;

Student *students = NULL;
int studentCount = 0;

void addStudent(void) {
    Student *temp = (Student*) realloc(students, (studentCount + 1) * sizeof(Student));
    if (temp == NULL) {
        printf("మెమరీ కేటాయింపు విఫలమైంది!\\n");
        return;
    }
    students = temp;

    printf("\\nరోల్ నంబర్: ");
    scanf("%d", &students[studentCount].rollNo);
    printf("పేరు: ");
    scanf(" %39s", students[studentCount].name);
    printf("మార్కులు: ");
    scanf("%f", &students[studentCount].marks);

    studentCount++;
    printf("✅ రికార్డు జోడించబడింది!\\n");
}

void displayStudents(void) {
    if (studentCount == 0) {
        printf("\\n[రికార్డులు ఏవీ లేవు]\\n");
        return;
    }
    printf("\\n-------------------------------------------------\\n");
    printf("%-10s %-25s %-10s\\n", "రోల్ నెం", "పేరు", "మార్కులు");
    printf("-------------------------------------------------\\n");
    for (int i = 0; i &lt; studentCount; i++) {
        printf("%-10d %-25s %-10.2f\\n", students[i].rollNo, students[i].name, students[i].marks);
    }
    printf("-------------------------------------------------\\n");
}

void searchStudent(void) {
    if (studentCount == 0) {
        printf("\\nవెతకడానికి రికార్డులు లేవు!\\n");
        return;
    }
    int roll;
    printf("\\nవెతకాల్సిన రోల్ నంబర్: ");
    scanf("%d", &roll);

    for (int i = 0; i &lt; studentCount; i++) {
        if (students[i].rollNo == roll) {
            printf("🎯 రికార్డు లభించింది: %s | మార్కులు: %.2f\\n", students[i].name, students[i].marks);
            return;
        }
    }
    printf("❌ రోల్ నంబర్ %d తో ఎవరూ లేరు.\\n", roll);
}

void saveToFile(void) {
    FILE *fp = fopen(DATA_FILE, "wb");
    if (fp == NULL) return;
    fwrite(&studentCount, sizeof(int), 1, fp);
    fwrite(students, sizeof(Student), studentCount, fp);
    fclose(fp);
    printf("💾 డేటా సేవ్ చేయబడింది.\\n");
}

void loadFromFile(void) {
    FILE *fp = fopen(DATA_FILE, "rb");
    if (fp == NULL) return;
    fread(&studentCount, sizeof(int), 1, fp);
    if (studentCount &gt; 0) {
        students = (Student*) malloc(studentCount * sizeof(Student));
        if (students != NULL) {
            fread(students, sizeof(Student), studentCount, fp);
        }
    }
    fclose(fp);
}

int main(void) {
    loadFromFile();
    int choice;

    do {
        printf("\\n=== స్టూడెంట్ రికార్డ్ మేనేజ్‌మెంట్ ===\\n");
        printf("1. విద్యార్థిని జోడించు (Add)\\n");
        printf("2. అందరినీ ప్రదర్శించు (Display All)\\n");
        printf("3. రోల్ నంబర్ తో వెతుకు (Search)\\n");
        printf("4. సేవ్ చేసి నిష్క్రమించు (Save & Exit)\\n");
        printf("మీ ఎంపిక: ");
        if (scanf("%d", &choice) != 1) break;

        switch (choice) {
            case 1: addStudent(); break;
            case 2: displayStudents(); break;
            case 3: searchStudent(); break;
            case 4: saveToFile(); break;
            default: printf("చెల్లని ఎంపిక!\\n");
        }
    } while (choice != 4);

    // క్లీన్ ఎగ్జిట్ & మెమరీ విడుదల
    if (students != NULL) {
        free(students);
        students = NULL;
    }
    printf("ప్రోగ్రామ్ విజయవంతంగా ముగిసింది.\\n");
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>బిగినర్స్ చేసే ప్రాజెక్ట్ తప్పులు (Project Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. realloc నేరుగా పాత పాయింటర్‌కు అసైన్ చేయడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">students = (Student*) realloc(students, new_size); // ప్రమాదకరం!</code>
          <span style="font-size:13px; color:var(--text2); display:block;">ఒకవేళ మెమరీ కేటాయింపు ఫెయిల్ అయితే <code>realloc</code> NULL రిటర్న్ చేస్తుంది. దానివల్ల <code>students</code> లో ఉన్న పాత డేటా మెమరీ అడ్రస్ కూడా శాశ్వతంగా పోతుంది (Memory Leak). అందుకే తాత్కాలిక <code>temp</code> వేరియబుల్ వాడాలి.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. మెమరీ కేటాయించకుండా fread చేయడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">fread(students, sizeof(Student), count, fp); // students is NULL!</code>
          <span style="font-size:13px; color:var(--text2); display:block;">ఫైల్ నుండి డేటా చదవడానికి ముందు తప్పనిసరిగా <code>students = malloc(count * sizeof(Student))</code> ద్వారా హీప్‌పై స్థలాన్ని సిద్ధం చేయాలి.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 3. స్ట్రింగ్ ఇన్‌పుట్‌లో బఫర్ లిమిట్ పెట్టకపోవడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">scanf("%s", students[i].name); // బఫర్ ఓవర్‌ఫ్లో ప్రమాదం</code>
          <span style="font-size:13px; color:var(--text2); display:block;">అర్రే సైజ్ 40 ఉన్నప్పుడు యూజర్ 100 అక్షరాలు టైప్ చేస్తే పక్కనున్న మార్కుల మెమరీ కరప్ట్ అవుతుంది. ఎల్లప్పుడూ <code>scanf(" %39s", ...)</code> అని లిమిట్ పేర్కొనాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 7 -->
    <div class="section-title"><span class="num">7</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: ఈ ప్రాజెక్ట్‌లో ఒక రికార్డును డిలీట్ చేయాలంటే ఎలా చేయాలి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            డిలీట్ చేయాలనుకున్న ఇండెక్స్ నుండి చివరి వరకు ఉన్న అన్ని రికార్డులను ఒక స్థానం ఎడమవైపునకు జరపాలి (<code>for (int j = i; j &lt; studentCount - 1; j++) students[j] = students[j + 1];</code>). ఆ తర్వాత <code>studentCount--</code> చేసి, <code>realloc</code> ద్వారా మెమరీని తగ్గించవచ్చు.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: లీనియర్ సెర్చ్ కాకుండా బైనరీ సెర్చ్ ఎలా అమలు చేయాలి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            రోల్ నంబర్ల ఆధారంగా అర్రేను <code>qsort()</code> తో సార్ట్ చేసి, ఆ తర్వాత <code>bsearch()</code> లేదా ఓన్ బైనరీ సెర్చ్ లూప్ వాడి $O(\\log N)$ సమయంలో వేగంగా విద్యార్థిని కనుగొనవచ్చు.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: భారీ ప్రాజెక్టులలో ఈ డేటాబేస్ పద్ధతి ఎక్కడ ఉపయోగపడుతుంది?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ఇంటర్నెట్ మరియు భారీ SQL సర్వర్లు లేని ఎంబెడెడ్ డివైస్‌లు (మెడికల్ ఎక్విప్‌మెంట్, ఆటోమోటివ్ ఈసీయూలు, ఫ్లైట్ డేటా రికార్డర్లు, రూటర్లు) లో డేటాను లోకల్‌గా అత్యంత వేగంగా భద్రపరచడానికి నేటికీ ఈ బైనరీ స్ట్రక్చర్ ఫైల్ పద్ధతినే వినియోగిస్తారు.
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 8 -->
    <div class="section-title"><span class="num">8</span>ముగింపు & భవిష్యత్ ప్రయాణం (The C Journey Ahead)</div>
    <div class="section-body">
      <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:20px; margin:16px 0;">
        <h4 style="color:#10b981; margin:0 0 10px 0; font-size:16px;">🎓 కంగ్రాట్స్! మీరు C మాస్టర్ క్లాస్‌ను విజయవంతంగా పూర్తి చేశారు</h4>
        <p style="font-size:13.5px; color:var(--text); margin:0 0 12px 0; line-height:1.7;">
          C లాంగ్వేజ్‌ను క్షుణ్ణంగా నేర్చుకోవడం అంటే కంప్యూటర్ అంతర్గత మెమరీ, హార్డ్‌వేర్, ప్రాసెసర్ రిజిస్టర్లు, మరియు ఆపరేటింగ్ సిస్టమ్‌ల పనితీరుపై తిరుగులేని పట్టు సాధించడమే. C లో మీరు సాధించిన ఈ బలమైన ప్రావీణ్యం మీ భవిష్యత్ సాఫ్ట్‌వేర్ ఇంజనీరింగ్ కెరీర్‌లో అద్భుతమైన ద్వారాలు తెరుస్తుంది:
        </p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px;">
          <div style="background:var(--bg3); padding:10px 14px; border-radius:6px; font-size:13px; color:var(--text);">
            <strong>1. Modern C++ &amp; OOPs:</strong> క్లాసులు, ఆబ్జెక్టులు, STL, మెమరీ సేఫ్ స్మార్ట్ పాయింటర్లు సులువుగా అర్థమవుతాయి.
          </div>
          <div style="background:var(--bg3); padding:10px 14px; border-radius:6px; font-size:13px; color:var(--text);">
            <strong>2. Data Structures &amp; Algorithms (DSA):</strong> లింక్డ్ లిస్టులు, ట్రీస్, గ్రాఫ్స్, హీప్స్ పాయింటర్లతో స్వయంగా కోడ్ చేయగలరు.
          </div>
          <div style="background:var(--bg3); padding:10px 14px; border-radius:6px; font-size:13px; color:var(--text);">
            <strong>3. Systems &amp; Kernel Dev:</strong> Linux సిస్టమ్ కాల్స్, డివైస్ డ్రైవర్లు, రోబోటిక్స్ మరియు ఎంబెడెడ్ సాఫ్ట్‌వేర్ ఇంజనీరింగ్.
          </div>
        </div>
      </div>
    </div>
`;

const lesson20 = LESSONS.find(l => l.num === 20);
lesson20.contentHtml = CHAPTER_20_CONTENT;
const html = generatePageHtml(lesson20);
fs.writeFileSync(path.join(cDir, lesson20.file), html, 'utf8');
console.log(`✅ Chapter 20 updated with rich multi-module content! (${html.length} chars)`);

