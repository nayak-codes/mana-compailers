async function testPaizaJavaWithInput() {
  const code = `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();
        int age = sc.nextInt();
        System.out.println("Hello " + name + ", age " + age);
    }
}`;
  const stdin = "Alice\n25";
  const start = Date.now();
  try {
    const createRes = await fetch('https://api.paiza.io/runners/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'java',
        source_code: code,
        input: stdin,
        api_key: 'guest'
      })
    });
    const createData = await createRes.json();
    let tries = 35;
    while (tries-- > 0) {
      await new Promise(r => setTimeout(r, 120));
      const detRes = await fetch(`https://api.paiza.io/runners/get_details?id=${createData.id}&api_key=guest`);
      const det = await detRes.json();
      if (det.status === 'completed') {
        const elapsed = ((Date.now() - start)/1000).toFixed(2);
        console.log(`[Paiza Java with stdin] Finished in: ${elapsed}s`);
        console.log('Output:', det.stdout);
        console.log('Error:', det.stderr || det.build_stderr);
        return;
      }
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
}

testPaizaJavaWithInput();
