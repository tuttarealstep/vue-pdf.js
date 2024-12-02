import { beforeAll, expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { VuePDFjs, usePDF } from '@tuttarealstep/vue-pdf.js'
import '@tuttarealstep/vue-pdf.js/dist/style.css'
// @ts-ignore
import enUS_FTL from '../../../node_modules/pdf.js/l10n/en-US/viewer.ftl?raw'
import { ref } from 'vue'

const {
  pdf: pdfDocument,
  info: pdfInfo,
  pages: pdfPages
} = usePDF(
  'https://raw.githubusercontent.com/mozilla/pdf.js/v4.9.124/web/compressed.tracemonkey-pldi-09.pdf'
)

beforeAll(async () => {
  await vi.waitUntil(() => pdfDocument.value, { timeout: 5000 })
})

test('Test enable/disable options', () => {
  //Add a default css to make body > div height 100vh
  const style = document.createElement('style')
  style.innerHTML = 'body > div { height: 100vh }'
  document.head.appendChild(style)

  const props = {
    source: pdfDocument.value,
    options: {
      locale: {
        code: 'en-US',
        ftl: enUS_FTL
      },
      toolbar: {
        options: {
          editorStampButton: false
        }
      }
    }
  }

  const screen = render(VuePDFjs, {
    props
  })

  //Expect 14 pages
  expect(pdfPages.value).toBe(14)

  //Check in the rendered screen if the "#numPages" is "of 14"
  expect(screen.getByText('of 14')).toBeTruthy()

  // Expect the "#editorStamp" to exist
  expect(screen.getByTestId('editorStamp')).toBeTruthy()

  // Expect the "#editorStamp" display to not be "none"
  expect(document.getElementById('editorStamp')?.style.display).toBe('none')
})
