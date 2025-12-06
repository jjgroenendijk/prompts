import TestDarkMode from './TestDarkMode';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Tailwind CSS Test
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        If you can read this clearly in both modes, Tailwind is working!
      </p>
      <TestDarkMode />
    </div>
  );
}