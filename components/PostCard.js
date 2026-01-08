// 文章卡片组件
import Link from 'next/link'
import { formatDate, getCategoryName, getCategoryColor, getPostUrl } from '../lib/utils'

export default function PostCard({ post }) {
  return (
    <Link href={getPostUrl(post.category, post.slug)}>
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* 文章头部 */}
        <div className="p-6">
          {/* 分类和日期 */}
          <div className="flex items-center justify-between mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
              {getCategoryName(post.category)}
            </span>
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(post.date)}
            </time>
          </div>

          {/* 标题 */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {post.title}
          </h2>

          {/* 简介 */}
          {post.summary && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {post.summary}
            </p>
          )}

          {/* 标签 */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
