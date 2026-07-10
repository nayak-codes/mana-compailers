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
}
