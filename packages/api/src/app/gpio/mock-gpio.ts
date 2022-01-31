import type {
  BinaryValue,
  Direction,
  Edge,
  Options,
  ValueCallback,
} from 'onoff';
import { IMockGpio } from './gpio-types';

export class MockGpio implements IMockGpio {
  value: BinaryValue = 0;
  watchers: ValueCallback[] = [];
  _activeLow = false;
  _edge: Edge;
  _direction: Direction;

  constructor(_: number, direction: Direction, edge?: Edge, options?: Options) {
    this._direction = direction;
    this._edge = edge || 'none';

    this.activeLow.bind(this);
    this.direction.bind(this);
    this.edge.bind(this);
    this.read.bind(this);
    this.readSync.bind(this);
    this.setActiveLow.bind(this);
    this.setDirection.bind(this);
    this.setEdge.bind(this);
    this.unexport.bind(this);
    this.unwatch.bind(this);
    this.unwatchAll.bind(this);
    this.watch.bind(this);
    this.write.bind(this);
    this.writeSync.bind(this);

    if (!options) return;

    this._activeLow = options.activeLow || false;
  }

  read(callback: ValueCallback): void;
  read(): Promise<BinaryValue>;
  read(callback?: any): void | Promise<import('onoff').BinaryValue> {
    if (typeof callback === 'function') {
      callback(null, this.value);
      return;
    }

    return Promise.resolve(this.value);
  }

  readSync(): BinaryValue {
    return this.value;
  }

  write(
    value: BinaryValue,
    callback: (err: Error | null | undefined) => void
  ): void;
  write(value: BinaryValue): Promise<void>;
  write(value: any, callback?: any): void | Promise<void> {
    if (typeof callback === 'function') {
      callback(null);
      return;
    }

    this.value = value;

    return Promise.resolve();
  }

  writeSync(value: BinaryValue): void {
    this.value = value;
  }

  watch(callback: ValueCallback): void {
    this.watchers.push(callback);
  }

  unwatch(callback?: ValueCallback): void {
    if (callback) {
      this.watchers = this.watchers.filter((f) => f !== callback);

      return;
    }

    this.unwatchAll();
  }

  unwatchAll(): void {
    this.watchers = [];
  }

  direction(): Direction {
    return this._direction;
  }

  setDirection(direction: Direction): void {
    this._direction = direction;
  }

  edge(): Edge {
    return this._edge;
  }

  setEdge(edge: Edge): void {
    this._edge = edge;
  }

  activeLow(): boolean {
    return this._activeLow;
  }

  setActiveLow(invert: boolean): void {
    this._activeLow = invert;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unexport(): void {}
}

export const Gpio = MockGpio;
