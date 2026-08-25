// Test: Java program with import java.util.*; and Scanner (with stdin provided)
async function testJavaWithScanner() {
  const code = `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(a + b);
    }
}`
  
  console.log('Test 1: Java Scanner WITH stdin (should work via Paiza)...')
  const start1 = Date.now()
  const res1 = await fetch('http://localhost:3002/api/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ language: 'java', code, stdin: '3\n4' })
  })
  const data1 = await res1.json()
  console.log(`Time: ${((Date.now()-start1)/1000).toFixed(2)}s | Output: ${JSON.stringify(data1)}`)

  console.log('\nTest 2: Java Scanner WITHOUT stdin (should route to Render backend, show input prompt)...')
  const start2 = Date.now()
  const res2 = await fetch('http://localhost:3002/api/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ language: 'java', code, stdin: '' })
  })
  const data2 = await res2.json()
  console.log(`Time: ${((Date.now()-start2)/1000).toFixed(2)}s | Output: ${JSON.stringify(data2)}`)
}

testJavaWithScanner()
