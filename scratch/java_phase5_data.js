// Phase 5: Loops & Iterations (Chapters 19 to 22)
// Exhaustive conceptual theory, ASCII loop execution flowcharts, for/while/do-while, enhanced for-each, break/continue, and 10+ algorithms/patterns.

module.exports = [
  // ==========================================
  // CHAPTER 19: For Loop & Core Loop Mechanics
  // ==========================================
  {
    num: 19,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Loops & Control Flow',
    slug: '19-java-for-loop-and-loop-mechanics',
    title: 'Java for Loop & Core Loop Mechanics',
    badge: '19. for Loop & Mechanics',
    subtopics: 'Why Loops are Used (DRY Principle) · 3 Pillars (Initialization, Condition, Update) · for Loop Lifecycle · Infinite Loops · Sum of Numbers · Multiplication Table',
    readTime: '16 min read',
    intro: 'Mastering repetitive execution and iteration in Java: understanding why loops are foundational to software engineering, the 3 pillars of loop mechanics (initialization, boolean condition, and step update), standard for loop syntax, avoiding accidental infinite loops, and building mathematical accumulation algorithms.',
    theorySections: [
      {
        heading: '1. Why are Loops Used? (The DRY Principle)',
        content: `In computer programming, you frequently need to repeat an action multiple times:
- Printing numbers from 1 to 100.
- Processing 10,000 customer records from a database.
- Calculating monthly compounding interest over 30 years.

Without loops, printing 5 numbers requires writing 5 separate lines of code. Printing 1,000 numbers would require 1,000 lines!

**Loops** allow you to write a block of code **once** and instruct the CPU to execute it repeatedly as long as a specified condition remains \`true\`. This enforces the fundamental engineering principle of **DRY (Don\'t Repeat Yourself)**.

\`\`\`
                     +-----------------------+
                     | 1. INITIALIZATION     | (int i = 1)
                     +-----------------------+
                                 |
                                 v
               +------------> < 2. CONDITION? > (i <= 5)
               |                     |
               |              (Yes)  |  (No)
               |                     v    +------------> [ Exit Loop ]
               |           +-------------------+
               |           | 3. LOOP BODY      | (Execute statements)
               |           +-------------------+
               |                     |
               |                     v
               |           +-------------------+
               +-----------| 4. UPDATE / STEP  | (i++)
                           +-------------------+
\`\`\``
      },
      {
        heading: '2. The 3 Pillars of Every Loop',
        content: `Every loop in Java relies on three essential control components:

1. **Initialization:** Sets the starting point (e.g. \`int number = 1\`). Executes **only once** when the loop begins.
2. **Condition:** A boolean expression evaluated **before each iteration** (e.g. \`number <= 5\`). If \`true\`, the body executes; if \`false\`, the loop terminates.
3. **Update (Increment / Decrement):** Modifies the loop counter after each iteration (e.g. \`number++\`), moving the counter toward the termination condition to prevent infinite loops.`
      },
      {
        heading: '3. The Standard \`for\` Loop Syntax',
        content: `The \`for\` loop combines all three control pillars into one concise, elegant header:

\`\`\`java
for (initialization; condition; update) {
    // Code executed repeatedly
}
\`\`\`

### Execution Flow Step-by-Step:
1. **Step 1:** \`initialization\` executes once.
2. **Step 2:** \`condition\` is evaluated. If \`false\`, loop ends immediately.
3. **Step 3:** The code inside the loop body \`{}\` executes.
4. **Step 4:** \`update\` step executes (e.g. \`i++\`).
5. **Step 5:** Jumps back to **Step 2** and repeats!`
      },
      {
        heading: '4. Infinite Loops & How to Avoid Them',
        content: `An **Infinite Loop** occurs when the loop condition never becomes \`false\`, causing the program to run forever until memory or CPU resources are exhausted:

\`\`\`java
// Accidental Infinite Loop: counter is never incremented!
for (int i = 1; i <= 5; /* missing i++ */) {
    System.out.println(i);
}

// Deliberate Infinite Loop (Common in game loops & server listeners):
for (;;) {
    // Runs indefinitely until break is called
}
\`\`\``
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. Basic Counting Loop (1 to 5) ===");
        // The Canonical Beginner For Loop
        for (int number = 1; number <= 5; number++) {
            System.out.println("Current Number: " + number);
        }

        System.out.println("\n=== 2. Mathematical Multiplication Table (Table of 7) ===");
        int multiplier = 7;
        for (int i = 1; i <= 10; i++) {
            System.out.printf("%d x %2d = %2d%n", multiplier, i, (multiplier * i));
        }

        System.out.println("\n=== 3. Sum of First 100 Natural Numbers ===");
        int totalSum = 0;
        for (int n = 1; n <= 100; n++) {
            totalSum += n; // Accumulator
        }
        System.out.println("Sum of numbers from 1 to 100 = " + totalSum);
    }
}`,
    output: `=== 1. Basic Counting Loop (1 to 5) ===
Current Number: 1
Current Number: 2
Current Number: 3
Current Number: 4
Current Number: 5

=== 2. Mathematical Multiplication Table (Table of 7) ===
7 x  1 =  7
7 x  2 = 14
7 x  3 = 21
7 x  4 = 28
7 x  5 = 35
7 x  6 = 42
7 x  7 = 49
7 x  8 = 56
7 x  9 = 63
7 x 10 = 70

=== 3. Sum of First 100 Natural Numbers ===
Sum of numbers from 1 to 100 = 5050`,
    lineByLine: [
      { line: 'for (int number = 1; number <= 5; number++)', explanation: 'Initializes number = 1; tests if number <= 5 before each run; increments number by 1 after each run.' },
      { line: 'printf("%d x %2d = %2d%n", multiplier, i, ...)', explanation: 'Prints aligned multiplication table rows using %2d for clean 2-digit column width.' },
      { line: 'totalSum += n;', explanation: 'Accumulator pattern adding the current loop counter n into the cumulative totalSum variable.' }
    ],
    practicalExample: `public class MonthlySavingsInvestmentPlan {
    public static void main(String[] args) {
        double monthlyDeposit = 5000.00;
        double annualReturnRate = 0.12; // 12% annual interest
        double monthlyRate = annualReturnRate / 12;
        int totalMonths = 12;

        double accumulatedCorpus = 0;

        System.out.println("=== 1-Year Recurring Deposit Growth Schedule ===");
        System.out.printf("%-8s %-15s %-18s%n", "MONTH", "DEPOSIT (₹)", "TOTAL BALANCE (₹)");
        System.out.println("----------------------------------------------");

        for (int month = 1; month <= totalMonths; month++) {
            // Deposit funds and add monthly compounding interest
            accumulatedCorpus = (accumulatedCorpus + monthlyDeposit) * (1 + monthlyRate);
            System.out.printf("Month %-2d  ₹%,-13.2f ₹%,-15.2f%n", month, monthlyDeposit, accumulatedCorpus);
        }

        System.out.println("----------------------------------------------");
        System.out.printf("Total Capital Invested : ₹%,.2f%n", (monthlyDeposit * totalMonths));
        System.out.printf("Final Maturity Corpus  : ₹%,.2f%n", accumulatedCorpus);
    }
}`,
    practicalOutput: `=== 1-Year Recurring Deposit Growth Schedule ===
MONTH    DEPOSIT (₹)     TOTAL BALANCE (₹) 
----------------------------------------------
Month 1   ₹5,000.00      ₹5,050.00       
Month 2   ₹5,000.00      ₹10,150.50      
Month 3   ₹5,000.00      ₹15,302.01      
Month 4   ₹5,000.00      ₹20,505.03      
Month 5   ₹5,000.00      ₹25,760.08      
Month 6   ₹5,000.00      ₹31,067.68      
Month 7   ₹5,000.00      ₹36,428.35      
Month 8   ₹5,000.00      ₹41,842.64      
Month 9   ₹5,000.00      ₹47,311.06      
Month 10  ₹5,000.00      ₹52,834.17      
Month 11  ₹5,000.00      ₹58,412.52      
Month 12  ₹5,000.00      ₹64,046.64      
----------------------------------------------
Total Capital Invested : ₹60,000.00
Final Maturity Corpus  : ₹64,046.64`,
    commonMistakes: [
      'Accidentally placing a semicolon after for(): Writing "for (int i=0; i<5; i++); { ... }" terminates the loop immediately and executes the block only once with i out of scope.',
      'Off-by-one errors (< vs <=): "for (int i=1; i<10; i++)" runs 9 times (1 to 9). Use "<= 10" if you want 10 iterations.',
      'Modifying loop variable inside loop body: Changing "i" inside the body while it also updates in the header causes unpredictable skipping or infinite loops.'
    ],
    challenge: `// Coding Challenge:
// Write a program to compute the Factorial of a number (N = 6).
// Factorial of 6 (6!) = 6 * 5 * 4 * 3 * 2 * 1 = 720.
// Print: "Factorial of 6 = 720"

public class Main {
    public static void main(String[] args) {
        int n = 6;
        long factorial = 1;
        // TODO: Use a for loop to compute factorial
        
    }
}`,
    faq: [
      {
        q: 'Can a for loop declare multiple variables in the initialization clause?',
        a: 'Yes! You can declare multiple variables of the SAME type separated by commas: "for (int i = 0, j = 10; i < j; i++, j--) { ... }".'
      },
      {
        q: 'What is the scope of the variable declared in "for (int i = 0; ...)"?',
        a: 'The variable "i" is local to the for loop block. Attempting to access "i" after the closing brace } will trigger a "cannot find symbol" compile error.'
      },
      {
        q: 'Can we decrement in a for loop?',
        a: 'Yes! Countdown loops use decrement operators: "for (int count = 10; count >= 1; count--) { System.out.println(count); }".'
      }
    ],
    recap: [
      'Loops automate repetitive tasks adhering to the DRY (Don\'t Repeat Yourself) principle.',
      'The for loop brings initialization, condition, and update into one header.',
      'Always verify that the update step moves the counter toward the terminating condition to avoid infinite loops.',
      'The accumulator pattern (sum += n) calculates running totals across iterations.'
    ]
  },

  // ==========================================
  // CHAPTER 20: While and Do-While Loops
  // ==========================================
  {
    num: 20,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Loops & Control Flow',
    slug: '20-java-while-and-do-while-loops',
    title: 'Java while & do-while Loops: Number & Digit Algorithms',
    badge: '20. while & do-while',
    subtopics: 'while Loop (Entry-Controlled) · do-while Loop (Exit-Controlled) · When to use for vs while vs do-while · Digit Reversal · Palindrome · Armstrong Numbers',
    readTime: '17 min read',
    intro: 'Comprehensive exploration of condition-driven loops in Java: mastering entry-controlled while loops and exit-controlled do-while loops, designing menu-driven console applications, and implementing classic number algorithms (digit counting, number reversal, palindrome validation, and Armstrong number verification).',
    theorySections: [
      {
        heading: '1. The \`while\` Loop (Entry-Controlled Loop)',
        content: `The **\`while\`** loop is an **Entry-Controlled Loop**: it evaluates the boolean condition **before** executing the loop body. If the condition is \`false\` on the first check, the body is never executed:

\`\`\`java
while (condition) {
    // Code executed as long as condition is true
    // MUST contain an update step!
}
\`\`\`

### When to Use \`while\` vs \`for\`:
- **Use \`for\` Loop:** When the **exact number of iterations is known** in advance (e.g. iterate 10 times, loop through 50 array elements).
- **Use \`while\` Loop:** When the **number of iterations is unknown** and depends on a dynamic runtime condition (e.g. reading until end of file, processing digits until number becomes 0, waiting for user input).`
      },
      {
        heading: '2. The \`do-while\` Loop (Exit-Controlled Loop)',
        content: `The **\`do-while\`** loop is an **Exit-Controlled Loop**: it executes the loop body **first**, and only evaluates the condition at the end:

\`\`\`java
do {
    // Code executed AT LEAST ONCE!
} while (condition); // Note the mandatory semicolon!
\`\`\`

### Key Distinction:
Because the condition is checked at the bottom, a \`do-while\` loop is **guaranteed to execute at least once**, even if the condition is \`false\` initially!

\`\`\`java
int x = 10;

// while loop: condition is false (10 < 5), executes 0 times
while (x < 5) {
    System.out.println("While loop running");
}

// do-while loop: executes body once before checking condition!
do {
    System.out.println("Do-while executed once!");
} while (x < 5);
\`\`\``
      },
      {
        heading: '3. Classic Number & Digit Algorithms with \`while\` Loops',
        content: `Number manipulation algorithms rely on the modulo (\`%\`) and division (\`/\`) operators inside a \`while\` loop:

1. **Extract Last Digit:** \`int lastDigit = number % 10;\` (e.g. \`1234 % 10 = 4\`)
2. **Remove Last Digit:** \`number = number / 10;\` (e.g. \`1234 / 10 = 123\`)
3. **Build Reversed Number:** \`reversed = (reversed * 10) + lastDigit;\`

### What is an Armstrong Number?
An **Armstrong Number** (e.g. 153, 370, 371) is a number that is equal to the sum of its own digits each raised to the power of the number of digits:
$$153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153$$`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. Reverse a Number & Palindrome Check ===");
        int originalNumber = 12321;
        int temp = originalNumber;
        int reversedNumber = 0;
        int digitCount = 0;

        // while loop processes number digit by digit until temp becomes 0
        while (temp > 0) {
            int lastDigit = temp % 10;                 // Extract rightmost digit
            reversedNumber = (reversedNumber * 10) + lastDigit; // Shift and append
            temp = temp / 10;                          // Discard rightmost digit
            digitCount++;
        }

        System.out.println("Original Number : " + originalNumber);
        System.out.println("Total Digits    : " + digitCount);
        System.out.println("Reversed Number : " + reversedNumber);
        System.out.println("Is Palindrome?  : " + (originalNumber == reversedNumber));

        System.out.println("\n=== 2. Armstrong Number Verification (153) ===");
        int testArm = 153;
        int armTemp = testArm;
        int armSum = 0;

        while (armTemp > 0) {
            int digit = armTemp % 10;
            armSum += (digit * digit * digit); // digit^3
            armTemp /= 10;
        }

        System.out.println("Calculated Cube Sum: " + armSum);
        System.out.println("Is 153 Armstrong?  : " + (testArm == armSum));
    }
}`,
    output: `=== 1. Reverse a Number & Palindrome Check ===
