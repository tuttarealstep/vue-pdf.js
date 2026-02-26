<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue'
import { VuePDFjs } from '../../packages/vue'
import '../../packages/vue/dist/style.css'
import enUS_FTL from '../../packages/vue/dist/l10n/en-US/viewer.ftl?raw'
import type { VuePDFjsProps } from '../../packages/vue/dist/src/components/VuePDFjs.vue';

// Function to safely stringify objects with circular references
function safeStringify(obj: any, indent: number = 2): string {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return '[Circular Reference]';
            }
            seen.add(value);
        }
        return value;
    }, indent);
}

const vuepdfjs = useTemplateRef<typeof VuePDFjs>('vuepdfjs')
const eventLog = ref<{ event: string, timestamp: string, data: any }[]>([])
const maxLogEntries = 10

const options = reactive<NonNullable<VuePDFjsProps['options']>>({
    locale: {
        code: 'en-US',
        ftl: enUS_FTL
    }
})

const sourceOptions = {
    onError: (error: Error) => {
        addToEventLog('sourceOptions.onError', error)
        console.error('Error loading PDF:', error)
    }
}

function addToEventLog(event: string, data: any = {}) {
    // Add to the beginning to show most recent first
    const timestamp = new Date().toLocaleTimeString()

    // Use safeStringify to handle circular references
    let stringifiedData;
    try {
        stringifiedData = safeStringify(data);
    } catch (error) {
        stringifiedData = `{"error": "Could not stringify data: ${error.message}"}`;
    }

    eventLog.value.unshift({ event, timestamp, data: stringifiedData })

    // Keep only the most recent entries
    if (eventLog.value.length > maxLogEntries) {
        eventLog.value = eventLog.value.slice(0, maxLogEntries)
    }
}

function clearEventLog() {
    eventLog.value = []
}

const onPdfAppLoaded = () => {
    addToEventLog('pdf-app:loaded')

    if (!vuepdfjs.value?.pdfApp) return

    // Listen to common events
    const events = [
        'pagesloaded',
        'pagechanging',
        'scalechanging',
        'rotationchanging',
        'updateviewarea',
        'documentloaded',
        'updatefindmatchescount',
        'updatefindcontrolstate',
        'sidebarviewchanged',
        'annotationeditorstatechanged'
    ]

    events.forEach(eventName => {
        vuepdfjs.value.pdfApp.eventBus.on(eventName, (eventData: any) => {
            addToEventLog(eventName, eventData)
        })
    })
}

// Demonstrate dispatching an event
function searchText() {
    if (!vuepdfjs.value?.pdfApp) return

    vuepdfjs.value.pdfApp.eventBus.dispatch('find', {
        query: ['javascript'],
        caseSensitive: false,
        entireWord: false,
        highlightAll: true
    })

    addToEventLog('dispatch', {
        action: 'find',
        params: {
            query: ['javascript'],
            caseSensitive: false,
            entireWord: false,
            highlightAll: true
        }
    })
}

function nextPage() {
    if (!vuepdfjs.value?.pdfApp) return

    if(vuepdfjs.value.pdfApp.page >= vuepdfjs.value.pdfApp.pagesCount) return
    vuepdfjs.value.pdfApp.page++
}

function previousPage() {
    if (!vuepdfjs.value?.pdfApp) return

    if (vuepdfjs.value.pdfApp.page <= 1) return
    vuepdfjs.value.pdfApp.page--
}

function zoomIn() {
    if (!vuepdfjs.value?.pdfApp) return
    vuepdfjs.value.pdfApp.zoomIn()
}

function zoomOut() {
    if (!vuepdfjs.value?.pdfApp) return
    vuepdfjs.value.pdfApp.zoomOut()
}

function rotateClockwise() {
    if (!vuepdfjs.value?.pdfApp) return
    vuepdfjs.value.pdfApp.eventBus.dispatch("rotatecw")
}

const pdf = 'https://raw.githubusercontent.com/mozilla/pdf.js/v5.4.624/web/compressed.tracemonkey-pldi-09.pdf'
</script>

<template>
    <div class="events-demo-container">
        <div class="controls">
            <h3>Interact with the PDF to see events</h3>
            <div class="button-group">
                <button @click="previousPage">Previous Page</button>
                <button @click="nextPage">Next Page</button>
                <button @click="zoomIn">Zoom In</button>
                <button @click="zoomOut">Zoom Out</button>
                <button @click="rotateClockwise">Rotate</button>
                <button @click="searchText">Search "javascript"</button>
                <button @click="clearEventLog">Clear Events Log</button>
            </div>
        </div>

        <div class="event-log">
            <h3>Event Log</h3>
            <div class="log-container">
                <div v-for="(entry, index) in eventLog" :key="index" class="log-entry">
                    <div class="log-header">
                        <span class="event-name">{{ entry.event }}</span>
                        <span class="event-time">{{ entry.timestamp }}</span>
                    </div>
                    <pre class="event-data" v-if="entry.data && entry.data !== '{}'">{{ entry.data }}</pre>
                </div>
                <div v-if="eventLog.length === 0" class="no-events">
                    No events captured yet. Interact with the PDF viewer.
                </div>
            </div>
        </div>

        <div class="pdf-viewer">
            <VuePDFjs ref="vuepdfjs" :source="pdf" :options="options" :source-options="sourceOptions"
                @pdf-app:loaded="onPdfAppLoaded" />
        </div>
    </div>
</template>

<style>
.events-demo-container {
    display: flex;
    flex-direction: column;
    height: 650px;
    width: 100%;
}

.controls {
    padding: 10px;
    background-color: var(--vp-c-bg-soft);
    border-bottom: 1px solid var(--vp-c-divider);
}

.controls h3 {
    margin-top: 0;
    margin-bottom: 8px;
    color: var(--vp-c-text-1);
}

.button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.button-group button {
    padding: 6px 12px;
    background-color: var(--vp-c-brand);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.button-group button:hover {
    background-color: var(--vp-c-brand-dark);
}

.event-log {
    height: 200px;
    overflow-y: auto;
    padding: 10px;
    background-color: var(--vp-c-bg-soft);
    border-bottom: 1px solid var(--vp-c-divider);
}

.event-log h3 {
    margin-top: 0;
    margin-bottom: 8px;
    color: var(--vp-c-text-1);
}

.log-container {
    font-family: monospace;
    font-size: 12px;
}

.log-entry {
    margin-bottom: 8px;
    padding: 8px;
    background-color: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    border-radius: 4px;
}

.log-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
}

.event-name {
    font-weight: bold;
    color: #d32f2f;
}

.event-time {
    color: #666;
}

.event-data {
    margin: 0;
    padding: 8px;
    background-color: var(--vp-c-bg-alt);
    border-radius: 4px;
    overflow: auto;
    max-height: 100px;
    color: var(--vp-c-text-1);
}

.no-events {
    color: var(--vp-c-text-2);
    font-style: italic;
    text-align: center;
    padding: 20px;
}

.pdf-viewer {
    flex: 1;
    min-height: 0;
}
</style>
