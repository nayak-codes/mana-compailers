const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const vueBlogDir = path.join(publicDir, 'blog-vue');

// Ensure directory exists
if (!fs.existsSync(vueBlogDir)) {
  fs.mkdirSync(vueBlogDir, { recursive: true });
}

// Vue.js Curriculum
const lessons = [
  { slug: 'intro', num: 1, title: 'Introduction to Vue.js & Vite', filename: 'blog-vue/intro.html' },
  { slug: 'instance-options', num: 2, title: 'The Vue Instance & Options API', filename: 'blog-vue/instance-options.html' },
  { slug: 'template-syntax', num: 3, title: 'Template Syntax & Interpolation', filename: 'blog-vue/template-syntax.html' },
  { slug: 'reactivity-composition', num: 4, title: 'Reactivity Basics & Composition API (ref & reactive)', filename: 'blog-vue/reactivity-composition.html' },
  { slug: 'conditional', num: 5, title: 'Conditional Rendering (v-if vs v-show)', filename: 'blog-vue/conditional.html' },
  { slug: 'list-rendering', num: 6, title: 'List Rendering (v-for & Key Tracking)', filename: 'blog-vue/list-rendering.html' },
  { slug: 'event-handling', num: 7, title: 'Event Handling (v-on & Modifiers)', filename: 'blog-vue/event-handling.html' },
  { slug: 'class-style-bindings', num: 8, title: 'Class & Style Bindings', filename: 'blog-vue/class-style-bindings.html' },
  { slug: 'form-bindings', num: 9, title: 'Form Input Bindings (v-model & Modifiers)', filename: 'blog-vue/form-bindings.html' },
  { slug: 'computed-watch', num: 10, title: 'Computed Properties vs Watchers', filename: 'blog-vue/computed-watch.html' },
  { slug: 'components-props', num: 11, title: 'Components & Props', filename: 'blog-vue/components-props.html' },
  { slug: 'custom-events', num: 12, title: 'Custom Events & Communication ($emit)', filename: 'blog-vue/custom-events.html' },
  { slug: 'slots', num: 13, title: 'Slots & Content Distribution', filename: 'blog-vue/slots.html' },
  { slug: 'routing', num: 14, title: 'Vue Router & Navigation', filename: 'blog-vue/routing.html' },
  { slug: 'pinia-state', num: 15, title: 'State Management (Pinia Basics)', filename: 'blog-vue/pinia-state.html' }
];

function getSidebar(activeSlug) {
  let html = `\n    <div class="sidebar-heading">Vue.js Tutorial</div>\n`;
  html += `    <a href="/blog-vue.html"${activeSlug === 'home' ? ' class="active"' : ''}>Vue.js HOME</a>\n`;
  
  lessons.forEach(l => {
    html += `    <a href="/${l.filename}"${activeSlug === l.slug ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
  });

  html += `\n    <div class="sidebar-heading">Reference</div>\n`;
  html += `    <a href="/blog.html">All Tutorials</a>\n\n`;

  html += `    <div class="sidebar-heading">Other Frontend</div>\n`;
  html += `    <a href="/blog-react.html">React</a>\n`;
  html += `    <a href="/blog-angular.html">Angular</a>\n`;
  html += `    <a href="/blog-nextjs.html">Next.js</a>\n`;
  html += `    <a href="/blog-javascript.html">JavaScript</a>\n`;
  html += `    <a href="/blog-html.html">HTML</a>\n`;
  html += `    <a href="/blog-css.html">CSS</a>\n`;
  
  return html;
}

function wrapPage(slug, title, mainContent, prevFile, prevTitle, nextFile, nextTitle) {
  let navFooter = `<div class="nav-footer">\n`;
  if (prevFile) {
    navFooter += `      <a href="/${prevFile}" class="nav-btn">\n`;
    navFooter += `        <span class="label">← Previous Lesson</span>\n`;
    navFooter += `        <span class="title">${prevTitle}</span>\n`;
    navFooter += `      </a>\n`;
  } else {
    navFooter += `      <a href="/blog-vue.html" class="nav-btn">\n`;
    navFooter += `        <span class="label">← Vue.js Overview</span>\n`;
    navFooter += `        <span class="title">Course Index</span>\n`;
    navFooter += `      </a>\n`;
  }

  if (nextFile) {
    navFooter += `      <a href="/${nextFile}" class="nav-btn" style="text-align:right;">\n`;
    navFooter += `        <span class="label">Next Lesson →</span>\n`;
    navFooter += `        <span class="title">${nextTitle}</span>\n`;
    navFooter += `      </a>\n`;
  } else {
    navFooter += `      <a href="/blog.html" class="nav-btn" style="text-align:right;">\n`;
    navFooter += `        <span class="label">All Tutorials →</span>\n`;
    navFooter += `        <span class="title">Learning Hub</span>\n`;
    navFooter += `      </a>\n`;
  }
  navFooter += `    </div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Our Compiler</title>
  <meta name="description" content="Learn Vue.js — ${title} with clear explanations, structured templates, interactive code snippets, and custom component challenges." />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  
  <!-- Blog Theme Switcher -->
  <script>
    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
      window.addEventListener('DOMContentLoaded', () => {
        // Theme Toggle Button
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: "Inter", sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;';
          toggleBtn.addEventListener('mouseenter', () => {
            toggleBtn.style.background = 'rgba(255, 255, 255, 0.25)';
            toggleBtn.style.borderColor = '#ffffff';
          });
          toggleBtn.addEventListener('mouseleave', () => {
            toggleBtn.style.background = 'rgba(255, 255, 255, 0.15)';
            toggleBtn.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          });
          const updateText = () => {
            const isLight = document.body.classList.contains('light-theme');
            toggleBtn.innerHTML = isLight ? '🌙 Dark' : '☀️ Light';
          };
          updateText();
          toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.documentElement.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateText();
          });
          topnav.appendChild(toggleBtn);
        }

        // Decorate Code Blocks (Copy Code)
        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;

          // Find or create actions container inside header
          let actionsContainer = header.querySelector('.code-actions');
          if (!actionsContainer) {
            actionsContainer = document.createElement('div');
            actionsContainer.className = 'code-actions';
            actionsContainer.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-left: auto;';
            header.appendChild(actionsContainer);
          }

          // Inject Copy Button
          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn';
          copyBtn.innerHTML = '📋 Copy';
          copyBtn.style.cssText = 'background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: "Inter", sans-serif; white-space: nowrap;';
          copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.background = 'rgba(255, 255, 255, 0.25)';
            copyBtn.style.borderColor = '#ffffff';
          });
          copyBtn.addEventListener('mouseleave', () => {
            copyBtn.style.background = 'rgba(255, 255, 255, 0.15)';
            copyBtn.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          });
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(codeEl.textContent).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => {
                copyBtn.innerHTML = '📋 Copy';
              }, 2000);
            }).catch(err => {
              console.error('Failed to copy: ', err);
            });
          });
          actionsContainer.appendChild(copyBtn);
        });
      });
    })();
  </script>
