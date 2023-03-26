import { appDescription } from '../constants/index'

const logRocketScript = []

if (process.env.NUXT_PUBLIC_LOGROCKET_ID && process.env.NODE_ENV !== 'development') {
  logRocketScript.push({ src: 'https://cdn.lr-ingest.com/LogRocket.min.js', crossorigin: 'anonymous' })
  logRocketScript.push({ innerHTML: `window.LogRocket && window.LogRocket.init("${process.env.NUXT_PUBLIC_LOGROCKET_ID}");`, type: 'text/javascript', charset: 'utf-8' })
}

export const app = {
  head: {
    viewport: 'width=device-width,initial-scale=1',
    link: [
      { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    ],
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: appDescription },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    ],
    script: [
      ...logRocketScript,
    ],
  },
}
