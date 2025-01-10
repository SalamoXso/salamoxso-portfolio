'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun } from 'lucide-react';

const Navigation = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const pathname = usePathname();

  // Initialize dark mode based on localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode and update localStorage
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            Salamoxso
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`hover:text-blue-500 transition-colors ${
                pathname === '/' ? 'text-blue-500' : 'text-gray-900 dark:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className={`hover:text-blue-500 transition-colors ${
                pathname === '/projects' ? 'text-blue-500' : 'text-gray-900 dark:text-white'
              }`}
            >
              Projects
            </Link>
            <Link
              href="/skills"
              className={`hover:text-blue-500 transition-colors ${
                pathname === '/skills' ? 'text-blue-500' : 'text-gray-900 dark:text-white'
              }`}
            >
              Skills
            </Link>
            <Link
              href="/contact"
              className={`hover:text-blue-500 transition-colors ${
                pathname === '/contact' ? 'text-blue-500' : 'text-gray-900 dark:text-white'
              }`}
            >
              Contact
            </Link>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;