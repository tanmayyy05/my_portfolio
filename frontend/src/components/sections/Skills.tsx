import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skillGroups = [
  {
    category: 'Languages',
    tag: '01',
    skills: [
      { name: 'Java', level: 85, primary: true },
      { name: 'JavaScript', level: 78, primary: false },
      { name: 'HTML/CSS', level: 82, primary: false },
      { name: 'Python', level: 55, primary: false },
    ],
  },
  {
    category: 'Frameworks & Tech',
    tag: '02',
    skills: [
      { name: 'Spring Boot', level: 72, primary: true },
      { name: 'React', level: 75, primary: true },
      { name: 'RESTful APIs', level: 78, primary: false },
      { name: 'Hibernate', level: 65, primary: false },
    ],
  },
  {
    category: 'Databases',
    tag: '03',
    skills: [
      { name: 'MySQL', level: 75, primary: false },
      { name: 'PostgreSQL', level: 60, primary: false },
    ],
  },
  {
    category: 'Tools',
    tag: '04',
    skills: [
      { name: 'Git & GitHub', level: 80, primary: false },
      { name: 'IntelliJ IDEA', level: 85, primary: false },
      { name: 'VS Code', level: 88, primary: false },
      { name: 'Postman', level: 75, primary: false },
    ],
  },
]

const interpersonal = [
  'Communication', 'Team Collaboration', 'Time Management',
  'Fast Learner', 'Analytical Thinking', 'Problem Solving',
]

function SkillBar({ name, level, primary, delay }: { name: string; level: number; primary: boolean; delay: number }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className={`font-body text-sm ${primary ? 'text-orange-400' : 'text-[#ede8e0]/70'}`}>
          {name}
          {primary && <span className="ml-1.5 font-mono text-[10px] text-orange-500/60">★</span>}
        </span>
        <span className="font-mono text-xs text-[#ede8e0]/30">{level}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${primary ? 'bg-gradient-to-r from-orange-600 to-orange-400' : 'bg-gradient-to-r from-[#ede8e0]/20 to-[#ede8e0]/40'}`}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="skills" ref={ref} className="relative py-32">
      {/* Decorative line */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-orange-500/15 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <p className="tag mb-3">✦ Technical Proficiency</p>
            <h2 className="section-heading text-[#ede8e0]">
              SKILLS &<br />
              <span className="gradient-text">EXPERTISE</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-body text-[#ede8e0]/40 max-w-sm text-sm leading-relaxed"
          >
            Continuously expanding my stack with a focus on backend engineering and full-stack development.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              className="glass glow-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-orange-500/50">{group.tag}</span>
                <div className="h-px flex-1 bg-white/5" />
                <span className="font-display font-bold text-sm text-[#ede8e0]/60 tracking-wide uppercase">
                  {group.category}
                </span>
              </div>
              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    delay={gi * 0.1 + si * 0.07}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="glass glow-border rounded-xl p-6"
        >
          <p className="font-mono text-xs text-[#ede8e0]/30 tracking-widest mb-4">INTERPERSONAL SKILLS</p>
          <div className="flex flex-wrap gap-2">
            {interpersonal.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="font-body text-sm px-4 py-2 border border-orange-500/15 bg-orange-500/5 text-[#ede8e0]/60 rounded-full hover:border-orange-500/30 hover:text-orange-300 transition-all duration-200 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
