async function testJudge0() {
  const start = Date.now();
  console.log('Testing Judge0 CE API for Java...');
  try {
    const res = await fetch('https://judge0-extra-ce.p.rapidapi.com/submissions?wait=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'YOUR_KEY_HERE'
      },
      body: JSON.stringify({
        language_id: 62, // Java (OpenJDK 13.0.1)
        source_code: 'public class Main { public static void main(String[] args) { System.out.println("Hello Java"); } }'
      })
    });
    console.log('Judge0 Status:', res.status);
  } catch (err) {
    console.error('Judge0 Error:', err.message);
  }
}

async function testGlot() {
  const start = Date.now();
  console.log('Testing Glot.io public runner for Java...');
  try {
    const res = await fetch('https://glot.io/api/run/java/latest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 01234567-89ab-cdef-0123-456789abcdef'
      },
      body: JSON.stringify({
        files: [{ name: 'Main.java', content: 'public class Main { public static void main(String[] args) { System.out.println("Hello Java"); } }' }]
      })
    });
    const data = await res.json();
    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`[Glot Java] Status: ${res.status} | Elapsed: ${elapsed}s | Output:`, JSON.stringify(data));
  } catch (err) {
    console.error('[Glot Java] Error:', err.message);
  }
}

async function testWandbox() {
  const start = Date.now();
  console.log('Testing Wandbox API for Java...');
  try {
    const res = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler: 'openjdk-head', // or java
        code: 'public class Main { public static void main(String[] args) { System.out.println("Hello Java"); } }'
      })
    });
    const data = await res.json();
    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`[Wandbox Java] Status: ${res.status} | Elapsed: ${elapsed}s | Output:`, JSON.stringify(data));
  } catch (err) {
    console.error('[Wandbox Java] Error:', err.message);
  }
}

async function main() {
  await testWandbox();
}

main();
