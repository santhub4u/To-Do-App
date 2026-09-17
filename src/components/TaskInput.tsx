import { useState } from 'react'
import type { FormEvent } from 'react'
import { parseNaturalLanguageInput } from '../lib/parseInput'
import type { ParsedTask } from '../lib/parseInput'

const PLACEHOLDER = `Try something like:
Finish the quarterly report by Friday 5pm, buy groceries tomorrow morning, call the dentist next Monday, pay rent on the 1st, urgent: submit tax documents by end of day`

interface Props {
  onAddTasks: (tasks: ParsedTask[]) => void
}

export function TaskInput({ onAddTasks }: Props) {
  const [value, setValue] = useState('')
  const [preview, setPreview] = useState<ParsedTask[] | null>(null)

  function handlePreview() {
    if (!value.trim()) return
    setPreview(parseNaturalLanguageInput(value))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const parsed = preview ?? (value.trim() ? parseNaturalLanguageInput(value) : [])
    if (parsed.length === 0) return
    onAddTasks(parsed)
    setValue('')
    setPreview(null)
  }

  function handleChange(next: string) {
    setValue(next)
    if (preview) setPreview(null)
  }

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <label htmlFor="nl-input" className="task-input__label">
        Describe your tasks in plain English
      </label>
      <textarea
        id="nl-input"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={PLACEHOLDER}
        rows={3}
      />
      <div className="task-input__actions">
        <button type="button" className="btn btn--ghost" onClick={handlePreview} disabled={!value.trim()}>
          Preview
        </button>
        <button type="submit" className="btn btn--primary" disabled={!value.trim()}>
          Add to my list
        </button>
      </div>

      {preview && preview.length > 0 && (
        <div className="preview">
          <p className="preview__title">{preview.length} task{preview.length > 1 ? 's' : ''} detected:</p>
          <ul>
            {preview.map((t, i) => (
              <li key={i}>
                <strong>{t.title}</strong>
                <span className="preview__meta"> · {t.category} · {t.dueDate ? new Date(t.dueDate).toLocaleString() : 'no date'}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  )
}
