# 快速启动指南

## 5 分钟快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env.local` 文件：

```bash
NEXT_PUBLIC_DISQUS_SHORTNAME=your-disqus-shortname
```

> **提示**: 如果暂时不需要评论功能，可以先不配置，评论区域不会显示。

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 4. 查看示例文章

项目已包含 3 篇示例文章：
- 技术文章：`posts/tech/nextjs-best-practices.md`
- 生活文章：`posts/life/daily-reflection.md`
- 旅游文章：`posts/travel/beijing-travel.md`

## 创建你的第一篇文章

1. 在 `posts/tech/` 目录下创建 `my-first-post.md`

2. 添加内容：

```markdown
---
title: 我的第一篇文章
date: 2024-01-15
category: tech
tags: ['测试', '入门']
summary: 这是我的第一篇文章
---

# 我的第一篇文章

欢迎来到我的博客！
```

3. 保存文件，刷新浏览器即可看到新文章

## 部署到 Vercel

### 方法一：GitHub + Vercel（推荐）

1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 导入 GitHub 仓库
4. 配置环境变量
5. 点击部署

### 方法二：Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## 国内访问解决方案

如果部署在 Vercel 的网站在国内无法访问，可以尝试以下解决方案：

### 方案一：使用自定义域名 + 国内 CDN（推荐）

1. **购买域名并备案**
   - 在国内域名服务商（如阿里云、腾讯云）购买域名
   - 完成域名备案（必须步骤）

2. **配置自定义域名**
   - 在 Vercel 项目设置中添加自定义域名
   - 按照提示配置 DNS 记录（CNAME 或 A 记录）

3. **使用国内 CDN 加速**
   - 使用阿里云 CDN、腾讯云 CDN 或 Cloudflare（国内节点）
   - 将域名 CNAME 指向 CDN 节点
   - CDN 回源到 Vercel 的域名

### 方案二：迁移到国内平台

如果 Vercel 访问不稳定，可以考虑迁移到国内平台：

**选项 1：阿里云 OSS + 静态网站托管**
```bash
# 构建静态文件
npm run build
# 上传到阿里云 OSS
```

**选项 2：腾讯云 COS + 静态网站托管**
```bash
# 构建静态文件
npm run build
# 上传到腾讯云 COS
```

**选项 3：Netlify（部分地区访问更稳定）**
```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod
```

### 方案三：使用 Vercel 边缘网络优化

1. 在 Vercel 项目设置中启用 **Edge Network**
2. 配置 **Regional Edge Caching**
3. 使用 Vercel 的 **Speed Insights** 优化性能

### 方案四：使用 Cloudflare Workers（高级）

1. 将 Vercel 部署的网站通过 Cloudflare Workers 代理
2. 利用 Cloudflare 的全球 CDN 网络
3. 配置 Workers 路由规则

### 临时解决方案

如果急需访问，可以：
- 使用代理服务或 VPN
- 配置 hosts 文件（不推荐，仅用于测试）

> **注意**：方案一（自定义域名 + 国内 CDN）是最稳定和推荐的方案，但需要域名备案。如果不想备案，可以考虑方案二迁移到国内平台。

## 下一步

- 阅读 [README.md](./README.md) 了解详细功能
- 查看 [ENV_SETUP.md](./ENV_SETUP.md) 了解环境变量配置
- 自定义样式和主题颜色
- 添加你的文章和图片

祝你使用愉快！🎉
