import { expect } from 'chai';
import { Fifo } from './fifo';

describe('Fifo ', () => {
  it('should have functions run, select, executeProcesses', () => {
    expect(Fifo.run).to.exist;
    expect(Fifo.select).to.exist;
    expect(Fifo.executeProcesses).to.exist;
  });

  describe('Fifo.run ', () => {
    it('should retun finished process', () => {
      expect( Fifo.run( [1, 5] ) )
        .to.eql([1, 0]);
    });
  });

  describe('Fifo.select ', () => {
    it('should retun first process that has run time left', () => {
      expect( Fifo.select( [[1, 5], [1,2]], 1 ) )
        .to.eql([1, 5]);
    });

    it('should skip all the processes with zero runtime left', () => {
      expect( Fifo.select( [[1, 0], [1,2]], 1 ) )
        .to.eql([1, 2]);
    });

    it('should retun undefined if there are no more processes', () => {
      expect( Fifo.select( [[1, 0], [1, 0]], 1 ) )
        .to.equal(undefined);
    });

  });

  it('should return [( 4 + 6 + 4 ) / 3, 4, 6, 4] for input [[0,4],[0,2], [3,1]]', () => {
      expect(
        Fifo.executeProcesses([[0,4],[0,2], [3,1]])
      )
      .to.be.eql([ ( 4 + 6 + 4 ) / 3, 4, 6, 4]);
  });

});
