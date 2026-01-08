// 关于页面
import Head from 'next/head'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>关于我 - 个人博客</title>
        <meta name="description" content="关于博主，个人简介和联系方式" />
        <meta property="og:title" content="关于我 - 个人博客" />
        <meta property="og:description" content="关于博主，个人简介和联系方式" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">关于我</h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* 个人简介 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">个人简介</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              你好，欢迎来到我的个人博客！我是一名热爱技术、生活和旅行的开发者。
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              在这个博客中，我会分享：
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li><strong>技术文章</strong>：前端开发、编程技巧、技术心得等</li>
              <li><strong>生活随笔</strong>：日常生活的点滴感悟和思考</li>
              <li><strong>旅游摄影</strong>：旅途中的风景和见闻，用镜头记录美好</li>
            </ul>
          </section>

          {/* 联系方式 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">联系方式</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" />
                </svg>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  GitHub
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:your-email@example.com"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  your-email@example.com
                </a>
              </div>
            </div>
          </section>

          {/* 博客说明 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">博客说明</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              本博客基于 <strong>Next.js</strong> 构建，使用 <strong>Markdown</strong> 编写文章，
              支持暗黑模式、响应式设计，并集成了评论系统。
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              如果你有任何问题或建议，欢迎通过上述联系方式与我交流！
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
