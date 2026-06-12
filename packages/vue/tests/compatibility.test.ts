import { afterAll, beforeAll, expect, test } from 'vitest'

//@ts-ignore
const nativeWithResolvers = Promise.withResolvers
//@ts-ignore
const nativeTry = Promise.try

beforeAll(async () => {
  // Simulate a browser without these APIs (e.g. Firefox 120, Chrome 109)
  // before loading the polyfills, like the library entry point does
  //@ts-ignore
  delete Promise.withResolvers
  //@ts-ignore
  delete Promise.try

  await import('../src/scripts/compatibility')
})

afterAll(() => {
  //@ts-ignore
  Promise.withResolvers = nativeWithResolvers
  //@ts-ignore
  Promise.try = nativeTry
})

test('Promise.withResolvers is polyfilled', async () => {
  expect(Promise.withResolvers).toBeTypeOf('function')
  expect(Promise.withResolvers).not.toBe(nativeWithResolvers)

  const resolved = Promise.withResolvers<string>()
  resolved.resolve('ok')
  await expect(resolved.promise).resolves.toBe('ok')

  const rejected = Promise.withResolvers()
  rejected.reject(new Error('ko'))
  await expect(rejected.promise).rejects.toThrow('ko')
})

test('Promise.try is polyfilled', async () => {
  //@ts-ignore
  expect(Promise.try).toBeTypeOf('function')
  //@ts-ignore
  expect(Promise.try).not.toBe(nativeTry)

  //@ts-ignore
  await expect(Promise.try((value: number) => value * 2, 21)).resolves.toBe(42)

  // A synchronous throw must become a rejection
  await expect(
    //@ts-ignore
    Promise.try(() => {
      throw new Error('sync error')
    })
  ).rejects.toThrow('sync error')
})
