import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Play } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Employee Attendance Management Platform',
    subtitle: 'Full Stack Application',
    description:
      'A comprehensive attendance management system built with Java Spring Boot and React. Features employee and admin dashboards, JWT-based authentication, real-time attendance tracking, and detailed reporting.',
    tech: ['Java', 'Spring Boot', 'REST APIs', 'MySQL', 'React', 'JavaScript', 'Git'],
    github: 'https://github.com/tanmayyy05',
    live: null,
    status: 'In Development',
    featured: true,
    color: 'orange',
    metrics: ['REST APIs', 'MySQL DB', 'Admin Panel', 'Full Stack'],
  },
  {
    id: 2,
    title: 'Netflix Clone',
    subtitle: 'Frontend Application',
    description:
      'A pixel-perfect, responsive Netflix-style UI built with React. Features reusable components, state-based rendering, clean component architecture, and responsive design across all device sizes.',
    tech: ['React', 'JavaScript', 'HTML', 'CSS', 'Git', 'GitHub'],
    github: 'https://github.com/tanmayyy05',
    live: null,
    status: 'Completed',
    featured: false,
    color: 'red',
    metrics: ['React Components', 'Responsive UI', 'State Management'],
  },
]

function ProjectCard({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative glass glow-border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(255,122,0,0.12)] ${
        project.featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className={`p-8 ${project.featured ? 'lg:flex lg:gap-10 lg:items-start' : ''}`}>
        {/* Left — content */}
        <div className={project.featured ? 'lg:flex-1' : ''}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                  project.status === 'Completed'
                    ? 'bg-[#ede8e0]/5 text-[#ede8e0]/40 border-white/10'
                    : 'bg-orange-500/10 text-orange-400 border-orange-500/25'
                }`}>
                  {project.status}
                </span>
                {project.featured && (
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border bg-orange-500/15 text-orange-300 border-orange-500/30">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="font-display font-bold text-[#ede8e0] text-xl leading-tight mb-1">{project.title}</h3>
              <p className="font-mono text-xs text-orange-500/60 tracking-widest">{project.subtitle}</p>
            </div>

            <div className="flex gap-2 shrink-0">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-sm text-[#ede8e0]/40 hover:text-orange-400 hover:border-orange-500/40 transition-all"
              >
                <Github size={14} />
              </a>
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-sm text-[#ede8e0]/40 hover:text-orange-400 hover:border-orange-500/40 transition-all"
                >
                  <ExternalLink size={14} />
                </a>
              ) : null}
            </div>
          </div>

          <p className="font-body text-[#ede8e0]/50 text-sm leading-relaxed mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] px-2.5 py-1 bg-[#141414] border border-white/8 text-[#ede8e0]/45 rounded-sm hover:border-orange-500/25 hover:text-orange-400/60 transition-all"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right — metrics (featured only) */}
        {project.featured && (
          <div className="mt-6 lg:mt-0 lg:w-48 grid grid-cols-2 lg:grid-cols-1 gap-3">
            {project.metrics.map((metric) => (
              <div
                key={metric}
                className="px-3 py-3 bg-[#111]/50 border border-white/5 rounded-lg flex items-center gap-2"
              >
                <Play size={10} className="text-orange-500/60" />
                <span className="font-mono text-xs text-[#ede8e0]/40">{metric}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="projects" ref={ref} className="relative py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <p className="tag mb-3">✦ What I've Built</p>
            <h2 className="section-heading text-[#ede8e0]">
              FEATURED
              <br />
              <span className="gradient-text">PROJECTS</span>
            </h2>
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            href="https://github.com/tanmayyy05"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-body text-sm text-[#ede8e0]/40 hover:text-orange-400 transition-colors"
          >
            <Github size={15} />
            View all on GitHub →
          </motion.a>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* More projects placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-6 glass border border-dashed border-white/10 rounded-xl p-8 text-center"
        >
          <p className="font-display font-bold text-[#ede8e0]/20 text-lg mb-2">More Coming Soon</p>
          <p className="font-body text-sm text-[#ede8e0]/25">
            Currently working on new projects. Follow on{' '}
            <a href="https://github.com/tanmayyy05" target="_blank" rel="noopener noreferrer" className="text-orange-500/50 hover:text-orange-400 transition-colors">
              GitHub
            </a>{' '}
            to stay updated.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
