import { LoaderFunction, useLoaderData } from 'remix';
import { getGpios, GpioDefinition } from '~/api/raspi-api';

const direction = ['in', 'out', 'high', 'low'];
const edge = ['none', 'rising', 'falling', 'both'];

export const loader: LoaderFunction = async () => {
  return await getGpios();
};

export default function Index() {
  const gpios = useLoaderData<GpioDefinition[]>();

  return (
    <div className="flex flex-col w-screen h-screen overflow-auto">
      <header className="p-2 bg-gray-700 text-white font-bold">
        Fireplace
      </header>
      <div className="flex-1 p-2">
        {gpios.map((gpio) => (
          <div key={gpio.pin} className="flex flex-row">
            <div className="flex-1">Pin: {gpio.pin}</div>
            <div className="flex-1">Direction: {gpio.direction}</div>
            <div className="flex-1">Edge: {gpio.edge}</div>
            <div className="flex-1">Value: {gpio.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
