# Migration Guide: v1 to v2

## Overview

Version 2.0.0 introduces prefixed CSS variables to prevent conflicts with your application's existing CSS. This is a breaking change that requires updating any custom CSS that overrides the PDF viewer's styles.

## Breaking Changes

### CSS Variables Prefix

All CSS variables have been prefixed with `--vue-pdfjs-` to prevent naming conflicts with your application's CSS variables.

**Before (v1.x):**
```css
.vue-pdfjs {
  --primary-color: #42b883;
  --toolbar-bg-color: #ffffff;
  --body-bg-color: #f5f5f5;
  --sidebar-narrow-bg-color: #ffffff;
  --main-color: #333333;
  --button-hover-color: rgba(66, 184, 131, 0.1);
  --scrollbar-color: #42b883;
  --scrollbar-bg-color: #f1f1f1;
}
```

**After (v2.x):**
```css
.vue-pdfjs {
  --vue-pdfjs-primary-color: #42b883;
  --vue-pdfjs-toolbar-bg-color: #ffffff;
  --vue-pdfjs-body-bg-color: #f5f5f5;
  --vue-pdfjs-sidebar-narrow-bg-color: #ffffff;
  --vue-pdfjs-main-color: #333333;
  --vue-pdfjs-button-hover-color: rgba(66, 184, 131, 0.1);
  --vue-pdfjs-scrollbar-color: #42b883;
  --vue-pdfjs-scrollbar-bg-color: #f1f1f1;
}
```

## Migration Steps

### 1. Update CSS Variable Names

If you have custom CSS that overrides the PDF viewer's variables, you need to add the `--vue-pdfjs-` prefix to all variable names.

#### Find and Replace

Use your editor's find and replace feature with the following pattern:

- **Find:** `--([a-zA-Z0-9-]+):`
- **Replace:** `--vue-pdfjs-$1:`
- **Scope:** Only in files where you override vue-pdfjs CSS variables

Or manually update each variable:

| Old Variable Name | New Variable Name |
|------------------|-------------------|
| `--primary-color` | `--vue-pdfjs-primary-color` |
| `--toolbar-bg-color` | `--vue-pdfjs-toolbar-bg-color` |
| `--body-bg-color` | `--vue-pdfjs-body-bg-color` |
| `--main-color` | `--vue-pdfjs-main-color` |
| `--loadingBar-color` | `--vue-pdfjs-loadingBar-color` |
| `--button-hover-color` | `--vue-pdfjs-button-hover-color` |
| `--toggled-btn-color` | `--vue-pdfjs-toggled-btn-color` |
| `--toggled-btn-hover-color` | `--vue-pdfjs-toggled-btn-hover-color` |
| `--dropdown-btn-bg-color` | `--vue-pdfjs-dropdown-btn-bg-color` |
| `--sidebar-narrow-bg-color` | `--vue-pdfjs-sidebar-narrow-bg-color` |
| `--thumbnail-selection-ring-color` | `--vue-pdfjs-thumbnail-selection-ring-color` |
| `--scrollbar-color` | `--vue-pdfjs-scrollbar-color` |
| `--scrollbar-bg-color` | `--vue-pdfjs-scrollbar-bg-color` |
| `--dialog-button-bg` | `--vue-pdfjs-dialog-button-bg` |
| `--dialog-button-border` | `--vue-pdfjs-dialog-button-border` |
| `--dialog-button-hover-bg` | `--vue-pdfjs-dialog-button-hover-bg` |
| `--dialog-button-hover-border` | `--vue-pdfjs-dialog-button-hover-border` |
| `--field-border-color` | `--vue-pdfjs-field-border-color` |
| `--field-bg-color` | `--vue-pdfjs-field-bg-color` |
| `--errorWrapper-bg-color` | `--vue-pdfjs-errorWrapper-bg-color` |

### 2. Test Your Application

After updating the variable names:

1. Clear your browser cache and build cache
2. Rebuild your application
3. Verify that the PDF viewer appears correctly with your custom styles
4. Check all interactive elements (toolbar, sidebar, dialogs) to ensure proper styling

## Why This Change?

The CSS variable prefixing prevents naming conflicts between the PDF viewer and your application's CSS. Without prefixes, common variable names like `--primary-color`, `--body-bg-color`, and `--scrollbar-color` could conflict with your application's design system, leading to unexpected styling issues.

By prefixing all variables with `--vue-pdfjs-`, we ensure:
- **No conflicts** with your application's CSS variables
- **Clear ownership** - it's immediately obvious which variables belong to the PDF viewer
- **Better maintainability** - easier to debug styling issues

## Need Help?

If you encounter any issues during migration:

1. Check the [Customization Guide](/guide/customization) for complete CSS variable documentation
2. Report issues on [GitHub Issues](https://github.com/tuttarealstep/vue-pdf.js/issues)

## Example: Complete Migration

**Before (v1.x):**
```vue
<template>
  <VuePDFjs :source="pdf" />
</template>

<style>
.vue-pdfjs {
  --primary-color: #e74c3c;
  --toolbar-bg-color: #34495e;
  --body-bg-color: #2c3e50;
  --main-color: #ecf0f1;
  --button-hover-color: rgba(231, 76, 60, 0.2);
  --scrollbar-color: #e74c3c;
}
</style>
```

**After (v2.x):**
```vue
<template>
  <VuePDFjs :source="pdf" />
</template>

<style>
.vue-pdfjs {
  --vue-pdfjs-primary-color: #e74c3c;
  --vue-pdfjs-toolbar-bg-color: #34495e;
  --vue-pdfjs-body-bg-color: #2c3e50;
  --vue-pdfjs-main-color: #ecf0f1;
  --vue-pdfjs-button-hover-color: rgba(231, 76, 60, 0.2);
  --vue-pdfjs-scrollbar-color: #e74c3c;
}
</style>
```
