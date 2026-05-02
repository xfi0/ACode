import { deltas } from "./delta.js";
import { socket } from "./socket.js";
import { state } from "./state.js";
const editorContainer = document.getElementById("text-editor-container");
export const editor = document.querySelector(".text-editor");

// let lineCount = 0;
// function createNewLine(lineNumber) {
//   const newLineContainer = document.createElement("div");
//   newLineContainer.classList.add("line-container");

//   const lineNumberEl = document.createElement("p");
//   lineNumberEl.classList.add("line-number");
//   lineNumberEl.innerText = lineNumber;

//   const input = document.createElement("input");
//   input.classList.add("line-input");

//   newLineContainer.appendChild(lineNumberEl);
//   newLineContainer.appendChild(input);

//   return newLineContainer;
// }

let lastValue = editor.value;
let lastSelection = { start: 0, end: 0 };

editor.addEventListener("input", (e) => {
  const newValue = editor.value;
  const diff = computeDelta(lastValue, newValue, lastSelection);

  if (diff) {
    socket.emit("edit", { fileId: state.currentFileId, delta: diff });
  }

  lastValue = newValue;
});

editor.addEventListener("selectionchange", () => {
  lastSelection = {
    start: editor.selectionStart,
    end: editor.selectionEnd,
  };
});

function computeDelta(oldVal, newVal, selection) {
  let start = 0;
  while (start < oldVal.length && oldVal[start] === newVal[start]) start++;

  let oldEnd = oldVal.length;
  let newEnd = newVal.length;
  while (
    oldEnd > start &&
    newEnd > start &&
    oldVal[oldEnd - 1] === newVal[newEnd - 1]
  ) {
    oldEnd--;
    newEnd--;
  }

  const deleted = oldEnd - start;
  const inserted = newVal.slice(start, newEnd);

  if (deleted === 0 && inserted === "") return null;

  if (deleted > 0 && inserted !== "")
    return deltas.replace(start, deleted, inserted);

  if (deleted > 0) return deltas.delete(start, deleted);

  return deltas.insert(start, inserted);
}