Original Number : 12321
Total Digits    : 5
Reversed Number : 12321
Is Palindrome?  : true

=== 2. Armstrong Number Verification (153) ===
Calculated Cube Sum: 153
Is 153 Armstrong?  : true`,
    lineByLine: [
      { line: 'int lastDigit = temp % 10;', explanation: 'Extracts the last digit using modulo 10.' },
      { line: 'reversedNumber = (reversedNumber * 10) + lastDigit;', explanation: 'Shifts existing reversed digits to the left (multiplying by 10) and adds the new digit.' },
      { line: 'temp = temp / 10;', explanation: 'Integer division by 10 strips off the rightmost digit, moving toward loop termination when temp reaches 0.' },
      { line: 'originalNumber == reversedNumber', explanation: 'Palindrome check: a number is a palindrome if its reverse matches the original.' }
    ],
    practicalExample: `public class BankATMMenuSimulation {
    public static void main(String[] args) {
        // Simulating a menu-driven banking session using do-while
        int userChoice = 3; // Simulated user choice: 3 (Check Balance)
        double currentBalance = 25000.00;

        System.out.println("=== ATM Terminal Session (do-while) ===");
        int simulatedAttempts = 0;

        do {
            System.out.println("\n[MENU OPTIONS]");
            System.out.println("1. Deposit Cash");
            System.out.println("2. Withdraw Cash");
            System.out.println("3. Check Account Balance");
            System.out.println("4. Exit Session");

            System.out.println("User Selected Option: " + userChoice);

            switch (userChoice) {
                case 1 -> System.out.println("Action: Deposit Module Initialized.");
                case 2 -> System.out.println("Action: Withdrawal Module Initialized.");
                case 3 -> System.out.printf("Action: Current Account Balance is ₹%,.2f%n", currentBalance);
                case 4 -> System.out.println("Action: Session Ended. Please take your card.");
                default -> System.out.println("Invalid Selection. Try again.");
            }

            simulatedAttempts++;
            // Exit after simulation run
            if (simulatedAttempts >= 1) break;

        } while (userChoice != 4);

        System.out.println("Session gracefully closed.");
    }
}`,
    practicalOutput: `=== ATM Terminal Session (do-while) ===

