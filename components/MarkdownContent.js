// Markdown 内容渲染组件
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import Image from 'next/image'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import 'highlight.js/styles/github-dark.css'

export default function MarkdownContent({ content, category = 'tech' }) {
  // 自定义图片组件（支持旅游相册预览）
  const ImageComponent = ({ src, alt, ...props }) => {
    const imageSrc = src || ''
    const imageAlt = alt || ''
    
    // 如果是旅游分类，使用图片预览功能
    if (category === 'travel') {
      return (
        <PhotoView src={imageSrc}>
          <div className="my-4 cursor-pointer rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={800}
              height={600}
              className="w-full h-auto"
              loading="lazy"
              unoptimized={imageSrc.startsWith('http')}
            />
          </div>
        </PhotoView>
      )
    }

    // 其他分类使用普通图片
    return (
      <div className="my-4 rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={800}
          height={600}
          className="w-full h-auto"
          loading="lazy"
          unoptimized={imageSrc.startsWith('http')}
        />
      </div>
    )
  }

  // 自定义代码块组件
  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '')
    const language = match ? match[1] : ''

    if (inline) {
      return (
        <code className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 rounded text-sm" {...props}>
          {children}
        </code>
      )
    }

    return (
      <div className="my-4 rounded-lg overflow-hidden">
        {language && (
          <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono">
            {language}
          </div>
        )}
        <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    )
  }

  // 如果是旅游分类，包裹在 PhotoProvider 中
  const markdownContent = (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight, rehypeRaw]}
      components={{
        img: ImageComponent,
        code: CodeBlock,
        // 自定义链接样式
        a: ({ node, ...props }) => (
          <a
            {...props}
            className="text-primary-600 dark:text-primary-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          />
        ),
        // 自定义标题样式
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white" {...props} />
        ),
        // 自定义列表样式
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside my-4 space-y-2 text-gray-700 dark:text-gray-300" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal list-inside my-4 space-y-2 text-gray-700 dark:text-gray-300" {...props} />
        ),
        // 自定义引用样式
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-primary-500 pl-4 my-4 italic text-gray-600 dark:text-gray-400"
            {...props}
          />
        ),
        // 自定义表格样式
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700" {...props} />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800 font-semibold" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="border border-gray-300 dark:border-gray-700 px-4 py-2" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )

  if (category === 'travel') {
    return (
      <PhotoProvider>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {markdownContent}
        </div>
      </PhotoProvider>
    )
  }

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {markdownContent}
    </div>
  )
}
