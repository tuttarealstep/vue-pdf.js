import { beforeAll, expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { VuePDFjs, usePDF, type VuePDFjsProps } from '@tuttarealstep/vue-pdf.js'
import '@tuttarealstep/vue-pdf.js/dist/style.css'
// @ts-ignore
import enUS_FTL from '../../../node_modules/pdf.js/l10n/en-US/viewer.ftl?raw'

const {
  pdf: pdfDocument,
  //info: pdfInfo,
  pages: pdfPages
} = usePDF(
  new URL(
    '../../vue-pdfjs-playground/src/assets/compressed.tracemonkey-pldi-09.pdf',
    import.meta.url
  )
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

test('Catch error when source is invalid - usePDF composable', async () => {
  const invalidSource = 'invalid-source'

  const onErrorCallback = vi.fn((error: unknown) => {
    console.error(error)
  })

  const { pdf, info, pages } = usePDF(invalidSource, {
    onError: onErrorCallback
  })

  expect(pdf.value).toBe(undefined)
  expect(info.value).toBe(undefined)
  expect(pages.value).toBe(0)

  await new Promise((resolve) => setTimeout(resolve, 100))
  await vi.waitFor(() => onErrorCallback.mock.calls.length > 0)

  expect(onErrorCallback).toHaveBeenCalled()
})

test('Catch error when source is invalid - without composable', async () => {
  //Add a default css to make body > div height 100vh
  const style = document.createElement('style')
  style.innerHTML = 'body > div { height: 100vh }'
  document.head.appendChild(style)

  const onErrorCallback = vi.fn((error: unknown) => {
    console.error(error)
  })

  const props = {
    source: 'invalid-source',
    options: {
      locale: {
        code: 'en-US',
        ftl: enUS_FTL
      }
    },
    sourceOptions: {
      onError: onErrorCallback
    }
  } as VuePDFjsProps

  render(VuePDFjs, {
    props
  })

  await new Promise((resolve) => setTimeout(resolve, 100))

  expect(onErrorCallback).toHaveBeenCalled()
})
