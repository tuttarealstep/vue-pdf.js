/**
 * pdf.js v5 relies on a few recent ECMAScript features that are missing in
 * older browsers (e.g. Firefox < 121, Chrome < 128). The official pdf.js
 * "legacy" builds inject these polyfills with core-js at build time, but
 * since we bundle pdf.js from source we have to provide them ourselves.
 *
 * `AbortSignal.any` is already polyfilled by pdf.js itself, see
 * `pdf.js/src/shared/util.js`.
 *
 * This module is imported by both the library entry point and the worker
 * entry point: polyfills loaded on the main thread don't reach the worker
 * context.
 */

if (typeof Promise.withResolvers !== 'function') {
  //@ts-ignore
  Promise.withResolvers = function (this: PromiseConstructor) {
    let resolve, reject
    const promise = new this((res, rej) => {
      resolve = res
      reject = rej
    })
    return { promise, resolve, reject }
  }
}

//@ts-ignore
if (typeof Promise.try !== 'function') {
  //@ts-ignore
  Promise.try = function (
    this: PromiseConstructor,
    fn: (...args: unknown[]) => unknown,
    ...args: unknown[]
  ) {
    return new this((resolve) => {
      resolve(fn(...args))
    })
  }
}

export {}
