const fs = require('fs');
const path = require('path');
const { wrapCPage } = require('./build_massive_textbook_chapters_36_65.js');
const cDir = path.join(__dirname, '..', 'public', 'blog-c');
console.log('🚀 Building Lessons 42-51 (Phase 16, 17, 18)...');

function makeLesson(num, file, title, desc, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle) {
  fs.writeFileSync(path.join(cDir, file),
    wrapCPage(title, desc, file, num, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle),
    'utf8');
  console.log('  ✅ ' + file);
}

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 16 — Command-Line Arguments (Lessons 42-43)
// ═══════════════════════════════════════════════════════════════════════════════

makeLesson(42,
'42-c-command-line-arguments-argc-argv-and-parsing.html',
'C Command-Line Arguments: argc, argv, Parsing & Validation Masterclass',
'Exhaustive textbook-grade masterclass on C Command-Line Arguments (Phase 16 Part 1): int argc, char *argv[], argv[0] program name, argument parsing, string-to-number conversion with atoi/strtol, and validation patterns.',
'Phase 16','Command-Line Arguments',
'argc & argv[] · argv[0] Program Name · String-to-Number (atoi, strtol, strtod) · Argument Validation · getopt() Introduction · Building CLI tools',
'<div class="intro-box"><p>Welcome to <strong>Phase 16 (Chapter 42): C Command-Line Arguments — argc, argv, Parsing &amp; Validation Masterclass</strong>! Every C program can receive arguments from the operating system shell at launch time. Mastering <code>argc</code> and <code>argv</code> transforms your programs from hardcoded toys into flexible, reusable command-line tools.</p></div>' +

'<div class="section-title"><span class="num">1</span>argc &amp; argv Architecture</div>' +
'<div class="section-body">' +
'<div class="memory-diagram">' +
'Shell invocation: $ ./calculator 10 add 20\n\n' +
'argc = 4   (Total number of arguments, including the program name)\n\n' +
'argv (char*[]):\n' +
'  argv[0] ──► "./calculator"   (Always the program name/path)\n' +
'  argv[1] ──► "10"             (First user-provided argument)\n' +
'  argv[2] ──► "add"            (Second argument)\n' +
'  argv[3] ──► "20"             (Third argument)\n' +
'  argv[4] ──► NULL             (Always NULL-terminated sentinel!)\n' +
'</div>' +
'<p class="text-prose">ALL arguments arrive as <strong>strings</strong> (<code>char*</code>). To work with them as numbers you must convert explicitly using <code>atoi()</code>, <code>strtol()</code>, or <code>strtod()</code>.</p>' +
'<div class="concept-box"><h4>atoi() vs strtol() — Which to Use?</h4>' +
'<p>• <code>atoi(str)</code> — Simple but UNSAFE. Returns 0 for invalid input ("abc") indistinguishable from the number 0. No overflow detection.</p>' +
'<p>• <code>strtol(str, &amp;endptr, base)</code> — SAFE. Sets <code>endptr</code> to first invalid character. Detects overflow. Always prefer this for production code.</p>' +
'</div></div>' +

'<div class="section-title"><span class="num">2</span>Complete CLI Calculator Program</div>' +
'<div class="section-body"><div class="code-block"><div class="code-block-header"><span class="lang-tag">C — Robust Command-Line Calculator</span><a class="try-btn" href="/?lang=c">▶ Try in Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n' +
'#include &lt;string.h&gt;\n' +
'#include &lt;errno.h&gt;\n\n' +
'static long safe_parse_long(const char *str, const char *name) {\n' +
'    char *end;\n' +
'    errno = 0;\n' +
'    long val = strtol(str, &end, 10);\n' +
'    if (errno != 0 || *end != \'\\0\' || end == str) {\n' +
'        fprintf(stderr, "Error: \'%s\' is not a valid integer for %s\\n", str, name);\n' +
'        exit(EXIT_FAILURE);\n' +
'    }\n' +
'    return val;\n' +
'}\n\n' +
'int main(int argc, char *argv[]) {\n' +
'    if (argc != 4) {\n' +
'        fprintf(stderr, "Usage: %s &lt;num1&gt; &lt;op: add|sub|mul|div&gt; &lt;num2&gt;\\n", argv[0]);\n' +
'        return EXIT_FAILURE;\n' +
'    }\n\n' +
'    long a = safe_parse_long(argv[1], "num1");\n' +
'    long b = safe_parse_long(argv[3], "num2");\n' +
'    const char *op = argv[2];\n\n' +
'    if      (strcmp(op, "add") == 0) printf("%ld + %ld = %ld\\n", a, b, a + b);\n' +
'    else if (strcmp(op, "sub") == 0) printf("%ld - %ld = %ld\\n", a, b, a - b);\n' +
'    else if (strcmp(op, "mul") == 0) printf("%ld * %ld = %ld\\n", a, b, a * b);\n' +
'    else if (strcmp(op, "div") == 0) {\n' +
'        if (b == 0) { fprintf(stderr, "Error: Division by zero\\n"); return 1; }\n' +
'        printf("%ld / %ld = %ld\\n", a, b, a / b);\n' +
'    } else {\n' +
'        fprintf(stderr, "Error: Unknown operator \'%s\'\\n", op);\n' +
'        return EXIT_FAILURE;\n' +
'    }\n' +
'    return EXIT_SUCCESS;\n' +
'}</code></pre></div></div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body"><div class="faq-grid">' +
'<div class="faq-item"><h4>Q1: What is argv[argc]?</h4><p>By C standard guarantee, <code>argv[argc]</code> is always <code>NULL</code>. This allows null-terminated traversal: <code>for (char **p = argv; *p; p++)</code>.</p></div>' +
'<div class="faq-item"><h4>Q2: Can argv strings be modified?</h4><p>Yes! Unlike string literals, argv strings are writable. You can modify <code>argv[1][0] = \'X\';</code> safely. But do not replace the pointer itself.</p></div>' +
'<div class="faq-item"><h4>Q3: What is the difference between strtol() and sscanf() for parsing?</h4><p><code>strtol()</code> is more precise for integer parsing with overflow detection. <code>sscanf()</code> is convenient for mixed-format parsing but provides less error granularity.</p></div>' +
'<div class="faq-item"><h4>Q4: How do I read optional flags like -v or --verbose?</h4><p>Use POSIX <code>getopt(argc, argv, "vho:")</code> from <code>&lt;unistd.h&gt;</code> for Unix systems, or write a manual loop checking <code>argv[i][0] == \'-\'</code>.</p></div>' +
'<div class="faq-item"><h4>Q5: How do environment variables differ from command-line arguments?</h4><p>Command-line args are positional and explicit per invocation. Environment variables are inherited from the shell session and accessible via <code>getenv("PATH")</code>.</p></div>' +
'</div></div>',
'38-c-file-error-handling-feof-ferror-and-errno.html','38. File Error Handling, EOF, ferror() & errno',
'43-c-cli-tool-building-exit-codes-and-environment-variables.html','43. Building CLI Tools, Exit Codes & Environment');

