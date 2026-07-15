const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const nodejsBlogDir = path.join(publicDir, 'blog-nodejs');

if (!fs.existsSync(nodejsBlogDir)) {
  fs.mkdirSync(nodejsBlogDir, { recursive: true });
}

const lessons = [
  { slug: 'intro', num: 1, title: 'Introduction to Node.js & Setup', filename: 'blog-nodejs/intro.html' },
  { slug: 'modules', num: 2, title: 'CommonJS & ES Modules', filename: 'blog-nodejs/modules.html' },
  { slug: 'file-system', num: 3, title: 'File System (fs) Module', filename: 'blog-nodejs/file-system.html' },
  { slug: 'events', num: 4, title: 'Events & the EventEmitter', filename: 'blog-nodejs/events.html' },
  { slug: 'streams-buffers', num: 5, title: 'Streams & Buffers', filename: 'blog-nodejs/streams-buffers.html' },
  { slug: 'http-server', num: 6, title: 'Building an HTTP Server', filename: 'blog-nodejs/http-server.html' },
  { slug: 'npm-packages', num: 7, title: 'npm & Package Management', filename: 'blog-nodejs/npm-packages.html' },
  { slug: 'async-promises', num: 8, title: 'Async/Await & Promises in Node', filename: 'blog-nodejs/async-promises.html' },
  { slug: 'express-basics', num: 9, title: 'Express.js Basics & Routing', filename: 'blog-nodejs/express-basics.html' },
  { slug: 'middleware', num: 10, title: 'Middleware & Request Pipeline', filename: 'blog-nodejs/middleware.html' },
  { slug: 'rest-api', num: 11, title: 'Building a REST API', filename: 'blog-nodejs/rest-api.html' },
  { slug: 'mongodb-mongoose', num: 12, title: 'MongoDB & Mongoose ODM', filename: 'blog-nodejs/mongodb-mongoose.html' },
  { slug: 'auth-jwt', num: 13, title: 'Authentication & JWT', filename: 'blog-nodejs/auth-jwt.html' },
  { slug: 'error-handling', num: 14, title: 'Error Handling & Debugging', filename: 'blog-nodejs/error-handling.html' },
  { slug: 'deployment', num: 15, title: 'Deployment & Environment Config', filename: 'blog-nodejs/deployment.html' }
];

function getSidebar(activeSlug) {
  let html = '\n    <div class="sidebar-heading">Node.js Tutorial</div>\n';
  html += '    <a href="/blog-nodejs.html"' + (activeSlug === 'home' ? ' class="active"' : '') + '>Node.js HOME</a>\n';
  lessons.forEach(l => {
    html += '    <a href="/' + l.filename + '"' + (activeSlug === l.slug ? ' class="active"' : '') + '>' + l.num + '. ' + l.title + '</a>\n';
  });
  html += '\n    <div class="sidebar-heading">Reference</div>\n';
  html += '    <a href="/blog.html">All Tutorials</a>\n\n';
  html += '    <div class="sidebar-heading">Backend</div>\n';
  html += '    <a href="/blog-express.html">Express.js</a>\n';
  html += '    <a href="/blog-rest-api.html">REST API</a>\n';
  html += '    <a href="/blog-mongodb.html">MongoDB</a>\n';
  html += '    <a href="/blog-postgresql.html">PostgreSQL</a>\n';
  html += '    <a href="/blog-docker.html">Docker</a>\n';
  return html;
}

function wrapPage(slug, title, mainContent, prevFile, prevTitle, nextFile, nextTitle) {
  let navFooter = '<div class="nav-footer">\n';
  if (prevFile) {
    navFooter += '      <a href="/' + prevFile + '" class="nav-btn">\n';
    navFooter += '        <span class="label">&#8592; Previous Lesson</span>\n';
    navFooter += '        <span class="title">' + prevTitle + '</span>\n';
    navFooter += '      </a>\n';
  } else {
    navFooter += '      <a href="/blog-nodejs.html" class="nav-btn">\n';
    navFooter += '        <span class="label">&#8592; Node.js Overview</span>\n';
    navFooter += '        <span class="title">Course Index</span>\n';
    navFooter += '      </a>\n';
  }
  if (nextFile) {
    navFooter += '      <a href="/' + nextFile + '" class="nav-btn" style="text-align:right;">\n';
    navFooter += '        <span class="label">Next Lesson &#8594;</span>\n';
    navFooter += '        <span class="title">' + nextTitle + '</span>\n';
    navFooter += '      </a>\n';
  } else {
    navFooter += '      <a href="/blog.html" class="nav-btn" style="text-align:right;">\n';
    navFooter += '        <span class="label">All Tutorials &#8594;</span>\n';
    navFooter += '        <span class="title">Learning Hub</span>\n';
    navFooter += '      </a>\n';
  }
  navFooter += '    </div>';

  const lessonNum = slug === 'home' ? 'Index' : lessons.find(x => x.slug === slug).num;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Our Compiler</title>
  <meta name="description" content="Learn Node.js — ${title} with clear explanations, structured code examples, and practical challenges." />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <script>
    (function() {
      const t = localStorage.getItem('theme') || 'dark';
      if (t === 'light') { document.documentElement.classList.add('light-theme'); document.addEventListener('DOMContentLoaded', () => { document.body.classList.add('light-theme'); }); }
      window.addEventListener('DOMContentLoaded', () => {
        const nav = document.querySelector('.topnav');
        if (nav) {
          const btn = document.createElement('button');
          btn.style.cssText = 'margin-left:auto;flex-shrink:0;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;cursor:pointer;font-family:"Inter",sans-serif;transition:all 0.2s;white-space:nowrap;margin-right:12px;';
          const upd = () => { btn.innerHTML = document.body.classList.contains('light-theme') ? '&#127769; Dark' : '&#9728;&#65039; Light'; };
          upd();
          btn.onclick = () => { document.body.classList.toggle('light-theme'); document.documentElement.classList.toggle('light-theme'); localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark'); upd(); };
          nav.appendChild(btn);
        }
        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;
          let ac = header.querySelector('.code-actions');
          if (!ac) { ac = document.createElement('div'); ac.className = 'code-actions'; ac.style.cssText = 'display:flex;gap:8px;align-items:center;margin-left:auto;'; header.appendChild(ac); }
          const cb = document.createElement('button');
          cb.innerHTML = '&#128203; Copy';
          cb.style.cssText = 'background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:"Inter",sans-serif;white-space:nowrap;';
          cb.onclick = () => { navigator.clipboard.writeText(codeEl.textContent).then(() => { cb.innerHTML = '&#9989; Copied!'; setTimeout(() => { cb.innerHTML = '&#128203; Copy'; }, 2000); }); };
          ac.appendChild(cb);
        });
      });
    })();
  </script>
