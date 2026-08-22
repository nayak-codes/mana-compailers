const fs = require('fs');
const path = require('path');
const { wrapCSharpPage } = require('./build_csharp_master.js');

const csharpDir = path.join(__dirname, '..', 'public', 'blog-csharp');
console.log('🚀 Generating C# Masterclass Phases 1 & 2 (Chapters 1–6) — MASSIVE TEXTBOOK EDITION...');

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
  <p>Welcome to <strong>Phase 1 (Chapter 1): C# Overview, History, Features &amp; .NET Architecture Masterclass</strong>! C# (pronounced <em>C-Sharp</em>) is a modern, general-purpose, object-oriented, type-safe, and high-performance programming language developed by Microsoft under the leadership of Anders Hejlsberg. Built on top of the <strong>.NET platform</strong>, C# enables developers to build cloud microservices, enterprise web applications, REST APIs, desktop UI software, cross-platform mobile apps, and immersive 3D games in Unity.</p>
</div>

<div class="section-title"><span class="num">1</span>C# Ante Enti? (What is C#?)</div>
<div class="section-body">
  <p class="text-prose">C# is a modern, object-oriented, and type-safe programming language used with the .NET platform. C# తో console applications, desktop applications, web APIs, web applications, cloud services, and 3D games build చేయవచ్చు. .NET అనేది C#, F#, and Visual Basic applications కోసం unified platform and runtime environment ని అందిస్తుంది.</p>
  
  <p class="text-prose">C# combines the high-level syntax elegance and developer productivity of languages like Python or Java with the raw execution speed, type safety, and memory control of low-level languages like C++. By running inside a managed virtual machine environment called the <strong>Common Language Runtime (CLR)</strong>, C# protects developers from common software bugs like memory leaks, buffer overflows, wild pointers, and uninitialized memory access.</p>

  <div class="concept-box">
    <h4>Key Features &amp; Architectural Pillars of C#:</h4>
    <p>• <strong>Object-Oriented Programming (OOP):</strong> Full native support for Classes, Objects, Inheritance, Encapsulation, Abstraction, and Polymorphism.</p>
    <p>• <strong>Type Safety &amp; Memory Safety:</strong> The Roslyn compiler and CLR verify type safety at compile time and runtime, ensuring zero invalid memory casts or arbitrary pointer arithmetic in managed code.</p>
    <p>• <strong>Garbage Collection (GC):</strong> Automatic memory management automatically tracks, reclaims, and deallocates unused heap memory objects without requiring manual <code>free()</code> or <code>delete</code>.</p>
    <p>• <strong>Cross-Platform (.NET Core / .NET 8):</strong> Develop once and run anywhere — Windows, Linux, macOS, iOS, Android, Docker containers, and WebAssembly (via Blazor).</p>
    <p>• <strong>Language Integrated Query (LINQ):</strong> Write SQL-like declarative queries directly inside C# code to filter, sort, transform, and join data across Arrays, Lists, XML, and SQL Databases.</p>
    <p>• <strong>Asynchronous Programming (async/await):</strong> Non-blocking I/O operations scale enterprise servers to handle tens of thousands of concurrent network requests efficiently.</p>
  </div>
</div>

<div class="section-title"><span class="num">2</span>C# History &amp; Version Evolution</div>
<div class="section-body">
  <p class="text-prose">C# was unveiled in June 2000 as part of Microsoft's .NET strategy, led by chief language architect Anders Hejlsberg (creator of Turbo Pascal and Delphi). Over the last two decades, C# has evolved rapidly through 12 major releases, transforming from a managed desktop language into a open-source, high-performance, cloud-native titan.</p>

  <table class="tbl spec-table">
    <thead><tr><th>Version</th><th>Year</th><th>.NET Version</th><th>Major Innovations &amp; Language Features</th></tr></thead>
    <tbody>
      <tr><td>C# 1.0</td><td>2002</td><td>.NET Framework 1.0</td><td>Initial release: Classes, Structs, Interfaces, Delegates, Events, Properties, Statements.</td></tr>
      <tr><td>C# 2.0</td><td>2005</td><td>.NET Framework 2.0</td><td>Generics (type-safe collections), Anonymous Methods, Nullable Value Types, Iterators (yield return).</td></tr>
      <tr><td>C# 3.0</td><td>2007</td><td>.NET Framework 3.5</td><td>LINQ, Lambda Expressions, Auto-Implemented Properties, Anonymous Types, Extension Methods, Implicit typing (var).</td></tr>
      <tr><td>C# 4.0</td><td>2010</td><td>.NET Framework 4.0</td><td>Dynamic binding (dynamic keyword), Named arguments, Optional parameters, Generic covariance &amp; contravariance.</td></tr>
      <tr><td>C# 5.0</td><td>2012</td><td>.NET Framework 4.5</td><td>Asynchronous programming with <code>async</code> and <code>await</code> keywords, Caller Info attributes.</td></tr>
      <tr><td>C# 6.0</td><td>2015</td><td>.NET Framework 4.6</td><td>Expression-bodied members, String interpolation (<code>$"..."</code>), Null-conditional operator (<code>?.</code>), Exception filters.</td></tr>
      <tr><td>C# 7.0</td><td>2017</td><td>.NET Core 2.0</td><td>Tuples, Deconstruction, Pattern matching (is/switch), Local functions, Ref returns, Out variables.</td></tr>
      <tr><td>C# 8.0</td><td>2019</td><td>.NET Core 3.0</td><td>Nullable Reference Types, Async Streams, Switch Expressions, Default Interface Methods, Indices &amp; Ranges (<code>^</code>, <code>..</code>).</td></tr>
      <tr><td>C# 9.0</td><td>2020</td><td>.NET 5</td><td>Top-level statements, Record types (immutable data containers), Init-only setters, Target-typed new expressions.</td></tr>
      <tr><td>C# 10.0</td><td>2021</td><td>.NET 6</td><td>Global using directives, File-scoped namespaces, Record structs, Constant string interpolation.</td></tr>
      <tr><td>C# 11.0</td><td>2022</td><td>.NET 7</td><td>Raw string literals (<code>"""..."""</code>), Generic math support, Required members, List patterns.</td></tr>
      <tr><td>C# 12.0</td><td>2023</td><td>.NET 8</td><td>Primary constructors for classes &amp; structs, Collection expressions (<code>[...]</code>), Ref readonly parameters, Alias any type.</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">3</span>C# Application Domains — Ekkada Use Chestaru?</div>
