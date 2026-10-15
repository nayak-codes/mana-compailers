const BACKEND = 'https://mana-compailer-backend-docker.onrender.com';

async function testScenario(name, payload, timeoutMs = 20000) {
  console.log(`\n=== Testing Scenario: ${name} ===`);
  const start = Date.now();
  try {
    const res = await fetch(`${BACKEND}/api/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs)
    });
    const duration = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`Status: ${res.status} (${duration}s)`);
    const text = await res.text();
    try {
      console.log('Result JSON:', JSON.stringify(JSON.parse(text), null, 2));
    } catch {
      console.log('Result Raw:', text.slice(0, 300));
    }
  } catch (err) {
    const duration = ((Date.now() - start) / 1000).toFixed(2);
    console.error(`Error (${duration}s):`, err.message);
  }
}

async function run() {
  // Test 1: Infinite loop in Python
  await testScenario('Infinite Loop (Python)', {
    language: 'python3',
    code: 'while True: pass',
    stdin: ''
  }, 25000);

  // Test 2: Fork bomb / thread bomb or memory allocation
  await testScenario('Memory Limit (Python)', {
    language: 'python3',
    code: 'a = " " * (100 * 1024 * 1024); print("allocated 100MB")',
    stdin: ''
  }, 25000);

  // Test 3: Large Memory Allocation (Python 500MB)
  await testScenario('Large Memory (Python 500MB)', {
    language: 'python3',
    code: 'a = " " * (500 * 1024 * 1024); print("allocated 500MB")',
    stdin: ''
  }, 25000);

  // Test 4: Missing Stdin in Python input()
  await testScenario('Missing Stdin (Python)', {
    language: 'python3',
    code: 'x = input("Enter: "); print(x)',
    stdin: ''
  }, 25000);

  // Test 5: Normal health check after stress tests
  await testScenario('Post-Test Health Check', {
    language: 'python3',
    code: 'print("Backend still alive!")',
    stdin: ''
  }, 25000);
}

run();
