import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Salamoxso</h1>
        <p className="text-xl">Full-Stack Developer & Cybersecurity Specialist</p>
        <Link href="/contact" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Get in touch <ArrowRight className="inline-block ml-2 h-4 w-4" />
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-lg">
          Im a passionate full-stack developer with expertise in Next.js, React, Express.js, Node.js, PostgreSQL, Python, and AWS. 
          My background in Linux administration and cybersecurity allows me to build robust, secure web applications that meet the 
          highest standards of performance and safety.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Key Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['Next.js', 'React', 'Express.js', 'Node.js', 'PostgreSQL', 'Python', 'AWS', 'Linux', 'Cybersecurity'].map((skill) => (
            <div key={skill} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
              {skill}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'E-commerce Platform', description: 'A full-stack e-commerce solution built with Next.js and Express.js' },
            { title: 'Cybersecurity Dashboard', description: 'Real-time security monitoring dashboard using React and Node.js' },
          ].map((project) => (
            <div key={project.title} className="border dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/projects" className="inline-block bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transition duration-300">
            View all projects <ArrowRight className="inline-block ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}