</head>
<body class="lang-nodejs">
<nav class="topnav">
  <a href="/" class="brand">&#128187; Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-csharp.html">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-angular.html">Angular</a>
  <a href="/blog-vue.html">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-nodejs.html" class="active">Node.js</a>
  <a href="/blog-rest-api.html">REST API</a>
  <a href="/blog-graphql.html">GraphQL</a>
  <a href="/blog-spring-boot.html">Spring Boot</a>
  <a href="/blog-django.html">Django</a>
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-express.html">Express.js</a>
  <a href="/blog-postgresql.html">PostgreSQL</a>
  <a href="/blog-mysql.html">MySQL</a>
  <a href="/blog-mongodb.html">MongoDB</a>
  <a href="/blog-sqlite.html">SQLite</a>
  <a href="/blog-redis.html">Redis</a>
  <a href="/blog-cassandra.html">Cassandra</a>
  <a href="/blog-aws.html">AWS</a>
  <a href="/blog-azure.html">Azure</a>
  <a href="/blog-gcloud.html">Google Cloud</a>
  <a href="/blog-docker.html">Docker</a>
  <a href="/blog-kubernetes.html">Kubernetes</a>
  <a href="/blog-cicd.html">CI/CD</a>
  <a href="/blog-data-science.html">Data Science</a>
  <a href="/blog-ml.html">Machine Learning</a>
  <a href="/blog-deep-learning.html">Deep Learning</a>
  <a href="/blog-tensorflow.html">TensorFlow</a>
  <a href="/blog-pytorch.html">PyTorch</a>
  <a href="/blog-big-data.html">Big Data</a>
  <a href="/blog-git.html">Git &amp; GitHub</a>
  <a href="/blog-linux.html">Linux</a>
  <a href="/blog-shell.html">Shell Scripting</a>
  <a href="/blog-testing.html">Testing</a>
  <a href="/blog-agile.html">Agile &amp; Scrum</a>
</nav>
<div class="layout">
  <aside class="sidebar">
    ${getSidebar(slug)}
  </aside>
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span>&#8250;</span>
      <a href="/blog.html">Tutorials</a><span>&#8250;</span>
      <a href="/blog-nodejs.html">Node.js</a><span>&#8250;</span>
      <span>Lesson ${lessonNum}</span>
    </div>
    ${mainContent}
    ${navFooter}
  </main>
</div>
</body>
</html>`;
}

// ─── LESSON CONTENT ─────────────────────────────────────────────────────────

const lessonContents = {};

lessonContents['intro'] = `
<h1 class="page-title">Introduction to Node.js &amp; Setup</h1>
<div class="page-meta">
  <span class="badge">&#127807; Node.js</span>
  <span class="badge">Lesson 1</span>
  <span class="badge">Beginner</span>
</div>
<div class="intro-box">
  <p>Node.js is an open-source, cross-platform JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript code on the server side, outside the browser, enabling full-stack development with a single language.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> What Makes Node.js Different?</div>
  <p>Node.js uses a <strong>non-blocking, event-driven</strong> I/O model that makes it highly efficient for data-intensive, real-time applications:</p>
  <ul>
    <li><strong>Single-threaded Event Loop</strong>: Node handles thousands of concurrent connections using a single thread rather than spawning a new thread per request, saving memory overhead.</li>
    <li><strong>V8 Engine</strong>: Compiles JavaScript to native machine code, providing near-native performance.</li>
    <li><strong>npm Ecosystem</strong>: Access to over 2 million open-source packages via npm (Node Package Manager).</li>
    <li><strong>Best Use Cases</strong>: REST APIs, real-time chat apps, streaming services, CLI tools, microservices.</li>
  </ul>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Installing Node.js &amp; Running Your First Script</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Terminal &#8212; Setup</span></div>
    <pre><code># Download from https://nodejs.org (LTS recommended)
