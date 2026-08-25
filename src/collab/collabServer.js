import { Server } from "socket.io";
import { applyDelta, shouldWriteKey } from "./edits.js";
import path from "path";

function setupCollab(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("connected");

    socket.on("join-doc", (fileId) => {
      console.log("user joined doc: " + fileId);
      socket.join(fileId);
      socket.emit("user-joined", "test");
    });

    socket.on("edit", async ({ fileId, delta }) => {
      const result = await applyDelta(fileId + ".txt", delta);
      socket.to(fileId).emit("receive-edit", delta);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

export default setupCollab;
