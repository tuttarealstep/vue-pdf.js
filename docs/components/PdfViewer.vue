<script setup lang="ts">
import { reactive, useTemplateRef, ref, watchEffect } from 'vue'
import { VuePDFjs } from '../../packages/vue'
import '../../packages/vue/dist/style.css'
import enUS_FTL from '../../packages/vue/dist/l10n/en-US/viewer.ftl?raw'
import type { VuePDFjsProps } from '../../packages/vue/dist/src/components/VuePDFjs.vue';

const vuepdfjs = useTemplateRef<typeof VuePDFjs>('vuepdfjs')

const pages = ref(0);
const hideToolbar = ref(false);
const hideSidebar = ref(false);

const options = reactive<NonNullable<VuePDFjsProps['options']>>({
    locale: {
        code: 'en-US',
        ftl: enUS_FTL
    },
    toolbar: {
        visible: true,
        options: {
            sidebarToggle: true,
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

    if (options.sidebar) {
        options.sidebar.visible = !hideSidebar.value
    }
})

const onPdfAppLoaded = () => {
    console.log('pdf-app:loaded')
    console.log(vuepdfjs.value?.pdfApp)

    if (!vuepdfjs.value?.pdfApp) {
        return
    }

    vuepdfjs.value.pdfApp.eventBus.on('pagesloaded', (e: {
        source: any, pagesCount: number
    }) => {
        vuepdfjs.value?.pdfApp.eventBus.dispatch('find', {
            query: ['Dynamic languages such as JavaScript are more difficult to compile than statically typed ones.'],
            caseSensitive: false,
            entireWord: false,
            highlightAll: true
        })

        //Set the number of pages in the ref
        pages.value = e.pagesCount
    })
}

const pdf = 'https://raw.githubusercontent.com/mozilla/pdf.js/v4.9.124/web/compressed.tracemonkey-pldi-09.pdf'
</script>

<template>
    We have {{ pages }} pages in this document.

    <div>
        <input type="checkbox" v-model="hideToolbar" /> Hide Toolbar
        <input type="checkbox" v-model="hideSidebar" /> Hide Sidebar
    </div>
    <VuePDFjs ref="vuepdfjs" :source="pdf" :options="options" @pdf-app:loaded="onPdfAppLoaded" />
</template>

<style>
.pdf_viewer {
    height: 650px;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
</style>