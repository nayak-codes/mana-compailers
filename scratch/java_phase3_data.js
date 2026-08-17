// Phase 3: Operators & User Input (Chapters 10 to 14)
// Exhaustive conceptual theory, Scanner newline trap explanations, operator precedence tables, printf formatting, and 5 Capstone Projects.

module.exports = [
  // ==========================================
  // CHAPTER 10: Arithmetic, Assignment & Relational Operators
  // ==========================================
  {
    num: 10,
    phaseId: 'phase3',
    phaseTitle: 'Phase 3: Operators and Input',
    slug: '10-java-operators-arithmetic-assignment-relational',
    title: 'Java Arithmetic, Assignment & Relational Operators',
    badge: '10. Basic Operators',
    subtopics: 'Arithmetic Operators (+, -, *, /, %) · Integer Division vs Floating-Point · String Concatenation Nuances · Compound Assignment · Relational Operators',
    readTime: '15 min read',
    intro: 'Deep dive into fundamental Java operators: arithmetic operations, integer division caveats, modulo arithmetic, string concatenation mechanics, shorthand compound assignments, and Boolean relational comparisons.',
    theorySections: [
      {
        heading: '1. Arithmetic Operators (+, -, *, /, %)',
        content: `Arithmetic operators perform standard mathematical operations on numeric data types:

| Operator | Name | Syntax | Example | Result |
| :--- | :--- | :--- | :--- | :--- |
| **\`+\`** | Addition | \`a + b\` | \`10 + 5\` | \`15\` |
| **\`-\`** | Subtraction | \`a - b\` | \`10 - 5\` | \`5\` |
| **\`*\`** | Multiplication | \`a * b\` | \`10 * 5\` | \`50\` |
| **\`/\`** | Division | \`a / b\` | \`10 / 4\` (int) vs \`10.0 / 4\` | \`2\` vs \`2.5\` |
| **\`%\`** | Modulus (Remainder) | \`a % b\` | \`10 % 3\` | \`1\` |

### The Critical Integer Division Trap:
In Java, if both operands of a division operator are integers (\`byte\`, \`short\`, \`int\`, \`long\`), Java performs **Integer Division**, automatically discarding any decimal fraction:
\`\`\`java
int result1 = 7 / 2;     // Evaluates to 3 (decimal .5 discarded!)
double result2 = 7 / 2;   // Evaluates to 3.0 (division happened first as int!)
double result3 = 7.0 / 2; // Evaluates to 3.5 (one operand is double, so float division occurs)
\`\`\``
      },
      {
        heading: '2. String Concatenation with the `+` Operator',
        content: `The \`+\` operator in Java is **overloaded**:
1. When used between two numbers, it performs **Arithmetic Addition**.
2. When at least one operand is a \`String\`, it converts the other operand to text and performs **String Concatenation**.

### Left-to-Right Evaluation Order:
Because \`+\` evaluates from left to right:
\`\`\`java
System.out.println("Result: " + 10 + 20);   // Outputs: "Result: 1020"
System.out.println("Result: " + (10 + 20)); // Outputs: "Result: 30" (Parentheses force math first!)
System.out.println(10 + 20 + " is Total");  // Outputs: "30 is Total" (10+20 evaluated first)
\`\`\``
      },
      {
        heading: '3. Assignment & Compound Assignment Operators',
        content: `The simple assignment operator (\`=\`) assigns the evaluated value on the right to the variable on the left.

**Compound Assignment Operators** combine arithmetic and assignment into one concise, optimized step:

| Compound Operator | Equivalent Syntax | Behavior & Auto-Casting Feature |
| :--- | :--- | :--- |
| **\`x += 5\`** | \`x = (type)(x + 5)\` | Adds 5 to \`x\` and assigns back to \`x\`. Auto-casts to original type! |
| **\`x -= 5\`** | \`x = (type)(x - 5)\` | Subtracts 5 from \`x\`. |
| **\`x *= 5\`** | \`x = (type)(x * 5)\` | Multiplies \`x\` by 5. |
| **\`x /= 5\`** | \`x = (type)(x / 5)\` | Divides \`x\` by 5. |
| **\`x %= 5\`** | \`x = (type)(x % 5)\` | Computes \`x % 5\` and stores remainder. |

### The Secret Auto-Cast of Compound Operators:
\`\`\`java
byte b = 10;
// b = b + 5; // COMPILE ERROR: (b + 5) promotes to int, cannot assign int to byte
b += 5;       // WORKS! Equivalent to: b = (byte)(b + 5);
\`\`\``
      },
      {
        heading: '4. Relational (Comparison) Operators',
        content: `Relational operators compare two values and always return a primitive \`boolean\` result (\`true\` or \`false\`):

| Operator | Meaning | Example (\`a = 10, b = 20\`) | Result |
| :--- | :--- | :--- | :--- |
| **\`==\`** | Equal to | \`a == b\` | \`false\` |
| **\`!=\`** | Not equal to | \`a != b\` | \`true\` |
| **\`>\`** | Greater than | \`a > b\` | \`false\` |
| **\`<\`** | Less than | \`a < b\` | \`true\` |
| **\`>=\`** | Greater than or equal to | \`a >= 10\` | \`true\` |
| **\`<=\`** | Less than or equal to | \`b <= 20\` | \`true\` |`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // 1. Arithmetic Operations
        int a = 25;
        int b = 4;

        System.out.println("--- Arithmetic Operators Demo ---");
        System.out.println("a + b = " + (a + b)); // 29
        System.out.println("a - b = " + (a - b)); // 21
        System.out.println("a * b = " + (a * b)); // 100
        System.out.println("a / b (Integer Division) = " + (a / b));       // 6
        System.out.println("a / b (Decimal Division) = " + ((double)a / b)); // 6.25
        System.out.println("a % b (Remainder)        = " + (a % b));       // 1

        // 2. Compound Assignment Operators
        int score = 100;
        score += 50;  // score = 150
        score *= 2;   // score = 300
        score -= 75;  // score = 225
        System.out.println("\nFinal Computed Score: " + score);

        // 3. Relational Comparisons
        int passingMark = 40;
        int studentScore = 78;
        boolean hasPassed = studentScore >= passingMark;
        boolean isPerfect = studentScore == 100;

        System.out.println("\n--- Relational Checks ---");
        System.out.println("Student Passed Exam: " + hasPassed);
        System.out.println("Student Got 100%   : " + isPerfect);
    }
}`,
    output: `--- Arithmetic Operators Demo ---
a + b = 29
a - b = 21
a * b = 100
a / b (Integer Division) = 6
a / b (Decimal Division) = 6.25
a % b (Remainder)        = 1

Final Computed Score: 225

--- Relational Checks ---
Student Passed Exam: true
Student Got 100%   : false`,
    lineByLine: [
      { line: '(double)a / b', explanation: 'Explicitly casts variable \'a\' to double before division, forcing floating-point division (6.25) instead of truncated integer division (6).' },
      { line: 'a % b', explanation: 'Modulus operator computes the integer remainder left over after dividing 25 by 4 (which is 1).' },
      { line: 'score += 50;', explanation: 'Compound addition assignment shorthand equivalent to score = score + 50.' },
      { line: 'boolean hasPassed = studentScore >= passingMark;', explanation: 'Evaluates whether 78 >= 40, assigning the boolean outcome true.' }
    ],
    practicalExample: `public class EvenOddModulusDemo {
    public static void main(String[] args) {
        int[] testNumbers = { 14, 27, 40, 99, 102 };

        System.out.println("=== Even / Odd Classification with Modulo (%) ===");
        for (int num : testNumbers) {
            boolean isEven = (num % 2 == 0);
            System.out.println("Number " + num + " is: " + (isEven ? "EVEN" : "ODD"));
        }
    }
}`,
    practicalOutput: `=== Even / Odd Classification with Modulo (%) ===
Number 14 is: EVEN
Number 27 is: ODD
Number 40 is: EVEN
Number 99 is: ODD
Number 102 is: EVEN`,
    commonMistakes: [
      'Forgetting parentheses in String concatenation: Writing "Sum: " + 10 + 20 outputs "Sum: 1020". Write "Sum: " + (10 + 20) to output "Sum: 30".',
      'Using single equals (=) instead of double equals (==): "if (x = 5)" is an assignment error in Java. Comparison must always use "==".',
      'Assuming (int / int) produces decimal: Writing "double ratio = 1 / 2;" stores 0.0, because 1/2 evaluates to 0 in integer math. Use "1.0 / 2.0".'
    ],
    challenge: `// Coding Challenge:
// Given totalSeconds = 3850:
// 1. Calculate hours = totalSeconds / 3600
// 2. Calculate remainingSeconds = totalSeconds % 3600
// 3. Calculate minutes = remainingSeconds / 60
// 4. Calculate seconds = remainingSeconds % 60
// Output in format: "3850 seconds = 1 hr, 4 min, 10 sec"

public class Main {
    public static void main(String[] args) {
        int totalSeconds = 3850;
        // TODO: Compute hours, minutes, and seconds using / and %
        
    }
}`,
    faq: [
      {
        q: 'What happens when you divide a floating point number by zero (e.g. 10.0 / 0.0)?',
        a: 'Unlike integer division (which throws ArithmeticException: / by zero), floating-point division by zero produces "Infinity" or "-Infinity", and 0.0 / 0.0 produces "NaN" (Not a Number).'
      },
      {
        q: 'Can modulus (%) be used with negative numbers in Java?',
        a: 'Yes! In Java, the sign of the result of a % b matches the sign of the dividend (a). For example, -7 % 3 = -1, and 7 % -3 = 1.'
      },
      {
        q: 'Why do compound operators auto-cast?',
        a: 'Java language specification defines compound assignments with an implicit cast: "E1 op= E2" is defined as "E1 = (T)((E1) op (E2))", where T is the type of E1.'
      }
    ],
    recap: [
      'Integer division truncates decimals; cast one operand to double to preserve fractions.',
      '+ operator performs addition for numbers, but concatenation if either operand is a String.',
      'Compound operators (+=, -=, etc.) automatically cast the evaluated result to the target type.',
      'Relational operators (==, !=, >, <, >=, <=) evaluate to boolean true or false.'
    ]
  },

  // ==========================================
  // CHAPTER 11: Logical, Bitwise, Unary & Ternary Operators
  // ==========================================
  {
    num: 11,
    phaseId: 'phase3',
    phaseTitle: 'Phase 3: Operators and Input',
    slug: '11-java-logical-bitwise-and-ternary-operators',
    title: 'Logical, Bitwise, Unary & Ternary Operators',
    badge: '11. Logical & Bitwise',
    subtopics: 'Logical Operators (&&, ||, !) · Short-Circuit Evaluation · Prefix vs Postfix (++x / x++) · Ternary Operator (? :) · Bitwise Operators · Operator Precedence Table',
    readTime: '16 min read',
    intro: 'Comprehensive masterclass on advanced Java operators: boolean logical operations with short-circuit evaluation, memory differences between prefix and postfix increment, the ternary conditional expression, low-level bitwise manipulation, and the complete operator precedence hierarchy.',
    theorySections: [
      {
        heading: '1. Logical Operators & Short-Circuit Evaluation',
        content: `Logical operators combine multiple boolean expressions:

| Operator | Name | Logic |
| :--- | :--- | :--- |
| **\`&&\`** | Logical AND (Short-Circuit) | Returns \`true\` ONLY IF both operands are \`true\`. |
| **\`\|\|\`** | Logical OR (Short-Circuit) | Returns \`true\` IF AT LEAST ONE operand is \`true\`. |
| **\`!\`** | Logical NOT (Inversion) | Reverses truth value (\`!true\` -> \`false\`, \`!false\` -> \`true\`). |

### The Power of Short-Circuit Evaluation:
- **\`&&\` (AND):** If the left operand is \`false\`, the overall result is guaranteed to be \`false\`. The JVM **skips evaluating the right operand entirely**!
- **\`||\` (OR):** If the left operand is \`true\`, the overall result is guaranteed to be \`true\`. The JVM **skips evaluating the right operand**!

This prevents runtime \`NullPointerException\` crashes by safely guarding calls:
\`\`\`java
String user = null;
// Safe: left condition is false, so user.length() is NEVER called!
if (user != null && user.length() > 0) {
    System.out.println("Valid user");
}
\`\`\``
      },
      {
        heading: '2. Increment & Decrement: Prefix (\`++x\`) vs Postfix (\`x++\`)',
        content: `The increment (\`++\`) and decrement (\`--\`) operators modify a variable by \`1\`:

\`\`\`
+-----------------------------------------------------------------------------------+
|                        PREFIX vs POSTFIX INCREMENT                                |
+-----------------------------------------------------------------------------------+
|  1. PREFIX (++x): "UPDATE FIRST, USE SECOND"                                      |
|     int x = 5;                                                                    |
|     int y = ++x; // Step 1: x increments to 6. Step 2: y is assigned 6.           |
|     (x = 6, y = 6)                                                                |
+-----------------------------------------------------------------------------------+
|  2. POSTFIX (x++): "USE FIRST, UPDATE SECOND"                                     |
|     int a = 5;                                                                    |
|     int b = a++; // Step 1: b is assigned old value 5. Step 2: a increments to 6. |
|     (a = 6, b = 5)                                                                |
+-----------------------------------------------------------------------------------+
\`\`\``
      },
      {
        heading: '3. Ternary Conditional Operator (\`? :\`)',
        content: `The **Ternary Operator** is a concise one-line shorthand for a simple \`if-else\` statement that returns a value:

\`\`\`
variable = (condition) ? expressionIfTrue : expressionIfFalse;
\`\`\`

\`\`\`java
int score = 85;
String status = (score >= 50) ? "PASS" : "FAIL";

int a = 10, b = 25;
int max = (a > b) ? a : b; // Evaluates to 25
\`\`\``
      },
      {
        heading: '4. Bitwise Operators & Bit Shifts',
        content: `Bitwise operators perform direct binary bit manipulation on integer types:

| Operator | Name | Bit Operation |
| :--- | :--- | :--- |
| **\`&\`** | Bitwise AND | Bit is 1 if both corresponding bits are 1. |
| **\`\|\`** | Bitwise OR | Bit is 1 if either corresponding bit is 1. |
| **\`^\`** | Bitwise XOR | Bit is 1 if corresponding bits are DIFFERENT. |
| **\`~\`** | Bitwise NOT (Invert) | Inverts all bits (0 becomes 1, 1 becomes 0). |
| **\`<<\`** | Left Shift | Shifts bits left, filling with 0 ($x \times 2^n$). |
| **\`>>\`** | Signed Right Shift | Shifts bits right, preserving sign bit ($x / 2^n$). |
| **\`>>>\`** | Unsigned Right Shift | Shifts bits right, always filling MSB with 0. |`
      },
      {
        heading: '5. Complete Operator Precedence & Associativity Table',
        content: `When multiple operators appear in one expression, Java evaluates them according to strict precedence (highest to lowest):

| Rank | Operator Category | Operators | Associativity |
| :--- | :--- | :--- | :--- |
| **1 (Highest)** | Postfix & Grouping | \`()\`, \`[]\`, \`.\`, \`x++\`, \`x--\` | Left to Right |
| **2** | Unary Prefix | \`++x\`, \`--x\`, \`+\`, \`-\`, \`!\`, \`~\`, \`(type)\` | **Right to Left** |
| **3** | Multiplicative | \`*\`, \`/\`, \`%\` | Left to Right |
| **4** | Additive | \`+\`, \`-\` | Left to Right |
| **5** | Shift | \`<<\`, \`>>\`, \`>>>\` | Left to Right |
| **6** | Relational | \`<\`, \`<=\`, \`>\`, \`>=\`, \`instanceof\` | Left to Right |
| **7** | Equality | \`==\`, \`!=\` | Left to Right |
| **8** | Bitwise AND / XOR / OR | \`&\`, \`^\`, \`\|\` | Left to Right |
| **9** | Logical AND / OR | \`&&\`, \`\|\|\` | Left to Right |
| **10** | Ternary Conditional | \`? :\` | **Right to Left** |
| **11 (Lowest)** | Assignment | \`=\`, \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`%=\` | **Right to Left** |`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // 1. Short-Circuit Logical Evaluation
        int age = 22;
        boolean hasVoterCard = true;
        boolean canVote = (age >= 18) && hasVoterCard;
        System.out.println("Voting Eligibility: " + canVote);

        // 2. Prefix vs Postfix Increment
        int p = 10;
        int q = ++p; // Prefix: p becomes 11, q receives 11
        System.out.println("Prefix (p, q)  : p=" + p + ", q=" + q);

        int m = 10;
        int n = m++; // Postfix: n receives 10, m becomes 11
        System.out.println("Postfix (m, n) : m=" + m + ", n=" + n);

        // 3. Ternary Operator
        double cartTotal = 1500.00;
        double shippingFee = (cartTotal >= 1000.00) ? 0.00 : 50.00;
        System.out.println("Cart: ₹" + cartTotal + " | Shipping Fee: ₹" + shippingFee);

        // 4. Bitwise Operations
        int bitA = 0b0101; // 5 in binary
        int bitB = 0b0011; // 3 in binary
        System.out.println("\n--- Bitwise Operations (5 & 3) ---");
        System.out.println("5 & 3 (AND) : " + (bitA & bitB)); // 0001 = 1
        System.out.println("5 | 3 (OR)  : " + (bitA | bitB)); // 0111 = 7
        System.out.println("5 ^ 3 (XOR) : " + (bitA ^ bitB)); // 0110 = 6
        System.out.println("5 << 1 (Shift Left * 2): " + (bitA << 1)); // 10
    }
}`,
    output: `Voting Eligibility: true
