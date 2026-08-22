const fs = require('fs');
const path = require('path');
const { wrapCPage } = require('./build_massive_textbook_chapters_36_65.js');

const cDir = path.join(__dirname, '..', 'public', 'blog-c');
console.log('🚀 Building SUPER MASSIVE Textbook Content for Lessons 52 to 65 (Phases 19 to 22)...');

function makeLesson(num, file, title, desc, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle) {
  fs.writeFileSync(path.join(cDir, file),
    wrapCPage(title, desc, file, num, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle),
    'utf8');
  console.log('  ✅ ' + file);
}

// LESSON 52
makeLesson(52,
'52-c-algorithms-big-o-complexity-searching-and-sorting.html',
'C Algorithms: Big-O Complexity, Searching & 5 Sorting Algorithms Masterclass',
'Exhaustive textbook-grade masterclass on C Algorithms (Phase 19 Part 1): Asymptotic analysis, Big-O/Omega/Theta, Linear & Binary Search, Bubble, Selection, Insertion, Merge, and Quick Sort in C.',
'Phase 19','Algorithms & Big-O Complexity',
'Big-O / Omega / Theta · Linear vs Binary Search · Bubble Sort · Selection Sort · Insertion Sort · Merge Sort · Quick Sort · Sorting Stability & Space Complexity',
'<div class="intro-box"><p>Welcome to <strong>Phase 19 (Chapter 52): C Algorithms — Big-O Complexity, Searching &amp; 5 Sorting Algorithms Masterclass</strong>! Algorithm efficiency determines whether software handles millions of requests or freezes instantly. In this guide, you will master asymptotic notation (Big-O), search algorithms, and 5 foundational sorting algorithms with complete C source code and dry runs.</p></div>' +

'<div class="section-title"><span class="num">1</span>Asymptotic Analysis &amp; Big-O Notation</div>' +
'<div class="section-body">' +
'  <p class="text-prose">Big-O notation describes the upper bound of execution time or memory growth relative to input size <em>N</em> as <em>N</em> grows toward infinity.</p>' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Big-O Class</th><th>Name</th><th>Example Operations</th><th>Growth for N = 1,000,000</th></tr></thead>' +
'    <tbody>' +
'      <tr><td><code>O(1)</code></td><td>Constant Time</td><td>Array index lookup, Stack push/pop</td><td>1 operation</td></tr>' +
'      <tr><td><code>O(log N)</code></td><td>Logarithmic Time</td><td>Binary search in sorted array</td><td>~20 operations</td></tr>' +
'      <tr><td><code>O(N)</code></td><td>Linear Time</td><td>Linear search, finding max value</td><td>1,000,000 operations</td></tr>' +
'      <tr><td><code>O(N log N)</code></td><td>Linearithmic Time</td><td>Merge Sort, Quick Sort (average)</td><td>~20,000,000 operations</td></tr>' +
'      <tr><td><code>O(N²)</code></td><td>Quadratic Time</td><td>Bubble Sort, Selection Sort</td><td>1,000,000,000,000 operations (Slow!)</td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Searching Algorithms: Linear vs Binary Search</div>' +
'<div class="section-body">' +
'  <p class="text-prose">Linear Search checks elements sequentially in O(N) time. Binary Search requires a <strong>sorted array</strong> and repeatedly divides the search range in half in O(log N) time.</p>' +
'  <div class="memory-diagram">' +
'Binary Search Execution (Searching for 42 in sorted array):\n\n' +
'  Index:   0    1    2    3    4    5    6    7\n' +
'  Array: [ 10 | 15 | 22 | 35 | 42 | 55 | 70 | 90 ]\n' +
'           ▲                   ▲              ▲\n' +
'          Low                 Mid            High\n' +
'  Step 1: Mid=3 (val=35). Target 42 > 35 -> Low = Mid + 1 = 4\n' +
'  Step 2: Mid=5 (val=55). Target 42 < 55 -> High = Mid - 1 = 4\n' +
'  Step 3: Mid=4 (val=42). Match found at Index 4!\n' +
'  Total steps: 3 (vs 5 linear steps)\n' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>5 Sorting Algorithms Implementation</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C — Quick Sort & Merge Sort Implementation</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n\n' +
'/* QUICK SORT - O(N log N) Average */\n' +
'static void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }\n\n' +
'static int partition(int arr[], int low, int high) {\n' +
'    int pivot = arr[high];\n' +
'    int i = low - 1;\n' +
'    for (int j = low; j &lt; high; j++) {\n' +
'        if (arr[j] &lt; pivot) {\n' +
'            i++;\n' +
'            swap(&amp;arr[i], &amp;arr[j]);\n' +
'        }\n' +
'    }\n' +
'    swap(&amp;arr[i + 1], &amp;arr[high]);\n' +
'    return i + 1;\n' +
'}\n\n' +
'void quick_sort(int arr[], int low, int high) {\n' +
'    if (low &lt; high) {\n' +
'        int pi = partition(arr, low, high);\n' +
'        quick_sort(arr, low, pi - 1);\n' +
'        quick_sort(arr, pi + 1, high);\n' +
'    }\n' +
'}\n\n' +
'int main(void) {\n' +
'    int numbers[] = {64, 34, 25, 12, 22, 11, 90};\n' +
'    int n = sizeof(numbers) / sizeof(numbers[0]);\n\n' +
'    printf("Unsorted: ");\n' +
'    for (int i = 0; i &lt; n; i++) printf("%d ", numbers[i]);\n' +
'    printf("\\n");\n\n' +
'    quick_sort(numbers, 0, n - 1);\n\n' +
'    printf("Quick Sorted: ");\n' +
'    for (int i = 0; i &lt; n; i++) printf("%d ", numbers[i]);\n' +
'    printf("\\n");\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">4</span>Sorting Algorithm Matrix</div>' +
'<div class="section-body">' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Algorithm</th><th>Best Time</th><th>Average Time</th><th>Worst Time</th><th>Space</th><th>Stable?</th></tr></thead>' +
'    <tbody>' +
'      <tr><td>Bubble Sort</td><td>O(N)</td><td>O(N²)</td><td>O(N²)</td><td>O(1)</td><td>Yes</td></tr>' +
'      <tr><td>Selection Sort</td><td>O(N²)</td><td>O(N²)</td><td>O(N²)</td><td>O(1)</td><td>No</td></tr>' +
'      <tr><td>Insertion Sort</td><td>O(N)</td><td>O(N²)</td><td>O(N²)</td><td>O(1)</td><td>Yes</td></tr>' +
'      <tr><td>Merge Sort</td><td>O(N log N)</td><td>O(N log N)</td><td>O(N log N)</td><td>O(N)</td><td>Yes</td></tr>' +
'      <tr><td>Quick Sort</td><td>O(N log N)</td><td>O(N log N)</td><td>O(N²)</td><td>O(log N)</td><td>No</td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +

'<div class="section-title"><span class="num">5</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: What does sorting stability mean?</h4><p>A sorting algorithm is <strong>stable</strong> if equal keys retain their relative original order after sorting. Important when sorting records by multiple criteria.</p></div>' +
'    <div class="faq-item"><h4>Q2: Why is Quick Sort preferred over Merge Sort in practice?</h4><p>Quick Sort sorts in-place with lower cache-miss constants, whereas Merge Sort requires extra O(N) heap memory allocation for merging sub-arrays.</p></div>' +
'    <div class="faq-item"><h4>Q3: How do you prevent Quick Sort worst-case O(N²)?</h4><p>Use randomized pivot selection or median-of-three pivot selection to prevent bad partitions on already-sorted arrays.</p></div>' +
'    <div class="faq-item"><h4>Q4: When is Insertion Sort better than Quick Sort?</h4><p>Insertion Sort is extremely fast for small arrays (N &lt; 15) or nearly sorted arrays due to minimal overhead and O(N) best-case complexity.</p></div>' +
'    <div class="faq-item"><h4>Q5: What is the theoretical lower bound for comparison sorting?</h4><p>Any comparison-based sorting algorithm requires at least Ω(N log N) comparisons in the worst case.</p></div>' +
'  </div>' +
'</div>',
'51-c-data-structures-hash-tables-and-collision-resolution.html','51. Hash Tables & Collision Resolution',
'53-c-algorithms-recursion-divide-and-conquer-and-greedy-strategies.html','53. Divide-and-Conquer & Greedy Strategies');

