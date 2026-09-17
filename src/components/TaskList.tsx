import type { Task } from '../types'
import { GROUP_ORDER, groupTasksByDate } from '../lib/groupTasks'
import { TaskItem } from './TaskItem'

interface Props {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Task>) => void
}

export function TaskList({ tasks, onToggle, onDelete, onUpdate }: Props) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet. Describe what you need to do above and it'll show up here, organized by date.</p>
      </div>
    )
  }

  const groups = groupTasksByDate(tasks)

  return (
    <div className="task-list">
      {GROUP_ORDER.filter((name) => (groups.get(name)?.length ?? 0) > 0).map((name) => (
        <section key={name} className={`task-group task-group--${name.replace(/\s+/g, '-').toLowerCase()}`}>
          <h2 className="task-group__title">
            {name} <span className="task-group__count">{groups.get(name)!.length}</span>
          </h2>
          <ul>
            {groups.get(name)!.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
