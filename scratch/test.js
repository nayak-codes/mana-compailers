const body = {
  language: 'c',
  code: '#include <stdio.h>\nint main() { printf("Hello from Mana Compiler!") return 0; }',
  stdin: ''
};

console.log('Sending request to https://mana-compailer-backend-docker.onrender.com/api/run...');
fetch('https://mana-compailer-backend-docker.onrender.com/api/run', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
})
.then(r => {
  console.log('Status code:', r.status);
  return r.json();
})
.then(data => {
  console.log('Response data:', data);
})
.catch(err => {
  console.error('Error:', err);
});
