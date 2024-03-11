import { describe, expect, it } from "vitest";
import { useStock } from "../useStock";

describe("useStock", () => {
  it("handles connection states", () => {
    const { isConnected, isConnecting } = useStock();

    expect(isConnected.value).toBe(false);
    expect(isConnecting.value).toBe(true);
  });
});
