const fs = require('fs');
const path = require('path');

// 1. UPDATE public/blog-html/style.css to exactly match public/blog-csharp/style.css
const csharpStylePath = path.join(__dirname, '..', 'public', 'blog-csharp', 'style.css');
const htmlStylePath = path.join(__dirname, '..', 'public', 'blog-html', 'style.css');

let cleanGreenStyle = fs.readFileSync(csharpStylePath, 'utf8');
cleanGreenStyle = cleanGreenStyle.replace(/C# Master Tutorial/g, 'HTML5 Master Tutorial');
cleanGreenStyle = cleanGreenStyle.replace(/lang-csharp/g, 'lang-html');
fs.writeFileSync(htmlStylePath, cleanGreenStyle, 'utf8');
console.log('✅ Overwrote public/blog-html/style.css with perfect green light-theme stylesheet');

// 2. REWRITE scratch/html_curriculum_data.js with sanitized titles (NO RAW HTML TAGS)
const curriculumDataContent = `// 20-Chapter HTML5 Master Curriculum Data & Dynamic Accordion Builder
const LESSONS = [
  // PHASE 1: HTML5 పునాదులు & డాక్యుమెంట్ ఆర్కిటెక్చర్
  {
    num: 1,
    id: "01",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "HTML5 పునాదులు & డాక్యుమెంట్ ఆర్కిటెక్చర్",
    file: "01-html-introduction-web-standards-and-setup.html",
    title: "HTML పరిచయం, Web Standards (W3C/WHATWG), ఎడిటర్స్ & First Web Page",
    subtopics: "HTML5 చరిత్ర · Web Trio (HTML, CSS, JS) · VS Code & Live Server సెటప్ · First HTML5 Page నిర్మాణం",
    prev: null,
    next: { file: "02-html-document-structure-doctype-head-meta.html", title: "2. HTML5 డాక్యుమెంట్ స్ట్రక్చర్" }
  },
  {
    num: 2,
    id: "02",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "HTML5 పునాదులు & డాక్యుమెంట్ ఆర్కిటెక్చర్",
    file: "02-html-document-structure-doctype-head-meta.html",
    title: "HTML5 డాక్యుమెంట్ స్ట్రక్చర్, DOCTYPE, head, UTF-8 & Viewport",
    subtopics: "HTML5 Boilerplate అనాటమీ · DOCTYPE html ప్రాముఖ్యత · meta charset UTF-8 · Mobile Viewport Meta Tag",
    prev: { file: "01-html-introduction-web-standards-and-setup.html", title: "1. HTML పరిచయం & సెటప్" },
    next: { file: "03-html-elements-tags-attributes-and-hierarchy.html", title: "3. ఎలిమెంట్స్ & అట్రిబ్యూట్స్" }
  },
  {
    num: 3,
    id: "03",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "HTML5 పునాదులు & డాక్యుమెంట్ ఆర్కిటెక్చర్",
    file: "03-html-elements-tags-attributes-and-hierarchy.html",
    title: "ఎలిమెంట్స్, ట్యాగ్స్, గ్లోబల్ అట్రిబ్యూట్స్ & DOM హైరార్కీ",
    subtopics: "Opening/Closing Tags vs Void Elements · Global Attributes (id, class, style, data-*) · DOM Tree నెస్టెడ్ మోడల్",
    prev: { file: "02-html-document-structure-doctype-head-meta.html", title: "2. HTML5 డాక్యుమెంట్ స్ట్రక్చర్" },
    next: { file: "04-html-headings-paragraphs-and-text-formatting.html", title: "4. హెడ్డింగ్స్ & పేరాగ్రాఫ్స్" }
  },
  {
    num: 4,
    id: "04",
    phase: 1,
    phaseTag: "Phase 01",
    phaseTitle: "HTML5 పునాదులు & డాక్యుమెంట్ ఆర్కిటెక్చర్",
    file: "04-html-headings-paragraphs-and-text-formatting.html",
    title: "హెడ్డింగ్స్ (h1-h6), పేరాగ్రాఫ్స్ (p) & టెక్స్ట్ ఫార్మాటింగ్ ట్యాగ్స్",
    subtopics: "Semantic Headings Hierarchy · Paragraphs, br, hr · strong vs b, em vs i · mark, del, ins, sup, sub",
    prev: { file: "03-html-elements-tags-attributes-and-hierarchy.html", title: "3. ఎలిమెంట్స్ & అట్రిబ్యూట్స్" },
    next: { file: "05-html-links-anchor-tags-and-navigation.html", title: "5. యాంకర్ ట్యాగ్ & లింకులు" }
  },

  // PHASE 2: లింకులు, లిస్టులు, టేబుల్స్ & మల్టీమీడియా
  {
    num: 5,
    id: "05",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "లింకులు, లిస్టులు, టేబుల్స్ & మల్టీమీడియా",
    file: "05-html-links-anchor-tags-and-navigation.html",
    title: "యాంకర్ ట్యాగ్ (a tag), హైపర్‌లింక్స్, రిలేటివ్/అబ్సల్యూట్ పాత్స్ & లింక్ టార్గెట్స్",
    subtopics: "Hyperlinks href · Absolute vs Relative URLs · target _blank & rel noopener · ఇంటర్నల్ బుక్‌మార్క్స్ · mailto & tel",
    prev: { file: "04-html-headings-paragraphs-and-text-formatting.html", title: "4. హెడ్డింగ్స్ & పేరాగ్రాఫ్స్" },
    next: { file: "06-html-lists-ordered-unordered-and-description.html", title: "6. లిస్టులు (ul, ol, dl)" }
  },
  {
    num: 6,
    id: "06",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "లింకులు, లిస్టులు, టేబుల్స్ & మల్టీమీడియా",
    file: "06-html-lists-ordered-unordered-and-description.html",
    title: "లిస్టులు: Unordered (ul), Ordered (ol) & Description Lists (dl)",
    subtopics: "బుల్లెట్ లిస్టులు ul · నంబర్డ్ లిస్టులు ol · నెస్టెడ్ లిస్టులు · డిస్క్రిప్షన్ లిస్టులు (dl, dt, dd) · నేవిగేషన్ బార్స్",
    prev: { file: "05-html-links-anchor-tags-and-navigation.html", title: "5. యాంకర్ ట్యాగ్ & లింకులు" },
    next: { file: "07-html-images-responsive-picture-and-svg.html", title: "7. ఇమేజెస్ & రెస్పాన్సివ్ పిక్చర్స్" }
  },
  {
    num: 7,
    id: "07",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "లింకులు, లిస్టులు, టేబుల్స్ & మల్టీమీడియా",
    file: "07-html-images-responsive-picture-and-svg.html",
    title: "ఇమేజెస్ (img), రెస్పాన్సివ్ పిక్చర్స్ (picture, srcset) & WebP/SVG",
    subtopics: "src, alt (SEO & Accessibility) · Aspect Ratio · loading lazy ఆప్టిమైజేషన్ · picture & srcset · WebP & వెక్టార్ SVG",
    prev: { file: "06-html-lists-ordered-unordered-and-description.html", title: "6. లిస్టులు (ul, ol, dl)" },
    next: { file: "08-html-tables-headers-merge-and-styling.html", title: "8. టేబుల్స్ & సెల్ మెర్జింగ్" }
  },
  {
    num: 8,
    id: "08",
    phase: 2,
    phaseTag: "Phase 02",
    phaseTitle: "లింకులు, లిస్టులు, టేబుల్స్ & మల్టీమీడియా",
    file: "08-html-tables-headers-merge-and-styling.html",
    title: "టేబుల్స్ (table), రోస్, కాలమ్స్, colspan, rowspan & Accessibility",
    subtopics: "టేబుల్ ఆర్కిటెక్చర్ (thead, tbody, tfoot, tr, th, td) · colspan & rowspan సెల్ మెర్జింగ్ · caption & scope · రెస్పాన్సివ్ టేబుల్స్",
    prev: { file: "07-html-images-responsive-picture-and-svg.html", title: "7. ఇమేజెస్ & రెస్పాన్సివ్ పిక్చర్స్" },
    next: { file: "09-html-semantic-elements-header-nav-main-footer.html", title: "9. సెమాంటిక్ HTML5 ఎలిమెంట్స్" }
  },

  // PHASE 3: మోడరన్ సెమాంటిక్ HTML5 & లేఅవుట్ డిజైన్
  {
    num: 9,
    id: "09",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "మోడరన్ సెమాంటిక్ HTML5 & లేఅవుట్ డిజైన్",
    file: "09-html-semantic-elements-header-nav-main-footer.html",
    title: "సెమాంటిక్ HTML5 ప్రాముఖ్యత: header, nav, main, footer",
    subtopics: "Non-Semantic (div, span) vs Semantic ట్యాగ్స్ · వెబ్ పేజ్ స్ట్రక్చర్: header, nav, main, footer · స్క్రీన్ రీడర్స్ & SEO అడ్వాంటేజ్",
    prev: { file: "08-html-tables-headers-merge-and-styling.html", title: "8. టేబుల్స్ & సెల్ మెర్జింగ్" },
    next: { file: "10-html-articles-sections-aside-and-figures.html", title: "10. ఆర్టికల్స్, సెక్షన్స్ & ఫిగర్స్" }
  },
  {
    num: 10,
    id: "10",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "మోడరన్ సెమాంటిక్ HTML5 & లేఅవుట్ డిజైన్",
    file: "10-html-articles-sections-aside-and-figures.html",
    title: "కంటెంట్ స్ట్రక్చరింగ్: article, section, aside, figure, figcaption",
    subtopics: "article vs section తేడాలు · సైడ్‌బార్స్ కోసం aside · ఇమేజ్ & కోడ్ క్యాప్షన్ల కోసం figure, figcaption · అడ్రస్ ట్యాగ్",
    prev: { file: "09-html-semantic-elements-header-nav-main-footer.html", title: "9. సెమాంటిక్ HTML5 ఎలిమెంట్స్" },
    next: { file: "11-html-audio-video-and-embeds.html", title: "11. ఆడియో, వీడియో & ఐఫ్రేమ్స్" }
  },
  {
    num: 11,
    id: "11",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "మోడరన్ సెమాంటిక్ HTML5 & లేఅవుట్ డిజైన్",
    file: "11-html-audio-video-and-embeds.html",
    title: "మల్టీమీడియా: ఆడియో (audio), వీడియో (video) & ఐఫ్రేమ్స్ (iframe)",
    subtopics: "Native audio & video ట్యాగ్స్ (controls, autoplay, loop) · మల్టిపుల్ సోర్స్ ఫార్మాట్స్ · YouTube/Maps Embeds & iframe sandbox సెక్యూరిటీ",
    prev: { file: "10-html-articles-sections-aside-and-figures.html", title: "10. ఆర్టికల్స్, సెక్షన్స్ & ఫిగర్స్" },
    next: { file: "12-html-responsive-meta-and-favicons.html", title: "12. రెస్పాన్సివ్ మెటా & Favicons" }
  },
  {
    num: 12,
    id: "12",
    phase: 3,
    phaseTag: "Phase 03",
    phaseTitle: "మోడరన్ సెమాంటిక్ HTML5 & లేఅవుట్ డిజైన్",
    file: "12-html-responsive-meta-and-favicons.html",
    title: "మొబైల్ రెస్పాన్సివ్ మెటా ట్యాగ్స్, Favicons & Web App Manifest",
    subtopics: "Viewport Meta Tag లోతైన విశ్లేషణ · ఆధునిక Favicons (SVG & PNG) · Apple Touch Icons · PWA వెబ్ యాప్ మ్యానిఫెస్ట్",
    prev: { file: "11-html-audio-video-and-embeds.html", title: "11. ఆడియో, వీడియో & ఐఫ్రేమ్స్" },
    next: { file: "13-html-forms-action-method-and-form-controls.html", title: "13. ఫారమ్స్ & కంట్రోల్స్" }
  },

  // PHASE 4: ఫారమ్స్, ఇన్‌పుట్స్ & క్లయింట్-సైడ్ వాలిడేషన్
  {
    num: 13,
    id: "13",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఫారమ్స్, ఇన్‌పుట్స్ & క్లయింట్-సైడ్ వాలిడేషన్",
    file: "13-html-forms-action-method-and-form-controls.html",
    title: "ఫారమ్స్ ఆర్కిటెక్చర్: form, action, method (GET vs POST), label",
    subtopics: "ఫారమ్ లైఫ్‌సైకిల్ · GET vs POST హెచ్‌టిటిపి మెథడ్స్ · label for యాక్సెసిబిలిటీ · fieldset & legend గ్రూపింగ్",
    prev: { file: "12-html-responsive-meta-and-favicons.html", title: "12. రెస్పాన్సివ్ మెటా & Favicons" },
    next: { file: "14-html-input-types-text-password-email-number-date.html", title: "14. మోడరన్ ఇన్‌పుట్ టైప్స్" }
  },
  {
    num: 14,
    id: "14",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఫారమ్స్, ఇన్‌పుట్స్ & క్లయింట్-సైడ్ వాలిడేషన్",
    file: "14-html-input-types-text-password-email-number-date.html",
    title: "మోడరన్ ఇన్‌పుట్ టైప్స్: text, email, password, number, date, range, color",
    subtopics: "HTML5 ఇన్‌పుట్ రకాలు (email, tel, url, number, date, range, color) · మొబైల్ కీబోర్డ్ inputmode · బటన్స్ (submit, reset, button)",
    prev: { file: "13-html-forms-action-method-and-form-controls.html", title: "13. ఫారమ్స్ & కంట్రోల్స్" },
    next: { file: "15-html-select-datalist-textarea-checkbox-radio.html", title: "15. సెలెక్ట్, Datalist & చెక్‌బాక్స్" }
  },
  {
    num: 15,
    id: "15",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఫారమ్స్, ఇన్‌పుట్స్ & క్లయింట్-సైడ్ వాలిడేషన్",
    file: "15-html-select-datalist-textarea-checkbox-radio.html",
    title: "డ్రాప్‌డౌన్స్ (select), ఆటోకంప్లీట్ (datalist), textarea, Checkbox & Radio",
    subtopics: "డ్రాప్‌డౌన్ మెనూలు select & optgroup · సెర్చ్ ఆటోకంప్లీట్ datalist · మల్టీ-లైన్ textarea · Radio & Checkbox ఛాయిస్",
    prev: { file: "14-html-input-types-text-password-email-number-date.html", title: "14. మోడరన్ ఇన్‌పుట్ టైప్స్" },
    next: { file: "16-html-form-validation-required-pattern-min-max.html", title: "16. క్లయింట్-సైడ్ ఫారమ్ వాలిడేషన్" }
  },
  {
    num: 16,
    id: "16",
    phase: 4,
    phaseTag: "Phase 04",
    phaseTitle: "ఫారమ్స్, ఇన్‌పుట్స్ & క్లయింట్-సైడ్ వాలిడేషన్",
    file: "16-html-form-validation-required-pattern-min-max.html",
    title: "నేటివ్ క్లయింట్-సైడ్ వాలిడేషన్: required, pattern (Regex), min, max",
    subtopics: "జీరో జావాస్క్రిప్ట్ వాలిడేషన్ · required, minlength, maxlength · min, max, step లిమిట్స్ · pattern తో Regex · CSS :valid/:invalid",
    prev: { file: "15-html-select-datalist-textarea-checkbox-radio.html", title: "15. సెలెక్ట్, Datalist & చెక్‌బాక్స్" },
    next: { file: "17-html-head-metadata-seo-and-open-graph.html", title: "17. SEO మెటాడేటా & Open Graph" }
  },

  // PHASE 5: అడ్వాన్స్‌డ్ HTML5 APIలు, SEO, Accessibility & Capstone ప్రాజెక్ట్
  {
    num: 17,
    id: "17",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "అడ్వాన్స్‌డ్ HTML5 APIలు, SEO, Accessibility & Capstone ప్రాజెక్ట్",
    file: "17-html-head-metadata-seo-and-open-graph.html",
    title: "హెడ్ మెటాడేటా, SEO ఆప్టిమైజేషన్, Open Graph (Social Cards) & Twitter Cards",
    subtopics: "SEO మెటా ట్యాగ్స్ (title, description, canonical) · Open Graph (og:title, og:image) · Twitter Cards · JSON-LD పరిచయం",
    prev: { file: "16-html-form-validation-required-pattern-min-max.html", title: "16. క్లయింట్-సైడ్ ఫారమ్ వాలిడేషన్" },
    next: { file: "18-html-accessibility-aria-and-screen-readers.html", title: "18. వెబ్ యాక్సెసిబిలిటీ & ARIA" }
  },
  {
    num: 18,
    id: "18",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "అడ్వాన్స్‌డ్ HTML5 APIలు, SEO, Accessibility & Capstone ప్రాజెక్ట్",
    file: "18-html-accessibility-aria-and-screen-readers.html",
    title: "వెబ్ యాక్సెసిబిలిటీ (a11y), WAI-ARIA రోల్స్, ల్యాండ్‌మార్క్స్ & కీబోర్డ్ నావిగేషన్",
    subtopics: "WCAG గైడ్‌లైన్స్ · ARIA Attributes (aria-label, aria-hidden, aria-expanded) · సెమాంటిక్ ల్యాండ్‌మార్క్స్ · tabindex & Focus",
    prev: { file: "17-html-head-metadata-seo-and-open-graph.html", title: "17. SEO మెటాడేటా & Open Graph" },
    next: { file: "19-html5-apis-storage-dialog-details-drag-drop.html", title: "19. మోడరన్ HTML5 APIలు" }
  },
  {
    num: 19,
    id: "19",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "అడ్వాన్స్‌డ్ HTML5 APIలు, SEO, Accessibility & Capstone ప్రాజెక్ట్",
    file: "19-html5-apis-storage-dialog-details-drag-drop.html",
    title: "ఆధునిక HTML5 APIలు: dialog, details/summary, LocalStorage & Drag-Drop",
    subtopics: "నేటివ్ మోడల్ పాపప్స్ dialog · అకార్డియన్లు details & summary · Web Storage (LocalStorage vs SessionStorage) · Drag & Drop API",
    prev: { file: "18-html-accessibility-aria-and-screen-readers.html", title: "18. వెబ్ యాక్సెసిబిలిటీ & ARIA" },
    next: { file: "20-html-capstone-project-complete-responsive-portfolio.html", title: "20. కంప్లీట్ క్యాప్‌స్టోన్ ప్రాజెక్ట్" }
  },
  {
    num: 20,
    id: "20",
    phase: 5,
    phaseTag: "Phase 05",
    phaseTitle: "అడ్వాన్స్‌డ్ HTML5 APIలు, SEO, Accessibility & Capstone ప్రాజెక్ట్",
    file: "20-html-capstone-project-complete-responsive-portfolio.html",
    title: "కంప్లీట్ క్యాప్‌స్టోన్ ప్రాజెక్ట్: రెస్పాన్సివ్ డెవలపర్ పోర్ట్‌ఫోలియో వెబ్‌సైట్",
    subtopics: "సెమాంటిక్ లేఅవుట్ · రెస్పాన్సివ్ పిక్చర్స్ · వాలిడేషన్ కాంటాక్ట్ ఫారమ్ · మోడల్ డైలాగ్ · SEO & Open Graph · ఆన్‌లైన్ ఎడిటర్‌లో లైవ్ టెస్టింగ్",
    prev: { file: "19-html5-apis-storage-dialog-details-drag-drop.html", title: "19. మోడరన్ HTML5 APIలు" },
    next: null
  }
];

const PHASES = [
  {
    num: 1,
    tag: "Phase 01",
    title: "HTML5 పునాదులు & డాక్యుమెంట్ ఆర్కిటెక్చర్",
    desc: "HTML5 పరిచయం, Web Standards, ఎడిటర్స్ సెటప్, DOCTYPE, head, UTF-8, Viewport, ఎలిమెంట్స్, గ్లోబల్ అట్రిబ్యూట్స్ మరియు హెడ్డింగ్స్/పేరాగ్రాఫ్స్.",
    icon: "⚡",
    badge: "4 Ch"
  },
  {
    num: 2,
    tag: "Phase 02",
    title: "లింకులు, లిస్టులు, టేబుల్స్ & మల్టీమీడియా",
    desc: "హైపర్‌లింక్స్, బుల్లెట్/నంబర్డ్ లిస్టులు, రెస్పాన్సివ్ పిక్చర్స్ (picture, srcset, WebP), మరియు సెల్ మెర్జింగ్‌తో కూడిన అడ్వాన్స్‌డ్ టేబుల్స్.",
    icon: "🔗",
    badge: "4 Ch"
  },
  {
    num: 3,
    tag: "Phase 03",
    title: "మోడరన్ సెమాంటిక్ HTML5 & లేఅవుట్ డిజైన్",
    desc: "సెమాంటిక్ ట్యాగ్స్ (header, nav, main, footer, article, section, aside), ఆడియో & వీడియో మల్టీమీడియా, iframe సెక్యూరిటీ, మరియు PWA Manifest.",
    icon: "🏗️",
    badge: "4 Ch"
  },
  {
    num: 4,
    tag: "Phase 04",
    title: "ఫారమ్స్, ఇన్‌పుట్స్ & క్లయింట్-సైడ్ వాలిడేషన్",
    desc: "ఫారమ్స్ ఆర్కిటెక్చర్ (GET vs POST), మోడరన్ ఇన్‌పుట్ టైప్స్, డ్రాప్‌డౌన్స్, Datalist ఆటోకంప్లీట్, మరియు Zero-JS క్లయింట్-సైడ్ వాలిడేషన్.",
    icon: "📋",
    badge: "4 Ch"
  },
  {
    num: 5,
    tag: "Phase 05",
    title: "అడ్వాన్స్‌డ్ HTML5 APIలు, SEO, Accessibility & Capstone ప్రాజెక్ట్",
    desc: "SEO మెటాడేటా, Open Graph, WAI-ARIA యాక్సెసిబిలిటీ, dialog మోడల్స్, Web Storage, మరియు పూర్తి స్థాయి రెస్పాన్సివ్ పోర్ట్‌ఫోలియో ప్రాజెక్ట్.",
    icon: "🚀",
    badge: "4 Ch"
  }
];

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildSidebar(currentLessonNum = null) {
  let html = \`
  <aside class="sidebar">
    <div class="sidebar-heading">HTML5 Master Course (తెలుగు)</div>
    <a href="/blog-html.html" class="sidebar-home-link \${currentLessonNum === null ? 'active' : ''}">
      ⚡ HTML Course HOME (ఇండెక్స్)
    </a>
    <div class="sidebar-accordion">
  \`;

  PHASES.forEach(phase => {
    const phaseLessons = LESSONS.filter(l => l.phase === phase.num);
    const hasActiveLesson = phaseLessons.some(l => l.num === currentLessonNum);
    const isOpen = currentLessonNum === null ? (phase.num === 1) : hasActiveLesson;

    html += \`
      <div class="accordion-item">
        <button class="accordion-header \${isOpen ? 'active' : ''}" onclick="toggleAccordion(this)">
          <span class="phase-title">
            <span class="phase-icon">\${phase.icon}</span>
            <span>\${phase.tag}<br><small style="font-size:11px; font-weight:600; opacity:0.85;">\${escapeHtml(phase.title)}</small></span>
          </span>
          <span class="phase-badge">\${phase.badge}</span>
        </button>
        <div class="accordion-content \${isOpen ? 'open' : ''}">
          <ul class="lesson-list">
    \`;

    phaseLessons.forEach(l => {
      const isCurrent = l.num === currentLessonNum;
      html += \`
            <li class="lesson-item \${isCurrent ? 'active' : ''}">
              <a href="/blog-html/\${l.file}" class="lesson-link \${isCurrent ? 'active' : ''}">
                <span class="lesson-num">\${l.num}.</span>
                <span class="lesson-name">\${escapeHtml(l.title)}</span>
              </a>
            </li>
      \`;
    });

    html += \`
          </ul>
        </div>
      </div>
    \`;
  });

  html += \`
    </div>
    <div style="margin-top:24px; padding:16px; background:var(--bg2); border:1px solid var(--border); border-radius:10px; font-size:12px; text-align:center;">
      <div style="font-weight:700; color:#10b981; margin-bottom:4px;">ఇంటరాక్టివ్ ఎడిటర్</div>
      <a href="/online-html-editor.html" style="color:var(--text); text-decoration:none; font-weight:600; display:inline-block; margin-top:6px; background:rgba(16,185,129,0.12); padding:6px 12px; border-radius:6px; border:1px solid rgba(16,185,129,0.3);">
        ▶ Try Online HTML Editor
      </a>
      <a href="/blog.html" style="color:var(--text2); text-decoration:none; display:block; margin-top:8px;">
        📁 All Tutorials Index
      </a>
    </div>
  </aside>
  \`;

  return html;
}

console.log('HTML curriculum data ready. Total lessons:', LESSONS.length);
module.exports = { LESSONS, PHASES, buildSidebar, escapeHtml };
`;

fs.writeFileSync(path.join(__dirname, 'html_curriculum_data.js'), curriculumDataContent, 'utf8');
console.log('✅ Sanitized scratch/html_curriculum_data.js');