</head>
<body class="lang-vue">

<!-- TOP LANGUAGE BAR -->
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
  <a href="/blog-react.html">React</a>
  <a href="/blog-angular.html">Angular</a>
  <a href="/blog-vue.html" class="active">Vue.js</a>
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
  <!-- LEFT SIDEBAR -->
  <aside class="sidebar">
    ${getSidebar(slug)}
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span>›</span>
      <a href="/blog.html">Tutorials</a><span>›</span>
      <a href="/blog-vue.html">Vue.js</a><span>›</span>
      <span>Lesson ${slug === 'home' ? 'Index' : lessons.find(x => x.slug === slug).num}</span>
    </div>
    
    ${mainContent}
    
    ${navFooter}
  </main>
</div>
</body>
</html>`;
}

const lessonContents = {};

// Lesson 1
lessonContents['intro'] = `
<h1 class="page-title">Introduction to Vue.js & Vite</h1>
<div class="page-meta">
  <span class="badge">💚 Vue.js</span>
  <span class="badge">Lesson 1</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Vue.js (commonly known as Vue) is a progressive JavaScript framework used to build modern, reactive user interfaces. It focuses on the view layer only, making it easy to integrate into existing projects while remaining fully capable of powering complex Single Page Applications (SPAs).</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> What is a Progressive Framework?</div>
  <p>Unlike monolithic frameworks, Vue is designed to be incrementally adoptable:</p>
  <ul>
    <li><strong>Simple Core Library</strong>: Start by embedding Vue via CDN to add reactivity to static HTML layouts.</li>
    <li><strong>Fully Featured Ecosystem</strong>: Scale up by importing Vue Router for client-side navigation, Pinia for state management, and Vite for build optimization.</li>
    <li><strong>Virtual DOM</strong>: Uses a lightweight, in-memory representation of the DOM to compute and apply minimum page updates, optimizing rendering speed.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Scaffolding with Vite</div>
  <p>Vite is the modern build tool recommended by the Vue core team for project generation, featuring rapid hot module replacement (HMR) and fast build execution.</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal — Create Vue + Vite Project</span>
    </div>
    <pre><code># 1. Initialize project scaffold
npm create vue@latest

# 2. Select project options (TypeScript, Router, Pinia etc)
# 3. Navigate into workspace folder
cd my-vue-project

# 4. Install dependencies
npm install

# 5. Spin up development server
npm run dev</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Open your terminal, initialize a new Vue scaffold using Vite, and inspect the entry points inside <code>src/main.js</code> and the base <code>index.html</code> page.
  </div>
