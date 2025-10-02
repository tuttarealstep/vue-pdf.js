<script setup lang="ts">
import { defineProps, watch, onMounted } from 'vue'

export interface ToolbarContainerProps {
    visible?: boolean;
    options?: {
        toolbarViewerLeft?: boolean;
        toolbarViewerMiddle?: boolean;
        toolbarViewerRight?: boolean;
        sidebarToggleButton?: boolean;
        viewFindButton?: boolean;
        previous?: boolean;
        next?: boolean;
        zoomOutButton?: boolean;
        zoomInButton?: boolean;
        scaleSelectContainer?: boolean;
        editorHighlight?: boolean;
        editorFreeText?: boolean;
        editorInk?: boolean;
        editorStamp?: boolean;
        printButton?: boolean;
        downloadButton?: boolean;
        secondaryToolbarToggle?: boolean;
        secondaryOpenFile?: boolean;
        secondaryPrint?: boolean;
        secondaryDownload?: boolean;
        presentationMode?: boolean;
        viewBookmark?: boolean;
        firstPage?: boolean;
        lastPage?: boolean;
        pageRotateCw?: boolean;
        pageRotateCcw?: boolean;
        cursorSelectTool?: boolean;
        cursorHandTool?: boolean;
        scrollPage?: boolean;
        scrollVertical?: boolean;
        scrollHorizontal?: boolean;
        scrollWrapped?: boolean;
        spreadNone?: boolean;
        spreadOdd?: boolean;
        spreadEven?: boolean;
        documentProperties?: boolean;
    }
}


const props = defineProps<ToolbarContainerProps>()

function updateToolbarVisibility(options?: Record<string, boolean>) {
    if (!options) return;
    for (const [key, value] of Object.entries(options)) {
        const el = document.getElementById(key);
        if (el) {
            el.style.display = value === false ? 'none' : '';
        }
    }
}

onMounted(() => {
    updateToolbarVisibility(props.options);
});

watch(() => props.options, (newOptions: Record<string, boolean> | undefined) => {
    updateToolbarVisibility(newOptions);
}, { deep: true });

</script>

