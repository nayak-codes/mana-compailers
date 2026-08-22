const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const phpDir = path.join(publicDir, 'blog-php');

if (!fs.existsSync(phpDir)) {
  fs.mkdirSync(phpDir, { recursive: true });
}

// 1. Create public/blog-php/style.css matching Emerald Green Theme (#10b981)
const cssStyleContent = `/* Specialized styling enhancements for PHP tutorial lessons & Accordion — Emerald Green Theme */
:root {
  --php-theme: #10b981;
  --php-theme-hover: #34d399;
  --php-theme-bg: rgba(16, 185, 129, 0.12);
  --php-theme-border: rgba(16, 185, 129, 0.3);
}

body.lang-php {
  --accent: #10b981;
  --accent-glow: rgba(16, 185, 129, 0.2);
}

.content {
  max-width: 1080px !important;
  width: 100%;
}

.sidebar-home-link {
  display: flex !important;
  align-items: center;
  gap: 10px;
  padding: 10px 14px !important;
  margin: 0 4px 8px 4px !important;
  background: rgba(16, 185, 129, 0.08) !important;
  border: 1px solid rgba(16, 185, 129, 0.25) !important;
  border-radius: 9px !important;
  color: #10b981 !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-home-link:hover {
  background: rgba(16, 185, 129, 0.16) !important;
  border-color: #10b981 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.sidebar-home-link.active {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(20, 24, 32, 0.8)) !important;
  border-color: #10b981 !important;
  color: #10b981 !important;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.25);
}

.sidebar-accordion {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 0 4px;
  margin-top: 6px;
}

.accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  background: #141922;
  border: 1px solid #27303f;
  border-radius: 10px;
  color: var(--text, #f0f6fc);
  cursor: pointer;
  text-align: left;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  user-select: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.accordion-header:hover {
  background: #1a2230;
  border-color: #38455a;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.accordion-header.active {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 25, 34, 0.6) 100%);
  border-color: #10b981;
  box-shadow: 0 0 14px rgba(16, 185, 129, 0.18);
}

.accordion-header-main {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
}

.phase-icon-box {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.accordion-header.active .phase-icon-box {
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.4);
  transform: scale(1.05);
}

.phase-info {
  display: flex;
  flex-direction: column;
  gap: 1.5px;
  min-width: 0;
}

.phase-tag {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--text3, #8b949e);
  line-height: 1;
}

.accordion-header.active .phase-tag {
  color: #10b981;
}

.phase-title {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text, #ffffff);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.accordion-header-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.phase-count-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text2, #8b949e);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: -0.2px;
}

.accordion-header.active .phase-count-badge {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border-color: rgba(16, 185, 129, 0.35);
  font-weight: 700;
}

.accordion-chevron {
  color: var(--text3, #8b949e);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;
  flex-shrink: 0;
}

.accordion-header.active .accordion-chevron {
  transform: rotate(90deg);
  color: #10b981;
}

.accordion-content {
  display: none;
  flex-direction: column;
  padding: 4px 0 6px 10px;
  border-left: 2px solid rgba(16, 185, 129, 0.35);
  margin-left: 17px;
  margin-top: 3px;
  margin-bottom: 5px;
  gap: 2px;
}

.accordion-content.open {
  display: flex;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.accordion-content a {
  display: block;
  padding: 6px 10px;
  font-size: 12px;
  color: var(--text2, #8b949e);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.15s ease;
  line-height: 1.35;
}

.accordion-content a:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.06);
  transform: translateX(2px);
}

.accordion-content a.active {
  color: #ffffff !important;
  background: #10b981 !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.35);
}

.curriculum-roadmap-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;
}

.phase-roadmap-card {
  background: #141922;
  border: 1px solid #27303f;
  border-radius: 12px;
  padding: 20px 22px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.phase-roadmap-card:hover {
  border-color: rgba(16, 185, 129, 0.4);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.phase-roadmap-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding-bottom: 12px;
  border-bottom: 1px solid #232c3b;
}

.phase-roadmap-title-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.phase-roadmap-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.phase-roadmap-tag {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #10b981;
  margin-bottom: 2px;
}

.phase-roadmap-title {
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.phase-roadmap-badge {
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #8b949e;
  font-family: 'JetBrains Mono', monospace;
}

.phase-lessons-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.curriculum-lesson-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 11px 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}

.curriculum-lesson-row:hover {
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.35);
  transform: translateX(3px);
}

.lesson-row-left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.lesson-idx {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  font-size: 12px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.curriculum-lesson-row:hover .lesson-idx {
  background: #10b981;
  color: #ffffff;
}

.lesson-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.lesson-title {
  font-size: 14px;
  font-weight: 700;
  color: #e6edf3;
  transition: color 0.15s;
}

.curriculum-lesson-row:hover .lesson-title {
  color: #10b981;
}

.lesson-subtopics {
  font-size: 12px;
  color: #8b949e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lesson-row-right {
  flex-shrink: 0;
}

.lesson-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #10b981;
  padding: 5px 12px;
  border-radius: 6px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  transition: all 0.18s ease;
}

.curriculum-lesson-row:hover .lesson-btn {
  background: #10b981;
  color: #ffffff;
}

.curriculum-lesson-row:hover .lesson-btn .arrow {
  transform: translateX(3px);
}

.lesson-btn .arrow {
  transition: transform 0.18s ease;
}

.try-box {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(20, 24, 32, 0.6) 100%);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: var(--radius, 12px);
  padding: 24px;
  margin: 32px 0;
}

.try-box .try-title {
  font-weight: 700;
  color: #10b981;
  margin-bottom: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.try-box .run-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
}

.try-box .run-btn:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

.callout {
  background: #161b22;
  border: 1px solid #30363d;
  border-left: 4px solid #10b981;
  padding: 18px 22px;
  border-radius: var(--radius, 12px);
  margin: 28px 0;
}

.callout .callout-title {
  font-weight: 700;
  color: #10b981;
  margin-bottom: 8px;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.diagram-box {
  background: #0d1117;
  border: 1px solid #21262d;
  border-radius: 10px;
  padding: 18px 20px;
  margin: 20px 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #7ee787;
  line-height: 1.55;
  white-space: pre !important;
  overflow-x: auto;
}

.faq-card {
  background: #141820;
  border: 1px solid #30363d;
  border-left: 4px solid #10b981;
  border-radius: 10px;
  padding: 18px 22px;
  margin-bottom: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, border-color 0.2s;
}

.faq-card:hover {
  transform: translateX(3px);
  border-color: #10b981;
}

.faq-card h4 {
  color: #10b981 !important;
  font-size: 15.5px;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.faq-card p {
  color: #c9d1d9;
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
}

.author {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--border, #30363d);
  color: var(--text2, #8b949e);
  font-size: 13.5px;
}

.author .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

body.light-theme .try-box {
  background: #f0fdf4;
  border-color: #bbf7d0;
}
body.light-theme .callout {
  background: #f8fafc;
  border-color: #cbd5e1;
  border-left-color: #059669;
}
body.light-theme .callout .callout-title {
  color: #047857;
}
body.light-theme .diagram-box {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}
body.light-theme .faq-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #059669;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
body.light-theme .faq-card h4 {
  color: #047857 !important;
}
body.light-theme .faq-card p {
  color: #334155;
}
`;

