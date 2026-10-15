const BACKEND = 'https://mana-compailer-backend-docker.onrender.com';

async function testLang(name, lang, code, stdin = '') {
  console.log(`\n--- Testing ${name} (${lang}) ---`);
  const start = Date.now();
  try {
    const res = await fetch(`${BACKEND}/api/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: lang, code, stdin }),
      signal: AbortSignal.timeout(30000)
    });
    const duration = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`Status: ${res.status} (${duration}s)`);
    const data = await res.json();
    console.log('Result:', JSON.stringify(data, null, 2));
    return { ok: res.ok, data, duration };
  } catch (err) {
    const duration = ((Date.now() - start) / 1000).toFixed(2);
    console.error(`Error (${duration}s):`, err.message);
    return { ok: false, error: err.message, duration };
  }
}

async function runAll() {
  console.log('Testing GET / on Render backend...');
  try {
    const r = await fetch(BACKEND + '/', { signal: AbortSignal.timeout(15000) });
    console.log('Root endpoint:', r.status, await r.json());
  } catch (e) {
    console.error('Root endpoint failed:', e.message);
  }

  // 1. Python
  await testLang('Python', 'python3', 'print("Hello Python")');

  // 2. C
  await testLang('C', 'c', '#include <stdio.h>\nint main() { printf("Hello C\\n"); return 0; }');

  // 3. C++
  await testLang('C++', 'cpp17', '#include <iostream>\nint main() { std::cout << "Hello C++" << std::endl; return 0; }');

  // 4. Java (backend directly)
  await testLang('Java', 'java', 'public class Main { public static void main(String[] args) { System.out.println("Hello Java"); } }');

  // 5. JavaScript / Node
  await testLang('JavaScript', 'nodejs', 'console.log("Hello Node")');

  // 6. Go
  await testLang('Go', 'go', 'package main\nimport "fmt"\nfunc main() { fmt.Println("Hello Go") }');

  // 7. Rust
  await testLang('Rust', 'rust', 'fn main() { println!("Hello Rust"); }');

  // 8. PHP
  await testLang('PHP', 'php', '<?php echo "Hello PHP"; ?>');

  // 9. Ruby
  await testLang('Ruby', 'ruby', 'puts "Hello Ruby"');

  // 10. C#
  await testLang('C#', 'csharp', 'using System; class Program { static void Main() { Console.WriteLine("Hello C#"); } }');
}

runAll();
