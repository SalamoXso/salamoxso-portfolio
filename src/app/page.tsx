'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Code, Server, Shield } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const skillIcons = {
  'Frontend': <Code className="w-6 h-6 mb-2" />,
  'Backend': <Server className="w-6 h-6 mb-2" />,
  'Cybersecurity': <Shield className="w-6 h-6 mb-2" />,
};

const skills = [
  { category: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'Python', 'PostgreSQL'] },
  { category: 'Cybersecurity', items: ['Web App Pentesting', 'Network Security', 'Vulnerability Assessment'] },
];

const projects = [
  { 
    title: 'E-commerce Platform', 
    description: 'A full-stack e-commerce solution built with Next.js and Express.js',
    image: '/placeholder.svg?height=200&width=300',
    tags: ['Next.js', 'Express.js', 'PostgreSQL']
  },
  { 
    title: 'Cybersecurity Dashboard', 
    description: 'Real-time security monitoring dashboard using React and Node.js',
    image: '/placeholder.svg?height=200&width=300',
    tags: ['React', 'Node.js', 'WebSockets']
  },
];

export default function Home() {
  const [activeSkill, setActiveSkill] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <motion.section
        className="text-center space-y-6"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.h1 className="text-5xl font-bold" variants={fadeInUp}>
          Salamoxso
        </motion.h1>
        <motion.p className="text-2xl text-gray-600 dark:text-gray-300" variants={fadeInUp}>
          Full-Stack Developer & Cybersecurity Specialist
        </motion.p>
        <motion.div variants={fadeInUp}>
          <Link
            href="/contact"
            className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-lg"
          >
            Get in touch <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </motion.section>

      {/* About Me Section */}
      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={stagger}
        className="max-w-3xl mx-auto"
      >
        <motion.h2 className="text-3xl font-semibold mb-6" variants={fadeInUp}>
          About Me
        </motion.h2>
        <motion.p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300" variants={fadeInUp}>
          I'm a passionate full-stack developer with a strong background in cybersecurity. My expertise spans across modern web technologies and secure system design, allowing me to create robust, high-performance applications that prioritize user safety and data protection.
        </motion.p>
      </motion.section>

      {/* Key Skills Section */}
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
                    <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Featured Projects Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 className="text-3xl font-semibold mb-8 text-center" variants={fadeInUp}>
          Featured Projects
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={stagger}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-12 text-center"
          variants={fadeInUp}
        >
          <Link
            href="/projects"
            className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-lg"
          >
            View all projects <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}