</div>
`;

// Lesson 2
lessonContents['instance-options'] = `
<h1 class="page-title">The Vue Instance & Options API</h1>
<div class="page-meta">
  <span class="badge">💚 Vue.js</span>
  <span class="badge">Lesson 2</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Before Vue 3 introduced the Composition API, components were defined exclusively using the <strong>Options API</strong>. This approach structures component configuration objects into clear, dedicated option properties.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Structure of Options API Properties</div>
  <p>The Options API groups component logic based on option categories:</p>
  <ul>
    <li><strong>data()</strong>: A function that returns the component's reactive state properties.</li>
    <li><strong>methods</strong>: An object containing standard class functions and event handlers.</li>
    <li><strong>computed</strong>: An object defining cached, derivative calculations variables.</li>
    <li><strong>watch</strong>: An object containing watcher callbacks to run side effects when reactive variables mutate.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Declaring an Options API Component</div>
  <p>Let's inspect a standard Single File Component (SFC) layout using the Options API:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Vue — Options Component</span>
    </div>
    <pre><code>&lt;template&gt;
  &lt;div class="counter-card"&gt;
    &lt;h3&gt;Counter: {{ count }}&lt;/h3&gt;
    &lt;p&gt;Double Count: {{ doubleCount }}&lt;/p&gt;
    &lt;button @click="increment"&gt;Increment&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  // 1. Reactive state definition
  data() {
    return {
      count: 0
    };
  },
  // 2. Class methods
  methods: {
    increment() {
      this.count++;
    }
  },
  // 3. Cached computed properties
  computed: {
    doubleCount() {
      return this.count * 2;
    }
  }
};
&lt;/script&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a new SFC component using the Options API containing a text input field, a data property called <code>message</code>, and a method that prints this message to the console.
  </div>
</div>
`;

// Lesson 3
lessonContents['template-syntax'] = `
<h1 class="page-title">Template Syntax & Interpolation</h1>
<div class="page-meta">
  <span class="badge">💚 Vue.js</span>
  <span class="badge">Lesson 3</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Vue templates use standard HTML syntax, extending it with custom directives and mustache interpolation to bind view elements to the underlying reactive state.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Essential Template Bindings</div>
  <p>Common binding patterns in Vue include:</p>
  <ul>
    <li><strong>Mustache Interpolation ({{ value }})</strong>: Renders text dynamically inside elements.</li>
    <li><strong>v-html Directive</strong>: Renders raw HTML strings directly into the DOM (caution: sanitization is required to prevent XSS attacks).</li>
    <li><strong>v-bind / : Selector</strong>: Dynamically binds reactive variables to HTML attributes (e.g. <code>:src="imageUrl"</code>, <code>:disabled="isBtnDisabled"</code>).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Template Binding Implementation</div>
  <p>Let's check how templates use these bindings in code:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Vue Template Bindings</span>
    </div>
    <pre><code>&lt;!-- Dynamic Text Interpolation --&gt;
&lt;h3&gt;User: {{ user.name }}&lt;/h3&gt;
&lt;p&gt;Active: {{ user.status.toUpperCase() }}&lt;/p&gt;

&lt;!-- Dynamic Attribute Binding (shorthand) --&gt;
&lt;img :src="user.avatarUrl" :alt="user.name"&gt;

&lt;!-- Dynamic Disabled state --&gt;
&lt;button :disabled="!user.isActive"&gt;Send Message&lt;/button&gt;

&lt;!-- Raw HTML injection --&gt;
&lt;div v-html="formattedHtmlCode"&gt;&lt;/div&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a component template containing an anchor tag (<code>&lt;a&gt;</code>) whose <code>href</code> and <code>title</code> attributes are bound dynamically using the <code>v-bind</code> shorthand.
  </div>
</div>
`;

// Lesson 4
lessonContents['reactivity-composition'] = `
<h1 class="page-title">Reactivity Basics & Composition API (ref & reactive)</h1>
<div class="page-meta">
  <span class="badge">💚 Vue.js</span>
  <span class="badge">Lesson 4</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Vue 3's <strong>Composition API</strong> provides a more flexible way to structure components, using reactivity functions like <code>ref</code> and <code>reactive</code> to define state properties.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> ref() vs reactive()</div>
  <p>Reactivity functions serve different use cases:</p>
  <ul>
    <li><strong>ref()</strong>: Can wrap any value (primitives like strings, numbers, booleans, or objects). In JavaScript scripts, you must access the value using <code>.value</code> (e.g. <code>count.value++</code>). Inside <code>&lt;template&gt;</code> layout, it is automatically unwrapped, so no <code>.value</code> is needed.</li>
    <li><strong>reactive()</strong>: Can only wrap object types (objects, arrays). It does not use <code>.value</code>, but you cannot reassign the root object reference without losing reactivity.</li>
    <li><strong>&lt;script setup&gt;</strong>: Syntactic sugar that simplifies using the Composition API, automatically exposing declared variables to the template.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Composition API Setup in SFC</div>
  <p>Let's check how to write a component using the Composition API with <code>&lt;script setup&gt;</code>:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Vue — Script Setup SFC</span>
    </div>
    <pre><code>&lt;template&gt;
  &lt;div class="profile"&gt;
    &lt;h3&gt;User: {{ profile.name }}&lt;/h3&gt;
    &lt;p&gt;Age: {{ profile.age }}&lt;/p&gt;
    &lt;button @click="birthday"&gt;Birthday&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, reactive } from 'vue';

