const modal = () => {
  const tabContent = document.getElementById("tab-content");
  if (!tabContent) return;

  const tabArea = document.createElement("div");
  tabArea.id = "tab-area";

  const leftArea = document.createElement("div");
  leftArea.id = "left-area";
  leftArea.style.flex = "1";

  const rightArea = document.createElement("div");
  rightArea.id = "right-area";
  rightArea.style.flex = "1";

  const userList = document.createElement("div");
  userList.id = "user-list";

  const codeHeader = document.createElement("h2");
  codeHeader.innerText = "Room Code:";

  const codeInput = document.createElement("input");

  const leaveRoom = document.createElement("button");
  leaveRoom.innerText = "Leave Room";

  tabContent.appendChild(tabArea);
  tabArea.appendChild(leftArea);
  tabArea.appendChild(rightArea);
  leftArea.appendChild(codeHeader);
  leftArea.appendChild(codeInput);
  rightArea.appendChild(userList);
};

export default modal;
