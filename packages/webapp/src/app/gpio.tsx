import { GpioDefinition } from '@fire-pie/common';
import { BinaryValue, Direction, Edge } from 'onoff';
import { useCallback, useEffect, useState } from 'react';
import { environment } from '../environments/environment';

const directions: Direction[] = ['out', 'in', 'high', 'low'];
const edges: Edge[] = ['none', 'rising', 'falling', 'both'];
const values: BinaryValue[] = [0, 1];
function getNextOrFirst<T>(value: T, values: T[]) {
  const nextIdx = values.indexOf(value) + 1;

  if (nextIdx >= values.length) {
    return values[0];
  }

  return values[nextIdx];
}

export default function Index() {
  const [gpios, setGpios] = useState<GpioDefinition[]>([]);

  const refresh = useCallback(async () => {
    const response = await fetch(`${environment.apiBase}/api/gpio`, {
      method: 'get',
    });

    const json = (await response.json()) as GpioDefinition[];

    setGpios(json);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const change = useCallback(
    async (
      gpio: GpioDefinition,
      update: Partial<Omit<GpioDefinition, 'pin'>>
    ) => {
      const next = { ...gpio, ...update };

      await fetch(`${environment.apiBase}/api/gpio/${next.pin}`, {
        method: 'post',
        body: JSON.stringify(next),
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      await refresh();
    },
    []
  );

  return (
    <div className="flex flex-col w-screen h-screen overflow-auto">
      <header className="p-2 bg-gray-700 text-white font-bold">
        Fireplace
      </header>
      <div className="flex-1 p-2">
        {gpios.map((gpio) => (
          <div key={gpio.pin} className="flex flex-row">
            <div className="flex-1">Pin: {gpio.pin}</div>
            <div className="flex-1">
              Direction:{' '}
              <button
                onClick={() =>
                  change(gpio, {
                    direction: getNextOrFirst(gpio.direction, directions),
                  })
                }
              >
                {gpio.direction}
              </button>
            </div>
            <div className="flex-1">
              Edge:
              <button
                className="p-2 hover:underline cursor-pointer"
                onClick={() =>
                  change(gpio, { edge: getNextOrFirst(gpio.edge, edges) })
                }
              >
                {gpio.edge}
              </button>
            </div>
            <div className="flex-1">
              Value:{' '}
              <button
                onClick={() =>
                  change(gpio, { value: getNextOrFirst(gpio.value, values) })
                }
              >
                {gpio.value}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
