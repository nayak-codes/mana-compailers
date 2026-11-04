import React from 'react'

const GUIDES = {
  java: {
    title: 'Java 21 LTS Reference & Quickstart Guide',
    version: 'OpenJDK 21 LTS · Sub-2s Compilation',
    summary: 'Java is an object-oriented, class-based programming language built on the "Write Once, Run Anywhere" (WORA) philosophy. Code compiles to bytecode and executes on the Java Virtual Machine (JVM).',
    badges: ['☕ Java 21 LTS', '⚡ JVM Bytecode', '🛡️ Strict Type Safety', '🔄 Virtual Threads'],
    codeExample: `// Online Java Compiler - Standard Template
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Developer! Welcome to Our Compiler.");
        
        // Variables & Basic Arithmetic
        int a = 15;
        int b = 25;
        int sum = a + b;
        System.out.println("Sum of " + a + " + " + b + " = " + sum);
        
        // Loop demonstration
        System.out.print("Counting: ");
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`,
    keyConcepts: [
      { term: 'Class & Main Method', desc: 'Every Java application starts in public class Main with the public static void main(String[] args) entry point.' },
      { term: 'Interactive Stdin (Scanner)', desc: 'Use java.util.Scanner scanner = new Scanner(System.in); to capture interactive runtime inputs from the terminal.' },
      { term: 'Primitive Types', desc: 'Java features 8 primitives: byte, short, int, long, float, double, boolean, and char.' },
      { term: 'Object-Oriented (OOP)', desc: 'Core pillars: Encapsulation, Inheritance, Polymorphism, and Abstraction via classes and interfaces.' }
    ],
    tips: [
      'Press Ctrl + Enter (or Cmd + Enter on Mac) to instantly compile and run code.',
      'Always ensure the primary class is named Main when running single-file programs.',
      'Use the multi-program tabs above to work on multiple Java exercises simultaneously.'
    ],
    tutorialLink: '/blog-java.html',
    tutorialLabel: 'Explore Complete 25-Chapter Java Mastercourse →'
  },
  python3: {
    title: 'Python 3 Reference & Quickstart Guide',
    version: 'Python 3.10+ · Dynamic & Expressive',
    summary: 'Python is a high-level, general-purpose interpreted language known for its clear syntax and indentation-based block scoping. Widely used in scripting, data science, web backends, and AI.',
    badges: ['🐍 Python 3.10+', '⚡ Interactive Terminal', '📦 Batteries Included', '💡 Clean Syntax'],
    codeExample: `# Online Python Compiler - Standard Template

def calculate_stats(numbers):
    total = sum(numbers)
    average = total / len(numbers) if numbers else 0
    return total, average

# Sample Data
data = [12, 45, 78, 23, 56, 89]
total, avg = calculate_stats(data)

print("--- Python 3 Quickstart ---")
print(f"Data: {data}")
print(f"Total: {total} | Average: {avg:.2f}")

# List Comprehension
squares = [x**2 for x in data if x % 2 == 0]
print(f"Even Squares: {squares}")`,
    keyConcepts: [
      { term: 'Indentation Scoping', desc: 'Blocks (functions, loops, conditionals) are delimited by whitespace (4 spaces) instead of curly braces.' },
      { term: 'Interactive Input', desc: 'Use user_val = input("Enter value: ") to receive terminal user input.' },
      { term: 'Core Data Structures', desc: 'Built-in lists [1, 2], tuples (1, 2), dictionaries {"k": "v"}, and sets {1, 2}.' },
      { term: 'Dynamic Typing', desc: 'Variables do not require explicit type declarations; types are bound dynamically at runtime.' }
    ],
    tips: [
      'Use Ctrl + Enter to run code without touching the mouse.',
      'Use f-strings like f"Value: {val}" for clean, readable string formatting.',
      'Auto-save keeps your scripts preserved locally even if you refresh.'
    ],
    tutorialLink: '/blog-python.html',
    tutorialLabel: 'Explore Complete 25-Chapter Python Mastercourse →'
  },
  c: {
    title: 'C Programming (GCC 11) Reference Guide',
    version: 'GCC 11.4 · ISO C11 Standard',
    summary: 'C is a foundational procedural language that provides direct low-level memory manipulation, minimal runtime overhead, and efficient mapping to machine instructions.',
    badges: ['🔵 GCC 11 Compiler', '⚡ Direct Memory Model', '🎯 Pointer Power', '🚀 Zero Runtime Overhead'],
    codeExample: `// Online C Compiler - Standard Template
#include <stdio.h>

int main(void) {
    printf("--- Welcome to C Programming on Our Compiler ---\\n");
    
    int numbers[] = {10, 20, 30, 40, 50};
    int count = sizeof(numbers) / sizeof(numbers[0]);
    int sum = 0;
    
    // Pointer Traversal
    int *ptr = numbers;
    for (int i = 0; i < count; i++) {
        sum += *(ptr + i);
    }
    
    printf("Array element count: %d\\n", count);
    printf("Sum computed via pointers: %d\\n", sum);
    
    return 0;
}`,
    keyConcepts: [
      { term: 'Entry Point & Headers', desc: 'Programs start in int main(void). Include <stdio.h> for printf/scanf and <stdlib.h> for malloc/free.' },
      { term: 'Pointers & Addresses', desc: '&variable gets memory address; *pointer dereferences and accesses stored values.' },
      { term: 'Memory Allocation', desc: 'Stack handles local function variables; Heap handles dynamic allocations via malloc(), calloc(), and free().' },
      { term: 'Format Specifiers', desc: 'Use %d for integers, %f for floats, %lf for doubles, %s for strings, and %p for pointer addresses.' }
    ],
    tips: [
      'Always return 0 from main() to indicate successful execution.',
      'Remember to free() any dynamically allocated memory to avoid memory leaks.',
      'Press Ctrl + Enter to execute in isolated Linux Docker sandbox in under 2 seconds.'
    ],
    tutorialLink: '/blog-c.html',
    tutorialLabel: 'Explore Complete 20-Chapter C Mastercourse →'
  },
  cpp17: {
    title: 'C++17 (G++ 11) Reference & Quickstart Guide',
    version: 'G++ 11.4 · ISO C++17 Standard',
    summary: 'C++ is a multi-paradigm systems language combining high-performance low-level hardware control with modern object-oriented and generic template abstractions.',
    badges: ['⚡ C++17 Standard', '🧩 STL Containers', '🛡️ RAII Memory Safety', '📦 Modern Algorithms'],
    codeExample: `// Online C++ Compiler - Standard Template
#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>

int main() {
    std::cout << "--- C++17 STL Demonstration ---" << std::endl;
    
    std::vector<int> numbers = {7, 14, 21, 28, 35};
    
    // Modern Range-Based For Loop
    std::cout << "Elements: ";
    for (const auto& num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // STL Accumulate
    int total = std::accumulate(numbers.begin(), numbers.end(), 0);
    std::cout << "Sum: " << total << std::endl;
    
    return 0;
}`,
    keyConcepts: [
      { term: 'Streams (cin / cout)', desc: 'Standard I/O uses std::cin >> var and std::cout << var instead of C-style printf/scanf.' },
      { term: 'Standard Template Library (STL)', desc: 'High-performance containers (std::vector, std::map, std::set) and algorithms (std::sort).' },
      { term: 'RAII Paradigm', desc: 'Resource Acquisition Is Initialization: memory and resources are automatically released when objects exit scope.' },
      { term: 'auto & Smart Pointers', desc: 'C++17 supports type inference with auto and safe ownership with std::unique_ptr and std::shared_ptr.' }
    ],
    tips: [
      'Add std::ios_base::sync_with_stdio(false); std::cin.tie(NULL); for fast competitive programming I/O.',
      'Use range-based loops (for (auto x : vec)) for cleaner code.',
      'Use Ctrl + Enter to compile and execute instantly.'
    ],
    tutorialLink: '/blog-cpp.html',
    tutorialLabel: 'Explore Complete 20-Chapter C++ Mastercourse →'
  },
  nodejs: {
    title: 'JavaScript (Node.js 20 LTS) Reference Guide',
    version: 'Node.js 20 LTS · V8 Engine',
    summary: 'JavaScript is a high-level, dynamic, multi-paradigm language. In our backend runner, scripts execute on the latest Node.js V8 engine with full modern ECMAScript support.',
    badges: ['🟨 Node.js 20 LTS', '⚡ V8 Engine', '🔄 Async / Await', '📦 Modern ES2024'],
    codeExample: `// Online JavaScript / Node.js Runner
const developers = [
  { name: 'Alice', role: 'Fullstack', xp: 5 },
  { name: 'Bob', role: 'Frontend', xp: 3 },
  { name: 'Charlie', role: 'Backend', xp: 7 }
];

console.log("--- JavaScript Modern Syntax ---");

// Array Methods & Destructuring
const seniorDevs = developers
  .filter(({ xp }) => xp >= 5)
  .map(({ name, role, xp }) => \`\${name} (\${role}) - \${xp} yrs\`);

console.log("Senior Engineers:", seniorDevs);

// Async / Promise demo
const waitAndGreet = async (name) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(\`Welcome aboard, \${name}!\`), 100);
  });
};

waitAndGreet('Developer').then(console.log);`,
    keyConcepts: [
      { term: 'Variable Declarations', desc: 'Use const for immutable bindings and let for mutable variables. Avoid legacy var.' },
      { term: 'Arrow Functions', desc: 'Concise lambda syntax const fn = (a, b) => a + b with lexical this binding.' },
      { term: 'Asynchronous JS', desc: 'Non-blocking I/O via Promises and async/await for asynchronous pipelines.' },
      { term: 'Higher-Order Functions', desc: 'Functional methods like .map(), .filter(), .reduce(), and .forEach() on arrays.' }
    ],
    tips: [
      'Outputs from console.log() appear immediately in the terminal below.',
      'Use JSON.stringify(obj, null, 2) to pretty-print complex objects.',
      'Press Ctrl + Enter to run scripts instantly.'
    ],
    tutorialLink: '/blog-javascript.html',
    tutorialLabel: 'Explore Complete 25-Chapter JavaScript Mastercourse →'
  },
  html: {
    title: 'HTML5 / CSS3 / JavaScript Live Editor Guide',
    version: 'HTML5 · CSS3 Grid/Flexbox · Client-Side JS',
    summary: 'Our Interactive Web Editor provides a real-time live preview window. Write semantic HTML, modern responsive CSS, and dynamic JavaScript with instant rendering.',
    badges: ['🌐 Semantic HTML5', '🎨 CSS3 Flexbox/Grid', '⚡ Live Preview Pane', '📱 Responsive Testing'],
    codeExample: `<!-- Live HTML/CSS/JS Editor Template -->
<div class="card">
  <h2>🚀 Live HTML Sandbox</h2>
  <p>Edit HTML, CSS, and JS tabs to see changes render instantly!</p>
  <button id="demo-btn">Click Me</button>
</div>

<style>
  .card {
    padding: 24px;
    background: linear-gradient(135deg, #1e293b, #0f172a);
    color: #f8fafc;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  }
  button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
  }
</style>`,
    keyConcepts: [
      { term: 'Multi-Tab Editing', desc: 'Switch seamlessly between index.html, style.css, and script.js tabs.' },
      { term: 'Live Preview', desc: 'Click "Run" or refresh preview to render inside the isolated client-side iframe.' },
      { term: 'Console Log Interceptor', desc: 'Client-side console.log() output displays in the integrated preview console.' },
      { term: 'Responsive Testing', desc: 'Resize the split pane horizontally to test tablet and mobile viewports.' }
    ],
    tips: [
      'Use the Split Screen drag bar to adjust the editor and preview widths.',
      'Download your full HTML/CSS/JS package with one click.',
      'Local auto-save preserves all 3 tabs automatically.'
    ],
    tutorialLink: '/blog-html.html',
    tutorialLabel: 'Explore Complete 20-Chapter HTML/CSS Web Development Course →'
  },
  csharp: {
    title: 'C# (.NET 8 SDK) Reference & Quickstart Guide',
    version: '.NET 8 SDK · Modern C# 12',
    summary: 'C# is a modern, object-oriented, type-safe programming language developed by Microsoft for enterprise applications, cloud backends, and game development.',
    badges: ['🔷 .NET 8 SDK', '⚡ C# 12 Features', '🎯 LINQ Queries', '🛡️ Strong Type Safety'],
    codeExample: `// Online C# Compiler - Standard Template
using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        Console.WriteLine("--- C# (.NET 8) Online Compiler ---");
        
        var numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        
        // LINQ query expression
        var evenSquares = numbers
            .Where(n => n % 2 == 0)
            .Select(n => n * n)
            .ToList();
            
        Console.WriteLine($"Even numbers squared: {string.Join(", ", evenSquares)}");
        Console.WriteLine($"Total sum: {evenSquares.Sum()}");
    }
}`,
    keyConcepts: [
      { term: 'Namespaces & Classes', desc: 'Code lives inside namespaces and classes. Main() is the conventional entry point.' },
      { term: 'Language Integrated Query (LINQ)', desc: 'Powerful SQL-like querying syntax directly embedded into C# collections.' },
      { term: 'Modern C# Features', desc: 'Supports records, pattern matching, nullable reference types, and top-level statements.' },
      { term: 'Exception Handling', desc: 'Robust error handling via try { ... } catch (Exception ex) { ... } finally { ... }.' }
    ],
    tips: [
      'Use string interpolation $"Hello {name}" for clean string assembly.',
      'Use var for local variable type inference when the type is obvious.',
      'Run instantly using Ctrl + Enter in under 2 seconds.'
    ],
    tutorialLink: '/blog-csharp.html',
    tutorialLabel: 'Explore Complete 20-Chapter C# Mastercourse →'
  },
  go: {
    title: 'Go (Golang 1.22) Reference & Quickstart Guide',
    version: 'Go 1.22 · Fast Native Compilation',
    summary: 'Go is an open-source systems language created at Google, focused on simplicity, fast compilation, built-in concurrency with goroutines, and robust cloud performance.',
    badges: ['🐹 Go 1.22', '⚡ Microsecond Startups', '🔄 Goroutines & Channels', '📦 Static Binaries'],
    codeExample: `// Online Go Compiler - Standard Template
package main

import (
	"fmt"
	"strings"
)

func main() {
	fmt.Println("--- Welcome to Go on Our Compiler ---")
	
	languages := []string{"Go", "Python", "Java", "C++", "Rust"}
	fmt.Printf("Total tracks: %d\\n", len(languages))
	
	for i, lang := range languages {
		fmt.Printf("Track %d: %s (uppercase: %s)\\n", i+1, lang, strings.ToUpper(lang))
	}
}`,
    keyConcepts: [
      { term: 'package main', desc: 'Executable Go programs must declare package main and contain a func main() entry point.' },
      { term: 'Slices & Maps', desc: 'Dynamically-sized views into arrays []T and key-value hash maps map[K]V.' },
      { term: 'Goroutines & Concurrency', desc: 'Lightweight green threads launched with go doWork() communicating via channels.' },
      { term: 'Error Handling', desc: 'Explicit error returns (val, err := fn()) rather than unchecked exceptions.' }
    ],
    tips: [
      'Use := for short variable declarations inside functions.',
      'Unused variables and imports are flagged as compile-time errors in Go.',
      'Press Ctrl + Enter to run code instantly.'
    ],
    tutorialLink: null,
    tutorialLabel: null
  },
  rust: {
    title: 'Rust (1.75+) Reference & Quickstart Guide',
    version: 'Rustc 1.75+ · Zero-Cost Abstractions',
    summary: 'Rust is a systems programming language focused on memory safety, concurrency, and high performance without a garbage collector via its revolutionary borrow checker.',
    badges: ['🦀 Rust 1.75+', '🛡️ Fearless Concurrency', '⚡ Zero-Cost Abstractions', '🔒 Memory Safety'],
    codeExample: `// Online Rust Compiler - Standard Template
fn main() {
    println!("--- Welcome to Rust on Our Compiler ---");
    
    let numbers = vec![10, 20, 30, 40, 50];
    let sum: i32 = numbers.iter().sum();
    
    println!("Vector: {:?}", numbers);
    println!("Sum calculated safely: {}", sum);
    
    // Pattern Matching
    match numbers.get(2) {
        Some(&val) => println!("Element at index 2 is: {}", val),
        None => println!("Index out of bounds"),
    }
}`,
    keyConcepts: [
      { term: 'Ownership & Borrowing', desc: 'Each value has a single owner; references can be immutable (&T) or unique mutable (&mut T).' },
      { term: 'Pattern Matching', desc: 'Powerful, exhaustive match expressions with Option<T> and Result<T, E>.' },
      { term: 'Immutability by Default', desc: 'Variables are immutable unless explicitly declared with let mut x = 5;.' },
      { term: 'Zero-Cost Abstractions', desc: 'Iterators, closures, and generics compile to assembly matching hand-written C.' }
    ],
    tips: [
      'Use println!("{:?}", val); to debug-print structs and collections.',
      'The compiler gives friendly, precise error messages to guide your code.',
      'Run code using Ctrl + Enter in under 2 seconds.'
    ],
    tutorialLink: null,
    tutorialLabel: null
  },
  php: {
    title: 'PHP 8.2+ Reference & Quickstart Guide',
    version: 'PHP 8.2+ CLI · Fast Scripting',
    summary: 'PHP is a popular general-purpose scripting language especially suited for web backend development, API services, and fast server-side logic.',
    badges: ['🐘 PHP 8.2+', '⚡ Fast CLI Engine', '🧩 Associative Arrays', '🛠️ Modern Type Hints'],
    codeExample: `<?php
// Online PHP Compiler - Standard Template

$frameworks = [
    'Laravel' => 'Fullstack MVC Framework',
    'Symfony' => 'Modular Enterprise Components',
    'WordPress' => 'Content Management Engine'
];

echo "--- PHP 8 Modern Runner ---\n";
echo "Popular PHP Frameworks:\n";

foreach ($frameworks as $name => $desc) {
    echo "- $name: $desc\n";
}

$sum = array_sum([10, 20, 30, 40]);
echo "\nArray sum calculation: $sum\n";
?>`,
    keyConcepts: [
      { term: 'Script Delimiters', desc: 'PHP code is enclosed in <?php ... ?> tags.' },
      { term: 'Variables & Scope', desc: 'All variables begin with a dollar sign $variable and are dynamically or statically typed.' },
      { term: 'Associative Arrays', desc: 'PHP arrays function as ordered maps, hash tables, and lists simultaneously.' },
      { term: 'Modern OOP in PHP 8', desc: 'Supports constructor property promotion, union types, and match expressions.' }
    ],
    tips: [
      'echo and print output strings directly to the terminal stdout.',
      'Use print_r($array) or var_dump($var) to inspect complex data structures.',
      'Press Ctrl + Enter to run code instantly.'
    ],
    tutorialLink: null,
    tutorialLabel: null
  },
  ruby: {
    title: 'Ruby 3.2+ Reference & Quickstart Guide',
    version: 'Ruby 3.2+ · Elegant & Expressive',
    summary: 'Ruby is an expressive, purely object-oriented dynamic programming language focused on simplicity and developer productivity.',
    badges: ['💎 Ruby 3.2+', '⚡ Pure OOP', '🧱 Blocks & Iterators', '✨ Expressive Syntax'],
    codeExample: `# Online Ruby Compiler - Standard Template

class Greeter
  def initialize(name)
    @name = name
  end

  def salute
    puts "Hello #{@name}! Welcome to Ruby on Our Compiler."
  end
end

greeter = Greeter.new("Developer")
greeter.salute

# Blocks & Enumerable demo
numbers = [1, 2, 3, 4, 5]
evens = numbers.select { |n| n.even? }
puts "Even numbers: #{evens.inspect}"`,
    keyConcepts: [
      { term: 'Pure Object-Oriented', desc: 'Everything in Ruby is an object, including primitive numbers and nil.' },
      { term: 'Blocks, Procs & Lambdas', desc: 'Closures passed to methods with do ... end or { |arg| ... } syntax.' },
      { term: 'String Interpolation', desc: 'Embed expressions inside double quotes using "#{expression}".' },
      { term: 'Symbols', desc: 'Immutable, reusable identifiers like :name used heavily as dictionary/hash keys.' }
    ],
    tips: [
      'Parentheses around method arguments are usually optional in Ruby.',
      'Use .inspect or p obj to view the detailed internal structure of objects.',
      'Run code using Ctrl + Enter in under 2 seconds.'
    ],
    tutorialLink: null,
    tutorialLabel: null
  }
}

