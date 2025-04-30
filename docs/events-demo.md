<script setup lang="ts">
import { defineClientComponent } from 'vitepress'

const EventsDemo = defineClientComponent(() => {
  return import("./components/EventsDemo.vue")
})
</script>

# Events Demo

This interactive demo shows how to use and listen for events emitted by the VuePDFjs component. 
You can interact with the PDF viewer to see real-time events being captured and displayed in the event log.

## Features

- Real-time event logging
- Various interaction buttons to trigger different PDF events
- Display of event data and timestamps
- Clean and intuitive interface

Try clicking on different buttons, navigating through pages, or using the search functionality to see 
how the component emits various events.

<div class="demo-container">
  <EventsDemo />
</div>

## Event Handling

VuePDFjs emits various events that you can listen to in your application. The primary event is 
`pdf-app:loaded` which is emitted when the PDF viewer is fully initialized. From there, you can 
access the `pdfApp` property to add listeners to the PDF.js event bus.

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
  
  // Listen for PDF.js events
  vuepdfjs.value.pdfApp.eventBus.on('pagesloaded', (e) => {
    console.log('PDF pages loaded:', e.pagesCount)
  })
  
  vuepdfjs.value.pdfApp.eventBus.on('pagechanging', (e) => {
    console.log('Page changing to:', e.pageNumber)
  })
}
</script>
```

## Available Events

| Event | Description |
|-------|-------------|
| `pdf-app:loaded` | Emitted when the PDF application is fully loaded |
| `pagesloaded` | Emitted when all pages have been loaded |
| `pagechanging` | Emitted when the current page is changing |
| `documentloaded` | Emitted when the document has been loaded |
| `scalechanging` | Emitted when the zoom scale is changing |
| `rotationchanging` | Emitted when the rotation is changing |
| `updateviewarea` | Emitted when the view area is updated |
| `sidebarviewchanged` | Emitted when the sidebar view changes |
| `find` | Emitted during text search operations |
| `updatefindmatchescount` | Emitted when the find matches count is updated |
| `updatefindcontrolstate` | Emitted when the find control state updates |

<style>
.demo-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin: 20px 0;
}
</style>
