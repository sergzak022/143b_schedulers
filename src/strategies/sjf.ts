import { ProcessInfo } from '../util/parse-input';
import { Fifo } from './fifo';
import * as R from 'ramda';
/**
 * Shortest job first strategy
 */
export namespace Sjf {
  /**
   * simulate execution of the process
   * @param processInfo process before being executed
   * @returns process info after it's been executed
   */
  export function run( processInfo: ProcessInfo ) : ProcessInfo {
    return Fifo.run( processInfo );
  }
  // need to consider time so far
  // also need to change Fifo implementation
  export function select(
    processInfoArr: ProcessInfo[],
    timeSoFar: number
  ) : ProcessInfo | undefined {
    return R.pipe(
      R.filter<ProcessInfo>( p => R.last( p ) > 0 && timeSoFar >= R.head(p) ),
      ( processInfoArrFiltered: ProcessInfo[] ) =>
        R.reduce<ProcessInfo, ProcessInfo>( R.minBy<ProcessInfo>( p => R.last( p ) ), R.head( processInfoArrFiltered ), processInfoArrFiltered )
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
    return Fifo.getRunTime( processInfoBeforeRun, processInfoAfterRun );
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

//    console.log(
//      processInfoBeforeRun,
//      processInfoAfterRun,
//      timeSoFar
//    );

 //   return 5;
    return Fifo.getRunTimeSoFar(
      processInfoBeforeRun,
      processInfoAfterRun,
      timeSoFar
    );
  }

  export function executeProcesses ( processInfoArr: ProcessInfo[] ) : number[] {
    let time: number = 0,
      runTimeSoFarByIdx: number[] = [];

    let process: ProcessInfo | undefined;

    while ( process = select( processInfoArr, time ) ) {
      //console.log('process', process);
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
