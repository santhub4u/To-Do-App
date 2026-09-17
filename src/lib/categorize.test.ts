import { describe, expect, it } from 'vitest'
import { categorize, detectPriority } from './categorize'

describe('categorize', () => {
  it('detects Shopping', () => {
    expect(categorize('Buy groceries tomorrow morning')).toBe('Shopping')
  })

  it('detects Health', () => {
    expect(categorize('Book a doctor appointment')).toBe('Health')
  })

  it('detects Finance', () => {
    expect(categorize('Pay rent on the 1st')).toBe('Finance')
  })

  it('detects Work', () => {
    expect(categorize('Finish the quarterly report for the client')).toBe('Work')
  })

  it('falls back to Personal when nothing matches', () => {
    expect(categorize('Call mom')).toBe('Personal')
  })
})

describe('detectPriority', () => {
  it('detects high priority from urgent language', () => {
    expect(detectPriority('urgent: submit tax documents')).toBe('high')
  })

  it('detects low priority', () => {
    expect(detectPriority('organize the garage someday')).toBe('low')
  })

  it('defaults to medium', () => {
    expect(detectPriority('call John on Friday')).toBe('medium')
  })
})
