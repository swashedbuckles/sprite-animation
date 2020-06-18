import {expect} from 'chai';
import {Timer} from './Timer';

describe('A Timer', () => {
  describe('initialization', () => {
    it('should throw if initialized without a numeric interval', () => {
      expect(() => new Timer()).to.throw;
      expect(() => new Timer('string')).to.throw;
      expect(() => new Timer({})).to.throw;
    });

    it('should throw if intialized w/out a positive interval', () => {
      expect(() => new Timer(-1)).to.throw;
      expect(() => new Timer(1)).to.not.throw;
    });
  });
});