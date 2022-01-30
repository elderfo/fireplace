import { LoaderFunction } from 'remix';
import { getGpio } from '~/api/raspi-api';

export const loader: LoaderFunction = async (args) => {
  const pin = parseInt(args.params.pin || '0');

  return await getGpio(pin);
};
