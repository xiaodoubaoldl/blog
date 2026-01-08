# 个人博客网站

基于 Next.js 构建的「技术+旅游+摄影」三合一个人静态博客网站。

## 技术栈

- **框架**: Next.js 14 (使用 JavaScript)
- **样式**: Tailwind CSS
- **Markdown 解析**: gray-matter + react-markdown
- **代码高亮**: rehype-highlight
- **暗黑模式**: next-themes
- **图片预览**: react-photo-view
- **评论系统**: Disqus

## 功能特性

✅ 三个分类：技术、生活、旅游  
✅ 响应式设计（移动端 + 桌面端）  
✅ 暗黑模式支持  
✅ Markdown 文章管理  
✅ 代码语法高亮  
✅ 图片优化与懒加载  
✅ 旅游相册图片预览  
✅ 标签筛选功能  
✅ SEO 优化  
✅ Disqus 评论系统  
✅ 静态生成（SSG）

## 项目结构

```
blog/
├── components/          # 组件目录
│   ├── Layout.js       # 布局组件（导航栏+页脚）
│   ├── PostCard.js     # 文章卡片组件
│   ├── MarkdownContent.js  # Markdown 渲染组件
│   ├── DisqusComments.js   # Disqus 评论组件
│   └── TagFilter.js    # 标签筛选组件
├── lib/                # 工具函数
│   ├── posts.js        # 文章处理函数
│   └── utils.js        # 通用工具函数
├── pages/              # 页面目录
│   ├── _app.js         # 应用入口
│   ├── index.js        # 首页
│   ├── tech.js         # 技术分类页
│   ├── life.js         # 生活分类页
│   ├── travel.js        # 旅游分类页
│   ├── about.js        # 关于页
│   ├── 404.js          # 404 页面
│   └── posts/          # 文章详情页
│       └── [category]/
│           └── [slug].js
├── posts/              # Markdown 文章目录
│   ├── tech/           # 技术文章
│   ├── life/           # 生活文章
│   └── travel/         # 旅游文章
├── styles/             # 样式文件
│   └── globals.css     # 全局样式
├── .env.example        # 环境变量示例
├── next.config.js      # Next.js 配置
├── tailwind.config.js  # Tailwind 配置
└── package.json        # 项目依赖

```

## 本地启动步骤

### 1. 安装依赖

```bash
cd blog
npm install
# 或
yarn install
# 或
pnpm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`：

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的 Disqus shortname：

```bash
NEXT_PUBLIC_DISQUS_SHORTNAME=your-disqus-shortname
```

