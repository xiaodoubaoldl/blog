// 生活分类页
import { useState, useMemo } from 'react'
import Head from 'next/head'
import { getAllPosts, getAllTags } from '../lib/posts'
import PostCard from '../components/PostCard'
import TagFilter from '../components/TagFilter'

export default function LifePage({ posts, tags }) {
  const [selectedTag, setSelectedTag] = useState(null)
  
  // 在客户端使用传入的 posts 数据进行筛选
  const displayedPosts = useMemo(() => {
    if (!selectedTag) return posts
    return posts.filter((post) => post.tags && post.tags.includes(selectedTag))
  }, [posts, selectedTag])

  return (
    <>
      <Head>
        <title>生活随笔 - 个人博客</title>
        <meta name="description" content="生活随笔，记录日常生活的点滴感悟" />
        <meta name="keywords" content="生活,随笔,感悟,日常" />
        <meta property="og:title" content="生活随笔 - 个人博客" />
        <meta property="og:description" content="生活随笔，记录日常生活的点滴感悟" />
        <meta property="og:type" content="website" />
      </Head>

      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">生活随笔</h1>

        {/* 标签筛选 */}
        <TagFilter tags={tags} selectedTag={selectedTag} onTagChange={setSelectedTag} />

        {/* 文章列表 */}
        {displayedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPosts.map((post) => (
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

export async function getStaticProps() {
  const posts = getAllPosts('life')
  const tags = getAllTags('life')
  return {
    props: {
      posts,
      tags,
    },
  }
}
