const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// Full C Masterclass Curriculum - 22 Phases & 65 Master Chapters!
const C_CURRICULUM = [
  {
    id: 'phase1', tag: 'Phase 01', title: 'C Basics & Architecture', icon: '⚡',
    desc: 'What is C?, History (Dennis Ritchie) & Modern Uses, C Features, C vs C++, C Program Structure, What is a Compiler?, Source Code (.c) vs Executable (.exe), The 4-Stage Compilation Pipeline (Preprocessing, Compiling, Assembling, Linking), First C Program breakdown (#include <stdio.h>, int main(void), printf, \\n, return 0, semicolon, braces, comments), and 3 Error Types (Syntax, Runtime, Logical).',
    lessons: [
      { num: 1, file: '01-c-basics-and-program-structure.html', title: '1. C Fundamentals & Program Architecture', subtopics: 'C ante enti? · History & Uses · Features · C vs C++ · Program Structure · Compiler & 4-Stage Pipeline · First Program Breakdown · Comments, Semicolons & Braces · 3 Error Types' }
    ]
  },
  {
    id: 'phase2', tag: 'Phase 02', title: 'Variables & Data Types', icon: '📦',
    desc: 'Variables ante enti?, RAM Memory Model & Addresses, Declaration vs Initialization vs Assignment, Naming Rules, Local vs Global Variables, Stack Scope & Lifetime, Constants (const vs #define), Primary Types (int, float, double, char, _Bool), Modifiers (short, long, signed, unsigned), Integer Ranges & 2\'s Complement, sizeof Operator, Format Specifiers Master Guide (%d, %u, %f, %lf, %c, %s, %p), and Implicit Coercion vs Explicit Type Casting.',
    lessons: [
      { num: 2, file: '02-c-variables-declaration-and-memory-model.html', title: '2. Variables, Memory Model & Scope', subtopics: 'Variables ante enti? · RAM Memory Model · Declaration, Initialization & Assignment · Naming Rules · Local vs Global Scope · Stack Lifetime · const vs #define' },
      { num: 3, file: '03-c-data-types-format-specifiers-and-type-casting.html', title: '3. Data Types, sizeof & Type Casting', subtopics: 'Primary Types (int, float, double, char, _Bool) · Modifiers (short, long, signed, unsigned) · Integer Ranges · sizeof Operator · Format Specifiers (%d, %u, %f, %lf, %p) · Type Casting' }
    ]
  },
  {
    id: 'phase3', tag: 'Phase 03', title: 'Input & Operators', icon: '⚡',
    desc: 'User Input with scanf(), Address operator (&), Reading ints, floats, chars, and strings, Input buffer problems (newline pitfall) & fixes, fgets() for safe string reading, Input validation, Arithmetic, Relational, Logical (short-circuit), Increment/Decrement (prefix vs postfix), Bitwise operators, Ternary operator, Precedence & Associativity Table, Integer Division, and 6 Practice Programs.',
    lessons: [
      { num: 4, file: '04-c-user-input-scanf-and-buffer-handling.html', title: '4. User Input (scanf, fgets & Buffer Traps)', subtopics: 'scanf() Mechanics · Address Operator (&) · Reading Primitives & Strings · Stdin Buffer Pitfall (\\n) · fgets() Safe Text Input · Input Validation' },
      { num: 5, file: '05-c-operators-expressions-and-precedence.html', title: '5. Operators, Precedence & 6 Programs', subtopics: 'Arithmetic & Modulus · Relational & Logical · Prefix vs Postfix (++x/x++) · Bitwise · Ternary · Precedence Table · 6 Practice Programs' }
    ]
  },
  {
    id: 'phase4', tag: 'Phase 04', title: 'Conditional Statements & Branching', icon: '🔀',
    desc: 'if, if-else, else-if ladders, nested if, multiple conditions with logical AND/OR/NOT, short-circuit evaluation, ternary expressions, switch-case-break-default, jump table mechanics, fall-through behavior, character comparisons, common condition mistakes (if (x = 5), dangling else), and 7 practice programs.',
    lessons: [
      { num: 6, file: '06-c-conditional-branching-if-else-and-logical-operators.html', title: '6. if-else Ladders, Nested if & Logical Logic', subtopics: 'Boolean Truth in C · if, if-else & else-if · Nested if & Guard Clauses · Logical Operators & Short-Circuit · Ternary · Comparing Chars · Common Traps' },
      { num: 7, file: '07-c-switch-case-and-decision-practice-programs.html', title: '7. switch-case, Fall-Through & 7 Programs', subtopics: 'switch-case Mechanics · Jump Tables · break & default · Fall-Through Behavior · if-else vs switch · 7 Practice Programs (Leap Year, Calculator, Largest of 3)' }
    ]
  },
  {
    id: 'phase5', tag: 'Phase 05', title: 'Loops & Iterations', icon: '🔁',
    desc: 'Why loops are needed, The 3 Pillars (Init, Condition, Update), for loop, entry-controlled while loop, exit-controlled do-while loop, break and continue jump controls, infinite loop causes and fixes, nested loops & grid coordinates, array/string iteration, and 9 core practice algorithms (Factorial, Fibonacci, Prime, Armstrong, Reverse, Digits, Star & Number Patterns).',
    lessons: [
      { num: 8, file: '08-c-loops-for-while-do-while-and-control-flow.html', title: '8. for, while, do-while, break & continue', subtopics: 'Why Loops are Needed · 3 Pillars of a Loop · for Loop Mechanics · while vs do-while · break & continue · Infinite Loops · Array & String Traversal' },
      { num: 9, file: '09-c-nested-loops-patterns-and-practice-programs.html', title: '9. Nested Loops, Patterns & 9 Core Programs', subtopics: 'Nested Loops Architecture · Star Patterns (Triangles, Pyramids) · Number Patterns · 9 Practice Programs (Prime, Armstrong, Fibonacci, Factorial, Reverse)' }
    ]
  },
  {
    id: 'phase6', tag: 'Phase 06', title: 'Functions & Modular Architecture', icon: '🧩',
    desc: 'Deep-dive 4-chapter masterclass on Functions: declaration & prototypes, memory segments & static local variables, pass-by-value vs pass-by-reference pointers, CPU call stack frames, recursion theory, and 5 modular software projects.',
    lessons: [
      { num: 10, file: '10-c-functions-declaration-definition-and-prototypes.html', title: '10. Function Architecture & Prototypes', subtopics: 'Function ante enti? · Modular Programming · 3-Step Lifecycle · Prototypes vs Definitions · Parameters vs Arguments · void Return Types' },
      { num: 11, file: '11-c-variable-scope-lifetime-and-static-storage.html', title: '11. Scope, static Variables & Header Files', subtopics: 'RAM Memory Segments (Stack, Data, BSS) · Local vs Global Scope · static Local Variables · Variable Shadowing · Header Files (.h)' },
      { num: 12, file: '12-c-parameter-passing-value-vs-reference.html', title: '12. Pass-by-Value vs Pass-by-Address', subtopics: 'Call by Value Copying · Stack Frame Isolation · Pass by Address (&var) · Pointer Mutation (*ptr) · Returning Multiple Values via Pointers' },
      { num: 13, file: '13-c-recursion-call-stack-and-modular-projects.html', title: '13. Recursion, Call Stack & 5 Projects', subtopics: 'Recursion Inductive Model · Base Cases · CPU Stack Frame Pushing/Unwinding · Stack Overflow Prevention · 5 Modular Projects (Calculator, Grading, Utilities)' }
    ]
  },
  {
    id: 'phase7', tag: 'Phase 07', title: 'Arrays & Memory Organization', icon: '📊',
    desc: 'Comprehensive 4-chapter masterclass on Arrays: 1D contiguous RAM memory models, zero-based offset formulas, 2D/3D Row-Major matrices, matrix addition/transposition, passing arrays to functions & pointer decay, and 6 core algorithmic operations (Search, Bubble Sort, Min/Max, Reverse, Merge).',
    lessons: [
      { num: 14, file: '14-c-arrays-fundamentals-memory-model-and-indexing.html', title: '14. 1D Arrays, RAM Architecture & Indexing', subtopics: 'Array ante enti? · Contiguous Memory Layout · Zero-Based Offset Formula · sizeof Length Idiom · Bounds Checking & Buffer Overflow' },
      { num: 15, file: '15-c-multidimensional-arrays-and-matrices.html', title: '15. 2D/3D Arrays, Row-Major & Matrices', subtopics: '2D/3D Array Architecture · Row-Major Memory Mapping Formula · Matrix Addition & Transpose · Array of Characters vs Strings' },
      { num: 16, file: '16-c-passing-arrays-to-functions-and-pointer-decay.html', title: '16. Passing Arrays to Functions & Pointer Decay', subtopics: 'Pointer Decay Mechanics · Why sizeof(arr) Fails Inside Functions · Explicit Size Passing · const Read-Only Arrays · Array Limitations' },
      { num: 17, file: '17-c-array-algorithms-searching-sorting-and-manipulation.html', title: '17. Array Algorithms (Search, Sort & Reverse)', subtopics: 'Sum & Average · Min & Max in O(N) · Linear Search Algorithm · Bubble Sort Optimization · In-Place Array Reversal · Merging Arrays' }
    ]
  },
  {
    id: 'phase8', tag: 'Phase 08', title: 'Strings & Text Processing', icon: '🔤',
    desc: 'Exhaustive 3-chapter masterclass on C Strings: null-terminator sentinel (\'\\0\') architecture, stack arrays vs read-only string literals, safe text input with fgets() and strcspn(), the complete <string.h> suite (strlen, strcpy, strncpy, strcat, strcmp, strchr, strstr), buffer overflow security, manual re-implementations, and 6 text processing projects.',
    lessons: [
      { num: 18, file: '18-c-strings-null-terminator-and-safe-io.html', title: '18. Strings, Null Terminator & Safe I/O', subtopics: 'Strings ante enti? · Null Terminator (\\0) Sentinel · Stack Array vs Read-Only Literal · scanf() Traps vs fgets() · strcspn() Newline Removal · String Arrays' },
      { num: 19, file: '19-c-string-library-functions-and-security.html', title: '19. <string.h> Functions & Buffer Security', subtopics: 'strlen() Complexity · strcpy vs strncpy · strcat vs strncat · strcmp & strncmp · strchr & strstr · Buffer Overflow CVEs · Manual Reimplementations' },
      { num: 20, file: '20-c-string-algorithms-and-text-processing-projects.html', title: '20. String Algorithms & 6 Text Projects', subtopics: 'Two-Pointer String Reversal · Palindrome Checker · State Machine Word Counter · ASCII Frequency Array · Username Validator · Text Analyzer' }
    ]
  },
  {
    id: 'phase9', tag: 'Phase 09', title: 'Pointers & Memory Architecture', icon: '🎯',
    desc: 'Exhaustive 3-chapter masterclass on C Pointers: physical RAM memory addressing, address-of (&) and dereference (*) operators, null/wild/dangling pointer traps, pointer arithmetic scaling, pointers & arrays/strings, const qualifiers (pointer to const vs const pointer), generic void* pointers, double pointers (int**), function pointers (callbacks), and the 5 golden safety rules.',
    lessons: [
      { num: 21, file: '21-c-pointers-memory-addresses-and-dereferencing.html', title: '21. Pointers, RAM Addresses & Dereferencing', subtopics: 'Memory Addresses & & Operator · Pointer Declaration & Dereferencing (*) · Pointer Types & Byte Sizes · Null, Wild & Dangling Pointers · (void*) Casting in %p' },
      { num: 22, file: '22-c-pointer-arithmetic-arrays-and-const-qualifiers.html', title: '22. Pointer Arithmetic, Arrays & const Qualifiers', subtopics: 'Pointer Arithmetic & Scaling Rule · Pointers and 1D/2D Arrays · Pointers & String Iteration · 3 Degrees of const with Pointers · Generic void* Pointers' },
      { num: 23, file: '23-c-double-pointers-function-pointers-and-safety.html', title: '23. Double Pointers, Function Pointers & Safety', subtopics: 'Double Pointers (int**) · Dynamic Pointer Reallocation · Function Pointers & Callbacks · 5 Golden Pointer Safety Commandments · Common Traps' }
    ]
  },
  {
    id: 'phase10', tag: 'Phase 10', title: 'Pointers and Functions', icon: '⚙️',
    desc: 'Exhaustive 3-chapter masterclass on Pointers and Functions in C: Passing normal values vs passing addresses, mutating caller variables in RAM, the canonical swap algorithm, returning pointers safely (Heap vs Stack pitfall), passing arrays and strings with const pointer safety, function pointer parameters, and callback architectures.',
    lessons: [
      { num: 24, file: '24-c-pointers-and-functions-call-by-reference.html', title: '24. Passing Addresses, Swapping & Returning Pointers', subtopics: 'Pass-by-Value vs Pass-by-Address · Mutating Caller Memory · Swap Algorithm & Stack Lifecycle · Returning Pointers Safely · Dangling Stack Traps' },
      { num: 25, file: '25-c-pointer-parameters-arrays-and-const-protection.html', title: '25. Array/String Pointer Parameters & const Safety', subtopics: 'Passing 1D/2D Arrays to Functions · Passing Strings (char* vs const char*) · const Pointer Parameters · Returning Multiple Values via Output Pointers' },
      { num: 26, file: '26-c-function-pointers-callbacks-and-event-systems.html', title: '26. Function Pointers, Callbacks & Event Systems', subtopics: 'Function Pointer Parameters · Callback Architecture · Custom Sorting Comparators · Predicate Filters · Jump Tables & State Machines' }
    ]
  },
  {
    id: 'phase11', tag: 'Phase 11', title: 'Structures & Data Packing', icon: '🏗️',
    desc: 'Exhaustive 3-chapter masterclass on C Structures: User-defined heterogeneous types, member access (.), memory layout & Structure Padding / Data Alignment, #pragma pack, structure comparison, structure arrays, nested structures, pointer to struct & arrow operator (->), typedef struct, self-referential structures (linked lists), structure binary file I/O (fwrite/fread), and 5 production software projects.',
    lessons: [
      { num: 27, file: '27-c-structures-declaration-memory-model-and-padding.html', title: '27. Structures, RAM Memory Model & Padding Holes', subtopics: 'struct ante enti? · Declaration & Initialization · Dot Operator (.) · RAM Memory Alignment & Padding Holes · #pragma pack(1) · Structure Comparison' },
      { num: 28, file: '28-c-structure-arrays-pointers-and-arrow-operator.html', title: '28. Structure Arrays, Pointers & Arrow Operator (->)', subtopics: 'Structure Arrays · Nested Structures · Passing Structs to Functions · Pointer to Struct & Arrow Operator (->) · typedef struct · Anonymous Structs' },
      { num: 29, file: '29-c-self-referential-structures-file-io-and-5-projects.html', title: '29. Self-Referential Structs, Binary I/O & 5 Projects', subtopics: 'Self-Referential Structs (Node*) · Binary File Serialization (fwrite/fread) · 5 Projects (Student, Employee, Inventory, Library, Contacts)' }
    ]
  },
  {
    id: 'phase12', tag: 'Phase 12', title: 'Unions, Enums & Typedef', icon: '🔀',
    desc: 'Exhaustive 3-chapter masterclass on Unions, Enums, and Typedef: Shared memory overlapping architecture (Unions vs Structs), practical variant types & hardware register bitfields, Enumerations (enum) for type-safe state machines, custom enum values, switch-case dispatchers, and expressive type aliasing with typedef.',
    lessons: [
      { num: 30, file: '30-c-unions-shared-memory-and-variant-types.html', title: '30. Unions, Shared Memory & Variant Data Types', subtopics: 'union ante enti? · Shared Overlapping RAM Layout · Struct vs Union Memory Matrix · Tagged Unions · Hardware Register Bitfields · Pointers to Unions' },
      { num: 31, file: '31-c-enumerations-custom-values-and-switch-dispatch.html', title: '31. Enumerations (enum), Custom Values & Switch', subtopics: 'enum ante enti? · Auto-Increment Constants · Custom Enum Values (HTTP Statuses) · Enum State Machines with switch · Naming Conventions' },
      { num: 32, file: '32-c-typedef-type-aliases-and-readable-architecture.html', title: '32. typedef, Type Aliases & Expressive Architecture', subtopics: 'typedef ante enti? · Expressive Type Aliases · typedef struct & union · typedef with Function Pointers · Clean API Design · Technical FAQs' }
    ]
  },
  {
    id: 'phase13', tag: 'Phase 13', title: 'Dynamic Memory Management', icon: '💾',
    desc: 'Exhaustive 3-chapter masterclass on Dynamic Memory Management in C: Stack vs Heap architecture, malloc() raw uninitialized heap allocation, calloc() zero-initialization, realloc() buffer resizing and safe temp pointers, free() deallocation mechanics, NULL guards, memory leaks, dangling pointers, double free, use-after-free (UAF), dynamic arrays/strings/structs, memory ownership, and Valgrind debugging.',
    lessons: [
      { num: 33, file: '33-c-stack-vs-heap-malloc-and-calloc.html', title: '33. Stack vs Heap, malloc(), calloc() & NULL Guards', subtopics: 'Stack vs Heap RAM Architecture · Dynamic Memory ante enti? · malloc() Mechanics · calloc() Zero-Initialization · sizeof(*ptr) Idiom · Defensive NULL Guards' },
      { num: 34, file: '34-c-realloc-free-and-the-4-deadly-heap-bugs.html', title: '34. realloc(), free() & The 4 Deadly Heap Bugs', subtopics: 'realloc() Buffer Expansion · Safe Temp Pointer Pattern · free() Deallocation · Memory Leaks · Dangling Pointers · Double Free · Use-After-Free (UAF)' },
      { num: 35, file: '35-c-dynamic-arrays-strings-structures-and-memory-debugging.html', title: '35. Dynamic Collections, Ownership & Valgrind Debugging', subtopics: 'Dynamic 1D/2D Arrays · Dynamic Strings (+1 Rule) · Dynamic Structs · Memory Ownership Architecture · Valgrind Memcheck · AddressSanitizer' }
    ]
  },
  {
    id: 'phase14', tag: 'Phase 14', title: 'File Handling & I/O Streams', icon: '📁',
    desc: 'Exhaustive 3-chapter masterclass on File Streams in C: FILE* handles, fopen() modes ("r", "w", "a", "r+", "w+"), fclose(), text I/O (fprintf, fscanf, fgets, fputs), binary I/O (fwrite, fread), random file positioning (fseek, ftell, rewind), and robust error handling (feof, ferror, errno, perror).',
    lessons: [
      { num: 36, file: '36-c-file-handling-fopen-fclose-and-text-io.html', title: '36. File Streams, fopen(), fclose() & Text I/O', subtopics: 'FILE* Handles · fopen() Modes (r, w, a, r+, w+) · fclose() · fgetc / fputc · fgets / fputs · fprintf / fscanf · Text File Pipelines' },
      { num: 37, file: '37-c-binary-file-io-fwrite-fread-and-file-positioning.html', title: '37. Binary File I/O, Struct Serialization & fseek()', subtopics: 'Binary File Modes (rb, wb) · fwrite() & fread() · Struct Serialization · Random Access Positioning (fseek, ftell, rewind) · SEEK_SET / SEEK_CUR / SEEK_END' },
      { num: 38, file: '38-c-file-error-handling-feof-ferror-and-errno.html', title: '38. File Error Handling, EOF, ferror() & errno', subtopics: 'feof() EOF Detection · ferror() Error Checking · <errno.h> System Errors · perror() & strerror() · File Copy & Log File Utility Programs' }
    ]
  },
  {
    id: 'phase15', tag: 'Phase 15', title: 'Preprocessor & Header Files', icon: '⚙️',
    desc: 'Exhaustive 3-chapter masterclass on C Preprocessor: #include mechanics, #define object-like & function-like macros, double evaluation pitfalls, conditional compilation (#if, #ifdef, #ifndef, #pragma once), include guards, multi-file modular architecture, and static/extern linkage.',
    lessons: [
      { num: 39, file: '39-c-preprocessor-directives-and-macro-pitfalls.html', title: '39. Preprocessor Directives & Macro Pitfalls', subtopics: 'Preprocessor Pipeline · #include Mechanics · Object & Function Macros · Parenthesization Rule · Double Evaluation Traps · Stringizing (#) & Token Pasting (##)' },
      { num: 40, file: '40-c-conditional-compilation-and-include-guards.html', title: '40. Conditional Compilation & Include Guards', subtopics: '#if, #ifdef, #ifndef, #else, #elif, #endif · Include Guards (#ifndef MATH_H) · #pragma once · Platform Conditional Compilation' },
      { num: 41, file: '41-c-modular-architecture-headers-linkage-and-compilation-units.html', title: '41. Modular Architecture, Headers & Linkage', subtopics: 'Header (.h) vs Source (.c) Separation · Prototype Declarations · static Internal Linkage vs extern External Linkage · Compilation Units & Object Files' }
    ]
  },
  {
    id: 'phase16', tag: 'Phase 16', title: 'Command-Line Arguments', icon: '💻',
    desc: 'Exhaustive 2-chapter masterclass on CLI Architecture: argc & argv[] parameter indexing, string-to-number conversions (atoi, strtol, strtod), argument validation, building production CLI utility tools, exit status codes (EXIT_SUCCESS / EXIT_FAILURE), and environment variables (getenv).',
    lessons: [
      { num: 42, file: '42-c-command-line-arguments-argc-argv-and-parsing.html', title: '42. Command-Line Arguments (argc, argv & Parsing)', subtopics: 'main(argc, argv) Parameters · Executable Path (argv[0]) · Argument Indexing · String Conversions (strtol, strtod) · Argument Validation & Usage Help' },
      { num: 43, file: '43-c-cli-tool-building-exit-codes-and-environment-variables.html', title: '43. Building CLI Tools, Exit Codes & Environment', subtopics: 'Building Production CLI Tools · Exit Status Codes (EXIT_SUCCESS / EXIT_FAILURE) · Environment Variables (getenv) · Option Flag Processing' }
    ]
  },
  {
    id: 'phase17', tag: 'Phase 17', title: 'Standard Library Deep-Dive', icon: '📚',
    desc: 'Exhaustive 3-chapter masterclass on the C Standard Library Header Matrix: <stdio.h>, <stdlib.h>, <string.h>, <math.h>, <ctype.h>, <time.h>, <stdbool.h>, <stdint.h>, <limits.h>, <float.h>, <assert.h>, <errno.h>, and <stddef.h>.',
    lessons: [
      { num: 44, file: '44-c-standard-library-io-utility-math-and-strings.html', title: '44. Standard Library: I/O, Utilities, Math & Strings', subtopics: '<stdio.h> · <stdlib.h> (rand, srand, qsort, bsearch) · <string.h> · <math.h> (pow, sqrt, ceil, floor) · <ctype.h> (isalpha, isdigit, toupper)' },
      { num: 45, file: '45-c-standard-library-time-booleans-and-fixed-width-integers.html', title: '45. Standard Library: Time, Booleans & Integers', subtopics: '<time.h> (time, clock, struct tm, strftime) · <stdbool.h> · <stdint.h> (int32_t, uint64_t) · <limits.h> (INT_MAX) · <float.h> (DBL_MAX)' },
      { num: 46, file: '46-c-standard-library-assertions-error-handling-and-stddef.html', title: '46. Standard Library: Assertions & Error Handling', subtopics: '<assert.h> (assert, static_assert) · <errno.h> (errno, strerror) · <stddef.h> (NULL, size_t, offsetof) · Portable C Library Architecture' }
    ]
  },
  {
    id: 'phase18', tag: 'Phase 18', title: 'Data Structures in C', icon: '🌳',
    desc: 'Exhaustive 5-chapter masterclass on Data Structures in C: Singly, Doubly & Circular Linked Lists, Stacks & Queues (Arrays vs Linked Lists), Binary Trees & Binary Search Trees (BST), Graph representations & Traversals (BFS/DFS), and Hash Tables with collision resolution.',
    lessons: [
      { num: 47, file: '47-c-data-structures-singly-doubly-and-circular-linked-lists.html', title: '47. Linked Lists: Singly, Doubly & Circular', subtopics: 'Abstract Data Types ADTs · Singly Linked Lists (Node, Insert, Delete, Search, Traverse) · Doubly Linked Lists · Circular Linked Lists' },
      { num: 48, file: '48-c-data-structures-stacks-and-queues-arrays-vs-linked-lists.html', title: '48. Stacks & Queues: Arrays vs Linked Lists', subtopics: 'Stack ADT (LIFO, Push, Pop, Peek) · Queue ADT (FIFO, Enqueue, Dequeue) · Circular Queue · Array vs Linked List Implementations' },
      { num: 49, file: '49-c-data-structures-binary-trees-and-binary-search-trees.html', title: '49. Binary Trees & Binary Search Trees (BST)', subtopics: 'Tree Architecture · Binary Search Tree BST (Insert, Search, Delete) · Tree Traversals (In-order, Pre-order, Post-order, Level-order)' },
      { num: 50, file: '50-c-data-structures-graph-representations-and-traversals.html', title: '50. Graph Representations & BFS/DFS Traversals', subtopics: 'Graph Theory · Adjacency Matrix vs Adjacency List · Breadth-First Search (BFS) · Depth-First Search (DFS) · Graph Algorithms' },
      { num: 51, file: '51-c-data-structures-hash-tables-and-collision-resolution.html', title: '51. Hash Tables & Collision Resolution', subtopics: 'Hash Table Architecture · Hash Functions · Chaining via Linked Lists · Open Addressing (Linear Probing) · O(1) Search' }
    ]
  },
  {
    id: 'phase19', tag: 'Phase 19', title: 'Algorithms & Big-O Complexity', icon: '⚡',
    desc: 'Exhaustive 3-chapter masterclass on Algorithms: Big-O time and space complexity, Linear/Binary Search, Bubble, Selection, Insertion, Merge, Quick Sort, Divide-and-Conquer, Greedy strategies, Dynamic Programming (Memoization vs Tabulation), and Backtracking.',
    lessons: [
      { num: 52, file: '52-c-algorithms-big-o-complexity-searching-and-sorting.html', title: '52. Big-O Complexity, Searching & Sorting', subtopics: 'Big-O Notation (O(1), O(log N), O(N), O(N log N), O(N^2)) · Linear vs Binary Search · Bubble, Selection, Insertion, Merge & Quick Sort' },
      { num: 53, file: '53-c-algorithms-recursion-divide-and-conquer-and-greedy-strategies.html', title: '53. Divide-and-Conquer & Greedy Strategies', subtopics: 'Recursion Mechanics · Divide-and-Conquer Paradigm · Greedy Choice Property · Fractional Knapsack · Coin Change Algorithm' },
      { num: 54, file: '54-c-algorithms-dynamic-programming-backtracking-and-graph-search.html', title: '54. Dynamic Programming, Backtracking & Search', subtopics: 'Dynamic Programming (Memoization, Tabulation, 0/1 Knapsack) · Backtracking (N-Queens, Maze) · BFS & DFS Algorithmic Pipelines' }
    ]
  },
  {
    id: 'phase20', tag: 'Phase 20', title: 'Debugging & Safe C Programming', icon: '🛡️',
    desc: 'Exhaustive 3-chapter masterclass on C Debugging & Security: Compiler warning flags (-Wall, -Wextra), GDB debugger commands, analyzing crashes (Segfaults, Buffer Overflows, UAF), defensive input validation, safe string handling, GCC AddressSanitizer, and static analysis.',
    lessons: [
      { num: 55, file: '55-c-debugging-compiler-warnings-and-gdb-debugger.html', title: '55. Compiler Warning Flags (-Wall) & GDB Debugger', subtopics: 'Compiler Flags (-Wall, -Wextra, -Wpedantic, -Werror) · Debug vs Release Builds (-g) · GDB Commands (Breakpoints, Stepping, Backtrace)' },
      { num: 56, file: '56-c-security-vulnerabilities-buffer-overflows-and-undefined-behavior.html', title: '56. Security Vulnerabilities & Undefined Behavior', subtopics: 'Segmentation Fault Diagnosis · Buffer Overflows · Out-of-Bounds Access · Uninitialized Variables · Undefined Behavior · Integer Overflow' },
      { num: 57, file: '57-c-defensive-c-programming-sanitizers-and-static-analysis.html', title: '57. Defensive Programming, Sanitizers & Static Analysis', subtopics: 'Defensive Input Validation · Safe Strings (snprintf, strncpy) · GCC AddressSanitizer (-fsanitize=address) · Static Analysis (cppcheck)' }
    ]
  },
  {
    id: 'phase21', tag: 'Phase 21', title: 'Build Systems, Makefiles & CMake', icon: '🛠️',
    desc: 'Exhaustive 3-chapter masterclass on C Build Systems: Multi-file project compilation pipelines, static libraries (.a/.lib) vs dynamic shared libraries (.so/.dll), GNU Make (Makefiles), CMake (CMakeLists.txt), Git version control, and CI/CD automated build pipelines.',
    lessons: [
      { num: 58, file: '58-c-multi-file-projects-compilation-pipeline-and-linking.html', title: '58. Multi-File Projects & Compilation Pipeline', subtopics: 'Multi-File Architecture · Header/Source Separation · Object File Generation (.o) · Symbol Resolution & Linker Mechanics' },
      { num: 59, file: '59-c-libraries-static-lib-vs-shared-so-dll-libraries.html', title: '59. Static (.a) vs Dynamic Shared (.so / .dll) Libraries', subtopics: 'Static Libraries (.a / .lib) · Shared Dynamic Libraries (.so / .dll) · Compiler Shared Flags (-shared -fPIC) · Dynamic Loading (dlopen)' },
      { num: 60, file: '60-c-build-tools-makefiles-cmake-and-git-ci-cd.html', title: '60. Build Automation: Makefiles, CMake & Git CI/CD', subtopics: 'GNU Make (Makefile syntax, targets, rules) · CMake (CMakeLists.txt) · Debug/Release Targets · Git Version Control & CI/CD Pipelines' }
    ]
  },
  {
    id: 'phase22', tag: 'Phase 22', title: 'System Programming & Embedded C', icon: '🚀',
    desc: 'Exhaustive 5-chapter masterclass on System-Level & Embedded C: POSIX system calls, processes (fork, exec), IPC (Pipes, Signals), POSIX Multi-threading (pthreads, mutexes), BSD Sockets network programming, Memory-Mapped Files (mmap), Embedded C hardware register bit manipulation, microcontrollers, and the Master Project Roadmap (24 Projects).',
    lessons: [
      { num: 61, file: '61-c-system-programming-posix-system-calls-processes-and-ipc.html', title: '61. POSIX System Calls, Processes & IPC', subtopics: 'POSIX System Calls (open, read, write) · Process Management (fork, exec, wait) · Inter-Process Communication IPC (Pipes, Signals)' },
      { num: 62, file: '62-c-concurrency-pthreads-mutexes-and-race-conditions.html', title: '62. POSIX Threads (pthreads), Mutexes & Concurrency', subtopics: 'Multi-Threading (pthread_create, pthread_join) · Race Conditions · Mutex Lock Protection (pthread_mutex_t) · Deadlock Prevention' },
      { num: 63, file: '63-c-network-programming-bsd-sockets-and-tcp-udp-client-server.html', title: '63. Network Programming: BSD Sockets & TCP/UDP', subtopics: 'BSD Socket API (socket, bind, listen, accept, connect) · TCP/UDP Client-Server Architecture · HTTP Parsing Engine' },
      { num: 64, file: '64-c-embedded-c-hardware-registers-bit manipulation-and-microcontrollers.html', title: '64. Embedded C, Hardware Registers & Microcontrollers', subtopics: 'Embedded C Architecture · volatile Qualifier · Memory-Mapped Registers · Bitwise Register Manipulation (REG |= (1<<3)) · Portability' },
      { num: 65, file: '65-c-master-project-roadmap-and-systems-portfolio.html', title: '65. C Master Project Roadmap & Systems Portfolio', subtopics: '8 Beginner Projects · 7 Intermediate Systems · 9 Advanced Systems (Linked List Lib, Shell, HTTP Client, TCP Chat Server, Custom Allocator)' }
    ]
  }
];

