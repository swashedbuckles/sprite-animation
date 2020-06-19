import {SpriteSheet} from './SpriteSheet';
import {Sprite} from './Sprite';

const sheet = new SpriteSheet('sprite.png');

sheet.init()
  .then(() => {
    const fwd = new Sprite(16, 18);
    fwd.addRange(0, 0, 72, 16);
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const cell = fwd.draw();
    
    /** @type {[CanvasImageSource, number, number, number, number, number, number, number, number]} */
    const args = [sheet.getImage(), ...cell, ...cell];
    ctx.drawImage(...args);
    
  });