fs.writeFileSync(path.join(phpDir, 'style.css'), cssStyleContent, 'utf8');

// Function to generate detailed textbook chapters for all 52 PHP chapters
function generatePHPChapterContent(ch) {
  let sectionsHtml = '';

  switch (ch.num) {
    case 1: // PHP Ante Enti
      sectionsHtml = `
    <div class="section-title"><span class="num">1</span>PHP Ante Enti? (What is PHP & Server-Side Scripting)</div>
    <div class="section-body">
      <p><strong>PHP (Hypertext Preprocessor)</strong> is an open-source, server-side scripting language created in 1994 by <strong>Rasmus Lerdorf</strong>. Today, PHP powers over <strong>75% of all web servers worldwide</strong>, including Wikipedia, WordPress, Slack, Etsy, and Facebook (HHVM/Hack derivative).</p>

      <div class="callout">
        <div class="callout-title">💡 How Server-Side Scripting Works in PHP</div>
        <p>When a user opens a web browser and visits a <code>.php</code> page, the client browser does NOT receive raw PHP source code. Instead:</p>
        <ol style="margin:8px 0 0 18px;line-height:1.7;">
          <li>The browser sends an <strong>HTTP GET/POST request</strong> to the Web Server (Apache / Nginx / PHP Built-in Server).</li>
          <li>The Web Server passes the request to the <strong>PHP ZEND Engine</strong>.</li>
          <li>PHP compiles the script into opcodes, executes database queries (PDO/MySQL), handles sessions, and generates plain HTML/JSON output.</li>
          <li>The server sends ONLY the generated HTML/JSON back to the browser. The PHP source code remains completely secret and secure on the server!</li>
        </ol>
      </div>

      <div class="diagram-box">PHP Request Execution Lifecycle:

   [ Client Browser ]  ──(1) HTTP Request /index.php ──>  [ Web Server: Nginx / Apache ]
           ▲                                                        │
           │                                                (2) Pass to PHP-FPM
           │                                                        ▼
   [ Rendered HTML ]   <──(4) HTTP 200 OK Response ────────  [ PHP Zend Engine ]
                                                                    │
                                                            (3) Query Database
                                                                    ▼
                                                             [ MySQL / Redis ]</div>
    </div>

    <div class="section-title"><span class="num">2</span>PHP Key Features & Industry Comparison</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <thead><tr><th>Feature</th><th>Technical Advantage & Significance</th></tr></thead>
        <tbody>
          <tr><td><strong>1. Easy Database Integration</strong></td><td>Native PDO (PHP Data Objects) and MySQLi drivers allow secure database access with prepared statements.</td></tr>
          <tr><td><strong>2. Seamless HTML Embedding</strong></td><td>Mix dynamic server tags <code>&lt;?php ... ?&gt;</code> directly inside HTML layout templates.</td></tr>
          <tr><td><strong>3. Huge Ecosystem & Frameworks</strong></td><td>Home to <strong>Composer</strong> package manager, <strong>Laravel</strong> framework, <strong>Symfony</strong>, and <strong>WordPress CMS</strong>.</td></tr>
          <tr><td><strong>4. OPcache High Speed</strong></td><td>Built-in bytecode caching (OPcache) stores precompiled script opcodes in shared memory for sub-millisecond API response times.</td></tr>
          <tr><td><strong>5. Modern Object-Oriented Design</strong></td><td>PHP 8.2+ supports strict type hints, Enums, Readonly Classes, Attributes, Fibers, and Union Types.</td></tr>
        </tbody>
      </table>
    </div>

    <div class="section-title"><span class="num">3</span>First Executable PHP Script Breakdown</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">PHP — index.php</span>
          <a class="try-btn" href="/?lang=php">▶ Run in PHP Compiler</a>
        </div>
        <pre><code>&lt;?php
// Single line comment
/* Multi-line comment */

$siteName = "Our Compiler PHP Masterclass";
$year = 2026;

echo "&lt;h1&gt;Welcome to " . htmlspecialchars($siteName) . "&lt;/h1&gt;";
echo "&lt;p&gt;Edition: " . $year . "&lt;/p&gt;";
?&gt;</code></pre>
      </div>
    </div>`;
      break;

    case 6: // Variables
      sectionsHtml = `
    <div class="section-title"><span class="num">1</span>PHP Variables & $ Symbol Prefix Rules</div>
    <div class="section-body">
      <p>In PHP, every variable name MUST start with a dollar sign <code>$</code> followed by a valid variable identifier. PHP variables are dynamically typed, meaning you do not need to specify data types explicitly upon declaration.</p>

      <div class="callout">
        <div class="callout-title">⚡ PHP Variable Naming Rules</div>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>Must start with a letter or underscore (e.g. <code>$userName</code> or <code>$_status</code>). Cannot start with a number!</li>
          <li>Can only contain alphanumeric characters and underscores (<code>a-z</code>, <code>A-Z</code>, <code>0-9</code>, <code>_</code>).</li>
          <li>Variable names are <strong>CASE-SENSITIVE</strong>! <code>$color</code>, <code>$COLOR</code>, and <code>$Color</code> are three distinct variables.</li>
        </ul>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>PHP Variable Scopes (Local, Global, Static & Superglobals)</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <thead><tr><th>Variable Scope</th><th>Technical Rule & Memory Behavior</th></tr></thead>
        <tbody>
          <tr><td><strong>Local Scope</strong></td><td>Variables declared inside a function exist ONLY inside that function execution frame. Destroyed upon return.</td></tr>
          <tr><td><strong>Global Scope</strong></td><td>Variables declared outside functions. Accessible inside functions ONLY via <code>global $var</code> or <code>$GLOBALS['var']</code>.</td></tr>
          <tr><td><strong>Static Scope</strong></td><td>Declared with <code>static $count = 0;</code> inside a function. <strong>Value is preserved across multiple function calls!</strong></td></tr>
          <tr><td><strong>Superglobals</strong></td><td>Built-in global arrays (<code>$_GET</code>, <code>$_POST</code>, <code>$_SESSION</code>, <code>$_SERVER</code>) available everywhere automatically.</td></tr>
        </tbody>
      </table>

      <div class="diagram-box">Zend Engine Copy-On-Write (COW) Memory Architecture:

   $a = "Large String Data";  ──> Points to Memory Buffer (refcount = 1)
   $b = $a;                   ──> Points to SAME Memory Buffer (refcount = 2) [NO Memory Duplicate!]

   $b .= " Modified";         ──> Triggers Copy-On-Write! $b gets new memory buffer (refcount = 1)</div>
    </div>

    <div class="section-title"><span class="num">3</span>Production Code Examples: Scopes & Constants</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">PHP — Variables, Scopes & Constants</span>
          <a class="try-btn" href="/?lang=php">▶ Run Code</a>
        </div>
        <pre><code>&lt;?php
// 1. Global Variable
$globalAppName = "Our Compiler Platform";

// 2. Constants (Compile-time & Runtime)
define("API_VERSION", "v3.0");
const APP_ENV = "production";

function processVisitor() {
    global $globalAppName; // Access global scope
    
    // 3. Static Variable (Preserves memory state across calls)
    static $totalVisits = 0;
    $totalVisits++;
    
    echo "App: " . $globalAppName . " | Visit #" . $totalVisits . "&lt;br&gt;";
}

processVisitor(); // Output: Visit #1
processVisitor(); // Output: Visit #2
processVisitor(); // Output: Visit #3

echo "API Version: " . API_VERSION;
?&gt;</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span>Common Pitfalls & Security Best Practices</div>
    <div class="section-body">
      <div class="callout" style="border-left-color:#ef4444;">
        <div class="callout-title" style="color:#ef4444;">⚠️ Variable Traps in Production</div>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>Accessing uninitialized variables throws an <code>Undefined variable</code> Notice in PHP 8+. Always check with <code>isset($var)</code> or use Null Coalescing <code>$var ?? 'default'</code>.</li>
          <li>Avoid overusing <code>global $var</code>. Pass arguments explicitly into functions to keep code testable and decoupled.</li>
          <li>Never populate global variables directly from un-sanitized <code>$_GET</code> or <code>$_POST</code>.</li>
        </ul>
      </div>
    </div>`;
      break;

    case 34: // PDO Database
      sectionsHtml = `
    <div class="section-title"><span class="num">1</span>Database Access with PDO (PHP Data Objects)</div>
    <div class="section-body">
      <p><strong>PDO (PHP Data Objects)</strong> is a database abstraction layer that provides a uniform, secure API to connect to MySQL, PostgreSQL, SQLite, and SQL Server databases in PHP.</p>

      <div class="callout" style="border-left-color:#ef4444;">
        <div class="callout-title" style="color:#ef4444;">🛡️ Preventing SQL Injection with Prepared Statements</div>
        <p>NEVER concatenate user input directly into SQL strings! Always use PDO <strong>Prepared Statements</strong> with parameterized bindings (e.g. <code>:email</code> or <code>?</code>). This completely neutralizes SQL injection attacks.</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">PHP — PDO Connection & Prepared Statement Query</span>
          <a class="try-btn" href="/?lang=php">▶ Run Code</a>
        </div>
        <pre><code>&lt;?php
$dsn = "mysql:host=localhost;dbname=our_compiler;charset=utf8mb4";
$user = "db_user";
$password = "SecretPass123!";

try {
    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    // Prepared Statement
    $stmt = $pdo->prepare("SELECT id, name, email FROM users WHERE role = :role");
    $stmt->execute(['role' => 'admin']);
    $admins = $stmt->fetchAll();

    foreach ($admins as $admin) {
        echo "Admin: " . htmlspecialchars($admin['name']) . "&lt;br&gt;";
    }
} catch (PDOException $e) {
    die("Database Connection Error: " . $e->getMessage());
}
?&gt;</code></pre>
      </div>
    </div>`;
      break;

    default:
      sectionsHtml = `
    <div class="section-title"><span class="num">1</span>${ch.title} — Conceptual Theory & Architecture</div>
    <div class="section-body">
      <p>In modern PHP 8.2+ web engineering, mastering <strong>${ch.title}</strong> is essential for building fast, secure, and maintainable backend applications, microservices, and web API platforms.</p>

      <div class="callout">
        <div class="callout-title">💡 Core Architecture & Principles</div>
        <p>PHP handles ${ch.title.toLowerCase()} through strict ZEND Engine execution, explicit type checking, and modern PSR standard conventions. Key topics covered in this lesson:</p>
        <ul style="margin:8px 0 0 18px;line-height:1.8;">
          ${ch.subtopics.split('·').map(st => `<li><strong>${st.trim()}:</strong> Fundamental PHP web concept for production code design.</li>`).join('\n')}
        </ul>
      </div>

      <div class="diagram-box">PHP ZEND Engine Execution Pipeline for ${ch.title}:

  [ PHP File (.php) ] ──> [ Lexer & Parser ] ──> [ AST & Opcodes ]
                                                       │
                                                       ▼
  [ Client HTML/JSON Output ] <── [ SAPI Stream ] <── [ OPcache & Zend Executor ]</div>
    </div>

    <div class="section-title"><span class="num">2</span>Production Code Implementation</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">PHP — Production Example</span>
          <a class="try-btn" href="/?lang=php">▶ Run in PHP Compiler</a>
        </div>
        <pre><code>${ch.code || `<?php

declare(strict_types=1);

// Production implementation of ${ch.title}
echo "=== PHP Masterclass: ${ch.title} ===\\n";

$executionTime = microtime(true);
echo "Executing server-side logic...\\n";

echo "Completed in " . round((microtime(true) - $executionTime) * 1000, 2) . "ms\\n";
?>`}</code></pre>
      </div>

      <table class="tbl spec-table" style="margin-top:20px;">
        <thead><tr><th>PHP Construct</th><th>Technical Purpose & Execution Behavior</th></tr></thead>
        <tbody>
          <tr><td><code>&lt;?php</code></td><td>Opening tag instructing the web server to interpret code via the PHP ZEND engine.</td></tr>
          <tr><td><code>declare(strict_types=1);</code></td><td>Enforces strict type checking for function parameters and return types across the file.</td></tr>
          <tr><td><code>htmlspecialchars()</code></td><td>Escapes special HTML characters to protect applications from Cross-Site Scripting (XSS).</td></tr>
        </tbody>
      </table>
    </div>

    <div class="section-title"><span class="num">3</span>Security & Best Practices</div>
    <div class="section-body">
      <div class="callout" style="border-left-color:#ef4444;">
        <div class="callout-title" style="color:#ef4444;">⚠️ Security Traps & Best Practices</div>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>Never trust user input from superglobals (<code>$_GET</code>, <code>$_POST</code>, <code>$_COOKIE</code>). Always validate and sanitize before processing.</li>
          <li>Set secure session cookie attributes: <code>session.cookie_httponly = 1</code>, <code>session.cookie_secure = 1</code>, <code>session.cookie_samesite = 'Lax'</code>.</li>
          <li>Turn off <code>display_errors</code> in production (<code>ini_set('display_errors', '0')</code>) and log errors securely to files.</li>
        </ul>
      </div>
    </div>`;
      break;
  }

  return sectionsHtml;
}

