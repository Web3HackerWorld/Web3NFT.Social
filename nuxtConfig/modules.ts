const i18n = [
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
]

const unocss = [
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
]

const maybeUseModules = () => {
  const modules = []
  const { GTAG_ID } = process.env
  if (GTAG_ID) {
    modules.push(['nuxt-gtag', {
      id: GTAG_ID,
    }])
  }

  return modules
}

export const modules = [
  ...maybeUseModules(),
  i18n,
  unocss,
  '@vueuse/motion/nuxt',
  'nuxt-lodash',
  '@vueuse/nuxt',
  '@pinia/nuxt',
  '@nuxtjs/color-mode',
  '@vite-pwa/nuxt',
]
