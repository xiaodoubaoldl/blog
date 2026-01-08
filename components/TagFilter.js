// 标签筛选组件
import { useState } from 'react'

export default function TagFilter({ tags, selectedTag, onTagChange }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!tags || tags.length === 0) {
    return null
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">标签筛选</h3>
        {selectedTag && (
          <button
            onClick={() => {
              onTagChange(null)
              setIsOpen(false)
            }}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            清除筛选
          </button>
        )}
      </div>

      {/* 移动端：下拉选择 */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-left flex items-center justify-between"
        >
          <span className="text-gray-700 dark:text-gray-300">
            {selectedTag ? `已选择: ${selectedTag}` : '选择标签'}
          </span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-2 max-h-60 overflow-y-auto">
            <button
              onClick={() => {
                onTagChange(null)
                setIsOpen(false)
              }}
              className={`w-full px-3 py-2 text-left rounded-md mb-1 ${
                !selectedTag
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              全部
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  onTagChange(tag)
                  setIsOpen(false)
                }}
                className={`w-full px-3 py-2 text-left rounded-md mb-1 ${
                  selectedTag === tag
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 桌面端：标签云 */}
      <div className="hidden md:flex flex-wrap gap-2">
        <button
          onClick={() => onTagChange(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !selectedTag
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          全部
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagChange(tag)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTag === tag
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  )
}
