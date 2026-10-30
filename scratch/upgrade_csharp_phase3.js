const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./csharp_curriculum_data.js');
const { generatePageHtml } = require('./csharp_page_template.js');

const csharpDir = path.join(__dirname, '../public/blog-csharp');

// CHAPTER 09: Methods, Parameters, ref, out, in, params
const ch09Content = `
<div class="intro-box">
  C# అప్లికేషన్లలో కోడ్‌ను చిన్న చిన్న లాజికల్ భాగాలుగా విభజించి, రీయూజబుల్ (reusable) గా మార్చడానికి <strong>Methods (Functions)</strong> అత్యంత ప్రధానమైన స్తంభాలు. C# 12 మరియు .NET 8 లో మెథడ్స్ కేవలం సాధారణ పారామీటర్లనే కాకుండా, మెమరీ పర్ఫార్మెన్స్ కోసం <code>ref</code>, <code>out</code>, <code>in</code>, మరియు వేరియబుల్ ఆర్గ్యుమెంట్స్ కోసం <code>params</code> వంటి శక్తివంతమైన కీవర్డ్స్‌ను అందిస్తాయి. ఈ అధ్యాయంలో మెథడ్స్ నిర్మాణం, పారామీటర్ పాసింగ్ మెకానిజమ్స్ మరియు బెస్ట్ ప్రాక్టీసులను లోతుగా నేర్చుకుందాం.
</div>

<div class="section-title"><span class="num">1</span> మెథడ్ బేసిక్స్ & మోడరన్ ఎక్స్‌ప్రెషన్ బాడీడ్ సింటాక్స్</div>
<div class="section-body">
  <p>C# లో ప్రతి మెథడ్ ఏదో ఒక <code>class</code> లేదా <code>struct</code> లోపల ఉండాలి (Top-Level Statements వాడినప్పుడు కంపైలర్ దాన్ని బ్యాక్‌గ్రౌండ్‌లో Program క్లాస్‌లోకి మారుస్తుంది). ఒక మెథడ్ సిగ్నేచర్‌లో <strong>Access Modifier</strong>, <strong>Return Type</strong>, <strong>Method Name</strong>, మరియు <strong>Parameter List</strong> ఉంటాయి.</p>

  <p>సింగిల్ లైన్ లాజిక్ ఉన్న చిన్న మెథడ్స్ కోసం C# 6+ లో ప్రవేశపెట్టిన <strong>Expression-bodied syntax (<code>=&gt;</code>)</strong> కోడ్‌ను ఎంతో స్పష్టంగా మరియు క్లీన్‌గా ఉంచుతుంది.</p>

  <div class="code-block">
    <div class="code-header">
      <span>MethodDefinition.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Program
{
    // Standard Method Body
    static double CalculateArea(double width, double height)
    {
        return width * height;
    }

    // Modern Expression-bodied Method (C# 6+)
    static double CalculatePerimeter(double w, double h) => 2 * (w + h);

    static void Main()
    {
        double w = 5.0, h = 3.0;
        Console.WriteLine($"Area: {CalculateArea(w, h)}");
        Console.WriteLine($"Perimeter: {CalculatePerimeter(w, h)}");
    }
}</code></pre>
  </div>

  <p><strong>లైన్-బై-లైన్ వివరణ:</strong></p>
  <ul>
    <li><code>static double CalculateArea(...)</code>: <code>static</code> మెథడ్ కాబట్టి క్లాస్ ఆబ్జెక్ట్ లేకుండానే నేరుగా కాల్ చేయవచ్చు. <code>double</code> డేటా టైప్‌ను రిటర్న్ చేస్తుంది.</li>
    <li><code>CalculatePerimeter(double w, double h) =&gt; 2 * (w + h);</code>: ఫ్యాట్ ఆరో సింటాక్స్ వాడటం వల్ల <code>{ return ...; }</code> బాయిలర్‌ప్లేట్ తొలగిపోయి ఒకే లైన్‌లో లాజిక్ ముగిసింది.</li>
  </ul>
</div>

<div class="section-title"><span class="num">2</span> Pass-by-Value vs Reference: ref కీవర్డ్</div>
<div class="section-body">
  <p>C# లో డీఫాల్ట్‌గా అన్ని పారామీటర్లు <strong>Pass-by-Value</strong> పద్ధతిలో పాస్ అవుతాయి. అంటే కాలర్ వేరియబుల్ యొక్క కాపీ (copy) మాత్రమే మెథడ్‌కు అందుతుంది. మెథడ్ లోపల ఆ వేరియబుల్‌ను మార్చినా మెయిన్ మెథడ్‌లోని ఒరిజినల్ వేరియబుల్ మారదు.</p>

  <p>ఒరిజినల్ వేరియబుల్ యొక్క అసలైన మెమరీ లొకేషన్‌నే నేరుగా పంపించాలంటే <strong><code>ref</code></strong> కీవర్డ్ వాడాలి. <code>ref</code> ఉపయోగించేటప్పుడు వేరియబుల్‌కు ముందే ఏదో ఒక వ్యాల్యూ ఇనిషియలైజ్ (initialize) అయి ఉండటం తప్పనిసరి.</p>

  <div class="code-block">
    <div class="code-header">
      <span>RefSwapExample.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Program
{
    static void Swap(ref int a, ref int b)
    {
        int temp = a;
        a = b;
        b = temp;
    }

    static void Main()
    {
        int x = 10, y = 20;
        Console.WriteLine($"Before Swap: x={x}, y={y}");
        
        // Calling with ref keyword
        Swap(ref x, ref y);
        Console.WriteLine($"After Swap:  x={x}, y={y}");
    }
}</code></pre>
  </div>

  <div class="output-block">Before Swap: x=10, y=20
After Swap:  x=20, y=10</div>

  <p><strong>ముఖ్యమైన సూచన:</strong> మెథడ్ డెఫినిషన్‌లోనూ మరియు మెథడ్‌ను కాల్ చేసేటప్పుడు కూడా <code>ref</code> అని స్పష్టంగా రాయాలి. దీనివల్ల ఆ వేరియబుల్ మారబోతోందని కోడ్ చదివే డెవలపర్‌కు ముందే తెలుస్తుంది.</p>
</div>

<div class="section-title"><span class="num">3</span> out కీవర్డ్ & Discards (_)</div>
<div class="section-body">
  <p>ఒక మెథడ్ నుండి ఒకేసారి రెండు లేదా అంతకంటే ఎక్కువ ఫలితాలు (results) రిటర్న్ చేయాల్సి వచ్చినప్పుడు <strong><code>out</code></strong> కీవర్డ్ వాడతారు. <code>ref</code> లాగే ఇది కూడా రిఫరెన్స్ ద్వారా పనిచేస్తుంది, కానీ <strong>రెండు కీలక వ్యత్యాసాలు</strong> ఉన్నాయి:</p>
  <ol>
    <li>కాలర్ వేరియబుల్‌కు ముందే వ్యాల్యూ ఇవ్వాల్సిన అవసరం లేదు.</li>
    <li>మెథడ్ పూర్తయ్యేలోపు ఆ <code>out</code> పారామీటర్‌కు కచ్చితంగా ఏదో ఒక వ్యాల్యూ అసైన్ చేసి తీరాలి (లేకపోతే కంపైలర్ ఎర్రర్ ఇస్తుంది).</li>
  </ol>

  <div class="code-block">
    <div class="code-header">
      <span>OutParameters.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Program
{
    static void CalculateStats(int[] numbers, out int sum, out double average)
    {
        sum = 0;
        foreach (int n in numbers) sum += n;
        average = numbers.Length > 0 ? (double)sum / numbers.Length : 0.0;
    }

    static void Main()
    {
        int[] scores = { 80, 90, 75, 95 };
        
        // Inline out variable declaration (C# 7+)
        CalculateStats(scores, out int totalSum, out double avgScore);
        
        Console.WriteLine($"Total: {totalSum}, Average: {avgScore:F2}");
        
        // Discards (_) if you only need the sum
        CalculateStats(scores, out int onlySum, out _);
        Console.WriteLine($"Only Sum: {onlySum}");
    }
}</code></pre>
  </div>

  <p><strong>C# 7+ Inline Declaration:</strong> పాత C# లో వేరియబుల్‌ను ముందే డిక్లేర్ చేయాల్సి వచ్చేది. ఆధునిక C# లో <code>out int totalSum</code> అని మెథడ్ కాల్ లోపలే నేరుగా డిక్లేర్ చేసుకోవచ్చు. అనవసరమైన రిటర్న్ వ్యాల్యూస్ వద్దనుకుంటే అండర్‌స్కోర్ (<code>out _</code>) డిస్కార్డ్ వాడవచ్చు.</p>
</div>

<div class="section-title"><span class="num">4</span> in కీవర్డ్ (Readonly Reference) & params కీవర్డ్</div>
<div class="section-body">
  <p>హై-పెర్ఫార్మెన్స్ అప్లికేషన్లలో మెమరీ కాపీని నివారించడానికి మరియు వేరియబుల్స్ సంఖ్య మారే సందర్భాల కోసం C# లో ఈ రెండు ప్రత్యేక కీవర్డ్స్ ఉన్నాయి:</p>

  <p><strong>1. <code>in</code> కీవర్డ్:</strong> పెద్ద పరిమాణంలో ఉండే Structs లేదా డేటా స్ట్రక్చర్స్‌ను పాస్ చేసేటప్పుడు మెమరీ కాపీ అవ్వకుండా రిఫరెన్స్ ద్వారా పంపుతుంది. కానీ ఆ మెథడ్ లోపల దాన్ని మార్చడం (modify) నిషిద్ధం (Read-only reference). ఒకవేళ మార్చడానికి ప్రయత్నిస్తే కంపైలర్ ఎర్రర్ వస్తుంది.</p>

  <p><strong>2. <code>params</code> కీవర్డ్:</strong> ఒక మెథడ్‌కు ఎన్ని ఆర్గ్యుమెంట్స్ అయినా పాస్ చేసుకునే వీలు కల్పిస్తుంది. మెథడ్ లోపల అది ఒక అరే (array) గా ట్రీట్ చేయబడుతుంది.</p>

  <div class="code-block">
    <div class="code-header">
      <span>InAndParamsDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Program
{
    // params allows passing variable comma-separated numbers
    static int SumAll(params int[] numbers)
    {
        int total = 0;
        foreach (int n in numbers) total += n;
        return total;
    }

    // in parameter: Read-only reference (avoids struct copying)
    static void PrintCoordinate(in int x, in int y)
    {
        // x = 100; // Compile Error! Cannot modify 'in' variable
        Console.WriteLine($"Point: ({x}, {y})");
    }

    static void Main()
    {
        Console.WriteLine($"Sum (3 args): {SumAll(10, 20, 30)}");
        Console.WriteLine($"Sum (5 args): {SumAll(1, 2, 3, 4, 5)}");
        
        int px = 50, py = 75;
        PrintCoordinate(in px, in py);
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span> Optional & Named Parameters</div>
<div class="section-body">
  <p>మెథడ్ పారామీటర్లకు డీఫాల్ట్ వ్యాల్యూస్ కేటాయిస్తే, కాలర్ ఆ ఆర్గ్యుమెంట్‌ను పాస్ చేయకపోయినా డీఫాల్ట్ వ్యాల్యూ ఉపయోగపడుతుంది. అలాగే <strong>Named Arguments</strong> ద్వారా పారామీటర్లను ఏ క్రమంలోనైనా (order) పేరు పెట్టి పాస్ చేయవచ్చు.</p>

  <div class="code-block">
    <div class="code-header">
      <span>OptionalNamedArgs.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Program
{
    static void SendEmail(string to, string subject = "No Subject", bool isUrgent = false)
    {
        string tag = isUrgent ? "[URGENT] " : "";
        Console.WriteLine($"Sending to: {to} | Subject: {tag}{subject}");
    }

    static void Main()
    {
        // Using defaults
        SendEmail("rajesh@example.com");

        // Named arguments (changing order)
        SendEmail(subject: "Meeting Tomorrow", to: "priya@example.com", isUrgent: true);
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span> బిగినర్ తప్పులు & ఇంటర్వ్యూ FAQ</div>
<div class="section-body">
  <div style="background:#fee2e2; border-left:4px solid #ef4444; padding:14px 18px; border-radius:0 8px 8px 0; margin-bottom:16px;">
    <strong style="color:#b91c1c;">⚠️ ప్రమాదకరమైన తప్పు: out పారామీటర్‌కు వ్యాల్యూ ఇవ్వడం మర్చిపోవడం</strong><br>
    <span style="font-size:13.5px; color:#475569;">ఒక మెథడ్‌లో <code>out</code> పారామీటర్ ఉండి, మెథడ్ రిటర్న్ అయ్యే ప్రతి బ్రాంచ్ (if/else) లో దానికి వ్యాల్యూ అసైన్ చేయకపోతే, C# కంపైలర్ <code>CS0177: The out parameter must be assigned to before control leaves the current method</code> ఎర్రర్‌ను విసురుతుంది.</span>
  </div>

  <h3>తరచుగా అడిగే ప్రశ్నలు (FAQ):</h3>
  <ul>
    <li><strong><code>ref</code> మరియు <code>out</code> మధ్య ప్రాథమిక తేడా ఏమిటి?</strong><br>
    <code>ref</code> పాస్ చేసే ముందు వేరియబుల్‌కు ముందే వ్యాల్యూ ఉండాలి. <code>out</code> పాస్ చేసేటప్పుడు ముందే వ్యాల్యూ ఉండాల్సిన పనిలేదు, కానీ మెథడ్ ముగిసేలోపు కచ్చితంగా వ్యాల్యూ సెట్ చేయాలి.</li>
    <li><strong>Method Overloading అంటే ఏమిటి?</strong><br>
    ఒకే క్లాస్‌లో ఒకే పేరుతో వేర్వేరు పారామీటర్ రకాలు (Types) లేదా సంఖ్య (Count) తో బహుళ మెథడ్స్ నిర్వచించడాన్ని మెథడ్ ఓవర్‌లోడింగ్ అంటారు. రిటర్న్ టైప్ మాత్రమే వేరుగా ఉంటే ఓవర్‌లోడింగ్ కుదరదు.</li>
  </ul>
</div>
`;

