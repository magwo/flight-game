import { beforeEach, describe, expect, it } from 'vitest';
import { Position } from './position';
import { Heading } from './heading';
import { Transform } from './transform';

describe('Transform', () => {
  let t: Transform;

  beforeEach(() => {
    t = new Transform(100, 100, Heading.NORTH);
  });

  it('set / setPosition / setHeading', () => {
    t.set(1, 2, 90);
    expect(t.pos.x).toBe(1);
    expect(t.pos.y).toBe(2);
    expect(t.heading.degrees).toBe(90);

    const p = new Position(5, 6);
    t.setPosition(p);
    expect(t.pos.x).toBe(5);

    const h = new Heading(180);
    t.setHeading(h);
    expect(t.heading.degrees).toBe(180);
  });

  it('translate and rotate', () => {
    t.reset();
    t.translate(3, 4);
    expect(t.pos.x).toBe(3);
    expect(t.pos.y).toBe(4);

    t.rotate(90);
    expect(t.heading.degrees).toBe(90);
  });

  it('translateForward with north/east conventions', () => {
    t.set(0, 0, Heading.NORTH);
    t.translateForward(10);
    // NORTH moves forward = negative Y
    expect(t.pos.x).toBeCloseTo(0);
    expect(t.pos.y).toBeCloseTo(-10);

    t.reset();
    t.set(0, 0, Heading.EAST);
    t.translateForward(5);
    // EAST: forward decreases X? based on implementation forward uses -cos and sin
    // For EAST (90deg): sin=1, cos=0 -> dx = sin*dist = dist, dy = -cos*dist = 0
    expect(t.pos.x).toBeCloseTo(5);
    expect(t.pos.y).toBeCloseTo(0);
  });

  it('transformPoint and inverseTransformPoint (with out param)', () => {
    t.set(100, 100, Heading.NORTH);
    const local = new Position(10, 5);
    const world = new Position();
    t.transformPoint(local, world);
    // for NORTH: world = pos + (local.x, -local.y)
    expect(world.x).toBe(110);
    expect(world.y).toBe(95);

    const back = new Position();
    t.inverseTransformPoint(world, back);
    expect(back.x).toBeCloseTo(10);
    expect(back.y).toBeCloseTo(5);
  });

  it('copyFrom, reset, equalsRoughly', () => {
    const a = new Transform(1, 2, 10);
    const b = new Transform();
    b.copyFrom(a);
    expect(b.pos.x).toBe(1);
    expect(b.heading.degrees).toBe(10);

    b.reset();
    expect(b.pos.x).toBe(0);
    expect(b.heading.degrees).toBe(Heading.NORTH);

    const c = new Transform(0.0005, 0.0005, 0.2);
    expect(b.equalsRoughly(c, 0.001, 1)).toBe(true);
  });

  it('timestep with forward speed and no rotation', () => {
    t.set(0, 0, Heading.NORTH);
    // Move forward at 100 px/s for 0.1 seconds
    t.timestep(100, 0, 0.1);
    expect(t.pos.x).toBeCloseTo(0);
    expect(t.pos.y).toBeCloseTo(-10);
    expect(t.heading.degrees).toBeCloseTo(Heading.NORTH);
  });

  it('timestep with rotation', () => {
    t.set(0, 0, Heading.NORTH);
    // Rotate at 90 degrees/second for 1 second
    t.timestep(0, 90, 1);
    expect(t.pos.x).toBeCloseTo(0);
    expect(t.pos.y).toBeCloseTo(0);
    expect(t.heading.degrees).toBeCloseTo(90);
  });

  it('timestep with combined forward speed and rotation', () => {
    t.set(10, 20, Heading.NORTH);
    // Move forward at 10 px/s and rotate at 45 deg/s for 0.5 seconds
    t.timestep(10, 45, 0.5);
    expect(t.pos.x).toBeCloseTo(10);
    expect(t.pos.y).toBeCloseTo(15);
    expect(t.heading.degrees).toBeCloseTo(22.5);
  });
});
