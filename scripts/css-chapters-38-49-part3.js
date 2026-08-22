const { codeBlock, propTable, learnBox, whyBox, mistakes, challenge, quiz, recap, outputBox } = require('./css-lesson-template');

module.exports = [
  {
    num: 46, file: '46-css-accessibility.html',
    title: 'CSS Accessibility',
    metaTitle: 'CSS Accessibility — Contrast, Focus, Reduced Motion & a11y | CSS Tutorial',
    desc: 'CSS accessibility guide: color contrast, focus visibility, keyboard navigation, prefers-reduced-motion, text resizing, line length, touch targets, screen readers, high contrast, sr-only content.',
    phase: 'Phase 17: Accessibility & Performance', phaseNum: 17,
    topics: 'Color Contrast · Focus Visibility · Keyboard Nav · Reduced Motion · Text Resizing · Line Length · Touch Targets · Color-Only Meaning · Screen Readers · High Contrast · sr-only',
    prev: { href: '45-css-feature-queries.html', title: '45. Feature Queries' },
    next: { href: '47-css-performance.html', title: '47. CSS Performance' },
    sections: `
${learnBox([
  'WCAG color contrast requirements and testing tools',
  'Focus-visible styling for keyboard navigation',
  'prefers-reduced-motion, prefers-contrast media queries',
  'Touch target sizing and readable typography',
  'Screen reader-only content with .sr-only utility'
])}
${whyBox('Accessibility is not optional — legal requirement in many countries (ADA, EAA), and 15%+ users have disabilities. CSS plays a critical role: contrast, focus rings, motion sensitivity, text sizing. Accessible CSS is professional CSS.')}

<div class="section-title"><span class="num">1</span>Color Contrast &amp; Avoiding Color-Only Meaning</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Level</th><th>Normal Text</th><th>Large Text (18px+)</th></tr></thead>
    <tbody>
      <tr><td>WCAG AA</td><td>4.5:1 ratio</td><td>3:1 ratio</td></tr>
      <tr><td>WCAG AAA</td><td>7:1 ratio</td><td>4.5:1 ratio</td></tr>
    </tbody>
  </table>
  ${codeBlock('CSS — Accessible Colors', `:root {
  --text-primary: #111827;    /* on white: 16.6:1 ✅ */
  --text-secondary: #4b5563;  /* on white: 7.5:1 ✅ AAA */
  --color-error: #b91c1c;     /* on white: 5.9:1 ✅ */
  --color-success: #15803d;   /* on white: 4.6:1 ✅ */
}

.error-msg {
  color: var(--color-error);
  font-weight: 600;
}
.error-msg::before {
  content: "⚠ ";
}
/* Icon + text — not color alone */`)}
  <p>DevTools → Elements → color picker shows contrast ratio. WebAIM Contrast Checker online tool kuda use cheyandi.</p>
</div>

<div class="section-title"><span class="num">2</span>Focus Visibility &amp; Keyboard Navigation</div>
<div class="section-body">
  ${codeBlock('CSS — Focus Styles', `/* NEVER do this without replacement */
/* *:focus { outline: none; } ❌ */

:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}

.btn:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 3px;
  box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.2);
}

.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  padding: 12px 20px;
  background: #2563eb;
  color: #fff;
  z-index: 9999;
  border-radius: 0 0 8px 8px;
}

.skip-link:focus {
  top: 0;
}`)}
  ${propTable([
    [':focus-visible', 'Keyboard focus ki matrame ring — mouse click ki ledu'],
    ['outline-offset', 'Ring element border nundi gap — clearer visibility'],
    ['.skip-link', 'Keyboard users main content ki skip cheyadaniki']
  ])}
</div>

<div class="section-title"><span class="num">3</span>prefers-reduced-motion &amp; Touch Targets</div>
<div class="section-body">
  ${codeBlock('CSS', `@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

