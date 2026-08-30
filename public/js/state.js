let state = {
  currentFileId: Number(localStorage.getItem("currentFileId") ?? "0"),
  currentTabId:  Number(localStorage.getItem("currentTabId")  ?? "0"),
  connectedToRemote: false
};

export { state };