//@ts-ignore
import { ScrollMode, SpreadMode } from 'pdf.js/web/ui_utils.js'
//@ts-ignore
import { RenderingStates } from 'pdf.js/web/renderable_view.js'
//@ts-ignore
import { AppOptions } from 'pdf.js/web/app_options.js'
//@ts-ignore
import { LinkTarget } from 'pdf.js/web/pdf_link_service.js'
//@ts-ignore
import { PDFViewerApplication } from 'pdf.js/web/app.js'
//@ts-ignore
import * as PDFJS from 'pdf.js/src/pdf.js'
import PDFViewerApplicationConfig from './PDFViewerApplicationConfig'
import PDFJSWorker from './worker?worker&inline'

const AppConstants = { LinkTarget, RenderingStates, ScrollMode, SpreadMode }

async function initViewer(element: HTMLElement): Promise<typeof PDFViewerApplication> {
  // Honor a worker configured by the host application (or by `usePDF`)
  // before falling back to the bundled inline worker.
  if (!PDFJS.GlobalWorkerOptions?.workerPort && !PDFJS.GlobalWorkerOptions?.workerSrc)
    PDFJS.GlobalWorkerOptions.workerPort = new PDFJSWorker()

  // @ts-ignore
  globalThis.PDFViewerApplication = PDFViewerApplication
  // @ts-ignore
  globalThis.PDFViewerApplicationConstants = AppConstants
  // @ts-ignore
  globalThis.PDFViewerApplicationOptions = AppOptions
  // @ts-ignore

  //AppOptions.set('lang', 'it');

  // `PDFViewerApplication.open()` copies the worker options back onto
  // `GlobalWorkerOptions`, so they have to mirror it to not clobber the
  // configuration above.
  AppOptions.set('workerPort', PDFJS.GlobalWorkerOptions.workerPort)
  AppOptions.set('workerSrc', PDFJS.GlobalWorkerOptions.workerSrc)
  AppOptions.set('defaultUrl', '')
  AppOptions.set('disablePreferences', true)

  //console.log(AppOptions)
  /*(globalThis as any)['__VUE_PDFJS__'] = {
        locale: testFtl
    }*/

  await PDFViewerApplication.run(
    PDFViewerApplicationConfig(element.getRootNode() as ShadowRoot | Document)
  )

  return PDFViewerApplication
}

export {
  AppConstants as PDFViewerApplicationConstants,
  AppOptions as PDFViewerApplicationOptions,
  initViewer,
  PDFJS,
  PDFJSWorker
}
