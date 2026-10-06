import fs from 'fs';
import path from 'path';

const publicDir = 'c:/Users/Balaji/Downloads/mana-compiler-v3 (1)/public';

function getHeader(title, description, canonical) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="author" content="Our Compiler — Balanju Solutions" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="canonical" href="${canonical}" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="https://www.ourcompiler.com/logo.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="apple-touch-icon" href="/logo.png" />
  <link rel="stylesheet" href="/pages.css" />

  <script src="/pages-common.js"></script>
  <script src="/site-nav.js" defer></script>
  <script src="/site-footer.js" defer></script>
</head>
<body>
  <main class="page-content">`;
}

function getFooter() {
  return `  </main>
  <footer class="footer" id="site-footer"></footer>
</body>
</html>`;
}

// 1. How Our Compiler Works
const howItWorksHtml = `${getHeader(
  'How Our Compiler Works — Architecture & Execution Engine',
  'Discover the technical architecture behind Our Compiler. Learn how code goes from Monaco editor to sandboxed Docker containers and returns execution results in under 2 seconds.',
  'https://www.ourcompiler.com/how-our-compiler-works.html'
)}
    <div class="breadcrumb">
      <a href="/">Home</a> <span>/</span> <span style="color: var(--text);">How Our Compiler Works</span>
    </div>

    <section class="hero-section">
      <span class="page-hero-badge">⚙️ TECHNICAL ARCHITECTURE &amp; ENGINE</span>
      <h1>How Our Compiler Works</h1>
      <p class="subtitle">Understand the inner workings of Our Compiler. From client-side Monaco Editor interactions to cloud container sandboxing and sub-2-second execution output delivery.</p>
    </section>

    <!-- ARCHITECTURE FLOWCHART / CARDS -->
    <section class="full-card">
      <h2><span>🔄</span> Code Execution Flowchart</h2>
      <p style="color: var(--text2); line-height: 1.7; margin-bottom: 24px;">When you click <strong>Run Code</strong> in Our Compiler, your source program passes through five distinct technical layers to ensure fast, isolated, and safe execution:</p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
        <div style="background: var(--bg2); border: 1px solid var(--border); padding: 20px; border-radius: 12px;">
          <div style="color: var(--blue); font-weight: 800; font-size: 14px; font-family: var(--mono); margin-bottom: 6px;">STEP 1: FRONTEND CAPTURE</div>
          <h3 style="font-size: 17px; margin-bottom: 8px;">Monaco Editor</h3>
          <p style="color: var(--text2); font-size: 14px; line-height: 1.6;">The editor captures source code, language configuration, active tab state, and interactive custom inputs (stdin).</p>
        </div>

        <div style="background: var(--bg2); border: 1px solid var(--border); padding: 20px; border-radius: 12px;">
          <div style="color: var(--blue); font-weight: 800; font-size: 14px; font-family: var(--mono); margin-bottom: 6px;">STEP 2: ENCRYPTED DISPATCH</div>
          <h3 style="font-size: 17px; margin-bottom: 8px;">TLS 1.3 Payload</h3>
          <p style="color: var(--text2); font-size: 14px; line-height: 1.6;">The code payload is securely serialized into JSON and sent over an encrypted HTTPS connection to execution API endpoints.</p>
        </div>

        <div style="background: var(--bg2); border: 1px solid var(--border); padding: 20px; border-radius: 12px;">
          <div style="color: var(--blue); font-weight: 800; font-size: 14px; font-family: var(--mono); margin-bottom: 6px;">STEP 3: SANDBOX CONTAINER</div>
          <h3 style="font-size: 17px; margin-bottom: 8px;">Docker Isolation</h3>
          <p style="color: var(--text2); font-size: 14px; line-height: 1.6;">An ephemeral Docker container initializes with strict resource constraints (512MB RAM, 10s CPU limit, no root access).</p>
        </div>

        <div style="background: var(--bg2); border: 1px solid var(--border); padding: 20px; border-radius: 12px;">
          <div style="color: var(--blue); font-weight: 800; font-size: 14px; font-family: var(--mono); margin-bottom: 6px;">STEP 4: COMPILATION &amp; EXECUTION</div>
          <h3 style="font-size: 17px; margin-bottom: 8px;">Native Toolchain</h3>
          <p style="color: var(--text2); font-size: 14px; line-height: 1.6;">The runtime toolchain (e.g. GCC 11, JDK 17, Python 3.10) compiles and executes the program against stdin buffers.</p>
        </div>

        <div style="background: var(--bg2); border: 1px solid var(--border); padding: 20px; border-radius: 12px;">
          <div style="color: var(--blue); font-weight: 800; font-size: 14px; font-family: var(--mono); margin-bottom: 6px;">STEP 5: STREAMED OUTPUT</div>
          <h3 style="font-size: 17px; margin-bottom: 8px;">Console Display</h3>
          <p style="color: var(--text2); font-size: 14px; line-height: 1.6;">Standard output (stdout), compilation errors (stderr), and execution status (exit code 0/1) are returned to the user console.</p>
        </div>
      </div>
    </section>

    <!-- DETAILED DEEP DIVE SECTIONS -->
    <div class="grid-section">
      <div class="card">
        <h2><span>🛡️</span> Container Security &amp; Isolation</h2>
        <p>Security is the highest priority when building a public online compiler. Allowing arbitrary user code execution means preventing malicious system calls, infinite loops, and resource exhaustion. Our Compiler handles security via:</p>
        <ul style="color: var(--text2); line-height: 1.7; margin-left: 20px; font-size: 14px;">
          <li><strong>CPU &amp; Time Limits:</strong> Programs execution is limited to 10 seconds. Infinite loops are terminated automatically.</li>
          <li><strong>Memory Constraints:</strong> Each sandbox container is capped at 512MB RAM.</li>
          <li><strong>Disabled Network Access:</strong> Execution containers operate in offline network modes to prevent unauthorized outbound requests.</li>
          <li><strong>Ephemeral Disk Storage:</strong> Created temporary files are destroyed immediately after execution finishes.</li>
        </ul>
      </div>

      <div class="card">
        <h2><span>⚡</span> High-Performance Latency Optimization</h2>
        <p>To deliver execution times under 2 seconds, Our Compiler utilizes pre-warmed container pools. Instead of spinning up a fresh container on every request, idle container runtimes stand ready to compile code instantly, eliminating cold-start delays.</p>
        <p style="color: var(--text2); font-size: 14px; line-height: 1.65; margin-top: 12px;">Whether you write Python script, C++ template code, or Java object-oriented classes, your output appears almost instantly.</p>
      </div>
    </div>

    <!-- CALL TO ACTION -->
    <section class="page-cta-banner">
      <h2>Test the Engine Yourself</h2>
      <p>Select any language and experience sub-2-second execution in your browser today.</p>
      <a href="/online-python-compiler.html" class="page-cta-btn">▶ Open Python Compiler</a>
    </section>