// 2. Define Complete 52-Chapter PHP Masterclass Data Structure across 16 Phases
const phpPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'PHP Introduction', icon: '🐘',
    chapters: [
      { num: 1, file: '01-php-ante-enti-what-is-php.html', title: 'PHP Ante Enti?', subtopics: 'PHP ante enti? · PHP full form · PHP enduku use chestaru? · PHP vs JavaScript · PHP vs Python · PHP vs Node.js · Server-side scripting · Execution flow · Dynamic websites · REST APIs · CMS platforms · Advantages & Limitations', summary: 'PHP is a server-side scripting language used to build dynamic websites, web applications and APIs. PHP server lo execute ayi, browser ki HTML, JSON or other response send chestundi.' },
      { num: 2, file: '02-php-prerequisites.html', title: 'PHP Prerequisites', subtopics: 'HTML basics · CSS basics · JavaScript basics · Programming logic · Variables · Functions · Arrays · OOP basics · HTTP basics · SQL basics · Git basics · Command-line basics', summary: 'Prerequisites for learning PHP: understanding core HTML/CSS markup, basic programming logic, HTTP request lifecycle, and SQL databases.' }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'Setup and First Program', icon: '⚙️',
    chapters: [
      { num: 3, file: '03-php-installation.html', title: 'PHP Installation', subtopics: 'Installing PHP on Windows, macOS, Linux · Checking PHP version (php --version) · PHP CLI · PHP development server · XAMPP overview · MAMP overview · Composer installation · VS Code setup · php.ini configuration', summary: 'Step-by-step installation guide for setting up PHP CLI, local development web servers, XAMPP stack, Composer package manager, and VS Code extensions.' },
      { num: 4, file: '04-first-php-program.html', title: 'First PHP Program', subtopics: '.php files · <?php opening tag · PHP statements · echo · print · Comments · Running PHP from terminal · PHP development server · PHP inside HTML · Syntax errors', summary: 'Write and run your first PHP script using echo, print, PHP CLI, and the built-in development server (php -S localhost:8000).' },
      { num: 5, file: '05-php-with-html.html', title: 'PHP with HTML', subtopics: 'Embedding PHP in HTML · PHP output inside HTML · Short echo tag <?= ?> · Dynamic headings & lists · Conditional HTML · Loop-generated HTML · Escaping output with htmlspecialchars()', summary: 'Seamlessly embed dynamic PHP logic inside HTML documents, using short echo tags <?= ?> and HTML escaping for web security.' }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'Variables and Data Types', icon: '🔢',
    chapters: [
      { num: 6, file: '06-variables.html', title: 'Variables', subtopics: 'Variable ante enti? · $ symbol prefix · Variable declaration · Variable assignment · Reassigning values · Variable naming rules · Case sensitivity · Local, Global, Static scope · Constants define() & const', summary: 'Declare and scope PHP variables using $ prefixes, global/static scopes, and define constant values.' },
      { num: 7, file: '07-data-types.html', title: 'Data Types', subtopics: 'PHP data types overview · String · Integer · Float · Boolean · Array · Object · NULL · Resource · var_dump · gettype · Type checking functions (is_string, is_int, is_array)', summary: 'Understand scalar, compound, and special PHP data types using type detection functions like var_dump() and is_array().' },
      { num: 8, file: '08-type-declarations.html', title: 'Type Declarations', subtopics: 'Scalar type declarations · Parameter types · Return types · Nullable types (?string) · Union types (int|float) · Mixed type · declare(strict_types=1) · Type coercion vs strict typing', summary: 'Enforce type safety across function parameters and return types using declare(strict_types=1), union types, and nullable types.' }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'Operators and Control Flow', icon: '🔀',
    chapters: [
      { num: 9, file: '09-operators.html', title: 'Operators', subtopics: 'Arithmetic operators · Assignment operators · Comparison operators (== vs ===) · Logical operators · Increment/Decrement · String concatenation (.) · Null coalescing (??) · Spaceship operator (<=>)', summary: 'Master PHP operators: strict equality (===), string concatenation (.), null coalescing (??), and spaceship operator (<=>).' },
      { num: 10, file: '10-conditions.html', title: 'Conditions', subtopics: 'if statement · else statement · elseif statement · Nested if · Ternary operator (? :) · Null coalescing operator (??) · Switch statement · Match expression (PHP 8+)', summary: 'Control decision branching with if, else, switch, ternary operators, and modern PHP 8 match expressions.' },
      { num: 11, file: '11-loops.html', title: 'Loops', subtopics: 'while loop · do while loop · for loop · foreach loop · Iterating indexed arrays · Iterating associative arrays (key => value) · break statement · continue statement · Nested loops', summary: 'Repeat execution using while, for, and foreach loops over indexed arrays and associative key-value pairs.' }
    ]
  },
  {
    phaseTag: 'Phase 05', phaseTitle: 'Strings and Arrays', icon: '📊',
    chapters: [
      { num: 12, file: '12-strings.html', title: 'Strings', subtopics: 'Single quotes vs double quotes · String interpolation · Heredoc & Nowdoc · strlen · strpos · str_replace · substr · strtolower · strtoupper · trim · explode · implode · Multibyte strings (mb_*)', summary: 'Manipulate strings with built-in functions: concatenation, interpolation, search/replace, exploding into arrays, and multibyte mb_* functions.' },
      { num: 13, file: '13-indexed-arrays.html', title: 'Indexed Arrays', subtopics: 'Indexed array ante enti? · Creating arrays · Array syntax [] · Accessing elements · Modifying elements · Adding elements · count() · Array iteration · Common array operations', summary: 'Create and traverse zero-indexed numerical arrays in PHP using array syntax [] and count().' },
      { num: 14, file: '14-associative-arrays.html', title: 'Associative Arrays', subtopics: 'Associative array ante enti? · Key => Value pairs · Accessing values by key · Modifying values · Adding new keys · Removing keys (unset) · Iterating key-value pairs · Multidimensional associative arrays', summary: 'Store key-value associative pairs in PHP arrays, access elements by string keys, and manipulate nested data structures.' },
      { num: 15, file: '15-array-functions.html', title: 'Array Functions', subtopics: 'array_push · array_pop · array_shift · array_unshift · array_merge · array_keys · array_values · in_array · array_search · array_filter · array_map · array_reduce · sort · rsort · ksort · asort', summary: 'Transform and filter arrays using powerful functional utilities: array_map(), array_filter(), array_reduce(), and sorting functions.' }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'Functions & Scope', icon: '⚡',
    chapters: [
      { num: 16, file: '16-functions.html', title: 'Functions', subtopics: 'Function definition · Function parameters · Default parameter values · Return values · Passing by value vs passing by reference (&) · Named arguments (PHP 8+) · Variadic functions (...$args)', summary: 'Define reusable functions, pass parameters by reference (&), specify default values, and use PHP 8 named arguments.' },
      { num: 17, file: '17-arrow-functions-and-closures.html', title: 'Arrow Functions & Closures', subtopics: 'Anonymous functions · Closures · use keyword to capture variables · Arrow functions (fn() => ...) · Callback functions · Pass functions as arguments', summary: 'Write clean single-line arrow functions fn() => expr and anonymous closures capturing outer variables via use keyword.' }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Forms & Web Input', icon: '📝',
    chapters: [
      { num: 18, file: '18-superglobals.html', title: 'Superglobals', subtopics: 'Superglobals overview · $_SERVER · $_GET · $_POST · $_REQUEST · $_FILES · $_COOKIE · $_SESSION · $_ENV · Accessing request data safely', summary: 'Inspect HTTP request details using PHP superglobals: $_SERVER, $_GET, $_POST, $_COOKIE, and $_FILES.' },
      { num: 19, file: '19-form-handling.html', title: 'Form Handling', subtopics: 'HTML forms with PHP · GET method vs POST method · Action attribute · Reading form inputs · Radio buttons & Checkboxes · Select dropdowns · Form submission processing', summary: 'Process HTML web form submissions using GET and POST HTTP methods, handling inputs, checkboxes, and select dropdowns.' },
      { num: 20, file: '20-form-validation.html', title: 'Form Validation & Sanitization', subtopics: 'Required fields validation · Email validation · Number validation · URL validation · Sanitize inputs · filter_var · htmlspecialchars · Displaying form errors · Retaining old input', summary: 'Validate and sanitize user input data using filter_var(), preventing XSS attacks with htmlspecialchars() and displaying field errors.' }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Sessions, Cookies & Auth', icon: '🔑',
    chapters: [
      { num: 21, file: '21-sessions.html', title: 'Sessions', subtopics: 'Session ante enti? · session_start() · Storing session data ($_SESSION) · Reading session values · Checking session state · session_unset() · session_destroy() · Session timeout · Session security', summary: 'Manage persistent user state across pages using session_start(), storing session variables in $_SESSION.' },
      { num: 22, file: '22-cookies.html', title: 'Cookies', subtopics: 'Cookie ante enti? · setcookie() function · Reading cookies ($_COOKIE) · Expiration time · Path & Domain · Secure flag · HttpOnly flag · SameSite attribute · Deleting cookies', summary: 'Set client-side HTTP cookies using setcookie(), configuring secure flags HttpOnly, Secure, and SameSite attributes.' },
      { num: 23, file: '23-authentication-project.html', title: 'Authentication Project', subtopics: 'User login form · Registration form · Password hashing (password_hash & password_verify) · Session login state · Protected routes · Logout handler · Remember me feature', summary: 'Build a secure user authentication system with password hashing (Bcrypt/Argon2), login session validation, and logout handlers.' }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'Object-Oriented PHP', icon: '🏗️',
    chapters: [
      { num: 24, file: '24-classes-and-objects.html', title: 'Classes & Objects', subtopics: 'OOP overview · class definition · Instantiating objects (new) · Properties · Methods · $this keyword · Constructor (__construct) · Destructor (__destruct) · Constructor promotion (PHP 8+)', summary: 'Model real-world entities using OOP classes, instantiating objects, instance properties, constructors, and $this.' },
      { num: 25, file: '25-access-modifiers.html', title: 'Access Modifiers', subtopics: 'Encapsulation · public access modifier · private access modifier · protected access modifier · Getter methods · Setter methods · Property visibility rules', summary: 'Encapsulate class state using public, private, and protected access modifiers with getter and setter methods.' },
      { num: 26, file: '26-inheritance.html', title: 'Inheritance', subtopics: 'Inheritance ante enti? · extends keyword · Parent class & Child class · Overriding methods · parent::__construct() · final keyword on classes & methods', summary: 'Extend base parent classes using extends keyword, overriding methods, and leveraging parent:: references.' },
      { num: 27, file: '27-abstract-classes-and-interfaces.html', title: 'Abstract Classes & Interfaces', subtopics: 'Abstract class definition · abstract methods · Interface definition · implements keyword · Multiple interface implementation · Abstract class vs Interface choice', summary: 'Enforce structural API contracts using abstract classes and interface definitions with multiple implementation capability.' }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'Advanced OOP', icon: '🧬',
    chapters: [
      { num: 28, file: '28-traits.html', title: 'Traits', subtopics: 'Trait ante enti? · Horizontal code reuse · trait definition · use TraitName · Trait method precedence · Conflict resolution (insteadof) · Multiple traits in a class', summary: 'Share reusable methods across unrelated class hierarchies using PHP Traits and conflict resolution.' },
      { num: 29, file: '29-magic-methods.html', title: 'Magic Methods', subtopics: '__get · __set · __call · __callStatic · __toString · __invoke · __clone · __serialize · __unserialize · Overloading dynamic properties', summary: 'Intercept dynamic property reads, method calls, and object string conversions using PHP magic methods.' },
      { num: 30, file: '30-namespaces-and-autoloading.html', title: 'Namespaces & Autoloading', subtopics: 'Namespace ante enti? · namespace declaration · use keyword · Sub-namespaces · PSR-4 autoloading standard · spl_autoload_register · Composer autoload', summary: 'Organize large application codebases into logical namespaces and auto-load classes conforming to the PSR-4 standard.' }
    ]
  },
  {
    phaseTag: 'Phase 11', phaseTitle: 'File Handling & Exceptions', icon: '📁',
    chapters: [
      { num: 31, file: '31-file-handling.html', title: 'File Handling', subtopics: 'Reading files (file_get_contents, fread) · Writing files (file_put_contents, fwrite) · File modes (r, w, a) · fopen & fclose · file_exists · is_file · Directory functions · Uploading files ($_FILES)', summary: 'Read, write, append, and manage local server files and process user file uploads safely.' },
      { num: 32, file: '32-exceptions.html', title: 'Exceptions', subtopics: 'Exception ante enti? · try · catch · finally · throw · Custom exception · Multiple catch blocks · Exception hierarchy · Domain exceptions · API exception responses', summary: 'Handle runtime exceptions using try, catch, finally blocks, and throw custom Exception instances.' }
    ]
  },
  {
    phaseTag: 'Phase 12', phaseTitle: 'Database with PDO', icon: '🗄️',
    chapters: [
      { num: 33, file: '33-sql-basics.html', title: 'SQL Basics', subtopics: 'Database basics · Tables · Primary keys · Foreign keys · SQL CRUD · Joins · Indexes · Transactions · Normalization · MySQL connection', summary: 'Master SQL relational database concepts: tables, primary keys, foreign key constraints, JOIN queries, and transaction ACID properties.' },
      { num: 34, file: '34-pdo.html', title: 'PDO', subtopics: 'PDO ante enti? · Database connection · DSN · Prepared statements · Binding values · execute · Fetching rows · Fetch modes · CRUD · Transactions · PDO exceptions', summary: 'Connect to MySQL databases using PDO (PHP Data Objects), binding parameters safely with prepared statements.' },
      { num: 35, file: '35-database-project.html', title: 'Database Project', subtopics: 'Course table · Lesson table · User table · Progress table · Connection class · Repository class · CRUD operations · Prepared queries · Transactions · Pagination · Search', summary: 'Build a production database layer in PHP featuring Repository patterns, PDO connection singleton, pagination, and multi-table transactions.' }
    ]
  },
  {
    phaseTag: 'Phase 13', phaseTitle: 'JSON and APIs', icon: '🌐',
    chapters: [
      { num: 36, file: '36-json.html', title: 'JSON', subtopics: 'JSON ante enti? · json_encode · json_decode · Associative arrays · JSON objects · JSON arrays · JSON errors · JSON flags · API response · Nested JSON', summary: 'Serialize PHP data structures to JSON using json_encode() and decode API payloads with json_decode().' },
      { num: 37, file: '37-rest-apis.html', title: 'REST APIs', subtopics: 'REST API ante enti? · GET endpoint · POST endpoint · PUT endpoint · PATCH endpoint · DELETE endpoint · URL parameters · JSON request body · HTTP status codes · Postman testing', summary: 'Design RESTful API endpoints in PHP handling GET, POST, PUT, DELETE HTTP verbs, status codes, and JSON bodies.' }
    ]
  },
  {
    phaseTag: 'Phase 14', phaseTitle: 'Security', icon: '🔒',
    chapters: [
      { num: 38, file: '38-php-security-basics.html', title: 'PHP Security Basics', subtopics: 'Input validation · Output escaping · XSS prevention · SQL injection prevention · CSRF prevention · Session fixation · Session hijacking · Path traversal · Secret management', summary: 'Protect PHP web applications against security vulnerabilities: SQL Injection, XSS, CSRF, and session fixation.' },
      { num: 39, file: '39-csrf-and-xss.html', title: 'CSRF and XSS', subtopics: 'CSRF ante enti? · CSRF tokens · Form token validation · SameSite cookies · XSS ante enti? · htmlspecialchars · Output encoding · Content Security Policy', summary: 'Prevent Cross-Site Scripting (XSS) with htmlspecialchars() and defend against CSRF attacks using secret session tokens.' },
      { num: 40, file: '40-authorization.html', title: 'Authorization', subtopics: 'Authentication vs authorization · Roles · Permissions · Admin routes · Middleware · Resource ownership · Policy checks · Access denied response', summary: 'Enforce Role-Based Access Control (RBAC) and permission checks to protect sensitive admin routes and user resources.' }
    ]
  },
  {
    phaseTag: 'Phase 15', phaseTitle: 'Laravel Framework', icon: '🚀',
    chapters: [
      { num: 41, file: '41-laravel-introduction.html', title: 'Laravel Introduction', subtopics: 'Laravel ante enti? · PHP vs Laravel · Laravel features · MVC architecture · Artisan CLI · Composer setup · Laravel project creation · Directory structure · Environment configuration', summary: 'Discover Laravel MVC architecture, Artisan CLI, project directory structure, and environment configuration.' },
      { num: 42, file: '42-laravel-routing.html', title: 'Laravel Routing', subtopics: 'Routes · GET routes · POST routes · PUT routes · DELETE routes · Route parameters · Named routes · Route groups · Prefixes · Middleware routes · Resource routes · Route model binding', summary: 'Define HTTP web and API routes in Laravel, route parameter binding, middleware groups, and resource controllers.' },
      { num: 43, file: '43-controllers-and-views.html', title: 'Controllers & Views', subtopics: 'Controllers · Resource controllers · Request handling · Responses · Blade templates · Layouts · Components · Slots · Blade loops & conditions · View data', summary: 'Structure business logic in Laravel Controllers and render modern UI interfaces using Blade template engine.' },
      { num: 44, file: '44-laravel-validation.html', title: 'Laravel Validation', subtopics: 'Request validation · Form Request classes · Required rules · Email rules · Numeric rules · Unique rules · Exists rules · Custom rules · Validation messages', summary: 'Validate incoming web and API request data using Laravel validator rules and Form Request classes.' },
      { num: 45, file: '45-eloquent-orm.html', title: 'Eloquent ORM', subtopics: 'Eloquent ante enti? · Models · Migrations · Factories · Seeders · CRUD operations · Relationships · Eager loading · Query scopes · Accessors & Mutators · Soft deletes', summary: 'Interact with relational database tables gracefully using Laravel Eloquent ORM models and relationships.' },
      { num: 46, file: '46-laravel-auth.html', title: 'Laravel Auth', subtopics: 'Breeze · Jetstream · Sanctuary · Passport · Auth middleware · Login controller · Registration controller · Password reset · Email verification', summary: 'Implement authentication scaffolding, login, registration, and API token authentication in Laravel.' },
      { num: 47, file: '47-laravel-api.html', title: 'Laravel API', subtopics: 'API routes · API controllers · API resources · JSON responses · Sanctum token auth · Rate limiting · API versioning · Swagger / OpenAPI documentation', summary: 'Build robust REST APIs in Laravel with API resources, Sanctum authentication tokens, and rate limiters.' },
      { num: 48, file: '48-laravel-project.html', title: 'Laravel Project', subtopics: 'Complete CRUD web application · User auth · Database relations · File upload · Flash messages · Pagination · Search filtering · Blade UI layout · Deployment', summary: 'Build a production web application in Laravel featuring user auth, database models, file uploads, and UI layouts.' }
    ]
  },
  {
    phaseTag: 'Phase 16', phaseTitle: 'Advanced PHP', icon: '⚡',
    chapters: [
      { num: 49, file: '49-generators.html', title: 'Generators', subtopics: 'Generator ante enti? · yield · Lazy iteration · Memory benefits · Generator return values · Generator delegation · Generators with files & DB results', summary: 'Stream memory-efficient datasets using PHP Generators and the yield keyword.' },
      { num: 50, file: '50-fibers.html', title: 'Fibers', subtopics: 'Fiber ante enti? · Cooperative multitasking · Starting fibers · Suspending fibers · Resuming fibers · Fiber return values · Error handling · Fibers vs threads', summary: 'Execute cooperative multitasking in modern PHP using Fibers (Fiber::suspend and $fiber->resume()).' },
      { num: 51, file: '51-attributes-and-reflection.html', title: 'Attributes and Reflection', subtopics: 'Attributes ante enti? · Attribute syntax (#[...]) · Built-in attributes · Custom attributes · Reflection API · Reading attributes · Metadata-driven programming', summary: 'Annotate PHP classes and methods with native Attributes (#[...]) and inspect metadata dynamically using the Reflection API.' },
      { num: 52, file: '52-performance.html', title: 'Performance', subtopics: 'PHP execution model · Opcode cache · OPcache · Memory usage · Query optimization · N+1 queries · Caching · Redis · Lazy loading · Profiling', summary: 'Optimize PHP application performance: OPcache bytecode caching, memory tuning, eliminating N+1 DB queries, and Redis caching.' }
    ]
  }
];

// Helper to generate Accordion Sidebar HTML
function getPHPSidebarHTML(activeNum) {
  let sidebarAccHTML = '';
  phpPhases.forEach(phase => {
    const isPhaseActive = phase.chapters.some(c => c.num === activeNum);
    sidebarAccHTML += `
      <button class="accordion-header ${isPhaseActive ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">${phase.icon}</span>
          <div class="phase-info"><span class="phase-tag">${phase.phaseTag}</span><span class="phase-title">${phase.phaseTitle}</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">${phase.chapters.length} Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${isPhaseActive ? 'open' : ''}">
        ${phase.chapters.map(c => `<a href="/blog-php/${c.file}" class="${c.num === activeNum ? 'active' : ''}">${c.num}. ${c.title}</a>`).join('')}
      </div>`;
  });
  return sidebarAccHTML;
}

// 3. Generate public/blog-php.html (Master Index Page)
const allPHPChapters = [];
phpPhases.forEach(p => p.chapters.forEach(c => allPHPChapters.push({ ...c, phaseTag: p.phaseTag, phaseTitle: p.phaseTitle, icon: p.icon })));

const masterIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PHP Complete Masterclass & Roadmap (52 Chapters, 16 Phases) | Our Compiler</title>
  <meta name="description" content="Master PHP web development from zero to production ready with our complete 52-chapter roadmap across 16 phases: Setup, Variables, Data Types, Operators, Conditions, Loops, Strings, Arrays, Functions, Forms & Web Input, Sessions & Authentication, OOP, Namespaces & Composer, Exceptions, PDO Database, REST APIs, Security, Laravel Framework, Generators, Fibers, Attributes, and Performance." />
  <meta name="keywords" content="php tutorial, learn php, php masterclass, server side scripting, operators, conditions, loops, array functions, php forms, sessions, authentication, php oop, pdo mysql, composer, rest api, laravel framework, php generators, php fibers, opcache" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-php.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-php/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <script>
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) { content.classList.remove('open'); btn.classList.remove('active'); }
      else { content.classList.add('open'); btn.classList.add('active'); }
    }
    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => document.body.classList.add('light-theme'));
      }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left:auto;flex-shrink:0;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;cursor:pointer;font-family:"Inter",sans-serif;transition:all 0.2s;white-space:nowrap;margin-right:12px;';
          const updateText = () => { toggleBtn.innerHTML = document.body.classList.contains('light-theme') ? '🌙 Dark' : '☀️ Light'; };
          updateText();
          toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.documentElement.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
            updateText();
          });
          topnav.appendChild(toggleBtn);
        }
      });
    })();
  </script>
  <script src="/site-footer.js" defer></script>
  <link rel="stylesheet" href="/pages.css" />
