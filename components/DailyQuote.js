// 每日一言组件
import { useState, useEffect } from 'react'

const quotes = [
  {
    text: '所有坚硬冰冷的东西都会永远坚硬冰冷下去，而所有柔软温暖的东西只有眼下才会柔软温暖。',
    author: '（以色列）阿摩司·奥兹',
  },
  {
    text: '人生是场冒险，请不要忘记旅途本身的意义。',
    author: '未知',
  },
  {
    text: '没有梦想，何必远方。',
    author: '未知',
  },
  {
    text: '生活不是等待暴风雨过去，而是要学会在雨中跳舞。',
    author: '未知',
  },
  {
    text: '每一个不曾起舞的日子，都是对生命的辜负。',
    author: '尼采',
  },
]

export default function DailyQuote() {
  const [quote, setQuote] = useState(quotes[0])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // 根据日期选择固定的名言（确保每天显示相同的内容）
    const today = new Date()
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
    const index = dayOfYear % quotes.length
    setQuote(quotes[index])
  }, [])

  if (!mounted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">每日一言</h3>
      <blockquote className="text-gray-700 dark:text-gray-300 italic mb-3">
        "{quote.text}"
      </blockquote>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-right">
        —— {quote.author}
      </p>
      <button
        onClick={() => {
          const randomIndex = Math.floor(Math.random() * quotes.length)
          setQuote(quotes[randomIndex])
        }}
        className="mt-4 text-sm text-primary-600 dark:text-primary-400 hover:underline"
      >
        下一句
      </button>
    </div>
  )
}
