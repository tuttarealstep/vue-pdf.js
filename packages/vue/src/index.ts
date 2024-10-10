import type { Plugin } from 'vue';
import VuePDFjs from './components/VuePDFjs.vue';
import usePDF from './composable/usePDF';

export const VuePDFjsPlugin: Plugin = {
    install(app) {
        app.component('VuePDFjs', VuePDFjs);
    }
};

export { VuePDFjs, usePDF };
export default VuePDFjsPlugin;