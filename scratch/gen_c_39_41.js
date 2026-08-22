const fs = require('fs');
const path = require('path');
const { wrapCPage } = require('./build_massive_textbook_chapters_36_65.js');

const cDir = path.join(__dirname, '..', 'public', 'blog-c');
console.log('🚀 Building Lessons 39-41 (Phase 15: Preprocessor & Header Files)...');

// ── LESSON 39 ────────────────────────────────────────────────────────────────
const l39content = '<div class="intro-box"><p>Welcome to <strong>Phase 15 (Chapter 39): C Preprocessor Directives &amp; Macro Pitfalls Masterclass</strong>! The C Preprocessor (CPP) is a text-transformation engine that runs <em>before</em> the C compiler ever sees your source file. Every line starting with <code>#</code> is a preprocessor directive. In this guide you master how CPP transforms source code, how to write safe macros, and how to avoid notorious pitfalls.</p></div>' +

'<div class="section-title"><span class="num">1</span>How the C Build Pipeline Works</div>' +
'<div class="section-body">' +
'<div class="memory-diagram">' +
'Full C Compilation Pipeline:\n\n' +
'  hello.c\n' +
'     │\n' +
'     ▼  STEP 1 ─ C Preprocessor (cpp)\n' +
'  hello.i  (Pure C text — macros expanded, #include pasted, comments stripped)\n' +
'     │\n' +
'     ▼  STEP 2 ─ C Compiler (cc1)\n' +
'  hello.s  (Assembly Language output)\n' +
'     │\n' +
'     ▼  STEP 3 ─ Assembler (as)\n' +
'  hello.o  (ELF / COFF Binary Object file)\n' +
'     │\n' +
'     ▼  STEP 4 ─ Linker (ld)\n' +
'  hello.exe / a.out  (Final Executable)\n' +
'</div>' +
'<p class="text-prose">Run <code>gcc -E hello.c -o hello.i</code> to see the preprocessed output directly. You will see thousands of lines from expanded system headers!</p>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Object-Like Macros with #define</div>' +
'<div class="section-body">' +
'<p class="text-prose">Object-like macros define symbolic constants that CPP textually replaces before compilation. They are NOT variables — they have NO type and NO memory address.</p>' +
'<div class="concept-box"><h4>Macro vs const Variable:</h4>' +
'<p>• <code>#define MAX_SIZE 100</code> — Pure text substitution. No memory. No type safety. Cannot take address.</p>' +
'<p>• <code>const int MAX_SIZE = 100;</code> — Typed, memory allocated on stack. Can be debugged. Preferred in C99+.</p>' +
'</div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Function-Like Macros &amp; the 4 Classic Macro Pitfalls</div>' +
'<div class="section-body">' +
'<p class="text-prose">Function-like macros accept arguments and perform textual substitution:</p>' +
'<div class="concept-box"><h4>⚠️ 4 Classic Macro Pitfalls:</h4>' +
'<p>1. <strong>Missing parentheses:</strong> <code>#define SQ(x) x*x</code> → <code>SQ(2+3)</code> expands to <code>2+3*2+3 = 11</code> instead of 25!</p>' +
'<p>2. <strong>Side-effect arguments:</strong> <code>#define MAX(a,b) ((a)&gt;(b)?(a):(b))</code> with <code>MAX(i++, j)</code> increments <code>i</code> TWICE!</p>' +
'<p>3. <strong>Multi-statement macro without do-while block</strong> causes if-else attachment bugs.</p>' +
'<p>4. <strong>No type checking</strong> — Macros bypass C type system entirely.</p>' +
'</div>' +
'</div>' +

'<div class="section-title"><span class="num">4</span>Complete Code Demonstration</div>' +
'<div class="section-body"><div class="code-block"><div class="code-block-header"><span class="lang-tag">C — Macro Pitfalls vs Safe Alternatives</span><a class="try-btn" href="/?lang=c">▶ Try in Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n\n' +
'/* UNSAFE — Missing argument parentheses */\n' +
'#define SQ_BAD(x)  x * x\n\n' +
'/* SAFE — Full parentheses wrap */\n' +
'#define SQ_GOOD(x) ((x) * (x))\n\n' +
'/* SAFE multi-statement macro using do-while(0) idiom */\n' +
'#define SWAP(a, b, type) do { \\\n' +
'    type _tmp = (a);          \\\n' +
'    (a) = (b);                \\\n' +
'    (b) = _tmp;               \\\n' +
'} while (0)\n\n' +
'/* Preferred: inline function — has type safety + debugging */\n' +
'static inline int sq_inline(int x) { return x * x; }\n\n' +
'int main(void) {\n' +
'    printf("SQ_BAD(2+3)  = %d  (BUG: expected 25)\\n", SQ_BAD(2+3));\n' +
'    printf("SQ_GOOD(2+3) = %d  (OK: 25)\\n",           SQ_GOOD(2+3));\n' +
'    printf("sq_inline(5) = %d  (OK: 25)\\n",            sq_inline(5));\n\n' +
'    int x = 10, y = 20;\n' +
'    SWAP(x, y, int);\n' +
'    printf("After SWAP: x=%d, y=%d\\n", x, y); // x=20, y=10\n' +
'    return 0;\n' +
'}</code></pre></div></div>' +