// ─────────────────────────────────────────────────────────────────────────────
makeLesson(43,
'43-c-cli-tool-building-exit-codes-and-environment-variables.html',
'C CLI Tool Building, Exit Codes & Environment Variables Masterclass',
'Exhaustive textbook-grade masterclass on Building CLI Tools in C (Phase 16 Part 2): exit codes, EXIT_SUCCESS, EXIT_FAILURE, atexit(), getenv(), environment variable parsing, and shell pipelines.',
'Phase 16','Command-Line Arguments',
'Exit Codes (EXIT_SUCCESS/FAILURE) · atexit() Cleanup Handlers · getenv() / putenv() · Environment Variables · Shell Piping · Building Real CLI Utilities',
'<div class="intro-box"><p>Welcome to <strong>Phase 16 (Chapter 43): C CLI Tool Building, Exit Codes &amp; Environment Variables Masterclass</strong>! Production CLI tools communicate with the shell through exit status codes and can read environment variables for configuration. In this guide you master <code>exit()</code>, <code>atexit()</code>, <code>getenv()</code>, and patterns used by real Unix utilities like <code>grep</code>, <code>ls</code>, and <code>wc</code>.</p></div>' +

'<div class="section-title"><span class="num">1</span>Exit Status Codes &amp; Shell Integration</div>' +
'<div class="section-body">' +
'<p class="text-prose">Every C program returns an integer exit status to the operating system shell. This status code is the primary IPC mechanism between programs in Unix shell pipelines.</p>' +
'<div class="memory-diagram">' +
'Exit Code Convention (POSIX standard):\n' +
'\n' +
'  0          → SUCCESS (Program completed its task correctly)\n' +
'  1          → GENERAL ERROR (Catch-all failure)\n' +
'  2          → MISUSE of command or invalid arguments\n' +
'  126        → Permission denied (cannot execute file)\n' +
'  127        → Command not found\n' +
'  128+N      → Fatal signal N (e.g. 139 = SIGSEGV Segfault)\n' +
'\n' +
'  Shell check: $ ./app && echo "Success!" || echo "Failed!"\n' +
'</div>' +
'<div class="concept-box"><h4>exit() vs return from main():</h4>' +
'<p>• <code>return 0;</code> from <code>main()</code> — Normal clean exit. Calls static destructors and fflush on all open streams.</p>' +
'<p>• <code>exit(EXIT_SUCCESS);</code> — Same as return 0 from main(). Can be called from ANY function.</p>' +
'<p>• <code>_Exit(0);</code> — Immediate process termination. Does NOT flush buffers or call atexit handlers. Use after fork() in child processes.</p>' +
'</div></div>' +

'<div class="section-title"><span class="num">2</span>atexit() Cleanup Handlers</div>' +
'<div class="section-body">' +
'<p class="text-prose"><code>atexit()</code> registers functions called automatically when the program exits normally (via <code>exit()</code> or <code>return</code> from main). Up to 32 handlers may be registered (POSIX minimum). They execute in LIFO (Last-In, First-Out) order — reverse registration order.</p>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Environment Variables</div>' +
'<div class="section-body">' +
'<table class="tbl spec-table"><thead><tr><th>Function</th><th>Signature</th><th>Purpose</th></tr></thead><tbody>' +
'<tr><td><code>getenv()</code></td><td><code>char *getenv(const char *name)</code></td><td>Read environment variable. Returns NULL if not set.</td></tr>' +
'<tr><td><code>putenv()</code></td><td><code>int putenv(char *string)</code></td><td>Set/modify env var. POSIX only. Unsafe (string ownership issues).</td></tr>' +
'<tr><td><code>setenv()</code></td><td><code>int setenv(const char *name, const char *value, int overwrite)</code></td><td>Safer POSIX alternative to putenv(). Makes internal copy.</td></tr>' +
'</tbody></table>' +
'</div>' +

'<div class="section-title"><span class="num">4</span>Complete Production CLI Utility</div>' +
'<div class="section-body"><div class="code-block"><div class="code-block-header"><span class="lang-tag">C — Production-grade CLI Word Counter (like wc)</span><a class="try-btn" href="/?lang=c">▶ Try in Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n' +
'#include &lt;ctype.h&gt;\n' +
'#include &lt;string.h&gt;\n\n' +
'static FILE *logfp = NULL;\n\n' +
'static void cleanup(void) {\n' +
'    if (logfp) { fclose(logfp); printf("[atexit] Log file closed.\\n"); }\n' +
'}\n\n' +
'typedef struct { long lines, words, chars; } WcResult;\n\n' +
'static WcResult count_file(FILE *fp) {\n' +
'    WcResult r = {0, 0, 0};\n' +
'    int ch, in_word = 0;\n' +
'    while ((ch = fgetc(fp)) != EOF) {\n' +
'        r.chars++;\n' +
'        if (ch == \'\\n\') r.lines++;\n' +
'        if (isspace(ch)) { in_word = 0; }\n' +
'        else if (!in_word) { in_word = 1; r.words++; }\n' +
'    }\n' +
'    return r;\n' +
'}\n\n' +
'int main(int argc, char *argv[]) {\n' +
'    atexit(cleanup);\n\n' +
'    /* Read log path from environment variable */\n' +
'    const char *log_path = getenv("WC_LOG");\n' +
'    if (log_path) {\n' +
'        logfp = fopen(log_path, "a");\n' +
'        if (!logfp) perror("Cannot open WC_LOG");\n' +
'        else fprintf(logfp, "wc invoked with %d args\\n", argc);\n' +
'    }\n\n' +
'    FILE *fp = (argc &gt; 1) ? fopen(argv[1], "r") : stdin;\n' +
'    if (!fp) { perror(argv[1]); return EXIT_FAILURE; }\n\n' +
'    WcResult r = count_file(fp);\n' +
'    printf("Lines: %ld  Words: %ld  Chars: %ld\\n", r.lines, r.words, r.chars);\n\n' +
'    if (fp != stdin) fclose(fp);\n' +
'    return EXIT_SUCCESS;\n' +
'}</code></pre></div></div>' +

'<div class="section-title"><span class="num">5</span>Technical FAQs</div>' +
'<div class="section-body"><div class="faq-grid">' +
'<div class="faq-item"><h4>Q1: How does the shell check exit codes?</h4><p>After any command, <code>$?</code> holds its exit code. Zero means success; non-zero means failure. Shell conditionals like <code>if ./app; then...</code> use exit codes automatically.</p></div>' +
'<div class="faq-item"><h4>Q2: What order do atexit handlers run?</h4><p>Handlers are called in <strong>LIFO order</strong> — the last registered handler runs first. This mirrors C++ destructor ordering for cleanup safety.</p></div>' +
'<div class="faq-item"><h4>Q3: Is getenv() thread-safe?</h4><p>No — <code>getenv()</code> returns a pointer to internal static storage that may be modified by <code>setenv()</code>/<code>putenv()</code> in another thread. Use with caution in multithreaded programs.</p></div>' +
'<div class="faq-item"><h4>Q4: How do shell pipelines use exit codes?</h4><p>In <code>cmd1 | cmd2</code>, by default only <code>cmd2</code>\'s exit code is checked. With <code>set -o pipefail</code> in Bash, any failing command in the pipeline causes pipeline failure.</p></div>' +
'<div class="faq-item"><h4>Q5: What is the difference between exit() and abort()?</h4><p><code>abort()</code> sends SIGABRT signal, generating a core dump for debugging. It does NOT call atexit handlers or flush streams. Used when program detects a fatal internal inconsistency.</p></div>' +
'</div></div>',
'42-c-command-line-arguments-argc-argv-and-parsing.html','42. Command-Line Arguments (argc, argv & Parsing)',
'44-c-standard-library-io-utility-math-and-strings.html','44. Standard Library: I/O, Utilities, Math & Strings');

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 17 — Standard Library Deep-Dive (Lessons 44-46)
// ═══════════════════════════════════════════════════════════════════════════════

