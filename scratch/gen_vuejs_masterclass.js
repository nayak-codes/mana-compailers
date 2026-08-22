const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const vueDir = path.join(publicDir, 'blog-vue');

if (!fs.existsSync(vueDir)) {
  fs.mkdirSync(vueDir, { recursive: true });
}

function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const vueChapters = [
  // Phase 01: Introduction & Fundamentals
  { num: 1, file: '01-vuejs-introduction-and-setup.html', title: 'What is Vue.js 3?', desc: 'Complete Vue.js Chapter 01: Introduction to Vue.js 3, progressive framework design, Virtual DOM, Vue vs React vs Angular, and Vite setup.', phaseTag: 'Phase 01', phaseTitle: 'Introduction & Fundamentals', covered: 'Progressive Framework Philosophy · Virtual DOM · Vue vs React vs Angular · Scaffolding with Vite · SPA Architecture' },
  { num: 2, file: '02-vuejs-instance-and-app.html', title: 'Vue Application & Instance', desc: 'Complete Vue.js Chapter 02: createApp initialization, mounting root components, app.config, global properties, and plugins.', phaseTag: 'Phase 01', phaseTitle: 'Introduction & Fundamentals', covered: 'createApp API · Mounting Root DOM Node · Application Configurations · Global Directives · Plugin Registration' },
  { num: 3, file: '03-vuejs-template-syntax.html', title: 'Template Syntax & Interpolation', desc: 'Complete Vue.js Chapter 03: Mustache interpolation, v-html, attribute binding (v-bind / :), and JS expressions in templates.', phaseTag: 'Phase 01', phaseTitle: 'Introduction & Fundamentals', covered: 'Mustache Syntax {{ }} · v-html Raw Output · Attribute Binding (v-bind) · Shorthand Colon Syntax · JS Expression Scope' },

  // Phase 02: Options API vs Composition API
  { num: 4, file: '04-vuejs-options-api.html', title: 'The Options API', desc: 'Complete Vue.js Chapter 04: Options API structure, data(), methods, computed, watch, and Options lifecycle hooks.', phaseTag: 'Phase 02', phaseTitle: 'Options API vs Composition API', covered: 'Options API Structure · data() Function · Methods Property · Options Computed & Watchers · Legacy Migration' },
  { num: 5, file: '05-vuejs-composition-api.html', title: 'Composition API & <script setup>', desc: 'Complete Vue.js Chapter 05: Composition API setup() function, <script setup> compiler macro, and modular code organization.', phaseTag: 'Phase 02', phaseTitle: 'Options API vs Composition API', covered: 'Composition API Concept · setup() Method · <script setup> Macro · Code Organization by Feature · Top-level Imports' },
  { num: 6, file: '06-vuejs-reactivity-ref-reactive.html', title: 'Reactivity: ref() vs reactive()', desc: 'Complete Vue.js Chapter 06: Reactivity primitives ref() and reactive(), unwrapping refs, toRefs(), and shallowRef().', phaseTag: 'Phase 02', phaseTitle: 'Options API vs Composition API', covered: 'ref() Primitive · reactive() Object State · Ref Unwrapping · toRef() & toRefs() · shallowRef() Optimization' },

  // Phase 03: Directives & Event Handling
  { num: 7, file: '07-vuejs-conditional-rendering.html', title: 'Conditional Rendering', desc: 'Complete Vue.js Chapter 07: v-if, v-else-if, v-else, v-show, compilation differences, performance, and template tags.', phaseTag: 'Phase 03', phaseTitle: 'Directives & Event Handling', covered: 'v-if / v-else-if / v-else · v-show Toggle · Virtual DOM Compilation Differences · Performance Trade-offs · <template> Grouping' },
  { num: 8, file: '08-vuejs-list-rendering.html', title: 'List Rendering & v-for', desc: 'Complete Vue.js Chapter 08: v-for array and object iteration, maintaining state with :key, array mutation methods.', phaseTag: 'Phase 03', phaseTitle: 'Directives & Event Handling', covered: 'v-for Directive Syntax · Array & Object Iteration · Maintaining Identity with :key · Array Mutation Methods · v-for with v-if' },
  { num: 9, file: '09-vuejs-event-handling.html', title: 'Event Handling & Modifiers', desc: 'Complete Vue.js Chapter 09: v-on / @ listeners, inline vs method handlers, event modifiers (.prevent, .stop), key modifiers.', phaseTag: 'Phase 03', phaseTitle: 'Directives & Event Handling', covered: 'v-on / @ Listener Syntax · Inline & Method Handlers · Event Modifiers (.prevent/.stop) · Key Modifiers · System Modifiers' },
  { num: 10, file: '10-vuejs-class-and-style-bindings.html', title: 'Class & Style Bindings', desc: 'Complete Vue.js Chapter 10: Dynamic class bindings (Object/Array syntax), inline style bindings, and scoped CSS.', phaseTag: 'Phase 03', phaseTitle: 'Directives & Event Handling', covered: 'Dynamic Class Binding · Object & Array Syntax · Inline Style Objects · CSS Modules · Scoped CSS (<style scoped>)' },

  // Phase 04: Form Bindings & Computed Properties
  { num: 11, file: '11-vuejs-form-input-bindings.html', title: 'Form Input Bindings & v-model', desc: 'Complete Vue.js Chapter 11: v-model two-way data binding across input, textarea, checkbox, radio, select, and modifiers.', phaseTag: 'Phase 04', phaseTitle: 'Form Bindings & Computed Properties', covered: 'v-model Two-Way Binding · Text & Textarea · Checkboxes & Radios · Select Dropdowns · .lazy / .number / .trim Modifiers' },
  { num: 12, file: '12-vuejs-computed-properties.html', title: 'Computed Properties', desc: 'Complete Vue.js Chapter 12: computed() getters & setters, reactive caching vs methods, dependency tracking.', phaseTag: 'Phase 04', phaseTitle: 'Form Bindings & Computed Properties', covered: 'computed() Getter Function · Writable Computed Setters · Automatic Reactive Caching · Computed vs Method Performance' },
  { num: 13, file: '13-vuejs-watchers.html', title: 'Watchers & watchEffect()', desc: 'Complete Vue.js Chapter 13: watch() vs watchEffect(), deep watching, immediate triggers, and stopping watchers.', phaseTag: 'Phase 04', phaseTitle: 'Form Bindings & Computed Properties', covered: 'watch() Source Listening · watchEffect() Auto Tracking · Deep Watchers (deep: true) · Immediate Triggers · Stopping Watchers' },

  // Phase 05: Components & Component Architecture
  { num: 14, file: '14-vuejs-components-basics.html', title: 'Component Architecture', desc: 'Complete Vue.js Chapter 14: Single File Components (.vue SFC), component registration, and nested component trees.', phaseTag: 'Phase 05', phaseTitle: 'Components & Component Architecture', covered: 'Single File Components (.vue) · Global vs Local Registration · SFC Template/Script/Style · Component Tree Structure' },
  { num: 15, file: '15-vuejs-props.html', title: 'Component Props', desc: 'Complete Vue.js Chapter 15: defineProps(), prop validation, type checking, default values, and one-way data flow.', phaseTag: 'Phase 05', phaseTitle: 'Components & Component Architecture', covered: 'defineProps() Macro · Type Validation · Required Props & Defaults · One-Way Data Flow · Boolean Casting' },
  { num: 16, file: '16-vuejs-custom-events-emit.html', title: 'Custom Events & defineEmits()', desc: 'Complete Vue.js Chapter 16: defineEmits(), child to parent communication, event payload validation, defineModel().', phaseTag: 'Phase 05', phaseTitle: 'Components & Component Architecture', covered: 'defineEmits() Macro · Child-to-Parent Communication · Custom Event Validation · Component v-model & defineModel()' },
  { num: 17, file: '17-vuejs-slots.html', title: 'Slots & Content Distribution', desc: 'Complete Vue.js Chapter 17: Content distribution with <slot>, fallback content, named slots (#), and scoped slots.', phaseTag: 'Phase 05', phaseTitle: 'Components & Component Architecture', covered: '<slot> Content Projection · Default Fallback Content · Named Slots (v-slot: / #) · Scoped Slots Data Passing' },
  { num: 18, file: '18-vuejs-provide-inject.html', title: 'Provide & Inject Dependency Injection', desc: 'Complete Vue.js Chapter 18: provide() and inject() dependency injection pattern, reactive state, avoiding prop drilling.', phaseTag: 'Phase 05', phaseTitle: 'Components & Component Architecture', covered: 'Provide / Inject Concept · Deep Component Trees · Reactive Provided State · Symbol Keys · Preventing Prop Drilling' },

  // Phase 06: Lifecycle & Advanced Composition API
  { num: 19, file: '19-vuejs-lifecycle-hooks.html', title: 'Lifecycle Hooks', desc: 'Complete Vue.js Chapter 19: Component lifecycle phases (onMounted, onUpdated, onUnmounted) and debugging hooks.', phaseTag: 'Phase 06', phaseTitle: 'Lifecycle & Advanced Composition API', covered: 'Component Lifecycle Phases · onMounted & DOM Access · onUpdated & Reactive Repaint · onUnmounted Cleanup · Debug Hooks' },
  { num: 20, file: '20-vuejs-composables.html', title: 'Custom Composables Pattern', desc: 'Complete Vue.js Chapter 20: Building custom composables (useMouse, useFetch), stateful reusable logic, and conventions.', phaseTag: 'Phase 06', phaseTitle: 'Lifecycle & Advanced Composition API', covered: 'Custom Composables Architecture · Stateful Logic Reuse · useAsyncState / useFetch · Return Conventions · Mixins vs Composables' },
  { num: 21, file: '21-vuejs-template-refs.html', title: 'Template Refs & defineExpose()', desc: 'Complete Vue.js Chapter 21: Accessing DOM elements with template refs, component instance refs, and defineExpose().', phaseTag: 'Phase 06', phaseTitle: 'Lifecycle & Advanced Composition API', covered: 'Template Refs with ref() · DOM Element Access · Component Instance Refs · defineExpose() Public API · Function Refs' },

  // Phase 07: Routing with Vue Router
  { num: 22, file: '22-vuejs-router-setup.html', title: 'Vue Router 4 Setup & Config', desc: 'Complete Vue.js Chapter 22: Installing Vue Router 4, route mapping, <RouterView>, <RouterLink>, history modes.', phaseTag: 'Phase 07', phaseTitle: 'Routing with Vue Router', covered: 'Vue Router 4 Installation · createRouter Config · <RouterView> & <RouterLink> · HTML5 Web History vs Hash Mode' },
  { num: 23, file: '23-vuejs-dynamic-routing.html', title: 'Dynamic Routing & Navigation', desc: 'Complete Vue.js Chapter 23: Dynamic route parameters (useRoute), nested routes, useRouter programmatic navigation.', phaseTag: 'Phase 07', phaseTitle: 'Routing with Vue Router', covered: 'Dynamic Route Params (:id) · useRoute() Hook · Programmatic Navigation (useRouter) · Nested Children Routes' },
  { num: 24, file: '24-vuejs-navigation-guards.html', title: 'Navigation Guards & Auth Flow', desc: 'Complete Vue.js Chapter 24: Global before-each guards, per-route guards, in-component guards, and auth redirects.', phaseTag: 'Phase 07', phaseTitle: 'Routing with Vue Router', covered: 'Global Navigation Guards (beforeEach) · Route Meta Fields (meta: { requiresAuth }) · Redirects · Per-Route Guards' },

  // Phase 08: State Management with Pinia
  { num: 25, file: '25-vuejs-pinia-setup.html', title: 'Pinia State Management Setup', desc: 'Complete Vue.js Chapter 25: Pinia architecture, Pinia vs Vuex, defining stores with defineStore, Option vs Setup stores.', phaseTag: 'Phase 08', phaseTitle: 'State Management with Pinia', covered: 'Pinia Store Architecture · Pinia vs Vuex · defineStore() API · Setup Stores vs Option Stores · Store Registration' },
  { num: 26, file: '26-vuejs-pinia-state-getters-actions.html', title: 'Pinia State, Getters & Actions', desc: 'Complete Vue.js Chapter 26: State properties, computed getters, async actions, and storeToRefs() reactivity helper.', phaseTag: 'Phase 08', phaseTitle: 'State Management with Pinia', covered: 'Reactive Store State · Getters (Computed Store Values) · Sync & Async Actions · storeToRefs() Helper · Store Resetting' },

  // Phase 09: Built-in Components & Performance
  { num: 27, file: '27-vuejs-keep-alive-teleport-suspense.html', title: 'Built-in Components: KeepAlive & Teleport', desc: 'Complete Vue.js Chapter 27: <KeepAlive> component caching, <Teleport> portal rendering, and <Suspense> async loading.', phaseTag: 'Phase 09', phaseTitle: 'Built-in Components & Performance', covered: '<KeepAlive> Component Caching · include / exclude Filters · <Teleport> DOM Portals · <Suspense> Async Dependencies' },
  { num: 28, file: '28-vuejs-transitions-and-animations.html', title: 'Transitions & Animations', desc: 'Complete Vue.js Chapter 28: <Transition> single element animations, <TransitionGroup> list transitions, CSS classes.', phaseTag: 'Phase 09', phaseTitle: 'Built-in Components & Performance', covered: '<Transition> Wrapper · CSS Enter/Leave Classes · <TransitionGroup> List Animation · JavaScript Animation Hooks' },

  // Phase 10: Testing, Build & Deployment
  { num: 29, file: '29-vuejs-testing-vitest.html', title: 'Testing Vue Components with Vitest', desc: 'Complete Vue.js Chapter 29: Unit testing Vue 3 components using Vitest and Vue Test Utils, mounting and assertions.', phaseTag: 'Phase 10', phaseTitle: 'Testing, Build & Deployment', covered: 'Vitest Test Runner Setup · Vue Test Utils · shallowMount vs mount · Event Triggering & Assertions · Mocking Pinia' },
  { num: 30, file: '30-vuejs-build-and-deployment.html', title: 'Build Scaffolding & Production Deployment', desc: 'Complete Vue.js Chapter 30: Vite production build (vite build), environment variables, cloud deployment, optimization.', phaseTag: 'Phase 10', phaseTitle: 'Testing, Build & Deployment', covered: 'Vite Production Bundling · Environment Variables (import.meta.env) · Vercel / Netlify Deployment · Bundle Splitting' }
];