[MENU OPTIONS]
1. Deposit Cash
2. Withdraw Cash
3. Check Account Balance
4. Exit Session
User Selected Option: 3
Action: Current Account Balance is ₹25,000.00
Session gracefully closed.`,
    commonMistakes: [
      'Forgetting update step in while loop: "while (x > 0) { System.out.println(x); }" causes a CPU-locking infinite loop. Always decrement/update (x--).',
      'Forgetting semicolon at the end of do-while: "do { ... } while (cond)" fails compilation. A semicolon is required: "while (cond);".',
      'Modifying the original variable: When reversing a number, store it in a temporary variable "temp = num;" so the original number is preserved for final equality comparison.'
    ],
    challenge: `// Coding Challenge:
// Write a program to count the sum of digits of a number (e.g. number = 54321):
// 5 + 4 + 3 + 2 + 1 = 15.
// Output: "Sum of digits of 54321 = 15"

public class Main {
    public static void main(String[] args) {
        int number = 54321;
        int sum = 0;
        // TODO: Use a while loop to compute sum of digits
        
    }
}`,
    faq: [
      {
        q: 'What is the main architectural difference between while and do-while?',
        a: '"while" checks its condition at the entry gate and may run 0 times if condition is false. "do-while" checks condition at the exit gate and is guaranteed to execute at least once.'
      },
      {
        q: 'How do you handle negative numbers in digit reversal?',
        a: 'Take the absolute value "Math.abs(num)" before the while loop, extract digits, and re-apply the negative sign if original was negative.'
      },
      {
        q: 'Can a while loop condition contain multiple logical criteria?',
        a: 'Yes! "while (attempts < 3 && !isAuthenticated) { ... }" is standard pattern in security login routines.'
      }
    ],
    recap: [
      'while loop is entry-controlled: evaluates condition before running.',
      'do-while loop is exit-controlled: executes body at least once.',
      'Extract last digit with % 10; remove last digit with / 10.',
      'Palindromes and Armstrong numbers are verified using digit extraction while loops.'
    ]
  },

  // ==========================================
  // CHAPTER 21: Jump Statements & Enhanced For Loop
  // ==========================================
  {
    num: 21,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Loops & Control Flow',
    slug: '21-java-jump-statements-break-continue-and-enhanced-for',
    title: 'Jump Statements (break & continue) & Enhanced for Loop',
    badge: '21. Jump & Enhanced for',
    subtopics: 'break Statement · continue Statement · Labeled break/continue · Enhanced for-each Loop · Looping Strings · Prime Numbers · Fibonacci Series',
    readTime: '17 min read',
    intro: 'Mastering fine-grained loop control and sequence traversal in Java: abruptly terminating loops with break, skipping iterations with continue, breaking out of deeply nested loops with labels, iterating arrays and collections cleanly with the enhanced for-each loop, and implementing Prime number tests and Fibonacci sequences.',
    theorySections: [
      {
        heading: '1. Jump Statements: \`break\` vs \`continue\`',
        content: `Java provides two jump statements to alter the natural execution cycle of loops:

\`\`\`
+-----------------------------------------------------------------------------------+
|                        break vs continue IN LOOPS                                 |
+-----------------------------------------------------------------------------------+
|  1. break STATEMENT: EMERGENCY EXIT                                               |
|     Immediately TERMINATES the entire enclosing loop and jumps to the code        |
|     following the loop's closing brace.                                           |
+-----------------------------------------------------------------------------------+
|  2. continue STATEMENT: SKIP TO NEXT ROUND                                        |
|     Immediately SKIPS the remaining lines in the current iteration and jumps      |
|     directly to the loop's next update/condition evaluation.                      |
+-----------------------------------------------------------------------------------+
\`\`\`

### Example Comparison:
\`\`\`java
for (int i = 1; i <= 5; i++) {
    if (i == 3) break; // Loop stops completely when i is 3!
    System.out.print(i + " "); // Prints: 1 2
}

for (int i = 1; i <= 5; i++) {
    if (i == 3) continue; // Skips only number 3!
    System.out.print(i + " "); // Prints: 1 2 4 5
}
\`\`\``
      },
      {
        heading: '2. Labeled \`break\` and \`continue\` (Nested Loop Control)',
        content: `When working with nested loops, a standard \`break\` terminates only the innermost loop.

To break out of or continue an **outer** loop from within an inner loop, Java supports **Labeled Statements**:

\`\`\`java
outerLoop: for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (i == 2 && j == 2) {
            System.out.println("Breaking outer loop completely!");
            break outerLoop; // Jumps completely out of BOTH loops!
        }
        System.out.println("i=" + i + ", j=" + j);
    }
}
\`\`\``
      },
      {
        heading: '3. The Enhanced \`for-each\` Loop (Java 5+)',
        content: `The **Enhanced for Loop** (or for-each loop) provides a clean, readable syntax to iterate over arrays and collections without needing manual index variables (\`i\`) or boundary checks (\`array.length\`):

\`\`\`java
for (DataType element : collectionOrArray) {
    // Access element directly
}
\`\`\`

\`\`\`java
String[] languages = { "Java", "Python", "Go", "Rust" };

// Traditional for loop:
for (int i = 0; i < languages.length; i++) {
    System.out.println(languages[i]);
}

// Enhanced for-each loop (Clean & Modern):
for (String lang : languages) {
    System.out.println(lang);
}
\`\`\``
      },
      {
        heading: '4. Prime Numbers & The Fibonacci Series',
        content: `### 1. Prime Number Algorithm ($O(\\sqrt{N})$ Optimization):
A **Prime Number** is a number $> 1$ divisible only by 1 and itself (e.g. 2, 3, 5, 7, 11, 13).
- **Optimization:** Instead of checking all numbers up to $N$, we only need to test divisors up to $\\sqrt{N}$ because factors repeat after the square root:
\`\`\`java
boolean isPrime = (num > 1);
for (int i = 2; i <= Math.sqrt(num); i++) {
    if (num % i == 0) {
        isPrime = false;
        break; // Found divisor, stop checking!
    }
}
\`\`\`

### 2. The Fibonacci Sequence ($0, 1, 1, 2, 3, 5, 8, 13...$):
Each number is the sum of the two preceding numbers ($F_n = F_{n-1} + F_{n-2}$):
\`\`\`java
int first = 0, second = 1;
for (int i = 1; i <= count; i++) {
    System.out.print(first + " ");
    int next = first + second;
    first = second;
    second = next;
}
\`\`\``
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        // 1. Break vs Continue Demonstration
        System.out.println("=== 1. Continue Demo (Skip Even Numbers 1-10) ===");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                continue; // Skip even numbers
            }
            System.out.print(i + " ");
        }
        System.out.println();

        // 2. Enhanced For-Each Loop over Array
        System.out.println("\n=== 2. Enhanced For-Each Loop (Cloud Services) ===");
        String[] cloudServices = { "AWS EC2", "Azure AppService", "GCP CloudRun", "Docker" };
        for (String service : cloudServices) {
            System.out.println("✓ Deploying: " + service);
        }

        // 3. Generating Fibonacci Series (First 8 Terms)
        System.out.println("\n=== 3. Fibonacci Sequence (First 8 Terms) ===");
        int terms = 8;
        int t1 = 0, t2 = 1;
        System.out.print("Series: ");
        for (int step = 1; step <= terms; step++) {
            System.out.print(t1 + " ");
            int nextTerm = t1 + t2;
            t1 = t2;
            t2 = nextTerm;
        }
        System.out.println();

        // 4. Prime Number Check
        int testNumber = 29;
        boolean isPrime = testNumber > 1;
        for (int i = 2; i <= Math.sqrt(testNumber); i++) {
            if (testNumber % i == 0) {
                isPrime = false;
                break;
            }
        }
        System.out.println("\n=== 4. Prime Number Test ===");
        System.out.println("Is " + testNumber + " Prime? : " + isPrime);
    }
}`,
    output: `=== 1. Continue Demo (Skip Even Numbers 1-10) ===