makeLesson(44,
'44-c-standard-library-io-utility-math-and-strings.html',
'C Standard Library: <stdio.h>, <stdlib.h>, <math.h> & <string.h> Deep-Dive Masterclass',
'Exhaustive textbook-grade masterclass on the C Standard Library (Phase 17 Part 1): stdio.h printf/scanf family, stdlib.h utilities, math.h transcendental functions, and string.h manipulation functions.',
'Phase 17','Standard Library Deep-Dive',
'<stdio.h> printf family · <stdlib.h> Utilities · <math.h> sqrt/sin/pow · <string.h> Functions · <ctype.h> Classification · qsort() & bsearch()',
'<div class="intro-box"><p>Welcome to <strong>Phase 17 (Chapter 44): C Standard Library Deep-Dive — &lt;stdio.h&gt;, &lt;stdlib.h&gt;, &lt;math.h&gt; &amp; &lt;string.h&gt; Masterclass</strong>! The C Standard Library (libc) is the foundation of all C programs. Every function from <code>printf()</code> to <code>malloc()</code> to <code>sin()</code> lives here. In this guide you master the most essential headers and their production usage patterns.</p></div>' +

'<div class="section-title"><span class="num">1</span>stdio.h — Input/Output Functions</div>' +
'<div class="section-body"><table class="tbl spec-table"><thead><tr><th>Function</th><th>Purpose</th></tr></thead><tbody>' +
'<tr><td><code>printf(fmt, ...)</code></td><td>Formatted output to stdout.</td></tr>' +
'<tr><td><code>fprintf(fp, fmt, ...)</code></td><td>Formatted output to file stream.</td></tr>' +
'<tr><td><code>sprintf(buf, fmt, ...)</code></td><td>Formatted output to string buffer (dangerous — no size limit).</td></tr>' +
'<tr><td><code>snprintf(buf, n, fmt, ...)</code></td><td>Safe formatted output to buffer with size limit. ALWAYS use this.</td></tr>' +
'<tr><td><code>scanf(fmt, ...)</code></td><td>Formatted input from stdin. Avoid in production (buffer risks).</td></tr>' +
'<tr><td><code>sscanf(str, fmt, ...)</code></td><td>Parse formatted data from a string.</td></tr>' +
'</tbody></table></div>' +

'<div class="section-title"><span class="num">2</span>stdlib.h — General Utility Functions</div>' +
'<div class="section-body"><table class="tbl spec-table"><thead><tr><th>Function</th><th>Purpose</th></tr></thead><tbody>' +
'<tr><td><code>malloc / calloc / realloc / free</code></td><td>Dynamic heap memory management.</td></tr>' +
'<tr><td><code>atoi / strtol / strtod</code></td><td>String-to-number conversion.</td></tr>' +
'<tr><td><code>rand() / srand(seed)</code></td><td>Pseudo-random number generation (use arc4random on modern systems).</td></tr>' +
'<tr><td><code>abs(n) / labs(n) / llabs(n)</code></td><td>Absolute value for int / long / long long.</td></tr>' +
'<tr><td><code>qsort(arr, n, size, cmp)</code></td><td>Generic quicksort — sorts any array using a comparator function.</td></tr>' +
'<tr><td><code>bsearch(key, arr, n, size, cmp)</code></td><td>Binary search in sorted array.</td></tr>' +
'<tr><td><code>system(cmd)</code></td><td>Run shell command. UNSAFE in security-sensitive code.</td></tr>' +
'</tbody></table></div>' +

'<div class="section-title"><span class="num">3</span>math.h Functions &amp; -lm Linker Flag</div>' +
'<div class="section-body">' +
'<p class="text-prose">Math functions require linking with <code>-lm</code>: <code>gcc app.c -lm -o app</code>. All functions work on <code>double</code> by default; use <code>sqrtf()</code>/<code>sinf()</code> for float variants.</p>' +
'<div class="concept-box"><h4>Key math.h Functions:</h4>' +
'<p>• <code>sqrt(x)</code>, <code>cbrt(x)</code> — Square root, cube root.</p>' +
'<p>• <code>pow(base, exp)</code> — Raise to power. Note: slower than manual multiplication for integer exponents.</p>' +
'<p>• <code>sin(x)</code>, <code>cos(x)</code>, <code>tan(x)</code> — Trigonometric functions (argument in radians).</p>' +
'<p>• <code>log(x)</code>, <code>log2(x)</code>, <code>log10(x)</code> — Natural/base-2/base-10 logarithms.</p>' +
'<p>• <code>ceil(x)</code>, <code>floor(x)</code>, <code>round(x)</code>, <code>fabs(x)</code> — Rounding and absolute value.</p>' +
'<p>• <code>fmod(x, y)</code> — Floating-point modulo remainder.</p>' +
'</div></div>' +

'<div class="section-title"><span class="num">4</span>qsort() Deep-Dive — Generic Sort with Function Pointer</div>' +
'<div class="section-body"><div class="code-block"><div class="code-block-header"><span class="lang-tag">C — qsort with struct array + bsearch</span><a class="try-btn" href="/?lang=c">▶ Try in Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n' +
'#include &lt;string.h&gt;\n\n' +
'typedef struct { char name[30]; int score; } Player;\n\n' +
'/* Comparator: sort by score descending */\n' +
'static int cmp_score_desc(const void *a, const void *b) {\n' +
'    const Player *pa = (const Player *)a;\n' +
'    const Player *pb = (const Player *)b;\n' +
'    return pb->score - pa->score;  /* descending */\n' +
'}\n\n' +
'int main(void) {\n' +
'    Player players[] = {\n' +
'        {"Ravi",   850}, {"Anitha", 920},\n' +
'        {"Kiran",  760}, {"Priya",  990}\n' +
'    };\n' +
'    int n = sizeof(players) / sizeof(players[0]);\n\n' +
'    qsort(players, n, sizeof(Player), cmp_score_desc);\n\n' +
'    printf("=== Leaderboard ===\\n");\n' +
'    for (int i = 0; i &lt; n; i++) {\n' +
'        printf("#%d  %-10s  %d pts\\n", i+1, players[i].name, players[i].score);\n' +
'    }\n' +
'    return 0;\n' +
'}</code></pre></div></div>' +

'<div class="section-title"><span class="num">5</span>Technical FAQs</div>' +
'<div class="section-body"><div class="faq-grid">' +
'<div class="faq-item"><h4>Q1: Why is sprintf() dangerous and what replaces it?</h4><p><code>sprintf()</code> has no buffer size limit and can overflow the destination string causing stack corruption. Always use <code>snprintf(buf, sizeof(buf), fmt, ...);</code> instead.</p></div>' +
'<div class="faq-item"><h4>Q2: Why does math.h need -lm linker flag?</h4><p>On Linux/glibc, math functions live in a separate <code>libm.so</code> library. The compiler does not link it automatically. GCC on macOS/Windows includes math in libc so -lm is optional there.</p></div>' +
'<div class="faq-item"><h4>Q3: How do I generate random numbers in a range [min, max]?</h4><p>Use <code>min + rand() % (max - min + 1)</code>. For cryptographic randomness use <code>/dev/urandom</code> or <code>arc4random_uniform()</code> on BSD/macOS.</p></div>' +
'<div class="faq-item"><h4>Q4: What is the comparator return value convention for qsort()?</h4><p>Return negative if a should come before b, zero if equal, positive if b should come before a. Many implementations use <code>a->field - b->field</code> (watch for overflow with large integers!).</p></div>' +
'<div class="faq-item"><h4>Q5: Can bsearch() find elements in an unsorted array?</h4><p>No! <code>bsearch()</code> requires the array to be sorted by the same comparator used for searching. Calling it on unsorted data produces undefined results.</p></div>' +
'</div></div>',
'43-c-cli-tool-building-exit-codes-and-environment-variables.html','43. Building CLI Tools, Exit Codes & Environment',
'45-c-standard-library-time-booleans-and-fixed-width-integers.html','45. Standard Library: Time, Booleans & Integers');

// ─────────────────────────────────────────────────────────────────────────────
makeLesson(45,
'45-c-standard-library-time-booleans-and-fixed-width-integers.html',
'C Standard Library: <time.h>, <stdbool.h> & <stdint.h> Fixed-Width Integers Masterclass',
'Exhaustive textbook-grade masterclass on C Standard Library (Phase 17 Part 2): time.h clock/time measurement, stdbool.h boolean type, stdint.h fixed-width integers (int32_t, uint8_t), and <inttypes.h> format specifiers.',
'Phase 17','Standard Library Deep-Dive',
'<time.h> clock_t & time_t · Measuring Execution Time · <stdbool.h> bool type · <stdint.h> int8_t to int64_t · <inttypes.h> PRId32 Format Macros · Platform-Independent Integers',
'<div class="intro-box"><p>Welcome to <strong>Phase 17 (Chapter 45): C Standard Library — &lt;time.h&gt;, &lt;stdbool.h&gt; &amp; &lt;stdint.h&gt; Fixed-Width Integers Masterclass</strong>! These three headers solve real-world portability and clarity problems. Fixed-width integers prevent silent integer truncation across platforms. Boolean types clarify intent. Time functions let you benchmark and schedule operations.</p></div>' +

'<div class="section-title"><span class="num">1</span>time.h — Timestamps &amp; Execution Benchmarking</div>' +
'<div class="section-body"><table class="tbl spec-table"><thead><tr><th>Function / Type</th><th>Purpose</th></tr></thead><tbody>' +
'<tr><td><code>time_t time(NULL)</code></td><td>Current Unix timestamp (seconds since Jan 1 1970 UTC).</td></tr>' +
'<tr><td><code>clock_t clock()</code></td><td>CPU time consumed by program. Use for benchmarking code sections.</td></tr>' +
'<tr><td><code>difftime(t2, t1)</code></td><td>Difference between two <code>time_t</code> values in seconds (double).</td></tr>' +
'<tr><td><code>localtime(&amp;t)</code></td><td>Convert <code>time_t</code> to broken-down local <code>struct tm</code>.</td></tr>' +
'<tr><td><code>strftime(buf, n, fmt, &amp;tm)</code></td><td>Format <code>struct tm</code> to human-readable string (like date command).</td></tr>' +
'</tbody></table>' +
'<div class="concept-box"><h4>Benchmarking Pattern with clock():</h4>' +
'<p><code>clock_t start = clock();</code></p>' +
'<p><em>... code to benchmark ...</em></p>' +
'<p><code>double ms = (double)(clock() - start) / CLOCKS_PER_SEC * 1000.0;</code></p>' +
'</div></div>' +

'<div class="section-title"><span class="num">2</span>stdbool.h — The bool Type in C99+</div>' +
'<div class="section-body">' +
'<p class="text-prose">Before C99, C had no dedicated boolean type. Developers used integers (0 = false, non-zero = true). <code>&lt;stdbool.h&gt;</code> adds <code>bool</code>, <code>true</code>, and <code>false</code> as proper named types.</p>' +
'<div class="concept-box"><h4>stdbool.h defines:</h4>' +
'<p>• <code>bool</code> — Expands to <code>_Bool</code> (C99 built-in type, 0 or 1 only)</p>' +
'<p>• <code>true</code> — Integer constant 1</p>' +
'<p>• <code>false</code> — Integer constant 0</p>' +
'<p>In C23, <code>bool</code>/<code>true</code>/<code>false</code> are built-in keywords and stdbool.h is no longer needed.</p>' +
'</div></div>' +

'<div class="section-title"><span class="num">3</span>stdint.h — Fixed-Width Integer Types</div>' +
'<div class="section-body">' +
'<p class="text-prose">The size of <code>int</code>, <code>long</code>, and <code>char</code> varies across 16-bit, 32-bit, and 64-bit platforms. <code>&lt;stdint.h&gt;</code> provides types with guaranteed exact widths — essential for file formats, protocols, embedded systems, and bit manipulation.</p>' +
'<table class="tbl spec-table"><thead><tr><th>Type</th><th>Size</th><th>Range</th><th>Use Case</th></tr></thead><tbody>' +
'<tr><td><code>int8_t</code></td><td>8 bits</td><td>-128 to 127</td><td>Byte values, sensor readings</td></tr>' +
'<tr><td><code>uint8_t</code></td><td>8 bits</td><td>0 to 255</td><td>Raw bytes, pixel channel values</td></tr>' +
'<tr><td><code>int16_t</code></td><td>16 bits</td><td>-32768 to 32767</td><td>Audio samples, small integers</td></tr>' +
'<tr><td><code>uint16_t</code></td><td>16 bits</td><td>0 to 65535</td><td>Port numbers, 16-bit indices</td></tr>' +
'<tr><td><code>int32_t</code></td><td>32 bits</td><td>±2.1 billion</td><td>General integers, pixel ARGB</td></tr>' +
'<tr><td><code>uint32_t</code></td><td>32 bits</td><td>0 to ~4.3 billion</td><td>IP addresses, file offsets</td></tr>' +
'<tr><td><code>int64_t</code></td><td>64 bits</td><td>±9.2 quintillion</td><td>Timestamps, large counters</td></tr>' +
'<tr><td><code>size_t</code></td><td>Platform word</td><td>0 to SIZE_MAX</td><td>sizeof results, array lengths</td></tr>' +
'</tbody></table></div>' +

'<div class="section-title"><span class="num">4</span>Complete Benchmark + Fixed-Width Demo</div>' +
'<div class="section-body"><div class="code-block"><div class="code-block-header"><span class="lang-tag">C — Timing a sort with fixed-width integers</span><a class="try-btn" href="/?lang=c">▶ Try in Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n' +
'#include &lt;stdint.h&gt;\n' +
'#include &lt;stdbool.h&gt;\n' +
'#include &lt;time.h&gt;\n\n' +
'#define N 100000\n\n' +
'static int cmp_int(const void *a, const void *b) {\n' +
'    return (*(int32_t*)a > *(int32_t*)b) - (*(int32_t*)a < *(int32_t*)b);\n' +
'}\n\n' +
'int main(void) {\n' +
'    srand((unsigned)time(NULL));\n' +
'    int32_t *arr = malloc(N * sizeof(int32_t));\n' +
'    if (!arr) { perror("malloc"); return 1; }\n\n' +
'    for (int i = 0; i &lt; N; i++) arr[i] = rand();\n\n' +
'    clock_t start = clock();\n' +
'    qsort(arr, N, sizeof(int32_t), cmp_int);\n' +
'    double ms = (double)(clock() - start) / CLOCKS_PER_SEC * 1000.0;\n\n' +
'    /* Verify sorted */\n' +
'    bool sorted = true;\n' +
'    for (int i = 1; i &lt; N; i++) {\n' +
'        if (arr[i] &lt; arr[i-1]) { sorted = false; break; }\n' +
'    }\n\n' +
'    printf("Sorted %d int32_t values: %s\\n", N, sorted ? "CORRECT" : "BUG!");\n' +
'    printf("qsort time: %.3f ms\\n", ms);\n\n' +
'    free(arr);\n' +
'    return 0;\n' +
'}</code></pre></div></div>' +

'<div class="section-title"><span class="num">5</span>Technical FAQs</div>' +
'<div class="section-body"><div class="faq-grid">' +
'<div class="faq-item"><h4>Q1: What is CLOCKS_PER_SEC?</h4><p>It is a macro representing the number of <code>clock()</code> ticks per second (typically 1,000,000 on Linux). Divide <code>clock()</code> difference by it to get seconds.</p></div>' +
'<div class="faq-item"><h4>Q2: What is int_fast32_t vs int32_t?</h4><p><code>int32_t</code> is exactly 32 bits. <code>int_fast32_t</code> is the fastest native integer type that is at least 32 bits — may be 64-bit on 64-bit CPUs for performance.</p></div>' +
'<div class="faq-item"><h4>Q3: How do I print int64_t portably?</h4><p>Use <code>&lt;inttypes.h&gt;</code> format macros: <code>printf("%" PRId64 "\\n", value);</code>. The <code>PRId64</code> expands to the correct format specifier for the platform.</p></div>' +
'<div class="faq-item"><h4>Q4: Is clock() reliable for wall-clock time?</h4><p>No — <code>clock()</code> measures CPU time (sum of all threads). For real elapsed wall time use <code>clock_gettime(CLOCK_MONOTONIC, &ts)</code> from <code>&lt;time.h&gt;</code> on POSIX systems.</p></div>' +
'<div class="faq-item"><h4>Q5: What is the maximum value of size_t?</h4><p><code>SIZE_MAX</code> macro (from <code>&lt;stdint.h&gt;</code>) holds the maximum value. On 64-bit systems it is 18,446,744,073,709,551,615 (2^64-1).</p></div>' +
'</div></div>',
'44-c-standard-library-io-utility-math-and-strings.html','44. Standard Library: I/O, Utilities, Math & Strings',
'46-c-standard-library-assertions-error-handling-and-stddef.html','46. Standard Library: Assertions & Error Handling');

