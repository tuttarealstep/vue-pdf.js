export default (rootElement: ShadowRoot | Document) => {

  const getElement = (id: string) => rootElement.getElementById(id);

  return {
    appContainer: getElement("appContainer"),
    principalContainer: getElement("mainContainer"),
    mainContainer: getElement("viewerContainer"),
    viewerContainer: getElement("viewer"),
    viewerAlert: getElement("viewer-alert"),
    toolbar: {
      container: getElement("toolbarContainer"),
      numPages: getElement("numPages"),
      pageNumber: getElement("pageNumber"),
      scaleSelect: getElement("scaleSelect"),
      customScaleOption: getElement("customScaleOption"),
      previous: getElement("previous"),
      next: getElement("next"),
      zoomIn: getElement("zoomInButton"),
      zoomOut: getElement("zoomOutButton"),
      print: getElement("printButton"),
      editorFreeTextButton: getElement("editorFreeTextButton"),
      editorFreeTextParamsToolbar: getElement(
        "editorFreeTextParamsToolbar"
      ),
      editorHighlightButton: getElement("editorHighlightButton"),
      editorHighlightParamsToolbar: getElement(
        "editorHighlightParamsToolbar"
      ),
      editorHighlightColorPicker: getElement(
        "editorHighlightColorPicker"
      ),
      editorInkButton: getElement("editorInkButton"),
      editorInkParamsToolbar: getElement("editorInkParamsToolbar"),
      editorStampButton: getElement("editorStampButton"),
      editorStampParamsToolbar: getElement(
        "editorStampParamsToolbar"
      ),
      editorSignatureButton: getElement("editorSignatureButton"),
      editorSignatureParamsToolbar: getElement("editorSignatureParamsToolbar"),
      download: getElement("downloadButton"),
    },
    secondaryToolbar: {
      toolbar: getElement("secondaryToolbar"),
      toggleButton: getElement("secondaryToolbarToggleButton"),
      presentationModeButton: getElement("presentationMode"),
      openFileButton: getElement("secondaryOpenFile"),
      printButton: getElement("secondaryPrint"),
      downloadButton: getElement("secondaryDownload"),
      viewBookmarkButton: getElement("viewBookmark"),
      firstPageButton: getElement("firstPage"),
      lastPageButton: getElement("lastPage"),
      pageRotateCwButton: getElement("pageRotateCw"),
      pageRotateCcwButton: getElement("pageRotateCcw"),
      cursorSelectToolButton: getElement("cursorSelectTool"),
      cursorHandToolButton: getElement("cursorHandTool"),
      scrollPageButton: getElement("scrollPage"),
      scrollVerticalButton: getElement("scrollVertical"),
      scrollHorizontalButton: getElement("scrollHorizontal"),
      scrollWrappedButton: getElement("scrollWrapped"),
      spreadNoneButton: getElement("spreadNone"),
      spreadOddButton: getElement("spreadOdd"),
      spreadEvenButton: getElement("spreadEven"),
      imageAltTextSettingsButton: getElement(
        "imageAltTextSettings"
      ),
      imageAltTextSettingsSeparator: getElement(
        "imageAltTextSettingsSeparator"
      ),
      documentPropertiesButton: getElement("documentProperties"),
    },
    sidebar: {
      // Divs (and sidebar button)
      outerContainer: getElement("outerContainer"),
      sidebarContainer: getElement("sidebarContainer"),
      toggleButton: getElement("sidebarToggleButton"),
      resizer: getElement("sidebarResizer"),
      // Buttons
      thumbnailButton: getElement("viewThumbnail"),
      outlineButton: getElement("viewOutline"),
      attachmentsButton: getElement("viewAttachments"),
      layersButton: getElement("viewLayers"),
      // Views
      thumbnailView: getElement("thumbnailView"),
      outlineView: getElement("outlineView"),
      attachmentsView: getElement("attachmentsView"),
      layersView: getElement("layersView"),
      // View-specific options
      currentOutlineItemButton: getElement("currentOutlineItem"),
    },
    findBar: {
      bar: getElement("findbar"),
      toggleButton: getElement("viewFindButton"),
      findField: getElement("findInput"),
      highlightAllCheckbox: getElement("findHighlightAll"),
      caseSensitiveCheckbox: getElement("findMatchCase"),
      matchDiacriticsCheckbox: getElement("findMatchDiacritics"),
      entireWordCheckbox: getElement("findEntireWord"),
      findMsg: getElement("findMsg"),
      findResultsCount: getElement("findResultsCount"),
      findPreviousButton: getElement("findPreviousButton"),
      findNextButton: getElement("findNextButton"),
    },
    passwordOverlay: {
      dialog: getElement("passwordDialog"),
      label: getElement("passwordText"),
      input: getElement("password"),
      submitButton: getElement("passwordSubmit"),
      cancelButton: getElement("passwordCancel"),
    },
    documentProperties: {
      dialog: getElement("documentPropertiesDialog"),
      closeButton: getElement("documentPropertiesClose"),
      fields: {
        fileName: getElement("fileNameField"),
        fileSize: getElement("fileSizeField"),
        title: getElement("titleField"),
        author: getElement("authorField"),
        subject: getElement("subjectField"),
        keywords: getElement("keywordsField"),
        creationDate: getElement("creationDateField"),
        modificationDate: getElement("modificationDateField"),
        creator: getElement("creatorField"),
        producer: getElement("producerField"),
        version: getElement("versionField"),
        pageCount: getElement("pageCountField"),
        pageSize: getElement("pageSizeField"),
        linearized: getElement("linearizedField"),
      },
    },
    altTextDialog: {
      dialog: getElement("altTextDialog"),
      optionDescription: getElement("descriptionButton"),
      optionDecorative: getElement("decorativeButton"),
      textarea: getElement("descriptionTextarea"),
      cancelButton: getElement("altTextCancel"),
      saveButton: getElement("altTextSave"),
    },
    newAltTextDialog: {
      dialog: getElement("newAltTextDialog"),
      title: getElement("newAltTextTitle"),
      descriptionContainer: getElement(
        "newAltTextDescriptionContainer"
      ),
      textarea: getElement("newAltTextDescriptionTextarea"),
      disclaimer: getElement("newAltTextDisclaimer"),
      learnMore: getElement("newAltTextLearnMore"),
      imagePreview: getElement("newAltTextImagePreview"),
      createAutomatically: getElement(
        "newAltTextCreateAutomatically"
      ),
      createAutomaticallyButton: getElement(
        "newAltTextCreateAutomaticallyButton"
      ),
      downloadModel: getElement("newAltTextDownloadModel"),
      downloadModelDescription: getElement(
        "newAltTextDownloadModelDescription"
      ),
      error: getElement("newAltTextError"),
      errorCloseButton: getElement("newAltTextCloseButton"),
      cancelButton: getElement("newAltTextCancel"),
      notNowButton: getElement("newAltTextNotNow"),
      saveButton: getElement("newAltTextSave"),
    },
    altTextSettingsDialog: {
      dialog: getElement("altTextSettingsDialog"),
      createModelButton: getElement("createModelButton"),
      aiModelSettings: getElement("aiModelSettings"),
      learnMore: getElement("altTextSettingsLearnMore"),
      deleteModelButton: getElement("deleteModelButton"),
      downloadModelButton: getElement("downloadModelButton"),
      showAltTextDialogButton: getElement(
        "showAltTextDialogButton"
      ),
      altTextSettingsCloseButton: getElement(
        "altTextSettingsCloseButton"
      ),
      closeButton: getElement("altTextSettingsCloseButton"),
    },
    addSignatureDialog: {
      dialog: getElement("addSignatureDialog"),
      panels: getElement("addSignatureActionContainer"),
      typeButton: getElement("addSignatureTypeButton"),
      typeInput: getElement("addSignatureTypeInput"),
      drawButton: getElement("addSignatureDrawButton"),
      drawSVG: getElement("addSignatureDraw"),
      drawPlaceholder: getElement("addSignatureDrawPlaceholder"),
      drawThickness: getElement("addSignatureDrawThickness"),
      imageButton: getElement("addSignatureImageButton"),
      imageSVG: getElement("addSignatureImage"),
      imagePlaceholder: getElement("addSignatureImagePlaceholder"),
      imagePicker: getElement("addSignatureFilePicker"),
      imagePickerLink: getElement("addSignatureImageBrowse"),
      description: getElement("addSignatureDescription"),
      clearButton: getElement("clearSignatureButton"),
      saveContainer: getElement("addSignatureSaveContainer"),
      saveCheckbox: getElement("addSignatureSaveCheckbox"),
      errorBar: getElement("addSignatureError"),
      errorCloseButton: getElement("addSignatureErrorCloseButton"),
      cancelButton: getElement("addSignatureCancelButton"),
      addButton: getElement("addSignatureAddButton"),
    },
    editSignatureDialog: {
      dialog: getElement("editSignatureDescriptionDialog"),
      description: getElement("editSignatureDescription"),
      editSignatureView: getElement("editSignatureView"),
      cancelButton: getElement("editSignatureCancelButton"),
      updateButton: getElement("editSignatureUpdateButton"),
    },
    annotationEditorParams: {
      editorFreeTextFontSize: getElement("editorFreeTextFontSize"),
      editorFreeTextColor: getElement("editorFreeTextColor"),
      editorInkColor: getElement("editorInkColor"),
      editorInkThickness: getElement("editorInkThickness"),
      editorInkOpacity: getElement("editorInkOpacity"),
      editorStampAddImage: getElement("editorStampAddImage"),
      editorSignatureAddSignature: getElement("editorSignatureAddSignature"),
      editorFreeHighlightThickness: getElement(
        "editorFreeHighlightThickness"
      ),
      editorHighlightShowAll: getElement("editorHighlightShowAll"),
    },
    printContainer: getElement("printContainer"),
  };
}