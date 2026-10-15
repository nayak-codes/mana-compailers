const fs = require('fs');
const path = require('path');
const { wrapCppPage } = require('./build_cpp_10_phases_master.js');

const cDir = path.join(__dirname, '..', 'public', 'blog-cpp');
if (!fs.existsSync(cDir)) {
  fs.mkdirSync(cDir, { recursive: true });
}

// 6. Functions, Overloading, References & Lambdas
function buildLesson6() {
  const title = "Functions, Overloading & Default Arguments (తెలుగులో)";
  const desc = "C++ లో ఫంక్షన్స్ ఎలా పనిచేస్తాయి? Function Overloading అంటే ఏమిటి? Default Arguments ఎలా వాడాలో డీప్ ఎక్స్‌ప్లనేషన్ తో నేర్చుకుందాం.";
  const filename = "06-cpp-functions-prototypes-overloading-and-lambdas.html";
  const subtopics = "Functions & Return Types · Pass by Value · Function Overloading · Default Arguments · Code Reusability";

  const contentBody = `
    <div class="intro-box">
      <p>ఒక పెద్ద ప్రాజెక్ట్ (ఉదాహరణకు వాట్సాప్ యాప్) రాస్తున్నప్పుడు, మెసేజ్ పంపడానికి, ఫోటో పంపడానికి, స్టేటస్ అప్‌డేట్ చేయడానికి... అన్నిటికీ కోడ్ ని ఒకే చోట (మెయిన్ లోనే) రాస్తే అది లక్షల లైన్లు దాటిపోతుంది. అలా ఒకేచోట రాయడం వల్ల తప్పులు కనిపెట్టడం అసాధ్యం అవుతుంది. ఆ ప్రాబ్లెమ్ ని సాల్వ్ చేయడానికి కోడ్ ని చిన్న చిన్న ముక్కలుగా విడగొడతాం. ఆ ముక్కలనే <strong>Functions (ఫంక్షన్స్)</strong> అంటారు. C++ లో ఫంక్షన్స్ కి మామూలు C కంటే ఎన్నో అడ్వాన్స్డ్ ఫీచర్స్ (Overloading, Default Arguments) ఉన్నాయి. ఈ పాఠంలో అవెలా పనిచేస్తాయో డీప్ గా తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> అసలు ఫంక్షన్ అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="text-prose">
        ఫంక్షన్ అంటే కేవలం ఒక పర్టికులర్ పనిని మాత్రమే చేసే ఒక చిన్న ఫ్యాక్టరీ మెషిన్ లాంటిది. దానికి కొంత ఇన్పుట్ ఇస్తే అది ప్రాసెస్ చేసి మనకు అవుట్‌పుట్ ని ఇస్తుంది.
      </p>

      <div class="deep-dive-card">
        <h3>☕ రియల్ లైఫ్ స్టోరీ: కాఫీ వెండింగ్ మెషిన్</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          ఆఫీస్ లో ఉండే ఒక కాఫీ మెషిన్ ని ఊహించుకోండి. మీరు దానికి 10 రూపాయలు (Input / Argument) ఇస్తారు. ఆ మెషిన్ లోపల నీళ్ళు, పాలు, కాఫీ పౌడర్ అన్నీ మిక్స్ అయ్యి ఒక ప్రాసెస్ (Code execution) జరుగుతుంది. చివరగా మీకు ఒక కప్పు వేడి కాఫీ (Output / Return value) వస్తుంది.<br><br>
          ఫంక్షన్ కూడా అంతే! మీరు ఒక నంబర్ పంపిస్తే, అది లోపల లాజిక్ చేసి మీకు రిజల్ట్ ఇస్తుంది. ఒకసారి ఆ మెషిన్ ని కొనుక్కుంటే (ఫంక్షన్ రాసుకుంటే), మీకు ఎన్నిసార్లు కావాలంటే అన్నిసార్లు వాడుకోవచ్చు (Code Reusability). పదే పదే కాఫీ డికాషన్ మీరే పెట్టుకోవాల్సిన పనిలేదు!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Function Overloading అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="text-prose">
        C లాంగ్వేజ్ లో ఒకే పేరుతో రెండు ఫంక్షన్స్ రాయకూడదు. కానీ C++ లో ఉన్న బెస్ట్ ఫీచర్ ఏంటంటే, ఒకే పేరుతో మీరు ఎన్ని ఫంక్షన్స్ అయినా రాయొచ్చు... కానీ వాటన్నిటికీ మీరు పంపించే ఇన్పుట్స్ (Arguments) వేరేలా ఉండాలి. దీన్నే <strong>Function Overloading (ఫంక్షన్ ఓవర్‌లోడింగ్)</strong> అంటారు.
      </p>
      <p class="text-prose">
        ఉదాహరణకు <code>print(int x)</code> అని ఒకటి, <code>print(double x)</code> అని ఇంకోటి రాయొచ్చు. మీరు ఏ వాల్యూ పంపిస్తే కంపైలర్ ఆటోమేటిక్ గా దానికి తగ్గ ఫంక్షన్ ని కాల్ చేసుకుంటుంది.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Function Overloading)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో <code>calculateArea</code> అనే ఒకే పేరుతో రెండు ఫంక్షన్స్ ఎలా రాశామో చూడండి. ఒకటి స్క్వేర్ (చతురస్రం) కోసం, ఇంకోటి రెక్టాంగిల్ (దీర్ఘచతురస్రం) కోసం.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++ — Function Overloading</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;

// ఫంక్షన్ 1: ఒకటే నంబర్ తీసుకుంటుంది
int calculateArea(int side) {
    return side * side;
}

// ఫంక్షన్ 2: అదే పేరు, కానీ రెండు నంబర్స్ తీసుకుంటుంది
int calculateArea(int length, int breadth) {
    return length * breadth;
}

int main() {
    // కంపైలర్ మీరు పంపిన నంబర్స్ బట్టి ఏ ఫంక్షన్ రన్ చేయాలో డిసైడ్ చేస్తుంది
    int square = calculateArea(5);        // ఫంక్షన్ 1 కి వెళ్తుంది
    int rectangle = calculateArea(5, 10); // ఫంక్షన్ 2 కి వెళ్తుంది
    
    std::cout << "Square Area: " << square << std::endl;
    std::cout << "Rectangle Area: " << rectangle << std::endl;
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li>మనం <code>calculateArea</code> అనే పేరుతో రెండు ఫంక్షన్స్ రాశాం. ఇది C లో అయితే "Redefinition error" అని ఫెయిల్ అవుతుంది. కానీ C++ లో అలో చేస్తుంది.</li>
        <li>మనం మెయిన్ నుండి కేవలం <code>(5)</code> పంపినప్పుడు, కంపైలర్ చూసుకుని "అరె ఇక్కడ ఒకటే ఆర్గ్యుమెంట్ ఉంది, కాబట్టి ఫస్ట్ ఫంక్షన్ రన్ చేద్దాం" అని డిసైడ్ అవుతుంది.</li>
        <li>ఆ తర్వాత <code>(5, 10)</code> అని రెండు పంపినప్పుడు, సెకండ్ ఫంక్షన్ కి వెళ్లిపోతుంది. దీన్నే కంపైల్-టైమ్ పాలిమార్ఫిజం (Compile-time Polymorphism) అని కూడా అంటారు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: కేవలం రిటర్న్ టైప్ (Return Type) మారిస్తే Overloading అవుతుందా?</h4>
          <p>అస్సలు కాదు! ఉదాహరణకు <code>int getAge(int x)</code> మరియు <code>float getAge(int x)</code> రాస్తే కంపైలర్ కి ఎర్రర్ వస్తుంది. ఎందుకంటే కంపైలర్ ఎప్పుడూ మీరు పంపే పరామీటర్స్ (కొన్నిసార్లు బ్రాకెట్స్ లో ఉన్నవి) చూసి మాత్రమే డిసైడ్ చేస్తుంది, రిటర్న్ ఏమొస్తుందో దానికి సంబంధం లేదు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Default Arguments అంటే ఏమిటి?</h4>
          <p>మీరు ఫంక్షన్ డిక్లేర్ చేసేటప్పుడే <code>int calculateArea(int length, int breadth = 10)</code> అని రాయొచ్చు. దీని అర్థం ఏంటంటే, ఒకవేళ యూజర్ కేవలం ఒకటే నంబర్ పంపిస్తే, రెండో నంబర్ ని ఆటోమేటిక్ గా 10 కింద తీసుకో అని అర్థం. ఇది చాలా పాపులర్ ఫీచర్!</p>
        </div>
        <div class="faq-item">
          <h4>Q3: ఫంక్షన్ డిక్లరేషన్ (Prototype) ఎందుకు పైన రాయాలి?</h4>
          <p>C++ లో కంపైలర్ ఎప్పుడూ పై నుండి కిందికి చదువుకుంటూ వస్తుంది. మెయిన్ ఫంక్షన్ లోకి వచ్చేసరికి మీరు ఒక ఫంక్షన్ ని కాల్ చేస్తే, "ఇదెక్కడి నుంచి వచ్చింది?" అని కంపైలర్ కన్ఫ్యూజ్ అవుతుంది. అందుకే కింద రాసిన ఫంక్షన్ల గురించి ముందే పైన ఒక హెడ్డింగ్ (Prototype) లాగా చెప్తాము.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 6, "Phase 06", "Functions & Modular Code", subtopics, contentBody, '05-cpp-loops-for-while-do-while-and-range-based-for.html', '5. Loops & Control Flow', '07-cpp-arrays-std-string-string-view-and-std-vector.html', '7. Arrays, std::string & std::vector');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 7. Arrays, std::string, string_view & std::vector
function buildLesson7() {
  const title = "Arrays, std::string & std::vector (తెలుగులో)";
  const desc = "C++ లో Arrays కంటే std::vector ఎందుకు పవర్ ఫుల్? డైనమిక్ గా సైజు పెరిగే వెక్టార్స్ ఎలా పనిచేస్తాయి? std::string యొక్క అద్భుతమైన ఫీచర్స్ ఏంటో డీప్ గా చూద్దాం.";
  const filename = "07-cpp-arrays-std-string-string-view-and-std-vector.html";
  const subtopics = "Raw Arrays vs Vector · std::vector · Dynamic Size · std::string · Memory Reallocation";

  const contentBody = `
    <div class="intro-box">
      <p>ఒక స్టూడెంట్ మార్కు అయితే ఒక వేరియబుల్ సరిపోతుంది, అదే 100 మంది స్టూడెంట్స్ మార్కులు స్టోర్ చేయాలంటే 100 వేరియబుల్స్ రాయలేము కదా! అందుకే ప్రోగ్రామింగ్ లో <strong>Arrays (అర్రేస్)</strong> వచ్చాయి. కానీ మామూలు అర్రేస్ లో ఉన్న అతి పెద్ద ప్రాబ్లెమ్ ఏంటంటే, ఒకసారి సైజు ఫిక్స్ చేసాక (ఉదాహరణకు 100), రేపు కొత్త స్టూడెంట్ వస్తే (101 వ వాడు) వాడికి అందులో ప్లేస్ ఉండదు. దీనికి C++ ఇచ్చిన అల్టిమేట్ సొల్యూషన్ <strong><code>std::vector</code></strong>. అలాగే అక్షరాలతో ఆడుకోవడానికి పాత C లాంటి క్యారెక్టర్ అర్రేస్ కాకుండా, సూపర్ పవర్ ఫుల్ అయిన <strong><code>std::string</code></strong> ని C++ లో ఎలా వాడాలో ఈ డీప్ గైడ్ లో చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Raw Arrays కి మరియు std::vector కి ఉన్న తేడా?</div>
    <div class="section-body">
      <p class="text-prose">
        పాత కాలం అర్రేస్ (Raw Arrays) లో మనం ముందే కంపైలర్ కి సైజు చెప్పాలి. ఒకవేళ మీరు ఆ సైజు దాటి డేటా పెడితే ప్రోగ్రామ్ క్రాష్ అయిపోయి <strong>Segmentation Fault</strong> వస్తుంది. కానీ <strong>Vector (వెక్టార్)</strong> అనేది చాలా మ్యాజికల్ బాక్స్. మీరు అందులో వస్తువులు వేస్తున్న కొద్దీ దానంతట అదే దాని సైజుని డబుల్ (Double) చేసుకుంటూ పోతుంది.
      </p>

      <div class="deep-dive-card">
        <h3>📦 రియల్ లైఫ్ స్టోరీ: ఐరన్ బాక్స్ vs రబ్బర్ బ్యాగ్</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          ఒక ఇనుప పెట్టె (Raw Array) తీసుకున్నారు అనుకోండి. దాని సైజు ఫిక్స్డ్. అందులో 10 ఆపిల్స్ మాత్రమే పడతాయి. మీరు 11వ ఆపిల్ ని అందులో బలవంతంగా కుక్కితే ఆపిల్ నలిగిపోతుంది లేదా బాక్స్ పగిలిపోతుంది.<br><br>
          కానీ <strong>std::vector</strong> అనేది ఒక స్ట్రెచబుల్ రబ్బర్ బ్యాగ్ (Stretchy Bag) లాంటిది. మీరు అందులో ఆపిల్స్ వేస్తున్న కొద్దీ అది సాగుతూ (Expand) వెళ్తుంది. ఎంత డేటా అయినా పెట్టుకోవచ్చు. ఒకవేళ బ్యాగ్ ఫుల్ అయితే, బ్యాక్ గ్రౌండ్ లో C++ దానంతట అదే ఇంకో పెద్ద బ్యాగ్ కొనుక్కొని అందులోకి షిఫ్ట్ చేస్తుంది. ప్రోగ్రామర్ కి ఎలాంటి టెన్షన్ ఉండదు!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> C++ లో std::string పవర్</div>
    <div class="section-body">
      <p class="text-prose">
        C లాంగ్వేజ్ లో స్ట్రింగ్స్ అంటే కేవలం క్యారెక్టర్స్ పక్క పక్కన ఉండటం మాత్రమే (<code>char name[10];</code>). రెండు పేర్లు కలపాలి అంటే <code>strcat()</code> లాంటివి వాడాలి, అది చాలా కష్టం. కానీ C++ లో <code>std::string</code> వాడితే, రెండు స్ట్రింగ్స్ ని మీరు <code>+</code> సింబల్ తో (ఉదా: "Hello" + "World") డైరెక్ట్ గా కలిపేయొచ్చు. ఇదొక పెద్ద రిలీఫ్!
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Vector & String Demo)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో ఒక <code>std::vector</code> తీసుకుని, దానికి మధ్యలో (Run Time లో) డేటా ఎలా పుష్ (push_back) చేస్తున్నామో గమనించండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++ — std::vector & std::string</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;string&gt;

