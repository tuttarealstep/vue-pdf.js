<script setup lang="ts">
import { defineClientComponent } from 'vitepress'

const SlotsDemo = defineClientComponent(() => {
  return import("./components/SlotsDemo.vue")
})
</script>

# Slots Demo

This interactive demo showcases how to use slots with the VuePDFjs component. Slots allow you to customize
specific parts of the PDF viewer interface, such as the loading state.

## Features

- Four different loading indicator styles:
  - Simple text loading indicator
  - Spinner animation with text
  - Animated progress bar
  - Fully customized loading screen
- Configurable loading delay to simulate longer loading times
- Reload button to trigger the loading state and test different styles

Try selecting different loading styles and reloading the PDF to see how the slots can be used to enhance the user experience.

<div class="demo-container">
  <SlotsDemo />
</div>

## Available Slots

VuePDFjs provides slots that allow you to customize various parts of the interface:

### Loading Slot

The `loading` slot is displayed while the PDF document is loading. This is particularly useful for providing a better user experience
during the loading process.

```vue
<template>
  <VuePDFjs :source="pdfUrl">
    <template #loading>
      <div class="custom-loading">
        <div class="spinner"></div>
        <div>Loading your document...</div>
      </div>
    </template>
  </VuePDFjs>
</template>

<style>
.custom-loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  position: absolute;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #4285f4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
```
