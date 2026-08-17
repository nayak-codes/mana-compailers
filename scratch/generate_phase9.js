const fs = require('fs');
const path = require('path');

const phase9Data = [
  // =========================================================================
  // CHAPTER 38: Java Class & Object Fundamentals
  // =========================================================================
  {
    num: 38,
    phaseId: 'phase9',
    phaseTitle: 'Phase 9: Classes & Objects',
    slug: '38-java-class-and-object-fundamentals',
    title: 'Java Class & Object Fundamentals: Blueprint vs Instance',
    badge: '38. Class & Object Fundamentals',
    subtopics: 'Class ante enti? · Object ante enti? · Blueprint vs Instance Analogy · Fields (Instance Variables) · Methods Inside Classes · Creating Objects with new · Dot Operator · Memory Model: Stack Reference + Heap Object · Multiple Objects from One Class',
    readTime: '22 min read',
    intro: 'Comprehensive masterclass on Java Object-Oriented Programming foundations: understanding the critical distinction between a class (blueprint/template) and an object (living instance in memory), defining fields and methods inside classes, allocating objects on the Heap with the new keyword, and navigating members using the dot operator.',
    theorySections: [
      {
        heading: '1. Class Ante Enti? (What is a Class in Java?)',
        content: `A **Class** is a **blueprint, template, or architectural plan** that describes two things:
1. **Fields (State):** What data/attributes an object should hold.
2. **Methods (Behavior):** What actions/operations the object can perform.

**Real-World Analogy — Car Blueprint:**
- The architectural blueprint of a car says: "Every car has a color, engine size, and fuel type. Every car can startEngine(), accelerate(), and brake()."
- But the blueprint itself is NOT a physical car—you cannot sit in or drive a blueprint!
- It is only when a manufacturer **builds (instantiates) a car from that blueprint** that a real, usable car (object) comes into existence.

\`\`\`java
// 1. CLASS = Blueprint (Defines structure and behavior)
class Car {
    String color;    // Field (State)
    int speed;       // Field (State)

    void accelerate() { // Method (Behavior)
        speed += 10;
    }
}

// 2. OBJECT = A real car built from the blueprint (Instantiation)
Car myCar = new Car(); // myCar is now a usable instance
\`\`\``
      },
      {
        heading: '2. Object Ante Enti? (What is an Object in Java?)',
        content: `An **Object** is a **concrete, usable instance** of a class that exists in the **JVM Heap memory** at runtime.

Each object has:
1. **Its own identity:** A unique 64-bit memory address in the Heap.
2. **Its own state:** Independent values for every field defined in the class.
3. **Shared behavior:** Methods defined in the class are shared (not duplicated) via the JVM Method Area.

\`\`\`
  CLASS (Method Area - Template)     HEAP MEMORY (Runtime Objects)
  +----------------------------+    +----------------+  +----------------+
  | class Student {            |    | Object #1      |  | Object #2      |
  |   String name;             |    | name = "Ravi"  |  | name = "Priya" |
  |   int age;                 |    | age  = 20      |  | age  = 22      |
  |   void display() { ... }  |    | Addr: 0x5A00   |  | Addr: 0x6B00   |
  | }                          |    +----------------+  +----------------+
  +----------------------------+
\`\`\``
      },
      {
        heading: '3. Fields (Instance Variables) Explained',
        content: `Fields (also called **Instance Variables**) are variables declared directly inside a class body but OUTSIDE any method:

\`\`\`java
class Student {
    String name;    // Instance field: EACH object gets its own copy
    int age;        // Instance field
    double gpa;     // Instance field
}
\`\`\`

**Key Rules:**
- Fields are allocated on the **Heap** as part of the object (not the Stack).
- Every object created from the class gets its **own independent copy** of each field.
- Fields are auto-initialized to default values (<code>0</code>, <code>false</code>, <code>null</code>) if not explicitly initialized in a constructor.`
      },
      {
        heading: '4. Creating Objects with new & The Dot Operator',
        content: `The <code>new</code> keyword triggers 3 JVM operations:
1. **Allocates** memory in the Heap for the new object.
2. **Initializes** all fields to their default values (0 / false / null).
3. **Invokes** the constructor to set up the object\'s initial state.

The **dot operator (<code>.</code>)** navigates from a reference variable to an object\'s fields or methods:
\`\`\`java
Student s = new Student(); // s is a Stack reference pointing to a Heap object
s.name = "Ravi";           // Sets name field on the Heap object
s.age = 20;                // Sets age field on the Heap object
s.displayDetails();        // Invokes displayDetails() method
\`\`\``
      },
      {
        heading: '5. JVM Memory Model: Stack Reference + Heap Object',
        content: `\`\`\`
  STACK MEMORY                    HEAP MEMORY
  +-------------------+          +----------------------------+
  | s1 = 0x4A00       | ------>  | name: "Ravi"               |
  +-------------------+          | age : 20                   |
  | s2 = 0x7C00       | ------>  +----------------------------+
  +-------------------+          | name: "Priya"              |
                                  | age : 22                   |
                                  +----------------------------+
\`\`\`

**The Null Pointer Hazard:**
If you declare a reference but don\'t create an object, the reference variable contains <code>null</code>. Attempting to use the dot operator on a null reference throws <code>NullPointerException</code>:
\`\`\`java
Student ghost = null;
ghost.displayDetails(); // throws java.lang.NullPointerException!
\`\`\``
      }
    ],
    codeExample: `class Student {
    // Fields (Instance Variables)
    String name;
    int age;

    // Method inside class (User requested core snippet)
    void displayDetails() {
        System.out.println(name + " - " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. User Requested Primary Snippet ===");
        Student student = new Student("Ravi", 20);  // Note: This requires constructor
        student.displayDetails(); // Will be extended in next chapter

        System.out.println("\n=== 2. Dot Operator: Setting Fields Directly ===");
        Student s1 = new Student();
        s1.name = "Priya Sharma";
        s1.age  = 22;
        s1.displayDetails();

        System.out.println("\n=== 3. Multiple Independent Objects from One Class ===");
        Student s2 = new Student();
        s2.name = "Kiran Kumar";
        s2.age  = 21;

        Student s3 = new Student();
        s3.name = "Ananya Reddy";
        s3.age  = 23;

        // Each object has its own state!
        System.out.println("Object s1: "); s1.displayDetails();
        System.out.println("Object s2: "); s2.displayDetails();
        System.out.println("Object s3: "); s3.displayDetails();

        System.out.println("\n=== 4. Checking Object Identity ===");
        System.out.println("s1 == s2 (same object?) : " + (s1 == s2));

        Student s4 = s1; // s4 and s1 point to the SAME heap object!
        System.out.println("s4 == s1 (same object?) : " + (s4 == s1));
        s4.name = "MODIFIED via s4";
        System.out.println("s1.name after s4 change : " + s1.name);
    }
}`,
    output: `=== 1. User Requested Primary Snippet ===
Ravi - 20

=== 2. Dot Operator: Setting Fields Directly ===
Priya Sharma - 22

=== 3. Multiple Independent Objects from One Class ===
Object s1: 
Priya Sharma - 22
Object s2: 
Kiran Kumar - 21
Object s3: 
Ananya Reddy - 23

=== 4. Checking Object Identity ===
s1 == s2 (same object?) : false
s4 == s1 (same object?) : true
s1.name after s4 change : MODIFIED via s4`,
    lineByLine: [
      {
        line: 'class Student { String name; int age; }',
        explanation: 'Declares a class blueprint defining two instance fields: name (String) and age (int).'
      },
      {
        line: 'Student s1 = new Student();',
        explanation: 'Allocates a new Student object on the Heap; s1 on the Stack holds the memory address (reference).'
      },
      {
        line: 's1.name = "Priya Sharma";',
        explanation: 'Follows the s1 reference to the Heap object and writes "Priya Sharma" into the name field.'
      },
      {
        line: 'Student s4 = s1;',
        explanation: 'Copies the memory address from s1 into s4. Both variables now point to the same Heap object.'
      }
    ],
    practicalExample: `class BankAccount {
    String accountNumber;
    String holderName;
    double balance;

    void showBalance() {
        System.out.printf("  Account: %s | Holder: %-12s | Balance: $%,.2f%n",
                accountNumber, holderName, balance);
    }
}

public class PracticalApplication {
    public static void main(String[] args) {
        BankAccount acc1 = new BankAccount();
        acc1.accountNumber = "SB-001-2026";
        acc1.holderName = "Ravi Kumar";
        acc1.balance = 15000.00;

        BankAccount acc2 = new BankAccount();
        acc2.accountNumber = "SB-002-2026";
        acc2.holderName = "Priya Devi";
        acc2.balance = 32500.75;

        System.out.println("=== Active Bank Accounts ===");
        acc1.showBalance();
        acc2.showBalance();
    }
}`,
    practicalOutput: `=== Active Bank Accounts ===
  Account: SB-001-2026 | Holder: Ravi Kumar    | Balance: $15,000.00
  Account: SB-002-2026 | Holder: Priya Devi    | Balance: $32,500.75`,
    commonMistakes: [
      'Accessing an object\'s field without first creating the object (NullPointerException).',
      'Writing `Student s1 = Student();` without the `new` keyword, which is a compile error.',
      'Believing that `s4 = s1` creates a copy of the object. It only copies the reference address!',
      'Declaring fields inside a method (those are local variables, NOT instance fields).'
    ],
    challenge: `// Coding Challenge:
// 1. Create a class Rectangle with fields: double length and double width.
// 2. Add a method calculateArea() returning length * width.
// 3. Add a method calculatePerimeter() returning 2 * (length + width).
// 4. Create 3 different Rectangle objects and display their area and perimeter.

class Rectangle {
    double length;
    double width;

    double calculateArea() {
        return length * width;
    }

    double calculatePerimeter() {
        return 2 * (length + width);
    }
}

public class Challenge {
    public static void main(String[] args) {
        Rectangle r1 = new Rectangle();
        r1.length = 10.0; r1.width = 5.0;

        Rectangle r2 = new Rectangle();
        r2.length = 8.5; r2.width = 3.0;

        System.out.printf("R1: Area=%.2f, Perimeter=%.2f%n", r1.calculateArea(), r1.calculatePerimeter());
        System.out.printf("R2: Area=%.2f, Perimeter=%.2f%n", r2.calculateArea(), r2.calculatePerimeter());
    }
}`,
    faq: [
      {
        q: 'Can we have a class without fields or methods?',
        a: 'Yes, Java allows an empty class (`class Empty {}`). However, it is rarely useful. Marker interfaces and some annotation types are used this way in enterprise code.'
      },
      {
        q: 'How many objects can be created from a single class?',
        a: 'Theoretically unlimited, bounded only by available JVM Heap memory. A highly loaded web server might instantiate thousands of `HttpRequest` objects per second from a single class definition.'
      },
      {
        q: 'What is the difference between a class and an object?',
        a: 'A class is a compile-time concept (code written in a .java file), while an object is a runtime concept (memory allocated in the JVM Heap). One class definition can produce millions of objects.'
      }
    ],
    recap: [
      'A class is a blueprint defining fields (state) and methods (behavior).',
      'An object is a live instance of a class, allocated in JVM Heap memory.',
      '`new` allocates the object, initializes fields to defaults, and invokes the constructor.',
      'The dot operator (`.`) navigates from a Stack reference to a Heap object\'s members.',
      'Multiple objects are independent; each has its own copy of instance fields.'
    ]
  },

  // =========================================================================
  // CHAPTER 39: Constructors, this Keyword & Constructor Overloading
  // =========================================================================
  {
    num: 39,
    phaseId: 'phase9',
    phaseTitle: 'Phase 9: Classes & Objects',
    slug: '39-java-constructors-this-keyword-and-overloading',
    title: 'Java Constructors, this Keyword & Constructor Overloading',
    badge: '39. Constructors & this Keyword',
    subtopics: 'What is a Constructor? · Default Constructor · Parameterized Constructor · Constructor vs Method Differences · this Keyword: 3 Roles · this() Constructor Chaining · Constructor Overloading · Copy Constructor Pattern',
    readTime: '24 min read',
    intro: 'Mastering Java constructor mechanics: understanding the 3 types of constructors (default, parameterized, and copy), the critical roles of the this keyword in field disambiguation, method chaining, and inter-constructor delegation, and designing constructor overloads to provide flexible object creation APIs.',
    theorySections: [
      {
        heading: '1. What is a Constructor? (Object Initialization Specialist)',
        content: `A **Constructor** is a special method that is **automatically invoked by the JVM when a new object is created** with the <code>new</code> keyword. Its purpose is to set up the object\'s initial state.

**Constructor vs Regular Method — 5 Critical Differences:**

| Property | Constructor | Regular Method |
|---|---|---|
| **Name** | Must exactly match the class name | Any valid identifier |
| **Return Type** | **None** (not even <code>void</code>!) | Must declare <code>void</code> or a type |
| **When Called** | Automatically on <code>new</code> | Must be explicitly invoked |
| **Can be inherited?** | No | Yes |
| **Purpose** | Object initialization | Any operation |`
      },
      {
        heading: '2. The Default Constructor',
        content: `If you **do NOT define any constructor** in your class, the Java compiler automatically generates a hidden **Default Constructor** with no parameters and an empty body:

\`\`\`java
class Product {
    String name; // Field
}
// Compiler inserts this invisible default constructor:
// Product() { super(); }

Product p = new Product(); // Valid! Uses auto-generated default constructor
\`\`\`

**Warning:** As soon as you explicitly define ANY constructor (parameterized), the compiler STOPS generating the default constructor automatically! If you still need no-arg construction, you must define it explicitly.`
      },
      {
        heading: '3. The Parameterized Constructor',
        content: `A **Parameterized Constructor** accepts arguments to initialize the object\'s fields with caller-provided values at creation time:

\`\`\`java
class Student {
    String name;
    int age;

    // Parameterized Constructor
    Student(String name, int age) {
        this.name = name; // "this.name" = instance field; "name" = parameter
        this.age  = age;
    }
}

Student s = new Student("Ravi", 20); // Compactly creates a fully initialized object
\`\`\``
      },
      {
        heading: '4. The this Keyword — 3 Distinct Roles',
        content: `The <code>this</code> keyword is a reference variable that points to the **current object** (the object whose method or constructor is currently executing).

**Role 1: Field Disambiguation (Most Common)**
When a constructor parameter has the same name as an instance field, <code>this.fieldName</code> disambiguates between them:
\`\`\`java
Student(String name, int age) {
    this.name = name; // this.name = field; name = parameter
    this.age  = age;
}
\`\`\`

**Role 2: Passing Current Object as Argument**
\`\`\`java
void register() {
    Database.save(this); // Passes the current Student object to the Database
}
\`\`\`

**Role 3: Constructor Chaining (this() Call)**
\`\`\`java
Student(String name) {
    this(name, 18); // Delegates to Student(String, int) — MUST be first statement!
}
\`\`\``
      },
      {
        heading: '5. Constructor Overloading',
        content: `Just like method overloading, you can define **multiple constructors with different parameter lists** to provide flexible object creation options:

\`\`\`java
class Student {
    String name;
    int age;
    double gpa;

    // No-arg constructor (Defaults)
    Student() {
        this("Unknown", 18, 0.0);
    }

    // Name-only constructor
    Student(String name) {
        this(name, 18, 0.0);
    }

    // Full parameterized constructor (the one that does the actual work)
    Student(String name, int age, double gpa) {
        this.name = name;
        this.age  = age;
        this.gpa  = gpa;
    }
}
\`\`\``
      }
    ],
    codeExample: `class Student {
    String name;
    int age;
    double gpa;
    String department;

    // Constructor 1: No-arg (Delegates to full constructor with defaults)
    Student() {
        this("Unknown Student", 18, 0.0, "Undeclared");
    }

    // Constructor 2: Name and age only (User requested snippet base)
    Student(String name, int age) {
        this(name, age, 0.0, "General");
    }

    // Constructor 3: Full parameterized constructor (All fields)
    Student(String name, int age, double gpa, String department) {
        this.name       = name;
        this.age        = age;
        this.gpa        = gpa;
        this.department = department;
    }

    // Copy Constructor: Creates a new object with same state as another
    Student(Student other) {
        this(other.name, other.age, other.gpa, other.department);
    }

    // Instance method
    void displayDetails() {
        System.out.println(this.name + " - " + this.age);
    }

    void displayFullProfile() {
        System.out.printf("  Name: %-18s | Age: %2d | GPA: %.2f | Dept: %s%n",
                name, age, gpa, department);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. User Requested Snippet (Parameterized Constructor) ===");
        Student student = new Student("Ravi", 20);
        student.displayDetails();

        System.out.println("\n=== 2. Constructor Overloading Showcase ===");
        Student noArg   = new Student();
        Student nameAge = new Student("Priya", 22);
        Student full    = new Student("Kiran", 21, 3.85, "Computer Science");

        noArg.displayFullProfile();
        nameAge.displayFullProfile();
        full.displayFullProfile();

        System.out.println("\n=== 3. Copy Constructor Pattern ===");
        Student original = new Student("Ananya Reddy", 23, 3.95, "Data Science");
        Student copy = new Student(original);  // New independent object
        copy.name = "Ananya Reddy (Clone)";    // Modifying copy doesn't affect original

        System.out.println("Original: " + original.name + " | GPA: " + original.gpa);
        System.out.println("Copy    : " + copy.name     + " | GPA: " + copy.gpa);

        System.out.println("\n=== 4. this Keyword Disambiguation Test ===");
        Student s = new Student("Venkat", 25, 3.7, "Electronics");
        s.displayFullProfile();
    }
}`,
    output: `=== 1. User Requested Snippet (Parameterized Constructor) ===
Ravi - 20

=== 2. Constructor Overloading Showcase ===
  Name: Unknown Student    | Age: 18 | GPA: 0.00 | Dept: Undeclared
  Name: Priya              | Age: 22 | GPA: 0.00 | Dept: General
  Name: Kiran              | Age: 21 | GPA: 3.85 | Dept: Computer Science

=== 3. Copy Constructor Pattern ===
Original: Ananya Reddy | GPA: 3.95
Copy    : Ananya Reddy (Clone) | GPA: 3.95

=== 4. this Keyword Disambiguation Test ===
  Name: Venkat             | Age: 25 | GPA: 3.70 | Dept: Electronics`,
    lineByLine: [
      {
        line: 'Student student = new Student("Ravi", 20);',
        explanation: 'Triggers the 2-parameter constructor, copies "Ravi" and 20 as arguments, then this() delegates to the 4-parameter constructor.'
      },
      {
        line: 'this("Unknown Student", 18, 0.0, "Undeclared");',
        explanation: 'Constructor chaining via this(): delegates initialization to the full constructor. MUST be the very first statement.'
      },
      {
        line: 'this.name = name;',
        explanation: 'this.name refers to the instance field; the plain "name" refers to the constructor parameter of the same name.'
      },
      {
        line: 'Student copy = new Student(original);',
        explanation: 'Invokes the copy constructor to allocate a brand new heap object with the same field values as original.'
      }
    ],
    practicalExample: `class Product {
    String productId;
    String name;
    double price;
    int stockQuantity;

    Product(String productId, String name, double price, int stockQuantity) {
        this.productId     = productId;
        this.name          = name;
        this.price         = price;
        this.stockQuantity = stockQuantity;
    }

    void displayProduct() {
        System.out.printf("  [%s] %-20s | Price: $%6.2f | Stock: %3d units%n",
                productId, name, price, stockQuantity);
    }
}

public class PracticalApplication {
    public static void main(String[] args) {
        Product p1 = new Product("SKU-001", "Mechanical Keyboard", 79.99, 150);
        Product p2 = new Product("SKU-002", "Wireless Mouse",      29.99, 320);
        Product p3 = new Product("SKU-003", "4K Monitor",         349.00,  48);

        System.out.println("=== E-Commerce Inventory Catalog ===");
        p1.displayProduct();
        p2.displayProduct();
        p3.displayProduct();
    }
}`,
    practicalOutput: `=== E-Commerce Inventory Catalog ===
  [SKU-001] Mechanical Keyboard    | Price: $ 79.99 | Stock: 150 units
  [SKU-002] Wireless Mouse         | Price: $ 29.99 | Stock: 320 units
  [SKU-003] 4K Monitor             | Price: $349.00 | Stock:  48 units`,
    commonMistakes: [
      'Declaring a return type (even void) on a constructor, turning it into a regular method.',
      'Placing this() or super() as any statement other than the very first statement in a constructor body.',
      'Forgetting that defining a parameterized constructor removes the compiler-generated no-arg constructor.',
      'Writing `this.name = this.name;` (setting the field to itself) instead of `this.name = name;`.'
    ],
    challenge: `// Coding Challenge:
// Create a class Circle with:
// 1. field: double radius.
// 2. Constructor Circle(double radius) with this keyword.
// 3. No-arg constructor defaulting radius to 1.0 using this(1.0).
// 4. Methods: getArea(), getCircumference(), and displayInfo().

class Circle {
    double radius;

    Circle() {
        this(1.0);
    }

    Circle(double radius) {
        this.radius = radius;
    }

    double getArea() {
        return Math.PI * radius * radius;
    }

    double getCircumference() {
        return 2 * Math.PI * radius;
    }

    void displayInfo() {
        System.out.printf("  Circle | Radius: %.2f | Area: %.4f | Circumference: %.4f%n",
                radius, getArea(), getCircumference());
    }
}

public class Challenge {
    public static void main(String[] args) {
        new Circle().displayInfo();       // Default r=1.0
        new Circle(5.0).displayInfo();    // r=5.0
        new Circle(12.5).displayInfo();   // r=12.5
    }
}`,
    faq: [
      {
        q: 'What happens if we do not write any constructor in a class?',
        a: 'Java compiler automatically provides a no-argument default constructor with an empty body. However, as soon as you define any constructor yourself, the default constructor is no longer auto-generated.'
      },
      {
        q: 'Can a constructor call another constructor in the same class?',
        a: 'Yes, using `this(args...)` as the very first statement. This is called Constructor Chaining and promotes code reuse by having all constructors delegate to one "master" constructor.'
      },
      {
        q: 'Can constructors be private in Java?',
        a: 'Yes! Private constructors are used in Singleton design patterns to prevent external classes from instantiating the class directly. Object creation is controlled through a static factory method like `getInstance()`.'
      }
    ],
    recap: [
      'Constructors initialize objects at creation time and have no return type.',
      'Java provides an auto-generated default no-arg constructor only when NO constructor is defined.',
      '`this.field` disambiguates instance fields from same-named constructor parameters.',
      '`this(args)` delegates to another constructor in the same class and must be the first statement.',
      'Constructor overloading provides flexible APIs for creating objects with varying initialization data.'
    ]
  },

  // =========================================================================
  // CHAPTER 40: Static Members, Nested Classes & Enums
  // =========================================================================
  {
    num: 40,
    phaseId: 'phase9',
    phaseTitle: 'Phase 9: Classes & Objects',
    slug: '40-java-static-members-nested-classes-and-enums',
    title: 'Java Static Members, Nested Classes & Enums Masterclass',
    badge: '40. Static, Nested Classes & Enums',
    subtopics: 'Static Fields (Class Variables) · Static Methods · Static Initializer Blocks · Static vs Instance Memory Layout · Inner Classes (Non-static) · Static Nested Classes · Anonymous Inner Classes · Enums: Type-Safe Constants · Enum Methods & Constructors',
    readTime: '26 min read',
    intro: 'Mastering class-level design patterns in Java: static fields and methods that belong to the class rather than instances, static initializer blocks for one-time class setup, inner and nested class architectures, and Java Enums for compile-time type-safe constant groups with rich behavior.',
    theorySections: [
      {
        heading: '1. Static Fields (Class Variables)',
        content: `A **static field** (also called a Class Variable) is a field decorated with the <code>static</code> keyword. Unlike instance fields, only **one copy exists in the JVM Method Area** and is **shared across ALL objects** of the class:

\`\`\`java
class Student {
    static int totalStudents = 0; // ONE shared copy for the entire class
    String name;                  // Each object has its OWN copy

    Student(String name) {
        this.name = name;
        Student.totalStudents++;  // Increments the shared counter
    }
}

Student s1 = new Student("Ravi");
Student s2 = new Student("Priya");
System.out.println(Student.totalStudents); // 2 (Shared by all objects!)
\`\`\`

**Memory Layout:**
- Instance field <code>name</code> → Lives in each individual Heap object.
- Static field <code>totalStudents</code> → Lives once in the JVM Method Area (Class Area).`
      },
      {
        heading: '2. Static Initializer Blocks',
        content: `A **Static Initializer Block** is a block of code that runs **exactly once** when the class is first loaded into the JVM, before any object is created or static method is called. It is used for complex static field initialization (e.g. loading config files, computing lookup tables):

\`\`\`java
class DatabaseConfig {
    static String host;
    static int port;

    static {
        // Runs once when class is loaded
        host = System.getenv("DB_HOST") != null ? System.getenv("DB_HOST") : "localhost";
        port = 5432;
        System.out.println("[INIT] Database config loaded!");
    }
}
\`\`\``
      },
      {
        heading: '3. Inner Classes (Non-static Nested Classes)',
        content: `An **Inner Class** is a class defined inside another class body. A non-static inner class has implicit access to all members (including private ones) of the outer class:

\`\`\`java
class Engine {
    private int horsepower = 400;

    class TurboCharger {              // Inner class
        void boost() {
            System.out.println("Boosting " + horsepower + " HP engine!"); // Can access outer private!
        }
    }
}

Engine engine = new Engine();
Engine.TurboCharger turbo = engine.new TurboCharger(); // Requires outer instance!
turbo.boost();
\`\`\``
      },
      {
        heading: '4. Java Enums: Type-Safe Named Constants',
        content: `An **Enum (Enumeration)** is a special Java class that represents a **fixed, predefined set of named constants**. Enums provide compile-time type safety that prevents assigning invalid string values to constant-type fields:

\`\`\`java
// Without enum: Bug-prone, no type safety!
String day = "MONDAI"; // Typo goes undetected!

// With enum: Compile-time safety!
enum Day { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY }
Day today = Day.MONDAY; // Compiler validates!
\`\`\`

**Enums can have fields, constructors, and methods!**
\`\`\`java
enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    EARTH  (5.976e+24, 6.37814e6);

    private final double mass;
    private final double radius;

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    double surfaceGravity() {
        final double G = 6.67300E-11;
        return G * mass / (radius * radius);
    }
}
\`\`\``
      }
    ],
    codeExample: `// Enum Definition
enum OrderStatus {
    PENDING("Order received, awaiting processing"),
    PROCESSING("Order is being prepared"),
    SHIPPED("Order dispatched from warehouse"),
    DELIVERED("Order successfully delivered"),
    CANCELLED("Order cancelled by customer");

    private final String description;

    OrderStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}

class ShoppingCart {
    // Static field: shared across all cart instances
    static int totalCartsCreated = 0;
    static final double TAX_RATE  = 0.18; // 18% GST

    // Static initializer block
    static {
        System.out.println("  [CLASS LOADED] ShoppingCart initialized. Tax Rate: " + (TAX_RATE * 100) + "%");
    }

    String customerId;
    double subtotal;
    OrderStatus status;

    ShoppingCart(String customerId, double subtotal) {
        this.customerId = customerId;
        this.subtotal   = subtotal;
        this.status     = OrderStatus.PENDING;
        ShoppingCart.totalCartsCreated++;
    }

    double calculateTotalWithTax() {
        return subtotal * (1 + TAX_RATE);
    }

    void updateStatus(OrderStatus newStatus) {
        this.status = newStatus;
    }

    void displayOrderSummary() {
        System.out.printf("  Customer: %-10s | Subtotal: $%7.2f | Total+Tax: $%7.2f | Status: %s%n",
                customerId, subtotal, calculateTotalWithTax(), status.name());
        System.out.println("    -> " + status.getDescription());
    }

    // Static Nested Class (does not need outer instance)
    static class TaxCalculator {
        static double computeGST(double amount) {
            return amount * TAX_RATE;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. Static Initializer & Object Creation ===");
        ShoppingCart cart1 = new ShoppingCart("CUST-001", 499.99);
        ShoppingCart cart2 = new ShoppingCart("CUST-002", 1200.00);

        System.out.println("Total carts created: " + ShoppingCart.totalCartsCreated);

        System.out.println("\n=== 2. Order Status Enum Lifecycle ===");
        cart1.displayOrderSummary();
        cart1.updateStatus(OrderStatus.PROCESSING);
        cart1.displayOrderSummary();
        cart1.updateStatus(OrderStatus.SHIPPED);
        cart1.displayOrderSummary();

        System.out.println("\n=== 3. Enum Iteration via values() ===");
        System.out.println("All Order Statuses:");
        for (OrderStatus s : OrderStatus.values()) {
            System.out.printf("  %-12s [#%d] -> %s%n", s.name(), s.ordinal(), s.getDescription());
        }

        System.out.println("\n=== 4. Static Nested Class Usage ===");
        double gst = ShoppingCart.TaxCalculator.computeGST(cart2.subtotal);
        System.out.printf("  GST on $%.2f = $%.2f%n", cart2.subtotal, gst);

        System.out.println("\n=== 5. Enum in switch expression ===");
        OrderStatus current = OrderStatus.DELIVERED;
        String message = switch (current) {
            case PENDING    -> "Your order is in queue.";
            case PROCESSING -> "We are packing your items!";
            case SHIPPED    -> "Out for delivery!";
            case DELIVERED  -> "Enjoy your purchase!";
            case CANCELLED  -> "Sorry to see you go.";
        };
        System.out.println("  Status message: " + message);
    }
}`,
    output: `=== 1. Static Initializer & Object Creation ===
  [CLASS LOADED] ShoppingCart initialized. Tax Rate: 18.0%
Total carts created: 2

=== 2. Order Status Enum Lifecycle ===
  Customer: CUST-001   | Subtotal: $ 499.99 | Total+Tax: $ 589.99 | Status: PENDING
    -> Order received, awaiting processing
  Customer: CUST-001   | Subtotal: $ 499.99 | Total+Tax: $ 589.99 | Status: PROCESSING
    -> Order is being prepared
  Customer: CUST-001   | Subtotal: $ 499.99 | Total+Tax: $ 589.99 | Status: SHIPPED
    -> Order dispatched from warehouse

=== 3. Enum Iteration via values() ===
All Order Statuses:
  PENDING      [#0] -> Order received, awaiting processing
  PROCESSING   [#1] -> Order is being prepared
  SHIPPED      [#2] -> Order dispatched from warehouse
  DELIVERED    [#3] -> Order successfully delivered
  CANCELLED    [#4] -> Order cancelled by customer

=== 4. Static Nested Class Usage ===
  GST on $1200.00 = $216.00

=== 5. Enum in switch expression ===
  Status message: Enjoy your purchase!`,
    lineByLine: [
      {
        line: 'static int totalCartsCreated = 0;',
        explanation: 'Shared single copy in JVM Method Area, incremented every time any ShoppingCart constructor runs.'
      },
      {
        line: 'static { System.out.println(...) }',
        explanation: 'Static initializer block executes once when the JVM first loads the ShoppingCart class.'
      },
      {
        line: 'enum OrderStatus { PENDING(...), ... }',
        explanation: 'Enum constants are implicitly public static final fields pre-created in the Method Area at class load.'
      },
      {
        line: 'OrderStatus.values()',
        explanation: 'Built-in method returning an array of all enum constants in declaration order.'
      },
      {
        line: 'static class TaxCalculator',
        explanation: 'Static nested class belongs to the outer class scope but does NOT hold a reference to an outer class instance.'
      }
    ],
    practicalExample: `enum UserRole { ADMIN, MANAGER, EMPLOYEE, GUEST }

class Employee {
    static int headcount = 0;
    String name;
    double salary;
    UserRole role;

    Employee(String name, double salary, UserRole role) {
        this.name   = name;
        this.salary = salary;
        this.role   = role;
        headcount++;
    }

    void displayInfo() {
        System.out.printf("  %-14s | Role: %-8s | Salary: $%,.2f%n", name, role, salary);
    }
}

public class PracticalApplication {
    public static void main(String[] args) {
        Employee e1 = new Employee("Ravi Kumar",   85000, UserRole.MANAGER);
        Employee e2 = new Employee("Priya Devi",   62000, UserRole.EMPLOYEE);
        Employee e3 = new Employee("Admin Singh", 110000, UserRole.ADMIN);

        System.out.println("=== HR Portal — Employee Directory ===");
        e1.displayInfo(); e2.displayInfo(); e3.displayInfo();
        System.out.println("Total Headcount : " + Employee.headcount);
    }
}`,
    practicalOutput: `=== HR Portal — Employee Directory ===
  Ravi Kumar     | Role: MANAGER  | Salary: $85,000.00
  Priya Devi     | Role: EMPLOYEE | Salary: $62,000.00
  Admin Singh    | Role: ADMIN    | Salary: $110,000.00
Total Headcount : 3`,
    commonMistakes: [
      'Accessing a static field via an object reference (`s1.totalCount`) instead of the class name (`Student.totalCount`). Works, but misleading!',
      'Trying to use `this` inside a static method or static initializer block, causing compile error.',
      'Attempting to use a non-static field from within a static nested class (requires an outer class instance).',
      'Using String or int constants instead of Enums for status/category fields, making the code error-prone and unreadable.'
    ],
    challenge: `// Coding Challenge:
// Create an enum Season with values: SPRING, SUMMER, MONSOON, WINTER.
// Each enum should have a String activity and a method getRecommendation().
// Print all seasons and their recommended activities.

enum Season {
    SPRING("Cycling and picnics"),
    SUMMER("Swimming and water sports"),
    MONSOON("Trekking and hiking"),
    WINTER("Skiing and hot beverages");

    private final String activity;
    Season(String activity) { this.activity = activity; }

    public String getRecommendation() {
        return name() + ": " + activity;
    }
}

public class Challenge {
    public static void main(String[] args) {
        for (Season s : Season.values()) {
            System.out.println(s.getRecommendation());
        }
    }
}`,
    faq: [
      {
        q: 'When should I use static fields vs instance fields?',
        a: 'Use `static` for data that is shared and constant across all instances: counters, configuration constants, lookup tables. Use instance fields for data that is unique per object: a user\'s name, email, or balance.'
      },
      {
        q: 'What is the difference between a static nested class and an inner (non-static) class?',
        a: 'A static nested class does NOT hold an implicit reference to the outer class instance. It behaves like a regular top-level class but is scoped inside another for namespace organization. An inner (non-static) class always requires an enclosing outer instance and can freely access outer private members.'
      },
      {
        q: 'Can Enum constants have different constructors?',
        a: 'No. All enum constants in an enum type must use the same constructor signature defined in the enum body.'
      }
    ],
    recap: [
      'Static fields live in the JVM Method Area — shared by all objects; instance fields live per-object in the Heap.',
      'Static initializer blocks run once at class load time, before any constructor or static method.',
      'Inner (non-static) classes hold an implicit outer reference; static nested classes do not.',
      'Enums represent fixed, compile-time type-safe sets of constants and can have fields, constructors, and methods.',
      '`Enum.values()` returns all constants; `ordinal()` returns 0-based position; `name()` returns the string name.'
    ]
  },

  // =========================================================================
  // CHAPTER 41: toString(), Encapsulation & Object Best Practices
  // =========================================================================
  {
    num: 41,
    phaseId: 'phase9',
    phaseTitle: 'Phase 9: Classes & Objects',
    slug: '41-java-tostring-encapsulation-and-object-best-practices',
    title: 'Java toString(), Encapsulation, Getters/Setters & Object Best Practices',
    badge: '41. toString() & Encapsulation',
    subtopics: 'toString() Override · Why Default toString() is Useless · Object.equals() vs == · Encapsulation Principle · private Fields + public Getters & Setters · Data Validation in Setters · Fluent Builder Pattern · Immutable Classes',
    readTime: '24 min read',
    intro: 'Mastering object representation and data protection in Java: overriding the default toString() method for readable object descriptions, implementing Encapsulation with access modifiers to protect internal state, writing getters and setters with business validation logic, and designing immutable value objects.',
    theorySections: [
      {
        heading: '1. toString() Method — Object Representation',
        content: `Every Java class inherits a <code>toString()</code> method from <code>java.lang.Object</code>. The default implementation returns a meaningless memory hash like <code>Student@4aa298b7</code>.

**Overriding toString()** gives your objects a clean, human-readable representation:

\`\`\`java
class Student {
    String name;
    int age;

    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + "}";
    }
}

Student s = new Student("Ravi", 20);
System.out.println(s); // Auto-calls s.toString()!
// Output: Student{name='Ravi', age=20}
\`\`\`

**When is toString() automatically called?**
- <code>System.out.println(object)</code>
- String concatenation: <code>"Info: " + object</code>
- Passing to <code>System.out.printf</code> with <code>%s</code>`
      },
      {
        heading: '2. Encapsulation: The Guardian of Object State',
        content: `**Encapsulation** (Data Hiding) is one of the 4 pillars of OOP. It means:
1. Declaring all fields as <code>private</code> to prevent direct external access.
2. Providing <code>public</code> getter methods to safely read field values.
3. Providing <code>public</code> setter methods with **validation logic** to safely write/update field values.

**Why Encapsulation Matters:**
\`\`\`java
// WITHOUT Encapsulation (Dangerous!)
class BankAccount { public double balance; }
account.balance = -50000.0; // Any code can set any invalid value!

// WITH Encapsulation (Safe!)
class BankAccount {
    private double balance; // Protected!

    public void setBalance(double amount) {
        if (amount < 0) throw new IllegalArgumentException("Balance cannot be negative!");
        this.balance = amount;
    }
}
\`\`\``
      },
      {
        heading: '3. Getters and Setters Pattern',
        content: `Java naming convention for accessor and mutator methods:
- **Getter:** <code>public ReturnType getFieldName()</code> (for boolean fields: <code>public boolean isActive()</code>)
- **Setter:** <code>public void setFieldName(Type value)</code>

\`\`\`java
class Student {
    private String name;
    private int age;

    // Getter for name
    public String getName() { return name; }

    // Setter for name (with validation)
    public void setName(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name cannot be empty!");
        }
        this.name = name.trim();
    }

    // Getter for age
    public int getAge() { return age; }

    // Setter for age (with range validation)
    public void setAge(int age) {
        if (age < 5 || age > 120) {
            throw new IllegalArgumentException("Invalid age: " + age);
        }
        this.age = age;
    }
}
\`\`\``
      },
      {
        heading: '4. The Fluent Builder / Method Chaining Pattern',
        content: `Setters can return <code>this</code> to enable clean **method chaining (Fluent API)**:

\`\`\`java
class EmailMessage {
    private String from, to, subject, body;

    public EmailMessage setFrom(String from)    { this.from = from; return this; }
    public EmailMessage setTo(String to)        { this.to = to; return this; }
    public EmailMessage setSubject(String sub)  { this.subject = sub; return this; }
    public EmailMessage setBody(String body)    { this.body = body; return this; }
}

// Reads like natural English!
EmailMessage email = new EmailMessage()
        .setFrom("admin@company.com")
        .setTo("user@gmail.com")
        .setSubject("Welcome Aboard!")
        .setBody("Your account is ready.");
\`\`\``
      }
    ],
    codeExample: `class Student {
    // Encapsulated fields
    private String name;
    private int age;
    private double gpa;
    private boolean isEnrolled;

    // Parameterized constructor
    public Student(String name, int age, double gpa) {
        setName(name);  // Reuse setter validation in constructor!
        setAge(age);
        setGpa(gpa);
        this.isEnrolled = true;
    }

    // Getters
    public String getName()     { return name; }
    public int getAge()         { return age; }
    public double getGpa()      { return gpa; }
    public boolean isEnrolled() { return isEnrolled; }

    // Setters with validation
    public void setName(String name) {
        if (name == null || name.isBlank())
            throw new IllegalArgumentException("Name cannot be null or blank.");
        this.name = name.trim();
    }

    public void setAge(int age) {
        if (age < 16 || age > 80)
            throw new IllegalArgumentException("Age out of valid range: " + age);
        this.age = age;
    }

    public void setGpa(double gpa) {
        if (gpa < 0.0 || gpa > 4.0)
            throw new IllegalArgumentException("GPA must be between 0.0 and 4.0.");
        this.gpa = gpa;
    }

    public void setEnrolled(boolean enrolled) { this.isEnrolled = enrolled; }

    // toString() override
    @Override
    public String toString() {
        return String.format("Student{name='%s', age=%d, gpa=%.2f, enrolled=%b}",
                name, age, gpa, isEnrolled);
    }

    // Instance method (user requested)
    public void displayDetails() {
        System.out.println(name + " - " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. User Requested Snippet with toString() ===");
        Student student = new Student("Ravi", 20, 3.8);
        student.displayDetails();
        System.out.println("toString(): " + student);

        System.out.println("\n=== 2. Encapsulation Getters & Setters ===");
        student.setGpa(3.95);
        System.out.printf("Updated GPA via setter: %.2f%n", student.getGpa());

        System.out.println("\n=== 3. Validation in Setter (Protected State) ===");
        try {
            student.setAge(200); // Invalid!
        } catch (IllegalArgumentException e) {
            System.out.println("Validation caught: " + e.getMessage());
        }

        try {
            student.setGpa(5.5); // Invalid GPA!
        } catch (IllegalArgumentException e) {
            System.out.println("Validation caught: " + e.getMessage());
        }

        System.out.println("\n=== 4. toString() in String Concatenation ===");
        System.out.println("Student object info: " + student);

        System.out.println("\n=== 5. Fluent Method Chaining Example ===");
        // Simulate building report header
        System.out.println("Profile Card: [" + student.getName() + " | Age: " + student.getAge() + " | GPA: " + student.getGpa() + "]");
    }
}`,
    output: `=== 1. User Requested Snippet with toString() ===
Ravi - 20
toString(): Student{name='Ravi', age=20, gpa=3.80, enrolled=true}

=== 2. Encapsulation Getters & Setters ===
Updated GPA via setter: 3.95

=== 3. Validation in Setter (Protected State) ===
Validation caught: Age out of valid range: 200
Validation caught: GPA must be between 0.0 and 4.0.

=== 4. toString() in String Concatenation ===
Student object info: Student{name='Ravi', age=20, gpa=3.95, enrolled=true}

=== 5. Fluent Method Chaining Example ===
Profile Card: [Ravi | Age: 20 | GPA: 3.95]`,
    lineByLine: [
      {
        line: '@Override public String toString()',
        explanation: 'Overrides java.lang.Object.toString() so println(student) displays meaningful field data instead of a hash code.'
      },
      {
        line: 'if (gpa < 0.0 || gpa > 4.0) throw new IllegalArgumentException(...)',
        explanation: 'Business rule validation inside setter protects object integrity from invalid external data.'
      },
      {
        line: 'setName(name); // in constructor',
        explanation: 'Reusing setter validation logic inside the constructor eliminates duplication of validation code.'
      },
      {
        line: 'System.out.println("Student: " + student)',
        explanation: 'Java implicitly calls student.toString() when concatenating an object with a String.'
      }
    ],
    practicalExample: `class BankAccount {
    private final String accountId;
    private String holderName;
    private double balance;

    public BankAccount(String accountId, String holderName, double initialDeposit) {
        this.accountId  = accountId;
        this.holderName = holderName;
        this.balance    = Math.max(0, initialDeposit);
    }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Deposit amount must be positive!");
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount <= 0 || amount > balance)
            throw new IllegalArgumentException("Invalid withdrawal: $" + amount);
        balance -= amount;
    }

    public double getBalance()    { return balance; }
    public String getHolderName() { return holderName; }

    @Override
    public String toString() {
        return String.format("BankAccount{id='%s', holder='%s', balance=$%.2f}",
                accountId, holderName, balance);
    }
}

public class PracticalApplication {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("ACC-2026-001", "Ravi Kumar", 5000.0);
        System.out.println("=== Bank Account Operations ===");
        System.out.println("Initial: " + acc);
        acc.deposit(2000.0);
        acc.withdraw(800.0);
        System.out.println("Final  : " + acc);
    }
}`,
    practicalOutput: `=== Bank Account Operations ===
Initial: BankAccount{id='ACC-2026-001', holder='Ravi Kumar', balance=$5000.00}
Final  : BankAccount{id='ACC-2026-001', holder='Ravi Kumar', balance=$6200.00}`,
    commonMistakes: [
      'Returning `null` from getter methods without Null Object Pattern, propagating NullPointerExceptions.',
      'Creating setters for every field in immutable objects (date, ID, price) that should never change.',
      'Forgetting `@Override` annotation on toString(), accidentally creating a separate overloaded method.',
      'Writing setters without validation, defeating the entire purpose of encapsulation.'
    ],
    challenge: `// Coding Challenge:
// Build an immutable Point class:
// 1. Fields: final double x, final double y.
// 2. Only a constructor (no setters).
// 3. Override toString() to return "(x, y)".
// 4. Add distanceTo(Point other) returning Euclidean distance.

class Point {
    private final double x;
    private final double y;

    public Point(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public double getX() { return x; }
    public double getY() { return y; }

    public double distanceTo(Point other) {
        double dx = this.x - other.x;
        double dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    @Override
    public String toString() {
        return String.format("(%.2f, %.2f)", x, y);
    }
}

public class Challenge {
    public static void main(String[] args) {
        Point a = new Point(0, 0);
        Point b = new Point(3, 4);
        System.out.println("Point A: " + a);
        System.out.println("Point B: " + b);
        System.out.printf("Distance A to B: %.2f%n", a.distanceTo(b));
    }
}`,
    faq: [
      {
        q: 'Should all fields always be private?',
        a: 'As a best practice, yes. Expose data only through controlled getter/setter methods. Exceptions include `public static final` constants like `Math.PI` which are immutable by design.'
      },
      {
        q: 'What is an immutable class in Java?',
        a: 'An immutable class has all fields declared `private final`, no setters, and the class itself is declared `final` to prevent subclassing. `java.lang.String`, `java.lang.Integer`, and `java.time.LocalDate` are canonical examples.'
      },
      {
        q: 'Why does Java not auto-generate getters and setters like Kotlin or Lombok?',
        a: 'Standard Java philosophy is explicit verbosity. Libraries like Lombok or features like Java Records (Java 16+) generate them automatically via annotations (`@Data`, `@Getter`, `@Setter` in Lombok; `record` keyword in modern Java).'
      }
    ],
    recap: [
      'Override `toString()` to give objects meaningful readable representations.',
      'Encapsulation protects fields with `private` and controls access via `public` getters and setters.',
      'Setters should contain validation logic to prevent objects from entering invalid states.',
      'Reuse setter validation inside constructors to avoid code duplication.',
      'Immutable classes use `final` fields and no setters, making thread-safe objects by design.'
    ]
  },

  // =========================================================================
  // CHAPTER 42: OOP Capstone Projects (4 Production Systems)
  // =========================================================================
  {
    num: 42,
    phaseId: 'phase9',
    phaseTitle: 'Phase 9: Classes & Objects',
    slug: '42-java-oop-classes-capstone-projects',
    title: 'Java OOP Capstone Projects: 4 Production-Grade Class Systems',
    badge: '42. Capstone Projects (4 OOP Systems)',
    subtopics: 'Project 1: Student Management System · Project 2: Book Library System · Project 3: Product Inventory Manager · Project 4: Bank Account Application · OOP Design Principles Review',
    readTime: '30 min read',
    intro: 'Building 4 complete production-grade object-oriented Java systems applying all Phase 9 concepts: encapsulation, constructors, overloading, static members, toString(), and enums — a Student Management System, a Book Library Catalog, a Product Inventory Manager, and a complete Bank Account Application with transaction history.',
    theorySections: [
      {
        heading: '1. OOP System Design Principles Used in These Projects',
        content: `Before building, let\'s review the engineering principles applied across all 4 capstone projects:

1. **Encapsulation:** All fields are <code>private</code>; exposed via validated getters/setters.
2. **Constructor Overloading:** Multiple constructors for flexible object creation.
3. **Static Members:** Class-level counters and constants shared across all objects.
4. **toString() Override:** Clean, readable object representations.
5. **Enums for Status/Category:** Type-safe status fields instead of fragile Strings.
6. **Single Responsibility:** Each class manages exactly one business concept.`
      }
    ],
    codeExample: `import java.util.Arrays;

// =====================================================================
// PROJECT 1: STUDENT MANAGEMENT SYSTEM
// =====================================================================
class Student {
    private static int totalStudents = 0;

    enum AcademicStatus { ACTIVE, ON_LEAVE, GRADUATED, EXPELLED }

    private final String studentId;
    private String name;
    private int age;
    private double gpa;
    private AcademicStatus status;

    Student(String name, int age, double gpa) {
        totalStudents++;
        this.studentId = String.format("STU-%04d", totalStudents);
        setName(name);
        setAge(age);
        setGpa(gpa);
        this.status = AcademicStatus.ACTIVE;
    }

    public static int getTotalStudents() { return totalStudents; }
    public String getName()    { return name; }
    public double getGpa()     { return gpa; }
    public AcademicStatus getStatus() { return status; }

    public void setName(String name) {
        if (name == null || name.isBlank()) throw new IllegalArgumentException("Student name required!");
        this.name = name.trim();
    }
    public void setAge(int age) {
        if (age < 15 || age > 80) throw new IllegalArgumentException("Invalid age: " + age);
        this.age = age;
    }
    public void setGpa(double gpa) {
        if (gpa < 0.0 || gpa > 4.0) throw new IllegalArgumentException("GPA must be 0.0–4.0");
        this.gpa = gpa;
    }
    public void setStatus(AcademicStatus status) { this.status = status; }

    @Override
    public String toString() {
        return String.format("[%s] %-18s | Age: %2d | GPA: %.2f | Status: %s",
                studentId, name, age, gpa, status);
    }
}

// =====================================================================
// PROJECT 2: BOOK LIBRARY SYSTEM
// =====================================================================
class Book {
    enum Genre { FICTION, NON_FICTION, SCIENCE, TECHNOLOGY, HISTORY, BIOGRAPHY }

    private final String isbn;
    private String title;
    private String author;
    private double price;
    private int availableCopies;
    private Genre genre;

    Book(String isbn, String title, String author, double price, int copies, Genre genre) {
        this.isbn            = isbn;
        this.title           = title;
        this.author          = author;
        this.price           = price;
        this.availableCopies = copies;
        this.genre           = genre;
    }

    public boolean isAvailable()       { return availableCopies > 0; }
    public String getTitle()           { return title; }
    public String getAuthor()          { return author; }
    public int getAvailableCopies()    { return availableCopies; }

    public boolean checkOut() {
        if (!isAvailable()) return false;
        availableCopies--;
        return true;
    }

    public void returnBook() { availableCopies++; }

    @Override
    public String toString() {
        return String.format("[%s] %-30s by %-18s | Genre: %-11s | Copies: %d | Available: %b",
                isbn, title, author, genre, availableCopies, isAvailable());
    }
}

// =====================================================================
// PROJECT 3: PRODUCT INVENTORY MANAGER
// =====================================================================
class Product {
    enum Category { ELECTRONICS, CLOTHING, FOOD, SPORTS, FURNITURE }

    private static int productCount = 0;
    private final String productId;
    private String name;
    private double price;
    private int stock;
    private Category category;

    Product(String name, double price, int stock, Category category) {
        productCount++;
        this.productId = String.format("PRD-%03d", productCount);
        this.name      = name;
        this.price     = price;
        this.stock     = stock;
        this.category  = category;
    }

    public static int getProductCount() { return productCount; }
    public String getName()   { return name; }
    public double getPrice()  { return price; }
    public int getStock()     { return stock; }

    public boolean sellUnits(int qty) {
        if (qty <= 0 || qty > stock) return false;
        stock -= qty;
        return true;
    }

    public void restock(int qty) {
        if (qty > 0) stock += qty;
    }

    @Override
    public String toString() {
        return String.format("[%s] %-25s | $%7.2f | Stock: %3d | Category: %s",
                productId, name, price, stock, category);
    }
}

// =====================================================================
// PROJECT 4: BANK ACCOUNT APPLICATION
// =====================================================================
class BankAccount {
    enum AccountType { SAVINGS, CURRENT, FIXED_DEPOSIT }

    private static int accountSerial = 1000;
    private final String accountNumber;
    private String holderName;
    private double balance;
    private AccountType type;
    private int transactionCount;

    BankAccount(String holderName, double initialDeposit, AccountType type) {
        this.accountNumber   = "ACC-" + (++accountSerial);
        this.holderName      = holderName;
        this.balance         = Math.max(0, initialDeposit);
        this.type            = type;
        this.transactionCount = 1;
    }

    public String getAccountNumber() { return accountNumber; }
    public double getBalance()       { return balance; }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Deposit must be positive!");
        balance += amount;
        transactionCount++;
        System.out.printf("    + DEPOSIT  $%8.2f | New Balance: $%10.2f%n", amount, balance);
    }

    public void withdraw(double amount) {
        if (amount <= 0 || amount > balance)
            throw new IllegalArgumentException("Invalid withdrawal: $" + amount);
        balance -= amount;
        transactionCount++;
        System.out.printf("    - WITHDRAW $%8.2f | New Balance: $%10.2f%n", amount, balance);
    }

    public static boolean transfer(BankAccount from, BankAccount to, double amount) {
        if (from.balance < amount) return false;
        from.balance -= amount;
        to.balance   += amount;
        from.transactionCount++;
        to.transactionCount++;
        return true;
    }

    @Override
    public String toString() {
        return String.format("[%s] %-15s | Type: %-14s | Balance: $%10.2f | Txns: %d",
                accountNumber, holderName, type, balance, transactionCount);
    }
}

// =====================================================================
// MAIN: ORCHESTRATE ALL 4 SYSTEMS
// =====================================================================
public class Main {
    public static void main(String[] args) {
        System.out.println("========================================");
        System.out.println(" PROJECT 1: STUDENT MANAGEMENT SYSTEM");
        System.out.println("========================================");
        Student stu1 = new Student("Ravi Kumar",    20, 3.85);
        Student stu2 = new Student("Priya Sharma",  22, 3.72);
        Student stu3 = new Student("Kiran Reddy",   21, 3.90);
        stu2.setStatus(Student.AcademicStatus.ON_LEAVE);

        System.out.println(stu1);
        System.out.println(stu2);
        System.out.println(stu3);
        System.out.println("Total Enrolled Students: " + Student.getTotalStudents());

        System.out.println("\n========================================");
        System.out.println(" PROJECT 2: BOOK LIBRARY SYSTEM");
        System.out.println("========================================");
        Book b1 = new Book("978-001", "Clean Code",          "Robert C. Martin",  35.99, 3, Book.Genre.TECHNOLOGY);
        Book b2 = new Book("978-002", "The Pragmatic Programmer","Andy Hunt",     42.50, 2, Book.Genre.TECHNOLOGY);
        Book b3 = new Book("978-003", "Effective Java",       "Joshua Bloch",     40.00, 1, Book.Genre.TECHNOLOGY);

        System.out.println(b1);
        System.out.println(b2);
        System.out.println(b3);

        System.out.println("\nChecking out 'Effective Java': " + b3.checkOut());
        System.out.println("Try checkout again (no copies): " + b3.checkOut());
        System.out.println("After return:");
        b3.returnBook();
        System.out.println(b3);

        System.out.println("\n========================================");
        System.out.println(" PROJECT 3: PRODUCT INVENTORY MANAGER");
        System.out.println("========================================");
        Product p1 = new Product("Mechanical Keyboard", 79.99,  150, Product.Category.ELECTRONICS);
        Product p2 = new Product("Wireless Mouse",       29.99,  320, Product.Category.ELECTRONICS);
        Product p3 = new Product("Yoga Mat",             19.99,   80, Product.Category.SPORTS);

        System.out.println(p1);
        System.out.println(p2);
        System.out.println(p3);

        System.out.println("\nSelling 5 units of '" + p1.getName() + "': " + p1.sellUnits(5));
        p3.restock(50);
        System.out.println("After restock & sell:");
        System.out.println(p1);
        System.out.println(p3);
        System.out.println("Total Products in Catalog: " + Product.getProductCount());

        System.out.println("\n========================================");
        System.out.println(" PROJECT 4: BANK ACCOUNT APPLICATION");
        System.out.println("========================================");
        BankAccount alice = new BankAccount("Alice Sharma",  10000.0, BankAccount.AccountType.SAVINGS);
        BankAccount bob   = new BankAccount("Bob Reddy",      5000.0, BankAccount.AccountType.CURRENT);

        System.out.println("Initial State:");
        System.out.println("  " + alice);
        System.out.println("  " + bob);

        System.out.println("\nAlice\'s Transactions:");
        alice.deposit(2500.0);
        alice.withdraw(800.0);

        System.out.println("\nTransfer $3000 from Alice to Bob: "
                + BankAccount.transfer(alice, bob, 3000.0));

        System.out.println("\nFinal State:");
        System.out.println("  " + alice);
        System.out.println("  " + bob);
    }
}`,
    output: `========================================
 PROJECT 1: STUDENT MANAGEMENT SYSTEM
========================================
[STU-0001] Ravi Kumar          | Age: 20 | GPA: 3.85 | Status: ACTIVE
[STU-0002] Priya Sharma        | Age: 22 | GPA: 3.72 | Status: ON_LEAVE
[STU-0003] Kiran Reddy         | Age: 21 | GPA: 3.90 | Status: ACTIVE
Total Enrolled Students: 3

========================================
 PROJECT 2: BOOK LIBRARY SYSTEM
========================================
[978-001] Clean Code                    by Robert C. Martin     | Genre: TECHNOLOGY  | Copies: 3 | Available: true
[978-002] The Pragmatic Programmer      by Andy Hunt            | Genre: TECHNOLOGY  | Copies: 2 | Available: true
[978-003] Effective Java                by Joshua Bloch         | Genre: TECHNOLOGY  | Copies: 1 | Available: true

Checking out 'Effective Java': true
Try checkout again (no copies): false
After return:
[978-003] Effective Java                by Joshua Bloch         | Genre: TECHNOLOGY  | Copies: 1 | Available: true

========================================
 PROJECT 3: PRODUCT INVENTORY MANAGER
========================================
[PRD-001] Mechanical Keyboard     |  $ 79.99 | Stock: 150 | Category: ELECTRONICS
[PRD-002] Wireless Mouse          |  $ 29.99 | Stock: 320 | Category: ELECTRONICS
[PRD-003] Yoga Mat                |  $ 19.99 | Stock:  80 | Category: SPORTS

Selling 5 units of 'Mechanical Keyboard': true
After restock & sell:
[PRD-001] Mechanical Keyboard     |  $ 79.99 | Stock: 145 | Category: ELECTRONICS
[PRD-003] Yoga Mat                |  $ 19.99 | Stock: 130 | Category: SPORTS
Total Products in Catalog: 3

========================================
 PROJECT 4: BANK ACCOUNT APPLICATION
========================================
Initial State:
  [ACC-1001] Alice Sharma      | Type: SAVINGS         | Balance: $ 10000.00 | Txns: 1
  [ACC-1002] Bob Reddy         | Type: CURRENT         | Balance: $  5000.00 | Txns: 1

Alice's Transactions:
    + DEPOSIT  $ 2500.00 | New Balance: $  12500.00
    - WITHDRAW $  800.00 | New Balance: $  11700.00

Transfer $3000 from Alice to Bob: true

Final State:
  [ACC-1001] Alice Sharma      | Type: SAVINGS         | Balance: $  8700.00 | Txns: 4
  [ACC-1002] Bob Reddy         | Type: CURRENT         | Balance: $  8000.00 | Txns: 2`,
    lineByLine: [
      {
        line: 'Student.getTotalStudents()',
        explanation: 'Static method accesses the shared static counter tracking all Student objects created across the JVM.'
      },
      {
        line: 'b3.checkOut()',
        explanation: 'Instance method with guard: decrements availableCopies only if copies > 0, returning boolean success.'
      },
      {
        line: 'BankAccount.transfer(alice, bob, 3000.0)',
        explanation: 'Static method receives both account references and atomically deducts from sender and credits receiver.'
      },
      {
        line: 'System.out.println(stu1)',
        explanation: 'Implicitly calls Student.toString() to display the formatted student profile string.'
      }
    ],
    practicalExample: `public class PracticalApplication {
    public static void main(String[] args) {
        // Rapid object creation and OOP showcase
        System.out.println("=== 3-Second OOP Showcase ===");

        // Polymorphic object creation
        Student[] batch = {
            new Student("Ravi",  19, 3.5),
            new Student("Priya", 20, 3.8),
            new Student("Kiran", 21, 3.9)
        };

        double totalGpa = 0;
        for (Student s : batch) {
            totalGpa += s.getGpa();
            System.out.println("  " + s);
        }
        System.out.printf("Batch Average GPA: %.2f%n", totalGpa / batch.length);
    }
}`,
    practicalOutput: `=== 3-Second OOP Showcase ===
  [STU-0004] Ravi               | Age: 19 | GPA: 3.50 | Status: ACTIVE
  [STU-0005] Priya              | Age: 20 | GPA: 3.80 | Status: ACTIVE
  [STU-0006] Kiran              | Age: 21 | GPA: 3.90 | Status: ACTIVE
Batch Average GPA: 3.73`,
    commonMistakes: [
      'Making business methods `static` when they depend on instance state (like `withdraw()`).',
      'Forgetting to make IDs `final` so they cannot be accidentally reassigned after construction.',
      'Not incrementing static counters inside constructors, causing incorrect headcount tracking.',
      'Using public fields instead of private fields + getters, breaking encapsulation.'
    ],
    challenge: `// Coding Challenge:
// Extend the BankAccount with a fixed deposit calculation:
// 1. Add method: double calculateMaturity(int years, double annualRate)
//    that returns: balance * Math.pow(1 + annualRate/100, years)
// 2. Test it on a FIXED_DEPOSIT account.

class ExtendedBankAccount extends BankAccount {
    ExtendedBankAccount(String holder, double deposit, AccountType type) {
        super(holder, deposit, type);
    }

    public double calculateMaturity(int years, double annualRate) {
        return getBalance() * Math.pow(1 + annualRate / 100.0, years);
    }
}

public class Challenge {
    public static void main(String[] args) {
        ExtendedBankAccount fd = new ExtendedBankAccount("Savings Plan", 50000, BankAccount.AccountType.FIXED_DEPOSIT);
        System.out.printf("After 5 years at 7.5%%: $%.2f%n", fd.calculateMaturity(5, 7.5));
    }
}`,
    faq: [
      {
        q: 'When should I use an array of objects vs ArrayList for storing multiple objects?',
        a: 'Use a plain array when the size is known and fixed (e.g. seating chart). Use ArrayList when items need to be dynamically added or removed. We will explore ArrayList deeply in Phase 15: Collections Framework.'
      },
      {
        q: 'How do I compare two Student objects by GPA?',
        a: 'Implement the `Comparable<Student>` interface and override `compareTo(Student other)` returning `Double.compare(this.gpa, other.gpa)`. This enables `Arrays.sort()` to sort Student arrays by GPA automatically.'
      },
      {
        q: 'What is the difference between `null` and an object with all default field values?',
        a: '`null` means no object exists at all — the reference points to nothing. A default object (`new Student()`) exists in Heap memory with fields set to Java defaults (0, false, null).'
      }
    ],
    recap: [
      'Classes bundle private state (fields) and public behavior (methods) into cohesive units.',
      'Static auto-generated IDs (e.g. `"STU-" + ++counter`) reliably produce unique identifiers per object.',
      'Enums provide type-safe status codes preventing typo-based bugs.',
      '`toString()` override enables objects to print meaningful information in logs and console.',
      'All 4 pillars of OOP (Encapsulation, Abstraction, Inheritance, Polymorphism) build upon these fundamentals.'
    ]
  }
];

const outputFile = path.join(__dirname, 'java_phase9_data.js');
const exportContent = 'module.exports = ' + JSON.stringify(phase9Data, null, 2) + ';\n';
fs.writeFileSync(outputFile, exportContent, 'utf8');
console.log('✅ Successfully wrote scratch/java_phase9_data.js via JSON serialization!');
