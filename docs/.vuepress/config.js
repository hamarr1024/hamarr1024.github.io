import { defineUserConfig } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default defineUserConfig({
  head: [['link', { rel: 'icon', href: '/favico.ico' }]],
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
      '/blogs/java/spi/': [
        {
          text: 'Java SPI',
          children: [
            'introduction.md',
            'Java SPI是什么.md',
            'Java SPI的使用.md',
            'Java SPI源码分析.md',
            '总结.md',
          ],
        }
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
          // { text: '集合', link: '/blogs/java/collections/源码分析-ArrayList.md' },
          { text: 'SPI', link: '/blogs/java/spi/introduction.md' },
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
    // plugins: {
    //   mdEnhance: {
    //     mermaid: true
    //   }
    // },
  }),
  plugins: [
    mdEnhancePlugin({
      // Enable mermaid
      mermaid: true,
      markup:true,
    }),
  ],
  // debug: true,
})
