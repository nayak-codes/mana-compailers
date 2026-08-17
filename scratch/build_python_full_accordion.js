const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const pythonDir = path.join(baseDir, 'blog-python');
const oldPythonDir = path.join(baseDir, 'python');

if (!fs.existsSync(pythonDir)) {
  fs.mkdirSync(pythonDir, { recursive: true });
}

// 1. Specialized Python & Accordion CSS
const accordionCss = `/* Specialized styling enhancements for Python tutorial lessons & Accordion */
.sidebar-accordion {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 10px;
  margin-top: 10px;
}

.accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 12px;
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  font-family: inherit;
}

.accordion-header:hover {
  background: rgba(56, 189, 248, 0.12);
  border-color: #38bdf8;
  color: #38bdf8;
}

.accordion-header.active {
  background: rgba(56, 189, 248, 0.15);
  border-color: #38bdf8;
  color: #38bdf8;
}

.accordion-title {
  display: flex;
  align-items: center;
  gap: 6px;
}

.accordion-badge {
  font-size: 10.5px;
  padding: 2px 7px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text2);
  font-weight: 600;
}

.accordion-icon {
  font-size: 10px;
  transition: transform 0.25s ease;
  margin-left: 6px;
  color: var(--text3);
}

.accordion-header.active .accordion-icon {
  transform: rotate(90deg);
  color: #38bdf8;
}

.accordion-content {
  display: none;
  flex-direction: column;
  padding: 4px 0 6px 6px;
  border-left: 2px solid rgba(56, 189, 248, 0.35);
  margin-left: 12px;
  margin-top: 2px;
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
  padding: 6px 12px;
  font-size: 12.5px;
  color: var(--text2);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.15s ease;
  margin: 1px 0;
  line-height: 1.4;
}

.accordion-content a:hover {
  color: var(--text);
  background: var(--bg3);
}

.accordion-content a.active {
  color: #ffffff !important;
  background: var(--accent, #3fb950) !important;
  font-weight: 700;
}

.accordion-content .sub-heading {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--text3);
  padding: 8px 12px 2px;
  text-transform: uppercase;
}

.try-box {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(99, 102, 241, 0.04) 100%);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: var(--radius, 12px);
  padding: 24px;
  margin: 32px 0;
}

.try-box .try-title {
  font-weight: 700;
  color: var(--accent, #38bdf8);
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
  background: linear-gradient(135deg, #38bdf8, #6366f1);
  color: #ffffff !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 14px rgba(56, 189, 248, 0.3);
}

.try-box .run-btn:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

.callout {
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-left: 4px solid #38bdf8;
  padding: 18px 22px;
  border-radius: var(--radius, 12px);
  margin: 28px 0;
}

.callout .callout-title {
  font-weight: 700;
  color: #38bdf8;
  margin-bottom: 8px;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.diagram-box {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 18px;
  margin: 24px 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13.5px;
  color: #7ee787;
  line-height: 1.6;
  overflow-x: auto;
}

.faq-card {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 16px 20px;
  margin-bottom: 16px;
}

.faq-card h4 {
  color: #58a6ff;
  font-size: 15px;
  margin-bottom: 8px;
}

.faq-card p {
  color: #8b949e;
  font-size: 14px;
  line-height: 1.6;
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
  background: linear-gradient(135deg, #38bdf8, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(56, 189, 248, 0.3);
}

body.light-theme .accordion-header {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}
body.light-theme .accordion-header.active {
  background: #e0f2fe;
  border-color: #0284c7;
  color: #0284c7;
}
body.light-theme .try-box {
  background: #f0f9ff;
  border-color: #bae6fd;
}
body.light-theme .callout {
  background: #f8fafc;
  border-color: #cbd5e1;
}
body.light-theme .diagram-box {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}
body.light-theme .faq-card {
  background: #ffffff;
  border-color: #e2e8f0;
}
`;

fs.writeFileSync(path.join(pythonDir, 'style.css'), accordionCss, 'utf8');

