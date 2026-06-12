import { beforeAll, expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { PDFJS, VuePDFjs, usePDF } from '@tuttarealstep/vue-pdf.js'
import '@tuttarealstep/vue-pdf.js/dist/style.css'
// @ts-ignore
import enUS_FTL from '../node_modules/pdf.js/l10n/en-US/viewer.ftl?raw'
// A worker from the same pdf.js version, but coming from an external package
import legacyWorkerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url'

// Configure the external worker before any document is opened
PDFJS.GlobalWorkerOptions.workerSrc = legacyWorkerUrl

const { pdf: pdfDocument, pages: pdfPages } = usePDF(
  new URL(
    '../../vue-pdfjs-playground/src/assets/compressed.tracemonkey-pldi-09.pdf',
    import.meta.url
  )
)

beforeAll(async () => {
  await vi.waitUntil(() => pdfDocument.value, { timeout: 10000 })
})

test('usePDF loads the document with the external worker', () => {
  // The bundled inline worker must not be created when a worker is
  // already configured
  expect(PDFJS.GlobalWorkerOptions.workerPort).toBe(null)
  expect(PDFJS.GlobalWorkerOptions.workerSrc).toBe(legacyWorkerUrl)

  expect(pdfPages.value).toBe(14)
})

test('Render component with the external worker', async () => {
  //Add a default css to make body > div height 100vh
  const style = document.createElement('style')
  style.innerHTML = 'body > div { height: 100vh }'
  document.head.appendChild(style)

  render(VuePDFjs, {
    props: {
      source: pdfDocument.value,
      options: {
        locale: {
          code: 'en-US',
          ftl: enUS_FTL
        }
      }
    }
  })

  // The page counter is only filled once the viewer has loaded the
  // document through the worker
  await vi.waitFor(
    () => {
      expect(document.getElementById('numPages')?.textContent).toContain('14')
    },
    { timeout: 15000 }
  )

  // The viewer must still be using the configured worker
  expect(PDFJS.GlobalWorkerOptions.workerPort).toBe(null)
  expect(PDFJS.GlobalWorkerOptions.workerSrc).toBe(legacyWorkerUrl)
})
