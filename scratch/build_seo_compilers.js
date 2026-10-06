const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

const languages = [
  {
    filename: 'online-python-compiler.html',
    slug: 'python',
    langId: 'python3',
    title: 'Free Online Python Compiler - Run Python 3 Code Online | Our Compiler',
    heading: 'Free Online Python 3 Compiler',
    subheading: 'Write, compile, and run Python 3 code online instantly in your browser with Monaco editor, syntax highlighting, and interactive stdin support.',
    metaDesc: 'Write, compile, and run Python 3 code online instantly. Our Compiler provides a free, fast online Python compiler with Monaco editor, syntax highlighting, and stdin input support.',
    canonical: 'https://www.ourcompiler.com/online-python-compiler.html',
    langName: 'Python 3',
    badge: '🐍 Python 3 Runtime',
    introText: 'Python is a high-level, interpreted programming language renowned for its clean, readable syntax and immense versatility. Used extensively by data scientists, software engineers, automation specialists, and educators worldwide, Python is the top choice for beginners starting their coding journey. Our Online Python Compiler enables you to write, execute, and debug Python 3 scripts directly from your web browser without installing Python, Anaconda, or local development environments. Whether you are learning core syntax, experimenting with algorithms, or preparing for technical interviews, Our Compiler provides a seamless, zero-setup Python execution environment.',
    steps: [
      'Write or paste your Python 3 code into the interactive Monaco editor.',
      'If your script requires user input (using input()), enter input values into the Stdin prompt.',
      'Click the green ▶ Run Code button or press Ctrl + Enter to execute your program.',
      'View compilation results, return status, and program output instantly in the terminal.',
      'Modify variable values or logic and re-run your program to test edge cases.',
      'Click 📤 Share Code to generate a 4-digit PIN or shareable link for peer review.'
    ],
    examples: [
      {
        title: 'Example 1: Hello World & Basic Arithmetic',
        code: `# Hello World in Python 3
print("Hello, World!")

a = 15
b = 25
sum_result = a + b
print("Sum of", a, "and", b, "is:", sum_result)`,
        output: `Hello, World!
Sum of 15 and 25 is: 40`,
        explanation: 'The print() function outputs strings and variable values to stdout. Python automatically infers data types (integers in this case) without explicit type declarations.'
      },
      {
        title: 'Example 2: Interactive User Input & Strings',
        code: `# Reading User Input
name = input("Enter your name: ")
age = int(input("Enter your age: "))

print(f"Welcome {name}! Next year you will be {age + 1} years old.")`,
        output: `Enter your name: Alex
Enter your age: 20
Welcome Alex! Next year you will be 21 years old.`,
        explanation: 'The input() function reads a line from stdin as a string. The int() wrapper converts string input to an integer so arithmetic operations can be performed.'
      },
      {
        title: 'Example 3: Loops & List Comprehension',
        code: `# List Comprehension & Loops
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [x for x in numbers if x % 2 == 0]

print("Even Numbers:", evens)
print("Sum of Evens:", sum(evens))`,
        output: `Even Numbers: [2, 4, 6, 8, 10]
Sum of Evens: 30`,
        explanation: 'List comprehensions provide a concise way to create lists based on existing iterables. The sum() built-in function calculates total element values.'
      }
    ],
    errors: [
      { name: 'SyntaxError: invalid syntax', cause: 'Missing parentheses around print statements, unclosed quotes, or misspelled keywords.', fix: 'Ensure all string quotes match and check line ending punctuation.' },
      { name: 'IndentationError: unexpected indent', cause: 'Mixing spaces and tabs or incorrect indentation level inside code blocks.', fix: 'Use consistent 4-space indentation for control structures (if/for/def).' },
      { name: 'NameError: name is not defined', cause: 'Referencing a variable or function before assigning or defining it.', fix: 'Check spelling and verify variable assignment occurs before usage.' },
      { name: 'ValueError: invalid literal for int()', cause: 'Attempting to convert non-numeric string input (e.g. int("abc")) to integer.', fix: 'Validate string input format before calling int() or use try-except blocks.' }
    ],
    faqs: [
      { q: 'What version of Python is supported on this compiler?', a: 'Our Online Python Compiler runs the latest Python 3 runtime inside a secure Linux environment.' },
      { q: 'How do I pass user input to my Python script?', a: 'You can type inputs directly into the interactive Terminal panel when your code calls input(), or pre-enter your inputs before running.' },
      { q: 'Can I use Python standard library modules like math, sys, and datetime?', a: 'Yes! All standard Python 3 built-in modules including math, sys, os, datetime, json, re, and random are fully supported.' },
      { q: 'Is this a replacement for a full desktop IDE like PyCharm or VS Code?', a: 'No. Our Compiler is designed for browser-based coding practice, quick testing, and code sharing, whereas desktop IDEs are suited for large local software projects.' }
    ],
    relatedTutorials: [
      { title: 'Python Variables & Data Types', url: '/blog-python.html' },
      { title: 'Python Loops & Conditions', url: '/blog-python.html' },
      { title: 'Python Functions & Scope', url: '/blog-python.html' }
    ]
  },
  {
    filename: 'online-java-compiler.html',
    slug: 'java',
    langId: 'java',
    title: 'Free Online Java Compiler - Run Java Code Online | Our Compiler',
    heading: 'Free Online Java Compiler',
    subheading: 'Write, compile, and execute Java programs online instantly with OpenJDK runtime, Monaco IDE editor, and interactive input execution.',
    metaDesc: 'Write, compile, and run Java code online instantly. Our Compiler provides a free, fast online Java compiler with Monaco editor, syntax highlighting, and stdin input support.',
    canonical: 'https://www.ourcompiler.com/online-java-compiler.html',
    langName: 'Java',
    badge: '☕ Java OpenJDK Runtime',
    introText: 'Java is an object-oriented, class-based, concurrent programming language built around the principle of "Write Once, Run Anywhere" (WORA). Used by millions of enterprise developers and taught in computer science curricula globally, Java underpins backend web APIs, Android applications, and large-scale distributed systems. Our Online Java Compiler lets you write, compile, and execute Java programs online without configuring JDK path variables (JAVA_HOME) or installing heavy desktop IDEs like IntelliJ IDEA or Eclipse. Simply type your class code, click Run, and view stdout and stderr output in seconds.',
    steps: [
      'Write your Java class inside the editor window.',
      'Ensure your main method (public static void main(String[] args)) is included.',
      'Provide required inputs in the Stdin terminal if using Scanner or BufferedReader.',
      'Click the green ▶ Run Code button to trigger javac compilation and execution.',
      'Review stdout results, execution speed, and return codes in the terminal output.',
      'Use multi-tab program feature to organize different Java exercise files.'
    ],
    examples: [
      {
        title: 'Example 1: Hello World & Class Structure',
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World from Online Java Compiler!");
        
        int a = 10, b = 20;
        System.out.println("Sum: " + (a + b));
    }
}`,
        output: `Hello, World from Online Java Compiler!
Sum: 30`,
        explanation: 'In Java, every executable program must reside inside a class with a main method matching public static void main(String[] args).'
      },
      {
        title: 'Example 2: Scanner Input & Control Flow',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter number: ");
        int num = scanner.nextInt();
        
        if (num % 2 == 0) {
            System.out.println(num + " is Even");
        } else {
            System.out.println(num + " is Odd");
        }
    }
}`,
        output: `Enter number: 14
14 is Even`,
        explanation: 'java.util.Scanner reads primitive types from System.in. The modulus operator (%) checks for even divisibility by 2.'
      },
      {
        title: 'Example 3: Object-Oriented Class & Methods',
        code: `class Rectangle {
    int width, height;
    
    Rectangle(int w, int h) {
        this.width = w;
        this.height = h;
    }
    
    int getArea() {
        return width * height;
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle rect = new Rectangle(5, 8);
        System.out.println("Rectangle Area: " + rect.getArea());
    }
}`,
        output: `Rectangle Area: 40`,
        explanation: 'Demonstrates Java Object-Oriented principles including class instantiation, constructor initialization, and method invocation.'
      }
    ],
    errors: [
      { name: 'cannot find symbol', cause: 'Typo in variable name, missing import (e.g. java.util.Scanner), or out-of-scope variable usage.', fix: 'Verify variable declaration spelling and add appropriate import statements at top of file.' },
      { name: 'class Main is public, should be declared in a file named Main.java', cause: 'Public class name does not match source file name.', fix: 'Our auto-preprocessor handles class rename, or ensure main class matches public class name.' },
      { name: 'NullPointerException', cause: 'Attempting to call methods or access fields on an uninitialized null object reference.', fix: 'Instantiate objects with new keyword before accessing member methods.' },
      { name: 'ArrayIndexOutOfBoundsException', cause: 'Accessing array index less than 0 or greater than or equal to array length.', fix: 'Check loop boundaries and array size before accessing elements.' }
    ],
    faqs: [
      { q: 'Must my Java class be named Main?', a: 'By default, our Java runner uses class Main, but our pre-processor automatically detects public class names and adjusts them so your code compiles smoothly.' },
      { q: 'Does this Java compiler support Object-Oriented Programming (OOP)?', a: 'Yes! You can define classes, methods, inheritance, interfaces, polymorphism, encapsulation, and exception handling.' },
      { q: 'Can I test Java Scanner input online?', a: 'Yes! You can interactively provide inputs when java.util.Scanner or BufferedReader reads from System.in.' },
      { q: 'Is this Java compiler free for classroom use?', a: 'Yes, 100% free for students, educators, and coding bootcamp practice.' }
    ],
    relatedTutorials: [
      { title: 'Java Classes & Objects', url: '/blog-java.html' },
      { title: 'Java Control Flow & Loops', url: '/blog-java.html' },
      { title: 'Java Exception Handling', url: '/blog-java.html' }
    ]
  },
  {
    filename: 'online-c-compiler.html',
    slug: 'c',
    langId: 'c',
    title: 'Free Online C Compiler - Run GCC C Code Online | Our Compiler',
    heading: 'Free Online C Compiler',
    subheading: 'Compile and run C code online using GCC compiler with Monaco editor, pointers support, struct handling, and interactive stdin.',
    metaDesc: 'Write, compile, and run C code online instantly. Our Compiler provides a free, fast online C compiler powered by GCC with Monaco editor, syntax highlighting, and stdin support.',
    canonical: 'https://www.ourcompiler.com/online-c-compiler.html',
    langName: 'C Language',
    badge: '🔵 GCC C Compiler',
    introText: 'C is the foundational procedural programming language that powers operating systems, embedded hardware, database kernels, and core system tools. Understanding C provides unmatched insight into computer memory management, pointer arithmetic, and system architecture. Our Online C Compiler uses GCC (GNU Compiler Collection) inside an isolated Linux container to compile and execute C source code instantly in your browser. Practice pointers, memory allocation (malloc/free), structs, string manipulation, and Data Structures without installing Code::Blocks, Dev-C++, or local GCC toolchains.',
    steps: [
      'Type or paste your C source code into the Monaco editor.',
      'Include standard headers like <stdio.h>, <stdlib.h>, or <string.h>.',
      'Provide stdin values if your program uses scanf() or fgets().',
      'Click green ▶ Run Code button to compile via GCC and execute.',
      'Review output, compilation warnings, and execution metrics in the terminal.',
      'Use ✨ Format Code to beautify syntax spacing and alignment.'
    ],
    examples: [
      {
        title: 'Example 1: Hello World & Printf Formatting',
        code: `#include <stdio.h>

int main() {
    printf("Hello, World from Online C Compiler!\\n");
    
    int x = 10, y = 20;
    printf("Values: x = %d, y = %d, Sum = %d\\n", x, y, x + y);
    return 0;
}`,
        output: `Hello, World from Online C Compiler!
Values: x = 10, y = 20, Sum = 30`,
        explanation: 'The main() function returns 0 upon successful execution. %d format specifiers output integer values.'
      },
      {
        title: 'Example 2: Pointer Arithmetic & Memory Addresses',
        code: `#include <stdio.h>

int main() {
    int num = 42;
    int *ptr = &num;
    
    printf("Value of num: %d\\n", num);
    printf("Address of num: %p\\n", (void*)&num);
    printf("Value via ptr: %d\\n", *ptr);
    return 0;
}`,
        output: `Value of num: 42
Address of num: 0x7ffe...
Value via ptr: 42`,
        explanation: '& operator retrieves variable memory address, while * dereferences the pointer to read stored value.'
      },
      {
        title: 'Example 3: Dynamic Memory Allocation (malloc)',
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = (int*)malloc(n * sizeof(int));
    
    if (arr == NULL) {
        printf("Memory allocation failed\\n");
        return 1;
    }
    
    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
        printf("arr[%d] = %d\\n", i, arr[i]);
    }
    
    free(arr);
    return 0;
}`,
        output: `arr[0] = 10
arr[1] = 20
arr[2] = 30
arr[3] = 40
arr[4] = 50`,
        explanation: 'malloc() allocates dynamic heap memory, checked against NULL. free() deallocates memory post-usage.'
      }
    ],
    errors: [
      { name: 'implicit declaration of function', cause: 'Calling a function before declaring it or missing required header (e.g. <stdio.h>).', fix: 'Include appropriate #include <header.h> directives at top of file.' },
      { name: 'segmentation fault (core dumped)', cause: 'Dereferencing NULL or invalid pointer, accessing array out of bounds.', fix: 'Check pointer initialization and array bounds before accessing memory.' },
      { name: 'expected ; before token', cause: 'Missing semicolon at end of statement.', fix: 'Add semicolon ; at end of preceding line statement.' },
      { name: 'conflicting types for function', cause: 'Function implementation signature differs from prototype declaration.', fix: 'Ensure parameter types and return type match prototype exactly.' }
    ],
    faqs: [
      { q: 'Which GCC compiler version is used?', a: 'Our C compiler uses modern GCC on a 64-bit Linux sandbox environment.' },
      { q: 'Can I use C standard library headers like <stdio.h> and <stdlib.h>?', a: 'Yes! Standard C headers including stdio.h, stdlib.h, string.h, math.h, and stdbool.h are fully available.' },
      { q: 'Does it support scanf() for user input?', a: 'Yes, interactive input via scanf(), getchar(), and fgets() is fully supported in our interactive terminal.' },
      { q: 'Can I test pointers and memory allocation?', a: 'Yes! Full support for malloc, calloc, realloc, free, and pointer arithmetic.' }
    ],
    relatedTutorials: [
      { title: 'C Pointers & Memory', url: '/blog-c.html' },
      { title: 'C Structures & Unions', url: '/blog-c.html' },
      { title: 'C File I/O', url: '/blog-c.html' }
    ]
  },
  {
    filename: 'online-cpp-compiler.html',
    slug: 'cpp',
    langId: 'cpp17',
    title: 'Free Online C++ Compiler - Run C++17 Code Online | Our Compiler',
    heading: 'Free Online C++ Compiler',
    subheading: 'Compile and run C++17 code online using GCC g++ with STL support, vector operations, Monaco editor, and fast execution.',
    metaDesc: 'Write, compile, and run C++17 code online instantly. Our Compiler provides a free, fast online C++ compiler with Monaco editor, STL library support, and stdin input.',
    canonical: 'https://www.ourcompiler.com/online-cpp-compiler.html',
    langName: 'C++17',
    badge: '⚡ GCC g++ C++17 Runtime',
    introText: 'C++ is a high-performance, object-oriented, and system programming language renowned for its speed, low-level memory control, and rich Standard Template Library (STL). Widely used in competitive programming, game engines, financial trading platforms, and operating systems, C++ combines procedural precision with object-oriented abstractions. Our Online C++ Compiler compiles C++17 code using GCC g++ inside an isolated cloud sandbox. Full support for STL containers (vector, map, set, queue, stack), modern smart pointers, lambdas, and OOP classes without installing local IDEs.',
    steps: [
      'Write your C++ source code in the Monaco editor.',
      'Include required header files like <iostream>, <vector>, or <algorithm>.',
      'Provide test case inputs in the Stdin terminal prompt if reading via std::cin.',
      'Click green ▶ Run Code button to compile via g++ and execute.',
      'Inspect compiler errors, execution timing, and output stream in terminal.',
      'Share code snippets using the 4-digit PIN sharing feature.'
    ],
    examples: [
      {
        title: 'Example 1: std::cout & Basic I/O',
        code: `#include <iostream>

int main() {
    std::cout << "Hello, World from Online C++ Compiler!" << std::endl;
    
    int a = 25, b = 75;
    std::cout << "Sum of " << a << " and " << b << " = " << (a + b) << std::endl;
    return 0;
}`,
        output: `Hello, World from Online C++ Compiler!
Sum of 25 and 75 = 100`,
        explanation: 'std::cout stream operator (<<) outputs data to terminal stream. std::endl flushes buffer and prints newline.'
      },
      {
        title: 'Example 2: C++ STL Vector & Algorithms',
        code: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {40, 10, 50, 20, 30};
    
    std::sort(nums.begin(), nums.end());
    
    std::cout << "Sorted Vector: ";
    for (int x : nums) {
        std::cout << x << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
        output: `Sorted Vector: 10 20 30 40 50`,
        explanation: 'std::vector dynamic array container sorted using std::sort algorithm and range-based for loop.'
      },
      {
        title: 'Example 3: OOP Class & Constructor',
        code: `#include <iostream>
#include <string>

class Student {
public:
    std::string name;
    int score;
    
    Student(std::string n, int s) : name(n), score(s) {}
    
    void display() {
        std::cout << "Student: " << name << ", Score: " << score << std::endl;
    }
};

int main() {
    Student s1("Emma", 95);
    s1.display();
    return 0;
}`,
        output: `Student: Emma, Score: 95`,
        explanation: 'Demonstrates object-oriented programming with member variable initialization list and method call.'
      }
    ],
    errors: [
      { name: 'was not declared in this scope', cause: 'Missing header file or forgotten std:: namespace prefix.', fix: 'Include required #include header or add using namespace std; / std:: prefix.' },
      { name: 'no matching function for call to', cause: 'Passing parameters that do not match function overload signatures.', fix: 'Check parameter data types and numbers passed to function.' },
      { name: 'fatal error: header: No such file or directory', cause: 'Typo in header name or non-existent header directive.', fix: 'Verify header file spelling (e.g. <vector> instead of <vectors>).' },
      { name: 'segmentation fault', cause: 'Invalid vector index access, dangling pointer, or stack overflow.', fix: 'Use bounds-checked vector at() method or check iterator validity.' }
    ],
    faqs: [
      { q: 'Is C++ STL (Standard Template Library) supported?', a: 'Yes! All STL containers (vector, map, unordered_map, set, stack, queue, pair) and algorithms are ready to use.' },
      { q: 'Can I use this for Competitive Programming practice?', a: 'Absolutely! Thousands of students use Our C++ Compiler to practice LeetCode, HackerRank, CodeChef, and GeeksforGeeks problems.' },
      { q: 'Which C++ standard is enabled?', a: 'Our compiler enables C++17 standard features by default.' }
    ],
    relatedTutorials: [
      { title: 'C++ STL Mastery', url: '/blog-cpp.html' },
      { title: 'C++ OOP Concepts', url: '/blog-cpp.html' },
      { title: 'C++ Pointers & References', url: '/blog-cpp.html' }
    ]
  },
  {
    filename: 'online-javascript-compiler.html',
    slug: 'javascript',
    langId: 'nodejs',
    title: 'Free Online JavaScript Compiler - Run Node.js Code Online | Our Compiler',
    heading: 'Free Online JavaScript Compiler',
    subheading: 'Write, run, and evaluate JavaScript & Node.js code online instantly with ES6+ features, JSON parsing, and Monaco editor.',
    metaDesc: 'Write, compile, and run JavaScript & Node.js code online instantly. Our Compiler provides a free, fast online JavaScript compiler with Monaco editor and ES6+ support.',
    canonical: 'https://www.ourcompiler.com/online-javascript-compiler.html',
    langName: 'JavaScript (Node.js)',
    badge: '🟨 Node.js ES6+ Engine',
    introText: 'JavaScript is the core programming language of the web, powering interactive browser interfaces and high-performance server-side applications via Node.js. Modern JavaScript (ES6+) provides powerful features including Arrow Functions, Promises, Async/Await, Destructuring, and Array methods. Our Online JavaScript Compiler runs Node.js engine in a cloud sandbox, enabling you to test algorithm logic, data transformations, and JS snippets without installing Node.js locally.',
    steps: [
      'Write your JavaScript code into the Monaco editor.',
      'Use console.log() to print outputs to terminal stream.',
      'Click green ▶ Run Code button to execute via Node.js.',
      'Inspect output formatting and JSON objects in the terminal.',
      'Format code with ✨ Format Code for clean spacing.',
      'Share code snippet with peers via 4-digit PIN.'
    ],
    examples: [
      {
        title: 'Example 1: ES6 Arrow Functions & Array Methods',
        code: `// Online JavaScript / Node.js Compiler
const numbers = [10, 20, 30, 40, 50];

const doubled = numbers.map(num => num * 2);
const filtered = numbers.filter(num => num > 25);

console.log("Original:", numbers);
console.log("Doubled:", doubled);
console.log("Filtered (>25):", filtered);`,
        output: `Original: [ 10, 20, 30, 40, 50 ]
Doubled: [ 20, 40, 60, 80, 100 ]
Filtered (>25): [ 30, 40, 50 ]`,
        explanation: 'Functional array methods map() and filter() process elements cleanly without explicit for loops.'
      },
      {
        title: 'Example 2: Async/Await & Promises',
        code: `const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data loaded successfully!"), 100);
  });
};

