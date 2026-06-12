// Entry point for the bundled pdf.js worker, so that the compatibility
// polyfills are loaded inside the worker context as well.
import './compatibility'
//@ts-ignore
import 'pdf.js/src/pdf.worker.js'
