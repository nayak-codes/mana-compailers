async function runTest() {
  const start = Date.now();
  console.log('Testing Java execution...');
  
  const code = `
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Fast Java Engine!");
        int sum = 0;
        for(int i = 1; i <= 10; i++) sum += i;
        System.out.println("Sum 1 to 10: " + sum);
    }
}
  `;

  try {
    // Test the fast runner logic
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

    let details;
    while (true) {
      await new Promise(r => setTimeout(r, 150));
      const detailsRes = await fetch(`https://api.paiza.io/runners/get_details?id=${id}&api_key=guest`);
      details = await detailsRes.json();
      if (details.status === 'completed') break;
    }

    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`✅ Java Executed in ${elapsed}s (was 8.79s)!`);
    console.log('Output:\n' + details.stdout);
  } catch (err) {
    console.error('Error:', err);
  }
}

runTest();