async function main() {
  console.log("Fetching...");
  const result = await fetchData();
  console.log(result);
}

main();`,
        output: `Fetching...
Data loaded successfully!`,
        explanation: 'Demonstrates asynchronous JavaScript execution flow using Promise resolution and async/await syntax.'
      },
      {
        title: 'Example 3: Object Destructuring & JSON',
        code: `const user = {
  id: 101,
  name: "Sarah",
  role: "Developer",
  skills: ["JS", "React", "Node"]
};

const { name, role } = user;
console.log(\`User \${name} is a \${role}\`);
console.log("JSON String:", JSON.stringify(user));`,
        output: `User Sarah is a Developer
JSON String: {"id":101,"name":"Sarah","role":"Developer","skills":["JS","React","Node"]}`,
        explanation: 'Template literals (\`...\`) format variables easily, while JSON.stringify serializes objects.'
      }
    ],
    errors: [
      { name: 'ReferenceError: X is not defined', cause: 'Accessing variable before declaration or misspelling variable name.', fix: 'Verify variable declaration with const/let before calling.' },
      { name: 'TypeError: X is not a function', cause: 'Attempting to call a non-function value or undefined method.', fix: 'Verify object property type before appending () invocation.' },
      { name: 'SyntaxError: Unexpected token', cause: 'Missing closing bracket }, bracket ], or quotes in code block.', fix: 'Check bracket pairing and template literal backticks.' }
    ],
    faqs: [
      { q: 'Does this JavaScript compiler run Node.js or browser JS?', a: 'It runs Node.js engine on a secure server sandbox, allowing you to test backend JS algorithms, console outputs, and logic.' },
      { q: 'Are modern ES6+ features supported?', a: 'Yes! Arrow functions, destructuring, template literals, async/await, Map/Set, and ES Modules are supported.' }
    ],
    relatedTutorials: [
      { title: 'JavaScript ES6+ Guide', url: '/blog-javascript.html' },
      { title: 'JavaScript Async/Await', url: '/blog-javascript.html' }
    ]
  },
  {
    filename: 'online-csharp-compiler.html',
    slug: 'csharp',
    langId: 'csharp',
    title: 'Free Online C# Compiler - Run .NET C# Code Online | Our Compiler',
    heading: 'Free Online C# Compiler',
    subheading: 'Write and compile .NET C# code online with Mono / Roslyn compiler engine, LINQ support, and Monaco IDE editor.',
    metaDesc: 'Write, compile, and run C# (.NET) code online instantly. Our Compiler provides a free, fast online C# compiler with Monaco editor, LINQ support, and stdin input.',
    canonical: 'https://www.ourcompiler.com/online-csharp-compiler.html',
    langName: 'C# (.NET)',
    badge: '🔷 .NET / Mono C# Runtime',
    introText: 'C# is a modern, object-oriented, strongly-typed programming language developed by Microsoft for enterprise cloud applications, Unity game development, Web APIs, and desktop software. Our Online C# Compiler enables you to write, compile, and execute C# code online without installing Visual Studio or .NET SDK.',
    steps: [
      'Write your C# class code inside the editor.',
      'Ensure Main method exists: static void Main().',
      'Click green ▶ Run Code button to compile via Roslyn/Mono.',
      'Inspect output in the terminal.'
    ],
    examples: [
      {
        title: 'Example 1: Hello World & C# String Formatting',
        code: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World from Online C# Compiler!");
        
        string name = "Developer";
        Console.WriteLine($"Welcome, {name}!");
    }
}`,
        output: `Hello, World from Online C# Compiler!
Welcome, Developer!`,
        explanation: 'Console.WriteLine prints formatted strings using C# string interpolation ($"...").'
      }
    ],
    errors: [
      { name: 'CS0103: The name does not exist in current context', cause: 'Misspelled variable or missing using System; namespace.', fix: 'Add using System; at top of file.' }
    ],
    faqs: [
      { q: 'Is LINQ supported in this C# compiler?', a: 'Yes! System.Linq and standard C# collections are fully supported.' },
      { q: 'Do I need Visual Studio installed on my computer?', a: 'No setup required. Everything runs in browser.' }
    ],
    relatedTutorials: [
      { title: 'C# OOP Fundamentals', url: '/blog-csharp.html' }
    ]
  },
  {
    filename: 'online-go-compiler.html',
    slug: 'go',
    langId: 'go',
    title: 'Free Online Go Compiler - Run Golang Code Online | Our Compiler',
    heading: 'Free Online Go Compiler',
    subheading: 'Write, compile, and execute Golang code online instantly with fast compilation, goroutine concurrency support, and Monaco editor.',
    metaDesc: 'Write, compile, and run Go (Golang) code online instantly. Our Compiler provides a free, fast online Go compiler with Monaco editor, syntax highlighting, and stdin input support.',
    canonical: 'https://www.ourcompiler.com/online-go-compiler.html',
    langName: 'Go (Golang)',
    badge: '🐹 Golang Compiler Engine',
    introText: 'Go (Golang) is an open-source programming language designed at Google for cloud infrastructure, microservices, fast compilation, and concurrent systems. Our Online Go Compiler allows you to write and run Go programs online without setting up local GOROOT or GOPATH.',
    steps: [
      'Write your Go package main code.',
      'Click green ▶ Run Code button.',
      'View output in terminal.'
    ],
    examples: [
      {
        title: 'Example 1: Package Main & Slices',
        code: `package main
import "fmt"

func main() {
    fmt.Println("Hello, World from Online Go Compiler!")
    
    slice := []string{"Go", "Docker", "Kubernetes"}
    for i, item := range slice {
        fmt.Printf("%d: %s\\n", i+1, item)
    }
}`,
        output: `Hello, World from Online Go Compiler!
1: Go
2: Docker
3: Kubernetes`,
        explanation: 'Package main is required for executable Go binaries. Range iterates over slices cleanly.'
      }
    ],
    errors: [
      { name: 'imported and not used', cause: 'Go compiler flags unused imports as hard errors.', fix: 'Remove unused package imports from import () block.' }
    ],
    faqs: [
      { q: 'Can I run Go routines and concurrency code?', a: 'Yes, standard Go concurrency features including goroutines and channels are supported.' }
    ],
    relatedTutorials: [
      { title: 'Go Basics & Slices', url: '/blog-go.html' }
    ]
  },
  {
    filename: 'online-rust-compiler.html',
    slug: 'rust',
    langId: 'rust',
    title: 'Free Online Rust Compiler - Run Rust Code Online | Our Compiler',
    heading: 'Free Online Rust Compiler',
    subheading: 'Write, compile, and run Rust code online with rustc compiler, memory safety checking, cargo support, and Monaco editor.',
    metaDesc: 'Write, compile, and run Rust code online instantly. Our Compiler provides a free, fast online Rust compiler with Monaco editor, syntax highlighting, and stdin input support.',
    canonical: 'https://www.ourcompiler.com/online-rust-compiler.html',
    langName: 'Rust',
    badge: '🦀 rustc Compiler Engine',
    introText: 'Rust is a systems programming language focused on speed, memory safety, and safe concurrency without a garbage collector. Our Online Rust Compiler runs rustc inside a secure Linux container, allowing you to test ownership, borrowing, and vectors without installing rustup locally.',
    steps: [
      'Write fn main() code in editor.',
      'Click green ▶ Run Code button to compile via rustc.',
      'Review output and borrow checker diagnostic logs.'
    ],
    examples: [
      {
        title: 'Example 1: Rust Fn Main & Vectors',
        code: `fn main() {
    println!("Hello, World from Online Rust Compiler!");
    
    let numbers = vec![10, 20, 30, 40];
    let sum: i32 = numbers.iter().sum();
    println!("Sum: {}", sum);
}`,
        output: `Hello, World from Online Rust Compiler!
Sum: 100`,
        explanation: 'println! macro prints formatted output. Rust guarantees memory safety at compile time.'
      }
    ],
    errors: [
      { name: 'cannot borrow as mutable', cause: 'Attempting to mutate an immutable variable binding.', fix: 'Declare variable with let mut binding.' }
    ],
    faqs: [
      { q: 'Which Rust compiler is used?', a: 'Our compiler uses stable rustc on 64-bit Linux.' }
    ],
    relatedTutorials: [
      { title: 'Rust Ownership & Borrowing', url: '/blog-rust.html' }
    ]
  },
  {
    filename: 'online-php-compiler.html',
    slug: 'php',
    langId: 'php',
    title: 'Free Online PHP Compiler - Run PHP Code Online | Our Compiler',
    heading: 'Free Online PHP Compiler',
    subheading: 'Write, execute, and test PHP scripts online with CLI interpreter, array manipulation, string functions, and Monaco editor.',
    metaDesc: 'Write, compile, and run PHP code online instantly. Our Compiler provides a free, fast online PHP compiler with Monaco editor, syntax highlighting, and stdin input support.',
    canonical: 'https://www.ourcompiler.com/online-php-compiler.html',
    langName: 'PHP',
    badge: '🐘 PHP CLI Engine',
    introText: 'PHP is a widely-used server-side scripting language designed for web development. Our Online PHP Compiler runs PHP CLI (Command Line Interface), enabling you to test PHP arrays, functions, strings, and OOP without XAMPP or local web servers.',
    steps: [
      'Write your PHP script inside <?php ... ?> tags.',
      'Click ▶ Run Code to execute via PHP CLI.',
      'View output in terminal.'
    ],
    examples: [
      {
        title: 'Example 1: PHP Arrays & Loops',
        code: `<?php
echo "Hello, World from Online PHP Compiler!\\n";

$frameworks = ["Laravel", "Symfony", "WordPress"];
foreach ($frameworks as $fw) {
    echo "Framework: " . $fw . "\\n";
}
?>`,
        output: `Hello, World from Online PHP Compiler!
Framework: Laravel
Framework: Symfony
Framework: WordPress`,
        explanation: 'PHP CLI executes standard PHP scripts cleanly.'
      }
    ],
    errors: [
      { name: 'Parse error: syntax error, unexpected token', cause: 'Missing semicolon or parenthesis in script.', fix: 'Add missing semicolon at end of line.' }
    ],
    faqs: [
      { q: 'Do I need XAMPP installed?', a: 'No, PHP CLI runs in browser.' }
    ],
    relatedTutorials: [
      { title: 'PHP Array Methods', url: '/blog-php.html' }
    ]
  },
  {
    filename: 'online-ruby-compiler.html',
    slug: 'ruby',
    langId: 'ruby',
    title: 'Free Online Ruby Compiler - Run Ruby Code Online | Our Compiler',
    heading: 'Free Online Ruby Compiler',
    subheading: 'Write and run Ruby code online instantly with MRI Ruby interpreter, elegant syntax, blocks/iterators, and Monaco IDE.',
    metaDesc: 'Write, compile, and run Ruby code online instantly. Our Compiler provides a free, fast online Ruby compiler with Monaco editor, syntax highlighting, and stdin input support.',
    canonical: 'https://www.ourcompiler.com/online-ruby-compiler.html',
    langName: 'Ruby',
    badge: '💎 Ruby Interpreter Engine',
    introText: 'Ruby is an elegant, object-oriented scripting language focused on developer happiness and code readability. Our Online Ruby Compiler lets you test Ruby blocks, classes, and gems concepts online instantly.',
    steps: [
      'Type Ruby code in editor.',
      'Click ▶ Run Code button.',
      'View output.'
    ],
    examples: [
      {
        title: 'Example 1: Ruby Blocks & Iterators',
        code: `# Online Ruby Compiler
puts "Hello, World from Online Ruby Compiler!"

3.times do |i|
  puts "Ruby Iteration #{i + 1}"
end`,
        output: `Hello, World from Online Ruby Compiler!
Ruby Iteration 1
Ruby Iteration 2
Ruby Iteration 3`,
        explanation: 'Ruby uses puts for terminal output and elegant blocks (do...end).'
      }
    ],
    errors: [
      { name: 'undefined local variable or method', cause: 'Misspelled variable or variable out of block scope.', fix: 'Verify variable spelling.' }
    ],
    faqs: [
      { q: 'Is Ruby free to test online?', a: 'Yes, 100% free.' }
    ],
    relatedTutorials: [
      { title: 'Ruby Basics', url: '/blog-ruby.html' }
    ]
  }
];

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generateHTML(lang) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": lang.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `Our Compiler - ${lang.langName}`,
    "url": lang.canonical,
    "description": lang.metaDesc,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Our Compiler",
      "url": "https://www.ourcompiler.com/"
    }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${lang.title}</title>
  <meta name="description" content="${lang.metaDesc}" />
  <meta name="keywords" content="our compiler, ourcompiler, online compiler, free online compiler, ${lang.langName.toLowerCase()} compiler, run ${lang.langName.toLowerCase()} code online, online IDE" />
  <meta name="author" content="Our Compiler — Balanju Solutions" />
  <link rel="canonical" href="${lang.canonical}" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${lang.canonical}" />
  <meta property="og:title" content="${lang.title}" />
  <meta property="og:description" content="${lang.metaDesc}" />
  <meta property="og:image" content="https://www.ourcompiler.com/logo.png" />
  <meta property="og:site_name" content="Our Compiler" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${lang.title}" />
  <meta name="twitter:description" content="${lang.metaDesc}" />
  <meta name="twitter:image" content="https://www.ourcompiler.com/logo.png" />

  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="apple-touch-icon" href="/logo.png" />
  <link rel="stylesheet" href="/pages.css" />

  <!-- JSON-LD Structured Data Schemas -->
  <script type="application/ld+json">
  ${JSON.stringify(webAppSchema, null, 2)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify(faqSchema, null, 2)}
  </script>

  <!-- Google AdSense - Lazy Loaded to prevent blocking page load -->
  <script>
    function loadAdSense() {
      if (window.adsenseLoaded) return;
      window.adsenseLoaded = true;
      var s = document.createElement('script');
      s.async = true;
      s.crossOrigin = 'anonymous';
      s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7028247458903242';
      document.head.appendChild(s);
    }
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadAdSense, { timeout: 3500 });
    } else {
      setTimeout(loadAdSense, 2500);
    }
  </script>
  <!-- Ezoic Privacy & Header Scripts -->
  <script data-cfasync="false" src="https://cmp.gatekeeperconsent.com/min.js"></script>
  <script data-cfasync="false" src="https://the.gatekeeperconsent.com/cmp.min.js"></script>
  <script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
  <script>
    window.ezstandalone = window.ezstandalone || {};
    ezstandalone.cmd = ezstandalone.cmd || [];
  </script>
  <script src="//ezoicanalytics.com/analytics.js"></script>
</head>
<body>
  <!-- Pre-rendered Static Content for SEO & Search Engine Crawlers -->
  <div id="root">
    <nav class="topnav" style="background:#0d1117; padding: 12px 24px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #30363d;">
      <a href="/" class="brand" style="font-family:'Sora',sans-serif; font-weight:700; color:#fff; text-decoration:none; font-size:18px;">🖥️ Our Compiler</a>
      <div style="display:flex; gap:16px; align-items:center; font-size:14px;">
        <a href="/online-python-compiler.html" style="color:#58a6ff; text-decoration:none;">Python</a>
        <a href="/online-java-compiler.html" style="color:#58a6ff; text-decoration:none;">Java</a>
        <a href="/online-c-compiler.html" style="color:#58a6ff; text-decoration:none;">C</a>
        <a href="/online-cpp-compiler.html" style="color:#58a6ff; text-decoration:none;">C++</a>
        <a href="/online-javascript-compiler.html" style="color:#58a6ff; text-decoration:none;">JavaScript</a>
        <a href="/about.html" style="color:#8b949e; text-decoration:none;">About</a>
        <a href="/privacy-policy.html" style="color:#8b949e; text-decoration:none;">Privacy</a>
      </div>
    </nav>

    <main class="page-content" style="max-width: 1000px; margin: 0 auto; padding: 32px 20px; font-family:'Inter',sans-serif; color:#c9d1d9;">
      <!-- Hero Header -->
      <div style="text-align:center; margin-bottom: 36px;">
        <span style="background:rgba(88,166,255,0.1); border:1px solid rgba(88,166,255,0.3); color:#58a6ff; border-radius:20px; padding:6px 16px; font-size:13px; font-weight:600; display:inline-block; margin-bottom:12px;">${escapeHtml(lang.badge)}</span>
        <h1 style="font-family:'Sora',sans-serif; font-size:32px; font-weight:800; color:#fff; margin-bottom:12px;">${escapeHtml(lang.heading)}</h1>
        <p style="font-size:16px; color:#8b949e; max-width:760px; margin:0 auto; line-height:1.6;">${escapeHtml(lang.subheading)}</p>
      </div>

      <!-- Overview Section (150-250 words) -->
      <article style="background:#161b22; border:1px solid #30363d; border-radius:12px; padding:28px; margin-bottom:32px; line-height:1.75;">
        <h2 style="font-size:22px; color:#fff; margin-bottom:16px; font-family:'Sora',sans-serif;">Overview of ${escapeHtml(lang.langName)} Compiler</h2>
        <p style="font-size:15px; color:#c9d1d9;">${escapeHtml(lang.introText)}</p>
      </article>

      <!-- Step-by-Step How to Use Guide -->
      <section style="background:#161b22; border:1px solid #30363d; border-radius:12px; padding:28px; margin-bottom:32px;">
        <h2 style="font-size:22px; color:#fff; margin-bottom:16px; font-family:'Sora',sans-serif;">How to Use the ${escapeHtml(lang.langName)} Compiler</h2>
        <ol style="padding-left:20px; line-height:1.8; font-size:15px; color:#c9d1d9;">
          ${lang.steps.map(step => `<li style="margin-bottom:8px;">${escapeHtml(step)}</li>`).join('')}
        </ol>
      </section>

      <!-- Tested Code Examples -->
      <section style="margin-bottom:36px;">
        <h2 style="font-size:24px; color:#fff; margin-bottom:20px; font-family:'Sora',sans-serif;">🧪 Tested Code Examples (${escapeHtml(lang.langName)})</h2>
        ${lang.examples.map(ex => `
          <div style="background:#161b22; border:1px solid #30363d; border-radius:12px; padding:24px; margin-bottom:24px;">
            <h3 style="font-size:18px; color:#58a6ff; margin-bottom:12px; font-family:'Sora',sans-serif;">${escapeHtml(ex.title)}</h3>
            <pre style="background:#0d1117; border:1px solid #30363d; border-radius:8px; padding:16px; overflow-x:auto; font-family:'JetBrains Mono',monospace; color:#3fb950; font-size:14px; line-height:1.5;"><code>${escapeHtml(ex.code)}</code></pre>
            <div style="margin-top:12px; background:rgba(88,166,255,0.06); border-left:4px solid #58a6ff; padding:12px 16px; border-radius:4px; font-size:14px; color:#c9d1d9;">
              <strong>Expected Output:</strong>
              <pre style="margin-top:6px; color:#e6edf3; font-family:'JetBrains Mono',monospace; font-size:13px;">${escapeHtml(ex.output)}</pre>
            </div>
            <p style="margin-top:12px; font-size:14px; color:#8b949e; line-height:1.6;"><strong>Code Explanation:</strong> ${escapeHtml(ex.explanation)}</p>
          </div>
        `).join('')}
        <div style="text-align:center; margin-top:16px; font-size:14px; color:#58a6ff;">
          💡 <em>Try modifying these examples and execute them directly in the compiler editor above!</em>
        </div>
      </section>

      <!-- Common Errors & Debugging Guide -->
      <section style="background:#161b22; border:1px solid #30363d; border-radius:12px; padding:28px; margin-bottom:32px;">
        <h2 style="font-size:22px; color:#fff; margin-bottom:20px; font-family:'Sora',sans-serif;">🛠️ Common ${escapeHtml(lang.langName)} Compiler Errors &amp; Fixes</h2>
        ${lang.errors.map(err => `
          <div style="margin-bottom:16px; border-bottom:1px solid #30363d; padding-bottom:14px;">
            <h3 style="font-size:16px; color:#ff6b6b; margin-bottom:6px; font-family:'JetBrains Mono',monospace;">⚠️ ${escapeHtml(err.name)}</h3>
            <p style="font-size:14px; color:#c9d1d9; margin:0 0 4px 0;"><strong>Cause:</strong> ${escapeHtml(err.cause)}</p>
            <p style="font-size:14px; color:#3fb950; margin:0;"><strong>How to Fix:</strong> ${escapeHtml(err.fix)}</p>
          </div>
        `).join('')}
      </section>

      <!-- Frequently Asked Questions (FAQ) -->
      <section style="background:#161b22; border:1px solid #30363d; border-radius:12px; padding:28px; margin-bottom:32px;">
        <h2 style="font-size:22px; color:#fff; margin-bottom:20px; font-family:'Sora',sans-serif;">Frequently Asked Questions (FAQ)</h2>
        ${lang.faqs.map(f => `
          <div style="margin-bottom:20px; border-bottom:1px solid #30363d; padding-bottom:16px;">
            <h3 style="font-size:16px; color:#58a6ff; margin-bottom:8px; font-family:'Sora',sans-serif;">Q: ${escapeHtml(f.q)}</h3>
            <p style="font-size:14px; color:#8b949e; margin:0; line-height:1.6;">${escapeHtml(f.a)}</p>
          </div>
        `).join('')}
      </section>

      <!-- Footer Links -->
      <footer style="text-align:center; padding-top:20px; border-top:1px solid #30363d; font-size:13px; color:#8b949e;">
        <p style="margin-bottom:8px;">© 2026 Our Compiler · Balanju Solutions. All rights reserved.</p>
        <div style="display:flex; gap:16px; justify-content:center;">
          <a href="/about.html" style="color:#58a6ff; text-decoration:none;">About Us</a>
          <a href="/privacy-policy.html" style="color:#58a6ff; text-decoration:none;">Privacy Policy</a>
          <a href="/terms-of-service.html" style="color:#58a6ff; text-decoration:none;">Terms of Service</a>
          <a href="/contact.html" style="color:#58a6ff; text-decoration:none;">Contact</a>
        </div>
      </footer>
    </main>
  </div>

  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`;
}

function buildAll() {
  languages.forEach(lang => {
    const filePath = path.join(projectRoot, lang.filename);
    const html = generateHTML(lang);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ Generated crawler-friendly static HTML for ${lang.filename}`);
  });
  console.log('🎉 All compiler HTML files successfully built with rich crawler-accessible content!');
}

buildAll();