// ─────────────────────────────────────────────────────────────────────────────
makeLesson(46,
'46-c-standard-library-assertions-error-handling-and-stddef.html',
'C Standard Library: <assert.h>, <stddef.h>, <limits.h> & Error Handling Masterclass',
'Exhaustive textbook-grade masterclass on C Standard Library (Phase 17 Part 3): assert() defensive programming, NDEBUG flag, stddef.h types (ptrdiff_t, NULL, offsetof), limits.h platform constants, and setjmp/longjmp non-local jumps.',
'Phase 17','Standard Library Deep-Dive',
'assert() Defensive Assertions · NDEBUG Release Build · <stddef.h> ptrdiff_t & offsetof · <limits.h> INT_MAX/CHAR_MIN · setjmp/longjmp Non-Local Jumps · Static Assertions _Static_assert',
'<div class="intro-box"><p>Welcome to <strong>Phase 17 (Chapter 46): C Standard Library — &lt;assert.h&gt;, &lt;stddef.h&gt;, &lt;limits.h&gt; &amp; Error Handling Masterclass</strong>! This chapter covers the defensive programming infrastructure of C: runtime assertions that catch impossible states, compile-time assertions for type sizes, platform limit constants, and non-local jumps for error recovery without exceptions.</p></div>' +

'<div class="section-title"><span class="num">1</span>assert() — Runtime Defensive Assertions</div>' +
'<div class="section-body">' +
'<p class="text-prose"><code>assert(expression)</code> from <code>&lt;assert.h&gt;</code> evaluates an expression at runtime. If it evaluates to zero (false), the program prints an error message showing file, line number, and expression text, then calls <code>abort()</code>.</p>' +
'<div class="concept-box"><h4>When to use assert() vs if/return:</h4>' +
'<p>• <code>assert()</code> — For detecting <em>programmer bugs</em> (impossible states, violated preconditions). Should NEVER fire in production.</p>' +
'<p>• <code>if/return error</code> — For handling <em>runtime errors</em> from external inputs (bad user data, I/O failures, NULL returns). Must be handled gracefully.</p>' +
'<p>• Define <code>NDEBUG</code> in release builds (<code>gcc -DNDEBUG</code>) to strip ALL assert() calls to zero overhead.</p>' +
'</div>' +
'<p class="text-prose"><strong>C11 Static Assertions:</strong> <code>_Static_assert(sizeof(int) == 4, "int must be 32 bits");</code> — evaluated at compile time, zero runtime cost. Stops compilation if violated.</p>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>stddef.h — Core Type Definitions</div>' +
'<div class="section-body"><table class="tbl spec-table"><thead><tr><th>Identifier</th><th>Type / Value</th><th>Purpose</th></tr></thead><tbody>' +
'<tr><td><code>NULL</code></td><td>Null pointer constant</td><td>Platform-correct null pointer (0 or (void*)0)</td></tr>' +
'<tr><td><code>size_t</code></td><td>Unsigned integer</td><td>Result of sizeof. Array indices. Byte counts.</td></tr>' +
'<tr><td><code>ptrdiff_t</code></td><td>Signed integer</td><td>Result of pointer subtraction. Can be negative.</td></tr>' +
'<tr><td><code>offsetof(type, member)</code></td><td>size_t macro</td><td>Byte offset of struct member from struct start. Used in binary protocols and container_of patterns.</td></tr>' +
'</tbody></table></div>' +

'<div class="section-title"><span class="num">3</span>limits.h — Platform Integer Boundaries</div>' +
'<div class="section-body">' +
'<p class="text-prose">Every C platform has different widths for primitive types. <code>&lt;limits.h&gt;</code> exports the exact min/max constants for the current compilation target:</p>' +
'<div class="concept-box"><h4>Key limits.h Constants:</h4>' +
'<p>• <code>CHAR_BIT</code> = 8 (bits per byte, always 8 on modern hardware)</p>' +
'<p>• <code>INT_MIN</code> = -2,147,483,648 | <code>INT_MAX</code> = 2,147,483,647</p>' +
'<p>• <code>LONG_MAX</code> = 9,223,372,036,854,775,807 (on 64-bit Linux)</p>' +
'<p>• <code>CHAR_MIN</code> = -128 | <code>CHAR_MAX</code> = 127 (signed char)</p>' +
'<p>• <code>UINT_MAX</code> = 4,294,967,295 (unsigned int)</p>' +
'</div></div>' +

'<div class="section-title"><span class="num">4</span>Complete Assertions &amp; offsetof Demo</div>' +
'<div class="section-body"><div class="code-block"><div class="code-block-header"><span class="lang-tag">C — assert, _Static_assert & offsetof</span><a class="try-btn" href="/?lang=c">▶ Try in Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;assert.h&gt;\n' +
'#include &lt;stddef.h&gt;\n' +
'#include &lt;limits.h&gt;\n' +
'#include &lt;stdint.h&gt;\n\n' +
'/* Compile-time assertion: struct must be exactly 16 bytes for binary protocol */\n' +
'typedef struct {\n' +
'    uint8_t  type;    /* offset 0 */\n' +
'    uint8_t  flags;   /* offset 1 */\n' +
'    uint16_t length;  /* offset 2 */\n' +
'    uint32_t id;      /* offset 4 */\n' +
'    uint64_t payload; /* offset 8 */\n' +
'} __attribute__((packed)) PacketHeader;\n\n' +
'_Static_assert(sizeof(PacketHeader) == 16, "PacketHeader must be 16 bytes!");\n\n' +
'static int divide(int a, int b) {\n' +
'    assert(b != 0 && "Divisor must not be zero!");\n' +
'    return a / b;\n' +
'}\n\n' +
'int main(void) {\n' +
'    printf("INT_MAX  = %d\\n", INT_MAX);\n' +
'    printf("LONG_MAX = %ld\\n", LONG_MAX);\n\n' +
'    printf("offsetof(PacketHeader, id)      = %zu\\n", offsetof(PacketHeader, id));\n' +
'    printf("offsetof(PacketHeader, payload) = %zu\\n", offsetof(PacketHeader, payload));\n\n' +
'    printf("divide(10, 2) = %d\\n", divide(10, 2));\n' +
'    /* divide(10, 0) would trigger assert and abort */\n' +
'    return 0;\n' +
'}</code></pre></div></div>' +

'<div class="section-title"><span class="num">5</span>Technical FAQs</div>' +
'<div class="section-body"><div class="faq-grid">' +
'<div class="faq-item"><h4>Q1: Should assert() be used for NULL pointer checks?</h4><p>Only for NULL pointers that represent programmer bugs (e.g. internal preconditions). For NULL from user input or library calls, use <code>if (!ptr) { handle_error(); }</code>.</p></div>' +
'<div class="faq-item"><h4>Q2: What happens when _Static_assert fails?</h4><p>The compiler emits an error with your custom message string and stops compilation. Zero runtime overhead — it is purely a compile-time gate.</p></div>' +
'<div class="faq-item"><h4>Q3: What is the container_of macro?</h4><p>A common Linux kernel macro using <code>offsetof()</code> to recover a pointer to the containing struct from a pointer to one of its members — foundational to linked list implementations.</p></div>' +
'<div class="faq-item"><h4>Q4: When would ptrdiff_t be negative?</h4><p><code>ptrdiff_t = ptr2 - ptr1</code> is negative when ptr2 points to an earlier memory address than ptr1. This occurs when iterating backward through an array.</p></div>' +
'<div class="faq-item"><h4>Q5: What is setjmp/longjmp used for?</h4><p><code>setjmp()</code> saves the CPU register state; <code>longjmp()</code> restores it — effectively a non-local goto. Used in error recovery and parser frameworks. Extremely error-prone; avoid in new code.</p></div>' +
'</div></div>',
'45-c-standard-library-time-booleans-and-fixed-width-integers.html','45. Standard Library: Time, Booleans & Integers',
'47-c-data-structures-singly-doubly-and-circular-linked-lists.html','47. Linked Lists: Singly, Doubly & Circular');

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 18 — Data Structures in C (Lessons 47-51)
// ═══════════════════════════════════════════════════════════════════════════════

