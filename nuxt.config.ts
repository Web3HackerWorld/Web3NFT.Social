import { pwa } from './nuxtConfig/pwa'
import { modules } from './nuxtConfig/modules'
import { app } from './nuxtConfig/app'
import { imports } from './nuxtConfig/imports'

const { APP_NAME } = process.env
export default defineNuxtConfig({
  dir: {
    layouts: `./apps/${APP_NAME}/layouts`,
    pages: `./apps/${APP_NAME}/pages`,
    public: `./apps/${APP_NAME}/public`,
  },
  imports,
  components: {
    dirs: [
      `./apps/${APP_NAME}/components`,
      {
        path: '~/components',
        extensions: ['vue'],
        prefix: 'Bs',
      },
    ],
  },
  modules,
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
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
