'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'

const Navigation = () => {
  const [darkMode, setDarkMode] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    }
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold">Salamoxso</Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className={`hover:text-blue-500 ${pathname === '/' ? 'text-blue-500' : ''}`}>Home</Link>
            <Link href="/projects" className={`hover:text-blue-500 ${pathname === '/projects' ? 'text-blue-500' : ''}`}>Projects</Link>
            <Link href="/skills" className={`hover:text-blue-500 ${pathname === '/skills' ? 'text-blue-500' : ''}`}>Skills</Link>
            <Link href="/contact" className={`hover:text-blue-500 ${pathname === '/contact' ? 'text-blue-500' : ''}`}>Contact</Link>
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

