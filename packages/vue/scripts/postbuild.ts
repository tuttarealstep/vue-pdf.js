import fs from 'fs'
import path from 'path'

const prefixCssVariables = () => {
    const filePath = path.resolve(__dirname, '../dist/style.css')

    if (!fs.existsSync(filePath)) {
        console.log('[prefixCssVariables] style.css not found, skipping...')
        return
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')

    // Prefix all CSS variables with --vue-pdfjs- (skip already prefixed ones)
    const patchedContent = fileContent.replace(/--(?!vue-pdfjs-)([a-zA-Z0-9-]+)/g, '--vue-pdfjs-$1')

    fs.writeFileSync(filePath, patchedContent)

    console.log('[prefixCssVariables] CSS variables prefixed successfully')
}

const prefixJsFiles = () => {
    const distPath = path.resolve(__dirname, '../dist')
    const cssFilePath = path.resolve(__dirname, '../dist/style.css')

    if (!fs.existsSync(distPath)) {
        console.log('[prefixJsFiles] dist folder not found, skipping...')
        return
    }

    if (!fs.existsSync(cssFilePath)) {
        console.log('[prefixJsFiles] style.css not found, skipping...')
        return
    }

    // Extract all CSS variables from the CSS file
    const cssContent = fs.readFileSync(cssFilePath, 'utf-8')
    const cssVariables = new Set<string>()

    // Find all --vue-pdfjs- prefixed variables
    const matches = cssContent.matchAll(/--vue-pdfjs-([a-zA-Z0-9-]+)/g)
    for (const match of matches) {
        // Store the original variable name (without vue-pdfjs- prefix)
        cssVariables.add(match[1])
    }

    console.log(`[prefixJsFiles] Found ${cssVariables.size} CSS variables to replace`)

    const processJsFile = (filePath: string) => {
        let fileContent = fs.readFileSync(filePath, 'utf-8')
        let changed = false

        // Replace each CSS variable found in the CSS file
        for (const varName of cssVariables) {
            const originalVar = `--${varName}`
            const prefixedVar = `--vue-pdfjs-${varName}`

            // Skip if already prefixed
            if (varName.startsWith('vue-pdfjs-')) {
                continue
            }

            // Replace all occurrences of the original variable with the prefixed one
            const regex = new RegExp(originalVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
            const newContent = fileContent.replace(regex, prefixedVar)

            if (newContent !== fileContent) {
                fileContent = newContent
                changed = true
            }
        }

        if (changed) {
            fs.writeFileSync(filePath, fileContent)
            return true
        }

        return false
    }

    const processDirectory = (dirPath: string): number => {
        let count = 0
        const entries = fs.readdirSync(dirPath, { withFileTypes: true })

        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name)

            if (entry.isDirectory()) {
                count += processDirectory(fullPath)
            } else if (entry.isFile() && entry.name.endsWith('.js')) {
                if (processJsFile(fullPath)) {
                    count++
                    console.log(`[prefixJsFiles] Prefixed: ${entry.name}`)
                }
            }
        }

        return count
    }

    const processedCount = processDirectory(distPath)
    console.log(`[prefixJsFiles] Prefixed ${processedCount} JS file(s)`)
}

prefixCssVariables()
prefixJsFiles()
