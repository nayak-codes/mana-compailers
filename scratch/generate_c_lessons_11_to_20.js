const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./c_curriculum_data.js');
const { generatePageHtml } = require('./c_page_template.js');

const cDir = path.join(__dirname, '../public/blog-c');

// ==========================================
// CONTENT DEFINITIONS FOR LESSONS 11 TO 20
// ==========================================

const CONTENTS = {
  11: `
    <div class="intro-box">
      వేరియబుల్స్ RAM లో ఎంతకాలం బతికి ఉంటాయి (Lifetime) మరియు ప్రోగ్రామ్‌లో ఎక్కడివరకు అందుబాటులో ఉంటాయి (Scope) అనే విషయాన్ని C లోని <strong>Storage Classes</strong> నిర్ణయిస్తాయి. <code>auto</code>, <code>static</code>, <code>extern</code>, మరియు <code>register</code> ల పూర్తి పనితీరును నేర్చుకుందాం.
    </div>

    <div class="section-title"><span class="num">1</span>static కీవర్డ్: విలువను గుర్తుంచుకునే వేరియబుల్</div>
    <div class="section-body">
      <p>
        సాధారణ లోకల్ వేరియబుల్ ఫంక్షన్ ముగియగానే నశిస్తుంది. కానీ <code>static</code> అని పెడితే, అది ప్రోగ్రామ్ ముగిసేవరకు RAM మెమరీలోని Data Segment లో శాశ్వతంగా ఉండి, తన పాత విలువను గుర్తుంచుకుంటుంది:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — static variable persistence</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

void countVisits() {
    static int visitCount = 0; // కేవలం ఒక్కసారే ఇనిషియలైజ్ అవుతుంది
    visitCount++;
    printf("Visitor Number: %d\\n", visitCount);
}

int main() {
    countVisits(); // 1
    countVisits(); // 2
    countVisits(); // 3
    return 0;
}</code></pre>
      </div>
    </div>
  `,

  12: `
    <div class="intro-box">
      ఒక ఫంక్షన్ తనను తాను మళ్లీ మళ్లీ కాల్ చేసుకోవడాన్ని <strong>రికార్షన్ (Recursion)</strong> అంటారు. రికార్షన్‌లో అత్యంత ముఖ్యమైన <strong>Base Condition</strong>, మరియు అది లేకపోతే వచ్చే ప్రమాదకరమైన <strong>Stack Overflow</strong> ఎర్రర్‌ను నేర్చుకుందాం.
    </div>

    <div class="section-title"><span class="num">1</span>ఫ్యాక్టోరియల్ కాలిక్యులేషన్ (Recursive Factorial)</div>
    <div class="section-body">
      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Recursion</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

long long factorial(int n) {
    // బేస్ కండిషన్: ఇది లేకపోతే స్టాక్ మెమరీ నిండిపోయి క్రాష్ అవుతుంది
    if (n &lt;= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    int num = 5;
    printf("Factorial of %d = %lld\\n", num, factorial(num));
    return 0;
}</code></pre>
      </div>
    </div>
  `,

  13: `
    <div class="intro-box">
      ఒకే రకమైన వేలాది డేటాను వరుసగా భద్రపరచడానికి RAM లో ఉండే ఖాళీలను కేటాయించడమే <strong>అర్రేస్ (Arrays)</strong>. 1D అర్రేలు, 2D మ్యాట్రిక్స్ కూడికలు మరియు C లో Row-Major Order మెమరీ ఫార్ములాను విశ్లేషిద్దాం.
    </div>

    <div class="section-title"><span class="num">1</span>2D మ్యాట్రిక్స్ కూడిక (Matrix Addition)</div>
    <div class="section-body">
      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — 2D Matrix Addition</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int A[2][2] = {{1, 2}, {3, 4}};
    int B[2][2] = {{5, 6}, {7, 8}};
    int Sum[2][2];

    for (int i = 0; i &lt; 2; ++i) {
        for (int j = 0; j &lt; 2; ++j) {
            Sum[i][j] = A[i][j] + B[i][j];
            printf("%d ", Sum[i][j]);
        }
        printf("\\n");
    }
    return 0;
}</code></pre>
      </div>
    </div>
  `,

  14: `
    <div class="intro-box">
      C లో స్ట్రింగ్ అనేది ప్రత్యేకమైన డేటా టైప్ కాదు; అది కేవలం <code>'\\0'</code> (నల్ టెర్మినేటర్) తో ముగిసే <strong>క్యారెక్టర్ అర్రే (char[])</strong> మాత్రమే. <code>&lt;string.h&gt;</code> ఫంక్షన్లు మరియు బఫర్ ఓవర్‌ఫ్లో సెక్యూరిటీని పరిశీలిద్దాం.
    </div>

    <div class="section-title"><span class="num">1</span>స్ట్రింగ్ ఫంక్షన్స్: strlen, strcpy, strcmp</div>
    <div class="section-body">
      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — String operations</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char source[] = "Dennis Ritchie";
    char destination[30];

    // కాపీ చేయడం
    strcpy(destination, source);

    printf("Original: %s (Length: %zu)\\n", source, strlen(source));
    printf("Copied:   %s\\n", destination);
    return 0;
}</code></pre>
      </div>
    </div>
  `,

  15: `
    <div class="intro-box">
      C ప్రోగ్రామింగ్‌కు కిరీటం వంటిది <strong>పాయింటర్లు (Pointers)</strong>. కంప్యూటర్ RAM మెమరీ అడ్రస్‌లను నేరుగా యాక్సెస్ చేయడం, డీరిఫరెన్సింగ్ (<code>*</code>), మరియు పాయింటర్ అరిథ్‌మెటిక్ యొక్క పూర్తి రహస్యాలను ఈ అధ్యాయంలో ఛేదిద్దాం.
    </div>

    <div class="section-title"><span class="num">1</span>పాయింటర్ అంటే ఏమిటి? (* మరియు & ఆపరేటర్లు)</div>
    <div class="section-body">
      <p>
        ఒక వేరియబుల్ యొక్క <strong>RAM మెమరీ అడ్రస్</strong> ను భద్రపరిచే ప్రత్యేక వేరియబుల్‌నే పాయింటర్ అంటారు.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Pointers Basics</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int salary = 75000;
    int* ptr = &salary; // salary అడ్రస్‌ను ptr లో భద్రపరుస్తున్నాం

    printf("Salary Value:        %d\\n", salary);
    printf("Salary RAM Address:  %p\\n", (void*)&salary);
    printf("Pointer Stored Addr: %p\\n", (void*)ptr);
    printf("Dereferenced Value:  %d (*ptr)\\n", *ptr);
    return 0;
}</code></pre>
      </div>
    </div>
  `,

  16: `
    <div class="intro-box">
      అర్రే పేరు స్వయంగా ఒక పాయింటర్‌గా క్షీణించడం (Array Decay), డబుల్ పాయింటర్లు (<code>**ptr</code>), మరియు C లో ఈవెంట్ సిస్టమ్స్‌ను నిర్మించే <strong>ఫంక్షన్ పాయింటర్లు (Function Pointers)</strong> గురించి నేర్చుకుందాం.
    </div>

    <div class="section-title"><span class="num">1</span>డబుల్ పాయింటర్లు: Pointer to a Pointer</div>
    <div class="section-body">
      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Double Pointer</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int val = 99;
    int* p1 = &val;
    int** p2 = &p1; // పాయింటర్ p1 యొక్క అడ్రస్‌ను పట్టుకునే డబుల్ పాయింటర్

    printf("Direct: %d | Via P1: %d | Via P2: %d\\n", val, *p1, **p2);
    return 0;
}</code></pre>
      </div>
    </div>
  `,

  17: `
    <div class="intro-box">
      వేర్వేరు రకాల డేటాను (ఉదా: రోల్ నంబర్, పేరు, జీతం) ఒకే గొడుగు కింద చేర్చడానికి <strong>స్ట్రక్చర్స్ (struct)</strong>, మెమరీని షేర్ చేసుకునే <strong>యూనియన్స్ (union)</strong>, మరియు <code>typedef</code> ల గురించి నేర్చుకుందాం.
    </div>

    <div class="section-title"><span class="num">1</span>స్ట్రక్చర్స్ సింటాక్స్ & డాట్ (.) ఆపరేటర్</div>
    <div class="section-body">
      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — struct and typedef</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

typedef struct {
    int id;
    char name[30];
    float gpa;
} Student;

int main() {
    Student s1;
    s1.id = 101;
    strcpy(s1.name, "Kavya");
    s1.gpa = 9.4f;

    printf("ID: %d | Name: %s | GPA: %.1f\\n", s1.id, s1.name, s1.gpa);
    return 0;
}</code></pre>
      </div>
    </div>
  `,

  18: `
    <div class="intro-box">
      ప్రోగ్రామ్ రన్ అవుతున్న సమయంలో మనకు అవసరమైనంత మెమరీని RAM లోని Heap నుండి తీసుకోవడానికి C లో <code>malloc()</code>, <code>calloc()</code>, <code>realloc()</code> మరియు లీక్స్ నివారించడానికి <code>free()</code> వాడతాం.
    </div>

    <div class="section-title"><span class="num">1</span>డైనమిక్ అర్రే అలొకేషన్ (malloc & free)</div>
    <div class="section-body">
      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Dynamic Memory</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    int n = 5;
    int* arr = (int*)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("Memory Allocation Failed!\\n");
        return 1;
    }

    for (int i = 0; i &lt; n; ++i) arr[i] = (i + 1) * 10;
    for (int i = 0; i &lt; n; ++i) printf("%d ", arr[i]);
    printf("\\n");

    // తప్పనిసరిగా మెమరీని OS కి తిరిగి ఇవ్వాలి (Prevent Memory Leak)
    free(arr);
    arr = NULL;
    return 0;
}</code></pre>
      </div>
    </div>
  `,

  19: `
    <div class="intro-box">
      ప్రోగ్రామ్ ముగిసిన తర్వాత కూడా డేటా కంప్యూటర్ హార్డ్ డిస్క్‌లో శాశ్వతంగా ఉండటానికి <strong>ఫైల్ హ్యాండ్లింగ్ (File Handling)</strong> అవసరం. <code>fopen()</code>, <code>fclose()</code>, మరియు టెక్స్ట్ vs బైనరీ ఫైల్ ఆపరేషన్లను నేర్చుకుందాం.
    </div>

    <div class="section-title"><span class="num">1</span>ఫైల్ లోకి డేటాను రాయడం (File Writing with fprintf)</div>
    <div class="section-body">
      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — File Writing</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    FILE* fp = fopen("records.txt", "w");
    if (fp == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    fprintf(fp, "Student ID: 101 | Grade: A+\\n");
    fprintf(fp, "Student ID: 102 | Grade: O\\n");

    fclose(fp); // ఫైల్ క్లోజ్ చేయడం తప్పనిసరి
    printf("Records saved successfully to records.txt! 💾\\n");
    return 0;
}</code></pre>
      </div>
    </div>
  `,

  20: `
    <div class="intro-box">
      ఇప్పటివరకు నేర్చుకున్న <strong>Structs</strong>, <strong>Pointers</strong>, <strong>Dynamic Memory</strong>, మరియు <strong>File I/O</strong> కాన్సెప్ట్‌లన్నింటినీ ఏకం చేసి, పరిశ్రమ స్థాయి <strong>స్టూడెంట్ రికార్డ్ మేనేజ్‌మెంట్ సిస్టమ్ (Student Record Management Project)</strong> ను నిర్మిద్దాం.
    </div>

    <div class="section-title"><span class="num">1</span>ప్రాజెక్ట్ ఆర్కిటెక్చర్ & సోర్స్ కోడ్</div>
    <div class="section-body">
      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C — Student Records Project</span>
          <a class="try-btn" href="/online-c-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;

typedef struct {
    int roll;
    char name[40];
    float marks;
} Student;

void displayStudent(const Student* s) {
    printf("Roll: %-4d | Name: %-15s | Marks: %.2f\\n", s-&gt;roll, s-&gt;name, s-&gt;marks);
}

int main() {
    int count = 2;
    Student* list = (Student*)malloc(count * sizeof(Student));
    if (!list) return 1;

    // Student 1
    list[0].roll = 101;
    strcpy(list[0].name, "Rajesh Kumar");
    list[0].marks = 92.5f;

    // Student 2
    list[1].roll = 102;
    strcpy(list[1].name, "Priya Sharma");
    list[1].marks = 95.0f;

    printf("--- STUDENT DIRECTORY (C CAPSTONE PROJECT) ---\\n");
    for (int i = 0; i &lt; count; ++i) {
        displayStudent(&list[i]);
    }

    free(list);
    list = NULL;
    return 0;
}</code></pre>
      </div>
    </div>
  `
};

// Generate files for Lessons 11 to 20
for (let i = 11; i <= 20; ++i) {
  const lesson = LESSONS.find(l => l.num === i);
  if (!lesson) continue;
  lesson.contentHtml = CONTENTS[i] || `<p>Content coming soon.</p>`;
  const html = generatePageHtml(lesson);
  fs.writeFileSync(path.join(cDir, lesson.file), html, 'utf8');
  console.log('✅ Generated Lesson', i, ':', lesson.file);
}

