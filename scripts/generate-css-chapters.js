const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/blog-css');
const ACCENT = '#3b82f6';
const TOTAL_CHAPTERS = 49;

const phases = [
  { num: 1, icon: '🚀', title: 'CSS Introduction', count: '2 Ch', lessons: [
    { n: 1, file: '01-css-ante-enti-what-is-css.html', label: '1. CSS Ante Enti?' },
    { n: 2, file: '02-css-adding-css-to-html.html', label: '2. Adding CSS to HTML' },
  ]},
  { num: 2, icon: '🎯', title: 'Selectors', count: '4 Ch', lessons: [
    { n: 3, file: '03-css-basic-selectors.html', label: '3. Basic Selectors' },
    { n: 4, file: '04-css-combinators.html', label: '4. Combinators' },
    { n: 5, file: '05-css-pseudo-classes.html', label: '5. Pseudo-Classes' },
    { n: 6, file: '06-css-pseudo-elements.html', label: '6. Pseudo-Elements' },
  ]},
  { num: 3, icon: '⚖️', title: 'Cascade & Specificity', count: '3 Ch', lessons: [
    { n: 7, file: '07-css-cascade.html', label: '7. Cascade' },
    { n: 8, file: '08-css-specificity.html', label: '8. Specificity' },
    { n: 9, file: '09-css-cascade-layers.html', label: '9. Cascade Layers' },
  ]},
  { num: 4, icon: '🎨', title: 'Values, Units & Colors', count: '3 Ch', lessons: [
    { n: 10, file: '10-css-values-and-units.html', label: '10. Values & Units' },
    { n: 11, file: '11-css-colors.html', label: '11. Colors' },
    { n: 12, file: '12-css-functions.html', label: '12. Functions' },
  ]},
  { num: 5, icon: '📦', title: 'Box Model', count: '3 Ch', lessons: [
    { n: 13, file: '13-css-box-model-basics.html', label: '13. Box Model Basics' },
    { n: 14, file: '14-css-width-height-overflow.html', label: '14. Width, Height & Overflow' },
    { n: 15, file: '15-css-borders-and-shadows.html', label: '15. Borders & Shadows' },
  ]},
  { num: 6, icon: '✍️', title: 'Typography', count: '3 Ch', lessons: [
    { n: 16, file: '16-css-fonts.html', label: '16. Fonts' },
    { n: 17, file: '17-css-text-styling.html', label: '17. Text Styling' },
    { n: 18, file: '18-css-web-fonts-and-icons.html', label: '18. Web Fonts & Icons' },
  ]},
  { num: 7, icon: '📐', title: 'Display & Positioning', count: '2 Ch', lessons: [
    { n: 19, file: '19-css-display.html', label: '19. Display' },
    { n: 20, file: '20-css-positioning.html', label: '20. Positioning' },
  ]},
  { num: 8, icon: '↔️', title: 'Flexbox', count: '3 Ch', lessons: [
    { n: 21, file: '21-css-flexbox-basics.html', label: '21. Flexbox Basics' },
    { n: 22, file: '22-css-flex-items.html', label: '22. Flex Items' },
    { n: 23, file: '23-css-flexbox-projects.html', label: '23. Flexbox Projects' },
  ]},
  { num: 9, icon: '⊞', title: 'CSS Grid', count: '3 Ch', lessons: [
    { n: 24, file: '24-css-grid-basics.html', label: '24. Grid Basics' },
    { n: 25, file: '25-css-grid-placement.html', label: '25. Grid Placement' },
    { n: 26, file: '26-css-grid-projects.html', label: '26. Grid Projects' },
  ]},
  { num: 10, icon: '📱', title: 'Responsive Design', count: '3 Ch', lessons: [
    { n: 27, file: '27-css-responsive-design.html', label: '27. Responsive CSS' },
    { n: 28, file: '28-css-media-queries.html', label: '28. Media Queries' },
    { n: 29, file: '29-css-container-queries.html', label: '29. Container Queries' },
  ]},
  { num: 11, icon: '🖼️', title: 'Backgrounds & Effects', count: '3 Ch', lessons: [
    { n: 30, file: '30-css-backgrounds.html', label: '30. Backgrounds' },
    { n: 31, file: '31-css-gradients.html', label: '31. Gradients' },
    { n: 32, file: '32-css-filters-and-blend-modes.html', label: '32. Filters & Blend Modes' },
  ]},
  { num: 12, icon: '✨', title: 'Transforms & Animations', count: '3 Ch', lessons: [
    { n: 33, file: '33-css-transforms.html', label: '33. Transforms' },
    { n: 34, file: '34-css-transitions.html', label: '34. Transitions' },
    { n: 35, file: '35-css-animations.html', label: '35. Animations' },
  ]},
  { num: 13, icon: '🌓', title: 'Custom Properties & Themes', count: '2 Ch', lessons: [
    { n: 36, file: '36-css-variables.html', label: '36. CSS Variables' },
    { n: 37, file: '37-css-themes.html', label: '37. Themes' },
  ]},
  { num: 14, icon: '📋', title: 'Forms & UI Components', count: '2 Ch', lessons: [
    { n: 38, file: '38-css-styling-forms.html', label: '38. Styling Forms' },
    { n: 39, file: '39-css-ui-components.html', label: '39. UI Components' },
  ]},
  { num: 15, icon: '🏗️', title: 'CSS Architecture', count: '2 Ch', lessons: [
    { n: 40, file: '40-css-naming-and-organization.html', label: '40. Naming & Organization' },
    { n: 41, file: '41-css-methodologies.html', label: '41. Methodologies' },
  ]},
  { num: 16, icon: '⚡', title: 'Modern CSS', count: '4 Ch', lessons: [
    { n: 42, file: '42-css-modern-selectors.html', label: '42. Modern Selectors' },
    { n: 43, file: '43-css-modern-layout.html', label: '43. Modern Layout' },
    { n: 44, file: '44-css-nesting-and-scope.html', label: '44. Nesting & Scope' },
    { n: 45, file: '45-css-feature-queries.html', label: '45. Feature Queries' },
  ]},
  { num: 17, icon: '♿', title: 'Accessibility & Performance', count: '2 Ch', lessons: [
    { n: 46, file: '46-css-accessibility.html', label: '46. Accessibility' },
    { n: 47, file: '47-css-performance.html', label: '47. Performance' },
  ]},
  { num: 18, icon: '🔧', title: 'Debugging & Projects', count: '2 Ch', lessons: [
    { n: 48, file: '48-css-debugging.html', label: '48. Debugging' },
    { n: 49, file: '49-css-projects.html', label: '49. CSS Projects' },
  ]},
];

