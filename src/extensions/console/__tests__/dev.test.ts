import { dev } from "../dev";

describe("dev", () => {
  const spy = vi.spyOn(console, "log");

  beforeEach(() => {
    spy.mockClear();
  });

  it("should print passed value in development mode", () => {
    vi.stubEnv("DEV", true);
    dev("Test");
    expect(spy).toHaveBeenCalledExactlyOnceWith("Test");
  });

  it("should not print passed value in non development mode", () => {
    vi.stubEnv("DEV", false);
    dev("Test");
    expect(spy).not.toHaveBeenCalled();
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });
});
