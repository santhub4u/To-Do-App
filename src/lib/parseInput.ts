import type { Task } from '../types'
import { splitIntoTasks } from './splitTasks'
import { extractDateTime } from './parseDate'
import { categorize, detectPriority } from './categorize'

export type ParsedTask = Omit<Task, 'id' | 'completed' | 'createdAt'>

function capitalize(text: string): string {
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Turns a free-form natural-language block of text into structured tasks:
 * splits it into individual items, then extracts a due date/time, category
 * and priority for each one.
 */
export function parseNaturalLanguageInput(rawInput: string, referenceDate: Date = new Date()): ParsedTask[] {
  const segments = splitIntoTasks(rawInput)

  return segments.map((segment) => {
    const { dueDate, hasTime, title } = extractDateTime(segment, referenceDate)
    return {
      title: capitalize(title),
      category: categorize(segment),
      priority: detectPriority(segment),
      dueDate,
      hasTime,
      sourceText: segment,
    }
  })
}
