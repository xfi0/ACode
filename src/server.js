const express = require("express");
const http = require("http");
const app = express();
const createCollabServer = require("./collab/collabServer").default;
const path = require("path");
const { readFile } = require("./collab/files");
const publicPath = path.join(__dirname, "../public");
const server = http.createServer(app);

app.use(express.json());
app.use(express.static(publicPath));

app.post("/api/getFileContent", async (req, res) => {
  if (!req.body.fileId == undefined)
    return res.status(400).json({ error: "fileId is required" });

  try {
    const content = await readFile(req.body.fileId + ".txt");
    return res.status(200).json({ content });
  } catch (err) {
    console.error("Failed to read file:", err);
    return res.status(500).json({ error: "Failed to read file" });
  }
});


const port = 8000;
createCollabServer(server);

server.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});