// ref for a simple boolean flag
const isActive = ref(true);

// reactive for an object
const profile = reactive({
  name: 'Balaji Nayak',
  age: 22
});

function birthday() {
  // Access and modify properties directly
  profile.age++;
}
&lt;/script&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a component containing a reactive state array of colors using <code>ref()</code>. Add a method that pushes a new color string to the array when a button is clicked.
  </div>
</div>
`;

// Lesson 5
lessonContents['conditional'] = `
<h1 class="page-title">Conditional Rendering (v-if vs v-show)</h1>
<div class="page-meta">
  <span class="badge">💚 Vue.js</span>
  <span class="badge">Lesson 5</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Conditional rendering allows you to toggle elements on or off. Vue provides two main directives for this: <code>v-if</code> and <code>v-show</code>, which operate differently under the hood.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> v-if vs v-show</div>
  <p>The difference lies in how elements are rendered:</p>
  <ul>
    <li><strong>v-if</strong>: True conditional rendering. It physically adds or removes elements from the DOM. If the condition is initially false, it does not render the element at all. It also supports <code>v-else-if</code> and <code>v-else</code> blocks.</li>
    <li><strong>v-show</strong>: Much simpler. It always renders the element in the DOM, toggling its visibility using the CSS <code>display: none;</code> property.</li>
    <li><strong>Performance</strong>: <code>v-if</code> has higher toggle costs (requires re-building the DOM), while <code>v-show</code> has higher initial render costs. Use <code>v-show</code> for elements that need to be toggled frequently.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Conditional Directives in Template</div>
  <p>Let's check how to use conditional directives in a template:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Vue Conditionals</span>
    </div>
    <pre><code>&lt;!-- Using v-if / v-else-if / v-else --&gt;
&lt;div v-if="user.role === 'admin'"&gt;
  &lt;p&gt;Welcome, Administrator.&lt;/p&gt;
&lt;/div&gt;
&lt;div v-else-if="user.role === 'editor'"&gt;
  &lt;p&gt;Welcome, Content Editor.&lt;/p&gt;
&lt;/div&gt;
&lt;div v-else&gt;
  &lt;p&gt;Welcome, Guest User.&lt;/p&gt;
&lt;/div&gt;

&lt;!-- Using v-show for frequent toggles --&gt;
&lt;div v-show="isNotificationPanelOpen" class="popout-panel"&gt;
  &lt;p&gt;You have 3 new notifications.&lt;/p&gt;
&lt;/div&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a component containing an input field and a toggle button. Use <code>v-if</code> to display a warning message only when the input field value length exceeds 10 characters.
  </div>
</div>
`;

// Lesson 6
lessonContents['list-rendering'] = `
<h1 class="page-title">List Rendering (v-for & Key Tracking)</h1>
<div class="page-meta">
  <span class="badge">💚 Vue.js</span>
  <span class="badge">Lesson 6</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>The <code>v-for</code> directive iterates over arrays or objects, rendering lists of elements. Providing a unique <code>:key</code> is critical for helping the Virtual DOM compile updates efficiently.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> The Role of Key tracking</div>
  <p>List rendering requires configuring specific keys:</p>
  <ul>
    <li><strong>v-for syntax</strong>: Iterates through lists: <code>v-for="item in items"</code> or <code>v-for="(item, index) in items"</code>.</li>
    <li><strong>:key Attribute</strong>: A unique, stable identifier for each item. It helps Vue trace which elements have changed, were moved, or deleted, avoiding unnecessary DOM re-creation. Never use array indices as keys if the list order can change.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> List Rendering in Templates</div>
  <p>Let's check list iteration in action:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Vue List Rendering</span>
    </div>
    <pre><code>&lt;h4&gt;Tasks Progress List:&lt;/h4&gt;
&lt;ul&gt;
  &lt;!-- Always bind a unique :key to identify the item --&gt;
  &lt;li v-for="(task, index) in tasks" :key="task.id"&gt;
    &lt;span&gt;{{ index + 1 }}. {{ task.title }}&lt;/span&gt;
    &lt;span v-if="task.isDone" class="success-badge"&gt;Done&lt;/span&gt;
  &lt;/li&gt;
&lt;/ul&gt;

&lt;!-- Iterating through object properties --&gt;
&lt;div v-for="(val, name) in userMetadata" :key="name"&gt;
  {{ name }}: {{ val }}
&lt;/div&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a component containing an array of book objects (each with an <code>id</code>, <code>title</code>, and <code>author</code>). Render them in a list, displaying a "Remove" button next to each book that deletes it from the array when clicked.
  </div>
