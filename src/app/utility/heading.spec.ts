import { beforeEach, describe, expect, it } from 'vitest';
import { Heading } from './heading';

describe('Heading', () => {
  let h: Heading;

  beforeEach(() => {
    h = new Heading();
  });

  it('set', () => {
    h.set(270);
    expect(h.degrees).toBe(270);
  });

  it('rotate and normalize wrap-around', () => {
    h.set(350);
    h.rotate(20);
    expect(h.degrees).toBe(10);

    h.rotate(-30);
    expect(h.degrees).toBe(340);
  });

  it('add, difference and differenceAngle', () => {
    const a = new Heading(10);
    const b = new Heading(350);
    a.add(b);
    expect(a.degrees).toBe(0);

    a.set(5);
    const diff = a.differenceAngle(new Heading(355));
    // shortest signed difference from 5 to 355 is 10 degrees (5 - 355 = 10 mod)
    expect(diff).toBe(10);
  });

  it('equalsRoughly tolerances', () => {
    const a = new Heading(0);
    const b = new Heading(0.4);
    expect(a.equalsRoughly(b, 0.5)).toBe(true);
    expect(a.equalsRoughly(b, 0.1)).toBe(false);
  });

  it('toRadians', () => {
    h.set(180);
    expect(h.toRadians()).toBeCloseTo(Math.PI);
  });
});
