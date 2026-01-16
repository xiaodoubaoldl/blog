// 最近文章组件
import Link from 'next/link'
import { formatDate, getCategoryName, getCategoryColor, getPostUrl } from '../lib/utils'

export default function RecentPosts({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">最近文章</h3>
        <p className="text-gray-500 dark:text-gray-400">暂无文章</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">最近文章</h3>
        <Link
          href="/tech"
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          查看全部
        </Link>
      </div>
      <div className="space-y-4">
        {posts.slice(0, 5).map((post) => (
          <Link
            key={`${post.category}-${post.slug}`}
            href={getPostUrl(post.category, post.slug)}
            className="block group"
          >
            <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              {/* 缩略图占位 */}
              <div className="flex-shrink-0 w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary-400 to-purple-400 opacity-50" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {getCategoryName(post.category)}
                  </span>
                  <time className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(post.date)}
                  </time>
                </div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2">
                  {post.title}
                </h4>
                {post.summary && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {post.summary}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
