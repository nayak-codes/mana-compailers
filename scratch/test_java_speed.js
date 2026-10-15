async function testPaizaJava() {
  const code = 'public class Main { public static void main(String[] args) { System.out.println("Hello from Java!"); } }';
  const start = Date.now();
  try {
    const createRes = await fetch('https://api.paiza.io/runners/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'java',
        source_code: code,
        input: '',
        api_key: 'guest'
      })
    });
    const createData = await createRes.json();
    console.log('Paiza Created in:', ((Date.now() - start)/1000).toFixed(2), 's, id:', createData.id);
    
    let tries = 35;
    while (tries-- > 0) {
      await new Promise(r => setTimeout(r, 120));
      const detRes = await fetch(`https://api.paiza.io/runners/get_details?id=${createData.id}&api_key=guest`);
      const det = await detRes.json();
      if (det.status === 'completed') {
        const elapsed = ((Date.now() - start)/1000).toFixed(2);
        console.log('Paiza Finished in:', elapsed, 's! Output:', (det.stdout || '').trim());
        return elapsed;
      }
    }
  } catch (e) {
    console.log('Paiza Error:', e.message);
  }
}

async function testPistonJava() {
  const start = Date.now();
  try {
    const res = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'java',
        version: '15.0.2',
        files: [{ name: 'Main.java', content: 'public class Main { public static void main(String[] args) { System.out.println("Hello from Piston Java!"); } }' }]
      })
    });
    const data = await res.json();
    const elapsed = ((Date.now() - start)/1000).toFixed(2);
    console.log('Piston Java Finished in:', elapsed, 's! Output:', data?.run?.output?.trim());
    return elapsed;
  } catch (e) {
    console.log('Piston Error:', e.message);
  }
}

async function run() {
  console.log('--- Testing Paiza Java ---');
  await testPaizaJava();
  console.log('\n--- Testing Piston Java ---');
  await testPistonJava();
}

run();
