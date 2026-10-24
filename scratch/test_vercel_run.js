async function testVercelApi() {
  const start = Date.now();
  console.log('Testing https://www.ourcompiler.com/api/run with Java...');
  try {
    const res = await fetch('https://www.ourcompiler.com/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'java',
        code: 'public class Main { public static void main(String[] args) { System.out.println("Hello from Vercel /api/run"); } }',
        stdin: ''
      })
    });
    const elapsed = ((Date.now() - start)/1000).toFixed(2);
    console.log('Status:', res.status, 'in', elapsed, 's');
    console.log('Result:', await res.json());
  } catch (e) {
    console.error('Error:', e.message);
  }
}
testVercelApi();
