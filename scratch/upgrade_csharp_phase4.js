const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./csharp_curriculum_data.js');
const { generatePageHtml } = require('./csharp_page_template.js');

const csharpDir = path.join(__dirname, '../public/blog-csharp');

// CHAPTER 13: Classes, Objects & Constructors (Primary Constructors)
const ch13Content = `
<div class="intro-box">
  ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP) అనేది ఆధునిక సాఫ్ట్‌వేర్ ఆర్కిటెక్చర్‌కు పునాది. C# లో ప్రతి లాజిక్ క్లాసెస్ మరియు ఆబ్జెక్ట్స్ చుట్టూ కేంద్రీకృతమై ఉంటుంది. ఒక క్లాస్ అనేది డేటా (ఫీల్డ్స్) మరియు బిహేవియర్ (మెథడ్స్) లను కలిపి ఉంచే బ్లూప్రింట్. C# 12 మరియు .NET 8 లో కోడ్‌ను అత్యంత క్లీన్‌గా ఉంచే <strong>Primary Constructors</strong> అందుబాటులోకి వచ్చాయి. ఈ అధ్యాయంలో క్లాస్ డిజైన్, హీప్ అలోకేషన్, కన్‌స్ట్రక్టర్ చైనింగ్ మరియు స్టాటిక్ మెంబర్లను క్షుణ్ణంగా పరిశీలిద్దాం.
</div>

<div class="section-title"><span class="num">1</span> క్లాస్ బ్లూప్రింట్ & new ఆపరేటర్: Heap మెమరీ వర్కింగ్</div>
<div class="section-body">
  <p><strong>Class:</strong> ఒక ఇంటిని నిర్మించడానికి ఇంజనీర్ వేసే బ్లూప్రింట్ (నమూనా) ఎలాంటిదో, సాఫ్ట్‌వేర్‌లో క్లాస్ అలాంటిది. ఇది ఆబ్జెక్ట్‌కు అవసరమైన లక్షణాలను నిర్వచిస్తుంది కానీ దీనికి స్వతంత్రంగా మెమరీ ఉండదు.</p>
  <p><strong>Object:</strong> బ్లూప్రింట్ చూసి నిర్మించిన అసలైన ఇంటిలాంటిదే ఆబ్జెక్ట్ (Instance). <code>new</code> కీవర్డ్ వాడినప్పుడు CLR మేనేజ్డ్ హీప్ (Managed Heap) పై మెమరీ కేటాయించి, ఆబ్జెక్ట్‌ను ఇనిషియలైజ్ చేస్తుంది.</p>

  <div class="code-block">
    <div class="code-header">
      <span>ClassAndObjectBasics.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

// Blueprint
class BankAccount
{
    // Fields
    public string AccountNumber;
    public decimal Balance;

    // Method
    public void Deposit(decimal amount)
    {
        Balance += amount;
        Console.WriteLine($"Deposited: {amount:C}, Current Balance: {Balance:C}");
    }
}

class Program
{
    static void Main()
    {
        // Object Creation on Heap
        BankAccount acc1 = new BankAccount();
        acc1.AccountNumber = "SB-10029";
        acc1.Deposit(5000m);

        BankAccount acc2 = new BankAccount();
        acc2.AccountNumber = "SB-10030";
        acc2.Deposit(12000m);
    }
}</code></pre>
  </div>

  <p><strong>మెమరీ వర్కింగ్ విశ్లేషణ:</strong> <code>acc1</code> మరియు <code>acc2</code> అనేవి స్టాక్ (Stack) మెమరీలోని రిఫరెన్స్ పాయింటర్లు. అసలైన <code>BankAccount</code> డేటా అంతా మేనేజ్డ్ హీప్ (Heap) లో వేర్వేరు మెమరీ అడ్రస్‌లలో స్వతంత్రంగా ఉంటుంది.</p>
</div>

<div class="section-title"><span class="num">2</span> this కీవర్డ్ & ఫీల్డ్ కన్‌ఫ్లిక్ట్ నివారణ</div>
<div class="section-body">
  <p>ఒక క్లాస్ లోపల ప్రస్తుతం ఏ ఇన్స్టాన్స్ (ఆబ్జెక్ట్) అయితే కోడ్‌ను రన్ చేస్తోందో ఆ ఆబ్జెక్ట్‌ను సూచించడానికి <strong><code>this</code></strong> కీవర్డ్ ఉపయోగపడుతుంది. మెథడ్ పారామీటర్ పేరు మరియు క్లాస్ ఫీల్డ్ పేరు రెండూ ఒకేలా ఉన్నప్పుడు కన్‌ఫ్యూజన్ లేకుండా స్పష్టత ఇవ్వడానికి ఇది అత్యవసరం.</p>

  <div class="code-block">
    <div class="code-header">
      <span>ThisKeywordDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Employee
{
    public int Id;
    public string Name;

    public void SetDetails(int Id, string Name)
    {
        // this.Id points to the Class Field
        // Id points to the Method Parameter
        this.Id = Id;
        this.Name = Name;
    }
}

class Program
{
    static void Main()
    {
        Employee emp = new Employee();
        emp.SetDetails(101, "Suresh");
        Console.WriteLine($"Employee ID: {emp.Id}, Name: {emp.Name}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span> కన్‌స్ట్రక్టర్లు & కన్‌స్ట్రక్టర్ ఓవర్‌లోడింగ్ (Constructor Chaining)</div>
<div class="section-body">
  <p>ఆబ్జెక్ట్ పుట్టగానే (క్రియేట్ అవ్వగానే) దానికి అవసరమైన ప్రారంభ విలువలను కేటాయించడానికి <strong>Constructor</strong> అనే ప్రత్యేక మెథడ్ రన్ అవుతుంది. దీని పేరు కచ్చితంగా క్లాస్ పేరుతో సమానంగా ఉండాలి మరియు దీనికి ఎటువంటి రిటర్న్ టైప్ (<code>void</code> కూడా) ఉండదు.</p>

  <p><strong>Constructor Chaining (<code>: this(...)</code>):</strong> ఒక కన్‌స్ట్రక్టర్ నుండి అదే క్లాస్‌లోని మరొక కన్‌స్ట్రక్టర్‌ను కాల్ చేయడానికి <code>this</code> కీవర్డ్ వాడతారు. దీనివల్ల డూప్లికేట్ కోడ్ పూర్తిగా తొలగిపోతుంది.</p>

  <div class="code-block">
    <div class="code-header">
      <span>ConstructorChaining.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Product
{
    public string Name;
    public decimal Price;
    public int Stock;

    // Primary detailed constructor
    public Product(string name, decimal price, int stock)
    {
        this.Name = name;
        this.Price = price;
        this.Stock = stock;
    }

    // Overloaded Constructor calling the main one with defaults
    public Product(string name, decimal price) : this(name, price, 10)
    {
    }

    public void PrintInfo() => 
        Console.WriteLine($"Product: {Name} | Price: {Price:C} | Stock: {Stock}");
}

class Program
{
    static void Main()
    {
        Product p1 = new Product("Mechanical Keyboard", 3500m, 50);
        Product p2 = new Product("Mouse Pad", 450m); // Uses default stock 10

        p1.PrintInfo();
        p2.PrintInfo();
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span> C# 12 Primary Constructors: మోడరన్ క్లీన్ కోడ్</div>
<div class="section-body">
  <p>C# 12 లో ప్రవేశపెట్టబడిన <strong>Primary Constructors</strong> ద్వారా క్లాస్ డిక్లరేషన్ హెడర్ వద్దనే పారామీటర్లను నిర్దేశించవచ్చు. దీనివల్ల ప్రైవేట్ ఫీల్డ్స్ డిక్లేర్ చేసి, కన్‌స్ట్రక్టర్ బాడీలో <code>this.x = x;</code> అని రాసే బోరింగ్ బాయిలర్‌ప్లేట్ కోడ్ పూర్తిగా తొలగిపోతుంది.</p>

  <div class="code-block">
    <div class="code-header">
      <span>PrimaryConstructorDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

// C# 12 Primary Constructor directly in class signature
class Student(int id, string name, double gpa)
{
    public void DisplayReport()
    {
        // Parameters (id, name, gpa) are in scope across the whole class!
        Console.WriteLine($"Student #{id}: {name} -> GPA: {gpa:F2}");
    }
}

class Program
{
    static void Main()
    {
        Student s1 = new Student(101, "Deepika", 9.4);
        s1.DisplayReport();
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span> Static Members vs Instance Members</div>
<div class="section-body">
  <p>ఒక క్లాస్‌లోని మెంబర్‌కు <code>static</code> అని పెడితే, అది ఏ ఒక్క ఆబ్జెక్ట్‌కు కాకుండా మొత్తం క్లాస్‌కు మాత్రమే చెందుతుంది. మెమరీలో దీనికి ఒకే ఒక్క కాపీ ఉంటుంది.</p>
  <ul>
    <li><strong>Instance Members:</strong> ప్రతి ఆబ్జెక్ట్‌కు విడివిడిగా మెమరీ ఉంటుంది. <code>obj.Field</code> ద్వారా యాక్సెస్ చేస్తాం.</li>
    <li><strong>Static Members:</strong> క్లాస్ పేరుతో నేరుగా కాల్ చేస్తాం (ఉదా: <code>Math.Sqrt()</code> లేదా <code>User.TotalUsers</code>). ఆబ్జెక్ట్ లేకుండానే పని చేస్తాయి.</li>
  </ul>

  <div class="code-block">
    <div class="code-header">
      <span>StaticCounterDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class User
{
    public string Username;
    public static int UserCount = 0; // Shared across all instances

    public User(string username)
    {
        this.Username = username;
        UserCount++; // Increments the shared global counter
    }
}

class Program
{
    static void Main()
    {
        User u1 = new User("alice");
        User u2 = new User("bob");
        User u3 = new User("charlie");

        Console.WriteLine($"Total Users Registered: {User.UserCount}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span> బిగినర్ తప్పులు & ఇంటర్వ్యూ FAQ</div>
<div class="section-body">
  <div style="background:#fee2e2; border-left:4px solid #ef4444; padding:14px 18px; border-radius:0 8px 8px 0; margin-bottom:16px;">
    <strong style="color:#b91c1c;">⚠️ ప్రమాదకరమైన తప్పు: NullReferenceException</strong><br>
    <span style="font-size:13.5px; color:#475569;"><code>BankAccount acc;</code> అని కేవలం రిఫరెన్స్ వేరియబుల్ మాత్రమే డిక్లేర్ చేసి, <code>new BankAccount()</code> చేయకుండా <code>acc.Deposit(100)</code> అని కాల్ చేస్తే ప్రోగ్రామ్ క్రాష్ అవుతుంది. ఎందుకంటే ఆ రిఫరెన్స్ మెమరీలో <code>null</code> ను పాయింట్ చేస్తోంది.</span>
  </div>

  <h3>తరచుగా అడిగే ప్రశ్నలు (FAQ):</h3>
  <ul>
    <li><strong>డీఫాల్ట్ కన్‌స్ట్రక్టర్ ఎప్పుడు అదృశ్యమవుతుంది?</strong><br>
    మనం ఏ కన్‌స్ట్రక్టర్ రాయకపోతే C# కంపైలర్ ఉచితంగా డీఫాల్ట్ పారామీటర్-లెస్ కన్‌స్ట్రక్టర్ ఇస్తుంది. కానీ మనం ఏదైనా ఒక్క పారామీటరైజ్డ్ కన్‌స్ట్రక్టర్ రాస్తే, కంపైలర్ ఇచ్చే డీఫాల్ట్ కన్‌స్ట్రక్టర్ రద్దవుతుంది.</li>
    <li><strong>Static Class లో ఇన్స్టాన్స్ కన్‌స్ట్రక్టర్ ఎందుకు ఉండదు?</strong><br>
    Static క్లాస్‌లకు ఆబ్జెక్ట్స్ క్రియేట్ చేయడం సాధ్యం కాదు (<code>new MyStaticClass()</code> అని రాయలేము). అందువల్ల కేవలం క్లాస్ లోడ్ అయినప్పుడు ఒకసారి రన్ అయ్యే <code>static</code> కన్‌స్ట్రక్టర్ మాత్రమే ఉండగలదు.</li>
  </ul>
</div>
`;

