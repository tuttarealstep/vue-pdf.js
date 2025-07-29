<script setup lang="ts">
import { sidebarOptionsKey } from '@/keys';
import { inject } from 'vue';
import DialogContainer from './DialogContainer.vue';
import MainContainer from './MainContainer.vue';
import SidebarContainer, { SidebarContainerProps } from './SidebarContainer.vue';

const sidebarOptions = inject<SidebarContainerProps>(sidebarOptionsKey)
</script>

<template>
    <div id="outerContainer">
        <span id="viewer-alert" class="visuallyHidden" role="alert"></span>

        <SidebarContainer :visible="sidebarOptions?.visible" />
        <MainContainer />
        <DialogContainer />

        <div id="editorUndoBar" class="messageBar" role="status" aria-labelledby="editorUndoBarMessage" tabindex="-1"
            hidden>
            <div>
                <div>
                    <span id="editorUndoBarMessage" class="description"></span>
                </div>
                <button id="editorUndoBarUndoButton" class="undoButton" type="button" tabindex="0"
                    data-l10n-id="pdfjs-editor-undo-bar-undo-button">
                    <span data-l10n-id="pdfjs-editor-undo-bar-undo-button-label"></span>
                </button>
                <button id="editorUndoBarCloseButton" class="closeButton" type="button" tabindex="0"
                    data-l10n-id="pdfjs-editor-undo-bar-close-button">
                    <span data-l10n-id="pdfjs-editor-undo-bar-close-button-label"></span>
                </button>
            </div>
        </div>
    </div>
</template>