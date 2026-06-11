import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, MapPin, Calendar, Sparkles } from 'lucide-react'

const facts = [
  { label: 'B.Tech Year', value: '3rd Year', icon: GraduationCap },
  { label: 'Location', value: 'Pune, India', icon: MapPin },
  { label: 'Graduation', value: 'May 2027', icon: Calendar },
  { label: 'Focus', value: 'Java + React', icon: Sparkles },
]

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-orange-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left — text */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="tag mb-4"
            >
              ✦ About Me
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="section-heading text-[#ede8e0] mb-6"
            >
              BUILDING THE
              <br />
              <span className="gradient-text">WEB OF</span>
              <br />
              TOMORROW
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-4 text-[#ede8e0]/55 font-body text-base leading-relaxed"
            >
              <p>
                I'm Tanmay Wagh, an aspiring Java Full Stack Developer currently in my 3rd year of B.Tech in Computer Science (Artificial Intelligence) at G.H. Raisoni College of Engineering and Management, Pune.
              </p>
              <p>
                My passion lies in backend development and building robust web applications. I specialize in Java, Spring Boot, and RESTful APIs on the backend, paired with React on the frontend to create complete full-stack solutions.
              </p>
              <p>
                I've built practical applications including a Netflix Clone and an Employee Attendance Management Platform — both reflecting my approach to learning through building real, production-quality software.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="mt-8 flex gap-3 flex-wrap"
            >
              <a
                href="https://github.com/tanmayyy05"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-sm font-body border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 rounded-sm transition-all duration-300"
              >
                GitHub Profile →
              </a>
              <a
                href="https://www.linkedin.com/in/tanmaywagh05/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-sm font-body border border-white/10 text-[#ede8e0]/60 hover:border-orange-500/30 hover:text-orange-400 rounded-sm transition-all duration-300"
              >
                LinkedIn →
              </a>
            </motion.div>
          </div>

          {/* Right — info cards */}
          <div className="grid grid-cols-2 gap-4">
            {facts.map(({ label, value, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="glass glow-border rounded-xl p-5 group hover:bg-orange-500/5 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-3 group-hover:bg-orange-500/20 transition-colors">
                  <Icon size={16} className="text-orange-400" />
                </div>
                <p className="font-mono text-xs text-[#ede8e0]/35 tracking-widest mb-1">{label}</p>
                <p className="font-display font-bold text-[#ede8e0] text-lg">{value}</p>
              </motion.div>
            ))}

            {/* Study card spanning full width */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="col-span-2 glass glow-border rounded-xl p-5"
            >
              <p className="font-mono text-xs text-[#ede8e0]/35 tracking-widest mb-2">CURRENTLY STUDYING</p>
              <div className="flex flex-wrap gap-2">
                {['Data Structures', 'Algorithms', 'OOP', 'Database Management', 'Machine Learning'].map((course) => (
                  <span
                    key={course}
                    className="font-mono text-xs px-2.5 py-1 bg-[#1a1a1a] border border-white/8 text-[#ede8e0]/50 rounded-sm"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
