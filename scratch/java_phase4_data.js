// Phase 4: Conditions & Decision Making (Chapters 15 to 18)
// Exhaustive conceptual theory, ASCII flowcharts, modern switch expressions (Java 14+), String equals() mechanics, and runnable code examples.

module.exports = [
  // ==========================================
  // CHAPTER 15: If, If-Else, Else-If & Nested Conditions
  // ==========================================
  {
    num: 15,
    phaseId: 'phase4',
    phaseTitle: 'Phase 4: Conditions & Branching',
    slug: '15-java-if-else-and-nested-conditions',
    title: 'Java Conditional Statements: if, if-else, else-if & Nested if',
    badge: '15. if-else & Nested Branching',
    subtopics: 'Why Conditions are Needed · if Statement · if-else · else-if Ladder · Nested if · Combining Logical Conditions (&&, ||, !)',
    readTime: '16 min read',
    intro: 'Mastering decision-making and flow control in Java: understanding how boolean conditions direct program execution paths, building clean multi-way branching ladders with else-if, structuring nested decision trees, and combining complex logical criteria with short-circuit boolean operators.',
    theorySections: [
      {
        heading: '1. Why are Conditions Needed in Programming?',
        content: `By default, computer programs execute statements **sequentially** (line 1, then line 2, then line 3).

However, real-world software must make dynamic **decisions** based on runtime data:
- *If* a user enters the correct password, grant dashboard access; *otherwise*, lock the account.
- *If* an account balance is sufficient, process the withdrawal; *otherwise*, display "Insufficient Funds".
- *If* an e-commerce order exceeds ₹1000, apply free shipping.

**Conditional Statements** allow your program to evaluate a boolean expression (\`true\` or \`false\`) and choose which branch of code to execute.

\`\`\`
                     [ Start Evaluation ]
                               |
                               v
                     < Condition True? >
                         /          \\
                  (Yes) /            \\ (No)
                       v              v
               [ Execute Block A ]  [ Execute Block B ]
                       \\              /
                        \\            /
                         v          v
                       [ Continue Program ]
\`\`\``
      },
      {
        heading: '2. The 4 Forms of If-Branching in Java',
        content: `### 1. Simple \`if\` Statement
Executes a block of code **only if** the specified condition evaluates to \`true\`:
\`\`\`java
if (age >= 18) {
    System.out.println("Eligible to vote.");
}
\`\`\`

### 2. \`if-else\` Statement
Provides two mutually exclusive branches: executes the \`if\` block when \`true\`, or the \`else\` block when \`false\`:
\`\`\`java
if (balance >= withdrawAmount) {
    balance -= withdrawAmount;
    System.out.println("Withdrawal successful.");
} else {
    System.out.println("Error: Insufficient balance!");
}
\`\`\`

### 3. \`else-if\` Ladder (Multi-Way Branching)
Evaluates multiple sequential conditions top-to-bottom. The first condition that evaluates to \`true\` executes, and the rest of the ladder is skipped:
\`\`\`java
if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else if (score >= 70) {
    grade = 'C';
} else {
    grade = 'F'; // Default fallback
}
\`\`\`

### 4. Nested \`if\` (Condition within a Condition)
An \`if\` statement placed inside the body of another \`if\` statement, used when a secondary decision depends on a primary condition passing:
\`\`\`java
if (hasAccount) {
    if (isAccountActive) {
        System.out.println("Access granted to Banking Portal.");
    } else {
        System.out.println("Account is suspended. Contact support.");
    }
} else {
    System.out.println("Please register a new account.");
}
\`\`\``
      },
      {
        heading: '3. Combining Multiple Conditions with Logical Operators',
        content: `You can evaluate complex compound business rules within a single \`if\` expression using logical operators:

- **Logical AND (\`&&\`):** All individual conditions must be \`true\`.
- **Logical OR (\`||\`):** At least one condition must be \`true\`.
- **Logical NOT (\`!\`):** Reverses the condition.

\`\`\`java
// Loan Approval Criteria:
// (Age between 21 and 60) AND (Annual Income >= 5,00,000 OR CIBIL Score >= 750)
if ((age >= 21 && age <= 60) && (annualIncome >= 500000 || cibilScore >= 750)) {
    System.out.println("Loan Pre-Approved!");
}
\`\`\``
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        int studentMarks = 84;
        boolean hasDisciplinaryAction = false;

        System.out.println("=== Academic Grading & Scholarship Engine ===");

        // 1. Multi-way else-if ladder for grade evaluation
        char finalGrade;
        if (studentMarks >= 90) {
            finalGrade = 'A';
        } else if (studentMarks >= 80) {
            finalGrade = 'B';
        } else if (studentMarks >= 70) {
            finalGrade = 'C';
        } else if (studentMarks >= 50) {
            finalGrade = 'D';
        } else {
            finalGrade = 'F';
        }

        System.out.println("Student Marks : " + studentMarks);
        System.out.println("Assigned Grade: " + finalGrade);

        // 2. Nested if with compound logical validation for scholarship
        if (finalGrade == 'A' || finalGrade == 'B') {
            if (!hasDisciplinaryAction) {
                System.out.println("Scholarship   : ELIGIBLE (₹25,000 Annual Grant Approved)");
            } else {
                System.out.println("Scholarship   : DISQUALIFIED (Disciplinary Record Found)");
            }
        } else {
            System.out.println("Scholarship   : NOT ELIGIBLE (Requires Grade B or higher)");
        }
    }
}`,
    output: `=== Academic Grading & Scholarship Engine ===
Student Marks : 84
Assigned Grade: B
Scholarship   : ELIGIBLE (₹25,000 Annual Grant Approved)`,
    lineByLine: [
      { line: 'else if (studentMarks >= 80)', explanation: 'Evaluates only because studentMarks < 90 was false; 84 >= 80 evaluates to true, assigning finalGrade = \'B\'.' },
      { line: 'if (finalGrade == \'A\' || finalGrade == \'B\')', explanation: 'Logical OR checks if student achieved either top grade tier.' },
      { line: 'if (!hasDisciplinaryAction)', explanation: 'Logical NOT inverts boolean false to true, verifying clean disciplinary standing.' }
    ],
    practicalExample: `public class ATMWithdrawalSecurity {
    public static void main(String[] args) {
        int enteredPin     = 4321;
        int registeredPin  = 4321;
        double balance     = 10000.00;
        double withdrawAmt = 3500.00;
        boolean isCardActive = true;

        System.out.println("--- Secure ATM Transaction Processing ---");

        // Step 1: Validate PIN authentication
        if (enteredPin == registeredPin) {
            // Step 2: Validate Card Status
            if (isCardActive) {
                // Step 3: Validate Sufficient Funds
                if (withdrawAmt <= balance) {
                    balance -= withdrawAmt;
                    System.out.println("✓ Cash Dispensed: ₹" + withdrawAmt);
                    System.out.println("✓ Remaining Balance: ₹" + balance);
                } else {
                    System.out.println("✗ Transaction Failed: Insufficient funds in account!");
                }
            } else {
                System.out.println("✗ Transaction Failed: Card is blocked or inactive!");
            }
        } else {
            System.out.println("✗ Security Alert: Incorrect PIN entered!");
        }
    }
}`,
    practicalOutput: `--- Secure ATM Transaction Processing ---
✓ Cash Dispensed: ₹3500.0
✓ Remaining Balance: ₹6500.0`,
    commonMistakes: [
      'Accidentally placing a semicolon after if: Writing "if (x > 10);" terminates the if statement immediately, causing the block underneath to ALWAYS execute regardless of the condition!',
      'Using single = (assignment) instead of == (comparison): Writing "if (isStudent = true)" assigns true instead of checking equality.',
      'Unreachable else-if conditions: Writing "if (score >= 60) ... else if (score >= 90) ..." means score >= 90 will never execute because score >= 60 catches it first. Always order conditions from most restrictive to least restrictive.'
    ],
    challenge: `// Coding Challenge:
// Write a program to calculate Electricity Bill based on units consumed:
// - Up to 100 units: ₹3.00 per unit
// - 101 to 200 units: ₹4.50 per unit
// - Above 200 units: ₹6.00 per unit
// If units = 150, calculate and print the total bill amount.

public class Main {
    public static void main(String[] args) {
        int units = 150;
        // TODO: Calculate bill using else-if ladder
        
    }
}`,
    faq: [
      {
        q: 'Is the curly brace {} mandatory for single-line if statements?',
        a: 'Technically no, but it is considered an essential industry best practice to ALWAYS use curly braces {}. Omitting braces often leads to catastrophic bugs (like Apple\'s famous "goto fail" security vulnerability).'
      },
      {
        q: 'What is the performance difference between multiple if statements vs else-if ladder?',
        a: 'Multiple individual "if" statements evaluate EVERY condition even if earlier conditions passed. An "else-if" ladder halts evaluation the instant one condition passes, saving CPU cycles.'
      },
      {
        q: 'Can an if statement evaluate non-boolean values like numbers in Java?',
        a: 'No! Unlike C/C++ or JavaScript where 0 is false and 1 is true, Java conditions MUST strictly evaluate to a boolean type (true or false). Writing "if (1)" is a compile error.'
      }
    ],
    recap: [
      'if, if-else, and else-if ladders control execution flow based on boolean expressions.',
      'Nested if statements allow multi-tier validation checks.',
      'Always order else-if conditions from highest/most specific to lowest/most general.',
      'Always enclose conditional code blocks inside curly braces {}.'
    ]
  },

  // ==========================================
  // CHAPTER 16: Ternary Conditions & String Comparisons
  // ==========================================
  {
    num: 16,
    phaseId: 'phase4',
    phaseTitle: 'Phase 4: Conditions & Branching',
    slug: '16-java-ternary-operator-and-string-comparison',
    title: 'Ternary Expressions & String Comparisons (.equals vs ==)',
    badge: '16. Ternary & String Equality',
    subtopics: 'Ternary Operator (? :) · Nested Ternary Expressions · String Equality (.equals vs ==) · equalsIgnoreCase() · String Constant Pool Mechanics · Null-Safe Comparisons',
    readTime: '15 min read',
    intro: 'Deep dive into concise decision expressions and the critical mechanics of String equality in Java: understanding the ternary operator, why using == on Strings leads to subtle production bugs, how .equals() and .equalsIgnoreCase() work, and writing null-safe string comparisons.',
    theorySections: [
      {
        heading: '1. The Ternary Operator (\`? :\`) in Java',
        content: `The **Ternary Operator** (also known as the conditional operator) is Java\'s only operator that takes three operands. It is an inline shorthand for an \`if-else\` statement that **returns a value**:

\`\`\`
variable = (condition) ? valueIfTrue : valueIfFalse;
\`\`\`

\`\`\`java
int score = 75;
String status = (score >= 50) ? "PASS" : "FAIL";

int a = 20, b = 45;
int maximum = (a > b) ? a : b; // Evaluates to 45
\`\`\`

### When to Use Ternary vs If-Else:
- **Use Ternary:** For simple, one-line value assignments or variable initializations.
- **Use If-Else:** When executing multi-line statements, database calls, or complex logging actions.`
      },
      {
        heading: '2. The Fatal Flaw: Comparing Strings with `==` vs `.equals()`',
        content: `One of the most dangerous and common bugs in Java is comparing \`String\` content using the \`==\` operator.

\`\`\`
+-----------------------------------------------------------------------------------+
|                        == vs .equals() IN JAVA MEMORY                             |
+-----------------------------------------------------------------------------------+
|  1. == OPERATOR (Reference Address Check):                                        |
|     Checks if two variables point to the EXACT SAME MEMORY LOCATION in RAM.       |
|     (Does NOT check what letters or characters are inside the string!)            |
+-----------------------------------------------------------------------------------+
|  2. .equals() METHOD (Character Content Check):                                   |
|     Compares the actual sequence of characters character-by-character.            |
+-----------------------------------------------------------------------------------+
\`\`\`

### Why \`==\` Seems to Work Sometimes (The String Pool Trap):
\`\`\`java
String s1 = "Admin";
String s2 = "Admin";
String s3 = new String("Admin");

System.out.println(s1 == s2);      // true! (Both point to same String Pool object)
System.out.println(s1 == s3);      // FALSE! (s3 is a separate object in Heap memory)
System.out.println(s1.equals(s3)); // TRUE! (Both contain the exact characters 'A','d','m','i','n')
\`\`\`

**Golden Rule of Java:** **NEVER** use \`==\` to compare String values! **ALWAYS** use \`.equals()\` or \`.equalsIgnoreCase()\`!`
      },
      {
        heading: '3. \`.equals()\` vs \`.equalsIgnoreCase()\`',
        content: `| Method | Case Sensitive? | Example | Result |
| :--- | :--- | :--- | :--- |
| **\`str1.equals(str2)\`** | **Yes** (Strict) | \`"Java".equals("java")\` | \`false\` |
| **\`str1.equalsIgnoreCase(str2)\`** | **No** (Ignores case) | \`"Java".equalsIgnoreCase("java")\` | \`true\` |`
      },
      {
        heading: '4. Null-Safe String Comparisons (Yoda Conditions)',
        content: `If a String variable is \`null\`, calling \`userRole.equals("ADMIN")\` will throw a fatal **\`NullPointerException\`**!

### The Two Professional Fixes:
1. **Yoda Condition (Literal First):**
   \`\`\`java
   // Safe even if userRole is null! Literals are guaranteed non-null.
   if ("ADMIN".equalsIgnoreCase(userRole)) { ... }
   \`\`\`
2. **Objects.equals() Utility (Java 7+):**
   \`\`\`java
   import java.util.Objects;
   if (Objects.equals(userRole, "ADMIN")) { ... }
   \`\`\``
      }
    ],
    codeExample: `import java.util.Objects;

public class Main {
    public static void main(String[] args) {
        // 1. Ternary Operator Demonstration
        int userAge = 20;
        String eligibility = (userAge >= 18) ? "Eligible for Driving License" : "Underage";
        System.out.println("Age Check: " + eligibility);

        // 2. String Equality (.equals vs ==)
        String roleFromAuthToken = "SUPER_ADMIN";
        String roleFromDatabase  = new String("SUPER_ADMIN");

        System.out.println("\n--- String Comparison Deep Dive ---");
        System.out.println("Using == (Memory Address Check) : " + (roleFromAuthToken == roleFromDatabase)); // false
        System.out.println("Using .equals() (Content Check) : " + roleFromAuthToken.equals(roleFromDatabase)); // true

        // 3. Case-Insensitive Comparison
        String inputCoupon = "save20";
        String validCoupon = "SAVE20";
        boolean isCouponValid = inputCoupon.equalsIgnoreCase(validCoupon);
        System.out.println("Coupon Validation (IgnoreCase)  : " + isCouponValid);

        // 4. Null-Safe Comparison
        String nullableRole = null;
        // System.out.println(nullableRole.equals("ADMIN")); // Throws NullPointerException!
        boolean isSafeAdmin = "ADMIN".equalsIgnoreCase(nullableRole); // Safe!
        System.out.println("Null-Safe Admin Check (Yoda)    : " + isSafeAdmin);
    }
}`,
    output: `Age Check: Eligible for Driving License

--- String Comparison Deep Dive ---
Using == (Memory Address Check) : false
Using .equals() (Content Check) : true
Coupon Validation (IgnoreCase)  : true
Null-Safe Admin Check (Yoda)    : false`,
    lineByLine: [
      { line: '(userAge >= 18) ? ... : ...', explanation: 'Inline ternary expression evaluating boolean age check and returning the corresponding string.' },
      { line: 'roleFromAuthToken == roleFromDatabase', explanation: 'Evaluates to false because new String() forces a separate heap memory allocation.' },
      { line: 'roleFromAuthToken.equals(roleFromDatabase)', explanation: 'Evaluates to true by inspecting actual string character content.' },
      { line: '"ADMIN".equalsIgnoreCase(nullableRole)', explanation: 'Null-safe comparison: placing non-null string literal first prevents NullPointerException.' }
    ],
    practicalExample: `public class LoginAuthenticationService {
    public static void main(String[] args) {
        String registeredUser = "BalajiNayak";
        String enteredUsername = "balajinayak";
        String enteredPassword = "Password@2026";
        String correctPassword = "Password@2026";

        // Username should be case-insensitive, Password MUST be strictly case-sensitive
        boolean isUsernameMatch = registeredUser.equalsIgnoreCase(enteredUsername);
        boolean isPasswordMatch = correctPassword.equals(enteredPassword);

        if (isUsernameMatch && isPasswordMatch) {
            System.out.println("✓ Login Successful! Welcome, " + registeredUser);
        } else if (!isUsernameMatch) {
            System.out.println("✗ Login Failed: Username not found!");
        } else {
            System.out.println("✗ Login Failed: Invalid password provided!");
        }
    }
}`,
    practicalOutput: `✓ Login Successful! Welcome, BalajiNayak`,
    commonMistakes: [
      'Using == for String content check: "if (name == \"Ravi\")" fails when String comes from Scanner, database, or network requests. Always use .equals().',
      'Calling .equals() on potentially null variables: "str.equals(\"text\")" crashes if str is null. Use "\"text\".equals(str)" instead.',
      'Over-complicating ternary with multiple statements: Ternary operators should only evaluate expressions that return a single value, not execute multi-step blocks.'
    ],
    challenge: `// Coding Challenge:
// Given two strings: str1 = "Java21", str2 = new String("java21"):
// 1. Check if they are equal with == (result1)
// 2. Check if they are equal with .equals() (result2)
// 3. Check if they are equal with .equalsIgnoreCase() (result3)
// Print all 3 boolean outcomes.

public class Main {
    public static void main(String[] args) {
        String str1 = "Java21";
        String str2 = new String("java21");
        // TODO: Perform the 3 checks
        
    }
}`,
    faq: [
      {
        q: 'Why does "==" sometimes return true for Strings?',
        a: 'Because of Java\'s String Constant Pool. If both strings are created as identical string literals (e.g. String a = "hi"; String b = "hi";), the JVM assigns them the same memory address, making a == b true by coincidence. However, dynamic strings from Scanner or new String() will fail ==.'
      },
      {
        q: 'How does .compareTo() differ from .equals()?',
        a: '".equals()" returns a boolean (true/false) indicating exact match. ".compareTo()" returns an integer (negative, 0, positive) indicating alphabetical lexicographical order, essential for sorting.'
      },
      {
        q: 'Can the ternary operator return different data types in its branches?',
        a: 'Yes, but the compiler will infer the common supertype (e.g. Object or double if mixing int and double), which can cause subtle auto-unboxing type issues.'
      }
    ],
    recap: [
      'Ternary operator: (condition ? valIfTrue : valIfFalse) returns an evaluated value.',
      'NEVER use == for String content comparison; == checks memory address references.',
      'Use .equals() for case-sensitive equality and .equalsIgnoreCase() for case-insensitive matching.',
      'Prevent NullPointerException by placing the string literal first ("ADMIN".equals(role)).'
    ]
  },

  // ==========================================
  // CHAPTER 17: Traditional Switch Statements
  // ==========================================
  {
    num: 17,
    phaseId: 'phase4',
    phaseTitle: 'Phase 4: Conditions & Branching',
    slug: '17-java-switch-statement-and-string-switching',
    title: 'Java Traditional switch Statement & String Switching',
    badge: '17. switch, case, break & default',
    subtopics: 'switch Syntax · case Labels · The break Keyword · Fall-Through Mechanism · default Fallback · Switching on byte, short, char, int, enum, and String',
    readTime: '15 min read',
    intro: 'Mastering multi-branch decision making with the traditional Java switch statement: understanding case matching, why the break keyword prevents fall-through bugs, utilizing the default clause, and switching across supported types including Strings and enums.',
    theorySections: [
      {
        heading: '1. What is the switch Statement?',
        content: `When a program needs to choose among many discrete, constant values (such as days of the week, menu selections, HTTP status codes, or user roles), an \`else-if\` ladder can become verbose and repetitive.

The **\`switch\`** statement provides a clean, jump-table-optimized multi-way branch based on a single variable or expression:

\`\`\`java
switch (expression) {
    case value1:
        // Statements
        break;
    case value2:
        // Statements
        break;
    default:
        // Default fallback statements
}
\`\`\``
      },
      {
        heading: '2. Allowed Data Types for switch in Java',
        content: `Not every data type can be used in a \`switch\` expression. In Java, \`switch\` is supported for:

1. **Primitive Integral Types:** \`byte\`, \`short\`, \`char\`, \`int\` (and their Wrapper classes: \`Byte\`, \`Short\`, \`Character\`, \`Integer\`).
2. **Strings (Java 7+):** \`java.lang.String\` (compares content via \`.equals()\`).
3. **Enums (Java 5+):** Java enumerated types (\`enum\`).

*(Note: \`long\`, \`float\`, \`double\`, and \`boolean\` are NOT supported in traditional switch statements).*`
      },
      {
        heading: '3. The \`break\` Keyword & The Fall-Through Behavior',
        content: `In a traditional \`switch\`, when a matching \`case\` is found, the JVM executes all statements starting from that case **until it hits a \`break\` statement** or reaches the end of the switch block.

If you omit the \`break\` keyword, execution continues into subsequent \`case\` blocks regardless of whether their values match! This is known as **Fall-Through**:

\`\`\`
+-----------------------------------------------------------------------------------+
|                     SWITCH FALL-THROUGH MECHANISM                                 |
+-----------------------------------------------------------------------------------+
|  int day = 2;                                                                     |
|  switch (day) {                                                                   |
|      case 1: System.out.println("Mon"); // Skipped                                |
|      case 2: System.out.println("Tue"); // Matches! Prints "Tue"                  |
|              // MISSING BREAK! Falls through to case 3!                           |
|      case 3: System.out.println("Wed"); // Executed! Prints "Wed"                 |
|              break; // Stops execution here                                       |
|  }                                                                                |
|  (Output: "Tue" and "Wed")                                                        |
+-----------------------------------------------------------------------------------+
\`\`\`

### Intentional Fall-Through (Grouping Cases):
Fall-through is sometimes used deliberately to group multiple cases that share identical logic:
\`\`\`java
switch (dayOfWeek) {
    case "MONDAY":
    case "TUESDAY":
    case "WEDNESDAY":
    case "THURSDAY":
    case "FRIDAY":
        System.out.println("Weekday: Time to work!");
        break;
    case "SATURDAY":
    case "SUNDAY":
        System.out.println("Weekend: Time to relax!");
        break;
}
\`\`\``
      },
      {
        heading: '4. The \`default\` Clause',
        content: `The **\`default\`** block is optional but highly recommended. It acts like the \`else\` in an \`if-else\` ladder, executing whenever none of the explicit \`case\` labels match the evaluated expression.`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        int dayNumber = 3;
        String dayName;

        System.out.println("=== Day of Week Resolution Engine ===");

        // Traditional switch statement with break statements
        switch (dayNumber) {
            case 1:
                dayName = "Monday";
                break;
            case 2:
                dayName = "Tuesday";
                break;
            case 3:
                dayName = "Wednesday";
                break;
            case 4:
                dayName = "Thursday";
                break;
            case 5:
                dayName = "Friday";
                break;
            case 6:
                dayName = "Saturday";
                break;
            case 7:
                dayName = "Sunday";
                break;
            default:
                dayName = "Invalid Day Number (Must be 1-7)";
                break;
        }

        System.out.println("Day " + dayNumber + " is: " + dayName);

        // String switch with intentional case grouping
        String userRole = "MANAGER";
        System.out.print("Permission Level for " + userRole + ": ");

        switch (userRole) {
            case "SUPER_ADMIN":
            case "ADMIN":
                System.out.println("Full Administrative Control (Read, Write, Delete)");
                break;
            case "MANAGER":
            case "TEAM_LEAD":
                System.out.println("Elevated Access (Read, Write, Approve)");
                break;
            case "VIEWER":
                System.out.println("Read-Only Access");
                break;
            default:
                System.out.println("No Access Rights Assigned");
                break;
        }
    }
}`,
    output: `=== Day of Week Resolution Engine ===
Day 3 is: Wednesday
Permission Level for MANAGER: Elevated Access (Read, Write, Approve)`,
    lineByLine: [
      { line: 'switch (dayNumber)', explanation: 'Evaluates the integer variable dayNumber and jumps directly to matching case 3.' },
      { line: 'dayName = "Wednesday"; break;', explanation: 'Assigns value and breaks out of the switch block to prevent unwanted fall-through.' },
      { line: 'case "MANAGER": case "TEAM_LEAD":', explanation: 'Intentional fall-through grouping multiple case labels sharing identical permission behavior.' },
      { line: 'default: ...', explanation: 'Fallback safety block executed if no case matches.' }
    ],
    practicalExample: `public class HttpStatusCodeHandler {
    public static void main(String[] args) {
        int httpStatusCode = 404;

        System.out.println("--- Web API Response Dispatcher ---");
        System.out.print("HTTP " + httpStatusCode + " Status: ");

        switch (httpStatusCode) {
            case 200:
                System.out.println("200 OK — Request succeeded.");
                break;
            case 201:
                System.out.println("201 Created — Resource successfully created.");
                break;
            case 400:
                System.out.println("400 Bad Request — Invalid client payload.");
                break;
            case 401:
                System.out.println("401 Unauthorized — Authentication credentials missing.");
                break;
            case 404:
                System.out.println("404 Not Found — Requested endpoint does not exist.");
                break;
            case 500:
                System.out.println("500 Internal Server Error — Server encountered an unhandled exception.");
                break;
            default:
                System.out.println("Unhandled HTTP Status Code.");
                break;
        }
    }
}`,
    practicalOutput: `--- Web API Response Dispatcher ---
HTTP 404 Status: 404 Not Found — Requested endpoint does not exist.`,
    commonMistakes: [
      'Forgetting the break statement: Omission causes unintentional execution of all subsequent cases down to the next break.',
      'Attempting to switch on double or float: "switch (3.14)" fails compilation. Floating point equality is mathematically imprecise.',
      'Duplicate case labels: Having two "case 1:" blocks in the same switch statement is a compile-time error.',
      'Passing null to String switch: "String s = null; switch(s)" throws a NullPointerException immediately when entering the switch.'
    ],
    challenge: `// Coding Challenge:
// Create a calculator menu using switch:
// Variables: char operator = '+'; int a = 20, b = 5;
// Use switch (operator) with cases '+', '-', '*', '/' to compute and print the result.
// Include a default case for invalid operators.

public class Main {
    public static void main(String[] args) {
        char operator = '*';
        int a = 20, b = 5;
        // TODO: Implement calculation using switch
        
    }
}`,
    faq: [
      {
        q: 'How does switch internally execute faster than an else-if ladder?',
        a: 'The JVM compiles switch statements into low-level bytecode instructions called "tableswitch" (O(1) direct array indexing) or "lookupswitch" (O(log n) binary search), whereas an else-if ladder executes linearly in O(n) sequential comparisons.'
      },
      {
        q: 'Can case labels contain variables?',
        a: 'No. Case labels must be compile-time constants (literals or final constant variables like "public static final int CODE = 1").'
      },
      {
        q: 'Why can we not switch on boolean variables?',
        a: 'Because a boolean has only two possible states (true/false). An "if-else" statement is cleaner, more readable, and standard for binary choices.'
      }
    ],
    recap: [
      'switch provides fast multi-way jump branching on int, char, byte, short, enum, and String.',
      'Always include break statements to prevent unintended fall-through.',
      'Group case labels together when multiple values share the same action.',
      'Always supply a default case to handle unexpected inputs safely.'
    ]
  },

  // ==========================================
  // CHAPTER 18: Modern Switch Expressions & Pitfalls
  // ==========================================
  {
    num: 18,
    phaseId: 'phase4',
    phaseTitle: 'Phase 4: Conditions & Branching',
    slug: '18-java-modern-switch-expressions-and-pitfalls',
    title: 'Modern Java Switch Expressions (Java 14+) & Condition Pitfalls',
    badge: '18. Modern Switch & Pitfalls',
    subtopics: 'Traditional vs Modern Switch · Arrow Syntax (->) · yield Keyword · Returning Values from Switch · Exhaustive Pattern Matching · Common Condition Anti-Patterns',
    readTime: '16 min read',
    intro: 'Mastering modern Java 14+ enhanced switch expressions: replacing verbose break statements with concise arrow (->) syntax, returning direct values, utilizing the yield keyword for multi-line logic, and avoiding the top 10 common conditional anti-patterns in enterprise code.',
    theorySections: [
      {
        heading: '1. The Evolution: Traditional switch vs Modern switch Expressions (Java 14+)',
        content: `In **Java 14**, Java revolutionized the \`switch\` construct by turning it into a **First-Class Expression** (meaning it can directly compute and return a value to a variable).

### Key Advantages of Modern Switch Expressions:
1. **Arrow Syntax (\`->\`):** Eliminates the need for \`break\` statements! No more accidental fall-through bugs.
2. **Direct Value Assignment:** Assign the evaluated switch result directly to a variable.
3. **Comma-Separated Multiple Labels:** Group multiple cases on a single line (\`case 1, 2, 3 -> ...\`).
4. **Exhaustiveness Guarantee:** The compiler forces you to cover all possible values (or provide a \`default\`), preventing unhandled edge cases.`
      },
      {
        heading: '2. Modern Switch Expression Syntax & Examples',
        content: `### 1. Basic Arrow Syntax
\`\`\`java
String dayType = switch (day) {
    case 1, 2, 3, 4, 5 -> "Weekday";
    case 6, 7           -> "Weekend";
    default             -> "Invalid Day";
};
\`\`\`

### 2. Multi-line Logic with the \`yield\` Keyword
If a case requires multiple statements or calculations before returning a value, enclose it in curly braces \`{}\` and use the **\`yield\`** keyword to return the value:
\`\`\`java
double discount = switch (customerTier) {
    case "PLATINUM" -> 0.25;
    case "GOLD"     -> 0.15;
    case "SILVER"   -> 0.05;
    case "REGULAR"  -> {
        System.out.println("Applying standard seasonal rebate...");
        yield 0.02; // Returns 0.02 from the block
    }
    default -> 0.0;
};
\`\`\``
      },
      {
        heading: '3. Side-by-Side Comparison',
        content: `| Feature | Traditional switch (Java 1.0 - 13) | Modern switch Expression (Java 14+ LTS) |
| :--- | :--- | :--- |
| **Construct Type** | Statement only (does not return values). | Expression (returns a value) or Statement. |
| **Fall-Through Risk** | High (missing \`break\` falls through). | **Zero** (Arrow \`->\` never falls through). |
| **Syntax Style** | \`case VAL: stmt; break;\` | \`case VAL -> result;\` |
| **Multiple Labels** | Stacked \`case 1: case 2:\` | Comma-separated: \`case 1, 2, 3 ->\` |
| **Block Returns** | Re-assign variable and \`break\`. | Use **\`yield\`** keyword. |`
      },
      {
        heading: '4. Top 5 Common Condition Anti-Patterns & How to Avoid Them',
        content: `1. **The Boolean Redundancy Trap:**
   - ❌ *Anti-Pattern:* \`if (isLoggedIn == true)\`
   - ✅ *Clean Code:* \`if (isLoggedIn)\`
2. **The Inverted Null Bug:**
   - ❌ *Anti-Pattern:* \`if (user.getRole().equals("ADMIN"))\` (Crashes if role is null!)
   - ✅ *Clean Code:* \`if ("ADMIN".equals(user.getRole()))\`
3. **The Dangling Else Ambiguity:**
   - Always enclose nested \`if\` statements inside explicit curly braces \`{}\` to ensure \`else\` attaches to the intended \`if\`.
4. **Integer Division in Conditions:**
   - ❌ *Anti-Pattern:* \`if (score / 100 > 0.5)\` (Integer math truncates to 0!)
   - ✅ *Clean Code:* \`if (score / 100.0 > 0.5)\`
5. **Deeply Nested "Arrow Code":**
   - ❌ 5 levels of nested \`if\` blocks make code unmaintainable.
   - ✅ Use **Guard Clauses (Early Return)**:
     \`\`\`java
     if (!isAuthenticated) return "Access Denied";
     if (!hasFunds) return "Insufficient Balance";
     // Process main logic cleanly here...
     \`\`\``
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        String quarterMonth = "APRIL";

        System.out.println("=== Modern Java 14+ Switch Expressions ===");

        // 1. Switch Expression assigning directly to a variable with arrow syntax
        int fiscalQuarter = switch (quarterMonth) {
            case "JANUARY", "FEBRUARY", "MARCH"     -> 1;
            case "APRIL", "MAY", "JUNE"             -> 2;
            case "JULY", "AUGUST", "SEPTEMBER"      -> 3;
            case "OCTOBER", "NOVEMBER", "DECEMBER"  -> 4;
            default -> 0;
        };

        System.out.println("Month: " + quarterMonth + " belongs to Q" + fiscalQuarter);

        // 2. Multi-statement block using the 'yield' keyword
        String priorityLevel = "HIGH";
        int responseTimeHours = switch (priorityLevel) {
            case "CRITICAL" -> 1;
            case "HIGH"     -> {
                System.out.println("[Log] High-priority incident escalated to On-Call Engineer.");
                yield 4; // Returns 4 hours SLA
            }
            case "MEDIUM"   -> 12;
            case "LOW"      -> 24;
            default         -> {
                System.out.println("[Log] Unknown priority. Defaulting to standard SLA.");
                yield 48;
            }
        };

        System.out.println("Incident SLA Response Time: " + responseTimeHours + " Hours");
    }
}`,
    output: `=== Modern Java 14+ Switch Expressions ===
