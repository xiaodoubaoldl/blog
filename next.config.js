/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出（可选，如果需要完全静态）
  // output: 'export',
  // 图片优化配置
  images: {
    // 允许的图片域名（如果需要加载外部图片）
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // 图片格式优化
    formats: ['image/avif', 'image/webp'],
  },
  // 页面扩展名配置
  pageExtensions: ['js', 'jsx'],
  // 实验性功能
  experimental: {
    // 优化字体加载
    optimizeFonts: true,
  },
}

module.exports = nextConfig
