# Usage with Nuxt

If you want to use `@tuttarealstep/vue-pdf.js` in a Nuxt project, you can follow these steps.

## Create a "client-only" component

In this example we will use the `@tuttarealstep/vue-pdf.js` component to display a PDF file and highlight some text.

Create a new component in the `components` directory, for example `PDFViewer.client.vue`

```vue
<script setup lang="ts">
// 1. Import the component and the styles
import { VuePDFjs } from "@tuttarealstep/vue-pdf.js";
import "@tuttarealstep/vue-pdf.js/dist/style.css";

// 2. Import the FTL file
import it_FTL from "@tuttarealstep/vue-pdf.js/l10n/it/viewer.ftl?raw";

// 3. Define the component props if needed
const props = defineProps<{
  source: string;
  highlightText?: string | string[];
}>();

// 4. Create the template ref for the VuePDFjs component
const pdfComponent = useTemplateRef<typeof VuePDFjs>("pdfComponent");

// 5. Create the options object with the locale property
const options = reactive({
  locale: {
    code: "it",
    ftl: it_FTL,
  },
  // You can add more options here
});

// 6. Create the function to set the highlight
const setHighlight = (text: string | string[]) => {
  if (pdfComponent.value && pdfComponent.value.pdfApp) {
    pdfComponent.value.pdfApp?.eventBus?.dispatch("find", {
      query: text,
      caseSensitive: false,
      entireWord: false,
      highlightAll: true,
    });
  }
};

// 7. Create the function to listen to the "pagesloaded" event
const onPdfAppLoaded = () => {
  if (!pdfComponent.value?.pdfApp) {
    return;
  }

  pdfComponent.value.pdfApp.eventBus.on("pagesloaded", (e: any) => {
    if (props.highlightText) {
      setHighlight(props.highlightText);
    }
  });
};

// 8. Watch the props to set the highlight
watch(
  () => props.highlightText,
  (newVal) => {
    if (newVal) setHighlight(newVal);
  }
);

// 9. Watch the source prop to set the highlight
watch(
  () => props.source,
  (newVal) => {
    if (newVal && props.highlightText) setHighlight(props.highlightText);
  }
);
</script>
<template>
  <div class="pdf-viewer-container">
    <VuePDFjs
      ref="pdfComponent"
      :source="source"
      :options="options"
      @pdf-app:loaded="onPdfAppLoaded"
    />
  </div>
</template>

<style scoped lang="scss">
.pdf-viewer-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
}
</style>
```

## Use the component in a page

Now you can use the `PDFViewer.client.vue` component in a Nuxt page.

Create a new page in the `pages` directory, for example `pdf-viewer.vue`

```vue
<script setup lang="ts">
import { defineProps } from "vue";

const pdfUrl = "<URL_TO_PDF>";
</script>
<template>
  <!-- You can use the component in a client-only block -->
  <ClientOnly>
    <PDFViewer :source="pdfUrl" :highlight-text="'text to highlight'" />
  </ClientOnly>
</template>
```
