<script setup lang="ts">
import { defineProps, watch, onMounted } from 'vue'

export interface ViewsManagerProps {
    visible?: boolean;
    options?: {
        // View selector
        viewsManagerSelectorButton?: boolean;
        viewsManagerSelectorOptions?: boolean;

        // View menu buttons
        thumbnailsViewMenu?: boolean;
        outlinesViewMenu?: boolean;
        attachmentsViewMenu?: boolean;
        layersViewMenu?: boolean;

        // Views
        thumbnailsView?: boolean;
        outlinesView?: boolean;
        attachmentsView?: boolean;
        layersView?: boolean;

        // Header buttons
        viewsManagerAddFileButton?: boolean;
        viewsManagerCurrentOutlineButton?: boolean;
        viewsManagerHeaderLabel?: boolean;
    }
}

const props = defineProps<ViewsManagerProps>()

function updateViewsManagerVisibility(options?: ViewsManagerProps['options']) {
    if (!options) return;
    for (const [key, value] of Object.entries(options)) {
        const el = document.getElementById(key);
        if (el) {
            el.style.display = value === false ? 'none' : '';
        }
    }
}

onMounted(() => {
    updateViewsManagerVisibility(props.options);
});

watch(() => props.options, (newOptions: ViewsManagerProps['options']) => {
    updateViewsManagerVisibility(newOptions);
}, { deep: true });
</script>