<template>
    <div class="toolbar" v-show="props.visible !== false">
        <div id="toolbarContainer">
            <div id="toolbarViewer" class="toolbarHorizontalGroup">
                <div id="toolbarViewerLeft" class="toolbarHorizontalGroup">
                    <button id="sidebarToggleButton" class="toolbarButton" type="button" tabindex="0"
                        data-l10n-id="pdfjs-toggle-sidebar-button" aria-expanded="false" aria-haspopup="true"
                        aria-controls="sidebarContainer">
                        <span data-l10n-id="pdfjs-toggle-sidebar-button-label"></span>
                    </button>
                    <div class="toolbarButtonSpacer"></div>
                    <div class="toolbarButtonWithContainer">
                        <button id="viewFindButton" class="toolbarButton" type="button" tabindex="0"
                            data-l10n-id="pdfjs-findbar-button" aria-expanded="false" aria-controls="findbar">
                            <span data-l10n-id="pdfjs-findbar-button-label"></span>
                        </button>
                        <div class="hidden doorHanger toolbarHorizontalGroup" id="findbar">
                            <div id="findInputContainer" class="toolbarHorizontalGroup">
                                <span class="loadingInput end toolbarHorizontalGroup">
                                    <input id="findInput" class="toolbarField" tabindex="0"
                                        data-l10n-id="pdfjs-find-input" aria-invalid="false">
                                </span>
                                <div class="toolbarHorizontalGroup">
                                    <button id="findPreviousButton" class="toolbarButton" type="button" tabindex="0"
                                        data-l10n-id="pdfjs-find-previous-button">
                                        <span data-l10n-id="pdfjs-find-previous-button-label"></span>
                                    </button>
                                    <div class="splitToolbarButtonSeparator"></div>
                                    <button id="findNextButton" class="toolbarButton" type="button" tabindex="0"
                                        data-l10n-id="pdfjs-find-next-button">
                                        <span data-l10n-id="pdfjs-find-next-button-label"></span>
                                    </button>
                                </div>
                            </div>

                            <div id="findbarOptionsOneContainer" class="toolbarHorizontalGroup">
                                <div class="toggleButton toolbarLabel">
                                    <input type="checkbox" id="findHighlightAll" tabindex="0" />
                                    <label for="findHighlightAll" data-l10n-id="pdfjs-find-highlight-checkbox"></label>
                                </div>
                                <div class="toggleButton toolbarLabel">
                                    <input type="checkbox" id="findMatchCase" tabindex="0" />
                                    <label for="findMatchCase"
                                        data-l10n-id="pdfjs-find-match-case-checkbox-label"></label>
                                </div>
                            </div>
                            <div id="findbarOptionsTwoContainer" class="toolbarHorizontalGroup">
                                <div class="toggleButton toolbarLabel">
                                    <input type="checkbox" id="findMatchDiacritics" tabindex="0" />
                                    <label for="findMatchDiacritics"
                                        data-l10n-id="pdfjs-find-match-diacritics-checkbox-label"></label>
                                </div>
                                <div class="toggleButton toolbarLabel">
                                    <input type="checkbox" id="findEntireWord" tabindex="0" />
                                    <label for="findEntireWord"
                                        data-l10n-id="pdfjs-find-entire-word-checkbox-label"></label>
                                </div>
                            </div>

                            <div id="findbarMessageContainer" class="toolbarHorizontalGroup" aria-live="polite">
                                <span id="findResultsCount" class="toolbarLabel"></span>
                                <span id="findMsg" class="toolbarLabel"></span>
                            </div>
                        </div> <!-- findbar -->
                    </div>
                    <div class="toolbarHorizontalGroup hiddenSmallView">
                        <button class="toolbarButton" type="button" id="previous" tabindex="0"
                            data-l10n-id="pdfjs-previous-button">
                            <span data-l10n-id="pdfjs-previous-button-label"></span>
                        </button>
                        <div class="splitToolbarButtonSeparator"></div>
                        <button class="toolbarButton" type="button" id="next" tabindex="0"
                            data-l10n-id="pdfjs-next-button">
                            <span data-l10n-id="pdfjs-next-button-label"></span>
                        </button>
                    </div>
                    <div class="toolbarHorizontalGroup">
                        <span class="loadingInput start toolbarHorizontalGroup">
                            <input type="number" id="pageNumber" class="toolbarField" value="1" min="1" tabindex="0"
                                data-l10n-id="pdfjs-page-input" autocomplete="off">
                        </span>
                        <span id="numPages" class="toolbarLabel"></span>
                    </div>
                </div>
                <div id="toolbarViewerMiddle" class="toolbarHorizontalGroup">
                    <div class="toolbarHorizontalGroup">
                        <button id="zoomOutButton" class="toolbarButton" type="button" tabindex="0"
                            data-l10n-id="pdfjs-zoom-out-button">
                            <span data-l10n-id="pdfjs-zoom-out-button-label"></span>
                        </button>
                        <div class="splitToolbarButtonSeparator"></div>
                        <button id="zoomInButton" class="toolbarButton" type="button" tabindex="0"
                            data-l10n-id="pdfjs-zoom-in-button">
                            <span data-l10n-id="pdfjs-zoom-in-button-label"></span>
                        </button>
                    </div>
                    <span id="scaleSelectContainer" class="dropdownToolbarButton">
                        <select id="scaleSelect" tabindex="0" data-l10n-id="pdfjs-zoom-select">
                            <option id="pageAutoOption" value="auto" selected data-l10n-id="pdfjs-page-scale-auto">
                            </option>
                            <option id="pageActualOption" value="page-actual" data-l10n-id="pdfjs-page-scale-actual">
                            </option>
                            <option id="pageFitOption" value="page-fit" data-l10n-id="pdfjs-page-scale-fit"></option>
                            <option id="pageWidthOption" value="page-width" data-l10n-id="pdfjs-page-scale-width">
                            </option>
                            <option id="customScaleOption" value="custom" :disabled="true" hidden
                                data-l10n-id="pdfjs-page-scale-percent" data-l10n-args='{ "scale": 0 }'></option>
                            <option value="0.5" data-l10n-id="pdfjs-page-scale-percent"
                                data-l10n-args='{ "scale": 50 }'>
                            </option>
                            <option value="0.75" data-l10n-id="pdfjs-page-scale-percent"
                                data-l10n-args='{ "scale": 75 }'>
                            </option>
                            <option value="1" data-l10n-id="pdfjs-page-scale-percent" data-l10n-args='{ "scale": 100 }'>
                            </option>
                            <option value="1.25" data-l10n-id="pdfjs-page-scale-percent"
                                data-l10n-args='{ "scale": 125 }'>
                            </option>
                            <option value="1.5" data-l10n-id="pdfjs-page-scale-percent"
                                data-l10n-args='{ "scale": 150 }'>
                            </option>
                            <option value="2" data-l10n-id="pdfjs-page-scale-percent" data-l10n-args='{ "scale": 200 }'>
                            </option>
                            <option value="3" data-l10n-id="pdfjs-page-scale-percent" data-l10n-args='{ "scale": 300 }'>
                            </option>
                            <option value="4" data-l10n-id="pdfjs-page-scale-percent" data-l10n-args='{ "scale": 400 }'>
                            </option>
                        </select>
                    </span>
                </div>
                <div id="toolbarViewerRight" class="toolbarHorizontalGroup">
                    <div id="editorModeButtons" class="toolbarHorizontalGroup" role="radiogroup">
                        <div id="editorComment" class="toolbarButtonWithContainer" hidden="true">
                            <button id="editorCommentButton" class="toolbarButton" type="button" tabindex="0" disabled
                                role="radio" aria-expanded="false" aria-haspopup="true"
                                aria-controls="editorCommentParamsToolbar" data-l10n-id="pdfjs-editor-comment-button">
                                <span data-l10n-id="pdfjs-editor-comment-button-label"></span>
                            </button>
                            <div class="editorParamsToolbar sidebar hidden menu" id="editorCommentParamsToolbar">
                                <div id="editorCommentsSidebar" class="menuContainer" role="landmark"
                                    aria-labelledby="editorCommentsSidebarHeader">
                                    <div id="editorCommentsSidebarHeader" role="heading" aria-level="2">
                                        <span class="commentCount">
                                            <span id="editorCommentsSidebarTitle"
                                                data-l10n-id="pdfjs-editor-comments-sidebar-title"
                                                data-l10n-args='{ "count": 0 }'></span>
                                            <span id="editorCommentsSidebarCount"></span>
                                        </span>
                                        <button id="editorCommentsSidebarCloseButton" type="button" tabindex="0"
                                            data-l10n-id="pdfjs-editor-comments-sidebar-close-button">
                                            <span
                                                data-l10n-id="pdfjs-editor-comments-sidebar-close-button-label"></span>
                                        </button>
                                    </div>
                                    <ul id="editorCommentsSidebarList"></ul>
                                </div>
                            </div>
                        </div>
                        <div id="editorSignature" class="toolbarButtonWithContainer" hidden="true">
                            <button id="editorSignatureButton" class="toolbarButton" type="button" tabindex="0"
                                :disabled="true" role="radio" aria-expanded="false" aria-haspopup="true"
                                aria-controls="editorSignatureParamsToolbar"
                                data-l10n-id="pdfjs-editor-signature-button">
                                <span data-l10n-id="pdfjs-editor-signature-button-label"></span>
                            </button>
                            <div class="editorParamsToolbar hidden doorHangerRight menu"
                                id="editorSignatureParamsToolbar">
                                <div id="addSignatureDoorHanger" class="menuContainer" role="region"
                                    data-l10n-id="pdfjs-editor-add-signature-container">
                                    <button id="editorSignatureAddSignature" class="toolbarButton labeled" type="button"
                                        tabindex="0" data-l10n-id="pdfjs-editor-signature-add-signature-button">
                                        <span data-l10n-id="pdfjs-editor-signature-add-signature-button-label"
                                            class="editorParamsLabel"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="editorHighlight" class="toolbarButtonWithContainer">
                            <button id="editorHighlightButton" class="toolbarButton" type="button" :disabled="true"
                                role="radio" aria-expanded="false" aria-haspopup="true"
                                aria-controls="editorHighlightParamsToolbar" tabindex="0"
                                data-l10n-id="pdfjs-editor-highlight-button">
                                <span data-l10n-id="pdfjs-editor-highlight-button-label"></span>
                            </button>
                            <div class="editorParamsToolbar hidden doorHangerRight" id="editorHighlightParamsToolbar">
                                <div id="highlightParamsToolbarContainer" class="editorParamsToolbarContainer">
                                    <div id="editorHighlightColorPicker" class="colorPicker">
                                        <span id="highlightColorPickerLabel" class="editorParamsLabel"
                                            data-l10n-id="pdfjs-editor-highlight-colorpicker-label"></span>
                                    </div>
                                    <div id="editorHighlightThickness">
                                        <label for="editorFreeHighlightThickness" class="editorParamsLabel"
                                            data-l10n-id="pdfjs-editor-free-highlight-thickness-input"></label>
                                        <div class="thicknessPicker">
                                            <input type="range" id="editorFreeHighlightThickness"
                                                class="editorParamsSlider"
                                                data-l10n-id="pdfjs-editor-free-highlight-thickness-title" value="12"
                                                min="8" max="24" step="1" tabindex="0">
                                        </div>
                                    </div>
                                    <div id="editorHighlightVisibility">
                                        <div class="divider"></div>
                                        <div class="toggler">
                                            <label for="editorHighlightShowAll" class="editorParamsLabel"
                                                data-l10n-id="pdfjs-editor-highlight-show-all-button-label"></label>
                                            <button id="editorHighlightShowAll" class="toggle-button" type="button"
                                                data-l10n-id="pdfjs-editor-highlight-show-all-button"
                                                aria-pressed="true" tabindex="0"></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="editorFreeText" class="toolbarButtonWithContainer">
                            <button id="editorFreeTextButton" class="toolbarButton" type="button" :disabled="true"
                                role="radio" aria-expanded="false" aria-haspopup="true"
                                aria-controls="editorFreeTextParamsToolbar" tabindex="0"
                                data-l10n-id="pdfjs-editor-free-text-button">
                                <span data-l10n-id="pdfjs-editor-free-text-button-label"></span>
                            </button>
                            <div class="editorParamsToolbar hidden doorHangerRight" id="editorFreeTextParamsToolbar">
                                <div class="editorParamsToolbarContainer">
                                    <div class="editorParamsSetter">
                                        <label for="editorFreeTextColor" class="editorParamsLabel"
                                            data-l10n-id="pdfjs-editor-free-text-color-input"></label>
                                        <input type="color" id="editorFreeTextColor" class="editorParamsColor"
                                            tabindex="0">
                                    </div>
                                    <div class="editorParamsSetter">
                                        <label for="editorFreeTextFontSize" class="editorParamsLabel"
                                            data-l10n-id="pdfjs-editor-free-text-size-input"></label>
                                        <input type="range" id="editorFreeTextFontSize" class="editorParamsSlider"
                                            value="10" min="5" max="100" step="1" tabindex="0">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="editorInk" class="toolbarButtonWithContainer">
                            <button id="editorInkButton" class="toolbarButton" type="button" :disabled="true"
                                role="radio" aria-expanded="false" aria-haspopup="true"
                                aria-controls="editorInkParamsToolbar" tabindex="0"
                                data-l10n-id="pdfjs-editor-ink-button">
                                <span data-l10n-id="pdfjs-editor-ink-button-label"></span>
                            </button>
                            <div class="editorParamsToolbar hidden doorHangerRight" id="editorInkParamsToolbar">
                                <div class="editorParamsToolbarContainer">
                                    <div class="editorParamsSetter">
                                        <label for="editorInkColor" class="editorParamsLabel"
                                            data-l10n-id="pdfjs-editor-ink-color-input"></label>
                                        <input type="color" id="editorInkColor" class="editorParamsColor" tabindex="0">
                                    </div>
                                    <div class="editorParamsSetter">
                                        <label for="editorInkThickness" class="editorParamsLabel"
                                            data-l10n-id="pdfjs-editor-ink-thickness-input"></label>
                                        <input type="range" id="editorInkThickness" class="editorParamsSlider" value="1"
                                            min="1" max="20" step="1" tabindex="0">
                                    </div>
                                    <div class="editorParamsSetter">
                                        <label for="editorInkOpacity" class="editorParamsLabel"
                                            data-l10n-id="pdfjs-editor-ink-opacity-input"></label>
                                        <input type="range" id="editorInkOpacity" class="editorParamsSlider" value="1"
                                            min="0.05" max="1" step="0.05" tabindex="0">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="editorStamp" class="toolbarButtonWithContainer">
                            <button id="editorStampButton" class="toolbarButton" type="button" :disabled="true"
                                role="radio" aria-expanded="false" aria-haspopup="true"
                                aria-controls="editorStampParamsToolbar" tabindex="0"
                                data-l10n-id="pdfjs-editor-stamp-button">
                                <span data-l10n-id="pdfjs-editor-stamp-button-label"></span>
                            </button>
                            <div class="editorParamsToolbar hidden doorHangerRight menu" id="editorStampParamsToolbar">
                                <div class="menuContainer">
                                    <button id="editorStampAddImage" class="toolbarButton labeled" type="button"
                                        tabindex="0" data-l10n-id="pdfjs-editor-stamp-add-image-button">
                                        <span class="editorParamsLabel"
                                            data-l10n-id="pdfjs-editor-stamp-add-image-button-label"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="editorModeSeparator" class="verticalToolbarSeparator"></div>

                    <div class="toolbarHorizontalGroup hiddenMediumView">
                        <button id="printButton" class="toolbarButton" type="button" tabindex="0"
                            data-l10n-id="pdfjs-print-button">
                            <span data-l10n-id="pdfjs-print-button-label"></span>
                        </button>

                        <button id="downloadButton" class="toolbarButton" type="button" tabindex="0"
                            data-l10n-id="pdfjs-save-button">
                            <span data-l10n-id="pdfjs-save-button-label"></span>
                        </button>
                    </div>

                    <div class="verticalToolbarSeparator hiddenMediumView"></div>

                    <div id="secondaryToolbarToggle" class="toolbarButtonWithContainer">
                        <button id="secondaryToolbarToggleButton" class="toolbarButton" type="button" tabindex="0"
                            data-l10n-id="pdfjs-tools-button" aria-expanded="false" aria-haspopup="true"
                            aria-controls="secondaryToolbar">
                            <span data-l10n-id="pdfjs-tools-button-label"></span>
                        </button>
                        <div id="secondaryToolbar" class="hidden doorHangerRight menu">
                            <div id="secondaryToolbarButtonContainer" class="menuContainer">
                                <!--#if GENERIC-->
                                <button id="secondaryOpenFile" class="toolbarButton labeled" type="button" tabindex="0"
                                    data-l10n-id="pdfjs-open-file-button">
                                    <span data-l10n-id="pdfjs-open-file-button-label"></span>
                                </button>
                                <!--#endif-->

                                <div class="visibleMediumView">
                                    <button id="secondaryPrint" class="toolbarButton labeled" type="button" tabindex="0"
                                        data-l10n-id="pdfjs-print-button">
                                        <span data-l10n-id="pdfjs-print-button-label"></span>
                                    </button>

                                    <button id="secondaryDownload" class="toolbarButton labeled" type="button"
                                        tabindex="0" data-l10n-id="pdfjs-save-button">
                                        <span data-l10n-id="pdfjs-save-button-label"></span>
                                    </button>

                                    <!--#if !GENERIC-->
                                    <!--            <div class="horizontalToolbarSeparator"></div>-->
                                    <!--#endif-->
                                </div>

                                <!--#if GENERIC-->
                                <div class="horizontalToolbarSeparator"></div>
                                <!--#endif-->

                                <button id="presentationMode" class="toolbarButton labeled" type="button" tabindex="0"
                                    data-l10n-id="pdfjs-presentation-mode-button">
                                    <span data-l10n-id="pdfjs-presentation-mode-button-label"></span>
                                </button>

                                <a href="#" id="viewBookmark" class="toolbarButton labeled" tabindex="0"
                                    data-l10n-id="pdfjs-bookmark-button">
                                    <span data-l10n-id="pdfjs-bookmark-button-label"></span>
                                </a>

                                <div id="viewBookmarkSeparator" class="horizontalToolbarSeparator"></div>

                                <button id="firstPage" class="toolbarButton labeled" type="button" tabindex="0"
                                    data-l10n-id="pdfjs-first-page-button">
                                    <span data-l10n-id="pdfjs-first-page-button-label"></span>
                                </button>
                                <button id="lastPage" class="toolbarButton labeled" type="button" tabindex="0"
                                    data-l10n-id="pdfjs-last-page-button">
                                    <span data-l10n-id="pdfjs-last-page-button-label"></span>
                                </button>

                                <div class="horizontalToolbarSeparator"></div>

                                <button id="pageRotateCw" class="toolbarButton labeled" type="button" tabindex="0"
                                    data-l10n-id="pdfjs-page-rotate-cw-button">
                                    <span data-l10n-id="pdfjs-page-rotate-cw-button-label"></span>
                                </button>
                                <button id="pageRotateCcw" class="toolbarButton labeled" type="button" tabindex="0"
                                    data-l10n-id="pdfjs-page-rotate-ccw-button">
                                    <span data-l10n-id="pdfjs-page-rotate-ccw-button-label"></span>
                                </button>

                                <div class="horizontalToolbarSeparator"></div>

                                <div id="cursorToolButtons" role="radiogroup">
                                    <button id="cursorSelectTool" class="toolbarButton labeled toggled" type="button"
                                        tabindex="0" data-l10n-id="pdfjs-cursor-text-select-tool-button" role="radio"
                                        aria-checked="true">
                                        <span data-l10n-id="pdfjs-cursor-text-select-tool-button-label"></span>
                                    </button>
                                    <button id="cursorHandTool" class="toolbarButton labeled" type="button" tabindex="0"
                                        data-l10n-id="pdfjs-cursor-hand-tool-button" role="radio" aria-checked="false">
                                        <span data-l10n-id="pdfjs-cursor-hand-tool-button-label"></span>
                                    </button>
                                </div>

                                <div class="horizontalToolbarSeparator"></div>

                                <div id="scrollModeButtons" role="radiogroup">
                                    <button id="scrollPage" class="toolbarButton labeled" type="button" tabindex="0"
                                        data-l10n-id="pdfjs-scroll-page-button" role="radio" aria-checked="false">
                                        <span data-l10n-id="pdfjs-scroll-page-button-label"></span>
                                    </button>
                                    <button id="scrollVertical" class="toolbarButton labeled toggled" type="button"
                                        tabindex="0" data-l10n-id="pdfjs-scroll-vertical-button" role="radio"
                                        aria-checked="true">
                                        <span data-l10n-id="pdfjs-scroll-vertical-button-label"></span>
                                    </button>
                                    <button id="scrollHorizontal" class="toolbarButton labeled" type="button"
                                        tabindex="0" data-l10n-id="pdfjs-scroll-horizontal-button" role="radio"
                                        aria-checked="false">
                                        <span data-l10n-id="pdfjs-scroll-horizontal-button-label"></span>
                                    </button>
                                    <button id="scrollWrapped" class="toolbarButton labeled" type="button" tabindex="0"
                                        data-l10n-id="pdfjs-scroll-wrapped-button" role="radio" aria-checked="false">
                                        <span data-l10n-id="pdfjs-scroll-wrapped-button-label"></span>
                                    </button>
                                </div>

                                <div class="horizontalToolbarSeparator"></div>

                                <div id="spreadModeButtons" role="radiogroup">
                                    <button id="spreadNone" class="toolbarButton labeled toggled" type="button"
                                        tabindex="0" data-l10n-id="pdfjs-spread-none-button" role="radio"
                                        aria-checked="true">
                                        <span data-l10n-id="pdfjs-spread-none-button-label"></span>
                                    </button>
                                    <button id="spreadOdd" class="toolbarButton labeled" type="button" tabindex="0"
                                        data-l10n-id="pdfjs-spread-odd-button" role="radio" aria-checked="false">
                                        <span data-l10n-id="pdfjs-spread-odd-button-label"></span>
                                    </button>
                                    <button id="spreadEven" class="toolbarButton labeled" type="button" tabindex="0"
                                        data-l10n-id="pdfjs-spread-even-button" role="radio" aria-checked="false">
                                        <span data-l10n-id="pdfjs-spread-even-button-label"></span>
                                    </button>
                                </div>

                                <div id="imageAltTextSettingsSeparator" class="horizontalToolbarSeparator hidden">
                                </div>
                                <button id="imageAltTextSettings" type="button" class="toolbarButton labeled hidden"
                                    tabindex="0" data-l10n-id="pdfjs-image-alt-text-settings-button"
                                    aria-controls="altTextSettingsDialog">
                                    <span data-l10n-id="pdfjs-image-alt-text-settings-button-label"></span>
                                </button>

                                <div class="horizontalToolbarSeparator"></div>

                                <button id="documentProperties" class="toolbarButton labeled" type="button" tabindex="0"
                                    data-l10n-id="pdfjs-document-properties-button"
                                    aria-controls="documentPropertiesDialog">
                                    <span data-l10n-id="pdfjs-document-properties-button-label"></span>
                                </button>
                            </div>
                        </div> <!-- secondaryToolbar -->
                    </div>
                </div>
            </div>
            <div id="loadingBar">
                <div class="progress">
                    <div class="glimmer">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>