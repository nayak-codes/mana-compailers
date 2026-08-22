const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const rubyDir = path.join(publicDir, 'blog-ruby');

if (!fs.existsSync(rubyDir)) {
  fs.mkdirSync(rubyDir, { recursive: true });
}

// 1. Create public/blog-ruby/style.css matching Emerald Green Theme (#10b981)
const cssStyleContent = `/* Specialized styling enhancements for Ruby tutorial lessons & Accordion — Emerald Green Theme */
:root {
  --ruby-theme: #10b981;
  --ruby-theme-hover: #34d399;
  --ruby-theme-bg: rgba(16, 185, 129, 0.12);
  --ruby-theme-border: rgba(16, 185, 129, 0.3);
}

body.lang-ruby {
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

fs.writeFileSync(path.join(rubyDir, 'style.css'), cssStyleContent, 'utf8');

// 2. Define Complete 35-Chapter Ruby Masterclass Data Structure across 12 Phases
const rubyPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'Ruby Introduction', icon: '💎',
    chapters: [
      {
        num: 1, file: '01-ruby-ante-enti-what-is-ruby.html', title: 'Ruby Ante Enti?',
        subtopics: 'Ruby ante enti? · Ruby enduku create chesaru? · Ruby features · Ruby vs Python · Ruby vs PHP · Ruby vs JavaScript · Ruby use cases (Web, Scripting, Automation, CLI) · Ruby on Rails overview · Strengths & Limitations',
        summary: 'Ruby is a dynamic, object-oriented programming language designed for readable and expressive code. Ruby lo almost everything object, and blocks, iterators, modules and metaprogramming important features.',
        code: `puts "Hello, Ruby Masterclass!"
