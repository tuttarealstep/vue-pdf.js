<script setup lang="ts">
import { h, reactive, ref, useTemplateRef, watchEffect } from 'vue'
import { VuePDFjs, usePDF } from '@tuttarealstep/vue-pdf.js'
import '@tuttarealstep/vue-pdf.js/dist/style.css'
import enUS_FTL from '@tuttarealstep/vue-pdf.js/l10n/en-US/viewer.ftl?raw'
import type { VuePDFjsProps } from '../../vue/dist/src/components/VuePDFjs.vue';

const pdf = new URL('./assets/compressed.tracemonkey-pldi-09.pdf', import.meta.url);

const vuepdfjs = useTemplateRef<typeof VuePDFjs>('vuepdfjs')

const hideToolbar = ref(false)
const hideSidebar = ref(false)

const options = reactive<NonNullable<VuePDFjsProps['options']>>({
  locale: {
    code: 'en-US',
    ftl: enUS_FTL
  },
  toolbar: {
    visible: true,
    options: {
      sidebarToggle: false,
      secondaryOpenFile: false,
      /*secondaryDownload: false,
      secondaryPrint: false,
      scaleSelect: false,
      print: false,
      download: false,*/
    }
  },
  sidebar: {
    visible: true
  }
})

watchEffect(() => {
  if (options.toolbar) {
    options.toolbar.visible = !hideToolbar.value

    options.toolbar.options = {
      ...options.toolbar.options,
      sidebarToggle: !hideSidebar.value
    }
  }

  if (options.sidebar)
    options.sidebar.visible = !hideSidebar.value
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

const { pdf: document, info, pages } = usePDF(pdf)

console.log(document, info, pages)
</script>

<template>
  <div>
    <input type="checkbox" v-model="hideToolbar" /> Hide Toolbar
    <input type="checkbox" v-model="hideSidebar" /> Hide Sidebar
  </div>
  <div id="playground">
    <VuePDFjs ref="vuepdfjs" :source="document" :options="options" @pdf-app:loaded="onPdfAppLoaded" />
  </div>
</template>

<style>
html,
body,
#app,
#playground {
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>