Month: APRIL belongs to Q2
[Log] High-priority incident escalated to On-Call Engineer.
Incident SLA Response Time: 4 Hours`,
    lineByLine: [
      { line: 'int fiscalQuarter = switch (quarterMonth) { ... };', explanation: 'Modern switch expression computing and directly returning an integer value to fiscalQuarter (note the ending semicolon ;).' },
      { line: 'case "APRIL", "MAY", "JUNE" -> 2;', explanation: 'Comma-separated multi-case label returning value 2 without requiring break statements.' },
      { line: 'yield 4;', explanation: 'The yield keyword returns the computed integer 4 from a multi-line code block.' }
    ],
    practicalExample: `public class OrderDiscountCalculator {
    public static void main(String[] args) {
        String customerTier = "GOLD";
        double orderAmount   = 5000.00;

        // Compute discount rate using Modern Switch Expression
        double discountRate = switch (customerTier) {
            case "VIP", "PLATINUM" -> 0.20; // 20% Discount
            case "GOLD"            -> 0.15; // 15% Discount
            case "SILVER"          -> 0.10; // 10% Discount
            case "BRONZE"          -> 0.05; // 5% Discount
            default                -> 0.00; // No Discount
        };

        double discountAmount = orderAmount * discountRate;
        double finalPayable   = orderAmount - discountAmount;

        System.out.println("=== E-Commerce Checkout Summary ===");
        System.out.printf("Customer Tier   : %s%n", customerTier);
        System.out.printf("Original Order  : ₹%,.2f%n", orderAmount);
        System.out.printf("Applied Discount: %.0f%%%n", (discountRate * 100));
        System.out.printf("Savings Amount  : ₹%,.2f%n", discountAmount);
        System.out.printf("Final Total Due : ₹%,.2f%n", finalPayable);
    }
}`,
    practicalOutput: `=== E-Commerce Checkout Summary ===
