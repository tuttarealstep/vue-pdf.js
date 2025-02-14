# Props

## source

- **Type:** `PDFSource | PDFSourceWithOptions | PDFDocumentProxy`
- **Description:** The source of the PDF file.
- **Optional**

## sourceOptions

- **Type:** `PDFSourceOptions`
- **Description:** The options for the PDF source, including error handling.

## useContainerQuery

- **Type:** `boolean`
- **Default:** `true`
- **Description:** If true, the component uses container queries to adjust the layout based on the container size. The pdf.js viewer only use media queries to adjust the layout based on the window size.

## options

- **Type:** `object`
- **Description:** Options to configure the PDF viewer.
  - **locale:**
    - **code:** `string` (required) - Locale code.
    - **ftl:** `string` (required) - Locale FTL text.
  - **toolbar:** `ToolbarContainerProps`
  - **sidebar:** `SidebarContainerProps`
