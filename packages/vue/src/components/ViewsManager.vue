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

function updateSidebarVisibility(options?: ViewsManagerProps['options']) {
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

watch(() => props.options, (newOptions: ViewsManagerProps['options']) => {
    updateSidebarVisibility(newOptions);
}, { deep: true });
</script>

<template>
    <div id="viewsManager" v-show="props.visible !== false" class="menuContainer sidebar" hidden="true" role="dialog"
        aria-describedby="viewsManagerHeaderLabel" data-l10n-id="pdfjs-views-manager-sidebar">
        <div id="viewsManagerHeader" role="heading" aria-level="2">
            <div id="viewsManagerTitle">
                <div id="viewsManagerSelector">
                    <button class="toolbarButton viewsManagerButton" type="button" id="viewsManagerSelectorButton"
                        tabindex="0" data-l10n-id="pdfjs-views-manager-view-selector-button" aria-expanded="false"
                        aria-haspopup="listbox" aria-controls="viewsManagerSelectorOptions">
                        <span data-l10n-id="pdfjs-views-manager-view-selector-button-label"></span>
                    </button>
                    <menu id="viewsManagerSelectorOptions" role="listbox" class="popupMenu hidden withMark">
                        <li>
                            <button id="thumbnailsViewMenu" role="option" type="button" tabindex="-1">
                                <span data-l10n-id="pdfjs-views-manager-pages-option-label"></span>
                            </button>
                        </li>
                        <li>
                            <button id="outlinesViewMenu" role="option" type="button" tabindex="-1">
                                <span data-l10n-id="pdfjs-views-manager-outlines-option-label"></span>
                            </button>
                        </li>
                        <li>
                            <button id="attachmentsViewMenu" role="option" type="button" tabindex="-1">
                                <span data-l10n-id="pdfjs-views-manager-attachments-option-label"></span>
                            </button>
                        </li>
                        <li>
                            <button id="layersViewMenu" role="option" type="button" tabindex="-1">
                                <span data-l10n-id="pdfjs-views-manager-layers-option-label"></span>
                            </button>
                        </li>
                    </menu>
                </div>
                <span id="viewsManagerHeaderLabel" class="viewsManagerLabel"></span>
                <button id="viewsManagerAddFileButton" class="toolbarButton viewsManagerButton" type="button"
                    tabindex="0" data-l10n-id="pdfjs-views-manager-add-file-button" hidden="true">
                    <span data-l10n-id="pdfjs-views-manager-add-file-button-label"></span>
                </button>
                <button id="viewsManagerCurrentOutlineButton" class="toolbarButton viewsManagerButton" type="button"
                    tabindex="0" data-l10n-id="pdfjs-current-outline-item-button" hidden="true">
                    <span data-l10n-id="pdfjs-current-outline-item-button-label"></span>
                </button>
            </div>
            <div id="viewsManagerStatus">
                <div id="viewsManagerStatusAction" class="hidden">
                    <span id="viewsManagerStatusActionLabel" class="viewsManagerStatusLabel"
                        data-l10n-id="pdfjs-views-manager-pages-status-none-action-label"></span>
                    <div id="actionSelector">
                        <button id="viewsManagerStatusActionButton" class="viewsManagerButton" type="button"
                            tabindex="0" aria-haspopup="menu" aria-controls="viewsManagerStatusActionOptions">
                            <span data-l10n-id="pdfjs-views-manager-pages-status-action-button-label"></span>
                        </button>
                        <menu id="viewsManagerStatusActionOptions" class="popupMenu hidden">
                            <li>
                                <button id="viewsManagerStatusActionCopy" class="noIcon" role="menuitem" type="button"
                                    tabindex="0">
                                    <span data-l10n-id="pdfjs-views-manager-pages-status-copy-button-label"></span>
                                </button>
                            </li>
                            <li>
                                <button id="viewsManagerStatusActionCut" class="noIcon" role="menuitem" type="button"
                                    tabindex="0">
                                    <span data-l10n-id="pdfjs-views-manager-pages-status-cut-button-label"></span>
                                </button>
                            </li>
                            <li>
                                <button id="viewsManagerStatusActionDelete" class="noIcon" role="menuitem" type="button"
                                    tabindex="0">
                                    <span data-l10n-id="pdfjs-views-manager-pages-status-delete-button-label"></span>
                                </button>
                            </li>
                            <li>
                                <button id="viewsManagerStatusActionSaveAs" class="noIcon" role="menuitem" type="button"
                                    tabindex="0">
                                    <span data-l10n-id="pdfjs-views-manager-pages-status-save-as-button-label"></span>
                                </button>
                            </li>
                        </menu>
                    </div>
                </div>
                <div id="viewsManagerStatusUndo" class="hidden">
                    <span class="viewsManagerStatusLabel" data-l10n-id="pdfjs-views-manager-status-undo-cut-label"
                        data-l10n-args='{"count": 0}'></span>
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
                    <span class="viewsManagerStatusLabel"></span>
                    <button id="viewsManagerStatusWarningCloseButton"
                        class="toolbarButton viewsManagerButton viewsCloseButton" type="button" tabindex="0"
                        data-l10n-id="pdfjs-views-manager-status-close-button">
                        <span data-l10n-id="pdfjs-views-manager-status-close-button-label"></span>
                    </button>
                </div>
                <div id="viewsManagerStatusWaiting" class="hidden">
                    <span class="viewsManagerStatusLabel"></span>
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
        <div id="viewsManagerResizer" class="sidebarResizer"></div>
    </div>
</template>