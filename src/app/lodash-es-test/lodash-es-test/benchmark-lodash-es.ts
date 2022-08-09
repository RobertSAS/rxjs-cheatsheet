import { each } from "lodash-es";
import { fastForEachObjectKey, LodashResultsI } from "../../testFunctions";

export const lodashObjectRunners = {
  'object-iterate': (values: { [key: string]: number; }) => {
    let count = 0
    fastForEachObjectKey(values, (k, v) => {
      count += v
    })
    return count;
  },
  'lodash': (values: { [key: string]: number; }) => {
    let count = 0
    each(values, (v) => {
      count += v
    })
    return count
  }
}
export const lodashArrayRunners = {
  'array-iterate': (values: { i: number; }[]) => {
    let count = 0
    for (const value of values) {
      count += value.i
    }
    return count
  },
  'lodash': (values: { i: number; }[]) => {
    let count = 0
    each(values, (v) => {
      count += v.i
    })
    return count
  }
}


export const runEsTest = <T>(runnerName: string, test: (values: T) => number, valuesName: string, testValues: { values: T, result: number }, duration: number): number => {
  let iterations = 0;
  let totalTesting = 0;
  const start = (new Date().getTime() / 1000)
  while (true) {
    const testStart = (new Date().getTime() / 1000)
    if (test(testValues.values) !== testValues.result) {
      throw new Error(`expected ${ test(testValues.values) } vs ${ testValues.result } to run ${ name } with runner ${ runnerName } values ${ valuesName }`)
    }
    iterations++;
    const testEnd = (new Date().getTime() / 1000)
    totalTesting += (testEnd - testStart);
    const stop = (new Date().getTime() / 1000)
    if (stop - start > duration) {
      break;
    }
  }

  return iterations / totalTesting
}

export const lodashResults: LodashResultsI = {};
