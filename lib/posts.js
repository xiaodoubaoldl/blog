// 文章处理工具函数
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// 文章目录路径
const postsDirectory = path.join(process.cwd(), 'posts')

/**
 * 获取所有文章的文件名（不含扩展名）
 * @param {string} category - 分类（tech/life/travel）
 * @returns {string[]} 文件名数组
 */
export function getAllPostSlugs(category = null) {
  let dirPath = postsDirectory
  if (category) {
    dirPath = path.join(postsDirectory, category)
  }

  if (!fs.existsSync(dirPath)) {
    return []
  }

  const fileNames = fs.readdirSync(dirPath)
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))
}

/**
 * 获取文章数据（包含 FrontMatter 和内容）
 * @param {string} slug - 文章 slug
 * @param {string} category - 分类
 * @returns {object} 文章数据对象
 */
export function getPostData(slug, category) {
  const fullPath = path.join(postsDirectory, category, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // 确保 date 是字符串格式（JSON 可序列化）
  let dateValue = data.date || new Date().toISOString()
  if (dateValue instanceof Date) {
    dateValue = dateValue.toISOString()
  } else if (typeof dateValue === 'string') {
    // 如果已经是字符串，确保格式正确
    try {
      // 验证是否为有效的日期字符串
      const parsedDate = new Date(dateValue)
      if (isNaN(parsedDate.getTime())) {
        dateValue = new Date().toISOString()
      }
    } catch (e) {
      dateValue = new Date().toISOString()
    }
  }

  // 构建返回对象，确保所有字段都是 JSON 可序列化的
  const postData = {
    slug,
    category,
    content,
    title: data.title || slug,
    date: dateValue,
    tags: Array.isArray(data.tags) ? data.tags : [],
    summary: typeof data.summary === 'string' ? data.summary : '',
  }

  // 添加其他 FrontMatter 字段（排除可能包含 Date 对象的字段）
  Object.keys(data).forEach((key) => {
    if (!['title', 'date', 'tags', 'summary', 'category'].includes(key)) {
      const value = data[key]
      // 确保值是可序列化的
      if (value instanceof Date) {
        postData[key] = value.toISOString()
      } else if (typeof value !== 'function' && typeof value !== 'undefined') {
        postData[key] = value
      }
    }
  })

  return postData
}

/**
 * 获取所有文章数据（按日期倒序）
 * @param {string} category - 分类筛选（可选）
 * @returns {object[]} 文章数据数组
 */
export function getAllPosts(category = null) {
  const categories = category ? [category] : ['tech', 'life', 'travel']
  const allPosts = []

  categories.forEach((cat) => {
    const slugs = getAllPostSlugs(cat)
    slugs.forEach((slug) => {
      const postData = getPostData(slug, cat)
      if (postData) {
        allPosts.push(postData)
      }
    })
  })

  // 按日期倒序排序
  return allPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * 获取所有分类
 * @returns {string[]} 分类数组
 */
export function getAllCategories() {
  return ['tech', 'life', 'travel']
}

/**
 * 获取所有标签
 * @param {string} category - 分类筛选（可选）
 * @returns {string[]} 去重后的标签数组
 */
export function getAllTags(category = null) {
  const posts = getAllPosts(category)
  const tagsSet = new Set()
  
  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => tagsSet.add(tag))
    }
  })

  return Array.from(tagsSet).sort()
}

/**
 * 根据标签筛选文章
 * @param {string} tag - 标签
 * @param {string} category - 分类筛选（可选）
 * @returns {object[]} 筛选后的文章数组
 */
export function getPostsByTag(tag, category = null) {
  const allPosts = getAllPosts(category)
  return allPosts.filter((post) => 
    post.tags && post.tags.includes(tag)
  )
}