1 3 5 7 9 

=== 2. Enhanced For-Each Loop (Cloud Services) ===
✓ Deploying: AWS EC2
✓ Deploying: Azure AppService
✓ Deploying: GCP CloudRun
✓ Deploying: Docker

=== 3. Fibonacci Sequence (First 8 Terms) ===
Series: 0 1 1 2 3 5 8 13 

=== 4. Prime Number Test ===
Is 29 Prime? : true`,
    lineByLine: [
      { line: 'if (i % 2 == 0) continue;', explanation: 'Skips printing when i is even, proceeding directly to the next odd iteration.' },
      { line: 'for (String service : cloudServices)', explanation: 'Enhanced for-each loop directly binding each array element to the variable service without index notation.' },
      { line: 'int nextTerm = t1 + t2; t1 = t2; t2 = nextTerm;', explanation: 'Calculates the next Fibonacci term and shifts sliding window variables forward.' },
      { line: 'for (int i = 2; i <= Math.sqrt(testNumber); i++)', explanation: 'Optimized prime check evaluating divisors only up to square root of testNumber.' }
    ],
    practicalExample: `public class SearchAlgorithmEarlyExit {
    public static void main(String[] args) {
        String[] transactionIds = { "TXN_101", "TXN_102", "TXN_999_FRAUD", "TXN_104", "TXN_105" };
        String targetFraud = "TXN_999_FRAUD";
        boolean foundFraud = false;

        System.out.println("--- Security Audit Log Scanning ---");
        for (int i = 0; i < transactionIds.length; i++) {
            System.out.println("Inspecting Transaction #" + (i + 1) + ": " + transactionIds[i]);

            if (transactionIds[i].equals(targetFraud)) {
                foundFraud = true;
                System.out.println("🚨 ALERT: Fraudulent Transaction Detected at Index [" + i + "]!");
                break; // Stop scanning further transactions immediately
            }
        }

        System.out.println("Audit Complete. Scanner status: " + (foundFraud ? "QUARANTINED" : "CLEAN"));
    }
}`,
    practicalOutput: `--- Security Audit Log Scanning ---
