/* 
We need to perform small surgery to make it work!
Inside the "../node_modules/pdf.js/web/genericl10n.js" file, we have the following code:

```js
static async #createBundle(lang, baseURL, paths) {
    const path = paths[lang];
    if (!path) {
        return null;
    }
    ...
```

We need to change it to:

```js
static async #createBundle(lang, baseURL, paths) {
    const path = paths[lang];
    if (!path) {
        if (
            window.__VUE_PDFJS__ &&
            window.__VUE_PDFJS__.locale &&
            typeof window.__VUE_PDFJS__.locale === "string"
        ) {
            return createBundle(lang, window.__VUE_PDFJS__.locale);
        }
        return null;
    }
    ...
```

Inside the "../node_modules/pdf.js/web/viewer.css" file, we have the following code:

```css
html,
body {
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
  background-color: var(--body-bg-color);
  scrollbar-color: var(--scrollbar-color) var(--scrollbar-bg-color);

  &.wait::before {
    content: "";
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100000;
    cursor: wait;
  }
}

.hidden,
[hidden] {
  display: none !important;
}
```

We need to comment it.
*/
import fs from 'fs'
import path from 'path'

const patchGenericl10n = () => {
    const filePath = path.resolve(__dirname, '../node_modules/pdf.js/web/genericl10n.js')
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    /*
    Search exact match of the following code:
    static async #createBundle(lang, baseURL, paths) {
        const path = paths[lang];
        if (!path) {
            return null;
        }
    
    Ingnore spaces and line breaks
    */

    if (fileContent.includes('@@patchGenericl10n')) {
        console.log('[patchGenericl10n] Already patched')
        return
    }

    const patchedContent = fileContent.replace(/static\s+async\s+#createBundle\(lang,\s+baseURL,\s+paths\)\s+{\s+const\s+path\s+=\s+paths\[lang\];\s+if\s*\(\!path\)\s+{\s+return\s+null;\s+}/,
        `static async #createBundle(lang, baseURL, paths) {
    const path = paths[lang];
    if (!path) {
        //@@patchGenericl10n
        if (
            window.__VUE_PDFJS__ &&
            window.__VUE_PDFJS__.locale &&
            typeof window.__VUE_PDFJS__.locale === "string"
        ) {
            return createBundle(lang, window.__VUE_PDFJS__.locale);
        }
        return null;
    }
`
    )

    fs.writeFileSync(filePath, patchedContent)

    console.log('[patchGenericl10n] Patched')
}

const patchViewerCss = () => {
    const filePath = path.resolve(__dirname, '../node_modules/pdf.js/web/viewer.css')
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    /*
    Before 
    html,
    body {
    ...

    Prepend /* to comment it

    After
    .hidden,
    [hidden] {
    display: none !important;
    }

    Append *\/ to close it
    */

    if (fileContent.includes('@@patchViewerCss')) {
        console.log('[patchViewerCss] Already patched')
        return
    }

    const patchedContent = fileContent.replace(/html,\s+body\s+{/, '/* @@patchViewerCss \nhtml,\nbody {')
        .replace(/.hidden,\s+\[hidden\]\s+{\s+display:\s+none\s+!important;\s+}/,
            '/* .hidden,\n[hidden] {\n  display: none !important;\n} */')

    fs.writeFileSync(filePath, patchedContent)

    console.log('[patchViewerCss] Patched')
}


patchGenericl10n()
patchViewerCss()