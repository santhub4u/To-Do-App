// Verbs that commonly start a new task. Used to decide whether "and"/","/"then"
// joins two separate tasks ("call mom and buy milk") or just two objects of the
// same task ("buy milk and eggs").
const TASK_VERBS = [
  'buy', 'purchase', 'call', 'email', 'text', 'send', 'finish', 'complete',
  'submit', 'pay', 'book', 'schedule', 'clean', 'pick up', 'drop off',
  'review', 'write', 'prepare', 'attend', 'meet', 'fix', 'plan', 'organize',
  'read', 'study', 'exercise', 'workout', 'walk', 'cook', 'water', 'renew',
  'file', 'register', 'visit', 'go', 'get', 'update', 'create', 'make',
  'check', 'confirm', 'cancel', 'order', 'return', 'reply', 'respond',
  'sign', 'apply', 'set up', 'follow up', 'remind', 'print', 'pack',
]

const HARD_SEPARATORS = /\r?\n|;/
const LIST_MARKER = /^\s*(?:[-*•]|\d+[.)])\s*/

function splitHard(text: string): string[] {
  return text
    .split(HARD_SEPARATORS)
    .map((chunk) => chunk.replace(LIST_MARKER, '').trim())
    .filter(Boolean)
}

// Marker words that may precede a task verb without being part of the verb
// itself, e.g. "..., urgent: submit the form" - the comma should still split
// here, but "urgent:" must stay attached to the new task, not be discarded.
const LEADING_MARKERS = 'urgent|important|asap|note|reminder'

function splitSoft(text: string): string[] {
  const verbGroup = TASK_VERBS.join('|')
  const lookahead = `(?=(?:(?:${LEADING_MARKERS})\\s*:?\\s*)?(?:${verbGroup})\\b)`
  const softSeparator = new RegExp(
    `\\s*(?:,|\\band\\b|\\bthen\\b|\\balso\\b)\\s+${lookahead}`,
    'gi',
  )
  return text
    .split(softSeparator)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
}

/** Splits a free-form natural-language block of text into individual task strings. */
export function splitIntoTasks(rawInput: string): string[] {
  const hardChunks = splitHard(rawInput)
  const tasks = hardChunks.flatMap(splitSoft)
  return tasks
    .map((t) => t.replace(/^[.,;\s]+|[.,;\s]+$/g, ''))
    .filter((t) => t.length > 0)
}
