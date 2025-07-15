<script setup lang="ts">
import { reactive, ref, useTemplateRef, onMounted } from 'vue'
import { VuePDFjs } from '../../packages/vue'
import '../../packages/vue/dist/style.css'
import enUS_FTL from '../../packages/vue/dist/l10n/en-US/viewer.ftl?raw'
import type { VuePDFjsProps } from '../../packages/vue/dist/src/components/VuePDFjs.vue';

const vuepdfjs = useTemplateRef<typeof VuePDFjs>('vuepdfjs')

// State for API demonstration
const pdfInfo = ref({
  currentPage: 1,
  totalPages: 0,
  zoom: 'auto',
  rotation: 0,
  title: '',
  author: '',
  creationDate: ''
})

const options = reactive<NonNullable<VuePDFjsProps['options']>>({
    locale: {
        code: 'en-US',
        ftl: enUS_FTL
    }
})

// Gestione caricamento e errori
const loadError = ref('')
const isLoading = ref(false)

function handlePdfError(error: any) {
    console.error('PDF error:', error)
    loadError.value = error instanceof Error ? error.message : 'Failed to load PDF. Check browser console for details.'
    isLoading.value = false
}

const onPdfAppLoaded = () => {
    if (!vuepdfjs.value?.pdfApp) return
    
    // Pulizia eventuali listener precedenti
    try {
        vuepdfjs.value.pdfApp.eventBus._off('pagesloaded')
        vuepdfjs.value.pdfApp.eventBus._off('pagechanging')
        vuepdfjs.value.pdfApp.eventBus._off('scalechanging')
        vuepdfjs.value.pdfApp.eventBus._off('rotationchanging')
        vuepdfjs.value.pdfApp.eventBus._off('documenterror')
        vuepdfjs.value.pdfApp.eventBus._off('documentloaded')
    } catch (e) {
        console.warn('Eventi non ancora inizializzati')
    }
    
    // Get total pages when document is loaded
    vuepdfjs.value.pdfApp.eventBus.on('pagesloaded', (e: { pagesCount: number }) => {
        pdfInfo.value.totalPages = e.pagesCount
        isLoading.value = false
    })
    
    // Update current page when it changes
    vuepdfjs.value.pdfApp.eventBus.on('pagechanging', (e: { pageNumber: number }) => {
        pdfInfo.value.currentPage = e.pageNumber
    })
    
    // Update scale when it changes
    vuepdfjs.value.pdfApp.eventBus.on('scalechanging', (e: { scale: number, presetValue: string }) => {
        pdfInfo.value.zoom = e.presetValue || `${Math.round(e.scale * 100)}%`
    })
    
    // Update rotation when it changes
    vuepdfjs.value.pdfApp.eventBus.on('rotationchanging', (e: { pagesRotation: number }) => {
        pdfInfo.value.rotation = e.pagesRotation
    })
    
    // Listen for document loading errors
    vuepdfjs.value.pdfApp.eventBus.on('documenterror', (error: any) => {
        console.error('PDF loading error:', error)
        loadError.value = 'Failed to load PDF. It may be invalid or inaccessible.'
        isLoading.value = false
    })
    
    // Get document metadata when loaded
    vuepdfjs.value.pdfApp.eventBus.on('documentloaded', async () => {
        if (!vuepdfjs.value?.pdfApp?.pdfDocument) return
        loadError.value = ''
        
        try {
            const metadata = await vuepdfjs.value.pdfApp.pdfDocument.getMetadata()
            const info = metadata.info || {}
            
            pdfInfo.value.title = info.Title || 'Unknown'
            pdfInfo.value.author = info.Author || 'Unknown'
            
            if (info.CreationDate) {
                try {
                    // PDF dates are in the format: D:YYYYMMDDHHmmSSOHH'mm'
                    const pdfDate = info.CreationDate
                    const dateString = pdfDate.substring(2, 16) // Extract YYYYMMDDHHMMSS
                    const year = dateString.substring(0, 4)
                    const month = dateString.substring(4, 6)
                    const day = dateString.substring(6, 8)
                    pdfInfo.value.creationDate = `${year}-${month}-${day}`
                } catch (e) {
                    pdfInfo.value.creationDate = 'Unknown'
                }
            } else {
                pdfInfo.value.creationDate = 'Unknown'
            }
        } catch (error) {
            console.error('Error getting document metadata:', error)
        } finally {
            isLoading.value = false
        }
    })
    
    // Tentativo iniziale di caricamento del documento
    try {
        if (source.value) {
            isLoading.value = true
        }
    } catch (error) {
        console.error('Error in initial document load:', error)
    }
}

// API interaction functions
function goToPage(pageNum: number) {
    if (!vuepdfjs.value?.pdfApp) return
    
    // Ensure page is within bounds
    const targetPage = Math.max(1, Math.min(pageNum, pdfInfo.value.totalPages))
    vuepdfjs.value.pdfApp.page = targetPage
}