<div class="section-body">
  <p class="text-prose">C# is utilized across diverse software engineering domains. Whether you are building microservices in the cloud or 3D games for consoles, C# provides specialized frameworks:</p>

  <div class="memory-diagram">C# Application Ecosystem:

  ┌──────────────────────────────────────────────────────────────────────────┐
  │                           C# / .NET PLATFORM                             │
  ├──────────────┬──────────────┬──────────────┬──────────────┬──────────────┤
  │   WEB &amp; API  │   DESKTOP    │ MOBILE &amp; UI  │    GAMES     │ CLOUD &amp; AI   │
  ├──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
  │ ASP.NET Core │ WPF          │ .NET MAUI    │ Unity 3D/2D  │ Azure Cloud  │
  │ Blazor (Wasm)│ WinForms     │ Xamarin      │ Godot Engine │ ML.NET (AI)  │
  │ REST APIs    │ Avalonia UI  │ iOS / Android│ Stride Engine│ Microservices│
  └──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘</div>

  <ul class="text-prose" style="margin-left: 20px;">
    <li><strong>Web &amp; Microservices (ASP.NET Core):</strong> High-performance Web APIs capable of handling millions of requests per second with low latency.</li>
    <li><strong>Full-Stack Web (Blazor):</strong> Build single-page web applications using C# running directly in the browser via WebAssembly (C# replacing JavaScript!).</li>
    <li><strong>Mobile Applications (.NET MAUI):</strong> Single codebase targeting iOS, Android, macOS, and Windows.</li>
    <li><strong>Game Development (Unity 3D):</strong> C# is the primary scripting language for Unity, used to build games like <em>Hollow Knight</em>, <em>Cuphead</em>, and <em>Genshin Impact</em>.</li>
    <li><strong>Cloud &amp; Serverless (Microsoft Azure / AWS):</strong> Native integration with cloud providers, Azure Functions, and microservice containers.</li>
  </ul>
</div>

<div class="section-title"><span class="num">4</span>C# vs Java &amp; C# vs C++ Detailed Comparison</div>
<div class="section-body">
  <p class="text-prose">To understand C#'s position in the programming landscape, let's compare it directly against Java and C++:</p>

  <table class="tbl spec-table">
    <thead><tr><th>Feature / Property</th><th>C#</th><th>Java</th><th>C++</th></tr></thead>
    <tbody>
      <tr><td>Execution Model</td><td>JIT compiled via CLR</td><td>JIT compiled via JVM</td><td>Compiled directly to Native Machine Code</td></tr>
      <tr><td>Memory Management</td><td>Automatic Garbage Collection (GC)</td><td>Automatic Garbage Collection (GC)</td><td>Manual (new/delete) + RAII &amp; Smart Pointers</td></tr>
      <tr><td>Properties</td><td>Native <code>{ get; set; }</code> properties</td><td>Requires manual getters/setters</td><td>Manual getter/setter methods</td></tr>
      <tr><td>Value Types</td><td>First-class <code>struct</code> value types on Stack</td><td>Only primitive types (int, double)</td><td>Native stack structs and classes</td></tr>
      <tr><td>Query Language</td><td>LINQ integrated directly into syntax</td><td>Stream API (method calls)</td><td>Range-based algorithms (C++20 Ranges)</td></tr>
      <tr><td>Async Programming</td><td>Native <code>async</code> / <code>await</code> keywords</td><td>CompletableFuture / Virtual Threads</td><td>std::future / C++20 Coroutines</td></tr>
      <tr><td>Pointers</td><td>Supported in <code>unsafe</code> blocks</td><td>No pointers supported</td><td>Native raw &amp; smart pointers</td></tr>
      <tr><td>Multiple Inheritance</td><td>Single class inheritance + Multiple Interfaces</td><td>Single class inheritance + Multiple Interfaces</td><td>Multiple Class Inheritance supported</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">5</span>C# and .NET Relationship — Managed Code Concept</div>
