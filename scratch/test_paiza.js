async function testPaizaJava() {
  const start = Date.now();
  console.log('Testing Paiza.IO API for Java...');
  try {
    const code = 'public class Main { public static void main(String[] args) { System.out.println("Hello Java Paiza!"); } }';
    const createRes = await fetch(`https://api.paiza.io/runners/create?language=java&source_code=${encodeURIComponent(code)}&api_key=guest`, {
      method: 'POST'
    });
    const createData = await createRes.json();
    const id = createData.id;
    console.log('Created runner ID:', id);

    let status = 'running';
    let getResultData;
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 300));
      const getRes = await fetch(`https://api.paiza.io/runners/get_details?id=${id}&api_key=guest`);
      getResultData = await getRes.json();
      if (getResultData.status === 'completed') {
        break;
      }
    }

    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`[Paiza Java] Elapsed: ${elapsed}s | Output:`, JSON.stringify(getResultData.stdout || getResultData.stderr));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testPaizaJava();
