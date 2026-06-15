export class Position {
  x = 0;
  y = 0;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  setX(x: number): this {
    this.x = x;
    return this;
  }

  setY(y: number): this {
    this.y = y;
    return this;
  }

  move(dx: number, dy: number): this {
    this.x += dx;
    this.y += dy;
    return this;
  }

  translate(dx: number, dy: number): this {
    return this.move(dx, dy);
  }

  copyFrom(source: Position): this {
    this.x = source.x;
    this.y = source.y;
    return this;
  }

  distanceTo(other: Position): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.hypot(dx, dy);
  }

  add(other: Position): Position {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  equalsRoughly(other: Position, tolerance = 0.001): boolean {
    return Math.abs(this.x - other.x) <= tolerance && Math.abs(this.y - other.y) <= tolerance;
  }

  reset(): this {
    this.x = 0;
    this.y = 0;
    return this;
  }

  equals(other: Position): boolean {
    return this.x === other.x && this.y === other.y;
  }
}
