// 布局组件（包含导航栏和页脚）
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const [mounted, setMounted] = useState(false)
  const [showHeader, setShowHeader] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  // 防止水合不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  // 监听滚动事件，控制header显示（仅在首页）
  useEffect(() => {
    if (!mounted) return
    
    // 如果不是首页，直接显示header
    if (router.pathname !== '/') {
      setShowHeader(true)
      return
    }

    const handleScroll = () => {
      // 当滚动超过50px时显示header
      if (window.scrollY > 50) {
        setShowHeader(true)
      } else {
        setShowHeader(false)
      }
    }

    // 初始检查
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mounted, router.pathname])

  // 导航链接
  const navLinks = [
    { href: '/', label: '首页' },
    { 
      href: '/tech', 
      label: '文章',
      submenu: [
        { href: '/tech', label: '技术' },
        { href: '/life', label: '生活' },
        { href: '/travel', label: '旅游' },
      ]
    },
    { href: '/about', label: '关于' },
  ]

  // 检查当前路径是否激活
  const isActive = (href) => {
    if (href === '/') {
      return router.pathname === '/'
    }
    return router.pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* 导航栏 */}
      <nav className={`sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-opacity duration-500 ${
        router.pathname === '/' && !showHeader ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                个人博客
              </span>
            </Link>

            {/* 桌面端导航 */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                  >
                    {link.label}
                    {link.submenu && (
                      <svg className="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  {/* 下拉菜单 */}
                  {link.submenu && (
                    <div className="absolute left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200 dark:border-gray-700">
                      <div className="py-1">
                        {link.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              isActive(subItem.href)
                                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 右侧操作区 */}
            <div className="flex items-center space-x-4">
              {/* 暗黑模式切换 */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="切换主题"
                >
                  {theme === 'dark' ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              )}

              {/* 移动端菜单按钮 */}
              <MobileMenu navLinks={navLinks} isActive={isActive} />
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* 关于 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">个人博客</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                记录生活点滴，技术分享，人生感悟。
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" aria-label="GitHub">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" aria-label="Email">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* 文章分类 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">文章</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/tech" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    技术文章
                  </Link>
                </li>
                <li>
                  <Link href="/life" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    生活随笔
                  </Link>
                </li>
                <li>
                  <Link href="/travel" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    旅游摄影
                  </Link>
                </li>
              </ul>
            </div>

            {/* 服务 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">服务</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/sitemap.xml" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    网站地图
                  </a>
                </li>
                <li>
                  <a href="/feed.xml" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    RSS订阅
                  </a>
                </li>
              </ul>
            </div>

            {/* 支持 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">支持</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    关于我们
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    隐私政策
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 版权信息 */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
              <p>版权所有 © 2025. 个人博客. 基于 Next.js 构建</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// 移动端菜单组件
function MobileMenu({ navLinks, isActive }) {
  const [isOpen, setIsOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState(null)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="菜单"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* 移动端菜单下拉 */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg md:hidden z-50">
          <div className="px-4 py-2 space-y-1 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={link.href}
                    onClick={() => {
                      if (!link.submenu) setIsOpen(false)
                    }}
                    className={`flex-1 block px-3 py-2 rounded-md text-base font-medium ${
                      isActive(link.href)
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.submenu && (
                    <button
                      onClick={() => setOpenSubmenu(openSubmenu === link.href ? null : link.href)}
                      className="p-2 text-gray-700 dark:text-gray-300"
                    >
                      <svg 
                        className={`w-5 h-5 transition-transform ${openSubmenu === link.href ? 'transform rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                {link.submenu && openSubmenu === link.href && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-2 rounded-md text-sm ${
                          isActive(subItem.href)
                            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
