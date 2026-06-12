import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    define: {
      // `vite.config.ts` maps `PDFJSDev` to the `__PDFJSDEV__` constant that
      // is injected in the bundles at build time, but the test server has no
      // build step: point it to a global that can safely stay undefined, so
      // the pdf.js sources fall back to their development code paths.
      PDFJSDev: 'globalThis.__PDFJSDEV__'
    },
    test: {
      // The error-handling tests intentionally load invalid documents:
      // pdf.js rejects some internal promises (worker messaging, aborted
      // fetches) besides the one surfaced through `onError`, and those
      // would otherwise fail the run even when every test passes
      dangerouslyIgnoreUnhandledErrors: true,
      browser: {
        enabled: true,
        headless: true,
        name: 'chromium',
        provider: 'playwright',
        // https://playwright.dev
        providerOptions: {},
      },
    }
  })
)