# Verify installation
node --version     # e.g. v20.11.0
npm --version      # e.g. 10.2.4

# Create and run a script
echo "console.log('Hello, Node.js!');" > hello.js
node hello.js
# Output: Hello, Node.js!</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> The global Object &amp; process</div>
  <p>Unlike browsers where the global object is <code>window</code>, Node.js exposes <code>global</code> and the <code>process</code> object for runtime information:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; process object</span></div>
    <pre><code>console.log(process.version);       // Node.js version
console.log(process.platform);      // 'linux', 'win32', 'darwin'
console.log(process.argv);          // command-line arguments array
console.log(process.env.NODE_ENV);  // environment variable

// Exit the process with a code
process.exit(0); // 0 = success, non-zero = error</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">4</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a Node.js script that reads <code>process.argv</code> to accept a name argument from the command line and prints <code>"Hello, [name]!"</code>. Run it as <code>node hello.js Balaji</code>.
  </div>
</div>
`;

lessonContents['modules'] = `
<h1 class="page-title">CommonJS &amp; ES Modules</h1>
<div class="page-meta">
  <span class="badge">&#127807; Node.js</span>
  <span class="badge">Lesson 2</span>
  <span class="badge">Beginner</span>
</div>
<div class="intro-box">
  <p>Node.js supports two module systems: the original <strong>CommonJS (CJS)</strong> format using <code>require()</code>, and the modern <strong>ES Modules (ESM)</strong> format using <code>import/export</code>. Understanding both is essential for working with real-world Node projects.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> CommonJS Modules</div>
  <p>CommonJS is the default module system in Node.js. Every file is its own module with its own scope:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; math.js (CommonJS)</span></div>
    <pre><code>// Exporting from a module
const PI = 3.14159;

function circleArea(r) {
  return PI * r * r;
}

function circumference(r) {
  return 2 * PI * r;
}

// Export as an object
module.exports = { circleArea, circumference, PI };</code></pre>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; main.js (requiring)</span></div>
    <pre><code>const { circleArea, PI } = require('./math');

console.log('Area:', circleArea(5));    // Area: 78.53975
console.log('PI value:', PI);          // PI value: 3.14159

// Require built-in modules (no path needed)
const os = require('os');
console.log('CPU cores:', os.cpus().length);</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> ES Modules (ESM)</div>
  <p>To use ESM in Node.js, either name files <code>.mjs</code> or add <code>"type": "module"</code> to your <code>package.json</code>:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; ES Module syntax</span></div>
    <pre><code>// utils.mjs — named exports
export const VERSION = '1.0.0';

export function greet(name) {
  return 'Hello, ' + name + '!';
}

export default function main() {
  console.log('Default export function');
}</code></pre>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Importing ESM</span></div>
    <pre><code>// Import named + default exports
import main, { greet, VERSION } from './utils.mjs';

console.log(VERSION);       // 1.0.0
console.log(greet('Node')); // Hello, Node!
main();                     // Default export function

// Dynamic import (works in both CJS and ESM contexts)
const { circleArea } = await import('./math.mjs');</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create a <code>validator.js</code> module that exports two functions: <code>isEmail(str)</code> and <code>isPhone(str)</code> using regex validation. Import and test them from a separate <code>test.js</code> file.
  </div>
</div>
`;

lessonContents['file-system'] = `
<h1 class="page-title">File System (fs) Module</h1>
<div class="page-meta">
  <span class="badge">&#127807; Node.js</span>
  <span class="badge">Lesson 3</span>
  <span class="badge">Beginner</span>
</div>
<div class="intro-box">
  <p>The built-in <code>fs</code> (File System) module provides APIs for reading, writing, updating, and deleting files and directories. It offers both synchronous and asynchronous variants of every operation.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Sync vs Async File Operations</div>
  <p>Node.js strongly prefers <strong>asynchronous</strong> file operations to avoid blocking the event loop:</p>
  <ul>
    <li><strong>Synchronous (Sync)</strong>: Blocks execution until the operation completes. Only suitable for startup scripts or CLI tools.</li>
    <li><strong>Asynchronous (Callback)</strong>: Non-blocking. Passes the result to a callback function when ready.</li>
    <li><strong>Promise-based (fs/promises)</strong>: Modern async/await style, cleanest approach for new code.</li>
  </ul>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Reading &amp; Writing Files</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; fs/promises</span></div>
    <pre><code>const fs = require('fs/promises');
const path = require('path');

async function fileOperations() {
  const filePath = path.join(__dirname, 'data.txt');

  // Write a file (creates if not exists, overwrites if exists)
  await fs.writeFile(filePath, 'Hello from Node.js!\nLine 2 of data.', 'utf8');
  console.log('File written successfully.');

  // Read the file back
  const content = await fs.readFile(filePath, 'utf8');
  console.log('File content:\n', content);

  // Append to an existing file
  await fs.appendFile(filePath, '\nAppended line.');

  // Get file metadata
  const stats = await fs.stat(filePath);
  console.log('File size:', stats.size, 'bytes');
  console.log('Modified:', stats.mtime);

  // Delete the file
  await fs.unlink(filePath);
  console.log('File deleted.');
}

fileOperations().catch(console.error);</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Working with Directories</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Directory Operations</span></div>
    <pre><code>const fs = require('fs/promises');

