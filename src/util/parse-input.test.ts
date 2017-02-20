import { expect } from 'chai';
import { parseInput } from './parse-input';
import { head, partial, last } from 'ramda';

describe('parseInput function', () => {

  it('Should throw an error if invalid input', () => {
    expect( partial( parseInput, [''] ) )
      .to.throw(Error);
    expect( partial( parseInput, ['1 a'] ) )
      .to.throw(Error);
    expect( partial( parseInput, ['1  2 '] ) )
      .to.throw(Error);
  });

  it('Should return for valid input', () => {
    expect(parseInput('1 2')).to.exist;
  });

  it('should return arr of two groups on 4 digit input', () => {
    expect(parseInput('1 2 3 4'))
     .to.be.eql([[1,2], [3,4]]);
  });

  it('should return arr of one group on 3 digit input', () => {
    expect(parseInput('1 2 3'))
      .to.be.eql([[1,2]]);
  });

  it('first number in a first group should be first num in input', () => {
    let out = parseInput('1 2 3');

    expect(head(head(out)))
      .to.be.equal(1);
  });

  it('last number in the last group should be the last num in input', () => {
    let out = parseInput('1 2 3 4');

    expect(last(last(out)))
      .to.be.equal(4);
  });
});
