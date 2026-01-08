// 首页：炫酷设计，按分类展示文章
import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '../lib/posts'
import PostCard from '../components/PostCard'
import { getCategoryName, getCategoryColor } from '../lib/utils'

export default function Home({ techPosts, lifePosts, travelPosts }) {
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

      <div>
        {/* 炫酷的 Hero 区域 */}
        <section className="relative overflow-hidden mb-16">
          {/* 背景渐变 */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 opacity-10 dark:opacity-20" />
          
          {/* 动态背景装饰 */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-300 dark:bg-primary-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-2000" />
            <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-4000" />
          </div>

          {/* 内容 */}
          <div className="relative z-10 text-center py-20 md:py-28">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 dark:from-primary-400 dark:via-purple-400 dark:to-pink-400 animate-fade-in">
              欢迎来到我的博客
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-delay">
              分享技术、生活与旅游的点滴
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-delay-2">
              <Link
                href="/tech"
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                探索技术
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700"
              >
                关于我
              </Link>
            </div>
          </div>
        </section>

        {/* 文章分类模块 */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            文章
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
    },
  }
}
