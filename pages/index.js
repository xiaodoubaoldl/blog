// 首页：展示所有分类的文章列表
import Head from 'next/head'
import { getAllPosts } from '../lib/posts'
import PostCard from '../components/PostCard'

export default function Home({ posts }) {
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
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            欢迎来到我的博客
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            分享技术、生活与旅游的点滴
          </p>
        </div>

        {/* 文章列表 */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={`${post.category}-${post.slug}`} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">暂无文章，敬请期待...</p>
          </div>
        )}
      </div>
    </>
  )
}

// 静态生成：获取所有文章数据
export async function getStaticProps() {
  const posts = getAllPosts()
  return {
    props: {
      posts,
    },
  }
}
