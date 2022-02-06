import { J8Pins } from '@fire-pie/common';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { environment } from '../environments/environment';

export const Config = () => {
  const [relayPort, setRelayPort] = useState(J8Pins[0]);
  const [triggerPort, setTriggerPort] = useState(J8Pins[1]);
  const navigate = useNavigate();

  // useState(() => {

  // },[relayPort] )

  const save = useCallback(async () => {
    await fetch(`${environment.apiBase}/api/config`, {
      body: JSON.stringify({ trigger: triggerPort, relay: relayPort }),
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    navigate('/');
  }, [navigate, relayPort, triggerPort]);

  return (
    <>
      <div className="opacity-75 bg-white absolute top-0 left-0 right-0 bottom-0"></div>
      <div
        className={[
          'p-4',
          'flex',
          'flex-col',
          'shadow',
          'rounded',
          'border',
          'border-gray-200',
          'absolute',
          'top-[10%]',
          'left-1/4',
          'right-1/4',
          'bg-white',
        ].join(' ')}
      >
        <h2 className="text-xl">Configuration</h2>
        <div>
          <div className="py-2">Relay port:</div>
          <div className="flex flex-row">
            <select
              className="border border-gray-400 rounded p-2 flex-1"
              value={relayPort}
              onChange={(e) => setRelayPort(parseInt(e.currentTarget.value))}
            >
              {J8Pins.map((pin) => (
                <option value={pin}>{pin}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="pb-2">
          <div className="py-2">Trigger port:</div>
          <div className="flex flex-row">
            <select
              className="flex-1 border border-gray-400 rounded p-2 block"
              value={triggerPort}
              onChange={(e) => setTriggerPort(parseInt(e.currentTarget.value))}
            >
              {J8Pins.filter((p) => p !== relayPort).map((pin) => (
                <option value={pin}>{pin}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="pt-2 flex flex-row">
          <div className="flex-1"></div>
          <button
            className={[
              'border',
              'rounded',
              'px-4',
              'py-1',
              'border-gray-300',
              'bg-white',
              'text-black',
              'font-medium',
              'transition-shadow',
              'transition-colors',
              'duration-200',
              'shadow-none',
              'hover:shadow-sm',
              'hover:bg-gray-50',
              'mr-2',
            ].join(' ')}
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          <button
            onClick={save}
            className={[
              'border',
              'rounded',
              'px-4',
              'py-1',
              'border-blue-700',
              'bg-blue-500',
              'text-white',
              'font-medium',
              'transition-shadow',
              'transition-colors',
              'duration-200',
              'shadow-none',
              'hover:shadow-sm',
              'hover:bg-blue-600',
            ].join(' ')}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