${getFooter()}`;

// 2. Code Privacy and Storage
const privacyStorageHtml = `${getHeader(
  'Code Privacy & Data Handling — Our Compiler Transparency Guide',
  'Read Our Compiler code privacy and data handling guide. Learn how LocalStorage code persistence works and why server-side code execution is ephemeral and memory-only.',
  'https://www.ourcompiler.com/code-privacy-and-storage.html'
)}
    <div class="breadcrumb">
      <a href="/">Home</a> <span>/</span> <span style="color: var(--text);">Code Privacy &amp; Storage</span>
    </div>

    <section class="hero-section">
      <span class="page-hero-badge">🔒 DATA PRIVACY &amp; SECURITY GUARANTEE</span>
      <h1>Code Privacy &amp; Storage Policy</h1>
      <p class="subtitle">Complete transparency on how Our Compiler handles your source code, local persistence, shared code snippets, and execution security.</p>
    </section>

    <!-- CORE PRIVACY PRINCIPLES -->
    <div class="pillar-grid">
      <div class="pillar-card">
        <h3><span>💾</span> Local Browser Persistence</h3>
        <p>Your draft code is stored exclusively in your browser's <code>LocalStorage</code>. It never leaves your computer unless you explicitly click <strong>Run Code</strong> or generate a <strong>Share PIN</strong>. Refreshing the browser preserves your work locally.</p>
      </div>
      <div class="pillar-card">
        <h3><span>🗑️</span> Ephemeral Server Execution</h3>
        <p>When you click <strong>Run Code</strong>, your source code is sent to an isolated container for execution. Once the stdout/stderr output is sent back to your screen, the container and code payload are destroyed permanently from RAM.</p>
      </div>
      <div class="pillar-card">
        <h3><span>🔗</span> Controlled PIN Code Sharing</h3>
        <p>When you click <strong>Share Code</strong>, a unique PIN payload is generated so you can pass snippets to peers. Shared code is read-only for recipients and does not modify your original working draft.</p>
      </div>
    </div>

    <!-- DETAILED PRIVACY MATRIX TABLE -->
    <section class="full-card">
      <h2>📊 Summary Matrix of Code Handling</h2>
      <div style="overflow-x: auto; margin-top: 16px;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14.5px;">
          <thead>
            <tr style="border-bottom: 2px solid var(--border); color: var(--text);">
              <th style="padding: 12px;">Workflow</th>
              <th style="padding: 12px;">Storage Location</th>
              <th style="padding: 12px;">Retention Period</th>
              <th style="padding: 12px;">Who Can Access?</th>
            </tr>
          </thead>
          <tbody style="color: var(--text2);">
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 600; color: var(--text);">Editing &amp; Writing Code</td>
              <td style="padding: 12px;">Browser LocalStorage</td>
              <td style="padding: 12px;">Until browser cache cleared</td>
              <td style="padding: 12px;">You only (Local Device)</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 600; color: var(--text);">Executing Code (Run)</td>
              <td style="padding: 12px;">Sandbox RAM (Ephemeral)</td>
              <td style="padding: 12px;">Sub-seconds (Destroyed post-run)</td>
              <td style="padding: 12px;">Automated execution engine</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 600; color: var(--text);">Generating Share PIN</td>
              <td style="padding: 12px;">Encrypted Snippet Store</td>
              <td style="padding: 12px;">Persistent until expired</td>
              <td style="padding: 12px;">Anyone with PIN or URL</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- FREQUENTLY ASKED QUESTIONS -->
    <section class="full-card" style="margin-top: 32px;">
      <h2>❓ Privacy FAQ</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 16px;">
        <div>
          <h3 style="font-size: 16px; margin-bottom: 6px; color: var(--text);">Do you sell or monetize user code snippets?</h3>
          <p style="color: var(--text2); font-size: 14px; line-height: 1.6;">No. We never inspect, index, sell, or monetize user-submitted code snippets. Our Compiler is built purely for practice and learning.</p>
        </div>
        <div>
          <h3 style="font-size: 16px; margin-bottom: 6px; color: var(--text);">Can I delete my saved local code?</h3>
          <p style="color: var(--text2); font-size: 14px; line-height: 1.6;">Yes. Click <strong>Reset Code</strong> in the editor or clear your browser's LocalStorage to permanently wipe your saved drafts.</p>
        </div>
      </div>
    </section>
