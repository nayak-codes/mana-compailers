const { codeBlock, propTable, learnBox, whyBox, mistakes, challenge, quiz, recap, outputBox } = require('./css-lesson-template');

module.exports = [
  {
    num: 40, file: '40-css-naming-and-organization.html',
    title: 'CSS Naming and Organization',
    metaTitle: 'CSS Naming & Organization — BEM, Folder Structure & Architecture | CSS Tutorial',
    desc: 'Learn CSS naming conventions, BEM methodology, utility classes, component/layout/state classes, folder structure, reset, base, components, utilities, themes, and refactoring.',
    phase: 'Phase 15: CSS Architecture', phaseNum: 15,
    topics: 'Naming Conventions · BEM · Utility Classes · Component Classes · Layout · State Classes · Folder Structure · Reset · Base · Components · Utilities · Themes · Refactoring',
    prev: { href: '39-css-ui-components.html', title: '39. UI Components' },
    next: { href: '41-css-methodologies.html', title: '41. CSS Methodologies' },
    sections: `
${learnBox([
  'Professional CSS naming conventions and BEM methodology',
  'Organizing CSS into reset, base, layout, components, utilities, themes',
  'Recommended folder structure for small and large projects',
  'Avoiding global CSS conflicts and specificity wars',
  'Refactoring messy CSS into maintainable architecture'
])}
${whyBox('Small projects lo single CSS file chalu. But 10+ pages, multiple developers, component library unte — naming and organization lekunda CSS spaghetti avuthundi. Proper architecture save hours of debugging and makes onboarding new developers easy.')}

<div class="section-title"><span class="num">1</span>CSS Naming Conventions</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Type</th><th>Pattern</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td>Component</td><td>.block or .block__element</td><td><code>.card</code>, <code>.card__title</code></td></tr>
      <tr><td>State</td><td>.block--modifier</td><td><code>.btn--primary</code>, <code>.nav__link--active</code></td></tr>
      <tr><td>Layout</td><td>.l- or .layout-</td><td><code>.l-container</code>, <code>.layout-sidebar</code></td></tr>
      <tr><td>Utility</td><td>.u- or single purpose</td><td><code>.u-text-center</code>, <code>.mt-4</code></td></tr>
    </tbody>
  </table>
  ${codeBlock('CSS — BEM Example', `.card { }
.card__header { }
.card__body { }
.card__footer { }
.card--featured { border-color: #2563eb; }
.card__title--large { font-size: 1.5rem; }`)}
</div>

<div class="section-title"><span class="num">2</span>Recommended Folder Structure</div>
<div class="section-body">
  <pre class="diagram-box">styles/
├── reset.css          ← browser defaults normalize
├── variables.css      ← CSS custom properties / design tokens
├── base.css           ← typography, body, links
├── layout.css         ← grid, container, page structure
├── components/
│   ├── button.css
│   ├── card.css
│   ├── modal.css
│   ├── navbar.css
│   └── form.css
├── utilities.css      ← spacing, text, display helpers
└── themes.css         ← light/dark theme overrides</pre>
  ${codeBlock('CSS — main.css imports', `@import 'reset.css';
@import 'variables.css';
@import 'base.css';
@import 'layout.css';
@import 'components/button.css';
@import 'components/card.css';
@import 'components/modal.css';
@import 'utilities.css';
@import 'themes.css';`)}
</div>

<div class="section-title"><span class="num">3</span>Reset, Base &amp; Component Layers</div>
<div class="section-body">
  ${codeBlock('CSS — reset.css', `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
img, picture, video { max-width: 100%; display: block; }
input, button, textarea, select { font: inherit; }`)}
  ${codeBlock('CSS — base.css', `body {
  font-family: var(--font-sans);
  line-height: 1.6;
  color: var(--text-primary);
  background: var(--bg-primary);
}
a { color: var(--color-primary); text-decoration: none; }
a:hover { text-decoration: underline; }`)}
  ${codeBlock('CSS — components/button.css', `.btn { /* component styles only */ }
.btn--primary { }
.btn--secondary { }`)}
  <p><strong>Rule:</strong> Components should not set page-level layout. Layout classes handle grid/flex page structure. Components handle self-contained UI pieces.</p>
</div>

<div class="section-title"><span class="num">4</span>Avoiding Global Conflicts &amp; Refactoring</div>
<div class="section-body">
  <ul>
    <li><strong>Namespace components:</strong> <code>.oc-btn</code> or BEM blocks prevent collisions</li>
    <li><strong>Avoid element selectors in components:</strong> <code>.card p</code> → <code>.card__text</code></li>
    <li><strong>CSS Layers:</strong> <code>@layer reset, base, components, utilities;</code></li>
    <li><strong>Refactoring steps:</strong> Audit → group by component → extract variables → add utilities → delete dead CSS</li>
  </ul>
</div>

${mistakes([
  'Generic class names: .box, .red, .big — meaningless and conflicting',
  'Deep nesting in CSS files matching HTML structure — hard to maintain',
  '!important to fix specificity wars instead of fixing architecture',
  'Utility classes for everything — HTML becomes unreadable',
  'No CSS variables — colors duplicated 50 times across files'
])}

${quiz([
  { q: 'BEM lo .card__title--highlighted lo __ and -- meaning enti?', a: '__ (double underscore) = element inside block. -- (double hyphen) = modifier/state variant.' },
  { q: 'reset.css vs base.css difference enti?', a: 'reset.css removes browser inconsistencies. base.css sets project defaults (fonts, colors, link styles).' }
])}

${recap([
  'BEM: Block__Element--Modifier naming prevents conflicts',
  'Folder structure: reset → variables → base → layout → components → utilities → themes',
  'Components self-contained — no page layout inside component CSS',
  'CSS custom properties in variables.css — single source of truth',
  'Refactor incrementally — one component at a time'
])}`
  },
  {
    num: 41, file: '41-css-methodologies.html',
    title: 'CSS Methodologies',
    metaTitle: 'CSS Methodologies — BEM, OOCSS, SMACSS, Utility-First & Tailwind | CSS Tutorial',
    desc: 'Compare CSS methodologies: BEM, OOCSS, SMACSS, utility-first CSS, component-driven CSS, CSS Modules, scoped styles, Tailwind overview, and choosing for large projects.',
    phase: 'Phase 15: CSS Architecture', phaseNum: 15,
    topics: 'BEM · OOCSS · SMACSS · Utility-First · Component-Driven · CSS Modules · Scoped Styles · Tailwind · Choosing Methodology · Large Project Maintenance',
    prev: { href: '40-css-naming-and-organization.html', title: '40. CSS Naming & Organization' },
    next: { href: '42-css-modern-selectors.html', title: '42. Modern Selectors' },
    sections: `
${learnBox([
  'BEM, OOCSS, SMACSS methodologies comparison',
  'Utility-first CSS (Tailwind) vs component-driven CSS trade-offs',
  'CSS Modules and scoped styles in modern frameworks',
  'Choosing the right methodology for your project size',
  'Maintaining CSS in large teams and long-term projects'
])}
${whyBox('There is no single "best" CSS methodology. A startup MVP might use Tailwind utilities for speed. An enterprise design system uses BEM + component library. Understanding all approaches helps you pick the right tool and communicate with any team.')}

<div class="section-title"><span class="num">1</span>Methodology Comparison</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Methodology</th><th>Core Idea</th><th>Best For</th></tr></thead>
    <tbody>
      <tr><td><strong>BEM</strong></td><td>Block__Element--Modifier naming</td><td>Component libraries, design systems</td></tr>
      <tr><td><strong>OOCSS</strong></td><td>Separate structure from skin (appearance)</td><td>Reusable object patterns</td></tr>
      <tr><td><strong>SMACSS</strong></td><td>5 categories: Base, Layout, Module, State, Theme</td><td>Large organized codebases</td></tr>
      <tr><td><strong>Utility-First</strong></td><td>Small single-purpose classes (Tailwind)</td><td>Rapid prototyping, startups</td></tr>
      <tr><td><strong>CSS Modules</strong></td><td>Scoped class names at build time</td><td>React/Vue component apps</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>BEM vs Utility-First — Same UI, Two Approaches</div>
<div class="section-body">
  ${codeBlock('CSS — BEM Approach', `<button class="btn btn--primary btn--large">
  Get Started
</button>

/* CSS */
.btn { padding: 10px 20px; border-radius: 8px; font-weight: 600; }
.btn--primary { background: #2563eb; color: #fff; }
.btn--large { padding: 14px 28px; font-size: 1.125rem; }`)}
  ${codeBlock('HTML — Tailwind Utility Approach', `<button class="px-7 py-3.5 bg-blue-600 text-white font-semibold rounded-lg text-lg hover:bg-blue-700">
  Get Started
</button>`)}
  <p><strong>BEM pros:</strong> Semantic HTML, reusable components, smaller HTML. <strong>Utility pros:</strong> No context switching, no naming fatigue, rapid iteration.</p>
</div>

<div class="section-title"><span class="num">3</span>CSS Modules &amp; Scoped Styles</div>
<div class="section-body">
  ${codeBlock('CSS Modules — React example', `/* Button.module.css */
.primary {
  background: #2563eb;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
}

/* Button.jsx */
import styles from './Button.module.css';
export function Button() {
  return <button className={styles.primary}>Click</button>;
}
/* Compiled class: Button_primary_x7f2a */`)}
  <p>Build tool automatically scopes class names — zero global conflicts. Vue SFC <code>&lt;style scoped&gt;</code> similar concept.</p>
</div>

<div class="section-title"><span class="num">4</span>Choosing a Methodology &amp; Large Project Maintenance</div>
<div class="section-body">
  <ul>
    <li><strong>Small project / MVP:</strong> Utility-first (Tailwind) or single organized CSS file</li>
    <li><strong>Medium team / design system:</strong> BEM + CSS variables + component folder structure</li>
    <li><strong>React/Vue SPA:</strong> CSS Modules or styled-components + design tokens</li>
    <li><strong>Maintenance tips:</strong> Stylelint linting, PurgeCSS unused removal, Storybook component docs, CSS review in PRs</li>
  </ul>
</div>

${quiz([
  { q: 'Utility-first CSS main disadvantage enti?', a: 'HTML becomes verbose with many classes. Harder to enforce consistent design without discipline. Component extraction needed for repeated patterns.' },
  { q: 'CSS Modules global conflicts enduku prevent chestayi?', a: 'Build tool hashes class names uniquely per file — .primary becomes .Button_primary_x7f2a at compile time.' }
])}

${recap([
  'BEM for component naming, SMACSS for file organization, OOCSS for separation of concerns',
  'Tailwind/utility-first = speed; BEM/components = maintainability at scale',
  'CSS Modules auto-scope classes in JS frameworks',
  'Pick methodology based on team size, project lifespan, and framework',
  'Linting + component docs + design tokens = long-term CSS health'
])}`
  },
  {
    num: 42, file: '42-css-modern-selectors.html',
    title: 'Modern Selectors',
    metaTitle: 'CSS Modern Selectors — :is(), :where(), :has() & Performance | CSS Tutorial',
    desc: 'Master modern CSS selectors: :is(), :where(), :has(), :not(), attribute selectors, relational selectors, form state selectors, focus selectors, performance and browser support.',
    phase: 'Phase 16: Modern CSS', phaseNum: 16,
    topics: ':is() · :where() · :has() · :not() · Attribute Selectors · Relational · Form State · Focus · Performance · Browser Support',
    prev: { href: '41-css-methodologies.html', title: '41. CSS Methodologies' },
    next: { href: '43-css-modern-layout.html', title: '43. Modern Layout' },
    sections: `
${learnBox([
  ':is(), :where(), :has(), :not() functional selectors',
  'Parent selection with :has() — previously impossible in CSS',
  'Attribute and form state selectors for modern UIs',
  'Selector performance best practices',
  'Browser support and progressive enhancement strategies'
])}
${whyBox(':has() changed CSS forever — "parent selector" problem solved. :where() gives zero specificity grouping. These modern selectors reduce HTML class bloat and enable powerful conditional styling previously requiring JavaScript.')}

<div class="section-title"><span class="num">1</span>:is() and :where() — Grouping Selectors</div>
<div class="section-body">
  ${codeBlock('CSS', `/* Longhand */
h1, h2, h3, h4 { line-height: 1.2; }

/* :is() — takes highest specificity of arguments */
:is(h1, h2, .title) { line-height: 1.2; }

/* :where() — zero specificity boost */
:where(h1, h2, h3) { margin-bottom: 0.5em; }
/* Easy to override with .article h2 { margin-bottom: 1em; } */`)}
  ${propTable([
    [':is(a, b, c)', 'Groups selectors — specificity = highest argument'],
    [':where(a, b, c)', 'Groups selectors — specificity always 0'],
    [':not(.excluded)', 'Exclude matching elements from rule']
  ])}
</div>

<div class="section-title"><span class="num">2</span>:has() — The Parent Selector Revolution</div>
<div class="section-body">
  ${codeBlock('CSS — :has() Examples', `/* Style card IF it contains an image */
.card:has(img) { padding-top: 0; }

/* Form group with invalid input */
.form-group:has(input:invalid) {
  border-left: 3px solid #dc2626;
}

/* Previous sibling styling (no JS!) */
h2:has(+ p) { margin-bottom: 0.25em; }

/* Navigation: highlight parent if child active */
.nav-item:has(.nav-link--active) {
  background: #eff6ff;
}`)}
  ${outputBox('Card with image — no top padding. Form group with invalid email — red left border. Active nav link parent — light blue background. All without JavaScript.')}
</div>

<div class="section-title"><span class="num">3</span>Form State &amp; Focus Selectors</div>
<div class="section-body">
  ${codeBlock('CSS', `input:user-valid { border-color: #16a34a; }
input:user-invalid { border-color: #dc2626; }
input:required:user-invalid { box-shadow: 0 0 0 3px rgba(220,38,38,0.2); }
input:focus-visible { outline: 3px solid #93c5fd; }
input:autofill { background-color: #fef9c3 !important; }`)}
</div>

<div class="section-title"><span class="num">4</span>Selector Performance</div>
<div class="section-body">
  <ul>
    <li>Right-most selector most important — browser matches right to left</li>
    <li>Avoid universal selector in deep chains: <code>body div * span</code></li>
    <li>Prefer classes over complex descendant chains</li>
    <li>:has() can be expensive — use on limited elements, not <code>*:has(...)</code></li>
    <li>Modern browsers optimize common patterns well — don't premature optimize</li>
  </ul>
</div>

${quiz([
  { q: ':has() ni "parent selector" antaru enduku?', a: 'Element style cheyadaniki adi tana child/descendant state batti decide avuthundi — previously only JS could do this.' },
  { q: ':where() vs :is() — eppudu :where() use cheyali?', a: 'Reset/base styles ki — zero specificity so component styles easily override avuthayi.' }
])}

${recap([
  ':is() groups with specificity; :where() groups without specificity',
  ':has() enables parent and sibling conditional styling',
  ':not() excludes elements from matching',
  'Form pseudo-classes: :user-valid, :user-invalid, :focus-visible',
  'Keep selectors shallow and class-based for performance'
])}`
  },
  {
    num: 43, file: '43-css-modern-layout.html',
    title: 'Modern Layout',
    metaTitle: 'CSS Modern Layout — Grid, Subgrid, aspect-ratio & Logical Properties | CSS Tutorial',
    desc: 'Modern CSS layout: Grid, Flexbox, container queries, subgrid, aspect-ratio, object-fit, logical properties, writing modes, intrinsic sizing, min/max/fit-content.',
    phase: 'Phase 16: Modern CSS', phaseNum: 16,
    topics: 'Grid · Flexbox · Container Queries · Subgrid · aspect-ratio · object-fit · Logical Properties · Writing Modes · min-content · max-content · fit-content',
    prev: { href: '42-css-modern-selectors.html', title: '42. Modern Selectors' },
    next: { href: '44-css-nesting-and-scope.html', title: '44. Nesting & Scope' },
    sections: `
${learnBox([
  'Modern layout toolkit: Flexbox + Grid + Container Queries together',
  'subgrid for nested grid alignment across components',
  'aspect-ratio, object-fit for responsive media',
  'Logical properties (inline-size, margin-block) for internationalization',
  'Intrinsic sizing: min-content, max-content, fit-content'
])}
${whyBox('2020+ CSS layout is dramatically more powerful. aspect-ratio eliminates padding-hack for video embeds. Logical properties make RTL/LTR support trivial. subgrid solves the "nested grid alignment" problem that frustrated developers for years.')}

<div class="section-title"><span class="num">1</span>aspect-ratio &amp; object-fit</div>
<div class="section-body">
  ${codeBlock('CSS', `.video-wrapper {
  aspect-ratio: 16 / 9;
  width: 100%;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
}

.video-wrapper iframe,
.video-wrapper video {
  width: 100%;
  height: 100%;
  border: none;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
}`)}
  ${propTable([
    ['aspect-ratio: 16/9', 'Width set cheste height auto calculate — no padding hack'],
    ['object-fit: cover', 'Image container fill chestundi, crop if needed'],
    ['object-position: center top', 'Crop focus point control']
  ])}
</div>

<div class="section-title"><span class="num">2</span>Logical Properties — RTL Ready Layouts</div>
<div class="section-body">
  ${codeBlock('CSS', `.card {
  /* Physical (old) */
  /* padding-left: 16px; margin-top: 24px; width: 300px; */

  /* Logical (modern) — works for LTR and RTL */
  padding-inline-start: 16px;
  margin-block-start: 24px;
  inline-size: 300px;
  border-inline-start: 3px solid #2563eb;
}

[dir="rtl"] .card {
  /* No override needed — logical properties auto-flip! */
}`)}
</div>

<div class="section-title"><span class="num">3</span>Subgrid &amp; Intrinsic Sizing</div>
<div class="section-body">
  ${codeBlock('CSS', `.page-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.card-grid-item {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}

.intrinsic-box {
  width: fit-content;
  max-width: min(100%, 65ch);
  min-width: min-content;
}`)}
  <p><strong>min-content:</strong> Shrink to smallest content width. <strong>max-content:</strong> Expand to full content without wrapping. <strong>fit-content:</strong> min(max-content, available space).</p>
</div>

<div class="section-title"><span class="num">4</span>Modern Layout Stack — Practical Example</div>
<div class="section-body">
  ${codeBlock('CSS — Documentation Site Layout', `.docs-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
}

.docs-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  container-type: inline-size;
}

.docs-content {
  padding: 40px clamp(16px, 5vw, 64px);
  max-inline-size: 75ch;
}

@container (max-width: 200px) {
  .sidebar-link span { display: none; }
}

@media (max-width: 768px) {
  .docs-layout { grid-template-columns: 1fr; }
  .docs-sidebar { display: none; }
}`)}
</div>

${recap([
  'aspect-ratio replaces padding-bottom percentage hack for embeds',
  'Logical properties (inline/block) for international layouts',
  'subgrid aligns nested grid items to parent grid tracks',
  'fit-content, min-content, max-content for intrinsic sizing',
  'Combine Grid (page) + Flexbox (components) + Container Queries (widgets)'
])}`
  },
  {
    num: 44, file: '44-css-nesting-and-scope.html',
    title: 'Nesting and Scope',
    metaTitle: 'CSS Nesting & @scope — Native Nesting, Limitations & Sass Migration | CSS Tutorial',
    desc: 'Learn native CSS nesting, nested selectors, nested media queries, @scope, scope boundaries, limitations, Sass comparison, migration, and browser support.',
    phase: 'Phase 16: Modern CSS', phaseNum: 16,
    topics: 'Native Nesting · Nested Selectors · Nested @media · @scope · Scope Boundaries · Limitations · Sass Comparison · Migration · Browser Support',
    prev: { href: '43-css-modern-layout.html', title: '43. Modern Layout' },
    next: { href: '45-css-feature-queries.html', title: '45. Feature Queries' },
    sections: `
${learnBox([
  'Native CSS nesting syntax — no preprocessor required',
  'Nested @media queries inside selectors',
  '@scope rule for limiting selector reach',
  'Nesting limitations and anti-patterns',
  'Migrating from Sass/Less to native CSS'
])}
${whyBox('CSS nesting landed in all major browsers (2023-2024). Developers can finally write organized, component-scoped CSS without Sass. @scope adds another layer — explicit boundaries preventing styles from leaking outside a subtree.')}

<div class="section-title"><span class="num">1</span>Native CSS Nesting Syntax</div>
<div class="section-body">
  ${codeBlock('CSS — Nested Component', `.card {
  padding: 24px;
  border-radius: 12px;
  background: #fff;

  & .card__title {
    font-size: 1.25rem;
    font-weight: 700;
  }

  &:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }

  &.card--featured {
    border: 2px solid #2563eb;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
}
/* Compiles equivalent to: .card .card__title, .card:hover, etc. */`)}
  <p><strong>&amp; rule:</strong> <code>&amp;</code> required when nesting modifier (<code>&amp;--featured</code>) or pseudo-class (<code>&amp;:hover</code>). Element nesting (<code>.card { .title {} }</code>) works without <code>&amp;</code> in modern browsers.</p>
</div>

<div class="section-title"><span class="num">2</span>@scope — Limiting Style Reach</div>
<div class="section-body">
  ${codeBlock('CSS — @scope', `@scope (.article) {
  h2 { color: #2563eb; font-size: 1.5rem; }
  p { line-height: 1.7; color: #374151; }
  a { color: #7c3aed; }
}
/* h2, p, a styles ONLY apply inside .article — not globally */`)}
  <p>@scope prevents global <code>h2</code> styles from affecting navbar headings. Explicit boundary vs BEM naming convention.</p>
</div>

<div class="section-title"><span class="num">3</span>Nesting Limitations &amp; Sass Migration</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Feature</th><th>Sass</th><th>Native CSS</th></tr></thead>
    <tbody>
      <tr><td>Nesting</td><td>✅ Full</td><td>✅ Modern browsers</td></tr>
      <tr><td>Variables</td><td>$var</td><td>--custom-properties (better!)</td></tr>
      <tr><td>Mixins</td><td>✅ @mixin</td><td>❌ Use @layer or utilities</td></tr>
      <tr><td>Functions</td><td>✅ darken()</td><td>color-mix(), calc()</td></tr>
      <tr><td>@scope</td><td>❌</td><td>✅ Native only</td></tr>
    </tbody>
  </table>
  ${mistakes([
    'Nesting more than 3 levels deep — specificity explosion',
    'Nesting without &amp; for compound selectors — can fail in edge cases',
    'Using nesting to mirror HTML structure instead of component thinking',
    'Global element selectors inside nested blocks — still global within scope'
  ])}
</div>

${recap([
  'Native CSS nesting: use & for modifiers and pseudo-classes',
  'Nested @media inside selectors — cleaner responsive code',
  '@scope limits style reach to a subtree',
  'CSS custom properties replace Sass variables',
  'Avoid deep nesting — max 2-3 levels for maintainability'
])}`
  },
  {
    num: 45, file: '45-css-feature-queries.html',
    title: 'Feature Queries',
    metaTitle: 'CSS @supports — Feature Queries & Progressive Enhancement | CSS Tutorial',
    desc: 'Learn @supports feature queries, progressive enhancement, fallback styles, feature detection, Grid/Container Query/color fallbacks, graceful degradation, and production testing.',
    phase: 'Phase 16: Modern CSS', phaseNum: 16,
    topics: '@supports · Progressive Enhancement · Fallbacks · Feature Detection · Grid Fallback · Container Query Fallback · Modern Color Fallback · Graceful Degradation · Testing',
    prev: { href: '44-css-nesting-and-scope.html', title: '44. Nesting & Scope' },
    next: { href: '46-css-accessibility.html', title: '46. CSS Accessibility' },
    sections: `
${learnBox([
  '@supports rule for feature detection in CSS',
  'Progressive enhancement strategy — base first, enhance later',
  'Fallback patterns for Grid, Container Queries, modern colors',
  'Graceful degradation for older browsers',
  'Production testing across browser versions'
])}
${whyBox('Not all users have the latest browser. @supports lets you write cutting-edge CSS while providing solid fallbacks — no JavaScript feature detection needed. This is the CSS-native way to do progressive enhancement.')}

<div class="section-title"><span class="num">1</span>@supports Syntax &amp; Basic Usage</div>
<div class="section-body">
  ${codeBlock('CSS', `.card {
  display: block;
}

@supports (display: grid) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}

@supports (aspect-ratio: 1) {
  .thumbnail { aspect-ratio: 16/9; }
}

@supports not (container-type: inline-size) {
  .sidebar { width: 240px; }
}`)}
  ${propTable([
    ['@supports (prop: value)', 'Browser supports property — apply nested rules'],
    ['@supports not (...)', 'Browser does NOT support — apply fallback'],
    ['@supports (A) and (B)', 'Both must be supported'],
    ['@supports (A) or (B)', 'Either one supported']
  ])}
</div>

<div class="section-title"><span class="num">2</span>Progressive Enhancement Patterns</div>
<div class="section-body">
  ${codeBlock('CSS — Grid with Flexbox Fallback', `.layout {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.layout > * {
  flex: 1 1 280px;
}

@supports (display: grid) {
  .layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }

  .layout > * { flex: unset; }
}`)}
  ${codeBlock('CSS — Modern Color Fallback', `.hero {
  background: #2563eb; /* fallback */
  background: oklch(54% 0.22 264); /* modern browsers */
}

@supports (color: color-mix(in srgb, red, blue)) {
  .hero-overlay {
    background: color-mix(in srgb, #2563eb 80%, transparent);
  }
}`)}
</div>

<div class="section-title"><span class="num">3</span>Production Testing &amp; Graceful Degradation</div>
<div class="section-body">
  <ul>
    <li><strong>caniuse.com</strong> — check feature support before using</li>
    <li><strong>BrowserStack / LambdaTest</strong> — test on real older browsers</li>
    <li><strong>Strategy:</strong> Base styles work everywhere → @supports adds enhancements</li>
    <li><strong>Never:</strong> @supports only block without fallback outside</li>
    <li><strong>CSS.supports() in JS:</strong> <code>CSS.supports('display', 'grid')</code> for dynamic loading</li>
  </ul>
</div>

${quiz([
  { q: '@supports media queries la work avuthundaa?', a: 'Similar concept — media queries check viewport/device, @supports checks CSS feature support in browser.' },
  { q: 'Progressive enhancement vs graceful degradation?', a: 'Progressive enhancement: base experience first, add features. Graceful degradation: full experience first, fallback for old browsers. PE is preferred modern approach.' }
])}

${recap([
  '@supports detects CSS feature support at runtime',
  'Always provide fallback styles OUTSIDE @supports block',
  'Use for Grid, container queries, oklch colors, nesting',
  'Test on caniuse.com and real devices before production',
  'Progressive enhancement = accessible to all, enhanced for modern browsers'
])}`
  }
];