'<div class="section-title"><span class="num">5</span>Predefined Standard Macros</div>' +
'<div class="section-body"><table class="tbl spec-table"><thead><tr><th>Macro</th><th>Type</th><th>Expands To</th></tr></thead><tbody>' +
'<tr><td><code>__FILE__</code></td><td>String literal</td><td>Source filename at compile time</td></tr>' +
'<tr><td><code>__LINE__</code></td><td>Integer</td><td>Current line number in source file</td></tr>' +
'<tr><td><code>__DATE__</code></td><td>String literal</td><td>Compilation date (e.g. "Aug 18 2026")</td></tr>' +
'<tr><td><code>__TIME__</code></td><td>String literal</td><td>Compilation time (e.g. "12:34:56")</td></tr>' +
'<tr><td><code>__STDC_VERSION__</code></td><td>Long integer</td><td>C standard version (201710L = C17)</td></tr>' +
'</tbody></table></div>' +

'<div class="section-title"><span class="num">6</span>Technical FAQs</div>' +
'<div class="section-body"><div class="faq-grid">' +
'<div class="faq-item"><h4>Q1: When should I prefer inline functions over macros?</h4><p>Always prefer <code>static inline</code> functions in C99+. They provide type safety, debugger visibility, and single-evaluation semantics that macros cannot guarantee.</p></div>' +
'<div class="faq-item"><h4>Q2: Can macros call other macros?</h4><p>Yes. Macro expansion is recursive — CPP will keep expanding until no more macro names remain in the text.</p></div>' +
'<div class="faq-item"><h4>Q3: How do I view the fully preprocessed output of a file?</h4><p>Run <code>gcc -E source.c -o source.i</code>. The <code>.i</code> file contains all #include expansions and macro substitutions resolved.</p></div>' +
'<div class="faq-item"><h4>Q4: What is the do-while(0) macro idiom?</h4><p>Wrapping multi-statement macros in <code>do { ... } while(0)</code> makes the macro behave as a single statement expression so it works correctly in if-else branches.</p></div>' +
'<div class="faq-item"><h4>Q5: How do I undefine a previously defined macro?</h4><p>Use <code>#undef MACRO_NAME</code>. This removes the macro definition from the preprocessor symbol table for all subsequent lines.</p></div>' +
'</div></div>';

// ── LESSON 40 ────────────────────────────────────────────────────────────────
const l40content = '<div class="intro-box"><p>Welcome to <strong>Phase 15 (Chapter 40): Conditional Compilation &amp; Include Guards Masterclass</strong>! Conditional compilation lets you include or exclude entire blocks of C code based on preprocessor conditions. This is essential for cross-platform code, debug builds, feature flags, and preventing recursive header inclusion.</p></div>' +

