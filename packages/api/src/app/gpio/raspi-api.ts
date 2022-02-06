import type { BinaryValue, Gpio } from 'onoff';
import { gpioFactor } from './pins';

let active: { trigger: Gpio; relay: Gpio } | undefined = undefined;

export const setConfig = (relay: number, trigger: number) => {
  if (active) {
    active.trigger.unexport();
    active.relay.unexport();
  }

  active = {
    relay: gpioFactor(relay, 'out', 'none'),
    trigger: gpioFactor(trigger, 'in', 'both'),
  };

  active.trigger.watch((err, value) => {
    if (err) {
      console.log('trigger error', err, value);
      return;
    }

    changeState(value);
  });
  return Promise.resolve();
};

export const getConfig = () => {
  return Promise.resolve(active);
};

export const changeState = async (value: BinaryValue) => {
  if (!active) throw new Error('No configuration set');

  await active.relay.write(value);
};

process.on('SIGINT', () => {
  try {
    active?.relay.unexport();
  } catch {
    // noop
  }
  try {
    active?.trigger.unexport();
  } catch {
    // noop
  }
});
// export const getGpios = async () => {
//   const list: GpioDefinition[] = [];
//   for (const pin in pins) {
//     if (Object.prototype.hasOwnProperty.call(pins, pin)) {
//       const gpio = pins[pin];

//       const item = {
//         pin: parseInt(pin),
//         edge: gpio.edge(),
//         activeLow: gpio.activeLow(),
//         direction: gpio.direction(),
//         value: await gpio.read(),
//       };

//       list.push(item);
//     }
//   }
//   return list;
// };

// export const setGpio = async (
//   pin: number,
//   value: BinaryValue,
//   direction: Direction,
//   edge: Edge
// ) => {
//   if (!Object.prototype.hasOwnProperty.call(pins, pin)) {
//     console.error(`GPIO with pin ${pin} does not exist.`);
//     return;
//   }
//   console.log('setGpio:input', {
//     pin,
//     value,
//     direction,
//     edge,
//   });

//   let gpio: Gpio = pins[pin];

//   if (gpio.direction() !== direction) {
//     gpio.unexport();

//     gpio = new Factory(pin, direction, edge);

//     pins[pin] = gpio;
//   }

//   gpio.setEdge(edge);
//   await gpio.write(value);

//   console.log('setGpio:output', gpio);

//   return {
//     pin: pin,
//     edge: gpio.edge(),
//     activeLow: gpio.activeLow(),
//     direction: gpio.direction(),
//     value: await gpio.read(),
//   };
// };

// export const getGpio = async (pin: number): Promise<GpioDefinition | null> => {
//   if (!Object.prototype.hasOwnProperty.call(pins, pin)) {
//     console.error(`GPIO with pin ${pin} does not exist.`);
//     return null;
//   }

//   const gpio: Gpio = pins[pin];

//   if (!gpio) return null;

//   return {
//     pin: pin,
//     edge: gpio.edge(),
//     activeLow: gpio.activeLow(),
//     direction: gpio.direction(),
//     value: await gpio.read(),
//   };
// };