makeLesson(47,
'47-c-data-structures-singly-doubly-and-circular-linked-lists.html',
'C Data Structures: Singly, Doubly & Circular Linked Lists Masterclass',
'Exhaustive textbook-grade masterclass on Linked Lists in C (Phase 18 Part 1): Singly linked list with full CRUD operations, doubly linked list bidirectional traversal, circular linked lists, and real-world applications.',
'Phase 18','Data Structures in C',
'Singly Linked List (create/insert/delete/search) · Doubly Linked List · Circular Linked List · Node struct with self-referential pointers · O(1) head insert · Reversing a list',
'<div class="intro-box"><p>Welcome to <strong>Phase 18 (Chapter 47): C Data Structures — Singly, Doubly &amp; Circular Linked Lists Masterclass</strong>! A linked list is a chain of heap-allocated <code>Node</code> structs, each holding data and a pointer to the next node. Unlike arrays, linked lists support O(1) head insertion and deletion without shifting elements.</p></div>' +

'<div class="section-title"><span class="num">1</span>Linked List vs Array — When to Choose</div>' +
'<div class="section-body"><table class="tbl spec-table"><thead><tr><th>Operation</th><th>Array</th><th>Linked List</th></tr></thead><tbody>' +
'<tr><td>Random Access (arr[i])</td><td>O(1) — Direct index</td><td>O(n) — Must traverse from head</td></tr>' +
'<tr><td>Head Insert</td><td>O(n) — Shift all elements</td><td>O(1) — Reroute head pointer</td></tr>' +
'<tr><td>Middle Insert</td><td>O(n) — Shift right half</td><td>O(n) traversal + O(1) rewire</td></tr>' +
'<tr><td>Delete by value</td><td>O(n) shift</td><td>O(n) find + O(1) rewire</td></tr>' +
'<tr><td>Memory</td><td>Contiguous (cache-friendly)</td><td>Scattered (heap fragmentation, pointer overhead)</td></tr>' +
'</tbody></table>' +
'<div class="memory-diagram">' +
'Singly Linked List RAM Layout:\n\n' +
'  head\n' +
'   │\n' +
'   ▼\n' +
' [data=10|next]──►[data=20|next]──►[data=30|next=NULL]\n' +
'  0x5000          0x5020           0x5040\n\n' +
'  Each node is a separate malloc() allocation on the HEAP.\n' +
'</div></div>' +

'<div class="section-title"><span class="num">2</span>Complete Singly Linked List Implementation</div>' +
'<div class="section-body"><div class="code-block"><div class="code-block-header"><span class="lang-tag">C — Full Singly Linked List (CRUD + Reverse)</span><a class="try-btn" href="/?lang=c">▶ Try in Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n\n' +
'typedef struct Node {\n' +
'    int data;\n' +
'    struct Node *next;\n' +
'} Node;\n\n' +
'/* Insert at head — O(1) */\n' +
'Node *push_front(Node *head, int value) {\n' +
'    Node *n = malloc(sizeof(Node));\n' +
'    if (!n) { perror("malloc"); exit(1); }\n' +
'    n->data = value;\n' +
'    n->next = head;\n' +
'    return n;\n' +
'}\n\n' +
'/* Insert at tail — O(n) */\n' +
'Node *push_back(Node *head, int value) {\n' +
'    Node *n = malloc(sizeof(Node));\n' +
'    if (!n) { perror("malloc"); exit(1); }\n' +
'    n->data = value;\n' +
'    n->next = NULL;\n' +
'    if (!head) return n;\n' +
'    Node *cur = head;\n' +
'    while (cur->next) cur = cur->next;\n' +
'    cur->next = n;\n' +
'    return head;\n' +
'}\n\n' +
'/* Delete first node with given value — O(n) */\n' +
'Node *delete_value(Node *head, int value) {\n' +
'    if (!head) return NULL;\n' +
'    if (head->data == value) {\n' +
'        Node *next = head->next;\n' +
'        free(head);\n' +
'        return next;\n' +
'    }\n' +
'    Node *cur = head;\n' +
'    while (cur->next && cur->next->data != value)\n' +
'        cur = cur->next;\n' +
'    if (cur->next) {\n' +
'        Node *to_del = cur->next;\n' +
'        cur->next = to_del->next;\n' +
'        free(to_del);\n' +
'    }\n' +
'    return head;\n' +
'}\n\n' +
'/* Reverse in-place — O(n) */\n' +
'Node *reverse(Node *head) {\n' +
'    Node *prev = NULL, *curr = head, *next = NULL;\n' +
'    while (curr) {\n' +
'        next = curr->next;\n' +
'        curr->next = prev;\n' +
'        prev = curr;\n' +
'        curr = next;\n' +
'    }\n' +
'    return prev;\n' +
'}\n\n' +
'void print_list(const Node *head) {\n' +
'    for (const Node *n = head; n; n = n->next)\n' +
'        printf("%d -> ", n->data);\n' +
'    printf("NULL\\n");\n' +
'}\n\n' +
'void free_list(Node *head) {\n' +
'    while (head) { Node *tmp = head->next; free(head); head = tmp; }\n' +
'}\n\n' +
'int main(void) {\n' +
'    Node *list = NULL;\n' +
'    list = push_back(list, 10);\n' +
'    list = push_back(list, 20);\n' +
'    list = push_back(list, 30);\n' +
'    list = push_front(list, 5);\n' +
'    printf("Original:  "); print_list(list);\n\n' +
'    list = delete_value(list, 20);\n' +
'    printf("Deleted 20: "); print_list(list);\n\n' +
'    list = reverse(list);\n' +
'    printf("Reversed:  "); print_list(list);\n\n' +
'    free_list(list);\n' +
'    return 0;\n' +
'}</code></pre></div></div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body"><div class="faq-grid">' +
'<div class="faq-item"><h4>Q1: What is a sentinel/dummy head node?</h4><p>A dummy head node at index -1 simplifies insert/delete code by eliminating special-case handling for empty lists and head deletions.</p></div>' +
'<div class="faq-item"><h4>Q2: How do you detect a cycle in a linked list?</h4><p>Use Floyd\'s Cycle Detection (Tortoise &amp; Hare): two pointers, slow moves 1 step, fast moves 2 steps. If they meet, a cycle exists. Time O(n), Space O(1).</p></div>' +
'<div class="faq-item"><h4>Q3: What is a doubly linked list advantage?</h4><p>Each node has both <code>next</code> and <code>prev</code> pointers, enabling O(1) backward traversal and O(1) deletion when given a pointer directly to the node.</p></div>' +
'<div class="faq-item"><h4>Q4: When is a circular linked list useful?</h4><p>In Round-Robin scheduling (OS process queues), music playlists that loop, and buffer ring implementations where the tail always connects back to the head.</p></div>' +
'<div class="faq-item"><h4>Q5: How do you find the middle of a linked list?</h4><p>Use the two-pointer technique: slow moves 1 step, fast moves 2 steps. When fast reaches the end, slow is at the middle. O(n) time, O(1) space.</p></div>' +
'</div></div>',
'46-c-standard-library-assertions-error-handling-and-stddef.html','46. Standard Library: Assertions & Error Handling',
'48-c-data-structures-stacks-and-queues-arrays-vs-linked-lists.html','48. Stacks & Queues: Arrays vs Linked Lists');