'<div class="section-title"><span class="num">1</span>Conditional Compilation Directives</div>' +
'<div class="section-body">' +
'<table class="tbl spec-table"><thead><tr><th>Directive</th><th>Meaning</th></tr></thead><tbody>' +
'<tr><td><code>#if EXPR</code></td><td>Include block if constant expression evaluates to non-zero.</td></tr>' +
'<tr><td><code>#ifdef NAME</code></td><td>Include block if macro NAME is defined.</td></tr>' +
'<tr><td><code>#ifndef NAME</code></td><td>Include block if macro NAME is NOT defined.</td></tr>' +
'<tr><td><code>#elif EXPR</code></td><td>Else-if branch for conditional compilation.</td></tr>' +
'<tr><td><code>#else</code></td><td>Fallback block if no prior condition matched.</td></tr>' +
'<tr><td><code>#endif</code></td><td>Closes any <code>#if</code> / <code>#ifdef</code> / <code>#ifndef</code> block.</td></tr>' +
'</tbody></table>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Include Guards — Preventing Double-Inclusion</div>' +
'<div class="section-body">' +
'<p class="text-prose">When multiple source files include the same header, the C preprocessor will paste its contents multiple times — causing duplicate type definitions that fail to compile. <strong>Include guards</strong> prevent this:</p>' +
'<div class="concept-box"><h4>Classic #ifndef Include Guard Pattern:</h4>' +
'<p>Every production header file MUST wrap its contents with:</p>' +
'<p><code>#ifndef MY_HEADER_H</code> — Check if not already defined.</p>' +
'<p><code>#define MY_HEADER_H</code> — Mark as defined on first inclusion.</p>' +
'<p><code>... Header content ...</code></p>' +
'<p><code>#endif /* MY_HEADER_H */</code> — Close guard block.</p>' +
'</div>' +
'<p class="text-prose">Modern alternative: <code>#pragma once</code> — Supported by all major compilers (GCC, Clang, MSVC). Simpler but technically non-standard (C standard does not mandate it).</p>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Complete Code Demonstration</div>' +
'<div class="section-body"><div class="code-block"><div class="code-block-header"><span class="lang-tag">C — Cross-Platform Debug Build System</span><a class="try-btn" href="/?lang=c">▶ Try in Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n\n' +
'/* Define DEBUG to enable verbose logging */\n' +
'#define DEBUG 1\n\n' +
'#if DEBUG\n' +
'  #define LOG(msg) printf("[DEBUG] %s (File:%s Line:%d)\\n", (msg), __FILE__, __LINE__)\n' +
'#else\n' +
'  #define LOG(msg)  /* Empty: stripped in Release build */\n' +
'#endif\n\n' +
'/* Platform detection */\n' +
'#if defined(_WIN32)\n' +
'  #define PLATFORM_NAME "Windows"\n' +
'#elif defined(__linux__)\n' +
'  #define PLATFORM_NAME "Linux"\n' +
'#elif defined(__APPLE__)\n' +
'  #define PLATFORM_NAME "macOS"\n' +
'#else\n' +
'  #define PLATFORM_NAME "Unknown Platform"\n' +
'#endif\n\n' +
'int main(void) {\n' +
'    LOG("Program started");\n' +
'    printf("Running on: %s\\n", PLATFORM_NAME);\n\n' +
'    int result = 42;\n' +
'    LOG("Computation complete");\n' +
'    printf("Result: %d\\n", result);\n\n' +
'    return 0;\n' +
'}</code></pre></div></div>' +

'<div class="section-title"><span class="num">4</span>Technical FAQs</div>' +
'<div class="section-body"><div class="faq-grid">' +
'<div class="faq-item"><h4>Q1: What is the difference between #ifdef and #if defined()?</h4><p><code>#if defined(X)</code> can be combined with logical operators: <code>#if defined(A) && !defined(B)</code>. <code>#ifdef</code> only tests a single macro name.</p></div>' +
'<div class="faq-item"><h4>Q2: Should I use include guards or #pragma once?</h4><p>Use <code>#pragma once</code> for new projects on GCC/Clang/MSVC. Use traditional include guards for maximum portability to embedded or exotic toolchains.</p></div>' +
'<div class="faq-item"><h4>Q3: Can conditional compilation check numeric values?</h4><p>Yes. <code>#if VERSION &gt;= 2</code> works if <code>VERSION</code> is a macro defined as an integer constant.</p></div>' +
'<div class="faq-item"><h4>Q4: How do I pass macro definitions from the compiler command line?</h4><p>Use the <code>-D</code> flag: <code>gcc -DDEBUG=1 -o app app.c</code>. This defines the <code>DEBUG</code> macro as 1 without modifying source files.</p></div>' +
'<div class="faq-item"><h4>Q5: Can preprocessor conditionals be nested?</h4><p>Yes, <code>#if</code> / <code>#ifdef</code> blocks can be nested as deeply as needed. Every nested block requires its own matching <code>#endif</code>.</p></div>' +
'</div></div>';

// ── LESSON 41 ────────────────────────────────────────────────────────────────
const l41content = '<div class="intro-box"><p>Welcome to <strong>Phase 15 (Chapter 41): C Modular Architecture, Headers, Linkage &amp; Compilation Units Masterclass</strong>! Real-world C programs are never written in a single file. In this guide you learn how to split C projects across multiple <code>.c</code> source files and <code>.h</code> header files, understand symbol linkage, and manage the compilation pipeline professionally.</p></div>' +