</div>
`;

// Lesson 7
lessonContents['event-handling'] = `
<h1 class="page-title">Event Handling (v-on & Modifiers)</h1>
<div class="page-meta">
  <span class="badge">💚 Vue.js</span>
  <span class="badge">Lesson 7</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>The <code>v-on</code> directive (shorthand: <code>@</code>) listens to DOM events, triggering component methods or running inline JavaScript expressions when fired.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Event Modifiers</div>
  <p>Vue provides event modifiers to handle common event actions without manual JavaScript overrides:</p>
  <ul>
    <li><strong>.stop</strong>: Calls <code>event.stopPropagation()</code> to prevent the event from bubbling up the DOM tree.</li>
    <li><strong>.prevent</strong>: Calls <code>event.preventDefault()</code> to block default browser actions (like form submissions reloading the page).</li>
    <li><strong>.once</strong>: Triggers the event handler at most once.</li>
    <li><strong>Key Modifiers</strong>: Listen for specific key triggers (e.g. <code>@keyup.enter</code>, <code>@keyup.esc</code>).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Event Handling Implementation</div>
  <p>Let's check how event handlers and modifiers are written:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Vue Events</span>
    </div>
    <pre><code>&lt;!-- Simple event trigger shorthand --&gt;
&lt;button @click="incrementCount"&gt;Add Count&lt;/button&gt;

&lt;!-- Passing arguments to handlers --&gt;
&lt;button @click="deleteItem(item.id, $event)"&gt;Delete&lt;/button&gt;

&lt;!-- Form submission with prevent modifier --&gt;
&lt;form @submit.prevent="onFormSubmit"&gt;
  &lt;!-- Trigger callback only on Enter key press --&gt;
  &lt;input @keyup.enter="submitSearch" placeholder="Type search term..."&gt;
  &lt;button type="submit"&gt;Search&lt;/button&gt;
&lt;/form&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a component template containing a box layout. Bind a mouse movement event (<code>@mousemove</code>) that displays the cursor's current X and Y coordinate parameters inside the box dynamically.
  </div>
</div>
`;

// Lesson 8
lessonContents['class-style-bindings'] = `
<h1 class="page-title">Class & Style Bindings</h1>
<div class="page-meta">
  <span class="badge">💚 Vue.js</span>
  <span class="badge">Lesson 8</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Vue extends class and style bindings, allowing you to pass objects or arrays to dynamically apply styles based on component state.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Object and Array Syntax</div>
  <p>Applying classes and styles dynamically can be written in two ways:</p>
  <ul>
    <li><strong>Class Object Syntax</strong>: Applies classes dynamically based on boolean flags: <code>:class="{ active: isActive, 'text-error': hasError }"</code>.</li>
    <li><strong>Class Array Syntax</strong>: Applies a list of class strings dynamically: <code>:class="[baseClass, activeClass]"</code>.</li>
    <li><strong>Inline Styles Binding</strong>: Binds JavaScript objects to the style attribute, camelCasing property names: <code>:style="{ color: activeColor, fontSize: size + 'px' }"</code>.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Styles Bindings in Template</div>
  <p>Let's check dynamic style bindings in code:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Styles bindings</span>
    </div>
    <pre><code>&lt;!-- Dynamic Class Object Binding --&gt;
&lt;div class="card" :class="{ 'card--featured': isFeatured, 'card--disabled': isDisabled }"&gt;
  &lt;p&gt;Flexible styles setup.&lt;/p&gt;
&lt;/div&gt;

&lt;!-- Dynamic Inline Style Binding --&gt;
&lt;button :style="{ backgroundColor: buttonBgColor, border: borderThickness + 'px solid red' }"&gt;
  Dynamic Looks
&lt;/button&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a component containing a warning box. Toggle the warning box background color between red and transparent using <code>isActive</code> state flags bound via the <code>:class</code> directive.
  </div>
</div>
`;

// Lesson 9
lessonContents['form-bindings'] = `
<h1 class="page-title">Form Input Bindings (v-model & Modifiers)</h1>
<div class="page-meta">
  <span class="badge">💚 Vue.js</span>
  <span class="badge">Lesson 9</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>The <code>v-model</code> directive simplifies form handling by establishing two-way data binding between inputs and component state, automatically syncing values on user changes.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> v-model input types and modifiers</div>
  <p>Vue's form bindings handle diverse input elements out of the box:</p>
  <ul>
    <li><strong>Input controls</strong>: Auto-syncs texts inputs, select dropdown lists, checkboxes, and radio buttons.</li>
    <li><strong>.lazy Modifier</strong>: Syncs values after <code>change</code> events instead of <code>input</code> events (e.g. when focus leaves the input).</li>
    <li><strong>.number Modifier</strong>: Automatically casts user inputs to JavaScript numbers.</li>
    <li><strong>.trim Modifier</strong>: Automatically trims leading and trailing whitespace from inputs.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Form Inputs Bindings Layout</div>
  <p>Let's check form bindings in a template:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Form Bindings</span>
    </div>
    <pre><code>&lt;form @submit.prevent="saveForm"&gt;
  &lt;!-- Trimmed input --&gt;
  &lt;input v-model.trim="user.name" placeholder="Name"&gt;

  &lt;!-- Number input --&gt;
  &lt;input v-model.number="user.age" type="number" placeholder="Age"&gt;

  &lt;!-- Dropdown select --&gt;
  &lt;select v-model="user.country"&gt;
    &lt;option value="us"&gt;United States&lt;/option&gt;
    &lt;option value="in"&gt;India&lt;/option&gt;
  &lt;/select&gt;

  &lt;!-- Single Checkbox (Boolean) --&gt;
  &lt;label&gt;
    &lt;input type="checkbox" v-model="user.subscribe"&gt; Subscribe to newsletters
  &lt;/label&gt;

  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a form template containing checkboxes bound to a single reactive array called <code>selectedSkills</code>. Validate that at least two skills are selected before allowing form submission.
  </div>