Prefix (p, q)  : p=11, q=11
Postfix (m, n) : m=11, n=10
Cart: ₹1500.0 | Shipping Fee: ₹0.0

--- Bitwise Operations (5 & 3) ---
5 & 3 (AND) : 1
5 | 3 (OR)  : 7
5 ^ 3 (XOR) : 6
5 << 1 (Shift Left * 2): 10`,
    lineByLine: [
      { line: '(age >= 18) && hasVoterCard', explanation: 'Logical AND: returns true only if both age >= 18 and hasVoterCard are true.' },
      { line: 'int q = ++p;', explanation: 'Prefix increment: increments p to 11 first, then assigns 11 to q.' },
      { line: 'int n = m++;', explanation: 'Postfix increment: assigns current value 10 to n first, then increments m to 11.' },
      { line: '(cartTotal >= 1000.00) ? 0.00 : 50.00', explanation: 'Ternary conditional: evaluates to 0.00 if cart is >= 1000, otherwise evaluates to 50.00.' }
    ],
    practicalExample: `public class AccessControlDemo {
    public static void main(String[] args) {
        boolean isAuthenticated = true;
        boolean isAdmin = false;
        boolean hasSpecialPermission = true;

        // Enterprise authorization rule:
        // User must be authenticated AND (be an Admin OR have special permission)
        boolean hasAccess = isAuthenticated && (isAdmin || hasSpecialPermission);

        String accessBadge = hasAccess ? "[ACCESS GRANTED] Level 2 Clearance" : "[ACCESS DENIED]";
        System.out.println("Security Check Result: " + accessBadge);
    }
}`,
    practicalOutput: `Security Check Result: [ACCESS GRANTED] Level 2 Clearance`,
    commonMistakes: [
      'Using single & instead of && for conditionals: Single & evaluates BOTH sides without short-circuiting, which can trigger NullPointerException if guarding null objects.',
      'Complex increment expressions: Writing "int z = x++ + ++x;" leads to unreadable code and subtle bugs. Keep increment operations on isolated lines.',
      'Over-nesting ternary operators: While (a ? (b ? c : d) : e) is valid syntax, deeply nested ternaries reduce readability. Use if-else if logic exceeds one level.'
    ],
    challenge: `// Coding Challenge:
