import { useMemo, useState } from 'react'
import type { Category } from './types'
import { useTasks } from './hooks/useTasks'
import { TaskInput } from './components/TaskInput'
import { TaskList } from './components/TaskList'
import { Filters } from './components/Filters'
import './App.css'

function App() {
  const { tasks, addTasks, toggleTask, deleteTask, updateTask, clearCompleted } = useTasks()
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')
  const [hideCompleted, setHideCompleted] = useState(false)

  const visibleTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (activeCategory !== 'All' && t.category !== activeCategory) return false
      if (hideCompleted && t.completed) return false
      return true
    })
  }, [tasks, activeCategory, hideCompleted])

  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <div className="app">
      <header className="app__header">
        <h1>✅ To-Do, in your own words</h1>
        <p className="app__subtitle">
          Type your tasks naturally — the app splits them up and organizes them by when they're due.
        </p>
      </header>

      <main>
        <TaskInput onAddTasks={addTasks} />

        <Filters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          hideCompleted={hideCompleted}
          onHideCompletedChange={setHideCompleted}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />

        <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} onUpdate={updateTask} />
      </main>
    </div>
  )
}

export default App