</div>
`;

// Lesson 10
lessonContents['computed-watch'] = `
<h1 class="page-title">Computed Properties vs Watchers</h1>
<div class="page-meta">
  <span class="badge">💚 Vue.js</span>
  <span class="badge">Lesson 10</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>While both compute values based on state changes, Computed Properties are cached getters for rendering views, whereas Watchers run side effects in response to data mutations.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Computed Caching vs Watcher Side Effects</div>
  <p>Choosing the correct tool ensures optimal rendering performance:</p>
  <ul>
    <li><strong>computed()</strong>: Declares a computed value that is cached based on its reactive dependencies. It only recalculates when its dependencies mutate, making it highly efficient. Use for formatting data or filtering lists.</li>
    <li><strong>watch() / watchEffect()</strong>: Runs a callback when a tracked variable changes. Use for asynchronous tasks (e.g. saving state to localStorage, making API requests in response to query changes).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Composition API Computed & Watchers</div>
  <p>Let's check computed properties and watchers in a Composition API setup:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — Computed & Watch</span>
    </div>
    <pre><code>import { ref, computed, watch } from 'vue';

const query = ref('');
const products = ref([{ name: 'Laptop', price: 900 }, { name: 'Phone', price: 500 }]);

// 1. Cached computed list filter
const filteredProducts = computed(() => {
  console.log('Running computed filter...');
  return products.value.filter(p => p.name.toLowerCase().includes(query.value.toLowerCase()));
});

// 2. Watcher callback for side effects
watch(query, (newVal, oldVal) => {
  console.log('Query changed from:', oldVal, 'to:', newVal);
  // Run side effects here (e.g. save search queries history to database)
});</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a component that tracks a numeric <code>price</code> state. Use a watcher to log a warning message to the console if the price value exceeds $100.
  </div>
