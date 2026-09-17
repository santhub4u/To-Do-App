export type Category =
  | 'Work'
  | 'Personal'
  | 'Shopping'
  | 'Health'
  | 'Finance'
  | 'Study'
  | 'Home'
  | 'Social'
  | 'Travel'
  | 'Other'

export type Priority = 'high' | 'medium' | 'low'

export interface Task {
  id: string
  title: string
  category: Category
  priority: Priority
  dueDate: string | null // ISO string, or null when no date/time was detected
  hasTime: boolean // whether dueDate includes a meaningful time-of-day
  completed: boolean
  createdAt: string
  sourceText: string // the original natural-language input this task came from
}
