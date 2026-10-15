// Phase 7: Object-Oriented Programming (OOP) Data
module.exports = [
  // =========================================================================
  // CHAPTER 30: PYTHON CLASSES, OBJECTS & __INIT__
  // =========================================================================
  {
    num: 30,
    phaseId: 'phase7',
    phaseTitle: 'Phase 7: Object-Oriented Programming',
    slug: '30-python-oop-classes-objects-and-init',
    title: 'Python Classes, Objects & __init__ (తెలుగులో)',
    badge: '30. Classes & Objects',
    subtopics: 'OOP Concepts · Class Blueprint vs Object Instance · __init__() Constructor · self Parameter · Instance vs Class Variables',
    desc: 'పైథాన్ లో Object-Oriented Programming (OOP) అంటే ఏమిటి? Classes, Objects, __init__ కన్స్ట్రక్టర్, మరియు self పారామీటర్ గురించి పూర్తి వివరాలు తెలుసుకుందాం.',
    sections: [
      {
        title: '1. OOP అంటే ఏమిటి? Procedural vs Object-Oriented',
        body: `<p><strong>Object-Oriented Programming (OOP)</strong> అనేది కోడ్ రాసే ఒక స్టైల్. ఇందులో మనం డేటాని మరియు ఆ డేటా పైన పనిచేసే ఫంక్షన్స్ ని కలిపి ఒకే <strong>"Object"</strong> లాగా తయారుచేస్తాం.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">మామూలు కోడింగ్ కి, OOP కి తేడా:</h4>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Feature</th><th>Procedural Programming</th><th>Object-Oriented (OOP)</th></tr>
          <tr><td><strong>ఫోకస్</strong></td><td>స్టెప్-బై-స్టెప్ లాజిక్ మరియు ఫంక్షన్స్ పైన ఉంటుంది.</td><td>రియల్ వరల్డ్ ఆబ్జెక్ట్స్ (కార్, యూజర్, అకౌంట్) పైన ఉంటుంది.</td></tr>
          <tr><td><strong>డేటా</strong></td><td>వేరియబుల్స్ ఒక దగ్గర, ఫంక్షన్స్ ఒక దగ్గర ఉంటాయి. విడివిడిగా.</td><td>డేటా మరియు మెథడ్స్ <strong>కలిసి ఒకే చోట ప్యాక్ అయి</strong> ఉంటాయి.</td></tr>
          <tr><td><strong>సెక్యూరిటీ</strong></td><td>గ్లోబల్ వేరియబుల్స్ వాడటం వల్ల ఎవరు ఏ డేటాని మారుస్తున్నారో కనుక్కోవడం కష్టం.</td><td>ఎవరి డేటా వారిదే (Encapsulation ద్వారా లాక్ చేయొచ్చు).</td></tr>
        </table>
        <p><strong>Blueprint లాజిక్:</strong> ఒక <strong>Class</strong> అనేది ఇల్లు కట్టడానికి వాడే బ్లూప్రింట్ (ప్లాన్) లాంటిది. ఇల్లు కట్టకముందు దానికంటూ ఒక షేప్ ఉండదు. ఆ ప్లాన్ ని చూసి మనం రియల్ గా ఒక ఇల్లు కడితే, ఆ కట్టిన ఇంటిని <strong>Object (లేదా Instance)</strong> అంటారు!</p>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  Class Blueprint (ప్లాన్): BankAccount                   │
│  ├── ఏముంటాయి?: owner, balance                         │
│  └── ఏం చేయగలవు?: deposit(), withdraw()                │
└───────────────────────────┬────────────────────────────┘
                            │  [అకౌంట్ క్రియేట్ చేద్దాం: Account("Ravi", 5000)]
                            ▼
┌────────────────────────────────────────────────────────┐
│  రియల్ Object (కంప్యూటర్ మెమరీలో):                     │
│  ├── owner = "Ravi"                                    │
│  └── balance = 5000                                    │
└────────────────────────────────────────────────────────┘</div>`,
        code: `# మన ఫస్ట్ Class క్రియేట్ చేసి దానినుంచి Objects తయారుచేద్దాం:
class Car:
    """కార్ కి సంబంధించిన బ్లూప్రింట్."""
    
    # ఎప్పుడైతే కొత్త కార్ క్రియేట్ చేస్తామో, అప్పుడు ఈ __init__ ఆటోమాటిక్ గా రన్ అవుతుంది:
    def __init__(self, brand, model, year):
        self.brand = brand  # ఇవన్నీ ఏ కార్ కి ఆ కార్ కే ఉంటాయి
        self.model = model  
        self.year = year    
        self.is_running = False

    # కార్ స్టార్ట్ చేయడానికి ఒక మెథడ్ (ఫంక్షన్):
    def start_engine(self):
        self.is_running = True
        return f"🚗 {self.brand} {self.model} ఇంజిన్ స్టార్ట్ అయింది! వ్రూమ్!"

# ఈ బ్లూప్రింట్ నుంచి రెండు రియల్ కార్స్ (Objects) క్రియేట్ చేద్దాం:
car1 = Car("Tesla", "Model 3", 2024)
car2 = Car("Toyota", "Supra", 2023)

print("Car 1 Brand:", car1.brand, "| Model:", car1.model)
print("Car 2 Brand:", car2.brand, "| Model:", car2.model)
print(car1.start_engine())`,
        codeTitle: 'Example 1: Defining a Class and Instantiating Objects',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 గమనించారా?:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>class Car:</code> అనేది బ్లూప్రింట్ ని క్రియేట్ చేసింది.</li>
            <li><code>Car("Tesla", ...)</code> అని పిలవగానే <code>__init__</code> రన్ అయ్యి, దానికి మెమరీ ఇచ్చింది.</li>
            <li><code>car1</code> కి, <code>car2</code> కి సంబంధం లేదు. ఎవరి బ్రాండ్ వాళ్లదే!</li>
          </ul>
        </div>`
      },
      {
        title: '2. __init__() Constructor & self ఎందుకు వాడాలి?',
        body: `<p>పైథాన్ లో <strong><code>__init__()</code></strong> అనేది ఒక స్పెషల్ మెథడ్ (దీన్నే కన్స్ట్రక్టర్ అంటారు). మీరు క్లాస్ పేరుతో ఎప్పుడైతే పిలుస్తారో, వెంటనే పైథాన్ ఈ ఫంక్షన్ ని రన్ చేసి మీరు ఇచ్చిన వాల్యూస్ ని వేరియబుల్స్ కి అటాచ్ చేస్తుంది.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;"><code>self</code> అంటే ఏంటి?</h4>
        <p><code>self</code> అంటే <strong>"ఇప్పుడు ఏ ఆబ్జెక్ట్ నన్ను పిలుస్తోంది?"</strong> అని అర్థం. ఉదాహరణకి మీరు <code>account1.deposit(500)</code> అని రాస్తే, పైథాన్ లోపల దాన్ని <code>BankAccount.deposit(account1, 500)</code> లాగా మార్చుకుంటుంది!</p>
        <div class="diagram-box">మనం రాసేది:    account1.show_balance()
పైథాన్ చేసేది: BankAccount.show_balance(account1)  <-- ఇక్కడ 'account1' యే self అన్నమాట!</div>
        <p>పైథాన్ బై-డిఫాల్ట్ గా ఆ ఆబ్జెక్ట్ ని ఫస్ట్ పారామీటర్ గా పంపిస్తుంది కాబట్టి, మనం క్లాస్ లోపల రాసే ప్రతి ఫంక్షన్ కీ ఫస్ట్ <code>self</code> కచ్చితంగా రాయాలి.</p>`,
        code: `# BankAccount క్లాస్ డెమో:
class BankAccount:
    def __init__(self, owner, balance):
        # self ద్వారా ఇవి పర్మనెంట్ గా ఆబ్జెక్ట్ కి అతుక్కుపోతాయి:
        self.owner = owner
        self.balance = float(balance)

    def deposit(self, amount):
        if amount <= 0:
            print("❌ పాజిటివ్ అమౌంట్ ఇవ్వండి!")
            return
        self.balance += amount
        print(f"✅ {self.owner} అకౌంట్ లోకి ₹{amount:,.2f} వేశారు.")

    def show_balance(self):
        print(f"💳 Account: {self.owner} | Balance: ₹{self.balance:,.2f}")

# అకౌంట్ క్రియేట్ చేసి వాడటం:
account = BankAccount("Ravi", 5000)
account.show_balance()
account.deposit(1000)
account.show_balance()`,
        codeTitle: 'Example 2: BankAccount Class with __init__ and self',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 self లేకపోతే ఏమవుతుంది?:</strong>
          <p style="margin-top:6px;">ఒకవేళ మీరు <code>balance = amount</code> అని ఊరికే రాస్తే, అది ఒక టెంపరరీ వేరియబుల్ అవుతుంది, ఫంక్షన్ అవ్వగానే డిలీట్ అవుతుంది. <code>self.balance</code> అని రాస్తేనే అది అకౌంట్ తో పాటు ఎప్పటికీ సేవ్ అయి ఉంటుంది.</p>
        </div>`
      },
      {
        title: '3. Instance Variables vs Class Variables',
        body: `<p>OOP లో వేరియబుల్స్ రెండు రకాలుగా ఉంటాయి, ఇది తెలియకపోతే చాలా బగ్స్ వస్తాయి:</p>
        <ul>
          <li><strong>Instance Variables (<code>self.name</code>):</strong> <code>__init__</code> లోపల <code>self</code> వాడి రాసేవి. ఇవి ఎవరివి వాళ్ళకే ఉంటాయి. (ఉదా: ఒక ఎంప్లాయీ జీతం, ఇంకో ఎంప్లాయీ జీతం వేరుగా ఉంటాయి).</li>
          <li><strong>Class Variables:</strong> క్లాస్ లోపల (ఫంక్షన్స్ కి బయట) డైరెక్ట్ గా రాసేవి. <strong>వీటికి కంప్యూటర్ లో ఒకే ఒక్క మెమరీ ఉంటుంది</strong>, ఆ క్లాస్ కి సంబంధించిన ఆబ్జెక్ట్స్ అన్నీ ఆ ఒక్క దన్నే షేర్ చేసుకుంటాయి.</li>
        </ul>`,
        code: `class Employee:
    # 1. Class Variable (అందరికీ కలిపి ఒకటే ఉంటుంది):
    company_name = "Tech Innovations Ltd"
    total_employees_count = 0

    def __init__(self, name, department, salary):
        # 2. Instance Variables (ఎవరికి వారు సెపరేట్):
        self.name = name
        self.department = department
        self.salary = salary
        
        # కౌంట్ ని పెంచుదాం (ఇది క్లాస్ వేరియబుల్):
        Employee.total_employees_count += 1

    def get_details(self):
        return f"• {self.name:8} ({self.department}) | Salary: ₹{self.salary:,} | Company: {self.company_name}"

# ఎంప్లాయీస్ ని క్రియేట్ చేద్దాం:
emp1 = Employee("Balaji", "Backend", 95000)
emp2 = Employee("Alex", "DevOps", 82000)
emp3 = Employee("Chloe", "AI/ML", 105000)

print(emp1.get_details())
print(emp2.get_details())
print(emp3.get_details())
print(f"\\n🏢 మొత్తం ఎంప్లాయీస్: {Employee.total_employees_count}")`,
        codeTitle: 'Example 3: Instance Variables vs Shared Class Variables',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 లాజిక్:</strong>
          <p style="margin-top:6px;">మీరు <code>emp1.company_name</code> అని అడిగితే, ఫస్ట్ అది <code>emp1</code> లోపల వెతుకుతుంది. అక్కడ లేకపోతే, అప్పుడు వెళ్లి క్లాస్ వేరియబుల్స్ లో వెతుకుతుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Class Variable ని ఒక Object ద్వారా మార్చడం',
      text: 'మీరు emp1.company_name = "NewCorp" అని రాస్తే, కంపెనీ పేరు అందరికీ మారదు! emp1 కి మాత్రమే ఒక కొత్త టెంపరరీ వేరియబుల్ యాడ్ అవుతుంది. అందరికీ మారాలంటే క్లాస్ పేరుతోనే మార్చాలి: Employee.company_name = "NewCorp".'
    },
    tryIt: {
      desc: 'ఒక Book క్లాస్ రాయండి. అందులో title, author, price ఉండాలి. apply_discount(percent) అనే మెథడ్ వాడి, ఎంత పర్సెంట్ ఇస్తే అంత రేటు తగ్గించాలి.',
      code: `class Book:
    def __init__(self, title, author, price):
        self.title = title
        self.author = author
        self.price = price

    def apply_discount(self, percent):
        discount_amt = self.price * (percent / 100)
        self.price -= discount_amt
        print(f"Discount {percent}% applied on '{self.title}'! New Price: ₹{self.price:.2f}")

book1 = Book("Python Mastery 2026", "Guido", 799.00)
book1.apply_discount(15)`
    },
    faqs: [
      {
        q: 'ఫంక్షన్స్ లో self ఖచ్చితంగా రాయాలా? దాన్ని వేరే పేరుతో రాయొచ్చా?',
        a: 'self అనేది పైథాన్ రూల్. వేరే పేరుతో (ఉదా: obj) రాసినా పనిచేస్తుంది, కానీ ఎవ్వరూ అలా రాయరు, చదివే వాళ్ళకి కన్ఫ్యూజన్ వస్తుంది.'
      },
      {
        q: 'ఒక క్లాస్ లో రెండు __init__ లు రాయొచ్చా (Java లాగా)?',
        a: 'లేదు. పైథాన్ లో రెండు రాస్తే రెండోది మాత్రమే వర్కవుట్ అవుతుంది. అలాంటప్పుడు డీఫాల్ట్ పారామీటర్స్ లేదా *args వాడాలి.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 31: ENCAPSULATION & PROPERTIES
  // =========================================================================
  {
    num: 31,
    phaseId: 'phase7',
    phaseTitle: 'Phase 7: Object-Oriented Programming',
    slug: '31-python-oop-encapsulation-and-properties',
    title: 'Python Encapsulation & Properties (తెలుగులో)',
    badge: '31. Encapsulation & Properties',
    subtopics: 'Encapsulation · Public, Protected (_), Private (__) · Name Mangling · @property Decorator · Getters & Setters',
    desc: 'మన డేటాని ఎవరైనా బయటనుండి మార్చకుండా పైథాన్ లో ఎలా హైడ్ చేయాలి? Public, Protected, Private వేరియబుల్స్ అంటే ఏంటి? @property ఎందుకు వాడాలో చూద్దాం.',
    sections: [
      {
        title: '1. Encapsulation అంటే ఏంటి? (Public, Protected, Private)',
        body: `<p><strong>Encapsulation</strong> అంటే మన డేటాని (వేరియబుల్స్) ఒక క్యాప్స్యూల్ లాగా ప్యాక్ చేసి, వేరే ఫైల్స్ నుంచి ఎవరు పడితే వాళ్ళు డైరెక్ట్ గా మార్చకుండా లాక్ చేయడం.</p>
        <p>పైథాన్ లో జావా లాగా <code>private</code>, <code>public</code> అనే కీవర్డ్స్ ఉండవు. దానికి బదులు వేరియబుల్ పేర్లతో (Underscores) అడ్జస్ట్ చేస్తాం:</p>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>రకం</th><th>సింటాక్స్ (పేరు)</th><th>అర్థం</th></tr>
          <tr><td><strong>Public</strong></td><td><code>self.name</code></td><td>ఎవరైనా, ఎక్కడినుంచైనా డైరెక్ట్ గా రీడ్ / రైట్ చేయొచ్చు.</td></tr>
          <tr><td><strong>Protected</strong></td><td><code>self._email</code></td><td><strong>రూల్ మాత్రమే:</strong> బయటనుండి వాడొద్దు, ఇది ఇంటర్నల్ అని చెప్తున్నాం. (పైథాన్ దీన్ని ఆపదు).</td></tr>
          <tr><td><strong>Private</strong></td><td><code>self.__pin</code></td><td><strong>కఠినమైన రూల్:</strong> పైథాన్ దీని పేరు మార్చేస్తుంది (మ్యాంగ్లింగ్), కాబట్టి బయటనుండి పిలవడం కుదరదు!</td></tr>
        </table>`,
        code: `class UserAccount:
    def __init__(self, username, email, pin):
        self.username = username      # Public (ఫుల్ యాక్సెస్)
        self._email = email          # Protected (చూసి వదిలేయాలి)
        self.__pin = pin             # Private (పేరు మారిపోతుంది!)

    def verify_pin(self, entered_pin):
        return self.__pin == entered_pin

user = UserAccount("balaji_dev", "balaji@test.com", 1234)

# 1. Public ది యాక్సెస్ చేద్దాం (వస్తుంది):
print("Public Username:", user.username)

# 2. Protected ది యాక్సెస్ చేద్దాం (వస్తుంది, కానీ చేయకూడదు):
print("Protected Email:", user._email)

# 3. Private దాన్ని డైరెక్ట్ గా అడిగితే (AttributeError వస్తుంది):
try:
    print(user.__pin)
except AttributeError as err:
    print("❌ Private Access Blocked:", err)`,
        codeTitle: 'Example 1: Public, Protected (_), and Private (__) Modifiers',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 user.__pin ఎందుకు రాలేదు?:</strong>
          <p style="margin-top:6px;">పైథాన్ ప్రైవేట్ వేరియబుల్స్ కి ముందు క్లాస్ పేరు తగిలిస్తుంది, తద్వారా బయటనుండి పిలిచినప్పుడు ఆ పేరుతో వేరియబుల్ లేదని ఎర్రర్ ఇస్తుంది.</p>
        </div>`
      },
      {
        title: '2. Name Mangling (లోపల ఏం జరుగుతుంది?)',
        body: `<p>మీరు ఒక వేరియబుల్ కి ముందు రెండు అండర్ స్కోర్స్ (<code>__pin</code>) ఇస్తే, పైథాన్ ఆటోమాటిక్ గా దాన్ని <strong><code>_ClassName__attribute</code></strong> (ఉదా: <code>_UserAccount__pin</code>) గా పేరు మార్చేస్తుంది. దీన్నే <strong>Name Mangling</strong> అంటారు.</p>
        <p>ఇది హ్యాకర్స్ నుండి కాపాడటానికి కాదు, వేరే క్లాస్ లో అదే పేరుతో వేరియబుల్ ఉంటే రెండూ ఓవర్ రైడ్ అవ్వకుండా కాపాడటానికి.</p>`,
        code: `# మన ఆబ్జెక్ట్ లోపల అసలు వేరియబుల్స్ ఎలా స్టోర్ అయ్యున్నాయో చూద్దాం (__dict__ వాడి):
user = UserAccount("ravi_k", "ravi@test.com", 9988)

print("ఆబ్జెక్ట్ లోపల ఉన్న డేటా ఇదీ:")
print(user.__dict__)

# మార్చిన పేరుతో పిలిస్తే? (ఖచ్చితంగా వస్తుంది):
print("\\nమ్యాంగిల్ అయిన పేరుతో పిలిస్తే వస్తుంది:", user._UserAccount__pin)`,
        codeTitle: 'Example 2: Inspecting Name Mangling in Python Memory',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 పైథాన్ సిద్ధాంతం:</strong>
          <p style="margin-top:6px;">"మనం అందరం పెద్దవాళ్ళం, బాధ్యతగా ఉందాం" అని పైథాన్ నమ్ముతుంది. అంటే హార్డ్ కోర్ గా ప్రైవేట్ చేయదు, మీరు కావాలంటే ఆ మ్యాంగిల్ అయిన పేరుతో యాక్సెస్ చేయొచ్చు, కానీ డెవలపర్స్ అలా చేయరు.</p>
        </div>`
      },
      {
        title: '3. అద్భుతమైన @property (Getters & Setters)',
        body: `<p>జావా లాంటి లాంగ్వేజెస్ లో బ్యాలెన్స్ మార్చాలంటే <code>setBalance(val)</code> అని రాయాలి. కానీ పైథాన్ లో మీరు <strong><code>@property</code></strong> డెకరేటర్ వాడితే, అది చూడటానికి మామూలు వేరియబుల్ లాగే ఉంటుంది, కానీ లోపల అది ఒక ఫంక్షన్ రన్ చేస్తుంది!</p>
        <p>దీనివల్ల మనం యూజర్ మైనస్ బ్యాలెన్స్ ఎంటర్ చేస్తే చెక్ చేసి ఆపొచ్చు:</p>`,
        code: `class BankAccount:
    def __init__(self, owner, initial_balance):
        self.owner = owner
        self._balance = 0.0          # ఇది రియల్ వాల్యూ స్టోర్ చేసే Protected వేరియబుల్
        self.balance = initial_balance # ఇది కింద ఉన్న setter ని పిలుస్తుంది!

    # 1. Getter (యూజర్ అడిగినప్పుడు):
    @property
    def balance(self):
        """బ్యాలెన్స్ అడిగితే ఇస్తుంది."""
        return self._balance

    # 2. Setter (యూజర్ అప్డేట్ చేసినప్పుడు):
    @balance.setter
    def balance(self, value):
        """బ్యాలెన్స్ మార్చేటప్పుడు వాలిడేట్ చేస్తుంది."""
        if not isinstance(value, (int, float)):
            raise TypeError("బ్యాలెన్స్ కి నెంబర్స్ మాత్రమే ఇవ్వాలి!")
        if value < 0:
            raise ValueError(f"మైనస్ లో బ్యాలెన్స్ ఉండదు! మీరు ఇచ్చింది: ₹{value}")
        self._balance = float(value)

    # 3. Read-Only (ఓన్లీ చదవడానికి మాత్రమే, సెట్టర్ లేదు):
    @property
    def formatted_balance(self):
        return f"₹{self._balance:,.2f}"

# టెస్టింగ్ చేద్దాం:
acc = BankAccount("Balaji", 5000)
print("Balance accessed:", acc.balance) # getter కాల్ అవుతుంది!
print("Formatted:", acc.formatted_balance)

# సక్సెస్ గా అప్డేట్ చేయడం (setter కాల్ అయ్యి వాలిడేట్ చేస్తుంది):
acc.balance = 7500
print("Updated Balance:", acc.formatted_balance)

# మైనస్ వాల్యూ ఇస్తే?
try:
    acc.balance = -1000 # ఇక్కడ కోడ్ ఆగిపోయి, ValueError ఇస్తుంది!
except ValueError as err:
    print("🚫 Validation Prevented Error:", err)`,
        codeTitle: 'Example 3: Clean Data Validation with @property and @setter',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 @property ఎందుకు బెస్ట్?:</strong>
          <p style="margin-top:6px;">యూజర్ <code>acc.balance = 7500</code> అని నార్మల్ గానే రాస్తాడు (సెట్టర్ ఫంక్షన్ వాడాల్సిన పనిలేదు). కానీ బ్యాక్ గ్రౌండ్ లో ఫంక్షన్ రన్ అయ్యి వాలిడేషన్ జరుగుతుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Setter లోపల మళ్ళీ ఆ వేరియబుల్ నే పిలవడం (RecursionError)',
      text: 'Setter లోపల "self.balance = value" అని రాస్తే, అది మళ్ళీ అదే setter ని పిలుస్తుంది. అలా తిరిగీ తిరిగీ క్రాష్ అవుతుంది! ఎప్పుడూ లోపల ప్రైవేట్ వేరియబుల్ నే వాడాలి: self._balance = value.'
    },
    tryIt: {
      desc: 'ఒక Temperature క్లాస్ రాయండి. అందులో celsius అనే @property ఉండాలి, అది -273.15 కంటే కిందకి ఇస్తే (Absolute Zero) ఎర్రర్ త్రో చేయాలి.',
      code: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("ఉష్ణోగ్రత అబ్సల్యూట్ జీరో కంటే తక్కువ ఉండదు!")
        self._celsius = value

t = Temperature(25)
print(f"Temperature: {t.celsius}°C")
t.celsius = 38
print(f"Updated: {t.celsius}°C")`
    },
    faqs: [
      {
        q: 'ఒక వేరియబుల్ ని రీడ్-ఓన్లీ (ReadOnly) గా మార్చడం ఎలా?',
        a: 'జస్ట్ దానికి @property అని పెట్టి ఫంక్షన్ రాయండి, కానీ @setter రాయకండి. అప్పుడు ఎవరైనా దాన్ని మార్చడానికి ట్రై చేస్తే AttributeError వస్తుంది.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 32: INHERITANCE, MRO & POLYMORPHISM
  // =========================================================================
  {
    num: 32,
    phaseId: 'phase7',
    phaseTitle: 'Phase 7: Object-Oriented Programming',
    slug: '32-python-oop-inheritance-mro-and-polymorphism',
    title: 'Python Inheritance, MRO & Polymorphism (తెలుగులో)',
    badge: '32. Inheritance & Polymorphism',
    subtopics: 'Single Inheritance · super() · Method Overriding · Multiple Inheritance · MRO (C3 Linearization) · Polymorphism & Duck Typing',
    desc: 'క్లాసెస్ మధ్యలో వారసత్వం (Inheritance) ఎలా పనిచేస్తుంది? super() కీవర్డ్ ఎందుకు వాడతాం? బహుళ వారసత్వం (Multiple Inheritance) మరియు పాలిమార్ఫిజం గురించి పూర్తిగా నేర్చుకుందాం.',
    sections: [
      {
        title: '1. Single Inheritance & super() వాడకం',
        body: `<p><strong>Inheritance (వారసత్వం)</strong> అంటే ఆల్రెడీ ఉన్న ఒక క్లాస్ (Parent) నుంచి లక్షణాలను ఇంకో కొత్త క్లాస్ (Child) లోకి వాడుకోవడం. దీనివల్ల కోడ్ పదే పదే రాయాల్సిన పని తగ్గుతుంది (దీన్నే <strong>"Is-A"</strong> రిలేషన్ అంటారు).</p>
        <p><strong><code>super()</code> అంటే ఏంటి?:</strong> చైల్డ్ క్లాస్ లోపల <code>__init__</code> రాసినప్పుడు, అందులోంచి పేరెంట్ క్లాస్ యొక్క <code>__init__</code> ని పిలవడానికి <code>super().__init__(...)</code> వాడాలి.</p>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  Parent Class: Vehicle (brand, model, price)           │
│  └── Method: get_info()                                │
└───────────────────────────┬────────────────────────────┘
                            │  [ElectricCar(Vehicle)]
                            ▼
┌────────────────────────────────────────────────────────┐
│  Child Class: ElectricCar (battery_capacity)           │
│  └── Method: get_info() [ఓవర్ రైడ్ చేసాం], charge()      │
└────────────────────────────────────────────────────────┘</div>`,
        code: `class Vehicle:
    """అన్ని వాహనాలకు బేస్ క్లాస్."""
    def __init__(self, brand, model, base_price):
        self.brand = brand
        self.model = model
        self.base_price = base_price

    def get_info(self):
        return f"{self.brand} {self.model} | Base Price: ₹{self.base_price:,.2f}"

class ElectricCar(Vehicle):
    """Vehicle ని ఇన్హెరిట్ చేసిన చైల్డ్ క్లాస్."""
    def __init__(self, brand, model, base_price, battery_kwh):
        # super() ద్వారా పేరెంట్ లో ఉన్న మూడింటికి వాల్యూస్ పంపుతున్నాం:
        super().__init__(brand, model, base_price)
        self.battery_kwh = battery_kwh

    # Method Overriding: ఈ కార్ కి తగ్గట్టు ఇన్ఫో ని మారుస్తున్నాం
    def get_info(self):
        parent_info = super().get_info()
        return f"⚡ [EV] {parent_info} | Battery: {self.battery_kwh} kWh"

    def charge(self):
        return f"🔋 {self.brand} {self.model} ని ఛార్జ్ చేస్తున్నాం..."

# ElectricCar ఆబ్జెక్ట్ క్రియేట్ చేద్దాం:
ev = ElectricCar("Tata", "Nexon EV", 1450000, 40.5)
print(ev.get_info())
print(ev.charge())`,
        codeTitle: 'Example 1: Single Inheritance, super(), and Method Overriding',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Reusability:</strong>
          <p style="margin-top:6px;"><code>ElectricCar</code> లో బ్రాండ్, మోడల్ ని మనం మళ్ళీ <code>self.brand = brand</code> అని రాయలేదు. <code>Vehicle</code> నుంచి డైరెక్ట్ గా వాడుకున్నాం.</p>
        </div>`
      },
      {
        title: '2. Multiple Inheritance & MRO (తండ్రులు ఇద్దరైతే?)',
        body: `<p>జావా లాంటి లాంగ్వేజెస్ లో ఒక క్లాస్ కి ఒక పేరెంట్ మాత్రమే ఉండాలి. కానీ పైథాన్ లో ఒకే క్లాస్ ఇద్దరు ముగ్గురు పేరెంట్స్ నుండి ఇన్హెరిట్ చేసుకోవచ్చు (Multiple Inheritance).</p>
        <p>ఒకవేళ ఇద్దరు పేరెంట్స్ లో ఒకే పేరుతో (ఉదా: <code>move()</code>) ఫంక్షన్ ఉంటే, పైథాన్ ఎవరి ఫంక్షన్ ని రన్ చేస్తుంది? దీనికోసం <strong>MRO (Method Resolution Order)</strong> అనే లాజిక్ వాడుతుంది.</p>`,
        code: `class Flyer:
    def move(self):
        return "🦅 గాలిలో ఎగురుతున్నాను!"

class Swimmer:
    def move(self):
        return "🏊 నీళ్లలో ఈదుతున్నాను!"

# బాతు (Duck) రెండు పేరెంట్స్ నుండి లక్షణాలు తీసుకుంది:
class Duck(Flyer, Swimmer):
    def quack(self):
        return "🦆 Quack Quack!"

donald = Duck()

# Duck(Flyer, Swimmer) అని రాసాం కాబట్టి ఫస్ట్ ఉన్న Flyer దే (లెఫ్ట్ టు రైట్) రన్ అవుతుంది:
print("Donald's move:", donald.move())
print("Donald's quack:", donald.quack())

# అసలు పైథాన్ ఎలా వెతికిందో మనం చూడొచ్చు (MRO):
print("\\n--- Duck Method Resolution Order (MRO) ---")
for idx, cls in enumerate(Duck.__mro__, 1):
    print(f"{idx}. {cls.__name__}")`,
        codeTitle: 'Example 2: Multiple Inheritance and MRO Hierarchy',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 MRO సీక్రెట్:</strong>
          <p style="margin-top:6px;">ఇది <code>Duck -> Flyer -> Swimmer -> object</code> ఆర్డర్ లో వెతుకుతుంది. కాబట్టి ఫస్ట్ దొరికిన <code>Flyer.move()</code> రన్ అయ్యింది.</p>
        </div>`
      },
      {
        title: '3. Polymorphism & "Duck Typing" (ఒకే పేరు - రకరకాల పనులు)',
        body: `<p><strong>Polymorphism (పాలిమార్ఫిజం)</strong> అంటే "బహురూపాలు". ఒకే ఫంక్షన్ ని డిఫరెంట్ డిఫరెంట్ ఆబ్జెక్ట్స్ వాళ్ళకి తగ్గట్టు వాడుకోవడం.</p>
        <p>పైథాన్ <strong>Duck Typing</strong> ని నమ్ముతుంది: <em>"అది బాతు లాగా నడిచి, బాతు లాగా అరిస్తే.. దాన్ని బాతు అనే అనుకోవాలి"</em>. అంటే, పేరెంట్-చైల్డ్ రిలేషన్ లేకపోయినా ఒకే పేరుతో ఫంక్షన్ ఉంటే చాలు, దాన్ని పాలిమార్ఫిజం అనొచ్చు.</p>`,
        code: `class CreditCardPayment:
    def process_payment(self, amount):
        return f"💳 క్రెడిట్ కార్డ్ తో ₹{amount:,.2f} ఛార్జ్ చేసాం."

class UPIPayment:
    def process_payment(self, amount):
        return f"📱 ఫోన్ పే/గూగుల్ పే ద్వారా ₹{amount:,.2f} పంపాం."

class CryptoPayment:
    def process_payment(self, amount):
        return f"🪙 ₹{amount:,.2f} విలువైన బిట్ కాయిన్స్ వాలెట్ కి వెళ్లాయి."

# మన మెయిన్ యాప్ లో ఈ ఫంక్షన్ ఉంటుంది:
def checkout(payment_provider, bill_amount):
    # దానికి ఏ ఆబ్జెక్ట్ ఇచ్చినా, అందులో process_payment ఉంటే చాలు రన్ చేస్తుంది!
    print(payment_provider.process_payment(bill_amount))

# మనం ఆర్డర్ పేమెంట్స్ చేద్దాం:
payment_methods = [
    CreditCardPayment(),
    UPIPayment(),
    CryptoPayment()
]

print("--- 🛒 Processing Polymorphic Checkout Transactions ---")
for method in payment_methods:
    checkout(method, 2499.00)`,
        codeTitle: 'Example 3: Polymorphism in Action via Duck Typing',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 దీనివల్ల లాభం?:</strong>
          <p style="margin-top:6px;">రేపు పొద్దున్న కొత్తగా <code>NetBankingPayment</code> వస్తే, పాత <code>checkout()</code> ఫంక్షన్ లో ఒక్క లైన్ కూడా మార్చాల్సిన అవసరం లేదు. కొత్త ఫైల్ యాడ్ చేస్తే సరిపోతుంది!</p>
        </div>`
      }
    ],
    mistake: {
      title: 'చైల్డ్ లో super().__init__() రాయడం మర్చిపోవడం',
      text: 'ఇది మర్చిపోతే, పేరెంట్ లో ఉన్న వేరియబుల్స్ (brand, model) చైల్డ్ కి రావు. అప్పుడు పేరెంట్ మెథడ్స్ వాడేటప్పుడు AttributeError వస్తుంది. ఖచ్చితంగా super().__init__() రాయాలి.'
    },
    tryIt: {
      desc: 'Shape అనే ఒక పేరెంట్ క్లాస్ క్రియేట్ చేయండి. దాన్ని వాడి Rectangle(l, w) మరియు Circle(r) అనే చైల్డ్ క్లాసెస్ రాసి, అందులో area() అనే ఫంక్షన్ ని ఓవర్ రైడ్ చేయండి.',
      code: `import math

class Rectangle:
    def __init__(self, l, w): self.l, self.w = l, w
    def area(self): return self.l * self.w

class Circle:
    def __init__(self, r): self.r = r
    def area(self): return math.pi * (self.r ** 2)

shapes = [Rectangle(10, 5), Circle(7)]
for s in shapes:
    print(f"Shape Area: {s.area():.2f}")`
    },
    faqs: [
      {
        q: 'isinstance() కి type() కి ఇన్హెరిటెన్స్ లో తేడా ఏంటి?',
        a: 'type(obj) == ParentClass అని చెక్ చేస్తే False వస్తుంది. ఎందుకంటే అది చైల్డ్ ని పేరెంట్ గా ఒప్పుకోదు. కానీ isinstance(obj, ParentClass) వాడితే అది చైల్డ్ ని కూడా పేరెంట్ లో ఒక భాగమే అని True ఇస్తుంది.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 33: ABSTRACT CLASSES & DUNDER MAGIC METHODS
  // =========================================================================
  {
    num: 33,
    phaseId: 'phase7',
    phaseTitle: 'Phase 7: Object-Oriented Programming',
    slug: '33-python-oop-abstract-classes-and-magic-methods',
    title: 'Abstract Classes & Dunder Methods (తెలుగులో)',
    badge: '33. ABCs & Dunder Methods',
    subtopics: 'Abstract Base Classes (abc.ABC) · @abstractmethod · __str__ vs __repr__ · __len__ · __eq__ · Operator Overloading',
    desc: 'క్లాసెస్ కి స్ట్రిక్ట్ రూల్స్ ఎలా పెట్టాలి (Abstract Classes)? మరియు పైథాన్ లో డబుల్ అండర్ స్కోర్ తో ఉండే స్పెషల్ ఫంక్షన్స్ (__str__, __len__) తో మ్యాజిక్ ఎలా చేయాలో చూద్దాం.',
    sections: [
      {
        title: '1. Abstract Base Classes (ABCs) - రూల్స్ పెట్టడం',
        body: `<p>ఒక పెద్ద ప్రాజెక్ట్ లో ఇద్దరు డెవలపర్స్ రెండు డిఫరెంట్ డేటాబేస్ లకు కోడ్ రాస్తున్నారు. ఇద్దరూ కచ్చితంగా <code>connect()</code> అనే ఫంక్షన్ ని రాయాలి అని రూల్ పెట్టాలంటే, మనం <strong>Abstract Class</strong> వాడాలి.</p>
        <p>ఇది ఒక టెంప్లేట్ లాంటిది. దీన్ని డైరెక్ట్ గా వాడుకోలేము. దీన్ని పేరెంట్ గా చేసుకున్న ప్రతి చైల్డ్ <strong>ఖచ్చితంగా ఆ ఫంక్షన్ ని రాసి తీరాల్సిందే!</strong> లేకపోతే కోడ్ రన్ అవ్వదు.</p>`,
        code: `from abc import ABC, abstractmethod

class NotificationService(ABC):
    """ఇది ఒక టెంప్లేట్ క్లాస్ (Abstract Base Class)."""
    
    @abstractmethod
    def send(self, recipient, message):
        """దీన్ని ఇన్హెరిట్ చేసుకునే వాళ్ళు ఈ ఫంక్షన్ రాయాల్సిందే!"""
        pass

class EmailNotification(NotificationService):
    def send(self, recipient, message):
        return f"📧 Email sent to [{recipient}]: '{message}'"

class SMSNotification(NotificationService):
    def send(self, recipient, message):
        return f"📱 SMS sent to [{recipient}]: '{message}'"

# 1. Abstract క్లాస్ ని డైరెక్ట్ గా పిలిస్తే ఎర్రర్ వస్తుంది:
try:
    service = NotificationService()
except TypeError as err:
    print("🚫 ABC Instantiation Blocked:", err)

# 2. కానీ చైల్డ్ క్లాసెస్ బ్రహ్మాండంగా రన్ అవుతాయి:
services = [EmailNotification(), SMSNotification()]
for s in services:
    print(s.send("balaji@test.com", "Your OTP is 492810"))`,
        codeTitle: 'Example 1: Defining and Enforcing Abstract Base Classes (ABCs)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 లాభం ఏంటి?:</strong>
          <p style="margin-top:6px;">ఒకవేళ మీరు <code>SMSNotification</code> లో ఆ <code>send</code> ఫంక్షన్ రాయడం మర్చిపోతే, కోడ్ రన్ చేయకముందే పైథాన్ ఆపేసి "ఫంక్షన్ రాయలేదు" అని వార్నింగ్ ఇస్తుంది.</p>
        </div>`
      },
      {
        title: '2. Dunder Methods: __str__() మరియు __repr__()',
        body: `<p>పైథాన్ లో <code>__</code> (డబుల్ అండర్ స్కోర్) తో మొదలయ్యి ఎండ్ అయ్యే ఫంక్షన్స్ ని <strong>Dunder (Magic) Methods</strong> అంటారు.</p>
        <ul>
          <li><strong><code>__str__(self)</code>:</strong> మీరు ఒక ఆబ్జెక్ట్ ని డైరెక్ట్ గా <code>print(obj)</code> అంటే మెమరీ లొకేషన్ వస్తుంది. అది కాకుండా యూజర్ కి అర్థమయ్యేలా ఒక మంచి స్ట్రింగ్ ని చూపించడానికి దీన్ని వాడతారు.</li>
          <li><strong><code>__repr__(self)</code>:</strong> ఇది డెవలపర్స్ కోసం. ఆబ్జెక్ట్ లోపల అసలు ఏముంది, ఏ వేరియబుల్స్ కి ఏముంది అని క్లియర్ గా చూపించడానికి దీన్ని వాడతారు.</li>
        </ul>`,
        code: `class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = float(price)

    # యూజర్ కి నచ్చేలా చూపించడానికి (__str__):
    def __str__(self):
        return f"{self.name} (₹{self.price:,.2f})"

    # డెవలపర్స్ కి అర్థమయ్యేలా (__repr__):
    def __repr__(self):
        return f"Product(name={self.name!r}, price={self.price})"

item = Product("Mechanical Keyboard", 2499.00)

print("str(item) for Users:    ", str(item))  # Mechanical Keyboard (₹2,499.00)
print("repr(item) for Developers:", repr(item)) # Product(name='Mechanical Keyboard', price=2499.0)`,
        codeTitle: 'Example 2: Implementing __str__ and __repr__ for Clean Output',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 గోల్డెన్ రూల్:</strong>
          <p style="margin-top:6px;">రెండిట్లో ఏదో ఒకటే రాయాలి అనుకుంటే <code>__repr__</code> రాయండి. ఎందుకంటే <code>__str__</code> లేకపోతే పైథాన్ ఆటోమాటిక్ గా <code>__repr__</code> నే వాడుకుంటుంది.</p>
        </div>`
      },
      {
        title: '3. Operator Overloading: మన ఆబ్జెక్ట్స్ ని యాడ్ ( + ) చేయడం',
        body: `<p>మన ఆబ్జెక్ట్స్ ని కూడా ఇంటీజర్స్ లాగా యాడ్ చేయడం (<code>+</code>), ఈక్వల్ టు (<code>==</code>) చెక్ చేయడం లాంటివి డండర్ మెథడ్స్ తో చేయొచ్చు:</p>
        <ul>
          <li><code>__len__()</code>: <code>len(obj)</code> అని పిలిస్తే ఇది రన్ అవుతుంది.</li>
          <li><code>__eq__()</code>: <code>obj1 == obj2</code> అని పెడితే ఇది రన్ అవుతుంది.</li>
          <li><code>__add__()</code>: <code>obj1 + obj2</code> అని ప్లస్ చేస్తే ఇది రన్ అవుతుంది.</li>
        </ul>`,
        code: `class Money:
    def __init__(self, amount, currency="INR"):
        self.amount = float(amount)
        self.currency = currency

    def __str__(self):
        return f"₹{self.amount:,.2f} {self.currency}"

    # == ఆపరేటర్ వాడుకోవడానికి:
    def __eq__(self, other):
        if isinstance(other, Money):
            return self.amount == other.amount and self.currency == other.currency
        return False

    # + ఆపరేటర్ వాడుకోవడానికి:
    def __add__(self, other):
        if not isinstance(other, Money) or self.currency != other.currency:
            raise TypeError("రెండూ ఒకే కరెన్సీ అయి ఉండాలి!")
        return Money(self.amount + other.amount, self.currency)

# టెస్ట్ చేద్దాం:
m1 = Money(1500)
m2 = Money(2500)
m3 = Money(1500)

print("m1 + m2 =", m1 + m2)     # __add__ రన్ అవుతుంది -> ₹4,000.00 INR
print("m1 == m3?", m1 == m3)     # __eq__ రన్ అవుతుంది -> True
print("m1 == m2?", m1 == m2)     # __eq__ రన్ అవుతుంది -> False`,
        codeTitle: 'Example 3: Overloading == and + Operators with Dunder Methods',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 మ్యాజిక్ ఏంటంటే:</strong>
          <p style="margin-top:6px;">మీరు <code>m1.add(m2)</code> లాంటి బోర్ ఫంక్షన్స్ రాయకుండా, డైరెక్ట్ గా <code>m1 + m2</code> అని మ్యాథ్స్ లాగా రాసుకోవచ్చు!</p>
        </div>`
      }
    ],
    mistake: {
      title: '__str__ లోపల print() వాడటం',
      text: '__str__ మరియు __repr__ మెథడ్స్ ఎప్పుడూ ఒక స్ట్రింగ్ (String) ని రిటర్న్ (return) చేయాలి. వాటి లోపల print() వాడితే ఎర్రర్ వస్తుంది.'
    },
    tryIt: {
      desc: 'ఒక ShoppingBag క్లాస్ క్రియేట్ చేయండి. అందులో కొన్ని ఐటమ్స్ యాడ్ చేసి, len(bag) అని రాస్తే ఎన్ని ఐటమ్స్ ఉన్నాయో కౌంట్ వచ్చేలా __len__ మెథడ్ రాయండి.',
      code: `class ShoppingBag:
    def __init__(self):
        self.items = []

    def add(self, item):
        self.items.append(item)

    def __len__(self):
        return len(self.items)

    def __str__(self):
        return f"ShoppingBag with {len(self)} items: {', '.join(self.items)}"

bag = ShoppingBag()
bag.add("Laptop")
bag.add("Mouse")
bag.add("Keyboard")

print(bag)
print("Item count via len():", len(bag))`
    },
    faqs: [
      {
        q: 'Abstract Class కి Interface కి పైథాన్ లో తేడా ఏంటి?',
        a: 'పైథాన్ లో జావా లాగా "interface" అని సపరేట్ కీవర్డ్ ఉండదు. Abstract Classes నే ఇంటర్ ఫేసెస్ లాగా వాడుకుంటాం.'
      },
      {
        q: '__getitem__ అంటే ఏంటి?',
        a: 'ఒక ఆబ్జెక్ట్ లోపల ఉన్న డేటాని డిక్షనరీ లాగా లిస్ట్ లాగా (ఉదా: obj["name"]) బ్రాకెట్స్ పెట్టి తీసుకోవాలంటే __getitem__ రాయాలి.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 34: COMPOSITION & DATACLASSES
  // =========================================================================
  {
    num: 34,
    phaseId: 'phase7',
    phaseTitle: 'Phase 7: Object-Oriented Programming',
    slug: '34-python-oop-composition-and-dataclasses',
    title: 'Composition & Dataclasses (తెలుగులో)',
    badge: '34. Composition & Dataclasses',
    subtopics: 'Composition ("Has-A") vs Inheritance ("Is-A") · Decoupling · @dataclass (PEP 557) · field(default_factory) · Frozen Immutability',
    desc: 'Inheritance కంటే Composition ఎందుకు బెస్ట్ (Has-A vs Is-A)? మరియు మోడ్రన్ పైథాన్ లో @dataclass వాడి కోడ్ ని సగానికి సగం ఎలా తగ్గించొచ్చో చూద్దాం.',
    sections: [
      {
        title: '1. Composition ("Has-A" రిలేషన్)',
        body: `<p>సాఫ్ట్ వేర్ డిజైన్ లో ఒక ఫేమస్ రూల్ ఉంది: <strong>"Inheritance కంటే Composition వాడటమే బెస్ట్"</strong>.</p>
        <ul>
          <li><strong>Inheritance ("Is-A"):</strong> కుక్క (Dog) అనేది ఒక జంతువు (Animal). ఇది స్ట్రాంగ్ లింక్. పేరెంట్ లో ఏమైనా మారిస్తే చైల్డ్ కూడా అఫెక్ట్ అవుతుంది.</li>
          <li><strong>Composition ("Has-A"):</strong> కార్ (Car) లోపల ఒక ఇంజిన్ (Engine) ఉంటుంది. ఇది లూస్ లింక్. రేపు పొద్దున్న ఎలక్ట్రిక్ ఇంజిన్ కావాలంటే పాతదాన్ని తీసేసి కొత్తది పెట్టుకోవచ్చు!</li>
        </ul>`,
        code: `# విడివిడిగా ఉన్న కాంపోనెంట్స్:
class Engine:
    def __init__(self, horsepower, fuel_type):
        self.horsepower = horsepower
        self.fuel_type = fuel_type

    def ignite(self):
        return f"🔥 Engine ({self.horsepower} HP, {self.fuel_type}) స్టార్ట్ అయింది!"

class GPSNavigator:
    def route_to(self, destination):
        return f"🗺️ '{destination}' కి రూట్ కనుక్కుంటున్నాను..."

# వీటిని కలిపి ఒక కార్ ని తయారు చేద్దాం (Composition):
class Automobile:
    def __init__(self, model, engine_hp, fuel_type):
        self.model = model
        # COMPOSITION: కార్ "లోపల" ఇంజిన్ ఉంది, GPS ఉంది:
        self.engine = Engine(engine_hp, fuel_type)
        self.navigator = GPSNavigator()

    def start_trip(self, destination):
        print(f"--- Starting Trip in {self.model} ---")
        print(self.engine.ignite())
        print(self.navigator.route_to(destination))

my_car = Automobile("Porsche 911", 450, "Petrol")
my_car.start_trip("Hyderabad Cyber Towers")`,
        codeTitle: 'Example 1: Building Modular Systems with Composition',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఫ్లెక్సిబిలిటీ (మంచి డిజైన్):</strong>
          <p style="margin-top:6px;">రేపు మీరు ఎలక్ట్రిక్ కార్ చేయాలంటే <code>self.engine = ElectricMotor()</code> అని ఇంజిన్ మార్చేస్తే చాలు. కార్ మొత్తం కోడ్ ని మార్చాల్సిన పనిలేదు.</p>
        </div>`
      },
      {
        title: '2. Dataclasses: బోరింగ్ కోడ్ రాయక్కర్లేదు (PEP 557)',
        body: `<p>పైథాన్ లో ఒక ఆబ్జెక్ట్ రాస్తే <code>__init__</code> రాయాలి, <code>__str__</code> రాయాలి, <code>__eq__</code> రాయాలి.. చాలా బోర్ కదా? పైథాన్ 3.7 లో <strong><code>@dataclass</code></strong> వచ్చింది. ఇది ఆటోమాటిక్ గా మనకోసం కోడ్ రాసేస్తుంది!</p>`,
        code: `from dataclasses import dataclass, field
from typing import List

# జస్ట్ ఈ ఒక్క పదం రాస్తే చాలు, __init__, __repr__ అన్నీ అదే రాసుకుంటుంది:
@dataclass
class StudentProfile:
    student_id: int
    name: str
    branch: str
    gpa: float = 0.0
    skills: List[str] = field(default_factory=list) # లిస్ట్ కోసం ఇలా వాడాలి!

# ఆబ్జెక్ట్స్ క్రియేట్ చేద్దాం:
s1 = StudentProfile(101, "Balaji", "Computer Science", 9.4, ["Python", "FastAPI"])
s2 = StudentProfile(101, "Balaji", "Computer Science", 9.4, ["Python", "FastAPI"])

print("--- ఆటోమాటిక్ గా వచ్చిన ప్రింట్ అవుట్పుట్ (__repr__) ---")
print(s1)

print("\\n--- ఆటోమాటిక్ ఈక్వల్స్ చెక్ (__eq__) ---")
print("s1 == s2?", s1 == s2) # True! రెండు ఆబ్జెక్ట్స్ లోపల డేటా సేమ్ ఉందో లేదో అదే చెక్ చేస్తుంది!`,
        codeTitle: 'Example 2: Defining Dataclasses with PEP 557',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 field(default_factory=list) ఎందుకు?:</strong>
          <p style="margin-top:6px;">ఒకవేళ మీరు <code>skills = []</code> అని ఎంప్టీ లిస్ట్ ఇస్తే, స్టూడెంట్స్ అందరికీ ఒకే లిస్ట్ షేర్ అవుతుంది. అదే <code>default_factory</code> ఇస్తే ప్రతి స్టూడెంట్ కి ఒక కొత్త లిస్ట్ వస్తుంది.</p>
        </div>`
      },
      {
        title: '3. Frozen Dataclasses (ఎవరూ మార్చలేరు)',
        body: `<p>మీరు డేటా క్లాస్ కి <code>frozen=True</code> అని పెడితే, దాన్ని ఎవరు మార్చడానికి ట్రై చేసినా క్రాష్ అవుతుంది. దీన్ని మనం సెట్టింగ్స్ కి, లొకేషన్స్ (GPS) కి వాడతాం:</p>`,
        code: `from dataclasses import dataclass

@dataclass(frozen=True)
class GeoCoordinates:
    latitude: float
    longitude: float

location = GeoCoordinates(17.3850, 78.4867)
print("Geo Coordinates:", location)

# మార్చడానికి ట్రై చేద్దాం (ఎర్రర్ వస్తుంది):
try:
    location.latitude = 18.0000
except Exception as err:
    print("🔒 Frozen Dataclass Protected:", type(err).__name__, err)`,
        codeTitle: 'Example 3: Immutable Read-Only Dataclasses with frozen=True',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 లాభం?:</strong>
          <p style="margin-top:6px;">ఫ్రోజెన్ డేటా క్లాసెస్ ని మనం డిక్షనరీ కి 'Keys' లాగా కూడా వాడుకోవచ్చు (అవి మార్చలేం కాబట్టి Hashable అవుతాయి).</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Dataclass లో లిస్ట్ ని డైరెక్ట్ గా డిఫాల్ట్ గా ఇవ్వడం',
      text: 'మీరు "tags: list = []" అని రాస్తే పైథాన్ ఒప్పుకోదు (ValueError). కచ్చితంగా "tags: list = field(default_factory=list)" అని రాయాలి.'
    },
    tryIt: {
      desc: 'ఒక InventoryItem అనే డేటాక్లాస్ రాయండి. అందులో name, price, quantity ఉండాలి. total_value() అనే ఒక మెథడ్ కూడా యాడ్ చేయండి.',
      code: `from dataclasses import dataclass

@dataclass
class InventoryItem:
    name: str
    price: float
    quantity: int = 1

    def total_value(self) -> float:
        return self.price * self.quantity

item = InventoryItem("USB-C Hub", 1299.00, 3)
print(item)
print(f"Total Inventory Value: ₹{item.total_value():,.2f}")`
    },
    faqs: [
      {
        q: 'Dataclass లో నేను నా సొంత ఫంక్షన్స్ రాసుకోవచ్చా?',
        a: 'కచ్చితంగా! డేటాక్లాస్ కూడా ఒక నార్మల్ క్లాస్ లాంటిదే. కాకపోతే __init__, __repr__ అది రాసి పెడుతుంది. మిగతా ఫంక్షన్స్ మీ ఇష్టం.'
      },
      {
        q: '__post_init__ అంటే ఏంటి?',
        a: 'కొన్నిసార్లు ఆటోమాటిక్ గా వచ్చిన __init__ తర్వాత మనకి ఇంకొంత లాజిక్ (ఉదా: పాస్వర్డ్ హ్యాష్ చేయడం) కావాలి. అప్పుడు దీన్ని వాడతాం.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 35: OOP CAPSTONE PROJECTS
  // =========================================================================
  {
    num: 35,
    phaseId: 'phase7',
    phaseTitle: 'Phase 7: Object-Oriented Programming',
    slug: '35-python-oop-capstone-projects',
    title: 'OOP Capstone Projects (తెలుగులో)',
    badge: '35. OOP Capstone Projects',
    subtopics: '5 Full Projects · 1. Bank System · 2. Library System · 3. Employee System · 4. Shopping Cart · 5. School System',
    desc: 'మనం నేర్చుకున్న OOP కాన్సెప్ట్స్ తో 5 ప్రొడక్షన్ లెవల్ ప్రాజెక్ట్స్: బ్యాంక్ అకౌంట్, లైబ్రరీ సిస్టం, ఎంప్లాయీ పేరోల్, ఈ-కామర్స్ కార్ట్, మరియు స్కూల్ సిస్టం చేద్దాం.',
    sections: [
      {
        title: '1. Project 1: Bank Management System (బ్యాంకింగ్ యాప్)',
        body: `<p>యూజర్ బ్యాలెన్స్ ని ప్రైవేట్ గా ఉంచి, డిపాజిట్/విత్ డ్రా చేయిస్తూ, బ్యాంక్ స్టేట్మెంట్ ప్రింట్ చేసే యాప్:</p>`,
        code: `# =========================================================================
# PROJECT 1: OBJECT-ORIENTED BANK MANAGEMENT SYSTEM
# =========================================================================

class BankAccount:
    interest_rate = 0.04  # 4% వార్షిక వడ్డీ (Class Variable)

    def __init__(self, account_number, holder_name, initial_balance=0.0):
        self.account_number = account_number
        self.holder_name = holder_name
        self._balance = float(initial_balance)
        self.transaction_history = [f"Account opened with ₹{initial_balance:,.2f}"]

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            return "❌ Deposit amount must be positive!"
        self._balance += amount
        self.transaction_history.append(f"Deposited +₹{amount:,.2f}")
        return f"✅ Deposited ₹{amount:,.2f}. New Balance: ₹{self._balance:,.2f}"

    def withdraw(self, amount):
        if amount > self._balance:
            return f"❌ Insufficient funds! Available Balance: ₹{self._balance:,.2f}"
        self._balance -= amount
        self.transaction_history.append(f"Withdrew -₹{amount:,.2f}")
        return f"✅ Withdrew ₹{amount:,.2f}. Remaining Balance: ₹{self._balance:,.2f}"

    def apply_interest(self):
        interest_earned = self._balance * BankAccount.interest_rate
        self._balance += interest_earned
        self.transaction_history.append(f"Interest credited +₹{interest_earned:,.2f}")
        return f"📈 Interest of ₹{interest_earned:,.2f} credited at {BankAccount.interest_rate*100}%"

    def get_statement(self):
        header = f"=== 🏦 STATEMENT: {self.holder_name} (Acc #{self.account_number}) ==="
        body = "\\n".join([f"  • {tx}" for tx in self.transaction_history])
        footer = f"Current Available Balance: ₹{self._balance:,.2f}\\n" + "=" * 50
        return f"{header}\\n{body}\\n{footer}"

# డెమో రన్ చేద్దాం:
acc = BankAccount("SBI-9021", "Balaji", 10000.0)
print(acc.deposit(5000.0))
print(acc.withdraw(3000.0))
print(acc.apply_interest())
print("\\n" + acc.get_statement())`,
        codeTitle: 'Project 1: Bank Account Management Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 OOP లాజిక్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>_balance</code> ని <code>@property</code> లో పెట్టి సేఫ్ చేశాం.</li>
            <li>ప్రతి ట్రాన్సాక్షన్ హిస్టరీ లిస్ట్ లో రికార్డ్ అవుతుంది.</li>
          </ul>
        </div>`
      },
      {
        title: '2. Project 2: Library Catalog (బుక్స్ తీసుకునే సిస్టం)',
        body: `<p>లైబ్రరీలో బుక్స్ ని యాడ్ చేయడం, యూజర్స్ కి ఇవ్వడం, మళ్ళీ వెనక్కి తీసుకోవడం (Composition వాడి):</p>`,
        code: `# =========================================================================
# PROJECT 2: LIBRARY CATALOG & BOOK LENDING SYSTEM
# =========================================================================

class Book:
    def __init__(self, book_id, title, author):
        self.book_id = book_id
        self.title = title
        self.author = author
        self.is_borrowed = False
        self.borrowed_by = None

    def __str__(self):
        status = f"Borrowed by {self.borrowed_by}" if self.is_borrowed else "Available ✅"
        return f"[{self.book_id}] '{self.title}' by {self.author} ({status})"

class Library:
    def __init__(self, name):
        self.name = name
        self.catalog = {}  # book_id -> Book object

    def add_book(self, book):
        self.catalog[book.book_id] = book
        print(f"📚 Added to library: {book.title}")

    def lend_book(self, book_id, borrower_name):
        book = self.catalog.get(book_id)
        if not book:
            return "❌ Error: ఆ బుక్ లైబ్రరీలో లేదు!"
        if book.is_borrowed:
            return f"❌ '{book.title}' ని ఆల్రెడీ {book.borrowed_by} తీసుకున్నాడు!"
        book.is_borrowed = True
        book.borrowed_by = borrower_name
        return f"📖 Successfully issued '{book.title}' to {borrower_name}."

    def return_book(self, book_id):
        book = self.catalog.get(book_id)
        if not book or not book.is_borrowed:
            return "❌ Error: బుక్ అప్పు తీసుకోలేదు!"
        borrower = book.borrowed_by
        book.is_borrowed = False
        book.borrowed_by = None
        return f"✅ '{book.title}' returned successfully by {borrower}."

    def display_catalog(self):
        print(f"\\n--- 🏛️ {self.name} Catalog ---")
        for b in self.catalog.values():
            print("•", b)

# డెమో రన్:
lib = Library("City Central Tech Library")
lib.add_book(Book("B101", "Fluent Python", "Luciano Ramalho"))
lib.add_book(Book("B102", "Clean Code", "Robert C. Martin"))
lib.add_book(Book("B103", "Designing Data-Intensive Apps", "Martin Kleppmann"))

lib.display_catalog()
print("\\n" + lib.lend_book("B101", "Balaji"))
print(lib.lend_book("B101", "Alex")) # ఆల్రెడీ బాలాజీ తీసుకున్నాడు కాబట్టి ఎర్రర్ వస్తుంది
lib.display_catalog()
print("\\n" + lib.return_book("B101"))`,
        codeTitle: 'Project 2: Library Catalog and Lending System',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Composition లాజిక్:</strong>
          <p style="margin-top:6px;"><code>Library</code> క్లాస్ కి సొంతగా బుక్స్ లేవు. అది <code>Book</code> ఆబ్జెక్ట్స్ ని ఒక డిక్షనరీ లో స్టోర్ చేసుకోని మేనేజ్ చేస్తుంది (Has-A).</p>
        </div>`
      },
      {
        title: '3. Project 3: Employee Payroll (జీతాలు ఇచ్చే సిస్టం)',
        body: `<p>మంత్లీ శాలరీ తీసుకునే వాళ్లకి, గంటల లెక్కన తీసుకునే వాళ్లకి, మేనేజర్స్ కి ఒకే ఫంక్షన్ తో జీతాలు క్యాలిక్యులేట్ చేయడం (Polymorphism):</p>`,
        code: `# =========================================================================
# PROJECT 3: ROLE-BASED EMPLOYEE PAYROLL SYSTEM
# =========================================================================
from abc import ABC, abstractmethod

class Employee(ABC):
    def __init__(self, emp_id, name, department):
        self.emp_id = emp_id
        self.name = name
        self.department = department

    @abstractmethod
    def calculate_pay(self):
        """ఖచ్చితంగా ప్రతి చైల్డ్ క్లాస్ దీనిని రాయాలి."""
        pass

    def __str__(self):
        return f"[{self.emp_id}] {self.name:12} ({self.department:10}) | Monthly Pay: ₹{self.calculate_pay():,.2f}"

class SalariedEmployee(Employee):
    def __init__(self, emp_id, name, department, monthly_salary):
        super().__init__(emp_id, name, department)
        self.monthly_salary = monthly_salary

    def calculate_pay(self):
        return self.monthly_salary

class HourlyEmployee(Employee):
    def __init__(self, emp_id, name, department, hourly_rate, hours_worked):
        super().__init__(emp_id, name, department)
        self.hourly_rate = hourly_rate
        self.hours_worked = hours_worked

    def calculate_pay(self):
        return self.hourly_rate * self.hours_worked

class Manager(SalariedEmployee):
    def __init__(self, emp_id, name, department, monthly_salary, bonus):
        super().__init__(emp_id, name, department, monthly_salary)
        self.bonus = bonus

    def calculate_pay(self):
        return self.monthly_salary + self.bonus

# పేరోల్ ఇంజిన్:
staff = [
    SalariedEmployee("E101", "Balaji", "Engineering", 120000),
    HourlyEmployee("E102", "Alex", "Design", 800, 160),
    Manager("M101", "Chloe", "Management", 150000, 35000)
]

print("--- 💼 Monthly Corporate Payroll Summary ---")
total_payroll = 0
for emp in staff:
    print(emp)
    total_payroll += emp.calculate_pay()
print("=" * 60)
print(f"💰 Total Company Payroll Outflow: ₹{total_payroll:,.2f}")`,
        codeTitle: 'Example 3: Role-Based Employee Payroll Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Polymorphism మ్యాజిక్:</strong>
          <p style="margin-top:6px;">మన కోడ్ లోపల <code>emp.calculate_pay()</code> అని పిలుస్తున్నాం. అది మేనేజర్ ఆ? లేక అవర్లీ వర్కర్ ఆ? అనేది పైథాన్ చూసుకుంటుంది.</p>
        </div>`
      },
      {
        title: '4. Project 4: E-Commerce Shopping Cart (అమెజాన్ కార్ట్ లాగా)',
        body: `<p>కార్ట్ లో ఐటమ్స్ వేయడం, కూపన్ డిస్కౌంట్, మరియు టాక్స్ వేసి బిల్ ప్రింట్ చేసే యాప్:</p>`,
        code: `# =========================================================================
# PROJECT 4: E-COMMERCE SHOPPING CART SYSTEM
# =========================================================================

class Item:
    def __init__(self, item_id, name, unit_price):
        self.item_id = item_id
        self.name = name
        self.unit_price = float(unit_price)

class CartItem:
    def __init__(self, item, quantity=1):
        self.item = item
        self.quantity = quantity

    @property
    def subtotal(self):
        return self.item.unit_price * self.quantity

class ShoppingCart:
    def __init__(self, customer_name):
        self.customer_name = customer_name
        self.items = {}  # item_id -> CartItem (కాంపోజిషన్)

    def add_item(self, item, qty=1):
        if item.item_id in self.items:
            self.items[item.item_id].quantity += qty
        else:
            self.items[item.item_id] = CartItem(item, qty)
        print(f"🛒 Added {qty}x '{item.name}' to cart.")

    def calculate_total(self, discount_percent=0.0, tax_percent=0.18):
        gross = sum(ci.subtotal for ci in self.items.values())
        discount = gross * (discount_percent / 100)
        taxable = gross - discount
        tax = taxable * tax_percent
        final_bill = taxable + tax
        return gross, discount, tax, final_bill

    def print_invoice(self, coupon_discount=10):
        gross, disc, tax, net = self.calculate_total(coupon_discount)
        print("\\n" + "=" * 48)
        print(f"🛍️ INVOICE: {self.customer_name}'s Cart")
        print("=" * 48)
        for ci in self.items.values():
            print(f"• {ci.item.name:20} x{ci.quantity} @ ₹{ci.item.unit_price:,.2f} = ₹{ci.subtotal:,.2f}")
        print("-" * 48)
        print(f"Gross Subtotal:     ₹{gross:,.2f}")
        print(f"Coupon ({coupon_discount}% off):  -₹{disc:,.2f}")
        print(f"GST Tax (18%):      +₹{tax:,.2f}")
        print(f"TOTAL PAYABLE:      ₹{net:,.2f}")
        print("=" * 48)

# డెమో రన్:
laptop = Item("ITM01", "Dell XPS 15", 145000)
mouse = Item("ITM02", "Logitech MX Master", 8500)

cart = ShoppingCart("Balaji")
cart.add_item(laptop, 1)
cart.add_item(mouse, 2)
cart.print_invoice(coupon_discount=10)`,
        codeTitle: 'Project 4: E-Commerce Shopping Cart & Invoice Generator',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 మంచి డిజైన్:</strong>
          <p style="margin-top:6px;"><code>Item</code> కి, <code>CartItem</code> కి డిఫరెన్స్ ఉంది. ఐటమ్ లో ప్రైస్ ఉంటే, కార్ట్ ఐటమ్ లో క్వాంటిటీ (ఎన్ని తీసుకున్నాం) ఉంటుంది. ఇది ఒక క్లీన్ డిజైన్.</p>
        </div>`
      },
      {
        title: '5. Project 5: School System (టీచర్స్, స్టూడెంట్స్, క్లాసెస్)',
        body: `<p>టీచర్స్ కి క్లాసెస్ అసైన్ చేయడం, స్టూడెంట్స్ ఆ కోర్సులో జాయిన్ అవ్వడం, వాళ్ళకి రిపోర్ట్ కార్డ్ ఇవ్వడం:</p>`,
        code: `# =========================================================================
# PROJECT 5: SCHOOL MANAGEMENT SYSTEM
# =========================================================================

class Person:
    def __init__(self, person_id, name, email):
        self.person_id = person_id
        self.name = name
        self.email = email

class Teacher(Person):
    def __init__(self, person_id, name, email, subject):
        super().__init__(person_id, name, email)
        self.subject = subject

    def __str__(self):
        return f"👨‍🏫 Prof. {self.name} (Subject: {self.subject})"

class Course:
    def __init__(self, course_code, title, teacher):
        self.course_code = course_code
        self.title = title
        self.teacher = teacher
        self.enrolled_students = []

    def enroll(self, student):
        if student not in self.enrolled_students:
            self.enrolled_students.append(student)
            student.courses.append(self)

class Student(Person):
    def __init__(self, person_id, name, email, grade_level):
        super().__init__(person_id, name, email)
        self.grade_level = grade_level
        self.courses = []
        self.grades = {}  # course_code -> mark

    def assign_grade(self, course_code, mark):
        self.grades[course_code] = mark

    def get_report_card(self):
        lines = [f"🎓 ACADEMIC REPORT: {self.name} (Grade: {self.grade_level})"]
        for c in self.courses:
            score = self.grades.get(c.course_code, "In Progress")
            lines.append(f"  • {c.title:25} (Instructor: {c.teacher.name}) -> Score: {score}")
        return "\\n".join(lines)

# డెమో రన్:
prof_sharma = Teacher("T01", "Dr. Sharma", "sharma@school.edu", "Python & Algorithms")
prof_rao = Teacher("T02", "Dr. Rao", "rao@school.edu", "Computer Networks")

py_course = Course("CS101", "Advanced Python 3", prof_sharma)
net_course = Course("CS102", "Computer Networks", prof_rao)

student1 = Student("S101", "Balaji", "balaji@school.edu", "12th Standard")
py_course.enroll(student1) # పైథాన్ క్లాస్ లో జాయిన్
net_course.enroll(student1) # నెట్వర్క్స్ క్లాస్ లో జాయిన్

student1.assign_grade("CS101", 96) # మార్క్స్
student1.assign_grade("CS102", 91)

print(student1.get_report_card())`,
        codeTitle: 'Project 5: School & Course Management System',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 కనెక్షన్స్:</strong>
          <p style="margin-top:6px;"><code>Course</code> లో స్టూడెంట్స్ లిస్ట్ ఉంటుంది, <code>Student</code> లో కోర్సెస్ లిస్ట్ ఉంటుంది. ఒకరు మారితే ఇంకొకరి దగ్గర అప్డేట్ అవుతుంది (Bidirectional).</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Class Variable గా లిస్ట్ ని ఇవ్వడం (భయంకరమైన బగ్)',
      text: 'cart_items = [] అని క్లాస్ లోపల, __init__ కి బయట ఇస్తే, ఒక ఆబ్జెక్ట్ లో కార్ట్ కి ఐటమ్ యాడ్ చేస్తే అది మిగతా కస్టమర్స్ అందరి కార్ట్ లోకి వెళ్లిపోతుంది (షేర్డ్ లిస్ట్). ఎప్పుడూ లిస్ట్ ని __init__ లోపల self.items = [] అని ఇవ్వాలి.'
    },
    tryIt: {
      desc: 'బ్యాంక్ అకౌంట్ క్రియేట్ చేసి, ₹5,000 డిపాజిట్ చేసి, ₹1,200 విత్ డ్రా చేసి, వడ్డీ యాడ్ చేసి స్టేట్మెంట్ ప్రింట్ చేయండి.',
      code: `acc = BankAccount("SBI-5544", "Ravi Kumar", 20000.0)
acc.deposit(8000.0)
acc.withdraw(2500.0)
acc.apply_interest()
print(acc.get_statement())`
    },
    faqs: [
      {
        q: 'నేను OOP కాకుండా జస్ట్ మామూలు డిక్షనరీస్ వాడొచ్చా?',
        a: 'చిన్న స్్రిప్ట్స్ కి ఓకే. కానీ పెద్ద ప్రాజెక్ట్స్ కి క్లాసెస్ బెస్ట్, ఎందుకంటే తప్పు కీ పేరు రాస్తే ఎర్రర్స్ రావు కదా డిక్షనరీ లో? క్లాసెస్ లో అలా కాదు, వాలిడేట్ చేస్తుంది.'
      },
      {
        q: 'Single Responsibility Principle (SRP) అంటే ఏంటి?',
        a: 'ఒక క్లాస్ ఒక్క పని మాత్రమే చేయాలి. BankAccount బ్యాలెన్స్ లెక్కలు చూసుకుంటే, దాన్ని ప్రింట్ చేయడానికి ఇంకో క్లాస్ ఉండాలి (రెండూ ఒకేదాంట్లో ఇరికించకూడదు).'
      }
    ]
  }
];
