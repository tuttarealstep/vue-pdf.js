<script setup lang="ts">
import '../assets/scss/main.scss'

import { onMounted, onUnmounted, ref, shallowRef, provide, watch, onUpdated, nextTick } from 'vue';
import { initViewer, PDFViewerApplicationOptions } from '../scripts/viewer';

import OuterContainer from './OuterContainer.vue';
import PrintContainer from './PrintContainer.vue';
import { PDFSourceOptions, PDFSource, PDFSourceWithOptions, PDFInfo } from '../types';
import { processSource } from '../scripts/utils';
//@ts-ignore
import { PDFDocumentLoadingTask, PDFDocumentProxy } from 'pdf.js/src/display/api';
//@ts-ignore
import { PDFViewerApplication } from 'pdf.js/web/app';
import { ToolbarContainerProps } from './ToolbarContainer.vue';
import { sidebarOptionsKey, toolbarOptionsKey } from '@/keys';
import { SidebarContainerProps } from './SidebarContainer.vue';

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
    sidebar?: SidebarContainerProps
  }
}

const props = withDefaults(defineProps<VuePDFjsProps>(), {
  source: null,
  useContainerQuery: true,
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

provide(toolbarOptionsKey, props.options?.toolbar)
provide(sidebarOptionsKey, props.options?.sidebar)

async function loadDocumentInfo(document: PDFDocumentProxy) {
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

      PDFViewerApplicationOptions.set('lang', props.options?.locale?.code);
      (globalThis as any)['__VUE_PDFJS__'] = {
        locale: props.options.locale.ftl,
      };
    }

    pdfApp.value = await initViewer(container.value);
    await pdfApp.value.initializedPromise;

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
      <span id="viewer-alert" class="visuallyHidden" role="alert"></span>
      <OuterContainer />
      <PrintContainer />
    </div>
    <div v-show="isLoading"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; z-index: 999;">
      <slot name="loading">
        <div class="loading">Loading...</div>
      </slot>
    </div>
  </div>
</template>