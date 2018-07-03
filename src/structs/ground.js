import { getData } from "./block";

export const EMPTY = -1;
export const GARBAGE = -2;
export const WALL = 0xFF;

export default class Ground {
  constructor(playfield) {
    this.width = playfield.size.width;
    this.height = playfield.size.height;
    this.p_left = playfield.padding.left;
    this.p_right = playfield.padding.right;
    this.p_top = playfield.padding.top;
    this.p_bottom = playfield.padding.bottom;
    this.p_width = this.p_left + this.width + this.p_right;
    this.p_height = this.p_top + this.height + this.p_bottom;
    this.data = new Int8Array(this.p_width * this.p_height).fill(EMPTY);
  }

  isIn(x, y) {
    return (
        x >= -this.p_left &&
        x < this.width + this.p_right &&
        y >= -this.p_top &&
        y < this.height + this.p_bottom
    );
  }

  get(x, y) {
    if (!this.isIn(x, y)) {
      return WALL;
    }
    return this.data[(this.p_top + y) * this.p_width + this.p_left + x];
  }

  set(x, y, type) {
    if (!this.isIn(x, y)) {
      return;
    }
    this.data[(this.p_top + y) * this.p_width + this.p_left + x] = type;
  }

  checkAvailable(block) {
    const data = getData(block);
    for (let x = 0; x < data.size.width; x++) {
      for (let y = 0; y < data.size.height; y++) {
        if (data.data[y][x] && this.get(x + block.x, y + block.y) !== EMPTY) {
          return false;
        }
      }
    }
    return true;
  }

  place(block) {
    const data = getData(block);
    for (let x = 0; x < data.size.width; x++) {
      for (let y = 0; y < data.size.height; y++) {
        if (data.data[y][x]) {
          this.set(x + block.x, y + block.y, block.type);
        }
      }
    }
  }

  isFull(y) {
    for (let x = -this.p_left; x < this.width + this.p_right; x++) {
      if (this.get(x, y) === EMPTY) {
        return false;
      }
    }
    return true;
  }

  clearLine(lineY) {
    for (let y = lineY; y > -this.p_top; y--) {
      for (let x = -this.p_left; x < this.width + this.p_right; x++) {
        this.set(x, y, this.get(x, y - 1));
      }
    }
    for (let x = -this.p_left; x < this.width + this.p_right; x++) {
      this.set(x, -this.p_top, EMPTY);
    }
  }

  clearLines() {
    let clearedLines = 0;
    for (let y = -this.p_top; y < this.height + this.p_bottom; y++) {
      if (this.isFull(y)) {
        this.clearLine(y);
        ++clearedLines;
      }
    }
    return clearedLines;
  }

  addGarbage(lines, randomSource) {
    for (let line = 0; line < lines; ++line) {
      for (let y = -this.p_top; y < this.height; y++) {
        for (let x = -this.p_left; x < this.width + this.p_right; x++) {
          this.set(x, y, this.get(x, y + 1));
        }
      }

      const hole = randomSource.next(this.width);
      for (let x = -this.p_left; x < this.width + this.p_right; x++) {
        if (x !== hole) {
          this.set(x, this.height - 1, GARBAGE);
        }
      }
    }
  }
}
