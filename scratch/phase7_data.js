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
    title: 'Python Classes, Objects & __init__',
    badge: '30. Classes & Objects',
    subtopics: 'OOP Concepts · Class Blueprint vs Object Instance · __init__() Constructor · self Parameter · Instance vs Class Variables',
    desc: 'Master foundational Object-Oriented Programming in Python: the paradigm shift from procedural to object-oriented code, the class blueprint analogy, the __init__() constructor, the self memory pointer, and the crucial distinction between instance variables and class variables.',
    sections: [
      {
        title: '1. What is OOP? Procedural vs Object-Oriented Programming',
        body: `<p><strong>Object-Oriented Programming (OOP)</strong> is a programming paradigm based on the concept of <strong>"Objects"</strong> which contain both <strong>Data</strong> (in the form of fields or attributes) and <strong>Code</strong> (in the form of procedures or methods).</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">Procedural vs Object-Oriented Programming:</h4>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Feature</th><th>Procedural Programming</th><th>Object-Oriented Programming (OOP)</th></tr>
          <tr><td><strong>Core Focus</strong></td><td>Functions and step-by-step algorithms</td><td>Real-world entities (Objects) and state</td></tr>
          <tr><td><strong>Data Handling</strong></td><td>Data is separated from functions (global state risks)</td><td>Data and methods are <strong>encapsulated together</strong></td></tr>
          <tr><td><strong>Reusability</strong></td><td>Function calls only</td><td>Inheritance, Polymorphism & Composition</td></tr>
          <tr><td><strong>Security</strong></td><td>Data is freely accessible across modules</td><td>Access control (Encapsulation / Private fields)</td></tr>
        </table>
        <p><strong>The Blueprint Analogy:</strong> A <strong>Class</strong> is like an architectural blueprint for a house. The blueprint itself is not a physical house; it defines the dimensions, rooms, and doors. An <strong>Object (or Instance)</strong> is the actual physical house built from that blueprint in memory!</p>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  Class Blueprint: BankAccount                          │
│  ├── Attributes: owner, balance, account_number        │
│  └── Methods: deposit(), withdraw(), show_balance()    │
└───────────────────────────┬────────────────────────────┘
                            │  [Instantiate: Account("Ravi", 5000)]
                            ▼
┌────────────────────────────────────────────────────────┐
│  Heap Memory Object Instance: (id: 0x7fa28b)           │
│  ├── owner = "Ravi"                                    │
│  └── balance = 5000                                    │
└────────────────────────────────────────────────────────┘</div>`,
        code: `# Defining your first Class and Instantiating an Object:
class Car:
    """A blueprint representing a motor vehicle."""
    
    # The __init__ method initializes attributes for every new instance:
    def __init__(self, brand, model, year):
        self.brand = brand  # Instance variable
        self.model = model  # Instance variable
        self.year = year    # Instance variable
        self.is_running = False

    # Instance method:
    def start_engine(self):
        self.is_running = True
        return f"🚗 {self.brand} {self.model}'s engine is now RUNNING! Vroom!"

# Instantiating two independent objects from the Car blueprint:
car1 = Car("Tesla", "Model 3", 2024)
car2 = Car("Toyota", "Supra", 2023)

print("Car 1 Brand:", car1.brand, "| Model:", car1.model)
print("Car 2 Brand:", car2.brand, "| Model:", car2.model)
print(car1.start_engine())`,
        codeTitle: 'Example 1: Defining a Class and Instantiating Objects',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Step-by-Step Breakdown:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>class Car:</code> defines the class template.</li>
            <li><code>car1 = Car("Tesla", "Model 3", 2024)</code> allocates memory on the heap and executes <code>__init__</code>.</li>
            <li><code>car1</code> and <code>car2</code> maintain completely independent attributes in separate memory slots.</li>
          </ul>
        </div>`
      },
      {
        title: '2. The __init__() Constructor & The self Parameter Demystified',
        body: `<p>In Python, <strong><code>__init__()</code></strong> is a special dunder (double-underscore) method known as the <strong>Instance Initializer / Constructor</strong>. It is automatically called by CPython whenever a new object is instantiated.</p>
        <h4 style="color:#10b981; margin:16px 0 8px;">What is <code>self</code>?</h4>
        <p><code>self</code> represents the <strong>exact instance of the object currently calling the method</strong>. When you write <code>account.deposit(500)</code>, Python translates this under the hood to <code>BankAccount.deposit(account, 500)</code>!</p>
        <div class="diagram-box">Caller Code:         account1.show_balance()
CPython Translation: BankAccount.show_balance(account1)  <-- 'account1' is passed as 'self'!</div>
        <p>Because Python passes the active object as the first argument automatically, every instance method must explicitly declare <code>self</code> as its first parameter.</p>`,
        code: `# BankAccount Class Demonstration:
class BankAccount:
    def __init__(self, owner, balance):
        # self binds the arguments to this specific instance:
        self.owner = owner
        self.balance = float(balance)

    def deposit(self, amount):
        if amount <= 0:
            print("❌ Deposit amount must be positive!")
            return
        self.balance += amount
        print(f"✅ Deposited ₹{amount:,.2f} to {self.owner}'s account.")

    def show_balance(self):
        print(f"💳 Account Holder: {self.owner} | Current Balance: ₹{self.balance:,.2f}")

# Creating account and invoking methods:
account = BankAccount("Ravi", 5000)
account.show_balance()
account.deposit(1000)
account.show_balance()`,
        codeTitle: 'Example 2: BankAccount Class with __init__ and self',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why self is mandatory:</strong>
          <p style="margin-top:6px;">Without <code>self.balance</code>, Python would create a temporary local variable inside <code>deposit()</code> that would be discarded the moment the function finishes. <code>self.balance</code> attaches the variable to the object permanently.</p>
        </div>`
      },
      {
        title: '3. Instance Variables vs Class Variables',
        body: `<p>One of the most critical concepts in OOP is the distinction between variable scopes:</p>
        <ul>
          <li><strong>Instance Variables (<code>self.name</code>):</strong> Variables defined inside <code>__init__</code> using <code>self</code>. Every object instance has its own unique, private copy stored in its <code>__dict__</code> table.</li>
          <li><strong>Class Variables:</strong> Variables declared directly inside the class body outside any method. <strong>A single shared copy exists in memory</strong> for the entire class, shared across all instances!</li>
        </ul>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  Class: Employee (Class Variable: company = "TechCorp")│
├────────────────────────────────────────────────────────┤
│  ├── Instance 1 (emp1): name="Balaji", salary=95000    │
│  └── Instance 2 (emp2): name="Alex", salary=75000      │
└────────────────────────────────────────────────────────┘</div>`,
        code: `class Employee:
    # 1. Class Variable (Shared across ALL employees):
    company_name = "Tech Innovations Ltd"
    total_employees_count = 0

    def __init__(self, name, department, salary):
        # 2. Instance Variables (Unique to EACH employee):
        self.name = name
        self.department = department
        self.salary = salary
        
        # Increment shared class counter:
        Employee.total_employees_count += 1

    def get_details(self):
        return f"• {self.name:8} ({self.department}) | Salary: ₹{self.salary:,} | Company: {self.company_name}"

# Creating employee instances:
emp1 = Employee("Balaji", "Backend", 95000)
emp2 = Employee("Alex", "DevOps", 82000)
emp3 = Employee("Chloe", "AI/ML", 105000)

print(emp1.get_details())
print(emp2.get_details())
print(emp3.get_details())
print(f"\\n🏢 Total Registered Employees across company: {Employee.total_employees_count}")`,
        codeTitle: 'Example 3: Instance Variables vs Shared Class Variables',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Namespace Resolution:</strong>
          <p style="margin-top:6px;">When accessing <code>emp1.company_name</code>, Python first checks <code>emp1.__dict__</code>. If not found, it falls back to <code>Employee.__dict__</code>.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Accidentally Modifying a Class Variable via an Instance (Shadowing)',
      text: 'Writing emp1.company_name = "NewCorp" does NOT change the class variable for all employees. It creates a new instance variable on emp1 that shadows the class variable! Always modify class variables via the Class name: Employee.company_name = "NewCorp".'
    },
    tryIt: {
      desc: 'Create a Book class with title, author, and price attributes. Add a method apply_discount(percent) that reduces the price in place.',
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
        q: 'Why do Python methods require "self" as the first argument explicitly?',
        a: 'Explicit self adheres to Python\'s Zen principle: "Explicit is better than implicit". It makes instance variable access unambiguous and eliminates hidden scoping magic.'
      },
      {
        q: 'Can a class have multiple __init__ constructors in Python?',
        a: 'No. Python does not support traditional method overloading by signature. Defining multiple __init__ methods simply overrides previous ones. Instead, use default arguments (*args, **kwargs) or @classmethod alternative constructors.'
      },
      {
        q: 'What is the __del__ method in Python?',
        a: '__del__ is the destructor method called when an object\'s reference count reaches zero right before CPython garbage collection frees its memory.'
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
    title: 'Python Encapsulation & Properties',
    badge: '31. Encapsulation & Properties',
    subtopics: 'Encapsulation · Public, Protected (_), Private (__) · Name Mangling · @property Decorator · Getters & Setters',
    desc: 'Master data protection and encapsulation in Python: public attributes, protected conventions with single underscore (_), private attributes with double underscore (__), name mangling internals, and Pythonic getters/setters with the @property decorator.',
    sections: [
      {
        title: '1. What is Encapsulation? Data Hiding and Access Control',
        body: `<p><strong>Encapsulation</strong> is the bundling of data (attributes) and the methods that operate on that data into a single unit, while restricting direct outside access to internal implementation details.</p>
        <p>In Python, access modifiers are governed by naming conventions rather than strict language keywords (like <code>private</code> in Java/C++):</p>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Modifier</th><th>Naming Syntax</th><th>Accessibility / Convention</th></tr>
          <tr><td><strong>Public</strong></td><td><code>self.name</code></td><td>Accessible freely from anywhere (inside and outside the class).</td></tr>
          <tr><td><strong>Protected</strong></td><td><code>self._balance</code></td><td><strong>Convention only:</strong> Signals to other developers that this is internal and should only be accessed by this class and its subclasses.</td></tr>
          <tr><td><strong>Private</strong></td><td><code>self.__pin</code></td><td><strong>Enforced by Python:</strong> Triggers <strong>Name Mangling</strong> to prevent accidental outside access or subclass overriding.</td></tr>
        </table>`,
        code: `class UserAccount:
    def __init__(self, username, email, pin):
        self.username = username      # Public (Freely accessible)
        self._email = email          # Protected (Convention: internal use)
        self.__pin = pin             # Private (Name mangled!)

    def verify_pin(self, entered_pin):
        return self.__pin == entered_pin

user = UserAccount("balaji_dev", "balaji@test.com", 1234)

# 1. Accessing Public attribute:
print("Public Username:", user.username)

# 2. Accessing Protected attribute (Works, but discouraged by convention):
print("Protected Email:", user._email)

# 3. Attempting to access Private attribute directly raises AttributeError:
try:
    print(user.__pin)
except AttributeError as err:
    print("❌ Private Access Blocked:", err)`,
        codeTitle: 'Example 1: Public, Protected (_), and Private (__) Modifiers',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why user.__pin failed:</strong>
          <p style="margin-top:6px;">Python actively protects private variables by rewriting their names in memory so external callers cannot accidentally read or corrupt them.</p>
        </div>`
      },
      {
        title: '2. Name Mangling Internals (_ClassName__attribute)',
        body: `<p>When Python encounters an identifier starting with two or more leading underscores (<code>__pin</code>), it automatically rewrites the variable name internally to <strong><code>_ClassName__attribute</code></strong> (e.g. <code>_UserAccount__pin</code>).</p>
        <p>This mechanism is known as <strong>Name Mangling</strong>. Its primary purpose is not cryptography, but to <strong>prevent accidental name collisions in inheritance hierarchies</strong> when subclasses define attributes with identical names.</p>`,
        code: `# Inspecting the internal __dict__ table of the instance:
user = UserAccount("ravi_k", "ravi@test.com", 9988)

print("Instance Memory Dictionary (__dict__):")
print(user.__dict__)

# Accessing the mangled name directly (Proof of Name Mangling):
print("\\nAccessing via mangled name (_UserAccount__pin):", user._UserAccount__pin)`,
        codeTitle: 'Example 2: Inspecting Name Mangling in Python Memory',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Python Philosophy:</strong>
          <p style="margin-top:6px;">As Python core developers famously say, <em>"We are all consenting adults here."</em> Name mangling discourages unsafe access while still leaving the door open for debugging tools and serializers.</p>
        </div>`
      },
      {
        title: '3. Pythonic Getters, Setters & The @property Decorator',
        body: `<p>In languages like Java, developers are forced to write verbose boilerplate methods: <code>getBalance()</code> and <code>setBalance(val)</code>. In Python, you can expose methods as if they were simple attributes using the <strong><code>@property</code> decorator</strong>!</p>
        <p>This allows you to add <strong>validation, type checking, and computed logic</strong> transparently without breaking existing code that accesses the attribute directly:</p>`,
        code: `class BankAccount:
    def __init__(self, owner, initial_balance):
        self.owner = owner
        self._balance = 0.0          # Protected backing field
        self.balance = initial_balance # Routes through @balance.setter for validation!

    # 1. Getter property:
    @property
    def balance(self):
        """Getter: returns the current balance."""
        return self._balance

    # 2. Setter property with validation:
    @balance.setter
    def balance(self, value):
        """Setter: enforces positive balance rule."""
        if not isinstance(value, (int, float)):
            raise TypeError("Balance must be a numeric value!")
        if value < 0:
            raise ValueError(f"Balance cannot be negative! Attempted: ₹{value}")
        self._balance = float(value)

    # 3. Read-Only computed property:
    @property
    def formatted_balance(self):
        return f"₹{self._balance:,.2f}"

# Test the property decorator:
acc = BankAccount("Balaji", 5000)
print("Balance accessed as attribute:", acc.balance) # Calls getter!
print("Formatted:", acc.formatted_balance)

# Update balance cleanly (Calls setter validation):
acc.balance = 7500
print("Updated Balance:", acc.formatted_balance)

# Attempt invalid negative update:
try:
    acc.balance = -1000 # Triggers ValueError!
except ValueError as err:
    print("🚫 Validation Prevented Error:", err)`,
        codeTitle: 'Example 3: Clean Data Validation with @property and @setter',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why @property is Superior:</strong>
          <p style="margin-top:6px;">Callers use clean syntax <code>acc.balance = 7500</code> without ugly method calls like <code>acc.setBalance(7500)</code>, while your class retains 100% control over validation.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Infinite Recursion Loop in @property Setter (RecursionError)',
      text: 'Inside the setter "def balance(self, value):", writing "self.balance = value" calls the setter again endlessly until RecursionError crashes Python! You must assign to the private backing variable: self._balance = value.'
    },
    tryIt: {
      desc: 'Create a Temperature class with a celsius property. Add a getter and setter with a rule that temperature cannot be below absolute zero (-273.15°C).',
      code: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero is impossible!")
        self._celsius = value

t = Temperature(25)
print(f"Temperature: {t.celsius}°C")
t.celsius = 38
print(f"Updated: {t.celsius}°C")`
    },
    faqs: [
      {
        q: 'Is there true private data in Python like private in Java/C++?',
        a: 'No. Python uses name mangling (_ClassName__var) to protect private attributes. It prevents accidental collisions and warns developers, but does not provide hard memory-level access barriers.'
      },
      {
        q: 'What is the @deleter decorator in Python properties?',
        a: '@property_name.deleter allows you to customize what happens when someone executes "del obj.property_name", such as resetting a cached value or cleaning up related resources.'
      },
      {
        q: 'Can a property be read-only in Python?',
        a: 'Yes! Simply define the @property getter without defining a corresponding @setter. Any attempt to assign to the attribute will raise an AttributeError: property has no setter.'
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
    title: 'Python Inheritance, MRO & Polymorphism',
    badge: '32. Inheritance & Polymorphism',
    subtopics: 'Single Inheritance · super() · Method Overriding · Multiple Inheritance · MRO (C3 Linearization) · Polymorphism & Duck Typing',
    desc: 'Master code reuse and polymorphic design in Python: single and multiple inheritance, super() constructor chaining, method overriding, Method Resolution Order (MRO) with C3 linearization, and runtime polymorphism via Duck Typing.',
    sections: [
      {
        title: '1. Single Inheritance & Constructor Chaining with super()',
        body: `<p><strong>Inheritance</strong> allows a new class (<strong>Child / Subclass</strong>) to inherit attributes and methods from an existing class (<strong>Parent / Base Class</strong>), establishing an <strong>"Is-A"</strong> relationship.</p>
        <p><strong>Constructor Chaining with <code>super()</code>:</strong> When a child class overrides <code>__init__</code>, it MUST call <code>super().__init__(...)</code> to initialize the parent class attributes in memory properly:</p>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  Parent Class: Vehicle (brand, model, year)            │
│  └── Method: describe()                                │
└───────────────────────────┬────────────────────────────┘
                            │  [class ElectricCar(Vehicle)]
                            ▼
┌────────────────────────────────────────────────────────┐
│  Child Class: ElectricCar (battery_capacity_kwh)       │
│  └── Method: describe(), charge()                      │
└────────────────────────────────────────────────────────┘</div>`,
        code: `class Vehicle:
    """Base class for all vehicles."""
    def __init__(self, brand, model, base_price):
        self.brand = brand
        self.model = model
        self.base_price = base_price

    def get_info(self):
        return f"{self.brand} {self.model} | Base Price: ₹{self.base_price:,.2f}"

class ElectricCar(Vehicle):
    """Subclass inheriting from Vehicle."""
    def __init__(self, brand, model, base_price, battery_kwh):
        # super() invokes Vehicle's __init__ method:
        super().__init__(brand, model, base_price)
        self.battery_kwh = battery_kwh

    # Method Overriding: Specialized description for electric cars
    def get_info(self):
        parent_info = super().get_info()
        return f"⚡ [EV] {parent_info} | Battery: {self.battery_kwh} kWh"

    def charge(self):
        return f"🔋 Charging {self.brand} {self.model}'s {self.battery_kwh} kWh battery to 100%..."

# Instantiate ElectricCar:
ev = ElectricCar("Tata", "Nexon EV", 1450000, 40.5)
print(ev.get_info())
print(ev.charge())`,
        codeTitle: 'Example 1: Single Inheritance, super(), and Method Overriding',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Reusability:</strong>
          <p style="margin-top:6px;"><code>ElectricCar</code> reuses <code>brand</code>, <code>model</code>, and <code>base_price</code> logic from <code>Vehicle</code> without rewriting a single line of boilerplate code.</p>
        </div>`
      },
      {
        title: '2. Multiple Inheritance & Method Resolution Order (MRO)',
        body: `<p>Unlike languages like Java which prohibit multiple class inheritance, Python natively supports <strong>Multiple Inheritance</strong> (a class inheriting from two or more parent classes).</p>
        <p>When methods with identical names exist across multiple parents (the classic <strong>Diamond Problem</strong>), Python resolves which method to invoke using a deterministic algorithm called <strong>C3 Linearization (Method Resolution Order - MRO)</strong>.</p>
        <p>You can inspect any class's lookup hierarchy using <code>ClassName.__mro__</code> or <code>ClassName.mro()</code>:</p>`,
        code: `class Flyer:
    def move(self):
        return "🦅 Flying through the clouds!"

class Swimmer:
    def move(self):
        return "🏊 Swimming through the ocean!"

# Duck inherits from BOTH Flyer and Swimmer:
class Duck(Flyer, Swimmer):
    def quack(self):
        return "🦆 Quack Quack!"

donald = Duck()

# Because Flyer is listed FIRST in class Duck(Flyer, Swimmer), Flyer.move() wins:
print("Donald's move:", donald.move())
print("Donald's quack:", donald.quack())

# Inspecting the exact Method Resolution Order (MRO):
print("\\n--- Duck Method Resolution Order (MRO) ---")
for idx, cls in enumerate(Duck.__mro__, 1):
    print(f"{idx}. {cls.__name__}")`,
        codeTitle: 'Example 2: Multiple Inheritance and MRO Hierarchy',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 MRO Order:</strong>
          <p style="margin-top:6px;">The resolution order is <code>Duck -> Flyer -> Swimmer -> object</code>. Python searches left-to-right through the base classes.</p>
        </div>`
      },
      {
        title: '3. Polymorphism & Python\'s "Duck Typing" Principle',
        body: `<p><strong>Polymorphism</strong> means "many forms" — the ability of different objects to respond to the same method call in their own specialized way.</p>
        <p>In Python, polymorphism is driven by <strong>Duck Typing</strong>: <em>"If it walks like a duck and quacks like a duck, it\'s a duck."</em> Python does not check if objects belong to the same inheritance tree; as long as they implement the expected method name, they can be processed interchangeably!</p>`,
        code: `class CreditCardPayment:
    def process_payment(self, amount):
        return f"💳 Charged ₹{amount:,.2f} via Credit Card Gateway."

class UPIPayment:
    def process_payment(self, amount):
        return f"📱 Transferred ₹{amount:,.2f} instantly via UPI (GPay/PhonePe)."

class CryptoPayment:
    def process_payment(self, amount):
        return f"🪙 Transferred ₹{amount:,.2f} worth of Bitcoin to wallet."

# Polymorphic Checkout Processor:
def checkout(payment_provider, bill_amount):
    # Works with ANY object that has a process_payment() method!
    print(payment_provider.process_payment(bill_amount))

# Process orders with different payment handlers polymorphically:
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
          <strong style="color:#10b981;">🔍 Extensibility (Open-Closed Principle):</strong>
          <p style="margin-top:6px;">You can add a new payment method (e.g. <code>NetBankingPayment</code>) without modifying a single line of the existing <code>checkout()</code> function!</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Forgetting to Call super().__init__() in Subclasses',
      text: 'If a child class overrides __init__ without calling super().__init__(), parent class attributes are never initialized in memory, causing AttributeError when calling inherited methods.'
    },
    tryIt: {
      desc: 'Create a base class Shape with an area() method, and subclasses Rectangle(length, width) and Circle(radius) that implement area().',
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
        q: 'What is the Diamond Problem in Multiple Inheritance?',
        a: 'The Diamond Problem occurs when class D inherits from B and C, which both inherit from A. If B and C override a method from A, ambiguity arises as to which method D inherits. Python solves this cleanly with C3 Linearization (MRO).'
      },
      {
        q: 'What is the difference between isinstance() and type() in inheritance?',
        a: 'type(obj) == BaseClass returns False for subclass instances. isinstance(obj, BaseClass) returns True for both BaseClass and any of its derived subclasses (polymorphically aware).'
      },
      {
        q: 'Can a class inherit from built-in types like list or dict?',
        a: 'Yes! In Python, you can subclass built-in types (e.g. class CustomList(list):) to add specialized validation or custom methods.'
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
    title: 'Python Abstract Classes & Dunder Methods',
    badge: '33. ABCs & Dunder Methods',
    subtopics: 'Abstract Base Classes (abc.ABC) · @abstractmethod · __str__ vs __repr__ · __len__ · __eq__ · Operator Overloading',
    desc: 'Master formal interface contracts with Python\'s abc module and Abstract Base Classes (ABCs), and unlock custom operator behavior with Python Dunder (Magic) Methods like __str__, __repr__, __len__, __eq__, and __add__.',
    sections: [
      {
        title: '1. Abstract Base Classes (ABCs) & Interface Contracts',
        body: `<p>An <strong>Abstract Base Class (ABC)</strong> is a blueprint class that defines a common interface contract for a set of subclasses. It <strong>cannot be instantiated directly</strong>.</p>
        <p>Using Python\'s built-in <strong><code>abc</code> module</strong> (<code>ABC</code> and <code>@abstractmethod</code>):</p>
        <ul>
          <li>Any subclass inheriting from an ABC <strong>MUST implement all declared abstract methods</strong>.</li>
          <li>If a subclass forgets to implement an abstract method, Python prevents instantiation at runtime with a <code>TypeError: Can't instantiate abstract class ... with abstract method</code>.</li>
        </ul>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  Abstract Class: DatabaseConnector (ABC)               │
│  ├── @abstractmethod connect()                         │
│  └── @abstractmethod query(sql)                        │
└───────────────────────────┬────────────────────────────┘
                            │  [Mandatory Implementation Contract]
         ┌──────────────────┴──────────────────┐
         ▼                                     ▼
┌─────────────────────────────┐   ┌─────────────────────────────┐
│ PostgresConnector           │   │ MongoConnector              │
│ ├── connect() { ... }       │   │ ├── connect() { ... }       │
│ └── query(sql) { ... }      │   │ └── query(sql) { ... }      │
└─────────────────────────────┘   └─────────────────────────────┘</div>`,
        code: `from abc import ABC, abstractmethod

class NotificationService(ABC):
    """Abstract Base Class defining the notification contract."""
    
    @abstractmethod
    def send(self, recipient, message):
        """Must be implemented by all notification channels!"""
        pass

class EmailNotification(NotificationService):
    def send(self, recipient, message):
        return f"📧 Sending Email to [{recipient}]: '{message}'"

class SMSNotification(NotificationService):
    def send(self, recipient, message):
        return f"📱 Sending SMS to [{recipient}]: '{message}'"

# 1. Attempting to instantiate the Abstract Base Class fails:
try:
    service = NotificationService()
except TypeError as err:
    print("🚫 ABC Instantiation Blocked:", err)

# 2. Concrete subclasses work properly:
services = [EmailNotification(), SMSNotification()]
for s in services:
    print(s.send("balaji@test.com", "Your OTP is 492810"))`,
        codeTitle: 'Example 1: Defining and Enforcing Abstract Base Classes (ABCs)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Architectural Safety:</strong>
          <p style="margin-top:6px;">ABCs guarantee that team members never deploy a half-implemented plugin or driver that crashes in production due to a missing method.</p>
        </div>`
      },
      {
        title: '2. Representation Dunder Methods: __str__() vs __repr__()',
        body: `<p>In Python, <strong>Dunder (Magic) methods</strong> are special methods surrounded by double underscores (<code>__method__</code>) that hook directly into Python\'s syntax operators:</p>
        <ul>
          <li><strong><code>__str__(self)</code>:</strong> Returns a user-friendly, human-readable string representation (called by <code>print(obj)</code> and <code>str(obj)</code>).</li>
          <li><strong><code>__repr__(self)</code>:</strong> Returns an unambiguous, developer-focused representation showing exact type and parameters, ideally valid Python code to recreate the object (called by interactive REPLs and debugger inspection).</li>
        </ul>`,
        code: `class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = float(price)

    # Human-friendly display string:
    def __str__(self):
        return f"{self.name} (₹{self.price:,.2f})"

    # Unambiguous developer representation:
    def __repr__(self):
        return f"Product(name={self.name!r}, price={self.price})"

item = Product("Mechanical Keyboard", 2499.00)

print("str(item) for Users:    ", str(item))  # Mechanical Keyboard (₹2,499.00)
print("repr(item) for Developers:", repr(item)) # Product(name='Mechanical Keyboard', price=2499.0)`,
        codeTitle: 'Example 2: Implementing __str__ and __repr__ for Clean Output',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Golden Rule of __repr__:</strong>
          <p style="margin-top:6px;">If you only implement one of them, always implement <code>__repr__</code>, because Python will automatically fall back to <code>__repr__</code> if <code>__str__</code> is missing.</p>
        </div>`
      },
      {
        title: '3. Operator Overloading: __len__(), __eq__(), and __add__()',
        body: `<p>Python allows your custom classes to integrate seamlessly with standard language operators:</p>
        <ul>
          <li><code>__len__()</code>: Hooks into <code>len(obj)</code>.</li>
          <li><code>__eq__()</code>: Hooks into <code>==</code> value comparison.</li>
          <li><code>__add__()</code>: Hooks into the <code>+</code> addition operator.</li>
        </ul>`,
        code: `class Money:
    def __init__(self, amount, currency="INR"):
        self.amount = float(amount)
        self.currency = currency

    def __repr__(self):
        return f"Money({self.amount}, '{self.currency}')"

    def __str__(self):
        return f"₹{self.amount:,.2f} {self.currency}"

    # Overload == operator:
    def __eq__(self, other):
        if isinstance(other, Money):
            return self.amount == other.amount and self.currency == other.currency
        return False

    # Overload + operator:
    def __add__(self, other):
        if not isinstance(other, Money) or self.currency != other.currency:
            raise TypeError("Cannot add money of different currencies!")
        return Money(self.amount + other.amount, self.currency)

# Test operator overloading:
m1 = Money(1500)
m2 = Money(2500)
m3 = Money(1500)

print("m1 + m2 =", m1 + m2)     # Calls __add__ -> ₹4,000.00 INR
print("m1 == m3?", m1 == m3)     # Calls __eq__  -> True
print("m1 == m2?", m1 == m2)     # Calls __eq__  -> False`,
        codeTitle: 'Example 3: Overloading == and + Operators with Dunder Methods',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Elegant Syntax:</strong>
          <p style="margin-top:6px;">With <code>__add__</code> and <code>__eq__</code>, your custom objects behave like built-in Python primitives with natural mathematical syntax!</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Returning Non-String Objects from __str__() or __repr__()',
      text: 'The __str__() and __repr__() methods MUST return a string object (str). Returning an integer, list, or printing to the console with print() inside them causes a fatal TypeError: __str__ returned non-string.'
    },
    tryIt: {
      desc: 'Create a ShoppingBag class that holds a list of items. Implement __len__() to return total item count, and __str__() to format the bag contents.',
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
        q: 'What is the difference between an Abstract Class and an Interface in Python?',
        a: 'In Python, there is no separate "interface" keyword. Abstract Base Classes (ABCs) serve as interfaces by defining abstract methods with no body (@abstractmethod), while also allowing partial implementation of shared concrete helper methods.'
      },
      {
        q: 'What happens if a subclass does not implement all @abstractmethods?',
        a: 'Python raises TypeError: Can\'t instantiate abstract class SubClass with abstract method ... when attempting to instantiate the subclass.'
      },
      {
        q: 'What is the purpose of __getitem__ and __setitem__?',
        a: '__getitem__ and __setitem__ allow custom objects to support square-bracket indexing and dictionary-like access: obj[key] and obj[key] = value.'
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
    title: 'Python Composition & Dataclasses',
    badge: '34. Composition & Dataclasses',
    subtopics: 'Composition ("Has-A") vs Inheritance ("Is-A") · Decoupling · @dataclass (PEP 557) · field(default_factory) · Frozen Immutability',
    desc: 'Master clean decoupled software architecture in Python: favoring composition over inheritance ("Has-A" vs "Is-A"), and dramatically reducing boilerplate code using modern Python dataclasses (PEP 557).',
    sections: [
      {
        title: '1. Composition Over Inheritance ("Has-A" Relationship)',
        body: `<p>A famous principle in software architecture states: <strong>"Favor Object Composition over Class Inheritance"</strong>.</p>
        <ul>
          <li><strong>Inheritance ("Is-A"):</strong> Tight coupling. A <code>Dog</code> <em>is an</em> <code>Animal</code>. Changes to the parent class risk breaking all child classes across a large codebase.</li>
          <li><strong>Composition ("Has-A"):</strong> Loose coupling. A <code>Car</code> <em>has an</em> <code>Engine</code>. Complex systems are assembled by combining independent, reusable building block components.</li>
        </ul>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  Composite Class: Car                                  │
│  ├── Has-A: Engine Object (v8_engine)                  │
│  └── Has-A: List of Tire Objects (4 Michelin tires)    │
└────────────────────────────────────────────────────────┘</div>`,
        code: `# Independent Component Classes:
class Engine:
    def __init__(self, horsepower, fuel_type):
        self.horsepower = horsepower
        self.fuel_type = fuel_type

    def ignite(self):
        return f"🔥 Engine ({self.horsepower} HP, {self.fuel_type}) ignited and purring!"

class GPSNavigator:
    def route_to(self, destination):
        return f"🗺️ Calculating shortest route to '{destination}'..."

# Composite Class assembling components:
class Automobile:
    def __init__(self, model, engine_hp, fuel_type):
        self.model = model
        # COMPOSITION: Automobile "has an" Engine and "has a" GPS:
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
          <strong style="color:#10b981;">🔍 Flexibility:</strong>
          <p style="margin-top:6px;">If you want an electric car, you can simply swap <code>self.engine = ElectricMotor()</code> without altering the vehicle's navigation, chassis, or seating logic.</p>
        </div>`
      },
      {
        title: '2. Modern Dataclasses: Eliminating Boilerplate (PEP 557)',
        body: `<p>Introduced in Python 3.7 (PEP 557), <strong><code>@dataclass</code></strong> automatically writes boilerplate code for you, generating:</p>
        <ul>
          <li><code>__init__()</code> with type annotations.</li>
          <li><code>__repr__()</code> for clean printing.</li>
          <li><code>__eq__()</code> for value-based comparison.</li>
        </ul>`,
        code: `from dataclasses import dataclass, field
from typing import List

# Automatically generates __init__, __repr__, and __eq__ in 5 lines:
@dataclass
class StudentProfile:
    student_id: int
    name: str
    branch: str
    gpa: float = 0.0
    skills: List[str] = field(default_factory=list) # Safe mutable list!

# Instantiating dataclasses:
s1 = StudentProfile(101, "Balaji", "Computer Science", 9.4, ["Python", "FastAPI"])
s2 = StudentProfile(101, "Balaji", "Computer Science", 9.4, ["Python", "FastAPI"])

print("--- Dataclass Generated Representation ---")
print(s1)

print("\\n--- Automatic Value Equality (__eq__) ---")
print("s1 == s2?", s1 == s2) # True! Automatically compares all fields!`,
        codeTitle: 'Example 2: Defining Dataclasses with PEP 557',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 field(default_factory=list):</strong>
          <p style="margin-top:6px;">Never use <code>skills: List[str] = []</code> in a dataclass. Always use <code>field(default_factory=list)</code> to ensure a fresh new list is created for every instance.</p>
        </div>`
      },
      {
        title: '3. Immutable Value Objects: Frozen Dataclasses',
        body: `<p>Adding <code>frozen=True</code> creates an <strong>immutable dataclass</strong> that acts like a write-protected tuple. It can also be hashed and stored in sets or used as dictionary keys:</p>`,
        code: `from dataclasses import dataclass

@dataclass(frozen=True)
class GeoCoordinates:
    latitude: float
    longitude: float

location = GeoCoordinates(17.3850, 78.4867)
print("Geo Coordinates:", location)

# Attempting mutation raises FrozenInstanceError:
try:
    location.latitude = 18.0000
except Exception as err:
    print("🔒 Frozen Dataclass Protected:", type(err).__name__, err)`,
        codeTitle: 'Example 3: Immutable Read-Only Dataclasses with frozen=True',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Data Integrity:</strong>
          <p style="margin-top:6px;">Frozen dataclasses provide thread-safe, unalterable value objects perfect for domain configuration and mathematical vectors.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Using Mutable Defaults in Dataclasses without field(default_factory=...)',
      text: 'Writing "tags: list = []" inside a @dataclass raises ValueError: mutable default <class \'list\'> is not allowed. You must write "tags: list = field(default_factory=list)".'
    },
    tryIt: {
      desc: 'Create a dataclass InventoryItem with name, price, quantity, and a method total_value() returning price * quantity.',
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
        q: 'When should I choose Composition over Inheritance?',
        a: 'Use Inheritance when there is a true polymorphic "Is-A" relationship and shared interface. Use Composition when you want to build complex behaviors by combining independent components ("Has-A") without coupling class hierarchies.'
      },
      {
        q: 'Can a dataclass have custom methods?',
        a: 'Yes! A dataclass is a regular Python class with automatically generated dunder methods. You can add methods, properties, class variables, and inheritance freely.'
      },
      {
        q: 'What is the __post_init__ method in a dataclass?',
        a: '__post_init__() is called immediately after the generated __init__() finishes, allowing you to validate data or initialize dependent computed fields.'
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
    title: 'OOP Capstone Projects',
    badge: '35. OOP Capstone Projects',
    subtopics: '5 Full Projects · 1. Bank System · 2. Library System · 3. Employee System · 4. Shopping Cart · 5. School System',
    desc: 'Build five production-grade Object-Oriented software systems in Python: Bank Account Manager with transactions, Library Catalog with lending, Role-Based Employee Payroll, E-Commerce Shopping Cart with coupon discounts, and School Management System.',
    sections: [
      {
        title: '1. Project 1: Enterprise Bank Management System',
        body: `<p>An object-oriented banking engine featuring encapsulation, deposit/withdrawal validation, transaction histories, and interest accrual:</p>`,
        code: `# =========================================================================
# PROJECT 1: OBJECT-ORIENTED BANK MANAGEMENT SYSTEM
# =========================================================================

class BankAccount:
    interest_rate = 0.04  # 4% Annual Interest (Class Variable)

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

# Run Banking System Demo:
acc = BankAccount("SBI-9021", "Balaji", 10000.0)
print(acc.deposit(5000.0))
print(acc.withdraw(3000.0))
print(acc.apply_interest())
print("\\n" + acc.get_statement())`,
        codeTitle: 'Project 1: Bank Account Management Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 OOP Design Principles:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>Protected <code>_balance</code> with a read-only <code>@property</code> prevents direct unauthorized balance tampering.</li>
            <li>Full audit logging via <code>self.transaction_history</code>.</li>
          </ul>
        </div>`
      },
      {
        title: '2. Project 2: Library Catalog & Book Lending Management System',
        body: `<p>A complete library management system modeling books, borrowers, checkout duration, and book availability:</p>`,
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
            return "❌ Error: Book not found in catalog!"
        if book.is_borrowed:
            return f"❌ '{book.title}' is currently borrowed by {book.borrowed_by}!"
        book.is_borrowed = True
        book.borrowed_by = borrower_name
        return f"📖 Successfully issued '{book.title}' to {borrower_name}."

    def return_book(self, book_id):
        book = self.catalog.get(book_id)
        if not book or not book.is_borrowed:
            return "❌ Error: Book is not currently on loan!"
        borrower = book.borrowed_by
        book.is_borrowed = False
        book.borrowed_by = None
        return f"✅ '{book.title}' returned successfully by {borrower}."

    def display_catalog(self):
        print(f"\\n--- 🏛️ {self.name} Catalog ---")
        for b in self.catalog.values():
            print("•", b)

# Run Library System Demo:
lib = Library("City Central Tech Library")
lib.add_book(Book("B101", "Fluent Python", "Luciano Ramalho"))
lib.add_book(Book("B102", "Clean Code", "Robert C. Martin"))
lib.add_book(Book("B103", "Designing Data-Intensive Apps", "Martin Kleppmann"))

lib.display_catalog()
print("\\n" + lib.lend_book("B101", "Balaji"))
print(lib.lend_book("B101", "Alex")) # Test duplicate loan attempt
lib.display_catalog()
print("\\n" + lib.return_book("B101"))`,
        codeTitle: 'Project 2: Library Catalog and Lending System',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Composition Architecture:</strong>
          <p style="margin-top:6px;">The <code>Library</code> class manages a collection of independent <code>Book</code> objects, encapsulating borrowing state cleanly.</p>
        </div>`
      },
      {
        title: '3. Project 3: Role-Based Employee Payroll System (Inheritance)',
        body: `<p>A polymorphic corporate payroll system with hierarchical roles (Salaried, Hourly, and Commission-based Managers):</p>`,
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
        """Abstract method calculating monthly compensation."""
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

# Payroll Processing Engine:
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
          <strong style="color:#10b981;">🔍 Polymorphic Payroll:</strong>
          <p style="margin-top:6px;">The payroll loop calls <code>emp.calculate_pay()</code> uniformly without needing to know whether an employee is hourly or a salaried manager.</p>
        </div>`
      },
      {
        title: '4. Project 4: E-Commerce Shopping Cart System',
        body: `<p>A complete e-commerce cart architecture with products, quantity management, coupon discounts, and tax computation:</p>`,
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
        self.items = {}  # item_id -> CartItem

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

# Run Shopping Cart Demo:
laptop = Item("ITM01", "Dell XPS 15", 145000)
mouse = Item("ITM02", "Logitech MX Master", 8500)

cart = ShoppingCart("Balaji")
cart.add_item(laptop, 1)
cart.add_item(mouse, 2)
cart.print_invoice(coupon_discount=10)`,
        codeTitle: 'Project 4: E-Commerce Shopping Cart & Invoice Generator',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Domain Separation:</strong>
          <p style="margin-top:6px;">Separates the catalog <code>Item</code> from the dynamic order state <code>CartItem</code> and cart aggregation logic.</p>
        </div>`
      },
      {
        title: '5. Project 5: School Management System (Students, Teachers, Courses)',
        body: `<p>A comprehensive school academic administration engine modeling students, faculty teachers, course enrollments, and report card generation:</p>`,
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

# Run School System Demo:
prof_sharma = Teacher("T01", "Dr. Sharma", "sharma@school.edu", "Python & Algorithms")
prof_rao = Teacher("T02", "Dr. Rao", "rao@school.edu", "Computer Networks")

py_course = Course("CS101", "Advanced Python 3", prof_sharma)
net_course = Course("CS102", "Computer Networks", prof_rao)

student1 = Student("S101", "Balaji", "balaji@school.edu", "12th Standard")
py_course.enroll(student1)
net_course.enroll(student1)

student1.assign_grade("CS101", 96)
student1.assign_grade("CS102", 91)

print(student1.get_report_card())`,
        codeTitle: 'Project 5: School & Course Management System',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Bidirectional Relationship:</strong>
          <p style="margin-top:6px;">Demonstrates clean relational mapping where <code>Course</code> holds enrolled students and <code>Student</code> maintains enrolled courses.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Modifying Shared Class Variables Unintentionally in Project Classes',
      text: 'Always ensure instance data (like transaction histories, cart items, or student grade dictionaries) is initialized inside __init__ as an instance variable. Defining cart_items = [] at class level will share the exact same cart across all customers!'
    },
    tryIt: {
      desc: 'Instantiate an account in the BankAccount system, deposit ₹5,000, withdraw ₹1,200, apply annual interest, and print the generated statement.',
      code: `acc = BankAccount("SBI-5544", "Ravi Kumar", 20000.0)
acc.deposit(8000.0)
acc.withdraw(2500.0)
acc.apply_interest()
print(acc.get_statement())`
    },
    faqs: [
      {
        q: 'Why should I structure enterprise systems with OOP classes instead of raw dictionaries?',
        a: 'Classes provide strict data validation (via properties and type hints), encapsulate business rules alongside state, prevent key misspelling bugs, and allow polymorphic extensions without modifying callers.'
      },
      {
        q: 'How do I persist OOP objects to disk?',
        a: 'You can serialize objects to JSON using custom serializers, use the standard library "pickle" module, or map them to relational databases using ORM tools like SQLAlchemy / SQLModel.'
      },
      {
        q: 'What is the Single Responsibility Principle (SRP) in OOP design?',
        a: 'SRP states that a class should have only one reason to change (e.g. BankAccount handles balance rules, while StatementPrinter handles formatting and printing).'
      }
    ]
  }
];
