# Events

VuePDFjs emits events and provides access to the PDF.js event system through the `pdfApp.eventBus` object. This allows you to interact with the underlying PDF.js viewer and respond to various events during the lifecycle of the PDF document.

::: tip
Try our [interactive events demo](/events-demo) to see these events in action!
:::

## Component Events

These events are emitted directly by the `VuePDFjs` component:

### `pdf-app:loaded`

Emitted when the PDF.js viewer application has been loaded and initialized.

```vue
<template>
  <VuePDFjs
    ref="vuepdfjs"
    :source="document"
    :options="options"
    @pdf-app:loaded="onPdfAppLoaded"
  />
</template>

<script setup>
const onPdfAppLoaded = () => {
  console.log("PDF viewer is ready!");
  // Now it's safe to access the pdfApp object
}
</script>
```

## PDF.js EventBus Events

The PDF.js viewer exposes its internal event system through the `pdfApp.eventBus` object. You can listen for these events and dispatch custom events once the PDF.js viewer is loaded.

### Accessing the EventBus

```vue
<script setup>
const onPdfAppLoaded = () => {
  if (!vuepdfjs.value?.pdfApp) return;
  
  const { eventBus } = vuepdfjs.value.pdfApp;
  
  // Now you can use the eventBus
  eventBus.on("pagesloaded", handlePagesLoaded);
}
</script>
```

### Common EventBus Events

Here are some of the most commonly used events from the PDF.js event bus:

| Event Name | Description | Parameters |
|------------|-------------|------------|
| `pagesloaded` | Fired when all pages have been loaded | `{ source: PDFViewerApplication, pagesCount: number }` |
| `pagechanging` | Fired when the current page is changing | `{ source: PDFViewerApplication, pageNumber: number, pageLabel: string, previous: number }` |
| `pagerendered` | Fired when a page is rendered | `{ source: PDFPageView, pageNumber: number, cssTransform: boolean, timestamp: number, error: Error \| null }` |
| `documentloaded` | Fired when the PDF document is loaded | `{ source: PDFViewerApplication }` |
| `documenterror` | Fired when there's an error loading the document | `{ source: PDFViewerApplication, message: string, reason: any }` |
| `textlayerrendered` | Fired when the text layer is rendered | `{ source: PDFPageView, pageNumber: number }` |
| `outlineloaded` | Fired when the document outline is loaded | `{ source: PDFViewerApplication, outlineCount: number }` |
| `attachmentsloaded` | Fired when document attachments are loaded | `{ source: PDFViewerApplication, attachmentsCount: number }` |
| `layersloaded` | Fired when document layers are loaded | `{ source: PDFViewerApplication }` |
| `updateviewarea` | Fired when the visible part of pages changes | `{ source: PDFViewer, location: Object }` |
| `find` | Used to find text in the document | `{ source: PDFViewerApplication, type: string, query: string[], phraseSearch: boolean, caseSensitive: boolean, entireWord: boolean, highlightAll: boolean, findPrevious: boolean }` |
| `findbarclose` | Fired when the find bar is closed | `{ source: PDFViewerApplication }` |
| `print` | Triggered when the print action is invoked | `{ source: PDFViewerApplication }` |
| `download` | Triggered when the download action is invoked | `{ source: PDFViewerApplication }` |
| `zoomin` | Triggered when zooming in | `{ source: PDFViewerApplication }` |
| `zoomout` | Triggered when zooming out | `{ source: PDFViewerApplication }` |
| `zoomreset` | Triggered when zoom is reset to default | `{ source: PDFViewerApplication }` |
| `rotatecw` | Triggered when rotating clockwise | `{ source: PDFViewerApplication }` |
| `rotateccw` | Triggered when rotating counter-clockwise | `{ source: PDFViewerApplication }` |
| `switchscrollmode` | Triggered when scroll mode is changed | `{ source: PDFViewerApplication, mode: number }` |
| `switchspreadmode` | Triggered when spread mode is changed | `{ source: PDFViewerApplication, mode: number }` |

### Event Listening Example

```vue
<script setup>
const onPdfAppLoaded = () => {
  if (!vuepdfjs.value?.pdfApp) return;
  
  // Listen to the pagesloaded event
  vuepdfjs.value.pdfApp.eventBus.on("pagesloaded", (event) => {
    console.log(`PDF loaded with ${event.pagesCount} pages`);
  });
  
  // Listen to page changes
  vuepdfjs.value.pdfApp.eventBus.on("pagechanging", (event) => {
    console.log(`Navigating to page ${event.pageNumber}`);
  });
  
  // Listen to document errors
  vuepdfjs.value.pdfApp.eventBus.on("documenterror", (error) => {
    console.error("Error in PDF document:", error);
  });
}
</script>
```

### Dispatching Events

You can dispatch events to control the PDF.js viewer behavior:

```vue
<script setup>
const onPdfAppLoaded = () => {
  if (!vuepdfjs.value?.pdfApp) return;
  
  // Example: Search for text once the pages are loaded
  vuepdfjs.value.pdfApp.eventBus.on("pagesloaded", () => {
    // Search for text in the document
    vuepdfjs.value.pdfApp.eventBus.dispatch("find", {
      query: ["Vue.js", "PDF"],
      caseSensitive: false,
      entireWord: false,
      highlightAll: true,
      findPrevious: false
    });
  });
  
  // Example: Programmatically navigate to a specific page
  function goToPage(pageNumber) {
    vuepdfjs.value.pdfApp.eventBus.dispatch("pagechanging", {
      source: vuepdfjs.value.pdfApp,
      pageNumber
    });
  }
  
  // Example: Zoom control
  function zoomIn() {
    vuepdfjs.value.pdfApp.eventBus.dispatch("zoomin");
  }
}
</script>
```

## Advanced Event Usage

### Implementing Custom Search

```vue
<script setup>
const performSearch = (searchQuery) => {
  if (!vuepdfjs.value?.pdfApp) return;
  
  vuepdfjs.value.pdfApp.eventBus.dispatch("find", {
    query: [searchQuery],
    caseSensitive: false,
    entireWord: false,
    highlightAll: true,
    findPrevious: false
  });
};

// Listen to find results
const onPdfAppLoaded = () => {
  if (!vuepdfjs.value?.pdfApp) return;
  
  vuepdfjs.value.pdfApp.eventBus.on("updatefindmatchescount", (event) => {
    console.log(`Found ${event.matchesCount.current} matches out of ${event.matchesCount.total}`);
  });
};
</script>
```

### Annotations and Editing

```vue
<script setup>
const enableAnnotationEditing = () => {
  if (!vuepdfjs.value?.pdfApp) return;
  
  // Enable annotation edit mode (e.g., free text)
  vuepdfjs.value.pdfApp.eventBus.dispatch("switchannotationeditormode", {
    mode: "FreeText"
  });
};

// Listen to annotation changes
const onPdfAppLoaded = () => {
  if (!vuepdfjs.value?.pdfApp) return;
  
  vuepdfjs.value.pdfApp.eventBus.on("annotationeditorstatechanged", (event) => {
    console.log("Annotation editor state changed:", event.state);
  });
};
</script>
```
