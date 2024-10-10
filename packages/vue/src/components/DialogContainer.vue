<template>
    <div id="dialogContainer">
        <dialog id="passwordDialog">
            <div class="row">
                <label for="password" id="passwordText" data-l10n-id="pdfjs-password-label">Enter the password to
                    open this PDF file:</label>
            </div>
            <div class="row">
                <input type="password" id="password" class="toolbarField">
            </div>
            <div class="buttonRow">
                <button id="passwordCancel" class="dialogButton" type="button"><span
                        data-l10n-id="pdfjs-password-cancel-button">Cancel</span></button>
                <button id="passwordSubmit" class="dialogButton" type="button"><span
                        data-l10n-id="pdfjs-password-ok-button">OK</span></button>
            </div>
        </dialog>
        <dialog id="documentPropertiesDialog">
            <div class="row">
                <span id="fileNameLabel" data-l10n-id="pdfjs-document-properties-file-name">File name:</span>
                <p id="fileNameField" aria-labelledby="fileNameLabel">-</p>
            </div>
            <div class="row">
                <span id="fileSizeLabel" data-l10n-id="pdfjs-document-properties-file-size">File size:</span>
                <p id="fileSizeField" aria-labelledby="fileSizeLabel">-</p>
            </div>
            <div class="separator"></div>
            <div class="row">
                <span id="titleLabel" data-l10n-id="pdfjs-document-properties-title">Title:</span>
                <p id="titleField" aria-labelledby="titleLabel">-</p>
            </div>
            <div class="row">
                <span id="authorLabel" data-l10n-id="pdfjs-document-properties-author">Author:</span>
                <p id="authorField" aria-labelledby="authorLabel">-</p>
            </div>
            <div class="row">
                <span id="subjectLabel" data-l10n-id="pdfjs-document-properties-subject">Subject:</span>
                <p id="subjectField" aria-labelledby="subjectLabel">-</p>
            </div>
            <div class="row">
                <span id="keywordsLabel" data-l10n-id="pdfjs-document-properties-keywords">Keywords:</span>
                <p id="keywordsField" aria-labelledby="keywordsLabel">-</p>
            </div>
            <div class="row">
                <span id="creationDateLabel" data-l10n-id="pdfjs-document-properties-creation-date">Creation
                    Date:</span>
                <p id="creationDateField" aria-labelledby="creationDateLabel">-</p>
            </div>
            <div class="row">
                <span id="modificationDateLabel" data-l10n-id="pdfjs-document-properties-modification-date">Modification
                    Date:</span>
                <p id="modificationDateField" aria-labelledby="modificationDateLabel">-</p>
            </div>
            <div class="row">
                <span id="creatorLabel" data-l10n-id="pdfjs-document-properties-creator">Creator:</span>
                <p id="creatorField" aria-labelledby="creatorLabel">-</p>
            </div>
            <div class="separator"></div>
            <div class="row">
                <span id="producerLabel" data-l10n-id="pdfjs-document-properties-producer">PDF Producer:</span>
                <p id="producerField" aria-labelledby="producerLabel">-</p>
            </div>
            <div class="row">
                <span id="versionLabel" data-l10n-id="pdfjs-document-properties-version">PDF Version:</span>
                <p id="versionField" aria-labelledby="versionLabel">-</p>
            </div>
            <div class="row">
                <span id="pageCountLabel" data-l10n-id="pdfjs-document-properties-page-count">Page Count:</span>
                <p id="pageCountField" aria-labelledby="pageCountLabel">-</p>
            </div>
            <div class="row">
                <span id="pageSizeLabel" data-l10n-id="pdfjs-document-properties-page-size">Page Size:</span>
                <p id="pageSizeField" aria-labelledby="pageSizeLabel">-</p>
            </div>
            <div class="separator"></div>
            <div class="row">
                <span id="linearizedLabel" data-l10n-id="pdfjs-document-properties-linearized">Fast Web View:</span>
                <p id="linearizedField" aria-labelledby="linearizedLabel">-</p>
            </div>
            <div class="buttonRow">
                <button id="documentPropertiesClose" class="dialogButton" type="button"><span
                        data-l10n-id="pdfjs-document-properties-close-button">Close</span></button>
            </div>
        </dialog>
        <dialog class="dialog altText" id="altTextDialog" aria-labelledby="dialogLabel"
            aria-describedby="dialogDescription">
            <div id="altTextContainer" class="mainContainer">
                <div id="overallDescription">
                    <span id="dialogLabel" data-l10n-id="pdfjs-editor-alt-text-dialog-label" class="title">Choose an
                        option</span>
                    <span id="dialogDescription" data-l10n-id="pdfjs-editor-alt-text-dialog-description">
                        Alt text (alternative text) helps when people can’t see the image or when it doesn’t load.
                    </span>
                </div>
                <div id="addDescription">
                    <div class="radio">
                        <div class="radioButton">
                            <input type="radio" id="descriptionButton" name="altTextOption" tabindex="0"
                                aria-describedby="descriptionAreaLabel" checked>
                            <label for="descriptionButton"
                                data-l10n-id="pdfjs-editor-alt-text-add-description-label">Add a description</label>
                        </div>
                        <div class="radioLabel">
                            <span id="descriptionAreaLabel"
                                data-l10n-id="pdfjs-editor-alt-text-add-description-description">
                                Aim for 1-2 sentences that describe the subject, setting, or actions.
                            </span>
                        </div>
                    </div>
                    <div class="descriptionArea">
                        <textarea id="descriptionTextarea"
                            placeholder="For example, “A young man sits down at a table to eat a meal”"
                            aria-labelledby="descriptionAreaLabel" data-l10n-id="pdfjs-editor-alt-text-textarea"
                            tabindex="0"></textarea>
                    </div>
                </div>
                <div id="markAsDecorative">
                    <div class="radio">
                        <div class="radioButton">
                            <input type="radio" id="decorativeButton" name="altTextOption"
                                aria-describedby="decorativeLabel">
                            <label for="decorativeButton"
                                data-l10n-id="pdfjs-editor-alt-text-mark-decorative-label">Mark as
                                decorative</label>
                        </div>
                        <div class="radioLabel">
                            <span id="decorativeLabel" data-l10n-id="pdfjs-editor-alt-text-mark-decorative-description">
                                This is used for ornamental images, like borders or watermarks.
                            </span>
                        </div>
                    </div>
                </div>
                <div id="buttons">
                    <button id="altTextCancel" class="secondaryButton" type="button" tabindex="0"><span
                            data-l10n-id="pdfjs-editor-alt-text-cancel-button">Cancel</span></button>
                    <button id="altTextSave" class="primaryButton" type="button" tabindex="0"><span
                            data-l10n-id="pdfjs-editor-alt-text-save-button">Save</span></button>
                </div>
            </div>
        </dialog>
        <dialog class="dialog newAltText" id="newAltTextDialog" aria-labelledby="newAltTextTitle"
            aria-describedby="newAltTextDescription" tabindex="0">
            <div id="newAltTextContainer" class="mainContainer">
                <div class="title">
                    <span id="newAltTextTitle" data-l10n-id="pdfjs-editor-new-alt-text-dialog-edit-label"
                        role="sectionhead" tabindex="0">Edit alt text (image description)</span>
                </div>
                <div id="mainContent">
                    <div id="descriptionAndSettings">
                        <div id="descriptionInstruction">
                            <div id="newAltTextDescriptionContainer">
                                <div class="altTextSpinner" role="status" aria-live="polite"></div>
                                <textarea id="newAltTextDescriptionTextarea" placeholder="Write your description here…"
                                    aria-labelledby="descriptionAreaLabel"
                                    data-l10n-id="pdfjs-editor-new-alt-text-textarea" tabindex="0"></textarea>
                            </div>
                            <span id="newAltTextDescription" role="note"
                                data-l10n-id="pdfjs-editor-new-alt-text-description">Short description for people
                                who can’t see the image or when the image doesn’t load.</span>
                            <div id="newAltTextDisclaimer" role="note">
                                <div><span data-l10n-id="pdfjs-editor-new-alt-text-disclaimer1">This alt text was
                                        created automatically and may be inaccurate.</span> <a
                                        href="https://support.mozilla.org/en-US/kb/pdf-alt-text" target="_blank"
                                        rel="noopener noreferrer" id="newAltTextLearnMore"
                                        data-l10n-id="pdfjs-editor-new-alt-text-disclaimer-learn-more-url"
                                        tabindex="0">Learn more</a></div>
                            </div>
                        </div>
                        <div id="newAltTextCreateAutomatically" class="toggler">
                            <button id="newAltTextCreateAutomaticallyButton" class="toggle-button" type="button"
                                aria-pressed="true" tabindex="0"></button>
                            <label for="newAltTextCreateAutomaticallyButton" class="togglerLabel"
                                data-l10n-id="pdfjs-editor-new-alt-text-create-automatically-button-label">Create
                                alt text automatically</label>
                        </div>
                        <div id="newAltTextDownloadModel" class="hidden">
                            <span id="newAltTextDownloadModelDescription"
                                data-l10n-id="pdfjs-editor-new-alt-text-ai-model-downloading-progress" aria-valuemin="0"
                                data-l10n-args='{ "totalSize": 0, "downloadedSize": 0 }'>Downloading alt text AI
                                model (0 of 0 MB)</span>
                        </div>
                    </div>
                    <div id="newAltTextImagePreview"></div>
                </div>
                <div id="newAltTextError" class="messageBar">
                    <div>
                        <div>
                            <span class="title" data-l10n-id="pdfjs-editor-new-alt-text-error-title">Couldn’t create
                                alt text automatically</span>
                            <span class="description" data-l10n-id="pdfjs-editor-new-alt-text-error-description">Please
                                write your own alt
                                text or try again later.</span>
                        </div>
                        <button id="newAltTextCloseButton" class="closeButton" type="button" tabindex="0"
                            title="Close"><span
                                data-l10n-id="pdfjs-editor-new-alt-text-error-close-button">Close</span></button>
                    </div>
                </div>
                <div id="newAltTextButtons" class="dialogButtonsGroup">
                    <button id="newAltTextCancel" type="button" class="secondaryButton hidden" tabindex="0"><span
                            data-l10n-id="pdfjs-editor-alt-text-cancel-button">Cancel</span></button>
                    <button id="newAltTextNotNow" type="button" class="secondaryButton" tabindex="0"><span
                            data-l10n-id="pdfjs-editor-new-alt-text-not-now-button">Not now</span></button>
                    <button id="newAltTextSave" type="button" class="primaryButton" tabindex="0"><span
                            data-l10n-id="pdfjs-editor-alt-text-save-button">Save</span></button>
                </div>
            </div>
        </dialog>

        <dialog class="dialog" id="altTextSettingsDialog" aria-labelledby="altTextSettingsTitle">
            <div id="altTextSettingsContainer" class="mainContainer">
                <div class="title">
                    <span id="altTextSettingsTitle" data-l10n-id="pdfjs-editor-alt-text-settings-dialog-label"
                        role="sectionhead" tabindex="0" class="title">Image alt text settings</span>
                </div>
                <div id="automaticAltText">
                    <span data-l10n-id="pdfjs-editor-alt-text-settings-automatic-title">Automatic alt text</span>
                    <div id="automaticSettings">
                        <div id="createModelSetting">
                            <div class="toggler">
                                <button id="createModelButton" type="button" class="toggle-button" aria-pressed="true"
                                    tabindex="0"></button>
                                <label for="createModelButton" class="togglerLabel"
                                    data-l10n-id="pdfjs-editor-alt-text-settings-create-model-button-label">Create
                                    alt text automatically</label>
                            </div>
                            <div id="createModelDescription" class="description">
                                <span data-l10n-id="pdfjs-editor-alt-text-settings-create-model-description">Suggests
                                    descriptions to help people who can’t see the image or when the image doesn’t
                                    load.</span> <a href="https://support.mozilla.org/en-US/kb/pdf-alt-text"
                                    target="_blank" rel="noopener noreferrer" id="altTextSettingsLearnMore"
                                    data-l10n-id="pdfjs-editor-new-alt-text-disclaimer-learn-more-url"
                                    tabindex="0">Learn more</a>
                            </div>
                        </div>
                        <div id="aiModelSettings">
                            <div>
                                <span data-l10n-id="pdfjs-editor-alt-text-settings-download-model-label"
                                    data-l10n-args='{ "totalSize": 180 }'>Alt text AI model (180MB)</span>
                                <div id="aiModelDescription" class="description">
                                    <span data-l10n-id="pdfjs-editor-alt-text-settings-ai-model-description">Runs
                                        locally on your device so your data stays private. Required for automatic
                                        alt text.</span>
                                </div>
                            </div>
                            <button id="deleteModelButton" type="button" class="secondaryButton" tabindex="0"><span
                                    data-l10n-id="pdfjs-editor-alt-text-settings-delete-model-button">Delete</span></button>
                            <button id="downloadModelButton" type="button" class="secondaryButton" tabindex="0"><span
                                    data-l10n-id="pdfjs-editor-alt-text-settings-download-model-button">Download</span></button>
                        </div>
                    </div>
                </div>
                <div class="dialogSeparator"></div>
                <div id="altTextEditor">
                    <span data-l10n-id="pdfjs-editor-alt-text-settings-editor-title">Alt text editor</span>
                    <div id="showAltTextEditor">
                        <div class="toggler">
                            <button id="showAltTextDialogButton" type="button" class="toggle-button" aria-pressed="true"
                                tabindex="0"></button>
                            <label for="showAltTextDialogButton" class="togglerLabel"
                                data-l10n-id="pdfjs-editor-alt-text-settings-show-dialog-button-label">Show alt text
                                editor right away when adding an image</label>
                        </div>
                        <div id="showAltTextDialogDescription" class="description">
                            <span data-l10n-id="pdfjs-editor-alt-text-settings-show-dialog-description">Helps you
                                make sure all your images have alt text.</span>
                        </div>
                    </div>
                </div>
                <div id="buttons" class="dialogButtonsGroup">
                    <button id="altTextSettingsCloseButton" type="button" class="primaryButton" tabindex="0"><span
                            data-l10n-id="pdfjs-editor-alt-text-settings-close-button">Close</span></button>
                </div>
            </div>
        </dialog>
        <dialog id="printServiceDialog" style="min-width: 200px;">
            <div class="row">
                <span data-l10n-id="pdfjs-print-progress-message">Preparing document for printing…</span>
            </div>
            <div class="row">
                <progress value="0" max="100"></progress>
                <span data-l10n-id="pdfjs-print-progress-percent" data-l10n-args='{ "progress": 0 }'
                    class="relative-progress">0%</span>
            </div>
            <div class="buttonRow">
                <button id="printCancel" class="dialogButton" type="button"><span
                        data-l10n-id="pdfjs-print-progress-close-button">Cancel</span></button>
            </div>
        </dialog>
    </div>
</template>