> **如何获取 Disqus shortname？**
> 1. 访问 [Disqus 官网](https://disqus.com/) 注册账号
> 2. 创建新站点，获取 shortname（例如：`my-blog`）
> 3. 将 shortname 填入环境变量

### 3. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 4. 构建生产版本

```bash
npm run build
npm start
```

## Vercel 部署步骤

### 方法一：通过 Vercel 网站部署（推荐）

1. **准备代码仓库**
   - 将代码推送到 GitHub/GitLab/Bitbucket

2. **连接 Vercel**
   - 访问 [Vercel](https://vercel.com/)
   - 使用 GitHub 账号登录
   - 点击 "New Project"
   - 导入你的代码仓库

3. **配置项目**
   - Framework Preset: **Next.js**（自动检测）
   - Root Directory: `./`（如果博客在子目录，填写相对路径）
   - Build Command: `npm run build`（默认）
   - Output Directory: `.next`（默认）

4. **配置环境变量**
   - 在项目设置中添加环境变量：
     - `NEXT_PUBLIC_DISQUS_SHORTNAME`: 你的 Disqus shortname
   - 可选：
     - `NEXT_PUBLIC_SITE_URL`: 你的网站 URL

5. **部署**
   - 点击 "Deploy"
   - 等待构建完成
   - 访问提供的域名

### 方法二：通过 Vercel CLI 部署

1. **安装 Vercel CLI**

```bash
npm i -g vercel
```

2. **登录 Vercel**

```bash
vercel login
```

3. **部署**

```bash
cd blog
vercel
```

按照提示完成配置，首次部署会询问：
- Set up and deploy? **Yes**
- Which scope? 选择你的账号
- Link to existing project? **No**（首次部署）
- Project name? 输入项目名称
- Directory? `./`（默认）
- Override settings? **No**（默认）

4. **配置环境变量**

```bash
vercel env add NEXT_PUBLIC_DISQUS_SHORTNAME
# 输入你的 Disqus shortname
```

5. **重新部署**

```bash
vercel --prod
```

## 如何新增文章

### 1. 创建 Markdown 文件

在对应的分类目录下创建 `.md` 文件：

- 技术文章：`posts/tech/your-post-name.md`
- 生活文章：`posts/life/your-post-name.md`
- 旅游文章：`posts/travel/your-post-name.md`

### 2. 添加 FrontMatter

在文件开头添加元数据：

```markdown
---
title: 文章标题
date: 2024-01-15
category: tech  # tech / life / travel
tags: ['标签1', '标签2']
summary: 文章简介（可选）
---

# 文章内容

这里是你的文章内容...
```

### 3. 编写内容

使用 Markdown 语法编写文章内容，支持：

- 标题、段落、列表
- **粗体**、*斜体*
- 代码块（自动语法高亮）
- 图片（使用相对路径或绝对 URL）
- 表格、引用等

### 4. 图片处理

**方式一：使用外部图片 URL**

```markdown
![图片描述](https://example.com/image.jpg)
```

**方式二：使用本地图片**

1. 在 `public` 目录下创建 `images` 文件夹
2. 将图片放入 `public/images/`
3. 在 Markdown 中引用：

```markdown
![图片描述](/images/your-image.jpg)
```

**旅游文章图片预览**

旅游分类的文章会自动启用图片预览功能，点击图片可以放大查看。

### 5. 重新构建

新增文章后，需要重新构建：

```bash
npm run build
```

开发模式下会自动检测文件变化。

## 如何修改配置

### 更换 Disqus 评论

1. 修改 `.env.local` 中的 `NEXT_PUBLIC_DISQUS_SHORTNAME`
2. 重新启动开发服务器或重新部署

### 自定义暗黑模式样式

编辑 `tailwind.config.js` 中的 `darkMode` 相关配置，或修改 `styles/globals.css` 中的暗黑模式样式。

### 修改主题颜色

编辑 `tailwind.config.js` 中的 `colors.primary` 配置：

```javascript
colors: {
  primary: {
    // 修改为你喜欢的颜色值
    500: '#3b82f6', // 主色调
    600: '#2563eb', // 深色
    // ...
  },
}
```

### 添加数据统计

#### 百度统计

1. 在 `pages/_app.js` 中添加：

```javascript
useEffect(() => {
  if (process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID) {
    const script = document.createElement('script')
    script.innerHTML = `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?${process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID}";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    `
    document.head.appendChild(script)
  }
}, [])
```

2. 在 `.env.local` 中添加：

```bash
NEXT_PUBLIC_BAIDU_ANALYTICS_ID=your-baidu-id
```

#### Google Analytics

1. 安装 `@next/third-parties`：

```bash
npm install @next/third-parties
```

2. 在 `pages/_app.js` 中使用：

```javascript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </>
  )
}
```

3. 在 `.env.local` 中添加：

```bash
NEXT_PUBLIC_GA_ID=your-ga-id
```

## 示例文章

项目已包含 3 篇示例文章：

1. **技术文章**: `posts/tech/nextjs-best-practices.md`
2. **生活文章**: `posts/life/daily-reflection.md`
3. **旅游文章**: `posts/travel/beijing-travel.md`

你可以参考这些文章的格式来创建自己的文章。

> **注意**: 示例文章中的图片使用了 Unsplash 的占位图片，实际使用时请替换为你的真实图片。

## 常见问题

### Q: 文章不显示？

A: 检查以下几点：
- Markdown 文件是否在正确的目录下（`posts/tech/`、`posts/life/`、`posts/travel/`）
- FrontMatter 格式是否正确（注意 `---` 前后不能有空格）
- `category` 字段是否正确（`tech`、`life`、`travel`）
- 重新构建项目：`npm run build`

### Q: 图片不显示？

A: 
- 检查图片路径是否正确
- 如果使用本地图片，确保图片在 `public` 目录下
- 检查 `next.config.js` 中的图片域名配置

### Q: Disqus 评论不显示？

A:
- 检查环境变量 `NEXT_PUBLIC_DISQUS_SHORTNAME` 是否正确配置
- 确认 Disqus 站点已正确设置
- 检查浏览器控制台是否有错误信息

### Q: 暗黑模式不生效？

A:
- 确保 `next-themes` 已正确安装
- 检查 `_app.js` 中是否包裹了 `ThemeProvider`
- 清除浏览器缓存后重试

## 性能优化建议

1. **图片优化**: 使用 Next.js 的 `Image` 组件，自动优化图片
2. **静态生成**: 所有页面使用静态生成（SSG），加载速度极快
3. **代码分割**: Next.js 自动进行代码分割
4. **CDN 部署**: Vercel 自动提供全球 CDN 加速

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

如有问题，欢迎通过 GitHub Issues 反馈。
# blog
# blog