int main() {
    // ఒక రబ్బర్ బ్యాగ్ (Vector) ని క్రియేట్ చేసాం
    std::vector&lt;std::string&gt; names;
    
    // బ్యాగ్ లోకి వస్తువులు వేస్తున్నాం (push_back)
    names.push_back("Apple");
    names.push_back("Banana");
    names.push_back("Cherry");
    
    // రేంజ్ బేస్డ్ లూప్ తో బయటకి తీస్తున్నాం
    std::cout << "Fruits in Vector:" << std::endl;
    for (std::string fruit : names) {
        std::cout << "- " << fruit << std::endl;
    }
    
    // వెక్టార్ సైజు ఎంత ఉందో డైరెక్ట్ గా అడగొచ్చు!
    std::cout << "Total Fruits: " << names.size() << std::endl;
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>#include &lt;vector&gt;</code>: వెక్టార్ పవర్ వాడాలంటే ఈ ఫైల్ ని పైన ఇన్‌క్లూడ్ చేయాలి.</li>
        <li><code>std::vector&lt;std::string&gt; names;</code>: ఇక్కడ కంపైలర్ కి "నాకు స్ట్రింగ్స్ ని స్టోర్ చేసుకునే ఒక ఎంప్టీ బ్యాగ్ ఇవ్వు" అని చెప్తున్నాం. మొదట్లో దీని సైజు 0 ఉంటుంది.</li>
        <li><code>push_back("Apple")</code>: ఈ ఫంక్షన్ కాల్ చేయగానే బ్యాగ్ సైజు దానంతట అదే పెరిగి, యాపిల్ అందులో కూర్చుంటుంది.</li>
        <li><code>size()</code> వాడి అందులో ఎన్ని ఉన్నాయో ఈజీగా చెక్ చేసాం. (ఇది మామూలు అర్రేస్ లో చేయలేము).</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: వెక్టార్ సైజు ఆటోమేటిక్ గా ఎలా పెరుగుతుంది? (Capacity vs Size)</h4>
          <p>వెక్టార్ ఫుల్ అయిన ప్రతిసారీ దాని కెపాసిటీని డబుల్ (Double) చేసుకుంటుంది. ఉదాహరణకు 4 వస్తువులు పడితే, 5వ వస్తువు వేసినప్పుడు దానంతట అదే 8 సైజు ఉన్న కొత్త మెమరీ తీసుకుని, పాత డేటాని కాపీ చేసి, పాత దాన్ని డిలీట్ చేస్తుంది. అందుకే దీన్ని డైనమిక్ అర్రే (Dynamic Array) అంటారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: ప్రతిసారి డబుల్ అయితే మెమరీ వేస్ట్ అవ్వదా?</h4>
          <p>కాస్త వేస్ట్ అవుతుంది. మీ దగ్గర 10 లక్షల ఐటమ్స్ ఉంటే, దానికి డబుల్ అవుతుంది. దాన్ని ఆపడానికి మీరు ముందే <code>names.reserve(100);</code> అని చెప్తే, మెమరీ ముందే అలోకేట్ అవుతుంది, డబుల్ అయ్యే రీ-లొకేషన్ ప్రాసెస్ తగ్గిపోయి స్పీడ్ పెరుగుతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: C++17 లో వచ్చిన <code>std::string_view</code> అంటే ఏంటి?</h4>
          <p>మనం ఒక ఫంక్షన్ కి <code>std::string</code> పంపిస్తే అది చాలాసార్లు ఆ స్ట్రింగ్ ని జిరాక్స్ (Copy) తీసుకుని పంపుతుంది. దానివల్ల మెమరీ టైమ్ వేస్ట్ అవుతుంది. <code>std::string_view</code> వాడితే, అది కేవలం అసలు స్ట్రింగ్ ని చూస్తుంది (View) మాత్రమే, కాపీ చేయదు. దీనివల్ల రీడ్-ఓన్లీ ఆపరేషన్స్ కి స్పీడ్ సూపర్ ఫాస్ట్ గా ఉంటుంది!</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 7, "Phase 07", "Arrays, Strings & Vectors", subtopics, contentBody, '06-cpp-functions-prototypes-overloading-and-lambdas.html', '6. Functions & Overloading', '08-cpp-pointers-references-nullptr-and-memory-safety.html', '8. Pointers, References & nullptr');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 8. Pointers, References, nullptr & Memory Safety
