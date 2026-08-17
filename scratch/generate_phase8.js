const fs = require('fs');
const path = require('path');

const phase8Data = [
  // =========================================================================
  // CHAPTER 33: Java Method Fundamentals & Call Stack
  // =========================================================================
  {
    num: 33,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Methods & Recursion',
    slug: '33-java-method-fundamentals-and-call-stack',
    title: 'Java Method Fundamentals, Anatomy & Call Stack Execution',
    badge: '33. Method Fundamentals & Call Stack',
    subtopics: 'Method ante enti? · DRY Principle · 6 Components of Method Anatomy · Calling Methods · JVM Call Stack Frames · Parameters vs Arguments · Varargs (int... args) · Return Statement & Unreachable Code',
    readTime: '22 min read',
    intro: 'Comprehensive masterclass on Java Methods: understanding what methods are, why they are essential for modular software engineering, complete breakdown of method anatomy, JVM Call Stack activation frames, formal parameters versus actual arguments, variable arguments (varargs), and return type mechanics.',
    theorySections: [
      {
        heading: '1. Method Ante Enti? (What is a Method in Java?)',
        content: `In computer programming, a **Method** (also called a *Function* or *Procedure*) is a **reusable block of code** that performs a specific, well-defined task and only executes when it is explicitly invoked (called).

**Why are Methods Needed? (The DRY Principle):**
- **Don\'t Repeat Yourself (DRY):** Instead of writing the same 20 lines of sales tax calculation logic across 50 different classes, you define a single method <code>calculateTax(amount)</code> once and call it everywhere.
- **Modularity:** Large 5,000-line monolithic programs become unmaintainable. Dividing software into small, focused 10-to-20 line methods makes code easy to read, test, and debug.
- **Maintainability:** If business tax rules change from 18% to 12%, you only update a **single line of code** inside the method, and the entire application immediately reflects the update!`
      },
      {
        heading: '2. The 6 Core Components of Method Anatomy',
        content: `Every method header in Java is constructed from 6 distinct structural components:

\`\`\`java
// Method Header Anatomy:
public static int calculateSum(int firstNumber, int secondNumber) {
  // Method Body (Implementation)
  int total = firstNumber + secondNumber;
  return total;
}
\`\`\`

1. **Access Modifier (e.g. <code>public</code>, <code>private</code>):** Controls visibility and accessibility from other classes.
2. **Non-Access Modifier (e.g. <code>static</code>):** Specifies whether the method belongs to the Class itself or to individual Object instances.
3. **Return Type (e.g. <code>int</code>, <code>double</code>, <code>String</code>, <code>void</code>):** Declares the data type of the value the method returns to the caller. If the method returns nothing, use <code>void</code>.
4. **Method Name (e.g. <code>calculateSum</code>):** An identifier following standard Java **camelCase** naming conventions (starts with a verb, e.g. <code>getUserName()</code>, <code>sendEmail()</code>).
5. **Parameter List (e.g. <code>(int firstNumber, int secondNumber)</code>):** Comma-separated list of input variables enclosed in parentheses. If no inputs are required, leave empty <code>()</code>.
6. **Method Body (<code>{ ... }</code>):** The block of executable statements enclosed in curly braces.`
      },
      {
        heading: '3. The JVM Call Stack & Stack Frames',
        content: `When a Java program runs, the JVM allocates a dedicated **Call Stack** in memory for each thread:
- **Stack Frame (Activation Record):** Every time a method is called, the JVM pushes a new **Stack Frame** onto the Call Stack containing:
  1. Method parameters and local variables.
  2. The Operand Stack (for intermediate calculations).
  3. Return address back to the caller.
- **Frame Popping:** When the method reaches a <code>return</code> statement or finishes its last line, its frame is **popped off the stack**, instantly deallocating all local variables and returning control to the caller.

\`\`\`
  CALL STACK EXECUTION:
  
  [ add() Frame ]       <--- 3. add(10, 20) executes; returns 30; popped!
  [ main() Frame ]      <--- 2. main() calls add(10, 20)
  +------------------+
  | JVM Call Stack   |  <--- 1. JVM starts program by pushing main()
  +------------------+
\`\`\``
      },
      {
        heading: '4. Parameters vs Arguments (Formal vs Actual)',
        content: `While often used interchangeably in everyday conversation, they have precise technical definitions:

- **Parameters (Formal Parameters):** The placeholder variable names declared in the **method signature definition**.
  \`\`\`java
  static int add(int first, int second) // "first" and "second" are PARAMETERS
  \`\`\`
- **Arguments (Actual Arguments):** The actual concrete literal values, variables, or expressions passed into the method during the **method call invocation**.
  \`\`\`java
  int result = add(10, 20); // 10 and 20 are ARGUMENTS
  \`\`\``
      },
      {
        heading: '5. Variable Arguments: Java Varargs (Type... name)',
        content: `Introduced in Java 5, **Varargs (Variable Arguments)** allows a method to accept **zero, one, or multiple arguments** without having to manually wrap them in an array:

\`\`\`java
public static int sumAll(int... numbers) { // "numbers" is treated as int[] inside
    int total = 0;
    for (int n : numbers) total += n;
    return total;
}

// Can be called with any number of arguments:
sumAll();               // 0 args -> returns 0
sumAll(10, 20);         // 2 args -> returns 30
sumAll(5, 10, 15, 20);  // 4 args -> returns 50
\`\`\`

**Varargs Rules:**
1. A method can have **at most one** varargs parameter.
2. The varargs parameter **must be the LAST parameter** in the signature (e.g. <code>(String title, int... scores)</code>).`
      },
      {
        heading: '6. The Return Statement & Unreachable Code Errors',
        content: `The <code>return</code> keyword serves two distinct functions:
1. **Returning a Value:** In non-void methods, it sends the computed result back to the caller (e.g. <code>return first + second;</code>).
2. **Early Termination:** In <code>void</code> methods, writing <code>return;</code> immediately halts execution and exits the method.

**Unreachable Code Error:**
Any line written directly below an unconditional <code>return</code> statement can never be executed, causing a compile-time error:
\`\`\`java
static int getScore() {
    return 100;
    System.out.println("Done"); // COMPILE ERROR: Unreachable code!
}
\`\`\``
      }
    ],
    codeExample: `public class Main {
    // 1. Basic Static Method with Return Value (User requested snippet)
    static int add(int first, int second) {
        return first + second;
    }

    // 2. Method with Multiple Parameters of Different Types
    static void printStudentProfile(String name, int age, double gpa, boolean isEnrolled) {
        System.out.println("  Name      : " + name);
        System.out.println("  Age       : " + age + " years");
        System.out.printf("  GPA       : %.2f%n", gpa);
        System.out.println("  Enrolled  : " + (isEnrolled ? "Active" : "Graduated"));
    }

    // 3. Early Return Demonstration (Input Validation Guard)
    static void processWithdrawal(double balance, double amount) {
        if (amount <= 0) {
            System.out.println("  [ERROR] Invalid withdrawal amount: $" + amount);
            return; // Early exit
        }
        if (amount > balance) {
            System.out.println("  [ERROR] Insufficient funds! Balance: $" + balance);
            return; // Early exit
        }
        double remaining = balance - amount;
        System.out.printf("  [SUCCESS] Withdrew $%.2f. New Balance: $%.2f%n", amount, remaining);
    }

    // 4. Varargs Method (Variable Arguments)
    static int calculateTotal(int... scores) {
        int sum = 0;
        for (int s : scores) {
            sum += s;
        }
        return sum;
    }

    public static void main(String[] args) {
        System.out.println("=== 1. Primary User Snippet Demo ===");
        int result = add(10, 20);
        System.out.println("add(10, 20) Result        : " + result);

        System.out.println("\n=== 2. Multi-Parameter Method Call ===");
        printStudentProfile("Ravi Kumar", 21, 3.85, true);

        System.out.println("\n=== 3. Early Return Guard Execution ===");
        processWithdrawal(500.0, -50.0);  // Triggers invalid amount guard
        processWithdrawal(500.0, 700.0);  // Triggers insufficient funds guard
        processWithdrawal(500.0, 150.0);  // Successful withdrawal

        System.out.println("\n=== 4. Varargs Method Flexibility ===");
        System.out.println("Sum of 2 items (10, 20)       : " + calculateTotal(10, 20));
        System.out.println("Sum of 4 items (5, 15, 25, 35): " + calculateTotal(5, 15, 25, 35));
        System.out.println("Sum of 0 items ()             : " + calculateTotal());
    }
}`,
    output: `=== 1. Primary User Snippet Demo ===
add(10, 20) Result        : 30

=== 2. Multi-Parameter Method Call ===
  Name      : Ravi Kumar
  Age       : 21 years
  GPA       : 3.85
  Enrolled  : Active

=== 3. Early Return Guard Execution ===
  [ERROR] Invalid withdrawal amount: $-50.0
  [ERROR] Insufficient funds! Balance: $500.0
  [SUCCESS] Withdrew $150.00. New Balance: $350.00

=== 4. Varargs Method Flexibility ===
Sum of 2 items (10, 20)       : 30
Sum of 4 items (5, 15, 25, 35): 80
Sum of 0 items ()             : 0`,
    lineByLine: [
      {
        line: 'static int add(int first, int second)',
        explanation: 'Declares a static method taking two integer parameters and returning an integer sum to the caller.'
      },
      {
        line: 'int result = add(10, 20);',
        explanation: 'Invokes add() by passing actual arguments 10 and 20, storing the returned value 30 into variable result.'
      },
      {
        line: 'if (amount > balance) return;',
        explanation: 'Uses an early return guard to exit the method immediately if business validation fails, preventing invalid state.'
      },
      {
        line: 'static int calculateTotal(int... scores)',
        explanation: 'Uses Java varargs syntax to accept any number of integer inputs, automatically packaging them into an array internally.'
      }
    ],
    practicalExample: `public class PracticalApplication {
    // Industry Simulation: E-Commerce Order Discount Calculator
    public static double applyCoupon(double orderTotal, String couponCode) {
        if (orderTotal <= 0) return 0.0;
        if (couponCode == null || couponCode.isBlank()) return orderTotal;

        return switch (couponCode.toUpperCase().trim()) {
            case "WELCOME20" -> orderTotal * 0.80; // 20% off
            case "FREESHIP"  -> Math.max(0.0, orderTotal - 15.0); // $15 off
            case "VIP50"     -> orderTotal >= 200.0 ? orderTotal * 0.50 : orderTotal;
            default          -> orderTotal;
        };
    }

    public static void main(String[] args) {
        double cart = 250.0;
        System.out.println("=== Checkout Discount Service ===");
        System.out.printf("Original Cart : $%.2f%n", cart);
        System.out.printf("WELCOME20     : $%.2f%n", applyCoupon(cart, "WELCOME20"));
        System.out.printf("VIP50 Discount: $%.2f%n", applyCoupon(cart, "VIP50"));
        System.out.printf("Invalid Coupon: $%.2f%n", applyCoupon(cart, "EXPIRED99"));
    }
}`,
    practicalOutput: `=== Checkout Discount Service ===
Original Cart : $250.00
WELCOME20     : $200.00
VIP50 Discount: $125.00
Invalid Coupon: $250.00`,
    commonMistakes: [
      'Missing a return statement in a non-void method path (e.g. having an if-statement without an else return), causing compile error.',
      'Placing code below an unconditional return statement, resulting in "Unreachable code" compiler errors.',
      'Placing the varargs parameter before other parameters (e.g. `(int... nums, String name)` is illegal; it must be last).',
      'Confusing parameter order during method invocation (e.g. passing `(age, name)` when the method expects `(name, age)`).'
    ],
    challenge: `// Coding Challenge:
// Write a method isPrime(int n) that:
// 1. Returns false for n <= 1.
// 2. Returns true if n is prime, false otherwise using an optimal loop up to Math.sqrt(n).
// 3. In main(), count how many prime numbers exist between 1 and 50 using this method.

public class Challenge {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        if (n == 2) return true;
        if (n % 2 == 0) return false;
        for (int i = 3; i <= Math.sqrt(n); i += 2) {
            if (n % i == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        int primeCount = 0;
        for (int i = 1; i <= 50; i++) {
            if (isPrime(i)) {
                primeCount++;
            }
        }
        System.out.println("Total Primes between 1 and 50: " + primeCount);
    }
}`,
    faq: [
      {
        q: 'What is the difference between a Function and a Method?',
        a: 'In computer science, a function is an independent subprogram that can exist outside any class. In Java, because everything belongs to a class or interface, all functions are technically called **Methods**.'
      },
      {
        q: 'What is the difference between static and non-static methods?',
        a: 'A `static` method belongs to the class itself and can be called directly without creating an object (`Math.sqrt()`, `Main.add()`). A non-static (instance) method belongs to a specific object and requires instantiation (`new Student().getName()`).'
      },
      {
        q: 'What happens to local variables when a method finishes execution?',
        a: 'When a method returns, its Stack Frame is immediately popped from the JVM Call Stack, and all local variables allocated inside that frame are instantly reclaimed in O(1) time.'
      }
    ],
    recap: [
      'Methods encapsulate reusable logic, enforcing the DRY (Don\'t Repeat Yourself) engineering principle.',
      'Method anatomy consists of access modifier, static modifier, return type, name, parameters, and body.',
      'Every method call allocates a Stack Frame on the JVM Call Stack which is popped upon returning.',
      'Formal parameters are defined in the signature; actual arguments are supplied during invocation.',
      'Java Varargs (`Type... name`) enables variable-length argument lists, but must always be the final parameter.'
    ]
  },

  // =========================================================================
  // CHAPTER 34: Pass-By-Value & Variable Scope
  // =========================================================================
  {
    num: 34,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Methods & Recursion',
    slug: '34-java-pass-by-value-and-variable-scope',
    title: 'Java Pass-by-Value Mechanics & Variable Scope Deep Dive',
    badge: '34. Pass-by-Value & Scope',
    subtopics: 'The Ultimate Truth: Java is Strictly Pass-by-Value · Primitive Pass-by-Value · Object Reference Pass-by-Value · Mutating vs Reassigning Objects · Block vs Method Scope · Variable Shadowing · Memory Stack & Heap Diagrams',
    readTime: '24 min read',
    intro: 'Mastering Java\'s memory evaluation model: resolving the classic pass-by-value vs pass-by-reference confusion once and for all, understanding how primitive bits vs object memory addresses are copied, mutating object state versus reassigning reference pointers, and exploring block, method, and loop variable scopes.',
    theorySections: [
      {
        heading: '1. The Golden Rule: Java is ALWAYS Strictly Pass-by-Value!',
        content: `One of the most frequently misunderstood concepts in Java is parameter passing.

**The Absolute Rule:**
**Java is ALWAYS 100% strictly Pass-by-Value.** There is NO "pass-by-reference" mechanism in Java!

When you pass an argument to a method:
- **For Primitives (\`int\`, \`double\`, \`boolean\`):** The JVM makes a **copy of the raw binary bits**. Any modification inside the method affects ONLY the local copy.
- **For Objects (\`int[]\`, \`String\`, \`Student\`):** The JVM makes a **copy of the reference address (pointer)**.
  - If you use that copied address to modify the object\'s internal fields (\`arr[0] = 99\`), the change is reflected in Heap memory.
  - If you **reassign the reference variable** (\`arr = new int[5]\`), you only point your local copy to a new address—the caller\'s original reference remains completely untouched!`
      },
      {
        heading: '2. Primitive Pass-by-Value Proof',
        content: `\`\`\`java
static void modify(int x) {
    x = 99; // Modifies local stack variable 'x' only!
}

public static void main(String[] args) {
    int number = 10;
    modify(number);
    System.out.println(number); // Prints 10 (NOT 99!)
}
\`\`\`

\`\`\`
  STACK MEMORY (Primitive):
  +-------------------------+
  | modify() Frame: [x=99]  | <--- Modifies copy; popped upon return!
  +-------------------------+
  | main() Frame: [num=10]  | <--- Original value 10 unchanged
  +-------------------------+
\`\`\``
      },
      {
        heading: '3. Object Reference Pass-by-Value: Mutating vs Reassigning',
        content: `\`\`\`java
// Case A: MUTATING OBJECT STATE (Changes ARE visible to caller)
static void changeFirstElement(int[] arr) {
    arr[0] = 999; // Follows copied address to Heap and modifies index 0
}

// Case B: REASSIGNING REFERENCE (Changes ARE NOT visible to caller)
static void reassignArray(int[] arr) {
    arr = new int[]{100, 200, 300}; // Reassigns local parameter to a new heap object
}
\`\`\`

\`\`\`
  STACK (main)            STACK (reassignArray)              HEAP MEMORY
  +---------------+       +---------------+            +---------------------+
  | data = 0x5000 |       | arr = 0x8800  | ---------> | [100, 200, 300]     |
  +-------|-------+       +---------------+            +---------------------+
          |
          +------------------------------------------> +---------------------+
                                                       | [1, 2, 3, 4, 5]     |
                                                       +---------------------+
\`\`\``
      },
      {
        heading: '4. Variable Scope & Lifetime in Java',
        content: `A variable\'s **Scope** defines the region of code where that variable is accessible and recognized by the compiler:

1. **Method Scope (Local Variables):** Declared inside a method. Born when the method is invoked; destroyed when the method returns.
2. **Block Scope (\`{ ... }\`):** Variables declared inside an \`if\`, \`for\`, or arbitrary \`{ }\` block exist only between those opening and closing braces.
3. **Loop Variable Scope:** \`for (int i = 0; ...)\` variable \`i\` exists exclusively inside the loop body.

\`\`\`java
void example() {
    int x = 10; // Method scope
    if (x > 5) {
        int y = 20; // Block scope (Only accessible inside if-block)
        System.out.println(x + y); // OK
    }
    // System.out.println(y); // COMPILE ERROR: y is out of scope!
}
\`\`\``
      },
      {
        heading: '5. Variable Shadowing',
        content: `**Variable Shadowing** occurs when a local variable in an inner scope has the exact same name as a variable in an outer class scope:

\`\`\`java
public class ShadowDemo {
    static int count = 100; // Class-level field

    static void print() {
        int count = 5; // Local variable shadows class field!
        System.out.println(count); // Prints 5 (Local variable wins!)
        System.out.println(ShadowDemo.count); // Prints 100 (Explicit class scope)
    }
}
\`\`\``
      }
    ],
    codeExample: `import java.util.Arrays;

public class Main {
    // 1. Primitive Pass-by-Value Test
    static void tryToModifyPrimitive(int value) {
        value = 999;
        System.out.println("  Inside method (primitive) : " + value);
    }

    // 2. Object Mutation Test (Modifies Heap Object Content)
    static void modifyArrayContent(int[] arr) {
        arr[0] = 777; // Modifies slot in Heap memory
        System.out.println("  Inside method (mutated)   : " + Arrays.toString(arr));
    }

    // 3. Object Reassignment Test (Rebinds Local Reference Variable)
    static void tryToReassignReference(int[] arr) {
        arr = new int[]{99, 99, 99}; // Local variable now points to new heap object
        System.out.println("  Inside method (reassigned): " + Arrays.toString(arr));
    }

    public static void main(String[] args) {
        System.out.println("=== 1. Primitive Pass-by-Value ===");
        int score = 50;
        System.out.println("Before method call          : " + score);
        tryToModifyPrimitive(score);
        System.out.println("After method call           : " + score + " (Unchanged!)");

        System.out.println("\n=== 2. Object Mutation via Copied Reference ===");
        int[] scores = {10, 20, 30};
        System.out.println("Before method call          : " + Arrays.toString(scores));
        modifyArrayContent(scores);
        System.out.println("After method call           : " + Arrays.toString(scores) + " (Slot 0 Changed!)");

        System.out.println("\n=== 3. Object Reassignment (Pass-by-Value Proof) ===");
        int[] originalArray = {1, 2, 3};
        System.out.println("Before reassignment call    : " + Arrays.toString(originalArray));
        tryToReassignReference(originalArray);
        System.out.println("After reassignment call     : " + Arrays.toString(originalArray) + " (Reference Unchanged!)");

        System.out.println("\n=== 4. Block Scope Demonstration ===");
        int outerX = 100;
        {
            int innerY = 500;
            System.out.println("Inside block: outerX + innerY = " + (outerX + innerY));
        }
        // innerY is unreachable here; outerX remains valid
        System.out.println("Outside block: outerX = " + outerX);
    }
}`,
    output: `=== 1. Primitive Pass-by-Value ===
Before method call          : 50
  Inside method (primitive) : 999
After method call           : 50 (Unchanged!)

=== 2. Object Mutation via Copied Reference ===
Before method call          : [10, 20, 30]
  Inside method (mutated)   : [777, 20, 30]
After method call           : [777, 20, 30] (Slot 0 Changed!)

=== 3. Object Reassignment (Pass-by-Value Proof) ===
Before reassignment call    : [1, 2, 3]
  Inside method (reassigned): [99, 99, 99]
After reassignment call     : [1, 2, 3] (Reference Unchanged!)

=== 4. Block Scope Demonstration ===
Inside block: outerX + innerY = 600
Outside block: outerX = 100`,
    lineByLine: [
      {
        line: 'tryToModifyPrimitive(score);',
        explanation: 'Copies the raw value 50 into the parameter "value". Changes inside the method do not affect "score".'
      },
      {
        line: 'arr[0] = 777;',
        explanation: 'Follows the copied reference address to the shared Heap array and updates slot 0, which is visible to the caller.'
      },
      {
        line: 'arr = new int[]{99, 99, 99};',
        explanation: 'Reassigns the local parameter variable to point to a new Heap object, leaving the caller\'s original array reference untouched.'
      },
      {
        line: 'int innerY = 500;',
        explanation: 'Demonstrates block scope: innerY exists only within the enclosing curly braces and is destroyed at the closing brace.'
      }
    ],
    practicalExample: `public class PracticalApplication {
    // Industry Simulation: User Profile Sanitizer
    static class UserProfile {
        String username;
        String email;
        UserProfile(String u, String e) { this.username = u; this.email = e; }
    }

    public static void sanitizeProfile(UserProfile profile) {
        if (profile == null) return;
        // Mutating fields via shared reference address
        profile.username = profile.username.trim().toLowerCase();
        profile.email = profile.email.trim().toLowerCase();
    }

    public static void main(String[] args) {
        UserProfile user = new UserProfile("  Admin_User2026 ", "  Support@Company.ORG ");
        System.out.println("=== Before Sanitization ===");
        System.out.println("Username: [" + user.username + "], Email: [" + user.email + "]");

        sanitizeProfile(user);

        System.out.println("\n=== After Sanitization ===");
        System.out.println("Username: [" + user.username + "], Email: [" + user.email + "]");
    }
}`,
    practicalOutput: `=== Before Sanitization ===
Username: [  Admin_User2026 ], Email: [  Support@Company.ORG ]

=== After Sanitization ===
Username: [admin_user2026], Email: [support@company.org]`,
    commonMistakes: [
      'Believing Java has "Pass-by-Reference" because mutating object fields works. Java passes the *reference by value*!',
      'Trying to swap two primitive variables with a `swap(a, b)` method. In Java, primitives cannot be swapped via helper methods without returning an array or object container.',
      'Attempting to access a loop counter `i` outside its `for` loop body.',
      'Reassigning a method parameter expecting the caller\'s variable to point to the new object.'
    ],
    challenge: `// Coding Challenge:
// Write a method swapFirstAndLast(int[] arr) that swaps the first and last elements of an array.
// Verify that the change persists in the caller\'s main() method.

public class Challenge {
    public static void swapFirstAndLast(int[] arr) {
        if (arr == null || arr.length < 2) return;
        int temp = arr[0];
        arr[0] = arr[arr.length - 1];
        arr[arr.length - 1] = temp;
    }

    public static void main(String[] args) {
        int[] data = {100, 20, 30, 500};
        System.out.println("Before Swap: " + java.util.Arrays.toString(data));
        swapFirstAndLast(data);
        System.out.println("After Swap : " + java.util.Arrays.toString(data));
    }
}`,
    faq: [
      {
        q: 'Why can’t I write a swap(int a, int b) method in Java?',
        a: 'Because Java passes primitives strictly by value. The method receives isolated copies of `a` and `b` on its stack frame. Swapping the copies does not affect the variables in the caller\'s stack frame.'
      },
      {
        q: 'How does Pass-by-Value differ from C++ pass-by-reference (&)?',
        a: 'In C++, passing by reference `void func(int &x)` creates an alias directly to the caller\'s variable in memory. In Java, there are no aliases; an address value is always copied into a new parameter variable.'
      },
      {
        q: 'Does String immutability affect pass-by-value?',
        a: 'Yes. When you pass a `String` to a method, you pass a copy of the reference. Because strings are immutable, any method call like `str = str.toUpperCase()` creates a new string and reassigns only the local parameter reference, leaving the caller\'s string unmodified.'
      }
    ],
    recap: [
      'Java is strictly Pass-by-Value for both primitives and object reference types.',
      'For primitives, raw value bits are copied into the method\'s stack frame.',
      'For objects, the 64-bit reference address is copied into the parameter.',
      'Mutating an object\'s fields via its reference modifies the shared Heap object.',
      'Reassigning a parameter reference variable has zero effect on the caller\'s variable.',
      'Variables are scoped strictly to the block `{}` in which they are declared.'
    ]
  },

  // =========================================================================
  // CHAPTER 35: Method Overloading & Static vs Instance Methods
  // =========================================================================
  {
    num: 35,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Methods & Recursion',
    slug: '35-java-method-overloading-and-static-vs-instance',
    title: 'Java Method Overloading, Type Promotion & Static vs Instance Methods',
    badge: '35. Overloading & Static Methods',
    subtopics: 'Method Overloading (Compile-Time Polymorphism) · 3 Valid Overloading Rules · Why Return Type Alone Cannot Overload · Automatic Type Promotion in Overloading · static Methods vs Instance Methods · Memory Allocation of static',
    readTime: '24 min read',
    intro: 'Mastering polymorphism and method types in Java: understanding method overloading (compile-time / static polymorphism), the 3 strict compiler overloading rules, automatic primitive type promotion hierarchies, and the fundamental architectural distinction between class-level static methods and object-level instance methods.',
    theorySections: [
      {
        heading: '1. What is Method Overloading? (Compile-Time Polymorphism)',
        content: `**Method Overloading** is a feature in Java that allows a class to have **multiple methods with the exact same name**, provided they have **different parameter lists (signatures)**.

It represents **Compile-Time (Static) Polymorphism** because the Java compiler determines exactly which method to execute during compilation based on the arguments supplied at the call site.

\`\`\`java
// Overloaded add() methods providing clean, intuitive API:
add(int a, int b)           // Adds two integers
add(double a, double b)     // Adds two floating-point numbers
add(int a, int b, int c)    // Adds three integers
\`\`\``
      },
      {
        heading: '2. The 3 Valid Rules for Method Overloading',
        content: `Two methods in the same class are legally overloaded if they differ in at least one of these 3 criteria:

<div class="ref-table-wrap">
  <table class="ref-table">
    <thead>
      <tr>
        <th>Rule</th>
        <th>Example 1</th>
        <th>Example 2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. Number of Parameters</strong></td>
        <td><code>add(int a, int b)</code></td>
        <td><code>add(int a, int b, int c)</code></td>
      </tr>
      <tr>
        <td><strong>2. Data Types of Parameters</strong></td>
        <td><code>print(int x)</code></td>
        <td><code>print(String s)</code></td>
      </tr>
      <tr>
        <td><strong>3. Sequence/Order of Types</strong></td>
        <td><code>log(String msg, int code)</code></td>
        <td><code>log(int code, String msg)</code></td>
      </tr>
    </tbody>
  </table>
</div>

**CRITICAL RULE: Return Type ALONE does NOT allow overloading!**
\`\`\`java
// COMPILE ERROR: Duplicate method!
int calculate(int a) { return a * 2; }
double calculate(int a) { return a * 2.0; } // Compiler cannot disambiguate calculate(5)!
\`\`\``
      },
      {
        heading: '3. Automatic Type Promotion in Method Overloading',
        content: `If no exact matching parameter type is found, Java automatically **promotes** the argument to the next compatible wider type:

$$\\text{byte} \\rightarrow \\text{short} \\rightarrow \\text{int} \\rightarrow \\text{long} \\rightarrow \\text{float} \\rightarrow \\text{double}$$

\`\`\`java
static void display(double d) { System.out.println("Double: " + d); }

// Calling display with an int literal:
display(42); // int 42 is automatically promoted to double 42.0!
\`\`\``
      },
      {
        heading: '4. static Methods vs Instance Methods Architecture',
        content: `<div class="ref-table-wrap">
  <table class="ref-table">
    <thead>
      <tr>
        <th>Feature</th>
        <th><code>static</code> Methods (Class-Level)</th>
        <th>Instance Methods (Object-Level)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Belongs To</strong></td>
        <td>The <strong>Class</strong> itself (shared globally).</td>
        <td>Individual <strong>Object instances</strong> on the Heap.</td>
      </tr>
      <tr>
        <td><strong>How to Call</strong></td>
        <td><code>ClassName.methodName()</code> (No object needed).</td>
        <td><code>objectReference.methodName()</code> (Requires <code>new</code>).</td>
      </tr>
      <tr>
        <td><strong>Access to <code>this</code></strong></td>
        <td><strong>CANNOT</strong> use <code>this</code> or <code>super</code>.</td>
        <td>Can freely use <code>this</code> to access instance fields.</td>
      </tr>
      <tr>
        <td><strong>Access to Fields</strong></td>
        <td>Can directly access only <code>static</code> variables.</td>
        <td>Can access both instance and static variables.</td>
      </tr>
      <tr>
        <td><strong>Best Use Case</strong></td>
        <td>Utility methods, mathematical helpers, factory methods (<code>Math.sqrt()</code>, <code>Arrays.sort()</code>).</td>
        <td>Behavior that depends on an object\'s state (<code>account.withdraw()</code>).</td>
      </tr>
    </tbody>
  </table>
</div>`
      }
    ],
    codeExample: `public class Main {
    // -------------------------------------------------------------
    // OVERLOADED METHODS (Different Parameter Counts & Types)
    // -------------------------------------------------------------
    // Version 1: 2 ints
    static int multiply(int a, int b) {
        System.out.print("  [Called multiply(int, int)]       : ");
        return a * b;
    }

    // Version 2: 3 ints (Different parameter count)
    static int multiply(int a, int b, int c) {
        System.out.print("  [Called multiply(int, int, int)]  : ");
        return a * b * c;
    }

    // Version 3: 2 doubles (Different data types)
    static double multiply(double a, double b) {
        System.out.print("  [Called multiply(double, double)] : ");
        return a * b;
    }

    // -------------------------------------------------------------
    // STATIC vs INSTANCE DEMONSTRATION
    // -------------------------------------------------------------
    static class BankAccount {
        static String bankName = "Global Federal Bank"; // Static class variable
        double balance;                                 // Instance variable

        BankAccount(double b) { this.balance = b; }

        // Static Method (Class-level utility)
        static void printBankInfo() {
            System.out.println("  Bank Organization: " + bankName);
            // System.out.println(balance); // COMPILE ERROR: Cannot access non-static field!
        }

        // Instance Method (Object-level behavior)
        void deposit(double amount) {
            this.balance += amount;
            System.out.printf("  Deposited $%.2f. New Balance: $%.2f%n", amount, this.balance);
        }
    }

    public static void main(String[] args) {
        System.out.println("=== 1. Method Overloading in Action ===");
        System.out.println(multiply(4, 5));
        System.out.println(multiply(2, 3, 4));
        System.out.println(multiply(2.5, 4.0));

        System.out.println("\n=== 2. Type Promotion in Overloading ===");
        // Passing float and int -> promoted to multiply(double, double)
        System.out.println(multiply(3.5f, 2));

        System.out.println("\n=== 3. Static Method Call (No Object Needed) ===");
        BankAccount.printBankInfo(); // Called directly via Class name

        System.out.println("\n=== 4. Instance Method Call (Requires Object) ===");
        BankAccount account = new BankAccount(1000.0);
        account.deposit(250.0);
    }
}`,
    output: `=== 1. Method Overloading in Action ===
  [Called multiply(int, int)]       : 20
  [Called multiply(int, int, int)]  : 24
  [Called multiply(double, double)] : 10.0

=== 2. Type Promotion in Overloading ===
  [Called multiply(double, double)] : 7.0

=== 3. Static Method Call (No Object Needed) ===
  Bank Organization: Global Federal Bank

=== 4. Instance Method Call (Requires Object) ===
  Deposited $250.00. New Balance: $1250.00`,
    lineByLine: [
      {
        line: 'static int multiply(int a, int b)',
        explanation: 'Defines the base integer multiplication method taking 2 parameters.'
      },
      {
        line: 'static double multiply(double a, double b)',
        explanation: 'Overloads multiply with floating-point types; compiler resolves calls based on argument types.'
      },
      {
        line: 'multiply(3.5f, 2);',
        explanation: 'Demonstrates type promotion: the float and int are automatically widened to double matching the double overload.'
      },
      {
        line: 'BankAccount.printBankInfo();',
        explanation: 'Invokes a static method directly using the class name without allocating any heap object.'
      },
      {
        line: 'account.deposit(250.0);',
        explanation: 'Invokes an instance method on a specific BankAccount object, modifying that object\'s internal balance field.'
      }
    ],
    practicalExample: `public class PracticalApplication {
    // Industry Simulation: Payment Processing Gateway
    public static class PaymentGateway {
        // Pay via Credit Card
        public static String processPayment(String cardNumber, String cvv, double amount) {
            return String.format("[CARD] Charged $%.2f to card ending in %s",
                    amount, cardNumber.substring(cardNumber.length() - 4));
        }

        // Pay via UPI ID (Overloaded)
        public static String processPayment(String upiId, double amount) {
            return String.format("[UPI] Requested $%.2f from UPI ID: %s", amount, upiId);
        }

        // Pay via Wallet with Promo Code (Overloaded)
        public static String processPayment(String walletId, double amount, String promoCode) {
            double finalAmount = promoCode.equals("SAVE10") ? amount * 0.90 : amount;
            return String.format("[WALLET] Charged $%.2f (Promo: %s) to %s",
                    finalAmount, promoCode, walletId);
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Payment Gateway Overloaded Dispatch ===");
        System.out.println(PaymentGateway.processPayment("4111222233334567", "123", 149.99));
        System.out.println(PaymentGateway.processPayment("developer@upi", 49.00));
        System.out.println(PaymentGateway.processPayment("PAYTM_WALLET_88", 100.0, "SAVE10"));
    }
}`,
    practicalOutput: `=== Payment Gateway Overloaded Dispatch ===
[CARD] Charged $149.99 to card ending in 4567
[UPI] Requested $49.00 from UPI ID: developer@upi
[WALLET] Charged $90.00 (Promo: SAVE10) to PAYTM_WALLET_88`,
    commonMistakes: [
      'Attempting to overload a method by changing only the return type, resulting in a duplicate method compile error.',
      'Attempting to access non-static instance fields directly from a static method without an object reference.',
      'Creating ambiguous overloads (e.g. `test(int, long)` and `test(long, int)`), causing compilation failure when calling `test(5, 5)`.',
      'Forgetting that `static` methods cannot be overridden with dynamic polymorphism (they can only be hidden).'
    ],
    challenge: `// Coding Challenge:
// Create an overloaded area() utility method:
// 1. area(double radius) -> Returns circle area: Math.PI * r * r
// 2. area(double length, double width) -> Returns rectangle area: l * w
// 3. area(double base, double height, boolean isTriangle) -> Returns triangle area: 0.5 * b * h

public class Challenge {
    public static double area(double radius) {
        return Math.PI * radius * radius;
    }

    public static double area(double length, double width) {
        return length * width;
    }

    public static double area(double base, double height, boolean isTriangle) {
        return 0.5 * base * height;
    }

    public static void main(String[] args) {
        System.out.printf("Circle Area (r=5)     : %.2f%n", area(5.0));
        System.out.printf("Rectangle Area (4x6)  : %.2f%n", area(4.0, 6.0));
        System.out.printf("Triangle Area (b=4,h=5): %.2f%n", area(4.0, 5.0, true));
    }
}`,
    faq: [
      {
        q: 'Why can’t we overload methods by changing only the return type in Java?',
        a: 'Because when invoking a method like `calculate(5);` without assigning its return value, the compiler has no way to know which return type version was intended, creating grammatical ambiguity.'
      },
      {
        q: 'Can main() method be overloaded in Java?',
        a: 'Yes! You can define `public static void main(int[] args)` or `public static void main(String arg)`. However, the JVM will only call the standard `public static void main(String[] args)` as the application entry point.'
      },
      {
        q: 'Can static methods access instance methods?',
        a: 'No, not directly. A static method executes in class scope without any `this` reference. It can only call an instance method if it explicitly creates an object instance first (`new MyClass().instanceMethod()`).'
      }
    ],
    recap: [
      'Method overloading enables multiple methods with the same name but differing parameter counts, types, or order.',
      'Overloading is resolved at compile time (Static Polymorphism).',
      'Changing the return type alone is NOT valid method overloading in Java.',
      '`static` methods belong to the class and are called without creating objects (`Math.max()`).',
      'Instance methods belong to object instances and can access instance variables via `this`.'
    ]
  },

  // =========================================================================
  // CHAPTER 36: Recursion & The Call Stack
  // =========================================================================
  {
    num: 36,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Methods & Recursion',
    slug: '36-java-recursion-and-stack-overflow',
    title: 'Java Recursion & Call Stack Lifecycle Masterclass',
    badge: '36. Recursion & StackOverflow',
    subtopics: 'What is Recursion? · 2 Pillars: Base Case & Recursive Step · Call Stack Winding & Unwinding · StackOverflowError Prevention · Factorial (N!) · Fibonacci Series · Sum of Digits · Recursion vs Iteration Trade-offs',
    readTime: '26 min read',
    intro: 'Mastering recursive programming in Java: understanding how methods call themselves to solve sub-problems, the essential role of base case anchors, call stack winding and unwinding phases, diagnosing and preventing StackOverflowError, algorithmic implementations (Factorial, Fibonacci, Sum of Digits), and memory performance trade-offs against loops.',
    theorySections: [
      {
        heading: '1. What is Recursion in Java?',
        content: `**Recursion** is a programming technique where a method **calls itself** directly or indirectly to solve a complex problem by breaking it down into smaller, identical sub-problems.

Every recursive algorithm must contain **Two Essential Pillars**:
1. **The Base Case (Termination Anchor):** The condition under which the method **stops calling itself** and returns a direct, known answer.
2. **The Recursive Step:** The statement where the method calls itself with modified arguments that **progressively move closer to the base case**.`
      },
      {
        heading: '2. Call Stack Winding & Unwinding (Factorial Example)',
        content: `Consider calculating $4! = 4 \\times 3 \\times 2 \\times 1 = 24$:

\`\`\`java
static int factorial(int n) {
    if (n <= 1) return 1;          // Base Case
    return n * factorial(n - 1);    // Recursive Step
}
\`\`\`

\`\`\`
  PHASE 1: WINDING (Pushing frames)       PHASE 2: UNWINDING (Popping & computing)
  
  [ factorial(1) ] -> Returns 1           [ factorial(1) ] -> Returns 1 (Base reached)
  [ factorial(2) ] -> 2 * factorial(1)    [ factorial(2) ] -> 2 * 1 = 2
  [ factorial(3) ] -> 3 * factorial(2)    [ factorial(3) ] -> 3 * 2 = 6
  [ factorial(4) ] -> 4 * factorial(3)    [ factorial(4) ] -> 4 * 6 = 24 (Final Result!)
  [ main()       ]                        [ main()       ]
\`\`\``
      },
      {
        heading: '3. The StackOverflowError (Why It Happens & Prevention)',
        content: `Each recursive call consumes a **Stack Frame** in the thread\'s Call Stack (typically 1MB total size).

**When does \`StackOverflowError\` occur?**
1. **Missing Base Case:** The method calls itself indefinitely.
2. **Recursive step doesn\'t move toward base case:** (e.g. calling \`factorial(n)\` instead of \`factorial(n - 1)\`).
3. **Recursion depth is too deep:** (e.g. $N = 100,000$ recursive calls will exceed standard stack limits).

\`\`\`java
// BUG: Infinite recursion causing StackOverflowError!
static void infinite() {
    infinite(); // Throws java.lang.StackOverflowError
}
\`\`\``
      },
      {
        heading: '4. Classic Recursive Algorithms',
        content: `1. **Fibonacci Numbers ($0, 1, 1, 2, 3, 5, 8, 13, \\dots$):**
$$F(n) = F(n-1) + F(n-2) \\quad \\text{with } F(0)=0, F(1)=1$$

2. **Sum of Digits:**
Summing digits of $1234$: $\\text{sum}(1234) = (1234 \\% 10) + \\text{sum}(1234 / 10) = 4 + 3 + 2 + 1 = 10$.

3. **Power Calculation ($a^b$):**
$$a^b = a \\times a^{b-1} \\quad \\text{with } a^0 = 1$$`
      },
      {
        heading: '5. Recursion vs Iteration (Loops) Engineering Trade-offs',
        content: `<div class="ref-table-wrap">
  <table class="ref-table">
    <thead>
      <tr>
        <th>Attribute</th>
        <th>Recursion</th>
        <th>Iteration (Loops)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Code Elegance</strong></td>
        <td>High (Clean mathematical expressions for Trees/Graphs).</td>
        <td>Can be verbose for complex hierarchical structures.</td>
      </tr>
      <tr>
        <td><strong>Memory Footprint</strong></td>
        <td>High (Consumes $O(N)$ stack frames).</td>
        <td><strong>Low ($O(1)$ constant stack memory).</strong></td>
      </tr>
      <tr>
        <td><strong>Speed</strong></td>
        <td>Slightly slower (Stack push/pop overhead).</td>
        <td><strong>Fastest</strong> (Direct CPU loop instructions).</td>
      </tr>
      <tr>
        <td><strong>Risk</strong></td>
        <td><code>StackOverflowError</code> if depth is too large.</td>
        <td>Infinite loop (Can freeze CPU, but won\'t overflow stack).</td>
      </tr>
    </tbody>
  </table>
</div>`
      }
    ],
    codeExample: `public class Main {
    // 1. Recursive Factorial (N!)
    static long factorial(int n) {
        if (n <= 1) return 1; // Base case
        return n * factorial(n - 1); // Recursive step
    }

    // 2. Recursive Fibonacci Number
    static int fibonacci(int n) {
        if (n <= 0) return 0; // Base case 1
        if (n == 1) return 1; // Base case 2
        return fibonacci(n - 1) + fibonacci(n - 2); // Recursive step
    }

    // 3. Recursive Sum of Digits
    static int sumOfDigits(int n) {
        if (n == 0) return 0; // Base case
        return (n % 10) + sumOfDigits(n / 10); // Recursive step
    }

    // 4. Recursive Power Calculation (base^exp)
    static long power(int base, int exp) {
        if (exp == 0) return 1; // Base case: a^0 = 1
        return base * power(base, exp - 1); // Recursive step
    }

    public static void main(String[] args) {
        System.out.println("=== 1. Factorial via Recursion ===");
        System.out.println("5! (5 Factorial)              : " + factorial(5));
        System.out.println("10! (10 Factorial)            : " + factorial(10));

        System.out.println("\n=== 2. Fibonacci Sequence Generation ===");
        System.out.print("First 8 Fibonacci Numbers     : ");
        for (int i = 0; i < 8; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        System.out.println();

        System.out.println("\n=== 3. Recursive Sum of Digits ===");
        int sampleNumber = 9874;
        System.out.println("Sum of digits for " + sampleNumber + "      : " + sumOfDigits(sampleNumber));

        System.out.println("\n=== 4. Recursive Power Calculation ===");
        System.out.println("2^8 (2 to the power 8)        : " + power(2, 8));
        System.out.println("5^3 (5 cubed)                 : " + power(5, 3));
    }
}`,
    output: `=== 1. Factorial via Recursion ===
5! (5 Factorial)              : 120
10! (10 Factorial)            : 3628800

=== 2. Fibonacci Sequence Generation ===
First 8 Fibonacci Numbers     : 0 1 1 2 3 5 8 13 

=== 3. Recursive Sum of Digits ===
Sum of digits for 9874      : 28

=== 4. Recursive Power Calculation ===
2^8 (2 to the power 8)        : 256
5^3 (5 cubed)                 : 125`,
    lineByLine: [
      {
        line: 'if (n <= 1) return 1;',
        explanation: 'The critical base case anchor that terminates recursion when n reaches 1 or 0.'
      },
      {
        line: 'return n * factorial(n - 1);',
        explanation: 'Multiplies current n by the result of factorial(n - 1), pushing a new frame onto the stack.'
      },
      {
        line: 'fibonacci(n - 1) + fibonacci(n - 2);',
        explanation: 'Binary tree recursion that computes Fibonacci by branching into two recursive sub-calls.'
      },
      {
        line: '(n % 10) + sumOfDigits(n / 10);',
        explanation: 'Extracts the last digit using modulus % 10 and passes the remaining truncated number n / 10 recursively.'
      }
    ],
    practicalExample: `public class PracticalApplication {
    // Industry Simulation: Recursive Directory Folder Size Calculator
    static class Folder {
        String name;
        int directFileSizeKb;
        Folder[] subFolders;

        Folder(String name, int sizeKb, Folder... subs) {
            this.name = name;
            this.directFileSizeKb = sizeKb;
            this.subFolders = subs != null ? subs : new Folder[0];
        }
    }

    public static int calculateTotalFolderSize(Folder folder) {
        if (folder == null) return 0;
        int total = folder.directFileSizeKb;
        for (Folder sub : folder.subFolders) {
            total += calculateTotalFolderSize(sub); // Recursive tree traversal
        }
        return total;
    }

    public static void main(String[] args) {
        Folder images = new Folder("images", 450);
        Folder docs = new Folder("docs", 250);
        Folder src = new Folder("src", 800, images, docs);
        Folder projectRoot = new Folder("my-app", 150, src);

        System.out.println("=== Disk Space Analyzer (Recursive File Tree) ===");
        int totalSize = calculateTotalFolderSize(projectRoot);
        System.out.println("Total Project Size: " + totalSize + " KB (~" + (totalSize / 1024.0) + " MB)");
    }
}`,
    practicalOutput: `=== Disk Space Analyzer (Recursive File Tree) ===
Total Project Size: 1650 KB (~1.611328125 MB)`,
    commonMistakes: [
      'Omitting the base case, leading directly to `java.lang.StackOverflowError`.',
      'Using naive recursion for Fibonacci on large numbers ($N > 45$), which runs in exponential $O(2^N)$ time and freezes.',
      'Modifying static global variables inside recursive methods, causing unintended side effects across winding/unwinding phases.',
      'Passing `n++` instead of `n + 1` or `n - 1` into recursive calls, causing infinite loops.'
    ],
    challenge: `// Coding Challenge:
// Write a recursive method reverseString(String str) that reverses a string recursively.
// Base Case: If str is empty or length 1, return str.
// Recursive Step: return reverseString(str.substring(1)) + str.charAt(0);

public class Challenge {
    public static String reverseString(String str) {
        if (str == null || str.length() <= 1) {
            return str;
        }
        return reverseString(str.substring(1)) + str.charAt(0);
    }

    public static void main(String[] args) {
        System.out.println("Reversed 'JAVA': " + reverseString("JAVA")); // "AVAJ"
        System.out.println("Reversed 'RECURSION': " + reverseString("RECURSION"));
    }
}`,
    faq: [
      {
        q: 'What causes a StackOverflowError in Java?',
        a: 'Each method call adds a frame to the thread\'s Call Stack. If a recursive method fails to reach a base case, it keeps allocating frames until the stack memory (typically 1MB) is exhausted, throwing `StackOverflowError`.'
      },
      {
        q: 'Can every recursive algorithm be written iteratively with loops?',
        a: 'Yes! According to the Church-Turing thesis, any recursive algorithm can be rewritten using an iterative loop and an explicit stack data structure.'
      },
      {
        q: 'What is Tail Call Optimization (TCO) and does Java support it?',
        a: 'TCO allows compilers to reuse the current stack frame for recursive calls if the call is the very last operation. Standard JVMs (HotSpot) do NOT currently perform automatic TCO, which is why loops are preferred for deep iterations.'
      }
    ],
    recap: [
      'Recursion solves problems by having a method call itself with smaller inputs.',
      'Every recursive method requires a Base Case to stop and a Recursive Step to progress.',
      'Execution consists of a Winding phase (pushing stack frames) and an Unwinding phase (popping and returning values).',
      'Missing or unreachable base cases cause `StackOverflowError`.',
      'Use iteration for linear counters and recursion for hierarchical structures like trees and graphs.'
    ]
  },

  // =========================================================================
  // CHAPTER 37: Methods Capstone Projects & Best Practices
  // =========================================================================
  {
    num: 37,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Methods & Recursion',
    slug: '37-java-methods-capstone-projects-and-best-practices',
    title: 'Java Methods Capstone Projects: 4 Production-Grade Modular Systems',
    badge: '37. Capstone Projects (4) & Best Practices',
    subtopics: 'Javadoc Documentation (@param, @return, @throws) · Clean Code & Single Responsibility · Project 1: Scientific Calculator · Project 2: Student Academic & GPA Suite · Project 3: Core Banking Operations · Project 4: Enterprise CommonUtils Library',
    readTime: '30 min read',
    intro: 'Building 4 complete, production-grade modular software systems in Java: an industrial scientific calculator, a comprehensive student academic grading and GPA calculator, a secure banking transactions engine, and an enterprise utility library, while mastering industry Javadoc documentation and clean method architecture.',
    theorySections: [
      {
        heading: '1. Professional Javadoc Method Documentation Standards',
        content: `In enterprise software, methods are documented using **Javadoc comments** (<code>/** ... */</code>) to generate official API documentation:

\`\`\`java
/**
 * Calculates compound interest for a given principal and rate.
 *
 * @param principal The initial deposited amount in USD (must be > 0).
 * @param annualRate The annual interest rate percentage (e.g. 7.5 for 7.5%).
 * @param years The investment duration in years.
 * @return The final compounded balance after the specified duration.
 * @throws IllegalArgumentException if principal <= 0 or years < 1.
 */
public static double calculateCompoundInterest(double principal, double annualRate, int years) {
    if (principal <= 0 || years < 1) {
        throw new IllegalArgumentException("Invalid principal or years");
    }
    return principal * Math.pow(1 + (annualRate / 100.0), years);
}
\`\`\``
      },
      {
        heading: '2. Clean Code Principles for Java Methods',
        content: `1. **Single Responsibility Principle (SRP):** A method should do **one thing and do it exceptionally well**. If a method calculates tax, saves to database, and sends an email, split it into 3 separate methods!
2. **Small Method Size:** Ideal production methods are between **5 to 20 lines** long.
3. **Descriptive Verb-Noun Naming:** Use clear intentions: <code>sendNotification()</code>, <code>validatePassword()</code>, <code>calculateNetPay()</code>.
4. **Minimize Parameter Count:** Strive for 0 to 3 parameters. If you need 7 parameters, group them into a dedicated configuration object.`
      }
    ],
    codeExample: `import java.util.Arrays;

public class Main {
    // -------------------------------------------------------------
    // PROJECT 1: Modular Scientific Calculator Engine
    // -------------------------------------------------------------
    public static class Calculator {
        public static double add(double a, double b) { return a + b; }
        public static double subtract(double a, double b) { return a - b; }
        public static double multiply(double a, double b) { return a * b; }
        public static double divide(double a, double b) {
            if (b == 0) {
                System.out.println("  [ERROR] Cannot divide by zero!");
                return Double.NaN;
            }
            return a / b;
        }
        public static double power(double base, double exp) { return Math.pow(base, exp); }
        public static double modulus(double a, double b) { return a % b; }
    }

    // -------------------------------------------------------------
    // PROJECT 2: Student Academic & GPA Suite
    // -------------------------------------------------------------
    public static class StudentGrader {
        public static int calculateTotal(int[] marks) {
            int total = 0;
            for (int m : marks) total += m;
            return total;
        }

        public static double calculatePercentage(int[] marks, int maxPerSubject) {
            int total = calculateTotal(marks);
            int maxTotal = marks.length * maxPerSubject;
            return ((double) total / maxTotal) * 100.0;
        }

        public static char determineLetterGrade(double percentage) {
            if (percentage >= 90) return 'A';
            if (percentage >= 80) return 'B';
            if (percentage >= 70) return 'C';
            if (percentage >= 60) return 'D';
            return 'F';
        }

        public static double calculateGPA(double percentage) {
            return Math.min(4.0, (percentage / 100.0) * 4.0);
        }
    }

    // -------------------------------------------------------------
    // PROJECT 3: Core Banking Operations Engine
    // -------------------------------------------------------------
    public static class BankService {
        public static double deposit(double currentBalance, double amount) {
            if (amount <= 0) {
                System.out.println("  [BANK ERROR] Invalid deposit amount: $" + amount);
                return currentBalance;
            }
            return currentBalance + amount;
        }

        public static double withdraw(double currentBalance, double amount) {
            if (amount <= 0 || amount > currentBalance) {
                System.out.println("  [BANK ERROR] Withdrawal denied! Insufficient funds or invalid amount.");
                return currentBalance;
            }
            return currentBalance - amount;
        }

        public static boolean transferFunds(double[] senderBalance, double[] receiverBalance, double amount) {
            if (amount <= 0 || senderBalance[0] < amount) {
                return false; // Transfer rejected
            }
            senderBalance[0] -= amount;
            receiverBalance[0] += amount;
            return true;
        }
    }

    // -------------------------------------------------------------
    // PROJECT 4: Enterprise CommonUtils Library
    // -------------------------------------------------------------
    public static class CommonUtils {
        public static boolean isValidEmail(String email) {
            if (email == null || email.isBlank()) return false;
            return email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
        }

        public static String maskCreditCard(String cardNum) {
            if (cardNum == null || cardNum.length() < 4) return "****";
            String clean = cardNum.replaceAll("[^0-9]", "");
            return "****-****-****-" + clean.substring(clean.length() - 4);
        }

        public static String formatCurrency(double amount) {
            return String.format("$%,.2f", amount);
        }
    }

    public static void main(String[] args) {
        System.out.println("=== PROJECT 1: Calculator Engine ===");
        System.out.println("  10.5 + 4.5  = " + Calculator.add(10.5, 4.5));
        System.out.println("  15.0 / 3.0  = " + Calculator.divide(15.0, 3.0));
        System.out.println("  2.0 ^ 10.0  = " + Calculator.power(2.0, 10.0));
        Calculator.divide(10.0, 0); // Tests error guard

        System.out.println("\n=== PROJECT 2: Student Academic & GPA Suite ===");
        int[] studentMarks = {88, 92, 79, 95, 84};
        int totalMarks = StudentGrader.calculateTotal(studentMarks);
        double percentage = StudentGrader.calculatePercentage(studentMarks, 100);
        char grade = StudentGrader.determineLetterGrade(percentage);
        double gpa = StudentGrader.calculateGPA(percentage);

        System.out.println("  Total Marks : " + totalMarks + "/500");
        System.out.printf("  Percentage  : %.2f%%%n", percentage);
        System.out.println("  Grade       : " + grade);
        System.out.printf("  GPA (4.0)   : %.2f%n", gpa);

        System.out.println("\n=== PROJECT 3: Core Banking Operations ===");
        double myAccount = 1000.0;
        myAccount = BankService.deposit(myAccount, 500.0);
        myAccount = BankService.withdraw(myAccount, 200.0);
        System.out.println("  Final My Account Balance: " + CommonUtils.formatCurrency(myAccount));

        double[] alice = {1200.0};
        double[] bob = {300.0};
        boolean txStatus = BankService.transferFunds(alice, bob, 400.0);
        System.out.println("  Transfer $400 from Alice to Bob : Success=" + txStatus);
        System.out.println("  Alice New Balance              : " + CommonUtils.formatCurrency(alice[0]));
        System.out.println("  Bob New Balance                : " + CommonUtils.formatCurrency(bob[0]));

        System.out.println("\n=== PROJECT 4: Enterprise CommonUtils ===");
        System.out.println("  Email 'dev@google.com' Valid : " + CommonUtils.isValidEmail("dev@google.com"));
        System.out.println("  Email 'invalid-email' Valid  : " + CommonUtils.isValidEmail("invalid-email"));
        System.out.println("  Masked CC Number             : " + CommonUtils.maskCreditCard("4111-2222-3333-8945"));
        System.out.println("  Formatted Large Currency     : " + CommonUtils.formatCurrency(1250450.75));
    }
}`,
    output: `=== PROJECT 1: Calculator Engine ===
  10.5 + 4.5  = 15.0
  15.0 / 3.0  = 5.0
  2.0 ^ 10.0  = 1024.0
  [ERROR] Cannot divide by zero!

=== PROJECT 2: Student Academic & GPA Suite ===
  Total Marks : 438/500
  Percentage  : 87.60%
  Grade       : B
  GPA (4.0)   : 3.50

=== PROJECT 3: Core Banking Operations ===
  Final My Account Balance: $1,300.00
  Transfer $400 from Alice to Bob : Success=true
  Alice New Balance              : $800.00
  Bob New Balance                : $700.00

=== PROJECT 4: Enterprise CommonUtils ===
  Email 'dev@google.com' Valid : true
  Email 'invalid-email' Valid  : false
  Masked CC Number             : ****-****-****-8945
  Formatted Large Currency     : $1,250,450.75`,
    lineByLine: [
      {
        line: 'Calculator.divide(15.0, 3.0);',
        explanation: 'Calls static division utility with zero-division validation guard.'
      },
      {
        line: 'StudentGrader.calculatePercentage(...)',
        explanation: 'Composes calculateTotal() to compute percentage and subsequent GPA mapping.'
      },
      {
        line: 'BankService.transferFunds(alice, bob, 400.0);',
        explanation: 'Demonstrates multi-party atomic transaction using array reference containers.'
      },
      {
        line: 'CommonUtils.maskCreditCard("4111-2222-3333-8945");',
        explanation: 'Strips non-digit characters and masks leading digits for security compliance.'
      }
    ],
    practicalExample: `public class PracticalApplication {
    public static void main(String[] args) {
        // Industry Simulation: Payroll Disburser Service
        String[] employees = {"Ravi Teja", "Priya Sharma", "Kiran Kumar"};
        double[] baseSalaries = {4500.0, 6200.0, 3800.0};
        double bonusRate = 0.15; // 15% bonus

        System.out.println("=== Corporate Payroll Processing Engine ===");
        for (int i = 0; i < employees.length; i++) {
            double bonus = baseSalaries[i] * bonusRate;
            double gross = baseSalaries[i] + bonus;
            double tax = gross * 0.10; // 10% tax
            double net = gross - tax;

            System.out.printf("Employee: %-14s | Gross: %s | Net: %s%n",
                    employees[i],
                    Main.CommonUtils.formatCurrency(gross),
                    Main.CommonUtils.formatCurrency(net));
        }
    }
}`,
    practicalOutput: `=== Corporate Payroll Processing Engine ===
Employee: Ravi Teja      | Gross: $5,175.00 | Net: $4,657.50
Employee: Priya Sharma   | Gross: $7,130.00 | Net: $6,417.00
Employee: Kiran Kumar    | Gross: $4,370.00 | Net: $3,933.00`,
    commonMistakes: [
      'Writing massive 200-line methods that mix business calculations, file I/O, and UI formatting.',
      'Ignoring division by zero edge cases in math utility methods.',
      'Failing to validate null or empty string parameters in public utility methods.',
      'Using vague method names like `doWork()` or `process()` instead of descriptive verbs like `calculateNetPay()`.'
    ],
    challenge: `// Coding Challenge:
// Add a method calculateMedian(double[] values) to CommonUtils:
// 1. Clones and sorts the array.
// 2. If length is odd, returns the middle element.
// 3. If length is even, returns the average of the two middle elements.

public class Challenge {
    public static double calculateMedian(double[] values) {
        if (values == null || values.length == 0) return 0.0;
        double[] sorted = values.clone();
        java.util.Arrays.sort(sorted);
        int n = sorted.length;
        if (n % 2 != 0) {
            return sorted[n / 2];
        }
        return (sorted[(n / 2) - 1] + sorted[n / 2]) / 2.0;
    }

    public static void main(String[] args) {
        System.out.println("Median (Odd) : " + calculateMedian(new double[]{5, 1, 9, 3, 7})); // 5.0
        System.out.println("Median (Even): " + calculateMedian(new double[]{1, 2, 3, 4}));    // 2.5
    }
}`,
    faq: [
      {
        q: 'What is a Pure Function in Java?',
        a: 'A pure function is a method that given the same inputs always returns the same output without causing observable side effects (like modifying static variables, changing database records, or printing to console).'
      },
      {
        q: 'How does Javadoc generate HTML documentation?',
        a: 'The JDK includes a `javadoc` command line tool (`javadoc -d docs src/*.java`) that parses `/** ... */` comments and builds responsive HTML documentation web pages.'
      },
      {
        q: 'Why should utility classes contain only static methods and private constructors?',
        a: 'Because utility classes (like `java.lang.Math` or `CommonUtils`) serve as stateless collections of helper methods. Adding a private constructor prevents accidental instantiation with `new CommonUtils()`.'
      }
    ],
    recap: [
      'Javadoc comments (`/** @param @return @throws */`) provide industry standard API documentation.',
      'Follow the Single Responsibility Principle: each method should accomplish one focused task.',
      'Modular systems compose small helper methods to build robust, testable software.',
      'Sanitize and validate all input arguments at method boundaries to prevent system crashes.',
      'Stateless utility libraries should encapsulate static methods with defensive edge-case guards.'
    ]
  }
];

const outputFile = path.join(__dirname, 'java_phase8_data.js');
const exportContent = 'module.exports = ' + JSON.stringify(phase8Data, null, 2) + ';\n';
fs.writeFileSync(outputFile, exportContent, 'utf8');
console.log('✅ Successfully wrote scratch/java_phase8_data.js via JSON serialization!');
