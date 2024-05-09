import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

// This is used for testing Select components
// https://github.com/radix-ui/primitives/issues/1822
window.HTMLElement.prototype.scrollIntoView = vi.fn();
