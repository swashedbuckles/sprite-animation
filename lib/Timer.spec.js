import {expect} from 'chai';
import {Interval} from './Timer';

describe('An Interval', () => {
  describe('initialization', () => {
    it('should throw if initialized without a numeric interval', () => {
      expect(() => new Interval()).to.throw;
      expect(() => new Interval('string')).to.throw;
      expect(() => new Interval({})).to.throw;
    });

    it('should throw if intialized w/out a positive interval', () => {
      expect(() => new Interval({interval: -1})).to.throw;
      expect(() => new Interval({interval: 1})).to.not.throw;
    });
  });

  it('should be able to repeat the timer');
  it('should be able to invoke a callback');
  it('should be able to invoke several callbacks');
  it('should be able to remove callbacks');
});