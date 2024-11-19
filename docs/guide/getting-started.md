# Getting Started

![npm](https://img.shields.io/npm/v/@tuttarealstep/vue-pdf.js)

![Editor](/editor.png)

## Introduction

`@tuttarealstep/vue-pdf.js` is a Vue 3 client-side component that allow you to display PDF files using the standard [Mozilla's PDF.js viewer](https://github.com/mozilla/pdf.js).

## Installation

::: code-group

```sh [npm]
$ npm i @tuttarealstep/vue-pdf.js
```

```sh [bun]
$ bun add @tuttarealstep/vue-pdf.js
```

```sh [pnpm]
$ pnpm add @tuttarealstep/vue-pdf.js
```

```sh [yarn]
$ yarn add @tuttarealstep/vue-pdf.js
```

:::

## Usage

Import the component and pass the PDF file to the `source` prop.

### Basic

```vue
<script setup lang="ts">
import { VuePDFjs } from "@tuttarealstep/vue-pdf.js";
import "@tuttarealstep/vue-pdf.js/dist/style.css";

// Replace <URL_TO_PDF> with the URL to the PDF file or any other source
const pdf = "<URL_TO_PDF>";
</script>

<template>
  <div id="app">
    <VuePDFjs :source="pdf" />
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

### Using the `usePDF` composable

```vue
<script setup lang="ts">
import { reactive } from "vue";
import { VuePDFjs, usePDF } from "@tuttarealstep/vue-pdf.js";
import "@tuttarealstep/vue-pdf.js/dist/style.css";
import enUS_FTL from "@tuttarealstep/vue-pdf.js/l10n/en-US/viewer.ftl?raw";

// The composable provides the document, info and pages
const { pdf, info, pages } = usePDF("<URL_TO_PDF>");
console.log(document, info, pages);

// Also using the i18n FTL file
const options = reactive({
  locale: {
    code: "en-US",
    ftl: enUS_FTL,
  },
});
</script>

<template>
  <div id="app">
    <VuePDFjs :source="pdf" :options="options" />
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
