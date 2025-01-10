import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution built with Next.js, Express.js, and PostgreSQL. Features include user authentication, product management, and secure payment processing.',
    technologies: ['Next.js', 'Express.js', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com/yourusername/ecommerce-platform',
    live: 'https://ecommerce-platform-demo.vercel.app',
  },
  {
    title: 'Cybersecurity Dashboard',
    description: 'Real-time security monitoring dashboard using React, Node.js, and AWS services. Provides insights into network traffic, potential threats, and system vulnerabilities.',
    technologies: ['React', 'Node.js', 'AWS Lambda', 'DynamoDB'],
    github: 'https://github.com/yourusername/cybersecurity-dashboard',
    live: 'https://cybersecurity-dashboard-demo.vercel.app',
  },
  {
    title: 'DevOps Automation Tool',
    description: 'A Python-based tool for automating deployment processes, including continuous integration and continuous deployment (CI/CD) pipelines.',
    technologies: ['Python', 'Docker', 'Jenkins', 'AWS'],
    github: 'https://github.com/yourusername/devops-automation',
  },
]

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Projects</h1>
      <div className="grid gap-8">
        {projects.map((project) => (
          <div key={project.title} className="border dark:border-gray-700 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold">{project.title}</h2>
            <p>{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <Link href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Link>
              {project.live && (
                <Link href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

