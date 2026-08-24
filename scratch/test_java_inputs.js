async function testJavaWithInput() {
  const start = Date.now();
  const javaCode = `
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter name: ");
        if (sc.hasNext()) {
            String name = sc.next();
            System.out.println("Hello, " + name + "!");
        } else {
            System.out.println("No input provided");
        }
    }
}
  `;

  try {
    const createRes = await fetch('https://api.paiza.io/runners/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'java',
        source_code: javaCode,
        input: 'Balaji',
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
    console.log(`[Paiza Java Input Test] Elapsed: ${elapsed}s`);
    console.log('stdout:', JSON.stringify(result.stdout));
    console.log('stderr:', JSON.stringify(result.stderr));
    console.log('build_stderr:', JSON.stringify(result.build_stderr));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testJavaWithInput();
