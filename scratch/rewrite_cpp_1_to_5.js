const fs = require('fs');
const path = require('path');
const { wrapCppPage } = require('./build_cpp_10_phases_master.js');

const cDir = path.join(__dirname, '..', 'public', 'blog-cpp');
if (!fs.existsSync(cDir)) {
  fs.mkdirSync(cDir, { recursive: true });
}

// 1. C++ Fundamentals, Compiler Pipeline & Hello World
function buildLesson1() {
  const title = "C++ Fundamentals, Compiler Pipeline & Hello World (తెలుగులో)";
  const desc = "C++ ఎందుకు అంత ఫాస్ట్ గా ఉంటుంది? అసలు C కి C++ కి తేడా ఏంటి? Compiler Pipeline ఎలా పనిచేస్తుంది? డీప్ గా నేర్చుకుందాం.";
  const filename = "01-cpp-basics-history-compiler-and-hello-world.html";
  const subtopics = "History of C++ · C vs C++ · Compiler Pipeline · Hello World · std::cout";

  const contentBody = `
    <div class="intro-box">
      <p>ప్రపంచంలో వేగంగా పనిచేసే సాఫ్ట్‌వేర్స్ అయిన గేమ్ ఇంజిన్స్ (Unreal Engine), బ్రౌజర్స్ (Google Chrome, Firefox), మరియు ఆపరేటింగ్ సిస్టమ్స్ లోపల ఉండే ఇంజిన్స్... ఇవన్నీ దేనితో రాస్తారో తెలుసా? <strong>C++</strong> తో! పైథాన్, జావా లాంటి ఎన్నో కొత్త లాంగ్వేజెస్ వచ్చినా, స్పీడ్ (Speed) మరియు పర్ఫార్మెన్స్ విషయానికి వస్తే C++ దరిదాపుల్లోకి కూడా రాలేవు. ఎందుకంటే C++ డైరెక్ట్ గా కంప్యూటర్ హార్డ్ వేర్ తో మాట్లాడుతుంది. ఈ మొదటి పాఠంలో C++ అసలు ఎందుకు పుట్టింది, C లాంగ్వేజ్ కి దీనికి తేడా ఏంటి, మరియు మనం రాసిన కోడ్ అసలు ఎగ్జిక్యూట్ ఎలా అవుతుందో (Compiler Pipeline) డీప్ గా తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> అసలు C++ ఎందుకు పుట్టింది? (C vs C++)</div>
    <div class="section-body">
      <p class="text-prose">
        1970ల కాలంలో C లాంగ్వేజ్ సూపర్ హిట్ అయింది. కానీ సాఫ్ట్‌వేర్స్ సైజు పెరుగుతున్న కొద్దీ ఒక ప్రాబ్లెమ్ వచ్చింది. C లో ఉన్న ఫంక్షన్స్ అన్నీ విడివిడిగా గాలిలో తేలుతూ ఉంటాయి. వాటిని కంట్రోల్ చేయడం ఒక పెద్ద తలనొప్పిగా మారింది. అప్పుడే Bjarne Stroustrup అనే ఆయనకు ఒక ఐడియా వచ్చింది... "డేటాని మరియు ఆ డేటాతో పనిచేసే ఫంక్షన్స్ ని ఒకే బాక్స్ లో పెడితే ఎలా ఉంటుంది?" అని. ఆ బాక్స్ నే మనం <strong>Classes (క్లాసెస్)</strong> అంటాం. 
      </p>

      <div class="deep-dive-card">
        <h3>🚗 రియల్ లైఫ్ స్టోరీ: కార్ మెకానిక్ షాప్</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          ఒక C ప్రోగ్రామర్ కార్ డిజైన్ చేయాలంటే... టైర్లు ఒక దగ్గర, ఇంజిన్ ఇంకో దగ్గర, స్టీరింగ్ ఇంకో దగ్గర పెడతాడు. వాటిని విడివిడిగా కంట్రోల్ చేసే ఫంక్షన్స్ రాస్తాడు. దీనివల్ల ఏ పార్ట్ దేనికి లింక్ అయ్యిందో కన్ఫ్యూజ్ అయ్యే ఛాన్స్ ఉంది.<br><br>
          అదే ఒక C++ ప్రోగ్రామర్ ఏం చేస్తాడంటే... ఒక పెద్ద బాక్స్ (Class) తీసుకుని, దానికి <strong>"కార్"</strong> అని పేరు పెట్టి, అందులో టైర్లు, ఇంజిన్, అన్నీ కలిపి ఒకే ప్యాకేజీ లాగా చేస్తాడు. ఇప్పుడు మీరు డైరెక్ట్ గా "కార్, ముందుకు వెళ్లు!" అంటే చాలు. దీన్నే <strong>Object-Oriented Programming (OOP)</strong> అంటారు. C కి ఈ OOP ఫీచర్ ని కలిపితే వచ్చిందే C++ (C కి ఇంక్రిమెంట్).
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> కంపైలర్ పైప్‌లైన్ (Compiler Pipeline) ఎలా పనిచేస్తుంది?</div>
    <div class="section-body">
      <p class="text-prose">
        మనం ఇంగ్లీష్ లో రాసిన కోడ్ కంప్యూటర్ (CPU) కి అర్థం కాదు. దానికి 0s అండ్ 1s మాత్రమే తెలుసు. కాబట్టి మనం రాసిన C++ కోడ్ 4 దశల్లో మారిపోయి ఒక .exe ఫైల్ లాగా మారుతుంది.
      </p>
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><strong>1. Preprocessing (ప్రీ ప్రాసెసింగ్):</strong> మనం పైన రాసిన <code>#include</code> లైన్స్ అన్నీ చదివి, ఆ ఫైల్స్ లోని డేటా అంతా కాపీ పేస్ట్ చేస్తుంది.</li>
        <li><strong>2. Compilation (కంపైలేషన్):</strong> ఆ కాపీ అయిన పెద్ద కోడ్ ని తీసుకుని అసెంబ్లీ కోడ్ (Assembly Code) లాగా మారుస్తుంది.</li>
        <li><strong>3. Assembly (అసెంబ్లీ):</strong> అసెంబ్లీ కోడ్ ని డైరెక్ట్ గా మెషిన్ కోడ్ (0s & 1s) గా మారుస్తుంది. దీన్నే ఆబ్జెక్ట్ ఫైల్ (<code>.o</code> లేదా <code>.obj</code>) అంటారు.</li>
        <li><strong>4. Linking (లింకింగ్):</strong> అన్ని ఆబ్జెక్ట్ ఫైల్స్ ని, లైబ్రరీస్ ని కలిపి కుట్టి ఒక ఫైనల్ రన్ అయ్యే యాప్ (<code>.exe</code>) ని తయారు చేస్తుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (C++ Hello World)</div>
    <div class="section-body">
      <p class="text-prose">
        ఇప్పుడు మనం C++ లో ఒక సింపుల్ ప్రోగ్రామ్ ఎలా రాయాలో చూద్దాం. ఇందులో C లాగా <code>printf</code> బదులు <code>std::cout</code> వాడతాము.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++ — First Program</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;  // ఇన్పుట్, అవుట్పుట్ కోసం

int main() {
    // స్క్రీన్ మీద ప్రింట్ చేయడం
    std::cout << "Hello, C++ World!" << std::endl;
    
    return 0; // సక్సెస్ ఫుల్ గా పూర్తయింది అని చెప్పడానికి
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>#include &lt;iostream&gt;</code>: C లో ఉన్న <code>stdio.h</code> లాగే ఇది కూడా. iostream అంటే Input Output Stream. ఇది లేకపోతే మనం ప్రింట్ చేయలేము.</li>
        <li><code>std::cout</code>: "c-out" అని చదవాలి. అంటే Character Output. <code>std</code> అంటే స్టాండర్డ్ లైబ్రరీ.</li>
        <li><code><<</code>: దీన్ని Insertion Operator అంటారు. కుడి వైపు ఉన్న డేటాని ఎడమవైపు ఉన్న cout లోకి తోస్తుంది (పంపుతుంది).</li>
        <li><code>std::endl</code>: "end-line" అని చదవాలి. ప్రింట్ చేసాక నెక్స్ట్ లైన్ కి వెళ్లడానికి (New Line) ఇది వాడతారు. ఇది <code>\\n</code> లాగా పనిచేస్తుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: C++ లో C కోడ్ రన్ అవుతుందా?</h4>
          <p>చాలా వరకు అవుతుంది! C++ అనేది C కి ఎక్స్టెన్షన్. మీరు C++ ఫైల్ (<code>.cpp</code>) లో C లాంగ్వేజ్ కోడ్ (printf, scanf లాంటివి) రాసినా కూడా కంపైలర్ ఏమీ అనదు, పర్ఫెక్ట్ గా రన్ చేస్తుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: ప్రతిసారి <code>std::</code> అని రాయడం విసుగ్గా ఉంది, సొల్యూషన్ లేదా?</h4>
          <p>ఉంది! పైన <code>using namespace std;</code> అని రాస్తే, ఇక కింద ఎక్కడ కూడా <code>std::</code> అని రాయక్కర్లేదు, డైరెక్ట్ గా <code>cout</code> వాడేయొచ్చు. కానీ పెద్ద ప్రాజెక్ట్స్ లో ఇలా రాయడం డేంజర్, పేరు క్లాషెస్ వస్తాయి కాబట్టి <code>std::</code> వాడటమే మంచి పద్ధతి.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: C++ ఫాస్ట్ అని ఎందుకు అంటారు? జావా ఎందుకు ఫాస్ట్ కాదు?</h4>
          <p>జావా లాంటి లాంగ్వేజెస్ నేరుగా హార్డ్ వేర్ మీద రన్ అవ్వవు, వాటికి మధ్యలో JVM (Java Virtual Machine) అనే ఒక ట్రాన్స్లేటర్ ఉంటుంది, దాని వల్ల స్పీడ్ తగ్గుతుంది. కానీ C++ అలా కాదు, కంపైలర్ డైరెక్ట్ గా మెషిన్ కోడ్ కి మారిపోతుంది, మధ్యలో ఏమీ ఉండదు. అందుకే గేమ్స్ అన్నీ C++ తోనే రాస్తారు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 1, "Phase 01", "C++ Basics & Architecture", subtopics, contentBody, null, null, '02-cpp-variables-data-types-constexpr-auto-and-scope.html', '2. Variables, Data Types & Scope');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 2. Variables, Data Types, constexpr, auto & Scope
function buildLesson2() {
  const title = "Variables, Data Types, constexpr, auto & Scope (తెలుగులో)";
  const desc = "C++ లో Variables ఎలా క్రియేట్ చేయాలి? Data Types ఏముంటాయి? మోడరన్ C++ ఫీచర్స్ అయిన auto మరియు constexpr ని ఎలా వాడాలో డీప్ ఎక్స్‌ప్లనేషన్ తో చూద్దాం.";
  const filename = "02-cpp-variables-data-types-constexpr-auto-and-scope.html";
  const subtopics = "Variables in Memory · Data Types · Modern C++ (auto) · constexpr · Scope & Lifetime";

  const contentBody = `
    <div class="intro-box">
      <p>కంప్యూటర్ ప్రోగ్రామ్ అంటేనే డేటాని తీసుకోవడం, దాన్ని ప్రాసెస్ చేయడం, రిజల్ట్ ఇవ్వడం. ఆ డేటాని ప్రాసెస్ చేసేటప్పుడు టెంపరరీ గా దాచుకోవడానికి రామ్ (RAM) లో మనకు కొన్ని ఖాళీ డబ్బాలు కావాలి. ఆ డబ్బాలనే మనం <strong>Variables (వేరియబుల్స్)</strong> అంటాం. పాత C లాంగ్వేజ్ తో పోలిస్తే C++ లో వేరియబుల్స్ క్రియేట్ చేయడంలో చాలా కొత్త ఫీచర్స్ వచ్చాయి. ముఖ్యంగా <code>auto</code> మరియు <code>constexpr</code> లాంటి మోడరన్ C++ (C++11/14/17) ఫీచర్స్ కోడ్ ని చాలా సింపుల్ గా మార్చేశాయి. ఈ ఆర్టికల్ లో వాటి గురించి డీప్ గా తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Variables మరియు Data Types</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు ఒక బాక్స్ (Variable) తయారు చేసే ముందే... ఆ బాక్స్ లో మీరు నీళ్ళు పోస్తారా, ఇసుక పోస్తారా, లేక బట్టలు పెడతారా అనేది కంపైలర్ కి చెప్పాలి. దీన్నే <strong>Data Type</strong> అంటారు.
      </p>

      <div class="deep-dive-card">
        <h3>📦 రియల్ లైఫ్ స్టోరీ: స్వీట్ బాక్స్ vs వాటర్ బాటిల్</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          మీరు నీళ్ళు నింపాలంటే ఒక టైట్ గా ఉండే ప్లాస్టిక్ లేదా గ్లాస్ బాటిల్ వాడతారు. అదే స్వీట్స్ పెట్టాలంటే ఒక అట్టపెట్టె వాడతారు. ఏ దానికి పనికొచ్చే డబ్బా దానికి ఉంటుంది. <br><br>
          ప్రోగ్రామింగ్ లో కూడా నంబర్స్ దాచాలంటే <code>int</code> అనే డబ్బా కావాలి (4 బైట్స్). పాయింట్స్ ఉన్న నంబర్స్ (ఉదా: 9.5) దాచాలంటే <code>float</code> లేదా <code>double</code> కావాలి. అక్షరాలు దాచాలంటే <code>char</code> కావాలి (1 బైట్). మీరు int డబ్బాలో 9.5 ని వేయాలని చూస్తే అది .5 ని కట్ చేసి కేవలం 9 ని మాత్రమే తీసుకుంటుంది!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Modern C++ లో వచ్చిన అద్భుతాలు (auto & constexpr)</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు పెద్ద పెద్ద డేటా టైప్స్ రాయాలంటే కొన్నిసార్లు చాలా కష్టంగా ఉంటుంది (ఉదాహరణకు: <code>unsigned long long int</code>). దానికి C++11 లో ఒక సొల్యూషన్ వచ్చింది, అదే <strong><code>auto</code></strong> కీవర్డ్. మీరు కేవలం <code>auto x = 10;</code> అని రాస్తే చాలు, ఆ 10 అనే నంబర్ ని చూసి అది <code>int</code> అని కంపైలర్ ఆటోమేటిక్ గా అర్థం చేసుకుంటుంది.
      </p>
      <p class="text-prose">
        అలాగే, కొన్ని వాల్యూస్ ప్రోగ్రామ్ రన్ అయ్యేటప్పుడు మారవు (ఉదా: వారానికి 7 రోజులు). వాటిని కంపైల్ చేసే టైమ్ లోనే ఫిక్స్ చేసి, స్పీడ్ పెంచడానికి <strong><code>constexpr</code></strong> ని వాడతారు. ఇది C లో ఉన్న <code>const</code> కి అడ్వాన్స్డ్ వెర్షన్.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Modern C++ Variables)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో మామూలు వేరియబుల్స్ తో పాటు <code>auto</code> మరియు <code>constexpr</code> ఎలా వాడాలో చూద్దాం.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++11/17 — Variables Demo</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;

