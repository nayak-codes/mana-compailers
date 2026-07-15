const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const dir = path.join(publicDir, 'blog-react');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const lessons = [
  { slug: 'intro',           num: 1,  title: 'Introduction to React & JSX' },
  { slug: 'components-props',num: 2,  title: 'Components & Props' },
  { slug: 'state',           num: 3,  title: 'State & useState Hook' },
  { slug: 'events',          num: 4,  title: 'Event Handling' },
  { slug: 'conditional',     num: 5,  title: 'Conditional Rendering' },
  { slug: 'lists-keys',      num: 6,  title: 'Lists & Keys' },
  { slug: 'forms',           num: 7,  title: 'Forms & Controlled Components' },
  { slug: 'useeffect',       num: 8,  title: 'useEffect Hook & Side Effects' },
  { slug: 'useref-usememo',  num: 9,  title: 'useRef, useMemo & useCallback' },
  { slug: 'context',         num: 10, title: 'Context API & Global State' },
  { slug: 'usereducer',      num: 11, title: 'useReducer & Complex State' },
  { slug: 'custom-hooks',    num: 12, title: 'Custom Hooks' },
  { slug: 'react-router',    num: 13, title: 'React Router v6' },
  { slug: 'fetching-data',   num: 14, title: 'Fetching Data & APIs' },
  { slug: 'performance',     num: 15, title: 'Performance & Best Practices' },
];

const fn = l => `blog-react/${l.slug}.html`;

