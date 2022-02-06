import { Direction, Edge, Gpio, Options } from 'onoff';
import { MockGpio } from './mock-gpio';
import { isBrowser } from './utils';

const J8Pins = [
  4, 5, 6,
  // 12, PWM0
  // 13, PWM1
  16, 17, 22, 23, 24, 25, 26, 27,
];

// const Rev1Pins = [4, 17, 21, 22, 18, 23, 25];

export const Factory = isBrowser() ? MockGpio : Gpio;

export const gpioFactor = (
  pin: number,
  direction: Direction,
  edge?: Edge,
  options?: Options
): Gpio => {
  if (isBrowser()) {
    return new MockGpio(pin, direction, edge, options);
  }

  try {
    return new Gpio(pin, direction, edge, options);
  } catch (err) {
    console.warn(`Failed to create GPIO, err: ${err?.message}`);
    return new MockGpio(pin, direction, edge, options);
  }
};

// export const pins = J8Pins.reduce((prev, curr) => {
//   try {
//     prev[curr] = new Factory(curr, 'out');
//     prev[curr].writeSync(1);
//   } catch {
//     prev[curr] = new MockGpio(curr, 'out');
//   }

//   return prev;
// }, {} as { [key: number]: Gpio });
