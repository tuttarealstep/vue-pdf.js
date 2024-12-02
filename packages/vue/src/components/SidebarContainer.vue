<script setup lang="ts">
import { defineProps } from 'vue'

export interface SidebarContainerProps {
    visible?: boolean;
}

const props = defineProps<SidebarContainerProps>()

</script>

<template>
    <div id="sidebarContainer" v-show="props.visible !== false">
        <div id="toolbarSidebar" class="toolbarHorizontalGroup">
            <div id="toolbarSidebarLeft">
                <div id="sidebarViewButtons" class="toolbarHorizontalGroup toggled" role="radiogroup">
                    <button id="viewThumbnail" class="toolbarButton toggled" type="button" title="Show Thumbnails"
                        tabindex="0" data-l10n-id="pdfjs-thumbs-button" role="radio" aria-checked="true"
                        aria-controls="thumbnailView">
                        <span data-l10n-id="pdfjs-thumbs-button-label">Thumbnails</span>
                    </button>
                    <button id="viewOutline" class="toolbarButton" type="button"
                        title="Show Document Outline (double-click to expand/collapse all items)" tabindex="0"
                        data-l10n-id="pdfjs-document-outline-button" role="radio" aria-checked="false"
                        aria-controls="outlineView">
                        <span data-l10n-id="pdfjs-document-outline-button-label">Document Outline</span>
                    </button>
                    <button id="viewAttachments" class="toolbarButton" type="button" title="Show Attachments"
                        tabindex="0" data-l10n-id="pdfjs-attachments-button" role="radio" aria-checked="false"
                        aria-controls="attachmentsView">
                        <span data-l10n-id="pdfjs-attachments-button-label">Attachments</span>
                    </button>
                    <button id="viewLayers" class="toolbarButton" type="button"
                        title="Show Layers (double-click to reset all layers to the default state)" tabindex="0"
                        data-l10n-id="pdfjs-layers-button" role="radio" aria-checked="false" aria-controls="layersView">
                        <span data-l10n-id="pdfjs-layers-button-label">Layers</span>
                    </button>
                </div>
            </div>

            <div id="toolbarSidebarRight">
                <div id="outlineOptionsContainer" class="toolbarHorizontalGroup">
                    <div class="verticalToolbarSeparator"></div>

                    <button id="currentOutlineItem" class="toolbarButton" type="button" disabled
                        title="Find Current Outline Item" tabindex="0" data-l10n-id="pdfjs-current-outline-item-button">
                        <span data-l10n-id="pdfjs-current-outline-item-button-label">Current Outline Item</span>
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