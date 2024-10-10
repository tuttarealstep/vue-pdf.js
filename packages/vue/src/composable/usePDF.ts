import { isRef, Ref, shallowRef, watch } from "vue";
import { PDFInfo, PDFSource, PDFSourceOptions } from "../types";
import { processSource } from "../scripts/utils";
//@ts-ignore
import { PDFDocumentLoadingTask } from "pdf.js/src/display/api";
//@ts-ignore
import * as PDFJS from 'pdf.js/src/pdf.js'
import { PDFJSWorker } from "../scripts/viewer";

export default function usePDF(source: PDFSource | Ref<PDFSource>, options?: PDFSourceOptions) {

    if (!PDFJS.GlobalWorkerOptions?.workerSrc)
        PDFJS.GlobalWorkerOptions.workerSrc = PDFJSWorker

    const pdf = shallowRef<PDFDocumentLoadingTask>()
    const pages = shallowRef(0)
    const info = shallowRef<PDFInfo | {}>({})

    const initDocument = async (inputSource: PDFSource) => {
        const document = await processSource(inputSource, options);

        if (!document) {
            return
        }

        pdf.value = document.loadingTask;
        pages.value = document.numPages;

        const metadata = await document.getMetadata()
        const attachments = (await document.getAttachments()) as Record<string, unknown>
        const javascript = await document.getJSActions()
        const outline = await document.getOutline()

        info.value = {
            metadata,
            attachments,
            javascript,
            outline,
        }
    }

    if (isRef(source)) {
        if (source.value) {
            initDocument(source.value)
        }

        watch(source, () => {
            if (source.value) {
                initDocument(source.value)
            }
        })
    } else {
        if (source) {
            initDocument(source)
        }
    }

    return {
        pdf,
        pages,
        info
    }
}