int main() {
    // కంపైల్ టైమ్ లోనే ఫిక్స్ అయ్యే వాల్యూ (చాలా ఫాస్ట్)
    constexpr int DAYS_IN_WEEK = 7;
    
    // ఆటోమేటిక్ గా కంపైలర్ డేటా టైప్ కనుక్కుంటుంది
    auto price = 99.99;  // ఇది పాయింట్ ఉంది కాబట్టి 'double' అవుతుంది
    auto name = 'A';     // ఇది సింగిల్ కోట్స్ లో ఉంది కాబట్టి 'char' అవుతుంది
    
    std::cout << "Days: " << DAYS_IN_WEEK << std::endl;
    std::cout << "Price: " << price << std::endl;
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>constexpr int DAYS_IN_WEEK = 7;</code>: ఇది మామూలు వేరియబుల్ కాదు. రన్ టైం దాకా ఆగకుండా, కోడ్ కంపైల్ అవుతున్నప్పుడే దీని వాల్యూ సెట్ అయిపోతుంది. దీని వల్ల సాఫ్ట్‌వేర్ పర్ఫార్మెన్స్ పెరుగుతుంది.</li>
        <li><code>auto price = 99.99;</code>: ఇక్కడ మనం <code>double</code> అని రాయలేదు. కానీ కుడి వైపు ఉన్న వాల్యూ (99.99) ని చూసి, కంపైలర్ కి అర్థమైపోయి, దానంతట అదే <code>double price</code> లాగా మార్చుకుంటుంది.</li>
        <li>ప్రింట్ చేసేటప్పుడు <code>std::cout</code> తో అన్నీ ఒకేసారి పంపిస్తున్నాం.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: <code>auto</code> వాడితే పైథాన్ లాగా డైనమిక్ (Dynamic) లాంగ్వేజ్ లా మారిపోతుందా?</h4>
          <p>అస్సలు కాదు! పైథాన్ లో వేరియబుల్ టైప్ రన్ అవుతున్నప్పుడు డిసైడ్ అవుతుంది. కానీ C++ లోని <code>auto</code> కేవలం టైప్ చేయకుండా ఉండటానికి షార్ట్ కట్ మాత్రమే. కంపైలర్ ముందే దాన్ని కనిపెట్టి దానికి ఒక టైప్ ని ఫిక్స్ చేస్తుంది. కాబట్టి 1% కూడా స్పీడ్ తగ్గదు, పర్ఫెక్ట్ C++ లాగానే ఫాస్ట్ గా ఉంటుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: <code>const</code> కి మరియు <code>constexpr</code> కి తేడా ఏంటి?</h4>
          <p><code>const</code> అంటే ఒకసారి వాల్యూ ఇచ్చాక దాన్ని మళ్ళీ మార్చలేము అని అర్థం, కానీ ఆ వాల్యూ ఎప్పుడు వస్తుందో (కంపైల్ టైమ్ ఆ లేక రన్ టైమ్ ఆ) కంపైలర్ కి కచ్చితంగా తెలీదు. కానీ <code>constexpr</code> వాడితే, కంపైల్ చేసే టైమ్ లోనే దాని వాల్యూ కంప్యూటర్ కి తెలిసిపోవాలి. ఇది చాలా ఫాస్ట్ మరియు ఆప్టిమైజ్డ్ గా పనిచేస్తుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: వేరియబుల్ స్కోప్ (Scope) అంటే ఏమిటి?</h4>
          <p>ఒక వేరియబుల్ ఎక్కడ పుట్టింది, ఎక్కడ చనిపోతుంది అని చెప్పేదే స్కోప్. మీరు <code>{ ... }</code> బ్రాకెట్స్ మధ్యలో ఒక వేరియబుల్ క్రియేట్ చేస్తే, ఆ బ్రాకెట్ అవ్వగానే ఆ వేరియబుల్ ఆటోమేటిక్ గా మెమరీ నుండి డిలీట్ అయిపోతుంది. దీన్నే Local Scope అంటారు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 2, "Phase 02", "Variables, Data Types & Scope", subtopics, contentBody, '01-cpp-basics-history-compiler-and-hello-world.html', '1. C++ Fundamentals & Pipeline', '03-cpp-input-cin-getline-and-operators-masterclass.html', '3. cin, getline() & Operators');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 3. cin, getline(), Operators & 6 Practice Programs
