// Disqus 评论组件
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function DisqusComments({ identifier, title, url }) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof window === 'undefined' || !document) return

    // 重置 Disqus
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = identifier
          this.page.url = url
          this.page.title = title
        }
      })
    } else {
      // 首次加载 Disqus 脚本
      const script = document.createElement('script')
      script.src = `https://${process.env.NEXT_PUBLIC_DISQUS_SHORTNAME}.disqus.com/embed.js`
      script.setAttribute('data-timestamp', Date.now().toString())
      script.async = true
      document.body.appendChild(script)
    }

    // 清理函数
    return () => {
      const disqusScript = document.querySelector(`script[src*="${process.env.NEXT_PUBLIC_DISQUS_SHORTNAME}"]`)
      if (disqusScript && disqusScript.parentNode) {
        disqusScript.parentNode.removeChild(disqusScript)
      }
      // 清理 Disqus 容器
      const disqusThread = document.getElementById('disqus_thread')
      if (disqusThread) {
        disqusThread.innerHTML = ''
      }
    }
  }, [router.asPath, identifier, title, url, mounted])

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div id="disqus_thread" />
      <noscript>
        请启用 JavaScript 以查看{' '}
        <a href="https://disqus.com/?ref_noscript">
          Disqus 评论
        </a>
        。
      </noscript>
    </div>
  )
}