// ─────────────────────────────────────────────────────────────────────────────
makeLesson(48,
'48-c-data-structures-stacks-and-queues-arrays-vs-linked-lists.html',
'C Data Structures: Stacks & Queues — Array vs Linked List Implementations Masterclass',
'Exhaustive textbook-grade masterclass on Stacks and Queues in C (Phase 18 Part 2): Stack with array and linked list, Queue with circular array and linked list, push/pop/enqueue/dequeue, and real-world applications.',
'Phase 18','Data Structures in C',
'Stack LIFO · Array Stack vs Linked Stack · Queue FIFO · Circular Array Queue · Linked List Queue · Deque · Stack-based Expression Evaluation',
'<div class="intro-box"><p>Welcome to <strong>Phase 18 (Chapter 48): C Data Structures — Stacks &amp; Queues, Array vs Linked List Implementations Masterclass</strong>! Stacks (LIFO) and Queues (FIFO) are the two most fundamental Abstract Data Types (ADTs) in computer science. They underpin function call management, expression parsing, task scheduling, and BFS/DFS graph traversal.</p></div>' +

'<div class="section-title"><span class="num">1</span>Stack — LIFO Architecture &amp; Memory Model</div>' +
'<div class="section-body"><div class="memory-diagram">' +
'Array-Based Stack (top index tracks last element):\n\n' +
'  data[]:  [10] [20] [30] [  ] [  ]   (capacity=5)\n' +
'  index:    0    1    2    3    4\n' +
'  top = 2  ▲\n\n' +
'  push(40) → data[3]=40, top=3\n' +
'  pop()    → returns data[3]=40, top=2\n' +
'</div>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Complete Stack Implementation (Array-Based)</div>' +
'<div class="section-body"><div class="code-block"><div class="code-block-header"><span class="lang-tag">C — Generic Array Stack</span><a class="try-btn" href="/?lang=c">▶ Try in Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n' +
'#include &lt;stdbool.h&gt;\n\n' +
'#define STACK_MAX 100\n\n' +
'typedef struct {\n' +
'    int data[STACK_MAX];\n' +
'    int top;         /* Index of top element; -1 = empty */\n' +
'} Stack;\n\n' +
'void  stack_init(Stack *s)       { s->top = -1; }\n' +
'bool  stack_empty(const Stack *s){ return s->top == -1; }\n' +
'bool  stack_full(const Stack *s) { return s->top == STACK_MAX - 1; }\n\n' +
'bool  stack_push(Stack *s, int v) {\n' +
'    if (stack_full(s)) return false;\n' +
'    s->data[++s->top] = v;\n' +
'    return true;\n' +
'}\n\n' +
'bool stack_pop(Stack *s, int *out) {\n' +
'    if (stack_empty(s)) return false;\n' +
'    *out = s->data[s->top--];\n' +
'    return true;\n' +
'}\n\n' +
'int stack_peek(const Stack *s) { return s->data[s->top]; }\n\n' +
'/* Application: Check balanced brackets */\n' +
'bool is_balanced(const char *expr) {\n' +
'    Stack s; stack_init(&s);\n' +
'    for (int i = 0; expr[i]; i++) {\n' +
'        if (expr[i]==\'(\'||expr[i]==\'[\'||expr[i]==\'{\') {\n' +
'            stack_push(&s, expr[i]);\n' +
'        } else if (expr[i]==\')\'||expr[i]==\']\'||expr[i]==\'}\') {\n' +
'            if (stack_empty(&s)) return false;\n' +
'            int top; stack_pop(&s, &top);\n' +
'            if ((expr[i]==\')\' && top!=\'(\')||\n' +
'                (expr[i]==\']\' && top!=\'[\')||\n' +
'                (expr[i]==\'}\' && top!=\'{\')) return false;\n' +
'        }\n' +
'    }\n' +
'    return stack_empty(&s);\n' +
'}\n\n' +
'int main(void) {\n' +
'    printf("is_balanced(\\"[(){()}]\\") = %s\\n", is_balanced("[(){()}]") ? "YES" : "NO");\n' +
'    printf("is_balanced(\\"[(])\\")     = %s\\n", is_balanced("[(])") ? "YES" : "NO");\n' +
'    return 0;\n' +
'}</code></pre></div></div>' +

'<div class="section-title"><span class="num">3</span>Queue — FIFO with Circular Array</div>' +
'<div class="section-body"><p class="text-prose">A naive array queue wastes space as front advances. A <strong>circular array queue</strong> wraps indices using modulo arithmetic, achieving O(1) enqueue and dequeue with no wasted space:</p>' +
'<div class="concept-box"><h4>Circular Queue Index Math:</h4>' +
'<p>• <code>rear = (rear + 1) % CAPACITY</code> — Advance rear pointer (wraps around).</p>' +
'<p>• <code>front = (front + 1) % CAPACITY</code> — Advance front pointer.</p>' +
'<p>• Full condition: <code>(rear + 1) % CAPACITY == front</code></p>' +
'<p>• Empty condition: <code>front == rear</code></p>' +
'</div></div>' +

'<div class="section-title"><span class="num">4</span>Technical FAQs</div>' +
'<div class="section-body"><div class="faq-grid">' +
'<div class="faq-item"><h4>Q1: What is a Deque (Double-Ended Queue)?</h4><p>A Deque supports push/pop at BOTH front and back in O(1). Implemented with a doubly-linked list or circular array. Used for monotonic queue algorithms.</p></div>' +
'<div class="faq-item"><h4>Q2: Why use linked list stack over array stack?</h4><p>Linked list stack grows dynamically (no fixed capacity). Array stack has O(1) cache-friendly access but must pre-allocate maximum size.</p></div>' +
'<div class="faq-item"><h4>Q3: What is the function call stack?</h4><p>The CPU maintains a hardware stack (pointed to by SP register) where each function call pushes a frame containing local variables, return address, and saved registers.</p></div>' +
'<div class="faq-item"><h4>Q4: How is a Queue used in BFS graph traversal?</h4><p>Start by enqueuing the source node. Dequeue a node, process it, enqueue all unvisited neighbors. This guarantees visiting nodes in level-order (shortest-path-first).</p></div>' +
'<div class="faq-item"><h4>Q5: What is a Priority Queue?</h4><p>A Priority Queue dequeues elements by priority value, not FIFO order. Implemented with a binary heap (min-heap or max-heap). Used in Dijkstra\'s shortest path and task schedulers.</p></div>' +
'</div></div>',
'47-c-data-structures-singly-doubly-and-circular-linked-lists.html','47. Linked Lists: Singly, Doubly & Circular',
'49-c-data-structures-binary-trees-and-binary-search-trees.html','49. Binary Trees & Binary Search Trees (BST)');

