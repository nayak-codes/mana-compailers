async function listWandbox() {
  try {
    const res = await fetch('https://wandbox.org/api/list.json');
    const data = await res.json();
    const javaCompilers = data.filter(c => c.language === 'Java' || c.name.toLowerCase().includes('java') || c.name.toLowerCase().includes('openjdk'));
    console.log('Available Java compilers on Wandbox:', javaCompilers.map(c => c.name));
  } catch (err) {
    console.error('Error:', err.message);
  }
}
listWandbox();