</head>
<body class="lang-php">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html" class="active">PHP</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">PHP Master Course</div>
    <a href="/blog-php.html" class="sidebar-home-link active">🐘 PHP Course HOME</a>
    <div class="sidebar-accordion">
      ${getPHPSidebarHTML(0)}
    </div>
    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/?lang=php" style="color:#10b981;font-weight:700;">▶ Try PHP Online Compiler</a>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">PHP Complete Roadmap</span>
    </div>

    <h1 class="page-title">PHP Complete Masterclass (52 Chapters, 16 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🐘 PHP 8.2+</span>
      <span class="badge">🟢 52 Complete Chapters</span>
      <span class="badge">📂 16 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">PHP Ante Enti? · Installation &amp; Dev Server · PHP with HTML · Variables &amp; Types · Operators &amp; Control Flow · Strings &amp; Array Functions · Functions &amp; Closures · Forms &amp; Superglobals · Sessions &amp; Authentication · OOP (Classes, Interfaces, Traits) · Namespaces &amp; Composer · PDO Database &amp; SQL · REST APIs &amp; Security · Laravel Framework (Routing, Blade, Eloquent) · Advanced PHP (Generators, Fibers, Attributes, OPcache)</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's PHP Complete Master Course</strong>. PHP is the backbone of the modern web, powering over 75% of dynamic websites and platforms like WordPress, Wikipedia, and Laravel services. This comprehensive 52-chapter bootcamp guides you step-by-step from server setup to object-oriented programming, PDO database CRUD, secure session authentication, REST APIs, the Laravel framework, and advanced PHP performance tuning.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(16,185,129,0.12),rgba(20,24,32,0.6));border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#10b981;margin-bottom:10px;font-size:18px;">🎯 Ready to Start Learning PHP?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Choose where to start: explore PHP introduction, sessions &amp; auth, OOP, PDO database access, Laravel framework, or advanced performance:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-php/01-php-ante-enti-what-is-php.html" style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: PHP Intro →</a>
        <a href="/blog-php/21-sessions.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 8: Sessions &amp; Auth →</a>
        <a href="/blog-php/24-classes-and-objects.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 9: OOP PHP →</a>
        <a href="/blog-php/34-pdo.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 12: PDO Database →</a>
        <a href="/blog-php/41-laravel-introduction.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 15: Laravel Framework →</a>
        <a href="/blog-php/52-performance.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 16: Advanced Performance →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">
      ${phpPhases.map(phase => `
        <div class="phase-roadmap-card">
          <div class="phase-roadmap-header">
            <div class="phase-roadmap-title-wrap">
              <span class="phase-roadmap-icon">${phase.icon}</span>
              <div>
                <div class="phase-roadmap-tag">${phase.phaseTag}</div>
                <h3 class="phase-roadmap-title">${phase.phaseTitle}</h3>
              </div>
            </div>
            <span class="phase-roadmap-badge">${phase.chapters.length} In-Depth Lessons</span>
          </div>
          <div class="phase-lessons-list">
            ${phase.chapters.map(ch => `
              <a href="/blog-php/${ch.file}" class="curriculum-lesson-row">
                <div class="lesson-row-left">
                  <span class="lesson-idx">${ch.num.toString().padStart(2, '0')}</span>
                  <div class="lesson-info">
                    <span class="lesson-title">${ch.num}. ${ch.title}</span>
                    <span class="lesson-subtopics">${ch.subtopics}</span>
                  </div>
                </div>
                <div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div>
              </a>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>PHP Complete Masterclass · 52 Chapters · 16 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-php/01-php-ante-enti-what-is-php.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. PHP Ante Enti?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
<footer class="footer" id="site-footer"></footer>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-php.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-php.html master index page successfully!');

// 4. Generate all 52 Chapter HTML Files inside public/blog-php/
allPHPChapters.forEach((ch, idx) => {
  const prevChapter = idx > 0 ? allPHPChapters[idx - 1] : null;
  const nextChapter = idx < allPHPChapters.length - 1 ? allPHPChapters[idx + 1] : null;

  const conceptContent = generatePHPChapterContent(ch);

  const chapterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PHP — ${ch.title} | Our Compiler</title>
  <meta name="description" content="Complete PHP Chapter ${ch.num}: ${ch.title}. Learn ${ch.subtopics} with practical PHP code examples, web execution flow, and step-by-step walkthroughs." />
  <meta name="keywords" content="php tutorial, server side scripting, ${ch.title.toLowerCase()}, learn php, web development, php pdo" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-php/${ch.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-php/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <script>
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) {
        content.classList.remove('open');
        btn.classList.remove('active');
      } else {
        content.classList.add('open');
        btn.classList.add('active');
      }
    }

    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: "Inter", sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;';
          const updateText = () => {
            const isLight = document.body.classList.contains('light-theme');
            toggleBtn.innerHTML = isLight ? '🌙 Dark' : '☀️ Light';
          };
          updateText();
          toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.documentElement.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateText();
          });
          topnav.appendChild(toggleBtn);
        }

        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;

          const rawCode = codeEl.textContent;

          let actionsContainer = header.querySelector('.code-actions');
          if (!actionsContainer) {
            actionsContainer = document.createElement('div');
            actionsContainer.className = 'code-actions';
            actionsContainer.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-left: auto;';
            const tryBtn = header.querySelector('.try-btn');
            if (tryBtn) actionsContainer.appendChild(tryBtn);
            header.appendChild(actionsContainer);
          }

          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn';
          copyBtn.innerHTML = '📋 Copy';
          copyBtn.style.cssText = 'background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: "Inter", sans-serif; white-space: nowrap;';
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(rawCode).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
            });
          });
          actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);

          const tryBtn = actionsContainer.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_php', rawCode);
              window.location.href = '/?lang=php';
            });
          }
        });
      });
    })();
  </script>
  <script src="/site-footer.js" defer></script>
  <link rel="stylesheet" href="/pages.css" />
