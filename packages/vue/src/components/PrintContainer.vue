<script setup lang="ts">
import { useTemplateRef } from 'vue';

// pdf.js renders the pages that end up in the print output inside
// `#printContainer`, and its stylesheet expects that element to be a direct
// child of `<body>` (see the pdf.js viewer markup, where it sits next to
// `#outerContainer`). Keeping it inside the component tree lets the layout of
// the host page (ancestors with `height`/`overflow`, sibling content) leak
// into the printed document, so it is teleported to `<body>`.
const printContainer = useTemplateRef("printContainer")

defineExpose({
    printContainer
})
</script>

<template>
    <Teleport to="body">
        <div id="printContainer" ref="printContainer"></div>
    </Teleport>
</template>
