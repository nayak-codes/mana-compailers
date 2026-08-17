// Phase 2: Variables & Data Types (Chapters 6 to 9)
// Exhaustive conceptual theory, memory model diagrams, stack vs heap, type casting, and runnable code examples.

module.exports = [
  // ==========================================
  // CHAPTER 6: Java Variables, Declaration & Memory Model
  // ==========================================
  {
    num: 6,
    phaseId: 'phase2',
    phaseTitle: 'Phase 2: Variables & Data Types',
    slug: '06-java-variables-declaration-and-memory-model',
    title: 'Java Variables, Declaration & Memory Allocation',
    badge: '6. Variables & Memory',
    subtopics: 'What is a Variable? · Declaration vs Initialization vs Assignment · Strong Static Typing · JVM Stack vs Heap Memory Model',
    readTime: '15 min read',
    intro: 'Mastering the fundamental memory mechanics of Java: understanding variables as named RAM addresses, the difference between declaration and initialization, Java\'s strict compile-time static type system, and the dual Stack vs Heap memory allocation architecture.',
    theorySections: [
      {
        heading: '1. What is a Variable? (Memory Concept)',
        content: `A **Variable** in Java is a named container (or reserved memory location) in computer RAM used to store data values during program execution.

When you declare a variable in Java, the JVM allocates a specific number of bytes in memory based on the variable's **Data Type**, and associates your variable identifier with that physical memory address.

### The 3 Stages of Variable Lifecycle:
1. **Declaration:** Informs the compiler about the variable's name and data type, reserving memory space. No value is stored yet.
   \`\`\`java
   int accountBalance; // Declaration: 4 bytes allocated on stack
   \`\`\`
2. **Initialization:** Assigning a value to a variable for the very first time.
   \`\`\`java
   accountBalance = 50000; // Initialization
   \`\`\`
3. **Combined Declaration & Initialization:** Best practice in modern Java.
   \`\`\`java
   int accountBalance = 50000; // Combined
   \`\`\`
4. **Re-assignment / Mutation:** Overwriting the stored memory with a new value.
   \`\`\`java
   accountBalance = 75000; // Re-assigned
   \`\`\``
      },
      {
        heading: '2. Strong Static Typing in Java',
        content: `Java is a **Statically-Typed and Strongly-Typed** language:
- **Statically-Typed:** Every variable's data type must be explicitly defined at compile-time and cannot change during runtime. You cannot assign a text String to an \`int\` variable.
- **Strongly-Typed:** The Java compiler strictly enforces type safety, forbidding implicit operations that could cause unpredictable memory corruption.

\`\`\`java
int userAge = 25;       // Valid
// userAge = "Twenty-Five"; // COMPILE ERROR: incompatible types: String cannot be converted to int
\`\`\`

### Why Static Typing is an Enterprise Superpower:
1. **Zero Runtime Type Crashes:** Bugs like \`TypeError: undefined is not a function\` are caught at compile-time before code is ever deployed.
2. **Extreme IDE Autocompletion:** IDEs (IntelliJ, VS Code) know every field and method available on every variable instantly.
3. **Optimized Machine Code:** Because the JVM knows exact byte sizes in advance, it can allocate memory and cache registers with maximum hardware efficiency.`
      },
      {
        heading: '3. The JVM Memory Model: Stack vs Heap Memory',
        content: `Understanding where your variables live in RAM is critical for mastering Java performance and preventing memory leaks:

\`\`\`
+-----------------------------------------------------------------------------------+
|                        JVM STACK MEMORY vs HEAP MEMORY                            |
+-----------------------------------------------------------------------------------+
|  STACK MEMORY (Thread-Specific, Fast, LIFO)                                       |
|  +-----------------------------------------------------------------------------+  |
|  |  main() Stack Frame:                                                        |  |
|  |    int age = 21;                 (Direct 4-byte primitive value in stack)   |  |
|  |    double salary = 85000.50;     (Direct 8-byte primitive value in stack)   |  |
|  |    boolean isStudent = true;     (Direct primitive boolean in stack)        |  |
|  |    String name = 0x4F2A; --------+ (Memory pointer/reference address)       |  |
|  |    int[] scores = 0x8B1C; -------|---+ (Array pointer/reference address)    |  |
|  +----------------------------------|---|--------------------------------------+  |
+-------------------------------------|---|-----------------------------------------+
|  HEAP MEMORY (Shared, Managed by Garbage Collector)                               |
|  +----------------------------------|---|--------------------------------------+  |
|  |  Address: 0x4F2A                 v   |                                      |  |
|  |  [ String Object: "Balaji" ] <-------+                                      |  |
|  |                                                                             |  |
|  |  Address: 0x8B1C                     v                                      |  |
|  |  [ Array Object: { 85, 90, 78, 92 } ]<-------------------------------------+  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
\`\`\`

- **Stack Memory:** Stores primitive data values (\`int\`, \`double\`, \`char\`, \`boolean\`) and reference addresses (pointers). Allocations and deallocations are instantaneous when method frames open and close.
- **Heap Memory:** Stores all actual complex Objects, Instances, and Arrays. Objects remain in heap memory until the Garbage Collector detects that no active stack reference points to them.`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // Variable Declarations & Initializations
        String name = "Ravi";
        int age = 21;
        double height = 5.8;
        char grade = 'A';
        boolean isStudent = true;

        // Displaying Variable Values
        System.out.println("Name       : " + name);
        System.out.println("Age        : " + age);
        System.out.println("Height     : " + height);
        System.out.println("Grade      : " + grade);
        System.out.println("Is Student : " + isStudent);
    }
}`,
    output: `Name       : Ravi
Age        : 21
Height     : 5.8
Grade      : A
Is Student : true`,
    lineByLine: [
      { line: 'String name = "Ravi";', explanation: 'Reference data type: Allocates a String object in the String Constant Pool (Heap) and stores its memory reference in "name" on the Stack.' },
      { line: 'int age = 21;', explanation: 'Primitive integer type: Reserves 4 bytes (32 bits) directly on the thread Stack storing the whole number 21.' },
      { line: 'double height = 5.8;', explanation: 'Primitive floating-point type: Reserves 8 bytes (64 bits) on the Stack for double-precision decimal 5.8.' },
      { line: 'char grade = \'A\';', explanation: 'Primitive character type: Stores 2 bytes (16-bit Unicode UTF-16) for the single character \'A\' (Unicode 65).' },
      { line: 'boolean isStudent = true;', explanation: 'Primitive truth-value type: Stores true or false directly on the Stack.' }
    ],
    practicalExample: `public class BankBalanceTracker {
    public static void main(String[] args) {
        String accountHolder = "Priya Sharma";
        long accountNumber   = 987654321012L;
        double balance       = 15000.00;

        System.out.println("Initial Balance for " + accountHolder + ": ₹" + balance);

        // Depositing funds
        double depositAmount = 5000.00;
        balance = balance + depositAmount;
        System.out.println("Deposited: ₹" + depositAmount + " | New Balance: ₹" + balance);

        // Withdrawing funds
        double withdrawalAmount = 3500.00;
        balance = balance - withdrawalAmount;
        System.out.println("Withdrawn: ₹" + withdrawalAmount + " | Final Balance: ₹" + balance);
    }
}`,
    practicalOutput: `Initial Balance for Priya Sharma: ₹15000.0
Deposited: ₹5000.0 | New Balance: ₹20000.0
Withdrawn: ₹3500.0 | Final Balance: ₹16500.0`,
    commonMistakes: [
      'Using uninitialized local variables: In Java, local variables inside methods have NO default values. Using "int x; System.out.println(x);" causes compile error: "variable x might not have been initialized".',
      'Assigning mismatched types without casting: "int x = 5.8;" fails compilation. You must use explicit casting "(int) 5.8" or declare as "double".',
      'Confusing char quotes with String quotes: Single quotes \'A\' are for char; double quotes "A" are for String objects.'
    ],
    challenge: `// Coding Challenge:
// Declare variables representing a smartphone product:
// 1. brand (String) = "Samsung"
// 2. ramGB (int) = 12
// 3. price (double) = 74999.99
// 4. inStock (boolean) = true
// 5. rating (char) = '5'
// Output a clean formatted product specs card.

public class Main {
    public static void main(String[] args) {
        // TODO: Declare and print the 5 smartphone variables
        
    }
}`,
    faq: [
      {
        q: 'Why are local variables stored in the Stack instead of the Heap?',
        a: 'Stack allocation is extremely fast and follows strict LIFO (Last-In, First-Out) ordering. When a method finishes, its entire stack frame is automatically freed in one CPU clock instruction without needing Garbage Collector overhead.'
      },
      {
        q: 'What is the default value of instance variables in Java?',
        a: 'Unlike local variables, instance variables (class fields) get automatic default values: numeric types get 0 / 0.0, boolean gets false, char gets \'\\u0000\' (null char), and object references get null.'
      },
      {
        q: 'Can variable names start with an underscore in Java?',
        a: 'Yes, variable names can start with letters, underscores (_), or dollar signs ($), but by convention, always start with lowercase letters in camelCase (e.g. userAge).'
      }
    ],
    recap: [
      'Variables are named memory allocations in RAM classified by data types.',
      'Java is statically-typed: variable data types are fixed at compile-time.',
      'Stack memory stores primitive values and object references; Heap memory stores actual objects and arrays.',
      'Local variables must be explicitly initialized before use.'
    ]
  },

  // ==========================================
  // CHAPTER 7: 8 Primitive Data Types & Literals
  // ==========================================
  {
    num: 7,
    phaseId: 'phase2',
    phaseTitle: 'Phase 2: Variables & Data Types',
    slug: '07-java-primitive-data-types-and-literals',
    title: 'Java 8 Primitive Data Types & Literals',
    badge: '7. Primitive Data Types',
    subtopics: 'byte, short, int, long · float, double · char (Unicode UTF-16) · boolean · Memory Sizes & Bit Ranges · Numeric Underscores & Literals',
    readTime: '16 min read',
    intro: 'Deep dive into the 8 primitive data types of Java: exact byte sizes, minimum/maximum mathematical ranges, IEEE 754 floating-point standards, 16-bit Unicode characters, boolean logic, and modern numeric literal formatting (binary, hex, and numeric underscores).',
    theorySections: [
      {
        heading: '1. The 8 Primitive Data Types Complete Table',
        content: `Java has exactly **8 Primitive Data Types** built directly into the language syntax for maximum hardware performance:

| Data Type | Category | Size (Bytes) | Size (Bits) | Minimum Value | Maximum Value | Default Value | Example Literal |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **\`byte\`** | Integer | 1 byte | 8 bits | \`-128\` ($-2^7$) | \`127\` ($2^7 - 1$) | \`0\` | \`byte b = 100;\` |
| **\`short\`** | Integer | 2 bytes | 16 bits | \`-32,768\` ($-2^{15}$) | \`32,767\` ($2^{15} - 1$) | \`0\` | \`short s = 25000;\` |
| **\`int\`** | Integer | 4 bytes | 32 bits | \`-2,147,483,648\` ($-2^{31}$) | \`2,147,483,647\` ($2^{31} - 1$) | \`0\` | \`int i = 500000;\` |
| **\`long\`** | Integer | 8 bytes | 64 bits | \`-9,223,372,036,854,775,808\` ($-2^{63}$) | \`9,223,372,036,854,775,807\` ($2^{63} - 1$) | \`0L\` | \`long l = 9876543210L;\` |
| **\`float\`** | Floating Point | 4 bytes | 32 bits | $\\approx 1.4 \\times 10^{-45}$ | $\\approx 3.4028235 \\times 10^{38}$ (6-7 decimal digits precision) | \`0.0f\` | \`float f = 3.14159f;\` |
| **\`double\`** | Floating Point | 8 bytes | 64 bits | $\\approx 4.9 \\times 10^{-324}$ | $\\approx 1.7976931 \\times 10^{308}$ (15-16 decimal digits precision) | \`0.0d\` | \`double d = 3.1415926535;\` |
| **\`char\`** | Character | 2 bytes | 16 bits | \`'\\u0000'\` (0) | \`'\\uffff'\` (65,535 unsigned Unicode UTF-16) | \`'\\u0000'\` | \`char c = 'A';\` |
| **\`boolean\`** | Truth Value | 1 bit (JVM dependent) | 1 bit | \`false\` | \`true\` | \`false\` | \`boolean flag = true;\` |`
      },
      {
        heading: '2. Integer Types: Why `int` is Default & The `long` \'L\' Suffix',
        content: `In Java, every whole integer literal (e.g. \`100\`, \`5000\`) is treated by default as a 32-bit \`int\`.

If a number exceeds the maximum 32-bit limit (\`2,147,483,647\`), you **must append an uppercase \`L\` or lowercase \`l\` suffix** (always use uppercase \`L\` to avoid confusing \`l\` with the digit \`1\`):

\`\`\`java
int standardNumber = 2000000;
long worldPopulation = 8000000000L; // Mandatory 'L' suffix
\`\`\``
      },
      {
        heading: '3. Floating-Point: `float` (\'F\' Suffix) vs `double` (Default)',
        content: `In Java, every fractional decimal literal (e.g. \`3.14\`, \`99.99\`) is treated by default as a 64-bit \`double\` (IEEE 754 standard).

If you want to store a decimal in a 32-bit \`float\` to conserve memory in graphics/game engines, you **must append an \`F\` or \`f\` suffix**:

\`\`\`java
double exactGpa = 3.95;    // 64-bit standard default
float screenCoord = 120.5f; // Mandatory 'f' suffix
\`\`\``
      },
      {
        heading: '4. `char` and Unicode UTF-16 Support',
        content: `Unlike C/C++ where \`char\` is only 1 byte (ASCII only, 0-127), Java's \`char\` is **2 bytes (16-bit unsigned Unicode)**. This allows Java to represent characters from every human language (English, Telugu, Hindi, Chinese, Arabic) and international symbols natively!

\`\`\`java
char englishChar = 'A';
char unicodeChar = '\\u0C05'; // Telugu letter 'అ'
char copyright   = '\\u00A9'; // © Symbol
char asciiCode   = 65;       // Storing numeric ASCII 65 yields 'A'
\`\`\``
      },
      {
        heading: '5. Modern Java Literals: Underscores, Binary, and Hexadecimal',
        content: `Java 7+ introduced expressive literal formats to improve code readability:

1. **Underscores in Numbers:** Group large numbers visually (the compiler strips underscores automatically):
   \`\`\`java
   long creditCardNumber = 4123_5678_9012_3456L;
   int oneMillion = 1_000_000;
   double nationalBudget = 4_500_000.75;
   \`\`\`
2. **Binary Literals (\`0b\` prefix):**
   \`\`\`java
   int binaryByte = 0b1010_1100; // Decimal: 172
   \`\`\`
3. **Hexadecimal Literals (\`0x\` prefix):**
   \`\`\`java
   int hexColor = 0xFF_57_33; // RGB Hex Color
   \`\`\``
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // 1. Integer Types
        byte  serverPortSmall = 80;
        short companyOffices  = 1250;
        int   cityPopulation  = 2_500_000; // Underscore for readability
        long  globalDataBytes = 9_876_543_210_000L; // 'L' suffix

        // 2. Floating-Point Types
        float  fuelLevelPercent = 87.5f; // 'f' suffix
        double precisePI        = 3.141592653589793;

        // 3. Character & Unicode
        char letterAlpha = 'J';
        char teluguVowel = '\\u0C05'; // Telugu 'అ'
        char symbolRupee = '₹';

        // 4. Boolean
        boolean isServerOnline = true;

        // Output all primitives
        System.out.println("--- Java 8 Primitive Types Demonstration ---");
        System.out.println("byte    (8-bit)  : " + serverPortSmall);
        System.out.println("short   (16-bit) : " + companyOffices);
        System.out.println("int     (32-bit) : " + cityPopulation);
        System.out.println("long    (64-bit) : " + globalDataBytes);
        System.out.println("float   (32-bit) : " + fuelLevelPercent + "%");
        System.out.println("double  (64-bit) : " + precisePI);
        System.out.println("char    (Unicode): " + letterAlpha + " | " + teluguVowel + " | " + symbolRupee);
        System.out.println("boolean (Truth)  : " + isServerOnline);
    }
}`,
    output: `--- Java 8 Primitive Types Demonstration ---