// Given 3 numbers: a = 45, b = 78, c = 32:
// 1. Use nested ternary operators to find the largest of three numbers (largest)
// 2. Print: "Largest number is: 78"

public class Main {
    public static void main(String[] args) {
        int a = 45, b = 78, c = 32;
        // TODO: Find maximum using ternary operator
        
    }
}`,
    faq: [
      {
        q: 'What is the performance difference between bitwise shift (x << 1) and multiplication (x * 2)?',
        a: 'In modern Java JIT compilers, (x * 2) is automatically optimized to bit shift machine instructions at compile-time. Use arithmetic multiplication for mathematical clarity, and bit shifts when manipulating raw binary protocol flags.'
      },
      {
        q: 'Why does ++x operate Right-to-Left?',
        a: 'Unary operators bind directly to their immediate right operand, evaluating before lower-priority additive or assignment operations.'
      },
      {
        q: 'What is the unsigned right shift (>>>)?',
        a: 'The standard right shift (>>) preserves the sign bit (fills with 1 for negative numbers), while unsigned right shift (>>>) always shifts in zeros regardless of whether the number is positive or negative.'
      }
    ],
    recap: [
      '&& and || perform short-circuit evaluation, skipping right operands when outcomes are predetermined.',
      'Prefix (++x) increments before value retrieval; Postfix (x++) retrieves old value before incrementing.',
      'Ternary operator (condition ? valTrue : valFalse) provides a clean inline return expression.',
      'Operator precedence controls execution ordering; use parentheses () to enforce explicit intent.'
    ]
  },

  // ==========================================
  // CHAPTER 12: Java User Input with Scanner
  // ==========================================
  {
    num: 12,
    phaseId: 'phase3',
    phaseTitle: 'Phase 3: Operators and Input',
    slug: '12-java-user-input-scanner-complete-guide',
    title: 'Java User Input with Scanner & Newline Trap',
    badge: '12. Scanner & User Input',
    subtopics: 'java.util.Scanner · Reading Data (nextInt, nextDouble, nextLine) · The Infamous Newline Buffer Trap · InputMismatchException · Resource Management & closing Scanner',
    readTime: '16 min read',
    intro: 'Complete guide to interactive console input in Java using the java.util.Scanner class: reading primitives and strings, fixing the notorious "Newline Buffer Trap" when mixing numbers and text, handling input mismatch exceptions defensively, and closing resource streams properly.',
    theorySections: [
      {
        heading: '1. What is the Scanner Class?',
        content: `The **\`Scanner\`** class (located in the \`java.util\` package) is Java's most versatile utility for parsing primitive data types and strings from standard console input (\`System.in\`), files, or network streams.

### Basic Scanner Setup:
\`\`\`java
import java.util.Scanner; // 1. Import class

Scanner input = new Scanner(System.in); // 2. Create Scanner object reading System.in
System.out.print("Enter your name: ");
String name = input.nextLine(); // 3. Read input
input.close(); // 4. Close scanner resource
\`\`\``
      },
      {
        heading: '2. Standard Scanner Reading Methods',
        content: `| Method | Return Type | What It Reads |
| :--- | :--- | :--- |
| **\`nextLine()\`** | \`String\` | Reads the entire line of text until the user presses Enter (\`\\n\`). |
| **\`next()\`** | \`String\` | Reads only the next single word (stops at whitespace or space). |
| **\`nextInt()\`** | \`int\` | Scans the next token of input as an \`int\`. |
| **\`nextDouble()\`**| \`double\` | Scans the next token as a \`double\` decimal. |
| **\`nextLong()\`** | \`long\` | Scans the next token as a 64-bit \`long\`. |
| **\`nextBoolean()\`**| \`boolean\` | Scans the next token as \`true\` or \`false\`. |`
      },
      {
        heading: '3. The Infamous "Newline Buffer Trap" & The Professional Fix',
        content: `The single most common bug encountered by Java developers when reading input is the **Newline Buffer Trap**:

### What Causes the Trap?
When you use numeric methods like \`nextInt()\` or \`nextDouble()\`, the Scanner reads the number, but **leaves the trailing Enter key newline character (\`\\n\`) sitting in the input buffer**:

\`\`\`java
System.out.print("Enter Age: ");
int age = scanner.nextInt(); // User types '21' + presses ENTER. nextInt() reads 21, but leaves '\\n' in buffer!

System.out.print("Enter Full Name: ");
String name = scanner.nextLine(); // nextLine() reads the leftover '\\n' IMMEDIATELY and returns empty string ""!
// The user is NEVER prompted to enter their name!
\`\`\`

### The Professional Fix:
Whenever you call \`nextLine()\` **after** calling \`nextInt()\`, \`nextDouble()\`, or \`next()\`, you **must insert a dummy \`scanner.nextLine()\`** to consume the orphaned newline character:

\`\`\`java
System.out.print("Enter Age: ");
int age = scanner.nextInt();
scanner.nextLine(); // FIX: Consumes leftover newline character '\\n'

System.out.print("Enter Full Name: ");
String name = scanner.nextLine(); // Works perfectly! Prompts user for name.
\`\`\``
      },
      {
        heading: '4. Handling \`InputMismatchException\` Gracefully',
        content: `If you prompt for an integer with \`scanner.nextInt()\` and the user enters text (\`"twenty"\`), the Scanner throws a runtime **\`java.util.InputMismatchException\`** and crashes the program.

### Defensive Validation using \`hasNextInt()\`:
\`\`\`java
if (scanner.hasNextInt()) {
    int age = scanner.nextInt();
    System.out.println("Valid age: " + age);
} else {
    System.out.println("Invalid input! Please enter a valid numerical integer.");
}
\`\`\``
      }
    ],
    codeExample: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("==========================================");
        System.out.println("   STUDENT ENROLLMENT CONSOLE SYSTEM      ");
        System.out.println("==========================================");

        // 1. Reading Integer
        System.out.print("Enter Student ID (e.g. 101): ");
        int studentId = scanner.nextInt();

        // 2. Reading Double
        System.out.print("Enter Current GPA (e.g. 3.85): ");
        double gpa = scanner.nextDouble();

        // 3. CRITICAL: Consume leftover newline from buffer
        scanner.nextLine();

        // 4. Reading Full Line of Text
        System.out.print("Enter Full Name (e.g. Balaji Nayak): ");
        String fullName = scanner.nextLine();

        // 5. Reading Boolean
        System.out.print("Is Enrolled Full-Time? (true/false): ");
        boolean isFullTime = scanner.nextBoolean();

        // Display summary
        System.out.println("\n--- Registered Student Summary ---");
        System.out.println("ID        : #" + studentId);
        System.out.println("Name      : " + fullName);
        System.out.println("GPA       : " + gpa);
        System.out.println("Full-Time : " + (isFullTime ? "YES" : "NO"));

        scanner.close(); // Clean up resource stream
    }
}`,
    output: `==========================================
   STUDENT ENROLLMENT CONSOLE SYSTEM      
