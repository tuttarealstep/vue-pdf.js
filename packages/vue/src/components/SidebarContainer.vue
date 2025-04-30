<script setup lang="ts">
import { defineProps, watch, onMounted } from 'vue'

export interface SidebarContainerProps {
    visible?: boolean;
    options?: {
        // View buttons
        viewThumbnail?: boolean;
        viewOutline?: boolean;
        viewAttachments?: boolean;
        viewLayers?: boolean;

        // Current outline item
        currentOutlineItem?: boolean;
    }
}

const props = defineProps<SidebarContainerProps>()

function updateSidebarVisibility(options?: SidebarContainerProps['options']) {
    if (!options) return;
    for (const [key, value] of Object.entries(options)) {
        const el = document.getElementById(key);
        if (el) {
            el.style.display = value === false ? 'none' : '';
        }
    }
}

onMounted(() => {
    updateSidebarVisibility(props.options);
});

watch(() => props.options, (newOptions: SidebarContainerProps['options']) => {
    updateSidebarVisibility(newOptions);
}, { deep: true });
</script>

<template>
    <div id="sidebarContainer" v-show="props.visible !== false">
        <div id="toolbarSidebar" class="toolbarHorizontalGroup">
            <div id="toolbarSidebarLeft">
                <div id="sidebarViewButtons" class="toolbarHorizontalGroup toggled" role="radiogroup">
                    <button id="viewThumbnail" class="toolbarButton toggled" type="button" tabindex="0"
                        data-l10n-id="pdfjs-thumbs-button" role="radio" aria-checked="true"
                        aria-controls="thumbnailView">
                        <span data-l10n-id="pdfjs-thumbs-button-label"></span>
                    </button>
                    <button id="viewOutline" class="toolbarButton" type="button" tabindex="0"
                        data-l10n-id="pdfjs-document-outline-button" role="radio" aria-checked="false"
                        aria-controls="outlineView">
                        <span data-l10n-id="pdfjs-document-outline-button-label"></span>
                    </button>
                    <button id="viewAttachments" class="toolbarButton" type="button" tabindex="0"
                        data-l10n-id="pdfjs-attachments-button" role="radio" aria-checked="false"
                        aria-controls="attachmentsView">
                        <span data-l10n-id="pdfjs-attachments-button-label"></span>
                    </button>
                    <button id="viewLayers" class="toolbarButton" type="button" tabindex="0"
                        data-l10n-id="pdfjs-layers-button" role="radio" aria-checked="false" aria-controls="layersView">
                        <span data-l10n-id="pdfjs-layers-button-label"></span>
                    </button>
                </div>
            </div>

            <div id="toolbarSidebarRight">
                <div id="outlineOptionsContainer" class="toolbarHorizontalGroup">
                    <div class="verticalToolbarSeparator"></div>

                    <button id="currentOutlineItem" class="toolbarButton" type="button" disabled tabindex="0"
                        data-l10n-id="pdfjs-current-outline-item-button">
                        <span data-l10n-id="pdfjs-current-outline-item-button-label"></span>
                    </button>
                </div>
            </div>
        </div>
        <div id="sidebarContent">
            <div id="thumbnailView">
            </div>
            <div id="outlineView" class="hidden">
            </div>
            <div id="attachmentsView" class="hidden">
            </div>
            <div id="layersView" class="hidden">
            </div>
        </div>
        <div id="sidebarResizer"></div>
    </div>
</template>