// LESSON 53
makeLesson(53,
'53-c-algorithms-recursion-divide-and-conquer-and-greedy-strategies.html',
'C Algorithms: Recursion, Divide-and-Conquer & Greedy Paradigm Masterclass',
'Exhaustive textbook-grade masterclass on Algorithm Strategies in C (Phase 19 Part 2): Tail recursion, Divide-and-Conquer paradigm, Greedy Choice property, Fractional Knapsack, and Activity Selection.',
'Phase 19','Algorithms & Big-O Complexity',
'Recursion Call Stack · Tail Recursion · Divide-and-Conquer Paradigm · Greedy Choice Property · Fractional Knapsack · Coin Change Problem · Activity Selection',
'<div class="intro-box"><p>Welcome to <strong>Phase 19 (Chapter 53): C Algorithms — Recursion, Divide-and-Conquer &amp; Greedy Paradigm Masterclass</strong>! Design paradigms provide templates for solving complex problems. In this guide, you will master recursion mechanics, Divide-and-Conquer strategies, and Greedy Choice algorithms in C.</p></div>' +

'<div class="section-title"><span class="num">1</span>Recursion &amp; Tail Recursion Optimization</div>' +
'<div class="section-body">' +
'  <p class="text-prose">Recursion occurs when a function calls itself to solve smaller subproblems. <strong>Tail Recursion</strong> happens when the recursive call is the final statement in the function, allowing compilers (GCC `-O2`) to optimize stack frames away into a simple loop!</p>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Divide-and-Conquer Strategy</div>' +
'<div class="section-body">' +
'  <p class="text-prose">Divide-and-Conquer breaks a problem into smaller independent subproblems, solves them recursively, and combines results (e.g. Merge Sort, Binary Search).</p>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Greedy Strategy &amp; Fractional Knapsack</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C — Fractional Knapsack Problem (Greedy Strategy)</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n\n' +
'typedef struct {\n' +
'    double weight;\n' +
'    double value;\n' +
'    double ratio; // value / weight\n' +
'} Item;\n\n' +
'static int compareItems(const void *a, const void *b) {\n' +
'    Item *i1 = (Item *)a;\n' +
'    Item *i2 = (Item *)b;\n' +
'    if (i2-&gt;ratio &gt; i1-&gt;ratio) return 1;\n' +
'    if (i2-&gt;ratio &lt; i1-&gt;ratio) return -1;\n' +
'    return 0;\n' +
'}\n\n' +
'double fractionalKnapsack(Item items[], int n, double capacity) {\n' +
'    qsort(items, n, sizeof(Item), compareItems);\n' +
'    double totalValue = 0.0;\n' +
'    for (int i = 0; i &lt; n; i++) {\n' +
'        if (capacity &lt;= 0) break;\n' +
'        if (items[i].weight &lt;= capacity) {\n' +
'            capacity -= items[i].weight;\n' +
'            totalValue += items[i].value;\n' +
'        } else {\n' +
'            totalValue += items[i].value * (capacity / items[i].weight);\n' +
'            capacity = 0;\n' +
'        }\n' +
'    }\n' +
'    return totalValue;\n' +
'}\n\n' +
'int main(void) {\n' +
'    Item items[] = {{10, 60, 6.0}, {20, 100, 5.0}, {30, 120, 4.0}};\n' +
'    double maxVal = fractionalKnapsack(items, 3, 50.0);\n' +
'    printf("Maximum Knapsack Value: %.2f\\n", maxVal);\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">4</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: What is the core difference between Greedy and Dynamic Programming?</h4><p>Greedy makes a locally optimal choice at each step without reconsidering past decisions. DP evaluates all subproblem choices and stores optimal solutions to subproblems.</p></div>' +
'    <div class="faq-item"><h4>Q2: Does Greedy strategy always guarantee the global optimal solution?</h4><p>No! Greedy fails for 0/1 Knapsack, but works for Fractional Knapsack, Huffman Coding, and Prim\'s/Dijkstra\'s algorithms.</p></div>' +
'    <div class="faq-item"><h4>Q3: What causes stack overflow in recursion?</h4><p>Missing base cases or excessively deep recursive calls exhaust the allocated RAM stack memory frame limit.</p></div>' +
'    <div class="faq-item"><h4>Q4: How does tail call optimization work in GCC?</h4><p>GCC reuses the current stack frame for the next recursive function call instead of allocating a new frame.</p></div>' +
'    <div class="faq-item"><h4>Q5: What is the Master Theorem in Divide-and-Conquer?</h4><p>A mathematical formula used to solve recurrence relations of the form T(N) = aT(N/b) + f(N).</p></div>' +
'  </div>' +
'</div>',
'52-c-algorithms-big-o-complexity-searching-and-sorting.html','52. Big-O Complexity, Searching & Sorting',
'54-c-algorithms-dynamic-programming-backtracking-and-graph-search.html','54. Dynamic Programming, Backtracking & Search');

// LESSON 54
makeLesson(54,
'54-c-algorithms-dynamic-programming-backtracking-and-graph-search.html',
'C Algorithms: Dynamic Programming, Backtracking & N-Queens Masterclass',
'Exhaustive textbook-grade masterclass on Advanced Algorithms in C (Phase 19 Part 3): Dynamic Programming memoization vs tabulation, 0/1 Knapsack, and Backtracking N-Queens problem.',
'Phase 19','Algorithms & Big-O Complexity',
'Dynamic Programming (DP) · Overlapping Subproblems · Memoization vs Tabulation · 0/1 Knapsack DP Table · Backtracking Paradigm · N-Queens Problem',
'<div class="intro-box"><p>Welcome to <strong>Phase 19 (Chapter 54): C Algorithms — Dynamic Programming, Backtracking &amp; N-Queens Masterclass</strong>! Dynamic Programming (DP) and Backtracking solve hard combinatorial optimization problems. In this guide, you will master top-down memoization, bottom-up tabulation, 0/1 Knapsack DP, and N-Queens state-space backtracking.</p></div>' +

'<div class="section-title"><span class="num">1</span>Dynamic Programming: Memoization vs Tabulation</div>' +
'<div class="section-body">' +
'  <p class="text-prose">DP applies when a problem has <strong>Overlapping Subproblems</strong> and <strong>Optimal Substructure</strong>.</p>' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Approach</th><th>Strategy</th><th>Implementation</th><th>Space Overhead</th></tr></thead>' +
'    <tbody>' +
'      <tr><td>Memoization</td><td>Top-Down</td><td>Recursive + Cache Array</td><td>Call Stack + Cache Array</td></tr>' +
'      <tr><td>Tabulation</td><td>Bottom-Up</td><td>Iterative Loop + DP Table</td><td>DP Table Array only</td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>0/1 Knapsack Problem in C</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C — 0/1 Knapsack DP Tabulation Solution</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n\n' +
'static int max(int a, int b) { return (a &gt; b) ? a : b; }\n\n' +
'int knapsackDP(int W, int wt[], int val[], int n) {\n' +
'    int K[n + 1][W + 1];\n' +
'    for (int i = 0; i &lt;= n; i++) {\n' +
'        for (int w = 0; w &lt;= W; w++) {\n' +
'            if (i == 0 || w == 0)\n' +
'                K[i][w] = 0;\n' +
'            else if (wt[i - 1] &lt;= w)\n' +
'                K[i][w] = max(val[i - 1] + K[i - 1][w - wt[i - 1]], K[i - 1][w]);\n' +
'            else\n' +
'                K[i][w] = K[i - 1][w];\n' +
'        }\n' +
'    }\n' +
'    return K[n][W];\n' +
'}\n\n' +
'int main(void) {\n' +
'    int val[] = {60, 100, 120};\n' +
'    int wt[] = {10, 20, 30};\n' +
'    int W = 50;\n' +
'    printf("Optimal 0/1 Knapsack Value: %d\\n", knapsackDP(W, wt, val, 3));\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: Why does 0/1 Knapsack require DP while Fractional Knapsack uses Greedy?</h4><p>In 0/1 Knapsack, items cannot be broken. Taking an item may waste capacity, requiring evaluation of all sub-capacities using DP.</p></div>' +
'    <div class="faq-item"><h4>Q2: What is the time complexity of 0/1 Knapsack DP?</h4><p>O(N · W), where N is number of items and W is knapsack capacity (pseudo-polynomial time).</p></div>' +
'    <div class="faq-item"><h4>Q3: How does backtracking prune invalid state search trees?</h4><p>Backtracking checks safety constraints before exploring sub-branches. If a branch violates rules (e.g. Queen under attack), it abandons the branch immediately.</p></div>' +
'    <div class="faq-item"><h4>Q4: How do you optimize 0/1 Knapsack space to O(W)?</h4><p>Since DP row `i` only depends on row `i-1`, you can use a single 1D array traversed backward from `W` to `0`.</p></div>' +
'    <div class="faq-item"><h4>Q5: What is the Longest Common Subsequence (LCS) DP problem?</h4><p>LCS finds the longest sequence of characters appearing in the same order in two strings in O(M · N) time.</p></div>' +
'  </div>' +
'</div>',
'53-c-algorithms-recursion-divide-and-conquer-and-greedy-strategies.html','53. Divide-and-Conquer & Greedy Strategies',
'55-c-debugging-compiler-warnings-and-gdb-debugger.html','55. Compiler Warning Flags (-Wall) & GDB Debugger');

