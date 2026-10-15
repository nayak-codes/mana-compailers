const fs = require('fs');
const path = require('path');
const { wrapCppPage } = require('./build_cpp_10_phases_master.js');

const cDir = path.join(__dirname, '..', 'public', 'blog-cpp');
if (!fs.existsSync(cDir)) {
  fs.mkdirSync(cDir, { recursive: true });
}

// 16. Lambdas, Captures, std::function & Closures
function buildLesson16() {
  const title = "Lambda Expressions & Closures (తెలుగులో)";
  const desc = "C++11 లో వచ్చిన ఒక విప్లవం లాంబ్డా ఎక్స్‌ప్రెషన్స్ (Lambda Expressions). పేరు లేని ఫంక్షన్స్ ని ఎలా క్రియేట్ చేయాలి? వాల్యూస్ ని ఎలా క్యాప్చర్ (Capture) చేయాలో డీప్ గా చూద్దాం.";
  const filename = "16-cpp-lambda-expressions-captures-std-function-and-closures.html";
  const subtopics = "Anonymous Functions · Capture List [=, &] · std::function · Closures · Modern C++ Callbacks";

  const contentBody = `
    <div class="intro-box">
      <p>మనం ఇంతకుముందు నేర్చుకున్నట్లుగా, ఒక పని చేయాలంటే దానికి ఒక ఫంక్షన్ రాసి, ఒక పేరు పెట్టి, మెయిన్ ఫంక్షన్ లోకి పిలవాలి. కానీ ఒకేఒక్క లైన్ లాజిక్ (ఉదాహరణకు రెండు నంబర్స్ ని గుణించడం) కోసం ఇంకో పెద్ద ఫంక్షన్ రాసి పేరు పెట్టడం టైమ్ వేస్ట్ కాదా? ఈ ప్రాబ్లెమ్ ని సాల్వ్ చేయడానికే C++11 లో <strong>Lambda Expressions (లాంబ్డా ఎక్స్‌ప్రెషన్స్)</strong> వచ్చాయి. ఇవి పేరు లేని ఫంక్షన్స్ (Anonymous Functions). వీటిని డైరెక్ట్ గా కోడ్ మధ్యలోనే ఎక్కడ పడితే అక్కడ వాడేయొచ్చు. ముఖ్యంగా GUI ఈవెంట్స్ లో, త్రెడ్స్ (Threads) లో వీటి వాడకం విపరీతంగా ఉంటుంది. ఇవి ఎలా పనిచేస్తాయో డీప్ గా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> అసలు లాంబ్డా (Lambda) అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="text-prose">
        లాంబ్డా అనేది పేరు లేని ఒక చిన్న ఫంక్షన్. దీని సింటాక్స్ చూడటానికి చాలా విచిత్రంగా ఉంటుంది: <code>[] (పరామీటర్స్) { కోడ్ }</code>. బ్రాకెట్స్ ఉన్నాయి కదా, వాటినే లాంబ్డా ఐడెంటిటీ అంటారు.
      </p>

      <div class="deep-dive-card">
        <h3>🍔 రియల్ లైఫ్ స్టోరీ: హోటల్ మెనూ vs డ్రైవ్-త్రూ ఆర్డర్</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          ఒక రెగ్యులర్ ఫంక్షన్ రాయడం అనేది పెద్ద హోటల్ లో మెనూ డిజైన్ చేసి, వంటగాడికి పేరు పెట్టి చేయించడం లాంటిది. ఇది చాలా ఫార్మల్ ప్రాసెస్.<br><br>
          కానీ ఒక లాంబ్డా ఫంక్షన్ అనేది <strong>డ్రైవ్-త్రూ (Drive-thru)</strong> లో ఆర్డర్ ఇవ్వడం లాంటిది. "నాకు ఒక బర్గర్ కావాలి" అని ఫాస్ట్ గా ఆన్ ది స్పాట్ లోనే చెప్పేస్తాం. ఎవరి పేరు అడగం, మెనూ చూడము. జస్ట్ పని అయిపోయిందా లేదా అన్నదే ముఖ్యం. అలాగే కోడ్ లో ఎక్కడైనా ఒక చిన్న ఫంక్షన్ ఆన్ ది స్పాట్ లో కావాలంటే (ఉదా: <code>std::sort</code> కి కస్టమ్ లాజిక్ ఇవ్వడానికి) లాంబ్డాస్ ని వాడుతారు.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Capture List (క్యాప్చర్ లిస్ట్) యొక్క పవర్!</div>
    <div class="section-body">
      <p class="text-prose">
        సాధారణ ఫంక్షన్స్ కి బయట మెయిన్ లో ఉన్న వేరియబుల్స్ ఏమి జరుగుతున్నాయో తెలీదు. కానీ లాంబ్డాస్ కు ఉన్న సూపర్ పవర్ ఏంటంటే, అవి బయట ఉన్న వేరియబుల్స్ ని లోపలికి లాగేసుకుంటాయి. దీన్నే <strong>Capturing (క్యాప్చర్)</strong> అంటారు. ఇది <code>[]</code> స్క్వేర్ బ్రాకెట్స్ ద్వారా జరుగుతుంది.
      </p>
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>[=]</code> : బయట ఉన్న వేరియబుల్స్ అన్నిటినీ జిరాక్స్ (Copy / Value) తీసుకుని లోపలికి వస్తుంది. లోపల మీరు ఆ వాల్యూ ని మార్చలేరు (Read-only).</li>
        <li><code>[&]</code> : బయట ఉన్న వేరియబుల్స్ అన్నిటినీ ఒరిజినల్ అడ్రస్ (Reference) ద్వారా లోపలికి తెస్తుంది. లోపల మీరు మార్చితే, బయట కూడా వాల్యూ మారిపోతుంది!</li>
        <li><code>[x, &y]</code> : కేవలం x ని కాపీ లాగా, y ని రిఫరెన్స్ లాగా పర్టికులర్ గా తీసుకోవడం.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Lambda Demo)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో <code>auto</code> కీవర్డ్ వాడి ఒక లాంబ్డా ని ఎలా సేవ్ చేసుకుంటున్నామో, మరియు క్యాప్చర్ లిస్ట్ ఎలా వాడుతున్నామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++11 — Lambda Expressions</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt; // For for_each

int main() {
    int outsideNumber = 50;
    int multiplier = 2;
    
    // 1. సింపుల్ లాంబ్డా (దీనికి పేరు లేదు, కాబట్టి auto లో స్టోర్ చేసాం)
    auto sayHello = []() {
        std::cout << "Hello from Lambda!" << std::endl;
    };
    sayHello(); // ఫంక్షన్ లాగా కాల్ చేయడం
    
    // 2. Capture by Reference [&] వాడి లాంబ్డా రాయడం
    // బయట ఉన్న outsideNumber ని లోపల మార్చేస్తున్నాం!
    auto changeNumber = [&]() {
        outsideNumber += 100; // Original value changes
    };
    changeNumber();
    std::cout << "After Lambda, Number is: " << outsideNumber << std::endl;
    
    // 3. అల్గారిథమ్స్ లో ఆన్ ది స్పాట్ వాడకం
    std::vector&lt;int&gt; marks = {10, 20, 30};
    std::cout << "Marks multiplied by " << multiplier << ":" << std::endl;
    
    // [multiplier] వాడి బయట ఉన్న 2 ని లోపలికి (కాపీ) తెచ్చుకున్నాం
    std::for_each(marks.begin(), marks.end(), [multiplier](int m) {
        std::cout << m * multiplier << " ";
    });
    std::cout << std::endl;
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>auto sayHello = []() { ... }</code>: ఇక్కడ లాంబ్డా కి అసలు పేరు లేదు. కానీ దాన్ని ఎప్పుడైనా మళ్ళీ వాడుకోవడానికి మనం ఒక <code>auto</code> వేరియబుల్ కి అసైన్ చేశాం.</li>
        <li><code>[&]()</code>: ఈ స్క్వేర్ బ్రాకెట్ లో <code>&amp;</code> ఉండటం వల్ల, ఆ ఫంక్షన్ బయట ఉన్న <code>outsideNumber</code> ని డైరెక్ట్ గా రిఫరెన్స్ చేసుకుంది. ఒకవేళ <code>[=]</code> అని రాసి ఉంటే లోపల <code>+= 100</code> చేసినప్పుడు కంపైలర్ ఎర్రర్ ఇచ్చేది (Read-only అని).</li>
        <li><code>std::for_each</code>: ఇది ఒక అద్భుతమైన ఫంక్షన్. వెక్టార్ లో ఉన్న ప్రతి ఐటమ్ ని తీసుకుని, మనం పక్కన రాసిన లాంబ్డా లోపలికి (పరామీటర్ గా) పంపుతుంది. ఇలా సింగిల్ లైన్ లో లూప్స్ ని ముగించేయొచ్చు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: C++ లో క్లోజర్ (Closure) అంటే ఏమిటి?</h4>
          <p>మీరు ఒక లాంబ్డా ఎక్స్‌ప్రెషన్ ని రాసినప్పుడు, ఆ లాంబ్డా బయట ఉన్న వేరియబుల్స్ ని క్యాప్చర్ (Capture) చేసుకుని, తనలోపల దాచుకుంటుంది కదా. అలా డేటాని, ఫంక్షన్ లాజిక్ ని కలిపి ప్యాక్ చేసిన ఒక రన్-టైమ్ ఆబ్జెక్ట్ నే <strong>Closure</strong> అంటారు. లాంబ్డా అనేది కోడ్ (Syntax), క్లోజర్ అనేది మెమరీలో క్రియేట్ అయిన వస్తువు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: <code>std::function</code> అంటే ఏంటి? అది లాంబ్డా తో ఎందుకు వాడుతారు?</h4>
          <p>మనం లాంబ్డా ని <code>auto</code> లో స్టోర్ చేసాం. కానీ ఒక లాంబ్డా ని ఇంకో ఫంక్షన్ కి ఆర్గ్యుమెంట్ గా పంపాలంటే (ఉదాహరణకు త్రెడ్ స్టార్ట్ చేయడానికి), అప్పుడు దాని డేటా టైప్ ఎంటో కచ్చితంగా చెప్పాలి. అప్పుడే <code>std::function&lt;void(int)&gt;</code> అనే దాన్ని వాడతారు. ఇది ఎలాంటి ఫంక్షన్ లేదా లాంబ్డా ని అయినా తనలో స్టోర్ చేసుకోగల ఒక స్పెషల్ రాపర్ (Wrapper) క్లాస్.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: క్యాప్చర్ లిస్ట్ లో ఉన్న <code>mutable</code> కీవర్డ్ ఎందుకు?</h4>
          <p>మీరు <code>[=]</code> (కాపీ) వాడినప్పుడు లోపల వాల్యూస్ మార్చలేరు అని చెప్పుకున్నాం. కానీ మీకు ఒరిజినల్ వేరియబుల్ ని మార్చకుండా, కేవలం కాపీ చేసుకున్న వాల్యూ ని మాత్రమే లోపల మార్చుకోవాలి అనిపిస్తే (ఉదాహరణకు ఒక కౌంటర్ లాగా), అప్పుడు లాంబ్డా పక్కన <code>mutable</code> కీవర్డ్ రాస్తారు. (ఉదా: <code>[=]() mutable { ... }</code>). అప్పుడు రీడ్-ఓన్లీ రెస్ట్రిక్షన్ పోతుంది.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 16, "Phase 16", "Lambda Expressions", subtopics, contentBody, '15-cpp-iterators-algorithms-sort-find-transform-and-stl.html', '15. Iterators & Algorithms', '17-cpp-smart-pointers-unique-ptr-shared-ptr-weak-ptr-and-raii.html', '17. Smart Pointers & Memory');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 17. unique_ptr, shared_ptr, weak_ptr & RAII Memory
function buildLesson17() {
  const title = "Smart Pointers & Memory Safety (తెలుగులో)";
  const desc = "C++11 లో వచ్చిన Smart Pointers (unique_ptr, shared_ptr, weak_ptr) తో మెమరీ లీక్స్ లేకుండా ఎలా కోడ్ చేయాలో కంప్లీట్ మాస్టర్ క్లాస్.";
  const filename = "17-cpp-smart-pointers-unique-ptr-shared-ptr-weak-ptr-and-raii.html";
  const subtopics = "Memory Leaks · unique_ptr · shared_ptr · weak_ptr · Ownership semantics";

  const contentBody = `
    <div class="intro-box">
      <p>పాత C++ లో మీరు <code>new</code> వాడి ఒక ఆబ్జెక్ట్ క్రియేట్ చేస్తే, కచ్చితంగా <code>delete</code> వాడి దాన్ని క్లీన్ చేయాలి. ఒకవేళ మీరు మర్చిపోయినా, లేదా ప్రోగ్రామ్ మధ్యలో ఎర్రర్ వచ్చి క్రాష్ అయినా... ఆ మెమరీ (RAM) లాక్ అయిపోయి అలానే ఉండిపోతుంది. దీన్నే <strong>Memory Leak (మెమరీ లీక్)</strong> అంటారు. ఈ లీక్స్ వల్ల సర్వర్లు కొద్దిసేపటికి హ్యాంగ్ అయిపోతాయి. దీనికి చెక్ పెట్టడానికే C++11 లో <strong>Smart Pointers (స్మార్ట్ పాయింటర్స్)</strong> అనే గొప్ప ఫీచర్ ని తెచ్చారు. ఇవి దానంతట అవే <code>delete</code> అవుతాయి! ఈ ఆర్టికల్ లో <code>unique_ptr</code> మరియు <code>shared_ptr</code> ఎలా పనిచేస్తాయో డీప్ గా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Smart Pointers అంటే ఏమిటి? (RAII మ్యాజిక్)</div>
    <div class="section-body">
      <p class="text-prose">
        స్మార్ట్ పాయింటర్ అనేది మామూలు పాయింటర్ కాదు, అదొక క్లాస్. దాని లోపల మామూలు పాయింటర్ ఉంటుంది, కానీ డిస్ట్రక్టర్ (Destructor) లో <code>delete</code> అనే కోడ్ రాసి ఉంటుంది. కాబట్టి ఆ స్మార్ట్ పాయింటర్ స్కోప్ (బ్రాకెట్) అవ్వగానే, అది చనిపోతూ చనిపోతూ లోపల ఉన్న మెమరీని కూడా ఆటోమేటిక్ గా డిలీట్ చేస్తుంది.
      </p>

      <div class="deep-dive-card">
        <h3>🚗 రియల్ లైఫ్ స్టోరీ: ఓలా క్యాబ్ (Ola) మరియు కారు రెంటల్</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          <strong>Unique Pointer (ఓన్ కారు లాంటిది):</strong> మీరు ఒక కారు కొన్నారు. ఆ కారు కి మీరు మాత్రమే ఓనర్ (Owner). మీ ఫ్రెండ్ కి అడ్రస్ చెప్పొచ్చు కానీ, అతను ఓనర్ కాలేడు. ఆ కారు మీద పూర్తి హక్కులు మీకే ఉంటాయి. దీన్నే <code>std::unique_ptr</code> అంటారు. ఒక మెమరీ కి ఒకరే ఓనర్ ఉండాలి.<br><br>
          <strong>Shared Pointer (షేరింగ్ కారు):</strong> ఒక కారుని ముగ్గురు ఫ్రెండ్స్ కలిసి కొన్నారు అనుకోండి. ఆ కారు కి ముగ్గురూ ఓనర్లే. ముగ్గురు వాడుకుంటారు. కానీ ఆ ముగ్గురిలో చివరివాడు ఎప్పుడైతే ఆ కారు వదిలేస్తాడో, అప్పుడే ఆ కారు స్క్రాప్ (delete) అవుతుంది. ముందే డిలీట్ అవ్వదు. దీన్నే <code>std::shared_ptr</code> అంటారు (ఇది లోపల Reference Counting అనే టెక్నిక్ ని వాడుతుంది).
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Unique vs Shared vs Weak Pointers</div>
    <div class="section-body">
      <p class="text-prose">
        <strong>1. <code>std::unique_ptr</code></strong>: ఇది చాలా ఫాస్ట్. దీని ఓనర్షిప్ (Ownership) ని మనం వేరే పాయింటర్ కి ట్రాన్స్‌ఫర్ (<code>std::move</code>) చేయగలం కానీ, కాపీ (Copy) చేయలేము.
      </p>
      <p class="text-prose">
        <strong>2. <code>std::shared_ptr</code></strong>: ఒకే ఆబ్జెక్ట్ ని చాలా పాయింటర్స్ పట్టుకుని ఉన్నప్పుడు ఇది వాడాలి. లోపల ఇది కౌంటర్ మెయింటైన్ చేస్తుంది. కౌంటర్ 0 అయినప్పుడు మాత్రమే ఆబ్జెక్ట్ డిలీట్ అవుతుంది.
      </p>
      <p class="text-prose">
        <strong>3. <code>std::weak_ptr</code></strong>: ఇద్దరు <code>shared_ptr</code> లు ఒకరినొకరు పాయింట్ చేసుకుంటే (Cyclic Reference) కౌంటర్ ఎప్పటికీ 0 అవ్వదు, మెమరీ లీక్ అవుతుంది. దాన్ని బ్రేక్ చేయడానికి కౌంటర్ పెంచని ఒక డమ్మీ పాయింటర్ గా <code>weak_ptr</code> వాడుతారు.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Smart Pointers)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో <code>new</code> మరియు <code>delete</code> ఎక్కడా వాడకుండా <code>std::make_unique</code> మరియు <code>std::make_shared</code> వాడి ఆబ్జెక్ట్స్ ని సేఫ్ గా ఎలా క్రియేట్ చేసామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++11/14 — Smart Pointers Demo</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;memory&gt; // స్మార్ట్ పాయింటర్స్ కోసం 

