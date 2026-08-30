import { state } from "../state.js";
import { loadSVG } from "../utils/svg.js";

export const leftNavbar = document.getElementById("left-nav-container");

let leftIconsJson;

document.addEventListener("DOMContentLoaded", async () => {
  await loadLeftIconsJson();
  await loadDefault();
});

async function loadDefault() {
  const lastSelectedTab = leftIconsJson[state.currentTabId];
  if (!lastSelectedTab) {
    localStorage.setItem("currentTabId", "0");
    state.currentTabId = 0;
  }

  await setupLeftNavbar(lastSelectedTab);
}

async function loadLeftIconsJson() {
  const res = await fetch("../../file-icons/left-nav-icons.json");
  const json = await res.json();

  leftIconsJson = json;
}

async function setupLeftNavbar(lastSelected) {
  for (let i = 0; i < leftIconsJson.length; i++) {
    const icon = leftIconsJson[i];
    const svg = await loadSVG(icon.iconPath);
    if (svg) {
      if (lastSelected && lastSelected === icon) svg.classList.add("active");

      svg.onclick = () => iconClickHandler(svg);
      svg.id = i.toString();
      leftNavbar.appendChild(svg);
    }
  }
}

function iconClickHandler(svg) {
  Object.values(leftNavbar.children).forEach((element) => {
    element.classList.remove("active");
  });

  localStorage.setItem("currentTabId", svg.id);
  svg.classList.add("active");
}

export function expandLeftNavbar() {
  leftNavbar.style.width = "100px";
}

export function shrinkLeftNavbar() {
  leftNavbar.style.width = "50px";
}