Inspecting Transaction #1: TXN_101
Inspecting Transaction #2: TXN_102
Inspecting Transaction #3: TXN_999_FRAUD
🚨 ALERT: Fraudulent Transaction Detected at Index [2]!
Audit Complete. Scanner status: QUARANTINED`,
    commonMistakes: [
      'Attempting to modify array elements inside for-each loop: Writing "for (int x : array) { x = 0; }" modifies only the local copy variable x, NOT the actual array contents! Use standard index for loop for array mutations.',
      'Checking prime numbers up to N instead of sqrt(N): Testing "i < N" works but is O(N) slow. Using "i <= Math.sqrt(N)" runs in O(sqrt(N)) time.',
      'Confusing break with continue: "break" exits the entire loop; "continue" skips only the current iteration.'
    ],
    challenge: `// Coding Challenge:
// Write a program to find and print all Prime numbers between 1 and 50.
// Print in one line: "2 3 5 7 11 13 17 19 23 29 31 37 41 43 47"

public class Main {
    public static void main(String[] args) {
        // TODO: Print all prime numbers from 1 to 50
        
    }
}`,
    faq: [
      {
        q: 'Can the enhanced for-each loop be used in reverse order?',
        a: 'No. The enhanced for loop only iterates forward from index 0 to length - 1. If reverse iteration is needed, use a standard index loop "for (int i = array.length - 1; i >= 0; i--)".'
      },
      {
        q: 'How do you iterate through characters in a String using enhanced for?',
        a: 'Call ".toCharArray()": "for (char c : str.toCharArray()) { System.out.println(c); }".'
      },
      {
        q: 'Why are labels rarely used in modern Java code?',
        a: 'Labeled breaks can make code harder to follow if overused (similar to "goto"). In clean code architecture, extracting nested loops into dedicated methods with "return" is preferred.'
      }
    ],
    recap: [
      'break terminates loop immediately; continue skips to next iteration.',
      'Labeled break allows exiting outer nested loops directly.',
      'Enhanced for-each loop (for (T item : array)) provides clean read-only traversal.',
      'Prime checks are optimized by evaluating divisors up to Math.sqrt(N).'
    ]
  },

  // ==========================================
  // CHAPTER 22: Nested Loops & Pattern Programming
  // ==========================================
  {
    num: 22,
    phaseId: 'phase5',
    phaseTitle: 'Phase 5: Loops & Control Flow',
    slug: '22-java-nested-loops-and-pattern-programming',
    title: 'Java Nested Loops & Star/Number Pattern Masterclass',
    badge: '22. Patterns & Nested Loops',
    subtopics: 'Nested Loop Mechanics · Rows vs Columns Coordinate Logic · Right Triangle · Inverted Triangle · Pyramid · Diamond · Floyd\'s Triangle · Number Pyramids',
    readTime: '18 min read',
    intro: 'Mastering multi-dimensional coordinate logic and pattern programming in Java: understanding outer loop (rows) and inner loop (columns) mechanics, building right-angled triangles, inverted pyramids, diamonds, Floyd\'s numerical triangles, and complex symmetric matrices.',
    theorySections: [
      {
        heading: '1. Mental Model of Nested Loops (Rows & Columns Matrix)',
        content: `A **Nested Loop** is a loop inside another loop.

