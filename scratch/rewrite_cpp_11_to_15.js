const fs = require('fs');
const path = require('path');
const { wrapCppPage } = require('./build_cpp_10_phases_master.js');

const cDir = path.join(__dirname, '..', 'public', 'blog-cpp');
if (!fs.existsSync(cDir)) {
  fs.mkdirSync(cDir, { recursive: true });
}

// 11. Inheritance, Virtual Functions & Runtime Polymorphism
function buildLesson11() {
  const title = "Inheritance, Virtual Functions & Polymorphism (తెలుగులో)";
  const desc = "C++ లో Inheritance ఎలా పనిచేస్తుంది? Base Class కి Derived Class కి ఉన్న సంబంధం ఏంటి? Virtual Functions ద్వారా Runtime Polymorphism ని ఎలా అచీవ్ చేయాలో పూర్తి స్థాయి డీప్ ఎక్స్‌ప్లనేషన్ తో నేర్చుకుందాం.";
  const filename = "11-cpp-inheritance-virtual-functions-and-runtime-polymorphism.html";
  const subtopics = "Inheritance Types · Base vs Derived · Virtual Functions · V-Table & V-Ptr · Runtime Polymorphism";

  const contentBody = `
    <div class="intro-box">
      <p>ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP) లో రెండు అతిపెద్ద పిల్లర్స్ ఉన్నాయి. అందులో ఒకటి <strong>Inheritance (వారసత్వం)</strong>, మరొకటి <strong>Polymorphism (బహురూపకత)</strong>. ఒకసారి రాసిన కోడ్ ని పదే పదే రాయకుండా, ఉన్న కోడ్ నే కొద్దిగా మార్చుకుని కొత్త ఫీచర్స్ తయారు చేయడానికి ఇవి ఎంతో ఉపయోగపడతాయి. ముఖ్యంగా గేమ్ డెవలప్‌మెంట్ లాంటి పెద్ద ప్రాజెక్ట్స్ లో వందలాది క్యారెక్టర్స్ కి ఒకే రకమైన మూమెంట్స్ (నడక, పరుగు) ఉన్నప్పుడు, ప్రతి ఒక్కరికీ విడివిడిగా కోడ్ రాయలేము. అప్పుడే ఈ బేస్ క్లాస్ - డిరైవ్డ్ క్లాస్ కాన్సెప్ట్ మనల్ని కాపాడుతుంది. పైగా C++ కి మాత్రమే ప్రత్యేకం అయిన Virtual Table (v-table) ఎలా పనిచేస్తుందో ఈ రోజు డీప్ గా పోస్ట్‌మార్టం చేసి తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> అసలు Inheritance (వారసత్వం) ఎందుకు అవసరం?</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు ఒక జూ (Zoo) కి సంబంధించిన సాఫ్ట్‌వేర్ రాస్తున్నారు అనుకోండి. అందులో "సింహం (Lion)", "ఏనుగు (Elephant)", "కుక్క (Dog)" అనే మూడు క్లాసెస్ తయారు చేయాలి. మూడింటికి కామన్ గా కొన్ని లక్షణాలు ఉంటాయి: ప్రాణం ఉంటుంది, తింటాయి, నిద్రపోతాయి, అరుస్తాయి. ఆ మూడింటికి విడివిడిగా <code>eat()</code>, <code>sleep()</code> అనే ఫంక్షన్స్ రాస్తే కోడ్ మొత్తం డూప్లికేట్ (డబుల్) అవుతుంది.
      </p>

      <div class="deep-dive-card">
        <h3>🦁 రియల్ లైఫ్ స్టోరీ: జంతువులు - బేస్ క్లాస్ మరియు డిరైవ్డ్ క్లాస్</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          ఈ డూప్లికేషన్ ప్రాబ్లెమ్ ని సాల్వ్ చేయడానికి ప్రోగ్రామర్స్ ఏం చేస్తారంటే, ముందుగా <strong>"Animal"</strong> అనే ఒక పెద్ద క్లాస్ (దీన్నే Base Class లేదా Parent Class అంటారు) తయారు చేస్తారు. అందులో కామన్ గా ఉండే <code>eat()</code>, <code>sleep()</code> లాంటివి రాసి పెడతారు.<br><br>
          ఆ తర్వాత <strong>Lion</strong> మరియు <strong>Elephant</strong> అనే చిన్న క్లాసెస్ (దీన్నే Derived Class లేదా Child Class అంటారు) తయారు చేసి, వాటిని <strong>Animal</strong> కి లింక్ చేస్తారు (దీన్నే Inherit చేసుకోవడం అంటారు). ఇలా లింక్ చేసిన వెంటనే, Animal లో ఉన్న ఫంక్షన్స్ అన్నీ ఆటోమేటిక్ గా Lion లోకి వచ్చేస్తాయి! మళ్ళీ రాయక్కర్లేదు. ఇప్పుడు Lion క్లాస్ లో కేవలం సింహానికి మాత్రమే ప్రత్యేకమైన <code>roar()</code> (గర్జించడం) ఫంక్షన్ రాసుకుంటే చాలు. ఇదే ఇన్హెరిటెన్స్ మ్యాజిక్!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Polymorphism (పాలిమార్ఫిజం) అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="text-prose">
        "Poly" అంటే చాలా (Many), "Morphs" అంటే రూపాలు (Forms). ఒకే ఫంక్షన్ వేరువేరు క్లాసెస్ లో వేరువేరు విధాలుగా పనిచేయడాన్నే పాలిమార్ఫిజం అంటారు. ఉదాహరణకు, <code>Animal</code> క్లాస్ లో <code>makeSound()</code> అనే ఫంక్షన్ ఉందనుకోండి. ఆ ఫంక్షన్ ని కుక్క (Dog) కాల్ చేస్తే "భౌ భౌ" అనాలి, పిల్లి (Cat) కాల్ చేస్తే "మియావ్" అనాలి. ఒకే <code>makeSound()</code> పేరు... కానీ అది పనిచేసే విధానం ఆబ్జెక్ట్ ని బట్టి మారిపోతుంది.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> Virtual Functions మరియు V-Table రహస్యం</div>
    <div class="section-body">
      <p class="text-prose">
        C++ లో పాలిమార్ఫిజం సాధించాలంటే బేస్ క్లాస్ లోని ఫంక్షన్ కి ముందు <strong><code>virtual</code></strong> అనే కీవర్డ్ పెట్టాలి. ఆ <code>virtual</code> అని పెడితే కంపైలర్ బ్యాక్ గ్రౌండ్ లో ఏం చేస్తుందో తెలుసా? ఒక రహస్యమైన టేబుల్ ని క్రియేట్ చేస్తుంది. దాన్నే <strong>V-Table (Virtual Table)</strong> అంటారు.
      </p>
      <p class="text-prose">
        మీరు ప్రోగ్రామ్ ని రన్ చేసినప్పుడు, పాయింటర్ ఏ ఆబ్జెక్ట్ ని పట్టుకుని ఉందో చూసుకుని (అది కుక్కనా లేక పిల్లా అని), ఆ V-Table లో వెతికి కరెక్ట్ ఫంక్షన్ ని ఆన్ ది స్పాట్ (Runtime) లో కాల్ చేస్తుంది. దీనికి కొంచెం ఎక్స్ట్రా మెమరీ (V-Ptr) మరియు మైక్రో సెకండ్స్ టైమ్ పడుతుంది, కానీ ఇది ఎంతో పవర్ ఫుల్!
      </p>
    </div>

    <div class="section-title"><span class="num">4</span> ఒకే ఒక సింపుల్ కోడ్ (Runtime Polymorphism)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో <code>virtual</code> కీవర్డ్ వాడి <code>makeSound()</code> అనే ఒకే ఫంక్షన్ తో కుక్కని, పిల్లిని ఎలా అరిపించామో (Polymorphism) జాగ్రత్తగా చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++ — Inheritance & Virtual Functions</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;

// Base Class (పేరెంట్)
class Animal {
public:
    // virtual పెట్టడం వల్ల కంపైలర్ కి అర్థమవుతుంది ఇది చైల్డ్ లో మారబోతోందని
    virtual void makeSound() {
        std::cout << "Some generic animal sound..." << std::endl;
    }
};

// Derived Class 1 (చైల్డ్)
class Dog : public Animal {
public:
    // బేస్ క్లాస్ ఫంక్షన్ ని ఓవర్ రైడ్ (Override) చేస్తున్నాం
    void makeSound() override {
        std::cout << "Dog says: Bow Bow!" << std::endl;
    }
};

// Derived Class 2 (చైల్డ్)
class Cat : public Animal {
public:
    void makeSound() override {
        std::cout << "Cat says: Meow Meow!" << std::endl;
    }
};

int main() {
    // బేస్ క్లాస్ పాయింటర్ (Animal*) తో చైల్డ్ ఆబ్జెక్ట్స్ ని కంట్రోల్ చేయడం
    Animal* myPet1 = new Dog();
    Animal* myPet2 = new Cat();
    
    // ఒకే రకమైన పాయింటర్, కానీ ఆబ్జెక్ట్ ని బట్టి రిజల్ట్ మారుతుంది!
    myPet1->makeSound(); // ఇది Bow Bow అని వస్తుంది
    myPet2->makeSound(); // ఇది Meow Meow అని వస్తుంది
    
    // మెమరీ లీక్ రాకుండా డిలీట్ చేయాలి
    delete myPet1;
    delete myPet2;
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">5</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>class Dog : public Animal</code>: ఇక్కడ <code>public Animal</code> అని రాయడం వల్ల, Animal లో ఉన్న లక్షణాలన్నీ Dog లోకి వచ్చేశాయి.</li>
        <li><code>virtual void makeSound()</code>: పేరెంట్ లో virtual అని పెట్టకపోతే, మీరు <code>Animal*</code> పాయింటర్ వాడినప్పుడు అది ఎప్పటికీ పేరెంట్ లో ఉన్న "generic sound" నే కాల్ చేస్తుంది. Virtual పెట్టడం వల్లే అది ఒరిజినల్ ఆబ్జెక్ట్ (కుక్క) ఫంక్షన్ ని రన్ చేస్తుంది.</li>
        <li><code>override</code>: ఇది C++11 లో వచ్చిన ఫీచర్. మనం కావాలనే పేరెంట్ ఫంక్షన్ ని మారుస్తున్నాం అని కంపైలర్ కి క్లారిటీ ఇవ్వడానికి (స్పెల్లింగ్ మిస్టేక్స్ లేకుండా) ఇది వాడుతాం.</li>
        <li><code>Animal* myPet1 = new Dog();</code>: దీన్నే <strong>Upcasting</strong> అంటారు. ఒక పేరెంట్ పాయింటర్ తో చైల్డ్ ఆబ్జెక్ట్ ని స్టోర్ చేయడం. పెద్ద ప్రాజెక్ట్స్ లో వేలాది ఆబ్జెక్ట్స్ ని ఒకే అర్రే (Array of Animal Pointers) లో పెట్టి లూప్ తిప్పడానికి ఇది ప్రాణం లాంటిది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">6</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: C++ లో Multiple Inheritance (రెండు పేరెంట్స్ నుండి వారసత్వం) ఉంటుందా?</h4>
          <p>ఉంటుంది! జావా లో మల్టిపుల్ ఇన్హెరిటెన్స్ ఉండదు, కానీ C++ లో ఒక చైల్డ్ కి ఇద్దరు పేరెంట్స్ (ఉదాహరణకు <code>class SmartPhone : public Phone, public Camera</code>) ఉండొచ్చు. అయితే దీనివల్ల ఒక పెద్ద ప్రాబ్లెమ్ వస్తుంది, దాన్నే <strong>"Diamond Problem"</strong> అంటారు. దీన్ని సాల్వ్ చేయడానికి మళ్ళీ <code>virtual inheritance</code> అనే అడ్వాన్స్డ్ టెక్నిక్ వాడాలి.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Pure Virtual Function అంటే ఏంటి? Abstract Class అంటే ఏంటి?</h4>
          <p>కొన్నిసార్లు పేరెంట్ క్లాస్ లో ఫంక్షన్ బాడీ ఉండకూడదు, కేవలం హెడ్డింగ్ మాత్రమే ఉండాలి. అప్పుడు <code>virtual void makeSound() = 0;</code> అని రాస్తారు. దీన్నే ప్యూర్ వర్చువల్ ఫంక్షన్ అంటారు. ఏ క్లాస్ లో అయితే కనీసం ఒక ప్యూర్ వర్చువల్ ఫంక్షన్ ఉంటుందో దాన్ని <strong>Abstract Class (అబ్స్ట్రాక్ట్ క్లాస్)</strong> అంటారు. ఈ అబ్స్ట్రాక్ట్ క్లాస్ కి మీరు <code>new</code> వాడి డైరెక్ట్ గా ఆబ్జెక్ట్ క్రియేట్ చేయలేరు!</p>
        </div>
        <div class="faq-item">
          <h4>Q3: Destructor ని ఎందుకు ఎప్పుడూ <code>virtual</code> గా పెట్టమని చెప్తారు?</h4>
          <p>ఇది చాలా ఇంపార్టెంట్ ఇంటర్వ్యూ క్వశ్చన్! మీరు పేరెంట్ పాయింటర్ (Animal*) తో చైల్డ్ ఆబ్జెక్ట్ (Dog) ని క్రియేట్ చేసి, చివరికి <code>delete myPet1;</code> అని కాల్ చేస్తే, కంపైలర్ కేవలం Animal డిస్ట్రక్టర్ ని మాత్రమే రన్ చేసి Dog డిస్ట్రక్టర్ ని వదిలేస్తుంది (దీనివల్ల మెమరీ లీక్ వస్తుంది). అదే మీరు బేస్ క్లాస్ లో <code>virtual ~Animal()</code> అని పెడితే, అది ముందు కుక్క డిస్ట్రక్టర్ ని కాల్ చేసి, ఆ తర్వాత యానిమల్ డిస్ట్రక్టర్ ని క్లీన్ చేస్తుంది. పూర్తి సేఫ్టీ!</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 11, "Phase 11", "Inheritance & Polymorphism", subtopics, contentBody, '10-cpp-constructors-destructors-rule-of-five-and-raii.html', '10. Constructors & RAII', '12-cpp-operator-overloading-friend-functions-and-stream-operators.html', '12. Operator Overloading');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 12. Operator Overloading, Friend Functions & Streams
function buildLesson12() {
  const title = "Operator Overloading & Friend Functions (తెలుగులో)";
  const desc = "C++ లో Operators (+, -, *) ని మన సొంత క్లాసెస్ కోసం ఎలా ఓవర్‌లోడ్ చేయాలి? Friend Functions ద్వారా ప్రైవేట్ డేటాని ఎలా యాక్సెస్ చేయాలో పూర్తి స్థాయి డీప్ ఎక్స్‌ప్లనేషన్ తో చూద్దాం.";
  const filename = "12-cpp-operator-overloading-friend-functions-and-stream-operators.html";
  const subtopics = "Operator Overloading (+, -) · Friend Functions · cin/cout Overloading · Encapsulation Bypass";

  const contentBody = `
    <div class="intro-box">
      <p>మామూలుగా అయితే <code>int a = 5, b = 10;</code> అని తీసుకుని <code>a + b</code> అని కూడితే 15 వస్తుంది. ఎందుకంటే ఆ <code>+</code> (ప్లస్) అనే ఆపరేటర్ కి నంబర్స్ ని ఎలా కూడాలో తెలుసు. కానీ మీ దగ్గర <code>Vector3D</code> (X, Y, Z కోఆర్డినేట్స్) అనే ఒక సొంత క్లాస్ ఉందనుకోండి. రెండు వెక్టార్ ఆబ్జెక్ట్స్ ని <code>v1 + v2</code> అని రాస్తే కంపైలర్ కి పిచ్చెక్కుతుంది! ఎందుకంటే రెండు బాక్సులని ఎలా కూడాలో దానికి తెలీదు. ఇలా మనకు నచ్చిన క్లాసెస్ కి ఆపరేటర్స్ ని కొత్తగా నేర్పించడాన్నే <strong>Operator Overloading (ఆపరేటర్ ఓవర్‌లోడింగ్)</strong> అంటారు. దీనితో పాటు, ప్రైవేట్ రూమ్ లో ఉన్న సీక్రెట్స్ ని యాక్సెస్ చేయడానికి వాడే <strong>Friend Functions</strong> గురించి కూడా డీప్ గా నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> అసలు Operator Overloading అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="text-prose">
        ప్రోగ్రామింగ్ లో మనం మ్యాథ్స్ లో వాడే సింబల్స్ (<code>+, -, *, ==, <<</code>) అన్నీ బేసిక్ డేటా టైప్స్ (int, float) కి మాత్రమే పనిచేస్తాయి. కానీ C++ లో మనకు ఉన్న ఒక సూపర్ పవర్ ఏంటంటే, ఈ సింబల్స్ ని మన క్లాసెస్ (ఉదాహరణకు Complex Numbers, Matrices, 3D Vectors) కి అప్లై చేసేలా వాటి మీనింగ్ ని మార్చొచ్చు. దీన్నే ఓవర్‌లోడింగ్ అంటారు.
      </p>

      <div class="deep-dive-card">
        <h3>🎮 రియల్ లైఫ్ స్టోరీ: వీడియో గేమ్ లో హెల్త్ ప్యాక్ సిస్టమ్</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          మీరు ఒక పబ్ జి (PUBG) లాంటి గేమ్ ఆడుతున్నారు. అందులో ప్లేయర్ కి సంబంధించిన హెల్త్, బుల్లెట్స్ ఒక క్లాస్ (PlayerStatus) లో ఉంటాయి. మీరు ఒక హెల్త్ కిట్ (HealthKit) ని పిక్ చేసుకోగానే, మీ ప్లేయర్ స్టేటస్ పెరగాలి.<br><br>
          C++ లో మనం <code>PlayerStatus + HealthKit</code> అని రాసేలా కంపైలర్ కి నేర్పించొచ్చు! అప్పుడు కంపైలర్ ఆ <code>+</code> సింబల్ ని చూసినప్పుడు, ఒక ఫంక్షన్ ని కాల్ చేసి ఆ హెల్త్ కిట్ లో ఉన్న 50 HP ని ప్లేయర్ కి ఆటోమేటిక్ గా యాడ్ చేస్తుంది. దీనివల్ల గేమ్ డెవలపర్స్ <code>addHealth(50)</code> లాంటి బోర్ కొట్టే ఫంక్షన్స్ రాయకుండా, డైరెక్ట్ గా మ్యాథ్స్ లాగా <code>player += health_kit;</code> అని రాసుకుంటూ వెళ్ళిపోతారు. కోడ్ చదవడానికి చాలా అద్భుతంగా ఉంటుంది!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Friend Functions (ఫ్రెండ్ ఫంక్షన్స్) ఎందుకు వాడాలి?</div>
    <div class="section-body">
      <p class="text-prose">
        క్లాస్ లోపల <code>private</code> గా ఉన్న డేటాని బయట నుండి ఏ ఫంక్షన్ యాక్సెస్ చేయలేదని మనం గతంలో నేర్చుకున్నాం (Encapsulation). కానీ కొన్ని ప్రత్యేక పరిస్థితుల్లో వేరే క్లాస్ లో ఉన్న ఫంక్షన్ గానీ, లేదా బయట ఉన్న ఒక గ్లోబల్ ఫంక్షన్ గానీ మన ప్రైవేట్ డేటాని ముట్టుకోవాల్సి వస్తుంది.
      </p>
      <p class="text-prose">
        అప్పుడు మనం ఆ ఫంక్షన్ పేరుకి ముందు <strong><code>friend</code></strong> అని మన క్లాస్ లోపల ఒక డిక్లరేషన్ ఇస్తాము. దీని అర్థం ఏంటంటే, "కంపైలర్ గారూ, ఈ ఫంక్షన్ నా బెస్ట్ ఫ్రెండ్, వీడికి నా ప్రైవేట్ లాకర్ పాస్వర్డ్ ఇచ్చేస్తున్నా, అడ్డుకోకండి" అని చెప్పడం. ముఖ్యంగా <code><<</code> (cout) ని ఓవర్ లోడ్ చేసేటప్పుడు ఈ ఫ్రెండ్ ఫంక్షన్స్ ని కచ్చితంగా వాడాలి.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Operator Overloading)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో రెండు 2D పాయింట్స్ (x, y) ని <code>+</code> ఆపరేటర్ వాడి ఎలా కూడుతున్నామో, దాన్ని డైరెక్ట్ గా <code>cout</code> తో ఎలా ప్రింట్ చేస్తున్నామో క్లియర్ గా గమనించండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++ — Operator + & cout Overloading</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;

