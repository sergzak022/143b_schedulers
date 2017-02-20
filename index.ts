import * as R from 'ramda';
import { parseInput } from './src/util/parse-input';

process.stdin.on('readable', ()=>{
  let chunk = process.stdin.read();

  if ( R.isNil( chunk ) ) throw Error('empty buffer');

  let inputGroups = parseInput( chunk.toString() );

  console.log(inputGroups);

});
