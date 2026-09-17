import type { Task } from '../types'

export const GROUP_ORDER = ['Overdue', 'Today', 'Tomorrow', 'This Week', 'Later', 'No Date'] as const
export type GroupName = (typeof GROUP_ORDER)[number]

function startOfDay(d: Date): Date {
  const copy = new Date(d)
  copy.setHours(0, 0, 0, 0)
  return copy
}

function groupFor(task: Task, now: Date): GroupName {
  if (!task.dueDate) return 'No Date'

  const due = new Date(task.dueDate)
  const today = startOfDay(now)
  const dueDay = startOfDay(due)
  const diffDays = Math.round((dueDay.getTime() - today.getTime()) / 86_400_000)

  if (diffDays < 0) return 'Overdue'
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays <= 7) return 'This Week'
  return 'Later'
}

/** Buckets tasks by due date and sorts each bucket chronologically (undated tasks last). */
export function groupTasksByDate(tasks: Task[], now: Date = new Date()): Map<GroupName, Task[]> {
  const groups = new Map<GroupName, Task[]>()
  for (const name of GROUP_ORDER) groups.set(name, [])

  for (const task of tasks) {
    groups.get(groupFor(task, now))!.push(task)
  }

  for (const list of groups.values()) {
    list.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    })
  }

  return groups
}
