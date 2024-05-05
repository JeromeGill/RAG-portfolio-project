import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { expect } from 'vitest';
import * as matchers from "@testing-library/jest-dom/matchers"

expect.extend(matchers);
console.log(matchers)
// expect.extend(matchers);

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
})
