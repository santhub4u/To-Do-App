import { useCallback, useEffect, useState } from 'react'
import type { Task } from '../types'
import type { ParsedTask } from '../lib/parseInput'

const STORAGE_KEY = 'todo-app.tasks.v1'

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Task[]) : []
  } catch {
    return []
  }
}

function makeId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // localStorage unavailable (e.g. private browsing quota) - fail silently.
    }
  }, [tasks])

  const addTasks = useCallback((parsed: ParsedTask[]) => {
    const now = new Date().toISOString()
    const newTasks: Task[] = parsed.map((p) => ({
      ...p,
      id: makeId(),
      completed: false,
      createdAt: now,
    }))
    setTasks((prev) => [...prev, ...newTasks])
  }, [])

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }, [])

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.completed))
  }, [])

  return { tasks, addTasks, toggleTask, deleteTask, updateTask, clearCompleted }
}