export default function CompilerGuide({ lang, currentTheme, setCode }) {
  const guide = GUIDES[lang?.id] || GUIDES.java

  const handleLoadTemplate = () => {
    if (typeof setCode === 'function' && guide.codeExample) {
      setCode(guide.codeExample)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="compiler-guide-container">
      {/* GUIDE HEADER */}
      <div className="guide-header-card">
        <div className="guide-header-top">
          <div className="guide-title-wrap">
            <span className="guide-badge-version">{guide.version}</span>
            <h2 className="guide-main-title">{guide.title}</h2>
          </div>
          {guide.tutorialLink && (
            <a href={guide.tutorialLink} className="guide-tutorial-cta">
              {guide.tutorialLabel}
            </a>
          )}
        </div>
        <p className="guide-summary-text">{guide.summary}</p>
        
        {/* BADGES */}
        <div className="guide-badges-row">
          {guide.badges.map((b, i) => (
            <span key={i} className="guide-pill">{b}</span>
          ))}
        </div>
      </div>

      {/* CODE EXAMPLE & QUICKSTART */}
      <div className="guide-code-section">
        <div className="guide-code-header">
          <span className="guide-section-label">⚡ Interactive Quickstart Snippet</span>
          <button onClick={handleLoadTemplate} className="guide-load-code-btn">
            Load Template Into Editor ↑
          </button>
        </div>
        <pre className="guide-code-block">
          <code>{guide.codeExample}</code>
        </pre>
      </div>

      {/* 2-COLUMN GRID: KEY CONCEPTS & PRO TIPS */}
      <div className="guide-grid-two-col">
        {/* KEY CONCEPTS */}
        <div className="guide-card">
          <h3 className="guide-card-title">
            <span>💡</span> Core Syntax &amp; Language Fundamentals
          </h3>
          <div className="guide-concept-list">
            {guide.keyConcepts.map((item, idx) => (
              <div key={idx} className="guide-concept-item">
                <span className="guide-term-badge">{item.term}</span>
                <p className="guide-term-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PRO TIPS & SHORTCUTS */}
        <div className="guide-card">
          <h3 className="guide-card-title">
            <span>🚀</span> Compiler Pro Tips &amp; Keyboard Shortcuts
          </h3>
          <ul className="guide-tips-list">
            {guide.tips.map((tip, idx) => (
              <li key={idx} className="guide-tip-item">
                <span className="guide-tip-check">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>

          {/* PERSISTENT AUTO-SAVE NOTICE */}
          <div className="guide-feature-box">
            <div className="guide-feature-title">💾 Persistent Auto-Save Enabled</div>
            <p className="guide-feature-desc">
              Your code is automatically saved in your browser's local cache. Refreshing the browser or switching languages will not erase your work.
            </p>
          </div>

          {guide.tutorialLink && (
            <div className="guide-learn-more-box">
              <span>Looking for structured lessons with diagrams &amp; quizzes?</span>
              <a href={guide.tutorialLink} className="guide-learn-more-link">
                View Full Curriculum &amp; Chapters →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