// LESSONS DEFINITIONS ACROSS PHASES
const PHASES = [
  {
    id: 'phase1',
    title: 'Phase 1: Python Basics',
    icon: '📂',
    lessons: [
      { num: 1, slug: '01-python-ante-enti', title: '1. Python ante enti? (What is Python?)', desc: 'Detailed explanation of what Python is, Guido van Rossum history, design philosophy, dynamic typing, and why Python rules modern software.' },
      { num: 2, slug: '02-python-features-and-uses', title: '2. Python features and uses', desc: 'Core features of Python 3: readability, standard library, cross-platform portability, and industry use cases in AI, Web Dev, and Automation.' },
      { num: 3, slug: '03-python-installation-and-setup', title: '3. Python installation and setup', desc: 'Complete setup guide for Windows, macOS, Linux, configuring PATH, VS Code extension, and Our Compiler zero-setup IDE.' },
      { num: 4, slug: '04-first-program-hello-world', title: '4. First program — Hello World', desc: 'Write, understand, and execute your first Hello World program in Python, with line-by-line syntax breakdown and PVM execution flow.' },
      { num: 5, slug: '05-python-syntax-and-indentation', title: '5. Python syntax and indentation', desc: 'Master Python whitespace indentation, the 4-space rule, colons, avoiding IndentationError, and following PEP 8 style standards.' },
      { num: 6, slug: '06-python-comments', title: '6. Comments in Python', desc: 'Single-line comments (#), multi-line comments, docstrings ("""), and best practices for writing self-documenting clean code.' },
      { num: 7, slug: '07-python-variables', title: '7. Python Variables', desc: 'Variables as object references, dynamic typing, reference counting, multiple assignments, and memory address inspection using id().' },
      { num: 8, slug: '08-python-naming-rules', title: '8. Naming rules & Keywords', desc: 'Identifier naming rules, snake_case standards, allowed characters, case sensitivity, and 35 reserved Python keywords.' },
      { num: 9, slug: '09-python-numbers', title: '9. Numbers (int, float, complex)', desc: 'Numeric data types: arbitrary precision integers, floating-point precision, complex numbers, arithmetic operators, and math module.' },
      { num: 10, slug: '10-python-strings', title: '10. Strings & Slicing', desc: 'String creation, immutability, zero-based positive and negative indexing, [start:stop:step] slicing, modern f-strings, and string methods.' },
      { num: 11, slug: '11-python-booleans', title: '11. Booleans & Truthiness', desc: 'The bool data type (True/False), comparison operators, logical and/or/not, and Truthy vs Falsy value evaluation in Python.' },
      { num: 12, slug: '12-python-none', title: '12. None & NoneType', desc: 'Understanding None in Python, NoneType object, void function returns, default mutable parameter sentinels, and is None checks.' },
      { num: 13, slug: '13-checking-data-types-with-type', title: '13. Checking data types with type()', desc: 'Runtime type checking using type() vs isinstance(), checking class inheritance, and dynamic type inspection.' },
      { num: 14, slug: '14-python-type-conversion', title: '14. Type conversion (Type Casting)', desc: 'Implicit type coercion vs explicit type casting (int, float, str, bool, list, set), and handling ValueError casting exceptions.' },
      { num: 15, slug: '15-basic-input-and-output', title: '15. Basic input and output', desc: 'Console output formatting with print() sep and end arguments, reading input via input(), and interactive terminal stdin pipelines.' }
    ]
  },
  {
    id: 'phase2',
    title: 'Phase 2: Operators and Control Flow',
    icon: '⚡',
    subgroups: [
      {
        name: 'Operators',
        lessons: [
          { num: 16, slug: '16-arithmetic-operators', title: '16. Arithmetic operators (+, -, *, /, //, %, **)', desc: 'Addition, subtraction, multiplication, true division, floor division, modulus, and exponentiation operators in Python.' },
          { num: 17, slug: '17-assignment-operators', title: '17. Assignment operators (=, +=, -=, *=, ...)', desc: 'Compound assignment operators, walrus operator (:=), and variable mutation patterns in Python 3.' },
          { num: 18, slug: '18-comparison-operators', title: '18. Comparison operators (==, !=, >, <, >=, <=)', desc: 'Value equality vs inequality, relational operators, chained comparisons (1 < x < 10), and string comparisons.' },
          { num: 19, slug: '19-logical-operators', title: '19. Logical operators (and, or, not)', desc: 'Boolean logic, short-circuit evaluation, truth tables, and combining complex boolean conditions.' },
          { num: 20, slug: '20-identity-operators', title: '20. Identity operators (is, is not)', desc: 'Object identity vs value equality (is vs ==), memory address comparison, and Python interning mechanism.' },
          { num: 21, slug: '21-membership-operators', title: '21. Membership operators (in, not in)', desc: 'Checking element existence inside strings, lists, tuples, sets, and dictionary keys with O(1) and O(n) performance.' },
          { num: 22, slug: '22-bitwise-operators', title: '22. Bitwise operators (&, |, ^, ~, <<, >>)', desc: 'Binary bit-level operations: AND, OR, XOR, NOT, left shift, and right shift with practical bitmask examples.' },
          { num: 23, slug: '23-operator-precedence', title: '23. Operator precedence & associativity', desc: 'BODMAS/PEMDAS in Python, operator evaluation hierarchy, and using parentheses for explicit clarity.' }
        ]
      },
      {
        name: 'Conditions & Loops',
        lessons: [
          { num: 24, slug: '24-conditional-statements-if-elif-else', title: '24. Conditions (if, if-else, if-elif-else)', desc: 'Decision making in Python: if conditions, elif chains, else fallback blocks, and truthiness guard clauses.' },
          { num: 25, slug: '25-nested-conditions-and-ternary', title: '25. Nested if & Ternary Operator', desc: 'Nested conditional logic, short-hand conditional expressions (x if c else y), and pass statement.' },
          { num: 26, slug: '26-while-loops-and-infinite-loops', title: '26. while loops & Loop mechanics', desc: 'Condition-controlled loops, while True with break conditions, loop counters, and avoiding infinite loops.' },
          { num: 27, slug: '27-for-loops-and-range', title: '27. for loops & range() function', desc: 'Iterating over sequences, range(start, stop, step), enumerate(), and zip() parallel iteration in Python.' },
          { num: 28, slug: '28-loop-control-break-continue-pass', title: '28. Loop controls: break, continue, pass & else', desc: 'Early loop exit with break, skipping iterations with continue, pass placeholder, and loop else clause.' }
        ]
      }
    ]
  }
];

