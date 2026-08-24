async function testPaizaJavaFast() {
  const start = Date.now();
  try {
    const code = 'public class Main { public static void main(String[] args) { System.out.println("Hello Java Fast!"); } }';
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
    const id = createData.id;

    let result;
    while (true) {
      const detailsRes = await fetch(`https://api.paiza.io/runners/get_details?id=${id}&api_key=guest`);
      result = await detailsRes.json();
      if (result.status === 'completed') break;
      await new Promise(r => setTimeout(r, 150));
    }

    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`⚡ Paiza Java Total Time: ${elapsed}s | Output: ${JSON.stringify(result.stdout || result.stderr)}`);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testPaizaJavaFast();
