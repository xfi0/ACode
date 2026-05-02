import { rightNavbar, expandRightNavbar, shrinkRightNavbar } from "./ui/navbar.js";

const fileTabsContainer = document.getElementById("file-tabs-container");
const fileIcon = document.getElementById("file-icon");

let iconsJson = null;
let tabs;

async function createFile(fileName, id) {
  const tab = createTab();
  const editor = document.querySelector(".text-editor");
  const tabTitle = document.createElement("p");
  tabTitle.innerText = fileName;

  const fileType = getFileType(fileName);

  addFileIcon(fileType, tab);
  editor.value = await getFileContent(id);
  tab.appendChild(tabTitle);
  fileTabsContainer.appendChild(tab);
}

async function getFileContent(fileId) {
  if (!fileId) return "File Not Found";

  const response = await fetch("/api/getFileContent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileId: fileId,
    }),
  });
  const json = await response.json();
  const content = json.content;

  return content;
}

function getFileType(fileName) {
  if (!fileName) return undefined;

  const lastDot = fileName.lastIndexOf(".");
  const fileType = fileName.substring(lastDot + 1);

  return fileType;
}

async function getFileIconsData() {
  if (iconsJson) return iconsJson;

  const response = await fetch("./file-icons/icons.json");

  iconsJson = await response.json();
  return iconsJson;
}

async function addFileIcon(fileType, tab) {
  if (!iconsJson) {
    await getFileIconsData();
    return undefined;
  }

  console.log(fileType);
  const res = iconsJson.find((type) => type.fileType === fileType);
  const icon = await loadSVG(res.iconPath, res.color);
  icon.classList.add("file-icon");

  tab.prepend(icon);
}

async function loadSVG(path, color) {
  if (!path) return;

  const response = await fetch(path);
  const text = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "image/svg+xml");
  const svg = doc.querySelector("svg");
  svg.style.color = color;

  if (!svg) return;

  return svg;
}

function createTab() {
  const tab = document.createElement("div");
  tab.classList.add("tab");

  return tab;
}

document.addEventListener("DOMContentLoaded", async () => {
  await getFileIconsData();
  await createFile("index.html", 1);
});

fileIcon.addEventListener("click", () => {
    if (rightNavbar.style.width === "50px")
      expandRightNavbar();
    else
      shrinkRightNavbar();
});
