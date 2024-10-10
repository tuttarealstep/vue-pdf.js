<script setup lang="ts">
import DialogContainer from './DialogContainer.vue';
import MainContainer from './MainContainer.vue';
import SidebarContainer from './SidebarContainer.vue';
</script>

<template>
    <div id="outerContainer">
        <SidebarContainer />
        <MainContainer />
        <DialogContainer />
    </div>
</template>