import { beforeAll, describe, expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { page, userEvent } from '@vitest/browser/context'
import { VuePDFjs, usePDF, type VuePDFjsProps } from '@tuttarealstep/vue-pdf.js'
import '@tuttarealstep/vue-pdf.js/dist/style.css'
import { getDocumentFileName, getPlatformPrintStrategy } from '../src/scripts/platform-print'
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
  // the print button is hidden when the viewer is too narrow
  await page.viewport(1280, 900)
})

const IPHONE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1'

const ANDROID_UA =
  'Mozilla/5.0 (Linux; Android 16; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36'

const DESKTOP_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'

function stubNavigator(name: string, value: unknown) {
  const original = Object.getOwnPropertyDescriptor(navigator, name)

  Object.defineProperty(navigator, name, { value, configurable: true })

  return () => {
    if (original) {
      Object.defineProperty(navigator, name, original)
    } else {
      delete (navigator as unknown as Record<string, unknown>)[name]
    }
  }
}

function renderViewer() {
  return render(VuePDFjs, {
    props: {
      source: pdfDocument.value,
      options: {
        locale: {
          code: 'en-US',
          ftl: enUS_FTL
        },
        toolbar: {
          options: {
            print: true
          }
        }
      }
    }
  })
}

describe('Platform print strategy', () => {
  test('iPhone, iPad and Android are handed over to the platform', () => {
    expect(getPlatformPrintStrategy({ userAgent: IPHONE_UA, maxTouchPoints: 5 })).toBe('share')
    expect(
      getPlatformPrintStrategy({
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_5 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1',
        maxTouchPoints: 5
      })
    ).toBe('share')
    // iPadOS 13+ reports itself as a Mac
    expect(
      getPlatformPrintStrategy({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15',
        maxTouchPoints: 5
      })
    ).toBe('share')
    expect(getPlatformPrintStrategy({ userAgent: ANDROID_UA, maxTouchPoints: 5 })).toBe('open')
  })

  test('desktop browsers keep using pdf.js', () => {
    expect(getPlatformPrintStrategy({ userAgent: DESKTOP_UA, maxTouchPoints: 0 })).toBeNull()
    expect(
      getPlatformPrintStrategy({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15',
        maxTouchPoints: 0
      })
    ).toBeNull()
    expect(getPlatformPrintStrategy({})).toBeNull()
  })

  test('the document file name is derived from the source', () => {
    expect(getDocumentFileName('https://example.com/docs/report.pdf?token=123')).toBe('report.pdf')
    expect(getDocumentFileName(new URL('https://example.com/docs/report%20final.pdf'))).toBe('report final.pdf')
    expect(getDocumentFileName('blob:https://example.com/2b4ca7b3-1e6b-4d5b-9a7c')).toBe('document.pdf')
    expect(getDocumentFileName(new File(['%PDF'], 'uploaded.pdf'))).toBe('uploaded.pdf')
    expect(getDocumentFileName({ source: 'https://example.com/other.pdf' } as VuePDFjsProps['source'])).toBe(
      'other.pdf'
    )
    expect(getDocumentFileName(undefined)).toBe('document.pdf')
  })
})

test('the print button passes the document to the platform on mobile', async () => {
  const restoreUserAgent = stubNavigator('userAgent', IPHONE_UA)
  const restoreTouchPoints = stubNavigator('maxTouchPoints', 5)

  const shared: unknown[] = []
  const restoreCanShare = stubNavigator('canShare', () => true)
  const restoreShare = stubNavigator('share', async (data: unknown) => {
    shared.push(data)
  })

  try {
    const screen = renderViewer()

    await vi.waitFor(() => screen.getByText('of 14'), { timeout: 5000 })

    await userEvent.click(document.getElementById('printButton')!)

    await vi.waitFor(() => expect(shared.length).toBe(1), { timeout: 3000 })

    const shareData = shared[0] as { files: File[]; title: string }
    expect(shareData.files[0]).toBeInstanceOf(File)
    expect(shareData.files[0].type).toBe('application/pdf')
    expect(shareData.files[0].size).toBeGreaterThan(1000)
    expect(shareData.title).toBe(shareData.files[0].name)

    // pdf.js must not start printing the page as it is displayed on screen
    expect((globalThis as any).PDFViewerApplication.printService).toBeFalsy()
    expect(document.body.hasAttribute('data-pdfjsprinting')).toBe(false)

    screen.unmount()
  } finally {
    restoreUserAgent()
    restoreTouchPoints()
    restoreCanShare()
    restoreShare()
  }
})

test('the print button opens the document in the browser on Android', async () => {
  const restoreUserAgent = stubNavigator('userAgent', ANDROID_UA)
  const restoreTouchPoints = stubNavigator('maxTouchPoints', 5)

  const opened: string[] = []
  const originalOpen = window.open
  window.open = vi.fn((url?: string | URL) => {
    opened.push(String(url))

    return { closed: false } as unknown as Window
  }) as unknown as typeof window.open

  try {
    const screen = renderViewer()

    await vi.waitFor(() => screen.getByText('of 14'), { timeout: 5000 })

    await userEvent.click(document.getElementById('printButton')!)

    await vi.waitFor(() => expect(opened.length).toBe(1), { timeout: 3000 })
    expect(opened[0]).toMatch(/^blob:/)

    // the document is what is printed, not the page as it is displayed
    expect((globalThis as any).PDFViewerApplication.printService).toBeFalsy()
    expect(document.body.hasAttribute('data-pdfjsprinting')).toBe(false)

    screen.unmount()
  } finally {
    window.open = originalOpen
    restoreUserAgent()
    restoreTouchPoints()
  }
})

test('the print button still prints with pdf.js on desktop', async () => {
  const restoreUserAgent = stubNavigator('userAgent', DESKTOP_UA)
  const restoreTouchPoints = stubNavigator('maxTouchPoints', 0)

  const shared: unknown[] = []
  const restoreShare = stubNavigator('share', async (data: unknown) => {
    shared.push(data)
  })

  try {
    const printContainer = document.createElement('div')
    printContainer.id = 'print-container-probe'
    const pagesSeen = { peak: 0 }

    const probeObserver = new MutationObserver(() => {
      pagesSeen.peak = Math.max(pagesSeen.peak, document.querySelectorAll('#printContainer > .printedPage').length)
    })
    probeObserver.observe(document.body, { childList: true, subtree: true })

    const screen = renderViewer()

    await vi.waitFor(() => screen.getByText('of 14'), { timeout: 5000 })

    await userEvent.click(document.getElementById('printButton')!)

    // pdf.js renders the pages into the print container before the print dialog
    await vi.waitFor(() => expect(pagesSeen.peak).toBe(14), { timeout: 10000 })
    expect(shared.length).toBe(0)

    probeObserver.disconnect()
    printContainer.remove()
    screen.unmount()
  } finally {
    restoreUserAgent()
    restoreTouchPoints()
    restoreShare()
  }
})
