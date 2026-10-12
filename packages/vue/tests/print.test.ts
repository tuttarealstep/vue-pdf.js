import { beforeAll, expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { cdp } from '@vitest/browser/context'
import { VuePDFjs, usePDF } from '@tuttarealstep/vue-pdf.js'
import '@tuttarealstep/vue-pdf.js/dist/style.css'
// @ts-ignore
import enUS_FTL from '../node_modules/pdf.js/l10n/en-US/viewer.ftl?raw'

const { pdf: pdfDocument } = usePDF(
  new URL(
    '../../vue-pdfjs-playground/src/assets/compressed.tracemonkey-pldi-09.pdf',
    import.meta.url
  )
)

beforeAll(async () => {
  await vi.waitUntil(() => pdfDocument.value, { timeout: 5000 })
})

test('Only the PDF pages reach the printer, not the host page', async () => {
  const style = document.createElement('style')
  style.innerHTML = 'body > div { height: 100vh }'
  document.head.appendChild(style)

  const hostContent = document.createElement('div')
  hostContent.id = 'host-page-content'
  hostContent.textContent = 'Application chrome around the viewer'
  document.body.appendChild(hostContent)

  const screen = render(VuePDFjs, {
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

  await vi.waitFor(() => screen.getByText('of 14'), { timeout: 5000 })

  const printContainer = document.getElementById('printContainer')
  expect(printContainer).toBeTruthy()

  // pdf.js expects the print container next to its own container directly under
  // `<body>`: anywhere else, the host page layout ends up in the print output.
  expect(printContainer!.parentElement).toBe(document.body)

  try {
    await cdp().send('Emulation.setEmulatedMedia', { media: 'print' })

    // what pdf.js does while printing: mark the body and fill the container
    document.body.setAttribute('data-pdfjsprinting', 'true')
    const printedPage = document.createElement('div')
    printedPage.className = 'printedPage'
    printContainer!.append(printedPage)
    await vi.waitFor(() => {
      expect(getComputedStyle(hostContent).display).toBe('none')
    }, { timeout: 2000 })
    expect(getComputedStyle(printContainer!).display).toBe('block')
  } finally {
    document.body.removeAttribute('data-pdfjsprinting')
    printContainer!.textContent = ''
    await cdp().send('Emulation.setEmulatedMedia', { media: '' })
  }

  // normal rendering is untouched
  expect(getComputedStyle(hostContent).display).not.toBe('none')
  expect(getComputedStyle(printContainer!).display).toBe('none')

  screen.unmount()
  hostContent.remove()
})
