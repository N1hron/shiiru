import { parseJson } from "../parseJson";

describe("parseJson", () => {
  it("should parse valid JSON", () => {
    const text = "{\"status\":\"ok\",\"method\":\"GET\"}";
    expect(parseJson(text)).toEqual({ status: "ok", method: "GET" });
  });

  it("should return replacement for invalid JSON", () => {
    const text = "{ invalid }";

    expect(parseJson(text)).toBeNull();
    expect(parseJson(text, "replacement")).toBe("replacement");
    expect(parseJson(25, "hello")).toBe("hello");
  });
});
