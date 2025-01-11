'use client';

import Link from 'next/link'; // Import the Link component
import { ExternalLink } from 'lucide-react'; // Import ExternalLink for the button
import { motion } from 'framer-motion';
import ScrollIndicator from '../components/ScrollIndicator'; // Import the ScrollIndicator component
import Cards from '../components/Cards'; // Import the Cards component

// Define the skills data
const skills = [
  {
    title: 'Frontend Development',
    description:
      'Building responsive and interactive user interfaces using modern web technologies.',
    image: '/placeholder.svg?height=200&width=300',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
  },
  {
    title: 'Backend Development',
    description:
      'Designing and implementing robust server-side applications and APIs.',
    image: '/placeholder.svg?height=200&width=300',
    tags: ['Node.js', 'Express.js', 'Python', 'PostgreSQL', 'API Integration'],
  },
  {
    title: 'Cybersecurity',
    description:
      'Ensuring the security and integrity of applications through best practices and tools.',
    image: '/placeholder.svg?height=200&width=300',
    tags: ['Web App Pentesting', 'Network Security', 'Vulnerability Assessment'],
  },
  {
    title: 'DevOps & Automation',
    description:
      'Automating deployment processes and managing infrastructure with CI/CD pipelines.',
    image: '/placeholder.svg?height=200&width=300',
    tags: ['Docker', 'Jenkins', 'AWS', 'Python Programming'],
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

export default function SkillsPage() {
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
        My Skills
      </motion.h1>

      {/* Skills Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <Cards projects={skills} />
      </motion.div>

      {/* View All Skills Button (Optional) */}
      <motion.div
        className="mt-12 text-center"
        variants={fadeInUp}
      >
        <Link
          href="/skills"
          className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-lg"
        >
          View all skills <ExternalLink className="ml-2 h-5 w-5" />
        </Link>
      </motion.div>
    </div>
  );
}