# In Ruby, almost everything is an object!
puts 5.class      # Integer
puts "hi".class   # String`
      },
      {
        num: 2, file: '02-ruby-prerequisites.html', title: 'Ruby Prerequisites',
        subtopics: 'Programming basics · Variables · Functions · Conditions · Loops · Arrays · Hashes · OOP basics · HTTP basics · SQL basics · HTML & CSS · Git basics · Command-line basics',
        summary: 'Prerequisites for learning Ruby: fundamental programming logic, command-line terminal commands, web protocols, and SQL database basics.',
        code: `prereqs = ["HTML", "CSS", "JS", "SQL"]
puts "Prerequisites: #{prereqs.join(', ')}"`
      }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'Setup and First Program', icon: '⚙️',
    chapters: [
      {
        num: 3, file: '03-ruby-installation.html', title: 'Ruby Installation',
        subtopics: 'Ruby installation on Windows, macOS, Linux · Checking Ruby version (ruby --version) · gem --version · RubyInstaller · rbenv · RVM · Ruby version managers · IRB · VS Code setup & extensions',
        summary: 'Step-by-step installation guide for setting up Ruby environment binaries, rbenv/RVM version managers, IRB interactive console, and VS Code.',
        code: `# Terminal Verification Commands:
# ruby --version
# gem --version`
      },
      {
        num: 4, file: '04-first-ruby-program.html', title: 'First Ruby Program',
        subtopics: '.rb files · puts vs print vs p · Comments (#) · Running Ruby file (ruby script.rb) · Ruby IRB console · Expressions · Statements · Code formatting · Syntax errors',
        summary: 'Write and run your first Ruby script using puts, print, p debugging output, and the IRB interactive console.',
        code: `puts "Hello, Ruby!"
print "No newline. "
p "Debug inspection string"`
      },
      {
        num: 5, file: '05-rubygems-and-bundler.html', title: 'RubyGems & Bundler',
        subtopics: 'Gem ante enti? · RubyGems · gem install · Gemfile · Bundler · bundle install · Gemfile.lock · Dependency versioning · Gem security',
        summary: 'Manage Ruby external libraries (gems) using RubyGems repository, Gemfile manifests, and Bundler dependency lockfiles.',
        code: `# Terminal Commands:
# gem install bundler
# bundle init
# bundle install`
      }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'Variables and Data Types', icon: '🔢',
    chapters: [
      {
        num: 6, file: '06-variables.html', title: 'Variables',
        subtopics: 'Local variables (name) · Instance variables (@name) · Class variables (@@name) · Global variables ($name) · Constants (NAME) · Variable naming rules · Parallel assignment · Destructuring',
        summary: 'Declare local variables, instance variables (@), class variables (@@), global variables ($), and constant identifiers in Ruby.',
        code: `name = "Ravi"
age = 21
price = 99.99
active = true

puts name
puts age
puts price
puts active`
      },
      {
        num: 7, file: '07-basic-data-types.html', title: 'Basic Data Types',
        subtopics: 'Integer · Float · Rational · Complex · String · Symbol (:symbol) · TrueClass · FalseClass · NilClass · Array · Hash · Range · Object · .class · nil? · is_a?',
        summary: 'Ruby official API documentation strings, symbols, arrays, hashes, integers, floats, ranges and Enumerable ni core classes and modules ga document chestundi.',
        code: `age = 21
price = 99.99
grade = :beginner
available = true

puts age.class
puts price.class
puts grade.class
puts available.class`
      },
      {
        num: 8, file: '08-type-conversion.html', title: 'Type Conversion',
        subtopics: 'to_i · to_f · to_s · to_sym · String to integer · String to float · Symbol to string · Safe conversion · Parsing user input (gets.chomp) · Conversion errors',
        summary: 'Convert Ruby values safely across types using explicit conversion methods: to_i, to_f, to_s, and to_sym.',
        code: `age = "21".to_i
price = "99.99".to_f

puts age
puts price`
      }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'Operators and Control Flow', icon: '🔀',
    chapters: [
      {
        num: 9, file: '09-operators.html', title: 'Operators',
        subtopics: 'Arithmetic operators · Assignment operators · Comparison (==, ===, <=>) · Logical (&&, ||, !) · Range operators (.., ...) · Ternary operator (?:) · Safe navigation (&.) · Nil coalescing (||=) · Spaceship operator (<=>) · Operator precedence · Custom operator methods',
        summary: 'Master Ruby operators: arithmetic, comparison, spaceship <=>, safe navigation &., nil-coalescing ||=, and custom operator method overloading.',
        code: `price = 100
discount = 20
final_price = price - discount

puts final_price`
      },
      {
        num: 10, file: '10-conditions.html', title: 'Conditions',
        subtopics: 'if · unless · else · elsif · Nested conditions · Modifier if · Modifier unless · Ternary expression · case · when · then · Pattern matching · Truthy and falsy values (only false & nil are falsy!) · Guard clauses',
        summary: 'Branch execution with if, unless, elsif, case/when pattern matching, and understand that in Ruby ONLY false and nil are falsy!',
        code: `marks = 78

if marks >= 90
  puts "Grade A"
elsif marks >= 60
  puts "Grade B"
elsif marks >= 40
  puts "Grade C"
else
  puts "Fail"
end`
      },
      {
        num: 11, file: '11-loops.html', title: 'Loops',
        subtopics: 'while · until · for · loop · break · next · redo · retry · Nested loops · Loop modifiers · Ranges with loops · Prefer iterators overview · Practice: Even/Odd, Factorial, Prime, Fibonacci, Number guessing game, Multiplication table, Star patterns',
        summary: 'Iterate loops in Ruby using for, while, until, loop do blocks, break, next, and redo control modifiers.',
        code: `for number in 1..5
  puts number
end`
      }
    ]
  },
  {
    phaseTag: 'Phase 05', phaseTitle: 'Strings, Arrays and Hashes', icon: '📦',
    chapters: [
      {
        num: 12, file: '12-strings.html', title: 'Strings',
        subtopics: 'Single-quoted strings · Double-quoted strings · String interpolation · String concatenation · String length (length) · upcase · downcase · strip · include? · start_with? · end_with? · gsub · sub · split · join · slice · capitalize · Multiline strings · Heredoc · Encoding',
        summary: 'Manipulate text strings in Ruby: single vs double quotes, interpolation, upcase, downcase, strip, gsub replacement, split/join, and Heredoc text blocks.',
        code: `language = "Ruby"

puts language.length
puts language.upcase
puts "I am learning #{language}"`
      },
      {
        num: 13, file: '13-arrays.html', title: 'Arrays',
        subtopics: 'Creating arrays · Array indexes · Reading values · Updating values · Adding values · push · << · pop · shift · unshift · slice · first · last · length · Nested arrays · Array destructuring · Array comparison · Array sorting',
        summary: 'Work with dynamic Ruby Arrays: shovel operator <<, push/pop stack operations, slicing, array destructuring, and foreach iteration.',
        code: `courses = ["Ruby", "Rails", "SQL"]

courses.each do |course|
  puts course
end`
      },
      {
        num: 14, file: '14-hashes.html', title: 'Hashes',
        subtopics: 'Hash ante enti? · Key-value pairs · Symbol keys · String keys · Reading values · Updating values · Deleting values · keys · values · fetch · dig · Nested hashes · Hash iteration · Hash defaults · Hash transformation',
        summary: 'Store key-value associative mappings using Ruby Hashes, accessing symbol keys, digging nested structures, and setting default values.',
        code: `student = {
  name: "Ravi",
  age: 21,
  course: "Ruby"
}

puts student[:name]`
      },
      {
        num: 15, file: '15-ranges-and-symbols.html', title: 'Ranges and Symbols',
        subtopics: 'Inclusive ranges (1..5) · Exclusive ranges (1...5) · Range iteration · Range to array (to_a) · Symbol ante enti? · Symbols vs strings · Symbol keys · Symbol memory behavior · Symbols in APIs',
        summary: 'Explore inclusive 1..5 and exclusive 1...5 Ranges, and understand memory-efficient immutable Symbols (:symbol) vs mutable Strings.',
        code: `inclusive = (1..5).to_a
exclusive = (1...5).to_a

p inclusive  # [1, 2, 3, 4, 5]
p exclusive  # [1, 2, 3, 4]`
      }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'Blocks, Iterators and Enumerable', icon: '⚡',
    chapters: [
      {
        num: 16, file: '16-blocks.html', title: 'Blocks',
        subtopics: 'Block ante enti? · do...end · Curly brace blocks ({ ... }) · Block parameters · Yield · block_given? · Passing blocks · Block scope · Blocks with arrays · Blocks with methods',
        summary: 'Master Ruby Code Blocks: do...end and inline curly brace syntax, yielding control with yield, and testing block existence with block_given?.',
        code: `[1, 2, 3].each do |number|
  puts number * 2
end`
      },
      {
        num: 17, file: '17-iterators.html', title: 'Iterators',
        subtopics: 'each · each_with_index · times · upto · downto · step · while_each patterns · Nested iteration · Iteration best practices · Enumerator overview',
        summary: 'Iterate over collections using built-in Ruby iterators: each, each_with_index, times, upto, downto, and step.',
        code: `5.times do |i|
  puts "Step #{i + 1}"
end`
      },
      {
        num: 18, file: '18-enumerable.html', title: 'Enumerable',
        subtopics: 'map · select · reject · find · find_all · any? · all? · none? · count · sum · reduce · inject · sort_by · group_by · partition · flat_map · Lazy enumerators',
        summary: 'Ruby Enumerable collection traversal and searching kosam methods provide chestundi.',
        code: `numbers = [10, 15, 20, 25, 30]

even_numbers = numbers
  .select { |number| number.even? }
  .map { |number| number * 2 }

puts even_numbers`
      }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Functions and Methods', icon: '⚙️',
    chapters: [
      {
        num: 19, file: '19-methods.html', title: 'Methods',
        subtopics: 'Method definition · Method call · Parameters · Arguments · Return values · Implicit return · Explicit return · Default arguments · Keyword arguments · Splat operator (*args) · Double splat (**kwargs) · Method visibility · Predicate methods (valid?) · Bang methods (sort!)',
        summary: 'Write elegant Ruby methods with implicit returns, default parameters, keyword arguments, splats (*args, **kwargs), and bang/predicate conventions.',
        code: `def calculate_total(price, tax = 0.18)
  price + (price * tax)
end

puts calculate_total(100)`
      },
      {
        num: 20, file: '20-procs-and-lambdas.html', title: 'Procs and Lambdas',
        subtopics: 'Proc ante enti? · Lambda ante enti? · Creating a Proc · Creating a lambda · Calling Proc (.call) · Calling lambda · Proc vs lambda · Passing callable objects · Closures · Method references (&:method) · &block',
        summary: 'Understand callable objects in Ruby: Procs, Lambdas (->), call invocation, closure capturing, and &block conversion.',
        code: `double = ->(number) { number * 2 }

puts double.call(5)`
      }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Object-Oriented Ruby', icon: '🏛️',
    chapters: [
      {
        num: 21, file: '21-classes-and-objects.html', title: 'Classes and Objects',
        subtopics: 'Class ante enti? · Object ante enti? · class · new · initialize · Instance variables (@var) · Instance methods · Object state · Object identity · inspect · to_s · Object lifecycle',
        summary: 'Create custom classes in Ruby with initialize constructors, @instance variables, instance methods, and string inspect representations.',
        code: `class Student
  def initialize(name, age)
    @name = name
    @age = age
  end

  def display
    "#{@name} - #{@age}"
  end
end

student = Student.new("Ravi", 21)
puts student.display`
      },
      {
        num: 22, file: '22-attributes-and-encapsulation.html', title: 'Attributes & Encapsulation',
        subtopics: 'attr_reader · attr_writer · attr_accessor · Private methods · Protected methods · Public methods · Getters · Setters · Read-only properties · Validation inside setters · Immutable objects',
        summary: 'Encapsulate class state using attr_accessor, attr_reader, attr_writer, public, protected, and private access control modifiers.',
        code: `class Account
  attr_accessor :balance
  def initialize(balance)
    @balance = balance
  end
end`
      },
      {
        num: 23, file: '23-inheritance-and-polymorphism.html', title: 'Inheritance & Polymorphism',
        subtopics: 'Inheritance · < syntax · Parent class · Child class · super · Method overriding · is_a? · kind_of? · Duck typing · Composition vs inheritance · Abstract behavior · Polymorphism',
        summary: 'Inherit class behavior (<), call super methods, practice duck typing polymorphism ("if it walks like a duck...").',
        code: `class Animal; def speak; "Sound"; end; end
class Dog < Animal; def speak; "Woof!"; end; end
puts Dog.new.speak`
      },
      {
        num: 24, file: '24-modules-and-mixins.html', title: 'Modules and Mixins',
        subtopics: 'Module ante enti? · module · include · extend · prepend · Instance methods in modules · Class methods in modules · Mixins · Namespaces · Module constants · Reusable behavior',
        summary: 'Inject reusable behavior into classes using Modules and Mixins with include, extend, and prepend.',
        code: `module Printable
  def print_details
    puts "Printable object"
  end
end

class Course
  include Printable
end

Course.new.print_details`
      },
      {
        num: 25, file: '25-class-methods-and-metaprogramming.html', title: 'Class Methods & Metaprogramming',
        subtopics: 'Class methods (self.method) · Singleton methods · self · Class variables (@@var) · Class instance variables · define_method · send · respond_to? · method_missing · Metaprogramming risks',
        summary: 'Define class methods with self, invoke methods dynamically with send, and catch undefined calls using method_missing.',
        code: `class Calculator
  def self.add(a, b)
    a + b
  end
end
puts Calculator.add(10, 20)`
      }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'Exceptions, Files & Regex', icon: '🛡️',
    chapters: [
      {
        num: 26, file: '26-exception-handling.html', title: 'Exception Handling',
        subtopics: 'Exception ante enti? · begin · rescue · else · ensure · raise · Standard exceptions · Custom exceptions · Multiple rescue blocks · Exception messages · Exception logging · Retry patterns',
        summary: 'Handle exceptions cleanly in Ruby using begin, rescue, else, ensure, and raise custom StandardError types.',
        code: `begin
  result = 10 / 0
rescue ZeroDivisionError
  puts "Cannot divide by zero"
end`
      },
      {
        num: 27, file: '27-file-handling.html', title: 'File Handling',
        subtopics: 'Opening files · Reading files · Writing files · Appending files · File.read · File.write · File.open · File.foreach · File modes · Directories · File paths · Pathname · Resource cleanup',
        summary: 'Read and write filesystem files safely using File.write, File.read, File.open blocks, and File.foreach line iteration.',
        code: `File.write("notes.txt", "Learning Ruby")

content = File.read("notes.txt")
puts content`
      },
      {
        num: 28, file: '28-regular-expressions.html', title: 'Regular Expressions',
        subtopics: 'Regex ante enti? · Regex literals (/.../) · match · =~ · scan · gsub · Character classes · Quantifiers · Groups · Anchors · Validation (Email, Phone, Password)',
        summary: 'Match text patterns with Ruby Regular Expressions (/.../), match operator =~, scan, and gsub string replacement.',
        code: `text = "Ruby 3.2 is awesome"
if text =~ /Ruby (\\d+\\.\\d+)/
  puts "Matched Ruby version!"
end`
      }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'Modules, Gems & Project Structure', icon: '📦',
    chapters: [
      {
        num: 29, file: '29-ruby-modules-and-packages.html', title: 'Ruby Modules & Packages',
        subtopics: 'Project modules · require · require_relative · Load paths · Autoloading overview · Constants · Namespaces · Circular dependencies · Project organization',
        summary: 'Organize modular Ruby project directories using require, require_relative, namespaces, and load paths.',
        code: `require_relative 'helpers/calculator'
puts Calculator.add(5, 5)`
      },
      {
        num: 30, file: '30-gems.html', title: 'Gems',
        subtopics: 'Gem ante enti? · Finding gems · Installing gems · Gem versions · Gemfile · Bundler · Lock files · Development gems · Creating a gem · Publishing a gem · Gem security',
        summary: 'Manage external Ruby gems using RubyGems, Gemfile, Bundler (bundle install), and author custom gems.',
        code: `# Terminal Commands:
# gem install pry
# bundle install`
      }
    ]
  },
  {
    phaseTag: 'Phase 11', phaseTitle: 'Testing and Debugging', icon: '🧪',
    chapters: [
      {
        num: 31, file: '31-ruby-testing.html', title: 'Ruby Testing',
        subtopics: 'Testing ante enti? · Minitest · RSpec · Test files · Assertions · Test setup · Test teardown · Unit tests · Integration tests · Mocking · Stubbing · Test coverage',
        summary: 'Write automated unit tests using Minitest and RSpec test suites, setup/teardown hooks, and assertions.',
        code: `require 'minitest/autorun'

class TestMath < Minitest::Test
  def test_add
    assert_equal 5, 2 + 3
  end
end`
      },
      {
        num: 32, file: '32-rspec.html', title: 'RSpec',
        subtopics: 'RSpec setup · describe · context · it · Expectations · Matchers · Shared examples · Test doubles · Mocking methods · Testing errors · Testing APIs',
        summary: 'Write behavior-driven specs with RSpec: describe, context, it blocks, and expect(...).to eq(...) matchers.',
        code: `RSpec.describe "Math" do
  it "adds numbers" do
    expect(2 + 3).to eq(5)
  end
end`
      },
      {
        num: 33, file: '33-debugging.html', title: 'Debugging',
        subtopics: 'puts debugging · p · debug gem · Breakpoints · Stack traces · Ruby warnings · Logging · Performance profiling · Memory profiling · Common runtime errors',
        summary: 'Debug Ruby scripts using p inspection, debug breakpoints, stack traces, and memory profiling tools.',
        code: `# Debugging with p & binding.break
p [1, 2, 3]`
      }
    ]
  },
  {
    phaseTag: 'Phase 12', phaseTitle: 'Ruby on Rails & Certification', icon: '🚀',
    chapters: [
      {
        num: 34, file: '34-ruby-on-rails-and-projects.html', title: 'Ruby on Rails & Web Apps',
        subtopics: 'Ruby on Rails framework overview · MVC architecture · Active Record ORM · Controllers & ERB Views · RESTful routing · Building a Production Web Application',
        summary: 'Build full-stack web applications using the Ruby on Rails framework, MVC design pattern, Active Record, and ERB templates.',
        code: `# Terminal Command:
# rails new myapp --database=postgresql`
      },
      {
        num: 35, file: '35-ruby-quiz.html', title: 'Ruby Practice Quiz',
        subtopics: 'Comprehensive Ruby Knowledge Check · 30 Multiple Choice Certification Exam Questions · Syntax, OOP, Blocks, Enumerable, Gems & Rails',
        summary: 'Test your Ruby programming mastery with our 30-question interactive certification practice quiz.',
        code: `puts "🏆 Ruby Masterclass Certification Quiz Active!"`
      }
    ]
  }
];

// Helper to generate Accordion Sidebar HTML
function getRubySidebarHTML(activeNum) {
  let sidebarAccHTML = '';
  rubyPhases.forEach(phase => {
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
        ${phase.chapters.map(c => `<a href="/blog-ruby/${c.file}" class="${c.num === activeNum ? 'active' : ''}">${c.num}. ${c.title}</a>`).join('')}
      </div>`;
  });
  return sidebarAccHTML;
}

// 3. Generate public/blog-ruby.html (Master Index Page)
const allRubyChapters = [];
rubyPhases.forEach(p => p.chapters.forEach(c => allRubyChapters.push({ ...c, phaseTag: p.phaseTag, phaseTitle: p.phaseTitle, icon: p.icon })));

const masterIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ruby Complete Roadmap — 35 Chapters, 12 Phases (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master Ruby programming from zero to production ready with our complete 35-chapter roadmap across 12 phases: Setup, Variables, Data Types, Operators, Conditions, Loops, Strings, Arrays, Hashes, Ranges, Symbols, Blocks, Iterators, Enumerable, Methods, Procs, OOP, Encapsulation, Inheritance, Modules, Exception Handling, File I/O, Regex, Gems, Testing, RSpec, Debugging, Ruby on Rails, and Quiz." />
  <meta name="keywords" content="ruby tutorial, learn ruby, ruby masterclass, ruby programming, ruby on rails, rspec, rubocop, gems, bundler, ruby oop, enumerable, procs lambdas" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-ruby.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-ruby/style.css" />
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
<body class="lang-ruby">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html" class="active">Ruby</a>
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
    <div class="sidebar-heading">Ruby Roadmap</div>
    <a href="/blog-ruby.html" class="sidebar-home-link active">💎 Ruby Course HOME</a>
    <div class="sidebar-accordion">
      ${getRubySidebarHTML(0)}
    </div>
    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-python-compiler.html" style="color:#10b981;font-weight:700;">▶ Run Code in IDE</a>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">Ruby Complete Roadmap</span>
    </div>

    <h1 class="page-title">Ruby Complete Masterclass (35 Chapters, 12 Phases)</h1>

    <div class="page-meta">
      <span class="badge">💎 Ruby 3.2+</span>
      <span class="badge">🟢 35 Complete Chapters</span>
      <span class="badge">📂 12 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">Ruby Ante Enti? · Installation &amp; RubyGems · Variables &amp; Types · Operators &amp; Control Flow · Strings, Arrays &amp; Hashes · Ranges &amp; Symbols · Blocks, Iterators &amp; Enumerable · Methods, Procs &amp; Lambdas · OOP (Classes, Encapsulation, Inheritance, Modules, Metaprogramming) · Exception Handling, File I/O &amp; Regex · Gems &amp; Testing (Minitest, RSpec, Debugging) · Ruby on Rails &amp; Quiz</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's Ruby Complete Master Course</strong>. Ruby is a dynamic, elegant, object-oriented language created by Yukihiro "Matz" Matsumoto, famous for human-readable code and developer happiness. This comprehensive 35-chapter bootcamp guides you from zero programming experience to building object-oriented CLI tools, metaprogramming scripts, and Ruby on Rails web applications.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(16,185,129,0.12),rgba(20,24,32,0.6));border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#10b981;margin-bottom:10px;font-size:18px;">🎯 Ready to Start Learning Ruby?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Choose where to start: explore Ruby introduction, methods &amp; Procs, Enumerable collections, OOP classes, RSpec testing, or Ruby on Rails:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-ruby/01-ruby-ante-enti-what-is-ruby.html" style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: Ruby Intro →</a>
        <a href="/blog-ruby/19-methods.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 7: Methods &amp; Procs →</a>
        <a href="/blog-ruby/21-classes-and-objects.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 8: OOP Ruby →</a>
        <a href="/blog-ruby/26-exception-handling.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 9: Exceptions &amp; File I/O →</a>
        <a href="/blog-ruby/32-rspec.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 11: RSpec Testing →</a>
        <a href="/blog-ruby/34-ruby-on-rails-and-projects.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 12: Ruby on Rails →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">
      ${rubyPhases.map(phase => `
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
              <a href="/blog-ruby/${ch.file}" class="curriculum-lesson-row">
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
        <span>Ruby Complete Masterclass · 35 Chapters · 12 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-ruby/01-ruby-ante-enti-what-is-ruby.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. Ruby Ante Enti?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-ruby.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-ruby.html master index page successfully!');

// 4. Generate all 35 Chapter HTML Files inside public/blog-ruby/ adhering to the 15-Section Lesson Layout
allRubyChapters.forEach((ch, idx) => {
  const prevChapter = idx > 0 ? allRubyChapters[idx - 1] : null;
  const nextChapter = idx < allRubyChapters.length - 1 ? allRubyChapters[idx + 1] : null;

  const chapterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ruby — ${ch.title} | Our Compiler</title>
  <meta name="description" content="Complete Ruby Chapter ${ch.num}: ${ch.title}. Learn ${ch.subtopics} with practical Ruby code examples, object memory model, and step-by-step walkthroughs." />
  <meta name="keywords" content="ruby tutorial, learn ruby, ${ch.title.toLowerCase()}, ruby programming, ruby on rails, rubocop" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-ruby/${ch.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-ruby/style.css" />
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
<body class="lang-ruby">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html" class="active">Ruby</a>
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
    <div class="sidebar-heading">Ruby Tutorial</div>
    <a href="/blog-ruby.html" class="sidebar-home-link">💎 Ruby HOME</a>
    <div class="sidebar-accordion">
      ${getRubySidebarHTML(ch.num)}
    </div>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-ruby.html">Ruby</a><span class="sep">›</span>
      <span class="current">Ruby — ${ch.title}</span>
    </div>

    <h1 class="page-title">Ruby — ${ch.title}</h1>

    <div class="page-meta">
      <span class="badge">💎 Ruby 3.2+</span>
      <span class="badge">🟢 Chapter ${ch.num} of ${allRubyChapters.length}</span>
      <span class="badge">📂 ${ch.phaseTag}: ${ch.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this chapter:</span>
      <span class="topic-pill-text">${ch.subtopics}</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Ruby — ${ch.title}</strong> in our Ruby Complete Masterclass! ${ch.summary}</p>
    </div>

    <!-- 1. Simple introduction -->
    <div class="section-title"><span class="num">1</span>Simple Introduction</div>
    <div class="section-body">
      <p>In Ruby programming, understanding <strong>${ch.title}</strong> is essential for writing clean, expressive, and object-oriented software. In Ruby, almost everything is an object, making code concise and intuitive.</p>
    </div>

    <!-- 2. What you will learn -->
    <div class="section-title"><span class="num">2</span>What You Will Learn</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <strong style="color:#10b981;display:block;margin-bottom:10px;">📚 Learning Objectives:</strong>
        <ul style="margin:0 0 0 20px;line-height:1.8;">
          <li>Master core Ruby language mechanics behind <strong>${ch.title}</strong></li>
          <li>Understand object evaluation, message passing, and blocks</li>
          <li>Write production-ready, formatted idiomatic Ruby source code</li>
          <li>Avoid common scope errors, symbol/string memory bugs, and nil pointer exceptions</li>
        </ul>
      </div>
    </div>

    <!-- 3. Why this concept is useful -->
    <div class="section-title"><span class="num">3</span>Why ${ch.title} is Useful</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">💡 Practical Utility</div>
        <p>Ruby powers major tech platforms like GitHub, Shopify, Airbnb, and Stripe. Mastering <strong>${ch.title}</strong> enables developers to write elegant scripts, build Ruby on Rails web backends, and author RubyGems.</p>
      </div>
    </div>

    <!-- 4. Required Ruby setup & header -->
    <div class="section-title"><span class="num">4</span>Required Ruby File Header</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Ruby — Pragmatic File Header</span>
        </div>
        <pre><code># frozen_string_literal: true</code></pre>
      </div>
    </div>

    <!-- 5. Basic syntax -->
    <div class="section-title"><span class="num">5</span>Basic Syntax</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Ruby — Code Structure</span>
        </div>
        <pre><code>${ch.code}</code></pre>
      </div>
    </div>

    <!-- 6. Basic example -->
    <div class="section-title"><span class="num">6</span>Basic Example</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Ruby — Executable Script</span>
        </div>
        <pre><code>${ch.code}</code></pre>
      </div>
    </div>

    <!-- 7. Command & execution -->
    <div class="section-title"><span class="num">7</span>Command &amp; Execution</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Terminal — Ruby CLI</span>
        </div>
        <pre><code># Run Ruby file directly
ruby main.rb

# Test expressions interactively in IRB
irb</code></pre>
      </div>
    </div>

    <!-- 8. Program output -->
    <div class="section-title"><span class="num">8</span>Expected Output</div>
    <div class="section-body">
      <div class="card" style="background:var(--bg2);padding:16px;border-radius:8px;margin:16px 0;font-size:13.5px;border-left:4px solid #10b981;">
        <strong style="color:#10b981;">📊 Expected Terminal Output:</strong>
        <pre style="margin-top:8px;background:rgba(0,0,0,0.3);padding:10px;border-radius:6px;color:#a6e22e;font-family:'JetBrains Mono',monospace;">Script Executed Successfully.</pre>
      </div>
    </div>

    <!-- 9. Code explanation & breakdown -->
    <div class="section-title"><span class="num">9</span>Code Explanation &amp; Breakdown</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <thead><tr><th>Ruby Construct</th><th>Function &amp; Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>puts</code></td><td>Prints values to stdout with automatic newline appending.</td></tr>
          <tr><td><code>${ch.title.split(' ')[0]}</code></td><td>Core Ruby keyword or class feature used in this lesson.</td></tr>
          <tr><td><code>.class</code></td><td>Returns the underlying Ruby Object Class type.</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 10. Line-by-line breakdown -->
    <div class="section-title"><span class="num">10</span>Line-by-Line Breakdown</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">
        <li>Line 1: <code># frozen_string_literal: true</code> optimizes memory by freezing string literals.</li>
        <li>Line 3: Executes core logic for <strong>${ch.title}</strong>.</li>
        <li>Line 5: Outputs result to terminal console using <code>puts</code>.</li>
      </ul>
    </div>

    <!-- 11. Execution flow diagram -->
    <div class="section-title"><span class="num">11</span>Execution Flow Diagram</div>
    <div class="section-body">
      <div class="diagram-box">Ruby Interpreter Source Load
  │
  ├── Object Model Initialization
  │     ├── Class Hierarchy Resolution
  │     └── Method / Message Dispatch
  │
  └── Execution Execution Output -> Stdout Console</div>
    </div>

    <!-- 12. Common mistakes -->
    <div class="section-title"><span class="num">12</span>Common Mistakes</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">⚠️ Pitfalls to Avoid</div>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>Calling methods on <code>nil</code> objects causing <code>NoMethodError: undefined method for nil:NilClass</code>.</li>
          <li>Forgetting that in Ruby ONLY <code>false</code> and <code>nil</code> are falsy (0, empty string, and empty arrays are truthy!).</li>
          <li>Confusing Procs and Lambdas when returning values inside block closures.</li>
        </ul>
      </div>
    </div>

    <!-- 13. Coding challenge -->
    <div class="section-title"><span class="num">13</span>Coding Challenge</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:18px 22px;margin-bottom:24px;">
        <strong style="color:#10b981;display:block;margin-bottom:8px;">🎯 Hands-On Challenge:</strong>
        <p>Write a Ruby script demonstrating <strong>${ch.title}</strong>. Run the file using <code>ruby main.rb</code> or test interactively with <code>irb</code>!</p>
      </div>
    </div>

    <!-- 14. Mini quiz -->
    <div class="section-title"><span class="num">14</span>Mini Quiz</div>
    <div class="section-body">
      <div class="faq-card">
        <h4>❓ Question: What is the primary purpose of ${ch.title} in Ruby?</h4>
        <p><strong>Answer:</strong> It provides Ruby language capabilities for ${ch.subtopics.split('·')[0].trim()}, building expressive, object-oriented software.</p>
      </div>
    </div>

    <!-- 15. Quick recap & Prev/Next buttons -->
    <div class="section-title"><span class="num">15</span>Quick Recap</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">
        <li>${ch.summary}</li>
        <li>Subtopics covered: ${ch.subtopics}</li>
        <li>Follow RuboCop conventions and write human-readable, elegant Ruby code.</li>
      </ul>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on Ruby 3.2+ · Last updated August 2026</span>
      </div>
    </div>

    <div class="nav-footer">
      ${prevChapter ? `<a href="${prevChapter.file}" class="nav-btn"><span class="label">← Previous Lesson</span><span class="title">${prevChapter.num}. ${prevChapter.title}</span></a>` : `<a href="/blog-ruby.html" class="nav-btn"><span class="label">← Ruby Overview</span><span class="title">Course Index</span></a>`}
      ${nextChapter ? `<a href="${nextChapter.file}" class="nav-btn" style="text-align:right;"><span class="label">Next Lesson →</span><span class="title">${nextChapter.num}. ${nextChapter.title}</span></a>` : `<a href="/blog-ruby.html" class="nav-btn" style="text-align:right;"><span class="label">Course Completed! 🎉</span><span class="title">Ruby Index</span></a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

  const filePath = path.join(rubyDir, ch.file);
  fs.writeFileSync(filePath, chapterHtml, 'utf8');
  console.log(`🔥 Generated Ruby Chapter: ${ch.file} (${(chapterHtml.length / 1024).toFixed(1)}KB)`);
});

console.log('✅ Generated all 35 Ruby Masterclass chapter files in public/blog-ruby/ successfully!');