function buildLesson8() {
  const title = "Pointers, References & nullptr (తెలుగులో)";
  const desc = "C++ లో Pointers అంటే ఏమిటి? References కి పాయింటర్స్ కి తేడా ఏంటి? NULL ప్లేస్ లో C++11 లో వచ్చిన nullptr ఎందుకు వాడాలో కంప్లీట్ గైడ్.";
  const filename = "08-cpp-pointers-references-nullptr-and-memory-safety.html";
  const subtopics = "Memory Addresses · Pointers vs References · nullptr vs NULL · Dereferencing · Pass by Reference";

  const contentBody = `
    <div class="intro-box">
      <p>C++ ప్రపంచాన్ని శాసిస్తోంది అంటే దానికి ఒకేఒక్క కారణం ఉంది, అదే <strong>మెమరీ కంట్రోల్ (Memory Control)</strong>. జావా, పైథాన్ లాంటి లాంగ్వేజెస్ లో మెమరీ అంతా వాటంతట అవే చూసుకుంటాయి, మనం ఏమీ చేయలేం. కానీ C++ లో మీకు RAM మెమరీ మీద పూర్తి అధికారం ఉంటుంది. ప్రతి ఒక్క బైట్ ఎక్కడ ఉందో తెలుసుకుని, దాన్ని మార్చే పవర్ మన చేతుల్లో ఉంటుంది. ఆ పవర్ ఇచ్చే మ్యాజికల్ కాన్సెప్ట్ లే <strong>Pointers (పాయింటర్స్)</strong> మరియు <strong>References (రిఫరెన్సెస్)</strong>. చాలా మంది వీటికి భయపడతారు కానీ, ఈ ఆర్టికల్ చదివాక అది ఎంత సింపులో మీకే అర్థమవుతుంది.</p>
    </div>

    <div class="section-title"><span class="num">1</span> అసలు పాయింటర్స్ మరియు రిఫరెన్సెస్ అంటే ఏంటి?</div>
    <div class="section-body">
      <p class="text-prose">
        ప్రతి వేరియబుల్ (బాక్స్) క్రియేట్ అయినప్పుడు దానికి RAM లో ఒక అడ్రస్ (ఉదాహరణకు <code>0x7ffe1234</code>) దొరుకుతుంది. ఆ అడ్రస్ ని సేవ్ చేసుకునే స్పెషల్ వేరియబుల్ నే <strong>Pointer (పాయింటర్)</strong> అంటారు. పాయింటర్ అనేది దారి చూపే మ్యాప్ లాంటిది.
      </p>

      <div class="deep-dive-card">
        <h3>📍 రియల్ లైఫ్ స్టోరీ: మీ ఇల్లు, అడ్రస్ కార్డు, మరియు నిక్ నేమ్</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          మీకొక ఇల్లు (Variable) ఉంది అనుకుందాం. అందులో మీరు (Data) ఉన్నారు.<br><br>
          <strong>Pointer అంటే:</strong> ఒక విజిటింగ్ కార్డు లాంటిది. ఆ కార్డు మీద మీ ఇంటి అడ్రస్ రాసి ఉంది. నేను ఆ అడ్రస్ పట్టుకుని మీ ఇంటికి వచ్చి మిమ్మల్ని కలవచ్చు. ఆ కార్డు (పాయింటర్) ని నేను నా ఫ్రెండ్ కి ఇస్తే, వాడు కూడా ఆ అడ్రస్ తో మీ ఇంటికి రాగలడు. పాయింటర్ ఎప్పుడైనా మారొచ్చు (మీరు వేరే అడ్రస్ కి మారొచ్చు).<br><br>
          <strong>Reference అంటే:</strong> ఇది మీ ఇంటికి ఉన్న ఇంకొక ముద్దు పేరు (Alias/Nickname) లాంటిది. ఉదాహరణకు "రాము ఇల్లు" అన్నా "సురేష్ ఇల్లు" అన్నా ఒకటే అని ఫిక్స్ అయిపోవడం. ఇది ఒకసారి ఫిక్స్ అయితే మళ్ళీ ఇంకో ఇంటికి మార్చడం కుదరదు! C++ లో పాయింటర్స్ కంటే ఈ References వాడటం చాలా సేఫ్ అండ్ ఈజీ.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> NULL బదులు C++11 లో వచ్చిన "nullptr"</div>
    <div class="section-body">
      <p class="text-prose">
        పాత C లో ఒక పాయింటర్ కి ఏ అడ్రస్ లేకపోతే దానికి <code>NULL</code> (అంటే కేవలం 0) అని ఇచ్చేవాళ్లు. కానీ కొన్ని ఫంక్షన్స్ కి పంపినప్పుడు 0 అంటే నంబర్ 0 నా లేక ఎంప్టీ పాయింటరా అని కంపైలర్ కి విపరీతమైన కన్ఫ్యూజన్ వచ్చేది. ఆ బగ్ ని తీసేయడానికి C++11 లో <strong><code>nullptr</code></strong> ని తెచ్చారు. ఇక మీదట ఎప్పుడైనా ఎంప్టీ పాయింటర్ వాడాలంటే <code>nullptr</code> మాత్రమే వాడాలి.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (References vs Pointers)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో ఒకే ఒక వాల్యూ ని పాయింటర్ ద్వారా మరియు రిఫరెన్స్ ద్వారా ఎలా మారుస్తున్నామో జాగ్రత్తగా గమనించండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++ — Pointers & References</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;

int main() {
    int score = 50;
    
    // 1. Reference (నిక్ నేమ్). ఇది ఎప్పుడూ & తో రాయాలి.
    int &ref = score; 
    
    // 2. Pointer (అడ్రస్ కార్డు). దీనికి అడ్రస్ (&score) ఇవ్వాలి.
    int *ptr = &score;
    
    // రిఫరెన్స్ వాడి మార్చుతున్నాం (ఇది డైరెక్ట్ గా వాడుకోవచ్చు)
    ref = 75;
    
    // పాయింటర్ వాడి మార్చుతున్నాం (దీనికి స్టార్ * వాడాలి)
    *ptr = 100;
    
    // ఫైనల్ గా స్కోర్ ఎంత ఉందో చూద్దాం
    std::cout << "Final Score: " << score << std::endl;
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>int &amp;ref = score;</code>: ఇక్కడ <code>ref</code> అనేది కొత్త వేరియబుల్ కాదు. అది కేవలం <code>score</code> కి పెట్టిన ఇంకొక పేరు మాత్రమే. <code>ref</code> ని మార్చినా డైరెక్ట్ గా <code>score</code> మారిపోతుంది.</li>
        <li><code>int *ptr = &amp;score;</code>: ఇక్కడ <code>ptr</code> ఒక కొత్త బాక్స్. అందులో <code>score</code> యొక్క RAM అడ్రస్ ని దాచుకున్నాం.</li>
        <li><code>*ptr = 100;</code>: పాయింటర్ కి ముందు <code>*</code> (Dereference) పెడితే, దాని అర్థం "ఆ అడ్రస్ కి వెళ్ళి, అక్కడ ఉన్న వాల్యూ ని 100 కి మార్చు" అని అర్థం. కాబట్టి ఫైనల్ గా స్కోర్ 100 ప్రింట్ అవుతుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: పాయింటర్ కి, రిఫరెన్స్ కి మెయిన్ డిఫరెన్స్ ఏంటి? ఏది వాడాలి?</h4>
          <p>రిఫరెన్స్ ని ఒకసారి క్రియేట్ చేసాక దాన్ని వేరే దానికి లింక్ చేయడం కుదరదు, మరియు దానికి <code>nullptr</code> ఇవ్వలేము. కానీ పాయింటర్ ని మీరు ఎప్పుడైనా వేరే అడ్రస్ కి మార్చుకోవచ్చు. C++ లో ఫంక్షన్స్ కి డేటా పంపేటప్పుడు 90% రిఫరెన్సెస్ (ఉదా: <code>void print(const string& str)</code>) వాడటమే బెస్ట్ ప్రాక్టీస్, ఎందుకంటే అవి క్రాష్ కావు, సేఫ్.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Dangling Pointer (డాంగ్లింగ్ పాయింటర్) అంటే ఏంటి?</h4>
          <p>మీ పాయింటర్ ఒక మెమరీ అడ్రస్ ని పట్టుకుని ఉంది. కానీ ఆ మెమరీ ని వేరే వాళ్ళు డిలీట్ చేసేశారు. ఇప్పుడు మీ పాయింటర్ దగ్గర ఉన్న అడ్రస్ లో ఏమీ లేదు, కానీ అది ఇంకా అక్కడికే పాయింట్ చేస్తూ ఉంటుంది. ఆ చెత్త అడ్రస్ కి పాయింట్ చేసే దాన్నే డాంగ్లింగ్ పాయింటర్ అంటారు. దీన్ని వాడితే ప్రోగ్రామ్ వంద శాతం క్రాష్ అవుతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: <code>*</code> సింబల్ రెండు సార్లు (ఉదా: <code>int **ptr</code>) ఉంటే అర్థం ఏంటి?</h4>
          <p>దీన్నే Pointer to a Pointer అంటారు. అంటే మొదటి పాయింటర్ ఇంకొక పాయింటర్ యొక్క అడ్రస్ ని దాచుకుంది అని అర్థం. 2D అర్రేస్ ని మరియు కాంప్లెక్స్ మ్యాట్రిక్స్ ని హ్యాండిల్ చేయడానికి అడ్వాన్స్డ్ ప్రోగ్రామర్స్ దీన్ని వాడుతారు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 8, "Phase 08", "Pointers & Memory Safety", subtopics, contentBody, '07-cpp-arrays-std-string-string-view-and-std-vector.html', '7. Arrays, std::string & std::vector', '09-cpp-object-oriented-programming-classes-objects-and-encapsulation.html', '9. OOP, Classes & Objects');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 9. OOP, Classes, Objects, Access Specifiers & Pillars
function buildLesson9() {
  const title = "OOP, Classes, Objects & Encapsulation (తెలుగులో)";
  const desc = "C++ లో Object-Oriented Programming (OOP) అంటే ఏమిటి? Classes మరియు Objects ఎలా పనిచేస్తాయి? Encapsulation అనే కాన్సెప్ట్ రియల్ లైఫ్ లో ఎలా ఉందో చూద్దాం.";
  const filename = "09-cpp-object-oriented-programming-classes-objects-and-encapsulation.html";
  const subtopics = "OOP Concepts · Class vs Object · Access Specifiers (public/private) · Encapsulation · this keyword";

  const contentBody = `
    <div class="intro-box">
      <p>C లాంగ్వేజ్ నుండి C++ పుట్టడానికి గల ఒకేఒక్క ముఖ్య కారణం <strong>Object-Oriented Programming (OOP)</strong>. ఒక బ్యాంక్ సాఫ్ట్‌వేర్ రాస్తున్నప్పుడు... కస్టమర్ పేరు, అకౌంట్ బ్యాలెన్స్, డ్రా చేసే ఫంక్షన్స్ ఇవన్నీ విడివిడిగా రాస్తే పెద్ద గందరగోళంగా మారుతుంది. ఆ డేటాని (Variables), మరియు ఆ డేటాతో ఆడుకునే పనులని (Functions) అన్నిటినీ కలిపి ఒక సింగిల్ ప్యాకెట్ లాగా చేయడాన్నే OOP అంటారు. ఈ ఆర్టికల్ లో Classes (క్లాసెస్), Objects (ఆబ్జెక్ట్స్), మరియు డేటాని ఎలా దాచాలి (Encapsulation) అనే బేసిక్ పిల్లర్స్ గురించి డీప్ గా నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Class మరియు Object అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="text-prose">
        <strong>Class (క్లాస్):</strong> ఇది కేవలం ఒక డిజైన్ లేదా బ్లూప్రింట్ మాత్రమే. మెమరీలో ఇది ఎలాంటి జాగా తీసుకోదు.
      </p>
      <p class="text-prose">
        <strong>Object (ఆబ్జెక్ట్):</strong> ఆ బ్లూప్రింట్ ని వాడుకుని మీరు తయారు చేసే అసలైన ప్రొడక్ట్ నే ఆబ్జెక్ట్ అంటారు. దీనికి మెమరీ లోపల ప్రాణం ఉంటుంది.
      </p>

      <div class="deep-dive-card">
        <h3>🏠 రియల్ లైఫ్ స్టోరీ: ఇంటి డిజైన్ ప్లాన్ vs ఇల్లు</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          ఒక ఇంజనీర్ పేపర్ మీద "ఇంటి ప్లాన్" గీసాడు. ఆ ప్లాన్ లో రెండు బెడ్ రూమ్స్, ఒక కిచెన్ ఉంటాయి అని రాసి ఉంది. ఆ పేపర్ (Plan) ని మీరు వెళ్లి అందులో పడుకోలేరు కదా! దాన్ని <strong>Class</strong> అంటారు.<br><br>
          ఇప్పుడు ఒక మేస్త్రి ఆ పేపర్ ప్లాన్ ని చూసి ఇటుకలు, సిమెంట్ పెట్టి కరెక్ట్ గా ఒక బిల్డింగ్ కట్టాడు అనుకోండి. ఆ కట్టిన అసలైన బిల్డింగ్ నే <strong>Object</strong> అంటారు. ఒక్క ప్లాన్ (Class) తో మీరు ఆ కాలనీలో 100 ఇళ్లు (Objects) అయినా కట్టొచ్చు. ప్రోగ్రామింగ్ లో కూడా ఒక్కసారి క్లాస్ రాస్తే, దాని నుండి ఎన్ని ఆబ్జెక్ట్స్ అయినా క్రియేట్ చేసుకోవచ్చు.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Encapsulation (ఎన్‌క్యాప్సులేషన్) ఎందుకు కావాలి?</div>
    <div class="section-body">
      <p class="text-prose">
        కొన్ని వేరియబుల్స్ ని బయట వాళ్ళు డైరెక్ట్ గా మార్చకుండా దాచి పెట్టడాన్నే (Hiding) ఎన్‌క్యాప్సులేషన్ అంటారు. దీన్ని C++ లో <code>private</code> మరియు <code>public</code> అనే యాక్సెస్ స్పెసిఫైయర్స్ (Access Specifiers) తో సాధిస్తాం.
      </p>
      <p class="text-prose">
        <strong>ఉదాహరణ:</strong> మీ బ్యాంక్ అకౌంట్ బ్యాలెన్స్ ని బయట నుండి డైరెక్ట్ గా <code>account.balance = 100000;</code> అని మార్చేస్తే అది పెద్ద హ్యాకింగ్ అవుతుంది. అందుకే బ్యాలెన్స్ ని <code>private</code> గా పెట్టి, కేవలం <code>deposit()</code> అనే <code>public</code> ఫంక్షన్ ద్వారా మాత్రమే మార్చేలా లిమిట్ చేస్తారు.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Class & Encapsulation)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో బ్యాంక్ అకౌంట్ అనే క్లాస్ ని రాసి, బ్యాలెన్స్ ని ప్రైవేట్ గా ఎలా సేఫ్ గా దాచామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++ — Class, Object & Encapsulation</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

