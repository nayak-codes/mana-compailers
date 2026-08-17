module.exports = [
  {
    "num": 33,
    "phaseId": "phase8",
    "phaseTitle": "Phase 8: Methods & Recursion",
    "slug": "33-java-method-fundamentals-and-call-stack",
    "title": "Java Method Fundamentals, Anatomy & Call Stack Execution",
    "badge": "33. Method Fundamentals & Call Stack",
    "subtopics": "Method ante enti? · DRY Principle · 6 Components of Method Anatomy · Calling Methods · JVM Call Stack Frames · Parameters vs Arguments · Varargs (int... args) · Return Statement & Unreachable Code",
    "readTime": "22 min read",
    "intro": "Comprehensive masterclass on Java Methods: understanding what methods are, why they are essential for modular software engineering, complete breakdown of method anatomy, JVM Call Stack activation frames, formal parameters versus actual arguments, variable arguments (varargs), and return type mechanics.",
    "theorySections": [
      {
        "heading": "1. Method Ante Enti? (What is a Method in Java?)",
        "content": "In computer programming, a **Method** (also called a *Function* or *Procedure*) is a **reusable block of code** that performs a specific, well-defined task and only executes when it is explicitly invoked (called).\n\n**Why are Methods Needed? (The DRY Principle):**\n- **Don't Repeat Yourself (DRY):** Instead of writing the same 20 lines of sales tax calculation logic across 50 different classes, you define a single method <code>calculateTax(amount)</code> once and call it everywhere.\n- **Modularity:** Large 5,000-line monolithic programs become unmaintainable. Dividing software into small, focused 10-to-20 line methods makes code easy to read, test, and debug.\n- **Maintainability:** If business tax rules change from 18% to 12%, you only update a **single line of code** inside the method, and the entire application immediately reflects the update!"
      },
      {
        "heading": "2. The 6 Core Components of Method Anatomy",
        "content": "Every method header in Java is constructed from 6 distinct structural components:\n\n```java\n// Method Header Anatomy:\npublic static int calculateSum(int firstNumber, int secondNumber) {\n  // Method Body (Implementation)\n  int total = firstNumber + secondNumber;\n  return total;\n}\n```\n\n1. **Access Modifier (e.g. <code>public</code>, <code>private</code>):** Controls visibility and accessibility from other classes.\n2. **Non-Access Modifier (e.g. <code>static</code>):** Specifies whether the method belongs to the Class itself or to individual Object instances.\n3. **Return Type (e.g. <code>int</code>, <code>double</code>, <code>String</code>, <code>void</code>):** Declares the data type of the value the method returns to the caller. If the method returns nothing, use <code>void</code>.\n4. **Method Name (e.g. <code>calculateSum</code>):** An identifier following standard Java **camelCase** naming conventions (starts with a verb, e.g. <code>getUserName()</code>, <code>sendEmail()</code>).\n5. **Parameter List (e.g. <code>(int firstNumber, int secondNumber)</code>):** Comma-separated list of input variables enclosed in parentheses. If no inputs are required, leave empty <code>()</code>.\n6. **Method Body (<code>{ ... }</code>):** The block of executable statements enclosed in curly braces."
      },
      {
        "heading": "3. The JVM Call Stack & Stack Frames",
        "content": "When a Java program runs, the JVM allocates a dedicated **Call Stack** in memory for each thread:\n- **Stack Frame (Activation Record):** Every time a method is called, the JVM pushes a new **Stack Frame** onto the Call Stack containing:\n  1. Method parameters and local variables.\n  2. The Operand Stack (for intermediate calculations).\n  3. Return address back to the caller.\n- **Frame Popping:** When the method reaches a <code>return</code> statement or finishes its last line, its frame is **popped off the stack**, instantly deallocating all local variables and returning control to the caller.\n\n```\n  CALL STACK EXECUTION:\n  \n  [ add() Frame ]       <--- 3. add(10, 20) executes; returns 30; popped!\n  [ main() Frame ]      <--- 2. main() calls add(10, 20)\n  +------------------+\n  | JVM Call Stack   |  <--- 1. JVM starts program by pushing main()\n  +------------------+\n```"
      },
      {
        "heading": "4. Parameters vs Arguments (Formal vs Actual)",
        "content": "While often used interchangeably in everyday conversation, they have precise technical definitions:\n\n- **Parameters (Formal Parameters):** The placeholder variable names declared in the **method signature definition**.\n  ```java\n  static int add(int first, int second) // \"first\" and \"second\" are PARAMETERS\n  ```\n- **Arguments (Actual Arguments):** The actual concrete literal values, variables, or expressions passed into the method during the **method call invocation**.\n  ```java\n  int result = add(10, 20); // 10 and 20 are ARGUMENTS\n  ```"
      },
      {
        "heading": "5. Variable Arguments: Java Varargs (Type... name)",
        "content": "Introduced in Java 5, **Varargs (Variable Arguments)** allows a method to accept **zero, one, or multiple arguments** without having to manually wrap them in an array:\n\n```java\npublic static int sumAll(int... numbers) { // \"numbers\" is treated as int[] inside\n    int total = 0;\n    for (int n : numbers) total += n;\n    return total;\n}\n\n// Can be called with any number of arguments:\nsumAll();               // 0 args -> returns 0\nsumAll(10, 20);         // 2 args -> returns 30\nsumAll(5, 10, 15, 20);  // 4 args -> returns 50\n```\n\n**Varargs Rules:**\n1. A method can have **at most one** varargs parameter.\n2. The varargs parameter **must be the LAST parameter** in the signature (e.g. <code>(String title, int... scores)</code>)."
      },
      {
        "heading": "6. The Return Statement & Unreachable Code Errors",
        "content": "The <code>return</code> keyword serves two distinct functions:\n1. **Returning a Value:** In non-void methods, it sends the computed result back to the caller (e.g. <code>return first + second;</code>).\n2. **Early Termination:** In <code>void</code> methods, writing <code>return;</code> immediately halts execution and exits the method.\n\n**Unreachable Code Error:**\nAny line written directly below an unconditional <code>return</code> statement can never be executed, causing a compile-time error:\n```java\nstatic int getScore() {\n    return 100;\n    System.out.println(\"Done\"); // COMPILE ERROR: Unreachable code!\n}\n```"
      }
    ],
    "codeExample": "public class Main {\n    // 1. Basic Static Method with Return Value (User requested snippet)\n    static int add(int first, int second) {\n        return first + second;\n    }\n\n    // 2. Method with Multiple Parameters of Different Types\n    static void printStudentProfile(String name, int age, double gpa, boolean isEnrolled) {\n        System.out.println(\"  Name      : \" + name);\n        System.out.println(\"  Age       : \" + age + \" years\");\n        System.out.printf(\"  GPA       : %.2f%n\", gpa);\n        System.out.println(\"  Enrolled  : \" + (isEnrolled ? \"Active\" : \"Graduated\"));\n    }\n\n    // 3. Early Return Demonstration (Input Validation Guard)\n    static void processWithdrawal(double balance, double amount) {\n        if (amount <= 0) {\n            System.out.println(\"  [ERROR] Invalid withdrawal amount: $\" + amount);\n            return; // Early exit\n        }\n        if (amount > balance) {\n            System.out.println(\"  [ERROR] Insufficient funds! Balance: $\" + balance);\n            return; // Early exit\n        }\n        double remaining = balance - amount;\n        System.out.printf(\"  [SUCCESS] Withdrew $%.2f. New Balance: $%.2f%n\", amount, remaining);\n    }\n\n    // 4. Varargs Method (Variable Arguments)\n    static int calculateTotal(int... scores) {\n        int sum = 0;\n        for (int s : scores) {\n            sum += s;\n        }\n        return sum;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. Primary User Snippet Demo ===\");\n        int result = add(10, 20);\n        System.out.println(\"add(10, 20) Result        : \" + result);\n\n        System.out.println(\"\n=== 2. Multi-Parameter Method Call ===\");\n        printStudentProfile(\"Ravi Kumar\", 21, 3.85, true);\n\n        System.out.println(\"\n=== 3. Early Return Guard Execution ===\");\n        processWithdrawal(500.0, -50.0);  // Triggers invalid amount guard\n        processWithdrawal(500.0, 700.0);  // Triggers insufficient funds guard\n        processWithdrawal(500.0, 150.0);  // Successful withdrawal\n\n        System.out.println(\"\n=== 4. Varargs Method Flexibility ===\");\n        System.out.println(\"Sum of 2 items (10, 20)       : \" + calculateTotal(10, 20));\n        System.out.println(\"Sum of 4 items (5, 15, 25, 35): \" + calculateTotal(5, 15, 25, 35));\n        System.out.println(\"Sum of 0 items ()             : \" + calculateTotal());\n    }\n}",
    "output": "=== 1. Primary User Snippet Demo ===\nadd(10, 20) Result        : 30\n\n=== 2. Multi-Parameter Method Call ===\n  Name      : Ravi Kumar\n  Age       : 21 years\n  GPA       : 3.85\n  Enrolled  : Active\n\n=== 3. Early Return Guard Execution ===\n  [ERROR] Invalid withdrawal amount: $-50.0\n  [ERROR] Insufficient funds! Balance: $500.0\n  [SUCCESS] Withdrew $150.00. New Balance: $350.00\n\n=== 4. Varargs Method Flexibility ===\nSum of 2 items (10, 20)       : 30\nSum of 4 items (5, 15, 25, 35): 80\nSum of 0 items ()             : 0",
    "lineByLine": [
      {
        "line": "static int add(int first, int second)",
        "explanation": "Declares a static method taking two integer parameters and returning an integer sum to the caller."
      },
      {
        "line": "int result = add(10, 20);",
        "explanation": "Invokes add() by passing actual arguments 10 and 20, storing the returned value 30 into variable result."
      },
      {
        "line": "if (amount > balance) return;",
        "explanation": "Uses an early return guard to exit the method immediately if business validation fails, preventing invalid state."
      },
      {
        "line": "static int calculateTotal(int... scores)",
        "explanation": "Uses Java varargs syntax to accept any number of integer inputs, automatically packaging them into an array internally."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    // Industry Simulation: E-Commerce Order Discount Calculator\n    public static double applyCoupon(double orderTotal, String couponCode) {\n        if (orderTotal <= 0) return 0.0;\n        if (couponCode == null || couponCode.isBlank()) return orderTotal;\n\n        return switch (couponCode.toUpperCase().trim()) {\n            case \"WELCOME20\" -> orderTotal * 0.80; // 20% off\n            case \"FREESHIP\"  -> Math.max(0.0, orderTotal - 15.0); // $15 off\n            case \"VIP50\"     -> orderTotal >= 200.0 ? orderTotal * 0.50 : orderTotal;\n            default          -> orderTotal;\n        };\n    }\n\n    public static void main(String[] args) {\n        double cart = 250.0;\n        System.out.println(\"=== Checkout Discount Service ===\");\n        System.out.printf(\"Original Cart : $%.2f%n\", cart);\n        System.out.printf(\"WELCOME20     : $%.2f%n\", applyCoupon(cart, \"WELCOME20\"));\n        System.out.printf(\"VIP50 Discount: $%.2f%n\", applyCoupon(cart, \"VIP50\"));\n        System.out.printf(\"Invalid Coupon: $%.2f%n\", applyCoupon(cart, \"EXPIRED99\"));\n    }\n}",
    "practicalOutput": "=== Checkout Discount Service ===\nOriginal Cart : $250.00\nWELCOME20     : $200.00\nVIP50 Discount: $125.00\nInvalid Coupon: $250.00",
    "commonMistakes": [
      "Missing a return statement in a non-void method path (e.g. having an if-statement without an else return), causing compile error.",
      "Placing code below an unconditional return statement, resulting in \"Unreachable code\" compiler errors.",
      "Placing the varargs parameter before other parameters (e.g. `(int... nums, String name)` is illegal; it must be last).",
      "Confusing parameter order during method invocation (e.g. passing `(age, name)` when the method expects `(name, age)`)."
    ],
    "challenge": "// Coding Challenge:\n// Write a method isPrime(int n) that:\n// 1. Returns false for n <= 1.\n// 2. Returns true if n is prime, false otherwise using an optimal loop up to Math.sqrt(n).\n// 3. In main(), count how many prime numbers exist between 1 and 50 using this method.\n\npublic class Challenge {\n    public static boolean isPrime(int n) {\n        if (n <= 1) return false;\n        if (n == 2) return true;\n        if (n % 2 == 0) return false;\n        for (int i = 3; i <= Math.sqrt(n); i += 2) {\n            if (n % i == 0) return false;\n        }\n        return true;\n    }\n\n    public static void main(String[] args) {\n        int primeCount = 0;\n        for (int i = 1; i <= 50; i++) {\n            if (isPrime(i)) {\n                primeCount++;\n            }\n        }\n        System.out.println(\"Total Primes between 1 and 50: \" + primeCount);\n    }\n}",
    "faq": [
      {
        "q": "What is the difference between a Function and a Method?",
        "a": "In computer science, a function is an independent subprogram that can exist outside any class. In Java, because everything belongs to a class or interface, all functions are technically called **Methods**."
      },
      {
        "q": "What is the difference between static and non-static methods?",
        "a": "A `static` method belongs to the class itself and can be called directly without creating an object (`Math.sqrt()`, `Main.add()`). A non-static (instance) method belongs to a specific object and requires instantiation (`new Student().getName()`)."
      },
      {
        "q": "What happens to local variables when a method finishes execution?",
        "a": "When a method returns, its Stack Frame is immediately popped from the JVM Call Stack, and all local variables allocated inside that frame are instantly reclaimed in O(1) time."
      }
    ],
    "recap": [
      "Methods encapsulate reusable logic, enforcing the DRY (Don't Repeat Yourself) engineering principle.",
      "Method anatomy consists of access modifier, static modifier, return type, name, parameters, and body.",
      "Every method call allocates a Stack Frame on the JVM Call Stack which is popped upon returning.",
      "Formal parameters are defined in the signature; actual arguments are supplied during invocation.",
      "Java Varargs (`Type... name`) enables variable-length argument lists, but must always be the final parameter."
    ]
  },
  {
    "num": 34,
    "phaseId": "phase8",
    "phaseTitle": "Phase 8: Methods & Recursion",
    "slug": "34-java-pass-by-value-and-variable-scope",
    "title": "Java Pass-by-Value Mechanics & Variable Scope Deep Dive",
    "badge": "34. Pass-by-Value & Scope",
    "subtopics": "The Ultimate Truth: Java is Strictly Pass-by-Value · Primitive Pass-by-Value · Object Reference Pass-by-Value · Mutating vs Reassigning Objects · Block vs Method Scope · Variable Shadowing · Memory Stack & Heap Diagrams",
    "readTime": "24 min read",
    "intro": "Mastering Java's memory evaluation model: resolving the classic pass-by-value vs pass-by-reference confusion once and for all, understanding how primitive bits vs object memory addresses are copied, mutating object state versus reassigning reference pointers, and exploring block, method, and loop variable scopes.",
    "theorySections": [
      {
        "heading": "1. The Golden Rule: Java is ALWAYS Strictly Pass-by-Value!",
        "content": "One of the most frequently misunderstood concepts in Java is parameter passing.\n\n**The Absolute Rule:**\n**Java is ALWAYS 100% strictly Pass-by-Value.** There is NO \"pass-by-reference\" mechanism in Java!\n\nWhen you pass an argument to a method:\n- **For Primitives (`int`, `double`, `boolean`):** The JVM makes a **copy of the raw binary bits**. Any modification inside the method affects ONLY the local copy.\n- **For Objects (`int[]`, `String`, `Student`):** The JVM makes a **copy of the reference address (pointer)**.\n  - If you use that copied address to modify the object's internal fields (`arr[0] = 99`), the change is reflected in Heap memory.\n  - If you **reassign the reference variable** (`arr = new int[5]`), you only point your local copy to a new address—the caller's original reference remains completely untouched!"
      },
      {
        "heading": "2. Primitive Pass-by-Value Proof",
        "content": "```java\nstatic void modify(int x) {\n    x = 99; // Modifies local stack variable 'x' only!\n}\n\npublic static void main(String[] args) {\n    int number = 10;\n    modify(number);\n    System.out.println(number); // Prints 10 (NOT 99!)\n}\n```\n\n```\n  STACK MEMORY (Primitive):\n  +-------------------------+\n  | modify() Frame: [x=99]  | <--- Modifies copy; popped upon return!\n  +-------------------------+\n  | main() Frame: [num=10]  | <--- Original value 10 unchanged\n  +-------------------------+\n```"
      },
      {
        "heading": "3. Object Reference Pass-by-Value: Mutating vs Reassigning",
        "content": "```java\n// Case A: MUTATING OBJECT STATE (Changes ARE visible to caller)\nstatic void changeFirstElement(int[] arr) {\n    arr[0] = 999; // Follows copied address to Heap and modifies index 0\n}\n\n// Case B: REASSIGNING REFERENCE (Changes ARE NOT visible to caller)\nstatic void reassignArray(int[] arr) {\n    arr = new int[]{100, 200, 300}; // Reassigns local parameter to a new heap object\n}\n```\n\n```\n  STACK (main)            STACK (reassignArray)              HEAP MEMORY\n  +---------------+       +---------------+            +---------------------+\n  | data = 0x5000 |       | arr = 0x8800  | ---------> | [100, 200, 300]     |\n  +-------|-------+       +---------------+            +---------------------+\n          |\n          +------------------------------------------> +---------------------+\n                                                       | [1, 2, 3, 4, 5]     |\n                                                       +---------------------+\n```"
      },
      {
        "heading": "4. Variable Scope & Lifetime in Java",
        "content": "A variable's **Scope** defines the region of code where that variable is accessible and recognized by the compiler:\n\n1. **Method Scope (Local Variables):** Declared inside a method. Born when the method is invoked; destroyed when the method returns.\n2. **Block Scope (`{ ... }`):** Variables declared inside an `if`, `for`, or arbitrary `{ }` block exist only between those opening and closing braces.\n3. **Loop Variable Scope:** `for (int i = 0; ...)` variable `i` exists exclusively inside the loop body.\n\n```java\nvoid example() {\n    int x = 10; // Method scope\n    if (x > 5) {\n        int y = 20; // Block scope (Only accessible inside if-block)\n        System.out.println(x + y); // OK\n    }\n    // System.out.println(y); // COMPILE ERROR: y is out of scope!\n}\n```"
      },
      {
        "heading": "5. Variable Shadowing",
        "content": "**Variable Shadowing** occurs when a local variable in an inner scope has the exact same name as a variable in an outer class scope:\n\n```java\npublic class ShadowDemo {\n    static int count = 100; // Class-level field\n\n    static void print() {\n        int count = 5; // Local variable shadows class field!\n        System.out.println(count); // Prints 5 (Local variable wins!)\n        System.out.println(ShadowDemo.count); // Prints 100 (Explicit class scope)\n    }\n}\n```"
      }
    ],
    "codeExample": "import java.util.Arrays;\n\npublic class Main {\n    // 1. Primitive Pass-by-Value Test\n    static void tryToModifyPrimitive(int value) {\n        value = 999;\n        System.out.println(\"  Inside method (primitive) : \" + value);\n    }\n\n    // 2. Object Mutation Test (Modifies Heap Object Content)\n    static void modifyArrayContent(int[] arr) {\n        arr[0] = 777; // Modifies slot in Heap memory\n        System.out.println(\"  Inside method (mutated)   : \" + Arrays.toString(arr));\n    }\n\n    // 3. Object Reassignment Test (Rebinds Local Reference Variable)\n    static void tryToReassignReference(int[] arr) {\n        arr = new int[]{99, 99, 99}; // Local variable now points to new heap object\n        System.out.println(\"  Inside method (reassigned): \" + Arrays.toString(arr));\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. Primitive Pass-by-Value ===\");\n        int score = 50;\n        System.out.println(\"Before method call          : \" + score);\n        tryToModifyPrimitive(score);\n        System.out.println(\"After method call           : \" + score + \" (Unchanged!)\");\n\n        System.out.println(\"\n=== 2. Object Mutation via Copied Reference ===\");\n        int[] scores = {10, 20, 30};\n        System.out.println(\"Before method call          : \" + Arrays.toString(scores));\n        modifyArrayContent(scores);\n        System.out.println(\"After method call           : \" + Arrays.toString(scores) + \" (Slot 0 Changed!)\");\n\n        System.out.println(\"\n=== 3. Object Reassignment (Pass-by-Value Proof) ===\");\n        int[] originalArray = {1, 2, 3};\n        System.out.println(\"Before reassignment call    : \" + Arrays.toString(originalArray));\n        tryToReassignReference(originalArray);\n        System.out.println(\"After reassignment call     : \" + Arrays.toString(originalArray) + \" (Reference Unchanged!)\");\n\n        System.out.println(\"\n=== 4. Block Scope Demonstration ===\");\n        int outerX = 100;\n        {\n            int innerY = 500;\n            System.out.println(\"Inside block: outerX + innerY = \" + (outerX + innerY));\n        }\n        // innerY is unreachable here; outerX remains valid\n        System.out.println(\"Outside block: outerX = \" + outerX);\n    }\n}",
    "output": "=== 1. Primitive Pass-by-Value ===\nBefore method call          : 50\n  Inside method (primitive) : 999\nAfter method call           : 50 (Unchanged!)\n\n=== 2. Object Mutation via Copied Reference ===\nBefore method call          : [10, 20, 30]\n  Inside method (mutated)   : [777, 20, 30]\nAfter method call           : [777, 20, 30] (Slot 0 Changed!)\n\n=== 3. Object Reassignment (Pass-by-Value Proof) ===\nBefore reassignment call    : [1, 2, 3]\n  Inside method (reassigned): [99, 99, 99]\nAfter reassignment call     : [1, 2, 3] (Reference Unchanged!)\n\n=== 4. Block Scope Demonstration ===\nInside block: outerX + innerY = 600\nOutside block: outerX = 100",
    "lineByLine": [
      {
        "line": "tryToModifyPrimitive(score);",
        "explanation": "Copies the raw value 50 into the parameter \"value\". Changes inside the method do not affect \"score\"."
      },
      {
        "line": "arr[0] = 777;",
        "explanation": "Follows the copied reference address to the shared Heap array and updates slot 0, which is visible to the caller."
      },
      {
        "line": "arr = new int[]{99, 99, 99};",
        "explanation": "Reassigns the local parameter variable to point to a new Heap object, leaving the caller's original array reference untouched."
      },
      {
        "line": "int innerY = 500;",
        "explanation": "Demonstrates block scope: innerY exists only within the enclosing curly braces and is destroyed at the closing brace."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    // Industry Simulation: User Profile Sanitizer\n    static class UserProfile {\n        String username;\n        String email;\n        UserProfile(String u, String e) { this.username = u; this.email = e; }\n    }\n\n    public static void sanitizeProfile(UserProfile profile) {\n        if (profile == null) return;\n        // Mutating fields via shared reference address\n        profile.username = profile.username.trim().toLowerCase();\n        profile.email = profile.email.trim().toLowerCase();\n    }\n\n    public static void main(String[] args) {\n        UserProfile user = new UserProfile(\"  Admin_User2026 \", \"  Support@Company.ORG \");\n        System.out.println(\"=== Before Sanitization ===\");\n        System.out.println(\"Username: [\" + user.username + \"], Email: [\" + user.email + \"]\");\n\n        sanitizeProfile(user);\n\n        System.out.println(\"\n=== After Sanitization ===\");\n        System.out.println(\"Username: [\" + user.username + \"], Email: [\" + user.email + \"]\");\n    }\n}",
    "practicalOutput": "=== Before Sanitization ===\nUsername: [  Admin_User2026 ], Email: [  Support@Company.ORG ]\n\n=== After Sanitization ===\nUsername: [admin_user2026], Email: [support@company.org]",
    "commonMistakes": [
      "Believing Java has \"Pass-by-Reference\" because mutating object fields works. Java passes the *reference by value*!",
      "Trying to swap two primitive variables with a `swap(a, b)` method. In Java, primitives cannot be swapped via helper methods without returning an array or object container.",
      "Attempting to access a loop counter `i` outside its `for` loop body.",
      "Reassigning a method parameter expecting the caller's variable to point to the new object."
    ],
    "challenge": "// Coding Challenge:\n// Write a method swapFirstAndLast(int[] arr) that swaps the first and last elements of an array.\n// Verify that the change persists in the caller's main() method.\n\npublic class Challenge {\n    public static void swapFirstAndLast(int[] arr) {\n        if (arr == null || arr.length < 2) return;\n        int temp = arr[0];\n        arr[0] = arr[arr.length - 1];\n        arr[arr.length - 1] = temp;\n    }\n\n    public static void main(String[] args) {\n        int[] data = {100, 20, 30, 500};\n        System.out.println(\"Before Swap: \" + java.util.Arrays.toString(data));\n        swapFirstAndLast(data);\n        System.out.println(\"After Swap : \" + java.util.Arrays.toString(data));\n    }\n}",
    "faq": [
      {
        "q": "Why can’t I write a swap(int a, int b) method in Java?",
        "a": "Because Java passes primitives strictly by value. The method receives isolated copies of `a` and `b` on its stack frame. Swapping the copies does not affect the variables in the caller's stack frame."
      },
      {
        "q": "How does Pass-by-Value differ from C++ pass-by-reference (&)?",
        "a": "In C++, passing by reference `void func(int &x)` creates an alias directly to the caller's variable in memory. In Java, there are no aliases; an address value is always copied into a new parameter variable."
      },
      {
        "q": "Does String immutability affect pass-by-value?",
        "a": "Yes. When you pass a `String` to a method, you pass a copy of the reference. Because strings are immutable, any method call like `str = str.toUpperCase()` creates a new string and reassigns only the local parameter reference, leaving the caller's string unmodified."
      }
    ],
    "recap": [
      "Java is strictly Pass-by-Value for both primitives and object reference types.",
      "For primitives, raw value bits are copied into the method's stack frame.",
      "For objects, the 64-bit reference address is copied into the parameter.",
      "Mutating an object's fields via its reference modifies the shared Heap object.",
      "Reassigning a parameter reference variable has zero effect on the caller's variable.",
      "Variables are scoped strictly to the block `{}` in which they are declared."
    ]
  },
  {
    "num": 35,
    "phaseId": "phase8",
    "phaseTitle": "Phase 8: Methods & Recursion",
    "slug": "35-java-method-overloading-and-static-vs-instance",
    "title": "Java Method Overloading, Type Promotion & Static vs Instance Methods",
    "badge": "35. Overloading & Static Methods",
    "subtopics": "Method Overloading (Compile-Time Polymorphism) · 3 Valid Overloading Rules · Why Return Type Alone Cannot Overload · Automatic Type Promotion in Overloading · static Methods vs Instance Methods · Memory Allocation of static",
    "readTime": "24 min read",
    "intro": "Mastering polymorphism and method types in Java: understanding method overloading (compile-time / static polymorphism), the 3 strict compiler overloading rules, automatic primitive type promotion hierarchies, and the fundamental architectural distinction between class-level static methods and object-level instance methods.",
    "theorySections": [
      {
        "heading": "1. What is Method Overloading? (Compile-Time Polymorphism)",
        "content": "**Method Overloading** is a feature in Java that allows a class to have **multiple methods with the exact same name**, provided they have **different parameter lists (signatures)**.\n\nIt represents **Compile-Time (Static) Polymorphism** because the Java compiler determines exactly which method to execute during compilation based on the arguments supplied at the call site.\n\n```java\n// Overloaded add() methods providing clean, intuitive API:\nadd(int a, int b)           // Adds two integers\nadd(double a, double b)     // Adds two floating-point numbers\nadd(int a, int b, int c)    // Adds three integers\n```"
      },
      {
        "heading": "2. The 3 Valid Rules for Method Overloading",
        "content": "Two methods in the same class are legally overloaded if they differ in at least one of these 3 criteria:\n\n<div class=\"ref-table-wrap\">\n  <table class=\"ref-table\">\n    <thead>\n      <tr>\n        <th>Rule</th>\n        <th>Example 1</th>\n        <th>Example 2</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><strong>1. Number of Parameters</strong></td>\n        <td><code>add(int a, int b)</code></td>\n        <td><code>add(int a, int b, int c)</code></td>\n      </tr>\n      <tr>\n        <td><strong>2. Data Types of Parameters</strong></td>\n        <td><code>print(int x)</code></td>\n        <td><code>print(String s)</code></td>\n      </tr>\n      <tr>\n        <td><strong>3. Sequence/Order of Types</strong></td>\n        <td><code>log(String msg, int code)</code></td>\n        <td><code>log(int code, String msg)</code></td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n**CRITICAL RULE: Return Type ALONE does NOT allow overloading!**\n```java\n// COMPILE ERROR: Duplicate method!\nint calculate(int a) { return a * 2; }\ndouble calculate(int a) { return a * 2.0; } // Compiler cannot disambiguate calculate(5)!\n```"
      },
      {
        "heading": "3. Automatic Type Promotion in Method Overloading",
        "content": "If no exact matching parameter type is found, Java automatically **promotes** the argument to the next compatible wider type:\n\n$$\\text{byte} \\rightarrow \\text{short} \\rightarrow \\text{int} \\rightarrow \\text{long} \\rightarrow \\text{float} \\rightarrow \\text{double}$$\n\n```java\nstatic void display(double d) { System.out.println(\"Double: \" + d); }\n\n// Calling display with an int literal:\ndisplay(42); // int 42 is automatically promoted to double 42.0!\n```"
      },
      {
        "heading": "4. static Methods vs Instance Methods Architecture",
        "content": "<div class=\"ref-table-wrap\">\n  <table class=\"ref-table\">\n    <thead>\n      <tr>\n        <th>Feature</th>\n        <th><code>static</code> Methods (Class-Level)</th>\n        <th>Instance Methods (Object-Level)</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><strong>Belongs To</strong></td>\n        <td>The <strong>Class</strong> itself (shared globally).</td>\n        <td>Individual <strong>Object instances</strong> on the Heap.</td>\n      </tr>\n      <tr>\n        <td><strong>How to Call</strong></td>\n        <td><code>ClassName.methodName()</code> (No object needed).</td>\n        <td><code>objectReference.methodName()</code> (Requires <code>new</code>).</td>\n      </tr>\n      <tr>\n        <td><strong>Access to <code>this</code></strong></td>\n        <td><strong>CANNOT</strong> use <code>this</code> or <code>super</code>.</td>\n        <td>Can freely use <code>this</code> to access instance fields.</td>\n      </tr>\n      <tr>\n        <td><strong>Access to Fields</strong></td>\n        <td>Can directly access only <code>static</code> variables.</td>\n        <td>Can access both instance and static variables.</td>\n      </tr>\n      <tr>\n        <td><strong>Best Use Case</strong></td>\n        <td>Utility methods, mathematical helpers, factory methods (<code>Math.sqrt()</code>, <code>Arrays.sort()</code>).</td>\n        <td>Behavior that depends on an object's state (<code>account.withdraw()</code>).</td>\n      </tr>\n    </tbody>\n  </table>\n</div>"
      }
    ],
    "codeExample": "public class Main {\n    // -------------------------------------------------------------\n    // OVERLOADED METHODS (Different Parameter Counts & Types)\n    // -------------------------------------------------------------\n    // Version 1: 2 ints\n    static int multiply(int a, int b) {\n        System.out.print(\"  [Called multiply(int, int)]       : \");\n        return a * b;\n    }\n\n    // Version 2: 3 ints (Different parameter count)\n    static int multiply(int a, int b, int c) {\n        System.out.print(\"  [Called multiply(int, int, int)]  : \");\n        return a * b * c;\n    }\n\n    // Version 3: 2 doubles (Different data types)\n    static double multiply(double a, double b) {\n        System.out.print(\"  [Called multiply(double, double)] : \");\n        return a * b;\n    }\n\n    // -------------------------------------------------------------\n    // STATIC vs INSTANCE DEMONSTRATION\n    // -------------------------------------------------------------\n    static class BankAccount {\n        static String bankName = \"Global Federal Bank\"; // Static class variable\n        double balance;                                 // Instance variable\n\n        BankAccount(double b) { this.balance = b; }\n\n        // Static Method (Class-level utility)\n        static void printBankInfo() {\n            System.out.println(\"  Bank Organization: \" + bankName);\n            // System.out.println(balance); // COMPILE ERROR: Cannot access non-static field!\n        }\n\n        // Instance Method (Object-level behavior)\n        void deposit(double amount) {\n            this.balance += amount;\n            System.out.printf(\"  Deposited $%.2f. New Balance: $%.2f%n\", amount, this.balance);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. Method Overloading in Action ===\");\n        System.out.println(multiply(4, 5));\n        System.out.println(multiply(2, 3, 4));\n        System.out.println(multiply(2.5, 4.0));\n\n        System.out.println(\"\n=== 2. Type Promotion in Overloading ===\");\n        // Passing float and int -> promoted to multiply(double, double)\n        System.out.println(multiply(3.5f, 2));\n\n        System.out.println(\"\n=== 3. Static Method Call (No Object Needed) ===\");\n        BankAccount.printBankInfo(); // Called directly via Class name\n\n        System.out.println(\"\n=== 4. Instance Method Call (Requires Object) ===\");\n        BankAccount account = new BankAccount(1000.0);\n        account.deposit(250.0);\n    }\n}",
    "output": "=== 1. Method Overloading in Action ===\n  [Called multiply(int, int)]       : 20\n  [Called multiply(int, int, int)]  : 24\n  [Called multiply(double, double)] : 10.0\n\n=== 2. Type Promotion in Overloading ===\n  [Called multiply(double, double)] : 7.0\n\n=== 3. Static Method Call (No Object Needed) ===\n  Bank Organization: Global Federal Bank\n\n=== 4. Instance Method Call (Requires Object) ===\n  Deposited $250.00. New Balance: $1250.00",
    "lineByLine": [
      {
        "line": "static int multiply(int a, int b)",
        "explanation": "Defines the base integer multiplication method taking 2 parameters."
      },
      {
        "line": "static double multiply(double a, double b)",
        "explanation": "Overloads multiply with floating-point types; compiler resolves calls based on argument types."
      },
      {
        "line": "multiply(3.5f, 2);",
        "explanation": "Demonstrates type promotion: the float and int are automatically widened to double matching the double overload."
      },
      {
        "line": "BankAccount.printBankInfo();",
        "explanation": "Invokes a static method directly using the class name without allocating any heap object."
      },
      {
        "line": "account.deposit(250.0);",
        "explanation": "Invokes an instance method on a specific BankAccount object, modifying that object's internal balance field."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    // Industry Simulation: Payment Processing Gateway\n    public static class PaymentGateway {\n        // Pay via Credit Card\n        public static String processPayment(String cardNumber, String cvv, double amount) {\n            return String.format(\"[CARD] Charged $%.2f to card ending in %s\",\n                    amount, cardNumber.substring(cardNumber.length() - 4));\n        }\n\n        // Pay via UPI ID (Overloaded)\n        public static String processPayment(String upiId, double amount) {\n            return String.format(\"[UPI] Requested $%.2f from UPI ID: %s\", amount, upiId);\n        }\n\n        // Pay via Wallet with Promo Code (Overloaded)\n        public static String processPayment(String walletId, double amount, String promoCode) {\n            double finalAmount = promoCode.equals(\"SAVE10\") ? amount * 0.90 : amount;\n            return String.format(\"[WALLET] Charged $%.2f (Promo: %s) to %s\",\n                    finalAmount, promoCode, walletId);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== Payment Gateway Overloaded Dispatch ===\");\n        System.out.println(PaymentGateway.processPayment(\"4111222233334567\", \"123\", 149.99));\n        System.out.println(PaymentGateway.processPayment(\"developer@upi\", 49.00));\n        System.out.println(PaymentGateway.processPayment(\"PAYTM_WALLET_88\", 100.0, \"SAVE10\"));\n    }\n}",
    "practicalOutput": "=== Payment Gateway Overloaded Dispatch ===\n[CARD] Charged $149.99 to card ending in 4567\n[UPI] Requested $49.00 from UPI ID: developer@upi\n[WALLET] Charged $90.00 (Promo: SAVE10) to PAYTM_WALLET_88",
    "commonMistakes": [
      "Attempting to overload a method by changing only the return type, resulting in a duplicate method compile error.",
      "Attempting to access non-static instance fields directly from a static method without an object reference.",
      "Creating ambiguous overloads (e.g. `test(int, long)` and `test(long, int)`), causing compilation failure when calling `test(5, 5)`.",
      "Forgetting that `static` methods cannot be overridden with dynamic polymorphism (they can only be hidden)."
    ],
    "challenge": "// Coding Challenge:\n// Create an overloaded area() utility method:\n// 1. area(double radius) -> Returns circle area: Math.PI * r * r\n// 2. area(double length, double width) -> Returns rectangle area: l * w\n// 3. area(double base, double height, boolean isTriangle) -> Returns triangle area: 0.5 * b * h\n\npublic class Challenge {\n    public static double area(double radius) {\n        return Math.PI * radius * radius;\n    }\n\n    public static double area(double length, double width) {\n        return length * width;\n    }\n\n    public static double area(double base, double height, boolean isTriangle) {\n        return 0.5 * base * height;\n    }\n\n    public static void main(String[] args) {\n        System.out.printf(\"Circle Area (r=5)     : %.2f%n\", area(5.0));\n        System.out.printf(\"Rectangle Area (4x6)  : %.2f%n\", area(4.0, 6.0));\n        System.out.printf(\"Triangle Area (b=4,h=5): %.2f%n\", area(4.0, 5.0, true));\n    }\n}",
    "faq": [
      {
        "q": "Why can’t we overload methods by changing only the return type in Java?",
        "a": "Because when invoking a method like `calculate(5);` without assigning its return value, the compiler has no way to know which return type version was intended, creating grammatical ambiguity."
      },
      {
        "q": "Can main() method be overloaded in Java?",
        "a": "Yes! You can define `public static void main(int[] args)` or `public static void main(String arg)`. However, the JVM will only call the standard `public static void main(String[] args)` as the application entry point."
      },
      {
        "q": "Can static methods access instance methods?",
        "a": "No, not directly. A static method executes in class scope without any `this` reference. It can only call an instance method if it explicitly creates an object instance first (`new MyClass().instanceMethod()`)."
      }
    ],
    "recap": [
      "Method overloading enables multiple methods with the same name but differing parameter counts, types, or order.",
      "Overloading is resolved at compile time (Static Polymorphism).",
      "Changing the return type alone is NOT valid method overloading in Java.",
      "`static` methods belong to the class and are called without creating objects (`Math.max()`).",
      "Instance methods belong to object instances and can access instance variables via `this`."
    ]
  },
  {
    "num": 36,
    "phaseId": "phase8",
    "phaseTitle": "Phase 8: Methods & Recursion",
    "slug": "36-java-recursion-and-stack-overflow",
    "title": "Java Recursion & Call Stack Lifecycle Masterclass",
    "badge": "36. Recursion & StackOverflow",
    "subtopics": "What is Recursion? · 2 Pillars: Base Case & Recursive Step · Call Stack Winding & Unwinding · StackOverflowError Prevention · Factorial (N!) · Fibonacci Series · Sum of Digits · Recursion vs Iteration Trade-offs",
    "readTime": "26 min read",
    "intro": "Mastering recursive programming in Java: understanding how methods call themselves to solve sub-problems, the essential role of base case anchors, call stack winding and unwinding phases, diagnosing and preventing StackOverflowError, algorithmic implementations (Factorial, Fibonacci, Sum of Digits), and memory performance trade-offs against loops.",
    "theorySections": [
      {
        "heading": "1. What is Recursion in Java?",
        "content": "**Recursion** is a programming technique where a method **calls itself** directly or indirectly to solve a complex problem by breaking it down into smaller, identical sub-problems.\n\nEvery recursive algorithm must contain **Two Essential Pillars**:\n1. **The Base Case (Termination Anchor):** The condition under which the method **stops calling itself** and returns a direct, known answer.\n2. **The Recursive Step:** The statement where the method calls itself with modified arguments that **progressively move closer to the base case**."
      },
      {
        "heading": "2. Call Stack Winding & Unwinding (Factorial Example)",
        "content": "Consider calculating $4! = 4 \\times 3 \\times 2 \\times 1 = 24$:\n\n```java\nstatic int factorial(int n) {\n    if (n <= 1) return 1;          // Base Case\n    return n * factorial(n - 1);    // Recursive Step\n}\n```\n\n```\n  PHASE 1: WINDING (Pushing frames)       PHASE 2: UNWINDING (Popping & computing)\n  \n  [ factorial(1) ] -> Returns 1           [ factorial(1) ] -> Returns 1 (Base reached)\n  [ factorial(2) ] -> 2 * factorial(1)    [ factorial(2) ] -> 2 * 1 = 2\n  [ factorial(3) ] -> 3 * factorial(2)    [ factorial(3) ] -> 3 * 2 = 6\n  [ factorial(4) ] -> 4 * factorial(3)    [ factorial(4) ] -> 4 * 6 = 24 (Final Result!)\n  [ main()       ]                        [ main()       ]\n```"
      },
      {
        "heading": "3. The StackOverflowError (Why It Happens & Prevention)",
        "content": "Each recursive call consumes a **Stack Frame** in the thread's Call Stack (typically 1MB total size).\n\n**When does `StackOverflowError` occur?**\n1. **Missing Base Case:** The method calls itself indefinitely.\n2. **Recursive step doesn't move toward base case:** (e.g. calling `factorial(n)` instead of `factorial(n - 1)`).\n3. **Recursion depth is too deep:** (e.g. $N = 100,000$ recursive calls will exceed standard stack limits).\n\n```java\n// BUG: Infinite recursion causing StackOverflowError!\nstatic void infinite() {\n    infinite(); // Throws java.lang.StackOverflowError\n}\n```"
      },
      {
        "heading": "4. Classic Recursive Algorithms",
        "content": "1. **Fibonacci Numbers ($0, 1, 1, 2, 3, 5, 8, 13, \\dots$):**\n$$F(n) = F(n-1) + F(n-2) \\quad \\text{with } F(0)=0, F(1)=1$$\n\n2. **Sum of Digits:**\nSumming digits of $1234$: $\\text{sum}(1234) = (1234 \\% 10) + \\text{sum}(1234 / 10) = 4 + 3 + 2 + 1 = 10$.\n\n3. **Power Calculation ($a^b$):**\n$$a^b = a \\times a^{b-1} \\quad \\text{with } a^0 = 1$$"
      },
      {
        "heading": "5. Recursion vs Iteration (Loops) Engineering Trade-offs",
        "content": "<div class=\"ref-table-wrap\">\n  <table class=\"ref-table\">\n    <thead>\n      <tr>\n        <th>Attribute</th>\n        <th>Recursion</th>\n        <th>Iteration (Loops)</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><strong>Code Elegance</strong></td>\n        <td>High (Clean mathematical expressions for Trees/Graphs).</td>\n        <td>Can be verbose for complex hierarchical structures.</td>\n      </tr>\n      <tr>\n        <td><strong>Memory Footprint</strong></td>\n        <td>High (Consumes $O(N)$ stack frames).</td>\n        <td><strong>Low ($O(1)$ constant stack memory).</strong></td>\n      </tr>\n      <tr>\n        <td><strong>Speed</strong></td>\n        <td>Slightly slower (Stack push/pop overhead).</td>\n        <td><strong>Fastest</strong> (Direct CPU loop instructions).</td>\n      </tr>\n      <tr>\n        <td><strong>Risk</strong></td>\n        <td><code>StackOverflowError</code> if depth is too large.</td>\n        <td>Infinite loop (Can freeze CPU, but won't overflow stack).</td>\n      </tr>\n    </tbody>\n  </table>\n</div>"
      }
    ],
    "codeExample": "public class Main {\n    // 1. Recursive Factorial (N!)\n    static long factorial(int n) {\n        if (n <= 1) return 1; // Base case\n        return n * factorial(n - 1); // Recursive step\n    }\n\n    // 2. Recursive Fibonacci Number\n    static int fibonacci(int n) {\n        if (n <= 0) return 0; // Base case 1\n        if (n == 1) return 1; // Base case 2\n        return fibonacci(n - 1) + fibonacci(n - 2); // Recursive step\n    }\n\n    // 3. Recursive Sum of Digits\n    static int sumOfDigits(int n) {\n        if (n == 0) return 0; // Base case\n        return (n % 10) + sumOfDigits(n / 10); // Recursive step\n    }\n\n    // 4. Recursive Power Calculation (base^exp)\n    static long power(int base, int exp) {\n        if (exp == 0) return 1; // Base case: a^0 = 1\n        return base * power(base, exp - 1); // Recursive step\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== 1. Factorial via Recursion ===\");\n        System.out.println(\"5! (5 Factorial)              : \" + factorial(5));\n        System.out.println(\"10! (10 Factorial)            : \" + factorial(10));\n\n        System.out.println(\"\n=== 2. Fibonacci Sequence Generation ===\");\n        System.out.print(\"First 8 Fibonacci Numbers     : \");\n        for (int i = 0; i < 8; i++) {\n            System.out.print(fibonacci(i) + \" \");\n        }\n        System.out.println();\n\n        System.out.println(\"\n=== 3. Recursive Sum of Digits ===\");\n        int sampleNumber = 9874;\n        System.out.println(\"Sum of digits for \" + sampleNumber + \"      : \" + sumOfDigits(sampleNumber));\n\n        System.out.println(\"\n=== 4. Recursive Power Calculation ===\");\n        System.out.println(\"2^8 (2 to the power 8)        : \" + power(2, 8));\n        System.out.println(\"5^3 (5 cubed)                 : \" + power(5, 3));\n    }\n}",
    "output": "=== 1. Factorial via Recursion ===\n5! (5 Factorial)              : 120\n10! (10 Factorial)            : 3628800\n\n=== 2. Fibonacci Sequence Generation ===\nFirst 8 Fibonacci Numbers     : 0 1 1 2 3 5 8 13 \n\n=== 3. Recursive Sum of Digits ===\nSum of digits for 9874      : 28\n\n=== 4. Recursive Power Calculation ===\n2^8 (2 to the power 8)        : 256\n5^3 (5 cubed)                 : 125",
    "lineByLine": [
      {
        "line": "if (n <= 1) return 1;",
        "explanation": "The critical base case anchor that terminates recursion when n reaches 1 or 0."
      },
      {
        "line": "return n * factorial(n - 1);",
        "explanation": "Multiplies current n by the result of factorial(n - 1), pushing a new frame onto the stack."
      },
      {
        "line": "fibonacci(n - 1) + fibonacci(n - 2);",
        "explanation": "Binary tree recursion that computes Fibonacci by branching into two recursive sub-calls."
      },
      {
        "line": "(n % 10) + sumOfDigits(n / 10);",
        "explanation": "Extracts the last digit using modulus % 10 and passes the remaining truncated number n / 10 recursively."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    // Industry Simulation: Recursive Directory Folder Size Calculator\n    static class Folder {\n        String name;\n        int directFileSizeKb;\n        Folder[] subFolders;\n\n        Folder(String name, int sizeKb, Folder... subs) {\n            this.name = name;\n            this.directFileSizeKb = sizeKb;\n            this.subFolders = subs != null ? subs : new Folder[0];\n        }\n    }\n\n    public static int calculateTotalFolderSize(Folder folder) {\n        if (folder == null) return 0;\n        int total = folder.directFileSizeKb;\n        for (Folder sub : folder.subFolders) {\n            total += calculateTotalFolderSize(sub); // Recursive tree traversal\n        }\n        return total;\n    }\n\n    public static void main(String[] args) {\n        Folder images = new Folder(\"images\", 450);\n        Folder docs = new Folder(\"docs\", 250);\n        Folder src = new Folder(\"src\", 800, images, docs);\n        Folder projectRoot = new Folder(\"my-app\", 150, src);\n\n        System.out.println(\"=== Disk Space Analyzer (Recursive File Tree) ===\");\n        int totalSize = calculateTotalFolderSize(projectRoot);\n        System.out.println(\"Total Project Size: \" + totalSize + \" KB (~\" + (totalSize / 1024.0) + \" MB)\");\n    }\n}",
    "practicalOutput": "=== Disk Space Analyzer (Recursive File Tree) ===\nTotal Project Size: 1650 KB (~1.611328125 MB)",
    "commonMistakes": [
      "Omitting the base case, leading directly to `java.lang.StackOverflowError`.",
      "Using naive recursion for Fibonacci on large numbers ($N > 45$), which runs in exponential $O(2^N)$ time and freezes.",
      "Modifying static global variables inside recursive methods, causing unintended side effects across winding/unwinding phases.",
      "Passing `n++` instead of `n + 1` or `n - 1` into recursive calls, causing infinite loops."
    ],
    "challenge": "// Coding Challenge:\n// Write a recursive method reverseString(String str) that reverses a string recursively.\n// Base Case: If str is empty or length 1, return str.\n// Recursive Step: return reverseString(str.substring(1)) + str.charAt(0);\n\npublic class Challenge {\n    public static String reverseString(String str) {\n        if (str == null || str.length() <= 1) {\n            return str;\n        }\n        return reverseString(str.substring(1)) + str.charAt(0);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Reversed 'JAVA': \" + reverseString(\"JAVA\")); // \"AVAJ\"\n        System.out.println(\"Reversed 'RECURSION': \" + reverseString(\"RECURSION\"));\n    }\n}",
    "faq": [
      {
        "q": "What causes a StackOverflowError in Java?",
        "a": "Each method call adds a frame to the thread's Call Stack. If a recursive method fails to reach a base case, it keeps allocating frames until the stack memory (typically 1MB) is exhausted, throwing `StackOverflowError`."
      },
      {
        "q": "Can every recursive algorithm be written iteratively with loops?",
        "a": "Yes! According to the Church-Turing thesis, any recursive algorithm can be rewritten using an iterative loop and an explicit stack data structure."
      },
      {
        "q": "What is Tail Call Optimization (TCO) and does Java support it?",
        "a": "TCO allows compilers to reuse the current stack frame for recursive calls if the call is the very last operation. Standard JVMs (HotSpot) do NOT currently perform automatic TCO, which is why loops are preferred for deep iterations."
      }
    ],
    "recap": [
      "Recursion solves problems by having a method call itself with smaller inputs.",
      "Every recursive method requires a Base Case to stop and a Recursive Step to progress.",
      "Execution consists of a Winding phase (pushing stack frames) and an Unwinding phase (popping and returning values).",
      "Missing or unreachable base cases cause `StackOverflowError`.",
      "Use iteration for linear counters and recursion for hierarchical structures like trees and graphs."
    ]
  },
  {
    "num": 37,
    "phaseId": "phase8",
    "phaseTitle": "Phase 8: Methods & Recursion",
    "slug": "37-java-methods-capstone-projects-and-best-practices",
    "title": "Java Methods Capstone Projects: 4 Production-Grade Modular Systems",
    "badge": "37. Capstone Projects (4) & Best Practices",
    "subtopics": "Javadoc Documentation (@param, @return, @throws) · Clean Code & Single Responsibility · Project 1: Scientific Calculator · Project 2: Student Academic & GPA Suite · Project 3: Core Banking Operations · Project 4: Enterprise CommonUtils Library",
    "readTime": "30 min read",
    "intro": "Building 4 complete, production-grade modular software systems in Java: an industrial scientific calculator, a comprehensive student academic grading and GPA calculator, a secure banking transactions engine, and an enterprise utility library, while mastering industry Javadoc documentation and clean method architecture.",
    "theorySections": [
      {
        "heading": "1. Professional Javadoc Method Documentation Standards",
        "content": "In enterprise software, methods are documented using **Javadoc comments** (<code>/** ... */</code>) to generate official API documentation:\n\n```java\n/**\n * Calculates compound interest for a given principal and rate.\n *\n * @param principal The initial deposited amount in USD (must be > 0).\n * @param annualRate The annual interest rate percentage (e.g. 7.5 for 7.5%).\n * @param years The investment duration in years.\n * @return The final compounded balance after the specified duration.\n * @throws IllegalArgumentException if principal <= 0 or years < 1.\n */\npublic static double calculateCompoundInterest(double principal, double annualRate, int years) {\n    if (principal <= 0 || years < 1) {\n        throw new IllegalArgumentException(\"Invalid principal or years\");\n    }\n    return principal * Math.pow(1 + (annualRate / 100.0), years);\n}\n```"
      },
      {
        "heading": "2. Clean Code Principles for Java Methods",
        "content": "1. **Single Responsibility Principle (SRP):** A method should do **one thing and do it exceptionally well**. If a method calculates tax, saves to database, and sends an email, split it into 3 separate methods!\n2. **Small Method Size:** Ideal production methods are between **5 to 20 lines** long.\n3. **Descriptive Verb-Noun Naming:** Use clear intentions: <code>sendNotification()</code>, <code>validatePassword()</code>, <code>calculateNetPay()</code>.\n4. **Minimize Parameter Count:** Strive for 0 to 3 parameters. If you need 7 parameters, group them into a dedicated configuration object."
      }
    ],
    "codeExample": "import java.util.Arrays;\n\npublic class Main {\n    // -------------------------------------------------------------\n    // PROJECT 1: Modular Scientific Calculator Engine\n    // -------------------------------------------------------------\n    public static class Calculator {\n        public static double add(double a, double b) { return a + b; }\n        public static double subtract(double a, double b) { return a - b; }\n        public static double multiply(double a, double b) { return a * b; }\n        public static double divide(double a, double b) {\n            if (b == 0) {\n                System.out.println(\"  [ERROR] Cannot divide by zero!\");\n                return Double.NaN;\n            }\n            return a / b;\n        }\n        public static double power(double base, double exp) { return Math.pow(base, exp); }\n        public static double modulus(double a, double b) { return a % b; }\n    }\n\n    // -------------------------------------------------------------\n    // PROJECT 2: Student Academic & GPA Suite\n    // -------------------------------------------------------------\n    public static class StudentGrader {\n        public static int calculateTotal(int[] marks) {\n            int total = 0;\n            for (int m : marks) total += m;\n            return total;\n        }\n\n        public static double calculatePercentage(int[] marks, int maxPerSubject) {\n            int total = calculateTotal(marks);\n            int maxTotal = marks.length * maxPerSubject;\n            return ((double) total / maxTotal) * 100.0;\n        }\n\n        public static char determineLetterGrade(double percentage) {\n            if (percentage >= 90) return 'A';\n            if (percentage >= 80) return 'B';\n            if (percentage >= 70) return 'C';\n            if (percentage >= 60) return 'D';\n            return 'F';\n        }\n\n        public static double calculateGPA(double percentage) {\n            return Math.min(4.0, (percentage / 100.0) * 4.0);\n        }\n    }\n\n    // -------------------------------------------------------------\n    // PROJECT 3: Core Banking Operations Engine\n    // -------------------------------------------------------------\n    public static class BankService {\n        public static double deposit(double currentBalance, double amount) {\n            if (amount <= 0) {\n                System.out.println(\"  [BANK ERROR] Invalid deposit amount: $\" + amount);\n                return currentBalance;\n            }\n            return currentBalance + amount;\n        }\n\n        public static double withdraw(double currentBalance, double amount) {\n            if (amount <= 0 || amount > currentBalance) {\n                System.out.println(\"  [BANK ERROR] Withdrawal denied! Insufficient funds or invalid amount.\");\n                return currentBalance;\n            }\n            return currentBalance - amount;\n        }\n\n        public static boolean transferFunds(double[] senderBalance, double[] receiverBalance, double amount) {\n            if (amount <= 0 || senderBalance[0] < amount) {\n                return false; // Transfer rejected\n            }\n            senderBalance[0] -= amount;\n            receiverBalance[0] += amount;\n            return true;\n        }\n    }\n\n    // -------------------------------------------------------------\n    // PROJECT 4: Enterprise CommonUtils Library\n    // -------------------------------------------------------------\n    public static class CommonUtils {\n        public static boolean isValidEmail(String email) {\n            if (email == null || email.isBlank()) return false;\n            return email.matches(\"^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$\");\n        }\n\n        public static String maskCreditCard(String cardNum) {\n            if (cardNum == null || cardNum.length() < 4) return \"****\";\n            String clean = cardNum.replaceAll(\"[^0-9]\", \"\");\n            return \"****-****-****-\" + clean.substring(clean.length() - 4);\n        }\n\n        public static String formatCurrency(double amount) {\n            return String.format(\"$%,.2f\", amount);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"=== PROJECT 1: Calculator Engine ===\");\n        System.out.println(\"  10.5 + 4.5  = \" + Calculator.add(10.5, 4.5));\n        System.out.println(\"  15.0 / 3.0  = \" + Calculator.divide(15.0, 3.0));\n        System.out.println(\"  2.0 ^ 10.0  = \" + Calculator.power(2.0, 10.0));\n        Calculator.divide(10.0, 0); // Tests error guard\n\n        System.out.println(\"\n=== PROJECT 2: Student Academic & GPA Suite ===\");\n        int[] studentMarks = {88, 92, 79, 95, 84};\n        int totalMarks = StudentGrader.calculateTotal(studentMarks);\n        double percentage = StudentGrader.calculatePercentage(studentMarks, 100);\n        char grade = StudentGrader.determineLetterGrade(percentage);\n        double gpa = StudentGrader.calculateGPA(percentage);\n\n        System.out.println(\"  Total Marks : \" + totalMarks + \"/500\");\n        System.out.printf(\"  Percentage  : %.2f%%%n\", percentage);\n        System.out.println(\"  Grade       : \" + grade);\n        System.out.printf(\"  GPA (4.0)   : %.2f%n\", gpa);\n\n        System.out.println(\"\n=== PROJECT 3: Core Banking Operations ===\");\n        double myAccount = 1000.0;\n        myAccount = BankService.deposit(myAccount, 500.0);\n        myAccount = BankService.withdraw(myAccount, 200.0);\n        System.out.println(\"  Final My Account Balance: \" + CommonUtils.formatCurrency(myAccount));\n\n        double[] alice = {1200.0};\n        double[] bob = {300.0};\n        boolean txStatus = BankService.transferFunds(alice, bob, 400.0);\n        System.out.println(\"  Transfer $400 from Alice to Bob : Success=\" + txStatus);\n        System.out.println(\"  Alice New Balance              : \" + CommonUtils.formatCurrency(alice[0]));\n        System.out.println(\"  Bob New Balance                : \" + CommonUtils.formatCurrency(bob[0]));\n\n        System.out.println(\"\n=== PROJECT 4: Enterprise CommonUtils ===\");\n        System.out.println(\"  Email 'dev@google.com' Valid : \" + CommonUtils.isValidEmail(\"dev@google.com\"));\n        System.out.println(\"  Email 'invalid-email' Valid  : \" + CommonUtils.isValidEmail(\"invalid-email\"));\n        System.out.println(\"  Masked CC Number             : \" + CommonUtils.maskCreditCard(\"4111-2222-3333-8945\"));\n        System.out.println(\"  Formatted Large Currency     : \" + CommonUtils.formatCurrency(1250450.75));\n    }\n}",
    "output": "=== PROJECT 1: Calculator Engine ===\n  10.5 + 4.5  = 15.0\n  15.0 / 3.0  = 5.0\n  2.0 ^ 10.0  = 1024.0\n  [ERROR] Cannot divide by zero!\n\n=== PROJECT 2: Student Academic & GPA Suite ===\n  Total Marks : 438/500\n  Percentage  : 87.60%\n  Grade       : B\n  GPA (4.0)   : 3.50\n\n=== PROJECT 3: Core Banking Operations ===\n  Final My Account Balance: $1,300.00\n  Transfer $400 from Alice to Bob : Success=true\n  Alice New Balance              : $800.00\n  Bob New Balance                : $700.00\n\n=== PROJECT 4: Enterprise CommonUtils ===\n  Email 'dev@google.com' Valid : true\n  Email 'invalid-email' Valid  : false\n  Masked CC Number             : ****-****-****-8945\n  Formatted Large Currency     : $1,250,450.75",
    "lineByLine": [
      {
        "line": "Calculator.divide(15.0, 3.0);",
        "explanation": "Calls static division utility with zero-division validation guard."
      },
      {
        "line": "StudentGrader.calculatePercentage(...)",
        "explanation": "Composes calculateTotal() to compute percentage and subsequent GPA mapping."
      },
      {
        "line": "BankService.transferFunds(alice, bob, 400.0);",
        "explanation": "Demonstrates multi-party atomic transaction using array reference containers."
      },
      {
        "line": "CommonUtils.maskCreditCard(\"4111-2222-3333-8945\");",
        "explanation": "Strips non-digit characters and masks leading digits for security compliance."
      }
    ],
    "practicalExample": "public class PracticalApplication {\n    public static void main(String[] args) {\n        // Industry Simulation: Payroll Disburser Service\n        String[] employees = {\"Ravi Teja\", \"Priya Sharma\", \"Kiran Kumar\"};\n        double[] baseSalaries = {4500.0, 6200.0, 3800.0};\n        double bonusRate = 0.15; // 15% bonus\n\n        System.out.println(\"=== Corporate Payroll Processing Engine ===\");\n        for (int i = 0; i < employees.length; i++) {\n            double bonus = baseSalaries[i] * bonusRate;\n            double gross = baseSalaries[i] + bonus;\n            double tax = gross * 0.10; // 10% tax\n            double net = gross - tax;\n\n            System.out.printf(\"Employee: %-14s | Gross: %s | Net: %s%n\",\n                    employees[i],\n                    Main.CommonUtils.formatCurrency(gross),\n                    Main.CommonUtils.formatCurrency(net));\n        }\n    }\n}",
    "practicalOutput": "=== Corporate Payroll Processing Engine ===\nEmployee: Ravi Teja      | Gross: $5,175.00 | Net: $4,657.50\nEmployee: Priya Sharma   | Gross: $7,130.00 | Net: $6,417.00\nEmployee: Kiran Kumar    | Gross: $4,370.00 | Net: $3,933.00",
    "commonMistakes": [
      "Writing massive 200-line methods that mix business calculations, file I/O, and UI formatting.",
      "Ignoring division by zero edge cases in math utility methods.",
      "Failing to validate null or empty string parameters in public utility methods.",
      "Using vague method names like `doWork()` or `process()` instead of descriptive verbs like `calculateNetPay()`."
    ],
    "challenge": "// Coding Challenge:\n// Add a method calculateMedian(double[] values) to CommonUtils:\n// 1. Clones and sorts the array.\n// 2. If length is odd, returns the middle element.\n// 3. If length is even, returns the average of the two middle elements.\n\npublic class Challenge {\n    public static double calculateMedian(double[] values) {\n        if (values == null || values.length == 0) return 0.0;\n        double[] sorted = values.clone();\n        java.util.Arrays.sort(sorted);\n        int n = sorted.length;\n        if (n % 2 != 0) {\n            return sorted[n / 2];\n        }\n        return (sorted[(n / 2) - 1] + sorted[n / 2]) / 2.0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Median (Odd) : \" + calculateMedian(new double[]{5, 1, 9, 3, 7})); // 5.0\n        System.out.println(\"Median (Even): \" + calculateMedian(new double[]{1, 2, 3, 4}));    // 2.5\n    }\n}",
    "faq": [
      {
        "q": "What is a Pure Function in Java?",
        "a": "A pure function is a method that given the same inputs always returns the same output without causing observable side effects (like modifying static variables, changing database records, or printing to console)."
      },
      {
        "q": "How does Javadoc generate HTML documentation?",
        "a": "The JDK includes a `javadoc` command line tool (`javadoc -d docs src/*.java`) that parses `/** ... */` comments and builds responsive HTML documentation web pages."
      },
      {
        "q": "Why should utility classes contain only static methods and private constructors?",
        "a": "Because utility classes (like `java.lang.Math` or `CommonUtils`) serve as stateless collections of helper methods. Adding a private constructor prevents accidental instantiation with `new CommonUtils()`."
      }
    ],
    "recap": [
      "Javadoc comments (`/** @param @return @throws */`) provide industry standard API documentation.",
      "Follow the Single Responsibility Principle: each method should accomplish one focused task.",
      "Modular systems compose small helper methods to build robust, testable software.",
      "Sanitize and validate all input arguments at method boundaries to prevent system crashes.",
      "Stateless utility libraries should encapsulate static methods with defensive edge-case guards."
    ]
  }
];