const chapters = [
  {
    num: 1, file: '01-css-ante-enti-what-is-css.html',
    title: 'CSS Ante Enti? (What is CSS)',
    metaTitle: 'CSS Ante Enti? — What is CSS, Syntax & Web Trio | CSS Masterclass',
    desc: 'Learn what CSS is, full form, HTML vs CSS vs JavaScript, CSS syntax, rules, properties, values, comments, browser default styles, and modern CSS versions.',
    phase: 'Phase 01: CSS Introduction', phaseNum: 1, total: TOTAL_CHAPTERS,
    topics: 'CSS Definition · Full Form · HTML vs CSS vs JS · Syntax · Rules · Properties · Values · Comments · Browser Defaults · Modern CSS',
    prev: null, next: { href: '02-css-adding-css-to-html.html', title: '2. Adding CSS to HTML' },
    sections: `
<div class="section-title"><span class="num">1</span>CSS Ante Enti? — Definition &amp; Full Form</div>
<div class="section-body">
  <p><strong>CSS ante enti?</strong> CSS is a <strong>stylesheet language</strong> used to control the appearance, layout, and presentation of HTML documents. HTML structure create chestundi — headings, paragraphs, forms, links. CSS colors, spacing, sizing, alignment, typography, and responsive design handle chestundi.</p>
  <p><strong>CSS full form:</strong> <strong>Cascading Style Sheets</strong>. "Cascading" ante multiple CSS rules overlap ayyina, browser priority rules follow avuthu final style decide chestundi (specificity, importance, source order).</p>
  <table class="tbl spec-table">
    <thead><tr><th>Technology</th><th>Role</th><th>Analogy</th></tr></thead>
    <tbody>
      <tr><td><strong>HTML</strong></td><td>Structure — elements, content, semantics</td><td>Skeleton (bones)</td></tr>
      <tr><td><strong>CSS</strong></td><td>Design &amp; Layout — colors, spacing, fonts, responsive UI</td><td>Skin, clothes, makeup</td></tr>
      <tr><td><strong>JavaScript</strong></td><td>Interaction &amp; Behavior — clicks, API calls, dynamic updates</td><td>Muscles &amp; brain</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>CSS Enduku Use Chestaru? — Role in Webpages</div>
<div class="section-body">
  <p>Browser HTML parse chesi default styles apply chestundi (black text, blue links, Times font). Professional websites ki custom branding, consistent spacing, grid layouts, dark mode, animations — anni CSS tho achieve chestam.</p>
  <ul>
    <li><strong>Visual branding:</strong> Colors, fonts, logos, consistent design system</li>
    <li><strong>Layout control:</strong> Flexbox, Grid, positioning for complex UIs</li>
    <li><strong>Responsive design:</strong> Mobile, tablet, desktop breakpoints</li>
    <li><strong>Accessibility:</strong> Focus states, contrast, readable typography</li>
    <li><strong>Performance:</strong> External CSS cache avuthundi — faster repeat visits</li>
  </ul>
</div>

<div class="section-title"><span class="num">3</span>CSS Syntax — Rules, Properties &amp; Values</div>
<div class="section-body">
  <p>CSS rule structure simple ga idi:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Basic Syntax</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>selector {
  property: value;
  another-property: value;
}</code></pre>
  </div>
  <ul>
    <li><strong>Selector:</strong> Which HTML elements match avvali (e.g. <code>p</code>, <code>.card</code>, <code>#header</code>)</li>
    <li><strong>Property:</strong> What style change cheyali (e.g. <code>color</code>, <code>margin</code>, <code>display</code>)</li>
    <li><strong>Value:</strong> Property ki exact setting (e.g. <code>#333</code>, <code>20px</code>, <code>flex</code>)</li>
    <li><strong>Declaration block:</strong> Curly braces <code>{ }</code> lo unna property-value pairs</li>
  </ul>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Example Rule</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>h1 {
  color: #1e40af;
  font-size: 2rem;
  margin-bottom: 16px;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>CSS Comments &amp; Browser Default Styles</div>
<div class="section-body">
  <p>CSS comments browser ignore chestundi — documentation and organization ki use chestam:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS Comments</span></div>
    <pre><code>/* This is a CSS comment — browser ignores it */
/* Multi-line comments work too */

body {
  margin: 0; /* Reset default browser margin */
}</code></pre>
  </div>
  <p><strong>Browser default styles (User Agent Stylesheet):</strong> Every browser ships with built-in CSS. <code>&lt;h1&gt;</code> bold and large, <code>&lt;a&gt;</code> blue and underlined, <code>&lt;body&gt;</code> has default margin. Developers often use a <strong>CSS reset</strong> or <strong>normalize.css</strong> for consistent cross-browser baseline.</p>
</div>

<div class="section-title"><span class="num">5</span>CSS Versions &amp; Modern CSS</div>
<div class="section-body">
  <p>CSS continuously evolve avuthundi. Key milestones:</p>
  <ul>
    <li><strong>CSS1 (1996):</strong> Basic fonts, colors, margins</li>
    <li><strong>CSS2 / CSS2.1:</strong> Positioning, floats, media types</li>
    <li><strong>CSS3 (modular):</strong> Selectors Level 3/4, Flexbox, Grid, Transitions, Animations, Custom Properties</li>
    <li><strong>Modern CSS (2020+):</strong> <code>:has()</code>, Container Queries, <code>@layer</code>, <code>color-mix()</code>, Subgrid</li>
  </ul>
  <div class="callout">
    <div class="callout-title">💡 Pro Tip: Always Write Valid CSS</div>
    <p>Every declaration needs a colon and semicolon. Missing semicolon valla next rules break avvochu. Browser DevTools (F12 → Elements → Styles) tho live debugging cheyandi.</p>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions</div>
<div class="section-body">
  <div class="faq-card"><h4>Q: CSS programming language aa?</h4><p>No. CSS is a <strong>declarative stylesheet language</strong>. Logic loops or variables (pre-CSS custom properties) levu — you declare how elements should look, browser apply chestundi.</p></div>
  <div class="faq-card"><h4>Q: HTML lo CSS lekunda page render avutunda?</h4><p>Yes! HTML alone render avuthundi with browser default styles. CSS optional kaadu professional design ki — mandatory for real-world websites.</p></div>
</div>`
  },
  {
    num: 2, file: '02-css-adding-css-to-html.html',
    title: 'Adding CSS to HTML',
    metaTitle: 'Adding CSS to HTML — Inline, Internal & External Stylesheets | CSS Tutorial',
    desc: 'Learn inline CSS, internal CSS, external CSS, link element, multiple stylesheets, @import, media attribute, CSS loading order, and common linking mistakes.',
    phase: 'Phase 01: CSS Introduction', phaseNum: 1, total: TOTAL_CHAPTERS,
    topics: 'Inline CSS · Internal CSS · External CSS · link element · Multiple Stylesheets · @import · media · Loading Order · Common Mistakes',
    prev: { href: '01-css-ante-enti-what-is-css.html', title: '1. CSS Ante Enti?' },
    next: { href: '03-css-basic-selectors.html', title: '3. Basic Selectors' },
    sections: `
<div class="section-title"><span class="num">1</span>Three Ways to Add CSS</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Method</th><th>Syntax</th><th>Best For</th></tr></thead>
    <tbody>
      <tr><td><strong>Inline CSS</strong></td><td><code>style="..."</code> attribute on element</td><td>Quick one-off tests (avoid in production)</td></tr>
      <tr><td><strong>Internal CSS</strong></td><td><code>&lt;style&gt;</code> in <code>&lt;head&gt;</code></td><td>Single-page demos, email templates</td></tr>
      <tr><td><strong>External CSS</strong></td><td><code>&lt;link rel="stylesheet"&gt;</code></td><td>Production websites (recommended)</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Inline CSS</div>
<div class="section-body">
  <p>HTML element meedha direct ga <code>style</code> attribute add chestam:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">HTML — Inline CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>&lt;p style="color: red; font-size: 18px;"&gt;Inline styled paragraph&lt;/p&gt;</code></pre>
  </div>
  <p><strong>Drawbacks:</strong> Reuse cheyadam kashtam, specificity highest (override cheyadam hard), HTML and CSS mix avuthundi — maintainability poor.</p>
</div>

<div class="section-title"><span class="num">3</span>Internal CSS (&lt;style&gt; tag)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">HTML — Internal CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;Internal CSS Demo&lt;/title&gt;
  &lt;style&gt;
    body { background-color: #f5f5f5; font-family: sans-serif; }
    h1 { color: #2563eb; }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Hello CSS&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>External CSS — &lt;link&gt; Element (Recommended)</div>
<div class="section-body">
  <p>Production lo separate <code>.css</code> file create chesi HTML lo link chestam. Browser cache chesi performance improve avuthundi.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">HTML — External Stylesheet Link</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>&lt;link rel="stylesheet" href="styles.css"&gt;</code></pre>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — styles.css</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>body {
  background-color: #f5f5f5;
  font-family: 'Inter', sans-serif;
  margin: 0;
  line-height: 1.6;
}</code></pre>
  </div>
  <p><strong>CSS file structure best practice:</strong></p>
  <pre class="diagram-box">project/
├── index.html
├── css/
│   ├── main.css      ← primary styles
│   ├── components.css
│   └── utilities.css
└── assets/</pre>
</div>

<div class="section-title"><span class="num">5</span>Multiple Stylesheets, @import &amp; media Attribute</div>
<div class="section-body">
  <p>Multiple CSS files link cheyochu — order matters (later rules override earlier ones if specificity same):</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">HTML — Multiple Stylesheets</span></div>
    <pre><code>&lt;link rel="stylesheet" href="reset.css"&gt;
&lt;link rel="stylesheet" href="layout.css"&gt;
&lt;link rel="stylesheet" href="theme.css"&gt;</code></pre>
  </div>
  <p><strong>@import</strong> (CSS file lo inkoka CSS import):</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — @import</span></div>
    <pre><code>@import url('typography.css');
@import url('components.css');</code></pre>
  </div>
  <p><strong>media attribute</strong> — conditional loading (print styles, dark mode, responsive):</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">HTML — media attribute</span></div>
    <pre><code>&lt;link rel="stylesheet" href="print.css" media="print"&gt;
&lt;link rel="stylesheet" href="mobile.css" media="(max-width: 768px)"&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span>CSS Loading Order &amp; Common Mistakes</div>
<div class="section-body">
  <p><strong>Loading order priority:</strong> Browser stylesheet → User stylesheet → Author stylesheet (external + internal + inline, by specificity and order).</p>
  <div class="callout">
    <div class="callout-title">⚠️ Common Linking Mistakes</div>
    <ul style="margin:8px 0 0 18px;line-height:1.7;">
      <li>Wrong file path in <code>href</code> — styles load avvavu</li>
      <li><code>rel="stylesheet"</code> missing — browser CSS ga treat cheyadu</li>
      <li><code>&lt;link&gt;</code> ni <code>&lt;body&gt;</code> lo pettadam — render blocking, FOUC</li>
      <li>Same selector multiple files lo — confusion; use consistent architecture</li>
    </ul>
  </div>
</div>`
  },
  {
    num: 3, file: '03-css-basic-selectors.html',
    title: 'Basic Selectors',
    metaTitle: 'CSS Basic Selectors — Universal, Element, Class, ID & Attribute | CSS Tutorial',
    desc: 'Master CSS universal selector, element selector, class selector, ID selector, grouping selectors, attribute selectors, case sensitivity, and naming conventions.',
    phase: 'Phase 02: Selectors', phaseNum: 2, total: TOTAL_CHAPTERS,
    topics: 'Universal · Element · Class · ID · Grouping · Attribute · Case Sensitivity · Naming · Reusable Classes · Avoid Excessive IDs',
    prev: { href: '02-css-adding-css-to-html.html', title: '2. Adding CSS to HTML' },
    next: { href: '04-css-combinators.html', title: '4. Combinators' },
    sections: `
<div class="section-title"><span class="num">1</span>What Are CSS Selectors?</div>
<div class="section-body">
  <p>CSS selectors HTML element patterns ni match chesi styles apply chestayi. Correct selector choose cheyadam — maintainable, scalable CSS foundation.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — All Basic Selectors</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>* { box-sizing: border-box; }

p { color: #333; }

.card { padding: 20px; }

#main-title { font-size: 2rem; }

a[href^="https"] { color: #2563eb; }

h1, h2, h3 { font-family: 'Sora', sans-serif; }</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Universal Selector (*)</div>
<div class="section-body">
  <p><code>*</code> — page lo <strong>every element</strong> match avuthundi. CSS resets and global box-sizing ki common:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Element (Type) Selector</div>
<div class="section-body">
  <p>Tag name tho match — <code>p</code>, <code>h1</code>, <code>button</code>, <code>div</code>:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>p { color: #333; line-height: 1.7; }
button { cursor: pointer; border: none; }</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Class Selector (.) — Reusable Styles</div>
<div class="section-body">
  <p>Class selector most common and reusable. HTML lo <code>class="card"</code>, CSS lo <code>.card</code>:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS + HTML</span></div>
    <pre><code>.card {
  padding: 20px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}</code></pre>
  </div>
  <p><strong>Naming conventions:</strong> kebab-case (<code>.nav-link</code>), BEM (<code>.card__title--active</code>), semantic names (<code>.btn-primary</code> not <code>.blue-box</code>).</p>
</div>

<div class="section-title"><span class="num">5</span>ID Selector (#) — Use Sparingly</div>
<div class="section-body">
  <p>ID unique ga undali page lo okate — high specificity valla override cheyadam kashtam:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>#main-title {
  font-size: 2rem;
  color: #1e293b;
}</code></pre>
  </div>
  <p><strong>Best practice:</strong> Styling ki classes prefer cheyandi. IDs JavaScript hooks and anchor links ki reserve cheyandi. Excessive IDs avoid cheyandi.</p>
</div>

<div class="section-title"><span class="num">6</span>Grouping &amp; Attribute Selectors</div>
<div class="section-body">
  <p><strong>Grouping</strong> — same styles multiple selectors ki:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>h1, h2, h3 {
  font-weight: 700;
  color: #0f172a;
}</code></pre>
  </div>
  <p><strong>Attribute selectors:</strong></p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>input[type="email"] { border-color: #3b82f6; }
a[href^="https"] { font-weight: 600; }
img[alt=""] { outline: 2px dashed red; }</code></pre>
  </div>
  <p><strong>Case sensitivity:</strong> HTML class/ID names case-sensitive in quirks mode but standard mode lo case-sensitive. Always consistent casing use cheyandi.</p>
</div>`
  },
  {
    num: 4, file: '04-css-combinators.html',
    title: 'Combinators',
    metaTitle: 'CSS Combinators — Descendant, Child, Sibling Selectors | CSS Tutorial',
    desc: 'Learn CSS descendant combinator, child combinator, adjacent sibling, general sibling, combining selectors, readability, and avoiding overly complex selectors.',
    phase: 'Phase 02: Selectors', phaseNum: 2, total: TOTAL_CHAPTERS,
    topics: 'Descendant · Child · Adjacent Sibling · General Sibling · Combining · Readability · Component-Scoped · Avoid Complex Selectors',
    prev: { href: '03-css-basic-selectors.html', title: '3. Basic Selectors' },
    next: { href: '05-css-pseudo-classes.html', title: '5. Pseudo-Classes' },
    sections: `
<div class="section-title"><span class="num">1</span>CSS Combinators Overview</div>
<div class="section-body">
  <p>Combinators two selectors madhya relationship define chestayi — parent-child, sibling connections based ga styles target cheyadaniki.</p>
  <table class="tbl spec-table">
    <thead><tr><th>Combinator</th><th>Symbol</th><th>Meaning</th></tr></thead>
    <tbody>
      <tr><td>Descendant</td><td>space</td><td>Any nested level lo match</td></tr>
      <tr><td>Child</td><td><code>&gt;</code></td><td>Direct child only</td></tr>
      <tr><td>Adjacent sibling</td><td><code>+</code></td><td>Immediately next sibling</td></tr>
      <tr><td>General sibling</td><td><code>~</code></td><td>All following siblings</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Descendant &amp; Child Combinators</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Combinators</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>/* Descendant — any p inside .card at any depth */
.card p {
  color: #555;
}

/* Child — only direct h2 children of .card */
.card > h2 {
  margin-bottom: 10px;
  font-size: 1.25rem;
}</code></pre>
  </div>
  <p><strong>Component-scoped selectors:</strong> <code>.card > h2</code> card component lo matrame heading style apply chestundi — global <code>h2</code> ni affect cheyadu.</p>
</div>

<div class="section-title"><span class="num">3</span>Sibling Combinators</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>/* Adjacent sibling — p immediately after h2 */
h2 + p {
  margin-top: 0;
  font-size: 1.1rem;
}

/* General sibling — all p siblings after h2 */
h2 ~ p {
  color: #64748b;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Combining Selectors &amp; Readability</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Combined</span></div>
    <pre><code>nav.main-nav > ul > li.active > a {
  color: #3b82f6;
  font-weight: 700;
}</code></pre>
  </div>
  <div class="callout">
    <div class="callout-title">⚠️ Avoid Overly Complex Selectors</div>
    <p>Long chained selectors specificity ekkuva, maintenance kashtam. Instead use a class: <code>.nav-link--active { ... }</code>. Selector readability and reusability always prioritize cheyandi.</p>
  </div>
</div>`
  },
  {
    num: 5, file: '05-css-pseudo-classes.html',
    title: 'Pseudo-Classes',
    metaTitle: 'CSS Pseudo-Classes — :hover, :focus, :nth-child, :has() | CSS Tutorial',
    desc: 'Master CSS pseudo-classes: hover, active, focus, focus-visible, visited, checked, disabled, nth-child, not, is, where, and has selectors.',
    phase: 'Phase 02: Selectors', phaseNum: 2, total: TOTAL_CHAPTERS,
    topics: ':hover · :active · :focus · :focus-visible · :visited · :checked · :disabled · :nth-child() · :not() · :is() · :where() · :has()',
    prev: { href: '04-css-combinators.html', title: '4. Combinators' },
    next: { href: '06-css-pseudo-elements.html', title: '6. Pseudo-Elements' },
    sections: `
<div class="section-title"><span class="num">1</span>What Are Pseudo-Classes?</div>
<div class="section-body">
  <p>Pseudo-classes element state or position based ga style apply chestayi — hover, focus, nth child, etc. Syntax: single colon <code>:</code> prefix.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Common Pseudo-Classes</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>button:hover {
  background-color: #2563eb;
}

input:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}

li:nth-child(even) {
  background: #f3f4f6;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Interactive States — :hover, :active, :focus</div>
<div class="section-body">
  <ul>
    <li><code>:hover</code> — mouse pointer element meedha unnapudu</li>
    <li><code>:active</code> — click/press chesinapudu (momentary)</li>
    <li><code>:focus</code> — keyboard or click tho element focused</li>
    <li><code>:focus-visible</code> — keyboard navigation focus matrame (accessibility best practice)</li>
  </ul>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>a:visited { color: #7c3aed; }
input:disabled { opacity: 0.5; cursor: not-allowed; }
input:enabled { border-color: #cbd5e1; }
input:checked + label { font-weight: 700; }</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Structural Pseudo-Classes — :first-child, :nth-child()</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>li:first-child { font-weight: 700; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background: #f8fafc; }
li:nth-child(3n) { color: #3b82f6; }</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Modern Functional Pseudo-Classes — :not(), :is(), :where(), :has()</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Modern Selectors</span></div>
    <pre><code>/* Exclude disabled buttons */
button:not(:disabled) { cursor: pointer; }

/* Group selectors with zero specificity boost (where) */
:where(h1, h2, h3) { line-height: 1.2; }

/* Parent selector — card with image inside */
.card:has(img) { padding-top: 0; }

/* Form invalid state on parent */
.form-group:has(input:invalid) { border-color: red; }</code></pre>
  </div>
  <p><code>:has()</code> — "parent selector" revolution! Previously impossible parent styling ippudu possible.</p>
</div>`
  },
  {
    num: 6, file: '06-css-pseudo-elements.html',
    title: 'Pseudo-Elements',
    metaTitle: 'CSS Pseudo-Elements — ::before, ::after, ::selection | CSS Tutorial',
    desc: 'Learn CSS pseudo-elements: before, after, first-letter, first-line, selection, placeholder, decorative content, icons, accessibility, and common mistakes.',
    phase: 'Phase 02: Selectors', phaseNum: 2, total: TOTAL_CHAPTERS,
    topics: '::before · ::after · ::first-letter · ::first-line · ::selection · ::placeholder · Decorative Content · Icons · Accessibility · Common Mistakes',
    prev: { href: '05-css-pseudo-classes.html', title: '5. Pseudo-Classes' },
    next: { href: '07-css-cascade.html', title: '7. Cascade' },
    sections: `
<div class="section-title"><span class="num">1</span>Pseudo-Classes vs Pseudo-Elements</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Type</th><th>Syntax</th><th>Purpose</th></tr></thead>
    <tbody>
      <tr><td>Pseudo-class</td><td><code>:hover</code></td><td>Element state (existing element)</td></tr>
      <tr><td>Pseudo-element</td><td><code>::before</code></td><td>Virtual sub-part of element create/style</td></tr>
    </tbody>
  </table>
  <p>CSS selectors element patterns ni match chesi styles apply chestayi; specificity and combinators selector behavior ni decide chestayi. Pseudo-elements decorative content and typography effects ki powerful.</p>
</div>

<div class="section-title"><span class="num">2</span>::before &amp; ::after — Decorative Content</div>
<div class="section-body">
  <p>Virtual elements create chestayi — icons, badges, decorative lines. <code>content</code> property mandatory:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.quote::before {
  content: "\\201C";
  font-size: 3rem;
  color: #3b82f6;
  line-height: 0;
}

.external-link::after {
  content: " ↗";
  font-size: 0.85em;
}</code></pre>
  </div>
  <p><strong>Icons with pseudo-elements:</strong> Unicode symbols or icon fonts use cheyochu. SVG background-image kuda common pattern.</p>
</div>

<div class="section-title"><span class="num">3</span>::first-letter, ::first-line, ::selection, ::placeholder</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>p::first-letter {
  font-size: 3em;
  font-weight: 700;
  float: left;
  margin-right: 8px;
  color: #2563eb;
}

p::first-line {
  font-variant: small-caps;
}

::selection {
  background: #bfdbfe;
  color: #1e3a8a;
}

input::placeholder {
  color: #94a3b8;
  font-style: italic;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Accessibility &amp; Common Mistakes</div>
<div class="section-body">
  <div class="callout">
    <div class="callout-title">♿ Accessibility Considerations</div>
    <ul style="margin:8px 0 0 18px;line-height:1.7;">
      <li><code>::before/::after</code> content screen readers read cheyochu — decorative ayite <code>aria-hidden</code> on parent consider cheyandi</li>
      <li>Important information pseudo-elements lo matrame pettakandi — real HTML lo undali</li>
      <li><code>::selection</code> contrast sufficient ga maintain cheyandi</li>
    </ul>
  </div>
  <div class="callout">
    <div class="callout-title">⚠️ Common Pseudo-Element Mistakes</div>
    <ul style="margin:8px 0 0 18px;line-height:1.7;">
      <li><code>content</code> property marchakapovadam — pseudo-element render avvadu</li>
      <li>Single colon <code>:before</code> (old CSS2 syntax) — modern lo <code>::before</code> use cheyandi</li>
      <li>Replacing semantic HTML with <code>::before</code> content for labels/icons</li>
    </ul>
  </div>
</div>`
  },
  {
    num: 7, file: '07-css-cascade.html',
    title: 'Cascade',
    metaTitle: 'CSS Cascade — Source Order, Inheritance & !important | CSS Tutorial',
    desc: 'Learn what the CSS cascade is, source order, specificity, inheritance, browser defaults, user styles, author styles, !important, inline styles, and debugging conflicting styles.',
    phase: 'Phase 03: Cascade & Specificity', phaseNum: 3, total: TOTAL_CHAPTERS,
    topics: 'Cascade · Source Order · Specificity · Inheritance · Browser Defaults · User Styles · Author Styles · !important · Inline Styles · Debugging · Cascade Order · Best Practices',
    prev: { href: '06-css-pseudo-elements.html', title: '6. Pseudo-Elements' },
    next: { href: '08-css-specificity.html', title: '8. Specificity' },
    sections: `
<div class="section-title"><span class="num">1</span>Cascade Ante Enti?</div>
<div class="section-body">
  <p><strong>Cascade ante enti?</strong> Multiple CSS rules same element ni target chesina, browser e rule apply cheyali decide chese mechanism. "Cascading Style Sheets" lo "Cascading" exactly idi — waterfall la rules top nundi bottom ki flow avuthu final style form avuthundi.</p>
  <p>Cascade four factors consider chestundi:</p>
  <ol>
    <li><strong>Origin</strong> — browser defaults, user settings, author (developer) styles</li>
    <li><strong>Importance</strong> — <code>!important</code> declarations</li>
    <li><strong>Specificity</strong> — selector weight (ID &gt; class &gt; element)</li>
    <li><strong>Source order</strong> — same specificity ayite last rule wins</li>
  </ol>
</div>

<div class="section-title"><span class="num">2</span>Source Order — Later Rule Wins</div>
<div class="section-body">
  <p>Specificity and importance equal ga unte, stylesheet lo <strong>last ga vachina rule</strong> win avuthundi:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Source Order</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>p {
  color: blue;
}

p {
  color: green;
}
/* Later rule wins — text appears GREEN */</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Inheritance, Browser Defaults &amp; Style Origins</div>
<div class="section-body">
  <ul>
    <li><strong>Inheritance:</strong> Some properties (color, font-family) parent nundi child ki inherit avuthayi; others (margin, padding) inherit avvavu</li>
    <li><strong>Browser defaults (User Agent):</strong> Built-in styles — <code>&lt;h1&gt;</code> bold, <code>&lt;a&gt;</code> blue underline</li>
    <li><strong>User styles:</strong> Browser extensions or accessibility settings override cheyochu</li>
    <li><strong>Author styles:</strong> Developer CSS — external, internal, inline</li>
  </ul>
  <table class="tbl spec-table">
    <thead><tr><th>Origin</th><th>Example</th><th>Priority (low → high)</th></tr></thead>
    <tbody>
      <tr><td>User agent</td><td>Browser built-in stylesheet</td><td>Lowest</td></tr>
      <tr><td>User</td><td>Custom browser font size</td><td>Medium</td></tr>
      <tr><td>Author</td><td>Your <code>styles.css</code></td><td>High (normal)</td></tr>
      <tr><td>Author + !important</td><td><code>color: red !important;</code></td><td>Highest (avoid abuse)</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">4</span>!important &amp; Inline Styles</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>.alert {
  color: orange !important; /* Overrides normal author rules */
}</code></pre>
  </div>
  <p><strong>Inline styles</strong> (<code>style="color: red;"</code>) specificity ekkuva — override cheyadam kashtam. Production lo inline styles avoid cheyandi except dynamic JS cases.</p>
  <div class="callout">
    <div class="callout-title">💡 Cascade Best Practices</div>
    <ul style="margin:8px 0 0 18px;line-height:1.7;">
      <li><code>!important</code> rarely use cheyandi — specificity wars start avuthayi</li>
      <li>DevTools (F12 → Elements → Styles) lo crossed-out rules chusi debug cheyandi</li>
      <li>Consistent CSS architecture maintain cheyandi — cascade predictable ga undali</li>
    </ul>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Debugging Conflicting Styles</div>
<div class="section-body">
  <p>Styles apply avvatam leda ante check cheyandi:</p>
  <ol>
    <li>Selector correct ga match avuthundaa? (DevTools element highlight)</li>
    <li>Higher specificity rule override chestundaa?</li>
    <li><code>!important</code> or inline style undaa?</li>
    <li>Typo in property name? (invalid properties ignore avuthayi)</li>
    <li>Stylesheet load avuthundaa? (Network tab)</li>
  </ol>
</div>`
  },
  {
    num: 8, file: '08-css-specificity.html',
    title: 'Specificity',
    metaTitle: 'CSS Specificity — Selector Weight, :where(), :is() | CSS Tutorial',
    desc: 'Master CSS specificity calculation: element, class, ID, inline specificity, selector weight, avoiding specificity wars, :where(), :is(), and refactoring complex selectors.',
    phase: 'Phase 03: Cascade & Specificity', phaseNum: 3, total: TOTAL_CHAPTERS,
    topics: 'Element · Class · ID · Inline · Specificity Calculation · Selector Weight · Specificity Wars · CSS Architecture · :where() · :is() · !important Problems · Refactoring',
    prev: { href: '07-css-cascade.html', title: '7. Cascade' },
    next: { href: '09-css-cascade-layers.html', title: '9. Cascade Layers' },
    sections: `
<div class="section-title"><span class="num">1</span>Specificity Ante Enti?</div>
<div class="section-body">
  <p>Specificity — selector strength score. Cascade lo specificity equal unna rules madhya source order decide chestundi; different specificity ayite higher score win avuthundi.</p>
  <table class="tbl spec-table">
    <thead><tr><th>Selector Type</th><th>Weight</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td>Inline style</td><td>1,0,0,0</td><td><code>style="..."</code></td></tr>
      <tr><td>ID</td><td>0,1,0,0</td><td><code>#header</code></td></tr>
      <tr><td>Class, attribute, pseudo-class</td><td>0,0,1,0</td><td><code>.btn</code>, <code>[type]</code>, <code>:hover</code></td></tr>
      <tr><td>Element, pseudo-element</td><td>0,0,0,1</td><td><code>p</code>, <code>::before</code></td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Specificity Calculation</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Specificity Examples</span></div>
    <pre><code>/* (0,0,0,1) — one element */
p { color: black; }

/* (0,0,1,0) — one class */
.text { color: blue; }

/* (0,1,0,0) — one ID */
#main { color: red; }

/* (0,1,1,1) — ID + class + element */
#main .title h1 { color: purple; }</code></pre>
  </div>
  <p><strong>Compare left to right:</strong> First different column lo ekkuva number unna selector win avuthundi. <code>#main p</code> (0,1,0,1) beats <code>.text</code> (0,0,1,0).</p>
</div>

<div class="section-title"><span class="num">3</span>Avoiding Specificity Wars</div>
<div class="section-body">
  <p>Specificity wars — override cheyadaniki malli malli IDs and <code>!important</code> add cheyadam. Maintainability destroy avuthundi.</p>
  <ul>
    <li>Classes prefer cheyandi over IDs for styling</li>
    <li>Single-class selectors target cheyandi: <code>.nav-link--active</code></li>
    <li>BEM naming — predictable, flat specificity</li>
    <li><code>!important</code> last resort matrame</li>
  </ul>
</div>

<div class="section-title"><span class="num">4</span>:where() &amp; :is() — Specificity Control</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>/* :where() — zero specificity boost */
:where(h1, h2, h3) {
  line-height: 1.2;
}

/* :is() — takes highest specificity of arguments */
:is(h1, .title, #hero) {
  color: #1e293b;
}</code></pre>
  </div>
  <p><code>:where()</code> reset/base styles ki perfect — override cheyadam easy. <code>:is()</code> grouping ki use cheyandi but specificity aware ga.</p>
</div>

<div class="section-title"><span class="num">5</span>Refactoring Complex Selectors</div>
<div class="section-body">
  <div class="callout">
    <div class="callout-title">Before → After Refactor</div>
    <p><code>nav.main-nav > ul > li.active > a</code> → <code>.nav-link--active</code></p>
    <p>Lower specificity, reusable class, easier testing and maintenance.</p>
  </div>
</div>`
  },
  {
    num: 9, file: '09-css-cascade-layers.html',
    title: 'Cascade Layers',
    metaTitle: 'CSS @layer — Cascade Layers, Reset, Components & Utilities | CSS Tutorial',
    desc: 'Learn CSS cascade layers with @layer: reset, base, components, utilities, layer ordering, third-party styles, layered architecture, debugging, and migration.',
    phase: 'Phase 03: Cascade & Specificity', phaseNum: 3, total: TOTAL_CHAPTERS,
    topics: '@layer · Reset Layer · Base Layer · Components · Utilities · Layer Ordering · Third-Party Styles · Layered Architecture · Debugging · Migration',
    prev: { href: '08-css-specificity.html', title: '8. Specificity' },
    next: { href: '10-css-values-and-units.html', title: '10. Values & Units' },
    sections: `
<div class="section-title"><span class="num">1</span>@layer Ante Enti?</div>
<div class="section-body">
  <p><strong>@layer</strong> — cascade layers authors ki style precedence ni intentional ga control cheyyadaniki help chestayi. Specificity battles lekunda layer order tho priority set cheyochu.</p>
  <p>Layer order (lowest → highest priority): earlier declared layers first, unlayered styles highest.</p>
</div>

<div class="section-title"><span class="num">2</span>Layered Architecture — Reset, Base, Components, Utilities</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Cascade Layers</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>@layer reset, base, components, utilities;

@layer reset {
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
}

@layer base {
  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
  }
}

@layer components {
  .button {
    padding: 10px 16px;
    border-radius: 8px;
    background: #2563eb;
    color: #fff;
  }
}

@layer utilities {
  .mt-4 { margin-top: 1rem; }
  .text-center { text-align: center; }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Layer Ordering &amp; Third-Party Styles</div>
<div class="section-body">
  <p>Third-party CSS (Bootstrap, component libraries) separate layer lo import cheyandi:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>@layer reset, vendor, components, utilities;

@import url('bootstrap.min.css') layer(vendor);</code></pre>
  </div>
  <p>Your <code>components</code> and <code>utilities</code> layers vendor styles ni override cheyochu — specificity war lekunda.</p>
</div>

<div class="section-title"><span class="num">4</span>Layer Debugging &amp; Migration</div>
<div class="section-body">
  <ul>
    <li><strong>DevTools:</strong> Styles panel lo layer name kanipistundi</li>
    <li><strong>Migration:</strong> Existing project lo step-by-step — reset first, then base, then components</li>
    <li><strong>Best practice:</strong> Declare all layer names upfront in one line</li>
  </ul>
</div>`
  },
  {
    num: 10, file: '10-css-values-and-units.html',
    title: 'CSS Values and Units',
    metaTitle: 'CSS Values & Units — px, rem, em, vw, vh, fr & More | CSS Tutorial',
    desc: 'Learn CSS absolute and relative units: pixels, percentages, em, rem, vw, vh, vmin, vmax, ch, ex, fr, deg, s, ms, and choosing correct units.',
    phase: 'Phase 04: Values, Units & Colors', phaseNum: 4, total: TOTAL_CHAPTERS,
    topics: 'px · % · em · rem · vw · vh · vmin · vmax · ch · ex · fr · deg · s · ms · Unitless · Choosing Units',
    prev: { href: '09-css-cascade-layers.html', title: '9. Cascade Layers' },
    next: { href: '11-css-colors.html', title: '11. Colors' },
    sections: `
<div class="section-title"><span class="num">1</span>CSS Values Overview</div>
<div class="section-body">
  <p>CSS properties ki values numbers, keywords, functions, or unit-suffixed measurements. Correct unit choose cheyadam responsive, accessible design ki critical.</p>
  <table class="tbl spec-table">
    <thead><tr><th>Unit</th><th>Type</th><th>Use Case</th></tr></thead>
    <tbody>
      <tr><td><code>px</code></td><td>Absolute</td><td>Borders, shadows, fixed icons</td></tr>
      <tr><td><code>%</code></td><td>Relative</td><td>Parent-based width/height</td></tr>
      <tr><td><code>em</code></td><td>Relative</td><td>Component-scoped scaling (parent font-size)</td></tr>
      <tr><td><code>rem</code></td><td>Relative</td><td>Root-based spacing &amp; typography (recommended)</td></tr>
      <tr><td><code>vw</code> / <code>vh</code></td><td>Viewport</td><td>Full-screen sections, hero banners</td></tr>
      <tr><td><code>vmin</code> / <code>vmax</code></td><td>Viewport</td><td>Responsive squares, min/max dimension</td></tr>
      <tr><td><code>ch</code></td><td>Character</td><td>Readable line length (~65ch)</td></tr>
      <tr><td><code>fr</code></td><td>Grid fraction</td><td>CSS Grid flexible columns</td></tr>
      <tr><td><code>deg</code>, <code>s</code>, <code>ms</code></td><td>Animation</td><td>Rotations, transition duration</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Absolute vs Relative Units</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>html { font-size: 16px; }

.container {
  width: 90%;
  max-width: 1200px;
  padding: 2rem;        /* 32px — scales with root font */
  font-size: 1.125rem;  /* 18px */
}

.hero {
  min-height: 100vh;
  padding: 5vw 4vw;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Unitless Values &amp; Choosing Correct Units</div>
<div class="section-body">
  <p>Some properties accept <strong>unitless</strong> values — <code>line-height: 1.5</code>, <code>opacity: 0.8</code>, <code>z-index: 10</code>, <code>flex: 1</code>.</p>
  <div class="callout">
    <div class="callout-title">💡 Unit Selection Guide</div>
    <ul style="margin:8px 0 0 18px;line-height:1.7;">
      <li><strong>Typography &amp; spacing:</strong> <code>rem</code></li>
      <li><strong>Component-internal scaling:</strong> <code>em</code></li>
      <li><strong>Layout widths:</strong> <code>%</code>, <code>fr</code>, <code>max-width</code></li>
      <li><strong>Full viewport sections:</strong> <code>vh</code>, <code>vw</code></li>
      <li><strong>Hairline borders:</strong> <code>px</code></li>
    </ul>
  </div>
</div>`
  },
  {
    num: 11, file: '11-css-colors.html',
    title: 'Colors',
    metaTitle: 'CSS Colors — Hex, RGB, HSL, Variables & Contrast | CSS Tutorial',
    desc: 'Master CSS colors: named colors, hex, RGB, RGBA, HSL, HSLA, modern color functions, opacity, transparency, color contrast, theme colors, and CSS variables.',
    phase: 'Phase 04: Values, Units & Colors', phaseNum: 4, total: TOTAL_CHAPTERS,
    topics: 'Named Colors · Hex · RGB · RGBA · HSL · HSLA · Modern Functions · Opacity · Transparency · Contrast · Theme Colors · CSS Variables',
    prev: { href: '10-css-values-and-units.html', title: '10. Values & Units' },
    next: { href: '12-css-functions.html', title: '12. Functions' },
    sections: `
<div class="section-title"><span class="num">1</span>CSS Color Formats</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Format</th><th>Example</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td>Named</td><td><code>red</code>, <code>tomato</code></td><td>140+ keywords</td></tr>
      <tr><td>Hex</td><td><code>#2563eb</code>, <code>#fff</code></td><td>Most common in design</td></tr>
      <tr><td>RGB / RGBA</td><td><code>rgb(37, 99, 235)</code></td><td>Alpha for transparency</td></tr>
      <tr><td>HSL / HSLA</td><td><code>hsl(217, 91%, 53%)</code></td><td>Intuitive hue/sat/light</td></tr>
      <tr><td>Modern</td><td><code>oklch()</code>, <code>color-mix()</code></td><td>CSS Color Level 4+</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Opacity, Transparency &amp; Color Contrast</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.card {
  opacity: 0.9; /* Affects entire element including children */
}

.text {
  color: hsl(215 16% 47% / 0.8); /* Modern alpha syntax */
}</code></pre>
  </div>
  <p><strong>Color contrast:</strong> WCAG guidelines — text ki minimum 4.5:1 contrast ratio (normal text). Accessibility tools and DevTools contrast checker use cheyandi.</p>
</div>

<div class="section-title"><span class="num">3</span>Theme Colors with CSS Variables</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Color Variables</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>:root {
  --primary-color: #2563eb;
  --text-color: #1f2937;
  --surface-color: #ffffff;
  --muted-color: #6b7280;
}

body {
  color: var(--text-color);
  background-color: var(--surface-color);
}

.btn-primary {
  background-color: var(--primary-color);
  color: #fff;
}

/* Dark theme override */
[data-theme="dark"] {
  --text-color: #f9fafb;
  --surface-color: #111827;
}</code></pre>
  </div>
</div>`
  },
  {
    num: 12, file: '12-css-functions.html',
    title: 'Functions',
    metaTitle: 'CSS Functions — calc(), clamp(), min(), max(), var(), gradients | CSS Tutorial',
    desc: 'Learn CSS functions: calc(), min(), max(), clamp(), var(), rgb(), hsl(), url(), linear-gradient(), radial-gradient(), responsive values, and nesting.',
    phase: 'Phase 04: Values, Units & Colors', phaseNum: 4, total: TOTAL_CHAPTERS,
    topics: 'calc() · min() · max() · clamp() · var() · rgb() · hsl() · url() · linear-gradient() · radial-gradient() · Responsive Values · Nesting',
    prev: { href: '11-css-colors.html', title: '11. Colors' },
    next: { href: '13-css-box-model-basics.html', title: '13. Box Model Basics' },
    sections: `
<div class="section-title"><span class="num">1</span>CSS Functions Overview</div>
<div class="section-body">
  <p>CSS functions dynamic values compute chestayi — math, responsive sizing, colors, and images.</p>
</div>

<div class="section-title"><span class="num">2</span>Math Functions — calc(), min(), max(), clamp()</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.sidebar {
  width: calc(100% - 280px);
}

.container {
  width: min(90vw, 1200px);
  padding: max(1rem, 3vw);
}

.title {
  font-size: clamp(1.5rem, 4vw, 3rem);
}</code></pre>
  </div>
  <p><code>clamp(min, preferred, max)</code> — fluid typography ki perfect. Screen size batti font scale avuthundi without media queries.</p>
</div>

<div class="section-title"><span class="num">3</span>var(), Color Functions &amp; Gradients</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>.hero {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: rgb(255 255 255);
}

.card {
  background: radial-gradient(circle at top, #eff6ff, #ffffff);
  border: 1px solid hsl(214 32% 91%);
}

.icon {
  background-image: url('/icons/star.svg');
  width: calc(var(--icon-size, 24) * 1px);
}</code></pre>
  </div>
  <p><strong>Function nesting:</strong> <code>calc(clamp(1rem, 2vw, 2rem) + 8px)</code> — valid in modern browsers.</p>
</div>`
  },
  {
    num: 13, file: '13-css-box-model-basics.html',
    title: 'Box Model Basics',
    metaTitle: 'CSS Box Model — Content, Padding, Border, Margin & box-sizing | CSS Tutorial',
    desc: 'Learn CSS box model: content area, padding, border, margin, width, height, box-sizing, content-box, border-box, margin collapse, and overflow basics.',
    phase: 'Phase 05: Box Model', phaseNum: 5, total: TOTAL_CHAPTERS,
    topics: 'Content · Padding · Border · Margin · Width · Height · box-sizing · content-box · border-box · Margin Collapse · Debugging · Overflow Basics',
    prev: { href: '12-css-functions.html', title: '12. Functions' },
    next: { href: '14-css-width-height-overflow.html', title: '14. Width, Height & Overflow' },
    sections: `
<div class="section-title"><span class="num">1</span>CSS Box Model Ante Enti?</div>
<div class="section-body">
  <p>Every HTML element rectangular box. Box model four layers:</p>
  <div class="diagram-box">┌────────────── margin ──────────────┐
│  ┌─────────── border ───────────┐  │
│  │  ┌──────── padding ────────┐ │  │
│  │  │  ┌──── content ────┐   │ │  │
│  │  │  │   text / image  │   │ │  │
│  │  │  └─────────────────┘   │ │  │
│  │  └─────────────────────────┘ │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘</div>
</div>

<div class="section-title"><span class="num">2</span>Box Model Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.card {
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  margin: 20px;
  box-sizing: border-box;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>box-sizing — content-box vs border-box</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Value</th><th>Width includes</th></tr></thead>
    <tbody>
      <tr><td><code>content-box</code> (default)</td><td>Content only — padding &amp; border add avuthayi</td></tr>
      <tr><td><code>border-box</code></td><td>Content + padding + border — total width fixed</td></tr>
    </tbody>
  </table>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Global Reset</span></div>
    <pre><code>*, *::before, *::after {
  box-sizing: border-box;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Margin Collapse &amp; Debugging</div>
<div class="section-body">
  <p><strong>Margin collapse:</strong> Adjacent vertical margins merge avuthayi — larger margin win avuthundi. Padding or border unte collapse avvadu.</p>
  <p>DevTools lo box model diagram chusi content, padding, border, margin sizes verify cheyandi.</p>
</div>`
  },
  {
    num: 14, file: '14-css-width-height-overflow.html',
    title: 'Width, Height and Overflow',
    metaTitle: 'CSS Width, Height, min/max & Overflow | CSS Tutorial',
    desc: 'Learn CSS width, height, min-width, max-width, min-height, max-height, overflow, overflow-x, overflow-y, overflow-wrap, text clipping, and scroll containers.',
    phase: 'Phase 05: Box Model', phaseNum: 5, total: TOTAL_CHAPTERS,
    topics: 'width · height · min-width · max-width · min-height · max-height · overflow · overflow-x/y · overflow-wrap · Text Clipping · Scroll Containers',
    prev: { href: '13-css-box-model-basics.html', title: '13. Box Model Basics' },
    next: { href: '15-css-borders-and-shadows.html', title: '15. Borders & Shadows' },
    sections: `
<div class="section-title"><span class="num">1</span>Width &amp; Height Properties</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.panel {
  width: 100%;
  max-width: 640px;
  min-width: 280px;
  height: auto;
  min-height: 200px;
  max-height: 80vh;
}</code></pre>
  </div>
  <p><code>width/height: auto</code> — content size batti adjust avuthundi. Fixed dimensions responsive design lo careful ga use cheyandi.</p>
</div>

<div class="section-title"><span class="num">2</span>Overflow — hidden, scroll, auto</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>.scroll-box {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}

.clipped {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}</code></pre>
  </div>
  <ul>
    <li><code>visible</code> — content overflow (default)</li>
    <li><code>hidden</code> — clip excess content</li>
    <li><code>scroll</code> — always show scrollbars</li>
    <li><code>auto</code> — scrollbars when needed</li>
  </ul>
</div>

<div class="section-title"><span class="num">3</span>overflow-wrap &amp; Scroll Containers</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>.long-url {
  overflow-wrap: break-word;
  word-break: break-word;
}

.modal-body {
  overflow-y: auto;
  overscroll-behavior: contain;
}</code></pre>
  </div>
  <p><strong>Scroll containers</strong> — modals, sidebars, chat windows ki <code>overflow: auto</code> + fixed height common pattern.</p>
</div>`
  },
  {
    num: 15, file: '15-css-borders-and-shadows.html',
    title: 'Borders and Shadows',
    metaTitle: 'CSS Borders, Border Radius, box-shadow & Outline | CSS Tutorial',
    desc: 'Learn CSS border width, style, color, border-radius, rounded cards, box-shadow, multiple shadows, inset shadows, outline, focus outline, and visual hierarchy.',
    phase: 'Phase 05: Box Model', phaseNum: 5, total: TOTAL_CHAPTERS,
    topics: 'Border Width · Style · Color · Border Radius · Rounded Cards · box-shadow · Multiple Shadows · Inset · Outline · Focus Outline · outline-offset · Visual Hierarchy',
    prev: { href: '14-css-width-height-overflow.html', title: '14. Width, Height & Overflow' },
    next: { href: '16-css-fonts.html', title: '16. Fonts' },
    sections: `
<div class="section-title"><span class="num">1</span>Border Properties</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  background: #fff;
}

.badge {
  border-width: 2px;
  border-style: dashed;
  border-color: #3b82f6;
  border-radius: 999px;
}</code></pre>
  </div>
  <p>Shorthand: <code>border: width style color;</code> — Individual sides: <code>border-top</code>, <code>border-left</code>, etc.</p>
</div>

<div class="section-title"><span class="num">2</span>box-shadow — Depth &amp; Visual Hierarchy</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.inset-panel {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.elevated {
  box-shadow:
    0 1px 3px rgba(0,0,0,0.12),
    0 8px 24px rgba(0,0,0,0.08);
}</code></pre>
  </div>
  <p>Syntax: <code>box-shadow: x y blur spread color;</code> — Multiple shadows comma-separated.</p>
</div>

<div class="section-title"><span class="num">3</span>Outline &amp; Focus States (Accessibility)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>button:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}

/* Never remove focus without replacement */
button:focus {
  outline: none; /* ❌ Bad if no alternative */
}</code></pre>
  </div>
  <p><strong>Outline vs border:</strong> Outline layout affect cheyadu — focus rings ki ideal. Keyboard users ki visible focus mandatory.</p>
</div>`
  }
];

