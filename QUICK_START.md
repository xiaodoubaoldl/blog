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

## 下一步

- 阅读 [README.md](./README.md) 了解详细功能
- 查看 [ENV_SETUP.md](./ENV_SETUP.md) 了解环境变量配置
- 自定义样式和主题颜色
- 添加你的文章和图片

祝你使用愉快！🎉
