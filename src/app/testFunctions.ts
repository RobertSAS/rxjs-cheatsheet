// this essentially copies how lodash runs object iteration
import { runEsTest } from "./lodash-es-test/lodash-es-test/benchmark-lodash-es";

export const fastForEachObjectKey = <T>(object: T, toRun: (key: string, value: T[keyof T]) => void) => {
  const keys = Object.keys(object)
  let length = keys.length
  let index = -1
  while (length--) {
    index++
    toRun(keys[index], (object as T)[keys[index] as keyof T])
  }
}


export interface LodashResultsI {
  [key: string]: {
    [key: string]: {
      result: number[];
      average?: number;
      run?: (duration: number) => void;
    }
  }
}

export const buildTests = (hashMap: LodashResultsI, runnersSet: any, valuesSet: any) => {
  fastForEachObjectKey(runnersSet, (runnerName, test) => {
    fastForEachObjectKey(valuesSet, (valuesName, testValues) => {
      if (!hashMap[valuesName]) {
        hashMap[valuesName] = {};
      }
      let testObject = hashMap[valuesName][runnerName];
      if (!testObject) {
        testObject = {
          result: []
        };
        hashMap[valuesName][runnerName] = testObject;
      }
      testObject.run = (duration) => {
        const result = runEsTest(runnerName, test, valuesName, testValues, duration);
        const totalTime = testObject.average ? testObject.average * testObject.result.length + result : result;
        testObject.result.push(result);
        testObject.average = totalTime / testObject.result.length;
      }
    })
  })
}
