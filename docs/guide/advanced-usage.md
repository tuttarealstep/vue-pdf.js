# Advanced Usage Guides

This section contains recipes and guides for advanced usage of the VuePDFjs component, focusing on common integration patterns and programmatic control of the viewer.

## Programmatic Control

### Navigation and Page Control

Control page navigation from your application UI:

```vue
<template>
  <div class="pdf-controls">
    <button @click="goToFirstPage">First Page</button>
    <button @click="previousPage">Previous</button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage">Next</button>
    <button @click="goToLastPage">Last Page</button>
    <input type="number" v-model="pageInput" min="1" :max="totalPages">
    <button @click="goToPage(pageInput)">Go</button>
  </div>
  
  <VuePDFjs
    ref="pdfViewer"
    :source="pdfSource"
    :options="options"
    @pdf-app:loaded="onPdfAppLoaded"
  />
</template>

<script setup>
import { ref, reactive, useTemplateRef, watch } from 'vue';
import { VuePDFjs, usePDF } from "@tuttarealstep/vue-pdf.js";
import "@tuttarealstep/vue-pdf.js/dist/style.css";

const pdfSource = 'your-document.pdf';
const pdfViewer = useTemplateRef<typeof VuePDFjs>('pdfViewer');
const currentPage = ref(1);
const totalPages = ref(0);
const pageInput = ref(1);

const options = reactive({
  // Your viewer options
});

const onPdfAppLoaded = () => {
  if (!pdfViewer.value?.pdfApp) return;
  
  // Get total pages
  totalPages.value = pdfViewer.value.pdfPages;
  
  // Listen for page changes
  pdfViewer.value.pdfApp.eventBus.on('pagechanging', (evt) => {
    currentPage.value = evt.pageNumber;
    pageInput.value = evt.pageNumber;
  });
};

// Watch for changes to the page input
watch(pageInput, (newVal) => {
  // Ensure value is within range
  if (newVal < 1) pageInput.value = 1;
  if (newVal > totalPages.value) pageInput.value = totalPages.value;
});

function goToPage(page) {
  if (!pdfViewer.value?.pdfApp) return;
  page = parseInt(page);
  if (isNaN(page)) return;
  
  pdfViewer.value.pdfApp.page = page;
}

function nextPage() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.page++;
}

function previousPage() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.page--;
}

function goToFirstPage() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.page = 1;
}

function goToLastPage() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.page = pdfViewer.value.pdfPages;
}
</script>
```

### Zoom Control

Implement custom zoom controls:

```vue
<template>
  <div class="zoom-controls">
    <button @click="zoomOut">-</button>
    <select v-model="currentZoom" @change="setZoom">
      <option value="auto">Automatic</option>
      <option value="page-fit">Page Fit</option>
      <option value="page-width">Page Width</option>
      <option value="0.5">50%</option>
      <option value="0.75">75%</option>
      <option value="1">100%</option>
      <option value="1.25">125%</option>
      <option value="1.5">150%</option>
      <option value="2">200%</option>
    </select>
    <button @click="zoomIn">+</button>
  </div>
  
  <VuePDFjs ref="pdfViewer" :source="pdfSource" :options="options" @pdf-app:loaded="onPdfAppLoaded" />
</template>

<script setup>
import { ref, reactive, useTemplateRef } from 'vue';
import { VuePDFjs } from "@tuttarealstep/vue-pdf.js";

const pdfSource = 'your-document.pdf';
const pdfViewer = useTemplateRef<typeof VuePDFjs>('pdfViewer');
const currentZoom = ref('auto');

const options = reactive({
  // Your viewer options
  toolbar: {
    options: {
      // Hide built-in zoom controls if you want
      zoomInButton: false,
      zoomOutButton: false,
      scaleSelect: false
    }
  }
});

const onPdfAppLoaded = () => {
  if (!pdfViewer.value?.pdfApp) return;
  
  // Listen for scale changes
  pdfViewer.value.pdfApp.eventBus.on('scalechanging', (evt) => {
    updateCurrentZoomValue(evt.scale);
  });
};

function updateCurrentZoomValue(scale) {
  if (typeof scale === 'string') {
    currentZoom.value = scale;
  } else {
    currentZoom.value = scale.toString();
  }
}

function setZoom() {
  if (!pdfViewer.value?.pdfApp) return;
  
  pdfViewer.value.pdfApp.pdfViewer.currentScaleValue = currentZoom.value;
}

function zoomIn() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.zoomIn();
}

function zoomOut() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.zoomOut();
}
</script>
```

### Advanced Search Integration

