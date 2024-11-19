# Composables

## `usePDF` composable

The `usePDF` composable provides a way to load and prepare a PDF document for the usage with the `@tuttarealstep/vue-pdf.js` component.

It return the pdf source, the pdf metadata and the number of pages.

```js
import { usePDF } from "@tuttarealstep/vue-pdf.js";

const { pdf, info, pages } = usePDF("<URL_TO_PDF>");
```

### Parameters

#### `source`

- Type: `string | URL | TypedArray | ArrayBuffer | DocumentInitParameters | File | Blob | PDFDocumentLoadingTask | undefined | null | ref<string | URL | TypedArray | ArrayBuffer | DocumentInitParameters | File | Blob | PDFDocumentLoadingTask | undefined | null>`
- Required: `true`

The `DocumentInitParameters` type is defined in the [PDF.js source](https://github.com/mozilla/pdf.js/blob/3634dab10ca7dbaf0ca536f645465b231c88f862/src/display/api.js#L116).

#### `options`

- Type: `object`
- Required: `false`

The options object can contain the following properties:

- `onProgress`: Callback function to enable progress monitor.
- `onError`: function to handle errors during the loading of the PDF file.
- `onPassword`: Callback function to request a password. If not provided, the default behavior is to use the `password` parameter.
- `password`: The password to use for decrypting the PDF file.

```ts
function onProgress(progressData: OnProgressParameters) {
  console.log(`Progress: ${progressData.loaded} / ${progressData.total}`);
}

function onPassword(updatePassword: UpdatePasswordFn, reason: any) {
  console.log(`Password required: ${reason}`);
  updatePassword("<PASSWORD>");
}

function onError(reason: any) {
  console.error(`Error: ${reason}`);
}

const { pdf, info, pages } = usePDF("<URL_TO_PDF>", {
  onPassword,
  onProgress,
  onError,
});
```

### Return values

::: info
All the returned values are [ShallowRef](https://vuejs.org/api/reactivity-advanced.html#shallowref)
:::

#### `pdf`

- Type: `ShallowRef<PDFDocumentLoadingTask>`

The PDF document loading task. You can read more about it in the [PDF.js source](https://github.com/mozilla/pdf.js/blob/3634dab10ca7dbaf0ca536f645465b231c88f862/src/display/api.js#L587)

#### `info`

- Type: `ShallowRef<PDFInfo>`

This object represents the information of the PDF document. It contains the following properties:

```ts
  metadata: PDFInfoMetadata; // Metadata
  attachments: Record<string, unknown>; // Attachments
  javascript: string[] | null; // JavaScript objects
  outline: any; // Outline object
```

The metadata object contains the following properties:

```ts
info: any; // PDF informations
metadata: Metadata; // PDF.js Metadata
```

#### `pages`

- Type: `ShallowRef<number>`

The number of pages in the PDF document.
