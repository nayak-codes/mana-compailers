// Test Paiza response time with different stdin inputs for Java Scanner
async function testPaizaInputHanging() {
  const code = `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(n);
    }
}`

  async function runWithInput(inputVal, label) {
    const start = Date.now()
    const createRes = await fetch('https://api.paiza.io/runners/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'java',
        source_code: code,
        input: inputVal,
        api_key: 'guest'
      })
    })
    const createData = await createRes.json()
    const id = createData.id

    let tries = 0
    while (tries++ < 40) {
      await new Promise(r => setTimeout(r, 100))
      const detailsRes = await fetch(`https://api.paiza.io/runners/get_details?id=${id}&api_key=guest`)
      const details = await detailsRes.json()
      if (details.status === 'completed') {
        const time = ((Date.now() - start) / 1000).toFixed(2)
        console.log(`[${label}] Completed in ${time}s! stdout: "${details.stdout}", stderr: "${details.stderr?.substring(0, 50)}..."`)
        return
      }
    }
    console.log(`[${label}] Timed out after ${((Date.now() - start) / 1000).toFixed(2)}s`)
  }

  console.log('Testing Paiza API with empty string ""...')
  await runWithInput('', 'Empty String ""')

  console.log('Testing Paiza API with EOF "\\x04"...')
  await runWithInput('\x04', 'EOF \\x04')

  console.log('Testing Paiza API with newline "\\n"...')
  await runWithInput('\n', 'Newline \\n')
}

testPaizaInputHanging()
