# API Reference

This document provides a comprehensive reference for the VuePDFjs component's public API, including accessible properties, methods, and the structure of the pdfApp object.

::: tip
Try our [interactive API reference demo](/api-reference-demo) to see the API in action and experiment with different methods!
:::

## Component Properties

The VuePDFjs component exposes the following properties when using `ref` to access the component instance:

```vue
<template>
  <VuePDFjs ref="vuepdfjs" :source="source" :options="options" />
</template>

<script setup>
import { useTemplateRef } from "vue";
const vuepdfjs = useTemplateRef<typeof VuePDFjs>("vuepdfjs");

onMounted(() => {
  // Now you can access the component's properties
  console.log(vuepdfjs.value?.pdfApp);
  console.log(vuepdfjs.value?.pdfDocument);
  console.log(vuepdfjs.value?.pdfPages);
});
</script>
```

### `pdfApp`

- Type: `PDFViewerApplication`
- Description: The main PDF.js viewer application instance. This gives you full access to the underlying PDF.js viewer.

### `pdfDocument`

- Type: `PDFDocumentProxy`
- Description: The loaded PDF document proxy object. This provides access to document-specific API methods.

### `pdfPages`

- Type: `number`
- Description: The number of pages in the loaded PDF document.

### `pdfInfo`

- Type: `PDFInfo`
- Description: Contains metadata and information about the PDF document.

### `pdfLoadingTask`

- Type: `PDFDocumentLoadingTask`
- Description: The task responsible for loading the PDF document.

## PDFApp Object Structure

The `pdfApp` object (type: `PDFViewerApplication`) is the main entry point to interact with the PDF.js viewer. Here's an overview of its key properties and methods:

### Key Properties

#### `pdfApp.eventBus`

The event bus is the communication channel for the PDF.js viewer. It allows you to listen for events and dispatch commands.

```javascript
// Listen for events
vuepdfjs.value.pdfApp.eventBus.on("pagesloaded", (event) => {
  console.log(`PDF has ${event.pagesCount} pages`);
});

// Dispatch commands
vuepdfjs.value.pdfApp.eventBus.dispatch("find", {
  query: ["search text"],
  highlightAll: true
});
```

#### `pdfApp.pdfDocument`

The currently loaded PDF document. This object provides access to document-specific methods:

```javascript
// Get the total number of pages
const pageCount = vuepdfjs.value.pdfApp.pdfDocument.numPages;

// Get document metadata
vuepdfjs.value.pdfApp.pdfDocument.getMetadata().then(metadata => {
  console.log(metadata.info);
  console.log(metadata.metadata);
});
```

#### `pdfApp.pdfViewer`

The viewer component that renders the PDF pages:

```javascript
// Get the current page number
const currentPageNumber = vuepdfjs.value.pdfApp.pdfViewer.currentPageNumber;

// Get the current scale (zoom level)
const currentScale = vuepdfjs.value.pdfApp.pdfViewer.currentScale;

// Get the page view for a specific page
const pageView = vuepdfjs.value.pdfApp.pdfViewer.getPageView(0); // 0-based index
```

#### `pdfApp.pdfSidebar`

Controls the sidebar component and its views (thumbnails, outline, attachments, layers):

```javascript
// Check if the sidebar is visible
const isVisible = vuepdfjs.value.pdfApp.pdfSidebar.isVisible;

// Get the active sidebar view
const activeView = vuepdfjs.value.pdfApp.pdfSidebar.active;

// Open a specific sidebar view
vuepdfjs.value.pdfApp.pdfSidebar.switchView(1); // 1 = SidebarView.OUTLINE
```

#### `pdfApp.pdfThumbnailViewer`

Manages the thumbnail view in the sidebar:

```javascript
// Get all thumbnail elements
const thumbnails = vuepdfjs.value.pdfApp.pdfThumbnailViewer.thumbnails;

// Scroll a specific thumbnail into view
vuepdfjs.value.pdfApp.pdfThumbnailViewer.scrollThumbnailIntoView(5); // 1-based index
```

#### `pdfApp.pdfOutlineViewer`

Manages the document outline (bookmarks) view:

```javascript
// Check if the document has an outline
const hasOutline = vuepdfjs.value.pdfApp.pdfOutlineViewer.outline !== null;
```

### Key Methods

#### `pdfApp.open()`

Opens a PDF document:

```javascript
// Open a new PDF document
vuepdfjs.value.pdfApp.open({
  url: "https://example.com/document.pdf"
}).catch(error => {
  console.error("Error opening document:", error);
});
```

#### `pdfApp.setDocument()`

Sets a new PDF document:

```javascript
import { getDocument } from "pdf.js";

// Load a document and set it
getDocument("https://example.com/document.pdf").promise
  .then(pdfDocument => {
    vuepdfjs.value.pdfApp.setDocument(pdfDocument);
  })
  .catch(error => {
    console.error("Error loading document:", error);
  });
```

#### `pdfApp.close()`

Closes the current document:

```javascript
// Close the current document
vuepdfjs.value.pdfApp.close();
```

#### `pdfApp.print()`

Triggers the print functionality:

```javascript
// Print the current document
vuepdfjs.value.pdfApp.print();
```

#### `pdfApp.download()`

Triggers the download functionality:

```javascript
// Download the current document
vuepdfjs.value.pdfApp.download();
```

#### `pdfApp.findController`

Controls text search within the document:

```javascript
// Execute a text search
vuepdfjs.value.pdfApp.findController.executeCommand("find", {
  query: "Vue.js",
  caseSensitive: false,
  highlightAll: true,
  findPrevious: false
});
```

## PDFDocument Object

The PDFDocument object (accessible via `pdfDocument`) provides methods for interacting with the document itself:

```javascript
// Get document metadata
vuepdfjs.value.pdfDocument.getMetadata().then(metadata => {
  console.log("Title:", metadata.info.Title);
  console.log("Author:", metadata.info.Author);
  console.log("Subject:", metadata.info.Subject);
  console.log("Keywords:", metadata.info.Keywords);
  console.log("Creation Date:", metadata.info.CreationDate);
  console.log("Modification Date:", metadata.info.ModDate);
  console.log("Creator:", metadata.info.Creator);
  console.log("Producer:", metadata.info.Producer);
  console.log("Version:", metadata.info.PDFFormatVersion);
  console.log("Page Count:", vuepdfjs.value.pdfDocument.numPages);
});

// Get document outline (bookmarks)
vuepdfjs.value.pdfDocument.getOutline().then(outline => {
  if (outline) {
    console.log("Document has an outline with", outline.length, "items");
  } else {
    console.log("Document does not have an outline");
  }
});

// Get document attachments
vuepdfjs.value.pdfDocument.getAttachments().then(attachments => {
  if (attachments) {
    console.log("Document has attachments:", attachments);
  } else {
    console.log("Document does not have attachments");
  }
});

// Get JavaScript actions
vuepdfjs.value.pdfDocument.getJSActions().then(jsActions => {
  if (jsActions) {
    console.log("Document has JavaScript actions");
  } else {
    console.log("Document does not have JavaScript actions");
  }
});

// Get a specific page
vuepdfjs.value.pdfDocument.getPage(1).then(page => {
  console.log("Page 1 size:", page.view);
});
```

## API Usage Examples

### Programmatically Navigate to a Page

```javascript
function goToPage(pageNumber) {
  if (!vuepdfjs.value?.pdfApp) return;
  
  // Ensure page number is within range
  const maxPages = vuepdfjs.value.pdfPages;
  pageNumber = Math.max(1, Math.min(pageNumber, maxPages));
  
  // Set the page number
  vuepdfjs.value.pdfApp.page = pageNumber;
}
```

### Change Zoom Level

```javascript
function setZoom(scale) {
  if (!vuepdfjs.value?.pdfApp) return;
  
  vuepdfjs.value.pdfApp.pdfViewer.currentScale = scale;
}

function zoomIn() {
  if (!vuepdfjs.value?.pdfApp) return;
  
  vuepdfjs.value.pdfApp.zoomIn();
}

function zoomOut() {
  if (!vuepdfjs.value?.pdfApp) return;
  
  vuepdfjs.value.pdfApp.zoomOut();
}
```

### Search Text

```javascript
function searchText(query, caseSensitive = false, highlightAll = true) {
  if (!vuepdfjs.value?.pdfApp) return;
  
  // Show the find bar
  vuepdfjs.value.pdfApp.findBar.open();
  
  // Set search parameters
  vuepdfjs.value.pdfApp.eventBus.dispatch("find", {
    query: [query],
    caseSensitive: caseSensitive,
    highlightAll: highlightAll,
    findPrevious: false
  });
}
```

### Toggle Sidebar

```javascript
function toggleSidebar() {
  if (!vuepdfjs.value?.pdfApp) return;
  
  if (vuepdfjs.value.pdfApp.pdfSidebar.isOpen) {
    vuepdfjs.value.pdfApp.pdfSidebar.close();
  } else {
    vuepdfjs.value.pdfApp.pdfSidebar.open();
  }
}

function openThumbnailView() {
  if (!vuepdfjs.value?.pdfApp) return;
  
  vuepdfjs.value.pdfApp.pdfSidebar.switchView(0); // SidebarView.THUMBS
}

function openOutlineView() {
  if (!vuepdfjs.value?.pdfApp) return;
  
  vuepdfjs.value.pdfApp.pdfSidebar.switchView(1); // SidebarView.OUTLINE
}
```

### Rotate Pages

```javascript
function rotateClockwise() {
  if (!vuepdfjs.value?.pdfApp) return;
  
  vuepdfjs.value.pdfApp.eventBus.dispatch("rotatecw");
}

function rotateCounterclockwise() {
  if (!vuepdfjs.value?.pdfApp) return;
  
  vuepdfjs.value.pdfApp.eventBus.dispatch("rotateccw");
}
```

### Change Scroll Mode

```javascript
function setVerticalScrollMode() {
  if (!vuepdfjs.value?.pdfApp) return;
  
  vuepdfjs.value.pdfApp.pdfViewer.scrollMode = 0; // ScrollMode.VERTICAL
}

function setHorizontalScrollMode() {
  if (!vuepdfjs.value?.pdfApp) return;
  
  vuepdfjs.value.pdfApp.pdfViewer.scrollMode = 1; // ScrollMode.HORIZONTAL
}

function setWrappedScrollMode() {
  if (!vuepdfjs.value?.pdfApp) return;
  
  vuepdfjs.value.pdfApp.pdfViewer.scrollMode = 2; // ScrollMode.WRAPPED
}
```

### Change Spread Mode

```javascript
function setNoSpread() {
  if (!vuepdfjs.value?.pdfApp) return;
  
  vuepdfjs.value.pdfApp.pdfViewer.spreadMode = 0; // SpreadMode.NONE
}

function setOddSpread() {
  if (!vuepdfjs.value?.pdfApp) return;
  
  vuepdfjs.value.pdfApp.pdfViewer.spreadMode = 1; // SpreadMode.ODD
}

function setEvenSpread() {
  if (!vuepdfjs.value?.pdfApp) return;
  
  vuepdfjs.value.pdfApp.pdfViewer.spreadMode = 2; // SpreadMode.EVEN
}
```
