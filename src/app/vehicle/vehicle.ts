import { Component, computed, input, signal } from '@angular/core';
import { Sprite } from '../sprite/sprite';
import { Transform } from '../utility/transform';
import type { LandVehicle, SeaVehicle, FixedWingAircraft, Helicopter, StationaryVehicle } from './vehicle.types';

export type VehicleSpec = LandVehicle | SeaVehicle | FixedWingAircraft | Helicopter | StationaryVehicle;


// TODO: Move all game logic out of Angular code, instead use Angular to render stuff.
@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [Sprite],
  templateUrl: './vehicle.html',
  styleUrl: './vehicle.scss',
  host: {
    '[style.left.px]': 'position().x',
    '[style.top.px]': 'position().y',
  },
})
export class Vehicle {
  readonly spec = input.required<VehicleSpec>();
  readonly transform = signal(new Transform(0, 0));
  readonly velocity = signal(0); // meters per second
  readonly angularVelocity = signal(0); // degrees per second

  // Computed properties for rendering
  readonly position = computed(() => ({
    x: this.transform().pos.x,
    y: this.transform().pos.y,
  }));

  readonly rotation = computed(() => this.transform().heading.degrees);
  readonly size = computed(() => 64); // Default sprite size

  // Get sprite name from spec
  readonly spriteName = computed(() => this.spec().image);

}
