import type { Task } from '../types'
import { CATEGORIES, CATEGORY_COLORS, PRIORITIES, PRIORITY_LABELS } from '../lib/theme'
import { formatDueDate, toDatetimeLocalValue } from '../lib/formatDate'

interface Props {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Task>) => void
}

export function TaskItem({ task, onToggle, onDelete, onUpdate }: Props) {
  const color = CATEGORY_COLORS[task.category]

  return (
    <li className={`task-item priority-${task.priority}${task.completed ? ' is-completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'not done' : 'done'}`}
      />

      <div className="task-item__body">
        <input
          className="task-item__title"
          value={task.title}
          onChange={(e) => onUpdate(task.id, { title: e.target.value })}
          aria-label="Task title"
        />

        <div className="task-item__meta">
          <select
            className="badge badge--select"
            style={{ '--badge-color': color } as React.CSSProperties}
            value={task.category}
            onChange={(e) => onUpdate(task.id, { category: e.target.value as Task['category'] })}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            className="badge badge--priority"
            value={task.priority}
            onChange={(e) => onUpdate(task.id, { priority: e.target.value as Task['priority'] })}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>
            ))}
          </select>

          <span className="task-item__date-label">{formatDueDate(task.dueDate, task.hasTime)}</span>
          <input
            type="datetime-local"
            className="task-item__date-input"
            value={toDatetimeLocalValue(task.dueDate)}
            onChange={(e) => {
              const v = e.target.value
              onUpdate(task.id, {
                dueDate: v ? new Date(v).toISOString() : null,
                hasTime: true,
              })
            }}
          />
          {task.dueDate && (
            <button
              type="button"
              className="task-item__clear-date"
              onClick={() => onUpdate(task.id, { dueDate: null, hasTime: false })}
              aria-label="Clear due date"
              title="Clear due date"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <button type="button" className="task-item__delete" onClick={() => onDelete(task.id)} aria-label="Delete task">
        🗑
      </button>
    </li>
  )
}