</div>
`;

// Lesson 11
lessonContents['components-props'] = `
<h1 class="page-title">Components & Props</h1>
<div class="page-meta">
  <span class="badge">💚 Vue.js</span>
  <span class="badge">Lesson 11</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Props allow parent components to pass read-only data down to child components, establishing clear interfaces for reusable UI elements.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> defineProps and type validation</div>
  <p>Vue validates props at runtime to catch data bugs early:</p>
  <ul>
    <li><strong>defineProps()</strong>: Macro used in the Composition API to declare component props (does not need to be imported).</li>
    <li><strong>Read-Only Bound</strong>: Props form a one-way down data binding. Child components must not mutate prop values directly.</li>
    <li><strong>Type Checkers</strong>: Define props with explicit types, defaults, and required constraints for runtime validation.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Declaring and validating props</div>
  <p>Let's check how to declare and validate props in a child component:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Vue — Child Component (Props)</span>
    </div>
    <pre><code>&lt;template&gt;
  &lt;div class="user-card"&gt;
    &lt;h4&gt;Name: {{ name }}&lt;/h4&gt;
    &lt;p&gt;Status: {{ isActive ? 'Active' : 'Offline' }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
// Declare and validate props using compile macro
defineProps({
  name: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
});
&lt;/script&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a component class <code>ArticleCard</code> that accepts props for <code>title</code>, <code>readTimeMinutes</code> (as a Number), and <code>category</code> (with a default value of 'General').
  </div>
</div>
`;

// Lesson 12
lessonContents['custom-events'] = `
<h1 class="page-title">Custom Events & Communication ($emit)</h1>
<div class="page-meta">
  <span class="badge">💚 Vue.js</span>
  <span class="badge">Lesson 12</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Custom events allow child components to communicate back up to their parents by emitting events, passing data payloads along with the notifications.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> defineEmits custom triggers</div>
  <p>Component communication in Vue follows a "Props Down, Events Up" pattern:</p>
  <ul>
    <li><strong>defineEmits()</strong>: Macro used in the Composition API to declare custom events that the component can emit.</li>
    <li><strong>emit() function</strong>: Emits an event with a specific name and optional payload data to parent listeners.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Custom Event Emitter Setup</div>
  <p>Let's check how a child component emits events to its parent:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Vue — Child Component (Emitter)</span>
    </div>
    <pre><code>&lt;template&gt;
  &lt;div class="item-card"&gt;
    &lt;h4&gt;{{ title }}&lt;/h4&gt;
    &lt;button @click="triggerSelect"&gt;Select&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
const props = defineProps({
  title: String
});

// Declare custom events
const emit = defineEmits(['selectedItem']);

function triggerSelect() {
  // Emit event upwards, passing title as payload
  emit('selectedItem', props.title);
}
&lt;/script&gt;</code></pre>
  </div>
  <p>The parent component listens to these events in its template:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Parent Event Listener</span>
    </div>
    <pre><code>&lt;app-item-card 
  title="Premium Laptop" 
  @selectedItem="handleSelectItem($event)"&gt;
&lt;/app-item-card&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a child component <code>QuantitySelector</code> containing increment and decrement buttons that emits a <code>changeQty</code> event with values of <code>+1</code> or <code>-1</code> back to a parent count variable.
  </div>
</div>
`;

// Lesson 13
lessonContents['slots'] = `
<h1 class="page-title">Slots & Content Distribution</h1>
<div class="page-meta">
  <span class="badge">💚 Vue.js</span>
  <span class="badge">Lesson 13</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Slots allow child components to define placeholders, letting parent components inject custom HTML templates into those layouts dynamically.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Named and Scoped slots</div>
  <p>Vue supports three types of slots for content distribution:</p>
  <ul>
    <li><strong>Default Slots (&lt;slot&gt;)</strong>: A single, unnamed placeholder slot that renders any content passed inside the child component tags.</li>
    <li><strong>Named Slots</strong>: Toggles content into specific slots defined by name attributes: <code>&lt;slot name="header"&gt;&lt;/slot&gt;</code>.</li>
    <li><strong>Scoped Slots</strong>: Pass reactive data from the child component back up to the parent template, letting the parent customize how the data is styled.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Card Slot Component Setup</div>
  <p>Let's check how to construct a component with named slots:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Vue — Card Slot Component</span>
    </div>
    <pre><code>&lt;template&gt;
  &lt;div class="box-card"&gt;
    &lt;header class="box-header"&gt;
      &lt;!-- Named slot --&gt;
      &lt;slot name="title"&gt;Default Title&lt;/slot&gt;
    &lt;/header&gt;
    &lt;main class="box-body"&gt;
      &lt;!-- Default slot --&gt;
      &lt;slot&gt;&lt;/slot&gt;
    &lt;/main&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
  </div>
  <p>Parents can project custom templates into these slots using the <code>v-slot</code> or <code>#</code> directive:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Parent Slots Usage</span>
    </div>
    <pre><code>&lt;app-card&gt;
  &lt;!-- Project into named title slot --&gt;
  &lt;template #title&gt;
    &lt;h2&gt;Dynamic Product Details&lt;/h2&gt;
  &lt;/template&gt;
  
  &lt;!-- Project into default slot --&gt;
  &lt;p&gt;This content is projected into the card main body.&lt;/p&gt;
&lt;/app-card&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a child list component that uses scoped slots to pass individual list items back up to a parent component, allowing the parent to style each item dynamically.
  </div>
</div>
`;

// Lesson 14
lessonContents['routing'] = `
<h1 class="page-title">Vue Router & Navigation</h1>
<div class="page-meta">
  <span class="badge">💚 Vue.js</span>
  <span class="badge">Lesson 14</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Vue Router maps URL paths to component views, enabling client-side routing in single-page applications without triggering full page reloads.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Router Views, parameters and routes mapping</div>
  <p>Configuring client-side routing requires setting up routing mappings:</p>
  <ul>
    <li><strong>router-link</strong>: Sells navigation links, avoiding full browser refreshes: <code>&lt;router-link to="/about"&gt;</code>.</li>
    <li><strong>router-view</strong>: A placeholder viewport component telling Vue Router where to render the matched component route.</li>
    <li><strong>Dynamic Routes</strong>: Map URLs with parameter variables: <code>path: '/user/:id'</code>. Access these parameters inside scripts using the <code>useRoute()</code> hook.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Defining Vue Routing Configuration</div>
  <p>Let's check how to initialize a routing setup:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — Router Setup</span>
    </div>
    <pre><code>import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import ProfileView from './views/ProfileView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/profile/:id', component: ProfileView }, // dynamic param route
  { path: '/:pathMatch(.*)*', redirect: '/' } // fallback route
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});</code></pre>
  </div>
  <p>Read parameters dynamically inside components using the <code>useRoute</code> hook:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — Reading Params Hook</span>
    </div>
    <pre><code>&lt;script setup&gt;
import { useRoute } from 'vue-router';
const route = useRoute();

// Read route parameter id
const userId = route.params.id;
&lt;/script&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a navbar component with dynamic links using <code>&lt;router-link&gt;</code>. Apply active styling class highlights using the <code>active-class</code> attribute property.
  </div>
