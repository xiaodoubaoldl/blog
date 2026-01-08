// 通用工具函数
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

/**
 * 格式化日期
 * @param {string} dateString - 日期字符串
 * @param {string} formatStr - 格式化字符串
 * @returns {string} 格式化后的日期
 */
export function formatDate(dateString, formatStr = 'yyyy年MM月dd日') {
  try {
    const date = new Date(dateString)
    return format(date, formatStr, { locale: zhCN })
  } catch (error) {
    return dateString
  }
}

/**
 * 获取分类中文名称
 * @param {string} category - 分类英文名
 * @returns {string} 分类中文名
 */
export function getCategoryName(category) {
  const categoryMap = {
    tech: '技术',
    life: '生活',
    travel: '旅游',
  }
  return categoryMap[category] || category
}

/**
 * 获取分类颜色
 * @param {string} category - 分类
 * @returns {string} Tailwind CSS 颜色类
 */
export function getCategoryColor(category) {
  const colorMap = {
    tech: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    life: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    travel: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  }
  return colorMap[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
}

/**
 * 生成文章 URL
 * @param {string} category - 分类
 * @param {string} slug - 文章 slug
 * @returns {string} 文章 URL
 */
export function getPostUrl(category, slug) {
  return `/posts/${category}/${slug}`
}

/**
 * 截取文本
 * @param {string} text - 文本
 * @param {number} length - 最大长度
 * @returns {string} 截取后的文本
 */
export function truncateText(text, length = 150) {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}
