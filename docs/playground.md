<script setup lang="ts">
import { defineClientComponent } from 'vitepress'

const PdfComp = defineClientComponent(() => {
  return import("./components/PdfViewer.vue")
})
</script>

# Playground

<div class="pdf_viewer">
  <PdfComp />
</div>

<style>
._vue-pdf_js_playground > div {
    width: 100%;
}
</style>
