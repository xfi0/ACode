import { joinRoom } from "./socket.js"
import { state } from "./state.js"

document.addEventListener("DOMContentLoaded", () => {
    joinRoom(state.currentFileId);
});