import { GpioDefinition } from '@fire-pie/common';
import type { BinaryValue, Direction, Edge, Gpio } from 'onoff';
import { pins } from './pins';

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
