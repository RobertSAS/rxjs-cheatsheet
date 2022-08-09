
export interface TestValueTypes {
  objectTests: {
    [key: string]: {
      values: {
        [key: string]: number;
      },
      result: number
    }
  },
  arrayTests: {
    [key: string]: {
      values: { i: number }[],
      result: number
    }
  }
}


export const testData: TestValueTypes = {
  objectTests: {
    'small (3 keys)': {
      values: {a: 30310, b: 100303, c: 3040494},
      result: 3171107
    },
    'big (10000 keys)': {
      values: Array.from({length: 10000}).map((value, i) => i).reduce((val, v) => {
        // @ts-ignore
        val[v] = v
        return val
      }, {}),
      result: 49995000
    }
  }, arrayTests: {
    'small (3 items)': {
      values: [{i: 30310}, {i: 100303}, {i: 3040494}],
      result: 3171107
    },
    'big (10000 items)': {
      values: Array.from({length: 10000}).map((value, i) => ({i: i})),
      result: 49995000
    }
  }
}
