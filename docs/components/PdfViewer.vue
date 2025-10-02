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
const useContainerQuery = ref(false)
const playgroundWidth = ref(100)

const options = reactive<NonNullable<VuePDFjsProps['options']>>({
    locale: {
        code: 'en-US',
        ftl: enUS_FTL
    },
    toolbar: {
        visible: true,
        options: {
            sidebarToggleButton: true,
        }
    },
    sidebar: {
        visible: true
    }
})

const onErrorHandler = (error: Error) => {
    console.error('Error loading PDF:', error)
    alert('An error occurred with the PDF')
}

const sourceOptions = {
    onError: onErrorHandler
}

watchEffect(() => {
    if (options.toolbar) {
        options.toolbar.visible = !hideToolbar.value
        options.toolbar.options = {
            ...options.toolbar.options,
            sidebarToggleButton: !hideSidebar.value
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

    vuepdfjs.value.pdfApp.eventBus.on('documenterror', onErrorHandler)
}

const pdf = 'https://raw.githubusercontent.com/mozilla/pdf.js/v5.4.149/web/compressed.tracemonkey-pldi-09.pdf'
const source = ref(pdf)
</script>

<template>
    We have {{ pages }} pages in this document.

    <div style="margin-bottom: 10px;">
        <input type="checkbox" v-model="hideToolbar" /> Hide Toolbar
        <input type="checkbox" v-model="hideSidebar" /> Hide Sidebar
        <button type="button" class="custom-button" @click="source = `invalid${new Date().getTime()}.pdf`">
            Load Invalid PDF
        </button>
        <input type="checkbox" v-model="useContainerQuery" /> Use container query
        <div>
            <label>Playground Width: {{ playgroundWidth }}%</label>
            <input type="range" v-model="playgroundWidth" min="0" max="100" />
        </div>
    </div>
    <div id="playground-container" :style="{ width: playgroundWidth + '%' }">
        <VuePDFjs ref="vuepdfjs" :source :options="options" :source-options="sourceOptions" :use-container-query
            @pdf-app:loaded="onPdfAppLoaded" />
    </div>
</template>

<style>
.pdf_viewer,
#playground-container {
    height: 650px;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.custom-button {
    padding: 0.25rem 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.custom-button:hover {
    background-color: #0056b3;
}
</style>