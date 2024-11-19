//@ts-ignore
import { TypedArray, DocumentInitParameters, PDFDocumentLoadingTask, OnProgressParameters, PDFDocumentProxy } from "pdf.js/src/display/api";
//@ts-ignore
import { Metadata } from "pdf.js/src/display/metadata";
import { ToolbarContainerProps } from "./components/ToolbarContainer.vue";

export type OnProgressCallback = (progressData: OnProgressParameters) => void
export type UpdatePasswordFn = (newPassword: string) => void
export type OnPasswordCallback = (updatePassword: UpdatePasswordFn, reason: any) => void
export type OnErrorCallback = (error: any) => void

export interface PDFSourceOptions {
    onProgress?: OnProgressCallback
    onPassword?: OnPasswordCallback
    onError?: OnErrorCallback
    password?: string
}

export type PDFSource =
    | string
    | URL
    | TypedArray
    | ArrayBuffer
    | DocumentInitParameters //End of standard types
    | File
    | Blob
    | PDFDocumentLoadingTask
    | undefined
    | null

export interface PDFSourceWithOptions {
    source?: PDFSource
    options?: PDFSourceOptions
}

export interface PDFInfoMetadata {
    info: any
    metadata: Metadata
}

export interface PDFInfo {
    metadata: PDFInfoMetadata
    attachments: Record<string, unknown>
    javascript: string[] | null
    outline: any
}