// CHAPTER 10: Strings, String Manipulation & StringBuilder
const ch10Content = `
<div class="intro-box">
  సాఫ్ట్‌వేర్ డెవలప్‌మెంట్‌లో టెక్స్ట్ డేటాను నిర్వహించడం అత్యంత సాధారణమైన టాస్క్. C# లో <code>string</code> అనేది Reference Type అయినప్పటికీ, దీనికి <strong>Immutability (మార్చలేని స్వభావం)</strong> ఉంటుంది. భారీ లూపుల్లో స్ట్రింగ్స్ కలిపినప్పుడు మెమరీ ఓవర్‌హెడ్ లేకుండా ఉండటానికి .NET లో <strong><code>StringBuilder</code></strong> ని ఎలా వాడాలో, మోడరన్ C# లో స్ట్రింగ్ ఇంటర్‌పోలేషన్, వెర్బాటిమ్ స్ట్రింగ్స్ మరియు <code>Span&lt;char&gt;</code> పనితీరును ఈ అధ్యాయంలో విశదీకరిస్తాం.
</div>

<div class="section-title"><span class="num">1</span> String Immutability & Heap మెమరీ పనితీరు</div>
<div class="section-body">
  <p>C# లో స్ట్రింగ్ ఆబ్జెక్ట్ ఒకసారి క్రియేట్ అయిన తర్వాత దాని కంటెంట్‌ను మార్చడం అసాధ్యం. మీరు ఏదైనా స్ట్రింగ్ మెథడ్ (ఉదాహరణకు <code>.ToUpper()</code> లేదా <code>str += "!"</code>) వాడినప్పుడు, ఉన్న స్ట్రింగ్ మారదు; బదులుగా మేనేజ్డ్ హీప్ (Heap) పై సరికొత్త స్ట్రింగ్ ఆబ్జెక్ట్ సృష్టించబడుతుంది.</p>

  <p><strong>String Interning Pool:</strong> మెమరీ ఆదా చేయడానికి CLR ఒకే విధమైన లిటరల్ స్ట్రింగ్స్ (ఉదాహరణకు <code>"Hello"</code>) కోసం ఒక ప్రత్యేక ఇంటర్న్ పూల్ నిర్వహిస్తుంది. కోడ్‌లో ఎన్ని చోట్ల <code>"Hello"</code> అని రాసినా అవన్నీ హీప్‌లోని ఒకే మెమరీ అడ్రస్‌ను పాయింట్ చేస్తాయి.</p>

  <div class="code-block">
    <div class="code-header">
      <span>StringImmutability.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Program
{
    static void Main()
    {
        string s1 = "Hyderabad";
        string s2 = s1; // Both point to the same memory
        
        s1 += ", India"; // Creates a brand new string on Heap!
        
        Console.WriteLine($"s1: {s1}"); // "Hyderabad, India"
        Console.WriteLine($"s2: {s2}"); // "Hyderabad" (Unchanged!)
        
        // Checking reference equality
        Console.WriteLine($"Are references equal? {object.ReferenceEquals(s1, s2)}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span> Modern String Interpolation ($), Verbatim (@) & Raw Strings (""")</div>
<div class="section-body">
  <p>C# లో స్ట్రింగ్స్ రాయడానికి మూడు ఆధునిక విధానాలు ఉన్నాయి:</p>
  <ul>
    <li><strong>String Interpolation (<code>$""</code>):</strong> కర్లీ బ్రేసెస్ లోపల వేరియబుల్స్ లేదా ఎక్స్‌ప్రెషన్స్‌ను నేరుగా పొందుపరచవచ్చు. ఫార్మాట్ స్పెసిఫైయర్స్ (ఉదా: <code>{val:C2}</code> కరెన్సీ కోసం, <code>{val:F2}</code> డెసిమల్ కోసం) మద్దతు ఇస్తుంది.</li>
    <li><strong>Verbatim Strings (<code>@""</code>):</strong> ఎస్కేప్ సీక్వెన్సెస్ (ఉదా: <code>\n</code>, <code>\t</code>) ని ఇగ్నోర్ చేస్తుంది. ఫైల్ పాత్‌లు మరియు రెగ్యులర్ ఎక్స్‌ప్రెషన్స్ రాయడానికి అనువైనది.</li>
    <li><strong>Raw String Literals (<code>"""</code> C# 11+):</strong> డబుల్ కోట్స్ మరియు మల్టీ-లైన్ టెక్స్ట్‌లను (ముఖ్యంగా JSON, SQL లేదా HTML) ఎటువంటి ఎస్కేపింగ్ లేకుండా రాయడానికి ఇది ఉత్తమమైన పద్ధతి.</li>
  </ul>

  <div class="code-block">
    <div class="code-header">
      <span>StringFormats.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Program
{
    static void Main()
    {
        string name = "Sita";
        decimal balance = 12500.75m;
        
        // 1. Interpolated String with Formatting
        Console.WriteLine($"Customer: {name}, Balance: {balance:C}");
        
        // 2. Verbatim String (No escaping needed for backslashes)
        string filePath = @"C:\Users\Balaji\Documents\report.pdf";
        Console.WriteLine($"Path: {filePath}");
        
        // 3. Raw String Literal (C# 11+) for Clean JSON
        string json = """
        {
            "id": 101,
            "title": "C# Masterclass",
            "active": true
        }
        """;
        Console.WriteLine(json);
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span> StringBuilder vs String Concatenation: పెర్ఫార్మెన్స్ విశ్లేషణ</div>
<div class="section-body">
  <p>ఒక లూప్ లోపల <code>+=</code> ఆపరేటర్ వాడి వందలాది సార్లు స్ట్రింగ్స్ కలిపితే, ప్రతి ఐటరేషన్‌లోనూ పాత స్ట్రింగ్ కాపీ చేయబడి కొత్త ఆబ్జెక్ట్ సృష్టించబడుతుంది. దీనివల్ల <strong>O(N²) మెమరీ అలొకేషన్స్</strong> జరిగి గార్బేజ్ కలెక్టర్ (GC) పై విపరీతమైన భారం పడుతుంది.</p>

  <p>దీనికి పరిష్కారమే <strong><code>System.Text.StringBuilder</code></strong>. ఇది ఒక మ్యూటబుల్ (మార్చదగిన) ఇంటర్నల్ బఫర్‌ను నిర్వహిస్తుంది. కాబట్టి కొత్త ఆబ్జెక్ట్స్ క్రియేట్ అవ్వకుండా ఉన్న బఫర్‌లోనే క్యారెక్టర్స్ అపెండ్ అవుతాయి.</p>

  <div class="code-block">
    <div class="code-header">
      <span>StringBuilderBenchmark.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;
using System.Text;

class Program
{
    static void Main()
    {
        // Recommended for loops: StringBuilder
        StringBuilder sb = new StringBuilder();
        sb.Append("List of IDs: ");
        
        for (int i = 1; i <= 5; i++)
        {
            sb.Append(i).Append(i < 5 ? ", " : ".");
        }
        
        string result = sb.ToString();
        Console.WriteLine(result);
    }
}</code></pre>
  </div>

  <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:14px; margin-top:12px;">
    <strong>గోల్డెన్ రూల్:</strong> 3-4 స్ట్రింగ్స్ సాధారణంగా కలపడానికి స్ట్రింగ్ ఇంటర్‌పోలేషన్ <code>$"{a} {b}"</code> వాడండి. కానీ లూపుల్లో (లూప్ 5 కంటే ఎక్కువ సార్లు తిరిగితే) ఎల్లప్పుడూ <code>StringBuilder</code> వాడాలి.
  </div>
</div>

<div class="section-title"><span class="num">4</span> నిత్యజీవితంలో వాడే ముఖ్యమైన String మెథడ్స్</div>
<div class="section-body">
  <p>వాస్తవ ప్రాజెక్టులలో డేటా క్లీనింగ్ మరియు పార్సింగ్ కోసం C# అనేక శక్తివంతమైన ఇన్-బిల్ట్ మెథడ్స్ అందిస్తుంది:</p>

  <div class="code-block">
    <div class="code-header">
      <span>StringMethodsDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Program
{
    static void Main()
    {
        string rawInput = "  kiran@gmail.com, suresh@yahoo.com, rani@outlook.com  ";
        
        // 1. Trim: Whitespace తొలగింపు
        string cleaned = rawInput.Trim();
        
        // 2. Split: అరేగా విభజించడం
        string[] emails = cleaned.Split(new string[] { ", " }, StringSplitOptions.RemoveEmptyEntries);
        
        foreach (string email in emails)
        {
            // 3. Case-Insensitive Search
            if (email.Contains("GMAIL", StringComparison.OrdinalIgnoreCase))
            {
                Console.WriteLine($"Found Gmail user: {email.ToUpper()}");
            }
        }

        // 4. Join: అరే ఎలిమెంట్స్ ను ఒకే స్ట్రింగ్ గా కలపడం
        string joined = string.Join(" | ", emails);
        Console.WriteLine($"Joined: {joined}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span> Span&lt;char&gt; & Zero-Allocation టెక్నిక్ అవలోకనం</div>
<div class="section-body">
  <p>.NET Core మరియు .NET 8 ప్రపంచంలో అత్యంత వేగవంతమైన రన్‌టైమ్‌గా నిలవడానికి గల ముఖ్య కారణాలలో <strong><code>ReadOnlySpan&lt;char&gt;</code></strong> ఒకటి. సాధారణంగా <code>str.Substring(0, 5)</code> వాడితే హీప్‌పై కొత్త సబ్‌స్ట్రింగ్ ఆబ్జెక్ట్ ఏర్పడుతుంది. కానీ <code>ReadOnlySpan</code> వాడితే మెమరీని కాపీ చేయకుండా అసలు స్ట్రింగ్‌లోని నిర్దిష్ట క్యారెక్టర్ల భాగానికి కేవలం ఒక విండో (view) ను మాత్రమే అందిస్తుంది (Zero Allocation!).</p>

  <div class="code-block">
    <div class="code-header">
      <span>SpanDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Program
{
    static void Main()
    {
        string dateStr = "2026-10-30";
        
        // Creating spans without allocating memory on Heap
        ReadOnlySpan<char> span = dateStr.AsSpan();
        ReadOnlySpan<char> year = span.Slice(0, 4);
        ReadOnlySpan<char> month = span.Slice(5, 2);
        ReadOnlySpan<char> day = span.Slice(8, 2);
        
        Console.WriteLine($"Year: {year.ToString()}, Month: {month.ToString()}, Day: {day.ToString()}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span> బిగినర్ తప్పులు & ఇంటర్వ్యూ FAQ</div>
<div class="section-body">
  <div style="background:#fee2e2; border-left:4px solid #ef4444; padding:14px 18px; border-radius:0 8px 8px 0; margin-bottom:16px;">
    <strong style="color:#b91c1c;">⚠️ ప్రమాదకరమైన తప్పు: Case Sensitivity మరియు Culture పరిగణించకపోవడం</strong><br>
    <span style="font-size:13.5px; color:#475569;"><code>str1.ToLower() == str2.ToLower()</code> అని రాయడం వల్ల రెండు కొత్త స్ట్రింగ్స్ హీప్‌పై క్రియేట్ అవుతాయి. దానికి బదులుగా ఎల్లప్పుడూ <code>string.Equals(str1, str2, StringComparison.OrdinalIgnoreCase)</code> వాడటం ద్వారా పెర్ఫార్మెన్స్ పెరుగుతుంది మరియు అనవసర మెమరీ వేస్ట్ కాదు.</span>
  </div>

  <h3>తరచుగా అడిగే ప్రశ్నలు (FAQ):</h3>
  <ul>
    <li><strong>String మరియు StringBuilder మధ్య తేడా ఏమిటి?</strong><br>
    String ఇమ్మ్యూటబుల్ (మార్చలేము), ఏదైనా మార్పు చేస్తే కొత్త ఆబ్జెక్ట్ తయారవుతుంది. StringBuilder మ్యూటబుల్, ఇప్పటికే ఉన్న బఫర్‌లోనే క్యారెక్టర్లను మారుస్తుంది.</li>
    <li><strong>String Interning అంటే ఏమిటి?</strong><br>
    ఒకే విధమైన స్ట్రింగ్ లిటరల్స్‌ను CLR ఒక ప్రత్యేక టేబుల్‌లో భద్రపరిచి, మెమరీ ఆదా చేయడానికి అన్ని రిఫరెన్సులకు అదే అడ్రస్‌ను షేర్ చేస్తుంది.</li>
  </ul>
</div>
`;