// CHAPTER 14: Encapsulation, Access Modifiers & Auto-Properties
const ch14Content = `
<div class="intro-box">
  ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ యొక్క ముఖ్య ఉద్దేశం డేటా భద్రత. క్లాస్ లోపల ఉండే డేటాను బాహ్య ప్రపంచం ఇష్టారాజ్యంగా తప్పు విలువల (invalid values) తో మార్చకుండా నిరోధించే ప్రక్రియనే <strong>Encapsulation (ఎన్‌క్యాప్సులేషన్)</strong> అంటారు. C# లో ఎన్‌క్యాప్సులేషన్ సాధించడానికి శక్తివంతమైన యాక్సెస్ మోడిఫైయర్లు, <strong>Properties ({ get; set; })</strong>, మరియు ఇమ్మ్యూటబిలిటీ కోసం C# 9+ లో ప్రవేశపెట్టిన <strong><code>init</code>-only accessors</strong> అందుబాటులో ఉన్నాయి.
</div>

<div class="section-title"><span class="num">1</span> ఎన్‌క్యాప్సులేషన్ ప్రాముఖ్యత: డేటా హైడింగ్ & వాలిడేషన్</div>
<div class="section-body">
  <p>ఒక బ్యాంకు ఖాతాలో <code>public decimal Balance;</code> అని ఉంచితే, ఎవరైనా బయటి నుండి <code>acc.Balance = -99999;</code> అని నెగటివ్ వ్యాల్యూ కేటాయించి సిస్టమ్‌ను పాడు చేయవచ్చు. డేటా ఫీల్డ్స్‌ను <code>private</code> గా దాచిపెట్టి, కేవలం తనిఖీ చేయబడిన (validated) మెథడ్స్ లేదా ప్రాపర్టీల ద్వారా మాత్రమే యాక్సెస్ ఇవ్వడమే ఎన్‌క్యాప్సులేషన్ యొక్క అసలు రహస్యం.</p>

  <p><strong>నిజ జీవిత ఉదాహరణ:</strong> ATM మెషిన్‌లో డబ్బులు డ్రా చేయాలంటే పిన్ నెంబర్ కొట్టి, తగిన బ్యాలెన్స్ ఉందో లేదో చెక్ చేసిన తర్వాతే క్యాష్ బయటకు వస్తుంది; నేరుగా లాకర్‌లోని కరెన్సీని చేతితో తీసుకోలేము.</p>
</div>

<div class="section-title"><span class="num">2</span> C# Access Modifiers విశ్లేషణ</div>
<div class="section-body">
  <p>క్లాస్ మరియు దాని మెంబర్లను ఎవరు యాక్సెస్ చేయవచ్చో నియంత్రించడానికి C# లో 6 రకాల యాక్సెస్ లెవెల్స్ ఉన్నాయి:</p>
  <div style="overflow-x:auto;">
    <table style="width:100%; border-collapse:collapse; margin-top:12px; font-size:13.5px;">
      <thead>
        <tr style="background:var(--bg3); border-bottom:2px solid var(--border);">
          <th style="padding:10px; text-align:left;">Modifier</th>
          <th style="padding:10px; text-align:left;">యాక్సెస్ పరిధి (Scope)</th>
          <th style="padding:10px; text-align:left;">ఎప్పుడు వాడాలి?</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:10px;"><code>public</code></td>
          <td style="padding:10px;">ఎక్కడి నుండైనా (ఏ ప్రాజెక్ట్/అసెంబ్లీ నుండైనా) యాక్సెస్ చేయవచ్చు.</td>
          <td style="padding:10px;">ఏపీఐ మెథడ్స్, ఎక్స్‌టర్నల్ ఇంటర్‌ఫేస్</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:10px;"><code>private</code></td>
          <td style="padding:10px;">కేవలం అదే క్లాస్ లోపల మాత్రమే యాక్సెస్ ఉంటుంది.</td>
          <td style="padding:10px;">ఇంటర్నల్ ఫీల్డ్స్, హెల్పర్ మెథడ్స్ (Default in classes)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:10px;"><code>protected</code></td>
          <td style="padding:10px;">అదే క్లాస్ మరియు దాని నుండి ఉద్భవించిన చైల్డ్ క్లాసుల్లో మాత్రమే.</td>
          <td style="padding:10px;">ఇన్‌హెరిటెన్స్ డిజైన్ కోసం</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:10px;"><code>internal</code></td>
          <td style="padding:10px;">అదే అసెంబ్లీ (.dll/.exe ప్రాజెక్ట్) లోపల మాత్రమే.</td>
          <td style="padding:10px;">లైబ్రరీ ఇంటర్నల్ ఇంప్లిమెంటేషన్ (Default for types)</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="section-title"><span class="num">3</span> C# Properties: Classic Getters/Setters vs Modern Properties</div>
<div class="section-body">
  <p>జావా (Java) వంటి భాషల్లో <code>getBalance()</code> మరియు <code>setBalance(val)</code> అని రెండు విడివిడి మెథడ్స్ రాస్తారు. కానీ C# లో <strong>Properties</strong> ఒకే చోట <code>get</code> మరియు <code>set</code> యాక్సెసర్స్ కలిగి ఉండి, బయటి ప్రపంచానికి సాధారణ ఫీల్డ్‌లా కనిపిస్తాయి.</p>

  <div class="code-block">
    <div class="code-header">
      <span>PropertyValidation.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class BankAccount
{
    // Private backing field
    private decimal _balance;

    // Full Property with Validation
    public decimal Balance
    {
        get => _balance;
        set
        {
            if (value < 0)
            {
                throw new ArgumentException("Balance cannot be negative!");
            }
            _balance = value;
        }
    }
}

class Program
{
    static void Main()
    {
        BankAccount acc = new BankAccount();
        acc.Balance = 1500m; // Calls 'set' accessor seamlessly
        Console.WriteLine($"Balance: {acc.Balance:C}"); // Calls 'get' accessor

        try
        {
            acc.Balance = -500m; // Throws ArgumentException!
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"Security Check: {ex.Message}");
        }
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span> Auto-Implemented Properties & C# 9+ init Accessors</div>
<div class="section-body">
  <p>ప్రత్యేకమైన వాలిడేషన్ అవసరం లేని సాధారణ ప్రాపర్టీల కోసం C# 3.0 లో <strong>Auto-Implemented Properties (<code>{ get; set; }</code>)</strong> ప్రవేశపెట్టబడ్డాయి. బ్యాక్‌గ్రౌండ్‌లో కంపైలరే ఒక సీక్రెట్ ప్రైవేట్ ఫీల్డ్‌ను మేనేజ్ చేస్తుంది.</p>

  <p><strong>init Accessor (C# 9+):</strong> ఆబ్జెక్ట్ తయారయ్యేటప్పుడు (Object Initializer లో) మాత్రమే విలువను సెట్ చేసి, ఆ తర్వాత ఎవరూ మార్చకుండా <strong>ఇమ్మ్యూటబుల్ (Immutable)</strong> గా లాక్ చేయడానికి <code>init</code> వాడతారు.</p>

  <div class="code-block">
    <div class="code-header">
      <span>AutoAndInitProperties.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Customer
{
    // Immutable ID: Can only be set during initialization!
    public int Id { get; init; }
    
    // Read-write Auto Property
    public string Name { get; set; }

    // Read-only externally, settable only inside this class
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
}

class Program
{
    static void Main()
    {
        // Object Initializer syntax
        Customer c = new Customer 
        { 
            Id = 1001, 
            Name = "Kavitha" 
        };

        c.Name = "Kavitha Rao"; // Allowed!
        // c.Id = 1002; // Compile Error! 'init' property cannot be modified after creation!
        
        Console.WriteLine($"Customer #{c.Id}: {c.Name} (Created: {c.CreatedAt:g})");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span> Computed (Calculated) Properties</div>
<div class="section-body">
  <p>మెమరీలో ప్రత్యేకంగా ఫీల్డ్ లేకుండా, ఇప్పటికే ఉన్న ఇతర ప్రాపర్టీల ఆధారంగా ఎప్పటికప్పుడు ఆటోమేటిక్‌గా లెక్కించబడే ప్రాపర్టీలను <strong>Computed Properties</strong> అంటారు. వీటి కోసం ఎక్స్‌ప్రెషన్ బాడీడ్ సింటాక్స్ అత్యద్భుతంగా సరిపోతుంది.</p>

  <div class="code-block">
    <div class="code-header">
      <span>ComputedProperty.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Rectangle
{
    public double Width { get; set; }
    public double Height { get; set; }

    // Computed Property (No backing field in memory)
    public double Area => Width * Height;
    public bool IsSquare => Width == Height;
}

class Program
{
    static void Main()
    {
        Rectangle rect = new Rectangle { Width = 10, Height = 5 };
        Console.WriteLine($"Area: {rect.Area}, Is Square? {rect.IsSquare}");

        rect.Height = 10;
        Console.WriteLine($"After change -> Is Square? {rect.IsSquare}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span> బిగినర్ తప్పులు & ఇంటర్వ్యూ FAQ</div>
<div class="section-body">
  <div style="background:#fee2e2; border-left:4px solid #ef4444; padding:14px 18px; border-radius:0 8px 8px 0; margin-bottom:16px;">
    <strong style="color:#b91c1c;">⚠️ ప్రమాదకరమైన తప్పు: Property Setter లో ఇన్ఫైనైట్ రికర్షన్ (StackOverflowException)</strong><br>
    <span style="font-size:13.5px; color:#475569;"><code>public int Age { get => _age; set => Age = value; }</code> అని రాస్తే, <code>set</code> లోపలే మళ్ళీ ప్రాపర్టీ <code>Age</code> ని కాల్ చేయడం వల్ల ఇన్ఫైనైట్ లూప్ ఏర్పడి వెంటనే <code>StackOverflowException</code> తో ప్రోగ్రామ్ పేలిపోతుంది! సెట్టర్ లోపల ఎల్లప్పుడూ ప్రైవేట్ బ్యాకింగ్ ఫీల్డ్ <code>_age = value;</code> కే కేటాయించాలి.</span>
  </div>

  <h3>తరచుగా అడిగే ప్రశ్నలు (FAQ):</h3>
  <ul>
    <li><strong><code>{ get; private set; }</code> మరియు <code>{ get; init; }</code> మధ్య తేడా ఏమిటి?</strong><br>
    <code>private set</code> ఉన్నప్పుడు క్లాస్ లోపలి మెథడ్స్ ఎప్పుడైనా వ్యాల్యూను మార్చవచ్చు. కానీ <code>init</code> వాడితే ఆబ్జెక్ట్ ఇనిషియలైజ్ అయిన తర్వాత ఆ క్లాస్ లోపలి మెథడ్స్ కూడా దాన్ని మార్చలేవు (True Immutability).</li>
    <li><strong>C# లో క్లాస్‌లకు డీఫాల్ట్ యాక్సెస్ మోడిఫైయర్ ఏమిటి?</strong><br>
    నేరుగా నేమ్‌స్పేస్‌లో రాసే క్లాస్‌లకు డీఫాల్ట్‌గా <code>internal</code> ఉంటుంది. అదే క్లాస్ లోపల ఉండే ఫీల్డ్స్ మరియు మెథడ్స్‌కు డీఫాల్ట్‌గా <code>private</code> ఉంటుంది.</li>
  </ul>
</div>
`;

