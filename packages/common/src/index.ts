import type { BinaryValue, Direction, Edge } from 'onoff';

export type GpioDefinition = {
  pin: number;
  edge: Edge;
  activeLow: boolean;
  direction: Direction;
  value: BinaryValue;
};
