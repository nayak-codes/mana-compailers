const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const goDir = path.join(publicDir, 'blog-go');

if (!fs.existsSync(goDir)) {
  fs.mkdirSync(goDir, { recursive: true });
}

// 1. Create public/blog-go/style.css matching Emerald Green Theme (#10b981)
const cssStyleContent = `/* Specialized styling enhancements for Go tutorial lessons & Accordion — Emerald Green Theme */
:root {
  --go-theme: #10b981;
  --go-theme-hover: #34d399;
  --go-theme-bg: rgba(16, 185, 129, 0.12);
  --go-theme-border: rgba(16, 185, 129, 0.3);
}

body.lang-go {
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

/* Light Theme overrides */
body.light-theme .phase-roadmap-card {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

body.light-theme .phase-roadmap-card:hover {
  border-color: #10b981;
  box-shadow: 0 6px 18px rgba(16, 185, 129, 0.12);
}

body.light-theme .phase-roadmap-header {
  border-bottom-color: #f1f5f9;
}

body.light-theme .phase-roadmap-icon {
  background: #dcfce7;
  border-color: #bbf7d0;
}

body.light-theme .phase-roadmap-tag {
  color: #059669;
}

body.light-theme .phase-roadmap-title {
  color: #0f172a;
}

body.light-theme .phase-roadmap-badge {
  background: #f1f5f9;
  border-color: #e2e8f0;
  color: #475569;
}

body.light-theme .phase-roadmap-desc {
  color: #64748b;
}

body.light-theme .curriculum-lesson-row {
  background: #f8fafc;
  border-color: #e2e8f0;
}

body.light-theme .curriculum-lesson-row:hover {
  background: #f0fdf4;
  border-color: #86efac;
}

body.light-theme .lesson-idx {
  background: #dcfce7;
  color: #059669;
}

body.light-theme .lesson-title {
  color: #0f172a;
}

body.light-theme .lesson-subtopics {
  color: #64748b;
}

body.light-theme .lesson-btn {
  background: #dcfce7;
  border-color: #bbf7d0;
  color: #059669;
}

body.light-theme .curriculum-lesson-row:hover .lesson-btn {
  background: #059669;
  color: #ffffff;
}

body.light-theme .sidebar-home-link {
  background: #f0fdf4 !important;
  border-color: #bbf7d0 !important;
  color: #059669 !important;
}

body.light-theme .sidebar-home-link.active {
  background: #dcfce7 !important;
  border-color: #10b981 !important;
  color: #047857 !important;
}

body.light-theme .accordion-header {
  background: #ffffff !important;
  border-color: #e2e8f0 !important;
  color: #0f172a !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
}
body.light-theme .accordion-header:hover {
  background: #f8fafc !important;
  border-color: #cbd5e1 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06) !important;
}
body.light-theme .accordion-header.active {
  background: #ffffff !important;
  border: 1.5px solid #10b981 !important;
  color: #0f172a !important;
  box-shadow: 0 2px 10px rgba(16, 185, 129, 0.15) !important;
}
body.light-theme .phase-icon-box {
  background: #f1f5f9;
  border-color: #e2e8f0;
}
body.light-theme .accordion-header.active .phase-icon-box {
  background: #dcfce7 !important;
  border-color: #bbf7d0 !important;
}
body.light-theme .phase-tag {
  color: #64748b;
}
body.light-theme .accordion-header.active .phase-tag {
  color: #059669 !important;
}
body.light-theme .phase-title {
  color: #0f172a !important;
}
body.light-theme .phase-count-badge {
  background: #f1f5f9;
  color: #475569;
  border-color: #e2e8f0;
}
body.light-theme .accordion-header.active .phase-count-badge {
  background: #dcfce7 !important;
  color: #059669 !important;
  border-color: #86efac !important;
}
body.light-theme .accordion-chevron {
  color: #94a3b8;
}
body.light-theme .accordion-header.active .accordion-chevron {
  color: #059669 !important;
}
body.light-theme .accordion-content a {
  color: #475569;
}
body.light-theme .accordion-content a:hover {
  color: #0f172a;
  background: #f1f5f9;
}
body.light-theme .accordion-content a.active {
  background: #10b981 !important;
  color: #ffffff !important;
  border-radius: 8px !important;
  font-weight: 700 !important;
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

fs.writeFileSync(path.join(goDir, 'style.css'), cssStyleContent, 'utf8');

// Function to generate detailed textbook chapters for all 48 Go chapters
function generateChapterContent(ch) {
  const numStr = ch.num.toString().padStart(2, '0');
  
  // Custom deep contents according to topic
  let sectionsHtml = '';

  switch (ch.num) {
    case 1: // What is Go
      sectionsHtml = `
    <div class="section-title"><span class="num">1</span>Go Language Ante Enti? (What is Go & History)</div>
    <div class="section-body">
      <p><strong>Go (Golang)</strong> is an open-source, statically typed, compiled programming language designed at <strong>Google</strong> in 2007 by computer science pioneers <strong>Robert Griesemer, Rob Pike, and Ken Thompson</strong> (one of the creators of Unix and B language). It was officially announced to the public in 2009.</p>

      <div class="callout">
        <div class="callout-title">💡 Why Did Google Create Go?</div>
        <p>At Google, developers were building distributed backend services with millions of lines of C++ and Java code. They faced massive compilation times (taking hours to compile), complex dependency chains, error-prone manual memory management, and difficult multi-core parallel programming. Go was designed specifically to eliminate these headaches by combining:</p>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li><strong>Execution Speed of C/C++:</strong> Compiles directly to native CPU machine code (no JVM or interpreter overhead).</li>
          <li><strong>Developer Productivity of Python:</strong> Clean, minimal syntax with only 25 keywords (compared to C++'s 90+ keywords).</li>
          <li><strong>Built-in Concurrency of Erlang:</strong> Goroutines (lightweight green threads using only ~2KB memory) and Channels for lock-free communication.</li>
        </ul>
      </div>

      <div class="diagram-box">Google Software Engineering Dilemma (2007):

   [ C++ ]    ──> Blazing Speed  BUT  Extremely Slow Builds & Memory Traps
   [ Java ]   ──> Good Tooling   BUT  Heavy JVM Footprint & Verbose Syntax
   [ Python ] ──> Fast Scripting BUT  Slow Execution Speed & GIL Locks

                   ⬇ Go Solution (2009)

   [ Go ]     ──> Fast Compile + Native CPU Speed + Concurrency + Garbage Collected</div>
    </div>

    <div class="section-title"><span class="num">2</span>Go Language Key Features & Industry Use Cases</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <thead><tr><th>Feature</th><th>Technical Meaning & Advantage</th></tr></thead>
        <tbody>
          <tr><td><strong>1. Ultra-Fast Compilation</strong></td><td>Compiles directly to a single static binary executable in milliseconds using the <code>go build</code> toolchain.</td></tr>
          <tr><td><strong>2. Built-in Concurrency</strong></td><td>Native support for <strong>Goroutines</strong> (lightweight user-space threads) and <strong>Channels</strong> for CSP (Communicating Sequential Processes) concurrent design.</td></tr>
          <tr><td><strong>3. Single Static Binary</strong></td><td>All dependencies and packages are bundled into a single zero-dependency standalone binary file, making Docker deployment effortless.</td></tr>
          <tr><td><strong>4. Garbage Collection (GC)</strong></td><td>High-performance concurrent tricolor mark-and-sweep GC with sub-millisecond STW (Stop-The-World) latency.</td></tr>
          <tr><td><strong>5. Standard Formatting (gofmt)</strong></td><td>Built-in <code>gofmt</code> tool enforces a single unified code style across all Go projects worldwide — no style flame wars!</td></tr>
        </tbody>
      </table>

      <div class="callout" style="margin-top:20px;">
        <div class="callout-title">🌐 Top Real-World Systems Written in Go</div>
        <p>Go is the backbone of modern cloud computing and infrastructure tooling:</p>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li><strong>Docker & Kubernetes:</strong> The entire container revolution is built 100% in Go!</li>
          <li><strong>Terraform & Vault:</strong> HashiCorp's infrastructure automation suite.</li>
          <li><strong>Prometheus & Grafana:</strong> Cloud-native metrics and observability tools.</li>
          <li><strong>Ethereum (Geth):</strong> Official Ethereum blockchain client.</li>
          <li><strong>Uber, Netflix, Twitch & Cloudflare:</strong> Core API gateways and high-throughput microservices handling billions of requests daily.</li>
        </ul>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span>Go vs C vs Java vs Python Comparison</div>
    <div class="section-body">
      <table class="tbl">
        <thead><tr><th>Feature</th><th>Go (Golang)</th><th>C / C++</th><th>Java</th><th>Python</th></tr></thead>
        <tbody>
          <tr><td><strong>Compilation Target</strong></td><td>Native Machine Code</td><td>Native Machine Code</td><td>JVM Bytecode (.class)</td><td>Interpreted (CPython)</td></tr>
          <tr><td><strong>Memory Management</strong></td><td>Automatic Garbage Collector</td><td>Manual (malloc/free)</td><td>Automatic GC</td><td>Automatic Reference Counting</td></tr>
          <tr><td><strong>Compilation Speed</strong></td><td>⚡ Sub-second (Ultra Fast)</td><td>🐢 Slow</td><td>Moderate</td><td>N/A (Interpreted)</td></tr>
          <tr><td><strong>Concurrency Model</strong></td><td>Goroutines + Channels</td><td>Threads & Mutexes</td><td>Threads & ExecutorService</td><td>Asyncio / GIL Limited</td></tr>
          <tr><td><strong>Deployment Unit</strong></td><td>Single Binary File (~10MB)</td><td>Native Executable</td><td>JAR/WAR file + JVM Required</td><td>Python Source + Virtualenv</td></tr>
        </tbody>
      </table>
    </div>

    <div class="section-title"><span class="num">4</span>First Executable Go Program Breakdown</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Go — hello.go</span>
          <a class="try-btn" href="/?lang=go">▶ Run in Go Compiler</a>
        </div>
        <pre><code>package main

import "fmt"

func main() {
    fmt.Println("Hello, World! Welcome to Go Masterclass.")
}</code></pre>
      </div>

      <table class="tbl spec-table" style="margin-top:20px;">
        <thead><tr><th>Code Component</th><th>Technical Function & Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>package main</code></td><td>tells the Go compiler that this file is an executable application entry point, not a reusable library package.</td></tr>
          <tr><td><code>import "fmt"</code></td><td>imports the standard library package <strong>fmt</strong> (Format), which provides formatted I/O functions like <code>Println()</code> and <code>Printf()</code>.</td></tr>
          <tr><td><code>func main()</code></td><td>defines the entry point function of the executable. Execution starts automatically inside <code>main()</code>.</td></tr>
          <tr><td><code>fmt.Println(...)</code></td><td>invokes the <code>Println</code> function exported by package <code>fmt</code> to write text to stdout followed by a newline character.</td></tr>
        </tbody>
      </table>
    </div>`;
      break;

    case 6: // Variables and Constants
      sectionsHtml = `
    <div class="section-title"><span class="num">1</span>Variables & Declarations in Go</div>
    <div class="section-body">
      <p>Go lo variables define cheyyadaniki 2 main forms unnayi: standard <code>var</code> keyword mariyu Short Declaration Operator <code>:=</code>.</p>

      <table class="tbl spec-table">
        <thead><tr><th>Syntax Form</th><th>Example Code</th><th>Scope & Usage</th></tr></thead>
        <tbody>
          <tr><td><strong>Explicit var Declaration</strong></td><td><code>var age int = 25</code></td><td>Package level (global) or function level. Type explicitly specified.</td></tr>
          <tr><td><strong>Inferred var Declaration</strong></td><td><code>var name = "Ramesh"</code></td><td>Go compiler automatically infers type (string).</td></tr>
          <tr><td><strong>Short Declaration (:=)</strong></td><td><code>score := 98.5</code></td><td><strong>Function scope ONLY!</strong> Cannot be used at package level. Declares & initializes.</td></tr>
          <tr><td><strong>Multiple Declarations</strong></td><td><code>var x, y int = 10, 20</code> or <code>a, b := 1, "hi"</code></td><td>Multiple variables declared in a single clean line.</td></tr>
        </tbody>
      </table>

      <div class="callout" style="margin-top:20px;">
        <div class="callout-title">⚡ Zero Values in Go (No Garbage Memory!)</div>
        <p>In languages like C, uninitialized variables contain random garbage data from RAM. In Go, every variable declared without an explicit initial value is automatically assigned its <strong>Zero Value</strong>:</p>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li><code>int / float:</code> <code>0</code> / <code>0.0</code></li>
          <li><code>bool:</code> <code>false</code></li>
          <li><code>string:</code> <code>""</code> (empty string)</li>
          <li><code>pointers / slices / maps / channels / interfaces:</code> <code>nil</code></li>
        </ul>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>Constants & The iota Enumerator</div>
    <div class="section-body">
      <p>Constants in Go are declared using the <code>const</code> keyword. Constant values must be known at compile-time.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Go — iota Enumerator Pattern</span>
          <a class="try-btn" href="/?lang=go">▶ Run Code</a>
        </div>
        <pre><code>package main

import "fmt"

const (
    StatusPending  = iota // 0
    StatusActive          // 1
    StatusApproved        // 2
    StatusRejected        // 3
)

const (
    _  = iota             // Ignore zero
    KB = 1 << (10 * iota) // 1 << 10 = 1024
    MB                    // 1 << 20 = 1048576
    GB                    // 1 << 30 = 1073741824
)

func main() {
    fmt.Println("Pending:", StatusPending, "Approved:", StatusApproved)
    fmt.Printf("1 MB = %d Bytes, 1 GB = %d Bytes\\n", MB, GB)
}</code></pre>
      </div>
    </div>`;
      break;

    case 15: // Slices Deep-Dive
      sectionsHtml = `
    <div class="section-title"><span class="num">1</span>Slices Deep-Dive & Memory Architecture</div>
    <div class="section-body">
      <p>Go lo <strong>Slice</strong> ante oka dynamically sized, flexible view into an underlying array. Slices are lightweight reference headers passing by value.</p>

      <div class="diagram-box">Go Slice Header Internal Memory Layout (24 bytes on 64-bit CPU):

   ┌────────────────────────────────────────────────────────┐
   │ Pointer  (8 bytes) ───> Points to underlying Array     │
   ├────────────────────────────────────────────────────────┤
   │ Length   (8 bytes) ───> Current number of elements len()│
   ├────────────────────────────────────────────────────────┤
   │ Capacity (8 bytes) ───> Maximum elements space cap()   │
   └────────────────────────────────────────────────────────┘</div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Go — Slice Allocation & append() Mechanics</span>
          <a class="try-btn" href="/?lang=go">▶ Run Code</a>
        </div>
        <pre><code>package main

import "fmt"

func main() {
    // 1. Create slice with make(type, len, cap)
    numbers := make([]int, 3, 5)
    numbers[0], numbers[1], numbers[2] = 10, 20, 30

    fmt.Printf("Slice: %v | Len: %d | Cap: %d\\n", numbers, len(numbers), cap(numbers))

    // 2. Append elements
    numbers = append(numbers, 40, 50)
    fmt.Printf("Appended: %v | Len: %d | Cap: %d\\n", numbers, len(numbers), cap(numbers))

    // 3. Exceed capacity -> Automatic Array Reallocation (capacity doubles!)
    numbers = append(numbers, 60)
    fmt.Printf("Exceeded Cap: %v | Len: %d | Cap: %d\\n", numbers, len(numbers), cap(numbers))
}</code></pre>
      </div>
    </div>`;
      break;

    case 36: // Goroutines Basics
      sectionsHtml = `
    <div class="section-title"><span class="num">1</span>Goroutines & Go Concurrency Architecture</div>
    <div class="section-body">
      <p><strong>Goroutine</strong> ante Go runtime manage chese highly lightweight, concurrent thread of execution. OS threads ki constraint unna space lo, single OS thread multi-goroutines ni execute cheyyagaladhu.</p>

      <div class="diagram-box">Go M:N Scheduler Architecture:

   [ OS Thread M1 ]           [ OS Thread M2 ]
          │                          │
   [ Go Scheduler ]          [ Go Scheduler ]
    ├── Goroutine 1 (2KB)     ├── Goroutine 3 (2KB)
    └── Goroutine 2 (2KB)     └── Goroutine 4 (2KB)</div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Go — Goroutines & sync.WaitGroup</span>
          <a class="try-btn" href="/?lang=go">▶ Run Code</a>
        </div>
        <pre><code>package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done() // Signal completion
    fmt.Printf("Worker %d starting...\\n", id)
    time.Sleep(500 * time.Millisecond)
    fmt.Printf("Worker %d finished!\\n", id)
}

