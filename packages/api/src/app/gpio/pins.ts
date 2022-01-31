import { Gpio } from 'onoff';
import { MockGpio } from './mock-gpio';
import { isBrowser } from './utils';

const id = Math.random().toString(32);
console.log('ID', id);

const J8Pins = [
  4, 5, 6,
  // 12, PWM0
  // 13, PWM1
  16, 17, 22, 23, 24, 25, 26, 27,
];

const Rev1Pins = [4, 17, 21, 22, 18, 23, 25];

const Factory = isBrowser() ? MockGpio : Gpio;

export const pins = J8Pins.reduce((prev, curr) => {
  try {
    prev[curr] = new Factory(curr, 'out');
  } catch {
    prev[curr] = new MockGpio(curr, 'out');
  }

  return prev;
}, {} as { [key: number]: Gpio });