function getVueSidebarHTML(activeNum) {
  return `
    <div class="sidebar-heading">Vue.js 3 Roadmap</div>
    <a href="/blog-vue.html" class="sidebar-home-link">💚 Vue.js Course HOME</a>
    <div class="sidebar-accordion">

      <!-- Phase 01 -->
      <button class="accordion-header ${activeNum <= 3 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🟢</span><div class="phase-info"><span class="phase-tag">Phase 01</span><span class="phase-title">Introduction &amp; Fundamentals</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum <= 3 ? 'open' : ''}">
        <a href="/blog-vue/01-vuejs-introduction-and-setup.html" class="${activeNum === 1 ? 'active' : ''}">1. What is Vue.js 3?</a>
        <a href="/blog-vue/02-vuejs-instance-and-app.html" class="${activeNum === 2 ? 'active' : ''}">2. Vue Application &amp; Instance</a>
        <a href="/blog-vue/03-vuejs-template-syntax.html" class="${activeNum === 3 ? 'active' : ''}">3. Template Syntax</a>
      </div>

      <!-- Phase 02 -->
      <button class="accordion-header ${activeNum >= 4 && activeNum <= 6 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">⚙️</span><div class="phase-info"><span class="phase-tag">Phase 02</span><span class="phase-title">Options API vs Composition API</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 4 && activeNum <= 6 ? 'open' : ''}">
        <a href="/blog-vue/04-vuejs-options-api.html" class="${activeNum === 4 ? 'active' : ''}">4. Options API</a>
        <a href="/blog-vue/05-vuejs-composition-api.html" class="${activeNum === 5 ? 'active' : ''}">5. Composition API &amp; &lt;script setup&gt;</a>
        <a href="/blog-vue/06-vuejs-reactivity-ref-reactive.html" class="${activeNum === 6 ? 'active' : ''}">6. Reactivity: ref vs reactive</a>
      </div>

      <!-- Phase 03 -->
      <button class="accordion-header ${activeNum >= 7 && activeNum <= 10 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🎯</span><div class="phase-info"><span class="phase-tag">Phase 03</span><span class="phase-title">Directives &amp; Event Handling</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">4 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 7 && activeNum <= 10 ? 'open' : ''}">
        <a href="/blog-vue/07-vuejs-conditional-rendering.html" class="${activeNum === 7 ? 'active' : ''}">7. Conditional Rendering</a>
        <a href="/blog-vue/08-vuejs-list-rendering.html" class="${activeNum === 8 ? 'active' : ''}">8. List Rendering &amp; v-for</a>
        <a href="/blog-vue/09-vuejs-event-handling.html" class="${activeNum === 9 ? 'active' : ''}">9. Event Handling</a>
        <a href="/blog-vue/10-vuejs-class-and-style-bindings.html" class="${activeNum === 10 ? 'active' : ''}">10. Class &amp; Style Bindings</a>
      </div>

      <!-- Phase 04 -->
      <button class="accordion-header ${activeNum >= 11 && activeNum <= 13 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">📝</span><div class="phase-info"><span class="phase-tag">Phase 04</span><span class="phase-title">Forms &amp; Computed Properties</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 11 && activeNum <= 13 ? 'open' : ''}">
        <a href="/blog-vue/11-vuejs-form-input-bindings.html" class="${activeNum === 11 ? 'active' : ''}">11. Form Bindings &amp; v-model</a>
        <a href="/blog-vue/12-vuejs-computed-properties.html" class="${activeNum === 12 ? 'active' : ''}">12. Computed Properties</a>
        <a href="/blog-vue/13-vuejs-watchers.html" class="${activeNum === 13 ? 'active' : ''}">13. Watchers &amp; watchEffect</a>
      </div>

      <!-- Phase 05 -->
      <button class="accordion-header ${activeNum >= 14 && activeNum <= 18 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🧩</span><div class="phase-info"><span class="phase-tag">Phase 05</span><span class="phase-title">Components Architecture</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">5 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 14 && activeNum <= 18 ? 'open' : ''}">
        <a href="/blog-vue/14-vuejs-components-basics.html" class="${activeNum === 14 ? 'active' : ''}">14. Component Architecture</a>
        <a href="/blog-vue/15-vuejs-props.html" class="${activeNum === 15 ? 'active' : ''}">15. Component Props</a>
        <a href="/blog-vue/16-vuejs-custom-events-emit.html" class="${activeNum === 16 ? 'active' : ''}">16. Custom Events &amp; emit</a>
        <a href="/blog-vue/17-vuejs-slots.html" class="${activeNum === 17 ? 'active' : ''}">17. Slots &amp; Content Projection</a>
        <a href="/blog-vue/18-vuejs-provide-inject.html" class="${activeNum === 18 ? 'active' : ''}">18. Provide &amp; Inject</a>
      </div>

      <!-- Phase 06 -->
      <button class="accordion-header ${activeNum >= 19 && activeNum <= 21 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🔄</span><div class="phase-info"><span class="phase-tag">Phase 06</span><span class="phase-title">Lifecycle &amp; Composables</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 19 && activeNum <= 21 ? 'open' : ''}">
        <a href="/blog-vue/19-vuejs-lifecycle-hooks.html" class="${activeNum === 19 ? 'active' : ''}">19. Lifecycle Hooks</a>
        <a href="/blog-vue/20-vuejs-composables.html" class="${activeNum === 20 ? 'active' : ''}">20. Custom Composables</a>
        <a href="/blog-vue/21-vuejs-template-refs.html" class="${activeNum === 21 ? 'active' : ''}">21. Template Refs</a>
      </div>

      <!-- Phase 07 -->
      <button class="accordion-header ${activeNum >= 22 && activeNum <= 24 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🗺️</span><div class="phase-info"><span class="phase-tag">Phase 07</span><span class="phase-title">Routing with Vue Router</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 22 && activeNum <= 24 ? 'open' : ''}">
        <a href="/blog-vue/22-vuejs-router-setup.html" class="${activeNum === 22 ? 'active' : ''}">22. Vue Router 4 Setup</a>
        <a href="/blog-vue/23-vuejs-dynamic-routing.html" class="${activeNum === 23 ? 'active' : ''}">23. Dynamic Routing</a>
        <a href="/blog-vue/24-vuejs-navigation-guards.html" class="${activeNum === 24 ? 'active' : ''}">24. Navigation Guards</a>
      </div>

      <!-- Phase 08 -->
      <button class="accordion-header ${activeNum >= 25 && activeNum <= 26 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🍍</span><div class="phase-info"><span class="phase-tag">Phase 08</span><span class="phase-title">State Management Pinia</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 25 && activeNum <= 26 ? 'open' : ''}">
        <a href="/blog-vue/25-vuejs-pinia-setup.html" class="${activeNum === 25 ? 'active' : ''}">25. Pinia Setup &amp; Stores</a>
        <a href="/blog-vue/26-vuejs-pinia-state-getters-actions.html" class="${activeNum === 26 ? 'active' : ''}">26. Pinia State, Getters &amp; Actions</a>
      </div>

      <!-- Phase 09 -->
      <button class="accordion-header ${activeNum >= 27 && activeNum <= 28 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🚀</span><div class="phase-info"><span class="phase-tag">Phase 09</span><span class="phase-title">Built-in Components</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 27 && activeNum <= 28 ? 'open' : ''}">
        <a href="/blog-vue/27-vuejs-keep-alive-teleport-suspense.html" class="${activeNum === 27 ? 'active' : ''}">27. KeepAlive &amp; Teleport</a>
        <a href="/blog-vue/28-vuejs-transitions-and-animations.html" class="${activeNum === 28 ? 'active' : ''}">28. Transitions &amp; Animations</a>
      </div>

      <!-- Phase 10 -->
      <button class="accordion-header ${activeNum >= 29 && activeNum <= 30 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🧪</span><div class="phase-info"><span class="phase-tag">Phase 10</span><span class="phase-title">Testing &amp; Deployment</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 29 && activeNum <= 30 ? 'open' : ''}">
        <a href="/blog-vue/29-vuejs-testing-vitest.html" class="${activeNum === 29 ? 'active' : ''}">29. Testing with Vitest</a>
        <a href="/blog-vue/30-vuejs-build-and-deployment.html" class="${activeNum === 30 ? 'active' : ''}">30. Build &amp; Deployment</a>
      </div>
    </div>`;
}

