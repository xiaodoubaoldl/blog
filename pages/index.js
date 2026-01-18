// 首页：参考 krjojo.com 的设计风格
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getAllPosts } from '../lib/posts'
import PostCard from '../components/PostCard'
import HeroSection from '../components/HeroSection'
import RecentPosts from '../components/RecentPosts'
import DailyQuote from '../components/DailyQuote'
import HistoryToday from '../components/HistoryToday'
import StatsCard from '../components/StatsCard'
import { getCategoryName, getCategoryColor } from '../lib/utils'

export default function Home({ techPosts, lifePosts, travelPosts, allPosts }) {
  const [scrollY, setScrollY] = useState(0)
  
  // 滚动阈值：超过这个值后，HeroSection 开始回到文档流
  const SCROLL_THRESHOLD = 200

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // 初始检查
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 计算 HeroSection 是否应该全屏
  const isFullScreen = scrollY < SCROLL_THRESHOLD
  // 计算滚动进度（0-1），用于平滑过渡
  const scrollProgress = Math.min(scrollY / SCROLL_THRESHOLD, 1)
  // 分类配置
  const categories = [
    {
      id: 'tech',
      name: '技术',
      icon: '💻',
      description: '分享技术心得与开发经验',
      posts: techPosts,
      gradientClass: 'from-blue-500 to-cyan-500',
      link: '/tech',
    },
    {
      id: 'life',
      name: '生活',
      icon: '✨',
      description: '记录生活的点滴与感悟',
      posts: lifePosts,
      gradientClass: 'from-green-500 to-emerald-500',
      link: '/life',
    },
    {
      id: 'travel',
      name: '旅游',
      icon: '📸',
      description: '用镜头记录旅途的美好',
      posts: travelPosts,
      gradientClass: 'from-purple-500 to-pink-500',
      link: '/travel',
    },
  ]

  // 计算统计数据
  const totalPosts = allPosts.length
  const totalWords = allPosts.reduce((sum, post) => {
    return sum + (post.content ? post.content.length : 0)
  }, 0)
  
  // 计算距离上次更新的天数
  const getDaysSinceUpdate = () => {
    if (allPosts.length === 0) return 'N/A'
    const lastPostDate = new Date(allPosts[0].date)
    const today = new Date()
    const diffTime = Math.abs(today - lastPostDate)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return '今天'
    if (diffDays === 1) return '1 天'
    return `${diffDays} 天`
  }
  
  const lastUpdate = getDaysSinceUpdate()

  return (
    <>
      <Head>
        <title>个人博客 - 技术、生活、旅游分享</title>
        <meta name="description" content="个人技术博客，分享技术心得、生活感悟和旅游见闻" />
        <meta name="keywords" content="技术博客,前端开发,生活分享,旅游摄影" />
        <meta property="og:title" content="个人博客 - 技术、生活、旅游分享" />
        <meta property="og:description" content="个人技术博客，分享技术心得、生活感悟和旅游见闻" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="space-y-12">
        
        {/* Hero 区域 - 占满整个视口 */}
        <section 
          className={`${
            isFullScreen ? 'fixed top-0 left-0 right-0 z-40 m-0' : 'relative mb-0'
          }`}
          style={{
            transform: isFullScreen 
              ? `translateY(${-scrollY * 0.2}px) scale(${1 - scrollProgress * 0.1})` 
              : 'translateY(0) scale(1)',
            opacity: isFullScreen ? 1 : Math.max(1 - scrollProgress * 0.3, 0.7),
            marginTop: isFullScreen ? '0' : undefined,
            transition: isFullScreen ? 'transform 0.1s ease-out' : 'all 0.5s ease-out',
          }}
        >
          <HeroSection isFullScreen={isFullScreen} scrollProgress={scrollProgress} />
        </section>

        {/* 主要内容区域 */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：最近文章 */}
          <div className="lg:col-span-2">
            <RecentPosts posts={allPosts} />
          </div>

          {/* 右侧：每日一言和历史 */}
          <div className="space-y-6">
            <DailyQuote />
            <HistoryToday />
          </div>
        </section>

        {/* 统计数据 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">网站统计</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard
              label="总文章数"
              value={totalPosts}
              subtitle="仅包含博客文章"
              icon="📝"
            />
            <StatsCard
              label="总字数"
              value={`${Math.round(totalWords / 1000)}k+`}
              subtitle="每一个自然月统计一次"
              icon="📊"
            />
            <StatsCard
              label="距离上次更新"
              value={lastUpdate}
              subtitle=""
              icon="🕐"
            />
            <StatsCard
              label="今日访问"
              value="0"
              subtitle=""
              icon="👁️"
            />
          </div>
        </section>

        {/* 文章分类模块 */}
        <section>
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            用文章的方式记录生活
          </h2>

          {/* 三个分类模块 */}
          <div className="space-y-16">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* 分类标题区域 */}
                <div className="mb-8">
                  <Link href={category.link} className="group block">
                    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${category.gradientClass} p-8 shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}>
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                            {category.icon}
                          </span>
                          <div>
                            <h3 className="text-3xl font-bold text-white mb-2">
                              {category.name}
                            </h3>
                            <p className="text-white/90 text-lg">
                              {category.description}
                            </p>
                          </div>
                        </div>
                        <div className="hidden md:flex items-center text-white/90 group-hover:text-white transition-colors">
                          <span className="mr-2">查看全部</span>
                          <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                      {/* 装饰性背景元素 */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
                    </div>
                  </Link>
                </div>

                {/* 文章列表 */}
                {category.posts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.posts.slice(0, 6).map((post) => (
                      <PostCard key={`${post.category}-${post.slug}`} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">暂无{category.name}文章，敬请期待...</p>
                  </div>
                )}

                {/* 查看更多按钮 */}
                {category.posts.length > 6 && (
                  <div className="text-center mt-8">
                    <Link
                      href={category.link}
                      className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      查看更多 {category.name} 文章
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 网站架构介绍 */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            网站架构
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            漂亮，轻量，简单，灵活，可移植
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Markdown</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                一种轻量级标记语言，它以简洁的语法使人们能够快速地编写格式化文本。
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Next.js</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                一个用 React 编写的全栈框架，它能够快速地将 Markdown 格式的内容转换成静态 HTML 页面。
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">TailwindCSS</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                一个实用优先的 CSS 框架，它提供了一套工具类，使开发者可以专注于页面的布局和设计。
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

// 静态生成：获取所有分类的文章数据
export async function getStaticProps() {
  const allPosts = getAllPosts()
  
  // 按分类分组
  const techPosts = allPosts.filter(post => post.category === 'tech')
  const lifePosts = allPosts.filter(post => post.category === 'life')
  const travelPosts = allPosts.filter(post => post.category === 'travel')

  return {
    props: {
      techPosts,
      lifePosts,
      travelPosts,
      allPosts, // 传递所有文章用于统计和最近文章
    },
  }
}
