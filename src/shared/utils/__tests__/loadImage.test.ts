import { loadImage } from "../loadImage";

let image: HTMLImageElement;
const url = "https://example.com/image.png";

beforeEach(() => {
  const original = document.createElement.bind(document);
  vi.spyOn(document, "createElement").mockImplementation((tagName) => {
    const element = original(tagName);
    if (tagName === "img") {
      image = element as HTMLImageElement;
    }
    return element;
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("loadImage", () => {
  it("should resolve with image element on load success", async () => {
    const promise = loadImage(url);

    image.dispatchEvent(new Event("load"));
    const result = await promise;

    expect(result).toBe(image);
    expect(result.src).toBe(url);
  });

  it("should reject on load error", async () => {
    const promise = loadImage(url);

    image.dispatchEvent(new Event("error"));

    await expect(promise).rejects.toThrowError(/Unable to load image/);
    expect(image.src).toBe("");
  });

  it("should reject on abort", async () => {
    const abortController = new AbortController();
    const promise = loadImage(url, abortController.signal);

    abortController.abort();

    await expect(promise).rejects.toThrowError(/Aborted image load/);
    expect(image.src).toBe("");
  });
});
