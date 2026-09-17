import type { Category, Priority } from '../types'

export const CATEGORY_COLORS: Record<Category, string> = {
  Work: '#4f6df5',
  Personal: '#8b5cf6',
  Shopping: '#f59e0b',
  Health: '#10b981',
  Finance: '#0ea5e9',
  Study: '#ec4899',
  Home: '#84cc16',
  Social: '#f43f5e',
  Travel: '#06b6d4',
  Other: '#6b7280',
}

export const CATEGORIES: Category[] = [
  'Work', 'Personal', 'Shopping', 'Health', 'Finance', 'Study', 'Home', 'Social', 'Travel', 'Other',
]

export const PRIORITY_LABELS: Record<Priority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

export const PRIORITIES: Priority[] = ['high', 'medium', 'low']
