const fs = require("fs").promises;
const path = require("path");

const dirPath = path.join(__dirname, "files");

async function writeToFile(fileName, content) {
  if (!fileName) 
    return;

  const filePath = path.join(dirPath, fileName);

  try {
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(filePath, content, "utf-8");
  } catch (err) {
    console.error("Write failed:", err);
  }
}

async function readFile(fileName) {
  if (!fileName) return;
  const filePath = path.join(dirPath, fileName);

  try {
    return await fs.readFile(filePath, "utf-8");
  } catch (err) {
    console.error("Read failed:", err);
  }
}

module.exports = { writeToFile, readFile };
