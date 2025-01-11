//@ts-ignore
import { getDocument, PDFDocumentLoadingTask, PDFDocumentProxy } from 'pdf.js/src/display/api'
import {
  OnPasswordCallback,
  PDFSource,
  PDFSourceOptions,
  PDFSourceWithOptions,
  UpdatePasswordFn
} from '../types'

/**
 * Converts a File object to a Uint8Array.
 * @param {File} file - The file to convert.
 * @returns {Promise<Uint8Array>} A promise that resolves to a Uint8Array.
 */
const getByteArray = function (file: File): Promise<Uint8Array> {
  const fileReader = new FileReader()
  return new Promise(function (resolve: (value: Uint8Array) => void, reject) {
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = function (ev: any) {
      const array = new Uint8Array(ev.target.result)
      const fileByteArray = []
      for (let i = 0; i < array.length; i++) {
        fileByteArray.push(array[i])
      }
      resolve(array)
    }
    fileReader.onerror = reject
  })
}

/**
 * Parses a PDF source file and returns a PDFDocumentLoadingTask.
 * @param {PDFSource} source - The source of the PDF file.
 * @returns {Promise<PDFDocumentLoadingTask>} A promise that resolves to a PDFDocumentLoadingTask.
 * @throws {Error} If the source is invalid.
 */
export async function parseSourceFile(source: PDFSource): Promise<PDFDocumentLoadingTask> {
  if (source == null || source === undefined) {
    throw new Error('Invalid parameter')
  }

  if (source instanceof PDFDocumentLoadingTask) {
    return source
  }

  if (source instanceof PDFDocumentProxy) {
    return source.loadingTask
  }

  if (source instanceof File) {
    return getDocument(await getByteArray(source))
  }

  if (source instanceof Blob) {
    return getDocument(await source.arrayBuffer())
  }

  if (typeof source === 'string') {
    if (source.startsWith('blob:')) {
      const response = await fetch(source)
      return getDocument(await response.arrayBuffer())
    }
    if (source.startsWith('data:application/pdf;base64,')) {
      return getDocument(
        new Uint8Array(
          atob(source.split(',')[1])
            .split('')
            .map(function (c) {
              return c.charCodeAt(0)
            })
        )
      )
    }
  }

  return getDocument(source!)
}

/**
 * Processes a PDF source and returns a PDFDocumentProxy.
 * @param {PDFSource | PDFSourceWithOptions} inputSource - The input source of the PDF file.
 * @param {PDFSourceOptions} [sourceOptions] - Optional source options.
 * @returns {Promise<PDFDocumentProxy | null>} A promise that resolves to a PDFDocumentProxy or null.
 */
export async function processSource(
  inputSource: PDFSource | PDFSourceWithOptions,
  sourceOptions?: PDFSourceOptions
): Promise<PDFDocumentProxy | null> {
  if (!inputSource) {
    return null
  }

  let source: PDFSource = null
  let options: PDFSourceOptions | null = sourceOptions ?? null

  if ((inputSource as PDFSourceWithOptions).source) {
    source = (inputSource as PDFSourceWithOptions).source

    if ((inputSource as PDFSourceWithOptions).options) {
      options = { ...options, ...(inputSource as PDFSourceWithOptions).options }
    }
  } else {
    source = inputSource as PDFSource
  }

  if (!source) {
    return null
  }

  const loadingTask = await parseSourceFile(source).catch((error) => {
    if (options?.onError) {
      options.onError(error)
    } else {
      console.error(error)
    }
  })

  if (!loadingTask) {
    return null
  }

  if (options?.onProgress) {
    loadingTask.onProgress = options.onProgress
  }

  if (options?.onPassword) {
    loadingTask.onPassword = options.onPassword
  } else if (options?.password) {
    const onPassword: OnPasswordCallback = (updatePassword: UpdatePasswordFn) => {
      updatePassword(options?.password ?? '')
    }
    loadingTask.onPassword = onPassword
  }

  return loadingTask.promise.catch((error: any) => {
    if (options?.onError) {
      options.onError(error)
    } else {
      console.error(error)
    }
  })
}