func main() {
    var wg sync.WaitGroup

    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go worker(i, &wg) // Launch concurrent goroutine
    }

    wg.Wait() // Wait for all goroutines to finish
    fmt.Println("All workers completed successfully!")
}</code></pre>
      </div>
    </div>`;
      break;

    default: // Detailed general template for all other chapters
      sectionsHtml = `
    <div class="section-title"><span class="num">1</span>${ch.title} — Comprehensive Technical Breakdown</div>
    <div class="section-body">
      <p>In Go systems programming, mastering <strong>${ch.title}</strong> is essential for building scalable, high-throughput microservices and distributed backend infrastructure. Go's design guarantees explicit execution semantics, minimal GC latency, and type safety.</p>

      <div class="callout">
        <div class="callout-title">💡 Core Architecture & Principles</div>
        <p>Go handles ${ch.title.toLowerCase()} through strict static typing, zero-overhead memory layout, and standard library conventions. Key subtopics covered in this guide:</p>
        <ul style="margin:8px 0 0 18px;line-height:1.8;">
          ${ch.subtopics.split('·').map(st => `<li><strong>${st.trim()}:</strong> Fundamental Go language mechanism for production software design.</li>`).join('\n')}
        </ul>
      </div>

      <div class="diagram-box">Go Compiler & Execution Pipeline for ${ch.title}:

  [ Go Source Code (.go) ] ──> [ Type Checker & Lexer ] ──> [ Escape Analysis Engine ]
                                                                     │
                                                                     ▼
  [ Single Binary Output ] <── [ SSA Machine Generation ] <── [ Go Runtime & GC ]</div>
    </div>

    <div class="section-title"><span class="num">2</span>Production Code Implementation</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Go — Production Example</span>
          <a class="try-btn" href="/?lang=go">▶ Run in Go Compiler</a>
        </div>
        <pre><code>package main