</div>
`;

// Lesson 15
lessonContents['pinia-state'] = `
<h1 class="page-title">State Management (Pinia Basics)</h1>
<div class="page-meta">
  <span class="badge">💚 Vue.js</span>
  <span class="badge">Lesson 15</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Pinia is the official, modern state management library for Vue.js. It allows you to share state properties across components globally in a clean, developer-friendly way.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Pinia stores properties</div>
  <p>Pinia stores are organized around three key concepts, mirroring Vue components:</p>
  <ul>
    <li><strong>state</strong>: A function that defines the global reactive variables.</li>
    <li><strong>getters</strong>: Functions that return computed properties based on store state (automatically cached).</li>
    <li><strong>actions</strong>: Methods that contain business logic or fetch API data, mutating the state directly.</li>
    <li><strong>DevTools</strong>: Integrates seamlessly with Vue DevTools, providing detailed state tracking and time-travel debugging.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Creating a Pinia Store</div>
  <p>Let's check how to declare and consume a Pinia store:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — Pinia Store</span>
    </div>
    <pre><code>import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  // 1. Reactive state variables
  state: () => ({
    itemsCount: 0
  }),
  // 2. Computed getters
  getters: {
    isCartEmpty: (state) => state.itemsCount === 0
  },
  // 3. Methods/Actions
  actions: {
    addItem() {
      this.itemsCount++;
    },
    clearCart() {
      this.itemsCount = 0;
    }
  }
});</code></pre>
  </div>
  <p>Import and consume the store directly in any component:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Vue — Consuming Store</span>
    </div>
    <pre><code>&lt;template&gt;
  &lt;div class="cart-details"&gt;
    &lt;p&gt;Cart Items: {{ cart.itemsCount }}&lt;/p&gt;
    &lt;button @click="cart.addItem"&gt;Add Item&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { useCartStore } from './stores/cart';
const cart = useCartStore();
&lt;/script&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a new Pinia store called <code>useThemeStore</code> that tracks a boolean flag <code>isDarkMode</code>, exposing an action method that toggles this flag value.
  </div>
</div>
`;

// Build lessons
console.log('Starting Vue.js lesson generation...');

lessons.forEach((l, index) => {
  const prevLesson = index > 0 ? lessons[index - 1] : null;
  const nextLesson = index < lessons.length - 1 ? lessons[index + 1] : null;
  
  const prevFile = prevLesson ? prevLesson.filename : null;
  const prevTitle = prevLesson ? prevLesson.title : null;
  const nextFile = nextLesson ? nextLesson.filename : null;
  const nextTitle = nextLesson ? nextLesson.title : null;
  
  const contentHtml = lessonContents[l.slug];
  if (!contentHtml) {
    console.error(`Missing content for lesson: ${l.slug}`);
    return;
  }
  
  const outputHtml = wrapPage(
    l.slug,
    l.title,
    contentHtml,
    prevFile,
    prevTitle,
    nextFile,
    nextTitle
  );
  
  fs.writeFileSync(path.join(publicDir, l.filename), outputHtml, 'utf8');
  console.log(`Generated: ${l.filename}`);
});

// Generate main index page: blog-vue.html
const indexContent = `
<h1 class="page-title">Vue.js Programming Tutorial</h1>
<div class="page-meta">
  <span class="badge">💚 Vue.js</span>
  <span class="badge">🟢 Beginner Friendly</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Vue.js is a progressive web development framework designed to build reactive interfaces incrementally. In this comprehensive, 15-lesson course, you will learn progressive framework architectures, Vite setup scaffolding, Options API structure properties, Composition API reactivity definitions (ref & reactive), conditional displays comparisons, list loops iteration tracking, event listeners triggers modifiers, class dynamic styling bindings, v-model forms bindings modifiers, computed caching getters watchers, components interfaces props define, child custom emit event parameters, slot projections layouts distribution, Vue Router mapping views, and global Pinia store states configurations.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">▶</span> Course Curriculum</div>
  <p>Choose a topic from the left sidebar or click a lesson below to start learning Vue.js:</p>
  <table class="tbl" style="margin-top: 15px;">
    <tr><th>Lesson</th><th>Topic</th></tr>
    ${lessons.map(l => `
      <tr>
        <td><strong>Lesson ${l.num}</strong></td>
        <td><strong><a href="/${l.filename}">${l.title}</a></strong></td>
      </tr>
    `).join('')}
  </table>
</div>
`;

const outputIndexHtml = wrapPage(
  'home',
  'Vue.js Programming Tutorial & Reference Guide',
  indexContent,
  null,
  null,
  lessons[0].filename,
  lessons[0].title
);

fs.writeFileSync(path.join(publicDir, 'blog-vue.html'), outputIndexHtml, 'utf8');
console.log('Generated: blog-vue.html');
console.log('🎉 Successfully generated all 15 Vue.js tutorial files inside blog-vue/ folder!');
