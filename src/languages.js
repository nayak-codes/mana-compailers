export const LANGUAGES = [
  { id: 'python3',  label: 'Python 3',   monacoLang: 'python',     icon: '🐍', ext: 'py',   jVersion: '4' },
  { id: 'java',     label: 'Java',       monacoLang: 'java',       icon: '☕', ext: 'java', jVersion: '4' },
  { id: 'c',        label: 'C',          monacoLang: 'c',          icon: '🔵', ext: 'c',    jVersion: '5' },
  { id: 'cpp17',    label: 'C++',        monacoLang: 'cpp',        icon: '⚡', ext: 'cpp',  jVersion: '1' },
  { id: 'nodejs',   label: 'JavaScript', monacoLang: 'javascript', icon: '🟡', ext: 'js',   jVersion: '4' },
  { id: 'go',       label: 'Go',         monacoLang: 'go',         icon: '🐹', ext: 'go',   jVersion: '4' },
  { id: 'rust',     label: 'Rust',       monacoLang: 'rust',       icon: '🦀', ext: 'rs',   jVersion: '4' },
  { id: 'php',      label: 'PHP',        monacoLang: 'php',        icon: '🐘', ext: 'php',  jVersion: '4' },
  { id: 'ruby',     label: 'Ruby',       monacoLang: 'ruby',       icon: '💎', ext: 'rb',   jVersion: '4' },
  { id: 'csharp',   label: 'C#',         monacoLang: 'csharp',     icon: '🔷', ext: 'cs',   jVersion: '4' },
  { id: 'html',     label: 'HTML/CSS/JS',monacoLang: 'html',       icon: '🌐', ext: 'html', jVersion: '1' },
]

export const TEMPLATES = {
  python3: 'print("Hello, World!")',

  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',

  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',

  cpp17: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',

  nodejs: 'console.log("Hello, World!");',

  go: 'package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',

  rust: 'fn main() {\n    println!("Hello, World!");\n}',

  php: '<?php\necho "Hello, World!\\n";',

  ruby: 'puts "Hello, World!"',

  csharp: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',

  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Live Web Preview</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="card">
    <span class="badge">🌐 HTML5 · CSS3 · JS</span>
    <h1 class="title">Hello World! 🚀</h1>
    <p id="currentTime">Loading live time...</p>
    <button id="actionBtn" class="btn">Click Me ✨</button>
    <div id="counter" class="counter">Clicks: 0</div>
  </div>

  <script src="script.js"></script>
</body>
</html>`,
}

export const DEFAULT_HTML_FILES = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello, World!</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="card">
    <span class="badge">🌐 HTML5 · CSS3 · JS</span>
    <h1 class="title">Hello World! 🚀</h1>
    <p id="currentTime">Loading live time...</p>
    <button id="actionBtn" class="btn">Click Me ✨</button>
    <div id="counter" class="counter">Clicks: 0</div>
  </div>

  <script src="script.js"></script>
</body>
</html>`,

  css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%);
  color: #ffffff;
  padding: 20px;
}

.card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  padding: 36px 32px;
  max-width: 440px;
  width: 100%;
  text-align: center;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
}

.badge {
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: #fff;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  display: inline-block;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}

.title {
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 12px;
  background: linear-gradient(90deg, #38bdf8, #818cf8, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 24px;
}

.btn {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  border: none;
  padding: 12px 28px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.35);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(99, 102, 241, 0.5);
}

.btn:active {
  transform: translateY(0);
}

.counter {
  margin-top: 18px;
  font-size: 14px;
  color: #a5b4fc;
  font-weight: 600;
}`,

  js: `// Update live date & time
const timeEl = document.getElementById('currentTime');
if (timeEl) {
  timeEl.textContent = 'Loaded at ' + new Date().toLocaleTimeString();
}

// Button interactive click handler
let count = 0;
const btn = document.getElementById('actionBtn');
const counter = document.getElementById('counter');

if (btn) {
  btn.addEventListener('click', () => {
    count++;
    counter.textContent = \`Clicks: \${count} 🚀\`;
    console.log(\`[script.js] Button clicked! New count: \${count}\`);
  });
}`
}
