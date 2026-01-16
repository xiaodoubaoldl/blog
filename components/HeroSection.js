// Hero 区域组件（静态设计，参考 krjojo.com）
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
        {/* 主标题 - "个人博客" 其中"博客"使用渐变 */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight">
          <span className="text-gray-900 dark:text-white">个人</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400">
            博客
          </span>
        </h1>

        {/* 副标题 */}
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 mb-4 font-medium">
          没有梦想，何必远方
        </p>

        {/* 描述文字 */}
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          在这里，记录一些生活点滴，技术分享，人生感悟。
        </p>

        {/* 按钮组 */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          <Link
            href="/tech"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            查看文章 &gt;
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 rounded-lg font-medium text-lg border-2 border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            了解更多
          </Link>
        </div>

        {/* 装饰性插画（睡觉的熊猫 SVG） */}
        <div className="flex justify-center mb-12">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <img 
              src="/sleeping-panda.svg" 
              alt="睡觉的熊猫" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 往下滚动提示 */}
        <div className="flex flex-col items-center animate-bounce">
          <svg 
            className="w-6 h-6 text-gray-400 dark:text-gray-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">往下滚动</span>
        </div>
      </div>
    </div>
  )
}
