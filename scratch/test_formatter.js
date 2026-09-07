function formatCodeLine(line, langId) {
  if (!line.trim()) return ''

  const indent = line.match(/^\s*/)[0]
  const content = line.trim()

  const tokens = []
  let current = ''
  let inString = null
  let isEscaped = false
  let isComment = false

  for (let i = 0; i < content.length; i++) {
    const char = content[i]
    const nextChar = i < content.length - 1 ? content[i + 1] : ''

    if (inString) {
      current += char
      if (isEscaped) {
        isEscaped = false
      } else if (char === '\\') {
        isEscaped = true
      } else if (char === inString) {
        inString = null
        tokens.push({ type: 'string', text: current })
        current = ''
      }
      continue
    }

    if (isComment) {
      current += char
      continue
    }

    if ((char === '#' && (langId === 'python3' || langId === 'ruby' || langId === 'php')) ||
        (char === '/' && nextChar === '/' && langId !== 'python3' && langId !== 'ruby')) {
      if (current) {
        tokens.push({ type: 'code', text: current })
        current = ''
      }
      isComment = true
      current = content.slice(i)
      break
    }

    if (char === '"' || char === "'" || char === '`') {
      if (current) {
        tokens.push({ type: 'code', text: current })
        current = ''
      }
      inString = char
      current = char
      continue
    }

    current += char
  }

  if (isComment) {
    tokens.push({ type: 'comment', text: current })
  } else if (inString) {
    tokens.push({ type: 'string', text: current })
  } else if (current) {
    tokens.push({ type: 'code', text: current })
  }

  const formattedContent = tokens.map(token => {
    if (token.type !== 'code') return token.text

    let text = token.text

    // Format assignment & comparison operators: ==, !=, <=, >=, +=, -=, *=, /=, =
    // Add space around operators if missing: number=random -> number = random, guess==number -> guess == number
    text = text.replace(/([^!<>=+\-*/%\s])(==|!=|<=|>=|\+=|-=|\*=|\/=|=)([^=<>\s])/g, '$1 $2 $3')
    text = text.replace(/([^!<>=+\-*/%\s])(==|!=|<=|>=|\+=|-=|\*=|\/=|=)\s+([^=<>\s])/g, '$1 $2 $3')
    text = text.replace(/([^!<>=+\-*/%\s])\s+(==|!=|<=|>=|\+=|-=|\*=|\/=|=)([^=<>\s])/g, '$1 $2 $3')

    // Format commas (e.g., (1,10) -> (1, 10))
    text = text.replace(/,([^\s\)])/g, ', $1')

    // Format colons after keywords (e.g., if guess==number: -> if guess == number:)
    text = text.replace(/([^:\s]):([^\s:])/g, '$1: $2')

    // Normalize multiple consecutive spaces in code token
    text = text.replace(/ {2,}/g, ' ')

    return text
  }).join('')

  return indent + formattedContent
}

function formatCode(code, langId) {
  if (!code) return code
  const lines = code.split('\n')
  const formattedLines = lines.map(line => formatCodeLine(line, langId))
  return formattedLines.join('\n')
}

// Test Image 1 input code
const inputCode = `import random

number=random.randint(1, 10)

guess=int(input("Guess a number between 1 and 10: "))

if guess==number:
    print("Correct! 🎉")
else:
    print("Wrong! The number was", number)`

console.log("=== INPUT CODE ===")
console.log(inputCode)
console.log("\n=== FORMATTED CODE ===")
const result = formatCode(inputCode, 'python3')
console.log(result)
