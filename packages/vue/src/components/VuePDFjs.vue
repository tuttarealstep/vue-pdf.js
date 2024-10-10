<script setup lang="ts">
import '../assets/scss/main.scss'

import { onMounted, onUnmounted, ref, shallowRef, watch } from 'vue';
import { initViewer, PDFViewerApplicationOptions } from '../scripts/viewer';

import OuterContainer from './OuterContainer.vue';
import PrintContainer from './PrintContainer.vue';
import { PDFSourceOptions, PDFSource, PDFSourceWithOptions, PDFInfo } from '../types';
import { processSource } from '../scripts/utils';
//@ts-ignore
import { PDFDocumentLoadingTask, PDFDocumentProxy } from 'pdf.js/src/display/api';
//@ts-ignore
import { PDFViewerApplication } from 'pdf.js/web/app';

export interface VuePDFjsProps {
  source?: PDFSource | PDFSourceWithOptions | PDFDocumentProxy
  sourceOptions?: PDFSourceOptions,
  options?: {
    locale?: {
      code: string,
      ftl: string
    }
  }
}

const props = withDefaults(defineProps<VuePDFjsProps>(), {
  source: null
});

const emit = defineEmits<{
  'pdf-app:loaded': []
}>()

const container = ref<HTMLDivElement>();
const isLoading = ref(true);

const pdfApp = shallowRef<typeof PDFViewerApplication>()
const pdfLoadingTask = shallowRef<PDFDocumentLoadingTask>()
const pdfDocument = shallowRef<PDFDocumentProxy>()
const pdfPages = shallowRef(0)
const pdfInfo = shallowRef<PDFInfo | {}>({})

async function init() {
  if (!container.value) {
    throw new Error('Container not found');
  }

  isLoading.value = false;

  try {
    if (props.options?.locale) {
      if (!props.options.locale.code) {
        throw new Error('Locale code is required');
      }

      if (!props.options.locale.ftl) {
        throw new Error('Locale ftl text is required');
      }

      PDFViewerApplicationOptions.set('lang', props.options?.locale?.code);
      (globalThis as any)['__VUE_PDFJS__'] = {
        locale: props.options.locale.ftl,
      };
    }

    pdfApp.value = await initViewer(container.value);
    await pdfApp.value.initializedPromise;

    emit('pdf-app:loaded');
  } catch (error) {
    console.error(error);
  }

  isLoading.value = false;
}

function clearCacheTimeout() {
  const cacheTimeoutId = pdfApp.value?.pdfRenderingQueue?.idleTimeout;

  if (cacheTimeoutId)
    clearTimeout(cacheTimeoutId)
}

async function initDocument(document: PDFDocumentProxy | null) {
  if (!document || !pdfApp.value) {
    return;
  }

  clearCacheTimeout()

  pdfDocument.value = document;
  pdfLoadingTask.value = document.loadingTask;
  pdfPages.value = document.numPages;

  const metadata = await document.getMetadata()
  const attachments = (await document.getAttachments()) as Record<string, unknown>
  const javascript = await document.getJSActions()
  const outline = await document.getOutline()

  pdfInfo.value = {
    metadata,
    attachments,
    javascript,
    outline,
  }

  pdfApp.value?.load(document);
}

async function openSource(source: PDFSource | PDFSourceWithOptions | PDFDocumentProxy) {
  if (source !== undefined && source !== null) {
    if (source instanceof PDFDocumentProxy) {
      initDocument(source);
    } else {
      initDocument(await processSource(source, props.sourceOptions));
    }
  } else {
    if (pdfApp.value) {
      await pdfApp.value.close();
    }
  }
}

watch(() => props.source, async (source) => {
  await openSource(source);
})

onMounted(async () => {
  await init();

  if (props.source)
    await openSource(props.source);
})

onUnmounted(() => {
  pdfDocument.value?.destroy();
})

defineExpose({
  pdfApp,
  pdfDocument,
  pdfPages,
  pdfInfo,
  pdfLoadingTask
})
</script>

<template>
  <div class="vue-pdfjs">
    <div class="appContainer" ref="container" id="appContainer">
      <OuterContainer />
      <PrintContainer />
    </div>
    <div v-show="isLoading" style="position: absolute;">
      <slot name="loading">
        <div class="loading">Loading...</div>
      </slot>
    </div>
  </div>
</template>