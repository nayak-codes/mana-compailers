async function testPistonJava() {
  const start = Date.now();
  console.log('Testing Piston public API for Java...');
  try {
    const res = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'java',
        version: '*',
        files: [{ name: 'Main.java', content: 'public class Main { public static void main(String[] args) { System.out.println("Hello Java Fast!"); } }' }]
      })
    });
    const data = await res.json();
    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`[Piston Java] Status: ${res.status} | Elapsed: ${elapsed}s | Output:`, JSON.stringify(data));
  } catch (err) {
    console.error('[Piston Java] Error:', err.message);
  }
}

testPistonJava();
