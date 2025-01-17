'use client';

import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollIndicator from '../components/ScrollIndicator'; // Import the ScrollIndicator component
import Cards from '../components/Cards'; // Import the Cards component

const projects = [
  {
    title: 'E-commerce Platform',
    description:
      'A full-stack e-commerce solution built with Next.js, Express.js, and PostgreSQL. Features include user authentication, product management, and secure payment processing.',
    image: '/placeholder.svg?height=200&width=300',
    tags: ['Next.js', 'Express.js', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com/yourusername/ecommerce-platform',
    live: 'https://ecommerce-platform-demo.vercel.app',
  },
  {
    title: 'Cybersecurity Dashboard',
    description:
      'Real-time security monitoring dashboard using React, Node.js, and AWS services. Provides insights into network traffic, potential threats, and system vulnerabilities.',
    image: '/placeholder.svg?height=200&width=300',
    tags: ['React', 'Node.js', 'AWS Lambda', 'DynamoDB'],
    github: 'https://github.com/yourusername/cybersecurity-dashboard',
    live: 'https://cybersecurity-dashboard-demo.vercel.app',
  },
  {
    title: 'DevOps Automation Tool',
    description:
      'A Python-based tool for automating deployment processes, including continuous integration and continuous deployment (CI/CD) pipelines.',
    image: '/placeholder.svg?height=200&width=300',
    tags: ['Python', 'Docker', 'Jenkins', 'AWS'],
    github: 'https://github.com/yourusername/devops-automation',
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

export default function ProjectsPage() {
  return (
    <div className="space-y-8 p-6 relative pl-24"> {/* Add padding to the left */}
      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Page Title */}
      <motion.h1
        className="text-3xl font-bold text-gray-900 dark:text-white"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        My Projects
      </motion.h1>

      {/* Projects Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <Cards projects={projects} />
      </motion.div>

      {/* View All Projects Button */}
      <motion.div
        className="mt-12 text-center"
        variants={fadeInUp}
      >
        <Link
          href="/projects"
          className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-lg"
        >
          View all projects <ExternalLink className="ml-2 h-5 w-5" />
        </Link>
      </motion.div>
    </div>
  );
}