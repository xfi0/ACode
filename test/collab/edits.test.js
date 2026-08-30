const {
  applyDelta,
  shouldWriteKey,
  applyChange,
} = require("../../src/collab/edits");

describe("applyChange", () => {
  test("inserts text at correct index", () => {
    expect(applyChange("test", { type: "insert", index: 1, text: "X" })).toBe(
      "tXest",
    );
  });
});

describe("applyDelta", () => {
  test("Applies deltas to nonexisting file", async () => {
    expect(await applyDelta("test", { type: "insert", index: 1, text: "test" })).toBe("test");
  });
  test("Inserts test", async () => {
    expect(await applyDelta("test.txt", { type: "insert", index: 1, text: "test" })).toBe("test");
  });
  test("Deletes test", async () => {
    expect(await applyDelta("test.txt", { type: "delete", index: 0, length: 4, text: "test" })).toBe("");
  });
  test("Replaces test with 'cooler test'", async () => {
    expect(await applyDelta("test.txt", { type: "replace", index: 0, length: 5, text: "cooler test" })).toBe("cooler test");
  });
});

describe("shouldWriteKey", () => {
  test("returns false for modifier keys", () => {
    expect(shouldWriteKey("Ctrl")).toBe(false);
    expect(shouldWriteKey("Shift")).toBe(false);
    expect(shouldWriteKey("Alt")).toBe(false);
  });
});