<div class="section-body">
  <p class="text-prose">A fundamental concept to master is the distinction between <strong>C# (the language)</strong> and <strong>.NET (the execution platform and class library)</strong>. When you write C# code, it undergoes a two-stage compilation process:</p>

  <div class="memory-diagram">C# Compilation Pipeline &amp; Execution Model:

  C# Source Code (Program.cs)
            │
            ▼  [Stage 1: Roslyn Compiler (csc)]
  Common Intermediate Language (CIL / MSIL Bytecode) packaged into Assembly (.dll / .exe)
            │
            ▼  [Stage 2: Common Language Runtime (CLR)]
  CLR Virtual Machine Engine
    ├── JIT Compiler (Just-In-Time) → Native Machine Instructions (010101...)
    ├── Automatic Garbage Collector (GC)
    ├── Type Safety &amp; Security Verification
    └── Exception Handling &amp; Thread Management</div>

  <div class="concept-box">
    <h4>What is Managed Code?</h4>
    <p>Code written in C# is called <strong>Managed Code</strong> because its execution is governed by the CLR. The CLR automatically handles memory allocation, garbage collection, type safety, exception handling, and security boundaries. In contrast, <strong>Unmanaged Code</strong> (like standard C/C++) compiles directly to CPU machine instructions and requires manual memory allocation.</p>
  </div>
</div>

<div class="section-title"><span class="num">6</span>Learning Prerequisites</div>
<div class="section-body">
  <p class="text-prose">No prior programming experience is required to start this C# Masterclass! If you understand basic computer operation and logical thinking, you are ready. For developers coming from C, C++, Java, JavaScript, or Python, you will pick up C# syntax rapidly due to its clean C-family syntax structure.</p>
</div>

<div class="section-title"><span class="num">7</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the difference between .NET Framework, .NET Core, and .NET 8?</h4>
    <p>.NET Framework (1.0–4.8) was the legacy Windows-only platform. .NET Core (1.0–3.1) was rebuilt from scratch as open-source and cross-platform. Starting with .NET 5 (and now .NET 8), Microsoft unified everything into a single platform named <strong>.NET</strong>.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What is CIL / MSIL?</h4>
    <p>Common Intermediate Language (CIL), formerly Microsoft Intermediate Language (MSIL), is the CPU-independent CPU-neutral bytecode generated by the C# compiler. The CLR's Just-In-Time (JIT) compiler translates CIL into native machine code at runtime.</p>
  </div>
  <div class="faq-card">
    <h4>Q3: Is C# fast enough for high-performance systems and 3D gaming?</h4>
    <p>Yes! Modern .NET includes high-performance primitives like <code>Span&lt;T&gt;</code>, <code>Memory&lt;T&gt;</code>, hardware intrinsics, and Native AOT (Ahead-of-Time compilation) that deliver speed comparable to C++ while preserving type and memory safety.</p>
  </div>
  <div class="faq-card">
    <h4>Q4: What is Roslyn?</h4>
    <p>Roslyn is the open-source C# compiler platform that provides rich code analysis APIs used by Visual Studio and VS Code for real-time autocomplete, refactoring, and static code analysis.</p>
  </div>
  <div class="faq-card">
    <h4>Q5: Can I build web apps with C# without writing JavaScript?</h4>
    <p>Yes! With <strong>ASP.NET Core Blazor</strong>, you write full-stack interactive web applications using C# running directly in the browser via WebAssembly (Wasm).</p>
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
  '2. .NET SDK Setup, VS Code, CLI & Structure'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 2: C# Setup & Tooling
// ═══════════════════════════════════════════════════════════════════════════════
const c2 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 1 (Chapter 2): .NET SDK Setup, IDEs, .NET CLI &amp; Project Structure Masterclass</strong>! To compile and run C# applications, you need the <strong>.NET SDK</strong> (Software Development Kit). In this lesson, we explore the difference between the SDK and Runtime, setup Visual Studio 2022 and VS Code with C# Dev Kit, master command-line development using the <code>dotnet</code> CLI, dissect .NET project files (<code>.csproj</code>), and resolve common environment setup errors.</p>
</div>

