<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue'
import { VuePDFjs } from '../../packages/vue'
import '../../packages/vue/dist/style.css'
import enUS_FTL from '../../packages/vue/dist/l10n/en-US/viewer.ftl?raw'
import type { VuePDFjsProps } from '../../packages/vue/dist/src/components/VuePDFjs.vue';

const vuepdfjs = useTemplateRef<typeof VuePDFjs>('vuepdfjs')

// Toolbar options
const showToolbar = ref(true)
const showPrintButton = ref(true)
const showDownloadButton = ref(true)
const showFindButton = ref(true)
const showSecondaryToolbar = ref(true)
const showEditorTools = ref(true)

// Views Manager options
const showViewsManager = ref(true)
const showViewsManagerToggle = ref(true)
const showThumbnailsView = ref(true)
const showOutlinesView = ref(true)
const showAttachmentsView = ref(true)
const showLayersView = ref(true)
const showCurrentOutlineButton = ref(true)

// Appearance options
const themeColor = ref('#41B883')
const viewsManagerBgColor = ref('#2c3e50')
const toolbarBgColor = ref('#ffffff')
const mainTextColor = ref('#2c3e50')

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
            viewsManagerToggleButton: true,
            editorFreeText: true,
            editorHighlight: true,
            editorInk: true,
            editorStamp: true
        }
    },
    viewsManager: {
        visible: true,
        options: {
            thumbnailsViewMenu: true,
            outlinesViewMenu: true,
            attachmentsViewMenu: true,
            layersViewMenu: true,
            thumbnailsView: true,
            outlinesView: true,
            attachmentsView: true,
            layersView: true,
            viewsManagerCurrentOutlineButton: true
        }
    }
})

function updateOptions() {
    // Update toolbar visibility
    if (options.toolbar) {
        options.toolbar.visible = showToolbar.value
        
        // Update toolbar options
        options.toolbar.options = {
            ...options.toolbar.options,
            viewsManagerToggleButton: showViewsManagerToggle.value,
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
    
    // Update views manager visibility
    if (options.viewsManager) {
        options.viewsManager.visible = showViewsManager.value
        options.viewsManager.options = {
            ...options.viewsManager.options,
            thumbnailsViewMenu: showThumbnailsView.value,
            outlinesViewMenu: showOutlinesView.value,
            attachmentsViewMenu: showAttachmentsView.value,
            layersViewMenu: showLayersView.value,
            thumbnailsView: showThumbnailsView.value,
            outlinesView: showOutlinesView.value,
            attachmentsView: showAttachmentsView.value,
            layersView: showLayersView.value,
            viewsManagerCurrentOutlineButton: showCurrentOutlineButton.value
        }
    }
    
    // Apply custom CSS variables
    applyCustomTheme()
}

function applyCustomTheme() {
    const root = document.querySelector('.customization-demo .vue-pdfjs') as HTMLElement
    if (!root) return
    
    // Apply custom CSS variables with vue-pdfjs- prefix
    root.style.setProperty('--vue-pdfjs-primary-color', themeColor.value)
    root.style.setProperty('--vue-pdfjs-sidebar-narrow-bg-color', viewsManagerBgColor.value)
    root.style.setProperty('--vue-pdfjs-toolbar-bg-color', toolbarBgColor.value)
    root.style.setProperty('--vue-pdfjs-main-color', mainTextColor.value)
    root.style.setProperty('--vue-pdfjs-button-hover-color', `${themeColor.value}33`)
    root.style.setProperty('--vue-pdfjs-toggled-btn-bg-color', `${themeColor.value}33`)
    root.style.setProperty('--vue-pdfjs-toggled-hover-btn-outline', `2px solid ${themeColor.value}`)
    
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
    showToolbar, showViewsManager, showViewsManagerToggle, showPrintButton, 
    showDownloadButton, showFindButton, showSecondaryToolbar, showEditorTools,
    showThumbnailsView, showOutlinesView, showAttachmentsView, showLayersView,
    showCurrentOutlineButton
]

watchedRefs.forEach(ref => {
    watch(ref, updateOptions)
})

const pdf = 'https://raw.githubusercontent.com/mozilla/pdf.js/v5.4.530/web/compressed.tracemonkey-pldi-09.pdf'

// Setup watchers for theme options
import { watch } from 'vue'

const watchedThemeRefs = [themeColor, viewsManagerBgColor, toolbarBgColor, mainTextColor]
watchedThemeRefs.forEach(ref => {
    watch(ref, applyCustomTheme)
})
</script>

<template>
    <div class="customization-demo">
        <div class="controls">
            <div class="control-section">
                <h3>Toolbar Options</h3>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" v-model="showToolbar"> 
                        Show Toolbar
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
                <h3>Views Manager Options</h3>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" v-model="showViewsManager"> 
                        Show Views Manager
                    </label>
                    <label>
                        <input type="checkbox" v-model="showViewsManagerToggle"> 
                        Toggle Button
                    </label>
                    <label>
                        <input type="checkbox" v-model="showThumbnailsView"> 
                        Thumbnails View
                    </label>
                    <label>
                        <input type="checkbox" v-model="showOutlinesView"> 
                        Outlines View
                    </label>
                    <label>
                        <input type="checkbox" v-model="showAttachmentsView"> 
                        Attachments View
                    </label>
                    <label>
                        <input type="checkbox" v-model="showLayersView"> 
                        Layers View
                    </label>
                    <label>
                        <input type="checkbox" v-model="showCurrentOutlineButton"> 
                        Current Outline Button
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
                        Views Manager BG:
                        <input type="color" v-model="viewsManagerBgColor">
                    </label>
                    <label>
                        Toolbar BG:
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
