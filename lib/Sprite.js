export class Sprite {
  /**
   * 
   * @param {number} width 
   * @param {number} height 
   */
  constructor(width, height) {
    this.cellSize = {
      width,
      height
    };

    /** @type {[number, number][]} */
    this.cells = [];
    this.frame = 0;
  }

  dimensions() {
    return this.cellSize;
  }

  /**
   * @return {[number, number, number, number]}
   */
  draw() {
    const cell = this.cells[this.frame];
    this.frame++;
    if(this.frame === this.cells.length) {
      this.frame = 0;
    }

    return [...cell, this.cellSize.width, this.cellSize.height];
  }

  addCell(x, y) {
    const cell = this.cells.find(val => val[0] === x && val[1] === y);
    if(!cell) {
      this.cells.push([x, y]);
    }
  }

  addRange(startX, startY, endX, endY) {
    const dX = endX - startX;
    const dY = endY - startY;
    const cellsWide = dX / this.cellSize.width;
    const cellsTall = dY / this.cellSize.height;

    for(let x = 0; x < cellsWide; x++) {
      for(let y = 0; y < cellsTall; y++) {
        const cellX = startX + (x * this.cellSize.width);
        const cellY = startY + (y * this.cellSize.height);
        this.addCell(cellX, cellY);
      }
    }
  }

  removeCell(x, y) {
    const index = this.cells.findIndex(val => val[0] === x && val[1] === y);
    if(index > -1) {
      this.cells.splice(index, 1);
    }
  }
}