// ─────────────────────────────────────────────────────────────────────────────
makeLesson(49,
'49-c-data-structures-binary-trees-and-binary-search-trees.html',
'C Data Structures: Binary Trees & Binary Search Trees (BST) Masterclass',
'Exhaustive textbook-grade masterclass on Binary Trees in C (Phase 18 Part 3): BST insert/search/delete, in-order/pre-order/post-order traversals, tree height, level-order BFS, and AVL tree introduction.',
'Phase 18','Data Structures in C',
'Binary Tree Nodes · BST Insert & Search · In-order / Pre-order / Post-order Traversal · Tree Height · Level-Order BFS · BST Delete · AVL Balance Factor',
'<div class="intro-box"><p>Welcome to <strong>Phase 18 (Chapter 49): C Data Structures — Binary Trees &amp; Binary Search Trees (BST) Masterclass</strong>! A Binary Search Tree enforces the <em>BST invariant</em>: for every node, all left subtree values are smaller and all right subtree values are larger. This enables O(log n) search, insert, and delete in balanced trees.</p></div>' +

'<div class="section-title"><span class="num">1</span>BST Property &amp; Node Structure</div>' +
'<div class="section-body"><div class="memory-diagram">' +
'BST Invariant Visualization:\n\n' +
'           [50]\n' +
'          /    \\\n' +
'       [30]    [70]\n' +
'       /  \\    /  \\\n' +
'     [20] [40][60] [80]\n\n' +
'  Left subtree of any node < node value < Right subtree\n' +
'  In-order traversal yields: 20, 30, 40, 50, 60, 70, 80 (sorted!)\n' +
'</div>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Complete BST Implementation</div>' +
'<div class="section-body"><div class="code-block"><div class="code-block-header"><span class="lang-tag">C — Full Binary Search Tree (Insert, Search, Traversals)</span><a class="try-btn" href="/?lang=c">▶ Try in Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n\n' +
'typedef struct TreeNode {\n' +
'    int data;\n' +
'    struct TreeNode *left, *right;\n' +
'} TreeNode;\n\n' +
'static TreeNode *new_node(int val) {\n' +
'    TreeNode *n = malloc(sizeof(TreeNode));\n' +
'    if (!n) { perror("malloc"); exit(1); }\n' +
'    n->data = val; n->left = n->right = NULL;\n' +
'    return n;\n' +
'}\n\n' +
'TreeNode *bst_insert(TreeNode *root, int val) {\n' +
'    if (!root) return new_node(val);\n' +
'    if (val &lt; root->data)       root->left  = bst_insert(root->left,  val);\n' +
'    else if (val &gt; root->data)  root->right = bst_insert(root->right, val);\n' +
'    /* val == root->data: ignore duplicates */\n' +
'    return root;\n' +
'}\n\n' +
'int bst_search(const TreeNode *root, int val) {\n' +
'    if (!root) return 0;\n' +
'    if (val == root->data) return 1;\n' +
'    return (val &lt; root->data)\n' +
'         ? bst_search(root->left, val)\n' +
'         : bst_search(root->right, val);\n' +
'}\n\n' +
'void inorder(const TreeNode *root) {\n' +
'    if (!root) return;\n' +
'    inorder(root->left);\n' +
'    printf("%d ", root->data);\n' +
'    inorder(root->right);\n' +
'}\n\n' +
'int height(const TreeNode *root) {\n' +
'    if (!root) return 0;\n' +
'    int l = height(root->left), r = height(root->right);\n' +
'    return 1 + (l &gt; r ? l : r);\n' +
'}\n\n' +
'void free_tree(TreeNode *root) {\n' +
'    if (!root) return;\n' +
'    free_tree(root->left);\n' +
'    free_tree(root->right);\n' +
'    free(root);\n' +
'}\n\n' +
'int main(void) {\n' +
'    TreeNode *root = NULL;\n' +
'    int values[] = {50, 30, 70, 20, 40, 60, 80};\n' +
'    for (int i = 0; i &lt; 7; i++) root = bst_insert(root, values[i]);\n\n' +
'    printf("In-order (sorted): "); inorder(root); printf("\\n");\n' +
'    printf("Tree height: %d\\n", height(root));\n' +
'    printf("Search 40: %s\\n", bst_search(root, 40) ? "Found" : "Not Found");\n' +
'    printf("Search 99: %s\\n", bst_search(root, 99) ? "Found" : "Not Found");\n\n' +
'    free_tree(root);\n' +
'    return 0;\n' +
'}</code></pre></div></div>' +

'<div class="section-title"><span class="num">3</span>BST Traversal Orders &amp; Use Cases</div>' +
'<div class="section-body"><table class="tbl spec-table"><thead><tr><th>Traversal</th><th>Order</th><th>Primary Use Case</th></tr></thead><tbody>' +
'<tr><td>In-order (LNR)</td><td>Left → Node → Right</td><td>Sorted output from BST. Database range queries.</td></tr>' +
'<tr><td>Pre-order (NLR)</td><td>Node → Left → Right</td><td>Serialize / copy a tree. Expression tree evaluation.</td></tr>' +
'<tr><td>Post-order (LRN)</td><td>Left → Right → Node</td><td>Safe tree deletion (children freed before parents). Evaluate postfix expressions.</td></tr>' +
'<tr><td>Level-order (BFS)</td><td>Level by level, left-right</td><td>Shortest path. Print tree levels. Build min-heap.</td></tr>' +
'</tbody></table></div>' +

'<div class="section-title"><span class="num">4</span>Technical FAQs</div>' +
'<div class="section-body"><div class="faq-grid">' +
'<div class="faq-item"><h4>Q1: Why can BST become O(n) for search?</h4><p>When inserting sorted data (1, 2, 3, 4, 5...) into a naive BST, the tree degenerates to a right-only linked list with O(n) search. Self-balancing trees (AVL, Red-Black) prevent this.</p></div>' +
'<div class="faq-item"><h4>Q2: What is the BST delete algorithm?</h4><p>Three cases: (1) Leaf — simply free. (2) One child — replace node with child. (3) Two children — find in-order successor (smallest in right subtree), copy its value, delete the successor.</p></div>' +
'<div class="faq-item"><h4>Q3: What is an AVL tree?</h4><p>An AVL tree is a self-balancing BST where the height difference between left and right subtrees of every node (balance factor) never exceeds 1. Rotations (left, right, left-right, right-left) restore balance after insert/delete.</p></div>' +
'<div class="faq-item"><h4>Q4: How do you implement level-order traversal?</h4><p>Use a Queue. Enqueue root. Loop: dequeue node, print it, enqueue its non-null children. This processes nodes level by level, left to right.</p></div>' +
'<div class="faq-item"><h4>Q5: What is the difference between a Binary Tree and a BST?</h4><p>A Binary Tree is any tree where each node has at most 2 children. A BST is a Binary Tree that additionally enforces the ordering invariant (left &lt; node &lt; right) at every node.</p></div>' +
'</div></div>',
'48-c-data-structures-stacks-and-queues-arrays-vs-linked-lists.html','48. Stacks & Queues: Arrays vs Linked Lists',
'50-c-data-structures-graph-representations-and-traversals.html','50. Graph Representations & BFS/DFS Traversals');

// ─────────────────────────────────────────────────────────────────────────────
makeLesson(50,
'50-c-data-structures-graph-representations-and-traversals.html',
'C Data Structures: Graph Representations, BFS & DFS Traversals Masterclass',
'Exhaustive textbook-grade masterclass on Graphs in C (Phase 18 Part 4): Adjacency matrix, adjacency list, BFS (queue-based), DFS (recursive/iterative), cycle detection, connected components.',
'Phase 18','Data Structures in C',
'Graph Terminology · Adjacency Matrix · Adjacency List (Dynamic) · BFS with Queue · DFS Recursive & Iterative · Visited Array · Cycle Detection · Connected Components',
'<div class="intro-box"><p>Welcome to <strong>Phase 18 (Chapter 50): C Data Structures — Graph Representations, BFS &amp; DFS Traversals Masterclass</strong>! Graphs model relationships between entities: social networks, road maps, dependency trees, and state machines. In C, graphs are typically represented as adjacency matrices or adjacency lists implemented with arrays of linked lists.</p></div>' +

'<div class="section-title"><span class="num">1</span>Graph Terminology</div>' +
'<div class="section-body"><table class="tbl spec-table"><thead><tr><th>Term</th><th>Definition</th></tr></thead><tbody>' +
'<tr><td>Vertex (Node)</td><td>A point in the graph (city, user, state).</td></tr>' +
'<tr><td>Edge</td><td>A connection between two vertices (road, friendship, transition).</td></tr>' +
'<tr><td>Directed Graph</td><td>Edges have direction: A→B does not imply B→A.</td></tr>' +
'<tr><td>Undirected Graph</td><td>Edges are bidirectional: A—B implies both A→B and B→A.</td></tr>' +
'<tr><td>Weighted Graph</td><td>Each edge has a numeric weight (distance, cost, bandwidth).</td></tr>' +
'<tr><td>Degree</td><td>Number of edges incident to a vertex.</td></tr>' +
'</tbody></table></div>' +

'<div class="section-title"><span class="num">2</span>Adjacency List Graph with BFS &amp; DFS</div>' +
'<div class="section-body"><div class="code-block"><div class="code-block-header"><span class="lang-tag">C — Adjacency List Graph, BFS and DFS</span><a class="try-btn" href="/?lang=c">▶ Try in Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n' +
'#include &lt;string.h&gt;\n\n' +
'#define MAX_V 10\n\n' +
'typedef struct EdgeNode {\n' +
'    int to;\n' +
'    struct EdgeNode *next;\n' +
'} EdgeNode;\n\n' +
'typedef struct {\n' +
'    EdgeNode *adj[MAX_V];\n' +
'    int V;\n' +
'} Graph;\n\n' +
'Graph *graph_create(int V) {\n' +
'    Graph *g = calloc(1, sizeof(Graph));\n' +
'    g->V = V;\n' +
'    return g;\n' +
'}\n\n' +
'void graph_add_edge(Graph *g, int u, int v) {\n' +
'    EdgeNode *e = malloc(sizeof(EdgeNode));\n' +
'    e->to = v; e->next = g->adj[u]; g->adj[u] = e;\n' +
'    /* Undirected: add reverse edge too */\n' +
'    EdgeNode *e2 = malloc(sizeof(EdgeNode));\n' +
'    e2->to = u; e2->next = g->adj[v]; g->adj[v] = e2;\n' +
'}\n\n' +
'void bfs(const Graph *g, int start) {\n' +
'    int visited[MAX_V] = {0};\n' +
'    int queue[MAX_V], front = 0, rear = 0;\n' +
'    visited[start] = 1;\n' +
'    queue[rear++] = start;\n' +
'    printf("BFS from %d: ", start);\n' +
'    while (front &lt; rear) {\n' +
'        int u = queue[front++];\n' +
'        printf("%d ", u);\n' +
'        for (EdgeNode *e = g->adj[u]; e; e = e->next) {\n' +
'            if (!visited[e->to]) {\n' +
'                visited[e->to] = 1;\n' +
'                queue[rear++] = e->to;\n' +
'            }\n' +
'        }\n' +
'    }\n' +
'    printf("\\n");\n' +
'}\n\n' +
'static int dfs_visited[MAX_V];\n' +
'void dfs(const Graph *g, int u) {\n' +
'    dfs_visited[u] = 1;\n' +
'    printf("%d ", u);\n' +
'    for (EdgeNode *e = g->adj[u]; e; e = e->next)\n' +
'        if (!dfs_visited[e->to]) dfs(g, e->to);\n' +
'}\n\n' +
'int main(void) {\n' +
'    Graph *g = graph_create(6);\n' +
'    graph_add_edge(g, 0, 1);\n' +
'    graph_add_edge(g, 0, 2);\n' +
'    graph_add_edge(g, 1, 3);\n' +
'    graph_add_edge(g, 2, 4);\n' +
'    graph_add_edge(g, 3, 5);\n\n' +
'    bfs(g, 0);\n\n' +
'    memset(dfs_visited, 0, sizeof(dfs_visited));\n' +
'    printf("DFS from 0: ");\n' +
'    dfs(g, 0);\n' +
'    printf("\\n");\n' +
'    return 0;\n' +
'}</code></pre></div></div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body"><div class="faq-grid">' +
'<div class="faq-item"><h4>Q1: When to use adjacency matrix vs adjacency list?</h4><p>Matrix: O(1) edge lookup, O(V²) space — good for dense graphs. List: O(V+E) space — good for sparse graphs where V >> E.</p></div>' +
'<div class="faq-item"><h4>Q2: What does BFS guarantee that DFS does not?</h4><p>BFS guarantees finding the shortest path (fewest edges) between source and any reachable node in an unweighted graph. DFS does not guarantee shortest path.</p></div>' +
'<div class="faq-item"><h4>Q3: How do you detect cycles in a directed graph?</h4><p>Use DFS with a "currently in recursion stack" boolean array. If DFS revisits a node currently in the stack, a cycle exists.</p></div>' +
'<div class="faq-item"><h4>Q4: What is topological sort?</h4><p>A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every edge u→v, u appears before v. Used for build systems, task scheduling, and dependency resolution.</p></div>' +
'<div class="faq-item"><h4>Q5: What are connected components?</h4><p>Groups of vertices where every vertex can reach every other vertex in the group. Found by running BFS/DFS from each unvisited vertex, counting how many times a new search starts.</p></div>' +
'</div></div>',
'49-c-data-structures-binary-trees-and-binary-search-trees.html','49. Binary Trees & Binary Search Trees (BST)',
'51-c-data-structures-hash-tables-and-collision-resolution.html','51. Hash Tables & Collision Resolution');