function generateCAccordionSidebar(currentFile = null) {
  let html = '    <div class="sidebar-accordion">\n';

  C_CURRICULUM.forEach(phase => {
    const hasActive = phase.lessons.some(l => l.file === currentFile);
    const isOpen = hasActive || (currentFile === null && phase.id === 'phase1');
    const activeHeaderClass = isOpen ? ' active' : '';
    const openContentClass = isOpen ? ' open' : '';

    html += '      <!-- ' + phase.tag + ': ' + phase.title + ' -->\n';
    html += '      <button class="accordion-header' + activeHeaderClass + '" onclick="toggleAccordion(this)">\n';
    html += '        <div class="accordion-header-main">\n';
    html += '          <span class="phase-icon-box">' + phase.icon + '</span>\n';
    html += '          <div class="phase-info">\n';
    html += '            <span class="phase-tag">' + phase.tag + '</span>\n';
    html += '            <span class="phase-title">' + phase.title + '</span>\n';
    html += '          </div>\n';
    html += '        </div>\n';
    html += '        <div class="accordion-header-meta">\n';
    html += '          <span class="phase-count-badge">' + phase.lessons.length + ' Ch</span>\n';
    html += '          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">\n';
    html += '            <polyline points="9 18 15 12 9 6"></polyline>\n';
    html += '          </svg>\n';
    html += '        </div>\n';
    html += '      </button>\n';
    html += '      <div class="accordion-content' + openContentClass + '">\n';

    phase.lessons.forEach(l => {
      const isActive = l.file === currentFile ? ' class="active"' : '';
      html += '        <a href="/blog-c/' + l.file + '"' + isActive + '>' + l.title + '</a>\n';
    });

    html += '      </div>\n\n';
  });

  html += '    </div>\n';
  return html;
}

