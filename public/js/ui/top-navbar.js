const tabs = ["File"];
const topNavContainer = document.getElementById("top-nav-container");

export function createTabs() {
  tabs.forEach((tab) => {
    const topTabContainer = document.createElement("div");
    topTabContainer.classList.add("top-tab-container");

    const tabHeader = document.createElement("p");
    tabHeader.classList.add("top-tab-header");
    tabHeader.innerText = tab;

    topTabContainer.appendChild(tabHeader);
    topNavContainer.appendChild(topTabContainer);
  });
}