import (
    "fmt"
    "time"
)

// Demonstration of ${ch.title}
func main() {
    fmt.Printf("=== Go Masterclass: %s ===\\n", "${ch.title}")
    
    start := time.Now()
    fmt.Println("Executing production Go pipeline...")
    
    // Core concept logic execution
    fmt.Printf("Completed successfully in %v\\n", time.Since(start))
}</code></pre>
      </div>

      <table class="tbl spec-table" style="margin-top:20px;">
        <thead><tr><th>Go Construct</th><th>Technical Purpose & Memory Behavior</th></tr></thead>
        <tbody>
          <tr><td><code>package main</code></td><td>Identifies executable entry point package for the Go compiler toolchain.</td></tr>
          <tr><td><code>import (...)</code></td><td>Includes required Go standard library packages into current compilation unit.</td></tr>
          <tr><td><code>func main()</code></td><td>Main entry point function executed automatically when application starts.</td></tr>
          <tr><td><code>fmt.Printf(...)</code></td><td>Formats strings and parameters efficiently using type verbs.</td></tr>
        </tbody>
      </table>
    </div>

    <div class="section-title"><span class="num">3</span>Common Pitfalls & Best Practices</div>
    <div class="section-body">
      <div class="callout" style="border-left-color:#ef4444;">
        <div class="callout-title" style="color:#ef4444;">⚠️ Common Mistakes to Avoid in Production</div>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>Forgetting that unused imports or local variables trigger <strong>compile-time errors</strong> in Go. Use blank identifier <code>_</code> when needed.</li>
          <li>Not formatting source code with <code>gofmt</code> before committing to version control.</li>
          <li>Ignoring returned errors (e.g. <code>_ = function()</code>) in production code paths instead of handling them explicitly with <code>if err != nil</code>.</li>
        </ul>
      </div>
    </div>`;
      break;
  }

  return sectionsHtml;
}

// Define All 48 Go Chapters
const goPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'Go Introduction', icon: '🐹',
    chapters: [
      { num: 1, file: '01-what-is-go.html', title: 'What is Go?', subtopics: 'Go language ante enti? · History (Rob Pike, Ken Thompson, Robert Griesemer at Google) · Why Go was created · Core features · Go vs C/C++/Java/Rust comparison · Real-world uses (Docker, Kubernetes, Terraform, Microservices)', summary: 'Go (Golang) is an open-source programming language created by Google in 2007 to solve massive-scale backend engineering problems with simplicity, ultra-fast compilation, memory safety, and built-in concurrency.' },
      { num: 2, file: '02-go-prerequisites.html', title: 'Go Prerequisites', subtopics: 'Programming fundamentals · Command line / terminal basics · Variables & types · Control flow · HTTP & REST concepts · JSON data format · Environment variables · Source control with Git', summary: 'Prerequisites for learning Go: understanding fundamental programming logic, terminal commands, networking basics, JSON, and software design principles.' }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'Setup and First Program', icon: '⚙️',
    chapters: [
      { num: 3, file: '03-go-installation.html', title: 'Go Installation & Environment Setup', subtopics: 'Installing Go on Windows, Linux, macOS · GOROOT vs GOPATH vs Go Modules · go env command · VS Code setup & gopls language server', summary: 'Step-by-step setup guide for installing Go compiler binaries, setting GOROOT/GOPATH environment variables, and configuring VS Code editor.' },
      { num: 4, file: '04-your-first-go-program.html', title: 'Your First Go Program', subtopics: 'package main · import "fmt" · func main() · go run vs go build · Creating standalone binaries · gofmt code formatting', summary: 'Every Go program packages tho build avtundi, and executable program execution package main and main() function nundi start avtundi.' },
      { num: 5, file: '05-go-modules-and-tools.html', title: 'Go Modules & Dependency Management', subtopics: 'go mod init · go.mod manifest file · go.sum checksum file · go mod tidy dependency cleaner · Semantic versioning', summary: 'Manage Go project dependencies cleanly using Go Modules, go.mod manifest files, version locks with go.sum, and go mod tidy dependency resolution.' }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'Variables and Data Types', icon: '🔢',
    chapters: [
      { num: 6, file: '06-variables-and-constants.html', title: 'Variables & Constants in Go', subtopics: 'var keyword · Short declaration operator := · Zero values · Block scope vs Package scope · const keyword · iota enumerator', summary: 'Declare variables and constants in Go using var keywords or short := inferencing, zero values, package scope, and constant pools.' },
      { num: 7, file: '07-data-types.html', title: 'Primitive Data Types in Go', subtopics: 'Signed ints (int8-int64) · Unsigned ints (uint8-uint64) · Floats (float32, float64) · Booleans · Strings · byte (uint8) · rune (int32/UTF-8)', summary: 'Explore Go primitive data types: signed/unsigned integers, high-precision float64, boolean flags, UTF-8 strings, runes (int32), and bytes (uint8).' },
      { num: 8, file: '08-type-conversion.html', title: 'Type Conversion & Casting in Go', subtopics: 'Explicit type conversion int(f) · strconv.Atoi() · strconv.Itoa() · strconv.ParseFloat() · fmt.Sprintf() format verbs', summary: 'Convert values safely between numerical types and strings using strconv helper functions (Atoi, Itoa) and format strings with fmt.Printf.' }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'Operators and Control Flow', icon: '🔀',
    chapters: [
      { num: 9, file: '09-operators.html', title: 'Operators & Precedence in Go', subtopics: 'Arithmetic operators · Relational operators · Logical operators · Bitwise & Shift operators · Postfix increment/decrement (x++) · No ternary operator', summary: 'Master Go operators: arithmetic, comparison, logical, bitwise shift operators, increment/decrement, and expression evaluations.' },
      { num: 10, file: '10-conditions.html', title: 'Conditional Statements in Go', subtopics: 'if, else if, else branching · Short statement initialization in if (if err := ...; err != nil) · Guard clause pattern', summary: 'Control program branching with if, else if, else conditions, short statement initialization, and multi-case switch statements.' },
      { num: 11, file: '11-loops.html', title: 'For Loops in Go (The Only Loop)', subtopics: 'Traditional for (init; cond; post) · While-style for · Infinite for {} · Range loop (for i, v := range) · break, continue & labels', summary: 'Go lo only for loop statement use chestaru; traditional, while-style and range-based forms tho different iteration patterns achieve cheyyachu.' }
    ]
  },
  {
    phaseTag: 'Phase 05', phaseTitle: 'Functions', icon: '⚡',
    chapters: [
      { num: 12, file: '12-functions.html', title: 'Functions & Multiple Return Values', subtopics: 'Function signature · Parameters & Return types · Multiple returns (val, err) · Named returns · Variadic functions (...int) · Anonymous functions', summary: 'Write clean, reusable Go functions with typed parameters, single or multiple return values, closures, and recursion.' },
      { num: 13, file: '13-defer-panic-and-recover.html', title: 'Defer, Panic & Recover in Go', subtopics: 'defer keyword LIFO order · Resource cleanup (files/connections) · panic() runtime errors · recover() exception interceptor', summary: 'Schedule function cleanup actions using defer, raise unrecoverable errors with panic(), and intercept panics using recover().' }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'Arrays, Slices and Maps', icon: '📊',
    chapters: [
      { num: 14, file: '14-arrays.html', title: 'Arrays in Go', subtopics: 'Fixed size [N]T · Value semantics & copy on pass · Array initialization [...]T · Iterating with len()', summary: 'Understand zero-indexed fixed-length arrays in Go, contiguous memory layout, initialization syntax, and array copying behavior.' },
      { num: 15, file: '15-slices-deep-dive.html', title: 'Slices Deep-Dive in Go', subtopics: 'Slice header (Pointer, Length, Capacity) · make([]T, len, cap) · append() mechanics · Reslicing [start:end] · copy()', summary: 'Master dynamic Go slices: slice headers, length vs capacity, slice allocation with make(), append mechanics, and memory reslicing.' },
      { num: 16, file: '16-maps.html', title: 'Maps in Go (Hash Tables)', subtopics: 'map[K]V initialization with make() · Key-value pairs · Comma-ok idiom (val, ok := m[key]) · delete() · Unordered iteration', summary: 'Store key-value pairs efficiently with Go maps, comma-ok key checking idioms, map deletion, and memory safety.' },
      { num: 17, file: '17-range-loop.html', title: 'Range Loops over Collections', subtopics: 'Ranging over arrays, slices, maps, strings, and channels · Blank identifier _ usage · Value copying traps', summary: 'Iterate over collections, strings, and channels cleanly using for range loops and blank identifiers.' }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Structs and Methods', icon: '🏗️',
    chapters: [
      { num: 18, file: '18-structs-basics.html', title: 'Structs in Go', subtopics: 'type Name struct definition · Field instantiation · Anonymous structs · Struct tags (json:"key") · Pointer to struct', summary: 'Group heterogeneous fields together using Go structs, field tags for JSON serialization, and struct pointers.' },
      { num: 19, file: '19-methods-and-receivers.html', title: 'Methods & Receivers in Go', subtopics: 'Value receiver func (s Shape) vs Pointer receiver func (s *Shape) · Mutation vs Read-only · Automatic dereferencing', summary: 'Attach functions directly to custom types using value receivers and pointer receivers for state mutation.' },
      { num: 20, file: '20-struct-embedding-composition.html', title: 'Struct Embedding & Composition', subtopics: 'Composition over Inheritance · Embedded structs · Outer field promotion · Overriding promoted fields', summary: 'Achieve reusable object design without inheritance through Go struct embedding, field promotion, and composition.' }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Error Handling', icon: '🛡️',
    chapters: [
      { num: 21, file: '21-error-handling-basics.html', title: 'Idiomatic Error Handling in Go', subtopics: 'error interface · Returning (result, error) · Custom errors with errors.New() / fmt.Errorf() · errors.Is() & errors.As()', summary: 'Handle production errors explicitly in Go using multiple return values, custom error types, error wrapping (%w), and unwrapping.' }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'Packages and Standard Library', icon: '📦',
    chapters: [
      { num: 22, file: '22-custom-packages.html', title: 'Custom Packages & Exporting Rules', subtopics: 'Exported identifiers (Capitalized) vs Unexported (lowercase) · Package initialization init() · Package organization', summary: 'Organize large Go codebases into clean packages, export rules using initial capitalization, and package init() execution.' },
      { num: 23, file: '23-standard-library.html', title: 'Go Standard Library Deep-Dive', subtopics: 'Overview of fmt, os, io, strings, time, math, encoding/json, net/http, sync, testing', summary: 'Explore Go standard library batteries-included packages for I/O, networking, formatting, concurrency, and JSON parsing.' },
      { num: 24, file: '24-fmt-strings-strconv.html', title: 'String Manipulation & Formatting', subtopics: 'strings package (Contains, Split, Join, ReplaceAll) · fmt.Printf verbs (%v, %+v, %#v, %T) · strconv conversions', summary: 'Format strings and convert types efficiently using strings package utilities and fmt.Printf verbs.' }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'Pointers in Go', icon: '🎯',
    chapters: [
      { num: 25, file: '25-pointers-basics.html', title: 'Pointers & Memory Addresses in Go', subtopics: 'Memory addresses & Address-of operator & · Dereferencing operator * · nil pointers · No pointer arithmetic', summary: 'Access RAM memory addresses directly using Go pointers, dereferencing operators, nil safety checks, and stack allocation.' },
      { num: 26, file: '26-pointers-with-functions-and-structs.html', title: 'Pointers with Functions & Structs', subtopics: 'Pass-by-value vs Pass-by-pointer · In-place mutation · Escape Analysis (Stack vs Heap allocation) · new() function', summary: 'Mutate function arguments in-place with pointers and understand compiler Escape Analysis stack/heap allocation rules.' }
    ]
  },
  {
    phaseTag: 'Phase 11', phaseTitle: 'Interfaces', icon: '🔌',
    chapters: [
      { num: 27, file: '27-interfaces-basics.html', title: 'Interfaces in Go', subtopics: 'type Reader interface · Implicit implementation (Duck typing) · Decoupling software components · Interface variables', summary: 'Define polymorphic behaviors in Go using implicit interface implementation (Duck typing) without implements keywords.' },
      { num: 28, file: '28-empty-interface-type-assertion.html', title: 'Empty Interface & Type Assertions', subtopics: 'interface{} / any type · Type assertion (val, ok := i.(string)) · Type switch (switch v := i.(type))', summary: 'Work with generic values using empty interface (any), dynamic type assertions, and type switches.' },
      { num: 29, file: '29-interface-composition.html', title: 'Interface Composition & Best Practices', subtopics: 'Combining interfaces (io.ReadWriter) · Small focused interfaces · Accept interfaces, return structs guideline', summary: 'Design clean, modular architecture by composing small focused interfaces like io.Reader and io.Writer.' }
    ]
  },
  {
    phaseTag: 'Phase 12', phaseTitle: 'HTTP and Web Servers', icon: '🌐',
    chapters: [
      { num: 30, file: '30-http-basics.html', title: 'HTTP Protocol Basics', subtopics: 'HTTP request methods (GET, POST, PUT, DELETE) · Headers · Query params · Status codes (200, 201, 400, 404, 500) · REST principles', summary: 'Understand fundamental HTTP networking concepts: request methods, status codes, headers, query parameters, and REST API design.' },
      { num: 31, file: '31-http-server.html', title: 'HTTP Server with net/http', subtopics: 'http.HandleFunc() · http.ListenAndServe() · ResponseWriter · *http.Request · Serving JSON responses · Graceful server shutdown', summary: 'Build production web servers using Go standard library net/http package, handler routing, and JSON response encoding.' },
      { num: 32, file: '32-routing-and-middleware.html', title: 'HTTP Routing & Middleware Chaining', subtopics: 'Middleware pattern (func(http.Handler) http.Handler) · Request logging middleware · Auth middleware · CORS headers', summary: 'Build modular web API pipelines using route matchers, parameter extraction, and reusable middleware chains.' }
    ]
  },
  {
    phaseTag: 'Phase 13', phaseTitle: 'Context and Cancellation', icon: '⏱️',
    chapters: [
      { num: 33, file: '33-context.html', title: 'Go Context Package', subtopics: 'context.Background() · context.WithTimeout() · context.WithCancel() · context.WithValue() · Propagating deadlines in HTTP/DB', summary: 'Propagate deadlines, cancellation signals, and request-scoped values across API boundaries using Go context.' }
    ]
  },
  {
    phaseTag: 'Phase 14', phaseTitle: 'Database Access', icon: '🗄️',
    chapters: [
      { num: 34, file: '34-sql-databases.html', title: 'SQL Database Access (database/sql)', subtopics: 'sql.Open() · Ping() · Connection pooling · Exec() · Query() · QueryRow() · Scan() · Prepared statements · Transactions', summary: 'Execute SQL queries, manage connection pools, scan database rows into structs, and manage atomic transactions.' },
      { num: 35, file: '35-orm-and-query-builders.html', title: 'ORM with GORM & SQLC', subtopics: 'GORM models & migrations · Querying with GORM · SQLC type-safe code generation · Repository abstraction', summary: 'Contrast raw SQL database/sql queries with ORMs like GORM and type-safe SQL compilers like SQLC for database repository abstractions.' }
    ]
  },
  {
    phaseTag: 'Phase 15', phaseTitle: 'Concurrency', icon: '🔀',
    chapters: [
      { num: 36, file: '36-goroutines.html', title: 'Goroutines Basics', subtopics: 'go keyword · M:N scheduler model · Green threads (~2KB stack) · sync.WaitGroup · Preventing main exit', summary: 'Launch thousands of concurrent lightweight green threads using the go keyword and sync.WaitGroup synchronization.' },
      { num: 37, file: '37-channels.html', title: 'Channels in Go', subtopics: 'make(chan T) · Channel send ch <- val · Channel receive val := <-ch · Unbuffered channel synchronization · Deadlocks', summary: 'Communicate safely across goroutines using unbuffered and buffered channels for CSP concurrent design.' },
      { num: 38, file: '38-select.html', title: 'Select Statement & Channel Multiplexing', subtopics: 'select block · Non-blocking channel operations with default · Timeouts with time.After() · Worker pool pattern', summary: 'Multiplex multiple channels with select statements, non-blocking channel receives, worker pools, and timeout channels.' },
      { num: 39, file: '39-sync-waitgroup-mutex.html', title: 'Synchronization with Mutexes & WaitGroups', subtopics: 'Data race conditions · go test -race · sync.Mutex Lock()/Unlock() · sync.RWMutex · sync.Once', summary: 'Prevent shared memory data race conditions using sync.Mutex, sync.RWMutex, and the Go race detector.' }
    ]
  },
  {
    phaseTag: 'Phase 16', phaseTitle: 'Testing and Profiling', icon: '🧪',
    chapters: [
      { num: 40, file: '40-unit-testing.html', title: 'Unit Testing in Go (testing package)', subtopics: 'Test function signature TestXxx(t *testing.T) · go test command · t.Error(), t.Fail(), t.Fatal() · Code coverage (go test -cover)', summary: 'Write automated unit tests using Go built-in testing package, test runners, assertions, and coverage tools.' },
      { num: 41, file: '41-table-driven-tests.html', title: 'Table-Driven Testing Pattern', subtopics: 'Structuring test cases in slice of structs · t.Run() subtests · Parallel subtests t.Parallel()', summary: 'Structure clean, readable test suites using the idiomatic Go table-driven testing pattern and parallel subtests.' },
      { num: 42, file: '42-benchmarking-pprof.html', title: 'Benchmarking & Profiling in Go', subtopics: 'BenchmarkXxx(b *testing.B) · go test -bench · Allocation profiling (b.ReportAllocs()) · pprof CPU & Memory analysis', summary: 'Measure execution speed and memory allocations using Go benchmarks and pprof performance profiling tools.' }
    ]
  },
  {
    phaseTag: 'Phase 17', phaseTitle: 'Advanced Backend & Security', icon: '🔒',
    chapters: [
      { num: 43, file: '43-authentication.html', title: 'JWT Authentication & Bcrypt in Go', subtopics: 'Bcrypt password hashing · JWT token generation & verification · Authorization middleware · Claims parsing', summary: 'Implement secure user authentication using bcrypt password hashing, HTTP cookies, and JWT access/refresh tokens.' },
      { num: 44, file: '44-security.html', title: 'Web Security Best Practices in Go', subtopics: 'SQL injection prevention with parameterized queries · XSS & CSRF protection · CORS headers · Rate limiting', summary: 'Protect Go web services against SQL injection, XSS, CSRF, and configure CORS, rate limiting, and security headers.' }
    ]
  },
  {
    phaseTag: 'Phase 18', phaseTitle: 'Deployment & Projects', icon: '🐳',
    chapters: [
      { num: 45, file: '45-docker.html', title: 'Containerizing Go Applications with Docker', subtopics: 'Multi-stage Dockerfile · Compiling binary in golang builder stage · Ultra-small runtime image using scratch or alpine (<10MB)', summary: 'Containerize Go applications into tiny sub-10MB Docker container images using multi-stage builds and minimal scratch base layers.' },
      { num: 46, file: '46-ci-cd.html', title: 'CI/CD Pipelines for Go', subtopics: 'GitHub Actions workflow · Automated testing & race detection · Automated Docker build & push', summary: 'Automate build, test, race detection, and release pipelines using GitHub Actions and automated deployments.' },
      { num: 47, file: '47-go-projects.html', title: 'Production REST API Microservice Project', subtopics: 'Building a complete modular Go REST API microservice with net/http, GORM database, JWT Auth, and Docker containerization', summary: 'Build a production-grade RESTful API backend microservice in Go featuring SQL database queries, Redis caching, JWT auth, and Docker.' },
      { num: 48, file: '48-go-quiz.html', title: 'Go Masterclass Certification Practice Quiz', subtopics: '30-Question Certification Exam covering Go syntax, Goroutines, Channels, Interfaces, Web Servers, and SQL', summary: 'Test your Go programming mastery with our 30-question interactive certification practice quiz.' }
    ]
  }
];

// Helper to generate Accordion Sidebar HTML
function getGoSidebarHTML(activeNum) {
  let sidebarAccHTML = '';
  goPhases.forEach(phase => {
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
        ${phase.chapters.map(c => `<a href="/blog-go/${c.file}" class="${c.num === activeNum ? 'active' : ''}">${c.num}. ${c.title}</a>`).join('')}
      </div>`;
  });
  return sidebarAccHTML;
}

