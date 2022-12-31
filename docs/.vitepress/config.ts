import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'decorator-mysql',
  description: '爱用装饰器风格查询MySQL的框架一枚鸭~',
  head: [
    ['link', { rel: 'icon', href: '/xuanxiaoqian.png' }],
    [
      'meta',
      { name: 'keywords', content: 'decorator-mysql 首页,decorator-mysql 文档,轩小浅' },
    ],
    ['meta', { name: 'author', content: '轩小浅' }],
  ],
  themeConfig: {
    logo: '/xuanxiaoqian.png',
    siteTitle: 'decorator-mysql',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xuanxiaoqian/decorator-mysql' },
    ],
    nav: [
      { text: '指南', link: '/guide/about' },
      {
        text: '配置参考',
        link: '/configDoc/baseConfig/baseDir',
      },
      { text: '更多说明', link: '/more/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          items: [
            { text: '关于框架', link: '/guide/about' },
            { text: '极速体验', link: '/guide/installation' },
            { text: '发展历程', link: '/guide/history' },
            { text: '相关讲解', link: '/guide/explain' },
            { text: '配置参考', link: '/guide/configRef' },
          ],
        },
      ],
      '/configDoc/': [
        {
          text: '基础配置',
          items: [{ text: '目录结构', link: '/configDoc/baseConfig/baseDir' }],
        },
        {
          text: '可选配置',
          items: [
            { text: 'axios', link: '/configDoc/optionConfig/axios/axios' },
            { text: 'pinia', link: '/configDoc/optionConfig/pinia/pinia' },
            { text: 'scss', link: '/configDoc/optionConfig/scss/scss' },
          ],
        },
        {
          text: '创建模块',
          items: [
            { text: '介绍', link: '/configDoc/createConfig/guide' },
            { text: 'router', link: '/configDoc/createConfig/router/router' },
            { text: 'pinia', link: '/configDoc/createConfig/pinia/pinia' },
          ],
        },
      ],
    },
  },
  markdown: {
    externalLinks: { target: '_blank', rel: 'nofollow noopener noreferrer' },
  },
})
