# vue-pdfjs [![NPM Version](https://img.shields.io/npm/v/%40tuttarealstep%2Fvue-pdf.js)](https://www.npmjs.com/package/@tuttarealstep/vue-pdf.js) [![MadeWithVueJs.com shield](https://madewithvuejs.com/storage/repo-shields/5902-shield.svg)](https://madewithvuejs.com/p/vue-pdfjs/shield-link)

`vue-pdfjs` is a Vue 3 component for displaying PDF files using the standard `pdf.js` viewer. This package provides a simple and powerful integration to embed PDF viewers in Vue applications.

[Docs](https://tuttarealstep.github.io/vue-pdf.js)

## Features

- Display PDF files with `pdf.js`
- Localization support
- Modular components for easy customization
- Compatible with Vue 3 and Vite

## Installation

To install the package, run:

```sh
npm install @tuttarealstep/vue-pdf.js
```

## Usage

```vue
<script setup lang="ts">
import { reactive, useTemplateRef } from "vue";
import { VuePDFjs } from "@tuttarealstep/vue-pdf.js";
import "@tuttarealstep/vue-pdf.js/dist/style.css";
import enUS_FTL from "@tuttarealstep/vue-pdf.js/l10n/en-US/viewer.ftl?raw";

const pdf = new URL("./path/to/custom.pdf", import.meta.url).href;

const vuepdfjs = useTemplateRef<typeof VuePDFjs>("vuepdfjs");

const options = reactive({
  locale: {
    code: "en-US",
    ftl: enUS_FTL,
  },
});

const onPdfAppLoaded = () => {
  console.log("pdf-app:loaded");
  console.log(vuepdfjs.value?.pdfApp);

  if (!vuepdfjs.value?.pdfApp) {
    return;
  }

  vuepdfjs.value.pdfApp.eventBus.on("pagesloaded", (e: any) => {
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
</script>

<template>
  <div id="app">
    <VuePDFjs
      ref="vuepdfjs"
      :source="pdf"
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

### With usePDF composable

```vue
<script setup lang="ts">
import { reactive, useTemplateRef } from "vue";
import { VuePDFjs, usePDF } from "@tuttarealstep/vue-pdf.js";
import "@tuttarealstep/vue-pdf.js/dist/style.css";
import enUS_FTL from "@tuttarealstep/vue-pdf.js/l10n/en-US/viewer.ftl?raw";

const vuepdfjs = useTemplateRef<typeof VuePDFjs>("vuepdfjs");

const options = reactive({
  locale: {
    code: "en-US",
    ftl: enUS_FTL,
  },
});

const onPdfAppLoaded = () => {
  console.log("pdf-app:loaded");
  console.log(vuepdfjs.value?.pdfApp);

  if (!vuepdfjs.value?.pdfApp) {
    return;
  }

  vuepdfjs.value.pdfApp.eventBus.on("pagesloaded", (e: any) => {
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

const { pdf, info, pages } = usePDF(
  new URL("./path/to/custom.pdf", import.meta.url).href
); // or any other source type

console.log(document, info, pages);
</script>

<template>
  <div id="app">
    <VuePDFjs
      ref="vuepdfjs"
      :source="pdf"
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

## License

MIT

## Credits

- [pdf.js](https://mozilla.github.io/pdf.js/) (Apache-2.0) - PDF viewer library
- [vue-pdf](https://github.com/TaTo30/vue-pdf) (MIT) - Inspiration for the project