// Flatten all lessons
const ALL_LESSONS = [];
PHASES.forEach(p => {
  if (p.lessons) {
    p.lessons.forEach(l => {
      l.phaseId = p.id;
      l.phaseTitle = p.title;
      ALL_LESSONS.push(l);
    });
  }
  if (p.subgroups) {
    p.subgroups.forEach(sg => {
      sg.lessons.forEach(l => {
        l.phaseId = p.id;
        l.phaseTitle = p.title;
        l.subgroupName = sg.name;
        ALL_LESSONS.push(l);
      });
    });
  }
});

console.log(`Total Lessons configured: ${ALL_LESSONS.length}`);

// Function to generate the accordion sidebar HTML
function generateAccordionSidebar(currentLessonNum = null) {
  let html = `    <div class="sidebar-accordion">\n`;

  PHASES.forEach(phase => {
    // Check if current lesson belongs to this phase
    const hasActive = ALL_LESSONS.some(l => l.phaseId === phase.id && l.num === currentLessonNum);
    const isOpen = hasActive || (currentLessonNum === null && phase.id === 'phase1');
    const activeHeaderClass = isOpen ? ' active' : '';
    const openContentClass = isOpen ? ' open' : '';
    const iconChar = isOpen ? '▶' : '▶';

    let totalLessonsCount = 0;
    if (phase.lessons) totalLessonsCount = phase.lessons.length;
    if (phase.subgroups) totalLessonsCount = phase.subgroups.reduce((acc, sg) => acc + sg.lessons.length, 0);

    html += `      <!-- ${phase.title} -->\n`;
    html += `      <button class="accordion-header${activeHeaderClass}" onclick="toggleAccordion(this)">\n`;
    html += `        <span class="accordion-title">${phase.icon} ${phase.title}</span>\n`;
    html += `        <div style="display:flex; align-items:center;">\n`;
    html += `          <span class="accordion-badge">${totalLessonsCount} Topics</span>\n`;
    html += `          <span class="accordion-icon">▶</span>\n`;
    html += `        </div>\n`;
    html += `      </button>\n`;
    html += `      <div class="accordion-content${openContentClass}">\n`;

    if (phase.lessons) {
      phase.lessons.forEach(l => {
        const isActive = l.num === currentLessonNum ? ' class="active"' : '';
        html += `        <a href="/blog-python/${l.slug}.html"${isActive}>${l.title}</a>\n`;
      });
    }

    if (phase.subgroups) {
      phase.subgroups.forEach(sg => {
        html += `        <div class="sub-heading">${sg.name}</div>\n`;
        sg.lessons.forEach(l => {
          const isActive = l.num === currentLessonNum ? ' class="active"' : '';
          html += `        <a href="/blog-python/${l.slug}.html"${isActive}>${l.title}</a>\n`;
        });
      });
    }

    html += `      </div>\n\n`;
  });

  html += `    </div>\n`;
  return html;
}

