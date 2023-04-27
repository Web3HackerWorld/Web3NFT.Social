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

const pinia = [
  '@pinia/nuxt',
  {
    autoImports: [
      'defineStore',
      'acceptHMRUpdate',
    ],
  },
]

const maybeUseModules = () => {
  const modules = []
  const { NUXT_PUBLIC_GTAG_ID } = process.env
  if (NUXT_PUBLIC_GTAG_ID) {
    modules.push(['nuxt-gtag', {
      id: NUXT_PUBLIC_GTAG_ID,
    }])
  }

  return modules
}

export const modules = [
  // '@vue-macros/nuxt',
  ...maybeUseModules(),
  i18n,
  unocss,
  pinia,
  '@nuxtjs/supabase',
  '@vueuse/motion/nuxt',
  'nuxt-lodash',
  '@vueuse/nuxt',
  '@nuxtjs/color-mode',
  '@vite-pwa/nuxt',
]
