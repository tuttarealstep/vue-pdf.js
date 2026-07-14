# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.1] - 2026-09-15

### Added

- New pdf.js version 6.0.227

## [2.1.0] - 2026-06-12

### Added

- Exported the bundled pdf.js API as `PDFJS`, together with `PDFViewerApplicationOptions` and `PDFViewerApplicationConstants`, so the same pdf.js instance used by the viewer can be accessed and configured from the outside (e.g. `PDFJS.GlobalWorkerOptions`, `PDFJS.AnnotationEditorType`)
- The PDF.js worker can now be replaced: when `PDFJS.GlobalWorkerOptions.workerPort` or `workerSrc` is set before mounting the component, the bundled inline worker is not created and the configured one is used by both the viewer and `usePDF`
- Runtime polyfills for `Promise.withResolvers` and `Promise.try`, loaded in the main bundle and inside the worker, fixing `TypeError: ... is not a function` errors on older browsers (e.g. Firefox < 121, Chrome < 128)

### Fixed

- The `pdf.js` dependency now actually resolves to v5.7.284: the lockfile was still pinning the commit of v5.4.624 from before the version bump, so the published bundles were built from the older sources
- The `PDFJSDev` build shim is now injected into the worker bundle as well: previously the worker skipped the `PDFJSDev`-guarded code paths, including the pdf.js polyfill for `AbortSignal.any`
- The viewer no longer creates a second, unused worker during initialization
- Failed document loads now destroy the underlying pdf.js loading task, so worker messaging and range requests are not left in flight
- The browser test environment failed to start because the `PDFJSDev` define resolved to a constant that only exists in the built bundles

### Changed

- `PDFJSDev.eval("BUNDLE_VERSION")` now reports the real pdf.js version instead of `null`, so external workers of the same version (e.g. from `pdfjs-dist`) pass the pdf.js API/worker version check

## [2.0.0] - 2026-01-07

### ⚠️ Breaking Changes

- **Options Property Renamed**: The `sidebar` property has been renamed to `viewsManager` to reflect pdf-js.
  - Old: `options.sidebar`
  - New: `options.viewsManager`
  - Property names inside `options` have also been updated to match actual element IDs (e.g., `viewThumbnail` → `thumbnailsViewMenu`)
  - **Migration Required**: Update your options configuration to use `viewsManager` instead of `sidebar`.
  - See the [Migration Guide](./docs/guide/migration-v2.md) for complete mapping of old to new property names.

- **CSS Variables Prefixing**: All CSS variables are now prefixed with `--vue-pdfjs-` to prevent naming conflicts with application CSS.
  - Old: `--primary-color`, `--body-bg-color`, `--scrollbar-color`, etc.
  - New: `--vue-pdfjs-primary-color`, `--vue-pdfjs-body-bg-color`, `--vue-pdfjs-scrollbar-color`, etc.
  - **Migration Required**: If you're using custom CSS to override viewer styles, update all CSS variable names with the `--vue-pdfjs-` prefix.
  - See the [Migration Guide](./docs/guide/migration-v2.md) for detailed instructions.

### Changed

- **API**: Renamed `options.sidebar` to `options.viewsManager` for better clarity and consistency
- **API**: Updated Views Manager property names to match actual element IDs for better developer experience
- Updated build process: created `postbuild.ts` script to automatically prefix all CSS variables in the generated `dist/style.css` and JavaScript files
- Updated `main.scss` to use prefixed CSS variables
- Updated documentation to reflect the new CSS variable names and API changes

### Added

- Migration guide (`docs/guide/migration-v2.md`) with step-by-step instructions for upgrading from v1.x to v2.0.0
- Complete CSS variable reference table in migration guide

### Why These Changes?

**Views Manager Rename:**
The component was internally called `ViewsManager` but exposed as `sidebar` in the API, creating confusion. The new name better reflects the component's purpose and provides more granular control over individual elements.

**CSS Variables Prefixing:**
CSS variables from pdf.js (like `--body-bg-color`, `--scrollbar-color`) were conflicting with global application styles, causing layout issues. By prefixing all variables with `--vue-pdfjs-`, we ensure:
- No naming conflicts with application CSS
- Clear variable ownership and purpose
- Better maintainability and debugging

## [1.2.7] - Previous Release