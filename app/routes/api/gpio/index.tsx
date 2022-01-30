import { LoaderFunction } from 'remix';
import { getGpios } from '~/api/raspi-api';

export const loader: LoaderFunction = () => {
  return getGpios();
};