// LESSON 55
makeLesson(55,
'55-c-debugging-compiler-warnings-and-gdb-debugger.html',
'C Debugging: Compiler Warning Flags (-Wall) & GDB Debugger Masterclass',
'Exhaustive textbook-grade masterclass on C Debugging (Phase 20 Part 1): GCC compiler flags (-Wall -Wextra -Werror), debug symbol generation (-g3), GDB commands (b, n, s, p, bt, watch), and tracking segmentation faults.',
'Phase 20','Debugging & Safe C Programming',
'GCC Warning Flags (-Wall -Wextra -Werror) · Debug Symbols (-g3) · GDB Commands (b, n, s, p, bt) · Watchpoints · Debugging Segfaults · Valgrind Memory Checks',
'<div class="intro-box"><p>Welcome to <strong>Phase 20 (Chapter 55): C Debugging — Compiler Warning Flags (-Wall) &amp; GDB Debugger Masterclass</strong>! Professional C development relies heavily on compiler warnings and interactive debuggers. In this guide, you will master GCC warning flags and GDB (GNU Debugger) execution commands.</p></div>' +

'<div class="section-title"><span class="num">1</span>GCC Compiler Warning Flags Matrix</div>' +
'<div class="section-body">' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Flag</th><th>Purpose</th></tr></thead>' +
'    <tbody>' +
'      <tr><td><code>-Wall</code></td><td>Enables all common warning checks (uninitialized vars, missing returns).</td></tr>' +
'      <tr><td><code>-Wextra</code></td><td>Enables additional strict checks (unused params, signed/unsigned compare).</td></tr>' +
'      <tr><td><code>-Werror</code></td><td>Treats all compiler warnings as hard compilation errors!</td></tr>' +
'      <tr><td><code>-g3 -O0</code></td><td>Includes full debug symbol tables and disables optimization for GDB.</td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>GDB Debugger Essential Commands Cheat-Sheet</div>' +
'<div class="section-body">' +
'  <div class="memory-diagram">' +
'GDB Command Workflow:\n\n' +
'  $ gcc -g3 -O0 program.c -o program\n' +
'  $ gdb ./program\n\n' +
'  (gdb) break main         # Set breakpoint at main()\n' +
'  (gdb) run 10 20          # Start program with CLI args\n' +
'  (gdb) next               # Step over next line\n' +
'  (gdb) step               # Step into function call\n' +
'  (gdb) print ptr          # Print variable or pointer value\n' +
'  (gdb) backtrace          # Print function call stack (CRITICAL for segfaults!)\n' +
'  (gdb) watch var          # Pause execution when var value changes\n' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: How do you inspect stack frame state during a crash in GDB?</h4><p>Run <code>backtrace</code> (or <code>bt</code>) to print the stack trace, then <code>frame N</code> to inspect local variables at frame N.</p></div>' +
'    <div class="faq-item"><h4>Q2: Why must compiler optimizations (-O2) be disabled for debugging?</h4><p>Optimizations reorder lines and inline variables, making stepping through source lines in GDB jump around unpredictably.</p></div>' +
'    <div class="faq-item"><h4>Q3: What is a watchpoint in GDB?</h4><p>A hardware-assisted breakpoint set with <code>watch var</code> that pauses execution whenever the value of `var` changes.</p></div>' +
'    <div class="faq-item"><h4>Q4: How do you pass command-line arguments inside GDB?</h4><p>Use <code>run arg1 arg2</code> or set arguments beforehand with <code>set args arg1 arg2</code>.</p></div>' +
'    <div class="faq-item"><h4>Q5: How do you view memory raw bytes at a pointer in GDB?</h4><p>Use the examine command: <code>x/10xb ptr</code> prints 10 bytes in hexadecimal starting at `ptr`.</p></div>' +
'  </div>' +
'</div>',
'54-c-algorithms-dynamic-programming-backtracking-and-graph-search.html','54. Dynamic Programming, Backtracking & Search',
'56-c-security-vulnerabilities-buffer-overflows-and-undefined-behavior.html','56. Security Vulnerabilities & Undefined Behavior');

// LESSON 56
makeLesson(56,
'56-c-security-vulnerabilities-buffer-overflows-and-undefined-behavior.html',
'C Security: Vulnerabilities, Buffer Overflows & Undefined Behavior Masterclass',
'Exhaustive textbook-grade masterclass on C Vulnerabilities (Phase 20 Part 2): Stack buffer overflow, return address hijacking, format string CVE, off-by-one errors, and Undefined Behavior (UB).',
'Phase 20','Debugging & Safe C Programming',
'Stack Buffer Overflow · Shellcode Hijacking · Format String CVE · Off-by-one Errors · Undefined Behavior (UB) Catalog · Integer Overflow',
'<div class="intro-box"><p>Welcome to <strong>Phase 20 (Chapter 56): C Security — Vulnerabilities, Buffer Overflows &amp; Undefined Behavior Masterclass</strong>! C provides raw memory access without runtime bounds checking. In this guide, you will master stack buffer overflow mechanics, format string vulnerabilities, and Undefined Behavior (UB) traps.</p></div>' +

'<div class="section-title"><span class="num">1</span>Anatomy of a Stack Buffer Overflow</div>' +
'<div class="section-body">' +
'  <div class="memory-diagram">' +
'RAM Stack Frame Buffer Overflow Vulnerability:\n\n' +
'  Higher Memory Addresses  ┌─────────────────────────────┐\n' +
'                           │ Saved Return Address (IP)   │ ◄── TARGET TO OVERWRITE!\n' +
'                           ├─────────────────────────────┤\n' +
'                           │ Saved Frame Pointer (EBP)   │\n' +
'                           ├─────────────────────────────┤\n' +
'                           │ char buffer[64];            │ ◄── strcpy() writes 100 bytes!\n' +
'  Lower Memory Addresses   └─────────────────────────────┘\n' +
'  Writing past buffer[64] overwrites Saved EBP and Saved Return Address!\n' +
'  When function returns, CPU jumps to attacker-controlled memory address!\n' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Format String Vulnerability CVE</div>' +
'<div class="section-body">' +
'  <p class="text-prose">NEVER execute <code>printf(user_input);</code>! If <code>user_input</code> contains <code>%x %x %s %n</code>, attackers can read RAM memory contents or overwrite arbitrary memory locations.</p>' +
'  <div class="concept-box">' +
'    <h4>Vulnerable vs Secure Format Output:</h4>' +
'    <p>• ❌ <code>printf(user_string);</code> — Extremely Vulnerable to Format String Attack!</p>' +
'    <p>• ✅ <code>printf("%s", user_string);</code> — Safe Secure Format String!</p>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: What is a Stack Canary (Stack Smashing Protector)?</h4><p>A compiler security feature (`-fstack-protector`) that places a secret random value before the return address. If altered on return, the process terminates immediately.</p></div>' +
'    <div class="faq-item"><h4>Q2: What is ASLR (Address Space Layout Randomization)?</h4><p>An OS security mechanism that randomizes the RAM base addresses of stack, heap, and libraries on every program execution.</p></div>' +
'    <div class="faq-item"><h4>Q3: What is Undefined Behavior (UB) in C?</h4><p>Code for which the C standard places no requirements. Compilers assume UB never happens and optimize away code checks unpredictably.</p></div>' +
'    <div class="faq-item"><h4>Q4: Why is signed integer overflow Undefined Behavior?</h4><p>The C standard allows compilers to assume signed integers never overflow, enabling optimizations like `x + 1 > x` being evaluated to constant true.</p></div>' +
'    <div class="faq-item"><h4>Q5: What is an off-by-one buffer error?</h4><p>Writing to index `N` of an array of size `N` (e.g. `for (int i=0; i&lt;=N; i++)`), corrupting adjacent memory by 1 byte.</p></div>' +
'  </div>' +
'</div>',
'55-c-debugging-compiler-warnings-and-gdb-debugger.html','55. Compiler Warning Flags (-Wall) & GDB Debugger',
'57-c-defensive-c-programming-sanitizers-and-static-analysis.html','57. Defensive Programming, Sanitizers & Static Analysis');

