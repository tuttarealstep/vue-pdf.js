import fs from 'fs'
import path from 'path'

const prefixCssVariables = () => {
    const filePath = path.resolve(__dirname, '../dist/style.css')
    
    if (!fs.existsSync(filePath)) {
        console.log('[prefixCssVariables] style.css not found, skipping...')
        return
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')

    if (fileContent.includes('--vue-pdfjs-')) {
        console.log('[prefixCssVariables] Already prefixed')
        return
    }

    // Prefix all CSS variables with --vue-pdfjs-
    const patchedContent = fileContent.replace(/--([a-zA-Z0-9-]+)/g, '--vue-pdfjs-$1')

    fs.writeFileSync(filePath, patchedContent)

    console.log('[prefixCssVariables] CSS variables prefixed successfully')
}

prefixCssVariables()