<template>
    <div id="viewsManager" v-show="props.visible !== false" class="menuContainer sidebar" hidden="true" role="dialog"
        aria-describedby="viewsManagerHeaderLabel" data-l10n-id="pdfjs-views-manager-sidebar">
        <div id="viewsManagerHeader">
            <div id="viewsManagerTitle">
                <div id="viewsManagerSelector">
                    <button class="toolbarButton viewsManagerButton hasPopupMenu" type="button"
                        id="viewsManagerSelectorButton" tabindex="0"
                        data-l10n-id="pdfjs-views-manager-view-selector-button" aria-expanded="false"
                        aria-haspopup="listbox" aria-controls="viewsManagerSelectorOptions">
                        <span data-l10n-id="pdfjs-views-manager-view-selector-button-label"></span>
                    </button>
                    <menu id="viewsManagerSelectorOptions" role="listbox" class="popupMenu withMark">
                        <button id="thumbnailsViewMenu" role="option" type="button" tabindex="-1">
                            <span data-l10n-id="pdfjs-views-manager-pages-option-label"></span>
                        </button>
                        <button id="outlinesViewMenu" role="option" type="button" tabindex="-1">
                            <span data-l10n-id="pdfjs-views-manager-outlines-option-label"></span>
                        </button>
                        <button id="attachmentsViewMenu" role="option" type="button" tabindex="-1">
                            <span data-l10n-id="pdfjs-views-manager-attachments-option-label"></span>
                        </button>
                        <button id="layersViewMenu" role="option" type="button" tabindex="-1">
                            <span data-l10n-id="pdfjs-views-manager-layers-option-label"></span>
                        </button>
                    </menu>
                </div>
                <span id="viewsManagerHeaderLabel" class="viewsManagerLabel" role="heading" aria-level="2"></span>
                <button id="viewsManagerAddFileButton" class="toolbarButton viewsManagerButton" type="button"
                    tabindex="0" data-l10n-id="pdfjs-views-manager-add-file-button" hidden="true">
                    <span data-l10n-id="pdfjs-views-manager-add-file-button-label"></span>
                    <input id="viewsManagerAddFilePicker" type="file" accept="application/pdf" />
                </button>
                <button id="viewsManagerCurrentOutlineButton" class="toolbarButton viewsManagerButton" type="button"
                    tabindex="0" data-l10n-id="pdfjs-current-outline-item-button" hidden="true">
                    <span data-l10n-id="pdfjs-current-outline-item-button-label"></span>
                </button>
            </div>
            <div id="viewsManagerStatus">
                <div id="viewsManagerStatusAction">
                    <span id="viewsManagerStatusActionLabelContainer" class="viewsManagerStatusLabel">
                        <button id="viewsManagerStatusActionDeselectButton" class="hidden" type="button" tabindex="0"
                            role="checkbox" aria-checked="true"
                            aria-labelledby="viewsManagerStatusActionLabel"></button>
                        <span id="viewsManagerStatusActionLabel" class="viewsManagerStatusLabel"
                            data-l10n-id="pdfjs-views-manager-pages-status-none-action-label"></span>
                    </span>
                    <div id="actionSelector">
                        <button id="viewsManagerStatusActionButton" class="viewsManagerButton hasPopupMenu"
                            type="button" tabindex="0" aria-haspopup="menu"
                            aria-controls="viewsManagerStatusActionOptions" aria-expanded="false">
                            <span data-l10n-id="pdfjs-views-manager-pages-status-action-button-label"></span>
                        </button>
                        <menu id="viewsManagerStatusActionOptions" class="popupMenu">
                            <button id="viewsManagerStatusActionCopy" class="noIcon" role="menuitem" type="button"
                                tabindex="-1" disabled>
                                <span data-l10n-id="pdfjs-views-manager-pages-status-copy-button-label"></span>
                            </button>
                            <button id="viewsManagerStatusActionCut" class="noIcon" role="menuitem" type="button"
                                tabindex="-1" disabled>
                                <span data-l10n-id="pdfjs-views-manager-pages-status-cut-button-label"></span>
                            </button>
                            <button id="viewsManagerStatusActionDelete" class="noIcon" role="menuitem" type="button"
                                tabindex="-1" disabled>
                                <span data-l10n-id="pdfjs-views-manager-pages-status-delete-button-label"></span>
                            </button>
                            <button id="viewsManagerStatusActionExport" class="noIcon" role="menuitem" type="button"
                                tabindex="-1" disabled>
                                <span
                                    data-l10n-id="pdfjs-views-manager-pages-status-export-selected-button-label"></span>
                            </button>
                        </menu>
                    </div>
                </div>
                <div id="viewsManagerStatusUndo" class="hidden">
                    <span id="viewsManagerStatusUndoLabel" class="viewsManagerStatusLabel"></span>
                    <div>
                        <button id="viewsManagerStatusUndoButton" class="viewsManagerButton" type="button" tabindex="0">
                            <span data-l10n-id="pdfjs-views-manager-status-undo-button-label"></span>
                        </button>
                        <button id="viewsManagerStatusUndoCloseButton"
                            class="toolbarButton viewsManagerButton viewsCloseButton" type="button" tabindex="0"
                            data-l10n-id="pdfjs-views-manager-status-close-button">
                            <span data-l10n-id="pdfjs-views-manager-status-close-button-label"></span>
                        </button>
                    </div>
                </div>
                <div id="viewsManagerStatusWarning" class="hidden">
                    <span id="viewsManagerStatusWarningLabel" class="viewsManagerStatusLabel"></span>
                    <button id="viewsManagerStatusWarningCloseButton"
                        class="toolbarButton viewsManagerButton viewsCloseButton" type="button" tabindex="0"
                        data-l10n-id="pdfjs-views-manager-status-close-button">
                        <span data-l10n-id="pdfjs-views-manager-status-close-button-label"></span>
                    </button>
                </div>
                <div id="viewsManagerStatusWaiting" class="hidden">
                    <span id="viewsManagerStatusWarningLabel" class="viewsManagerStatusLabel"></span>
                    <button id="viewsManagerStatusWaitingCloseButton"
                        class="toolbarButton viewsManagerButton viewsCloseButton" type="button" tabindex="0"
                        data-l10n-id="pdfjs-views-manager-status-close-button">
                        <span data-l10n-id="pdfjs-views-manager-status-close-button-label"></span>
                    </button>
                </div>
            </div>
        </div>
        <div id="viewsManagerContent" tabindex="-1">
            <div id="thumbnailsView" class="thumbnailsView hidden" tabindex="-1"></div>
            <div id="outlinesView" class="treeView hidden"></div>
            <div id="attachmentsView" class="hidden"></div>
            <div id="layersView" class="treeView hidden"></div>
        </div>
        <div id="viewsManagerResizer" class="sidebarResizer" role="separator" aria-controls="viewsManager" tabindex="0"
            data-l10n-id="pdfjs-views-manager-sidebar-resizer"></div>
    </div>
</template>