const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./csharp_curriculum_data.js');
const { generatePageHtml } = require('./csharp_page_template.js');

const csharpDir = path.join(__dirname, '../public/blog-csharp');

// CHAPTER 17: Exception Handling (try, catch, finally, when, custom exceptions)
const ch17Content = `
<div class="intro-box">
  సాఫ్ట్‌వేర్ అభివృద్ధిలో బగ్‌లు లేదా ఊహించని పరిస్థితులు (ఉదా: నెట్‌వర్క్ ఫెయిల్యూర్, డేటాబేస్ డౌన్ అవ్వడం, ఫైల్ లేకపోవడం) రావడం సహజం. అటువంటి సందర్భాలలో అప్లికేషన్ అకస్మాత్తుగా క్రాష్ అవ్వకుండా, సమస్యను గౌరవప్రదంగా నియంత్రించే పద్ధతినే <strong>Exception Handling (ఎక్సెప్షన్ హ్యాండ్లింగ్)</strong> అంటారు. C# లో <code>try</code>, <code>catch</code>, <code>finally</code> తో పాటు ఆధునిక C# 6+ లో వచ్చిన శక్తివంతమైన <strong>Exception Filters (<code>when</code>)</strong> మరియు రిసోర్స్ లీక్స్ నివారించే <strong><code>using</code> స్టేట్‌మెంట్</strong> పనితీరును ఈ అధ్యాయంలో సమగ్రంగా నేర్చుకుందాం.
</div>

<div class="section-title"><span class="num">1</span> Runtime Exceptions vs Compile-time Errors: .NET Hierarchy</div>
<div class="section-body">
  <p><strong>Compile-time Errors:</strong> కోడ్ సింటాక్స్ లేదా టైప్ మిస్‌మ్యాచ్ ఉన్నప్పుడు కంపైలరే ప్రోగ్రామ్‌ను రన్ అవ్వకుండా ఆపుతుంది. ఉదాహరణకు సెమీకోలన్ మర్చిపోవడం లేదా తప్పు డేటా టైప్ కేటాయించడం.</p>
  <p><strong>Runtime Exceptions:</strong> ప్రోగ్రామ్ విజయవంతంగా కంపైల్ అయిన తర్వాత, ఎగ్జిక్యూట్ అయ్యే సమయంలో వచ్చే ఊహించని లోపాలు (ఉదాహరణకు 0 తో భాగించడం, లేని ఫైల్‌ను తెరవడానికి ప్రయత్నించడం).</p>

  <p><strong>.NET Exception Hierarchy:</strong> C# లోని అన్ని ఎక్సెప్షన్లు <strong><code>System.Exception</code></strong> అనే బేస్ క్లాస్ నుండి ఉద్భవిస్తాయి. ప్రతి ఎక్సెప్షన్ ఆబ్జెక్ట్‌లో లోపం వివరాలను తెలిపే <code>Message</code>, ఏ లైన్‌లో ఎర్రర్ వచ్చిందో చూపించే <code>StackTrace</code>, మరియు మూల కారణాన్ని తెలిపే <code>InnerException</code> ఉంటాయి.</p>
</div>

<div class="section-title"><span class="num">2</span> try, catch, finally వర్కింగ్ మెకానిజమ్స్</div>
<div class="section-body">
  <p>ఎర్రర్ వచ్చే అవకాశం ఉన్న కోడ్‌ను <strong><code>try</code></strong> బ్లాక్‌లో ఉంచుతాం. ఏదైనా లోపం తలెత్తితే రన్‌టైమ్ వెంటనే దాన్ని గుర్తించి తగిన <strong><code>catch</code></strong> బ్లాక్‌కు పంపుతుంది.</p>

  <p><strong><code>finally</code> బ్లాక్ యొక్క ప్రత్యేకత:</strong> ఎక్సెప్షన్ వచ్చినా రాకపోయినా, ఈవెన్ <code>try</code> బ్లాక్ మధ్యలోనే <code>return</code> స్టేట్‌మెంట్ ఎగ్జిక్యూట్ అయినా సరే <code>finally</code> బ్లాక్ కచ్చితంగా రన్ అవుతుంది! అందువల్ల ఓపెన్ చేసిన ఫైల్స్ లేదా నెట్‌వర్క్ కనెక్షన్లు క్లోజ్ చేయడానికి ఇది అనువైన ప్రదేశం.</p>

  <div class="code-block">
    <div class="code-header">
      <span>TryCatchFinallyDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Application Started...");
        try
        {
            int numerator = 100;
            int denominator = 0; // Triggering DivideByZeroException
            int result = numerator / denominator;
            Console.WriteLine($"Result: {result}");
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine($"[Math Error Handled]: {ex.Message}");
        }
        catch (Exception ex)
        {
            // Generic Fallback Handler
            Console.WriteLine($"[Unexpected Error]: {ex.Message}");
        }
        finally
        {
            Console.WriteLine("Cleanup: Finally block executed safely.");
        }
        Console.WriteLine("Application continues running smoothly!");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span> Modern C# 6+ Exception Filters (when keyword)</div>
<div class="section-body">
  <p>C# 6.0 లో ప్రవేశపెట్టబడిన <strong>Exception Filters (<code>when</code>)</strong> అత్యంత అధునాతనమైన ఫీచర్. సాధారణంగా ఒక ఎక్సెప్షన్‌ను క్యాచ్ చేసిన తర్వాత లోపల <code>if</code> కండిషన్ రాస్తే, అప్పటికే కాల్ స్టాక్ అన్‌వైండ్ (Stack Unwinding) అయిపోతుంది. కానీ <code>when</code> కీవర్డ్ వాడితే, కండిషన్ నిజమైతేనే స్టాక్ అన్‌వైండ్ చేసి ఆ క్యాచ్ బ్లాక్‌లోకి వెళ్తుంది. దీనివల్ల డయాగ్నోస్టిక్స్ మరియు డీబగ్గింగ్ అత్యంత ఖచ్చితంగా జరుగుతాయి.</p>

  <div class="code-block">
    <div class="code-header">
      <span>ExceptionFiltersDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;
using System.IO;

class Program
{
    static void ProcessFile(int errorCode)
    {
        if (errorCode == 404)
            throw new FileNotFoundException("Report file missing on server!");
        else if (errorCode == 403)
            throw new UnauthorizedAccessException("Admin access denied!");
        else
            throw new Exception("General internal error");
    }

    static void Main()
    {
        try
        {
            ProcessFile(404);
        }
        // Specific exception filter with 'when'
        catch (FileNotFoundException ex) when (ex.Message.Contains("missing"))
        {
            Console.WriteLine($"[Logged as Warning]: {ex.Message}");
        }
        catch (UnauthorizedAccessException ex)
        {
            Console.WriteLine($"[Security Alert]: {ex.Message}");
        }
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span> using డిక్లరేషన్ & IDisposable రీసోర్స్ క్లీనప్</div>
<div class="section-body">
  <p>ఫైల్ హ్యాండిల్స్, డేటాబేస్ కనెక్షన్లు లేదా సాకెట్స్ వంటి అన్‌మేనేజ్డ్ రీసోర్సెస్ గార్బేజ్ కలెక్టర్ ద్వారా వెంటనే క్లీన్ కావు. వీటి కోసం .NET <strong><code>IDisposable</code></strong> ఇంటర్‌ఫేస్ మరియు <code>Dispose()</code> మెథడ్‌ను అందిస్తుంది.</p>

  <p>C# లో <strong><code>using</code></strong> స్టేట్‌మెంట్ వాడితే, కంపైలర్ బ్యాక్‌గ్రౌండ్‌లో దాన్ని ఒక <code>try-finally</code> బ్లాక్‌గా మార్చి, చివర్లో ఆటోమేటిక్‌గా <code>Dispose()</code> ని కాల్ చేస్తుంది. C# 8+ లో కర్లీ బ్రేసెస్ అవసరం లేకుండా నేరుగా <code>using var reader = ...;</code> అని రాసే మోడరన్ డిక్లరేషన్ సింటాక్స్ అందుబాటులోకి వచ్చింది.</p>

  <div class="code-block">
    <div class="code-header">
      <span>UsingResourceCleanup.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;
using System.IO;

class Program
{
    static void Main()
    {
        string samplePath = "test_log.txt";
        
        // Modern C# 8+ using declaration (Auto disposes at scope end)
        using (StreamWriter writer = new StreamWriter(samplePath))
        {
            writer.WriteLine("Transaction Log #1029: SUCCESS");
            writer.WriteLine("Timestamp: " + DateTime.UtcNow);
        } // File handle is automatically closed and disposed here!

        // Reading back safely
        using var reader = new StreamReader(samplePath);
        string content = reader.ReadToEnd();
        Console.WriteLine("File Content Read Safely:\n" + content);
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span> Custom Exceptions (కస్టమ్ ఎక్సెప్షన్లు సృష్టించడం)</div>
<div class="section-body">
  <p>మన బిజినెస్ లాజిక్‌కు సంబంధించిన ప్రత్యేకమైన ఎర్రర్లను సూచించడానికి కస్టమ్ ఎక్సెప్షన్ క్లాసులను తయారు చేసుకోవచ్చు. ఇవి ఎల్లప్పుడూ <code>System.Exception</code> క్లాస్ నుండి వారసత్వం పొందాలి.</p>

  <div class="code-block">
    <div class="code-header">
      <span>CustomExceptionDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

// Custom Business Exception
class InsufficientFundsException : Exception
{
    public decimal CurrentBalance { get; }
    public decimal AttemptedAmount { get; }

    public InsufficientFundsException(decimal balance, decimal amount)
        : base($"Transaction failed! Attempted to withdraw {amount:C}, but balance is only {balance:C}.")
    {
        CurrentBalance = balance;
        AttemptedAmount = amount;
    }
}

class BankAccount
{
    private decimal _balance = 1000m;

    public void Withdraw(decimal amount)
    {
        if (amount > _balance)
            throw new InsufficientFundsException(_balance, amount);

        _balance -= amount;
        Console.WriteLine($"Withdrew: {amount:C}, Remaining: {_balance:C}");
    }
}

class Program
{
    static void Main()
    {
        BankAccount account = new BankAccount();
        try
        {
            account.Withdraw(500m);
            account.Withdraw(800m); // Triggers custom exception!
        }
        catch (InsufficientFundsException ex)
        {
            Console.WriteLine($"[ALERT] {ex.Message}");
            Console.WriteLine($"Deficit: {ex.AttemptedAmount - ex.CurrentBalance:C}");
        }
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span> బిగినర్ తప్పులు & ఇంటర్వ్యూ FAQ</div>
<div class="section-body">
  <div style="background:#fee2e2; border-left:4px solid #ef4444; padding:14px 18px; border-radius:0 8px 8px 0; margin-bottom:16px;">
    <strong style="color:#b91c1c;">⚠️ ప్రమాదకరమైన తప్పు: throw ex; vs throw; (స్టాక్ ట్రేస్ పోగొట్టుకోవడం)</strong><br>
    <span style="font-size:13.5px; color:#475569;">క్యాచ్ బ్లాక్‌లో ఎక్సెప్షన్‌ను రీ-త్రో (re-throw) చేసేటప్పుడు <code>throw ex;</code> అని రాస్తే అసలైన ఎర్రర్ ఎక్కడ వచ్చిందో తెలిపే స్టాక్ ట్రేస్ తుడిచిపెట్టుకుపోతుంది. ఎల్లప్పుడూ కేవలం <strong><code>throw;</code></strong> అని మాత్రమే రాయాలి. దీనివల్ల అసలైన కాల్ స్టాక్ సురక్షితంగా పైకి పాస్ అవుతుంది.</span>
  </div>

  <h3>తరచుగా అడిగే ప్రశ్నలు (FAQ):</h3>
  <ul>
    <li><strong>ఎక్సెప్షన్లను Swallow చేయడం అంటే ఏమిటి?</strong><br>
    <code>catch (Exception) { }</code> అని ఏ లాగింగ్ లేకుండా ఖాళీ క్యాచ్ బ్లాక్ రాయడాన్ని "Swallowing an exception" అంటారు. ఇది ప్రొడక్షన్‌లో బగ్‌లను కనుగొనడం అసాధ్యంగా మారుస్తుంది.</li>
    <li><strong><code>using</code> స్టేట్‌మెంట్ ఏ క్లాసులపై మాత్రమే పనిచేస్తుంది?</strong><br>
    <code>System.IDisposable</code> లేదా <code>System.IAsyncDisposable</code> ఇంటర్‌ఫేస్‌ను ఇంప్లిమెంట్ చేసిన ఆబ్జెక్టులపై మాత్రమే <code>using</code> పనిచేస్తుంది.</li>
  </ul>
</div>
`;

