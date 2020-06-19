import {SpriteSheet} from '../lib/SpriteSheet.js';
import {Sprite} from '../lib/Sprite.js';

const sheet = new SpriteSheet('sprite.png');

sheet.init()
  .then(() => {
    const fwd = new Sprite(16, 18);
    fwd.addRange(0, 0, 72, 16);
    const canvas = document.querySelector('canvas');
    const cell = fwd.draw();
    
    draw(canvas, sheet, cell);
    setTimeout(() => {
      const cell = fwd.draw();
      draw(canvas, sheet, cell);
    }, 250);
  });

  /**
   * 
   * @param {HTMLCanvasElement} canvas 
   * @param {SpriteSheet} sheet 
   * @param {[number,number,number,number]} cell 
   */
  function draw(canvas, sheet, cell) {
    const ctx = canvas.getContext('2d');
    /** @type {[CanvasImageSource, number, number, number, number, number, number, number, number]} */
    const args = [sheet.getImage(), ...cell, 0, 0, cell[2] * 3, cell[3] * 3];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(...args);
  }