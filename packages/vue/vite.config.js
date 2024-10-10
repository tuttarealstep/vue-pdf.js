import { fileURLToPath, URL } from 'node:url';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig, normalizePath } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
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
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "VuePDFjs",
            fileName: "vue-pdfjs"
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue"
                }
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            'pdfjs': fileURLToPath(new URL('./node_modules/pdf.js/src', import.meta.url)),
            'pdfjs-lib': fileURLToPath(new URL('./node_modules/pdf.js/src/pdf.js', import.meta.url)),
            'pdfjs-web': fileURLToPath(new URL('./node_modules/pdf.js/web', import.meta.url)),
            'fluent-bundle': fileURLToPath(new URL('../../node_modules/@fluent/bundle/esm/index.js', import.meta.url)),
            'fluent-dom': fileURLToPath(new URL('../../node_modules/@fluent/dom/esm/index.js', import.meta.url)),
            'cached-iterable': fileURLToPath(new URL('../../node_modules/cached-iterable/src/index.mjs', import.meta.url)),
            'display-fetch_stream': fileURLToPath(new URL('./node_modules/pdf.js/src/display/fetch_stream.js', import.meta.url)),
            'display-network': fileURLToPath(new URL('./node_modules/pdf.js/src/display/network.js', import.meta.url)),
            'display-node_stream': fileURLToPath(new URL('./node_modules/pdf.js/src/display/stubs.js', import.meta.url)),
            'display-node_utils': fileURLToPath(new URL('./node_modules/pdf.js/src/display/stubs.js', import.meta.url)),
            'web-alt_text_manager': fileURLToPath(new URL('./node_modules/pdf.js/web/alt_text_manager.js', import.meta.url)),
            'web-annotation_editor_params': fileURLToPath(new URL('./node_modules/pdf.js/web/annotation_editor_params.js', import.meta.url)),
            'web-download_manager': fileURLToPath(new URL('./node_modules/pdf.js/web/download_manager.js', import.meta.url)),
            'web-external_services': fileURLToPath(new URL('./node_modules/pdf.js/web/genericcom.js', import.meta.url)),
            'web-new_alt_text_manager': fileURLToPath(new URL('./node_modules/pdf.js/web/new_alt_text_manager.js', import.meta.url)),
            'web-null_l10n': fileURLToPath(new URL('./node_modules/pdf.js/web/genericl10n.js', import.meta.url)),
            'web-pdf_attachment_viewer': fileURLToPath(new URL('./node_modules/pdf.js/web/pdf_attachment_viewer.js', import.meta.url)),
            'web-pdf_cursor_tools': fileURLToPath(new URL('./node_modules/pdf.js/web/pdf_cursor_tools.js', import.meta.url)),
            'web-pdf_document_properties': fileURLToPath(new URL('./node_modules/pdf.js/web/pdf_document_properties.js', import.meta.url)),
            'web-pdf_find_bar': fileURLToPath(new URL('./node_modules/pdf.js/web/pdf_find_bar.js', import.meta.url)),
            'web-pdf_layer_viewer': fileURLToPath(new URL('./node_modules/pdf.js/web/pdf_layer_viewer.js', import.meta.url)),
            'web-pdf_outline_viewer': fileURLToPath(new URL('./node_modules/pdf.js/web/pdf_outline_viewer.js', import.meta.url)),
            'web-pdf_presentation_mode': fileURLToPath(new URL('./node_modules/pdf.js/web/pdf_presentation_mode.js', import.meta.url)),
            'web-pdf_sidebar': fileURLToPath(new URL('./node_modules/pdf.js/web/pdf_sidebar.js', import.meta.url)),
            'web-pdf_thumbnail_viewer': fileURLToPath(new URL('./node_modules/pdf.js/web/pdf_thumbnail_viewer.js', import.meta.url)),
            'web-preferences': fileURLToPath(new URL('./node_modules/pdf.js/web/genericcom.js', import.meta.url)),
            'web-print_service': fileURLToPath(new URL('./node_modules/pdf.js/web/pdf_print_service.js', import.meta.url)),
            'web-secondary_toolbar': fileURLToPath(new URL('./node_modules/pdf.js/web/secondary_toolbar.js', import.meta.url)),
            'web-toolbar': fileURLToPath(new URL('./node_modules/pdf.js/web/toolbar.js', import.meta.url)),
        }
    },
});
