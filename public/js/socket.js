import { editor } from "./editor.js";
import { applyChange, deltas } from "./delta.js";
import { state } from "./state.js";
const socket = io();

export function joinRoom(roomId) {
  socket.emit("join-doc", roomId);
  console.log("joined room: " + roomId);
  state.connectedToRemote = true;
}

export function leaveRoom(roomId) {
  state.connectedToRemote = false;
}
socket.on("receive-edit", (delta) => {
  editor.value = applyChange(editor.value, delta);
});

socket.on("user-joined", (user) => {
  console.log(user);
});

export { socket };
