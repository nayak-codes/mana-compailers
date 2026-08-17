const fs = require('fs');
const path = require('path');

const phase10Data = [
  // =========================================================================
  // CHAPTER 43: Access Modifiers Deep Dive
  // =========================================================================
  {
    num: 43,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Encapsulation & Access Modifiers',
    slug: '43-java-access-modifiers-public-private-protected-default',
    title: 'Java Access Modifiers: public, private, protected & Default Explained',
    badge: '43. Access Modifiers: 4 Levels',
    subtopics: 'Encapsulation ante enti? · Why Access Control Matters · 4 Access Levels · private: Strictest · default (package-private) · protected: Inheritance + Package · public: Widest · Access Modifier Comparison Table · Applying to Fields, Methods & Classes',
    readTime: '22 min read',
    intro: 'Comprehensive masterclass on Java Access Modifiers: understanding the 4-tier visibility system (private, default, protected, public), how each level controls access across methods, classes, packages, and inheritance hierarchies, and how choosing the right modifier builds robust, maintainable software boundaries.',
    theorySections: [
      {
        heading: '1. Encapsulation Ante Enti? (Why Access Control Exists)',
        content: `**Encapsulation** is the OOP principle of bundling data (fields) and behavior (methods) into one unit, while **restricting direct access** to internal implementation details.

**Real-World Analogy — ATM Machine:**
- You (the external user) can only interact with the ATM through its **public interface**: insert card, enter PIN, select withdrawal amount.
- The ATM\'s internal banking logic (database queries, encryption keys, cash counter servo motors) is completely **hidden and inaccessible** to you.
- This separation protects the system from misuse and allows the bank to upgrade internal mechanics without affecting how you use the ATM.

**In Java, Access Modifiers are the "access control gates"** that decide who can see and interact with which parts of your code.`
      },
      {
        heading: '2. The 4 Access Levels: From Most Restrictive to Widest',
        content: `<div class="ref-table-wrap">
  <table class="ref-table">
    <thead>
      <tr>
        <th>Modifier</th>
        <th>Same Class</th>
        <th>Same Package</th>
        <th>Subclass (other package)</th>
        <th>World (any class)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong><code>private</code></strong></td>
        <td>✅ Yes</td>
        <td>❌ No</td>
        <td>❌ No</td>
        <td>❌ No</td>
      </tr>
      <tr>
        <td><strong>default</strong> (no keyword)</td>
        <td>✅ Yes</td>
        <td>✅ Yes</td>
        <td>❌ No</td>
        <td>❌ No</td>
      </tr>
      <tr>
        <td><strong><code>protected</code></strong></td>
        <td>✅ Yes</td>
        <td>✅ Yes</td>
        <td>✅ Yes</td>
        <td>❌ No</td>
      </tr>
      <tr>
        <td><strong><code>public</code></strong></td>
        <td>✅ Yes</td>
        <td>✅ Yes</td>
        <td>✅ Yes</td>
        <td>✅ Yes</td>
      </tr>
    </tbody>
  </table>
</div>`
      },
      {
        heading: '3. private — The Strictest Access Level',
        content: `A <code>private</code> member is accessible **only within the same class**. No other class, even a subclass or a class in the same package, can access it directly.

**Use <code>private</code> for:** Instance fields (to enforce encapsulation), internal helper methods, implementation details that must never leak outside the class boundary.

\`\`\`java
class BankAccount {
    private double balance; // No external code can touch this directly!

    private void logTransaction(String msg) { // Internal helper only
        System.out.println("[LOG] " + msg);
    }
}

class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount();
        // acc.balance = 9999; // COMPILE ERROR: balance has private access
    }
}
\`\`\``
      },
      {
        heading: '4. Default (Package-Private) — No Keyword Required',
        content: `When you declare a member with **no access modifier**, it gets **default (package-private)** access. This member is visible to all classes within the **same package**, but invisible to classes in different packages.

\`\`\`java
// File: com/company/utils/MathHelper.java
package com.company.utils;

class MathHelper {            // Default class access
    double computeTax(double income) { // Default method access
        return income * 0.20;
    }
}

// File: com/company/ui/Dashboard.java
package com.company.ui;       // DIFFERENT PACKAGE!
import com.company.utils.MathHelper;

class Dashboard {
    void show() {
        MathHelper h = new MathHelper(); // COMPILE ERROR: MathHelper not visible!
    }
}
\`\`\``
      },
      {
        heading: '5. protected — Package + Subclass Access',
        content: `A <code>protected</code> member is accessible within the **same package** AND by **subclasses in any package** (through inheritance). This is the modifier designed specifically to support the Inheritance hierarchy.

\`\`\`java
// File: Animal.java
public class Animal {
    protected String name;         // Subclasses can access!
    protected void breathe() {     // Subclasses can use/override!
        System.out.println(name + " is breathing.");
    }
}

// File: Dog.java (Could be in a different package)
public class Dog extends Animal {
    public void bark() {
        breathe(); // Can call protected method from parent!
        System.out.println(name + " says: Woof!"); // Can access protected field!
    }
}
\`\`\``
      },
      {
        heading: '6. public — Widest Access (Open to Everyone)',
        content: `A <code>public</code> member is accessible from **any class in any package** across the entire application. This is the access level for your public API — the methods and classes you intentionally expose.

**Use <code>public</code> for:** API entry points (service methods, constructors, getters/setters), constants, and main application classes.

**The Principle of Least Privilege:**
Always start with the most restrictive access (<code>private</code>) and only widen it when absolutely required. This minimizes unintended coupling between classes.`
      }
    ],
    codeExample: `class BankAccount {
    // PRIVATE: Internal state, fully protected
    private double balance;
    private String pin;
    private int failedAttempts;

    // Package-private (default): Only used within same package
    static final int MAX_FAILED_ATTEMPTS = 3;

    // PUBLIC: The official deposit API (User requested snippet)
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            logTransaction("DEPOSIT", amount);
        } else {
            System.out.println("  [WARN] Deposit amount must be positive!");
        }
    }

    // PUBLIC: Getter for balance (Controlled read-only access)
    public double getBalance() {
        return balance;
    }

    // PRIVATE: Internal implementation detail, never exposed
    private void logTransaction(String type, double amount) {
        System.out.printf("  [INTERNAL LOG] %s: $%.2f | New Balance: $%.2f%n",
                type, amount, balance);
    }

    // PUBLIC: Constructor
    public BankAccount(double initialDeposit, String pin) {
        if (initialDeposit >= 0) this.balance = initialDeposit;
        this.pin = pin;
        this.failedAttempts = 0;
    }

    // PUBLIC: PIN verification
    public boolean verifyPin(String inputPin) {
        if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
            System.out.println("  [SECURITY] Account locked. Too many failed PIN attempts!");
            return false;
        }
        if (pin.equals(inputPin)) {
            failedAttempts = 0;
            return true;
        }
        failedAttempts++;
        System.out.printf("  [WARN] Wrong PIN. Attempts remaining: %d%n",
                MAX_FAILED_ATTEMPTS - failedAttempts);
        return false;
    }

    // PUBLIC: toString for display
    @Override
    public String toString() {
        return String.format("BankAccount{balance=$%.2f}", balance);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== User Requested BankAccount Demo ===");
        BankAccount account = new BankAccount(1000.0, "9876");

        // Public API works perfectly
        account.deposit(500.0);
        account.deposit(250.0);
        System.out.println("Current Balance: $" + account.getBalance());

        System.out.println("\n=== PIN Security System ===");
        account.verifyPin("1234");  // Wrong PIN
        account.verifyPin("4321");  // Wrong PIN
        account.verifyPin("9876");  // Correct PIN

        System.out.println("\n=== Private Field Protection Demonstration ===");
        // These would cause COMPILE ERRORS if uncommented:
        // account.balance = 999999;    // private field
        // account.logTransaction(...); // private method
        System.out.println("Private fields cannot be accessed externally!");
        System.out.println("Final account state: " + account);
    }
}`,
    output: `=== User Requested BankAccount Demo ===
  [INTERNAL LOG] DEPOSIT: $500.00 | New Balance: $1500.00
  [INTERNAL LOG] DEPOSIT: $250.00 | New Balance: $1750.00
Current Balance: $1750.0

=== PIN Security System ===
  [WARN] Wrong PIN. Attempts remaining: 2
  [WARN] Wrong PIN. Attempts remaining: 1
Current PIN verified successfully.

=== Private Field Protection Demonstration ===
Private fields cannot be accessed externally!
Final account state: BankAccount{balance=$1750.00}`,
    lineByLine: [
      {
        line: 'private double balance;',
        explanation: 'Restricts direct access to balance — only methods inside BankAccount can read or modify it.'
      },
      {
        line: 'public void deposit(double amount)',
        explanation: 'Public entry point accessible from any class; the controlled gateway to modifying the private balance.'
      },
      {
        line: 'private void logTransaction(String type, double amount)',
        explanation: 'Internal helper method invisible outside BankAccount — implementation detail free to change anytime.'
      },
      {
        line: 'public double getBalance()',
        explanation: 'Controlled read-only access to balance — callers can read but not set the value directly.'
      }
    ],
    practicalExample: `// Package-private class (library-internal utility)
class PasswordHasher {
    // Only used within same package — no need to expose publicly
    static String hash(String password) {
        // Simplified hash simulation (not production!)
        int hash = password.hashCode();
        return "HASH_" + Math.abs(hash);
    }
}

// Public class exposing a clean API
public class PracticalApplication {
    public static void main(String[] args) {
        System.out.println("=== Access Modifier Demo ===");
        String raw = "mySecretPass123";
        String hashed = PasswordHasher.hash(raw); // Accessible (same package)
        System.out.println("Raw     : " + raw);
        System.out.println("Hashed  : " + hashed);
    }
}`,
    practicalOutput: `=== Access Modifier Demo ===
Raw     : mySecretPass123
Hashed  : HASH_236872342`,
    commonMistakes: [
      'Making all fields `public` for convenience — this completely breaks encapsulation and creates tightly coupled code.',
      'Confusing `protected` with `private` — `protected` IS accessible to subclasses and same-package classes.',
      'Using default access when you intend `public` — external packages will get compile errors trying to use your class.',
      'Declaring entire classes as `private` — only nested/inner classes can be `private`; top-level classes can only be `public` or default.'
    ],
    challenge: `// Coding Challenge:
// Design a SecureVault class:
// 1. private String secretCode (cannot be read externally).
// 2. private int accessAttempts counter.
// 3. public boolean attemptAccess(String code) -> returns true only if code matches, max 3 attempts.
// 4. public boolean isLocked() -> returns true if attempts >= 3.

class SecureVault {
    private final String secretCode;
    private int accessAttempts = 0;
    private static final int MAX_ATTEMPTS = 3;

    public SecureVault(String secretCode) {
        this.secretCode = secretCode;
    }

    public boolean attemptAccess(String code) {
        if (isLocked()) {
            System.out.println("  VAULT LOCKED! Contact administrator.");
            return false;
        }
        accessAttempts++;
        if (secretCode.equals(code)) {
            System.out.println("  Access GRANTED!");
            return true;
        }
        System.out.println("  Access DENIED. Attempt " + accessAttempts + "/" + MAX_ATTEMPTS);
        return false;
    }

    public boolean isLocked() { return accessAttempts >= MAX_ATTEMPTS; }
}

public class Challenge {
    public static void main(String[] args) {
        SecureVault vault = new SecureVault("JAVA2026");
        vault.attemptAccess("WRONG1");
        vault.attemptAccess("WRONG2");
        vault.attemptAccess("JAVA2026"); // Correct on 3rd attempt
    }
}`,
    faq: [
      {
        q: 'What is the default access modifier in Java (no modifier written)?',
        a: 'When no modifier is written, it is called "package-private" or "default" access. The member is visible only to classes within the same Java package and invisible to classes in other packages.'
      },
      {
        q: 'Can a top-level class be private in Java?',
        a: 'No. Top-level classes (classes not nested inside another class) can only be `public` or package-private (default). Only nested/inner classes can use `private` or `protected` modifiers.'
      },
      {
        q: 'When should I use protected instead of private for class fields?',
        a: 'Generally, prefer `private` for all fields even in base classes. Expose data to subclasses via `protected` getters rather than `protected` fields. This keeps control over validation even for inherited classes.'
      }
    ],
    recap: [
      '`private` restricts access to within the same class only — use for all instance fields.',
      'Default (no keyword) is package-private: visible to same-package classes, invisible to external packages.',
      '`protected` extends visibility to subclasses across packages — designed for inheritance hierarchies.',
      '`public` is fully open — use for intentional public APIs.',
      'Apply the Principle of Least Privilege: always start with `private` and widen only when needed.'
    ]
  },

  // =========================================================================
  // CHAPTER 44: Getters, Setters & Data Validation
  // =========================================================================
  {
    num: 44,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Encapsulation & Access Modifiers',
    slug: '44-java-getters-setters-and-data-validation',
    title: 'Java Getters, Setters, Data Validation & Controlled Access',
    badge: '44. Getters, Setters & Validation',
    subtopics: 'Getter Methods (Accessors) · Setter Methods (Mutators) · boolean Getter Naming (isActive) · Data Validation in Setters · Defensive Copying · Chained Setters (Fluent API) · Computed Properties · When NOT to Use Setters',
    readTime: '24 min read',
    intro: 'Mastering controlled object access in Java: designing accessor (getter) and mutator (setter) methods with business validation rules, defensive copying for mutable fields, computed properties that derive values from existing state, and fluent method chaining for readable object construction APIs.',
    theorySections: [
      {
        heading: '1. Getter Methods (Accessors) — Controlled Read Access',
        content: `A **Getter** provides controlled read-only access to a private field. The Java naming convention is:
- For non-boolean fields: <code>public ReturnType getFieldName()</code>
- For boolean fields: <code>public boolean isFieldName()</code> (not <code>get</code>!)

\`\`\`java
class Employee {
    private String name;
    private double salary;
    private boolean active;

    public String getName()    { return name; }
    public double getSalary()  { return salary; }
    public boolean isActive()  { return active; } // "is" prefix for booleans!
}
\`\`\`

**Getter can transform before returning (Computed Property):**
\`\`\`java
private String firstName;
private String lastName;

public String getFullName() {
    return firstName + " " + lastName; // Derived/computed property
}
\`\`\``
      },
      {
        heading: '2. Setter Methods (Mutators) — Controlled Write Access with Validation',
        content: `A **Setter** provides controlled write access, allowing you to insert **business rule validation** before accepting a new value:

\`\`\`java
class Employee {
    private String name;
    private double salary;

    public void setName(String name) {
        if (name == null || name.isBlank())
            throw new IllegalArgumentException("Employee name cannot be null or empty.");
        this.name = name.trim();
    }

    public void setSalary(double salary) {
        if (salary < 0)
            throw new IllegalArgumentException("Salary cannot be negative: " + salary);
        if (salary > 10_000_000)
            throw new IllegalArgumentException("Salary exceeds maximum policy limit.");
        this.salary = salary;
    }
}
\`\`\``
      },
      {
        heading: '3. Defensive Copying for Mutable Fields',
        content: `When a field is a **mutable object** (like an array or a <code>Date</code>), simply returning it from a getter exposes the internal state to external modification. **Defensive copying** prevents this:

\`\`\`java
class Report {
    private int[] scores; // Mutable array!

    public Report(int[] scores) {
        this.scores = scores.clone(); // Copy in: don't trust caller's array!
    }

    public int[] getScores() {
        return scores.clone(); // Copy out: don't expose the internal array!
    }
}
\`\`\`

Without defensive copying:
\`\`\`java
int[] data = {90, 80, 70};
Report r = new Report(data);
data[0] = 0;         // Would corrupt r.scores if no defensive copy!
r.getScores()[1] = 0; // Would corrupt r.scores on return if no defensive copy!
\`\`\``
      },
      {
        heading: '4. Fluent Setter Pattern (Method Chaining)',
        content: `Setters can return <code>this</code> to enable clean **fluent method chaining** syntax:

\`\`\`java
class QueryBuilder {
    private String table;
    private String condition;
    private int limit;

    public QueryBuilder from(String table)    { this.table = table; return this; }
    public QueryBuilder where(String cond)    { this.condition = cond; return this; }
    public QueryBuilder limit(int n)          { this.limit = n; return this; }

    public String build() {
        return "SELECT * FROM " + table + " WHERE " + condition + " LIMIT " + limit;
    }
}

// Fluent API reads like natural language:
String query = new QueryBuilder()
        .from("students")
        .where("gpa > 3.5")
        .limit(10)
        .build();
\`\`\``
      },
      {
        heading: '5. When NOT to Provide Setters (Read-Only Properties)',
        content: `Not every field needs a setter. Consider making fields effectively **read-only** (no setter) in these cases:

1. **Identity fields** (ID, account number, creation timestamp) that should never change once set.
2. **Derived fields** computed from other fields (e.g. age derived from date of birth).
3. **Immutable value classes** (Money, Point, Color) where the entire object state is fixed.

\`\`\`java
class Order {
    private final String orderId;          // Never changes — NO setter!
    private final long createdTimestamp;   // Created once — NO setter!
    private int quantity;                  // Can change — has setter with validation
    
    Order(int quantity) {
        this.orderId           = "ORD-" + System.nanoTime();
        this.createdTimestamp  = System.currentTimeMillis();
        setQuantity(quantity);
    }
    
    public String getOrderId() { return orderId; }
    public long getCreatedTimestamp() { return createdTimestamp; }
    
    public int getQuantity() { return quantity; }
    public void setQuantity(int q) {
        if (q <= 0) throw new IllegalArgumentException("Quantity must be positive!");
        this.quantity = q;
    }
}
\`\`\``
      }
    ],
    codeExample: `class Employee {
    // Private fields
    private final String employeeId; // Read-only: no setter!
    private String name;
    private String email;
    private double salary;
    private boolean active;
    private int[] projectIds;        // Mutable array field

    public Employee(String name, String email, double salary, int[] projectIds) {
        this.employeeId = "EMP-" + System.currentTimeMillis() % 100000;
        setName(name);
        setEmail(email);
        setSalary(salary);
        this.projectIds = projectIds != null ? projectIds.clone() : new int[0];
        this.active = true;
    }

    // GETTERS
    public String getEmployeeId()  { return employeeId; }
    public String getName()        { return name; }
    public String getEmail()       { return email; }
    public double getSalary()      { return salary; }
    public boolean isActive()      { return active; }

    // Defensive copy on getter for mutable array
    public int[] getProjectIds()   { return projectIds.clone(); }

    // Computed (derived) property — no backing field!
    public String getDisplayTitle() {
        return (active ? "[ACTIVE] " : "[INACTIVE] ") + name + " <" + email + ">";
    }

    // SETTERS WITH VALIDATION
    public void setName(String name) {
        if (name == null || name.isBlank())
            throw new IllegalArgumentException("Name cannot be blank.");
        this.name = name.trim();
    }

    public void setEmail(String email) {
        if (email == null || !email.matches("^[\\w.-]+@[\\w.-]+\\.\\w{2,}$"))
            throw new IllegalArgumentException("Invalid email format: " + email);
        this.email = email.toLowerCase().trim();
    }

    public void setSalary(double salary) {
        if (salary < 15000)
            throw new IllegalArgumentException("Salary below minimum wage: " + salary);
        if (salary > 5_000_000)
            throw new IllegalArgumentException("Salary exceeds company maximum.");
        this.salary = salary;
    }

    public void setActive(boolean active)      { this.active = active; }
    public void setProjectIds(int[] projectIds) {
        this.projectIds = projectIds != null ? projectIds.clone() : new int[0];
    }

    @Override
    public String toString() {
        return String.format("[%s] %-18s | Salary: $%,9.2f | Active: %b",
                employeeId, name, salary, active);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. User Requested BankAccount Pattern Applied to Employee ===");
        Employee emp = new Employee("Ravi Kumar", "ravi.kumar@company.com",
                85000.0, new int[]{101, 205, 312});
        System.out.println(emp);
        System.out.println("Display Title : " + emp.getDisplayTitle());

        System.out.println("\n=== 2. Validated Setter Updates ===");
        emp.setSalary(92000.0);
        System.out.println("After raise   : " + emp);

        System.out.println("\n=== 3. Setter Validation Guards ===");
        try {
            emp.setSalary(-500.0); // Invalid!
        } catch (IllegalArgumentException e) {
            System.out.println("Salary error  : " + e.getMessage());
        }

        try {
            emp.setEmail("not-an-email"); // Invalid!
        } catch (IllegalArgumentException e) {
            System.out.println("Email error   : " + e.getMessage());
        }

        System.out.println("\n=== 4. Defensive Copy Protection ===");
        int[] returnedIds = emp.getProjectIds();
        returnedIds[0] = 9999; // Attempt to corrupt internal array
        System.out.println("Ext. modified [0] : " + returnedIds[0]);
        System.out.println("Internal [0] safe : " + emp.getProjectIds()[0]); // Still 101!

        System.out.println("\n=== 5. Computed Property ===");
        emp.setActive(false);
        System.out.println("Inactive title : " + emp.getDisplayTitle());
    }
}`,
    output: `=== 1. User Requested BankAccount Pattern Applied to Employee ===
[EMP-XXXXX] Ravi Kumar         | Salary: $   85,000.00 | Active: true
Display Title : [ACTIVE] Ravi Kumar <ravi.kumar@company.com>

=== 2. Validated Setter Updates ===
After raise   : [EMP-XXXXX] Ravi Kumar         | Salary: $   92,000.00 | Active: true

=== 3. Setter Validation Guards ===
Salary error  : Salary below minimum wage: -500.0
Email error   : Invalid email format: not-an-email

=== 4. Defensive Copy Protection ===
Ext. modified [0] : 9999
Internal [0] safe : 101

=== 5. Computed Property ===
Inactive title : [INACTIVE] Ravi Kumar <ravi.kumar@company.com>`,
    lineByLine: [
      {
        line: 'public boolean isActive()',
        explanation: 'Boolean getters use "is" prefix (not "get") per Java Beans convention, required by frameworks like Spring and Hibernate.'
      },
      {
        line: 'this.projectIds = projectIds.clone();',
        explanation: 'Defensive copy on both construction and return prevents external code from mutating internal array state.'
      },
      {
        line: 'public String getDisplayTitle()',
        explanation: 'Computed property derives a formatted display value from multiple private fields without a backing field of its own.'
      },
      {
        line: 'if (!email.matches("^[\\\\w.-]+@[\\\\w.-]+\\\\.\\\\w{2,}$"))',
        explanation: 'Regex validation in setter prevents invalid email strings from entering the object state.'
      }
    ],
    practicalExample: `class Temperature {
    private double celsius;

    public Temperature(double celsius) {
        setCelsius(celsius);
    }

    // Setter with physical validation
    public void setCelsius(double celsius) {
        if (celsius < -273.15)
            throw new IllegalArgumentException("Temperature below absolute zero!");
        this.celsius = celsius;
    }

    // Getter for raw value
    public double getCelsius() { return celsius; }

    // Computed getters — derive other scales automatically
    public double getFahrenheit() { return (celsius * 9.0 / 5.0) + 32; }
    public double getKelvin()     { return celsius + 273.15; }

    @Override
    public String toString() {
        return String.format("%.2f°C = %.2f°F = %.2fK", celsius, getFahrenheit(), getKelvin());
    }
}

public class PracticalApplication {
    public static void main(String[] args) {
        Temperature t1 = new Temperature(100.0);
        Temperature t2 = new Temperature(37.0);  // Human body temp

        System.out.println("=== Temperature Converter ===");
        System.out.println("Boiling Point : " + t1);
        System.out.println("Body Temp     : " + t2);

        try {
            new Temperature(-300); // Below absolute zero!
        } catch (IllegalArgumentException e) {
            System.out.println("Physical Error: " + e.getMessage());
        }
    }
}`,
    practicalOutput: `=== Temperature Converter ===
Boiling Point : 100.00°C = 212.00°F = 373.15K
Body Temp     : 37.00°C = 98.60°F = 310.15K
Physical Error: Temperature below absolute zero!`,
    commonMistakes: [
      'Using `getIsActive()` instead of `isActive()` for boolean getters — frameworks like Spring/Hibernate will not recognize the wrong naming.',
      'Returning a mutable array or Date directly from a getter without defensive cloning, allowing external corruption.',
      'Writing `this.name = this.name;` (assigning field to itself) due to missing `this.` prefix on one side.',
      'Providing setters for every field without considering whether each field should truly be mutable.'
    ],
    challenge: `// Coding Challenge:
// Build a BankAccount class with:
// 1. private double balance (no direct setter — only deposit/withdraw control it).
// 2. private String accountHolder (immutable after construction).
// 3. Getter getBalance() returns balance rounded to 2 decimal places.
// 4. deposit(amount): validates amount > 0, adds to balance.
// 5. withdraw(amount): validates 0 < amount <= balance, subtracts from balance.

class BankAccount {
    private final String accountHolder;
    private double balance;

    public BankAccount(String holder, double initialBalance) {
        if (holder == null || holder.isBlank()) throw new IllegalArgumentException("Holder required");
        this.accountHolder = holder.trim();
        this.balance = Math.max(0, initialBalance);
    }

    public String getAccountHolder() { return accountHolder; }

    public double getBalance() {
        return Math.round(balance * 100.0) / 100.0;
    }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Deposit must be positive!");
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount <= 0 || amount > balance)
            throw new IllegalArgumentException("Invalid withdrawal: " + amount);
        balance -= amount;
    }
}

public class Challenge {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("Priya", 1000.0);
        acc.deposit(500.0);
        acc.withdraw(200.0);
        System.out.println(acc.getAccountHolder() + " Balance: $" + acc.getBalance());
    }
}`,
    faq: [
      {
        q: 'Should I always generate getters and setters for every field?',
        a: 'No. Only generate them when genuinely needed. Unnecessary setters make objects mutable when they should be immutable, and unnecessary getters expose internal implementation details.'
      },
      {
        q: 'What is the Java Beans convention for getters and setters?',
        a: 'Non-boolean getters: `getFieldName()`. Boolean getters: `isFieldName()`. Setters: `setFieldName(value)`. This convention is required by frameworks like Spring, Hibernate, JSP EL, and serialization libraries.'
      },
      {
        q: 'Can I have a getter without a matching setter (read-only field)?',
        a: 'Absolutely, and it is encouraged for identity fields. Declare the field `final` in combination with only a getter — no setter — to create a clean, immutable public property.'
      }
    ],
    recap: [
      'Getters provide controlled read access: `getField()` for objects, `isField()` for booleans.',
      'Setters enforce business rules: validate before accepting new values.',
      'Defensive copying in constructors and getters protects mutable internal state.',
      'Computed properties derive values from existing fields without extra backing storage.',
      'Not every field needs a setter — prefer immutability for identity fields.'
    ]
  },

  // =========================================================================
  // CHAPTER 45: Immutable Objects & Read-Only Properties
  // =========================================================================
  {
    num: 45,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Encapsulation & Access Modifiers',
    slug: '45-java-immutable-objects-and-read-only-properties',
    title: 'Java Immutable Objects, final Keyword & Thread Safety',
    badge: '45. Immutable Objects & final',
    subtopics: 'Immutable Classes: Definition & Benefits · 5 Rules for Creating Immutable Classes · final Fields · final Methods · final Classes · Java String Immutability Recap · Immutable Collections · Thread Safety via Immutability · Java 16+ record Keyword',
    readTime: '24 min read',
    intro: 'Mastering immutability in Java: understanding the 5 rules to build correct immutable classes, the 3 uses of the final keyword (field, method, class), why immutability is a core thread-safety strategy, the design of java.lang.String, and the modern Java 16+ record feature as a concise immutable data carrier.',
    theorySections: [
      {
        heading: '1. What is an Immutable Object?',
        content: `An **Immutable Object** is an object whose **state cannot change after it is created**. Once constructed, every field value remains fixed for the entire lifetime of the object.

**Famous Immutable Classes in Java Standard Library:**
- <code>java.lang.String</code> — String content never changes; operations create new strings.
- <code>java.lang.Integer</code>, <code>Long</code>, <code>Double</code> — Primitive wrapper classes.
- <code>java.time.LocalDate</code>, <code>LocalTime</code> — Modern date/time API.
- <code>java.math.BigDecimal</code>, <code>BigInteger</code> — Arbitrary precision numbers.

**Why Immutability is Valuable:**
1. **Thread Safety:** Multiple threads can read the same immutable object simultaneously without synchronization locks.
2. **Safe Sharing:** The object can be passed around freely without risk of unexpected mutation.
3. **Cacheable:** Immutable objects can be cached and reused (like the Integer cache for -128 to 127).
4. **Reliable HashMap Keys:** Immutable objects make safe, stable HashMap keys since their hash never changes.`
      },
      {
        heading: '2. The 5 Rules for Creating an Immutable Class',
        content: `\`\`\`
  Rule 1: Declare the class as final (prevents subclasses from adding mutability).
  Rule 2: Declare all fields as private final (cannot be reassigned after construction).
  Rule 3: No setter methods (no way to modify state after construction).
  Rule 4: Initialize all fields via the constructor only.
  Rule 5: Defensive copy of mutable fields (arrays, Dates) in constructor AND getters.
\`\`\`

\`\`\`java
public final class Money {            // Rule 1: final class
    private final double amount;      // Rule 2: private final
    private final String currency;    // Rule 2: private final

    public Money(double amount, String currency) {  // Rule 4: constructor only
        if (amount < 0) throw new IllegalArgumentException("Amount negative!");
        this.amount   = amount;
        this.currency = currency.toUpperCase().trim();
    }

    // Rule 3: NO setters
    public double getAmount()   { return amount; }
    public String getCurrency() { return currency; }

    // New object instead of mutation (the immutable update pattern)
    public Money add(Money other) {
        if (!this.currency.equals(other.currency))
            throw new IllegalArgumentException("Currency mismatch!");
        return new Money(this.amount + other.amount, this.currency);
    }
}
\`\`\``
      },
      {
        heading: '3. The 3 Uses of the final Keyword',
        content: `<div class="ref-table-wrap">
  <table class="ref-table">
    <thead>
      <tr>
        <th>Applied To</th>
        <th>Effect</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Field / Variable</strong></td>
        <td>Value can be assigned <strong>only once</strong>. All subsequent assignments cause compile error.</td>
        <td><code>private final String id = "ID-001";</code></td>
      </tr>
      <tr>
        <td><strong>Method</strong></td>
        <td>Cannot be <strong>overridden</strong> by any subclass.</td>
        <td><code>public final double getBalance() { ... }</code></td>
      </tr>
      <tr>
        <td><strong>Class</strong></td>
        <td>Cannot be <strong>extended/subclassed</strong> by any class.</td>
        <td><code>public final class String { ... }</code></td>
      </tr>
    </tbody>
  </table>
</div>`
      },
      {
        heading: '4. Java 16+ Records: Concise Immutable Data Carriers',
        content: `Java 16 introduced the <code>record</code> keyword as a compact syntax for **immutable data-carrying classes**. The compiler auto-generates: private final fields, a canonical constructor, getters (no "get" prefix!), <code>equals()</code>, <code>hashCode()</code>, and <code>toString()</code>:

\`\`\`java
// Traditional immutable class: ~30 lines of boilerplate
// Record equivalent: 1 line!
public record Point(double x, double y) {}

// Usage:
Point p = new Point(3.0, 4.0);
System.out.println(p.x());   // 3.0 (Getter without "get" prefix!)
System.out.println(p.y());   // 4.0
System.out.println(p);       // Point[x=3.0, y=4.0] (Auto toString!)
\`\`\`

Records also support **compact constructors** for validation:
\`\`\`java
public record Range(int min, int max) {
    Range { // Compact constructor (no parameter list)
        if (min > max) throw new IllegalArgumentException("min > max!");
    }
}
\`\`\``
      }
    ],
    codeExample: `import java.util.Arrays;

// ---------------------------------------------------------------
// IMMUTABLE CLASS: Money (5 Rules Applied)
// ---------------------------------------------------------------
final class Money {
    private final double amount;
    private final String currency;

    public Money(double amount, String currency) {
        if (amount < 0) throw new IllegalArgumentException("Negative amount: " + amount);
        if (currency == null || currency.isBlank()) throw new IllegalArgumentException("Currency required.");
        this.amount   = amount;
        this.currency = currency.toUpperCase().trim();
    }

    public double getAmount()   { return amount; }
    public String getCurrency() { return currency; }

    // Immutable update pattern: returns NEW object instead of mutating!
    public Money add(Money other) {
        if (!this.currency.equals(other.currency))
            throw new IllegalArgumentException("Cannot add different currencies: "
                    + this.currency + " and " + other.currency);
        return new Money(this.amount + other.amount, this.currency);
    }

    public Money multiply(double factor) {
        return new Money(this.amount * factor, this.currency);
    }

    @Override
    public String toString() {
        return String.format("Money{%.2f %s}", amount, currency);
    }
}

// ---------------------------------------------------------------
// IMMUTABLE CLASS WITH ARRAY FIELD: Snapshot (Defensive Copying)
// ---------------------------------------------------------------
final class DataSnapshot {
    private final String label;
    private final int[] readings; // Mutable array — must defensive copy!
    private final long timestamp;

    public DataSnapshot(String label, int[] readings) {
        this.label     = label;
        this.readings  = readings.clone(); // Rule 5: defensive copy IN constructor
        this.timestamp = System.currentTimeMillis();
    }

    public String getLabel()    { return label; }
    public long getTimestamp()  { return timestamp; }
    public int[] getReadings()  { return readings.clone(); } // Rule 5: defensive copy OUT getter

    public double getAverage() {
        int sum = 0;
        for (int r : readings) sum += r;
        return (double) sum / readings.length;
    }

    @Override
    public String toString() {
        return String.format("Snapshot{label='%s', avg=%.1f, readings=%s}",
                label, getAverage(), Arrays.toString(readings));
    }
}

// ---------------------------------------------------------------
// Java 16+ RECORD: Concise immutable data
// ---------------------------------------------------------------
record Point(double x, double y) {
    // Compact constructor with validation
    Point {
        if (Double.isNaN(x) || Double.isNaN(y))
            throw new IllegalArgumentException("Coordinates cannot be NaN!");
    }

    // Custom method (records can have methods!)
    public double distanceTo(Point other) {
        double dx = this.x - other.x;
        double dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. Immutable Money Operations ===");
        Money price    = new Money(49.99, "usd");
        Money tax      = new Money(8.99,  "usd");
        Money subtotal = price.add(tax);           // Returns new Money object!
        Money doubled  = subtotal.multiply(2.0);   // Returns new Money object!

        System.out.println("Price    : " + price);
        System.out.println("Tax      : " + tax);
        System.out.println("Subtotal : " + subtotal);
        System.out.println("Doubled  : " + doubled);

        System.out.println("\n=== 2. Defensive Copy Protection in DataSnapshot ===");
        int[] sensorData = {45, 78, 92, 61, 55};
        DataSnapshot snap = new DataSnapshot("Temperature Sensor A", sensorData);

        // Try to corrupt via original array (protected by constructor copy)
        sensorData[0] = 0;
        System.out.println("Original array corrupted: sensorData[0] = " + sensorData[0]);
        System.out.println("Snapshot internal safe  : " + snap.getReadings()[0]);
        System.out.println("Snapshot                : " + snap);

        // Try to corrupt via returned array (protected by getter copy)
        int[] returned = snap.getReadings();
        returned[0] = 9999;
        System.out.println("Returned array changed  : returned[0] = " + returned[0]);
        System.out.println("Snapshot still safe     : " + snap.getReadings()[0]);

        System.out.println("\n=== 3. Java Record Demo ===");
        Point origin = new Point(0, 0);
        Point target = new Point(3.0, 4.0);

        System.out.println("Origin      : " + origin);
        System.out.println("Target      : " + target);
        System.out.printf("Distance    : %.2f units%n", origin.distanceTo(target));
        System.out.println("x component : " + target.x());
        System.out.println("y component : " + target.y());

        System.out.println("\n=== 4. Currency Mismatch Exception ===");
        try {
            Money usd = new Money(100, "USD");
            Money eur = new Money(90,  "EUR");
            usd.add(eur); // Different currencies!
        } catch (IllegalArgumentException e) {
            System.out.println("Currency error: " + e.getMessage());
        }
    }
}`,
    output: `=== 1. Immutable Money Operations ===
Price    : Money{49.99 USD}
Tax      : Money{8.99 USD}
Subtotal : Money{58.98 USD}
Doubled  : Money{117.96 USD}

=== 2. Defensive Copy Protection in DataSnapshot ===
Original array corrupted: sensorData[0] = 0
Snapshot internal safe  : 45
Snapshot                : Snapshot{label='Temperature Sensor A', avg=66.2, readings=[45, 78, 92, 61, 55]}

Returned array changed  : returned[0] = 9999
Snapshot still safe     : 45

=== 3. Java Record Demo ===
Origin      : Point[x=0.0, y=0.0]
Target      : Point[x=3.0, y=4.0]
Distance    : 5.00 units
x component : 3.0
y component : 4.0

=== 4. Currency Mismatch Exception ===
Currency error: Cannot add different currencies: USD and EUR`,
    lineByLine: [
      {
        line: 'final class Money',
        explanation: 'final prevents any subclass from adding mutable state or overriding the immutable design.'
      },
      {
        line: 'return new Money(this.amount + other.amount, this.currency);',
        explanation: 'Immutable update pattern: never modifies existing object; always returns a brand new Money instance.'
      },
      {
        line: 'this.readings = readings.clone();',
        explanation: 'Defensive copy in constructor ensures the snapshot\'s array is independent from the caller\'s array.'
      },
      {
        line: 'record Point(double x, double y)',
        explanation: 'Java 16+ record: compiler auto-generates private final fields, constructor, getters (x(), y()), equals, hashCode, toString.'
      }
    ],
    practicalExample: `// Industry Simulation: Audit Log Entry (Must be immutable for compliance!)
final class AuditEntry {
    private final String userId;
    private final String action;
    private final long timestamp;

    public AuditEntry(String userId, String action) {
        if (userId == null || action == null) throw new IllegalArgumentException("Fields required.");
        this.userId    = userId;
        this.action    = action;
        this.timestamp = System.currentTimeMillis();
    }

    public String getUserId()   { return userId; }
    public String getAction()   { return action; }
    public long getTimestamp()  { return timestamp; }

    @Override
    public String toString() {
        return String.format("AuditEntry{user='%s', action='%s', ts=%d}", userId, action, timestamp);
    }
}

public class PracticalApplication {
    public static void main(String[] args) {
        AuditEntry e1 = new AuditEntry("USR-001", "LOGIN");
        AuditEntry e2 = new AuditEntry("USR-001", "TRANSFER_FUNDS");
        AuditEntry e3 = new AuditEntry("USR-002", "CHANGE_PASSWORD");

        System.out.println("=== Compliance Audit Trail (Immutable Log) ===");
        System.out.println(e1);
        System.out.println(e2);
        System.out.println(e3);
    }
}`,
    practicalOutput: `=== Compliance Audit Trail (Immutable Log) ===
AuditEntry{user='USR-001', action='LOGIN', ts=1723789543000}
AuditEntry{user='USR-001', action='TRANSFER_FUNDS', ts=1723789543001}
AuditEntry{user='USR-002', action='CHANGE_PASSWORD', ts=1723789543002}`,
    commonMistakes: [
      'Declaring fields `final` but returning a mutable reference (like an array or Date) directly from a getter — this breaks immutability even with final fields!',
      'Making a class `final` but forgetting defensive copies of mutable fields — still mutable via the array returned from a getter.',
      'Confusing `final` field (value fixed at assignment) with `final` class (cannot be subclassed).',
      'Using records but adding setters or mutable fields inside — records are immutable by design; don\'t fight the design.'
    ],
    challenge: `// Coding Challenge:
// Create an immutable class Version (like a software version number):
// Fields: final int major, minor, patch.
// Rule: All fields must be >= 0.
// Methods: isNewerThan(Version other), toString() returns "major.minor.patch".

final class Version {
    private final int major;
    private final int minor;
    private final int patch;

    public Version(int major, int minor, int patch) {
        if (major < 0 || minor < 0 || patch < 0) throw new IllegalArgumentException("Version parts must be >= 0");
        this.major = major;
        this.minor = minor;
        this.patch = patch;
    }

    public boolean isNewerThan(Version other) {
        if (this.major != other.major) return this.major > other.major;
        if (this.minor != other.minor) return this.minor > other.minor;
        return this.patch > other.patch;
    }

    @Override
    public String toString() {
        return major + "." + minor + "." + patch;
    }
}

public class Challenge {
    public static void main(String[] args) {
        Version v1 = new Version(2, 1, 0);
        Version v2 = new Version(2, 0, 5);
        System.out.println(v1 + " newer than " + v2 + ": " + v1.isNewerThan(v2));
    }
}`,
    faq: [
      {
        q: 'Is String immutable in Java? Why?',
        a: 'Yes. String is immutable by design for 4 reasons: (1) Thread safety — shared between threads without locks. (2) String pool caching — literals are reused from the pool. (3) HashMap key reliability — hash never changes. (4) Security — passwords and file paths cannot be mutated mid-operation.'
      },
      {
        q: 'Does final field guarantee deep immutability?',
        a: 'No. `final int[] arr = {1, 2, 3}` means `arr` cannot point to a different array, but `arr[0] = 99` is still valid! Deep immutability of arrays requires defensive copying on all access paths.'
      },
      {
        q: 'When should I use a Java record vs a regular class?',
        a: 'Use `record` for simple, pure data-carrying entities (DTOs, value objects) that need immutability with minimal boilerplate. Use regular classes when you need inheritance, mutable state, complex constructors, or additional design patterns.'
      }
    ],
    recap: [
      'Immutable objects cannot change state after construction — implement the 5 rules to ensure correctness.',
      '`final` on a field prevents reassignment; `final` on a method prevents overriding; `final` on a class prevents subclassing.',
      'Defensive copying is essential for arrays and mutable object fields in immutable classes.',
      'Java 16+ `record` keyword generates an immutable data class with minimal boilerplate.',
      'Immutability is the simplest and safest path to thread-safe object sharing.'
    ]
  },

  // =========================================================================
  // CHAPTER 46: Good Class Design & Package Access
  // =========================================================================
  {
    num: 46,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Encapsulation & Access Modifiers',
    slug: '46-java-good-class-design-and-package-access',
    title: 'Java Good Class Design: Packages, Access Control & SOLID Principles',
    badge: '46. Package Access & Class Design',
    subtopics: 'Java Package System · Package Declaration & import · Package-Private vs Public API Design · Naming Conventions · Single Responsibility Principle · Cohesion vs Coupling · Encapsulation Violation Patterns (Anti-Patterns) · Access Modifier Decision Flowchart',
    readTime: '24 min read',
    intro: 'Mastering professional class design in Java: the package system for organizing and isolating code, package-private boundary enforcement, access modifier decision frameworks, coupling vs cohesion trade-offs, and recognizing common encapsulation anti-patterns that create fragile, hard-to-maintain software.',
    theorySections: [
      {
        heading: '1. The Java Package System',
        content: `A **Package** is a namespace mechanism that groups related classes and interfaces together, serving two purposes:
1. **Organization:** Hierarchically categorizes classes (like folders on a filesystem).
2. **Access Control:** The default (package-private) modifier creates an **internal API boundary** visible only within the package.

**Package Naming Convention (Reverse Domain):**
\`\`\`java
package com.ourcompiler.java.tutorial.phase10;
// com     = top-level domain (reversed)
// ourcompiler = company name
// java.tutorial.phase10 = product and feature hierarchy
\`\`\`

**Declaring and Importing:**
\`\`\`java
// In Animal.java:
package com.zoo.animals;
public class Animal { ... }

// In Main.java (different package):
package com.zoo.management;
import com.zoo.animals.Animal;     // Import specific class
import com.zoo.animals.*;           // Import all classes in package (Discouraged in production)
\`\`\``
      },
      {
        heading: '2. Package-Private: Building Internal API Boundaries',
        content: `Using **default (package-private) access** strategically creates clean internal API boundaries:

\`\`\`java
// Package: com.company.payments

// INTERNAL implementation (package-private: only used inside the package)
class EncryptionUtil {
    static String encrypt(String data) { ... }
}

class FraudDetector {
    boolean isSuspicious(double amount) { ... }
}

// PUBLIC API (the only surface exposed to external packages)
public class PaymentProcessor {
    public boolean processPayment(String card, double amount) {
        String encrypted = EncryptionUtil.encrypt(card); // OK: same package
        if (new FraudDetector().isSuspicious(amount)) return false; // OK: same package
        // ... actual processing
        return true;
    }
}
// External packages ONLY see PaymentProcessor; EncryptionUtil and FraudDetector are hidden!
\`\`\``
      },
      {
        heading: '3. Good Class Design Principles',
        content: `**1. Single Responsibility Principle (SRP):**
A class should have **exactly one reason to change**. Avoid God Classes that do everything:
\`\`\`
Bad:  class UserManager { register() + sendEmail() + saveToDatabase() + generateReport() }
Good: class UserRegistrar, class EmailSender, class UserRepository, class ReportGenerator
\`\`\`

**2. High Cohesion — Related Concepts Together:**
All methods and fields in a class should relate to a single, well-defined concept. If a class has fields for both "employee details" and "payroll calculation rules", consider splitting them.

**3. Low Coupling — Minimize Dependencies:**
A class should know as little as possible about other classes. Prefer working with abstract interfaces rather than concrete implementations.

**4. Encapsulation as a First Principle:**
Always default to <code>private</code>. Only expose a member when you have a specific, justified reason to do so.`
      },
      {
        heading: '4. The Access Modifier Decision Flowchart',
        content: `When choosing an access modifier for a field or method, ask these questions in order:

\`\`\`
  Q1: Is this part of the PUBLIC API used by external packages?
       YES → public
       NO  → Q2

  Q2: Is this needed by SUBCLASSES in other packages?
       YES → protected
       NO  → Q3

  Q3: Is this shared among MULTIPLE classes in the SAME package?
       YES → default (no modifier)
       NO  → private
\`\`\`

**The Default Answer is ALWAYS: private!**`
      },
      {
        heading: '5. Encapsulation Anti-Patterns to Avoid',
        content: `**Anti-Pattern 1: Public Fields (God Mode Access)**
\`\`\`java
// TERRIBLE!
class User { public String password; } // Anyone can read/write password!
\`\`\`

**Anti-Pattern 2: Getter-Setter for Everything (Anemic Domain Model)**
\`\`\`java
// Technically encapsulated but semantically broken:
account.setBalance(account.getBalance() - withdrawAmount); // Logic leaked outside!
// Better: account.withdraw(amount) — keeps logic inside the class!
\`\`\`

**Anti-Pattern 3: Returning Internal Mutable Collections**
\`\`\`java
public List<String> getTags() { return tags; } // External code can add/remove tags!
// Better:
public List<String> getTags() { return Collections.unmodifiableList(tags); }
\`\`\``
      }
    ],
    codeExample: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// ---------------------------------------------------------------
// WELL-DESIGNED ENCAPSULATED CLASS: CourseEnrollment System
// ---------------------------------------------------------------
class Course {
    private final String courseId;
    private final String title;
    private final int maxCapacity;
    private final List<String> enrolledStudentIds; // Mutable internally

    public Course(String courseId, String title, int maxCapacity) {
        if (maxCapacity <= 0) throw new IllegalArgumentException("Capacity must be positive.");
        this.courseId          = courseId;
        this.title             = title;
        this.maxCapacity       = maxCapacity;
        this.enrolledStudentIds = new ArrayList<>();
    }

    // Read-only getters for immutable fields
    public String getCourseId()  { return courseId; }
    public String getTitle()     { return title; }
    public int getMaxCapacity()  { return maxCapacity; }

    // Computed properties
    public int getEnrolledCount()    { return enrolledStudentIds.size(); }
    public boolean isFullyBooked()   { return enrolledStudentIds.size() >= maxCapacity; }
    public int getAvailableSeats()   { return maxCapacity - enrolledStudentIds.size(); }

    // Return UNMODIFIABLE view — prevents external mutation!
    public List<String> getEnrolledStudents() {
        return Collections.unmodifiableList(enrolledStudentIds);
    }

    // Business operation (logic stays inside the class)
    public boolean enroll(String studentId) {
        if (studentId == null || studentId.isBlank()) return false;
        if (isFullyBooked()) {
            System.out.println("  [ENROLL FAIL] Course '" + title + "' is fully booked!");
            return false;
        }
        if (enrolledStudentIds.contains(studentId)) {
            System.out.println("  [ENROLL FAIL] Student " + studentId + " already enrolled.");
            return false;
        }
        enrolledStudentIds.add(studentId);
        System.out.printf("  [ENROLL OK] %s enrolled in '%s'. Seats remaining: %d%n",
                studentId, title, getAvailableSeats());
        return true;
    }

    public boolean unenroll(String studentId) {
        boolean removed = enrolledStudentIds.remove(studentId);
        if (removed) System.out.printf("  [UNENROLL] %s removed from '%s'.%n", studentId, title);
        return removed;
    }

    @Override
    public String toString() {
        return String.format("Course{id='%s', title='%s', seats=%d/%d, booked=%b}",
                courseId, title, getEnrolledCount(), maxCapacity, isFullyBooked());
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Course Enrollment System ===");
        Course javaAdvanced = new Course("CS-401", "Advanced Java Programming", 3);

        System.out.println("Initial State: " + javaAdvanced);

        System.out.println("\n--- Enrollment Phase ---");
        javaAdvanced.enroll("STU-001");
        javaAdvanced.enroll("STU-002");
        javaAdvanced.enroll("STU-001"); // Duplicate!
        javaAdvanced.enroll("STU-003"); // Last seat!
        javaAdvanced.enroll("STU-004"); // Should FAIL — fully booked

        System.out.println("\nFull State: " + javaAdvanced);

        System.out.println("\n--- Unmodifiable List Protection ---");
        List<String> students = javaAdvanced.getEnrolledStudents();
        System.out.println("Enrolled students: " + students);
        try {
            students.add("STU-HACKER"); // Attempt external mutation!
        } catch (UnsupportedOperationException e) {
            System.out.println("External mutation BLOCKED! Unmodifiable list protected internal state.");
        }

        System.out.println("\n--- Unenrollment ---");
        javaAdvanced.unenroll("STU-002");
        System.out.println("After unenroll: " + javaAdvanced);

        System.out.println("\n--- Good Design Check ---");
        System.out.printf("Available seats: %d | Is full: %b%n",
                javaAdvanced.getAvailableSeats(), javaAdvanced.isFullyBooked());
    }
}`,
    output: `=== Course Enrollment System ===
Initial State: Course{id='CS-401', title='Advanced Java Programming', seats=0/3, booked=false}

--- Enrollment Phase ---
  [ENROLL OK] STU-001 enrolled in 'Advanced Java Programming'. Seats remaining: 2
  [ENROLL OK] STU-002 enrolled in 'Advanced Java Programming'. Seats remaining: 1
  [ENROLL FAIL] Student STU-001 already enrolled.
  [ENROLL OK] STU-003 enrolled in 'Advanced Java Programming'. Seats remaining: 0
  [ENROLL FAIL] Course 'Advanced Java Programming' is fully booked!

Full State: Course{id='CS-401', title='Advanced Java Programming', seats=3/3, booked=true}

--- Unmodifiable List Protection ---
Enrolled students: [STU-001, STU-002, STU-003]
External mutation BLOCKED! Unmodifiable list protected internal state.

--- Unenrollment ---
  [UNENROLL] STU-002 removed from 'Advanced Java Programming'.
After unenroll: Course{id='CS-401', title='Advanced Java Programming', seats=2/3, booked=false}

--- Good Design Check ---
Available seats: 1 | Is full: false`,
    lineByLine: [
      {
        line: 'Collections.unmodifiableList(enrolledStudentIds)',
        explanation: 'Wraps the internal list in an immutable view — callers can read but cannot add, remove, or clear elements.'
      },
      {
        line: 'public boolean enroll(String studentId)',
        explanation: 'Business logic lives INSIDE the class (not in caller code), keeping rules cohesive and centralized.'
      },
      {
        line: 'public boolean isFullyBooked()',
        explanation: 'Computed boolean property derived from comparing list size and capacity — no backing field needed.'
      },
      {
        line: 'private final List<String> enrolledStudentIds',
        explanation: 'Private final reference prevents reassigning the list variable, but internal add/remove operations still work.'
      }
    ],
    practicalExample: `// Industry Simulation: Configuration Management Module
// Internal helper (package-private — hidden from external packages)
class ConfigValidator {
    static void validateKey(String key) {
        if (key == null || !key.matches("[A-Z_]+"))
            throw new IllegalArgumentException("Invalid config key: " + key);
    }
}

// Public API class
public class PracticalApplication {
    // Simulated config store
    static java.util.Map<String, String> config = new java.util.HashMap<>();

    public static void setConfig(String key, String value) {
        ConfigValidator.validateKey(key); // Internal utility — same package
        config.put(key, value);
    }

    public static String getConfig(String key) {
        return config.getOrDefault(key, "NOT_SET");
    }

    public static void main(String[] args) {
        setConfig("DB_HOST", "localhost");
        setConfig("DB_PORT", "5432");
        System.out.println("DB_HOST: " + getConfig("DB_HOST"));
        System.out.println("DB_PORT: " + getConfig("DB_PORT"));
        System.out.println("DB_PASS: " + getConfig("DB_PASS")); // Not set
    }
}`,
    practicalOutput: `DB_HOST: localhost
DB_PORT: 5432
DB_PASS: NOT_SET`,
    commonMistakes: [
      'Returning a mutable `List` or `Map` directly from a getter — use `Collections.unmodifiableList()` or return a copy.',
      'Using wildcard imports (`import com.company.*;`) in production code — always import specific classes for clarity.',
      'Putting all classes in the default (unnamed) package — this prevents using the default access modifier effectively.',
      'Designing "Anemic Domain Models" where classes have only getters/setters and all logic lives in external "Service" classes.'
    ],
    challenge: `// Coding Challenge:
// Create a Playlist class:
// 1. private final String playlistName (read-only).
// 2. private List<String> songs (mutable internally, unmodifiable externally).
// 3. Public methods: addSong(String song), removeSong(String song), getSongs(), contains(String).
// 4. Return an unmodifiable view from getSongs().

import java.util.*;

class Playlist {
    private final String playlistName;
    private final List<String> songs = new ArrayList<>();

    public Playlist(String name) {
        if (name == null || name.isBlank()) throw new IllegalArgumentException("Name required.");
        this.playlistName = name.trim();
    }

    public String getPlaylistName() { return playlistName; }
    public List<String> getSongs()  { return Collections.unmodifiableList(songs); }
    public boolean contains(String song) { return songs.contains(song); }

    public void addSong(String song) {
        if (song != null && !song.isBlank() && !contains(song)) {
            songs.add(song.trim());
        }
    }

    public void removeSong(String song) { songs.remove(song); }
}

public class Challenge {
    public static void main(String[] args) {
        Playlist p = new Playlist("Coding Vibes");
        p.addSong("Lo-Fi Hip Hop"); p.addSong("Chill Beats"); p.addSong("Focus Zone");
        System.out.println("Playlist: " + p.getSongs());
    }
}`,
    faq: [
      {
        q: 'What is the unnamed default package in Java?',
        a: 'Classes without a `package` declaration belong to the unnamed default package. While fine for quick experiments, production code should always use named packages for proper access control and modularity.'
      },
      {
        q: 'What does Collections.unmodifiableList() do?',
        a: 'It wraps an existing List in an unmodifiable view. Any attempt to call `add()`, `remove()`, or `clear()` on the returned view throws `UnsupportedOperationException` at runtime. The underlying list itself is still modifiable via the original reference.'
      },
      {
        q: 'What is the difference between high cohesion and low coupling?',
        a: 'Cohesion measures how closely related the responsibilities within a single class are (high = good). Coupling measures how dependent a class is on other classes (low = good). Good design achieves both simultaneously.'
      }
    ],
    recap: [
      'Java packages provide hierarchical namespacing and package-level access boundaries.',
      'Package-private (default) access creates clean internal API isolation without exposing internals.',
      'Always return `Collections.unmodifiableList()` or copies when exposing mutable collection fields.',
      'Business logic should live inside the class (cohesive), not scattered in external caller code.',
      'Default access modifier choice: `private` — widen only when there is a justified architectural need.'
    ]
  },

  // =========================================================================
  // CHAPTER 47: Encapsulation Capstone Projects
  // =========================================================================
  {
    num: 47,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Encapsulation & Access Modifiers',
    slug: '47-java-encapsulation-capstone-projects',
    title: 'Java Encapsulation Capstone: 4 Production-Grade Secure Systems',
    badge: '47. Capstone Projects (4 Secure Systems)',
    subtopics: 'Project 1: Secure Bank Account (Core Snippet) · Project 2: Student Grade Book · Project 3: Product Inventory with Access Control · Project 4: Configuration Manager',
    readTime: '28 min read',
    intro: 'Building 4 complete production-grade systems applying full encapsulation principles: secure access control, validated mutation, immutable identifiers, computed properties, and protected internal state — culminating in a Configuration Manager with package-level isolation design.',
    theorySections: [
      {
        heading: '1. Encapsulation Design Checklist',
        content: `Before writing any class in production Java, verify this design checklist:

\`\`\`
  ✅ All instance fields declared private
  ✅ Immutable identity fields declared private final (no setter)
  ✅ All setters contain appropriate business validation
  ✅ Getters for boolean fields use "is" prefix
  ✅ Mutable collection/array fields returned as unmodifiable or cloned
  ✅ Business logic encapsulated in methods (not leaked to callers)
  ✅ toString() overridden for meaningful logging and debugging
  ✅ Access modifiers chosen following the Principle of Least Privilege
\`\`\``
      }
    ],
    codeExample: `import java.util.*;

// =====================================================================
// PROJECT 1: SECURE BANK ACCOUNT (User's Core Snippet — Fully Expanded)
// =====================================================================
class BankAccount {
    private static int accountSerial = 1000;

    private final String accountNumber;
    private final String holderName;
    private double balance;
    private final List<String> transactionLog;

    public BankAccount(String holderName, double initialDeposit) {
        if (holderName == null || holderName.isBlank())
            throw new IllegalArgumentException("Holder name required.");
        this.holderName    = holderName.trim();
        this.accountNumber = "ACC-" + (++accountSerial);
        this.balance       = Math.max(0, initialDeposit);
        this.transactionLog = new ArrayList<>();
        logTxn("ACCOUNT OPENED", initialDeposit);
    }

    // Read-only properties
    public String getAccountNumber() { return accountNumber; }
    public String getHolderName()    { return holderName; }
    public double getBalance()       { return Math.round(balance * 100.0) / 100.0; }

    // Unmodifiable transaction history
    public List<String> getTransactionHistory() {
        return Collections.unmodifiableList(transactionLog);
    }

    // Controlled deposit (User requested snippet pattern!)
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            logTxn("DEPOSIT", amount);
        } else {
            System.out.println("  [WARN] Invalid deposit amount: " + amount);
        }
    }

    // Controlled withdrawal
    public boolean withdraw(double amount) {
        if (amount <= 0 || amount > balance) {
            System.out.println("  [WARN] Withdrawal denied: $" + amount);
            return false;
        }
        balance -= amount;
        logTxn("WITHDRAWAL", amount);
        return true;
    }

    // Static transfer (atomic — both accounts updated or neither)
    public static boolean transfer(BankAccount from, BankAccount to, double amount) {
        if (from == null || to == null || amount <= 0 || from.balance < amount) return false;
        from.balance -= amount;
        to.balance   += amount;
        from.logTxn("TRANSFER OUT to " + to.accountNumber, amount);
        to.logTxn("TRANSFER IN from " + from.accountNumber, amount);
        return true;
    }

    private void logTxn(String type, double amount) {
        transactionLog.add(String.format("%-20s $%10.2f | Balance: $%10.2f", type, amount, balance));
    }

    @Override
    public String toString() {
        return String.format("BankAccount{#%s | %s | Balance: $%.2f}",
                accountNumber, holderName, balance);
    }
}

// =====================================================================
// PROJECT 2: STUDENT GRADE BOOK
// =====================================================================
class GradeBook {
    private final String studentName;
    private final Map<String, Integer> subjectGrades;

    public GradeBook(String studentName) {
        this.studentName   = studentName;
        this.subjectGrades = new LinkedHashMap<>();
    }

    public String getStudentName() { return studentName; }

    public void addGrade(String subject, int grade) {
        if (grade < 0 || grade > 100) throw new IllegalArgumentException("Grade must be 0–100: " + grade);
        subjectGrades.put(subject.trim(), grade);
    }

    public Map<String, Integer> getGrades() {
        return Collections.unmodifiableMap(subjectGrades);
    }

    public double getAverage() {
        if (subjectGrades.isEmpty()) return 0.0;
        return subjectGrades.values().stream().mapToInt(Integer::intValue).average().orElse(0.0);
    }

    public char getLetterGrade() {
        double avg = getAverage();
        if (avg >= 90) return 'A';
        if (avg >= 80) return 'B';
        if (avg >= 70) return 'C';
        if (avg >= 60) return 'D';
        return 'F';
    }

    @Override
    public String toString() {
        return String.format("GradeBook{student='%s', avg=%.1f, grade='%c'}",
                studentName, getAverage(), getLetterGrade());
    }
}

// =====================================================================
// PROJECT 3: PRODUCT INVENTORY WITH ACCESS CONTROL
// =====================================================================
class InventoryItem {
    private static int idCounter = 0;
    private final String itemId;
    private String productName;
    private double unitPrice;
    private int stockQuantity;
    private boolean discontinued;

    public InventoryItem(String productName, double unitPrice, int initialStock) {
        this.itemId        = "ITEM-" + String.format("%03d", ++idCounter);
        setProductName(productName);
        setUnitPrice(unitPrice);
        this.stockQuantity = Math.max(0, initialStock);
        this.discontinued  = false;
    }

    public String getItemId()       { return itemId; }
    public String getProductName()  { return productName; }
    public double getUnitPrice()    { return unitPrice; }
    public int getStockQuantity()   { return stockQuantity; }
    public boolean isDiscontinued() { return discontinued; }
    public double getTotalValue()   { return unitPrice * stockQuantity; } // Computed

    public void setProductName(String name) {
        if (name == null || name.isBlank()) throw new IllegalArgumentException("Name required.");
        this.productName = name.trim();
    }

    public void setUnitPrice(double price) {
        if (price < 0) throw new IllegalArgumentException("Price cannot be negative.");
        this.unitPrice = price;
    }

    public boolean sell(int qty) {
        if (discontinued) { System.out.println("  [WARN] Item is discontinued!"); return false; }
        if (qty <= 0 || qty > stockQuantity) return false;
        stockQuantity -= qty;
        return true;
    }

    public void restock(int qty) {
        if (qty > 0) stockQuantity += qty;
    }

    public void discontinue() { this.discontinued = true; }

    @Override
    public String toString() {
        return String.format("[%s] %-22s | $%6.2f | Stock: %3d | Discontinued: %b",
                itemId, productName, unitPrice, stockQuantity, discontinued);
    }
}

// =====================================================================
// MAIN ORCHESTRATOR
// =====================================================================
public class Main {
    public static void main(String[] args) {
        // ---- PROJECT 1 ----
        System.out.println("╔══════════════════════════════════════╗");
        System.out.println("║    PROJECT 1: SECURE BANK ACCOUNT    ║");
        System.out.println("╚══════════════════════════════════════╝");
        BankAccount alice = new BankAccount("Alice Sharma", 5000.0);
        BankAccount bob   = new BankAccount("Bob Reddy",    3000.0);

        alice.deposit(2000.0);
        alice.deposit(-50.0);   // Invalid
        alice.withdraw(800.0);
        BankAccount.transfer(alice, bob, 1500.0);

        System.out.println("\n" + alice);
        System.out.println(bob);
        System.out.println("\nAlice's Transaction History:");
        alice.getTransactionHistory().forEach(t -> System.out.println("  " + t));

        // ---- PROJECT 2 ----
        System.out.println("\n╔══════════════════════════════════════╗");
        System.out.println("║    PROJECT 2: STUDENT GRADE BOOK     ║");
        System.out.println("╚══════════════════════════════════════╝");
        GradeBook gb = new GradeBook("Ravi Kumar");
        gb.addGrade("Mathematics",   88);
        gb.addGrade("Physics",       92);
        gb.addGrade("Chemistry",     79);
        gb.addGrade("Computer Sci",  95);
        gb.addGrade("English",       83);

        System.out.println(gb);
        System.out.println("Subject Grades: " + gb.getGrades());
        try { gb.addGrade("History", 150); } catch (IllegalArgumentException e) {
            System.out.println("Grade error: " + e.getMessage());
        }

        // ---- PROJECT 3 ----
        System.out.println("\n╔══════════════════════════════════════╗");
        System.out.println("║    PROJECT 3: PRODUCT INVENTORY      ║");
        System.out.println("╚══════════════════════════════════════╝");
        InventoryItem kb  = new InventoryItem("Mechanical Keyboard", 79.99, 100);
        InventoryItem mse = new InventoryItem("Wireless Mouse",       29.99, 250);
        InventoryItem mon = new InventoryItem("4K Monitor",          349.00,  30);

        System.out.println(kb);
        kb.sell(25);
        kb.restock(50);
        mon.discontinue();
        mon.sell(5); // Should warn!

        System.out.println("\nUpdated Inventory:");
        System.out.println(kb);
        System.out.println(mse);
        System.out.println(mon);
        System.out.printf("Total Inventory Value: $%.2f%n",
                kb.getTotalValue() + mse.getTotalValue() + mon.getTotalValue());
    }
}`,
    output: `╔══════════════════════════════════════╗
║    PROJECT 1: SECURE BANK ACCOUNT    ║
╚══════════════════════════════════════╝
  [WARN] Invalid deposit amount: -50.0

BankAccount{#ACC-1001 | Alice Sharma | Balance: $4700.00}
BankAccount{#ACC-1002 | Bob Reddy | Balance: $4500.00}

Alice's Transaction History:
  ACCOUNT OPENED       $  5000.00 | Balance: $   5000.00
  DEPOSIT              $  2000.00 | Balance: $   7000.00
  WITHDRAWAL           $   800.00 | Balance: $   6200.00
  TRANSFER OUT to ACC-1002 $  1500.00 | Balance: $   4700.00

╔══════════════════════════════════════╗
║    PROJECT 2: STUDENT GRADE BOOK     ║
╚══════════════════════════════════════╝
GradeBook{student='Ravi Kumar', avg=87.4, grade='B'}
Subject Grades: {Mathematics=88, Physics=92, Chemistry=79, Computer Sci=95, English=83}
Grade error: Grade must be 0–100: 150

╔══════════════════════════════════════╗
║    PROJECT 3: PRODUCT INVENTORY      ║
╚══════════════════════════════════════╝
[ITEM-001] Mechanical Keyboard   |  $79.99 | Stock: 100 | Discontinued: false
  [WARN] Item is discontinued!

Updated Inventory:
[ITEM-001] Mechanical Keyboard   |  $79.99 | Stock: 125 | Discontinued: false
[ITEM-002] Wireless Mouse        |  $29.99 | Stock: 250 | Discontinued: false
[ITEM-003] 4K Monitor            | $349.00 | Stock:  30 | Discontinued: true
Total Inventory Value: $27972.25`,
    lineByLine: [
      {
        line: 'Collections.unmodifiableList(transactionLog)',
        explanation: 'Returns a read-only view of the log — callers can iterate and read but cannot add or remove entries.'
      },
      {
        line: 'from.balance -= amount; to.balance += amount;',
        explanation: 'Atomic transfer inside a static method accessing both accounts\' private balances via trusted internal access.'
      },
      {
        line: 'public double getTotalValue()',
        explanation: 'Computed property: derives total value from existing fields without a redundant backing field.'
      },
      {
        line: 'public boolean isDiscontinued()',
        explanation: 'Boolean getter uses "is" prefix per Java Beans convention — required by Spring and Hibernate frameworks.'
      }
    ],
    practicalExample: `// Config Manager Project (Package-internal validator + Public API)
class AppConfig {
    private static final Map<String, String> settings = new LinkedHashMap<>();
    private static final Set<String> validKeys = Set.of(
        "APP_NAME", "MAX_USERS", "TIMEOUT_MS", "DEBUG_MODE");

    // Package-private validator (internal use only)
    static void validateKey(String key) {
        if (!validKeys.contains(key))
            throw new IllegalArgumentException("Unknown config key: " + key);
    }

    // Public API
    public static void set(String key, String value) {
        validateKey(key);
        settings.put(key, value);
    }

    public static String get(String key) {
        validateKey(key);
        return settings.getOrDefault(key, "NOT_SET");
    }

    public static Map<String, String> getAllSettings() {
        return Collections.unmodifiableMap(settings);
    }
}

public class PracticalApplication {
    public static void main(String[] args) {
        AppConfig.set("APP_NAME", "OurCompiler");
        AppConfig.set("MAX_USERS", "5000");
        AppConfig.set("TIMEOUT_MS", "3000");
        System.out.println("=== Application Configuration ===");
        AppConfig.getAllSettings().forEach((k, v) ->
            System.out.printf("  %-15s = %s%n", k, v));
    }
}`,
    practicalOutput: `=== Application Configuration ===
  APP_NAME        = OurCompiler
  MAX_USERS       = 5000
  TIMEOUT_MS      = 3000`,
    commonMistakes: [
      'Adding a `setAccountNumber()` setter on an account — account numbers must be final and immutable.',
      'Letting callers do `account.setBalance(account.getBalance() - amount)` instead of `account.withdraw(amount)` — leaks business logic.',
      'Exposing the raw transaction `ArrayList` from `getTransactionHistory()` without wrapping it in `Collections.unmodifiableList()`.',
      'Not validating inputs at the boundary of public methods — every public method is a trust boundary.'
    ],
    challenge: `// Final Coding Challenge:
// Create a fully encapsulated Library class:
// 1. private Map<String, Boolean> books (ISBN -> isAvailable).
// 2. addBook(isbn): adds with isAvailable=true.
// 3. checkOut(isbn): marks false, returns false if not available.
// 4. returnBook(isbn): marks true.
// 5. getAvailableCount(): computed from map values.
// 6. getBooks(): unmodifiable view.

import java.util.*;

class Library {
    private final Map<String, Boolean> books = new LinkedHashMap<>();

    public void addBook(String isbn) { books.put(isbn, true); }

    public boolean checkOut(String isbn) {
        if (!books.getOrDefault(isbn, false)) return false;
        books.put(isbn, false);
        return true;
    }

    public void returnBook(String isbn) {
        if (books.containsKey(isbn)) books.put(isbn, true);
    }

    public long getAvailableCount() {
        return books.values().stream().filter(Boolean::booleanValue).count();
    }

    public Map<String, Boolean> getBooks() {
        return Collections.unmodifiableMap(books);
    }
}

public class Challenge {
    public static void main(String[] args) {
        Library lib = new Library();
        lib.addBook("978-001"); lib.addBook("978-002"); lib.addBook("978-003");
        lib.checkOut("978-002");
        System.out.println("Books: " + lib.getBooks());
        System.out.println("Available: " + lib.getAvailableCount());
    }
}`,
    faq: [
      {
        q: 'Is it OK to call setter methods from within the constructor?',
        a: 'Yes — in fact it is encouraged! Calling setters from constructors reuses the validation logic and avoids code duplication. However, be careful with final fields: they must be set exactly once, so setter-based assignment to final fields must be done carefully.'
      },
      {
        q: 'Can private methods be called by subclasses?',
        a: 'No. Private methods are strictly limited to the declaring class. They are not inherited and cannot be called or overridden by subclasses. Use `protected` if subclasses need access.'
      },
      {
        q: 'What is the difference between encapsulation and abstraction?',
        a: 'Encapsulation hides the internal state and provides controlled access via methods (HOW data is protected). Abstraction hides complexity by providing a simple interface that shows WHAT an object can do without exposing HOW it does it.'
      }
    ],
    recap: [
      'All 4 projects demonstrate complete encapsulation: private fields, validated setters, computed properties, and unmodifiable collection exposure.',
      'Identity fields (IDs, timestamps) must be `private final` with getters but NO setters.',
      'Return `Collections.unmodifiableList/Map()` to expose collection state safely.',
      'Business logic (withdraw, enroll, sell) belongs inside the class — not in caller code.',
      'Access modifiers are the enforcement mechanism of good object-oriented design boundaries.'
    ]
  }
];

const outputFile = path.join(__dirname, 'java_phase10_data.js');
const exportContent = 'module.exports = ' + JSON.stringify(phase10Data, null, 2) + ';\n';
fs.writeFileSync(outputFile, exportContent, 'utf8');
console.log('✅ Successfully wrote scratch/java_phase10_data.js via JSON serialization!');
