import type { NuxtConfig } from 'nuxt/config'

export const modules: NuxtConfig['modules'] = [
  [
    '@nuxtjs/i18n',
    {
      locales: [
        {
          code: 'en',
          file: 'en_US.json',
        },
        {
          code: 'zh',
          file: 'zh_CN.json',
        },
      ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'en',
    },
  ],
  'nuxt-lodash',
  '@vueuse/nuxt',
  [
    '@unocss/nuxt',
    {
    // presets
      uno: true, // enabled `@unocss/preset-uno`
      icons: true, // enabled `@unocss/preset-icons`
      attributify: true, // enabled `@unocss/preset-attributify`,
      // core options
      shortcuts: [],
      rules: [],
    },

  ],
  '@pinia/nuxt',
  '@nuxtjs/color-mode',
  '@vite-pwa/nuxt',
]