'<div class="section-title"><span class="num">1</span>What is a Translation Unit?</div>' +
'<div class="section-body">' +
'<p class="text-prose">A <strong>Translation Unit (TU)</strong> is one <code>.c</code> source file PLUS all the header files it recursively includes via <code>#include</code>. Each <code>.c</code> file is independently preprocessed and compiled into one <code>.o</code> object file. The linker then combines all object files into the final executable.</p>' +
'<div class="memory-diagram">' +
'Multi-File C Project Build Process:\n\n' +
'  math_utils.c  ──compile──►  math_utils.o  ─┐\n' +
'  io_helpers.c  ──compile──►  io_helpers.o   ├── linker (ld) ──► program.exe\n' +
'  main.c        ──compile──►  main.o         ─┘\n\n' +
'  (Each .c file is compiled independently — they cannot see each other\'s internals!)\n' +
'</div>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Linkage: extern vs static</div>' +
'<div class="section-body">' +
'<table class="tbl spec-table"><thead><tr><th>Qualifier</th><th>Scope</th><th>Meaning</th></tr></thead><tbody>' +
'<tr><td><code>extern</code></td><td>Global (External Linkage)</td><td>Symbol is visible across ALL translation units. Declared in header, defined ONCE in one .c file.</td></tr>' +
'<tr><td><code>static</code> (file scope)</td><td>Local (Internal Linkage)</td><td>Symbol is invisible outside its own .c file. Use for helper functions you want to hide.</td></tr>' +
'<tr><td>(no qualifier)</td><td>Global (External Linkage)</td><td>Same as extern — visible to linker from all TUs.</td></tr>' +
'</tbody></table>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Header File Best Practices</div>' +
'<div class="section-body">' +
'<div class="concept-box"><h4>What belongs in a .h header file:</h4>' +
'<p>✅ Function declarations (prototypes): <code>int add(int a, int b);</code></p>' +
'<p>✅ Type definitions (typedef, struct, enum declarations)</p>' +
'<p>✅ Macro and constant definitions (<code>#define PI 3.14159</code>)</p>' +
'<p>✅ extern variable declarations: <code>extern int global_counter;</code></p>' +
'<p>❌ Function <em>definitions</em> (actual body code) — causes duplicate symbol linker errors!</p>' +
'<p>❌ Unguarded global variable <em>definitions</em> — causes ODR (One Definition Rule) violations!</p>' +
'</div>' +
'</div>' +

'<div class="section-title"><span class="num">4</span>Complete Multi-File Architecture Demo</div>' +
'<div class="section-body"><div class="code-block"><div class="code-block-header"><span class="lang-tag">C — math_utils.h (Public Header Interface)</span><a class="try-btn" href="/?lang=c">▶ Try in Compiler</a></div>' +
'<pre><code>/* math_utils.h */\n' +
'#ifndef MATH_UTILS_H\n' +
'#define MATH_UTILS_H\n\n' +
'/* Public API declarations */\n' +
'int add(int a, int b);\n' +
'int multiply(int a, int b);\n' +
'double power(double base, int exp);\n\n' +
'#endif /* MATH_UTILS_H */\n\n\n' +
'/* math_utils.c */\n' +
'#include "math_utils.h"\n\n' +
'/* Private helper — internal linkage, invisible outside this file */\n' +
'static int validate(int x) { return x &gt;= 0 ? x : -x; }\n\n' +
'int add(int a, int b)      { return a + b; }\n' +
'int multiply(int a, int b) { return a * b; }\n' +
'double power(double base, int exp) {\n' +
'    double result = 1.0;\n' +
'    for (int i = 0; i &lt; exp; i++) result *= base;\n' +
'    return result;\n' +
'}\n\n\n' +
'/* main.c */\n' +
'#include &lt;stdio.h&gt;\n' +
'#include "math_utils.h"  /* Include INTERFACE, not implementation! */\n\n' +
'int main(void) {\n' +
'    printf("3 + 4 = %d\\n",      add(3, 4));\n' +
'    printf("3 * 4 = %d\\n",      multiply(3, 4));\n' +
'    printf("2^10 = %.0f\\n",     power(2, 10));\n' +
'    return 0;\n' +
'}\n\n' +
'/* Compile: gcc -Wall -Wextra math_utils.c main.c -o calculator */</code></pre></div></div>' +

