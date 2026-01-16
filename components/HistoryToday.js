// 历史上的今天组件
import { useState, useEffect } from 'react'

const historyEvents = {
  '01-16': [
    { year: 972, title: '朝及契丹皇帝辽圣宗耶律隆绪出生', description: '辽圣宗耶律隆绪（公元972～1031年），辽国第六位皇帝（983年—1031年），契丹名文殊奴。' },
    { year: 1794, title: '英国史学家爱德华·吉本逝世', description: '爱德华·吉本是近代英国杰出的历史学家，影响深远的史学名著《罗马帝国衰亡史》一书的作者。' },
    { year: 1885, title: '中国作家、鲁迅之弟周作人出生于浙江绍兴', description: '现代散文家、诗人、翻译家，中国新文化运动的代表人物之一。' },
    { year: 1909, title: '人类发现南磁极', description: '南磁极，是两个地球磁极之一。它位于地理南极的附近，但是它的位置也在缓慢并不断的变化着。' },
    { year: 1969, title: '苏联两艘宇宙飞船第一次完成空中对接', description: '东方1号宇宙飞船，它由乘员舱和设备舱及末级火箭组成，总重6.17吨，长7.35米。' },
  ],
}

export default function HistoryToday() {
  const [events, setEvents] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const key = `${month}-${day}`
    setEvents(historyEvents[key] || historyEvents['01-16'] || [])
  }, [])

  if (!mounted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        历史上的今天
      </h3>
      {events.length > 0 ? (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {events.slice(0, 5).map((event, index) => (
            <div key={index} className="border-l-4 border-primary-500 pl-4">
              <div className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1">
                {event.year}年
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                {event.title}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                {event.description}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-sm">暂无历史事件</p>
      )}
    </div>
  )
}