byte    (8-bit)  : 80
short   (16-bit) : 1250
int     (32-bit) : 2500000
long    (64-bit) : 9876543210000
float   (32-bit) : 87.5%
double  (64-bit) : 3.141592653589793
char    (Unicode): J | అ | ₹
boolean (Truth)  : true`,
    lineByLine: [
      { line: 'int cityPopulation = 2_500_000;', explanation: 'Underscores enhance readability for large numeric literals without affecting compiled value.' },
      { line: 'long globalDataBytes = 9_876_543_210_000L;', explanation: 'The L suffix forces the compiler to treat this 64-bit literal as long instead of 32-bit int.' },
      { line: 'float fuelLevelPercent = 87.5f;', explanation: 'The f suffix prevents compile error by explicitly designating a 32-bit single-precision float.' },
      { line: 'char teluguVowel = \'\\u0C05\';', explanation: '2-byte Unicode escape sequence representing the Telugu alphabet vowel character \'అ\'.' }
    ],
    practicalExample: `public class ScientificDataDemo {
    public static void main(String[] args) {
        // Querying Primitive Type Limits using Built-in Wrapper Constants
        System.out.println("=== Primitive Type Maximum & Minimum Bounds ===");
        System.out.println("Byte Range   : " + Byte.MIN_VALUE + " to " + Byte.MAX_VALUE);
        System.out.println("Short Range  : " + Short.MIN_VALUE + " to " + Short.MAX_VALUE);
        System.out.println("Integer Range: " + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);
        System.out.println("Long Range   : " + Long.MIN_VALUE + " to " + Long.MAX_VALUE);
        System.out.println("Float Min/Max: " + Float.MIN_VALUE + " to " + Float.MAX_VALUE);
        System.out.println("Double Bounds: " + Double.MIN_VALUE + " to " + Double.MAX_VALUE);
    }
}`,
    practicalOutput: `=== Primitive Type Maximum & Minimum Bounds ===
