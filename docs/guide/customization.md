# Customization

VuePDFjs offers extensive customization options, allowing you to tailor the PDF viewer to your application's needs. This guide details all the available options for the toolbar, sidebar, and CSS customization.

::: tip
Check out our [interactive customization demo](/customization-demo) to experiment with different customization options live!
:::

## Toolbar Customization

The toolbar contains controls for navigating, viewing, and interacting with the PDF document. You can customize which controls are visible through the `options.toolbar.options` property.

### Toolbar Options

All of these options accept a boolean value. Set to `false` to hide the element, or `true` to show it.

```vue
<script setup>
import { reactive } from "vue";
import { VuePDFjs } from "@tuttarealstep/vue-pdf.js";

const options = reactive({
  toolbar: {
    visible: true, // Set to false to hide the entire toolbar
    options: {
      // Primary toolbar options
      pageNumber: true,          // Page number input
      numPages: true,            // Total number of pages display
      scaleSelect: true,         // Zoom dropdown selector
      zoomInButton: true,        // Zoom in button
      zoomOutButton: true,       // Zoom out button
      previous: true,            // Previous page button
      next: true,                // Next page button
      printButton: true,         // Print button
      downloadButton: true,       // Download button
      
      // Editor buttons
      editorFreeTextButton: true,      // Free text editing tool
      editorHighlightButton: true,     // Highlight tool
      editorInkButton: true,           // Drawing/ink tool
      editorStampButton: true,         // Stamp tool
      
      // Secondary toolbar buttons
      secondaryToolbarToggleButton: true, // Toggle secondary toolbar
      
      // Find button in toolbar
      viewFindButton: true,      // Show/hide the find button
    }
  }
});
</script>
```

### Secondary Toolbar Options

The secondary toolbar contains additional tools for interacting with the PDF document. These options are also controlled through the `options.toolbar.options` property.

```vue
<script setup>
const options = reactive({
  toolbar: {
    options: {
      // Secondary toolbar elements
      presentationMode: true,     // Presentation mode button
      secondaryOpenFile: true,    // Open file button in secondary toolbar
      secondaryPrint: true,       // Print button in secondary toolbar
      secondaryDownload: true,    // Download button in secondary toolbar
      viewBookmark: true,         // Bookmark button
      firstPage: true,            // First page button
      lastPage: true,             // Last page button
      pageRotateCw: true,         // Rotate clockwise button
      pageRotateCcw: true,        // Rotate counter-clockwise button
      cursorSelectTool: true,     // Select tool
      cursorHandTool: true,       // Hand tool
      
      // Scroll options
      scrollPage: true,           // Page scroll mode
      scrollVertical: true,       // Vertical scrolling mode
      scrollHorizontal: true,     // Horizontal scrolling mode
      scrollWrapped: true,        // Wrapped scrolling mode
      
      // Spread options
      spreadNone: true,           // No spread
      spreadOdd: true,            // Odd spread
      spreadEven: true,           // Even spread
      
      // Additional options
      documentProperties: true,   // Document properties button
      imageAltTextSettings: true, // Alt text settings for images
    }
  }
});
</script>
```

## Sidebar Customization

The sidebar provides additional views like thumbnails, document outline, attachments, and layers. You can customize its appearance and behavior using the `options.sidebar` property.

### Sidebar Options

```vue
<script setup>
const options = reactive({
  sidebar: {
    visible: true, // Set to false to hide the sidebar entirely
    options: {
      // Sidebar toggle button
      sidebarToggleButton: true, // Show/hide the sidebar toggle button
      
      // View buttons
      viewThumbnail: true,    // Show thumbnails view button
      viewOutline: true,      // Show outline view button
      viewAttachments: true,  // Show attachments view button
      viewLayers: true,       // Show layers view button
      
      // Current outline item
      currentOutlineItem: true // Show current outline item button
    }
  }
});
</script>
```

## CSS Customization

VuePDFjs provides CSS variables and classes that allow you to customize the appearance of the PDF viewer. You can override these variables in your CSS to match your application's theme.

### Key CSS Variables

All CSS variables are prefixed with `--vue-pdfjs-` to prevent conflicts with your application's CSS.

```css
:root {
  /* Main colors */
  --vue-pdfjs-primary-color: #1976D2;          /* Primary accent color */
  --vue-pdfjs-toolbar-bg-color: #f9f9f9;       /* Toolbar background */
  --vue-pdfjs-body-bg-color: #eee;             /* Main background */
  
  /* Text colors */
  --vue-pdfjs-main-color: rgba(0, 0, 0, 0.87); /* Main text color */
  --vue-pdfjs-loadingBar-color: rgba(0, 0, 0, 0.5); /* Loading bar color */
  
  /* Button colors */
  --vue-pdfjs-button-hover-color: rgba(0, 0, 0, 0.2); /* Button hover state */
  --vue-pdfjs-toggled-btn-color: rgba(0, 0, 0, 0.2);  /* Toggled button state */
  --vue-pdfjs-toggled-btn-hover-color: rgba(0, 0, 0, 0.4); /* Toggled button hover */
  --vue-pdfjs-dropdown-btn-bg-color: white;    /* Dropdown button background */
  
  /* Sidebar colors */
  --vue-pdfjs-sidebar-narrow-bg-color: rgba(0, 0, 0, 0.33); /* Narrow sidebar background */
  --vue-pdfjs-thumbnail-selection-ring-color: #006622; /* Selected thumbnail indicator */
  
  /* Scroll bar */
  --vue-pdfjs-scrollbar-color: #b0b0b0;        /* Scrollbar thumb color */
  --vue-pdfjs-scrollbar-bg-color: #f1f1f1;     /* Scrollbar track color */
  
  /* Dialog colors */
  --vue-pdfjs-dialog-button-bg: #f9f9f9;       /* Dialog button background */
  --vue-pdfjs-dialog-button-border: #d3d3d3;   /* Dialog button border */
  --vue-pdfjs-dialog-button-hover-bg: #e6e6e6; /* Dialog button hover background */
  --vue-pdfjs-dialog-button-hover-border: #a9a9a9; /* Dialog button hover border */
  
  /* Input colors */
  --vue-pdfjs-field-border-color: #d1d1d1;     /* Input field border */
  --vue-pdfjs-field-bg-color: white;           /* Input field background */
  
  /* Error message */
  --vue-pdfjs-errorWrapper-bg-color: rgba(169, 68, 68, 0.79); /* Error message background */
}
```