class Player {
public:
    Player() { std::cout << "Player Spawned! (Memory Allocated)" << std::endl; }
    ~Player() { std::cout << "Player Dead! (Memory Freed)" << std::endl; }
    void shoot() { std::cout << "Pew Pew!" << std::endl; }
};

int main() {
    std::cout << "--- Game Started ---" << std::endl;
    
    {
        // 1. Unique Pointer (సింగిల్ ఓనర్)
        // C++14 లో వచ్చిన make_unique వాడటమే బెస్ట్ ప్రాక్టీస్ 
        std::unique_ptr&lt;Player&gt; p1 = std::make_unique&lt;Player&gt;();
        p1->shoot();
        
        // 2. Shared Pointer (మల్టిపుల్ ఓనర్స్)
        std::shared_ptr&lt;Player&gt; s1 = std::make_shared&lt;Player&gt;();
        std::shared_ptr&lt;Player&gt; s2 = s1; // ఇప్పుడు కౌంటర్ 2 అయింది!
        
        std::cout << "Shared Count: " << s1.use_count() << std::endl;
        
    } // బ్రాకెట్ అవ్వగానే అన్నీ ఆటోమేటిక్ గా డిలీట్ అవుతాయి (No delete keywords needed!)
    
    std::cout << "--- Game Ended ---" << std::endl;
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>#include &lt;memory&gt;</code>: స్మార్ట్ పాయింటర్స్ వాడాలంటే కచ్చితంగా ఈ హెడర్ ఫైల్ ఉండాలి.</li>
        <li><code>std::make_unique&lt;Player&gt;()</code>: ఇది డైరెక్ట్ గా <code>new Player()</code> లాగానే మెమరీ తీసుకుంటుంది, కానీ ఆటోమేటిక్ గా సేఫ్ గా దాచిపెడుతుంది.</li>
        <li><code>s2 = s1;</code>: మనం s1 ని s2 కి కాపీ చేసినప్పుడు, లోపల ఉన్న కౌంటర్ (Reference Count) 1 నుండి 2 కి మారుతుంది. ఎప్పుడైతే ఆ రెండు పాయింటర్స్ చనిపోతాయో (స్కోప్ దాటుతాయో) అప్పుడు కౌంటర్ 0 అయ్యి, అప్పుడు మాత్రమే డిస్ట్రక్టర్ కాల్ అవుతుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: <code>new Player()</code> రాయడానికి, <code>make_unique&lt;Player&gt;()</code> రాయడానికి తేడా ఏంటి?</h4>
          <p>మీరు <code>new</code> వాడితే మెమరీ అలోకేట్ అయ్యే టైమ్ లో ఏదైనా ఎక్సెప్షన్ (Exception) వస్తే లీక్ అయ్యే ప్రమాదం ఉంది. కానీ <code>make_unique</code> అనేది C++14 లో తెచ్చిన ఒక సేఫ్టీ ఫంక్షన్. ఇది మెమరీ ని తీసుకుని, ఆబ్జెక్ట్ ని క్రియేట్ చేసి సింగిల్ స్టెప్ లో స్మార్ట్ పాయింటర్ కి ఇస్తుంది. ఎప్పుడూ make_unique నే వాడాలి.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: నేను ఒక <code>unique_ptr</code> ని ఇంకో ఫంక్షన్ కి పాస్ చేయొచ్చా?</h4>
          <p>డైరెక్ట్ గా వాల్యూ లాగా పాస్ చేయలేరు (ఎందుకంటే దాన్ని కాపీ చేయడం ఒప్పుకోదు). మీరు దాన్ని రిఫరెన్స్ (<code>const std::unique_ptr&lt;Player&gt;&amp;</code>) లాగా పాస్ చేయొచ్చు లేదా ఓనర్షిప్ మొత్తం వాళ్ళకి ఇచ్చేయాలి అనుకుంటే <code>std::move(p1)</code> వాడి పాస్ చేయొచ్చు.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: Cyclic Reference (సైక్లిక్ రిఫరెన్స్) అంటే ఏంటి?</h4>
          <p>మీ దగ్గర A మరియు B అనే రెండు క్లాసెస్ ఉన్నాయి. A లోపల B కి సంబంధించిన <code>shared_ptr</code>, B లోపల A కి సంబంధించిన <code>shared_ptr</code> ఉంటే... రెండిటి కౌంటర్ ఎప్పటికీ 0 అవ్వదు. ఎందుకంటే అవి ఒకదాన్ని ఒకటి పట్టుకుని వేలాడుతుంటాయి. దీనివల్లే భయంకరమైన మెమరీ లీక్స్ వస్తాయి. దీన్ని ఆపడానికి ఆ రెంటిలో ఏదోక దాన్ని <code>std::weak_ptr</code> కింద మార్చాలి (weak_ptr కౌంటర్ ని పెంచదు).</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 17, "Phase 17", "Smart Pointers & Memory", subtopics, contentBody, '16-cpp-lambda-expressions-captures-std-function-and-closures.html', '16. Lambda Expressions', '18-cpp-exception-handling-try-catch-throw-and-custom-exceptions.html', '18. Exception Handling');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 18. try, catch, throw, Custom Exceptions & Safety