// CHAPTER 18: Delegates, Events & Lambda Expressions
const ch18Content = `
<div class="intro-box">
  ఆధునిక C# మరియు .NET ప్రపంచంలో ఈవెంట్-డ్రైవెన్ ఆర్కిటెక్చర్, అసమకాలిక ప్రోగ్రామింగ్ (Async), మరియు ఫంక్షనల్ ప్రోగ్రామింగ్ పద్ధతులకు <strong>Delegates</strong> వెన్నెముక వంటివి. డెలిగేట్ అనేది ఒక మెథడ్‌ను వేరియబుల్ లాగా పారామీటర్‌గా పంపే వీలు కల్పించే <strong>Type-Safe Function Pointer</strong>. దీనితో పాటు .NET లో అత్యంత విస్తృతంగా ఉపయోగించే <strong><code>Func&lt;T&gt;</code></strong>, <strong><code>Action&lt;T&gt;</code></strong>, మోడరన్ <strong>Lambda Expressions (<code>=&gt;</code>)</strong>, మరియు <strong>Events (Publisher-Subscriber)</strong> పనితీరును ఈ అధ్యాయంలో లోతుగా ఆవిష్కరిస్తాం.
</div>

<div class="section-title"><span class="num">1</span> డెలిగేట్స్ అంటే ఏమిటి? Type-Safe Function Pointers</div>
<div class="section-body">
  <p>C మరియు C++ లలో ఫంక్షన్ పాయింటర్లు ఉంటాయి, కానీ వాటికి టైప్ సేఫ్టీ ఉండదు (మెమరీ క్రాష్ అయ్యే ప్రమాదం ఉంటుంది). C# లో <strong>Delegate</strong> అనేది ఆబ్జెక్ట్ ఓరియెంటెడ్ మరియు 100% టైప్-సేఫ్ ఫంక్షన్ పాయింటర్.</p>

  <p>ఒక డెలిగేట్ నిర్దిష్ట రిటర్న్ టైప్ మరియు పారామీటర్ సిగ్నేచర్‌ను కలిగి ఉంటుంది. ఆ సిగ్నేచర్‌తో సరిపోలే ఏ మెథడ్‌నైనా ఆ డెలిగేట్ వేరియబుల్‌కు అసైన్ చేసి కాల్ చేయవచ్చు.</p>

  <div class="code-block">
    <div class="code-header">
      <span>CustomDelegateBasics.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

// 1. Delegate Declaration: accepts string, returns void
delegate void LogDelegate(string message);

class Program
{
    static void ConsoleLogger(string msg) => Console.WriteLine($"[CONSOLE]: {msg}");
    static void AlertLogger(string msg) => Console.WriteLine($"[ALERT ***]: {msg.ToUpper()}");

    static void Main()
    {
        // 2. Delegate Instantiation pointing to a method
        LogDelegate logger = ConsoleLogger;
        logger("Server started on port 5000");

        // 3. Pointing to a different method at runtime
        logger = AlertLogger;
        logger("High CPU load detected!");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span> Multicast Delegates (+, -= ఆపరేటర్లు)</div>
<div class="section-body">
  <p>C# లోని అన్ని డెలిగేట్లు అంతర్గతంగా <code>System.MulticastDelegate</code> క్లాస్ నుండి ఉద్భవిస్తాయి. దీనివల్ల <strong><code>+=</code></strong> ఆపరేటర్ ఉపయోగించి ఒకే డెలిగేట్‌కు బహుళ మెథడ్స్‌ను ఒక ఇన్వోకేషన్ లిస్ట్ (Invocation List) లో చేర్చవచ్చు. డెలిగేట్‌ను కాల్ చేయగానే ఆ లిస్టులోని అన్ని మెథడ్స్ వరుసగా ఎగ్జిక్యూట్ అవుతాయి. అనవసరమైన మెథడ్‌ను తొలగించడానికి <strong><code>-=</code></strong> ఆపరేటర్ వాడతాం.</p>

  <div class="code-block">
    <div class="code-header">
      <span>MulticastDelegateDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

delegate void NotifyUser(string user);

class Program
{
    static void SendEmail(string user) => Console.WriteLine($"Email sent to {user}");
    static void SendSms(string user) => Console.WriteLine($"SMS sent to {user}");

    static void Main()
    {
        NotifyUser notifier = SendEmail;
        notifier += SendSms; // Multicast chaining

        Console.WriteLine("--- Triggering Notifications ---");
        notifier("Ravi Kumar");

        notifier -= SendSms; // Unregistering SMS
        Console.WriteLine("--- After removing SMS ---");
        notifier("Sneha");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span> Built-in Generic Delegates: Action&lt;T&gt;, Func&lt;T&gt;, Predicate&lt;T&gt;</div>
<div class="section-body">
  <p>ప్రతి చిన్న లాజిక్ కోసం కొత్త డెలిగేట్ టైప్‌ను డిక్లేర్ చేయాల్సిన అవసరం లేకుండా, ఆధునిక .NET మూడు ప్రామాణిక జెనెరిక్ డెలిగేట్లను అందిస్తుంది:</p>
  <ul>
    <li><strong><code>Action&lt;T1, T2...&gt;</code>:</strong> ఎటువంటి విలువను రిటర్న్ చేయని (<strong><code>void</code></strong>) మెథడ్స్ కోసం వాడతారు. (0 నుండి 16 పారామీటర్ల వరకు సపోర్ట్ చేస్తుంది).</li>
    <li><strong><code>Func&lt;T1, TResult&gt;</code>:</strong> విలువను రిటర్న్ చేసే మెథడ్స్ కోసం వాడతారు. ఇందులో చివరి టైప్ పారామీటర్ ఎల్లప్పుడూ <strong>Return Type</strong> అవుతుంది.</li>
    <li><strong><code>Predicate&lt;T&gt;</code>:</strong> ఒక ఆబ్జెక్ట్‌ను చెక్ చేసి <strong><code>bool</code></strong> (true/false) రిటర్న్ చేసే కండిషన్స్ కోసం వాడతారు. (నిజానికి ఇది <code>Func&lt;T, bool&gt;</code> తో సమానం).</li>
  </ul>

  <div class="code-block">
    <div class="code-header">
      <span>ActionAndFuncDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Program
{
    static void Main()
    {
        // Action: takes string, returns void
        Action<string> printGreeting = name => Console.WriteLine($"Namaste, {name}!");
        printGreeting("Kiran");

        // Func: takes int and int, returns int (last type)
        Func<int, int, int> multiply = (a, b) => a * b;
        Console.WriteLine($"Product: {multiply(8, 5)}");

        // Predicate: takes int, returns bool
        Predicate<int> isAdult = age => age >= 18;
        Console.WriteLine($"Is 20 an adult? {isAdult(20)}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span> Lambda Expressions (=&gt;) & Anonymous Methods</div>
<div class="section-body">
  <p>C# లో కోడ్‌ను సూక్ష్మీకరించడానికి లాంబ్డా ఎక్స్‌ప్రెషన్స్ (<strong><code>(parameters) =&gt; expression</code></strong>) అత్యంత శక్తివంతమైనవి. ప్రత్యేకంగా మెథడ్ రాయకుండానే, ఇన్‌లైన్‌లో ఇన్స్టాంట్‌గా ఫంక్షన్ బాడీని డిఫైన్ చేయవచ్చు.</p>

  <p><strong>Closures:</strong> లాంబ్డా ఎక్స్‌ప్రెషన్లు తమ వెలుపల ఉన్న లోకల్ వేరియబుల్స్‌ను క్యాప్చర్ (capture) చేసుకుని గుర్తుపెట్టుకోగలవు. దీనినే క్లోజర్ అంటారు.</p>

  <div class="code-block">
    <div class="code-header">
      <span>LambdaClosures.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<int> numbers = new List<int> { 12, 45, 68, 23, 89, 90 };

        // Lambda used as a filter condition
        List<int> evenNumbers = numbers.FindAll(n => n % 2 == 0);
        Console.WriteLine($"Evens: {string.Join(", ", evenNumbers)}");

        // Closure Example: Capturing external factor
        int multiplier = 10;
        Func<int, int> scale = n => n * multiplier; // multiplier captured!
        Console.WriteLine($"Scaled 7: {scale(7)}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span> Events & Publisher-Subscriber Pattern</div>
<div class="section-body">
  <p>డెలిగేట్‌ను నేరుగా వాడితే బయటి క్లాసులు ప్రమాదవశాత్తు <code>delegate = null;</code> అని అసైన్ చేసి పాత లిజనర్లను తుడిచిపెట్టే ప్రమాదం ఉంది. దీని నివారణకు C# లో <strong><code>event</code></strong> కీవర్డ్ వాడతారు.</p>
  <ul>
    <li><strong>Publisher:</strong> ఏదైనా సంఘటన జరిగినప్పుడు ఈవెంట్‌ను ట్రిగ్గర్ (Raise/Fire) చేసే క్లాస్.</li>
    <li><strong>Subscriber:</strong> ఆ ఈవెంట్ జరిగినప్పుడు స్పందించడానికి <code>+=</code> ద్వారా రిజిస్టర్ చేసుకునే క్లాస్. బయటి క్లాసులు ఈవెంట్‌ను కేవలం <code>+=</code> లేదా <code>-=</code> మాత్రమే చేయగలవు; నేరుగా ఇన్వోక్ చేయలేవు!</li>
  </ul>

  <div class="code-block">
    <div class="code-header">
      <span>StockTickerEventDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

// Publisher Class
class StockMarket
{
    // Event declaration using Action
    public event Action<string, decimal> PriceChanged;

    public void UpdatePrice(string symbol, decimal newPrice)
    {
        Console.WriteLine($"[Market Alert] {symbol} updated to {newPrice:C}");
        // Safe null-conditional invoke
        PriceChanged?.Invoke(symbol, newPrice);
    }
}

class Program
{
    static void Main()
    {
        StockMarket market = new StockMarket();

        // Subscribers registering via +=
        market.PriceChanged += (sym, price) => 
            Console.WriteLine($"-> Investor App: Notified about {sym} at {price:C}");
        market.PriceChanged += (sym, price) => 
            Console.WriteLine($"-> Broker Bot: Auto-trading analysis for {sym}");

        // Firing the event
        market.UpdatePrice("TCS", 3950.50m);
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span> బిగినర్ తప్పులు & ఇంటర్వ్యూ FAQ</div>
<div class="section-body">
  <div style="background:#fee2e2; border-left:4px solid #ef4444; padding:14px 18px; border-radius:0 8px 8px 0; margin-bottom:16px;">
    <strong style="color:#b91c1c;">⚠️ ప్రమాదకరమైన తప్పు: Event Unsubscribe చేయకపోవడం (Memory Leak)</strong><br>
    <span style="font-size:13.5px; color:#475569;">ఒక లాంగ్-లివ్డ్ పబ్లిషర్ క్లాస్ ఈవెంట్‌కు షార్ట్-లివ్డ్ సబ్‌స్క్రైబర్ రిజిస్టర్ అయ్యి, పని పూర్తయిన తర్వాత <code>-=</code> ద్వారా అన్‌సబ్‌స్క్రైబ్ చేసుకోకపోతే, గార్బేజ్ కలెక్టర్ ఆ సబ్‌స్క్రైబర్‌ను మెమరీ నుండి తొలగించలేదు (Lapsed Listener Problem). దీనివల్ల తీవ్రమైన మెమరీ లీక్ ఏర్పడుతుంది.</span>
  </div>

  <h3>తరచుగా అడిగే ప్రశ్నలు (FAQ):</h3>
  <ul>
    <li><strong>Delegate మరియు Event మధ్య ప్రాథమిక తేడా ఏమిటి?</strong><br>
    Delegate అనేది ఒక ఫంక్షన్ పాయింటర్ టైప్. Event అనేది ఆ డెలిగేట్‌పై ఒక ఎన్‌క్యాప్సులేషన్ లేయర్; బయటి క్లాసులు ఈవెంట్‌ను కేవలం <code>+=</code> మరియు <code>-=</code> మాత్రమే చేయగలవు తప్ప నేరుగా ఓవర్‌రైట్ చేయలేవు లేదా ఇన్వోక్ చేయలేవు.</li>
    <li><strong><code>Action</code> మరియు <code>Func</code> లలో ఏది రిటర్న్ చేస్తుంది?</strong><br>
    <code>Action</code> ఎల్లప్పుడూ <code>void</code> (ఏమీ రిటర్న్ చేయదు). <code>Func</code> ఎల్లప్పుడూ కచ్చితంగా ఏదో ఒక వ్యాల్యూను రిటర్న్ చేస్తుంది.</li>
  </ul>
</div>
`;