<div class="section-title"><span class="num">1</span>.NET SDK vs .NET Runtime</div>
<div class="section-body">
  <p class="text-prose">Before installing tools, it is vital to understand the difference between the .NET SDK and the .NET Runtime:</p>

  <table class="tbl spec-table">
    <thead><tr><th>Component</th><th>What it Includes</th><th>Target Audience</th><th>Primary Use Case</th></tr></thead>
    <tbody>
      <tr><td><strong>.NET Runtime</strong></td><td>CLR Execution Engine + Core Class Libraries</td><td>End users &amp; Production servers</td><td>Executing already compiled .NET applications (.dll / .exe)</td></tr>
      <tr><td><strong>.NET SDK</strong></td><td>.NET Runtime + C# Compiler (csc) + MSBuild + dotnet CLI + Project Templates</td><td>Software Developers</td><td>Creating, editing, building, debugging, and publishing C# projects</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>IDE Options — Visual Studio vs VS Code vs Online Compiler</div>
<div class="section-body">
  <p class="text-prose">You can write C# in a variety of environments depending on your Operating System and project scope:</p>

  <div class="concept-box">
    <h4>Development Environments Compared:</h4>
    <p>• <strong>Visual Studio Code (Cross-Platform):</strong> Lightweight, fast code editor. Install the official <code>C# Dev Kit</code> extension pack from Microsoft for full Roslyn IntelliSense, project solution explorer, and debugging.</p>
    <p>• <strong>Visual Studio 2022 (Windows / macOS):</strong> Enterprise-grade IDE featuring GUI layout designers, memory profilers, remote debugging, and database tools.</p>
    <p>• <strong>Online C# Compiler:</strong> Run C# code snippets instantly in your web browser without installing anything on <a href="/online-csharp-compiler.html">mana-compiler C# IDE</a>.</p>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Creating &amp; Running Projects via .NET CLI</div>
<div class="section-body">
  <p class="text-prose">The <code>dotnet</code> command-line interface (CLI) is the universal tool for creating, restoring, building, and running .NET projects across Windows, Linux, and macOS.</p>

  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Terminal Commands — .NET CLI Workflow</span></div>
<pre><code># 1. Create a new C# Console application project named HelloCSharp
dotnet new console -n HelloCSharp

# 2. Navigate into the project folder
cd HelloCSharp

# 3. Build and Run the project immediately
dotnet run

# 4. Compile/Build project without executing
dotnet build

# 5. Clean build output directories (bin/ and obj/)
dotnet clean

# 6. Publish optimized production release binaries
dotnet publish -c Release</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Project Folder Structure &amp; .csproj Anatomy</div>
<div class="section-body">
  <p class="text-prose">When you create a console application, the .NET CLI generates a clean project layout:</p>

  <div class="diagram-box">HelloCSharp/
├── HelloCSharp.csproj      ← MSBuild XML project configuration file
├── Program.cs              ← Primary C# source code entry file
├── bin/                    ← Binary output folder (compiled DLLs &amp; EXEs)
│   └── Debug/
│       └── net8.0/
│           ├── HelloCSharp.exe
│           └── HelloCSharp.pdb (Debug symbols)
└── obj/                    ← Intermediate build state &amp; NuGet assets</div>

  <p class="text-prose">The <strong>.csproj</strong> file contains project metadata and settings written in XML:</p>

  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">XML — HelloCSharp.csproj Configuration</span></div>
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
    <thead><tr><th>XML Element</th><th>Explanation &amp; Function</th></tr></thead>
    <tbody>
      <tr><td><code>Sdk="Microsoft.NET.Sdk"</code></td><td>Imports standard .NET build rules and Roslyn compilation targets.</td></tr>
      <tr><td><code>&lt;OutputType&gt;Exe&lt;/OutputType&gt;</code></td><td>Specifies that compilation produces an executable application (vs Class Library .dll).</td></tr>
      <tr><td><code>&lt;TargetFramework&gt;net8.0&lt;/TargetFramework&gt;</code></td><td>Targets the .NET 8.0 runtime environment.</td></tr>
      <tr><td><code>&lt;ImplicitUsings&gt;enable&lt;/ImplicitUsings&gt;</code></td><td>Automatically includes standard namespaces like System, System.Linq, System.IO across all files.</td></tr>
      <tr><td><code>&lt;Nullable&gt;enable&lt;/Nullable&gt;</code></td><td>Enables C# Nullable Reference Types compiler checks to eliminate null reference exceptions.</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">5</span>Common Setup Errors &amp; Troubleshooting</div>
<div class="section-body">
  <div class="callout">
    <div class="callout-title">⚠️ Common Issue 1: 'dotnet' is not recognized as an internal command</div>
    <p>This error occurs when the .NET SDK is not installed or its installation directory is missing from your system PATH environment variable. Download the latest SDK installer from dotnet.microsoft.com and restart your terminal session.</p>
  </div>

  <div class="callout">
    <div class="callout-title">⚠️ Common Issue 2: TargetFramework 'net8.0' was not found</div>
    <p>This happens if your project targets .NET 8.0, but your machine only has an older SDK installed (e.g., .NET 6 or 7). Run <code>dotnet --version</code> to verify your installed SDK, and update it accordingly.</p>
  </div>
