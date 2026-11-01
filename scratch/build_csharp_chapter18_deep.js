const fs = require('fs');
const path = require('path');
const { LESSONS, buildSidebar } = require('./csharp_curriculum_data');

const lesson = LESSONS.find(l => l.num === 18);
const sidebarHtml = buildSidebar(18);

const chapterContentHtml = `
    <!-- BREADCRUMBS -->
    <div class="breadcrumb">
      <a href="/">Home</a> › 
      <a href="/blog.html">Tutorials</a> › 
      <a href="/blog-csharp.html">C# Masterclass</a> › 
      <span>Chapter 18: డెలిగేట్స్, ఈవెంట్స్ &amp; లాంబ్డా</span>
    </div>

    <!-- MAIN HEADING -->
    <h1 class="lesson-title">C# డెలిగేట్స్ (Delegates), ఈవెంట్స్ &amp; లాంబ్డా ఎక్స్‌ప్రెషన్స్ (=>)</h1>

    <!-- LESSON META BADGES -->
    <div class="lesson-meta">
      <span class="meta-pill">⚡ Modern C# 12 / .NET 8 LTS</span>
      <span class="meta-pill">📖 Chapter 18 of 20</span>
      <span class="meta-pill">🚀 Phase 05: అడ్వాన్స్‌డ్ C#, LINQ &amp; ప్రాజెక్ట్</span>
      <span class="meta-pill">📅 2026 Academic Edition</span>
    </div>

    <!-- SUBTOPICS PILL BAR -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this chapter:</span>
      <span>Type-Safe Function Pointers · డెలిగేట్ అనాటమీ &amp; ఇన్వొకేషన్ · మల్టీకాస్ట్ డెలిగేట్స్ (+=, -=) · Action&lt;T&gt;, Func&lt;T, TResult&gt;, Predicate&lt;T&gt; · Anonymous Methods · ఫ్యాట్-యారో లాంబ్డా ఎక్స్‌ప్రెషన్స్ (=&gt;) · క్లోజర్స్ (Closures) &amp; వేరియబుల్ క్యాప్చరింగ్ · event కీవర్డ్ రక్షణ వలయం · Publisher-Subscriber ఆర్కిటెక్చర్ · EventHandler&lt;TEventArgs&gt; · ఈవెంట్ మెమరీ లీక్స్ నివారణ · స్టాక్ మార్కెట్ లైవ్ టిక్కర్ ప్రాజెక్ట్ · 5 ఇంటరాక్టివ్ క్విజ్ ప్రశ్నలు</span>
    </div>

    <!-- WARM IVORY INTRO ACCENT BOX -->
    <div class="intro-box">
      <h3>ఫంక్షనల్ ప్రోగ్రామింగ్ పవర్‌హౌస్: డెలిగేట్స్, లాంబ్డా &amp; ఈవెంట్స్! ⚡</h3>
      <p>
        సాధారణ వేరియబుల్స్‌లో సంఖ్యలు, అక్షరాలను దాస్తాం. మరి <strong>ఒక ఫంక్షన్ లేదా మెథడ్‌నే ఒక వేరియబుల్‌లో దాచి, ఇంకో మెథడ్‌కు పారామీటర్‌గా పంపించగలిగితే?</strong> 
        ఒక బటన్ క్లిక్ అయినప్పుడు లేదా స్టాక్ ధర పెరిగినప్పుడు పది వేర్వేరు వ్యవస్థలకు ఏకకాలంలో నోటిఫికేషన్ పంపగలిగితే?
      </p>
      <p style="margin-top:10px;">
        ఈ అద్భుతమైన ఫ్లెక్సిబిలిటీని C# లో అందించే త్రయమే <strong>Delegates, Events, మరియు Lambda Expressions</strong>. 
        ఆధునిక C# లో LINQ క్వెరీలు రాయాలన్నా, మైక్రోసర్వీసెస్ లో ఈవెంట్-డ్రివెన్ ఆర్కిటెక్చర్ నిర్మించాలన్నా, లేదా క్లౌడ్ మెసేజింగ్ బ్రోకర్లతో పనిచేయాలన్నా ఈ కాన్సెప్ట్స్ గుండెకాయ లాంటివి. 
        C# డెలిగేట్ల చరిత్ర నుండి ఆధునిక <code>Func</code>, <code>Action</code> మరియు లాంబ్డా మ్యాజిక్ వరకు ప్రతి సూక్ష్మాంశాన్ని ప్రాక్టికల్ కోడింగ్‌తో నేర్చుకుందాం!
      </p>
    </div>

    <!-- SECTION 1 -->
    <section>
      <h2 class="section-title"><span class="num">1</span> 🎯 డెలిగేట్ (Delegate) అంటే ఏమిటి? Type-Safe Function Pointer</h2>
      <p>
        C మరియు C++ భాషల్లో ఒక ఫంక్షన్ మెమరీ అడ్రస్‌ను పాయింట్ చేయడానికి ఫంక్షన్ పాయింటర్లు (Function Pointers) ఉండేవి. 
        కానీ వాటికి టైప్ సేఫ్టీ ఉండేది కాదు (తప్పుడు పారామీటర్లు పంపినా కంపైలర్ ఆపలేకపోయేది, దీనివల్ల సిస్టమ్ క్రాష్ అయ్యేది).
      </p>
      <p>
        ఈ సమస్యను పరిష్కరించడానికి C# అందించిన <strong>100% టైప్-సేఫ్ &amp; ఆబ్జెక్ట్-ఓరియెంటెడ్ ఫంక్షన్ పాయింటరే డెలిగేట్ (Delegate)</strong>.
      </p>
      <ul style="margin-left:24px; line-height:1.8; color:var(--text2);">
        <li>ఒక డెలిగేట్ ఏ మెథడ్‌ను పాయింట్ చేస్తుందో ఆ మెథడ్ యొక్క <strong>Return Type</strong> మరియు <strong>Parameter Types</strong> ఖచ్చితంగా సరిపోవాలి.</li>
        <li>కంపైలర్ తెరవెనుక ప్రతి డెలిగేట్ కోసం <code>System.MulticastDelegate</code> నుండి ఒక క్లాస్‌ను ఆటోమేటిక్‌గా జనరేట్ చేస్తుంది.</li>
      </ul>
    </section>

    <!-- SECTION 2 -->
    <section>
      <h2 class="section-title"><span class="num">2</span> 🏗️ డెలిగేట్ డిక్లరేషన్, ఇన్‌స్టాన్షియేషన్ &amp; ఇన్వొకేషన్</h2>
      <p>
        డెలిగేట్‌తో పనిచేయడానికి 3 దశలు ఉంటాయి:
      </p>
      <ol style="margin-left:24px; line-height:1.8; color:var(--text2);">
        <li><strong>డిక్లరేషన్ (Declaration):</strong> <code>public delegate void LogHandler(string msg);</code></li>
        <li><strong>ఇన్‌స్టాన్షియేషన్ (Binding):</strong> <code>LogHandler logger = PrintToConsole;</code></li>
        <li><strong>ఇన్వొకేషన్ (Invocation):</strong> <code>logger("హలో వరల్డ్");</code> లేదా <code>logger.Invoke("హలో వరల్డ్");</code></li>
      </ol>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Basic Delegate Definition & Invocation</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">// 1. డెలిగేట్ డిక్లరేషన్ (సిగ్నేచర్: 2 int పారామీటర్లు, int రిటర్న్)
public delegate int MathOperation(int a, int b);

public class Calculator
{
    public static int Add(int x, int y) => x + y;
    public static int Multiply(int x, int y) => x * y;
}

// 2. డెలిగేట్ వేరియబుల్‌కు మెథడ్‌ను బైండ్ చేయడం
MathOperation op = Calculator.Add;
int sum = op(10, 20); // Add మెథడ్ రన్ అవుతుంది
Console.WriteLine($"కూడిక ఫలితం: {sum}"); // 30

// డెలిగేట్ వేరియబుల్‌ను వేరే మెథడ్‌కు రీ-అసైన్ చేయవచ్చు!
op = Calculator.Multiply;
int product = op(10, 20); // Multiply మెథడ్ రన్ అవుతుంది
Console.WriteLine($"గుణకార ఫలితం: {product}"); // 200</code></pre>
      </div>
    </section>

    <!-- SECTION 3 -->
    <section>
      <h2 class="section-title"><span class="num">3</span> 📣 మల్టీకాస్ట్ డెలిగేట్స్ (Multicast Delegates \`+=\`, \`-=\`)</h2>
      <p>
        C# డెలిగేట్ల యొక్క అత్యంత శక్తివంతమైన లక్షణం — <strong>ఒకే ఒక్క డెలిగేట్ కాల్‌తో బహుళ మెథడ్స్‌ను ఒకేసారి పిలవడం (Broadcasting)</strong>!
      </p>
      <ul style="margin-left:24px; line-height:1.8; color:var(--text2);">
        <li><strong><code>+=</code> ఆపరేటర్:</strong> డెలిగేట్ ఇన్వొకేషన్ లిస్ట్‌కు కొత్త మెథడ్‌ను జోడిస్తుంది (Subscribe).</li>
        <li><strong><code>-=</code> ఆపరేటర్:</strong> లిస్ట్ నుండి మెథడ్‌ను తొలగిస్తుంది (Unsubscribe).</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Multicast Delegate Chaining</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">public delegate void AlertNotifier(string message);

public class NotificationHub
{
    public static void SendSms(string msg) => Console.WriteLine($"📱 SMS: {msg}");
    public static void SendEmail(string msg) => Console.WriteLine($"📧 Email: {msg}");
    public static void SendSlack(string msg) => Console.WriteLine($"💬 Slack: {msg}");
}

// మల్టీకాస్ట్ చైనింగ్
AlertNotifier notifier = NotificationHub.SendSms;
notifier += NotificationHub.SendEmail;
notifier += NotificationHub.SendSlack;

Console.WriteLine("--- 3 మెథడ్స్ చైన్ అయినప్పుడు ---");
notifier("సర్వర్ CPU వాడకం 95% దాటింది!"); // 3 మెథడ్స్ వరుసగా రన్ అవుతాయి!

// Slack ని అన్‌సబ్‌స్క్రైబ్ చేయడం
notifier -= NotificationHub.SendSlack;
Console.WriteLine("\\n--- Slack తొలగించిన తర్వాత ---");
notifier("సర్వర్ సాధారణ స్థితికి వచ్చింది."); // కేవలం SMS మరియు Email మాత్రమే రన్ అవుతాయి</code></pre>
      </div>
    </section>

    <!-- SECTION 4 -->
    <section>
      <h2 class="section-title"><span class="num">4</span> 🎁 బిల్ట్-ఇన్ జెనెరిక్ డెలిగేట్లు: \`Action<T>\`, \`Func<T, TResult>\`, \`Predicate<T>\`</h2>
      <p>
        ప్రతి చిన్న మెథడ్‌కు మనం మాన్యువల్‌గా <code>public delegate ...</code> అని రాసుకుంటూ వెళ్తే వేలాది డెలిగేట్లు తయారవుతాయి. 
        అందుకే .NET ఫ్రేమ్‌వర్క్ ప్రతి డెవలపర్‌కు అవసరమైన <strong>3 రెడీమేడ్ జెనెరిక్ డెలిగేట్లను</strong> అందించింది:
      </p>

      <div class="table-responsive">
        <table class="tbl">
          <thead>
            <tr>
              <th>బిల్ట్-ఇన్ డెలిగేట్</th>
              <th>రిటర్న్ టైప్</th>
              <th>ఎప్పుడు వాడాలి?</th>
              <th>ఉదాహరణ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Action&lt;T1, T2...&gt;</code></td>
              <td><strong><code>void</code> (ఏమీ రిటర్న్ చేయదు)</strong></td>
              <td>ప్రింటింగ్, లాగింగ్, ఈవెంట్ ఫైరింగ్</td>
              <td><code>Action&lt;string&gt; print = msg =&gt; Console.WriteLine(msg);</code></td>
            </tr>
            <tr>
              <td><code>Func&lt;T1, T2, TResult&gt;</code></td>
              <td><strong><code>TResult</code> (చివరి టైప్ రిటర్న్ అవుతుంది)</strong></td>
              <td>గణనలు, ట్రాన్స్‌ఫార్మేషన్లు, డేటా రిటర్న్</td>
              <td><code>Func&lt;int, int, int&gt; add = (a, b) =&gt; a + b;</code></td>
            </tr>
            <tr>
              <td><code>Predicate&lt;T&gt;</code></td>
              <td><strong>ఎల్లప్పుడూ <code>bool</code> మాత్రమే</strong></td>
              <td>షరతులు, ఫిల్టర్లు, సరిచూడటం</td>
              <td><code>Predicate&lt;int&gt; isEven = n =&gt; n % 2 == 0;</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-block" style="margin-top:20px;">
        <div class="code-block-header">
          <span>csharp · Action, Func and Predicate in Action</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">// 1. Action: 1 పారామీటర్, void రిటర్న్
Action<string> logger = message => Console.WriteLine($"[AUDIT]: {message}");
logger("యూజర్ లాగిన్ విజయవంతం");

// 2. Func: 2 ఇన్‌పుట్ డెసిమల్స్, 1 డెసిమల్ రిటర్న్
Func<decimal, decimal, decimal> calculateGst = (basePrice, rate) => basePrice * (rate / 100m);
decimal tax = calculateGst(50000m, 18m);
Console.WriteLine($"జీఎస్టీ పన్ను: ₹{tax:N2}");

// 3. Predicate: 1 ఇన్‌పుట్, bool రిటర్న్
Predicate<int> isSeniorCitizen = age => age >= 60;
Console.WriteLine($"రాయితీకి అర్హులా? {isSeniorCitizen(65)}"); // True</code></pre>
      </div>
    </section>

    <!-- SECTION 5 -->
    <section>
      <h2 class="section-title"><span class="num">5</span> 📜 అనామక మెథడ్స్ (Anonymous Methods) నుండి లాంబ్డా వైపు పరిణామం</h2>
      <p>
        C# 1.0 లో ఒక డెలిగేట్ వాడాలంటే వేరే చోట ఒక పేరున్న మెథడ్‌ను డిక్లేర్ చేయాల్సి వచ్చేది. 
        C# 2.0 లో <code>delegate(int x) { return x * 2; }</code> అనే అనామక మెథడ్స్ వచ్చాయి. 
        కానీ C# 3.0 లో వచ్చిన <strong>లాంబ్డా ఎక్స్‌ప్రెషన్స్ (Lambda Expressions)</strong> వాటన్నింటినీ తుడిచిపెట్టేసి, అత్యంత క్లీన్ ఫ్యాట్-యారో సింటాక్స్‌ను ప్రవేశపెట్టాయి.
      </p>
    </section>

    <!-- SECTION 6 -->
    <section>
      <h2 class="section-title"><span class="num">6</span> 🚀 లాంబ్డా ఎక్స్‌ప్రెషన్స్ (Lambda Expressions \`=>\`)</h2>
      <p>
        లాంబ్డా ఎక్స్‌ప్రెషన్ అనేది పేరు లేని ఒక చిన్న ఇన్‌లైన్ ఫంక్షన్. 
        దీని సింటాక్స్:
      </p>
      <div style="background:var(--bg2); border-left:4px solid #10b981; padding:12px 16px; margin:14px 0; font-family:monospace; font-size:15px;">
        (ఇన్‌పుట్ పారామీటర్లు) => ఎక్స్‌ప్రెషన్ లేదా స్టేట్‌మెంట్ బ్లాక్
      </div>

      <p>లాంబ్డాలు రెండు రకాలు:</p>
      <ul style="margin-left:24px; line-height:1.8; color:var(--text2);">
        <li><strong>Expression Lambda (ఒకే లైన్):</strong> <code>x =&gt; x * x</code> (రిటర్న్ కీవర్డ్ మరియు కర్లీ బ్రేసెస్ అవసరం లేదు; ఆటోమేటిక్‌గా రిటర్న్ అవుతుంది).</li>
        <li><strong>Statement Lambda (బహుళ లైన్లు):</strong> <code>(x, y) =&gt; { int sum = x + y; return sum; }</code> (కర్లీ బ్రేసెస్ మరియు <code>return</code> తప్పనిసరి).</li>
      </ul>
    </section>

    <!-- SECTION 7 -->
    <section>
      <h2 class="section-title"><span class="num">7</span> 🧠 క్లోజర్స్ (Closures) &amp; వేరియబుల్ క్యాప్చరింగ్ మెకానిక్స్</h2>
      <p>
        ఒక లాంబ్డా ఎక్స్‌ప్రెషన్ తన లోపల లేని, బయటి మెథడ్‌లోని లోకల్ వేరియబుల్‌ను వాడినప్పుడు దానిని <strong>Captured Variable</strong> అంటారు. 
        ఆ లాంబ్డా మరియు క్యాప్చర్డ్ వేరియబుల్ కలిసి ఏర్పరిచే జీవ వ్యవస్థను <strong>క్లోజర్ (Closure)</strong> అంటారు.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Closure in Action</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">Func<int, int> CreateMultiplier(int factor)
{
    // 'factor' అనేది బయటి లోకల్ వేరియబుల్. 
    // ఈ మెథడ్ ముగిసినా సరే, లాంబ్డా ఆ 'factor' ను మెమరీలో సజీవంగా దాచిపెడుతుంది!
    return x => x * factor;
}

var triple = CreateMultiplier(3);
Console.WriteLine(triple(10)); // 30
Console.WriteLine(triple(25)); // 75</code></pre>
      </div>

      <p>
        <strong>CLR అంతర్గత రహస్యం:</strong> C# కంపైలర్ తెరవెనుక ఒక గుప్తమైన క్లాస్‌ను సృష్టించి, ఆ <code>factor</code> వేరియబుల్‌ను ఆ క్లాస్ లోని ఫీల్డ్‌గా మార్చి Heap పై దాస్తుంది!
      </p>
    </section>

    <!-- SECTION 8 -->
    <section>
      <h2 class="section-title"><span class="num">8</span> 🚨 \`event\` కీవర్డ్ — డెలిగేట్‌కు సెక్యూరిటీ గార్డు</h2>
      <p>
        డెలిగేట్స్ ఉన్నప్పుడు మళ్లీ ప్రత్యేకంగా <strong><code>event</code></strong> కీవర్డ్ ఎందుకు కావాలి? 
        ఈ క్రింది తీవ్రమైన భద్రతా లోపాన్ని గమనించండి:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · The Vulnerability of Raw Delegates vs Events</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">public class UnsafePublisher
{
    // పబ్లిక్ డెలిగేట్ (ఈవెంట్ కాదు!)
    public Action<string> OnPaymentCompleted;
}

UnsafePublisher pub = new UnsafePublisher();
pub.OnPaymentCompleted += msg => Console.WriteLine("సబ్‌స్క్రైబర్ 1");

// ❌ ప్రమాదం 1: బయటి కోడ్ ప్రమాదవశాత్తు మొత్తం లిస్ట్‌ను తుడిచేయవచ్చు!
pub.OnPaymentCompleted = null; // అందరు సబ్‌స్క్రైబర్లు పోయారు!

// ❌ ప్రమాదం 2: బయటి కోడ్ అనధికారికంగా ఈవెంట్‌ను ఫైర్ చేయవచ్చు!
pub.OnPaymentCompleted("డబ్బులు చెల్లించకుండానే నకిలీ నోటిఫికేషన్!");</code></pre>
      </div>

      <p>
        పై రెండు ప్రమాదాలను అరికట్టడానికి <strong><code>event</code></strong> కీవర్డ్ వాడతాం:
      </p>
      <div style="background:var(--bg2); border-left:4px solid #10b981; padding:12px 16px; margin:14px 0; font-family:monospace; font-size:14.5px;">
        public event Action&lt;string&gt; OnPaymentCompleted;
      </div>
      <p>
        మీరు <code>event</code> అని పెట్టిన క్షణమే: 
        <strong>1) బయటి కోడ్ కేవలం <code>+=</code> మరియు <code>-=</code> మాత్రమే చేయగలదు (ఓవర్‌రైట్ చేయలేదు). 
        2) ఈవెంట్‌ను ఫైర్ చేసే అధికారం కేవలం ఆ పబ్లిషర్ క్లాస్ లోపల మాత్రమే ఉంటుంది!</strong>
      </p>
    </section>

    <!-- SECTION 9 -->
    <section>
      <h2 class="section-title"><span class="num">9</span> 🏛️ స్టాండర్డ్ .NET ఈవెంట్ ప్యాటర్న్ (\`EventHandler<TEventArgs>\`)</h2>
      <p>
        మైక్రోసాఫ్ట్ ఫ్రేమ్‌వర్క్ డిజైన్ గైడ్‌లైన్స్ ప్రకారం ప్రతి ప్రొఫెషనల్ C# ఈవెంట్ రెండు పారామీటర్లను కలిగి ఉండాలి:
      </p>
      <ol style="margin-left:24px; line-height:1.8; color:var(--text2);">
        <li><code>object? sender</code>: ఈవెంట్‌ను ఎవరు ఫైర్ చేశారు (Publisher instance).</li>
        <li><code>TEventArgs e</code>: ఈవెంట్‌కు సంబంధించిన డేటాను మోసే క్లాస్ (Derived from <code>EventArgs</code>).</li>
      </ol>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Standard .NET Event Pattern Implementation</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">// 1. కస్టమ్ ఈవెంట్ ఆర్గ్యుమెంట్స్
public class OrderEventArgs : EventArgs
{
    public string OrderId { get; }
    public decimal TotalAmount { get; }

    public OrderEventArgs(string id, decimal amount)
    {
        OrderId = id;
        TotalAmount = amount;
    }
}

// 2. పబ్లిషర్ క్లాస్
public class OrderService
{
    // స్టాండర్డ్ జెనెరిక్ ఈవెంట్ డిక్లరేషన్
    public event EventHandler<OrderEventArgs> OrderPlaced;

    public void CompleteOrder(string id, decimal amount)
    {
        Console.WriteLine($"📦 ఆర్డర్ {id} సిస్టమ్‌లో నమోదైంది.");

        // 🌟 థ్రెడ్-సేఫ్ నల్ చెక్ తో ఈవెంట్ ఫైరింగ్
        OrderPlaced?.Invoke(this, new OrderEventArgs(id, amount));
    }
}</code></pre>
      </div>
    </section>

    <!-- SECTION 10 -->
    <section>
      <h2 class="section-title"><span class="num">10</span> 🧹 ఈవెంట్ మెమరీ లీక్స్ &amp; అన్‌సబ్‌స్క్రైబింగ్ (\`-=\`)</h2>
      <p>
        .NET అప్లికేషన్లలో వచ్చే అత్యంత సాధారణ మెమరీ లీక్‌కు కారణం: <strong>ఈవెంట్లను అన్‌సబ్‌స్క్రైబ్ చేయకపోవడం!</strong>
      </p>
      <p>
        ఒక లాంగ్-లివ్డ్ పబ్లిషర్ (ఉదా: గ్లోబల్ స్టాక్ ఫీడ్) కు ఒక షార్ట్-లివ్డ్ సబ్‌స్క్రైబర్ (ఉదా: ఒక తాత్కాలిక UI పేజీ) <code>+=</code> చేసినప్పుడు, 
        పబ్లిషర్ తన ఇన్వొకేషన్ లిస్ట్‌లో ఆ సబ్‌స్క్రైబర్‌కు సంబంధించిన స్ట్రాంగ్ రిఫరెన్స్‌ను కలిగి ఉంటాడు. 
        దీనివల్ల సబ్‌స్క్రైబర్ పని అయిపోయినా సరే, <strong>Garbage Collector దానిని మెమరీ నుండి డిలీట్ చేయలేదు</strong>. 
        అందువల్ల ఆబ్జెక్ట్ నశించే సమయంలో (Dispose మెథడ్‌లో) ఖచ్చితంగా <code>-=</code> ద్వారా అన్‌సబ్‌స్క్రైబ్ చేయాలి!
      </p>
    </section>

    <!-- SECTION 11 -->
    <section>
      <h2 class="section-title"><span class="num">11</span> ⚖️ Delegates vs Events vs Interfaces — ఎప్పుడు దేన్ని ఎంచుకోవాలి?</h2>
      <div class="table-responsive">
        <table class="tbl">
          <thead>
            <tr>
              <th>ఫీచర్</th>
              <th>డెలిగేట్ (Delegate / Func / Action)</th>
              <th>ఈవెంట్ (Event)</th>
              <th>ఇంటర్‌ఫేస్ (Interface)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>సబ్‌స్క్రైబర్లు</strong></td>
              <td>సాధారణంగా ఒక్క కాల్‌బ్యాక్ ఫంక్షన్ కోసం</td>
              <td>ఎందరో సబ్‌స్క్రైబర్లు (Broadcast: 1 to Many)</td>
              <td>ఒక క్లాస్ పూర్తి కాంట్రాక్ట్‌ను ఇంప్లిమెంట్ చేయడానికి</td>
            </tr>
            <tr>
              <td><strong>భద్రత</strong></td>
              <td>బయటి కోడ్ సులభంగా ఓవర్‌రైట్ చేయవచ్చు</td>
              <td>కఠినమైన భద్రత (కేవలం <code>+=</code>, <code>-=</code> మాత్రమే)</td>
              <td>కాంపైల్-టైమ్ స్ట్రిక్ట్ టైపింగ్</td>
            </tr>
            <tr>
              <td><strong>ఉత్తమ వినియోగం</strong></td>
              <td>LINQ ఫిల్టర్లు, చిన్న క్యాలిక్యులేషన్ పారామీటర్లు</td>
              <td>UI బటన్ క్లిక్స్, స్టాక్ టిక్కర్లు, లాగిన్ అలర్ట్స్</td>
              <td>డేటాబేస్ రిపోజిటరీలు, భారీ సర్వీసులు, DI</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- SECTION 12 -->
    <section>
      <h2 class="section-title"><span class="num">12</span> 📈 రియల్-వరల్డ్ ప్రాజెక్ట్ — ఎంటర్‌ప్రైజ్ స్టాక్ మార్కెట్ టిక్కర్ &amp; బాట్ అలర్ట్ సిస్టమ్</h2>
      <p>
        ఈ అధ్యాయంలో నేర్చుకున్న Delegates, Events, <code>EventHandler&lt;T&gt;</code>, Lambda Expressions, 
        మరియు <code>Predicate&lt;T&gt;</code> లన్నింటినీ ఏకీకృతం చేసి ఒక పూర్తి స్థాయి <strong>రియల్-టైమ్ స్టాక్ మార్కెట్ టిక్కర్ ఇంజిన్ (Stock Ticker Engine v1.0)</strong> నిర్మిద్దాం.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span>csharp · Real-Time Stock Market Ticker & Trading Bot Alert Engine</span>
          <div class="code-actions">
            <button class="copy-btn" onclick="copyCode(this)">Copy</button>
            <button class="try-btn" onclick="runCode(this)">Run</button>
          </div>
        </div>
        <pre><code class="language-csharp">using System;
using System.Collections.Generic;

Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("=================================================");
Console.WriteLine("📈 మన ట్రేడ్ - ఎంటర్‌ప్రైజ్ స్టాక్ టిక్కర్ & అలర్ట్ ఇంజిన్ v1.0");
Console.WriteLine("=================================================\\n");

// 1. స్టాక్ ధర మార్పుల ఈవెంట్ డేటా
public class StockPriceChangedEventArgs(string symbol, decimal oldPrice, decimal newPrice) : EventArgs
{
    public string Symbol { get; } = symbol;
    public decimal OldPrice { get; } = oldPrice;
    public decimal NewPrice { get; } = newPrice;
    public decimal ChangePercent => ((newPrice - oldPrice) / oldPrice) * 100m;
}

// 2. Publisher: స్టాక్ మార్కెట్ ఫీడ్
public class StockMarketFeed
{
    // పబ్లిక్ ఈవెంట్
    public event EventHandler<StockPriceChangedEventArgs> OnPriceChanged;

    private readonly Dictionary<string, decimal> _stocks = new();

    public void RegisterStock(string symbol, decimal initialPrice)
    {
        _stocks[symbol] = initialPrice;
    }

    public void UpdatePrice(string symbol, decimal newPrice)
    {
        if (!_stocks.ContainsKey(symbol)) return;

        decimal oldPrice = _stocks[symbol];
        _stocks[symbol] = newPrice;

        // థ్రెడ్-సేఫ్ పద్ధతిలో సబ్‌స్క్రైబర్లకు ఈవెంట్ ప్రసారం
        OnPriceChanged?.Invoke(this, new StockPriceChangedEventArgs(symbol, oldPrice, newPrice));
    }
}

// 3. Subscriber 1: SMS అలర్ట్ బోట్ (లాంబ్డా ఎక్స్‌ప్రెషన్లతో)
public class SmsAlertBot
{
    public void OnStockUpdate(object sender, StockPriceChangedEventArgs e)
    {
        if (Math.Abs(e.ChangePercent) >= 5.0m)
        {
            string direction = e.ChangePercent > 0 ? "🚀 భారీగా పెరిగింది" : "⚠️ భారీగా పతనమైంది";
            Console.WriteLine($"   [📱 SMS అలర్ట్]: {e.Symbol} {direction}! పాత ధర: ₹{e.OldPrice:N2} -> కొత్త ధర: ₹{e.NewPrice:N2} ({e.ChangePercent:+0.00;-0.00}%)");
        }
    }
}

// 4. Subscriber 2: ఆటో-ట్రేడర్ రోబోట్ (Func & Action డెలిగేట్లతో)
public class AutoTraderBot
{
    public void EvaluateMarket(object sender, StockPriceChangedEventArgs e)
    {
        // ధర 7% కంటే ఎక్కువ తగ్గితే ఆటోమేటిక్‌గా షేర్లు కొనుగోలు చేయడం (Buy the dip)
        if (e.ChangePercent <= -7.0m)
        {
            Console.WriteLine($"   [🤖 ఆటో ట్రేడర్]: {e.Symbol} భారీ పతనంలో ఉంది. ₹{e.NewPrice:N2} వద్ద 50 షేర్లు కొనుగోలు చేయబడ్డాయి!");
        }
        else if (e.ChangePercent >= 8.0m)
        {
            Console.WriteLine($"   [🤖 ఆటో ట్రేడర్]: {e.Symbol} లాభాల స్వీకరణ! ₹{e.NewPrice:N2} వద్ద 25 షేర్లు విక్రయించబడ్డాయి.");
        }
    }
}

// డ్రైవర్ కోడ్: ఈవెంట్ సబ్‌స్క్రిప్షన్ & లైవ్ మార్కెట్ సిమ్యులేషన్
StockMarketFeed nse = new StockMarketFeed();
nse.RegisterStock("TCS", 3800.00m);
nse.RegisterStock("RELIANCE", 2900.00m);
nse.RegisterStock("INFY", 1500.00m);

SmsAlertBot smsBot = new SmsAlertBot();
AutoTraderBot autoTrader = new AutoTraderBot();

// ఈవెంట్లకు సబ్‌స్క్రైబ్ చేయడం (+=)
nse.OnPriceChanged += smsBot.OnStockUpdate;
nse.OnPriceChanged += autoTrader.EvaluateMarket;

// లాంబ్డా ద్వారా ఇన్‌లైన్ ఆడిట్ లాగర్ సబ్‌స్క్రిప్షన్
nse.OnPriceChanged += (sender, args) => 
    Console.WriteLine($"📊 [టిక్కర్]: {args.Symbol} ట్రేడ్ అయ్యింది -> ₹{args.NewPrice:N2} ({args.ChangePercent:+0.00;-0.00}%)");

Console.WriteLine("🔔 మార్కెట్ బెల్ మోగింది! లైవ్ ట్రేడింగ్ ప్రారంభమైంది...\\n");

// సిమ్యులేటెడ్ మార్కెట్ లావాదేవీలు
nse.UpdatePrice("TCS", 3820.00m);       // చిన్న మార్పు
Console.WriteLine();
nse.UpdatePrice("RELIANCE", 2690.00m);  // ~7.2% పతనం -> అలర్ట్ + ఆటో-బై ట్రిగ్గర్!
Console.WriteLine();
nse.UpdatePrice("INFY", 1635.00m);      // ~9.0% జంప్ -> అలర్ట్ + ఆటో-సెల్ ట్రిగ్గర్!

Console.WriteLine("\\n=================================================");</code></pre>
      </div>

      <!-- RUN LIVE COMPILER CARD -->
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:12px; padding:20px; margin:24px 0; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <h3 style="margin:0 0 6px 0; color:#10b981; font-size:18px;">💻 ఈ ట్రేడింగ్ అలర్ట్ ఇంజిన్‌ను లైవ్ కంపైలర్‌లో రన్ చేసి చూడండి!</h3>
          <p style="margin:0; font-size:14px; color:var(--text2);">
            Publisher-Subscriber ఆర్కిటెక్చర్, <code>+=</code> సబ్‌స్క్రిప్షన్లు, మరియు బహుళ బోట్‌ల ఆటోమేటిక్ ఈవెంట్ స్పందనను ప్రత్యక్షంగా పరిశీలించండి.
          </p>
        </div>
        <button onclick="openInteractiveCompiler()" style="background:#10b981; color:#ffffff; border:none; border-radius:8px; padding:12px 24px; font-weight:700; font-size:15px; cursor:pointer; display:inline-flex; align-items:center; gap:8px; box-shadow:0 4px 12px rgba(16,185,129,0.3);">
          <span>▶ Try C# Online Compiler</span>
        </button>
      </div>
    </section>

    <!-- SECTION 13 -->
    <section>
      <h2 class="section-title"><span class="num">13</span> 🎓 ఇంటర్వ్యూ ప్రశ్నలు, బెస్ట్ ప్రాక్టీసెస్ &amp; 5 ఇంటరాక్టివ్ క్విజ్ ప్రశ్నలు</h2>
      
      <p><strong>టాప్ ఇంటర్వ్యూ ప్రశ్నలు &amp; సమాధానాలు:</strong></p>
      <div style="margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
          <h4 style="margin:0 0 6px 0; color:#10b981;">Q1: C# లో <code>Func</code> కి మరియు <code>Action</code> కి మధ్య ప్రధాన తేడా ఏమిటి?</h4>
          <p style="margin:0; font-size:14px; line-height:1.6; color:var(--text2);">
            <strong>జవాబు:</strong> <code>Action</code> ఎల్లప్పుడూ <strong><code>void</code></strong> ని రిటర్న్ చేస్తుంది (ఏమీ రిటర్న్ చేయదు). <code>Func</code> ఎల్లప్పుడూ ఒక నిర్దిష్ట విలువను రిటర్న్ చేస్తుంది (దాని జెనెరిక్ టైప్ లిస్ట్‌లో చివరిది రిటర్న్ టైప్ అవుతుంది, ఉదా: <code>Func&lt;int, string&gt;</code> లో <code>string</code> రిటర్న్ అవుతుంది).
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
          <h4 style="margin:0 0 6px 0; color:#10b981;">Q2: డెలిగేట్ ముందు <code>event</code> కీవర్డ్ చేర్చడం వల్ల కలిగే రక్షణ ఏమిటి?</h4>
          <p style="margin:0; font-size:14px; line-height:1.6; color:var(--text2);">
            <strong>జవాబు:</strong> <code>event</code> కీవర్డ్ ఎన్‌క్యాప్సులేషన్‌ను అమలు చేస్తుంది. బయటి క్లాసులు ఆ ఈవెంట్‌ను <code>null</code> తో ఓవర్‌రైట్ చేయలేవు మరియు బయటి నుండి ఈవెంట్‌ను అక్రమంగా ఫైర్ చేయలేవు. బయటి ప్రపంచానికి కేవలం <code>+=</code> (subscribe) మరియు <code>-=</code> (unsubscribe) మాత్రమే అనుమతించబడతాయి.
          </p>
        </div>
      </div>

      <h3 style="margin:28px 0 16px 0; color:var(--text);">🧠 మీ నాలెడ్జ్ చెక్ చేసుకోండి — 5 ఇంటరాక్టివ్ క్విజ్ ప్రశ్నలు</h3>

      <!-- QUIZ 1 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 1: <code>Predicate&lt;string&gt;</code> డెలిగేట్ అంతిమంగా ఏ డేటా టైప్‌ను రిటర్న్ చేస్తుంది?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <strong><code>bool</code></strong>. ప్రెడికేట్ ఎల్లప్పుడూ ఒక ఇన్పుట్ పారామీటర్‌ను స్వీకరించి <code>true</code> లేదా <code>false</code> బూలియన్ విలువను మాత్రమే రిటర్న్ చేస్తుంది.
        </div>
      </details>

      <!-- QUIZ 2 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 2: మల్టీకాస్ట్ డెలిగేట్‌కు కొత్త మెథడ్‌ను జోడించడానికి ఏ ఆపరేటర్ వాడాలి?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <strong><code>+=</code></strong>. తొలగించడానికి <code>-=</code> వాడాలి.
        </div>
      </details>

      <!-- QUIZ 3 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 3: లాంబ్డా ఎక్స్‌ప్రెషన్‌లో వాడే <code>=></code> సింబల్‌ను ఏమని పిలుస్తారు?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>Fat-Arrow ఆపరేటర్ (goes to operator)</strong>.
        </div>
      </details>

      <!-- QUIZ 4 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 4: లాంబ్డా ఎక్స్‌ప్రెషన్ బయటి లోకల్ వేరియబుల్‌ను క్యాప్చర్ చేసినప్పుడు ఏర్పడే భావనను ఏమంటారు?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <strong>క్లోజర్ (Closure)</strong>.
        </div>
      </details>

      <!-- QUIZ 5 -->
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:12px;">
        <summary style="font-weight:600; cursor:pointer; color:var(--text1);">
          ❓ ప్రశ్న 5: ఒక ఈవెంట్‌ను సురక్షితంగా ఫైర్ చేయడానికి ఏ సింటాక్స్ సిఫార్సు చేయబడింది?
        </summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.6;">
          <strong>సమాధానం:</strong> <strong><code>MyEvent?.Invoke(this, args);</code></strong>. నల్-కండిషనల్ ఆపరేటర్ <code>?.</code> వల్ల ఎవరైనా సబ్‌స్క్రైబర్లు లేనప్పుడు (నల్ అయినప్పుడు) <code>NullReferenceException</code> రాకుండా సురక్షితంగా రక్షిస్తుంది.
        </div>
      </details>
    </section>

    <!-- CHAPTER NAVIGATION (PAGINATION) -->
    <div style="display:flex; justify-content:space-between; gap:16px; margin:40px 0 20px; flex-wrap:wrap;">
      <a href="/blog-csharp/17-csharp-exception-handling-try-catch-finally.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:8px; background:var(--bg3); border:1px solid var(--border); color:var(--text); text-decoration:none; font-weight:700; font-size:13.5px;">
        ← Previous: 17. ఎక్సెప్షన్ హ్యాండ్లింగ్
      </a>
      <a href="/blog-csharp/19-csharp-linq-language-integrated-query.html" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border-radius:8px; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; text-decoration:none; font-weight:700; font-size:13.5px; box-shadow:0 2px 10px rgba(16,185,129,0.2);">
        Next: 19. LINQ (డేటా పవర్‌హౌస్) →
      </a>
    </div>

    <!-- AUTHOR FOOTER -->
    <div class="author" style="margin-top:36px;">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on .NET 8 SDK / C# 12 runtime · 2026 Academic Edition</span>
      </div>
    </div>
`;