async function dirOps() {
  // Create directory (recursive creates parent dirs too)
  await fs.mkdir('./output/reports', { recursive: true });

  // List directory contents
  const entries = await fs.readdir('./output', { withFileTypes: true });
  entries.forEach(entry => {
    console.log(entry.name, entry.isDirectory() ? '[DIR]' : '[FILE]');
  });

  // Remove empty directory
  await fs.rmdir('./output/reports');
}

dirOps();</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">4</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a script that reads all <code>.txt</code> files from a directory, concatenates their contents, and writes the result to a single <code>merged.txt</code> output file.
  </div>
</div>
`;

lessonContents['events'] = `
<h1 class="page-title">Events &amp; the EventEmitter</h1>
<div class="page-meta">
  <span class="badge">&#127807; Node.js</span>
  <span class="badge">Lesson 4</span>
  <span class="badge">Beginner</span>
</div>
<div class="intro-box">
  <p>Node.js is fundamentally event-driven. The <code>EventEmitter</code> class is the backbone of Node's event system &#8212; almost every built-in module (HTTP, Streams, File System) extends it to emit and listen for named events.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Creating &amp; Using EventEmitter</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; EventEmitter Basics</span></div>
    <pre><code>const { EventEmitter } = require('events');

// Create an emitter instance
const emitter = new EventEmitter();

// Register a listener for 'data' event
emitter.on('data', (payload) => {
  console.log('Data received:', payload);
});

// One-time listener (fires only once, then auto-removed)
emitter.once('connect', (host) => {
  console.log('Connected to:', host);
});

// Emit events with payloads
emitter.emit('data', { id: 1, value: 42 });
emitter.emit('connect', 'database.server.com');
emitter.emit('connect', 'second.server.com'); // ignored — once() already fired

// Remove a specific listener
const handler = (msg) => console.log(msg);
emitter.on('message', handler);
emitter.off('message', handler); // removes it</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Custom Event Classes</div>
  <p>Best practice is to extend EventEmitter to create typed event sources:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Custom EventEmitter class</span></div>
    <pre><code>const { EventEmitter } = require('events');

class TaskQueue extends EventEmitter {
  constructor() {
    super();
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    this.emit('taskAdded', task);
  }

  processNext() {
    if (this.tasks.length === 0) {
      this.emit('empty');
      return;
    }
    const task = this.tasks.shift();
    this.emit('processing', task);
    // ... process task
    this.emit('done', task);
  }
}

const queue = new TaskQueue();

queue.on('taskAdded', t => console.log('Added task:', t.name));
queue.on('done', t => console.log('Completed:', t.name));
queue.on('empty', () => console.log('Queue is empty.'));

queue.addTask({ name: 'Send Email', priority: 1 });
queue.processNext();</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Build a <code>Logger</code> class extending EventEmitter that emits <code>'info'</code>, <code>'warn'</code>, and <code>'error'</code> events. Register listeners that format and print each log level with a timestamp prefix.
  </div>
</div>
`;

lessonContents['streams-buffers'] = `
<h1 class="page-title">Streams &amp; Buffers</h1>
<div class="page-meta">
  <span class="badge">&#127807; Node.js</span>
  <span class="badge">Lesson 5</span>
  <span class="badge">Intermediate</span>
</div>
<div class="intro-box">
  <p>Streams let you process data piece by piece (in chunks) rather than loading the entire dataset into memory at once. Buffers represent raw binary data. Together they enable efficient handling of large files, network data, and video streaming.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Four Types of Streams</div>
  <ul>
    <li><strong>Readable</strong>: Source of data to read from (e.g. file read, HTTP request body).</li>
    <li><strong>Writable</strong>: Destination to write data to (e.g. file write, HTTP response).</li>
    <li><strong>Duplex</strong>: Both readable and writable (e.g. TCP socket).</li>
    <li><strong>Transform</strong>: Duplex stream that modifies data as it passes through (e.g. gzip compression, encryption).</li>
  </ul>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Piping Streams</div>
  <p>The <code>pipe()</code> method connects a readable stream to a writable stream, handling backpressure automatically:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Streaming a large file</span></div>
    <pre><code>const fs = require('fs');
const zlib = require('zlib');

// Read a large file, compress it, write to output — all streamed
const readStream  = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('large-file.txt.gz');
const gzip        = zlib.createGzip();

// Chain: read -> gzip -> write
readStream
  .pipe(gzip)
  .pipe(writeStream)
  .on('finish', () => console.log('File compressed successfully!'))
  .on('error', (err) => console.error('Stream error:', err));</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Working with Buffers</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Buffer operations</span></div>
    <pre><code>// Create a buffer from a string
const buf = Buffer.from('Hello, Node.js!', 'utf8');
console.log(buf);                        // &lt;Buffer 48 65 6c 6c 6f...&gt;
console.log(buf.toString('utf8'));       // Hello, Node.js!
console.log(buf.toString('hex'));        // 48656c6c6f...
console.log(buf.length);                // 15 bytes

// Allocate a fixed-size buffer (zeroed)
const fixed = Buffer.alloc(8);
fixed.writeUInt32BE(12345, 0);           // write integer at offset 0
console.log(fixed.readUInt32BE(0));      // 12345

