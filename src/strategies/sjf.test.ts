import { expect } from 'chai';
import { Sjf } from './sjf';

describe('Sjf ', () => {
  it('should have functions run, select, executeProcesses', () => {
    expect(Sjf.run).to.exist;
    expect(Sjf.select).to.exist;
    expect(Sjf.executeProcesses).to.exist;
  });

  describe('Sjf.select ', () => {
    it('should retun first process that has run time left', () => {
      expect(Sjf.select( [[1, 5]], 1 ) )
        .to.eql([1, 5]);
    });

    it('should return shortest non zero length process', () => {
      expect(Sjf.select( [[1, 2], [1,1]], 1 ) )
        .to.eql([1, 1]);
    });

    it('should skip all zero length processes', () => {
      expect(Sjf.select( [[1, 0], [1,1]], 1 ) )
        .to.eql([1, 1]);
    });

    it('should retun undefined if there are no more processes with length greater than zero', () => {
      expect(Sjf.select( [[1, 0], [1, 0]], 1 ) )
        .to.equal(undefined);
    });

    it('should skip a process that has entered yet', () => {
      expect(Sjf.select( [[2, 1], [1, 5]], 1 ) )
        .to.eql([1, 5]);

      expect(Sjf.select( [[2, 1], [1, 5]], 0 ) )
        .to.eql(undefined);
    });

  });

  it('should return [( 6 + 2 + 4 ) / 3, 6, 2, 4] for input [[0,4],[0,2], [3,1]]', () => {
      expect(
        Sjf.executeProcesses([[0,4],[0,2], [3,1]])
      )
      .to.be.eql([ ( 6 + 2 + 4 ) / 3, 6, 2, 4]);
  });

});
