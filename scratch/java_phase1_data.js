// Phase 1: Java Basics (Chapters 1 to 5)
// Exhaustive conceptual theory, ASCII architecture diagrams, line-by-line breakdowns, runnable code boxes, and quizzes.

module.exports = [
  // ==========================================
  // CHAPTER 1: Java Introduction & JVM Architecture
  // ==========================================
  {
    num: 1,
    phaseId: 'phase1',
    phaseTitle: 'Phase 1: Java Basics',
    slug: '01-java-introduction-features-and-jvm-architecture',
    title: 'Java Introduction, Features & JVM Architecture',
    badge: '1. Intro & JVM Architecture',
    subtopics: 'What is Java? · WORA Philosophy · Core Features · Industry Use Cases · JDK vs JRE vs JVM · JVM Internal Architecture',
    readTime: '15 min read',
    intro: 'Comprehensive deep dive into the Java programming language: historical origins by James Gosling, the revolutionary Write Once, Run Anywhere (WORA) paradigm, core language features, real-world enterprise applications, and an exhaustive breakdown of the Java Virtual Machine (JVM) internals.',
    theorySections: [
      {
        heading: '1. What is Java? History & The "WORA" Revolution',
        content: `**Java** is a high-level, class-based, object-oriented, concurrent, and secure programming language originally developed by **James Gosling** and his team at **Sun Microsystems** (later acquired by **Oracle Corporation**) in 1995.

Before Java, programming languages like C and C++ were **platform-dependent**. When you compiled a C program on a Windows Intel x86 machine, it produced a binary machine code executable (\`.exe\`) tailored specifically for that processor and operating system. If you wanted to run that same program on a macOS ARM processor or a Linux server, you had to re-write platform-specific code and re-compile it on each target machine.

Java revolutionized the software industry by introducing the philosophy of **"Write Once, Run Anywhere" (WORA)**.

### The WORA Secret: Bytecode & Virtual Machine
Instead of compiling source code directly into CPU-specific native machine instructions, the Java compiler (\`javac\`) translates human-readable \`.java\` source code into an intermediate, architecture-neutral format called **Bytecode** (stored in \`.class\` files).

The Bytecode is not understood directly by physical CPU hardware; instead, it is executed by a software-based execution environment called the **Java Virtual Machine (JVM)**. Every operating system (Windows, macOS, Linux, Solaris) has its own customized JVM implementation. Because the JVM translates universal Bytecode into native machine instructions on the fly, any Java program compiled on one computer can run unmodified on any device that has a JVM installed!`
      },
      {
        heading: '2. Core Features of Java',
        content: `Java's enduring dominance across enterprise software, banking, and mobile systems for over three decades is driven by its foundational design pillars:

| Java Feature | What It Means | Why It Matters |
| :--- | :--- | :--- |
| **Simple & Familiar** | Java eliminated complex, error-prone C++ features like explicit pointer arithmetic, manual memory deallocation, and multiple class inheritance. | Drastically reduces software bugs, memory leaks, and onboarding time for developers. |
| **Object-Oriented (OOP)** | Almost everything in Java revolves around Classes and Objects, enforcing modularity, encapsulation, inheritance, and polymorphism. | Enables clean code organization, maintainability, and reusability in massive enterprise codebases. |
| **Platform Independent** | Java source code compiles to intermediate Bytecode executed by the platform-specific JVM. | Write code once on your developer laptop; deploy seamlessly to AWS Linux servers or cloud containers. |
| **Robust & Reliable** | Strict compile-time type checking, strong memory management, runtime exception handling, and automatic Garbage Collection. | Prevents silent data corruption, dangling pointers, and crashes common in lower-level languages. |
| **Secure** | Java programs run inside the JVM sandbox. The JVM verifies Bytecode safety before execution and blocks unauthorized memory/file access. | Essential for banking, financial transactions, and distributed cloud computing. |
| **Multi-Threaded** | Built-in native support for concurrent multi-threading at the language and standard library levels. | Allows programs to perform multiple background tasks simultaneously, maximizing modern multi-core CPU usage. |
| **High Performance** | Advanced Just-In-Time (JIT) compilers profile and translate frequently executed Bytecode into optimized native machine code. | Delivers execution speeds rivaling native compiled languages while maintaining dynamic portability. |`
      },
      {
        heading: '3. Where is Java Used in the Real World?',
        content: `Java powers the backbone of global enterprise computing across critical sectors:

1. **Enterprise Backend Microservices:** Over 90% of Fortune 500 companies use Java with the **Spring Boot** and **Jakarta EE** frameworks to build scalable REST APIs, payment gateways, and e-commerce backends.
2. **Android Mobile Development:** Android OS and millions of mobile applications are built using Java and Kotlin on the Android runtime.
3. **Banking & FinTech Systems:** Top investment banks (Goldman Sachs, JPMorgan, Morgan Stanley) rely on Java for high-frequency trading (HFT) platforms, fraud detection, and transactional ledgers due to its ironclad memory safety and concurrency.
4. **Big Data & Analytics Engines:** Massive distributed data platforms including **Apache Hadoop**, **Apache Spark**, **Apache Kafka**, and **Elasticsearch** are engineered in Java and Scala.
5. **Cloud Computing & DevOps:** Scalable container orchestration, serverless lambdas, and enterprise cloud tooling run heavily on the JVM.`
      },
      {
        heading: '4. The Holy Trinity: JDK vs JRE vs JVM',
        content: `To master Java, you must understand the clear distinction between the three core runtime components:

\`\`\`
+-------------------------------------------------------------------------------+
|                       JDK (Java Development Kit)                              |
|  +-------------------------------------------------------------------------+  |
|  |  Development Tools: javac (Compiler), jdb (Debugger), javadoc, jar, etc.  |  |
|  +-------------------------------------------------------------------------+  |
|                                                                               |
|  +-------------------------------------------------------------------------+  |
|  |                    JRE (Java Runtime Environment)                       |  |
|  |  +-------------------------------------+  +--------------------------+  |  |
|  |  | Java Standard Class Libraries       |  | Core Runtime Packages    |  |  |
|  |  | (java.lang, java.util, java.io, etc)|  | (Security, Config, etc.) |  |  |
|  |  +-------------------------------------+  +--------------------------+  |  |
|  |                                                                         |  |
|  |  +-------------------------------------------------------------------+  |  |
|  |  |                 JVM (Java Virtual Machine)                        |  |  |
|  |  |  [ ClassLoader ] -> [ JVM Memory ] -> [ Execution Engine (JIT) ]   |  |  |
|  |  +-------------------------------------------------------------------+  |  |
|  +-------------------------------------------------------------------------+  |
+-------------------------------------------------------------------------------+
\`\`\`

- **JVM (Java Virtual Machine):** The abstract computing engine that loads Bytecode, verifies security, manages memory, executes instructions, and calls native OS APIs.
- **JRE (Java Runtime Environment):** JVM + Standard Class Libraries (e.g., \`String\`, \`ArrayList\`, \`Math\`). It provides everything needed to **run** an already compiled Java program, but cannot compile new source code.
- **JDK (Java Development Kit):** JRE + Development Tools (\`javac\` compiler, \`jar\` packager, \`javadoc\` generator, debuggers). Developers **must install the JDK** to write and compile Java applications.`
      },
      {
        heading: '5. Deep Dive: JVM Internal Architecture',
        content: `When you execute \`java Main\`, the JVM initializes three primary subsystems to manage your program lifecycle:

\`\`\`
+-----------------------------------------------------------------------------------+
|                           JVM INTERNAL ARCHITECTURE                               |
+-----------------------------------------------------------------------------------+
|  1. CLASSLOADER SUBSYSTEM                                                         |
|     [ Loading: Bootstrap -> Extension/Platform -> Application ]                   |
|     [ Linking: Verify -> Prepare -> Resolve ]                                     |
|     [ Initialization: Execute static initializers & static variable values ]      |
+-----------------------------------------------------------------------------------+
|  2. JVM RUNTIME DATA AREAS (MEMORY)                                               |
|     +---------------------------+  +-------------------------------------------+  |
|     | Method Area / Metaspace   |  | Heap Memory                               |  |
|     | (Class metadata, static)  |  | (All Objects, Arrays, Instance Variables) |  |
|     +---------------------------+  +-------------------------------------------+  |
|     +---------------------------+  +-------------------+  +--------------------+  |
|     | Java Thread Stack         |  | PC Registers      |  | Native Method Stack|  |
|     | (Frames, local vars, calls|  | (Next instruction)|  | (C/C++ JNI calls)  |  |
|     +---------------------------+  +-------------------+  +--------------------+  |
+-----------------------------------------------------------------------------------+
|  3. EXECUTION ENGINE                                                              |
|     +-------------------+  +-------------------------+  +----------------------+  |
|     | Interpreter       |  | JIT Compiler (C1 / C2)  |  | Garbage Collector    |  |
|     | (Bytecode line by |  | (Hotspot compiler: native|  | (Reclaims unreferenced|  |
|     |  line execution)  |  |  machine code caching)  |  |  Heap memory objects)|  |
|     +-------------------+  +-------------------------+  +----------------------+  |
+-----------------------------------------------------------------------------------+
\`\`\`

1. **ClassLoader Subsystem:** Loads \`.class\` files from disk into memory, verifies Bytecode safety (ensuring no illegal memory access or stack overflows), and initializes \`static\` members.
2. **Runtime Memory Areas:**
   - **Heap Memory:** Shared across all threads. Stores every instantiated object and array. Managed automatically by the Garbage Collector.
   - **Java Thread Stack:** Private to each thread. Created whenever a thread starts. Stores stack frames containing local variables, method parameters, and intermediate calculation results.
   - **Method Area (Metaspace in Java 8+):** Stores class-level data, method Bytecode, constant pool, and static variables.
   - **PC (Program Counter) Register:** Holds the memory address of the JVM instruction currently being executed for each thread.
   - **Native Method Stack:** Supports C/C++ native system libraries via Java Native Interface (JNI).
3. **Execution Engine:**
   - **Interpreter:** Reads Bytecode instructions line-by-line and executes them quickly on startup.
   - **JIT (Just-In-Time) Compiler:** Identifies "hot spots" (frequently executed loops and methods) and compiles them directly into ultra-fast native CPU machine code, caching the compiled native code for near-instant execution.
   - **Garbage Collector (GC):** Automatically tracks unreferenced heap objects and frees their memory, preventing memory leaks.`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // Display core Java runtime environment details
        System.out.println("==========================================");
        System.out.println("   WELCOME TO OUR COMPILER JAVA MASTERCLASS ");
        System.out.println("==========================================");

        // Fetching JVM system properties
        String javaVersion = System.getProperty("java.version");
        String javaVendor  = System.getProperty("java.vendor");
        String osName      = System.getProperty("os.name");
        String osArch      = System.getProperty("os.arch");

        System.out.println("Java Version     : " + javaVersion);
        System.out.println("Java Vendor      : " + javaVendor);
        System.out.println("Operating System : " + osName + " (" + osArch + ")");
        System.out.println("Platform Status  : Write Once, Run Anywhere (WORA) active!");
        System.out.println("==========================================");
    }
}`,
    output: `==========================================
   WELCOME TO OUR COMPILER JAVA MASTERCLASS 
==========================================
Java Version     : 21.0.2
Java Vendor      : Oracle Corporation
Operating System : Windows 11 (amd64)
Platform Status  : Write Once, Run Anywhere (WORA) active!
==========================================`,
    lineByLine: [
      { line: 'public class Main', explanation: 'Declares a public class named Main. In Java, every line of executable code must live inside a class, and public class names must match the filename (Main.java).' },
      { line: 'public static void main(String[] args)', explanation: 'The mandatory entry point for every standalone Java program. The JVM looks specifically for this method signature to begin execution.' },
      { line: 'System.out.println(...)', explanation: 'Prints the specified text message to the standard output console followed by an automatic newline character.' },
      { line: 'System.getProperty("java.version")', explanation: 'Queries the JVM runtime environment for system-level configuration metadata, such as the active Java version and host operating system.' }
    ],
    practicalExample: `public class JVMMemoryInspector {
    public static void main(String[] args) {
        // Query the active JVM Runtime instance
        Runtime runtime = Runtime.getRuntime();

        long maxMemoryMB   = runtime.maxMemory() / (1024 * 1024);
        long totalMemoryMB = runtime.totalMemory() / (1024 * 1024);
        long freeMemoryMB  = runtime.freeMemory() / (1024 * 1024);
        long usedMemoryMB  = totalMemoryMB - freeMemoryMB;
        int  cpuCores      = runtime.availableProcessors();

        System.out.println("--- JVM Runtime Health Report ---");
        System.out.println("Available CPU Cores : " + cpuCores);
        System.out.println("Max Heap Memory     : " + maxMemoryMB + " MB");
        System.out.println("Total Allocated Heap: " + totalMemoryMB + " MB");
        System.out.println("Used Heap Memory    : " + usedMemoryMB + " MB");
        System.out.println("Free Heap Memory    : " + freeMemoryMB + " MB");
    }
}`,
    practicalOutput: `--- JVM Runtime Health Report ---
Available CPU Cores : 8
Max Heap Memory     : 4096 MB
Total Allocated Heap: 256 MB
Used Heap Memory    : 14 MB
Free Heap Memory    : 242 MB`,
    commonMistakes: [
      'Confusing JDK and JRE: Installing only JRE will prevent you from compiling code with javac. Always install the full JDK for software development.',
      'Assuming Java compiles directly to .exe: Java compiles to .class Bytecode files which require the JVM to run.',
      'Assuming JVM is platform-independent: Java Bytecode is platform-independent, but the JVM itself is platform-specific (there is a Windows JVM, macOS JVM, Linux JVM).'
    ],
    challenge: `// Coding Challenge:
// Write a Java program that retrieves and prints the following JVM environment details:
// 1. User Working Directory (property: "user.dir")
// 2. Java Virtual Machine Name (property: "java.vm.name")
// 3. User Name (property: "user.name")

public class JVMChallenge {
    public static void main(String[] args) {
        // TODO: Use System.getProperty() to display these 3 system properties
        
    }
}`,
    faq: [
      {
        q: 'Why does Java not support multiple class inheritance?',
        a: 'To avoid the famous "Diamond Problem" of ambiguity (when two parent classes have methods with identical names) and to keep the language simple and robust. Java supports multiple inheritance of interface types instead.'
      },
      {
        q: 'What is the role of the JIT (Just-In-Time) compiler in JVM?',
        a: 'The JIT compiler dynamically monitors running Bytecode, identifies heavily repeated code sections ("hot spots"), and compiles them directly into native machine code so they run at raw hardware speeds without interpretation overhead.'
      },
      {
        q: 'Is Java completely 100% object-oriented?',
        a: 'No. Java supports 8 primitive data types (byte, short, int, long, float, double, char, boolean) for maximum computational efficiency. However, everything else in Java is an object.'
      }
    ],
    recap: [
      'Java was designed by James Gosling in 1995 around the "Write Once, Run Anywhere" (WORA) paradigm.',
      'Java source code (.java) compiles to platform-neutral Bytecode (.class) using the javac compiler.',
      'The JVM (Java Virtual Machine) loads Bytecode and translates it into native machine instructions on the host OS.',
      'JDK = JRE + Compilers/Debuggers. JRE = JVM + Standard Class Libraries.'
    ]
  },

  // ==========================================
  // CHAPTER 2: Setup, IDEs & First Hello World Program
  // ==========================================
  {
    num: 2,
    phaseId: 'phase1',
    phaseTitle: 'Phase 1: Java Basics',
    slug: '02-java-installation-ide-and-first-program',
    title: 'Java Installation, IDEs & First Hello World Program',
    badge: '2. Setup & First Program',
    subtopics: 'JDK 21 LTS Installation · Setting JAVA_HOME & PATH · IDEs vs Online Compiler · First Program Breakdown · main() Signature Anatomy · System.out.println',
    readTime: '16 min read',
    intro: 'Step-by-step walkthrough for configuring modern Java 21 LTS on Windows, macOS, and Linux, setting up professional IDEs like IntelliJ IDEA and VS Code, writing your first Hello World program, and demystifying every single keyword in public static void main(String[] args).',
    theorySections: [
      {
        heading: '1. Installing Java 21 LTS & Configuring Environment Variables',
        content: `To build modern Java applications, always download a **Long-Term Support (LTS)** release like **Java 21 LTS** or **Java 17 LTS** from trusted vendors:
- **Oracle OpenJDK / Oracle JDK:** [oracle.com/java](https://www.oracle.com/java/)
- **Eclipse Temurin (Adoptium):** [adoptium.net](https://adoptium.net/) (Recommended open-source production distribution)
- **Amazon Corretto:** [aws.amazon.com/corretto](https://aws.amazon.com/corretto/)

### Configuring Environment Variables on Windows:
1. **JAVA_HOME:** Point this system variable to your JDK root installation folder (e.g. \`C:\\Program Files\\Eclipse Adoptium\\jdk-21.0.2\`).
2. **PATH:** Add \`%JAVA_HOME%\\bin\` to your existing system \`Path\` variable. This allows running \`javac\` and \`java\` commands from any terminal directory.

### Verification in Terminal:
\`\`\`bash
javac -version
# Expected Output: javac 21.0.2

java -version
# Expected Output: openjdk version "21.0.2" ...
\`\`\``
      },
      {
        heading: '2. Choosing Your Development Environment',
        content: `Modern Java developers use state-of-the-art IDEs equipped with intelligent code completion, automated refactoring, and step-through debuggers:

- **IntelliJ IDEA (JetBrains):** The gold standard in industry enterprise development. Offers supreme refactoring, Spring Boot integration, and static analysis.
- **Visual Studio Code (VS Code):** Lightweight, ultra-fast editor powered by Microsoft's "Extension Pack for Java".
- **Eclipse IDE:** Classic open-source enterprise IDE widely used in corporate and legacy projects.
- **Our Compiler Online Java IDE:** Instant, zero-install, in-browser compiler for rapid prototyping, algorithm practice, and learning.`
      },
      {
        heading: '3. Anatomy of the First Java Program: Demystifying Every Keyword',
        content: `Here is the canonical Java Hello World program:

\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

Let us dissect every single token and keyword so you understand exactly why Java requires this exact structure:

### 1. \`public class Main\`
- **\`public\` (Access Modifier):** Declares that this class is accessible from any other class and package.
- **\`class\` (Keyword):** Java's fundamental building block used to define a blueprint for objects.
- **\`Main\` (Identifier):** The identifier/name given to this class. **Crucial Rule:** In Java, if a class is declared \`public\`, its file name MUST match the class name exactly with a \`.java\` extension (\`Main.java\`). Java is strictly case-sensitive!

### 2. \`public static void main(String[] args)\`
This is the mandatory entry point of every Java application. When the JVM starts, it searches specifically for this exact method signature:
- **\`public\`:** The JVM runs outside your program's package; therefore, the entry point method must be publicly accessible so the JVM can call it.
- **\`static\`:** Allows the JVM to invoke this method without needing to create an instance/object of the \`Main\` class first (\`Main.main()\`). Without \`static\`, the JVM would not know how to instantiate your class.
- **\`void\`:** Specifies the method's return type. Since the program terminates when \`main()\` finishes, it returns nothing (\`void\`) to the operating system.
- **\`main\`:** The reserved method identifier recognized universally by JVM classloaders as the initial entry point.
- **\`String[] args\` (Parameters):** An array of \`String\` objects that receives optional command-line arguments passed to the application when executed from the terminal (e.g. \`java Main server 8080\`).

### 3. \`System.out.println("Hello, World!");\`
- **\`System\`:** A built-in standard class in the \`java.lang\` package containing useful system-level facilities.
- **\`out\`:** A \`public static final\` instance of \`PrintStream\` inside the \`System\` class representing the standard output stream (console).
- **\`println()\`:** A method of \`PrintStream\` that prints the passed string argument to the console followed by a newline character (\`\\n\`).
- **\`;\` (Semicolon):** Every statement in Java MUST terminate with a semicolon. It tells the compiler where a complete instruction ends.`
      },
      {
        heading: '4. \`System.out.println()\` vs \`System.out.print()\` vs \`System.out.printf()\`',
        content: `Java provides three standard methods to output data to the console:

| Method | Behavior | Example |
| :--- | :--- | :--- |
| **\`print()\`** | Outputs text without appending a newline. The next print will continue on the same line. | \`System.out.print("Hello "); System.out.print("World");\` -> \`Hello World\` |
| **\`println()\`** | Outputs text and immediately advances the cursor to the beginning of the next line. | \`System.out.println("Line 1"); System.out.println("Line 2");\` |
| **\`printf()\`** | Formats text using C-style format specifiers (\`%s\`, \`%d\`, \`%.2f\`). | \`System.out.printf("Name: %s, Score: %d", "Ravi", 95);\` |`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // 1. Using println() for discrete output lines
        System.out.println("1. Java 21 LTS initialized successfully.");
        System.out.println("2. Outputting data across multiple lines:");

        // 2. Using print() for continuous output on the same line
        System.out.print("   [Progress: ");
        System.out.print("25% -> ");
        System.out.print("50% -> ");
        System.out.print("100% Complete");
        System.out.println("]"); // Closes line with a newline

        // 3. Printing numbers and simple expressions
        System.out.println("3. Direct Arithmetic Calculation: 10 + 20 = " + (10 + 20));
        System.out.println("4. Welcome to Professional Java Engineering!");
    }
}`,
    output: `1. Java 21 LTS initialized successfully.
2. Outputting data across multiple lines:
   [Progress: 25% -> 50% -> 100% Complete]
3. Direct Arithmetic Calculation: 10 + 20 = 30
4. Welcome to Professional Java Engineering!`,
    lineByLine: [
      { line: 'public class Main', explanation: 'Class declaration with public accessibility matching Main.java filename.' },
      { line: 'public static void main(String[] args)', explanation: 'The universal JVM entry point method receiving optional command-line string arguments.' },
      { line: 'System.out.print(...)', explanation: 'Streams characters to the console without moving the cursor to the next line.' },
      { line: '"..." + (10 + 20)', explanation: 'String concatenation combining text with parenthesized arithmetic evaluation result (30).' }
    ],
    practicalExample: `public class CommandLineGreeting {
    public static void main(String[] args) {
        // Checking if command line arguments were passed
        if (args.length > 0) {
            System.out.println("Received Command-Line Arguments:");
            for (int i = 0; i < args.length; i++) {
                System.out.println("  Argument [" + i + "]: " + args[i]);
            }
        } else {
            System.out.println("No command-line arguments provided. Defaulting to standard mode.");
            System.out.println("Tip: In terminal, run: java CommandLineGreeting DevServer 8080");
        }
    }
}`,
    practicalOutput: `No command-line arguments provided. Defaulting to standard mode.
Tip: In terminal, run: java CommandLineGreeting DevServer 8080`,
    commonMistakes: [
      'Filename mismatch: Naming the file "test.java" while the code contains "public class Main" causes compile-time error: "class Main is public, should be declared in a file named Main.java".',
      'Case sensitivity errors: Typing "system.out.println" or "String[] Args" or "main(string[] args)" will fail compilation because Java is strictly case-sensitive.',
      'Missing semicolon (;): Every statement must end with a semicolon.',
      'Modifying main method signature: Changing "public static void main(String[] args)" to "private void main()" will compile fine, but running it produces: "Main method not found in class".'
    ],
    challenge: `// Coding Challenge:
// Write a Java program named UserProfileCard that outputs:
// ----------------------------------------
//   DEVELOPER PROFILE: [Your Name]
//   ROLE: Backend Java Engineer
//   FAVORITE TOOL: IntelliJ IDEA & Docker
// ----------------------------------------
// Use formatted System.out.println statements.

public class UserProfileCard {
    public static void main(String[] args) {
        // TODO: Write your formatted profile card output here
        
    }
}`,
    faq: [
      {
        q: 'Can we change "String[] args" to "String args[]" or "String... args"?',
        a: 'Yes! Both "String args[]" (C-style syntax) and "String... args" (varargs syntax) are 100% valid main method signatures accepted by the JVM.'
      },
      {
        q: 'Can a Java file contain multiple classes?',
        a: 'Yes, a single .java file can contain multiple classes, but only ONE class can be declared "public", and the file name must match that public class name.'
      },
      {
        q: 'What happens if we remove the "static" keyword from main()?',
        a: 'The code will compile without errors, but when you attempt to run it with "java Main", the JVM will throw a NoSuchMethodError because it cannot find a static entry point to call without instantiation.'
      }
    ],
    recap: [
      'Java 21 LTS is the recommended modern Long-Term Support release for production.',
      'Every standalone Java program starts execution at: public static void main(String[] args).',
      'public class name MUST match the filename (Main.java).',
      'System.out.println() prints with a newline; System.out.print() prints continuously on the same line.'
    ]
  },

  // ==========================================
  // CHAPTER 3: Compilation, Execution & Source File Structure
  // ==========================================
  {
    num: 3,
    phaseId: 'phase1',
    phaseTitle: 'Phase 1: Java Basics',
    slug: '03-java-compilation-execution-and-source-structure',
    title: 'How Java Compiles & Runs & Source File Structure',
    badge: '3. Compilation & File Structure',
    subtopics: 'Compilation Pipeline (javac to Bytecode to JVM) · Why Java is Compiled & Interpreted · Source File Structure Rules · Packages & Imports',
    readTime: '15 min read',
    intro: 'Deep exploration of the complete Java compilation and execution pipeline: from source code (.java) to bytecode (.class) and native machine code, why Java is hybrid compiled/interpreted, and the mandatory architectural structure of Java source files.',
    theorySections: [
      {
        heading: '1. The 2-Step Java Compilation & Execution Lifecycle',
        content: `Java combines the speed of compiled languages with the flexibility of interpreted languages. Here is the step-by-step journey of your code:

\`\`\`
+-----------------------------------------------------------------------------------+
|                        JAVA CODE EXECUTION PIPELINE                               |
+-----------------------------------------------------------------------------------+
|  [ Step 1: Human Source Code ]                                                    |
|    File: Main.java (Plain text readable code written by developer)                |
|           |                                                                       |
|           v                                                                       |
|  [ Step 2: Java Compiler (javac) ]                                                |
|    Command: javac Main.java                                                       |
|    Action : Syntax validation, type checking, semantic analysis                   |
|           |                                                                       |
|           v                                                                       |
|  [ Step 3: Architecture-Neutral Bytecode ]                                        |
|    File: Main.class (Compact, platform-agnostic bytecode instructions)            |
|           |                                                                       |
|           v                                                                       |
|  [ Step 4: Java Virtual Machine (JVM) ]                                           |
|    Command: java Main                                                             |
|    Actions:                                                                       |
|      1. ClassLoader loads Main.class into memory                                  |
|      2. Bytecode Verifier checks security & memory safety                         |
|      3. Execution Engine:                                                         |
|         - Interpreter reads instructions immediately                              |
|         - JIT Compiler compiles hot code paths into optimized machine code       |
|           |                                                                       |
|           v                                                                       |
|  [ Step 5: Native Machine Execution ]                                             |
|    Binary CPU instructions executed directly on Host CPU (Intel / AMD / ARM)      |
+-----------------------------------------------------------------------------------+
\`\`\``
      },
      {
        heading: '2. Why is Java both Compiled and Interpreted?',
        content: `Lower-level languages (like C and C++) are **Purely Compiled**: they translate source code directly into CPU machine binaries. If the CPU changes, the binary breaks.

Higher-level scripting languages (like Python and JavaScript) are **Purely Interpreted**: the interpreter reads source code line-by-line during runtime, which can result in slower execution speeds for heavy computation.

**Java combines the best of both worlds:**
1. **Compilation Phase (\`javac\`):** Pre-compiles source code into Bytecode once, catching syntax errors and type mismatches ahead of time.
2. **Interpretation & JIT Phase (JVM):** The JVM interprets Bytecode immediately on startup for quick response times, while the **JIT (Just-In-Time) compiler** converts repetitive loops into pure native machine code, achieving near-C++ speeds!`
      },
      {
        heading: '3. Mandatory Java Source File Structure',
        content: `A single \`.java\` source file follows a strict top-to-bottom structural hierarchy:

\`\`\`
+-----------------------------------------------------------------------+
| 1. Package Declaration (Optional, must be first line if present)       |
|    package com.ourcompiler.tutorial;                                  |
+-----------------------------------------------------------------------+
| 2. Import Statements (Optional, imports external classes/libraries)   |
|    import java.util.Scanner;                                          |
|    import java.time.LocalDateTime;                                    |
+-----------------------------------------------------------------------+
| 3. Main Public Class Declaration (Must match filename exactly)        |
|    public class Application {                                         |
|                                                                       |
|      // 4. Class Variables & Fields (State)                           |
|      private String appName = "OurCompiler Engine";                   |
|      public static final int VERSION = 1;                             |
|                                                                       |
|      // 5. Constructors (Object Initialization)                       |
|      public Application() { ... }                                     |
|                                                                       |
|      // 6. Methods (Behavior)                                         |
|      public void start() { ... }                                      |
|                                                                       |
|      // 7. Main Entry Point Method                                    |
|      public static void main(String[] args) { ... }                   |
|    }                                                                  |
+-----------------------------------------------------------------------+
| 8. Non-Public Classes (Optional, package-private helper classes)      |
|    class HelperUtil { ... }                                           |
+-----------------------------------------------------------------------+
\`\`\`

### Fundamental Source File Rules:
1. **Package Statement First:** If a file belongs to a package (folder), the \`package\` statement must be the very first non-comment line.
2. **Single Public Class Rule:** A \`.java\` file can have **at most one** \`public\` class.
3. **Filename Rule:** The filename MUST match the name of the \`public\` class (e.g. \`Application.java\` for \`public class Application\`).`
      }
    ],
    codeExample: `// 1. Package statement (conceptual for tutorial demonstration)
// package com.ourcompiler.demo;

// 2. Import statements from standard class library
import java.util.Date;
import java.time.LocalDate;

// 3. Primary public class matching filename: SourceStructureDemo.java
public class Main {
    
    // 4. Class-level constants & fields
    public static final String COURSE_NAME = "Java Masterclass 2026";

    // 5. Main execution entry point
    public static void main(String[] args) {
        System.out.println("Course Title   : " + COURSE_NAME);
        System.out.println("System Date    : " + new Date());
        System.out.println("Current Year   : " + LocalDate.now().getYear());
        
        // Calling a helper method
        displaySystemArchitecture();
    }

    // 6. Custom member method
    public static void displaySystemArchitecture() {
        System.out.println("Architecture   : 2-Step JIT Bytecode Compilation Model");
        System.out.println("Status         : Fully Compliant with Java 21 LTS Standard");
    }
}`,
    output: `Course Title   : Java Masterclass 2026
System Date    : Sun Aug 16 13:45:00 IST 2026
Current Year   : 2026
Architecture   : 2-Step JIT Bytecode Compilation Model
Status         : Fully Compliant with Java 21 LTS Standard`,
    lineByLine: [
      { line: 'import java.util.Date;', explanation: 'Imports the legacy Date class from the java.util standard library package.' },
      { line: 'public static final String COURSE_NAME', explanation: 'Declares a public, class-level, constant (final) String variable accessible everywhere.' },
      { line: 'displaySystemArchitecture();', explanation: 'Invokes the static member method defined within the same class.' },
      { line: 'public static void displaySystemArchitecture()', explanation: 'Method definition containing modular, reusable application logic.' }
    ],
    practicalExample: `// Multi-class demonstration in a single compilation unit
class DatabaseConnector {
    void connect() {
        System.out.println("[DatabaseConnector] Connected to PostgreSQL Database.");
    }
}

class SecurityGuard {
    boolean authenticate(String token) {
        return token.equals("AUTH_SECRET_2026");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("--- Starting Enterprise Service Bootstrapping ---");
        
        SecurityGuard guard = new SecurityGuard();
        boolean isAuth = guard.authenticate("AUTH_SECRET_2026");
        System.out.println("Authentication Status: " + (isAuth ? "GRANTED" : "DENIED"));

        if (isAuth) {
            DatabaseConnector db = new DatabaseConnector();
            db.connect();
            System.out.println("System Ready for Production Traffic.");
        }
    }
}`,
    practicalOutput: `--- Starting Enterprise Service Bootstrapping ---
Authentication Status: GRANTED
[DatabaseConnector] Connected to PostgreSQL Database.
System Ready for Production Traffic.`,
    commonMistakes: [
      'Placing import statements before package declaration: Causes a compile error. The package statement must always be first.',
      'Declaring two public classes in one file: Causes compilation failure: "class X is public, should be declared in a file named X.java".',
      'Running "java Main.class": The java command takes the CLASS NAME ("java Main"), not the filename with extension.'
    ],
    challenge: `// Coding Challenge:
// Create a program containing:
// 1. A constant APP_NAME = "Enterprise Gateway"
// 2. A method named verifySystemStatus() that prints "[Status] All microservices operational."
// 3. Invoke verifySystemStatus() inside main().

public class Main {
    // TODO: Define APP_NAME constant here
    
    // TODO: Define verifySystemStatus() method here

    public static void main(String[] args) {
        // TODO: Print APP_NAME and call verifySystemStatus()
        
    }
}`,
    faq: [
      {
        q: 'What is inside a .class file?',
        a: 'A .class file contains binary Java Bytecode instructions, a constant pool (storing literal strings, numbers, and method references), class metadata, and stack/local variable allocations for the JVM.'
      },
      {
        q: 'Do I need to import java.lang classes like String or System?',
        a: 'No! The java.lang package is automatically imported by the Java compiler into every single Java file by default.'
      },
      {
        q: 'What is the command to view decompiled Bytecode?',
        a: 'You can use the built-in JDK disassembler: "javap -c Main.class" to inspect the human-readable JVM assembly instructions.'
      }
    ],
    recap: [
      'Java uses a 2-step compilation lifecycle: javac (Source to Bytecode) -> JVM (Bytecode to Machine Code).',
      'Java source order: 1. package, 2. imports, 3. public class, 4. fields, 5. methods.',
      'Only one public class is allowed per .java file and its name must match the filename.'
    ]
  },

  // ==========================================
  // CHAPTER 4: Comments & Naming Conventions
  // ==========================================
  {
    num: 4,
    phaseId: 'phase1',
    phaseTitle: 'Phase 1: Java Basics',
    slug: '04-java-comments-and-naming-conventions',
    title: 'Java Comments & Industry Naming Conventions',
    badge: '4. Comments & Naming Rules',
    subtopics: 'Single-line // · Multi-line /* */ · Javadoc /** */ with Tags · Naming Conventions (PascalCase, camelCase, UPPER_SNAKE_CASE) · Self-Documenting Code',
    readTime: '14 min read',
    intro: 'Mastering clean code standards in Java: the three types of comments including professional Javadoc generation with standard tags (@param, @return, @throws), and the official industry naming conventions used across enterprise software teams.',
    theorySections: [
      {
        heading: '1. The 3 Types of Comments in Java',
        content: `Comments are explanatory notes placed inside source code to assist human developers. The Java compiler completely ignores comments during compilation, meaning they have **zero impact** on binary size or runtime execution performance.

### 1. Single-Line Comments (\`//\`)
Used for short, inline explanations of complex algorithms or quick notes:
\`\`\`java
// Calculate the compound annual growth rate (CAGR)
double cagr = Math.pow(finalValue / initialValue, 1.0 / years) - 1;
\`\`\`

### 2. Multi-Line Comments (\`/* ... */\`)
Used for paragraph-length documentation or temporarily disabling code blocks during debugging:
\`\`\`java
/*
 * The following algorithm implements the Luhn checksum
 * to validate credit card account numbers before
 * initiating payment gateway network requests.
 */
\`\`\`

### 3. Javadoc Comments (\`/** ... */\`)
Professional documentation comments placed immediately above classes, interfaces, methods, and fields. The JDK tool \`javadoc\` parses these comments into rich HTML documentation pages (the same documentation you read on Oracle's official Java API website!):
\`\`\`java
/**
 * Calculates the total order price including state tax and shipping fees.
 *
 * @param basePrice The subtotal price before tax (must be > 0).
 * @param taxRate   The applicable state sales tax percentage (e.g. 0.08 for 8%).
 * @return The final rounded invoice amount.
 * @throws IllegalArgumentException If basePrice is negative.
 */
public double calculateInvoice(double basePrice, double taxRate) {
    if (basePrice < 0) throw new IllegalArgumentException("Base price cannot be negative");
    return basePrice + (basePrice * taxRate);
}
\`\`\``
      },
      {
        heading: '2. Standard Javadoc Tags',
        content: `Professional Java teams use standard Javadoc tags to build enterprise API documentation:

| Tag | Syntax | Description |
| :--- | :--- | :--- |
| **\`@author\`** | \`@author Developer Name\` | Specifies the author/team responsible for creating the class. |
| **\`@version\`** | \`@version 1.0.0\` | Documents the current software version release. |
| **\`@param\`** | \`@param parameterName description\` | Documents the purpose, type, and constraints of a method parameter. |
| **\`@return\`** | \`@return description\` | Documents the return value and meaning of the method output. |
| **\`@throws\`** | \`@throws ExceptionClass condition\` | Documents which exceptions can be thrown and under what conditions. |
| **\`@see\`** | \`@see ClassName#method\` | Provides a cross-reference link to related classes or documentation. |
| **\`@deprecated\`**| \`@deprecated reason and replacement\` | Warns developers that a method is obsolete and will be removed in future versions. |`
      },
      {
        heading: '3. Official Java Naming Conventions',
        content: `Java has strict, universally accepted naming conventions established by Oracle and Google Style Guides. Adhering to these standards is essential for professional code readability:

| Code Element | Naming Convention | Example | Rules & Guidelines |
| :--- | :--- | :--- | :--- |
| **Classes & Interfaces** | **PascalCase** (UpperCamelCase) | \`BankAccount\`, \`PaymentService\`, \`UserRepository\` | Must begin with an uppercase letter; nouns representing entities. |
| **Methods** | **camelCase** (lowerCamelCase) | \`calculateTotal()\`, \`sendNotification()\`, \`getUserById()\` | Must begin with a lowercase letter; verbs representing actions. |
| **Variables & Fields** | **camelCase** (lowerCamelCase) | \`accountBalance\`, \`userEmail\`, \`totalPrice\` | Must begin with a lowercase letter; descriptive nouns. |
| **Constants** | **UPPER_SNAKE_CASE** | \`MAX_RETRY_ATTEMPTS\`, \`DEFAULT_TIMEOUT_MS\`, \`PI\` | All uppercase letters separated by underscores; declared \`static final\`. |
| **Packages** | **all lowercase** (reverse domain) | \`com.ourcompiler.service\`, \`org.springframework.boot\` | Unique reverse Internet domain name prefix; all lowercase. |
| **Generics Type Parameters** | **Single Uppercase Letter** | \`T\` (Type), \`E\` (Element), \`K\` (Key), \`V\` (Value) | Single capital letters. |`
      }
    ],
    codeExample: `/**
 * Demonstrates clean coding standards, Javadoc annotations,
 * and official Java naming conventions.
 *
 * @author Our Compiler Technical Editorial Team
 * @version 2026.1
 */
public class Main {

    // Constant in UPPER_SNAKE_CASE
    public static final double DEFAULT_TAX_RATE = 0.18;
    public static final String CURRENCY_SYMBOL  = "INR (₹)";

    /**
     * Computes the total billing amount after applying standard tax.
     *
     * @param itemPrice Subtotal price of purchased goods.
     * @return Final amount including applicable tax.
     */
    public static double computeBill(double itemPrice) {
        // Single-line comment: calculate gross total
        double taxAmount = itemPrice * DEFAULT_TAX_RATE;
        return itemPrice + taxAmount;
    }

    public static void main(String[] args) {
        double productPrice = 2500.00; // Variable in camelCase
        double totalPayable = computeBill(productPrice);

        System.out.println("Product Price : ₹" + productPrice);
        System.out.println("Tax Rate      : " + (DEFAULT_TAX_RATE * 100) + "%");
        System.out.println("Total Invoice : ₹" + totalPayable);
        System.out.println("Currency Code : " + CURRENCY_SYMBOL);
    }
}`,
    output: `Product Price : ₹2500.0
Tax Rate      : 18.0%
Total Invoice : ₹2950.0
Currency Code : INR (₹)`,
    lineByLine: [
      { line: '/** ... */', explanation: 'Javadoc documentation block containing structured metadata for the class and its methods.' },
      { line: 'public static final double DEFAULT_TAX_RATE = 0.18;', explanation: 'Constant declared with static final modifiers formatted in UPPER_SNAKE_CASE.' },
      { line: 'double taxAmount = itemPrice * DEFAULT_TAX_RATE;', explanation: 'Local variable in camelCase representing intermediate calculation.' },
      { line: 'computeBill(productPrice)', explanation: 'Method invocation in camelCase conveying clear action verb.' }
    ],
    practicalExample: `/**
 * Represents an employee record with enterprise naming conventions.
 */
class EmployeeRecord {
    // Instance variables in camelCase
    private String employeeName;
    private int employeeId;
    private double monthlySalary;

    public EmployeeRecord(String employeeName, int employeeId, double monthlySalary) {
        this.employeeName = employeeName;
        this.employeeId = employeeId;
        this.monthlySalary = monthlySalary;
    }

    public double calculateAnnualCTC() {
        // 12 months salary + 10% standard enterprise performance bonus
        final double BONUS_PERCENTAGE = 0.10;
        double annualBase = this.monthlySalary * 12;
        return annualBase + (annualBase * BONUS_PERCENTAGE);
    }

    public void printSummary() {
        System.out.println("Employee ID   : #" + employeeId);
        System.out.println("Employee Name : " + employeeName);
        System.out.println("Annual CTC    : ₹" + calculateAnnualCTC());
    }
}

public class Main {
    public static void main(String[] args) {
        EmployeeRecord dev = new EmployeeRecord("Balaji Nayak", 10142, 85000.00);
        dev.printSummary();
    }
}`,
    practicalOutput: `Employee ID   : #10142
Employee Name : Balaji Nayak
Annual CTC    : ₹1122000.0`,
    commonMistakes: [
      'Using lowercase for class names: "class bankAccount" violates Java conventions and makes code hard to distinguish from variables.',
      'Using underscores in variable names: "int user_age" is C/Python style; in Java, always use camelCase: "int userAge".',
      'Over-commenting obvious code: Writing "// print hello" above "System.out.println("hello")" adds noise. Comments should explain WHY a complex logic exists, not WHAT simple syntax does.',
      'Naming constants in lowercase: Writing "final double pi = 3.14" violates conventions; write "final double PI = 3.14159".'
    ],
    challenge: `// Coding Challenge:
// Refactor the following poorly formatted code to follow official Java naming conventions:
// - Class name: employee_manager -> ???
// - Constant: max_limit = 500 -> ???
// - Variable: User_first_Name -> ???
// - Method: Calculate_Salary() -> ???

public class Main {
    public static void main(String[] args) {
        // TODO: Implement the refactored code following standard Java naming conventions
        
    }
}`,
    faq: [
      {
        q: 'How do I generate HTML documentation from Javadoc comments?',
        a: 'Run the command "javadoc -d docs Main.java" in your terminal. The JDK will automatically generate a complete web portal with clickable class indexes and API reference pages.'
      },
      {
        q: 'Can variable names start with numbers or special characters in Java?',
        a: 'Variable names CANNOT start with a digit (e.g. "1stName" is invalid). They can only start with a letter (a-z, A-Z), an underscore (_), or a dollar sign ($).'
      },
      {
        q: 'Are comments included in the compiled .class file?',
        a: 'No. The Java compiler strips out all single-line and multi-line comments during the parsing phase. Javadoc comments are optionally preserved in class metadata only if specific retention flags are enabled.'
      }
    ],
    recap: [
      'Java supports single-line (//), multi-line (/* */), and Javadoc (/** */) comments.',
      'Classes & Interfaces use PascalCase; Methods & Variables use camelCase.',
      'Constants use UPPER_SNAKE_CASE with static final modifiers.',
      'Packages use all lowercase reverse domain names (e.g. com.company.module).'
    ]
  },

  // ==========================================
  // CHAPTER 5: Java Error Types & Debugging
  // ==========================================
  {
    num: 5,
    phaseId: 'phase1',
    phaseTitle: 'Phase 1: Java Basics',
    slug: '05-java-errors-debugging-and-troubleshooting',
    title: 'Java Error Types, Stack Traces & Debugging',
    badge: '5. Errors & Debugging',
    subtopics: 'Compile-Time / Syntax Errors · Runtime Errors & Exceptions · Logical Errors · Stack Trace Anatomy · Defensive Debugging',
    readTime: '15 min read',
    intro: 'Mastering the art of troubleshooting Java software: identifying the three distinct error categories (Compile-time, Runtime, and Logical bugs), dissecting JVM stack traces with surgical precision, and building defensive debugging habits.',
    theorySections: [
      {
        heading: '1. The 3 Primary Error Classifications in Java',
        content: `Every software bug in Java falls into one of three distinct lifecycle categories:

\`\`\`
+-----------------------------------------------------------------------------------+
|                        JAVA ERROR HIERARCHY & LIFECYCLE                           |
+-----------------------------------------------------------------------------------+
| 1. COMPILE-TIME ERRORS (Syntax & Type Violations)                                 |
|    - Caught by: javac compiler BEFORE code can ever run                           |
|    - Examples : Missing semicolon, type mismatch (int x = "hello"),               |
|                 unclosed braces {}, referencing undeclared variables              |
|    - Severity : High compile blocker, but easy to find with line numbers          |
+-----------------------------------------------------------------------------------+
| 2. RUNTIME ERRORS & EXCEPTIONS (Crashes During Execution)                         |
|    - Caught by: JVM runtime during program execution                              |
|    - Examples : NullPointerException, ArithmeticException (/ by zero),            |
|                 ArrayIndexOutOfBoundsException, ClassCastException               |
|    - Severity : Dangerous in production; generates a detailed JVM Stack Trace     |
+-----------------------------------------------------------------------------------+
| 3. LOGICAL ERRORS (Silent Calculation & Business Logic Bugs)                      |
|    - Caught by: Automated Unit Tests (JUnit) or thorough human QA verification    |
|    - Examples : Using + instead of *, off-by-one loop conditions (< vs <=),       |
|                 faulty if-else branches, flawed financial tax formulas            |
|    - Severity : Most dangerous; the code compiles and runs without crashing,      |
|                 but produces WRONG or corrupt output!                             |
+-----------------------------------------------------------------------------------+
\`\`\``
      },
      {
        heading: '2. Anatomy of a Java JVM Stack Trace',
        content: `When a runtime exception crashes a Java application, the JVM prints a **Stack Trace** to the standard error stream. Learning to read stack traces from top to bottom is the single most important skill for a Java developer:

\`\`\`
Exception in thread "main" java.lang.ArithmeticException: / by zero
    at Calculator.divide(Calculator.java:14)
    at OrderProcessor.calculatePerItemCost(OrderProcessor.java:28)
    at Main.main(Main.java:8)
\`\`\`

### How to Deconstruct This Stack Trace:
1. **Thread Name:** \`Exception in thread "main"\` tells you which concurrent thread crashed.
2. **Exception Class:** \`java.lang.ArithmeticException\` indicates the exact exception category.
3. **Error Message:** \`/: by zero\` explains why the JVM aborted the operation.
4. **Call Stack (Bottom to Top):**
   - \`Main.main(Main.java:8)\`: Execution started at line 8 of \`Main.java\`.
   - \`OrderProcessor.calculatePerItemCost(OrderProcessor.java:28)\`: Line 8 called \`calculatePerItemCost()\` at line 28 of \`OrderProcessor.java\`.
   - \`Calculator.divide(Calculator.java:14)\`: The exact crash point occurred at line 14 of \`Calculator.java\` inside the \`divide()\` method!`
      },
      {
        heading: '3. Common Compile-Time vs Runtime Errors',
        content: `| Error Name | Type | Cause | Quick Fix |
| :--- | :--- | :--- | :--- |
| **\`cannot find symbol\`** | Compile-Time | Variable or method name misspelled, or missing import statement. | Check spelling and verify the correct \`import\` package is added. |
| **\`incompatible types\`** | Compile-Time | Assigning a data type to an incompatible variable (e.g. \`int x = "text"\`). | Apply explicit type casting or adjust the variable type. |
| **\`missing return statement\`**| Compile-Time | A method declared with a non-void return type fails to return a value on all code paths. | Ensure every \`if-else\` branch returns a valid value. |
| **\`NullPointerException\`** | Runtime | Attempting to call a method or access a field on an uninitialized (\`null\`) object reference. | Check for null with \`if (obj != null)\` or use \`Optional<T>\`. |
| **\`ArrayIndexOutOfBoundsException\`** | Runtime | Accessing an array index that is negative or \`>= array.length\`. | Keep loop conditions within \`0\` to \`array.length - 1\`. |
| **\`ArithmeticException\`** | Runtime | Performing integer division by zero (\`10 / 0\`). | Guard against zero divisor before executing division. |`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        System.out.println("--- Demonstrating Safe Error Handling in Java ---");

        int dividend = 100;
        int divisor  = 0;

        // Defensive Programming: Checking divisor before division to prevent runtime crash
        if (divisor != 0) {
            int result = dividend / divisor;
            System.out.println("Result: " + result);
        } else {
            System.out.println("[Handled Error]: Divisor cannot be 0. Division aborted safely.");
        }

        // Handling potential Null References safely
        String username = null;
        if (username != null) {
            System.out.println("User Length: " + username.length());
        } else {
            System.out.println("[Handled Error]: Username object is null. Defaulting to 'Guest'.");
        }

        System.out.println("Application completed gracefully without crashing!");
    }
}`,
    output: `--- Demonstrating Safe Error Handling in Java ---
[Handled Error]: Divisor cannot be 0. Division aborted safely.
[Handled Error]: Username object is null. Defaulting to 'Guest'.
Application completed gracefully without crashing!`,
    lineByLine: [
      { line: 'if (divisor != 0)', explanation: 'Defensive validation check preventing an ArithmeticException (/ by zero) runtime crash.' },
      { line: 'if (username != null)', explanation: 'Null safety check ensuring no NullPointerException is triggered when accessing object methods.' },
      { line: 'System.out.println("Application completed...")', explanation: 'Proof that the application continued executing safely because error conditions were handled defensively.' }
    ],
    practicalExample: `// Demonstrating a Logical Error vs Corrected Logic
public class Main {
    public static void main(String[] args) {
        double subtotal = 1000.0;
        double discountPercentage = 10; // 10% discount intended

        // 1. THE LOGICAL BUG:
        // Intended formula: subtotal - (subtotal * (discountPercentage / 100))
        // Buggy formula below due to integer division (10 / 100 = 0 in integer math!)
        double buggyDiscount = subtotal * (10 / 100); // Evaluates to 1000 * 0 = 0.0
        double buggyFinalPrice = subtotal - buggyDiscount;

        // 2. THE CORRECTED LOGIC:
        // Using floating-point literal 100.0 to force floating-point division
        double correctDiscount = subtotal * (discountPercentage / 100.0);
        double correctFinalPrice = subtotal - correctDiscount;

        System.out.println("Subtotal Amount    : ₹" + subtotal);
        System.out.println("Buggy Final Price  : ₹" + buggyFinalPrice + " (Discount failed!)");
        System.out.println("Correct Final Price: ₹" + correctFinalPrice + " (10% applied correctly)");
    }
}`,
    practicalOutput: `Subtotal Amount    : ₹1000.0
Buggy Final Price  : ₹1000.0 (Discount failed!)
Correct Final Price: ₹900.0 (10% applied correctly)`,
    commonMistakes: [
      'Integer division trap: Writing (10 / 100) evaluates to 0 because both operands are integers. Always use 10.0 / 100.0 for decimal calculations.',
      'Off-by-one loop errors: Using "for (int i = 0; i <= array.length; i++)" throws ArrayIndexOutOfBoundsException on the last iteration because valid indexes end at length - 1.',
      'Ignoring compiler warnings: Modern IDE warnings highlight unclosed resources, unused variables, and probable null pointer dereferences before they cause production outages.'
    ],
    challenge: `// Coding Challenge:
// The following code contains 3 distinct errors:
// 1. A Syntax error
// 2. A Runtime error potential
// 3. A Logical bug in average calculation
// Identify and fix all 3 bugs so the program compiles and outputs the exact average 85.0.

public class Main {
    public static void main(String[] args) {
        int score1 = 80;
        int score2 = 90;
        
        // Fix the bugs below:
        // double avg = (score1 + score2) / 2
        // System.out.println("Average: " + avg);
    }
}`,
    faq: [
      {
        q: 'What is the difference between an Error and an Exception in Java?',
        a: 'Both inherit from Throwable. "Error" (e.g. OutOfMemoryError, StackOverflowError) represents serious hardware or JVM failure that normal applications cannot recover from. "Exception" (e.g. NullPointerException, IOException) represents recoverable conditions that programs can catch and handle.'
      },
      {
        q: 'How do I read a stack trace when it has 50 lines?',
        a: 'Look for the "Caused by:" clause at the bottom of the trace, and find the first line referencing a file in your own project package (ignore internal JVM or framework library lines).'
      },
      {
        q: 'What tool catches logical errors automatically?',
        a: 'Automated unit testing frameworks like JUnit 5 combined with code coverage tools (JaCoCo) allow you to assert expected outputs against actual outputs for hundreds of edge cases.'
      }
    ],
    recap: [
      'Compile-time errors occur during javac execution and block class file generation.',
      'Runtime errors crash the running application and produce a JVM stack trace.',
      'Logical errors produce incorrect business calculations without crashing the program.',
      'Always read stack traces from top to bottom, focusing on the root cause and line number.'
    ]
  }
];