// Concatenate buffers
const combined = Buffer.concat([
  Buffer.from('Hello '),
  Buffer.from('World')
]);
console.log(combined.toString());        // Hello World</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">4</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a script using streams that reads a CSV file line-by-line using the <code>readline</code> module, parses each row, and counts the total number of records without loading the whole file into memory.
  </div>
</div>
`;

lessonContents['http-server'] = `
<h1 class="page-title">Building an HTTP Server</h1>
<div class="page-meta">
  <span class="badge">&#127807; Node.js</span>
  <span class="badge">Lesson 6</span>
  <span class="badge">Intermediate</span>
</div>
<div class="intro-box">
  <p>Node.js ships with a built-in <code>http</code> module that lets you create web servers without any external framework. Understanding it deeply is crucial before using Express.js.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Creating a Basic HTTP Server</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; http module server</span></div>
    <pre><code>const http = require('http');
const url  = require('url');

const server = http.createServer((req, res) => {
  // Parse URL and query string
  const parsedUrl = url.parse(req.url, true);
  const pathname  = parsedUrl.pathname;
  const query     = parsedUrl.query;

  console.log(req.method, pathname);

  // Route handling
  if (pathname === '/' &amp;&amp; req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Welcome to My Node API', status: 'ok' }));

  } else if (pathname === '/echo' &amp;&amp; req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ echo: JSON.parse(body) }));
    });

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Serving Static HTML Files</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Serve static files</span></div>
    <pre><code>const http = require('http');
const fs   = require('fs');
const path = require('path');

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png'
};

const server = http.createServer(async (req, res) => {
  const safePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(safePath);

  try {
    const data = await fs.promises.readFile(safePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000);</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Extend the HTTP server above to support a <code>PUT /users/:id</code> route that reads the request body JSON and prints the updated user data. Handle missing routes with a proper 404 response.
  </div>
</div>
`;

lessonContents['npm-packages'] = `
<h1 class="page-title">npm &amp; Package Management</h1>
<div class="page-meta">
  <span class="badge">&#127807; Node.js</span>
  <span class="badge">Lesson 7</span>
  <span class="badge">Beginner</span>
</div>
<div class="intro-box">
  <p>npm (Node Package Manager) is the world's largest software registry. It manages project dependencies, scripts, and versioning through the <code>package.json</code> configuration file.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Essential npm Commands</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Terminal &#8212; npm Commands</span></div>
    <pre><code># Initialize a new project (creates package.json)
npm init -y

# Install a production dependency
npm install express

# Install a dev dependency (only needed during development)
npm install --save-dev nodemon jest

# Install packages globally
npm install -g typescript

# Update all packages to latest compatible versions
npm update

# Remove a package
npm uninstall lodash

# List installed packages (top level)
npm list --depth=0

# Audit for security vulnerabilities
npm audit
npm audit fix

# Run a script defined in package.json
npm run dev
npm test</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> package.json Deep Dive</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JSON &#8212; package.json</span></div>
    <pre><code>{
  "name": "my-node-api",
  "version": "1.0.0",
  "description": "A RESTful API built with Node.js",
  "main": "src/index.js",
  "scripts": {
    "start":   "node src/index.js",
    "dev":     "nodemon src/index.js",
    "test":    "jest --coverage",
    "lint":    "eslint src/"
  },
  "dependencies": {
    "express":  "^4.18.2",
    "mongoose": "^8.1.0",
    "dotenv":   "^16.4.1"
  },
  "devDependencies": {
    "nodemon":  "^3.0.2",
    "jest":     "^29.7.0",
    "eslint":   "^8.56.0"
  },
  "engines": {
    "node": "&gt;=18.0.0"
  }
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Initialize a new Node.js project, install <code>lodash</code> as a dependency, and write a script that uses <code>_.groupBy()</code> to group an array of user objects by their <code>role</code> property.
  </div>
</div>
`;

lessonContents['async-promises'] = `
<h1 class="page-title">Async/Await &amp; Promises in Node.js</h1>
<div class="page-meta">
  <span class="badge">&#127807; Node.js</span>
  <span class="badge">Lesson 8</span>
  <span class="badge">Intermediate</span>
</div>
<div class="intro-box">
  <p>Asynchronous programming is at the heart of Node.js. Mastering Promises and async/await is essential for writing clean, efficient, non-blocking server code.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Callbacks vs Promises vs Async/Await</div>
  <p>The evolution of async code in Node.js:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Three Async Styles</span></div>
    <pre><code>// 1. Callback style (older, leads to "callback hell")
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});

// 2. Promise style
fs.promises.readFile('data.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// 3. Async/Await style (modern, recommended)
async function readData() {
  try {
    const data = await fs.promises.readFile('data.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Failed to read:', err.message);
  }
}
readData();</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Parallel &amp; Sequential Async Operations</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Promise.all &amp; Sequential</span></div>
    <pre><code">// Sequential — each waits for the previous to finish
async function sequential() {
  const user    = await fetchUser(1);
  const orders  = await fetchOrders(user.id);   // waits for user first
  const invoice = await fetchInvoice(orders[0]);
  return { user, orders, invoice };
}

// Parallel — all fire at the same time (much faster!)
async function parallel() {
  const [users, products, stats] = await Promise.all([
    fetchUsers(),
    fetchProducts(),
    fetchStats()
  ]);
  return { users, products, stats };
}

// Promise.allSettled — continues even if some promises fail
const results = await Promise.allSettled([
  fetchUser(1),
  fetchUser(999), // might fail
  fetchUser(3)
]);
results.forEach(r => {
  if (r.status === 'fulfilled') console.log('Got:', r.value);
  else console.log('Failed:', r.reason.message);
});</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write an async function that fetches data from three different public API endpoints simultaneously using <code>Promise.all</code> and the built-in <code>fetch</code> API (Node 18+). Display the combined results.
  </div>
</div>
`;

lessonContents['express-basics'] = `
<h1 class="page-title">Express.js Basics &amp; Routing</h1>
<div class="page-meta">
  <span class="badge">&#127807; Node.js</span>
  <span class="badge">Lesson 9</span>
  <span class="badge">Intermediate</span>
</div>
<div class="intro-box">
  <p>Express.js is the most popular Node.js web framework. It simplifies routing, middleware management, and HTTP request handling with a minimal, unopinionated API.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Setting Up Express</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Terminal &#8212; Install Express</span></div>
    <pre><code>npm install express
npm install --save-dev nodemon</code></pre>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Basic Express App</span></div>
    <pre><code>const express = require('express');
const app = express();

// Parse JSON request bodies
app.use(express.json());

// Basic GET route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!', version: '1.0' });
});

// Route with URL parameter
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id, name: 'Balaji Nayak' });
});