Whenever the outer loop executes **once**, the inner loop executes its **entire cycle from start to finish**:
$$\\text{Total Iterations} = \\text{Outer Loop Iterations} \\times \\text{Inner Loop Iterations}$$

\`\`\`
+-----------------------------------------------------------------------------------+
|                        NESTED LOOP COORDINATE MATRIX                              |
+-----------------------------------------------------------------------------------+
|  Outer Loop: Controls the ROWS (Vertical dimension - i = 1 to 5)                  |
|  Inner Loop: Controls the COLUMNS / SPACES / STARS (Horizontal dimension - j)     |
|                                                                                   |
|  Row 1 (i=1):  *          (Inner loop runs 1 time)                                |
|  Row 2 (i=2):  * *        (Inner loop runs 2 times)                               |
|  Row 3 (i=3):  * * *      (Inner loop runs 3 times)                               |
|  Row 4 (i=4):  * * * *    (Inner loop runs 4 times)                               |
|  Row 5 (i=5):  * * * * *  (Inner loop runs 5 times)                               |
+-----------------------------------------------------------------------------------+
\`\`\``
      },
      {
        heading: '2. The 3-Step Systematic Formula for Any Pattern',
        content: `To solve any pattern problem in technical interviews, apply this 3-step formula:

1. **Step 1 (Outer Loop):** Count the total number of horizontal lines/rows ($N$). Set outer loop: \`for (int row = 1; row <= N; row++)\`.
2. **Step 2 (Inner Loops):** For each \`row\`, identify:
   - How many leading spaces are needed? (\`for (int s = 1; s <= N - row; s++)\`)
   - How many characters/stars/numbers are needed? (\`for (int col = 1; col <= row; col++)\`)
3. **Step 3 (Newline):** After inner loops finish printing the row elements with \`System.out.print()\`, insert a \`System.out.println()\` to drop down to the next row.`
      },
      {
        heading: '3. Overview of Iconic Pattern Categories',
        content: `<div class="ref-table-wrap">
  <table class="ref-table">
    <thead>
      <tr>
        <th>Pattern Name</th>
        <th>Visual Structure</th>
        <th>Core Inner Loop Logic</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Right-Angled Triangle</strong></td>
        <td><code>*<br>* *<br>* * *</code></td>
        <td><code>for (int col = 1; col &lt;= row; col++) print("* ")</code></td>
      </tr>
      <tr>
        <td><strong>Inverted Triangle</strong></td>
        <td><code>* * * *<br>* * *<br>* *<br>*</code></td>
        <td><code>for (int col = 1; col &lt;= (N - row + 1); col++) print("* ")</code></td>
      </tr>
      <tr>
        <td><strong>Symmetrical Pyramid</strong></td>
        <td><code>&nbsp;&nbsp;*&nbsp;&nbsp;<br>&nbsp;***&nbsp;<br>*****</code></td>
        <td>Spaces: <code>N - row</code>, Stars: <code>2 * row - 1</code></td>
      </tr>
      <tr>
        <td><strong>Floyd's Triangle</strong></td>
        <td><code>1<br>2 3<br>4 5 6</code></td>
        <td>Increment running counter <code>count++</code> inside inner loop</td>
      </tr>
      <tr>
        <td><strong>Binary (0-1) Triangle</strong></td>
        <td><code>1<br>0 1<br>1 0 1</code></td>
        <td>Check <code>(row + col) % 2 == 0 ? "1 " : "0 "</code></td>
      </tr>
    </tbody>
  </table>
</div>`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        int rows = 5;

        // 1. Right-Angled Triangle Pattern
        System.out.println("=== 1. Right-Angled Star Triangle ===");
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println(); // Next row
        }

        // 2. Inverted Right-Angled Triangle
        System.out.println("\n=== 2. Inverted Star Triangle ===");
        for (int i = rows; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        // 3. Centered Star Pyramid
        System.out.println("\n=== 3. Symmetrical Star Pyramid ===");
        for (int i = 1; i <= rows; i++) {
            // Print leading spaces
            for (int space = 1; space <= rows - i; space++) {
                System.out.print("  ");
            }
            // Print odd number of stars (2*i - 1)
            for (int k = 1; k <= (2 * i - 1); k++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        // 4. Floyd's Consecutive Number Triangle
        System.out.println("\n=== 4. Floyd's Number Triangle ===");
        int counter = 1;
        for (int i = 1; i <= 4; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.printf("%2d ", counter++);
            }
            System.out.println();
        }
    }
}`,
    output: `=== 1. Right-Angled Star Triangle ===
