import { DefaultTheme } from 'vitepress'

export const sidebarConfig: DefaultTheme.Sidebar = {
  ['/pages/历程']: [
    {
      items: [
        {
          text: "关于decorator-mysql",
          link: "/pages/历程/关于decorator-mysql"
        },
        {
          text: "发展历程",
          link: "/pages/历程/发展历程"
        }
      ]
    }
  ],
  ['/pages/文档']: [
    {
      items: [
        {
          text: "开始",
          link: "/pages/文档/1-开始"
        },
        {
          text: "查询",
          link: "/pages/文档/2-查询"
        },
        {
          text: "增删改",
          link: "/pages/文档/3-增删改"
        },
        {
          text: "@Transactional",
          link: "/pages/文档/4-@Transactional"
        }
      ]
    }
  ]
}