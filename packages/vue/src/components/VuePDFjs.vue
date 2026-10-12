<script setup lang="ts">
import '../assets/scss/main.scss'

import { onMounted, onUnmounted, ref, shallowRef, provide, watch, onUpdated, nextTick } from 'vue';
import { initViewer, PDFViewerApplicationOptions } from '../scripts/viewer';

import OuterContainer from './OuterContainer.vue';
import PrintContainer from './PrintContainer.vue';
import { PDFSourceOptions, PDFSource, PDFSourceWithOptions, PDFInfo } from '../types';
import { processSource } from '../scripts/utils';
import {
  getDocumentFileName,
  getPlatformPrintStrategy,
  prepareDocumentForPrinting,
  printDocumentWithPlatform
} from '../scripts/platform-print';
//@ts-ignore
import { PDFDocumentLoadingTask, PDFDocumentProxy } from 'pdf.js/src/display/api';
//@ts-ignore
import { PDFViewerApplication } from 'pdf.js/web/app';
import { ToolbarContainerProps } from './ToolbarContainer.vue';
import { viewsManagerOptionsKey, toolbarOptionsKey } from '@/keys';
import { ViewsManagerProps } from './ViewsManager.vue';
import { useTemplateRef } from 'vue';

export interface VuePDFjsProps {
  /**
   * The source of the PDF file.
   */
  source?: PDFSource | PDFSourceWithOptions | PDFDocumentProxy
  /**
   * The options for the PDF source.
   */
  sourceOptions?: PDFSourceOptions,
  /**
   * If true, the component will use the container query to adjust the viewer height.
   */
  useContainerQuery?: boolean,
  /**
   * The options for the PDF viewer.
   */
  options?: {
    locale?: {
      code: string,
      ftl: string
    },
    toolbar?: ToolbarContainerProps
    viewsManager?: ViewsManagerProps
  }
}

const props = withDefaults(defineProps<VuePDFjsProps>(), {
  source: null,
  useContainerQuery: true,
});

const emit = defineEmits<{
  'pdf-app:loaded': []
}>()

const container = useTemplateRef("container");
const printContainer = useTemplateRef("printContainer");
const isLoading = ref(true);

const pdfApp = shallowRef<typeof PDFViewerApplication>()
const pdfLoadingTask = shallowRef<PDFDocumentLoadingTask>()
const pdfDocument = shallowRef<PDFDocumentProxy>()
const pdfPages = shallowRef(0)
const pdfInfo = shallowRef<PDFInfo | {}>({})
const platformPrintStrategy = getPlatformPrintStrategy()
let restoreTriggerPrinting: (() => void) | null = null

provide(toolbarOptionsKey, props.options?.toolbar)
provide(viewsManagerOptionsKey, props.options?.viewsManager)

async function loadDocumentInfo(document: PDFDocumentProxy) {
  pdfDocument.value = document;
  pdfLoadingTask.value = document.loadingTask;
  pdfPages.value = document.numPages;

  if (platformPrintStrategy) {
    // read the document before the first print, so that the platform dialog can
    // be opened while the click that asks for it is still being handled
    prepareDocumentForPrinting(document, getDocumentFileName(props.source))
  }

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
}

async function init() {
  if (!container.value) {
    throw new Error('Container not found');
  }

  try {
    if (props.options?.locale) {
      if (!props.options.locale.code) {
        throw new Error('Locale code is required');
      }

      if (!props.options.locale.ftl) {
        throw new Error('Locale ftl text is required');
      }

      (globalThis as any)['__VUE_PDFJS__'] = {
        locale: props.options.locale.ftl,
      };
    }

    pdfApp.value = await initViewer(container.value, printContainer.value?.printContainer);

    // If locale is set in options, we need to set it in the PDFViewerApplicationOptions as well
    if (props.options?.locale) {
      PDFViewerApplicationOptions.set('lang', props.options?.locale?.code);
    }

    await pdfApp.value.initializedPromise;

    if (platformPrintStrategy && container.value) {
      // pdf.js can only print what the browser lays out on mobile platforms, so
      // the print buttons are taken over and the document is passed to the OS
      container.value.addEventListener('click', onPrintButtonClick, true);
      restoreTriggerPrinting = takeOverTriggerPrinting();
    }

    pdfApp.value.eventBus.on('documentloaded', (
      event: {
        source: PDFViewerApplication
      }
    ) => {
      loadDocumentInfo(event.source.pdfDocument);
      // Ensure loading state is false when document is loaded
      isLoading.value = false;
    });

    emit('pdf-app:loaded');
  } catch (error: unknown) {
    console.error(error);

    if (props.sourceOptions?.onError) {
      props.sourceOptions.onError(error);
    }

    // Set loading to false in case of error
    isLoading.value = false;
  }
}

