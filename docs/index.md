---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "vue-pdfjs"
  text: "Display PDF files using the standard PDF.js viewer"
  tagline: This package provides a simple and powerful integration to embed the PDF,js viewer in Vue applications.
  actions:
    - theme: brand
      text: Quick Start
      link: /guide/getting-started
    - theme: alt
      text: Examples
      link: /examples/basic-examples
  image:
    src: /logo.webp
    alt: "vue-pdfjs"

features:
  - title: A powerful wrapper
    icon: 💯
    details: All the features of the Mozilla's PDF.js viewer are available.
  - title: Customizable
    icon: 🎨
    details: Customize the aspect of the viewer, you can import the default style or create your own.
  - title: Easy to use
    icon: 🚀
    details: Just import the component and pass the PDF file, that's it!
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(45deg, #3fb984 45%, #31475e);

  --vp-home-hero-image-background-image: linear-gradient(45deg, #3fb984 50%, #31475e 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
