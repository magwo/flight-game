/**
 * Vehicle specification defining characteristics for each vehicle type
 */

type VehicleType = 'land' | 'sea' | 'fixed-wing' | 'helicopter' | 'stationary';
type CapacityClass = 'low' | 'medium' | 'high';

interface VehicleBase {
  image: string;
  maxSpeed: number; // m/s
  acceleration: number; // m/s²
  turnRate: number; // radians/s
  width: number; // meters
  length: number; // meters
  type: VehicleType;
}

// Land vehicles
export interface LandVehicle extends VehicleBase {
  type: 'land';
  antiAirCapacitySR: CapacityClass;
  antiAirCapacityMR: CapacityClass;
  groundCombatCapacity: CapacityClass;
}

export interface StationaryVehicle extends VehicleBase {
  type: 'stationary';
  antiAirCapacitySR: CapacityClass;
  antiAirCapacityMR: CapacityClass;
  groundCombatCapacity: CapacityClass;
}

// Sea vehicles
export interface SeaVehicle extends VehicleBase {
  type: 'sea';
  antiAirCapacitySR: CapacityClass;
  antiAirCapacityMR: CapacityClass;
  groundCombatCapacity: CapacityClass;
}

// Aircraft
export interface FixedWingAircraft extends VehicleBase {
  type: 'fixed-wing';
  a2aCapacity: CapacityClass;
  a2gCapacity: CapacityClass;
}

export interface Helicopter extends VehicleBase {
  type: 'helicopter';
  a2aCapacity: CapacityClass;
  a2gCapacity: CapacityClass;
}

export type VehicleSpec =
  | LandVehicle
  | SeaVehicle
  | FixedWingAircraft
  | Helicopter
  | StationaryVehicle;

/**
 * Comprehensive vehicle specifications database
 */