const extraChapters = require('./css-chapters-16-26.js')
  .concat(require('./css-chapters-27-37.js'))
  .concat(require('./css-chapters-38-49.js'))
  .map(c => ({ ...c, total: TOTAL_CHAPTERS }));
const allChapters = chapters.concat(extraChapters);

function sidebar(ch) {
  const chevron = '<svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  const phaseBlocks = phases.map(p => {
    const open = ch.phaseNum === p.num;
    const links = p.lessons.map(l =>
      `<a href="/blog-css/${l.file}"${l.n === ch.num ? ' class="active"' : ''}>${l.label}</a>`
    ).join('\n        ');
    return `
      <button class="accordion-header${open ? ' active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">${p.icon}</span>
          <div class="phase-info"><span class="phase-tag">Phase ${String(p.num).padStart(2, '0')}</span><span class="phase-title">${p.title}</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">${p.count}</span>${chevron}</div>
      </button>
      <div class="accordion-content${open ? ' open' : ''}">
        ${links}
      </div>`;
  }).join('\n');
  return `
    <div class="sidebar-heading">CSS Complete Master Course</div>
    <a href="/blog-css.html" class="sidebar-home-link">🎨 CSS Course HOME</a>
    <div class="sidebar-accordion">${phaseBlocks}
    </div>
    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-html-editor.html" style="color:${ACCENT};font-weight:700;">▶ Try CSS in HTML Editor</a>
    <a href="/blog.html">📚 All Tutorials</a>
    <div class="sidebar-heading">Related Courses</div>
    <a href="/blog-html.html">HTML5 Course</a>
    <a href="/blog-javascript.html">JavaScript Course</a>`;
}

