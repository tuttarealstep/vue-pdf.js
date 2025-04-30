# Slots

VuePDFjs provides slots that allow you to customize certain parts of the PDF viewer interface. This gives you more control over the appearance and behavior of the component.

::: tip
Explore our [interactive slots demo](/slots-demo) to see different slot implementations in action!
:::

## Available Slots

### `loading`

The `loading` slot allows you to customize the loading indicator that appears while the PDF document is being loaded.

#### Default Loading Indicator

By default, VuePDFjs displays a simple "Loading..." text:

```vue
<div class="loading">Loading...</div>
```

#### Custom Loading Indicator

You can provide your own loading indicator using the `loading` slot:

```vue
<template>
  <VuePDFjs :source="pdfSource" :options="options">
    <template #loading>
      <div class="custom-loading-indicator">
        <div class="spinner"></div>
        <p>Loading your PDF document...</p>
      </div>
    </template>
  </VuePDFjs>
</template>

<style>
.custom-loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
```

#### Usage Considerations

- The loading slot is only shown when the component is in the loading state
- It's positioned absolutely within the component, so you can apply custom styling for positioning
- The slot is hidden once the PDF has loaded
- Use this slot to create consistent loading experiences across your application