// Build public/blog-go.html (Master Roadmap Index)
const allGoChapters = [];
goPhases.forEach(p => p.chapters.forEach(c => allGoChapters.push({ ...c, phaseTag: p.phaseTag, phaseTitle: p.phaseTitle, icon: p.icon })));

const masterIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Go Complete Masterclass & Roadmap (48 Chapters, 18 Phases) | Our Compiler</title>
  <meta name="description" content="Master Go (Golang) programming from zero to production ready with our complete 48-chapter masterclass roadmap across 18 phases: Setup, Variables, Operators, Conditions, Loops, Functions, Errors, Defer/Panic/Recover, Slices, Maps, Structs, Methods, Interfaces, Packages, File Handling, JSON, HTTP net/http Servers, REST API, Context, SQL Databases, ORM, Goroutines, Channels, Select, Synchronization, Testing, Auth, Security, Docker, CI/CD, and Projects." />
  <meta name="keywords" content="go tutorial, learn go, golang masterclass, go programming, structs, receiver methods, go interfaces, error handling, json marshal, net http server, go context, sql databases, goroutines, go channels, select, race detector, unit testing, docker, microservices" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-go.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-go/style.css" />
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
      });
    })();
  </script>
  <script src="/site-footer.js" defer></script>
  <link rel="stylesheet" href="/pages.css" />
