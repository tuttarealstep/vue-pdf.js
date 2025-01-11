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

## Handle errors

### Handle errors with the `usePDF` composable

In this example, we handle errors in the `usePDF` composable and display a message to the user.

```vue
<script setup lang="ts">
import { reactive, useTemplateRef } from "vue";
import {
  VuePDFjs,
  usePDF,
  type VuePDFjsProps,
} from "@tuttarealstep/vue-pdf.js";
import "@tuttarealstep/vue-pdf.js/dist/style.css";
import enUS_FTL from "@tuttarealstep/vue-pdf.js/l10n/en-US/viewer.ftl?raw";

const vuepdfjs = useTemplateRef<typeof VuePDFjs>("vuepdfjs");

const options = reactive<NonNullable<VuePDFjsProps["options"]>>({
  locale: {
    code: "en-US",
    ftl: enUS_FTL,
  },
});

const {
  pdf: document,
  info,
  pages,
} = usePDF("invalid-source", {
  onError: (error) => {
    console.error("Error loading the PDF file", error);
    alert("Error loading the PDF file");
  },
});

console.log(document, info, pages);
</script>

<template>
  <div id="app">
    <VuePDFjs ref="vuepdfjs" :source="document" :options="options" />
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

### Handle errors only with the `VuePDFjs` component

In this example, we handle errors only with the `VuePDFjs` component and display a message to the user.

```vue
<script setup lang="ts">
import { reactive, useTemplateRef } from "vue";
import {
  VuePDFjs,
  usePDF,
  type VuePDFjsProps,
} from "@tuttarealstep/vue-pdf.js";
import "@tuttarealstep/vue-pdf.js/dist/style.css";
import enUS_FTL from "@tuttarealstep/vue-pdf.js/l10n/en-US/viewer.ftl?raw";

const vuepdfjs = useTemplateRef<typeof VuePDFjs>("vuepdfjs");

const options = reactive<NonNullable<VuePDFjsProps["options"]>>({
  locale: {
    code: "en-US",
    ftl: enUS_FTL,
  },
});

// Custom error handler
const onPdfAppError = (error: unknown) => {
  console.error(error);

  alert("An error occurred while loading the PDF document.");
};

// Source options
const sourceOptions = reactive<NonNullable<VuePDFjsProps["sourceOptions"]>>({
  onError: onPdfAppError,
});

const source = "invalid-source";
</script>

<template>
  <div id="app">
    <VuePDFjs
      ref="vuepdfjs"
      :source="source"
      :options="options"
      :source-options="sourceOptions"
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

### Handle pdf.js document errors

If we try to load a PDF document with the pdf.js interface it dispach a "documenterror" event. We can listen to this event and handle the error.

```vue
<script setup lang="ts">
import { reactive, useTemplateRef } from "vue";
import {
  VuePDFjs,
  usePDF,
  type VuePDFjsProps,
} from "@tuttarealstep/vue-pdf.js";
import "@tuttarealstep/vue-pdf.js/dist/style.css";
import enUS_FTL from "@tuttarealstep/vue-pdf.js/l10n/en-US/viewer.ftl?raw";

const vuepdfjs = useTemplateRef<typeof VuePDFjs>("vuepdfjs");

const options = reactive<NonNullable<VuePDFjsProps["options"]>>({
  locale: {
    code: "en-US",
    ftl: enUS_FTL,
  },
});

// Custom error handler
const onPdfAppError = (error: unknown) => {
  console.error(error);

  alert("An error occurred with the PDF document.");
};

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

  // Listen to the documenterror event
  vuepdfjs.value.pdfApp.eventBus.on("documenterror", onPdfAppError);
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