function buildLesson3() {
  const title = "cin, getline(), Operators Masterclass (తెలుగులో)";
  const desc = "C++ లో యూజర్ దగ్గర నుండి ఇన్పుట్ ఎలా తీసుకోవాలి? cin కి getline() కి ఉన్న తేడా ఏంటి? ఆపరేటర్స్ ఎలా పనిచేస్తాయో డీప్ గా తెలుసుకుందాం.";
  const filename = "03-cpp-input-cin-getline-and-operators-masterclass.html";
  const subtopics = "User Input (std::cin) · Buffer Issues · getline() · Operators · Math Logic";

  const contentBody = `
    <div class="intro-box">
      <p>మన ప్రోగ్రామ్ లో అన్ని వాల్యూస్ మనమే కోడ్ లో రాసేస్తే (Hardcoding) దానివల్ల ఉపయోగం లేదు. ఉదాహరణకు, క్యాలిక్యులేటర్ యాప్ లో యూజర్ ఏ నంబర్స్ ఇస్తాడో మనకు ముందుగా తెలీదు కదా! అంటే ప్రోగ్రామ్ రన్ అవుతున్నప్పుడు, కీబోర్డ్ ద్వారా యూజర్ దగ్గర నుండి వాల్యూస్ తీసుకోవాలి. దీనికోసమే C++ లో <strong><code>std::cin</code></strong> అనే అద్భుతమైన ఫీచర్ ఉంది. కానీ <code>cin</code> వాడేటప్పుడు చాలా మంది స్టూడెంట్స్ బఫర్ (Buffer) ఇష్యూస్ ఫేస్ చేస్తారు, సగం సగం పేర్లు మాత్రమే వస్తాయి. ఈ ఆర్టికల్ లో <code>cin</code> మరియు <code>getline()</code> ఎలా వాడాలో, వాటితో పాటు ఆపరేటర్స్ (Operators) ఎలా పనిచేస్తాయో డీప్ గా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> cin (Character Input) ఎలా పనిచేస్తుంది?</div>
    <div class="section-body">
      <p class="text-prose">
        మనం C లాంగ్వేజ్ లో <code>scanf</code> వాడినట్లు, C++ లో <code>cin</code> వాడుతాం. <code>cout</code> వాడేటప్పుడు ఎడమ వైపు (<code><<</code>) ఆరోస్ ఉంటాయో, <code>cin</code> వాడేటప్పుడు కుడి వైపు (<code>>></code>) ఆరోస్ ఉంటాయి. అంటే కీబోర్డ్ నుండి వచ్చిన డేటాని ఆ వేరియబుల్ లోకి తోస్తుంది అని అర్థం.
      </p>

      <div class="deep-dive-card">
        <h3>⚠️ రియల్ లైఫ్ ప్రాబ్లెమ్: Space వస్తే cin ఎందుకు ఆగిపోతుంది?</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          మీరు యూజర్ పేరు అడిగారు, అతను <strong>"Ratan Tata"</strong> అని టైప్ చేసాడు అనుకోండి. మీరు <code>cin &gt;&gt; name;</code> అని వాడితే, కంప్యూటర్ కి కేవలం <strong>"Ratan"</strong> మాత్రమే తీసుకుంటుంది! "Tata" ని వదిలేస్తుంది.<br><br>
          ఎందుకంటే <code>cin</code> ఎప్పుడూ కూడా ఒక <strong>స్పేస్ (Space)</strong> లేదా <strong>ఎంటర్ (Enter)</strong> రాగానే ఆగిపోతుంది. దానికి పదాల మధ్య ఉన్న ఖాళీ జాగాలు అర్థం కావు. ఆ సమస్యని పరిష్కరించడానికి వాడేదే <strong><code>std::getline()</code></strong>. ఇది ఒక లైన్ మొత్తాన్ని, స్పేస్ లతో సహా పూర్తిగా చదువుతుంది.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Operators (ఆపరేటర్స్) అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="text-prose">
        ఆపరేటర్స్ అంటే సింబల్స్. మ్యాథ్స్ లో <code>+</code>, <code>-</code> లాగా ప్రోగ్రామింగ్ లో చాలా సింబల్స్ ఉంటాయి.
      </p>
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><strong>Arithmetic:</strong> + (కూడిక), - (తీసివేత), * (గుణకారం), / (భాగాహారం), % (శేషం / Modulo).</li>
        <li><strong>Relational:</strong> == (సమానమా?), != (సమానం కాదా?), &gt;, &lt;.</li>
        <li><strong>Logical:</strong> && (రెండూ నిజం అయితే), || (ఏదో ఒకటి నిజం అయితే).</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Input & getline)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో ముందుగా వయసు (నంబర్) తీసుకుని, ఆ తర్వాత <code>getline()</code> వాడి పేరు ఎలా తీసుకుంటున్నామో చూడండి. (ఇక్కడ బఫర్ క్లియర్ చేయడం చాలా ముఖ్యం).
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++ — cin & getline Demo</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

int main() {
    int age;
    std::string fullName;
    
    std::cout << "Enter your age: ";
    std::cin >> age;
    
    // cin తర్వాత ఎంటర్ (\\n) బఫర్ లో ఉండిపోతుంది, దాన్ని క్లియర్ చేయాలి
    std::cin.ignore(); 
    
    std::cout << "Enter your Full Name: ";
    // స్పేస్ లతో సహా మొత్తం లైన్ ని తీసుకుంటుంది
    std::getline(std::cin, fullName); 
    
    std::cout << "Hello " << fullName << ", you are " << age << " years old.\\n";
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>std::cin &gt;&gt; age;</code>: యూజర్ టైప్ చేసిన నంబర్ ని <code>age</code> లోకి పంపుతుంది. కానీ యూజర్ నంబర్ టైప్ చేసి 'Enter' నొక్కుతాడు కదా, ఆ Enter క్యారెక్టర్ (<code>\\n</code>) కీబోర్డ్ బఫర్ లోనే ఉండిపోతుంది.</li>
        <li><code>std::cin.ignore();</code>: ఇది ఆ మిగిలిపోయిన Enter ని చెత్తబుట్టలో వేస్తుంది (Clear Buffer). ఒకవేళ ఇది రాయకపోతే, కింద ఉన్న getline() దానంతట అదే ఆ Enter ని చదివేసుకుని ఎంప్టీ లైన్ (Empty) ని తీసుకుని ఆగిపోతుంది!</li>
        <li><code>std::getline(std::cin, fullName);</code>: ఇప్పుడు ఇది కరెక్ట్ గా యూజర్ టైప్ చేసిన పూర్తి పేరుని (space లతో కలిపి) చదివి <code>fullName</code> లో పెడుతుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Modulo (<code>%</code>) ఆపరేటర్ ఎక్కడ వాడతారు?</h4>
          <p>భాగాహారం (Division) చేస్తే వచ్చేది కోషంట్ (Quotient). కానీ మోడ్యులో (<code>%</code>) వాడితే వచ్చేది రిమైండర్ (శేషం). ఉదాహరణకు 10 % 3 = 1 వస్తుంది. దీన్ని సరి సంఖ్య (Even) బేసి సంఖ్య (Odd) కనుక్కోవడానికి ఎక్కువగా వాడతారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: <code>cin.ignore()</code> లేకుండా ఉంటే ప్రోగ్రామ్ క్రాష్ అవుతుందా?</h4>
          <p>క్రాష్ అవ్వదు కానీ, లాజికల్ బగ్ వస్తుంది. మీరు ఎప్పుడైతే ఒక నంబర్ (cin) అడిగి, ఆ వెంటనే ఒక స్ట్రింగ్ (getline) అడుగుతారో, అప్పుడు మునుపటి బఫర్ వల్ల సెకండ్ ఇన్పుట్ స్కిప్ అయిపోయి ప్రోగ్రామ్ ముందుకు వెళ్లిపోతుంది. అందుకే cin తర్వాత getline వస్తే ఖచ్చితంగా <code>ignore()</code> వాడాలి.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: C++ లో <code>string</code> అనేది డేటా టైపా లేక క్లాస్ (Class) ఆ?</h4>
          <p>C లాంగ్వేజ్ లో స్ట్రింగ్ అనేది ఒక అక్షరాల సమూహం (Array of characters) మాత్రమే. కానీ C++ లో <code>std::string</code> అనేది ఒక ఫుల్లీ పవర్ ఫుల్ క్లాస్ (Class). దానికి ఎంత పెద్ద టెక్స్ట్ ఇచ్చినా దానంతట అదే సైజు పెంచుకుంటుంది, మరియు అక్షరాలు యాడ్ చేయడం లాంటివి చాలా సింపుల్ గా చేయొచ్చు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 3, "Phase 03", "Input & Operators", subtopics, contentBody, '02-cpp-variables-data-types-constexpr-auto-and-scope.html', '2. Variables, Data Types & Scope', '04-cpp-conditional-branching-if-else-and-switch-case.html', '4. if-else & switch-case');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 4. if-else Ladders, Logical Logic & switch-case
function buildLesson4() {
  const title = "if-else Ladders, Logical Logic & switch-case (తెలుగులో)";
  const desc = "C++ లో Conditional Statements (if-else, switch) ఎలా పనిచేస్తాయి? రియల్ వరల్డ్ యాప్స్ లో డెసిషన్ మేకింగ్ లాజిక్ ఎలా రాస్తారో డీప్ గా తెలుసుకుందాం.";
  const filename = "04-cpp-conditional-branching-if-else-and-switch-case.html";
  const subtopics = "Control Flow · if-else Logic · Logical AND/OR · switch-case · fallthrough";

  const contentBody = `
    <div class="intro-box">
      <p>కంప్యూటర్ కు స్వతహాగా ఆలోచించే శక్తి లేదు. అది ఏది మంచిదో, ఏది చెడ్డదో డిసైడ్ చేయలేదు. "వర్షం వస్తే గొడుగు తీసుకో, ఎండ కాస్తే టోపీ పెట్టుకో" లాంటి డెసిషన్స్ (Decisions) మనం కోడ్ రూపంలో దానికి నేర్పించాలి. ఒకవేళ ఇలా జరిగితే ఇటు వెళ్ళు, లేకపోతే అటు వెళ్ళు అని కంప్యూటర్ కి దారి చూపించడానికి C++ లో మనం వాడే టెక్నిక్స్ నే <strong>Conditional Statements (కండిషనల్ స్టేట్‌మెంట్స్)</strong> అంటారు. ఇందులో ముఖ్యంగా <code>if-else</code> మరియు <code>switch</code> అనేవి ఎలా వాడాలో, వాటితో కాంప్లెక్స్ లాజిక్ ఎలా రాయాలో ఈ పాఠంలో చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> if-else అనేది ఎలా పనిచేస్తుంది?</div>
    <div class="section-body">
      <p class="text-prose">
        <code>if</code> అంటే "ఒకవేళ". బ్రాకెట్స్ లో పెట్టిన కండిషన్ <strong>నిజం (True)</strong> అయితే లోపల ఉన్న కోడ్ రన్ అవుతుంది. ఒకవేళ అబద్ధం (False) అయితే, పక్కనే ఉన్న <code>else</code> (లేకపోతే) లోపల ఉన్న కోడ్ రన్ అవుతుంది.
      </p>

      <div class="deep-dive-card">
        <h3>💳 రియల్ లైఫ్ స్టోరీ: ఏటీఎం (ATM) లో డబ్బులు డ్రా చేయడం</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          మీరు ఏటీఎంలో కార్డు పెట్టి పిన్ నంబర్ కొడతారు కదా. అక్కడ ఏటీఎం మెషిన్ లోపల సాఫ్ట్‌వేర్ ఇలా ఆలోచిస్తుంది:<br><br>
          <strong>ఒకవేళ (if):</strong> మీరు ఎంటర్ చేసిన పిన్ == బ్యాంక్ లో ఉన్న పిన్ అయితే...<br>
          👉 అప్పుడు డబ్బులు కౌంట్ చేసి బయటకి ఇవ్వు.<br><br>
          <strong>లేకపోతే (else):</strong><br>
          👉 "Wrong PIN" అని స్క్రీన్ మీద చూపించు.<br><br>
          ఇలా మన రియల్ లైఫ్ లో ఉన్న ప్రతి కండిషన్ ని <code>if-else</code> తో రాయొచ్చు! ఒకవేళ కండిషన్స్ మరీ ఎక్కువ ఉంటే <code>else if</code> వాడుకుంటూ వెళ్ళొచ్చు (దీన్నే if-else ladder అంటారు).
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> switch-case ఎందుకు వాడాలి?</div>
    <div class="section-body">
      <p class="text-prose">
        మీ దగ్గర ఒకే వేరియబుల్ ఉండి, దానికి చాలా ఆప్షన్స్ ఉంటే (ఉదాహరణకు 1 నొక్కితే కస్టమర్ కేర్ కి తెలుగు, 2 నొక్కితే హిందీ, 3 నొక్కితే ఇంగ్లీష్) దానికి పదే పదే <code>else if</code> రాయడం కోడ్ చదవడానికి చాలా కష్టంగా ఉంటుంది. ఇలాంటి మెనూ (Menu) లాంటి సిచువేషన్స్ కోసం C++ మనకు <strong><code>switch</code></strong> ని ఇచ్చింది. ఇది డైరెక్ట్ గా ఏ ఆప్షన్ మ్యాచ్ అయితే అక్కడికి జంప్ చేస్తుంది, స్పీడ్ ఎక్కువ!
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Switch Case Menu)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో <code>switch</code> వాడి ఒక సింపుల్ టోల్ గేట్ సిస్టమ్ ని ఎలా డిజైన్ చేసామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++ — Switch Case Demo</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;

