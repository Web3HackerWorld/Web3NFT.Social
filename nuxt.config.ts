import { appFolder } from './nuxtConfig/0.dotenv'
import { pwa } from './nuxtConfig/pwa'
import { modules } from './nuxtConfig/modules'
import { app } from './nuxtConfig/app'
import { imports } from './nuxtConfig/imports'

export default defineNuxtConfig({
  dir: {
    layouts: appFolder('layouts'),
    pages: appFolder('pages'),
    public: appFolder('public'),
  },
  imports,
  components: {
    dirs: [
      appFolder('components'),
      {
        path: '~/components',
        extensions: ['vue'],
        prefix: 'Bs',
      },
    ],
  },
  modules,
  // experimental: {
  //   // when using generate, payload js assets included in sw precache manifest
  //   // but missing on offline, disabling extraction it until fixed
  //   payloadExtraction: false,
  //   reactivityTransform: true,
  //   inlineSSRStyles: false,
  // },
  css: [
    '@unocss/reset/tailwind.css',
  ],
  colorMode: {
    classSuffix: '',
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },
  app,
  ssr: process.env.NODE_ENV !== 'development',
  pwa,
})