function buildLesson18() {
  const title = "Exception Handling: try, catch, throw (తెలుగులో)";
  const desc = "C++ లో ప్రోగ్రామ్ క్రాష్ అవ్వకుండా ఆపడానికి Exception Handling ఎలా పనిచేస్తుంది? try, catch, throw మరియు noexcept అంటే ఏంటో డీప్ గా తెలుసుకుందాం.";
  const filename = "18-cpp-exception-handling-try-catch-throw-and-custom-exceptions.html";
  const subtopics = "try / catch Blocks · throw keyword · Custom Exceptions · std::exception · noexcept guarantee";

  const contentBody = `
    <div class="intro-box">
      <p>కంప్యూటర్ ప్రోగ్రామ్స్ లో ఎర్రర్స్ రావడం చాలా కామన్. ఉదాహరణకు, మీరు ఒక ఫైల్ ని చదవాలని కోడ్ రాశారు, కానీ కంప్యూటర్ లో ఆ ఫైల్ డిలీట్ అయిపోయింది. అప్పుడు మీ యాప్ ఏమవుతుంది? డైరెక్ట్ గా క్రాష్ అయిపోయి ఆగిపోతుంది. ఒకవేళ అది బ్యాంక్ సర్వర్ అయితే? అలా క్రాష్ అయితే లక్షల రూపాయలు నష్టం వస్తుంది! ఈ ప్రాబ్లెమ్స్ ని ముందే పసిగట్టి, "ఒకవేళ ఫెయిల్ అయితే ఏం చేయాలి?" అని కంప్యూటర్ కి నేర్పించడాన్నే <strong>Exception Handling (ఎక్సెప్షన్ హ్యాండ్లింగ్)</strong> అంటారు. C++ లో దీన్ని <code>try</code>, <code>catch</code>, <code>throw</code> అనే మూడు బ్రహ్మాస్త్రాలతో ఎలా హ్యాండిల్ చేయాలో ఈ పాఠంలో చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Try, Catch మరియు Throw అంటే ఏంటి?</div>
    <div class="section-body">
      <p class="text-prose">
        <strong><code>try { ... }</code></strong> : రిస్క్ ఉన్న కోడ్ ని (ఉదాహరణకు డివైడ్ బై జీరో, ఫైల్ ఓపెన్ చేయడం) ఈ బ్రాకెట్స్ లో పెడతారు. అంటే "ఒకసారి ట్రై చెయ్" అని అర్థం.
      </p>
      <p class="text-prose">
        <strong><code>throw</code></strong> : ట్రై చేస్తున్నప్పుడు ఏదైనా కండిషన్ ఫెయిల్ అయితే, ప్రోగ్రామ్ క్రాష్ అవ్వకుండా ఒక సిగ్నల్ (బాల్ లాగా) బయటకి విసిరేయడాన్ని (Throw) త్రో అంటారు.
      </p>
      <p class="text-prose">
        <strong><code>catch (error) { ... }</code></strong> : లోపల నుండి త్రో చేయబడిన బాల్ ని (ఎర్రర్ ని) ఇక్కడ పట్టుకుని (Catch), యూజర్ కి సింపుల్ గా "Please check your inputs" అని ఫెయిల్-సేఫ్ మెసేజ్ ఇస్తారు. అప్పుడు యాప్ ఆగిపోకుండా కంటిన్యూ అవుతుంది.
      </p>

      <div class="deep-dive-card">
        <h3>🔥 రియల్ లైఫ్ స్టోరీ: సర్కస్ లో ట్రెపీజ్ (Trapeze) జంప్</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          సర్కస్ లో గాలిలో ఒక ఊయల నుండి ఇంకో ఊయల మీదకి దూకుతారు చూసారా? (ఇదే <code>try</code> బ్లాక్).<br><br>
          ఒకవేళ ఆ వ్యక్తి చేతికి ఊయల అందకపోతే, కింద పడిపోతాడు (ఇదే <code>throw</code>).<br>
          అలా పడిపోయినప్పుడు ప్రాణాలు పోకుండా కింద ఒక పెద్ద వల (Net) కట్టి ఉంచుతారు. ఆ వల అతన్ని సేఫ్ గా పట్టుకుంటుంది (ఇదే <code>catch</code>). వల ఉంటే ఆట మళ్ళీ కంటిన్యూ అవుతుంది. ప్రోగ్రామింగ్ లో ఈ వల లేకపోతే... మీ యాప్ డైరెక్ట్ గా డెస్క్ టాప్ కి క్రాష్ అయిపోతుంది (Crash to Desktop).
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Custom Exceptions (సొంత ఎర్రర్స్ రాయడం)</div>
    <div class="section-body">
      <p class="text-prose">
        C++ లో <code>std::exception</code> అనే ఒక బేస్ క్లాస్ ఉంది (ఇది <code>&lt;stdexcept&gt;</code> లో ఉంటుంది). దాన్ని వాడుకుని మనం మన సొంత ఎర్రర్స్ రాసుకోవచ్చు. ఉదాహరణకు బ్యాంక్ యాప్ లో "InsufficientFundsException" అనే క్లాస్ రాసి, బ్యాలెన్స్ తక్కువ ఉంటే త్రో చేయొచ్చు.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Try Catch Demo)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో డివైడ్ బై జీరో (0 తో భాగించడం) వస్తే యాప్ క్రాష్ అవ్వకుండా, <code>try-catch</code> తో ఆపరేషన్ ని సేఫ్ గా ఎలా ఆపామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++ — Exception Handling</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;stdexcept&gt; // runtime_error కోసం

// ఈ ఫంక్షన్ ఎర్రర్ వస్తే త్రో (throw) చేస్తుంది
double divideNumbers(double a, double b) {
    if (b == 0) {
        // ఇక్కడ మనం ఎర్రర్ ని విసిరేస్తున్నాం!
        throw std::runtime_error("Math Error: Division by Zero!");
    }
    return a / b;
}

int main() {
    std::cout << "Program Started..." << std::endl;
    
    // రిస్క్ ఉన్న పనిని try లో పెడతాం
    try {
        double result = divideNumbers(10, 0); // 0 పంపుతున్నాం కాబట్టి ఫెయిల్ అవుతుంది
        std::cout << "Result: " << result << std::endl;
        std::cout << "This line will NOT print!" << std::endl; // ఇది స్కిప్ అవుతుంది
    } 
    // విసిరేసిన ఎర్రర్ ని ఇక్కడ క్యాచ్ చేస్తాం
    catch (const std::exception& e) {
        std::cout << "[X] Exception Caught: " << e.what() << std::endl;
    }
    
    // ప్రోగ్రామ్ సేఫ్ గా కంటిన్యూ అవుతుంది!
    std::cout << "Program Finished Safely." << std::endl;
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>throw std::runtime_error(...)</code>: 0 తో డివైడ్ చేస్తే CPU క్రాష్ అవుతుంది. అందుకే మనం ముందుగానే చెక్ చేసి, ఒక ఆబ్జెక్ట్ ని త్రో చేశాం. త్రో చేసిన క్షణంలోనే ఫంక్షన్ ఆగిపోయి వెనక్కి వచ్చేస్తుంది.</li>
        <li><code>catch (const std::exception&amp; e)</code>: కింద వల (Net) లాగా ఇది పట్టుకుంది. అందులో ఉన్న మెసేజ్ ని ప్రింట్ చేయడానికి <code>e.what()</code> అని కాల్ చేశాం. (Reference తో పట్టుకోవడం వల్ల కాపీ మెమరీ వేస్ట్ అవ్వదు).</li>
        <li>అదంతా అయ్యాక, "Program Finished Safely" ప్రింట్ అయ్యింది. అదే మీరు try-catch వాడకపోతే ఆ లాస్ట్ లైన్ దాకా రాకుండానే యాప్ ఆగిపోయేది!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: C++ లో ఏదైనా త్రో చేయొచ్చా? (ఉదా: <code>throw 404;</code>)</h4>
          <p>అవును! జావా లో లాగా కేవలం ఎక్సెప్షన్ ఆబ్జెక్ట్స్ నే త్రో చేయాలని రూల్ లేదు. C++ లో మీరు ఒక ఇంటిజర్ <code>throw 404;</code> లేదా ఒక స్ట్రింగ్ <code>throw "Error";</code> ని కూడా త్రో చేయొచ్చు. వాటిని పట్టుకోవడానికి <code>catch(int code)</code> అని రాసుకుంటారు. కానీ బెస్ట్ ప్రాక్టీస్ ఏంటంటే ఎప్పుడూ <code>std::exception</code> చైల్డ్ క్లాసెస్ నే వాడాలి.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Catch-All బ్లాక్ (<code>catch(...)</code>) అంటే ఏంటి?</h4>
          <p>కొన్నిసార్లు లోపల నుండి ఏ ఎర్రర్ వస్తుందో మనకు తెలీదు (ఇంటిజర్ ఆ, స్ట్రింగ్ ఆ, ఆబ్జెక్ట్ ఆ). అలాంటప్పుడు అన్ని రకాల ఎర్రర్స్ ని పట్టుకోవడానికి <code>catch(...)</code> అని మూడు చుక్కలు పెడతారు. ఇది డిఫాల్ట్ క్యాచ్ లాగా పనిచేస్తుంది. కానీ లోపల మెసేజ్ ఏంటో మనకు తెలీదు.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: <code>noexcept</code> కీవర్డ్ ఎందుకు వాడుతారు?</h4>
          <p>మీకు 100% నమ్మకం ఉంటే "నా ఫంక్షన్ లో ఎట్టి పరిస్థితుల్లో ఎర్రర్ రాదు" అని, అప్పుడు ఫంక్షన్ పక్కన <code>noexcept</code> అని రాస్తారు. ఇది చూసి కంపైలర్ చాలా ఫాస్ట్ గా ఆప్టిమైజ్ చేస్తుంది. ఒకవేళ మీరు <code>noexcept</code> అని రాసి లోపల త్రో చేస్తే, యాప్ వెంటనే <code>std::terminate()</code> అయ్యి డైరెక్ట్ గా క్రాష్ అయిపోతుంది (క్యాచ్ కూడా పనిచేయదు).</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 18, "Phase 18", "Exception Handling", subtopics, contentBody, '17-cpp-smart-pointers-unique-ptr-shared-ptr-weak-ptr-and-raii.html', '17. Smart Pointers & Memory', '19-cpp-file-handling-fstream-filesystem-and-serialization.html', '19. File Handling & Filesystem');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 19. fstream, std::filesystem, Paths & Serialization
function buildLesson19() {
  const title = "File Handling & std::filesystem (తెలుగులో)";
  const desc = "C++ లో ఫైల్స్ ని (Files) ఎలా క్రియేట్ చేయాలి? రీడ్/రైట్ ఆపరేషన్స్ fstream తో ఎలా జరుగుతాయి? C++17 లో వచ్చిన విప్లవాత్మకమైన std::filesystem తో ఫోల్డర్స్ తో ఎలా ఆడుకోవాలో నేర్చుకుందాం.";
  const filename = "19-cpp-file-handling-fstream-filesystem-and-serialization.html";
  const subtopics = "fstream (Read/Write) · Binary files · std::filesystem (C++17) · Path manipulation · Directories";

  const contentBody = `
    <div class="intro-box">
      <p>మనం ప్రోగ్రామ్ లో క్రియేట్ చేసే వేరియబుల్స్ అన్నీ RAM లో ఉంటాయి. అంటే పవర్ ఆఫ్ చేయగానే ఆ డేటా అంతా ఎగిరిపోతుంది (Volatile Memory). కానీ డేటాని పర్మనెంట్ గా ఒక టెక్స్ట్ ఫైల్ లో గాని, ఇమేజ్ లాగా గాని హార్డ్ డిస్క్ (SSD) లో సేవ్ చేయాలంటే <strong>File Handling (ఫైల్ హ్యాండ్లింగ్)</strong> కావాలి. C++ లో దీనికోసం <code>&lt;fstream&gt;</code> అనే లైబ్రరీ ఉంటుంది. అదేవిధంగా, ఫోల్డర్స్ ని క్రియేట్ చేయడం, ఫైల్ సైజు తెలుసుకోవడం లాంటి విండోస్/లైనక్స్ పనుల కోసం C++17 లో <strong><code>std::filesystem</code></strong> అనే అద్భుతమైన ఫీచర్ తెచ్చారు. ఈ పాఠంలో ఆ రెండిటి పవర్ ఏంటో డీప్ గా తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> fstream తో ఫైల్స్ లో రాయడం (Writing) మరియు చదవడం (Reading)</div>
    <div class="section-body">
      <p class="text-prose">
        C లాంగ్వేజ్ లో ఫైల్స్ హ్యాండిల్ చేయడానికి <code>fopen</code>, <code>fprintf</code> లాంటి కష్టమైన ఫంక్షన్స్ ఉంటాయి. కానీ C++ లో మనం <code>cout</code> ని ఎలా వాడతామో, <strong>ఫైల్స్ ని కూడా అంతే ఈజీగా వాడుకోవచ్చు!</strong>
      </p>
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><strong><code>ofstream</code> (Output File Stream):</strong> ఇది ఫైల్స్ ని కొత్తగా క్రియేట్ చేయడానికి లేదా డేటాని ఫైల్ లోపలికి రైట్ చేయడానికి వాడుతారు (<code>cout</code> లాగా).</li>
        <li><strong><code>ifstream</code> (Input File Stream):</strong> ఇది హార్డ్ డిస్క్ లో ముందే ఉన్న ఫైల్ ని ఓపెన్ చేసి చదవడానికి వాడుతారు (<code>cin</code> లాగా).</li>
        <li><strong><code>fstream</code>:</strong> ఇది రైట్ మరియు రీడ్ రెండూ చేయగలదు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span> C++17 లో వచ్చిన std::filesystem మ్యాజిక్</div>
    <div class="section-body">
      <p class="text-prose">
        పాత కాలంలో ఒక ఫోల్డర్ ఉందో లేదో తెలుసుకోవాలన్నా, లేదా ఆ ఫోల్డర్ లోపల ఎన్ని ఫైల్స్ ఉన్నాయో కౌంట్ చేయాలన్నా... విండోస్ లో ఒకలా, లైనక్స్ లో ఒకలా (OS-specific OS APIs) కోడ్ రాయాల్సి వచ్చేది. ఇది చాలా పెద్ద తలనొప్పి. దాన్ని క్యూర్ చేయడానికి C++17 లో <strong><code>std::filesystem</code></strong> వచ్చింది. ఇది వాడితే విండోస్, మ్యాక్, లైనక్స్ ఎక్కడైనా ఒకటే కోడ్ పనిచేస్తుంది. (దీని కోసం <code>#include &lt;filesystem&gt;</code> వాడాలి).
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Filesystem & fstream)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో ముందుగా ఒక కొత్త ఫోల్డర్ ని ఎలా క్రియేట్ చేసామో (C++17 వాడి), ఆ తర్వాత అందులో ఒక ఫైల్ క్రియేట్ చేసి డేటా ఎలా సేవ్ చేసామో, మళ్ళీ ఆ డేటాని ఎలా చదివామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++17 — Filesystem & fstream</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;fstream&gt;
#include &lt;string&gt;
#include &lt;filesystem&gt; // C++17 Filesystem

namespace fs = std::filesystem; // పేరు చిన్నగా ఉండటానికి షార్ట్ కట్

int main() {
    std::string folderName = "MyGameData";
    std::string fileName = folderName + "/save_state.txt";
    
    // 1. ఫోల్డర్ క్రియేషన్ (C++17 Filesystem)
    if (!fs::exists(folderName)) {
        fs::create_directory(folderName);
        std::cout << "[+] Created Folder: " << folderName << std::endl;
    }
    
    // 2. ఫైల్ లోపలికి రైట్ చేయడం (ofstream)
    std::ofstream outFile(fileName);
    if (outFile.is_open()) {
        outFile << "PlayerLevel: 50\\n";
        outFile << "Score: 9999\\n";
        outFile.close(); // ఫైల్ ని సేఫ్ గా లాక్ చేస్తున్నాం 
        std::cout << "[+] Game Saved Successfully!" << std::endl;
    }
    
    // 3. ఫైల్ ని చదవడం (ifstream)
    std::ifstream inFile(fileName);
    std::string line;
    
    std::cout << "\\n--- Loading Game ---" << std::endl;
    if (inFile.is_open()) {
        // ఫైల్ ఎండ్ అయ్యేదాకా లైన్ బై లైన్ చదువుతుంది
        while (std::getline(inFile, line)) {
            std::cout << "Read: " << line << std::endl;
        }
        inFile.close();
    }
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>fs::create_directory()</code>: ఇది C++17 ఫీచర్. మనం ఇచ్చిన పేరుతో ఒక కొత్త డైరెక్టరీ (Folder) ని ఆపరేటింగ్ సిస్టమ్ లో క్రియేట్ చేస్తుంది.</li>
        <li><code>std::ofstream outFile(...)</code>: ఇది ఫైల్ ని క్రియేట్ చేసి, రైట్ చేయడానికి కనెక్షన్ ఓపెన్ చేస్తుంది. దాన్ని మనం <code>cout</code> వాడినట్లే <code>outFile &lt;&lt; "Text"</code> అని వాడుకోవచ్చు.</li>
        <li><code>std::getline(inFile, line)</code>: ఫైల్ ని స్పేస్ లతో కాకుండా, ఒక లైన్ (Enter కొట్టేదాకా) మొత్తాన్ని చదివి స్ట్రింగ్ లోకి వేస్తుంది. ఆ తర్వాత నెక్స్ట్ లైన్ కి వెళ్తుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: ఫైల్ ని ఓపెన్ చేసాక కచ్చితంగా <code>.close()</code> చేయాలా? చేయకపోతే ఏమవుతుంది?</h4>
          <p>సింపుల్ స్కోప్ లో <code>.close()</code> మర్చిపోయినా పర్లేదు, ఎందుకంటే <code>fstream</code> క్లాస్ లోపల రాసిన డిస్ట్రక్టర్ (RAII కాన్సెప్ట్) దానంతట అదే ఫైల్ ని క్లోజ్ చేస్తుంది. కానీ మీరు ఒకే ఫంక్షన్ లో పెద్ద ప్రోగ్రామ్ రాస్తుంటే, వాడుకున్న వెంటనే మీరే క్లోజ్ చేయడం బెస్ట్, లేకపోతే మెమరీ లీక్ అవ్వకపోయినా ఆ ఫైల్ అప్పటిదాకా లాక్ అయి ఉంటుంది, వేరే వాళ్ళు దాన్ని ఓపెన్ చేయలేరు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: టెక్స్ట్ ఫైల్స్ కి, బైనరీ (Binary) ఫైల్స్ కి తేడా ఏంటి?</h4>
          <p>టెక్స్ట్ ఫైల్స్ అంటే మనం నోట్ పాడ్ (Notepad) లో చదవగలిగే ఇంగ్లీష్ అక్షరాలు ఉంటాయి (పై కోడ్ లో రాసినట్లు). కానీ ఆబ్జెక్ట్స్ ని, ఇమేజెస్ ని, లేదా వీడియో ఫైల్స్ ని సేవ్ చేయాలంటే <code>ios::binary</code> అనే మోడ్ వాడాలి. అప్పుడు డేటా డైరెక్ట్ గా 0s & 1s లాగా వెళ్తుంది (మనుషులు చదవలేరు కానీ కంప్యూటర్ కి చాలా ఫాస్ట్).</p>
        </div>
        <div class="faq-item">
          <h4>Q3: C++17 Filesystem లో ఒక ఫోల్డర్ లో ఉన్న అన్ని ఫైల్స్ ని ఎలా చూడాలి?</h4>
          <p>దీనికి <code>fs::directory_iterator</code> అనే అద్భుతమైన ఇటరేటర్ ని వాడతారు. ఒక ఫర్ లూప్ <code>for (const auto& entry : fs::directory_iterator(path))</code> అని రాస్తే, ఆ ఫోల్డర్ లోపల ఉన్న అన్నీ ఫైల్స్ పేర్లు వరుసగా ప్రింట్ అయిపోతాయి (Python os.listdir లాగా). ఇది చాలా మోడరన్ ఫీచర్.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 19, "Phase 19", "File Handling & Filesystem", subtopics, contentBody, '18-cpp-exception-handling-try-catch-throw-and-custom-exceptions.html', '18. Exception Handling', '20-cpp-modern-features-constexpr-structured-bindings-optional-variant-format.html', '20. Modern C++ Features');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 20. constexpr, Structured Bindings, optional, variant & format
function buildLesson20() {
  const title = "Modern C++ (17/20): optional, variant & Bindings (తెలుగులో)";
  const desc = "C++17 మరియు C++20 లో వచ్చిన గేమ్ ఛేంజింగ్ ఫీచర్స్. Structured Bindings తో కోడ్ ఎంత సింపుల్ అవుతుంది? std::optional మరియు std::variant తో సురక్షితమైన కోడ్ ఎలా రాయాలో డీప్ ఎక్స్‌ప్లనేషన్.";
  const filename = "20-cpp-modern-features-constexpr-structured-bindings-optional-variant-format.html";
  const subtopics = "Structured Bindings · std::optional · std::variant · constexpr if · std::format";

  const contentBody = `
    <div class="intro-box">
      <p>C++11 అనేది ఒక పెద్ద విప్లవం ఐతే, C++17 మరియు C++20 ఆ విప్లవాన్ని ఇంకో రేంజ్ కి తీసుకెళ్లాయి. చాలామంది C++ కష్టం అంటారు కానీ, ఈ మోడరన్ ఫీచర్స్ వాడితే పైథాన్ లాంటి లాంగ్వేజెస్ కంటే కూడా చాలా క్లీన్ గా, సింపుల్ గా కోడ్ రాయొచ్చు. మల్టిపుల్ వాల్యూస్ ని ఒకేసారి రిటర్న్ చేయడానికి వచ్చిన <strong>Structured Bindings</strong>, NULL పాయింటర్స్ క్రాష్ ల నుండి కాపాడే <strong><code>std::optional</code></strong>, మరియు ఒకే వేరియబుల్ లో రకరకాల డేటాని దాచుకునే <strong><code>std::variant</code></strong>... ఈ మోడరన్ మ్యాజిక్స్ ఏంటో ఈ రోజు డీప్ గా నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Structured Bindings (స్ట్రక్చర్డ్ బైండింగ్స్) - C++17</div>
    <div class="section-body">
      <p class="text-prose">
        ఒక ఫంక్షన్ సాధారణంగా ఒకే ఒక వాల్యూ రిటర్న్ చేస్తుంది. కానీ మీకు 3 వాల్యూస్ రిటర్న్ కావాలి (ఉదాహరణకు 3D గేమ్ లో X, Y, Z కోఆర్డినేట్స్). పాత కాలంలో పాయింటర్స్ వాడి తెచ్చుకునే వాళ్ళం. కానీ C++17 లో <code>auto [x, y, z] = getCoordinates();</code> అని పైథాన్ లాగా సింపుల్ గా మల్టిపుల్ వాల్యూస్ ని ఒకేసారి తెచ్చుకోవచ్చు. దీనివల్ల వందల లైన్ల కోడ్ పది లైన్లకి తగ్గిపోతుంది.
      </p>
    </div>

    <div class="section-title"><span class="num">2</span> std::optional మరియు std::variant మ్యాజిక్</div>
    <div class="section-body">
      <div class="deep-dive-card">
        <h3>🎁 రియల్ లైఫ్ స్టోరీ: స్విగ్గీ ఆర్డర్ డెలివరీ (Optional & Variant)</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          <strong>std::optional (ఉండొచ్చు లేదా లేకపోవచ్చు):</strong> మీరు ఒక ఆర్డర్ పెట్టారు. డెలివరీ బాయ్ వచ్చాడు. ఆ ప్యాకెట్ లో మీరు అడిగిన బిర్యానీ ఉండొచ్చు, లేదా ఏదైనా క్యాన్సిల్ అయితే ప్యాకెట్ ఖాళీగా కూడా ఉండొచ్చు. పాత C++ లో ఖాళీకి బదులు -1 లేదా 0 ఇచ్చేవాళ్లు (అవి కన్ఫ్యూజింగ్). కానీ <code>optional</code> వాడితే, బాక్స్ లో నిజంగా డేటా ఉందా (has_value) లేదా అది <code>nullopt</code> (ఖాళీ) నా అని సేఫ్ గా చెక్ చేయొచ్చు.<br><br>
          <strong>std::variant (ఇదైనా, అదైనా):</strong> మీ ఆర్డర్ లో కేవలం ఒక్క ఐటమ్ మాత్రమే పంపాలి, కానీ అది పిజ్జా అయినా కావొచ్చు లేదా కోక్ బాటిల్ అయినా కావొచ్చు. రెండు రకాల వస్తువులకి ఒకటే బాక్స్ కావాలి! <code>std::variant&lt;Pizza, Coke&gt;</code> అని రాస్తే, ఆ బాక్స్ లో మీరు ఏదైనా ఒకదాన్ని సేఫ్ గా ప్యాక్ చేయొచ్చు (ఇది C లో ఉండే Union కి ఆధునిక, సురక్షితమైన వెర్షన్).
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Modern C++17/20)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో పైథాన్ లాంటి స్ట్రక్చర్డ్ బైండింగ్స్ ని మరియు సేఫ్ గా ఉండే <code>std::optional</code> ని ఎలా వాడామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++17 — Modern Features</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;tuple&gt;
#include &lt;optional&gt;

// 1. మల్టిపుల్ వాల్యూస్ ని Tuple లో రిటర్న్ చేస్తున్నాం
std::tuple&lt;std::string, int, double&gt; getEmployeeDetails() {
    return {"Rajesh", 101, 75000.50};
}

// 2. రిజల్ట్ ఉంటే నంబర్ ఇస్తుంది, లేదంటే nullopt (ఖాళీ) ఇస్తుంది
std::optional&lt;int&gt; findAge(std::string name) {
    if (name == "Rajesh") return 28;
    return std::nullopt; // డేటా దొరకలేదు
}

int main() {
    // మ్యాజిక్: స్ట్రక్చర్డ్ బైండింగ్స్ (C++17) 
    // రిటర్న్ వచ్చిన 3 వాల్యూస్ ని డైరెక్ట్ గా 3 వేరియబుల్స్ లోకి విడగొట్టాం!
    auto [empName, empId, salary] = getEmployeeDetails();
    
    std::cout << "Employee: " << empName << " (ID: " << empId << ")" << std::endl;
    
    // Optional ని చెక్ చేయడం (Null pointer crashes ఇంక ఉండవు!)
    std::optional&lt;int&gt; ageResult = findAge("Ramesh");
    
    if (ageResult.has_value()) {
        std::cout << "Age found: " << ageResult.value() << std::endl;
    } else {
        std::cout << "Age NOT found! (Safe Null Handling)" << std::endl;
    }
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>std::tuple</code>: ఇది ఒక గ్రూప్. ఒక స్ట్రింగ్, ఇంట్, డబుల్ ని కలిపి ఒకే ప్యాకెట్ లాగా రిటర్న్ చేస్తుంది.</li>
        <li><code>auto [empName, empId, salary]</code>: C++17 లో ఈ స్క్వేర్ బ్రాకెట్స్ వాడితే, ఆ ట్యూపుల్ (Tuple) లో ఉన్న 3 వాల్యూస్ డైరెక్ట్ గా విడిపోయి మనం ఇచ్చిన ఈ కొత్త పేర్లలోకి సేవ్ అయిపోతాయి (Unpacking). ఇది పైథాన్ లో చాలా పాపులర్ ఫీచర్, ఇప్పుడు C++ లో కూడా ఉంది!</li>
        <li><code>std::optional&lt;int&gt;</code>: మామూలు ఫంక్షన్స్ డేటా దొరకకపోతే -1 ఇస్తాయి. కానీ ఎవరైనా ఏజ్ -1 ఇస్తే కన్ఫ్యూజింగ్ కదా! అందుకే ఆప్షనల్ వాడితే, డేటా లేనప్పుడు అది <code>nullopt</code> (ఖాళీ) పంపుతుంది, మనం <code>.has_value()</code> తో సేఫ్ గా చెక్ చేసుకోవచ్చు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: <code>std::variant</code> కి, C లో ఉండే <code>union</code> కి తేడా ఏంటి?</h4>
          <p>C లోని <code>union</code> చాలా అన్-సేఫ్ (Unsafe). అందులో ఇంటీజర్ పెట్టి, మీరు పొరపాటున స్ట్రింగ్ లాగా చదివితే భయంకరమైన గార్బేజ్ వాల్యూ లేదా క్రాష్ వస్తుంది. కానీ C++17 లోని <code>std::variant</code> అనేది "Type-Safe Union". అంటే అందులో ప్రస్తుతం ఏ డేటా టైప్ (int ఆ లేక string ఆ) ఉందో అది గుర్తుపెట్టుకుంటుంది. తప్పు టైప్ ని చదవాలని చూస్తే ప్రోగ్రామ్ బగ్ వస్తుందని ఎర్రర్ ఇస్తుంది (std::bad_variant_access). ఫుల్ సేఫ్టీ అన్నమాట!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: <code>constexpr if</code> అంటే ఏంటి? మామూలు <code>if</code> కి తేడా ఏంటి?</h4>
          <p>మామూలు <code>if-else</code> అనేది ప్రోగ్రామ్ రన్ అవుతున్నప్పుడు (Runtime) కంప్యూటర్ డెసిషన్ తీసుకుంటుంది. కానీ <code>constexpr if</code> (C++17) వాడితే, కోడ్ కంపైల్ అవుతున్నప్పుడే ఏ లాజిక్ రన్ అవ్వాలో డిసైడ్ చేసి, మిగతా డెడ్ కోడ్ (Dead Code) ని ఫైనల్ .exe లో లేకుండా కట్ చేసేస్తుంది! దీనివల్ల టెంప్లేట్స్ రాసేటప్పుడు యాప్ సైజు చాలా తగ్గుతుంది మరియు పర్ఫార్మెన్స్ పెరుగుతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: C++20 లో వచ్చిన <code>std::format</code> స్పెషాలిటీ ఏంటి?</h4>
          <p>చాలా ఏళ్ల నుండి C++ డెవలపర్స్ కి <code>std::cout &lt;&lt; "Age: " &lt;&lt; a &lt;&lt; " name: " &lt;&lt; n;</code> అని విడగొట్టి రాయడం విసుగ్గా ఉండేది. పైథాన్ లో లాగా సింపుల్ ఫార్మాటింగ్ లేదు. ఆ వెలితి తీర్చడానికే <code>std::format("Age: {}, name: {}", a, n)</code> ని తెచ్చారు. ఇది <code>printf</code> లాగా ఫాస్ట్ గా ఉంటుంది, మరియు వంద శాతం టైప్-సేఫ్ (Type-safe).</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 20, "Phase 20", "Modern C++ Features", subtopics, contentBody, '19-cpp-file-handling-fstream-filesystem-and-serialization.html', '19. File Handling & Filesystem', '21-cpp-ranges-views-filter-transform-pipelines-and-lazy-evaluation.html', '21. Ranges & Views (C++20)');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 21. Ranges, Views, Pipelines & Lazy Evaluation (C++20)
function buildLesson21() {
  const title = "Ranges & Views (C++20) Masterclass (తెలుగులో)";
  const desc = "C++20 లో వచ్చిన అతిపెద్ద రివల్యూషన్ Ranges (రేంజెస్) మరియు Views (వ్యూస్). కోడ్ ని పైప్‌లైన్స్ (|) వాడి ఎంత సింపుల్ గా ఫిల్టర్, ట్రాన్స్‌ఫామ్ చేయాలో, Lazy Evaluation అంటే ఏంటో డీప్ గా చూద్దాం.";
  const filename = "21-cpp-ranges-views-filter-transform-pipelines-and-lazy-evaluation.html";
  const subtopics = "Ranges TS · std::views · Pipeline syntax (|) · Lazy Evaluation · Functional Programming";

  const contentBody = `
    <div class="intro-box">
      <p>C++ హిస్టరీలో C++20 అనేది ఇంకొక పెద్ద మైలురాయి. పాత C++ లో ఒక వెక్టార్ ని సార్ట్ చేయాలంటే <code>std::sort(v.begin(), v.end());</code> అని రాసేవాళ్లం. ఆ <code>begin()</code>, <code>end()</code> రాయడం చాలా మందికి విసుగు తెప్పించేది. వాటన్నిటిని సింపుల్ చేస్తూ, ఫంక్షనల్ ప్రోగ్రామింగ్ (Functional Programming) ని C++ లోకి తీసుకురావడానికి తయారు చేసిందే <strong>Ranges (రేంజెస్) లైబ్రరీ</strong>. పైప్‌లైన్ సింబల్ (<code>|</code>) వాడి డేటాని ఫిల్టర్ చేయడం, మార్చడం లాంటి పనులు గాలిలో తేలుతున్నట్లు ఎంతో స్మూత్ గా ఎలా రాయొచ్చో ఈ మాస్టర్ క్లాస్ లో నేర్చుకుందాం. ఇది C++ భవిష్యత్తు!</p>
    </div>

    <div class="section-title"><span class="num">1</span> Ranges అంటే ఏమిటి? begin/end ఎందుకు రాయక్కర్లేదు?</div>
    <div class="section-body">
      <p class="text-prose">
        <strong>రేంజ్ (Range)</strong> అంటే సింపుల్ గా చెప్పాలంటే దేనికైతే begin మరియు end ఉంటాయో అదొక రేంజ్ (ఉదాహరణకు ఒక వెక్టార్, ఒక అర్రే). C++20 నుండి మీరు ప్రతి ఫంక్షన్ కి <code>begin()</code>, <code>end()</code> పాస్ చేయాల్సిన పనిలేదు, డైరెక్ట్ గా ఆ వెక్టార్ నే పాస్ చేస్తే కంపైలర్ దానంతట అదే అర్థం చేసుకుంటుంది (ఉదాహరణకు <code>std::ranges::sort(v);</code>). ఇదొక పెద్ద రిలీఫ్!
      </p>

      <div class="deep-dive-card">
        <h3>🚿 రియల్ లైఫ్ స్టోరీ: వాటర్ పైప్‌లైన్ మరియు ఫిల్టర్స్ (Pipelines & Views)</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          ఒక మురుగు నీటి కాలువ (Vector of junk numbers) ఉంది. అందులో నుండి మీకు కావాల్సిన స్వచ్ఛమైన నీటిని (Even numbers) మీరు ఎలా తీస్తారు?<br><br>
          మామూలుగా అయితే ఒక పెద్ద బకెట్ తీసుకుని, అందులో నీళ్ళు వడగట్టి ఇంకో బకెట్ లో పోయాలి (అంటే మెమరీ వేస్ట్). కానీ <strong>Views (వ్యూస్)</strong> వాడితే మీరు అక్కడ ఒక పైపు (Pipeline <code>|</code>) మరియు ఒక ఫిల్టర్ (Filter) ఫిక్స్ చేస్తారు. ఆ నీరు ఫిల్టర్ గుండా ప్రయాణిస్తున్నప్పుడు మాత్రమే క్లీన్ అవుతుంది, అనవసరమైన ఎక్స్ట్రా బకెట్ అవసరం లేదు!<br>
          దీన్నే C++ లో <strong>Lazy Evaluation (లేజీ ఎవాల్యుయేషన్)</strong> అంటారు. అంటే మీరు ఫిల్టర్ పెట్టినప్పుడు అది డేటాని కాపీ చేయదు. మీరు ఆ డేటాని ఎప్పుడైతే అడుగుతారో (చదువుతారో) అప్పుడు ఆన్ ది స్పాట్ లో లాజిక్ రన్ అవుతుంది. ఇది అల్టిమేట్ పర్ఫార్మెన్స్ హ్యాక్!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> పైప్‌లైన్ సింటాక్స్ (<code>|</code>) యొక్క అద్భుతం</div>
    <div class="section-body">
      <p class="text-prose">
        లైనక్స్ (Linux) లో కమాండ్స్ ని ఒకదానితో ఒకటి కలపడానికి పైప్ (<code>|</code>) వాడుతారు. దాన్ని సేమ్ టు సేమ్ C++20 లో ప్రవేశపెట్టారు. 
      </p>
      <p class="text-prose">
        <strong>లాజిక్:</strong> <code>డేటా | ముందు ఫిల్టర్ చెయ్ | తర్వాత మార్చు | తర్వాత ప్రింట్ చెయ్</code>. ఇలా గొలుసుకట్టు లాగా (Chaining) ఎంత పెద్ద కాంప్లెక్స్ లాజిక్ నైనా సరే ఒకే లైన్ లో రాసుకుంటూ వెళ్లిపోవచ్చు.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Ranges & Views)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో 1 నుండి 6 వరకు ఉన్న నంబర్స్ లో... కేవలం సరి సంఖ్యలను (Even) మాత్రమే తీసుకుని, వాటిని డబుల్ (x2) చేసి ఎలా ప్రింట్ చేస్తున్నామో (అదీ వితౌట్ ఎక్స్ట్రా మెమరీ) చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++20 — Ranges & Views Pipeline</span>
          <a class="try-btn" href="/?lang=cpp20">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;ranges&gt; // C++20 మ్యాజిక్ ఇక్కడే ఉంది

int main() {
    std::vector&lt;int&gt; numbers = {1, 2, 3, 4, 5, 6};
    
    // ఒకే ఒక లైన్ లో పైప్‌లైన్ తో లాజిక్ (Lazy Evaluation)
    auto result = numbers 
                | std::views::filter([](int n) { return n % 2 == 0; })  // సరి సంఖ్యలు (2, 4, 6) ఫిల్టర్ 
                | std::views::transform([](int n) { return n * 2; });   // వాటిని డబుల్ చేయడం (4, 8, 12)
                
    std::cout << "Processed Even Numbers:" << std::endl;
    
    // ఆ పైప్‌లైన్ రిజల్ట్ ని రేంజ్ లూప్ వాడి ప్రింట్ చేస్తున్నాం
    for (int n : result) {
        std::cout << "- " << n << std::endl;
    }
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>#include &lt;ranges&gt;</code>: C++20 కంపైలర్ లో ఈ హెడర్ ద్వారా పైప్‌లైన్ సింటాక్స్ వస్తుంది.</li>
        <li><code>std::views::filter(...)</code>: ఇది ఒక అద్దం (View) లాంటిది. ఒరిజినల్ వెక్టార్ ని ఏమీ మార్చదు, కొత్త వెక్టార్ ని క్రియేట్ చేయదు. కేవలం ఒరిజినల్ వెక్టార్ లో ఉన్న ఈవెన్ నంబర్స్ ని మాత్రమే మనకు చూపిస్తుంది. (Memory = 0 bytes).</li>
        <li><code>std::views::transform(...)</code>: ఫిల్టర్ అయిన వాటిని తీసుకుని దానికి ఇంటూ 2 చేస్తుంది. ఇదంతా ఎప్పుడు జరుగుతుంది? <code>auto result</code> అని రాసినప్పుడు జరగదు (లేజీ). కింద ఫర్ లూప్ లో మీరు <code>n</code> కోసం అడిగినప్పుడే పైకెళ్ళి క్యాలిక్యులేట్ చేసి ఇస్తుంది. ఇదే Lazy Evaluation పవర్.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: C++20 Ranges కి, పాత <code>&lt;algorithm&gt;</code> లో ఉన్న ఫంక్షన్స్ కి మెయిన్ డిఫరెన్స్ ఏంటి?</h4>
          <p>పాత అల్గారిథమ్స్ లో (ఉదా: <code>std::transform</code>) వాడుతున్నప్పుడు, రిజల్ట్ ని స్టోర్ చేసుకోవడానికి మీరు ముందే ఒక ఖాళీ వెక్టార్ ని క్రియేట్ చేసి పెట్టుకోవాలి (దీనివల్ల చాలా మెమరీ అండ్ టైమ్ కాపీ చేయడానికి వేస్ట్ అవుతుంది). కానీ C++20 వ్యూస్ (Views) లో అసలు డేటా కాపీ అనేది జరగదు. కేవలం ఒరిజినల్ డేటా పైన ఒక లాజికల్ లేయర్ యాడ్ అవుతుంది అంతే. ఇది మిలియన్ల కొద్దీ డేటా ఉన్నప్పుడు సూపర్ ఫాస్ట్.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: "Lazy Evaluation" వల్ల లాభం ఏంటి?</h4>
          <p>దీన్ని డిమాండ్-బేస్డ్ ప్రోగ్రామింగ్ అంటారు. మీ దగ్గర ఒక కోటి నంబర్లు ఉన్నాయి. అందులో మీరు మొదటి 10 ఈవెన్ నంబర్లు తీసుకుని ప్రింట్ చేయాలి. పాత లాజిక్ వాడితే, కోటి నంబర్లను ఫిల్టర్ చేసి కొత్త అర్రే లో పెట్టి, అప్పుడు 10 ప్రింట్ చేసేది. కానీ లేజీ ఎవాల్యుయేషన్ వల్ల, ఇది 10 ఈవెన్ నంబర్స్ రాగానే ఆటోమేటిక్ గా ఫిల్టరింగ్ ని ఆపేస్తుంది! మిగతా 99 లక్షల నంబర్లకి అసలు లాజిక్ రన్ చేయదు, టైమ్ ఆదా అవుతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: C++20 కోడ్ రాస్తే పాత కంపైలర్స్ లో పనిచేస్తుందా?</h4>
          <p>పనిచేయదు! C++20 ఫీచర్స్ (Ranges, Concepts, Modules, Coroutines) వాడాలంటే మీ దగ్గర లేటెస్ట్ కంపైలర్ (GCC 10+, Clang 11+, MSVC 2019+) ఉండాలి. మరియు కంపైల్ చేసేటప్పుడు ఫ్లాగ్ <code>-std=c++20</code> అని కచ్చితంగా ఇవ్వాలి. ప్రపంచవ్యాప్తంగా ఉన్న పెద్ద కంపెనీలు అన్నీ నెమ్మదిగా పాత C++ నుండి C++20 కి అప్డేట్ అవుతున్నాయి, ఎందుకంటే ఇది కోడ్ ని చాలా ఈజీ చేస్తుంది.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 21, "Phase 21", "Ranges & Views (C++20)", subtopics, contentBody, '20-cpp-modern-features-constexpr-structured-bindings-optional-variant-format.html', '20. Modern C++ Features', null, null);
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function run() {
  buildLesson16();
  buildLesson17();
  buildLesson18();
  buildLesson19();
  buildLesson20();
  buildLesson21();
  console.log("✅ Generated C++ Lessons 16 to 21 with EXTREMELY DETAILED MASSIVE Text, Deep Stories, and ONLY ONE short code!");
}
run();