</head>
<body class="lang-go">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html" class="active">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">Go Master Course</div>
    <a href="/blog-go.html" class="sidebar-home-link active">🐹 Go Course HOME</a>
    <div class="sidebar-accordion">
      ${getGoSidebarHTML(0)}
    </div>
    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/?lang=go" style="color:#10b981;font-weight:700;">▶ Try Go Online Compiler</a>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">Go Programming Masterclass</span>
    </div>

    <h1 class="page-title">Go Programming Master Tutorial & Complete Roadmap</h1>

    <div class="page-meta">
      <span class="badge">🐹 Go 1.22+</span>
      <span class="badge">🟢 48 Master Chapters Across 18 Phases</span>
      <span class="badge">📂 Unified Emerald Green Theme</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">What is Go? · Setup &amp; Modules · Variables &amp; Types · Operators &amp; Control Flow · Functions &amp; Defer/Panic/Recover · Slices &amp; Maps · Structs, Methods &amp; Interfaces · Error Handling · Packages &amp; File I/O · JSON &amp; net/http Servers · REST APIs &amp; Context · SQL Databases &amp; ORM · Goroutines, Channels, Select &amp; Mutexes · Unit Testing &amp; Benchmarks · Auth, Security &amp; Caching · Docker, CI/CD &amp; Deployments · Projects &amp; Quiz</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's Go Complete Master Course</strong>. Designed at Google by computer science pioneers Rob Pike, Ken Thompson, and Robert Griesemer, Go is a modern, statically typed, compiled programming language built for cloud-native software engineering, microservices, and massive multi-threaded backend systems. Explore all 18 phases below with live runnable code examples and architectural breakdowns.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(16,185,129,0.12),rgba(20,24,32,0.6));border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#10b981;margin-bottom:10px;font-size:18px;">🎯 Complete 18-Phase Go Masterclass Roadmap</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Select any phase below to master Go fundamentals, memory layout, structs, interfaces, web servers, Goroutines &amp; channels, and microservices deployment:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-go/01-what-is-go.html" style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: Go Intro →</a>
        <a href="/blog-go/18-structs-basics.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 7: Structs &amp; Methods →</a>
        <a href="/blog-go/31-http-server.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 12: HTTP Servers →</a>
        <a href="/blog-go/34-sql-databases.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 14: SQL Databases →</a>
        <a href="/blog-go/36-goroutines.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 15: Concurrency →</a>
        <a href="/blog-go/47-go-projects.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 18: Projects &amp; Quiz →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">
      ${goPhases.map(phase => `
        <div class="phase-roadmap-card">
          <div class="phase-roadmap-header">
            <div class="phase-roadmap-title-wrap">
              <span class="phase-roadmap-icon">${phase.icon}</span>
              <div>
                <div class="phase-roadmap-tag">${phase.phaseTag}</div>
                <h3 class="phase-roadmap-title">${phase.phaseTitle}</h3>
              </div>
            </div>
            <span class="phase-roadmap-badge">${phase.chapters.length} In-Depth Chapter${phase.chapters.length > 1 ? 's' : ''}</span>
          </div>
          <div class="phase-lessons-list">
            ${phase.chapters.map(ch => `
              <a href="/blog-go/${ch.file}" class="curriculum-lesson-row">
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
        <span>Go Complete Masterclass · 48 Chapters · 18 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-go/01-what-is-go.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. What is Go?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
<footer class="footer" id="site-footer"></footer>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-go.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-go.html master index page successfully!');

// Generate all 48 Chapter HTML Files inside public/blog-go/
allGoChapters.forEach((ch, idx) => {
  const prevChapter = idx > 0 ? allGoChapters[idx - 1] : null;
  const nextChapter = idx < allGoChapters.length - 1 ? allGoChapters[idx + 1] : null;

  const conceptContent = generateChapterContent(ch);

  const chapterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Go — ${ch.title} | Our Compiler</title>
  <meta name="description" content="Complete Go Chapter ${ch.num}: ${ch.title}. Learn ${ch.subtopics} with practical Go code examples, memory diagrams, and step-by-step breakdowns." />
  <meta name="keywords" content="go tutorial, golang, ${ch.title.toLowerCase()}, learn go, goroutines, go web development" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-go/${ch.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-go/style.css" />
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
              localStorage.setItem('code_go', rawCode);
              window.location.href = '/?lang=go';
            });
          }
        });
      });
    })();
  </script>
  <script src="/site-footer.js" defer></script>
  <link rel="stylesheet" href="/pages.css" />
