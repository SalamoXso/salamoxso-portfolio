'use client';

import { useState } from 'react';
import { Code, Server, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const skillIcons = {
  Frontend: <Code className="w-6 h-6 mb-2" />,
  Backend: <Server className="w-6 h-6 mb-2" />,
  Cybersecurity: <Shield className="w-6 h-6 mb-2" />,
  Programming: <Code className="w-6 h-6 mb-2" />,
};

const skills = [
  { category: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'Python', 'PostgreSQL', 'API Integration'] },
  { category: 'Cybersecurity', items: ['Web App Pentesting', 'Network Security', 'Vulnerability Assessment'] },
  { category: 'Programming', items: ['Python Programming', 'JavaScript', 'TypeScript'] },
];

const KeySkills = () => {
  const [activeSkill, setActiveSkill] = useState(0);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.h2 className="text-3xl font-semibold mb-8 text-center" variants={fadeInUp}>
        Key Skills
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={stagger}
      >
        {skills.map((skillSet, index) => (
          <motion.div
            key={skillSet.category}
            className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 transform ${activeSkill === index ? 'scale-105 border-2 border-blue-500' : ''}`}
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveSkill(index)}
          >
            <div className="flex items-center justify-center mb-4">
              {skillIcons[skillSet.category]}
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">{skillSet.category}</h3>
            <ul className="space-y-2">
              {skillSet.items.map((skill) => (
                <li key={skill} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default KeySkills;