// ─────────────────────────────────────────────────────────────────────────────
makeLesson(51,
'51-c-data-structures-hash-tables-and-collision-resolution.html',
'C Data Structures: Hash Tables & Collision Resolution Masterclass',
'Exhaustive textbook-grade masterclass on Hash Tables in C (Phase 18 Part 5): Hash functions, separate chaining with linked lists, open addressing (linear probing), load factor, rehashing, and string hash maps.',
'Phase 18','Data Structures in C',
'Hash Functions · djb2 String Hash · Separate Chaining (Linked Lists) · Open Addressing Linear Probing · Load Factor & Rehashing · String → Value HashMap · O(1) Average Lookup',
'<div class="intro-box"><p>Welcome to <strong>Phase 18 (Chapter 51): C Data Structures — Hash Tables &amp; Collision Resolution Masterclass</strong>! A Hash Table achieves O(1) average-case insert, lookup, and delete by computing a bucket index from a key using a <em>hash function</em>. This makes it the most powerful data structure for symbol tables, caches, dictionaries, and database indices.</p></div>' +

'<div class="section-title"><span class="num">1</span>Hash Function Design &amp; djb2 Algorithm</div>' +
'<div class="section-body"><p class="text-prose">A hash function maps an arbitrary key (string, integer, etc.) to a bucket index in the array. A good hash function distributes keys uniformly with minimal collisions.</p>' +
'<div class="concept-box"><h4>djb2 — Dan Bernstein\'s Fast String Hash:</h4>' +
'<p><code>hash = 5381;</code></p>' +
'<p><code>for each char c: hash = ((hash &lt;&lt; 5) + hash) + c; // hash * 33 + c</code></p>' +
'<p>Simple, fast, excellent distribution for ASCII strings. Used by many real implementations.</p>' +
'</div></div>' +

'<div class="section-title"><span class="num">2</span>Complete Hash Map with Separate Chaining</div>' +
'<div class="section-body"><div class="code-block"><div class="code-block-header"><span class="lang-tag">C — String HashMap with Separate Chaining</span><a class="try-btn" href="/?lang=c">▶ Try in Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n' +
'#include &lt;string.h&gt;\n\n' +
'#define TABLE_SIZE 64\n\n' +
'typedef struct KVNode {\n' +
'    char *key;\n' +
'    int   value;\n' +
'    struct KVNode *next;\n' +
'} KVNode;\n\n' +
'typedef struct { KVNode *buckets[TABLE_SIZE]; } HashMap;\n\n' +
'static unsigned long djb2(const char *s) {\n' +
'    unsigned long h = 5381;\n' +
'    while (*s) h = ((h &lt;&lt; 5) + h) + (unsigned char)*s++;\n' +
'    return h % TABLE_SIZE;\n' +
'}\n\n' +
'void hmap_set(HashMap *m, const char *key, int value) {\n' +
'    unsigned long idx = djb2(key);\n' +
'    for (KVNode *n = m->buckets[idx]; n; n = n->next) {\n' +
'        if (strcmp(n->key, key) == 0) { n->value = value; return; }\n' +
'    }\n' +
'    KVNode *n = malloc(sizeof(KVNode));\n' +
'    n->key = strdup(key); n->value = value;\n' +
'    n->next = m->buckets[idx];\n' +
'    m->buckets[idx] = n;\n' +
'}\n\n' +
'int hmap_get(const HashMap *m, const char *key, int *out) {\n' +
'    unsigned long idx = djb2(key);\n' +
'    for (KVNode *n = m->buckets[idx]; n; n = n->next)\n' +
'        if (strcmp(n->key, key) == 0) { *out = n->value; return 1; }\n' +
'    return 0;\n' +
'}\n\n' +
'int main(void) {\n' +
'    HashMap m = {0};\n' +
'    hmap_set(&m, "ravi",   90);\n' +
'    hmap_set(&m, "anitha", 95);\n' +
'    hmap_set(&m, "kiran",  78);\n\n' +
'    const char *names[] = {"ravi", "anitha", "kiran", "priya"};\n' +
'    for (int i = 0; i &lt; 4; i++) {\n' +
'        int score;\n' +
'        if (hmap_get(&m, names[i], &score))\n' +
'            printf("%-8s → %d\\n", names[i], score);\n' +
'        else\n' +
'            printf("%-8s → NOT FOUND\\n", names[i]);\n' +
'    }\n' +
'    return 0;\n' +
'}</code></pre></div></div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body"><div class="faq-grid">' +
'<div class="faq-item"><h4>Q1: What is a hash collision?</h4><p>A collision occurs when two different keys produce the same bucket index. Separate chaining handles this by storing a linked list at each bucket. Open addressing probes for an alternative empty slot.</p></div>' +
'<div class="faq-item"><h4>Q2: What is the load factor and why does it matter?</h4><p>Load factor = (number of entries) / (number of buckets). Above ~0.75 load factor, collision chains grow and performance degrades from O(1) toward O(n). Rehash by doubling bucket count.</p></div>' +
'<div class="faq-item"><h4>Q3: What is linear probing?</h4><p>Open addressing strategy: on collision, try bucket index+1, +2, +3... (wrapping around). Simpler than chaining but suffers from primary clustering — long runs of filled buckets.</p></div>' +
'<div class="faq-item"><h4>Q4: Why is hash table lookup O(1) average but O(n) worst case?</h4><p>Worst case occurs when all keys hash to the same bucket, creating a single chain of length n. In practice, good hash functions and low load factors make O(1) the expected case.</p></div>' +
'<div class="faq-item"><h4>Q5: What makes a hash function cryptographically secure?</h4><p>Cryptographic hash functions (SHA-256, Blake3) are additionally collision-resistant (hard to find two inputs with same hash), one-way (cannot reverse), and avalanche-sensitive. NOT needed for data structure use-cases.</p></div>' +
'</div></div>',
'50-c-data-structures-graph-representations-and-traversals.html','50. Graph Representations & BFS/DFS Traversals',
'52-c-algorithms-big-o-complexity-searching-and-sorting.html','52. Big-O Complexity, Searching & Sorting');

console.log('\n🎉 ALL DONE: Lessons 42-51 (Phase 16, 17, 18) written successfully!');
