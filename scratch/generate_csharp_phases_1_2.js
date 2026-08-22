const fs = require('fs');
const path = require('path');
const { wrapCSharpPage } = require('./build_csharp_master.js');

const csharpDir = path.join(__dirname, '..', 'public', 'blog-csharp');
console.log('🚀 Generating C# Masterclass Phases 1 & 2 (Chapters 1–6) — EXPANDED TEXTBOOK EDITION...');

function makeLesson(num, file, title, desc, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle) {
  fs.writeFileSync(
    path.join(csharpDir, file),
    wrapCSharpPage(title, desc, file, num, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle),
    'utf8'
  );
  const kb = Math.round(fs.statSync(path.join(csharpDir, file)).size / 1024);
  console.log('  ✅ ' + file + ' (' + kb + 'KB)');
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 1: C# Introduction
// ═══════════════════════════════════════════════════════════════════════════════
const c1 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 1 (Chapter 1): C# Overview, History, Features &amp; .NET Architecture Masterclass</strong>! C# (pronounced <em>C-Sharp</em>) is a modern, object-oriented, type-safe, and high-performance programming language created by Microsoft led by Anders Hejlsberg. It runs on the <strong>.NET platform</strong> and is used worldwide to build Web APIs, Cloud microservices, Desktop applications, Mobile apps, AI models, and 3D Video Games in Unity.</p>
</div>

<div class="section-title"><span class="num">1</span>C# Ante Enti? (What is C#?)</div>
<div class="section-body">
  <p class="text-prose">C# is a modern, object-oriented, and type-safe programming language used with the .NET platform. C# తో console applications, desktop applications, web APIs, web applications, cloud services, and games build చేయవచ్చు. .NET అనేది C#, F#, and Visual Basic applications కోసం unified platform and execution runtime నీ అందిస్తుంది.</p>
  <div class="concept-box">
    <h4>Key Characteristics of C#:</h4>
    <p>• <strong>Object-Oriented:</strong> Full support for Classes, Objects, Inheritance, Encapsulation, Abstraction, and Polymorphism.</p>
    <p>• <strong>Type-Safe &amp; Memory-Safe:</strong> Automatic memory management via Garbage Collection (GC) prevents buffer overflows, wild pointers, and uninitialized memory access.</p>
    <p>• <strong>Cross-Platform:</strong> Runs seamlessly on Windows, Linux, macOS, iOS, Android, and WebAssembly (via Blazor).</p>
    <p>• <strong>Modern Language Features:</strong> LINQ (Language Integrated Query), Async/Await, Pattern Matching, Nullable Reference Types, Record types, and Expression-bodied members.</p>
  </div>
</div>

<div class="section-title"><span class="num">2</span>C# History &amp; Version Evolution</div>
<div class="section-body">
  <p class="text-prose">C# was introduced in 2000 as part of Microsoft's .NET strategy. Over the last two decades, it has evolved from a Java alternative into one of the most innovative and versatile programming languages in existence.</p>
  <table class="tbl spec-table">
    <thead><tr><th>Version</th><th>Year</th><th>.NET Version</th><th>Major Features Introduced</th></tr></thead>
    <tbody>
      <tr><td>C# 1.0</td><td>2002</td><td>.NET Framework 1.0</td><td>Initial release, OOP, Classes, Interfaces, Structs, Delegates, Events</td></tr>
      <tr><td>C# 2.0</td><td>2005</td><td>.NET Framework 2.0</td><td>Generics, Anonymous Methods, Nullable Types, Iterators (yield)</td></tr>
      <tr><td>C# 3.0</td><td>2007</td><td>.NET Framework 3.5</td><td>LINQ, Lambda Expressions, Auto-Properties, Anonymous Types, Extension Methods</td></tr>
      <tr><td>C# 4.0</td><td>2010</td><td>.NET Framework 4.0</td><td>Dynamic binding (dynamic type), Named &amp; Optional Arguments</td></tr>
      <tr><td>C# 5.0</td><td>2012</td><td>.NET Framework 4.5</td><td>Async / Await asynchronous programming, Caller info attributes</td></tr>
      <tr><td>C# 6.0</td><td>2015</td><td>.NET Framework 4.6</td><td>Expression-bodied members, String interpolation, Null-conditional operator (?.)</td></tr>
      <tr><td>C# 7.0</td><td>2017</td><td>.NET Core 2.0</td><td>Tuples, Pattern Matching, Local functions, ref returns, out variables</td></tr>
      <tr><td>C# 8.0</td><td>2019</td><td>.NET Core 3.0</td><td>Nullable Reference Types, Async Streams, Default Interface Methods, Switch Expressions</td></tr>
      <tr><td>C# 9.0</td><td>2020</td><td>.NET 5</td><td>Top-level statements, Record types, Init-only setters, Target-typed new</td></tr>
      <tr><td>C# 10.0</td><td>2021</td><td>.NET 6</td><td>Global using directives, File-scoped namespaces, Record structs</td></tr>
      <tr><td>C# 11.0</td><td>2022</td><td>.NET 7</td><td>Raw string literals, Generic math, Required members</td></tr>
      <tr><td>C# 12.0</td><td>2023</td><td>.NET 8</td><td>Primary constructors for classes/structs, Collection expressions, Ref readonly</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">3</span>C# Application Domains — Ekkada Use Chestaru?</div>
<div class="section-body">
  <p class="text-prose">C# is one of the most versatile languages in industry today. You can target virtually any computing platform:</p>
  <div class="memory-diagram">C# Ecosystem &amp; Application Domains:

  ┌──────────────────────────────────────────────────────────────────────────┐
  │                           C# / .NET PLATFORM                             │
  ├──────────────┬──────────────┬──────────────┬──────────────┬──────────────┤
  │   WEB &amp; API  │   DESKTOP    │ MOBILE &amp; UI  │    GAMES     │ CLOUD &amp; AI   │
  ├──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
  │ ASP.NET Core │ WPF          │ .NET MAUI    │ Unity 3D/2D  │ Azure Cloud  │
  │ Blazor (Wasm)│ WinForms     │ Xamarin      │ Godot Engine │ ML.NET (AI)  │
  │ REST APIs    │ Avalonia UI  │ iOS / Android│ Stride Engine│ Microservices│
  └──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘</div>
</div>

<div class="section-title"><span class="num">4</span>C# vs Java &amp; C# vs C++</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Feature</th><th>C#</th><th>Java</th><th>C++</th></tr></thead>
    <tbody>
      <tr><td>Execution Model</td><td>JIT compiled via CLR</td><td>JIT compiled via JVM</td><td>Compiled directly to Native Machine Code</td></tr>
      <tr><td>Memory Management</td><td>Automatic Garbage Collector (GC)</td><td>Automatic Garbage Collector (GC)</td><td>Manual (new/delete) + RAII &amp; Smart Pointers</td></tr>
      <tr><td>Properties</td><td>Native <code>{ get; set; }</code> syntax</td><td>Requires manual getters/setters</td><td>Manual getter/setter methods</td></tr>
      <tr><td>Value Types</td><td>First-class <code>struct</code> value types</td><td>Only primitives (int, double, char)</td><td>Native structs and classes (stack/heap)</td></tr>
      <tr><td>Query Language</td><td>LINQ integrated directly into syntax</td><td>Stream API (methods)</td><td>Range-based algorithms (C++20 Ranges)</td></tr>
      <tr><td>Async Programming</td><td>Native <code>async</code> / <code>await</code> keywords</td><td>CompletableFuture / Virtual Threads</td><td>std::future / C++20 Coroutines</td></tr>
      <tr><td>Pointer Support</td><td>Supported in <code>unsafe</code> blocks</td><td>No pointers supported</td><td>Native raw &amp; smart pointers</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">5</span>C# and .NET Relationship — Managed Code Concept</div>
<div class="section-body">
  <p class="text-prose">C# is the language, while <strong>.NET</strong> is the runtime platform and framework. Code written in C# is called <strong>Managed Code</strong> because its execution, memory allocation, type checking, and security are managed by the <strong>Common Language Runtime (CLR)</strong>.</p>
  <div class="memory-diagram">C# Compilation Pipeline:

  C# Source Code (Program.cs)
            │
            ▼
  Roslyn Compiler (csc)
            │
            ▼
  Common Intermediate Language (CIL / MSIL byte code) stored in Assembly (.dll / .exe)
            │
            ▼
  Common Language Runtime (CLR)
    ├── Just-In-Time (JIT) Compiler → Machine Code (010101...)
    ├── Garbage Collector (GC)
    └── Type Safety &amp; Security Verification</div>
</div>

<div class="section-title"><span class="num">6</span>Learning Prerequisites</div>
<div class="section-body">
  <p class="text-prose">No prior programming experience is required to learn C#! However, familiarity with basic computer usage and general programming concepts like variables, loops, and conditional statements will help you learn faster. This tutorial series assumes zero prior knowledge and builds your understanding step-by-step.</p>
</div>

<div class="section-title"><span class="num">7</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: What is the difference between .NET Framework, .NET Core, and .NET 8?</h4><p>.NET Framework (1.0 - 4.8) was Windows-only. .NET Core (1.0 - 3.1) was built from scratch as open-source and cross-platform. Starting with .NET 5 (and now .NET 8), Microsoft unified everything into a single, high-performance, cross-platform platform simply named <strong>.NET</strong>.</p></div>
    <div class="faq-item"><h4>Q2: What is Managed Code vs Unmanaged Code?</h4><p>Managed code runs under CLR supervision with automatic garbage collection, bounds checking, and type verification. Unmanaged code (like C/C++) compiles directly to machine code and manages memory manually.</p></div>
    <div class="faq-item"><h4>Q3: Can I run C# on Linux or macOS?</h4><p>Yes! Modern .NET is 100% cross-platform. You can develop, build, and run C# applications on Linux, macOS, Windows, and Docker containers seamlessly.</p></div>
    <div class="faq-item"><h4>Q4: What is Roslyn?</h4><p>Roslyn is the open-source C# and Visual Basic compiler platform that provides rich code analysis APIs used by Visual Studio, VS Code, and IDE tools for autocomplete, refactoring, and real-time diagnostics.</p></div>
    <div class="faq-item"><h4>Q5: Is C# fast enough for high-performance computing and gaming?</h4><p>Yes. With features like Span&lt;T&gt;, Memory&lt;T&gt;, ref structs, SIMD support, Native AOT (Ahead-of-Time compilation), and hardware intrinsics, C# achieves near-native performance while maintaining memory safety. Games like <em>Hollow Knight</em>, <em>Cities: Skylines</em>, and <em>Cuphead</em> are built with C# in Unity.</p></div>
  </div>
</div>`;

makeLesson(
  1,
  '01-csharp-introduction-features-and-dotnet.html',
  'C# Overview, History, Features & .NET Architecture Masterclass',
  'Exhaustive textbook-grade C# Introduction (Chapter 1): C# definition, history timeline (C# 1.0 to C# 12), features, application domains, C# vs Java, C# vs C++, .NET platform architecture, CIL, CLR, JIT compiler, managed code concept, and prerequisites.',
  'Phase 1',
  'C# Introduction',
  'C# Overview · History & Version Timeline · Application Types · C# vs Java · C# vs C++ · .NET Platform · CLR · CIL / MSIL · JIT Compiler · Managed Code · Prerequisites',
  c1,
  null,
  null,
  '02-csharp-setup-vs-code-dotnet-sdk-cli.html',
  '2. .NET SDK Setup, VS Code, CLI & Project Structure'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 2: C# Setup & .NET CLI
// ═══════════════════════════════════════════════════════════════════════════════
const c2 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 1 (Chapter 2): .NET SDK Setup, IDEs, .NET CLI &amp; Project Structure Masterclass</strong>! To start building C# applications, you need the <strong>.NET SDK</strong> (Software Development Kit), which includes the C# compiler, MSBuild build system, and command-line tools. In this lesson, we cover setting up VS Code with the C# Dev Kit, Visual Studio 2022, mastering the <code>dotnet</code> CLI commands, and understanding .NET project files (.csproj).</p>
</div>

<div class="section-title"><span class="num">1</span>.NET SDK vs .NET Runtime</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Component</th><th>Includes</th><th>Target Audience</th><th>Use Case</th></tr></thead>
    <tbody>
      <tr><td><strong>.NET Runtime</strong></td><td>CLR execution engine + Core class libraries</td><td>End users / Production servers</td><td>Running already-built .NET applications</td></tr>
      <tr><td><strong>.NET SDK</strong></td><td>.NET Runtime + C# Compiler (csc) + MSBuild + dotnet CLI + Templates</td><td>Software Developers</td><td>Creating, building, testing, and compiling C# code</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Development Environment Setup (VS Code &amp; Visual Studio)</div>
<div class="section-body">
  <div class="concept-box">
    <h4>Recommended Development Tools:</h4>
    <p>• <strong>Visual Studio Code (Cross-Platform):</strong> Lightweight editor. Install the official <code>C# Dev Kit</code> extension pack from Microsoft for full IntelliSense, debugging, and solution management.</p>
    <p>• <strong>Visual Studio 2022 (Windows/Mac):</strong> Comprehensive IDE with powerful visual designers, profilers, and enterprise diagnostics.</p>
    <p>• <strong>Online C# Compiler:</strong> Execute C# snippets directly in your browser on <a href="/online-csharp-compiler.html">mana-compiler C# IDE</a>.</p>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Creating &amp; Running a Project via .NET CLI</div>
<div class="section-body">
  <p class="text-prose">The <code>dotnet</code> command-line interface (CLI) is the primary tool for creating, building, running, and managing .NET applications across platforms.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CLI — Commands for HelloCSharp Project</span></div>
<pre><code># 1. Create a new C# Console application
dotnet new console -n HelloCSharp

# 2. Navigate into the project directory
cd HelloCSharp

# 3. Build and Run the application in one command
dotnet run

# 4. Build only (compiles without running)
dotnet build

# 5. Clean build artifacts (deletes bin/ and obj/ folders)
dotnet clean

# 6. Publish for production release
dotnet publish -c Release</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Project Folder Structure &amp; .csproj File</div>
<div class="section-body">
  <div class="memory-diagram">C# Console Project Anatomy:

  HelloCSharp/
  ├── HelloCSharp.csproj      ← MSBuild XML project settings &amp; dependencies
  ├── Program.cs              ← C# Source code file
  ├── bin/                    ← Binary outputs (compiled DLLs and executables)
  │   └── Debug/
  │       └── net8.0/
  │           ├── HelloCSharp.exe (or .dll on Linux)
  │           └── HelloCSharp.pdb (Debug symbols)
  └── obj/                    ← Intermediate build state &amp; NuGet package assets</div>

  <p class="text-prose">The <strong>.csproj</strong> file is an XML-based MSBuild configuration file that specifies target frameworks, dependencies, and compiler settings:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">XML — HelloCSharp.csproj Breakdown</span></div>
<pre><code>&lt;Project Sdk="Microsoft.NET.Sdk"&gt;

  &lt;PropertyGroup&gt;
    &lt;OutputType&gt;Exe&lt;/OutputType&gt;
    &lt;TargetFramework&gt;net8.0&lt;/TargetFramework&gt;
    &lt;ImplicitUsings&gt;enable&lt;/ImplicitUsings&gt;
    &lt;Nullable&gt;enable&lt;/Nullable&gt;
  &lt;/PropertyGroup&gt;

&lt;/Project&gt;</code></pre>
  </div>
  <table class="tbl spec-table">
    <thead><tr><th>XML Tag</th><th>Meaning</th></tr></thead>
    <tbody>
      <tr><td><code>Sdk="Microsoft.NET.Sdk"</code></td><td>Imports standard .NET build rules and targets</td></tr>
      <tr><td><code>&lt;OutputType&gt;Exe&lt;/OutputType&gt;</code></td><td>Produces an executable application (vs Class Library .dll)</td></tr>
      <tr><td><code>&lt;TargetFramework&gt;net8.0&lt;/TargetFramework&gt;</code></td><td>Targets .NET 8.0 runtime</td></tr>
      <tr><td><code>&lt;ImplicitUsings&gt;enable&lt;/ImplicitUsings&gt;</code></td><td>Automatically includes standard namespaces like System, System.Linq, System.IO</td></tr>
      <tr><td><code>&lt;Nullable&gt;enable&lt;/Nullable&gt;</code></td><td>Enables C# Nullable Reference Types analysis to catch null reference bugs</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">5</span>Common Setup Errors &amp; Solutions</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Error 1: 'dotnet' is not recognized as an internal or external command</h4><p><strong>Cause:</strong> .NET SDK is not installed, or its path is missing from your system's PATH environment variable. Reinstall the .NET SDK from dotnet.microsoft.com and restart your terminal.</p></div>
    <div class="faq-item"><h4>Error 2: TargetFramework 'net8.0' was not found</h4><p><strong>Cause:</strong> Your project specifies <code>&lt;TargetFramework&gt;net8.0&lt;/TargetFramework&gt;</code>, but you only have an older SDK (like .NET 6 or 7) installed. Update your .NET SDK or change the target framework in .csproj to match your installed SDK version (check with <code>dotnet --version</code>).</p></div>
    <div class="faq-item"><h4>Error 3: Missing OmniSharp / C# Dev Kit Server</h4><p><strong>Cause:</strong> In VS Code, IntelliSense doesn't work if the workspace root isn't set to the folder containing .csproj or .sln. Open the exact project root folder in VS Code.</p></div>
  </div>
</div>

<div class="section-title"><span class="num">6</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: What command lists all installed .NET SDKs?</h4><p>Run <code>dotnet --list-sdks</code> in your terminal. To view installed runtimes, run <code>dotnet --list-runtimes</code>.</p></div>
    <div class="faq-item"><h4>Q2: What is the difference between dotnet build and dotnet run?</h4><p><code>dotnet build</code> compiles the project and produces assembly files in the <code>bin/</code> folder. <code>dotnet run</code> compiles (if changed) AND executes the application immediately.</p></div>
    <div class="faq-item"><h4>Q3: What is NuGet?</h4><p>NuGet is the official package manager for .NET. You can install third-party packages (like Newtonsoft.Json or EntityFramework) using <code>dotnet add package PackageName</code>.</p></div>
    <div class="faq-item"><h4>Q4: Can I build multiple projects in one Solution?</h4><p>Yes! A Solution file (<code>.sln</code>) groups multiple related <code>.csproj</code> projects together (e.g., Web API project + Data Access library project + Unit Test project).</p></div>
  </div>
</div>`;

makeLesson(
  2,
  '02-csharp-setup-vs-code-dotnet-sdk-cli.html',
  '.NET SDK Setup, VS Code, CLI & Project Structure Masterclass',
  'Exhaustive textbook-grade C# Setup (Chapter 2): .NET SDK vs Runtime, VS Code setup, Visual Studio 2022, C# Dev Kit, dotnet CLI commands (new, run, build, clean, publish), project folder structure, .csproj XML breakdown, and common setup error resolution.',
  'Phase 1',
  'C# Setup & Tooling',
  '.NET SDK vs Runtime · VS Code Setup · C# Dev Kit · dotnet CLI · dotnet new console · dotnet run · dotnet build · Project Folder Structure · .csproj XML Breakdown · Common Setup Errors',
  c2,
  '01-csharp-introduction-features-and-dotnet.html',
  '1. C# Overview, History, Features & .NET Architecture',
  '03-csharp-first-program-program-cs-main-console.html',
  '3. First C# Program, Top-Level Statements & Console I/O'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 3: First C# Program
// ═══════════════════════════════════════════════════════════════════════════════
const c3 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 1 (Chapter 3): First C# Program, Program.cs, Top-Level Statements &amp; Console I/O Masterclass</strong>! Writing your first program is an exciting milestone. In this chapter, we explore C# program structure line-by-line, contrasting classic boilerplate code with C# 9+ Top-Level Statements, and mastering console input and output using <code>Console.WriteLine()</code> and <code>Console.Write()</code>.</p>
</div>

<div class="section-title"><span class="num">1</span>Classic Program Structure vs Top-Level Statements</div>
<div class="section-body">
  <p class="text-prose">In traditional C# (prior to C# 9), every program required explicit <code>using</code> statements, a <code>namespace</code>, a <code>class</code>, and a static <code>Main()</code> method. Modern C# 9+ allows <strong>Top-Level Statements</strong> for cleaner, less boilerplate code in entry-point files.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Classic Structure (C# 1.0 - 8.0)</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>using System;

namespace HelloCSharpApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World from Classic C#!");
        }
    }
}</code></pre>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Modern Top-Level Statements (C# 9.0+)</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>// Top-Level Statement — Roslyn compiler auto-generates the Program class and Main() method!
Console.WriteLine("Hello, C# 12!");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Line-by-Line Code Breakdown</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Program.cs Detailed Anatomy</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>using System; // 1. using directive: imports the System namespace containing Console class

namespace MyFirstApp // 2. namespace: logical container to organize classes and avoid naming collisions
{
    class Program // 3. class: blueprint containing data and methods
    {
        // 4. Main method: Entry point of execution called by CLR runtime
        static void Main(string[] args)
        {
            // 5. Console.WriteLine(): Prints text to console window and appends a new line
            Console.WriteLine("Hello, C#!");

            // 6. Semicolon (;): Terminates every C# statement
        }
    }
}</code></pre>
  </div>
  <table class="tbl spec-table">
    <thead><tr><th>Element</th><th>Purpose</th></tr></thead>
    <tbody>
      <tr><td><code>using System;</code></td><td>Imports standard classes (like <code>Console</code>, <code>Math</code>, <code>Environment</code>) from the <code>System</code> namespace.</td></tr>
      <tr><td><code>namespace</code></td><td>Organizes code into logical units to prevent naming conflicts across large projects.</td></tr>
      <tr><td><code>class</code></td><td>Defines a reference type data structure. All C# executable code must reside inside a class or struct.</td></tr>
      <tr><td><code>static void Main()</code></td><td>The mandatory entry point function executed by the CLR when the app launches. <code>static</code> means callable without instantiating the class. <code>void</code> means returns no value.</td></tr>
      <tr><td><code>string[] args</code></td><td>Array of command-line arguments passed to the program when executed.</td></tr>
      <tr><td><code>Console</code></td><td>A built-in class in the <code>System</code> namespace representing standard input/output streams.</td></tr>
      <tr><td><code>WriteLine()</code></td><td>Method that writes the specified value followed by the current line terminator to the standard output stream.</td></tr>
      <tr><td><code>;</code> (Semicolon)</td><td>Mandatory statement terminator in C#. Omitting it results in a syntax compile error.</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">3</span>Console.WriteLine() vs Console.Write()</div>
<div class="section-body">
  <p class="text-prose">C# provides two primary methods for writing output to the terminal:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Write vs WriteLine</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>// Console.Write() prints output WITHOUT appending a newline
Console.Write("Welcome ");
Console.Write("to ");
Console.Write("C#!\n"); // Output: Welcome to C#!

// Console.WriteLine() prints output AND automatically appends a newline (\n)
Console.WriteLine("Line 1");
Console.WriteLine("Line 2");
// Output:
// Line 1
// Line 2

// String Interpolation ($) — Modern way to format variables inside strings
string name = "Ravi";
int age = 21;
Console.WriteLine($"Student Name: {name}, Age: {age}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Comments in C#</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Commenting Styles</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>// 1. Single-line comment — ignored by compiler

/* 2. Multi-line comment
      spans across multiple lines
      useful for detailed explanations */

/// &lt;summary&gt;
/// 3. XML Documentation Comment
/// Calculates the total price including tax.
/// &lt;/summary&gt;
/// &lt;param name="price"&gt;Base price of item&lt;/param&gt;
/// &lt;returns&gt;Total price after 18% GST tax&lt;/returns&gt;
static double CalculateTotal(double price)
{
    return price * 1.18;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Can I have multiple Top-Level Statements in a project?</h4><p>No. Only ONE file in a project can contain Top-Level Statements (usually <code>Program.cs</code>). Other files must declare classes, namespaces, or structs explicitly.</p></div>
    <div class="faq-item"><h4>Q2: What happens if I forget a semicolon in C#?</h4><p>The compiler reports a syntax error: <code>CS1002: ; expected</code>. The project will fail to build until fixed.</p></div>
    <div class="faq-item"><h4>Q3: Is C# case-sensitive?</h4><p>Yes! C# is strictly case-sensitive. <code>Console.WriteLine</code>, <code>console.writeline</code>, and <code>CONSOLE.WRITELINE</code> are completely different identifiers, and only the exact capitalized version is valid.</p></div>
  </div>
</div>`;

makeLesson(
  3,
  '03-csharp-first-program-program-cs-main-console.html',
  'First C# Program, Top-Level Statements & Console I/O Masterclass',
  'Exhaustive textbook-grade C# First Program (Chapter 3): Program.cs anatomy, using directives, namespaces, class, Main() method, Top-level statements (C# 9+), Console.WriteLine vs Write, comments, and compile-run workflow.',
  'Phase 1',
  'First C# Program',
  'Program.cs Anatomy · using Directives · Namespace · Class · Main() Method · Top-Level Statements · Console.WriteLine() · Console.Write() · String Interpolation · Comments',
  c3,
  '02-csharp-setup-vs-code-dotnet-sdk-cli.html',
  '2. .NET SDK Setup, VS Code, CLI & Project Structure',
  '04-csharp-variables-constants-scope-and-var.html',
  '4. Variables, Constants (const/readonly), var & Scope'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 4: Variables & Constants
// ═══════════════════════════════════════════════════════════════════════════════
const c4 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 2 (Chapter 4): C# Variables, Constants, Scope &amp; Type Inference Masterclass</strong>! A variable is a named memory location used to store data that can be manipulated during program execution. In this lesson, we cover variable declaration, initialization, assignment, reassignment, variable naming rules, local variables, <code>const</code> vs <code>readonly</code> constants, implicit typing with <code>var</code>, dynamic typing with <code>dynamic</code>, and variable scoping.</p>
</div>

<div class="section-title"><span class="num">1</span>Variable Fundamentals — Declaration, Initialization &amp; Naming Rules</div>
<div class="section-body">
  <p class="text-prose">In C#, every variable must be declared with a data type before it can be used. Trying to access an unassigned local variable causes a compile error.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Variables Demonstration</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>// 1. Declaration (datatype variableName;)
string name;

// 2. Initialization (assigning initial value)
name = "Ravi";

// 3. Declaration &amp; Initialization combined
int age = 21;
double price = 99.99;
bool isStudent = true;

// 4. Reassignment (updating variable value)
age = 22;

// Outputting variables to console
Console.WriteLine($"Name: {name}");
Console.WriteLine($"Age: {age}");
Console.WriteLine($"Price: {price}");
Console.WriteLine($"Is Student: {isStudent}");</code></pre>
  </div>
  <div class="concept-box">
    <h4>C# Variable Naming Rules &amp; Conventions:</h4>
    <p>• <strong>Allowed Characters:</strong> Letters (A-Z, a-z), digits (0-9), and underscore (<code>_</code>). Must start with a letter or underscore.</p>
    <p>• <strong>Case-Sensitive:</strong> <code>age</code>, <code>Age</code>, and <code>AGE</code> are three distinct variables.</p>
    <p>• <strong>Naming Conventions:</strong> Use <strong>camelCase</strong> for local variables and parameters (e.g., <code>totalScore</code>, <code>userAge</code>). Use <strong>PascalCase</strong> for classes, methods, and properties (e.g., <code>CalculateTax</code>, <code>StudentName</code>).</p>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Constants — const vs readonly</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Feature</th><th>const</th><th>readonly</th></tr></thead>
    <tbody>
      <tr><td>Evaluation Time</td><td><strong>Compile-Time constant</strong></td><td><strong>Runtime constant</strong></td></tr>
      <tr><td>Initialization</td><td>MUST be initialized at declaration</td><td>Can be initialized at declaration OR inside a Constructor</td></tr>
      <tr><td>Memory / Static Behavior</td><td>Implicitly <code>static</code> (stored in metadata)</td><td>Can be instance-level (different per object instance)</td></tr>
      <tr><td>Allowed Types</td><td>Only primitive types, enums, strings</td><td>Any type (including complex objects &amp; arrays)</td></tr>
      <tr><td>Use Case</td><td>Universal mathematical/physical constants (e.g., PI = 3.14159)</td><td>Configuration settings loaded at runtime (e.g., ConnectionString)</td></tr>
    </tbody>
  </table>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — const vs readonly in action</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>class BankAccount
{
    // const: evaluated at compile time
    public const double INTEREST_RATE = 0.05;

    // readonly: evaluated at runtime (set in constructor)
    public readonly string AccountNumber;

    public BankAccount(string accNum)
    {
        AccountNumber = accNum; // Initialized at runtime in constructor
    }
}

// Usage
Console.WriteLine($"Interest Rate: {BankAccount.INTEREST_RATE}");
BankAccount acc = new BankAccount("ACC-98765");
Console.WriteLine($"Account: {acc.AccountNumber}");
// acc.AccountNumber = "NEW"; // COMPILE ERROR: Cannot assign to readonly field outside constructor!</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Implicit Typing (var) vs Dynamic Typing (dynamic)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — var vs dynamic</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>// 1. var: Implicitly Typed Local Variable (STRICTLY TYPE-SAFE at compile time!)
var city = "Hyderabad"; // Compiler deduces type: string
var count = 100;         // Compiler deduces type: int
// city = 50;            // COMPILE ERROR: Cannot convert int to string!

// 2. dynamic: Bypasses compile-time type checking (evaluated at RUNTIME)
dynamic data = "Hello";
Console.WriteLine(data.Length); // 5

data = 42; // Allowed! Type changes to int at runtime
data = true; // Allowed! Type changes to bool

// Dangerous runtime error with dynamic:
// Console.WriteLine(data.Substring(0, 2)); // Runtime Exception! bool doesn't have Substring method!</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Variable Scope</div>
<div class="section-body">
  <div class="memory-diagram">Variable Scope Boundaries:

  class ScopeDemo {
      int classLevel = 10; // Class/Field scope — accessible anywhere in class

      void MyMethod() {
          int methodLevel = 20; // Method scope — accessible anywhere in method

          if (true) {
              int blockLevel = 30; // Block scope — accessible ONLY inside this if-block
              Console.WriteLine(blockLevel);
          }
          // Console.WriteLine(blockLevel); // ERROR: Out of scope!
      }
  }</div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Does using 'var' reduce performance or make C# weakly typed?</h4><p>No! <code>var</code> is 100% strongly-typed and has ZERO performance penalty. The Roslyn compiler replaces <code>var</code> with the exact type at compile time.</p></div>
    <div class="faq-item"><h4>Q2: When should I use 'readonly' instead of 'const'?</h4><p>Use <code>readonly</code> when the value depends on runtime parameters (like constructor arguments, environment variables, or config files) or when working with complex reference types.</p></div>
  </div>
</div>`;

makeLesson(
  4,
  '04-csharp-variables-constants-scope-and-var.html',
  'Variables, Constants (const/readonly), var & Scope Masterclass',
  'Exhaustive textbook-grade C# Variables (Chapter 4): Variable declaration, initialization, re-assignment, camelCase/PascalCase naming rules, const vs readonly, var (implicit typing) vs dynamic (runtime typing), scope levels, and type inference.',
  'Phase 2',
  'Variables & Scope',
  'Variable Fundamentals · Declaration & Initialization · Naming Rules · const vs readonly · var vs dynamic · Scope Levels · Type Inference',
  c4,
  '03-csharp-first-program-program-cs-main-console.html',
  '3. First C# Program, Top-Level Statements & Console I/O',
  '05-csharp-data-types-value-vs-reference.html',
  '5. Value vs Reference Types, Nullables, DateTime & Guid'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 5: Data Types
// ═══════════════════════════════════════════════════════════════════════════════
const c5 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 2 (Chapter 5): C# Data Types, Value vs Reference Types, Nullables &amp; Built-in Structs Masterclass</strong>! Data types tell the compiler how much memory to allocate, what range of values can be stored, and what operations are valid. C# divides all data types into two fundamental categories: <strong>Value Types</strong> (stored on the Stack) and <strong>Reference Types</strong> (stored on the Heap).</p>
</div>

<div class="section-title"><span class="num">1</span>Value Types vs Reference Types — Memory Model</div>
<div class="section-body">
  <div class="memory-diagram">Stack vs Heap Memory Layout in C#:

  STACK MEMORY (Fast, Fixed Size)            HEAP MEMORY (Flexible, Managed by GC)
  ┌─────────────────────────────┐           ┌───────────────────────────────────┐
  │ int age = 21                │           │                                   │
  │ decimal salary = 45000.50m  │           │                                   │
  │ bool isActive = true        │           │                                   │
  │                             │           │                                   │
  │ string nameRef ─────────────┼──────────►│ "Ravi" (string object)            │
  │ int[] numbersRef ───────────┼──────────►│ [ 10, 20, 30, 40 ] (array object) │
  └─────────────────────────────┘           └───────────────────────────────────┘</div>
  <table class="tbl spec-table">
    <thead><tr><th>Property</th><th>Value Types</th><th>Reference Types</th></tr></thead>
    <tbody>
      <tr><td>Storage Location</td><td>Stored directly on the <strong>Stack</strong></td><td>Reference (pointer) on Stack, actual object on <strong>Heap</strong></td></tr>
      <tr><td>Assignment Behavior</td><td>Copies the <strong>actual value</strong></td><td>Copies the <strong>reference/memory address</strong></td></tr>
      <tr><td>Default Value</td><td>Zero / False / Empty struct</td><td><code>null</code></td></tr>
      <tr><td>Nullability</td><td>Cannot be null by default (use <code>Nullable&lt;T&gt;</code> or <code>T?</code>)</td><td>Can be <code>null</code></td></tr>
      <tr><td>Examples</td><td><code>int</code>, <code>long</code>, <code>float</code>, <code>double</code>, <code>decimal</code>, <code>char</code>, <code>bool</code>, <code>byte</code>, <code>short</code>, <code>struct</code>, <code>enum</code></td><td><code>string</code>, <code>object</code>, <code>class</code>, <code>array</code>, <code>delegate</code>, <code>interface</code></td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Built-In Primitive Data Types</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Type</th><th>.NET Type</th><th>Size</th><th>Range / Precision</th><th>Suffix</th></tr></thead>
    <tbody>
      <tr><td><code>byte</code></td><td>System.Byte</td><td>1 byte (8 bits)</td><td>0 to 255</td><td>–</td></tr>
      <tr><td><code>short</code></td><td>System.Int16</td><td>2 bytes (16 bits)</td><td>-32,768 to 32,767</td><td>–</td></tr>
      <tr><td><code>int</code></td><td>System.Int32</td><td>4 bytes (32 bits)</td><td>-2,147,483,648 to 2,147,483,647</td><td>–</td></tr>
      <tr><td><code>long</code></td><td>System.Int64</td><td>8 bytes (64 bits)</td><td>-9.2×10¹⁸ to 9.2×10¹⁸</td><td><code>L</code> or <code>l</code></td></tr>
      <tr><td><code>float</code></td><td>System.Single</td><td>4 bytes (32 bits)</td><td>7 digits precision</td><td><code>f</code> or <code>F</code></td></tr>
      <tr><td><code>double</code></td><td>System.Double</td><td>8 bytes (64 bits)</td><td>15-17 digits precision</td><td><code>d</code> or <code>D</code></td></tr>
      <tr><td><code>decimal</code></td><td>System.Decimal</td><td>16 bytes (128 bits)</td><td>28-29 digits precision (Exact for Money)</td><td><code>m</code> or <code>M</code></td></tr>
      <tr><td><code>char</code></td><td>System.Char</td><td>2 bytes (16 bits)</td><td>Single UTF-16 Unicode character</td><td><code>' '</code></td></tr>
      <tr><td><code>bool</code></td><td>System.Boolean</td><td>1 byte</td><td><code>true</code> or <code>false</code></td><td>–</td></tr>
      <tr><td><code>string</code></td><td>System.String</td><td>Reference</td><td>Unicode text sequence</td><td><code>" "</code></td></tr>
      <tr><td><code>object</code></td><td>System.Object</td><td>Reference</td><td>Base class of all types in C#</td><td>–</td></tr>
    </tbody>
  </table>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Primitive Types Code Example</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>int count = 10;
long population = 8000000000L;
float temp = 36.6f;
double distance = 149597870.7;
decimal salary = 45000.50m; // Use decimal for monetary &amp; financial calculations!
char grade = 'A';
bool isActive = true;
string course = "C# Masterclass";
object obj = "Universal base type";

Console.WriteLine($"Count: {count}, Salary: {salary:C}, Course: {course}");
Console.WriteLine($"Size of int: {sizeof(int)} bytes, Size of double: {sizeof(double)} bytes");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>DateTime, Guid &amp; Nullable Types (T?)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — DateTime, Guid, Nullable Types</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>// 1. DateTime — Representing dates and times
DateTime now = DateTime.Now;
DateTime today = DateTime.Today;
Console.WriteLine($"Current Time: {now}");
Console.WriteLine($"Formatted Date: {now:yyyy-MM-dd HH:mm:ss}");

// 2. Guid — Globally Unique Identifier (128-bit random unique ID)
Guid id = Guid.NewGuid();
Console.WriteLine($"Generated GUID: {id}");

// 3. Nullable Types (T?) — Value types that can hold null
int? optionalAge = null;
if (optionalAge.HasValue)
{
    Console.WriteLine($"Age is {optionalAge.Value}");
}
else
{
    Console.WriteLine("Age is unknown (null)");
}

// Null-coalescing operator (??) — provides fallback if null
int finalAge = optionalAge ?? 18;
Console.WriteLine($"Final Age: {finalAge}"); // Output: 18

// Default values
int defaultInt = default; // 0
bool defaultBool = default; // false
Console.WriteLine($"Default Int: {defaultInt}, Default Bool: {defaultBool}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Why should I use decimal instead of double for financial calculations?</h4><p><code>double</code> and <code>float</code> use base-2 binary floating-point representation, causing tiny rounding errors (e.g., 0.1 + 0.2 = 0.30000000000000004). <code>decimal</code> uses base-10 representation with 28-29 digits of exact precision, preventing monetary rounding bugs.</p></div>
    <div class="faq-item"><h4>Q2: What is the default value of unassigned variables in C#?</h4><p>Numeric types default to <code>0</code>, bool defaults to <code>false</code>, char defaults to <code>'\0'</code>, and reference types default to <code>null</code>.</p></div>
  </div>
</div>`;

makeLesson(
  5,
  '05-csharp-data-types-value-vs-reference.html',
  'Value vs Reference Types, Nullables, DateTime & Guid Masterclass',
  'Exhaustive textbook-grade C# Data Types (Chapter 5): Value types vs Reference types memory model (Stack vs Heap), int/long/float/double/decimal/byte/short comparison, char, bool, string, object, DateTime, Guid, Nullable types (T?), sizeof, and default values.',
  'Phase 2',
  'Data Types',
  'Value vs Reference Types · Stack vs Heap · Primitive Data Types · float vs double vs decimal · DateTime · Guid · Nullable Types (T?) · Null-Coalescing (??) · sizeof · Default Values',
  c5,
  '04-csharp-variables-constants-scope-and-var.html',
  '4. Variables, Constants (const/readonly), var & Scope',
  '06-csharp-type-conversion-casting-parse-tryparse.html',
  '6. Type Conversion, Parse(), TryParse() & Boxing/Unboxing'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 6: Type Conversion
// ═══════════════════════════════════════════════════════════════════════════════
const c6 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 2 (Chapter 6): C# Type Conversion, Casting, Parse(), TryParse() &amp; Boxing/Unboxing Masterclass</strong>! Type conversion is converting a value from one data type to another. C# provides <strong>Implicit conversion</strong> (automatic, safe widening), <strong>Explicit casting</strong> (manual narrowing), <strong>Convert class helper methods</strong>, <strong>int.Parse()</strong>, and the fail-safe <strong>int.TryParse()</strong> pattern.</p>
</div>

<div class="section-title"><span class="num">1</span>Implicit Conversion vs Explicit Casting</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Implicit vs Explicit Conversion</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>// 1. Implicit Conversion (Automatic — small type to larger type, no data loss)
int numInt = 100;
long numLong = numInt;    // int -&gt; long (safe)
double numDouble = numLong; // long -&gt; double (safe)
Console.WriteLine($"Implicit Double: {numDouble}");

// 2. Explicit Casting (Manual — larger type to smaller type, potential truncation!)
double pi = 3.14159;
int truncatedPi = (int)pi; // Cast double to int: truncates fractional part
Console.WriteLine($"Explicit Cast Int: {truncatedPi}"); // Output: 3

long bigVal = 3000000000L;
int overflowVal = (int)bigVal; // Overflows if value exceeds int.MaxValue!
Console.WriteLine($"Overflow Cast: {overflowVal}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Convert Class vs Parse() vs TryParse()</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Method</th><th>Null Input Behavior</th><th>Invalid Input Format</th><th>Best Used For</th></tr></thead>
    <tbody>
      <tr><td><code>Convert.ToInt32(str)</code></td><td>Returns <code>0</code> (does not throw)</td><td>Throws <code>FormatException</code></td><td>When null inputs should safely evaluate to 0</td></tr>
      <tr><td><code>int.Parse(str)</code></td><td>Throws <code>ArgumentNullException</code></td><td>Throws <code>FormatException</code></td><td>When string is guaranteed to be a valid number</td></tr>
      <tr><td><code>int.TryParse(str, out int val)</code></td><td>Returns <code>false</code> (NO EXCEPTION THROWN!)</td><td>Returns <code>false</code> (NO EXCEPTION THROWN!)</td><td><strong>Best Practice:</strong> User input validation from Console or APIs</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Fail-Safe TryParse Pattern</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>string input = "25";

// TryParse safely attempts conversion without throwing exceptions
if (int.TryParse(input, out int age))
{
    Console.WriteLine($"Conversion Successful! Age: {age}");
}
else
{
    Console.WriteLine("Invalid age input. Please enter a valid number.");
}

// Handling invalid input gracefully
string invalidInput = "ABC";
if (double.TryParse(invalidInput, out double price))
{
    Console.WriteLine($"Price: {price}");
}
else
{
    Console.WriteLine($"Could not parse '{invalidInput}' to double.");
}

// String to number and number to string
int score = 95;
string strScore = score.ToString(); // Number to string
Console.WriteLine($"String Score: {strScore}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Boxing and Unboxing</div>
<div class="section-body">
  <p class="text-prose"><strong>Boxing</strong> is converting a Value Type (like <code>int</code>) to a Reference Type (<code>object</code>). This requires allocating a new object on the Heap. <strong>Unboxing</strong> is extracting the Value Type from the Reference Type object.</p>
  <div class="memory-diagram">Boxing &amp; Unboxing Memory Pipeline:

  int val = 42;           ──[ BOXING ]──►   Heap Object: [ System.Int32 : 42 ]
  (Stack Value)                             (Allocated on Heap)
                                                     │
  int y = (int)obj;       ◄─[ UNBOXING ]─────────────┘
  (Copied back to Stack)</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Boxing &amp; Unboxing</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>int val = 123; // Value type on Stack

// 1. Boxing: Value Type -&gt; Reference Type (object)
object boxedObj = val; // Allocates memory on Heap!

// 2. Unboxing: Reference Type -&gt; Value Type (explicit cast required)
int unboxedVal = (int)boxedObj; // Extracted back to Stack

Console.WriteLine($"Boxed: {boxedObj}, Unboxed: {unboxedVal}");

// Warning: Unboxing the wrong type throws InvalidCastException at runtime!
// double bad = (double)boxedObj; // Throws InvalidCastException!</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Why is TryParse() preferred over Parse() in production code?</h4><p><code>Parse()</code> throws heavy exceptions on invalid input, which damages performance and causes application crashes if uncaught. <code>TryParse()</code> returns a boolean flag safely without throwing exceptions.</p></div>
    <div class="faq-item"><h4>Q2: Why should we avoid frequent Boxing and Unboxing?</h4><p>Boxing forces allocation on the Heap, putting pressure on the Garbage Collector and degrading performance in high-throughput loops. Using Generics (like <code>List&lt;int&gt;</code> instead of <code>ArrayList</code>) eliminates boxing entirely.</p></div>
  </div>
</div>`;

makeLesson(
  6,
  '06-csharp-type-conversion-casting-parse-tryparse.html',
  'Type Conversion, Parse(), TryParse() & Boxing/Unboxing Masterclass',
  'Exhaustive textbook-grade C# Type Conversion (Chapter 6): Implicit conversion, explicit casting, Convert class, Parse() vs TryParse() fail-safe pattern, string-number conversion, nullable conversion, invalid conversion handling, boxing and unboxing memory mechanics, and performance implications.',
  'Phase 2',
  'Type Conversion',
  'Implicit Conversion · Explicit Casting · Convert Class · int.Parse() · int.TryParse() · out Parameter · String to Number · Number to String · Boxing & Unboxing',
  c6,
  '05-csharp-data-types-value-vs-reference.html',
  '5. Value vs Reference Types, Nullables, DateTime & Guid',
  null,
  null
);

console.log('\n🎉 ALL C# PHASES 1 & 2 (CHAPTERS 1–6) FULLY GENERATED & EXPANDED!');