// CHAPTER 15: Inheritance & Polymorphism (virtual, override, sealed)
const ch15Content = `
<div class="intro-box">
  సాఫ్ట్‌వేర్ అభివృద్ధిలో కోడ్‌ను మళ్ళీ మళ్ళీ రాయకుండా (DRY - Don't Repeat Yourself), ఇప్పటికే ఉన్న క్లాస్ లక్షణాలను మరొక క్లాస్‌కు వారసత్వంగా అందించే పద్ధతినే <strong>Inheritance (ఇన్‌హెరిటెన్స్)</strong> అంటారు. దీనితో పాటు, ఒకే యాక్షన్ వివిధ ఆబ్జెక్ట్‌లలో వివిధ రూపాల్లో ప్రవర్తించేలా చేయడాన్ని <strong>Polymorphism (పాలిమార్ఫిజం)</strong> అంటారు. C# లో రన్‌టైమ్ పాలిమార్ఫిజం కోసం <code>virtual</code>, <code>override</code>, మరియు ఇన్‌హెరిటెన్స్‌ను నిరోధించడానికి <code>sealed</code> కీవర్డ్స్ ఎలా పనిచేస్తాయో ఈ అధ్యాయంలో నేర్చుకుందాం.
</div>

<div class="section-title"><span class="num">1</span> ఇన్‌హెరిటెన్స్ పునాది: Base & Derived Classes</div>
<div class="section-body">
  <p>C# లో ఒక క్లాస్ మరొక క్లాస్ నుండి వారసత్వం పొందడానికి కోలన్ (<code>:</code>) సింటాక్స్ వాడతారు. లక్షణాలను ఇచ్చే క్లాస్‌ను <strong>Base Class (Parent)</strong> అని, లక్షణాలను స్వీకరించే క్లాస్‌ను <strong>Derived Class (Child)</strong> అని పిలుస్తారు.</p>

  <p><strong>సింగిల్ క్లాస్ ఇన్‌హెరిటెన్స్:</strong> C# లో ఒక క్లాస్ ఒకే ఒక బేస్ క్లాస్ నుండి మాత్రమే వారసత్వం పొందగలదు (Multiple Class Inheritance అనుమతించబడదు, దీనివల్ల వచ్చే డైమండ్ ప్రాబ్లమ్‌ను నివారించడానికి .NET ఇంటర్‌ఫేసెస్ వాడుతుంది). అయితే .NET లోని అన్ని క్లాసులకు <strong><code>System.Object</code></strong> అనేది అల్టిమేట్ రూట్ బేస్ క్లాస్.</p>

  <div class="code-block">
    <div class="code-header">
      <span>InheritanceBasics.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

// Base Class (Parent)
class Animal
{
    public string Name { get; set; }

    public void Sleep() => Console.WriteLine($"{Name} is sleeping... Zzz");
}

// Derived Class (Child inherits Animal)
class Dog : Animal
{
    public void Bark() => Console.WriteLine($"{Name} says: Woof! Woof!");
}

class Program
{
    static void Main()
    {
        Dog myDog = new Dog();
        myDog.Name = "Snoopy"; // Inherited property from Animal!
        myDog.Sleep();         // Inherited method from Animal!
        myDog.Bark();          // Dog's own method!
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span> base కీవర్డ్ & Base Constructor చైనింగ్</div>
<div class="section-body">
  <p>చైల్డ్ క్లాస్ ఆబ్జెక్ట్ తయారైనప్పుడు, చైల్డ్ కన్‌స్ట్రక్టర్ కంటే ముందే బేస్ క్లాస్ కన్‌స్ట్రక్టర్ రన్ అవుతుంది. బేస్ క్లాస్‌కు అవసరమైన పారామీటర్లను పంపించడానికి <strong><code>base(...)</code></strong> కీవర్డ్ ఉపయోగిస్తాం.</p>

  <div class="code-block">
    <div class="code-header">
      <span>BaseConstructorDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Vehicle
{
    public string Brand { get; }
    public Vehicle(string brand)
    {
        Brand = brand;
        Console.WriteLine($"1. Vehicle Constructor initialized for {Brand}");
    }
}

class Car : Vehicle
{
    public int MaxSpeed { get; }
    // Calling base class constructor
    public Car(string brand, int maxSpeed) : base(brand)
    {
        MaxSpeed = maxSpeed;
        Console.WriteLine($"2. Car Constructor initialized: {MaxSpeed} km/h");
    }
}

class Program
{
    static void Main()
    {
        Car myCar = new Car("Tata", 180);
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span> Polymorphism: virtual, override & V-Table డిస్పాచ్</div>
<div class="section-body">
  <p>పేరెంట్ క్లాస్‌లోని ఒక మెథడ్‌ను చైల్డ్ క్లాస్ తన సొంత లాజిక్‌తో మార్చుకోవడానికి (Override చేయడానికి) C# రన్‌టైమ్ పాలిమార్ఫిజంను అందిస్తుంది:</p>
  <ul>
    <li><strong><code>virtual</code> కీవర్డ్:</strong> బేస్ క్లాస్‌లో మెథడ్‌కు <code>virtual</code> అని పెడితే, "ఈ మెథడ్‌ను చైల్డ్ క్లాసులు తమ ఇష్టం వచ్చినట్లు మార్చుకోవచ్చు" అని అర్థం.</li>
    <li><strong><code>override</code> కీవర్డ్:</strong> డిరైవ్డ్ క్లాస్‌లో ఆ మెథడ్‌ను రీడిఫైన్ చేయడానికి <code>override</code> కీవర్డ్ తప్పనిసరి.</li>
  </ul>

  <p><strong>V-Table (Virtual Method Table):</strong> రన్‌టైమ్‌లో CLR ఆబ్జెక్ట్ యొక్క వాస్తవ టైప్‌ను బట్టి సరైన మెథడ్‌ను ఎగ్జిక్యూట్ చేస్తుంది. దీనివల్ల బేస్ క్లాస్ రిఫరెన్స్‌తో చైల్డ్ ఆబ్జెక్ట్‌ను కాల్ చేసినా చైల్డ్ మెథడే రన్ అవుతుంది!</p>

  <div class="code-block">
    <div class="code-header">
      <span>PolymorphismInAction.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;
using System.Collections.Generic;

class Employee
{
    public string Name { get; set; }
    public virtual decimal CalculateSalary() => 20000m;
}

class Developer : Employee
{
    public decimal CodingBonus { get; set; } = 15000m;
    public override decimal CalculateSalary() => base.CalculateSalary() + CodingBonus;
}

class Manager : Employee
{
    public override decimal CalculateSalary() => 55000m;
}

class Program
{
    static void Main()
    {
        // Polymorphic Collection
        List<Employee> team = new List<Employee>
        {
            new Employee { Name = "Ravi" },
            new Developer { Name = "Sneha" },
            new Manager { Name = "Arun" }
        };

        foreach (Employee emp in team)
        {
            // Dynamic Dispatch: Calls the right overridden method at runtime!
            Console.WriteLine($"{emp.Name} Salary: {emp.CalculateSalary():C}");
        }
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span> Method Hiding (new) vs Overriding (override)</div>
<div class="section-body">
  <p>ఇంటర్వ్యూలలో అత్యంత ప్రాచుర్యం పొందిన ప్రశ్న: <code>override</code> మరియు <code>new</code> మధ్య తేడా ఏమిటి?</p>
  <ul>
    <li><strong><code>override</code>:</strong> బేస్ క్లాస్ రిఫరెన్స్ వాడినా చైల్డ్ క్లాస్ మెథడే రన్ అవుతుంది (True Runtime Polymorphism).</li>
    <li><strong><code>new</code> (Method Hiding):</strong> పాలిమార్ఫిజం తెగిపోతుంది. బేస్ క్లాస్ రిఫరెన్స్‌తో పిలిస్తే బేస్ మెథడ్ రన్ అవుతుంది; కేవలం చైల్డ్ క్లాస్ రిఫరెన్స్‌తో పిలిచినప్పుడు మాత్రమే కొత్త మెథడ్ రన్ అవుతుంది.</li>
  </ul>

  <div class="code-block">
    <div class="code-header">
      <span>OverrideVsNew.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

class Parent
{
    public virtual void Show() => Console.WriteLine("Parent Show");
}

class ChildA : Parent
{
    public override void Show() => Console.WriteLine("ChildA (Override) Show");
}

class ChildB : Parent
{
    public new void Show() => Console.WriteLine("ChildB (New/Hidden) Show");
}

class Program
{
    static void Main()
    {
        Parent p1 = new ChildA();
        p1.Show(); // Prints: "ChildA (Override) Show" (Polymorphic!)

        Parent p2 = new ChildB();
        p2.Show(); // Prints: "Parent Show" (Hiding broke polymorphism!)
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span> sealed కీవర్డ్: ఇన్‌హెరిటెన్స్ నిరోధించడం</div>
<div class="section-body">
  <p>సెక్యూరిటీ లేదా పెర్ఫార్మెన్స్ కారణాల రీత్యా ఒక క్లాస్‌ను మరెవరూ ఇన్‌హెరిట్ చేసుకోకుండా ఆపడానికి <strong><code>sealed</code></strong> కీవర్డ్ వాడతారు. ఉదాహరణకు .NET లోని <code>System.String</code> క్లాస్ ఒక <code>sealed</code> క్లాస్.</p>

  <p><strong>JIT ఆప్టిమైజేషన్:</strong> ఒక క్లాస్ <code>sealed</code> అయినప్పుడు, వర్చువల్ మెథడ్ కాల్స్ అవసరం లేదని JIT కంపైలర్‌కు తెలుస్తుంది. దీనివల్ల డైరెక్ట్ మెథడ్ ఇన్లైనింగ్ జరిగి అప్లికేషన్ వేగం పెరుగుతుంది.</p>

  <div class="code-block">
    <div class="code-header">
      <span>SealedDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

// Nobody can inherit from SecurityVault!
sealed class SecurityVault
{
    public void OpenSafe() => Console.WriteLine("Vault unlocked safely.");
}

// class HackerVault : SecurityVault {} // Compile Error: Cannot inherit from sealed class!

class Program
{
    static void Main()
    {
        SecurityVault vault = new SecurityVault();
        vault.OpenSafe();
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span> బిగినర్ తప్పులు & ఇంటర్వ్యూ FAQ</div>
<div class="section-body">
  <div style="background:#fee2e2; border-left:4px solid #ef4444; padding:14px 18px; border-radius:0 8px 8px 0; margin-bottom:16px;">
    <strong style="color:#b91c1c;">⚠️ ప్రమాదకరమైన తప్పు: override రాయడం మర్చిపోయి వార్నింగ్ రావడం</strong><br>
    <span style="font-size:13.5px; color:#475569;">చైల్డ్ క్లాస్‌లో బేస్ క్లాస్ మెథడ్ పేరు రాసి <code>override</code> కీవర్డ్ పెట్టకపోతే కంపైలర్ <code>CS0114</code> వార్నింగ్ ఇస్తుంది మరియు ఆటోమేటిక్‌గా <code>new</code> (Hiding) గా పరిగణిస్తుంది. దీనివల్ల పాలిమార్ఫిక్ కాల్స్ పని చేయవు.</span>
  </div>

  <h3>తరచుగా అడిగే ప్రశ్నలు (FAQ):</h3>
  <ul>
    <li><strong>C# లో Multiple Inheritance ఎందుకు లేదు?</strong><br>
    రెండు వేర్వేరు పేరెంట్ క్లాసుల్లో ఒకే పేరుతో మెథడ్స్ ఉన్నప్పుడు చైల్డ్ క్లాస్‌కు ఏది రావాలో తెలియని డెడ్‌లాక్ (Diamond Problem) వస్తుంది. దీని నివారణకు C# మల్టిపుల్ ఇంటర్‌ఫేసెస్‌ను మాత్రమే అనుమతిస్తుంది.</li>
    <li><strong>కన్‌స్ట్రక్టర్లను override చేయవచ్చా?</strong><br>
    లేదు! కన్‌స్ట్రక్టర్లు ఇన్‌హెరిట్ అవ్వవు, కాబట్టి వాటిని ఓవర్‌రైడ్ చేయడం సాధ్యం కాదు. కేవలం <code>base(...)</code> ద్వారా కాల్ చేయవచ్చు.</li>
  </ul>
</div>
`;