// CHAPTER 19: LINQ (Language Integrated Query)
const ch19Content = `
<div class="intro-box">
  సాఫ్ట్‌వేర్ అభివృద్ధిలో కలెక్షన్స్, డేటాబేస్ టేబుల్స్, లేదా JSON ఫైల్స్ నుండి డేటాను ఫిల్టర్ చేయడం, సార్ట్ చేయడం మరియు గ్రూప్ చేయడం రోజువారీ టాస్క్. దీనికోసం క్లిష్టమైన నెస్టెడ్ లూపులు (nested loops) రాయాల్సిన అవసరం లేకుండా, C# లోకి డేటాబేస్ తరహా క్వెరీ సామర్థ్యాన్ని తెచ్చిన విప్లవాత్మక ఫీచరే <strong>LINQ (Language Integrated Query)</strong>. ఈ అధ్యాయంలో <strong>Method Syntax (Fluent API)</strong>, <strong>Deferred Execution (Lazy Loading)</strong> యొక్క లోతైన మెకానిక్స్, మరియు వాస్తవ అప్లికేషన్లలో ఉపయోగపడే కీలక ఆపరేటర్లను నేర్చుకుందాం.
</div>

<div class="section-title"><span class="num">1</span> LINQ అంటే ఏమిటి? Query Syntax vs Method Syntax</div>
<div class="section-body">
  <p>సాంప్రదాయకంగా అరే లేదా లిస్టులోని ఎలిమెంట్స్‌ను ఫిల్టర్ చేయడానికి మనం <code>foreach</code> లూప్ మరియు <code>if</code> కండిషన్స్ రాసేవాళ్ళం. LINQ ద్వారా కేవలం ఒకే ఒక్క లైన్‌లో డిక్లరేటివ్ (Declarative) శైలిలో కోడ్ రాయవచ్చు. LINQ రాయడానికి రెండు పద్ధతులు ఉన్నాయి:</p>
  <ul>
    <li><strong>Query Syntax:</strong> SQL లాగా కనిపించే సింటాక్స్ (<code>from ... in ... where ... select</code>).</li>
    <li><strong>Method Syntax (Fluent API):</strong> మోడరన్ C# ప్రాజెక్టులలో అత్యంత ప్రాచుర్యం పొందిన లాంబ్డా ఎక్స్‌ప్రెషన్ ఆధారిత ఎక్స్‌టెన్షన్ మెథడ్స్ (ఉదా: <code>.Where()</code>, <code>.Select()</code>).</li>
  </ul>

  <div class="code-block">
    <div class="code-header">
      <span>QueryVsMethodSyntax.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<int> numbers = new List<int> { 5, 12, 8, 25, 40, 3, 18 };

        // 1. Query Syntax (SQL Style)
        var queryHigh = from n in numbers
                        where n > 15
                        orderby n
                        select n;

        // 2. Method Syntax (Fluent API with Lambdas - Industry Preferred)
        var methodHigh = numbers
                            .Where(n => n > 15)
                            .OrderBy(n => n);

        Console.WriteLine($"Method Syntax Result: {string.Join(", ", methodHigh)}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span> ముఖ్యమైన LINQ ఆపరేటర్లు: Where, Select, OrderBy</div>
<div class="section-body">
  <p>డేటా ప్రాసెసింగ్‌లో అత్యంత కీలకమైన మూడు ఆపరేటర్లు:</p>
  <ul>
    <li><strong><code>Where()</code> (Filtering):</strong> ఇచ్చిన కండిషన్ నిజమైన ఎలిమెంట్స్‌ను మాత్రమే ఫిల్టర్ చేస్తుంది.</li>
    <li><strong><code>Select()</code> (Projection):</strong> డేటాను ఒక రూపం నుండి మరొక రూపంలోకి మారుస్తుంది (ఉదా: పూర్తి ఆబ్జెక్ట్ నుండి కేవలం పేర్ల లిస్ట్ మాత్రమే తీసుకోవడం లేదా అనామక ఆబ్జెక్ట్‌ను ప్రొజెక్ట్ చేయడం).</li>
    <li><strong><code>OrderBy()</code> & <code>OrderByDescending()</code> (Sorting):</strong> నిర్దిష్ట ప్రాపర్టీ ఆధారంగా ఆరోహణ లేదా అవరోహణ క్రమంలో అమరుస్తుంది. మల్టిపుల్ సార్టింగ్ కోసం <code>ThenBy()</code> వాడతాం.</li>
  </ul>

  <div class="code-block">
    <div class="code-header">
      <span>CoreLinqOperators.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;
using System.Collections.Generic;
using System.Linq;

record Product(string Name, string Category, decimal Price);

class Program
{
    static void Main()
    {
        List<Product> catalog = new List<Product>
        {
            new Product("Laptop", "Electronics", 65000m),
            new Product("Smartphone", "Electronics", 32000m),
            new Product("Desk Chair", "Furniture", 8500m),
            new Product("Headphones", "Electronics", 4500m),
            new Product("Bookshelf", "Furniture", 12000m)
        };

        // Filter Electronics, sort by Price Descending, select Name & Price
        var affordableElectronics = catalog
            .Where(p => p.Category == "Electronics" && p.Price < 50000m)
            .OrderByDescending(p => p.Price)
            .Select(p => new { p.Name, p.Price });

        foreach (var item in affordableElectronics)
        {
            Console.WriteLine($"{item.Name} -> {item.Price:C}");
        }
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span> Deferred Execution (Lazy) vs Immediate Execution (Eager)</div>
<div class="section-body">
  <p>ఇది LINQ లోని అత్యంత కీలకమైన మరియు ఇంటర్వ్యూలలో తప్పనిసరిగా అడిగే భావన:</p>
  <ul>
    <li><strong>Deferred Execution (ఆలస్యపు ఎగ్జిక్యూషన్):</strong> <code>var q = list.Where(...)</code> అని రాసినప్పుడు అసలు క్వెరీ రన్ అవ్వదు! కేవలం క్వెరీ ప్లాన్ మాత్రమే సిద్ధమవుతుంది. ఆ క్వెరీపై <code>foreach</code> లూప్ తిప్పినప్పుడు మాత్రమే డేటా ఐటరేట్ అవుతుంది. ఒకవేళ క్వెరీ డిక్లేర్ చేసిన తర్వాత లిస్టులోకి కొత్త ఐటమ్స్ యాడ్ చేస్తే, లూప్ రన్ అయ్యేటప్పుడు ఆ కొత్త ఐటమ్స్ కూడా ఫలితంలోకి వస్తాయి!</li>
    <li><strong>Immediate Execution (తక్షణ ఎగ్జిక్యూషన్):</strong> వెంటనే ఫలితాన్ని మెమరీలో స్టోర్ చేయాలంటే <strong><code>.ToList()</code></strong>, <strong><code>.ToArray()</code></strong>, <strong><code>.Count()</code></strong>, లేదా <strong><code>.First()</code></strong> వంటి మెథడ్స్ వాడాలి. ఇవి పిలిచిన క్షణమే క్వెరీ రన్ అయ్యి ఫలితాన్ని లాక్ చేస్తాయి.</li>
  </ul>

  <div class="code-block">
    <div class="code-header">
      <span>DeferredExecutionDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<int> numbers = new List<int> { 1, 2, 3 };

        // 1. Deferred: Query declared, not executed yet!
        var query = numbers.Where(n => n > 1);

        // Modifying source list BEFORE iteration
        numbers.Add(10);
        numbers.Add(20);

        Console.Write("Deferred Results: ");
        foreach (var n in query) // Execution happens NOW! Includes 10 and 20!
        {
            Console.Write($"{n} ");
        }
        Console.WriteLine();

        // 2. Immediate: Cached snapshot in memory
        List<int> immediateList = numbers.Where(n => n > 1).ToList();
        numbers.Add(99); // Won't affect immediateList!
        Console.WriteLine($"Immediate Cached Count: {immediateList.Count}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span> Aggregation, GroupBy & Quantifiers</div>
<div class="section-body">
  <p>డేటాను సమూహాలుగా వర్గీకరించడానికి మరియు గణాంకాలు (statistics) లెక్కించడానికి LINQ మెథడ్స్:</p>
  <ul>
    <li><code>Count()</code>, <code>Sum()</code>, <code>Average()</code>, <code>Min()</code>, <code>Max()</code>.</li>
    <li><code>GroupBy()</code>: ఒక నిర్దిష్ట కీ ఆధారంగా డేటాను విభజించడం (ఉదా: డిపార్ట్‌మెంట్ లేదా కేటగిరీ వారీగా).</li>
    <li><code>Any()</code> మరియు <code>All()</code>: కలెక్షన్‌లో కనీసం ఒక్కటైనా లేదా అన్నీ నిబంధనను సంతృప్తి పరుస్తున్నాయా అని <code>bool</code> చెక్ చేయడం.</li>
  </ul>

  <div class="code-block">
    <div class="code-header">
      <span>GroupByAndAggregate.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;
using System.Collections.Generic;
using System.Linq;

record Employee(string Name, string Dept, decimal Salary);

class Program
{
    static void Main()
    {
        List<Employee> staff = new List<Employee>
        {
            new Employee("Kiran", "IT", 60000m),
            new Employee("Suresh", "IT", 75000m),
            new Employee("Meena", "HR", 45000m),
            new Employee("Arun", "HR", 52000m),
            new Employee("Geetha", "Sales", 48000m)
        };

        // Group by Department
        var deptStats = staff
            .GroupBy(e => e.Dept)
            .Select(g => new
            {
                Department = g.Key,
                Count = g.Count(),
                AvgSalary = g.Average(e => e.Salary),
                MaxSalary = g.Max(e => e.Salary)
            });

        foreach (var d in deptStats)
        {
            Console.WriteLine($"[{d.Department}] Count: {d.Count} | Avg: {d.AvgSalary:C} | Max: {d.MaxSalary:C}");
        }
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span> First() vs FirstOrDefault() & SingleOrDefault()</div>
<div class="section-body">
  <p>కలెక్షన్ నుండి ఒక నిర్దిష్ట ఎలిమెంట్‌ను ఫెచ్ చేసేటప్పుడు అత్యంత జాగ్రత్తగా ఉండాలి:</p>
  <ul>
    <li><strong><code>First()</code>:</strong> సరిపోలే మొదటి ఎలిమెంట్‌ను ఇస్తుంది. ఒకవేళ సరిపోలే ఎలిమెంట్ ఏదీ లేకపోతే వెంటనే <code>InvalidOperationException: Sequence contains no matching element</code> తో క్రాష్ అవుతుంది.</li>
    <li><strong><code>FirstOrDefault()</code>:</strong> సరిపోలే ఎలిమెంట్ ఉంటే ఇస్తుంది; లేకపోతే క్రాష్ అవ్వకుండా డీఫాల్ట్ వ్యాల్యూను (Reference types కి <code>null</code>, int కి <code>0</code>) ఇస్తుంది. <strong>ఎల్లప్పుడూ దీనినే ప్రిఫర్ చేయాలి!</strong></li>
    <li><strong><code>SingleOrDefault()</code>:</strong> ఫలితంలో ఖచ్చితంగా ఒకే ఒక్క ఎలిమెంట్ మాత్రమే ఉండాలని ఆశిస్తుంది. ఒకవేళ 2 లేదా అంతకంటే ఎక్కువ సరిపోలే రికార్డులు ఉంటే ఎక్సెప్షన్ విసురుతుంది (Unique Key లుకప్స్ కోసం వాడతారు).</li>
  </ul>
</div>

<div class="section-title"><span class="num">6</span> బిగినర్ తప్పులు & ఇంటర్వ్యూ FAQ</div>
<div class="section-body">
  <div style="background:#fee2e2; border-left:4px solid #ef4444; padding:14px 18px; border-radius:0 8px 8px 0; margin-bottom:16px;">
    <strong style="color:#b91c1c;">⚠️ ప్రమాదకరమైన తప్పు: Multiple Enumeration Performance Penalty</strong><br>
    <span style="font-size:13.5px; color:#475569;">డిఫర్డ్ ఎగ్జిక్యూషన్ క్వెరీపై <code>if (query.Any()) { foreach (var x in query) ... }</code> అని రాస్తే, క్వెరీ రెండుసార్లు రన్ అవుతుంది! డేటాబేస్ లేదా భారీ కలెక్షన్లలో దీనివల్ల రెట్టింపు నెట్‌వర్క్/సీపీయూ ఖర్చు అవుతుంది. ఒకసారి <code>var list = query.ToList();</code> చేసి ఆ లిస్టును మల్టిపుల్ సార్లు వాడుకోవాలి.</span>
  </div>

  <h3>తరచుగా అడిగే ప్రశ్నలు (FAQ):</h3>
  <ul>
    <li><strong>LINQ ఎక్స్‌టెన్షన్ మెథడ్స్ ఏ నేమ్‌స్పేస్‌లో ఉంటాయి?</strong><br>
    <code>System.Linq</code> నేమ్‌స్పేస్‌లో ఉంటాయి. <code>IEnumerable&lt;T&gt;</code> ఇంటర్‌ఫేస్‌ను ఇంప్లిమెంట్ చేసే ఏ కలెక్షన్ పైన అయినా ఇవి పనిచేస్తాయి.</li>
    <li><strong>LINQ to Objects మరియు LINQ to Entities (EF Core) మధ్య తేడా ఏమిటి?</strong><br>
    LINQ to Objects అనేది ర్యామ్ (RAM) మెమరీలోని కలెక్షన్లపై C# కోడ్‌తో రన్ అవుతుంది. LINQ to Entities అనేది C# క్వెరీని SQL క్వెరీగా అనువదించి నేరుగా రిలేషనల్ డేటాబేస్ (SQL Server/Postgres) లో ఎగ్జిక్యూట్ చేస్తుంది.</li>
  </ul>
</div>
`;

