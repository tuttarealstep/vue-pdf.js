<script setup lang="ts">
import { inject } from 'vue';
import { toolbarOptionsKey } from '@/keys';
import ToolbarContainer, { ToolbarContainerProps } from './ToolbarContainer.vue';

const toolbarOptions = inject<ToolbarContainerProps>(toolbarOptionsKey)

</script>

<template>
    <div id="mainContainer">
        <ToolbarContainer :visible="toolbarOptions?.visible" :options="toolbarOptions?.options" />
        <div id="viewerContainer" tabindex="0">
            <div id="viewer" class="pdfViewer"></div>
        </div>
    </div>
</template>