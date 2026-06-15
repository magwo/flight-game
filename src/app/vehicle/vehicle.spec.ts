import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vehicle } from './vehicle';
import type { LandVehicle, SeaVehicle, FixedWingAircraft, Helicopter, StationaryVehicle } from './vehicle.types';

describe('Vehicle', () => {
  let component: Vehicle;
  let fixture: ComponentFixture<Vehicle>;

  const mockLandVehicle: LandVehicle = {
    image: 'tank.png',
    maxSpeed: 16.7,
    acceleration: 2.0,
    turnRate: 0.8,
    width: 3.5,
    length: 9.5,
    type: 'land',
    antiAirCapacitySR: 'low',
    antiAirCapacityMR: 'low',
    groundCombatCapacity: 'high',
  };

  const mockSeaVehicle: SeaVehicle = {
    image: 'destroyer.png',
    maxSpeed: 20.0,
    acceleration: 1.5,
    turnRate: 0.5,
    width: 10.0,
    length: 140.0,
    type: 'sea',
    antiAirCapacitySR: 'medium',
    antiAirCapacityMR: 'high',
    groundCombatCapacity: 'medium',
  };

  const mockAircraft: FixedWingAircraft = {
    image: 'fighter.png',
    maxSpeed: 300.0,
    acceleration: 15.0,
    turnRate: 2.0,
    width: 10.0,
    length: 15.0,
    type: 'fixed-wing',
    a2aCapacity: 'high',
    a2gCapacity: 'medium',
  };

  const mockHelicopter: Helicopter = {
    image: 'helicopter.png',
    maxSpeed: 80.0,
    acceleration: 5.0,
    turnRate: 3.0,
    width: 15.0,
    length: 17.0,
    type: 'helicopter',
    a2aCapacity: 'low',
    a2gCapacity: 'high',
  };

  const mockStationaryVehicle: StationaryVehicle = {
    image: 'radar.png',
    maxSpeed: 0,
    acceleration: 0,
    turnRate: 0,
    width: 5.0,
    length: 5.0,
    type: 'stationary',
    antiAirCapacitySR: 'high',
    antiAirCapacityMR: 'high',
    groundCombatCapacity: 'low',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vehicle],
    }).compileComponents();

    fixture = TestBed.createComponent(Vehicle);
    component = fixture.componentInstance;
  });

  it('should create with land vehicle spec', () => {
    fixture.componentRef.setInput('spec', mockLandVehicle);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create with sea vehicle spec', () => {
    fixture.componentRef.setInput('spec', mockSeaVehicle);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create with fixed-wing aircraft spec', () => {
    fixture.componentRef.setInput('spec', mockAircraft);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create with helicopter spec', () => {
    fixture.componentRef.setInput('spec', mockHelicopter);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create with stationary vehicle spec', () => {
    fixture.componentRef.setInput('spec', mockStationaryVehicle);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should provide correct sprite name from spec', () => {
    fixture.componentRef.setInput('spec', mockLandVehicle);
    fixture.detectChanges();
    expect(component.spriteName()).toBe('tank.png');
  });

  it('should initialize with default transform and velocity', () => {
    fixture.componentRef.setInput('spec', mockLandVehicle);
    fixture.detectChanges();
    expect(component.velocity()).toBe(0);
    expect(component.angularVelocity()).toBe(0);
  });

  it('should compute correct position from transform', () => {
    fixture.componentRef.setInput('spec', mockAircraft);
    fixture.detectChanges();
    const pos = component.position();
    expect(pos.x).toBe(0);
    expect(pos.y).toBe(0);
  });

  it('should compute correct rotation from transform', () => {
    fixture.componentRef.setInput('spec', mockHelicopter);
    fixture.detectChanges();
    expect(component.rotation()).toBe(0);
  });
});