// CHAPTER 20: Complete Capstone Mini Project: Employee Management System (LINQ & JSON)
const ch20Content = `
<div class="intro-box">
  అభినందనలు! మీరు C# బేసిక్స్, OOP సూత్రాలు, జెనెరిక్ కలెక్షన్స్, ఎక్సెప్షన్ హ్యాండ్లింగ్ మరియు LINQ వరకు C# ప్రయాణాన్ని విజయవంతంగా పూర్తి చేశారు. ఇప్పుడు మనం నేర్చుకున్న ప్రతి ఒక్క సాంకేతిక అంశాన్ని ఏకీకృతం చేస్తూ ఒక సంపూర్ణ ఎంటర్‌ప్రైజ్-గ్రేడ్ <strong>Employee Management System (క్యాప్‌స్టోన్ మినీ ప్రాజెక్ట్)</strong> ను నిర్మిద్దాం. ఇందులో డొమైన్ మోడలింగ్, CRUD ఆపరేషన్స్, LINQ అనలిటిక్స్ మరియు <strong><code>System.Text.Json</code></strong> ద్వారా డిస్క్‌పై డేటాను శాశ్వతంగా భద్రపరిచే (Persistence) రియల్-వరల్డ్ ఆర్కిటెక్చర్ ఉంటుంది!
</div>

<div class="section-title"><span class="num">1</span> ప్రాజెక్ట్ ఆర్కిటెక్చర్ & డొమైన్ మోడల్స్ డిజైన్</div>
<div class="section-body">
  <p>ఈ క్యాప్‌స్టోన్ ప్రాజెక్ట్‌లో మనం పాటించే ప్రొఫెషనల్ ఆర్కిటెక్చరల్ పద్ధతులు:</p>
  <ul>
    <li><strong><code>Department</code> (Enum):</strong> ఐటీ, హెచ్ఆర్, ఫైనాన్స్, సేల్స్ వంటి స్థిరమైన విభాగాలు.</li>
    <li><strong><code>Employee</code> (Class):</strong> ఐడీ, పేరు, డిపార్ట్‌మెంట్, మరియు జీతం లక్షణాలతో కూడిన ఎన్‌క్యాప్సులేటెడ్ మోడల్.</li>
    <li><strong><code>EmployeeSummary</code> (Record):</strong> DTO (Data Transfer Object) మరియు రిపోర్టింగ్ కోసం ఇమ్మ్యూటబుల్ రికార్డ్.</li>
    <li><strong><code>IEmployeeRepository</code> (Interface):</strong> డికప్లింగ్ మరియు డిపెండెన్సీ ఇంజెక్షన్ పునాది.</li>
    <li><strong><code>System.Text.Json</code>:</strong> అప్లికేషన్ రీస్టార్ట్ అయినా డేటా పోకుండా <code>employees.json</code> ఫైల్‌లో భద్రపరచడం.</li>
  </ul>

  <div class="code-block">
    <div class="code-header">
      <span>DomainModels.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

// Department Enum
public enum Department
{
    IT,
    HR,
    Finance,
    Sales
}

// Domain Model
public class Employee
{
    public int Id { get; init; }
    public string Name { get; set; } = string.Empty;
    public Department Dept { get; set; }
    public decimal Salary { get; set; }

    public Employee() { }

    public Employee(int id, string name, Department dept, decimal salary)
    {
        Id = id;
        Name = name;
        Dept = dept;
        Salary = salary;
    }

    public override string ToString() =>
        $"ID: {Id,4} | Name: {Name,-15} | Dept: {Dept,-8} | Salary: {Salary:C}";
}

// Immutable Summary Record for Analytics
public record DepartmentSummary(string Department, int HeadCount, decimal AvgSalary, decimal MaxSalary);</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span> Repository Interface & Service Implementation</div>
<div class="section-body">
  <p>డేటాను ప్రాసెస్ చేసే బిజినెస్ లాజిక్‌ను కన్సోల్ యూజర్ ఇంటర్‌ఫేస్ నుండి వేరు చేయడం క్లీన్ కోడ్ సూత్రం. దీనికోసం <code>IEmployeeService</code> ఇంటర్‌ఫేస్ మరియు దాని ఇంప్లిమెంటేషన్‌ను పరిశీలిద్దాం:</p>

  <div class="code-block">
    <div class="code-header">
      <span>EmployeeService.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;

public class EmployeeService
{
    private List<Employee> _employees = new List<Employee>();
    private readonly string _filePath;

    public EmployeeService(string filePath = "employees.json")
    {
        _filePath = filePath;
        LoadFromFile();
    }

    public bool AddEmployee(Employee emp)
    {
        if (_employees.Any(e => e.Id == emp.Id))
            return false; // Duplicate ID

        _employees.Add(emp);
        SaveToFile();
        return true;
    }

    public List<Employee> GetAll() => _employees.OrderBy(e => e.Id).ToList();

    public Employee? FindById(int id) => _employees.FirstOrDefault(e => e.Id == id);

    public bool DeleteEmployee(int id)
    {
        var emp = FindById(id);
        if (emp == null) return false;

        _employees.Remove(emp);
        SaveToFile();
        return true;
    }

    // LINQ Analytics: Group by Department
    public List<DepartmentSummary> GetDepartmentSummaries()
    {
        return _employees
            .GroupBy(e => e.Dept)
            .Select(g => new DepartmentSummary(
                g.Key.ToString(),
                g.Count(),
                g.Average(e => e.Salary),
                g.Max(e => e.Salary)
            ))
            .ToList();
    }

    private void SaveToFile()
    {
        try
        {
            var options = new JsonSerializerOptions { WriteIndented = true };
            string json = JsonSerializer.Serialize(_employees, options);
            File.WriteAllText(_filePath, json);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[Storage Error]: {ex.Message}");
        }
    }

    private void LoadFromFile()
    {
        if (!File.Exists(_filePath)) return;
        try
        {
            string json = File.ReadAllText(_filePath);
            _employees = JsonSerializer.Deserialize<List<Employee>>(json) ?? new List<Employee>();
        }
        catch
        {
            _employees = new List<Employee>();
        }
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span> ఇంటరాక్టివ్ కన్సోల్ UI మెనూ & ఎగ్జిక్యూషన్ లాజిక్</div>
<div class="section-body">
  <p>యూజర్ ఫ్రెండ్లీ కమాండ్-లైన్ ఇంటర్‌ఫేస్ (CLI) ద్వారా ఉద్యోగులను జోడించడం, జాబితాను చూడటం, డిపార్ట్‌మెంట్ వారీగా LINQ రిపోర్టులను వీక్షించడం ఎలాగో ఈ క్రింది పూర్తి కోడ్‌లో చూడవచ్చు:</p>

  <div class="code-block">
    <div class="code-header">
      <span>Program.cs (Complete Application)</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        EmployeeService service = new EmployeeService("company_data.json");

        // Seed initial data if empty
        if (service.GetAll().Count == 0)
        {
            service.AddEmployee(new Employee(101, "Ravi Teja", Department.IT, 75000m));
            service.AddEmployee(new Employee(102, "Sneha Latha", Department.HR, 52000m));
            service.AddEmployee(new Employee(103, "Manoj Kumar", Department.IT, 82000m));
            service.AddEmployee(new Employee(104, "Priya Sharma", Department.Finance, 68000m));
        }

        bool running = true;
        while (running)
        {
            Console.WriteLine("\n========================================");
            Console.WriteLine("🏢 EMPLOYEE MANAGEMENT SYSTEM (.NET 8)");
            Console.WriteLine("========================================");
            Console.WriteLine("1. View All Employees");
            Console.WriteLine("2. Add New Employee");
            Console.WriteLine("3. Search Employee by ID");
            Console.WriteLine("4. View Department Analytics (LINQ)");
            Console.WriteLine("5. Delete Employee");
            Console.WriteLine("6. Exit");
            Console.Write("Enter your choice (1-6): ");

            string? choice = Console.ReadLine();
            Console.WriteLine();

            switch (choice)
            {
                case "1":
                    var list = service.GetAll();
                    Console.WriteLine($"Total Employees: {list.Count}");
                    list.ForEach(e => Console.WriteLine(e));
                    break;

                case "2":
                    AddNewEmployeeUI(service);
                    break;

                case "3":
                    Console.Write("Enter Employee ID: ");
                    if (int.TryParse(Console.ReadLine(), out int searchId))
                    {
                        var found = service.FindById(searchId);
                        Console.WriteLine(found != null ? found.ToString() : "Employee not found!");
                    }
                    break;

                case "4":
                    var summaries = service.GetDepartmentSummaries();
                    Console.WriteLine("--- Department Analytics (LINQ GroupBy) ---");
                    foreach (var s in summaries)
                    {
                        Console.WriteLine($"Dept: {s.Department,-8} | Count: {s.HeadCount} | Avg: {s.AvgSalary:C} | Max: {s.MaxSalary:C}");
                    }
                    break;

                case "5":
                    Console.Write("Enter ID to delete: ");
                    if (int.TryParse(Console.ReadLine(), out int delId))
                    {
                        bool deleted = service.DeleteEmployee(delId);
                        Console.WriteLine(deleted ? "Deleted successfully!" : "ID not found!");
                    }
                    break;

                case "6":
                    Console.WriteLine("Thank you for using the application! Goodbye.");
                    running = false;
                    break;

                default:
                    Console.WriteLine("Invalid choice! Please select 1-6.");
                    break;
            }
        }
    }

    static void AddNewEmployeeUI(EmployeeService service)
    {
        Console.Write("Enter Employee ID: ");
        if (!int.TryParse(Console.ReadLine(), out int id)) { Console.WriteLine("Invalid ID!"); return; }

        Console.Write("Enter Name: ");
        string name = Console.ReadLine() ?? "Unknown";

        Console.Write("Select Dept (0=IT, 1=HR, 2=Finance, 3=Sales): ");
        if (!Enum.TryParse(Console.ReadLine(), out Department dept)) dept = Department.IT;

        Console.Write("Enter Monthly Salary: ");
        if (!decimal.TryParse(Console.ReadLine(), out decimal salary)) salary = 30000m;

        bool added = service.AddEmployee(new Employee(id, name, dept, salary));
        Console.WriteLine(added ? "Employee added successfully and saved to JSON!" : "Failed: ID already exists!");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span> ప్రోగ్రామ్ రన్ రిజల్ట్స్ (Sample Output)</div>
<div class="section-body">
  <div class="output-block">========================================
🏢 EMPLOYEE MANAGEMENT SYSTEM (.NET 8)
========================================
1. View All Employees
2. Add New Employee
3. Search Employee by ID
4. View Department Analytics (LINQ)
5. Delete Employee
6. Exit
Enter your choice (1-6): 4

--- Department Analytics (LINQ GroupBy) ---
Dept: IT       | Count: 2 | Avg: ₹78,500.00 | Max: ₹82,000.00
Dept: HR       | Count: 1 | Avg: ₹52,000.00 | Max: ₹52,000.00
Dept: Finance  | Count: 1 | Avg: ₹68,000.00 | Max: ₹68,000.00</div>
</div>

<div class="section-title"><span class="num">5</span> సేవ్ చేయబడిన employees.json ఫైల్ స్ట్రక్చర్</div>
<div class="section-body">
  <p><code>System.Text.Json</code> ద్వారా డిస్క్‌పై క్రియేట్ అయిన పర్సిస్టెన్స్ ఫైల్ ఇలా అందంగా ఫార్మాట్ చేయబడి ఉంటుంది:</p>

  <div class="code-block">
    <div class="code-header">
      <span>company_data.json</span>
    </div>
    <pre><code>[
  {
    "Id": 101,
    "Name": "Ravi Teja",
    "Dept": 0,
    "Salary": 75000
  },
  {
    "Id": 102,
    "Name": "Sneha Latha",
    "Dept": 1,
    "Salary": 52000
  },
  {
    "Id": 103,
    "Name": "Manoj Kumar",
    "Dept": 0,
    "Salary": 82000
  },
  {
    "Id": 104,
    "Name": "Priya Sharma",
    "Dept": 2,
    "Salary": 68000
  }
]</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span> మీ తదుపరి అడుగు: .NET డెవలపర్ కెరీర్ రోడ్‌మ్యాప్</div>
<div class="section-body">
  <div style="background:var(--bg3); border-left:4px solid #10b981; padding:16px 20px; border-radius:0 8px 8px 0; margin-bottom:16px;">
    <h3 style="margin-top:0; color:#10b981;">🚀 మీరు సాధించిన మైలురాళ్ళు:</h3>
    <p>ఈ 20 అధ్యాయాల సమగ్ర C# మాస్టర్‌క్లాస్‌తో మీరు C# లాంగ్వేజ్ సింటాక్స్, మెమరీ మేనేజ్‌మెంట్ (Stack vs Heap), ఆబ్జెక్ట్ ఓరియెంటెడ్ డిజైన్, జెనెరిక్స్, డెలిగేట్స్ & ఈవెంట్స్, అధునాతన LINQ క్వెరీలు మరియు ఫైల్ I/O లలో బలమైన పట్టు సాధించారు.</p>
  </div>

  <h3>తదుపరి ప్రయాణం (Next Steps in Your .NET Journey):</h3>
  <ol>
    <li><strong>ASP.NET Core Web APIs:</strong> రెస్ట్‌ఫుల్ (RESTful) వెబ్ సర్వీసెస్, Swagger డాక్యుమెంటేషన్, మరియు JWT అథెంటికేషన్ నేర్చుకోండి.</li>
    <li><strong>Entity Framework Core (EF Core):</strong> డేటాబేస్ ఆపరేషన్స్ కోసం ఆధునిక ORM టూల్. Code-First మైగ్రేషన్లు మరియు SQL సర్వర్ ఇంటిగ్రేషన్.</li>
    <li><strong>Dependency Injection & Clean Architecture:</strong> లార్జ్ స్కేల్ ప్రాజెక్టులలో రిపోజిటరీ పాటర్న్, యూనిట్ ఆఫ్ వర్క్, మరియు సర్వీస్ లేయర్ల నిర్మాణం.</li>
    <li><strong>Microservices & Cloud (.NET 8 & Azure):</strong> డాకర్ కంటైనర్లు, కుబెర్నెటిస్, మరియు క్లౌడ్ నేటివ్ అప్లికేషన్ల అభివృద్ధి.</li>
  </ol>
</div>
`;

const phase5Updates = [
  { num: 17, content: ch17Content },
  { num: 18, content: ch18Content },
  { num: 19, content: ch19Content },
  { num: 20, content: ch20Content }
];

phase5Updates.forEach(item => {
  const lessonMeta = LESSONS.find(l => l.num === item.num);
  if (!lessonMeta) {
    console.error(`Lesson ${item.num} not found in curriculum data!`);
    return;
  }
  lessonMeta.contentHtml = item.content;
  const fullHtml = generatePageHtml(lessonMeta);
  const targetPath = path.join(csharpDir, lessonMeta.file);
  fs.writeFileSync(targetPath, fullHtml, 'utf8');
  console.log(`✅ Fully enriched C# Phase 5 Lesson ${item.num} : ${lessonMeta.file} (${fullHtml.length} chars)`);
});

