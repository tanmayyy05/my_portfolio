import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Code2, Briefcase } from 'lucide-react'

const timeline = [
  {
    type: 'education',
    icon: GraduationCap,
    title: 'B.Tech Computer Science & Engineering (AI)',
    organization: 'G.H. Raisoni College of Engineering and Management',
    location: 'Pune, Maharashtra',
    period: 'Jul 2022 — May 2027',
    status: 'Ongoing',
    description:
      'Currently in 3rd year. Studying Data Structures, Algorithms, OOP, Database Management, and Machine Learning. Focused on backend development and AI-integrated applications.',
    highlights: ['3rd Year Student', 'AI Specialization', 'Expected May 2027'],
  },
  {
    type: 'project',
    icon: Code2,
    title: 'Employee Attendance Management Platform',
    organization: 'Personal Project',
    location: 'Full Stack',
    period: '2024 — Present',
    status: 'In Development',
    description:
      'Building a full-stack attendance system with REST APIs, MySQL database, and React-based UI. Features employee and admin dashboards, JWT authentication, and real-time attendance tracking.',
    highlights: ['Java + Spring Boot', 'React Frontend', 'MySQL Database', 'REST APIs'],
  },
  {
    type: 'project',
    icon: Code2,
    title: 'Netflix Clone',
    organization: 'Personal Project',
    location: 'Frontend',
    period: '2024',
    status: 'Completed',
    description:
      'Built a responsive Netflix-style UI using reusable React components and clean frontend architecture. Implemented state-based rendering, component composition, and responsive design principles.',
    highlights: ['React', 'JavaScript', 'Responsive Design', 'Git/GitHub'],
  },
  {
    type: 'work',
    icon: Briefcase,
    title: 'Internship',
    organization: 'Details in Resume',
    location: 'India',
    period: '2024',
    status: 'Completed',
    description:
      'Gained hands-on industry experience. Details available in the downloadable resume.',
    highlights: ['Industry Experience'],
  },
]

function TimelineItem({ item, index, inView }: { item: typeof timeline[0]; index: number; inView: boolean }) {
  const Icon = item.icon
  const statusColors: Record<string, string> = {
    Ongoing: 'bg-green-500/20 text-green-400 border-green-500/30',
    'In Development': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    Completed: 'bg-[#ede8e0]/10 text-[#ede8e0]/40 border-white/10',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-10"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/30 via-orange-500/10 to-transparent" />

      {/* Timeline dot */}
      <div className="absolute left-[-4px] top-6 w-[9px] h-[9px] rounded-full bg-orange-500 shadow-[0_0_10px_rgba(255,122,0,0.6)]" />

      {/* Card */}
      <div className="mb-8 glass glow-border rounded-xl p-6 hover:bg-orange-500/3 transition-all duration-300">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 shrink-0 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Icon size={15} className="text-orange-400" />
            </div>
            <div>
              <h3 className="font-display font-bold text-[#ede8e0] text-base leading-tight">{item.title}</h3>
              <p className="font-body text-sm text-[#ede8e0]/50 mt-0.5">{item.organization}</p>
            </div>
          </div>
          <span className={`font-mono text-[10px] px-2.5 py-1 rounded-full border ${statusColors[item.status]} shrink-0`}>
            {item.status}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3 font-mono text-xs text-[#ede8e0]/30">
          <span>{item.period}</span>
          <span>·</span>
          <span>{item.location}</span>
        </div>

        <p className="font-body text-sm text-[#ede8e0]/50 leading-relaxed mb-4">{item.description}</p>

        <div className="flex flex-wrap gap-2">
          {item.highlights.map((h) => (
            <span
              key={h}
              className="font-mono text-[11px] px-2.5 py-1 bg-[#1a1a1a] border border-white/8 text-[#ede8e0]/40 rounded-sm"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="experience" ref={ref} className="relative py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
          {/* Sticky header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
            >
              <p className="tag mb-4">✦ My Journey</p>
              <h2 className="section-heading text-[#ede8e0] mb-6">
                EXPERIENCE
                <br />
                <span className="gradient-text">& EDUCATION</span>
              </h2>
              <p className="font-body text-[#ede8e0]/40 text-sm leading-relaxed">
                Building expertise through education, personal projects, and hands-on development.
              </p>
            </motion.div>
          </div>

          {/* Timeline */}
          <div>
            {timeline.map((item, i) => (
              <TimelineItem key={item.title} item={item} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
