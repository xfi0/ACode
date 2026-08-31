import { expandLeftNavbar, shrinkLeftNavbar, leftNavbar } from "./ui/left-navbar.js";
import { loadSVG } from "./utils/svg.js";

const fileTabsContainer = document.getElementById("file-tabs-container");
const fileIcon = document.getElementById("file-icon");
const plusImagePath = "../file-icons/plus.svg";
const plusImageColor = "#FFFFFF";
let currentFileCount = 0;

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
  currentFileCount++;
}

async function createNewTabButton() {
  const icon = await loadSVG(plusImagePath, plusImageColor);
  icon.onclick = async () => {
    await createFile("new.txt", currentFileCount);
    adjustNewTabButton(icon);
  };
  fileTabsContainer.appendChild(icon);
}

function adjustNewTabButton(self) {
  fileTabsContainer.appendChild(self);
}

async function getFileContent(fileId) {
  if (fileId == undefined) return "File not found for file: " + fileId;

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

  return content ?? "";
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
    if (!iconsJson) return undefined;
  }

  let res = iconsJson.find((icon) => icon.fileTypes.includes("default"));
  for (const icon of iconsJson) {
    for (const fileTypee of icon.fileTypes)
      if (fileTypee == fileType) {
        res = icon;
        break;
      }
  }

  const icon = await loadSVG(res.iconPath, res.color);
  icon.classList.add("file-icon");

  tab.prepend(icon);
}

function createTab() {
  const tab = document.createElement("div");
  tab.classList.add("tab");

  return tab;
}

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    save();
  }
});

function save() {
  console.log("Saving...");
}

document.addEventListener("DOMContentLoaded", async () => {
  await getFileIconsData();
  await createFile("index.html", currentFileCount);
  await createNewTabButton();
});