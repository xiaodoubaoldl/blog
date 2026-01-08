// 技术分类页
import { useState, useMemo } from 'react'
import Head from 'next/head'
import { getAllPosts, getAllTags } from '../lib/posts'
import PostCard from '../components/PostCard'
import TagFilter from '../components/TagFilter'

export default function TechPage({ posts, tags }) {
  const [selectedTag, setSelectedTag] = useState(null)
  
  // 在客户端使用传入的 posts 数据进行筛选
  const displayedPosts = useMemo(() => {
    if (!selectedTag) return posts
    return posts.filter((post) => post.tags && post.tags.includes(selectedTag))
  }, [posts, selectedTag])

  return (
    <>
      <Head>
        <title>技术文章 - 个人博客</title>
        <meta name="description" content="技术文章集合，分享前端开发、编程技巧等技术内容" />
        <meta name="keywords" content="前端开发,JavaScript,React,Next.js,技术博客" />
        <meta property="og:title" content="技术文章 - 个人博客" />
        <meta property="og:description" content="技术文章集合，分享前端开发、编程技巧等技术内容" />
        <meta property="og:type" content="website" />
      </Head>

      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">技术文章</h1>

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
  const posts = getAllPosts('tech')
  const tags = getAllTags('tech')
  return {
    props: {
      posts,
      tags,
    },
  }
}
