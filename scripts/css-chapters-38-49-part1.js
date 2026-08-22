const { codeBlock, propTable, learnBox, whyBox, mistakes, challenge, quiz, recap, outputBox } = require('./css-lesson-template');

module.exports = [
  {
    num: 38, file: '38-css-styling-forms.html',
    title: 'Styling Forms',
    metaTitle: 'CSS Form Styling — Inputs, Focus, Valid/Invalid & Error Messages | CSS Tutorial',
    desc: 'Complete guide to styling HTML forms with CSS: inputs, labels, textareas, select, checkbox, radio, range, file inputs, focus, valid/invalid, disabled, placeholder, layout and error messages.',
    phase: 'Phase 14: Forms & UI Components', phaseNum: 14,
    topics: 'Input Styling · Labels · Textareas · Select · Checkbox · Radio · Range · File · Focus · Valid/Invalid · Disabled · Placeholder · Form Layout · Error Messages',
    prev: { href: '37-css-themes.html', title: '37. Themes' },
    next: { href: '39-css-ui-components.html', title: '39. UI Components' },
    sections: `
${learnBox([
  'All major HTML form controls ni professional ga style cheyadam',
  ':focus-visible, :valid, :invalid, :disabled pseudo-classes use cheyadam',
  'Accessible labels, error messages, and touch-friendly input sizing',
  'Checkbox/radio custom styling and form layout patterns',
  'Placeholder styling and form validation visual feedback'
])}
${whyBox('Forms are the primary user interaction point for login, signup, checkout, and contact pages. Poor form styling leads to confusion, accessibility failures, and lost conversions. Professional CSS form styling — clear focus rings, validation colors, consistent spacing — builds user trust and meets WCAG guidelines.')}

<div class="section-title"><span class="num">1</span>Introduction — Forms Need Intentional CSS</div>
<div class="section-body">
  <p>Browser default form styles vary across Chrome, Firefox, Safari. Production apps lo consistent branding, accessible focus states, and validation feedback mandatory. CSS forms ni fully control chestundi — borders, padding, fonts, states, layout.</p>
</div>

<div class="section-title"><span class="num">2</span>Required HTML Structure</div>
<div class="section-body">
  ${codeBlock('HTML — Semantic Form', `<form class="signup-form" novalidate>
  <div class="form-group">
    <label for="email">Email address</label>
    <input type="email" id="email" name="email" placeholder="you@example.com" required>
    <span class="error-msg">Please enter a valid email.</span>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" name="password" minlength="8" required>
  </div>

  <div class="form-group">
    <label for="bio">Bio</label>
    <textarea id="bio" name="bio" rows="4" placeholder="Tell us about yourself"></textarea>
  </div>

  <div class="form-group">
    <label for="country">Country</label>
    <select id="country" name="country">
      <option value="">Select country</option>
      <option value="in">India</option>
      <option value="us">United States</option>
    </select>
  </div>

  <div class="form-group form-group--inline">
    <label class="checkbox-label">
      <input type="checkbox" name="terms" required>
      <span>I agree to the terms</span>
    </label>
  </div>

  <button type="submit" class="btn btn-primary">Create Account</button>
</form>`)}
  <p><strong>Key HTML rules:</strong> Every input needs a <code>&lt;label&gt;</code> with matching <code>for</code>/<code>id</code>. Use semantic <code>type</code> attributes for built-in validation.</p>
</div>

<div class="section-title"><span class="num">3</span>Base Input Styling &amp; CSS Syntax</div>
<div class="section-body">
  ${codeBlock('CSS — Form Base Styles', `.signup-form {
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px 14px;
  font-size: 1rem;
  font-family: inherit;
  color: #111827;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.form-group input:focus-visible,
.form-group textarea:focus-visible,
.form-group select:focus-visible {
  border-color: #2563eb;
  outline: 3px solid #bfdbfe;
  outline-offset: 0;
}

.form-group input:invalid:not(:placeholder-shown) {
  border-color: #dc2626;
}

.form-group input:valid:not(:placeholder-shown) {
  border-color: #16a34a;
}

.form-group input:disabled {
  background: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #9ca3af;
  opacity: 1;
}`)}
  ${propTable([
    ['padding: 10px 14px', 'Touch-friendly minimum 44px height achieve cheyadaniki'],
    [':focus-visible', 'Keyboard focus matrame ring show — mouse click ki ring ledu (better UX)'],
    [':invalid:not(:placeholder-shown)', 'User type chesaka matrame red border — empty field submit attempt ki'],
    ['::placeholder', 'Hint text color — opacity: 1 Firefox consistency ki'],
    [':disabled', 'Gray background + not-allowed cursor — clear visual feedback']
  ])}
</div>

<div class="section-title"><span class="num">4</span>Checkbox, Radio, Range &amp; File Inputs</div>
<div class="section-body">
  ${codeBlock('CSS — Custom Checkbox & Radio', `.checkbox-label,
.radio-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 500;
}

.checkbox-label input[type="checkbox"],
.radio-label input[type="radio"] {
  width: 18px;
  height: 18px;
  accent-color: #2563eb;
  cursor: pointer;
}

input[type="range"] {
  width: 100%;
  accent-color: #2563eb;
  cursor: pointer;
}

input[type="file"] {
  padding: 8px;
  font-size: 0.875rem;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  cursor: pointer;
}

input[type="file"]::file-selector-button {
  padding: 8px 16px;
  margin-right: 12px;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}`)}
  <p><strong>Modern approach:</strong> <code>accent-color</code> quickly brand checkboxes/radios. Full custom design ki hidden input + styled <code>::before</code> pseudo-element pattern use cheyochu.</p>
</div>

<div class="section-title"><span class="num">5</span>Error Messages &amp; Form Layout</div>
<div class="section-body">
  ${codeBlock('CSS — Error States', `.error-msg {
  display: none;
  font-size: 0.8125rem;
  color: #dc2626;
  font-weight: 500;
}

.form-group input:invalid:not(:placeholder-shown) ~ .error-msg {
  display: block;
}

/* Two-column form on desktop */
@media (min-width: 640px) {
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}`)}
  ${outputBox('Valid email type chesaka green border kanipistundi. Invalid email ki red border + error message below input. Tab key tho navigate cheste blue focus ring clear ga kanipistundi.')}
</div>

<div class="section-title"><span class="num">6</span>Responsive Form Example</div>
<div class="section-body">
  ${codeBlock('CSS — Mobile-First Form', `@media (max-width: 480px) {
  .signup-form {
    padding: 16px;
  }

  .form-group input,
  .form-group select {
    font-size: 16px; /* Prevents iOS zoom on focus */
    min-height: 48px;
  }

  .btn-primary {
    width: 100%;
    min-height: 48px;
  }
}`)}
  <p><strong>iOS tip:</strong> Inputs below <code>16px</code> font-size focus ayina auto-zoom trigger avuthundi — always use 16px+ on mobile.</p>
</div>

${mistakes([
  '<code>outline: none</code> without replacement — keyboard users focus kanipinchadu',
  'Color-only validation (red/green border without text) — colorblind users ki fail',
  'Placeholder as label substitute — accessibility violation',
  '<code>:invalid</code> on empty required fields immediately — use <code>:not(:placeholder-shown)</code>',
  'Tiny checkboxes/radios below 24px — hard to tap on mobile'
])}

${challenge('Styled Contact Form', `<form class="contact-form">
  <label for="name">Name</label>
  <input type="text" id="name" required placeholder="Your name">
  <label for="msg">Message</label>
  <textarea id="msg" rows="4" required></textarea>
  <button type="submit">Send</button>
</form>`, `.contact-form { max-width: 400px; display: flex; flex-direction: column; gap: 12px; }
.contact-form input, .contact-form textarea {
  padding: 12px; border: 1px solid #ccc; border-radius: 8px;
}
.contact-form input:focus-visible, .contact-form textarea:focus-visible {
  outline: 3px solid #bfdbfe; border-color: #2563eb;
}
.contact-form button {
  padding: 12px; background: #2563eb; color: #fff; border: none; border-radius: 8px;
}`, 'Add :invalid styling and a disabled submit button state using CSS only.')}

${quiz([
  { q: ':focus vs :focus-visible — difference enti?', a: ':focus triggers on any focus including mouse click. :focus-visible triggers mainly keyboard navigation ki — better UX without click rings.' },
  { q: 'Placeholder ni label ga use cheyadam enduku bad?', a: 'Placeholder disappears when user types. Screen readers and cognitive accessibility ki permanent visible label mandatory.' },
  { q: 'input:invalid eppudu apply avuthundi?', a: 'HTML5 constraint validation fail ayina — required empty, wrong email format, minlength not met, etc.' }
])}

${recap([
  'Semantic HTML + labels first — CSS styling second',
  ':focus-visible for accessible focus rings — never remove outline without replacement',
  ':valid/:invalid for visual validation feedback',
  'accent-color for quick checkbox/radio branding',
  '16px+ font-size on mobile inputs to prevent iOS zoom',
  'Error messages text tho communicate — color alone sufficient kaadu'
])}`
  },
  {
    num: 39, file: '39-css-ui-components.html',
    title: 'UI Components',
    metaTitle: 'CSS UI Components — Buttons, Cards, Modals, Nav & Tables | CSS Tutorial',
    desc: 'Build professional CSS UI components: buttons, cards, alerts, badges, navbars, sidebars, modals, dropdowns, tabs, accordions, tooltips, breadcrumbs, pagination, tables, and loading skeletons.',
    phase: 'Phase 14: Forms & UI Components', phaseNum: 14,
    topics: 'Buttons · Cards · Alerts · Badges · Navbars · Sidebars · Modals · Dropdowns · Tabs · Accordions · Tooltips · Breadcrumbs · Pagination · Tables · Skeletons',
    prev: { href: '38-css-styling-forms.html', title: '38. Styling Forms' },
    next: { href: '40-css-naming-and-organization.html', title: '40. CSS Naming & Organization' },
    sections: `
${learnBox([
  'Reusable button, card, alert, badge component patterns',
  'Navigation bar, sidebar, modal, dropdown CSS architecture',
  'Tabs, accordion, tooltip, breadcrumb, pagination styling',
  'Data table styling and loading skeleton animations',
  'Component-based CSS that scales across large projects'
])}
${whyBox('Modern websites are built from UI components — not individual pages. Learning to style buttons, cards, modals, and navbars with consistent CSS patterns is what separates beginner developers from professional frontend engineers.')}

<div class="section-title"><span class="num">1</span>Buttons — Primary, Secondary, Ghost</div>
<div class="section-body">
  ${codeBlock('CSS — Button System', `.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 0.9375rem;
  font-weight: 600;
  font-family: inherit;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: background 150ms, transform 150ms, box-shadow 150ms;
}

.btn-primary {
  background: #2563eb;
  color: #fff;
}

.btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
}

