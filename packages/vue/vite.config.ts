import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { defineConfig, normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// The pdf.js repository doesn't set a `version` field in its package.json,
// so the version is recovered from the git tag of the dependency. pdf.js
// compares `BUNDLE_VERSION` between the API and the worker: exposing the
// real version (instead of `null`) allows swapping in an external worker of
// the same version, e.g. the legacy one from `pdfjs-dist`.
const pdfjsVersion =
  JSON.parse(
    readFileSync(fileURLToPath(new URL('./package.json', import.meta.url)), 'utf-8')
  ).devDependencies['pdf.js'].match(/#v([\d.]+)$/)?.[1] ?? null

// Build-time shim for the `PDFJSDev` preprocessor used by the pdf.js sources.
// It has to be injected in the worker bundle as well, otherwise pdf.js skips
// the `PDFJSDev`-guarded code paths there (e.g. its own `AbortSignal.any`
// polyfill) and reports a `null` worker version.
const pdfjsDevShim = `const __PDFJSDEV__ = { test: (flag) => /GENERIC/.test(flag), eval: (key) => (key === "BUNDLE_VERSION" ? ${JSON.stringify(pdfjsVersion)} : null) };`

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(path.resolve(__dirname, './node_modules/pdf.js/l10n')),
          dest: ''
        }
      ]
    }),
    dts()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  define: {
    PDFJSDev: '__PDFJSDEV__'
  },
  worker: {
    rollupOptions: {
      output: {
        intro: pdfjsDevShim,
        // The inline worker runs from a blob, so it cannot load extra chunks
        inlineDynamicImports: true
      }
    }
  },
  build: {
    //sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VuePDFjs',
      fileName: 'vue-pdfjs'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        intro: pdfjsDevShim,
        globals: {
          vue: 'Vue'
        },
        exports: 'named'
      }
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      pdfjs: fileURLToPath(new URL('./node_modules/pdf.js/src', import.meta.url)),
      'pdfjs-lib': fileURLToPath(new URL('./node_modules/pdf.js/src/pdf.js', import.meta.url)),
      'pdfjs-web': fileURLToPath(new URL('./node_modules/pdf.js/web', import.meta.url)),

      'fluent-bundle': fileURLToPath(
        new URL('./node_modules/@fluent/bundle/esm/index.js', import.meta.url)
      ),
      'fluent-dom': fileURLToPath(
        new URL('./node_modules/@fluent/dom/esm/index.js', import.meta.url)
      ),

      'display-cmap_reader_factory': fileURLToPath(
        new URL('./node_modules/pdf.js/src/display/cmap_reader_factory.js', import.meta.url)
      ),
      'display-standard_fontdata_factory': fileURLToPath(
        new URL(
          './node_modules/pdf.js/src/display/standard_fontdata_factory.js',
          import.meta.url
        )
      ),
      'display-wasm_factory': fileURLToPath(
        new URL('./node_modules/pdf.js/src/display/wasm_factory.js', import.meta.url)
      ),
      'display-fetch_stream': fileURLToPath(
        new URL('./node_modules/pdf.js/src/display/fetch_stream.js', import.meta.url)
      ),
      'display-network': fileURLToPath(
        new URL('./node_modules/pdf.js/src/display/network.js', import.meta.url)
      ),
      'display-node_stream': fileURLToPath(
        new URL('./node_modules/pdf.js/src/display/stubs.js', import.meta.url)
      ),
      'display-binary_data_factory': fileURLToPath(
        new URL('./node_modules/pdf.js/src/display/binary_data_factory.js', import.meta.url)
      ),
      'display-network_stream': fileURLToPath(
        new URL('./node_modules/pdf.js/src/display/network_stream.js', import.meta.url)
      ),
      'display-node_utils': fileURLToPath(
        new URL('./node_modules/pdf.js/src/display/stubs.js', import.meta.url)
      ),

      './internal_viewer_utils.js': fileURLToPath(
        new URL('./src/scripts/internal_viewer_utils.ts', import.meta.url)
      ),

      'web-alt_text_manager': fileURLToPath(
        new URL('./node_modules/pdf.js/web/alt_text_manager.js', import.meta.url)
      ),
      'web-annotation_editor_params': fileURLToPath(
        new URL('./node_modules/pdf.js/web/annotation_editor_params.js', import.meta.url)
      ),
      'web-download_manager': fileURLToPath(
        new URL('./node_modules/pdf.js/web/download_manager.js', import.meta.url)
      ),
      'web-external_services': fileURLToPath(
        new URL('./node_modules/pdf.js/web/genericcom.js', import.meta.url)
      ),
      'web-new_alt_text_manager': fileURLToPath(
        new URL('./node_modules/pdf.js/web/new_alt_text_manager.js', import.meta.url)
      ),
      'web-null_l10n': fileURLToPath(
        new URL('./node_modules/pdf.js/web/genericl10n.js', import.meta.url)
      ),
      'web-pdf_attachment_viewer': fileURLToPath(
        new URL('./node_modules/pdf.js/web/pdf_attachment_viewer.js', import.meta.url)
      ),
      'web-pdf_cursor_tools': fileURLToPath(
        new URL('./node_modules/pdf.js/web/pdf_cursor_tools.js', import.meta.url)
      ),
      'web-pdf_document_properties': fileURLToPath(
        new URL('./node_modules/pdf.js/web/pdf_document_properties.js', import.meta.url)
      ),
      'web-pdf_find_bar': fileURLToPath(
        new URL('./node_modules/pdf.js/web/pdf_find_bar.js', import.meta.url)
      ),
      'web-pdf_layer_viewer': fileURLToPath(
        new URL('./node_modules/pdf.js/web/pdf_layer_viewer.js', import.meta.url)
      ),
      'web-pdf_outline_viewer': fileURLToPath(
        new URL('./node_modules/pdf.js/web/pdf_outline_viewer.js', import.meta.url)
      ),
      'web-pdf_presentation_mode': fileURLToPath(
        new URL('./node_modules/pdf.js/web/pdf_presentation_mode.js', import.meta.url)
      ),
      'web-pdf_thumbnail_viewer': fileURLToPath(
        new URL('./node_modules/pdf.js/web/pdf_thumbnail_viewer.js', import.meta.url)
      ),
      'web-preferences': fileURLToPath(
        new URL('./node_modules/pdf.js/web/genericcom.js', import.meta.url)
      ),
      'web-print_service': fileURLToPath(
        new URL('./node_modules/pdf.js/web/pdf_print_service.js', import.meta.url)
      ),
      'web-secondary_toolbar': fileURLToPath(
        new URL('./node_modules/pdf.js/web/secondary_toolbar.js', import.meta.url)
      ),
      'web-signature_manager': fileURLToPath(
        new URL('./node_modules/pdf.js/web/signature_manager.js', import.meta.url)
      ),
      'web-toolbar': fileURLToPath(
        new URL('./node_modules/pdf.js/web/toolbar.js', import.meta.url)
      ),
      'web-views_manager': fileURLToPath(
        new URL('./node_modules/pdf.js/web/views_manager.js', import.meta.url)
      ),
    }
  }
})
