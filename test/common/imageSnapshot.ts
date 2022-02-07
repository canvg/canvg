/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
import { toMatchImageSnapshot } from 'jest-image-snapshot'

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot(opts?: any): R
    }
  }
}

expect.extend({
  toMatchImageSnapshot
})