function sidebar(activeSlug) {
  let h = `\n    <div class="sidebar-heading">React Tutorial</div>\n`;
  h += `    <a href="/blog-react.html"${activeSlug === 'home' ? ' class="active"' : ''}>React HOME</a>\n`;
  lessons.forEach(l => {
    h += `    <a href="/${fn(l)}"${activeSlug === l.slug ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
  });
  h += `\n    <div class="sidebar-heading">Reference</div>\n`;
  h += `    <a href="/blog.html">All Tutorials</a>\n\n`;
  h += `    <div class="sidebar-heading">Related</div>\n`;
  h += `    <a href="/blog-javascript.html">JavaScript</a>\n`;
  h += `    <a href="/blog-html.html">HTML</a>\n`;
  h += `    <a href="/blog-css.html">CSS</a>\n`;
  h += `    <a href="/blog-nextjs.html">Next.js</a>\n`;
  h += `    <a href="/blog-nodejs.html">Node.js</a>\n`;
  return h;
}

function page(slug, title, body, prev, next) {
  const prevBtn = prev
    ? `<a href="/${fn(prev)}" class="nav-btn"><span class="label">← Previous</span><span class="title">${prev.title}</span></a>`
    : `<a href="/blog-react.html" class="nav-btn"><span class="label">← React Overview</span><span class="title">Course Index</span></a>`;
  const nextBtn = next
    ? `<a href="/${fn(next)}" class="nav-btn" style="text-align:right;"><span class="label">Next Lesson →</span><span class="title">${next.title}</span></a>`
    : `<a href="/blog.html" class="nav-btn" style="text-align:right;"><span class="label">All Tutorials →</span><span class="title">Learning Hub</span></a>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | React Tutorial | Our Compiler</title>
  <meta name="description" content="Learn React — ${title}. Practical examples, hooks, component patterns, and hands-on challenges." />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <script>
    (function(){
      const t=localStorage.getItem('theme')||'dark';
      if(t==='light'){document.documentElement.classList.add('light-theme');document.addEventListener('DOMContentLoaded',()=>document.body.classList.add('light-theme'));}
      window.addEventListener('DOMContentLoaded',()=>{
        const nav=document.querySelector('.topnav');
        if(nav){const b=document.createElement('button');b.style.cssText='margin-left:auto;flex-shrink:0;background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.25);border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;cursor:pointer;font-family:"Inter",sans-serif;transition:all .2s;white-space:nowrap;margin-right:12px;';const u=()=>{b.innerHTML=document.body.classList.contains('light-theme')?'🌙 Dark':'☀️ Light';};u();b.addEventListener('click',()=>{document.body.classList.toggle('light-theme');document.documentElement.classList.toggle('light-theme');localStorage.setItem('theme',document.body.classList.contains('light-theme')?'light':'dark');u();});nav.appendChild(b);}
        document.querySelectorAll('.code-block').forEach(block=>{
          const hdr=block.querySelector('.code-block-header'),ce=block.querySelector('pre code');
          if(!hdr||!ce)return;
          let ac=hdr.querySelector('.code-actions');
          if(!ac){ac=document.createElement('div');ac.className='code-actions';ac.style.cssText='display:flex;gap:8px;align-items:center;margin-left:auto;';hdr.appendChild(ac);}
          const cp=document.createElement('button');cp.innerHTML='📋 Copy';
          cp.style.cssText='background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.25);border-radius:6px;padding:4px 10px;font-size:11px;font-weight:600;cursor:pointer;transition:all .2s;font-family:"Inter",sans-serif;white-space:nowrap;';
          cp.addEventListener('click',()=>{navigator.clipboard.writeText(ce.textContent).then(()=>{cp.innerHTML='✅ Copied!';setTimeout(()=>cp.innerHTML='📋 Copy',2000);});});
          ac.appendChild(cp);
        });
      });
    })();
  </script>
</head>
<body class="lang-react">
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
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
  <a href="/blog-react.html" class="active">React</a>
  <a href="/blog-angular.html">Angular</a>
  <a href="/blog-vue.html">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-nodejs.html">Node.js</a>
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
  <aside class="sidebar">${sidebar(slug)}</aside>
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span>›</span>
      <a href="/blog.html">Tutorials</a><span>›</span>
      <a href="/blog-react.html">React</a><span>›</span>
      <span>${slug === 'home' ? 'Index' : 'Lesson ' + (lessons.find(x=>x.slug===slug)?.num)}</span>
    </div>
    ${body}
    <div class="nav-footer">${prevBtn}${nextBtn}</div>
  </main>
</div>
</body>
</html>`;
}

// ── LESSON CONTENT ─────────────────────────────────────────────────────────────

const C = {};

C['intro'] = `
<h1 class="page-title">Introduction to React & JSX</h1>
<div class="page-meta"><span class="badge">⚛️ React</span><span class="badge">Lesson 1</span><span class="badge">Beginner</span></div>
<div class="intro-box">
  <p>React is a JavaScript library created by Meta for building user interfaces. Instead of manipulating the DOM directly, you describe <em>what</em> the UI should look like, and React figures out the most efficient way to update it.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Why React?</div>
  <ul>
    <li><strong>Component-Based</strong> — Break UIs into small, reusable pieces. A Button, a Card, a Navbar — each is an independent component.</li>
    <li><strong>Declarative</strong> — Describe the desired end state; React handles DOM updates automatically via the Virtual DOM.</li>
    <li><strong>Unidirectional Data Flow</strong> — Data flows down from parent to child, making apps predictable and easy to debug.</li>
    <li><strong>Huge Ecosystem</strong> — React Router, Redux, Zustand, React Query, Next.js, and thousands of community libraries.</li>
  </ul>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Your First React App</div>
  <p>The fastest way to start is <code>create-react-app</code> or <strong>Vite</strong> (recommended for speed):</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Terminal — Create Vite + React project</span></div>
    <pre><code>npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> JSX — JavaScript + HTML</div>
  <p>JSX looks like HTML but it compiles down to <code>React.createElement()</code> calls. Key rules:</p>
  <ul>
    <li>Every component must return a <strong>single root element</strong> (use <code>&lt;&gt;&lt;/&gt;</code> Fragment if needed).</li>
    <li>Use <code>className</code> instead of <code>class</code>, and <code>htmlFor</code> instead of <code>for</code>.</li>
    <li>Embed JavaScript expressions inside <code>{ curly braces }</code>.</li>
    <li>Self-close tags that have no children: <code>&lt;img /&gt;</code>, <code>&lt;input /&gt;</code>.</li>
  </ul>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JSX — Basic Component</span></div>
    <pre><code>function Welcome({ name }) {
  const greeting = "Hello";

  return (
    &lt;div className="card"&gt;
      &lt;h1&gt;{greeting}, {name}!&lt;/h1&gt;
      &lt;p&gt;Welcome to React. Today is {new Date().toDateString()}.&lt;/p&gt;
      &lt;img src="/avatar.png" alt="User avatar" /&gt;
    &lt;/div&gt;
  );
}

// Render it
export default function App() {
  return &lt;Welcome name="Balaji" /&gt;;
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">4</span> JSX Expressions & Ternaries</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JSX — Expressions</span></div>
    <pre><code>const isLoggedIn = true;
const score = 87;

return (
  &lt;div&gt;
    {/* Ternary */}
    {isLoggedIn ? &lt;p&gt;Welcome back!&lt;/p&gt; : &lt;p&gt;Please log in.&lt;/p&gt;}

    {/* Short-circuit */}
    {score &gt; 90 &amp;&amp; &lt;span className="badge"&gt;Top Scorer 🏆&lt;/span&gt;}

    {/* Expressions in attributes */}
    &lt;div className={isLoggedIn ? "dashboard" : "login-page"}&gt;...&lt;/div&gt;
  &lt;/div&gt;
);</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">5</span> Code Challenge</div>
  <div class="info-box"><strong>Challenge:</strong> Create a <code>ProfileCard</code> component that accepts <code>name</code>, <code>role</code>, and <code>avatar</code> props and renders them in a styled card. Display a "⭐ Admin" badge only if a prop <code>isAdmin</code> is <code>true</code>.</div>
</div>`;

C['components-props'] = `
<h1 class="page-title">Components & Props</h1>
<div class="page-meta"><span class="badge">⚛️ React</span><span class="badge">Lesson 2</span><span class="badge">Beginner</span></div>
<div class="intro-box">
  <p>Components are the building blocks of every React application. Props (short for properties) are how parent components pass data down to child components — they are <strong>read-only</strong>.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Function Components</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Function Component</span></div>
    <pre><code>// A simple component — just a function that returns JSX
function Button({ label, onClick, variant = "primary" }) {
  return (
    &lt;button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    &gt;
      {label}
    &lt;/button&gt;
  );
}

// Usage
function App() {
  return (
    &lt;&gt;
      &lt;Button label="Save" onClick={() => alert("Saved!")} /&gt;
      &lt;Button label="Cancel" variant="secondary" onClick={() => {}} /&gt;
    &lt;/&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Props Patterns</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Props Patterns</span></div>
    <pre><code>// Default props via destructuring
function Avatar({ src, alt = "User", size = 48 }) {
  return (
    &lt;img
      src={src}
      alt={alt}
      style={{ width: size, height: size, borderRadius: "50%" }}
    /&gt;
  );
}

// Spread props
function Input({ className, ...rest }) {
  return &lt;input className={\`input \${className}\`} {...rest} /&gt;;
}

// children prop — compose components
function Card({ title, children }) {
  return (
    &lt;div className="card"&gt;
      &lt;h2 className="card-title"&gt;{title}&lt;/h2&gt;
      &lt;div className="card-body"&gt;{children}&lt;/div&gt;
    &lt;/div&gt;
  );
}

// Usage
&lt;Card title="My Post"&gt;
  &lt;p&gt;Any JSX can go here as children.&lt;/p&gt;
  &lt;Button label="Read More" /&gt;
&lt;/Card&gt;</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Component Composition</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Composing Components</span></div>
    <pre><code>function ProductCard({ product }) {
  return (
    &lt;Card title={product.name}&gt;
      &lt;Avatar src={product.image} alt={product.name} size={80} /&gt;
      &lt;p&gt;\${product.price}&lt;/p&gt;
      &lt;Button label="Add to Cart" onClick={() => addToCart(product)} /&gt;
    &lt;/Card&gt;
  );
}

function ProductList({ products }) {
  return (
    &lt;div className="grid"&gt;
      {products.map(p =&gt; (
        &lt;ProductCard key={p.id} product={p} /&gt;
      ))}
    &lt;/div&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">4</span> Code Challenge</div>
  <div class="info-box"><strong>Challenge:</strong> Build a <code>StatCard</code> component that takes <code>title</code>, <code>value</code>, <code>icon</code>, and <code>trend</code> ("+12%" or "-3%") props. Render the trend in green if positive and red if negative.</div>
</div>`;

C['state'] = `
<h1 class="page-title">State & useState Hook</h1>
<div class="page-meta"><span class="badge">⚛️ React</span><span class="badge">Lesson 3</span><span class="badge">Beginner</span></div>
<div class="intro-box">
  <p>State is data that can change over time and causes React to re-render the component when it does. The <code>useState</code> hook is the primary way to add state to function components.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> useState Basics</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — useState</span></div>
    <pre><code>import { useState } from "react";

function Counter() {
  // [currentValue, setterFunction] = useState(initialValue)
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;+&lt;/button&gt;
      &lt;button onClick={() =&gt; setCount(count - 1)}&gt;-&lt;/button&gt;
      &lt;button onClick={() =&gt; setCount(0)}&gt;Reset&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Functional Updates & Object State</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — State Patterns</span></div>
    <pre><code>// Functional update — always use when new state depends on old state
setCount(prev =&gt; prev + 1);

// Object state — spread to preserve other fields
const [user, setUser] = useState({ name: "Balaji", age: 22 });
setUser(prev =&gt; ({ ...prev, age: 23 }));  // ✅ correct
// setUser({ age: 23 });                  // ❌ loses 'name'

// Array state
const [items, setItems] = useState([]);
// Add
setItems(prev =&gt; [...prev, newItem]);
// Remove
setItems(prev =&gt; prev.filter(item =&gt; item.id !== id));
// Update
setItems(prev =&gt; prev.map(item =&gt; item.id === id ? { ...item, done: true } : item));</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Toggle, Input & Multiple State</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Common State Patterns</span></div>
    <pre><code>function LoginForm() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) =&gt; {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input
        value={email}
        onChange={e =&gt; setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      /&gt;
      &lt;input
        value={password}
        onChange={e =&gt; setPassword(e.target.value)}
        type={showPass ? "text" : "password"}
        placeholder="Password"
      /&gt;
      &lt;button type="button" onClick={() =&gt; setShowPass(p =&gt; !p)}&gt;
        {showPass ? "Hide" : "Show"} Password
      &lt;/button&gt;
      &lt;button type="submit"&gt;Login&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">4</span> Code Challenge</div>
  <div class="info-box"><strong>Challenge:</strong> Build a shopping cart component. Maintain an array of items in state. Add an "Add Item" button and a "Remove" button per item. Display the total count and total price.</div>
</div>`;

C['events'] = `
<h1 class="page-title">Event Handling</h1>
<div class="page-meta"><span class="badge">⚛️ React</span><span class="badge">Lesson 4</span><span class="badge">Beginner</span></div>
<div class="intro-box">
  <p>React wraps native DOM events in SyntheticEvents for cross-browser consistency. Event handlers are passed as props using camelCase names.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Common Events</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Event Handlers</span></div>
    <pre><code>function EventDemo() {
  // Mouse events
  const handleClick  = (e) =&gt; console.log("Clicked!", e.target);
  const handleHover  = ()  =&gt; console.log("Hovered!");

  // Keyboard events
  const handleKeyDown = (e) =&gt; {
    if (e.key === "Enter") console.log("Enter pressed");
    if (e.key === "Escape") console.log("Escape pressed");
  };

  // Form events
  const handleChange = (e) =&gt; console.log(e.target.value);
  const handleSubmit = (e) =&gt; {
    e.preventDefault(); // stop page reload
    console.log("Form submitted");
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type something..."
      /&gt;
      &lt;button
        type="button"
        onClick={handleClick}
        onMouseEnter={handleHover}
      &gt;
        Click Me
      &lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Passing Arguments to Handlers</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Event with Arguments</span></div>
    <pre><code>function ItemList({ items }) {
  const handleDelete = (id) =&gt; {
    console.log("Delete item:", id);
  };

  return (
    &lt;ul&gt;
      {items.map(item =&gt; (
        &lt;li key={item.id}&gt;
          {item.name}
          {/* Arrow function wraps the call so we can pass id */}
          &lt;button onClick={() =&gt; handleDelete(item.id)}&gt;Delete&lt;/button&gt;
        &lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box"><strong>Challenge:</strong> Build a color picker component. Render 5 colored buttons. When clicked, display the selected color name and update the background of a preview box to that color.</div>
</div>`;

C['conditional'] = `
<h1 class="page-title">Conditional Rendering</h1>
<div class="page-meta"><span class="badge">⚛️ React</span><span class="badge">Lesson 5</span><span class="badge">Beginner</span></div>
<div class="intro-box">
  <p>React components can render different UI based on conditions — like showing a login form vs. a dashboard. Since JSX is JavaScript, you can use all standard JS conditional patterns.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> All Conditional Patterns</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Conditional Rendering</span></div>
    <pre><code>function Dashboard({ user, isLoading, error }) {
  // 1. Early return
  if (isLoading) return &lt;Spinner /&gt;;
  if (error)     return &lt;ErrorMessage message={error} /&gt;;

  return (
    &lt;div&gt;
      {/* 2. Ternary */}
      {user ? &lt;h1&gt;Welcome, {user.name}!&lt;/h1&gt; : &lt;h1&gt;Welcome, Guest!&lt;/h1&gt;}

      {/* 3. Short-circuit (render only if true) */}
      {user?.isAdmin &amp;&amp; &lt;AdminPanel /&gt;}

      {/* 4. Nullish coalescing for fallback text */}
      &lt;p&gt;{user?.bio ?? "No bio provided."}&lt;/p&gt;

      {/* 5. if/else via IIFE */}
      {(() =&gt; {
        if (user?.role === "admin")  return &lt;span className="badge-red"&gt;Admin&lt;/span&gt;;
        if (user?.role === "editor") return &lt;span className="badge-blue"&gt;Editor&lt;/span&gt;;
        return &lt;span className="badge-gray"&gt;Viewer&lt;/span&gt;;
      })()}
    &lt;/div&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Loading & Empty States</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Loading / Empty Patterns</span></div>
    <pre><code>function UserList({ users, isLoading }) {
  if (isLoading) {
    return (
      &lt;div className="skeleton-list"&gt;
        {Array.from({ length: 3 }).map((_, i) =&gt; (
          &lt;div key={i} className="skeleton-card" /&gt;
        ))}
      &lt;/div&gt;
    );
  }

  if (users.length === 0) {
    return (
      &lt;div className="empty-state"&gt;
        &lt;span&gt;👥&lt;/span&gt;
        &lt;p&gt;No users found.&lt;/p&gt;
      &lt;/div&gt;
    );
  }

  return &lt;ul&gt;{users.map(u =&gt; &lt;li key={u.id}&gt;{u.name}&lt;/li&gt;)}&lt;/ul&gt;;
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box"><strong>Challenge:</strong> Build a <code>Notification</code> component that renders differently based on a <code>type</code> prop: "success" (green ✅), "warning" (yellow ⚠️), "error" (red ❌), and "info" (blue ℹ️).</div>
</div>`;

C['lists-keys'] = `
<h1 class="page-title">Lists & Keys</h1>
<div class="page-meta"><span class="badge">⚛️ React</span><span class="badge">Lesson 6</span><span class="badge">Beginner</span></div>
<div class="intro-box">
  <p>Rendering lists is one of the most common tasks in React. The <code>key</code> prop is critical — it tells React which items changed, were added, or removed, enabling efficient DOM updates.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Rendering Lists with .map()</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — List Rendering</span></div>
    <pre><code>const products = [
  { id: 1, name: "Laptop",  price: 999, inStock: true  },
  { id: 2, name: "Phone",   price: 699, inStock: false },
  { id: 3, name: "Monitor", price: 349, inStock: true  },
];

function ProductList() {
  return (
    &lt;ul className="product-list"&gt;
      {products.map(product =&gt; (
        &lt;li key={product.id} className="product-item"&gt;
          &lt;span&gt;{product.name}&lt;/span&gt;
          &lt;span&gt;\${product.price}&lt;/span&gt;
          {product.inStock
            ? &lt;span className="badge-green"&gt;In Stock&lt;/span&gt;
            : &lt;span className="badge-red"&gt;Out of Stock&lt;/span&gt;
          }
        &lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Keys — Rules & Pitfalls</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Key Rules</span></div>
    <pre><code>// ✅ Use a unique, stable ID from your data
items.map(item =&gt; &lt;Item key={item.id} /&gt;)

// ❌ Never use array index as key (causes bugs on reorder/delete)
items.map((item, index) =&gt; &lt;Item key={index} /&gt;)

// ✅ Keys must be unique among siblings only (not globally)
// ✅ Keys should not change between renders

// Nested lists — each level gets its own keys
categories.map(cat =&gt; (
  &lt;div key={cat.id}&gt;
    &lt;h3&gt;{cat.name}&lt;/h3&gt;
    {cat.items.map(item =&gt; (
      &lt;span key={item.id}&gt;{item.name}&lt;/span&gt;
    ))}
  &lt;/div&gt;
))</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Filtering & Sorting Lists</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Filter & Sort</span></div>
    <pre><code>function FilteredList({ items }) {
  const [query, setQuery]   = useState("");
  const [sortBy, setSortBy] = useState("name");

  const visible = items
    .filter(item =&gt; item.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) =&gt; a[sortBy] > b[sortBy] ? 1 : -1);

  return (
    &lt;&gt;
      &lt;input value={query} onChange={e =&gt; setQuery(e.target.value)} placeholder="Search..." /&gt;
      &lt;select value={sortBy} onChange={e =&gt; setSortBy(e.target.value)}&gt;
        &lt;option value="name"&gt;Name&lt;/option&gt;
        &lt;option value="price"&gt;Price&lt;/option&gt;
      &lt;/select&gt;
      &lt;ul&gt;{visible.map(item =&gt; &lt;li key={item.id}&gt;{item.name}&lt;/li&gt;)}&lt;/ul&gt;
    &lt;/&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">4</span> Code Challenge</div>
  <div class="info-box"><strong>Challenge:</strong> Build a filterable todo list. Render todos from an array in state. Add filter tabs: "All", "Active", "Completed". Clicking a tab filters the visible todos.</div>
</div>`;

C['forms'] = `
<h1 class="page-title">Forms & Controlled Components</h1>
<div class="page-meta"><span class="badge">⚛️ React</span><span class="badge">Lesson 7</span><span class="badge">Intermediate</span></div>
<div class="intro-box">
  <p>In React, form elements are best managed as <strong>controlled components</strong> — where React state is the single source of truth for every input's value. This gives you complete control over validation, formatting, and submission.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Controlled Inputs</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Controlled Form</span></div>
    <pre><code>function RegistrationForm() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "viewer", agree: false
  });
  const [errors, setErrors] = useState({});

  const update = (field) =&gt; (e) =&gt; {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm(prev =&gt; ({ ...prev, [field]: value }));
  };

  const validate = () =&gt; {
    const errs = {};
    if (!form.name)           errs.name = "Name is required";
    if (!form.email.includes("@")) errs.email = "Invalid email";
    if (form.password.length &lt; 8)  errs.password = "Min 8 characters";
    return errs;
  };

  const handleSubmit = (e) =&gt; {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length &gt; 0) { setErrors(errs); return; }
    console.log("Submitting:", form);
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input value={form.name} onChange={update("name")} placeholder="Full Name" /&gt;
      {errors.name &amp;&amp; &lt;span className="error"&gt;{errors.name}&lt;/span&gt;}

      &lt;input value={form.email} onChange={update("email")} type="email" /&gt;
      &lt;input value={form.password} onChange={update("password")} type="password" /&gt;

      &lt;select value={form.role} onChange={update("role")}&gt;
        &lt;option value="viewer"&gt;Viewer&lt;/option&gt;
        &lt;option value="editor"&gt;Editor&lt;/option&gt;
        &lt;option value="admin"&gt;Admin&lt;/option&gt;
      &lt;/select&gt;

      &lt;label&gt;
        &lt;input type="checkbox" checked={form.agree} onChange={update("agree")} /&gt;
        I agree to Terms
      &lt;/label&gt;

      &lt;button type="submit"&gt;Register&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Code Challenge</div>
  <div class="info-box"><strong>Challenge:</strong> Build a multi-step form (3 steps) with "Next" and "Back" buttons. Store all field values in a single state object. On the final step, display a summary of all entered data.</div>
</div>`;

C['useeffect'] = `
<h1 class="page-title">useEffect Hook & Side Effects</h1>
<div class="page-meta"><span class="badge">⚛️ React</span><span class="badge">Lesson 8</span><span class="badge">Intermediate</span></div>
<div class="intro-box">
  <p><code>useEffect</code> lets you perform side effects — fetching data, setting up subscriptions, or touching the DOM — after React has rendered. Understanding it well is essential for real-world apps.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> useEffect Dependency Array</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — useEffect Patterns</span></div>
    <pre><code>import { useState, useEffect } from "react";

function Demo({ userId }) {
  const [user, setUser] = useState(null);

  // Runs EVERY render (no dependency array) — rarely needed
  useEffect(() =&gt; { console.log("Rendered"); });

  // Runs ONCE on mount (empty array)
  useEffect(() =&gt; {
    console.log("Component mounted");
    return () =&gt; console.log("Component unmounted"); // cleanup
  }, []);

  // Runs when userId changes
  useEffect(() =&gt; {
    if (!userId) return;

    let cancelled = false;

    fetch(\`/api/users/\${userId}\`)
      .then(r =&gt; r.json())
      .then(data =&gt; {
        if (!cancelled) setUser(data); // avoid state update on unmounted
      });

    return () =&gt; { cancelled = true; }; // cleanup on userId change
  }, [userId]); // dependency

  return &lt;div&gt;{user ? user.name : "Loading..."}&lt;/div&gt;;
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Common useEffect Patterns</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — useEffect Examples</span></div>
    <pre><code>// Update document title
useEffect(() =&gt; {
  document.title = \`\${count} new messages\`;
}, [count]);

// Keyboard listener
useEffect(() =&gt; {
  const handler = (e) =&gt; e.key === "Escape" &amp;&amp; closeModal();
  window.addEventListener("keydown", handler);
  return () =&gt; window.removeEventListener("keydown", handler);
}, [closeModal]);

// Timer / interval
useEffect(() =&gt; {
  const timer = setInterval(() =&gt; setTime(new Date()), 1000);
  return () =&gt; clearInterval(timer); // cleanup stops the interval
}, []);

// Local storage sync
useEffect(() =&gt; {
  localStorage.setItem("theme", theme);
}, [theme]);</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box"><strong>Challenge:</strong> Build a live search component that fetches results from <code>https://jsonplaceholder.typicode.com/users</code> on mount, then filters them client-side using a search input. Add a debounce effect so filtering only triggers 300ms after the user stops typing.</div>
</div>`;

C['useref-usememo'] = `
<h1 class="page-title">useRef, useMemo & useCallback</h1>
<div class="page-meta"><span class="badge">⚛️ React</span><span class="badge">Lesson 9</span><span class="badge">Intermediate</span></div>
<div class="intro-box">
  <p>These three hooks let you optimize performance and access DOM elements directly. <code>useRef</code> persists values without triggering re-renders. <code>useMemo</code> caches expensive computations. <code>useCallback</code> caches function references.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> useRef</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — useRef</span></div>
    <pre><code>import { useRef, useEffect } from "react";

function VideoPlayer() {
  const videoRef = useRef(null);   // DOM reference

  useEffect(() =&gt; {
    videoRef.current.play(); // direct DOM access
  }, []);

  return &lt;video ref={videoRef} src="/intro.mp4" /&gt;;
}

// useRef for mutable values (won't cause re-render)
function Timer() {
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () =&gt; {
    intervalRef.current = setInterval(() =&gt; tick(), 1000);
    setRunning(true);
  };
  const stop = () =&gt; {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  return &lt;button onClick={running ? stop : start}&gt;{running ? "Stop" : "Start"}&lt;/button&gt;;
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> useMemo & useCallback</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — useMemo & useCallback</span></div>
    <pre><code>import { useMemo, useCallback } from "react";

function DataTable({ data, filter }) {
  // useMemo — only recomputes when data or filter changes
  const filtered = useMemo(() =&gt; {
    console.log("Filtering..."); // expensive computation
    return data.filter(row =&gt; row.name.includes(filter));
  }, [data, filter]);

  // useCallback — stable function reference for child components
  const handleDelete = useCallback((id) =&gt; {
    setData(prev =&gt; prev.filter(row =&gt; row.id !== id));
  }, []); // no deps — function never needs to change

  return (
    &lt;ul&gt;
      {filtered.map(row =&gt; (
        &lt;Row key={row.id} data={row} onDelete={handleDelete} /&gt;
      ))}
    &lt;/ul&gt;
  );
}

// Wrap child with React.memo to prevent unnecessary re-renders
const Row = React.memo(({ data, onDelete }) =&gt; (
  &lt;li&gt;{data.name} &lt;button onClick={() =&gt; onDelete(data.id)}&gt;Delete&lt;/button&gt;&lt;/li&gt;
));</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box"><strong>Challenge:</strong> Build a sortable table of 1000 rows. Use <code>useMemo</code> to sort the data only when the sort column changes. Wrap individual row components in <code>React.memo</code> and verify fewer re-renders using React DevTools.</div>
</div>`;

C['context'] = `
<h1 class="page-title">Context API & Global State</h1>
<div class="page-meta"><span class="badge">⚛️ React</span><span class="badge">Lesson 10</span><span class="badge">Intermediate</span></div>
<div class="intro-box">
  <p>Context solves <em>prop drilling</em> — passing data through many layers of components. It creates a global store accessible by any component in the tree without passing props manually at every level.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Creating & Using Context</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Context API</span></div>
    <pre><code>import { createContext, useContext, useState } from "react";

// 1. Create context
const ThemeContext = createContext(null);

// 2. Create provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const toggle = () =&gt; setTheme(t =&gt; t === "dark" ? "light" : "dark");

  return (
    &lt;ThemeContext.Provider value={{ theme, toggle }}&gt;
      {children}
    &lt;/ThemeContext.Provider&gt;
  );
}

// 3. Custom hook for clean consumption
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
}

// 4. Consume anywhere in the tree
function Navbar() {
  const { theme, toggle } = useTheme();
  return (
    &lt;nav className={theme}&gt;
      &lt;button onClick={toggle}&gt;Toggle {theme === "dark" ? "☀️" : "🌙"}&lt;/button&gt;
    &lt;/nav&gt;
  );
}

// 5. Wrap app with provider
function App() {
  return (
    &lt;ThemeProvider&gt;
      &lt;Navbar /&gt;
      &lt;MainContent /&gt;
    &lt;/ThemeProvider&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Code Challenge</div>
  <div class="info-box"><strong>Challenge:</strong> Build an <code>AuthContext</code> that holds <code>user</code> (null when logged out) and <code>login</code> / <code>logout</code> functions. Render a <code>LoginPage</code> when <code>user</code> is null, and a <code>Dashboard</code> when logged in — without passing props through intermediate components.</div>
</div>`;

C['usereducer'] = `
<h1 class="page-title">useReducer & Complex State</h1>
<div class="page-meta"><span class="badge">⚛️ React</span><span class="badge">Lesson 11</span><span class="badge">Intermediate</span></div>
<div class="intro-box">
  <p><code>useReducer</code> is an alternative to <code>useState</code> for managing complex state logic. It follows the Redux pattern: <strong>dispatch an action → reducer computes new state</strong>. Ideal when multiple state values interact.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> useReducer Pattern</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — useReducer</span></div>
    <pre><code>import { useReducer } from "react";

// Reducer — pure function: (state, action) =&gt; newState
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const exists = state.items.find(i =&gt; i.id === action.item.id);
      if (exists) {
        return { ...state, items: state.items.map(i =&gt;
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
        )};
      }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] };

    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter(i =&gt; i.id !== action.id) };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

function Cart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const total = state.items.reduce((sum, i) =&gt; sum + i.price * i.qty, 0);

  return (
    &lt;div&gt;
      {state.items.map(item =&gt; (
        &lt;div key={item.id}&gt;
          {item.name} × {item.qty}
          &lt;button onClick={() =&gt; dispatch({ type: "REMOVE_ITEM", id: item.id })}&gt;Remove&lt;/button&gt;
        &lt;/div&gt;
      ))}
      &lt;p&gt;Total: \${total.toFixed(2)}&lt;/p&gt;
      &lt;button onClick={() =&gt; dispatch({ type: "CLEAR" })}&gt;Clear Cart&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Code Challenge</div>
  <div class="info-box"><strong>Challenge:</strong> Implement a traffic light component using <code>useReducer</code>. Actions: <code>NEXT</code> cycles through Red → Green → Yellow → Red. Display the current color and a "Next" button.</div>
</div>`;

C['custom-hooks'] = `
<h1 class="page-title">Custom Hooks</h1>
<div class="page-meta"><span class="badge">⚛️ React</span><span class="badge">Lesson 12</span><span class="badge">Advanced</span></div>
<div class="intro-box">
  <p>Custom hooks extract reusable logic from components into standalone functions. Any function starting with <code>use</code> that calls other hooks is a custom hook. They are the primary pattern for sharing stateful logic in React.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Essential Custom Hooks</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Custom Hooks</span></div>
    <pre><code>// useFetch — generic data fetching
function useFetch(url) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() =&gt; {
    let cancelled = false;
    setLoading(true);
    fetch(url)
      .then(r =&gt; r.json())
      .then(d =&gt; { if (!cancelled) { setData(d); setLoading(false); } })
      .catch(e =&gt; { if (!cancelled) { setError(e.message); setLoading(false); } });
    return () =&gt; { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// useLocalStorage — persist state in localStorage
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() =&gt; {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; }
    catch { return initial; }
  });
  useEffect(() =&gt; { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue];
}

// useDebounce — delay value updates
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() =&gt; {
    const timer = setTimeout(() =&gt; setDebounced(value), delay);
    return () =&gt; clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// Usage
function SearchPage() {
  const [query, setQuery]       = useLocalStorage("search", "");
  const debouncedQuery          = useDebounce(query, 400);
  const { data, loading, error } = useFetch(\`/api/search?q=\${debouncedQuery}\`);

  return (
    &lt;&gt;
      &lt;input value={query} onChange={e =&gt; setQuery(e.target.value)} /&gt;
      {loading &amp;&amp; &lt;Spinner /&gt;}
      {error   &amp;&amp; &lt;p&gt;Error: {error}&lt;/p&gt;}
      {data    &amp;&amp; &lt;ResultsList results={data} /&gt;}
    &lt;/&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Code Challenge</div>
  <div class="info-box"><strong>Challenge:</strong> Build a <code>useWindowSize</code> hook that returns <code>{ width, height }</code> and updates on window resize. Use it to conditionally render a mobile nav vs. desktop nav.</div>
</div>`;

C['react-router'] = `
<h1 class="page-title">React Router v6</h1>
<div class="page-meta"><span class="badge">⚛️ React</span><span class="badge">Lesson 13</span><span class="badge">Advanced</span></div>
<div class="intro-box">
  <p>React Router v6 is the standard solution for client-side routing in React apps. It maps URL paths to components, enabling navigation without full page reloads.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Setup & Basic Routing</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Terminal — Install</span></div>
    <pre><code>npm install react-router-dom</code></pre>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Router Setup</span></div>
    <pre><code>import { BrowserRouter, Routes, Route, Link, NavLink,
         useParams, useNavigate, Outlet } from "react-router-dom";

function App() {
  return (
    &lt;BrowserRouter&gt;
      &lt;Nav /&gt;
      &lt;Routes&gt;
        &lt;Route path="/"        element={&lt;Home /&gt;} /&gt;
        &lt;Route path="/about"   element={&lt;About /&gt;} /&gt;
        &lt;Route path="/users"   element={&lt;UsersLayout /&gt;}&gt;
          &lt;Route index         element={&lt;UserList /&gt;} /&gt;   {/* /users */}
          &lt;Route path=":id"    element={&lt;UserDetail /&gt;} /&gt; {/* /users/42 */}
        &lt;/Route&gt;
        &lt;Route path="*"        element={&lt;NotFound /&gt;} /&gt;   {/* 404 */}
      &lt;/Routes&gt;
    &lt;/BrowserRouter&gt;
  );
}

// Nested layout with Outlet
function UsersLayout() {
  return (
    &lt;div&gt;
      &lt;h2&gt;Users Section&lt;/h2&gt;
      &lt;Outlet /&gt;  {/* renders UserList or UserDetail */}
    &lt;/div&gt;
  );
}

// URL params
function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    &lt;div&gt;
      &lt;p&gt;User ID: {id}&lt;/p&gt;
      &lt;button onClick={() =&gt; navigate(-1)}&gt;Go Back&lt;/button&gt;
    &lt;/div&gt;
  );
}

// Navigation
function Nav() {
  return (
    &lt;nav&gt;
      &lt;NavLink to="/"      className={({ isActive }) =&gt; isActive ? "active" : ""}&gt;Home&lt;/NavLink&gt;
      &lt;NavLink to="/about" className={({ isActive }) =&gt; isActive ? "active" : ""}&gt;About&lt;/NavLink&gt;
      &lt;NavLink to="/users" className={({ isActive }) =&gt; isActive ? "active" : ""}&gt;Users&lt;/NavLink&gt;
    &lt;/nav&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Code Challenge</div>
  <div class="info-box"><strong>Challenge:</strong> Build a blog app with routes: <code>/</code> (post list), <code>/posts/:id</code> (post detail), <code>/new</code> (create post form). Add a protected route that redirects to <code>/login</code> if the user is not logged in.</div>
</div>`;

C['fetching-data'] = `
<h1 class="page-title">Fetching Data & APIs</h1>
<div class="page-meta"><span class="badge">⚛️ React</span><span class="badge">Lesson 14</span><span class="badge">Advanced</span></div>
<div class="intro-box">
  <p>Most React apps communicate with REST APIs. In this lesson we cover the full data-fetching lifecycle: loading states, error handling, caching, mutations, and optimistic UI updates.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Fetch with Loading & Error States</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Complete Fetch Pattern</span></div>
    <pre><code>function PostList() {
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() =&gt; {
    const controller = new AbortController();

    fetch("https://jsonplaceholder.typicode.com/posts", {
      signal: controller.signal
    })
      .then(res =&gt; {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json();
      })
      .then(data =&gt; { setPosts(data.slice(0, 10)); setLoading(false); })
      .catch(err =&gt; {
        if (err.name !== "AbortError") { setError(err.message); setLoading(false); }
      });

    return () =&gt; controller.abort(); // cancel on unmount
  }, []);

  if (loading) return &lt;p&gt;Loading...&lt;/p&gt;;
  if (error)   return &lt;p&gt;Error: {error}&lt;/p&gt;;

  return (
    &lt;ul&gt;
      {posts.map(post =&gt; (
        &lt;li key={post.id}&gt;&lt;strong&gt;{post.title}&lt;/strong&gt;&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> POST / Mutations</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — POST Request</span></div>
    <pre><code>async function createPost(data) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

function NewPostForm() {
  const [title, setTitle]     = useState("");
  const [saving, setSaving]   = useState(false);

  const handleSubmit = async (e) =&gt; {
    e.preventDefault();
    setSaving(true);
    try {
      const post = await createPost({ title, userId: 1 });
      console.log("Created:", post);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input value={title} onChange={e =&gt; setTitle(e.target.value)} /&gt;
      &lt;button disabled={saving}&gt;{saving ? "Saving..." : "Create Post"}&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box"><strong>Challenge:</strong> Build a CRUD todo app using <code>https://jsonplaceholder.typicode.com/todos</code>. Fetch 10 todos on mount, allow marking complete (PUT), and deleting (DELETE). Show loading spinners per operation.</div>
</div>`;

C['performance'] = `
<h1 class="page-title">Performance & Best Practices</h1>
<div class="page-meta"><span class="badge">⚛️ React</span><span class="badge">Lesson 15</span><span class="badge">Advanced</span></div>
<div class="intro-box">
  <p>A fast React app requires understanding re-renders, bundle size, and lazy loading. This final lesson covers the essential tools and patterns every production React developer needs.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> React.memo & Re-render Optimization</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Preventing Re-renders</span></div>
    <pre><code>// React.memo — skip re-render if props haven't changed
const ExpensiveChart = React.memo(function Chart({ data }) {
  return &lt;canvas&gt;{/* heavy render */}&lt;/canvas&gt;;
});

// Stable callback reference with useCallback
function Parent() {
  const [count, setCount]       = useState(0);
  const [theme, setTheme]       = useState("dark");

  // Without useCallback: new function every render =&gt; Chart always re-renders
  const handleClick = useCallback(() =&gt; {
    console.log("Chart clicked");
  }, []); // stable reference

  return (
    &lt;&gt;
      &lt;button onClick={() =&gt; setCount(c =&gt; c + 1)}&gt;Count: {count}&lt;/button&gt;
      &lt;ExpensiveChart data={[1,2,3]} onClick={handleClick} /&gt;
    &lt;/&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Code Splitting & Lazy Loading</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">React — Lazy Loading Routes</span></div>
    <pre><code>import { lazy, Suspense } from "react";

// Lazy load — each route becomes its own bundle chunk
const Dashboard = lazy(() =&gt; import("./pages/Dashboard"));
const Settings  = lazy(() =&gt; import("./pages/Settings"));

function App() {
  return (
    &lt;Suspense fallback={&lt;div className="loading"&gt;Loading page...&lt;/div&gt;}&gt;
      &lt;Routes&gt;
        &lt;Route path="/dashboard" element={&lt;Dashboard /&gt;} /&gt;
        &lt;Route path="/settings"  element={&lt;Settings /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/Suspense&gt;
  );
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Key Best Practices Checklist</div>
  <ul>
    <li>✅ Keep components small and focused on a single responsibility.</li>
    <li>✅ Lift state only as high as necessary.</li>
    <li>✅ Use unique, stable IDs for <code>key</code> props — never array indices.</li>
    <li>✅ Colocate state with the component that needs it.</li>
    <li>✅ Avoid creating functions or objects inside JSX return — they create new references every render.</li>
    <li>✅ Use React DevTools Profiler to identify slow components before optimizing.</li>
    <li>✅ Apply <code>React.memo</code> and <code>useCallback</code> only after measuring — premature optimization adds complexity.</li>
    <li>✅ Lazy-load heavy routes and third-party libraries.</li>
  </ul>
</div>
<div class="section">
  <div class="section-title"><span class="num">4</span> Code Challenge</div>
  <div class="info-box"><strong>Challenge:</strong> Take an existing component that renders a list of 500 items and optimize it: lazy-load it with <code>React.lazy</code>, wrap items in <code>React.memo</code>, and use <code>useCallback</code> for any handlers. Measure before/after using React DevTools Profiler.</div>
</div>`;

// ── BUILD ────────────────────────────────────────────────────────────────────
console.log('Starting React lesson generation...');

lessons.forEach((l, i) => {
  const prev = i > 0 ? lessons[i - 1] : null;
  const next = i < lessons.length - 1 ? lessons[i + 1] : null;
  const html = page(l.slug, l.title, C[l.slug], prev, next);
  fs.writeFileSync(path.join(publicDir, fn(l)), html, 'utf8');
  console.log(`Generated: ${fn(l)}`);
});

// Index
const indexBody = `
<h1 class="page-title">React Tutorial — Complete Guide</h1>
<div class="page-meta">
  <span class="badge">⚛️ React</span>
  <span class="badge">🟢 Beginner to Advanced</span>
  <span class="badge">📅 July 2026</span>
</div>
<div class="intro-box">
  <p>React is the world's most popular JavaScript library for building user interfaces. This 15-lesson course takes you from JSX basics to advanced patterns — hooks, custom hooks, routing, data fetching, state management, and performance optimization — all with real code examples and hands-on challenges.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">▶</span> 15-Lesson Curriculum</div>
  <table class="tbl" style="margin-top:15px;">
    <tr><th>Lesson</th><th>Topic</th></tr>
    ${lessons.map(l => `<tr><td><strong>Lesson ${l.num}</strong></td><td><a href="/${fn(l)}">${l.title}</a></td></tr>`).join('\n    ')}
  </table>
</div>`;

fs.writeFileSync(path.join(publicDir, 'blog-react.html'), page('home', 'React Tutorial — Complete Guide', indexBody, null, lessons[0]), 'utf8');
console.log('Generated: blog-react.html');
console.log('🎉 All 15 React lessons generated inside blog-react/!');