function clearCacheTimeout() {
  const cacheTimeoutId = pdfApp.value?.pdfRenderingQueue?.idleTimeout;

  if (cacheTimeoutId)
    clearTimeout(cacheTimeoutId)
}

/**
 * Hands the document over to the platform, so that the PDF itself is printed
 * instead of the page as the browser displays it. Returns `false` when the
 * platform could not take over.
 */
async function printWithPlatform(): Promise<boolean> {
  if (!pdfDocument.value || !platformPrintStrategy) {
    return false;
  }

  return printDocumentWithPlatform(
    pdfDocument.value,
    getDocumentFileName(props.source),
    platformPrintStrategy
  );
}

/**
 * Takes over the print buttons on the platforms where the browser cannot print
 * the pages pdf.js renders, and leaves the click to pdf.js everywhere else.
 */
function onPrintButtonClick(event: MouseEvent) {
  const target = event.target as HTMLElement | null;

  if (!target?.closest('#printButton, #secondaryPrint')) {
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();

  printWithPlatform().then((printed) => {
    if (!printed) {
      pdfApp.value?.triggerPrinting();
    }
  });
}

/**
 * `triggerPrinting()` is the documented way to print programmatically, and the
 * toolbar uses it through the event bus, hence both have to be covered. The
 * original method is restored when the component is unmounted, because
 * `PDFViewerApplication` is shared between all the viewers of the page.
 */
function takeOverTriggerPrinting() {
  const app = pdfApp.value!;
  const triggerPrinting = app.triggerPrinting.bind(app);

  app.triggerPrinting = async () => {
    if (await printWithPlatform()) {
      return;
    }

    await triggerPrinting();
  };

  return () => {
    app.triggerPrinting = triggerPrinting;
  };
}


async function initDocument(document: PDFDocumentProxy | null) {
  if (!document || !pdfApp.value) {
    return;
  }

  clearCacheTimeout()

  await loadDocumentInfo(document);

  pdfApp.value?.load(document);
}

async function openSource(source: PDFSource | PDFSourceWithOptions | PDFDocumentProxy) {

  if (!pdfApp.value) {
    return;
  }

  try {
    if (source !== undefined && source !== null) {
      if (source instanceof PDFDocumentProxy) {
        initDocument(source);
      } else {
        initDocument(await processSource(source, {
          ...props.sourceOptions,
          onError: (error) => {
            if (props.sourceOptions?.onError) {
              props.sourceOptions.onError(error);
            } else {
              console.error(error);
            }
          }
        }));
      }
    }
  }
  catch (error) {
    if (props.sourceOptions?.onError) {
      props.sourceOptions.onError(error);
    } else {
      console.error(error);
    }
  }
}

//When the component is updated, we need to fix the viewer because sometimes the css variables are not applied correctly
const fixViewer = () => {
  // We need to mimic the #updateContainerHeightCss because is a private method
  if (!pdfApp.value) {
    return;
  }

  try {
    const pdfAppViewer = pdfApp.value.pdfViewer;
    const containerHeight = pdfAppViewer.container.clientHeight;

    if (containerHeight !== pdfAppViewer.previousContainerHeight) {
      container.value?.style.setProperty("--viewer-container-height", `${containerHeight}px`);
    }
  } catch (error) {
    console.error(error);
  }
}

watch(() => props.source, async (source) => {
  // Always reset loading state when source changes (including to null)
  isLoading.value = true;

  // If the source is null, we'll show loading but no need to try to process it
  if (source === null || source === undefined) {
    return;
  }

  await openSource(source);
}, { immediate: true })

onMounted(async () => {
  await init();

  if (props.source)
    await openSource(props.source);
})

onUpdated(async () => {
  //Wait for the next tick to fix the viewer
  nextTick(() => {
    fixViewer();
  })
})

onUnmounted(async () => {
  if (!pdfApp.value) {
    return;
  }

  container.value?.removeEventListener('click', onPrintButtonClick, true);
  restoreTriggerPrinting?.();
  restoreTriggerPrinting = null;

  // Unbind events
  pdfApp.value.unbindEvents();
  pdfApp.value.unbindWindowEvents();

  await pdfApp.value.close();
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
  <div class="vue-pdfjs" :class="{ 'vue-pdfjs--container-query': props.useContainerQuery }">
    <div class="appContainer" ref="container" id="appContainer">
      <OuterContainer />
      <PrintContainer ref="printContainer" />
    </div>
    <div v-show="isLoading"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; z-index: 999;">
      <slot name="loading">
        <div class="loading">Loading...</div>
      </slot>
    </div>
  </div>
</template>