'<div class="section-title"><span class="num">5</span>Technical FAQs</div>' +
'<div class="section-body"><div class="faq-grid">' +
'<div class="faq-item"><h4>Q1: What is a "duplicate symbol" linker error?</h4><p>It occurs when the same function or global variable is <em>defined</em> (not just declared) in more than one .c file. The linker finds two implementations and does not know which to use.</p></div>' +
'<div class="faq-item"><h4>Q2: Why use static for file-scope helper functions?</h4><p><code>static</code> functions have internal linkage — they cannot be called from other .c files, enabling compiler optimizations and preventing accidental API usage.</p></div>' +
'<div class="faq-item"><h4>Q3: What is the One Definition Rule (ODR)?</h4><p>Every function and global object must have exactly one definition across all translation units in a program. Multiple definitions cause linker errors.</p></div>' +
'<div class="faq-item"><h4>Q4: How do I share a global variable across files?</h4><p>Declare it with <code>extern int g_count;</code> in the header. Define it ONCE in one .c file: <code>int g_count = 0;</code>. Include the header everywhere else.</p></div>' +
'<div class="faq-item"><h4>Q5: What is a forward declaration?</h4><p>A forward declaration tells the compiler about a symbol\'s type and name without providing its full definition, allowing circular references to be resolved.</p></div>' +
'</div></div>';

const lessons = [
  { num: 39, file: '39-c-preprocessor-directives-and-macro-pitfalls.html',
    title: 'C Preprocessor Directives, Object-Like Macros & Function-Like Macro Pitfalls Masterclass',
    desc: 'Exhaustive textbook-grade masterclass on C Preprocessor (Phase 15 Part 1): #include, #define, object-like macros, function-like macros, 4 classic macro pitfalls, predefined macros.',
    phaseTag: 'Phase 15', phaseTitle: 'Preprocessor & Header Files',
    subtopics: 'C Build Pipeline · #define Object Macros · Function-Like Macros · 4 Macro Pitfalls · Predefined __FILE__ __LINE__ · inline functions vs macros',
    content: l39content,
    prev: '38-c-file-error-handling-feof-ferror-and-errno.html', prevTitle: '38. File Error Handling, EOF, ferror() & errno',
    next: '40-c-conditional-compilation-and-include-guards.html', nextTitle: '40. Conditional Compilation & Include Guards'
  },
  { num: 40, file: '40-c-conditional-compilation-and-include-guards.html',
    title: 'C Conditional Compilation, #ifdef, #ifndef & Include Guards Masterclass',
    desc: 'Exhaustive textbook-grade masterclass on Conditional Compilation in C (Phase 15 Part 2): #if, #ifdef, #ifndef, #elif, #else, #endif, include guards and #pragma once.',
    phaseTag: 'Phase 15', phaseTitle: 'Preprocessor & Header Files',
    subtopics: '#if / #elif / #else / #endif · #ifdef / #ifndef · Include Guards · #pragma once · -DDEBUG Flag · Platform Detection Macros',
    content: l40content,
    prev: '39-c-preprocessor-directives-and-macro-pitfalls.html', prevTitle: '39. Preprocessor Directives & Macro Pitfalls',
    next: '41-c-modular-architecture-headers-linkage-and-compilation-units.html', nextTitle: '41. Modular Architecture, Headers & Linkage'
  },
  { num: 41, file: '41-c-modular-architecture-headers-linkage-and-compilation-units.html',
    title: 'C Modular Architecture, Header Files, Linkage & Multi-File Compilation Masterclass',
    desc: 'Exhaustive textbook-grade masterclass on Modular C Architecture (Phase 15 Part 3): Translation units, extern vs static linkage, .h header interface design, multi-file compilation with GCC.',
    phaseTag: 'Phase 15', phaseTitle: 'Preprocessor & Header Files',
    subtopics: 'Translation Units · extern vs static Linkage · Header Interface Design · One Definition Rule · Multi-File GCC Compilation · Static Helper Functions',
    content: l41content,
    prev: '40-c-conditional-compilation-and-include-guards.html', prevTitle: '40. Conditional Compilation & Include Guards',
    next: '42-c-command-line-arguments-argc-argv-and-parsing.html', nextTitle: '42. Command-Line Arguments (argc, argv & Parsing)'
  }
];

lessons.forEach(l => {
  fs.writeFileSync(path.join(cDir, l.file),
    wrapCPage(l.title, l.desc, l.file, l.num, l.phaseTag, l.phaseTitle, l.subtopics, l.content, l.prev, l.prevTitle, l.next, l.nextTitle),
    'utf8');
  console.log('  ✅ Written: ' + l.file);
});

console.log('✅ Phase 15 DONE — Lessons 39, 40, 41!');
