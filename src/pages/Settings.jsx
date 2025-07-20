import { useState, useEffect } from 'react';

export default function Settings() {
  const [dark, setDark] = useState(() => JSON.parse(localStorage.getItem('darkMode') || 'false'));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('darkMode', JSON.stringify(dark));
  }, [dark]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Settings</h2>
      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text">Dark Mode</span>
          <input type="checkbox" className="toggle" checked={dark} onChange={() => setDark(prev => !prev)} />
        </label>
      </div>
    </div>
  );
}