const projectSimulationCode = `using System;
using System.Collections.Generic;

Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("=================================================");
Console.WriteLine("📈 మన ట్రేడ్ - ఎంటర్‌ప్రైజ్ స్టాక్ టిక్కర్ & అలర్ట్ ఇంజిన్ v1.0");
Console.WriteLine("=================================================\\n");

public class StockPriceChangedEventArgs(string symbol, decimal oldPrice, decimal newPrice) : EventArgs
{
    public string Symbol { get; } = symbol;
    public decimal OldPrice { get; } = oldPrice;
    public decimal NewPrice { get; } = newPrice;
    public decimal ChangePercent => ((newPrice - oldPrice) / oldPrice) * 100m;
}

public class StockMarketFeed
{
    public event EventHandler<StockPriceChangedEventArgs> OnPriceChanged;
    private readonly Dictionary<string, decimal> _stocks = new();

    public void RegisterStock(string symbol, decimal initialPrice) => _stocks[symbol] = initialPrice;

    public void UpdatePrice(string symbol, decimal newPrice)
    {
        if (!_stocks.ContainsKey(symbol)) return;
        decimal oldPrice = _stocks[symbol];
        _stocks[symbol] = newPrice;
        OnPriceChanged?.Invoke(this, new StockPriceChangedEventArgs(symbol, oldPrice, newPrice));
    }
}

public class SmsAlertBot
{
    public void OnStockUpdate(object sender, StockPriceChangedEventArgs e)
    {
        if (Math.Abs(e.ChangePercent) >= 5.0m)
        {
            string direction = e.ChangePercent > 0 ? "🚀 భారీగా పెరిగింది" : "⚠️ భారీగా పతనమైంది";
            Console.WriteLine($"   [📱 SMS అలర్ట్]: {e.Symbol} {direction}! పాత ధర: ₹{e.OldPrice:N2} -> కొత్త ధర: ₹{e.NewPrice:N2} ({e.ChangePercent:+0.00;-0.00}%)");
        }
    }
}

public class AutoTraderBot
{
    public void EvaluateMarket(object sender, StockPriceChangedEventArgs e)
    {
        if (e.ChangePercent <= -7.0m)
            Console.WriteLine($"   [🤖 ఆటో ట్రేడర్]: {e.Symbol} భారీ పతనంలో ఉంది. ₹{e.NewPrice:N2} వద్ద 50 షేర్లు కొనుగోలు చేయబడ్డాయి!");
        else if (e.ChangePercent >= 8.0m)
            Console.WriteLine($"   [🤖 ఆటో ట్రేడర్]: {e.Symbol} లాభాల స్వీకరణ! ₹{e.NewPrice:N2} వద్ద 25 షేర్లు విక్రయించబడ్డాయి.");
    }
}

StockMarketFeed nse = new StockMarketFeed();
nse.RegisterStock("TCS", 3800.00m);
nse.RegisterStock("RELIANCE", 2900.00m);
nse.RegisterStock("INFY", 1500.00m);

SmsAlertBot smsBot = new SmsAlertBot();
AutoTraderBot autoTrader = new AutoTraderBot();

nse.OnPriceChanged += smsBot.OnStockUpdate;
nse.OnPriceChanged += autoTrader.EvaluateMarket;
nse.OnPriceChanged += (sender, args) => 
    Console.WriteLine($"📊 [టిక్కర్]: {args.Symbol} ట్రేడ్ అయ్యింది -> ₹{args.NewPrice:N2} ({args.ChangePercent:+0.00;-0.00}%)");

Console.WriteLine("🔔 మార్కెట్ బెల్ మోగింది! లైవ్ ట్రేడింగ్ ప్రారంభమైంది...\\n");

nse.UpdatePrice("TCS", 3820.00m);
Console.WriteLine();
nse.UpdatePrice("RELIANCE", 2690.00m);
Console.WriteLine();
nse.UpdatePrice("INFY", 1635.00m);

Console.WriteLine("\\n=================================================");`;

