<script setup lang="ts">
import { defineClientComponent } from 'vitepress'

const CustomizationDemo = defineClientComponent(() => {
  return import("./components/CustomizationDemo.vue")
})
</script>

# Customization Demo

This interactive demo showcases the various customization options available in the VuePDFjs component. 
You can experiment with different configurations to see how they affect the PDF viewer's appearance 
and functionality.

## Features

- Toggle UI elements like toolbar, sidebar, buttons
- Customize colors for various parts of the interface
- Adjust container width and container query settings
- Live preview of all changes

Try changing the settings to see how the PDF viewer adapts to your preferences.

<div class="demo-container">
  <CustomizationDemo />
</div>

## Customization Options

VuePDFjs provides extensive customization capabilities through its options prop. You can control the visibility of UI elements
and define which buttons and controls are displayed.

### Basic Configuration

```vue
<template>
  <VuePDFjs 
    :source="pdfUrl" 
    :options="options"
    :use-container-query="true" 
  />
</template>

<script setup>
import { reactive } from 'vue'
import { VuePDFjs } from 'vue-pdfjs'

const options = reactive({
  toolbar: {
    visible: true,
    options: {
      printButton: true,
      downloadButton: true,
      viewFindButton: true,
      secondaryToolbarToggleButton: true,
      // Add or remove buttons as needed
    }
  },
  sidebar: {
    visible: true
  }
})
</script>
```

### CSS Customization

You can customize the appearance of the PDF viewer by overriding CSS variables:

```css
.vue-pdfjs {
  --primary-color: #4285f4;
  --sidebar-narrow-bg-color: #f1f1f1;
  --toolbar-bg-color: #f9f9f9;
  --main-color: #333333;
  --button-hover-color: rgba(66, 133, 244, 0.2);
  --toggled-btn-color: rgba(66, 133, 244, 0.2);
  --toggled-btn-hover-color: rgba(66, 133, 244, 0.4);
}
```

### Container Queries

Enable container queries to make the PDF viewer responsive to its container size rather than the viewport size.
This is particularly useful when embedding the viewer in a layout where its parent container might have dynamic dimensions.

```vue
<template>
  <VuePDFjs :source="pdfUrl" :use-container-query="true" />
</template>
```
