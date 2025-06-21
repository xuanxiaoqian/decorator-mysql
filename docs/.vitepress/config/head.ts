import { HeadConfig } from 'vitepress'

const BASE_URL = '/'

export const headConfig: HeadConfig[] = [
  ['link', { rel: 'icon', href: `${BASE_URL}xuanxiaoqian.webp` }],
  ['link', { rel: 'manifest', href: `${BASE_URL}manifest.json` }],
  ['script', { id: 'pwa' }, `
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("${BASE_URL}serviceWorker.js").then(res => console.log("service worker registered")).catch(err => console.log("service worker not registered", err))
      })
    }
    `],
  [
    'meta',
    { name: 'keywords', content: '轩小浅,轩小浅 首页,xuanxiaoqian' },
  ],
  ['meta', { name: 'theme-color', content: '#ffffff' }],
  ['meta', { name: 'author', content: '轩小浅' }],
  ['meta', { httpEquiv: 'Content-Security-Policy', content: 'upgrade-insecure-requests' }],
]