Create a custom search interface:

```vue
<template>
  <div class="search-controls">
    <input 
      v-model="searchQuery" 
      placeholder="Search in document..." 
      @keyup.enter="performSearch"
    >
    <div class="search-options">
      <label>
        <input type="checkbox" v-model="caseSensitive"> Case Sensitive
      </label>
      <label>
        <input type="checkbox" v-model="entireWord"> Entire Word
      </label>
      <label>
        <input type="checkbox" v-model="highlightAll"> Highlight All
      </label>
    </div>
    <div v-if="searchResultsCount">
      <span>{{ currentMatch }} of {{ totalMatches }}</span>
      <button @click="findPrevious" :disabled="!searchResultsCount">Previous</button>
      <button @click="findNext" :disabled="!searchResultsCount">Next</button>
    </div>
    <button @click="performSearch">Search</button>
    <button @click="clearSearch">Clear</button>
  </div>
  
  <VuePDFjs ref="pdfViewer" :source="pdfSource" :options="options" @pdf-app:loaded="onPdfAppLoaded" />
</template>

<script setup>
import { ref, reactive, useTemplateRef } from 'vue';
import { VuePDFjs } from "@tuttarealstep/vue-pdf.js";

const pdfSource = 'your-document.pdf';
const pdfViewer = useTemplateRef<typeof VuePDFjs>('pdfViewer');
const searchQuery = ref('');
const caseSensitive = ref(false);
const entireWord = ref(false);
const highlightAll = ref(true);
const searchResultsCount = ref(0);
const currentMatch = ref(0);
const totalMatches = ref(0);

const options = reactive({
  // Hide default find button if you want
  toolbar: {
    options: {
      viewFindButton: false
    }
  }
});

const onPdfAppLoaded = () => {
  if (!pdfViewer.value?.pdfApp) return;
  
  // Listen for update find matches count event
  pdfViewer.value.pdfApp.eventBus.on('updatefindmatchescount', (evt) => {
    currentMatch.value = evt.matchesCount?.current || 0;
    totalMatches.value = evt.matchesCount?.total || 0;
    searchResultsCount.value = totalMatches.value;
  });
  
  // Listen for find controller state change
  pdfViewer.value.pdfApp.eventBus.on('findbarclose', () => {
    searchResultsCount.value = 0;
  });
};

function performSearch() {
  if (!pdfViewer.value?.pdfApp || !searchQuery.value) return;
  
  pdfViewer.value.pdfApp.eventBus.dispatch('find', {
    query: [searchQuery.value],
    caseSensitive: caseSensitive.value,
    entireWord: entireWord.value,
    highlightAll: highlightAll.value,
    findPrevious: false
  });
}

function findNext() {
  if (!pdfViewer.value?.pdfApp) return;
  
  pdfViewer.value.pdfApp.eventBus.dispatch('findagain', {
    query: [searchQuery.value],
    caseSensitive: caseSensitive.value,
    entireWord: entireWord.value,
    highlightAll: highlightAll.value,
    findPrevious: false
  });
}

function findPrevious() {
  if (!pdfViewer.value?.pdfApp) return;
  
  pdfViewer.value.pdfApp.eventBus.dispatch('findagain', {
    query: [searchQuery.value],
    caseSensitive: caseSensitive.value,
    entireWord: entireWord.value,
    highlightAll: highlightAll.value,
    findPrevious: true
  });
}

function clearSearch() {
  if (!pdfViewer.value?.pdfApp) return;
  searchQuery.value = '';
  
  // Close the find bar and clear highlights
  pdfViewer.value.pdfApp.eventBus.dispatch('findbarclose');
}
</script>
```

## Annotation Interactions

### Annotation Creation and Editing

Enable and control annotation creation:

```vue
<template>
  <div class="annotation-tools">
    <button @click="enableFreeTextAnnotation">Text</button>
    <button @click="enableHighlightAnnotation">Highlight</button>
    <button @click="enableInkAnnotation">Draw</button>
    <button @click="enableStampAnnotation">Stamp</button>
    <button @click="disableAnnotationEditing">Select</button>
  </div>
  
  <VuePDFjs ref="pdfViewer" :source="pdfSource" :options="options" @pdf-app:loaded="onPdfAppLoaded" />
</template>

<script setup>
import { reactive, useTemplateRef } from 'vue';
import { VuePDFjs } from "@tuttarealstep/vue-pdf.js";

const pdfSource = 'your-document.pdf';
const pdfViewer = useTemplateRef<typeof VuePDFjs>('pdfViewer');

const options = reactive({
  // Show annotation tools in toolbar
  toolbar: {
    options: {
      editorFreeTextButton: true,
      editorHighlightButton: true,
      editorInkButton: true,
      editorStampButton: true
    }
  }
});

const onPdfAppLoaded = () => {
  if (!pdfViewer.value?.pdfApp) return;
  
  // Listen for annotation editor state changes
  pdfViewer.value.pdfApp.eventBus.on('annotationeditorstatechanged', (evt) => {
    console.log('Annotation editor state changed:', evt.state);
  });
  
  // Listen for annotation creation
  pdfViewer.value.pdfApp.eventBus.on('annotationeditorparamschanged', (evt) => {
    console.log('Annotation parameters changed:', evt.details);
  });
};

function enableFreeTextAnnotation() {
  if (!pdfViewer.value?.pdfApp) return;
  
  pdfViewer.value.pdfApp.eventBus.dispatch('switchannotationeditormode', {
    mode: 'FreeText'
  });
}

function enableHighlightAnnotation() {
  if (!pdfViewer.value?.pdfApp) return;
  
  pdfViewer.value.pdfApp.eventBus.dispatch('switchannotationeditormode', {
    mode: 'Highlight'
  });
}

function enableInkAnnotation() {
  if (!pdfViewer.value?.pdfApp) return;
  
  pdfViewer.value.pdfApp.eventBus.dispatch('switchannotationeditormode', {
    mode: 'Ink'
  });
}

function enableStampAnnotation() {
  if (!pdfViewer.value?.pdfApp) return;
  
  pdfViewer.value.pdfApp.eventBus.dispatch('switchannotationeditormode', {
    mode: 'Stamp'
  });
}

function disableAnnotationEditing() {
  if (!pdfViewer.value?.pdfApp) return;
  
  pdfViewer.value.pdfApp.eventBus.dispatch('switchannotationeditormode', {
    mode: 'None'
  });
}
</script>
```

### Annotation Customization

Configure annotation styles:

```vue
<template>
  <div class="annotation-settings">
    <h3>Text Annotation</h3>
    <div>
      <label>Font Size:
        <select v-model="textFontSize" @change="updateFreeTextParams">
          <option value="8px">8px</option>
          <option value="10px">10px</option>
          <option value="12px">12px</option>
          <option value="16px">16px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
        </select>
      </label>
      <label>Color:
        <input type="color" v-model="textColor" @change="updateFreeTextParams">
      </label>
    </div>
    
    <h3>Ink Annotation</h3>
    <div>
      <label>Thickness:
        <input type="range" min="1" max="20" v-model.number="inkThickness" @change="updateInkParams">
      </label>
      <label>Color:
        <input type="color" v-model="inkColor" @change="updateInkParams">
      </label>
      <label>Opacity:
        <input type="range" min="0.1" max="1" step="0.1" v-model.number="inkOpacity" @change="updateInkParams">
      </label>
    </div>
    
    <h3>Highlight Annotation</h3>
    <div>
      <label>Color:
        <input type="color" v-model="highlightColor" @change="updateHighlightParams">
      </label>
      <label>Thickness:
        <input type="range" min="1" max="10" v-model.number="highlightThickness" @change="updateHighlightParams">
      </label>
    </div>
  </div>
  
  <VuePDFjs ref="pdfViewer" :source="pdfSource" :options="options" @pdf-app:loaded="onPdfAppLoaded" />
</template>

<script setup>
import { ref, reactive, useTemplateRef } from 'vue';
import { VuePDFjs } from "@tuttarealstep/vue-pdf.js";

const pdfSource = 'your-document.pdf';
const pdfViewer = useTemplateRef<typeof VuePDFjs>('pdfViewer');

// Annotation settings
const textFontSize = ref('16px');
const textColor = ref('#FF0000');
const inkThickness = ref(5);
const inkColor = ref('#0000FF');
const inkOpacity = ref(0.8);
const highlightColor = ref('#FFFF00');
const highlightThickness = ref(5);

const options = reactive({
  // Your viewer options
});

const onPdfAppLoaded = () => {
  // Initial setup of annotation parameters
  setTimeout(() => {
    updateFreeTextParams();
    updateInkParams();
    updateHighlightParams();
  }, 1000);
};

function updateFreeTextParams() {
  if (!pdfViewer.value?.pdfApp) return;
  
  const editorParams = {
    fontSize: textFontSize.value,
    color: textColor.value
  };
  
  pdfViewer.value.pdfApp.eventBus.dispatch('updatefreetext', editorParams);
}

function updateInkParams() {
  if (!pdfViewer.value?.pdfApp) return;
  
  const editorParams = {
    thickness: inkThickness.value,
    color: inkColor.value,
    opacity: inkOpacity.value
  };
  
  pdfViewer.value.pdfApp.eventBus.dispatch('updateink', editorParams);
}

function updateHighlightParams() {
  if (!pdfViewer.value?.pdfApp) return;
  
  const editorParams = {
    color: highlightColor.value,
    thickness: highlightThickness.value
  };
  
  pdfViewer.value.pdfApp.eventBus.dispatch('updatehighlight', editorParams);
}
</script>
```

