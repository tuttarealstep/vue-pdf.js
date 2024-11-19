import { beforeAll, expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { VuePDFjs, usePDF } from '@tuttarealstep/vue-pdf.js'
import '@tuttarealstep/vue-pdf.js/dist/style.css'
// @ts-ignore
import enUS_FTL from '../../../node_modules/pdf.js/l10n/en-US/viewer.ftl?raw'

const {
  pdf: pdfDocument,
  info: pdfInfo,
  pages: pdfPages
} = usePDF(
  'https://raw.githubusercontent.com/mozilla/pdf.js/v4.8.69/web/compressed.tracemonkey-pldi-09.pdf'
)

beforeAll(async () => {
  await vi.waitUntil(() => pdfDocument.value, { timeout: 5000 })
})

test('Render component', () => {
  //Add a default css to make body > div height 100vh
  const style = document.createElement('style')
  style.innerHTML = 'body > div { height: 100vh }'
  document.head.appendChild(style)

  const screen = render(VuePDFjs, {
    props: {
      source: pdfDocument.value,
      options: {
        locale: {
          code: 'en-US',
          ftl: enUS_FTL
        }
      }
    },
    
  })

  //Expect the pdfInfo.value.metadata to be an object
  expect(pdfInfo.value?.metadata).toBeTypeOf('object')

  //Expect 14 pages
  expect(pdfPages.value).toBe(14)

  //Check in the rendered screen if the "#numPages" is "of 14"
  expect(screen.getByText('of 14')).toBeTruthy()
})
