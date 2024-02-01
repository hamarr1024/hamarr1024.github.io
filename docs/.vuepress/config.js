import { defineUserConfig } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'

export default defineUserConfig({
  head: [['link',{ rel: 'icon', href: '/favico.ico' }]],
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN',
      title: 'hammar的笔记'
    },

  },
  // base:"/",
  theme: recoTheme({
    locales: {
      '/': {
        selectLanguageName: '简体中文',
      },
    },
    logo: '/logo.png',
    // authorAvatar: '/head.png',
    author: 'hamarr',
    docsRepo: 'https://github.com/hamarr1024/hamarr1024.github.io.git',
    docsBranch: 'master',
    // docsDir: '/docs/',
    lastUpdatedText: '',
    series: {
      '/blogs/java/collections/': [
        {
          text: 'JDK源码分析',
          children: [
            '源码分析-ArrayList.md',
          ],
        },
        {
          text: '手写系列',
          children: [
            '手写ArrayList.md',
            '手写HashMap.md',
          ],
        },
      ],
    },
    navbar: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Java',
        icon: 'Cafe',
        children: [
          { text: '集合', link: '/blogs/java/collections/源码分析-ArrayList.md' },
        ],
      }
    ],
    autoSetBlogCategories: false,
    // autoAddCategoryToNavbar: {
    //   location: 1,
    //   categoryText: '分类',
    //   tagText: '标签'
    // },
    autoSetSeries: false,
    vuePreviewsDir: './docs/.vuepress/vue-previews',
    componentsDir: './docs/.vuepress/components',
    // primaryColor: '#3aa675',
  }),
  debug: true,
})
