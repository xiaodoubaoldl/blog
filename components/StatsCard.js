// 统计数据卡片组件
export default function StatsCard({ label, value, subtitle, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="text-2xl">{icon}</div>
        <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
          {value}
        </div>
      </div>
      <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
        {label}
      </div>
      {subtitle && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {subtitle}
        </div>
      )}
    </div>
  )
}
