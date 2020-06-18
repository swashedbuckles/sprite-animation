export class Timer {
  constructor(interval) {
    if(typeof interval !== 'number') {
      throw new TypeError('Interval must be a number!');
    }

    if(interval <= 0) {
      throw new TypeError('Interval must be greater than 0!');
    }

    this.interval = interval;
  }
};
