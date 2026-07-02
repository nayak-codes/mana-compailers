const fs = require('fs');

const logPath = 'C:\\Users\\Balaji\\.gemini\\antigravity-ide\\brain\\2fab8bc2-a9f7-4c90-b7d2-9cf13cd36342\\.system_generated\\logs\\transcript.jsonl';

const size = fs.statSync(logPath).size;
console.log("File size:", size);

if (size > 0) {
  const fd = fs.openSync(logPath, 'r');
  const buffer = Buffer.alloc(Math.min(size, 2000));
  fs.readSync(fd, buffer, 0, buffer.length, 0);
  console.log("First 2000 chars:");
  console.log(buffer.toString('utf8'));
  fs.closeSync(fd);
}
