import { defineConfig } from 'vitepress'
import { footerConfig } from './config/footer'
import { headConfig } from './config/head'
import { i18nConfig } from './config/i18n'
import { markdownConfig } from './config/markdown'
import { navConfig } from './config/nav'
import { sidebarConfig } from './config/sidebar'


export default defineConfig({
  ignoreDeadLinks: true,
  title: '轩小浅',
  description: '轩小浅官网',
  head: headConfig,
  lastUpdated: true,
  themeConfig: {
    logo: '/xuanxiaoqian.webp',
    footer: footerConfig,
    siteTitle: '轩小浅',
    nav: navConfig,
    sidebar: sidebarConfig,
    outline: 'deep',
    lastUpdated: {
      text: '最后更新时间'
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        },
      }
    },

    ...i18nConfig
  },
  markdown: markdownConfig
})