// Route with query parameters: /search?q=node&amp;limit=10
app.get('/search', (req, res) => {
  const { q, limit = 20 } = req.query;
  res.json({ query: q, maxResults: Number(limit) });
});

// POST route
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ id: Date.now(), name, email });
});

app.listen(3000, () => console.log('Express running on port 3000'));</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Express Router (Modular Routes)</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; routes/users.js</span></div>
    <pre><code>const express = require('express');
const router  = express.Router();

// All routes here are prefixed with /users (set in app.js)
router.get('/',     (req, res) => res.json({ users: [] }));
router.get('/:id',  (req, res) => res.json({ id: req.params.id }));
router.post('/',    (req, res) => res.status(201).json(req.body));
router.put('/:id',  (req, res) => res.json({ updated: req.params.id }));
router.delete('/:id', (req, res) => res.json({ deleted: req.params.id }));

module.exports = router;</code></pre>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; app.js (mounting routes)</span></div>
    <pre><code>const express = require('express');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());

// Mount the router at /users prefix
app.use('/users', usersRouter);

app.listen(3000);</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create an Express router for a <code>/products</code> resource with full CRUD routes. Store products in a JavaScript array (in-memory) and implement proper HTTP status codes for each operation.
  </div>
</div>
`;

lessonContents['middleware'] = `
<h1 class="page-title">Middleware &amp; Request Pipeline</h1>
<div class="page-meta">
  <span class="badge">&#127807; Node.js</span>
  <span class="badge">Lesson 10</span>
  <span class="badge">Intermediate</span>
</div>
<div class="intro-box">
  <p>Middleware functions are the backbone of Express.js. They run in sequence during a request-response cycle, allowing you to add logging, authentication, validation, and error handling in a clean, composable way.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> How Middleware Works</div>
  <p>Every middleware function receives <code>(req, res, next)</code>. Calling <code>next()</code> passes control to the next middleware in the stack:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Middleware Pipeline</span></div>
    <pre><code">const express = require('express');
const app = express();

// 1. Global middleware (runs on every request)
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next(); // must call next() or the request will hang!
});

// 2. Built-in middleware
app.use(express.json());           // parses JSON bodies
app.use(express.urlencoded({ extended: true })); // parses form data
app.use(express.static('public')); // serves static files

// 3. Route-specific middleware
function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'No token provided' });
  req.user = { id: 1, name: 'Balaji' }; // attach data to req
  next();
}

app.get('/dashboard', requireAuth, (req, res) => {
  res.json({ welcome: req.user.name });
});

// 4. Error-handling middleware (4 parameters!)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(3000);</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Popular Third-Party Middleware</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Common middleware packages</span></div>
    <pre><code>npm install cors helmet morgan compression

const cors        = require('cors');
const helmet      = require('helmet');    // security headers
const morgan      = require('morgan');    // request logging
const compression = require('compression'); // gzip responses

app.use(helmet());               // Sets 15+ security HTTP headers
app.use(cors({ origin: 'https://mysite.com' }));
app.use(morgan('combined'));     // Apache-style access logs
app.use(compression());         // Compress all responses</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a custom rate-limiting middleware that blocks a client IP after more than 10 requests within a 60-second window, returning a <code>429 Too Many Requests</code> response.
  </div>
</div>
`;

lessonContents['rest-api'] = `
<h1 class="page-title">Building a REST API</h1>
<div class="page-meta">
  <span class="badge">&#127807; Node.js</span>
  <span class="badge">Lesson 11</span>
  <span class="badge">Intermediate</span>
</div>
<div class="intro-box">
  <p>REST (Representational State Transfer) is the most widely-used API design style. A RESTful API maps resources to URL paths and uses HTTP methods to represent CRUD operations.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> REST Design Principles</div>
  <ul>
    <li><strong>Resources &amp; URLs</strong>: Resources are nouns (not verbs): <code>/users</code>, <code>/products/:id</code>, <code>/orders/:id/items</code>.</li>
    <li><strong>HTTP Methods</strong>: GET (read), POST (create), PUT/PATCH (update), DELETE (remove).</li>
    <li><strong>Status Codes</strong>: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error.</li>
    <li><strong>Stateless</strong>: Each request must carry all information needed to process it (auth tokens, params).</li>
  </ul>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Complete REST API Structure</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Complete CRUD API</span></div>
    <pre><code>const express = require('express');
