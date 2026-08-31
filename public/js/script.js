import { joinRoom } from "./socket.js"
import { state } from "./state.js"
import { createTabs } from "./ui/top-navbar.js"

document.addEventListener("DOMContentLoaded", () => {
    joinRoom(state.currentFileId);
    createTabs();
});