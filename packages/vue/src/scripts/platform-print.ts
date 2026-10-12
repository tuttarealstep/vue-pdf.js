//@ts-ignore
import type { PDFDocumentProxy } from 'pdf.js/src/display/api'
import { PDFSource, PDFSourceWithOptions } from '../types'

export type PlatformPrintStrategy = 'share' | 'open'

export interface PlatformEnvironment {
  userAgent?: string
  maxTouchPoints?: number
}

/**
 * pdf.js renders the pages to print inside `#printContainer`, which mobile
 * browsers do not lay out for printing: there only what is currently on screen
 * reaches the preview, in the standalone pdf.js viewer as well
 * (mozilla/pdf.js#17759, mozilla/pdf.js#21609). On those platforms the document
 * is handed over to the operating system instead, which prints the PDF itself:
 * through the share sheet on iOS/iPadOS and through the browser's PDF viewer on
 * Android. Desktop browsers return `null` and keep using pdf.js.
 */
export function getPlatformPrintStrategy(
  environment: PlatformEnvironment = {}
): PlatformPrintStrategy | null {
  const userAgent = environment.userAgent ?? globalThis.navigator?.userAgent ?? ''
  const maxTouchPoints = environment.maxTouchPoints ?? globalThis.navigator?.maxTouchPoints ?? 0

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'share'
  }

  // iPadOS reports itself as a Mac, the touch points give it away
  if (/Macintosh/.test(userAgent) && maxTouchPoints > 1) {
    return 'share'
  }

  return /Android/.test(userAgent) ? 'open' : null
}

const defaultFileName = 'document.pdf'

/**
 * File name of the document, used for the print job and the share sheet.
 */
export function getDocumentFileName(source?: PDFSource | PDFSourceWithOptions | null): string {
  const unwrapped = (source as PDFSourceWithOptions)?.source ?? source

  if (typeof File !== 'undefined' && unwrapped instanceof File) {
    return unwrapped.name
  }

  if (typeof unwrapped === 'string') {
    if (unwrapped.startsWith('blob:') || unwrapped.startsWith('data:')) {
      return defaultFileName
    }

    const name = unwrapped.split(/[?#]/)[0].split('/').pop()

    if (name) {
      return decodeURIComponent(name)
    }
  }

  if (typeof URL !== 'undefined' && unwrapped instanceof URL) {
    const name = unwrapped.pathname.split('/').pop()

    if (name) {
      return decodeURIComponent(name)
    }
  }

  return defaultFileName
}

// The document data is read before the user asks to print: the share sheet has
// to open while the click is still being handled, so it cannot be awaited there.
const preparedDocuments = new WeakMap<PDFDocumentProxy, File>()

/**
 * Reads the document into a `File`, so that printing does not have to wait for
 * it while the click that triggered it is being handled.
 */
export async function prepareDocumentForPrinting(
  pdfDocument: PDFDocumentProxy,
  fileName: string
): Promise<File> {
  const prepared = preparedDocuments.get(pdfDocument)

  if (prepared) {
    return prepared
  }

  const data = await pdfDocument.getData()
  const file = new File([data], fileName, { type: 'application/pdf' })

  preparedDocuments.set(pdfDocument, file)

  return file
}

/**
 * Opens the platform print dialog for the document. Returns `false` when the
 * platform refused to open it, so that the caller can fall back to pdf.js.
 */
export async function printDocumentWithPlatform(
  pdfDocument: PDFDocumentProxy,
  fileName: string,
  strategy: PlatformPrintStrategy
): Promise<boolean> {
  let file: File

  try {
    file = await prepareDocumentForPrinting(pdfDocument, fileName)
  } catch (error) {
    console.error(error)

    return false
  }

  if (strategy === 'share') {
    const shareData = { files: [file], title: file.name }

    if (navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        // a cancelled share sheet is not a failure, anything else is
        return (error as Error)?.name === 'AbortError'
      }

      return true
    }
  }

  const url = URL.createObjectURL(file)

  if (window.open(url, '_blank')) {
    // give the new tab the time to load the document
    setTimeout(() => URL.revokeObjectURL(url), 60_000)

    return true
  }

  URL.revokeObjectURL(url)

  return false
}
