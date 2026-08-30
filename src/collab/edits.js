const { writeToFile } = require("./files.js");

const docs = new Map();
const writeTimers = new Map();

async function resetDocs() {
  docs.clear();
  writeTimers.forEach((t) => clearTimeout(t));
  writeTimers.clear();
}

async function applyDelta(fileName, delta) {
  let content = docs.get(fileName) || "";
  content = applyChange(content, delta);
  docs.set(fileName, content);

  clearTimeout(writeTimers.get(fileName));
  writeTimers.set(
    fileName,
    setTimeout(() => writeToFile(fileName, content), 500),
  );

  return content;
}

function applyChange(text, delta) {
  switch (delta.type) {
    case "insert":
      return text.slice(0, delta.index) + delta.text + text.slice(delta.index);

    case "delete":
      return (
        text.slice(0, delta.index) + text.slice(delta.index + delta.length)
      );

    case "replace":
      return (
        text.slice(0, delta.index) +
        delta.text +
        text.slice(delta.index + delta.length)
      );

    default:
      return text;
  }
}

function shouldWriteKey(key) {
  return !(key == "Ctrl" || key == "Shift" || key == "Alt");
}

module.exports = { applyDelta, shouldWriteKey, applyChange, resetDocs };
