const modal = () => {
    const tabContent = document.getElementById("tab-content");
    if (!tabContent)
        return;

    const tabArea = document.createElement("div");
    tabArea.id = "tab-area";

    tabContent.appendChild(tabArea);
};

export default modal;