// క్లాస్ డిజైన్ (బ్లూప్రింట్)
class BankAccount {
private:
    // ప్రైవేట్ డేటా (బయట నుండి యాక్సెస్ కుదరదు)
    double balance = 0.0;

public:
    // పబ్లిక్ ఫంక్షన్స్ (బయట నుండి వాడొచ్చు)
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount; // ఇక్కడ లోపల లాజిక్ చెక్ చేస్తాం
        }
    }

    void showBalance() {
        std::cout << "Current Balance: " << balance << std::endl;
    }
};

int main() {
    // క్లాస్ నుండి ఒక ఆబ్జెక్ట్ ని క్రియేట్ చేసాం
    BankAccount myAccount;
    
    // myAccount.balance = 5000; // ఇది రాస్తే కంపైలర్ కొడుతుంది! (Error)
    
    // పబ్లిక్ ఫంక్షన్స్ ద్వారా మాత్రమే డేటాని మారుస్తున్నాం
    myAccount.deposit(1500);
    myAccount.showBalance();
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>class BankAccount</code>: ఇది ఒక కొత్త డేటా టైప్ ని మనమే సొంతంగా డిజైన్ చేస్తున్నాం అని అర్థం.</li>
        <li><code>private: double balance</code>: ఇక్కడ ప్రైవేట్ అనడం వల్ల, <code>main()</code> లో నుండి ఎవరైనా డాట్ (<code>.</code>) పెట్టి ఆ బ్యాలెన్స్ ని డైరెక్ట్ గా మార్చాలని చూస్తే కంపైలర్ సెక్యూరిటీ ఎర్రర్ ఇస్తుంది.</li>
        <li><code>public: void deposit()</code>: ఇది బయట వాళ్ళకు కనిపించే సర్వీస్. ఇందులో మీరు లాజిక్ రాసుకున్నారు (amount > 0 అయితేనే కలపాలి అని). దీని ద్వారా బ్యాలెన్స్ సేఫ్ గా అప్‌డేట్ అవుతుంది.</li>
        <li>దీన్నే డేటా హైడింగ్ (Data Hiding) అంటారు. సింపుల్ గా గుళిక (Capsule) లాగా డేటాని, ఫంక్షన్స్ ని కవర్ చేయడమే ఎన్‌క్యాప్సులేషన్.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: క్లాస్ లో public, private ఏమీ రాయకపోతే ఏమవుతుంది?</h4>
          <p>మీరు ఏమీ రాయకపోతే, C++ లో ఒక క్లాస్ లోని డేటా అంతా బై డిఫాల్ట్ (By default) <strong><code>private</code></strong> అయిపోతుంది. మీరు బయట నుండి ఏమీ వాడలేరు. అదే C లో స్ట్రక్చర్ (struct) అయితే బై డిఫాల్ట్ అంతా <code>public</code> గా ఉంటుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: క్లాస్ కి, C లో ఉండే Struct కి మెయిన్ డిఫరెన్స్ ఏంటి?</h4>
          <p>C లాంగ్వేజ్ లోని <code>struct</code> లో మీరు కేవలం వేరియబుల్స్ మాత్రమే పెట్టగలరు, ఫంక్షన్స్ పెట్టలేరు (పాయింటర్స్ వాడితే తప్ప). కానీ C++ లోని క్లాస్ లో వేరియబుల్స్ తో పాటు వాటిని ఆపరేట్ చేసే ఫంక్షన్స్ అన్నీ కలిపి ఒకే ప్యాకేజీ గా ఉంటాయి. అలాగే ప్రైవేట్, పబ్లిక్ సెక్యూరిటీ వస్తుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: Getter, Setter ఫంక్షన్స్ అంటే ఏంటి?</h4>
          <p>ప్రైవేట్ లో ఉన్న డేటాని బయట వాళ్లు కేవలం చదవడానికి వాడే పబ్లిక్ ఫంక్షన్ ని "Getter" అంటారు (ఉదా: <code>getBalance()</code>). అదే ఆ డేటాని మార్చడానికి వాడే సేఫ్ ఫంక్షన్ ని "Setter" అంటారు (ఉదా: <code>setBalance()</code>). ఇవి ఎన్‌క్యాప్సులేషన్ కి ప్రాణం లాంటివి.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 9, "Phase 09", "Object-Oriented Programming", subtopics, contentBody, '08-cpp-pointers-references-nullptr-and-memory-safety.html', '8. Pointers, References & nullptr', '10-cpp-constructors-destructors-rule-of-five-and-raii.html', '10. Constructors, Destructors & RAII');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 10. Constructors, Destructors, Rule of 5 & RAII
