export class SpriteSheet {
  constructor(url) {
    if(typeof url !== 'string') {
      throw new TypeError('URL must be a string!');
    }

    this.url = url;
    this.image = new Image();
    this.initialized = false;
  }

  init() {
    return new Promise((resolve, reject) => {
      this.image.onload = resolve;
      this.image.onerror = reject;
      this.image.src = this.url;
    })
      .then(
        () => this.initialized = true,
        () => this.initialized = false
      );
  }

  getImage() {
    if (!this.init) {
      throw new Error('Spritesheet not loaded');
    }

    return this.image;
  }
}