int main() {
    int vehicleType = 2; // 1: Bike, 2: Car, 3: Bus
    
    std::cout << "Approaching Toll Gate..." << std::endl;
    
    // Switch లోపలికి డైరెక్ట్ గా జంప్ చేస్తుంది
    switch(vehicleType) {
        case 1:
            std::cout << "Bike Toll: 20 Rs" << std::endl;
            break; // ఇక్కడ బ్రేక్ చేస్తే బయటకి వచ్చేస్తుంది
        case 2:
            std::cout << "Car Toll: 50 Rs" << std::endl;
            break;
        case 3:
            std::cout << "Bus Toll: 150 Rs" << std::endl;
            break;
        default:
            std::cout << "Unknown Vehicle! Go to Office." << std::endl;
    }
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>switch(vehicleType)</code> అనగానే కంపైలర్ <code>vehicleType</code> వాల్యూ ఎంత ఉందో (ఇక్కడ 2) చూసుకుని, మిగతావి వదిలేసి డైరెక్ట్ గా <code>case 2:</code> దగ్గరికి జంప్ అవుతుంది.</li>
        <li>అక్కడ "Car Toll" ప్రింట్ అయ్యాక, <code>break;</code> వస్తుంది. ఆ బ్రేక్ ఉండటం వల్లే అది అక్కడితో ఆగిపోయి స్విచ్ బాక్స్ లోనుండి బయటకి వచ్చేస్తుంది.</li>
        <li>ఒకవేళ మీరు పైన 5 అని ఇచ్చారనుకోండి, అసలు ఆ ఆప్షన్ అక్కడ లేదు కాబట్టి, ఆటోమేటిక్ గా <code>default:</code> లో ఉన్నది రన్ అవుతుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Switch లోపల <code>break;</code> రాయకపోతే ఏమవుతుంది?</h4>
          <p>దీన్నే <strong>Fallthrough (ఫాల్ త్రూ)</strong> అంటారు. బ్రేక్ లేకపోతే అది మ్యాచ్ అయిన దగ్గర నుండి కింద ఉన్న అన్ని కేసులను (సంబంధం లేకపోయినా) బ్లైండ్ గా రన్ చేసుకుంటూ వెళ్ళిపోతుంది! కొన్నిసార్లు ఉద్దేశపూర్వకంగా మల్టిపుల్ కేసులకు ఒకటే రిజల్ట్ ఇవ్వడానికి దీన్ని వాడతారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: <code>switch</code> లో స్ట్రింగ్స్ (పదాలు) వాడొచ్చా?</h4>
          <p>లేదండి! C++ లో <code>switch</code> అనేది కేవలం ఇంటీజర్స్ (నంబర్స్) మరియు అక్షరాలకు (chars లేదా enums) మాత్రమే సపోర్ట్ చేస్తుంది. జావా లాగా C++ లో డైరెక్ట్ గా టెక్స్ట్ తో మ్యాచ్ చేయడం కుదరదు. స్ట్రింగ్స్ తో మ్యాచ్ చేయాలంటే మీరు ఖచ్చితంగా <code>if-else</code> మాత్రమే వాడాలి.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: <code>=</code> కి మరియు <code>==</code> కి తేడా ఏంటి?</h4>
          <p><code>=</code> అంటే ఒక డబ్బాలోకి వాల్యూ ని అసైన్ చేయడం (పెట్టడం). <code>==</code> అంటే రెండు వాల్యూస్ సమానంగా ఉన్నాయా లేదా అని పోల్చడం (Compare). చాలామంది స్టూడెంట్స్ <code>if(a = 5)</code> అని రాస్తారు, అది తప్పు! అప్పుడు ఆ కండిషన్ ఎప్పటికీ నిజమే అవుతుంది. కరెక్ట్ పద్ధతి <code>if(a == 5)</code>.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 4, "Phase 04", "Conditional Statements", subtopics, contentBody, '03-cpp-input-cin-getline-and-operators-masterclass.html', '3. cin & Operators', '05-cpp-loops-for-while-do-while-and-range-based-for.html', '5. Loops & Control Flow');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 5. for, while, Range-for & 9 Practice Programs
