import { defineConfig } from "vitepress";
import llmstxt from 'vitepress-plugin-llms'
import { version } from "../../packages/vue/package.json";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue-pdfjs",
  description:
    "A Vue component for displaying PDF files using the standard `pdf.js` viewer. This package provides a simple and powerful integration to embed PDF viewers in Vue applications.",
  base: "/vue-pdf.js/",
  themeConfig: {
    logo: { src: "/vue_pdfjs.svg", width: 48, height: 48 },

    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/examples/basic-examples" },
      {
        text: `v${version}`,
        items: [
          {
            text: "Changelog",
            link: "https://github.com/tuttarealstep/vue-pdf.js/releases",
          },
        ],
      },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "Props", link: "/guide/props" },
          { text: "Events", link: "/guide/events" },
          { text: "Slots", link: "/guide/slots" },
          { text: "Composables", link: "/guide/composables" },
        ],
      }, {
        text: "Customization",
        items: [
          { text: "Customization Options", link: "/guide/customization" },
          { text: "API Reference", link: "/guide/api-reference" },
          { text: "Advanced Usage", link: "/guide/advanced-usage" },
        ],
      },
      {
        text: "Examples",
        items: [
          { text: "Basic Examples", link: "/examples/basic-examples" },
          { text: "Usage with Nuxt", link: "/examples/nuxt-example" },
        ],
      }, {
        text: "Interactive Demos",
        items: [
          { text: "Playground", link: "/playground" },
          { text: "Events Demo", link: "/events-demo" },
          { text: "Customization Demo", link: "/customization-demo" },
          { text: "Slots Demo", link: "/slots-demo" },
          { text: "API Reference Demo", link: "/api-reference-demo" },
        ]
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/tuttarealstep/vue-pdf.js" },
      {
        icon: "npm",
        link: "https://www.npmjs.com/package/@tuttarealstep/vue-pdf.js",
      },
    ],
  },
  vite: {
    plugins: [llmstxt()]
  }
});
