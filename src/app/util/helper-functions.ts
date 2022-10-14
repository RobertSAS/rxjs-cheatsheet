// this essentially copies how lodash runs object iteration
export const fastForEachObjectKey = <T>(object: T, toRun: (key: string, value: T[keyof T]) => void) => {
  const keys = Object.keys(object as any)
  let length = keys.length
  let index = -1
  while (length--) {
    index++
    toRun(keys[index], (object as T)[keys[index] as keyof T])
  }
}
