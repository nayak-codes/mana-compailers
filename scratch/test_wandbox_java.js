async function testWandboxJava() {
  const start = Date.now();
  console.log('Testing Wandbox openjdk-jdk-21+35 for Java...');
  try {
    const res = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler: 'openjdk-jdk-21+35',
        code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello Java Fast from Wandbox!");\n    }\n}'
      })
    });
    const data = await res.json();
    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`[Wandbox Java] Status: ${res.status} | Elapsed: ${elapsed}s`);
    console.log('Output:', data.program_output || data.compiler_output || data.program_error);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testWandboxJava();
