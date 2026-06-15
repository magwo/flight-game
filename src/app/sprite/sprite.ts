import { Component, computed, input, signal } from '@angular/core';

const DIAGONAL_SIZE_FACTOR = 1 / Math.sqrt(2);

@Component({
  selector: 'app-sprite',
  standalone: true,
  templateUrl: './sprite.html',
  styleUrls: ['./sprite.scss'],
  host: {
    '[style.transform]': 'rotationStyle()',
    '[style.width]': 'imageWidth()',
    '[style.height]': 'imageHeight()',
    '[style.background-image]': 'imageCss()',
    'attr.draggable': "'false'",
  },
})
export class Sprite {
  readonly spriteName = input.required<string>();
  readonly rotation = input.required<number>();
  readonly size = input.required<number>();

  readonly imagePath = computed(() => `/sprites/${this.spriteName()}`);

  readonly imageCss = computed(() => `url(${this.imagePath()})`);

  readonly rotationStyle = computed(() => {
    const corrected = (this.rotation() + 45) % 360;
    return `rotate(${corrected}deg)`;
  });

  readonly imageWidth = computed(() => `${this.size() * DIAGONAL_SIZE_FACTOR}px`);
  readonly imageHeight = computed(() => `${this.size() * DIAGONAL_SIZE_FACTOR}px`);
}