const router = express.Router();

let books = [
  { id: 1, title: 'Node.js in Action', author: 'Manning', year: 2017 }
];
let nextId = 2;

// GET /books — list all
router.get('/', (req, res) => {
  const { author } = req.query;
  const result = author
    ? books.filter(b => b.author.toLowerCase().includes(author.toLowerCase()))
    : books;
  res.json({ data: result, count: result.length });
});

// GET /books/:id — get one
router.get('/:id', (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// POST /books — create
router.post('/', (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'title and author required' });
  const book = { id: nextId++, title, author, year: year || new Date().getFullYear() };
  books.push(book);
  res.status(201).json(book);
});

// PATCH /books/:id — partial update
router.patch('/:id', (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  Object.assign(book, req.body);
  res.json(book);
});

// DELETE /books/:id
router.delete('/:id', (req, res) => {
  const idx = books.findIndex(b => b.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  books.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Add input validation middleware using a package like <code>express-validator</code> to ensure the POST /books route validates that <code>year</code> is a number between 1900 and the current year.
  </div>
</div>
`;

lessonContents['mongodb-mongoose'] = `
<h1 class="page-title">MongoDB &amp; Mongoose ODM</h1>
<div class="page-meta">
  <span class="badge">&#127807; Node.js</span>
  <span class="badge">Lesson 12</span>
  <span class="badge">Intermediate</span>
</div>
<div class="intro-box">
  <p>MongoDB is a NoSQL database that stores data as flexible JSON-like documents. Mongoose is the most popular ODM (Object Data Mapper) for Node.js, adding schemas, validation, and model methods on top of MongoDB's driver.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Connecting &amp; Defining a Schema</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Mongoose Setup &amp; Schema</span></div>
    <pre><code>const mongoose = require('mongoose');

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
}
connectDB();

// Define a Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'editor'],
    default: 'user'
  },
  createdAt: { type: Date, default: Date.now }
});

// Add instance methods
userSchema.methods.toPublicJSON = function() {
  const { _id, name, email, role } = this;
  return { id: _id, name, email, role };
};

const User = mongoose.model('User', userSchema);
module.exports = User;</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> CRUD with Mongoose</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Mongoose CRUD</span></div>
    <pre><code>// CREATE
const user = await User.create({ name: 'Balaji', email: 'b@example.com' });

// READ — find all, with pagination
const users = await User.find({ role: 'user' })
  .select('name email -_id')
  .sort({ name: 1 })
  .skip(0).limit(10);

// READ — find one by id
const found = await User.findById(req.params.id);
if (!found) throw new Error('User not found');

// UPDATE — findByIdAndUpdate returns the updated doc
const updated = await User.findByIdAndUpdate(
  req.params.id,
  { name: 'Updated Name' },
  { new: true, runValidators: true }
);

// DELETE
await User.findByIdAndDelete(req.params.id);</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Define a Mongoose schema for a <code>Product</code> with fields: <code>name</code>, <code>price</code> (Number, min 0), <code>category</code>, and <code>inStock</code> (Boolean). Write a query that finds all in-stock products sorted by price.
  </div>
</div>
`;

lessonContents['auth-jwt'] = `
<h1 class="page-title">Authentication &amp; JWT</h1>
<div class="page-meta">
  <span class="badge">&#127807; Node.js</span>
  <span class="badge">Lesson 13</span>
  <span class="badge">Advanced</span>
</div>
<div class="intro-box">
  <p>JSON Web Tokens (JWT) are a compact, self-contained way to securely transmit authentication data between client and server. Combined with <code>bcrypt</code> for password hashing, they form the foundation of modern stateless authentication.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Registration &amp; Login Flow</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Auth Controller</span></div>
    <pre><code>const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

// REGISTER
async function register(req, res) {
  const { name, email, password } = req.body;

  // Check if user exists
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'Email already registered' });

  // Hash password (cost factor 12)
  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({ name, email, passwordHash });
  res.status(201).json({ id: user._id, name, email });
}

// LOGIN
async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  // Sign JWT — expires in 7 days
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token, user: { id: user._id, name: user.name, email } });
}

module.exports = { register, login };</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> JWT Auth Middleware</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Protect Routes</span></div>
    <pre><code>const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach payload to request
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Role-based authorization
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

// Usage
app.get('/admin', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'Admin panel' });
});</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Add a <code>POST /auth/refresh</code> endpoint that accepts a refresh token (stored in an httpOnly cookie) and returns a new short-lived access token.
  </div>
</div>
`;

lessonContents['error-handling'] = `
<h1 class="page-title">Error Handling &amp; Debugging</h1>
<div class="page-meta">
  <span class="badge">&#127807; Node.js</span>
  <span class="badge">Lesson 14</span>
  <span class="badge">Advanced</span>
</div>
<div class="intro-box">
  <p>Robust error handling separates production-ready Node.js apps from hobby projects. This lesson covers async error propagation, custom error classes, global handlers, and debugging techniques.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Custom Error Classes</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Custom Errors</span></div>
    <pre><code>// Base application error
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // vs programmer errors
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message) { super(message, 400); }
}

