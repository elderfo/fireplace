import type { BinaryValue, Direction, Edge } from 'onoff';

export type GpioDefinition = {
  pin: number;
  edge: Edge;
  activeLow: boolean;
  direction: Direction;
  value: BinaryValue;
};

export const J8Pins = [
  4, 5, 6,
  // 12, PWM0
  // 13, PWM1
  16, 17, 22, 23, 24, 25, 26, 27,
];