function wrapCPage(title, desc, filename, currentNum, phaseTag, phaseTitle, subtopics, contentBody, prevFile, prevTitle, nextFile, nextTitle) {
  const accordionSidebar = generateCAccordionSidebar(filename);

  let navFooterHtml = '<div class="nav-footer">\n';
  if (prevFile) {
    navFooterHtml += '  <a href="' + prevFile + '" class="nav-btn">\n    <span class="label">← Previous Lesson</span>\n    <span class="title">' + prevTitle + '</span>\n  </a>\n';
  } else {
    navFooterHtml += '  <a href="/blog-c.html" class="nav-btn">\n    <span class="label">← C Course Overview</span>\n    <span class="title">Course Home & Index</span>\n  </a>\n';
  }
  if (nextFile) {
    navFooterHtml += '  <a href="' + nextFile + '" class="nav-btn" style="text-align:right;">\n    <span class="label">Next Lesson →</span>\n    <span class="title">' + nextTitle + '</span>\n  </a>\n';
  } else {
    navFooterHtml += '  <a href="/blog-c.html" class="nav-btn" style="text-align:right;">\n    <span class="label">Course Index →</span>\n    <span class="title">C Master Index</span>\n  </a>\n';
  }
  navFooterHtml += '</div>';

  return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8" />\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>' + title + ' — C Master Tutorial | Our Compiler</title>\n' +
'  <meta name="description" content="' + desc + '" />\n' +
'  <meta name="keywords" content="c tutorial, ' + title.toLowerCase() + ', c programming, gcc, c data structures, c algorithms, c system programming" />\n' +
'  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />\n' +
'  <link rel="icon" type="image/png" href="/logo.png" />\n' +
'  <link rel="canonical" href="https://www.ourcompiler.com/blog-c/' + filename + '" />\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com" />\n' +
'  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />\n' +
'  <link rel="stylesheet" href="/blog-style.css" />\n' +
'  <link rel="stylesheet" href="/blog-c/style.css" />\n' +
'  <link rel="stylesheet" href="/site-nav.css" />\n' +
'  <style>\n' +
'    .concept-box { background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.25); border-left: 4px solid #10b981; border-radius: 8px; padding: 22px 26px; margin: 24px 0; }\n' +
'    .concept-box h4 { color: #10b981; margin-bottom: 10px; font-size: 16.5px; font-weight: 700; }\n' +
'    .concept-box p { color: var(--text2); font-size: 15px; line-height: 1.8; margin: 0 0 10px 0; }\n' +
'    .spec-table th { background: rgba(16, 185, 129, 0.12); color: #10b981; font-size: 14.5px; }\n' +
'    .deep-dive-card { background: #141922; border: 1px solid #27303f; border-radius: 10px; padding: 24px; margin: 26px 0; }\n' +
'    .deep-dive-card h3 { color: #10b981; font-size: 17.5px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }\n' +
'    .faq-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin: 24px 0; }\n' +
'    .faq-item { background: var(--bg2); border: 1px solid var(--border); border-left: 4px solid #10b981; border-radius: 8px; padding: 20px 22px; }\n' +
'    .faq-item h4 { color: #e6edf3; font-size: 15.5px; margin-bottom: 8px; }\n' +
'    .faq-item p { color: var(--text2); font-size: 14.5px; line-height: 1.75; margin: 0; }\n' +
'    .text-prose { font-size: 15.5px; line-height: 1.85; color: var(--text); margin-bottom: 18px; }\n' +
'  </style>\n' +
'  <script>\n' +
'    function toggleAccordion(btn) {\n' +
'      const content = btn.nextElementSibling;\n' +
'      const isOpen = content.classList.contains("open");\n' +
'      if (isOpen) {\n' +
'        content.classList.remove("open");\n' +
'        btn.classList.remove("active");\n' +
'      } else {\n' +
'        content.classList.add("open");\n' +
'        btn.classList.add("active");\n' +
'      }\n' +
'    }\n' +
'    window.addEventListener("DOMContentLoaded", () => {\n' +
'      document.querySelectorAll(".code-block").forEach(block => {\n' +
'        const header = block.querySelector(".code-block-header");\n' +
'        const codeEl = block.querySelector("pre code");\n' +
'        if (!header || !codeEl) return;\n' +
'        let actionsContainer = header.querySelector(".code-actions");\n' +
'        if (!actionsContainer) {\n' +
'          actionsContainer = document.createElement("div");\n' +
'          actionsContainer.className = "code-actions";\n' +
'          actionsContainer.style.cssText = "display: flex; gap: 8px; align-items: center; margin-left: auto;";\n' +
'          const tryBtn = header.querySelector(".try-btn");\n' +
'          if (tryBtn) actionsContainer.appendChild(tryBtn);\n' +
'          header.appendChild(actionsContainer);\n' +
'        }\n' +
'        const copyBtn = document.createElement("button");\n' +
'        copyBtn.className = "copy-btn";\n' +
'        copyBtn.innerHTML = "📋 Copy";\n' +
'        copyBtn.style.cssText = "background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; font-family: Inter, sans-serif; white-space: nowrap;";\n' +
'        copyBtn.addEventListener("click", () => {\n' +
'          navigator.clipboard.writeText(codeEl.textContent).then(() => {\n' +
'            copyBtn.innerHTML = "✅ Copied!";\n' +
'            setTimeout(() => { copyBtn.innerHTML = "📋 Copy"; }, 2000);\n' +
'          });\n' +
'        });\n' +
'        actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);\n' +
'      });\n' +
'    });\n' +
'  </script>\n' +
'</head>\n' +
'<body class="lang-c">\n' +
'<nav class="topnav">\n' +
'  <a href="/" class="brand">🖥️ Our Compiler</a>\n' +
'  <a href="/blog-python.html">Python</a>\n' +
'  <a href="/blog-java.html">Java</a>\n' +
'  <a href="/blog-javascript.html">JavaScript</a>\n' +
'  <a href="/blog-c.html" class="active">C</a>\n' +
'  <a href="/blog-cpp.html">C++</a>\n' +
'  <a href="/?lang=csharp">C#</a>\n' +
'  <a href="/blog-go.html">Go</a>\n' +
'  <a href="/blog-ruby.html">Ruby</a>\n' +
'  <a href="/blog-rust.html">Rust</a>\n' +
'  <a href="/blog-php.html">PHP</a>\n' +
'  <a href="/online-html-editor.html">HTML/CSS/JS</a>\n' +
'</nav>\n' +
'<div class="layout">\n' +
'  <aside class="sidebar">\n' +
'    <div class="sidebar-heading">C Master Course</div>\n' +
'    <a href="/blog-c.html" class="sidebar-home-link">⚡ C Course HOME</a>\n' +
accordionSidebar +
'    <div class="sidebar-heading">Interactive IDE</div>\n' +
'    <a href="/?lang=c" style="color:#10b981; font-weight:700;">▶ Try C Online Compiler</a>\n' +
'    <a href="/blog.html">📚 All Tutorials</a>\n' +
'  </aside>\n' +
'  <main class="content">\n' +
'    <div class="breadcrumb">\n' +
'      <a href="/">Home</a><span class="sep">›</span>\n' +
'      <a href="/blog.html">Tutorials</a><span class="sep">›</span>\n' +
'      <a href="/blog-c.html">C Programming</a><span class="sep">›</span>\n' +
'      <span class="current">Lesson ' + currentNum + ': ' + title + '</span>\n' +
'    </div>\n' +
'    <h1 class="page-title">' + title + '</h1>\n' +
'    <div class="page-meta">\n' +
'      <span class="badge">⚡ C (C17 / C23 Standard)</span>\n' +
'      <span class="badge">🟢 Lesson ' + currentNum + '</span>\n' +
'      <span class="badge">📂 ' + phaseTag + ': ' + phaseTitle + '</span>\n' +
'      <span class="badge">📅 2026 Comprehensive Master Edition</span>\n' +
'    </div>\n' +
'    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">\n' +
'      <span style="color:#10b981; font-weight:700;">📌 Covered in this in-depth guide:</span>\n' +
'      <span>' + subtopics + '</span>\n' +
'    </div>\n' +
contentBody + '\n' +
navFooterHtml + '\n' +
'  </main>\n' +
'</div>\n' +
'  <script src="/site-nav.js" defer></script>\n' +
'</body>\n' +
'</html>';
}