// Function to generate lesson detailed body
function getLessonContent(lesson) {
  let sampleCode = `# ${lesson.title} Demo\nprint("🚀 Welcome to ${lesson.title} in Python 3!")`;
  let practiceCode = `# Practice Challenge: ${lesson.title}\nprint("Solve the challenge below:")`;

  if (lesson.num === 1) {
    sampleCode = `# Python 3: Clean, Expressive & Powerful
name = "Guido van Rossum"
created_year = 1991
print(f"🐍 Python was created by {name} in {created_year}.")

# Dynamic typing and expressive syntax
languages = ["Python", "JavaScript", "Java", "C++"]
print(f"Popular Languages: {', '.join(languages)}")`;
    practiceCode = `# Print your name, career goal, and compute inline math
user_name = "Future Python Engineer"
print(f"👋 Hello, my name is {user_name}!")
print("Calculation:", 25 * 4 + 100)`;
  } else if (lesson.num === 7) {
    sampleCode = `# Variables in Python (Names referencing objects)
user_name = "Balaji"
user_age = 24
is_developer = True

print(f"User: {user_name}, Age: {user_age}, Developer: {is_developer}")
print(f"Memory Address id(user_name): {id(user_name)}")`;
    practiceCode = `# Swap two variables without using a temporary variable
a, b = 100, 200
print(f"Before: a={a}, b={b}")
a, b = b, a
print(f"After:  a={a}, b={b}")`;
  } else if (lesson.num === 9) {
    sampleCode = `# Numbers: int, float, complex
a = 25
b = 4
print("Addition (+):", a + b)
print("Floor Division (//):", a // b)
print("Modulus (%):", a % b)
print("Power (**):", a ** 2)`;
    practiceCode = `import math
radius = 6.0
area = math.pi * (radius ** 2)
print(f"Circle Area (r={radius}): {area:.2f}")`;
  } else if (lesson.num === 16) {
    sampleCode = `# Python Arithmetic Operators
x, y = 20, 6
print(f"{x} + {y} = {x + y}")
print(f"{x} - {y} = {x - y}")
print(f"{x} * {y} = {x * y}")
print(f"{x} / {y} = {x / y} (True division)")
print(f"{x} // {y} = {x // y} (Floor division)")
print(f"{x} % {y} = {x % y} (Remainder)")
print(f"{x} ** {y} = {x ** y} (Power)")`;
    practiceCode = `# Calculate remainder and quotient of large numbers
dividend = 145
divisor = 12
print(f"Quotient: {dividend // divisor}, Remainder: {dividend % divisor}")`;
  } else if (lesson.num === 24) {
    sampleCode = `# Python Conditional Statements
score = 85

if score >= 90:
    print("Grade: A+ 🌟")
elif score >= 80:
    print("Grade: A ✨")
elif score >= 70:
    print("Grade: B 👍")
else:
    print("Grade: Needs Improvement")`;
    practiceCode = `# Check if a number is positive, negative, or zero
num = -15
if num > 0:
    print("Positive number")
elif num < 0:
    print("Negative number")
else:
    print("Zero")`;
  } else if (lesson.num === 27) {
    sampleCode = `# for loop with range()
print("Counting from 1 to 5:")
for i in range(1, 6):
    print(f"  Step {i}")

# Iterating over collection with enumerate
fruits = ["Apple", "Mango", "Banana"]
for idx, fruit in enumerate(fruits, start=1):
    print(f"{idx}. {fruit}")`;
    practiceCode = `# Sum of all even numbers from 1 to 20
total = sum([x for x in range(1, 21) if x % 2 == 0])
print(f"Sum of evens (1-20): {total}")`;
  }

  return {
    sampleCode,
    practiceCode
  };
}

