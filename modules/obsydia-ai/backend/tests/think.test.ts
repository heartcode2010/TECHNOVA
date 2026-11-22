import { describe, expect, it } from "vitest";
import { createThinkFilter, stripThink } from "../src/services/ai/think.js";

describe("think filter", () => {
  it("removes reasoning blocks from complete text", () => {
    expect(stripThink("<think>a\nb</think>\n\nHello")).toBe("Hello");
    expect(stripThink("Hello <think>x</think>world")).toBe("Hello world");
    expect(stripThink("No tags here")).toBe("No tags here");
    expect(stripThink("<think>unfinished")).toBe("");
  });

  it("handles tags split at every possible chunk boundary", () => {
    const text = "<think>plan the answer</think>\n\nThe <b>answer</b> is 42.";
    for (let size = 1; size <= text.length; size++) {
      const f = createThinkFilter();
      let out = "";
      for (let i = 0; i < text.length; i += size) out += f.push(text.slice(i, i + size));
      out += f.flush();
      expect(out).toBe("The <b>answer</b> is 42.");
    }
  });
});
