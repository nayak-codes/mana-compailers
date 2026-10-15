async function testPaiza(lang, code) {
  try {
    const res = await fetch('https://api.paiza.io/runners/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: lang,
        source_code: code,
        input: '',
        api_key: 'guest'
      })
    });
    const data = await res.json();
    if (!data.id) return console.log(`Paiza ${lang}: failed to create`, data);
    
    let tries = 10;
    while (tries-- > 0) {
      await new Promise(r => setTimeout(r, 400));
      const detRes = await fetch(`https://api.paiza.io/runners/get_details?id=${data.id}&api_key=guest`);
      const det = await detRes.json();
      if (det.status === 'completed') {
        console.log(`Paiza ${lang}: SUCCESS ->`, (det.stdout || det.stderr || '').trim());
        return;
      }
    }
    console.log(`Paiza ${lang}: timed out waiting for details`);
  } catch (e) {
    console.log(`Paiza ${lang} error:`, e.message);
  }
}

async function run() {
  await testPaiza('python3', 'print("Paiza Python works")');
  await testPaiza('c', '#include <stdio.h>\nint main(){printf("Paiza C works\\n"); return 0;}');
  await testPaiza('rust', 'fn main(){println!("Paiza Rust works");}');
  await testPaiza('csharp', 'using System; class P { static void Main(){ Console.WriteLine("Paiza C# works"); } }');
}

run();