</div>

<div class="section-title"><span class="num">6</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: How do I view all installed .NET SDKs and runtimes on my computer?</h4>
    <p>Run <code>dotnet --list-sdks</code> to list SDKs, and <code>dotnet --list-runtimes</code> to list installed runtimes.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What is NuGet?</h4>
    <p>NuGet is the official .NET package manager. You can add open-source libraries to your project using <code>dotnet add package PackageName</code>.</p>
  </div>
  <div class="faq-card">
    <h4>Q3: What is a .sln Solution file?</h4>
    <p>A Solution file (<code>.sln</code>) is a container that groups multiple related <code>.csproj</code> projects (e.g., Web API + Data Access Library + Unit Tests) in a single workspace.</p>
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
  '1. Introduction, Features & .NET Architecture',
  '03-csharp-first-program-program-cs-main-console.html',
  '3. First C# Program, Main() & Console I/O'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 3: First C# Program
// ═══════════════════════════════════════════════════════════════════════════════
const c3 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 1 (Chapter 3): First C# Program, Program.cs, Top-Level Statements &amp; Console I/O Masterclass</strong>! Writing your first program is an essential rite of passage. In this lesson, we dissect C# program anatomy line-by-line, compare classic C# boilerplate with C# 9+ Top-Level Statements, master console output using <code>Console.WriteLine()</code> and <code>Console.Write()</code>, and explore string interpolation and comments.</p>
</div>

<div class="section-title"><span class="num">1</span>Classic Program Structure vs Top-Level Statements</div>
<div class="section-body">
  <p class="text-prose">In traditional C# (versions 1.0 through 8.0), every program required explicit <code>using</code> directives, a <code>namespace</code> declaration, a <code>class</code>, and a static <code>Main()</code> entry method. Modern C# 9+ introduced <strong>Top-Level Statements</strong>, allowing you to write executable statements directly in <code>Program.cs</code>.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Classic Structure (C# 1.0 – 8.0)</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
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
    <div class="code-block-header">
      <span class="lang-tag">C# — Modern Top-Level Statements (C# 9.0+)</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Top-Level Statement — Roslyn compiler auto-generates Program class and Main() method!
Console.WriteLine("Hello, C# 12!");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Line-by-Line Anatomy Breakdown</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Program.cs Detailed Breakdown</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>using System; // 1. using directive: imports System namespace containing Console class

namespace MyFirstApp // 2. namespace: logical container organizing classes and preventing collisions
{
    class Program // 3. class: reference type blueprint containing fields and methods
    {
        // 4. Main method: mandatory entry point invoked by CLR runtime on startup
        static void Main(string[] args)
        {
            // 5. Console.WriteLine(): writes specified string to console and appends newline
            Console.WriteLine("Hello, C#!");

            // 6. Semicolon (;): mandatory statement terminator in C#
        }
    }
}</code></pre>
  </div>

  <div class="card" style="background:var(--bg2); padding:18px; border-radius:8px; margin-top:16px;">
    <strong style="color:#a78bfa;">🔍 Detailed Element Breakdown:</strong>
    <ul style="margin:10px 0 0 20px; line-height:1.8; color:var(--text2);">
      <li><code>using System;</code>: Tells the compiler to look in the <code>System</code> namespace for types like <code>Console</code> and <code>Math</code> without requiring fully qualified names (like <code>System.Console.WriteLine</code>).</li>
      <li><code>namespace</code>: Declares a logical scope to organize code cleanly and avoid name clashes across libraries.</li>
      <li><code>class Program</code>: C# is strictly object-oriented — all code must exist inside a class or struct.</li>
      <li><code>static void Main(string[] args)</code>: The entry point method called by the CLR. <code>static</code> means it runs without instantiating the class; <code>void</code> means it returns no value; <code>string[] args</code> receives command-line parameters.</li>
      <li><code>Console.WriteLine()</code>: Invokes the <code>WriteLine</code> method of the built-in <code>Console</code> class.</li>
      <li><code>;</code> (Semicolon): Every statement in C# must end with a semicolon.</li>
    </ul>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Console.WriteLine() vs Console.Write() &amp; String Interpolation</div>
<div class="section-body">
  <p class="text-prose">C# provides two primary console output methods:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Write vs WriteLine &amp; Interpolation</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Console.Write() outputs text WITHOUT appending a newline character
Console.Write("Welcome ");
Console.Write("to ");
Console.Write("C#!\n"); // Output: Welcome to C#!

// Console.WriteLine() outputs text AND automatically appends a newline (\n)
Console.WriteLine("Line 1");
Console.WriteLine("Line 2");

