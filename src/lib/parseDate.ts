import * as chrono from 'chrono-node'

export interface DateExtraction {
  dueDate: string | null
  hasTime: boolean
  title: string
}

// Leftover connector words/punctuation left behind once the date phrase is
// stripped out, e.g. "Finish report by [Friday]" -> "Finish report by" -> "Finish report".
const TRAILING_CONNECTORS = /\s*\b(?:by|on|at|due|for|before|until|till)\s*$/i

// Common shorthand chrono-node doesn't understand on its own.
const PHRASE_REPLACEMENTS: [RegExp, string][] = [
  [/\bend of (?:the )?day\b|\beod\b/gi, '11:59pm today'],
  [/\bend of (?:the )?week\b|\beow\b/gi, 'this Friday 11:59pm'],
]

function normalizePhrases(text: string): string {
  return PHRASE_REPLACEMENTS.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), text)
}

/**
 * Finds the first natural-language date/time reference in `text`, removes it
 * from the task title, and returns the parsed date alongside whether a
 * specific time-of-day (not just a date) was mentioned.
 */
export function extractDateTime(rawText: string, referenceDate: Date = new Date()): DateExtraction {
  const text = normalizePhrases(rawText)
  const results = chrono.parse(text, referenceDate, { forwardDate: true })

  if (results.length === 0) {
    return { dueDate: null, hasTime: false, title: rawText.trim() }
  }

  const result = results[0]
  const hasTime = result.start.isCertain('hour')

  const before = text.slice(0, result.index)
  const after = text.slice(result.index + result.text.length)
  let title = (before + ' ' + after)
    .replace(TRAILING_CONNECTORS, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/^[.,;\s]+|[.,;\s]+$/g, '')
    .trim()

  if (title.length === 0) title = text.trim()

  return { dueDate: result.date().toISOString(), hasTime, title }
}