class NotFoundError extends AppError {
  constructor(resource) { super(resource + ' not found', 404); }
}

class UnauthorizedError extends AppError {
  constructor() { super('Authentication required', 401); }
}

// Usage in route handlers
async function getUser(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) throw new NotFoundError('User');  // automatically caught
  res.json(user);
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Global Error Handler &amp; Async Wrapper</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Error Middleware</span></div>
    <pre><code>// Async wrapper to avoid try/catch in every route
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Use it on routes
app.get('/users/:id', asyncHandler(getUser));

// Global error-handling middleware (must be last!)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal server error';

  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({ error: message, stack: err.stack });
  } else {
    res.status(statusCode).json({ error: message });
  }
});

// Handle uncaught exceptions and rejections
process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
  process.exit(1);
});</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Install and configure the <code>winston</code> logging library to write error logs to a <code>logs/error.log</code> file and info logs to the console. Replace all <code>console.error()</code> calls in your app with the logger.
  </div>
</div>
`;

lessonContents['deployment'] = `
<h1 class="page-title">Deployment &amp; Environment Config</h1>
<div class="page-meta">
  <span class="badge">&#127807; Node.js</span>
  <span class="badge">Lesson 15</span>
  <span class="badge">Advanced</span>
</div>
<div class="intro-box">
  <p>The final step of any Node.js project is deploying it to production. This lesson covers environment variables, process managers, Docker containerization, and cloud deployment strategies.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Environment Variables &amp; dotenv</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">File &#8212; .env</span></div>
    <pre><code>NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mydb
JWT_SECRET=super_secret_key_at_least_32_chars_long
CORS_ORIGIN=https://myapp.com</code></pre>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; config.js</span></div>
    <pre><code">require('dotenv').config();

const config = {
  env:         process.env.NODE_ENV || 'development',
  port:        Number(process.env.PORT) || 3000,
  mongoUri:    process.env.MONGODB_URI,
  jwtSecret:   process.env.JWT_SECRET,
  corsOrigin:  process.env.CORS_ORIGIN || '*'
};

// Validate required variables at startup
const required = ['MONGODB_URI', 'JWT_SECRET'];
required.forEach(key => {
  if (!process.env[key]) {
    throw new Error('Missing required environment variable: ' + key);
  }
});

module.exports = config;</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Docker &amp; PM2</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Dockerfile &#8212; Production Node App</span></div>
    <pre><code>FROM node:20-alpine

WORKDIR /app

# Copy dependency files first (better layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/

# Run as non-root user for security
USER node

EXPOSE 3000
CMD ["node", "src/index.js"]</code></pre>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Terminal &#8212; PM2 Process Manager</span></div>
    <pre><code># Install PM2 globally
npm install -g pm2

# Start your app with PM2 (auto-restarts on crash)
pm2 start src/index.js --name "my-api" -i max

# View running processes
pm2 list

# View real-time logs
pm2 logs my-api

# Auto-restart on server reboot
pm2 startup
pm2 save</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a <code>Dockerfile</code> for your Node.js API and a <code>docker-compose.yml</code> that starts both your app and a MongoDB container together with a shared network.
  </div>
</div>
`;

// ─── GENERATE FILES ──────────────────────────────────────────────────────────

console.log('Starting Node.js lesson generation...');

lessons.forEach((l, index) => {
  const prev = index > 0 ? lessons[index - 1] : null;
  const next = index < lessons.length - 1 ? lessons[index + 1] : null;

  const html = wrapPage(
    l.slug,
    l.title,
    lessonContents[l.slug] || '<p>Content coming soon.</p>',
    prev ? prev.filename : null,
    prev ? prev.title : null,
    next ? next.filename : null,
    next ? next.title : null
  );

  fs.writeFileSync(path.join(publicDir, l.filename), html, 'utf8');
  console.log('Generated:', l.filename);
});

// Index page
const indexContent = `
<h1 class="page-title">Node.js Programming Tutorial</h1>
<div class="page-meta">
  <span class="badge">&#127807; Node.js</span>
  <span class="badge">&#128994; Beginner to Advanced</span>
  <span class="badge">&#128197; July 2026</span>
</div>
<div class="intro-box">
  <p>Node.js is the server-side JavaScript runtime that powers millions of production applications. This 15-lesson course takes you from the core event loop to building authenticated REST APIs and deploying with Docker.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">&#9658;</span> Course Curriculum</div>
  <table class="tbl" style="margin-top:15px;">
    <tr><th>Lesson</th><th>Topic</th></tr>
    ${lessons.map(l => `<tr><td><strong>Lesson ${l.num}</strong></td><td><strong><a href="/${l.filename}">${l.title}</a></strong></td></tr>`).join('')}
  </table>
</div>
`;

const indexHtml = wrapPage(
  'home',
  'Node.js Tutorial — Complete Beginner to Advanced Guide',
  indexContent,
  null, null,
  lessons[0].filename,
  lessons[0].title
);

fs.writeFileSync(path.join(publicDir, 'blog-nodejs.html'), indexHtml, 'utf8');
console.log('Generated: blog-nodejs.html');
console.log('Done! All 15 Node.js lessons generated successfully.');