## Integration Patterns

### PDF Viewer with Thumbnails Grid

Create a custom thumbnail grid outside of the sidebar:

```vue
<template>
  <div class="pdf-container">
    <div class="thumbnails-grid">
      <div 
        v-for="i in totalPages" 
        :key="i"
        class="thumbnail" 
        :class="{ active: currentPage === i }"
        @click="goToPage(i)"
      >
        <div class="page-number">{{ i }}</div>
        <div ref="thumbnailContainers" :id="`thumbnail-container-${i}`" class="thumbnail-container"></div>
      </div>
    </div>
    
    <div class="pdf-viewer">
      <VuePDFjs 
        ref="pdfViewer" 
        :source="pdfSource" 
        :options="options" 
        @pdf-app:loaded="onPdfAppLoaded" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, useTemplateRef, onMounted } from 'vue';
import { VuePDFjs } from "@tuttarealstep/vue-pdf.js";

const pdfSource = 'your-document.pdf';
const pdfViewer = useTemplateRef<typeof VuePDFjs>('pdfViewer');
const thumbnailContainers = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);

const options = reactive({
  // Hide sidebar if using custom thumbnails
  sidebar: {
    visible: false
  }
});

const onPdfAppLoaded = async () => {
  if (!pdfViewer.value?.pdfApp) return;
  
  // Get total pages
  totalPages.value = pdfViewer.value.pdfPages;
  
  // Listen for page changes
  pdfViewer.value.pdfApp.eventBus.on('pagechanging', (evt) => {
    currentPage.value = evt.pageNumber;
  });
  
  // Wait for document to be loaded
  pdfViewer.value.pdfApp.eventBus.on('pagesloaded', async () => {
    // Generate thumbnails
    await generateThumbnails();
  });
};

async function generateThumbnails() {
  if (!pdfViewer.value?.pdfApp?.pdfDocument) return;
  
  const pdfDocument = pdfViewer.value.pdfApp.pdfDocument;
  const scale = 0.25; // Thumbnail scale
  
  for (let pageNum = 1; pageNum <= totalPages.value; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    
    const container = document.getElementById(`thumbnail-container-${pageNum}`);
    if (!container) continue;
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    await page.render({
      canvasContext: context,
      viewport
    }).promise;
    
    container.appendChild(canvas);
  }
}

function goToPage(pageNumber) {
  if (!pdfViewer.value?.pdfApp) return;
  
  pdfViewer.value.pdfApp.page = pageNumber;
}
</script>

<style>
.pdf-container {
  display: flex;
  height: 100%;
  width: 100%;
}

.thumbnails-grid {
  width: 200px;
  overflow-y: auto;
  padding: 10px;
  background: #f1f1f1;
}

.thumbnail {
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
  border: 2px solid transparent;
}

.thumbnail.active {
  border-color: #4285f4;
}

.thumbnail-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.thumbnail-container canvas {
  width: 100%;
  height: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.page-number {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
}

.pdf-viewer {
  flex: 1;
  height: 100%;
}
</style>
```

### PDF Viewer with Document Outline

Create a custom outline view:

```vue
<template>
  <div class="pdf-container">
    <div v-if="hasOutline" class="outline-panel">
      <h3>Document Outline</h3>
      <div class="outline-tree">
        <div v-for="(item, index) in outline" :key="index" class="outline-item">
          <OutlineItem 
            :item="item" 
            :indent="0" 
            @click="navigateToDestination"
          />
        </div>
      </div>
    </div>
    
    <div class="pdf-viewer">
      <VuePDFjs 
        ref="pdfViewer" 
        :source="pdfSource" 
        :options="options" 
        @pdf-app:loaded="onPdfAppLoaded" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, useTemplateRef } from 'vue';
import { VuePDFjs } from "@tuttarealstep/vue-pdf.js";

const pdfSource = 'your-document.pdf';
const pdfViewer = useTemplateRef<typeof VuePDFjs>('pdfViewer');
const outline = ref([]);
const hasOutline = ref(false);

const options = reactive({
  // Hide sidebar if using custom outline
  sidebar: {
    visible: false
  }
});

const onPdfAppLoaded = async () => {
  if (!pdfViewer.value?.pdfApp) return;
  
  // Wait for document to be loaded
  pdfViewer.value.pdfApp.eventBus.on('documentloaded', async () => {
    // Load the document outline
    await loadOutline();
  });
};

async function loadOutline() {
  if (!pdfViewer.value?.pdfDocument) return;
  
  const pdfOutline = await pdfViewer.value.pdfDocument.getOutline();
  
  if (pdfOutline && pdfOutline.length > 0) {
    outline.value = pdfOutline;
    hasOutline.value = true;
  }
}

function navigateToDestination(dest) {
  if (!pdfViewer.value?.pdfApp) return;
  
  // Navigate to the destination using pdf.js
  if (typeof dest === 'string') {
    // Named destination
    pdfViewer.value.pdfApp.pdfLinkService.goToDestination(dest);
  } else {
    // Explicit destination array
    pdfViewer.value.pdfApp.pdfLinkService.navigateTo(dest);
  }
}
</script>

<script>
// Define the OutlineItem component
const OutlineItem = {
  props: {
    item: Object,
    indent: Number
  },
  emits: ['click'],
  setup(props, { emit }) {
    const hasChildren = props.item.items && props.item.items.length > 0;
    const isExpanded = ref(true);
    
    function toggleExpansion() {
      isExpanded.value = !isExpanded.value;
    }
    
    function handleClick() {
      emit('click', props.item.dest);
    }
    
    return { hasChildren, isExpanded, toggleExpansion, handleClick };
  },
  template: `
    <div class="outline-item-content" :style="{ 'padding-left': indent * 15 + 'px' }">
      <span v-if="hasChildren" class="expander" @click="toggleExpansion">
        {{ isExpanded ? '▼' : '▶' }}
      </span>
      <span class="title" @click="handleClick">{{ item.title }}</span>
    </div>
    <div v-if="hasChildren && isExpanded" class="outline-children">
      <div v-for="(child, index) in item.items" :key="index" class="outline-item">
        <outline-item 
          :item="child" 
          :indent="indent + 1" 
          @click="$emit('click', $event)"
        />
      </div>
    </div>
  `
};
</script>

<style>
.pdf-container {
  display: flex;
  height: 100%;
  width: 100%;
}

.outline-panel {
  width: 250px;
  overflow-y: auto;
  padding: 10px;
  background: #f9f9f9;
  border-right: 1px solid #ddd;
}

.outline-panel h3 {
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.outline-tree {
  font-size: 14px;
}

.outline-item {
  margin-bottom: 5px;
}

.outline-item-content {
  display: flex;
  align-items: center;
  padding: 3px 0;
}

.outline-item .title {
  cursor: pointer;
}

.outline-item .title:hover {
  color: #4285f4;
  text-decoration: underline;
}

.outline-item .expander {
  display: inline-block;
  width: 15px;
  cursor: pointer;
  user-select: none;
}

.pdf-viewer {
  flex: 1;
  height: 100%;
}
</style>
```

### PDF Forms Integration

Working with PDF forms:

```vue
<template>
  <div class="pdf-container">
    <div class="form-actions">
      <button @click="highlightFormFields">Highlight Form Fields</button>
      <button @click="getFormValues">Get Form Values</button>
      <button @click="fillFormFields">Fill Form Fields</button>
      <button @click="resetFormFields">Reset Form</button>
    </div>
    
    <div v-if="formValues.length > 0" class="form-values">
      <h3>Form Values</h3>
      <div v-for="(field, index) in formValues" :key="index" class="form-field">
        <strong>{{ field.name }}:</strong> {{ field.value }}
      </div>
    </div>
    
    <div class="pdf-viewer">
      <VuePDFjs 
        ref="pdfViewer" 
        :source="pdfSource" 
        :options="options" 
        @pdf-app:loaded="onPdfAppLoaded" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, useTemplateRef } from 'vue';
import { VuePDFjs } from "@tuttarealstep/vue-pdf.js";

const pdfSource = 'your-form.pdf'; // A PDF with form fields
const pdfViewer = useTemplateRef<typeof VuePDFjs>('pdfViewer');
const formFields = ref([]);
const formValues = ref([]);

const options = reactive({
  // Your viewer options
});

const onPdfAppLoaded = async () => {
  if (!pdfViewer.value?.pdfApp) return;
  
  // Wait for the document to be loaded
  pdfViewer.value.pdfApp.eventBus.on('documentloaded', async () => {
    await getDocumentFormFields();
  });
};

async function getDocumentFormFields() {
  if (!pdfViewer.value?.pdfDocument) return;
  
  try {
    // This requires PDF.js with form support
    const formFieldsPromises = [];
    
    for (let i = 1; i <= pdfViewer.value.pdfPages; i++) {
      const page = await pdfViewer.value.pdfDocument.getPage(i);
      const annotations = await page.getAnnotations();
      
      const fields = annotations
        .filter(a => a.subtype === 'Widget')
        .map(a => ({
          id: a.id,
          name: a.fieldName,
          type: a.fieldType,
          value: a.fieldValue,
          pageIndex: i - 1,
          rect: a.rect
        }));
      
      formFieldsPromises.push(...fields);
    }
    
    formFields.value = formFieldsPromises;
  } catch (error) {
    console.error('Error getting form fields:', error);
  }
}

function highlightFormFields() {
  if (!pdfViewer.value?.pdfApp || formFields.value.length === 0) return;
  
  // Create a function to highlight form fields
  // This is a simplified example - actual implementation would depend on
  // how you want to visualize the fields
  formFields.value.forEach(field => {
    const page = pdfViewer.value.pdfApp.pdfViewer.getPageView(field.pageIndex);
    
    if (!page || !page.div) return;
    
    // Create a highlight element
    const highlight = document.createElement('div');
    highlight.className = 'form-field-highlight';
    
    // Convert PDF coordinates to viewport coordinates
    const viewport = page.viewport;
    const [x1, y1, x2, y2] = viewport.convertToViewportRectangle(field.rect);
    
    // Position the highlight
    highlight.style.left = `${Math.min(x1, x2)}px`;
    highlight.style.top = `${Math.min(y1, y2)}px`;
    highlight.style.width = `${Math.abs(x2 - x1)}px`;
    highlight.style.height = `${Math.abs(y2 - y1)}px`;
    
    // Add to page div
    page.div.appendChild(highlight);
  });
}

function getFormValues() {
  if (formFields.value.length === 0) return;
  
  formValues.value = formFields.value.map(field => ({
    name: field.name,
    value: field.value || '(empty)'
  }));
}

async function fillFormFields() {
  if (!pdfViewer.value?.pdfDocument || formFields.value.length === 0) return;
  
  // Sample data to fill form fields
  const sampleData = {
    'Name': 'John Doe',
    'Email': 'john.doe@example.com',
    'Phone': '555-1234',
    'Address': '123 Main St, Anytown, USA'
  };
  
  // Get form fields and populate them
  for (const field of formFields.value) {
    if (sampleData[field.name]) {
      // This is a simplified example - in a real application,
      // you would need to use PDF.js form filling capabilities
      field.value = sampleData[field.name];
    }
  }
  
  // Update the display
  getFormValues();
  
  // Note: Actually updating the visible form fields in the PDF
  // would require more complex PDF.js API usage or possibly
  // server-side processing
  alert('Form data prepared (values shown in the side panel). Note: Actual form field updating in the PDF requires additional PDF.js integration.');
}

function resetFormFields() {
  if (formFields.value.length === 0) return;
  
  // Reset all form values
  formFields.value.forEach(field => {
    field.value = '';
  });
  
  // Update the display
  getFormValues();
}
</script>

<style>
.pdf-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.form-actions {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.form-actions button {
  padding: 8px 12px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-values {
  padding: 10px;
  background: #f9f9f9;
  border-bottom: 1px solid #ddd;
  max-height: 200px;
  overflow-y: auto;
}

.form-field {
  margin-bottom: 5px;
  font-size: 14px;
}

.pdf-viewer {
  flex: 1;
  position: relative;
}

.form-field-highlight {
  position: absolute;
  background-color: rgba(255, 255, 0, 0.3);
  border: 2px solid rgba(255, 165, 0, 0.8);
  pointer-events: none;
  z-index: 100;
}
</style>
```

## Advanced Working Examples

### Custom PDF Tools Panel

Create a comprehensive tools panel for the PDF viewer:

```vue
<template>
  <div class="pdf-workspace">
    <div class="tools-panel">
      <div class="tools-section">
        <h3>Navigation</h3>
        <div class="button-group">
          <button @click="goToFirstPage" title="First Page">⏮</button>
          <button @click="previousPage" title="Previous Page">◀</button>
          <div class="page-indicator">
            <input type="number" v-model="pageInput" min="1" :max="totalPages" @change="goToPage(pageInput)">
            <span> / {{ totalPages }}</span>
          </div>
          <button @click="nextPage" title="Next Page">▶</button>
          <button @click="goToLastPage" title="Last Page">⏭</button>
        </div>
      </div>
      
      <div class="tools-section">
        <h3>Zoom</h3>
        <div class="button-group">
          <button @click="zoomOut" title="Zoom Out">−</button>
          <select v-model="currentZoom" @change="setZoom">
            <option value="auto">Auto</option>
            <option value="page-fit">Page Fit</option>
            <option value="page-width">Page Width</option>
            <option value="0.5">50%</option>
            <option value="0.75">75%</option>
            <option value="1">100%</option>
            <option value="1.25">125%</option>
            <option value="1.5">150%</option>
            <option value="2">200%</option>
            <option value="3">300%</option>
            <option value="4">400%</option>
          </select>
          <button @click="zoomIn" title="Zoom In">+</button>
        </div>
      </div>
      
      <div class="tools-section">
        <h3>View</h3>
        <div class="button-group">
          <button @click="rotateCounterClockwise" title="Rotate Counter-Clockwise">↺</button>
          <button @click="rotateClockwise" title="Rotate Clockwise">↻</button>
          <button @click="presentationMode" title="Presentation Mode">📺</button>
        </div>
        <div class="view-options">
          <div>
            <label>Scroll:</label>
            <select v-model="scrollMode" @change="setScrollMode">
              <option :value="0">Vertical</option>
              <option :value="1">Horizontal</option>
              <option :value="2">Wrapped</option>
            </select>
          </div>
          <div>
            <label>Spread:</label>
            <select v-model="spreadMode" @change="setSpreadMode">
              <option :value="0">None</option>
              <option :value="1">Odd</option>
              <option :value="2">Even</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="tools-section">
        <h3>Search</h3>
        <div class="search-controls">
          <input 
            v-model="searchQuery" 
            placeholder="Search in document..." 
            @keyup.enter="performSearch"
          >
          <div class="search-options">
            <label>
              <input type="checkbox" v-model="caseSensitive"> Case Sensitive
            </label>
            <label>
              <input type="checkbox" v-model="entireWord"> Entire Word
            </label>
          </div>
          <div class="search-actions">
            <button @click="findPrevious" :disabled="!hasSearchResults">▲</button>
            <button @click="findNext" :disabled="!hasSearchResults">▼</button>
            <button @click="performSearch">Search</button>
            <button @click="clearSearch">Clear</button>
          </div>
          <div v-if="hasSearchResults" class="search-status">
            {{ currentMatch }} of {{ totalMatches }}
          </div>
        </div>
      </div>
      
      <div class="tools-section">
        <h3>Document</h3>
        <div class="document-actions">
          <button @click="downloadPDF" title="Download">📥</button>
          <button @click="printPDF" title="Print">🖨️</button>
          <button @click="showDocumentProperties" title="Properties">📄</button>
        </div>
      </div>
    </div>
    
    <div class="pdf-container">
      <VuePDFjs 
        ref="pdfViewer" 
        :source="pdfSource" 
        :options="options" 
        @pdf-app:loaded="onPdfAppLoaded" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, useTemplateRef, watch } from 'vue';
import { VuePDFjs } from "@tuttarealstep/vue-pdf.js";

// PDF source
const pdfSource = 'your-pdf-document.pdf';
const pdfViewer = useTemplateRef<typeof VuePDFjs>('pdfViewer');

// Navigation state
const currentPage = ref(1);
const totalPages = ref(0);
const pageInput = ref(1);

// Zoom state
const currentZoom = ref('auto');

// View state
const scrollMode = ref(0); // 0: vertical, 1: horizontal, 2: wrapped
const spreadMode = ref(0); // 0: none, 1: odd, 2: even

// Search state
const searchQuery = ref('');
const caseSensitive = ref(false);
const entireWord = ref(false);
const currentMatch = ref(0);
const totalMatches = ref(0);
const hasSearchResults = ref(false);

// Configure viewer options - hide controls that we're providing ourselves
const options = reactive({
  toolbar: {
    visible: false // Hide the default toolbar
  },
  sidebar: {
    visible: false // Hide the default sidebar
  }
});

// Initialize the viewer
const onPdfAppLoaded = () => {
  if (!pdfViewer.value?.pdfApp) return;
  
  const { pdfApp } = pdfViewer.value;
  
  // Get total pages
  totalPages.value = pdfViewer.value.pdfPages;
  
  // Set up event listeners
  pdfApp.eventBus.on('pagechanging', (evt) => {
    currentPage.value = evt.pageNumber;
    pageInput.value = evt.pageNumber;
  });
  
  pdfApp.eventBus.on('scalechanging', (evt) => {
    if (typeof evt.scale === 'string') {
      currentZoom.value = evt.scale;
    } else {
      currentZoom.value = evt.scale.toString();
    }
  });
  
  pdfApp.eventBus.on('scrollmodechanged', (evt) => {
    scrollMode.value = evt.mode;
  });
  
  pdfApp.eventBus.on('spreadmodechanged', (evt) => {
    spreadMode.value = evt.mode;
  });
  
  pdfApp.eventBus.on('updatefindmatchescount', (evt) => {
    currentMatch.value = evt.matchesCount?.current || 0;
    totalMatches.value = evt.matchesCount?.total || 0;
    hasSearchResults.value = totalMatches.value > 0;
  });
  
  pdfApp.eventBus.on('findbarclose', () => {
    hasSearchResults.value = false;
  });
};

// Watch for changes to the page input
watch(pageInput, (newVal) => {
  // Ensure value is within range
  if (newVal < 1) pageInput.value = 1;
  if (newVal > totalPages.value) pageInput.value = totalPages.value;
});

// Navigation methods
function goToPage(pageNum) {
  if (!pdfViewer.value?.pdfApp) return;
  pageNum = parseInt(pageNum);
  if (isNaN(pageNum)) return;
  pdfViewer.value.pdfApp.page = pageNum;
}

function nextPage() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.page++;
}

function previousPage() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.page--;
}

function goToFirstPage() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.page = 1;
}

function goToLastPage() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.page = totalPages.value;
}

// Zoom methods
function setZoom() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.pdfViewer.currentScaleValue = currentZoom.value;
}

function zoomIn() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.zoomIn();
}

function zoomOut() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.zoomOut();
}

// View methods
function setScrollMode() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.pdfViewer.scrollMode = scrollMode.value;
}

function setSpreadMode() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.pdfViewer.spreadMode = spreadMode.value;
}

function rotateClockwise() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.rotatePages(90);
}

function rotateCounterClockwise() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.rotatePages(-90);
}

function presentationMode() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.requestPresentationMode();
}

// Search methods
function performSearch() {
  if (!pdfViewer.value?.pdfApp || !searchQuery.value) return;
  
  pdfViewer.value.pdfApp.eventBus.dispatch('find', {
    query: [searchQuery.value],
    caseSensitive: caseSensitive.value,
    entireWord: entireWord.value,
    highlightAll: true,
    findPrevious: false
  });
}

function findNext() {
  if (!pdfViewer.value?.pdfApp) return;
  
  pdfViewer.value.pdfApp.eventBus.dispatch('findagain', {
    findPrevious: false
  });
}

function findPrevious() {
  if (!pdfViewer.value?.pdfApp) return;
  
  pdfViewer.value.pdfApp.eventBus.dispatch('findagain', {
    findPrevious: true
  });
}

function clearSearch() {
  if (!pdfViewer.value?.pdfApp) return;
  searchQuery.value = '';
  pdfViewer.value.pdfApp.eventBus.dispatch('findbarclose');
}

// Document methods
function downloadPDF() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.download();
}

function printPDF() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.print();
}

function showDocumentProperties() {
  if (!pdfViewer.value?.pdfApp) return;
  pdfViewer.value.pdfApp.pdfDocumentProperties.open();
}
</script>

<style>
.pdf-workspace {
  display: flex;
  height: 100%;
  width: 100%;
}

.tools-panel {
  width: 250px;
  padding: 15px;
  background: #f5f5f5;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}

.tools-section {
  margin-bottom: 20px;
}

.tools-section h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
}

.button-group {
  display: flex;
  gap: 5px;
  align-items: center;
}

.button-group button {
  padding: 5px 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.button-group button:hover {
  background: #f0f0f0;
}

.page-indicator {
  display: flex;
  align-items: center;
  margin: 0 5px;
}

.page-indicator input {
  width: 40px;
  text-align: center;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.view-options {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.view-options select {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.search-controls input[type="text"] {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-options {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 12px;
}

.search-actions {
  display: flex;
  gap: 5px;
}

.search-actions button {
  padding: 5px 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.search-status {
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
}

.document-actions {
  display: flex;
  gap: 10px;
}

.document-actions button {
  padding: 8px 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.pdf-container {
  flex: 1;
  height: 100%;
}
</style>
```