// ── GENERATE LESSONS 36 TO 65 DATA ─────────────────────────────────────────
const LESSON_DEFINITIONS = [
  // Phase 14: File Handling (36-38)
  {
    num: 36, file: '36-c-file-handling-fopen-fclose-and-text-io.html', title: 'C File Handling: FILE* Handles, fopen(), fclose() & Text I/O',
    desc: 'Comprehensive masterclass on C File Handling (Phase 14 Part 1): FILE* stream handles, fopen() modes, fclose(), fgetc, fputc, fgets, fputs, fprintf, and fscanf.',
    phaseTag: 'Phase 14', phaseTitle: 'File Handling & I/O Streams', subtopics: 'FILE* Handles · fopen() Modes (r, w, a, r+, w+) · fclose() · fgetc / fputc · fgets / fputs · fprintf / fscanf · Text File Pipelines',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 14 (Chapter 36): C File Handling — FILE* Handles, fopen(), fclose() &amp; Text I/O Masterclass</strong>! Disk file persistence allows C programs to store data permanently. In this guide, you will master file stream handles (<code>FILE*</code>), file opening modes, and text I/O operations.</p></div>
      <div class="section-title"><span class="num">1</span>File Streams &amp; fopen() Opening Modes</div>
      <div class="section-body">
        <p class="text-prose">Files are accessed via <code>FILE*</code> pointers. <code>fopen("file.txt", "w")</code> creates or opens files for writing.</p>
        <div class="concept-box"><h4>FILE Opening Modes:</h4><p>• <code>"r"</code>: Read mode (must exist).<br>• <code>"w"</code>: Write mode (truncates existing file).<br>• <code>"a"</code>: Append mode (adds to end of file).</p></div>
      </div>
      <div class="section-title"><span class="num">2</span>Text File I/O Code Example</div>
      <div class="section-body">
        <div class="code-block"><div class="code-block-header"><span class="lang-tag">C — Text File Writing & Reading</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>
<pre><code>#include &lt;stdio.h&gt;

int main(void) {
    FILE *fp = fopen("output.txt", "w");
    if (fp != NULL) {
        fprintf(fp, "Hello C File Handling!\\nScore: %d\\n", 100);
        fclose(fp);
        printf("File written successfully!\\n");
    }
    return 0;
}</code></pre></div>
      </div>
      <div class="section-title"><span class="num">3</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: Why must we always call fclose()?</h4><p>Calling <code>fclose()</code> flushes buffered memory data to disk and releases OS kernel file descriptors.</p></div></div></div>
    `
  },
  {
    num: 37, file: '37-c-binary-file-io-fwrite-fread-and-file-positioning.html', title: 'C Binary File I/O, Struct Serialization & fseek() Positioning',
    desc: 'Comprehensive masterclass on Binary Files in C (Phase 14 Part 2): Binary modes ("rb", "wb"), fwrite(), fread(), struct serialization, fseek(), ftell(), and rewind().',
    phaseTag: 'Phase 14', phaseTitle: 'File Handling & I/O Streams', subtopics: 'Binary File Modes (rb, wb) · fwrite() & fread() · Struct Serialization · Random Access Positioning (fseek, ftell, rewind) · SEEK_SET / SEEK_CUR / SEEK_END',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 14 (Chapter 37): C Binary File I/O, Struct Serialization &amp; fseek() Positioning Masterclass</strong>! Binary files write exact RAM bytes directly to disk without ASCII formatting overhead.</p></div>
      <div class="section-title"><span class="num">1</span>Binary Struct Serialization (fwrite / fread)</div>
      <div class="section-body">
        <div class="code-block"><div class="code-block-header"><span class="lang-tag">C — Binary Struct Serialization</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>
<pre><code>#include &lt;stdio.h&gt;

typedef struct { int id; char name[20]; } User;

int main(void) {
    User u1 = {101, "Dennis"};
    FILE *fp = fopen("user.dat", "wb");
    if (fp) {
        fwrite(&amp;u1, sizeof(User), 1, fp);
        fclose(fp);
        printf("Binary struct serialized to disk!\\n");
    }
    return 0;
}</code></pre></div>
      </div>
      <div class="section-title"><span class="num">2</span>Random Access File Positioning (fseek / ftell)</div>
      <div class="section-body"><p class="text-prose"><code>fseek(fp, offset, SEEK_SET)</code> jumps directly to any byte location inside a file without scanning from the start.</p></div>
      <div class="section-title"><span class="num">3</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What does ftell() return?</h4><p><code>ftell(fp)</code> returns the current byte position offset from the beginning of the file.</p></div></div></div>
    `
  },
  {
    num: 38, file: '38-c-file-error-handling-feof-ferror-and-errno.html', title: 'C File Error Handling, EOF Detection, ferror() & errno',
    desc: 'Comprehensive masterclass on File Error Handling in C (Phase 14 Part 3): feof(), ferror(), <errno.h> system error codes, perror(), strerror(), and production file utilities.',
    phaseTag: 'Phase 14', phaseTitle: 'File Handling & I/O Streams', subtopics: 'feof() EOF Detection · ferror() Error Checking · <errno.h> System Errors · perror() & strerror() · File Copy & Log File Utility Programs',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 14 (Chapter 38): C File Error Handling, EOF Detection, ferror() &amp; errno Masterclass</strong>! Production C software must gracefully handle missing files, full disks, and permission errors.</p></div>
      <div class="section-title"><span class="num">1</span>Error Checking with feof(), ferror() and perror()</div>
      <div class="section-body">
        <div class="code-block"><div class="code-block-header"><span class="lang-tag">C — Robust File Error Handling</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>
<pre><code>#include &lt;stdio.h&gt;
#include &lt;errno.h&gt;

int main(void) {
    FILE *fp = fopen("non_existent_file.txt", "r");
    if (fp == NULL) {
        perror("Failed to open file"); // Prints system error message!
        return 1;
    }
    fclose(fp);
    return 0;
}</code></pre></div>
      </div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: Why should you check feof() only AFTER a read attempt?</h4><p><code>feof()</code> returns true only after a read operation attempts to read past the end of the file and fails.</p></div></div></div>
    `
  },

  // Phase 15: Preprocessor & Header Files (39-41)
  {
    num: 39, file: '39-c-preprocessor-directives-and-macro-pitfalls.html', title: 'C Preprocessor Directives, Macros & Double Evaluation Pitfalls',
    desc: 'Comprehensive masterclass on C Preprocessor (Phase 15 Part 1): Preprocessor pipeline, #include, #define object-like & function-like macros, parenthesization rules, double evaluation traps, stringizing (#), and token pasting (##).',
    phaseTag: 'Phase 15', phaseTitle: 'Preprocessor & Header Files', subtopics: 'Preprocessor Pipeline · #include Mechanics · Object & Function Macros · Parenthesization Rule · Double Evaluation Traps · Stringizing (#) & Token Pasting (##)',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 15 (Chapter 39): C Preprocessor Directives, Macros &amp; Double Evaluation Pitfalls Masterclass</strong>! The Preprocessor runs before compilation, transforming source text via macro substitution.</p></div>
      <div class="section-title"><span class="num">1</span>Function-Like Macros &amp; The Parenthesization Rule</div>
      <div class="section-body">
        <div class="concept-box"><h4>Macro Parenthesization Rule:</h4><p>Always wrap macro parameters and expressions in parentheses: <code>#define SQUARE(x) ((x) * (x))</code> to prevent precedence bugs!</p></div>
        <div class="code-block"><div class="code-block-header"><span class="lang-tag">C — Preprocessor Macro Example</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>
<pre><code>#include &lt;stdio.h&gt;

#define MAX(a, b) (((a) > (b)) ? (a) : (b))

int main(void) {
    int x = 10, y = 20;
    printf("Max: %d\\n", MAX(x, y));
    return 0;
}</code></pre></div>
      </div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What is the Double Evaluation Pitfall in Macros?</h4><p>Writing <code>MAX(x++, y)</code> evaluates <code>x++</code> twice, leading to unexpected side-effects. Use inline functions for side-effect safety!</p></div></div></div>
    `
  },
  {
    num: 40, file: '40-c-conditional-compilation-and-include-guards.html', title: 'C Conditional Compilation, Include Guards & #pragma once',
    desc: 'Comprehensive masterclass on Conditional Compilation (Phase 15 Part 2): #if, #ifdef, #ifndef, #else, #elif, #endif, Include Guards (#ifndef MATH_UTILS_H), #pragma once, and platform-specific compilation.',
    phaseTag: 'Phase 15', phaseTitle: 'Preprocessor & Header Files', subtopics: '#if, #ifdef, #ifndef, #else, #elif, #endif · Include Guards (#ifndef MATH_H) · #pragma once · Platform Conditional Compilation',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 15 (Chapter 40): C Conditional Compilation, Include Guards &amp; #pragma once Masterclass</strong>! Conditional compilation allows compiling different code blocks based on target platform flags.</p></div>
      <div class="section-title"><span class="num">1</span>Include Guards Architecture</div>
      <div class="section-body">
        <div class="code-block"><div class="code-block-header"><span class="lang-tag">C — User Curriculum Standard Header Example</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>
<pre><code>#ifndef MATH_UTILS_H
#define MATH_UTILS_H

int add(int first, int second);

#endif</code></pre></div>
      </div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: Why are Include Guards essential?</h4><p>They prevent duplicate declaration compiler errors when a header file is included multiple times across compilation units.</p></div></div></div>
    `
  },
  {
    num: 41, file: '41-c-modular-architecture-headers-linkage-and-compilation-units.html', title: 'C Modular Architecture: Headers, Linkage (static/extern) & Compilation Units',
    desc: 'Comprehensive masterclass on C Modular Architecture (Phase 15 Part 3): Header (.h) vs source (.c) separation, static internal linkage, extern external linkage, and compilation units.',
    phaseTag: 'Phase 15', phaseTitle: 'Preprocessor & Header Files', subtopics: 'Header (.h) vs Source (.c) Separation · Prototype Declarations · static Internal Linkage vs extern External Linkage · Compilation Units & Object Files',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 15 (Chapter 41): C Modular Architecture: Headers, Linkage &amp; Compilation Units Masterclass</strong>! Modular software separates public API declarations (.h) from private implementations (.c).</p></div>
      <div class="section-title"><span class="num">1</span>static vs extern Linkage Rules</div>
      <div class="section-body">
        <p class="text-prose">• <strong><code>static</code>:</strong> Restricts function or global variable visibility to the current .c file (Internal Linkage).<br>• <strong><code>extern</code>:</strong> Declares a variable or function defined in another compilation unit (External Linkage).</p>
      </div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What is a Compilation Unit?</h4><p>A single .c source file along with all headers included by #include directives processed into an object file (.o).</p></div></div></div>
    `
  },

  // Phase 16: Command-Line Arguments (42-43)
  {
    num: 42, file: '42-c-command-line-arguments-argc-argv-and-parsing.html', title: 'C Command-Line Arguments: argc, argv[] & String Parsing',
    desc: 'Comprehensive masterclass on CLI Parsing in C (Phase 16 Part 1): main(argc, argv) parameters, executable path argv[0], string conversions (strtol, strtod), and argument validation.',
    phaseTag: 'Phase 16', phaseTitle: 'Command-Line Arguments', subtopics: 'main(argc, argv) Parameters · Executable Path (argv[0]) · Argument Indexing · String Conversions (strtol, strtod) · Argument Validation & Usage Help',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 16 (Chapter 42): C Command-Line Arguments: argc, argv[] &amp; String Parsing Masterclass</strong>! CLI arguments allow users to pass options and filenames directly when launching executables.</p></div>
      <div class="section-title"><span class="num">1</span>argc &amp; argv[] Mechanics</div>
      <div class="section-body">
        <div class="code-block"><div class="code-block-header"><span class="lang-tag">C — User Curriculum Standard CLI Example</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>
<pre><code>#include &lt;stdio.h&gt;

int main(int argc, char *argv[]) {
    printf("Number of arguments: %d\\n", argc);

    if (argc > 1) {
        printf("First argument: %s\\n", argv[1]);
    }

    return 0;
}</code></pre></div>
      </div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What does argv[0] always contain?</h4><p><code>argv[0]</code> contains the name or full path of the executable program itself.</p></div></div></div>
    `
  },
  {
    num: 43, file: '43-c-cli-tool-building-exit-codes-and-environment-variables.html', title: 'Building C CLI Tools, Exit Status Codes & Environment Variables (getenv)',
    desc: 'Comprehensive masterclass on Production CLI Utilities (Phase 16 Part 2): Building command-line tools, exit status codes (EXIT_SUCCESS / EXIT_FAILURE), and environment variables (getenv).',
    phaseTag: 'Phase 16', phaseTitle: 'Command-Line Arguments', subtopics: 'Building Production CLI Tools · Exit Status Codes (EXIT_SUCCESS / EXIT_FAILURE) · Environment Variables (getenv) · Option Flag Processing',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 16 (Chapter 43): Building C CLI Tools, Exit Status Codes &amp; Environment Variables Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>Environment Variables with getenv()</div>
      <div class="section-body">
        <div class="code-block"><div class="code-block-header"><span class="lang-tag">C — getenv() Environment Lookup</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>
<pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main(void) {
    char *user = getenv("USER");
    if (!user) user = getenv("USERNAME");
    printf("Current System User: %s\\n", user ? user : "Unknown");
    return EXIT_SUCCESS;
}</code></pre></div>
      </div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: Why return EXIT_FAILURE on error?</h4><p>Shell scripts and CI/CD pipelines check the exit status code (0 for success, non-zero for failure) to automate execution workflows.</p></div></div></div>
    `
  },

  // Phase 17: Standard Library (44-46)
  {
    num: 44, file: '44-c-standard-library-io-utility-math-and-strings.html', title: 'C Standard Library: <stdio.h>, <stdlib.h>, <string.h>, <math.h> & <ctype.h>',
    desc: 'Comprehensive masterclass on Core C Standard Libraries (Phase 17 Part 1): Input/Output, stdlib utilities (rand, qsort), string functions, math functions, and ctype character classifications.',
    phaseTag: 'Phase 17', phaseTitle: 'Standard Library Deep-Dive', subtopics: '<stdio.h> · <stdlib.h> (rand, srand, qsort, bsearch) · <string.h> · <math.h> (pow, sqrt, ceil, floor) · <ctype.h> (isalpha, isdigit, toupper)',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 17 (Chapter 44): C Standard Library — I/O, Utilities, Math &amp; Strings Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>Header Matrix Reference</div>
      <div class="section-body">
        <table class="tbl spec-table">
          <tr><th>Header</th><th>Core Capabilities</th></tr>
          <tr><td><code>&lt;stdio.h&gt;</code></td><td>File &amp; Console Input/Output Streams (printf, scanf, fgets, fopen)</td></tr>
          <tr><td><code>&lt;stdlib.h&gt;</code></td><td>Memory allocation, random numbers (rand, srand), sorting (qsort), process control</td></tr>
          <tr><td><code>&lt;math.h&gt;</code></td><td>Math computations (pow, sqrt, sin, cos, floor, ceil) - Link with <code>-lm</code></td></tr>
        </table>
      </div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: Why do we seed rand() with srand(time(NULL))?</h4><p>Without seeding, <code>rand()</code> produces the exact same pseudo-random sequence on every program execution.</p></div></div></div>
    `
  },
  {
    num: 45, file: '45-c-standard-library-time-booleans-and-fixed-width-integers.html', title: 'C Standard Library: <time.h>, <stdbool.h>, <stdint.h>, <limits.h> & <float.h>',
    desc: 'Comprehensive masterclass on C Types & Time Libraries (Phase 17 Part 2): <time.h> dates and benchmarking, <stdbool.h> booleans, <stdint.h> fixed-width integers, and platform limits.',
    phaseTag: 'Phase 17', phaseTitle: 'Standard Library Deep-Dive', subtopics: '<time.h> (time, clock, struct tm, strftime) · <stdbool.h> · <stdint.h> (int32_t, uint64_t) · <limits.h> (INT_MAX) · <float.h> (DBL_MAX)',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 17 (Chapter 45): C Standard Library — Time, Booleans &amp; Fixed-Width Integers Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>Fixed-Width Integers (<stdint.h>)</div>
      <div class="section-body"><p class="text-prose"><code>int32_t</code> (32-bit signed), <code>uint64_t</code> (64-bit unsigned) guarantee exact byte widths across all OS hardware.</p></div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: How do you measure execution runtime using clock()?</h4><p>Subtract start clock from end clock and divide by <code>CLOCKS_PER_SEC</code>.</p></div></div></div>
    `
  },
  {
    num: 46, file: '46-c-standard-library-assertions-error-handling-and-stddef.html', title: 'C Standard Library: <assert.h>, <errno.h> Error Reporting & <stddef.h>',
    desc: 'Comprehensive masterclass on C Assertions & Error Handling (Phase 17 Part 3): <assert.h> runtime & static assertions, <errno.h> system error codes, and <stddef.h> definitions.',
    phaseTag: 'Phase 17', phaseTitle: 'Standard Library Deep-Dive', subtopics: '<assert.h> (assert, static_assert) · <errno.h> (errno, strerror) · <stddef.h> (NULL, size_t, offsetof) · Portable C Library Architecture',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 17 (Chapter 46): C Standard Library — Assertions, Error Handling &amp; stddef Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>Runtime Assertions (<assert.h>)</div>
      <div class="section-body">
        <div class="code-block"><div class="code-block-header"><span class="lang-tag">C — Assertions Demo</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>
<pre><code>#include &lt;stdio.h&gt;
#include &lt;assert.h&gt;

void processAge(int age) {
    assert(age >= 0 && "Age cannot be negative!");
    printf("Processing age: %d\\n", age);
}

int main(void) {
    processAge(25);
    return 0;
}</code></pre></div>
      </div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: How do you disable assertions in release builds?</h4><p>Define <code>#define NDEBUG</code> before including <code>&lt;assert.h&gt;</code> or pass <code>-DNDEBUG</code> to GCC.</p></div></div></div>
    `
  },

  // Phase 18: Data Structures (47-51)
  {
    num: 47, file: '47-c-data-structures-singly-doubly-and-circular-linked-lists.html', title: 'C Data Structures: Singly, Doubly & Circular Linked Lists Masterclass',
    desc: 'Exhaustive masterclass on Linked Lists in C (Phase 18 Part 1): Singly Linked Lists (Nodes, Insert, Delete, Search, Traverse), Doubly Linked Lists (prev/next), and Circular Linked Lists.',
    phaseTag: 'Phase 18', phaseTitle: 'Data Structures in C', subtopics: 'Abstract Data Types ADTs · Singly Linked Lists (Node, Insert, Delete, Search, Traverse) · Doubly Linked Lists · Circular Linked Lists',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 18 (Chapter 47): C Data Structures — Singly, Doubly &amp; Circular Linked Lists Masterclass</strong>! Dynamic node linking provides $O(1)$ insertion and deletion without contiguous array reallocation overhead.</p></div>
      <div class="section-title"><span class="num">1</span>Singly Linked List Implementation</div>
      <div class="section-body">
        <div class="code-block"><div class="code-block-header"><span class="lang-tag">C — Singly Linked List Insertion & Traversal</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>
<pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

struct Node {
    int data;
    struct Node *next;
};

void insertHead(struct Node **head, int val) {
    struct Node *newNode = malloc(sizeof(*newNode));
    newNode->data = val;
    newNode->next = *head;
    *head = newNode;
}

void printList(const struct Node *head) {
    while (head != NULL) {
        printf("%d -> ", head->data);
        head = head->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node *list = NULL;
    insertHead(&amp;list, 30);
    insertHead(&amp;list, 20);
    insertHead(&amp;list, 10);
    printList(list);
    return 0;
}</code></pre></div>
      </div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: Why pass double pointers (struct Node **head) to insertion functions?</h4><p>So the function can mutate the caller's head pointer address when inserting a new root node.</p></div></div></div>
    `
  },
  {
    num: 48, file: '48-c-data-structures-stacks-and-queues-arrays-vs-linked-lists.html', title: 'C Data Structures: Stacks & Queues (Arrays vs Linked Lists)',
    desc: 'Exhaustive masterclass on Stacks & Queues in C (Phase 18 Part 2): Stack ADT (Push, Pop, Peek), Queue ADT (Enqueue, Dequeue), Circular Queues, Array vs Linked List implementations.',
    phaseTag: 'Phase 18', phaseTitle: 'Data Structures in C', subtopics: 'Stack ADT (LIFO, Push, Pop, Peek) · Queue ADT (FIFO, Enqueue, Dequeue) · Circular Queue · Array vs Linked List Implementations',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 18 (Chapter 48): C Data Structures — Stacks &amp; Queues (Arrays vs Linked Lists) Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>Stack LIFO vs Queue FIFO Architecture</div>
      <div class="section-body"><p class="text-prose">• <strong>Stack (LIFO):</strong> Last-In, First-Out (Function call stack, undo operations).<br>• <strong>Queue (FIFO):</strong> First-In, First-Out (Task scheduling, printer spools).</p></div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What is a Circular Queue?</h4><p>A queue implementation using array wrapping <code>(rear + 1) % SIZE</code> to eliminate wasted empty array slots.</p></div></div></div>
    `
  },
  {
    num: 49, file: '49-c-data-structures-binary-trees-and-binary-search-trees.html', title: 'C Data Structures: Binary Trees & Binary Search Trees (BST)',
    desc: 'Exhaustive masterclass on Trees in C (Phase 18 Part 3): Binary Trees, Binary Search Tree BST (Insert, Search, Delete), and Tree Traversals (In-order, Pre-order, Post-order).',
    phaseTag: 'Phase 18', phaseTitle: 'Data Structures in C', subtopics: 'Tree Architecture · Binary Search Tree BST (Insert, Search, Delete) · Tree Traversals (In-order, Pre-order, Post-order, Level-order)',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 18 (Chapter 49): C Data Structures — Binary Trees &amp; Binary Search Trees (BST) Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>BST Property & Traversal</div>
      <div class="section-body"><p class="text-prose">In a BST, left child &lt; root &lt; right child. In-order traversal yields elements in perfectly sorted order!</p></div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What is the search time complexity of a balanced BST?</h4><p>Balanced BST search runs in $O(\log N)$ time complexity.</p></div></div></div>
    `
  },
  {
    num: 50, file: '50-c-data-structures-graph-representations-and-traversals.html', title: 'C Data Structures: Graph Representations & BFS/DFS Traversals',
    desc: 'Exhaustive masterclass on Graphs in C (Phase 18 Part 4): Adjacency Matrix vs Adjacency List, Breadth-First Search (BFS), and Depth-First Search (DFS) traversals.',
    phaseTag: 'Phase 18', phaseTitle: 'Data Structures in C', subtopics: 'Graph Theory · Adjacency Matrix vs Adjacency List · Breadth-First Search (BFS) · Depth-First Search (DFS) · Graph Algorithms',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 18 (Chapter 50): C Data Structures — Graph Representations &amp; BFS/DFS Traversals Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>Adjacency Matrix vs Adjacency List</div>
      <div class="section-body"><p class="text-prose">Adjacency Matrix uses $O(V^2)$ space (dense graphs), while Adjacency List uses $O(V + E)$ space (sparse graphs).</p></div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What data structure does BFS use?</h4><p>BFS uses a Queue (FIFO), while DFS uses a Stack (LIFO or recursion).</p></div></div></div>
    `
  },
  {
    num: 51, file: '51-c-data-structures-hash-tables-and-collision-resolution.html', title: 'C Data Structures: Hash Tables & Collision Resolution Strategies',
    desc: 'Exhaustive masterclass on Hash Tables in C (Phase 18 Part 5): Hash functions, collision resolution via Chaining (Linked Lists) & Open Addressing, and O(1) key-value lookup.',
    phaseTag: 'Phase 18', phaseTitle: 'Data Structures in C', subtopics: 'Hash Table Architecture · Hash Functions · Chaining via Linked Lists · Open Addressing (Linear Probing) · O(1) Search',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 18 (Chapter 51): C Data Structures — Hash Tables &amp; Collision Resolution Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>Hash Table Chaining Architecture</div>
      <div class="section-body"><p class="text-prose">Chaining stores colliding keys inside a linked list bucket array, providing expected $O(1)$ constant time operations.</p></div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What is a Load Factor?</h4><p>Ratio of stored items to hash table size ($N/M$). Keeping load factor $< 0.7$ maintains $O(1)$ performance.</p></div></div></div>
    `
  },

  // Phase 19: Algorithms (52-54)
  {
    num: 52, file: '52-c-algorithms-big-o-complexity-searching-and-sorting.html', title: 'C Algorithms: Big-O Complexity, Searching & 5 Sorting Algorithms',
    desc: 'Exhaustive masterclass on Algorithms & Complexity (Phase 19 Part 1): Big-O notation, Linear & Binary Search, Bubble, Selection, Insertion, Merge, and Quick Sort.',
    phaseTag: 'Phase 19', phaseTitle: 'Algorithms & Big-O Complexity', subtopics: 'Big-O Notation (O(1), O(log N), O(N), O(N log N), O(N^2)) · Linear vs Binary Search · Bubble, Selection, Insertion, Merge & Quick Sort',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 19 (Chapter 52): C Algorithms — Big-O Complexity, Searching &amp; 5 Sorting Algorithms Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>Sorting Complexity Comparison Matrix</div>
      <div class="section-body">
        <table class="tbl spec-table">
          <tr><th>Algorithm</th><th>Time Complexity (Average)</th><th>Space Complexity</th><th>Stability</th></tr>
          <tr><td>Bubble Sort</td><td>$O(N^2)$</td><td>$O(1)$</td><td>Stable</td></tr>
          <tr><td>Merge Sort</td><td>$O(N \log N)$</td><td>$O(N)$</td><td>Stable</td></tr>
          <tr><td>Quick Sort</td><td>$O(N \log N)$</td><td>$O(\log N)$</td><td>Unstable</td></tr>
        </table>
      </div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: Why is Quick Sort faster than Merge Sort in practice?</h4><p>Quick Sort has better CPU cache spatial locality and operates in-place without extra array allocations.</p></div></div></div>
    `
  },
  {
    num: 53, file: '53-c-algorithms-recursion-divide-and-conquer-and-greedy-strategies.html', title: 'C Algorithms: Divide-and-Conquer & Greedy Optimization Strategies',
    desc: 'Exhaustive masterclass on Algorithm Paradigms (Phase 19 Part 2): Recursion, Divide-and-Conquer, Greedy choice property, Fractional Knapsack, and Coin Change.',
    phaseTag: 'Phase 19', phaseTitle: 'Algorithms & Big-O Complexity', subtopics: 'Recursion Mechanics · Divide-and-Conquer Paradigm · Greedy Choice Property · Fractional Knapsack · Coin Change Algorithm',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 19 (Chapter 53): C Algorithms — Divide-and-Conquer &amp; Greedy Strategies Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>Greedy Choice Property</div>
      <div class="section-body"><p class="text-prose">Greedy algorithms make the locally optimal choice at each step hoping to find the global optimum.</p></div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: When does a Greedy algorithm fail?</h4><p>When local optimal choices prevent reaching global optimum (e.g. 0/1 Knapsack problem).</p></div></div></div>
    `
  },
  {
    num: 54, file: '54-c-algorithms-dynamic-programming-backtracking-and-graph-search.html', title: 'C Algorithms: Dynamic Programming, Backtracking & Graph Algorithms',
    desc: 'Exhaustive masterclass on Advanced Algorithms (Phase 19 Part 3): Dynamic Programming (Memoization vs Tabulation, 0/1 Knapsack), Backtracking (N-Queens), BFS & DFS.',
    phaseTag: 'Phase 19', phaseTitle: 'Algorithms & Big-O Complexity', subtopics: 'Dynamic Programming (Memoization, Tabulation, 0/1 Knapsack) · Backtracking (N-Queens, Maze) · BFS & DFS Algorithmic Pipelines',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 19 (Chapter 54): C Algorithms — Dynamic Programming, Backtracking &amp; Search Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>Dynamic Programming: Memoization vs Tabulation</div>
      <div class="section-body"><p class="text-prose">DP solves overlapping subproblems by storing sub-results (Memoization = Top-Down, Tabulation = Bottom-Up).</p></div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What is the main difference between Backtracking and Brute Force?</h4><p>Backtracking prunes invalid search branches early as soon as a constraint is violated!</p></div></div></div>
    `
  },

  // Phase 20: Debugging & Security (55-57)
  {
    num: 55, file: '55-c-debugging-compiler-warnings-and-gdb-debugger.html', title: 'C Debugging: Compiler Warning Flags (-Wall) & GDB Debugger Masterclass',
    desc: 'Exhaustive masterclass on C Debugging (Phase 20 Part 1): Compiler flags (-Wall, -Wextra, -Werror), debug builds (-g), and GDB debugger commands (breakpoints, stepping, backtraces).',
    phaseTag: 'Phase 20', phaseTitle: 'Debugging & Safe C Programming', subtopics: 'Compiler Flags (-Wall, -Wextra, -Wpedantic, -Werror) · Debug vs Release Builds (-g) · GDB Commands (Breakpoints, Stepping, Backtrace)',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 20 (Chapter 55): C Debugging — Compiler Warning Flags &amp; GDB Debugger Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>User Curriculum Standard GCC Compile Command</div>
      <div class="section-body">
        <div class="code-block"><div class="code-block-header"><span class="lang-tag">Bash — Production GCC Compile Command</span></div>
<pre><code>gcc -Wall -Wextra -std=c17 main.c -o main</code></pre></div>
      </div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What does GDB backtrace (bt) command show?</h4><p>It prints the full CPU call stack trace leading up to a program crash or breakpoint.</p></div></div></div>
    `
  },
  {
    num: 56, file: '56-c-security-vulnerabilities-buffer-overflows-and-undefined-behavior.html', title: 'C Security Vulnerabilities: Segfaults, Buffer Overflows & Undefined Behavior',
    desc: 'Exhaustive masterclass on C Security & Bugs (Phase 20 Part 2): Segmentation faults, buffer overflows, out-of-bounds access, uninitialized variables, undefined behavior, and format string bugs.',
    phaseTag: 'Phase 20', phaseTitle: 'Debugging & Safe C Programming', subtopics: 'Segmentation Fault Diagnosis · Buffer Overflows · Out-of-Bounds Access · Uninitialized Variables · Undefined Behavior · Integer Overflow',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 20 (Chapter 56): C Security Vulnerabilities &amp; Undefined Behavior Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>Buffer Overflow Vulnerabilities</div>
      <div class="section-body"><p class="text-prose">Writing past array boundaries overwrites adjacent stack frame memory, corrupting return addresses and enabling exploits.</p></div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What is Undefined Behavior (UB)?</h4><p>Code for which the C standard places no requirements, allowing the compiler to optimize unpredictably or crash.</p></div></div></div>
    `
  },
  {
    num: 57, file: '57-c-defensive-c-programming-sanitizers-and-static-analysis.html', title: 'Defensive C Programming: AddressSanitizer & Static Analysis Tools',
    desc: 'Exhaustive masterclass on Defensive C (Phase 20 Part 3): Defensive input validation, safe string functions (snprintf, strncpy), GCC AddressSanitizer (-fsanitize=address), and static analysis.',
    phaseTag: 'Phase 20', phaseTitle: 'Debugging & Safe C Programming', subtopics: 'Defensive Input Validation · Safe Strings (snprintf, strncpy) · GCC AddressSanitizer (-fsanitize=address) · Static Analysis (cppcheck)',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 20 (Chapter 57): Defensive C Programming, AddressSanitizer &amp; Static Analysis Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>GCC AddressSanitizer (ASan)</div>
      <div class="section-body">
        <div class="code-block"><div class="code-block-header"><span class="lang-tag">Bash — ASan Compile Command</span></div>
<pre><code>gcc -fsanitize=address,undefined -g main.c -o main</code></pre></div>
      </div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What does cppcheck static analyzer do?</h4><p>It scans source code for memory leaks, null pointer dereferences, and logic bugs without executing the binary.</p></div></div></div>
    `
  },

  // Phase 21: Build Systems (58-60)
  {
    num: 58, file: '58-c-multi-file-projects-compilation-pipeline-and-linking.html', title: 'C Multi-File Projects, Compilation Pipeline & Linker Architecture',
    desc: 'Exhaustive masterclass on C Multi-File Projects (Phase 21 Part 1): Multi-file architecture, header/source separation, object file generation (.o), and symbol resolution.',
    phaseTag: 'Phase 21', phaseTitle: 'Build Systems, Makefiles & CMake', subtopics: 'Multi-File Architecture · Header/Source Separation · Object File Generation (.o) · Symbol Resolution & Linker Mechanics',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 21 (Chapter 58): C Multi-File Projects &amp; Linker Architecture Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>The 2-Stage Multi-File Build Process</div>
      <div class="section-body"><p class="text-prose">1. Compile each .c file to .o object file: <code>gcc -c math.c -o math.o</code><br>2. Link object files into executable: <code>gcc main.o math.o -o app</code></p></div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What causes "undefined reference to func" linker errors?</h4><p>The compiler found the prototype declaration in a header, but the linker could not find the compiled object body in any provided .o file!</p></div></div></div>
    `
  },
  {
    num: 59, file: '59-c-libraries-static-lib-vs-shared-so-dll-libraries.html', title: 'C Libraries: Static (.a / .lib) vs Dynamic Shared (.so / .dll) Libraries',
    desc: 'Exhaustive masterclass on C Libraries (Phase 21 Part 2): Building static libraries (ar rcs), shared dynamic libraries (gcc -shared -fPIC), and dynamic loading (dlopen).',
    phaseTag: 'Phase 21', phaseTitle: 'Build Systems, Makefiles & CMake', subtopics: 'Static Libraries (.a / .lib) · Shared Dynamic Libraries (.so / .dll) · Compiler Shared Flags (-shared -fPIC) · Dynamic Loading (dlopen)',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 21 (Chapter 59): C Libraries — Static vs Dynamic Shared Libraries Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>Static vs Shared Library Matrix</div>
      <div class="section-body">
        <table class="tbl spec-table">
          <tr><th>Type</th><th>Extension</th><th>Linking Time</th><th>Executable Size</th></tr>
          <tr><td>Static Library</td><td><code>.a</code> / <code>.lib</code></td><td>Compile-time (Copied into binary)</td><td>Larger</td></tr>
          <tr><td>Shared Library</td><td><code>.so</code> / <code>.dll</code></td><td>Runtime (Loaded dynamically in RAM)</td><td>Smaller</td></tr>
        </table>
      </div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What does Position Independent Code (-fPIC) mean?</h4><p>It generates machine code that can execute at any RAM address, which is mandatory for shared libraries.</p></div></div></div>
    `
  },
  {
    num: 60, file: '60-c-build-tools-makefiles-cmake-and-git-ci-cd.html', title: 'Build Automation: GNU Make (Makefiles), CMake & Git CI/CD Pipelines',
    desc: 'Exhaustive masterclass on C Build Tools (Phase 21 Part 3): GNU Make Makefile rules, targets, dependencies, CMake CMakeLists.txt, Git version control, and CI/CD pipelines.',
    phaseTag: 'Phase 21', phaseTitle: 'Build Systems, Makefiles & CMake', subtopics: 'GNU Make (Makefile syntax, targets, rules) · CMake (CMakeLists.txt) · Debug/Release Targets · Git Version Control & CI/CD Pipelines',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 21 (Chapter 60): Build Automation — Makefiles, CMake &amp; Git CI/CD Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>Standard Production Makefile Template</div>
      <div class="section-body">
        <div class="code-block"><div class="code-block-header"><span class="lang-tag">Makefile — GNU Make Build Template</span></div>
<pre><code>CC = gcc
CFLAGS = -Wall -Wextra -O2 -std=c17

all: app

app: main.o math.o
	$(CC) $(CFLAGS) main.o math.o -o app

clean:
	rm -f *.o app</code></pre></div>
      </div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: Why is CMake preferred over raw Makefiles for cross-platform C projects?</h4><p>CMake generates native build files (Visual Studio solutions, Xcode projects, Ninja, or Makefiles) automatically for any platform!</p></div></div></div>
    `
  },

  // Phase 22: System Programming & Embedded C (61-65)
  {
    num: 61, file: '61-c-system-programming-posix-system-calls-processes-and-ipc.html', title: 'POSIX System Programming: System Calls, Processes (fork, exec) & IPC',
    desc: 'Exhaustive masterclass on POSIX System Programming (Phase 22 Part 1): System calls (open, read, write), process management (fork, exec, wait), and IPC (Pipes, Signals).',
    phaseTag: 'Phase 22', phaseTitle: 'System Programming & Embedded C', subtopics: 'POSIX System Calls (open, read, write) · Process Management (fork, exec, wait) · Inter-Process Communication IPC (Pipes, Signals)',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 22 (Chapter 61): POSIX System Programming — System Calls, Processes &amp; IPC Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>Process Creation with fork()</div>
      <div class="section-body">
        <div class="code-block"><div class="code-block-header"><span class="lang-tag">C — POSIX fork() Process Spawning</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>
<pre><code>#include &lt;stdio.h&gt;
#include &lt;unistd.h&gt;

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        printf("Child Process (PID: %d)\\n", getpid());
    } else if (pid > 0) {
        printf("Parent Process created Child (PID: %d)\\n", pid);
    }
    return 0;
}</code></pre></div>
      </div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What is a Zombie Process?</h4><p>A terminated child process whose exit status has not yet been read by its parent process via <code>wait()</code>.</p></div></div></div>
    `
  },
  {
    num: 62, file: '62-c-concurrency-pthreads-mutexes-and-race-conditions.html', title: 'C Concurrency: POSIX Threads (pthreads), Mutexes & Race Conditions',
    desc: 'Exhaustive masterclass on Multithreading in C (Phase 22 Part 2): POSIX threads (pthread_create, pthread_join), race conditions, mutex locking (pthread_mutex_t), and deadlocks.',
    phaseTag: 'Phase 22', phaseTitle: 'System Programming & Embedded C', subtopics: 'Multi-Threading (pthread_create, pthread_join) · Race Conditions · Mutex Lock Protection (pthread_mutex_t) · Deadlock Prevention',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 22 (Chapter 62): C Concurrency — POSIX Threads &amp; Mutexes Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>Thread Race Conditions & Mutex Protection</div>
      <div class="section-body"><p class="text-prose">When multiple threads modify shared global state simultaneously, mutexes (<code>pthread_mutex_lock</code>) serialize access to critical sections.</p></div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What is a Deadlock?</h4><p>When Thread A holds Mutex 1 waiting for Mutex 2, while Thread B holds Mutex 2 waiting for Mutex 1, locking both threads permanently.</p></div></div></div>
    `
  },
  {
    num: 63, file: '63-c-network-programming-bsd-sockets-and-tcp-udp-client-server.html', title: 'C Network Programming: BSD Sockets & TCP/UDP Client-Server Architecture',
    desc: 'Exhaustive masterclass on Network Sockets in C (Phase 22 Part 3): BSD Sockets API (socket, bind, listen, accept, connect), TCP/UDP Client-Server architecture, and HTTP parsing.',
    phaseTag: 'Phase 22', phaseTitle: 'System Programming & Embedded C', subtopics: 'BSD Socket API (socket, bind, listen, accept, connect) · TCP/UDP Client-Server Architecture · HTTP Parsing Engine',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 22 (Chapter 63): C Network Programming — BSD Sockets &amp; TCP/UDP Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>TCP Socket Server Lifecycle</div>
      <div class="section-body"><p class="text-prose">1. <code>socket()</code> $\rightarrow$ 2. <code>bind()</code> to port $\rightarrow$ 3. <code>listen()</code> $\rightarrow$ 4. <code>accept()</code> client connection $\rightarrow$ 5. <code>read()</code>/<code>write()</code> network packets.</p></div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: What is the difference between TCP and UDP sockets?</h4><p>TCP provides reliable, ordered stream connections, while UDP provides lightweight, connectionless datagram packets.</p></div></div></div>
    `
  },
  {
    num: 64, file: '64-c-embedded-c-hardware-registers-bit manipulation-and-microcontrollers.html', title: 'Embedded C: Hardware Memory-Mapped Registers & Bit Manipulation',
    desc: 'Exhaustive masterclass on Embedded C (Phase 22 Part 4): Volatile qualifier, hardware memory-mapped registers, bitwise register manipulation (REG |= (1<<3)), and microcontroller programming.',
    phaseTag: 'Phase 22', phaseTitle: 'System Programming & Embedded C', subtopics: 'Embedded C Architecture · volatile Qualifier · Memory-Mapped Registers · Bitwise Register Manipulation (REG |= (1<<3)) · Portability',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 22 (Chapter 64): Embedded C — Hardware Registers &amp; Bit Manipulation Masterclass</strong>!</p></div>
      <div class="section-title"><span class="num">1</span>The Essential volatile Qualifier</div>
      <div class="section-body"><p class="text-prose"><code>volatile uint32_t *REG</code> tells compiler optimizations that memory contents can change asynchronously outside program control (e.g. hardware interrupt registers).</p></div>
      <div class="section-title"><span class="num">2</span>Technical FAQs</div>
      <div class="section-body"><div class="faq-grid"><div class="faq-item"><h4>Q1: How do you set bit 3 of a hardware register without altering other bits?</h4><p>Use bitwise OR: <code>REGISTER |= (1 &lt;&lt; 3);</code>.</p></div></div></div>
    `
  },
  {
    num: 65, file: '65-c-master-project-roadmap-and-systems-portfolio.html', title: 'C Master Project Roadmap: 24 Systems Engineering Projects',
    desc: 'Exhaustive masterclass on Project Systems (Phase 22 Part 5): Comprehensive project portfolio breakdown featuring 8 Beginner, 7 Intermediate, and 9 Advanced Systems (Shell, HTTP Client, Custom Allocator, Mini Compiler Components).',
    phaseTag: 'Phase 22', phaseTitle: 'System Programming & Embedded C', subtopics: '8 Beginner Projects · 7 Intermediate Systems · 9 Advanced Systems (Linked List Lib, Shell, HTTP Client, TCP Chat Server, Custom Allocator)',
    content: `
      <div class="intro-box"><p>Welcome to <strong>Phase 22 (Chapter 65): C Master Project Roadmap &amp; Systems Portfolio</strong>! The ultimate milestone of your C Programming Journey.</p></div>
      <div class="section-title"><span class="num">1</span>Full Curriculum Project Portfolio Breakdown</div>
      <div class="section-body">
        <div class="deep-dive-card">
          <h3>🚀 8 Beginner Projects:</h3>
          <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">1. Hello World Collection · 2. Modular Calculator · 3. Unit Converter · 4. Number Guessing Game · 5. Student Grade Calculator · 6. Simple Billing System · 7. Menu-Driven Calculator · 8. Multiplication Table Generator.</p>
        </div>
        <div class="deep-dive-card">
          <h3>⚡ 7 Intermediate Projects:</h3>
          <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">1. Student Management System · 2. Library Management System · 3. Contact Book Engine · 4. Bank Account System · 5. File-Based Notes App · 6. Inventory Manager · 7. Expense Tracker &amp; Text Analyzer.</p>
        </div>
        <div class="deep-dive-card">
          <h3>👑 9 Advanced Systems Engineering Projects:</h3>
          <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">1. Linked List Data Structure Library · 2. Stack &amp; Queue Library · 3. Mini Database Engine · 4. Command-Line Shell · 5. HTTP Client · 6. TCP Chat Server · 7. File Compression Utility · 8. Custom Memory Allocator Experiment · 9. Mini Compiler Components &amp; Embedded Sensor Monitor.</p>
        </div>
      </div>
      <div class="section-title"><span class="num">2</span>Congratulations on Completing C Masterclass! 🎉</div>
      <div class="section-body"><p class="text-prose">You have now mastered low-level systems programming in C from foundational CPU architecture to POSIX system calls, memory management, data structures, algorithms, and embedded hardware registers!</p></div>
    `
  }
];

function buildAllRemainingLessons() {
  console.log('🚀 Generating ' + LESSON_DEFINITIONS.length + ' remaining C Masterclass Chapters (Lessons 36 to 65)...');

  LESSON_DEFINITIONS.forEach((l, idx) => {
    const prevNum = l.num - 1;
    const nextNum = l.num + 1;
    const prevDef = LESSON_DEFINITIONS[idx - 1] || C_CURRICULUM.flatMap(p => p.lessons).find(item => item.num === prevNum);
    const nextDef = LESSON_DEFINITIONS[idx + 1];

    const prevFile = prevDef ? prevDef.file : (l.num === 36 ? '35-c-dynamic-arrays-strings-structures-and-memory-debugging.html' : null);
    const prevTitle = prevDef ? prevDef.title : (l.num === 36 ? '35. Dynamic Collections, Ownership & Valgrind Debugging' : null);
    const nextFile = nextDef ? nextDef.file : null;
    const nextTitle = nextDef ? nextDef.title : null;

    const html = wrapCPage(
      l.title,
      l.desc,
      l.file,
      l.num,
      l.phaseTag,
      l.phaseTitle,
      l.subtopics,
      l.content,
      prevFile,
      prevTitle,
      nextFile,
      nextTitle
    );

    fs.writeFileSync(path.join(cDir, l.file), html, 'utf8');
  });

  console.log('✅ Successfully generated Lessons 36 to 65!');
}

// ── UPDATE LESSON 35 to link to Lesson 36 ─────────────────────────────────
function updateLesson35() {
  const file35 = path.join(cDir, '35-c-dynamic-arrays-strings-structures-and-memory-debugging.html');
  const title = "C Dynamic Collections, Memory Ownership Architecture & Valgrind Debugging";
  const desc = "Comprehensive textbook-grade masterclass on Advanced Dynamic Collections (Phase 13 Part 3): Dynamic 1D/2D arrays, dynamic string allocation (+1 null terminator rule), dynamic structures, memory ownership architecture, Valgrind Memcheck, and AddressSanitizer debugging.";
  const subtopics = "Dynamic 1D/2D Arrays · Dynamic Strings (+1 Rule) · Dynamic Structs · Memory Ownership Architecture · Valgrind Memcheck · AddressSanitizer";

  const currentContent = fs.readFileSync(file35, 'utf8');
  const startIdx = currentContent.indexOf('<div class="intro-box">');
  const endIdx = currentContent.indexOf('<div class="nav-footer">');
  const contentBody = currentContent.substring(startIdx, endIdx);

  const html = wrapCPage(title, desc, '35-c-dynamic-arrays-strings-structures-and-memory-debugging.html', 35, "Phase 13", "Dynamic Memory Management", subtopics, contentBody, '34-c-realloc-free-and-the-4-deadly-heap-bugs.html', '34. realloc(), free() & The 4 Deadly Heap Bugs', '36-c-file-handling-fopen-fclose-and-text-io.html', '36. File Streams, fopen(), fclose() & Text I/O');
  fs.writeFileSync(file35, html, 'utf8');
  console.log('✅ Updated 35-c-dynamic-arrays-strings-structures-and-memory-debugging.html next links!');
}

// Clean author block from all C HTML files
function cleanAuthorBlockFromAllFiles() {
  const files = fs.readdirSync(cDir).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    const filePath = path.join(cDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    html = html.replace(/<div class="author">[\s\S]*?<\/div>\s*<\/div>/gi, '');
    html = html.replace(/<div class="author">[\s\S]*?<\/div>/gi, '');
    fs.writeFileSync(filePath, html, 'utf8');
  });
  console.log('✅ Cleaned author blocks across all ' + files.length + ' C files!');
}

// Update all sidebar links across all 65 C lesson files
function updateAllCSidebars() {
  const allFiles = C_CURRICULUM.flatMap(p => p.lessons.map(l => l.file));
  
  allFiles.forEach(file => {
    const filePath = path.join(cDir, file);
    if (!fs.existsSync(filePath)) return;
    let html = fs.readFileSync(filePath, 'utf8');

    const accordionHtml = generateCAccordionSidebar(file);
    html = html.replace(/<div class="sidebar-accordion">[\s\S]*?<\/div>\s*<\/aside>/i, accordionHtml + '\n  </aside>');

    fs.writeFileSync(filePath, html, 'utf8');
  });
  console.log('✅ Updated sidebars across all ' + allFiles.length + ' C lesson files!');
}

// ── UPDATE blog-c.html HOME PAGE ──────────────────────────────────────────
function buildBlogCHome() {
  const cHomePath = path.join(baseDir, 'blog-c.html');

  let roadmapCardsHtml = '';
  C_CURRICULUM.forEach(phase => {
    roadmapCardsHtml += '    <div class="phase-roadmap-card">\n' +
'      <div class="phase-roadmap-header">\n' +
'        <div class="phase-roadmap-title-wrap">\n' +
'          <span class="phase-roadmap-icon">' + phase.icon + '</span>\n' +
'          <div>\n' +
'            <div class="phase-roadmap-tag">' + phase.tag + '</div>\n' +
'            <h3 class="phase-roadmap-title">' + phase.title + '</h3>\n' +
'          </div>\n' +
'        </div>\n' +
'        <span class="phase-roadmap-badge">' + phase.lessons.length + ' In-Depth Chapter' + (phase.lessons.length > 1 ? 's' : '') + '</span>\n' +
'      </div>\n' +
'      <p class="phase-roadmap-desc">' + phase.desc + '</p>\n' +
'      <div class="phase-lessons-list">\n';

    phase.lessons.forEach(l => {
      const padIdx = String(l.num).padStart(2, '0');
      roadmapCardsHtml += '        <a href="/blog-c/' + l.file + '" class="curriculum-lesson-row">\n' +
'          <div class="lesson-row-left">\n' +
'            <span class="lesson-idx">' + padIdx + '</span>\n' +
'            <div class="lesson-info">\n' +
'              <span class="lesson-title">' + l.title + '</span>\n' +
'              <span class="lesson-subtopics">' + l.subtopics + '</span>\n' +
'            </div>\n' +
'          </div>\n' +
'          <div class="lesson-row-right">\n' +
'            <span class="lesson-btn">Read Chapter <span class="arrow">→</span></span>\n' +
'          </div>\n' +
'        </a>\n';
    });

    roadmapCardsHtml += '      </div>\n    </div>\n';
  });

  const accordionSidebar = generateCAccordionSidebar(null);

  const html = '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8" />\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>C Programming Master Tutorial & Complete Roadmap (2026 Edition) | Our Compiler</title>\n' +
'  <meta name="description" content="Master C Programming from fundamental architecture, GCC compilation pipeline, variables, data types, scanf user input, operators, loops, modular functions, arrays, strings, pointers, structures, unions, enums, dynamic memory allocation, file I/O, preprocessor, CLI args, standard library, data structures, algorithms, debugging, build tools, POSIX system programming, and embedded C with live runnable code." />\n' +
'  <meta name="keywords" content="c tutorial, c course, learn c online, c basics, gcc compiler, c scanf, c operators, c conditions, c loops, c functions, c arrays, c strings, c pointers, c structures, c malloc, c file handling, c data structures, c algorithms, c posix" />\n' +
'  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />\n' +
'  <link rel="icon" type="image/png" href="/logo.png" />\n' +
'  <link rel="canonical" href="https://www.ourcompiler.com/blog-c.html" />\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com" />\n' +
'  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />\n' +
'  <link rel="stylesheet" href="/blog-style.css" />\n' +
'  <link rel="stylesheet" href="/blog-c/style.css" />\n' +
'  <link rel="stylesheet" href="/site-nav.css" />\n' +
'  <script>\n' +
'    function toggleAccordion(btn) {\n' +
'      const content = btn.nextElementSibling;\n' +
'      const isOpen = content.classList.contains("open");\n' +
'      if (isOpen) {\n' +
'        content.classList.remove("open");\n' +
'        btn.classList.remove("active");\n' +
'      } else {\n' +
'        content.classList.add("open");\n' +
'        btn.classList.add("active");\n' +
'      }\n' +
'    }\n' +
'  </script>\n' +
'</head>\n' +
'<body class="lang-c">\n' +
'<nav class="topnav">\n' +
'  <a href="/" class="brand">🖥️ Our Compiler</a>\n' +
'  <a href="/blog-python.html">Python</a>\n' +
'  <a href="/blog-java.html">Java</a>\n' +
'  <a href="/blog-javascript.html">JavaScript</a>\n' +
'  <a href="/blog-c.html" class="active">C</a>\n' +
'  <a href="/blog-cpp.html">C++</a>\n' +
'  <a href="/?lang=csharp">C#</a>\n' +
'  <a href="/blog-go.html">Go</a>\n' +
'  <a href="/blog-ruby.html">Ruby</a>\n' +
'  <a href="/blog-rust.html">Rust</a>\n' +
'  <a href="/blog-php.html">PHP</a>\n' +
'  <a href="/online-html-editor.html">HTML/CSS/JS</a>\n' +
'</nav>\n' +
'<div class="layout">\n' +
'  <aside class="sidebar">\n' +
'    <div class="sidebar-heading">C Master Course</div>\n' +
'    <a href="/blog-c.html" class="sidebar-home-link active">⚡ C Course HOME</a>\n' +
accordionSidebar +
'    <div class="sidebar-heading">Interactive IDE</div>\n' +
'    <a href="/?lang=c" style="color:#10b981; font-weight:700;">▶ Try C Online Compiler</a>\n' +
'    <a href="/blog.html">📚 All Tutorials</a>\n' +
'  </aside>\n' +
'  <main class="content">\n' +
'    <div class="breadcrumb">\n' +
'      <a href="/">Home</a><span class="sep">›</span>\n' +
'      <a href="/blog.html">Tutorials</a><span class="sep">›</span>\n' +
'      <span class="current">C Programming Masterclass</span>\n' +
'    </div>\n' +
'    <h1 class="page-title">C Programming Master Tutorial</h1>\n' +
'    <div class="page-meta">\n' +
'      <span class="badge">⚡ C (C17 / C23 Standard)</span>\n' +
'      <span class="badge">🟢 65 Comprehensive Master Chapters Across 22 Phases</span>\n' +
'      <span class="badge">📂 Unified Emerald Green Theme</span>\n' +
'      <span class="badge">📅 2026 Comprehensive Edition</span>\n' +
'    </div>\n' +
'    <div class="intro-box">\n' +
'      <p>Welcome to <strong>Our Compiler\'s C Programming Master Course</strong>. Designed by Dennis Ritchie at Bell Labs, C is the mother of modern computing powering operating system kernels (Linux, Windows, macOS), database engines (MySQL, PostgreSQL, Redis), embedded microcontrollers, and language runtimes. Each phase provides in-depth, hands-on architectural breakdowns with live runnable code.</p>\n' +
'    </div>\n' +
'    <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">\n' +
'      <h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Complete 22-Phase C Masterclass Roadmap</h3>\n' +
'      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Explore any phase below to master low-level systems programming, data structures, algorithms, POSIX system calls, multi-threading, and embedded C:</p>\n' +
'    </div>\n' +
'    <div class="section-title"><span class="num">📚</span> Master Course Curriculum Roadmap</div>\n' +
'    <div class="curriculum-roadmap-container">\n' +
roadmapCardsHtml +
'    </div>\n' +
'  </main>\n' +
'</div>\n' +
'  <script src="/site-nav.js" defer></script>\n' +
'</body>\n' +
'</html>';

  fs.writeFileSync(cHomePath, html, 'utf8');
  console.log('✅ Updated public/blog-c.html with 65 Chapters across 22 Phases!');
}

function run() {
  console.log('🚀 Building Complete C Masterclass (Phases 14 to 22 - Lessons 36 to 65)...');
  buildAllRemainingLessons();
  updateLesson35();
  cleanAuthorBlockFromAllFiles();
  updateAllCSidebars();
  buildBlogCHome();
  console.log('🎉 C Masterclass SUCCESSFULLY FULLY BUILT WITH ALL 65 CHAPTERS & 22 PHASES!');
}

run();
