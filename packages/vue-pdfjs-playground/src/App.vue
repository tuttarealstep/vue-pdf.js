<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'
import { VuePDFjs, usePDF } from '@tuttarealstep/vue-pdf.js'
import '@tuttarealstep/vue-pdf.js/dist/style.css'
import enUS_FTL from '@tuttarealstep/vue-pdf.js/l10n/en-US/viewer.ftl?raw'

const pdf = new URL('./assets/compressed.tracemonkey-pldi-09.pdf', import.meta.url);

const vuepdfjs = useTemplateRef<typeof VuePDFjs>('vuepdfjs')

const options = reactive({
  locale: {
    code: 'en-US',
    ftl: enUS_FTL
  }
})

const onPdfAppLoaded = () => {
  console.log('pdf-app:loaded')
  console.log(vuepdfjs.value?.pdfApp)

  if (!vuepdfjs.value?.pdfApp) {
    return
  }

  vuepdfjs.value.pdfApp.eventBus.on('pagesloaded', (e: any) => {
    vuepdfjs.value?.pdfApp.eventBus.dispatch('find', {
      query: ['Dynamic languages such as JavaScript are more difficult to compile than statically typed ones.'],
      caseSensitive: false,
      entireWord: false,
      highlightAll: true
    })
  })
}

const { pdf: document, info, pages} = usePDF(pdf)

console.log(document, info, pages)
</script>

<template>
  <div id="app">
    <VuePDFjs ref="vuepdfjs" :source="document" :options="options" @pdf-app:loaded="onPdfAppLoaded" />
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
}
</style>