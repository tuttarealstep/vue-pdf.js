# Basic examples

## Use another language

```vue
<script setup lang="ts">
import { reactive, useTemplateRef } from "vue";
import { VuePDFjs, usePDF } from "@tuttarealstep/vue-pdf.js";
import "@tuttarealstep/vue-pdf.js/dist/style.css";

// 1. Import the FTL file
import it_FTL from "@tuttarealstep/vue-pdf.js/l10n/it/viewer.ftl?raw";

// 2. Create the options object with the locale property
const options = reactive<NonNullable<VuePDFjsProps["options"]>>({
  locale: {
    code: "it",
    ftl: it_FTL,
  },
});

const { pdf: document, info, pages } = usePDF("<URL_TO_PDF>");

console.log(document, info, pages);
</script>

<template>
  <div id="app">
    <!-- 3. Pass the options object to the VuePDFjs component -->
    <VuePDFjs :source="document" :options="options" />
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
}
</style>
```

## Use the PDF.js eventBus

In this example, we use the `pdfApp` property to access the `eventBus` and listen to the `pagesloaded` event. When the event is triggered, we search for a specific text in the document.

```vue
<script setup lang="ts">
import { reactive, useTemplateRef } from "vue";
import { VuePDFjs, usePDF } from "@tuttarealstep/vue-pdf.js";
import "@tuttarealstep/vue-pdf.js/dist/style.css";
import enUS_FTL from "@tuttarealstep/vue-pdf.js/l10n/en-US/viewer.ftl?raw";

const vuepdfjs = useTemplateRef<typeof VuePDFjs>("vuepdfjs");

const options = reactive<NonNullable<VuePDFjsProps["options"]>>({
  locale: {
    code: "en-US",
    ftl: enUS_FTL,
  },
  toolbar: {
    options: {
      secondaryOpenFile: false, // Hide the open file button
    },
  },
});

const onPdfAppLoaded = () => {
  console.log("pdf-app:loaded");
  console.log(vuepdfjs.value?.pdfApp);

  if (!vuepdfjs.value?.pdfApp) {
    return;
  }

  // Wait for the pages to be loaded
  vuepdfjs.value.pdfApp.eventBus.on("pagesloaded", (e: any) => {
    // Search for a specific text in the document
    vuepdfjs.value?.pdfApp.eventBus.dispatch("find", {
      query: [
        "Dynamic languages such as JavaScript are more difficult to compile than statically typed ones.",
      ],
      caseSensitive: false,
      entireWord: false,
      highlightAll: true,
    });
  });
};

const {
  pdf: document,
  info,
  pages,
} = usePDF("compressed.tracemonkey-pldi-09.pdf");

console.log(document, info, pages);
</script>

<template>
  <div id="app">
    <VuePDFjs
      ref="vuepdfjs"
      :source="document"
      :options="options"
      @pdf-app:loaded="onPdfAppLoaded"
    />
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
}
</style>
```
