<script setup lang="ts">
import { h, reactive, ref, useTemplateRef, watch, watchEffect } from 'vue'
import { VuePDFjs, usePDF } from '@tuttarealstep/vue-pdf.js'
import '@tuttarealstep/vue-pdf.js/dist/style.css'
import enUS_FTL from '@tuttarealstep/vue-pdf.js/l10n/en-US/viewer.ftl?raw'
import type { VuePDFjsProps } from '../../vue/dist/src/components/VuePDFjs.vue';

const pdf = new URL('./assets/compressed.tracemonkey-pldi-09.pdf', import.meta.url);

const vuepdfjs = useTemplateRef<InstanceType<typeof VuePDFjs>>('vuepdfjs')

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
      /*secondaryOpenFile: false,
      secondaryDownload: false,
      secondaryPrint: false,
      scaleSelect: false,
      print: false,
      download: false,*/
    }
  },
  sidebar: {
    visible: true
  },
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

const onPdfAppError = (error: unknown) => {
  console.error(error)

  alert("An error occurred whit the PDF document.")
}

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

  vuepdfjs.value.pdfApp.eventBus.on('documenterror', onPdfAppError)
}

const sourceOptions = reactive<NonNullable<VuePDFjsProps['sourceOptions']>>({
  onError: onPdfAppError
})

const { pdf: document, info, pages } = usePDF(pdf, {
  onError: onPdfAppError
})

const source = ref<any>()

watch(document, (value) => {
  source.value = value
})

</script>

<template>
  <div>
    <input type="checkbox" v-model="hideToolbar" /> Hide Toolbar
    <input type="checkbox" v-model="hideSidebar" /> Hide Sidebar
    <button type="button" class="custom-button" @click="source = `invalid${new Date().getTime()}.pdf`">
      Load Invalid PDF
    </button>
  </div>
  <div>
    We have {{ vuepdfjs?.pdfPages }} pages in this document.
  </div>
  <div id="playground">
    <VuePDFjs ref="vuepdfjs" :source :options="options" :source-options="sourceOptions"
      @pdf-app:loaded="onPdfAppLoaded" />
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