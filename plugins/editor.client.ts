import ResizeTextarea from 'resize-textarea-vue3'

import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'

import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'

import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import hljs from 'highlight.js'

export default defineNuxtPlugin((nuxtApp) => {
  VMdEditor.use(githubTheme, {
    Hljs: hljs,
  })
  nuxtApp.vueApp.use(VMdEditor)

  VMdPreview.use(githubTheme, {
    Hljs: hljs,
  })
  nuxtApp.vueApp.use(VMdPreview)
  nuxtApp.vueApp.use(ResizeTextarea)
})
