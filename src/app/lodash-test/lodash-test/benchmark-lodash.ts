import { each } from "lodash";
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

export const lodashResults: LodashResultsI = {};