==========================================
Enter Student ID (e.g. 101): 101
Enter Current GPA (e.g. 3.85): 3.85
Enter Full Name (e.g. Balaji Nayak): Balaji Nayak
Is Enrolled Full-Time? (true/false): true

--- Registered Student Summary ---
ID        : #101
Name      : Balaji Nayak
GPA       : 3.85
Full-Time : YES`,
    lineByLine: [
      { line: 'Scanner scanner = new Scanner(System.in);', explanation: 'Creates a new Scanner object linked to standard console input stream System.in.' },
      { line: 'int studentId = scanner.nextInt();', explanation: 'Parses the next integer token from the console stream.' },
      { line: 'scanner.nextLine(); // Clean buffer', explanation: 'Essential buffer clean-up consuming the trailing newline character leftover from nextDouble().' },
      { line: 'String fullName = scanner.nextLine();', explanation: 'Reads the entire line of text including spaces until the Enter key is pressed.' },
      { line: 'scanner.close();', explanation: 'Closes the scanner instance to prevent underlying OS stream resource leaks.' }
    ],
    practicalExample: `import java.util.Scanner;

public class SimpleBillCalculator {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("--- Supermarket POS Billing System ---");
        System.out.print("Enter Item Name: ");
        String itemName = input.nextLine();

