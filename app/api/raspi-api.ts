import type { BinaryValue, Direction, Edge, Gpio } from 'onoff';
import { IMockGpio } from './gpio-types';

import { MockGpio } from './mock-gpio';
import { isBrowser } from './utils';

export type GpioDefinition = {
  pin: number;
  edge: Edge;
  activeLow: boolean;
  direction: Direction;
  value: BinaryValue;
};

const Factory = isBrowser() ? MockGpio : require('onoff').Gpio;

const pins = [4, 17, 21, 22, 18, 23, 25].reduce((prev, curr) => {
  try {
    prev[curr] = new Factory(curr, 'out');
  } catch {
    prev[curr] = new MockGpio(curr, 'out');
  }

  return prev;
}, {} as { [key: number]: Gpio });

export const getGpios = async () => {
  const list: GpioDefinition[] = [];
  for (const pin in pins) {
    if (Object.prototype.hasOwnProperty.call(pins, pin)) {
      const gpio = pins[pin];

      const item = {
        pin: parseInt(pin),
        edge: gpio.edge(),
        activeLow: gpio.activeLow(),
        direction: gpio.direction(),
        value: await gpio.read(),
      };

      list.push(item);
    }
  }

  return list;
};

export const setGpio = async (
  pin: number,
  value: BinaryValue,
  direction: Direction,
  edge: Edge
) => {
  if (!Object.prototype.hasOwnProperty.call(pins, pin)) {
    console.error(`GPIO with pin ${pin} does not exist.`);
    return;
  }

  const gpio: Gpio = pins[pin];

  gpio.setDirection(direction);
  gpio.setEdge(edge);
  await gpio.write(value);
};

export const getGpio = async (pin: number): Promise<GpioDefinition | null> => {
  if (!Object.prototype.hasOwnProperty.call(pins, pin)) {
    console.error(`GPIO with pin ${pin} does not exist.`);
    return null;
  }

  const gpio: Gpio = pins[pin];

  if (!gpio) return null;

  return {
    pin: pin,
    edge: gpio.edge(),
    activeLow: gpio.activeLow(),
    direction: gpio.direction(),
    value: await gpio.read(),
  };
};