function navFooter(ch) {
  const prev = ch.prev
    ? `<a href="${ch.prev.href}" class="nav-btn"><span class="label">← Previous</span><span class="title">${ch.prev.title}</span></a>`
    : `<a href="/blog-css.html" class="nav-btn"><span class="label">← CSS Overview</span><span class="title">Course Index</span></a>`;
  const next = ch.next
    ? `<a href="${ch.next.href}" class="nav-btn" style="text-align:right;"><span class="label">Next Chapter →</span><span class="title">${ch.next.title}</span></a>`
    : `<a href="/blog-css.html" class="nav-btn" style="text-align:right;"><span class="label">← Back to Roadmap</span><span class="title">CSS Course Index</span></a>`;
  return `<div class="nav-footer">${prev}${next}</div>`;
}

const headScript = `
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) { content.classList.remove('open'); btn.classList.remove('active'); }
      else { content.classList.add('open'); btn.classList.add('active'); }
    }
    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => document.body.classList.add('light-theme'));
      }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left:auto;flex-shrink:0;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;cursor:pointer;font-family:"Inter",sans-serif;transition:all 0.2s;white-space:nowrap;margin-right:12px;';
          const updateText = () => { toggleBtn.innerHTML = document.body.classList.contains('light-theme') ? '🌙 Dark' : '☀️ Light'; };
          updateText();
          toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.documentElement.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
            updateText();
          });
          topnav.appendChild(toggleBtn);
        }
        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;
          const rawCode = codeEl.textContent;
          let actionsContainer = header.querySelector('.code-actions');
          if (!actionsContainer) {
            actionsContainer = document.createElement('div');
            actionsContainer.className = 'code-actions';
            actionsContainer.style.cssText = 'display:flex;gap:8px;align-items:center;margin-left:auto;';
            const tryBtn = header.querySelector('.try-btn');
            if (tryBtn) actionsContainer.appendChild(tryBtn);
            header.appendChild(actionsContainer);
          }
          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn';
          copyBtn.innerHTML = '📋 Copy';
          copyBtn.style.cssText = 'background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:11px;font-weight:600;cursor:pointer;font-family:"Inter",sans-serif;';
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(rawCode).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
            });
          });
          actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);
          const tryBtn = actionsContainer.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_html', rawCode);
              window.location.href = '/online-html-editor.html';
            });
          }
        });
      });
    })();`;