        System.out.print("Enter Unit Price (₹): ");
        double unitPrice = input.nextDouble();

        System.out.print("Enter Quantity Purchased: ");
        int quantity = input.nextInt();

        // Calculate Subtotal & 18% GST
        double subtotal = unitPrice * quantity;
        double gstAmount = subtotal * 0.18;
        double grandTotal = subtotal + gstAmount;

        System.out.println("\n========= INVOICE RECEIPT =========");
        System.out.println("Item      : " + itemName);
        System.out.println("Quantity  : " + quantity + " units @ ₹" + unitPrice);
        System.out.println("Subtotal  : ₹" + subtotal);
        System.out.println("GST (18%) : ₹" + gstAmount);
        System.out.println("Total Due : ₹" + grandTotal);
        System.out.println("===================================");

        input.close();
    }
}`,
    practicalOutput: `--- Supermarket POS Billing System ---
Enter Item Name: Wireless Keyboard
Enter Unit Price (₹): 1250.00
Enter Quantity Purchased: 2

========= INVOICE RECEIPT =========
Item      : Wireless Keyboard
Quantity  : 2 units @ ₹1250.0
Subtotal  : ₹2500.0
GST (18%) : ₹450.0
Total Due : ₹2950.0
===================================`,
    commonMistakes: [
      'The Newline Trap: Calling nextLine() immediately after nextInt() without a dummy nextLine() to clear the newline character.',
      'Using next() when reading multi-word strings: "scanner.next()" only reads up to the first space. Entering "John Doe" will capture only "John". Always use "scanner.nextLine()" for full names/addresses.',
      'Closing Scanner inside loops: Closing scanner closes the underlying System.in stream. Once System.in is closed, it cannot be reopened in the same JVM session!'
    ],
    challenge: `// Coding Challenge:
