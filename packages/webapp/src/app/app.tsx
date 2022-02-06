import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { environment } from '../environments/environment';
import { Config } from './config';

export function App() {
  return (
    <div className="flex flex-col w-screen h-screen overflow-auto">
      <header className="p-2 bg-gray-700 text-white font-bold flex flex-row">
        <div className="p-2 flex-1">Fireplace</div>
        <div className="p-2">
          <Link to="/config" className="p-2">
            Settings
          </Link>
        </div>
        <div className="p-2">Login</div>
      </header>
      <Routes>
        <Route path="/*" element={<Index />} />
        <Route path="/config" element={<Config />} />
      </Routes>
    </div>
  );
}

export default App;

const Index = () => {
  const on = useCallback(async () => {
    await fetch(`${environment.apiBase}/api/on`, { method: 'POST' });
  }, []);

  const off = useCallback(async () => {
    await fetch(`${environment.apiBase}/api/off`, { method: 'POST' });
  }, []);

  return (
    <>
      <button
        onClick={on}
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
          'm-2',
        ].join(' ')}
      >
        On
      </button>
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
          'm-2',
        ].join(' ')}
        onClick={off}
      >
        Off
      </button>
    </>
  );
};