// CHAPTER 16: Interfaces, Abstract Classes & C# Records
const ch16Content = `
<div class="intro-box">
  లార్జ్-స్కేల్ ఎంటర్‌ప్రైజ్ సాఫ్ట్‌వేర్ ఆర్కిటెక్చర్‌లో కోడ్‌ను విడదీసి (Decoupling) నిర్వహించడానికి <strong>Abstract Classes</strong> మరియు <strong>Interfaces</strong> గుండెకాయ లాంటివి. వీటితో పాటు, ఆధునిక C# లో డేటాను ఇమ్మ్యూటబుల్‌గా మరియు సురక్షితంగా నిర్వహించడానికి C# 9+ లో ప్రవేశపెట్టబడిన <strong><code>record</code></strong> టైప్స్ విప్లవాత్మక మార్పు తెచ్చాయి. ఈ అధ్యాయంలో అబ్‌స్ట్రాక్షన్, మల్టిపుల్ ఇంటర్‌ఫేస్ ఇంప్లిమెంటేషన్ మరియు రికార్డ్స్ యొక్క Value Equality మెకానిజమ్స్‌ను లోతుగా నేర్చుకుందాం.
</div>

<div class="section-title"><span class="num">1</span> Abstract Classes & Abstract Methods: అసంపూర్ణ బ్లూప్రింట్</div>
<div class="section-body">
  <p><strong><code>abstract</code> class:</strong> దీనికి నేరుగా <code>new</code> ఆపరేటర్ ద్వారా ఆబ్జెక్ట్‌ను క్రియేట్ చేయలేము (ఉదా: <code>new Shape()</code> కుదరదు). ఇది చైల్డ్ క్లాసులకు ఒక కామన్ బేస్ క్లాస్‌గా మాత్రమే ఉపయోగపడుతుంది.</p>
  <p><strong><code>abstract</code> method:</strong> దీనికి బాడీ (ఇంప్లిమెంటేషన్) ఉండదు. చైల్డ్ క్లాసులు తప్పనిసరిగా <code>override</code> కీవర్డ్ వాడి బాడీని రాసి తీరాలి.</p>

  <div class="code-block">
    <div class="code-header">
      <span>AbstractShapeDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

abstract class Shape
{
    public string Color { get; set; } = "Red";

    // Abstract method: MUST be implemented by child classes
    public abstract double GetArea();

    // Regular concrete method: Can be directly shared
    public void Display() => Console.WriteLine($"Shape [{Color}] -> Area = {GetArea():F2}");
}

class Circle : Shape
{
    public double Radius { get; set; }
    public Circle(double radius) => Radius = radius;

    public override double GetArea() => Math.PI * Radius * Radius;
}

class Program
{
    static void Main()
    {
        Shape s = new Circle(5.0);
        s.Display();
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span> Interfaces (interface): సంపూర్ణ కాంట్రాక్ట్ & Multiple Implementation</div>
<div class="section-body">
  <p>ఇంటర్‌ఫేస్ అనేది క్లాస్ పాటించాల్సిన నియమాలను నిర్దేశించే ఒక <strong>కాంట్రాక్ట్ (Contract)</strong>. ఇంటర్‌ఫేస్‌లో ఏ మెథడ్స్, ప్రాపర్టీస్ ఉండాలో డిక్లేర్ చేస్తాం తప్ప వాటికి సొంత స్టేట్ (ఇన్స్టాన్స్ ఫీల్డ్స్) ఉండదు.</p>

  <p>C# లో ఒక క్లాస్ ఎన్ని ఇంటర్‌ఫేస్‌లనైనా ఇంప్లిమెంట్ చేసుకోవచ్చు (Multiple Interface Implementation). .NET నేమింగ్ కన్వెన్షన్ ప్రకారం ఇంటర్‌ఫేస్ పేరు ఎల్లప్పుడూ <strong><code>I</code></strong> తో మొదలవ్వాలి (ఉదా: <code>IDisposable</code>, <code>ILogger</code>, <code>IPaymentGateway</code>).</p>

  <div class="code-block">
    <div class="code-header">
      <span>MultipleInterfaces.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

interface IPrintable
{
    void Print();
}

interface ISerializable
{
    string ToJson();
}

// Class implementing multiple interfaces
class Invoice : IPrintable, ISerializable
{
    public int InvoiceNumber { get; set; }
    public decimal Amount { get; set; }

    public void Print() => Console.WriteLine($"Printing Invoice #{InvoiceNumber}: {Amount:C}");

    public string ToJson() => $"{{\"id\": {InvoiceNumber}, \"amount\": {Amount}}}";
}

class Program
{
    static void Main()
    {
        Invoice inv = new Invoice { InvoiceNumber = 501, Amount = 1250m };
        inv.Print();
        Console.WriteLine($"JSON Payload: {inv.ToJson()}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span> Abstract Class vs Interface: ఆర్కిటెక్చరల్ నిర్ణయం</div>
<div class="section-body">
  <div style="overflow-x:auto;">
    <table style="width:100%; border-collapse:collapse; margin-top:12px; font-size:13.5px;">
      <thead>
        <tr style="background:var(--bg3); border-bottom:2px solid var(--border);">
          <th style="padding:10px; text-align:left;">ఫీచర్</th>
          <th style="padding:10px; text-align:left;">Abstract Class</th>
          <th style="padding:10px; text-align:left;">Interface</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:10px;">సంబంధం (Relationship)</td>
          <td style="padding:10px;"><strong>IS-A</strong> (Dog is an Animal)</td>
          <td style="padding:10px;"><strong>CAN-DO</strong> (Car can be Serialized)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:10px;">Multiple Inheritance</td>
          <td style="padding:10px;">కుదరదు (ఒక్క బేస్ క్లాస్ మాత్రమే)</td>
          <td style="padding:10px;">సాధ్యం (ఎన్ని ఇంటర్‌ఫేసులైనా చేయవచ్చు)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border);">
          <td style="padding:10px;">Fields & State</td>
          <td style="padding:10px;">ఇన్స్టాన్స్ ఫీల్డ్స్ మరియు స్టేట్ ఉండవచ్చు</td>
          <td style="padding:10px;">ఇన్స్టాన్స్ ఫీల్డ్స్ ఉండకూడదు</td>
        </tr>
        <tr>
          <td style="padding:10px;">కన్‌స్ట్రక్టర్లు</td>
          <td style="padding:10px;">కన్‌స్ట్రక్టర్లు ఉండవచ్చు</td>
          <td style="padding:10px;">కన్‌స్ట్రక్టర్లు ఉండవు</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="section-title"><span class="num">4</span> Modern C# Records: Value Equality & Immutability</div>
<div class="section-body">
  <p>సాధారణ C# క్లాసుల్లో రెండు వేర్వేరు ఆబ్జెక్టులు ఒకే డేటాను కలిగి ఉన్నా, <code>==</code> తో పోల్చినప్పుడు మెమరీ అడ్రస్ ఆధారంగా <code>false</code> వస్తుంది. దీనికి విరుద్ధంగా, C# 9+ లో వచ్చిన <strong><code>record</code></strong> టైప్స్ విలువల సమానత్వాన్ని (<strong>Value-based Equality</strong>) ఆధారం చేసుకుంటాయి.</p>

  <p>ఒకే ఒక్క లైన్‌లో ఇమ్మ్యూటబుల్ డేటా ఆబ్జెక్ట్‌ను డిక్లేర్ చేయడానికి <strong>Positional Record</strong> సింటాక్స్ వాడతాం. అదనంగా <strong><code>with</code> expression</strong> ద్వారా ఉన్న రికార్డును మార్చకుండా కొత్త కాపీని సృష్టించవచ్చు (Nondestructive Mutation).</p>

  <div class="code-block">
    <div class="code-header">
      <span>RecordDemo.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

// Single line immutable record declaration
record Person(string FirstName, string LastName, int Age);

class Program
{
    static void Main()
    {
        Person p1 = new Person("Rajesh", "Sharma", 30);
        Person p2 = new Person("Rajesh", "Sharma", 30);

        // 1. Value-based Equality check
        Console.WriteLine($"Are p1 and p2 equal? {p1 == p2}"); // True! (In class it would be false)

        // 2. Built-in Pretty ToString()
        Console.WriteLine(p1); // Person { FirstName = Rajesh, LastName = Sharma, Age = 30 }

        // 3. Nondestructive Mutation with 'with' keyword
        Person p3 = p1 with { Age = 31 };
        Console.WriteLine($"Original: {p1.Age}, Updated Copy: {p3.Age}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span> రియల్-వరల్డ్ కేస్ స్టడీ: పేమెంట్ గేట్‌వే ప్రాసెసర్ (Dependency Injection పునాది)</div>
<div class="section-body">
  <p>వాస్తవ ASP.NET Core ప్రాజెక్టులలో ఇంటర్‌ఫేసెస్ వాడి లూజ్ కప్లింగ్ (Loose Coupling) ఎలా సాధిస్తారో పరిశీలిద్దాం:</p>

  <div class="code-block">
    <div class="code-header">
      <span>PaymentServiceArchitecture.cs</span>
      <a href="/online-csharp-compiler.html" target="_blank" class="run-btn">⚡ Try in C# Compiler</a>
    </div>
    <pre><code>using System;

interface IPaymentGateway
{
    bool ProcessPayment(decimal amount);
}

class UpiPayment : IPaymentGateway
{
    public bool ProcessPayment(decimal amount)
    {
        Console.WriteLine($"[UPI] Processing payment of {amount:C} via GooglePay");
        return true;
    }
}

class CreditCardPayment : IPaymentGateway
{
    public bool ProcessPayment(decimal amount)
    {
        Console.WriteLine($"[Card] Processing payment of {amount:C} via Visa/MasterCard");
        return true;
    }
}

class OrderService
{
    private readonly IPaymentGateway _gateway;
    public OrderService(IPaymentGateway gateway) => _gateway = gateway;

    public void Checkout(decimal total) => _gateway.ProcessPayment(total);
}

class Program
{
    static void Main()
    {
        // Effortlessly swap payment modes without touching OrderService!
        OrderService order1 = new OrderService(new UpiPayment());
        order1.Checkout(499m);

        OrderService order2 = new OrderService(new CreditCardPayment());
        order2.Checkout(2499m);
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span> బిగినర్ తప్పులు & ఇంటర్వ్యూ FAQ</div>
<div class="section-body">
  <div style="background:#fee2e2; border-left:4px solid #ef4444; padding:14px 18px; border-radius:0 8px 8px 0; margin-bottom:16px;">
    <strong style="color:#b91c1c;">⚠️ ప్రమాదకరమైన తప్పు: ఇంటర్‌ఫేస్ ఇంప్లిమెంట్ చేసేటప్పుడు public పెట్టకపోవడం</strong><br>
    <span style="font-size:13.5px; color:#475569;">ఒక క్లాస్‌లో ఇంటర్‌ఫేస్ మెథడ్‌ను ఇంప్లిమెంట్ చేసేటప్పుడు కచ్చితంగా <code>public</code> అని రాయాలి. ఎందుకంటే ఇంటర్‌ఫేస్ కాంట్రాక్ట్ ఎల్లప్పుడూ పబ్లిక్ అయి ఉండాలి. <code>public</code> మిస్ అయితే కంపైలర్ ఎర్రర్ ఇస్తుంది.</span>
  </div>

  <h3>తరచుగా అడిగే ప్రశ్నలు (FAQ):</h3>
  <ul>
    <li><strong>Record మరియు Class మధ్య ప్రధాన తేడా ఏమిటి?</strong><br>
    Class రిఫరెన్స్ ఆధారంగా సమానత్వాన్ని (Reference Equality) కొలుస్తుంది. Record విలువల ఆధారంగా సమానత్వాన్ని (Value Equality) కొలుస్తుంది మరియు డిఫాల్ట్‌గా ఇమ్మ్యూటబుల్ ప్రాపర్టీలను అందిస్తుంది.</li>
    <li><strong>C# లో Default Interface Methods అంటే ఏమిటి?</strong><br>
    C# 8.0 నుండి ఇంటర్‌ఫేస్‌లలో కూడా డీఫాల్ట్ బాడీతో కూడిన మెథడ్స్ రాయవచ్చు. దీనివల్ల పాత క్లాసులను బ్రేక్ చేయకుండా ఇంటర్‌ఫేస్‌కు కొత్త ఫీచర్లు జోడించవచ్చు.</li>
  </ul>
</div>
`;

const phase4Updates = [
  { num: 13, content: ch13Content },
  { num: 14, content: ch14Content },
  { num: 15, content: ch15Content },
  { num: 16, content: ch16Content }
];

phase4Updates.forEach(item => {
  const lessonMeta = LESSONS.find(l => l.num === item.num);
  if (!lessonMeta) {
    console.error(`Lesson ${item.num} not found in curriculum data!`);
    return;
  }
  lessonMeta.contentHtml = item.content;
  const fullHtml = generatePageHtml(lessonMeta);
  const targetPath = path.join(csharpDir, lessonMeta.file);
  fs.writeFileSync(targetPath, fullHtml, 'utf8');
  console.log(`✅ Fully enriched C# Phase 4 Lesson ${item.num} : ${lessonMeta.file} (${fullHtml.length} chars)`);
});

