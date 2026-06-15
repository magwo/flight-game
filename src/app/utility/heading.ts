export class Heading {
  degrees = 0;

  static readonly NORTH = 0;
  static readonly EAST = 90;
  static readonly SOUTH = 180;
  static readonly WEST = 270;

  constructor(degrees = Heading.NORTH) {
    this.degrees = Heading.normalize(degrees);
  }

  set(degrees: number): this {
    this.degrees = Heading.normalize(degrees);
    return this;
  }

  rotate(deltaDegrees: number): this {
    this.degrees = Heading.normalize(this.degrees + deltaDegrees);
    return this;
  }

  add(other: Heading): this {
    this.degrees = Heading.normalize(this.degrees + other.degrees);
    return this;
  }

  difference(other: Heading): this {
    this.degrees = Heading.normalize(this.degrees - other.degrees);
    return this;
  }

  differenceAngle(other: Heading): number {
    let diff = Heading.normalize(this.degrees - other.degrees);
    if (diff > 180) diff -= 360;
    return diff;
  }

  equals(other: Heading): boolean {
    return this.degrees === other.degrees;
  }

  equalsRoughly(other: Heading, toleranceDegrees = 0.5): boolean {
    return Math.abs(this.differenceAngle(other)) <= toleranceDegrees;
  }

  reset(): this {
    this.degrees = Heading.NORTH;
    return this;
  }

  toRadians(): number {
    return (this.degrees * Math.PI) / 180;
  }

  static normalize(degrees: number): number {
    let d = degrees % 360;
    if (d < 0) d += 360;
    return d;
  }
}