export const vehicleSpecs: Record<string, VehicleSpec> = {
  // Land Vehicles
  tank: {
    image: 'tank.png',
    maxSpeed: 16.7, // ~60 km/h
    acceleration: 2.0,
    turnRate: 0.8,
    width: 3.5,
    length: 9.5,
    type: 'land',
    antiAirCapacitySR: 'low',
    antiAirCapacityMR: 'low',
    groundCombatCapacity: 'high',
  },
  truck: {
    image: 'truck.png',
    maxSpeed: 28.0, // ~100 km/h
    acceleration: 1.5,
    turnRate: 0.6,
    width: 2.5,
    length: 7.5,
    type: 'land',
    antiAirCapacitySR: 'low',
    antiAirCapacityMR: 'low',
    groundCombatCapacity: 'low',
  },
  apc: {
    image: 'apc.png',
    maxSpeed: 22.2, // ~80 km/h
    acceleration: 1.8,
    turnRate: 0.7,
    width: 3.0,
    length: 5.5,
    type: 'land',
    antiAirCapacitySR: 'low',
    antiAirCapacityMR: 'low',
    groundCombatCapacity: 'medium',
  },
  mobilesam: {
    image: 'mobilesam.png',
    maxSpeed: 13.9, // ~50 km/h
    acceleration: 1.2,
    turnRate: 0.5,
    width: 2.5,
    length: 6.5,
    type: 'land',
    antiAirCapacitySR: 'high',
    antiAirCapacityMR: 'medium',
    groundCombatCapacity: 'low',
  },

  // Stationary Vehicles/Structures
  samsite: {
    image: 'samsite.png',
    maxSpeed: 0,
    acceleration: 0,
    turnRate: 0,
    width: 5.0,
    length: 10.0,
    type: 'stationary',
    antiAirCapacitySR: 'high',
    antiAirCapacityMR: 'high',
    groundCombatCapacity: 'low',
  },
  manpad: {
    image: 'manpad.png',
    maxSpeed: 0,
    acceleration: 0,
    turnRate: 0,
    width: 0.5,
    length: 1.5,
    type: 'stationary',
    antiAirCapacitySR: 'high',
    antiAirCapacityMR: 'medium',
    groundCombatCapacity: 'low',
  },

  // Sea Vehicles
  carrier: {
    image: 'carrier.png',
    maxSpeed: 15.4, // ~30 knots
    acceleration: 0.5,
    turnRate: 0.2,
    width: 80.0,
    length: 320.0,
    type: 'sea',
    antiAirCapacitySR: 'high',
    antiAirCapacityMR: 'high',
    groundCombatCapacity: 'high',
  },
  cruiser: {
    image: 'cruiser.png',
    maxSpeed: 18.0, // ~35 knots
    acceleration: 0.6,
    turnRate: 0.25,
    width: 15.0,
    length: 170.0,
    type: 'sea',
    antiAirCapacitySR: 'high',
    antiAirCapacityMR: 'high',
    groundCombatCapacity: 'high',
  },
  tanker: {
    image: 'tanker.png',
    maxSpeed: 7.7, // ~15 knots
    acceleration: 0.3,
    turnRate: 0.15,
    width: 30.0,
    length: 200.0,
    type: 'sea',
    antiAirCapacitySR: 'low',
    antiAirCapacityMR: 'low',
    groundCombatCapacity: 'low',
  },

  // Helicopters
  apache: {
    image: 'apache.png',
    maxSpeed: 75.0, // ~270 km/h
    acceleration: 3.5,
    turnRate: 1.8,
    width: 14.7,
    length: 17.4,
    type: 'helicopter',
    a2aCapacity: 'low',
    a2gCapacity: 'high',
  },
  hind: {
    image: 'hind.png',
    maxSpeed: 55.6, // ~200 km/h
    acceleration: 2.8,
    turnRate: 1.5,
    width: 14.7,
    length: 18.4,
    type: 'helicopter',
    a2aCapacity: 'low',
    a2gCapacity: 'high',
  },
  hokum: {
    image: 'hokum.png',
    maxSpeed: 58.3, // ~210 km/h
    acceleration: 3.0,
    turnRate: 1.6,
    width: 14.7,
    length: 18.3,
    type: 'helicopter',
    a2aCapacity: 'high',
    a2gCapacity: 'low',
  },
  huey: {
    image: 'huey.png',
    maxSpeed: 58.3, // ~210 km/h
    acceleration: 2.5,
    turnRate: 1.4,
    width: 14.7,
    length: 17.4,
    type: 'helicopter',
    a2aCapacity: 'low',
    a2gCapacity: 'low',
  },
  chinook: {
    image: 'chinook.png',
    maxSpeed: 77.8, // ~280 km/h
    acceleration: 3.0,
    turnRate: 1.2,
    width: 18.3,
    length: 15.9,
    type: 'helicopter',
    a2aCapacity: 'low',
    a2gCapacity: 'low',
  },
  gazelle: {
    image: 'gazelle.png',
    maxSpeed: 69.4, // ~250 km/h
    acceleration: 3.2,
    turnRate: 1.7,
    width: 10.5,
    length: 11.6,
    type: 'helicopter',
    a2aCapacity: 'medium',
    a2gCapacity: 'low',
  },
  kiowa: {
    image: 'kiowa.png',
    maxSpeed: 55.6, // ~200 km/h
    acceleration: 2.3,
    turnRate: 1.3,
    width: 10.0,
    length: 10.2,
    type: 'helicopter',
    a2aCapacity: 'low',
    a2gCapacity: 'low',
  },

  // Fixed-Wing Combat Aircraft
  hornet: {
    image: 'hornet.png',
    maxSpeed: 528.0, // ~1900 km/h
    acceleration: 25.0,
    turnRate: 4.5,
    width: 11.4,
    length: 17.4,
    type: 'fixed-wing',
    a2aCapacity: 'high',
    a2gCapacity: 'high',
  },
  phantom: {
    image: 'phantom.png',
    maxSpeed: 658.0, // ~2370 km/h
    acceleration: 28.0,
    turnRate: 4.0,
    width: 11.7,
    length: 19.0,
    type: 'fixed-wing',
    a2aCapacity: 'high',
    a2gCapacity: 'medium',
  },
  viper: {
    image: 'viper.png',
    maxSpeed: 583.0, // ~2100 km/h
    acceleration: 26.0,
    turnRate: 4.8,
    width: 11.4,
    length: 16.0,
    type: 'fixed-wing',
    a2aCapacity: 'high',
    a2gCapacity: 'medium',
  },
  strikeeagle: {
    image: 'strikeeagle.png',
    maxSpeed: 738.0, // ~2660 km/h
    acceleration: 27.0,
    turnRate: 3.8,
    width: 12.0,
    length: 19.4,
    type: 'fixed-wing',
    a2aCapacity: 'medium',
    a2gCapacity: 'high',
  },
  warthog: {
    image: 'warthog.png',
    maxSpeed: 189.0, // ~680 km/h
    acceleration: 12.0,
    turnRate: 5.2,
    width: 17.5,
    length: 16.3,
    type: 'fixed-wing',
    a2aCapacity: 'low',
    a2gCapacity: 'high',
  },
  harrier: {
    image: 'harrier.png',
    maxSpeed: 322.0, // ~1160 km/h
    acceleration: 18.0,
    turnRate: 5.0,
    width: 8.2,
    length: 14.2,
    type: 'fixed-wing',
    a2aCapacity: 'medium',
    a2gCapacity: 'medium',
  },
  intruder: {
    image: 'intruder.png',
    maxSpeed: 289.0, // ~1040 km/h
    acceleration: 14.0,
    turnRate: 3.5,
    width: 11.5,
    length: 16.7,
    type: 'fixed-wing',
    a2aCapacity: 'low',
    a2gCapacity: 'high',
  },
  fishbed: {
    image: 'fishbed.png',
    maxSpeed: 472.0, // ~1700 km/h
    acceleration: 24.0,
    turnRate: 4.2,
    width: 8.5,
    length: 15.8,
    type: 'fixed-wing',
    a2aCapacity: 'high',
    a2gCapacity: 'low',
  },
  fulcrum: {
    image: 'fulcrum.png',
    maxSpeed: 608.0, // ~2190 km/h
    acceleration: 26.0,
    turnRate: 4.6,
    width: 11.6,
    length: 16.7,
    type: 'fixed-wing',
    a2aCapacity: 'high',
    a2gCapacity: 'low',
  },
  flanker: {
    image: 'flanker.png',
    maxSpeed: 694.0, // ~2500 km/h
    acceleration: 27.0,
    turnRate: 4.1,
    width: 14.7,
    length: 21.9,
    type: 'fixed-wing',
    a2aCapacity: 'high',
    a2gCapacity: 'medium',
  },
  gripen: {
    image: 'gripen.png',
    maxSpeed: 590.0, // ~2124 km/h
    acceleration: 26.5,
    turnRate: 4.7,
    width: 8.4,
    length: 14.2,
    type: 'fixed-wing',
    a2aCapacity: 'high',
    a2gCapacity: 'medium',
  },
  mirage2000: {
    image: 'mirage2000.png',
    maxSpeed: 649.0, // ~2335 km/h
    acceleration: 25.5,
    turnRate: 4.3,
    width: 8.4,
    length: 15.3,
    type: 'fixed-wing',
    a2aCapacity: 'high',
    a2gCapacity: 'medium',
  },
  tornado: {
    image: 'tornado.png',
    maxSpeed: 649.0, // ~2337 km/h
    acceleration: 24.0,
    turnRate: 3.9,
    width: 8.6,
    length: 16.7,
    type: 'fixed-wing',
    a2aCapacity: 'medium',
    a2gCapacity: 'high',
  },
  tomcat: {
    image: 'tomcat.png',
    maxSpeed: 690.0, // ~2485 km/h
    acceleration: 26.5,
    turnRate: 4.0,
    width: 11.4,
    length: 19.1,
    type: 'fixed-wing',
    a2aCapacity: 'high',
    a2gCapacity: 'low',
  },
  viggen: {
    image: 'viggen.png',
    maxSpeed: 558.0, // ~2009 km/h
    acceleration: 25.0,
    turnRate: 4.2,
    width: 10.6,
    length: 16.4,
    type: 'fixed-wing',
    a2aCapacity: 'medium',
    a2gCapacity: 'high',
  },
  thunder: {
    image: 'thunder.png',
    maxSpeed: 458.0, // ~1650 km/h
    acceleration: 22.0,
    turnRate: 4.4,
    width: 7.9,
    length: 14.0,
    type: 'fixed-wing',
    a2aCapacity: 'medium',
    a2gCapacity: 'medium',
  },

  // Fixed-Wing Transport/Support Aircraft
  lancer: {
    image: 'lancer.png',
    maxSpeed: 275.0, // ~1000 km/h
    acceleration: 12.0,
    turnRate: 2.5,
    width: 10.7,
    length: 16.0,
    type: 'fixed-wing',
    a2aCapacity: 'low',
    a2gCapacity: 'high',
  },
  stratofortress: {
    image: 'stratofortress.png',
    maxSpeed: 230.0, // ~830 km/h (cruise speed)
    acceleration: 8.0,
    turnRate: 1.8,
    width: 56.0,
    length: 70.7,
    type: 'fixed-wing',
    a2aCapacity: 'low',
    a2gCapacity: 'high',
  },
  awacs: {
    image: 'awacs.png',
    maxSpeed: 230.0, // ~830 km/h (cruise speed)
    acceleration: 8.5,
    turnRate: 2.0,
    width: 44.0,
    length: 68.4,
    type: 'fixed-wing',
    a2aCapacity: 'low',
    a2gCapacity: 'low',
  },
  hercules: {
    image: 'hercules.png',
    maxSpeed: 190.0, // ~685 km/h
    acceleration: 6.0,
    turnRate: 2.2,
    width: 40.4,
    length: 34.3,
    type: 'fixed-wing',
    a2aCapacity: 'low',
    a2gCapacity: 'low',
  },
  albatros: {
    image: 'albatros.png',
    maxSpeed: 200.0, // ~720 km/h
    acceleration: 7.0,
    turnRate: 2.3,
    width: 43.0,
    length: 67.7,
    type: 'fixed-wing',
    a2aCapacity: 'low',
    a2gCapacity: 'low',
  },
  blackjack: {
    image: 'blackjack.png',
    maxSpeed: 503.0, // ~1815 km/h
    acceleration: 18.0,
    turnRate: 2.8,
    width: 35.6,
    length: 56.0,
    type: 'fixed-wing',
    a2aCapacity: 'low',
    a2gCapacity: 'high',
  },
};

/**
 * Get vehicle specification by name
 */
export function getVehicleSpec(vehicleName: string): VehicleSpec | undefined {
  return vehicleSpecs[vehicleName.toLowerCase()];
}

/**
 * Check if a vehicle is stationary
 */
export function isStationary(spec: VehicleSpec): boolean {
  return spec.type === 'stationary';
}

/**
 * Check if a vehicle is airborne
 */
export function isAirborne(spec: VehicleSpec): boolean {
  return spec.type === 'fixed-wing' || spec.type === 'helicopter';
}
