import { parseSourceFile, processSource } from '../src/scripts/utils'
import { describe, it, expect, vi } from 'vitest'
//@ts-expect-error
import { PDFDocumentLoadingTask, PDFDocumentProxy } from 'pdf.js/src/display/api'
import { PDFJSWorker } from '../src/scripts/viewer'

//@ts-expect-error
import * as PDFJS from 'pdf.js/src/pdf.js'

PDFJS.GlobalWorkerOptions.workerPort = new PDFJSWorker()

describe('utils.ts', () => {
  describe('parseSourceFile', () => {
    it('should throw an error for null source', async () => {
      await expect(parseSourceFile(null)).rejects.toThrow('Invalid parameter')
    })

    it('should return the same PDFDocumentLoadingTask if source is a File', async () => {
      const file = new File([''], 'test.pdf')
      const result = await parseSourceFile(file)
      expect(result).toBeInstanceOf(PDFDocumentLoadingTask)
    })

    it('should return the same PDFDocumentLoadingTask if source is a Blob', async () => {
      const blob = new Blob([''], { type: 'application/pdf' })
      const result = await parseSourceFile(blob)
      expect(result).toBeInstanceOf(PDFDocumentLoadingTask)
    })

    it('should return the same PDFDocumentLoadingTask if source is a string', async () => {
      const result = await parseSourceFile('https://example.com/test.pdf')
      expect(result).toBeInstanceOf(PDFDocumentLoadingTask)
    })

    it('should return the same PDFDocumentLoadingTask if source is already a PDFDocumentLoadingTask', async () => {
      const loadingTask = new PDFDocumentLoadingTask()
      const result = await parseSourceFile(loadingTask)
      expect(result).toBe(loadingTask)
    })
  })

  describe('processSource', () => {
    it('should return null for null inputSource', async () => {
      const result = await processSource(null)
      expect(result).toBeNull()
    })
  })
})
