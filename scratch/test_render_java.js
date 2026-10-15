async function testRender() {
  const start = Date.now();
  console.log('Testing Render GET / ...');
  try {
    const r1 = await fetch('https://mana-compailer-backend-docker.onrender.com/');
    console.log('Render status:', r1.status, await r1.json());
  } catch (e) {
    console.error('GET error:', e.message);
  }
  
  console.log('\nTesting Render POST /api/run with Java ...');
  const t0 = Date.now();
  try {
    const r2 = await fetch('https://mana-compailer-backend-docker.onrender.com/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'java',
        code: 'public class Main { public static void main(String[] args) { System.out.println("Java test"); } }',
        stdin: ''
      })
    });
    const elapsed = ((Date.now() - t0) / 1000).toFixed(2);
    console.log('Render Java status:', r2.status, 'in', elapsed, 's:', await r2.json());
  } catch (e) {
    console.error('POST error:', e.message);
  }
}
testRender();
