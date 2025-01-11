import type { Plugin } from 'vue'
import VuePDFjs, { type VuePDFjsProps } from './components/VuePDFjs.vue'
import usePDF from './composable/usePDF'
export * from './types'

export const VuePDFjsPlugin: Plugin = {
  install(app) {
    app.component('VuePDFjs', VuePDFjs)
  }
}

export type { VuePDFjsProps }
export { VuePDFjs, usePDF }
export default VuePDFjsPlugin