function buildLesson10() {
  const title = "Constructors, Destructors & RAII (తెలుగులో)";
  const desc = "C++ లో ఒక ఆబ్జెక్ట్ పుట్టినప్పుడు (Constructor), చనిపోయేటప్పుడు (Destructor) ఏం జరుగుతుంది? RAII అనే అడ్వాన్స్డ్ కాన్సెప్ట్ మెమరీ లీక్స్ ని ఎలా ఆపుతుందో డీప్ గా చూద్దాం.";
  const filename = "10-cpp-constructors-destructors-rule-of-five-and-raii.html";
  const subtopics = "Constructors · Destructors · Resource Acquisition (RAII) · Memory Leaks Prevention";

  const contentBody = `
    <div class="intro-box">
      <p>గత పాఠంలో మనం క్లాస్ (Class) తయారు చేయడం చూసాము. కానీ ఒక ఆబ్జెక్ట్ మెమరీ లో పుట్టినప్పుడు (క్రియేట్ అయినప్పుడు), దాని లోపల ఉన్న వాల్యూస్ కి మొదట్లోనే ఏదైనా డేటా ఇవ్వాలి అనుకుంటే ఎలా? ఆటోమేటిక్ గా రన్ అయ్యే స్పెషల్ ఫంక్షన్స్ మనకు కావాలి. వాటినే <strong>Constructors (కన్‌స్ట్రక్టర్స్)</strong> అంటారు. అలాగే ఆ ఆబ్జెక్ట్ పని అయిపోయి మెమరీ నుండి చనిపోయేటప్పుడు, అది వాడుకున్న రామ్ (RAM) ని, ఫైల్స్ ని తిరిగి సిస్టమ్ కి ఇచ్చేయాలి. ఆ క్లీనింగ్ పని చేసేదే <strong>Destructors (డిస్ట్రక్టర్స్)</strong>. ఈ రెండు కలిపితే పుట్టే అద్భుతమైన కాన్సెప్టే "RAII". అది ఎంటో ఇప్పుడు క్లియర్ గా తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Constructors మరియు Destructors అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="text-prose">
        <strong>Constructor:</strong> ఇది క్లాస్ పేరుతోనే ఉండే ఒక స్పెషల్ ఫంక్షన్. దీనికి ఎటువంటి రిటర్న్ టైప్ (<code>void</code> లాంటివి) ఉండదు. ఆబ్జెక్ట్ పుట్టగానే ఇది ఎవరి పిలుపు లేకుండా ఆటోమేటిక్ గా దానంతట అదే రన్ అవుతుంది. దీన్ని సెటప్ (Setup) చేయడానికి వాడతారు.
      </p>
      <p class="text-prose">
        <strong>Destructor:</strong> ఇది కూడా క్లాస్ పేరుతోనే ఉంటుంది, కానీ ముందు ఒక <code>~</code> (టిల్డ్) సింబల్ ఉంటుంది. ఆబ్జెక్ట్ మెమరీ నుండి డిలీట్ అయ్యే చివరి సెకనులో ఇది రన్ అయ్యి, చెత్త అంతా క్లీన్ చేసి పోతుంది.
      </p>

      <div class="deep-dive-card">
        <h3>🎬 రియల్ లైఫ్ స్టోరీ: థియేటర్ లో సినిమా సీటు (RAII)</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          మీరు థియేటర్ కి వెళ్లి ఒక సీటులో కూర్చున్నారు అనుకోండి.<br><br>
          <strong>Constructor (పుట్టుక):</strong> మీరు సీటులో కూర్చోగానే, ఆ సీటు మీ పేరు మీద <strong>రిజర్వ్ (Book)</strong> అయిపోయింది. వేరే వాళ్లు అందులో కూర్చోలేరు. ఆ రిజర్వేషన్ చేసేదే కన్‌స్ట్రక్టర్.<br><br>
          <strong>Destructor (ముగింపు):</strong> సినిమా అయిపోయిన వెంటనే, మీరు లేచి వెళ్లిపోతారు. మీరు లేవగానే ఆటోమేటిక్ గా ఆ సీటు నెక్స్ట్ వాళ్ళ కోసం <strong>ఖాళీ (Clean up/Free)</strong> అయిపోతుంది. <br><br>
          అంటే ఒక వస్తువు ఉన్నంతసేపే ఆ మెమరీ లాక్ అయి ఉంటుంది, దాని పని అవ్వగానే దానంతట అదే మెమరీ ని రిలీజ్ చేస్తుంది. C++ లో ఈ అద్భుతమైన ప్యాట్రన్ నే <strong>RAII (Resource Acquisition Is Initialization)</strong> అంటారు. దీనివల్ల కంప్యూటర్ లో "మెమరీ లీక్స్" (RAM ఫుల్ అయిపోయి హ్యాంగ్ అవ్వడం) జరగవు.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (Constructor & Destructor)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో ఫైల్ హ్యాండ్లింగ్ కి సంబంధించిన క్లాస్ ఎలా ఆటోమేటిక్ గా కనెక్ట్ అయ్యి, ఆటోమేటిక్ గా క్లోజ్ అవుతుందో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++ — Constructor, Destructor (RAII)</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

class Database {
private:
    std::string dbName;

public:
    // 1. Constructor (పుట్టినప్పుడు రన్ అవుతుంది)
    Database(std::string name) {
        dbName = name;
        std::cout << "[+] Database '" << dbName << "' is Connected!" << std::endl;
    }

    void doWork() {
        std::cout << "    -> Fetching users from " << dbName << "..." << std::endl;
    }

    // 2. Destructor (~ సింబల్ తో ఉంటుంది, చనిపోయేటప్పుడు రన్ అవుతుంది)
    ~Database() {
        std::cout << "[-] Database '" << dbName << "' is Disconnected. Memory Freed!" << std::endl;
    }
};

int main() {
    std::cout << "--- Main Started ---" << std::endl;
    
    { // ఇక్కడ ఒక చిన్న స్కోప్ (బ్రాకెట్) క్రియేట్ చేశాం
        Database db("Facebook_Users"); // ఇక్కడ Constructor రన్ అవుతుంది
        db.doWork();
    } // బ్రాకెట్ అవ్వగానే ఆబ్జెక్ట్ చనిపోతుంది, Destructor ఆటోమేటిక్ గా రన్ అవుతుంది!
    
    std::cout << "--- Main Ended ---" << std::endl;
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li>మనం <code>Database db("Facebook_Users");</code> అనగానే <code>Database(...)</code> అనే కన్‌స్ట్రక్టర్ రన్ అయ్యి, ఆ పేరుని సెట్ చేసి కనెక్షన్ అయినట్లు ప్రింట్ చేసింది.</li>
        <li>ఆ తర్వాత బ్రాకెట్ <code>}</code> క్లోజ్ అవ్వగానే, ఆ ఆబ్జెక్ట్ యొక్క టైమ్ అయిపోయింది కాబట్టి కంపైలర్ దాన్ని మెమరీ లోనుండి లేపేస్తుంది. ఆ లేపేసే ముందే <code>~Database()</code> డిస్ట్రక్టర్ ని కాల్ చేస్తుంది.</li>
        <li>దీనివల్ల ప్రోగ్రామర్ ఎప్పుడూ <code>db.close()</code> అని మ్యాన్యువల్ గా రాయాల్సిన టెన్షన్ లేదు (ముఖ్యంగా ఎర్రర్స్ వచ్చి ప్రోగ్రామ్ క్రాష్ అయినప్పుడు కూడా డిస్ట్రక్టర్ గ్యారెంటీగా రన్ అవుతుంది). ఇదే RAII బ్యూటీ!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">4</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: కన్‌స్ట్రక్టర్ ని నేను పిలవచ్చా? (ఉదా: <code>db.Database()</code>)</h4>
          <p>లేదండి! కన్‌స్ట్రక్టర్ ని మీరు విడిగా డైరెక్ట్ గా ఎప్పుడూ కాల్ చేయలేరు. ఆబ్జెక్ట్ (వేరియబుల్) ని క్రియేట్ చేస్తున్న ఆ ఒక్క సెకనులో కంపైలర్ మాత్రమే దాన్ని కాల్ చేయగలదు. అది సెటప్ కోసం మాత్రమే వాడే వన్-టైమ్ కీ.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: నా క్లాస్ లో నేను కన్‌స్ట్రక్టర్ రాయకపోతే ఏమవుతుంది? ప్రోగ్రామ్ ఎర్రర్ వస్తుందా?</h4>
          <p>ఎర్రర్ రాదు. మీరు రాయకపోతే C++ కంపైలర్ దానంతట అదే ఒక డమ్మీ (Empty / Default) కన్‌స్ట్రక్టర్ ని క్రియేట్ చేసి రన్ చేస్తుంది. దాన్ని "Compiler Generated Default Constructor" అంటారు. కానీ అందులోపల ఏ వాల్యూస్ సెట్ అవ్వవు, చెత్త (Garbage) వాల్యూస్ ఉండిపోతాయి.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: Rule of Three / Rule of Five అంటే ఏంటి?</h4>
          <p>మీరు ఒక క్లాస్ లో మీ స్వంతంగా ఒక డిస్ట్రక్టర్ ని రాయాల్సి వచ్చింది అంటే... మీరు డైరెక్ట్ గా పాయింటర్స్ మరియు ర్యామ్ (Heap memory) తో ఆడుకుంటున్నారు అని అర్థం. అలాంటప్పుడు కాపీ చేసేటప్పుడు క్రాష్ అవ్వకుండా ఉండటానికి మీరు ఖచ్చితంగా Copy Constructor మరియు Copy Assignment Operator ని కూడా రాయాలి. ఈ మూడింటినీ కలిపే రూల్ ఆఫ్ త్రీ అంటారు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 10, "Phase 10", "Constructors & RAII", subtopics, contentBody, '09-cpp-object-oriented-programming-classes-objects-and-encapsulation.html', '9. OOP, Classes & Objects', '11-cpp-inheritance-virtual-functions-and-runtime-polymorphism.html', '11. Inheritance & Virtual Functions');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function run() {
  buildLesson6();
  buildLesson7();
  buildLesson8();
  buildLesson9();
  buildLesson10();
  console.log("✅ Generated C++ Lessons 6 to 10 with MASSIVE Text, Deep Stories, and ONLY ONE short code!");
}
run();
