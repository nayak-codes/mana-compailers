const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

const languages = [
  {
    filename: 'online-python-compiler.html',
    slug: 'python',
    langId: 'python3',
    title: 'Free Online Python Compiler - Run Python 3 Code Online | Our Compiler',
    heading: 'Free Online Python Compiler',
    subheading: 'Write, compile, and run Python 3 code online instantly in your web browser with Monaco editor, syntax highlighting, and interactive stdin support.',
    metaDesc: 'Write, compile, and run Python 3 code online instantly. Our Compiler provides a free, fast online Python compiler with Monaco editor, syntax highlighting, and stdin input support.',
    canonical: 'https://www.ourcompiler.com/online-python-compiler.html',
    langName: 'Python 3',
    badge: '🐍 Python 3 Runtime',
    sampleCode: `# Online Python 3 Compiler
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]

print("Original Numbers:", numbers)
print("Squared Numbers:", squared)`,
    introText: 'Python is a modern, high-level, interpreted programming language known for its readable syntax, versatility, and extensive library ecosystem. Our Online Python Compiler allows you to write and run Python 3 scripts directly from your web browser without installing Python, Anaconda, or local compilers. Perfect for learning Python syntax, practicing Data Structures, testing algorithmic code, and experimenting with standard library modules.',
    faqs: [
      { q: 'What version of Python is supported on this compiler?', a: 'Our Online Python Compiler runs the latest Python 3 runtime inside a secure Linux environment.' },
      { q: 'How do I pass user input to my Python script?', a: 'You can type inputs directly into the interactive Terminal panel when your code calls input(), or pre-enter your inputs before running.' },
      { q: 'Can I use Python standard library modules like math, sys, and datetime?', a: 'Yes! All standard Python 3 built-in modules including math, sys, os, datetime, json, re, and random are fully supported.' },
      { q: 'Is this Python compiler free for students and teachers?', a: 'Yes! Our Python compiler is 100% free for educational use, classroom demonstrations, coding bootcamps, and self-learning.' }
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
    sampleCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World from Online Java Compiler!");
        
        int sum = 0;
        for (int i = 1; i <= 5; i++) {
            sum += i;
        }
        System.out.println("Sum of 1 to 5: " + sum);
    }
}`,
    introText: 'Java is an object-oriented, class-based programming language built around the principle of "Write Once, Run Anywhere" (WORA). Our Online Java Compiler lets you compile and run Java programs online without setting up JDK, environment paths (JAVA_HOME), or heavy IDEs like IntelliJ or Eclipse. Simply write your Java class, click Run, and view stdout and stderr output in seconds.',
    faqs: [
      { q: 'Must my Java class be named Main?', a: 'By default, our Java runner uses class Main, but our pre-processor automatically detects public class names and adjusts them so your code compiles smoothly.' },
      { q: 'Does this Java compiler support Object-Oriented Programming (OOP)?', a: 'Yes! You can define classes, methods, inheritance, interfaces, polymorphism, encapsulation, and exception handling.' },
      { q: 'Can I test Java Scanner input online?', a: 'Yes! You can interactively provide inputs when java.util.Scanner or BufferedReader reads from System.in.' }
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
    sampleCode: `#include <stdio.h>

int main() {
    printf("Hello, World from Online C Compiler!\\n");
    
    int a = 10, b = 20;
    printf("Sum: %d + %d = %d\\n", a, b, a + b);
    return 0;
}`,
    introText: 'C is the foundational procedural programming language that powers operating systems, embedded systems, databases, and core system utilities. Our Online C Compiler uses GCC (GNU Compiler Collection) to compile and execute C source code instantly in your browser. Practice pointers, memory allocation (malloc/free), arrays, strings, structures, and algorithms without needing Code::Blocks, Dev-C++, or local GCC installation.',
    faqs: [
      { q: 'Which GCC compiler version is used?', a: 'Our C compiler uses modern GCC on a 64-bit Linux sandbox environment.' },
      { q: 'Can I use C standard library headers like <stdio.h> and <stdlib.h>?', a: 'Yes! Standard C headers including stdio.h, stdlib.h, string.h, math.h, and stdbool.h are fully available.' },
      { q: 'Does it support scanf() for user input?', a: 'Yes, interactive input via scanf(), getchar(), and fgets() is fully supported in our interactive terminal.' }
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
    sampleCode: `#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::cout << "Hello, C++17 Compiler!" << std::endl;
    
    std::vector<int> nums = {10, 20, 30, 40};
    int total = std::accumulate(nums.begin(), nums.end(), 0);
    
    std::cout << "Total Sum: " << total << std::endl;
    return 0;
}`,
    introText: 'C++ is a high-performance, object-oriented, and system programming language widely used in competitive programming, game development, graphics engines, and financial software. Our Online C++ Compiler compiles C++17 standard code using GCC g++. Full support for Standard Template Library (STL) containers like vector, map, set, queue, stack, algorithms, smart pointers, and classes.',
    faqs: [
      { q: 'Is C++ STL (Standard Template Library) supported?', a: 'Yes! All STL containers (vector, map, unordered_map, set, stack, queue, pair) and algorithms are ready to use.' },
      { q: 'Can I use this for Competitive Programming practice?', a: 'Absolutely! Thousands of students use Our C++ Compiler to practice LeetCode, HackerRank, CodeChef, and GeeksforGeeks problems.' }
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
    sampleCode: `// Online JavaScript / Node.js Compiler