// Generate all lesson HTML files
ALL_LESSONS.forEach(lesson => {
  const prevLesson = ALL_LESSONS[lesson.num - 2];
  const nextLesson = ALL_LESSONS[lesson.num];
  const contentData = getLessonContent(lesson);

  const accordionSidebar = generateAccordionSidebar(lesson.num);

  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${lesson.title} — Python 3 Tutorial`,
    "description": lesson.desc,
    "articleSection": lesson.phaseTitle,
    "author": {
      "@type": "Organization",
      "name": "Our Compiler Editorial Team",
      "url": "https://www.ourcompiler.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Our Compiler",
      "url": "https://www.ourcompiler.com"
    },
    "datePublished": "2026-01-15",
    "dateModified": "2026-08-14"
  }, null, 2);

  const faqSchemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is ${lesson.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": lesson.desc
        }
      },
      {
        "@type": "Question",
        "name": `How do I run ${lesson.title} code online?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Click the 'Run in Compiler' button on any code block on this page to test and execute the code in Our Compiler's interactive Monaco Python editor with zero setup."
        }
      }
    ]
  }, null, 2);

  const lessonHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${lesson.title} — Python 3 Tutorial | Our Compiler</title>
  <meta name="description" content="${lesson.desc}" />
  <meta name="keywords" content="python tutorial, python 3 tutorial, learn python, ${lesson.title.toLowerCase()}, python online compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-python/${lesson.slug}.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
${schemaJson}
  </script>
  <script type="application/ld+json">
