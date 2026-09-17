import type { Category, Priority } from '../types'

const CATEGORY_KEYWORDS: Record<Exclude<Category, 'Other'>, string[]> = {
  Work: [
    'meeting', 'report', 'email', 'project', 'client', 'boss', 'deadline',
    'presentation', 'office', 'colleague', 'standup', 'sprint', 'invoice',
    'resume', 'interview', 'proposal', 'slides', 'demo', 'ticket', 'review pr',
    'timesheet', 'sync', 'call the team', 'manager',
  ],
  Shopping: [
    'buy', 'purchase', 'groceries', 'grocery', 'shopping', 'order', 'amazon',
    'store', 'mall', 'shop for', 'cart',
  ],
  Health: [
    'doctor', 'dentist', 'gym', 'workout', 'exercise', 'medicine', 'yoga',
    'run', 'therapy', 'checkup', 'medication', 'pills', 'appointment with dr',
    'physio', 'clinic', 'vaccine',
  ],
  Finance: [
    'pay', 'bill', 'bank', 'tax', 'budget', 'rent', 'loan', 'insurance',
    'salary', 'subscription', 'invoice payment', 'mortgage', 'refund',
  ],
  Study: [
    'study', 'homework', 'exam', 'assignment', 'course', 'lecture', 'class',
    'revise', 'thesis', 'essay', 'quiz', 'textbook', 'lesson',
  ],
  Home: [
    'clean', 'laundry', 'dishes', 'repair', 'fix the', 'garden', 'cook',
    'organize', 'declutter', 'trash', 'vacuum', 'tidy', 'plumber', 'chores',
  ],
  Social: [
    'birthday', 'party', 'dinner', 'lunch', 'friend', 'family', 'hangout',
    'wedding', 'catch up', 'reunion', 'date night', 'celebrate',
  ],
  Travel: [
    'flight', 'hotel', 'trip', 'pack', 'passport', 'visa', 'itinerary',
    'vacation', 'book a flight', 'airport', 'luggage',
  ],
  Personal: [
    'call mom', 'call dad', 'read', 'book', 'haircut', 'meditate', 'journal',
    'relax', 'self care', 'walk the dog', 'water the plants',
  ],
}

// Order determines the tie-break when a task scores equally across categories.
const CATEGORY_PRIORITY_ORDER: Category[] = [
  'Health', 'Finance', 'Work', 'Study', 'Travel', 'Shopping', 'Home', 'Social', 'Personal', 'Other',
]

export function categorize(text: string): Category {
  const lower = text.toLowerCase()
  let best: Category = 'Other'
  let bestScore = 0

  for (const category of Object.keys(CATEGORY_KEYWORDS) as Exclude<Category, 'Other'>[]) {
    const keywords = CATEGORY_KEYWORDS[category]
    let score = 0
    for (const keyword of keywords) {
      const pattern = keyword.includes(' ')
        ? keyword
        : `\\b${keyword}\\b`
      const re = new RegExp(pattern, 'i')
      if (re.test(lower)) score += keyword.split(' ').length // multi-word matches count more
    }
    if (score > bestScore) {
      bestScore = score
      best = category
    } else if (score > 0 && score === bestScore) {
      // Tie-break using the fixed priority order.
      if (CATEGORY_PRIORITY_ORDER.indexOf(category) < CATEGORY_PRIORITY_ORDER.indexOf(best)) {
        best = category
      }
    }
  }

  return bestScore > 0 ? best : 'Personal'
}

const HIGH_PRIORITY_WORDS = ['urgent', 'asap', 'important', 'critical', 'high priority', "don't forget", 'must']
const LOW_PRIORITY_WORDS = ['low priority', 'whenever', 'someday', 'no rush', 'eventually']

export function detectPriority(text: string): Priority {
  const lower = text.toLowerCase()
  if (HIGH_PRIORITY_WORDS.some((w) => lower.includes(w))) return 'high'
  if (LOW_PRIORITY_WORDS.some((w) => lower.includes(w))) return 'low'
  return 'medium'
}
