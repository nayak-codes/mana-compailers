const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const htmlBlogDir = path.join(publicDir, 'blog-html');

// Ensure directory exists
if (!fs.existsSync(htmlBlogDir)) {
  fs.mkdirSync(htmlBlogDir, { recursive: true });
}

// HTML Curriculum
const lessons = [
  { slug: 'intro', num: 1, title: 'Welcome & Basic Syntax', filename: 'blog-html/intro.html' },
  { slug: 'structure', num: 2, title: 'Document Structure & Head Elements', filename: 'blog-html/structure.html' },
  { slug: 'text-formatting', num: 3, title: 'Headings, Paragraphs & Formatting', filename: 'blog-html/text-formatting.html' },
  { slug: 'links', num: 4, title: 'Hyperlinks & Navigation', filename: 'blog-html/links.html' },
  { slug: 'media', num: 5, title: 'Images & Embedded Media', filename: 'blog-html/media.html' },
  { slug: 'lists', num: 6, title: 'Unordered, Ordered & Description Lists', filename: 'blog-html/lists.html' },
  { slug: 'tables', num: 7, title: 'Tables & Structured Data', filename: 'blog-html/tables.html' },
  { slug: 'forms-basics', num: 8, title: 'Forms & Basic Inputs', filename: 'blog-html/forms-basics.html' },
  { slug: 'forms-advanced', num: 9, title: 'Advanced Form Controls & Validations', filename: 'blog-html/forms-advanced.html' },
  { slug: 'semantic-html', num: 10, title: 'Semantic HTML5 Elements', filename: 'blog-html/semantic-html.html' },
  { slug: 'block-inline', num: 11, title: 'Block vs. Inline Elements', filename: 'blog-html/block-inline.html' },
  { slug: 'iframes-security', num: 12, title: 'IFrames & Sandboxed Security', filename: 'blog-html/iframes-security.html' },
  { slug: 'accessibility-seo', num: 13, title: 'HTML Accessibility (a11y) & SEO', filename: 'blog-html/accessibility-seo.html' },
  { slug: 'canvas-svg', num: 14, title: 'HTML5 Canvas & SVG Basics', filename: 'blog-html/canvas-svg.html' },
  { slug: 'best-practices', num: 15, title: 'HTML Best Practices & Validation', filename: 'blog-html/best-practices.html' }
];