${faqSchemaJson}
  </script>

  <!-- Code Preload & Accordion Toggle Script -->
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
            navigator.clipboard.writeText(codeEl.textContent).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
            });
          });
          actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);

          const tryBtn = actionsContainer.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_python3', codeEl.textContent);
              window.location.href = '/online-python-compiler.html';
            });
          }
        });

        document.querySelectorAll('.try-box').forEach(tryBox => {
          const codeEl = tryBox.querySelector('pre code');
          const runBtn = tryBox.querySelector('.run-btn');
          if (codeEl && runBtn) {
            runBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_python3', codeEl.textContent);
              window.location.href = '/online-python-compiler.html';
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-python">

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html" class="active">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR WITH COLLAPSIBLE ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">Python 3 Course</div>
    <a href="/blog-python.html" style="margin-bottom:8px;">🐍 Python HOME</a>

${accordionSidebar}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-python-compiler.html" style="color:#58a6ff; font-weight:700;">▶ Try Python 3 Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-java.html">Java Course (27 Lessons)</a>
    <a href="/blog-c.html">C Language (20 Lessons)</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-python.html">Python 3</a><span class="sep">›</span>
      <span class="current">Lesson ${lesson.num}: ${lesson.title.split('—')[0]}</span>
    </div>

    <h1 class="page-title">${lesson.title}</h1>

    <div class="page-meta">
      <span class="badge">🐍 Python 3.12+</span>
      <span class="badge">🟢 Lesson ${lesson.num} of ${ALL_LESSONS.length}</span>
      <span class="badge">📂 ${lesson.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      ${lesson.desc} In this interactive tutorial, you will explore conceptual principles, memory models, best practices, executable code samples, and common pitfalls to avoid.
    </div>

    <div class="section-title"><span class="num">1</span> Overview & Core Concepts</div>
    <p>${lesson.desc} Python offers clean syntax and powerful built-in abstractions that streamline software development across web, machine learning, and automation workflows.</p>

    <div class="section-title"><span class="num">2</span> Executable Code Example</div>
    <div class="code-block">
      <div class="code-block-header">
        <span class="lang-tag">Python 3</span>
        <a class="try-btn" href="/online-python-compiler.html">▶ Run in Compiler</a>
      </div>
      <pre><code>${contentData.sampleCode}</code></pre>
    </div>

    <div class="callout">
      <div class="callout-title">⚠️ Key Best Practice & Common Pitfalls</div>
      <p>Always write clean, PEP 8 compliant code with descriptive variable names and consistent 4-space indentation. Test your code in the online sandbox above before deploying to production.</p>
    </div>

    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Practice Challenge</div>
      <p>Modify and test this interactive coding challenge in Our Compiler:</p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Python 3</span>
          <a class="try-btn" href="/online-python-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>${contentData.practiceCode}</code></pre>
      </div>
      <a class="run-btn" href="/online-python-compiler.html">Run This Code in Our Online Compiler →</a>
    </div>

    <div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
    <div class="faq-card">
      <h4>Q: What is the main objective of ${lesson.title}?</h4>
      <p>${lesson.desc}</p>
    </div>
    <div class="faq-card">
      <h4>Q: How do I test this code without installing Python?</h4>
      <p>Click the green '▶ Run in Compiler' button on any code block to execute directly in Our Compiler's cloud sandbox.</p>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy & tested on Python 3.12+ runtime · Last updated August 2026</span>
      </div>
    </div>

    <div class="nav-footer">
      ${prevLesson ? `
      <a href="${prevLesson.slug}.html" class="nav-btn">
        <span class="label">← Previous Lesson</span>
        <span class="title">${prevLesson.title}</span>
      </a>` : `
      <a href="/blog-python.html" class="nav-btn">
        <span class="label">← Python Overview</span>
        <span class="title">Course Index</span>
      </a>`}

      ${nextLesson ? `
      <a href="${nextLesson.slug}.html" class="nav-btn" style="text-align:right;">
        <span class="label">Next Lesson →</span>
        <span class="title">${nextLesson.title}</span>
      </a>` : `
      <a href="/online-python-compiler.html" class="nav-btn" style="text-align:right;">
        <span class="label">Course Completed 🎉</span>
        <span class="title">▶ Practice in Python IDE</span>
      </a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(path.join(pythonDir, `${lesson.slug}.html`), lessonHtml, 'utf8');
});

console.log(`✅ Successfully generated all ${ALL_LESSONS.length} lessons with collapsible accordion sidebar!`);

// 3. Update public/blog-python.html Hub
const hubAccordionSidebar = generateAccordionSidebar(null);

const hubRows = ALL_LESSONS.map(l => `
      <tr>
        <td style="font-weight:700; color:#58a6ff;">Lesson ${l.num}</td>
        <td><strong><a href="/blog-python/${l.slug}.html" style="color:var(--text); text-decoration:none;">${l.title}</a></strong></td>
        <td><span style="font-size:12px; color:var(--text3);">${l.phaseTitle}</span></td>
        <td><a href="/blog-python/${l.slug}.html" style="background:rgba(56,189,248,0.15); color:#38bdf8; padding:4px 10px; border-radius:6px; font-size:12px; text-decoration:none; font-weight:600;">Read Lesson →</a></td>
      </tr>
`).join('');

const hubHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Python 3 Master Tutorial & Complete Course (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master Python 3 from complete beginner to advanced with our interactive curriculum, collapsible phase roadmap, live code executions, and interview prep." />
  <meta name="keywords" content="python tutorial, python 3 course, learn python online, python basics, python operators, python control flow, free python tutorial" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-python.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-python/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org Course Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Python 3 Complete Masterclass (2026 Edition)",
    "description": "Learn Python 3 from basics to advanced OOP, operators, control flow, and data structures with interactive browser compilation.",
    "provider": {
      "@type": "Organization",
      "name": "Our Compiler",
      "url": "https://www.ourcompiler.com"
    },
    "educationalLevel": "Beginner to Advanced",
    "isAccessibleForFree": true
  }
  </script>

  <!-- Accordion & Theme Script -->
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
      });
    })();
  </script>
</head>
<body class="lang-python">

<!-- TOP NAVIGATION -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html" class="active">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR WITH ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">Python 3 Course</div>
    <a href="/blog-python.html" class="active" style="margin-bottom:8px;">🐍 Python HOME</a>

${hubAccordionSidebar}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-python-compiler.html" style="color:#58a6ff; font-weight:700;">▶ Try Python 3 Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-java.html">Java Course (27 Lessons)</a>
    <a href="/blog-c.html">C Language (20 Lessons)</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">Python 3 Masterclass</span>
    </div>

    <h1 class="page-title">Python 3 Programming Master Tutorial</h1>

    <div class="page-meta">
      <span class="badge">🐍 Python 3.12+</span>
      <span class="badge">🟢 ${ALL_LESSONS.length} Structured Lessons</span>
      <span class="badge">📂 Collapsible Interactive Roadmap</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's Python 3 Master Course</strong>. Python is the world's #1 programming language powering Artificial Intelligence, Machine Learning, Data Science, Web Development (Django/FastAPI), Cybersecurity, and Cloud Automation. Use the collapsible roadmap in the left sidebar to navigate step-by-step through our structured curriculum.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(56,189,248,0.12), rgba(99,102,241,0.06)); border: 1px solid rgba(56,189,248,0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#38bdf8; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Begin with Phase 1: Python Basics or jump directly into Phase 2: Operators & Control Flow:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-python/01-python-ante-enti.html" style="background:linear-gradient(135deg, #38bdf8, #6366f1); color:#fff; font-weight:700; padding:10px 20px; border-radius:8px; text-decoration:none;">Start Phase 1: Python Basics →</a>
        <a href="/blog-python/16-arithmetic-operators.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 20px; border-radius:8px; text-decoration:none;">Start Phase 2: Operators →</a>
      </div>
    </div>

    <!-- Full Curriculum Table -->
    <div class="section-title"><span class="num">📚</span> Full Course Curriculum (${ALL_LESSONS.length} Lessons)</div>
    <div style="overflow-x:auto; margin-top:16px;">
      <table class="tbl" style="width:100%; border-collapse:collapse;">
        <thead>
          <tr style="background:var(--bg3); text-align:left;">
            <th style="padding:12px 16px;">Lesson #</th>
            <th style="padding:12px 16px;">Lesson Title & Topic</th>
            <th style="padding:12px 16px;">Category Phase</th>
            <th style="padding:12px 16px;">Action</th>
          </tr>
        </thead>
        <tbody>
${hubRows}
        </tbody>
      </table>
    </div>

    <div class="author" style="margin-top:40px;">
      <div class="avatar">OC</div>
      <div>
        <strong>Curated by Our Compiler Technical Editorial Team</strong><br>
        <span>Published for 2026 Academic & Industry Reference · 100% Free & Open Access</span>
      </div>
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(baseDir, 'blog-python.html'), hubHtml, 'utf8');
console.log('✅ Generated master public/blog-python.html with collapsible sidebar accordion!');
