<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue'
import { VuePDFjs } from '../../packages/vue'
import '../../packages/vue/dist/style.css'
import enUS_FTL from '../../packages/vue/dist/l10n/en-US/viewer.ftl?raw'
import type { VuePDFjsProps } from '../../packages/vue/dist/src/components/VuePDFjs.vue';

const vuepdfjs = useTemplateRef<typeof VuePDFjs>('vuepdfjs')

// Toolbar options
const showToolbar = ref(true)
const showSidebar = ref(true)
const showPrintButton = ref(true)
const showDownloadButton = ref(true)
const showFindButton = ref(true)
const showSecondaryToolbar = ref(true)
const showEditorTools = ref(true)

// Appearance options
const themeColor = ref('#41B883')
const sidebarBgColor = ref('#41B883')
const toolbarBgColor = ref('#41B883')
const mainTextColor = ref('#ffffff')

// Container query options
const useContainerQuery = ref(true)
const containerWidth = ref(100)

const options = reactive<NonNullable<VuePDFjsProps['options']>>({
    locale: {
        code: 'en-US',
        ftl: enUS_FTL
    },
    toolbar: {
        visible: true,
        options: {
            printButton: true,
            downloadButton: true,
            secondaryDownload: true,
            secondaryPrint: true,
            viewFindButton: true,
            secondaryToolbarToggle: true,
            sidebarToggleButton: true,
            editorFreeText: true,
            editorHighlight: true,
            editorInk: true,
            editorStamp: true
        }
    },
    sidebar: {
        visible: true
    }
})

function updateOptions() {
    // Update toolbar visibility
    if (options.toolbar) {
        options.toolbar.visible = showToolbar.value
        
        // Update toolbar options
        options.toolbar.options = {
            ...options.toolbar.options,
            sidebarToggleButton: showSidebar.value,
            printButton: showPrintButton.value,
            secondaryPrint: showPrintButton.value,
            downloadButton: showDownloadButton.value,
            secondaryDownload: showDownloadButton.value,
            viewFindButton: showFindButton.value,
            secondaryToolbarToggle: showSecondaryToolbar.value,
            editorFreeText: showEditorTools.value,
            editorHighlight: showEditorTools.value,
            editorInk: showEditorTools.value,
            editorStamp: showEditorTools.value
        }
    }
    
    // Update sidebar visibility
    if (options.sidebar) {
        options.sidebar.visible = showSidebar.value
    }
    
    // Apply custom CSS variables
    applyCustomTheme()
}

function applyCustomTheme() {
    const root = document.querySelector('.customization-demo .vue-pdfjs') as HTMLElement
    if (!root) return
    
    // Apply custom CSS variables
    root.style.setProperty('--primary-color', themeColor.value)
    root.style.setProperty('--sidebar-narrow-bg-color', sidebarBgColor.value)
    root.style.setProperty('--toolbar-bg-color', toolbarBgColor.value)
    root.style.setProperty('--main-color', mainTextColor.value)
    root.style.setProperty('--button-hover-color', `${themeColor.value}50`)
    root.style.setProperty('--toggled-btn-color', `${themeColor.value}50`)
    root.style.setProperty('--toggled-btn-hover-color', `${themeColor.value}66`)
    
    // Check for dark mode from parent document
    const isDarkMode = document.documentElement.classList.contains('dark')
    
    if (isDarkMode) {
        // Apply dark mode adjustments to PDF viewer
        root.style.setProperty('--pdfjs-bg-color', 'var(--vp-c-bg)')
        root.style.setProperty('--pdfjs-toolbar-bg-color', 'var(--vp-c-bg-soft)')
        root.style.setProperty('--pdfjs-sidebar-bg-color', 'var(--vp-c-bg-soft)')
        root.style.setProperty('--pdfjs-border-color', 'var(--vp-c-divider)')
        root.style.setProperty('--pdfjs-text-layer-color', 'var(--vp-c-text-1)')
        root.style.setProperty('--pdfjs-annotation-layer-color', 'var(--vp-c-text-1)')
    }
}