function setZoom(zoomLevel: string) {
    if (!vuepdfjs.value?.pdfApp) return
    
    try {
        if (zoomLevel.endsWith('%')) {
            // Convert percentage to scale (e.g., "100%" to 1)
            const percentage = parseInt(zoomLevel, 10)
            if (!isNaN(percentage)) {
                vuepdfjs.value.pdfApp.pdfViewer.currentScale = percentage / 100
            }
        } else {
            // For preset values like "page-width" or "page-fit"
            vuepdfjs.value.pdfApp.pdfViewer.currentScaleValue = zoomLevel
        }
    } catch (error) {
        console.error('Error setting zoom:', error)
    }
}

function rotate() {
    if (!vuepdfjs.value?.pdfApp) return
    vuepdfjs.value.pdfApp.eventBus.dispatch("rotatecw")
}

function printDocument() {
    if (!vuepdfjs.value?.pdfApp) return
    vuepdfjs.value.pdfApp.eventBus.dispatch("print")
}

function toggleSidebar() {
    if (!vuepdfjs.value?.pdfApp) return
    vuepdfjs.value.pdfApp.pdfSidebar.toggle()
}

// New document input
const newDocUrl = ref('')
const pdf = 'https://raw.githubusercontent.com/mozilla/pdf.js/vv5.3.93/web/compressed.tracemonkey-pldi-09.pdf'
const source = ref(pdf)

function resetPdfInfo() {
    pdfInfo.value = {
        currentPage: 1,
        totalPages: 0,
        zoom: 'auto',
        rotation: 0,
        title: '',
        author: '',
        creationDate: ''
    }
}

function loadNewDocument() {
    if (newDocUrl.value && newDocUrl.value.trim()) {
        try {
            isLoading.value = true
            loadError.value = ''
            resetPdfInfo()
            
            // Forzare un nuovo caricamento anche se l'URL è lo stesso
            const currentUrl = newDocUrl.value.trim()
            // Aggiungere un timestamp per evitare la cache se è la stessa URL
            if (currentUrl === source.value) {
                source.value = ''
                setTimeout(() => {
                    source.value = currentUrl
                }, 10)
            } else {
                source.value = currentUrl
            }
        } catch (e) {
            loadError.value = e instanceof Error ? e.message : 'Failed to load document'
            console.error('Error loading document:', e)
            isLoading.value = false
        }
    }
}
</script>

<template>
    <div class="api-reference-demo">
        <div class="controls-panel">
            <div class="control-section metadata">
                <h3>PDF Metadata</h3>
                <div class="metadata-item">
                    <div class="metadata-label">Title:</div>
                    <div class="metadata-value">{{ pdfInfo.title }}</div>
                </div>
                <div class="metadata-item">
                    <div class="metadata-label">Author:</div>
                    <div class="metadata-value">{{ pdfInfo.author }}</div>
                </div>
                <div class="metadata-item">
                    <div class="metadata-label">Created:</div>
                    <div class="metadata-value">{{ pdfInfo.creationDate }}</div>
                </div>
            </div>
            
            <div class="control-section current-state">
                <h3>Current State</h3>
                <div class="state-item">
                    <div class="state-label">Page:</div>
                    <div class="state-value">{{ pdfInfo.currentPage }} / {{ pdfInfo.totalPages }}</div>
                </div>
                <div class="state-item">
                    <div class="state-label">Zoom:</div>
                    <div class="state-value">{{ pdfInfo.zoom }}</div>
                </div>
                <div class="state-item">
                    <div class="state-label">Rotation:</div>
                    <div class="state-value">{{ pdfInfo.rotation }}°</div>
                </div>
            </div>
            
            <div class="control-section api-actions">
                <h3>API Actions</h3>
                
                <div class="action-group page-navigation">
                    <div class="action-label">Page Navigation:</div>
                    <div class="action-controls">
                        <button @click="goToPage(1)" class="action-btn">First</button>
                        <button @click="goToPage(pdfInfo.currentPage - 1)" class="action-btn">Previous</button>
                        <input 
                            type="number" 
                            v-model="pdfInfo.currentPage" 
                            min="1" 
                            :max="pdfInfo.totalPages"
                            @change="goToPage(pdfInfo.currentPage)"
                            class="page-input"
                        />
                        <button @click="goToPage(pdfInfo.currentPage + 1)" class="action-btn">Next</button>
                        <button @click="goToPage(pdfInfo.totalPages)" class="action-btn">Last</button>
                    </div>
                </div>
                
                <div class="action-group zoom-control">
                    <div class="action-label">Zoom:</div>
                    <div class="action-controls">
                        <button @click="setZoom('page-width')" class="action-btn">Page Width</button>
                        <button @click="setZoom('page-fit')" class="action-btn">Fit Page</button>
                        <button @click="setZoom('50%')" class="action-btn">50%</button>
                        <button @click="setZoom('100%')" class="action-btn">100%</button>
                        <button @click="setZoom('200%')" class="action-btn">200%</button>
                    </div>
                </div>
                
                <div class="action-group other-actions">
                    <div class="action-label">Other Actions:</div>
                    <div class="action-controls">
                        <button @click="rotate()" class="action-btn">Rotate</button>
                        <button @click="toggleSidebar()" class="action-btn">Toggle Sidebar</button>
                        <button @click="printDocument()" class="action-btn">Print</button>
                    </div>
                </div>
            </div>
            
            <div class="control-section load-document">
                <h3>Load Document</h3>
                <div class="document-input">
                    <input 
                        type="text" 
                        v-model="newDocUrl" 
                        placeholder="Enter PDF URL..." 
                        class="url-input"
                    />
                    <button @click="loadNewDocument()" class="load-btn" :disabled="isLoading">
                        {{ isLoading ? 'Loading...' : 'Load' }}
                    </button>
                </div>
                <div v-if="loadError" class="error-message">
                    {{ loadError }}
                </div>
            </div>
        </div>
        
        <div class="pdf-viewer-container">
            <div v-if="isLoading" class="loading-overlay">
                Loading PDF...
            </div>
            <div class="pdf-viewer">
                <VuePDFjs 
                    ref="vuepdfjs" 
                    :source="source" 
                    :options="options" 
                    :sourceOptions="{
                        onError: handlePdfError
                    }"
                    @pdf-app:loaded="onPdfAppLoaded"
                />
            </div>
        </div>
    </div>