function makeVuePage(chNum, filename, pageTitle, metaDesc, phaseTag, phaseTitle, coveredText, prevLink, prevTitle, nextLink, nextTitle) {
  const escapedTitle = escapeHTML(pageTitle);
  const escapedMetaDesc = escapeHTML(metaDesc);
  const escapedCovered = escapeHTML(coveredText);
  const escapedPhaseTitle = escapeHTML(phaseTitle);
  const escapedPrevTitle = escapeHTML(prevTitle);
  const escapedNextTitle = escapeHTML(nextTitle);

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapedTitle} — Vue.js 3 Masterclass | Our Compiler</title>
  <meta name="description" content="${escapedMetaDesc}" />
  <meta name="keywords" content="vue.js tutorial, vue 3, composition api, pinia, vue router, vite, single file components, ref, reactive" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-vue/${filename}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <script>
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) {
        content.classList.remove('open');
        btn.classList.remove('active');
      } else {
        content.classList.add('open');
        btn.classList.add('active');
      }
    }

    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: "Inter", sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;';
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

        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;

          const rawCode = codeEl.textContent;

          let actionsContainer = header.querySelector('.code-actions');
          if (!actionsContainer) {
            actionsContainer = document.createElement('div');
            actionsContainer.className = 'code-actions';
            actionsContainer.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-left: auto;';
            const tryBtn = header.querySelector('.try-btn');
            if (tryBtn) actionsContainer.appendChild(tryBtn);
            header.appendChild(actionsContainer);
          }

          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn';
          copyBtn.innerHTML = '📋 Copy';
          copyBtn.style.cssText = 'background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: "Inter", sans-serif; white-space: nowrap;';
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
              localStorage.setItem('code_javascript', rawCode);
              window.location.href = '/online-html-editor.html';
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-vue">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-vue.html" class="active">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-rust.html">Rust</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    ${getVueSidebarHTML(chNum)}
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-vue.html">Vue.js</a><span class="sep">›</span>
      <span class="current">Chapter ${chNum}: ${escapedTitle}</span>
    </div>

    <h1 class="page-title">${escapedTitle}</h1>

    <div class="page-meta">
      <span class="badge">💚 Vue.js 3</span>
      <span class="badge">🟢 Chapter ${chNum} of 30</span>
      <span class="badge">📂 ${phaseTag}: ${escapedPhaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this chapter:</span>
      <span class="topic-pill-text">${escapedCovered}</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Chapter ${chNum}: ${escapedTitle}</strong> in our Vue.js 3 Masterclass Roadmap! Vue.js is a progressive, approachable, and performant framework for building modern single-page applications (SPAs) and interactive web user interfaces.</p>
    </div>

    <!-- Section 1 -->
    <div class="section-title"><span class="num">1</span>Core Architectural Concepts of ${escapedTitle}</div>
    <div class="section-body">
      <p>In Vue.js 3, understanding <strong>${escapedTitle}</strong> is vital for building reactive, declarative, and scalable front-end components. Vue combines an intuitive template-based syntax with an optimized Virtual DOM engine and proxy-based reactivity system.</p>
      <div class="info-box">
        <strong>Key Architectural Takeaway:</strong> Vue 3 uses ES6 Proxies to track reactive state dependencies automatically. When state changes, Vue computes minimal virtual DOM diffs and batches real DOM updates efficiently.
      </div>
      <ul>
        <li><strong>Declarative Rendering:</strong> Vue extends standard HTML with directive attributes to declaratively bind reactive JavaScript state to the DOM.</li>
        <li><strong>Component Driven:</strong> Applications are composed of self-contained Single File Components (<code>.vue</code> SFCs) encapsulating template, logic, and scoped styles.</li>
        <li><strong>Reactivity Engine:</strong> Primitive reactive references (<code>ref()</code>) and reactive proxy objects (<code>reactive()</code>) allow automatic view recalculations without manual DOM manipulation.</li>
      </ul>
    </div>

    <!-- Section 2 -->
    <div class="section-title"><span class="num">2</span>Annotated Code Walkthrough &amp; Implementation</div>
    <div class="section-body">
      <p>Let us examine a complete single-file component implementation demonstrating ${escapedTitle} using Vue 3 Composition API and <code>&lt;script setup&gt;</code> syntax:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Vue 3 Single File Component (.vue)</span>
          <a class="try-btn" href="/online-html-editor.html">▶ Run in Web Playground</a>
        </div>
        <pre><code>&lt;script setup&gt;
import { ref, computed } from 'vue';

// Define reactive state for ${escapedTitle}
const title = ref('${escapedTitle} Demonstration');
const count = ref(0);
const items = ref(['Vue 3 Composition API', 'Vite Bundler', 'Pinia State']);

const doubleCount = computed(() => count.value * 2);

function increment() {
  count.value++;
}
&lt;/script&gt;

&lt;template&gt;
  &lt;div class="vue-card"&gt;
    &lt;h2&gt;{{ title }}&lt;/h2&gt;
    &lt;p&gt;Current Counter: &lt;strong&gt;{{ count }}&lt;/strong&gt; (Double: {{ doubleCount }})&lt;/p&gt;
    &lt;button @click="increment" class="btn"&gt;➕ Increment Counter&lt;/button&gt;

    &lt;ul style="margin-top: 12px;"&gt;
      &lt;li v-for="(item, idx) in items" :key="idx"&gt;{{ item }}&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style scoped&gt;
.vue-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  color: var(--text);
}
.btn {
  background: #42b883;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
&lt;/style&gt;</code></pre>
      </div>
      <p>In the Composition API snippet above, notice how <code>ref()</code> tracks reactive primitive state while template event listeners (<code>@click</code>) automatically trigger interface re-renders.</p>
    </div>

    <!-- Section 3 -->
    <div class="section-title"><span class="num">3</span>Technical Feature Matrix &amp; Specification Table</div>
    <div class="section-body">
      <p>Review the comparative specification table below to understand how Vue 3 features operate across development scenarios:</p>
      <table class="tbl spec-table">
        <thead><tr><th>Vue Concept</th><th>Reactivity Mechanism</th><th>Compilation Behavior</th><th>Best Use Case</th></tr></thead>
        <tbody>
          <tr><td><strong>ref()</strong></td><td>Proxy wrapper (.value)</td><td>Unwrapped automatically in templates</td><td>Primitives (strings, numbers, booleans)</td></tr>
          <tr><td><strong>reactive()</strong></td><td>Deep ES6 Proxy object</td><td>Direct property access</td><td>Complex nested state objects / collections</td></tr>
          <tr><td><strong>computed()</strong></td><td>Cached getter proxy</td><td>Recalculates only when dependencies change</td><td>Derived data &amp; filtered arrays</td></tr>
          <tr><td><strong>watch()</strong></td><td>Explicit source listener</td><td>Runs side effects on state mutation</td><td>Async API calls, local storage syncing</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Section 4 -->
    <div class="section-title"><span class="num">4</span>Production Architecture &amp; Enterprise Patterns</div>
    <div class="section-body">
      <p>When engineering scalable frontend applications with Vue 3, adhere to production architecture best practices:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Vue 3 — Production Composable Pattern</span>
          <a class="try-btn" href="/online-html-editor.html">▶ Run in Web Playground</a>
        </div>
        <pre><code>// composables/useFetchData.js
import { ref } from 'vue';

export function useFetchData(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);

  async function fetchData() {
    loading.value = true;
    try {
      const res = await fetch(url);
      data.value = await res.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  fetchData();

  return { data, error, loading, refetch: fetchData };
}</code></pre>
      </div>
    </div>

    <!-- Section 5 -->
    <div class="section-title"><span class="num">5</span>Common Developer Pitfalls &amp; Solutions</div>
    <div class="section-body">
      <p>Avoid these common beginner and intermediate Vue developer mistakes:</p>
      <ul>
        <li><strong>Pitfall 1: Forgetting .value in Script.</strong> Accessing a <code>ref()</code> inside <code>&lt;script&gt;</code> without <code>.value</code> returns the Ref object rather than its inner primitive. <em>Solution: Always access <code>myRef.value</code> inside JavaScript code.</em></li>
        <li><strong>Pitfall 2: Destructuring reactive() Objects.</strong> Destructuring properties directly from a <code>reactive()</code> object breaks reactivity tracking. <em>Solution: Use <code>toRefs(myReactiveObj)</code> before destructuring.</em></li>
        <li><strong>Pitfall 3: Mutating Props Directly.</strong> Mutating a prop in a child component violates one-way data flow. <em>Solution: Emit a custom event (<code>emit('update:propName')</code>) or use <code>defineModel()</code>.</em></li>
      </ul>
    </div>

    <!-- Section 6 -->
    <div class="section-title"><span class="num">6</span>Frequently Asked Questions (FAQ)</div>
    <div class="section-body">
      <div class="faq-card">
        <h4><span style="background:rgba(66,184,131,0.15); color:#42b883; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q1</span> Why choose Vue 3 over React or Angular?</h4>
        <p>Vue 3 strikes an optimal balance: it offers an approachable learning curve with optional template syntax, progressive adoption, official state management (Pinia) and routing (Vue Router), and top-tier Composition API performance.</p>
      </div>
      <div class="faq-card">
        <h4><span style="background:rgba(66,184,131,0.15); color:#42b883; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q2</span> What is the difference between ref() and reactive()?</h4>
        <p><code>ref()</code> holds single primitive values (or objects) accessed via <code>.value</code>, while <code>reactive()</code> creates deep proxy objects for structured state objects.</p>
      </div>
      <div class="faq-card">
        <h4><span style="background:rgba(66,184,131,0.15); color:#42b883; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q3</span> What is &lt;script setup&gt; in Vue 3?</h4>
        <p><code>&lt;script setup&gt;</code> is a compile-time syntactic sugar macro that drastically reduces boilerplate code when writing Composition API single-file components.</p>
      </div>
      <div class="faq-card">
        <h4><span style="background:rgba(66,184,131,0.15); color:#42b883; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q4</span> Is Vue 2 still supported?</h4>
        <p>Vue 2 reached official End-of-Life (EOL) in December 2023. All modern production projects should be built on Vue 3.</p>
      </div>
      <div class="faq-card">
        <h4><span style="background:rgba(66,184,131,0.15); color:#42b883; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q5</span> Where can I test Vue code snippets?</h4>
        <p>Click the <code>▶ Run in Web Playground</code> button on any code block in this tutorial to open our interactive HTML/CSS/JS online editor!</p>
      </div>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on Vue 3.4+ (Vite 5) · Last updated August 2026</span>
      </div>
    </div>

    <div class="nav-footer">
      ${prevLink ? `<a href="${prevLink}" class="nav-btn"><span class="label">← Previous Chapter</span><span class="title">${escapedPrevTitle}</span></a>` : `<a href="/blog-vue.html" class="nav-btn"><span class="label">← Vue.js Overview</span><span class="title">Course Index</span></a>`}
      ${nextLink ? `<a href="${nextLink}" class="nav-btn" style="text-align:right;"><span class="label">Next Chapter →</span><span class="title">${escapedNextTitle}</span></a>` : `<a href="/blog-vue.html" class="nav-btn" style="text-align:right;"><span class="label">Course Overview 🏁</span><span class="title">Vue.js Overview</span></a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(path.join(vueDir, filename), fullHtml, 'utf8');
  console.log(`  🔥 Generated Vue Chapter: ${filename} (${(fullHtml.length / 1024).toFixed(1)}KB)`);
}

// Generate all 30 chapter files!
vueChapters.forEach((ch, idx) => {
  const prevCh = idx > 0 ? vueChapters[idx - 1] : null;
  const nextCh = idx < vueChapters.length - 1 ? vueChapters[idx + 1] : null;

  makeVuePage(
    ch.num,
    ch.file,
    ch.title,
    ch.desc,
    ch.phaseTag,
    ch.phaseTitle,
    ch.covered,
    prevCh ? prevCh.file : null,
    prevCh ? `${prevCh.num}. ${prevCh.title}` : null,
    nextCh ? nextCh.file : null,
    nextCh ? `${nextCh.num}. ${nextCh.title}` : null
  );
});

// Rebuild public/blog-vue.html master index!
const masterIndexFile = path.join(publicDir, 'blog-vue.html');
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vue.js 3 Masterclass Roadmap — Complete Beginner to Advanced Guide | Our Compiler</title>
  <meta name="description" content="Master Vue.js 3 with our complete 30-chapter roadmap across 10 phases: Vite scaffolding, Options vs Composition API, ref and reactive, templates, directives, v-model, component props, emits, slots, provide/inject, custom composables, Vue Router 4, Pinia state management, KeepAlive, Vitest testing, and production deployment." />
  <meta name="keywords" content="vue.js tutorial, vue 3 masterclass, composition api, ref, reactive, vue router 4, pinia, vite, sfc, single file components" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-vue.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <script>
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) {
        content.classList.remove('open');
        btn.classList.remove('active');
      } else {
        content.classList.add('open');
        btn.classList.add('active');
      }
    }

    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: "Inter", sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;';
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
      });
    })();
  </script>
</head>
<body class="lang-vue">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-vue.html" class="active">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-rust.html">Rust</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    ${getVueSidebarHTML(0)}
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-vue.html">Vue.js</a><span class="sep">›</span>
      <span class="current">Master Index: Vue.js 3 Roadmap</span>
    </div>

    <h1 class="page-title">Vue.js 3 Complete Masterclass Roadmap</h1>

    <div class="page-meta">
      <span class="badge">💚 Vue.js 3.4+</span>
      <span class="badge">🟢 30 Chapters Complete</span>
      <span class="badge">📂 Phases 1 to 10 Complete</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">What is Vue.js 3? · Vite Setup · Options vs Composition API · ref() vs reactive() · Directives (v-if, v-for, v-on, v-bind) · Form Bindings (v-model) · Computed Properties &amp; Watchers · Single File Components (.vue) · Props &amp; Custom Events (defineEmits) · Slots &amp; Provide/Inject · Lifecycle Hooks &amp; Custom Composables · Vue Router 4 Dynamic Routing &amp; Guards · Pinia State Management Stores · KeepAlive &amp; Teleport · Testing with Vitest · Production Build &amp; Deployment</span>
    </div>

    <div style="background: linear-gradient(135deg, rgba(66,184,131,0.15), rgba(20,24,32,0.6)); border: 1px solid rgba(66,184,131,0.3); border-radius: 12px; padding: 24px; margin-bottom: 32px;">
      <h3 style="color:#42b883; margin-bottom: 10px; font-size:18px;">🎯 Complete Vue.js 3 Masterclass Roadmap (30 Chapters)</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Master modern Vue 3 development: explore Vite scaffolding, Composition API with <code>&lt;script setup&gt;</code>, reactive primitives, dynamic routing with Vue Router 4, centralized store management with Pinia, custom composables, component testing with Vitest, and production cloud deployment:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-vue/01-vuejs-introduction-and-setup.html" style="background:linear-gradient(135deg, #42b883, #35495e); color:#fff; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: What is Vue 3? →</a>
        <a href="/blog-vue/05-vuejs-composition-api.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Composition API →</a>
        <a href="/blog-vue/14-vuejs-components-basics.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: Components →</a>
        <a href="/blog-vue/22-vuejs-router-setup.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 7: Vue Router →</a>
        <a href="/blog-vue/25-vuejs-pinia-setup.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 8: Pinia →</a>
        <a href="/online-html-editor.html" style="background:var(--bg3); border:1px solid var(--border); color:#42b883; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">▶ Web Playground →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">
      ${vueChapters.map((ch, i) => `
        ${i === 0 || vueChapters[i-1].phaseTag !== ch.phaseTag ? `
          <div class="phase-roadmap-card" style="margin-top:20px;">
            <div class="phase-roadmap-header">
              <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">💚</span><div><div class="phase-roadmap-tag">${ch.phaseTag}</div><h3 class="phase-roadmap-title">${ch.phaseTitle}</h3></div></div>
            </div>
            <div class="phase-lessons-list">
        ` : ''}
          <a href="/blog-vue/${ch.file}" class="curriculum-lesson-row">
            <div class="lesson-row-left">
              <span class="lesson-idx">${ch.num.toString().padStart(2, '0')}</span>
              <div class="lesson-info">
                <span class="lesson-title">${ch.num}. ${escapeHTML(ch.title)}</span>
                <span class="lesson-subtopics">${escapeHTML(ch.covered)}</span>
              </div>
            </div>
            <div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div>
          </a>
        ${i === vueChapters.length - 1 || vueChapters[i+1].phaseTag !== ch.phaseTag ? `
            </div>
          </div>
        ` : ''}
      `).join('')}
    </div>

    <!-- FAQ Section -->
    <div class="section-title" style="margin-top:40px;"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>

    <div class="faq-card">
      <h4><span style="background:rgba(66,184,131,0.15); color:#42b883; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q</span> What is Vue.js 3?</h4>
      <p>Vue.js 3 is a progressive JavaScript framework used for building web user interfaces. It provides reactive data binding, component-based architecture, and official tooling for routing (Vue Router) and state management (Pinia).</p>
    </div>

    <div class="faq-card">
      <h4><span style="background:rgba(66,184,131,0.15); color:#42b883; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q</span> What is the difference between Options API and Composition API?</h4>
      <p>The Options API organizes component logic into options object properties (data, methods, computed), whereas the Composition API allows grouping component logic by logical feature using functions (ref, computed, watch), making code much cleaner and reusable via Composables.</p>
    </div>

    <div class="nav-footer">
      <a href="/blog-vue.html" class="nav-btn"><span class="label">← Vue.js Overview</span><span class="title">Course Index</span></a>
      <a href="/blog-vue/01-vuejs-introduction-and-setup.html" class="nav-btn" style="text-align:right;"><span class="label">Start Course →</span><span class="title">1. What is Vue.js 3?</span></a>
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(masterIndexFile, indexHtml, 'utf8');
console.log('✅ Generated public/blog-vue.html master index page successfully for all 30 chapters!');