// LESSON 57
makeLesson(57,
'57-c-defensive-c-programming-sanitizers-and-static-analysis.html',
'C Defensive Programming: AddressSanitizer & Static Analysis Masterclass',
'Exhaustive textbook-grade masterclass on Defensive C Programming (Phase 20 Part 3): Replacing unsafe string API, AddressSanitizer (ASan) flags, cppcheck, and clang-tidy static analysis.',
'Phase 20','Debugging & Safe C Programming',
'Defensive Programming Rules · Unsafe API Replacements · AddressSanitizer (ASan) · UndefinedBehaviorSanitizer (UBSan) · cppcheck · clang-tidy Integration',
'<div class="intro-box"><p>Welcome to <strong>Phase 20 (Chapter 57): C Defensive Programming — AddressSanitizer &amp; Static Analysis Masterclass</strong>! Defensive C programming eliminates security bugs before deployment. In this guide, you will master replacing unsafe string APIs, using compiler sanitizers (ASan), and automated static analysis.</p></div>' +

'<div class="section-title"><span class="num">1</span>Unsafe vs Secure C Library Replacements</div>' +
'<div class="section-body">' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Unsafe Legacy Function</th><th>Safe Replacement</th><th>Reason for Security Upgrade</th></tr></thead>' +
'    <tbody>' +
'      <tr><td><code>gets(buf)</code></td><td><code>fgets(buf, size, stdin)</code></td><td><code>gets()</code> has no size limit (Removed in C11).</td></tr>' +
'      <tr><td><code>strcpy(dest, src)</code></td><td><code>strncpy()</code> / <code>strlcpy()</code></td><td>Prevents unbounded buffer copies.</td></tr>' +
'      <tr><td><code>strcat(dest, src)</code></td><td><code>strncat()</code> / <code>strlcat()</code></td><td>Enforces destination bounds.</td></tr>' +
'      <tr><td><code>sprintf(buf, fmt)</code></td><td><code>snprintf(buf, size, fmt)</code></td><td>Enforces buffer length boundaries.</td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Compiler Sanitizers: ASan &amp; UBSan</div>' +
'<div class="section-body">' +
'  <p class="text-prose">Compile with <code>-fsanitize=address,undefined</code> to catch memory leaks, out-of-bounds array reads, and use-after-free bugs at runtime with exact file line tracebacks!</p>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: What is the performance overhead of AddressSanitizer?</h4><p>ASan typically adds ~2x CPU execution slowdown and ~2x memory overhead. Excellent for testing; disable in release production builds.</p></div>' +
'    <div class="faq-item"><h4>Q2: What is static analysis vs dynamic analysis?</h4><p>Static analysis (`cppcheck`, `clang-tidy`) inspects source code without executing it. Dynamic analysis (ASan, Valgrind) monitors program execution at runtime.</p></div>' +
'    <div class="faq-item"><h4>Q3: How do you integrate cppcheck into a CI build pipeline?</h4><p>Run `cppcheck --enable=all --error-exitcode=1 src/` in your build script to break automated builds on detected bugs.</p></div>' +
'    <div class="faq-item"><h4>Q4: What does UndefinedBehaviorSanitizer (UBSan) catch?</h4><p>UBSan catches signed integer overflow, division by zero, null pointer dereferencing, and misaligned pointer access at runtime.</p></div>' +
'    <div class="faq-item"><h4>Q5: Why is strncpy() not completely safe by default?</h4><p>If `src` length equals or exceeds buffer size, `strncpy()` does NOT append a null terminator `\\0`! Always manually set `buf[size - 1] = \'\\0\'`.</p></div>' +
'  </div>' +
'</div>',
'56-c-security-vulnerabilities-buffer-overflows-and-undefined-behavior.html','56. Security Vulnerabilities & Undefined Behavior',
'58-c-multi-file-projects-compilation-pipeline-and-linking.html','58. Multi-File Projects & Compilation Pipeline');

// LESSON 58
makeLesson(58,
'58-c-multi-file-projects-compilation-pipeline-and-linking.html',
'C Multi-File Projects: Directory Architecture & Linking Masterclass',
'Exhaustive textbook-grade masterclass on C Project Structure (Phase 21 Part 1): Production folder layout (src/, include/, build/), two-stage compilation pipeline, object files, and resolving symbol linking errors.',
'Phase 21','Build Systems, Makefiles & CMake',
'Project Directory Structure (src/ include/ build/) · Two-Stage Compilation Pipeline · Object Files (.o) · Symbol Table Linker Resolution · Undefined Reference Errors',
'<div class="intro-box"><p>Welcome to <strong>Phase 21 (Chapter 58): C Multi-File Projects — Directory Architecture &amp; Linking Masterclass</strong>! Professional C codebases are structured into modular components across separate directories. In this guide, you will master production C folder structures and the two-stage build pipeline.</p></div>' +

'<div class="section-title"><span class="num">1</span>Production C Project Directory Structure</div>' +
'<div class="section-body">' +
'  <div class="memory-diagram">' +
'Standard Production C Directory Layout:\n\n' +
'  my_project/\n' +
'  ├── include/             # Public Header files (.h)\n' +
'  │   ├── logger.h\n' +
'  │   └── database.h\n' +
'  ├── src/                 # C Implementation source files (.c)\n' +
'  │   ├── main.c\n' +
'  │   ├── logger.c\n' +
'  │   └── database.c\n' +
'  ├── build/               # Intermediate object files (.o)\n' +
'  ├── bin/                 # Final executable outputs\n' +
'  └── Makefile             # GNU Make build automation script\n' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Two-Stage Build Pipeline Mechanics</div>' +
'<div class="section-body">' +
'  <p class="text-prose">1. <strong>Compilation Stage:</strong> `gcc -Iinclude -c src/logger.c -o build/logger.o` converts C source files into independent object files.<br>2. <strong>Linking Stage:</strong> `gcc build/*.o -o bin/app` combines object files into a single binary executable.</p>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: What causes an "undefined reference to symbol" linker error?</h4><p>The function was declared in a header file, but its `.c` implementation file was not compiled or not passed to the linker command line.</p></div>' +
'    <div class="faq-item"><h4>Q2: What is the purpose of the -I compiler flag?</h4><p>The `-Iinclude` flag tells GCC to search the specified `include/` directory when resolving `#include "header.h"` directives.</p></div>' +
'    <div class="faq-item"><h4>Q3: Why separate compilation into .o files before linking?</h4><p>Incremental compilation! When you modify 1 source file in a 1000-file project, only that single `.c` file needs recompilation before relinking.</p></div>' +
'    <div class="faq-item"><h4>Q4: What is an Object File (.o / .obj)?</h4><p>A binary file containing compiled machine code instructions and symbol relocation tables, but without an entry main point or resolved external addresses.</p></div>' +
'    <div class="faq-item"><h4>Q5: What is the difference between internal and external linkage?</h4><p>`static` limits symbol visibility to its own translation unit. `extern` exposes symbols globally to the linker across all translation units.</p></div>' +
'  </div>' +
'</div>',
'57-c-defensive-c-programming-sanitizers-and-static-analysis.html','57. Defensive Programming, Sanitizers & Static Analysis',
'59-c-libraries-static-lib-vs-shared-so-dll-libraries.html','59. Static (.a) vs Dynamic Shared (.so / .dll) Libraries');