function getSidebar(activeSlug) {
  let html = `\n    <div class="sidebar-heading">HTML Tutorial</div>\n`;
  html += `    <a href="/blog-html.html"${activeSlug === 'home' ? ' class="active"' : ''}>HTML HOME</a>\n`;
  
  lessons.forEach(l => {
    html += `    <a href="/${l.filename}"${activeSlug === l.slug ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
  });

  html += `\n    <div class="sidebar-heading">Reference</div>\n`;
  html += `    <a href="/blog.html">All Tutorials</a>\n\n`;

  html += `    <div class="sidebar-heading">Other Languages</div>\n`;
  html += `    <a href="/blog-python.html">Python 3</a>\n`;
  html += `    <a href="/blog-java.html">Java</a>\n`;
  html += `    <a href="/blog-javascript.html">JavaScript</a>\n`;
  html += `    <a href="/blog-c.html">C</a>\n`;
  html += `    <a href="/blog-cpp.html">C++</a>\n`;
  html += `    <a href="/blog-csharp.html">C#</a>\n`;
  html += `    <a href="/blog-go.html">Go</a>\n`;
  html += `    <a href="/blog-ruby.html">Ruby</a>\n`;
  html += `    <a href="/blog-rust.html">Rust</a>\n`;
  html += `    <a href="/blog-php.html">PHP</a>\n`;
  
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
    navFooter += `      <a href="/blog-html.html" class="nav-btn">\n`;
    navFooter += `        <span class="label">← HTML Overview</span>\n`;
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
  <meta name="description" content="Learn HTML — ${title} with clear explanations, structured elements, accessibility options, and interactive copy code snippets." />
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
<body class="lang-html">

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
  <a href="/blog-html.html" class="active">HTML</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">CSS</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">React</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Angular</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Vue.js</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Next.js</a>
  <a href="/?lang=nodejs">Node.js</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">REST API</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">GraphQL</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Spring Boot</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Django</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Flask</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Express.js</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">PostgreSQL</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">MySQL</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">MongoDB</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">SQLite</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Redis</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Cassandra</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">AWS</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Azure</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Google Cloud</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Docker</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Kubernetes</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">CI/CD</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Data Science</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Machine Learning</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Deep Learning</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">TensorFlow</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">PyTorch</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Big Data</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Git & GitHub</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Linux</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Shell Scripting</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Testing</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Agile & Scrum</a>
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
      <a href="/blog-html.html">HTML</a><span>›</span>
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
<h1 class="page-title">Welcome & Basic Syntax</h1>
<div class="page-meta">
  <span class="badge">🌐 HTML Basics</span>
  <span class="badge">Lesson 1</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>HTML (HyperText Markup Language) is the standard markup language used to build webpage structures. It defines the layout structure and holds text contents, leaving styling to CSS and interaction behaviors to JavaScript.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Tag Elements and Attributes</div>
  <p>HTML uses nested tags to wrap elements: \`&lt;tag&gt;Content&lt;/tag&gt;\`:</p>
  <ul>
    <li><strong>Opening & Closing Tags</strong>: Most elements specify an opening tag (\`&lt;p&gt;\`) and a closing tag (\`&lt;/p&gt;\`).</li>
    <li><strong>Attributes</strong>: Provide extra configuration details inside opening tags: \`&lt;a href="url"&gt;\`.</li>
    <li><strong>Self-Closing Tags</strong>: Elements containing no contents do not require closing tags (e.g. \`&lt;img&gt;\`, \`&lt;br&gt;\`, \`&lt;input&gt;\`).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Writing a Simple HTML Page</div>
  <p>Let's look at the basic template structural skeleton of a webpage:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Page Template</span>
    </div>
    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;My First Webpage&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Welcome to HTML!&lt;/h1&gt;
    &lt;p&gt;This is a simple paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
  </div>

  <p>Let's define key components:</p>
  <ul>
    <li><strong>&lt;!DOCTYPE html&gt;</strong>: Preprocessor warning telling the browser the document complies with the modern HTML5 standard.</li>
    <li><strong>&lt;html&gt;</strong>: The root element encapsulating the entire webpage.</li>
    <li><strong>&lt;head&gt;</strong>: Contains metadata configurations, page titles, and links to stylesheets, which are invisible to visitors.</li>
    <li><strong>&lt;body&gt;</strong>: Houses all visible layout content, text, headings, and images.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Copy the code block above to a local text file and save it as \`index.html\`. Open it inside your web browser to view the rendered page.
  </div>
</div>
`;

// Lesson 2
lessonContents['structure'] = `
<h1 class="page-title">Document Structure & Head Elements</h1>
<div class="page-meta">
  <span class="badge">🌐 HTML Basics</span>
  <span class="badge">Lesson 2</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>The <code>&lt;head&gt;</code> section of an HTML document contains metadata and configurations that are crucial for browser rendering, SEO indexing, and linking external resources.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Meta tags, titles, and script links</div>
  <p>Key elements inside the HTML head include:</p>
  <ul>
    <li><strong>&lt;meta charset="UTF-8"&gt;</strong>: Tells the browser to interpret characters using standard UTF-8 encoding.</li>
    <li><strong>&lt;meta name="viewport" ...&gt;</strong>: Configures mobile-responsive scale and scaling constraints on small displays.</li>
    <li><strong>&lt;link rel="stylesheet" href="style.css"&gt;</strong>: Links external CSS styling sheets to compile layout looks.</li>
    <li><strong>&lt;script src="main.js"&gt;&lt;/script&gt;</strong>: Links external JavaScript execution files.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Head Block Code</div>
  <p>Let's look at a complete head tag setup:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Head Configuration</span>
    </div>
    <pre><code>&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Premium SEO Webpage&lt;/title&gt;
    &lt;meta name="description" content="Learn core HTML structure concepts."&gt;
    &lt;link rel="stylesheet" href="/pages.css"&gt;
&lt;/head&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Add a descriptive \`&lt;meta name="description" content="..."&gt;\` tag inside your document head. Explain how search engines like Google utilize this metadata tag.
  </div>
</div>
`;

// Lesson 3
lessonContents['text-formatting'] = `
<h1 class="page-title">Headings, Paragraphs & Formatting</h1>
<div class="page-meta">
  <span class="badge">🌐 HTML Basics</span>
  <span class="badge">Lesson 3</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>HTML formats text values using semantic header tags and inline text blocks to arrange hierarchy layouts.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Headers (h1-h6), Paragraphs, and Inline formatting</div>
  <p>Text elements match standard wrappers:</p>
  <ul>
    <li><strong>Headings</strong>: Range from \`&lt;h1&gt;\` (largest, highest SEO importance) down to \`&lt;h6&gt;\` (smallest). You should generally specify only a single \`&lt;h1&gt;\` per webpage.</li>
    <li><strong>Formatting tags</strong>: \`&lt;strong&gt;\` represents bold texts, \`&lt;em&gt;\` represents italicized emphasis, and \`&lt;code&gt;\` represents inline code font text.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Formatting Elements Code</div>
  <p>Let's check the text rendering elements:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Text Elements</span>
    </div>
    <pre><code>&lt;h1&gt;Main Page Header&lt;/h1&gt;
&lt;h2&gt;Subheading Topic&lt;/h2&gt;

&lt;p&gt;This is a standard paragraph containing &lt;strong&gt;bold text&lt;/strong&gt; and &lt;em&gt;emphasized italics&lt;/em&gt;.&lt;/p&gt;

&lt;p&gt;Use the &lt;code&gt;console.log()&lt;/code&gt; command to output javascript text.&lt;/p&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a text layout containing an \`&lt;h3&gt;\` tag, a paragraph, and a blockquote element (\`&lt;blockquote&gt;\`) containing a quote from your favorite programmer.
  </div>
</div>
`;

// Lesson 4
lessonContents['links'] = `
<h1 class="page-title">Hyperlinks & Navigation</h1>
<div class="page-meta">
  <span class="badge">🌐 HTML Basics</span>
  <span class="badge">Lesson 4</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Hyperlinks connect pages. In this lesson, we will look at anchor tags (<code>&lt;a&gt;</code>), absolute/relative routes, and target parameters.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Anchor Tags, absolute/relative href, and target blank parameters</div>
  <p>Navigation parameters are defined inside anchor tags:</p>
  <ul>
    <li><strong>href Attribute</strong>: Specifies the target URL path.</li>
    <li><strong>Absolute Links</strong>: Reference full domain targets: \`href="https://google.com"\`.</li>
    <li><strong>Relative Links</strong>: Reference files relative to the current workspace root: \`href="/contact.html"\`.</li>
    <li><strong>target="_blank"</strong>: Forces the browser to open the link target in a new window or tab.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Anchor Elements Code</div>
  <p>Let's look at anchor links:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Hyperlinks</span>
    </div>
    <pre><code>&lt;!-- Absolute target opening in new tab --&gt;
&lt;a href="https://github.com" target="_blank"&gt;Visit GitHub&lt;/a&gt;

&lt;!-- Relative link target --&gt;
&lt;a href="/about.html"&gt;Learn About Us&lt;/a&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create an anchor tag linking to an email address (hint: use \`mailto:email@example.com\` inside the \`href\` attribute) and test it.
  </div>
</div>
`;

// Lesson 5
lessonContents['media'] = `
<h1 class="page-title">Images & Embedded Media</h1>
<div class="page-meta">
  <span class="badge">🌐 HTML Basics</span>
  <span class="badge">Lesson 5</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Webpages are enhanced by media. In this lesson, we will look at displaying images and embedding video and audio components.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Image alt tags accessibility and Video/Audio tags</div>
  <p>Media configurations require specific tag properties:</p>
  <ul>
    <li><strong>&lt;img&gt; alt Attribute</strong>: The \`alt\` text describes the image. It is critical for accessibility (read aloud by screen readers) and SEO indexing (helping search engines index image topics).</li>
    <li><strong>&lt;video&gt; and &lt;audio&gt; tags</strong>: Contain built-in player controls (\`controls\`, \`autoplay\`, \`loop\`).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Media Elements Code</div>
  <p>Let's check media configurations:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Media Elements</span>
    </div>
    <pre><code>&lt;!-- Image displaying with alt accessibility --&gt;
&lt;img src="/logo.png" alt="Our Compiler logo" width="100"&gt;

&lt;!-- Video player embedding --&gt;
&lt;video src="/intro.mp4" controls width="400"&gt;
    Your browser does not support video play tags.
&lt;/video&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a layout embedding an audio file player tag using \`&lt;audio src="audio.mp3" controls&gt;\` with fallback text for unsupported browsers.
  </div>
</div>
`;

// Lesson 6
lessonContents['lists'] = `
<h1 class="page-title">Unordered, Ordered & Description Lists</h1>
<div class="page-meta">
  <span class="badge">🌐 HTML Basics</span>
  <span class="badge">Lesson 6</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Lists arrange text blocks sequentially. HTML supports bulleted, numbered, and description-based list layouts.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> List tags: ul, ol, li, dl, dt, dd</div>
  <p>HTML lists fall into three main types:</p>
  <ul>
    <li><strong>Unordered List (\`&lt;ul&gt;\`)</strong>: Bulleted list layouts.</li>
    <li><strong>Ordered List (\`&lt;ol&gt;\`)</strong>: Numbered lists using sequential letters or numbers.</li>
    <li><strong>Description List (\`&lt;dl&gt;\`)</strong>: Glossary dictionary pairings mapping terms (\`&lt;dt&gt;\`) to descriptions (\`&lt;dd&gt;\`).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> List Elements Code</div>
  <p>Let's examine list formats:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Lists</span>
    </div>
    <pre><code>&lt;h3&gt;Skills required:&lt;/h3&gt;
&lt;ul&gt;
    &lt;li&gt;HTML5 Structures&lt;/li&gt;
    &lt;li&gt;CSS3 Layout Styles&lt;/li&gt;
&lt;/ul&gt;

&lt;h3&gt;Glossary:&lt;/h3&gt;
&lt;dl&gt;
    &lt;dt&gt;HTML&lt;/dt&gt;
    &lt;dd&gt;HyperText Markup Language&lt;/dd&gt;
&lt;/dl&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a nested list: an ordered list of programming languages where one item (e.g. JavaScript) contains a nested unordered list of related tools/frameworks.
  </div>
</div>
`;

// Lesson 7
lessonContents['tables'] = `
<h1 class="page-title">Tables & Structured Data</h1>
<div class="page-meta">
  <span class="badge">🌐 HTML Basics</span>
  <span class="badge">Lesson 7</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>HTML tables organize structured data into grid rows and columns using semantic headers and cell spans.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Table tags, headers, and spanning parameters</div>
  <p>Key table parameters include:</p>
  <ul>
    <li><strong>thead, tbody, tfoot</strong>: Semantic sections to divide table headers, body rows, and calculations footers.</li>
    <li><strong>colspan</strong>: Extends a table cell across multiple columns.</li>
    <li><strong>rowspan</strong>: Extends a table cell vertically across multiple rows.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Table Elements Code</div>
  <p>Let's check table grids configurations:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Tables</span>
    </div>
    <pre><code>&lt;table border="1"&gt;
    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th&gt;Product&lt;/th&gt;
            &lt;th&gt;Quantity&lt;/th&gt;
            &lt;th&gt;Price&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
        &lt;tr&gt;
            &lt;td&gt;Book&lt;/td&gt;
            &lt;td&gt;2&lt;/td&gt;
            &lt;td&gt;$10.00&lt;/td&gt;
        &lt;/tr&gt;
    &lt;/tbody&gt;
&lt;/table&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a table with a footer row that merges the first two cells using \`colspan="2"\` to display a single, centered "Total" label.
  </div>
</div>
`;

// Lesson 8
lessonContents['forms-basics'] = `
<h1 class="page-title">Forms & Basic Inputs</h1>
<div class="page-meta">
  <span class="badge">🌐 HTML Basics</span>
  <span class="badge">Lesson 8</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Forms send user-entered details to server-side scripts for processing. HTML supports form actions, HTTP methods, and diverse input types.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> form action, GET/POST methods, and input types</div>
  <p>Common form properties include:</p>
  <ul>
    <li><strong>action Attribute</strong>: Specifies the target server URL where the form data will be sent.</li>
    <li><strong>method Attribute</strong>: Specifies the HTTP request type. Use \`GET\` for searches, and \`POST\` for passwords or operations that modify data on the server.</li>
    <li><strong>input types</strong>: HTML5 supports specific input validation types (e.g. \`text\`, \`password\`, \`email\`, \`checkbox\`, \`radio\`).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Form Elements Code</div>
  <p>Let's check form layouts:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Simple Form</span>
    </div>
    <pre><code>&lt;form action="/submit-form" method="POST"&gt;
    &lt;label for="email"&gt;Email Address:&lt;/label&gt;
    &lt;input type="email" id="email" name="user_email" placeholder="email@example.com"&gt;
    
    &lt;label for="pass"&gt;Password:&lt;/label&gt;
    &lt;input type="password" id="pass" name="user_password"&gt;

    &lt;button type="submit"&gt;Login&lt;/button&gt;
&lt;/form&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a form containing radio buttons where users select their favorite programming language. Give them the same \`name\` attribute to ensure only one option can be selected at a time.
  </div>
</div>
`;

// Lesson 9
lessonContents['forms-advanced'] = `
<h1 class="page-title">Advanced Form Controls & Validations</h1>
<div class="page-meta">
  <span class="badge">🌐 HTML Basics</span>
  <span class="badge">Lesson 9</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>For more complex form inputs, HTML provides advanced elements like textarea elements, select dropdown lists, and built-in browser validation rules.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Textarea elements, select inputs, and validation properties</div>
  <p>Advanced elements include:</p>
  <ul>
    <li><strong>&lt;textarea&gt;</strong>: Allows multi-line text input (e.g. paragraphs or comment fields).</li>
    <li><strong>&lt;select&gt; and &lt;option&gt;</strong>: Creates dropdown selection lists.</li>
    <li><strong>HTML5 validations</strong>: Pre-validates inputs in the browser before submitting data to the server. Useful attributes include \`required\`, \`min\`, \`max\`, \`step\`, and regex validation using \`pattern\`.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Advanced Form Code</div>
  <p>Let's examine advanced form configurations:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Advanced Form</span>
    </div>
    <pre><code>&lt;form action="/save-profile" method="POST"&gt;
    &lt;label for="bio"&gt;Biography:&lt;/label&gt;
    &lt;textarea id="bio" name="user_bio" required&gt;&lt;/textarea&gt;

    &lt;label for="country"&gt;Country:&lt;/label&gt;
    &lt;select id="country" name="user_country"&gt;
        &lt;option value="us"&gt;United States&lt;/option&gt;
        &lt;option value="in"&gt;India&lt;/option&gt;
    &lt;/select&gt;

    &lt;button type="submit"&gt;Save&lt;/button&gt;
&lt;/form&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write an input field with type \`number\`. Add \`min="10"\` and \`max="100"\` parameters, verify the browser blocks values outside this range when attempting to submit the form.
  </div>
</div>
`;

// Lesson 10
lessonContents['semantic-html'] = `
<h1 class="page-title">Semantic HTML5 Elements</h1>
<div class="page-meta">
  <span class="badge">🌐 HTML Basics</span>
  <span class="badge">Lesson 10</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>HTML5 introduced semantic tags that clearly describe their meaning to both browsers and search engines, improving page accessibility and SEO indexing.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Semantic tags (header, nav, main, section, footer) and SEO value</div>
  <p>Before HTML5, pages relied heavily on generic \`&lt;div&gt;\` tags with classes. HTML5 introduced semantic tags to structure pages more logically:</p>
  <ul>
    <li><strong>&lt;header&gt;</strong>: Holds page header elements and branding.</li>
    <li><strong>&lt;nav&gt;</strong>: Wraps navigation link groups.</li>
    <li><strong>&lt;main&gt;</strong>: Wraps the core content specific to the webpage. You should only use one per page.</li>
    <li><strong>&lt;section&gt; & &lt;article&gt;</strong>: Groups related content or self-contained articles.</li>
    <li><strong>&lt;footer&gt;</strong>: Holds page footer metadata.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Semantic Page Structure Code</div>
  <p>Let's look at the basic structure of a semantic webpage:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Semantic Structure</span>
    </div>
    <pre><code>&lt;header&gt;
    &lt;h1&gt;Tech Portal&lt;/h1&gt;
    &lt;nav&gt;
        &lt;a href="/home"&gt;Home&lt;/a&gt; | &lt;a href="/about"&gt;About&lt;/a&gt;
    &lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
    &lt;article&gt;
        &lt;h2&gt;HTML5 Release Notes&lt;/h2&gt;
        &lt;p&gt;Semantic HTML is critical for SEO.&lt;/p&gt;
    &lt;/article&gt;
&lt;/main&gt;
&lt;footer&gt;
    &lt;p&gt;&copy; 2026 Tech Portal&lt;/p&gt;
&lt;/footer&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a semantic layout that includes an \`&lt;aside&gt;\` tag representing a sidebar of related links adjacent to a main \`&lt;article&gt;\` section.
  </div>
</div>
`;

// Lesson 11
lessonContents['block-inline'] = `
<h1 class="page-title">Block vs. Inline Elements</h1>
<div class="page-meta">
  <span class="badge">🌐 HTML Basics</span>
  <span class="badge">Lesson 11</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>HTML elements are rendered differently based on their display behaviors. In this lesson, we will cover the differences between Block-level and Inline-level elements.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Block Display vs. Inline Display</div>
  <p>Every HTML element has a default display type:</p>
  <ul>
    <li><strong>Block-Level Elements</strong>: Always start on a new line and stretch to fill the full width of the parent container (e.g. \`&lt;div&gt;\`, \`&lt;p&gt;\`, \`&lt;h1&gt;\`-\`&lt;h6&gt;\`, \`&lt;ul&gt;\`, \`&lt;li&gt;\`).</li>
    <li><strong>Inline-Level Elements</strong>: Do not start on a new line and only occupy as much width as their content requires. Block elements cannot be nested inside inline elements (e.g. \`&lt;span&gt;\`, \`&lt;a&gt;\`, \`&lt;strong&gt;\`, \`&lt;em&gt;\`, \`&lt;img&gt;\`).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Display Elements Code</div>
  <p>Let's see how block and inline elements wrap text:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Display elements</span>
    </div>
    <pre><code>&lt;!-- Block level elements stack on top of each other --&gt;
&lt;div style="background-color: lightgrey;"&gt;Div is Block 1&lt;/div&gt;
&lt;div style="background-color: lightblue;"&gt;Div is Block 2&lt;/div&gt;

&lt;!-- Inline elements sit side-by-side on the same line --&gt;
&lt;p&gt;This is a paragraph with &lt;span style="color: red;"&gt;inline span 1&lt;/span&gt; and &lt;span style="color: blue;"&gt;inline span 2&lt;/span&gt;.&lt;/p&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a text layout wrapping key terms in \`&lt;span&gt;\` tags. Explain why wrapping a \`&lt;div&gt;\` tag inside a \`&lt;span&gt;\` tag violates HTML specifications.
  </div>
</div>
`;

// Lesson 12
lessonContents['iframes-security'] = `
<h1 class="page-title">IFrames & Sandboxed Security</h1>
<div class="page-meta">
  <span class="badge">🌐 HTML Basics</span>
  <span class="badge">Lesson 12</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>IFrames embed external web pages inside the current document. To protect against malicious external scripts, you must configure security attributes carefully.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> iframe elements and the sandbox attribute</div>
  <p>IFrames serve as windows to external URLs: \`&lt;iframe src="url"&gt;&lt;/iframe&gt;\`.</p>
  <p><strong>Sandbox Security:</strong> Embedding external content poses security risks. Attackers can execute malicious scripts or redirect pages. To prevent this, always include the **\`sandbox\`** attribute to restrict execution rights, selectively allowing features like form submissions (\`allow-forms\`) or scripts (\`allow-scripts\`).</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> IFrame Code</div>
  <p>Let's see an iframe embed setup:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Secure IFrame</span>
    </div>
    <pre><code>&lt;!-- Secure iframe embedding external map with restrictions --&gt;
&lt;iframe 
    src="https://example.com/map" 
    width="600" 
    height="400" 
    sandbox="allow-scripts allow-same-origin"
    title="Interactive map embed"&gt;
    Your browser does not support IFrames.
&lt;/iframe&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Embed an external YouTube video iframe using the \`sandbox\` attribute, and explain which configuration options are required to let the video play.
  </div>
</div>
`;

// Lesson 13
lessonContents['accessibility-seo'] = `
<h1 class="page-title">HTML Accessibility (a11y) & SEO</h1>
<div class="page-meta">
  <span class="badge">🌐 HTML Basics</span>
  <span class="badge">Lesson 13</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Web accessibility (a11y) and Search Engine Optimization (SEO) ensure that your site is usable by everyone and easily indexable by search engines.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> ARIA roles, semantic markup, and head SEO optimization</div>
  <p>HTML accessibility and SEO are closely linked:</p>
  <ul>
    <li><strong>ARIA (Accessible Rich Internet Applications) Attributes</strong>: Attributes like \`aria-label\` and \`role\` describe elements that standard tags cannot, helping screen readers read layouts correctly.</li>
    <li><strong>SEO Optimization</strong>: Using correct header tags (\`&lt;h1&gt;\`-\`&lt;h6&gt;\`), descriptive link text, and meta description headers helps search engine crawlers rank your page content correctly.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Semantic SEO Elements Code</div>
  <p>Let's check clean, accessible semantic structures:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Accessible Setup</span>
    </div>
    <pre><code>&lt;!-- Semantic navigation with ARIA attributes --&gt;
&lt;nav aria-label="Main Menu"&gt;
    &lt;ul&gt;
        &lt;li&gt;&lt;a href="/home"&gt;Home&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="/docs"&gt;Documentation&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/nav&gt;

&lt;!-- Descriptive buttons for screen readers --&gt;
&lt;button aria-label="Close notification box" onclick="closeBox()"&gt;X&lt;/button&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write an image element that uses an empty alt attribute (\`alt=""\`) to indicate it is decorative and should be skipped by screen readers.
  </div>
</div>
`;

// Lesson 14
lessonContents['canvas-svg'] = `
<h1 class="page-title">HTML5 Canvas & SVG Basics</h1>
<div class="page-meta">
  <span class="badge">🌐 HTML Basics</span>
  <span class="badge">Lesson 14</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>HTML5 provides two main ways to draw shapes and graphics in the browser: the raster-based Canvas element and vector-based SVG elements.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Canvas (Raster) vs. SVG (Vector)</div>
  <p>Canvas and SVG are suited for different use cases:</p>
  <ul>
    <li><strong>&lt;canvas&gt;</strong>: A raster-based grid. Drawn dynamically using JavaScript, making it excellent for rendering games, charts, or heavy pixel manipulations.</li>
    <li><strong>&lt;svg&gt;</strong>: A XML vector format. Stays sharp at any scale, behaves like standard DOM nodes, and can be styled easily with CSS.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Graphic Elements Code</div>
  <p>Let's check inline SVG vector graphics:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Vector Shape (SVG)</span>
    </div>
    <pre><code>&lt;!-- Clean inline vector graphic shape --&gt;
&lt;svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"&gt;
    &lt;circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /&gt;
&lt;/svg&gt;

&lt;!-- Canvas element --&gt;
&lt;canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"&gt;&lt;/canvas&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write an inline SVG drawing a rectangle shape using the \`&lt;rect&gt;\` element. Specify width, height, fill colors, and test its display in your browser.
  </div>
</div>
`;

// Lesson 15
lessonContents['best-practices'] = `
<h1 class="page-title">HTML Best Practices & Validation</h1>
<div class="page-meta">
  <span class="badge">🌐 HTML Basics</span>
  <span class="badge">Lesson 15</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Writing clean, standards-compliant HTML code ensures cross-browser compatibility and improves website loading performance.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Tag Closures, self-closing structures, and W3C validation checks</div>
  <p>Key best practices include:</p>
  <ul>
    <li><strong>Always close tags</strong>: Ensure all tags are nested and closed correctly: \`&lt;div&gt;&lt;p&gt;&lt;/p&gt;&lt;/div&gt;\` (no overlap).</li>
    <li><strong>Lowercase tag names</strong>: Always write tags in lowercase: \`&lt;div&gt;\` rather than \`&lt;DIV&gt;\`.</li>
    <li><strong>W3C Validation</strong>: Run your code through the official W3C Markup Validation Service to identify hidden markup errors.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Best Practices Code</div>
  <p>Let's check a clean, compliant HTML file template:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Valid Document</span>
    </div>
    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Standards Compliant Template&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Main Header&lt;/h1&gt;
    &lt;p&gt;Clean nesting structures are essential.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Copy the template above. Pass it to the online W3C validator to verify it passes validation check requirements successfully.
  </div>
</div>
`;

// Build lessons
console.log('Starting HTML lesson generation...');

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

// Generate main index page: blog-html.html
const indexContent = `
<h1 class="page-title">HTML Programming Tutorial</h1>
<div class="page-meta">
  <span class="badge">🌐 HTML Basics</span>
  <span class="badge">🟢 Beginner Friendly</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>HTML (HyperText Markup Language) forms the core foundation of every webpage. By structuring content semantic frameworks, HTML enables search engines and web browsers to index layouts correctly. In this comprehensive guide, you will master HTML tags syntax, head metadata elements, text inline formatting, relative/absolute hyperlink navigations, alt-tag media embeddings, lists formats, structured tables data, form POST actions validation, semantic HTML5, block vs inline display bounds, iframe sandboxed security, ARIA accessibility (a11y), SVG graphic paths, and standards validation rules.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">▶</span> Course Curriculum</div>
  <p>Choose a topic from the left sidebar or click a lesson below to start learning HTML:</p>
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
  'HTML Programming Tutorial & Reference Guide',
  indexContent,
  null,
  null,
  lessons[0].filename,
  lessons[0].title
);

fs.writeFileSync(path.join(publicDir, 'blog-html.html'), outputIndexHtml, 'utf8');
console.log('Generated: blog-html.html');
console.log('🎉 Successfully generated all 15 HTML tutorial files inside blog-html/ folder!');
