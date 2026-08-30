let state = {
    currentFileId: localStorage.getItem("currentFileId") ?? 0,
    currentTabId: localStorage.getItem("currentTabId") ?? 0
};

export {state};