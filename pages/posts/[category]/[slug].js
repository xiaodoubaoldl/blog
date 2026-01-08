// 文章详情页（动态路由）
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getAllPostSlugs, getPostData, getAllPosts } from '../../../lib/posts'
import { formatDate, getCategoryName, getPostUrl } from '../../../lib/utils'
import MarkdownContent from '../../../components/MarkdownContent'
import DisqusComments from '../../../components/DisqusComments'
import Link from 'next/link'

export default function PostDetail({ post, prevPost, nextPost }) {
  const router = useRouter()

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">文章不存在</p>
        <Link href="/" className="text-primary-600 dark:text-primary-400 hover:underline mt-4 inline-block">
          返回首页
        </Link>
      </div>
    )
  }

  const postUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://your-domain.com${getPostUrl(post.category, post.slug)}`

  return (
    <>
      <Head>
        <title>{post.title} - 个人博客</title>
        <meta name="description" content={post.summary || post.title} />
        <meta name="keywords" content={post.tags ? post.tags.join(',') : ''} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary || post.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        {post.date && <meta property="article:published_time" content={post.date} />}
      </Head>

      <article className="max-w-4xl mx-auto">
        {/* 返回按钮 */}
        <Link
          href={`/${post.category}`}
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回 {getCategoryName(post.category)}
        </Link>

        {/* 文章头部 */}
        <header className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
              {getCategoryName(post.category)}
            </span>
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(post.date)}
            </time>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>

          {post.summary && (
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              {post.summary}
            </p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* 文章内容 */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <MarkdownContent content={post.content} category={post.category} />
        </div>

        {/* 上下篇文章导航 */}
        {(prevPost || nextPost) && (
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prevPost && (
                <Link
                  href={getPostUrl(prevPost.category, prevPost.slug)}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">上一篇</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {prevPost.title}
                  </div>
                </Link>
              )}
              {nextPost && (
                <Link
                  href={getPostUrl(nextPost.category, nextPost.slug)}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors md:text-right"
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">下一篇</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {nextPost.title}
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Disqus 评论 */}
        {process.env.NEXT_PUBLIC_DISQUS_SHORTNAME && (
          <DisqusComments
            identifier={`${post.category}-${post.slug}`}
            title={post.title}
            url={postUrl}
          />
        )}
      </article>
    </>
  )
}

// 生成所有文章路径（静态生成）
export async function getStaticPaths() {
  const categories = ['tech', 'life', 'travel']
  const paths = []

  categories.forEach((category) => {
    const slugs = getAllPostSlugs(category)
    slugs.forEach((slug) => {
      paths.push({
        params: {
          category,
          slug,
        },
      })
    })
  })

  return {
    paths,
    fallback: false, // 如果路径不存在，返回 404
  }
}

// 获取文章数据（静态生成）
export async function getStaticProps({ params }) {
  const { category, slug } = params
  const post = getPostData(slug, category)

  if (!post) {
    return {
      notFound: true,
    }
  }

  // 获取同一分类的所有文章，用于导航
  const allPosts = getAllPosts(category)
  const currentIndex = allPosts.findIndex(
    (p) => p.slug === slug && p.category === category
  )

  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return {
    props: {
      post,
      prevPost,
      nextPost,
    },
  }
}