@media (prefers-contrast: more) {
  :root {
    --text-primary: #000000;
    --border-color: #000000;
  }
  .btn { border: 2px solid currentColor; }
}

/* Minimum 44x44px touch targets (WCAG 2.5.5) */
.nav-link, .btn, input[type="checkbox"] {
  min-height: 44px;
  min-width: 44px;
}`)}
</div>

<div class="section-title"><span class="num">4</span>Screen Reader Content &amp; Readable Typography</div>
<div class="section-body">
  ${codeBlock('CSS — .sr-only Utility', `.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.prose {
  max-width: 65ch;
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  line-height: 1.7;
}`)}
  <p><code>.sr-only</code> — visually hidden but screen readers read cheyochu. Icon buttons ki accessible label provide cheyadaniki essential.</p>
</div>

${mistakes([
  'outline: none on all elements — keyboard users lost',
  'Red/green only for error/success — colorblind users fail',
  'Auto-playing animations ignoring prefers-reduced-motion',
  'Touch targets below 44px on mobile',
  'display:none on content that screen readers should read'
])}

${quiz([
  { q: 'WCAG AA normal text contrast ratio entha?', a: 'Minimum 4.5:1 contrast ratio between text and background.' },
  { q: '.sr-only vs display:none difference enti?', a: 'sr-only visually hides but screen readers access cheyochu. display:none completely removes from accessibility tree.' }
])}

${recap([
  '4.5:1 contrast minimum for body text (WCAG AA)',
  ':focus-visible for keyboard focus — never remove outline without replacement',
  'prefers-reduced-motion: disable/simplify animations',
  '44px minimum touch targets on mobile',
  '.sr-only for screen-reader-only accessible labels',
  'Never convey meaning through color alone'
])}`
  },
  {
    num: 47, file: '47-css-performance.html',
    title: 'CSS Performance',
    metaTitle: 'CSS Performance — Critical CSS, Unused CSS & Animation Optimization | CSS Tutorial',
    desc: 'CSS performance optimization: file size, unused CSS, critical CSS, loading efficiently, expensive selectors, reflow, repaint, compositing, transform vs position, animation performance, caching.',
    phase: 'Phase 17: Accessibility & Performance', phaseNum: 17,
    topics: 'File Size · Unused CSS · Critical CSS · Loading · Expensive Selectors · Reflow · Repaint · Compositing · Transform vs Position · Animation Performance · Image Optimization · Auditing · Caching',
    prev: { href: '46-css-accessibility.html', title: '46. CSS Accessibility' },
    next: { href: '48-css-debugging.html', title: '48. CSS Debugging' },
    sections: `
${learnBox([
  'CSS file size optimization and unused CSS removal',
  'Critical CSS inlining for faster First Contentful Paint',
  'Reflow vs repaint vs compositing — browser rendering pipeline',
  'Animation performance — transform/opacity vs width/height',
  'Performance auditing with Lighthouse and DevTools'
])}
${whyBox('CSS directly impacts Core Web Vitals. Large CSS files block rendering. Animating width/height causes layout thrashing. Understanding the browser rendering pipeline helps you write CSS that runs at 60fps and loads in milliseconds.')}

<div class="section-title"><span class="num">1</span>CSS Loading &amp; File Size</div>
<div class="section-body">
  ${codeBlock('HTML — Efficient CSS Loading', `<!-- Critical CSS inline in head -->
<style>/* above-fold styles */</style>

<!-- Non-critical CSS deferred -->
<link rel="preload" href="/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/main.css"></noscript>`)}
  <ul>
    <li><strong>PurgeCSS / Tailwind JIT:</strong> Remove unused classes from production build</li>
    <li><strong>Split CSS:</strong> critical.css (inline) + main.css (deferred)</li>
    <li><strong>Minify:</strong> cssnano, clean-css — remove whitespace and comments</li>
    <li><strong>Cache:</strong> <code>Cache-Control: max-age=31536000</code> with hashed filenames</li>
    <li><strong>Avoid @import in CSS:</strong> blocks parallel downloads — use HTML link tags</li>
  </ul>
</div>

<div class="section-title"><span class="num">2</span>Rendering Pipeline — Reflow, Repaint, Compositing</div>
<div class="section-body">
  <pre class="diagram-box">JavaScript → Style → Layout → Paint → Composite
                ↑         ↑       ↑        ↑
              cheap    expensive expensive  cheap

Layout (Reflow):  width, height, margin, padding, display
Paint:            color, background, box-shadow, border-radius
Composite only:   transform, opacity (GPU accelerated ✅)</pre>
  ${codeBlock('CSS — Performance Comparison', `/* ❌ SLOW — triggers Layout every frame */
.bad-animation {
  animation: move 1s infinite;
}
@keyframes move {
  from { left: 0; }
  to   { left: 200px; }
}

/* ✅ FAST — compositor only, GPU accelerated */
.good-animation {
  animation: move 1s infinite;
}
@keyframes move {
  from { transform: translateX(0); }
  to   { transform: translateX(200px); }
}

/* ✅ Also fast */
.fade { transition: opacity 200ms; }
.card:hover { opacity: 0.9; }`)}
</div>

<div class="section-title"><span class="num">3</span>Selector Performance &amp; Auditing</div>
<div class="section-body">
  <ul>
    <li><strong>Right-most selector matters most</strong> — browser matches right to left</li>
    <li><strong>Avoid:</strong> <code>*</code>, deep nesting, <code>[attr*=""]</code> universal attribute</li>
    <li><strong>Prefer:</strong> Single class selectors <code>.nav-link</code></li>
    <li><strong>will-change:</strong> <code>will-change: transform;</code> hint browser to optimize (use sparingly)</li>
    <li><strong>contain:</strong> <code>contain: layout style;</code> isolates rendering scope</li>
  </ul>
  <p><strong>Audit tools:</strong> Lighthouse (Chrome DevTools), WebPageTest, CSS Stats, Coverage tab in DevTools (shows unused CSS %).</p>
</div>

${mistakes([
  'Animating width, height, top, left — causes layout reflow every frame',
  'will-change on everything — wastes GPU memory',
  '@import chains in CSS — serial loading',
  '500KB CSS file with 80% unused styles',
  'Not using font-display: swap — invisible text during font load'
])}

${quiz([
  { q: 'transform vs left animation — eppudu transform fast?', a: 'transform and opacity composite layer lo run avuthayi — GPU accelerated, no layout reflow. left/top trigger layout every frame.' },
  { q: 'Critical CSS enti?', a: 'Above-the-fold content ki required minimum CSS — inline in head for faster First Contentful Paint. Rest deferred.' }
])}

${recap([
  'Minify, purge unused CSS, cache with hashed filenames',
  'Animate transform and opacity only — avoid width/height/top/left',
  'Critical CSS inline, defer non-critical stylesheets',
  'Lighthouse and Coverage tab for auditing',
  'contain and will-change for targeted optimization'
])}`
  },
  {
    num: 48, file: '48-css-debugging.html',
    title: 'CSS Debugging',
    metaTitle: 'CSS Debugging — DevTools, Flexbox/Grid Inspector & Cross-Browser | CSS Tutorial',
    desc: 'CSS debugging with browser DevTools: inspect elements, computed styles, box model, flexbox inspector, grid inspector, specificity, overflow, z-index, responsive mode, validation, cross-browser testing.',
    phase: 'Phase 18: Debugging & Projects', phaseNum: 18,
    topics: 'DevTools · Inspect · Computed Styles · Box Model · Flexbox Inspector · Grid Inspector · Specificity · Overflow · Z-index · Responsive Mode · Validation · Cross-Browser',
    prev: { href: '47-css-performance.html', title: '47. CSS Performance' },
    next: { href: '49-css-projects.html', title: '49. CSS Projects' },
    sections: `
${learnBox([
  'Chrome/Firefox DevTools CSS debugging workflow',
  'Box model, computed styles, and specificity inspection',
  'Flexbox and Grid visual inspectors',
  'Z-index stacking context debugging',
  'Responsive device mode and cross-browser testing'
])}
${whyBox('Every professional CSS developer spends significant time in DevTools. Knowing how to quickly find why a style is not applying, why flexbox is not centering, or why z-index is not working — these skills save hours of frustration.')}

<div class="section-title"><span class="num">1</span>DevTools Essentials — Inspect &amp; Computed</div>
<div class="section-body">
  <p><strong>Open DevTools:</strong> F12 or Right-click → Inspect. Key panels:</p>
  <ul>
    <li><strong>Elements → Styles:</strong> All applied rules, crossed-out overridden rules</li>
    <li><strong>Elements → Computed:</strong> Final computed value after cascade</li>
    <li><strong>Elements → Layout (Box Model):</strong> Visual margin/padding/border/content diagram</li>
    <li><strong>Filter in Styles panel:</strong> Type property name to find specific rule</li>
    <li><strong>:hov button:</strong> Force :hover, :focus, :active states without interacting</li>
  </ul>
  ${codeBlock('CSS — Debugging Specificity', `/* Styles panel shows WHY rule crossed out */
/* Higher specificity rule wins */
/* Look for: inline styles > #id > .class > element */

/* DevTools shows selector specificity in tooltip */`)}
</div>

<div class="section-title"><span class="num">2</span>Flexbox &amp; Grid Inspectors</div>
<div class="section-body">
  <p>Chrome DevTools lo flex/grid container select cheste overlay badges kanipistayi:</p>
  <ul>
    <li><strong>Flexbox:</strong> "flex" badge click → shows main/cross axis, item sizes, gap visualization</li>
    <li><strong>Grid:</strong> "grid" badge click → shows grid lines, track sizes, named areas</li>
    <li><strong>Flexbox editor:</strong> Toggle justify-content, align-items visually without writing code</li>
    <li><strong>Grid editor:</strong> Add/remove tracks, change fr units interactively</li>
  </ul>
  ${codeBlock('CSS — Common Flex Debug', `.container {
  display: flex;
  align-items: center; /* not working? */
  /* Check: does container have height? */
  /* align-items needs cross-axis space */
  min-height: 200px; /* add explicit height */
}`)}
</div>

<div class="section-title"><span class="num">3</span>Z-index, Overflow &amp; Responsive Debugging</div>
<div class="section-body">
  ${codeBlock('CSS — Z-index Debug Checklist', `/* z-index not working? Check:
   1. Is element position: relative/absolute/fixed/sticky?
   2. Is it in a lower stacking context?
   3. Parent with opacity < 1 creates new context
   4. Parent with transform creates new context
   5. Parent with z-index creates new context
*/

.modal { z-index: 1000; position: fixed; }
.dropdown { z-index: 100; position: absolute; }
/* Modal always above dropdown ✅ */`)}
  <p><strong>Overflow debug:</strong> Red outline trick — <code>* { outline: 1px solid red; }</code> temporarily to find overflowing elements.</p>
  <p><strong>Responsive mode:</strong> DevTools → Toggle device toolbar (Ctrl+Shift+M) — test breakpoints without resizing browser.</p>
</div>

<div class="section-title"><span class="num">4</span>CSS Validation &amp; Cross-Browser Testing</div>
<div class="section-body">
  <ul>
    <li><strong>W3C CSS Validator:</strong> jigsaw.w3.org/css-validator — syntax errors catch</li>
    <li><strong>caniuse.com:</strong> Feature support across browsers</li>
    <li><strong>BrowserStack:</strong> Real Safari, Firefox, Edge on different OS</li>
    <li><strong>Stylelint:</strong> Automated CSS linting in CI/CD pipeline</li>
    <li><strong>Common issues:</strong> Flexbox gap in old Safari, container queries in Firefox ESR</li>
  </ul>
</div>

${mistakes([
  'Changing CSS blindly without DevTools — guessing specificity',
  'Not checking Computed tab — wondering why flex: 1 not working',
  'Testing only in Chrome — Safari flexbox bugs miss avuthayi',
  'Ignoring crossed-out rules in Styles panel — cascade confusion',
  'Not using device mode for mobile breakpoint testing'
])}

${recap([
  'F12 → Elements → Styles for applied rules, Computed for final values',
  'Flexbox/Grid badges in DevTools for visual layout debugging',
  'z-index issues = stacking context problem — check parents',
  'Force :hover/:focus states with DevTools :hov button',
  'Responsive device mode (Ctrl+Shift+M) for breakpoint testing',
  'caniuse.com before using new CSS features in production'
])}`
  },
  {
    num: 49, file: '49-css-projects.html',
    title: 'CSS Projects',
    metaTitle: 'CSS Projects — Portfolio, Dashboard, Dark Mode & Landing Page | CSS Tutorial',
    desc: 'Complete CSS capstone projects: profile card, responsive navbar, pricing cards, login page, tutorial sidebar, dashboard, portfolio, blog layout, product page, dark mode site, animated landing page, documentation site.',
    phase: 'Phase 18: Debugging & Projects', phaseNum: 18,
    topics: 'Profile Card · Responsive Navbar · Pricing Cards · Login Page · Tutorial Sidebar · Dashboard · Portfolio · Blog · Product Page · Dark Mode · Animated Landing · Documentation Site',
    prev: { href: '48-css-debugging.html', title: '48. CSS Debugging' },
    next: null,
    sections: `
${learnBox([
  'Build 12 real-world CSS projects from scratch',
  'Apply Flexbox, Grid, responsive design, animations, and themes',
  'Portfolio-ready project patterns for job applications',
  'Dark mode, animated landing pages, and documentation sites',
  'Combine all CSS concepts from this complete roadmap'
])}
${whyBox('Reading CSS tutorials without building projects is like reading about swimming without entering water. These capstone projects combine every concept from this roadmap — selectors, layout, responsive design, animations, variables, accessibility, and architecture.')}

<div class="section-title"><span class="num">1</span>Project 1 — Profile Card &amp; Responsive Navbar</div>
<div class="section-body">
  ${codeBlock('CSS — Profile Card', `.profile-card {
  max-width: 360px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  text-align: center;
}

.profile-card__banner {
  height: 100px;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
}

.profile-card__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #fff;
  margin: -40px auto 12px;
  object-fit: cover;
}