for (const ch of allChapters) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${ch.metaTitle} | Our Compiler</title>
  <meta name="description" content="${ch.desc}" />
  <meta name="keywords" content="css tutorial, css selectors, learn css, css3, web design" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-css/${ch.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="/site-nav.css" />
  <script>${headScript}</script>
</head>
<body class="lang-css">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-csharp.html">C#</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html" class="active">CSS</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-rust.html">Rust</a>
</nav>

<div class="layout">
  <aside class="sidebar">${sidebar(ch)}</aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-css.html">CSS</a><span class="sep">›</span>
      <span class="current">Chapter ${ch.num}: ${ch.title}</span>
    </div>

    <h1 class="page-title">${ch.title}</h1>

    <div class="page-meta">
      <span class="badge">🎨 CSS3+</span>
      <span class="badge">🟢 Chapter ${ch.num} of ${ch.total}</span>
      <span class="badge">📂 ${ch.phase}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this chapter:</span>
      <span class="topic-pill-text">${ch.topics}</span>
    </div>

    <div class="intro-box">
      ${ch.intro ? ch.intro : `Welcome to <strong>Chapter ${ch.num}: ${ch.title}</strong> — part of the CSS Complete Roadmap. This lesson covers all subtopics with clear explanations, code examples, and best practices used in professional web development.`}
    </div>

    ${ch.sections}

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy · CSS Complete Roadmap · Last updated August 2026</span>
      </div>
    </div>

    ${navFooter(ch)}
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(path.join(OUT, ch.file), html, 'utf8');
  console.log('Wrote', ch.file);
}

console.log('Done —', allChapters.length, 'chapters generated.');