</template>

<style>
.api-reference-demo {
    display: flex;
    flex-direction: column;
    height: 1100px;
    width: 100%;
    overflow: auto;
}

.controls-panel {
    padding: 15px;
    background-color: var(--vp-c-bg-soft);
    border-bottom: 1px solid var(--vp-c-divider);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.control-section {
    border: 1px solid var(--vp-c-divider);
    background-color: var(--vp-c-bg);
    border-radius: 4px;
    padding: 12px;
}

.control-section h3 {
    margin-top: 0;
    margin-bottom: 12px;
    font-size: 16px;
    color: var(--vp-c-text-1);
    border-bottom: 1px solid var(--vp-c-divider);
    padding-bottom: 8px;
}

/* Metadata styling */
.metadata-item, .state-item {
    display: flex;
    margin-bottom: 8px;
    color: var(--vp-c-text-1);
}

.metadata-label, .state-label {
    width: 80px;
    font-weight: bold;
    color: var(--vp-c-text-2);
}

.metadata-value, .state-value {
    flex: 1;
}

/* API Actions styling */
.action-group {
    margin-bottom: 15px;
}

.action-label {
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--vp-c-text-2);
}

.action-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.action-btn {
    background-color: var(--vp-c-brand);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 12px;
}

.action-btn:hover {
    background-color: var(--vp-c-brand-dark);
}

.action-btn:disabled {
    background-color: var(--vp-c-gray);
    cursor: not-allowed;
    opacity: 0.7;
}

.page-input {
    width: 50px;
    text-align: center;
    border: 1px solid var(--vp-c-divider);
    border-radius: 4px;
    padding: 5px;
    background-color: var(--vp-c-bg);
    color: var(--vp-c-text-1);
}

/* Load Document styling */
.document-input {
    display: flex;
    gap: 8px;
}

.url-input {
    flex: 1;
    border: 1px solid var(--vp-c-divider);
    border-radius: 4px;
    padding: 8px;
    background-color: var(--vp-c-bg);
    color: var(--vp-c-text-1);
}

.load-btn {
    background-color: var(--vp-c-brand);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 15px;
    cursor: pointer;
}

.load-btn:hover {
    background-color: var(--vp-c-brand-dark);
}

/* PDF viewer container */
.pdf-viewer-container {
    position: relative;
    flex: 1;
    min-height: 500px; /* Aumentato per garantire spazio sufficiente */
    height: 1100px; /* Altezza fissa per evitare problemi di dimensionamento */
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.pdf-viewer {
    flex: 1;
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    background-color: var(--vp-c-bg-soft);
}

/* Make the PDF viewer and its container take full height */
.pdf-viewer :deep(.vue-pdfjs) {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

/* Assicura che tutti gli elementi interni abbiano altezza corretta */
.pdf-viewer :deep(.vue-pdfjs-viewer) {
    height: 100%;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.pdf-viewer :deep(.pdfViewer) {
    height: 100%;
}

/* Error message styling */
.error-message {
    color: #e53935;
    margin-top: 10px;
    padding: 8px;
    background-color: rgba(229, 57, 53, 0.1);
    border-radius: 4px;
    font-size: 14px;
}

/* Loading overlay */
.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    z-index: 10;
}
</style>
