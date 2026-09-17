import { describe, expect, it } from 'vitest'
import { extractDateTime } from './parseDate'

const REF = new Date('2026-09-17T09:00:00')

describe('extractDateTime', () => {
  it('extracts a date-only reference and strips it from the title', () => {
    const { dueDate, hasTime, title } = extractDateTime('Buy groceries tomorrow', REF)
    expect(hasTime).toBe(false)
    expect(new Date(dueDate!).toDateString()).toBe(new Date('2026-09-18').toDateString())
    expect(title).toBe('Buy groceries')
  })

  it('extracts a date and time and strips it from the title', () => {
    const { dueDate, hasTime, title } = extractDateTime('Finish report by Friday 5pm', REF)
    expect(hasTime).toBe(true)
    const d = new Date(dueDate!)
    expect(d.getHours()).toBe(17)
    expect(title).toBe('Finish report')
  })

  it('returns null date and full text as title when nothing is found', () => {
    const { dueDate, title } = extractDateTime('Buy milk and eggs', REF)
    expect(dueDate).toBeNull()
    expect(title).toBe('Buy milk and eggs')
  })

  it('understands "end of day" shorthand', () => {
    const { dueDate, hasTime, title } = extractDateTime('Submit tax documents by end of day', REF)
    expect(hasTime).toBe(true)
    const d = new Date(dueDate!)
    expect(d.toDateString()).toBe(REF.toDateString())
    expect(d.getHours()).toBe(23)
    expect(title).toBe('Submit tax documents')
  })

  it('resolves relative phrases like "next Monday"', () => {
    const { dueDate } = extractDateTime('call the dentist next Monday', REF)
    expect(dueDate).not.toBeNull()
    const d = new Date(dueDate!)
    expect(d.getDay()).toBe(1)
    expect(d.getTime()).toBeGreaterThan(REF.getTime())
  })
})