// CHAPTER 11: Arrays (1D, Multi-Dimensional, Jagged)
const ch11Content = `
<div class="intro-box">
  ఒకే డేటా టైప్‌కు చెందిన బహుళ విలువలను మెమరీలో ఒకే వరుస క్రమంలో నిల్వ చేయడానికి <strong>Arrays (అరేలు)</strong> ప్రాథమిక సాధనాలు. C# లో అరేలు రన్‌టైమ్ ద్వారా నిర్వహించబడే రిఫరెన్స్ టైప్స్ (Reference Types on Heap). C# లో సింగిల్ డైమెన్షనల్ అరేలతో పాటు, టేబుల్స్ కోసం <strong>Multidimensional Arrays (<code>int[,]</code>)</strong> మరియు వేర్వేరు పొడవులు ఉండే <strong>Jagged Arrays (<code>int[][]</code>)</strong> ఉంటాయి. ఈ అధ్యాయంలో వాటి మెమరీ లేఅవుట్, ఇండెక్స్ ఆపరేటర్లు మరియు ఆప్టిమైజేషన్లను పరిశీలిద్దాం.
</div>

<div class="section-title"><span class="num">1</span> Single-Dimensional Arrays (1D) & Zero-based Indexing</div>
<div class="section-body">
  <p>1D అరే అనేది ఫిక్స్‌డ్ సైజ్ కలిగిన వరుస మెమరీ బ్లాక్. అరేలోని మొదటి ఎలిమెంట్ ఇండెక్స్ ఎల్లప్పుడూ <code>0</code> తో మొదలవుతుంది, చివరి ఎలిమెంట్ ఇండెక్స్ <code>Length - 1</code> అవుతుంది.</p>

  <p>C# 8 లో ప్రవేశపెట్టిన <strong>Index from End (<code>^</code>)</strong> మరియు <strong>Range (<code>..</code>)</strong> ఆపరేటర్ల ద్వారా అరే ఎలిమెంట్స్‌ను మరింత సులువుగా యాక్సెస్ చేయవచ్చు. ఉదాహరణకు <code>^1</code> అంటే చివరి ఎలిమెంట్, <code>1..4</code> అంటే సబ్-అరే స్లైస్.</p>

  <div class="code-block">
    <div class="code-header">
      <span>OneDArrayDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Program
{
    static void Main()
    {
        // Array initialization
        int[] scores = { 88, 92, 79, 95, 84 };
        
        Console.WriteLine($"Total Elements: {scores.Length}");
        Console.WriteLine($"First Score: {scores[0]}");
        
        // Modern C# Index from end operator (^)
        Console.WriteLine($"Last Score: {scores[^1]}");
        Console.WriteLine($"Second to Last: {scores[^2]}");
        
        // Range slicing (..)
        int[] topThree = scores[0..3]; // indices 0, 1, 2
        Console.WriteLine($"Top 3 count: {topThree.Length}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span> Rectangular Multidimensional Arrays (int[,])</div>
<div class="section-body">
  <p>గ్రిడ్ లేదా మ్యాట్రిక్స్ రూపంలో ఉండే డేటా (ఉదాహరణకు గేమ్‌లలో చెస్ బోర్డు, లేదా ఇమేజ్ పిక్సెల్స్) నిల్వ చేయడానికి C# లో <strong>Rectangular Multidimensional Array (<code>[,]</code>)</strong> వాడతారు. ఇందులో ప్రతి అడ్డు వరుస (Row) లోనూ కచ్చితంగా సమాన సంఖ్యలో నిలువు వరుసలు (Columns) ఉంటాయి.</p>

  <p>మెమరీలో ఇవి ఒకే నిరంతర (single contiguous) బ్లాక్‌గా స్టోర్ అవుతాయి. రోస్ సంఖ్య తెలుసుకోవడానికి <code>GetLength(0)</code> మరియు కాలమ్స్ సంఖ్య కోసం <code>GetLength(1)</code> వాడాలి.</p>

  <div class="code-block">
    <div class="code-header">
      <span>Matrix2DDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Program
{
    static void Main()
    {
        // 3 Rows, 3 Columns Matrix
        int[,] matrix = {
            { 1, 2, 3 },
            { 4, 5, 6 },
            { 7, 8, 9 }
        };

        int rows = matrix.GetLength(0);
        int cols = matrix.GetLength(1);

        Console.WriteLine($"Matrix Dimension: {rows}x{cols}");
        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                Console.Write($"{matrix[r, c],4} ");
            }
            Console.WriteLine();
        }
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span> Jagged Arrays (int[][]) — అరేల యొక్క అరే (Arrays of Arrays)</div>
<div class="section-body">
  <p>ఒక్కో వరుసలో వేర్వేరు సంఖ్యలో ఎలిమెంట్స్ ఉండాల్సి వచ్చినప్పుడు (ఉదాహరణకు ప్రతి క్లాస్‌లో వేర్వేరు సంఖ్యలో విద్యార్థులు ఉన్నప్పుడు) <strong>Jagged Array (<code>[][]</code>)</strong> వాడతారు. ఇది నిజానికి ఇతర అరేలకు పాయింట్ చేసే రిఫరెన్స్‌ల అరే.</p>

  <div style="background:var(--bg3); border-left:4px solid #10b981; padding:12px 16px; margin:16px 0; border-radius:0 8px 8px 0;">
    <strong>హై-పెర్ఫార్మెన్స్ ఇన్సైట్:</strong> ఆశ్చర్యకరంగా .NET JIT కంపైలర్ రెక్టాంగ్యులర్ అరేల (<code>[,]</code>) కంటే జాగెడ్ అరేల (<code>[][]</code>) పై లూపులను వేగంగా ఎగ్జిక్యూట్ చేస్తుంది. ఎందుకంటే 1D వెక్టార్ బౌండ్స్ చెకింగ్ కోసం CPU ఆర్కిటెక్చర్‌లో ప్రత్యేక ఆప్టిమైజేషన్లు ఉంటాయి.
  </div>

  <div class="code-block">
    <div class="code-header">
      <span>JaggedArrayDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Program
{
    static void Main()
    {
        // Array of 3 arrays
        int[][] jagged = new int[3][];
        
        jagged[0] = new int[] { 10, 20 };
        jagged[1] = new int[] { 30, 40, 50, 60 };
        jagged[2] = new int[] { 70 };

        for (int i = 0; i < jagged.Length; i++)
        {
            Console.Write($"Row {i} (Length {jagged[i].Length}): ");
            for (int j = 0; j < jagged[i].Length; j++)
            {
                Console.Write($"{jagged[i][j]} ");
            }
            Console.WriteLine();
        }
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span> System.Array యుటిలిటీ మెథడ్స్ (Sort, Reverse, IndexOf)</div>
<div class="section-body">
  <p>అరేలపై వేగవంతమైన ఆపరేషన్స్ చేయడానికి .NET లోని స్టాటిక్ క్లాస్ <code>System.Array</code> అత్యుత్తమ మెథడ్స్‌ను కలిగి ఉంది:</p>

  <div class="code-block">
    <div class="code-header">
      <span>ArrayUtilityMethods.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Program
{
    static void Main()
    {
        string[] cities = { "Visakhapatnam", "Hyderabad", "Vijayawada", "Tirupati" };

        // 1. Array.Sort (Ascending order)
        Array.Sort(cities);
        Console.WriteLine($"Sorted: {string.Join(", ", cities)}");

        // 2. Array.Reverse
        Array.Reverse(cities);
        Console.WriteLine($"Reversed: {string.Join(", ", cities)}");

        // 3. Array.IndexOf (Linear search)
        int index = Array.IndexOf(cities, "Hyderabad");
        Console.WriteLine($"Hyderabad found at index: {index}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span> రియల్-వరల్డ్ కేస్ స్టడీ: స్టూడెంట్ గ్రేడ్స్ కాలిక్యులేటర్</div>
<div class="section-body">
  <p>విద్యార్థుల మార్కులను ప్రాసెస్ చేసి సగటు (average) మరియు గరిష్ట స్కోర్ కనుగొనే సంపూర్ణ C# ప్రోగ్రామ్:</p>

  <div class="code-block">
    <div class="code-header">
      <span>StudentGradesApp.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Program
{
    static void Main()
    {
        string[] students = { "Kiran", "Lavanya", "Mahesh" };
        int[] marks = { 85, 94, 78 };

        int highestMark = marks[0];
        string topStudent = students[0];
        int total = 0;

        for (int i = 0; i < marks.Length; i++)
        {
            total += marks[i];
            if (marks[i] > highestMark)
            {
                highestMark = marks[i];
                topStudent = students[i];
            }
        }

        double average = (double)total / marks.Length;
        Console.WriteLine($"Class Average: {average:F2}");
        Console.WriteLine($"Topper: {topStudent} with {highestMark} marks");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span> బిగినర్ తప్పులు & ఇంటర్వ్యూ FAQ</div>
<div class="section-body">
  <div style="background:#fee2e2; border-left:4px solid #ef4444; padding:14px 18px; border-radius:0 8px 8px 0; margin-bottom:16px;">
    <strong style="color:#b91c1c;">⚠️ ప్రమాదకరమైన తప్పు: IndexOutOfRangeException</strong><br>
    <span style="font-size:13.5px; color:#475569;">ఒక అరే సైజు 5 ఉన్నప్పుడు, చెల్లుబాటు అయ్యే ఇండెక్స్‌లు 0 నుండి 4 మాత్రమే. అనుకోకుండా <code>scores[5]</code> అని యాక్సెస్ చేయడానికి ప్రయత్నిస్తే రన్‌టైమ్‌లో అప్లికేషన్ క్రాష్ అవుతుంది. లూపుల్లో ఎల్లప్పుడూ <code>i &lt; array.Length</code> కండిషన్ మాత్రమే వాడాలి.</span>
  </div>

  <h3>తరచుగా అడిగే ప్రశ్నలు (FAQ):</h3>
  <ul>
    <li><strong>Rectangular Array (<code>[,]</code>) మరియు Jagged Array (<code>[][]</code>) ల మధ్య తేడా ఏమిటి?</strong><br>
    రెక్టాంగ్యులర్ అరేలో అన్ని వరుసలు సమాన పొడవును కలిగి ఉంటాయి మరియు సింగిల్ బ్లాక్‌గా కేటాయించబడతాయి. జాగెడ్ అరేలో ఒక్కో వరుస వేర్వేరు పొడవును కలిగి ఉంటుంది మరియు హీప్‌పై స్వతంత్ర అరేలుగా ఉంటాయి.</li>
    <li><strong>C# లో Array సైజును డైనమిక్‌గా పెంచవచ్చా?</strong><br>
    లేదు, C# లో అరేలు ఫిక్స్‌డ్ సైజ్ కలిగి ఉంటాయి. డైనమిక్ సైజు కావాలంటే <code>List&lt;T&gt;</code> కలెక్షన్ వాడాలి.</li>
  </ul>
</div>
`;

