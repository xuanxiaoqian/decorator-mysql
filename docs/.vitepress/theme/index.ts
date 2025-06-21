import 'viewerjs/dist/viewer.min.css'
import { useRoute } from 'vitepress'
import imageViewer from 'vitepress-plugin-image-viewer'
import Theme from "vitepress/theme"
import CreateTime from '../components/create-time.vue'
import "./style/article.css"
import "./style/var.css"

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component('CreateTime', CreateTime)
  },
  setup() {
    // 获取路由
    const route = useRoute()

    // 使用
    imageViewer(route)
    //   , '.vp-doc img', {
    //   toggleOnDblclick: false,
    //   zoomRatio: 0.25,
    // }
  }
}
