//@ts-ignore
import { RenderingStates, ScrollMode, SpreadMode } from "pdf.js/web/ui_utils.js";
//@ts-ignore
import { AppOptions } from "pdf.js/web/app_options.js";
//@ts-ignore
import { LinkTarget } from "pdf.js/web/pdf_link_service.js";
//@ts-ignore
import { PDFViewerApplication } from "pdf.js/web/app.js";
//@ts-ignore
import * as PDFJS from 'pdf.js/src/pdf.js'
import PDFViewerApplicationConfig from "./PDFViewerApplicationConfig";
import PDFJSWorker from 'pdf.js/src/pdf.worker.js?worker&url'

const AppConstants = { LinkTarget, RenderingStates, ScrollMode, SpreadMode };

async function initViewer(element: HTMLElement): Promise<typeof PDFViewerApplication> {
    if (!PDFJS.GlobalWorkerOptions?.workerSrc)
        PDFJS.GlobalWorkerOptions.workerSrc = PDFJSWorker

    // @ts-ignore
    globalThis.PDFViewerApplication = PDFViewerApplication;
    // @ts-ignore
    globalThis.PDFViewerApplicationConstants = AppConstants;
    // @ts-ignore
    globalThis.PDFViewerApplicationOptions = AppOptions;

    //AppOptions.set('lang', 'it');
    AppOptions.set('disablePreferences', true);
    AppOptions.set('defaultUrl', '');
    AppOptions.set('workerSrc', PDFJSWorker);

    /*(globalThis as any)['__VUE_PDFJS__'] = {
        locale: testFtl
    }*/

    await PDFViewerApplication.run(PDFViewerApplicationConfig(element.getRootNode() as ShadowRoot | Document));

    return PDFViewerApplication;
}

export {
    AppConstants as PDFViewerApplicationConstants,
    AppOptions as PDFViewerApplicationOptions,
    initViewer,
    PDFJSWorker,
};