* 
* * 
* * * 
* * * * 
* * * * * 

=== 2. Inverted Star Triangle ===
* * * * * 
* * * * 
* * * 
* * 
* 

=== 3. Symmetrical Star Pyramid ===
        * 
      * * * 
    * * * * * 
  * * * * * * * 
* * * * * * * * * 

=== 4. Floyd's Number Triangle ===
 1 
 2  3 
 4  5  6 
 7  8  9 10`,
    lineByLine: [
      { line: 'for (int i = 1; i <= rows; i++)', explanation: 'Outer loop controlling vertical row progression from 1 to rows.' },
      { line: 'for (int j = 1; j <= i; j++) System.out.print("* ");', explanation: 'Inner loop printing stars corresponding to current row index without newline.' },
      { line: 'System.out.println();', explanation: 'Advances cursor to the beginning of the next line after inner loop completes.' },
      { line: 'System.out.printf("%2d ", counter++);', explanation: 'Floyd\'s triangle prints the current counter value and post-increments by 1.' }
    ],
    practicalExample: `public class DiamondPatternGenerator {
    public static void main(String[] args) {
        int n = 4; // Top half height
        System.out.println("=== Symmetrical Diamond Pattern (2 * N) ===");

        // Part 1: Top Half Pyramid
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= (2 * i - 1); j++) System.out.print("*");
            System.out.println();
        }

        // Part 2: Bottom Half Inverted Pyramid
        for (int i = n - 1; i >= 1; i--) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= (2 * i - 1); j++) System.out.print("*");
            System.out.println();
        }
    }
}`,
    practicalOutput: `=== Symmetrical Diamond Pattern (2 * N) ===
   *
  ***
 *****
*******
 *****
  ***
   *`,
    commonMistakes: [
      'Using System.out.println() instead of print() inside the inner loop: Prints each star on its own separate line instead of building a horizontal row.',
      'Forgetting the newline statement System.out.println() after the inner loop: Causes all stars for all rows to blur together onto one single long line.',
      'Reusing the same variable name in outer and inner loops: "for (int i=0; ...) { for (int i=0; ...) }" causes variable collision compile errors.'
    ],
    challenge: `// Coding Challenge:
// Print a Binary Triangle of 5 rows:
// 1
// 0 1
// 1 0 1
// 0 1 0 1
// 1 0 1 0 1
// Hint: Check if (row + col) is even or odd!

public class Main {
    public static void main(String[] args) {
        int rows = 5;
        // TODO: Print the binary 1/0 pattern
        
    }
}`,
    faq: [
      {
        q: 'What is the time complexity of a nested loop of size N x N?',
        a: 'Quadratic time complexity O(N^2). If N = 100, the inner loop executes 10,000 times total.'
      },
      {
        q: 'How do you print a hollow square pattern?',
        a: 'Inside inner loop, print star only if (row == 1 || row == N || col == 1 || col == N), otherwise print a blank space.'
      },
      {
        q: 'Why are pattern problems asked in Java technical coding interviews?',
        a: 'Pattern problems test your mental models of coordinate mathematics, nested boundary conditions, matrix indexes, and logical loop manipulation without external library crutches.'
      }
    ],
    recap: [
      'Nested loops execute outer loop rows and inner loop columns.',
      'Total iterations = (Outer count * Inner count).',
      'Use System.out.print() for row elements and System.out.println() for row breaks.',
      'Symmetric patterns like pyramids and diamonds require calculating leading spaces.'
    ]
  }
];