Byte Range   : -128 to 127
Short Range  : -32768 to 32767
Integer Range: -2147483648 to 2147483647
Long Range   : -9223372036854775808 to 9223372036854775807
Float Min/Max: 1.4E-45 to 3.4028235E38
Double Bounds: 4.9E-324 to 1.7976931348623157E308`,
    commonMistakes: [
      'Omitting the \'L\' on large numbers: "long x = 5000000000;" fails with "integer number too large" because the literal is evaluated as int before assignment. Use "5000000000L".',
      'Omitting the \'f\' on float decimals: "float pi = 3.14;" fails compilation with "possible loss of precision". Use "3.14f".',
      'Treating boolean as 1 or 0: In C++, 1 is true and 0 is false. In Java, boolean is strictly true or false. Writing "boolean flag = 1;" fails compilation.'
    ],
    challenge: `// Coding Challenge:
// Write a program that demonstrates all 4 integer types with their exact max limits:
// 1. byte b = Byte.MAX_VALUE;
// 2. short s = Short.MAX_VALUE;
// 3. int i = Integer.MAX_VALUE;
// 4. long l = Long.MAX_VALUE;
// Print their values and calculate the sum (l + i).

public class Main {
    public static void main(String[] args) {
        // TODO: Declare and print the primitive max values
        
    }
}`,
    faq: [
      {
        q: 'Why does Java use 16-bit char instead of 8-bit like C?',
        a: 'Java was designed for global internet applications. 8-bit ASCII can only represent 256 characters (English alphabet and basic punctuation), whereas 16-bit Unicode supports over 65,000 international characters natively.'
      },
      {
        q: 'Should I use float or double for monetary transactions?',
        a: 'Neither! Floating point types (float/double) suffer from binary rounding inaccuracies (e.g. 0.1 + 0.2 != 0.3). Always use "java.math.BigDecimal" for financial, banking, and e-commerce calculations.'
      },
      {
        q: 'Can underscores be placed at the start or end of a number?',
        a: 'No! Underscores can only be placed between digits (e.g. 1_000). Writing "_100" or "100_" causes a compile-time syntax error.'
      }
    ],
    recap: [
      'Java provides 8 primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B), and boolean.',
      'Integer literals default to int (use \'L\' for long); decimal literals default to double (use \'f\' for float).',
      'char uses 2-byte Unicode UTF-16 in single quotes (\'A\').',
      'Use underscores (e.g. 1_000_000) for clean numeric readability.'
    ]
  },

  // ==========================================
  // CHAPTER 8: Reference Types, Strings & Scopes
  // ==========================================
  {
    num: 8,
    phaseId: 'phase2',
    phaseTitle: 'Phase 2: Variables & Data Types',
    slug: '08-java-reference-types-strings-and-scopes',
    title: 'Reference Types, Strings, Constants & Variable Scopes',
    badge: '8. Reference Types & Scopes',
    subtopics: 'Primitive vs Reference Types · String Immutability & Pool · final Constants · Variable Scopes: Local, Instance & Static',
    readTime: '16 min read',
    intro: 'Exploring Java reference types, the internal mechanics of the String pool and immutability, immutable constants with the final keyword, and the three fundamental variable scopes: Local variables, Instance fields, and Static class-level variables.',
    theorySections: [
      {
        heading: '1. Primitive Data Types vs Reference Data Types',
        content: `In Java, all data types fall into two fundamental architectural categories:

| Feature | Primitive Types (\`int\`, \`double\`, etc.) | Reference Types (\`String\`, \`Arrays\`, \`Classes\`) |
| :--- | :--- | :--- |
| **Storage Location** | Value is stored directly in **Stack Memory**. | Reference address (pointer) in **Stack**, actual object in **Heap**. |
| **Memory Size** | Fixed predefined byte size (1, 2, 4, or 8 bytes). | Variable size depending on object members and payload. |
| **Default Value** | Numerical \`0\`, \`false\`, or \`'\\u0000'\` (for fields). | \`null\` (meaning pointer points to nowhere). |
| **Method Calls** | Cannot call methods (no \`.\` operator). | Can invoke member methods (e.g. \`name.toUpperCase()\`). |
| **Comparison** | \`==\` compares direct binary mathematical values. | \`==\` compares memory addresses; \`.equals()\` compares actual content! |`
      },
      {
        heading: '2. Introduction to \`String\` & The String Literal Pool',
        content: `A **\`String\`** in Java is a reference object representing a sequence of characters.

Unlike C strings (null-terminated char arrays), Java Strings are **Immutable**: once created, their internal character contents can never be modified. Any method that appears to modify a String (like \`.toUpperCase()\` or \`.replace()\`) actually instantiates and returns a brand-new String object in Heap memory!

### The String Constant Pool (SCP):
To save memory, the JVM maintains a special cache area inside Heap memory called the **String Pool**:
- When you write \`String s1 = "Java";\`, the JVM checks the String Pool. If \`"Java"\` exists, it reuses the existing memory address!
- When you write \`String s2 = "Java";\`, \`s1\` and \`s2\` point to the exact same object in memory (\`s1 == s2\` evaluates to \`true\`).
- If you use \`new String("Java")\`, it bypasses the pool and forces the creation of a separate object in normal heap memory.`
      },
      {
        heading: '3. Constants in Java using the \`final\` Keyword',
        content: `To create an unchangeable **Constant** in Java, use the **\`final\`** keyword.

Once a \`final\` variable is initialized, its value is locked and cannot be re-assigned:

\`\`\`java
public static final double PI = 3.141592653589793;
public static final int MAX_LOGIN_ATTEMPTS = 5;
\`\`\`

### Industry Best Practices for Constants:
1. Combine with \`static\` (\`public static final\`) so the constant is shared once across all instances without wasting heap memory.
2. Format the identifier name in **\`UPPER_SNAKE_CASE\`**.`
      },
      {
        heading: '4. The 3 Variable Scopes in Java',
        content: `A variable's **Scope** determines where in the program it is accessible and how long it lives in memory:

\`\`\`
+-----------------------------------------------------------------------------------+
|                           JAVA VARIABLE SCOPES                                    |
+-----------------------------------------------------------------------------------+
|  class BankAccount {                                                              |
|                                                                                   |
|    // 1. STATIC VARIABLE (Class Scope - 1 copy shared by ALL instances)          |
|    public static String bankName = "State Bank of India";                        |
|                                                                                   |
|    // 2. INSTANCE VARIABLE (Object Scope - Unique copy per object in Heap)        |
|    private double balance = 1000.00;                                             |
|                                                                                   |
|    public void deposit(double amount) {                                           |
|      // 3. LOCAL VARIABLE (Block/Method Scope - Exists ONLY during method run)    |
|      double fee = 10.0;                                                           |
|      balance = balance + (amount - fee);                                          |
|    }                                                                              |
|  }                                                                                |
+-----------------------------------------------------------------------------------+
\`\`\`

1. **Local Variables:** Declared inside a method, constructor, or code block \`{}\`. They exist only while that block is executing and are destroyed when the block finishes. They have **no default values**.
2. **Instance Variables (Fields):** Declared inside a class but outside methods. Each object created from the class gets its own independent copy stored in Heap memory.
3. **Static Variables (Class Variables):** Declared with the \`static\` keyword. Only **one single copy** exists in the Method Area, shared across all instances of the class.`
      }
    ],
    codeExample: `public class Main {
    
    // 1. Static Variable (Class-level scope, shared by everyone)
    public static final String UNIVERSITY_NAME = "Osmania University";
    public static int totalEnrolledStudents    = 0;

    // 2. Instance Variables (Object-level scope in Heap)
    private String studentName;
    private double gpa;

    // Constructor to initialize instance variables
    public Main(String name, double gpa) {
        this.studentName = name;
        this.gpa = gpa;
        totalEnrolledStudents++; // Increment shared class counter
    }

    public void displayStudent() {
        // 3. Local Variable (Method-level scope in Stack)
        String status = (this.gpa >= 3.5) ? "Distinction" : "Standard Pass";

        System.out.println("University : " + UNIVERSITY_NAME);
        System.out.println("Student    : " + this.studentName);
        System.out.println("GPA        : " + this.gpa + " (" + status + ")");
        System.out.println("----------------------------------------");
    }

    public static void main(String[] args) {
        // Creating student object instances
        Main s1 = new Main("Balaji Nayak", 3.9);
        Main s2 = new Main("Ravi Teja", 3.2);

        s1.displayStudent();
        s2.displayStudent();

        System.out.println("Total Students Enrolled: " + Main.totalEnrolledStudents);
    }
}`,
    output: `University : Osmania University
Student    : Balaji Nayak
GPA        : 3.9 (Distinction)
----------------------------------------
University : Osmania University
Student    : Ravi Teja
GPA        : 3.2 (Standard Pass)
----------------------------------------
Total Students Enrolled: 2`,
    lineByLine: [
      { line: 'public static final String UNIVERSITY_NAME', explanation: 'Constant class-level variable accessible across all instances without object instantiation.' },
      { line: 'public static int totalEnrolledStudents = 0;', explanation: 'Shared static variable that tracks the global count of created student instances.' },
      { line: 'private String studentName; private double gpa;', explanation: 'Instance fields stored inside individual object heap memory allocations.' },
      { line: 'String status = ...', explanation: 'Local variable created inside displayStudent() stack frame, destroyed when method returns.' }
    ],
    practicalExample: `public class StringPoolInspection {
    public static void main(String[] args) {
        // String Literals (Stored in String Constant Pool)
        String str1 = "Java2026";
        String str2 = "Java2026";

        // String Object using 'new' (Forces separate Heap allocation)
        String str3 = new String("Java2026");

        System.out.println("=== String Pool Memory Comparison ===");
        // == compares memory reference pointers
        System.out.println("str1 == str2 (Pool Memory Reference): " + (str1 == str2)); // true!
        System.out.println("str1 == str3 (Heap Object Reference): " + (str1 == str3)); // false!

        // .equals() compares actual character content
        System.out.println("str1.equals(str3) (Content Check)   : " + str1.equals(str3)); // true!
    }
}`,
    practicalOutput: `=== String Pool Memory Comparison ===
str1 == str2 (Pool Memory Reference): true
str1 == str3 (Heap Object Reference): false
str1.equals(str3) (Content Check)   : true`,
    commonMistakes: [
      'Using == to compare String values: "name == \"Ravi\"" checks memory addresses, not character text. Always use "name.equals(\"Ravi\")" or "name.equalsIgnoreCase(\"Ravi\")".',
      'Attempting to reassign final variables: "final int x = 10; x = 20;" causes compile error: "cannot assign a value to final variable x".',
      'Accessing instance variables from static methods: Writing "studentName = \"Ravi\";" inside "public static void main" fails with "non-static variable cannot be referenced from a static context".'
    ],
    challenge: `// Coding Challenge:
// Create a class ConfigSettings containing:
// 1. public static final String ENVIRONMENT = "PRODUCTION";
// 2. public static final int MAX_CONNECTIONS = 100;
// 3. Inside main(), verify that attempting to reassign MAX_CONNECTIONS throws a compiler error.

public class Main {
    public static void main(String[] args) {
        // TODO: Print the constants from ConfigSettings
        
    }
}`,
    faq: [
      {
        q: 'Why are Strings immutable in Java?',
        a: '1. Security: Strings are used for database URLs, passwords, and network sockets; immutability prevents unauthorized modification. 2. Thread Safety: Immutable objects are naturally thread-safe without locks. 3. String Pooling: Sharing strings in memory is only safe if characters cannot change.'
      },
      {
        q: 'What is the difference between static and final?',
        a: '"static" means only one shared copy exists per class rather than one per object. "final" means the value/reference cannot be reassigned once initialized.'
      },
      {
        q: 'Can a final variable be initialized in a constructor?',
        a: 'Yes! A "blank final" instance variable can be assigned once inside the class constructor.'
      }
    ],
    recap: [
      'Primitive types store raw values on the Stack; Reference types store heap memory pointers on the Stack.',
      'Strings are immutable objects cached in the String Constant Pool. Always compare strings with .equals().',
      'The final keyword creates immutable constants formatted in UPPER_SNAKE_CASE.',
      'Variable scopes: Local (method stack), Instance (object heap), and Static (class method area).'
    ]
  },

  // ==========================================
  // CHAPTER 9: Type Casting & var Keyword
  // ==========================================
  {
    num: 9,
    phaseId: 'phase2',
    phaseTitle: 'Phase 2: Variables & Data Types',
    slug: '09-java-type-casting-and-var-inference',
    title: 'Java Type Casting (Widening/Narrowing) & var Keyword',
    badge: '9. Type Casting & var',
    subtopics: 'Widening Casting (Implicit) · Narrowing Casting (Explicit) · Data Loss & Overflow · ASCII char/int Conversions · var Keyword (Local Variable Type Inference)',
    readTime: '15 min read',
    intro: 'Comprehensive masterclass on Java type conversion: widening automatic casting, narrowing explicit casting, truncation and overflow risks, character-to-integer Unicode conversions, and local variable type inference with the modern var keyword (Java 10+).',
    theorySections: [
      {
        heading: '1. What is Type Casting in Java?',
        content: `**Type Casting** is the process of converting a value of one primitive data type into another data type.

In Java, type casting is divided into two primary categories:

\`\`\`
+-----------------------------------------------------------------------------------+
|                        JAVA TYPE CASTING HIERARCHY                                |
+-----------------------------------------------------------------------------------+
|  1. WIDENING CASTING (Implicit / Automatic - Safe, No Data Loss)                  |
|     byte -> short -> char -> int -> long -> float -> double                       |
|     (Smaller memory size converted automatically to larger memory container)      |
+-----------------------------------------------------------------------------------+
|  2. NARROWING CASTING (Explicit / Manual - Dangerous, Potential Data Loss)        |
|     double -> float -> long -> int -> char -> short -> byte                       |
|     (Larger memory size forced into smaller memory container with (type) syntax)  |
+-----------------------------------------------------------------------------------+
\`\`\``
      },
      {
        heading: '2. Widening Casting (Implicit / Automatic)',
        content: `Widening casting happens automatically when passing a smaller data type to a larger data type container. Because the destination container has more bits than the source, **no data loss occurs**:

\`\`\`java
int smallNumber = 100;
double largeNumber = smallNumber; // Automatic Widening: int (4 bytes) -> double (8 bytes)

System.out.println(smallNumber); // 100
System.out.println(largeNumber); // 100.0
\`\`\``
      },
      {
        heading: '3. Narrowing Casting (Explicit / Manual) & Overflow Risks',
        content: `Narrowing casting must be done manually by placing the target type in parentheses \`(targetType)\` before the value.

Because you are cramming a larger number of bits into a smaller memory container, **precision loss (truncation of decimals) or arithmetic integer overflow** can occur:

\`\`\`java
// Decimal Truncation:
double itemPrice = 99.95;
int truncatedPrice = (int) itemPrice; // Fractional decimals (.95) discarded! Evaluates to 99

// Byte Overflow (Wrap-around):
int largeInt = 130;
byte overflowByte = (byte) largeInt; // Max byte is 127! Wraps around to -126!
\`\`\``
      },
      {
        heading: '4. Char to Int & Int to Char (Unicode Code Points)',
        content: `Because \`char\` is an unsigned 16-bit numeric type under the hood, you can freely cast between characters and their integer ASCII/Unicode values:

\`\`\`java
char letter = 'A';
int asciiValue = (int) letter; // Evaluates to 65

int charCode = 66;
char convertedChar = (char) charCode; // Evaluates to 'B'
\`\`\``
      },
      {
        heading: '5. Modern Java: Local Variable Type Inference with \`var\`',
        content: `Starting in **Java 10**, Java introduced the **\`var\`** keyword for **Local Variable Type Inference**.

With \`var\`, the compiler automatically detects the variable's type from the right-hand initialization expression:

\`\`\`java
var age = 25;                       // Inferred as int
var price = 99.99;                  // Inferred as double
var greeting = "Hello, Java 21!";   // Inferred as String
var active = true;                  // Inferred as boolean
var usersList = new ArrayList<String>(); // Inferred as ArrayList<String>
\`\`\`

### Crucial Rules for Using \`var\`:
1. **Still Statically Typed:** \`var\` does NOT make Java dynamically typed like Python/JavaScript. Once inferred, the type is fixed!
   \`\`\`java
   var count = 10;
   // count = "ten"; // COMPILE ERROR: incompatible types!
   \`\`\`
2. **Local Variables Only:** \`var\` can ONLY be used inside method bodies. It CANNOT be used for class fields, method parameters, or return types.
3. **Mandatory Initialization:** \`var x;\` is illegal because the compiler cannot infer an uninitialized variable.`
      }
    ],
    codeExample: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        // 1. Widening Casting (Implicit)
        int salaryInt = 50000;
        double salaryDouble = salaryInt; // int -> double
        System.out.println("Widening Casting (int -> double): " + salaryDouble);

        // 2. Narrowing Casting (Explicit Truncation)
        double marketRate = 1845.75;
        int roundedRate = (int) marketRate; // Discards .75
        System.out.println("Narrowing Casting (double -> int): " + roundedRate + " (Decimals discarded)");

        // 3. Char to ASCII conversion
        char symbol = 'Z';
        int asciiCode = (int) symbol;
        System.out.println("Character '" + symbol + "' has ASCII code: " + asciiCode);

        // 4. Local Variable Type Inference with 'var' (Java 10+)
        var transactionId = 987654321L;     // Inferred as long
        var accountHolder = "Anita Desai";  // Inferred as String
        var isVerified    = true;           // Inferred as boolean

        System.out.println("\n--- Modern Java 'var' Inferred Types ---");
        System.out.println("Transaction ID : " + transactionId + " (Type: " + ((Object)transactionId).getClass().getSimpleName() + ")");
        System.out.println("Account Holder : " + accountHolder + " (Type: " + accountHolder.getClass().getSimpleName() + ")");
        System.out.println("Verified Status: " + isVerified);
    }
}`,
    output: `Widening Casting (int -> double): 50000.0
