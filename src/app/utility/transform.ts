import { Position } from './position';
import { Heading } from './heading';

export class Transform {
  pos: Position;
  heading: Heading;

  constructor(x = 0, y = 0, degrees = Heading.NORTH) {
    this.pos = new Position(x, y);
    this.heading = new Heading(degrees);
  }

  set(x: number, y: number, degrees?: number): this {
    this.pos.set(x, y);
    if (degrees !== undefined) this.heading.set(degrees);
    return this;
  }

  setPosition(p: Position): this {
    this.pos.copyFrom(p);
    return this;
  }

  setHeading(h: Heading): this {
    this.heading.set(h.degrees);
    return this;
  }

  translate(dx: number, dy: number): this {
    this.pos.move(dx, dy);
    return this;
  }

  rotate(deltaDegrees: number): this {
    this.heading.rotate(deltaDegrees);
    return this;
  }

  translateForward(distance: number): this {
    const rad = this.heading.toRadians();
    const dx = Math.sin(rad) * distance;
    const dy = -Math.cos(rad) * distance;
    this.pos.move(dx, dy);
    return this;
  }

  /**
   * transformPoint(local, out?)
   *
   * Converts a point from this transform's local space into world space.
   * Convention used:
   *  - local.x is the right axis (positive to the right)
   *  - local.y is the forward axis (positive forward)
   *
   * It applies rotation (by `heading`) then translation (by `pos`).
   * The optional `out` Position will be written to and returned to avoid allocations;
   * if `out` is omitted the passed `local` instance will be overwritten and returned.
   *
   * Example:
   * const t = new Transform(100, 50, Heading.NORTH);
   * const local = new Position(10, 20); // 10 right, 20 forward
   * const world = new Position();
   * t.transformPoint(local, world);
   * // `world` now contains the world coordinates of that local point
   */
  transformPoint(local: Position, out?: Position): Position {
    // local.x = right, local.y = forward
    const rad = this.heading.toRadians();
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);
    const rightX = cos;
    const rightY = sin;
    const forwardX = sin;
    const forwardY = -cos;

    const wx = this.pos.x + rightX * local.x + forwardX * local.y;
    const wy = this.pos.y + rightY * local.x + forwardY * local.y;

    if (out) return out.set(wx, wy);
    return local.set(wx, wy);
  }

  /**
   * inverseTransformPoint(world, out?)
   *
   * Converts a point from world space into this transform's local space.
   * The returned local coordinates use the same convention as `transformPoint`:
   *  - x = right axis, y = forward axis relative to this transform's heading.
   *
   * This computes the vector from `pos` to `world`, then projects that vector
   * onto the transform's right and forward axes (dot products).
   * The optional `out` Position will be written to and returned to avoid allocations;
   * if `out` is omitted the passed `world` instance will be overwritten and returned.
   *
   * Example:
   * const t = new Transform(100, 50, Heading.EAST);
   * const world = new Position(120, 40);
   * const local = new Position();
   * t.inverseTransformPoint(world, local);
   * // `local` now holds coordinates relative to t (right/forward)
   */
  inverseTransformPoint(world: Position, out?: Position): Position {
    const rad = this.heading.toRadians();
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);
    const rightX = cos;
    const rightY = sin;
    const forwardX = sin;
    const forwardY = -cos;

    const dx = world.x - this.pos.x;
    const dy = world.y - this.pos.y;

    // local.x = dot(dxdy, right)
    const lx = dx * rightX + dy * rightY;
    // local.y = dot(dxdy, forward)
    const ly = dx * forwardX + dy * forwardY;

    if (out) return out.set(lx, ly);
    return world.set(lx, ly);
  }

  copyFrom(other: Transform): this {
    this.pos.copyFrom(other.pos);
    this.heading.set(other.heading.degrees);
    return this;
  }

  reset(): this {
    this.pos.reset();
    this.heading.reset();
    return this;
  }

  equalsRoughly(other: Transform, posTol = 0.001, degTol = 0.5): boolean {
    return (
      this.pos.equalsRoughly(other.pos, posTol) &&
      this.heading.equalsRoughly(other.heading, degTol)
    );
  }
}
