
const modal = () => { // tab content should be cleared before adding this
    const tabContent = document.getElementById("tab-content");
    if (!tabContent)
        return;

    const tabArea = document.createElement("div");
    tabArea.id = "tab-area";

    const textEditorContainer = document.createElement("div");
    textEditorContainer.id = "text-editor-container";

    const textEditor = document.createElement("textarea");
    textEditor.classList.add("text-editor");

    tabContent.appendChild(tabArea);
    tabArea.appendChild(textEditorContainer);
    textEditorContainer.appendChild(textEditor);
};

export default modal;