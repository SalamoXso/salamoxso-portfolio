"use client"
import Link from 'next/link';
import { motion } from 'framer-motion'; // Correct import

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each child animation
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className="text-center py-20"
      >
        <h1 className="text-4xl font-bold">SalamoXSO</h1>
        <p className="mt-4 text-lg">Full-Stack Developer & Cybersecurity Expert</p>
        <p className="mt-2 text-gray-400">Building scalable web applications and securing them.</p>
        <Link
          href="/projects"
          className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          View My Work
        </Link>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mt-20"
      >
        <h2 className="text-2xl font-bold">Skills</h2>
        <motion.div
          variants={staggerContainer}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {['Next.js', 'React.js', 'Node.js', 'AWS', 'PostgreSQL', 'Python', 'Linux', 'Cybersecurity'].map((skill, index) => (
            <motion.div
              key={skill}
              variants={staggerItem}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 bg-gray-800 rounded-lg text-center"
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Featured Projects */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mt-20"
      >
        <h2 className="text-2xl font-bold">Featured Projects</h2>
        <motion.div
          variants={staggerContainer}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            {
              title: 'E-Commerce Platform',
              description: 'A modern e-commerce platform built with Next.js and Stripe.',
              link: '#',
            },
            {
              title: 'Cybersecurity Dashboard',
              description: 'A dashboard for monitoring and analyzing security threats.',
              link: '#',
            },
          ].map((project, index) => (
            <motion.div
              key={project.title}
              variants={scaleUp}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-gray-800 rounded-lg"
            >
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="mt-2 text-gray-400">{project.description}</p>
              <Link
                href={project.link}
                className="mt-4 inline-block text-blue-400 hover:underline"
              >
                View Project
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
}