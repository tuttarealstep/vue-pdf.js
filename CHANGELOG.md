# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-01-07

### ⚠️ Breaking Changes

- **CSS Variables Prefixing**: All CSS variables are now prefixed with `--vue-pdfjs-` to prevent naming conflicts with application CSS.
  - Old: `--primary-color`, `--body-bg-color`, `--scrollbar-color`, etc.
  - New: `--vue-pdfjs-primary-color`, `--vue-pdfjs-body-bg-color`, `--vue-pdfjs-scrollbar-color`, etc.
  - **Migration Required**: If you're using custom CSS to override viewer styles, update all CSS variable names with the `--vue-pdfjs-` prefix.
  - See the [Migration Guide](./docs/guide/migration-v2.md) for detailed instructions.

### Changed

- Updated build process: created `postbuild.ts` script to automatically prefix all CSS variables in the generated `dist/style.css`
- Updated `main.scss` to use prefixed CSS variables
- Updated documentation to reflect the new CSS variable names

### Added

- Migration guide (`docs/guide/migration-v2.md`) with step-by-step instructions for upgrading from v1.x to v2.0.0
- Complete CSS variable reference table in migration guide

### Why This Change?

CSS variables from pdf.js (like `--body-bg-color`, `--scrollbar-color`) were conflicting with global application styles, causing layout issues. By prefixing all variables with `--vue-pdfjs-`, we ensure:
- No naming conflicts with application CSS
- Clear variable ownership and purpose
- Better maintainability and debugging

## [1.2.7] - Previous Release

- (Previous changes...)