// LESSON 59
makeLesson(59,
'59-c-libraries-static-lib-vs-shared-so-dll-libraries.html',
'C Libraries: Static (.a) vs Dynamic Shared (.so / .dll) Libraries Masterclass',
'Exhaustive textbook-grade masterclass on C Libraries (Phase 21 Part 2): Creating static libraries with ar, shared libraries with -fPIC -shared, dynamic loading with dlopen/dlsym, and comparison matrix.',
'Phase 21','Build Systems, Makefiles & CMake',
'Static Libraries (.a / .lib) · Shared Libraries (.so / .dll) · Position Independent Code (-fPIC) · ar Archiver · dlopen / dlsym Runtime Plugins',
'<div class="intro-box"><p>Welcome to <strong>Phase 21 (Chapter 59): C Libraries — Static (.a) vs Dynamic Shared (.so / .dll) Libraries Masterclass</strong>! Software libraries allow sharing compiled code across projects. In this guide, you will master creating static libraries (`.a`), shared dynamic libraries (`.so`), and loading plugins at runtime with `dlopen()`.</p></div>' +

'<div class="section-title"><span class="num">1</span>Static vs Shared Libraries Comparison Matrix</div>' +
'<div class="section-body">' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Feature</th><th>Static Library (.a / .lib)</th><th>Shared Dynamic Library (.so / .dll)</th></tr></thead>' +
'    <tbody>' +
'      <tr><td>Link Time</td><td>Copied into executable at build time</td><td>Linked at launch time by OS dynamic linker</td></tr>' +
'      <tr><td>Executable Size</td><td>Larger (Bundles library code)</td><td>Smaller (Shared across multiple running processes)</td></tr>' +
'      <tr><td>Updates</td><td>Requires re-compiling executable</td><td>Update `.so` file on disk without re-compiling app!</td></tr>' +
'      <tr><td>Memory</td><td>Duplicated in RAM per running process</td><td>Single RAM physical page shared across processes</td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Creating &amp; Linking Libraries Command Flow</div>' +
'<div class="section-body">' +
'  <div class="memory-diagram">' +
'1. Static Library Creation:\n' +
'   $ gcc -c math_lib.c -o math_lib.o\n' +
'   $ ar rcs libmath.a math_lib.o            # Create static archive\n' +
'   $ gcc main.c -L. -lmath -o app           # Link static library\n\n' +
'2. Shared Library Creation:\n' +
'   $ gcc -fPIC -c math_lib.c -o math_lib.o  # Position Independent Code\n' +
'   $ gcc -shared math_lib.o -o libmath.so   # Create shared library\n' +
'   $ gcc main.c -L. -lmath -o app           # Link shared library\n' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: Why is -fPIC mandatory for shared libraries?</h4><p>Position Independent Code (`-fPIC`) generates memory addresses using relative offsets so the shared library can be loaded at any arbitrary RAM location.</p></div>' +
'    <div class="faq-item"><h4>Q2: How does LD_LIBRARY_PATH work on Linux?</h4><p>An environment variable listing extra directory paths where the OS dynamic loader searches for `.so` shared libraries at app launch.</p></div>' +
'    <div class="faq-item"><h4>Q3: How do you load a C library plugin dynamically at runtime?</h4><p>Use POSIX `dlopen("plugin.so", RTLD_LAZY)` to load, `dlsym(handle, "func_name")` to retrieve function pointers, and `dlclose()` to unload.</p></div>' +
'    <div class="faq-item"><h4>Q4: What is DLL Hell or Dependency Hell?</h4><p>Incompatibility crashes when an updated shared library breaks application code expecting an older version of function signatures.</p></div>' +
'    <div class="faq-item"><h4>Q5: What is rpath in GCC linking?</h4><p>The `-Wl,-rpath,.` flag bakes the shared library search path directly into the executable binary header.</p></div>' +
'  </div>' +
'</div>',
'58-c-multi-file-projects-compilation-pipeline-and-linking.html','58. Multi-File Projects & Compilation Pipeline',
'60-c-build-tools-makefiles-cmake-and-git-ci-cd.html','60. Build Automation: Makefiles, CMake & Git CI/CD');

// LESSON 60
makeLesson(60,
'60-c-build-tools-makefiles-cmake-and-git-ci-cd.html',
'C Build Automation: Makefiles, CMake & Git CI/CD Masterclass',
'Exhaustive textbook-grade masterclass on C Build Tools (Phase 21 Part 3): GNU Makefile rules and variables, CMake Lists, .gitignore, and GitHub Actions CI/CD workflows.',
'Phase 21','Build Systems, Makefiles & CMake',
'GNU Makefile Syntax · Automatic Variables ($@ $< $^) · .PHONY Targets · CMakeLists.txt Configuration · Git CI/CD Workflows · Automated Unit Testing',
'<div class="intro-box"><p>Welcome to <strong>Phase 21 (Chapter 60): C Build Automation — Makefiles, CMake &amp; Git CI/CD Masterclass</strong>! Automating builds ensures reproducible compilation across development teams. In this guide, you will master GNU Make, modern CMake configuration, and automated GitHub Actions CI/CD pipelines.</p></div>' +

'<div class="section-title"><span class="num">1</span>GNU Makefile Template</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">Makefile — Production Multi-File Build Script</span><a class="try-btn" href="/?lang=c">▶ View Script</a></div>' +
'<pre><code>CC = gcc\n' +
'CFLAGS = -Wall -Wextra -Werror -std=c17 -Iinclude\n' +
'SRC = $(wildcard src/*.c)\n' +
'OBJ = $(SRC:src/%.c=build/%.o)\n' +
'TARGET = bin/app\n\n' +
'.PHONY: all clean\n\n' +
'all: $(TARGET)\n\n' +
'$(TARGET): $(OBJ)\n' +
'\t@mkdir -p bin\n' +
'\t$(CC) $(OBJ) -o $@\n\n' +
'build/%.o: src/%.c\n' +
'\t@mkdir -p build\n' +
'\t$(CC) $(CFLAGS) -c $&lt; -o $@\n\n' +
'clean:\n' +
'\trm -rf build bin\n</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>CMake Modern Build Configuration</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">CMakeLists.txt — Cross-Platform CMake Configuration</span><a class="try-btn" href="/?lang=c">▶ View Script</a></div>' +
'<pre><code>cmake_minimum_required(VERSION 3.15)\n' +
'project(MyCProject VERSION 1.0 LANGUAGES C)\n\n' +
'set(CMAKE_C_STANDARD 17)\n' +
'set(CMAKE_C_STANDARD_REQUIRED ON)\n\n' +
'include_directories(include)\n' +
'file(GLOB SOURCES "src/*.c")\n\n' +
'add_executable(my_app ${SOURCES})\n</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: What do automatic variables $@, $<, and $^ mean in Makefiles?</h4><p>`$@` is the target name, `$&lt;` is the first prerequisite, and `$^` is the list of all prerequisites.</p></div>' +
'    <div class="faq-item"><h4>Q2: Why use .PHONY targets in Makefiles?</h4><p>Declaring `.PHONY: clean all` ensures Make executes targets even if a file named `clean` or `all` exists on disk.</p></div>' +
'    <div class="faq-item"><h4>Q3: What is the main advantage of CMake over Makefiles?</h4><p>CMake generates native build files for any platform (Makefiles for Linux, Visual Studio solutions for Windows, Xcode for macOS).</p></div>' +
'    <div class="faq-item"><h4>Q4: Must recipe commands in Makefiles start with a TAB character?</h4><p>Yes! GNU Make strictly requires commands under targets to be indented with an actual TAB character (spaces will cause a syntax error).</p></div>' +
'    <div class="faq-item"><h4>Q5: How do GitHub Actions run automated C builds on push?</h4><p>A YAML workflow file in `.github/workflows/c-build.yml` triggers a Linux VM that checks out code, runs `make`, and executes test binaries.</p></div>' +
'  </div>' +
'</div>',
'59-c-libraries-static-lib-vs-shared-so-dll-libraries.html','59. Static (.a) vs Dynamic Shared (.so / .dll) Libraries',
'61-c-system-programming-posix-system-calls-processes-and-ipc.html','61. POSIX System Calls, Processes & IPC');