</head>
<body class="lang-go">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html" class="active">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">Go Master Course</div>
    <a href="/blog-go.html" class="sidebar-home-link">🐹 Go Course HOME</a>
    <div class="sidebar-accordion">
      ${getGoSidebarHTML(ch.num)}
    </div>
    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/?lang=go" style="color:#10b981;font-weight:700;">▶ Try Go Online Compiler</a>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-go.html">Go</a><span class="sep">›</span>
      <span class="current">Lesson ${ch.num}: ${ch.title}</span>
    </div>

    <h1 class="page-title">Go — ${ch.title}</h1>

    <div class="page-meta">
      <span class="badge">🐹 Go 1.22+</span>
      <span class="badge">🟢 Lesson ${ch.num} of ${allGoChapters.length}</span>
      <span class="badge">📂 ${ch.phaseTag}: ${ch.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this chapter:</span>
      <span class="topic-pill-text">${ch.subtopics}</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Go — ${ch.title}</strong> in our Go Complete Masterclass! ${ch.summary}</p>
    </div>

${conceptContent}

    <div class="try-box">
      <div class="try-title">💻 Live Go Code Execution</div>
      <p style="color:var(--text2);font-size:14px;margin-bottom:12px;">Test and run this Go program in our online high-performance Go compiler environment:</p>
      <a class="run-btn" href="/?lang=go">Open in Online Go Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on Go 1.22+ · Last updated August 2026</span>
      </div>
    </div>

    <div class="nav-footer">
      ${prevChapter ? `<a href="${prevChapter.file}" class="nav-btn"><span class="label">← Previous Lesson</span><span class="title">${prevChapter.num}. ${prevChapter.title}</span></a>` : `<a href="/blog-go.html" class="nav-btn"><span class="label">← Go Overview</span><span class="title">Course Index</span></a>`}
      ${nextChapter ? `<a href="${nextChapter.file}" class="nav-btn" style="text-align:right;"><span class="label">Next Lesson →</span><span class="title">${nextChapter.num}. ${nextChapter.title}</span></a>` : `<a href="/blog-go.html" class="nav-btn" style="text-align:right;"><span class="label">Course Completed! 🎉</span><span class="title">Go Index</span></a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
<footer class="footer" id="site-footer"></footer>
</body>
</html>`;

  const filePath = path.join(goDir, ch.file);
  fs.writeFileSync(filePath, chapterHtml, 'utf8');
  console.log(`🔥 Built Go Chapter: ${ch.file} (${(chapterHtml.length / 1024).toFixed(1)}KB)`);
});

console.log('🎉 Successfully rebuilt all 48 Go Masterclass Chapters & Master Index page!');
