<template>
    <div id="mainContainer">
        <div class="toolbar">
            <div id="toolbarContainer">
                <div id="toolbarViewer" class="toolbarHorizontalGroup">
                    <div id="toolbarViewerLeft" class="toolbarHorizontalGroup">
                        <button id="sidebarToggleButton" class="toolbarButton" type="button" title="Toggle Sidebar"
                            tabindex="0" data-l10n-id="pdfjs-toggle-sidebar-button" aria-expanded="false"
                            aria-haspopup="true" aria-controls="sidebarContainer">
                            <span data-l10n-id="pdfjs-toggle-sidebar-button-label">Toggle Sidebar</span>
                        </button>
                        <div class="toolbarButtonSpacer"></div>
                        <div class="toolbarButtonWithContainer">
                            <button id="viewFindButton" class="toolbarButton" type="button" title="Find in Document"
                                tabindex="0" data-l10n-id="pdfjs-findbar-button" aria-expanded="false"
                                aria-controls="findbar">
                                <span data-l10n-id="pdfjs-findbar-button-label">Find</span>
                            </button>
                            <div class="hidden doorHanger toolbarHorizontalGroup" id="findbar">
                                <div id="findInputContainer" class="toolbarHorizontalGroup">
                                    <span class="loadingInput end toolbarHorizontalGroup">
                                        <input id="findInput" class="toolbarField" title="Find"
                                            placeholder="Find in document…" tabindex="0" data-l10n-id="pdfjs-find-input"
                                            aria-invalid="false">
                                    </span>
                                    <div class="toolbarHorizontalGroup">
                                        <button id="findPreviousButton" class="toolbarButton" type="button"
                                            title="Find the previous occurrence of the phrase" tabindex="0"
                                            data-l10n-id="pdfjs-find-previous-button">
                                            <span data-l10n-id="pdfjs-find-previous-button-label">Previous</span>
                                        </button>
                                        <div class="splitToolbarButtonSeparator"></div>
                                        <button id="findNextButton" class="toolbarButton" type="button"
                                            title="Find the next occurrence of the phrase" tabindex="0"
                                            data-l10n-id="pdfjs-find-next-button">
                                            <span data-l10n-id="pdfjs-find-next-button-label">Next</span>
                                        </button>
                                    </div>
                                </div>

                                <div id="findbarOptionsOneContainer" class="toolbarHorizontalGroup">
                                    <div class="toggleButton toolbarLabel">
                                        <input type="checkbox" id="findHighlightAll" tabindex="0" />
                                        <label for="findHighlightAll"
                                            data-l10n-id="pdfjs-find-highlight-checkbox">Highlight All</label>
                                    </div>
                                    <div class="toggleButton toolbarLabel">
                                        <input type="checkbox" id="findMatchCase" tabindex="0" />
                                        <label for="findMatchCase"
                                            data-l10n-id="pdfjs-find-match-case-checkbox-label">Match Case</label>
                                    </div>
                                </div>
                                <div id="findbarOptionsTwoContainer" class="toolbarHorizontalGroup">
                                    <div class="toggleButton toolbarLabel">
                                        <input type="checkbox" id="findMatchDiacritics" tabindex="0" />
                                        <label for="findMatchDiacritics"
                                            data-l10n-id="pdfjs-find-match-diacritics-checkbox-label">Match
                                            Diacritics</label>
                                    </div>
                                    <div class="toggleButton toolbarLabel">
                                        <input type="checkbox" id="findEntireWord" tabindex="0" />
                                        <label for="findEntireWord"
                                            data-l10n-id="pdfjs-find-entire-word-checkbox-label">Whole Words</label>
                                    </div>
                                </div>

                                <div id="findbarMessageContainer" class="toolbarHorizontalGroup" aria-live="polite">
                                    <span id="findResultsCount" class="toolbarLabel"></span>
                                    <span id="findMsg" class="toolbarLabel"></span>
                                </div>
                            </div> <!-- findbar -->
                        </div>
                        <div class="toolbarHorizontalGroup hiddenSmallView">
                            <button class="toolbarButton" title="Previous Page" type="button" id="previous" tabindex="0"
                                data-l10n-id="pdfjs-previous-button">
                                <span data-l10n-id="pdfjs-previous-button-label">Previous</span>
                            </button>
                            <div class="splitToolbarButtonSeparator"></div>
                            <button class="toolbarButton" type="button" title="Next Page" id="next" tabindex="0"
                                data-l10n-id="pdfjs-next-button">
                                <span data-l10n-id="pdfjs-next-button-label">Next</span>
                            </button>
                        </div>
                        <div class="toolbarHorizontalGroup">
                            <span class="loadingInput start toolbarHorizontalGroup">
                                <input type="number" id="pageNumber" class="toolbarField" title="Page" value="1" min="1"
                                    tabindex="0" data-l10n-id="pdfjs-page-input" autocomplete="off">
                            </span>
                            <span id="numPages" class="toolbarLabel"></span>
                        </div>
                    </div>
                    <div id="toolbarViewerMiddle" class="toolbarHorizontalGroup">
                        <div class="toolbarHorizontalGroup">
                            <button id="zoomOutButton" class="toolbarButton" type="button" title="Zoom Out" tabindex="0"
                                data-l10n-id="pdfjs-zoom-out-button">
                                <span data-l10n-id="pdfjs-zoom-out-button-label">Zoom Out</span>
                            </button>
                            <div class="splitToolbarButtonSeparator"></div>
                            <button id="zoomInButton" class="toolbarButton" type="button" title="Zoom In" tabindex="0"
                                data-l10n-id="pdfjs-zoom-in-button">
                                <span data-l10n-id="pdfjs-zoom-in-button-label">Zoom In</span>
                            </button>
                        </div>
                        <span id="scaleSelectContainer" class="dropdownToolbarButton">
                            <select id="scaleSelect" title="Zoom" tabindex="0" data-l10n-id="pdfjs-zoom-select">
                                <option id="pageAutoOption" title="" value="auto" selected
                                    data-l10n-id="pdfjs-page-scale-auto">Automatic Zoom</option>
                                <option id="pageActualOption" title="" value="page-actual"
                                    data-l10n-id="pdfjs-page-scale-actual">Actual Size</option>
                                <option id="pageFitOption" title="" value="page-fit"
                                    data-l10n-id="pdfjs-page-scale-fit">Page Fit</option>
                                <option id="pageWidthOption" title="" value="page-width"
                                    data-l10n-id="pdfjs-page-scale-width">Page Width</option>
                                <option id="customScaleOption" title="" value="custom" disabled hidden="true"
                                    data-l10n-id="pdfjs-page-scale-percent" data-l10n-args='{ "scale": 0 }'>0%</option>
                                <option title="" value="0.5" data-l10n-id="pdfjs-page-scale-percent"
                                    data-l10n-args='{ "scale": 50 }'>50%</option>
                                <option title="" value="0.75" data-l10n-id="pdfjs-page-scale-percent"
                                    data-l10n-args='{ "scale": 75 }'>75%</option>
                                <option title="" value="1" data-l10n-id="pdfjs-page-scale-percent"
                                    data-l10n-args='{ "scale": 100 }'>100%</option>
                                <option title="" value="1.25" data-l10n-id="pdfjs-page-scale-percent"
                                    data-l10n-args='{ "scale": 125 }'>125%</option>
                                <option title="" value="1.5" data-l10n-id="pdfjs-page-scale-percent"
                                    data-l10n-args='{ "scale": 150 }'>150%</option>
                                <option title="" value="2" data-l10n-id="pdfjs-page-scale-percent"
                                    data-l10n-args='{ "scale": 200 }'>200%</option>
                                <option title="" value="3" data-l10n-id="pdfjs-page-scale-percent"
                                    data-l10n-args='{ "scale": 300 }'>300%</option>
                                <option title="" value="4" data-l10n-id="pdfjs-page-scale-percent"
                                    data-l10n-args='{ "scale": 400 }'>400%</option>
                            </select>
                        </span>
                    </div>
                    <div id="toolbarViewerRight" class="toolbarHorizontalGroup">
                        <div id="editorModeButtons" class="toolbarHorizontalGroup" role="radiogroup">
                            <div id="editorHighlight" class="toolbarButtonWithContainer">
                                <button id="editorHighlightButton" class="toolbarButton" type="button" disabled
                                    title="Highlight" role="radio" aria-expanded="false" aria-haspopup="true"
                                    aria-controls="editorHighlightParamsToolbar" tabindex="0"
                                    data-l10n-id="pdfjs-editor-highlight-button">
                                    <span data-l10n-id="pdfjs-editor-highlight-button-label">Highlight</span>
                                </button>
                                <div class="editorParamsToolbar hidden doorHangerRight"
                                    id="editorHighlightParamsToolbar">
                                    <div id="highlightParamsToolbarContainer" class="editorParamsToolbarContainer">
                                        <div id="editorHighlightColorPicker" class="colorPicker">
                                            <span id="highlightColorPickerLabel" class="editorParamsLabel"
                                                data-l10n-id="pdfjs-editor-highlight-colorpicker-label">Highlight
                                                color</span>
                                        </div>
                                        <div id="editorHighlightThickness">
                                            <label for="editorFreeHighlightThickness" class="editorParamsLabel"
                                                data-l10n-id="pdfjs-editor-free-highlight-thickness-input">Thickness</label>
                                            <div class="thicknessPicker">
                                                <input type="range" id="editorFreeHighlightThickness"
                                                    class="editorParamsSlider"
                                                    data-l10n-id="pdfjs-editor-free-highlight-thickness-title"
                                                    value="12" min="8" max="24" step="1" tabindex="0">
                                            </div>
                                        </div>
                                        <div id="editorHighlightVisibility">
                                            <div class="divider"></div>
                                            <div class="toggler">
                                                <label for="editorHighlightShowAll" class="editorParamsLabel"
                                                    data-l10n-id="pdfjs-editor-highlight-show-all-button-label">Show
                                                    all</label>
                                                <button id="editorHighlightShowAll" class="toggle-button" type="button"
                                                    data-l10n-id="pdfjs-editor-highlight-show-all-button"
                                                    aria-pressed="true" tabindex="0"></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="editorFreeText" class="toolbarButtonWithContainer">
                                <button id="editorFreeTextButton" class="toolbarButton" type="button" disabled
                                    title="Text" role="radio" aria-expanded="false" aria-haspopup="true"
                                    aria-controls="editorFreeTextParamsToolbar" tabindex="0"
                                    data-l10n-id="pdfjs-editor-free-text-button">
                                    <span data-l10n-id="pdfjs-editor-free-text-button-label">Text</span>
                                </button>
                                <div class="editorParamsToolbar hidden doorHangerRight"
                                    id="editorFreeTextParamsToolbar">
                                    <div class="editorParamsToolbarContainer">
                                        <div class="editorParamsSetter">
                                            <label for="editorFreeTextColor" class="editorParamsLabel"
                                                data-l10n-id="pdfjs-editor-free-text-color-input">Color</label>
                                            <input type="color" id="editorFreeTextColor" class="editorParamsColor"
                                                tabindex="0">
                                        </div>
                                        <div class="editorParamsSetter">
                                            <label for="editorFreeTextFontSize" class="editorParamsLabel"
                                                data-l10n-id="pdfjs-editor-free-text-size-input">Size</label>
                                            <input type="range" id="editorFreeTextFontSize" class="editorParamsSlider"
                                                value="10" min="5" max="100" step="1" tabindex="0">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="editorInk" class="toolbarButtonWithContainer">
                                <button id="editorInkButton" class="toolbarButton" type="button" disabled title="Draw"
                                    role="radio" aria-expanded="false" aria-haspopup="true"
                                    aria-controls="editorInkParamsToolbar" tabindex="0"
                                    data-l10n-id="pdfjs-editor-ink-button">
                                    <span data-l10n-id="pdfjs-editor-ink-button-label">Draw</span>
                                </button>
                                <div class="editorParamsToolbar hidden doorHangerRight" id="editorInkParamsToolbar">
                                    <div class="editorParamsToolbarContainer">
                                        <div class="editorParamsSetter">
                                            <label for="editorInkColor" class="editorParamsLabel"
                                                data-l10n-id="pdfjs-editor-ink-color-input">Color</label>
                                            <input type="color" id="editorInkColor" class="editorParamsColor"
                                                tabindex="0">
                                        </div>
                                        <div class="editorParamsSetter">
                                            <label for="editorInkThickness" class="editorParamsLabel"
                                                data-l10n-id="pdfjs-editor-ink-thickness-input">Thickness</label>
                                            <input type="range" id="editorInkThickness" class="editorParamsSlider"
                                                value="1" min="1" max="20" step="1" tabindex="0">
                                        </div>
                                        <div class="editorParamsSetter">
                                            <label for="editorInkOpacity" class="editorParamsLabel"
                                                data-l10n-id="pdfjs-editor-ink-opacity-input">Opacity</label>
                                            <input type="range" id="editorInkOpacity" class="editorParamsSlider"
                                                value="100" min="1" max="100" step="1" tabindex="0">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="editorStamp" class="toolbarButtonWithContainer">
                                <button id="editorStampButton" class="toolbarButton" type="button" disabled
                                    title="Add or edit images" role="radio" aria-expanded="false" aria-haspopup="true"
                                    aria-controls="editorStampParamsToolbar" tabindex="0"
                                    data-l10n-id="pdfjs-editor-stamp-button">
                                    <span data-l10n-id="pdfjs-editor-stamp-button-label">Add or edit images</span>
                                </button>
                                <div class="editorParamsToolbar hidden doorHangerRight menu"
                                    id="editorStampParamsToolbar">
                                    <div class="menuContainer">
                                        <button id="editorStampAddImage" class="toolbarButton labeled" type="button"
                                            title="Add image" tabindex="0"
                                            data-l10n-id="pdfjs-editor-stamp-add-image-button">
                                            <span class="editorParamsLabel"
                                                data-l10n-id="pdfjs-editor-stamp-add-image-button-label">Add
                                                image</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="editorModeSeparator" class="verticalToolbarSeparator"></div>

                        <div class="toolbarHorizontalGroup hiddenMediumView">
                            <button id="printButton" class="toolbarButton" type="button" title="Print" tabindex="0"
                                data-l10n-id="pdfjs-print-button">
                                <span data-l10n-id="pdfjs-print-button-label">Print</span>
                            </button>

                            <button id="downloadButton" class="toolbarButton" type="button" title="Save" tabindex="0"
                                data-l10n-id="pdfjs-save-button">
                                <span data-l10n-id="pdfjs-save-button-label">Save</span>
                            </button>
                        </div>

                        <div class="verticalToolbarSeparator hiddenMediumView"></div>

                        <div id="secondaryToolbarToggle" class="toolbarButtonWithContainer">
                            <button id="secondaryToolbarToggleButton" class="toolbarButton" type="button" title="Tools"
                                tabindex="0" data-l10n-id="pdfjs-tools-button" aria-expanded="false"
                                aria-haspopup="true" aria-controls="secondaryToolbar">
                                <span data-l10n-id="pdfjs-tools-button-label">Tools</span>
                            </button>
                            <div id="secondaryToolbar" class="hidden doorHangerRight menu">
                                <div id="secondaryToolbarButtonContainer" class="menuContainer">
                                    <!--#if GENERIC-->
                                    <button id="secondaryOpenFile" class="toolbarButton labeled" type="button"
                                        title="Open File" tabindex="0" data-l10n-id="pdfjs-open-file-button">
                                        <span data-l10n-id="pdfjs-open-file-button-label">Open</span>
                                    </button>
                                    <!--#endif-->

                                    <div class="visibleMediumView">
                                        <button id="secondaryPrint" class="toolbarButton labeled" type="button"
                                            title="Print" tabindex="0" data-l10n-id="pdfjs-print-button">
                                            <span data-l10n-id="pdfjs-print-button-label">Print</span>
                                        </button>

                                        <button id="secondaryDownload" class="toolbarButton labeled" type="button"
                                            title="Save" tabindex="0" data-l10n-id="pdfjs-save-button">
                                            <span data-l10n-id="pdfjs-save-button-label">Save</span>
                                        </button>

                                        <!--#if !GENERIC-->
                                        <!--            <div class="horizontalToolbarSeparator"></div>-->
                                        <!--#endif-->
                                    </div>

                                    <!--#if GENERIC-->
                                    <div class="horizontalToolbarSeparator"></div>
                                    <!--#endif-->

                                    <button id="presentationMode" class="toolbarButton labeled" type="button"
                                        title="Switch to Presentation Mode" tabindex="0"
                                        data-l10n-id="pdfjs-presentation-mode-button">
                                        <span data-l10n-id="pdfjs-presentation-mode-button-label">Presentation
                                            Mode</span>
                                    </button>

                                    <a href="#" id="viewBookmark" class="toolbarButton labeled"
                                        title="Current Page (View URL from Current Page)" tabindex="0"
                                        data-l10n-id="pdfjs-bookmark-button">
                                        <span data-l10n-id="pdfjs-bookmark-button-label">Current Page</span>
                                    </a>

                                    <div id="viewBookmarkSeparator" class="horizontalToolbarSeparator"></div>

                                    <button id="firstPage" class="toolbarButton labeled" type="button"
                                        title="Go to First Page" tabindex="0" data-l10n-id="pdfjs-first-page-button">
                                        <span data-l10n-id="pdfjs-first-page-button-label">Go to First Page</span>
                                    </button>
                                    <button id="lastPage" class="toolbarButton labeled" type="button"
                                        title="Go to Last Page" tabindex="0" data-l10n-id="pdfjs-last-page-button">
                                        <span data-l10n-id="pdfjs-last-page-button-label">Go to Last Page</span>
                                    </button>

                                    <div class="horizontalToolbarSeparator"></div>

                                    <button id="pageRotateCw" class="toolbarButton labeled" type="button"
                                        title="Rotate Clockwise" tabindex="0"
                                        data-l10n-id="pdfjs-page-rotate-cw-button">
                                        <span data-l10n-id="pdfjs-page-rotate-cw-button-label">Rotate
                                            Clockwise</span>
                                    </button>
                                    <button id="pageRotateCcw" class="toolbarButton labeled" type="button"
                                        title="Rotate Counterclockwise" tabindex="0"
                                        data-l10n-id="pdfjs-page-rotate-ccw-button">
                                        <span data-l10n-id="pdfjs-page-rotate-ccw-button-label">Rotate
                                            Counterclockwise</span>
                                    </button>

                                    <div class="horizontalToolbarSeparator"></div>

                                    <div id="cursorToolButtons" role="radiogroup">
                                        <button id="cursorSelectTool" class="toolbarButton labeled toggled"
                                            type="button" title="Enable Text Selection Tool" tabindex="0"
                                            data-l10n-id="pdfjs-cursor-text-select-tool-button" role="radio"
                                            aria-checked="true">
                                            <span data-l10n-id="pdfjs-cursor-text-select-tool-button-label">Text
                                                Selection Tool</span>
                                        </button>
                                        <button id="cursorHandTool" class="toolbarButton labeled" type="button"
                                            title="Enable Hand Tool" tabindex="0"
                                            data-l10n-id="pdfjs-cursor-hand-tool-button" role="radio"
                                            aria-checked="false">
                                            <span data-l10n-id="pdfjs-cursor-hand-tool-button-label">Hand
                                                Tool</span>
                                        </button>
                                    </div>

                                    <div class="horizontalToolbarSeparator"></div>

                                    <div id="scrollModeButtons" role="radiogroup">
                                        <button id="scrollPage" class="toolbarButton labeled" type="button"
                                            title="Use Page Scrolling" tabindex="0"
                                            data-l10n-id="pdfjs-scroll-page-button" role="radio" aria-checked="false">
                                            <span data-l10n-id="pdfjs-scroll-page-button-label">Page
                                                Scrolling</span>
                                        </button>
                                        <button id="scrollVertical" class="toolbarButton labeled toggled" type="button"
                                            title="Use Vertical Scrolling" tabindex="0"
                                            data-l10n-id="pdfjs-scroll-vertical-button" role="radio"
                                            aria-checked="true">
                                            <span data-l10n-id="pdfjs-scroll-vertical-button-label">Vertical
                                                Scrolling</span>
                                        </button>
                                        <button id="scrollHorizontal" class="toolbarButton labeled" type="button"
                                            title="Use Horizontal Scrolling" tabindex="0"
                                            data-l10n-id="pdfjs-scroll-horizontal-button" role="radio"
                                            aria-checked="false">
                                            <span data-l10n-id="pdfjs-scroll-horizontal-button-label">Horizontal
                                                Scrolling</span>
                                        </button>
                                        <button id="scrollWrapped" class="toolbarButton labeled" type="button"
                                            title="Use Wrapped Scrolling" tabindex="0"
                                            data-l10n-id="pdfjs-scroll-wrapped-button" role="radio"
                                            aria-checked="false">
                                            <span data-l10n-id="pdfjs-scroll-wrapped-button-label">Wrapped
                                                Scrolling</span>
                                        </button>
                                    </div>

                                    <div class="horizontalToolbarSeparator"></div>

                                    <div id="spreadModeButtons" role="radiogroup">
                                        <button id="spreadNone" class="toolbarButton labeled toggled" type="button"
                                            title="Do not join page spreads" tabindex="0"
                                            data-l10n-id="pdfjs-spread-none-button" role="radio" aria-checked="true">
                                            <span data-l10n-id="pdfjs-spread-none-button-label">No Spreads</span>
                                        </button>
                                        <button id="spreadOdd" class="toolbarButton labeled" type="button"
                                            title="Join page spreads starting with odd-numbered pages" tabindex="0"
                                            data-l10n-id="pdfjs-spread-odd-button" role="radio" aria-checked="false">
                                            <span data-l10n-id="pdfjs-spread-odd-button-label">Odd Spreads</span>
                                        </button>
                                        <button id="spreadEven" class="toolbarButton labeled" type="button"
                                            title="Join page spreads starting with even-numbered pages" tabindex="0"
                                            data-l10n-id="pdfjs-spread-even-button" role="radio" aria-checked="false">
                                            <span data-l10n-id="pdfjs-spread-even-button-label">Even Spreads</span>
                                        </button>
                                    </div>

                                    <div id="imageAltTextSettingsSeparator" class="horizontalToolbarSeparator hidden">
                                    </div>
                                    <button id="imageAltTextSettings" type="button" class="toolbarButton labeled hidden"
                                        title="Image alt text settings" tabindex="0"
                                        data-l10n-id="pdfjs-image-alt-text-settings-button"
                                        aria-controls="altTextSettingsDialog">
                                        <span data-l10n-id="pdfjs-image-alt-text-settings-button-label">Image alt
                                            text settings</span>
                                    </button>

                                    <div class="horizontalToolbarSeparator"></div>

                                    <button id="documentProperties" class="toolbarButton labeled" type="button"
                                        title="Document Properties…" tabindex="0"
                                        data-l10n-id="pdfjs-document-properties-button"
                                        aria-controls="documentPropertiesDialog">
                                        <span data-l10n-id="pdfjs-document-properties-button-label">Document
                                            Properties…</span>
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

        <div id="viewerContainer" tabindex="0">
            <div id="viewer" class="pdfViewer"></div>
        </div>
    </div>
</template>