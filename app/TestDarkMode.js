'use client';
import { useState, useEffect } from 'react';

export default function TestDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded border border-gray-400 dark:border-gray-600"
    >
      Toggle Dark Mode (Current: {isDark ? 'Dark' : 'Light'})
    </button>
  );
}
