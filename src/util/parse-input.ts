import * as R from 'ramda';

export type EntryTime = number;
export type RunTime = number;
export type ProcessInfo = [EntryTime, RunTime];

/**
 * @param str raw propgram input. Must be a space separated strin of numbers.
 * @returns array of valid input groups. First number in a group is the entry time  and second number is the length of the process
 */
export function parseInput ( str: string ) : ProcessInfo[] {

  let strings = str.trim().split(' ');
  //R.either(R.isEmpty, R.test(/[^0-9]+/)); // either empty or not numeric string
  if (R.any(R.isEmpty, strings))
      throw Error(`Invalid input ${str}`);

  let numbers = strings.map(n => +n);

  if (R.any(isNaN, numbers))
      throw Error(`Invalid input ${str}`);

  let inptGroups = groupNumbers(numbers);

  return R.filter<[EntryTime, RunTime]>(
    R.pipe(
      R.length,
      R.equals(2)
    )
  , inptGroups);
}

function groupNumbers ( numbers: number[] ) : ProcessInfo[] {
  return R.addIndex(R.reduce)( ( numbers: ProcessInfo[], num: number, idx: number ) => {
    let inptIdx = Math.floor( idx / 2 );
    return [
      ...numbers.slice(0, inptIdx),
      numbers[inptIdx] ? numbers[inptIdx].concat(num) : [num],
      ...numbers.slice(inptIdx + 1)
    ]
  }, [], numbers);
}