${getFooter()}`;

// 3. Supported Languages
const languagesHtml = `${getHeader(
  'Programming Languages Supported by Our Compiler — Version & Feature Matrix',
  'View all 11 programming languages supported by Our Compiler, including compiler/runtime versions (Python 3.10, GCC 11, JDK 17, Node 18, Go 1.20, Rust 1.70, C# .NET 7), capabilities, and direct compiler links.',
  'https://www.ourcompiler.com/supported-languages.html'
)}
    <div class="breadcrumb">
      <a href="/">Home</a> <span>/</span> <span style="color: var(--text);">Supported Languages</span>
    </div>

    <section class="hero-section">
      <span class="page-hero-badge">💻 COMPILER &amp; RUNTIME SPECS</span>
      <h1>Supported Programming Languages</h1>
      <p class="subtitle">Complete technical specification of compiler toolchains, execution versions, and supported capabilities across all 11 language environments on Our Compiler.</p>
    </section>

    <!-- MATRIX TABLE -->
    <section class="full-card">
      <h2>📋 Languages &amp; Runtime Version Matrix</h2>
      <div style="overflow-x: auto; margin-top: 16px;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
          <thead>
            <tr style="border-bottom: 2px solid var(--border); color: var(--text);">
              <th style="padding: 12px;">Language</th>
              <th style="padding: 12px;">Compiler / Runtime</th>
              <th style="padding: 12px;">Version</th>
              <th style="padding: 12px;">Best For</th>
              <th style="padding: 12px;">Action</th>
            </tr>
          </thead>
          <tbody style="color: var(--text2);">
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">🐍 Python</td>
              <td style="padding: 12px;">CPython 3</td>
              <td style="padding: 12px; font-family: var(--mono);">3.10.x</td>
              <td style="padding: 12px;">Beginners, Automation, Data Structures</td>
              <td style="padding: 12px;"><a href="/online-python-compiler.html" class="lang-badge">Open Python</a></td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">☕ Java</td>
              <td style="padding: 12px;">OpenJDK HotSpot</td>
              <td style="padding: 12px; font-family: var(--mono);">JDK 17 LTS</td>
              <td style="padding: 12px;">OOP, College Courses, DSA</td>
              <td style="padding: 12px;"><a href="/online-java-compiler.html" class="lang-badge">Open Java</a></td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">🔵 C</td>
              <td style="padding: 12px;">GCC (GNU Compiler)</td>
              <td style="padding: 12px; font-family: var(--mono);">11.2.0</td>
              <td style="padding: 12px;">Pointers, Memory, Systems Basics</td>
              <td style="padding: 12px;"><a href="/online-c-compiler.html" class="lang-badge">Open C</a></td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">⚡ C++</td>
              <td style="padding: 12px;">G++ (C++17)</td>
              <td style="padding: 12px; font-family: var(--mono);">11.2.0</td>
              <td style="padding: 12px;">Competitive Programming, STL</td>
              <td style="padding: 12px;"><a href="/online-cpp-compiler.html" class="lang-badge">Open C++</a></td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">🟨 JavaScript</td>
              <td style="padding: 12px;">Node.js V8 Engine</td>
              <td style="padding: 12px; font-family: var(--mono);">18.x LTS</td>
              <td style="padding: 12px;">Web Logic, ES6+, Async Scripts</td>
              <td style="padding: 12px;"><a href="/online-javascript-compiler.html" class="lang-badge">Open JS</a></td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">🔷 C#</td>
              <td style="padding: 12px;">.NET Core SDK</td>
              <td style="padding: 12px; font-family: var(--mono);">7.0.x</td>
              <td style="padding: 12px;">C# OOP, LINQ, Enterprise Logic</td>
              <td style="padding: 12px;"><a href="/online-csharp-compiler.html" class="lang-badge">Open C#</a></td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">🐹 Go (Golang)</td>
              <td style="padding: 12px;">Official Go Compiler</td>
              <td style="padding: 12px; font-family: var(--mono);">1.20.x</td>
              <td style="padding: 12px;">Backend, Concurrency, Microservices</td>
              <td style="padding: 12px;"><a href="/online-go-compiler.html" class="lang-badge">Open Go</a></td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">🦀 Rust</td>
              <td style="padding: 12px;">rustc (LLVM)</td>
              <td style="padding: 12px; font-family: var(--mono);">1.70.0</td>
              <td style="padding: 12px;">Memory Safety, Systems Coding</td>
              <td style="padding: 12px;"><a href="/online-rust-compiler.html" class="lang-badge">Open Rust</a></td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">🐘 PHP</td>
              <td style="padding: 12px;">PHP Engine</td>
              <td style="padding: 12px; font-family: var(--mono);">8.1.x</td>
              <td style="padding: 12px;">Web Scripts, Backend Data Parsing</td>
              <td style="padding: 12px;"><a href="/online-php-compiler.html" class="lang-badge">Open PHP</a></td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">💎 Ruby</td>
              <td style="padding: 12px;">MRI Ruby Interpreter</td>
              <td style="padding: 12px; font-family: var(--mono);">3.1.x</td>
              <td style="padding: 12px;">Scripting, Metaprogramming</td>
              <td style="padding: 12px;"><a href="/online-ruby-compiler.html" class="lang-badge">Open Ruby</a></td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">🌐 HTML/CSS/JS</td>
              <td style="padding: 12px;">Browser Renderer</td>
              <td style="padding: 12px; font-family: var(--mono);">HTML5</td>
              <td style="padding: 12px;">Live Web Design &amp; DOM Manipulation</td>
              <td style="padding: 12px;"><a href="/online-html-editor.html" class="lang-badge">Open HTML</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