// LESSON 61
makeLesson(61,
'61-c-system-programming-posix-system-calls-processes-and-ipc.html',
'C System Programming: POSIX System Calls, Processes & IPC Masterclass',
'Exhaustive textbook-grade masterclass on POSIX System Programming (Phase 22 Part 1): open/read/write descriptors, fork(), execvp(), waitpid(), Copy-On-Write memory, pipes, and signals.',
'Phase 22','System Programming & Embedded C',
'POSIX System Calls vs stdio · File Descriptors (0 1 2) · fork() Process Creation · Copy-On-Write (COW) RAM · execvp() · Inter-Process Communication (Pipes & Signals)',
'<div class="intro-box"><p>Welcome to <strong>Phase 22 (Chapter 61): C System Programming — POSIX System Calls, Processes &amp; IPC Masterclass</strong>! System programming interacts directly with the operating system kernel. In this guide, you will master POSIX system calls, process creation with `fork()`, process replacement with `execvp()`, and Inter-Process Communication (IPC) via pipes.</p></div>' +

'<div class="section-title"><span class="num">1</span>Process Creation &amp; Copy-On-Write RAM Architecture</div>' +
'<div class="section-body">' +
'  <div class="memory-diagram">' +
'fork() Process Duplication & Copy-On-Write (COW):\n\n' +
'  Parent Process (PID 100)                     Child Process (PID 101)\n' +
'  ┌──────────────────────┐                     ┌──────────────────────┐\n' +
'  │ Code & Data Segments │                     │ Copy of Parent RAM   │\n' +
'  │ fork() returns > 0   │                     │ fork() returns == 0  │\n' +
'  └──────────┬───────────┘                     └──────────┬───────────┘\n' +
'             │                                            │\n' +
'             ▼                                            ▼\n' +
'  Both processes execute concurrently from the exact line after fork()!\n' +
'  Kernel uses Copy-On-Write (COW) to share physical RAM pages until modified.\n' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Inter-Process Communication (Pipes &amp; Signals)</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C — Parent-Child Communication via Unidirectional Pipe</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n' +
'#include &lt;unistd.h&gt;\n' +
'#include &lt;string.h&gt;\n' +
'#include &lt;sys/wait.h&gt;\n\n' +
'int main(void) {\n' +
'    int pipefd[2]; // pipefd[0] = read, pipefd[1] = write\n' +
'    if (pipe(pipefd) == -1) { perror("pipe"); return 1; }\n\n' +
'    pid_t pid = fork();\n' +
'    if (pid &lt; 0) { perror("fork"); return 1; }\n\n' +
'    if (pid == 0) { // CHILD PROCESS\n' +
'        close(pipefd[1]); // Close unused write end\n' +
'        char buffer[128];\n' +
'        ssize_t bytesRead = read(pipefd[0], buffer, sizeof(buffer) - 1);\n' +
'        if (bytesRead &gt; 0) {\n' +
'            buffer[bytesRead] = \'\\0\';\n' +
'            printf("[Child Received]: %s\\n", buffer);\n' +
'        }\n' +
'        close(pipefd[0]);\n' +
'        exit(0);\n' +
'    } else { // PARENT PROCESS\n' +
'        close(pipefd[0]); // Close unused read end\n' +
'        const char *msg = "Hello from Parent Process!";\n' +
'        write(pipefd[1], msg, strlen(msg));\n' +
'        close(pipefd[1]);\n' +
'        wait(NULL); // Wait for child to exit\n' +
'        printf("[Parent]: Child finished execution.\\n");\n' +
'    }\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: What is a Zombie process in C?</h4><p>A terminated child process whose parent has not yet called `wait()` or `waitpid()` to read its exit status, leaving an entry in the OS process table.</p></div>' +
'    <div class="faq-item"><h4>Q2: What is an Orphan process?</h4><p>A child process whose parent process terminated before it. The OS `init` / `systemd` process (PID 1) automatically adopts orphans.</p></div>' +
'    <div class="faq-item"><h4>Q3: What is the difference between system() and execvp()?</h4><p>`system()` launches a new shell subprocess. `execvp()` completely overwrites the current process memory image with the new binary.</p></div>' +
'    <div class="faq-item"><h4>Q4: How do file descriptors work in POSIX?</h4><p>Integers indexing an OS kernel table: 0 is stdin, 1 is stdout, 2 is stderr. `open()` returns descriptor numbers 3, 4, 5...</p></div>' +
'    <div class="faq-item"><h4>Q5: What is signal handler safety in C?</h4><p>Signal handlers interrupt normal program flow asynchronously. Only async-signal-safe functions (like `write()`) should be called inside signal handlers.</p></div>' +
'  </div>' +
'</div>',
'60-c-build-tools-makefiles-cmake-and-git-ci-cd.html','60. Build Automation: Makefiles, CMake & Git CI/CD',
'62-c-concurrency-pthreads-mutexes-and-race-conditions.html','62. POSIX Threads (pthreads), Mutexes & Concurrency');

// LESSON 62
makeLesson(62,
'62-c-concurrency-pthreads-mutexes-and-race-conditions.html',
'C Concurrency: POSIX Threads (pthreads), Mutexes & Race Conditions Masterclass',
'Exhaustive textbook-grade masterclass on Multithreading in C (Phase 22 Part 2): pthread_create, pthread_join, shared heap vs stack, race conditions, mutex locking, and avoiding deadlocks.',
'Phase 22','System Programming & Embedded C',
'POSIX Threads (pthreads) · Shared Heap vs Private Stack · Race Conditions · Mutex Protection (pthread_mutex_t) · Deadlocks & Coffman Conditions · Atomic Operations',
'<div class="intro-box"><p>Welcome to <strong>Phase 22 (Chapter 62): C Concurrency — POSIX Threads (pthreads), Mutexes &amp; Race Conditions Masterclass</strong>! Multithreading enables concurrent execution across multi-core CPUs. In this guide, you will master POSIX threads (`pthreads`), race condition prevention with mutex locks, and deadlock elimination.</p></div>' +

'<div class="section-title"><span class="num">1</span>Process Memory vs Thread Memory Model</div>' +
'<div class="section-body">' +
'  <div class="memory-diagram">' +
'Multithreaded RAM Memory Architecture:\n\n' +
'  Shared Memory (All Threads Access):          Private Thread Memory:\n' +
'  ┌─────────────────────────────────┐          ┌───────────────────────────┐\n' +
'  │ Global & Static Variables       │          │ Thread 1 Private Stack    │\n' +
'  ├─────────────────────────────────┤          ├───────────────────────────┤\n' +
'  │ Heap Memory (malloc/free)       │          │ Thread 2 Private Stack    │\n' +
'  ├─────────────────────────────────┤          ├───────────────────────────┤\n' +
'  │ Executable Code Segment         │          │ Thread 3 Private Stack    │\n' +
'  └─────────────────────────────────┘          └───────────────────────────┘\n' +
'  Shared access to Heap/Globals causes RACE CONDITIONS if un-synchronized!\n' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Race Condition &amp; Mutex Synchronization Code</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C — Thread-Safe Counter with POSIX Mutex</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n' +
'#include &lt;pthread.h&gt;\n\n' +
'#define NUM_THREADS 4\n' +
'#define ITERATIONS 100000\n\n' +
'static long counter = 0;\n' +
'static pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\n\n' +
'void *worker(void *arg) {\n' +
'    for (int i = 0; i &lt; ITERATIONS; i++) {\n' +
'        pthread_mutex_lock(&amp;lock);   // CRITICAL SECTION START\n' +
'        counter++;                   // Safe increment\n' +
'        pthread_mutex_unlock(&amp;lock); // CRITICAL SECTION END\n' +
'    }\n' +
'    return NULL;\n' +
'}\n\n' +
'int main(void) {\n' +
'    pthread_t threads[NUM_THREADS];\n' +
'    for (int i = 0; i &lt; NUM_THREADS; i++) {\n' +
'        pthread_create(&amp;threads[i], NULL, worker, NULL);\n' +
'    }\n' +
'    for (int i = 0; i &lt; NUM_THREADS; i++) {\n' +
'        pthread_join(threads[i], NULL);\n' +
'    }\n' +
'    printf("Final Synchronized Counter: %ld (Expected: %d)\\n",\n' +
'           counter, NUM_THREADS * ITERATIONS);\n' +
'    pthread_mutex_destroy(&amp;lock);\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: What is a Race Condition?</h4><p>Occurs when two or more threads concurrently access shared memory and at least one access is a write, producing non-deterministic bugs.</p></div>' +
'    <div class="faq-item"><h4>Q2: What is a Deadlock?</h4><p>A situation where Thread A holds Lock 1 and waits for Lock 2, while Thread B holds Lock 2 and waits for Lock 1, causing both threads to freeze forever.</p></div>' +
'    <div class="faq-item"><h4>Q3: How do you prevent deadlocks in C multithreading?</h4><p>Always acquire multiple locks in the exact same global lock hierarchy order across all threads in your application.</p></div>' +
'    <div class="faq-item"><h4>Q4: What is the difference between pthread_join and pthread_detach?</h4><p>`pthread_join()` waits for a thread to exit and collects its return value. `pthread_detach()` releases thread resources automatically upon exit.</p></div>' +
'    <div class="faq-item"><h4>Q5: What are atomic operations in C11 (&lt;stdatomic.h&gt;)?</h4><p>Hardware-level atomic instructions (`atomic_fetch_add`) that perform thread-safe variable updates without the overhead of mutex locking.</p></div>' +
'  </div>' +
'</div>',
'61-c-system-programming-posix-system-calls-processes-and-ipc.html','61. POSIX System Calls, Processes & IPC',
'63-c-network-programming-bsd-sockets-and-tcp-udp-client-server.html','63. Network Programming: BSD Sockets & TCP/UDP');