// CHAPTER 12: Generic Collections (List<T>, Dictionary<TKey, TValue>, HashSet<T>)
const ch12Content = `
<div class="intro-box">
  ఫిక్స్‌డ్ సైజ్ గల సాధారణ అరేలకు భిన్నంగా, డేటాను డైనమిక్‌గా జోడించడానికి మరియు వేగంగా సెర్చ్ చేయడానికి .NET మనకు <strong>Generic Collections (<code>System.Collections.Generic</code>)</strong> ను అందిస్తుంది. పాత కాలపు నాన్-జెనెరిక్ కలెక్షన్స్ (ఉదా: <code>ArrayList</code>) వల్ల వచ్చే బాక్సింగ్/అన్‌బాక్సింగ్ పర్ఫార్మెన్స్ సమస్యలను తొలగించి, కంపైల్-టైమ్ టైప్ సేఫ్టీని కల్పించడమే జెనెరిక్స్ యొక్క ముఖ్య లక్ష్యం. ఈ అధ్యాయంలో <strong><code>List&lt;T&gt;</code></strong>, <strong><code>Dictionary&lt;TKey, TValue&gt;</code></strong>, మరియు <strong><code>HashSet&lt;T&gt;</code></strong> ల అంతర్గత పనితీరును క్షుణ్ణంగా నేర్చుకుందాం.
</div>

<div class="section-title"><span class="num">1</span> జెనెరిక్స్ ప్రాముఖ్యత: బాక్సింగ్ & అన్‌బాక్సింగ్ నివారణ</div>
<div class="section-body">
  <p>C# 1.0 లో ఉన్న <code>ArrayList</code> అన్ని రకాల డేటాను <code>object</code> గా నిల్వ చేసేది. దీనివల్ల రెండు పెద్ద ప్రమాదాలు ఉండేవి:</p>
  <ol>
    <li><strong>Boxing & Unboxing:</strong> విలువైన Value Type (ఉదా: <code>int</code>) ను <code>object</code> గా మార్చినప్పుడు హీప్‌పై అలొకేషన్ జరిగి వేగం పడిపోతుంది.</li>
    <li><strong>Type Safety లోపం:</strong> ఒకే లిస్టులో పూర్ణాంకాలు, స్ట్రింగ్స్ అన్నీ కలిసిపోయి రన్‌టైమ్‌లో <code>InvalidCastException</code> కు కారణమయ్యేవి.</li>
  </ol>

  <p>C# 2.0 లో వచ్చిన <strong>Generics</strong> ఈ సమస్యకు శాశ్వత పరిష్కారం చూపాయి. <code>List&lt;int&gt;</code> అని రాస్తే అది కేవలం ఇంటిజర్లను మాత్రమే అనుమతిస్తుంది. జీరో బాక్సింగ్, మరియు 100% కంపైల్-టైమ్ భద్రత లభిస్తుంది.</p>

  <div class="code-block">
    <div class="code-header">
      <span>GenericsSafety.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Safe, High Performance Generic List
        List<int> numbers = new List<int>();
        numbers.Add(10);
        numbers.Add(20);
        // numbers.Add("Hello"); // Compile Error! Type safe!

        int first = numbers[0]; // No casting or unboxing needed
        Console.WriteLine($"First number: {first}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span> List&lt;T&gt; ఇంటర్నల్ వర్కింగ్ & కెపాసిటీ గ్రోత్</div>
<div class="section-body">
  <p><code>List&lt;T&gt;</code> వెనుక బ్యాక్‌గ్రౌండ్‌లో ఒక సాధారణ అరే పనిచేస్తుంది. దీనికి <strong>Count</strong> (ప్రస్తుతం ఉన్న ఎలిమెంట్స్ సంఖ్య) మరియు <strong>Capacity</strong> (ఇంటర్నల్ అరే గరిష్ట పరిమాణం) అనే రెండు ప్రాపర్టీలు ఉంటాయి.</p>

  <p>కెపాసిటీ నిండిపోగానే, <code>List&lt;T&gt;</code> ఇంటర్నల్ అరే సైజును రెట్టింపు (4 → 8 → 16 → 32...) చేస్తుంది. మీకు ముందుగానే ఎలిమెంట్స్ సంఖ్య తెలిస్తే, కన్‌స్ట్రక్టర్‌లో కెపాసిటీని నిర్దేశించడం (ఉదా: <code>new List&lt;int&gt;(1000)</code>) ద్వారా రీ-అలొకేషన్లను నివారించవచ్చు.</p>

  <div class="code-block">
    <div class="code-header">
      <span>ListOperations.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<string> skills = new List<string> { "C#", "SQL", ".NET" };
        
        // Adding and inserting
        skills.Add("Docker");
        skills.Insert(1, "Azure"); // Inserts at index 1
        
        // Searching
        bool hasCSharp = skills.Contains("C#");
        Console.WriteLine($"Contains C#? {hasCSharp}");
        
        // Removing
        skills.Remove("SQL");
        
        Console.WriteLine($"Count: {skills.Count}, Capacity: {skills.Capacity}");
        foreach (string skill in skills)
        {
            Console.WriteLine($"- {skill}");
        }
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span> Dictionary&lt;TKey, TValue&gt; & O(1) లుకప్ మెకానిజమ్స్</div>
<div class="section-body">
  <p>కీ-విలువ జంటలుగా (Key-Value Pairs) డేటాను నిల్వ చేయడానికి <strong><code>Dictionary&lt;TKey, TValue&gt;</code></strong> ఉత్తమమైనది. ఇది అంతర్గతంగా హాష్ టేబుల్ (Hash Table) ను ఉపయోగిస్తుంది. దీనివల్ల మిలియన్ల కొద్దీ రికార్డులు ఉన్నప్పటికీ సగటున <strong>O(1) కాన్‌స్టంట్ టైమ్</strong> లో రికార్డును వెతకవచ్చు.</p>

  <p><strong>TryGetValue సేఫ్ పాటర్న్:</strong> కీ లేనప్పుడు ఇండెక్సర్ <code>dict[key]</code> వాడితే <code>KeyNotFoundException</code> వస్తుంది. దీని నివారణకు ఎల్లప్పుడూ <code>TryGetValue</code> వాడాలి.</p>

  <div class="code-block">
    <div class="code-header">
      <span>DictionaryDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Employee ID -> Name mapping
        Dictionary<int, string> employees = new Dictionary<int, string>()
        {
            { 101, "Anil Kumar" },
            { 102, "Sneha Reddy" }
        };

        employees[103] = "Vikas Rao"; // Add or Update

        // Safe Lookup using TryGetValue
        int targetId = 102;
        if (employees.TryGetValue(targetId, out string empName))
        {
            Console.WriteLine($"Found Employee {targetId}: {empName}");
        }
        else
        {
            Console.WriteLine($"Employee {targetId} not found!");
        }
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span> HashSet&lt;T&gt; & హై-స్పీడ్ సెట్ ఆపరేషన్స్</div>
<div class="section-body">
  <p>డూప్లికేట్స్ (నకిలీ విలువలు) ఉండకూడదనుకున్నప్పుడు మరియు ఒక ఎలిమెంట్ కలెక్షన్‌లో ఉందో లేదో క్షణాల్లో కనుగొనడానికి <strong><code>HashSet&lt;T&gt;</code></strong> వాడతారు. ఇది ఇండెక్స్ ఆధారంగా కాకుండా హాష్ ఆధారంగా పనిచేస్తుంది.</p>

  <div class="code-block">
    <div class="code-header">
      <span>HashSetDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        HashSet<int> activeIds = new HashSet<int> { 1001, 1002, 1003 };
        
        bool addedAgain = activeIds.Add(1002); // Duplicate! Returns false
        Console.WriteLine($"Was 1002 added again? {addedAgain}");
        
        // O(1) membership check
        Console.WriteLine($"Contains 1003? {activeIds.Contains(1003)}");
        
        // Set Operations: Union, Intersect
        HashSet<int> teamB = new HashSet<int> { 1003, 1004, 1005 };
        activeIds.IntersectWith(teamB); // Keeps common elements only
        
        Console.WriteLine($"Common IDs count: {activeIds.Count}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span> సరైన కలెక్షన్‌ను ఎంచుకోవడానికి గైడ్ (Cheat Sheet)</div>
<div class="section-body">
  <div style="overflow-x:auto;">
    <table style="width:100%; border-collapse:collapse; margin-top:12px; font-size:13.5px;">
      <thead>
        <tr style="background:var(--bg3); border-bottom:2px solid var(--border);">
          <th style="padding:10px; text-align:left;">Collection Type</th>
          <th style="padding:10px; text-align:left;">Lookup Speed</th>
          <th style="padding:10px; text-align:left;">Duplicates Allowed?</th>
          <th style="padding:10px; text-align:left;">ఉత్తమ వినియోగ సందర్భం</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:10px;"><code>T[]</code> (Array)</td>
          <td style="padding:10px;">O(1) index</td>
          <td style="padding:10px;">Yes</td>
          <td style="padding:10px;">సైజు స్థిరంగా ఉన్నప్పుడు, మెమరీ ఆప్టిమైజేషన్ కోసం</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:10px;"><code>List&lt;T&gt;</code></td>
          <td style="padding:10px;">O(1) index, O(N) value</td>
          <td style="padding:10px;">Yes</td>
          <td style="padding:10px;">డైనమిక్ సైజు, ఆర్డర్ ముఖ్యం అయినప్పుడు సాధారణ లిస్టుల కోసం</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:10px;"><code>Dictionary&lt;K,V&gt;</code></td>
          <td style="padding:10px;">O(1) key</td>
          <td style="padding:10px;">Keys: No, Values: Yes</td>
          <td style="padding:10px;">ఐడీ లేదా పేరు ద్వారా వేగంగా డేటాను ఫెచ్ చేయడానికి</td>
        </tr>
        <tr>
          <td style="padding:10px;"><code>HashSet&lt;T&gt;</code></td>
          <td style="padding:10px;">O(1) value</td>
          <td style="padding:10px;">No</td>
          <td style="padding:10px;">యూనిక్ ఎలిమెంట్స్ భద్రపరచడానికి, డూప్లికేట్స్ ఫిల్టర్ చేయడానికి</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="section-title"><span class="num">6</span> బిగినర్ తప్పులు & ఇంటర్వ్యూ FAQ</div>
<div class="section-body">
  <div style="background:#fee2e2; border-left:4px solid #ef4444; padding:14px 18px; border-radius:0 8px 8px 0; margin-bottom:16px;">
    <strong style="color:#b91c1c;">⚠️ ప్రమాదకరమైన తప్పు: foreach లూప్ తిరుగుతున్నప్పుడు కలెక్షన్‌ను మార్చడం</strong><br>
    <span style="font-size:13.5px; color:#475569;"><code>foreach (var item in list) { list.Remove(item); }</code> అని రాస్తే రన్‌టైమ్‌లో <code>InvalidOperationException: Collection was modified; enumeration operation may not execute</code> ఎర్రర్ వస్తుంది. లూప్ లోపల ఎలిమెంట్స్ తొలగించాలంటే రివర్స్ <code>for</code> లూప్ లేదా <code>list.RemoveAll(...)</code> వాడాలి.</span>
  </div>

  <h3>తరచుగా అడిగే ప్రశ్నలు (FAQ):</h3>
  <ul>
    <li><strong><code>IEnumerable&lt;T&gt;</code> మరియు <code>List&lt;T&gt;</code> మధ్య తేడా ఏమిటి?</strong><br>
    <code>IEnumerable&lt;T&gt;</code> అనేది కేవలం ఫార్వర్డ్-ఓన్లీ రీడ్-ఓన్లీ ఇటరేషన్ కోసం ఇంటర్‌ఫేస్ (Lazy evaluation). <code>List&lt;T&gt;</code> అనేది మెమరీలో స్టోర్ అయి ఉండే పూర్తి కలెక్షన్, ఇందులో యాడ్, రిమూవ్, ఇండెక్సింగ్ చేయవచ్చు.</li>
    <li><strong>Dictionary లో ఒకే కీని మళ్ళీ Add చేస్తే ఏమవుతుంది?</strong><br>
    <code>dict.Add("k", v)</code> వాడితే <code>ArgumentException: An item with the same key has already been added</code> వస్తుంది. అదే <code>dict["k"] = v</code> వాడితే ఉన్న వ్యాల్యూ ఓవర్‌రైట్ అవుతుంది.</li>
  </ul>
</div>
`;

const phase3Updates = [
  { num: 9, content: ch09Content },
  { num: 10, content: ch10Content },
  { num: 11, content: ch11Content },
  { num: 12, content: ch12Content }
];

phase3Updates.forEach(item => {
  const lessonMeta = LESSONS.find(l => l.num === item.num);
  if (!lessonMeta) {
    console.error(`Lesson ${item.num} not found in curriculum data!`);
    return;
  }
  lessonMeta.contentHtml = item.content;
  const fullHtml = generatePageHtml(lessonMeta);
  const targetPath = path.join(csharpDir, lessonMeta.file);
  fs.writeFileSync(targetPath, fullHtml, 'utf8');
  console.log(`✅ Fully enriched C# Phase 3 Lesson ${item.num} : ${lessonMeta.file} (${fullHtml.length} chars)`);
});