// Write a program that asks the user for:
// 1. Principal Amount (double)
// 2. Annual Interest Rate in % (double)
// 3. Time Duration in Years (int)
// Compute Simple Interest: SI = (P * R * T) / 100
// Print the Simple Interest and Total Amount Payable.

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        // TODO: Read P, R, T and compute Simple Interest
        
        input.close();
    }
}`,
    faq: [
      {
        q: 'Why should we close the Scanner (scanner.close())?',
        a: 'Scanner implements the AutoCloseable interface. Closing it releases underlying system file handles or stream resources. Note: closing a scanner tied to System.in also closes System.in for the rest of the application.'
      },
      {
        q: 'How does Scanner differentiate between next() and nextLine()?',
        a: '"next()" uses whitespace (spaces, tabs, newlines) as delimiters and returns the next single token. "nextLine()" uses only newline (\\n or \\r\\n) as the delimiter and returns the entire sentence.'
      },
      {
        q: 'What is the modern alternative to Scanner for reading passwords without echoing characters?',
        a: 'Use "System.console().readPassword()" which masks user input and returns a char array for secure memory clearing.'
      }
    ],
    recap: [
      'java.util.Scanner parses primitives and text from standard input (System.in).',
      'Use nextLine() for full lines, next() for single words, nextInt()/nextDouble() for numbers.',
      'Always insert a dummy scanner.nextLine() after reading numbers before reading text to clear the buffer.',
      'Close scanner with scanner.close() when input processing is complete.'
    ]
  },

  // ==========================================
  // CHAPTER 13: Formatted Output with printf() & Math Library
  // ==========================================
  {
    num: 13,
    phaseId: 'phase3',
    phaseTitle: 'Phase 3: Operators and Input',
    slug: '13-java-formatted-output-printf-and-math',
    title: 'Formatted Output with printf() & Math Utilities',
    badge: '13. printf() & Math Library',
    subtopics: 'System.out.printf() · String.format() · Format Specifiers (%d, %f, %.2f, %s, %-15s) · java.lang.Math Library (sqrt, pow, abs, max, min, round, random)',
    readTime: '15 min read',
    intro: 'Mastering output presentation and mathematical computation in Java: formatting currency, tables, and decimals with printf() and String.format(), along with exhaustive exploration of the standard java.lang.Math utility library.',
    theorySections: [
      {
        heading: '1. Formatted Output with \`System.out.printf()\`',
        content: `While \`System.out.println()\` is useful for basic strings, real-world applications (like financial reports and command-line tables) require **precise column alignment and decimal rounding**.

Java provides \`System.out.printf()\` and \`String.format()\` modeled after C-style format strings:

\`\`\`java
System.out.printf("Format String with %specifiers", arg1, arg2, ...);
\`\`\`

### Common Format Specifiers:
| Specifier | Data Type | Description & Example |
| :--- | :--- | :--- |
| **\`%d\`** | Integer (\`byte\`, \`short\`, \`int\`, \`long\`) | Decimal integer: \`printf("%d", 100)\` -> \`100\` |
| **\`%f\`** | Floating Point (\`float\`, \`double\`) | Decimal number: \`printf("%f", 3.14)\` -> \`3.140000\` |
| **\`%.2f\`** | Formatted Floating Point | Rounds to 2 decimal places: \`printf("%.2f", 3.14159)\` -> \`3.14\` |
| **\`%s\`** | String | Text string: \`printf("Hello %s", "Ravi")\` -> \`Hello Ravi\` |
| **\`%c\`** | Character | Single character: \`printf("Grade: %c", 'A')\` -> \`Grade: A\` |
| **\`%b\`** | Boolean | Boolean value: \`printf("%b", true)\` -> \`true\` |
| **\`%n\`** | Newline | Platform-independent newline separator (prefer over \`\\n\`). |`
      },
      {
        heading: '2. Column Width & Text Alignment Flags',
        content: `You can align columns into clean tabular layouts using width and alignment flags:

- **\`%15s\` (Right-aligned):** Pads the string with spaces to occupy at least 15 character widths.
- **\`%-15s\` (Left-aligned):** Pads spaces on the right to align text neatly to the left margin.
- **\`%05d\` (Zero-padding):** Pads numbers with leading zeros (e.g. \`00100\`).
- **\`%,d\` (Comma Thousands Separator):** Formats large numbers with commas (e.g. \`1,000,000\`).`
      },
      {
        heading: '3. The Built-in \`java.lang.Math\` Library',
        content: `The \`Math\` class contains static mathematical functions and constants (\`Math.PI\`, \`Math.E\`):

| Method | Returns | Description | Example |
| :--- | :--- | :--- | :--- |
| **\`Math.sqrt(x)\`** | \`double\` | Square root of \`x\`. | \`Math.sqrt(16.0)\` -> \`4.0\` |
| **\`Math.pow(base, exp)\`** | \`double\` | Computes $\\text{base}^{\\text{exp}}$. | \`Math.pow(2, 3)\` -> \`8.0\` |
| **\`Math.abs(x)\`** | same | Absolute positive value of \`x\`. | \`Math.abs(-25)\` -> \`25\` |
| **\`Math.max(a, b)\`** | same | Returns the larger of two values. | \`Math.max(10, 20)\` -> \`20\` |
| **\`Math.min(a, b)\`** | same | Returns the smaller of two values. | \`Math.min(10, 20)\` -> \`10\` |
| **\`Math.round(x)\`** | \`long\` | Rounds float/double to nearest integer. | \`Math.round(4.6)\` -> \`5\` |
| **\`Math.floor(x)\`** | \`double\` | Rounds down to nearest integer. | \`Math.floor(4.9)\` -> \`4.0\` |
| **\`Math.ceil(x)\`** | \`double\` | Rounds up to nearest integer. | \`Math.ceil(4.1)\` -> \`5.0\` |
| **\`Math.random()\`** | \`double\` | Generates pseudo-random decimal between \`0.0\` (inclusive) and \`1.0\` (exclusive). | \`(int)(Math.random() * 100) + 1\` (1-100) |`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // 1. Formatted Output with printf()
        String productName = "MacBook Pro M3";
        int stockQuantity  = 42;
        double unitPrice   = 199999.956;

        System.out.println("--- Table Formatting with printf ---");
        System.out.printf("%-20s %-10s %-15s%n", "ITEM NAME", "QTY", "PRICE (INR)");
        System.out.println("--------------------------------------------------");
        System.out.printf("%-20s %-10d ₹%,.2f%n", productName, stockQuantity, unitPrice);
        System.out.printf("%-20s %-10d ₹%,.2f%n", "Magic Mouse", 120, 8500.00);
        System.out.printf("%-20s %-10d ₹%,.2f%n", "USB-C Adapter", 300, 1900.50);

        // 2. Math Library Utilities
        System.out.println("\n--- java.lang.Math Utilities ---");
        System.out.println("Square Root of 144 : " + Math.sqrt(144));
        System.out.println("2 raised to 8 (2^8): " + Math.pow(2, 8));
        System.out.println("Absolute of -50.5  : " + Math.abs(-50.5));
        System.out.println("Max of (120, 85)   : " + Math.max(120, 85));
        System.out.println("Round 99.6         : " + Math.round(99.6));

        // 3. Random Number Generation between 1 and 6 (Dice Roll)
        int diceRoll = (int)(Math.random() * 6) + 1;
        System.out.println("Random Dice Roll (1-6): " + diceRoll);
    }
}`,
    output: `--- Table Formatting with printf ---
ITEM NAME            QTY        PRICE (INR)    
--------------------------------------------------
MacBook Pro M3       42         ₹199,999.96
Magic Mouse          120        ₹8,500.00
USB-C Adapter        300        ₹1,900.50