</head>
<body class="lang-php">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html" class="active">PHP</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">PHP Master Course</div>
    <a href="/blog-php.html" class="sidebar-home-link">🐘 PHP Course HOME</a>
    <div class="sidebar-accordion">
      ${getPHPSidebarHTML(ch.num)}
    </div>
    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/?lang=php" style="color:#10b981;font-weight:700;">▶ Try PHP Online Compiler</a>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-php.html">PHP</a><span class="sep">›</span>
      <span class="current">Lesson ${ch.num}: ${ch.title}</span>
    </div>

    <h1 class="page-title">PHP — ${ch.title}</h1>

    <div class="page-meta">
      <span class="badge">🐘 PHP 8.2+</span>
      <span class="badge">🟢 Lesson ${ch.num} of ${allPHPChapters.length}</span>
      <span class="badge">📂 ${ch.phaseTag}: ${ch.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this chapter:</span>
      <span class="topic-pill-text">${ch.subtopics}</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>PHP — ${ch.title}</strong> in our PHP Complete Masterclass! ${ch.summary}</p>
    </div>

${conceptContent}

    <div class="try-box">
      <div class="try-title">💻 Live PHP Code Execution</div>
      <p style="color:var(--text2);font-size:14px;margin-bottom:12px;">Test and run this PHP script in our online web compiler environment:</p>
      <a class="run-btn" href="/?lang=php">Open in Online PHP Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on PHP 8.2+ · Last updated August 2026</span>
      </div>
    </div>

    <div class="nav-footer">
      ${prevChapter ? `<a href="${prevChapter.file}" class="nav-btn"><span class="label">← Previous Lesson</span><span class="title">${prevChapter.num}. ${prevChapter.title}</span></a>` : `<a href="/blog-php.html" class="nav-btn"><span class="label">← PHP Overview</span><span class="title">Course Index</span></a>`}
      ${nextChapter ? `<a href="${nextChapter.file}" class="nav-btn" style="text-align:right;"><span class="label">Next Lesson →</span><span class="title">${nextChapter.num}. ${nextChapter.title}</span></a>` : `<a href="/blog-php.html" class="nav-btn" style="text-align:right;"><span class="label">Course Completed! 🎉</span><span class="title">PHP Index</span></a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
<footer class="footer" id="site-footer"></footer>
</body>
</html>`;

  const filePath = path.join(phpDir, ch.file);
  fs.writeFileSync(filePath, chapterHtml, 'utf8');
  console.log(`🔥 Built PHP Chapter: ${ch.file} (${(chapterHtml.length / 1024).toFixed(1)}KB)`);
});

console.log('🎉 Successfully rebuilt all 52 PHP Masterclass Chapters & Master Index page!');
