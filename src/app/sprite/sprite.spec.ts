import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { Sprite } from './sprite';

describe('Sprite', () => {
  let component: Sprite;
  let fixture: ComponentFixture<Sprite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sprite],
    }).compileComponents();

    fixture = TestBed.createComponent(Sprite);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('spriteName', 'player.png');
    fixture.componentRef.setInput('rotation', 0);
    fixture.componentRef.setInput('size', 50);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute imagePath correctly', () => {
    expect(component.imagePath()).toBe('sprites/player.png');
  });

  it('should compute imageCss correctly', () => {
    expect(component.imageCss()).toBe('url(sprites/player.png)');
  });

  it('should compute rotation style with 45 degree offset', () => {
    expect(component.rotationStyle()).toBe('rotate(45deg)');
  });

  it('should compute image dimensions based on size', () => {
    const expectedDimension = `${50 * (1 / Math.sqrt(2))}px`;
    expect(component.imageWidth()).toBe(expectedDimension);
    expect(component.imageHeight()).toBe(expectedDimension);
  });

  it('should handle different rotation values', () => {
    fixture.componentRef.setInput('rotation', 315);
    fixture.detectChanges();
    expect(component.rotationStyle()).toBe('rotate(0deg)');
  });

  it('should handle different sprite names', () => {
    fixture.componentRef.setInput('spriteName', 'enemy.png');
    fixture.detectChanges();
    expect(component.imagePath()).toBe('sprites/enemy.png');
    expect(component.imageCss()).toBe('url(sprites/enemy.png)');
  });
});