Narrowing Casting (double -> int): 1845 (Decimals discarded)
Character 'Z' has ASCII code: 90

--- Modern Java 'var' Inferred Types ---
Transaction ID : 987654321 (Type: Long)
Account Holder : Anita Desai (Type: String)
Verified Status: true`,
    lineByLine: [
      { line: 'double salaryDouble = salaryInt;', explanation: 'Implicit widening casting: converts 32-bit integer 50000 into 64-bit float 50000.0 with zero precision loss.' },
      { line: 'int roundedRate = (int) marketRate;', explanation: 'Explicit narrowing cast: truncates decimal fraction .75, keeping integer portion 1845.' },
      { line: 'int asciiCode = (int) symbol;', explanation: 'Converts Unicode character \'Z\' to its decimal integer code point (90).' },
      { line: 'var transactionId = 987654321L;', explanation: 'Java 10+ local variable type inference: compiler infers type as long at compile-time.' }
    ],
    practicalExample: `public class ByteOverflowInspector {
    public static void main(String[] args) {
        System.out.println("=== Demonstrating Byte Overflow in Narrowing Cast ===");
        
        int originalValue = 130;
        // Maximum byte value is 127
        byte castedByte = (byte) originalValue;

        System.out.println("Original int value : " + originalValue);
        System.out.println("Casted byte value   : " + castedByte + " (Binary wrap-around!)");

        // Explanation of binary wrap-around
        // 130 in binary (32-bit): 00000000 00000000 00000000 10000010
        // Lower 8-bits:          10000010 (In Two's Complement signed byte, MSB 1 means negative: -126)
    }
}`,
    practicalOutput: `=== Demonstrating Byte Overflow in Narrowing Cast ===
