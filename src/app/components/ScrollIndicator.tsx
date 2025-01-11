'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const progress = (scrollY / maxScroll) * 100;
      setScrollProgress(progress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Scroll Indicator */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 h-[80vh] w-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden z-10">
        <motion.div
          className="w-1 bg-blue-500 rounded-full"
          style={{ height: `${scrollProgress}%` }}
          initial={{ height: '0%' }}
          animate={{ height: `${scrollProgress}%` }}
          transition={{ type: 'spring', stiffness: 100 }}
        />
        <motion.div
          className="w-3 h-3 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 shadow-[0_0_10px_2px_rgba(59,130,246,0.8)]"
          style={{ top: `${scrollProgress}%` }}
          initial={{ top: '0%' }}
          animate={{ top: `${scrollProgress}%` }}
          transition={{ type: 'spring', stiffness: 100 }}
        />
      </div>

      {/* Mouse Bloom Light */}
      <motion.div
        className="fixed w-32 h-32 bg-blue-500 rounded-full opacity-20 pointer-events-none"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
          filter: 'blur(40px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ type: 'spring', stiffness: 100 }}
      />
    </>
  );
}