class Point {
private:
    int x, y;

public:
    // కన్‌స్ట్రక్టర్ (వాల్యూస్ సెట్ చేయడానికి)
    Point(int xVal = 0, int yVal = 0) {
        x = xVal;
        y = yVal;
    }

    // 1. Operator '+' ని ఓవర్‌లోడ్ చేస్తున్నాం
    // పక్కన ఉన్న ఇంకొక Point ని తీసుకుని, రెండిటినీ కూడి కొత్త Point ఇస్తుంది
    Point operator+(const Point& other) {
        Point result;
        result.x = this->x + other.x;
        result.y = this->y + other.y;
        return result;
    }

    // 2. Operator '<<' ని ఓవర్‌లోడ్ చేస్తున్నాం (cout కోసం)
    // ఇది గ్లోబల్ ఫంక్షన్ కాబట్టి friend అని ఇచ్చాం (ప్రైవేట్ x, y చదవడానికి)
    friend std::ostream& operator<<(std::ostream& out, const Point& p) {
        out << "(" << p.x << ", " << p.y << ")";
        return out;
    }
};

int main() {
    Point p1(10, 20);
    Point p2(5, 15);
    
    // డైరెక్ట్ గా మ్యాథ్స్ లాగా రెండు ఆబ్జెక్ట్స్ ని కూడుతున్నాం! (Operator + magic)
    Point p3 = p1 + p2;
    
    // డైరెక్ట్ గా ఆబ్జెక్ట్ ని ప్రింట్ చేస్తున్నాం! (Operator << magic)
    std::cout << "Result Point: " << p3 << std::endl;
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>Point operator+(const Point&amp; other)</code>: మనం <code>p1 + p2</code> అని రాయగానే, కంపైలర్ <code>p1.operator+(p2)</code> అని మార్చి ఫంక్షన్ ని పిలుస్తుంది. అప్పుడు <code>this-&gt;x</code> అనేది p1 యొక్క x ని (10), <code>other.x</code> అనేది p2 యొక్క x ని (5) కూడి రిజల్ట్ (15) పంపుతుంది.</li>
        <li><code>friend std::ostream&amp; operator&lt;&lt;</code>: మామూలుగా <code>cout</code> కి మన <code>Point</code> ఆబ్జెక్ట్ లో ఏముందో తెలీదు. కాబట్టి మనం ఈ ఫ్రెండ్ ఫంక్షన్ రాసి, అందులో బ్రాకెట్స్ పెట్టి ఫార్మాట్ <code>(x, y)</code> గా మార్చి అవుట్పుట్ స్ట్రీమ్ (out) లోకి తోసాము. ఇది రాయకపోతే మీరు <code>cout &lt;&lt; p3;</code> అని రాసినప్పుడు భయంకరమైన ఎర్రర్ వస్తుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: C++ లో ఏ ఏ ఆపరేటర్స్ ని మనం మార్చలేము (Cannot Overload)?</h4>
          <p>చాలా మటుకు అన్నిటినీ మార్చొచ్చు కానీ, కొన్నింటిని కంపైలర్ టచ్ చేయనివ్వదు. అవి: డాట్ ఆపరేటర్ (<code>.</code>), స్కోప్ రిజల్యూషన్ ఆపరేటర్ (<code>::</code>), టెర్నరీ ఆపరేటర్ (<code>?:</code>), మరియు <code>sizeof</code> ఆపరేటర్. వీటి మీనింగ్ మారిపోతే మొత్తం C++ పునాది కదిలిపోతుంది కాబట్టి వీటిని లాక్ చేసారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: ఒక క్లాస్ లో వందలాది ఫ్రెండ్ ఫంక్షన్స్ వాడొచ్చా? ఇది మంచిదేనా?</h4>
          <p>వాడొచ్చు, కానీ అది <strong>"Very Bad Design"</strong> అవుతుంది! ఎందుకంటే ఎన్‌క్యాప్సులేషన్ ముఖ్య ఉద్దేశ్యమే డేటాని దాచిపెట్టి కాపాడటం. మీరు ఎవరికి పడితే వాళ్ళకి ఫ్రెండ్ షిప్ ఇచ్చేసి ప్రైవేట్ డేటాని ఓపెన్ చేస్తే, దాన్ని హాక్ చేయడం లేదా తప్పు వాల్యూస్ సెట్ చేయడం చాలా ఈజీ అవుతుంది. కేవలం <code>cin / cout</code> ఓవర్ లోడింగ్ లాంటి అత్యవసర సమయాల్లో మాత్రమే ఫ్రెండ్ ని వాడాలి.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: జావా లాంటి లాంగ్వేజెస్ లో ఆపరేటర్ ఓవర్‌లోడింగ్ ఎందుకు లేదు?</h4>
          <p>జావా తయారు చేసిన జేమ్స్ గోస్లింగ్ ఏమనుకున్నాడంటే, "ఆపరేటర్ ఓవర్‌లోడింగ్ వాడితే కోడ్ చూడటానికి సింపుల్ గా అనిపిస్తుంది కానీ, బ్యాక్ గ్రౌండ్ లో ఏ భారీ ఫంక్షన్ రన్ అవుతుందో డెవలపర్ కి తెలీక కన్ఫ్యూజ్ అవుతాడు" అని దాన్ని తీసేసాడు. జావాలో మీరు <code>p1.add(p2)</code> అని మ్యాన్యువల్ గా ఫంక్షన్స్ రాయాల్సిందే. కానీ C++, C# మరియు పైథాన్ లో ఈ ఓవర్‌లోడింగ్ ఫీచర్ ఉంది.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 12, "Phase 12", "Operator Overloading", subtopics, contentBody, '11-cpp-inheritance-virtual-functions-and-runtime-polymorphism.html', '11. Inheritance & Virtual Functions', '13-cpp-templates-function-class-specialization-and-concepts.html', '13. Templates & Concepts');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 13. Templates, Specialization, Variadic & Concepts
function buildLesson13() {
  const title = "Templates & Generic Programming (తెలుగులో)";
  const desc = "C++ లో Templates అంటే ఏమిటి? ఒకే లాజిక్ ని అన్ని డేటా టైప్స్ కి వాడే Generic Programming ఎలా రాస్తారు? C++20 లో వచ్చిన Concepts అంటే ఏంటో డీప్ గా తెలుసుకుందాం.";
  const filename = "13-cpp-templates-function-class-specialization-and-concepts.html";
  const subtopics = "Function Templates · Class Templates · Generic Programming · Template Specialization · Concepts (C++20)";

  const contentBody = `
    <div class="intro-box">
      <p>ఒక ఫంక్షన్ రాసి దాన్ని రకరకాలుగా వాడుకోవచ్చు (Overloading) అని మనం నేర్చుకున్నాం. కానీ అందులో ఒక ప్రాబ్లెమ్ ఉంది. మీరు రెండు ఇంటీజర్స్ (int) కూడటానికి ఒక ఫంక్షన్ రాశారు. రేపు మీకు ఫ్లోట్స్ (float) కూడాలి అనిపించింది, మళ్ళీ ఇంకో ఫంక్షన్ రాయాలి. ఎల్లుండి డబుల్స్ (double) కూడాలి, ఇంకోటి రాయాలి. ఇదంతా ఒకే లాజిక్ (కూడిక) అయినప్పుడు, అన్నిటికీ విడివిడిగా కోడ్ రాయడం టైమ్ వేస్ట్ కాదా? ఈ ప్రాబ్లెమ్ ని రూట్ తో సహా పీకేయడానికి C++ కనిపెట్టిన బ్రహ్మాస్త్రమే <strong>Templates (టెంప్లేట్స్)</strong>. దీన్నే మనం <strong>Generic Programming (జెనెరిక్ ప్రోగ్రామింగ్)</strong> అని అంటాము. అసలు ఈ టెంప్లేట్స్ ఎంత పవర్ ఫుల్ అంటే, మొత్తం C++ STL (Standard Template Library) పుట్టిందే దీని మీద!</p>
    </div>

    <div class="section-title"><span class="num">1</span> Templates (టెంప్లేట్స్) ఎలా పనిచేస్తాయి?</div>
    <div class="section-body">
      <p class="text-prose">
        టెంప్లేట్ అంటే ఒక మౌల్డ్ (అచ్చు లేదా స్వరూపం) లాంటిది. అందులో మీరు లాజిక్ ఒకసారి రాసి పెడతారు, కానీ ఏ డేటా టైప్ వాడాలో చెప్పరు. ఆ డేటా టైప్ ని <code>&lt;T&gt;</code> అనే ఒక స్పెషల్ వేరియబుల్ లాగా పక్కన పెడతారు. మీరు ఎప్పుడైతే ఫంక్షన్ ని కాల్ చేసి దానికి నంబర్ ఇస్తారో... అప్పుడు కంపైలర్ ఆ నంబర్ ని చూసి, బ్యాక్ గ్రౌండ్ లో ఆ <code>&lt;T&gt;</code> ని <code>int</code> కింద మార్చుకుని దానంతట అదే ఒక ఫంక్షన్ ని తయారు చేసుకుంటుంది!
      </p>

      <div class="deep-dive-card">
        <h3>🏭 రియల్ లైఫ్ స్టోరీ: బొమ్మల ఫ్యాక్టరీ లో ఇనుప అచ్చు (Mould)</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          ఒక ఫ్యాక్టరీ లో కారు ఆకారంలో ఉన్న ఒక ఇనుప అచ్చు (Mould) ఉంది అనుకోండి. ఆ అచ్చు ని టెంప్లేట్ (Template) అంటారు.<br><br>
          అందులో మీరు ప్లాస్టిక్ పోస్తే (int పంపిస్తే)... ప్లాస్టిక్ కారు వస్తుంది.<br>
          అందులో మీరు కరిగించిన చాక్లెట్ పోస్తే (double పంపిస్తే)... చాక్లెట్ కారు వస్తుంది.<br>
          అందులో మైనం పోస్తే (string పంపిస్తే)... మైనపు కారు వస్తుంది.<br><br>
          షేప్ (లాజిక్) ఒకటే... కానీ మీరు పోసే మెటీరియల్ (డేటా టైప్) ని బట్టి ఫైనల్ ప్రోడక్ట్ మారిపోతుంది. ప్రోగ్రామింగ్ లో కూడా మీరు లాజిక్ ఒకసారే రాస్తారు, కంపైలర్ మీరు పంపిన డేటా ని బట్టి రకరకాల ఫంక్షన్స్ ని ఆటోమేటిక్ గా రాసుకుంటుంది. ప్రోగ్రామర్ కి పని చాలా ఈజీ అయిపోతుంది.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Class Templates మరియు Specialization</div>
    <div class="section-body">
      <p class="text-prose">
        కేవలం ఫంక్షన్స్ కి మాత్రమే కాకుండా, మొత్తం ఒక క్లాస్ కి కూడా మనం టెంప్లేట్ రాయొచ్చు. ఉదాహరణకు <code>vector&lt;int&gt;</code> మరియు <code>vector&lt;string&gt;</code> ఇవన్నీ క్లాస్ టెంప్లేట్స్ వల్లే సాధ్యం అయ్యాయి.
      </p>
      <p class="text-prose">
        <strong>Template Specialization:</strong> టెంప్లేట్ అన్నిటికీ ఒకేలా పనిచేస్తుంది కదా. కానీ ఏదైనా ఒక పర్టికులర్ డేటా టైప్ (ఉదాహరణకు <code>char*</code>) వచ్చినప్పుడు మాత్రం వేరే లాజిక్ రన్ అవ్వాలి అనుకుంటే, దానికి మనం ఒక స్పెషల్ టెంప్లేట్ రాసుకోవచ్చు. దీన్నే స్పెషలైజేషన్ అంటారు.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Function Template)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో <code>getMax</code> అనే ఒకటే ఫంక్షన్ ని టెంప్లేట్ వాడి రాసాం. అదే ఫంక్షన్ ఇంటీజర్స్ ని, ఫ్లోట్స్ ని, స్ట్రింగ్స్ ని ఎలా క్యాలిక్యులేట్ చేస్తుందో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++ — Generic Templates</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

// T అనేది డేటా టైప్ (int, float, string ఏదైనా కావొచ్చు)
template &lt;typename T&gt;
T getMax(T a, T b) {
    // రెండిట్లో ఏది పెద్దదైతే అది ఇస్తుంది
    if (a > b) {
        return a;
    } else {
        return b;
    }
}

int main() {
    // 1. ఇంటీజర్స్ (నంబర్స్) పంపుతున్నాం
    int maxInt = getMax(10, 25);
    std::cout << "Max Int: " << maxInt << std::endl;
    
    // 2. డబుల్స్ (పాయింట్ నంబర్స్) పంపుతున్నాం
    double maxDouble = getMax(9.99, 4.55);
    std::cout << "Max Double: " << maxDouble << std::endl;
    
    // 3. క్యారెక్టర్స్ (అక్షరాలు) పంపుతున్నాం (ఆస్కీ కోడ్ బట్టి వస్తుంది)
    char maxChar = getMax('A', 'Z');
    std::cout << "Max Char: " << maxChar << std::endl;
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>template &lt;typename T&gt;</code>: ఇక్కడ T అంటే Type అని అర్థం (మీరు ఏ పేరు అయినా పెట్టుకోవచ్చు). ఇది రాసిన తర్వాత కింద ఉన్న ఫంక్షన్ అంతా T మీద ఆధారపడి ఉంటుంది.</li>
        <li>మనం <code>getMax(10, 25)</code> కాల్ చేసినప్పుడు, కంపైలర్ చూసుకుని "అరె ఇవి int వాల్యూస్ కదా" అని అర్థం చేసుకుని, బ్యాక్ గ్రౌండ్ లో T ప్లేస్ లో int పెట్టి ఒక ఫంక్షన్ క్రియేట్ చేస్తుంది.</li>
        <li>అదే <code>getMax(9.99, 4.55)</code> పిలిచినప్పుడు, డబుల్స్ కి సరిపడే ఇంకొక ఫంక్షన్ ని దానంతట అదే క్రియేట్ చేస్తుంది. ఇదంతా ప్రోగ్రామ్ రన్ అయ్యేటప్పుడు కాదు, కంపైల్ అయ్యేటప్పుడే జరిగిపోతుంది. కాబట్టి స్పీడ్ ఏమాత్రం తగ్గదు. సూపర్ ఫాస్ట్!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: C++20 లో కొత్తగా వచ్చిన "Concepts" అంటే ఏంటి?</h4>
          <p>టెంప్లేట్స్ లో ఉన్న పెద్ద మైనస్ ఏంటంటే, మీరు T లోపలికి ఏ చెత్త పంపినా అది తీసుకుంటుంది, లోపల లాజిక్ ఫెయిల్ అయ్యి భయంకరమైన ఎర్రర్ మెసేజెస్ ఇస్తుంది. దీన్ని ఆపడానికి C++20 లో <strong>Concepts (కాన్సెప్ట్స్)</strong> తెచ్చారు. దీని ద్వారా మీరు T మీద కండిషన్స్ పెట్టొచ్చు (ఉదాహరణకు: <code>template &lt;Integral T&gt;</code> అని రాస్తే, కేవలం నంబర్స్ ని మాత్రమే అలో చేస్తుంది, వేరేవి ఇస్తే సింపుల్ ఎర్రర్ ఇస్తుంది).</p>
        </div>
        <div class="faq-item">
          <h4>Q2: జావా లో ఉండే Generics కి, C++ లో ఉండే Templates కి తేడా ఏంటి?</h4>
          <p>జావా లో జెనెరిక్స్ కేవలం కోడ్ రాసేటప్పుడు మాత్రమే పనిచేస్తాయి (Type Erasure), ప్రోగ్రామ్ రన్ అయ్యేటప్పుడు అన్నీ ఒకే ఆబ్జెక్ట్ కింద మారిపోతాయి. కానీ C++ లో కంపైలర్ ప్రతి ఒక్క డేటా టైప్ కి విడివిడిగా ఒరిజినల్ మెషిన్ కోడ్ (Assembly) జనరేట్ చేస్తుంది. అందుకే C++ టెంప్లేట్స్ చాలా ఫాస్ట్ గా ఉంటాయి, కానీ దానివల్ల ఫైనల్ <code>.exe</code> ఫైల్ సైజ్ కొంచెం పెరుగుతుంది (దీన్నే Code Bloat అంటారు).</p>
        </div>
        <div class="faq-item">
          <h4>Q3: <code>template &lt;class T&gt;</code> కి మరియు <code>template &lt;typename T&gt;</code> కి తేడా ఉందా?</h4>
          <p>పాత C++ వెర్షన్స్ లో <code>class T</code> వాడేవాళ్ళు. కానీ అది చూసి స్టూడెంట్స్ ఇది కేవలం క్లాసెస్ కి మాత్రమే అప్లై అవుతుందేమో అని కన్ఫ్యూజ్ అయ్యేవారు (int కి క్లాస్ ఉండదు కదా). ఆ కన్ఫ్యూజన్ పోగొట్టడానికి తర్వాత <code>typename T</code> ని కూడా అలో చేశారు. ఈ రెండిటి మధ్య 99% ఎలాంటి తేడా లేదు, ఏది వాడినా ఒకటే.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 13, "Phase 13", "Templates & Generic Programming", subtopics, contentBody, '12-cpp-operator-overloading-friend-functions-and-stream-operators.html', '12. Operator Overloading', '14-cpp-stl-containers-vector-map-set-unordered-and-adaptors.html', '14. STL Containers');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 14. STL: vector, map, set, unordered & Container Adaptors
function buildLesson14() {
  const title = "STL Containers: Vector, Map & Set (తెలుగులో)";
  const desc = "C++ లో Standard Template Library (STL) అంటే ఏమిటి? డేటాని స్టోర్ చేయడానికి వాడే Vectors, Maps, Sets ఎలా పనిచేస్తాయి? రియల్ వరల్డ్ ప్రాజెక్ట్స్ లో వీటిని ఎక్కడ వాడాలో డీప్ గా తెలుసుకుందాం.";
  const filename = "14-cpp-stl-containers-vector-map-set-unordered-and-adaptors.html";
  const subtopics = "Standard Template Library (STL) · std::vector · std::set · std::map · Unordered Containers";

  const contentBody = `
    <div class="intro-box">
      <p>ఒక పెద్ద ఇల్లు కట్టేటప్పుడు మీరు ఇటుకలు, సిమెంట్, ఐరన్ స్వయంగా తయారు చేసుకోరు కదా! బయట మార్కెట్ లో రెడీగా దొరికేవి తెచ్చుకుని డైరెక్ట్ గా వాడుకుంటారు. ప్రోగ్రామింగ్ కూడా అంతే. ఒక యాప్ తయారు చేసేటప్పుడు డేటాని స్టోర్ చేయడానికి పదే పదే లింక్డ్ లిస్ట్ (Linked Lists), ట్రీస్ (Trees), క్యూ (Queues) మీరే సొంతంగా కోడ్ రాసుకుంటూ కూర్చుంటే ప్రాజెక్ట్ ఎప్పటికీ అవ్వదు. అందుకే C++ ని తయారు చేసినవాళ్ళు ముందే ఇవన్నీ రాసి మనకోసం ఒక లైబ్రరీ లో పెట్టారు. దాన్నే <strong>Standard Template Library (STL)</strong> అంటారు. ఇందులో ఉండే రెడీమేడ్ బాక్సులనే <strong>Containers (కంటైనర్స్)</strong> అంటారు. C++ లో కాంపిటేటివ్ ప్రోగ్రామింగ్ చేయాలన్నా, పెద్ద సాఫ్ట్‌వేర్ రాయాలన్నా ఈ STL మీద పట్టు ఉండాల్సిందే!</p>
    </div>

    <div class="section-title"><span class="num">1</span> కంటైనర్స్ (Containers) అంటే ఏంటి? వాటి రకాలు</div>
    <div class="section-body">
      <p class="text-prose">
        కంటైనర్ అంటే ఒక పెద్ద బాక్స్. అందులో డేటాని ఎలా అమరుస్తున్నారు అనేదాన్ని బట్టి అవి రకరకాలుగా ఉంటాయి.
      </p>
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><strong>Sequence Containers:</strong> ఇందులో డేటా ఒకదాని పక్కన ఒకటి లైన్ గా ఉంటుంది. (ఉదాహరణ: <code>std::vector</code>, <code>std::deque</code>).</li>
        <li><strong>Associative Containers:</strong> ఇందులో డేటా లైన్ గా కాకుండా, ఒక చెట్టు (Tree) లాగా అమరి ఉంటుంది. దీనివల్ల వెతకడం (Searching) చాలా ఫాస్ట్ అవుతుంది. (ఉదాహరణ: <code>std::set</code>, <code>std::map</code>).</li>
        <li><strong>Unordered Containers:</strong> ఇవి ట్రీస్ లాగా కాకుండా హ్యాష్ టేబుల్స్ (Hash Tables) వాడుతాయి. ఇందులో సెర్చింగ్ కళ్లు మూసి తెరిచే లోపు జరిగిపోతుంది (O(1) టైమ్). (ఉదాహరణ: <code>std::unordered_map</code>).</li>
      </ul>

      <div class="deep-dive-card">
        <h3>📚 రియల్ లైఫ్ స్టోరీ: లైబ్రరీ బుక్స్ మరియు std::map</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          మీరు ఒక పెద్ద లైబ్రరీకి వెళ్లారు. అక్కడ లక్షల పుస్తకాలు ఒక పెద్ద కుప్పగా పోసి ఉన్నాయి అనుకోండి (ఇది మామూలు అర్రే). మీకు కావాల్సిన ఒక బుక్ వెతకడానికి చాలా టైమ్ పడుతుంది కదా.<br><br>
          అదే మీరు ఒక <strong><code>std::map</code></strong> ని వాడారనుకోండి, అది ఒక డిక్షనరీ (Dictionary) లాగా పనిచేస్తుంది. ఒకవైపు బుక్ పేరు (Key), ఇంకోవైపు అది ఏ షెల్ఫ్ లో ఉందో నంబర్ (Value) రాసి ఉంటుంది. మీకు "Harry Potter" బుక్ కావాలంటే డైరెక్ట్ గా మ్యాప్ లోకి వెళ్లి అడిగితే, అది వెంటనే "రాక్ నంబర్ 5" అని సెకనులో చెప్పేస్తుంది. ఈ కీ-వాల్యూ (Key-Value) సిస్టమ్ వల్ల ప్రోగ్రామింగ్ ఎంత ఈజీ అవుతుందో మీరే ఊహించుకోండి.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Set మరియు Unordered_Set కి తేడా ఏంటి?</div>
    <div class="section-body">
      <p class="text-prose">
        <strong><code>std::set</code></strong> లో మీరు ఏ నంబర్స్ ఇచ్చినా (ఉదా: 5, 2, 8, 2), అది డూప్లికేట్స్ ని పీకేసి, వాటిని ఆటోమేటిక్ గా ఒక ఆర్డర్ లో (చిన్న దాని నుండి పెద్ద దానికి - 2, 5, 8) అరేంజ్ చేసి పెట్టుకుంటుంది. లోపల ఇది "Red-Black Tree" వాడుతుంది.
      </p>
      <p class="text-prose">
        <strong><code>std::unordered_set</code></strong> లో కూడా డూప్లికేట్స్ ఉండవు, కానీ ఇవి ఆర్డర్ లో ఉండవు. మీరు ఎలా వేస్తే అలా చెల్లాచెదురుగా పడి ఉంటాయి, కానీ ఇందులో వెతకడం (Search) చాలా ఫాస్ట్ గా ఉంటుంది. లోపల ఇది "Hash Table" వాడుతుంది.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Map & Set Demo)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో <code>map</code> వాడి ఒక ఫోన్ బుక్ (Phonebook) ని ఎలా తయారు చేశామో, డేటాని కీ (Key) తో ఎలా బయటకి తీస్తున్నామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++ — STL Map & Set</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;map&gt;
#include &lt;string&gt;

int main() {
    // 1. Map క్రియేట్ చేస్తున్నాం (పేరు -> ఫోన్ నంబర్)
    std::map&lt;std::string, long long&gt; phoneBook;
    
    // డేటా ఇన్సర్ట్ చేస్తున్నాం
    phoneBook["Ramesh"] = 9876543210;
    phoneBook["Suresh"] = 8765432109;
    phoneBook["Mahesh"] = 7654321098;
    
    // 2. డేటాని వెతకడం (O(log n) టైమ్)
    std::string searchName = "Suresh";
    
    if (phoneBook.find(searchName) != phoneBook.end()) {
        std::cout << searchName << "'s Phone: " << phoneBook[searchName] << std::endl;
    } else {
        std::cout << searchName << " not found!" << std::endl;
    }
    
    // 3. మ్యాప్ లో ఉన్నవన్నీ ప్రింట్ చేద్దాం (ఇవి ఆల్ఫాబెట్ ఆర్డర్ లో వస్తాయి)
    std::cout << "\\nAll Contacts:" << std::endl;
    for (auto item : phoneBook) {
        // item.first అంటే కీ (పేరు), item.second అంటే వాల్యూ (నంబర్)
        std::cout << "- " << item.first << " : " << item.second << std::endl;
    }
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>std::map&lt;std::string, long long&gt;</code>: ఇక్కడ మొదటి వాల్యూ (string) ని కీ (Key) అంటారు. రెండో దాన్ని వాల్యూ (Value) అంటారు.</li>
        <li>మనం <code>phoneBook["Ramesh"] = ...</code> అని డైరెక్ట్ గా బ్రాకెట్స్ వాడి అర్రేస్ లాగానే డేటాని ఇన్సర్ట్ చేయొచ్చు. ఇది చాలా పవర్ ఫుల్.</li>
        <li>మ్యాప్ ఎప్పుడూ లోపల ఒక ట్రీ లాగా ఉంటుంది కాబట్టి, మనం రమేష్, సురేష్, మహేష్ అని ఇన్సర్ట్ చేసినా, అది ప్రింట్ చేసేటప్పుడు ఆల్ఫాబెటికల్ ఆర్డర్ లో (మహేష్, రమేష్, సురేష్) ఆటోమేటిక్ గా మార్చి ఇస్తుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: <code>vector</code> మరియు <code>list</code> కి మెయిన్ డిఫరెన్స్ ఏంటి? ఏది వాడాలి?</h4>
          <p>వెక్టార్ లో డేటా అంతా RAM లో పక్క పక్కనే (Contiguous) ఉంటుంది. కాబట్టి అందులో ఒక వాల్యూ ని వెతకడం గానీ, చదవడం గానీ చాలా ఫాస్ట్ (కాష్ ఫ్రెండ్లీ). కానీ మధ్యలో ఎక్కడైనా ఒక ఐటమ్ ని జొప్పించాలంటే (Insert) చాలా కష్టం, మిగతా ఐటమ్స్ అన్నిటిని పక్కకి జరపాలి. అదే లిస్ట్ లో (Linked List) ఎక్కడ పడితే అక్కడ ఇన్సర్ట్ చేయడం ఈజీ, కానీ వెతకడం చాలా స్లో. 95% సిచువేషన్స్ లో <code>vector</code> వాడటమే సేఫ్ అండ్ ఫాస్ట్.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: <code>map</code> కి <code>unordered_map</code> కి తేడా ఏంటి? ఏది బెటర్?</h4>
          <p>మీకు డేటా ఆర్డర్ లో (A to Z) ఉండాలి అనుకుంటే <code>map</code> వాడాలి (ఇది చెట్లు వాడుతుంది). అదే మీకు ఆర్డర్ తో పన్లేదు, నాకు ఎంత పెద్ద డేటా అయినా మిల్లీ సెకన్లలో ఫాస్ట్ గా దొరకాలి అనుకుంటే <code>unordered_map</code> వాడాలి (ఇది హాష్ టేబుల్స్ వాడుతుంది). ఫాస్ట్ గా సెర్చ్ చేయడానికి ఎప్పుడూ <code>unordered_map</code> బెస్ట్.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: Container Adaptors అంటే ఏంటి? (Stack, Queue)</h4>
          <p>ఇవి డైరెక్ట్ గా కొత్త కంటైనర్స్ కావు. ముందే ఉన్న <code>vector</code> లేదా <code>deque</code> లాంటి వాటికి, కొన్ని రూల్స్ పెట్టి ఒక కొత్త ఫీచర్ లాగా ఇస్తారు. ఉదాహరణకు <code>std::stack</code> తీసుకుంటే, అందులో ఒక వైపు నుండే డేటా వేయాలి, అక్కడి నుండే తీయాలి (LIFO - Last In First Out). ఒక గొట్టం (Tube) లాంటి రూల్ పెడతారు. దాన్ని అడాప్టర్ అంటారు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 14, "Phase 14", "STL Containers", subtopics, contentBody, '13-cpp-templates-function-class-specialization-and-concepts.html', '13. Templates & Concepts', '15-cpp-iterators-algorithms-sort-find-transform-and-stl.html', '15. Iterators & Algorithms');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 15. Iterators, sort, find, transform & STL Algorithms
function buildLesson15() {
  const title = "Iterators & STL Algorithms (తెలుగులో)";
  const desc = "C++ STL లో Iterators (ఇటరేటర్స్) ఎందుకు అంత ఇంపార్టెంట్? Sort, Find, మరియు Transform లాంటి అద్భుతమైన ఇన్-బిల్ట్ అల్గారిథమ్స్ ని మన ప్రాజెక్ట్స్ లో ఎలా వాడుకోవాలో డీప్ ఎక్స్‌ప్లనేషన్ తో నేర్చుకుందాం.";
  const filename = "15-cpp-iterators-algorithms-sort-find-transform-and-stl.html";
  const subtopics = "Iterators Concept · std::sort · std::find · std::transform · Lambda with STL";

  const contentBody = `
    <div class="intro-box">
      <p>గత పాఠంలో మనం STL కంటైనర్స్ (Containers) వాడి డేటాని ఎలా దాచుకోవాలో చూసాము. కానీ ఆ దాచిన డేటాని ఒక పద్ధతిలో యాక్సెస్ చేయడానికి (లూప్ తిప్పడానికి) మనకు ఒక దారి కావాలి, ఆ దారి చూపించేవే <strong>Iterators (ఇటరేటర్స్)</strong>. అంతే కాకుండా, ఒక లక్ష నంబర్స్ ని షార్ట్ (చిన్న దాని నుండి పెద్ద దానికి అమర్చడం) చేయడానికి మీరు 20 లైన్ల కోడ్ రాయక్కర్లేదు. C++ లో <strong>Algorithms (అల్గారిథమ్స్)</strong> అనే లైబ్రరీ లో మనకు అవసరమైన 100 కి పైగా పవర్ ఫుల్ లాజిక్స్ అన్నీ రెడీమేడ్ గా దొరుకుతాయి. ఇటరేటర్స్ ని, ఈ అల్గారిథమ్స్ ని కలిపి వాడితే మీరు గంటలో రాయాల్సిన కోడ్ ని ఒక్క నిమిషంలో ముగించేయొచ్చు. ఇవన్నీ ఎలా పనిచేస్తాయో డీప్ గా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> అసలు Iterator (ఇటరేటర్) అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="text-prose">
        ఇటరేటర్ అనేది ఒక అడ్వాన్స్డ్ పాయింటర్ లాంటిది. మీరు వెక్టార్ వాడినా, మ్యాప్ వాడినా, లిస్ట్ వాడినా... వాటన్నింటి లోపల డేటా అరేంజ్ మెంట్ వేరువేరుగా ఉంటుంది. మీరే సొంతంగా లూప్ (for loop) రాసి డేటాని బయటకి తీయాలంటే, ప్రతి కంటైనర్ కి వేరువేరు లాజిక్ రాయాలి. అలా కాకుండా, కంటైనర్ ఏదైనా సరే, మొదటి ఐటమ్ (begin) నుండి చివరి ఐటమ్ (end) వరకు ఎలాంటి ఇబ్బంది లేకుండా ఒక స్మార్ట్ పాయింటర్ లాగా డేటాని చూపించే ఫీచరే ఈ ఇటరేటర్.
      </p>

      <div class="deep-dive-card">
        <h3>🔍 రియల్ లైఫ్ స్టోరీ: ఒక గైడ్ మరియు టూరిస్ట్ బస్సు</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          ఒక మ్యూజియం కి వెళ్లారు అనుకోండి (అదే కంటైనర్). అందులో రకరకాల గదుల్లో రకరకాల వస్తువులు ఉన్నాయి. మీరు స్వయంగా వెతికితే దారి తప్పిపోయే ప్రమాదం ఉంది.<br><br>
          కానీ మీకొక <strong>టూర్ గైడ్ (Iterator)</strong> దొరికాడు అనుకోండి. మీరు అతనికి "నెక్స్ట్ ఐటమ్ చూపించు" (అంటే <code>it++</code>) అని చెప్తే చాలు, అతనే ఆ గదులన్నీ పర్ఫెక్ట్ ఆర్డర్ లో చూపించుకుంటూ తీసుకువెళతాడు. మీరు దారి గురించి టెన్షన్ పడక్కర్లేదు. ఇటరేటర్ కూడా ఇదే చేస్తుంది, కంటైనర్ కాంప్లెక్సిటీ ని దాచేసి, డేటాని సింపుల్ గా యాక్సెస్ చేసేలా చేస్తుంది.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> మ్యాజికల్ STL Algorithms (రెడీమేడ్ కోడ్స్)</div>
    <div class="section-body">
      <p class="text-prose">
        C++ వాళ్ళు <code>#include &lt;algorithm&gt;</code> అనే ఒక గొప్ప లైబ్రరీ ని ఇచ్చారు. ఇందులో మనం రెగ్యులర్ గా వాడే కోడ్స్ అన్నీ సింగిల్ లైన్ లో ఉంటాయి.
      </p>
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><strong><code>std::sort()</code></strong>: అర్రే ని గానీ వెక్టార్ ని గానీ చాలా ఫాస్ట్ గా సార్ట్ (ఆర్డర్) చేస్తుంది. ఇది బ్యాక్ గ్రౌండ్ లో <em>IntroSort</em> అనే అల్గారిథమ్ వాడుతుంది (ప్రపంచంలోనే బెస్ట్ టైమ్ కాంప్లెక్సిటీ O(N log N) ).</li>
        <li><strong><code>std::find()</code></strong>: ఒక పెద్ద వెక్టార్ లో మీకు కావాల్సిన డేటా ఎక్కడుందో వెతికిపెడుతుంది.</li>
        <li><strong><code>std::reverse()</code></strong>: డేటాని మొత్తం ఉల్టా (రివర్స్) చేస్తుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Sort & Iterators)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో కొన్ని జంబుల్ అయిన నంబర్స్ ని <code>sort()</code> వాడి ఎలా ఆర్డర్ లో పెట్టామో, మరియు రివర్స్ ఎలా చేసామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C++ — STL Algorithms</span>
          <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt; // ఇక్కడే సార్ట్ ఫంక్షన్లు ఉంటాయి

int main() {
    // చెల్లాచెదురుగా ఉన్న నంబర్స్ (Vector)
    std::vector&lt;int&gt; nums = {50, 10, 80, 20, 40};
    
    // 1. చిన్న దాని నుండి పెద్ద దానికి సార్ట్ చేయడం
    // begin() మరియు end() అనేవి ఇటరేటర్స్ (గైడ్స్) ని ఇస్తాయి
    std::sort(nums.begin(), nums.end());
    
    std::cout << "Sorted Order (Ascending):" << std::endl;
    for (int n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    // 2. పెద్ద దాని నుండి చిన్న దానికి రివర్స్ చేయడం
    // rbegin() అంటే రివర్స్ బిగిన్ అని అర్థం!
    std::sort(nums.rbegin(), nums.rend());
    
    std::cout << "Sorted Order (Descending):" << std::endl;
    for (int n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>#include &lt;algorithm&gt;</code>: మీరు పైన దీన్ని ఇన్‌క్లూడ్ చేయకపోతే కింద <code>sort()</code> లాంటివి పనిచేయవు.</li>
        <li><code>nums.begin()</code> మరియు <code>nums.end()</code>: ఇవే ఇటరేటర్స్. సార్ట్ ఫంక్షన్ కి మనం "మొదటి పొజిషన్ నుండి చివరి పొజిషన్ దాకా సార్ట్ చెయ్యి" అని దారి చూపిస్తున్నాం అన్నమాట.</li>
        <li><code>nums.rbegin()</code>: ఇది చాలా స్మార్ట్ ఫీచర్ (Reverse Iterator). ఇది వెక్టార్ ని రివర్స్ లో చదువుకుంటూ వెళ్తుంది. కాబట్టి <code>sort()</code> ఫంక్షన్ కి రివర్స్ లో డేటా వెళ్ళి ఆటోమేటిక్ గా డిసెండింగ్ ఆర్డర్ (పెద్ద నుండి చిన్నకి) వస్తుంది. దీనికోసం మళ్ళీ ఇంకో సార్ట్ లాజిక్ రాయక్కర్లేదు!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: నాకు నచ్చిన విధంగా డేటాని సార్ట్ చేయొచ్చా? (Custom Sorting)</h4>
          <p>ఖచ్చితంగా! ఉదాహరణకు మీ దగ్గర స్టూడెంట్స్ ఆబ్జెక్ట్స్ ఉన్నాయి. మీరు మార్కుల బట్టి సార్ట్ చేయాలా లేక పేర్ల బట్టి సార్ట్ చేయాలా అని కంపైలర్ కి తెలీదు. అప్పుడు మీరు <code>std::sort(begin, end, customLogic)</code> లాగా ఒక లాంబ్డా ఫంక్షన్ ని మూడవ ఆర్గ్యుమెంట్ గా పంపొచ్చు. ఆ కస్టమ్ లాజిక్ ని బట్టి కంపైలర్ సార్ట్ చేస్తుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: <code>std::transform</code> అంటే ఏంటి?</h4>
          <p>మీ వెక్టార్ లో 10 నంబర్స్ ఉన్నాయి. వాటన్నిటినీ డబుల్ (x2) చేసి ఇంకో వెక్టార్ లో పెట్టాలి అనుకుంటే, మీరు ఫర్ లూప్ రాసుకుంటూ కూర్చోక్కర్లేదు. డైరెక్ట్ గా <code>std::transform(begin, end, output_begin, డబుల్ చేసే లాజిక్)</code> రాస్తే, ఒక్క సెకనులో అన్ని నంబర్స్ మారిపోయి అవుట్పుట్ లోకి వచ్చేస్తాయి. ఇది మోడరన్ ఫంక్షనల్ ప్రోగ్రామింగ్ కి చాలా ముఖ్యం.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: <code>.end()</code> ఇటరేటర్ కరెక్ట్ గా లాస్ట్ ఐటమ్ ని చూపిస్తుందా?</h4>
          <p>లేదు, ఇది చాలా మంది చేసే తప్పు. <code>.begin()</code> కరెక్ట్ గా మొదటి ఐటమ్ పైనే పాయింట్ చేస్తుంది. కానీ <code>.end()</code> అనేది లాస్ట్ ఐటమ్ తర్వాత ఉన్న ఒక "ఖాళీ జాగా" (Past-the-end) ని చూపిస్తుంది. అందుకే మనం లూప్స్ వాడేటప్పుడు ఎప్పుడూ <code>it != nums.end()</code> అని రాస్తాం (అంటే ఎండ్ కి వచ్చేదాకా ఆగు అని). దాన్ని డైరెక్ట్ గా ప్రింట్ చేయాలని చూస్తే గార్బేజ్ వాల్యూ వస్తుంది.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCppPage(title, desc, filename, 15, "Phase 15", "Iterators & Algorithms", subtopics, contentBody, '14-cpp-stl-containers-vector-map-set-unordered-and-adaptors.html', '14. STL Containers', '16-cpp-lambda-expressions-captures-std-function-and-closures.html', '16. Lambda Expressions');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function run() {
  buildLesson11();
  buildLesson12();
  buildLesson13();
  buildLesson14();
  buildLesson15();
  console.log("✅ Generated C++ Lessons 11 to 15 with EXTREMELY DETAILED MASSIVE Text, Deep Stories, and ONLY ONE short code!");
}
run();
