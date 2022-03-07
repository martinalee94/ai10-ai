
export function argMax(array) {
    return [].reduce.call(array, (m, c, i, arr) => c > arr[m] ? i : m, 0)
  }

export const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