--- java.lang.Math Utilities ---
Square Root of 144 : 12.0
2 raised to 8 (2^8): 256.0
Absolute of -50.5  : 50.5
Max of (120, 85)   : 120
Round 99.6         : 100
Random Dice Roll (1-6): 4`,
    lineByLine: [
      { line: '%-20s %-10d ₹%,.2f%n', explanation: 'Formats line: 20-character left-aligned string, 10-char integer, comma-separated double rounded to 2 decimal places, followed by newline.' },
      { line: 'Math.sqrt(144)', explanation: 'Calculates the mathematical square root returning double 12.0.' },
      { line: 'Math.pow(2, 8)', explanation: 'Calculates 2 to the power of 8 returning double 256.0.' },
      { line: '(int)(Math.random() * 6) + 1', explanation: 'Scales Math.random() (0.0 to 0.999) to range 0-5, casts to int, and offsets by +1 yielding random integer 1 to 6.' }
    ],
    practicalExample: `public class CircleGeometryEngine {
    public static void main(String[] args) {
        double radius = 7.5; // Circle radius in cm

        // Area = PI * r^2
        double area = Math.PI * Math.pow(radius, 2);
        
        // Circumference = 2 * PI * r
        double circumference = 2 * Math.PI * radius;

        System.out.println("=== Circle Geometric Calculations ===");
        System.out.printf("Radius        : %.2f cm%n", radius);
        System.out.printf("Area          : %.4f sq.cm%n", area);
        System.out.printf("Circumference : %.4f cm%n", circumference);
    }
}`,
    practicalOutput: `=== Circle Geometric Calculations ===
Radius        : 7.50 cm
Area          : 176.7146 sq.cm
Circumference : 47.1239 cm`,
    commonMistakes: [
      'Using %d for floating point numbers: Passing a double to %d throws IllegalFormatConversionException at runtime. Use %f or %.2f.',
      'Misunderstanding Math.random() range: Math.random() never returns 1.0 (it returns 0.0 <= x < 1.0). To generate numbers 1 to 10, write "(int)(Math.random() * 10) + 1".',
      'Forgetting %n in printf: Unlike println(), printf() does NOT append a newline automatically. You must end the format string with "%n" or "\\n".'
    ],
    challenge: `// Coding Challenge:
// Given a right-angled triangle with sides: a = 6.0, b = 8.0:
// 1. Calculate hypotenuse c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
// 2. Print formatted output: "Side A: 6.00, Side B: 8.00, Hypotenuse C: 10.00"

public class Main {
    public static void main(String[] args) {
        double a = 6.0, b = 8.0;
        // TODO: Compute hypotenuse using Math library and printf
        
    }
}`,
    faq: [
      {
        q: 'What is the difference between %n and \\n in printf?',
        a: '"%n" is the platform-independent line separator that outputs "\\r\\n" on Windows and "\\n" on Linux/macOS. Always use "%n" in printf for maximum portability.'
      },
      {
        q: 'Is the Math class constructor accessible?',
        a: 'No. The Math class in java.lang has a private constructor to prevent instantiation. All methods (sqrt, pow, abs) are static and called directly on the Math class name.'
      },
      {
        q: 'How does String.format() differ from System.out.printf()?',
        a: '"printf()" prints the formatted text directly to the console, while "String.format()" returns the formatted text as a new String object that can be stored in a variable, written to a file, or sent over a network.'
      }
    ],
    recap: [
      'System.out.printf() and String.format() format text using %d (integers), %f (decimals), %s (strings), and %n (newlines).',
      'Use %.2f to round decimals and %,d to include thousands separators.',
      'The java.lang.Math class provides static utilities: sqrt, pow, abs, max, min, round, and random.'
    ]
  },

  // ==========================================
  // CHAPTER 14: Java Basics & Input Capstone Projects
  // ==========================================
  {
    num: 14,
    phaseId: 'phase3',
    phaseTitle: 'Phase 3: Operators and Input',
    slug: '14-java-basics-and-input-capstone-projects',
    title: 'Java Basics & User Input Capstone Projects',
    badge: '14. Capstone Projects (5)',
    subtopics: '5 Comprehensive Projects: 1. Arithmetic Calculator · 2. Simple & Compound Interest · 3. Geometry Engine · 4. Unit Converter · 5. Supermarket POS Billing',
    readTime: '20 min read',
    intro: 'Consolidate all Phase 1, Phase 2, and Phase 3 knowledge by building 5 complete, standalone, production-grade Java console applications with user input parsing, mathematical formulas, formatted receipts, and robust defensive error checks.',
    theorySections: [
      {
        heading: '1. Overview of Phase 1-3 Capstone Projects',
        content: `In this capstone chapter, you will build 5 complete, industry-standard console applications combining everything learned across:
1. **Phase 1:** Program structure, \`main()\` method, compilation lifecycle, and debugging.
2. **Phase 2:** Variables, primitive data types (\`int\`, \`double\`, \`long\`, \`char\`, \`boolean\`), \`final\` constants, and type casting.
3. **Phase 3:** Arithmetic and relational operators, \`Scanner\` user input parsing, newline buffer cleanup, \`printf()\` tables, and the \`Math\` library.

### The 5 Capstone Projects:
- **Project 1:** Multi-Functional Arithmetic & Statistical Calculation Engine
- **Project 2:** Bank Financial Simple & Compound Interest Calculator
- **Project 3:** Geometric 2D/3D Sphere, Cylinder & Circle Measurement Engine
- **Project 4:** Multi-Unit Scientific Temperature & Speed Converter
- **Project 5:** Supermarket Itemized Point-of-Sale (POS) Billing Receipt Generator`
      }
    ],
    codeExample: `// PROJECT 1: Multi-Functional Arithmetic & Statistical Calculation Engine
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("==========================================");
        System.out.println("   PROJECT 1: ARITHMETIC ENGINE (JAVA)    ");
        System.out.println("==========================================");

        System.out.print("Enter First Number  (A): ");
        double numA = input.nextDouble();

        System.out.print("Enter Second Number (B): ");
        double numB = input.nextDouble();

        double sum        = numA + numB;
        double difference = numA - numB;
        double product    = numA * numB;
        double quotient   = (numB != 0) ? (numA / numB) : 0.0;
        double remainder  = (numB != 0) ? (numA % numB) : 0.0;
        double average    = sum / 2.0;
        double maxNum     = Math.max(numA, numB);
        double minNum     = Math.min(numA, numB);
        double powerAtoB  = Math.pow(numA, numB);

        System.out.println("\n--- Statistical & Mathematical Results ---");
        System.out.printf("Sum (A + B)          : %.2f%n", sum);
        System.out.printf("Difference (A - B)   : %.2f%n", difference);
        System.out.printf("Product (A * B)      : %.2f%n", product);
        if (numB != 0) {
            System.out.printf("Quotient (A / B)     : %.4f%n", quotient);
            System.out.printf("Remainder (A %% B)    : %.2f%n", remainder);
        } else {
            System.out.println("Division / Modulo    : Undefined (Cannot divide by zero)");
        }
        System.out.printf("Average              : %.2f%n", average);
        System.out.printf("Maximum Value        : %.2f%n", maxNum);
        System.out.printf("Minimum Value        : %.2f%n", minNum);
        System.out.printf("Power (A ^ B)        : %.2f%n", powerAtoB);

        input.close();
    }
}`,
    output: `==========================================
   PROJECT 1: ARITHMETIC ENGINE (JAVA)    
==========================================
Enter First Number  (A): 25.0
Enter Second Number (B): 4.0

--- Statistical & Mathematical Results ---
Sum (A + B)          : 29.00
Difference (A - B)   : 21.00
Product (A * B)      : 100.00
Quotient (A / B)     : 6.2500
Remainder (A % B)    : 1.00
Average              : 14.50
Maximum Value        : 25.00
Minimum Value        : 4.00
Power (A ^ B)        : 390625.00`,
    lineByLine: [
      { line: 'double quotient = (numB != 0) ? (numA / numB) : 0.0;', explanation: 'Defensive ternary check avoiding divide-by-zero errors when dividing numbers.' },
      { line: 'Math.pow(numA, numB)', explanation: 'Calculates base numA raised to the exponent numB.' },
      { line: 'printf("Quotient (A / B) : %.4f%n", quotient)', explanation: 'Outputs quotient with exactly 4 decimal places of floating-point precision.' }
    ],
    practicalExample: `// PROJECT 2: Banking Simple & Compound Interest Financial Calculator
import java.util.Scanner;

public class FinancialInterestCalculator {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("==========================================");
        System.out.println("   PROJECT 2: BANK INTEREST CALCULATOR    ");
        System.out.println("==========================================");

        System.out.print("Enter Principal Investment (₹): ");
        double principal = input.nextDouble();

        System.out.print("Enter Annual Interest Rate (%): ");
        double annualRate = input.nextDouble();

        System.out.print("Enter Investment Period (Years): ");
        double timeYears = input.nextDouble();

        // 1. Simple Interest: SI = (P * R * T) / 100
        double simpleInterest = (principal * annualRate * timeYears) / 100.0;
        double simpleTotal = principal + simpleInterest;

        // 2. Compound Interest (Compounded Annually): A = P * (1 + r/100)^t
        double compoundTotal = principal * Math.pow(1 + (annualRate / 100.0), timeYears);
        double compoundInterest = compoundTotal - principal;

        System.out.println("\n========== INVESTMENT MATURITY REPORT ==========");
        System.out.printf("Principal Deposit      : ₹%,.2f%n", principal);
        System.out.printf("Annual Interest Rate   : %.2f%%%n", annualRate);
        System.out.printf("Duration               : %.1f Years%n", timeYears);
        System.out.println("------------------------------------------------");
        System.out.printf("Simple Interest Earned : ₹%,.2f%n", simpleInterest);
        System.out.printf("Total with Simple Int. : ₹%,.2f%n", simpleTotal);
        System.out.println("------------------------------------------------");
        System.out.printf("Compound Interest      : ₹%,.2f%n", compoundInterest);
        System.out.printf("Total with Compound Int: ₹%,.2f%n", compoundTotal);
        System.out.printf("Wealth Advantage (CI-SI: ₹%,.2f%n", (compoundTotal - simpleTotal));
        System.out.println("================================================");

        input.close();
    }
}`,
    practicalOutput: `==========================================
   PROJECT 2: BANK INTEREST CALCULATOR    
==========================================
Enter Principal Investment (₹): 100000.00
Enter Annual Interest Rate (%): 8.5
Enter Investment Period (Years): 5

========== INVESTMENT MATURITY REPORT ==========
Principal Deposit      : ₹100,000.00
Annual Interest Rate   : 8.50%
Duration               : 5.0 Years
------------------------------------------------
Simple Interest Earned : ₹42,500.00
Total with Simple Int. : ₹142,500.00
------------------------------------------------
Compound Interest      : ₹50,365.67
Total with Compound Int: ₹150,365.67
Wealth Advantage (CI-SI: ₹7,865.67
================================================`,
    commonMistakes: [
      'Forgetting 100.0 divisor in percentage calculations: Using "annualRate / 100" with integers causes truncation. Always use 100.0.',
      'Misinterpreting Compound Interest formula: Compound formula A = P*(1+r)^t returns Total Maturity Amount; to find interest earned only, subtract Principal (A - P).',
      'Unformatted financial output: Printing raw double values outputs "150365.6718492" which looks unprofessional. Always use "₹%,.2f" for financial receipts.'
    ],
    challenge: `// Coding Challenge (PROJECT 5: Supermarket POS Billing):
// Write a complete program that asks for:
// 1. Customer Name (String)
// 2. Item 1: Name, Price, Quantity
// 3. Item 2: Name, Price, Quantity
// Calculate:
// - Subtotal = (Item1 Total + Item2 Total)
// - Discount (10% if Subtotal >= 2000, otherwise 0%)
// - Tax (18% GST on discounted total)
// - Net Payable Amount
// Print a clean, formatted receipt using System.out.printf().

public class Main {
    public static void main(String[] args) {
        // TODO: Build the complete POS Billing Receipt Generator
        
    }
}`,
    faq: [
      {
        q: 'How can I run these Java capstone projects directly in browser?',
        a: 'Click the "▶ Run in Compiler" button on any code snippet! Our system will automatically preload the source code into the interactive Online Java Compiler at /online-java-compiler.html.'
      },
      {
        q: 'Why should I use Math.pow() instead of a manual loop for exponents?',
        a: 'Math.pow() is an intrinsic JVM hardware-accelerated function that supports fractional powers (e.g. Math.pow(25, 0.5) for square root) and executes in constant CPU time O(1).'
      },
      {
        q: 'How do I handle inputs with spaces like "Balaji Nayak"?',
        a: 'Always use "scanner.nextLine()" rather than "scanner.next()", and ensure you clear the buffer with a dummy "scanner.nextLine()" after reading numbers.'
      }
    ],
    recap: [
      'Capstone 1: Built an interactive arithmetic & statistical analysis engine.',
      'Capstone 2: Built a bank interest comparison tool computing SI and CI with Math.pow().',
      'Capstone 3: Formatted professional POS receipts and tables with System.out.printf().',
      'You have mastered Phase 1, Phase 2, and Phase 3 of the Java Masterclass!'
    ]
  }
];