function buildLesson5() {
  const title = "for, while, Range-for & Practice (తెలుగులో)";
  const desc = "C++ లో ఒకే పనిని వంద సార్లు ఎలా చేయాలి? Loops (for, while, do-while) అంటే ఏంటి? C++11 లో వచ్చిన Range-based for loop ని డీప్ ఎక్స్‌ప్లనేషన్ తో నేర్చుకుందాం.";
  const filename = "05-cpp-loops-for-while-do-while-and-range-based-for.html";
  const subtopics = "Iteration · for Loop · while Loop · Range-based for (C++11) · break & continue";

  const contentBody = `
    <div class="intro-box">
      <p>కంప్యూటర్లకు ఉన్న అతిపెద్ద పవర్ ఏంటంటే అలసిపోకుండా ఒకే పనిని కోట్లాది సార్లు సెకన్ల వ్యవధిలో చేయడం! మీరు ఒక లైన్ ని 10 సార్లు ప్రింట్ చేయాలంటే 10 సార్లు <code>cout</code> రాయొచ్చు. కానీ లక్ష సార్లు ప్రింట్ చేయాలంటే? అలా కోడ్ రాసుకుంటూ పోవడం సాధ్యం కాదు. ఇక్కడే మనకు <strong>Loops (లూప్స్)</strong> అనే బ్రహ్మాస్త్రం ఉపయోగపడుతుంది. ఒక కండిషన్ నిజం అయ్యేంతవరకు ఒకే కోడ్ ని పదే పదే తిప్పడాన్నే లూప్స్ అంటారు. పాత లూప్స్ తో పాటు మోడరన్ C++ లో వచ్చిన <strong>Range-based for loop</strong> అనే అద్భుతమైన ఫీచర్ గురించి ఇక్కడ డీప్ గా నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> లూప్స్ లో రకాలు (Types of Loops)</div>
    <div class="section-body">
      <p class="text-prose">
        మనకి మూడు ప్రధానమైన లూప్స్ ఉన్నాయి. అవసరాలను బట్టి ప్రోగ్రామర్ సరైన లూప్ ని ఎంచుకోవాలి.
      </p>
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><strong>for Loop:</strong> మీకు "ఎన్నిసార్లు" తిప్పాలో ముందే ఖచ్చితంగా తెలిస్తే (ఉదా: 1 నుండి 100 వరకు) ఇది బెస్ట్.</li>
        <li><strong>while Loop:</strong> ఎన్నిసార్లు తిరగాలో తెలీదు, కానీ ఒక కండిషన్ బ్రేక్ అయ్యేవరకు తిరుగుతూనే ఉండాలి అంటే (ఉదా: యూజర్ 0 నొక్కేదాకా గేమ్ ఆడాలి) ఇది బెస్ట్.</li>
        <li><strong>do-while Loop:</strong> కండిషన్ చెక్ చేయకుండా కనీసం ఒక్కసారి అయినా కోడ్ రన్ అవ్వాలి, ఆ తర్వాతే చెక్ చేయాలి అనుకుంటే ఇది వాడాలి.</li>
      </ul>

      <div class="deep-dive-card">
        <h3>🎧 రియల్ లైఫ్ స్టోరీ: మ్యూజిక్ ప్లేయర్ లో "Repeat" బటన్</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          మీరు ఒక పాట వింటున్నారు, అది చాలా నచ్చింది. మీరు ఆ పాటను 5 సార్లు వినాలనుకుంటే మీరు ప్లేయర్ లో కౌంట్ పెట్టుకుంటారు. (ఇదే <code>for</code> లూప్).<br><br>
          కానీ, మీరు పని చేసుకుంటున్నంత సేపు ఆ పాట ప్లే అవుతూనే ఉండాలి, పని అవ్వగానే మీరే ఆపేస్తారు. ఇది <code>while</code> లూప్ లాంటిది (పని జరుగుతున్నంత సేపు సాంగ్ లూప్ అవుతూనే ఉంటుంది). కంప్యూటర్లు ఈ సైక్లింగ్ ని ఉపయోగించే ప్రపంచంలో ఎన్నో అద్భుతాలు చేస్తాయి.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Modern C++ లో Range-based for loop</div>
    <div class="section-body">
      <p class="text-prose">
        పాత స్టైల్ <code>for(int i=0; i<10; i++)</code> రాయాలంటే చాలా మంది తప్పులు చేస్తారు (ఉదాహరణకు <code><=</code> పెట్టాల్నా వద్దా అని). ఈ కన్ఫ్యూజన్ పోగొట్టడానికి C++11 లో పైథాన్ లాంటి ఒక సింపుల్ సింటాక్స్ తెచ్చారు. అదే <strong>Range-based for loop</strong>. మీ దగ్గర ఒక డేటా బాక్స్ (Array/Vector) ఉంటే, ఆ బాక్స్ లో ఉన్న ప్రతి వస్తువు (Item) దగ్గరికి అది ఆటోమేటిక్ గా వెళ్లి డేటాని తెస్తుంది, మనమేమీ కౌంట్ చేయక్కర్లేదు!
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Range-based for)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో పాత స్టైల్ కౌంటింగ్ లేకుండా, C++11 వాడి ఎంత క్లీన్ గా లూప్ రాశామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++11 — Range-based for Loop</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;

int main() {
    // ఒక అర్రే (బాక్స్) లో 5 మార్కులు ఉన్నాయి
    int marks[] = {85, 90, 75, 92, 88};
    
    std::cout << "Marks List:" << std::endl;
    
    // C++11 మ్యాజిక్: అర్రే లో ఉన్న ప్రతి మార్కు 'm' లోకి వస్తుంది
    for (int m : marks) {
        std::cout << "=> " << m << std::endl;
    }
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>int marks[]</code>: ఇక్కడ 5 నంబర్స్ ని ఒక గ్రూప్ గా పెట్టుకున్నాం.</li>
        <li><code>for (int m : marks)</code>: దీని అర్థం "marks అనే గ్రూప్ లో ఉన్న ప్రతి ఒక్క ఐటమ్ ని తీసుకుని, దానికి <code>m</code> అని పేరు పెట్టు" అని.</li>
        <li>మొదటి సారి లూప్ తిరిగినప్పుడు m వాల్యూ 85 అవుతుంది, రెండోసారి 90 అవుతుంది... ఇలా ఆ బాక్స్ లో ఐటమ్స్ అయిపోయేదాకా అది దానంతట అదే తిరుగుతుంది. ఇండెక్స్ లు (i=0) కౌంట్ చేయాల్సిన పని లేదు!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: <code>break</code> మరియు <code>continue</code> కి తేడా ఏంటి?</h4>
          <p>లూప్ నడుస్తున్నప్పుడు మధ్యలో ఆగిపోయి <strong>మొత్తం లూప్ లోనుండి బయటకి</strong> పారిపోవాలంటే <code>break</code> వాడతారు. కానీ కేవలం ఆ ఒక్క రౌండ్ ని స్కిప్ చేసి (దూకేసి) <strong>నెక్స్ట్ రౌండ్ ని కంటిన్యూ</strong> చేయాలంటే <code>continue</code> వాడతారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: ఇన్ఫినిట్ లూప్ (Infinite Loop) అంటే ఏంటి? అది మంచిదేనా?</h4>
          <p>కండిషన్ ఎప్పటికీ అబద్ధం కాకపోతే లూప్ ఆగదు, జీవితాంతం తిరుగుతూనే ఉంటుంది. పొరపాటున పడితే ప్రోగ్రామ్ క్రాష్ అవుతుంది (బ్రౌజర్ హ్యాంగ్ అయినట్లు). కానీ గేమ్స్ లో (గేమ్ ఇంజిన్ లూప్) మరియు సర్వర్స్ లో ఉద్దేశపూర్వకంగా <code>while(true)</code> అని రాసి ఇన్ఫినిట్ లూప్స్ వాడుతారు, ఎందుకంటే అవి ఎప్పటికీ ఆఫ్ అవ్వకూడదు కాబట్టి!</p>
        </div>
        <div class="faq-item">
          <h4>Q3: Range-based for loop లో <code>int m</code> బదులు <code>auto m</code> రాయొచ్చా?</h4>
          <p>ఖచ్చితంగా రాయొచ్చు! అదొక్కటే కాదు, మోడరన్ C++ లో మెమరీ వేస్ట్ కాకుండా ఉండటానికి <code>auto& m</code> అని పాయింటర్స్ రిఫరెన్స్ లాగా రాస్తారు. ఇది డేటాని కాపీ చేయకుండా డైరెక్ట్ గా అసలు డేటాని వాడుకుంటుంది, దీని వల్ల స్పీడ్ అమాంతం పెరుగుతుంది.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 5, "Phase 05", "Loops & Control Flow", subtopics, contentBody, '04-cpp-conditional-branching-if-else-and-switch-case.html', '4. if-else & switch-case', '06-cpp-functions-prototypes-overloading-and-lambdas.html', '6. Functions & Modular Code');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}


function run() {
  buildLesson1();
  buildLesson2();
  buildLesson3();
  buildLesson4();
  buildLesson5();
  console.log("✅ Generated C++ Lessons 1 to 5 with MASSIVE Text, Deep Stories, and ONLY ONE short code!");
}
run();