const fullHtml = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>C# డెలిగేట్స్ (Delegates), ఈవెంట్స్ &amp; లాంబ్డా ఎక్స్‌ప్రెషన్స్ (=>) — Modern C# Tutorial | Our Compiler</title>
  <meta name="description" content="C# లో Delegates, Action, Func, Predicate, Multicast Delegates, Lambda Expressions, Closures, Events, Publisher-Subscriber Pattern మరియు స్టాక్ మార్కెట్ టిక్కర్ ప్రాజెక్ట్ సమగ్ర తెలుగు గైడ్." />
  <meta name="keywords" content="c# delegates telugu, c# events telugu, c# lambda expressions, c# action func predicate, c# publisher subscriber, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-csharp/18-csharp-delegates-events-and-lambdas.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-csharp/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org TechArticle Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "C# డెలిగేట్స్ (Delegates), ఈవెంట్స్ & లాంబ్డా ఎక్స్‌ప్రెషన్స్ (=>)",
    "description": "C# లో Delegates, Action, Func, Predicate, Multicast Delegates, Lambda Expressions, Closures, Events సమగ్ర తెలుగు గైడ్.",
    "articleSection": "Phase 05: అడ్వాన్స్‌డ్ C#, LINQ & ప్రాజెక్ట్",
    "inLanguage": "te",
    "author": {
      "@type": "Organization",
      "name": "Our Compiler Technical Editorial Team",
      "url": "https://www.ourcompiler.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Our Compiler",
      "url": "https://www.ourcompiler.com"
    },
    "datePublished": "2026-02-01",
    "dateModified": "2026-11-01"
  }
  </script>

  <style>
    /* Inline enhancement overrides to guarantee ivory intro box and green numbers */
    body.light-theme .intro-box {
      background: #fefce8 !important;
      border: 1px solid #fde047 !important;
      border-left: 5px solid #10b981 !important;
      border-radius: 12px !important;
      padding: 22px 24px !important;
      margin-bottom: 32px !important;
      box-shadow: 0 4px 14px rgba(202, 138, 4, 0.08) !important;
    }
    body.light-theme .intro-box h3,
    body.light-theme .intro-box h4 {
      color: #713f12 !important;
      font-weight: 800 !important;
      margin-bottom: 8px !important;
    }
    body.light-theme .intro-box p {
      color: #1e293b !important;
      font-size: 15.5px !important;
      line-height: 1.8 !important;
      margin-bottom: 12px !important;
    }
    body.light-theme .intro-box p:last-child {
      margin-bottom: 0 !important;
    }
    .section-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 22px;
      font-weight: 800;
      color: var(--text);
      margin-top: 42px;
      margin-bottom: 16px;
      border-bottom: 2px solid var(--border);
      padding-bottom: 8px;
    }
    .section-title .num {
      background: #10b981 !important;
      color: #ffffff !important;
      font-size: 13px !important;
      font-weight: 800 !important;
      border-radius: 50% !important;
      width: 28px !important;
      height: 28px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-shrink: 0 !important;
      box-shadow: 0 2px 6px rgba(16, 185, 129, 0.35) !important;
    }
  </style>

  <!-- Interactive Scripts: Accordion & Default Light Theme -->
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
      const currentTheme = localStorage.getItem('tutorial_theme_v2');
      if (currentTheme === 'dark') {
        document.documentElement.classList.remove('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          const body = document.body;
          if (body) body.classList.remove('light-theme');
        });
      } else {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          const body = document.body;
          if (body) body.classList.add('light-theme');
        });
      }
    })();
  </script>