Customer Tier   : GOLD
Original Order  : ₹5,000.00
Applied Discount: 15%
Savings Amount  : ₹750.00
Final Total Due : ₹4,250.00`,
    commonMistakes: [
      'Forgetting the semicolon after a switch expression: "int x = switch (y) { ... };" requires a semicolon at the end of the curly brace because it is an assignment statement.',
      'Mixing colon (:) and arrow (->) syntax in the same switch: Java forbids mixing old-style "case 1:" and new-style "case 2 ->" within the same switch block.',
      'Using "return" instead of "yield" inside a switch expression block: "return" exits the entire enclosing method; "yield" returns a value only from the switch branch.'
    ],
    challenge: `// Coding Challenge:
// Refactor the following traditional switch into a Modern Switch Expression using -> arrow syntax:
// String trafficLight = "YELLOW";
// Output action:
// - "RED" -> "STOP"
// - "YELLOW" -> "PREPARE TO STOP"
// - "GREEN" -> "GO"
// - default -> "INVALID SIGNAL"

public class Main {
    public static void main(String[] args) {
        String trafficLight = "YELLOW";
        // TODO: Use Modern switch expression to assign action to a String variable
        
    }
}`,
    faq: [
      {
        q: 'Why was the "yield" keyword introduced instead of reusing "return"?',
        a: 'Because "return" in Java has always meant "exit the current method and return a value". If switch expressions used return, it would create confusion between exiting the method vs returning from the switch expression. "yield" clearly signifies yielding a value from a block.'
      },
      {
        q: 'Does modern switch require a "default" branch when switching on Enums?',
        a: 'If your switch expression explicitly covers EVERY single constant declared in the enum, the compiler knows the switch is exhaustive and does NOT require a default branch!'
      },
      {
        q: 'Can modern switch expressions be used in older Java versions (like Java 8 or 11)?',
        a: 'No. Modern switch expressions were finalized in Java 14. Projects running Java 8 or 11 must use the traditional switch statement with break.'
      }
    ],
    recap: [
      'Java 14+ switch expressions support arrow syntax (->) with zero fall-through risk.',
      'Group multiple case labels on one line separated by commas.',
      'Use the yield keyword to return values from multi-statement code blocks.',
      'Avoid boolean redundancy (use if (flag) instead of if (flag == true)).'
    ]
  }
];