Original int value : 130
Casted byte value   : -126 (Binary wrap-around!)`,
    commonMistakes: [
      'Using var without immediate initialization: Writing "var x;" causes compile error: "cannot infer type for local variable x (cannot use \'var\' on variable without initializer)".',
      'Using var as a class field: Writing "class User { var age = 20; }" is illegal. var is permitted only for local variables inside methods.',
      'Assuming cast rounds to nearest integer: (int) 9.99 results in 9, NOT 10! Narrowing casting truncates towards zero; it does not perform mathematical rounding. Use Math.round() for rounding.'
    ],
    challenge: `// Coding Challenge:
// Given a total bill of 1450.85:
// 1. Cast it to an int (rupeesOnly)
// 2. Extract the remaining paise as an integer (paiseOnly = (int) Math.round((bill - rupeesOnly) * 100))
// 3. Print: "₹1450 and 85 Paise"

public class Main {
    public static void main(String[] args) {
        double bill = 1450.85;
        // TODO: Perform the casting operations and print formatted bill
        
    }
}`,
    faq: [
      {
        q: 'Does using "var" slow down application runtime execution?',
        a: 'Not at all! "var" is resolved entirely at compile-time by javac. The generated .class Bytecode is 100% identical to explicit type declarations, resulting in zero runtime overhead.'
      },
      {
        q: 'What is the safe way to cast between Object types?',
        a: 'Always check with "instanceof" before casting objects to avoid runtime ClassCastException: "if (obj instanceof String str) { System.out.println(str.length()); }".'
      },
      {
        q: 'Why does integer division truncate decimals before casting?',
        a: 'In "double d = (double) (5 / 2);", the division (5 / 2) executes first as integer math (2), and then 2 is cast to 2.0. To preserve decimals, cast before dividing: "(double) 5 / 2" yields 2.5.'
      }
    ],
    recap: [
      'Widening casting (smaller to larger) is automatic and safe from data loss.',
      'Narrowing casting (larger to smaller) requires explicit (type) syntax and truncates decimals or overflows.',
      'char and int can be converted based on Unicode numeric code points.',
      'var (Java 10+) provides local variable compile-time type inference without sacrificing static type safety.'
    ]
  }
];
