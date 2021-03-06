import { ProcessInfo } from '../util/parse-input';
import * as R from 'ramda';

export namespace Fifo {
  /**
   * simulate execution of the process
   * @param processInfo process before being executed
   * @returns process info after it's been executed
   */
  export function run( processInfo: ProcessInfo ) : ProcessInfo {
    return [
      R.head(processInfo),
      0 // fifo run funcion executes process until it completes
    ];
  }

  /**
   * selects next process to run according to sfj rulles
   * @param processInfoArr process list to select from
   * @param timeSoFar units of time since the beginning
   */
  export function select(
    processInfoArr: ProcessInfo[],
    timeSoFar: number
  ) : ProcessInfo | undefined {
    return R.pipe(
      R.filter<ProcessInfo>( p => R.last( p ) > 0 && timeSoFar >= R.head(p) ),
      R.find( ( p: ProcessInfo ) => R.last(p) !== 0)
    )(processInfoArr);
  }
  /**
   * @param processInfoBeforeRun process state before it's been run
   * @param processInfoAfterRun process state after it's been run
   * @returns run time of the process before it gets preempted or completes
   */
  export function getRunTime (
    processInfoBeforeRun: ProcessInfo,
    processInfoAfterRun: ProcessInfo
  ) : number {
    return R.last(processInfoBeforeRun) - R.last(processInfoAfterRun);
  }

  /**
   * @param processInfoBeforeRun process state before it's been run
   * @param processInfoAfterRun process state after it's been run
   * @param timeSoFar time since the start
   * @returns total run time of the process before it gets preempted or completes ( includes wait time )
   */
  export function getRunTimeSoFar (
    processInfoBeforeRun: ProcessInfo,
    processInfoAfterRun: ProcessInfo,
    timeSoFar: number
  ) : number {
    return getRunTime(
      processInfoBeforeRun,
      processInfoAfterRun,
    ) + timeSoFar - R.head(processInfoBeforeRun);
  }

  export function executeProcesses ( processInfoArr: ProcessInfo[] ) : number[] {
    let time: number = 0,
      runTimeSoFarByIdx: number[] = [];

    let process: ProcessInfo | undefined;

    while ( process = select( processInfoArr, time ) ) {
      let idx = processInfoArr.indexOf( process );

      let processAfterRun = run( process );

      runTimeSoFarByIdx[idx] = getRunTimeSoFar(
        process,
        processAfterRun,
        time
      );

      time += getRunTime(
        process,
        processAfterRun,
      );

      processInfoArr = R.update<ProcessInfo>(idx, processAfterRun, processInfoArr);
    }

    return R.insert(
      0,
      R.converge(R.divide, [R.sum, R.length])(runTimeSoFarByIdx),
      runTimeSoFarByIdx
    );
  }
}