// String Interpolation ($) — Modern, clean way to format variables inside strings
string studentName = "Ravi";
int score = 95;
Console.WriteLine($"Student Name: {studentName}, Score: {score}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Comments in C#</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Comment Styles</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// 1. Single-line comment — ignored by compiler

/* 2. Multi-line comment
      spans across multiple lines */

/// &lt;summary&gt;
/// 3. XML Documentation Comment — generates IntelliSense tooltips
/// Calculates total price after tax.
/// &lt;/summary&gt;
static double CalculateTax(double price)
{
    return price * 1.18;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Can I have multiple Top-Level Statements in a project?</h4>
    <p>No. Only ONE file in a project can use Top-Level Statements (usually <code>Program.cs</code>). Other files must declare classes explicitly.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: Is C# case-sensitive?</h4>
    <p>Yes! C# is strictly case-sensitive. <code>Console.WriteLine</code>, <code>console.writeline</code>, and <code>CONSOLE.WRITELINE</code> are completely different identifiers, and only the exact capitalized version compiles.</p>
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
  '2. .NET SDK Setup, VS Code, CLI & Structure',
  '04-csharp-variables-constants-scope-and-var.html',
  '4. Variables, Constants (const/readonly), var & Scope'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 4: Variables & Constants
// ═══════════════════════════════════════════════════════════════════════════════
const c4 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 2 (Chapter 4): C# Variables, Constants, Scope &amp; Type Inference Masterclass</strong>! A variable is a named memory location used to store data during execution. In this chapter, we master variable declaration, initialization, assignment, reassignment, variable naming rules (camelCase vs PascalCase), <code>const</code> vs <code>readonly</code> constants, implicit typing with <code>var</code>, dynamic typing with <code>dynamic</code>, and scope levels.</p>
</div>

<div class="section-title"><span class="num">1</span>Variable Declaration, Initialization &amp; Naming Rules</div>
<div class="section-body">
  <p class="text-prose">In C#, every variable must have a declared data type before it can be used. Accessing an unassigned local variable results in a compile error.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Variable Operations</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// 1. Declaration (datatype variableName;)
string name;

// 2. Initialization (assigning initial value)
name = "Ravi";

// 3. Declaration &amp; Initialization combined
int age = 21;
double price = 99.99;
bool isStudent = true;

// 4. Reassignment (updating value)
age = 22;

Console.WriteLine($"Name: {name}, Age: {age}, Price: {price:C}, IsStudent: {isStudent}");</code></pre>
  </div>

  <div class="concept-box">
    <h4>C# Naming Conventions &amp; Rules:</h4>
    <p>• <strong>camelCase:</strong> Use camelCase for local variables and method parameters (e.g., <code>userAge</code>, <code>totalPrice</code>).</p>
    <p>• <strong>PascalCase:</strong> Use PascalCase for Classes, Structs, Methods, Properties, and Enums (e.g., <code>StudentName</code>, <code>CalculateTax</code>).</p>
    <p>• <strong>Allowed Characters:</strong> Letters, digits, and underscores. Must start with a letter or underscore.</p>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Constants — const vs readonly</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Feature</th><th>const</th><th>readonly</th></tr></thead>
    <tbody>
      <tr><td>Evaluation Time</td><td><strong>Compile-Time constant</strong></td><td><strong>Runtime constant</strong></td></tr>
      <tr><td>Initialization</td><td>MUST be initialized at declaration</td><td>Can be initialized at declaration OR inside a Constructor</td></tr>
      <tr><td>Static Behavior</td><td>Implicitly <code>static</code></td><td>Can be instance-level (different per object)</td></tr>
      <tr><td>Allowed Types</td><td>Primitive types, enums, strings only</td><td>Any data type (including complex classes &amp; arrays)</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — const vs readonly</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>class BankAccount
{
    public const double INTEREST_RATE = 0.05; // Compile-time constant
    public readonly string AccountNumber;    // Runtime constant

    public BankAccount(string accNum)
    {
        AccountNumber = accNum; // Set at runtime in constructor!
    }
}

BankAccount acc = new BankAccount("ACC-98765");
Console.WriteLine($"Rate: {BankAccount.INTEREST_RATE}, Account: {acc.AccountNumber}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>var vs dynamic</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — var vs dynamic</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// 1. var: Implicitly Typed Local Variable (STRICTLY TYPE-SAFE at compile time!)
var city = "Hyderabad"; // Compiler infers type: string
var count = 100;         // Compiler infers type: int
// city = 50;            // COMPILE ERROR! Cannot convert int to string.

// 2. dynamic: Bypasses compile-time type checking (evaluated at RUNTIME)
dynamic data = "Hello";
Console.WriteLine($"Length: {data.Length}"); // 5
data = 42; // Allowed! Type changes to int at runtime</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Does using 'var' make C# dynamic or slow?</h4>
    <p>No! <code>var</code> is 100% strongly typed and has ZERO performance penalty. The Roslyn compiler replaces <code>var</code> with the exact type at compile time.</p>
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
  '3. First C# Program, Main() & Console I/O',
  '05-csharp-data-types-value-vs-reference.html',
  '5. Value vs Reference Types, Nullables & Structs'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 5: Data Types
// ═══════════════════════════════════════════════════════════════════════════════
const c5 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 2 (Chapter 5): C# Data Types, Value vs Reference Types, Nullables &amp; Structs Masterclass</strong>! Data types inform the compiler how much memory to allocate and what operations are valid. C# divides all data types into two fundamental categories: <strong>Value Types</strong> (stored directly on the Stack) and <strong>Reference Types</strong> (stored on the Heap).</p>
</div>

<div class="section-title"><span class="num">1</span>Value Types vs Reference Types — Stack vs Heap Memory</div>
<div class="section-body">
  <div class="memory-diagram">Stack vs Heap Memory Model in C#:

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
      <tr><td>Storage Location</td><td>Stored directly on the <strong>Stack</strong></td><td>Reference pointer on Stack, actual object on <strong>Heap</strong></td></tr>
      <tr><td>Assignment Behavior</td><td>Copies the <strong>actual value</strong></td><td>Copies the <strong>reference / memory pointer</strong></td></tr>
      <tr><td>Default Value</td><td>Zero / False / Empty struct</td><td><code>null</code></td></tr>
      <tr><td>Nullability</td><td>Cannot be null by default (use <code>T?</code>)</td><td>Can be <code>null</code></td></tr>
      <tr><td>Examples</td><td><code>int</code>, <code>long</code>, <code>float</code>, <code>double</code>, <code>decimal</code>, <code>char</code>, <code>bool</code>, <code>struct</code>, <code>enum</code></td><td><code>string</code>, <code>object</code>, <code>class</code>, <code>array</code>, <code>delegate</code>, <code>interface</code></td></tr>
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
      <tr><td><code>long</code></td><td>System.Int64</td><td>8 bytes (64 bits)</td><td>-9.2×10¹⁸ to 9.2×10¹⁸</td><td><code>L</code></td></tr>
      <tr><td><code>float</code></td><td>System.Single</td><td>4 bytes (32 bits)</td><td>7 digits precision</td><td><code>f</code></td></tr>
      <tr><td><code>double</code></td><td>System.Double</td><td>8 bytes (64 bits)</td><td>15-17 digits precision</td><td><code>d</code></td></tr>
      <tr><td><code>decimal</code></td><td>System.Decimal</td><td>16 bytes (128 bits)</td><td>28-29 digits precision (Exact for Money)</td><td><code>m</code></td></tr>
      <tr><td><code>char</code></td><td>System.Char</td><td>2 bytes (16 bits)</td><td>Single UTF-16 Unicode character</td><td><code>' '</code></td></tr>
      <tr><td><code>bool</code></td><td>System.Boolean</td><td>1 byte</td><td><code>true</code> or <code>false</code></td><td>–</td></tr>
      <tr><td><code>string</code></td><td>System.String</td><td>Reference</td><td>Unicode text sequence</td><td><code>" "</code></td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Primitive Types Code Example</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>int count = 10;
long population = 8000000000L;
float temp = 36.6f;
double distance = 149597870.7;
decimal salary = 45000.50m; // Use decimal for money &amp; finance!
char grade = 'A';
bool isActive = true;
string course = "C# Masterclass";

Console.WriteLine($"Count: {count}, Salary: {salary:C}, Course: {course}");
Console.WriteLine($"sizeof(int): {sizeof(int)} bytes, sizeof(double): {sizeof(double)} bytes");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>DateTime, Guid &amp; Nullable Types (T?)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — DateTime, Guid, Nullable Types</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// 1. DateTime
DateTime now = DateTime.Now;
Console.WriteLine($"Current Time: {now:yyyy-MM-dd HH:mm:ss}");

// 2. Guid (Globally Unique Identifier)
Guid id = Guid.NewGuid();
Console.WriteLine($"Generated GUID: {id}");

// 3. Nullable Types (T?)
int? optionalAge = null;
int finalAge = optionalAge ?? 18; // Null-coalescing fallback
Console.WriteLine($"Final Age: {finalAge}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why should I use decimal instead of double for financial calculations?</h4>
    <p><code>double</code> and <code>float</code> use base-2 binary floating-point representation, causing tiny rounding errors (e.g., 0.1 + 0.2 = 0.30000000000000004). <code>decimal</code> uses base-10 representation with 28-29 digits of exact precision, preventing monetary rounding bugs.</p>
  </div>
</div>`;

makeLesson(
  5,
  '05-csharp-data-types-value-vs-reference.html',
  'Value vs Reference Types, Nullables & Structs Masterclass',
  'Exhaustive textbook-grade C# Data Types (Chapter 5): Value types vs Reference types memory model (Stack vs Heap), int/long/float/double/decimal/byte/short comparison, char, bool, string, object, DateTime, Guid, Nullable types (T?), sizeof, and default values.',
  'Phase 2',
  'Data Types',
  'Value vs Reference Types · Stack vs Heap · Primitive Data Types · float vs double vs decimal · DateTime · Guid · Nullable Types (T?) · Null-Coalescing (??) · sizeof · Default Values',
  c5,
  '04-csharp-variables-constants-scope-and-var.html',
  '4. Variables, Constants (const/readonly), var & Scope',
  '06-csharp-type-conversion-casting-parse-tryparse.html',
  '6. Type Conversion, Parse(), TryParse() & Boxing'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 6: Type Conversion
// ═══════════════════════════════════════════════════════════════════════════════
const c6 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 2 (Chapter 6): C# Type Conversion, Casting, Parse(), TryParse() &amp; Boxing/Unboxing Masterclass</strong>! Type conversion converts a value from one data type to another. C# provides <strong>Implicit conversion</strong> (automatic safe widening), <strong>Explicit casting</strong> (manual narrowing), <strong>Convert class helper methods</strong>, <strong>int.Parse()</strong>, and the fail-safe <strong>int.TryParse()</strong> pattern.</p>
</div>

<div class="section-title"><span class="num">1</span>Implicit Conversion vs Explicit Casting</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Conversion &amp; Casting</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// 1. Implicit Conversion (Automatic — small type to larger type, no data loss)
int numInt = 100;
long numLong = numInt;    // int -&gt; long (safe)
double numDouble = numLong; // long -&gt; double (safe)
Console.WriteLine($"Implicit Double: {numDouble}");

// 2. Explicit Casting (Manual — larger type to smaller type, potential truncation!)
double pi = 3.14159;
int truncatedPi = (int)pi; // Cast double to int: truncates fractional part
Console.WriteLine($"Explicit Cast Int: {truncatedPi}"); // Output: 3</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Convert Class vs Parse() vs TryParse()</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Method</th><th>Null Input Behavior</th><th>Invalid Format Behavior</th><th>Best Used For</th></tr></thead>
    <tbody>
      <tr><td><code>Convert.ToInt32(str)</code></td><td>Returns <code>0</code> (does not throw)</td><td>Throws <code>FormatException</code></td><td>When null inputs should safely evaluate to 0</td></tr>
      <tr><td><code>int.Parse(str)</code></td><td>Throws <code>ArgumentNullException</code></td><td>Throws <code>FormatException</code></td><td>When string is guaranteed to be a valid number</td></tr>
      <tr><td><code>int.TryParse(str, out int val)</code></td><td>Returns <code>false</code> (NO EXCEPTION THROWN!)</td><td>Returns <code>false</code> (NO EXCEPTION THROWN!)</td><td><strong>Best Practice:</strong> User input validation from Console or APIs</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Fail-Safe TryParse Pattern</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>string input = "25";

// TryParse safely attempts conversion without throwing exceptions
if (int.TryParse(input, out int age))
{
    Console.WriteLine($"Conversion Successful! Age: {age}");
}
else
{
    Console.WriteLine("Invalid age input. Please enter a valid number.");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Boxing and Unboxing</div>
<div class="section-body">
  <p class="text-prose"><strong>Boxing</strong> is converting a Value Type (like <code>int</code>) to a Reference Type (<code>object</code>), allocating memory on the Heap. <strong>Unboxing</strong> is extracting the Value Type back from the Reference Type object.</p>

  <div class="memory-diagram">Boxing &amp; Unboxing Memory Pipeline:

  int val = 42;           ──[ BOXING ]──►   Heap Object: [ System.Int32 : 42 ]
  (Stack Value)                             (Allocated on Heap)
                                                     │
  int y = (int)obj;       ◄─[ UNBOXING ]─────────────┘
  (Copied back to Stack)</div>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Boxing &amp; Unboxing</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>int val = 123; // Value type on Stack

// 1. Boxing: Value Type -&gt; Reference Type (object)
object boxedObj = val; // Allocates memory on Heap!

// 2. Unboxing: Reference Type -&gt; Value Type (explicit cast required)
int unboxedVal = (int)boxedObj; // Extracted back to Stack

Console.WriteLine($"Boxed: {boxedObj}, Unboxed: {unboxedVal}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why is TryParse() preferred over Parse() in production code?</h4>
    <p><code>Parse()</code> throws heavy exceptions on invalid input, which damages performance and causes application crashes if uncaught. <code>TryParse()</code> returns a boolean flag safely without throwing exceptions.</p>
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
  '5. Value vs Reference Types, Nullables & Structs',
  '07-csharp-operators-complete-guide.html',
  '7. All Operators (Bitwise, Nullable, is/as, Precedence)'
);

console.log('\n🎉 ALL C# PHASES 1 & 2 (CHAPTERS 1–6) GENERATED SUCCESSFULLY!');
