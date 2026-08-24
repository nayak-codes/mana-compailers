async function testRun(lang, code) {
  const start = Date.now();
  console.log(`Sending ${lang} code request...`);
  try {
    const res = await fetch('https://mana-compailer-backend-docker.onrender.com/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: lang, code, stdin: '' })
    });
    const data = await res.json();
    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`[${lang}] Status: ${res.status} | Elapsed: ${elapsed}s | Output:`, JSON.stringify(data));
  } catch (err) {
    console.error(`[${lang}] Error:`, err.message);
  }
}

async function main() {
  await testRun('python3', 'print("Hello Python")');
  await testRun('java', 'public class Main { public static void main(String[] args) { System.out.println("Hello Java"); } }');
}

main();
