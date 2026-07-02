const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:\\Users\\Balaji\\.gemini\\antigravity-ide\\brain\\2fab8bc2-a9f7-4c90-b7d2-9cf13cd36342\\.system_generated\\logs\\transcript.jsonl';

const rl = readline.createInterface({
  input: fs.createReadStream(logPath),
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  try {
    const data = JSON.parse(line);
    // Look for tool calls in planner responses or system logs
    if (data.tool_calls) {
      data.tool_calls.forEach(tc => {
        if (tc.name === 'write_to_file') {
          console.log(`FOUND write_to_file for: ${tc.args.TargetFile}`);
          // Let's write them back!
          const target = tc.args.TargetFile.replace(/"/g, '');
          const content = tc.args.CodeContent;
          if (content && content.length > 500) {
            fs.writeFileSync(target, content, 'utf8');
            console.log(`  Restored ${target} successfully!`);
          }
        }
      });
    }
  } catch (err) {
    // Ignore parse errors
  }
});