${getFooter()}`;

// 4. Our Compiler vs Local IDE
const comparisonHtml = `${getHeader(
  'Our Compiler vs Local IDE — When to Use Browser Compilers vs Desktop Editors',
  'An honest comparison between Our Compiler browser-based coding tools and local desktop IDEs like VS Code, IntelliJ IDEA, and CLion.',
  'https://www.ourcompiler.com/our-compiler-vs-local-ide.html'
)}
    <div class="breadcrumb">
      <a href="/">Home</a> <span>/</span> <span style="color: var(--text);">Our Compiler vs Local IDE</span>
    </div>

    <section class="hero-section">
      <span class="page-hero-badge">⚖️ OBJECTIVE PRODUCT COMPARISON</span>
      <h1>Our Compiler vs Local IDE</h1>
      <p class="subtitle">An honest technical comparison to help students and developers choose the right coding environment for their specific task.</p>
    </section>

    <!-- DETAILED COMPARISON TABLE -->
    <section class="full-card">
      <h2>🔍 Feature-by-Feature Comparison</h2>
      <div style="overflow-x: auto; margin-top: 16px;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14.5px;">
          <thead>
            <tr style="border-bottom: 2px solid var(--border); color: var(--text);">
              <th style="padding: 12px;">Feature / Metric</th>
              <th style="padding: 12px; color: var(--blue);">Our Compiler (Browser)</th>
              <th style="padding: 12px;">Local Desktop IDE (VS Code / IntelliJ)</th>
            </tr>
          </thead>
          <tbody style="color: var(--text2);">
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">Installation Setup</td>
              <td style="padding: 12px; color: var(--green);">Zero setup — Open URL &amp; code instantly</td>
              <td style="padding: 12px;">Manual toolchain, PATH config, multi-GB downloads</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">System Resource Usage</td>
              <td style="padding: 12px; color: var(--green);">&lt; 100MB RAM in browser tab</td>
              <td style="padding: 12px;">High RAM (2GB to 8GB+) &amp; background processes</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">Cross-Device Access</td>
              <td style="padding: 12px; color: var(--green);">Works on Chromebooks, Laptops, Mobile</td>
              <td style="padding: 12px;">Requires OS-specific desktop binaries</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">Instant Code Sharing</td>
              <td style="padding: 12px; color: var(--green);">Built-in 1-click share PIN &amp; URL</td>
              <td style="padding: 12px;">Requires Git commit, push, or cloud repos</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">Full Project Debugging</td>
              <td style="padding: 12px;">Console log output &amp; stdin input</td>
              <td style="padding: 12px; color: var(--green);">Breakpoints, variable inspection, step-through</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border);">
              <td style="padding: 12px; font-weight: 700; color: var(--text);">Large Production Apps</td>
              <td style="padding: 12px;">Primary for single-file &amp; multi-file practice</td>
              <td style="padding: 12px; color: var(--green);">Built for commercial multi-module software</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- WHEN TO USE WHAT -->
    <div class="grid-section">
      <div class="card">
        <h2><span>🎯</span> When to Use Our Compiler</h2>
        <ul style="color: var(--text2); line-height: 1.8; margin-left: 20px; font-size: 14px;">
          <li>When practicing Data Structures &amp; Algorithms (DSA) problems.</li>
          <li>When testing code syntax or exploring a new language for the first time.</li>
          <li>When working on low-spec laptops, Chromebooks, or library computers.</li>
          <li>When sharing code snippets with classmates, teachers, or interviewers.</li>
        </ul>
      </div>

      <div class="card">
        <h2><span>💻</span> When to Use a Local Desktop IDE</h2>
        <ul style="color: var(--text2); line-height: 1.8; margin-left: 20px; font-size: 14px;">
          <li>When developing full-stack enterprise applications or mobile apps.</li>
          <li>When requiring offline compilation without internet access.</li>
          <li>When setting up advanced step-over breakpoint debugging.</li>
          <li>When managing Git branches, submodules, and container deployments.</li>
        </ul>
      </div>
    </div>
${getFooter()}`;

fs.writeFileSync(path.join(publicDir, 'how-our-compiler-works.html'), howItWorksHtml, 'utf8');
fs.writeFileSync(path.join(publicDir, 'code-privacy-and-storage.html'), privacyStorageHtml, 'utf8');
fs.writeFileSync(path.join(publicDir, 'supported-languages.html'), languagesHtml, 'utf8');
fs.writeFileSync(path.join(publicDir, 'our-compiler-vs-local-ide.html'), comparisonHtml, 'utf8');

console.log('Successfully generated product feature pages!');
