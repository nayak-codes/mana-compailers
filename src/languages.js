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
  python3: '# Python 3\nprint("Hello from Mana Compiler!")\nfor i in range(1, 6):\n    print(str(i) + " x " + str(i) + " = " + str(i*i))',

  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Mana Compiler!");\n        for (int i = 1; i <= 5; i++) {\n            System.out.println(i + " x " + i + " = " + (i*i));\n        }\n    }\n}',

  c: '#include <stdio.h>\nint main() {\n    printf("Hello from Mana Compiler!\\n");\n    for (int i = 1; i <= 5; i++)\n        printf("%d x %d = %d\\n", i, i, i*i);\n    return 0;\n}',

  cpp17: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello from Mana Compiler!" << endl;\n    for (int i = 1; i <= 5; i++)\n        cout << i << " x " << i << " = " << i*i << endl;\n    return 0;\n}',

  nodejs: 'console.log("Hello from Mana Compiler!");\nfor (let i = 1; i <= 5; i++)\n    console.log(i + " x " + i + " = " + (i*i));',

  go: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello from Mana Compiler!")\n    for i := 1; i <= 5; i++ {\n        fmt.Printf("%d x %d = %d\\n", i, i, i*i)\n    }\n}',

  rust: 'fn main() {\n    println!("Hello from Mana Compiler!");\n    for i in 1..=5 {\n        println!("{} x {} = {}", i, i, i*i);\n    }\n}',

  php: '<?php\necho "Hello from Mana Compiler!\\n";\nfor ($i = 1; $i <= 5; $i++)\n    echo "$i x $i = " . ($i*$i) . "\\n";',

  ruby: 'puts "Hello from Mana Compiler!"\n(1..5).each { |i| puts "#{i} x #{i} = #{i*i}" }',
}
