import { describe, expect, it } from 'vitest'
import { splitIntoTasks } from './splitTasks'

describe('splitIntoTasks', () => {
  it('splits on newlines', () => {
    expect(splitIntoTasks('Buy milk\nCall John\nFinish report')).toEqual([
      'Buy milk', 'Call John', 'Finish report',
    ])
  })

  it('splits on semicolons and strips list markers', () => {
    expect(splitIntoTasks('- Buy milk; 2) Call John')).toEqual(['Buy milk', 'Call John'])
  })

  it('splits comma/and-separated tasks when a new task verb follows', () => {
    expect(splitIntoTasks('Buy groceries tomorrow, call John on Friday, finish report by Monday')).toEqual([
      'Buy groceries tomorrow', 'call John on Friday', 'finish report by Monday',
    ])
  })

  it('does not split objects of the same task joined by "and"', () => {
    expect(splitIntoTasks('Buy milk and eggs')).toEqual(['Buy milk and eggs'])
  })

  it('splits "and" when followed by a task verb', () => {
    expect(splitIntoTasks('Call mom and buy groceries')).toEqual(['Call mom', 'buy groceries'])
  })

  it('splits before a marker word like "urgent:" that precedes a verb', () => {
    expect(splitIntoTasks('Pay rent on the 1st, urgent: submit tax documents by end of day')).toEqual([
      'Pay rent on the 1st', 'urgent: submit tax documents by end of day',
    ])
  })

  it('handles a single task with no separators', () => {
    expect(splitIntoTasks('Finish the quarterly report by Friday 5pm')).toEqual([
      'Finish the quarterly report by Friday 5pm',
    ])
  })
})
