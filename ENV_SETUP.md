# 环境变量配置说明

## 必需的环境变量

### Disqus 评论系统

```bash
NEXT_PUBLIC_DISQUS_SHORTNAME=your-disqus-shortname
```

**如何获取 Disqus shortname：**

1. 访问 [Disqus 官网](https://disqus.com/)
2. 注册账号并登录
3. 点击 "I want to install Disqus on my site"
4. 填写网站信息，获取 shortname（例如：`my-blog`）
5. 将 shortname 填入环境变量

## 可选的环境变量

### 网站 URL（用于 SEO 和分享）

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 百度统计

```bash
NEXT_PUBLIC_BAIDU_ANALYTICS_ID=your-baidu-id
```

### Google Analytics

```bash
NEXT_PUBLIC_GA_ID=your-ga-id
```

## 配置步骤

### 本地开发

1. 在项目根目录创建 `.env.local` 文件
2. 复制以下内容并填入你的配置：

```bash
# Disqus 评论系统（必需）
NEXT_PUBLIC_DISQUS_SHORTNAME=your-disqus-shortname

# 网站 URL（可选）
# NEXT_PUBLIC_SITE_URL=https://your-domain.com

# 数据统计（可选）
# NEXT_PUBLIC_BAIDU_ANALYTICS_ID=your-baidu-id
# NEXT_PUBLIC_GA_ID=your-ga-id
```

3. 重启开发服务器

### Vercel 部署

1. 在 Vercel 项目设置中，进入 "Environment Variables"
2. 添加所需的环境变量
3. 重新部署项目

**注意：** 环境变量名称必须以 `NEXT_PUBLIC_` 开头才能在客户端使用。