const onPdfAppLoaded = () => {
    // Apply theme when PDF is loaded
    applyCustomTheme()
    
    // Add observer for theme changes
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class' && 
                mutation.target === document.documentElement) {
                applyCustomTheme()
            }
        })
    })
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    })
}

// Watch for changes to options
const watchedRefs = [
    showToolbar, showSidebar, showPrintButton, 
    showDownloadButton, showFindButton, showSecondaryToolbar,
    showEditorTools
]

watchedRefs.forEach(ref => {
    watch(ref, updateOptions)
})

const pdf = 'https://raw.githubusercontent.com/mozilla/pdf.js/v5.4.149/web/compressed.tracemonkey-pldi-09.pdf'

// Setup watchers for theme options
import { watch } from 'vue'

const watchedThemeRefs = [themeColor, sidebarBgColor, toolbarBgColor, mainTextColor]
watchedThemeRefs.forEach(ref => {
    watch(ref, applyCustomTheme)
})
</script>

<template>
    <div class="customization-demo">
        <div class="controls">
            <div class="control-section">
                <h3>Visibility Options</h3>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" v-model="showToolbar"> 
                        Show Toolbar
                    </label>
                    <label>
                        <input type="checkbox" v-model="showSidebar"> 
                        Show Sidebar
                    </label>
                    <label>
                        <input type="checkbox" v-model="showPrintButton"> 
                        Print Button
                    </label>
                    <label>
                        <input type="checkbox" v-model="showDownloadButton"> 
                        Download Button
                    </label>
                    <label>
                        <input type="checkbox" v-model="showFindButton"> 
                        Find Button
                    </label>
                    <label>
                        <input type="checkbox" v-model="showSecondaryToolbar"> 
                        Secondary Toolbar
                    </label>
                    <label>
                        <input type="checkbox" v-model="showEditorTools"> 
                        Editor Tools
                    </label>
                </div>
            </div>
            
            <div class="control-section">
                <h3>Theme Customization</h3>
                <div class="color-pickers">
                    <label>
                        Primary Color:
                        <input type="color" v-model="themeColor">
                    </label>
                    <label>
                        Sidebar Color:
                        <input type="color" v-model="sidebarBgColor">
                    </label>
                    <label>
                        Toolbar Color:
                        <input type="color" v-model="toolbarBgColor">
                    </label>
                    <label>
                        Text Color:
                        <input type="color" v-model="mainTextColor">
                    </label>
                </div>
            </div>
            
            <div class="control-section">
                <h3>Container Options</h3>
                <div>
                    <label>
                        <input type="checkbox" v-model="useContainerQuery"> 
                        Use Container Query
                    </label>
                </div>
                <div>
                    <label>Container Width: {{ containerWidth }}%</label>
                    <input type="range" v-model="containerWidth" min="30" max="100">
                </div>
            </div>
        </div>
        
        <div class="pdf-viewer-container" :style="{ width: containerWidth + '%' }">
            <VuePDFjs 
                ref="vuepdfjs" 
                :source="pdf" 
                :options="options" 
                :use-container-query="useContainerQuery"
                @pdf-app:loaded="onPdfAppLoaded" 
            />
        </div>
    </div>
</template>

<style>
.customization-demo {
    display: flex;
    flex-direction: column;
    height: 650px;
    width: 100%;
}

.controls {
    padding: 15px;
    background-color: var(--vp-c-bg-soft);
    border-bottom: 1px solid var(--vp-c-divider);
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.control-section {
    flex: 1;
    min-width: 250px;
}

.control-section h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: var(--vp-c-text-1);
}

.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.checkbox-group label {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--vp-c-text-1);
}

.color-pickers {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: var(--vp-c-text-1);
}

.color-pickers label {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pdf-viewer-container {
    flex: 1;
    min-height: 0;
    width: 100%;
    margin: 0 auto;
}
</style>
