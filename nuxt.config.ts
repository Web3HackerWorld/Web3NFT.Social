import { pwa } from './nuxtConfig/pwa'
import { modules } from './nuxtConfig/modules'
import { app } from './nuxtConfig/app'
import { components } from './nuxtConfig/components'
import { imports } from './nuxtConfig/imports'

export default defineNuxtConfig({
  imports,
  components,
  extends: [
    // '../bs-craft',
  ],
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
