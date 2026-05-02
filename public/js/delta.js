export const deltas = {
  insert: (index, text) => ({ type: "insert", index, text }),
  delete: (index, length) => ({ type: "delete", index, length }),
  replace: (index, length, text) => ({ type: "replace", index, length, text }),
};

export function applyChange(text, delta) {
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