/***
 * @param {Interval} context
 */
function onTimeout(context) {
  if(!context.timeoutHandle) {
    return;
  }

  const now = Date.now();
  context.iterations++;
  
  const shouldBeAt = context.startTime + (context.iterations * context.interval);
  const drift = now - shouldBeAt;
  const nextInterval = context.interval - drift;

  if(context.repeat && context.repeat === context.iterations) {
    context.stop();
  } else {
    setTimeout(onTimeout, nextInterval, context);
  }

  context.subscribers.forEach(subscriber => subscriber(now));
}

export class Interval {
  /**
   * 
   * @param {object} config 
   * @param {number} config.interval
   * @param {number} [config.repeat]
   */
  constructor(config) {
    const {interval, repeat} = config;
    if(typeof interval !== 'number') {
      throw new TypeError('Interval must be a number!');
    }

    if(interval <= 0) {
      throw new TypeError('Interval must be greater than 0!');
    }

    /** @type {number} */     this.interval = interval;
    /** @type {number} */     this.repeat = repeat;
    /** @type {function[]} */ this.subscribers = [];
    /** @type {number} */     this.timeoutHandle = null;

    /** @type {number} */     this.iterations = null;
    /** @type {number} */     this.startTime = null;
  }

  start() {
    if(!this.timeoutHandle) {
      const now = Date.now();
      this.startTime = now;
      this.iterations = 0;
      setTimeout(onTimeout, this.interval, this);
    }

    return this;
  }

  stop() {
    if(this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = null;
    }

    return this;
  }

  /**
   * 
   * @param {function} fn 
   */
  subscribe(fn) {
    if(typeof fn !== 'function') {
      throw new TypeError('Subscriber must be a function');
    }

    if(this.subscribers.indexOf(fn) === -1) {
      this.subscribers.push(fn);
    }

    return this;
  }

  /**
   * 
   * @param {function} [fn]
   */
  unsubscribe(fn) {
    if(fn == null) {
      this.subscribers.length = 0;
      return this;
    }

    if(typeof fn !== 'function') {
      throw new TypeError('Subscriber must be a function');
    }

    const position = this.subscribers.indexOf(fn);
    if(position > -1) {
      this.subscribers.splice(position, 1);
    }

    return this;
  }
};