const developers = ['Alice', 'Bob', 'Charlie'];

developers.forEach((dev, index) => {
  console.log(\`Developer \${index + 1}: \${dev}\`);
});`,
    introText: 'JavaScript is the universal language of the web, powering frontend interfaces and server-side Node.js applications. Our Online JavaScript Compiler runs Node.js runtime, enabling you to test modern JavaScript features (ES6, async/await, Promises, Arrow Functions, Array methods, JSON parsing) directly in your browser without setting up Node.js locally.',
    faqs: [
      { q: 'Does this JavaScript compiler run Node.js or browser JS?', a: 'It runs Node.js engine on a secure server sandbox, allowing you to test backend JS algorithms, console outputs, and logic.' },
      { q: 'Are modern ES6+ features supported?', a: 'Yes! Arrow functions, destructuring, template literals, async/await, Map/Set, and ES Modules are supported.' }
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
    sampleCode: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World from Online C# Compiler!");
        
        string[] languages = { "C#", "Python", "Java", "C++" };
        foreach (var lang in languages) {
            Console.WriteLine("Language: " + lang);
        }
    }
}`,
    introText: 'C# is a modern, object-oriented, type-safe programming language developed by Microsoft for enterprise applications, Unity game development, web APIs, and desktop software. Our Online C# Compiler enables you to write, compile, and run C# programs online without installing Visual Studio or the .NET SDK.',
    faqs: [
      { q: 'Is LINQ supported in this C# compiler?', a: 'Yes! System.Linq and standard C# collections like List<T>, Dictionary<TKey, TValue> are fully supported.' },
      { q: 'Do I need Visual Studio installed on my computer?', a: 'No setup is required. Everything compiles and executes directly inside your web browser.' }
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
    sampleCode: `package main
import "fmt"

func main() {
    fmt.Println("Hello, World from Online Go Compiler!")
    
    slice := []string{"Go", "Docker", "Kubernetes"}
    for i, item := range slice {
        fmt.Printf("%d: %s\\n", i+1, item)
    }
}`,
    introText: 'Go (Golang) is an open-source programming language designed at Google for simplicity, high concurrency, fast compilation, and cloud infrastructure development. Our Online Go Compiler lets you write and execute Golang code online instantly without setting up GOROOT, GOPATH, or local Go toolchain.',
    faqs: [
      { q: 'Can I run Go routines and concurrency code?', a: 'Yes, standard Go concurrency features including goroutines, channels, and sync primitives are supported.' },
      { q: 'How fast is the Go compilation speed?', a: 'Go is famous for ultra-fast compilation — programs compile and execute in under 1.5 seconds.' }
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
    sampleCode: `fn main() {
    println!("Hello, World from Online Rust Compiler!");
    
    let numbers = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers.iter().sum();
    println!("Sum of numbers: {}", sum);
}`,
    introText: 'Rust is a systems programming language focused on speed, memory safety, and safe concurrency without a garbage collector. Our Online Rust Compiler runs the rustc compiler in a secure Linux sandbox, allowing you to learn Rust ownership, borrowing, structs, pattern matching, and vectors without installing rustup or Cargo locally.',
    faqs: [
      { q: 'Which Rust compiler toolchain is used?', a: 'Our Rust compiler uses stable rustc on a 64-bit Linux container.' },
      { q: 'Does it check borrow checker and ownership errors?', a: 'Yes, rustc produces full compiler diagnostics, borrow checker errors, and warnings in the output terminal.' }
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
    sampleCode: `<?php
echo "Hello, World from Online PHP Compiler!\\n";

$colors = ["Red", "Green", "Blue"];
foreach ($colors as $color) {
    echo "Color: " . $color . "\\n";
}
?>`,
    introText: 'PHP is a widely-used server-side scripting language designed for web development. Our Online PHP Compiler runs PHP CLI (Command Line Interface) in your browser, enabling you to test PHP algorithms, string processing, arrays, functions, and object-oriented PHP without configuring Apache, Nginx, or XAMPP.',
    faqs: [
      { q: 'Do I need XAMPP or WAMP installed?', a: 'No! You can run PHP code instantly online without installing local web servers.' },
      { q: 'Can I test array functions and string methods?', a: 'Yes! All built-in PHP CLI functions, array operations, and OOP classes work smoothly.' }
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
    sampleCode: `# Online Ruby Compiler
puts "Hello, World from Online Ruby Compiler!"

5.times do |i|
  puts "Ruby Iteration #{i + 1}"
end`,
    introText: 'Ruby is a dynamic, open-source programming language with a focus on simplicity and productivity. Our Online Ruby Compiler allows developers and students to run Ruby scripts online without installing Ruby Version Manager (RVM) or local Ruby gems.',
    faqs: [
      { q: 'Does this Ruby compiler support blocks and iterators?', a: 'Yes! Ruby blocks, Procs, lambdas, iterators, and modules are supported.' },
      { q: 'Is it free for learning Ruby on Rails concepts?', a: 'Yes, perfect for testing Ruby language fundamentals before diving into Ruby on Rails.' }
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
  const escapedSampleCode = escapeHtml(lang.sampleCode);
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

  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7028247458903242" crossorigin="anonymous"></script>
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
      <div style="text-align:center; margin-bottom: 32px;">
        <span style="background:rgba(88,166,255,0.1); border:1px solid rgba(88,166,255,0.3); color:#58a6ff; border-radius:20px; padding:6px 16px; font-size:13px; font-weight:600; display:inline-block; margin-bottom:12px;">${lang.badge}</span>
        <h1 style="font-family:'Sora',sans-serif; font-size:32px; font-weight:800; color:#fff; margin-bottom:12px;">${lang.heading}</h1>
        <p style="font-size:16px; color:#8b949e; max-width:720px; margin:0 auto; line-height:1.6;">${lang.subheading}</p>
      </div>

      <!-- Quick Code Sample -->
      <section style="background:#161b22; border:1px solid #30363d; border-radius:12px; padding:20px; margin-bottom:32px;">
        <h2 style="font-size:18px; color:#fff; margin-bottom:12px; font-family:'Sora',sans-serif;">💻 Code Example (${lang.langName})</h2>
        <pre style="background:#0d1117; border:1px solid #30363d; border-radius:8px; padding:16px; overflow-x:auto; font-family:'JetBrains Mono',monospace; color:#3fb950; font-size:14px; line-height:1.5;"><code>${escapedSampleCode}</code></pre>
      </section>

      <!-- Overview Article -->
      <article style="background:#161b22; border:1px solid #30363d; border-radius:12px; padding:28px; margin-bottom:32px; line-height:1.7;">
        <h2 style="font-size:22px; color:#fff; margin-bottom:16px; font-family:'Sora',sans-serif;">Overview of ${lang.langName} Compiler</h2>
        <p style="margin-bottom:16px; font-size:15px; color:#c9d1d9;">${lang.introText}</p>
        
        <h3 style="font-size:18px; color:#58a6ff; margin-top:24px; margin-bottom:12px; font-family:'Sora',sans-serif;">Key Platform Features</h3>
        <ul style="padding-left:20px; margin-bottom:20px; font-size:15px;">
          <li style="margin-bottom:8px;"><strong>⚡ Fast Sandbox Execution:</strong> Run code in under 2 seconds inside isolated Docker Linux containers.</li>
          <li style="margin-bottom:8px;"><strong>📝 Monaco Editor Engine:</strong> Experience auto-indentation, line numbers, and syntax highlighting powered by VS Code engine.</li>
          <li style="margin-bottom:8px;"><strong>📬 Interactive Stdin Input:</strong> Support for user input reading from stdin terminal interface.</li>
          <li style="margin-bottom:8px;"><strong>🔒 100% Secure &amp; Private:</strong> Code runs purely in memory and is discarded after completion.</li>
          <li style="margin-bottom:8px;"><strong>📱 Zero Setup Required:</strong> Works seamlessly across laptops, tablets, and smartphones without downloads.</li>
        </ul>
      </article>

      <!-- How to Use Guide -->
      <section style="background:#161b22; border:1px solid #30363d; border-radius:12px; padding:28px; margin-bottom:32px;">
        <h2 style="font-size:22px; color:#fff; margin-bottom:16px; font-family:'Sora',sans-serif;">How to Compile &amp; Run Code Online</h2>
        <ol style="padding-left:20px; line-height:1.8; font-size:15px;">
          <li>Select your preferred programming language from the top navigation bar.</li>
          <li>Type or paste your source code into the Monaco code editor.</li>
          <li>If your program requires user input, enter values into the interactive stdin terminal.</li>
          <li>Click the green <strong>Run Code</strong> button to compile and view your program output instantly.</li>
        </ol>
      </section>

      <!-- Frequently Asked Questions -->
      <section style="background:#161b22; border:1px solid #30363d; border-radius:12px; padding:28px; margin-bottom:32px;">
        <h2 style="font-size:22px; color:#fff; margin-bottom:20px; font-family:'Sora',sans-serif;">Frequently Asked Questions (FAQ)</h2>
        ${lang.faqs.map(f => `
          <div style="margin-bottom:20px; border-bottom:1px solid #30363d; padding-bottom:16px;">
            <h3 style="font-size:16px; color:#58a6ff; margin-bottom:8px; font-family:'Sora',sans-serif;">Q: ${f.q}</h3>
            <p style="font-size:14px; color:#8b949e; margin:0; line-height:1.6;">${f.a}</p>
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
