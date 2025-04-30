<script setup lang="ts">
import { defineClientComponent } from 'vitepress'

const APIReferenceDemo = defineClientComponent(() => {
  return import("./components/APIReferenceDemo.vue")
})
</script>

# API Reference Demo

This interactive demo showcases the various API methods available in the VuePDFjs component. You can experiment with different API calls to control the PDF viewer programmatically.

## Features

- View PDF metadata (title, author, creation date)
- Monitor current state (page, zoom level, rotation)
- Control page navigation programmatically
- Adjust zoom and rotation
- Perform other actions like printing and toggling sidebar
- Load new documents dynamically

The demo shows how you can integrate the VuePDFjs API into your application and control various aspects of the PDF viewer.

<div class="demo-container">
  <APIReferenceDemo />
</div>

## API Overview

VuePDFjs provides a rich API through the `pdfApp` property that becomes available after the component is loaded. 
You can access this API using a template ref:

```vue
<template>
  <VuePDFjs 
    ref="vuepdfjs" 
    :source="pdfUrl" 
    @pdf-app:loaded="onPdfAppLoaded" 
  />
</template>

<script setup>
import { useTemplateRef } from 'vue'
import { VuePDFjs } from 'vue-pdfjs'

const vuepdfjs = useTemplateRef('vuepdfjs')

function onPdfAppLoaded() {
  if (!vuepdfjs.value?.pdfApp) return
  
  // Now you can access the API
  console.log('Total pages:', vuepdfjs.value.pdfApp.pagesCount)
}

function goToNextPage() {
  if (!vuepdfjs.value?.pdfApp) return
  vuepdfjs.value.pdfApp.page++
}

function setZoom(zoomValue) {
  if (!vuepdfjs.value?.pdfApp) return
  vuepdfjs.value.pdfApp.zoomPresetValue = zoomValue
}
</script>
```

## Available API Methods and Properties

| Property/Method | Type | Description |
|----------------|------|-------------|
| `page` | Number | Get or set the current page number |
| `pagesCount` | Number | Total number of pages (readonly) |
| `zoomPresetValue` | String | Get or set the zoom preset (e.g., "page-width", "100%") |
| `scale` | Number | Get or set the current zoom scale |
| `pdfDocument` | Object | The PDF.js document object |
| `pdfSidebar` | Object | The PDF.js sidebar component |
| `zoomIn()` | Method | Zoom in by one level |
| `zoomOut()` | Method | Zoom out by one level |
| `eventBus` | Object | Event bus for dispatching and listening to events |

### Using the Event Bus

The `eventBus` provides a way to dispatch events and control the PDF viewer:

```javascript
// Dispatch a find event to search for text
vuepdfjs.value.pdfApp.eventBus.dispatch('find', {
  query: ['search term'],
  caseSensitive: false,
  entireWord: false,
  highlightAll: true
})

// Rotate the document clockwise
vuepdfjs.value.pdfApp.eventBus.dispatch("rotatecw")

// Print the document
vuepdfjs.value.pdfApp.eventBus.dispatch("print")
```

### Getting Document Metadata

You can access the document's metadata through the API:

```javascript
async function getDocumentInfo() {
  if (!vuepdfjs.value?.pdfApp?.pdfDocument) return
  
  const metadata = await vuepdfjs.value.pdfApp.pdfDocument.getMetadata()
  console.log('Title:', metadata.info.Title)
  console.log('Author:', metadata.info.Author)
  console.log('Creation Date:', metadata.info.CreationDate)
}
```
