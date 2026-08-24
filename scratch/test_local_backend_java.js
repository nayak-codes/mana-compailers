async function testLocalBackendJava() {
  const start = Date.now();
  console.log('Testing local backend (http://localhost:3002/api/run) for Java execution...');
  
  try {
    const res = await fetch('http://localhost:3002/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'java',
        code: 'public class Main { public static void main(String[] args) { System.out.println("Hello from Local Backend!"); } }',
        stdin: ''
      })
    });
    const data = await res.json();
    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`⚡ Local Backend Java Total Execution Time: ${elapsed}s`);
    console.log('Output:', JSON.stringify(data));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testLocalBackendJava();