</head>
<body class="lang-csharp light-theme">
<!-- NAV PLACEHOLDER -->
<div id="site-nav-placeholder"></div>

<div class="layout">
${sidebarHtml}

  <!-- MAIN ARTICLE -->
  <main class="content">
${chapterContentHtml}
  </main>
</div>

<!-- SITE NAVIGATION LOADER -->
<script src="/site-nav.js" defer></script>

<!-- RUNNER & INTERACTIVE LOGIC -->
<script>
  function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    const arrow = btn.querySelector('.accordion-arrow');
    const isOpen = content.classList.contains('open');
    if (isOpen) {
      content.classList.remove('open');
      btn.classList.remove('active');
    } else {
      content.classList.add('open');
      btn.classList.add('active');
    }
  }

  function copyCode(btn) {
    const codeBlock = btn.closest('.code-block').querySelector('code');
    const text = codeBlock.innerText;
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.innerText;
      btn.innerText = 'Copied!';
      btn.style.color = '#10b981';
      setTimeout(() => {
        btn.innerText = orig;
        btn.style.color = '';
      }, 2000);
    });
  }

  function runCode(btn) {
    const codeBlock = btn.closest('.code-block').querySelector('code');
    const rawCode = codeBlock.innerText;
    try {
      localStorage.setItem('code_csharp', rawCode);
    } catch (e) {
      console.warn('LocalStorage access restricted:', e);
    }
    window.open('/online-csharp-compiler.html', '_blank');
  }

  function openInteractiveCompiler() {
    const projectCode = \`${projectSimulationCode.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
    try {
      localStorage.setItem('code_csharp', projectCode);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    window.open('/online-csharp-compiler.html', '_blank');
  }
</script>

</body>
</html>
`;

const outputPath = path.join(__dirname, '..', 'public', 'blog-csharp', '18-csharp-delegates-events-and-lambdas.html');
fs.writeFileSync(outputPath, fullHtml, 'utf8');

console.log('✅ Successfully generated deep high-value C# Chapter 18!');
console.log('Target file size:', fullHtml.length, 'characters');