.btn-secondary {
  background: transparent;
  color: #2563eb;
  border-color: #2563eb;
}

.btn-ghost {
  background: transparent;
  color: #374151;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}`)}
</div>

<div class="section-title"><span class="num">2</span>Cards, Alerts &amp; Badges</div>
<div class="section-body">
  ${codeBlock('CSS — Card + Alert + Badge', `.card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  transition: box-shadow 200ms, transform 200ms;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  transform: translateY(-2px);
}

.alert {
  padding: 14px 18px;
  border-radius: 8px;
  border-left: 4px solid;
  font-size: 0.9375rem;
}

.alert--success { background: #f0fdf4; border-color: #16a34a; color: #166534; }
.alert--error   { background: #fef2f2; border-color: #dc2626; color: #991b1b; }
.alert--info    { background: #eff6ff; border-color: #2563eb; color: #1e40af; }

.badge {
  display: inline-block;
  padding: 2px 10px;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
}`)}
</div>

<div class="section-title"><span class="num">3</span>Navigation Bar &amp; Sidebar</div>
<div class="section-body">
  ${codeBlock('HTML + CSS — Navbar', `<nav class="navbar">
  <a href="/" class="navbar__brand">Our Compiler</a>
  <div class="navbar__links">
    <a href="/tutorials">Tutorials</a>
    <a href="/compiler">Compiler</a>
    <a href="/about">About</a>
  </div>
</nav>`, true)}
  ${codeBlock('CSS', `.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px 24px;
  background: #111827;
}

.navbar__brand {
  color: #fff;
  font-weight: 800;
  font-size: 1.125rem;
  text-decoration: none;
}

.navbar__links {
  display: flex;
  gap: 16px;
}

.navbar__links a {
  color: #d1d5db;
  text-decoration: none;
  font-weight: 500;
  transition: color 150ms;
}

.navbar__links a:hover { color: #fff; }

.sidebar {
  width: 240px;
  min-height: 100vh;
  background: #f9fafb;
  border-right: 1px solid #e5e7eb;
  padding: 20px 12px;
  position: sticky;
  top: 0;
}`)}
  ${propTable([
    ['display: flex', 'Navbar items horizontal row lo arrange'],
    ['justify-content: space-between', 'Brand left, links right'],
    ['gap: 24px', 'Items madhya consistent spacing'],
    ['position: sticky; top: 0', 'Sidebar scroll ayina top lo stick avuthundi']
  ])}
</div>

<div class="section-title"><span class="num">4</span>Modals, Dropdowns &amp; Tabs</div>
<div class="section-body">
  ${codeBlock('CSS — Modal Overlay', `.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}

.modal {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.tabs { display: flex; border-bottom: 2px solid #e5e7eb; gap: 0; }
.tab {
  padding: 12px 20px;
  background: none;
  border: none;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}
.tab--active { color: #2563eb; border-bottom-color: #2563eb; }`)}
</div>

<div class="section-title"><span class="num">5</span>Accordion, Tables &amp; Loading Skeletons</div>
<div class="section-body">
  ${codeBlock('CSS — Accordion + Table + Skeleton', `.accordion-item { border-bottom: 1px solid #e5e7eb; }
.accordion-trigger {
  width: 100%; padding: 16px; background: none; border: none;
  text-align: left; font-weight: 600; cursor: pointer;
  display: flex; justify-content: space-between;
}
.accordion-content { padding: 0 16px 16px; color: #4b5563; }

.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td {
  padding: 12px 16px; text-align: left; border-bottom: 1px solid #e5e7eb;
}
.data-table th { background: #f9fafb; font-weight: 700; font-size: 0.8125rem; text-transform: uppercase; }
.data-table tr:hover td { background: #f9fafb; }

.skeleton {
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
  height: 20px;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`)}
</div>

${mistakes([
  'Modal without focus trap — keyboard users escape cheyaleru',
  'Dropdown hover-only — touch devices lo work avvadu',
  'Table without horizontal scroll on mobile — content clip avuthundi',
  'Skeleton animation without prefers-reduced-motion check',
  'Inconsistent border-radius across components — unprofessional look'
])}

${challenge('Pricing Card Component', `<div class="pricing-card">
  <span class="badge">Popular</span>
  <h3>Pro Plan</h3>
  <p class="price">₹499/mo</p>
  <ul><li>All courses</li><li>Compiler access</li></ul>
  <button class="btn btn-primary">Get Started</button>
</div>`, `.pricing-card {
  border: 2px solid #2563eb; border-radius: 16px; padding: 32px;
  display: flex; flex-direction: column; gap: 16px; text-align: center;
}
.price { font-size: 2.5rem; font-weight: 800; color: #2563eb; }`, 'Add hover elevation effect and a featured badge positioned at top-right.')}

${quiz([
  { q: 'Modal overlay ki position: fixed enduku use chestam?', a: 'Viewport ki relative ga full screen cover cheyadaniki — scroll ayina overlay fixed ga untundi.' },
  { q: 'Loading skeleton purpose enti?', a: 'Content load avuthunna time lo placeholder UI show chestundi — perceived performance improve avuthundi.' }
])}

${recap([
  'Component CSS = reusable patterns with consistent tokens (radius, spacing, colors)',
  'BEM naming: .navbar, .navbar__links, .navbar__brand',
  'Modals need overlay + centered content + z-index stacking',
  'Tables: collapse borders, hover rows, responsive overflow-x scroll',
  'Skeleton loaders improve perceived loading speed'
])}`
  }
];