### Applying Custom Styles

You can override these variables in your application's CSS:

```vue
<style>
.vue-pdfjs {
  /* Override default variables */
  --vue-pdfjs-primary-color: #42b883;         /* Vue.js green */
  --vue-pdfjs-sidebar-bg-color: #34495e;      /* Dark sidebar */
  --vue-pdfjs-toolbar-bg-color: #f8f9fa;      /* Light toolbar */
  --vue-pdfjs-body-bg-color: #ffffff;         /* White background */
  --vue-pdfjs-main-color: #2c3e50;            /* Dark text */
  --vue-pdfjs-scrollbar-color: #42b883;       /* Vue.js green scrollbar */
  --vue-pdfjs-button-hover-color: rgba(66, 184, 131, 0.2); /* Light green hover */
}

/* Add custom styles to specific elements */
.vue-pdfjs #toolbarContainer {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.vue-pdfjs #sidebarContainer {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

/* Style the page */
.vue-pdfjs .page {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}
</style>
```

### Container Queries

VuePDFjs uses container queries to adapt the UI layout based on the container size, rather than the viewport size. This is controlled through the `useContainerQuery` prop (defaults to `true`).

```vue
<template>
  <VuePDFjs 
    :source="pdf" 
    :options="options" 
    :use-container-query="true"
  />
</template>
```

The container query breakpoints are:

- **840px**: Changes sidebar background color
- **750px**: Hides medium view elements (`.hiddenMediumView`)
- **690px**: Hides small view elements (`.hiddenSmallView`) 
- **560px**: Hides scale selector

### Custom Loading Indicator

VuePDFjs provides a slot for customizing the loading indicator:

```vue
<template>
  <VuePDFjs :source="pdf" :options="options">
    <template #loading>
      <div class="custom-loader">
        <div class="spinner"></div>
        <p>Loading your PDF...</p>
      </div>
    </template>
  </VuePDFjs>
</template>

<style>
.custom-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.8);
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #42b883;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
```

## Full Customization Example

Here's a complete example showing toolbar and sidebar customization along with custom CSS:

```vue
<script setup>
import { reactive } from "vue";
import { VuePDFjs, usePDF } from "@tuttarealstep/vue-pdf.js";
import "@tuttarealstep/vue-pdf.js/dist/style.css";
import enUS_FTL from "@tuttarealstep/vue-pdf.js/l10n/en-US/viewer.ftl?raw";

const { pdf } = usePDF("your-pdf-url.pdf");

const options = reactive({
  locale: {
    code: "en-US",
    ftl: enUS_FTL,
  },
  toolbar: {
    visible: true,
    options: {
      // Show only essential controls
      pageNumber: true,
      numPages: true,
      scaleSelect: true,
      zoomInButton: true,
      zoomOutButton: true,
      previous: true,
      next: true,
      
      // Hide less frequently used controls
      printButton: false,
      downloadButton: false,
      editorFreeTextButton: false,
      editorHighlightButton: false,
      editorInkButton: false,
      editorStampButton: false,
      
      // Secondary toolbar
      secondaryToolbarToggleButton: true,
      presentationMode: true,
      secondaryOpenFile: false,
      secondaryPrint: false,
      secondaryDownload: false,
      documentProperties: true,
    }
  },
  sidebar: {
    visible: true,
    options: {
      sidebarToggleButton: true,
      viewThumbnail: true,
      viewOutline: true,
      viewAttachments: false,
      viewLayers: false,
    }
  }
});
</script>

<template>
  <div class="pdf-container">
    <VuePDFjs 
      :source="pdf" 
      :options="options" 
      :use-container-query="true" 
    />
  </div>
</template>

<style>
.pdf-container {
  height: 100%;
  width: 100%;
}

.vue-pdfjs {
  --vue-pdfjs-primary-color: #42b883;
  --vue-pdfjs-toolbar-bg-color: #ffffff;
  --vue-pdfjs-body-bg-color: #f5f5f5;
  --vue-pdfjs-sidebar-narrow-bg-color: #ffffff;
  --vue-pdfjs-main-color: #333333;
  --vue-pdfjs-button-hover-color: rgba(66, 184, 131, 0.1);
  --vue-pdfjs-toggled-btn-color: rgba(66, 184, 131, 0.2);
  --vue-pdfjs-toggled-btn-hover-color: rgba(66, 184, 131, 0.3);
  --vue-pdfjs-field-border-color: #e0e0e0;
  --vue-pdfjs-thumbnail-selection-ring-color: #42b883;
}
</style>
```
