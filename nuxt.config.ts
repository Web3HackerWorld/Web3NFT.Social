import { appFolder } from './nuxtConfig/0.dotenv'
import { pwa } from './nuxtConfig/pwa'
import { modules } from './nuxtConfig/modules'
import { app } from './nuxtConfig/app'
import { imports } from './nuxtConfig/imports'

export default defineNuxtConfig({
  alias: {
    '@app': appFolder('.'),
  },
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
  experimental: {
    viewTransition: true,
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    reactivityTransform: true
  },
  devtools: {
    enabled: true,
  },
  app,
  ssr: process.env.NODE_ENV !== 'development',
  // ssr: false,
  pwa,
  // typescript: {
  //   strict: true
  // },
  // sourcemap: {
  //   server: true,
  //   client: true
  // }
})
