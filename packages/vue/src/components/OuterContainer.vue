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
        <SidebarContainer :visible="sidebarOptions?.visible" />
        <MainContainer />
        <DialogContainer />
    </div>
</template>