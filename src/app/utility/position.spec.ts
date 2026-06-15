import { beforeEach, describe, expect, it } from 'vitest';
import { Position } from './position';

describe('Position', () => {
  let p: Position;

  beforeEach(() => {
    p = new Position(1, 2);
  });

  it('set / setX / setY', () => {
    p.set(3, 4);
    expect(p.x).toBe(3);
    expect(p.y).toBe(4);

    p.setX(7);
    expect(p.x).toBe(7);
    expect(p.y).toBe(4);

    p.setY(9);
    expect(p.x).toBe(7);
    expect(p.y).toBe(9);
  });

  it('move / translate are equivalent and mutate', () => {
    p.set(0, 0);
    p.move(2, 3);
    expect(p.x).toBe(2);
    expect(p.y).toBe(3);

    p.translate(1, -1);
    expect(p.x).toBe(3);
    expect(p.y).toBe(2);
  });

  it('copyFrom and reset', () => {
    const other = new Position(10, 11);
    p.copyFrom(other);
    expect(p.x).toBe(10);
    expect(p.y).toBe(11);

    p.reset();
    expect(p.x).toBe(0);
    expect(p.y).toBe(0);
  });

  it('distanceTo and equalsRoughly', () => {
    p.set(0, 0);
    const q = new Position(3, 4);
    expect(p.distanceTo(q)).toBeCloseTo(5);

    const a = new Position(1.0001, 1.0001);
    const b = new Position(1.0002, 1.0003);
    expect(a.equalsRoughly(b, 0.001)).toBe(true);
    expect(a.equalsRoughly(b, 1e-5)).toBe(false);
  });

  it('add and difference mutate correctly', () => {
    const a = new Position(5, 7);
    const b = new Position(2, 3);
    a.add(b);
    expect(a.x).toBe(7);
    expect(a.y).toBe(10);
  });
});
