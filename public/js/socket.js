import { editor } from "./editor.js";
import { applyChange, deltas } from "./delta.js";
const socket = io();

export function joinRoom(fileId) {
  socket.emit("join-doc", fileId);
  console.log("joined room: " + fileId);
}

socket.on("receive-edit", (delta) => {
    editor.value = applyChange(editor.value, delta);
});

socket.on("user-joined", (user) => {
  console.log(user);
});

export { socket };