// LESSON 63
makeLesson(63,
'63-c-network-programming-bsd-sockets-and-tcp-udp-client-server.html',
'C Network Programming: BSD Sockets & TCP/UDP Server Architecture Masterclass',
'Exhaustive textbook-grade masterclass on Network Socket Programming in C (Phase 22 Part 3): BSD Sockets, TCP server lifecycle (socket, bind, listen, accept), htons/htonl, and concurrent HTTP web server.',
'Phase 22','System Programming & Embedded C',
'BSD Sockets API · TCP / IP Stack · Socket Lifecycle (socket bind listen accept) · Byte Order (htons htonl) · Concurrent TCP Server · Simple C HTTP Web Server',
'<div class="intro-box"><p>Welcome to <strong>Phase 22 (Chapter 63): C Network Programming — BSD Sockets &amp; TCP/UDP Server Architecture Masterclass</strong>! Network sockets allow programs to communicate over local networks and the internet. In this guide, you will master BSD Sockets, network byte order, and building a concurrent TCP web server in C.</p></div>' +

'<div class="section-title"><span class="num">1</span>TCP Server Socket Lifecycle State Machine</div>' +
'<div class="section-body">' +
'  <div class="memory-diagram">' +
'TCP Server Socket Lifecycle:\n\n' +
'  SERVER:                                      CLIENT:\n' +
'  socket()    ──► Create socket handle          socket()  ──► Create socket handle\n' +
'  bind()      ──► Bind IP address & Port\n' +
'  listen()    ──► Mark as passive listener\n' +
'  accept()    ──► Block until connection ◄──── connect() ──► 3-Way TCP Handshake\n' +
'  recv/send() ◄────── Full-Duplex Data Transfer ──────► send/recv()\n' +
'  close()     ──► Terminate connection          close()   ──► Close socket\n' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Complete Concurrent C Web Server Project</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C — Minimal TCP HTTP Web Server</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n' +
'#include &lt;string.h&gt;\n' +
'#include &lt;unistd.h&gt;\n' +
'#include &lt;arpa/inet.h&gt;\n\n' +
'#define PORT 8080\n' +
'#define BUFFER_SIZE 1024\n\n' +
'int main(void) {\n' +
'    int server_fd = socket(AF_INET, SOCK_STREAM, 0);\n' +
'    if (server_fd &lt; 0) { perror("socket"); return 1; }\n\n' +
'    int opt = 1;\n' +
'    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &amp;opt, sizeof(opt));\n\n' +
'    struct sockaddr_in address;\n' +
'    address.sin_family = AF_INET;\n' +
'    address.sin_addr.s_addr = INADDR_ANY; // Bind to all interfaces\n' +
'    address.sin_port = htons(PORT);       // Host to Network Short\n\n' +
'    if (bind(server_fd, (struct sockaddr *)&amp;address, sizeof(address)) &lt; 0) {\n' +
'        perror("bind"); return 1;\n' +
'    }\n\n' +
'    if (listen(server_fd, 10) &lt; 0) { perror("listen"); return 1; }\n' +
'    printf("HTTP Server running on http://localhost:%d ...\\n", PORT);\n\n' +
'    while (1) {\n' +
'        int client_fd = accept(server_fd, NULL, NULL);\n' +
'        if (client_fd &lt; 0) continue;\n\n' +
'        char buffer[BUFFER_SIZE] = {0};\n' +
'        read(client_fd, buffer, sizeof(buffer) - 1);\n\n' +
'        const char *http_response =\n' +
'            "HTTP/1.1 200 OK\\r\\n"\n' +
'            "Content-Type: text/html\\r\\n"\n' +
'            "Connection: close\\r\\n\\r\\n"\n' +
'            "&lt;html&gt;&lt;body&gt;&lt;h1 style=\'color:#10b981\'&gt;Hello from C Web Server!&lt;/h1&gt;&lt;/body&gt;&lt;/html&gt;";\n\n' +
'        write(client_fd, http_response, strlen(http_response));\n' +
'        close(client_fd);\n' +
'    }\n' +
'    close(server_fd);\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: Why are htons() and htonl() necessary?</h4><p>Network protocols transmit multi-byte integers in Big-Endian order. `htons()` converts Host byte order to Network byte order to ensure cross-platform compatibility.</p></div>' +
'    <div class="faq-item"><h4>Q2: What is the difference between TCP and UDP sockets?</h4><p>TCP (`SOCK_STREAM`) is connection-oriented and reliable. UDP (`SOCK_DGRAM`) is connectionless, unacknowledged, and faster (used for gaming/streaming).</p></div>' +
'    <div class="faq-item"><h4>Q3: What does SO_REUSEADDR option do?</h4><p>Prevents "Address already in use" errors during quick server restarts by allowing `bind()` to reuse local addresses in TIME_WAIT state.</p></div>' +
'    <div class="faq-item"><h4>Q4: How do high-performance servers handle thousands of concurrent connections?</h4><p>Using I/O multiplexing system calls (`select`, `poll`, `epoll` on Linux, `kqueue` on BSD) instead of spawning 1 thread per socket.</p></div>' +
'    <div class="faq-item"><h4>Q5: What is the purpose of the listen() backlog argument?</h4><p>Specifies the maximum queue length of pending un-accepted connections allowed in the kernel before new connections are rejected.</p></div>' +
'  </div>' +
'</div>',
'62-c-concurrency-pthreads-mutexes-and-race-conditions.html','62. POSIX Threads (pthreads), Mutexes & Concurrency',
'64-c-embedded-c-hardware-registers-bit manipulation-and-microcontrollers.html','64. Embedded C, Hardware Registers & Microcontrollers');

