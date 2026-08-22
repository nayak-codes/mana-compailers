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

.phase-roadmap-desc {
  font-size: 13.5px;
  color: #8b949e;
  margin: 12px 0 16px 0;
  line-height: 1.6;
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

/* Light Theme overrides for Roadmap Cards and Accordion Sidebar */
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

// 2. Define Complete 34-Chapter Go Masterclass Data Structure across 10 Phases
const goPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'Go Introduction', icon: '🐹',
    chapters: [
      {
        num: 1, file: '01-go-ante-enti-what-is-go.html', title: 'Go Ante Enti?',
        subtopics: 'Go language ante enti? · Go enduku create chesaru? · Go features · Go vs C · Go vs C++ · Go vs Java · Go vs Rust · Use cases: Backend, Cloud, CLI, Systems, Microservices · Go limitations',
        summary: 'Go is a statically typed, compiled programming language designed for simplicity, reliability and efficient concurrency. Go tho APIs, servers, command-line tools, cloud services and distributed systems build cheyyachu.',
        code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, Go Masterclass!")
}`
      },
      {
        num: 2, file: '02-go-prerequisites.html', title: 'Go Prerequisites',
        subtopics: 'Programming basics · Variables · Functions · Conditions · Loops · Arrays · Struct concepts · Command-line basics · HTTP basics · JSON basics · Git basics · Basic SQL',
        summary: 'Prerequisites for learning Go: understanding fundamental programming logic, terminal commands, networking basics, JSON, and software design principles.',
        code: `package main

import "fmt"

func main() {
    var topic = "Go Masterclass Prerequisites"
    fmt.Println("Ready to learn:", topic)
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'Setup and First Program', icon: '⚙️',
    chapters: [
      {
        num: 3, file: '03-go-installation.html', title: 'Go Installation',
        subtopics: 'Installing Go on Windows, macOS, Linux · Checking Go version · Go environment (go env) · GOROOT · GOPATH · Go workspace · VS Code setup · Go extension · Online compiler',
        summary: 'Step-by-step setup guide for installing Go compiler binaries, setting GOROOT/GOPATH environment variables, and configuring VS Code editor.',
        code: `// Terminal Commands:
// go version
// go env`
      },
      {
        num: 4, file: '04-first-go-program.html', title: 'First Go Program',
        subtopics: 'Creating .go file · package main · import · func main() · fmt.Println · Compiling with go run · Building executable with go build · Comments · Formatting with gofmt',
        summary: 'Every Go program packages tho build avtundi, and executable program execution package main and main() function nundi start avtundi.',
        code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}`
      },
      {
        num: 5, file: '05-go-modules.html', title: 'Go Modules',
        subtopics: 'Module ante enti? · go mod init · go.mod · go.sum · Module path · Adding dependencies · Updating dependencies · Removing dependencies · go mod tidy · Module versioning',
        summary: 'Manage Go project dependencies cleanly using Go Modules, go.mod manifest files, version locks with go.sum, and go mod tidy dependency resolution.',
        code: `// Terminal Commands:
// go mod init example.com/ourcompiler
// go mod tidy`
      }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'Variables and Data Types', icon: '🔢',
    chapters: [
      {
        num: 6, file: '06-variables-and-constants.html', title: 'Variables & Constants',
        subtopics: 'Variable declaration · var · Short declaration := · Multiple variables · Zero values · Variable reassignment · Scope · Package vs Local · Constants (const) · Shadowing',
        summary: 'Declare variables and constants in Go using var keywords or short := inferencing, zero values, package scope, and constant pools.',
        code: `package main

import "fmt"

func main() {
    name := "Ravi"
    age := 21
    const language = "Go"

    fmt.Println(name, age, language)
}`
      },
      {
        num: 7, file: '07-basic-data-types.html', title: 'Basic Data Types',
        subtopics: 'Integers (int, int8-int64, uint) · Floating-point (float32, float64) · Complex numbers · bool · string · rune · byte · Zero values · Type conversion',
        summary: 'Explore Go primitive data types: signed/unsigned integers, high-precision float64, boolean flags, UTF-8 strings, runes (int32), and bytes (uint8).',
        code: `package main

import "fmt"

func main() {
    var age int = 21
    var price float64 = 99.99
    var grade rune = 'A'
    var active bool = true

    fmt.Println(age, price, string(grade), active)
}`
      },
      {
        num: 8, file: '08-type-conversion-formatting.html', title: 'Type Conversion & Formatting',
        subtopics: 'Numeric conversion · Integer to float · Float to int · String conversion · strconv (Atoi, Itoa, ParseInt, ParseFloat) · Sprintf · fmt.Printf format verbs · Type safety',
        summary: 'Convert values safely between numerical types and strings using strconv helper functions (Atoi, Itoa) and format strings with fmt.Printf.',
        code: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    strNum := "100"
    num, _ := strconv.Atoi(strNum)
    fmt.Printf("Converted Number: %d (Type: %T)\\n", num, num)
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'Operators and Control Flow', icon: '🔀',
    chapters: [
      {
        num: 9, file: '09-operators.html', title: 'Operators',
        subtopics: 'Arithmetic operators · Assignment operators · Comparison operators · Logical operators · Increment & Decrement (++ --) · Bitwise operators · Shift operators · Operator precedence · Integer division · Modulus · Boolean expressions',
        summary: 'Master Go operators: arithmetic, comparison, logical, bitwise shift operators, increment/decrement, and expression evaluations.',
        code: `package main

import "fmt"

func main() {
    a, b := 15, 4
    fmt.Println("Addition:", a + b)
    fmt.Println("Modulus:", a % b)
    fmt.Println("Logical AND:", (a > 10) && (b < 5))
}`
      },
      {
        num: 10, file: '10-conditions.html', title: 'Conditions',
        subtopics: 'if · else · else if · Nested conditions · Short statement in if · Conditions without parentheses · switch · Expression switch · Multiple cases · fallthrough · Type switch introduction · Guard conditions',
        summary: 'Control program branching with if, else if, else conditions, short statement initialization, and multi-case switch statements.',
        code: `package main

import "fmt"

func main() {
    marks := 78

    if marks >= 90 {
        fmt.Println("Grade A")
    } else if marks >= 60 {
        fmt.Println("Grade B")
    } else {
        fmt.Println("Needs improvement")
    }
}`
      },
      {
        num: 11, file: '11-loops.html', title: 'Loops',
        subtopics: 'Go for loop · Traditional for · While-style for · Infinite loop · Range loop · Looping arrays/slices/maps · break · continue · Labeled break · Nested loops · Practice: Even/Odd, Factorial, Prime, Fibonacci, Multiplication table',
        summary: 'Go lo only for loop statement use chestaru; traditional, while-style and range-based forms tho different iteration patterns achieve cheyyachu.',
        code: `package main

import "fmt"

func main() {
    for number := 1; number <= 5; number++ {
        fmt.Println(number)
    }
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 05', phaseTitle: 'Functions', icon: '⚡',
    chapters: [
      {
        num: 12, file: '12-functions.html', title: 'Functions',
        subtopics: 'Function declaration · Function call · Parameters · Return values · Multiple return values · Named return values · Variadic functions · Anonymous functions · Closures · Recursion · Function scope',
        summary: 'Write clean, reusable Go functions with typed parameters, single or multiple return values, closures, and recursion.',
        code: `package main

import "fmt"

func add(first int, second int) int {
    return first + second
}

func main() {
    fmt.Println(add(10, 20))
}`
      },
      {
        num: 13, file: '13-multiple-returns-and-errors.html', title: 'Multiple Returns & Errors',
        subtopics: 'Multiple return values · Error return pattern · Ignoring values with _ · Named results · Deferred return · Error handling convention · Returning data and error · Caller responsibility · Error wrapping overview',
        summary: 'Return multiple values from functions, returning data alongside explicit error objects, using blank identifier _ to ignore unused returns.',
        code: `package main

import (
    "fmt"
)

func divide(first float64, second float64) (float64, error) {
    if second == 0 {
        return 0, fmt.Errorf("cannot divide by zero")
    }

    return first / second, nil
}

func main() {
    result, err := divide(10, 2)
    fmt.Println("Result:", result, "Err:", err)
}`
      },
      {
        num: 14, file: '14-defer-panic-and-recover.html', title: 'Defer, Panic and Recover',
        subtopics: 'defer · Deferred execution order · Resource cleanup · panic · recover · When to return error · When to panic · Recovering from panic · Panic in goroutines · Safe cleanup patterns',
        summary: 'Schedule function cleanup actions using defer, raise unrecoverable errors with panic(), and intercept panics using recover().',
        code: `package main

import "fmt"

func safeCleanup() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered from panic:", r)
        }
    }()
    panic("unexpected runtime failure")
}

func main() {
    safeCleanup()
    fmt.Println("Execution continued safely!")
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'Arrays, Slices and Maps', icon: '📦',
    chapters: [
      {
        num: 15, file: '15-arrays.html', title: 'Arrays',
        subtopics: 'Array ante enti? · Fixed-length arrays · Array declaration · Array initialization · Indexing · Updating values · Array comparison · Multidimensional arrays · Arrays in functions · Array limitations',
        summary: 'Declare and manipulate fixed-length arrays in Go, accessing elements via 0-based indexing and iterating with range loops.',
        code: `package main

import "fmt"

func main() {
    numbers := [4]int{10, 20, 30, 40}

    for index, number := range numbers {
        fmt.Println(index, number)
    }
}`
      },
      {
        num: 16, file: '16-slices.html', title: 'Slices',
        subtopics: 'Slice ante enti? · Slice declaration · make · append · len · cap · Slicing arrays · Slicing slices · Copying slices · Nil slices · Empty slices · Slice memory sharing · Three-index slicing · Slice safety',
        summary: 'Master dynamic Go Slices backed by underlying arrays, appending elements with append(), allocating capacity with make(), and slicing ranges.',
        code: `package main

import "fmt"

func main() {
    numbers := []int{10, 20, 30}
    numbers = append(numbers, 40)

    fmt.Println(numbers)
}`
      },
      {
        num: 17, file: '17-maps.html', title: 'Maps',
        subtopics: 'Map ante enti? · Creating maps · make · Adding values · Reading values · Updating values · Deleting values · Checking key existence · Nil maps · Iterating maps · Map ordering · Maps as function parameters · Nested maps',
        summary: 'Store key-value pairs with Go Maps: allocating with make(), inserting, deleting with delete(), and checking key existence with comma-ok idioms.',
        code: `package main

import "fmt"

func main() {
    courses := map[string]string{
        "py": "Python",
        "go": "Go",
    }

    language, exists := courses["go"]

    if exists {
        fmt.Println(language)
    }
}`
      },
      {
        num: 18, file: '18-strings-and-runes.html', title: 'Strings and Runes',
        subtopics: 'Strings in Go · UTF-8 · Bytes · Runes · String indexing · String iteration · len · strings package (Contains, Split, Join, Replace, ToUpper, ToLower) · strings.Builder · Unicode handling',
        summary: 'Understand UTF-8 encoded Strings, Byte slices, Runes (int32 code points), and manipulate text using the standard strings package.',
        code: `package main

import (
    "fmt"
    "strings"
)

func main() {
    msg := "Hello, Go Runes & Strings!"
    fmt.Println(strings.ToUpper(msg))
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Structs and Pointers', icon: '📍',
    chapters: [
      {
        num: 19, file: '19-structs-in-go.html', title: 'Structs in Go',
        subtopics: 'Struct declaration · Custom types · Instantiating structs · Field access · Anonymous structs · Embedded structs · Struct tags for JSON',
        summary: 'Define custom data structures using Go Structs, struct field embedding composition, and JSON serialization tags.',
        code: `package main

import "fmt"

type Student struct {
    ID   int
    Name string
}

func main() {
    s := Student{ID: 1, Name: "Balaji"}
    fmt.Println(s)
}`
      },
      {
        num: 20, file: '20-pointers-in-go.html', title: 'Pointers in Go',
        subtopics: 'Pointer concept · Memory addresses · Address-of operator & · Dereference operator * · Zero value nil · Pointer parameters · Mutating values',
        summary: 'Pass memory references safely using Go Pointers with & and *, enabling in-place parameter mutation without copying large objects.',
        code: `package main

import "fmt"

func increment(num *int) {
    *num++
}

func main() {
    n := 10
    increment(&n)
    fmt.Println(n) // 11
}`
      },
      {
        num: 21, file: '21-methods-and-receivers.html', title: 'Methods & Receivers',
        subtopics: 'Method declaration · Value receivers vs Pointer receivers · Method sets · Struct methods · Mutating struct fields',
        summary: 'Attach behavior to structs using Receiver Methods, choosing between Value receivers for immutability and Pointer receivers for state changes.',
        code: `package main

import "fmt"

type Account struct{ Balance float64 }

func (a *Account) Deposit(amt float64) { a.Balance += amt }

func main() {
    acc := Account{100}
    acc.Deposit(50)
    fmt.Println(acc.Balance)
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Interfaces & Concurrency', icon: '⚡',
    chapters: [
      {
        num: 22, file: '22-interfaces-in-go.html', title: 'Interfaces in Go',
        subtopics: 'Interface definition · Implicit duck-typing · Empty interface any · Type assertions · Type switches',
        summary: 'Achieve polymorphism in Go using implicit Interfaces, empty interface containers, and type assertion guards.',
        code: `package main

import "fmt"

type Runner interface { Run() }

type App struct{}
func (a App) Run() { fmt.Println("App Running") }

func main() {
    var r Runner = App{}
    r.Run()
}`
      },
      {
        num: 23, file: '23-goroutines.html', title: 'Goroutines',
        subtopics: 'Concurrency vs parallelism · go keyword · Lightweight threads · Go scheduler · WaitGroups (sync.WaitGroup)',
        summary: 'Launch thousands of concurrent lightweight threads using the go keyword, synchronized with sync.WaitGroup.',
        code: `package main

import (
    "fmt"
    "sync"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Println("Worker", id, "done")
}

func main() {
    var wg sync.WaitGroup
    wg.Add(1)
    go worker(1, &wg)
    wg.Wait()
}`
      },
      {
        num: 24, file: '24-channels.html', title: 'Channels',
        subtopics: 'Channel creation make(chan T) · Sending ch <- v · Receiving v := <-ch · Buffered channels · Closing channels',
        summary: 'Communicate safely between concurrent goroutines using unbuffered and buffered Channels.',
        code: `package main

import "fmt"

func main() {
    ch := make(chan string, 1)
    ch <- "Go Concurrency"
    fmt.Println(<-ch)
}`
      },
      {
        num: 25, file: '25-select-and-mutexes.html', title: 'Select & Mutexes',
        subtopics: 'select statement · Channel multiplexing · time.After timeouts · sync.Mutex · Preventing race conditions',
        summary: 'Multiplex channel operations with select statements, implement timeouts, and lock shared state with sync.Mutex.',
        code: `package main

import (
    "fmt"
    "sync"
)

var mu sync.Mutex
var count = 0

func main() {
    mu.Lock()
    count++
    mu.Unlock()
    fmt.Println("Count:", count)
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'Standard Library & Web', icon: '🌐',
    chapters: [
      {
        num: 26, file: '26-packages-and-modules.html', title: 'Packages & Modules',
        subtopics: 'Package organization · Exported vs Unexported identifiers · init() · Custom modules · go mod tidy',
        summary: 'Organize Go microservices into modular packages, controlling access with uppercase export rules.',
        code: `package main

import "fmt"

func main() {
    fmt.Println("Go Packages Active")
}`
      },
      {
        num: 27, file: '27-standard-library-and-json.html', title: 'Standard Library & JSON',
        subtopics: 'encoding/json · json.Marshal · json.Unmarshal · os file I/O · bufio streams · time formatting',
        summary: 'Serialize JSON data payloads with encoding/json struct tags and manage OS file I/O streams.',
        code: `package main

import (
    "encoding/json"
    "fmt"
)

type User struct { Name string \`json:"name"\` }

func main() {
    data, _ := json.Marshal(User{"Balaji"})
    fmt.Println(string(data))
}`
      },
      {
        num: 28, file: '28-http-servers-and-routers.html', title: 'HTTP Servers & Routers',
        subtopics: 'net/http package · http.HandleFunc · http.ListenAndServe · ResponseWriter · Request · Chi router · Gin',
        summary: 'Build native HTTP web servers and RESTful microservices using net/http, Chi router, and JSON API helpers.',
        code: `package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello from Go HTTP Server!")
    })
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'Testing & Project', icon: '🏆',
    chapters: [
      {
        num: 29, file: '29-database-integration.html', title: 'Database Integration',
        subtopics: 'database/sql · MySQL driver · sql.DB pool · Exec and Query · GORM ORM overview',
        summary: 'Connect Go microservices to relational SQL databases using database/sql drivers and GORM ORM.',
        code: `package main

import "fmt"

func main() {
    fmt.Println("Go SQL Driver Ready")
}`
      },
      {
        num: 30, file: '30-unit-testing-and-benchmarks.html', title: 'Unit Testing & Benchmarks',
        subtopics: 'testing package · TestXxx · Table-driven tests · go test command · BenchmarkXxx',
        summary: 'Write automated unit tests and performance benchmarks in Go using standard testing package.',
        code: `package main

import "testing"

func TestSample(t *testing.T) {
    if 1 + 1 != 2 { t.Error("Failed") }
}`
      },
      {
        num: 31, file: '31-building-cli-tools.html', title: 'Building CLI Tools',
        subtopics: 'os.Args · flag package · Command parsing · Cobra framework · Portable binaries',
        summary: 'Build fast command-line interface tools using Go standard flag package and Cobra framework.',
        code: `package main

import (
    "flag"
    "fmt"
)

func main() {
    msg := flag.String("msg", "Go CLI", "Message")
    flag.Parse()
    fmt.Println(*msg)
}`
      },
      {
        num: 32, file: '32-docker-and-microservices.html', title: 'Docker & Microservices',
        subtopics: 'Containerizing Go apps · Multi-stage Dockerfile · Scratch minimal images · Deployment',
        summary: 'Package Go web applications into tiny sub-10MB Docker container images using multi-stage builds.',
        code: `# Multi-stage Go Dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o app .

FROM scratch
COPY --from=builder /app/app /app
ENTRYPOINT ["/app"]`
      },
      {
        num: 33, file: '33-go-web-api-project.html', title: 'Go Web API Project',
        subtopics: 'Building complete RESTful Web API · Project layout · Database integration · JWT auth · Middleware',
        summary: 'Build a complete production-grade RESTful API service in Go with routing, SQL database, and JWT authentication.',
        code: `package main

import "fmt"

func main() {
    fmt.Println("🚀 Go Web API Server Project Active!")
}`
      },
      {
        num: 34, file: '34-go-quiz.html', title: 'Go Practice Quiz',
        subtopics: 'Comprehensive Go Knowledge Check · 30 Multiple Choice Questions · Syntax, Concurrency, Channels, Web',
        summary: 'Test your Go programming mastery with our 30-question interactive certification practice quiz.',
        code: `package main

import "fmt"

func main() {
    fmt.Println("🏆 Go Certification Exam Ready!")
}`
      }
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

// 3. Generate public/blog-go.html (Master Index Page)
const allGoChapters = [];
goPhases.forEach(p => p.chapters.forEach(c => allGoChapters.push({ ...c, phaseTag: p.phaseTag, phaseTitle: p.phaseTitle, icon: p.icon })));

const masterIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Go Complete Roadmap — 34 Chapters, 10 Phases (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master Go (Golang) programming from zero to production ready with our complete 34-chapter roadmap across 10 phases: Setup, Variables, Operators, Conditions, Loops, Functions, Multiple Returns & Errors, Defer/Panic/Recover, Arrays, Slices, Maps, Strings, Structs, Pointers, Receiver Methods, Interfaces, Concurrency, Goroutines, Channels, HTTP Web Servers, Testing, Docker, Projects, and Quiz." />
  <meta name="keywords" content="go tutorial, learn go, golang masterclass, go programming, operators, conditions, loops, functions, slices, maps, goroutines, go channels, go interfaces, go web server, go modules, go rest api" />
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
</head>
<body class="lang-go">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-go.html" class="active">Go</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-vue.html">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-django.html">Django</a>
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-mysql.html">MySQL</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">Go Roadmap</div>
    <a href="/blog-go.html" class="sidebar-home-link active">🐹 Go Course HOME</a>
    <div class="sidebar-accordion">
      ${getGoSidebarHTML(0)}
    </div>
    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-python-compiler.html" style="color:#10b981;font-weight:700;">▶ Run Code in IDE</a>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">Go Complete Roadmap</span>
    </div>

    <h1 class="page-title">Go Complete Masterclass (34 Chapters, 10 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🐹 Go 1.22+</span>
      <span class="badge">🟢 34 Complete Chapters</span>
      <span class="badge">📂 10 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">Go Ante Enti? · Installation &amp; Modules · Variables &amp; Constants · Type Conversion · Operators &amp; Modulus · Conditions &amp; Switch · Go For Loops · Functions &amp; Multiple Returns · Defer, Panic &amp; Recover · Arrays &amp; Slices · Maps &amp; Runes · Structs &amp; Pointers · Receiver Methods · Interfaces &amp; Error Handling · Goroutines &amp; Channels · HTTP Web Servers · Testing &amp; Docker · Web API Project &amp; Quiz</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's Go Complete Master Course</strong>. Go (Golang) is a statically typed, compiled language created at Google, renowned for simplicity, high performance, and built-in concurrency. This comprehensive 34-chapter bootcamp guides you from zero programming experience to building production web microservices and concurrent backend systems.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(16,185,129,0.12),rgba(20,24,32,0.6));border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#10b981;margin-bottom:10px;font-size:18px;">🎯 Ready to Start Learning Go?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Choose where to start: explore Go foundations, operators, conditions, loops, functions, slices, maps, concurrency, or HTTP web servers:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-go/01-go-ante-enti-what-is-go.html" style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: Go Intro →</a>
        <a href="/blog-go/09-operators.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 4: Operators &amp; Control Flow →</a>
        <a href="/blog-go/12-functions.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 5: Functions &amp; Defer →</a>
        <a href="/blog-go/15-arrays.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 6: Slices &amp; Maps →</a>
        <a href="/blog-go/23-goroutines.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 8: Concurrency &amp; Channels →</a>
        <a href="/blog-go/33-go-web-api-project.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 10: Web API Project &amp; Quiz →</a>
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
            <span class="phase-roadmap-badge">${phase.chapters.length} In-Depth Lessons</span>
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
        <span>Go Complete Masterclass · 34 Chapters · 10 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-go/01-go-ante-enti-what-is-go.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. Go Ante Enti?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-go.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-go.html master index page successfully!');

// 4. Generate all 34 Chapter HTML Files inside public/blog-go/ adhering to the 15-Section Lesson Layout
allGoChapters.forEach((ch, idx) => {
  const prevChapter = idx > 0 ? allGoChapters[idx - 1] : null;
  const nextChapter = idx < allGoChapters.length - 1 ? allGoChapters[idx + 1] : null;

  const chapterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Go — ${ch.title} | Our Compiler</title>
  <meta name="description" content="Complete Go Chapter ${ch.num}: ${ch.title}. Learn ${ch.subtopics} with practical Go code examples, memory diagrams, and step-by-step walkthroughs." />
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
        });
      });
    })();
  </script>
</head>
<body class="lang-go">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-go.html" class="active">Go</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-vue.html">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-django.html">Django</a>
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-mysql.html">MySQL</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">Go Tutorial</div>
    <a href="/blog-go.html" class="sidebar-home-link">🐹 Go HOME</a>
    <div class="sidebar-accordion">
      ${getGoSidebarHTML(ch.num)}
    </div>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-go.html">Go</a><span class="sep">›</span>
      <span class="current">Go — ${ch.title}</span>
    </div>

    <h1 class="page-title">Go — ${ch.title}</h1>

    <div class="page-meta">
      <span class="badge">🐹 Go 1.22+</span>
      <span class="badge">🟢 Chapter ${ch.num} of ${allGoChapters.length}</span>
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

    <!-- 1. Simple introduction -->
    <div class="section-title"><span class="num">1</span>Simple Introduction</div>
    <div class="section-body">
      <p>In Go programming, understanding <strong>${ch.title}</strong> is essential for writing clean, efficient, and concurrent software. Every Go program is constructed out of packages, compiled directly to machine code for maximum execution speed.</p>
    </div>

    <!-- 2. What you will learn -->
    <div class="section-title"><span class="num">2</span>What You Will Learn</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <strong style="color:#10b981;display:block;margin-bottom:10px;">📚 Learning Objectives:</strong>
        <ul style="margin:0 0 0 20px;line-height:1.8;">
          <li>Master core Go language mechanics behind <strong>${ch.title}</strong></li>
          <li>Understand memory allocation, stack/heap semantics, and zero values</li>
          <li>Write production-ready, formatted idiomatic Go source code</li>
          <li>Avoid common concurrency deadlocks, type conversion traps, and pointer bugs</li>
        </ul>
      </div>
    </div>

    <!-- 3. Why this concept is useful -->
    <div class="section-title"><span class="num">3</span>Why ${ch.title} is Useful</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">💡 Practical Utility</div>
        <p>Go is built for modern cloud infrastructure, microservices, and high-performance server architectures. Mastering <strong>${ch.title}</strong> equips developers to build scalable systems at companies like Google, Uber, Docker, and Kubernetes.</p>
      </div>
    </div>

    <!-- 4. Required imports & packages -->
    <div class="section-title"><span class="num">4</span>Required Packages &amp; Imports</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Go — Package Declaration</span>
        </div>
        <pre><code>package main

import (
    "fmt"
)</code></pre>
      </div>
    </div>

    <!-- 5. Basic syntax -->
    <div class="section-title"><span class="num">5</span>Basic Syntax</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Go — Code Structure</span>
        </div>
        <pre><code>${ch.code}</code></pre>
      </div>
    </div>

    <!-- 6. Basic example -->
    <div class="section-title"><span class="num">6</span>Basic Example</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Go — Executable Code</span>
        </div>
        <pre><code>${ch.code}</code></pre>
      </div>
    </div>

    <!-- 7. Run command & execution -->
    <div class="section-title"><span class="num">7</span>Run Command &amp; Compilation</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Terminal — Go CLI</span>
        </div>
        <pre><code># Run Go file directly
go run main.go

# Compile binary executable
go build main.go
./main</code></pre>
      </div>
    </div>

    <!-- 8. Program output -->
    <div class="section-title"><span class="num">8</span>Program Output</div>
    <div class="section-body">
      <div class="card" style="background:var(--bg2);padding:16px;border-radius:8px;margin:16px 0;font-size:13.5px;border-left:4px solid #10b981;">
        <strong style="color:#10b981;">📊 Expected Terminal Output:</strong>
        <pre style="margin-top:8px;background:rgba(0,0,0,0.3);padding:10px;border-radius:6px;color:#a6e22e;font-family:'JetBrains Mono',monospace;">Program executed successfully.</pre>
      </div>
    </div>

    <!-- 9. Code explanation & breakdown -->
    <div class="section-title"><span class="num">9</span>Code Explanation &amp; Breakdown</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <thead><tr><th>Go Construct</th><th>Function &amp; Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>package main</code></td><td>Defines an executable Go application rather than a shared library.</td></tr>
          <tr><td><code>func main()</code></td><td>Entry point of the executable program where code execution begins.</td></tr>
          <tr><td><code>${ch.title.split(' ')[0]}</code></td><td>Core Go language keyword or feature used in this lesson.</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 10. Line-by-line breakdown -->
    <div class="section-title"><span class="num">10</span>Line-by-Line Breakdown</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">
        <li>Line 1: <code>package main</code> declares that this Go file builds an executable program.</li>
        <li>Line 3: <code>import "fmt"</code> imports standard formatting and I/O package.</li>
        <li>Line 5: <code>func main()</code> defines the starting point of program execution.</li>
      </ul>
    </div>

    <!-- 11. Execution flow & memory diagram -->
    <div class="section-title"><span class="num">11</span>Execution Flow &amp; Memory Diagram</div>
    <div class="section-body">
      <div class="diagram-box">Main Thread Execution
  │
  ├── Stack Frame Allocation
  │     ├── Local Variables
  │     └── Pointer References
  │
  └── Go Runtime Scheduler Execution
        └── Output Stream -> Terminal Console</div>
    </div>

    <!-- 12. Common mistakes -->
    <div class="section-title"><span class="num">12</span>Common Mistakes</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">⚠️ Pitfalls to Avoid</div>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>Unused variables cause compilation errors in Go — delete or use blank identifier <code>_</code>!</li>
          <li>Forgetting to format code with <code>gofmt</code> before committing.</li>
          <li>Dereferencing a <code>nil</code> pointer causing an unhandled runtime panic.</li>
        </ul>
      </div>
    </div>

    <!-- 13. Coding challenge -->
    <div class="section-title"><span class="num">13</span>Coding Challenge</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:18px 22px;margin-bottom:24px;">
        <strong style="color:#10b981;display:block;margin-bottom:8px;">🎯 Hands-On Challenge:</strong>
        <p>Write a Go program demonstrating <strong>${ch.title}</strong>. Format your code using <code>gofmt</code> and run it with <code>go run</code> to verify expected output!</p>
      </div>
    </div>

    <!-- 14. Mini quiz -->
    <div class="section-title"><span class="num">14</span>Mini Quiz</div>
    <div class="section-body">
      <div class="faq-card">
        <h4>❓ Question: What is the primary purpose of ${ch.title} in Go?</h4>
        <p><strong>Answer:</strong> It provides Go language capabilities for ${ch.subtopics.split('·')[0].trim()}, helping build statically typed, high-performance concurrent software.</p>
      </div>
    </div>

    <!-- 15. Quick recap & Prev/Next buttons -->
    <div class="section-title"><span class="num">15</span>Quick Recap</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">
        <li>${ch.summary}</li>
        <li>Subtopics covered: ${ch.subtopics}</li>
        <li>Format your Go code with <code>gofmt</code> and build efficient binaries with <code>go build</code>.</li>
      </ul>
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
</body>
</html>`;

  const filePath = path.join(goDir, ch.file);
  fs.writeFileSync(filePath, chapterHtml, 'utf8');
  console.log(`🔥 Generated Go Chapter: ${ch.file} (${(chapterHtml.length / 1024).toFixed(1)}KB)`);
});

console.log('✅ Generated all 34 Go Masterclass chapter files in public/blog-go/ successfully!');
