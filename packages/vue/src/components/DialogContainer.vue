<template>
    <div id="dialogContainer">
        <dialog id="passwordDialog">
            <div class="row">
                <label for="password" id="passwordText" data-l10n-id="pdfjs-password-label"></label>
            </div>
            <div class="row">
                <input type="password" id="password" class="toolbarField">
            </div>
            <div class="buttonRow">
                <button id="passwordCancel" class="dialogButton" type="button"><span
                        data-l10n-id="pdfjs-password-cancel-button"></span></button>
                <button id="passwordSubmit" class="dialogButton" type="button"><span
                        data-l10n-id="pdfjs-password-ok-button"></span></button>
            </div>
        </dialog>
        <dialog id="documentPropertiesDialog">
            <div class="row">
                <span id="fileNameLabel" data-l10n-id="pdfjs-document-properties-file-name"></span>
                <p id="fileNameField" aria-labelledby="fileNameLabel">-</p>
            </div>
            <div class="row">
                <span id="fileSizeLabel" data-l10n-id="pdfjs-document-properties-file-size"></span>
                <p id="fileSizeField" aria-labelledby="fileSizeLabel">-</p>
            </div>
            <div class="separator"></div>
            <div class="row">
                <span id="titleLabel" data-l10n-id="pdfjs-document-properties-title"></span>
                <p id="titleField" aria-labelledby="titleLabel">-</p>
            </div>
            <div class="row">
                <span id="authorLabel" data-l10n-id="pdfjs-document-properties-author"></span>
                <p id="authorField" aria-labelledby="authorLabel">-</p>
            </div>
            <div class="row">
                <span id="subjectLabel" data-l10n-id="pdfjs-document-properties-subject"></span>
                <p id="subjectField" aria-labelledby="subjectLabel">-</p>
            </div>
            <div class="row">
                <span id="keywordsLabel" data-l10n-id="pdfjs-document-properties-keywords"></span>
                <p id="keywordsField" aria-labelledby="keywordsLabel">-</p>
            </div>
            <div class="row">
                <span id="creationDateLabel" data-l10n-id="pdfjs-document-properties-creation-date"></span>
                <p id="creationDateField" aria-labelledby="creationDateLabel">-</p>
            </div>
            <div class="row">
                <span id="modificationDateLabel" data-l10n-id="pdfjs-document-properties-modification-date"></span>
                <p id="modificationDateField" aria-labelledby="modificationDateLabel">-</p>
            </div>
            <div class="row">
                <span id="creatorLabel" data-l10n-id="pdfjs-document-properties-creator"></span>
                <p id="creatorField" aria-labelledby="creatorLabel">-</p>
            </div>
            <div class="separator"></div>
            <div class="row">
                <span id="producerLabel" data-l10n-id="pdfjs-document-properties-producer"></span>
                <p id="producerField" aria-labelledby="producerLabel">-</p>
            </div>
            <div class="row">
                <span id="versionLabel" data-l10n-id="pdfjs-document-properties-version"></span>
                <p id="versionField" aria-labelledby="versionLabel">-</p>
            </div>
            <div class="row">
                <span id="pageCountLabel" data-l10n-id="pdfjs-document-properties-page-count"></span>
                <p id="pageCountField" aria-labelledby="pageCountLabel">-</p>
            </div>
            <div class="row">
                <span id="pageSizeLabel" data-l10n-id="pdfjs-document-properties-page-size"></span>
                <p id="pageSizeField" aria-labelledby="pageSizeLabel">-</p>
            </div>
            <div class="separator"></div>
            <div class="row">
                <span id="linearizedLabel" data-l10n-id="pdfjs-document-properties-linearized"></span>
                <p id="linearizedField" aria-labelledby="linearizedLabel">-</p>
            </div>
            <div class="buttonRow">
                <button id="documentPropertiesClose" class="dialogButton" type="button"><span
                        data-l10n-id="pdfjs-document-properties-close-button"></span></button>
            </div>
        </dialog>
        <dialog class="dialog altText" id="altTextDialog" aria-labelledby="dialogLabel"
            aria-describedby="dialogDescription">
            <div id="altTextContainer" class="mainContainer">
                <div id="overallDescription">
                    <span id="dialogLabel" data-l10n-id="pdfjs-editor-alt-text-dialog-label" class="title"></span>
                    <span id="dialogDescription" data-l10n-id="pdfjs-editor-alt-text-dialog-description"></span>
                </div>
                <div id="addDescription">
                    <div class="radio">
                        <div class="radioButton">
                            <input type="radio" id="descriptionButton" name="altTextOption" tabindex="0"
                                aria-describedby="descriptionAreaLabel" checked>
                            <label for="descriptionButton"
                                data-l10n-id="pdfjs-editor-alt-text-add-description-label"></label>
                        </div>
                        <div class="radioLabel">
                            <span id="descriptionAreaLabel"
                                data-l10n-id="pdfjs-editor-alt-text-add-description-description"></span>
                        </div>
                    </div>
                    <div class="descriptionArea">
                        <textarea id="descriptionTextarea" aria-labelledby="descriptionAreaLabel"
                            data-l10n-id="pdfjs-editor-alt-text-textarea" tabindex="0"></textarea>
                    </div>
                </div>
                <div id="markAsDecorative">
                    <div class="radio">
                        <div class="radioButton">
                            <input type="radio" id="decorativeButton" name="altTextOption"
                                aria-describedby="decorativeLabel">
                            <label for="decorativeButton"
                                data-l10n-id="pdfjs-editor-alt-text-mark-decorative-label"></label>
                        </div>
                        <div class="radioLabel">
                            <span id="decorativeLabel"
                                data-l10n-id="pdfjs-editor-alt-text-mark-decorative-description"></span>
                        </div>
                    </div>
                </div>
                <div id="buttons">
                    <button id="altTextCancel" class="secondaryButton" type="button" tabindex="0"><span
                            data-l10n-id="pdfjs-editor-alt-text-cancel-button"></span></button>
                    <button id="altTextSave" class="primaryButton" type="button" tabindex="0"><span
                            data-l10n-id="pdfjs-editor-alt-text-save-button"></span></button>
                </div>
            </div>
        </dialog>
        <dialog class="dialog newAltText" id="newAltTextDialog" aria-labelledby="newAltTextTitle"
            aria-describedby="newAltTextDescription" tabindex="0">
            <div id="newAltTextContainer" class="mainContainer">
                <div class="title">
                    <span id="newAltTextTitle" data-l10n-id="pdfjs-editor-new-alt-text-dialog-edit-label"
                        role="sectionhead" tabindex="0"></span>
                </div>
                <div id="mainContent">
                    <div id="descriptionAndSettings">
                        <div id="descriptionInstruction">
                            <div id="newAltTextDescriptionContainer">
                                <div class="altTextSpinner" role="status" aria-live="polite"></div>
                                <textarea id="newAltTextDescriptionTextarea" aria-labelledby="descriptionAreaLabel"
                                    data-l10n-id="pdfjs-editor-new-alt-text-textarea" tabindex="0"></textarea>
                            </div>
                            <span id="newAltTextDescription" role="note"
                                data-l10n-id="pdfjs-editor-new-alt-text-description"></span>
                            <div id="newAltTextDisclaimer" role="note">
                                <div><span data-l10n-id="pdfjs-editor-new-alt-text-disclaimer1"></span> <a
                                        href="https://support.mozilla.org/en-US/kb/pdf-alt-text" target="_blank"
                                        rel="noopener noreferrer" id="newAltTextLearnMore"
                                        data-l10n-id="pdfjs-editor-new-alt-text-disclaimer-learn-more-url"
                                        tabindex="0"></a></div>
                            </div>
                        </div>
                        <div id="newAltTextCreateAutomatically" class="toggler">
                            <button id="newAltTextCreateAutomaticallyButton" class="toggle-button" type="button"
                                aria-pressed="true" tabindex="0"></button>
                            <label for="newAltTextCreateAutomaticallyButton" class="togglerLabel"
                                data-l10n-id="pdfjs-editor-new-alt-text-create-automatically-button-label"></label>
                        </div>
                        <div id="newAltTextDownloadModel" class="hidden">
                            <span id="newAltTextDownloadModelDescription"
                                data-l10n-id="pdfjs-editor-new-alt-text-ai-model-downloading-progress" aria-valuemin="0"
                                data-l10n-args='{ "totalSize": 0, "downloadedSize": 0 }'></span>
                        </div>
                    </div>
                    <div id="newAltTextImagePreview"></div>
                </div>
                <div id="newAltTextError" class="messageBar">
                    <div>
                        <div>
                            <span class="title" data-l10n-id="pdfjs-editor-new-alt-text-error-title"></span>
                            <span class="description" data-l10n-id="pdfjs-editor-new-alt-text-error-description"></span>
                        </div>
                        <button id="newAltTextCloseButton" class="closeButton" type="button" tabindex="0"><span
                                data-l10n-id="pdfjs-editor-new-alt-text-error-close-button"></span></button>
                    </div>
                </div>
                <div id="newAltTextButtons" class="dialogButtonsGroup">
                    <button id="newAltTextCancel" type="button" class="secondaryButton hidden" tabindex="0"><span
                            data-l10n-id="pdfjs-editor-alt-text-cancel-button"></span></button>
                    <button id="newAltTextNotNow" type="button" class="secondaryButton" tabindex="0"><span
                            data-l10n-id="pdfjs-editor-new-alt-text-not-now-button"></span></button>
                    <button id="newAltTextSave" type="button" class="primaryButton" tabindex="0"><span
                            data-l10n-id="pdfjs-editor-alt-text-save-button"></span></button>
                </div>
            </div>
        </dialog>

        <dialog class="dialog" id="altTextSettingsDialog" aria-labelledby="altTextSettingsTitle">
            <div id="altTextSettingsContainer" class="mainContainer">
                <div class="title">
                    <span id="altTextSettingsTitle" data-l10n-id="pdfjs-editor-alt-text-settings-dialog-label"
                        role="sectionhead" tabindex="0" class="title"></span>
                </div>
                <div id="automaticAltText">
                    <span data-l10n-id="pdfjs-editor-alt-text-settings-automatic-title"></span>
                    <div id="automaticSettings">
                        <div id="createModelSetting">
                            <div class="toggler">
                                <button id="createModelButton" type="button" class="toggle-button" aria-pressed="true"
                                    tabindex="0"></button>
                                <label for="createModelButton" class="togglerLabel"
                                    data-l10n-id="pdfjs-editor-alt-text-settings-create-model-button-label"></label>
                            </div>
                            <div id="createModelDescription" class="description">
                                <span data-l10n-id="pdfjs-editor-alt-text-settings-create-model-description"></span> <a
                                    href="https://support.mozilla.org/en-US/kb/pdf-alt-text" target="_blank"
                                    rel="noopener noreferrer" id="altTextSettingsLearnMore"
                                    data-l10n-id="pdfjs-editor-new-alt-text-disclaimer-learn-more-url" tabindex="0"></a>
                            </div>
                        </div>
                        <div id="aiModelSettings">
                            <div>
                                <span data-l10n-id="pdfjs-editor-alt-text-settings-download-model-label"
                                    data-l10n-args='{ "totalSize": 180 }'></span>
                                <div id="aiModelDescription" class="description">
                                    <span data-l10n-id="pdfjs-editor-alt-text-settings-ai-model-description"></span>
                                </div>
                            </div>
                            <button id="deleteModelButton" type="button" class="secondaryButton" tabindex="0"><span
                                    data-l10n-id="pdfjs-editor-alt-text-settings-delete-model-button"></span></button>
                            <button id="downloadModelButton" type="button" class="secondaryButton" tabindex="0"><span
                                    data-l10n-id="pdfjs-editor-alt-text-settings-download-model-button"></span></button>
                        </div>
                    </div>
                </div>
                <div class="dialogSeparator"></div>
                <div id="altTextEditor">
                    <span data-l10n-id="pdfjs-editor-alt-text-settings-editor-title"></span>
                    <div id="showAltTextEditor">
                        <div class="toggler">
                            <button id="showAltTextDialogButton" type="button" class="toggle-button" aria-pressed="true"
                                tabindex="0"></button>
                            <label for="showAltTextDialogButton" class="togglerLabel"
                                data-l10n-id="pdfjs-editor-alt-text-settings-show-dialog-button-label"></label>
                        </div>
                        <div id="showAltTextDialogDescription" class="description">
                            <span data-l10n-id="pdfjs-editor-alt-text-settings-show-dialog-description"></span>
                        </div>
                    </div>
                </div>
                <div id="buttons" class="dialogButtonsGroup">
                    <button id="altTextSettingsCloseButton" type="button" class="primaryButton" tabindex="0"><span
                            data-l10n-id="pdfjs-editor-alt-text-settings-close-button"></span></button>
                </div>
            </div>
        </dialog>

        <dialog class="dialog signatureDialog" id="addSignatureDialog" aria-labelledby="addSignatureDialogLabel">
            <span id="addSignatureDialogLabel" data-l10n-id="pdfjs-editor-add-signature-dialog-label"></span>
            <div id="addSignatureContainer" class="mainContainer">
                <div class="title">
                    <span role="sectionhead" data-l10n-id="pdfjs-editor-add-signature-dialog-title" tabindex="0"></span>
                </div>
                <div role="tablist" id="addSignatureOptions">
                    <button id="addSignatureTypeButton" type="button" role="tab" aria-selected="true"
                        aria-controls="addSignatureTypeContainer" data-l10n-id="pdfjs-editor-add-signature-type-button"
                        tabindex="0"></button>
                    <button id="addSignatureDrawButton" type="button" role="tab" aria-selected="false"
                        aria-controls="addSignatureDrawContainer" data-l10n-id="pdfjs-editor-add-signature-draw-button"
                        tabindex="0"></button>
                    <button id="addSignatureImageButton" type="button" role="tab" aria-selected="false"
                        aria-controls="addSignatureImageContainer"
                        data-l10n-id="pdfjs-editor-add-signature-image-button" tabindex="-1"></button>
                </div>
                <div id="addSignatureActionContainer" data-selected="type">
                    <div id="addSignatureTypeContainer" role="tabpanel" aria-labelledby="addSignatureTypeContainer">
                        <input id="addSignatureTypeInput" type="text"
                            data-l10n-id="pdfjs-editor-add-signature-type-input" tabindex="0"></input>
                    </div>
                    <div id="addSignatureDrawContainer" role="tabpanel" aria-labelledby="addSignatureDrawButton"
                        tabindex="-1">
                        <svg id="addSignatureDraw" xmlns="http://www.w3.org/2000/svg"
                            aria-labelledby="addSignatureDrawPlaceholder"></svg>
                        <span id="addSignatureDrawPlaceholder"
                            data-l10n-id="pdfjs-editor-add-signature-draw-placeholder"></span>
                        <div id="thickness">
                            <div>
                                <label for="addSignatureDrawThickness"
                                    data-l10n-id="pdfjs-editor-add-signature-draw-thickness-range-label"></label>
                                <input type="range" id="addSignatureDrawThickness" min="1" max="5" step="1" value="1"
                                    data-l10n-id="pdfjs-editor-add-signature-draw-thickness-range"
                                    data-l10n-args='{ "thickness": 1 }' tabindex="0">
                            </div>
                        </div>
                    </div>
                    <div id="addSignatureImageContainer" role="tabpanel" aria-labelledby="addSignatureImageButton"
                        tabindex="-1">
                        <svg id="addSignatureImage" xmlns="http://www.w3.org/2000/svg"
                            aria-labelledby="addSignatureImagePlaceholder"></svg>
                        <div id="addSignatureImagePlaceholder">
                            <span data-l10n-id="pdfjs-editor-add-signature-image-placeholder"></span>
                            <label id="addSignatureImageBrowse" for="addSignatureFilePicker" tabindex="0">
                                <a data-l10n-id="pdfjs-editor-add-signature-image-browse-link"></a>
                            </label>
                            <input id="addSignatureFilePicker" type="file"></input>
                        </div>
                    </div>
                    <div id="addSignatureControls">
                        <div id="horizontalContainer">
                            <div id="addSignatureDescriptionContainer">
                                <label for="addSignatureDescInput"
                                    data-l10n-id="pdfjs-editor-add-signature-description-label"></label>
                                <span id="addSignatureDescription" class="inputWithClearButton">
                                    <input id="addSignatureDescInput" type="text"
                                        data-l10n-id="pdfjs-editor-add-signature-description-input"
                                        tabindex="0"></input>
                                    <button class="clearInputButton" type="button" tabindex="0"
                                        aria-hidden="true"></button>
                                </span>
                            </div>
                            <button id="clearSignatureButton" type="button"
                                data-l10n-id="pdfjs-editor-add-signature-clear-button" tabindex="0"><span
                                    data-l10n-id="pdfjs-editor-add-signature-clear-button-label"></span></button>
                        </div>
                        <div id="addSignatureSaveContainer">
                            <input type="checkbox" id="addSignatureSaveCheckbox"></input>
                            <label for="addSignatureSaveCheckbox"
                                data-l10n-id="pdfjs-editor-add-signature-save-checkbox"></label>
                            <span></span>
                            <span id="addSignatureSaveWarning"
                                data-l10n-id="pdfjs-editor-add-signature-save-warning-message"></span>
                        </div>
                    </div>
                    <div id="addSignatureError" hidden="true" class="messageBar">
                        <div>
                            <div>
                                <span id="addSignatureErrorTitle" class="title"
                                    data-l10n-id="pdfjs-editor-add-signature-image-upload-error-title"></span>
                                <span id="addSignatureErrorDescription" class="description"
                                    data-l10n-id="pdfjs-editor-add-signature-image-upload-error-description"></span>
                            </div>
                            <button id="addSignatureErrorCloseButton" class="closeButton" type="button"
                                tabindex="0"><span
                                    data-l10n-id="pdfjs-editor-add-signature-error-close-button"></span></button>
                        </div>
                    </div>
                    <div class="dialogButtonsGroup">
                        <button id="addSignatureCancelButton" type="button" class="secondaryButton" tabindex="0"><span
                                data-l10n-id="pdfjs-editor-add-signature-cancel-button"></span></button>
                        <button id="addSignatureAddButton" type="button" class="primaryButton" disabled
                            tabindex="0"><span data-l10n-id="pdfjs-editor-add-signature-add-button"></span></button>
                    </div>
                </div>
            </div>
        </dialog>

        <dialog class="dialog signatureDialog" id="editSignatureDescriptionDialog"
            aria-labelledby="editSignatureDescriptionTitle">
            <div id="editSignatureDescriptionContainer" class="mainContainer">
                <div class="title">
                    <span id="editSignatureDescriptionTitle" role="sectionhead"
                        data-l10n-id="pdfjs-editor-edit-signature-dialog-title" tabindex="0"></span>
                </div>
                <div id="editSignatureDescriptionAndView">
                    <div id="editSignatureDescriptionContainer">
                        <label for="editSignatureDescInput"
                            data-l10n-id="pdfjs-editor-add-signature-description-label"></label>
                        <span id="editSignatureDescription" class="inputWithClearButton">
                            <input id="editSignatureDescInput" type="text"
                                data-l10n-id="pdfjs-editor-add-signature-description-input" tabindex="0"></input>
                            <button class="clearInputButton" type="button" tabindex="0" aria-hidden="true"></button>
                        </span>
                    </div>
                    <svg id="editSignatureView" xmlns="http://www.w3.org/2000/svg"></svg>
                </div>
                <div class="dialogButtonsGroup">
                    <button id="editSignatureCancelButton" type="button" class="secondaryButton" tabindex="0"><span
                            data-l10n-id="pdfjs-editor-add-signature-cancel-button"></span></button>
                    <button id="editSignatureUpdateButton" type="button" class="primaryButton" disabled
                        tabindex="0"><span data-l10n-id="pdfjs-editor-edit-signature-update-button"></span></button>
                </div>
            </div>
        </dialog>

        <dialog class="dialog commentManager" id="commentManagerDialog" aria-labelledby="commentManagerTitle">
            <div class="mainContainer">
                <div class="title" id="commentManagerToolbar">
                    <span id="commentManagerTitle" role="sectionhead"
                        data-l10n-id="pdfjs-editor-edit-comment-dialog-title-when-adding"></span>
                </div>
                <textarea id="commentManagerTextInput" data-l10n-id="pdfjs-editor-edit-comment-dialog-text-input"
                    tabindex="0"></textarea>
                <div class="dialogButtonsGroup">
                    <button id="commentManagerCancelButton" type="button" class="secondaryButton" tabindex="0">
                        <span data-l10n-id="pdfjs-editor-edit-comment-dialog-cancel-button"></span>
                    </button>
                    <button id="commentManagerSaveButton" type="button" class="primaryButton" disabled tabindex="0">
                        <span data-l10n-id="pdfjs-editor-edit-comment-dialog-save-button-when-adding"></span>
                    </button>
                </div>
            </div>
        </dialog>

        <!--#if !MOZCENTRAL-->
        <dialog id="printServiceDialog" style="min-width: 200px;">
            <div class="row">
                <span data-l10n-id="pdfjs-print-progress-message"></span>
            </div>
            <div class="row">
                <progress value="0" max="100"></progress>
                <span data-l10n-id="pdfjs-print-progress-percent" data-l10n-args='{ "progress": 0 }'
                    class="relative-progress">0%</span>
            </div>
            <div class="buttonRow">
                <button id="printCancel" class="dialogButton" type="button"><span
                        data-l10n-id="pdfjs-print-progress-close-button"></span></button>
            </div>
        </dialog>
        <!--#endif-->
        <!--#if CHROME-->
        <!--#include viewer-snippet-chrome-overlays.html-->
        <!--#endif-->
    </div>
</template>