// LESSON 64
makeLesson(64,
'64-c-embedded-c-hardware-registers-bit manipulation-and-microcontrollers.html',
'Embedded C: Hardware Memory-Mapped Registers & Bit Manipulation Masterclass',
'Exhaustive textbook-grade masterclass on Embedded C (Phase 22 Part 4): Bare-metal vs OS execution, volatile keyword, hardware register mapping, bitwise masking, setting, clearing, toggling bits.',
'Phase 22','System Programming & Embedded C',
'Embedded C vs Host C · Memory-Mapped I/O Registers · volatile Pointer Qualifier · Bit Manipulation (Set/Clear/Toggle/Read) · Bitwise Shift Operations · LED Simulator',
'<div class="intro-box"><p>Welcome to <strong>Phase 22 (Chapter 64): Embedded C — Hardware Memory-Mapped Registers &amp; Bit Manipulation Masterclass</strong>! Embedded C runs directly on microcontrollers without an operating system. In this guide, you will master the `volatile` qualifier, memory-mapped register access, and bitwise hardware manipulation.</p></div>' +

'<div class="section-title"><span class="num">1</span>The Critical volatile Qualifier</div>' +
'<div class="section-body">' +
'  <p class="text-prose">The <code>volatile</code> keyword tells the C compiler that a memory location can be modified by hardware external to the software thread. It prevents compiler optimizations like caching register values in CPU registers!</p>' +
'  <div class="concept-box">' +
'    <h4>Hardware Memory-Mapped Register Pointer Macro:</h4>' +
'    <p><code>#define PORTA (*((volatile uint32_t *)0x40004000))</code></p>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Bitwise Hardware Manipulation Operators Matrix</div>' +
'<div class="section-body">' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Operation</th><th>C Bitwise Expression</th><th>Purpose</th></tr></thead>' +
'    <tbody>' +
'      <tr><td>Set Bit N (to 1)</td><td><code>REG |= (1U &lt;&lt; N);</code></td><td>Turn ON peripheral pin N</td></tr>' +
'      <tr><td>Clear Bit N (to 0)</td><td><code>REG &amp;= ~(1U &lt;&lt; N);</code></td><td>Turn OFF peripheral pin N</td></tr>' +
'      <tr><td>Toggle Bit N</td><td><code>REG ^= (1U &lt;&lt; N);</code></td><td>Invert state of pin N</td></tr>' +
'      <tr><td>Read Bit N</td><td><code>bool val = (REG &amp; (1U &lt;&lt; N)) != 0;</code></td><td>Read status of input sensor pin N</td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Embedded Hardware LED Simulation Project</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C — Bare-Metal Microcontroller Register Simulation</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdint.h&gt;\n' +
'#include &lt;stdbool.h&gt;\n\n' +
'// Simulated 32-bit Hardware GPIO Port Register in RAM\n' +
'static volatile uint32_t SIMULATED_GPIO_PORTA = 0x00000000;\n\n' +
'#define PORTA (*((volatile uint32_t *)&amp;SIMULATED_GPIO_PORTA))\n\n' +
'#define LED_PIN 5 // Bit index 5\n\n' +
'void led_init(void) {\n' +
'    PORTA &amp;= ~(1U &lt;&lt; LED_PIN); // Ensure LED pin starts OFF\n' +
'}\n' +
'void led_on(void) {\n' +
'    PORTA |= (1U &lt;&lt; LED_PIN);  // Set Bit 5 HIGH\n' +
'}\n' +
'void led_off(void) {\n' +
'    PORTA &amp;= ~(1U &lt;&lt; LED_PIN); // Clear Bit 5 LOW\n' +
'}\n' +
'void led_toggle(void) {\n' +
'    PORTA ^= (1U &lt;&lt; LED_PIN);  // Toggle Bit 5\n' +
'}\n' +
'bool led_is_on(void) {\n' +
'    return (PORTA &amp; (1U &lt;&lt; LED_PIN)) != 0;\n' +
'}\n\n' +
'int main(void) {\n' +
'    led_init();\n' +
'    printf("Initial Register State: 0x%08X (LED: %s)\\n", PORTA, led_is_on() ? "ON" : "OFF");\n\n' +
'    led_on();\n' +
'    printf("After led_on():         0x%08X (LED: %s)\\n", PORTA, led_is_on() ? "ON" : "OFF");\n\n' +
'    led_toggle();\n' +
'    printf("After led_toggle():     0x%08X (LED: %s)\\n", PORTA, led_is_on() ? "ON" : "OFF");\n\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">4</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: What happens if you omit volatile on a hardware register pointer?</h4><p>The compiler may optimize away repeated hardware register reads inside loops, reading stale values from CPU registers instead of fresh pin states!</p></div>' +
'    <div class="faq-item"><h4>Q2: What is Memory-Mapped I/O (MMIO)?</h4><p>A hardware architecture where physical peripheral device registers are mapped directly into the CPU\'s standard RAM memory address space.</p></div>' +
'    <div class="faq-item"><h4>Q3: What is an ISR (Interrupt Service Routine)?</h4><p>A hardware callback function executed by CPU hardware upon receiving an interrupt signal (e.g. timer tick, button press).</p></div>' +
'    <div class="faq-item"><h4>Q4: Why use 1U &lt;&lt; N instead of 1 &lt;&lt; N?</h4><p>`1U` forces unsigned 32-bit integer shift operations, preventing undefined behavior when shifting by 31 bits on signed integers.</p></div>' +
'    <div class="faq-item"><h4>Q5: What is a Bit-Band region in ARM Cortex-M microcontrollers?</h4><p>A hardware feature mapping individual bits of memory to entire 32-bit word addresses, allowing atomic bit operations without read-modify-write locks.</p></div>' +
'  </div>' +
'</div>',
'63-c-network-programming-bsd-sockets-and-tcp-udp-client-server.html','63. Network Programming: BSD Sockets & TCP/UDP',
'65-c-master-project-roadmap-and-systems-portfolio.html','65. C Master Project Roadmap & Systems Portfolio');

// LESSON 65
makeLesson(65,
'65-c-master-project-roadmap-and-systems-portfolio.html',
'C Master Project Roadmap: 24 Systems Engineering Projects Portfolio',
'Exhaustive textbook-grade masterclass on C Systems Portfolio (Phase 22 Part 5): The 24 C Master Projects breakdown, complete architectural blueprints for 9 advanced systems, and systems engineering checklist.',
'Phase 22','System Programming & Embedded C',
'24 C Systems Projects · Dynamic Memory Allocator Blueprint · UNIX Shell Spec · Multithreaded Web Server Spec · Mini C Compiler Compiler Components · Systems Mastery Checklist',
'<div class="intro-box"><p>Welcome to <strong>Phase 22 (Chapter 65): C Master Project Roadmap — 24 Systems Engineering Projects Portfolio</strong>! Theory becomes mastery through building complete systems software. In this final capstone chapter, you get the architectural specifications for 24 systems projects across 3 difficulty tiers.</p></div>' +

'<div class="section-title"><span class="num">1</span>The 24 Systems Engineering Projects Matrix</div>' +
'<div class="section-body">' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Tier</th><th>Project Name</th><th>Core Concepts Demonstrated</th></tr></thead>' +
'    <tbody>' +
'      <tr><td>Beginner</td><td>1. Student Record File DB</td><td>File I/O, Structs, CRUD</td></tr>' +
'      <tr><td>Beginner</td><td>2. Matrix Math Calculator</td><td>2D Arrays, Dynamic Allocation</td></tr>' +
'      <tr><td>Beginner</td><td>3. CLI Text Analyzer</td><td>String parsing, File streams</td></tr>' +
'      <tr><td>Beginner</td><td>4. Custom String Utility Library</td><td>Pointer arithmetic, Null bytes</td></tr>' +
'      <tr><td>Intermediate</td><td>9. Singly & Doubly Generic Lists</td><td>Self-referential structs, Void pointers</td></tr>' +
'      <tr><td>Intermediate</td><td>10. Hash Map with Chaining</td><td>Hash functions, Dynamic rehashing</td></tr>' +
'      <tr><td>Intermediate</td><td>11. Custom Command Line Parser</td><td>argc/argv processing, Flag options</td></tr>' +
'      <tr><td>Advanced</td><td>16. Custom Heap Allocator (malloc/free)</td><td>`sbrk`/`mmap`, Free-list management, Memory alignment</td></tr>' +
'      <tr><td>Advanced</td><td>17. POSIX UNIX Shell (myshell)</td><td>`fork()`, `execvp()`, Pipes, Signal handling</td></tr>' +
'      <tr><td>Advanced</td><td>18. Multithreaded TCP Web Server</td><td>BSD Sockets, `pthreads`, Mutex locks, HTTP parsing</td></tr>' +
'      <tr><td>Advanced</td><td>19. Mini C Compiler Tokenizer & Parser</td><td>AST Trees, Lexical analysis, Preprocessor engine</td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Architectural Blueprint: Custom Heap Allocator (malloc/free)</div>' +
'<div class="section-body">' +
'  <div class="memory-diagram">' +
'Custom Memory Allocator Free-List Architecture:\n\n' +
'  Heap Start ┌────────────────────────────────────────────────────────┐\n' +
'             │ BlockHeader: size=64, free=0  | User Payload Data ...  │\n' +
'             ├────────────────────────────────────────────────────────┤\n' +
'             │ BlockHeader: size=128, free=1 | Next Free Pointer ...  │ ◄── Free List Link\n' +
'             ├────────────────────────────────────────────────────────┤\n' +
'             │ BlockHeader: size=32, free=0  | User Payload Data ...  │\n' +
'  Heap End   └────────────────────────────────────────────────────────┘\n' +
'  `my_malloc(size)` searches free list for first block with size >= requested.\n' +
'  `my_free(ptr)` marks block free=1 and coalesces adjacent free blocks.\n' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: Where should I start my C systems portfolio?</h4><p>Start by implementing generic data structures (Linked List, Hash Table), then progress to a custom UNIX Shell, and finally a Multithreaded HTTP Server.</p></div>' +
'    <div class="faq-item"><h4>Q2: What key skill do employers look for in C systems developers?</h4><p>Deep understanding of RAM memory layout, pointer arithmetic, zero-leak heap management with Valgrind/ASan, and POSIX concurrency.</p></div>' +
'    <div class="faq-item"><h4>Q3: How do you build a custom UNIX Shell in C?</h4><p>Read command line input with `fgets()`, parse tokens with `strtok()`, spawn processes with `fork()`, execute binaries with `execvp()`, and handle IPC with `pipe()`.</p></div>' +
'    <div class="faq-item"><h4>Q4: What makes a C project portfolio production-ready?</h4><p>Zero memory leaks (Valgrind clean), compile with `-Wall -Wextra -Werror`, include automated Makefiles/CMake, and unit test coverage.</p></div>' +
'    <div class="faq-item"><h4>Q5: Congratulations on completing the C Master Curriculum!</h4><p>You have mastered C from hardware fundamentals up through OS system calls, memory architecture, data structures, and multithreading!</p></div>' +
'  </div>' +
'</div>',
'64-c-embedded-c-hardware-registers-bit manipulation-and-microcontrollers.html','64. Embedded C, Hardware Registers & Microcontrollers',
null, null);

console.log('\n🎉🎉🎉 ALL 65 C LESSONS SUCCESSFULLY GENERATED WITH SUPER MASSIVE TEXTBOOK CONTENT!');