.profile-card__body { padding: 0 24px 24px; }`)}
  ${codeBlock('CSS — Responsive Navbar', `.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #111827;
}

.nav-links { display: flex; gap: 16px; }

@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-hamburger { display: flex; }
}`)}
</div>

<div class="section-title"><span class="num">2</span>Project 2 — Pricing Cards &amp; Login Page</div>
<div class="section-body">
  ${codeBlock('CSS — Pricing Grid', `.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 960px;
  margin: 0 auto;
}

.pricing-card--featured {
  border: 2px solid #2563eb;
  transform: scale(1.05);
  box-shadow: 0 8px 32px rgba(37,99,235,0.2);
}`)}
  ${codeBlock('CSS — Login Page', `.login-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.login-form-side {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.login-hero-side {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

@media (max-width: 768px) {
  .login-page { grid-template-columns: 1fr; }
  .login-hero-side { display: none; }
}`)}
</div>

<div class="section-title"><span class="num">3</span>Project 3 — Dashboard &amp; Tutorial Sidebar Layout</div>
<div class="section-body">
  ${codeBlock('CSS — Dashboard (like Our Compiler)', `.dashboard {
  display: grid;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr;
  min-height: 100vh;
}

.dashboard__sidebar { grid-area: sidebar; background: #f9fafb; border-right: 1px solid #e5e7eb; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
.dashboard__header  { grid-area: header; background: #fff; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; padding: 0 24px; }
.dashboard__main    { grid-area: main; padding: 32px; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}`)}
</div>

<div class="section-title"><span class="num">4</span>Project 4 — Dark Mode Website &amp; Animated Landing Page</div>
<div class="section-body">
  ${codeBlock('CSS — Dark Mode Toggle Site', `:root {
  --bg: #ffffff; --text: #111827; --card: #f9fafb; --primary: #2563eb;
}
[data-theme="dark"] {
  --bg: #0f172a; --text: #f1f5f9; --card: #1e293b; --primary: #3b82f6;
}
body { background: var(--bg); color: var(--text); transition: background 300ms, color 300ms; }
.card { background: var(--card); border-radius: 12px; padding: 24px; }`)}
  ${codeBlock('CSS — Animated Landing Hero', `.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a, #1e3a8a);
  color: #fff;
  text-align: center;
  padding: 40px 24px;
}

.hero__title {
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 800;
  animation: fade-in 800ms ease-out;
}

.hero__cta {
  margin-top: 32px;
  animation: fade-in 800ms ease-out 200ms both;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}`)}
</div>

<div class="section-title"><span class="num">5</span>Project 5 — Blog Layout, Product Page &amp; Documentation Site</div>
<div class="section-body">
  ${codeBlock('CSS — Blog + Product + Docs', `/* Blog Layout */
.blog-layout {
  display: grid;
  grid-template-columns: 1fr min(65ch, 100%) 1fr;
  grid-column-gap: 24px;
}
.blog-content { grid-column: 2; }

/* Product Page */
.product-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
}
.product-gallery img { aspect-ratio: 1; object-fit: cover; border-radius: 12px; width: 100%; }

/* Documentation Site — Our Compiler style */
.docs { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; }
.docs-sidebar { position: sticky; top: 0; height: 100vh; overflow-y: auto; border-right: 1px solid #e5e7eb; padding: 20px 12px; }
.docs-content { padding: 40px clamp(16px, 5vw, 64px); max-width: 860px; }`)}
</div>

${challenge('Build Our Compiler Style Docs Page', `<div class="docs">
  <aside class="docs-sidebar"><nav>Sidebar links here</nav></aside>
  <main class="docs-content"><h1>CSS Chapter</h1><p>Content here</p></main>
</div>`, `.docs { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; font-family: 'Inter', sans-serif; }
.docs-sidebar { background: #f9fafb; border-right: 1px solid #e5e7eb; padding: 20px; position: sticky; top: 0; height: 100vh; }
.docs-content { padding: 40px; max-width: 800px; }
@media (max-width: 768px) { .docs { grid-template-columns: 1fr; } .docs-sidebar { display: none; } }`, 'Add dark mode support using CSS variables and a sticky top navbar above the docs grid.')}

${quiz([
  { q: 'CSS roadmap complete chesaka next step enti?', a: 'Build all 12 projects, deploy to GitHub Pages, add to portfolio. Then learn a CSS framework (Tailwind) or CSS-in-JS for React projects.' },
  { q: 'Dashboard layout ki Grid enduku Flexbox kante better?', a: 'Dashboard lo simultaneous row AND column control kavali — sidebar + header + main areas. Grid template areas one declaration lo full page layout define chestundi.' }
])}

${recap([
  '12 capstone projects cover every CSS concept in this roadmap',
  'Profile card, navbar, pricing, login — start with these 4',
  'Dashboard grid layout = real-world Our Compiler pattern',
  'Dark mode with CSS variables — mandatory modern skill',
  'Animated landing page with @keyframes fade-in entrance',
  'Documentation site = portfolio piece + practical skill',
  '🎉 CSS Complete Roadmap 49 Chapters Done — You are a CSS Developer!'
])}`
  }
];
