import type { Category } from '../types'
import { CATEGORIES, CATEGORY_COLORS } from '../lib/theme'

interface Props {
  activeCategory: Category | 'All'
  onCategoryChange: (category: Category | 'All') => void
  hideCompleted: boolean
  onHideCompletedChange: (hide: boolean) => void
  completedCount: number
  onClearCompleted: () => void
}

export function Filters({
  activeCategory,
  onCategoryChange,
  hideCompleted,
  onHideCompletedChange,
  completedCount,
  onClearCompleted,
}: Props) {
  return (
    <div className="filters">
      <div className="filters__chips">
        <button
          type="button"
          className={`chip${activeCategory === 'All' ? ' chip--active' : ''}`}
          onClick={() => onCategoryChange('All')}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={`chip${activeCategory === c ? ' chip--active' : ''}`}
            style={{ '--chip-color': CATEGORY_COLORS[c] } as React.CSSProperties}
            onClick={() => onCategoryChange(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="filters__right">
        <label className="filters__toggle">
          <input type="checkbox" checked={hideCompleted} onChange={(e) => onHideCompletedChange(e.target.checked)} />
          Hide completed
        </label>
        {completedCount > 0 && (
          <button type="button" className="btn btn--ghost btn--small" onClick={onClearCompleted}>
            Clear completed ({completedCount})
          </button>
        )}
      </div>
    </div>
  )
}
