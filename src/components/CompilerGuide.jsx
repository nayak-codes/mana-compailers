import React from 'react'
import { COMPILER_CURRICULUM } from '../compilerCurriculum'

const LANGUAGE_DETAILS = {
  python3: {
    name: 'Python 3',
    versionTag: 'Python 3.10+ · Dynamic & Expressive',
    tagline: "The world's most versatile, beginner-friendly programming language for AI, Data Science, Automation & Web Backends.",
    accentColor: '#3776AB',
    whatIs: "Python is a high-level, interpreted programming language created by Guido van Rossum. Celebrated for its elegant readability and indentation-based block syntax, Python allows developers to express complex concepts in fewer lines of code compared to C++ or Java.",
    whyLearn: [
      { title: '🤖 Artificial Intelligence & Machine Learning', desc: 'Industry standard for AI, Deep Learning, and LLMs using TensorFlow, PyTorch, and Scikit-learn.' },
      { title: '📊 Data Science & Analytics', desc: 'Dominates data manipulation and mathematical analysis with Pandas, NumPy, and Matplotlib.' },
      { title: '🌐 Modern Web Backends', desc: 'Powers scalable web APIs and SaaS applications with FastAPI, Django, and Flask.' },
      { title: '⚡ Rapid Prototyping & Scripting', desc: 'Instant developer productivity with zero compilation overhead and a vast ecosystem of over 400,000 PyPI packages.' }
    ],
    compilerNotes: [
      'Executes inside an isolated Linux container with sub-second response times.',
      'Full interactive terminal support for input() and user prompt detection.',
      'Smart persistent auto-save preserves your Python scripts automatically.'
    ],
    codeExample: `# Welcome to Python 3 on Our Compiler!
# Write, run, and experiment with your code instantly.

def analyze_dataset(items):
    total = sum(items)
    avg = total / len(items) if items else 0
    squares = [x**2 for x in items if x % 2 == 0]
    return total, avg, squares

data = [12, 45, 78, 23, 56, 89, 90]
total, avg, even_squares = analyze_dataset(data)

print("=== Python 3 Demonstration ===")
print(f"Original Data: {data}")
print(f"Total Sum:     {total}")
print(f"Average:       {avg:.2f}")
print(f"Even Squares:  {even_squares}")
`
  },
  java: {
    name: 'Java',
    versionTag: 'OpenJDK 21 LTS · Enterprise Backend Standard',
    tagline: 'The battle-tested, high-performance object-oriented language powering enterprise finance, microservices, and big data systems.',
    accentColor: '#f0a500',
    whatIs: "Java is a class-based, object-oriented language founded on the 'Write Once, Run Anywhere' (WORA) philosophy. Java code compiles into bytecode that executes on the Java Virtual Machine (JVM), delivering cross-platform portability, automatic garbage collection, and robust type safety.",
    whyLearn: [
      { title: '🏦 Enterprise & Financial Technology (FinTech)', desc: 'The backbone of global banking systems, stock exchanges, and secure high-volume transaction engines.' },
      { title: '☁️ Cloud-Native Microservices', desc: 'Industry workhorse for scalable cloud architectures built with Spring Boot, Quarkus, and Micronaut.' },
      { title: '🚀 Modern Performance (Java 21 LTS)', desc: 'Features cutting-edge Virtual Threads (Project Loom), Record Patterns, and modern pattern matching.' },
      { title: '🛡️ Robust Type Safety & Multi-Threading', desc: 'Rigorous compile-time checks, sophisticated memory management, and built-in concurrency primitives.' }
    ],
    compilerNotes: [
      'Compiled with modern OpenJDK 21 LTS inside an isolated Linux Docker sandbox.',
      'Interactive terminal seamlessly handles java.util.Scanner user inputs.',
      'Multi-program tab workspace enables practicing multiple classes simultaneously.'
    ],
    codeExample: `// Welcome to Java on Our Compiler!
// Modern OpenJDK 21 LTS Runtime

import java.util.Scanner;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Java 21 LTS Demonstration ===");
        
        // Variables & Modern Collections
        List<String> frameworks = List.of("Spring Boot", "Kafka", "Hibernate", "Quarkus");
        System.out.println("Enterprise Tech Stack: " + frameworks);
        
        // Loop demonstration
        int sum = 0;
        for (int i = 1; i <= 5; i++) {
            sum += i;
        }
        System.out.println("Sum of numbers 1 to 5 = " + sum);
        System.out.println("Ready to compile and run your custom Java code above!");
    }
}
`
  },
  c: {
    name: 'C Programming',
    versionTag: 'GCC 11.4 · ISO C11 Standard',
    tagline: 'The foundational mother language of modern computing, providing raw speed, direct memory control, and zero runtime overhead.',
    accentColor: '#659AD3',
    whatIs: "C is a foundational procedural programming language developed by Dennis Ritchie at Bell Labs. It maps cleanly to CPU architecture, giving programmers direct control over memory addresses, hardware registers, and system calls with unmatched computational efficiency.",
    whyLearn: [
      { title: '💻 Operating Systems & Kernel Development', desc: 'The Linux kernel, Windows NT components, and macOS Unix foundations are written primarily in C.' },
      { title: '🕹️ Embedded Systems & IoT', desc: 'Essential for microcontrollers, automotive electronics, robotics, and resource-constrained hardware.' },
      { title: '⚡ Game Engines & High-Performance Runtimes', desc: 'Forms the computational core of graphics engines, database engines, and runtime compilers.' },
      { title: '🧠 Deep Computer Architecture Understanding', desc: 'Teaches developers how computer memory (RAM), pointers, the call stack, and heaps truly function.' }
    ],
    compilerNotes: [
      'Compiled with GCC 11 using strict C11 standards with high optimization.',
      'Supports interactive terminal input handling via scanf() and fgets().',
      'Execution completes in under 2 seconds with automatic memory protection boundaries.'
    ],
    codeExample: `// Welcome to C Programming on Our Compiler!
#include <stdio.h>

int main(void) {
    printf("=== C11 Memory & Pointer Demonstration ===\n");
    
    int numbers[] = {10, 20, 30, 40, 50};
    int length = sizeof(numbers) / sizeof(numbers[0]);
    int sum = 0;
    
    // Traversing array via pointers
    int *ptr = numbers;
    for (int i = 0; i < length; i++) {
        sum += *(ptr + i);
    }
    
    printf("Total Elements: %d\n", length);
    printf("Sum calculated using pointer arithmetic: %d\n", sum);
    
    return 0;
}
`
  },
  cpp17: {
    name: 'C++',
    versionTag: 'G++ 11.4 · ISO C++17 Standard',
    tagline: 'The ultimate high-performance systems language combining low-level hardware control with zero-cost object-oriented and generic abstractions.',
    accentColor: '#9C033A',
    whatIs: "C++ is an extension of C created by Bjarne Stroustrup, introducing object-oriented programming, templates, and the Standard Template Library (STL). It powers performance-critical software where microsecond latencies matter.",
    whyLearn: [
      { title: '🏆 Competitive Programming & Coding Interviews', desc: 'The preferred language for LeetCode, Codeforces, and Google Kickstart due to raw speed and the rich STL library.' },
      { title: '🎮 AAA Video Game Development', desc: 'Powers Unreal Engine, Unity native core, PlayStation, and Xbox graphics pipelines.' },
      { title: '📈 High-Frequency Trading (HFT)', desc: 'Dominates quantitative finance and Wall Street execution engines requiring sub-microsecond latency.' },
      { title: '🏎️ Zero-Cost Abstractions', desc: 'Templates and RAII ensure that clean abstractions compile down to assembly matching hand-written C.' }
    ],
    compilerNotes: [
      'Compiled with G++ 11 supporting modern C++17 language features.',
      'Fast interactive I/O via standard std::cin and std::cout streams.',
      'Full STL support (vectors, sets, maps, priority queues, and algorithms).'
    ],
    codeExample: `// Welcome to C++17 on Our Compiler!
#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>

int main() {
    std::cout << "=== C++17 Standard Template Library ===" << std::endl;
    
    std::vector<int> nums = {14, 28, 42, 56, 70};
    
    // Modern Range-Based For Loop
    std::cout << "Values: ";
    for (const auto& n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // STL Accumulate Algorithm
    int total = std::accumulate(nums.begin(), nums.end(), 0);
    std::cout << "Accumulated Total: " << total << std::endl;
    
    return 0;
}
`
  },
  nodejs: {
    name: 'JavaScript',
    versionTag: 'Node.js 20 LTS · V8 Runtime',
    tagline: 'The universal language of the web, powering interactive browser interfaces, scalable backend servers, and fullstack applications.',
    accentColor: '#F0DB4F',
    whatIs: "JavaScript is a lightweight, interpreted, object-oriented language with first-class functions. Originally built for web browsers, Node.js expanded JavaScript to server-side backends, desktop apps, and cloud microservices.",
    whyLearn: [
      { title: '🌍 The Undisputed Language of the Web', desc: 'Every web browser runs JavaScript. Indispensable for web developers worldwide.' },
      { title: '🚀 Fullstack JavaScript (MERN Stack)', desc: 'Build frontend (React/Next.js) and backend (Node.js/Express) using a single, unified language.' },
      { title: '⚡ Event-Driven Asynchronous Architecture', desc: 'Non-blocking I/O and the V8 engine deliver high-throughput API handling.' },
      { title: '📦 Massive NPM Ecosystem', desc: 'Over 2 million open-source libraries available for instant application development.' }
    ],
    compilerNotes: [
      'Executes on the latest Node.js 20 LTS V8 engine in sub-second times.',
      'Instant console output capture for console.log() and terminal logging.',
      'Persistent local storage auto-save keeps scripts preserved across sessions.'
    ],
    codeExample: `// Welcome to JavaScript / Node.js on Our Compiler!
const developers = [
  { name: 'Alice', role: 'Fullstack Engineer', xp: 6 },
  { name: 'Bob', role: 'DevOps Specialist', xp: 4 },
  { name: 'Charlie', role: 'AI Researcher', xp: 8 }
];

console.log("=== Modern JavaScript (ES2024) ===");

// Functional Array Pipeline & Destructuring
const leadEngineers = developers
  .filter(({ xp }) => xp >= 5)
  .map(({ name, role, xp }) => name + ' (' + role + ') - ' + xp + ' yrs');

console.log("Senior Team Members:", leadEngineers);

// Asynchronous execution demonstration
async function greet(devName) {
  return 'Welcome aboard, ' + devName + '! Code compiled instantly.';
}

greet('Developer').then(console.log);
`
  },
  csharp: {
    name: 'C#',
    versionTag: '.NET 8 SDK · Modern C# 12',
    tagline: 'Microsoft’s flagship enterprise language, blending high productivity, strong type safety, and cloud-scale performance.',
    accentColor: '#9B4F96',
    whatIs: "C# is a modern, object-oriented, type-safe programming language built by Microsoft as part of the open-source, cross-platform .NET ecosystem. Widely celebrated for its clean syntax, Language Integrated Query (LINQ), and rich enterprise tooling.",
    whyLearn: [
      { title: '🏢 Enterprise Cloud Backends', desc: 'Powers scalable enterprise web APIs with ASP.NET Core and Microsoft Azure integrations.' },
      { title: '🎮 Unity Video Game Development', desc: 'The primary language for Unity, the world’s leading cross-platform 2D/3D game engine.' },
      { title: '🔍 Language Integrated Query (LINQ)', desc: 'Write expressive, strongly-typed queries directly over in-memory collections and SQL databases.' },
      { title: '🚀 Cutting-Edge Modern Language', desc: 'Features records, pattern matching, async streams, and performance rivaling C++.' }
    ],
    compilerNotes: [
      'Compiled with modern .NET 8 SDK with Roslyn compiler optimizations.',
      'Instant console execution in isolated Linux sandboxes.',
      'Supports top-level statements and standard object-oriented class structures.'
    ],
    codeExample: `// Welcome to C# on Our Compiler!
using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        Console.WriteLine("=== C# (.NET 8) Demonstration ===");
        
        var numbers = new List<int> { 3, 6, 9, 12, 15, 18, 21 };
        
        // LINQ Query
        var multiplesOfSix = numbers.Where(n => n % 6 == 0).ToList();
        
        Console.WriteLine($"Original List: {string.Join(", ", numbers)}");
        Console.WriteLine($"Multiples of 6: {string.Join(", ", multiplesOfSix)}");
        Console.WriteLine($"Total Sum:     {numbers.Sum()}");
    }
}
`
  },
  html: {
    name: 'HTML5 / CSS3 / JavaScript',
    versionTag: 'HTML5 · CSS3 Grid/Flexbox · Browser Engine',
    tagline: 'The core building blocks of the World Wide Web, delivering responsive layouts, beautiful styling, and rich client-side interactivity.',
    accentColor: '#E44D26',
    whatIs: "HTML (HyperText Markup Language) structures content on the web, CSS (Cascading Style Sheets) styles the presentation and layouts, and JavaScript brings pages to life with client-side interactivity and API integrations.",
    whyLearn: [
      { title: '🌐 Universal Web Foundation', desc: 'Every website, mobile hybrid app, and web portal on Earth is built upon HTML and CSS.' },
      { title: '🎨 Responsive Design Mastery', desc: 'Create adaptive layouts that look flawless across mobile phones, tablets, and desktop displays.' },
      { title: '⚡ Real-Time Instant Rendering', desc: 'Zero compile delay: see your design updates render directly in the browser preview.' },
      { title: '💼 Highly In-Demand Career Skill', desc: 'The mandatory foundation for every frontend, fullstack, and UI/UX engineering role.' }
    ],
    compilerNotes: [
      'Multi-tab workspace seamlessly switches between index.html, style.css, and script.js.',
      'Instant live preview pane renders your page with zero delay.',
      'Integrated developer console captures client-side console.log() output directly.'
    ],
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
</style>
`
  }
};

export default function CompilerGuide({ lang, currentTheme, setCode }) {
  const langKey = lang?.id || 'python3'
  const details = LANGUAGE_DETAILS[langKey] || LANGUAGE_DETAILS.python3
  const curriculum = COMPILER_CURRICULUM[langKey]

  const handleLoadTemplate = () => {
    if (typeof setCode === 'function' && details.codeExample) {
      setCode(details.codeExample)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="compiler-guide-wrapper">
      {/* ── SECTION 1: ABOUT THE RESPECTIVE LANGUAGE ── */}
      <section className="guide-hero-section">
        <div className="guide-hero-top">
          <div className="guide-hero-title-area">
            <span className="guide-lang-pill" style={{ borderColor: details.accentColor, color: details.accentColor }}>
              {details.versionTag}
            </span>
            <h1 className="guide-lang-heading">About {details.name} &amp; Compiler Guide</h1>
            <p className="guide-lang-tagline">{details.tagline}</p>
          </div>
          <button onClick={handleLoadTemplate} className="guide-hero-load-btn">
            Load Template Into Editor ↑
          </button>
        </div>

        {/* WHAT IS THIS LANGUAGE */}
        <div className="guide-about-card">
          <h3 className="guide-sub-heading">📖 What is {details.name}?</h3>
          <p className="guide-about-paragraph">{details.whatIs}</p>
        </div>

        {/* WHY LEARN THIS LANGUAGE (4 CARDS) */}
        <h3 className="guide-sub-heading" style={{ marginTop: '24px' }}>
          💡 Why Learn &amp; Use {details.name}?
        </h3>
        <div className="guide-why-grid">
          {details.whyLearn.map((item, idx) => (
            <div key={idx} className="guide-why-card">
              <h4 className="guide-why-title">{item.title}</h4>
              <p className="guide-why-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* HOW IT RUNS IN OUR COMPILER */}
        <div className="guide-platform-card">
          <h3 className="guide-sub-heading">⚡ How Our Compiler Runs Your {details.name} Code</h3>
          <ul className="guide-platform-list">
            {details.compilerNotes.map((note, idx) => (
              <li key={idx} className="guide-platform-item">
                <span className="guide-green-check">✓</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SECTION 2: COURSE CURRICULUM & COMPLETE CHAPTER LINKS ── */}
      {curriculum && curriculum.phases && curriculum.phases.length > 0 && (
        <section className="guide-curriculum-section">
          <div className="guide-curriculum-header">
            <div className="guide-curriculum-title-wrap">
              <span className="guide-curriculum-badge">📚 COMPLETE COURSE CURRICULUM</span>
              <h2 className="guide-curriculum-title">
                {details.name} Mastercourse — All Structured Chapters
              </h2>
              <p className="guide-curriculum-desc">
                Follow our comprehensive step-by-step tutorial track. Click on any chapter below to read in-depth lessons with syntax rules, architecture diagrams, and runnable code examples.
              </p>
            </div>
          </div>

          {/* PHASES LIST */}
          <div className="guide-phases-container">
            {curriculum.phases.map((phase, pIdx) => (
              <div key={pIdx} className="guide-phase-card">
                <div className="guide-phase-header">
                  <div className="guide-phase-title-left">
                    <span className="guide-phase-idx">PHASE {pIdx + 1}</span>
                    <h3 className="guide-phase-name">{phase.name}</h3>
                  </div>
                  <span className="guide-phase-range">{phase.range}</span>
                </div>

                {/* CHAPTERS GRID IN THIS PHASE */}
                <div className="guide-chapter-grid">
                  {phase.chapters.map((ch, cIdx) => (
                    <a
                      key={cIdx}
                      href={ch.url}
                      className="guide-chapter-link"
                      title={`Read Chapter: ${ch.title}`}
                    >
                      <span className="guide-ch-num" style={{ background: details.accentColor }}>
                        {ch.num}
                      </span>
                      <span className="guide-ch-title">{ch.title}</span>
                      <span className="guide-ch-arrow">→</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
